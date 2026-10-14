import { SOFTPEDIA_REVIEW_URL, WINDOWS_STORE_US_URL } from '@/constants';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/config';
import {
  MICROSOFT_STORE_RATED_ON_LABELS,
  MICROSOFT_STORE_RATING_ARIA_LABELS,
} from '@/i18n/microsoftStoreRating';
import { SOFTPEDIA_RATED_BY_LABELS, SOFTPEDIA_REVIEW_ARIA_LABELS } from '@/i18n/softpediaReview';
import styles from './ExternalRatings.module.scss';

interface ExternalRatingsProps {
  /** Fills any label not passed explicitly (English by default). */
  locale?: Locale;
  softpediaRatedByLabel?: string;
  softpediaReviewAriaLabel?: string;
  microsoftStoreRatedOnLabel?: string;
  microsoftStoreRatingAriaLabel?: string;
  /** Layout hook for the host (margins, alignment). */
  className?: string;
}

// "Rated by Softpedia ★ 4.5 · Rated on Microsoft Store ★ 5.0" — one quiet pill
// per source, the same everywhere a hero shows independent ratings.
const ExternalRatings = ({
  locale = DEFAULT_LOCALE,
  softpediaRatedByLabel = SOFTPEDIA_RATED_BY_LABELS[locale],
  softpediaReviewAriaLabel = SOFTPEDIA_REVIEW_ARIA_LABELS[locale],
  microsoftStoreRatedOnLabel = MICROSOFT_STORE_RATED_ON_LABELS[locale],
  microsoftStoreRatingAriaLabel = MICROSOFT_STORE_RATING_ARIA_LABELS[locale],
  className = '',
}: ExternalRatingsProps) => {
  if (!softpediaReviewAriaLabel && !microsoftStoreRatingAriaLabel) return null;

  return (
    <div className={`${styles.ExternalRatings} ${className}`} role="group" aria-label="Independent ratings" data-external-ratings>
      {softpediaReviewAriaLabel && (
        <a
          className={styles.Rating}
          href={SOFTPEDIA_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer external"
          aria-label={softpediaReviewAriaLabel}
        >
          {softpediaRatedByLabel && <span className={styles.Rating__Prefix}>{softpediaRatedByLabel}</span>}
          {/* Wordmark drawn from CSS so the page text stays "Rated by 4.5". */}
          <span className={styles.Rating__Softpedia} aria-hidden="true" />
          <span className={styles.Rating__Star} aria-hidden="true" />
          <span className={styles.Rating__Score}>4.5</span>
        </a>
      )}
      {microsoftStoreRatingAriaLabel && (
        <a
          className={styles.Rating}
          href={WINDOWS_STORE_US_URL}
          target="_blank"
          rel="noopener noreferrer external"
          aria-label={microsoftStoreRatingAriaLabel}
        >
          {microsoftStoreRatedOnLabel && <span className={styles.Rating__Prefix}>{microsoftStoreRatedOnLabel}</span>}
          <span aria-hidden="true" translate="no">Microsoft Store</span>
          <span className={styles.Rating__Star} aria-hidden="true" />
          <span className={styles.Rating__Score}>5.0</span>
        </a>
      )}
    </div>
  );
};

export default ExternalRatings;
