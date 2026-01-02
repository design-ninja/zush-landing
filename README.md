# Zush Landing Page

Landing page for [Zush](https://zushapp.com) — AI-powered image organization app for macOS.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** — build tool
- **SCSS Modules** — styling
- **React Router** — routing
- **Framer Motion** — animations

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Deployment

The site is deployed to GitHub Pages:

```bash
pnpm run deploy
```

This will build the project and push to `gh-pages` branch.

## Project Structure

```
src/
├── components/
│   ├── Button/          # Reusable button component
│   ├── Changelog/       # Version history (fetches from appcast.xml)
│   ├── Features/        # Features section
│   ├── FileShowcase/    # File cards animation
│   ├── Footer/          # Site footer
│   ├── Hero/            # Hero section
│   ├── Legal/           # Terms, Privacy, Refund pages
│   ├── Logo/            # Logo component
│   ├── Navbar/          # Navigation bar
│   └── Pricing/         # Pricing section
├── content/             # Markdown content for legal pages
├── hooks/               # Custom React hooks
├── styles/              # Global SCSS (variables, mixins, base)
└── App.tsx              # Main app with routing

public/
├── appcast.xml          # Sparkle update feed
├── downloads/           # App binaries (.zip)
├── CNAME                # Custom domain config
└── images/              # Static images
```

## Sparkle Integration

The `public/appcast.xml` file serves as the update feed for the macOS app via [Sparkle](https://sparkle-project.org/).

When releasing a new version:
1. Add the `.zip` binary to `public/downloads/`
2. Update `appcast.xml` with new version info
3. Deploy: `pnpm run deploy`

## License

MIT
