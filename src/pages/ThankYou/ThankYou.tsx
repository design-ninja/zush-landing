import { useEffect, useState } from 'react';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
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
      <PageLayout maxWidth="lg">
        <PageIcon>
          <CheckCircle size={64} />
        </PageIcon>
        <h1 className={styles.ThankYou__Title}>
          Thank you for your purchase! 🎉
        </h1>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="lg">
      <PageIcon>
        <CheckCircle size={64} />
      </PageIcon>

      <h1 className={styles.ThankYou__Title}>
        Thank you for your purchase! 🎉
      </h1>

      {hasDeviceId ? (
        // Purchased from app - device was auto-activated
        <>
          <p className={styles.ThankYou__Subtitle}>
            Your Zush PRO access is permanent (one-time purchase).
          </p>
          <p className={styles.ThankYou__Subtitle}>
            The PRO features have been unlocked in your app. Enjoy 10,000 credits/month and BYOK for unlimited processing!
          </p>
        </>
      ) : (
        // Purchased from website - need to activate via email
        <>
          <p className={styles.ThankYou__Subtitle}>
            Your PRO access is permanent (one-time purchase).
          </p>
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
    </PageLayout>
  );
};

export default ThankYou;
