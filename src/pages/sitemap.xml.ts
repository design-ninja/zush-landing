import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { getAllPosts } from '@/data/blog';
import { INDEXABLE_STATIC_ROUTES, SITE_ORIGIN } from '@/seo/config';

const BLOG_CONTENT_DIR = join(process.cwd(), 'src', 'content', 'blog');

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

export function GET() {
  const staticRoutes = INDEXABLE_STATIC_ROUTES.filter(
    (route) =>
      route !== '/thank-you' &&
      route !== '/recover' &&
      route !== '/activate' &&
      route !== '/manage-subscription',
  );
  const staticEntries = staticRoutes.map((route) => {
    const loc = `${SITE_ORIGIN}${route === '/' ? '/' : route}`;
    return {
      loc,
      lastmod: new Date().toISOString(),
    };
  });

  const posts = getAllPosts();
  const blogEntries = posts.map((post) => {
    const loc = `${SITE_ORIGIN}/blog/${post.slug}`;
    const filePath = join(BLOG_CONTENT_DIR, `${post.slug}.md`);
    const gitDate = getGitDate(filePath);

    return {
      loc,
      lastmod: gitDate ?? new Date(`${post.date}T00:00:00.000Z`).toISOString(),
    };
  });

  const urls = [...staticEntries, ...blogEntries]
    .map(({ loc, lastmod }) => {
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
