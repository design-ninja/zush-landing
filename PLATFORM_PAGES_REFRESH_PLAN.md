# /mac & /windows Copy Refresh — Implementation Brief

> **Implementation status (2026-07-12):** All 6 tasks executed, `astro check` 0 errors, verified on dev server. Two caveats: (1) **Task 2 partially inert** — `Features.astro` renders only 7 of the 9 `featureCards` keys; `customPatterns` and `batchRename` are NOT rendered (another dead-copy trap, now flagged with a code comment). The valuable Task 2 change — Custom AI Blocks in the **`customPrompts`** card — did render on both platforms; the `customPatterns` "Templates & 145+ Naming Blocks" retitle is inert but harmless (Templates/Naming Blocks still surface via JSON-LD featureList and the new MacSeoSection). (2) No full-page screenshot of MacSeoSection — the Browser pane hung on interaction (environment issue); section verified structurally via curl (all 6 cards, Hazel comparison, table, links present) + `/de/mac` confirmed unchanged.

Prepared 2026-07-12. Self-contained instructions for refreshing the copy on `/mac` and `/windows` so it aligns with the SEO work shipped the same day (site-wide meta keywords + six new landing pages), closes content gaps, and removes stale blocks. English copy only — do not touch localized overrides. **Do not invent product features**: verify every claim against `src/content/docs/docs/` (especially `custom-ai-blocks.mdx`, `naming-blocks.mdx`, `templates.mdx`, `folder-monitoring.mdx`, `supported-file-types.mdx`) before writing.

## Context

Same-day shipped work this brief builds on (see `SEO_CONTENT_PAGES_PLAN.md` for details):
- Six new pages: `/hazel-alternative`, `/powerrename-alternative`, `/rename-invoices-with-ai`, `/rename-receipts-with-ai`, `/rename-excel-files-with-ai`, `/rename-word-documents-with-ai`.
- Site-wide `meta keywords` (`SeoMeta.keywords` + `DEFAULT_KEYWORDS` in `src/seo/config.ts`); `/mac` and `/windows` pass their own `platformKeywords` lists — **already updated, don't redo**.
- Intent-section links on `/mac` → `/hazel-alternative` and `/windows` → `/powerrename-alternative` — **already added, don't redo**.

GSC (28d, pulled 2026-07-12): `automatic file organizer mac` pos 10.0, `hazel file organizer` pos 9.1 — both currently rank via a *blog post*, not `/mac`. `ai file renamer windows` pos ~9.4 (2026-07-03 snapshot). Head terms `ai file renamer` / `ai renamer` pos 11–13. The platform pages should reinforce these queries.

Chosen accents (from the keyword work): **rename files by content** · **offline / local / private AI** · **organizer/sorter cluster** (organize files with AI, AI file sorter, sort files into folders) · **Custom AI Blocks** (flagship, tour-prioritized, free-tier — see commits `3db679a0`, `0487ca92`) · **invoices/receipts vertical** · **Hazel / PowerRename alternatives** · **Templates + 145+ Naming Blocks** · **EXIF/metadata**.

## Copy architecture — where each rendered block lives

This is the critical map; the sources are non-obvious:

| Rendered block | Source file | Notes |
|---|---|---|
| Hero title/subtitle, CTA title/subtitle, FAQ items, JSON-LD featureList | `src/i18n/copy.ts` → `platforms:` block at **line ~1195** (EN base) | Editing EN base is safe: 8 locales override via `localizedPlatforms` (merged at line ~1408). Do not add new *required* fields to the `PlatformCopy` type. |
| 9 feature cards + use-case grid | `src/data/platformLandingSections.ts` → `EN_PLATFORM_OVERRIDES` (lines 22–215) | Card keys are fixed (`aiAnalysis`, `foldersMonitoring`, `batchRename`, `customPatterns`, `smartMetadata`, `renameHistory`, `customPrompts`, `byok`, `offlineAi`) — retitle/rewrite within existing keys, don't add keys. |
| Intent section (H2 + bullets + links) | `src/components/PlatformLandingPage/PlatformLandingPage.astro` lines ~130–175 | Links already updated 2026-07-12. |
| Windows-only SEO section | `src/components/WindowsSeoSection/WindowsSeoSection.astro` | 6 cards + RenameClick comparison prose + doc links. |
| Quickstart / scenarios / install / trust | `src/data/platformSpecifics.ts` | Rendered via `PlatformSpecifics` (compact, 4 scenarios). |
| meta keywords for the page | `PlatformLandingPage.astro` `platformKeywords` (lines ~77–130) | Already refreshed — leave unless a task below says otherwise. |
| JSON-LD (SoftwareApplication/HowTo/FAQ/Breadcrumb/Video) | `PlatformLandingPage.astro` lines ~196–307 | `featureList` comes from `copy.ts` `features` array. |

