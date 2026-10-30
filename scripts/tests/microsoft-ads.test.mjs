import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const read = path => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
const compile = source => ts.transpileModule(source.replace(/^import[\s\S]*?from ['"][^'"]+['"];\n/gm, ''), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function client({ enabled = true, gpc = false, dnt = '', hostname = 'zushapp.com', failure = false } = {}) {
  const scripts = [];
  const calls = [];
  let requests = 0;
  const runtime = {
    exports: {}, navigator: { globalPrivacyControl: gpc, doNotTrack: dnt },
    window: { location: { hostname } },
    document: { createElement: () => ({}), head: { appendChild: s => scripts.push(s) } },
    fetch: async () => { requests++; if (failure) throw new Error('blocked'); return { ok: true, json: async () => ({ enabled, tagId: '343281815' }) }; },
    encodeURIComponent,
  };
  vm.runInNewContext(compile(read('src/utils/microsoftAds.ts')), runtime);
  const ads = runtime.exports;
  // Exercise the actual download event entry point, not just the UET helper.
  runtime.exports = {};
  Object.assign(runtime, ads, {
    trackAnalyticsEvent: () => {}, getAnalyticsPageProperties: () => ({}),
  });
  vm.runInNewContext(compile(read('src/utils/download.ts')), runtime);
  return { runtime, ads, downloads: runtime.exports, scripts, calls, requests: () => requests };
}

const settle = () => new Promise(resolve => setImmediate(resolve));

test('real download action queues the matching UET goal before the vendor script loads', async () => {
  const c = client();
  c.downloads.trackDownloadClick({ os: 'windows', source: 'hero', channel: 'microsoft-store' }, {});
  await settle();
  assert.equal(c.scripts.length, 1);
  assert.equal(c.scripts[0].src, 'https://bat.bing.net/bat.js?ti=343281815');
  assert.deepEqual(JSON.parse(JSON.stringify(c.runtime.window.uetq)), [
    'event', 'download_windows', { event_category: 'download', event_label: 'hero' },
  ]);
  c.runtime.window.UET = class {
    constructor(options) { c.calls.push(options); this.push = (...args) => c.calls.push(args); }
  };
  c.scripts[0].onload();
  assert.equal(c.calls[0].ti, '343281815');
  assert.deepEqual(c.calls[1], ['pageLoad']);
  await c.ads.initializeMicrosoftAds();
  assert.equal(c.requests(), 1);
});

test('non-US and unknown countries do not load UET or emit conversions', async () => {
  const c = client({ enabled: false });
  c.downloads.trackDownloadClick({ os: 'windows', source: 'hero' }, {});
  await settle();
  assert.equal(c.scripts.length, 0);
  assert.equal(c.runtime.window.uetq, undefined);
});

test('privacy signals and non-production hosts prevent even the config request', async () => {
  for (const options of [{ gpc: true }, { dnt: '1' }, { hostname: 'preview.vercel.app' }]) {
    const c = client(options);
    c.downloads.trackDownloadClick({ os: 'windows', source: 'hero' }, {});
    await settle();
    assert.equal(c.requests(), 0);
    assert.equal(c.scripts.length, 0);
  }
});

test('Mac downloads and other channels do not trigger the Windows goal', async () => {
  const c = client();
  c.downloads.trackDownloadClick({ os: 'mac', source: 'hero', channel: 'direct' }, {});
  c.downloads.trackDownloadClick({ os: 'windows', source: 'hero', channel: 'homebrew' }, {});
  await settle();
  assert.equal(c.requests(), 0);
});

test('blocked tracking does not break downloads', async () => {
  const c = client({ failure: true });
  c.downloads.trackDownloadClick({ os: 'windows', source: 'hero' }, {});
  await settle();
  assert.equal(c.scripts.length, 0);
});

test('server enables the public tag only for US requests without opt-out signals and never caches the decision', async () => {
  const runtime = { exports: {}, Response, geolocation: request => ({ country: request.headers.get('x-vercel-ip-country') }) };
  vm.runInNewContext(compile(read('src/pages/api/microsoft-ads.ts')), runtime);
  for (const [country, signals, expected] of [
    ['US', {}, true], ['GB', {}, false], ['DE', {}, false], ['', {}, false],
    ['US', { 'sec-gpc': '1' }, false], ['US', { dnt: '1' }, false],
  ]) {
    const response = runtime.exports.GET({ request: new Request('https://zushapp.com/api/microsoft-ads', { headers: { 'x-vercel-ip-country': country, ...signals } }) });
    const body = await response.json();
    assert.equal(body.enabled, expected);
    assert.equal(body.tagId, expected ? '343281815' : undefined);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
  }
});
