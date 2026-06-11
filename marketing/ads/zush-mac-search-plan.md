# Zush Mac Search Campaign

## Scope

- Campaign: `Zush Mac Search 2026Q2`
- Google Ads account: `471-469-2966`
- Budget: `$100` total
- Duration: `14 days`
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
- Bidding: Maximize clicks with a conservative CPC cap until there is enough conversion data
- Budget: use campaign total budget with an end date if the account supports it; otherwise use a daily budget of `$7.14` and monitor spend
- Final URLs: ad-group-specific landing pages with full UTM suffixes from `google-search-keywords.csv`

## Files

- `google-search-keywords.csv`: ad groups, keywords, match types, URLs
- `google-search-negative-keywords.csv`: campaign-level negative keywords
- `google-search-rsa-assets.csv`: responsive search ad copy
- `google-search-extensions.csv`: sitelinks and callouts

## Google Ads Setup Status

- Account and billing: configured.
- Campaign: rebuilt and paused.
- Campaign ID: `23816664121`.
- Daily budget: `260 THB`.
- Bidding: maximize clicks / target spend with `70 THB` CPC ceiling.
- Networks: Google Search only; Search partners and Display expansion disabled.
- Location option: presence only.
- Devices: desktop bid modifier `1.0`; mobile/tablet bid modifiers `0.1`.
- Ad groups:
  - `Core AI File Renamer`
  - `Screenshots Images Mac`
  - `PDF Docs Downloads Mac`
  - `Alternatives Competitors`
- Legacy mixed ad group and legacy stale RSA removed from serving.
- Current RSA and assets are aligned to Zush 3.0-era positioning: 50 included AI renames, $8/month, $38 one-time, BYOK, Offline AI, native macOS app.
- New RSA and assets are under Google Ads review as of 2026-06-11.
- Conversion action: `Mac download click`, category `Outbound click`, primary action, no conversion value, count `One`.
- Conversion action: `Purchase`, category `Purchase`, primary action. No purchase events recorded yet.
- Google Ads tag:
  - `PUBLIC_GOOGLE_ADS_ID=AW-18134395043`
  - `PUBLIC_GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL=txeACM3lqKYcEKPRk8dD`
  - `PUBLIC_GOOGLE_ADS_PURCHASE_CONVERSION_LABEL=R7ihCIWMp6YcEKPRk8dD`
- Vercel env: added for `Production` and `Development`; add `Preview` if needed for future preview deployment testing.

## Remaining Launch Steps

1. Wait until the new RSA and campaign assets finish Google Ads review.
2. Re-check campaign primary status; `HAS_ADS_LIMITED_BY_POLICY` may persist while new assets are under review or while Google refreshes policy state.
3. Confirm `Mac download click` still fires from the live `/mac` page and from paid landing pages.
4. Start the campaign manually when ready.
5. Monitor spend daily; stop the test if click quality is poor before the full `$100` is spent.

## Optimization Rules

- After day 3: pause any search terms clearly looking for Windows, scripts, command-line renaming, online upload tools, cracked software, music/movie subtitle renamers.
- After day 7: move any converting phrase-match search terms into exact match.
- Keep the competitors/alternatives ad group capped at 10% of spend unless it produces download clicks cheaper than the core group.
- Primary success metric for this $100 test: cost per Mac download click.
- Secondary success metric: purchase conversion rate from paid traffic, if purchase tracking records enough events.
