import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import Heading from '@/components/Heading';

interface FAQAccordionItemProps {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  name: string;
  classes: Record<string, string>;
}

// Server-rendered only: native disclosure state preserves translated DOM.
const FAQAccordionItem = (
  ({
    question,
    answer,
    isOpen,
    name,
    classes,
  }: FAQAccordionItemProps) => (
    <details className={classes.FAQItem} open={isOpen} name={name}>
      <summary className={classes.FAQItem__Header}>
        {/* h3 for the outline, h4 visual size from the shared type scale — the
            weight comes from <Heading>, not from the FAQ stylesheets. */}
        <Heading as='h3' size='h4' className={classes.FAQItem__Question}>
          {question}
        </Heading>
        <ChevronDown size={24} className={classes.FAQItem__Icon} />
      </summary>
      <div className={classes.FAQItem__Content}>
        <div className={classes.FAQItem__Answer}>{answer}</div>
      </div>
    </details>
  )
);

export default FAQAccordionItem;
