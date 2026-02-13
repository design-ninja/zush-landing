import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SITE_ORIGIN = 'https://zushapp.com';

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

function renderHtmlForRoute(baseHtml, route) {
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

function prerender() {
  const indexPath = join(DIST, 'index.html');
  const baseHtml = readFileSync(indexPath, 'utf8');
  const routes = Object.keys(ROUTE_META);

  for (const route of routes) {
    const html = renderHtmlForRoute(baseHtml, route);
    writeRouteHtml(route, html);
    console.log(`[prerender] Wrote metadata for ${route}`);
  }
}

try {
  prerender();
  console.log('[prerender] Done!');
} catch (err) {
  console.error('[prerender] Error:', err);
  process.exit(1);
}
