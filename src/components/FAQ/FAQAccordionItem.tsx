import { memo, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import Heading from '@/components/Heading';

interface FAQAccordionItemProps {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onClick: () => void;
  classes: Record<string, string>;
}

const FAQAccordionItem = memo(
  ({
    question,
    answer,
    isOpen,
    onClick,
    classes,
  }: FAQAccordionItemProps) => (
    <div
      className={`${classes.FAQItem} ${isOpen ? classes.FAQItem_active : ''}`}
    >
      <button
        className={classes.FAQItem__Header}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <Heading as='h3' className={classes.FAQItem__Question}>
          {question}
        </Heading>
        <ChevronDown size={24} className={classes.FAQItem__Icon} />
      </button>
      <div
        className={`${classes.FAQItem__Content} ${
          isOpen ? classes.FAQItem__Content_open : ''
        }`}
        aria-hidden={!isOpen}
      >
        <div className={classes.FAQItem__Answer}>{answer}</div>
      </div>
    </div>
  ),
);

FAQAccordionItem.displayName = 'FAQAccordionItem';

export default FAQAccordionItem;
