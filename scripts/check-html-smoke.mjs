import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIST_ROOT = join(ROOT, 'dist');
const DIST = existsSync(join(DIST_ROOT, 'client')) ? join(DIST_ROOT, 'client') : DIST_ROOT;
const SITE_ORIGIN = 'https://zushapp.com';
const PRIVATE_ROUTES = new Set([
  '/thank-you',
  '/recover',
  '/activate',
  '/manage-subscription',
  '/manage-subscription/confirm',
]);
const NON_WATCH_VIDEO_ROUTES = new Set([
  '/',
  '/ai-file-renamer',
  '/ai-image-renamer',
  '/auto-rename-files',
  '/batch-rename-files',
  '/rename-documents-with-ai',
  '/rename-pdf-with-ai',
  '/rename-photos-with-ai',
  '/rename-screenshots-with-ai',
]);
// Mirrors MAC_DEMO_VIDEO in src/data/showcaseMedia.ts, rendered by DemoVideo.
const HOMEPAGE_DEMO_VIDEO = {
  light: {
    source: '/videos/demo-light.mp4',
    poster: '/videos/posters/demo-light.webp',
  },
  dark: {
    source: '/videos/demo-dark.mp4',
    poster: '/videos/posters/demo-dark.webp',
  },
};
const ISO_8601_DATE_OR_DATETIME = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/;
const USE_CASES_BLOCK_ROUTES = [
  '/',
  '/batch-rename-files',
  '/mac',
  '/windows',
  '/rename-documents-with-ai',
  '/rename-pdf-with-ai',
  '/rename-photos-with-ai',
  '/rename-screenshots-with-ai',
];
const FULL_SOFTWARE_APPLICATION_ROUTES = new Set(['/', '/mac', '/windows']);
const ROOT_SOFTWARE_ID = `${SITE_ORIGIN}/#software`;
const ORGANIZATION_ALTERNATE_NAMES = [
  'Zush AI Renamer',
  'Zush AI File Renamer',
  'Zush File Renamer',
  'Zush Renamer',
  'Zush App',
];
const PLATFORM_SOFTWARE = {
  '/mac': {
    id: `${SITE_ORIGIN}/mac#software`,
    name: 'Zush for Mac',
    alternateName: [
      'Zush AI Renamer for Mac',
      'Zush AI File Renamer for Mac',
      'Zush File Renamer for Mac',
    ],
  },
  '/windows': {
    id: `${SITE_ORIGIN}/windows#software`,
    name: 'Zush for Windows',
    alternateName: [
      'Zush AI Renamer for Windows',
      'Zush AI File Renamer for Windows',
      'Zush File Renamer for Windows',
    ],
  },
};

function fail(message) {
  throw new Error(message);
}

function parseSitemapLocs(xml) {
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
  return locs;
}

function pathFromLoc(loc) {
  if (!loc.startsWith(SITE_ORIGIN)) {
    fail(`Unexpected sitemap loc outside origin: ${loc}`);
  }
  const pathname = loc.slice(SITE_ORIGIN.length) || '/';
  return pathname || '/';
}

function htmlFileForPath(pathname) {
  if (pathname === '/') return join(DIST, 'index.html');
  return join(DIST, pathname.slice(1), 'index.html');
}

function isBlogPostPath(pathname) {
  return pathname.startsWith('/blog/') &&
    pathname !== '/blog/archive' &&
    pathname !== '/blog/tags' &&
    !pathname.startsWith('/blog/archive/') &&
    !pathname.startsWith('/blog/tags/');
}

function isUseCasesLandingPath(pathname) {
  return USE_CASES_BLOCK_ROUTES.some((route) => pathname === route || pathname.endsWith(route));
}

function assertIncludes(html, needle, message) {
  if (!html.includes(needle)) fail(message);
}

function assertNotIncludes(html, needle, message) {
  if (html.includes(needle)) fail(message);
}

function assertPostHogInitializationOrder() {
  const componentPath = join(ROOT, 'src/components/PostHogAnalytics.astro');
  const source = readFileSync(componentPath, 'utf8');
  const initIndex = source.indexOf('window.posthog.init(');
  const captureIndex = source.indexOf('capturePageview();');

  if (initIndex === -1) fail('PostHog initialization is missing.');
  if (captureIndex === -1) fail('Initial PostHog pageview capture is missing.');
  if (captureIndex < initIndex) {
    fail('PostHog pageview capture must run after initialization.');
  }

  assertIncludes(
    source,
    "typeof window.posthog?.capture !== 'function'",
    'PostHog pageview capture must tolerate an unavailable SDK.',
  );
}

