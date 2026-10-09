import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const adsDir = `${root}/marketing/ads`;
const campaignName = 'Zush Mac Search 2026Q4';
const utmCampaign = 'zush_mac_search_2026q4';

function parseCsv(filename) {
  const source = readFileSync(`${adsDir}/${filename}`, 'utf8').replace(/\r\n/g, '\n');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < source.length; index++) {
    const character = source[index];
    if (quoted && character === '"' && source[index + 1] === '"') {
      field += '"';
      index++;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if (character === '\n' && !quoted) {
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  assert.equal(quoted, false, `${filename}: unclosed quoted field`);
  const [headers, ...values] = rows;
  return values.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ''])));
}

const keywordRows = parseCsv('google-search-keywords.csv');
const rsaRows = parseCsv('google-search-rsa-assets.csv');
const negativeRows = parseCsv('google-search-negative-keywords.csv');
const adGroupNegativeRows = parseCsv('google-search-ad-group-negative-keywords.csv');
const extensionRows = parseCsv('google-search-extensions.csv');
const sources = { keywordRows, rsaRows, negativeRows, adGroupNegativeRows, extensionRows };

for (const [name, rows] of Object.entries(sources)) {
  assert.ok(rows.length > 0, `${name}: empty plan`);
  assert.deepEqual([...new Set(rows.map((row) => row.campaign))], [campaignName], `${name}: campaign drift`);
}

assert.deepEqual([...new Set(keywordRows.map((row) => row.utm_source))], ['google']);
assert.deepEqual([...new Set(keywordRows.map((row) => row.utm_medium))], ['cpc']);
assert.deepEqual([...new Set(keywordRows.map((row) => row.utm_campaign))], [utmCampaign]);

const adGroups = new Set(keywordRows.map((row) => row.ad_group));
for (const row of [...rsaRows, ...adGroupNegativeRows]) {
  assert.ok(adGroups.has(row.ad_group), `unknown ad group: ${row.ad_group}`);
}

const keywordKeys = keywordRows.map((row) => `${row.ad_group}\0${row.keyword.toLowerCase()}\0${row.match_type}`);
assert.equal(new Set(keywordKeys).size, keywordKeys.length, 'duplicate keyword and match type');

const unsafeCampaignNegatives = new Set([
  'mp3', 'music', 'movie', 'tv show', 'subtitle', 'how to',
  'file management', 'file manager', 'official site',
]);
for (const row of negativeRows) {
  assert.equal(unsafeCampaignNegatives.has(row.negative_keyword.toLowerCase()), false, `overbroad campaign negative: ${row.negative_keyword}`);
}

const requiredIntentNegatives = [
  'ollama rename model', 'photo storage', 'compress pdf', 'delete files', 'disk cleanup',
];
const campaignNegatives = new Set(negativeRows.map((row) => row.negative_keyword.toLowerCase()));
for (const keyword of requiredIntentNegatives) {
  assert.ok(campaignNegatives.has(keyword), `missing non-product intent negative: ${keyword}`);
}

const sitelinks = extensionRows.filter((row) => row.extension_type === 'Sitelink');
const sitelinkContents = sitelinks.map((row) => new URL(row.final_url).searchParams.get('utm_content'));
assert.ok(sitelinkContents.every(Boolean), 'every sitelink needs its own utm_content');
assert.equal(new Set(sitelinkContents).size, sitelinkContents.length, 'sitelink utm_content must be unique');

for (const row of keywordRows) {
  const url = new URL(row.final_url);
  assert.equal(url.origin, 'https://zushapp.com');
  assert.equal(url.search, '', `keyword URL tracking belongs in the suffix: ${row.final_url}`);
}

for (const row of rsaRows) {
  const limit = row.type === 'Headline' ? 30 : 90;
  assert.ok(row.text.length <= limit, `${row.type} exceeds ${limit} characters: ${row.text}`);
  assert.doesNotMatch(row.text, /\$\d+/, `numeric price claim requires a fresh live check: ${row.text}`);
}
for (const row of extensionRows.filter((row) => row.extension_type === 'Callout')) {
  assert.ok(row.text.length <= 25, `callout exceeds 25 characters: ${row.text}`);
  assert.doesNotMatch(row.text, /\$\d+/, `numeric price claim requires a fresh live check: ${row.text}`);
}

const updater = readFileSync(`${adsDir}/scripts/update_zush_mac_search_campaign.py`, 'utf8');
for (const filename of [
  'google-search-keywords.csv',
  'google-search-rsa-assets.csv',
  'google-search-negative-keywords.csv',
  'google-search-ad-group-negative-keywords.csv',
  'google-search-extensions.csv',
]) {
  assert.ok(updater.includes(filename), `update script does not load ${filename}`);
}
assert.ok(updater.includes('ensure_ad_group_negative_keywords(client, ad_groups)'));
assert.ok(updater.includes('ZUSH_GOOGLE_ADS_EXPLICITLY_ENABLED'));
assert.ok(updater.includes('criterion.final_urls.append(keyword.final_url)'));
assert.ok(updater.includes('criterion.final_url_suffix = final_url_suffix'));
assert.doesNotMatch(updater, /2026Q[123]|2026q[123]|campaign_fallback/);

console.log(`Google Search plan OK: ${keywordRows.length} keywords, ${negativeRows.length} campaign negatives, ${adGroupNegativeRows.length} ad-group negatives, ${sitelinks.length} tracked sitelinks.`);
