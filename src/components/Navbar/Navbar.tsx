import { Sun, Moon } from 'lucide-react';
import Logo from '../Logo';
import Button from '../Button';
import AppleIcon from '../AppleIcon';
import WindowsIcon from '../WindowsIcon';
import AppLink from '@/components/AppLink';
import { useOS } from '@/hooks/useOS';
import { getDownloadUrl, trackDownloadClick, type DownloadOS } from '@/utils/download';
import styles from './Navbar.module.scss';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  forceOS?: DownloadOS;
  basePath?: string;
}

const Navbar = ({ theme, toggleTheme, forceOS, basePath = '/' }: NavbarProps) => {
  const { downloadOS: detectedOS, manual: detectedManual } = useOS();
  const downloadOS = forceOS ?? detectedOS;
  const manual = forceOS ? true : detectedManual;
  const downloadUrl = getDownloadUrl(downloadOS);
  const DownloadIcon = downloadOS === 'windows' ? WindowsIcon : AppleIcon;
  const shouldOpenDownloadInNewTab = downloadOS === 'windows';
  const featuresHref = `${basePath}#features`;
  const pricingHref = `${basePath}#pricing`;

  return (
    <nav className={styles.Navbar}>
      <div className={styles.Navbar__Container}>
        <Logo />
        <div className={styles.Navbar__Actions}>
          <AppLink href={featuresHref} className={styles.Navbar__Link}>Features</AppLink>
          <AppLink href={pricingHref} className={styles.Navbar__Link}>Pricing</AppLink>
          <AppLink href="/blog" className={styles.Navbar__Link}>Blog</AppLink>
          <button onClick={toggleTheme} className={styles.Navbar__ThemeToggle} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className={styles.Navbar__Buttons}>
            <Button as="link" href={pricingHref} variant="ghost" size="sm" className={styles.Navbar__BuyBtn}>
              Buy PRO
            </Button>
            <Button
              as="a"
              href={downloadUrl}
              target={shouldOpenDownloadInNewTab ? '_blank' : undefined}
              rel={shouldOpenDownloadInNewTab ? 'noopener noreferrer' : undefined}
              variant="black"
              size="sm"
              className={styles.Navbar__DownloadBtn}
              onClick={() => trackDownloadClick({ os: downloadOS, source: 'navbar', manual })}
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

export default Navbar;
