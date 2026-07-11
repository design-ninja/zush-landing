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
const HOMEPAGE_HERO_VIDEO = {
  lightSource: '/videos/hero/zush-batch-rename-mac-window-light.mp4',
  darkSource: '/videos/hero/zush-batch-rename-mac-window-dark.mp4',
  lightPoster: '/videos/posters/hero-batch-rename-mac-window-light.webp',
  darkPoster: '/videos/posters/hero-batch-rename-mac-window-dark.webp',
  width: '1280',
  height: '1050',
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
  if (videoTags.length !== 1) {
    fail(`Homepage should emit exactly one hero <video> tag on ${pathname}`);
  }

  const videoTag = videoTags[0];
  assertVideoBooleanAttribute(videoTag, 'autoplay', pathname);
  assertVideoBooleanAttribute(videoTag, 'muted', pathname);
  assertVideoBooleanAttribute(videoTag, 'playsinline', pathname);
  assertVideoBooleanAttribute(videoTag, 'loop', pathname);
  assertIncludes(
    videoTag,
    `preload="metadata"`,
    `Homepage hero video should preload metadata only on ${pathname}`,
  );
  assertIncludes(
    videoTag,
    `src="${HOMEPAGE_HERO_VIDEO.lightSource}"`,
    `Homepage hero video should SSR the light source on ${pathname}`,
  );
  assertIncludes(
    videoTag,
    `poster="${HOMEPAGE_HERO_VIDEO.lightPoster}"`,
    `Homepage hero video should SSR the light poster on ${pathname}`,
  );
  assertIncludes(
    videoTag,
    `width="${HOMEPAGE_HERO_VIDEO.width}"`,
    `Homepage hero video should include fixed width on ${pathname}`,
  );
  assertIncludes(
    videoTag,
    `height="${HOMEPAGE_HERO_VIDEO.height}"`,
    `Homepage hero video should include fixed height on ${pathname}`,
  );
  assertIncludes(
    html,
    HOMEPAGE_HERO_VIDEO.darkSource,
    `Homepage hero video should include dark theme source in island props on ${pathname}`,
  );
  assertIncludes(
    html,
    HOMEPAGE_HERO_VIDEO.darkPoster,
    `Homepage hero video should include dark theme poster in island props on ${pathname}`,
  );
}

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

  if (isBlogPostPath(pathname)) {
    assertIncludes(html, '"@type":"BlogPosting"', `BlogPosting JSON-LD missing for ${pathname}`);
    const hasHomepageIds = jsonLdBlocks.some(
      (block) =>
        block.includes('/#organization') ||
        block.includes('/#website') ||
        block.includes('/#software'),
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

const homepageHtml = readFileSync(join(DIST, 'index.html'), 'utf8');
const homepageJsonLdBlocks = getJsonLdBlocks(homepageHtml).map((block) => JSON.parse(block));
const homepageFaq = homepageJsonLdBlocks.find((item) => item['@type'] === 'FAQPage');
assertIncludes(homepageHtml, '"@type":"SoftwareApplication"', 'Homepage SoftwareApplication JSON-LD missing.');
assertNotIncludes(homepageHtml, '"@type":"HowTo"', 'Homepage should not emit HowTo JSON-LD.');
if (!homepageFaq) {
  fail('Homepage FAQPage JSON-LD missing.');
}
if (!Array.isArray(homepageFaq.mainEntity) || homepageFaq.mainEntity.length === 0) {
  fail('Homepage FAQPage JSON-LD should include questions.');
}
assertNotIncludes(homepageHtml, '"speakable"', 'Homepage should not emit speakable JSON-LD.');

console.log(`[check-html-smoke] OK: ${locs.length} sitemap URLs validated.`);
