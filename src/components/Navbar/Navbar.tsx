import { Sun, Moon } from 'lucide-react';
import Logo from '../Logo';
import Button from '../Button';
import { DOWNLOAD_URL } from '@/constants';
import styles from './Navbar.module.scss';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.Navbar__Container}>
        <Logo />
        <div className={styles.Navbar__Actions}>
          <a href="/#features" className={styles.Navbar__Link}>Features</a>
          <a href="/#pricing" className={styles.Navbar__Link}>Pricing</a>
          <a href="/#faq" className={styles.Navbar__Link}>FAQ</a>
          <button onClick={toggleTheme} className={styles.Navbar__ThemeToggle} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <div className={styles.Navbar__Buttons}>
            <Button as="a" href="/#pro" variant="ghost" size="sm" className={styles.Navbar__BuyBtn}>
              Buy PRO 
            </Button>
            <Button 
              as="a" 
              href={DOWNLOAD_URL} 
              variant="black"
              size="sm"
              className={styles.Navbar__DownloadBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              Download
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
