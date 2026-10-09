# Zush Mac Search Campaign

## Scope

- Campaign: `Zush Mac Search 2026Q4`
- Google Ads account: `471-469-2966`
- Status: paused planning context only; do not inspect or operate Google Ads until explicitly re-enabled
- Planned budget: `700 THB/day` live test cap
- Planned duration: monitor daily until traffic and cost quality are clear
- Primary landing pages: `/mac`, `/batch-rename-files`, `/rename-screenshots-with-ai`, `/rename-photos-with-ai`, `/rename-pdf-with-ai`, and `/blog/best-ai-file-renamer-tools-mac-compared`
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
- Final URLs: keyword-specific landing pages from `google-search-keywords.csv`; UTM values come from each row's `utm_content` plus the shared tracking suffix in `scripts/update_zush_mac_search_campaign.py` if Ads work is explicitly re-enabled later
- Source of truth: the CSV files below. The update script reads them directly; do not duplicate keywords, negatives, RSA copy, or assets in Python.
- Price policy: dormant ad copy intentionally avoids numeric prices. Re-check the live promotion and base prices before any future launch.
- Safety gate: the update script exits unless `ZUSH_GOOGLE_ADS_EXPLICITLY_ENABLED=1` is set after the user explicitly re-enables Ads work.

## Files

- `google-search-keywords.csv`: ad groups, keywords, match types, URLs
- `google-search-negative-keywords.csv`: campaign-level negative keywords
- `google-search-ad-group-negative-keywords.csv`: competitor negatives scoped to the core ad group, not the comparison ad group
- `google-search-rsa-assets.csv`: responsive search ad copy
- `google-search-extensions.csv`: sitelinks and callouts

## Archived Google Ads Setup Snapshot

- Current operating status: Ads are not launched for this feedback loop and should be ignored until explicitly re-enabled.
- The notes below are an archived setup snapshot, not current operating instructions.
- Account and billing: previously configured.
- Campaign: previously rebuilt for testing.
- Campaign ID: `23816664121`.
- Planned daily budget: `700 THB`.
- Historical bidding note: manual CPC. Active ad groups and keyword-level bids were capped at `50 THB` after the first click cost `139.49 THB` on `[file renamer]`.
- Networks: Google Search only; Search partners cannot be enabled for this account (`CANNOT_TARGET_PARTNER_SEARCH_NETWORK`), and Display expansion remains disabled.
- Location option: presence only.
- Devices: desktop bid modifier `1.0`; mobile/tablet bid modifiers `0.1`.
- Ad groups:
  - `Core AI File Renamer`
  - `Screenshots Images Mac`
  - `PDF Docs Downloads Mac`
  - `Alternatives Competitors`
- Legacy mixed ad group and legacy stale RSA removed from serving.
- Historical RSA and assets used Zush 3.0-era pricing and positioning. Treat those price claims as stale; the current CSV copy omits numeric prices until a pre-launch live-site check.
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

## Remaining Steps If Ads Are Re-Enabled

1. Re-confirm that the user wants Google Ads inspection and operations re-enabled.
2. Re-check campaign, RSA, keyword, tracking, and conversion status only after that explicit re-enable.
3. Re-validate all product and price claims against the live site; add a current promotion only if it is still active.
4. Confirm `Mac download click` still fires from the live `/mac` page and from paid landing pages.
5. Monitor spend daily; stop or tighten the test if click quality is poor.

## Organic Feedback Backlog

Do not activate these from one weekly sample. Promote an item into the CSV only after the intent repeats across at least two finalized GSC weeks and the matching landing page has a clear download path.

- Mac campaign candidates: `ai file sorter mac`, `file renaming tools`, `automatic file renamer mac`, and media-specific rename intent.
- Separate Windows campaign candidates: `best ai file organizer windows`, `rename screenshots automatically windows`, and `sort files into folders with ai windows`. Do not mix these into the Mac campaign.
- Keep competitor navigation out of the core ad group; test it only in `Alternatives Competitors` with its own spend cap.
- Keep deletion, cleanup, compression, photo-storage, model-management, scripting, and piracy intent negative unless product behavior changes.

## Optimization Rules

- After day 1: review search terms that spent without a Mac download click; pause or lower broad/generic terms before raising CPC caps again.
- After day 3: pause search terms that are clearly outside the product and spent without a download. Do not blanket-negative supported media intent such as music, movies, TV, or subtitles.
- After day 7: move any converting phrase-match search terms into exact match.
- Keep the competitors/alternatives ad group capped at 10% of spend unless it produces download clicks cheaper than the core group.
- Primary success metric for this $100 test: cost per Mac download click.
- Secondary success metric: purchase conversion rate from paid traffic, if purchase tracking records enough events.
