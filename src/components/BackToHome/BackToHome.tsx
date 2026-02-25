import AppLink from '@/components/AppLink';
import styles from './BackToHome.module.scss';

interface BackToHomeProps {
  className?: string;
}

const BackToHome = ({ className }: BackToHomeProps) => {
  return (
    <AppLink href="/" className={`${styles.BackToHome} ${className || ''}`}>
      ← Back to Home
    </AppLink>
  );
};

export default BackToHome;
