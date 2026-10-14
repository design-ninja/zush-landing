#!/usr/bin/env node
// Renders Open Graph cards (1200×630).
//
//   pnpm og:images              # the site card and every blog post
//   pnpm og:images site         # only public/og-image.png
//   pnpm og:images <slug> ...   # only these posts (any locale)
//
// Site card: the homepage hero — the same point-wave (src/scripts/hero-wave.ts,
// drawn as one still frame), theme tokens from src/styles/_variables.scss and
// the English hero title from src/i18n/copy.ts.
// Post cards: the post's cover motif beside its title in the post's language,
// written to src/assets/blog-og/<slug>.jpg (src/data/blogOgImages.ts reads them).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { join } from 'node:path';
import sharp from 'sharp';
import { COVERS } from '../blog-covers/covers.mjs';
import { ART_CSS, PALETTE, backdropCss, dotsCss, motifs } from '../blog-covers/motifs.mjs';
import { openRenderer } from '../blog-covers/render.mjs';

const ROOT = new URL('../../', import.meta.url).pathname;
const read = (path) => readFileSync(join(ROOT, path));
const BLOG_DIR = join(ROOT, 'src/content/blog');
const POST_OUT_DIR = join(ROOT, 'src/assets/blog-og');
const SITE_OUT = join(ROOT, 'public/og-image.png');
const WIDTH = 1200;
const HEIGHT = 630;

// ---------------------------------------------------------------- shared bits

const dataUrl = (path, type) => `data:${type};base64,${read(path).toString('base64')}`;

const FONTS = `
@font-face { font-family: 'Manrope'; font-weight: 200 800; src: url(${dataUrl('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', 'font/woff2')}) format('woff2'); }
@font-face { font-family: 'Inter'; font-weight: 100 900; src: url(${dataUrl('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'font/woff2')}) format('woff2'); }`;

// System fallbacks cover the scripts Manrope and Inter lack (CJK, Arabic).
const SCRIPT_FALLBACKS = `'Hiragino Sans', 'PingFang SC', 'Apple SD Gothic Neo', 'Geeza Pro', system-ui, sans-serif`;
const LOGO = dataUrl('public/logo.png', 'image/png');
// Same corner ratio as the header logo (src/components/Logo: 0.5rem on 2.25rem).
const LOGO_CSS = 'img.logo { border-radius: 22.2%; }';

/** `$name: value;` pairs from the SCSS token file. */
const TOKENS = Object.fromEntries(
  [...read('src/styles/_variables.scss').toString().matchAll(/^\$([\w-]+):\s*([^;]+);/gm)].map(([, name, value]) => [name, value.trim()]),
);

function frame(body, { css = '', dir = 'ltr', lang = 'en', theme = 'dark' } = {}) {
  return `<!doctype html><html lang="${lang}" dir="${dir}" data-theme="${theme}"><head><meta charset="utf-8"><style>
${FONTS}
* { box-sizing: border-box; margin: 0; }
html, body { width: ${WIDTH}px; height: ${HEIGHT}px; }
${LOGO_CSS}
${css}
</style></head><body>${body}</body></html>`;
}

// ------------------------------------------------------------------ site card

/** The homepage hero as a card: still point-wave, logo, hero title. No buttons. */
function sitePage(theme = 'light') {
  const t = (name) => TOKENS[theme === 'dark' ? `dark-${name}` : name];
  const [line1, line2] = read('src/i18n/copy.ts').toString().match(/heroTitle: '([^']+)'/)[1].split('\\n');
  const wave = stripTypeScriptTypes(read('src/scripts/hero-wave.ts').toString());
  const css = `
:root { --wave-a: ${t('wave-a')}; --wave-b: ${t('wave-b')}; --wave-c: ${t('wave-c')}; --wave-opacity: ${t('wave-opacity')}; }
body { background: ${t('background')}; color: ${t('foreground')}; position: relative; overflow: hidden; }
.wave { position: absolute; inset: 0; mask-image: linear-gradient(to bottom, transparent 0%, #000 34%, #000 78%, transparent 100%); }
.wave canvas { display: block; width: 100%; height: 100%; }
/* Pool of page colour under the copy, as in the hero. */
.scrim { position: absolute; inset: 0; background: radial-gradient(ellipse 46% 40% at 50% 50%,
  color-mix(in oklch, ${t('background')} 80%, transparent) 0%, color-mix(in oklch, ${t('background')} 80%, transparent) 45%, transparent 100%); }
.copy { position: relative; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 48px; text-align: center; }
.copy img { width: 88px; height: 88px; }
h1 { font: 700 64px/1.1 Manrope, ${SCRIPT_FALLBACKS}; letter-spacing: -0.025em; }
h1 b { font-weight: inherit; color: ${t('primary')}; }`;
  return frame(`<div class="wave"><canvas data-hero-wave></canvas></div><div class="scrim"></div>
<div class="copy"><img class="logo" src="${LOGO}" alt=""><h1>${line1.replace(/^Zush\b/, '<b>Zush</b>')}<br>${line2}</h1></div>
<script>${wave}</script>`, { css, theme });
}

