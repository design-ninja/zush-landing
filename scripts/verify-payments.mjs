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

function verifyStripeCheckout() {
  const src = read("src/utils/stripeCheckout.ts");
  assertMatch(
    src,
    /export async function openStripeCheckout/,
    "Missing openStripeCheckout export",
  );
  assertMatch(
    src,
    /create-stripe-checkout-session/,
    "Checkout no longer creates a server-side Stripe session",
  );
  assertMatch(
    src,
    /source:\s*deviceId\s*\?\s*["']app["']\s*:\s*["']landing["']/,
    "Direct website checkout no longer marks sessions as landing purchases",
  );
  assertMatch(
    src,
    /window\.location\.href = checkoutSession\.checkout_url/,
    "Checkout no longer redirects to Stripe-hosted Checkout",
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
    /stripe_checkout_session_id/,
    "Stripe Checkout Session id is no longer part of the response contract",
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
    /getCheckoutTarget\(checkout\)/,
    "Auto-open no longer resolves checkout plan to a price",
  );
  assertMatch(
    src,
    /case ["']monthly["']/,
    "Auto-open trigger for checkout=monthly is missing",
  );
  assertMatch(
    src,
    /case ["']one-time["']/,
    "Auto-open trigger for checkout=one-time is missing",
  );
  assertMatch(
    src,
    /case ["']pro["']/,
    "Legacy checkout=pro fallback is missing",
  );
  assertMatch(
    src,
    /openStripeCheckout\(deviceId,\s*checkoutTarget\.priceId,\s*\{/,
    "Auto-open no longer opens Stripe with the resolved price",
  );
  assertMatch(
    src,
    /plan:\s*checkoutTarget\.plan/,
    "Auto-open no longer passes the resolved Stripe plan",
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
    /data-stripe-checkout/,
    "Pricing button no longer exposes the Stripe checkout trigger",
  );
  assertMatch(
    pricingSrc,
    /data-stripe-price-id=\{plan\.stripePriceId\}/,
    "Pricing button no longer passes the PRO price id",
  );
  assertMatch(
    pricingSrc,
    /data-stripe-plan=\{plan\.stripePlan\}/,
    "Pricing button no longer passes the Stripe plan",
  );
  assertMatch(
    src,
    /getCheckoutParam\(["']device_id["']\)/,
    "Pricing checkout no longer reads device_id through shared parsing",
  );
  assertMatch(
    src,
    /openStripeCheckout\(deviceId,\s*priceId,\s*\{/,
    "Pricing checkout no longer opens Stripe with the selected price",
  );
  assertMatch(
    src,
    /plan,/,
    "Pricing checkout no longer passes the Stripe plan",
  );
  assertMatch(
    src,
    /onCheckoutOpen:\s*resetCheckoutButton/,
    "Pricing checkout no longer resets the loading state before Stripe redirect",
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
    /setActivationState\(result\.status === ["']expired["'] \? ["']expired["'] : ["']email["']\)/,
    "Direct website checkout completion no longer falls back to email activation",
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
  verifyStripeCheckout();
  verifyAutoOpenFlow();
  verifyPricingCheckoutFlow();
  verifyActivationAndRecovery();
  verifyCriticalRoutes();
  console.log(
    "[verify-payments] OK: Stripe checkout, activation, recovery, and portal flows are intact.",
  );
} catch (error) {
  console.error("[verify-payments] FAILED:", error.message);
  process.exit(1);
}
