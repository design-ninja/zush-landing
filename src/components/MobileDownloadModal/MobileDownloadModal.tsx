import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Monitor } from 'lucide-react';
import AppleIcon from '../AppleIcon';
import WindowsIcon from '../WindowsIcon';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import { DOWNLOAD_URL, MIN_MACOS_VERSION, MIN_WINDOWS_VERSION, WINDOWS_STORE_URL } from '@/constants';
import { trackDownloadClick } from '@/utils/download';
import styles from './MobileDownloadModal.module.scss';

interface MobileDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLOSE_ANIMATION_MS = 200;

const MobileDownloadModal = ({ isOpen, onClose }: MobileDownloadModalProps) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
      return;
    }

    if (!isRendered) {
      return;
    }

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsRendered(false);
      setIsClosing(false);
    }, CLOSE_ANIMATION_MS);

    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isOpen, isRendered]);

  useEffect(() => {
    if (isRendered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isRendered]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isRendered) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isRendered, onClose]);

  if (!isRendered) {
    return null;
  }

  const overlayClassName = `${styles.MobileDownloadModal__Overlay} ${
    isClosing
      ? styles.MobileDownloadModal__Overlay_exit
      : styles.MobileDownloadModal__Overlay_enter
  }`;
  const contentClassName = `${styles.MobileDownloadModal__Content} ${
    isClosing
      ? styles.MobileDownloadModal__Content_exit
      : styles.MobileDownloadModal__Content_enter
  }`;

  return createPortal(
    <div
      className={overlayClassName}
      onClick={onClose}
      role='presentation'
    >
      <div
        className={contentClassName}
        onClick={(event) => event.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby='mobile-download-modal-title'
      >
        <div className={styles.MobileDownloadModal__Icon}>
          <Monitor size={32} />
        </div>

        <Heading as='h2' id='mobile-download-modal-title' className={styles.MobileDownloadModal__Title}>
          Desktop Only
        </Heading>

        <Text as='p' className={styles.MobileDownloadModal__Description} color='subtle'>
          Zush is a desktop app for Mac and Windows. Open this page on your computer to download.
        </Text>

        <div className={styles.MobileDownloadModal__Options}>
          <a
            className={styles.MobileDownloadModal__Option}
            href={DOWNLOAD_URL}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => trackDownloadClick({ os: 'mac', source: 'mobile-modal' })}
          >
            <span className={styles.MobileDownloadModal__OptionIcon}>
              <AppleIcon />
            </span>
            <span className={styles.MobileDownloadModal__OptionText}>
              <span className={styles.MobileDownloadModal__OptionTitle}>Download for Mac</span>
              <span className={styles.MobileDownloadModal__OptionHint}>macOS {MIN_MACOS_VERSION}</span>
            </span>
          </a>
          <a
            className={styles.MobileDownloadModal__Option}
            href={WINDOWS_STORE_URL}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => trackDownloadClick({ os: 'windows', source: 'mobile-modal' })}
          >
            <span className={styles.MobileDownloadModal__OptionIcon}>
              <WindowsIcon />
            </span>
            <span className={styles.MobileDownloadModal__OptionText}>
              <span className={styles.MobileDownloadModal__OptionTitle}>Get from Microsoft Store</span>
              <span className={styles.MobileDownloadModal__OptionHint}>{MIN_WINDOWS_VERSION}</span>
            </span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileDownloadModal;
