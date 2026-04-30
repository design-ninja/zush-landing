import { useState } from 'react';
import { CreditCard, Mail } from 'lucide-react';
// fallow-ignore-next-line code-duplication
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import FormInput from '@/components/FormInput';
import ErrorMessage from '@/components/ErrorMessage';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { useEmailSubmission } from '@/hooks/useEmailSubmission';
import styles from './ManageSubscription.module.scss';

const ManageSubscription = () => {
  const [sent, setSent] = useState(false);
  const { email, error, handleSubmit, isLoading, setEmail } =
    useEmailSubmission({
      endpoint: 'send-customer-portal-link',
      onSubmitStart: () => setSent(false),
      onSuccess: () => setSent(true),
      getErrorMessage: async (response) => {
        const data = await response.json();
        return data.error || 'Something went wrong. Please try again.';
      },
    });

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
