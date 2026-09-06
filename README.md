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

Install dependencies without exposing any secrets to lifecycle scripts:

```bash
pnpm install
```

Run commands through the checked-in 1Password Environment wrapper. Python 3
with `python-dotenv >= 1.1.2` is required. Profile names in `--env-file` select
entries in `scripts/environment-profiles.json`; no reference files or `op run`
are used. Values are read from virtual FIFO mounts into the child process:

| Profile | Environment | Mount |
| --- | --- | --- |
| `.env.1password` | Zush Production (public values only) | `.secrets/production.env` |
| `.env.1password.operations` | Zush Production + Zush MCP | `.secrets/{production,mcp}.env` |
| `.env.1password.sandbox` / `.env.1password.local` / `.env.1password.legacy-stripe-sandbox` | Zush Sandbox | `.secrets/sandbox.env` |

Register only the mounts needed for your commands inside this Landing checkout
through Developer → Environments in 1Password. The default production profile
needs only `.secrets/production.env`; cloning `zush-app` is not required.
Existing setups reuse `../zush-app/.secrets/` only when the corresponding local
mount is absent. A local read failure never falls back to another Environment.
Explicit `ZUSH_PRODUCTION_ENV_FILE`, `ZUSH_SANDBOX_ENV_FILE`, or
`ZUSH_MCP_ENV_FILE` paths take precedence over both locations.
Profiles select only their required variables. The distinct Landing Paddle
credential is stored as `LANDING_PADDLE_API_KEY` and mapped to `PADDLE_API_KEY`
for operations. Sandbox/local generated values use the `LOCAL_` prefix.
Update credentials in Environments; retired App/Landing vaults are not used.

```bash
./scripts/with-1password.sh -- pnpm dev # Production values; no Sandbox access needed

./scripts/with-1password.sh \
  --env-file .env.1password \
  --env-file .env.1password.local \
  -- pnpm dev

./scripts/with-1password.sh \
  --env-file .env.1password.sandbox \
  -- pnpm dev:sandbox
```

The default `.env.1password` profile exposes only public website runtime values.
Use `.env.1password.operations` explicitly for trusted operational scripts; do
not run package installation or untrusted npm/pnpm scripts with that profile.

Useful commands:

```bash
./scripts/with-1password.sh -- pnpm build # Production build
./scripts/with-1password.sh --env-file .env.1password.sandbox -- pnpm build:sandbox
pnpm preview     # Preview built site
pnpm lint        # ESLint
pnpm check:astro # Astro + TS diagnostics
```

Run the full SEO gate through the matching production or sandbox profile.

### Local MCP servers

GSC, Google Ads, and Paddle MCP launchers serve discovery from checked-in
metadata in `scripts/mcp-catalogs/` through `scripts/lazy-mcp.mjs` and the official
MCP SDK. Opening a Codex chat, initializing MCP, listing tools/resources/prompts,
and pinging do not read 1Password or launch authenticated backends. The first
actual tool call (or resource/prompt read) starts only that service through its
`*-mcp-backend` launcher. Later calls in the same MCP session reuse it; closing
the session stops it. Failed calls are never automatically replayed.

The backend launchers read the `Zush MCP` 1Password
Environment mounted at `.secrets/mcp.env` (or the existing shared
`../zush-app/.secrets/mcp.env` when no local mount exists). Set
`ZUSH_MCP_ENV_FILE` to use another mount path. Each launcher passes only its own variables to its MCP.
Python 3 with `python-dotenv >= 1.1.2` is required (already installed locally).
Paddle MCP is pinned in `pnpm-lock.yaml`; install packages without secrets. GSC also
requires Python `certifi` (`python3 -m pip install certifi`, preferably in your
Python virtual environment). Its backend uses certifi's CA bundle unless
`SSL_CERT_FILE` or `SSL_CERT_DIR` is already configured; HTTPS verification stays
enabled, including for OAuth refresh requests.

In 1Password, open Developer → Environments → Zush MCP → Local .env file and
enable the mount. Authorize the first read; access remains authorized until
1Password locks. The loader serializes reads across processes using a sibling
`.lock` file, which contains no secrets. It requires a FIFO and never writes
resolved values to persistent files or evaluates them as shell commands. Google Ads
uses a temporary credential file on a RAM disk, removed when its process exits. Keep the mounted
file out of file watchers and editors to avoid competing reads.

The profiles `.env.1password.paddle-mcp`, `.env.1password.gsc`, and
`.env.1password.google-ads-mcp` share that mount and expose only each server's
variables. Environment values are independent: when rotating a key used by
both application workflows and MCP, update both Environments. Missing mounts
fail explicitly when the service is first used. Set `tool_timeout_sec = 180`
for `paddle`, `gsc`, and `google-ads-mcp` in the local Codex configuration so
first-use authorization has time to complete; the Environment loader still
waits up to 90 seconds. This does not change 1Password's lock/authorization policy.
Existing chats keep their already-started servers until they reconnect.

Catalogs contain only tool/resource descriptions and schemas, never credentials
or API responses. Paddle advertises its existing 70 non-destructive tools; the
real backend's configured tool filter is checked again before a call. After
upgrading a backend, regenerate and review metadata without secrets:

```bash
node scripts/update-mcp-catalogs.mjs
node scripts/update-mcp-catalogs.mjs --check
node --test scripts/tests/lazy-mcp.test.mjs
```

The generator only initializes the installed servers and lists metadata. Paddle
uses a non-working placeholder key; GSC/Google Ads discovery needs no credentials.
No Environment wrappers or remote API tools are invoked during generation.

Verify the FIFO loader without real secrets:

```bash
python3 scripts/tests/test-environment.py
```

```bash
./scripts/gsc-mcp
./scripts/google-ads-mcp
./scripts/paddle-mcp
```

### Paddle build safety

`pnpm build` runs `pnpm check:paddle-env` before Astro. Production builds must
resolve Paddle to `production`, use a `live_` client token, and keep the expected
production price IDs. This catches accidental `.env.local` sandbox values before they are
compiled into the public assets.

Sandbox Paddle values live in the shared `Zush Sandbox` 1Password
Environment and are selected by `.env.1password.sandbox`. They are injected only for
explicit sandbox commands.

For deliberate local sandbox runs:

```bash
./scripts/with-1password.sh --env-file .env.1password.sandbox -- pnpm dev:sandbox
./scripts/with-1password.sh --env-file .env.1password.sandbox -- pnpm build:sandbox
# or, for the full local gate:
./scripts/with-1password.sh --env-file .env.1password.sandbox -- pnpm check:seo:sandbox
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
