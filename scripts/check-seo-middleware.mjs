import middleware from '../middleware.js';
import { config } from '../middleware.js';

const checkoutAvailability = { BD: false, IN: false };
let checkoutAvailabilityCalls = 0;
globalThis.fetch = async (input) => {
  const url = new URL(String(input));
  if (url.pathname === '/functions/v1/checkout-availability') {
    checkoutAvailabilityCalls += 1;
    const country = url.searchParams.get('country');
    if (country === 'ZZ') throw new Error('checkout availability offline');
    return Response.json({ checkout_available: checkoutAvailability[country] ?? true });
  }
  if (url.pathname === '/404') {
    return new Response('<h1>Page not found</h1>', { status: 200 });
  }
  throw new Error(`Unexpected fetch: ${url}`);
};

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function assertRedirect(input, expectedLocation) {
  const response = await middleware(new Request(input));

  assert(response instanceof Response, `Expected redirect response for ${input}`);
  assert(response.status === 308, `Expected 308 for ${input}, got ${response.status}`);
  assert(
    response.headers.get('location') === expectedLocation,
    `Expected ${input} to redirect to ${expectedLocation}, got ${response.headers.get('location')}`,
  );
}

async function assertNextWithCookie(input, headers, expectedCookiePart) {
  const response = await middleware(new Request(input, { headers }));

  assert(response instanceof Response, `Expected middleware response for ${input}`);
  assert(response.headers.get('x-middleware-next') === '1', `Expected middleware next for ${input}.`);
  assert(
    response.headers.get('set-cookie')?.includes(expectedCookiePart),
    `Expected ${input} to set cookie containing ${expectedCookiePart}.`,
  );
  assert(
    response.headers.get('vary')?.toLowerCase().includes('x-vercel-ip-country'),
    `Expected ${input} to vary on x-vercel-ip-country.`,
  );
}

async function assertLegacyPostHogHostRedirect(path, expectedLocation) {
  const response = await middleware(new Request(
    `https://e.zushapp.com${path}`,
    { headers: { host: 'e.zushapp.com' } },
  ));

  assert(response instanceof Response, 'Legacy PostHog proxy host should redirect.');
  assert(response.status === 308, `Expected 308 for legacy PostHog proxy host, got ${response.status}.`);
  assert(
    response.headers.get('location') === expectedLocation,
    `Unexpected legacy PostHog proxy host location: ${response.headers.get('location')}`,
  );
}

await assertRedirect('https://zushapp.com/?ref=producthunt', 'https://zushapp.com/?utm_source=producthunt');
await assertRedirect(
  'https://zushapp.com/?checkout=pro&ref=producthunt',
  'https://zushapp.com/?checkout=pro&utm_source=producthunt',
);
await assertRedirect(
  'https://zushapp.com/?utm_source=google&ref=producthunt',
  'https://zushapp.com/?utm_source=google',
);

await assertLegacyPostHogHostRedirect('/', 'https://zushapp.com/');
await assertLegacyPostHogHostRedirect(
  '/some-proxy-path?batch=1',
  'https://zushapp.com/e/some-proxy-path?batch=1',
);
await assertLegacyPostHogHostRedirect('/capture/', 'https://zushapp.com/e/capture');
await assertLegacyPostHogHostRedirect('/e/', 'https://zushapp.com/e/e');

const cleanHomepage = await middleware(new Request('https://zushapp.com/'));
assert(cleanHomepage === undefined, 'Clean homepage should continue without middleware redirect.');

const nonHomepageRef = await middleware(new Request('https://zushapp.com/blog?ref=producthunt'));
assert(nonHomepageRef === undefined, 'Non-homepage ref URLs should continue without middleware redirect.');
assert(
  config.matcher.includes('e(?:/|$)'),
  'Middleware matcher must exclude the PostHog proxy path.',
);

await assertNextWithCookie(
  'https://zushapp.com/mac',
  { 'x-vercel-ip-country': 'TH' },
  'zush_posthog_country_optout=1',
);

