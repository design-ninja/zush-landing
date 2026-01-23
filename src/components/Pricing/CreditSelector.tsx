import { memo } from 'react';
import styles from './Pricing.module.scss';

interface CreditSelectorProps {
  availableCredits: number[];
  selectedCredits: number;
  currentCredits: number | null;
  isUpgradeMode: boolean;
  isDisabled: boolean;
  onSelect: (credits: number) => void;
}

const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toLocaleString('en-US') : String(num);
};

export const CreditSelector = memo(({
  availableCredits,
  selectedCredits,
  currentCredits,
  isUpgradeMode,
  isDisabled,
  onSelect,
}: CreditSelectorProps) => (
  <div className={styles.Controls__PricingCard}>
    <div className={styles.PackLabel__PricingCard}>
      Choose monthly credits{' '}
      <span className={styles.PackLabelHint__PricingCard}>
        · 1 credit = 1 file rename
      </span>
    </div>
    <div className={styles.PackToggle__PricingCard}>
      {availableCredits.map((credits) => {
        const isCurrent = isUpgradeMode && credits === currentCredits;
        return (
          <button
            key={credits}
            className={`${styles.PricingCard__ToggleButton} ${styles.PackToggleButton__PricingCard} ${
              selectedCredits === credits
                ? styles.PricingCard__ToggleButton_active
                : ''
            }`}
            onClick={() => onSelect(credits)}
            disabled={isDisabled || isCurrent}
          >
            <span className={styles.PackToggleButton__Credits}>{formatNumber(credits)}</span>
            {isCurrent && <span className={styles.PackToggleButton__CurrentLabel}>current</span>}
          </button>
        );
      })}
    </div>
  </div>
));

CreditSelector.displayName = 'CreditSelector';
