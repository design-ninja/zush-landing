import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
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
  '/rename-documents-with-ai',
  '/rename-pdf-with-ai',
  '/rename-photos-with-ai',
  '/rename-screenshots-with-ai',
]);
const USE_CASES_BLOCK_ROUTES = [
  '/',
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

const sitemapPath = join(DIST, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  fail('sitemap.xml is missing from dist.');
}

const sitemapXml = readFileSync(sitemapPath, 'utf8');
const locs = parseSitemapLocs(sitemapXml);
if (locs.length === 0) {
  fail('sitemap.xml has no URLs.');
}

for (const loc of locs) {
  const pathname = pathFromLoc(loc);
  if (PRIVATE_ROUTES.has(pathname)) {
    fail(`Private route leaked into sitemap: ${pathname}`);
  }

  const filePath = htmlFileForPath(pathname);
  if (!existsSync(filePath)) {
    fail(`Sitemap route missing HTML file: ${pathname} -> ${filePath}`);
  }

  const html = readFileSync(filePath, 'utf8');
  const jsonLdBlocks = getJsonLdBlocks(html);
  assertIncludes(html, '<h1', `Missing <h1> in raw HTML for ${pathname}`);

  if (html.includes('<div id="root"></div>')) {
    fail(`Empty shell detected for ${pathname}`);
  }

  if (isUseCasesLandingPath(pathname)) {
    assertNotIncludes(html, 'id="use-cases"', `Use cases block should not be present on ${pathname}`);
  }

  const canonicalTag = `<link rel="canonical" href="${loc}"`;
  assertIncludes(html, canonicalTag, `Canonical mismatch or missing for ${pathname}`);

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
      fail(`Inline <video> markup should not be present on non-watch page ${pathname}`);
    }

    if (html.includes('"@type":"VideoObject"')) {
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
