export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  readingTime: number
}

export interface ParsedPost {
  frontmatter: BlogFrontmatter
  content: string
}

export function parseFrontmatter(raw: string): ParsedPost {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    throw new Error('Blog post missing frontmatter')
  }

  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    meta[line.slice(0, idx).trim()] = line
      .slice(idx + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')
  }

  const content = match[2].trim()
  const wordCount = content.split(/\s+/).length

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
      readingTime: Math.ceil(wordCount / 200),
    },
    content,
  }
}
