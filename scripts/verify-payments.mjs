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
}

function verifyAutoOpenFlow() {
  const src = read("src/hooks/useCheckoutAutoOpen.ts");
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
  verifyActivationAndRecovery();
  verifyCriticalRoutes();
  console.log(
    "[verify-payments] OK: Paddle, checkout, activation, recovery flows are intact.",
  );
} catch (error) {
  console.error("[verify-payments] FAILED:", error.message);
  process.exit(1);
}
