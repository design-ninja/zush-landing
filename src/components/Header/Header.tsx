import { Sun, Moon } from 'lucide-react';
import Logo from '../Logo';
import Button from '../Button';
import AppleIcon from '../AppleIcon';
import WindowsIcon from '../WindowsIcon';
import AppLink from '@/components/AppLink';
import { WINDOWS_STORE_PROTOCOL_URL, WINDOWS_STORE_URL } from '@/constants';
import { useOS } from '@/hooks/useOS';
import { getDownloadUrl, trackDownloadClick, type DownloadOS } from '@/utils/download';
import { getPreferredStoreHref, handleStoreLinkClick } from '@/utils/storeLinks';
import styles from './Header.module.scss';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
  forceOS?: DownloadOS;
  basePath?: string;
}

const Header = ({ theme, toggleTheme, forceOS, basePath = '/' }: HeaderProps) => {
  const { downloadOS: detectedOS, manual: detectedManual } = useOS();
  const downloadOS = forceOS ?? detectedOS;
  const manual = forceOS ? true : detectedManual;
  const downloadUrl = getDownloadUrl(downloadOS);
  const primaryHref = getPreferredStoreHref({
    os: 'windows',
    runtimeOS: detectedOS,
    appUrl: WINDOWS_STORE_PROTOCOL_URL,
    webUrl: downloadUrl,
  });
  const DownloadIcon = downloadOS === 'windows' ? WindowsIcon : AppleIcon;
  const shouldOpenDownloadInNewTab = downloadOS === 'windows';
  const featuresHref = `${basePath}#features`;
  const pricingHref = `${basePath}#pricing`;

  return (
    <nav className={styles.Header}>
      <div className={styles.Header__Container}>
        <Logo />
        <div className={styles.Header__Actions}>
          <AppLink href={featuresHref} className={styles.Header__Link}>Features</AppLink>
          <AppLink href={pricingHref} className={styles.Header__Link}>Pricing</AppLink>
          <AppLink href="/blog" className={styles.Header__Link}>Blog</AppLink>
          <button onClick={toggleTheme} className={styles.Header__ThemeToggle} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className={styles.Header__Buttons}>
            <Button as="link" href={pricingHref} variant="ghost" size="sm" className={styles.Header__BuyBtn}>
              Buy PRO
            </Button>
            <Button
              as="a"
              href={primaryHref}
              target={shouldOpenDownloadInNewTab ? '_blank' : undefined}
              rel={shouldOpenDownloadInNewTab ? 'noopener noreferrer' : undefined}
              variant="black"
              size="sm"
              className={styles.Header__DownloadBtn}
              onClick={(event) => {
                trackDownloadClick({ os: downloadOS, source: 'navbar', manual });

                if (downloadOS === 'windows') {
                  handleStoreLinkClick(event, {
                    os: 'windows',
                    appUrl: WINDOWS_STORE_PROTOCOL_URL,
                    webUrl: WINDOWS_STORE_URL,
                  });
                }
              }}
            >
              <DownloadIcon />
              Download
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
