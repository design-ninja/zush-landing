import type { BlogPost, FAQItem } from '@/data/blog';
import { toIsoDateTime } from '@/seo/config';
import { PRIMARY_AUTHOR } from '@/data/author';
import { ORGANIZATION_REF, SOFTWARE_REF, WEBSITE_REF } from '@/seo/entity';

const SITE_ORIGIN = 'https://zushapp.com';

export function buildBlogPostingJsonLd(
  post: BlogPost,
  pageUrl = `${SITE_ORIGIN}/blog/${post.slug}`,
  inLanguage = 'en',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    inLanguage,
    datePublished: toIsoDateTime(post.date),
    dateModified: toIsoDateTime(post.reviewedAt || post.date),
    author: {
      '@type': 'Person',
      '@id': `${PRIMARY_AUTHOR.url}#person`,
      name: PRIMARY_AUTHOR.name,
      alternateName: PRIMARY_AUTHOR.alternateName,
      url: PRIMARY_AUTHOR.url,
      sameAs: PRIMARY_AUTHOR.sameAs,
      image: PRIMARY_AUTHOR.image,
      worksFor: ORGANIZATION_REF,
    },
    ...(post.reviewerName
      ? {
          editor: {
            '@type': 'Person',
            name: post.reviewerName,
          },
        }
      : {}),
    publisher: ORGANIZATION_REF,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    url: pageUrl,
    wordCount: post.wordCount,
    keywords: post.tags.join(', '),
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_ORIGIN}/blog`,
      name: 'Zush Blog',
      publisher: ORGANIZATION_REF,
    },
  };
}

export function buildFAQPageJsonLd(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface HowToStepData {
  name: string;
  text: string;
}

export interface FeatureLandingPageData {
  pagePath: string;
  description: string;
  featureList: string[];
}

export interface FeaturePageJsonLdData {
  pageName?: string;
  inLanguage?: string;
  keywords?: string;
  howTo: {
    name: string;
    description: string;
    steps: HowToStepData[];
  };
  faqItems: FAQItem[];
  page: FeatureLandingPageData;
}

export function buildFeaturePageJsonLd(data: FeaturePageJsonLdData) {
  const pageUrl = `${SITE_ORIGIN}${data.page.pagePath}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: data.pageName ?? data.howTo.name,
        description: data.page.description,
        inLanguage: data.inLanguage ?? 'en',
        ...(data.keywords ? { keywords: data.keywords } : {}),
        isPartOf: WEBSITE_REF,
        publisher: ORGANIZATION_REF,
        mainEntity: SOFTWARE_REF,
        about: SOFTWARE_REF,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'meta[name="description"]'],
        },
      },
      {
        '@type': 'HowTo',
        name: data.howTo.name,
        description: data.howTo.description,
        step: data.howTo.steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'meta[name="description"]'],
        },
      },
      buildFAQPageJsonLd(data.faqItems),
    ],
  };
}

export interface HowToData {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStepData[];
}

export interface WebPageJsonLdData {
  pagePath: string;
  title: string;
  description: string;
  type?: 'WebPage' | 'CollectionPage' | 'TechArticle';
  dateModified?: string;
  inLanguage?: string;
  keywords?: string;
  speakableSelectors?: string[];
  mainEntityId?: string;
}

export interface BreadcrumbItemData {
  name: string;
  path?: string;
}

export interface ItemListEntryData {
  name: string;
  url: string;
  description?: string;
}

export function buildWebPageJsonLd(data: WebPageJsonLdData) {
  const pageUrl = `${SITE_ORIGIN}${data.pagePath}`;

  return {
    '@context': 'https://schema.org',
    '@type': data.type ?? 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: data.title,
    description: data.description,
    url: pageUrl,
    ...(data.dateModified ? { dateModified: toIsoDateTime(data.dateModified) } : {}),
    ...(data.inLanguage ? { inLanguage: data.inLanguage } : {}),
    ...(data.keywords ? { keywords: data.keywords } : {}),
    isPartOf: WEBSITE_REF,
    publisher: ORGANIZATION_REF,
    ...(data.mainEntityId
      ? {
          mainEntity: { '@type': 'SoftwareApplication', '@id': data.mainEntityId },
          about: { '@type': 'SoftwareApplication', '@id': data.mainEntityId },
        }
      : {}),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: data.speakableSelectors ?? ['h1', 'meta[name="description"]'],
    },
  };
}

export function buildPageBreadcrumbJsonLd(items: BreadcrumbItemData[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_ORIGIN}${item.path}` } : {}),
    })),
  };
}

export function buildItemListJsonLd(
  pagePath: string,
  name: string,
  items: ItemListEntryData[],
) {
  const pageUrl = `${SITE_ORIGIN}${pagePath}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#item-list`,
    name,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      item: {
        '@type': 'BlogPosting',
        headline: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
      },
    })),
  };
}

export function buildHowToJsonLd(data: HowToData, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    ...(data.totalTime ? { totalTime: data.totalTime } : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    step: data.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export interface BreadcrumbCrumb {
  name: string;
  item: string;
}

/**
 * Defaults to the English Home > Blog trail. Translated posts pass their own
 * trail, because there is no localized blog index to point the middle crumb at.
 */
export function buildBreadcrumbJsonLd(
  postTitle: string,
  pageUrl: string,
  trail: BreadcrumbCrumb[] = [
    { name: 'Home', item: SITE_ORIGIN },
    { name: 'Blog', item: `${SITE_ORIGIN}/blog` },
  ],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      ...trail.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      })),
      {
        '@type': 'ListItem',
        position: trail.length + 1,
        name: postTitle,
        item: pageUrl,
      },
    ],
  };
}

export function buildFeatureBreadcrumbJsonLd(
  pageTitle: string,
  pagePath: string,
  homeLabel = 'Home',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: SITE_ORIGIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageTitle,
        item: `${SITE_ORIGIN}${pagePath}`,
      },
    ],
  };
}
