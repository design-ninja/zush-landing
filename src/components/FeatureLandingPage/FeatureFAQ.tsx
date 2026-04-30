import { useState } from 'react';
import FAQAccordionItem from '@/components/FAQ/FAQAccordionItem';
import styles from './FeatureLandingPage.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

interface FeatureFAQProps {
  faqItems: FAQItem[];
}

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
          classes={styles}
        />
      ))}
    </div>
  );
};

export default FeatureFAQ;
