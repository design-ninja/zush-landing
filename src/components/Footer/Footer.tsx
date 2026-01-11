import { Link } from 'react-router-dom';
import Heading from '../Heading';
import Text from '../Text';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__Container}>
        <div className={styles.Footer__Grid}>
          <div>
            <Link to="/" className={styles.Footer__Brand}>Zush</Link>
            <Text color="subtle" className={styles.Footer__Description}>
              The ultimate AI-powered image organization utility for macOS
            </Text>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>Product</Heading>
            <ul className={styles.Footer__Links}>
              <li><a href="/#features" className={styles.Footer__Link}>Features</a></li>
              <li><a href="/#pricing" className={styles.Footer__Link}>Pricing</a></li>
              <li><Link to="/changelog" className={styles.Footer__Link}>Changelog</Link></li>
              <li><Link to="/manage-subscription" className={styles.Footer__Link}>Manage Subscription</Link></li>
            </ul>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>Legal</Heading>
            <ul className={styles.Footer__Links}>
              <li><Link to="/terms-of-service" className={styles.Footer__Link}>Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className={styles.Footer__Link}>Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className={styles.Footer__Link}>Refund Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.Footer__Bottom}>
          <Text color="subtle">© 2026 <a href="https://lirik.pro/en" target="_blank" rel="noopener noreferrer">lirik</a>. All rights reserved</Text>
          <div className={styles.Footer__BottomLinks}>
            <a href="mailto:support@zushapp.com">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

