import { getBlogSearchIndex } from '@/data/blog';

/**
 * Full-text search index for /blog/search. Built once at build time and fetched
 * only by the search page, so the blog index itself stays light.
 */
export async function GET() {
  const docs = await getBlogSearchIndex();

  return new Response(JSON.stringify({ posts: docs }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
