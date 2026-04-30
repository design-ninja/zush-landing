import AppLink from '@/components/AppLink';
import styles from './BackToHome.module.scss';

interface BackToHomeProps {
  className?: string;
  href?: string;
  label?: string;
}

const BackToHome = ({ className, href = '/', label = '← Back to Home' }: BackToHomeProps) => {
  return (
    <AppLink href={href} className={`${styles.BackToHome} ${className || ''}`}>
      {label}
    </AppLink>
  );
};

export default BackToHome;
