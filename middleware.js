import { geolocation, next } from '@vercel/functions';

const TRACKING_PARAMS_TO_STRIP = ['ref'];
const REF_TO_UTM_SOURCE_PARAM = 'ref';
const UTM_SOURCE_PARAM = 'utm_source';
const POSTHOG_COUNTRY_OPTOUT_COOKIE = 'zush_posthog_country_optout';
const POSTHOG_COUNTRY_OPTOUT_VALUE = '1';
const POSTHOG_COUNTRY_OPTOUT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const POSTHOG_COUNTRY_OPTOUT_COUNTRIES = new Set(['TH']);
const COUNTRY_VARY_HEADER = 'x-vercel-ip-country';
const PRICING_HIDDEN_COOKIE = 'zush_pricing_hidden';
const PRICING_HIDDEN_VALUE = '1';
const PRICING_HIDDEN_MAX_AGE_SECONDS = 60 * 60 * 24;
// The backend owns the country policy (app_config) and answers per country,
// so the list is never shipped with the site.
const CHECKOUT_AVAILABILITY_URL = `${
  globalThis.process?.env?.PUBLIC_SUPABASE_URL || 'https://sjzrgmvinyxjzvshfvjy.supabase.co'
}/functions/v1/checkout-availability`;
const CHECKOUT_AVAILABILITY_TTL_MS = 10 * 60 * 1000;
const CHECKOUT_AVAILABILITY_RETRY_MS = 60 * 1000;
const CHECKOUT_AVAILABILITY_TIMEOUT_MS = 1000;
const PRICING_PAGE_PATTERN = /^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?pricing\/?$/;
const checkoutAvailabilityCache = new Map();
const LEGACY_POSTHOG_PROXY_HOST = 'e.zushapp.com';
const CANONICAL_HOST = 'zushapp.com';
const POSTHOG_PROXY_PATH = '/e';

export const config = {
  matcher: '/((?!e(?:/|$)|.*\\..*).*)',
};

function getCookieValue(cookieHeader, name) {
  if (!cookieHeader) return undefined;

  for (const cookie of cookieHeader.split(';')) {
    const [rawName, ...rawValue] = cookie.trim().split('=');
    if (rawName === name) {
      return rawValue.join('=');
    }
  }

  return undefined;
}

