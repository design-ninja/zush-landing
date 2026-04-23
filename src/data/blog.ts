import {
  BLOG_GUIDE_SLUGS,
  BLOG_PLATFORM_META,
  type BlogPlatform,
} from '@/data/blogSchema';
import {
  parseFrontmatter,
  type ParsedPost,
  type BlogFrontmatter,
} from '@/utils/frontmatter';

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as Record<string, string>;

const allPosts: ParsedPost[] = Object.values(modules)
  .map((raw) => parseFrontmatter(raw))
  .sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

export function getAllPosts(): BlogFrontmatter[] {
  return allPosts.map((p) => p.frontmatter);
}

export function getPostBySlug(slug: string): ParsedPost | undefined {
  return allPosts.find((p) => p.frontmatter.slug === slug);
}

export function getAllSlugs(): string[] {
  return allPosts.map((p) => p.frontmatter.slug);
}

export function getPostsByPlatform(platform: BlogPlatform): BlogFrontmatter[] {
  return allPosts
    .map((post) => post.frontmatter)
    .filter((post) => post.platform === platform);
}

function getPostBySlugFromFrontmatter(slug: string): BlogFrontmatter | undefined {
  return allPosts.find((post) => post.frontmatter.slug === slug)?.frontmatter;
}

export function getFeaturedPostsByPlatform(
  platform: BlogPlatform,
  limit?: number,
): BlogFrontmatter[] {
  const featured = BLOG_GUIDE_SLUGS[platform]
    .map((slug) => getPostBySlugFromFrontmatter(slug))
    .filter((post): post is BlogFrontmatter => Boolean(post));

  if (typeof limit === 'number' && featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const seen = new Set(featured.map((post) => post.slug));
  const fallback = getPostsByPlatform(platform).filter((post) => !seen.has(post.slug));
  const allPosts = [...featured, ...fallback];

  if (typeof limit !== 'number') {
    return allPosts;
  }

  return allPosts.slice(0, limit);
}

export function getBlogIndexSections() {
  return (['general', 'mac', 'windows'] as const).map((platform) => ({
    platform,
    ...BLOG_PLATFORM_META[platform],
    posts: getFeaturedPostsByPlatform(platform),
  }));
}

function scoreRelatedPost(current: BlogFrontmatter, candidate: BlogFrontmatter) {
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
    new Date(candidate.date).getTime() / 10 ** 15
  );
}

function pickTopCandidate(
  posts: BlogFrontmatter[],
  currentSlug: string,
  selected: Set<string>,
  predicate: (post: BlogFrontmatter) => boolean,
): BlogFrontmatter | undefined {
  return posts.find((post) => post.slug !== currentSlug && !selected.has(post.slug) && predicate(post));
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
): BlogFrontmatter[] {
  const current = allPosts.find((p) => p.frontmatter.slug === slug)?.frontmatter;
  if (!current) return [];

  const ranked = allPosts
    .map((post) => post.frontmatter)
    .filter((post) => post.slug !== slug)
    .sort((a, b) => scoreRelatedPost(current, b) - scoreRelatedPost(current, a));

  const selected: BlogFrontmatter[] = [];
  const selectedSlugs = new Set<string>();

  const add = (post?: BlogFrontmatter) => {
    if (!post || selectedSlugs.has(post.slug)) return;
    selected.push(post);
    selectedSlugs.add(post.slug);
  };

  if (current.platform === 'general') {
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === 'general'));
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === 'mac'));
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === 'windows'));
  } else {
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === current.platform));
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === 'general'));
    add(pickTopCandidate(ranked, slug, selectedSlugs, (post) => post.platform === current.platform));
  }

  for (const post of ranked) {
    if (selected.length >= limit) break;
    add(post);
  }

  return selected.slice(0, limit);
}
