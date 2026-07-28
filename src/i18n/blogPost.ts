import type { BlogLocale } from '@/data/blogSchema';

/**
 * Chrome strings for the blog post page. Nav and footer are already localized
 * through `getCopy(locale)`; these are the post-specific labels that live in the
 * route template rather than in the MDX body.
 */
export interface BlogPostCopy {
  breadcrumbHome: string;
  breadcrumbBlog: string;
  tldrLabel: string;
  jumpToSection: string;
  onThisPage: string;
  reviewedPrefix: string;
  relatedArticles: string;
  readingTime: (minutes: number) => string;
  dateLocale: string;
}

const BLOG_POST_COPY: Record<BlogLocale, BlogPostCopy> = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'TL;DR:',
    jumpToSection: 'Jump to section',
    onThisPage: 'On this page',
    reviewedPrefix: 'Reviewed',
    relatedArticles: 'Related Articles',
    readingTime: (minutes) => `${minutes} min read`,
    dateLocale: 'en-US',
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'Kurz gesagt:',
    jumpToSection: 'Zum Abschnitt springen',
    onThisPage: 'Auf dieser Seite',
    reviewedPrefix: 'Geprüft am',
    relatedArticles: 'Weitere Artikel',
    readingTime: (minutes) => `${minutes} Min. Lesezeit`,
    dateLocale: 'de-DE',
  },
};

export function getBlogPostCopy(locale: BlogLocale): BlogPostCopy {
  return BLOG_POST_COPY[locale] ?? BLOG_POST_COPY.en;
}

/**
 * Label for the visible link to a post's counterpart, written in the language of
 * the page being linked *to* — a German reader landing on the English article
 * should recognise the invitation without reading English first.
 */
export const TRANSLATION_LINK_LABEL: Record<BlogLocale, string> = {
  en: 'Read in English',
  de: 'Auch auf Deutsch verfügbar',
};
