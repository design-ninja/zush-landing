import { useSearchParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './ThankYou.module.scss';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [appOpened, setAppOpened] = useState(false);

  useEffect(() => {
    // Try to open the Zush app to refresh PRO status
    const timer = setTimeout(() => {
      window.location.href = 'zush://refresh-status';
      setAppOpened(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.ThankYou}>
      <div className={styles.ThankYou__Container}>
        <div className={styles.ThankYou__Icon}>
          <CheckCircle size={64} />
        </div>
        
        <h1 className={styles.ThankYou__Title}>
          Thank you for your purchase! 🎉
        </h1>
        
        <p className={styles.ThankYou__Subtitle}>
          Your Zush PRO license is being activated...
        </p>

        {appOpened && (
          <div className={styles.ThankYou__EmailBox}>
            <div className={styles.ThankYou__EmailIcon}>
              <CheckCircle size={24} />
            </div>
            <div className={styles.ThankYou__EmailContent}>
              <p className={styles.ThankYou__EmailTitle}>Check the Zush app</p>
              <p className={styles.ThankYou__EmailDesc}>
                Your PRO status should be active now!
                <br />
                <span className={styles.ThankYou__EmailHint}>
                  If the app didn't open, click below to refresh manually.
                </span>
              </p>
            </div>
          </div>
        )}

        <div className={styles.ThankYou__Instructions}>
          <h3>What happens next:</h3>
          <ol>
            <li>Zush app will automatically unlock PRO features</li>
            <li>An activation link will be sent to <strong>{email || 'your email'}</strong></li>
            <li>Use the link to activate PRO on other devices</li>
          </ol>
        </div>

        <div className={styles.ThankYou__Links}>
          <a href="zush://refresh-status" className={styles.ThankYou__Link}>
            Refresh PRO Status in App
          </a>
          <Link to="/" className={styles.ThankYou__Link}>
            ← Back to Home
          </Link>
          <Link to="/recover" className={styles.ThankYou__Link}>
            <span>Need a new activation link?</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
