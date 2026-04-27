import { memo, useState, useMemo, type ReactNode } from 'react';
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
  answer: ReactNode;
}

interface FAQProps {
  items?: FAQData[];
  title?: ReactNode;
  description?: string;
  initialOpenIndex?: number | null;
  appendDefaultItems?: boolean;
}

const STATIC_JSX_OVERRIDES: Record<string, React.ReactNode> = {
  'What is BYOK (Bring Your Own Key)?': (
    <>
      BYOK lets PRO users connect their own API key from Gemini, Groq, OpenAI, or Claude for unlimited cloud renames. Your key is stored locally in secure platform storage and is sent only when Zush needs to call your selected provider through the backend relay.{' '}
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

const DEFAULT_TITLE = (
  <>
    Frequently Asked <span className={styles.FAQ__TitleAccent}>Questions</span>
  </>
);

const buildDefaultFaqItems = (): FAQData[] =>
  HOME_FAQ_DATA.map((item): FAQData => {
    if (item.question === 'Which operating systems are supported?') {
      return {
        question: item.question,
        answer: (
          <>
            Zush runs on macOS ({APP_CONFIG.min_macos_version} {APP_CONFIG.min_macos_name} and newer) and Windows 10 / 11. See the{' '}
            <AppLink href="/mac">Mac page</AppLink> for the signed .dmg and Mac App Store options, or the{' '}
            <AppLink href="/windows">Windows page</AppLink> for the Microsoft Store build.
          </>
        ),
      };
    }

    if (item.question === 'Does the app work offline?') {
      return {
        question: item.question,
        answer: (
          <>
            Cloud processing requires an internet connection. PRO users can enable Offline AI mode - private local models via Ollama after installing Ollama and downloading a compatible model.{' '}
            <AppLink href="/ollama-setup">Open the Ollama setup guide →</AppLink>
          </>
        ),
      };
    }

    return {
      question: item.question,
      answer: STATIC_JSX_OVERRIDES[item.question] ?? item.answer,
    };
  });

const FAQ = ({
  items,
  title = DEFAULT_TITLE,
  description = 'Everything you need to know about Zush in one place',
  initialOpenIndex = 0,
  appendDefaultItems = false,
}: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpenIndex);

  const faqs = useMemo(
    () => {
      const defaultItems = buildDefaultFaqItems();

      if (!items) {
        return defaultItems;
      }

      if (!appendDefaultItems) {
        return items;
      }

      const seen = new Set<string>();
      return [...items, ...defaultItems].filter((item) => {
        if (seen.has(item.question)) {
          return false;
        }
        seen.add(item.question);
        return true;
      });
    },
    [appendDefaultItems, items],
  );

  return (
    <section id='faq' className={styles.FAQ}>
      <div className={styles.FAQ__Container}>
        <SectionHeader
          title={title}
          description={description}
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
