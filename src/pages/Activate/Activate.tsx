import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ExternalLink, AlertCircle, Download } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import { DOWNLOAD_URL } from '@/constants';
import styles from './Activate.module.scss';

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
      <PageLayout>
        <PageIcon variant="error">
          <AlertCircle size={64} />
        </PageIcon>

        <h1 className={styles.Activate__Title}>Invalid Activation Link</h1>

        <p className={styles.Activate__Subtitle}>
          This activation link appears to be invalid or expired.
          <br />
          Please request a new activation link.
        </p>

        <div className={styles.Activate__Actions}>
          <Button as={Link} to="/recover" variant="primary" size="lg">
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

      <h1 className={styles.Activate__Title}>Opening Zush...</h1>

      <p className={styles.Activate__Subtitle}>
        We're trying to open the Zush app to complete activation.
      </p>

      <div className={styles.Activate__Box}>
        <p className={styles.Activate__BoxTitle}>App didn't open?</p>
        <p className={styles.Activate__BoxDesc}>
          Make sure Zush is installed on your Mac, then click the button below.
        </p>
        <Button onClick={handleOpenApp} variant="primary" size="lg">
          <ExternalLink size={18} />
          Open Zush App
        </Button>
      </div>

      <div className={styles.Activate__Help}>
        <p>Don't have Zush installed?</p>
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
