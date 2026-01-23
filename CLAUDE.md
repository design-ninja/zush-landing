# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for Zush — an AI-powered image organization app for macOS. Built with React 19, TypeScript, Vite 7, and SCSS Modules.

## Commands

```bash
pnpm install      # Install dependencies
pnpm run dev      # Start dev server (Vite)
pnpm run build    # Production build
pnpm run preview  # Preview production build
pnpm run lint     # ESLint
```

## Architecture

### Routing & Pages

`App.tsx` uses React Router with lazy-loaded pages. Home page loads immediately; secondary pages (Legal, Changelog, ThankYou, Recover, Activate, ManageSubscription, Upgrade) are lazy-loaded with Suspense.

### Styling System

SCSS Modules with CSS custom properties for theming:

- **`src/styles/_variables.scss`** — Design tokens (colors in OKLCH, typography, spacing, radii, shadows)
- **`src/styles/_theme.scss`** — CSS custom properties for light/dark mode (`[data-theme='dark']`)
- **`src/styles/_mixins.scss`** — Responsive mixins (`@include mobile`, `@include tablet`, `@include small`), `container`, `glass-morphism`, `shadow($type)`, `corner-shape-squircle`
- **`src/styles/_breakpoints.scss`** — Breakpoints: `$breakpoint-sm: 640px`, `$breakpoint-md: 768px`, `$breakpoint-lg: 960px`

Use CSS variables (e.g., `var(--primary)`, `var(--background)`) for theme-aware colors.

### Path Alias

`@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).

### Constants

`src/constants.ts` contains app configuration: download URL, support email, pricing tiers with Paddle price IDs, credit packs, and app config values.

### Hooks

- `useTheme` — Light/dark theme toggle
- `useIsMobile` — Mobile viewport detection
- `useCheckoutAutoOpen` — Auto-open checkout from URL params
- `useRemoteConfig` — Fetch remote configuration

## Conventions

- Component files use `.module.scss` for styles
- Legal pages render markdown from `src/content/`
- Images optimized via `vite-plugin-image-optimizer`
- Framer Motion for animations
