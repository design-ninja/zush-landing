import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

function read(relPath) {
  return readFileSync(join(ROOT, relPath), 'utf8');
}

function assertMatch(source, regex, message) {
  if (!regex.test(source)) {
    throw new Error(message);
  }
}

function assertFile(relPath, message) {
  if (!existsSync(join(ROOT, relPath))) {
    throw new Error(message);
  }
}

function verifyPaddleCheckout() {
  const src = read('src/utils/paddle.ts');
  assertMatch(src, /export async function openPaddleCheckout/, 'Missing openPaddleCheckout export');
  assertMatch(src, /customData\s*=\s*\{\s*device_id:\s*deviceId/, 'Checkout customData.device_id is missing');
  assertMatch(src, /sessionStorage\.setItem\('zush_checkout_device_id',\s*deviceId\)/, 'Device ID is not persisted before checkout');
  assertMatch(src, /window\.location\.href = `\/thank-you\?email=\$\{encodeURIComponent\(email\)\}`;/, 'Thank-you redirect on checkout completion is missing');
}

function verifyAutoOpenFlow() {
  const src = read('src/hooks/useCheckoutAutoOpen.ts');
  assertMatch(src, /window\.location\.search/, 'checkout query parsing no longer reads location.search');
  assertMatch(src, /checkout !== 'pro'/, 'Auto-open trigger for checkout=pro is missing');
  assertMatch(src, /openPaddleCheckout\(deviceId,\s*PRO_PADDLE_PRICE_ID\)/, 'Auto-open no longer opens Paddle with PRO price');
}

function verifyActivationAndRecovery() {
  const activate = read('src/views/Activate/Activate.tsx');
  const recover = read('src/views/Recover/Recover.tsx');
  const manage = read('src/views/ManageSubscription/ManageSubscription.tsx');
  const manageConfirm = read('src/views/ManageSubscription/ManageSubscriptionConfirm.tsx');
  const thankYou = read('src/views/ThankYou/ThankYou.tsx');

  assertMatch(activate, /zush:\/\/activate\?token=\$\{token\}&email=\$\{encodeURIComponent\(email\)\}/, 'Activate deep link is missing');
  assertMatch(recover, /send-magic-link/, 'Recover flow endpoint changed or removed');
  assertMatch(manage, /send-customer-portal-link/, 'Manage subscription email-link endpoint changed or removed');
  assertMatch(manageConfirm, /get-customer-portal-url/, 'Manage subscription confirmation endpoint changed or removed');
  assertMatch(manageConfirm, /JSON\.stringify\(\{\s*token\s*\}\)/, 'Manage subscription confirmation no longer exchanges token');
  assertMatch(thankYou, /sessionStorage\.getItem\('zush_checkout_device_id'\)/, 'Thank-you app purchase detection is missing');
  assertMatch(thankYou, /sessionStorage\.removeItem\('zush_checkout_device_id'\)/, 'Thank-you cleanup of device id is missing');
}

function verifyCriticalRoutes() {
  const routes = [
    'src/pages/thank-you.astro',
    'src/pages/recover.astro',
    'src/pages/activate.astro',
    'src/pages/manage-subscription.astro',
    'src/pages/manage-subscription/confirm.astro',
  ];

  for (const routeFile of routes) {
    assertFile(routeFile, `Missing route file ${routeFile}`);
  }
}

try {
  verifyPaddleCheckout();
  verifyAutoOpenFlow();
  verifyActivationAndRecovery();
  verifyCriticalRoutes();
  console.log('[verify-payments] OK: Paddle, checkout, activation, recovery flows are intact.');
} catch (error) {
  console.error('[verify-payments] FAILED:', error.message);
  process.exit(1);
}
