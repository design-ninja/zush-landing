import { useEffect, useState } from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
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
        <Heading as='h1' className={styles.ThankYou__Title}>
          Thank you for your purchase! 🎉
        </Heading>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="lg">
      <PageIcon>
        <CheckCircle size={64} />
      </PageIcon>

      <Heading as='h1' className={styles.ThankYou__Title}>
        Thank you for your purchase! 🎉
      </Heading>

      {hasDeviceId ? (
        // Purchased from app - device was auto-activated
        <>
          <Text as='p' className={styles.ThankYou__Subtitle} color='subtle'>
            Your Zush PRO is active. Enjoy 10,000 credits, BYOK, and Offline AI mode - private local models via Ollama.
          </Text>
        </>
      ) : (
        // Purchased from website - need to activate via email
        <>
          <Text as='p' className={styles.ThankYou__Subtitle} color='subtle'>
            Your PRO access is permanent. We've sent an activation email to you.
          </Text>
          <div className={styles.ThankYou__EmailNotice}>
            <Mail size={24} />
            <Text as='p'>
              Open the email and click the <strong>"Activate PRO"</strong> button to unlock PRO features in the app.
            </Text>
          </div>
        </>
      )}

      <div className={styles.ThankYou__Actions}>
        {hasDeviceId && (
          <Button as="a" href="zush://refresh-status">
            Open Zush
          </Button>
        )}
        <BackToHome />
      </div>
    </PageLayout>
  );
};

export default ThankYou;
