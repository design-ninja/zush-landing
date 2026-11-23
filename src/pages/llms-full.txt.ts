import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_ORIGIN } from '@/seo/config';
import { MAC_APP_VERSION, PRODUCT_FACTS_REVIEWED_AT, WINDOWS_APP_VERSION } from '@/constants';

function getDocsRoute(id: string): string {
  const route = `/${id.replace(/\/index$/, '')}`;
  const normalizedRoute = route === '/docs/index' ? '/docs' : route;
  return normalizedRoute.length > 1 && normalizedRoute.endsWith('/')
    ? normalizedRoute.slice(0, -1)
    : normalizedRoute;
}

function absolute(href: string): string {
  return href.startsWith('/') ? `${SITE_ORIGIN}${href}` : href;
}

/**
 * Turns a docs MDX body into plain Markdown for LLM readers: media and
 * screenshots are dropped, Starlight components become their text content,
 * and site-relative links become absolute URLs.
 */
function mdxToMarkdown(body: string): string {
  return (
    body
      .replace(/^import .*$/gm, '')
      .replace(/<figure>[\s\S]*?<\/figure>/g, '')
      .replace(/<video[\s\S]*?<\/video>/g, '')
      .replace(/<ThemedScreenshot[^>]*\/>/g, '')
      .replace(/<img[^>]*\/?>/g, '')
      .replace(
        /^[ \t]*<LinkCard\s+title="([^"]*)"\s+href="([^"]*)"(?:\s+description="([^"]*)")?\s*\/>/gm,
        (_, title: string, href: string, description?: string) =>
          `- [${title}](${absolute(href)})${description ? `: ${description}` : ''}`,
      )
      .replace(/<Aside[^>]*\btitle="([^"]*)"[^>]*>/g, '**$1:**')
      .replace(/<Aside\s+type="(\w+)"[^>]*>/g, (_, type: string) => `**${type[0].toUpperCase()}${type.slice(1)}:**`)
      .replace(/<Aside>/g, '**Note:**')
      .replace(/<\/?(Aside|Steps|CardGrid)>/g, '')
      .replace(/<a href="([^"]*)">([\s\S]*?)<\/a>/g, (_, href: string, text: string) => `[${text}](${absolute(href)})`)
      .replace(/<code>\{'([^']*)'\}<\/code>/g, '`$1`')
      .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
      .replace(/\]\((\/[^)\s]*)\)/g, (_, href: string) => `](${absolute(href)})`)
      // Each page is a "##" section in the combined file, so its own headings move down a level.
      .replace(/^(#{2,5}) /gm, '#$1 ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

export async function GET() {
  const docs = ((await getCollection('docs')) as CollectionEntry<'docs'>[])
    .filter((entry) => !entry.data.draft)
    .filter((entry) => entry.id === 'docs' || entry.id === 'docs/index' || entry.id.startsWith('docs/'))
    .sort((a, b) => (a.data.sidebar.order ?? 999) - (b.data.sidebar.order ?? 999));

  const sections = docs.map((entry) => {
    const url = `${SITE_ORIGIN}${getDocsRoute(entry.id)}`;
    return [
      `## ${entry.data.title}`,
      '',
      `Source: ${url}`,
      ...(entry.data.description ? ['', `> ${entry.data.description}`] : []),
      '',
      mdxToMarkdown(entry.body ?? ''),
    ].join('\n');
  });

  const body = [
    '# Zush Documentation',
    '',
    '> The complete Zush documentation in one file. Zush is an AI file renamer and organizer for Mac and Windows that renames and sorts files by their content.',
    '',
    `Current versions: macOS ${MAC_APP_VERSION}; Windows ${WINDOWS_APP_VERSION}. Product facts reviewed: ${PRODUCT_FACTS_REVIEWED_AT}.`,
    `Short index with product pages and key facts: ${SITE_ORIGIN}/llms.txt`,
    '',
    sections.join('\n\n---\n\n'),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Like llms.txt, this file is for LLM readers and duplicates the docs pages.
      'X-Robots-Tag': 'noindex, follow',
    },
  });
}
