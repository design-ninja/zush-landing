import { getAllPosts } from '@/data/blog'
import SectionHeader from '@/components/SectionHeader'
import AppLink from '@/components/AppLink'
import BackToHome from '@/components/BackToHome'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import styles from './BlogList.module.scss'

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

const BlogList = () => {
  const posts = getAllPosts()

  return (
    <section className={styles.BlogList}>
      <div className={styles.BlogList__Container}>
        <SectionHeader
          title="Blog"
          description="Tips, guides, and insights on AI-powered file organization"
          level="h1"
        />

        <div className={styles.BlogList__Posts}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.BlogList__Post}>
              <AppLink
                href={`/blog/${post.slug}`}
                className={styles.BlogList__PostLink}
              >
                <Heading as='h2' size='h3' className={styles.BlogList__PostTitle}>{post.title}</Heading>
                <Text as='p' color='subtle' className={styles.BlogList__PostDescription}>
                  {post.description}
                </Text>
                <div className={styles.BlogList__PostMeta}>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingTime} min read</span>
                </div>
                {post.tags.length > 0 && (
                  <div className={styles.BlogList__PostTags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.BlogList__Tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </AppLink>
            </article>
          ))}
        </div>

        <BackToHome className={styles.BlogList__BackLink} />
      </div>
    </section>
  )
}

export default BlogList
