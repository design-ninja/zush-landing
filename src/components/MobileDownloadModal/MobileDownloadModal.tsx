import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, X } from 'lucide-react';
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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.MobileDownloadModal__Overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.MobileDownloadModal__Content}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.MobileDownloadModal__CloseButton}
              onClick={onClose}
              aria-label='Close modal'
            >
              <X size={20} />
            </button>

            <div className={styles.MobileDownloadModal__Icon}>
              <Monitor size={32} />
            </div>

            <h2 className={styles.MobileDownloadModal__Title}>
              Desktop Only
            </h2>

            <p className={styles.MobileDownloadModal__Description}>
              Zush is a macOS app designed for desktop use. Visit this page on your Mac to download.
            </p>

            <div className={styles.MobileDownloadModal__Badge}>
              <AppleIcon />
              macOS {MIN_MACOS_VERSION}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileDownloadModal;
