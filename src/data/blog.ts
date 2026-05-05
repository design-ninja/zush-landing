import { getCollection, type CollectionEntry } from 'astro:content';
import {
  BLOG_PUBLIC_TAGS,
  getBlogPublicTagSlug,
  type BlogPublicTagSlug,
} from '@/data/blogTaxonomy';
import {
  BLOG_PLATFORM_META,
  type BlogPlatform,
  type BlogTopic,
} from '@/data/blogSchema';

export type BlogEntry = CollectionEntry<'blog'>;

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  dateValue: Date;
  tags: string[];
  tldr: string;
  platform: BlogPlatform;
  topic: BlogTopic;
  wordCount: number;
  readingTime: number;
  authorName: string;
  reviewerName: string;
  reviewedAt: string;
  reviewedDateValue: Date;
  noindex: boolean;
  canonical?: string;
  featuredOrder?: number;
}

export interface BlogPostDetails {
  entry: BlogEntry;
  post: BlogPost;
  faq: FAQItem[];
}

export interface BlogSection {
  platform: BlogPlatform;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  posts: BlogPost[];
}

export interface BlogTag {
  id: BlogPublicTagSlug;
  slug: string;
  label: string;
  count: number;
  description: string;
  seoTitle: string;
  seoDescription: string;
  indexable: boolean;
  posts: BlogPost[];
}

const INDEXABLE_TAG_MIN_POSTS = 2;
const WORDS_PER_MINUTE = 200;

function toIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function sanitizeBody(body: string): string {
  return body
    .replace(/^import\s.+$/gm, '')
    .replace(/^export\s.+$/gm, '')
    .trim();
}

