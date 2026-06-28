import type { BlogPost } from '@/data/blog';
import { APP_CONFIG, MAC_INSTALLER_URL } from '@/constants';

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
  title: 'AI File Renamer for Mac & Windows | Batch Rename - Zush',
  description:
    'Rename files with AI by content on Mac and Windows. Batch rename screenshots, PDFs, photos, videos, audio, design files, and documents with review and undo.',
  robots: 'noindex, nofollow',
  ogType: 'website',
};

const ROUTE_META: Record<string, RouteSeoMeta> = {
  '/': {
    ...DEFAULT_META,
    title: 'AI File Renamer for Mac & Windows | Batch Rename - Zush',
    description: 'Rename files with AI by content on Mac and Windows. Batch rename screenshots, PDFs, photos, videos, audio, design files, and documents with review and undo.',
    robots: 'index, follow',
  },
  '/batch-rename-tool': {
    title: 'AI Batch Rename Tool for Mac & Windows | Zush',
    description:
      'Use Zush as an AI batch rename tool for Mac and Windows. Rename mixed folders by content with preview, naming patterns, folder monitoring, and undo.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/file-renamer': {
    title: 'AI File Renamer for Mac & Windows | Zush',
    description:
      'Use Zush as an AI file renamer for Mac and Windows. Batch rename screenshots, PDFs, photos, videos, audio, design files, and documents with undo.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/batch-rename-files': {
    title: 'Batch Rename Files with AI | Mac & Windows | Zush',
    description:
      'Batch rename files with AI on Mac and Windows. Review descriptive names for mixed folders, apply naming patterns, monitor folders, and undo safely.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/bulk-rename-files': {
    title: 'Bulk Rename Files with AI on Mac & Windows | Zush',
    description:
      'Bulk rename files with AI instead of fixing IMG_, Screenshot, scan, document, and Untitled names by hand. Preview every name and undo any batch.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/offline-ai-file-renamer': {
    title: 'Offline AI File Renamer for Mac & Windows | Zush',
    description:
      'Use Zush as an offline AI file renamer with local Ollama models, BYOK, preview, folder monitoring, and undo for private Mac and Windows workflows.',
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
    title: 'Zush Docs | AI File Renamer Guides for Windows and Mac',
    description:
      'Documentation for Zush AI file renaming: Windows batch rename workflows, folder monitoring, Offline AI, undo history, and supported file types.',
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
      'Rename PDF files by content. Zush reads invoices, contracts, scans, receipts, and reports, then turns scan_0042.pdf into a searchable filename.',
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
    title: 'Rename Screenshots Automatically on Mac & Windows | Zush',
    description:
      'Rename screenshots automatically on Mac and Windows. Watch screenshot folders and replace timestamp names with searchable AI filenames.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-photos-with-ai': {
    title: 'AI Photo Organizer & Image Renamer for Mac | Zush',
    description:
      'Organize photos with AI. Zush renames IMG_, HEIC, RAW, AVIF, JPG, SVG, and TIFF files with searchable image names based on photo content.',
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
    title: 'AI File Renamer for Mac: 50 Free Renames | Zush',
    description:
      'Download Zush for Mac. Batch rename screenshots, PDFs, photos, videos, audio, and design files with AI. 50 free renames, preview, and undo.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/windows': {
    title: 'AI File Renamer for Windows | Batch & Bulk Rename - Zush',
    description:
      'Batch rename files on Windows 11 and 10 with AI. Rename screenshots, PDFs, photos, videos, audio, design files, and Office docs with undo.',
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
  '/batch-rename-tool',
  '/file-renamer',
  '/batch-rename-files',
  '/bulk-rename-files',
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
  '/batch-rename-tool',
  '/file-renamer',
  '/batch-rename-files',
  '/bulk-rename-files',
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
      name: 'AI File Renamer for Mac & Windows | Batch Rename - Zush',
      description:
        'Zush is an AI file renamer for Mac and Windows that batch renames and bulk renames screenshots, PDFs, photos, videos, audio, design files, and documents by content.',
      keywords:
        'batch rename tool, bulk rename tool, file renamer, batch rename files, bulk rename files, AI file renamer, file renamer for Mac, file renamer for Windows, automatic file organizer, AI file organizer, searchable filenames',
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
      alternateName: [
        'AI File Renamer',
        'Batch Rename Tool',
        'Batch Rename Tool for Mac and Windows',
        'File Renamer for Mac',
        'File Renamer for Windows',
        'AI Batch Rename Tool',
        'Bulk Rename Tool',
        'Automatic File Organizer',
      ],
      url: SITE_ORIGIN,
      mainEntityOfPage: {
        '@id': `${SITE_ORIGIN}/#webpage`,
      },
      description:
        'AI file renamer, batch rename tool, bulk rename utility, and automatic file organizer for macOS and Windows. Rename screenshots, design files, PDFs, photos, audio, videos, iWork and Office documents by content with smart metadata and folder monitoring.',
      keywords:
        'batch rename tool, bulk rename tool, file renamer, batch rename files, bulk rename files, AI file renamer, AI photo organizer, PDF renamer, screenshot renamer, automatic file organizer, AI file organizer, searchable filenames, watch folder',
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'File Management',
      operatingSystem: ['macOS 15.0+', 'Windows 10', 'Windows 11'],
      softwareVersion: APP_CONFIG.app_version,
      downloadUrl: MAC_INSTALLER_URL,
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
        'AI file renamer for Mac and Windows',
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
