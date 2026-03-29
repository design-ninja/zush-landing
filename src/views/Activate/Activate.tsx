import { useEffect, useState } from 'react';
import { ExternalLink, AlertCircle, Download } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { DOWNLOAD_URL } from '@/constants';
import styles from './Activate.module.scss';

interface ActivationParams {
  token: string;
  email: string;
}

const Activate = () => {
  const [activationParams, setActivationParams] = useState<ActivationParams | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActivationParams({
      token: params.get('token') || '',
      email: params.get('email') || '',
    });
  }, []);

  const token = activationParams?.token || '';
  const email = activationParams?.email || '';

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

  if (!activationParams) {
    return (
      <PageLayout>
        <PageIcon animated>
          <ExternalLink size={64} />
        </PageIcon>

        <Heading as='h1' className={styles.Activate__Title}>Opening Zush...</Heading>

        <Text as='p' className={styles.Activate__Subtitle} color='subtle'>
          We're preparing your activation link.
        </Text>

        <BackToHome />
      </PageLayout>
    );
  }

  if (!token || !email) {
    return (
      <PageLayout>
        <PageIcon variant="error">
          <AlertCircle size={64} />
        </PageIcon>

        <Heading as='h1' className={styles.Activate__Title}>Invalid Activation Link</Heading>

        <Text as='p' className={styles.Activate__Subtitle} color='subtle'>
          This activation link appears to be invalid or expired.
          <br />
          Please request a new activation link.
        </Text>

        <div className={styles.Activate__Actions}>
          <Button as="link" href="/recover" variant="primary" size="lg">
            Request New Link
          </Button>
        </div>

        <BackToHome />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageIcon animated>
        <ExternalLink size={64} />
      </PageIcon>

      <Heading as='h1' className={styles.Activate__Title}>Opening Zush...</Heading>

      <Text as='p' className={styles.Activate__Subtitle} color='subtle'>
        We're trying to open the Zush app to complete activation.
      </Text>

      <div className={styles.Activate__Box}>
        <Text as='p' className={styles.Activate__BoxTitle}>App didn't open?</Text>
        <Text as='p' className={styles.Activate__BoxDesc} color='subtle'>
          Make sure Zush is installed on your Mac, then click the button below.
        </Text>
        <Button onClick={handleOpenApp} variant="primary" size="lg">
          <ExternalLink size={18} />
          Open Zush App
        </Button>
      </div>

      <div className={styles.Activate__Help}>
        <Text as='p' size='sm' color='subtle'>Don't have Zush installed?</Text>
        <Button
          as="a"
          href={DOWNLOAD_URL}
          variant="ghost"
          size="md"
        >
          <Download size={18} />
          Download Zush for Mac
        </Button>
      </div>

      <BackToHome />
    </PageLayout>
  );
};

export default Activate;
