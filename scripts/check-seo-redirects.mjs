import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const vercelConfig = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const redirects = vercelConfig.redirects ?? [];
const rewrites = vercelConfig.rewrites ?? [];
const headers = vercelConfig.headers ?? [];
const POSTHOG_PROXY_PATH = '/e';

function assertRedirect(source, destination) {
  const redirect = redirects.find((item) => item.source === source);

  assert(redirect, `Missing redirect for ${source}`);
  assert.equal(redirect.destination, destination, `Unexpected destination for ${source}`);
  assert.equal(redirect.permanent, true, `Expected permanent redirect for ${source}`);
}

function assertHostRedirect(source, host, destination) {
  const redirect = redirects.find((item) =>
    item.source === source
    && item.destination === destination
    && item.has?.some((condition) => condition.type === 'host' && condition.value === host),
  );

  assert(redirect, `Missing host redirect for ${host}${source}`);
  assert.equal(redirect.permanent, true, `Expected permanent redirect for ${host}${source}`);
}

function assertRewrite(source, destination) {
  const rewrite = rewrites.find((item) => item.source === source);

  assert(rewrite, `Missing rewrite for ${source}`);
  assert.equal(rewrite.destination, destination, `Unexpected destination for ${source}`);
}

function assertHeader(source, key, value) {
  const header = headers.find((item) =>
    item.source === source
    && item.headers?.some((entry) => entry.key === key && entry.value === value),
  );

  assert(header, `Missing ${key} header for ${source}`);
}

const trailingSlashRedirectIndex = redirects.findIndex((item) => item.source === '/:path((?!e/).+)/');
assert(trailingSlashRedirectIndex >= 0, 'Missing trailing-slash redirect that excludes the PostHog proxy path.');
assert.equal(
  redirects[trailingSlashRedirectIndex].destination,
  '/:path*',
  'Unexpected trailing-slash redirect destination.',
);

for (const source of ['/rename-images-with-ai/', '/rename-files-with-ai/']) {
  const sourceIndex = redirects.findIndex((item) => item.source === source);

  assert(sourceIndex >= 0, `Missing trailing-slash legacy redirect for ${source}`);
  assert(
    trailingSlashRedirectIndex === -1 || sourceIndex < trailingSlashRedirectIndex,
    `${source} must run before the generic trailing-slash normalizer`,
  );
}

for (const source of [`${POSTHOG_PROXY_PATH}/`, POSTHOG_PROXY_PATH]) {
  const sourceIndex = redirects.findIndex((item) => item.source === source);

  assert(sourceIndex >= 0, `Missing proxy base redirect for ${source}`);
  assert(sourceIndex < trailingSlashRedirectIndex, `${source} must run before the generic trailing-slash normalizer.`);
}

assertRedirect('/rename-images-with-ai/', '/rename-photos-with-ai');
assertRedirect('/rename-images-with-ai', '/rename-photos-with-ai');
assertRedirect('/:locale(de|fr|es|pt-br|nl|it|ja|ko|zh-cn|hi|ar)/rename-images-with-ai', '/:locale/rename-photos-with-ai');
assertRedirect('/ai-photo-renamer', '/rename-photos-with-ai');
assertRedirect('/ai-document-renamer', '/rename-documents-with-ai');

assertRedirect('/rename-files-with-ai/', '/batch-rename-files');
assertRedirect('/rename-files-with-ai', '/batch-rename-files');
assertRedirect('/:locale(de|fr|es|pt-br|nl|it|ja|ko|zh-cn|hi|ar)/rename-files-with-ai', '/:locale');

assertRedirect('/ai-file-renamer', '/file-renamer');
assertHostRedirect('/:path*', 'e.zushapp.com', 'https://zushapp.com');
assertRedirect(`${POSTHOG_PROXY_PATH}/`, '/');
assertRedirect(POSTHOG_PROXY_PATH, '/');

assertRewrite(`${POSTHOG_PROXY_PATH}/static/:path(.*)`, 'https://us-assets.i.posthog.com/static/:path');
assertRewrite(`${POSTHOG_PROXY_PATH}/array/:path(.*)`, 'https://us-assets.i.posthog.com/array/:path');
assertRewrite(`${POSTHOG_PROXY_PATH}/:path(.*)`, 'https://us.i.posthog.com/:path');
assertHeader(`${POSTHOG_PROXY_PATH}/:path(.*)`, 'X-Robots-Tag', 'noindex, nofollow');

console.log('[check-seo-redirects] OK: GSC legacy URL redirects validated.');
