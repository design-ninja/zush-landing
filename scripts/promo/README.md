# Promo Screenshot Scripts

## macOS

```sh
pnpm promo:feature-screenshots
```

The macOS capture defaults to the isolated local Debug backend. To recreate the
production-backed app state, pass the environment explicitly:

```sh
ZUSH_PROMO_BACKEND_ENVIRONMENT=prod pnpm promo:feature-screenshots --target=landing
```

The script passes that selection to both the launched app and every promo
fixture, so a fixture cannot reset the capture back to the local backend.

The `app-store` target writes ten light-theme, lossless PNG screenshots at
2880×1800 pixels to `../zush-assets/App Store` by default.

## Windows

Run this on Windows, because the script builds, launches, and captures the WinUI client:

```powershell
pnpm promo:windows-feature-screenshots
```

The Windows capture path is intentionally locked to the Debug app build. The app-side promo fixture is Debug-only and forces the UI into a Pro state for screenshots. The script also overrides Supabase settings to a local offline endpoint by default, so capture runs cannot register installs or usage in the production database.

The capture keeps the app window at its own default size. Landing and Store assets are created by scaling that captured window into the output canvas, not by resizing the live app window.

If `../zush-assets/#test files/Files` is unavailable, the script falls back to `zush-windows/test-assets/Files` and seeds any missing promo image/video files from local demo assets so thumbnails stay real instead of generic file icons.

The BYOK and Offline AI screenshots use real working inputs. For BYOK, the script reads a Gemini or OpenAI key from env and passes it only to the isolated Debug screenshot process. Gemini is preferred when both are available:

The script also loads `.env`, `env`, and `.env.local` from the `zush-windows` project root, plus `.env`, `env`, and `.env.sandbox` from the `zush-landing` project root before resolving these variables.

```powershell
$env:GEMINI_API_KEY = "..."
# or
$env:GOOGLE_API_KEY = "..."
# or
$env:OPENAI_API_KEY = "..."
```

You can override the promo provider explicitly:

```powershell
$env:ZUSH_WINDOWS_PROMO_AI_PROVIDER = "openai" # or "gemini"
$env:ZUSH_WINDOWS_PROMO_OPENAI_API_KEY = "..."
```

For Offline AI, the script checks `http://127.0.0.1:11434` and starts `ollama serve` if Ollama is installed but not already running. It uses `ZUSH_WINDOWS_PROMO_OLLAMA_MODEL` when set, otherwise `gemma3` if installed, otherwise the first installed local model.

By default it writes:

- Landing WebP files to `public/images/showcase/windows`, in both light and dark themes.
- Microsoft Store PNG files to `../zush-assets/Microsoft Store/Windows`, light theme only.

The Microsoft Store default is light-only because the current Windows tour mirrors the 10 macOS feature scenarios and Partner Center supports up to 10 desktop screenshots. Generating both themes for Store would produce 20 PNGs. Use `--theme=dark` to generate a dark Store set, or `--allow-store-overflow` for a non-upload working folder.

Useful options:

```powershell
pnpm promo:windows-feature-screenshots --only=batch-rename
pnpm promo:windows-feature-screenshots --target=landing --theme=dark
pnpm promo:windows-feature-screenshots --target=microsoft-store --theme=dark --output-dir="C:\tmp\zush-store-dark"
pnpm promo:windows-feature-screenshots --skip-build --app-exe="C:\path\to\Zush.Windows.App.exe"
```

If you want the app to talk to a local Supabase emulator during screenshot generation, point the promo backend URL at a loopback host:

```powershell
$env:ZUSH_WINDOWS_PROMO_SUPABASE_URL = "http://127.0.0.1:54321"
$env:ZUSH_WINDOWS_PROMO_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_local_key"
```

Wallpaper overrides:

```powershell
$env:ZUSH_WINDOWS_PROMO_LIGHT_WALLPAPER = "C:\path\to\windows-11-light.jpg"
$env:ZUSH_WINDOWS_PROMO_DARK_WALLPAPER = "C:\path\to\windows-11-dark.jpg"
```

Microsoft Store screenshot constraints reflected in the script: PNG, desktop screenshot at least `1366x768`, under `50 MB`; generated Store PNGs are `3840x2160`.
