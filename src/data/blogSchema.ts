import { z } from 'astro/zod';
import { LOCALES, type Locale } from '@/i18n/config';

const BLOG_PLATFORM_VALUES = ['general', 'mac', 'windows'] as const;
export type BlogPlatform = (typeof BLOG_PLATFORM_VALUES)[number];

/**
 * Locales a blog post can be authored in. English is the default and the only
 * locale that appears in the blog index, archive, tag pages, and search index.
 * Adding a locale here is deliberately a one-line change — the routing, hreflang,
 * and sitemap machinery is locale-agnostic.
 */
const BLOG_LOCALE_VALUES = LOCALES;
export type BlogLocale = Locale;

const BLOG_TOPIC_VALUES = [
  'ai-renaming',
  'automation',
  'organization',
  'photos',
  'videos',
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
      'Platform-neutral explainers, naming rules, comparisons, and AI file renaming workflows for desktop setups',
    ctaHref: '/',
    ctaLabel: 'See the full app',
  },
  mac: {
    title: 'Mac Guides',
    description:
      'Finder, Automator, Spotlight, screenshots, audio, videos, photos, and buyer-intent workflows for Mac users',
    ctaHref: '/mac',
    ctaLabel: 'View Zush for Mac',
  },
  windows: {
    title: 'Windows Guides',
    description:
      'File Explorer, Microsoft Store, Windows Search, screenshots, audio, videos, PDFs, downloads, and folder-monitoring workflows for Windows',
    ctaHref: '/windows',
    ctaLabel: 'View Zush for Windows',
  },
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
  locale: z.enum(BLOG_LOCALE_VALUES).default('en'),
  /**
   * For a non-English post: the English `slug` this post translates. Required in
   * practice — `assertTranslationIntegrity` in src/data/blog.ts throws at build
   * time when it is missing, points at an unknown English slug, or collides with
   * another translation into the same locale.
   */
  translationOf: z.string().optional(),
});
