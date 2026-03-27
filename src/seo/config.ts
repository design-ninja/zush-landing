import type { BlogFrontmatter } from '@/utils/frontmatter';

export const SITE_ORIGIN = 'https://zushapp.com';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export interface SeoMeta {
  title: string;
  description: string;
  canonicalPath: string;
  robots: 'index, follow' | 'noindex, nofollow';
  ogType?: 'website' | 'article';
}

type RouteSeoMeta = Omit<SeoMeta, 'canonicalPath'>;

const DEFAULT_META: RouteSeoMeta = {
  title: 'Zush — AI File Renamer for macOS | Rename Files with AI',
  description:
    'Rename files with AI on macOS — free to try. Zush automatically renames screenshots, PDFs, and documents using AI. Batch rename, folder monitoring, smart metadata, and custom naming patterns.',
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
    title: 'Blog — Zush',
    description:
      'Tips, guides, and insights on AI-powered file organization for macOS. Learn about smart renaming, metadata, and workflow automation.',
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
  '/rename-files-with-ai': {
    title: 'Rename Files with AI — Free on macOS | Zush',
    description:
      'Rename files with AI for free on macOS. Zush analyzes screenshots, PDFs, and documents to generate descriptive filenames automatically. Free to try.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-file-renamer': {
    title: 'AI File Renamer for Mac — Auto Rename Files | Zush',
    description:
      'The best AI file renamer for macOS. Zush automatically renames images, PDFs, and documents with AI-generated descriptive names. One-time purchase, no subscription.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/auto-rename-files': {
    title: 'Auto Rename Files on Mac with AI | Zush',
    description:
      'Auto rename files on macOS with AI-powered folder monitoring. Zush watches your folders and renames new files automatically as they appear. Set it and forget it.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-images-with-ai': {
    title: 'Rename Images with AI on Mac — Free | Zush',
    description:
      'Rename images with AI on macOS. Zush analyzes photos, screenshots, and graphics to generate descriptive filenames. Supports PNG, JPG, HEIC, RAW, and 20+ formats.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-documents-with-ai': {
    title: 'Rename Documents with AI on Mac | Zush',
    description:
      'Rename documents with AI on macOS. Zush reads PDF, DOCX, XLSX, and other document content to generate meaningful filenames automatically.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-pdf-with-ai': {
    title: 'Rename PDF Files with AI on Mac | Zush',
    description:
      'Rename PDF files with AI on macOS. Zush extracts text from PDFs and generates descriptive filenames for invoices, contracts, reports, and more.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-screenshots-with-ai': {
    title: 'Rename Screenshots with AI on Mac | Zush',
    description:
      'Rename screenshots with AI on macOS. Zush replaces generic screenshot names with descriptive AI-generated filenames. Auto-rename with folder monitoring.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-photos-with-ai': {
    title: 'Rename Photos with AI on Mac | Zush',
    description:
      'Rename photos with AI on macOS. Zush analyzes your photo library and generates descriptive names. Supports HEIC, RAW formats, and 60+ languages.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-image-renamer': {
    title: 'AI Image Renamer for Mac — Rename Images Automatically | Zush',
    description:
      'The best AI image renamer for macOS. Supports 23 image formats including RAW. Batch rename, folder monitoring, smart Finder tags. Free tier available.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-document-renamer': {
    title: 'AI Document Renamer — Auto Rename Docs & PDFs | Zush',
    description:
      'AI document renamer for macOS. Automatically rename PDFs, Word docs, spreadsheets, and presentations based on their content. Text extraction powered by AI.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-pdf-renamer': {
    title: 'AI PDF Renamer — Rename PDF Files Automatically | Zush',
    description:
      'AI PDF renamer for macOS. Extracts text from PDF files and generates descriptive filenames automatically. Perfect for invoices, contracts, and reports.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-screenshot-renamer': {
    title: 'AI Screenshot Renamer for Mac — Auto Name Screenshots | Zush',
    description:
      'AI screenshot renamer for macOS. Automatically rename screenshots based on their content. Set up folder monitoring and never deal with generic screenshot filenames again.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/ai-photo-renamer': {
    title: 'AI Photo Renamer for Mac — Rename Photos Automatically | Zush',
    description:
      'AI photo renamer for macOS. Rename photos automatically with AI-generated descriptive names. Supports RAW, HEIC, and 60+ languages. Built for photographers.',
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
  '/rename-files-with-ai',
  '/ai-file-renamer',
  '/auto-rename-files',
  '/rename-images-with-ai',
  '/rename-documents-with-ai',
  '/rename-pdf-with-ai',
  '/rename-screenshots-with-ai',
  '/rename-photos-with-ai',
  '/ai-image-renamer',
  '/ai-document-renamer',
  '/ai-pdf-renamer',
  '/ai-screenshot-renamer',
  '/ai-photo-renamer',
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

export function getSeoForPath(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  const routeMeta = ROUTE_META[path] || DEFAULT_META;

  return {
    ...routeMeta,
    canonicalPath: path,
  };
}

export function getBlogSeo(post: BlogFrontmatter): SeoMeta {
  return {
    title: `${post.title} — Zush Blog`,
    description: post.description,
    canonicalPath: `/blog/${post.slug}`,
    robots: 'index, follow',
    ogType: 'article',
  };
}

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
      '@type': 'SoftwareApplication',
      '@id': `${SITE_ORIGIN}/#software`,
      name: 'Zush',
      description:
        'AI-powered file organization app for macOS. Automatically renames images, PDFs, and documents using advanced AI with smart metadata and folder monitoring.',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'macOS 14.0+',
      downloadUrl: `${SITE_ORIGIN}/releases/Zush.dmg`,
      offers: {
        '@type': 'Offer',
        price: '10',
        priceCurrency: 'USD',
        name: 'Zush PRO',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Zush?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Zush is a macOS app that renames files automatically using AI analysis of screenshots, photos, PDFs, and documents.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does pricing work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Zush PRO is a one-time purchase for $10 with 10,000 renames, plus BYOK support for unlimited usage.',
          },
        },
      ],
    },
  ],
} as const;
