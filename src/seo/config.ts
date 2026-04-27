import type { BlogPost } from '@/data/blog';
import { HOME_FAQ_DATA } from '@/data/homeFaq';

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
  title: 'Zush — AI File Renamer for Mac & Windows · 50 Free Renames, No Signup',
  description:
    'Zush renames screenshots, PDFs, photos and documents on Mac and Windows using AI. Batch rename, watch folders, stay organized automatically. 50 free renames, no signup.',
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
  '/ollama-setup': {
    title: 'Ollama Setup Guide — Zush',
    description:
      'Learn how to set up Ollama in Zush, choose recommended local AI models, and process supported files locally on your Mac.',
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
    title: 'Methodology & Benchmarks — Zush',
    description:
      'See how Zush evaluates AI file renaming quality: scoring rubric, benchmark protocol, review standards, and update cadence.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-file-renamer': {
    title: 'AI File Renamer · PDFs, Photos & Screenshots · Zush',
    description:
      'Rename PDFs, screenshots, photos and documents in seconds. Zush reads file content and creates searchable names automatically on Mac or Windows. 50 free renames, no signup.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/auto-rename-files': {
    title: 'Auto Rename Files with AI · Folder Monitoring · Zush',
    description:
      'Watch any folder and rename new files automatically with AI. Zush handles downloads, screenshots and exports as they arrive on Mac or Windows — no manual cleanup, no scripts.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/batch-rename-files': {
    title: 'Batch Rename Files with AI (2026) · Zush',
    description:
      'Batch rename hundreds of files in one click. AI gives each file a unique descriptive name — not just a prefix. Free for 50 files, no signup.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-documents-with-ai': {
    title: 'Rename Documents with AI · DOCX, XLSX & PPTX · Zush',
    description:
      'Rename DOCX, XLSX, PPTX, TXT, CSV and email files by their actual content. Zush reads document text and creates searchable filenames automatically.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-pdf-with-ai': {
    title: 'Rename PDFs with AI · Invoices & Contracts · Zush',
    description:
      'Rename scanned invoices, contracts and tax forms by their actual content. Zush extracts PDF text and creates searchable filenames in seconds.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-screenshots-with-ai': {
    title: 'Rename Screenshots with AI · Zush',
    description:
      "Replace generic screenshot filenames with names like 'stripe-revenue-dashboard.png'. Zush auto-names screenshots using AI vision. Free to try.",
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-photos-with-ai': {
    title: 'Rename Photos with AI · HEIC, RAW & JPG · Zush',
    description:
      'Stop renaming photos one by one. Zush analyzes HEIC, RAW and JPG content to generate descriptive names for your entire photo library. Free for 50.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-image-renamer': {
    title: 'AI Image Renamer · Photos & Screenshots · Zush',
    description:
      'Rename screenshots, photos, mockups and downloaded images across 22 formats. Zush uses AI vision to create searchable filenames on Mac or Windows. Free for 50 files.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/mac': {
    title: 'AI File Renamer for Mac · Native macOS App · Zush',
    description:
      'Rename screenshots, PDFs, photos and documents on Mac with AI. Native Apple Silicon and Intel app, signed .dmg download, free for 50 renames.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/windows': {
    title: 'AI File Renamer for Windows · Microsoft Store App · Zush',
    description:
      'Rename screenshots, PDFs, photos and documents on Windows with AI. Microsoft Store install, automatic updates, free for 50 renames, no signup.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/thank-you': DEFAULT_META,
  '/recover': DEFAULT_META,
  '/activate': DEFAULT_META,
  '/manage-subscription': DEFAULT_META,
  '/manage-subscription/confirm': DEFAULT_META,
};

export const PRIVATE_ROUTES = [
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
  '/ai-file-renamer',
  '/auto-rename-files',
  '/ai-image-renamer',
  '/batch-rename-files',
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
        'AI-powered file organization app for macOS and Windows. Automatically renames images, PDFs, and documents using advanced AI with smart metadata and folder monitoring.',
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'File Management',
      operatingSystem: ['macOS 14.0+', 'Windows 10', 'Windows 11'],
      softwareVersion: '1.9.0',
      downloadUrl: `${SITE_ORIGIN}/releases/Zush.dmg`,
      installUrl: 'https://apps.microsoft.com/detail/9ND4WVZSDQ3X',
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
          description: 'One-time purchase. 10,000 AI renames, all features, BYOK, and Local Ollama on supported Mac builds.',
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
        'Local Ollama processing on supported Mac builds',
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'meta[name="description"]'],
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE_ORIGIN}/#howto`,
      name: 'How to Rename Files with AI on Mac or Windows',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Download Zush',
          text: 'Install Zush on your desktop. No account required.',
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
