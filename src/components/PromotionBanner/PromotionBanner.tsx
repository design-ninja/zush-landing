import { PRO_ONE_TIME_PROMOTION } from '@/constants/promotion';
import styles from './PromotionBanner.module.scss';

export function PromotionBanner() {
  const { code, discountPercent } = PRO_ONE_TIME_PROMOTION;

  return (
    <a
      className={styles.PromotionBanner}
      href="#pricing"
      aria-label={`View ${discountPercent}% off PRO One-Time offer with code ${code}`}
    >
      <span className={styles.PromotionBanner__Tag}>
        <span className={styles.PromotionBanner__Mark} aria-hidden="true">✦</span>
        <span className={styles.PromotionBanner__Label}>Limited Offer</span>
      </span>
      <span className={styles.PromotionBanner__Message}>
        <strong>{discountPercent}% off PRO One-Time with code</strong>
        <code>{code}</code>
      </span>
      <span className={styles.PromotionBanner__Action}>
        <span>View Offer</span>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4v11m-4-4 4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
