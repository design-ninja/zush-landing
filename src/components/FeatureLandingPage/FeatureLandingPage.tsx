import { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Button from '@/components/Button';
import AppleIcon from '@/components/AppleIcon';
import AppLink from '@/components/AppLink';
import Videos from '@/components/Videos';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import { DOWNLOAD_URL } from '@/constants';
import styles from './FeatureLandingPage.module.scss';

interface BeforeAfterExample {
  before: string;
  after: string;
}

interface ComparisonRow {
  tool: string;
  platform: string;
  aiPowered: string;
  batchRename: string;
  autoMonitor: string;
  freeTier: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedLink {
  title: string;
  href: string;
}

export interface FeatureLandingPageProps {
  h1: string;
  definitionTitle: string;
  definitionText: string;
  beforeAfterExamples: BeforeAfterExample[];
  supportedFormats?: string[];
  comparisonRows: ComparisonRow[];
  faqItems: FAQItem[];
  relatedBlogPosts: RelatedLink[];
  relatedPages: RelatedLink[];
  jsonLd: object;
}

const FAQAccordionItem = memo(
  ({
    question,
    answer,
    isOpen,
    onClick,
  }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
  }) => (
    <div className={`${styles.FAQItem} ${isOpen ? styles.FAQItem_active : ''}`}>
      <button
        className={styles.FAQItem__Header}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className={styles.FAQItem__Question}>{question}</h3>
        <ChevronDown size={20} className={styles.FAQItem__Icon} />
      </button>
      <div
        className={`${styles.FAQItem__Content} ${isOpen ? styles.FAQItem__Content_open : ''}`}
        aria-hidden={!isOpen}
      >
        <p className={styles.FAQItem__Answer}>{answer}</p>
      </div>
    </div>
  ),
);

FAQAccordionItem.displayName = 'FAQAccordionItem';

const FeatureLandingPage = ({
  h1,
  definitionTitle,
  definitionText,
  beforeAfterExamples,
  supportedFormats,
  comparisonRows,
  faqItems,
  relatedBlogPosts,
  relatedPages,
  jsonLd,
}: FeatureLandingPageProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className={styles.Page}>
        {/* Hero */}
        <header className={styles.Hero}>
          <div className={styles.Hero__Container}>
            <Heading as='h1' className={styles.Hero__Title}>
              {h1}
            </Heading>
            <Heading as='h2' className={styles.Hero__DefinitionTitle}>
              {definitionTitle}
            </Heading>
            <Text as='p' color='subtle' className={styles.Hero__DefinitionText}>
              {definitionText}
            </Text>
            <div className={styles.Hero__CTA}>
              <Button
                as='a'
                href={DOWNLOAD_URL}
                target='_blank'
                rel='noopener noreferrer'
                variant='black'
                size='lg'
              >
                <AppleIcon />
                Download
              </Button>
              <Button as='link' href='/#pro' variant='primary' size='lg'>
                Buy PRO
              </Button>
            </div>
            <Text as='p' color='subtle' className={styles.Hero__CTANote}>
              Free to try. No credit card required.
            </Text>
          </div>
          <div className={styles.Hero__Glow} />
        </header>

        {/* Before/After Examples */}
        <section className={styles.Section}>
          <div className={styles.Section__Container}>
            <Heading as='h2' className={styles.Section__Title}>
              See AI Renaming in Action
            </Heading>
            <div className={styles.ExamplesTable}>
              <div className={styles.ExamplesTable__Header}>
                <span>Before</span>
                <span>After (AI-generated)</span>
              </div>
              {beforeAfterExamples.map((example, i) => (
                <div key={i} className={styles.ExamplesTable__Row}>
                  <code className={styles.ExamplesTable__Before}>
                    {example.before}
                  </code>
                  <span className={styles.ExamplesTable__Arrow}>→</span>
                  <code className={styles.ExamplesTable__After}>
                    {example.after}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Videos (reused from homepage) */}
        <Videos />

        {/* Features Bento Grid (reused from homepage) */}
        <Features />

        {/* Supported Formats */}
        {supportedFormats && supportedFormats.length > 0 && (
          <section className={styles.Section}>
            <div className={styles.Section__Container}>
              <Heading as='h2' className={styles.Section__Title}>
                Supported File Formats
              </Heading>
              <div className={styles.Formats}>
                {supportedFormats.map((format, i) => (
                  <span key={i} className={styles.Formats__Tag}>
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Comparison Table */}
        <section className={styles.Section}>
          <div className={styles.Section__Container}>
            <Heading as='h2' className={styles.Section__Title}>
              How Zush Compares
            </Heading>
            <div className={styles.ComparisonWrapper}>
              <table className={styles.Comparison}>
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>Platform</th>
                    <th>AI-Powered</th>
                    <th>Batch Rename</th>
                    <th>Auto Monitor</th>
                    <th>Free Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className={i === 0 ? styles.Comparison__Highlighted : ''}
                    >
                      <td>{row.tool}</td>
                      <td>{row.platform}</td>
                      <td>{row.aiPowered}</td>
                      <td>{row.batchRename}</td>
                      <td>{row.autoMonitor}</td>
                      <td>{row.freeTier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Use Cases (reused from homepage) */}
        <UseCases />

        {/* FAQ */}
        <section className={styles.Section}>
          <div className={styles.Section__Container}>
            <Heading as='h2' className={styles.Section__Title}>
              Frequently Asked Questions
            </Heading>
            <div className={styles.FAQList}>
              {faqItems.map((item, i) => (
                <FAQAccordionItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === i}
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing (reused from homepage) */}
        <Pricing />

        {/* Related Pages & Blog Posts */}
        {(relatedPages.length > 0 || relatedBlogPosts.length > 0) && (
          <section className={styles.Section}>
            <div className={styles.Section__Container}>
              {relatedPages.length > 0 && (
                <>
                  <Heading as='h2' className={styles.Section__Title}>
                    Related Tools
                  </Heading>
                  <div className={styles.RelatedLinks}>
                    {relatedPages.map((page, i) => (
                      <AppLink
                        key={i}
                        href={page.href}
                        className={styles.RelatedLink}
                      >
                        {page.title} →
                      </AppLink>
                    ))}
                  </div>
                </>
              )}
              {relatedBlogPosts.length > 0 && (
                <div
                  className={
                    relatedPages.length > 0 ? styles.RelatedSection : ''
                  }
                >
                  <Heading as='h2' className={styles.Section__Title}>
                    Related Guides
                  </Heading>
                  <div className={styles.RelatedLinks}>
                    {relatedBlogPosts.map((post, i) => (
                      <AppLink
                        key={i}
                        href={`/blog/${post.href}`}
                        className={styles.RelatedLink}
                      >
                        {post.title} →
                      </AppLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </article>
    </>
  );
};

export default FeatureLandingPage;