function getJsonLdBlocks(html) {
  const matches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  return matches.map((match) => match[1] ?? '');
}

function parseJsonLdBlock(block, pathname) {
  try {
    return JSON.parse(block);
  } catch (error) {
    fail(`Invalid JSON-LD for ${pathname}: ${error.message}`);
  }
}

function collectJsonLdObjects(item) {
  const entries = Array.isArray(item) ? item : [item];
  return entries.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') return [];
    const graphItems = Array.isArray(entry['@graph']) ? collectJsonLdObjects(entry['@graph']) : [];
    return [entry, ...graphItems];
  });
}

function collectDeepJsonLdObjects(item) {
  if (Array.isArray(item)) {
    return item.flatMap((entry) => collectDeepJsonLdObjects(entry));
  }
  if (!item || typeof item !== 'object') return [];
  return [item, ...Object.values(item).flatMap((entry) => collectDeepJsonLdObjects(entry))];
}

function parsedJsonLdItems(html, pathname, deep = false) {
  const collect = deep ? collectDeepJsonLdObjects : collectJsonLdObjects;
  return getJsonLdBlocks(html).flatMap((block) => collect(parseJsonLdBlock(block, pathname)));
}

function hasJsonLdType(item, type) {
  const itemType = item['@type'];
  return Array.isArray(itemType) ? itemType.includes(type) : itemType === type;
}

function assertVideoObjectUploadDate(jsonLdBlocks, pathname) {
  const jsonLdItems = jsonLdBlocks.flatMap((block) => collectJsonLdObjects(parseJsonLdBlock(block, pathname)));
  for (const item of jsonLdItems) {
    if (!hasJsonLdType(item, 'VideoObject')) continue;
    if (typeof item.uploadDate !== 'string' || !ISO_8601_DATE_OR_DATETIME.test(item.uploadDate.trim())) {
      fail(`VideoObject JSON-LD missing valid uploadDate for ${pathname}`);
    }
  }
}

function assertVideoBooleanAttribute(tag, attrName, pathname) {
  const attrPattern = new RegExp(`\\s${attrName}(?:=""|(?=\\s|>))`, 'i');
  if (!attrPattern.test(tag)) {
    fail(`Homepage hero video missing ${attrName} attribute on ${pathname}`);
  }
}

function assertHomepageHeroVideo(html, pathname) {
  const videoTags = html.match(/<video\b[^>]*>/g) ?? [];
  // One video receives only the active theme's source on the client. Keeping
  // both URLs in data attributes prevents the inactive recording from loading.
  if (videoTags.length !== 1) {
    fail(`Homepage should emit exactly one demo <video> tag on ${pathname}`);
  }

  const [videoTag] = videoTags;
  assertVideoBooleanAttribute(videoTag, 'autoplay', pathname);
  assertVideoBooleanAttribute(videoTag, 'muted', pathname);
  assertVideoBooleanAttribute(videoTag, 'playsinline', pathname);
  assertVideoBooleanAttribute(videoTag, 'loop', pathname);
  assertIncludes(
    videoTag,
    `preload="metadata"`,
    `Homepage demo video should preload metadata only on ${pathname}`,
  );
  assertNotIncludes(
    videoTag,
    ' src=',
    `Homepage demo video must not SSR a downloadable source on ${pathname}`,
  );

  for (const theme of ['light', 'dark']) {
    assertIncludes(
      videoTag,
      `data-${theme}-src="${HOMEPAGE_DEMO_VIDEO[theme].source}"`,
      `Homepage demo video should expose the ${theme} source for client selection on ${pathname}`,
    );
    assertIncludes(
      videoTag,
      `data-${theme}-poster="${HOMEPAGE_DEMO_VIDEO[theme].poster}"`,
      `Homepage demo video should expose the ${theme} poster for client selection on ${pathname}`,
    );
  }
}

assertPostHogInitializationOrder();

const sitemapPath = join(DIST, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  fail('sitemap.xml is missing from dist.');
}

