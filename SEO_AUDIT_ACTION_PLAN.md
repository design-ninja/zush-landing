# SEO audit action plan — July 2026

> **Status (2026-07-28):** completed and merged into `main`. The owner explicitly authorized the final commit and push, superseding the original no-push handoff rule below. Deployment remains managed by Vercel from `main`.

**Executor:** Opus 5 agent, working in `/Users/lirik/Projects/zush/zush-landing` (Astro 5 static site for zushapp.com).
**Do not deploy. Do not push.** Deliver working local builds on feature branches; the human deploys and requests indexing.
**Source:** weekly SEO audit of 2026-07-28 (GSC weeks 2026-07-19..25 vs 2026-07-12..18), reviewed and re-prioritized by Fable 5.

## Hard constraints (read first)

1. **Do NOT touch `LOCALIZATION_PAUSED`** in `src/i18n/config.ts` — explicit owner decision (2026-07-28). Locales stay as they are; the German blog experiment (Phase 3) is the live test that decides their fate, verdict due ~2026-09-25.
2. Do not remove or noindex any currently indexed page.
3. Do not add cross-page `rel=canonical` between non-duplicate articles (this was considered and rejected — see "Rejected items" at the bottom).
4. Do not bump `reviewed:` frontmatter on any post unless that same commit meaningfully changes the post's body text. This is now standing policy (audit finding F3: 44 of 52 posts got date-only bumps on 2026-07-19 — never repeat this).
5. Phases run in order: Phase 1 → Phase 2 → Phase 3. Phase 1 edits English posts that Phase 3 will translate — translating pre-refresh content would waste the translation.

## Phase 1 — quick wins (branch `seo/audit-quick-wins`, ~1 day)

### 1.1 Internal links into the 10 non-indexed pages

These pages are "Crawled/Discovered — currently not indexed" (GSC URL Inspection, 2026-07-28). Weakest have 0–2 inbound internal links. Add **3–6 contextual in-body links per target** from topically related *indexed* posts (link from within paragraph text, not from lists/footers; vary anchor text naturally). Current inbound counts in parentheses:

| Target | Inbound now | Best link sources (indexed, topically close) |
|---|---|---|
| `/blog/digital-photo-organization-mistakes-to-avoid` | **0** | best-ways-to-organize-photos-on-mac, ai-image-tagging-vs-manual-photo-organization, why-your-photos-are-named-img…, heic-raw-image-management-guide-macos |
| `/blog/rename-pdf-files-with-ai-mac` | 1 | rename-pdf-files-automatically, rename-files-by-content-guide, rename-documents landing posts, ai-document-renamer-guide |
| `/blog/digital-asset-management-designers-mac` | 1 | organize-client-files-freelancers-mac, rename-design-files landing, file-naming-conventions-best-practices |
| `/blog/rename-video-files-with-ai` | 2 | organize-screen-recordings-broll-ai, rename-audio-files-with-ai, best-ai-file-renamer-tools-2026 |
| `/blog/ai-photo-renamer-guide` | 6 | verify links are in-body, add 1–2 from photo cluster if not |
| `/blog/auto-rename-files-mac-guide` | 8 | likely fine — verify links are in-body prose, not just nav blocks |
| `/blog/byok-ai-file-renaming-unlimited` | 11 | no link work needed; indexing likely blocked by content quality — skip unless 1.3 covers it |
| `/blog/how-to-organize-downloads-folder-mac` | 6 | verify; add from declutter-your-mac-file-cleanup-guide |
| `/blog/naming-blocks-file-naming-guide` | 7 | handled by 1.3 instead — do not just add links to a 518-word page |
| `/authors/kirill-isachenko` | — | link from methodology page and from author byline on 2–3 top posts if not already linked |

Rule: every added link must read naturally in context. Do not create "related links" list blocks. Do not touch `reviewed:` dates for link-only edits (see constraint 4 — links are not a content refresh).

### 1.2 Snippet rewrites — ON HOLD, do not touch titles/descriptions of the sprint pages

A CTR sprint already shipped **2026-07-23** (commit `ed70ae26`) with new titles/descriptions on: batch-rename-files-on-mac-complete-guide, automate-file-organization-macos, both AI-renamer comparison posts, best-ways-to-organize-photos-on-mac, and /rename-screenshots-with-ai. The measurement window runs to **~2026-08-13**; the audit week (07-19..25) barely overlaps the change and says nothing about whether the new snippets work.

