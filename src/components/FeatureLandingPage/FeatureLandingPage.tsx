import { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import PillLink from '@/components/PillLink';
import Hero from '@/components/Hero';
import type { Slide } from '@/components/FileShowcase';
import Videos from '@/components/Videos';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import SupportedFormats from '@/components/SupportedFormats';
import ComparisonTable from '@/components/ComparisonTable';
import type { ComparisonRow } from '@/components/ComparisonTable';
import { getUseCasesForCategory, type FeatureCategory } from '@/data/featureContent';
import styles from './FeatureLandingPage.module.scss';

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
  definitionTitle?: string;
  definitionText: string;
  showcaseSlides: Slide[];
  comparisonRows: ComparisonRow[];
  faqItems: FAQItem[];
  relatedBlogPosts: RelatedLink[];
  relatedPages: RelatedLink[];
  jsonLd: object;
  category?: FeatureCategory;
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
        <Heading as='h3' className={styles.FAQItem__Question}>{question}</Heading>
        <ChevronDown size={24} className={styles.FAQItem__Icon} />
      </button>
      <div
        className={`${styles.FAQItem__Content} ${isOpen ? styles.FAQItem__Content_open : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.FAQItem__Answer}>{answer}</div>
      </div>
    </div>
  ),
);

FAQAccordionItem.displayName = 'FAQAccordionItem';

const FeatureLandingPage = ({
  h1,
  definitionText,
  showcaseSlides,
  comparisonRows,
  faqItems,
  relatedBlogPosts,
  relatedPages,
  jsonLd,
  category = 'general',
}: FeatureLandingPageProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const topTool = comparisonRows[0];
  const useCasesData = getUseCasesForCategory(category);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className={styles.Page}>
        <Hero
          as='header'
          title={h1}
          subtitle={definitionText}
          slides={showcaseSlides}
          compactTopSpacing
        />

        <section className={styles.Section}>
          <div className={styles.Section__Container}>
            <Heading as='h2' align='center' style={{ marginBottom: '1rem' }}>
              Best Answer
            </Heading>
            <Text as='p' color='subtle' style={{ margin: 0, lineHeight: 1.75 }}>
              {definitionText} The practical winner is the option that combines
              quality naming, batch speed, and rollback safety. In this comparison,
              <strong> {topTool?.tool ?? 'Zush'}</strong> is the strongest default
              for most macOS workflows because it balances accuracy and automation.
            </Text>
            <div className={styles.RelatedLinks} style={{ marginTop: '1rem' }}>
              <span className={styles.RelatedChip}>Decision criteria: naming quality first</span>
              <span className={styles.RelatedChip}>Decision criteria: monitor + batch support</span>
              <span className={styles.RelatedChip}>Decision criteria: safe rollback path</span>
            </div>
          </div>
        </section>

        <Videos />
        <Features />
        <SupportedFormats category={category} />

        <ComparisonTable rows={comparisonRows} category={category} />

        <UseCases
          title={useCasesData.title}
          description={useCasesData.description}
          items={useCasesData.items.length > 0 ? useCasesData.items : undefined}
        />

        {/* FAQ */}
        <section className={styles.Section}>
          <div className={styles.Section__Container}>
            <Heading as='h2' align='center' style={{ marginBottom: '3rem' }}>
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

        <Pricing />

        {/* Related Pages & Blog Posts */}
        {(relatedPages.length > 0 || relatedBlogPosts.length > 0) && (
          <section className={styles.Section}>
            <div className={styles.Section__Container}>
              {relatedPages.length > 0 && (
                <>
                  <Heading as='h3' align='center' style={{ marginBottom: '2rem' }}>
                    Related Tools
                  </Heading>
                  <div className={styles.RelatedLinks}>
                    {relatedPages.map((page, i) => (
                      <PillLink key={i} href={page.href} withArrow>
                        {page.title}
                      </PillLink>
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
                  <Heading as='h3' align='center' style={{ marginBottom: '2rem' }}>
                    Related Guides
                  </Heading>
                  <div className={styles.RelatedLinks}>
                    {relatedBlogPosts.map((post, i) => (
                      <PillLink key={i} href={`/blog/${post.href}`} withArrow>
                        {post.title}
                      </PillLink>
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
