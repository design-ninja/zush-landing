import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../../src/utils/analytics.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

const runtime = {
  exports: {},
  URL,
  window: {
    location: {
      href: 'https://zushapp.com/pricing?email=person%40example.com#checkout',
      pathname: '/pricing',
    },
  },
  document: { referrer: 'https://accounts.example.com/reset?token=secret#step' },
};
vm.runInNewContext(compiled, runtime);

test('analytics URL helpers retain page identity but remove query strings and fragments', () => {
  assert.equal(
    runtime.exports.sanitizeAnalyticsUrl('https://zushapp.com/mac?token=secret#private'),
    'https://zushapp.com/mac',
  );
  assert.equal(runtime.exports.sanitizeAnalyticsPath('/mac?token=secret#private'), '/mac');
  assert.equal(runtime.exports.sanitizeAnalyticsUrl('javascript:alert(1)'), undefined);
});

test('shared page properties do not expose current or referring query parameters', () => {
  assert.deepEqual(
    JSON.parse(JSON.stringify(runtime.exports.getAnalyticsPageProperties())),
    {
      page_path: '/pricing',
      page_url: 'https://zushapp.com/pricing',
      referrer: 'https://accounts.example.com/reset',
    },
  );
});