**Do NOT rewrite `title`/`description` on any of those pages in this plan.** Re-pull GSC after 2026-08-13, compare CTR against the pre-sprint baseline (non-brand CTR 0.65%), and only then decide on another snippet iteration. Body-content edits (1.1, 1.3) are allowed — keep frontmatter title/description byte-identical on sprint pages.

### 1.3 Real refresh of the most valuable blog page + thin-content fixes

- **`batch-rename-files-on-mac-complete-guide.mdx`** (dated 2026-02-08, never truly updated): verify every step against current macOS naming (Finder batch-rename dialog options, Shortcuts, Automator status), refresh screenshots references if any are stale, add a short FAQ section targeting "what is the fastest way to batch rename files on mac". This is a genuine content update → `reviewed:` bump is legitimate here.
- **`naming-blocks-file-naming-guide.mdx`** (518 words, "Discovered — not indexed"): expand to 1,200+ words of genuinely useful content (concrete before/after examples per block type, common template recipes, link to `/docs/naming-blocks` and templates post) **or**, if expansion feels forced, merge into `file-naming-conventions-best-practices.mdx` with a 301 in `vercel.json` and delete the source file. Prefer expansion — the feature is product-specific and deserves its own URL.
- **`zush-templates-file-renaming-workflows.mdx`** (538 words but **already indexed** — do not merge/delete): expand with 2–3 worked template examples. Lower priority; do only if time allows.

### 1.4 Performance: drop the paused Google Ads tag (needs human env change, code side is verification only)

Lighthouse mobile on the blog shows the only real third-party cost is the Google Ads gtag (`AW-18134395043`): 61 KB unused JS + connections to googletagmanager/doubleclick/google.com (~300 ms each). The Ads campaign is **paused since 2026-06-15 with 0 conversions**.

- Loading is already env-gated: `src/utils/adTracking.ts` no-ops when `PUBLIC_GOOGLE_ADS_ID` is unset.
- **Human step (include in PR description, do not do it yourself):** remove `PUBLIC_GOOGLE_ADS_ID` (and the two conversion-label vars) from Vercel production env, redeploy. Re-add when ads resume.
- **Agent step:** verify locally that a build without `PUBLIC_GOOGLE_ADS_ID` produces no gtag references in `dist/` and that `trackAdDownloadConversion` / `trackAdPurchaseConversion` no-op silently (no console errors on click). Do not delete the adTracking code — the campaign may resume.
- Secondary (optional): check the 29 KB unused in `_astro/client.*.js` — only act if there's an obvious dead island; do not refactor hydration for this.

### Phase 1 verification

`pnpm lint`, `pnpm check:astro`, `pnpm build` (or `pnpm build:sandbox` if paddle env blocks), `pnpm check:html`, `node scripts/check-internal-links.mjs` — all clean. Spot-check in `dist/` that edited posts render and new links resolve. Commits: one per numbered item (1.1–1.4), so any can be reverted alone.

## Phase 2 — striking-distance and intent work (branch `seo/striking-distance`, ~1 day, after Phase 1 merges)

### 2.1 Definitional query: "what is ai-renamer software" (46 imp/28d, pos ~13, 0 clicks)

Ranks via `best-ai-file-renamer-tools-windows-compared`. Add a crisp 2–3 sentence definition section near the top ("What is an AI file renamer?") phrased as a direct answer, plus a matching `FAQPage` entry if the page's FAQ block supports it. Do not keyword-stuff; one clean definitional paragraph.

### 2.2 "hazel file organizer" (42 imp/28d, pos 9.0, 0 clicks)

First check which URL actually ranks: run the seo-ops GSC client (`query_page_matrix` filtered to this query, 28 days). If it's `/blog/automate-file-organization-macos`, strengthen its Hazel section H2 to match the query and add a prominent in-body link to `/hazel-alternative`. If it's `/hazel-alternative` itself, improve that page's title/description instead. Don't guess — look first.

### 2.3 Ollama pages: differentiate, don't merge

