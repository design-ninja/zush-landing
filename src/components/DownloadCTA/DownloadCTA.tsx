import DownloadButton from '@/components/DownloadButton';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { useOS } from '@/hooks/useOS';
import { getShortRequirements } from '@/utils/download';
import styles from './DownloadCTA.module.scss';

interface DownloadCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const DownloadCTA = ({
  title,
  subtitle = 'AI-powered file renaming with custom prompts, folder monitoring, and one-click revert.',
  className,
}: DownloadCTAProps) => {
  const { downloadOS } = useOS();

  const resolvedTitle = title ?? 'Try Zush free';

  return (
    <section className={[styles.Section, className].filter(Boolean).join(' ')}>
      <div className={styles.Container}>
        <div className={styles.Card}>
          <Heading as='h2' className={styles.Title}>{resolvedTitle}</Heading>
          <Text as='p' className={styles.Subtitle} color='subtle'>{subtitle}</Text>
          <div className={styles.Buttons}>
            <DownloadButton source='download-cta' size='lg' />
          </div>
          <Text as='p' size='xs' color='subtle' className={styles.Hint}>
            Free · No credit card required · {getShortRequirements(downloadOS)}
          </Text>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
