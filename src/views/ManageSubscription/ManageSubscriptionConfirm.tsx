import { useEffect, useState } from 'react';
import { CreditCard } from 'lucide-react';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import ErrorMessage from '@/components/ErrorMessage';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { SUPABASE_URL } from '@/utils/supabase';
import styles from './ManageSubscription.module.scss';

const ManageSubscriptionConfirm = () => {
  const [error, setError] = useState('');

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (!token) {
      setError('Subscription management link is missing or invalid.');
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
            'This subscription management link is invalid or expired.'
        );
      } catch {
        if (!cancelled) {
          setError('Connection error. Please check your internet and try again.');
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
        Opening Subscription Portal
      </Heading>

      {!error && (
        <Text as='p' className={styles.ManageSubscription__Subtitle} color='subtle'>
          Redirecting to Paddle...
        </Text>
      )}

      <ErrorMessage message={error} variant="box" />

      {error && (
        <div className={styles.ManageSubscription__Actions}>
          <BackToHome />
        </div>
      )}
    </PageLayout>
  );
};

export default ManageSubscriptionConfirm;
