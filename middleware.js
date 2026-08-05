import { geolocation, next } from '@vercel/functions';

const TRACKING_PARAMS_TO_STRIP = ['ref', 'zush_geo_bypass'];
const REF_TO_UTM_SOURCE_PARAM = 'ref';
const UTM_SOURCE_PARAM = 'utm_source';
const POSTHOG_COUNTRY_OPTOUT_COOKIE = 'zush_posthog_country_optout';
const POSTHOG_COUNTRY_OPTOUT_VALUE = '1';
const POSTHOG_COUNTRY_OPTOUT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const POSTHOG_COUNTRY_OPTOUT_COUNTRIES = new Set(['TH']);
const COUNTRY_VARY_HEADER = 'x-vercel-ip-country';
const LEGACY_POSTHOG_PROXY_HOST = 'e.zushapp.com';
const CANONICAL_HOST = 'zushapp.com';
const POSTHOG_PROXY_PATH = '/e';
const SUPPORT_EMAIL = 'support@zushapp.com';

// Countries whose visitors get a 403 instead of the site.
const BLOCKED_COUNTRIES = new Set(['IN', 'PK', 'BD']);

// Search engines, AI crawlers, link-preview fetchers and uptime monitors are never
// geo-blocked: an indexer that sees a 403 drops the URL, and the whole point is to
// keep organic search intact. Googlebot crawls from the US, so this only matters for
// the rare locale-aware crawl and for spot checks run from a blocked region.
const ALWAYS_ALLOWED_USER_AGENTS = new RegExp([
  // Search
  'googlebot', 'google-inspectiontool', 'googleother', 'storebot-google', 'adsbot-google',
  'mediapartners-google', 'apis-google', 'feedfetcher-google',
  'bingbot', 'bingpreview', 'adidxbot', 'msnbot',
  'duckduckbot', 'duckassistbot', 'yandex', 'baiduspider', 'applebot', 'petalbot',
  'seznambot', 'sogou', 'slurp', 'ia_archiver', 'archive\\.org_bot', 'mojeekbot', 'qwantify',
  // AI / answer engines
  'gptbot', 'oai-searchbot', 'chatgpt-user', 'claudebot', 'claude-user', 'claude-searchbot',
  'anthropic-ai', 'perplexitybot', 'perplexity-user', 'amazonbot', 'meta-externalagent',
  'bytespider', 'ccbot', 'cohere-ai', 'mistralai-user', 'youbot', 'timpibot',
  // Link previews
  'facebookexternalhit', 'facebookcatalog', 'twitterbot', 'linkedinbot', 'slackbot',
  'discordbot', 'telegrambot', 'whatsapp', 'pinterest', 'redditbot', 'embedly',
  'skypeuripreview', 'vkshare',
  // Audits and monitoring
  'lighthouse', 'pagespeed', 'gtmetrix', 'uptimerobot', 'pingdom', 'betteruptime',
  'better-uptime', 'validator\\.w3\\.org',
].join('|'), 'i');

// Transactional routes an existing customer in a blocked country still needs.
// All of them are noindex/sitemap-excluded, so keeping them open costs nothing in SEO.
const LOCALE_PREFIX_PATTERN = /^\/(?:de|fr|es|pt-br|nl|it|ja|ko|zh-cn|tr|ar)(?=\/|$)/;
const GEO_BLOCK_EXEMPT_PATHS = [
  '/activate',
  '/recover',
  '/thank-you',
  '/manage-subscription',
  '/api/',
];

// Optional escape hatch for testing from a blocked region:
// visit /?zush_geo_bypass=<GEO_BYPASS_TOKEN> once, then the cookie carries it.
const GEO_BYPASS_PARAM = 'zush_geo_bypass';
const GEO_BYPASS_COOKIE = 'zush_geo_bypass';
const GEO_BYPASS_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

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

function getRequestHost(request) {
  return request.headers.get('host')?.split(':')[0].toLowerCase();
}

function buildLegacyPostHogProxyRedirectUrl(requestUrl) {
  const redirectUrl = new URL(requestUrl.href);
  const pathWithoutTrailingSlash = redirectUrl.pathname === '/'
    ? ''
    : redirectUrl.pathname.replace(/\/+$/, '');

  redirectUrl.protocol = 'https:';
  redirectUrl.host = CANONICAL_HOST;
  redirectUrl.pathname = `${POSTHOG_PROXY_PATH}${pathWithoutTrailingSlash}`;

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

function hasGeoBypass(request, url) {
  const token = process.env.GEO_BYPASS_TOKEN;
  if (!token) return false;

  return url.searchParams.get(GEO_BYPASS_PARAM) === token
    || getCookieValue(request.headers.get('cookie'), GEO_BYPASS_COOKIE) === token;
}

function getGeoBypassCookie(url) {
  const token = process.env.GEO_BYPASS_TOKEN;
  if (!token || url.searchParams.get(GEO_BYPASS_PARAM) !== token) return undefined;

  return [
    `${GEO_BYPASS_COOKIE}=${token}`,
    `Max-Age=${GEO_BYPASS_MAX_AGE_SECONDS}`,
    'Path=/',
    'SameSite=Lax',
    'Secure',
  ].join('; ');
}

function isGeoBlockExemptPath(pathname) {
  const path = pathname.replace(LOCALE_PREFIX_PATTERN, '');

  return GEO_BLOCK_EXEMPT_PATHS.some(
    (exempt) => path === exempt.replace(/\/$/, '') || path.startsWith(exempt),
  );
}

function buildGeoBlockResponse() {
  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Zush is not available in your region</title>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px;
         font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
         background: #fff; color: #111; }
  main { max-width: 32rem; text-align: center; }
  h1 { font-size: 1.5rem; margin: 0 0 12px; }
  p { margin: 0 0 8px; color: #555; }
  a { color: inherit; }
  @media (prefers-color-scheme: dark) {
    body { background: #0b0b0c; color: #f5f5f5; }
    p { color: #a1a1a6; }
  }
</style>
</head>
<body>
<main>
  <h1>Zush is not available in your region</h1>
  <p>We currently do not sell or distribute Zush here.</p>
  <p>If you believe this is a mistake, write to <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
</main>
</body>
</html>`;

  return new Response(body, {
    status: 403,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Never let a blocked response be cached or indexed.
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      Vary: COUNTRY_VARY_HEADER,
    },
  });
}

function getGeoBlockResponse(request, url) {
  const country = getVisitorCountry(request);
  if (!country || !BLOCKED_COUNTRIES.has(country)) return undefined;
  if (isGeoBlockExemptPath(url.pathname)) return undefined;
  if (ALWAYS_ALLOWED_USER_AGENTS.test(request.headers.get('user-agent') ?? '')) return undefined;
  if (hasGeoBypass(request, url)) return undefined;

  return buildGeoBlockResponse();
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

function withCookies(response, cookies) {
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

export default function middleware(request) {
  const url = new URL(request.url);

  if (getRequestHost(request) === LEGACY_POSTHOG_PROXY_HOST) {
    return Response.redirect(buildLegacyPostHogProxyRedirectUrl(url), 308);
  }

  const geoBlockResponse = getGeoBlockResponse(request, url);
  if (geoBlockResponse) return geoBlockResponse;

  const cookies = [
    getGeoBypassCookie(url),
    getPostHogCountryOptOutCookie(request),
  ].filter(Boolean);

  if (url.pathname !== '/') {
    return cookies.length ? withCookies(next(), cookies) : undefined;
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
    return cookies.length ? withCookies(next(), cookies) : undefined;
  }

  return withCookies(Response.redirect(url, 308), cookies);
}
