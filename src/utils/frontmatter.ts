export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  tldr: string;
  wordCount: number;
  readingTime: number;
  authorName: string;
  reviewerName: string;
  reviewedAt: string;
  noindex: boolean;
  canonical?: string;
}

export interface ParsedPost {
  frontmatter: BlogFrontmatter;
  content: string;
  faq: FAQItem[];
}

function extractFAQ(content: string): FAQItem[] {
  const faqMatch = content.match(
    /## (?:FAQ|Frequently Asked Questions)\s*\n([\s\S]*)$/,
  );
  if (!faqMatch) return [];

  const items: FAQItem[] = [];
  const lines = faqMatch[1].split('\n');
  let currentQ = '';
  let currentA = '';

  for (const line of lines) {
    const qMatch = line.match(/^###\s+(.+)/);
    if (qMatch) {
      if (currentQ && currentA.trim()) {
        items.push({ question: currentQ, answer: currentA.trim() });
      }
      currentQ = qMatch[1];
      currentA = '';
    } else if (currentQ) {
      currentA += line + '\n';
    }
  }
  if (currentQ && currentA.trim()) {
    items.push({ question: currentQ, answer: currentA.trim() });
  }

  return items;
}

export function parseFrontmatter(raw: string): ParsedPost {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Blog post missing frontmatter');
  }

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line
      .slice(idx + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
  }

  const content = match[2].trim();
  const wordCount = content.split(/\s+/).length;

  return {
    frontmatter: {
      title: meta.title ?? '',
      description: meta.description ?? '',
      date: meta.date ?? '',
      slug: meta.slug ?? '',
      tags: (meta.tags ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      tldr: meta.tldr ?? '',
      wordCount,
      readingTime: Math.ceil(wordCount / 200),
      authorName: meta.author || 'lirik',
      reviewerName: meta.reviewer || '',
      reviewedAt: meta.reviewed || meta.date || '',
      noindex: meta.noindex === 'true',
      canonical: meta.canonical || undefined,
    },
    content,
    faq: extractFAQ(content),
  };
}
