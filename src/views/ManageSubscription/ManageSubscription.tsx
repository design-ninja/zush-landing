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
import { DEFAULT_LOCALE, getLocalizedPath, type Locale } from '@/i18n/config';
import { getServicePageCopy, type ManageSubscriptionCopy } from '@/i18n/servicePages';
import styles from './ManageSubscription.module.scss';

interface ManageSubscriptionProps {
  locale?: Locale;
  copy?: ManageSubscriptionCopy;
  backToHomeLabel?: string;
  homeHref?: string;
  emailPlaceholder?: string;
  emailRequired?: string;
  genericError?: string;
  connectionError?: string;
}

const defaultServiceCopy = getServicePageCopy(DEFAULT_LOCALE);

const ManageSubscription = ({
  locale = DEFAULT_LOCALE,
  copy = defaultServiceCopy.manageSubscription,
  backToHomeLabel = defaultServiceCopy.backToHome,
  homeHref,
  emailPlaceholder = defaultServiceCopy.emailPlaceholder,
  emailRequired = defaultServiceCopy.emailRequired,
  genericError = defaultServiceCopy.genericError,
  connectionError = defaultServiceCopy.connectionError,
}: ManageSubscriptionProps) => {
  const [sent, setSent] = useState(false);
  const resolvedHomeHref = homeHref ?? getLocalizedPath('/', locale);
  const { email, error, handleSubmit, isLoading, setEmail } =
    useEmailSubmission({
      endpoint: 'send-customer-portal-link',
      onSubmitStart: () => setSent(false),
      onSuccess: () => setSent(true),
      messages: { emailRequired, genericError, connectionError },
      getErrorMessage: async (response) => {
        const data = await response.json();
        return data.error || genericError;
      },
    });

  return (
    <PageLayout>
      <PageIcon>
        <CreditCard size={48} />
      </PageIcon>

      <Heading as='h1' className={styles.ManageSubscription__Title}>
        {copy.title}
      </Heading>

      <Text as='p' className={styles.ManageSubscription__Subtitle} color='subtle'>
        {copy.subtitle}
      </Text>

      <form onSubmit={handleSubmit} className={styles.ManageSubscription__Form}>
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          disabled={isLoading}
        />

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? (
            copy.sending
          ) : (
            <>
              {copy.send}
              <Mail size={16} />
            </>
          )}
        </Button>
      </form>

      {sent && (
        <div className={styles.ManageSubscription__Success}>
          <Text as='p' size='sm'>
            {copy.success}
          </Text>
        </div>
      )}

      <ErrorMessage message={error} variant="box" />

      <div className={styles.ManageSubscription__Actions}>
        <div className={styles.ManageSubscription__Info}>
          <Text as='p' size='sm' color='subtle'>
            <strong>{copy.noteLabel}</strong> {copy.noteText}
          </Text>
        </div>

        <BackToHome href={resolvedHomeHref} label={backToHomeLabel} />
      </div>
    </PageLayout>
  );
};

export default ManageSubscription;
