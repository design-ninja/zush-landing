import { memo } from 'react';
import { BillingPeriod } from '@/constants';
import styles from './Pricing.module.scss';

interface BillingToggleProps {
  planType: BillingPeriod;
  discountLabel: string;
  isDisabled: boolean;
  onChange: (period: BillingPeriod) => void;
}

export const BillingToggle = memo(({
  planType,
  discountLabel,
  isDisabled,
  onChange,
}: BillingToggleProps) => (
  <div className={styles.PricingCard__ToggleWrapper}>
    <label className={styles.AnnualToggle}>
      <input
        type='checkbox'
        checked={planType === 'annual'}
        onChange={(e) => onChange(e.target.checked ? 'annual' : 'monthly')}
        className={styles.AnnualToggle__Input}
        disabled={isDisabled}
      />
      <span className={styles.AnnualToggle__Track}>
        <span className={styles.AnnualToggle__Thumb} />
      </span>
      <span className={styles.AnnualToggle__Label}>
        <span className={styles.AnnualToggle__Title}>Annual billing</span>
        <span className={styles.AnnualToggle__Discount}>
          ({discountLabel})
        </span>
      </span>
    </label>
  </div>
));

BillingToggle.displayName = 'BillingToggle';
