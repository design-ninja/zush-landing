import type { ImageMetadata } from 'astro';
import { SITE_ORIGIN } from '@/seo/config';

// Open Graph cards rendered by `pnpm og:images` (scripts/og-images): one per
// post and locale, keyed by the post's own slug.
const ogImageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/blog-og/*.jpg',
  { eager: true },
);

const BLOG_OG_IMAGES = Object.fromEntries(
  Object.entries(ogImageModules).map(([filePath, module]) => [
    filePath.split('/').pop()?.replace(/\.jpg$/, ''),
    module.default,
  ]),
) as Record<string, ImageMetadata>;

/** Absolute URL of the post's share card; undefined falls back to the site card. */
export function getBlogOgImageUrl(slug: string): string | undefined {
  const image = BLOG_OG_IMAGES[slug];
  return image ? new URL(image.src, SITE_ORIGIN).href : undefined;
}
