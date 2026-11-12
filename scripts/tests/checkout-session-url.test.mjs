import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const read = path => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
const layout = read('src/layouts/BaseLayout.astro');
const headScript = [...layout.matchAll(/<script is:inline>([\s\S]*?)<\/script>/g)]
  .map(match => match[1])
  .find(source => source.includes('zush_checkout_session_handoff'));
const paramsModule = ts.transpileModule(read('src/utils/checkoutParams.ts'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

const TOKEN = 'a'.repeat(64);
const TXN = 'txn_01abcdefghijklmnopqrstuvwx';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: key => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
  };
}

function load(path, search = '', hash = '', storage = memoryStorage()) {
  const location = { pathname: path, search, hash };
  const replaced = [];
  const window = {
    location,
    sessionStorage: storage,
    history: {
      state: null,
      replaceState: (_state, _title, url) => {
        replaced.push(url);
        const parsed = new URL(url, 'https://zushapp.com');
        location.search = parsed.search;
        location.hash = parsed.hash;
      },
    },
  };
  vm.runInNewContext(headScript, { window, decodeURIComponent, JSON });
  const params = { exports: {} };
  vm.runInNewContext(paramsModule, { exports: params.exports, window });
  return { location, storage, replaced, params: params.exports };
}

test('the head script exists and runs before every other script in the layout', () => {
  assert.ok(headScript, 'BaseLayout no longer moves checkout_session out of the URL');
  assert.ok(layout.indexOf('zush_checkout_session_handoff') < layout.indexOf('zush_pricing_hidden'));
});

test('an app checkout link loses its token before analytics and keeps it for its transaction', () => {
  const page = load('/', `?_ptxn=${TXN}&checkout_session=${TOKEN}&utm_source=app`);
  assert.equal(page.location.search, `?_ptxn=${TXN}&utm_source=app`);
  assert.deepEqual(page.replaced, [`/?_ptxn=${TXN}&utm_source=app`]);
  assert.equal(page.params.readCheckoutSessionHandoff(TXN), TOKEN);
  assert.equal(page.params.readCheckoutSessionHandoff('txn_other'), null);
});

test('a reload and a locale redirect still find the token kept for the transaction', () => {
  const first = load('/', `?_ptxn=${TXN}&checkout_session=${TOKEN}`);
  const redirected = load('/de', `?_ptxn=${TXN}`, '', first.storage);
  assert.deepEqual(redirected.replaced, []);
  assert.equal(redirected.params.readCheckoutSessionHandoff(TXN), TOKEN);
});

test('a token as the only query or in the hash leaves the URL too', () => {
  assert.equal(load('/thank-you', `?checkout_session=${TOKEN}`).location.search, '');
  const hashed = load('/', '', `#pricing&checkout_session=${TOKEN}&x=1`);
  assert.equal(hashed.location.hash, '#pricing&x=1');
  assert.equal(hashed.params.readCheckoutSessionHandoff(), TOKEN);
});

test('a malformed token leaves the URL but is never handed on', () => {
  const page = load('/', '?checkout_session=not-a-token');
  assert.equal(page.location.search, '');
  assert.equal(page.params.readCheckoutSessionHandoff(), null);
});

test('a page without the token is left alone', () => {
  const page = load('/', '?checkout=one-time', '#pricing');
  assert.deepEqual(page.replaced, []);
  assert.equal(page.location.search, '?checkout=one-time');
});

test('activation and thank-you pages never load Microsoft UET', () => {
  assert.match(layout, /pageCarriesPurchaseCredentials = route === '\/activate' \|\| route === '\/thank-you'/);
  assert.match(layout, /\{!pageCarriesPurchaseCredentials && \(\s*<script>\s*import \{ initializeMicrosoftAds \}/);
});
