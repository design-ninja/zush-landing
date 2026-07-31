# SEO Top-3 Sprint — instructions for Codex (July 2026)

**Mission:** move zushapp.com into the top-3 of Google and AI answers (ChatGPT/Copilot/Perplexity/Google AI Mode) for its money keyword clusters, by closing the specific on-page and internal-linking gaps listed below. This brief was produced from a fresh GSC pull (28d, 2026-07-30), live SERP analysis of every target cluster, and a technical teardown of all four competitors. Do not re-audit; execute.

**Repo:** `zush-landing` — Astro 5 static site for `https://zushapp.com`, deployed by Vercel from `main`. Package manager is **pnpm** (never npm/yarn). Read `AGENTS.md` first; it governs networked commands and PR conventions.

**Branch:** `seo/top3-sprint`. One commit per task (T1…T6) so any task can be reverted alone. Open a PR to `main`; do not merge, do not deploy. Vercel deploys `main` automatically after the human merges; a GitHub Action then pings IndexNow on successful production deploys (`.github/workflows/indexnow.yml`) — do not add deploy or ping automation.

---

## 1. Where we stand (verified 2026-07-30 — trust this, don't re-derive)

Positions from GSC unless noted. Non-brand CTR baseline 0.65%.

| Cluster | Our best URL | Pos | Who owns the SERP top-3 and why |
|---|---|---|---|
| `ai file renamer mac` | `/mac` | **2.4 — already top-3** | App Store listing, us, our blog. Defend. |
| `best ai file renamer (2026)` | blog windows/2026 comparisons | **#2–3 in live SERP** | Medium T3CH listicle #1. AI answers already quote "Zush is the strongest option for Mac users". Defend. |
| `ai file renamer` (head) | blog windows-compared | 9.1 | renamer.ai / rename.click homepages (exact-match domains), MS Store listing. On-page is done; this gap is authority — not fixable in this sprint. |
| `batch rename files mac` (+bulk/mass variants — biggest addressable volume) | blog batch-rename guide | 22–30 | Setapp how-to, Advanced Renamer, renamer.com, AppleInsider, MacUpdate. But small tool sites (Transnomino, NameChanger) also hold top-10 → winnable. |
| `ai file organizer mac`, `automatic file organizer mac` | `/ai-file-organizer` | 15–21 | **Listicles win here**: 1dot.ai, thedrive.ai, and NameQuick's own blog listicle rank; we have no listicle for this cluster. |
| `hazel alternative (mac)` | `/hazel-alternative` + blog | 9–13 | AlternativeTo (we are listed), Product Hunt, two competitor blog listicles (vaultsort, getsortio) — small sites rank fine. |
| `automatically rename invoices`, `rename pdf invoices` | `/rename-invoices-with-ai` | not ranking yet (new) | Klippa how-to blog, filently listicles, renamemyinvoice.com EMD. How-to editorial + EMD one-pagers win. |
| `how to rename a screenshot on windows` | `/rename-screenshots-with-ai` | 8.6–9.4 | Mixed weak SERP → top-5 plausible with a direct-answer section. |

**Technical state — clean, do not "fix":** all money pages "Submitted and indexed", self-canonicals correct (URL Inspection API 2026-07-30). Edge-cached TTFB 0.2–0.6s. Homepage ships 8 KB external + 26 KB inline JS vs competitors' 0.5–1 MB (all four are Next.js or heavy custom). Schema (SoftwareApplication, FAQPage, HowTo, Offer, VideoObject, Breadcrumb, Person, Organization) already as rich as or richer than every competitor. robots.txt allows all AI crawlers; `llms.txt` + `pricing.md` live. Performance and indexation are NOT blockers — the gaps are internal linking, two missing content formats, and off-site authority (out of scope here).

## 2. Already done — do NOT redo

- `SEO_AUDIT_ACTION_PLAN.md` (merged 2026-07-28): internal links into 10 non-indexed pages, batch-guide content refresh, thin-content expansion, Ollama page split, "what is an AI renamer" definition block.
- CTR snippet sprint shipped 2026-07-23; cluster landing pages P1–P6 + `/automate-downloads-folder` shipped 2026-07-12/23.
- IndexNow automation, public releases repo, Homebrew cask, AlternativeTo listing — all live.

## 3. Hard constraints

