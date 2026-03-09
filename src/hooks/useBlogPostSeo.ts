import { useEffect } from 'react'
import type { BlogFrontmatter } from '@/utils/frontmatter'

const SITE_ORIGIN = 'https://zushapp.com'

const ensureMetaTag = (attr: string, value: string, isProperty = false) => {
  const selector = isProperty
    ? `meta[property='${attr}']`
    : `meta[name='${attr}']`
  let meta = document.querySelector(selector) as HTMLMetaElement | null
  if (!meta) {
    meta = document.createElement('meta')
    if (isProperty) {
      meta.setAttribute('property', attr)
    } else {
      meta.name = attr
    }
    document.head.appendChild(meta)
  }
  meta.content = value
}

export const useBlogPostSeo = (post: BlogFrontmatter | undefined) => {
  useEffect(() => {
    if (!post) return

    const canonicalUrl = `${SITE_ORIGIN}/blog/${post.slug}`
    const title = `${post.title} — Zush Blog`

    document.title = title

    let canonical = document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    ensureMetaTag('description', post.description)
    ensureMetaTag('robots', 'index, follow')
    ensureMetaTag('og:title', post.title, true)
    ensureMetaTag('og:description', post.description, true)
    ensureMetaTag('og:url', canonicalUrl, true)
    ensureMetaTag('og:type', 'article', true)
    ensureMetaTag('article:published_time', post.date, true)
    ensureMetaTag('twitter:title', title)
    ensureMetaTag('twitter:description', post.description)
  }, [post])
}
