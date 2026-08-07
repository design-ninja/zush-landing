import { useState } from 'react';
import { Check, Image as ImageIcon } from 'lucide-react';
import { PHOTOGRAPHERS_FIELDS } from '@/data/photographersLanding';
import styles from '../MedicalLandingPage/MedicalFieldExplorer.module.scss';

const splitEmphasis = (after: string, emphasis: string | undefined) => {
  if (!emphasis) return { pre: after, hit: '', post: '' };
  const index = after.indexOf(emphasis);
  if (index < 0) return { pre: after, hit: '', post: '' };
  return {
    pre: after.slice(0, index),
    hit: emphasis,
    post: after.slice(index + emphasis.length),
  };
};

export const PhotographersFieldExplorer = () => {
  const [selected, setSelected] = useState(0);
  const field = PHOTOGRAPHERS_FIELDS[selected];
  const { pre, hit, post } = splitEmphasis(field.after, field.emphasis);

  return (
    <div className={styles.Explorer}>
      <p className={styles.Explorer__Label}>Choose a field to see it in the filename</p>

      <div className={styles.Explorer__Chips} role="tablist" aria-label="Photo and video filename fields">
        {PHOTOGRAPHERS_FIELDS.map((item, index) => (
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
            <ImageIcon size={18} strokeWidth={2.2} />
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
        Your Template controls the order and separators. Add a Custom AI Block when your studio needs a field that is not built in.
      </p>
    </div>
  );
};
