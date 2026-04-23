import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getRelatedPosts } from '@/data/blog';
import AppLink from '@/components/AppLink';
import BlogCTA from '@/components/BlogCTA';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { getDemoVideoBySrc, resolveDemoVideoMedia } from '@/data/demoVideos';
import styles from './BlogPost.module.scss';
import '@/styles/markdown-content.scss';

interface BlogMarkdownLinkProps extends ComponentPropsWithoutRef<'a'> {
  href?: string;
}

interface TocItem {
  id: string;
  level: 2 | 3;
  text: string;
}

const BlogMarkdownLink = ({
  href = '',
  className,
  ...props
}: BlogMarkdownLinkProps) => (
  <AppLink {...props} className={className} href={href} variant='legal' />
);

const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .replace(/`+/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const flattenText = (value: ReactNode): string => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(flattenText).join('');
  }
  if (value && typeof value === 'object' && 'props' in value) {
    return flattenText(
      (value as { props: { children?: ReactNode } }).props.children,
    );
  }
  return '';
};

const extractToc = (content: string): TocItem[] => {
  const headings = content.match(/^(##|###)\s+.+$/gm) ?? [];

  return headings.map((heading) => {
    const level = heading.startsWith('###') ? 3 : 2;
    const text = heading.replace(/^###?\s+/, '').trim();
    return {
      id: slugifyHeading(text),
      level,
      text,
    };
  });
};

const countWords = (content: string) =>
  (content.match(/\b[\w'-]+\b/g) ?? []).length;

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

interface BlogPostProps {
  slug: string;
}

const BlogPost = ({ slug }: BlogPostProps) => {
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const { frontmatter, content } = post;
  const relatedPosts = getRelatedPosts(frontmatter.slug);
  const toc = extractToc(content);
  const showToc = toc.filter((item) => item.level === 2).length >= 4;
  const shouldRenderInlineCta = countWords(content) >= 1800;

  let h2Index = 0;

  return (
    <article className={styles.BlogPost}>
      <div className={styles.BlogPost__Container}>
        <AppLink href='/blog' className={styles.BlogPost__BackLink}>
          &larr; Back to Blog
        </AppLink>

        <header className={styles.BlogPost__Header}>
          <Heading as='h1' className={styles.BlogPost__Title}>
            {frontmatter.title}
          </Heading>
          <div className={styles.BlogPost__Author}>
            <img
              src='/images/authors/lirik.png'
              alt={frontmatter.authorName}
              className={styles.BlogPost__AuthorAvatar}
              width={40}
              height={40}
              loading='eager'
            />
            <div>
              <span className={styles.BlogPost__AuthorName}>
                {frontmatter.authorName}
              </span>
              <div className={styles.BlogPost__Meta}>
                <time dateTime={frontmatter.date}>
                  {formatDate(frontmatter.date)}
                </time>
                <span>{frontmatter.readingTime} min read</span>
              </div>
            </div>
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

        <BlogCTA placement='early' />

        {showToc && (
          <details className={styles.BlogPost__MobileToc}>
            <summary className={styles.BlogPost__MobileTocSummary}>
              Jump to section
            </summary>
            <nav className={styles.BlogPost__MobileTocLinks} aria-label='Jump to section'>
              {toc
                .filter((item) => item.level === 2)
                .map((item) => (
                  <AppLink
                    key={item.id}
                    href={`#${item.id}`}
                    className={styles.BlogPost__MobileTocLink}
                  >
                    {item.text}
                  </AppLink>
                ))}
            </nav>
          </details>
        )}

        <div className={styles.BlogPost__Layout}>
          {showToc && (
            <aside
              className={styles.BlogPost__Toc}
              aria-label='Table of contents'
            >
              <div className={styles.BlogPost__TocInner}>
                <Text as='p' size='xs' className={styles.BlogPost__TocTitle}>
                  On this page
                </Text>
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
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node: _node, ...props }) => (
                  <BlogMarkdownLink {...props} />
                ),
                h2: ({ node: _node, children, ...props }) => {
                  h2Index += 1;
                  const text = flattenText(children);
                  const id = slugifyHeading(text);
                  const shouldInjectBeforeHeading =
                    shouldRenderInlineCta && h2Index === 2;

                  return (
                    <>
                      {shouldInjectBeforeHeading && (
                        <BlogCTA placement='inline' />
                      )}
                      <Heading as='h2' id={id} {...props}>
                        {children}
                      </Heading>
                    </>
                  );
                },
                h3: ({ node: _node, children, ...props }) => {
                  const text = flattenText(children);
                  const id = slugifyHeading(text);
                  return (
                    <Heading as='h3' id={id} {...props}>
                      {children}
                    </Heading>
                  );
                },
                h4: ({ node: _node, children, ...props }) => (
                  <Heading as='h4' {...props}>
                    {children}
                  </Heading>
                ),
                img: ({ node: _node, src, alt, ...props }) => {
                  if (src && src.endsWith('.mp4')) {
                    const demoVideo = getDemoVideoBySrc(src);
                    const videoLabel = alt || demoVideo?.title || 'Watch demo video';
                    const lightMedia = demoVideo
                      ? resolveDemoVideoMedia(demoVideo, 'light')
                      : undefined;
                    const darkMedia = demoVideo
                      ? resolveDemoVideoMedia(demoVideo, 'dark')
                      : undefined;
                    const lightHref = lightMedia?.source || src;
                    const darkHref = darkMedia?.source || lightHref;
                    const lightPoster = lightMedia?.poster;
                    const darkPoster = darkMedia?.poster || lightPoster;

                    return (
                      <figure className='markdown-figure markdown-figure--video'>
                        <a
                          href={lightHref}
                          className='markdown-video-link markdown-video-link--light'
                          target='_blank'
                          rel='noopener noreferrer'
                          data-autoplay-video='true'
                          data-video-src={lightHref}
                          data-video-label={videoLabel}
                          data-video-poster={lightPoster || ''}
                          aria-label={`${videoLabel}. Open demo video in a new tab`}
                        >
                          {lightPoster ? (
                            <img
                              src={lightPoster}
                              alt=''
                              width={1280}
                              height={720}
                              loading='lazy'
                              decoding='async'
                              className='markdown-video-poster markdown-video-poster--light'
                              {...props}
                            />
                          ) : (
                            <span className='markdown-video-fallback'>{videoLabel}</span>
                          )}
                          <span className='markdown-video-badge'>Open demo video</span>
                        </a>
                        <a
                          href={darkHref}
                          className='markdown-video-link markdown-video-link--dark'
                          target='_blank'
                          rel='noopener noreferrer'
                          data-autoplay-video='true'
                          data-video-src={darkHref}
                          data-video-label={videoLabel}
                          data-video-poster={darkPoster || ''}
                          aria-label={`${videoLabel}. Open demo video in a new tab`}
                        >
                          {darkPoster ? (
                            <img
                              src={darkPoster}
                              alt=''
                              width={1280}
                              height={720}
                              loading='lazy'
                              decoding='async'
                              className='markdown-video-poster markdown-video-poster--dark'
                              {...props}
                            />
                          ) : (
                            <span className='markdown-video-fallback'>{videoLabel}</span>
                          )}
                          <span className='markdown-video-badge'>Open demo video</span>
                        </a>
                        {alt && <figcaption>{alt}</figcaption>}
                      </figure>
                    );
                  }

                  const isThemed = src?.includes('/screenshots/light/');
                  if (isThemed && src) {
                    const darkSrc = src.replace(
                      '/screenshots/light/',
                      '/screenshots/dark/',
                    );
                    return (
                      <figure className='markdown-figure'>
                        <img
                          src={src}
                          alt={alt || ''}
                          width={1664}
                          height={1528}
                          loading='lazy'
                          decoding='async'
                          className='markdown-image markdown-image--screenshot markdown-image--light'
                          {...props}
                        />
                        <img
                          src={darkSrc}
                          alt={alt || ''}
                          width={1664}
                          height={1528}
                          loading='lazy'
                          decoding='async'
                          className='markdown-image markdown-image--screenshot markdown-image--dark'
                          aria-hidden='true'
                          {...props}
                        />
                        {alt && <figcaption>{alt}</figcaption>}
                      </figure>
                    );
                  }

                  return (
                    <figure className='markdown-figure'>
                      <img
                        src={src}
                        alt={alt || ''}
                        loading='lazy'
                        decoding='async'
                        className='markdown-image'
                        {...props}
                      />
                      {alt && <figcaption>{alt}</figcaption>}
                    </figure>
                  );
                },
                table: ({ node: _node, ...props }) => (
                  <div className='markdown-table-wrap'>
                    <table {...props} />
                  </div>
                ),
                p: ({ node: _node, color: _color, children }) => (
                  <Text as='p'>{children}</Text>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>

        <BlogCTA placement='footer' />

        {relatedPosts.length > 0 && (
          <section className={styles.BlogPost__Related}>
            <Heading as='h3' className={styles.BlogPost__RelatedTitle}>
              Related Articles
            </Heading>
            <div className={styles.BlogPost__RelatedGrid}>
              {relatedPosts.map((rp) => (
                <AppLink
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className={styles.BlogPost__RelatedCard}
                >
                  <Heading
                    as='h3'
                    size='h4'
                    className={styles.BlogPost__RelatedCardTitle}
                  >
                    {rp.title}
                  </Heading>
                  <Text
                    as='p'
                    size='sm'
                    color='subtle'
                    className={styles.BlogPost__RelatedCardDesc}
                  >
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
          <AppLink href='/blog' className={styles.BlogPost__BackLink}>
            &larr; Back to Blog
          </AppLink>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
