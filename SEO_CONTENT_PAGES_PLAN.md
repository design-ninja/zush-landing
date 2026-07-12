# SEO Content Pages — Implementation Brief

> **Implementation status (2026-07-12):** P1–P6 built and verified on the dev server (0 type errors, all in sitemap + llms.txt). P7 (`/better-finder-rename-alternative`) intentionally skipped as optional. Strengthening tasks: **all done.** #1 — Mac/Windows comparison posts now cross-link `/` and `/batch-rename-files` first-screen with descriptive anchors; #2 — `automate-file-organization-macos` links `/hazel-alternative` + `/ai-file-organizer`; #3 — `batch-rename-files-on-mac-complete-guide` now uses exact-match anchor "Automator rename files on Mac" → dedicated guide; #4 — `/ai-file-organizer` copy + new FAQ work in "files and folders" / "file and folder naming software" phrasing (truthful: names files in place, does not rename folders). New pages are **not yet requested for indexing in GSC** — do that manually after deploy. A shared bug was fixed along the way: `FileShowcase` crashed on `type: 'image'` entries without an `img` thumbnail; it now falls back to a purple IMG icon (`src/components/FileShowcase/FileShowcase.tsx` + `.module.scss`).

Prepared 2026-07-12 for implementation in a separate session. This brief is self-contained: it includes the strategy context, fresh GSC data, per-page specs, and the exact extension points in this codebase. Build the pages in the priority order given. **Do not invent product features** — verify every product claim against `src/data/featureContent.ts`, `src/data/searchLandingPages.ts`, existing feature pages, and `src/content/docs/` before writing copy.

## Why these pages

Chosen keyword clusters (confirmed by Kirill 2026-07-03, validated against GSC 28-day data pulled 2026-07-12):

1. **Striking-distance head terms** — strengthen existing pages + internal links (small tasks, see §Strengthening).
2. **Alternative pages vs Hazel and legacy renamers** — new landing pages. Validated: `hazel file organizer` ranks **pos 9.1** (56 impressions) via a blog post that only mentions Hazel in passing — with zero dedicated content.
3. **File-type gap: Excel / Word** — new feature pages. renamer.ai runs this playbook; filesdesk.app targets `rename-word-documents-mac` directly.
4. **Invoices / receipts vertical** — new landing pages. filesdesk, renamer.ai, and namequick all run vertical pages here; Zush's Custom AI Blocks (extract vendor, amount, invoice number — see recent commits and `/blog/naming-blocks-file-naming-guide`) are the perfect product hook.

### GSC snapshot (28 days ending 2026-07-12, sc-domain:zushapp.com)

| Query | Pos | Impr | Ranking URL |
|---|---|---|---|
| ai file renamer | 11.4 | 65 | /blog/best-ai-file-renamer-tools-windows-compared |
| ai renamer | 13.2 | 51 | (blog comparison posts) |
| file renamer ai | 12.8 | 44 | (blog comparison posts) |
| hazel file organizer | 9.1 | 56 | /blog/automate-file-organization-macos |
| automatic file organizer mac | 10.0 | 43 | /blog/automate-file-organization-macos |
| ai file and folder name software | 21.1 | 63 | /blog/best-ai-file-renamer-tools-windows-compared |
| automator rename files | 11.2 | — | /blog/batch-rename-files-on-mac-complete-guide |
| namequick (competitor brand) | 7.0 | 41 | /blog/zush-vs-namequick |

Head terms rank via blog posts, not the homepage or feature pages — internal-link consolidation matters as much as new pages.

## How pages are built in this repo

Two established page systems — reuse them, do not create a new layout system:

**A. Search landing pages** (`/batch-rename-files`, `/offline-ai-file-renamer`, `/ai-file-organizer`):
- Content in `src/data/searchLandingPages.ts` (extend the `SearchLandingSlug` union), rendered by `FeatureLandingPageShell` via a thin `src/pages/<slug>.astro` (copy `src/pages/batch-rename-files.astro`).
- Reuse `sharedSlides` before/after showcase or define page-specific file examples in the same format.

**B. Feature pages** (`/rename-pdf-with-ai` etc.):
- React view in `src/views/FeaturePages/<Name>.tsx` (copy the closest existing view, e.g. `RenameDocumentsWithAI.tsx`), content sourced from `src/data/featureContent.ts` patterns, page shell `src/pages/<slug>.astro` copies `src/pages/rename-pdf-with-ai.astro`.

