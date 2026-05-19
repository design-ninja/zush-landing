import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const vercelConfig = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const redirects = vercelConfig.redirects ?? [];

function assertRedirect(source, destination) {
  const redirect = redirects.find((item) => item.source === source);

  assert(redirect, `Missing redirect for ${source}`);
  assert.equal(redirect.destination, destination, `Unexpected destination for ${source}`);
  assert.equal(redirect.permanent, true, `Expected permanent redirect for ${source}`);
}

const trailingSlashRedirectIndex = redirects.findIndex((item) => item.source === '/:path+/');

for (const source of ['/rename-images-with-ai/', '/rename-files-with-ai/']) {
  const sourceIndex = redirects.findIndex((item) => item.source === source);

  assert(sourceIndex >= 0, `Missing trailing-slash legacy redirect for ${source}`);
  assert(
    trailingSlashRedirectIndex === -1 || sourceIndex < trailingSlashRedirectIndex,
    `${source} must run before the generic trailing-slash normalizer`,
  );
}

assertRedirect('/rename-images-with-ai/', '/rename-photos-with-ai');
assertRedirect('/rename-images-with-ai', '/rename-photos-with-ai');
assertRedirect('/:locale(de|fr|es|pt-br|nl|it|ja|ko|zh-cn|hi|ar)/rename-images-with-ai', '/:locale/rename-photos-with-ai');
assertRedirect('/ai-photo-renamer', '/rename-photos-with-ai');
assertRedirect('/ai-document-renamer', '/rename-documents-with-ai');

assertRedirect('/rename-files-with-ai/', '/');
assertRedirect('/rename-files-with-ai', '/');
assertRedirect('/:locale(de|fr|es|pt-br|nl|it|ja|ko|zh-cn|hi|ar)/rename-files-with-ai', '/:locale');

console.log('[check-seo-redirects] OK: GSC legacy URL redirects validated.');
