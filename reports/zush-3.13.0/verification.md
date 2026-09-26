# Zush 3.13.0 landing update — verification

Verified locally on 2026-09-26. Changes are not deployed.

- Updated home, Mac/Windows landing content and related organizing pages across 12 locales. Both platform pages present the new capabilities without version or platform availability notices, as requested.
- Added two article families (24 routes) and two English documentation guides, with updates to related existing guides. Documentation follows the site's existing English-only structure.
- Fixture screenshots: folder sorting, custom folder rules, and the Templates import/export menu, each in light and dark appearance. Used the requested Golden Gate wallpapers and six copies from Files 2. No personal Finder content is shown.
- Verified all six source images and 36 responsive variants.
- Every new article has a single H1, its own canonical URL, all 12 language alternates plus x-default, and a feature screenshot. Expanded short translations to avoid the site's automatic thin-content noindex rule.
- Production build passed. Astro: 332 files, zero errors, warnings, or hints. ESLint passed.
- Localization sources, blog translation coverage, locale fallbacks, localized landings, and product facts checks passed.
- HTML smoke check: 470 sitemap URLs passed. Internal links: 596 HTML files passed. Five existing title-length advisories remain on unrelated pages.
- Browser checks covered desktop/mobile, light/dark, RTL Arabic, and the German Windows page. Final section has a localized SEO heading, compact BETA badge, static Auto/Custom explanations, and a labeled example prompt.
- Restarted the confirmed local Astro server on port 4321 after the final build. Verified SmartBatchRenameVisual and FeatureSwitcher hydrate and display their visuals when scrolled into view.

See [changed-pages.md](changed-pages.md) for direct production URLs to review/reindex after publication.
