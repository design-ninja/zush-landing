import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link to="/" className={styles.Logo}>
      <img src="/logo.png" alt="Zush Logo" className={styles.Logo__Icon} />
      <span className={styles.Logo__Text}>Zush</span>
    </Link>
  );
};

export default Logo;
