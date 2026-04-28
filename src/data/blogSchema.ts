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
  'local-ai',
] as const;
export type BlogTopic = (typeof BLOG_TOPIC_VALUES)[number];

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
      'Platform-neutral explainers, naming rules, comparisons, and AI file renaming workflows that apply across desktop setups',
    ctaHref: '/',
    ctaLabel: 'See the full app',
  },
  mac: {
    title: 'Mac Guides',
    description:
      'Finder, Automator, Spotlight, screenshots, photos, and buyer-intent workflows for Mac users',
    ctaHref: '/mac',
    ctaLabel: 'View Zush for Mac',
  },
  windows: {
    title: 'Windows Guides',
    description:
      'File Explorer, Microsoft Store, Windows Search, screenshots, PDFs, downloads, and folder-monitoring workflows for Windows',
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

export const blogCollectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  slug: z.string(),
  tags: z.array(z.string()).default([]),
  tldr: z.string(),
  platform: z.enum(BLOG_PLATFORM_VALUES),
  topic: z.enum(BLOG_TOPIC_VALUES),
  featuredOrder: z.number().int().positive().optional(),
  author: z.string().optional(),
  reviewer: z.string().optional(),
  reviewed: z.coerce.date().optional(),
  noindex: z.coerce.boolean().optional(),
  canonical: z.string().optional(),
});