const sitemapXml = readFileSync(sitemapPath, 'utf8');
const locs = parseSitemapLocs(sitemapXml);
if (locs.length === 0) {
  fail('sitemap.xml has no URLs.');
}
for (const consolidatedRoute of ['/file-renamer', '/ai-file-renamer', '/batch-rename-tool', '/bulk-rename-files']) {
  assertNotIncludes(
    sitemapXml,
    `${SITE_ORIGIN}${consolidatedRoute}`,
    `Consolidated duplicate route leaked into sitemap: ${consolidatedRoute}`,
  );
}
assertNotIncludes(
  sitemapXml,
  `${SITE_ORIGIN}/pricing.md`,
  'Machine-readable pricing.md must not be submitted for search indexing.',
);

for (const loc of locs) {
  const pathname = pathFromLoc(loc);
  if (PRIVATE_ROUTES.has(pathname)) {
    fail(`Private route leaked into sitemap: ${pathname}`);
  }

  if (pathname.endsWith('.md')) {
    const machineReadablePath = join(DIST, pathname.slice(1));
    if (!existsSync(machineReadablePath)) {
      fail(`Sitemap machine-readable route missing output file: ${pathname}`);
    }
    const content = readFileSync(machineReadablePath, 'utf8');
    assertIncludes(content, '# Zush', `Machine-readable product facts missing heading for ${pathname}`);
    continue;
  }

  const filePath = htmlFileForPath(pathname);
  if (!existsSync(filePath)) {
    fail(`Sitemap route missing HTML file: ${pathname} -> ${filePath}`);
  }

  const html = readFileSync(filePath, 'utf8');
  const jsonLdBlocks = getJsonLdBlocks(html);
  const topLevelJsonLdItems = jsonLdBlocks.flatMap((block) =>
    collectJsonLdObjects(parseJsonLdBlock(block, pathname))
  );
  const fullSoftwareApplications = topLevelJsonLdItems.filter((item) =>
    hasJsonLdType(item, 'SoftwareApplication')
  );
  const websites = topLevelJsonLdItems.filter((item) => hasJsonLdType(item, 'WebSite'));

  if (FULL_SOFTWARE_APPLICATION_ROUTES.has(pathname)) {
    if (fullSoftwareApplications.length !== 1) {
      fail(`${pathname} must emit exactly one full SoftwareApplication definition.`);
    }
  } else if (fullSoftwareApplications.length > 0) {
    fail(`Non-canonical SoftwareApplication definition emitted on ${pathname}`);
  }

  if (pathname === '/') {
    if (websites.length !== 1) fail('Homepage must emit exactly one WebSite definition.');
  } else if (websites.length > 0) {
    fail(`WebSite definition must only be emitted on the canonical homepage: ${pathname}`);
  }

  assertVideoObjectUploadDate(jsonLdBlocks, pathname);
  assertIncludes(html, '<h1', `Missing <h1> in raw HTML for ${pathname}`);

  if (html.includes('<div id="root"></div>')) {
    fail(`Empty shell detected for ${pathname}`);
  }

  if (isUseCasesLandingPath(pathname)) {
    assertNotIncludes(html, 'id="use-cases"', `Use cases block should not be present on ${pathname}`);
  }

  const canonicalTag = `<link rel="canonical" href="${loc}"`;
  assertIncludes(html, canonicalTag, `Canonical mismatch or missing for ${pathname}`);
  assertNotIncludes(
    html,
    '<meta name="robots" content="noindex',
    `Sitemap URL must not emit noindex robots meta: ${pathname}`,
  );

  if (pathname.endsWith('/rename-design-files-with-ai') && pathname !== '/rename-design-files-with-ai') {
    assertNotIncludes(
      html,
      '<title>Rename Design Files with AI · Zush</title>',
      `Localized design-file page fell back to English metadata: ${pathname}`,
    );
  }

  if (isBlogPostPath(pathname)) {
    assertIncludes(html, '"@type":"BlogPosting"', `BlogPosting JSON-LD missing for ${pathname}`);
    if (/<img\b[^>]*\bsrc="[^"]+\.mp4(?:\?[^\"]*)?"/i.test(html)) {
      fail(`MP4 source rendered as an image instead of a poster link on ${pathname}`);
    }
    // Organization is site-wide. WebSite and full product definitions belong only
    // to their canonical pages and must not leak into blog posts.
    const hasHomepageIds = jsonLdBlocks.some(
      (block) => block.includes('/#software') || block.includes('"https://zushapp.com/#webpage"'),
    );
    if (hasHomepageIds) {
      fail(`Homepage schema leaked into blog page ${pathname}`);
    }
  }

  if (NON_WATCH_VIDEO_ROUTES.has(pathname) || pathname.startsWith('/blog/')) {
    if (html.includes('<video')) {
      if (pathname === '/') {
        assertHomepageHeroVideo(html, pathname);
      } else {
        fail(`Inline <video> markup should not be present on non-watch page ${pathname}`);
      }
    }

    if (pathname !== '/' && html.includes('"@type":"VideoObject"')) {
      fail(`VideoObject JSON-LD should not be present on non-watch page ${pathname}`);
    }
  }
}

function assertEntityReference(pathname, expectedSoftwareId, expectedLanguage) {
  const html = readFileSync(htmlFileForPath(pathname), 'utf8');
  const items = parsedJsonLdItems(html, pathname);
  const pageId = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}#webpage`;
  const webPage = items.find((item) => hasJsonLdType(item, 'WebPage') && item['@id'] === pageId);
  if (!webPage) fail(`Canonical WebPage JSON-LD missing for ${pathname}`);
  if (webPage.mainEntity?.['@id'] !== expectedSoftwareId) {
    fail(`WebPage.mainEntity points at the wrong software entity on ${pathname}`);
  }
  if (webPage.about?.['@id'] !== expectedSoftwareId) {
    fail(`WebPage.about points at the wrong software entity on ${pathname}`);
  }
  if (expectedLanguage && webPage.inLanguage !== expectedLanguage) {
    fail(`WebPage.inLanguage mismatch on ${pathname}`);
  }
}

