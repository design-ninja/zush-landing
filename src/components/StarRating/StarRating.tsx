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
        <svg
          key={index}
          className={styles.StarRating__Star}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M12 2.8 L14.8 8.6 L21.2 9.5 L16.6 14 L17.7 20.3 L12 17.3 L6.3 20.3 L7.4 14 L2.8 9.5 L9.2 8.6 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
};

export default StarRating;
