import type { CSSProperties } from 'react';
import styles from './StarRating.module.scss';

interface StarRatingProps {
  value?: number;
  max?: number;
  label?: string;
  className?: string;
  decorative?: boolean;
}

const StarRating = ({
  value = 5,
  max = 5,
  label = `${value} out of ${max} stars`,
  className,
  decorative = false,
}: StarRatingProps) => {
  const safeMax = Math.max(0, Math.ceil(max));
  const safeValue = Math.max(0, Math.min(value, safeMax));
  const accessibilityProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': label };

  return (
    <span
      className={[styles.StarRating, className].filter(Boolean).join(' ')}
      {...accessibilityProps}
    >
      {Array.from({ length: safeMax }, (_, index) => {
        const fill = Math.max(0, Math.min(1, safeValue - index));
        const fillStyle = { '--star-fill': `${fill * 100}%` } as CSSProperties;

        return (
          <span key={index} className={styles.StarRating__Star} style={fillStyle} aria-hidden="true">
            <svg className={styles.StarRating__StarEmpty} viewBox="0 0 24 24">
              <path
                d="M12 2.8 L14.8 8.6 L21.2 9.5 L16.6 14 L17.7 20.3 L12 17.3 L6.3 20.3 L7.4 14 L2.8 9.5 L9.2 8.6 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.StarRating__StarFill}>
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2.8 L14.8 8.6 L21.2 9.5 L16.6 14 L17.7 20.3 L12 17.3 L6.3 20.3 L7.4 14 L2.8 9.5 L9.2 8.6 Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
};

export default StarRating;
