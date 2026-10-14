#!/usr/bin/env node
// SEO regression guard for design-only changes.
//
//   node scripts/seo-snapshot.mjs snapshot <out.json>   # read dist/ and record SEO signals per page
//   node scripts/seo-snapshot.mjs compare <base.json> <head.json>
//
// For every built HTML page it records what search engines and AI crawlers read:
// title, meta description, canonical, robots, hreflang, Open Graph, headings,
// JSON-LD, internal links with anchor text, image alts and the visible text.
// `compare` exits non-zero when any of these differ, so a redesign can prove
// that it changed only the look.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { parse } from 'parse5';

const SITE_ORIGIN = 'https://zushapp.com';
const SKIP_TEXT = new Set(['script', 'style', 'noscript', 'template', 'svg', 'head']);

function distRoot() {
  const root = join(process.cwd(), 'dist');
  return existsSync(join(root, 'client')) ? join(root, 'client') : root;
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const norm = (s) => s.replace(/\s+/g, ' ').trim();

function textOf(node) {
  if (node.nodeName === '#text') return node.value;
  if (SKIP_TEXT.has(node.nodeName)) return '';
  return (node.childNodes || []).map(textOf).join(' ');
}

function routeFor(file, root) {
  let rel = relative(root, file).split(sep).join('/');
  rel = rel.replace(/index\.html$/, '').replace(/\.html$/, '');
  return '/' + rel.replace(/\/$/, '');
}

function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sortKeys(value[k])]));
  }
  return value;
}

function internalPath(href) {
  if (!href) return null;
  if (href.startsWith(SITE_ORIGIN)) href = href.slice(SITE_ORIGIN.length) || '/';
  if (!href.startsWith('/') || href.startsWith('//')) return null;
  return href;
}

function snapshotPage(html) {
  const doc = parse(html);
  const page = {
    title: '', description: '', canonical: '', robots: '', hreflang: [], og: {},
    headings: [], jsonLd: [], links: [], imgAlts: [], text: '',
  };
  const stack = [doc];
  let body = null;
  while (stack.length) {
    const node = stack.pop();
    const tag = node.nodeName;
    if (tag === 'body') body = node;
    if (tag === 'title' && !page.title) page.title = norm(textOf({ ...node, nodeName: 'x' }));
    if (tag === 'meta') {
      const name = attr(node, 'name');
      const prop = attr(node, 'property');
      const content = attr(node, 'content') ?? '';
      if (name === 'description') page.description = content;
      if (name === 'robots') page.robots = content;
      if (prop?.startsWith('og:') || name?.startsWith('twitter:')) page.og[prop || name] = content;
    }
    if (tag === 'link') {
      const rel = attr(node, 'rel');
      if (rel === 'canonical') page.canonical = attr(node, 'href') ?? '';
      if (rel === 'alternate' && attr(node, 'hreflang')) page.hreflang.push(`${attr(node, 'hreflang')} ${attr(node, 'href')}`);
    }
    if (tag === 'script' && attr(node, 'type') === 'application/ld+json') {
      const raw = (node.childNodes || []).map((c) => c.value || '').join('');
      try { page.jsonLd.push(JSON.stringify(sortKeys(JSON.parse(raw)))); } catch { page.jsonLd.push(norm(raw)); }
    }
    if (/^h[1-6]$/.test(tag)) page.headings.push(`${tag} ${norm(textOf({ ...node, nodeName: 'x' }))}`);
    if (tag === 'a') {
      const path = internalPath(attr(node, 'href'));
      if (path) {
        const label = norm(textOf({ ...node, nodeName: 'x' })) || attr(node, 'aria-label') || '';
        page.links.push(`${path} | ${label}`);
      }
    }
    if (tag === 'img') page.imgAlts.push(attr(node, 'alt') ?? '<missing>');
    const kids = node.childNodes || node.content?.childNodes || [];
    for (let i = kids.length - 1; i >= 0; i--) stack.push(kids[i]);
  }
  // Document order matters for headings; the stack walk above is depth-first in order.
  page.hreflang.sort();
  page.links.sort();
  page.imgAlts.sort();
  page.text = body ? norm(textOf(body)) : '';
  return page;
}

