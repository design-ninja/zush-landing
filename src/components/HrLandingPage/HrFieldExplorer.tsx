import { useState } from 'react';
import { Check, FileText } from 'lucide-react';
import { HR_FIELDS } from '@/data/hrLanding';
import styles from '@/components/LegalLandingPage/LegalFieldExplorer.module.scss';

const splitEmphasis = (after: string, emphasis?: string) => {
  if (!emphasis) return { pre: after, hit: '', post: '' };
  const index = after.indexOf(emphasis);
  if (index < 0) return { pre: after, hit: '', post: '' };

  return {
    pre: after.slice(0, index),
    hit: emphasis,
    post: after.slice(index + emphasis.length),
  };
};

export const HrFieldExplorer = () => {
  const [selected, setSelected] = useState(0);
  const field = HR_FIELDS[selected];
  const { pre, hit, post } = splitEmphasis(field.after, field.emphasis);

  return (
    <div className={styles.Explorer}>
      <p className={styles.Explorer__Label}>Tap a field to see the result</p>

      <div className={styles.Explorer__Chips} role="tablist" aria-label="HR fields Zush reads">
        {HR_FIELDS.map((item, index) => (
          <button
            key={item.label}
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
          <span className={styles.Card__Icon} aria-hidden="true">
            <FileText size={18} strokeWidth={2.2} />
          </span>
          <span className={styles.Card__Before}>{field.before}</span>
          <span className={styles.Card__Arrow} aria-hidden="true">→</span>
          <span className={styles.Card__After}>
            {pre}
            {hit && <span className={styles.Card__Hit}>{hit}</span>}
            {post}
          </span>
          <span className={styles.Card__Check} aria-hidden="true">
            <Check size={11} strokeWidth={3} />
          </span>
        </div>
      </div>

      <p className={styles.Explorer__Hint}>
        Your Template decides which fields appear in the filename. Run the extraction locally
        with LM Studio or Ollama, or through the provider account your organization controls with BYOK.
      </p>
    </div>
  );
};
