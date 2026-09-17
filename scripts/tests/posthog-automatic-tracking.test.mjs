import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../../src/components/PostHogAnalytics.astro', import.meta.url), 'utf8');
const script = source.slice(source.indexOf('  (() => {'), source.lastIndexOf('</script>'));

function run({ cookie = '', hostname = 'zushapp.com', optedOut = false, defer = false } = {}) {
  const events = [];
  const listeners = new Map();
  const storage = new Map();
  let initialized = 0;
  let config;
  let initialize;
  const exceptions = [];
  const posthog = {
    __SV: 1,
    init(_key, options) { initialized++; config = options; },
    clear_opt_in_out_capturing() { optedOut = false; },
    register_for_session() {},
    register_once() {},
    capture(name, properties) {
      if (!optedOut) events.push(config.before_send({ event: name, properties }));
    },
    captureException(error, properties) { exceptions.push({ error, properties }); },
  };
  const context = {
    posthogProjectKey: 'test-project', posthogApiHost: '/e', posthogUiHost: 'https://us.posthog.com', URL,
    document: {
      cookie, referrer: 'https://www.google.com/', title: 'Zush', readyState: 'complete',
      addEventListener(name, handler) { listeners.set(name, handler); },
    },
    window: {
      posthog, location: { hostname, href: `https://${hostname}/`, pathname: '/' },
      sessionStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
      requestIdleCallback: (fn) => { initialize = fn; if (!defer) fn(); }, requestAnimationFrame: (fn) => fn(),
      addEventListener(name, handler) { listeners.set(name, handler); },
    },
  };
  vm.runInNewContext(script, context);
  return { events, listeners, initialized, exceptions, initialize, document: context.document };
}

test('first visit captures a pageview without a consent cookie and keeps attribution', () => {
  const result = run();
  assert.equal(result.initialized, 1);
  assert.equal(result.events.length, 1);
  assert.equal(result.events[0].properties.session_source, 'www.google.com');
  assert.equal(result.events[0].properties.session_channel, 'organic_search');
  result.listeners.get('astro:after-swap')();
  assert.equal(result.events.length, 2);
});

test('a legacy refusal and SDK opt-out no longer suppress collection', () => {
  const cookie = `zush_tracking_consent_v1=${encodeURIComponent(JSON.stringify({ version: 1, analytics: false, advertising: false }))}`;
  const result = run({ cookie, optedOut: true });
  assert.equal(result.events.length, 1);
  assert.equal(result.listeners.has('zush:tracking-consent-change'), false);
});

test('existing country exclusion and preview-host exclusion remain effective', () => {
  assert.equal(run({ cookie: 'zush_posthog_country_optout=1' }).initialized, 0);
  assert.equal(run({ hostname: 'localhost' }).initialized, 0);
});

const recoverableEvent = () => ({
  detail: { error: new Error('hydration mismatch'), properties: { react_component_stack: 'at DownloadButton' } },
  defaultPrevented: false,
  preventDefault() { this.defaultPrevented = true; },
});

test('early recoverable errors retain their stack and are captured once after initialization', () => {
  const result = run({ defer: true });
  const event = recoverableEvent();
  result.listeners.get('zush:react-recoverable-error')(event);
  assert.equal(event.defaultPrevented, true);
  assert.equal(result.exceptions.length, 0);
  result.initialize();
  result.initialize();
  assert.equal(result.exceptions.length, 1);
  assert.equal(result.exceptions[0].error, event.detail.error);
  assert.equal(result.exceptions[0].properties.react_component_stack, 'at DownloadButton');
  result.listeners.get('zush:react-recoverable-error')(recoverableEvent());
  assert.equal(result.exceptions.length, 2);
});

test('error queue is bounded and respects a country opt-out before initialization', () => {
  const result = run({ defer: true });
  const handler = result.listeners.get('zush:react-recoverable-error');
  for (let i = 0; i < 20; i++) handler(recoverableEvent());
  const overflow = recoverableEvent();
  handler(overflow);
  assert.equal(overflow.defaultPrevented, false);
  result.document.cookie = 'zush_posthog_country_optout=1';
  result.initialize();
  assert.equal(result.exceptions.length, 0);
  const excluded = recoverableEvent();
  handler(excluded);
  assert.equal(excluded.defaultPrevented, false);
  assert.equal(run({ hostname: 'localhost' }).listeners.has('zush:react-recoverable-error'), false);
});
