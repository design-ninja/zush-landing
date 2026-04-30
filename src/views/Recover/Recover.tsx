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
import { DEFAULT_LOCALE, getLocalizedPath, type Locale } from '@/i18n/config';
import { getServicePageCopy, type RecoverCopy } from '@/i18n/servicePages';
import styles from './Recover.module.scss';

interface RecoverProps {
  locale?: Locale;
  copy?: RecoverCopy;
  backToHomeLabel?: string;
  homeHref?: string;
  emailPlaceholder?: string;
  emailRequired?: string;
  genericError?: string;
  connectionError?: string;
}

const defaultServiceCopy = getServicePageCopy(DEFAULT_LOCALE);

const Recover = ({
  locale = DEFAULT_LOCALE,
  copy = defaultServiceCopy.recover,
  backToHomeLabel = defaultServiceCopy.backToHome,
  homeHref,
  emailPlaceholder = defaultServiceCopy.emailPlaceholder,
  emailRequired = defaultServiceCopy.emailRequired,
  genericError = defaultServiceCopy.genericError,
  connectionError = defaultServiceCopy.connectionError,
}: RecoverProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const resolvedHomeHref = homeHref ?? getLocalizedPath('/', locale);
  const { email, error, handleSubmit, isLoading, setEmail } =
    useEmailSubmission({
      endpoint: 'send-magic-link',
      onSuccess: () => setIsSuccess(true),
      messages: { emailRequired, genericError, connectionError },
    });

  if (isSuccess) {
    return (
      <PageLayout>
        <PageIcon>
          <CheckCircle size={64} />
        </PageIcon>

        <Heading as='h1' className={styles.Recover__Title}>{copy.successTitle}</Heading>

        <Text as='p' className={styles.Recover__Subtitle} color='subtle'>
          {copy.successTextBeforeEmail} <strong>{email}</strong> {copy.successTextAfterEmail}
          <br />
        </Text>

        <BackToHome href={resolvedHomeHref} label={backToHomeLabel} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageIcon>
        <Mail size={48} />
      </PageIcon>

      <Heading as='h1' className={styles.Recover__Title}>{copy.title}</Heading>

      <Text as='p' className={styles.Recover__Subtitle} color='subtle'>
        {copy.subtitle}
      </Text>

      <form onSubmit={handleSubmit} className={styles.Recover__Form}>
        <FormInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={emailPlaceholder}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? copy.sending : copy.send}
        </Button>
      </form>

      <ErrorMessage message={error} />

      <BackToHome href={resolvedHomeHref} label={backToHomeLabel} />
    </PageLayout>
  );
};

export default Recover;