1. **Frozen snippets until 2026-08-13** — keep frontmatter/config `title` and `description` **byte-identical** on: `blog/batch-rename-files-on-mac-complete-guide`, `blog/automate-file-organization-macos`, `blog/best-ai-file-renamer-tools-windows-compared`, `blog/best-ai-file-renamer-tools-mac-compared`, `blog/best-ways-to-organize-photos-on-mac`, `/rename-screenshots-with-ai` (route meta in `src/seo/config.ts`). Body edits on these pages ARE allowed.
2. Do not touch `LOCALIZATION_PAUSED` or anything locale-strategy-related in `src/i18n/config.ts`; do not create translated content (German experiment decides locale fate ~2026-09-25).
3. Do not remove or `noindex` any indexed page; no `rel=canonical` between non-duplicate pages.
4. Do not bump `reviewed:` frontmatter unless the same commit meaningfully changes that post's body. Link-only edits never bump `reviewed:`.
5. **Product claims:** Zush renames files in place — it does **not** move/sort files into folders. Never claim moving/sorting. Source every Zush capability claim from `/docs`, `pricing.md`, or `src/constants` (`pnpm check:product-facts` enforces some of this and runs in the build).
6. **Competitor claims:** only what a vendor's own live page states, with a "**Last verified: <date>**" line in any post that makes such claims. Known-verified facts (2026-07-24) you may reuse: NameQuick — Managed from $12/mo metered (500–10,000 renames/mo), Self-Managed $69 one-time BYOK, 14-day/50-rename trial, 7 providers incl. MLX + OpenRouter, Watch Folders, one-click Undo; RenameClick — supports audio (MP3/WAV/FLAC/M4A/AAC, local transcription), $8+VAT/mo or $48+VAT lifetime, free tier = 30 apply-credits/mo, no RAW/design files, "desktop-native" (never say "not Electron"); Renamer.ai — supports EPS/SVG/AI vectors (so "design files" alone is not a Zush differentiator against them; Sketch/Figma/PSD are). Editorial angle that is ours: **metered vs unmetered billing** — Zush PRO is the only unmetered option that includes managed cloud without BYOK.
7. **GEO rule:** every sentence engineered to be quotable by AI answers must contain the word "Zush" (uncredited-quote incident, 2026-07). Each new post gets a `tldr:` that is a self-contained, brand-carrying answer.
8. New static routes must be registered in `ROUTE_META` in `src/seo/config.ts` (sitemap picks them up automatically); blog posts are auto-included. After building, confirm new URLs appear in `dist/` sitemap and that `/llms.txt` includes new landing/blog URLs (check whether `src/pages/llms.txt.ts` lists them automatically or needs a manual entry).
9. English only; American spelling; match the voice of existing comparison posts (direct, verification-first, no marketing fluff).

## 4. Tasks

### T1 — Footer link group for the 7 unlinked commercial pages (internal authority)

`src/components/Footer/Footer.astro` has Product / Formats / Company groups, but these indexed commercial pages get **zero** links from the homepage or any site-wide surface: `/hazel-alternative`, `/powerrename-alternative`, `/automate-downloads-folder`, `/rename-invoices-with-ai`, `/rename-receipts-with-ai`, `/rename-excel-files-with-ai`, `/rename-word-documents-with-ai`. They sit at pos 5–20 and are starved of internal PageRank (homepage is our strongest URL).

- Add a fourth footer group (working label "Compare & automate") linking all 7.
- Follow the existing pattern exactly: label strings live in the i18n copy the footer already uses (`copy.productLinks` block in `src/i18n/copy.ts`) — add keys for every locale the block defines, translating the short labels in the same style as neighbors. Use plain `href='/...'` (see lines ~177–179) for routes that are NOT in `LOCALIZED_ROUTES`, `footerHref()` for those that are — check membership in `src/i18n/config.ts`, don't guess.
- Keep labels short (2–4 words), descriptive anchors ("Hazel alternative", "Rename invoices"), no keyword stuffing.

Acceptance: built homepage HTML in `dist/` contains links to all 7 URLs; footer renders correctly on `/`, `/mac`, a blog post, and one locale page (e.g. `/de`); no layout overflow at mobile width (the SCSS module grid may need a column adjustment).

### T2 — New listicle: "Best AI File Organizers for Mac in 2026" (organizer cluster)

