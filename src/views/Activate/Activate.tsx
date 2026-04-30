import { useEffect, useState } from 'react';
import { ExternalLink, AlertCircle, Download } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { DOWNLOAD_URL } from '@/constants';
import { DEFAULT_LOCALE, getLocalizedPath, type Locale } from '@/i18n/config';
import { getServicePageCopy, type ActivateCopy } from '@/i18n/servicePages';
import styles from './Activate.module.scss';

interface ActivationParams {
  token: string;
  email: string;
}

interface ActivateProps {
  locale?: Locale;
  copy?: ActivateCopy;
  backToHomeLabel?: string;
  homeHref?: string;
  recoverHref?: string;
}

const defaultServiceCopy = getServicePageCopy(DEFAULT_LOCALE);

const Activate = ({
  locale = DEFAULT_LOCALE,
  copy = defaultServiceCopy.activate,
  backToHomeLabel = defaultServiceCopy.backToHome,
  homeHref,
  recoverHref,
}: ActivateProps) => {
  const [activationParams, setActivationParams] = useState<ActivationParams | null>(null);
  const resolvedHomeHref = homeHref ?? getLocalizedPath('/', locale);
  const resolvedRecoverHref = recoverHref ?? getLocalizedPath('/recover', locale);

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

        <Heading as='h1' className={styles.Activate__Title}>{copy.preparingTitle}</Heading>

        <Text as='p' className={styles.Activate__Subtitle} color='subtle'>
          {copy.preparingText}
        </Text>

        <BackToHome href={resolvedHomeHref} label={backToHomeLabel} />
      </PageLayout>
    );
  }

  if (!token || !email) {
    return (
      <PageLayout>
        <PageIcon variant="error">
          <AlertCircle size={64} />
        </PageIcon>

        <Heading as='h1' className={styles.Activate__Title}>{copy.invalidTitle}</Heading>

        <Text as='p' className={styles.Activate__Subtitle} color='subtle'>
          {copy.invalidText}
        </Text>

        <div className={styles.Activate__Actions}>
          <Button as="link" href={resolvedRecoverHref} variant="primary" size="lg">
            {copy.requestNewLink}
          </Button>
        </div>

        <BackToHome href={resolvedHomeHref} label={backToHomeLabel} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageIcon animated>
        <ExternalLink size={64} />
      </PageIcon>

      <Heading as='h1' className={styles.Activate__Title}>{copy.openingTitle}</Heading>

      <Text as='p' className={styles.Activate__Subtitle} color='subtle'>
        {copy.openingText}
      </Text>

      <div className={styles.Activate__Box}>
        <Text as='p' className={styles.Activate__BoxTitle}>{copy.appDidNotOpen}</Text>
        <Text as='p' className={styles.Activate__BoxDesc} color='subtle'>
          {copy.installHint}
        </Text>
        <Button onClick={handleOpenApp} variant="primary" size="lg">
          <ExternalLink size={18} />
          {copy.openApp}
        </Button>
      </div>

      <div className={styles.Activate__Help}>
        <Text as='p' size='sm' color='subtle'>{copy.notInstalled}</Text>
        <Button
          as="a"
          href={DOWNLOAD_URL}
          variant="ghost"
          size="md"
        >
          <Download size={18} />
          {copy.download}
        </Button>
      </div>

      <BackToHome href={resolvedHomeHref} label={backToHomeLabel} />
    </PageLayout>
  );
};

export default Activate;
