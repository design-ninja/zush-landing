# Plan: German blog translations (SEO experiment, waves 1–2)

> **Status (2026-07-28):** completed and merged into `main` with six German posts plus `/de/batch-rename-files`. Planned item 6, `organize-photos-by-date-mac`, was omitted because its English source had already been retired behind a permanent redirect to `best-ways-to-organize-photos-on-mac`; restoring it would recreate cannibalization and leave an invalid translation pair. The owner explicitly authorized the final push.

**Executor:** Opus 5 agent, working in `/Users/lirik/Projects/zush/zush-landing` (Astro 5 static site for zushapp.com).
**Do not deploy.** Deliver a working local build on a feature branch; the human deploys and requests indexing.

## 1. Context — why this exists (read before coding)

zushapp.com has 11 UI locales, but only the homepage, feature landings, `/mac`, `/windows` are localized. GSC data (May–Jul 2026) shows **83% of all impressions come from the English blog** (53,826 of ~64,600); all 11 locales combined earn 105 impressions. German users are shown the *English* blog posts (e.g. `batch-rename-files-on-mac-complete-guide` gets impressions from Germany at position ~16). Queries like "dateien umbenennen mac" are informational — the SERP is won by guide articles, not product landings. The site has zero German articles.

**Hypothesis to test:** properly localized German versions of the top guide posts can earn German-language impressions within 6–8 weeks. This plan originally targeted **7 posts** (two waves) plus one search landing; the execution note above records why six posts were ultimately published. The work builds the minimal infrastructure for localized blog posts (extensible to other locales later, but implemented for German only).

## 2. Current architecture facts (verified 2026-07-28)

- Blog content: `src/content/blog/*.mdx`, schema in `src/data/blogSchema.ts` (`blogCollectionSchema` — fields: title, description, date, slug, tags, tldr, platform, topic, featuredOrder, author, reviewer, reviewed, noindex, canonical). No locale field exists.
- Blog data access: `src/data/blog.ts` — `getAllPosts()`, `getBlogPostBySlug()`, `getRelatedPosts()`, `getAllTags()`, `isSitemapEligibleBlogPost()`. Everything that lists posts goes through these.
- Blog routes: `src/pages/blog/[slug].astro` (post page), `blog/index.astro`, `blog/archive/[...page].astro`, `blog/tags/…`, `blog/search-index.json.ts`.
- Locale routing: `src/pages/[locale]/index.astro` and `src/pages/[locale]/[...slug].astro` serve only routes in `LOCALIZED_ROUTES` (`src/i18n/config.ts`). Blog is not among them. Astro route priority: a more-specific file like `src/pages/[locale]/blog/[slug].astro` wins over `[locale]/[...slug].astro` — safe to add.
- hreflang: emitted by `src/layouts/BaseLayout.astro` only when the route is in `LOCALIZED_ROUTES` (`shouldEmitLocaleAlternates`, ~line 54). Canonical URLs have **no trailing slash** (`https://zushapp.com/de`, not `/de/`).
- Sitemap: `src/pages/sitemap.xml.ts` builds `blogEntries` from `getAllPosts()` (~line 333) and emits `xhtml:link` alternates via `getAlternatePaths()` for localized static routes. lastmod comes from git dates — do not disturb that machinery.
- UI chrome (nav/footer) is already fully localized via `getCopy(locale)` — a German post page gets German chrome for free by passing `locale="de"` to `BaseLayout`.

## 3. Scope

### Wave 1 — translate these 3 posts first (includes all infrastructure from §4)

Chosen by impressions + proven German demand on the English versions:

| # | English source (src/content/blog/) | EN impressions May–Jul | German slug (use exactly) | Primary German keywords |
|---|---|---|---|---|
| 1 | `batch-rename-files-on-mac-complete-guide.mdx` (499 lines) | 12,371 (19 from DE) | `dateien-stapelweise-umbenennen-mac` | dateien umbenennen mac; mehrere dateien gleichzeitig umbenennen mac; dateien stapelweise umbenennen; finder dateien umbenennen |
| 2 | `automate-file-organization-macos.mdx` (478 lines) | 7,860 (21 from DE) | `dateien-automatisch-organisieren-mac` | dateien automatisch sortieren mac; ordner automatisch aufräumen mac; hazel alternative deutsch; dateiverwaltung mac automatisieren |
| 3 | `best-ways-to-organize-photos-on-mac.mdx` (328 lines) | 3,045 (13 from DE) | `fotos-organisieren-mac` | fotos organisieren mac; fotos sortieren mac; fotos verwalten mac; fotomediathek aufräumen |