**Every new page additionally requires:**
1. `src/seo/config.ts` → add a `ROUTE_META` entry: `title` (≤60 chars), `description` (≤160 chars), `robots: 'index, follow'`, `ogType: 'website'`, and per-page `keywords` (meta keywords field added 2026-07-12; falls back to `DEFAULT_KEYWORDS`).
2. JSON-LD: `buildFeaturePageJsonLd` + `buildFeatureBreadcrumbJsonLd` from `src/utils/jsonLd.ts` — include FAQPage schema (the existing systems emit it from the `faq` array).
3. `src/pages/llms.txt.ts` → add the page to the hand-maintained link list.
4. Internal links **into** the page (see per-page specs) — a page with zero internal links won't get crawled quickly.
5. **Do NOT** add new routes to `INDEXABLE_LOCALIZED_ROUTES` / `LANDING_LOCALIZED_ROUTES` in `src/i18n/config.ts` — new pages launch English-only, localization is a separate later decision.
6. Sitemap (`src/pages/sitemap.xml.ts`) auto-discovers `src/pages/*.astro` — no action needed, but verify the URL appears in `curl localhost:<port>/sitemap.xml` output.

**Copy voice:** match existing FAQ/section copy — short factual sentences, honest claims, always mention preview-before-apply and undo history. Positioning vs competitors stays respectful and truthful (see `/blog/zush-vs-renamer-ai` for tone). Never fabricate user counts, ratings, or benchmark numbers.

