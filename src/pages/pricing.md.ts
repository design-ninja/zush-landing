import {
  APP_CONFIG,
  MAC_APP_VERSION,
  PRODUCT_FACTS_REVIEWED_AT,
  SUPPORTED_FORMAT_COUNT,
  WINDOWS_APP_VERSION,
} from '@/constants';
import { SITE_ORIGIN } from '@/seo/config';

export function GET() {
  const body = `# Zush pricing and product facts

Last reviewed: ${PRODUCT_FACTS_REVIEWED_AT}

Canonical product page: ${SITE_ORIGIN}/

## Plans

- Free starter: $0; includes ${APP_CONFIG.free_tier_limit} AI renames; no credit card required. Templates, Naming Blocks, Custom AI Blocks, and custom AI prompts are included free.
- Zush PRO Monthly: $8 USD per month.
- Zush PRO One-Time: $38 USD as a one-time purchase.
- Both paid plans include unlimited PRO renames, BYOK, and Offline AI mode.
- Refund period: ${APP_CONFIG.refund_period_days} days, subject to the published refund policy at ${SITE_ORIGIN}/refund-policy.

## Current public versions

- macOS: ${MAC_APP_VERSION}; requires macOS ${APP_CONFIG.min_macos_version} ${APP_CONFIG.min_macos_name} or newer.
- Windows: ${WINDOWS_APP_VERSION}; supports Windows 10 and Windows 11.

## Product scope

- ${SUPPORTED_FORMAT_COUNT} supported file extensions across images, RAW photos, design files, PDFs, documents, video, and audio.
- Zush creates content-aware filenames and renames files in place. It does not move or sort files between folders.
- Users can review suggested names before applying them and restore original filenames from Activity history.
- Processing modes: managed cloud, BYOK with Gemini, Groq, OpenAI, or Claude, and Offline AI with local Ollama models for supported files.

## Verification links

- Product methodology: ${SITE_ORIGIN}/methodology
- About Zush: ${SITE_ORIGIN}/about
- Author: ${SITE_ORIGIN}/authors/kirill-isachenko
- Mac changelog: ${SITE_ORIGIN}/changelog
- Windows changelog: ${SITE_ORIGIN}/changelog/windows
- Privacy policy: ${SITE_ORIGIN}/privacy-policy
`;

  return new Response(body, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
