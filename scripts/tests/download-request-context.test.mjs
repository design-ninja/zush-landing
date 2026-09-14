import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import Bowser from 'bowser';
import ts from 'typescript';

const source = readFileSync(new URL('../../src/utils/downloadRequestContext.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source.replace(/^import .*;\n/gm, ''), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const context = { exports: {}, Bowser };
vm.runInNewContext(compiled, context);
const { getDownloadRequestContext } = context.exports;

test('classifies the visitor browser separately from the Mac download target', () => {
  const fixtures = [
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'Chrome', 'Mac OS X', 'Desktop'],
    ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 'Microsoft Edge', 'Windows', 'Desktop'],
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/27.0 Mobile/15E148 Safari/604.1', 'Mobile Safari', 'iOS', 'Mobile'],
  ];
  for (const [ua, browser, os, device] of fixtures) {
    const result = getDownloadRequestContext(ua);
    assert.equal(result.$browser, browser);
    assert.equal(result.$os, os);
    assert.equal(result.$device_type, device);
    assert.equal(result.os, undefined);
    assert.equal(typeof result.$browser_version, 'number');
  }
});

test('does not invent browser or device information for missing or unknown agents', () => {
  for (const ua of [undefined, '', ' ', 'unrecognized-client']) {
    const result = getDownloadRequestContext(ua);
    assert.equal(result.$browser, undefined);
    assert.equal(result.$browser_version, undefined);
    assert.equal(result.$device_type, undefined);
  }
});

test('download redirects immediately and captures browser context under the existing visitor identity', async () => {
  const routeSource = readFileSync(new URL('../../src/pages/download/mac.ts', import.meta.url), 'utf8');
  const js = ts.transpileModule(routeSource.replace(/^import .*;\n/gm, '').replaceAll('import.meta.env', 'testEnv'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const pending = [];
  const payloads = [];
  const runtime = {
    exports: {}, testEnv: { PUBLIC_POSTHOG_KEY: 'test-key' },
    MAC_INSTALLER_URL: 'https://example.test/Zush.dmg', getDownloadRequestContext,
    waitUntil: promise => pending.push(promise),
    fetch: async (_url, options) => { payloads.push(JSON.parse(options.body)); return { ok: true }; },
    crypto: { randomUUID: () => 'request-id' }, URL, Request, Response, AbortController, setTimeout, clearTimeout, console,
  };
  vm.runInNewContext(js, runtime);
  const request = new Request('https://example.test/download/mac', { headers: {
    cookie: `ph_test-key_posthog=${encodeURIComponent(JSON.stringify({ distinct_id: 'existing-visitor' }))}`,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
  } });
  const response = runtime.exports.GET({ request });
  assert.equal(response.status, 302);
  assert.equal(response.headers.get('location'), runtime.MAC_INSTALLER_URL);
  await Promise.all(pending);
  assert.equal(payloads.length, 1);
  assert.equal(payloads[0].event, 'server_download_click');
  assert.equal(payloads[0].distinct_id, 'existing-visitor');
  assert.equal(payloads[0].properties.distinct_id_origin, 'posthog_cookie');
  assert.equal(payloads[0].properties.os, 'mac');
  assert.equal(payloads[0].properties.channel, 'direct');
  assert.equal(payloads[0].properties.$browser, 'Microsoft Edge');
  assert.equal(payloads[0].properties.$os, 'Windows');
});
