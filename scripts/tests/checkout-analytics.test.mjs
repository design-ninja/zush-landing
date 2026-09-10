import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import vm from 'node:vm';

const source = readFileSync(new URL('../../src/utils/checkoutAnalytics.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { getCheckoutAnalyticsEvent } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

test('captures checkout lifecycle, discount changes and payment failures', () => {
  for (const [event, expected] of [
    ['checkout.loaded', 'checkout_loaded'], ['checkout.closed', 'checkout_closed'],
    ['checkout.error', 'checkout_error'], ['checkout.payment.error', 'checkout_payment_error'],
    ['checkout.payment.failed', 'checkout_payment_failed'],
    ['checkout.discount.applied', 'checkout_discount_applied'],
    ['checkout.discount.removed', 'checkout_discount_removed'],
  ]) assert.equal(getCheckoutAnalyticsEvent({ name: event }).name, expected);
});

test('error fields come from top-level Paddle error schema', () => {
  const { properties } = getCheckoutAnalyticsEvent({ name: 'checkout.error', code: 'validation', type: 'api_error', detail: 'private details' });
  assert.equal(properties.error_code, 'validation');
  assert.equal(properties.error_type, 'api_error');
  assert.equal('detail' in properties, false);
});

test('keeps correlation fields without copying customer, card or coupon text', () => {
  const { properties } = getCheckoutAnalyticsEvent({ name: 'checkout.discount.applied', data: {
    id: 'che_test', transaction_id: 'txn_test', discount: { id: 'dsc_test', code: 'private-code' },
    customer: { email: 'private@example.com' }, payment: { card: 'private' },
  } });
  assert.equal(properties.transaction_id, 'txn_test');
  assert.equal(properties.discount_id, 'dsc_test');
  assert.equal(JSON.stringify(properties).includes('private'), false);
});

test('does not emit duplicate purchase events or arbitrary SDK events', () => {
  for (const name of ['checkout.completed', 'checkout.updated', 'new.event', 'constructor']) {
    assert.equal(getCheckoutAnalyticsEvent({ name }), null);
  }
});

test('global Paddle callback survives UI unsubscribe and fallback preserves visitor identity', async () => {
  const paddleSource = readFileSync(new URL('../../src/utils/paddle.ts', import.meta.url), 'utf8');
  const js = ts.transpileModule(paddleSource.replace(/^import .*;\n/gm, '').replaceAll('import.meta.env', 'testEnv'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const captured = [];
  let config;
  let opened;
  const context = {
    exports: {}, testEnv: { PUBLIC_PADDLE_TOKEN: 'test', PUBLIC_PADDLE_ENVIRONMENT: 'sandbox' },
    SUPABASE_URL: 'https://example.test', getAnalyticsDistinctId: () => 'visitor-test', getCheckoutAnalyticsEvent,
    trackAnalyticsEvent: (name, properties) => captured.push({ name, properties }),
    URLSearchParams, console: { log() {}, warn() {}, error() {} },
    fetch: async () => ({ ok: false, text: async () => 'unavailable' }),
    sessionStorage: { setItem() {}, removeItem() {} },
    document: { documentElement: { lang: 'en' } }, navigator: { language: 'en' },
    window: { location: { search: '' }, Paddle: {
      Environment: { set() {} }, Initialize: value => { config = value; },
      Checkout: { open: value => { opened = value; } },
    } },
  };
  vm.runInNewContext(js, context);
  assert.equal(await context.exports.openPaddleCheckout(null, 'pri_test'), true);
  assert.equal(opened.customData.posthog_distinct_id, 'visitor-test');
  let notifications = 0;
  const unsubscribe = context.exports.onPaddleCheckoutEvent(() => { notifications++; });
  config.eventCallback({ name: 'checkout.loaded' });
  unsubscribe();
  config.eventCallback({ name: 'checkout.discount.applied', data: { discount: { id: 'dsc_test' } } });
  config.eventCallback({ name: 'checkout.closed' });
  assert.equal(notifications, 1);
  assert.deepEqual(captured.map(event => event.name), ['checkout_loaded', 'checkout_discount_applied', 'checkout_closed']);
  assert.equal(captured[1].properties.paddle_price_id, 'pri_test');
});
