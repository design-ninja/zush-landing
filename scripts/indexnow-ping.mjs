#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, and via it Copilot/ChatGPT-facing indexes).
 *
 * Usage:
 *   node scripts/indexnow-ping.mjs                          # submit every URL from the live sitemap
 *   node scripts/indexnow-ping.mjs /blog/foo /ai-file-organizer   # submit specific paths only
 *
 * Run after a production deploy. Safe to re-run; IndexNow deduplicates.
 */

const HOST = 'zushapp.com';
const KEY = '1a9369f8a6192f87f410b8cd78915f6c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000;

async function getSitemapUrls() {
  const response = await fetch(SITEMAP_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status}`);
  }
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length > 0
    ? args.map((path) => (path.startsWith('http') ? path : `https://${HOST}${path.startsWith('/') ? path : `/${path}`}`))
    : (await getSitemapUrls()).slice(0, MAX_URLS);

  if (urlList.length === 0) {
    console.error('[indexnow] No URLs to submit.');
    process.exit(1);
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
