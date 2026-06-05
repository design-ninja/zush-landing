import { geolocation, next } from '@vercel/functions';

const TRACKING_PARAMS_TO_STRIP = ['ref'];
const REF_TO_UTM_SOURCE_PARAM = 'ref';
const UTM_SOURCE_PARAM = 'utm_source';
const POSTHOG_COUNTRY_OPTOUT_COOKIE = 'zush_posthog_country_optout';
const POSTHOG_COUNTRY_OPTOUT_VALUE = '1';
const POSTHOG_COUNTRY_OPTOUT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const POSTHOG_COUNTRY_OPTOUT_COUNTRIES = new Set(['TH']);
const COUNTRY_VARY_HEADER = 'x-vercel-ip-country';

// fallow-ignore-next-line unused-export
export const config = {
  matcher: '/((?!.*\\..*).*)',
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

function buildPostHogCountryOptOutCookie(enabled) {
  const value = enabled ? POSTHOG_COUNTRY_OPTOUT_VALUE : '';
  const maxAge = enabled ? POSTHOG_COUNTRY_OPTOUT_MAX_AGE_SECONDS : 0;
  const expires = enabled ? '' : '; Expires=Thu, 01 Jan 1970 00:00:00 GMT';

  return [
    `${POSTHOG_COUNTRY_OPTOUT_COOKIE}=${value}`,
    `Max-Age=${maxAge}`,
    'Path=/',
    'SameSite=Lax',
    'Secure',
  ].join('; ') + expires;
}

function getVisitorCountry(request) {
  const country = geolocation(request).country ?? request.headers.get(COUNTRY_VARY_HEADER);
  return country?.toUpperCase();
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

function withPostHogCountryOptOutCookie(response, cookie) {
  if (!cookie) return response;

  const headers = new Headers(response.headers);
  headers.append('Set-Cookie', cookie);
  addVaryHeader(headers, COUNTRY_VARY_HEADER);

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}

export default function middleware(request) {
  const url = new URL(request.url);
  const postHogCountryOptOutCookie = getPostHogCountryOptOutCookie(request);

  if (url.pathname !== '/') {
    return postHogCountryOptOutCookie
      ? withPostHogCountryOptOutCookie(next(), postHogCountryOptOutCookie)
      : undefined;
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
    return postHogCountryOptOutCookie
      ? withPostHogCountryOptOutCookie(next(), postHogCountryOptOutCookie)
      : undefined;
  }

  return withPostHogCountryOptOutCookie(
    Response.redirect(url, 308),
    postHogCountryOptOutCookie,
  );
}
