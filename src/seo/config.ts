import type { BlogFrontmatter } from '@/utils/frontmatter';
import { HOME_FAQ_DATA } from '@/data/homeFaq';

export const SITE_ORIGIN = 'https://zushapp.com';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export interface SeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  robots: 'index, follow' | 'noindex, nofollow';
  ogType?: 'website' | 'article';
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

type RouteSeoMeta = Omit<SeoMeta, 'canonicalPath'>;

const DEFAULT_META: RouteSeoMeta = {
  title: 'Zush — AI File Renamer for Mac | Rename Screenshots, PDFs, and Photos',
  description:
    'Zush is the AI file renamer for Mac that turns screenshots, PDFs, documents, and photos into searchable filenames. Batch rename, monitor folders, and stay organized automatically.',
  robots: 'noindex, nofollow',
  ogType: 'website',
};

const ROUTE_META: Record<string, RouteSeoMeta> = {
  '/': {
    ...DEFAULT_META,
    robots: 'index, follow',
  },
  '/changelog': {
    title: 'Changelog — Zush',
    description:
      'Track all updates, new features, and improvements to Zush, the AI-powered file organizer for macOS.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/byok-setup': {
    title: 'BYOK Setup Guide — Zush',
    description:
      'Learn how to set up Bring Your Own Key (BYOK) in Zush with Gemini, Groq, OpenAI, or Claude for unlimited AI file processing.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Zush',
    description:
      "Read Zush's privacy policy. Learn how we handle your data, file content, and personal information.",
    robots: 'index, follow',
    ogType: 'website',
  },
  '/terms-of-service': {
    title: 'Terms of Service — Zush',
    description:
      "Read Zush's terms of service for using our AI-powered file organization app for macOS.",
    robots: 'index, follow',
    ogType: 'website',
  },
  '/refund-policy': {
    title: 'Refund Policy — Zush',
    description:
      "Zush's refund policy. Money-back guarantee details for our AI file organizer.",
    robots: 'index, follow',
    ogType: 'website',
  },
  '/blog': {
    title: 'AI File Renaming Tips, Guides & Insights — Zush Blog',
    description:
      'Practical guides on AI-powered file organization for macOS. Learn about smart renaming, batch processing, metadata tagging, and workflow automation with Zush.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/methodology': {
    title: 'Methodology & Benchmarks — Zush',
    description:
      'See how Zush evaluates AI file renaming quality: scoring rubric, benchmark protocol, review standards, and update cadence.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-file-renamer': {
    title: 'AI File Renamer for Mac — Auto Rename Files | Zush',
    description:
      'AI file renamer for Mac built for screenshots, PDFs, documents, and photos. Zush gives you content-aware names, batch processing, folder monitoring, and rollback in one workflow.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/auto-rename-files': {
    title: 'Auto Rename Files on Mac with Folder Monitoring | Zush',
    description:
      'Automatically rename new files on Mac with AI-powered folder monitoring. Zush watches downloads, screenshots, and project folders, then applies descriptive names as files arrive.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-documents-with-ai': {
    title: 'AI Document Renamer for Mac | Rename Documents with AI | Zush',
    description:
      'Rename documents with AI on Mac. Zush reads PDF, DOCX, XLSX, and other business files, then generates descriptive filenames based on document content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-pdf-with-ai': {
    title: 'AI PDF Renamer for Mac | Rename PDF Files with AI | Zush',
    description:
      'Rename PDF files with AI on Mac. Zush extracts text from invoices, contracts, scans, and reports to generate clear, searchable filenames automatically.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-screenshots-with-ai': {
    title: 'AI Screenshot Renamer for Mac | Rename Screenshots with AI | Zush',
    description:
      'Rename screenshots with AI on Mac. Zush replaces generic macOS screenshot names with descriptive filenames and can auto-rename new captures with folder monitoring.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-photos-with-ai': {
    title: 'AI Photo Renamer for Mac | Rename Photos with AI | Zush',
    description:
      'Rename photos with AI on Mac. Zush analyzes HEIC, RAW, JPG, and other image files to generate descriptive filenames for searchable photo libraries.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-image-renamer': {
    title: 'AI Image Renamer for Mac | Rename Photos, Screenshots, and Images | Zush',
    description:
      'AI image renamer for Mac for photos, screenshots, downloads, and design assets. Supports 23 image formats, batch renaming, folder monitoring, and smart Finder metadata.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/thank-you': DEFAULT_META,
  '/recover': DEFAULT_META,
  '/activate': DEFAULT_META,
  '/manage-subscription': DEFAULT_META,
};

export const PRIVATE_ROUTES = [
  '/thank-you',
  '/recover',
  '/activate',
  '/manage-subscription',
] as const;

export const INDEXABLE_STATIC_ROUTES = Object.keys(ROUTE_META).filter(
  (route) => !PRIVATE_ROUTES.includes(route as (typeof PRIVATE_ROUTES)[number]),
);

export const FEATURE_ROUTES = [
  '/ai-file-renamer',
  '/auto-rename-files',
  '/ai-image-renamer',
  '/rename-documents-with-ai',
  '/rename-pdf-with-ai',
  '/rename-screenshots-with-ai',
  '/rename-photos-with-ai',
] as const;

export function normalizePath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path;
}

export function getCanonicalUrl(pathname: string): string {
  const path = normalizePath(pathname);
  return `${SITE_ORIGIN}${path === '/' ? '/' : path}`;
}

export function toIsoDateTime(value?: string): string | undefined {
  if (!value) return value;
  if (value.includes('T')) return value;
  return `${value}T00:00:00Z`;
}

export function getSeoForPath(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  const routeMeta = ROUTE_META[path] || DEFAULT_META;

  return {
    ...routeMeta,
    canonicalPath: path,
  };
}

const THIN_CONTENT_THRESHOLD = 350;

export function getBlogSeo(post: BlogFrontmatter): SeoMeta {
  const isThinContent = post.wordCount < THIN_CONTENT_THRESHOLD;

  return {
    title: `${post.title} — Zush Blog`,
    description: post.description,
    canonicalPath: `/blog/${post.slug}`,
    robots: isThinContent ? 'noindex, nofollow' : 'index, follow',
    ogType: 'article',
    publishedTime: toIsoDateTime(post.date),
    modifiedTime: toIsoDateTime(post.reviewedAt || post.date),
  };
}

export { THIN_CONTENT_THRESHOLD };

export const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'Zush',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.png`,
      },
      email: 'support@zushapp.com',
      sameAs: [
        'https://x.com/zush_app',
        'https://www.youtube.com/@zushapp',
        'https://www.producthunt.com/products/zush',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: 'Zush',
      publishingPrinciples: `${SITE_ORIGIN}/methodology`,
      publisher: {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '[class*="Hero__Subtitle"]', '#faq'],
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_ORIGIN}/#software`,
      name: 'Zush',
      description:
        'AI-powered file organization app for macOS. Automatically renames images, PDFs, and documents using advanced AI with smart metadata and folder monitoring.',
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'File Management',
      operatingSystem: 'macOS 14.0+',
      softwareVersion: '1.9.0',
      downloadUrl: `${SITE_ORIGIN}/releases/Zush.dmg`,
      screenshot: `${SITE_ORIGIN}/og-image.png`,
      offers: [
        {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 AI renames per month',
        },
        {
          '@type': 'Offer',
          price: '10',
          priceCurrency: 'USD',
          name: 'Zush PRO',
          description: 'One-time purchase. 10,000 AI renames + all features + BYOK for unlimited use.',
        },
      ],
      featureList: [
        'AI-powered file renaming',
        'Automatic folder monitoring',
        'Smart metadata extraction',
        'Custom naming patterns',
        'Batch rename support',
        'RAW format support',
        'PDF and document analysis',
        '60+ language support',
        'Bring Your Own Key (BYOK)',
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'meta[name="description"]'],
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE_ORIGIN}/#howto`,
      name: 'How to Rename Files with AI on macOS',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Download Zush',
          text: 'Install Zush on your Mac. No account required.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Add files or a watched folder',
          text: 'Drag and drop files, or configure folder monitoring.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Apply AI generated names',
          text: 'Review suggested names and apply with one click.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_ORIGIN}/#faq`,
      mainEntity: HOME_FAQ_DATA.map((item) => ({
        '@type': 'Question' as const,
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer' as const,
          text: item.answer,
        },
      })),
    },
  ],
};
