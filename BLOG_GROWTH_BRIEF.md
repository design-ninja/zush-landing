# Blog SEO & Conversion Improvement — Implementation Brief

You are working in `zush-landing` — the marketing site for Zush (an AI file renamer app for Mac and Windows), https://zushapp.com. Your job is to implement a set of blog improvements whose goal is: **more clicks from Google and more app downloads from blog visitors**. All research is already done; the findings and exact tasks are below. Do not re-run any SEO analysis — implement.

## 1. Background: what the data says (GSC, 28 days, 2026-06-20..07-17)

| Segment | Impressions | Clicks | CTR | Avg position |
|---|---|---|---|---|
| Blog (`/blog/*`) | 25,585 | 138 | 0.54% | 9.2 |
| Homepage `/` | 1,990 | 238 | 11.96% | 3.6 (branded queries) |
| Feature landings (`/rename-*`, etc.) | 1,499 | 28 | 1.87% | 9.0 |

Key facts driving the task list:

- Blog CTR is low mostly because **positions are 8–12** (bottom of page 1 / page 2), not because titles are bad. Titles/descriptions of top posts were reviewed and are fine — **do not rewrite meta titles/descriptions**.
- Biggest single opportunity: `/blog/best-ways-to-organize-photos-on-mac` gets **1,028 impressions/28d for "how to organize photos on mac" at position 11.1 with 0 clicks**. Lifting it to top 5 is worth ~40–80 clicks/mo.
- Comparison posts (`best-ai-file-renamer-tools-*-compared`, `zush-vs-*`) have the best CTR (0.7–2.6%) and commercial intent — they are the money pages.
- `/blog/rename-files-with-ollama-mac` ranks for "ollama rename model" (~200 imp/28d) — wrong intent (people want to rename an Ollama *model*, not files).
- Conversion gap on posts: the only download button is the footer CTA at ~88% scroll depth. The `BlogCTA` component supports `placement='inline'` but **zero of 53 posts use it**. Only 8 of 53 posts customize the `BlogProductIntro` box; the other 45 show a generic pitch.
- The homepage links to the blog only via a footer `/blog` link — no authority flows to individual posts.

## 2. Codebase facts you need (verified 2026-07-19)