function snapshot(outFile) {
  const root = distRoot();
  if (!existsSync(root)) throw new Error(`No build output at ${root}; run pnpm build first`);
  const pages = {};
  for (const file of walk(root)) {
    pages[routeFor(file, root)] = snapshotPage(readFileSync(file, 'utf8'));
  }
  writeFileSync(outFile, JSON.stringify(pages, null, 1));
  console.log(`Recorded ${Object.keys(pages).length} pages → ${outFile}`);
}

function wordDiff(a, b) {
  const count = (s) => s.split(' ').reduce((m, w) => m.set(w, (m.get(w) || 0) + 1), new Map());
  const ca = count(a), cb = count(b);
  const removed = [], added = [];
  for (const [w, n] of ca) if ((cb.get(w) || 0) < n) removed.push(`${w}×${n - (cb.get(w) || 0)}`);
  for (const [w, n] of cb) if ((ca.get(w) || 0) < n) added.push(`${w}×${n - (ca.get(w) || 0)}`);
  return { removed: removed.slice(0, 25), added: added.slice(0, 25) };
}

function listDiff(a, b) {
  const sa = new Set(a), sb = new Set(b);
  return { removed: a.filter((x) => !sb.has(x)).slice(0, 15), added: b.filter((x) => !sa.has(x)).slice(0, 15) };
}

function compare(baseFile, headFile) {
  const base = JSON.parse(readFileSync(baseFile, 'utf8'));
  const head = JSON.parse(readFileSync(headFile, 'utf8'));
  const problems = [];
  for (const route of Object.keys(base)) {
    if (!head[route]) problems.push({ route, field: 'page', detail: 'missing in new build' });
  }
  for (const route of Object.keys(head)) {
    if (!base[route]) problems.push({ route, field: 'page', detail: 'new page (not in base)' });
  }
  for (const route of Object.keys(base)) {
    const a = base[route], b = head[route];
    if (!b) continue;
    for (const field of ['title', 'description', 'canonical', 'robots']) {
      if (a[field] !== b[field]) problems.push({ route, field, detail: `${JSON.stringify(a[field])} → ${JSON.stringify(b[field])}` });
    }
    if (JSON.stringify(a.og) !== JSON.stringify(b.og)) problems.push({ route, field: 'og', detail: 'Open Graph / Twitter tags differ' });
    for (const field of ['hreflang', 'jsonLd', 'links', 'imgAlts']) {
      if (JSON.stringify(a[field]) !== JSON.stringify(b[field])) problems.push({ route, field, detail: listDiff(a[field], b[field]) });
    }
    if (JSON.stringify(a.headings) !== JSON.stringify(b.headings)) problems.push({ route, field: 'headings', detail: listDiff(a.headings, b.headings) });
    if (a.text !== b.text) {
      const hash = (s) => createHash('sha1').update(s).digest('hex').slice(0, 8);
      const d = wordDiff(a.text, b.text);
      const reorderOnly = !d.removed.length && !d.added.length;
      problems.push({ route, field: reorderOnly ? 'text-order' : 'text', detail: reorderOnly ? `same words, different order (${hash(a.text)} → ${hash(b.text)})` : d });
    }
  }
  const byField = problems.reduce((m, p) => m.set(p.field, (m.get(p.field) || 0) + 1), new Map());
  console.log(`Compared ${Object.keys(base).length} pages.`);
  if (!problems.length) {
    console.log('OK: no SEO-relevant differences.');
    return;
  }
  console.log('Differences by field:', Object.fromEntries(byField));
  for (const p of problems.slice(0, 200)) console.log(`- ${p.route} [${p.field}]`, typeof p.detail === 'string' ? p.detail : JSON.stringify(p.detail));
  if (problems.length > 200) console.log(`… and ${problems.length - 200} more`);
  process.exitCode = 1;
}

const [cmd, a1, a2] = process.argv.slice(2);
if (cmd === 'snapshot' && a1) snapshot(a1);
else if (cmd === 'compare' && a1 && a2) compare(a1, a2);
else {
  console.error('Usage: seo-snapshot.mjs snapshot <out.json> | compare <base.json> <head.json>');
  process.exit(2);
}