`rename-files-with-ollama-mac` (29 imp, pos 5.3) and `local-ai-file-renaming-ollama-guide` (9 imp, pos 8.7) split the query "ollama rename model". Note: that query's dominant intent is renaming an **Ollama model**, not files — and `rename-files-with-ollama-mac` already answers it (section added 2026-07-19, `ollama cp`/`ollama rm`). Zero clicks at pos 5.6 likely means the SERP answers it inline; accept that.

Action: sharpen the split so Google stops wavering — `rename-files-with-ollama-mac` = the Mac setup tutorial (keep "Ollama" in title), `local-ai-file-renaming-ollama-guide` = reposition H1/title toward "local AI file renaming (privacy, offline)" and de-emphasize Ollama-specific phrasing; cross-link the pair with descriptive anchors. **No canonical between them** — they are distinct articles.

### 2.4 Skip list — do not optimize for these

Competitor-brand queries (`renamer ai`, `renamer.ai`, `rename click`, `namequick`, `filesdesk`) already have dedicated vs-pages ranking 5–9. Low CTR on someone else's brand query is expected; heading rewrites won't change it. Leave them.

### Phase 2 verification

Same gate as Phase 1. `reviewed:` bumps allowed only where body text actually changed (2.1–2.3 all qualify).

## Phase 3 — German blog translations

Execute `DE_BLOG_TRANSLATION_PLAN.md` **exactly as written** (waves 1 → 2 → 2b, branch `feat/de-blog-translations`, separate commits per wave, quality gate §5, verification §6 of that plan). Constraints from that plan that bear repeating: build must be green after wave 1 alone; German posts must not leak into English listings; hreflang clusters symmetric on both sides; do not create `/de/blog` index; do not deploy.

Sequencing note: wave 1 translates `batch-rename-files-on-mac-complete-guide` and `best-ways-to-organize-photos-on-mac` — Phase 1 refreshes the former, so Phase 3 must start **after** Phase 1 is merged, translating the refreshed text.

## Post-deploy checklist (human, not agent)

After Phase 1+2 deploy:
1. GSC → request indexing for the 10 URLs (in this order — link/content work above must be live first):
   naming-blocks-file-naming-guide · rename-video-files-with-ai · authors/kirill-isachenko · byok-ai-file-renaming-unlimited · auto-rename-files-mac-guide · ai-photo-renamer-guide · how-to-organize-downloads-folder-mac · digital-photo-organization-mistakes-to-avoid · digital-asset-management-designers-mac · rename-pdf-files-with-ai-mac
   (direct inspect links are in the 2026-07-28 audit report, §5)
2. Remove `PUBLIC_GOOGLE_ADS_ID` from Vercel prod env (see 1.4), redeploy.
3. After Phase 3 deploy: follow §7 of `DE_BLOG_TRANSLATION_PLAN.md` (request indexing for 8 German URLs, resubmit sitemap).

## Rejected / deferred items (from the 2026-07-28 audit — do not implement)

- **Rec №1 (pause/noindex locales):** owner decided to leave locales as-is; the DE experiment is the real decision input, verdict ~2026-09-25.
- **Rec №7 as originally stated (canonical from local-ai-ollama-guide → rename-files-with-ollama-mac):** cross-canonical between non-duplicate articles violates canonical semantics and Google would likely ignore it; replaced by 2.3.
- **Rec №9 as originally stated (add preconnect for gtag domains):** preconnecting to an ad tag for a paused campaign optimizes waste; replaced by 1.4 (remove the tag).
- **Rec №10 (narrow sitemap lastmod import graph):** deferred — medium effort, uncertain benefit, and misclassifying a real content change as "chrome-only" would suppress true lastmod updates. Revisit only if mass lastmod bumps recur.
- **Rec №4 (snippet rewrites for batch-rename & windows-compared):** superseded — those snippets were already rewritten in the 2026-07-23 CTR sprint (commit `ed70ae26`); measurement window runs to ~2026-08-13. See 1.2.
- **Rec №8 competitor-brand heading rewrites:** see 2.4 skip list.
- **Bot-query filtering (rec №6):** reporting hygiene, not a site change — recorded in the SEO ops notes; future audits exclude `how to organize photos on mac` (bot pattern: 111 countries, 0 clicks, ~99% desktop) from WoW comparisons.