**Verification per page:** render on dev server; check `<title>`, meta description, meta keywords, canonical, `robots`; validate JSON-LD (paste into https://validator.schema.org); confirm sitemap + llms.txt entries; click through internal links.

**After deploy:** there is no Indexing API for regular pages — request indexing manually in the GSC web UI for each new URL.

---

## Pages to build (priority order)

### P1. `/hazel-alternative` — Hazel Alternative (system A)

The highest-confidence page: we already rank pos 9.1 for `hazel file organizer` with no dedicated content. Hazel is the dominant macOS file-automation utility (rules-based: watch folder → match conditions → move/rename).

- **Primary queries:** hazel alternative, hazel file organizer, apps like hazel mac, hazel alternative mac
- **Secondary:** hazel rename files, hazel vs, file organizer mac ai, automatic file organizer mac
- **Title:** `Hazel Alternative with AI File Naming | Zush`
- **Description:** `Looking for a Hazel alternative that understands file content? Zush watches folders, renames by content with AI, and sorts files — with preview and undo.`
- **H1:** `The Hazel alternative that reads your files`
- **Keywords meta:** hazel alternative, hazel file organizer, apps like hazel, mac file automation, ai file organizer for mac, folder monitoring mac, rename files automatically mac, sort files into folders mac
- **Outline:**
  1. Hero: honest framing — Hazel is great at rules; Zush is content-aware. "Rules ask *where a file came from*. AI asks *what's inside it*."
  2. Side-by-side comparison table: Hazel (pattern/metadata rules, powerful conditions, no content understanding, Mac-only, one-time license) vs Zush (AI content analysis, folder monitoring, Naming Blocks/Custom AI Blocks, preview + undo, Mac + Windows). Verify Hazel facts against noodlesoft.com before writing; keep the table factually accurate as of writing date.
  3. "When Hazel is still the right tool" section (genuine cases: pure location/extension rules, AppleScript hooks) — honesty builds trust and ranking for comparison intent.
  4. Migration section: how Zush's folder monitoring covers the classic Hazel watch-folder workflow (`/blog/folder-monitoring-automatic-file-renaming` has details).
  5. FAQ (FAQPage schema): "Is Zush a replacement for Hazel?", "Can Zush watch folders like Hazel?", "Does Zush work on Windows?" (Hazel doesn't — key differentiator), "Can I use Zush and Hazel together?", "Does Zush rename files by content?"
- **Links in:** `/blog/automate-file-organization-macos` (the post already ranking for the query — add a prominent link near its Hazel section), `/ai-file-organizer`, `/mac` intent-section links array in `src/components/PlatformLandingPage/PlatformLandingPage.astro`.
- **Links out:** `/ai-file-organizer`, `/mac`, `/blog/folder-monitoring-automatic-file-renaming`, `/blog/automate-file-organization-macos`.

### P2. `/powerrename-alternative` — PowerRename Alternative (system A)

PowerRename (Microsoft PowerToys) has a huge install base; `PowerRename alternative` is already in the /windows keywords list. Regex-based — same "rules vs content" story as Hazel, Windows edition.

- **Primary queries:** powerrename alternative, powertoys rename files, powerrename, batch rename windows 11
- **Secondary:** file explorer batch rename, rename files by content windows, ai file renamer windows (pos 9.4 striking-distance query)
- **Title:** `PowerRename Alternative with AI | Zush for Windows`
- **Description:** `PowerRename handles patterns; Zush reads file content. AI batch rename for Windows 11 with preview, undo, and File Explorer-friendly names. Microsoft Store.`
- **H1:** `The PowerRename alternative that understands your files`
- **Keywords meta:** powerrename alternative, powertoys rename, batch rename files windows 11, ai file renamer for windows, rename files by content windows, file explorer batch rename, windows batch rename tool
- **Outline:** mirror P1 structure — comparison table (regex find-replace vs content-aware AI naming; both free-to-start; PowerRename requires PowerToys install, Zush from Microsoft Store), "when PowerRename is enough" (uniform pattern renames), searchable-filenames angle (`windows-file-naming-conventions-searchable-folders` post), FAQ.
- **Links in:** `/windows` intent-section links, `/blog/best-ai-file-renamer-tools-windows-compared`, `/blog/bulk-rename-utility-alternatives`, `/blog/rename-files-with-ai-windows-guide`.
- **Links out:** `/windows`, `/batch-rename-files`, relevant Windows blog guides.

### P3. `/rename-invoices-with-ai` — AI Invoice Renamer (system A or B, pick whichever fits the content better)

Vertical with the strongest product fit: Custom AI Blocks extract vendor, amount, invoice number; Naming Blocks build conventions like `2026-03 – Cloudflare – $240 – Invoice.pdf`. All four competitors run invoice/receipt pages.

- **Primary queries:** rename invoices automatically, invoice renamer, organize invoices pdf, invoice naming convention
- **Secondary:** rename pdf invoices, invoice organizer software, bulk rename invoices, invoice filename format
- **Title:** `Rename Invoices Automatically with AI | Zush`
- **Description:** `Rename invoice PDFs by vendor, date, and amount — automatically. Zush reads each invoice and applies your naming convention. Preview and undo every batch.`
- **H1:** `Rename invoices automatically — vendor, date, and amount in every filename`
- **Keywords meta:** rename invoices automatically, invoice renamer, invoice pdf organizer, invoice naming convention, organize invoices, rename pdf invoices, ai invoice organizer, bulk rename invoices
- **Outline:**
  1. Hero with invoice-specific before/after slides (`download (7).pdf` → `Cloudflare Invoice December.pdf` already exists in `sharedSlides` — build a fully invoice-themed slide set in that format).
  2. Naming-convention recipes: 3–4 concrete templates (vendor–date, date–vendor–amount, client–invoice-number) built from Naming Blocks + Custom AI Blocks.
  3. Folder monitoring for the Downloads folder → invoices auto-renamed on arrival.
  4. Audience blocks: freelancers (client invoices), small business/accounting (monthly closing), personal (warranties, utilities).
  5. Privacy note: BYOK and Offline AI mode for sensitive financial documents (link `/offline-ai-file-renamer`, `/byok-setup`).
  6. FAQ: "Can Zush read the vendor and amount from an invoice?", "Can I set my own invoice naming convention?", "Can invoices be renamed automatically when downloaded?", "Is it private?" (BYOK/offline answer), "Does it work with scanned invoices?" — verify the scanned/OCR answer against actual product capabilities before writing; if unsupported, drop the question.
- **Links in:** `/rename-pdf-with-ai`, `/blog/rename-pdf-files-automatically`, `/blog/naming-blocks-file-naming-guide`, `/blog/organize-client-files-freelancers-mac`.
- **Links out:** `/rename-pdf-with-ai`, `/offline-ai-file-renamer`, `/byok-setup`, `/rename-receipts-with-ai` (P4).

### P4. `/rename-receipts-with-ai` — AI Receipt Renamer & Organizer (same system as P3)

Sibling of P3 — do not merge them; competitors split invoice/receipt intent and the queries differ (receipts skew tax/expense).

- **Primary queries:** organize receipts digitally, receipt organizer app, rename receipts, receipt organization for taxes
- **Secondary:** scan receipt naming, expense receipts organization, bulk rename receipts, receipt filing system
- **Title:** `Rename & Organize Receipts with AI | Zush`
- **Description:** `Turn IMG_2041.jpg into a searchable receipt filename with store, date, and amount. AI receipt renaming for tax season and expense reports. Mac & Windows.`
- **H1:** `Receipts you can actually find at tax time`
- **Keywords meta:** receipt organizer, organize receipts digitally, rename receipts, receipt organization for taxes, expense receipt filing, ai receipt organizer, scan receipt naming
- **Outline:** mirror P3 with receipt-specific angles — photo receipts (HEIC/JPG from phone camera) not just PDFs, tax-season and expense-report scenarios, monthly folder sorting. FAQ: tax categories via Custom AI Blocks, photo receipts, batch processing a year's backlog, undo.
- **Links in/out:** cross-link with P3; `/rename-photos-with-ai` (photo receipts), `/rename-pdf-with-ai`.

### P5. `/rename-excel-files-with-ai` — Rename Excel & Spreadsheet Files (system B, copy `RenameDocumentsWithAI.tsx`)

File-type gap page. renamer.ai has an excel page; Zush supports spreadsheets (the `Untitled.xlsx` → `Employee Onboarding Checklist.xlsx` example already ships in `sharedSlides`).

- **Primary queries:** rename excel files, bulk rename excel files, rename xlsx files, rename spreadsheets based on content
- **Secondary:** excel file naming convention, rename csv files, batch rename excel sheets
- **Title:** `Rename Excel Files with AI by Content | Zush`
- **Description:** `Bulk rename Excel and spreadsheet files based on what's inside. Zush reads XLSX and CSV content and suggests clear names. Preview and undo. Mac & Windows.`
- **H1:** `Rename Excel files by what's inside them`
- **Keywords meta:** rename excel files, bulk rename excel files, rename xlsx by content, rename spreadsheets, excel file naming convention, rename csv files, batch rename excel
- **Outline:** follow the existing feature-page structure (`RenameDocumentsWithAI.tsx` as template): hero, how it works, spreadsheet-specific pain (`Untitled.xlsx`, `Book1.xlsx`, `Copy of Copy of…`), supported formats (verify exact spreadsheet format list against the 104-format claims in `src/constants` / format data before writing), naming convention examples, FAQ.
- **Links in:** `/rename-documents-with-ai` (add a related-formats link block), `/batch-rename-files`, relevant blog guides.
- **Links out:** `/rename-documents-with-ai`, `/rename-word-documents-with-ai` (P6), `/batch-rename-files`.

### P6. `/rename-word-documents-with-ai` — Rename Word Documents (system B, sibling of P5)

filesdesk.app targets `rename-word-documents-mac` directly; the generic `/rename-documents-with-ai` doesn't capture Word-specific queries.

- **Primary queries:** rename word documents, batch rename docx files, rename word files based on content
- **Secondary:** word document naming convention, bulk rename word documents, rename docx
- **Title:** `Rename Word Documents with AI by Content | Zush`
- **Description:** `Batch rename Word documents based on their content. Zush reads DOCX files and turns meeting_notes_FINAL_v2 into names you can search. Mac & Windows.`
- **H1:** `Rename Word documents by their content, not their chaos`
- **Keywords meta:** rename word documents, batch rename docx, rename word files by content, word document naming convention, bulk rename word documents
- **Outline:** mirror P5 with Word-specific pain (`FINAL_v2_REALLY_FINAL.docx`, meeting notes, contracts, essays), audiences (students — link `/blog/file-organization-tips-students-mac`, freelancers, legal-adjacent), FAQ.
- **Cannibalization guard:** `/rename-documents-with-ai` stays the generic hub; P5/P6 must link back to it and use file-type-specific H1s/copy so they don't compete for the generic "rename documents" query.

### P7 (optional, lowest priority). `/better-finder-rename-alternative`

renamer.ai playbook (legacy Mac renamer, paid, pattern-based). Only build if P1–P6 land smoothly; same structure as P1/P2. Queries: better finder rename alternative, better rename mac. Skip if time-boxed.

---

## Strengthening tasks (cluster 1 — no new pages)

1. **Head-term consolidation:** `/blog/best-ai-file-renamer-tools-windows-compared` and `-mac-compared` rank for `ai file renamer` (pos ~11) — ensure both link prominently (first screen, descriptive anchor "AI file renamer") to `/` and `/batch-rename-files`.
2. **`/blog/automate-file-organization-macos`** ranks for both `hazel file organizer` (9.1) and `automatic file organizer mac` (10.0) — add links to `/ai-file-organizer` and new `/hazel-alternative` near the top and in the Hazel section.
3. **Automator cannibalization:** `automator rename files` ranks via `/blog/batch-rename-files-on-mac-complete-guide` (11.2) while the dedicated `/blog/macos-automator-rename-files-guide` exists. Add a cross-link from the complete guide's Automator section to the dedicated guide with exact-match anchor; check the dedicated guide's title/H1 targets the query.
4. **`ai file and folder name software`** (pos 21, 63 impressions): work the "files and folders" phrasing into `/ai-file-organizer` copy (it currently skews "files").

## Suggested execution order

One PR per page (or P3+P4 and P5+P6 as pairs), P1 → P2 → P3 → P4 → P5 → P6, then the strengthening tasks as one PR. After each deploy: verify sitemap, then request indexing in GSC web UI (no API exists for this).
