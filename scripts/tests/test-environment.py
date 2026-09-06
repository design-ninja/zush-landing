import importlib.util
import json
import shutil
import multiprocessing
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import time
import unittest
from unittest.mock import patch

sys.dont_write_bytecode = True
HELPER=Path(__file__).resolve().parent.parent / 'with-environment.py'
spec=importlib.util.spec_from_file_location('environment_loader', HELPER)
loader=importlib.util.module_from_spec(spec);spec.loader.exec_module(loader)


def serve(path, data, count):
    for _ in range(count):
        with open(path, 'w') as stream: stream.write(data)
        time.sleep(.05)


class EnvironmentTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.root=Path(self.tmp.name)
        self.prod=self.root/'production.env';os.mkfifo(self.prod,0o600)
        self.sandbox=self.root/'sandbox.env';os.mkfifo(self.sandbox,0o600)
        self.config={'profiles':{
            '.env.1password':{'mount':'production.env','variables':{'TOKEN':'TOKEN','MODE':'MODE'}},
            '.env.1password.sandbox':{'mount':'sandbox.env','variables':{'TOKEN':'TOKEN','MODE':'MODE'}},
            '.env.1password.public':{'mount':'production.env','variables':{'MODE':'MODE'},'literals':{'FLAG':'enabled'}},
        }}

    def tearDown(self): self.tmp.cleanup()

    def writer(self,path,data,count=1):
        p=multiprocessing.Process(target=serve,args=(path,data,count));p.start()
        self.addCleanup(lambda:p.is_alive() and p.terminate())

    def configured_source(self):
        self.config['profiles']['.env.1password']['fallback_mount'] = 'sandbox.env'
        self.config['profiles']['.env.1password']['mount_override'] = 'ZUSH_TEST_ENV_FILE'
        return self.config['profiles']['.env.1password']

    def test_local_mount_wins_over_existing_shared_mount(self):
        self.configured_source()
        self.writer(self.prod, 'TOKEN=local\nMODE=production\n')
        result = loader.select_variables(self.root, self.config, ['.env.1password'], 3)
        self.assertEqual(result['TOKEN'], 'local')

    def test_existing_shared_mount_is_used_when_local_absent(self):
        self.configured_source()
        self.prod.unlink()
        self.writer(self.sandbox, 'TOKEN=shared\nMODE=production\n')
        result = loader.select_variables(self.root, self.config, ['.env.1password'], 3)
        self.assertEqual(result['TOKEN'], 'shared')

    def test_explicit_override_wins_over_local_mount(self):
        self.configured_source()
        self.writer(self.sandbox, 'TOKEN=override\nMODE=production\n')
        with patch.dict(os.environ, {'ZUSH_TEST_ENV_FILE': str(self.sandbox)}):
            result = loader.select_variables(self.root, self.config, ['.env.1password'], 3)
        self.assertEqual(result['TOKEN'], 'override')

    def test_missing_override_does_not_fall_back(self):
        self.configured_source()
        with patch.dict(os.environ, {'ZUSH_TEST_ENV_FILE': 'missing.env'}):
            with self.assertRaisesRegex(loader.EnvironmentError, 'missing.env'):
                loader.select_variables(self.root, self.config, ['.env.1password'], 1)

    def test_invalid_local_file_does_not_fall_back(self):
        self.configured_source()
        self.prod.unlink()
        self.prod.write_text('TOKEN=plaintext')
        with self.assertRaisesRegex(loader.EnvironmentError, 'FIFO'):
            loader.select_variables(self.root, self.config, ['.env.1password'], 1)

    def test_empty_override_is_rejected(self):
        self.configured_source()
        with patch.dict(os.environ, {'ZUSH_TEST_ENV_FILE': ''}):
            with self.assertRaisesRegex(loader.EnvironmentError, 'must not be empty'):
                loader.select_variables(self.root, self.config, ['.env.1password'], 1)

    def test_real_production_profile_runs_without_app_checkout(self):
        config = json.loads((HELPER.parent/'environment-profiles.json').read_text())
        source = config['profiles'][config['default']]['sources'][0]
        local = self.root/source['mount']
        local.parent.mkdir()
        os.mkfifo(local, 0o600)
        self.writer(local, ''.join(f'{key}=example\n' for key in source['variables'].values()))
        result = loader.select_variables(self.root, config, [config['default']], 3)
        self.assertEqual(result, {key: 'example' for key in source['variables']})

    def test_missing_mount_error_points_to_landing_path(self):
        source = self.configured_source()
        self.prod.unlink()
        self.sandbox.unlink()
        with self.assertRaisesRegex(loader.EnvironmentError, 'production.env'):
            loader.select_variables(self.root, self.config, ['.env.1password'], 1)

    def test_sandbox_overrides_production(self):
        self.writer(self.prod,'TOKEN=live\nMODE=production\n')
        self.writer(self.sandbox,'TOKEN=test\nMODE=sandbox\n')
        result=loader.select_variables(self.root,self.config,['.env.1password','.env.1password.sandbox'],3)
        self.assertEqual(result,{'TOKEN':'test','MODE':'sandbox'})

    def test_public_profile_omits_secret_and_shared_mount_read_once(self):
        self.writer(self.prod,'TOKEN=secret\nMODE=production\n')
        result=loader.select_variables(self.root,self.config,['.env.1password.public','.env.1password.public'],3)
        self.assertEqual(result,{'MODE':'production','FLAG':'enabled'})

    def test_literal_dollar_and_multiline(self):
        self.writer(self.prod,'TOKEN="first\\n${HOME} $(echo nope)"\nMODE=production\n')
        result=loader.select_variables(self.root,self.config,['.env.1password'],3)
        self.assertEqual(result['TOKEN'],'first\n${HOME} $(echo nope)')

    def test_multi_source_alias_and_shared_read(self):
        self.config['profiles']['combined']={'sources':[
            {'mount':'production.env','variables':{'TOKEN':'LANDING_TOKEN'}},
            {'mount':'sandbox.env','variables':{'MODE':'MODE'}},
            {'mount':'production.env','variables':{'PUBLIC':'MODE'}},
        ]}
        self.writer(self.prod,'TOKEN=app-secret\nLANDING_TOKEN=landing-secret\nMODE=production\n')
        self.writer(self.sandbox,'MODE=sandbox\nTOKEN=unused\n')
        result=loader.select_variables(self.root,self.config,['combined'],3)
        self.assertEqual(result,{'TOKEN':'landing-secret','MODE':'sandbox','PUBLIC':'production'})

    def test_escaped_pem_newlines_decoded_only_when_selected(self):
        self.config['profiles']['pem']={'mount':'production.env','variables':{'KEY':'TOKEN'},'decode_newlines':['KEY']}
        self.writer(self.prod,"TOKEN='first\\nsecond'\nMODE=production\n")
        result=loader.select_variables(self.root,self.config,['pem'],3)
        self.assertEqual(result,{'KEY':'first\nsecond'})

    def test_missing_mount(self):
        self.prod.unlink()
        with self.assertRaisesRegex(loader.EnvironmentError,'Enable'): loader.read_mount(self.prod,1)

    def test_regular_file_rejected(self):
        self.prod.unlink();self.prod.write_text('TOKEN=secret')
        with self.assertRaisesRegex(loader.EnvironmentError,'FIFO'): loader.read_mount(self.prod,1)

    def test_transient_empty_read_reopens_fifo(self):
        from unittest.mock import patch
        import io
        with patch.object(Path,'open',side_effect=[io.StringIO(''),io.StringIO('TOKEN=loaded\n')]) as opened:
            result=loader.read_mount(self.prod,3)
        self.assertEqual(result,{'TOKEN':'loaded'})
        self.assertEqual(opened.call_count,2)

    def test_permanently_empty_read_fails_without_cached_values(self):
        from unittest.mock import patch
        import io
        with patch.object(Path,'open',side_effect=lambda:io.StringIO('')) as opened:
            with self.assertRaisesRegex(loader.EnvironmentError,'empty'):
                loader.read_mount(self.prod,3)
        self.assertEqual(opened.call_count,3)

    def test_truncated_record_retries_whole_read(self):
        from unittest.mock import patch
        import io
        with patch.object(Path,'open',side_effect=[io.StringIO('TOKEN=old\nSUP'),io.StringIO('TOKEN=fresh\n')]):
            self.assertEqual(loader.read_mount(self.prod,3),{'TOKEN':'fresh'})

    def test_truncated_record_never_returns_partial_values(self):
        from unittest.mock import patch
        import io
        with patch.object(Path,'open',side_effect=lambda:io.StringIO('TOKEN=old\nSUP')):
            with self.assertRaisesRegex(loader.EnvironmentError,'incomplete'):
                loader.read_mount(self.prod,3)

    def test_timeout(self):
        with self.assertRaisesRegex(loader.EnvironmentError,'Timed out'): loader.read_mount(self.prod,1)

    def test_unknown_profile(self):
        with self.assertRaisesRegex(loader.EnvironmentError,'Unknown'): loader.select_variables(self.root,self.config,['missing'],1)

    def test_missing_variable(self):
        self.writer(self.prod,'MODE=production\n')
        with self.assertRaisesRegex(loader.EnvironmentError,'Missing'): loader.select_variables(self.root,self.config,['.env.1password'],3)

    def test_empty_value_is_preserved(self):
        self.writer(self.prod,'TOKEN=\nMODE=production\n')
        result=loader.select_variables(self.root,self.config,['.env.1password'],3)
        self.assertEqual(result['TOKEN'],'')

    def test_unresolved_reference_rejected(self):
        self.writer(self.prod,'TOKEN=op://vault/item/field\nMODE=production\n')
        with self.assertRaisesRegex(loader.EnvironmentError,'Unresolved'): loader.select_variables(self.root,self.config,['.env.1password'],3)

    def test_concurrent_readers_receive_complete_values(self):
        self.writer(self.prod, 'TOKEN=secret\nMODE=production\n', count=5)
        code = "import runpy,sys;from pathlib import Path;m=runpy.run_path(sys.argv[1]);assert m['read_mount'](Path(sys.argv[2]),5)=={'TOKEN':'secret','MODE':'production'}"
        readers = [subprocess.Popen([sys.executable, '-c', code, str(HELPER), str(self.prod)], stdout=subprocess.PIPE, stderr=subprocess.PIPE) for _ in range(5)]
        for reader in readers:
            self.addCleanup(lambda p=reader: p.poll() is None and p.kill())
        for reader in readers:
            stdout, stderr = reader.communicate(timeout=8)
            self.assertEqual(reader.returncode, 0, stderr.decode())
            self.assertEqual(stdout, b'')

    def test_command_exec_preserves_stdio_arguments_and_working_directory(self):
        scripts = self.root/'scripts'; scripts.mkdir()
        shutil.copyfile(HELPER, scripts/'with-environment.py')
        (scripts/'environment-profiles.json').write_text(json.dumps({**self.config,'default':'.env.1password.public'}))
        self.writer(self.prod, 'TOKEN=secret\nMODE=production\n')
        code = "import os,sys;assert os.environ['MODE']=='production';assert os.environ['FLAG']=='enabled';assert 'TOKEN' not in os.environ;assert sys.argv[1]=='literal $ARG';assert os.getcwd()==sys.argv[2];print(sys.stdin.read(),end='');sys.exit(7)"
        env = dict(os.environ); env.pop('TOKEN', None)
        result = subprocess.run([sys.executable, str(scripts/'with-environment.py'), '--', sys.executable, '-c', code, 'literal $ARG', str(self.root.resolve())],input='MCP input',text=True,capture_output=True,env=env,timeout=5)
        self.assertEqual(result.returncode,7,result.stderr)
        self.assertEqual(result.stdout,'MCP input')
        self.assertEqual(result.stderr,'')


if __name__=='__main__':
    multiprocessing.set_start_method('fork')
    unittest.main()
