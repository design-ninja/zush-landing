import type { ImageMetadata } from 'astro';

const thumbnailModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/blog-thumbnails/*.webp',
  { eager: true },
);

const BLOG_THUMBNAILS = Object.fromEntries(
  Object.entries(thumbnailModules).map(([filePath, module]) => {
    const slug = filePath.split('/').pop()?.replace(/\.webp$/, '');

    if (!slug) {
      throw new Error(`Invalid blog thumbnail path: ${filePath}`);
    }

    return [slug, module.default];
  }),
) as Record<string, ImageMetadata>;

export function getBlogThumbnail(slug: string): ImageMetadata {
  const thumbnail = BLOG_THUMBNAILS[slug];

  if (!thumbnail) {
    throw new Error(`Missing blog thumbnail for slug: ${slug}`);
  }

  return thumbnail;
}

export function getBlogThumbnailAlt(title: string): string {
  return `${title} abstract blog thumbnail`;
}
