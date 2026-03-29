import { memo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Heading from '@/components/Heading';
import styles from './FeatureLandingPage.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

interface FeatureFAQProps {
  faqItems: FAQItem[];
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
  ),
);

FAQAccordionItem.displayName = 'FAQAccordionItem';

const FeatureFAQ = ({ faqItems }: FeatureFAQProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <div className={styles.FAQList}>
      {faqItems.map((item, index) => (
        <FAQAccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openFAQ === index}
          onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default FeatureFAQ;
