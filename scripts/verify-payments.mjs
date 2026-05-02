import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function read(relPath) {
  return readFileSync(join(ROOT, relPath), "utf8");
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
  const src = read("src/utils/paddle.ts");
  assertMatch(
    src,
    /export async function openPaddleCheckout/,
    "Missing openPaddleCheckout export",
  );
  assertMatch(
    src,
    /create-paddle-checkout-session/,
    "Checkout no longer creates a server-side Paddle session",
  );
  assertMatch(
    src,
    /transactionId:\s*checkoutSession\.transaction_id/,
    "Checkout no longer opens Paddle by server-created transaction",
  );
  assertMatch(
    src,
    /paddleScriptPromise/,
    "Checkout no longer reuses a single Paddle.js loading promise",
  );
  assertMatch(
    src,
    /waitForPaddleGlobal/,
    "Checkout no longer waits for the Paddle global before initializing",
  );
  assertMatch(
    src,
    /return initializePaddle\(\)/,
    "Checkout readiness can succeed without Paddle.Initialize completing",
  );
  assertMatch(
    src,
    /settings\s*=\s*\{\s*locale:\s*paddleLocale\s*\}/,
    "Checkout no longer passes the current page locale to Paddle",
  );
  assertMatch(
    src,
    /"zh-cn":\s*"zh-Hans"/,
    "Checkout no longer maps Simplified Chinese pages to Paddle's locale code",
  );
  assertMatch(
    src,
    /sessionStorage\.setItem\(\s*["']zush_checkout_device_id["'],\s*deviceId\s*\)/,
    "Device ID is not persisted before checkout",
  );
  assertMatch(
    src,
    /sessionStorage\.setItem\(\s*["']zush_checkout_session["'],\s*checkoutSession\.checkout_session\s*,?\s*\)/,
    "Checkout session is not persisted before checkout",
  );
  assertMatch(
    src,
    /params\.set\(["']checkout_session["'],\s*activeCheckoutSession\s*\)/,
    "Thank-you redirect no longer includes checkout session",
  );
  assertMatch(
    src,
    /waitForBrowserPaint/,
    "Checkout no longer waits for the browser to paint after clearing loading UI",
  );
}

function verifyAutoOpenFlow() {
  const src = read("src/utils/checkoutAutoOpen.ts");
  const layoutSrc = read("src/layouts/BaseLayout.astro");
  const paramsSrc = read("src/utils/checkoutParams.ts");
  assertMatch(
    src,
    /getCheckoutParam\(["']checkout["']\)/,
    "Auto-open no longer uses shared checkout param parsing",
  );
  assertMatch(
    src,
    /getCheckoutParam\(["']device_id["']\)/,
    "Auto-open no longer reads device_id through shared parsing",
  );
  assertMatch(
    paramsSrc,
    /new URLSearchParams\(location\.search\)/,
    "checkout param parsing no longer reads location.search",
  );
  assertMatch(
    paramsSrc,
    /paramsFromHash\(location\.hash\)/,
    "checkout param parsing no longer falls back to location.hash",
  );
  assertMatch(
    src,
    /checkout !== ["']pro["']/,
    "Auto-open trigger for checkout=pro is missing",
  );
  assertMatch(
    src,
    /openPaddleCheckout\(deviceId,\s*PRO_PADDLE_PRICE_ID\)/,
    "Auto-open no longer opens Paddle with PRO price",
  );
  assertMatch(
    src,
    /window\.setTimeout\(/,
    "Auto-open no longer defers checkout opening after page load",
  );
  assertMatch(
    layoutSrc,
    /bindCheckoutAutoOpen\(\)/,
    "Base layout no longer binds checkout auto-open flow",
  );
  assertMatch(
    layoutSrc,
    /window\.__zushLocaleRedirecting\s*=\s*true/,
    "Locale redirect no longer blocks checkout auto-open before navigation",
  );
  assertMatch(
    src,
    /__zushLocaleRedirecting/,
    "Auto-open no longer waits for locale redirect to finish",
  );
}

function verifyPricingCheckoutFlow() {
  const src = read("src/utils/pricingCheckout.ts");
  const pricingSrc = read("src/components/Pricing/Pricing.astro");
  const layoutSrc = read("src/layouts/BaseLayout.astro");

  assertMatch(
    pricingSrc,
    /data-paddle-checkout/,
    "Pricing button no longer exposes the Paddle checkout trigger",
  );
  assertMatch(
    pricingSrc,
    /data-paddle-price-id=\{plan\.paddlePriceId\}/,
    "Pricing button no longer passes the PRO price id",
  );
  assertMatch(
    src,
    /getCheckoutParam\(["']device_id["']\)/,
    "Pricing checkout no longer reads device_id through shared parsing",
  );
  assertMatch(
    src,
    /openPaddleCheckout\(deviceId,\s*priceId,\s*\{/,
    "Pricing checkout no longer opens Paddle with the selected price",
  );
  assertMatch(
    src,
    /onCheckoutOpen:\s*resetCheckoutButton/,
    "Pricing checkout no longer resets the loading state as Paddle opens",
  );
  assertMatch(
    layoutSrc,
    /bindPricingCheckout\(\)/,
    "Base layout no longer binds pricing checkout flow",
  );
}

function verifyActivationAndRecovery() {
  const activate = read("src/views/Activate/Activate.tsx");
  const recover = read("src/views/Recover/Recover.tsx");
  const manage = read("src/views/ManageSubscription/ManageSubscription.tsx");
  const manageConfirm = read(
    "src/views/ManageSubscription/ManageSubscriptionConfirm.tsx",
  );
  const thankYou = read("src/views/ThankYou/ThankYou.tsx");

  assertMatch(
    activate,
    /zush:\/\/activate\?token=\$\{token\}&email=\$\{encodeURIComponent\(email\)\}/,
    "Activate deep link is missing",
  );
  assertMatch(
    recover,
    /send-magic-link/,
    "Recover flow endpoint changed or removed",
  );
  assertMatch(
    manage,
    /send-customer-portal-link/,
    "Manage subscription email-link endpoint changed or removed",
  );
  assertMatch(
    manageConfirm,
    /get-customer-portal-url/,
    "Manage subscription confirmation endpoint changed or removed",
  );
  assertMatch(
    manageConfirm,
    /JSON\.stringify\(\{\s*token\s*\}\)/,
    "Manage subscription confirmation no longer exchanges token",
  );
  assertMatch(
    thankYou,
    /sessionStorage\.getItem\(["']zush_checkout_device_id["']\)/,
    "Thank-you app purchase detection is missing",
  );
  assertMatch(
    thankYou,
    /checkout-session-status/,
    "Thank-you no longer checks checkout session status",
  );
  assertMatch(
    thankYou,
    /window\.location\.href = appUrl/,
    "Thank-you no longer auto-opens Zush",
  );
  assertMatch(
    thankYou,
    /sessionStorage\.removeItem\(["']zush_checkout_device_id["']\)/,
    "Thank-you cleanup of device id is missing",
  );
}

function verifyCriticalRoutes() {
  const routes = [
    "src/pages/thank-you.astro",
    "src/pages/recover.astro",
    "src/pages/activate.astro",
    "src/pages/manage-subscription.astro",
    "src/pages/manage-subscription/confirm.astro",
  ];

  for (const routeFile of routes) {
    assertFile(routeFile, `Missing route file ${routeFile}`);
  }
}

try {
  verifyPaddleCheckout();
  verifyAutoOpenFlow();
  verifyPricingCheckoutFlow();
  verifyActivationAndRecovery();
  verifyCriticalRoutes();
  console.log(
    "[verify-payments] OK: Paddle, checkout, activation, recovery flows are intact.",
  );
} catch (error) {
  console.error("[verify-payments] FAILED:", error.message);
  process.exit(1);
}
