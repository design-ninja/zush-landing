import type { BlogPost } from '@/data/blog';
import {
  APP_CONFIG,
  APP_STORE_URL,
  HOMEBREW_CASK_URL,
  MAC_APP_VERSION,
  MAC_INSTALLER_URL,
  PRODUCT_FACTS_REVIEWED_AT,
  SUPPORTED_FORMAT_COUNT,
  WINDOWS_APP_VERSION,
  WINDOWS_STORE_URL,
} from '@/constants';
import { getPrimaryAuthorJsonLd, PRIMARY_AUTHOR } from '@/data/author';

export const SITE_ORIGIN = 'https://zushapp.com';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export const DEFAULT_KEYWORDS = [
  'AI file renamer',
  'AI renamer',
  'rename files by content',
  'batch rename files',
  'bulk file rename',
  'rename files automatically',
  'offline AI file renamer',
  'local AI file renamer',
  'private AI file renamer',
  'AI file organizer',
  'organize files with AI',
  'automatic file organization',
  'AI file sorter',
  'sort files into folders',
  'AI document organizer',
  'file renamer for Mac',
  'file renamer for Windows',
  'PDF renamer',
  'rename PDFs by content',
  'screenshot renamer',
  'photo renamer',
  'EXIF photo renamer',
  'custom file naming rules',
  'content-aware file naming',
  'file management tool',
].join(', ');

export interface SeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string;
}

type RouteSeoMeta = Omit<SeoMeta, 'canonicalPath'>;

const DEFAULT_META: RouteSeoMeta = {
  title: 'AI File Renamer & Organizer for Mac and Windows | Zush',
  description:
    `AI file renamer for Mac and Windows. Rename ${SUPPORTED_FORMAT_COUNT} formats by content, including RAW photos, PDFs, video, audio, and design files. Preview and undo every batch.`,
  robots: 'noindex, nofollow',
  ogType: 'website',
};