The organizer cluster is the largest gap where the SERP format is proven and we simply lack the format: every ranking page is a listicle (including NameQuick's own blog post). Our winning precedent: the two "Best AI File Renamer" comparisons rank #2–3 and feed AI answers.

- New post `src/content/blog/best-ai-file-organizers-mac.mdx`. Frontmatter mirrors `best-ai-file-renamer-tools-mac-compared.mdx` (title/description/date/slug/platform:"mac"/topic:"comparisons"/tags/tldr/reviewed).
- Suggested title: `Best AI File Organizers for Mac in 2026: 7 Apps Tested` (≤60 chars). Description ≤155 chars, includes "AI file organizer for Mac".
- Target queries: `ai file organizer mac`, `automatic file organizer mac`, `best ai file organizer mac`, `ai organize files for me mac`, `hazel file organizer` (adjacent).
- Apps (7): Zush, Hazel, Sparkle (makeitsparkle.co), NameQuick, Sortio (getsortio.com), Floxtop, Files Magic AI. Verify each vendor's pricing/capability claims against their live site at write time; add the "Last verified" line. Reuse §3.6 facts where applicable.
- Honest framing for Zush: it organizes by **making names searchable and consistent** (content-based renaming, folder monitoring, templates, undo) and **pairs with Hazel** for rule-based moving — see `/automate-downloads-folder` for the approved framing. Position each tool by job: Hazel = deterministic rules, Sparkle = broad cleanup, NameQuick = rename+file, Sortio = prompt sorting, Zush = content-aware naming at scale.
- Include: comparison table (pricing model incl. metered/unmetered, local AI, platform, moves files vs renames in place, undo), a "What is an AI file organizer?" definition paragraph (direct-answer style), 3–4 FAQ entries wired the same way existing comparison posts emit `FAQPage` schema (see `src/data/blogSchema.ts` usage), `BlogProductIntro` with a contextual title, one early `BlogCTA`.
- Internal links — in-body, natural anchors: from `blog/automate-file-organization-macos`, `blog/best-ways-to-organize-photos-on-mac`, and the `/ai-file-organizer` landing → to the new post; from the new post → `/ai-file-organizer`, `/hazel-alternative`, `/automate-downloads-folder`, `blog/best-ai-file-renamer-tools-mac-compared`. Do not touch `title`/`description` of the two frozen source posts (§3.1) and do not bump their `reviewed:`.
- Length: 1,800–2,500 words of substance (the ranking competitors sit at 1,300–2,600).

### T3 — New how-to: "How to Automatically Rename Invoices with AI" (invoice/PDF cluster)

SERP for `automatically rename invoices` / `rename pdf invoices automatically` is won by how-to editorial (Klippa, filently) — our `/rename-invoices-with-ai` landing alone won't rank without an editorial layer. Bonus capture: queries `renamed.to vs renamer.ai (bulk pdf renaming)` (~63 imp/28d) currently hit our windows comparison at pos 5–7 with no dedicated section.

- New post `src/content/blog/automatically-rename-invoices-ai.mdx` (confirm no slug collision; a `rename-pdf-files-automatically` post exists — this one is invoice/receipt-specific, cross-link, don't overlap its generic-PDF scope).
- Suggested title: `How to Automatically Rename Invoices with AI (2026 Guide)`.
- Structure: the problem (vendor_date_amount chaos) → three approaches compared (manual / rule-based / content-based AI — the frame that wins this SERP) → step-by-step with Zush on Mac & Windows (reuse the HowTo schema pattern from `src/data/howToSchemas.ts` if blog supports it, else plain steps) → naming templates for accounting (concrete before/after examples) → **"Renamed.to vs Renamer.ai vs desktop apps for bulk PDF renaming"** H2 with a stable anchor, comparing the two web tools and desktop apps honestly (verify their claims live; renamed.to advertises 95%+ accuracy — attribute it as their claim) → receipts variant paragraph → FAQ (3–4 Q).
- Internal links: from `/rename-invoices-with-ai`, `/rename-receipts-with-ai`, `/rename-pdf-with-ai` landings and `blog/rename-pdf-files-automatically` → new post; from new post → those three landings. Plus ONE in-body link from `blog/best-ai-file-renamer-tools-windows-compared`'s renamed.to/renamer.ai context → the new post's anchor (body edit only — its title/description are frozen, no `reviewed:` bump).
- `tldr:` names Zush and answers "how do I automatically rename invoices" in one sentence.

### T4 — Platform qualifiers on `/batch-rename-files` (biggest-volume cluster)

The highest-volume cluster is Mac-qualified (`batch rename files mac` + bulk/mass/multiple variants), yet our landing title (`src/seo/config.ts` ~line 95: `Batch & Bulk Rename Files with AI | Rename Tool | Zush`) names no platform. This route is NOT on the frozen list.

- New title: `Batch & Bulk Rename Files on Mac & Windows with AI | Zush` (keep the deliberately-added "Bulk" stem). Update the route description to mention Mac & Windows naturally (≤155 chars). English/default config only — leave per-locale meta in `src/i18n/seo.ts` untouched.
- Ensure the page H1/intro (see `src/data/searchLandingPages.ts`) mentions Mac & Windows once, naturally, near the top. Keep the landing's product/transactional intent distinct from the DIY blog guide — do not add how-to-in-Finder content here (a cannibalization check is scheduled for 2026-08-02; intent separation is what keeps it clean).

### T5 — Windows screenshot direct-answer section on `/rename-screenshots-with-ai` (body only)

`how to rename a screenshot on windows` (43 imp/28d, pos 8.6–9.4) hits this page with zero clicks — the page answers Mac-first and has no direct Windows answer. Title/description are FROZEN (§3.1); body edits are allowed.

- In the page's content source (`src/data/searchLandingPages.ts` or the page component — locate where this route's sections live), add an H2 `How to rename a screenshot on Windows 11` with a 2–3 sentence direct answer (F2 / right-click → Rename for one file; Zush for batches by content) followed by compact steps, and a matching FAQ entry so it lands in the page's `FAQPage` JSON-LD.
- Keep the route's `title`/`description` in `src/seo/config.ts` byte-identical.

Acceptance: built page HTML contains the new H2 and the FAQPage JSON-LD includes the new question; config title/description unchanged (`git diff` proves it).

### T6 (optional, strictly gated) — AggregateRating plumbing, disabled by default

Renamer.ai ships `AggregateRating` schema (star-snippet eligibility); we have real ratings nowhere near critical mass yet, and the in-app ratings prompt is only now rolling out.

- In the JSON-LD builder (`src/seo/entity.ts` or wherever `SoftwareApplication` is emitted), support an optional `aggregateRating` sourced from a single constants entry, e.g. `APP_RATING: { ratingValue, ratingCount, source } | null` — currently `null`, which must emit nothing.
- **Never invent numbers. Do not enable.** PR note: enable only when Mac App Store / MS Store ratings reach a defensible count, using those stores' real values.

## 5. Verification gate (every task, before PR)

```
pnpm check:seo
```

(runs astro check, locale/payments/pricing/product-facts/middleware/redirect checks, full build, HTML smoke, internal-link check). If the production Paddle env blocks the build locally, use `pnpm check:seo:sandbox`. Also run `pnpm lint`. Spot-check `dist/`: new posts render, sitemap contains them, `llms.txt` includes them, FAQ JSON-LD valid (paste one page's JSON-LD into a validator-equivalent check: well-formed JSON, correct @type nesting).

## 6. Out of scope — do not do

Snippet rewrites on frozen pages; any locale/translation work; canonicals between articles; pricing/free-tier changes; fabricated ratings, review counts, or competitor claims; new npm dependencies; touching `public/releases`, Paddle, or analytics code; outreach/listings (human-owned, see `OUTREACH_PLAYBOOK.md`); re-running site audits.

## 7. PR description must include (for the human)

1. Direct live URLs of every created/changed page for manual GSC "Request indexing" after deploy (AGENTS.md rule): the 2 new blog posts, `/batch-rename-files`, `/rename-screenshots-with-ai`, `/` (footer change), plus the edited posts.
2. Reminder list for the human (not Codex): verify site in **Bing Webmaster Tools** and submit the sitemap — Bing currently indexes only 2 of our pages, which suppresses ChatGPT/Copilot answers regardless of on-page quality; re-measure the frozen-snippet CTR sprint after 2026-08-13 before any new snippet iteration; cannibalization check task fires 2026-08-02; off-site authority items (Product Hunt, MacUpdate, Setapp roundup pitch, T3CH/Medium listicle inclusion, r/macapps) live in `OUTREACH_PLAYBOOK.md`.