for (const pathname of ['/batch-rename-files', '/for-accountants']) {
  assertEntityReference(pathname, ROOT_SOFTWARE_ID, 'en');
}
assertEntityReference('/de', ROOT_SOFTWARE_ID, 'de');
assertEntityReference('/de/rename-pdf-with-ai', ROOT_SOFTWARE_ID, 'de');
assertEntityReference('/de/mac', PLATFORM_SOFTWARE['/mac'].id, 'de');
assertEntityReference('/de/windows', PLATFORM_SOFTWARE['/windows'].id, 'de');

for (const pathname of ['/de', '/de/mac', '/de/windows', '/de/rename-pdf-with-ai', '/about']) {
  const html = readFileSync(htmlFileForPath(pathname), 'utf8');
  assertNotIncludes(html, '<meta name="keywords"', `Generic meta keywords leaked onto ${pathname}`);
}

for (const [pathname, expected] of Object.entries(PLATFORM_SOFTWARE)) {
  const html = readFileSync(htmlFileForPath(pathname), 'utf8');
  const app = parsedJsonLdItems(html, pathname).find((item) =>
    hasJsonLdType(item, 'SoftwareApplication') && item['@id'] === expected.id
  );
  if (!app) fail(`Canonical platform SoftwareApplication missing on ${pathname}`);
  if (app.name !== expected.name) fail(`Platform SoftwareApplication.name mismatch on ${pathname}`);
  if (JSON.stringify(app.alternateName) !== JSON.stringify(expected.alternateName)) {
    fail(`Platform SoftwareApplication.alternateName mismatch on ${pathname}`);
  }
  if (app.applicationSubCategory !== 'File Renaming and Organization') {
    fail(`Platform applicationSubCategory mismatch on ${pathname}`);
  }
  if (app.applicationSuite !== 'Zush') {
    fail(`applicationSuite must remain Zush on ${pathname}`);
  }
}

for (const [pathname, expectedSoftwareId] of [
  ['/blog/best-ai-file-renamer-tools-mac-compared', PLATFORM_SOFTWARE['/mac'].id],
  ['/blog/best-ai-file-renamer-tools-windows-compared', PLATFORM_SOFTWARE['/windows'].id],
]) {
  const html = readFileSync(htmlFileForPath(pathname), 'utf8');
  const deepItems = parsedJsonLdItems(html, pathname, true);
  const productReference = deepItems.find((item) => item['@id'] === expectedSoftwareId);
  if (!productReference) fail(`Comparison ItemList is missing its canonical app reference on ${pathname}`);
  if (productReference['@type'] === 'SoftwareApplication') {
    fail(`Comparison ItemList must reference, not redefine, SoftwareApplication on ${pathname}`);
  }
}

