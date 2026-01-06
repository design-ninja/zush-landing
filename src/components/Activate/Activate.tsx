import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ExternalLink, AlertCircle } from 'lucide-react';
import styles from './Activate.module.scss';
import { APP_DOWNLOAD_URL } from '../../constants';

const Activate = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  // Try to open the app automatically
  useEffect(() => {
    if (token && email) {
      const appUrl = `zush://activate?token=${token}&email=${encodeURIComponent(email)}`;
      window.location.href = appUrl;
    }
  }, [token, email]);

  const handleOpenApp = () => {
    if (token && email) {
      const appUrl = `zush://activate?token=${token}&email=${encodeURIComponent(email)}`;
      window.location.href = appUrl;
    }
  };

  if (!token || !email) {
    return (
      <section className={styles.Activate}>
        <div className={styles.Activate__Container}>
          <div className={styles.Activate__IconError}>
            <AlertCircle size={64} />
          </div>
          
          <h1 className={styles.Activate__Title}>Invalid Activation Link</h1>
          
          <p className={styles.Activate__Subtitle}>
            This activation link appears to be invalid or expired.
            <br />
            Please request a new activation link.
          </p>
          
          <div className={styles.Activate__Actions}>
            <Link to="/recover" className={styles.Activate__Button}>
              Request New Link
            </Link>
          </div>
          
          <Link to="/" className={styles.Activate__BackLink}>
            ← Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.Activate}>
      <div className={styles.Activate__Container}>
        <div className={styles.Activate__Icon}>
          <ExternalLink size={64} />
        </div>
        
        <h1 className={styles.Activate__Title}>Opening Zush...</h1>
        
        <p className={styles.Activate__Subtitle}>
          We're trying to open the Zush app to complete activation.
        </p>
        
        <div className={styles.Activate__Box}>
          <p className={styles.Activate__BoxTitle}>App didn't open?</p>
          <p className={styles.Activate__BoxDesc}>
            Make sure Zush is installed on your Mac, then click the button below.
          </p>
          <button onClick={handleOpenApp} className={styles.Activate__Button}>
            <ExternalLink size={18} />
            Open Zush App
          </button>
        </div>
        
        <div className={styles.Activate__Help}>
          <p>Don't have Zush installed?</p>
          <a 
            href={APP_DOWNLOAD_URL}
            className={styles.Activate__Link}
          >
            Download Zush for Mac
          </a>
        </div>
        
        <Link to="/" className={styles.Activate__BackLink}>
          ← Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Activate;
