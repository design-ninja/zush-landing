import { memo, useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '@/constants';
import AppLink from '@/components/AppLink';
import Heading from '@/components/Heading';
import { HOME_FAQ_DATA } from '@/data/homeFaq';
import SectionHeader from '../SectionHeader';
import styles from './FAQ.module.scss';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = memo(({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className={`${styles.FAQItem} ${isOpen ? styles.FAQItem_active : ''}`}>
      <button className={styles.FAQItem__Header} onClick={onClick} aria-expanded={isOpen}>
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
  );
});

FAQItem.displayName = 'FAQItem';

interface FAQData {
  question: string;
  answer: React.ReactNode;
}

const JSX_OVERRIDES: Record<string, React.ReactNode> = {
  'What is BYOK (Bring Your Own Key)?': (
    <>
      BYOK lets PRO users connect their own API key from Gemini, Groq, OpenAI, or Claude for unlimited file processing. When BYOK is enabled, Zush uses your API key through its backend relay to call your chosen AI provider, so you pay the provider directly and have no credit limits. Perfect for power users with large libraries.{' '}
      <AppLink href="/byok-setup">Learn how to set it up →</AppLink>
    </>
  ),
  "Can I get a refund if it doesn't fit my needs?": (
    <>
      Absolutely. If Zush isn't right for you, we offer a {APP_CONFIG.refund_period_days}
      -day money-back guarantee. You can find more details in our{' '}
      <AppLink href="/refund-policy">Refund Policy</AppLink>.
    </>
  ),
};

const FAQ_DATA: FAQData[] = HOME_FAQ_DATA.map((item) => ({
  question: item.question,
  answer: JSX_OVERRIDES[item.question] ?? item.answer,
}));

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = useMemo(() => FAQ_DATA, []);

  return (
    <section id='faq' className={styles.FAQ}>
      <div className={styles.FAQ__Container}>
        <SectionHeader
          title={
            <>
              Frequently Asked{' '}
              <span className={styles.FAQ__TitleAccent}>Questions</span>
            </>
          }
          description='Everything you need to know about Zush in one place'
        />

        <div className={styles.FAQ__Grid}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