function buildCountryCookie(name, value, enabled, maxAgeSeconds) {
  return [
    `${name}=${enabled ? value : ''}`,
    `Max-Age=${enabled ? maxAgeSeconds : 0}`,
    'Path=/',
    'SameSite=Lax',
    'Secure',
  ].join('; ') + (enabled ? '' : '; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
}

function buildPostHogCountryOptOutCookie(enabled) {
  return buildCountryCookie(
    POSTHOG_COUNTRY_OPTOUT_COOKIE,
    POSTHOG_COUNTRY_OPTOUT_VALUE,
    enabled,
    POSTHOG_COUNTRY_OPTOUT_MAX_AGE_SECONDS,
  );
}

function getVisitorCountry(request) {
  const country = geolocation(request).country ?? request.headers.get(COUNTRY_VARY_HEADER);
  return country?.toUpperCase();
}

// Unknown or failed lookups keep pricing visible: checkout itself re-checks
// the buyer's country on the backend.
function isCheckoutAvailable(country) {
  const cached = checkoutAvailabilityCache.get(country);
  if (cached && cached.expiresAt > Date.now()) return cached.available;

  const lookup = fetch(
    `${CHECKOUT_AVAILABILITY_URL}?country=${encodeURIComponent(country)}`,
    { signal: AbortSignal.timeout(CHECKOUT_AVAILABILITY_TIMEOUT_MS) },
  )
    .then(async (response) => {
      const body = response.ok ? await response.json() : null;
      return typeof body?.checkout_available === 'boolean'
        ? body.checkout_available
        : null;
    })
    .catch(() => null)
    .then((available) => {
      checkoutAvailabilityCache.set(country, {
        available: available ?? true,
        expiresAt: Date.now() + (available === null
          ? CHECKOUT_AVAILABILITY_RETRY_MS
          : CHECKOUT_AVAILABILITY_TTL_MS),
      });
      return available ?? true;
    });
  checkoutAvailabilityCache.set(country, {
    available: lookup,
    expiresAt: Date.now() + CHECKOUT_AVAILABILITY_TIMEOUT_MS,
  });
  return lookup;
}

async function getPricingHiddenCookie(request, country) {
  if (!country || !/^[A-Z]{2}$/.test(country)) {
    return { hidden: false, cookie: undefined };
  }

  const hidden = !(await isCheckoutAvailable(country));
  if (hidden) {
    return {
      hidden,
      cookie: buildCountryCookie(
        PRICING_HIDDEN_COOKIE,
        PRICING_HIDDEN_VALUE,
        true,
        PRICING_HIDDEN_MAX_AGE_SECONDS,
      ),
    };
  }

  const current = getCookieValue(request.headers.get('cookie'), PRICING_HIDDEN_COOKIE);
  return {
    hidden,
    cookie: current === PRICING_HIDDEN_VALUE
      ? buildCountryCookie(PRICING_HIDDEN_COOKIE, '', false, 0)
      : undefined,
  };
}

async function pricingNotFoundResponse(url, cookies) {
  const headers = new Headers({
    'Cache-Control': 'private, no-store',
    'Content-Type': 'text/html; charset=utf-8',
  });
  let body = 'Not Found';
  try {
    const page = await fetch(new URL('/404', url), {
      signal: AbortSignal.timeout(CHECKOUT_AVAILABILITY_TIMEOUT_MS),
    });
    if (page.ok) body = await page.text();
  } catch {
    // The plain body still answers 404.
  }

  return withCountryCookies(new Response(body, { status: 404, headers }), cookies);
}

// Vercel answers a browser revalidation with 304 and drops Set-Cookie, so a
// page cached before the visitor's country changed would keep a stale cookie.
// Forward the request without conditional headers whenever a cookie is set.
function nextWithCountryCookies(request, cookies) {
  if (!cookies.length) return undefined;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete('if-none-match');
  requestHeaders.delete('if-modified-since');
  return withCountryCookies(next({ request: { headers: requestHeaders } }), cookies);
}

function getRequestHost(request) {
  return request.headers.get('host')?.split(':')[0].toLowerCase();
}

function buildLegacyPostHogProxyRedirectUrl(requestUrl) {
  const redirectUrl = new URL(requestUrl.href);
  const isRootRequest = redirectUrl.pathname === '/';
  const pathWithoutTrailingSlash = redirectUrl.pathname === '/'
    ? ''
    : redirectUrl.pathname.replace(/\/+$/, '');

  redirectUrl.protocol = 'https:';
  redirectUrl.host = CANONICAL_HOST;
  redirectUrl.pathname = isRootRequest
    ? '/'
    : `${POSTHOG_PROXY_PATH}${pathWithoutTrailingSlash}`;

  return redirectUrl;
}

function getPostHogCountryOptOutCookie(request) {
  const country = getVisitorCountry(request);
  if (country && POSTHOG_COUNTRY_OPTOUT_COUNTRIES.has(country)) {
    return buildPostHogCountryOptOutCookie(true);
  }

  const currentOptOut = getCookieValue(request.headers.get('cookie'), POSTHOG_COUNTRY_OPTOUT_COOKIE);
  if (country && currentOptOut === POSTHOG_COUNTRY_OPTOUT_VALUE) {
    return buildPostHogCountryOptOutCookie(false);
  }

  return undefined;
}

function addVaryHeader(headers, value) {
  const existing = headers.get('Vary');
  if (!existing) {
    headers.set('Vary', value);
    return;
  }

  const values = existing.split(',').map((item) => item.trim().toLowerCase());
  if (!values.includes(value.toLowerCase())) {
    headers.set('Vary', `${existing}, ${value}`);
  }
}

function withCountryCookies(response, cookies) {
  if (!cookies.length) return response;

  const headers = new Headers(response.headers);
  for (const cookie of cookies) {
    headers.append('Set-Cookie', cookie);
  }
  addVaryHeader(headers, COUNTRY_VARY_HEADER);

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);

  if (getRequestHost(request) === LEGACY_POSTHOG_PROXY_HOST) {
    return Response.redirect(buildLegacyPostHogProxyRedirectUrl(url), 308);
  }

  const pricing = await getPricingHiddenCookie(request, getVisitorCountry(request));
  const cookies = [getPostHogCountryOptOutCookie(request), pricing.cookie]
    .filter(Boolean);

  if (pricing.hidden && PRICING_PAGE_PATTERN.test(url.pathname)) {
    return pricingNotFoundResponse(url, cookies);
  }

  if (url.pathname !== '/') {
    return nextWithCountryCookies(request, cookies);
  }

  let changed = false;

  const ref = url.searchParams.get(REF_TO_UTM_SOURCE_PARAM);
  if (ref && !url.searchParams.has(UTM_SOURCE_PARAM)) {
    url.searchParams.set(UTM_SOURCE_PARAM, ref);
    changed = true;
  }

  for (const param of TRACKING_PARAMS_TO_STRIP) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      changed = true;
    }
  }

  if (!changed) {
    return nextWithCountryCookies(request, cookies);
  }

  return withCountryCookies(Response.redirect(url, 308), cookies);
}
