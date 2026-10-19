import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';
import { PRIMARY_AUTHOR } from '@/data/author';
import { SITE_ORIGIN } from '@/seo/config';
import { ORGANIZATION_REF, SOFTWARE_REF, WEBSITE_REF } from '@/seo/entity';

// Starlight renders /docs outside BaseLayout, so the docs pages carried no
// structured data at all. Describe each page as a TechArticle about the app,
// with the same entity @ids the rest of the site uses.
export const onRequest = defineRouteMiddleware((context) => {
  // Starlight's App.Locals augmentation is not part of this project's type roots.
  const route = (context.locals as { starlightRoute: StarlightRouteData }).starlightRoute;
  const pathname = context.url.pathname.replace(/\/$/, '');
  const url = `${SITE_ORIGIN}${pathname}`;
  const isIndex = pathname === '/docs';
  const { entry, lastUpdated } = route;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: entry.data.title,
        ...(entry.data.description ? { description: entry.data.description } : {}),
        url,
        inLanguage: 'en',
        ...(lastUpdated ? { dateModified: lastUpdated.toISOString() } : {}),
        author: { '@id': `${PRIMARY_AUTHOR.url}#person` },
        publisher: ORGANIZATION_REF,
        isPartOf: WEBSITE_REF,
        about: SOFTWARE_REF,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
          { '@type': 'ListItem', position: 2, name: 'Docs', item: `${SITE_ORIGIN}/docs` },
          ...(isIndex ? [] : [{ '@type': 'ListItem', position: 3, name: entry.data.title, item: url }]),
        ],
      },
    ],
  };

  route.head.push({
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    content: JSON.stringify(jsonLd),
  });
});