// ------------------------------------------------------------------ post cards

function frontmatterValue(source, key) {
  const raw = source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim();
  if (!raw) return undefined;
  if (raw.startsWith('"')) return JSON.parse(raw);
  if (raw.startsWith("'")) return raw.slice(1, -1).replaceAll("''", "'");
  return raw;
}

function listPosts(dir = BLOG_DIR) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (name === 'node_modules') return [];
    if (statSync(path).isDirectory()) return listPosts(path);
    if (!/\.mdx?$/.test(name)) return [];
    const source = readFileSync(path, 'utf8').split(/^---$/m)[1] ?? '';
    return [{
      slug: frontmatterValue(source, 'slug') ?? name.replace(/\.mdx?$/, ''),
      title: frontmatterValue(source, 'title'),
      locale: frontmatterValue(source, 'locale') ?? 'en',
      translationOf: frontmatterValue(source, 'translationOf'),
    }];
  });
}

const escapeHtml = (value) => value.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);

/** Cover motif on one side, the title (shrunk to fit) and the brand on the other. */
function postPage(post) {
  const sourceSlug = post.translationOf ?? post.slug;
  const spec = COVERS[sourceSlug];
  if (!spec) throw new Error(`No cover for ${sourceSlug} in scripts/blog-covers/covers.mjs`);
  const rtl = post.locale === 'ar';
  const glowX = rtl ? 22 : 78;
  const css = `
body { ${backdropCss(glowX, 50)} }
body::before { ${dotsCss(glowX, 50)} }
${ART_CSS}
.card { position: relative; height: 100%; display: grid; grid-template-columns: 1fr 420px; gap: 24px; padding: 64px 0 60px 72px; }
[dir="rtl"] .card { padding: 64px 72px 60px 0; }
.text { display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
.brand { display: flex; align-items: center; gap: 14px; font: 700 28px Manrope, sans-serif; letter-spacing: -0.01em; }
.brand img { width: 44px; height: 44px; }
h1 { font: 700 var(--size, 60px)/1.14 Manrope, ${SCRIPT_FALLBACKS}; letter-spacing: -0.02em; text-wrap: balance; }
.site { font: 500 22px Inter, sans-serif; color: ${PALETTE.dim}; letter-spacing: 0; }
[dir="rtl"] .site { text-align: right; }
.art { display: grid; place-items: center; }
.art .row { transform: scale(0.78); }`;
  // Steps the title down until it fits in 280px (four lines at the start size).
  // A block, not top-level consts: setContent() keeps the same window between cards.
  const fit = `<script>{
const h1 = document.querySelector('h1');
document.fonts.ready.then(() => {
  for (let size = 60; size > 36 && h1.offsetHeight > 280; size -= 2) h1.style.setProperty('--size', size - 2 + 'px');
  document.body.dataset.fit = 'done';
});
}</script>`;
  return frame(`<div class="card">
<div class="text"><div class="brand"><img class="logo" src="${LOGO}" alt="">Zush</div><h1>${escapeHtml(post.title)}</h1><div class="site" dir="ltr">zushapp.com/blog</div></div>
<div class="art">${motifs[spec.motif](spec, sourceSlug)}</div>
</div>${fit}`, { css, dir: rtl ? 'rtl' : 'ltr', lang: post.locale });
}

// ------------------------------------------------------------------------ run

const args = process.argv.slice(2);
const posts = listPosts();
const wantSite = args.length === 0 || args.includes('site');
const wantedPosts = args.length === 0 ? posts : posts.filter((post) => args.includes(post.slug));
const unknown = args.filter((arg) => arg !== 'site' && !posts.some((post) => post.slug === arg));
if (unknown.length) throw new Error(`Unknown post slug(s): ${unknown.join(', ')}`);

if (wantSite) {
  // Reduced motion makes hero-wave.ts draw a single still frame and stop.
  const renderer = await openRenderer({ width: WIDTH, height: HEIGHT, reducedMotion: 'reduce' });
  const png = await renderer.shoot(sitePage(), 'canvas[data-ready]');
  await sharp(png).resize(WIDTH, HEIGHT).png({ compressionLevel: 9, palette: false }).toFile(SITE_OUT);
  await renderer.close();
  console.log('✓ public/og-image.png');
}

if (wantedPosts.length) {
  const renderer = await openRenderer({ width: WIDTH, height: HEIGHT });
  for (const post of wantedPosts) {
    const png = await renderer.shoot(postPage(post), 'body[data-fit]');
    await sharp(png).resize(WIDTH, HEIGHT).jpeg({ quality: 84, mozjpeg: true }).toFile(join(POST_OUT_DIR, `${post.slug}.jpg`));
    console.log(`✓ ${post.slug}`);
  }
  await renderer.close();
}