**⚠️ Dead copy discovered during audit:** `src/data/platformLanding.ts` (`PLATFORM_LANDING_CONTENT`) contains `heroTitle`, `heroSubtitle`, `ctaSubtitle`, `features` (9 items), and `faqs` (10 items per platform) that are **rendered nowhere** — the component only reads `path`, `operatingSystem`, `downloadUrl`, `installUrl`. The real copy is in `copy.ts`. See Task 6.

---

## Task 1 — `copy.ts` EN base: hero, features, FAQ (both platforms)

File: `src/i18n/copy.ts`, `platforms:` block at line ~1195.

**Mac hero subtitle** (currently "Turn messy Finder folders into descriptive, searchable filenames. Rename 100+ formats by content, review every suggestion, undo any batch, or use local Ollama models in Offline AI mode.") — rewrite to also carry the *organizer* accent and Custom AI Blocks, e.g.:

> "Turn messy Finder folders into descriptive, searchable filenames. Rename and organize 100+ formats by content, build your own naming fields with Custom AI Blocks, review every suggestion, undo any batch — or go fully private with local Ollama models."

Keep ≤ 2 sentences of this density; adjust freely but the words *organize*, *by content*, *Custom AI Blocks*, and the local/private angle must survive.

**Windows hero subtitle** — same treatment (currently ends "...with preview, undo, BYOK, and Offline AI."). Weave in *organize* and Custom AI Blocks; keep "Windows 10 and 11" and "File Explorer".

**`features` arrays (feed JSON-LD `featureList`)** — both platforms: add one entry after the Naming Blocks line:
- `'Custom AI Blocks: describe any field — vendor, case number, brand — and reuse it in templates'`

**Mac FAQ** (7 items now) — add these, keeping the existing voice (short, factual, self-contained answers — they get quoted verbatim by AI assistants):
1. *"Is Zush a Hazel alternative?"* — honest answer: Hazel = rule engine (location/metadata conditions, moving, scripts), Zush = content-aware naming + folder monitoring, works on Windows too, many use both. End with: "See the full comparison at /hazel-alternative." (The FAQ renders as text; put the path in the answer copy as a plain reference or check whether `FAQ` component supports links — if not, plain text mention is fine, the intent-section link carries the crawl path.)
2. *"Can Zush organize files on Mac?"* — mirror the existing Windows FAQ: naming layer, not moving files; folder monitoring for Downloads/Screenshots; searchable via Finder and Spotlight. Work the phrase "automatic file organizer for Mac" naturally into the answer (query at pos 10).
3. *"Can Zush rename invoices and receipts?"* — yes: vendor/date/invoice-number blocks, Custom AI Block for amount or category, scanned documents via AI vision. Mention the dedicated invoice and receipt workflows exist.
4. *"What are Custom AI Blocks?"* — one-paragraph definition from `docs/custom-ai-blocks.mdx` (describe a field in plain language → reusable naming block; included in the free version).

**Windows FAQ** — add:
1. *"Is Zush a PowerRename alternative?"* — PowerRename = regex find-and-replace on existing names; Zush reads content and generates names; both free to start; reference /powerrename-alternative.
2. *"What are Custom AI Blocks?"* — same as Mac.

Do not delete existing FAQ items — the RenameClick, Apple Silicon, notarization, and offline answers are ranking assets. Cap total at ~10 per platform.

## Task 2 — Feature cards (`platformLandingSections.ts`)

`EN_PLATFORM_OVERRIDES`, lines 22–215. Edits within existing keys only:

**Both platforms, `customPrompts` card** — currently "Rules for Finder workflows" / "Rules for Windows folders". Rewrite description to name the actual features: custom prompts *and Custom AI Blocks* ("create your own naming fields — client, case number, brand — and reuse them in any template").

**Mac `customPatterns` card** — currently "macOS naming patterns". Retitle to "Templates and 145+ Naming Blocks"; description: combine AI titles with dates, categories, clients, counters; mention EXIF/metadata fields for photos (verify exact phrasing against `naming-blocks.mdx`).

**Windows `customPatterns` card** — currently titled **"RenameClick alternative for Windows"** — a comparison masquerading as a feature card, and it's stale now that comparison content lives in WindowsSeoSection + dedicated pages. Retitle to "Templates and 145+ Naming Blocks" (same treatment as Mac). The RenameClick angle stays in WindowsSeoSection (Task 3) and the FAQ.

**Mac `featuresDescription`** (line ~25) — append the organizer angle: "...batch rename, local models, and automatic file organization for Downloads and Screenshots."

**Mac use case "Freelancers"** (line ~97) — mention naming invoices by vendor and date (ties to the new vertical; keep one sentence).

## Task 3 — WindowsSeoSection: add PowerRename, refresh links

