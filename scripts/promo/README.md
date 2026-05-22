# Promo Screenshot Scripts

## macOS

```sh
pnpm promo:feature-screenshots
```

## Windows

Run this on Windows, because the script builds, launches, and captures the WinUI client:

```powershell
pnpm promo:windows-feature-screenshots
```

By default it writes:

- Landing WebP files to `public/images/showcase/windows`, in both light and dark themes.
- Microsoft Store PNG files to `../zush-assets/Microsoft Store/Windows`, light theme only.

The Microsoft Store default is light-only because the current Windows tour has seven features and Partner Center supports up to 10 desktop screenshots. Generating both themes for Store would produce 14 PNGs. Use `--theme=dark` to generate a dark Store set, or `--allow-store-overflow` for a non-upload working folder.

Useful options:

```powershell
pnpm promo:windows-feature-screenshots --only=batch-rename
pnpm promo:windows-feature-screenshots --target=landing --theme=dark
pnpm promo:windows-feature-screenshots --target=microsoft-store --theme=dark --output-dir="C:\tmp\zush-store-dark"
pnpm promo:windows-feature-screenshots --skip-build --app-exe="C:\path\to\Zush.Windows.App.exe"
```

Wallpaper overrides:

```powershell
$env:ZUSH_WINDOWS_PROMO_LIGHT_WALLPAPER = "C:\path\to\windows-11-light.jpg"
$env:ZUSH_WINDOWS_PROMO_DARK_WALLPAPER = "C:\path\to\windows-11-dark.jpg"
```

Microsoft Store screenshot constraints reflected in the script: PNG, desktop screenshot at least `1366x768`, under `50 MB`; generated Store PNGs are `3840x2160`.
