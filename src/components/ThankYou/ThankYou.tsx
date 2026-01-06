import { useSearchParams, Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import styles from './ThankYou.module.scss';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <section className={styles.ThankYou}>
      <div className={styles.ThankYou__Container}>
        <div className={styles.ThankYou__Icon}>
          <Mail size={64} />
        </div>
        
        <h1 className={styles.ThankYou__Title}>
          Thank you for your purchase! 🎉
        </h1>
        
        <p className={styles.ThankYou__Subtitle}>
          We sent an activation link to <strong>{email || 'your email'}</strong>.
        </p>

        <div className={styles.ThankYou__EmailBox}>
          <div className={styles.ThankYou__EmailIcon}>
            <Mail size={24} />
          </div>
          <div className={styles.ThankYou__EmailContent}>
            <p className={styles.ThankYou__EmailTitle}>Check your inbox</p>
            <p className={styles.ThankYou__EmailDesc}>
              Click the activation link in the email to unlock Zush PRO.
              <br />
              <span className={styles.ThankYou__EmailHint}>
                Don't forget to check spam folder!
              </span>
            </p>
          </div>
        </div>

        <div className={styles.ThankYou__Instructions}>
          <h3>How activation works:</h3>
          <ol>
            <li>Open the email from <strong>noreply@zushapp.com</strong></li>
            <li>Click <strong>"Activate Zush PRO"</strong> button</li>
            <li>Zush app will open and activate automatically</li>
          </ol>
        </div>

        <div className={styles.ThankYou__Links}>
          <Link to="/" className={styles.ThankYou__Link}>
            ← Back to Home
          </Link>
          <Link to="/recover" className={styles.ThankYou__Link}>
            <span>Need a new link?</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
