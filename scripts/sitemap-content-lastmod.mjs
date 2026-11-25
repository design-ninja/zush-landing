#!/usr/bin/env node
// Dates landing and localized pages in sitemap.xml by what each page shows,
// not by which source files it imports.
//
// src/pages/sitemap.xml.ts dates a route from its import graph. That works for
// blog posts and docs (one file per URL), but every localized landing page is
// built by [locale]/[...slug].astro from shared copy modules
// (data/searchLandingPages.ts, i18n/copy.ts, …). One copy edit for one page
// gave ~180 URLs the same new lastmod, the pattern Bing reads as a restamped
// sitemap.
//
// After `astro build` this script fingerprints each in-scope page from the
// built HTML: <title>, meta description and the text of <main>, minus shared
// blocks marked with data-lastmod-ignore (pricing, reviews, badges, CTAs, blog
// highlights) and with app version numbers masked. A page keeps the date stored
// in scripts/sitemap-content-lastmod.json while its fingerprint is unchanged.
//
//   node scripts/sitemap-content-lastmod.mjs           # build: rewrite dist sitemap
//   node scripts/sitemap-content-lastmod.mjs --write   # also record new fingerprints
//   node scripts/sitemap-content-lastmod.mjs --check   # fail if the record is stale
//
// --write stamps changed pages with the current time; commit the JSON with the
// copy change. A build with a stale record stamps changed pages with the HEAD
// commit time, so a forgotten --write still dates the right pages.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STATIC_DIR = path.join(ROOT, '.vercel', 'output', 'static');
const SITEMAP_PATH = path.join(STATIC_DIR, 'sitemap.xml');
const RECORD_PATH = path.join(ROOT, 'scripts', 'sitemap-content-lastmod.json');
const ORIGIN = 'https://zushapp.com';

// Blog posts, blog lists and docs keep the per-file dates from sitemap.xml.ts.
export function isInScope(pathname) {
  return !/(^|\/)blog(\/|$)/.test(pathname) && !pathname.startsWith('/docs');
}

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'source', 'track', 'wbr',
]);

// Drops every element carrying data-lastmod-ignore, with its subtree.
export function stripIgnoredElements(html) {
  const tagPattern = /<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g;
  let output = '';
  let cursor = 0;
  let skipDepth = 0;
  let match;

  while ((match = tagPattern.exec(html))) {
    const [tag, closing, rawName, selfClosing] = match;
    const name = rawName.toLowerCase();
    const isVoid = VOID_ELEMENTS.has(name) || selfClosing === '/';

    if (skipDepth === 0) {
      if (!closing && /\sdata-lastmod-ignore(?:[\s=>/]|$)/.test(tag)) {
        output += html.slice(cursor, match.index);
        if (!isVoid) skipDepth = 1;
        cursor = match.index + tag.length;
      }
      continue;
    }

    if (isVoid) continue;
    skipDepth += closing ? -1 : 1;
    if (skipDepth === 0) cursor = match.index + tag.length;
  }

  return skipDepth === 0 ? output + html.slice(cursor) : output;
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

export function pageFingerprint(html) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/)?.[1] ?? html;
  const text = decodeEntities(
    stripIgnoredElements(
      main
        .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
        .replace(/<template\b[\s\S]*?<\/template>/gi, ' '),
    ).replace(/<[^>]+>/g, ' '),
  )
    // App versions ship with every release and say nothing about the page.
    .replace(/\bv?\d+\.\d+\.\d+(?:\.\d+)?\b/g, '#')
    .replace(/\s+/g, ' ')
    .trim();

  return createHash('sha256')
    .update(JSON.stringify([decodeEntities(title), decodeEntities(description), text]))
    .digest('hex')
    .slice(0, 16);
}

function htmlFileFor(pathname) {
  const candidates = pathname === '/'
    ? [path.join(STATIC_DIR, 'index.html')]
    : [path.join(STATIC_DIR, pathname, 'index.html'), path.join(STATIC_DIR, `${pathname}.html`)];
  return candidates.find((file) => existsSync(file));
}

function headCommitTime() {
  const iso = execFileSync('git', ['log', '-1', '--format=%cI', 'HEAD'], { cwd: ROOT })
    .toString()
    .trim();
  return new Date(iso).toISOString();
}

function readRecord() {
  if (!existsSync(RECORD_PATH)) return {};
  return JSON.parse(readFileSync(RECORD_PATH, 'utf8'));
}

function main() {
  const args = new Set(process.argv.slice(2));
  const write = args.has('--write');
  const check = args.has('--check');
  const unknown = [...args].filter((arg) => arg !== '--write' && arg !== '--check');
  if (unknown.length || (write && check)) {
    throw new Error('Usage: node scripts/sitemap-content-lastmod.mjs [--write | --check]');
  }

  let sitemap = readFileSync(SITEMAP_PATH, 'utf8');
  const record = readRecord();
  const nextRecord = {};
  const changed = [];
  const added = [];
  const stampTime = write ? new Date().toISOString() : headCommitTime();

  sitemap = sitemap.replace(/<url>[\s\S]*?<\/url>/g, (block) => {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const builtLastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (!loc || !builtLastmod) return block;

    const pathname = new URL(loc).pathname;
    if (!isInScope(pathname)) return block;

    const file = htmlFileFor(pathname);
    if (!file) throw new Error(`No built HTML for ${pathname}`);

    const hash = pageFingerprint(readFileSync(file, 'utf8'));
    const previous = record[pathname];
    let lastmod;

    if (!previous) {
      // A page new to the record starts from its source-file date.
      lastmod = builtLastmod;
      added.push(pathname);
    } else if (previous.hash === hash) {
      lastmod = previous.lastmod;
    } else {
      lastmod = stampTime;
      changed.push(pathname);
    }

    nextRecord[pathname] = { hash, lastmod };
    return block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${lastmod}</lastmod>`);
  });

  const removed = Object.keys(record).filter((pathname) => !nextRecord[pathname]);
  const summary = `${Object.keys(nextRecord).length} pages; ${changed.length} changed, ${added.length} new, ${removed.length} gone`;

  if (check) {
    if (changed.length || added.length || removed.length) {
      for (const pathname of [...changed, ...added, ...removed]) console.error(`  ${pathname}`);
      console.error(`[sitemap-lastmod] Record is stale (${summary}). Run: node scripts/sitemap-content-lastmod.mjs --write`);
      process.exit(1);
    }
    console.log(`[sitemap-lastmod] Record is current (${summary}).`);
    return;
  }

  writeFileSync(SITEMAP_PATH, sitemap);
  for (const pathname of changed) console.log(`[sitemap-lastmod] changed ${pathname} -> ${stampTime}`);
  console.log(`[sitemap-lastmod] ${summary}.`);

  if (write) {
    const sorted = Object.fromEntries(Object.entries(nextRecord).sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(RECORD_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
    console.log(`[sitemap-lastmod] Wrote ${path.relative(ROOT, RECORD_PATH)}.`);
  } else if (changed.length || added.length || removed.length) {
    console.warn('[sitemap-lastmod] Record is stale; run with --write and commit scripts/sitemap-content-lastmod.json.');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
