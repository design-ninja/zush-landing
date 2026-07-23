#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, and via it Copilot/ChatGPT-facing indexes).
 *
 * Usage:
 *   node scripts/indexnow-ping.mjs                          # submit sitemap URLs changed in the last RECENT_HOURS
 *   node scripts/indexnow-ping.mjs --changed-files list.txt # add URLs affected by the listed source files
 *   node scripts/indexnow-ping.mjs --all                    # submit every URL from the live sitemap
 *   node scripts/indexnow-ping.mjs /blog/foo /ai-file-organizer   # submit specific paths only
 *   node scripts/indexnow-ping.mjs --dry-run                # print what would be submitted, do not submit
 *
 * Run after a production deploy. Safe to re-run; IndexNow deduplicates.
 * Bing asks that only changed URLs be submitted — resubmitting the full
 * sitemap on every deploy erodes trust in the key and can get pings ignored.
 *
 * Sitemap lastmod alone under-reports: it is computed per route from that
 * route's own source file and deliberately ignores shared files, so edits to
 * src/i18n or src/seo change what a page renders without moving its lastmod.
 * --changed-files closes that gap by mapping changed sources back to routes.
 */

import { readFile } from 'node:fs/promises';

const HOST = 'zushapp.com';
const KEY = '1a9369f8a6192f87f410b8cd78915f6c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000;
const RECENT_HOURS = Number(process.env.INDEXNOW_RECENT_HOURS ?? 48);

async function getSitemapEntries() {
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status}`);
  }
  const xml = await response.text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
    loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  })).filter((entry) => entry.loc);
}

async function getRecentlyChangedUrls() {
  const entries = await getSitemapEntries();
  const cutoff = Date.now() - RECENT_HOURS * 60 * 60 * 1000;
  const recent = entries.filter((entry) => {
    if (!entry.lastmod) return true;
    const lastmod = new Date(entry.lastmod).getTime();
    return Number.isNaN(lastmod) || lastmod >= cutoff;
  });
  console.log(`[indexnow] Sitemap has ${entries.length} URLs; ${recent.length} changed in the last ${RECENT_HOURS}h.`);
  return recent.map((entry) => entry.loc);
}

// Shared copy: every rendered page reads from these, except the MDX-driven
// docs, which Starlight builds from its own content collection.
const GLOBAL_COPY_PREFIXES = ['src/i18n/', 'src/seo/'];

// Keep in sync with LOCALES in src/i18n/config.ts (minus the default locale).
const LOCALE_SLUGS = ['fr', 'de', 'es', 'pt-br', 'it', 'nl', 'tr', 'ja', 'ko', 'zh-cn', 'ar'];

function routeOf(url) {
  return new URL(url).pathname.replace(/\/$/, '') || '/';
}

// Selects a route in every language: /mac also picks up /de/mac.
function selectBySuffix(urls, route) {
  const wanted = new Set(
    route === '/'
      ? ['/', ...LOCALE_SLUGS.map((slug) => `/${slug}`)]
      : [route, ...LOCALE_SLUGS.map((slug) => `/${slug}${route}`)],
  );
  return urls.filter((url) => wanted.has(routeOf(url)));
}

function urlsForChangedFiles(files, sitemapUrls) {
  const selected = new Set();
  const add = (list) => list.forEach((url) => selected.add(url));

  for (const file of files) {
    const path = file.trim().replace(/^\.\//, '');
    if (!path) continue;

    if (GLOBAL_COPY_PREFIXES.some((prefix) => path.startsWith(prefix))) {
      add(sitemapUrls.filter((url) => !routeOf(url).startsWith('/docs')));
      continue;
    }

    const page = path.match(/^src\/pages\/(.+)\.astro$/);
    if (page) {
      const name = page[1].replace(/\/index$/, '');
      add(selectBySuffix(sitemapUrls, name === 'index' ? '/' : `/${name}`));
      continue;
    }

    const blog = path.match(/^src\/content\/blog\/(.+)\.mdx?$/);
    if (blog) {
      add(selectBySuffix(sitemapUrls, `/blog/${blog[1]}`));
      add(selectBySuffix(sitemapUrls, '/blog'));
      continue;
    }

    const docs = path.match(/^src\/content\/docs\/(.+)\.mdx?$/);
    if (docs) {
      add(selectBySuffix(sitemapUrls, `/docs/${docs[1]}`.replace(/\/index$/, '')));
    }
    // Shared components, layouts and styles are deliberately ignored: they
    // touch nearly every page, and submitting all of them on every deploy is
    // the flood pattern Bing penalises.
  }

  return [...selected];
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const submitAll = args.includes('--all');
  const changedFilesIndex = args.indexOf('--changed-files');
  const changedFilesPath = changedFilesIndex >= 0 ? args[changedFilesIndex + 1] : null;
  const changedFilesValueIndex = changedFilesIndex >= 0 ? changedFilesIndex + 1 : -1;
  const paths = args.filter((arg, index) => (
    !arg.startsWith('--') && index !== changedFilesValueIndex
  ));

  let urlList;
  if (paths.length > 0) {
    urlList = paths.map((path) => (
      path.startsWith('http') ? path : `https://${HOST}${path.startsWith('/') ? path : `/${path}`}`
    ));
  } else if (submitAll) {
    urlList = (await getSitemapEntries()).map((entry) => entry.loc);
  } else {
    const byLastmod = await getRecentlyChangedUrls();
    let byFiles = [];

    if (changedFilesPath) {
      const files = (await readFile(changedFilesPath, 'utf8')).split('\n').filter(Boolean);
      const sitemapUrls = (await getSitemapEntries()).map((entry) => entry.loc);
      byFiles = urlsForChangedFiles(files, sitemapUrls);
      console.log(`[indexnow] ${files.length} changed files map to ${byFiles.length} URLs.`);
    }

    urlList = [...new Set([...byLastmod, ...byFiles])];
  }

  urlList = urlList.slice(0, MAX_URLS);

  if (urlList.length === 0) {
    console.log('[indexnow] No changed URLs to submit; skipping ping.');
    return;
  }

  if (dryRun) {
    console.log(`[indexnow] Dry run: would submit ${urlList.length} URLs:`);
    for (const url of urlList) console.log(`  ${url}`);
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // 200 = submitted, 202 = key validation pending — both are success.
  if (response.status === 200 || response.status === 202) {
    console.log(`[indexnow] OK (${response.status}): submitted ${urlList.length} URLs.`);
  } else {
    console.error(`[indexnow] Failed (${response.status}): ${await response.text()}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('[indexnow] Error:', error.message);
  process.exit(1);
});
