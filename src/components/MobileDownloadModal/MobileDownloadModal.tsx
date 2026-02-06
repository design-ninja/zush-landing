import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Monitor } from 'lucide-react';
import AppleIcon from '../AppleIcon';
import { MIN_MACOS_VERSION } from '@/constants';
import styles from './MobileDownloadModal.module.scss';

interface MobileDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDownloadModal = ({ isOpen, onClose }: MobileDownloadModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={styles.MobileDownloadModal__Overlay}
      onClick={onClose}
      role='presentation'
    >
      <div
        className={styles.MobileDownloadModal__Content}
        onClick={(event) => event.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby='mobile-download-modal-title'
      >
        <div className={styles.MobileDownloadModal__Icon}>
          <Monitor size={32} />
        </div>

        <h2 id='mobile-download-modal-title' className={styles.MobileDownloadModal__Title}>
          Desktop Only
        </h2>

        <p className={styles.MobileDownloadModal__Description}>
          Zush is a macOS app designed for desktop use. Visit this page on your Mac to download.
        </p>

        <div className={styles.MobileDownloadModal__Badge}>
          <AppleIcon />
          macOS {MIN_MACOS_VERSION}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileDownloadModal;