{
  const pathname = '/pricing';
  const html = readFileSync(htmlFileForPath(pathname), 'utf8');
  const items = parsedJsonLdItems(html, pathname);
  const catalog = items.find((item) => hasJsonLdType(item, 'OfferCatalog'));
  if (!catalog || !Array.isArray(catalog.itemListElement) || catalog.itemListElement.length !== 3) {
    fail('Pricing page must expose its three plans through OfferCatalog.');
  }
}

for (const route of PRIVATE_ROUTES) {
  const filePath = htmlFileForPath(route);
  if (!existsSync(filePath)) {
    fail(`Private route HTML missing: ${route}`);
  }
  const html = readFileSync(filePath, 'utf8');
  assertIncludes(
    html,
    '<meta name="robots" content="noindex, nofollow"',
    `Private route missing noindex, nofollow: ${route}`,
  );
}

const photoOrganizationGuidePath = '/blog/best-ways-to-organize-photos-on-mac';
const photoOrganizationGuideHtml = readFileSync(
  htmlFileForPath(photoOrganizationGuidePath),
  'utf8',
);
assertIncludes(
  photoOrganizationGuideHtml,
  '"@type":"HowTo"',
  `HowTo JSON-LD missing for ${photoOrganizationGuidePath}`,
);
assertIncludes(
  photoOrganizationGuideHtml,
  '"name":"How to Organize Photos on Mac in 7 Steps"',
  `Photo organization HowTo name missing for ${photoOrganizationGuidePath}`,
);
for (const productPath of ['/rename-photos-with-ai', '/mac', '/for-photographers', '/ai-file-organizer']) {
  assertIncludes(
    photoOrganizationGuideHtml,
    `href="${productPath}"`,
    `Product path ${productPath} missing from ${photoOrganizationGuidePath}`,
  );
}

const namingGuidePath = '/blog/file-naming-conventions-best-practices';
const namingGuideHtml = readFileSync(htmlFileForPath(namingGuidePath), 'utf8');
for (const productPath of ['/batch-rename-files', '/ai-file-organizer', '/mac', '/windows']) {
  assertIncludes(
    namingGuideHtml,
    `href="${productPath}"`,
    `Product path ${productPath} missing from ${namingGuidePath}`,
  );
}

const homepageHtml = readFileSync(join(DIST, 'index.html'), 'utf8');
const homepageJsonLdBlocks = getJsonLdBlocks(homepageHtml).map((block) => JSON.parse(block));
const homepageFaq = homepageJsonLdBlocks.find((item) => item['@type'] === 'FAQPage');
const homepageJsonLdItems = parsedJsonLdItems(homepageHtml, '/');
const homepageSoftware = homepageJsonLdItems.find((item) =>
  hasJsonLdType(item, 'SoftwareApplication') && item['@id'] === ROOT_SOFTWARE_ID
);
const homepageOrganization = homepageJsonLdItems.find((item) =>
  hasJsonLdType(item, 'Organization') && item['@id'] === `${SITE_ORIGIN}/#organization`
);
assertIncludes(homepageHtml, '"@type":"SoftwareApplication"', 'Homepage SoftwareApplication JSON-LD missing.');
assertNotIncludes(homepageHtml, '"@type":"HowTo"', 'Homepage should not emit HowTo JSON-LD.');
if (!homepageFaq) {
  fail('Homepage FAQPage JSON-LD missing.');
}
if (!Array.isArray(homepageFaq.mainEntity) || homepageFaq.mainEntity.length === 0) {
  fail('Homepage FAQPage JSON-LD should include questions.');
}
if (homepageSoftware?.name !== 'Zush') fail('Homepage SoftwareApplication.name must remain Zush.');
if (JSON.stringify(homepageSoftware?.alternateName) !== JSON.stringify(ORGANIZATION_ALTERNATE_NAMES)) {
  fail('Homepage SoftwareApplication branded alternateName set changed unexpectedly.');
}
if (JSON.stringify(homepageOrganization?.alternateName) !== JSON.stringify(ORGANIZATION_ALTERNATE_NAMES)) {
  fail('Organization.alternateName changed unexpectedly.');
}
assertNotIncludes(homepageHtml, '"speakable"', 'Homepage should not emit speakable JSON-LD.');

console.log(`[check-html-smoke] OK: ${locs.length} sitemap URLs validated.`);
