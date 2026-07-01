import type { BlogPost } from '@/data/blog';
import {
  APP_CONFIG,
  APP_STORE_URL,
  MAC_INSTALLER_URL,
  SUPPORTED_FORMAT_COUNT,
  WINDOWS_STORE_URL,
} from '@/constants';

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
  title: 'AI File Renamer & Organizer for Mac and Windows | Zush',
  description:
    'AI file renamer & organizer for Mac & Windows. Zush reads screenshots, PDFs, photos, video, audio, documents, and design files, then renames files by content.',
  robots: 'noindex, nofollow',
  ogType: 'website',
};

const ROUTE_META: Record<string, RouteSeoMeta> = {
  '/': {
    ...DEFAULT_META,
    title: 'AI File Renamer & Organizer for Mac and Windows | Zush',
    description:
      'AI file renamer & organizer for Mac & Windows. Zush reads screenshots, PDFs, photos, video, audio, documents, and design files, then renames files by content.',
    robots: 'index, follow',
  },
  '/batch-rename-files': {
    title: 'Batch Rename Files with AI | Batch Rename Tool | Zush',
    description:
      'Batch rename files with AI. Zush reads screenshots, PDFs, photos, video, audio, documents, and design files, then renames mixed folders by content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/offline-ai-file-renamer': {
    title: 'Offline AI File Renamer for Mac & Windows | Zush',
    description:
      'Offline AI file renamer for Mac and Windows. Zush uses local Ollama models to rename supported files by content with preview and undo.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/changelog': {
    title: 'Changelog — Zush',
    description:
      'Track all updates, new features, and improvements to Zush, the AI-powered file organizer for macOS.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/changelog/windows': {
    title: 'Windows Changelog — Zush',
    description:
      'Track Windows updates, Microsoft Store releases, new features, and improvements for Zush, the AI-powered file organizer for Windows.',
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
      "Read Zush's refund policy, including money-back guarantee details, eligibility, and support steps for the AI file organizer.",
    robots: 'index, follow',
    ogType: 'website',
  },
  '/blog': {
    title: 'AI File Renaming Tips, Guides & Insights — Zush Blog',
    description:
      'Practical guides on AI file renaming, batch processing, metadata, folder monitoring, and file organization workflows for Mac and Windows.',
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
  '/docs': {
    title: 'Zush Docs | AI File Renamer Guides for Mac and Windows',
    description:
      'Documentation for Zush AI file renaming on Mac and Windows: batch rename, folder monitoring, Templates, Naming Blocks, BYOK, Offline AI, metadata, and undo.',
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
    title: 'Rename PDF Files with AI | Content-Based PDF Renamer - Zush',
    description:
      'AI PDF renamer. Zush reads invoices, contracts, scans, receipts, and reports, then renames PDF files by content with searchable names.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-documents-with-ai': {
    title: 'Rename Documents with AI · Office, iWork, Text · Zush',
    description:
      'AI document renamer. Zush reads Office, iWork, text, CSV, XML, YAML, email, and subtitle files, then renames documents by content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-design-files-with-ai': {
    title: 'Rename Design Files with AI · Figma, Sketch, AI, PSD · Zush',
    description:
      'AI design file renamer. Zush reads Sketch, Figma, Illustrator, and Photoshop previews, then renames design files by content and project context.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-screenshots-with-ai': {
    title: 'Rename Screenshots Automatically on Mac & Windows | Zush',
    description:
      'AI screenshot renamer for Mac and Windows. Zush reads what each screenshot shows, then replaces timestamp names with searchable filenames.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-photos-with-ai': {
    title: 'AI Photo Organizer & Image Renamer for Mac | Zush',
    description:
      'AI photo renamer. Zush reads HEIC, RAW, AVIF, JPG, SVG, TIFF, and other images, then renames photos by content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-videos-with-ai': {
    title: 'Rename Videos with AI · MP4, MOV, Screen Recordings · Zush',
    description:
      'AI video renamer. Zush reads MP4, MOV, M4V, MPEG, MTS, VOB, subtitles, and sampled frames, then renames videos by content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-audio-with-ai': {
    title: 'Rename Audio with AI · MP3, M4A, WAV, FLAC · Zush',
    description:
      'AI audio file renamer. Zush reads MP3, M4A, WAV, FLAC, OGG, WebM, and MPGA metadata or transcripts, then renames audio by content.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/mac': {
    title: 'AI File Renamer for Mac | Rename Files by Content | Zush',
    description:
      `AI file renamer for Mac. Zush reads screenshots, PDFs, photos, video, audio, and design files, then renames files by content. ${SUPPORTED_FORMAT_COUNT} formats, preview, and undo.`,
    robots: 'index, follow',
    ogType: 'website',
  },
  '/windows': {
    title: 'AI File Renamer for Windows | Rename Files by Content | Zush',
    description:
      `AI file renamer for Windows. Zush reads screenshots, PDFs, photos, video, audio, and design files, then renames files by content. ${SUPPORTED_FORMAT_COUNT} formats and undo.`,
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
  '/batch-rename-files',
  '/offline-ai-file-renamer',
  '/rename-pdf-with-ai',
  '/rename-design-files-with-ai',
  '/rename-documents-with-ai',
  '/rename-screenshots-with-ai',
  '/rename-photos-with-ai',
  '/rename-videos-with-ai',
  '/rename-audio-with-ai',
] as const;

export const SEARCH_LANDING_ROUTES = [
  '/batch-rename-files',
  '/offline-ai-file-renamer',
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
        APP_STORE_URL,
        WINDOWS_STORE_URL,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: 'Zush',
      alternateName: 'Zush AI File Renamer',
      publishingPrinciples: `${SITE_ORIGIN}/methodology`,
      publisher: {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}/#webpage`,
      url: SITE_ORIGIN,
      name: 'AI File Renamer & Organizer for Mac and Windows | Zush',
      description:
        `Zush is an AI file renamer and organizer for Mac and Windows that renames ${SUPPORTED_FORMAT_COUNT} supported file formats by content, including screenshots, PDFs, photos, documents, videos, audio, and design files.`,
      keywords:
        'AI file renamer, AI file renamer and organizer, file renamer AI, rename files with AI, rename files by content, content-aware file renamer, smart AI file renamer, 100+ file formats, audio file renamer, video file renamer, file renamer for Mac, file renamer for Windows, batch rename tool, bulk rename files, automatic file organizer, AI file organizer, searchable filenames',
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
      dateModified: '2026-07-01',
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_ORIGIN}/#software`,
      name: 'Zush',
      alternateName: [
        'AI File Renamer',
        'AI File Renamer & Organizer',
        'File Renamer AI',
        'Smart AI File Renamer',
        'Content-Aware File Renamer',
        'Rename Files with AI',
        'Rename Files by Content',
        'Batch Rename Tool',
        'Batch Rename Tool for Mac and Windows',
        'File Renamer for Mac',
        'File Renamer for Windows',
        'AI Batch Rename Tool',
        'Bulk Rename Tool',
        'Automatic File Organizer',
        'AI File Organizer',
      ],
      url: SITE_ORIGIN,
      mainEntityOfPage: {
        '@id': `${SITE_ORIGIN}/#webpage`,
      },
      description:
        `AI file renamer and organizer, batch rename tool, bulk rename utility, and automatic file organizer for macOS and Windows. Rename ${SUPPORTED_FORMAT_COUNT} file formats by content, including screenshots, PDFs, photos, documents, videos, audio, and design files, with metadata, templates, folder monitoring, review, and undo.`,
      keywords:
        'AI file renamer, AI file renamer and organizer, file renamer AI, rename files with AI, rename files by content, content-aware file renamer, smart AI file renamer, 100+ file formats, mixed file renamer, audio file renamer, video file renamer, file renamer, file organizer, batch rename tool, batch rename files, bulk rename files, AI photo organizer, PDF renamer, photo renamer, document renamer, screenshot renamer, automatic file organizer, AI file organizer, searchable filenames, watch folder',
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'File Management',
      operatingSystem: ['macOS 15.0+', 'Windows 10', 'Windows 11'],
      softwareVersion: APP_CONFIG.app_version,
      downloadUrl: [MAC_INSTALLER_URL, APP_STORE_URL, WINDOWS_STORE_URL],
      installUrl: [APP_STORE_URL, WINDOWS_STORE_URL],
      sameAs: [
        APP_STORE_URL,
        WINDOWS_STORE_URL,
        'https://www.producthunt.com/products/zush',
        'https://www.youtube.com/@zushapp',
      ],
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
        `${SUPPORTED_FORMAT_COUNT} supported file formats across images, design files, documents, video, and audio`,
        'AI file renamer and organizer for Mac and Windows',
        'AI file renamer for Mac and Windows',
        'Rename files with AI by content',
        'Content-aware file renamer for screenshots, PDFs, photos, documents, videos, audio, and design files',
        'Smart AI file renamer with review and undo',
        'Audio file renamer for MP3, M4A, WAV, FLAC, OGG, WebM, and MPGA',
        'Video file renamer for MP4, MOV, M4V, MPEG, 3GP, TS, MTS, M2TS, DV, and VOB',
        'AI batch file renamer for mixed folders',
        'File renamer for Mac and Windows',
        'Bulk rename files by content',
        'Bulk rename screenshots, design files, PDFs, photos, audio, videos, and documents',
        'Bulk Rename Utility alternative for content-aware filenames',
        'Automatic folder monitoring',
        'Watch folders for new screenshots, downloads, photos, and PDFs',
        'AI file organizer workflows for Downloads, screenshots, documents, photos, videos, audio, and design files',
        'Searchable filenames for Finder, Spotlight, File Explorer, and Windows Search',
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
