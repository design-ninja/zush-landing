import styles from './ErrorMessage.module.scss';
import Text from '@/components/Text';

interface ErrorMessageProps {
  message: string;
  variant?: 'inline' | 'box';
  className?: string;
}

const ErrorMessage = ({ message, variant = 'inline', className }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <Text
      as='p'
      size='sm'
      className={`${styles.ErrorMessage} ${styles[`ErrorMessage--${variant}`]} ${className || ''}`}
    >
      {message}
    </Text>
  );
};

export default ErrorMessage;