`src/components/WindowsSeoSection/WindowsSeoSection.astro`:

1. The comparison prose block (`<h3>When Zush is a RenameClick alternative for Windows</h3>`, line ~98) — add a sibling paragraph or second `<h3>` block: "When Zush replaces PowerRename" — 2–3 sentences (regex vs content), linking to `/powerrename-alternative`.
2. Card grid: the "RenameClick alternative for Windows" card (line ~61) — keep, but check its body links to `/blog/zush-vs-renameclick` or add link if plain text.
3. Quick links row (lines 16–19) — add: `{ href: '/powerrename-alternative', label: 'PowerRename alternative' }` and `{ href: '/rename-invoices-with-ai', label: 'Rename invoices with AI' }`.

## Task 4 — NEW: Mac SEO section (the biggest gap)

`/windows` has a dedicated SEO section; `/mac` has nothing equivalent, while the two best striking-distance queries are Mac-side (`automatic file organizer mac` pos 10, `hazel file organizer` pos 9.1) and currently rank via a blog post. Create `src/components/MacSeoSection/MacSeoSection.astro` **cloning the structure, styles, and tone of `WindowsSeoSection.astro`** (copy the `.module.scss` pattern too), and render it in `PlatformLandingPage.astro` next to the existing `{platform === 'windows' && ...}` line as `{platform === 'mac' && locale === DEFAULT_LOCALE && <MacSeoSection />}`.

Content (6 cards + one comparison prose block + quick links):
- H2: "Automatic file organizer for Mac" (exact-phrase target).
- Cards: Batch rename from Finder · Automatic Downloads & Screenshots cleanup (folder monitoring) · Searchable names for Finder and Spotlight · Templates, Naming Blocks & Custom AI Blocks · Offline AI with Ollama · Invoices, receipts, and scans (link `/rename-invoices-with-ai`).
- Prose block: `<h3>When Zush is a Hazel alternative for Mac</h3>` — 3–4 honest sentences (rules vs content, Zush renames in place / doesn't move files or run scripts, works on Windows too), link `/hazel-alternative`.
- Quick links: `/docs/folder-monitoring`, `/docs/naming-blocks`, `/docs/custom-ai-blocks`, `/hazel-alternative`, `/ai-file-organizer`.

All claims must match the docs — especially "renames in place, does not move files between folders" (this exact honesty already ships on `/ai-file-organizer`).

## Task 5 — Keywords touch-up (small)

`PlatformLandingPage.astro` `platformKeywords`: add to the **mac** list only: `'hazel alternative'`, `'automatic file organizer for mac'`, `'custom AI naming blocks'`. Windows list already has PowerRename/BRU/RenameClick — no change. (These lists also feed JSON-LD `alternateName`/`keywords` — that's fine.)

## Task 6 — Remove the dead copy in `platformLanding.ts`

`PLATFORM_LANDING_CONTENT` fields `heroTitle`, `heroSubtitle`, `ctaSubtitle`, `features`, `faqs`, `breadcrumbLabel`, `softwareName`, `softwareDescription` are unused (component reads only `os`/`path`/`operatingSystem`/`downloadUrl`/`installUrl`). Delete the unused fields and slim the `PlatformLandingContent` interface accordingly. **First** `grep -rn "PLATFORM_LANDING_CONTENT"` to confirm nothing else imports those fields (as of 2026-07-12 only `PlatformLandingPage.astro` imports it). This prevents the next copy edit from landing in the dead file by mistake — which is exactly the trap this audit found.

## Constraints & verification

- **English only.** Non-EN locales override the EN base; new FAQ items will appear on EN pages only if `getPlatformFaqCopy` uses per-locale lists — verify `/de/mac` renders unchanged after your edits.
- Hero `titleHighlight` is `platformLabel` ("Mac"/"Windows") — if you touch `heroTitle`, the word Mac/Windows must remain in it verbatim.
- Voice: short factual sentences; always pair power claims with "preview before applying" and "undo history"; never fabricate counts or benchmarks. GEO note: FAQ answers and the definition-style paragraphs are what AI assistants quote — make each answer self-contained (name the product and platform in the first sentence).
- Verify: `npx astro check` (0 errors); dev server on port 4321 (a user-run instance is usually already up — reuse it, don't kill it); curl `/mac`, `/windows`, `/de/mac`: H1 intact, new FAQ present, JSON-LD parses (paste `@graph` into validator.schema.org), no missing-key rendering artifacts; screenshot both pages incl. the new MacSeoSection.
- Out of scope: strengthening tasks #1/#3/#4 from `SEO_CONTENT_PAGES_PLAN.md`, localization of the new copy, any changes to the six new landing pages.

Suggested order: Task 6 (clear the trap) → 1 → 2 → 3 → 4 → 5 → verify.
