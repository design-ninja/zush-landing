import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AppleIcon from '@/components/AppleIcon';
import AppStoreIcon from '@/components/AppStoreIcon';
import WindowsIcon from '@/components/WindowsIcon';
import { APP_STORE_PROTOCOL_URL, APP_STORE_URL, WINDOWS_STORE_PROTOCOL_URL, WINDOWS_STORE_URL } from '@/constants';
import { useOS } from '@/hooks/useOS';
import { useIsMobile } from '@/hooks/useIsMobile';
import { getPreferredStoreHref, handleStoreLinkClick } from '@/utils/storeLinks';
import type { DownloadMenuCopy } from '@/i18n/copy';
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
  menuCopy?: DownloadMenuCopy;
  onPrimaryClick?: (event: { os: DownloadOS; source: DownloadSource }) => void;
}

const DEFAULT_MENU_COPY: DownloadMenuCopy = {
  downloadForMac: 'Download for Mac',
  windowsTitle: 'Windows (x64/arm64)',
  macDirectHint: 'Direct .dmg download',
  windowsHint: 'Microsoft Store',
  appStoreTitle: 'Mac App Store',
  appStoreHint: 'Install via App Store',
  showOptions: 'Show download options for {os}',
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
  menuCopy = DEFAULT_MENU_COPY,
  onPrimaryClick,
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
  const primaryHref = downloadOS === 'windows'
    ? getPreferredStoreHref({
        os: 'windows',
        runtimeOS: detectedOS,
        appUrl: WINDOWS_STORE_PROTOCOL_URL,
        webUrl: WINDOWS_STORE_URL,
      })
    : downloadUrl;
  const appStoreHref = getPreferredStoreHref({
    os: 'mac',
    runtimeOS: detectedOS,
    appUrl: APP_STORE_PROTOCOL_URL,
    webUrl: APP_STORE_URL,
  });
  const otherOS = getOtherOS(downloadOS);
  const otherOSLabel = getOSLabel(otherOS);

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
    onPrimaryClick?.({ os: downloadOS, source });
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
        {otherOS === 'windows' ? <WindowsIcon colored /> : <AppleIcon />}
      </span>
      <span className={styles.Menu__Text}>
        <span className={styles.Menu__Title}>
          {otherOS === 'windows' ? menuCopy.windowsTitle : menuCopy.downloadForMac}
        </span>
        <span className={styles.Menu__Hint}>
          {otherOS === 'windows' ? menuCopy.windowsHint : menuCopy.macDirectHint}
        </span>
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
        <span className={styles.Menu__Title}>{menuCopy.appStoreTitle}</span>
        <span className={styles.Menu__Hint}>{menuCopy.appStoreHint}</span>
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
        {downloadOS === 'windows' ? <WindowsIcon colored /> : <AppleIcon />}
        <span>{label}</span>
      </a>
      {showDropdown && (
        <button
          type='button'
          className={styles.Toggle}
          aria-label={menuCopy.showOptions.replace('{os}', otherOSLabel)}
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
