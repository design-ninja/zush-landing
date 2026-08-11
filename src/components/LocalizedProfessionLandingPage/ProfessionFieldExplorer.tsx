import { useState } from 'react';
import { Check, FileText } from 'lucide-react';
import type { ProfessionFieldCopy } from '@/i18n/professions/types';
import styles from '@/components/LegalLandingPage/LegalFieldExplorer.module.scss';

interface Props {
  fields: ProfessionFieldCopy[];
  instruction: string;
  ariaLabel: string;
  hint: string;
}

function splitEmphasis(after: string, emphasis?: string) {
  if (!emphasis) return { pre: after, hit: '', post: '' };
  const index = after.indexOf(emphasis);
  if (index < 0) return { pre: after, hit: '', post: '' };

  return {
    pre: after.slice(0, index),
    hit: emphasis,
    post: after.slice(index + emphasis.length),
  };
}

export default function ProfessionFieldExplorer({ fields, instruction, ariaLabel, hint }: Props) {
  const [selected, setSelected] = useState(0);
  const field = fields[selected] ?? fields[0];

  if (!field) return null;

  const { pre, hit, post } = splitEmphasis(field.after, field.emphasis);

  return (
    <div className={styles.Explorer}>
      <p className={styles.Explorer__Label}>{instruction}</p>
      <div className={styles.Explorer__Chips} role="tablist" aria-label={ariaLabel}>
        {fields.map((item, index) => (
          <button
            key={`${item.label}-${index}`}
            type="button"
            role="tab"
            aria-selected={index === selected}
            className={styles.Explorer__Chip}
            data-active={index === selected ? 'true' : undefined}
            onClick={() => setSelected(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.Explorer__Stage}>
        <div key={selected} className={styles.Card}>
          <span className={styles.Card__Icon} aria-hidden="true"><FileText size={18} strokeWidth={2.2} /></span>
          <span className={styles.Card__Before}>{field.before}</span>
          <span className={styles.Card__Arrow} aria-hidden="true">→</span>
          <span className={styles.Card__After}>
            {pre}{hit && <span className={styles.Card__Hit}>{hit}</span>}{post}
          </span>
          <span className={styles.Card__Check} aria-hidden="true"><Check size={11} strokeWidth={3} /></span>
        </div>
      </div>
      <p className={styles.Explorer__Hint}>{hint}</p>
    </div>
  );
}
