import type { FAQCopyItem } from '@/i18n/copy';

export const PROFESSION_KEYS = [
  'accountants',
  'medical',
  'photographers',
  'legal',
  'hr',
  'real-estate',
] as const;

export type ProfessionKey = (typeof PROFESSION_KEYS)[number];

export const PROFESSION_ROUTES: Record<ProfessionKey, `/${string}`> = {
  accountants: '/for-accountants',
  medical: '/for-medical',
  photographers: '/for-photographers',
  legal: '/for-legal',
  hr: '/for-hr',
  'real-estate': '/for-real-estate',
};

export function getProfessionKeyForRoute(route: string): ProfessionKey | undefined {
  return PROFESSION_KEYS.find((key) => PROFESSION_ROUTES[key] === route);
}

export interface ProfessionFieldCopy {
  label: string;
  before: string;
  after: string;
  emphasis?: string;
}

export interface ProfessionCardCopy {
  title: string;
  description: string;
  example?: string;
  badge?: string;
  badgeTone?: 'success';
  kind?: 'cloud-ai' | 'byok' | 'offline-ai';
  image?: string;
  imageAlt?: string;
}

export interface ProfessionSectionCopy {
  eyebrow?: string;
  title: string;
  description: string;
  items: ProfessionCardCopy[];
}

export interface ProfessionPageCopy {
  path: `/${string}`;
  seo: {
    title: string;
    description: string;
  };
  pageTitle: string;
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    trustLine: string[];
    photoAlt: string;
    downloadMac: string;
    downloadWindows: string;
    trustAria: string;
  };
  demoLabel: string;
  audiences: ProfessionSectionCopy;
  fields: {
    title: string;
    description: string;
    instruction: string;
    ariaLabel: string;
    hint: string;
    footnote?: string;
    filenamePattern?: string;
    filenameExamples?: string[];
    items: ProfessionFieldCopy[];
  };
  privacy: ProfessionSectionCopy & {
    note: string;
    docsLinkLabel: string;
  };
  workflow: ProfessionSectionCopy & {
    links?: Array<{ label: string; href: string }>;
  };
  documents: ProfessionSectionCopy;
  outcomes?: ProfessionSectionCopy;
  testimonials?: Array<{ name: string; role: string; quote: string }>;
  testimonialsTitle?: string;
  testimonialsDescription?: string;
  testimonialsRatingAria?: string;
  pricingPreface?: string;
  faq: {
    title: string;
    description: string;
    items: FAQCopyItem[];
  };
  guides?: {
    title: string;
    description: string;
    slugs: string[];
  };
  finalCta: {
    title: string;
    subtitle: string;
  };
}

export type ProfessionLocaleCopy = Record<ProfessionKey, ProfessionPageCopy>;
