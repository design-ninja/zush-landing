import {
  Camera,
  Palette,
  Megaphone,
  Code,
  Video,
  Briefcase,
  FileText,
  GraduationCap,
  Scale,
  Building2,
  Image,
  Monitor,
} from 'lucide-react';
import type { UseCaseData } from '@/components/UseCases/UseCases';

// ---------- USE CASES PER CATEGORY ----------

const imageUseCases: UseCaseData[] = [
  {
    icon: Camera,
    title: 'Photographers',
    description: (
      <>
        Replace <strong>IMG_4382.jpg</strong> with meaningful scene descriptions.
        Supports <strong>RAW formats</strong> like CR2, NEF, ARW, DNG, and more.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Palette,
    title: 'UI/UX Designers',
    description: (
      <>
        Screenshots of competitor apps, design references, and mockup iterations —
        all named by <strong>what they show</strong>, not when they were taken.
      </>
    ),
    color: 'purple',
  },
  {
    icon: Megaphone,
    title: 'Social Media Managers',
    description: (
      <>
        Campaign visuals, ad creatives, and post assets —
        <strong> instantly searchable</strong> by content instead of cryptic filenames.
      </>
    ),
    color: 'orange',
  },
  {
    icon: Video,
    title: 'Content Creators',
    description: (
      <>
        Thumbnails, b-roll stills, and visual references —
        find the <strong>right image</strong> without scrolling through hundreds.
      </>
    ),
    color: 'pink',
  },
  {
    icon: Code,
    title: 'Developers',
    description: (
      <>
        Bug screenshots, PR review captures, and documentation images —
        <strong> always labeled</strong> by the issue or feature they document.
      </>
    ),
    color: 'green',
  },
  {
    icon: Image,
    title: 'Stock Photo Curators',
    description: (
      <>
        Bulk-rename stock libraries with <strong>SEO-friendly descriptive names</strong> that
        help images rank in search and are easier to license.
      </>
    ),
    color: 'cyan',
  },
];

const documentUseCases: UseCaseData[] = [
  {
    icon: Scale,
    title: 'Legal Teams',
    description: (
      <>
        Contracts, NDAs, and compliance filings — renamed by
        <strong> parties, date, and document type</strong> for fast retrieval.
      </>
    ),
    color: 'purple',
  },
  {
    icon: Building2,
    title: 'Finance & Accounting',
    description: (
      <>
        Invoices, receipts, bank statements, and tax forms — AI reads the content and
        <strong> names them by vendor, amount, and period</strong>.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Briefcase,
    title: 'Project Managers',
    description: (
      <>
        SOWs, project plans, meeting minutes, and status reports —
        <strong> instantly findable</strong> by project name and document type.
      </>
    ),
    color: 'orange',
  },
  {
    icon: GraduationCap,
    title: 'Students & Researchers',
    description: (
      <>
        Research papers, lecture notes, and study guides — renamed by
        <strong> subject, author, and topic</strong> instead of "download (14).pdf".
      </>
    ),
    color: 'green',
  },
  {
    icon: FileText,
    title: 'HR & Recruiting',
    description: (
      <>
        Resumes, offer letters, and onboarding docs — AI extracts
        <strong> candidate names and roles</strong> for organized hiring pipelines.
      </>
    ),
    color: 'pink',
  },
  {
    icon: Monitor,
    title: 'IT & Operations',
    description: (
      <>
        System logs, configuration exports, and runbooks —
        <strong> labeled by system, date, and action</strong> for fast incident response.
      </>
    ),
    color: 'cyan',
  },
];

const pdfUseCases: UseCaseData[] = [
  {
    icon: Building2,
    title: 'Invoice folders',
    description: (
      <>
        Rename vendor invoices by <strong>supplier, invoice date, and billing period</strong> so accounting folders sort cleanly.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Scale,
    title: 'Contracts & NDAs',
    description: (
      <>
        Turn legal PDFs into names with <strong>counterparty, agreement type, status, and date</strong> instead of "signed.pdf".
      </>
    ),
    color: 'purple',
  },
  {
    icon: Briefcase,
    title: 'Client paperwork',
    description: (
      <>
        Proposals, scopes, creative briefs, and approvals stay searchable by
        <strong> client, project, and document role</strong>.
      </>
    ),
    color: 'orange',
  },
  {
    icon: GraduationCap,
    title: 'Scans & research PDFs',
    description: (
      <>
        Scanned letters, articles, and forms get names based on
        <strong> visible page content</strong>, even when the file has no useful title.
      </>
    ),
    color: 'green',
  },
  {
    icon: FileText,
    title: 'Receipts & reimbursements',
    description: (
      <>
        Save expense PDFs as <strong>merchant, purchase type, and date</strong> for fast reimbursement review.
      </>
    ),
    color: 'pink',
  },
  {
    icon: Monitor,
    title: 'Statements & tax records',
    description: (
      <>
        Bank statements, insurance policies, and tax forms are labeled by
        <strong> institution, form type, and period</strong>.
      </>
    ),
    color: 'cyan',
  },
];

const screenshotUseCases: UseCaseData[] = [
  {
    icon: Code,
    title: 'Developers',
    description: (
      <>
        Bug reports, error logs, and UI states — renamed from
        <strong> "Screenshot 2026-03-15"</strong> to what the screenshot actually shows.
      </>
    ),
    color: 'green',
  },
  {
    icon: Palette,
    title: 'Designers',
    description: (
      <>
        Competitor analysis, design inspiration, and review captures —
        <strong> named by app, screen, and context</strong> automatically.
      </>
    ),
    color: 'purple',
  },
  {
    icon: Megaphone,
    title: 'Marketers',
    description: (
      <>
        Analytics dashboards, ad performance captures, and social proof —
        <strong> searchable by campaign and metric</strong>.
      </>
    ),
    color: 'orange',
  },
  {
    icon: Briefcase,
    title: 'Product Managers',
    description: (
      <>
        Feature specs, user feedback captures, and competitive screenshots —
        <strong> organized by product and feature</strong>.
      </>
    ),
    color: 'cyan',
  },
  {
    icon: GraduationCap,
    title: 'Students',
    description: (
      <>
        Lecture slides, research screenshots, and reference captures —
        <strong> named by subject and topic</strong> for easy exam prep.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Video,
    title: 'Content Creators',
    description: (
      <>
        Tutorial captures, before/after comparisons, and tool demos —
        <strong> labeled by step and context</strong> for video production.
      </>
    ),
    color: 'pink',
  },
];

const photoUseCases: UseCaseData[] = [
  {
    icon: Camera,
    title: 'Professional Photographers',
    description: (
      <>
        Wedding galleries, event shoots, and portrait sessions — AI describes each photo's
        <strong> subject, scene, and composition</strong> for client delivery.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Palette,
    title: 'Product Photographers',
    description: (
      <>
        E-commerce product shots, lifestyle images, and detail angles —
        <strong> named by product, angle, and variant</strong> for catalog uploads.
      </>
    ),
    color: 'purple',
  },
  {
    icon: Video,
    title: 'Travel Bloggers',
    description: (
      <>
        Travel photos organized by <strong>location, landmark, and scene</strong> —
        no more guessing which IMG_ is which destination.
      </>
    ),
    color: 'orange',
  },
  {
    icon: Building2,
    title: 'Real Estate Agents',
    description: (
      <>
        Property photos named by <strong>room, feature, and address</strong> —
        ready for MLS listings without manual sorting.
      </>
    ),
    color: 'green',
  },
  {
    icon: Megaphone,
    title: 'Social Media Managers',
    description: (
      <>
        Campaign photos and brand assets — AI names each by
        <strong> content and style</strong> for quick posting.
      </>
    ),
    color: 'pink',
  },
  {
    icon: Image,
    title: 'Photo Archivists',
    description: (
      <>
        Historical photos and family archives — <strong>descriptive names</strong> that
        preserve context for future generations.
      </>
    ),
    color: 'cyan',
  },
];

// ---------- CATEGORY LOOKUP ----------

export type FeatureCategory = 'general' | 'image' | 'document' | 'screenshot' | 'photo' | 'pdf';

const useCasesMap: Record<FeatureCategory, { title: string; description: string; items: UseCaseData[] }> = {
  general: {
    title: 'Who Uses AI File Renaming',
    description: 'From designers to developers — Zush saves hours for everyone who works with files',
    items: [], // uses default
  },
  image: {
    title: 'Who Uses AI Image Renaming',
    description: 'Photographers, designers, and creators who need searchable image libraries',
    items: imageUseCases,
  },
  document: {
    title: 'Who Uses AI Document Renaming',
    description: 'Legal teams, accountants, and managers who handle hundreds of documents daily',
    items: documentUseCases,
  },
  pdf: {
    title: 'Who Uses AI PDF Renaming',
    description: 'People who need searchable invoices, contracts, scans, statements, and receipts',
    items: pdfUseCases,
  },
  screenshot: {
    title: 'Who Uses AI Screenshot Renaming',
    description: 'Developers, designers, and PMs who take dozens of screenshots every day',
    items: screenshotUseCases,
  },
  photo: {
    title: 'Who Uses AI Photo Renaming',
    description: 'Photographers and creators who need organized, searchable photo libraries',
    items: photoUseCases,
  },
};

export function getUseCasesForCategory(category: FeatureCategory) {
  return useCasesMap[category];
}
