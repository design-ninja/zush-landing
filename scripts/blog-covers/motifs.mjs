// Blog cover motifs. Every cover is two or three large elements on the same
// graphite background (soft violet glow, point grid fading into a vignette),
// so one image reads on both the light and the dark theme.
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as Lucide from 'lucide-react';

export const PALETTE = {
  bg: '#141419',
  glow: 'rgba(124,111,255,.11)',
  fg: '#f4f4f7',
  dim: 'rgba(244,244,247,.28)',
  accent: '#8b7fff',
  dots: 'rgba(255,255,255,.12)',
};

const MARKS = {
  apple: (s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>`,
  windows: (s) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor"><path d="M3 5.548l7.065-.966v6.822H3V5.548zm0 12.904l7.065.966v-6.822H3v5.856zm7.834 1.072L21 21V12.596h-10.166v6.928zM21 3l-10.166 1.476v6.928H21V3z"/></svg>`,
};

/** A lucide icon by name, or an OS mark ('apple' | 'windows'). */
export function glyph(name, size) {
  if (MARKS[name]) return MARKS[name](Math.round(size * 0.92));
  const Icon = Lucide[name];
  if (!Icon) throw new Error(`Unknown cover icon: ${name}`);
  return renderToStaticMarkup(createElement(Icon, { size, strokeWidth: 1.5 }));
}

/** Small deterministic variation so covers of the same motif differ a little. */
function seeded(slug) {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return (n) => ((h >>> (n * 3)) % 7) / 100;
}

/**
 * Graphite backdrop shared by covers and Open Graph cards: soft glow at
 * (x%, y%), gentle vignette, crisp point grid fading out from the same spot.
 */
export function backdropCss(x = 50, y = 50) {
  const p = PALETTE;
  return `background:
    radial-gradient(ellipse 80% 80% at 50% 50%, transparent 60%, rgba(0,0,0,.22) 100%),
    radial-gradient(circle at ${x}% ${y}%, ${p.glow} 0%, transparent 40%),
    ${p.bg};
  color: ${p.fg}; position: relative; overflow: hidden;`;
}

export function dotsCss(x = 50, y = 50) {
  return `content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle, ${PALETTE.dots} 1.4px, transparent 1.7px); background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 62% 70% at ${x}% ${y}%, #000 0%, transparent 100%);`;
}

/** Classes the motif markup relies on. */
export const ART_CSS = `
.row { position: relative; display: flex; align-items: center; gap: 44px; }
.stack { display: grid; gap: 22px; }
.bar { height: 14px; border-radius: 7px; }
.dim { color: ${PALETTE.dim}; }
.accent { color: ${PALETTE.accent}; }`;

/** A complete 724×543 cover page for one post. */
export function coverPage(spec, slug) {
  const art = motifs[spec.motif];
  if (!art) throw new Error(`Unknown cover motif: ${spec.motif}`);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
* { box-sizing: border-box; margin: 0; }
html, body { width: 724px; height: 543px; }
body { ${backdropCss()} display: grid; place-items: center; }
body::before { ${dotsCss()} }
${ART_CSS}
</style></head><body>${art(spec, slug)}</body></html>`;
}

const bar = (width, accent) =>
  `<div class="bar" style="width:${width}%;background:${accent ? PALETTE.accent : PALETTE.dim}"></div>`;

export const motifs = {
  /** Comparison: subject mark beside a short ranking, the winner in the accent. */
  compare({ icon }, slug) {
    const v = seeded(slug);
    return `<div class="row">
      <span>${glyph(icon, 120)}</span>
      <div class="stack" style="width:220px">${bar(100, true)}${bar(70 + v(1) * 100, false)}${bar(48 + v(2) * 100, false)}</div>
    </div>`;
  },

  /** Flow: the starting point becomes the result (file → folder, OS → automation). */
  flow({ from, to, both = false }) {
    return `<div class="row">
      <span>${glyph(from, 120)}</span>
      <span class="dim">${glyph(both ? 'ArrowLeftRight' : 'ArrowRight', 56)}</span>
      <span class="accent">${glyph(to, 128)}</span>
    </div>`;
  },

  /** Rename: the same kind of file, before and after. */
  rename({ icon }) {
    return `<div class="row">
      <span class="dim">${glyph(icon, 112)}</span>
      <span class="dim">${glyph('ArrowRight', 56)}</span>
      <span class="accent">${glyph(icon, 128)}</span>
    </div>`;
  },

  /** Naming convention: subject icon beside names built from segments. */
  naming({ icon }, slug) {
    const v = seeded(slug);
    const line = (a, b, c) => `<div style="display:flex;gap:10px">
      <div class="bar" style="width:${a}px;background:${PALETTE.accent}"></div>
      <div class="bar" style="width:${b}px;background:${PALETTE.dim}"></div>
      <div class="bar" style="width:${c}px;background:${PALETTE.dim}"></div></div>`;
    return `<div class="row">
      <span>${glyph(icon, 120)}</span>
      <div class="stack">${line(60, 88, 52)}${line(60, 70 + v(1) * 200, 64)}${line(60, 96, 40 + v(2) * 200)}</div>
    </div>`;
  },

  /** Zush versus another app: two tiles, Zush in the accent. */
  versus({ icon }) {
    const tile = (inner, accent) => `<div style="width:150px;height:150px;border-radius:34px;display:grid;place-items:center;
      border:2px solid ${accent ? PALETTE.accent : PALETTE.dim};color:${accent ? PALETTE.accent : PALETTE.dim}">${inner}</div>`;
    return `<div class="row" style="gap:36px">
      ${tile(glyph('Sparkles', 72), true)}
      <span class="dim">${glyph('ArrowLeftRight', 52)}</span>
      ${tile(glyph(icon, 72), false)}
    </div>`;
  },

  /** Templates: one reusable template shared between two computers. */
  templates() {
    return `<div class="row" style="gap:34px">
      <span class="dim">${glyph('Laptop', 96)}</span>
      <span class="accent">${glyph('LayoutTemplate', 120)}</span>
      <span class="dim">${glyph('Laptop', 96)}</span>
    </div>`;
  },
};