Validate keyword phrasing against how Apple's own German support pages and German mac blogs (macwelt.de, ifun.de) phrase these tasks — adjust H1/title wording to match real German usage, don't translate the English keyword literally.

### Wave 2 — translate these 4 posts after wave 1 builds green (separate commit)

Same infrastructure, same quality gate (§5). Priority order within the wave:

| # | English source (src/content/blog/) | EN impressions May–Jul | German slug (use exactly) | Primary German keywords |
|---|---|---|---|---|
| 4 | `best-ai-file-renamer-tools-windows-compared.mdx` | 10,271 (19 from DE; Germany is a big Windows market) | `beste-ki-tools-dateien-umbenennen-windows` | dateien umbenennen windows; dateien automatisch umbenennen windows; ki datei umbenennen; mehrere dateien umbenennen windows |
| 5 | `finder-tags-guide-organize-files-mac.mdx` | 1,719 | `finder-tags-dateien-organisieren-mac` | finder tags mac; dateien mit tags organisieren mac; finder tags verwenden |
| 6 | `organize-photos-by-date-mac.mdx` | 956 | `fotos-nach-datum-sortieren-mac` | fotos nach datum sortieren mac; fotos nach aufnahmedatum sortieren; bilder nach datum ordnen mac |
| 7 | `how-to-organize-downloads-folder-mac.mdx` | 11 (weakest candidate — do it last; if time or budget presses, it is the one to drop) | `downloads-ordner-aufraeumen-mac` | downloads ordner aufräumen mac; downloads automatisch sortieren mac; downloads ordner organisieren |

Post 4 is a comparison listicle naming competitors (renamer.ai, AI Renamer, Riffo etc.) — keep every factual claim about competitors exactly as the English source has it; translate the prose, never embellish competitor descriptions.

With 7 German posts live, wire the German related-posts/cross-links so each German post links to 2–3 other German posts where topically sensible (mac posts to mac posts; the Windows listicle links to `/de/windows` and the German batch-rename landing instead).

### Wave 2b — localize the `/batch-rename-files` search landing for German only

Currently English-only: `src/pages/batch-rename-files.astro` renders `FeatureLandingPageShell` with copy from `SEARCH_LANDING_PAGES['batch-rename-files']` (`src/data/searchLandingPages.ts`); the route is in `SEARCH_LANDING_ROUTES` (`src/seo/config.ts`), not in `INDEXABLE_LOCALIZED_ROUTES`.

Target URL: `/de/batch-rename-files`. Mechanism — do NOT simply append the route to `INDEXABLE_LOCALIZED_ROUTES`, that would generate it for all 11 locales and demand copy in each. Instead:
- Add a per-route locale allowlist to `src/i18n/config.ts`, e.g. `ROUTE_LOCALES: Partial<Record<LocalizedRoute, readonly Locale[]>> = { '/batch-rename-files': ['en', 'de'] }`, consulted inside `getLocalesForRoute()` alongside the existing `LIMITED_LOCALE_ROUTES` check (that map limits by locale; this one limits by route — both filters apply).
- Then add `/batch-rename-files` to `INDEXABLE_LOCALIZED_ROUTES` and add a render branch for it in `src/pages/[locale]/[...slug].astro`, reusing `FeatureLandingPageShell` with `SEARCH_LANDING_PAGES['batch-rename-files']` as the base and a German copy override (put the German copy wherever the existing localized feature-page copy lives — `copy.featurePages` in `src/i18n/copy.ts` is the pattern to mirror).
- hreflang and sitemap alternates then come free from the existing localized-route machinery (`BaseLayout` + `getAlternatePaths`) — verify the emitted cluster is en+de only, not all locales.
- German keywords: dateien stapelweise umbenennen tool; mehrere dateien gleichzeitig umbenennen programm; batch rename mac deutsch.
- Cannibalization guard: post 1 (`dateien-stapelweise-umbenennen-mac`) and this landing target adjacent queries — mirror the English intent split exactly (blog post = tutorial for how-to queries, landing = product page for tool queries), and keep the post→landing internal link ("wenn du direkt das Tool willst") just like the English pair does.

## 4. Infrastructure changes

