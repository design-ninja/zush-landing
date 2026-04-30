import { useEffect, useState } from 'react';
import { CreditCard } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import ErrorMessage from '@/components/ErrorMessage';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { DEFAULT_LOCALE, getLocalizedPath, type Locale } from '@/i18n/config';
import { getServicePageCopy, type ManageSubscriptionConfirmCopy } from '@/i18n/servicePages';
import { SUPABASE_URL } from '@/utils/supabase';
import styles from './ManageSubscription.module.scss';

interface ManageSubscriptionConfirmProps {
  locale?: Locale;
  copy?: ManageSubscriptionConfirmCopy;
  backToHomeLabel?: string;
  homeHref?: string;
  connectionError?: string;
}

const defaultServiceCopy = getServicePageCopy(DEFAULT_LOCALE);

const ManageSubscriptionConfirm = ({
  locale = DEFAULT_LOCALE,
  copy = defaultServiceCopy.manageSubscriptionConfirm,
  backToHomeLabel = defaultServiceCopy.backToHome,
  homeHref,
  connectionError = defaultServiceCopy.connectionError,
}: ManageSubscriptionConfirmProps) => {
  const [error, setError] = useState('');
  const resolvedHomeHref = homeHref ?? getLocalizedPath('/', locale);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (!token) {
      setError(copy.missingToken);
      return;
    }

    let cancelled = false;

    const openPortal = async () => {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/functions/v1/get-customer-portal-url`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (cancelled) return;

        if (response.ok && data.portal_url) {
          window.location.href = data.portal_url;
          return;
        }

        setError(
          data.message ||
            data.error ||
            copy.invalidLink
        );
      } catch {
        if (!cancelled) {
          setError(connectionError);
        }
      }
    };

    void openPortal();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageLayout>
      <PageIcon>
        <CreditCard size={48} />
      </PageIcon>

      <Heading as='h1' className={styles.ManageSubscription__Title}>
        {copy.title}
      </Heading>

      {!error && (
        <Text as='p' className={styles.ManageSubscription__Subtitle} color='subtle'>
          {copy.redirecting}
        </Text>
      )}

      <ErrorMessage message={error} variant="box" />

      {error && (
        <div className={styles.ManageSubscription__Actions}>
          <BackToHome href={resolvedHomeHref} label={backToHomeLabel} />
        </div>
      )}
    </PageLayout>
  );
};

export default ManageSubscriptionConfirm;
