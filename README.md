# Zush Landing

Marketing website for [Zush](https://zushapp.com), built with Astro and React islands.

## Tech Stack

- Astro 6
- React 19 + TypeScript
- SCSS modules
- Vercel adapter (`@astrojs/vercel`)
- PNPM 10

## Requirements

- Node.js 22+
- PNPM 10+

## Local Development

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm build        # Production build
pnpm preview      # Preview built site
pnpm lint         # ESLint
pnpm check:astro  # Astro + TS diagnostics
pnpm check:seo    # Full quality gates (astro + payments + build + html + links)
```

## CI and Quality Gates

GitHub Actions workflow: `.github/workflows/quality-gates.yml`

The `seo-and-payments` job runs:

```bash
pnpm install --frozen-lockfile
pnpm check:seo
```

`pnpm check:seo` includes:

- `check:astro`
- `check:payments`
- `build`
- `check:html`
- `check:links`

## Deployment (Main Branch)

- Production is deployed by Vercel from the `main` branch.
- Pull requests and feature branches get preview deployments.
- `gh-pages` deployment is no longer used.

## URLs and Redirects

Canonical routes and legacy URL redirects are maintained in `vercel.json` (for example, old `/rename-files-with-ai` -> `/ai-file-renamer`).

## Sparkle / Release Feed

`public/appcast.xml` is the Sparkle update feed for the macOS app, and release binaries live in `public/releases/`.

When publishing a new app release:

1. Add the new artifact(s) to `public/releases/`.
2. Update `public/appcast.xml` with the new version metadata and enclosure info.
3. Run `pnpm check:seo` locally.
4. Merge to `main` to ship via Vercel.

## License

MIT
