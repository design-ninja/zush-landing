import { Link } from 'react-router-dom';
import styles from './BackToHome.module.scss';

interface BackToHomeProps {
  className?: string;
}

const BackToHome = ({ className }: BackToHomeProps) => {
  return (
    <Link to="/" className={`${styles.BackToHome} ${className || ''}`}>
      ← Back to Home
    </Link>
  );
};

export default BackToHome;
