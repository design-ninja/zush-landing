const SITE_ORIGIN = 'https://zushapp.com';

export const PRIMARY_AUTHOR = {
  name: 'Kirill Isachenko',
  alternateName: 'lirik',
  role: 'Founder, designer, and developer of Zush',
  url: `${SITE_ORIGIN}/authors/kirill-isachenko`,
  image: `${SITE_ORIGIN}/images/authors/lirik-ava-fancy.webp`,
} as const;

export function getPrimaryAuthorJsonLd() {
  return {
    '@type': 'Person',
    '@id': `${PRIMARY_AUTHOR.url}#person`,
    name: PRIMARY_AUTHOR.name,
    alternateName: PRIMARY_AUTHOR.alternateName,
    url: PRIMARY_AUTHOR.url,
    image: PRIMARY_AUTHOR.image,
    jobTitle: 'Founder, designer, and software developer',
    worksFor: {
      '@id': `${SITE_ORIGIN}/#organization`,
    },
  };
}
