import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  variant?: 'inline' | 'box';
  className?: string;
}

const ErrorMessage = ({ message, variant = 'inline', className }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className={`${styles.ErrorMessage} ${styles[`ErrorMessage--${variant}`]} ${className || ''}`}>
      {message}
    </p>
  );
};

export default ErrorMessage;
