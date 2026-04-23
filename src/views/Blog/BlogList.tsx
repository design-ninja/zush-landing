import { getBlogIndexSections } from '@/data/blog';
import { BLOG_PLATFORM_LABELS } from '@/data/blogSchema';
import type { BlogFrontmatter } from '@/utils/frontmatter';
import SectionHeader from '@/components/SectionHeader';
import AppLink from '@/components/AppLink';
import BackToHome from '@/components/BackToHome';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './BlogList.module.scss';

const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const PostCard = ({ post }: { post: BlogFrontmatter }) => (
  <article className={styles.BlogList__Post}>
    <AppLink
      href={`/blog/${post.slug}`}
      className={styles.BlogList__PostLink}
    >
      <span
        className={[
          styles.BlogList__Track,
          styles[`BlogList__Track_${post.platform}`],
        ].join(' ')}
      >
        {BLOG_PLATFORM_LABELS[post.platform]}
      </span>
      <Heading as='h3' size='h4' className={styles.BlogList__PostTitle}>
        {post.title}
      </Heading>
      <Text as='p' color='subtle' className={styles.BlogList__PostDescription}>
        {post.description}
      </Text>
      {post.tags.length > 0 && (
        <div className={styles.BlogList__PostTags}>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.BlogList__Tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className={styles.BlogList__PostMeta}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingTime} min read</span>
      </div>
    </AppLink>
  </article>
);

const BlogList = () => {
  const sections = getBlogIndexSections();

  return (
    <section className={styles.BlogList}>
      <div className={styles.BlogList__Container}>
        <SectionHeader
          title={
            <>
              <span className={styles.BlogList__TitleAccent}>Zush</span> Blog
            </>
          }
          description='Guides, comparisons, and real workflows for AI-powered file renaming across Mac, Windows, and general desktop setup.'
          level='h1'
        />

        <div className={styles.BlogList__Sections}>
          {sections.map((section) => (
            <section key={section.platform} className={styles.BlogList__Section}>
              <div className={styles.BlogList__SectionHeader}>
                <div className={styles.BlogList__SectionTitleRow}>
                  <Heading as='h2' size='h3' className={styles.BlogList__SectionTitle}>
                    {section.title}
                  </Heading>
                  <span className={styles.BlogList__SectionCount}>
                    {section.posts.length}
                  </span>
                </div>
              </div>
              <Text as='p' color='subtle' className={styles.BlogList__SectionDescription}>
                {section.description}
              </Text>
              <div className={styles.BlogList__SectionPosts}>
                {section.posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <BackToHome className={styles.BlogList__BackLink} />
      </div>
    </section>
  );
};

export default BlogList;
