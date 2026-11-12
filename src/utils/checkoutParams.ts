interface CheckoutParamsLocation {
  search: string;
  hash: string;
}

function paramsFromHash(hash: string): URLSearchParams {
  const fragment = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!fragment) return new URLSearchParams();

  const queryStart = fragment.indexOf("?");
  if (queryStart >= 0) {
    return new URLSearchParams(fragment.slice(queryStart + 1));
  }

  const ampStart = fragment.indexOf("&");
  if (ampStart >= 0) {
    return new URLSearchParams(fragment.slice(ampStart + 1));
  }

  return new URLSearchParams(fragment);
}

// Paddle transaction IDs are "txn_" followed by 26 lowercase letters and digits.
const PADDLE_TRANSACTION_ID_PATTERN = /^txn_[a-z\d]{26}$/;

export function isPaddleTransactionId(value: string | null): value is string {
  return value !== null && PADDLE_TRANSACTION_ID_PATTERN.test(value);
}

// Checkout session tokens are 32 random bytes in lowercase hex.
const CHECKOUT_SESSION_PATTERN = /^[a-f\d]{64}$/;

export function isCheckoutSessionToken(value: string | null): value is string {
  return value !== null && CHECKOUT_SESSION_PATTERN.test(value);
}

const CHECKOUT_SESSION_HANDOFF_KEY = "zush_checkout_session_handoff";

interface CheckoutSessionHandoff {
  checkoutSession?: unknown;
  transactionId?: unknown;
}

// The `checkout_session` the head script of BaseLayout moved out of the page URL, so analytics
// never send it. With a transaction, only the token that came with that transaction is returned.
export function readCheckoutSessionHandoff(
  transactionId: string | null = null,
  storage: Pick<Storage, "getItem"> = window.sessionStorage,
): string | null {
  try {
    const raw = storage.getItem(CHECKOUT_SESSION_HANDOFF_KEY);
    if (!raw) return null;
    const handoff = JSON.parse(raw) as CheckoutSessionHandoff | null;
    const checkoutSession = typeof handoff?.checkoutSession === "string" ? handoff.checkoutSession : null;
    if (!isCheckoutSessionToken(checkoutSession)) return null;
    if (transactionId !== null && handoff?.transactionId !== transactionId) return null;
    return checkoutSession;
  } catch {
    // Storage blocked or a value this code did not write: there is no token to hand off.
    return null;
  }
}

export function clearCheckoutSessionHandoff(
  storage: Pick<Storage, "removeItem"> = window.sessionStorage,
): void {
  try {
    storage.removeItem(CHECKOUT_SESSION_HANDOFF_KEY);
  } catch {
    // Storage blocked: nothing was stored either.
  }
}

export function getCheckoutParam(
  name: string,
  location: CheckoutParamsLocation = window.location,
): string | null {
  const searchValue = new URLSearchParams(location.search).get(name);
  if (searchValue) return searchValue;

  return paramsFromHash(location.hash).get(name);
}
