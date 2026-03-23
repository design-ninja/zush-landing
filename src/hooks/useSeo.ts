import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://zushapp.com';

interface RouteMeta {
  title: string;
  description: string;
  robots: string;
}

const DEFAULT_META: RouteMeta = {
  title: 'Zush — AI File Renamer for macOS | Rename Files with AI',
  description:
    'Rename files with AI on macOS — free to try. Zush automatically renames screenshots, PDFs, and documents using AI. Batch rename, folder monitoring, smart metadata, and custom naming patterns.',
  robots: 'noindex, nofollow',
};

const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    ...DEFAULT_META,
    robots: 'index, follow',
  },
  '/changelog': {
    title: 'Changelog — Zush',
    description:
      'Track all updates, new features, and improvements to Zush, the AI-powered file organizer for macOS.',
    robots: 'index, follow',
  },
  '/byok-setup': {
    title: 'BYOK Setup Guide — Zush',
    description:
      'Learn how to set up Bring Your Own Key (BYOK) in Zush with Gemini, Groq, OpenAI, or Claude for unlimited AI file processing.',
    robots: 'index, follow',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Zush',
    description:
      "Read Zush's privacy policy. Learn how we handle your data, file content, and personal information.",
    robots: 'index, follow',
  },
  '/terms-of-service': {
    title: 'Terms of Service — Zush',
    description:
      "Read Zush's terms of service for using our AI-powered file organization app for macOS.",
    robots: 'index, follow',
  },
  '/refund-policy': {
    title: 'Refund Policy — Zush',
    description:
      "Zush's refund policy. Money-back guarantee details for our AI file organizer.",
    robots: 'index, follow',
  },
  '/blog': {
    title: 'Blog — Zush',
    description:
      'Tips, guides, and insights on AI-powered file organization for macOS. Learn about smart renaming, metadata, and workflow automation.',
    robots: 'index, follow',
  },
  '/rename-files-with-ai': {
    title: 'Rename Files with AI — Free on macOS | Zush',
    description:
      'Rename files with AI for free on macOS. Zush analyzes screenshots, PDFs, and documents to generate descriptive filenames automatically. Free to try.',
    robots: 'index, follow',
  },
  '/ai-file-renamer': {
    title: 'AI File Renamer for Mac — Auto Rename Files | Zush',
    description:
      'The best AI file renamer for macOS. Zush automatically renames images, PDFs, and documents with AI-generated descriptive names. One-time purchase, no subscription.',
    robots: 'index, follow',
  },
  '/auto-rename-files': {
    title: 'Auto Rename Files on Mac with AI | Zush',
    description:
      'Auto rename files on macOS with AI-powered folder monitoring. Zush watches your folders and renames new files automatically as they appear. Set it and forget it.',
    robots: 'index, follow',
  },
  '/rename-images-with-ai': {
    title: 'Rename Images with AI on Mac — Free | Zush',
    description:
      'Rename images with AI on macOS. Zush analyzes photos, screenshots, and graphics to generate descriptive filenames. Supports PNG, JPG, HEIC, RAW, and 20+ formats.',
    robots: 'index, follow',
  },
  '/rename-documents-with-ai': {
    title: 'Rename Documents with AI on Mac | Zush',
    description:
      'Rename documents with AI on macOS. Zush reads PDF, DOCX, XLSX, and other document content to generate meaningful filenames automatically.',
    robots: 'index, follow',
  },
  '/rename-pdf-with-ai': {
    title: 'Rename PDF Files with AI on Mac | Zush',
    description:
      'Rename PDF files with AI on macOS. Zush extracts text from PDFs and generates descriptive filenames for invoices, contracts, reports, and more.',
    robots: 'index, follow',
  },
  '/rename-screenshots-with-ai': {
    title: 'Rename Screenshots with AI on Mac | Zush',
    description:
      'Rename screenshots with AI on macOS. Zush replaces generic screenshot names with descriptive AI-generated filenames. Auto-rename with folder monitoring.',
    robots: 'index, follow',
  },
  '/rename-photos-with-ai': {
    title: 'Rename Photos with AI on Mac | Zush',
    description:
      'Rename photos with AI on macOS. Zush analyzes your photo library and generates descriptive names. Supports HEIC, RAW formats, and 60+ languages.',
    robots: 'index, follow',
  },
  '/ai-image-renamer': {
    title: 'AI Image Renamer for Mac — Rename Images Automatically | Zush',
    description:
      'The best AI image renamer for macOS. Supports 23 image formats including RAW. Batch rename, folder monitoring, smart Finder tags. Free tier available.',
    robots: 'index, follow',
  },
  '/ai-document-renamer': {
    title: 'AI Document Renamer — Auto Rename Docs & PDFs | Zush',
    description:
      'AI document renamer for macOS. Automatically rename PDFs, Word docs, spreadsheets, and presentations based on their content. Text extraction powered by AI.',
    robots: 'index, follow',
  },
  '/ai-pdf-renamer': {
    title: 'AI PDF Renamer — Rename PDF Files Automatically | Zush',
    description:
      'AI PDF renamer for macOS. Extracts text from PDF files and generates descriptive filenames automatically. Perfect for invoices, contracts, and reports.',
    robots: 'index, follow',
  },
  '/ai-screenshot-renamer': {
    title: 'AI Screenshot Renamer for Mac — Auto Name Screenshots | Zush',
    description:
      'AI screenshot renamer for macOS. Automatically rename screenshots based on their content. Set up folder monitoring and never deal with "Screenshot 2026..." again.',
    robots: 'index, follow',
  },
  '/ai-photo-renamer': {
    title: 'AI Photo Renamer for Mac — Rename Photos Automatically | Zush',
    description:
      'AI photo renamer for macOS. Rename photos automatically with AI-generated descriptive names. Supports RAW, HEIC, and 60+ languages. Built for photographers.',
    robots: 'index, follow',
  },
};

const normalizePath = (pathname: string) => {
  let path = pathname || '/';
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path;
};

const ensureMetaTag = (attr: string, value: string, isProperty = false) => {
  const selector = isProperty
    ? `meta[property='${attr}']`
    : `meta[name='${attr}']`;
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    if (isProperty) {
      meta.setAttribute('property', attr);
    } else {
      meta.name = attr;
    }
    document.head.appendChild(meta);
  }
  meta.content = value;
};

export const useSeo = () => {
  const location = useLocation();

  useEffect(() => {
    const path = normalizePath(location.pathname);

    // Blog post pages are handled by useBlogPostSeo
    if (path.startsWith('/blog/') && path !== '/blog') return;

    const meta = ROUTE_META[path] || DEFAULT_META;
    const canonicalUrl = `${SITE_ORIGIN}${path === '/' ? '/' : path}`;

    // Title
    document.title = meta.title;

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Standard meta
    ensureMetaTag('description', meta.description);
    ensureMetaTag('robots', meta.robots);

    // Open Graph
    ensureMetaTag('og:title', meta.title, true);
    ensureMetaTag('og:description', meta.description, true);
    ensureMetaTag('og:url', canonicalUrl, true);

    // Twitter
    ensureMetaTag('twitter:title', meta.title);
    ensureMetaTag('twitter:description', meta.description);
  }, [location.pathname]);
};
