import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getRelatedPosts } from '@/data/blog'
import { useBlogPostSeo } from '@/hooks/useBlogPostSeo'
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildFAQPageJsonLd,
} from '@/utils/jsonLd'
import AppLink from '@/components/AppLink'
import BlogCTA from '@/components/BlogCTA'
import styles from './BlogPost.module.scss'
import '@/styles/markdown-content.scss'

interface BlogMarkdownLinkProps extends ComponentPropsWithoutRef<'a'> {
  href?: string
}

interface TocItem {
  id: string
  level: 2 | 3
  text: string
}

const BlogMarkdownLink = ({
  href = '',
  className,
  ...props
}: BlogMarkdownLinkProps) => (
  <AppLink {...props} className={className} href={href} variant="legal" />
)

const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .replace(/`+/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const flattenText = (value: ReactNode): string => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }
  if (Array.isArray(value)) {
    return value.map(flattenText).join('')
  }
  if (value && typeof value === 'object' && 'props' in value) {
    return flattenText((value as { props: { children?: ReactNode } }).props.children)
  }
  return ''
}

const extractToc = (content: string): TocItem[] => {
  const headings = content.match(/^(##|###)\s+.+$/gm) ?? []

  return headings.map((heading) => {
    const level = heading.startsWith('###') ? 3 : 2
    const text = heading.replace(/^###?\s+/, '').trim()
    return {
      id: slugifyHeading(text),
      level,
      text,
    }
  })
}

const countWords = (content: string) =>
  (content.match(/\b[\w'-]+\b/g) ?? []).length

const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  useBlogPostSeo(post?.frontmatter)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { frontmatter, content, faq } = post
  const relatedPosts = getRelatedPosts(frontmatter.slug)
  const toc = useMemo(() => extractToc(content), [content])
  const showToc = toc.filter((item) => item.level === 2).length >= 4
  const shouldRenderInlineCta = countWords(content) >= 1800
  const [mobileTocValue, setMobileTocValue] = useState('')
  const jsonLd = [
    buildBlogPostingJsonLd(frontmatter),
    buildBreadcrumbJsonLd(frontmatter.title, frontmatter.slug),
    ...(faq.length > 0 ? [buildFAQPageJsonLd(faq)] : []),
  ]

  let h2Index = 0

  const handleMobileTocChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const nextValue = event.target.value
    setMobileTocValue(nextValue)
    if (!nextValue) return
    window.location.hash = nextValue
  }

  return (
    <article className={styles.BlogPost}>
      <div className={styles.BlogPost__Container}>
        <AppLink href="/blog" className={styles.BlogPost__BackLink}>
          &larr; Back to Blog
        </AppLink>

        <header className={styles.BlogPost__Header}>
          <h1 className={styles.BlogPost__Title}>{frontmatter.title}</h1>
          <div className={styles.BlogPost__Meta}>
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span>{frontmatter.readingTime} min read</span>
          </div>
          {frontmatter.tags.length > 0 && (
            <div className={styles.BlogPost__Tags}>
              {frontmatter.tags.map((tag) => (
                <span key={tag} className={styles.BlogPost__Tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {frontmatter.tldr && (
          <div className={styles.BlogPost__Tldr}>
            <strong>TL;DR:</strong> {frontmatter.tldr}
          </div>
        )}

        <BlogCTA placement="early" />

        {showToc && (
          <div className={styles.BlogPost__MobileToc}>
            <label
              className={styles.BlogPost__MobileTocLabel}
              htmlFor="blog-post-toc"
            >
              Jump to section
            </label>
            <select
              id="blog-post-toc"
              className={styles.BlogPost__MobileTocSelect}
              onChange={handleMobileTocChange}
              value={mobileTocValue}
            >
              <option value="">Select a section</option>
              {toc
                .filter((item) => item.level === 2)
                .map((item) => (
                  <option key={item.id} value={`#${item.id}`}>
                    {item.text}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className={styles.BlogPost__Layout}>
          {showToc && (
            <aside className={styles.BlogPost__Toc} aria-label="Table of contents">
              <div className={styles.BlogPost__TocInner}>
                <p className={styles.BlogPost__TocTitle}>On this page</p>
                <nav className={styles.BlogPost__TocNav}>
                  {toc.map((item) => (
                    <AppLink
                      key={item.id}
                      href={`#${item.id}`}
                      className={[
                        styles.BlogPost__TocLink,
                        item.level === 3 ? styles.BlogPost__TocLink_subtle : '',
                      ].join(' ')}
                    >
                      {item.text}
                    </AppLink>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <div className={`${styles.BlogPost__Content} markdown-content`}>
            <ReactMarkdown
              components={{
                a: ({ node: _node, ...props }) => (
                  <BlogMarkdownLink {...props} />
                ),
                h2: ({ node: _node, children, ...props }) => {
                  h2Index += 1
                  const text = flattenText(children)
                  const id = slugifyHeading(text)
                  const shouldInjectBeforeHeading =
                    shouldRenderInlineCta && h2Index === 2

                  return (
                    <>
                      {shouldInjectBeforeHeading && <BlogCTA placement="inline" />}
                      <h2 id={id} {...props}>
                        {children}
                      </h2>
                    </>
                  )
                },
                h3: ({ node: _node, children, ...props }) => {
                  const text = flattenText(children)
                  const id = slugifyHeading(text)
                  return (
                    <h3 id={id} {...props}>
                      {children}
                    </h3>
                  )
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <BlogCTA placement="footer" />

        {relatedPosts.length > 0 && (
          <section className={styles.BlogPost__Related}>
            <h2 className={styles.BlogPost__RelatedTitle}>Related Articles</h2>
            <div className={styles.BlogPost__RelatedGrid}>
              {relatedPosts.map((rp) => (
                <AppLink
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className={styles.BlogPost__RelatedCard}
                >
                  <h3 className={styles.BlogPost__RelatedCardTitle}>
                    {rp.title}
                  </h3>
                  <p className={styles.BlogPost__RelatedCardDesc}>
                    {rp.description}
                  </p>
                  <span className={styles.BlogPost__RelatedCardMeta}>
                    {formatDate(rp.date)} &middot; {rp.readingTime} min read
                  </span>
                </AppLink>
              ))}
            </div>
          </section>
        )}

        <footer className={styles.BlogPost__Footer}>
          <AppLink href="/blog" className={styles.BlogPost__BackLink}>
            &larr; Back to Blog
          </AppLink>
        </footer>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  )
}

export default BlogPost
