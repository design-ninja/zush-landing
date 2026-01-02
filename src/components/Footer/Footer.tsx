import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__Container}>
        <div className={styles.Footer__Grid}>
          <div>
            <Link to="/" className={styles.Footer__Brand}>Zush</Link>
            <p className={styles.Footer__Description}>
              The ultimate AI-powered image organization utility for macOS
            </p>
          </div>
          <div>
            <h4 className={styles.Footer__SectionTitle}>Product</h4>
            <ul className={styles.Footer__Links}>
              <li><a href="/#features" className={styles.Footer__Link}>Features</a></li>
              <li><a href="/#pricing" className={styles.Footer__Link}>Pricing</a></li>
              <li><Link to="/changelog" className={styles.Footer__Link}>Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.Footer__SectionTitle}>Legal</h4>
            <ul className={styles.Footer__Links}>
              <li><Link to="/terms-of-service" className={styles.Footer__Link}>Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className={styles.Footer__Link}>Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className={styles.Footer__Link}>Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.Footer__Bottom}>
          <p>© 2026 <a href="https://lirik.pro/en" target="_blank" rel="noopener noreferrer">lirik</a>. All rights reserved</p>
          <div className={styles.Footer__BottomLinks}>
            <a href="mailto:support@zushapp.com">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
