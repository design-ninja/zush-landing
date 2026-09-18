import { useId } from 'react';
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
  const groupName = useId();

  return (
    <div className={styles.FAQList}>
      {faqItems.map((item, index) => (
        <FAQAccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={index === 0}
          name={groupName}
          classes={styles}
        />
      ))}
    </div>
  );
};

export default FeatureFAQ;
