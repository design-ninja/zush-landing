import { SITE_ORIGIN } from '@/seo/config';

export function GET() {
  const body = [
    '# Robots.txt for Zush Landing Page',
    '# https://zushapp.com',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Transactional pages are controlled with `noindex` meta in page HTML.',
    '# We intentionally keep crawling allowed so bots can process noindex.',
    '',
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
