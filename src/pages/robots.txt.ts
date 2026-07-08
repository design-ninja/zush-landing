import { SITE_ORIGIN } from '@/seo/config';

export function GET() {
  const body = [
    '# Robots.txt for Zush Landing Page',
    '# https://zushapp.com',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Explicitly allow major search and AI discovery crawlers.',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    'User-agent: BingPreview',
    'Allow: /',
    '',
    'User-agent: msnbot',
    'Allow: /',
    '',
    'User-agent: DuckDuckBot',
    'Allow: /',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: anthropic-ai',
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
