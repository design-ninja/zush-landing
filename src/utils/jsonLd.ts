import type { BlogFrontmatter, FAQItem } from './frontmatter'

const SITE_ORIGIN = 'https://zushapp.com'

export function buildBlogPostingJsonLd(post: BlogFrontmatter) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.reviewedAt || post.date,
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: 'https://lirik.pro/en',
      sameAs: ['https://lirik.pro/en'],
      image: `${SITE_ORIGIN}/images/authors/lirik.jpg`,
      worksFor: {
        '@type': 'Organization',
        name: 'Zush',
        url: SITE_ORIGIN,
      },
    },
    ...(post.reviewerName ? {
      editor: {
        '@type': 'Person',
        name: post.reviewerName,
      },
    } : {}),
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
      '@id': `${SITE_ORIGIN}/blog/${post.slug}`,
    },
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
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
  }
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
  }
}

export function buildBreadcrumbJsonLd(postTitle: string, postSlug: string) {
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
        item: `${SITE_ORIGIN}/blog/${postSlug}`,
      },
    ],
  }
}

export function buildFeatureBreadcrumbJsonLd(pageTitle: string, pagePath: string) {
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
  }
}
