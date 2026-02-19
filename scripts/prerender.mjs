import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SITE_ORIGIN = 'https://zushapp.com';
const LOCAL_PORT = 4173;
const LOCAL_ORIGIN = `http://localhost:${LOCAL_PORT}`;

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
].filter(Boolean);

const DEFAULT_META = {
  title: 'Zush — AI-Powered Image Organization for macOS',
  description:
    'Zush monitors your folders and automatically renames images using advanced AI. Smart metadata, custom naming patterns, and native macOS performance.',
  robots: 'noindex, nofollow',
};

const ROUTE_META = {
  '/': {
    ...DEFAULT_META,
    robots: 'index, follow',
  },
  '/changelog': {
    title: 'Changelog — Zush',
    description:
      'Track all updates, new features, and improvements to Zush, the AI-powered image organizer for macOS.',
    robots: 'index, follow',
  },
  '/byok-setup': {
    title: 'BYOK Setup Guide — Zush',
    description:
      'Learn how to set up Bring Your Own Key (BYOK) in Zush with Gemini, Groq, OpenAI, or Claude for unlimited AI image processing.',
    robots: 'index, follow',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Zush',
    description:
      "Read Zush's privacy policy. Learn how we handle your data, images, and personal information.",
    robots: 'index, follow',
  },
  '/terms-of-service': {
    title: 'Terms of Service — Zush',
    description:
      "Read Zush's terms of service for using our AI-powered image organization app for macOS.",
    robots: 'index, follow',
  },
  '/refund-policy': {
    title: 'Refund Policy — Zush',
    description:
      "Zush's refund policy. Money-back guarantee details for our AI image organizer.",
    robots: 'index, follow',
  },
  '/thank-you': DEFAULT_META,
  '/recover': DEFAULT_META,
  '/activate': DEFAULT_META,
  '/manage-subscription': DEFAULT_META,
};

// --- HTML helpers ---

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtmlAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceOrInsertTag(html, matcher, replacement) {
  if (matcher.test(html)) {
    return html.replace(matcher, replacement);
  }
  return html.replace('</head>', `  ${replacement}\n</head>`);
}

function setMetaByName(html, name, content) {
  const escapedName = escapeRegExp(name);
  const tagMatcher = new RegExp(`<meta\\s+[^>]*name=["']${escapedName}["'][^>]*>`, 'i');
  const tag = `<meta name="${name}" content="${escapeHtmlAttr(content)}" />`;
  return replaceOrInsertTag(html, tagMatcher, tag);
}

function setMetaByProperty(html, property, content) {
  const escapedProperty = escapeRegExp(property);
  const tagMatcher = new RegExp(`<meta\\s+[^>]*property=["']${escapedProperty}["'][^>]*>`, 'i');
  const tag = `<meta property="${property}" content="${escapeHtmlAttr(content)}" />`;
  return replaceOrInsertTag(html, tagMatcher, tag);
}

function buildCanonicalUrl(route) {
  return `${SITE_ORIGIN}${route === '/' ? '/' : route}`;
}

function renderMetaForRoute(baseHtml, route) {
  const meta = ROUTE_META[route] || DEFAULT_META;
  const canonicalUrl = buildCanonicalUrl(route);
  let html = baseHtml;

  html = replaceOrInsertTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtmlText(meta.title)}</title>`,
  );
  html = setMetaByName(html, 'description', meta.description);
  html = setMetaByName(html, 'robots', meta.robots);
  html = setMetaByName(html, 'twitter:title', meta.title);
  html = setMetaByName(html, 'twitter:description', meta.description);
  html = setMetaByProperty(html, 'og:title', meta.title);
  html = setMetaByProperty(html, 'og:description', meta.description);
  html = setMetaByProperty(html, 'og:url', canonicalUrl);

  html = replaceOrInsertTag(
    html,
    /<link\s+[^>]*rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );

  return html;
}

function injectRenderedContent(html, renderedContent) {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedContent}</div>`,
  );
}

