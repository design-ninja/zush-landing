import { z } from 'astro/zod';

export const BLOG_PLATFORM_VALUES = ['general', 'mac', 'windows'] as const;
export type BlogPlatform = (typeof BLOG_PLATFORM_VALUES)[number];

export const BLOG_TOPIC_VALUES = [
  'ai-renaming',
  'automation',
  'organization',
  'photos',
  'screenshots',
  'documents',
  'comparisons',
  'naming',
  'seo',
  'formats',
  'search',
  'byok',
] as const;
export type BlogTopic = (typeof BLOG_TOPIC_VALUES)[number];

interface BlogTrackDefaults {
  platform: BlogPlatform;
  topic: BlogTopic;
}

export const BLOG_PLATFORM_LABELS: Record<BlogPlatform, string> = {
  general: 'General Guide',
  mac: 'Mac Guide',
  windows: 'Windows Guide',
};

export const BLOG_PLATFORM_META: Record<
  BlogPlatform,
  {
    title: string;
    description: string;
    ctaHref: string;
    ctaLabel: string;
  }
> = {
  general: {
    title: 'General Guides',
    description:
      'Platform-neutral explainers, naming rules, comparisons, and AI file renaming workflows that apply across desktop setups.',
    ctaHref: '/',
    ctaLabel: 'See the full app',
  },
  mac: {
    title: 'Mac Guides',
    description:
      'Finder, Automator, Spotlight, screenshots, photos, and buyer-intent workflows for Mac users.',
    ctaHref: '/mac',
    ctaLabel: 'View Zush for Mac',
  },
  windows: {
    title: 'Windows Guides',
    description:
      'File Explorer, Microsoft Store, Windows Search, screenshots, PDFs, downloads, and folder-monitoring workflows for Windows.',
    ctaHref: '/windows',
    ctaLabel: 'View Zush for Windows',
  },
};

export const BLOG_GUIDE_SLUGS: Record<BlogPlatform, string[]> = {
  general: [
    'best-ai-file-renamer-tools-2026',
    'rename-files-with-ai-guide',
    'file-naming-conventions-best-practices',
  ],
  mac: [
    'best-ai-file-renamer-tools-mac-compared',
    'auto-rename-files-mac-guide',
    'rename-screenshots-automatically-mac',
  ],
  windows: [
    'best-ai-file-renamer-tools-windows-compared',
    'rename-files-with-ai-windows-guide',
    'auto-rename-files-windows-guide',
  ],
};

const BLOG_POST_DEFAULTS: Record<string, BlogTrackDefaults> = {
  'ai-document-renamer-guide': { platform: 'general', topic: 'documents' },
  'ai-image-renamer-for-mac': { platform: 'mac', topic: 'ai-renaming' },
  'ai-image-tagging-vs-manual-photo-organization': { platform: 'mac', topic: 'photos' },
  'ai-photo-renamer-guide': { platform: 'mac', topic: 'photos' },
  'ai-renamer-mac': { platform: 'mac', topic: 'comparisons' },
  'auto-image-renamer-mac': { platform: 'mac', topic: 'automation' },
  'auto-rename-files-mac-guide': { platform: 'mac', topic: 'automation' },
  'automate-file-organization-macos': { platform: 'mac', topic: 'organization' },
  'batch-rename-files-on-mac-complete-guide': { platform: 'mac', topic: 'automation' },
  'best-ai-file-renamer-tools-2026': { platform: 'general', topic: 'comparisons' },
  'best-ai-file-renamer-tools-mac-compared': { platform: 'mac', topic: 'comparisons' },
  'best-ways-to-organize-photos-on-mac': { platform: 'mac', topic: 'photos' },
  'byok-ai-file-renaming-unlimited': { platform: 'general', topic: 'byok' },
  'declutter-your-mac-file-cleanup-guide': { platform: 'mac', topic: 'organization' },
  'digital-asset-management-designers-mac': { platform: 'mac', topic: 'organization' },
  'digital-photo-organization-mistakes-to-avoid': { platform: 'general', topic: 'photos' },
  'file-naming-conventions-best-practices': { platform: 'general', topic: 'naming' },
  'file-organization-tips-students-mac': { platform: 'mac', topic: 'organization' },
  'finder-tags-guide-organize-files-mac': { platform: 'mac', topic: 'search' },
  'folder-monitoring-automatic-file-renaming': { platform: 'general', topic: 'automation' },
  'heic-raw-image-management-guide-macos': { platform: 'mac', topic: 'formats' },
  'how-ai-image-recognition-works': { platform: 'general', topic: 'ai-renaming' },
  'how-to-organize-downloads-folder-mac': { platform: 'mac', topic: 'organization' },
  'how-to-rename-images-with-ai-on-macos': { platform: 'mac', topic: 'ai-renaming' },
  'image-file-formats-explained-complete-guide': { platform: 'general', topic: 'formats' },
  'image-seo-file-naming-for-better-rankings': { platform: 'general', topic: 'seo' },
  'macos-automator-rename-files-guide': { platform: 'mac', topic: 'automation' },
  'organize-client-files-freelancers-mac': { platform: 'mac', topic: 'organization' },
  'photo-management-workflow-photographers-mac': { platform: 'mac', topic: 'photos' },
  'rename-files-with-ai-free': { platform: 'general', topic: 'byok' },
  'rename-files-with-ai-guide': { platform: 'general', topic: 'ai-renaming' },
  'rename-pdf-files-automatically': { platform: 'general', topic: 'documents' },
  'rename-pdf-files-with-ai-mac': { platform: 'mac', topic: 'documents' },
  'rename-photos-for-social-media': { platform: 'general', topic: 'seo' },
  'rename-screenshots-automatically-mac': { platform: 'mac', topic: 'screenshots' },
  'screenshot-naming-conventions-macos': { platform: 'mac', topic: 'screenshots' },
  'why-your-photos-are-named-img-and-how-to-fix-it': { platform: 'general', topic: 'photos' },
};

export function getBlogTrackDefaults(slug: string): BlogTrackDefaults {
  return BLOG_POST_DEFAULTS[slug] ?? {
    platform: 'general',
    topic: 'ai-renaming',
  };
}

export const blogCollectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.union([z.string(), z.date()]),
  slug: z.string(),
  tags: z.union([z.string(), z.array(z.string())]),
  tldr: z.string(),
  platform: z.enum(BLOG_PLATFORM_VALUES).optional(),
  topic: z.enum(BLOG_TOPIC_VALUES).optional(),
  author: z.string().optional(),
  reviewer: z.string().optional(),
  reviewed: z.string().optional(),
  noindex: z.union([z.boolean(), z.enum(['true', 'false'])]).optional(),
  canonical: z.string().optional(),
});
