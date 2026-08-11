# Localization workflow

Translations are locale-owned content, not live machine translations. An English copy edit does not automatically update another locale.

When English content changes:

1. Update `src/i18n/localizedContent/<locale>.ts` for homepage or profession copy.
2. Update the matching localized MDX whose `translationOf` points to the changed English blog slug.
3. Preserve imports, code fences, link destinations, images, components, and protected product names.
4. Run:

   ```sh
   pnpm check:locale-fallbacks
   pnpm check:localized-landings
   pnpm check:blog-locales
   pnpm check:localization-sources
   pnpm check:astro
   ```

5. Only after every affected locale has been refreshed, acknowledge the new English source revision:

   ```sh
   node scripts/check-localization-source-revisions.mjs --write
   ```

The checks catch changed English source revisions, missing pages, likely English fallbacks, stale MDX structure, duplicate content IDs, untranslated long prose, broken Markdown links, and altered protected names. A native-language editorial pass is still required for substantive English rewrites.

Browser-language redirects remain disabled in `src/i18n/config.ts`. Users choose a locale explicitly; search engines discover indexable localized URLs through sitemap and hreflang clusters.
