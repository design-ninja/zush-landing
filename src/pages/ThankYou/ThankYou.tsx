import { useEffect, useState } from 'react';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import styles from './ThankYou.module.scss';

const ThankYou = () => {
  const [hasDeviceId, setHasDeviceId] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if purchase was made from the app (with device_id)
    const deviceId = sessionStorage.getItem('zush_checkout_device_id');
    setHasDeviceId(!!deviceId);
    // Clear the stored device_id
    sessionStorage.removeItem('zush_checkout_device_id');
  }, []);

  // Show loading state while checking
  if (hasDeviceId === null) {
    return (
      <section className={styles.ThankYou}>
        <div className={styles.ThankYou__Container}>
          <div className={styles.ThankYou__Icon}>
            <CheckCircle size={64} />
          </div>
          <h1 className={styles.ThankYou__Title}>
            Thank you for your purchase! 🎉
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.ThankYou}>
      <div className={styles.ThankYou__Container}>
        <div className={styles.ThankYou__Icon}>
          <CheckCircle size={64} />
        </div>
        
        <h1 className={styles.ThankYou__Title}>
          Thank you for your purchase! 🎉
        </h1>
        
        {hasDeviceId ? (
          // Purchased from app - device was auto-activated
          <p className={styles.ThankYou__Subtitle}>
            Your Zush PRO license has been activated. Open the app, and the PRO features will be unlocked.
          </p>
        ) : (
          // Purchased from website - need to activate via email
          <>
            <p className={styles.ThankYou__Subtitle}>
              We've sent an activation email to you.
            </p>
            <div className={styles.ThankYou__EmailNotice}>
              <Mail size={24} />
              <p>
                Open the email and click the <strong>"Activate PRO"</strong> button to unlock PRO features in the app.
              </p>
            </div>
          </>
        )}

        <div className={styles.ThankYou__Actions}>
          {hasDeviceId && (
            <Button as="a" href="zush://refresh-status">
              Open app
              <ArrowRight size={18} />
            </Button>
          )}
          <BackToHome />
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
