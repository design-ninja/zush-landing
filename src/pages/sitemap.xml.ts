import { execSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { join } from 'node:path';
import { getAllPosts, isSitemapEligibleBlogPost } from '@/data/blog';
import { INDEXABLE_STATIC_ROUTES, FEATURE_ROUTES, SITE_ORIGIN, THIN_CONTENT_THRESHOLD } from '@/seo/config';

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
      route !== '/manage-subscription',
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

  const posts = (await getAllPosts()).filter((post) =>
    isSitemapEligibleBlogPost(post, THIN_CONTENT_THRESHOLD),
  );
  const blogEntries = posts.map((post) => {
    const loc = `${SITE_ORIGIN}/blog/${post.slug}`;
    const filePath = join(BLOG_CONTENT_DIR, `${post.slug}.mdx`);

    return {
      loc,
      lastmod: getLastModifiedDate(filePath, new Date(`${post.date}T00:00:00.000Z`).toISOString()),
      changefreq: 'monthly' as Changefreq,
      priority: '0.7',
    };
  });

  const urls = [...staticEntries, ...blogEntries]
    .map(({ loc, lastmod, changefreq, priority }) => {
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
