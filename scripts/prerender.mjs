import puppeteer from 'puppeteer-core';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const ROUTES = [
  '/',
  '/changelog',
  '/byok-setup',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
];

const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
];

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (existsSync(p)) return p;
  }
  return null;
}

function createStaticServer(dir) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.mp4': 'video/mp4',
    '.md': 'text/markdown',
    '.xml': 'application/xml',
    '.ico': 'image/x-icon',
    '.webmanifest': 'application/manifest+json',
  };

  const indexHtml = readFileSync(join(dir, 'index.html'));

  return createServer((req, res) => {
    const urlPath = req.url.split('?')[0];
    const filePath = join(dir, urlPath);
    const ext = urlPath.match(/\.[^.]+$/)?.[0] || '';

    if (ext && existsSync(filePath)) {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexHtml);
  });
}

async function prerenderRoute(browser, origin, route) {
  const url = `${origin}${route}`;
  console.log(`[prerender] Rendering ${route}`);

  const page = await browser.newPage();

  // Block video/media requests to speed up rendering
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const type = req.resourceType();
    if (type === 'media' || type === 'font') {
      req.abort();
    } else {
      req.continue();
    }
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('#root > *', { timeout: 10000 });

    // Give React a moment to finish rendering
    await new Promise((r) => setTimeout(r, 1000));

    const html = await page.content();

    const outputDir = join(DIST, route === '/' ? '' : route);
    mkdirSync(outputDir, { recursive: true });
    const outputFile = route === '/' ? join(DIST, 'index.html') : join(outputDir, 'index.html');
    writeFileSync(outputFile, html);
    console.log(`[prerender] Wrote ${outputFile}`);
  } catch (err) {
    console.warn(`[prerender] Warning: Failed to render ${route}: ${err.message}`);
  } finally {
    await page.close();
  }
}

async function prerender() {
  const chromePath = findChrome();
  if (!chromePath) {
    console.warn('[prerender] Chrome not found, skipping prerendering');
    return;
  }

  console.log('[prerender] Starting prerender...');

  const server = createStaticServer(DIST);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const origin = `http://localhost:${port}`;

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  for (const route of ROUTES) {
    await prerenderRoute(browser, origin, route);
  }

  await browser.close();
  server.close();
  console.log('[prerender] Done!');
}

prerender().catch((err) => {
  console.error('[prerender] Error:', err);
  process.exit(1);
});
