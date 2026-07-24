import {
  APP_STORE_URL,
  CRUNCHBASE_URL,
  GITHUB_RELEASES_URL,
  HOMEBREW_CASK_URL,
  LINKEDIN_COMPANY_URL,
  PRODUCT_HUNT_URL,
  SUPPORT_EMAIL,
  WINDOWS_STORE_URL,
  X_PROFILE_URL,
  YOUTUBE_CHANNEL_URL,
} from '@/constants';
import { PRIMARY_AUTHOR } from '@/data/author';

const SITE_ORIGIN = 'https://zushapp.com';

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const SOFTWARE_ID = `${SITE_ORIGIN}/#software`;

/** Reference to the single Organization node emitted on every page by BaseLayout. */
export const ORGANIZATION_REF = { '@id': ORGANIZATION_ID } as const;
export const WEBSITE_REF = { '@id': WEBSITE_ID } as const;

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
export const ORGANIZATION_SAME_AS = [
  X_PROFILE_URL,
  YOUTUBE_CHANNEL_URL,
  PRODUCT_HUNT_URL,
  CRUNCHBASE_URL,
  LINKEDIN_COMPANY_URL,
  GITHUB_RELEASES_URL,
  HOMEBREW_CASK_URL,
  APP_STORE_URL,
  WINDOWS_STORE_URL,
];

const ORGANIZATION_JSON_LD = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Zush',
  alternateName: 'Zush AI File Renamer',
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

const WEBSITE_JSON_LD = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_ORIGIN,
  name: 'Zush',
  alternateName: 'Zush AI File Renamer',
  publishingPrinciples: `${SITE_ORIGIN}/methodology`,
  publisher: ORGANIZATION_REF,
};

/**
 * Site-wide identity graph. Emitted on every page so that `@id` references to the
 * Organization and WebSite nodes resolve no matter which page a crawler lands on.
 */
export const SITE_ENTITY_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [ORGANIZATION_JSON_LD, WEBSITE_JSON_LD],
};
