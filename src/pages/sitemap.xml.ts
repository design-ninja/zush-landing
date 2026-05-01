import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join } from 'node:path';
import { getAllPosts, getAllTags, isSitemapEligibleBlogPost } from '@/data/blog';
import { INDEXABLE_STATIC_ROUTES, FEATURE_ROUTES, SITE_ORIGIN, THIN_CONTENT_THRESHOLD } from '@/seo/config';
import { DEFAULT_LOCALE, LOCALE_META, LOCALIZED_ROUTES, getAlternatePaths, getLocalesForRoute, getLocalizedPath } from '@/i18n/config';

const BLOG_CONTENT_DIR = join(process.cwd(), 'src', 'content', 'blog');
const PAGES_DIR = join(process.cwd(), 'src', 'pages');

function getPageSourceFile(route: string): string {
  if (route === '/') return join(PAGES_DIR, 'index.astro');
  if (route === '/blog') return join(PAGES_DIR, 'blog', 'index.astro');
  if (route === '/blog/archive') return join(PAGES_DIR, 'blog', 'archive', '[...page].astro');
  return join(PAGES_DIR, `${route.slice(1)}.astro`);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getGitDate(filePath: string): string | null {
  try {
    const output = execSync(`git log -1 --format=%cI -- ${JSON.stringify(filePath)}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();

    return output || null;
  } catch {
    return null;
  }
}

function getFileModifiedDate(filePath: string): string | null {
  try {
    return statSync(filePath).mtime.toISOString();
  } catch {
    return null;
  }
}

function getLastModifiedDate(filePath: string, fallbackDate: string): string {
  return getGitDate(filePath) ?? getFileModifiedDate(filePath) ?? fallbackDate;
}

type Changefreq = 'daily' | 'weekly' | 'monthly' | 'yearly';

function getRouteHints(route: string): { changefreq: Changefreq; priority: string } {
  if (route === '/') {
    return { changefreq: 'weekly', priority: '1.0' };
  }
  if (route === '/blog') {
    return { changefreq: 'weekly', priority: '0.9' };
  }
  if ((FEATURE_ROUTES as readonly string[]).includes(route)) {
    return { changefreq: 'weekly', priority: '0.8' };
  }
  if (route === '/mac' || route === '/windows') {
    return { changefreq: 'weekly', priority: '0.9' };
  }
  if (route === '/changelog') {
    return { changefreq: 'weekly', priority: '0.6' };
  }
  if (route === '/methodology') {
    return { changefreq: 'monthly', priority: '0.5' };
  }
  if (['/privacy-policy', '/terms-of-service', '/refund-policy'].includes(route)) {
    return { changefreq: 'yearly', priority: '0.3' };
  }
  return { changefreq: 'monthly', priority: '0.5' };
}

export async function GET() {
  const staticRoutes = INDEXABLE_STATIC_ROUTES.filter(
    (route) =>
      route !== '/thank-you' &&
      route !== '/recover' &&
      route !== '/activate' &&
      route !== '/manage-subscription' &&
      route !== '/manage-subscription/confirm',
  );
  const staticEntries = staticRoutes.map((route) => {
    const loc = `${SITE_ORIGIN}${route === '/' ? '/' : route}`;
    const { changefreq, priority } = getRouteHints(route);
    const sourceFile = getPageSourceFile(route);
    return {
      loc,
      lastmod: getLastModifiedDate(sourceFile, new Date('2026-03-01T00:00:00.000Z').toISOString()),
      changefreq,
      priority,
    };
  });
  const localizedEntries = LOCALIZED_ROUTES
    .filter((route) => INDEXABLE_STATIC_ROUTES.includes(route))
    .flatMap((route) =>
      getLocalesForRoute(route).filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => {
        const locPath = getLocalizedPath(route, locale);
        const loc = `${SITE_ORIGIN}${locPath}`;
        const { changefreq, priority } = getRouteHints(route);
        const sourceFile = getPageSourceFile(route);

        return {
          loc,
          route,
          lastmod: getLastModifiedDate(sourceFile, new Date('2026-03-01T00:00:00.000Z').toISOString()),
          changefreq,
          priority,
        };
      }),
    );

  const posts = (await getAllPosts()).filter((post) =>
    isSitemapEligibleBlogPost(post, THIN_CONTENT_THRESHOLD),
  );
  const blogEntries = posts.map((post) => {
    const loc = `${SITE_ORIGIN}/blog/${post.slug}`;
    const filePath = join(BLOG_CONTENT_DIR, `${post.slug}.mdx`);

    return {
      loc,
      route: undefined,
      lastmod: getLastModifiedDate(filePath, new Date(`${post.date}T00:00:00.000Z`).toISOString()),
      changefreq: 'monthly' as Changefreq,
      priority: '0.7',
    };
  });

  const tagEntries = (await getAllTags())
    .filter((tag) => tag.indexable)
    .map((tag) => ({
      loc: `${SITE_ORIGIN}/blog/tags/${tag.slug}`,
      route: undefined,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly' as Changefreq,
      priority: '0.55',
    }));

  const urls = [...staticEntries.map((entry) => ({ ...entry, route: entry.loc.replace(SITE_ORIGIN, '') || '/' })), ...localizedEntries, ...blogEntries, ...tagEntries]
    .map(({ loc, route, lastmod, changefreq, priority }) => {
      const normalizedRoute = LOCALIZED_ROUTES.includes(route as never)
        ? route
        : undefined;
      const alternates = normalizedRoute
        ? Object.entries(getAlternatePaths(normalizedRoute))
          .map(([locale, path]) => {
            const hreflang = LOCALE_META[locale as keyof typeof LOCALE_META].lang;
            return `    <xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(`${SITE_ORIGIN}${path}`)}" />`;
          })
          .join('\n')
        : '';
      const xDefault = normalizedRoute
        ? `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${SITE_ORIGIN}${getLocalizedPath(normalizedRoute, DEFAULT_LOCALE)}`)}" />`
        : '';

      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${alternates ? `\n${alternates}${xDefault}` : ''}\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
