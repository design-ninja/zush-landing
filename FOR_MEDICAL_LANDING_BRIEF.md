# Brief: rebuild `/for-medical` as a true commercial landing for medical professionals

**Author:** Fable 5 (analysis pass, 2026-08-03) · **Executor:** Opus 5 · **Owner:** Kirill
**Status:** approved direction — build it. This page is the prototype; `/for-accountants` and `/for-legal` will be rebuilt on its skeleton afterwards (do NOT touch them in this pass).

---

## 1. Mission

The current `/for-medical` is a `FeatureLandingPageShell` instance — structurally a clone of the homepage with swapped copy. Kirill wants a genuinely different, conversion-oriented landing that speaks to doctors, clinic owners, practice managers, and medical billers about THEIR files: patient records, scans, faxes, lab results, EOBs. Visual anchor: a hero with a generated photo of a physician at a desk organizing patient PDFs on screen.

Success = a page where a medic recognizes their own workday in the first screen, sees their own extraction fields (patient ID, DOB, record type, date of service…), has privacy objections answered (local AI), and downloads.

## 2. What already exists — reuse, don't reinvent

| Asset | Path | Use |
|---|---|---|
| Architectural precedent | `src/components/PlatformLandingPage/PlatformLandingPage.astro` | THE model: a bespoke component that composes BaseLayout + own sections + shared sections + own data files. Copy this structure, not FeatureLandingPageShell. |
| Current page + SEO | `src/pages/for-medical.astro`, `ROUTE_META['/for-medical']` in `src/seo/config.ts` | Keep the URL, keep `headerWidth="container"`, keep/extend the SEO entry. The page file swaps `FeatureLandingPageShell` for the new `MedicalLandingPage`. |
| Current data | `'for-medical'` entry in `src/data/searchLandingPages.ts` (slides `medicalSlides`, `medicalFaq`, jsonLd) | Migrate what's good (FAQ answers, jsonLd howTo/software, showcase file pairs) into a new `src/data/medicalLanding.ts`, then remove the `'for-medical'` entry + slug from the union type once nothing imports it. |
| Shared sections | `Pricing`, `DownloadCTA`, `CrossPlatformBanner`, `FAQ` (`src/components/FAQ`, note `STATIC_JSX_OVERRIDES` for links in answers), `TrustSignals`, `Breadcrumbs`, `FileShowcase` (before→after file cards), `StarRating` | Compose directly. |
| Section header styles | `src/components/SectionHeader/SectionHeader.module.scss` | For every `h2` + description pair. |
| Card grid styles | `src/components/UseCases/UseCases.module.scss` (see `HomeProfessions` for the reuse pattern incl. the doubled-class specificity trick) | For feature/use-case card grids. |
| Testimonials precedent | `src/components/Testimonials/Testimonials.astro` — hardcoded persona quotes incl. "Dr. Amir Khan, Clinic owner" | The house already ships persona testimonials. Build a medical-specific set in the same voice (see §5.8). Do NOT import the generic component; medical needs its own quotes. |
| Design tokens | `src/styles/_variables.scss`, `_theme.scss`, mixins `container`, `page-top-bloom` in `_mixins.scss` | No hardcoded colors/sizes — use `var(--…)` and `$` tokens. |
| Related content to link | `/blog/medical-records-file-naming-convention`, `/docs/templates/medical-records`, `/rename-scanned-documents`, `/offline-ai-file-renamer`, `/docs/privacy-security` | The medical cluster shipped 2026-07-31 — weave links into sections, not just a "related" list. |

## 3. Architecture

```
src/components/MedicalLandingPage/
  MedicalLandingPage.astro        # composes everything; takes no props (en-only page)
  MedicalHero.astro               # bespoke hero with photo background
  MedicalLandingPage.module.scss  # page-level sections
  MedicalHero.module.scss
src/data/medicalLanding.ts        # all copy/data: hero, pains, fields, workflow, quotes, FAQ, jsonLd
src/pages/for-medical.astro       # BaseLayout + MedicalLandingPage (keep headerWidth="container")
public/images/landing/medical-hero.webp   # generated photo (see §6)
```

