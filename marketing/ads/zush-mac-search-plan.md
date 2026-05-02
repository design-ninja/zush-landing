# Zush Mac Search Campaign

## Scope

- Campaign: `Zush Mac Search 2026Q2`
- Google Ads account: `471-469-2966`
- Budget: `$100` total
- Duration: `14 days`
- Primary landing page: `https://zushapp.com/mac`
- Primary conversion: Mac download click
- Secondary conversion: Mac App Store click

## Required Google Ads Settings

- Campaign type: Search
- Networks: Google Search only; disable Display expansion
- Locations: United States, Canada, United Kingdom, Australia, New Zealand, Singapore
- Location option: presence only
- Language: English
- Devices: desktop/computers only where possible; otherwise reduce mobile/tablet bids as far as allowed
- Bidding: Maximize clicks with a conservative CPC cap until there is enough conversion data
- Budget: use campaign total budget with an end date if the account supports it; otherwise use a daily budget of `$7.14` and monitor spend
- Final URL: `/mac` with UTM params from `google-search-keywords.csv`

## Files

- `google-search-keywords.csv`: ad groups, keywords, match types, URLs
- `google-search-negative-keywords.csv`: campaign-level negative keywords
- `google-search-rsa-assets.csv`: responsive search ad copy
- `google-search-extensions.csv`: sitelinks and callouts

## Google Ads Setup Status

- Account and billing: configured.
- Campaign: created and paused.
- Conversion action: `Mac download click`, category `Outbound click`, primary action, no conversion value, count `One`.
- Google Ads tag:
  - `PUBLIC_GOOGLE_ADS_ID=AW-18134395043`
  - `PUBLIC_GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL=txeACM3lqKYcEKPRk8dD`
- Vercel env: added for `Production` and `Development`; add `Preview` after this branch exists in the connected Git repository.

## Remaining Launch Steps

1. Deploy the site changes so the Google tag and event snippet are live.
2. Use Google Tag Assistant or Google Ads diagnostics to confirm the conversion fires when clicking Mac direct download and Mac App Store CTA links.
3. Keep the campaign paused until the conversion status changes from misconfigured to active/recording.
4. Start the campaign manually when ready.

## Optimization Rules

- After day 3: pause any search terms clearly looking for Windows, scripts, command-line renaming, online upload tools, cracked software, music/movie subtitle renamers.
- After day 7: move any converting phrase-match search terms into exact match.
- Keep the competitors/alternatives ad group capped at 10% of spend unless it produces download clicks cheaper than the core group.
- Primary success metric for this $100 test: cost per Mac download click, not purchase ROAS.
