import { useState } from 'react';
import { CreditCard, Mail } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import FormInput from '@/components/FormInput';
import ErrorMessage from '@/components/ErrorMessage';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { SUPABASE_URL } from '@/utils/supabase';
import styles from './ManageSubscription.module.scss';

const ManageSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setSent(false);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/send-customer-portal-link`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSent(true);
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

      <Heading as='h1' className={styles.ManageSubscription__Title}>
        Manage Subscription
      </Heading>

      <Text as='p' className={styles.ManageSubscription__Subtitle} color='subtle'>
        Enter the email address associated with your Zush PRO subscription.
        We will send a one-time link to manage billing, payment methods, or
        cancellation.
      </Text>

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
            'Sending...'
          ) : (
            <>
              Send Management Link
              <Mail size={16} />
            </>
          )}
        </Button>
      </form>

      {sent && (
        <div className={styles.ManageSubscription__Success}>
          <Text as='p' size='sm'>
            Check your email for a one-time subscription management link.
          </Text>
        </div>
      )}

      <ErrorMessage message={error} variant="box" />

      <div className={styles.ManageSubscription__Actions}>
        <div className={styles.ManageSubscription__Info}>
          <Text as='p' size='sm' color='subtle'>
            <strong>Note:</strong> For security, the link expires quickly and
            can only be used once.
          </Text>
        </div>

        <BackToHome />
      </div>
    </PageLayout>
  );
};

export default ManageSubscription;
