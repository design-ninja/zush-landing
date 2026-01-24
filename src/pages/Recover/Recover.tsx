import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import FormInput from '@/components/FormInput';
import ErrorMessage from '@/components/ErrorMessage';
import { SUPABASE_URL } from '@/utils/supabase';
import styles from './Recover.module.scss';

const Recover = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      const response = await fetch(`${SUPABASE_URL}/functions/v1/send-magic-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <PageLayout>
        <PageIcon>
          <CheckCircle size={64} />
        </PageIcon>

        <h1 className={styles.Recover__Title}>Check your inbox!</h1>

        <p className={styles.Recover__Subtitle}>
          If a purchase exists for <strong>{email}</strong>, we've sent an activation link.
          <br />
          Check your spam folder if you don't see it.
        </p>

        <BackToHome />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageIcon>
        <Mail size={48} />
      </PageIcon>

      <h1 className={styles.Recover__Title}>Request Activation Link</h1>

      <p className={styles.Recover__Subtitle}>
        Enter the email address you used when purchasing Zush PRO.
        We'll send you a new activation link.
      </p>

      <form onSubmit={handleSubmit} className={styles.Recover__Form}>
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Activation Link'}
        </Button>
      </form>

      <ErrorMessage message={error} />

      <BackToHome />
    </PageLayout>
  );
};

export default Recover;
