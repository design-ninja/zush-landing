import { useState } from 'react';
import { Check, FileText } from 'lucide-react';
import { MEDICAL_FIELDS } from '@/data/medicalLanding';
import styles from './MedicalFieldExplorer.module.scss';

// Interactive version of the "reads every field" section: the chips are
// buttons, and picking one drives the single rename demo below it. Any field
// can go in the name — it's the user's choice; the privacy guarantee is the run
// mode (Offline AI), not filename hygiene.

// Split `after` around the emphasised substring so the matched part can be
// highlighted without dangerouslySetInnerHTML.
const splitEmphasis = (after: string, emphasis?: string) => {
  if (!emphasis) return { pre: after, hit: '', post: '' };
  const i = after.indexOf(emphasis);
  if (i < 0) return { pre: after, hit: '', post: '' };
  return { pre: after.slice(0, i), hit: emphasis, post: after.slice(i + emphasis.length) };
};

const MedicalFieldExplorer = () => {
  // Default to MRN — the identifier the convention is built around.
  const [selected, setSelected] = useState(1);
  const field = MEDICAL_FIELDS[selected];
  const { pre, hit, post } = splitEmphasis(field.after, field.emphasis);

  return (
    <div className={styles.Explorer}>
      <p className={styles.Explorer__Label}>Tap a field to see the result</p>

      <div className={styles.Explorer__Chips} role='tablist' aria-label='Fields Zush reads'>
        {MEDICAL_FIELDS.map((f, i) => (
          <button
            key={f.label}
            type='button'
            role='tab'
            aria-selected={i === selected}
            className={styles.Explorer__Chip}
            data-active={i === selected ? 'true' : undefined}
            onClick={() => setSelected(i)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* key on `selected` remounts the card so the reveal animation replays. */}
      <div className={styles.Explorer__Stage}>
        <div key={selected} className={styles.Card}>
          <span className={styles.Card__Icon} aria-hidden='true'>
            <FileText size={18} strokeWidth={2.2} />
          </span>
          <span className={styles.Card__Before}>{field.before}</span>
          <span className={styles.Card__Arrow} aria-hidden='true'>→</span>

          <span className={styles.Card__After}>
            {pre}
            {hit && <span className={styles.Card__Hit}>{hit}</span>}
            {post}
          </span>

          <span className={styles.Card__Check} aria-hidden='true'>
            <Check size={11} strokeWidth={3} />
          </span>
        </div>
      </div>

      <p className={styles.Explorer__Hint}>
        Build the filename you want from any field on the page. In Offline AI mode it all runs
        locally — none of it ever leaves your machine.
      </p>
    </div>
  );
};

export default MedicalFieldExplorer;
