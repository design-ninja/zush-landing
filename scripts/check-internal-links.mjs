import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const SITE_ORIGIN = 'https://zushapp.com';

function collectHtmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      collectHtmlFiles(fullPath, acc);
      continue;
    }
    if (entry.endsWith('.html')) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function normalizeHref(href) {
  if (!href) return null;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  if (/^https?:\/\//i.test(href)) {
    if (!href.startsWith(SITE_ORIGIN)) return null;
    href = href.slice(SITE_ORIGIN.length);
  }
  if (!href.startsWith('/')) return null;

  const [pathOnly] = href.split(/[?#]/);
  if (!pathOnly) return null;
  const extensionMatch = pathOnly.match(/\.([a-z0-9]+)$/i);
  if (extensionMatch) {
    const extension = extensionMatch[1].toLowerCase();
    if (extension !== 'html') return null;
  }
  if (pathOnly === '/') return '/';
  const normalizedPath = pathOnly.endsWith('/') ? pathOnly.slice(0, -1) : pathOnly;
  return normalizedPath.endsWith('.html')
    ? normalizedPath.slice(0, -'.html'.length) || '/'
    : normalizedPath;
}

function htmlPathForRoute(route) {
  if (route === '/') return join(DIST, 'index.html');
  return join(DIST, route.slice(1), 'index.html');
}

const htmlFiles = collectHtmlFiles(DIST);
const broken = [];

for (const filePath of htmlFiles) {
  const html = readFileSync(filePath, 'utf8');
  const hrefs = [...html.matchAll(/<a[^>]+href="([^"]+)"/g)].map((m) => m[1]);

  for (const rawHref of hrefs) {
    const route = normalizeHref(rawHref);
    if (!route) continue;

    const targetFile = htmlPathForRoute(route);
    if (!existsSync(targetFile)) {
      broken.push({
        from: relative(DIST, filePath),
        href: rawHref,
        target: relative(DIST, targetFile),
      });
    }
  }
}

if (broken.length > 0) {
  for (const item of broken.slice(0, 100)) {
    console.error(`[broken-link] ${item.from} -> ${item.href} (missing ${item.target})`);
  }
  throw new Error(`Found ${broken.length} broken internal links in dist HTML.`);
}

console.log(`[check-internal-links] OK: scanned ${htmlFiles.length} HTML files.`);
