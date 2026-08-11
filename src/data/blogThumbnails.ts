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
  'automatically-rename-invoices-ai': 'rename-pdf-files-automatically',
  'best-ai-file-organizers-mac': 'automate-file-organization-macos',
  'best-photo-organizing-software-mac': 'best-ways-to-organize-photos-on-mac',
  'rename-scanned-documents-automatically': 'rename-pdf-files-automatically',
  'invoice-file-naming-convention': 'file-naming-conventions-best-practices',
  'how-to-organize-scanned-medical-records-small-practice': 'file-naming-conventions-best-practices',
  'legal-file-naming-conventions': 'file-naming-conventions-best-practices',
  'best-file-renamer-tools': 'best-ai-file-renamer-tools-2026',
  'how-to-safely-batch-rename-files': 'batch-rename-files-on-mac-complete-guide',
  'how-to-organize-invoices-and-receipts': 'organize-client-files-freelancers-mac',
  'how-to-organize-tax-documents': 'declutter-your-mac-file-cleanup-guide',
  'rename-invoices-for-quickbooks-xero': 'rename-pdf-files-automatically',
  'zush-vs-renamed-to': 'best-ai-file-renamer-tools-2026',
};

export function getBlogThumbnail(slug: string): ImageMetadata {
  const thumbnail = BLOG_THUMBNAILS[BLOG_THUMBNAIL_ALIASES[slug] ?? slug];

  if (!thumbnail) {
    throw new Error(`Missing blog thumbnail for slug: ${slug}`);
  }

  return thumbnail;
}
