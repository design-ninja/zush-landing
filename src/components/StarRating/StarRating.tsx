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
  const starCount = Math.max(0, Math.min(value, max));
  const accessibilityProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'img', 'aria-label': label };

  return (
    <span
      className={[styles.StarRating, className].filter(Boolean).join(' ')}
      {...accessibilityProps}
    >
      {Array.from({ length: starCount }, (_, index) => (
        <span key={index} className={styles.StarRating__Star} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
};

export default StarRating;
