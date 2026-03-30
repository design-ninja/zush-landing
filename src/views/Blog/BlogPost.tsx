import type { ChangeEvent, ComponentPropsWithoutRef, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug, getRelatedPosts } from '@/data/blog'
import AppLink from '@/components/AppLink'
import BlogCTA from '@/components/BlogCTA'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
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

interface BlogPostProps {
  slug: string
}

const BlogPost = ({ slug }: BlogPostProps) => {
  const post = getPostBySlug(slug)

  if (!post) {
    return null
  }

  const { frontmatter, content } = post
  const relatedPosts = getRelatedPosts(frontmatter.slug)
  const toc = useMemo(() => extractToc(content), [content])
  const showToc = toc.filter((item) => item.level === 2).length >= 4
  const shouldRenderInlineCta = countWords(content) >= 1800
  const [mobileTocValue, setMobileTocValue] = useState('')

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
          <Heading as='h1' className={styles.BlogPost__Title}>{frontmatter.title}</Heading>
          <div className={styles.BlogPost__Meta}>
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span>{frontmatter.readingTime} min read</span>
            <span>By {frontmatter.authorName}</span>
            <span>Reviewed by {frontmatter.reviewerName}</span>
          </div>
          <Text as='p' size='sm' color='subtle' className={styles.BlogPost__ReviewPolicy}>
            Recommendation quality is reviewed with our{' '}
            <AppLink href="/methodology" variant="legal">
              public methodology
            </AppLink>{' '}
            and updated through the{' '}
            <AppLink href="/changelog" variant="legal">
              changelog
            </AppLink>
            .
          </Text>
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
                <Text as='p' size='xs' className={styles.BlogPost__TocTitle}>On this page</Text>
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
                      <Heading as='h2' id={id} {...props}>
                        {children}
                      </Heading>
                    </>
                  )
                },
                h3: ({ node: _node, children, ...props }) => {
                  const text = flattenText(children)
                  const id = slugifyHeading(text)
                  return (
                    <Heading as='h3' id={id} {...props}>
                      {children}
                    </Heading>
                  )
                },
                h4: ({ node: _node, children, ...props }) => (
                  <Heading as='h4' {...props}>
                    {children}
                  </Heading>
                ),
                img: ({ node: _node, src, alt, ...props }) => {
                  if (src && src.endsWith('.mp4')) {
                    return (
                      <figure className="markdown-figure">
                        <video
                          src={src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="markdown-video"
                          aria-label={alt || 'Demo video'}
                        >
                          <track kind="captions" src="/videos/captions/zush-demo.vtt" srcLang="en" label="English captions" />
                        </video>
                        {alt && <figcaption>{alt}</figcaption>}
                      </figure>
                    )
                  }
                  return (
                    <figure className="markdown-figure">
                      <img
                        src={src}
                        alt={alt || ''}
                        loading="lazy"
                        decoding="async"
                        className="markdown-image"
                        {...props}
                      />
                      {alt && <figcaption>{alt}</figcaption>}
                    </figure>
                  )
                },
                p: ({ node: _node, ...props }) => <Text as='p' {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <BlogCTA placement="footer" />

        {relatedPosts.length > 0 && (
          <section className={styles.BlogPost__Related}>
            <Heading as='h2' className={styles.BlogPost__RelatedTitle}>Related Articles</Heading>
            <div className={styles.BlogPost__RelatedGrid}>
              {relatedPosts.map((rp) => (
                <AppLink
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className={styles.BlogPost__RelatedCard}
                >
                  <Heading as='h3' className={styles.BlogPost__RelatedCardTitle}>
                    {rp.title}
                  </Heading>
                  <Text as='p' size='sm' color='subtle' className={styles.BlogPost__RelatedCardDesc}>
                    {rp.description}
                  </Text>
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
    </article>
  )
}

export default BlogPost