function writeRouteHtml(route, html) {
  if (route === '/') {
    writeFileSync(join(DIST, 'index.html'), html);
    return;
  }

  const routeName = route.slice(1);
  const outputDir = join(DIST, routeName);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'index.html'), html);
  writeFileSync(join(DIST, `${routeName}.html`), html);
}

// --- Static file server ---

function getMimeType(filePath) {
  const ext = filePath.split('.').pop()?.toLowerCase();
  const mimes = {
    html: 'text/html; charset=utf-8',
    js: 'application/javascript',
    css: 'text/css',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    mp4: 'video/mp4',
    woff2: 'font/woff2',
    woff: 'font/woff',
    ico: 'image/x-icon',
    webmanifest: 'application/manifest+json',
  };
  return mimes[ext] || 'application/octet-stream';
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let urlPath = (req.url || '/').split('?')[0];
      let filePath = join(DIST, urlPath);

      // If it's a directory, try index.html inside it
      try {
        if (statSync(filePath).isDirectory()) {
          filePath = join(filePath, 'index.html');
        }
      } catch {
        // not a directory or doesn't exist
      }

      // Try to serve the file
      try {
        const content = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
        res.end(content);
      } catch {
        // SPA fallback: serve root index.html for client-side routing
        try {
          const content = readFileSync(join(DIST, 'index.html'));
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        } catch {
          res.writeHead(404);
          res.end('Not found');
        }
      }
    });

    server.listen(LOCAL_PORT, () => {
      console.log(`[prerender] Static server on ${LOCAL_ORIGIN}`);
      resolve(server);
    });
  });
}

// --- Chrome detection ---

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (existsSync(p)) return p;
  }
  return null;
}

// --- Main ---

async function prerender() {
  const indexPath = join(DIST, 'index.html');
  const baseHtml = readFileSync(indexPath, 'utf8');
  const routes = Object.keys(ROUTE_META);

  const chromePath = findChrome();

  if (!chromePath) {
    console.warn('[prerender] Chrome not found — writing meta-only HTML (no rendered content).');
    console.warn('[prerender] Set CHROME_PATH or install Google Chrome for full prerendering.');
    for (const route of routes) {
      const html = renderMetaForRoute(baseHtml, route);
      writeRouteHtml(route, html);
      console.log(`[prerender] Wrote metadata for ${route}`);
    }
    return;
  }

  console.log(`[prerender] Using Chrome: ${chromePath}`);

  // Start static server to serve the built files
  const server = await startStaticServer();

  // Launch headless browser
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    for (const route of routes) {
      const url = `${LOCAL_ORIGIN}${route}`;
      console.log(`[prerender] Rendering ${route}...`);

      // Create a fresh page per route to avoid frame detachment issues
      const page = await browser.newPage();

      // Block heavy resources for faster rendering
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const type = req.resourceType();
        if (['font', 'media'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

        // Wait for React to mount content
        await page.waitForSelector('#root > *', { timeout: 10000 });

        // Small delay for lazy-loaded components and animations to settle
        await new Promise((r) => setTimeout(r, 500));

        // Extract rendered HTML
        const renderedContent = await page.evaluate(() => {
          const root = document.getElementById('root');
          return root ? root.innerHTML : '';
        });

        // Apply meta tags + inject rendered content
        let html = renderMetaForRoute(baseHtml, route);
        if (renderedContent) {
          html = injectRenderedContent(html, renderedContent);
          console.log(`[prerender] ✓ ${route} — rendered (${renderedContent.length} chars)`);
        } else {
          console.warn(`[prerender] ⚠ ${route} — no content rendered, writing meta-only`);
        }

        writeRouteHtml(route, html);
      } catch (routeErr) {
        console.warn(`[prerender] ⚠ ${route} — error: ${routeErr.message}, writing meta-only`);
        const html = renderMetaForRoute(baseHtml, route);
        writeRouteHtml(route, html);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

try {
  await prerender();
  console.log('[prerender] Done!');
} catch (err) {
  console.error('[prerender] Error:', err);
  process.exit(1);
}