- English-only (like `HomeProfessions`): hardcode copy in the data file, do NOT touch `src/i18n/copy.ts`. `/for-medical` is not in `LOCALIZED_ROUTES` — keep it that way.
- All interactive islands `client:visible`; the page should work fully without JS (it's mostly static).
- JSON-LD: keep `buildFeaturePageJsonLd` usage (howTo + software + FAQ) fed from the new data file + `buildFeatureBreadcrumbJsonLd`. FAQ section content and FAQPage schema must stay in sync (single source in `medicalLanding.ts`).

## 4. Facts & guardrails (non-negotiable)

1. **Pricing:** Free = 50 renames to start; PRO = **$10/month or $48 one-time**, unmetered. `scripts/check-pricing.mjs` runs in build — if you print prices, print these.
2. **Offline AI runs on Mac AND Windows** (local Ollama models). It is the headline privacy feature for this page.
3. **Never claim HIPAA compliance.** The approved framing (already live in `/docs/privacy-security` and the medical blog post): no tool makes a practice compliant; Zush's local modes are designed so the renaming step doesn't create a new disclosure path. Reuse those exact ideas.
4. **No PHI in example filenames.** Every example filename on the page uses MRN-style identifiers, never patient names or diagnoses. This is our own published guidance — the page must model it. (Diagnoses/names may appear as *extractable fields* in §5.3 — that's the point of the section — but never in an "after" filename.)
5. Zush renames **in place**: no uploads, no file storage. AI vision reads image-only scans without an OCR pass.
6. The CSS minifier gotcha: multi-function `filter`/`backdrop-filter` values get mangled in prod builds — wrap the whole value in a CSS custom property (see memory/`Header.module.scss` comments for precedent).

## 5. Page structure & copy (top to bottom)

Draft copy is provided; polish is allowed, dilution is not. Keep sentences concrete, no "revolutionize/streamline" filler.

### 5.1 Hero (bespoke `MedicalHero`)

- **Layout:** full-width section, photo background (right-weighted composition) with a dark gradient scrim from the left so text sits on a calm surface; on mobile the photo becomes a top band or a soft backdrop. Use `page-top-bloom` OR the photo — not both fighting; recommendation: skip the purple bloom here, the photo is the hero's identity. Header stays `container` width.
- **H1:** `Patient files that name themselves` (accent word via `brand-accent-text`: "name themselves").
  - Alt options if Kirill prefers: `Every scan filed. No typing.` / `Your records folder, finally in order.`
- **Subhead:** `Zush reads every scan, fax, and lab report — on your machine, not in the cloud — and names it by patient ID, date of service, and record type. Review the batch, apply, undo anytime.`
- **CTA row:** standard `DownloadButton` group (both OS, free-badge) + secondary text link `See how a practice sets it up →` anchoring to §5.5 workflow.
- **Trust line under CTAs:** `Offline AI mode · Files never leave the machine · 50 renames free`.
- **Optional floating card** (desktop only): one before→after pair rendered with `FileShowcase` card styles — `Scan0001.pdf → MRN-48211 – 2026-06-12 – Lab Results.pdf` — overlapping the photo edge. Skip if it fights the composition.

### 5.2 Pain strip — "Sound familiar?"

Three terse cards (UseCases grid styles, 3-up):
1. **The scanner names nothing.** `Scan0001.pdf`, `Scan0002.pdf`… A day of intake is a folder of mystery files only openable one by one.
2. **Filenames leak.** `Smith, John - biopsy.pdf` shows up in sync logs, email previews, and search indexes. Names in filenames are disclosure paths.
3. **Cloud tools are a non-starter.** Uploading patient records to a web renamer trades a filing problem for a compliance problem.

Each card's pain maps 1:1 to a section below (AI vision / safe naming / local AI) — order the page so the answers come in the same sequence.

### 5.3 Field extraction — the signature section ("Zush reads the page like you do")

This is the section Kirill asked for explicitly: domain fields, maximally recognizable. Two-column contrast layout:

- **Left — "What Zush can read":** chip cloud of extractable fields, mono/badge styling: `Patient name` `MRN / Patient ID` `Date of birth` `Date of service` `Record type` `Referring provider` `Specialty` `Blood type` `Diagnosis` `Payer / Insurance` `Claim #` `Amount` `Custom field — describe it in plain language`. Footnote: `Custom AI Blocks extract any field you can describe — "the ordering physician", "the CPT code", "left or right side".`
- **Right — "What goes in the filename — your call":** the recommended PHI-safe pattern, large mono: `{Patient ID} – {Date of service} – {Record type}` with 3 example outputs (MRN-based, from the existing `medicalSlides` pairs). Caption: `Read everything, expose nothing: names and diagnoses stay inside the file, identifiers go in the filename. That's the pattern records-management guidance recommends — and the preview step is where you confirm it.` Link the caption to `/blog/medical-records-file-naming-convention`.

This contrast (reads everything ↔ names safely) is the page's honest differentiator — keep it visually loud.

### 5.4 Privacy section — "Your files never leave the machine"

Dark-surface band (like `WaysToRun` treatment). Three columns: **Offline AI** (local Ollama, Mac & Windows, nothing transmitted — the recommended mode for records; primary visual weight), **BYOK** (your own provider account and BAA/terms), **In-place renaming** (no uploads, no storage, filenames stay local). One-line honesty note verbatim-adapted from docs: `No tool makes a practice HIPAA-compliant by itself — Zush's job is to make sure the renaming step doesn't add a disclosure path.` Link `/docs/privacy-security`.

### 5.5 Workflow — "From scanner tray to filed chart in three steps"

Numbered 3-step strip: **1. Point Zush at the scan folder** (folder monitoring watches scanner/fax output) → **2. Review the proposed names** (preview is a control: confirm no patient names before anything is written) → **3. Apply with undo** (rename history reverts any batch). Below: link row to `/docs/templates/medical-records` ("build the template step-by-step") and `/rename-scanned-documents`.

### 5.6 Feature grid for medics (2×3, UseCases cards)

Folder monitoring (scanner/fax folders) · AI vision for image-only scans (no OCR pass) · Templates per document flow (records vs billing) · Custom AI Blocks (plain-language field extraction) · Undo & rename history · Works with charts-style and intake-style folder layouts (link the blog post's two layouts).

### 5.7 Who it's for — mini use cases (3 cards)

**Solo practice / clinic owner** (intake pile → filed by MRN nightly), **Practice manager / front desk** (one convention across staff without training), **Medical billing** (EOBs/ERAs/claims by account number and payer — bridge card linking `/for-accountants`).

### 5.8 Testimonials — "What clinicians say"

Follow the house persona-testimonial pattern (`Testimonials.astro` already ships "Dr. Amir Khan, Clinic owner"). Build 3 medical personas with the same grounded, hedged voice — no miracle claims, mention review/undo (that voice is what makes them credible): a clinic owner (reuse/adapt the existing Amir Khan quote — it's already medical), a practice manager (front-desk scanning angle), a biller (EOB matching angle). StarRating per card as in the shared component. **Flag in the PR/summary for Kirill:** these are illustrative personas per site convention — swap in real quotes when he has them.

### 5.9 Pricing

Shared `Pricing` component as-is (`copy` from `getCopy('en').pricing`). Preface line: `One license, unmetered. No per-document credits — re-run a folder after a template change for free.`

### 5.10 Medical FAQ (8 items, single source in `medicalLanding.ts`, rendered via shared `FAQ` + emitted as FAQPage JSON-LD)

Reuse the 5 existing `medicalFaq` items (they're good) and add three: retention horizons (convention outlives software — self-describing names survive exports), "can it read handwriting/poor scans?" (typical office scans yes; illegible pages get generic names and the preview catches them), "does it work with our EHR?" (Zush organizes the file layer — scanner output, exports, attachments — it doesn't integrate with or modify EHR systems; honest scope statement).

### 5.11 Final CTA

Shared `DownloadCTA` + `CrossPlatformBanner`.

## 6. Hero image

No image-generation tool exists in this environment — **first run `ToolSearch` for an image-generation capability; if none is connected, do NOT block:** build the hero with a graceful no-photo fallback (deep gradient + oversized blurred file-card motif using existing tokens) and leave the `<picture>` slot wired to `/images/landing/medical-hero.webp` so dropping the file in activates it. Hand Kirill this generation prompt in the summary:

> Photorealistic, editorial-style photo: a physician in a white coat at a modern desk, viewed from behind/over-the-shoulder at a slight angle, organizing a grid of PDF patient-record cards on a large monitor; clean bright clinic office, soft depth of field, cool neutral palette with one subtle green accent; screen content abstract/unreadable (no legible names or text); no visible brand logos; wide 16:9, space on the left third for headline overlay; natural light, calm, competent mood.

Spec: `.webp`, ~2400×1350 source, art-directed crop for mobile (~1200×1600 portrait variant optional), overlay scrim must guarantee AA contrast for hero text in both themes. **Hard rule: no readable patient data may be visible in the image, even fake.**

## 7. QA checklist before handing back

1. `pnpm check:astro` — 0 errors. `pnpm build` — passes (includes check-pricing).
2. Dev-server verify (`.claude/launch.json` → `astro-dev`; note: a running dev server does NOT pick up new content-collection entries, but this page is all components/data — HMR is fine; restart if routing acts stale).
3. Screenshot the full page (desktop + mobile widths, light + dark themes) — Kirill reviews visuals in his own browser, but catch layout breaks yourself first (the HomeProfessions grid-column incident: explicit grid placement for any extra child in a UseCases card).
4. JSON-LD: validate FAQ/HowTo/Software blocks render once each, no duplicates from the old shell path.
5. `/for-medical` still: in sitemap (it's ROUTE_META-driven — don't touch), canonical to itself, `headerWidth="container"`, breadcrumbs render.
6. Grep for leftover imports of the removed `'for-medical'` searchLandingPages entry.
7. Do not commit/push — Kirill decides after visual review. After ship: re-request indexing for `/for-medical` in GSC (it's already in `GSC_INDEXING_QUEUE.md`).

## 8. Explicitly out of scope

- `/for-accountants`, `/for-legal` rebuilds (next iteration, on this skeleton).
- Localization of this page.
- App-side changes (zush-app repo).
- Online-renamer tie-ins (excluded by Kirill earlier).
