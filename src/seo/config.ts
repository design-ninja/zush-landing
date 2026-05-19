import type { BlogPost } from '@/data/blog';
import { APP_CONFIG, DOWNLOAD_URL } from '@/constants';

export const SITE_ORIGIN = 'https://zushapp.com';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export interface SeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

type RouteSeoMeta = Omit<SeoMeta, 'canonicalPath'>;

const DEFAULT_META: RouteSeoMeta = {
  title: 'Zush — Rename Files with AI on Mac & Windows',
  description:
    'Rename screenshots, design files, audio, videos, PDFs, photos, iWork and Office documents in seconds. Use templates, Naming Blocks, batch rename, or watch folders on Mac and Windows. Free for 50 files, no signup.',
  robots: 'noindex, nofollow',
  ogType: 'website',
};

const ROUTE_META: Record<string, RouteSeoMeta> = {
  '/': {
    ...DEFAULT_META,
    title: 'AI File Renamer & Batch Rename Tool for Mac & Windows — Zush',
    description: `AI batch rename for Mac & Windows. Rename screenshots, PDFs, photos, video, iWork and Office docs by file content. Watch folders, templates. ${APP_CONFIG.free_tier_limit} free files.`,
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
  '/ollama-setup': {
    title: 'Ollama Setup Guide — Zush',
    description:
      'Learn how to set up Ollama in Zush, choose recommended local AI models, and use Offline AI mode for supported files.',
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
      "Read Zush's terms of service for using our AI-powered file organization app for macOS and Windows.",
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
      'Practical guides on AI-powered file organization for Mac and Windows. Learn about smart renaming, batch processing, metadata tagging, and workflow automation with Zush.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/blog/archive': {
    title: 'Blog Archive — Zush',
    description:
      'Browse the full Zush blog archive: AI file renaming guides, comparisons, workflows, and platform-specific tutorials.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/methodology': {
    title: 'AI File Renaming Methodology & Benchmarks — Zush',
    description:
      'How Zush scores AI file renaming on Mac & Windows: 35% accuracy, 20% consistency, 15% automation, 15% safety, 15% fit. Reviewed monthly.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-pdf-with-ai': {
    title: 'Rename PDFs with AI · Invoices, Contracts, Scans · Zush',
    description:
      'Rename scanned PDFs, invoices, contracts, and tax forms by their actual content. Zush uses OCR + AI to turn scan_0042.pdf into signed-lease-2026-march.pdf.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-documents-with-ai': {
    title: 'Rename Documents with AI · Office, iWork, Text · Zush',
    description:
      'Rename DOCX, XLSX, PPTX, Pages, Numbers, Keynote, TXT, CSV, XML, YAML, subtitles, RTF, OpenDocument, and email files by their actual content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-design-files-with-ai': {
    title: 'Rename Design Files with AI · Figma, Sketch, AI, PSD · Zush',
    description:
      'Rename Sketch, Figma .fig, Adobe Illustrator .ai, and Photoshop .psd files by visual preview and project context.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-screenshots-with-ai': {
    title: 'Rename Screenshots with AI on Mac & Windows · Zush',
    description:
      'Replace Screenshot 2026-03-23 at 14.32.07.png with descriptive names like slack-conversation-project-update.png. Zush auto-names screenshots using AI vision.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-photos-with-ai': {
    title: 'Rename Photos with AI on Mac · HEIC, RAW, AVIF · Zush',
    description:
      'Stop renaming photos one by one. Zush reads HEIC, RAW, AVIF, JPG, SVG, TIFF, and more to generate descriptive names like sunset-pacific-beach.heic.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-videos-with-ai': {
    title: 'Rename Videos with AI · MP4, MOV, Screen Recordings · Zush',
    description:
      'Rename MP4, MOV, M4V, MPEG, 3GP, TS, MTS, M2TS, DV, and VOB videos with AI using sampled frames and subtitle context.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-audio-with-ai': {
    title: 'Rename Audio with AI · MP3, M4A, WAV, FLAC · Zush',
    description:
      'Rename MP3, M4A, WAV, FLAC, OGG, WebM, and MPGA audio files with AI using metadata, recognition, transcripts, templates, and Naming Blocks.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/mac': {
    title: 'AI File Renamer & Batch Rename Tool for Mac · Zush',
    description:
      'Batch rename files on Mac with AI, watch folders automatically, and rename screenshots, design files, PDFs, photos, audio, videos, iWork and Office documents by content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/windows': {
    title: 'AI File Renamer & Batch Rename Tool for Windows · Zush',
    description:
      'Batch rename files on Windows with AI, watch folders automatically, and rename screenshots, design files, PDFs, photos, audio, videos, iWork and Office documents by content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/thank-you': DEFAULT_META,
  '/recover': DEFAULT_META,
  '/activate': DEFAULT_META,
  '/manage-subscription': DEFAULT_META,
  '/manage-subscription/confirm': DEFAULT_META,
};

const PRIVATE_ROUTES = [
  '/thank-you',
  '/recover',
  '/activate',
  '/manage-subscription',
  '/manage-subscription/confirm',
] as const;

export const INDEXABLE_STATIC_ROUTES = Object.keys(ROUTE_META).filter(
  (route) => !PRIVATE_ROUTES.includes(route as (typeof PRIVATE_ROUTES)[number]),
);

export const FEATURE_ROUTES = [
  '/rename-pdf-with-ai',
  '/rename-design-files-with-ai',
  '/rename-documents-with-ai',
  '/rename-screenshots-with-ai',
  '/rename-photos-with-ai',
  '/rename-videos-with-ai',
  '/rename-audio-with-ai',
] as const;

function normalizePath(pathname: string): string {
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

export function getBlogSeo(post: BlogPost): SeoMeta {
  const isThinContent = post.wordCount < THIN_CONTENT_THRESHOLD;
  const shouldNoIndex = isThinContent || post.noindex === true;

  return {
    title: post.title,
    description: post.description,
    canonicalPath: post.canonical ? normalizePath(post.canonical) : `/blog/${post.slug}`,
    robots: shouldNoIndex ? 'noindex, nofollow' : 'index, follow',
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
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}/#webpage`,
      url: SITE_ORIGIN,
      name: 'Zush - AI File Renamer & Batch Rename Tool',
      description:
        'Zush is an AI file renamer and batch rename tool for Mac and Windows. It renames screenshots, design files, PDFs, photos, audio, videos, and documents by content with automatic folder monitoring, BYOK, and Offline AI mode.',
      isPartOf: {
        '@id': `${SITE_ORIGIN}/#website`,
      },
      about: {
        '@id': `${SITE_ORIGIN}/#software`,
      },
      mainEntity: {
        '@id': `${SITE_ORIGIN}/#software`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_ORIGIN,
          },
        ],
      },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_ORIGIN}/#software`,
      name: 'Zush',
      url: SITE_ORIGIN,
      mainEntityOfPage: {
        '@id': `${SITE_ORIGIN}/#webpage`,
      },
      description:
        'AI file renamer, batch rename tool, and automatic file organizer for macOS and Windows. Rename screenshots, design files, PDFs, photos, audio, videos, iWork and Office documents by content with smart metadata and folder monitoring.',
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'File Management',
      operatingSystem: ['macOS 15.0+', 'Windows 10', 'Windows 11'],
      softwareVersion: APP_CONFIG.app_version,
      downloadUrl: DOWNLOAD_URL,
      installUrl: 'https://apps.microsoft.com/detail/9ND4WVZSDQ3X',
      image: DEFAULT_OG_IMAGE,
      screenshot: [
        `${SITE_ORIGIN}/images/screenshots/light/zush-main-interface.webp`,
        `${SITE_ORIGIN}/images/showcase/windows-original/02-ai-rename-results.webp`,
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Free starter',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: SITE_ORIGIN,
          description: `Free tier with ${APP_CONFIG.free_tier_limit} AI renames`,
        },
        {
          '@type': 'Offer',
          price: '8',
          priceCurrency: 'USD',
          name: 'Zush PRO Monthly',
          availability: 'https://schema.org/InStock',
          url: `${SITE_ORIGIN}/#pricing`,
          description: 'Monthly subscription. Unlimited PRO renames, all features, BYOK, and Offline AI mode.',
        },
        {
          '@type': 'Offer',
          price: '38',
          priceCurrency: 'USD',
          name: 'Zush PRO One-Time',
          availability: 'https://schema.org/InStock',
          url: `${SITE_ORIGIN}/#pricing`,
          description: 'One-time purchase. Unlimited PRO renames, all features, BYOK, and Offline AI mode.',
        },
      ],
      featureList: [
        'AI-powered file renaming',
        'AI batch file renamer for mixed folders',
        'Bulk rename screenshots, design files, PDFs, photos, audio, videos, and documents',
        'Automatic folder monitoring',
        'Smart metadata extraction',
        'Custom naming patterns',
        'Batch rename support',
        'Video analysis with sampled frames and subtitles',
        'Design file support for Sketch, Figma, Illustrator, and PSD',
        'iWork support for Pages, Numbers, and Keynote',
        'RAW format support',
        'PDF and document analysis',
        '60+ language support',
        'Bring Your Own Key (BYOK)',
        'Offline AI mode - private local models via Ollama',
      ],
    },
  ],
};
