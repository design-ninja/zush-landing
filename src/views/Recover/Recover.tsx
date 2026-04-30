import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
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
import styles from './Recover.module.scss';

const Recover = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { email, error, handleSubmit, isLoading, setEmail } =
    useEmailSubmission({
      endpoint: 'send-magic-link',
      onSuccess: () => setIsSuccess(true),
    });

  if (isSuccess) {
    return (
      <PageLayout>
        <PageIcon>
          <CheckCircle size={64} />
        </PageIcon>

        <Heading as='h1' className={styles.Recover__Title}>Check your inbox!</Heading>

        <Text as='p' className={styles.Recover__Subtitle} color='subtle'>
          If a purchase exists for <strong>{email}</strong>, we've sent a one-time activation link.
          <br />
          Check your spam folder if you don't see it.
        </Text>

        <BackToHome />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageIcon>
        <Mail size={48} />
      </PageIcon>

      <Heading as='h1' className={styles.Recover__Title}>Request Activation Link</Heading>

      <Text as='p' className={styles.Recover__Subtitle} color='subtle'>
        Enter the email address you used when purchasing Zush PRO.
        We'll send you a new one-time activation link.
      </Text>

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