function countWords(content: string): number {
  return (content.match(/\b[\w'-]+\b/g) ?? []).length;
}

function extractFAQ(content: string): FAQItem[] {
  const faqMatch = content.match(
    /## (?:FAQ|Frequently Asked Questions)\s*\n([\s\S]*)$/,
  );
  if (!faqMatch) return [];

  const items: FAQItem[] = [];
  const lines = faqMatch[1].split('\n');
  let currentQuestion = '';
  let currentAnswer = '';

  for (const line of lines) {
    const questionMatch = line.match(/^###\s+(.+)/);
    if (questionMatch) {
      if (currentQuestion && currentAnswer.trim()) {
        items.push({
          question: currentQuestion,
          answer: currentAnswer.trim(),
        });
      }
      currentQuestion = questionMatch[1];
      currentAnswer = '';
      continue;
    }

    if (currentQuestion) {
      currentAnswer += `${line}\n`;
    }
  }

  if (currentQuestion && currentAnswer.trim()) {
    items.push({
      question: currentQuestion,
      answer: currentAnswer.trim(),
    });
  }

  return items;
}

function sortEntriesByDate(entries: BlogEntry[]): BlogEntry[] {
  return [...entries].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export function normalizeTagSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatBlogDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(`${value}T00:00:00`) : value;

  try {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return typeof value === 'string' ? value : toIsoDate(value);
  }
}

function toBlogPost(entry: BlogEntry): BlogPost {
  const sanitizedBody = sanitizeBody(entry.body);
  const wordCount = countWords(sanitizedBody);
  const reviewedDateValue = entry.data.reviewed ?? entry.data.date;

  return {
    id: entry.id,
    slug: entry.data.slug,
    title: entry.data.title,
    description: entry.data.description,
    date: toIsoDate(entry.data.date),
    dateValue: entry.data.date,
    tags: entry.data.tags,
    tldr: entry.data.tldr,
    platform: entry.data.platform,
    topic: entry.data.topic,
    wordCount,
    readingTime: Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE)),
    authorName: entry.data.author ?? 'lirik',
    reviewerName: entry.data.reviewer ?? '',
    reviewedAt: toIsoDate(reviewedDateValue),
    reviewedDateValue,
    noindex: entry.data.noindex === true,
    canonical: entry.data.canonical || undefined,
    featuredOrder: entry.data.featuredOrder,
  };
}

async function getSortedEntries(): Promise<BlogEntry[]> {
  return sortEntriesByDate(await getCollection('blog'));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return (await getSortedEntries()).map(toBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetails | undefined> {
  const entry = (await getCollection('blog')).find(
    (item: BlogEntry) => item.data.slug === slug,
  );

  if (!entry) {
    return undefined;
  }

  const sanitizedBody = sanitizeBody(entry.body);

  return {
    entry,
    post: toBlogPost(entry),
    faq: extractFAQ(sanitizedBody),
  };
}

export async function getFeaturedPostsByPlatform(
  platform: BlogPlatform,
  limit?: number,
): Promise<BlogPost[]> {
  const posts = (await getAllPosts())
    .filter((post) => post.platform === platform)
    .sort((a, b) => {
      if (a.featuredOrder != null && b.featuredOrder != null) {
        return a.featuredOrder - b.featuredOrder;
      }

      if (a.featuredOrder != null) return -1;
      if (b.featuredOrder != null) return 1;

      return b.dateValue.getTime() - a.dateValue.getTime();
    });

  if (typeof limit === 'number') {
    return posts.slice(0, limit);
  }

  return posts;
}

export async function getBlogIndexSections(): Promise<BlogSection[]> {
  const platforms: BlogPlatform[] = ['general', 'mac', 'windows'];

  return Promise.all(
    platforms.map(async (platform) => ({
      platform,
      ...BLOG_PLATFORM_META[platform],
      posts: await getFeaturedPostsByPlatform(platform, 3),
    })),
  );
}

function scoreRelatedPost(current: BlogPost, candidate: BlogPost): number {
  const currentTags = new Set(current.tags);
  const tagOverlap = candidate.tags.filter((tag) => currentTags.has(tag)).length;
  const sameTopic = candidate.topic === current.topic;
  const samePlatform = candidate.platform === current.platform;
  const crossPlatformBridge =
    current.platform !== 'general' && candidate.platform === 'general';
  const platformExpansion =
    current.platform === 'general' &&
    candidate.platform !== 'general' &&
    candidate.topic === current.topic;

  return (
    (sameTopic ? 100 : 0) +
    tagOverlap * 12 +
    (samePlatform ? 25 : 0) +
    (crossPlatformBridge ? 12 : 0) +
    (platformExpansion ? 8 : 0) +
    candidate.dateValue.getTime() / 10 ** 15
  );
}

function pickTopCandidate(
  posts: BlogPost[],
  currentSlug: string,
  selected: Set<string>,
  predicate: (post: BlogPost) => boolean,
): BlogPost | undefined {
  return posts.find(
    (post) =>
      post.slug !== currentSlug &&
      !selected.has(post.slug) &&
      predicate(post),
  );
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    return [];
  }

  const ranked = posts
    .filter((post) => post.slug !== slug)
    .sort((a, b) => scoreRelatedPost(current, b) - scoreRelatedPost(current, a));

  const selected: BlogPost[] = [];
  const selectedSlugs = new Set<string>();

  const add = (post?: BlogPost) => {
    if (!post || selectedSlugs.has(post.slug)) {
      return;
    }

    selected.push(post);
    selectedSlugs.add(post.slug);
  };

  if (current.platform === 'general') {
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === 'general'));
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === 'mac'));
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === 'windows'));
  } else {
    add(
      pickTopCandidate(
        ranked,
        slug,
        selectedSlugs,
        (post) => post.platform === current.platform,
      ),
    );
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === 'general'));
    add(
      pickTopCandidate(
        ranked,
        slug,
        selectedSlugs,
        (post) => post.platform === current.platform,
      ),
    );
  }

  for (const post of ranked) {
    if (selected.length >= limit) {
      break;
    }
    add(post);
  }

  return selected.slice(0, limit);
}

export async function getRecentBlogPosts(limit = 6): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getAllTags(): Promise<BlogTag[]> {
  const posts = await getAllPosts();
  const tags = new Map<BlogPublicTagSlug, BlogTag>();

  for (const post of posts) {
    for (const label of post.tags) {
      const slug = getBlogPublicTagSlug(label);
      if (!slug) {
        continue;
      }
      const current = tags.get(slug);

      if (current) {
        current.count += 1;
        current.posts.push(post);
        continue;
      }

      const meta = BLOG_PUBLIC_TAGS[slug];
      tags.set(slug, {
        id: slug,
        slug,
        label,
        count: 1,
        description: meta.description,
        seoTitle: meta.seoTitle,
        seoDescription: meta.seoDescription,
        indexable: true,
        posts: [post],
      });
    }
  }

  return [...tags.values()]
    .map((tag) => ({
      ...tag,
      indexable: tag.count >= INDEXABLE_TAG_MIN_POSTS,
      posts: tag.posts.sort(
        (a, b) => b.dateValue.getTime() - a.dateValue.getTime(),
      ),
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function isSitemapEligibleBlogPost(post: BlogPost, thinContentThreshold: number): boolean {
  return (
    post.wordCount >= thinContentThreshold &&
    !post.noindex &&
    !post.canonical
  );
}