const ROUTE_META: Record<string, RouteSeoMeta> = {
  '/': {
    ...DEFAULT_META,
    title: 'AI File Renamer & Organizer for Mac and Windows | Zush',
    description:
      `AI file renamer for Mac and Windows. Rename ${SUPPORTED_FORMAT_COUNT} formats by content, including RAW photos, PDFs, video, audio, and design files. Preview and undo every batch.`,
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
  '/ai-file-organizer': {
    title: 'AI File Organizer for Mac and Windows | Zush',
    description:
      'AI file organizer for Mac and Windows that creates descriptive, searchable filenames by content. Use templates, folder monitoring, preview, and undo without moving files between folders.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/hazel-alternative': {
    title: 'Hazel Alternative with AI File Naming | Zush',
    description:
      'Looking for a Hazel alternative that understands file content? Zush watches folders, renames by content with AI, and works on Mac and Windows. Preview and undo.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'hazel alternative, hazel file organizer, apps like hazel, mac file automation, ai file organizer for mac, folder monitoring mac, rename files automatically mac, sort files into folders mac',
  },
  '/powerrename-alternative': {
    title: 'PowerRename Alternative with AI | Zush for Windows',
    description:
      'PowerRename handles patterns; Zush reads file content. AI batch rename for Windows 11 with preview, undo, and searchable names. From the Microsoft Store.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'powerrename alternative, powertoys rename, batch rename files windows 11, ai file renamer for windows, rename files by content windows, file explorer batch rename, windows batch rename tool',
  },
  '/rename-invoices-with-ai': {
    title: 'Rename Invoices Automatically with AI | Zush',
    description:
      'Rename invoice PDFs by vendor, date, and amount — automatically. Zush reads each invoice and applies your naming convention. Preview and undo every batch.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'rename invoices automatically, invoice renamer, invoice pdf organizer, invoice naming convention, organize invoices, rename pdf invoices, ai invoice organizer, bulk rename invoices',
  },
  '/rename-receipts-with-ai': {
    title: 'Rename & Organize Receipts with AI | Zush',
    description:
      'Turn IMG_2041.jpg into a searchable receipt filename with store, date, and amount. AI receipt renaming for tax season and expenses. Mac & Windows.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'receipt organizer, organize receipts digitally, rename receipts, receipt organization for taxes, expense receipt filing, ai receipt organizer, scan receipt naming',
  },
  '/rename-excel-files-with-ai': {
    title: 'Rename Excel Files with AI by Content | Zush',
    description:
      'Bulk rename Excel and spreadsheet files based on what is inside. Zush reads XLSX and CSV content and suggests clear names. Preview and undo. Mac & Windows.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'rename excel files, bulk rename excel files, rename xlsx by content, rename spreadsheets, excel file naming convention, rename csv files, batch rename excel',
  },
  '/rename-word-documents-with-ai': {
    title: 'Rename Word Documents with AI by Content | Zush',
    description:
      'Batch rename Word documents based on their content. Zush reads DOCX files and turns meeting_notes_FINAL_v2 into names you can search. Mac & Windows.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'rename word documents, batch rename docx, rename word files by content, word document naming convention, bulk rename word documents',
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
      'Documentation for Zush AI file renaming on Mac and Windows: batch rename, folder monitoring, Templates, Naming Blocks, Custom AI Blocks, BYOK, Offline AI, metadata, and undo.',
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
  '/about': {
    title: 'About Zush | AI File Renamer for Mac and Windows',
    description:
      'Learn who builds Zush, why the AI file renamer exists, how product claims are verified, and where to find public releases, policies, and methodology.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/authors/kirill-isachenko': {
    title: 'Kirill Isachenko | Founder and Developer of Zush',
    description:
      'Kirill Isachenko (lirik) is the founder, designer, and software developer behind Zush, an AI file renamer for Mac and Windows.',
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
    title: 'Auto-Rename Screenshots on Mac & Windows with AI | Zush',
    description:
      'Stop hunting for "Screenshot 2026-07-12". Zush renames screenshots by their content — automatically, with preview and undo. Free for 50 renames.',
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
  '/ai-file-organizer',
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
      founder: {
        '@id': `${PRIMARY_AUTHOR.url}#person`,
      },
      sameAs: [
        'https://x.com/zush_app',
        'https://www.youtube.com/@zushapp',
        'https://www.producthunt.com/products/zush',
        HOMEBREW_CASK_URL,
        APP_STORE_URL,
        WINDOWS_STORE_URL,
      ],
    },
    getPrimaryAuthorJsonLd(),
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
      dateModified: PRODUCT_FACTS_REVIEWED_AT,
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_ORIGIN}/#software`,
      name: 'Zush',
      alternateName: [
        'AI File Renamer',
        'AI File Renamer & Organizer',
        'Content-Aware File Renamer',
        'Zush for Mac',
        'Zush for Windows',
      ],
      url: SITE_ORIGIN,
      mainEntityOfPage: {
        '@id': `${SITE_ORIGIN}/#webpage`,
      },
      description:
        `AI file renamer and organizer, batch rename tool, bulk rename utility, and automatic file organizer for macOS and Windows. Rename ${SUPPORTED_FORMAT_COUNT} file formats by content, including screenshots, PDFs, photos, documents, videos, audio, and design files, with metadata, templates, folder monitoring, review, and undo.`,
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'File Management',
      operatingSystem: ['macOS 15.0+', 'Windows 10', 'Windows 11'],
      softwareVersion: `${MAC_APP_VERSION} (macOS); ${WINDOWS_APP_VERSION} (Windows)`,
      author: {
        '@id': `${PRIMARY_AUTHOR.url}#person`,
      },
      downloadUrl: [MAC_INSTALLER_URL, APP_STORE_URL, HOMEBREW_CASK_URL, WINDOWS_STORE_URL],
      installUrl: [APP_STORE_URL, HOMEBREW_CASK_URL, WINDOWS_STORE_URL],
      sameAs: [
        APP_STORE_URL,
        WINDOWS_STORE_URL,
        'https://www.producthunt.com/products/zush',
        'https://www.youtube.com/@zushapp',
        HOMEBREW_CASK_URL,
      ],
      image: DEFAULT_OG_IMAGE,
      screenshot: [
        `${SITE_ORIGIN}/images/screenshots/light/zush-main-interface.webp`,
        `${SITE_ORIGIN}/images/showcase/windows/batch-rename-light.webp`,
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
        `${SUPPORTED_FORMAT_COUNT} supported file formats across images, design files, documents, video, and audio`,
        'Rename files with AI by content',
        'Batch rename mixed folders with preview and undo',
        'Folder monitoring for new supported files',
        'Templates and 145+ Naming Blocks',
        'Custom AI Blocks: user-defined AI extraction fields reusable in any template',
        'Video analysis with sampled frames and subtitles',
        'Design file support for Sketch, Figma, Illustrator, and PSD',
        'iWork support for Pages, Numbers, and Keynote',
        'RAW photo, PDF, and document analysis',
        '60+ language support',
        'Bring Your Own Key (BYOK)',
        'Offline AI mode with local Ollama models',
      ],
    },
  ],
};

export const HOME_VIDEO_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${SITE_ORIGIN}/#batch-rename-video`,
  name: 'Zush AI batch file renaming workflow on Mac',
  description:
    'A Zush demo showing mixed files analyzed by AI, reviewed with content-aware filename suggestions, and renamed as a batch on macOS.',
  thumbnailUrl: `${SITE_ORIGIN}/videos/posters/hero-batch-rename-mac-window-light.webp`,
  uploadDate: '2026-06-20T10:17:47+07:00',
  contentUrl: `${SITE_ORIGIN}/videos/hero/zush-batch-rename-mac-window-light.mp4`,
  embedUrl: `${SITE_ORIGIN}/`,
  publisher: {
    '@id': `${SITE_ORIGIN}/#organization`,
  },
};
