#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, and via it Copilot/ChatGPT-facing indexes).
 *
 * Usage:
 *   node scripts/indexnow-ping.mjs                          # submit sitemap URLs changed in the last RECENT_HOURS
 *   node scripts/indexnow-ping.mjs --all                    # submit every URL from the live sitemap
 *   node scripts/indexnow-ping.mjs /blog/foo /ai-file-organizer   # submit specific paths only
 *   node scripts/indexnow-ping.mjs --dry-run                # print what would be submitted, do not submit
 *
 * Run after a production deploy. Safe to re-run; IndexNow deduplicates.
 * Bing asks that only changed URLs be submitted — resubmitting the full
 * sitemap on every deploy erodes trust in the key and can get pings ignored.
 */

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

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const submitAll = args.includes('--all');
  const paths = args.filter((arg) => !arg.startsWith('--'));

  const urlList = paths.length > 0
    ? paths.map((path) => (path.startsWith('http') ? path : `https://${HOST}${path.startsWith('/') ? path : `/${path}`}`))
    : submitAll
      ? (await getSitemapEntries()).map((entry) => entry.loc).slice(0, MAX_URLS)
      : (await getRecentlyChangedUrls()).slice(0, MAX_URLS);

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
