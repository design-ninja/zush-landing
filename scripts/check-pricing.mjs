import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8');
}

function fail(message) {
  throw new Error(`[check-pricing] ${message}`);
}

function assertIncludes(relativePath, expected) {
  const source = read(relativePath);
  if (!source.includes(expected)) {
    fail(`${relativePath} is missing ${JSON.stringify(expected)}`);
  }
}

const pricingData = JSON.parse(read('src/constants/pricingData.json'));
const monthlyUsd = pricingData.monthly?.usd;
const oneTimeUsd = pricingData.oneTime?.usd;

if (!Number.isFinite(monthlyUsd) || !Number.isFinite(oneTimeUsd)) {
  fail('pricingData.json must contain numeric monthly.usd and oneTime.usd values');
}

const monthlyLabel = `$${monthlyUsd}`;
const oneTimeLabel = `$${oneTimeUsd}`;
const annualLabel = `$${monthlyUsd * 12}`;
const threeYearLabel = `$${monthlyUsd * 12 * 3}`;
const fiveYearLabel = `$${monthlyUsd * 12 * 5}`;

const centralizedRuntimeFiles = [
  'src/components/Pricing/constants.ts',
  'src/components/PlatformLandingPage/PlatformLandingPage.astro',
  'src/components/blog/BlogCTA.astro',
  'src/data/homeFaq.ts',
  'src/i18n/copy.ts',
  'src/i18n/evidenceSignals.ts',
  'src/i18n/legalPages.ts',
  'src/pages/[locale]/index.astro',
  'src/pages/blog/[slug].astro',
  'src/pages/llms.txt.ts',
  'src/pages/pricing.md.ts',
  'src/seo/config.ts',
  'src/utils/jsonLd.ts',
  'src/utils/proAnalytics.ts',
];

for (const relativePath of centralizedRuntimeFiles) {
  assertIncludes(relativePath, 'PRO_PRICING');
}

const priceContentFiles = [
  'src/content/blog/advanced-renamer-alternatives.mdx',
  'src/content/blog/ai-document-renamer-guide.mdx',
  'src/content/blog/ai-photo-renamer-guide.mdx',
  'src/content/blog/auto-rename-files-mac-guide.mdx',
  'src/content/blog/best-ai-file-renamer-tools-2026.mdx',
  'src/content/blog/best-ai-file-renamer-tools-mac-compared.mdx',
  'src/content/blog/best-ai-file-renamer-tools-windows-compared.mdx',
  'src/content/blog/bulk-rename-utility-alternatives.mdx',
  'src/content/blog/byok-ai-file-renaming-unlimited.mdx',
  'src/content/blog/cloud-vs-local-ai-file-renaming.mdx',
  'src/content/blog/rename-files-with-ai-free.mdx',
  'src/content/blog/rename-files-with-ai-guide.mdx',
  'src/content/blog/rename-pdf-files-automatically.mdx',
  'src/content/blog/rename-screenshots-automatically-mac.mdx',
  'src/content/blog/zush-vs-airenamer.mdx',
  'src/content/blog/zush-vs-filesdesk.mdx',
  'src/content/blog/zush-vs-namequick.mdx',
  'src/content/blog/zush-vs-renameclick.mdx',
  'src/content/blog/zush-vs-renamer-ai.mdx',
];

for (const relativePath of priceContentFiles) {
  const source = read(relativePath);
  if (!source.includes(monthlyLabel) || !source.includes(oneTimeLabel)) {
    fail(`${relativePath} does not contain both current Zush price labels`);
  }

  for (const line of source.split('\n')) {
    if (!/Zush|PRO|Pro/.test(line)) continue;

    const withoutCompetitorMonthlyPrice = line.replaceAll(/\$8\s*\+\s*VAT/gi, '');
    if (withoutCompetitorMonthlyPrice.includes('$8') || line.includes('$38')) {
      fail(`${relativePath} still contains a legacy Zush price: ${line.trim()}`);
    }
  }
}

assertIncludes(
  'src/content/blog/de/beste-ki-tools-dateien-umbenennen-windows.mdx',
  `Pro ${monthlyUsd} $/Monat oder ${oneTimeUsd} $ einmalig`,
);
assertIncludes('src/content/blog/best-ai-file-renamer-tools-2026.mdx', annualLabel);
assertIncludes('src/content/blog/best-ai-file-renamer-tools-2026.mdx', threeYearLabel);
assertIncludes('src/content/blog/best-ai-file-renamer-tools-2026.mdx', fiveYearLabel);
assertIncludes('src/content/blog/zush-vs-renameclick.mdx', annualLabel);
assertIncludes('src/content/blog/zush-vs-renameclick.mdx', threeYearLabel);
assertIncludes('src/content/blog/zush-vs-renameclick.mdx', fiveYearLabel);
assertIncludes('marketing/ads/google-search-extensions.csv', `Monthly ${monthlyLabel} Pro`);
assertIncludes('marketing/ads/google-search-extensions.csv', `One-Time ${oneTimeLabel} Pro`);
assertIncludes('marketing/ads/google-search-rsa-assets.csv', `Zush Pro ${oneTimeLabel} One-Time`);
assertIncludes('BLOG_GROWTH_BRIEF.md', `${monthlyLabel}/month or ${oneTimeLabel} one-time`);

const adScript = read('marketing/ads/scripts/update_zush_mac_search_campaign.py');
for (const expected of [
  'pricingData.json',
  'MONTHLY_PRICE_USD',
  'ONE_TIME_PRICE_USD',
]) {
  if (!adScript.includes(expected)) {
    fail(`Google Ads update script is missing centralized pricing reference ${expected}`);
  }
}

console.log(
  `[check-pricing] OK: Zush pricing is ${monthlyLabel}/month or ${oneTimeLabel} one-time; derived monthly costs are ${annualLabel}, ${threeYearLabel}, and ${fiveYearLabel}.`,
);