const thailandRef = await middleware(new Request(
  'https://zushapp.com/?ref=producthunt',
  { headers: { 'x-vercel-ip-country': 'TH' } },
));
assert(thailandRef instanceof Response, 'Thailand homepage ref should redirect.');
assert(thailandRef.status === 308, `Expected 308 for Thailand homepage ref, got ${thailandRef.status}.`);
assert(
  thailandRef.headers.get('location') === 'https://zushapp.com/?utm_source=producthunt',
  `Unexpected Thailand homepage ref location: ${thailandRef.headers.get('location')}`,
);
assert(
  thailandRef.headers.get('set-cookie')?.includes('zush_posthog_country_optout=1'),
  'Thailand homepage ref redirect should set the PostHog opt-out cookie.',
);

await assertNextWithCookie(
  'https://zushapp.com/mac',
  {
    cookie: 'zush_posthog_country_optout=1',
    'x-vercel-ip-country': 'US',
  },
  'zush_posthog_country_optout=; Max-Age=0',
);

await assertNextWithCookie(
  'https://zushapp.com/mac',
  { 'x-vercel-ip-country': 'BD' },
  'zush_pricing_hidden=1',
);

const revalidation = await middleware(new Request('https://zushapp.com/mac', {
  headers: {
    'if-modified-since': 'Sat, 17 Oct 2026 00:00:00 GMT',
    'if-none-match': '"cached-before-country-change"',
    'x-vercel-ip-country': 'BD',
  },
}));
const forwardedHeaders = revalidation.headers
  .get('x-middleware-override-headers')
  ?.split(',') ?? [];
assert(
  forwardedHeaders.includes('x-vercel-ip-country') &&
    !forwardedHeaders.includes('if-none-match') &&
    !forwardedHeaders.includes('if-modified-since'),
  'A cookie-setting response must not be answered with a cookie-less 304.',
);

const callsBeforeCachedLookup = checkoutAvailabilityCalls;
await assertNextWithCookie(
  'https://zushapp.com/blog',
  { 'x-vercel-ip-country': 'BD' },
  'zush_pricing_hidden=1',
);
assert(
  checkoutAvailabilityCalls === callsBeforeCachedLookup,
  'Checkout availability should be cached per country.',
);

for (const path of ['/pricing', '/pricing/', '/de/pricing', '/pt-br/pricing']) {
  const blockedPricing = await middleware(new Request(
    `https://zushapp.com${path}`,
    { headers: { 'x-vercel-ip-country': 'IN' } },
  ));
  assert(blockedPricing instanceof Response, `Blocked ${path} should be answered by middleware.`);
  assert(blockedPricing.status === 404, `Expected 404 for blocked ${path}, got ${blockedPricing.status}.`);
  assert(
    blockedPricing.headers.get('cache-control') === 'private, no-store',
    `Blocked ${path} must not be cached for other visitors.`,
  );
  assert(
    (await blockedPricing.text()).includes('Page not found'),
    `Blocked ${path} should render the 404 page.`,
  );
  assert(
    blockedPricing.headers.get('set-cookie')?.includes('zush_pricing_hidden=1'),
    `Blocked ${path} should set the pricing cookie.`,
  );
}

const visiblePricing = await middleware(new Request(
  'https://zushapp.com/pricing',
  { headers: { 'x-vercel-ip-country': 'US' } },
));
assert(visiblePricing === undefined, 'Pricing should stay available for other countries.');

await assertNextWithCookie(
  'https://zushapp.com/pricing',
  {
    cookie: 'zush_pricing_hidden=1',
    'x-vercel-ip-country': 'DE',
  },
  'zush_pricing_hidden=; Max-Age=0',
);

const offlinePricing = await middleware(new Request(
  'https://zushapp.com/pricing',
  { headers: { 'x-vercel-ip-country': 'ZZ' } },
));
assert(
  offlinePricing === undefined,
  'A failed availability lookup should keep pricing visible.',
);

console.log('[check-seo-middleware] OK: homepage ref canonicalization, legacy PostHog redirect, PostHog country opt-out, and country pricing visibility validated.');
