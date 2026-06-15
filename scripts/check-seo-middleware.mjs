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

assertRedirect('https://zushapp.com/?ref=producthunt', 'https://zushapp.com/?utm_source=producthunt');
assertRedirect(
  'https://zushapp.com/?checkout=pro&ref=producthunt',
  'https://zushapp.com/?checkout=pro&utm_source=producthunt',
);
assertRedirect(
  'https://zushapp.com/?utm_source=google&ref=producthunt',
  'https://zushapp.com/?utm_source=google',
);

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

console.log('[check-seo-middleware] OK: homepage ref canonicalization and PostHog country opt-out validated.');
