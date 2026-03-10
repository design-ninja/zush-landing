import {
  parseFrontmatter,
  type ParsedPost,
  type BlogFrontmatter,
} from '@/utils/frontmatter'

const modules = import.meta.glob('@/content/blog/*.md', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as Record<string, string>

const allPosts: ParsedPost[] = Object.values(modules)
  .map((raw) => parseFrontmatter(raw))
  .sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  )

export function getAllPosts(): BlogFrontmatter[] {
  return allPosts.map((p) => p.frontmatter)
}

export function getPostBySlug(slug: string): ParsedPost | undefined {
  return allPosts.find((p) => p.frontmatter.slug === slug)
}

export function getAllSlugs(): string[] {
  return allPosts.map((p) => p.frontmatter.slug)
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
): BlogFrontmatter[] {
  const current = allPosts.find((p) => p.frontmatter.slug === slug)
  if (!current) return []

  const currentTags = new Set(current.frontmatter.tags)

  return allPosts
    .filter((p) => p.frontmatter.slug !== slug)
    .map((p) => ({
      post: p.frontmatter,
      score: p.frontmatter.tags.filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.post)
}
