import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');
const source = read('src/utils/download.ts');
// Exercise the real utility without making network calls or sending analytics.
const withoutImports = source.replace(/^import[\s\S]*?from ['"][^'"]+['"];\n/gm, '');
const compiled = ts.transpileModule(withoutImports, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function setup() {
  const captured = [];
  class Element {
    constructor(dataset = {}, parent = null) { this.dataset = dataset; this.parent = parent; }
    closest() { return this.dataset.proClickSource ? this : this.parent?.closest() ?? null; }
  }
  const handlers = [];
  const root = { addEventListener: (type, handler) => handlers.push({ type, handler }) };
  const runtime = { exports: {}, Element, trackAnalyticsEvent: (name, properties) => captured.push({ name, properties }) };
  vm.runInNewContext(compiled, runtime);
  const click = (target) => handlers.filter(({ type }) => type === 'click').forEach(({ handler }) => handler({ target }));
  return { ...runtime.exports, captured, Element, root, handlers, click };
}

test('existing pricing links are explicitly marked on desktop, mobile and hero', () => {
  const header = read('src/components/Header/Header.astro');
  assert.equal((header.match(/data-pro-click-source=\{item\.href\.endsWith\('#pricing'\) \? 'navbar' : undefined\}/g) ?? []).length, 2);
  assert.match(read('src/components/PromotionBanner/PromotionBanner.tsx'), /data-pro-click-source="hero"/);
});

test('delegation captures nested clicks and replacement hero links after hydration only once', () => {
  const { bindProClickTracking, captured, Element, root, handlers, click } = setup();
  bindProClickTracking(root);
  bindProClickTracking(root);
  assert.equal(handlers.length, 1);
  // These elements are created after binding, as they are during hydration.
  const firstHero = new Element(Object.freeze({ proClickSource: 'hero' }));
  click(new Element({}, firstHero));
  const replacementHero = new Element(Object.freeze({ proClickSource: 'hero' }));
  click(new Element({}, replacementHero));
  click(new Element({ proClickSource: 'navbar' }));
  assert.deepEqual(captured.map(({ name, properties }) => [name, properties.source]), [
    ['pro_click', 'hero'], ['pro_click', 'hero'], ['pro_click', 'navbar'],
  ]);
});

test('unmarked and invalid targets do not become commercial signals', () => {
  const { bindProClickTracking, captured, Element, root, click } = setup();
  bindProClickTracking(root);
  for (const target of [null, {}, new Element(), new Element({ proClickSource: 'pricing' }), new Element({ proPlanId: 'monthly' })]) click(target);
  assert.equal(captured.length, 0);
});

test('plan selection stays a separate, deduplicated event with plan details', () => {
  const { bindProPlanClickTracking, captured } = setup();
  const handlers = [];
  const plan = {
    dataset: { proPlanId: 'monthly', proPlanPrice: '$10', proPlanBilling: 'monthly' },
    textContent: ' Get PRO ',
    addEventListener: (_type, handler) => handlers.push(handler),
  };
  const root = { querySelectorAll: () => [plan] };
  bindProPlanClickTracking(root);
  bindProPlanClickTracking(root);
  assert.equal(handlers.length, 1);
  handlers[0]();
  assert.equal(captured.length, 1);
  assert.equal(captured[0].name, 'pro_plan_click');
  assert.equal(captured[0].properties.plan, 'monthly');
  assert.equal(captured[0].properties.price_usd, 10);
});

test('photo comparison serves library intent before the optional rename CTA and keeps legacy anchors', () => {
  const article = read('src/content/blog/best-photo-organizing-software-mac.mdx');
  assert.ok(article.indexOf('## 1. Apple Photos') < article.indexOf('## Optional filename step:'));
  assert.ok(article.indexOf('## 6. Photo Mechanic Plus') < article.indexOf('<BlogCTA'));
  assert.doesNotMatch(article, /\| \*\*Zush\*\* \|/);
  assert.match(article, /id="1-zush-best-for-searchable-finder-filenames"/);
  assert.match(article, /title='Try descriptive filenames on a copied photo folder'/);
  assert.match(article, /earlyTaskExample: false/);
  assert.match(read('src/data/blogSchema.ts'), /earlyTaskExample: z.boolean\(\).default\(true\)/);
  assert.match(read('src/components/blog/BlogPostLayout.astro'), /taskExample && entry.data.earlyTaskExample &&/);
  const cta = read('src/components/blog/BlogCTA.astro');
  assert.match(cta, /data-title-mac=\{title \?\?/);
  assert.match(cta, /data-title-windows=\{title \?\?/);
});
