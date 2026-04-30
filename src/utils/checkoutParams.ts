// fallow-ignore-file unused-file
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

// fallow-ignore-next-line unused-export
export function getCheckoutParam(
  name: string,
  location: CheckoutParamsLocation = window.location,
): string | null {
  const searchValue = new URLSearchParams(location.search).get(name);
  if (searchValue) return searchValue;

  return paramsFromHash(location.hash).get(name);
}
