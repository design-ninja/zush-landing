import { useState, useMemo, type ReactNode } from 'react';
import { APP_CONFIG } from '@/constants';
import AppLink from '@/components/AppLink';
import { HOME_FAQ_DATA } from '@/data/homeFaq';
import SectionHeader from '../SectionHeader';
import FAQAccordionItem from './FAQAccordionItem';
import styles from './FAQ.module.scss';

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
      <AppLink href="/docs/byok">Learn how to set it up →</AppLink>
    </>
  ),
  "Can I get a refund if it doesn't fit my needs?": (
    <>
      Absolutely. If Zush isn't right for you, we offer a {APP_CONFIG.refund_period_days}
      -day money-back guarantee. You can find more details in our{' '}
      <AppLink href="/refund-policy">Refund Policy</AppLink>.
    </>
  ),
  'Is Zush a Hazel alternative?': (
    <>
      For content-aware naming, yes. Hazel is a rule engine that acts on files by conditions like name, date, or kind, while Zush reads what each file actually contains and suggests a descriptive name, then monitors folders and keeps full undo history. Zush also runs on Windows, while Hazel is macOS-only, and many people use both.{' '}
      <AppLink href="/hazel-alternative">See the full Hazel comparison →</AppLink>
    </>
  ),
  'Is Zush a PowerRename alternative?': (
    <>
      Yes, for content-aware renaming. PowerRename in Microsoft PowerToys rewrites filenames with search-and-replace and regular expressions and never looks inside a file, while Zush reads the content of each file and suggests a descriptive name you review before applying. Use PowerRename for uniform mechanical changes and Zush when each file needs its own meaningful name.{' '}
      <AppLink href="/powerrename-alternative">See the full PowerRename comparison →</AppLink>
    </>
  ),
  'Can Zush rename invoices and receipts on Mac?': (
    <>
      Yes. Zush reads invoice and receipt PDFs and photos, pulls the vendor, date, and invoice number with Naming Blocks, and can extract the amount or a tax category with a Custom AI Block. Scanned documents are read with AI vision, and every batch is reviewed before applying with undo history available. See the dedicated{' '}
      <AppLink href="/rename-invoices-with-ai">invoice</AppLink> and{' '}
      <AppLink href="/rename-receipts-with-ai">receipt</AppLink> workflows.
    </>
  ),
};

const DEFAULT_TITLE = (
  <>
    Frequently Asked <span className={styles.FAQ__TitleAccent}>Questions</span>
  </>
);

const withLinkedAnswer = (item: FAQData): FAQData => {
  if (item.question === 'Which operating systems are supported?') {
    return {
      question: item.question,
      answer: (
        <>
          Zush runs on macOS ({APP_CONFIG.min_macos_version} {APP_CONFIG.min_macos_name} and newer) and Windows 10 / 11. See the{' '}
          <AppLink href="/mac">Mac page</AppLink> for the signed .dmg, Mac App Store, and Homebrew options, or the{' '}
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
          <AppLink href="/docs/offline-ai">Open the Ollama setup guide →</AppLink>
        </>
      ),
    };
  }

  return {
    question: item.question,
    answer: STATIC_JSX_OVERRIDES[item.question] ?? item.answer,
  };
};

const buildDefaultFaqItems = (): FAQData[] =>
  HOME_FAQ_DATA.map((item): FAQData => withLinkedAnswer(item));

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
        return items.map(withLinkedAnswer);
      }

      const seen = new Set<string>();
      return [...items.map(withLinkedAnswer), ...defaultItems].filter((item) => {
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
    // suppressHydrationWarning: the scroll-reveal script decorates this
    // section with data attributes before the island hydrates.
    <section id='faq' className={styles.FAQ} suppressHydrationWarning>
      <div className={styles.FAQ__Container}>
        <SectionHeader
          title={title}
          description={description}
        />

        <div className={styles.FAQ__Grid}>
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              classes={styles}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
