import { useMemo, useState } from 'react';
import { Check, FileText } from 'lucide-react';
import { LEGAL_FIELDS } from '@/data/legalLanding';
import styles from './LegalFieldExplorer.module.scss';

const INITIAL_FIELDS = ['matter', 'date', 'type', 'subject'];

export const LegalFieldExplorer = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(INITIAL_FIELDS);

  const proposedName = useMemo(() => {
    const values = LEGAL_FIELDS
      .filter((field) => selectedFields.includes(field.id))
      .map((field) => field.example);

    return `${values.length > 0 ? values.join(' – ') : 'Choose at least one field'}.pdf`;
  }, [selectedFields]);

  const toggleField = (fieldId: string) => {
    setSelectedFields((current) => (
      current.includes(fieldId)
        ? current.filter((id) => id !== fieldId)
        : [...current, fieldId]
    ));
  };

  return (
    <div className={styles.Explorer}>
      <div className={styles.Explorer__Fields}>
        <p className={styles.Explorer__Label}>Fields in this Template</p>
        <div className={styles.Explorer__Chips}>
          {LEGAL_FIELDS.map((field) => {
            const isSelected = selectedFields.includes(field.id);

            return (
              <button
                key={field.id}
                type="button"
                className={`${styles.FieldChip} ${isSelected ? styles.FieldChip_selected : ''}`}
                aria-pressed={isSelected}
                onClick={() => toggleField(field.id)}
              >
                <span className={styles.FieldChip__Check} aria-hidden="true">
                  {isSelected && <Check size={13} strokeWidth={2.8} />}
                </span>
                <span>{field.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.Preview} aria-live="polite">
        <div className={styles.Preview__Header}>
          <span className={styles.Preview__Icon}><FileText size={18} aria-hidden="true" /></span>
          <div>
            <p className={styles.Preview__Label}>Source file</p>
            <p className={styles.Preview__Before}>doc (7).pdf</p>
          </div>
        </div>
        <span className={styles.Preview__Divider} aria-hidden="true"></span>
        <div>
          <p className={styles.Preview__Label}>Proposed filename</p>
          <p className={styles.Preview__After}>{proposedName}</p>
        </div>
        <p className={styles.Preview__Note}>
          Custom AI Blocks can extract any additional field your firm describes in plain language.
        </p>
      </div>
    </div>
  );
};
