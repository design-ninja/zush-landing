import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../../src/components/PostHogAnalytics.astro', import.meta.url), 'utf8');
const script = source.slice(source.indexOf('  (() => {'), source.lastIndexOf('</script>'));

function run({ cookie = '', hostname = 'zushapp.com', optedOut = false } = {}) {
  const events = [];
  const listeners = new Map();
  const storage = new Map();
  let initialized = 0;
  let config;
  const posthog = {
    __SV: 1,
    init(_key, options) { initialized++; config = options; },
    clear_opt_in_out_capturing() { optedOut = false; },
    register_for_session() {},
    register_once() {},
    capture(name, properties) {
      if (!optedOut) events.push(config.before_send({ event: name, properties }));
    },
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
      requestIdleCallback: (fn) => fn(), requestAnimationFrame: (fn) => fn(),
      addEventListener(name, handler) { listeners.set(name, handler); },
    },
  };
  vm.runInNewContext(script, context);
  return { events, listeners, initialized };
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
