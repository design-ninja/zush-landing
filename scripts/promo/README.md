# Promo Demo Scripts

## Batch AI Rename

Records the Batch AI Rename feature through the real Zush app and OpenScreen CLI.

```bash
pnpm promo:batch-ai-rename -- --backend local --theme both --allow-ai-upload
```

To reuse an existing `/private/tmp/zush-promo/batch-ai-rename` recording and only regenerate the final assets:

```bash
pnpm promo:batch-ai-rename -- --render-only --theme both
```

Backends:

- `local`: builds/runs Debug Zush, sets `debug.backend.environment=local`, starts the existing Supabase CLI stack and serves the checked-in Edge Functions.
- `prod`: builds/runs Release Zush against the production backend.

The script does not create or mock backend behavior. It refuses to run analysis without `--allow-ai-upload` because Zush will send temporary copies of the demo files to the selected backend and AI provider.

For `--backend local`, the script temporarily aligns the local `app_config` AI provider with the production-style setup: Groq primary and Gemini fallback. It restores the previous local values on exit. Pass `--no-demo-ai-config` to record against the current local config unchanged.

Requirements: Docker, Supabase CLI stack from `zush-app`, the local OpenScreen fork with CLI support, `ffmpeg`, and ImageMagick (`magick`) for WebP posters.

Outputs:

- `/Users/lirik/Projects/zush/zush-assets/promo-videos/zush-batch-rename.mp4`
- `/Users/lirik/Projects/zush/zush-assets/promo-videos/zush-batch-rename-dark.mp4`
- matching `-story.mp4` vertical versions
- landing copies in `public/videos/` plus WebP posters

Landing renders are 2560x1440. Story renders are 1440x2560. The scenario clears OpenScreen zoom regions, uses square video corners, and optimizes MP4 output with x264 CRF 18.

During recording the script also switches the macOS system appearance to match the captured Zush theme, then restores the previous system appearance on exit. This matters for the dark Zush theme because macOS light/dark appearance changes the effective app colors.
