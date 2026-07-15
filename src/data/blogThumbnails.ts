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

const BLOG_THUMBNAIL_ALIASES: Record<string, string> = {
  'automate-file-organization-windows': 'auto-rename-files-windows-guide',
  'batch-rename-dropbox-files': 'organize-client-files-freelancers-mac',
  'batch-rename-google-drive-files': 'cloud-vs-local-ai-file-renaming',
  'rename-organize-icloud-drive-files': 'automate-file-organization-macos',
  'zush-vs-bulk-rename-utility': 'bulk-rename-utility-alternatives',
  'zush-vs-sparkle': 'best-ai-file-renamer-tools-2026',
};

export function getBlogThumbnail(slug: string): ImageMetadata {
  const thumbnail = BLOG_THUMBNAILS[slug] ?? BLOG_THUMBNAILS[BLOG_THUMBNAIL_ALIASES[slug]];

  if (!thumbnail) {
    throw new Error(`Missing blog thumbnail for slug: ${slug}`);
  }

  return thumbnail;
}

export function getBlogThumbnailAlt(title: string): string {
  return `${title} abstract blog thumbnail`;
}
