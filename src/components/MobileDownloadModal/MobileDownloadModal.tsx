import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Monitor } from 'lucide-react';
import AppleIcon from '../AppleIcon';
import { MIN_MACOS_VERSION } from '@/constants';
import styles from './MobileDownloadModal.module.scss';

interface MobileDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLOSE_ANIMATION_MS = 220;

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
