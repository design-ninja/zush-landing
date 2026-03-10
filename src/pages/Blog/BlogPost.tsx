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

interface BlogMarkdownLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  href?: string
}

const BlogMarkdownLink = ({
  href = '',
  className,
  ...props
}: BlogMarkdownLinkProps) => (
  <AppLink {...props} className={className} href={href} variant="legal" />
)

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
  const jsonLd = [
    buildBlogPostingJsonLd(frontmatter),
    buildBreadcrumbJsonLd(frontmatter.title, frontmatter.slug),
    ...(faq.length > 0 ? [buildFAQPageJsonLd(faq)] : []),
  ]

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

        <div className={`${styles.BlogPost__Content} markdown-content`}>
          <ReactMarkdown
            components={{
              a: ({ node: _node, ...props }) => (
                <BlogMarkdownLink {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <BlogCTA />

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
