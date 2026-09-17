import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

function loadUtility(name, globals) {
  const source = readFileSync(new URL(`../../src/utils/${name}.ts`, import.meta.url), 'utf8');
  const js = ts.transpileModule(source.replace(/^import .*;\n/gm, ''), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const context = { exports: {}, ...globals };
  vm.runInNewContext(js, context);
  return context.exports;
}

test('global store binding leaves React links alone and binds static links only once', () => {
  const handlers = [];
  const staticLink = {
    dataset: { storeOs: 'windows', storeAppUrl: 'ms-windows-store://test' },
    href: 'https://example.test/store',
    closest: () => null,
    addEventListener: (name, handler) => handlers.push({ name, handler }),
  };
  const reactLink = {
    closest: () => ({}),
    get dataset() { throw new Error('Global binder accessed React-owned link'); },
  };
  const { bindStoreLinks } = loadUtility('storeLinks', { navigator: { platform: 'Win32' }, trackAnalyticsEvent() {} });
  const root = { querySelectorAll: () => [reactLink, staticLink] };
  bindStoreLinks(root);
  bindStoreLinks(root);
  assert.equal(handlers.length, 1);
  assert.equal(staticLink.href, 'ms-windows-store://test');
  assert.equal(staticLink.dataset.storeWebUrl, 'https://example.test/store');
});

test('pro-click tracking skips island subtrees and binds static elements once', () => {
  const { bindProClickTracking } = loadUtility('download', { require: () => ({}) });

  const listeners = [];
  const staticEl = {
    dataset: { proClickSource: 'navbar' },
    closest: () => null,
    addEventListener: (name, handler) => listeners.push({ name, handler }),
  };
  const islandEl = {
    closest: () => ({}),
    get dataset() { throw new Error('Global binder accessed React-owned element'); },
  };
  const root = { querySelectorAll: () => [islandEl, staticEl] };
  bindProClickTracking(root);
  bindProClickTracking(root);
  assert.equal(listeners.length, 1);
  assert.equal(staticEl.dataset.proClickTrackingBound, 'true');
});

test('pro-plan tracking skips island subtrees and binds static elements once', () => {
  const { bindProPlanClickTracking } = loadUtility('download', { require: () => ({}) });

  const listeners = [];
  const staticEl = {
    dataset: { proPlanId: 'monthly' },
    closest: () => null,
    addEventListener: (name, handler) => listeners.push({ name, handler }),
  };
  const islandEl = {
    closest: () => ({}),
    get dataset() { throw new Error('Global binder accessed React-owned element'); },
  };
  const root = { querySelectorAll: () => [islandEl, staticEl] };
  bindProPlanClickTracking(root);
  bindProPlanClickTracking(root);
  assert.equal(listeners.length, 1);
  assert.equal(staticEl.dataset.proPlanClickTrackingBound, 'true');
});

test('promo code copy skips island buttons and binds static buttons once', () => {
  const listeners = [];
  const staticButton = {
    dataset: { promoCode: 'SAVE20' },
    closest: () => null,
    addEventListener: (name, handler) => listeners.push({ name, handler }),
  };
  const islandButton = {
    closest: () => ({}),
    get dataset() { throw new Error('Global binder accessed React-owned button'); },
  };
  const { bindPromoCodeCopy } = loadUtility('promoCode', {
    document: { querySelectorAll: () => [islandButton, staticButton] },
  });
  bindPromoCodeCopy();
  bindPromoCodeCopy();
  assert.equal(listeners.length, 1);
  assert.equal(staticButton.dataset.promoCopyBound, 'true');
});

test('scroll reveal observes sections but keeps React animation state on the Astro wrapper', () => {
  const island = { dataset: {} };
  const makeSection = (owner = null) => ({
    dataset: owner ? Object.freeze({}) : {},
    closest: () => owner,
    parentElement: { closest: () => null },
    hasAttribute: () => false,
  });
  const hero = makeSection();
  const staticSection = makeSection();
  const reactSection = makeSection(island);
  const sections = [hero, staticSection, reactSection];
  const observed = [];
  let notify;
  class Observer {
    constructor(callback) { notify = callback; }
    observe(section) { observed.push(section); }
    unobserve(section) { observed.splice(observed.indexOf(section), 1); }
  }
  const { bindScrollReveal } = loadUtility('scrollReveal', {
    document: { getElementById: () => ({ querySelectorAll: () => sections, contains: () => false }) },
    window: { IntersectionObserver: Observer }, IntersectionObserver: Observer,
  });
  bindScrollReveal();
  bindScrollReveal();
  assert.deepEqual(observed, [staticSection, reactSection]);
  assert.equal(hero.dataset.scrollReveal, undefined);
  assert.equal(staticSection.dataset.scrollReveal, '');
  assert.equal(island.dataset.scrollReveal, '');
  notify([{ target: reactSection, isIntersecting: true }]);
  assert.equal(island.dataset.scrollRevealState, 'visible');
  assert.equal(reactSection.dataset.scrollRevealState, undefined);
  assert.deepEqual(observed, [staticSection]);
});
