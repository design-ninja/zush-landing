import { useState } from 'react';
import { CreditCard, ExternalLink } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import FormInput from '@/components/FormInput';
import ErrorMessage from '@/components/ErrorMessage';
import { SUPABASE_URL } from '@/utils/supabase';
import styles from './ManageSubscription.module.scss';

const ManageSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/get-customer-portal-url`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await response.json();

      if (response.ok && data.portal_url) {
        window.location.href = data.portal_url;
      } else if (response.status === 404) {
        setError('No active subscription found for this email.');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageIcon>
        <CreditCard size={48} />
      </PageIcon>

      <h1 className={styles.ManageSubscription__Title}>
        Manage Subscription
      </h1>

      <p className={styles.ManageSubscription__Subtitle}>
        Enter the email address associated with your Zush PRO subscription to
        manage your billing, update payment methods, or cancel your
        subscription.
      </p>

      <form onSubmit={handleSubmit} className={styles.ManageSubscription__Form}>
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={isLoading}
        />

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? (
            'Loading...'
          ) : (
            <>
              Open Customer Portal
              <ExternalLink size={16} />
            </>
          )}
        </Button>
      </form>

      <ErrorMessage message={error} variant="box" />

      <div className={styles.ManageSubscription__Actions}>
        <div className={styles.ManageSubscription__Info}>
          <p>
            <strong>Note:</strong> This is only for active subscriptions.
          </p>
        </div>

        <BackToHome />
      </div>
    </PageLayout>
  );
};

export default ManageSubscription;
