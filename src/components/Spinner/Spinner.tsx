import styles from './Spinner.module.scss';

interface SpinnerProps {
  /** CSS length; defaults to 2rem. */
  size?: string;
  label?: string;
  className?: string;
}

const Spinner = ({ size, label, className }: SpinnerProps) => (
  <span
    role="status"
    aria-label={label}
    aria-hidden={label ? undefined : true}
    className={[styles.Spinner, className].filter(Boolean).join(' ')}
    style={size ? { width: size, height: size } : undefined}
  />
);

export default Spinner;
