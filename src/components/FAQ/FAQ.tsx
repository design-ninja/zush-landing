import { memo, useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '@/constants';
import AppLink from '@/components/AppLink';
import Heading from '@/components/Heading';
import { useOS } from '@/hooks/useOS';
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

const STATIC_JSX_OVERRIDES: Record<string, React.ReactNode> = {
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

const FAQ = () => {
  const { downloadOS } = useOS();
  const isWindows = downloadOS === 'windows';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = useMemo(
    () =>
      HOME_FAQ_DATA.map((item): FAQData => {
        if (item.question === 'Which operating systems are supported?') {
          return {
            question: item.question,
            answer: isWindows
              ? `Zush runs on Windows 10 / 11 and macOS (${APP_CONFIG.min_macos_version} ${APP_CONFIG.min_macos_name} and newer). The Windows build is available on the Microsoft Store; the Mac build is distributed as a signed .dmg and on the Mac App Store.`
              : `Zush runs on macOS (${APP_CONFIG.min_macos_version} ${APP_CONFIG.min_macos_name} and newer) and Windows 10 / 11. The Mac build is distributed as a signed .dmg and on the Mac App Store; the Windows build is available on the Microsoft Store.`,
          };
        }

        if (item.question === 'Does the app work offline?') {
          return {
            question: item.question,
            answer:
              'Zush requires an internet connection for the AI features (file analysis and name generation) to function. While it is a native desktop application that prepares files locally, we currently rely on advanced cloud models to ensure the best possible quality and accuracy. Support for a local AI provider is in active development.',
          };
        }

        return {
          question: item.question,
          answer: STATIC_JSX_OVERRIDES[item.question] ?? item.answer,
        };
      }),
    [isWindows],
  );

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
