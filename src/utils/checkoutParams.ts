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

export function getCheckoutParam(
  name: string,
  location: CheckoutParamsLocation = window.location,
): string | null {
  const searchValue = new URLSearchParams(location.search).get(name);
  if (searchValue) return searchValue;

  return paramsFromHash(location.hash).get(name);
}
