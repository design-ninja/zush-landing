import {
  CRUNCHBASE_URL,
  FACEBOOK_PROFILE_URL,
  LINKEDIN_COMPANY_URL,
  SUPPORT_EMAIL,
  X_PROFILE_URL,
  YOUTUBE_CHANNEL_URL,
} from '@/constants';
import { PRIMARY_AUTHOR } from '@/data/author';

const SITE_ORIGIN = 'https://zushapp.com';

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const SOFTWARE_ID = `${SITE_ORIGIN}/#software`;

/** Reference to the single Organization node emitted on every page by BaseLayout. */
export const ORGANIZATION_REF = { '@id': ORGANIZATION_ID } as const;
export const WEBSITE_REF = { '@id': WEBSITE_ID } as const;

/** Genuine branded names used for the same Zush product. Generic product
 * categories belong in keywords and applicationSubCategory, not alternateName. */
export const ZUSH_BRAND_ALTERNATE_NAMES = [
  'Zush AI Renamer',
  'Zush AI File Renamer',
  'Zush File Renamer',
  'Zush Renamer',
  'Zush App',
] as const;

/** Recognized site-name variants, ordered from the preferred descriptive brand to the domain. */
export const ZUSH_SITE_ALTERNATE_NAMES = [
  'Zush AI Renamer',
  'Zush AI File Renamer',
  'Zush File Renamer',
  'Zush Renamer',
  'zushapp.com',
] as const;

/**
 * Reference to the product entity, which is fully described only on the homepage.
 * Pages that merely point at the product carry this typed stub instead of a bare
 * `@id`, so the reference identifies something on its own page. Deliberately holds
 * no claims (no price, no version) that could contradict the homepage node.
 */
export const SOFTWARE_REF = {
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: 'Zush',
  url: SITE_ORIGIN,
} as const;

/**
 * Every public profile that describes the same Zush entity.
 * Keep this list in sync with the profiles themselves — pricing, platforms, and
 * descriptions that contradict the site weaken the entity link instead of helping it.
 */
const ORGANIZATION_SAME_AS = [
  X_PROFILE_URL,
  YOUTUBE_CHANNEL_URL,
  CRUNCHBASE_URL,
  LINKEDIN_COMPANY_URL,
  FACEBOOK_PROFILE_URL,
];

export const ORGANIZATION_JSON_LD = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Zush',
  alternateName: [...ZUSH_BRAND_ALTERNATE_NAMES],
  url: SITE_ORIGIN,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_ORIGIN}/logo.png`,
  },
  image: `${SITE_ORIGIN}/logo.png`,
  description:
    'Zush builds an AI file renamer and organizer for Mac and Windows that renames files by their content.',
  email: SUPPORT_EMAIL,
  founder: {
    '@type': 'Person',
    '@id': `${PRIMARY_AUTHOR.url}#person`,
    name: PRIMARY_AUTHOR.name,
    url: PRIMARY_AUTHOR.url,
  },
  sameAs: ORGANIZATION_SAME_AS,
};

export const WEBSITE_JSON_LD = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_ORIGIN}/`,
  name: 'Zush',
  alternateName: [...ZUSH_SITE_ALTERNATE_NAMES],
  publishingPrinciples: `${SITE_ORIGIN}/methodology`,
  publisher: ORGANIZATION_REF,
  // The only site-wide search surface is the blog search page.
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_ORIGIN}/blog/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/** Organization is site-wide; WebSite is emitted only on the canonical domain homepage. */
export function buildSiteEntityJsonLd(includeWebsite = false) {
  return {
    '@context': 'https://schema.org',
    '@graph': [ORGANIZATION_JSON_LD, ...(includeWebsite ? [WEBSITE_JSON_LD] : [])],
  };
}