Keep diffs minimal and German-specific behavior data-driven (so adding `fr` later is a frontmatter change, not a code change).

### 4.1 Schema (`src/data/blogSchema.ts`)
Add two optional fields to `blogCollectionSchema`:
- `locale: z.enum(['en', 'de']).default('en')`
- `translationOf: z.string().optional()` — the **English slug** this post translates. Required in practice for any non-`en` post; add a build-time assertion (throw in `src/data/blog.ts` when loading) that every non-en post has a `translationOf` pointing to an existing en slug, and that (locale, translationOf) pairs are unique.

### 4.2 Data layer (`src/data/blog.ts`)
- `getAllPosts()` and every listing path (index, archive, tags, related, search-index, sitemap tag pages) must return **English posts only** — German posts must not leak into English listings. Safest: filter `locale === 'en'` inside `getSortedEntries()` and add a separate `getLocalizedPosts(locale)` + `getTranslationsBySlug(enSlug)` for the new pages. Audit every call site of `getCollection('blog')` to be sure (there is at least one direct call in `getBlogPostBySlug`).
- `getRelatedPosts` for a German post: return the German translations of related posts if they exist, otherwise skip (do not link German readers to English posts from the "related" block; with 7 German posts there is enough to cross-link within the locale).

### 4.3 New route `src/pages/[locale]/blog/[slug].astro`
- `getStaticPaths()` from non-en posts: `params: { locale: post.locale, slug: post.slug }`.
- Render with the same components as `blog/[slug].astro` (extract shared markup if the duplication is large; a shared `BlogPostLayout.astro` component both routes use is the right shape — do not fork 300 lines of template).
- Pass `locale="de"` to `BaseLayout` (German chrome), `chromeBasePath="/de"`.
- SEO: canonical `/de/blog/<german-slug>`, `og:locale` de_DE (comes from locale meta), JSON-LD `BlogPosting` with `inLanguage: 'de'` and the German headline/description. Reuse `buildBlogPostingJsonLd` — extend it with an optional `inLanguage` param defaulting to `'en'` rather than duplicating it.
- Breadcrumbs: point to `/de` home (there is no `/de/blog` index in wave 1 — do not create one; 3 posts don't justify an index page, and a thin index hurts more than helps).

### 4.4 hreflang between translation pairs
`BaseLayout.astro` currently only emits alternates for `LOCALIZED_ROUTES`. Add an optional prop `alternates?: { hreflang: string; href: string }[]`; when provided, emit those `<link rel="alternate">` tags (plus `x-default` pointing at the English URL) instead of the localized-route logic. Then:
- English post page (`blog/[slug].astro`): if the post has translations, pass alternates `[en → /blog/<en-slug>, de → /de/blog/<de-slug>]`.
- German post page: pass the same cluster. Both sides must emit identical clusters including self-reference — one-sided hreflang is ignored by Google.
- Do not emit alternates on EN posts that have no translations (zero diff for the other ~45 posts).

### 4.5 Sitemap (`src/pages/sitemap.xml.ts`)
- Add German posts as entries (`/de/blog/<slug>`, lastmod from git like other blog entries).
- For both sides of a translation pair, emit `xhtml:link` alternates (en, de, x-default=en) — mirror the exact format already used for localized static routes (~lines 379–388).

### 4.6 Visible cross-link (crawl path + UX)
German posts must not be sitemap-orphans. Two cheap links:
- On an EN post that has a German version: a small "Auch auf Deutsch verfügbar: …" link near the top (unobtrusive, below the header area).
- On the DE post: "Read in English" equivalent.
This gives Google a real crawl path and users an escape hatch.

### 4.7 Explicitly out of scope
- No `/de/blog` index, no German tags/archive/search.
- No changes to `LOCALIZED_ROUTES`, other locales, or the `LOCALIZATION_PAUSED` machinery.
- No RSS work.
- Do not touch `robots`, `llms.txt`, or redirect middleware.

## 5. Translation requirements (quality gate — this is where the experiment lives or dies)

The failure mode to avoid is "translated English". These must read like a competent German mac blogger wrote them.

1. **Address the reader as "du" (lowercase)** — Apple's German consumer voice; consistent throughout all 3 posts.
2. **Apple UI terminology must match the German macOS UI.** Verify against Apple's German support pages (support.apple.com/de-de): Finder context menu is "Umbenennen", the batch dialog options are "Text ersetzen", "Text hinzufügen", "Format"; "Name und Index"; Automator, Kurzbefehle (Shortcuts), Terminal, Spotlight, Finder-Tags (Apple's German UI says "Tags" — verify, do not use "Schlagwörter" for Finder tags), Fotos-App, Intelligente Ordner; for the Windows post: Datei-Explorer, Eingabeaufforderung/PowerShell, Microsoft Store. Never guess a UI string — check it. Fetch the German versions of the Apple support pages that the English posts already cite, and cite the German URLs.
3. **Titles/H1 built from the German keyword, not from the English title.** E.g. post 1 title shape: "Dateien am Mac stapelweise umbenennen: 4 Methoden im Vergleich (2026)". Meta description 120–155 chars, German, includes the primary keyword.
4. **Frontmatter of German posts:** `locale: "de"`, `translationOf: "<english-slug>"`, `slug` = German slug from the table, German `title`/`description`/`tldr`; keep `date` = original date, `platform`/`topic`/`tags` same as the English source (tags are EN-only taxonomy labels and German posts don't appear in tag listings — leave them as-is).
5. **Internal links:** if the target route is localized (`/`, `/mac`, `/windows`, `/rename-*-with-ai` — see `INDEXABLE_LOCALIZED_ROUTES` in `src/i18n/config.ts`, plus `/batch-rename-files` after wave 2b), link to the `/de/...` version. Otherwise link to the English page (e.g. `/docs/...`) — do not fabricate `/de/` URLs that don't build. Links between translated posts point to the German versions. Note the ordering wrinkle: wave-1/wave-2 posts reference `/batch-rename-files`, which only becomes `/de/batch-rename-files` in wave 2b — in the wave-1 and wave-2 commits link to the English `/batch-rename-files`, then update those links to `/de/batch-rename-files` as part of the wave-2b commit.
6. **Keep all MDX component usage** (`BlogCTA`, `BlogProductIntro`, imports) structurally identical; translate their visible props if any.
7. **Don't translate:** product name Zush, code blocks, terminal commands, file names in examples (but translate the surrounding prose; where an example filename is illustrative like `client-office-whiteboard.jpg`, use a German-flavored equivalent like `kunde-buero-whiteboard.jpg`).
8. **Prune English-SERP artifacts:** sections that exist only to answer an English "People also ask" phrasing should be re-anchored to the German equivalent question, not word-for-word translated. Keep overall structure and heading hierarchy otherwise.

## 6. Verification (all must pass before finishing)

1. `pnpm lint` and `pnpm check:astro` clean.
2. `pnpm build` succeeds (needs git history + paddle env; if paddle env check blocks a local build, use `pnpm build:sandbox`). Then verify in `dist/`:
   - `dist/de/blog/<each-german-slug>/index.html` exists for all 7 posts, plus `dist/de/batch-rename-files/index.html`; each contains `<html lang="de"`... check how BaseLayout sets lang; canonical without trailing slash; hreflang cluster (en + de + x-default) present and symmetric with the English counterpart's HTML.
   - English blog index, tags pages, archive, and `blog/search-index.json` contain **no** German slugs.
   - `dist/sitemap.xml` has all 8 German URLs with alternates on both sides of each pair.
   - `/batch-rename-files` cluster is en+de only — no `/fr/batch-rename-files` etc. leaked into dist, sitemap, or hreflang.
3. `pnpm check:html` (smoke) and the seo check scripts still pass: `pnpm check:seo-middleware`, `pnpm check:seo-redirects`.
4. Spot-read each German post top-to-bottom once, as a language pass separate from the translation pass. Flag any sentence that is grammatical-but-unnatural German.
5. Commits on a branch `feat/de-blog-translations`: commit 1 = infrastructure + wave 1 (must build green standalone), commit 2 = wave 2 posts, commit 3 = wave 2b landing. Do not push, do not deploy. PR description: what changed and the post-deploy checklist from §7.

## 7. Post-deploy checklist (for the human — include in PR description, do not execute)

- Deploy, then in GSC UI manually "Request indexing" for all 8 German URLs (7 posts + `/de/batch-rename-files`) and re-submit sitemap.xml.
- Success metric: German-language queries appearing in GSC for `/de/blog/*` within 6–8 weeks (impressions, any position). Zero impressions by ~2026-09-25 = hypothesis rejected → decision point on deleting locales entirely.
