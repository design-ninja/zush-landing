import middleware from '../middleware.js';
import { config } from '../middleware.js';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertRedirect(input, expectedLocation) {
  const response = middleware(new Request(input));

  assert(response instanceof Response, `Expected redirect response for ${input}`);
  assert(response.status === 308, `Expected 308 for ${input}, got ${response.status}`);
  assert(
    response.headers.get('location') === expectedLocation,
    `Expected ${input} to redirect to ${expectedLocation}, got ${response.headers.get('location')}`,
  );
}

function assertNextWithCookie(input, headers, expectedCookiePart) {
  const response = middleware(new Request(input, { headers }));

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

function assertLegacyPostHogHostRedirect(path, expectedLocation) {
  const response = middleware(new Request(
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

assertRedirect('https://zushapp.com/?ref=producthunt', 'https://zushapp.com/?utm_source=producthunt');
assertRedirect(
  'https://zushapp.com/?checkout=pro&ref=producthunt',
  'https://zushapp.com/?checkout=pro&utm_source=producthunt',
);
assertRedirect(
  'https://zushapp.com/?utm_source=google&ref=producthunt',
  'https://zushapp.com/?utm_source=google',
);

assertLegacyPostHogHostRedirect(
  '/some-proxy-path?batch=1',
  'https://zushapp.com/e/some-proxy-path?batch=1',
);
assertLegacyPostHogHostRedirect('/capture/', 'https://zushapp.com/e/capture');
assertLegacyPostHogHostRedirect('/e/', 'https://zushapp.com/e/e');

const cleanHomepage = middleware(new Request('https://zushapp.com/'));
assert(cleanHomepage === undefined, 'Clean homepage should continue without middleware redirect.');

const nonHomepageRef = middleware(new Request('https://zushapp.com/blog?ref=producthunt'));
assert(nonHomepageRef === undefined, 'Non-homepage ref URLs should continue without middleware redirect.');
assert(
  config.matcher.includes('e(?:/|$)'),
  'Middleware matcher must exclude the PostHog proxy path.',
);

assertNextWithCookie(
  'https://zushapp.com/mac',
  { 'x-vercel-ip-country': 'TH' },
  'zush_posthog_country_optout=1',
);

const thailandRef = middleware(new Request(
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

assertNextWithCookie(
  'https://zushapp.com/mac',
  {
    cookie: 'zush_posthog_country_optout=1',
    'x-vercel-ip-country': 'US',
  },
  'zush_posthog_country_optout=; Max-Age=0',
);

function geoRequest(input, country, headers = {}) {
  return middleware(new Request(input, {
    headers: { 'x-vercel-ip-country': country, ...headers },
  }));
}

for (const country of ['IN', 'PK', 'BD']) {
  const blocked = geoRequest('https://zushapp.com/mac', country);
  assert(blocked instanceof Response, `Expected a response for ${country}.`);
  assert(blocked.status === 403, `Expected 403 for ${country}, got ${blocked.status}.`);
  assert(
    blocked.headers.get('x-robots-tag')?.includes('noindex'),
    `Geo-block response for ${country} must be noindex.`,
  );
  assert(
    blocked.headers.get('cache-control') === 'no-store',
    `Geo-block response for ${country} must not be cached.`,
  );
  assert(
    blocked.headers.get('vary')?.toLowerCase().includes('x-vercel-ip-country'),
    `Geo-block response for ${country} must vary on x-vercel-ip-country.`,
  );

  const crawler = geoRequest('https://zushapp.com/mac', country, {
    'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  });
  assert(
    crawler === undefined || crawler.status !== 403,
    `Googlebot must never be geo-blocked (${country}).`,
  );

  for (const path of [
    '/activate',
    '/recover',
    '/manage-subscription/confirm',
    '/api/review',
    '/de/activate',
    '/pt-br/manage-subscription',
  ]) {
    const exempt = geoRequest(`https://zushapp.com${path}`, country);
    assert(
      exempt === undefined || exempt.status !== 403,
      `${path} must stay reachable from ${country}.`,
    );
  }
}

for (const agent of [
  'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot',
  'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  'facebookexternalhit/1.1',
  'Mozilla/5.0 (compatible; Google-InspectionTool/1.0)',
]) {
  const response = geoRequest('https://zushapp.com/pricing', 'IN', { 'user-agent': agent });
  assert(
    response === undefined || response.status !== 403,
    `Crawler must not be geo-blocked: ${agent}`,
  );
}

const allowedVisitor = geoRequest('https://zushapp.com/mac', 'US');
assert(
  allowedVisitor === undefined || allowedVisitor.status !== 403,
  'Visitors outside the blocked countries must not get a 403.',
);

assert(
  config.matcher.includes('.*\\..*'),
  'Middleware matcher must skip dotted paths so robots.txt, sitemap.xml and /releases stay reachable everywhere.',
);

console.log('[check-seo-middleware] OK: homepage ref canonicalization, legacy PostHog redirect, PostHog country opt-out, and geo-block crawler safety validated.');
