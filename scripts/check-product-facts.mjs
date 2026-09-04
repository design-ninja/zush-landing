import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const constants = readFileSync(join(root, 'src/constants.ts'), 'utf8');
const macChangelog = readFileSync(join(root, 'src/content/changelog.md'), 'utf8');
const windowsChangelog = readFileSync(join(root, 'src/content/changelog.windows.md'), 'utf8');
const pricingRoute = readFileSync(join(root, 'src/pages/pricing.md.ts'), 'utf8');
const llmsRoute = readFileSync(join(root, 'src/pages/llms.txt.ts'), 'utf8');
const aiModesDoc = readFileSync(join(root, 'src/content/docs/docs/ai-modes.mdx'), 'utf8');
const localAiDoc = readFileSync(join(root, 'src/content/docs/docs/local-ai.mdx'), 'utf8');
const sitemapRoute = readFileSync(join(root, 'src/pages/sitemap.xml.ts'), 'utf8');
const entitySource = readFileSync(join(root, 'src/seo/entity.ts'), 'utf8');
const seoConfigSource = readFileSync(join(root, 'src/seo/config.ts'), 'utf8');
const jsonLdSource = readFileSync(join(root, 'src/utils/jsonLd.ts'), 'utf8');
const baseLayoutSource = readFileSync(join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
const localizedHomeSource = readFileSync(join(root, 'src/pages/[locale]/index.astro'), 'utf8');
const blogPostSource = readFileSync(join(root, 'src/pages/blog/[slug].astro'), 'utf8');
const platformLandingSource = readFileSync(
  join(root, 'src/components/PlatformLandingPage/PlatformLandingPage.astro'),
  'utf8',
);

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
for (const [label, source] of [
  ['constants', constants],
  ['pricing.md', pricingRoute],
  ['llms.txt', llmsRoute],
  ['AI modes docs', aiModesDoc],
  ['Local AI docs', localAiDoc],
]) {
  assert.doesNotMatch(
    source,
    /Built-in Local AI|five AI modes|five processing routes/i,
    `${label} must not present the retired bundled Local AI route as an active mode.`,
  );
}
assert.match(
  constants,
  /Zush Cloud AI, BYOK, LM Studio, and Ollama/,
  'The canonical AI mode summary must list the four current routes.',
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

assert.doesNotMatch(
  entitySource,
  /^\s*'Zush AI',\s*$/m,
  'Zush AI must not be a site-name alias; Google can select it instead of Zush.',
);
assert.match(
  entitySource,
  /export const ZUSH_SITE_ALTERNATE_NAMES = \[\s*'Zush AI Renamer',\s*'Zush AI File Renamer',\s*'Zush File Renamer',\s*'Zush Renamer',\s*'zushapp\.com',\s*\] as const;/,
  'WebSite site-name variants must contain the recognized branded names and end with zushapp.com.',
);
const websiteSchema = entitySource.match(/const WEBSITE_JSON_LD = \{([\s\S]*?)\n\};/)?.[1] ?? '';
assert.match(websiteSchema, /url:\s*`\$\{SITE_ORIGIN\}\/`/, 'WebSite.url must use the canonical homepage URL.');
assert.match(
  websiteSchema,
  /alternateName:\s*\[\.\.\.ZUSH_SITE_ALTERNATE_NAMES\]/,
  'WebSite must expose the dedicated site-name fallbacks.',
);

const homeAlternateNames = seoConfigSource.match(/alternateName:\s*\[([\s\S]*?)\],\n\s*url: SITE_ORIGIN/);
assert(homeAlternateNames, 'Homepage SoftwareApplication alternateName block is missing.');
for (const genericName of [
  'AI File Renamer',
  'AI File Renamer & Organizer',
  'AI File Organizer',
  'AI Batch File Renamer',
  'Content-Aware File Renamer',
  'Zush for Mac',
  'Zush for Windows',
]) {
  assert.doesNotMatch(
    homeAlternateNames[1],
    new RegExp(`['"]${genericName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`),
    `Generic category leaked into homepage alternateName: ${genericName}`,
  );
}

for (const platformBrandVariant of [
  'Zush for Mac',
  'Zush Mac',
  'Zush AI Renamer for Mac',
  'Zush AI File Renamer for Mac',
  'Zush File Renamer for Mac',
  'Zush for Windows',
  'Zush Windows',
  'Zush AI Renamer for Windows',
  'Zush AI File Renamer for Windows',
  'Zush File Renamer for Windows',
]) {
  assert.doesNotMatch(
    platformLandingSource,
    new RegExp(`['"]${platformBrandVariant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`),
    `Platform-specific branded variant leaked into keyword or alternateName targeting: ${platformBrandVariant}`,
  );
}
assert.match(
  platformLandingSource,
  /applicationSuite:\s*'Zush'/,
  'Platform variants must retain applicationSuite: Zush.',
);
assert.doesNotMatch(
  jsonLdSource,
  /'@id':\s*`\$\{pageUrl\}#software`/,
  'Feature and profession pages must not mint page-specific SoftwareApplication entities.',
);
assert.match(
  jsonLdSource,
  /mainEntity:\s*SOFTWARE_REF[\s\S]*about:\s*SOFTWARE_REF/,
  'Feature and profession WebPage nodes must reference the canonical Zush software entity.',
);
assert.match(
  baseLayoutSource,
  /buildSiteEntityJsonLd\(seo\.canonicalPath === '\/'\)/,
  'WebSite schema must be emitted only for the canonical domain homepage.',
);
assert.doesNotMatch(
  baseLayoutSource,
  /DEFAULT_KEYWORDS/,
  'BaseLayout must not emit a site-wide meta-keywords fallback.',
);
assert.doesNotMatch(
  localizedHomeSource,
  /HOME_JSON_LD/,
  'Localized homepages must build their own WebPage instead of cloning the English homepage graph.',
);
assert.doesNotMatch(
  blogPostSource,
  /'@type':\s*'SoftwareApplication'/,
  'Comparison articles must reference canonical software entities without redefining them.',
);

const organizationSameAs = entitySource.match(/const ORGANIZATION_SAME_AS = \[([\s\S]*?)\];/);
assert(organizationSameAs, 'Organization sameAs block is missing.');
for (const productProfile of [
  'PRODUCT_HUNT_URL',
  'GITHUB_RELEASES_URL',
  'HOMEBREW_CASK_URL',
  'APP_STORE_URL',
  'WINDOWS_STORE_URL',
  'GOOGLE_WORKSPACE_MARKETPLACE_URL',
]) {
  assert.doesNotMatch(
    organizationSameAs[1],
    new RegExp(`\\b${productProfile}\\b`),
    `Product profile leaked into Organization.sameAs: ${productProfile}`,
  );
}

for (const brandedKeyword of [
  'Zush AI Renamer',
  'Zush AI File Renamer',
]) {
  assert.match(
    seoConfigSource,
    new RegExp(`['"]${brandedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`),
    `Missing branded keyword: ${brandedKeyword}`,
  );
}

for (const route of [
  '/batch-rename-files',
  '/offline-ai-file-renamer',
  '/ai-file-organizer',
  '/rename-pdf-with-ai',
  '/rename-documents-with-ai',
  '/rename-design-files-with-ai',
  '/rename-screenshots-with-ai',
  '/rename-photos-with-ai',
  '/rename-videos-with-ai',
  '/rename-audio-with-ai',
]) {
  const escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const routeBlock = seoConfigSource.match(
    new RegExp(`['"]${escapedRoute}['"]:\\s*\\{([\\s\\S]*?)\\n\\s*\\},`),
  );
  assert(routeBlock, `Missing SEO configuration for search landing: ${route}`);
  assert.match(routeBlock[1], /keywords:/, `Search landing must define route-specific keywords: ${route}`);
}

console.log('[check-product-facts] OK: versions, pricing, branded aliases, and keyword clusters are consistent.');
