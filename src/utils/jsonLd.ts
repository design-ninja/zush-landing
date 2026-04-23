import type { BlogFrontmatter, FAQItem } from './frontmatter';
import { toIsoDateTime } from '@/seo/config';
import { DOWNLOAD_URL, WINDOWS_STORE_URL } from '@/constants';

const SITE_ORIGIN = 'https://zushapp.com';

export function buildBlogPostingJsonLd(
  post: BlogFrontmatter,
  pageUrl = `${SITE_ORIGIN}/blog/${post.slug}`,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: toIsoDateTime(post.date),
    dateModified: toIsoDateTime(post.reviewedAt || post.date),
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: 'https://lirik.pro/en',
      sameAs: ['https://lirik.pro/en'],
      image: `${SITE_ORIGIN}/images/authors/lirik.png`,
      worksFor: {
        '@type': 'Organization',
        name: 'Zush',
        url: SITE_ORIGIN,
      },
    },
    ...(post.reviewerName
      ? {
          editor: {
            '@type': 'Person',
            name: post.reviewerName,
          },
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Zush',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.png`,
      },
    },
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
      publisher: {
        '@type': 'Organization',
        name: 'Zush',
        url: SITE_ORIGIN,
      },
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

export interface SoftwareOfferData {
  name?: string;
  price: string;
  priceCurrency?: string;
  description: string;
}

export interface SoftwareApplicationData {
  pagePath: string;
  description: string;
  featureList: string[];
  applicationSubCategory?: string;
  screenshot?: string;
  offers?: SoftwareOfferData[];
  operatingSystem?: string | string[];
  downloadUrl?: string;
  installUrl?: string;
}

const DEFAULT_SOFTWARE_OFFERS: SoftwareOfferData[] = [
  {
    name: 'Free',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier with 50 AI renames per month',
  },
  {
    name: 'Zush Pro',
    price: '10',
    priceCurrency: 'USD',
    description: 'One-time purchase. 10,000 AI renames plus BYOK support.',
  },
];

export function buildSoftwareApplicationJsonLd(data: SoftwareApplicationData) {
  const pageUrl = `${SITE_ORIGIN}${data.pagePath}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${pageUrl}#software`,
    name: 'Zush',
    url: pageUrl,
    description: data.description,
    applicationCategory: 'UtilitiesApplication',
    applicationSubCategory: data.applicationSubCategory ?? 'File Management',
    operatingSystem: data.operatingSystem ?? ['macOS 14.0+', 'Windows 10', 'Windows 11'],
    downloadUrl: data.downloadUrl ?? DOWNLOAD_URL,
    ...(data.installUrl ? { installUrl: data.installUrl } : { installUrl: WINDOWS_STORE_URL }),
    screenshot: data.screenshot ?? `${SITE_ORIGIN}/og-image.png`,
    offers: (data.offers ?? DEFAULT_SOFTWARE_OFFERS).map((offer) => ({
      '@type': 'Offer',
      ...(offer.name ? { name: offer.name } : {}),
      price: offer.price,
      priceCurrency: offer.priceCurrency ?? 'USD',
      description: offer.description,
    })),
    featureList: data.featureList,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'meta[name="description"]'],
    },
  };
}

export interface HowToData {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStepData[];
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

export function buildBreadcrumbJsonLd(postTitle: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_ORIGIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_ORIGIN}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: postTitle,
        item: pageUrl,
      },
    ],
  };
}

export function buildFeatureBreadcrumbJsonLd(
  pageTitle: string,
  pagePath: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
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
