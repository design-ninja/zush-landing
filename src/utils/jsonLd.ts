import type { BlogPost, FAQItem } from '@/data/blog';
import { toIsoDateTime } from '@/seo/config';
import { APP_STORE_URL, HOMEBREW_CASK_URL, MAC_INSTALLER_URL, WINDOWS_STORE_URL } from '@/constants';
import { PRIMARY_AUTHOR } from '@/data/author';

const SITE_ORIGIN = 'https://zushapp.com';

export function buildBlogPostingJsonLd(
  post: BlogPost,
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
      '@id': `${PRIMARY_AUTHOR.url}#person`,
      name: PRIMARY_AUTHOR.name,
      alternateName: PRIMARY_AUTHOR.alternateName,
      url: PRIMARY_AUTHOR.url,
      sameAs: PRIMARY_AUTHOR.sameAs,
      image: PRIMARY_AUTHOR.image,
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
    description: 'Free tier with 50 AI renames',
  },
  {
    name: 'Zush PRO Monthly',
    price: '8',
    priceCurrency: 'USD',
    description: 'Monthly subscription. Unlimited PRO renames plus BYOK and Offline AI mode.',
  },
  {
    name: 'Zush PRO One-Time',
    price: '38',
    priceCurrency: 'USD',
    description: 'One-time purchase. Unlimited PRO renames plus BYOK and Offline AI mode.',
  },
];

function buildSoftwareApplicationJsonLd(data: SoftwareApplicationData) {
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
    operatingSystem: data.operatingSystem ?? ['macOS 15.0+', 'Windows 10', 'Windows 11'],
    downloadUrl: data.downloadUrl ?? [MAC_INSTALLER_URL, APP_STORE_URL, HOMEBREW_CASK_URL, WINDOWS_STORE_URL],
    ...(data.installUrl
      ? { installUrl: data.installUrl }
      : { installUrl: [APP_STORE_URL, HOMEBREW_CASK_URL, WINDOWS_STORE_URL] }),
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

export interface FeaturePageJsonLdData {
  howTo: {
    name: string;
    description: string;
    steps: HowToStepData[];
  };
  faqItems: FAQItem[];
  software: SoftwareApplicationData;
}

export function buildFeaturePageJsonLd(data: FeaturePageJsonLdData) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
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
      buildSoftwareApplicationJsonLd(data.software),
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
  speakableSelectors?: string[];
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
    isPartOf: {
      '@type': 'WebSite',
      name: 'Zush',
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zush',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.png`,
      },
    },
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
