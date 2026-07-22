import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const constants = readFileSync(join(root, 'src/constants.ts'), 'utf8');
const macChangelog = readFileSync(join(root, 'src/content/changelog.md'), 'utf8');
const windowsChangelog = readFileSync(join(root, 'src/content/changelog.windows.md'), 'utf8');
const pricingRoute = readFileSync(join(root, 'src/pages/pricing.md.ts'), 'utf8');
const sitemapRoute = readFileSync(join(root, 'src/pages/sitemap.xml.ts'), 'utf8');

function readConstant(name) {
  const match = constants.match(new RegExp(`export const ${name} = ["']([^"']+)["']`));
  assert(match, `Missing ${name} in src/constants.ts`);
  return match[1];
}

function readLatestVersion(markdown, label) {
  const match = markdown.match(/^##\s*\[(\d+(?:\.\d+){2,})\]/m);
  assert(match, `Missing latest version heading in ${label} changelog`);
  return match[1];
}

assert.equal(
  readConstant('MAC_APP_VERSION'),
  readLatestVersion(macChangelog, 'Mac'),
  'MAC_APP_VERSION must match the latest Mac changelog release.',
);
assert.equal(
  readConstant('WINDOWS_APP_VERSION'),
  readLatestVersion(windowsChangelog, 'Windows'),
  'WINDOWS_APP_VERSION must match the latest Windows changelog release.',
);
assert.match(
  pricingRoute,
  /'X-Robots-Tag':\s*'noindex, follow'/,
  'pricing.md must explicitly opt out of search indexing.',
);
assert.doesNotMatch(
  sitemapRoute,
  /loc:\s*`\$\{SITE_ORIGIN\}\/pricing\.md`/,
  'pricing.md must not appear in the XML sitemap.',
);

console.log('[check-product-facts] OK: versions match both changelogs and pricing.md stays machine-readable only.');
