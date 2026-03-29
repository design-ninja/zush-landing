import { useState } from 'react';
import Button from '@/components/Button';
import AppleIcon from '@/components/AppleIcon';
import MobileDownloadModal from '@/components/MobileDownloadModal';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { DOWNLOAD_URL } from '@/constants';
import styles from './DownloadCTA.module.scss';

const isMobile = () =>
  typeof window !== 'undefined' && /iPhone|iPad|Android/i.test(navigator.userAgent);

interface DownloadCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const DownloadCTA = ({
  title = 'Try Zush free on your Mac',
  subtitle = 'AI-powered file renaming with custom prompts, folder monitoring, and one-click revert.',
  className,
}: DownloadCTAProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    if (isMobile()) {
      setShowModal(true);
    } else {
      window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className={[styles.Section, className].filter(Boolean).join(' ')}>
      <div className={styles.Container}>
        <div className={styles.Card}>
          <Heading as='h2' className={styles.Title}>{title}</Heading>
          <Text as='p' className={styles.Subtitle} color='subtle'>{subtitle}</Text>
          <div className={styles.Buttons}>
            <Button variant='black' size='lg' onClick={handleDownload}>
              <AppleIcon />
              Download
            </Button>
          </div>
          <Text as='p' size='xs' color='subtle' className={styles.Hint}>Free · No credit card required · macOS Sonoma+</Text>
        </div>
      </div>
      <MobileDownloadModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
};

export default DownloadCTA;
