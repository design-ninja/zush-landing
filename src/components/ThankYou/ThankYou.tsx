import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Copy, Check } from 'lucide-react';
import styles from './ThankYou.module.scss';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  
  // Extract license key from URL params (passed by Paddle redirect)
  const licenseKey = searchParams.get('license') || '';
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
    }
  };

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
          Your Zush PRO license is ready. Copy the key below and paste it into the app.
        </p>

        {licenseKey ? (
          <div className={styles.ThankYou__LicenseBox}>
            <span className={styles.ThankYou__LicenseLabel}>Your License Key</span>
            <div className={styles.ThankYou__LicenseKey}>
              <code>{licenseKey}</code>
              <button 
                onClick={handleCopy}
                className={styles.ThankYou__CopyButton}
                title="Copy to clipboard"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.ThankYou__NoKey}>
            <p>
              Your license key has been sent to <strong>{email || 'your email'}</strong>.
            </p>
            <p>
              Check your inbox (and spam folder) for an email from noreply@zushapp.com.
            </p>
          </div>
        )}

        <div className={styles.ThankYou__Instructions}>
          <h3>How to activate:</h3>
          <ol>
            <li>Open Zush app on your Mac</li>
            <li>Go to <strong>Settings → PRO</strong></li>
            <li>Paste your license key and click <strong>Activate</strong></li>
          </ol>
        </div>

        <div className={styles.ThankYou__Links}>
          <Link to="/" className={styles.ThankYou__Link}>
            ← Back to Home
          </Link>
          <Link to="/recover" className={styles.ThankYou__Link}>
            Lost your key?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
