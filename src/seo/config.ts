import type { BlogPost } from '@/data/blog';
import {
  AI_MODES_SUMMARY,
  APP_CONFIG,
  APP_STORE_URL,
  GITHUB_RELEASES_URL,
  GOOGLE_WORKSPACE_MARKETPLACE_URL,
  HOMEBREW_CASK_URL,
  MAC_APP_VERSION,
  MAC_INSTALLER_URL,
  PRODUCT_FACTS_REVIEWED_AT,
  PRODUCT_HUNT_URL,
  SUPPORTED_FORMAT_COUNT,
  WINDOWS_APP_VERSION,
  WINDOWS_STORE_URL,
} from '@/constants';
import { getPrimaryAuthorJsonLd, PRIMARY_AUTHOR } from '@/data/author';
import { buildAppAggregateRatingJsonLd } from '@/seo/appRating';
import { buildSoftpediaReviewJsonLd } from '@/seo/softpediaReview';
import { ORGANIZATION_REF, WEBSITE_REF, ZUSH_BRAND_ALTERNATE_NAMES } from '@/seo/entity';
import { PRO_PRICING } from '@/constants/pricing';

export const SITE_ORIGIN = 'https://zushapp.com';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export const HOME_KEYWORDS = [
  'Zush',
  'Zush AI',
  'Zush AI Renamer',
  'Zush AI File Renamer',
  'Zush File Renamer',
  'AI file renamer',
  'AI renamer',
  'rename files by content',
  'batch rename files with AI',
  'AI file organizer',
  'file renamer for Mac',
  'file renamer for Windows',
  'offline AI file renamer',
  'local AI file renamer',
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

const HOME_PAGE_TITLE = 'Zush AI Renamer: File Renamer & Organizer for Mac & Windows';
const HOME_PAGE_DESCRIPTION =
  'Zush is an AI file renamer and organizer for Mac and Windows. Rename files by content, apply custom naming rules, preview every name, and undo any batch.';

const DEFAULT_META: RouteSeoMeta = {
  title: HOME_PAGE_TITLE,
  description: HOME_PAGE_DESCRIPTION,
  robots: 'index, follow',
  ogType: 'website',
};

/**
 * Explicit meta for routes that must stay out of search. These used to inherit a
 * `noindex` default, which meant every new page shipped closed until someone
 * remembered to add a ROUTE_META entry — a silent failure that costs weeks of
 * indexation. The default now opts pages in, so the pages that need to stay out
 * have to say so here. Keep the robots string byte-identical: BaseLayout
 * compares against it to decide whether to emit hreflang alternates.
 */
const PRIVATE_META: RouteSeoMeta = {
  ...DEFAULT_META,
  robots: 'noindex, nofollow',
};

const ROUTE_META: Record<string, RouteSeoMeta> = {
  '/': {
    ...DEFAULT_META,
    title: HOME_PAGE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
    robots: 'index, follow',
    keywords: HOME_KEYWORDS,
  },
  '/pricing': {
    title: 'Zush Pricing: Free, Monthly, and Lifetime Plans',
    description:
      'Compare Zush pricing. Start free with 50 AI renames, choose unlimited PRO monthly, or pay once for lifetime access on Mac and Windows.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'zush pricing, ai file renamer pricing, file renamer price, ai renamer free plan, lifetime ai file renamer, zush pro',
  },
  '/batch-rename-files': {
    title: 'Batch & Bulk Rename Files on Mac & Windows with AI | Zush',
    description:
      'Batch and bulk rename files on Mac & Windows with AI. Zush reads mixed folders by content, then lets you preview, apply, and undo every filename.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'batch rename files, bulk rename files, AI batch file renamer, batch rename files with AI, bulk file renamer, batch rename files on Mac, batch rename files on Windows, rename multiple files by content, mixed file batch renamer, batch file naming tool',
  },
  '/offline-ai-file-renamer': {
    title: 'Offline AI File Renamer for Mac & Windows | Zush',
    description:
      'Offline AI file renamer for Mac and Windows. Use Built-in Local AI, LM Studio, or Ollama so supported analysis stays on-device, with preview and undo.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'offline AI file renamer, local AI file renamer, private AI file renamer, on-device AI file renamer, rename files offline, offline file renamer for Mac, offline file renamer for Windows, Built-in Local AI file renamer, LM Studio file renamer, Ollama file renamer',
  },
  '/ai-file-organizer': {
    title: 'AI File Organizer for Mac & Windows | Automatic File Naming',
    description:
      'AI file organizer for Mac and Windows that names files in place by content. Clean up screenshots, PDFs and documents with templates, preview and undo.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'AI file organizer, organize files with AI, automatic file organizer, AI file sorter, sort files into folders, AI document organizer, content-aware file organization, organize files automatically, file organizer for Mac, file organizer for Windows',
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
  '/automate-downloads-folder': {
    title: 'Automate Your Downloads Folder with AI Naming | Zush',
    description:
      'Zush watches your Downloads folder and names every new file by content — invoices, screenshots, receipts, PDFs — automatically, with preview and undo.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'automate downloads folder, organize downloads folder, downloads folder cleanup, auto rename downloads, rename new files automatically, folder monitoring app, downloads folder mac, downloads folder windows',
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
    title: 'Rename Invoices with AI · Vendor, Date & Number · Zush',
    description:
      'Batch rename invoice PDFs by vendor, date, invoice number and amount. Zush reads text and scanned invoices, previews every filename and lets you undo the batch.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'rename invoices automatically, invoice renamer, invoice pdf organizer, invoice naming convention, organize invoices, rename pdf invoices, ai invoice organizer, bulk rename invoices',
  },
  '/for-accountants': {
    title: 'AI File Renamer for Accountants & Bookkeepers | Zush',
    description:
      'Batch rename invoices, receipts, statements, tax forms, and scans by vendor, date, number, amount, and client. Preview every batch on Mac or Windows.',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: `${SITE_ORIGIN}/images/landing/accountants-file-renamer.webp`,
    keywords:
      'AI file renamer for accountants, accounting document renamer, bookkeeper file naming, rename invoices automatically, organize client accounting documents, invoice file naming software, receipt renamer for bookkeepers',
  },
  '/for-medical': {
    title: 'Healthcare Document Management with Offline AI File Renaming | Zush',
    description:
      'Healthcare document management for medical practices: rename scans, faxes, lab reports, and intake forms with Offline AI, preview, and undo.',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: `${SITE_ORIGIN}/images/landing/medical-records-file-renamer.webp`,
    keywords:
      'healthcare document management, medical document management, medical records file renamer, rename scanned medical records, medical document renamer, offline AI medical document renamer, medical file renamer for clinics',
  },
  '/for-photographers': {
    title: 'AI File Renamer for Photographers & Videographers | Zush',
    description:
      'Rename RAW photos, JPEGs, and video clips by project, date, subject, scene, and take. Batch workflows for photographers and videographers on Mac and Windows.',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: `${SITE_ORIGIN}/images/landing/photographers-file-renamer.webp`,
    keywords:
      'AI file renamer for photographers, photo file naming software, video file renamer, batch rename RAW photos, rename video clips by content, photographer file naming workflow, videographer file organization, media file renamer',
  },
  '/for-legal': {
    title: 'Legal Document Management with Offline AI File Renaming | Zush',
    description:
      'Rename and organize case files, contracts, pleadings, and scans with AI. Create searchable filenames, work with your DMS, and run locally on Mac or Windows.',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: `${SITE_ORIGIN}/images/landing/legal-document-renamer.webp`,
    keywords:
      'AI legal document renamer, rename legal documents, legal document organizer, organize legal documents, legal file organization, organize case files, law firm document management workflow, matter file organization, legal document naming software',
  },
  '/for-hr': {
    title: 'HR Document Management with Offline AI File Renaming | Zush',
    description:
      'Rename and organize employee, candidate, onboarding, review, and policy files with AI. Searchable HR filenames, Offline AI, preview, and undo on Mac or Windows.',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: `${SITE_ORIGIN}/images/landing/hr-document-management.webp`,
    keywords:
      'HR document management, employee file naming convention, HR document organizer, organize employee files, onboarding document management, recruiting file organization, AI HR document renamer, offline AI HR documents, HR file naming software',
  },
  '/for-real-estate': {
    title: 'Real Estate Document Management with AI File Renaming | Zush',
    description:
      'Rename purchase agreements, inspections, title files, appraisals, closing documents, and property photos by address, date, type, party, and status.',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: `${SITE_ORIGIN}/images/landing/real-estate-document-management.webp`,
    keywords:
      'real estate document management, real estate file organization, rename real estate documents, property transaction file naming, organize closing documents, rename DocuSign files, real estate document renamer, property file naming software',
  },
  '/rename-scanned-documents': {
    title: 'Rename Scanned Documents Automatically | Zush',
    description:
      'Turn Scan0001.pdf into a searchable filename. Zush reads each scan with AI vision — no OCR pass — and names it by document type, party, and date. Mac & Windows.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'rename scanned documents, automatically rename scans, scan renamer, rename scan files, scansnap rename files, scanner file naming, rename scanned pdf, organize scanned documents',
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
      'Every Zush release for Mac and Windows: new AI renaming features, newly supported formats, fixes, and improvements, with dates and version numbers.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/changelog/windows': {
    title: 'Windows Changelog — Zush',
    description:
      'Every Zush release for Windows and the Microsoft Store: new AI renaming features, newly supported formats, fixes, and improvements, with version numbers.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Zush',
    description:
      'How Zush handles your files and personal data: what leaves your device, what never does, how AI providers are used, and how to run Offline AI mode instead.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/terms-of-service': {
    title: 'Terms of Service — Zush',
    description:
      'The terms for using Zush on Mac and Windows: licence and subscription rules, acceptable use, refunds, liability, and how changes to these terms are made.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/refund-policy': {
    title: 'Refund Policy — Zush',
    description:
      'Zush refund policy: the money-back guarantee window, what qualifies, how Mac App Store and Microsoft Store purchases differ, and how to request a refund.',
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
      'Zush AI file renamer docs for Mac and Windows: batch rename, folder monitoring, Templates, BYOK, Built-in Local AI, LM Studio, Ollama, metadata, and undo.',
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
  '/press': {
    title: 'Zush Press Kit | Assets, Facts, and Review Licenses',
    description:
      'Press kit for Zush, the AI file renamer for Mac and Windows: boilerplate, product facts, logo, screenshots, demo videos, and review license requests.',
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
      'Kirill Isachenko (lirik) is the founder, designer, and developer of Zush, an AI file renamer for Mac and Windows. How the product is built and what it verifies.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/rename-pdf-with-ai': {
    title: 'Rename PDF Files with AI | Content-Based PDF Renamer - Zush',
    description:
      'AI PDF renamer for Mac and Windows. Zush reads invoices, contracts, scans, and receipts, then renames PDFs by content. Preview each name, undo any batch.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'AI PDF renamer, rename PDF files with AI, rename PDFs by content, batch rename PDF files, automatic PDF renamer, PDF file naming software, rename scanned PDFs, invoice PDF renamer, PDF renamer for Mac, PDF renamer for Windows',
  },
  '/rename-documents-with-ai': {
    title: 'Rename Documents with AI · Office, iWork, Text · Zush',
    description:
      'AI document renamer for Mac and Windows. Zush reads Word, Excel, iWork, and text files, then turns meeting_notes_FINAL_v2 into a name you can search for.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'AI document renamer, rename documents with AI, rename files by document content, batch rename documents, automatic document renamer, Office document renamer, iWork file renamer, document naming software, document renamer for Mac, document renamer for Windows',
  },
  '/rename-design-files-with-ai': {
    title: 'Rename Design Files with AI · Figma, Sketch, AI, PSD · Zush',
    description:
      'AI design file renamer. Zush reads Sketch, Figma, Illustrator, and Photoshop previews, then renames design files by content and project context.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'AI design file renamer, rename design files with AI, Figma file renamer, Sketch file renamer, PSD file renamer, Illustrator file renamer, batch rename design files, rename design files by content, creative asset renamer, design file naming software',
  },
  '/rename-screenshots-with-ai': {
    title: 'Rename Screenshots with AI · Mac & Windows · Zush',
    description:
      'Rename screenshots automatically by visible content. Batch rename old captures or monitor new ones on Mac and Windows, with preview and undo.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'AI screenshot renamer, rename screenshots with AI, automatically rename screenshots, batch rename screenshots, rename screenshots by content, screenshot file organizer, screenshot renamer for Mac, screenshot renamer for Windows, searchable screenshot filenames, screenshot naming software',
  },
  '/rename-photos-with-ai': {
    title: 'AI Photo Organizer & Image Renamer for Mac | Zush',
    description:
      'AI photo renamer for Mac and Windows. Zush looks inside HEIC, RAW, JPG, and TIFF images and names each one for what it shows. Preview and undo included.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'AI photo renamer, rename photos with AI, AI image renamer, batch rename photos, rename photos by content, EXIF photo renamer, RAW photo renamer, HEIC file renamer, photo renamer for Mac, photo renamer for Windows',
  },
  '/rename-videos-with-ai': {
    title: 'Rename Videos with AI · MP4, MOV, Screen Recordings · Zush',
    description:
      'AI video renamer for Mac and Windows. Zush samples frames and reads subtitles from MP4, MOV, and MTS files, then renames each video by what is in it.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'AI video renamer, rename videos with AI, batch rename video files, rename videos by content, MP4 file renamer, MOV file renamer, screen recording renamer, video file naming software, video renamer for Mac, video renamer for Windows',
  },
  '/rename-audio-with-ai': {
    title: 'Rename Audio with AI · MP3, M4A, WAV, FLAC · Zush',
    description:
      'AI audio file renamer for Mac and Windows. Zush reads MP3, M4A, WAV, and FLAC metadata or their transcripts, then renames each file by what it contains.',
    robots: 'index, follow',
    ogType: 'website',
    keywords:
      'AI audio file renamer, rename audio files with AI, batch rename audio files, rename audio by content, MP3 file renamer, M4A file renamer, WAV file renamer, FLAC file renamer, audio renamer for Mac, audio renamer for Windows',
  },
  '/mac': {
    title: 'AI File Renamer for Mac | Zush for Mac',
    description:
      'Zush for Mac is an AI file renamer and organizer for macOS. Rename by content with custom rules, preview every filename, undo batches, and choose cloud or local AI.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/windows': {
    title: 'AI File Renamer for Windows | Zush for Windows',
    description:
      'Zush for Windows is an AI file renamer and organizer for Windows 10 and 11. Rename by content with custom rules, preview every filename, and undo any batch.',
    robots: 'index, follow',
    ogType: 'website',
  },
  '/thank-you': PRIVATE_META,
  '/recover': PRIVATE_META,
  '/activate': PRIVATE_META,
  '/manage-subscription': PRIVATE_META,
  '/manage-subscription/confirm': PRIVATE_META,
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
    getPrimaryAuthorJsonLd(),
    {
      '@type': 'WebPage',
      '@id': `${SITE_ORIGIN}/#webpage`,
      url: SITE_ORIGIN,
      name: HOME_PAGE_TITLE,
      description: HOME_PAGE_DESCRIPTION,
      isPartOf: WEBSITE_REF,
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
      alternateName: [...ZUSH_BRAND_ALTERNATE_NAMES],
      url: SITE_ORIGIN,
      mainEntityOfPage: {
        '@id': `${SITE_ORIGIN}/#webpage`,
      },
      description:
        `Zush is an AI file renamer for macOS and Windows that builds filenames from file content, metadata, dates, custom prompts, and 145+ reusable naming blocks. Users preview changes before applying them, can undo any batch, and choose ${AI_MODES_SUMMARY}.`,
      keywords: HOME_KEYWORDS,
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'File Renaming and Organization',
      operatingSystem: ['macOS 15.0+', 'Windows 10', 'Windows 11'],
      softwareVersion: `${MAC_APP_VERSION} (macOS); ${WINDOWS_APP_VERSION} (Windows)`,
      author: {
        '@id': `${PRIMARY_AUTHOR.url}#person`,
      },
      publisher: ORGANIZATION_REF,
      downloadUrl: [MAC_INSTALLER_URL, APP_STORE_URL, HOMEBREW_CASK_URL, WINDOWS_STORE_URL],
      installUrl: [APP_STORE_URL, HOMEBREW_CASK_URL, WINDOWS_STORE_URL],
      sameAs: [
        APP_STORE_URL,
        WINDOWS_STORE_URL,
        PRODUCT_HUNT_URL,
        GITHUB_RELEASES_URL,
        HOMEBREW_CASK_URL,
        GOOGLE_WORKSPACE_MARKETPLACE_URL,
      ],
      image: DEFAULT_OG_IMAGE,
      screenshot: [
        `${SITE_ORIGIN}/images/screenshots/light/zush-main-interface.webp`,
        `${SITE_ORIGIN}/images/showcase/windows/batch-rename-light.webp`,
      ],
      ...buildAppAggregateRatingJsonLd(),
      ...buildSoftpediaReviewJsonLd(),
      offers: [
        {
          '@type': 'Offer',
          name: 'Free starter',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: SITE_ORIGIN,
          description: `Free tier with ${APP_CONFIG.free_tier_limit} AI renames shared across ${AI_MODES_SUMMARY}`,
        },
        {
          '@type': 'Offer',
          price: PRO_PRICING.monthly.schemaPrice,
          priceCurrency: 'USD',
          name: 'Zush PRO Monthly',
          availability: 'https://schema.org/InStock',
          url: `${SITE_ORIGIN}/pricing`,
          description: `Monthly subscription with unlimited renames across ${AI_MODES_SUMMARY}.`,
        },
        {
          '@type': 'Offer',
          price: PRO_PRICING.oneTime.schemaPrice,
          priceCurrency: 'USD',
          name: 'Zush PRO One-Time',
          availability: 'https://schema.org/InStock',
          url: `${SITE_ORIGIN}/pricing`,
          description: `One-time purchase with unlimited renames across ${AI_MODES_SUMMARY}.`,
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
        'Built-in Local AI, LM Studio, and Ollama modes for supported on-device analysis',
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
