# Zush Mac Search Campaign

## Scope

- Campaign: `Zush Mac Search 2026Q2`
- Google Ads account: `471-469-2966`
- Budget: `700 THB/day` live test cap
- Duration: monitor daily until traffic and cost quality are clear
- Primary landing pages: `/mac`, `/rename-screenshots-with-ai`, `/rename-pdf-with-ai`, and `/blog/best-ai-file-renamer-tools-mac-compared`
- Primary conversion: Mac download click
- Secondary conversion: purchase

## Required Google Ads Settings

- Campaign type: Search
- Networks: Google Search only; disable Display expansion
- Locations: United States, Canada, United Kingdom, Australia, New Zealand, Singapore
- Location option: presence only
- Language: English
- Devices: desktop/computers only where possible; otherwise reduce mobile/tablet bids as far as allowed
- Bidding: Manual CPC for the launch period while the account has no traffic history
- Budget: `700 THB/day`; review spend daily before scaling
- Final URLs: ad-group-specific landing pages with full UTM suffixes from `google-search-keywords.csv`

## Files

- `google-search-keywords.csv`: ad groups, keywords, match types, URLs
- `google-search-negative-keywords.csv`: campaign-level negative keywords
- `google-search-rsa-assets.csv`: responsive search ad copy
- `google-search-extensions.csv`: sitelinks and callouts

## Google Ads Setup Status

- Account and billing: configured.
- Campaign: rebuilt and enabled.
- Campaign ID: `23816664121`.
- Daily budget: `700 THB`.
- Bidding: manual CPC. Active ad groups and keyword-level bids are capped at `50 THB` after the first click cost `139.49 THB` on `[file renamer]`.
- Networks: Google Search only; Search partners cannot be enabled for this account (`CANNOT_TARGET_PARTNER_SEARCH_NETWORK`), and Display expansion remains disabled.
- Location option: presence only.
- Devices: desktop bid modifier `1.0`; mobile/tablet bid modifiers `0.1`.
- Ad groups:
  - `Core AI File Renamer`
  - `Screenshots Images Mac`
  - `PDF Docs Downloads Mac`
  - `Alternatives Competitors`
- Legacy mixed ad group and legacy stale RSA removed from serving.
- Current approved RSA and assets are aligned to Zush 3.0-era positioning: 50 included AI renames, $8/month, $38 one-time, BYOK, Offline AI, native macOS app.
- Added a high-relevance core RSA with pinned `Mac File Renamer` headline on 2026-06-12; it may temporarily remain under review.
- Added broader launch keywords such as `file renamer`, `batch file renamer`, `bulk file renamer`, `pdf renamer`, `image renamer`, and `photo renamer` on 2026-06-12; new keywords may temporarily remain under review.
- Ad Preview note: `Your ad is probably being shown at times, but was not shown for this particular diagnosis` is an auction-level message, not a campaign blocker. Verify live health primarily through campaign/ad/keyword statuses and real impressions.
- Conversion action: `Mac download click`, category `Outbound click`, primary action, no conversion value, count `One`.
- Conversion action: `Purchase`, category `Purchase`, primary action. No purchase events recorded yet.
- Google Ads tag:
  - `PUBLIC_GOOGLE_ADS_ID=AW-18134395043`
  - `PUBLIC_GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL=txeACM3lqKYcEKPRk8dD`
  - `PUBLIC_GOOGLE_ADS_PURCHASE_CONVERSION_LABEL=R7ihCIWMp6YcEKPRk8dD`
- Vercel env: added for `Production` and `Development`; add `Preview` if needed for future preview deployment testing.

## Remaining Launch Steps

1. Wait until the newly added high-relevance RSA and broadened keywords finish Google Ads review.
2. Re-check campaign primary status and actual impressions/clicks after Google Ads reporting catches up.
3. Confirm `Mac download click` still fires from the live `/mac` page and from paid landing pages.
4. Monitor spend daily; stop or tighten the test if click quality is poor.

## Optimization Rules

- After day 1: review search terms that spent without a Mac download click; pause or lower broad/generic terms before raising CPC caps again.
- After day 3: pause any search terms clearly looking for Windows, scripts, command-line renaming, online upload tools, cracked software, music/movie subtitle renamers.
- After day 7: move any converting phrase-match search terms into exact match.
- Keep the competitors/alternatives ad group capped at 10% of spend unless it produces download clicks cheaper than the core group.
- Primary success metric for this $100 test: cost per Mac download click.
- Secondary success metric: purchase conversion rate from paid traffic, if purchase tracking records enough events.
