import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Link2, Monitor, Share } from 'lucide-react';
import AppleIcon from '../AppleIcon';
import WindowsIcon from '../WindowsIcon';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import {
  DOWNLOAD_URL,
  MIN_MACOS_VERSION,
  MIN_WINDOWS_VERSION,
  WINDOWS_STORE_PROTOCOL_URL,
  WINDOWS_STORE_URL,
} from '@/constants';
import { useOS } from '@/hooks/useOS';
import { trackAnalyticsEvent } from '@/utils/analytics';
import { getPreferredStoreHref, handleStoreLinkClick } from '@/utils/storeLinks';
import styles from './MobileDownloadModal.module.scss';

interface MobileDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLOSE_ANIMATION_MS = 200;
const HANDOFF_CONFIRMATION_MS = 2500;

// Where the visitor should land on their computer: this page, so the article
// or feature page that convinced them is what reopens, not a generic home.
const handoffUrl = () => (typeof window === 'undefined' ? DOWNLOAD_URL : window.location.href);

const MobileDownloadModal = ({ isOpen, onClose }: MobileDownloadModalProps) => {
  const { os } = useOS();
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [handoff, setHandoff] = useState<'idle' | 'shared' | 'copied' | 'failed'>('idle');
  const [canShare, setCanShare] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const handoffTimerRef = useRef<number | null>(null);

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

  // navigator.share exists only in a secure context, and mostly on phones.
  // Resolved after mount so the server-rendered markup stays identical.
  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  useEffect(() => () => {
    if (handoffTimerRef.current) {
      window.clearTimeout(handoffTimerRef.current);
    }
  }, []);

  const confirmHandoff = (result: 'shared' | 'copied' | 'failed') => {
    setHandoff(result);
    if (handoffTimerRef.current) {
      window.clearTimeout(handoffTimerRef.current);
    }
    handoffTimerRef.current = window.setTimeout(() => setHandoff('idle'), HANDOFF_CONFIRMATION_MS);
  };

  const handleHandoff = async () => {
    const url = handoffUrl();

    if (canShare) {
      try {
        await navigator.share({ title: 'Zush — AI file renamer for Mac and Windows', url });
        trackAnalyticsEvent('mobile_handoff', { method: 'share', result: 'shared', url });
        confirmHandoff('shared');
        return;
      } catch (error) {
        // Dismissing the share sheet is a normal choice, not a failure to fall back from.
        if (error instanceof Error && error.name === 'AbortError') {
          trackAnalyticsEvent('mobile_handoff', { method: 'share', result: 'dismissed', url });
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      trackAnalyticsEvent('mobile_handoff', { method: 'copy', result: 'copied', url });
      confirmHandoff('copied');
    } catch {
      // Clipboard is blocked outside a secure context and in some in-app browsers.
      trackAnalyticsEvent('mobile_handoff', { method: 'copy', result: 'failed', url });
      confirmHandoff('failed');
    }
  };

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
  const windowsStoreHref = getPreferredStoreHref({
    os: 'windows',
    runtimeOS: os,
    appUrl: WINDOWS_STORE_PROTOCOL_URL,
    webUrl: WINDOWS_STORE_URL,
  });

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
          Zush is a desktop app for Mac and Windows. Send this page to your computer, or open it there later.
        </Text>

        <button
          type='button'
          className={styles.MobileDownloadModal__Handoff}
          onClick={handleHandoff}
          data-handoff-state={handoff}
        >
          <span className={styles.MobileDownloadModal__OptionIcon}>
            {handoff === 'shared' || handoff === 'copied' ? (
              <Check size={20} />
            ) : canShare ? (
              <Share size={20} />
            ) : (
              <Link2 size={20} />
            )}
          </span>
          <span className={styles.MobileDownloadModal__OptionText}>
            <span className={styles.MobileDownloadModal__OptionTitle}>
              {handoff === 'shared' && 'Link sent'}
              {handoff === 'copied' && 'Link copied'}
              {handoff === 'failed' && 'Copy the link below'}
              {handoff === 'idle' && (canShare ? 'Send the link to my computer' : 'Copy the link for later')}
            </span>
            <span className={styles.MobileDownloadModal__OptionHint}>
              {handoff === 'failed'
                ? 'Copying was blocked in this browser'
                : 'Mail it to yourself, or paste it on your Mac or PC'}
            </span>
          </span>
        </button>

        {handoff === 'failed' && (
          <input
            className={styles.MobileDownloadModal__Url}
            readOnly
            value={handoffUrl()}
            onFocus={(event) => event.currentTarget.select()}
            aria-label='Page link to copy'
          />
        )}

        <div className={styles.MobileDownloadModal__Options}>
          <a
            className={styles.MobileDownloadModal__Option}
            href={DOWNLOAD_URL}
            data-download-os='mac'
            data-download-source='mobile-modal'
            data-download-channel='direct'
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
            href={windowsStoreHref}
            target='_blank'
            rel='noopener noreferrer'
            data-store-os='windows'
            data-store-app-url={WINDOWS_STORE_PROTOCOL_URL}
            data-store-web-url={WINDOWS_STORE_URL}
            data-download-os='windows'
            data-download-source='mobile-modal'
            data-download-channel='microsoft-store'
            onClick={(event) => {
              handleStoreLinkClick(event, {
                os: 'windows',
                appUrl: WINDOWS_STORE_PROTOCOL_URL,
                webUrl: WINDOWS_STORE_URL,
              });
            }}
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
