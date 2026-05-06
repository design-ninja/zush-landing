import middleware from '../middleware.js';

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

assertRedirect('https://zushapp.com/?ref=producthunt', 'https://zushapp.com/');
assertRedirect('https://zushapp.com/?checkout=pro&ref=producthunt', 'https://zushapp.com/?checkout=pro');

const cleanHomepage = middleware(new Request('https://zushapp.com/'));
assert(cleanHomepage === undefined, 'Clean homepage should continue without middleware redirect.');

const nonHomepageRef = middleware(new Request('https://zushapp.com/blog?ref=producthunt'));
assert(nonHomepageRef === undefined, 'Non-homepage ref URLs should continue without middleware redirect.');

console.log('[check-seo-middleware] OK: homepage ref canonicalization validated.');