- Stack: **Astro static output**, Vercel adapter, **pnpm**. `trailingSlash: 'never'` — never add trailing slashes to internal links.
- Blog posts: `src/content/blog/*.mdx`. URL slug comes from the `slug:` frontmatter field (usually equals filename). Template: `src/pages/blog/[slug].astro`.
- Blog is **English-only** and NOT localized. Do not add blog routes to `LOCALIZED_ROUTES` in `src/i18n/config.ts`. The homepage IS localized (11 locales) — any new homepage section must handle the `locale` prop (see Task 4).
- Frontmatter fields per post: `title`, `description`, `date`, `slug`, `platform` (`mac` | `windows` | `general`), `topic`, `tags`, `tldr`, `reviewed` (ISO date shown as "Reviewed <date>" — **bump it whenever you meaningfully edit a post's body**), optional `featuredOrder`.
- FAQ rich results: `src/data/blog.ts` auto-extracts a `## FAQ` (or `## Frequently Asked Questions`) H2 section where each `### Question` + following paragraphs becomes FAQPage JSON-LD. To add FAQ schema to a post, just write that markdown structure — no frontmatter needed.
- `src/components/blog/BlogCTA.astro` — download banner. Props: `placement` (`'early' | 'inline' | 'footer'`, changes headline copy), `platform` (`'mac' | 'windows' | 'general'`). The `general` variant is OS-detected at runtime by the script in `[slug].astro` (it binds every `[data-blog-cta-platform="general"]` node, so multiple instances per page are fine). The post template already renders `<BlogCTA placement='footer' platform={post.platform} />` after the content — leave that.
- `src/components/blog/BlogProductIntro.astro` — "New to Zush?" box near the top of every post. Props: `title`, `description`, `links: {href, label}[]`. Defaults are generic.
- `src/utils/download.ts` defines the `DownloadSource` union (`'blog-cta'`, `'floating-cta'`, …). If you introduce a new source string you MUST add it to that union.
- Floating download button already works on blog pages (appears after 60px scroll) — don't touch it.
- Homepage composition: `src/pages/index.astro` → `src/components/HomePage/HomePageContent.astro`. Precedent for an English-only section: `{locale === 'en' && <EvidenceSignals />}`.
- `src/components/blog/BlogPostCard.astro` — existing card used for related posts; reuse it for Task 4. Post data access: `getAllPosts()` / `getBlogPostBySlug()` from `src/data/blog.ts`.
- Product demo assets you may reuse: static screenshots `public/images/showcase/macos/*-light.webp` (existing posts embed the `-light` variants only — follow that precedent), videos `public/videos/hero/*.mp4` with posters in `public/videos/posters/` (theme-aware pairs, see `src/data/showcaseMedia.ts`).
- Feature landing URLs available for internal links: `/` (AI file renamer), `/mac`, `/windows`, `/batch-rename-files`, `/ai-file-organizer`, `/offline-ai-file-renamer`, `/hazel-alternative`, `/powerrename-alternative`, `/rename-photos-with-ai`, `/rename-pdf-with-ai`, `/rename-screenshots-with-ai`, `/rename-documents-with-ai`, `/rename-invoices-with-ai`, `/rename-receipts-with-ai`, `/rename-videos-with-ai`, `/rename-audio-with-ai`, `/rename-design-files-with-ai`, `/rename-excel-files-with-ai`, `/rename-word-documents-with-ai`, plus `/docs/*`.

### Hard constraints

1. Do NOT change any post's `slug`, URL, canonical, or `title`/`description` frontmatter (except where a task explicitly says otherwise).
2. Do NOT touch `sitemap.xml.ts`, `robots.txt.ts`, hreflang logic, or `vercel.json` redirects.
3. Do NOT add more than ONE inline `BlogCTA` per post (the footer one from the template stays; the top box is `BlogProductIntro`, not a CTA).
4. Keep all copy in English, matching the existing voice: direct, concrete, no hype ("Zush renames screenshots, PDFs, photos… by content"), file-type examples like `IMG_4382.HEIC`, `scan_0042.pdf`.
5. Match existing code style (SCSS modules, component patterns, conventional commits like `feat(blog): …`).

## 3. Tasks (in execution order)

### Task 1 — Per-placement download tracking (do first; 15 min)

In `src/components/blog/BlogCTA.astro`, the download link hardcodes `data-download-source='blog-cta'`. Change it to `blog-cta-${placement}` (i.e. `blog-cta-early` / `blog-cta-inline` / `blog-cta-footer`) in BOTH branches (general and platform-specific), and add those three values to the `DownloadSource` union in `src/utils/download.ts` (keep the old `'blog-cta'` member for safety). This makes the effect of Task 2 measurable in analytics.

### Task 2 — Inline CTA in the top posts

For each post listed below: add `import BlogCTA from '@/components/blog/BlogCTA.astro';` after the existing imports at the top of the MDX body, and insert `<BlogCTA placement='inline' platform='<post platform>' />` at the described spot. Use the post's own `platform` frontmatter value.

Placement rule: insert **immediately after the H2 section where the reader's core problem gets its answer** — roughly 40–60% of the way through the article, never inside a table/list, never directly adjacent to another `<aside>`/box, always after a closing paragraph.

| Post (`src/content/blog/…`) | Insert after the section about… |
|---|---|
| `batch-rename-files-on-mac-complete-guide.mdx` | the AI renaming method (the section following Finder/Automator/Terminal methods) |
| `automate-file-organization-macos.mdx` | the section on content-aware naming / where Zush enters the workflow |
| `best-ai-file-renamer-tools-windows-compared.mdx` | the Zush entry (#1 in the comparison) |
| `best-ai-file-renamer-tools-mac-compared.mdx` | the Zush entry (#1 in the comparison) |
| `best-ways-to-organize-photos-on-mac.mdx` | the step about renaming images / descriptive filenames |
| `rename-files-with-ollama-mac.mdx` | the section where Zush is presented as the GUI alternative to DIY Ollama scripts |
| `finder-tags-guide-organize-files-mac.mdx` | the section where tags meet their limits / AI naming is introduced |
| `zush-vs-renameclick.mdx` | the verdict/summary section |
| `zush-vs-namequick.mdx` | the verdict/summary section |
| `best-ai-file-renamer-tools-2026.mdx` | the Zush entry |
| `how-to-rename-images-with-ai-on-macos.mdx` | the main how-to walkthrough |
| `rename-screenshots-automatically-mac.mdx` | the main how-to walkthrough |

Read each post before inserting; if a post already ends its natural "answer" section within the last 25% of the article, place the CTA after the mid-article section that mentions Zush instead.

### Task 3 — Contextual `BlogProductIntro` for the remaining posts

45 of 53 posts render `<BlogProductIntro />` with defaults. Give each a contextual `title`, `description`, and `links`. Do the 12 posts from Task 2 first, then all remaining posts.

Formula (see `best-ways-to-organize-photos-on-mac.mdx` lines ~36–44 for the reference example):
- `title`: a problem-focused hook tied to THIS article's topic, ≤70 chars. Good: `"Need searchable names for a large photo library?"`. Bad: `"New to Zush?"`.
- `description`: 1–2 sentences naming the exact file types/scenario the article's reader has, and what Zush does about them (batch review, naming patterns, undo, folder monitoring — pick what's relevant).
- `links`: 3–5 items, most relevant feature landing first (from the list in §2), then `/mac` or `/windows` per the post's platform, then at most one `/docs/*` or related feature page. Keep labels ≤4 words.

### Task 4 — "From the blog" section on the homepage

Create `src/components/HomeBlogHighlights/HomeBlogHighlights.astro` (+ SCSS module) that renders a small section: an H2 like "Guides and comparisons" and 4 cards via the existing `BlogPostCard`, for exactly these slugs:

1. `best-ai-file-renamer-tools-mac-compared`
2. `best-ai-file-renamer-tools-windows-compared`
3. `batch-rename-files-on-mac-complete-guide`
4. `best-ways-to-organize-photos-on-mac`

Requirements:
- Fetch posts via `getAllPosts()` and filter by those slugs (fail the build loudly if a slug is missing — e.g. throw).
- Render in `HomePageContent.astro` gated to English only: `{locale === 'en' && <HomeBlogHighlights />}` — place it after `<HomeWorkflows …/>` and before `<DownloadCTA …/>`.
- Links must be plain crawlable `<a href="/blog/…">` (BlogPostCard already is) — this section's SEO purpose is passing homepage authority to the money posts.
- Visually follow the patterns of neighboring sections (heading styles from `@/components/Heading/Heading.module.scss`, section spacing like `HomeWorkflows`). Keep it compact; no new images.

### Task 5 — Photo-cluster push (target: "how to organize photos on mac" from pos 11 → top 5)

Target article: `src/content/blog/best-ways-to-organize-photos-on-mac.mdx` (the hub).

a. **Anchors into the hub.** These posts already link to it: `ai-image-tagging-vs-manual-photo-organization`, `ai-photo-renamer-guide`, `how-to-rename-images-with-ai-on-macos`, `digital-photo-organization-mistakes-to-avoid`, `automate-file-organization-macos`, `rename-files-with-ollama-mac`, `why-your-photos-are-named-img-and-how-to-fix-it`, `heic-raw-image-management-guide-macos`. Check each link's anchor text; ensure at least 4 of them use a descriptive anchor containing "organize photos on Mac" (e.g. "full guide to organizing photos on Mac") instead of generic anchors ("this guide", "read more"). Edit only anchor text, not surrounding claims.

b. **Link from the feature landing.** Add one contextual in-body link on the `/rename-photos-with-ai` page (find its template: `src/pages/rename-photos-with-ai.astro`, likely composed via `FeatureLandingPage` with data — put the link wherever that page keeps its SEO/FAQ copy) pointing to `/blog/best-ways-to-organize-photos-on-mac` with anchor "how to organize photos on Mac". Note this page is localized — if its copy lives in `src/i18n/*`, add the link for the English copy only if that's the established pattern; otherwise add it to whatever per-page copy structure exists. Do not break other locales' builds.

c. **Content upgrade of the hub.** Currently ~220 lines — thinner than what ranks top-5 for this query. Extend it (target roughly +40–60% more substance, no filler):
   - Add a comparison table early: Apple Photos vs Finder folders vs hybrid (criteria: iCloud sync, RAW/client work, dedup, search, backup control).
   - Ensure each of the 7 steps has a concrete worked example (folder tree snippets, filename before/after).
   - Add a `## FAQ` section (H2 + `### question` structure so JSON-LD is auto-generated, see §2) with 4–6 questions matching real adjacent queries: "How do I organize photos on Mac without using the Photos app?", "How do I organize thousands of photos automatically?", "Should I use Apple Photos or Finder folders?", "How do I find duplicate photos on Mac?" etc. Answers 2–4 sentences, first sentence is the direct answer.
   - Keep every existing H2 id/anchor intact (the TOC and possible SERP jump-links depend on heading slugs) — add new sections, don't rename existing headings.
   - Bump `reviewed` to today's date and update the "Reviewed …" note if present in the body.

### Task 6 — Ollama post: capture the mismatched intent

In `src/content/blog/rename-files-with-ollama-mac.mdx`, right after the intro/quick-answer block, add a short H2 section titled "Looking to rename an Ollama model instead?" with: a 2–3 sentence explanation that Ollama has no rename command, a fenced code block showing `ollama cp llama3 my-custom-name` then `ollama rm llama3`, and one bridging sentence ("If you're here to rename *files* using a local Ollama model, keep reading."). Bump `reviewed`.

### Task 7 — Demo media near the top of the money posts

For the 4 comparison posts (`best-ai-file-renamer-tools-mac-compared`, `best-ai-file-renamer-tools-windows-compared`, `best-ai-file-renamer-tools-2026`, `batch-rename-files-on-mac-complete-guide`): ensure a product visual appears within the first ~25% of the article (right after the first table or the `BlogProductIntro`). Where a post already has an early screenshot, skip it. Use existing assets only: markdown image embeds of `public/images/showcase/macos/batch-rename-light.webp` (or the `windows` showcase folder if it exists for Windows posts — check `public/images/showcase/`) with a descriptive alt like `Zush batch rename preview showing AI-generated names for a mixed folder`. Do NOT create new image files. (A theme-aware `<video>` component is explicitly out of scope for this pass.)

## 4. Verification (run after each task group, and at the end)

```bash
pnpm lint
pnpm check:astro
pnpm build
```

`.env` at the repo root is present locally and `pnpm build` runs a Paddle env check that should pass with it. After `pnpm build`, spot-check the output:

- `dist/blog/best-ways-to-organize-photos-on-mac/index.html` (or equivalent output path): contains ONE `data-placement="inline"` CTA, the footer CTA, unchanged `<link rel="canonical" href="https://zushapp.com/blog/best-ways-to-organize-photos-on-mac">`, and a `FAQPage` JSON-LD block.
- Homepage output: contains the 4 blog card links for `en` and does NOT contain them for a localized page (e.g. `dist/fr/index.html`).
- Grep the built blog post HTML for `blog-cta-inline` to confirm Task 1 + 2 wiring.

## 5. What NOT to do (recap)

- No slug/URL/meta-title changes, no sitemap/robots/hreflang/vercel.json edits, no localization of the blog.
- No more than one inline CTA per post; don't stack boxes back-to-back.
- Don't invent product claims: Zush facts you may use — renames by content: screenshots, PDFs, photos (incl. HEIC/RAW), design files, iWork/Office docs, audio, video; batch preview before applying; rename history with undo; folder monitoring; templates and 145+ Naming Blocks; BYOK; Offline AI mode; Free tier = 50 renames, no signup; PRO from $8/month or $38 one-time; macOS 15+ and Windows 10/11.
- Don't remove or rewrite existing content sections; extend and place, surgically.

## 6. Deliverables & commit plan

Work on a branch off `main` (e.g. `feat/blog-conversion-pass`). Suggested commits:

1. `feat(blog): per-placement download source tracking` (Task 1)
2. `feat(blog): inline download CTAs in top posts` (Task 2)
3. `feat(blog): contextual product intros` (Task 3, may be split)
4. `feat(landing): from-the-blog section on homepage` (Task 4)
5. `feat(blog): expand photo organization hub + cluster anchors` (Task 5)
6. `fix(blog): answer ollama model rename intent` (Task 6)
7. `feat(blog): early product visuals in comparison posts` (Task 7)

Success metrics (for the human operator, post-deploy; not your job): position of "how to organize photos on mac" moving <11 → top 5 in GSC; blog CTR from 0.54% toward 1%+; downloads with `source=blog-cta-inline` appearing in analytics.
