import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { reactHydrationDiagnostics } from '../react-hydration-diagnostics.mjs';

test('adapter resolves only the installed Astro React renderer dependency', () => {
  const plugin = reactHydrationDiagnostics();
  const renderer = import.meta.resolve('@astrojs/react/client.js');
  assert.match(plugin.resolveId('react-dom/client', renderer), /reactHydrationClient\.ts$/);
  assert.equal(plugin.resolveId('react-dom/client', '/src/App.tsx'), null);
  assert.equal(plugin.resolveId('react-dom/client', '/src/utils/reactHydrationClient.ts'), null);
  assert.equal(plugin.resolveId('react-dom/server', renderer), null);
});

function setup({ capture = true, microsoftMarker = true, sourceLang = null, islandHtml = {} } = {}) {
  const events = [];
  const reported = [];
  let rootOptions;
  const root = {};
  const document = {
    documentElement: {
      lang: 'ja',
      classList: { contains: (name) => name === document.googleClass },
      getAttribute: (name) => (name === 'data-source-lang' ? sourceLang : null),
    },
    querySelector: () => (microsoftMarker ? {} : null),
  };
  class Element {
    ownerDocument = document;
    textContent = islandHtml.text ?? '  Download\n  for Mac ';
    closest() { return this; }
    querySelector(selector) { return selector === 'font' && islandHtml.font ? {} : null; }
    getAttribute(name) { return { 'component-url': '/_astro/DownloadButton.js', 'component-export': 'default', client: 'idle' }[name]; }
  }
  const source = readFileSync(new URL('../../src/utils/reactHydrationClient.ts', import.meta.url), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const context = {
    exports: {}, Element, CustomEvent,
    window: {
      document,
      dispatchEvent(event) { events.push(event); if (capture) event.preventDefault(); return !event.defaultPrevented; },
      reportError(error) { reported.push(error); },
    },
    require: () => ({ hydrateRoot(_container, _children, options) { rootOptions = options; return root; }, createRoot() {} }),
  };
  vm.runInNewContext(js, context);
  return { hydrateRoot: context.exports.hydrateRoot, container: new Element(), document, root, events, reported, getOptions: () => rootOptions };
}

test('recoverable errors carry island identity, component stack and translation state without duplicate reports', () => {
  const harness = setup();
  assert.equal(harness.hydrateRoot(harness.container, null, { identifierPrefix: 'astro-' }), harness.root);
  assert.equal(harness.getOptions().identifierPrefix, 'astro-');
  harness.document.documentElement.lang = 'en';
  const error = new Error('mismatch');
  harness.getOptions().onRecoverableError(error, { componentStack: 'at DownloadButton' });
  const { detail } = harness.events[0];
  assert.equal(detail.error, error);
  assert.equal(detail.properties.react_component_stack, 'at DownloadButton');
  assert.equal(detail.properties.astro_component_url, '/_astro/DownloadButton.js');
  assert.equal(detail.properties.hydration_document_lang, 'ja');
  assert.equal(detail.properties.document_lang, 'en');
  assert.equal(detail.properties.hydration_microsoft_translate_marker, true);
  assert.equal(harness.reported.length, 0);
});

test('missing analytics retains default error reporting and an existing callback is preserved', () => {
  const harness = setup({ capture: false });
  const error = new Error('mismatch');
  harness.hydrateRoot(harness.container, null);
  harness.getOptions().onRecoverableError(error, {});
  assert.deepEqual(harness.reported, [error]);
  const handled = [];
  harness.hydrateRoot(harness.container, null, { onRecoverableError: (e) => handled.push(e) });
  harness.getOptions().onRecoverableError(error, {});
  assert.deepEqual(handled, [error]);
  assert.equal(harness.reported.length, 1);
});

const mismatch = () => new Error('Minified React error #418; visit https://react.dev/errors/418');

test('mismatches from page translation are not reported, but an existing callback still runs', () => {
  for (const options of [
    { islandHtml: { font: true } },
    { sourceLang: 'en' },
    { googleClass: 'translated-ltr' },
    {},
  ]) {
    const harness = setup({ microsoftMarker: false, ...options });
    if (options.googleClass) harness.document.googleClass = options.googleClass;
    if (options.sourceLang) harness.document.documentElement.lang = 'zh-TW';
    const handled = [];
    harness.hydrateRoot(harness.container, null, { onRecoverableError: (e) => handled.push(e) });
    const hints = options.islandHtml || options.sourceLang || options.googleClass;
    harness.getOptions().onRecoverableError(mismatch(), {});
    assert.equal(harness.events.length, hints ? 0 : 1);
    assert.equal(handled.length, 1);
  }
});

test('an unexplained mismatch carries the island text sample and lang state', () => {
  const harness = setup({ microsoftMarker: false, sourceLang: 'en' });
  harness.document.documentElement.lang = 'en';
  harness.hydrateRoot(harness.container, null);
  harness.getOptions().onRecoverableError(mismatch(), {});
  const { properties } = harness.events[0].detail;
  assert.equal(properties.hydration_island_text_sample, 'Download for Mac');
  assert.equal(properties.hydration_island_font_marker, false);
  assert.equal(properties.hydration_document_lang_changed, false);
  assert.equal(harness.reported.length, 0);
});
