#!/usr/bin/env python3
"""Run a command with selected variables from project-local 1Password mounts."""
import argparse
import fcntl
import json
import os
from pathlib import Path
import signal
import stat
import sys
import time

from dotenv import dotenv_values


class EnvironmentError(Exception):
    pass


def read_mount(path: Path, timeout: int) -> dict[str, str]:
    def expired(_signum, _frame):
        raise EnvironmentError(f"Timed out reading {path.name}; unlock 1Password and authorize the Environment.")

    old_handler = signal.signal(signal.SIGALRM, expired)
    signal.alarm(timeout)
    try:
        if not stat.S_ISFIFO(path.stat().st_mode):
            raise EnvironmentError(f"Expected a 1Password FIFO mount: {path}")
        fd = os.open(str(path) + '.lock', os.O_CREAT | os.O_RDWR | os.O_NOFOLLOW, 0o600)
        with os.fdopen(fd, 'w') as lock:
            fcntl.flock(lock, fcntl.LOCK_EX)
            # The desktop FIFO may briefly close without data between reads.
            # Keep the cross-process lock through a bounded transport retry.
            for attempt in range(3):
                with path.open() as stream:
                    values = dotenv_values(stream=stream, interpolate=False)
                if values and all(value is not None for value in values.values()):
                    # Give the desktop writer time to re-arm before another process opens it.
                    time.sleep(0.5)
                    break
                if attempt < 2:
                    time.sleep(0.25 * (attempt + 1))
        if not values:
            raise EnvironmentError(f"The mounted Environment is empty: {path}")
        if any(value is None for value in values.values()):
            raise EnvironmentError(f"The mounted Environment returned incomplete data: {path}")
        return values
    except FileNotFoundError:
        raise EnvironmentError(f"Enable the 1Password Environment mount at {path}") from None
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, old_handler)


def select_variables(root: Path, config: dict, profiles: list[str], timeout: int) -> dict[str, str]:
    loaded = {}
    selected = {}
    for profile_name in profiles:
        candidate = Path(profile_name)
        canonical = candidate if candidate.is_absolute() else root / candidate
        try:
            profile_name = str(canonical.resolve().relative_to(root.resolve()))
        except ValueError:
            raise EnvironmentError("Environment profile must belong to this project") from None
        if profile_name not in config['profiles']:
            raise EnvironmentError(f"Unknown Environment profile: {profile_name}")
        profile = config['profiles'][profile_name]
        for source_config in profile.get('sources', [profile]):
            mount_name = os.environ.get(source_config.get('mount_override', ''), source_config['mount'])
            path = (root / mount_name).resolve()
            if path not in loaded:
                loaded[path] = read_mount(path, timeout)
            values = loaded[path]
            for name, source in source_config['variables'].items():
                if source not in values or values[source] is None:
                    raise EnvironmentError(f"Missing Environment variable: {source}")
                value = values[source]
                if 'op://' in value:
                    raise EnvironmentError(f"Unresolved 1Password reference in {source}")
                selected[name] = value
        for name in profile.get('decode_newlines', []):
            selected[name] = selected[name].replace(r'\n', '\n')
        selected.update(profile.get('literals', {}))
    return selected


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--env-file', action='append', dest='profiles', help='Select a profile listed in scripts/environment-profiles.json')
    parser.add_argument('--timeout', type=int, default=90)
    parser.add_argument('command', nargs=argparse.REMAINDER)
    args = parser.parse_args()
    command = args.command[1:] if args.command[:1] == ['--'] else args.command
    if not command or args.timeout <= 0:
        parser.error('A command and a positive timeout are required')
    root = Path(__file__).resolve().parent.parent
    config = json.loads((root / 'scripts/environment-profiles.json').read_text())
    values = select_variables(root, config, args.profiles or [config['default']], args.timeout)
    os.chdir(root)
    file_args = []
    for profile_name in args.profiles or [config['default']]:
        candidate = Path(profile_name)
        name = str((candidate if candidate.is_absolute() else root / candidate).resolve().relative_to(root))
        for mapping in config['profiles'][name].get('files', []):
            file_args.extend(['--file', mapping])
    if file_args:
        command = [sys.executable, str(root / 'scripts/with-memory-files.py'), *file_args, '--', *command]
    os.execvpe(command[0], command, {**os.environ, **values})


if __name__ == '__main__':
    try:
        main()
    except (EnvironmentError, OSError) as error:
        print('1Password Environment: ' + str(error), file=sys.stderr)
        sys.exit(1)
