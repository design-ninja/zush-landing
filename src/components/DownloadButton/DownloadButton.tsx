import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AppleIcon from '@/components/AppleIcon';
import AppStoreIcon from '@/components/AppStoreIcon';
import WindowsIcon from '@/components/WindowsIcon';
import MicrosoftStoreIcon from '@/components/MicrosoftStoreIcon';
import { APP_STORE_PROTOCOL_URL, APP_STORE_URL, WINDOWS_STORE_PROTOCOL_URL, WINDOWS_STORE_URL } from '@/constants';
import { useOS } from '@/hooks/useOS';
import { useIsMobile } from '@/hooks/useIsMobile';
import { getPreferredStoreHref, handleStoreLinkClick } from '@/utils/storeLinks';
import {
  type DownloadOS,
  type DownloadSource,
  getDownloadUrl,
  getOSLabel,
  getOtherOS,
  trackDownloadClick,
} from '@/utils/download';
import styles from './DownloadButton.module.scss';

const MobileDownloadModal = lazy(() => import('@/components/MobileDownloadModal'));

type Variant = 'black' | 'primary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface DownloadButtonProps {
  source: DownloadSource;
  variant?: Variant;
  size?: Size;
  label?: string;
  className?: string;
  useMobileModal?: boolean;
  forceOS?: DownloadOS;
  showDropdown?: boolean;
}

const OS_STORE_LABEL: Record<DownloadOS, string> = {
  mac: 'Direct .dmg download',
  windows: 'Microsoft Store',
};

const DownloadButton = ({
  source,
  variant = 'black',
  size = 'md',
  label = 'Download',
  className,
  useMobileModal = true,
  forceOS,
  showDropdown = true,
}: DownloadButtonProps) => {
  const { downloadOS: detectedOS, manual: detectedManual } = useOS();
  const downloadOS = forceOS ?? detectedOS;
  const manual = forceOS ? true : detectedManual;
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoadedModal, setHasLoadedModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const downloadUrl = getDownloadUrl(downloadOS);
  const primaryHref = getPreferredStoreHref({
    os: 'windows',
    runtimeOS: detectedOS,
    appUrl: WINDOWS_STORE_PROTOCOL_URL,
    webUrl: downloadUrl,
  });
  const appStoreHref = getPreferredStoreHref({
    os: 'mac',
    runtimeOS: detectedOS,
    appUrl: APP_STORE_PROTOCOL_URL,
    webUrl: APP_STORE_URL,
  });
  const DownloadIcon = downloadOS === 'windows' ? WindowsIcon : AppleIcon;
  const otherOS = getOtherOS(downloadOS);
  const OtherMenuIcon = otherOS === 'windows' ? MicrosoftStoreIcon : AppleIcon;

  useEffect(() => {
    if (!showDropdown) return;
    if (!isOpen) return;
    const handleClickAway = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, showDropdown]);

  const handlePrimaryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackDownloadClick({ os: downloadOS, source, manual });
    if (useMobileModal && isMobile) {
      event.preventDefault();
      setHasLoadedModal(true);
      setIsModalOpen(true);
      return;
    }

    if (downloadOS === 'windows') {
      handleStoreLinkClick(event, {
        os: 'windows',
        appUrl: WINDOWS_STORE_PROTOCOL_URL,
        webUrl: WINDOWS_STORE_URL,
      });
    }
  };

  const handleOtherClick = () => {
    trackDownloadClick({ os: otherOS, source, manual: true });
    setIsOpen(false);
  };

  const handleAppStoreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    trackDownloadClick({ os: 'mac', source, manual: true, channel: 'mac-app-store' });
    handleStoreLinkClick(event, {
      os: 'mac',
      appUrl: APP_STORE_PROTOCOL_URL,
      webUrl: APP_STORE_URL,
    });
    setIsOpen(false);
  };

  const otherUrl = getDownloadUrl(otherOS);
  const renderOtherOSMenuItem = () => (
    <a
      key='other-os'
      role='menuitem'
      className={styles.Menu__Item}
      href={otherUrl}
      target='_blank'
      rel='noopener noreferrer'
      onClick={handleOtherClick}
    >
      <span className={styles.Menu__Icon}>
        <OtherMenuIcon />
      </span>
      <span className={styles.Menu__Text}>
        <span className={styles.Menu__Title}>
          {otherOS === 'windows' ? 'Windows (x64/arm64)' : `Download for ${getOSLabel(otherOS)}`}
        </span>
        <span className={styles.Menu__Hint}>{OS_STORE_LABEL[otherOS]}</span>
      </span>
    </a>
  );
  const renderAppStoreMenuItem = () => (
    <a
      key='app-store'
      role='menuitem'
      className={styles.Menu__Item}
      href={appStoreHref}
      target='_blank'
      rel='noopener noreferrer'
      data-store-os='mac'
      data-store-app-url={APP_STORE_PROTOCOL_URL}
      data-store-web-url={APP_STORE_URL}
      onClick={handleAppStoreClick}
    >
      <span className={`${styles.Menu__Icon} ${styles.Menu__Icon_appStore}`}>
        <AppStoreIcon />
      </span>
      <span className={styles.Menu__Text}>
        <span className={styles.Menu__Title}>Mac App Store</span>
        <span className={styles.Menu__Hint}>Install via App Store</span>
      </span>
    </a>
  );
  const menuItems = downloadOS === 'windows'
    ? [renderOtherOSMenuItem(), renderAppStoreMenuItem()]
    : [renderAppStoreMenuItem(), renderOtherOSMenuItem()];

  return (
    <div
      ref={wrapRef}
      className={[
        styles.Group,
        styles[`Group_${variant}`],
        styles[`Group_${size}`],
        !showDropdown ? styles.Group_single : '',
        isOpen ? styles.Group_open : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <a
        className={[styles.Main, !showDropdown ? styles.Main_single : ''].filter(Boolean).join(' ')}
        href={primaryHref}
        target='_blank'
        rel='noopener noreferrer'
        data-store-os={downloadOS === 'windows' ? 'windows' : undefined}
        data-store-app-url={downloadOS === 'windows' ? WINDOWS_STORE_PROTOCOL_URL : undefined}
        data-store-web-url={downloadOS === 'windows' ? WINDOWS_STORE_URL : undefined}
        onClick={handlePrimaryClick}
      >
        <DownloadIcon />
        <span>{label}</span>
      </a>
      {showDropdown && (
        <button
          type='button'
          className={styles.Toggle}
          aria-label={`Show download options for ${getOSLabel(otherOS)}`}
          aria-haspopup='menu'
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ChevronDown size={18} className={isOpen ? styles.Toggle__Icon_open : styles.Toggle__Icon} />
        </button>
      )}

      {showDropdown && isOpen && (
        <div role='menu' className={styles.Menu}>
          {menuItems}
        </div>
      )}

      {hasLoadedModal && (
        <Suspense fallback={null}>
          <MobileDownloadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default DownloadButton;
