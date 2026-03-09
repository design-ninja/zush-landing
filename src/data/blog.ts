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
