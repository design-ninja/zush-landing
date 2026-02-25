import Heading from '../Heading';
import Text from '../Text';
import AppLink from '@/components/AppLink';
import { SUPPORT_EMAIL } from '@/constants';
import styles from './Footer.module.scss';

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ProductHuntIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 0 0 0-3.6zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804a4.2 4.2 0 0 1 0 8.4z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__Container}>
        <div className={styles.Footer__Grid}>
          <div>
            <AppLink href="/" className={styles.Footer__Brand}>Zush</AppLink>
            <Text color="subtle" className={styles.Footer__Description}>
              The ultimate AI-powered image organization utility for macOS
            </Text>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>Product</Heading>
            <ul className={styles.Footer__Links}>
              <li><AppLink href="/#features" className={styles.Footer__Link}>Features</AppLink></li>
              <li><AppLink href="/#pricing" className={styles.Footer__Link}>Pricing</AppLink></li>
              <li><AppLink href="/changelog" className={styles.Footer__Link}>Changelog</AppLink></li>
            </ul>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>Legal</Heading>
            <ul className={styles.Footer__Links}>
              <li><AppLink href="/terms-of-service" className={styles.Footer__Link}>Terms of Service</AppLink></li>
              <li><AppLink href="/privacy-policy" className={styles.Footer__Link}>Privacy Policy</AppLink></li>
              <li><AppLink href="/refund-policy" className={styles.Footer__Link}>Refund Policy</AppLink></li>
            </ul>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>Support</Heading>
            <ul className={styles.Footer__Links}>
              <li><AppLink href={`mailto:${SUPPORT_EMAIL}`} className={styles.Footer__Link}>Contact Support</AppLink></li>
              <li><AppLink href="/byok-setup" className={styles.Footer__Link}>BYOK Setup Guide</AppLink></li>
              <li>
                <AppLink
                  href="https://zush.canny.io"
                  className={styles.Footer__Link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Features & Bug Reports
                </AppLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.Footer__Bottom}>
          <Text color="subtle">© {new Date().getFullYear()} Zush</Text>
          <div className={styles.Footer__Social}>
            <AppLink
              href="https://x.com/zush_app"
              className={styles.Footer__SocialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X"
            >
              <XIcon size={24} />
            </AppLink>
            <AppLink
              href="https://www.youtube.com/@zushapp"
              className={styles.Footer__SocialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on YouTube"
            >
              <YouTubeIcon size={24} />
            </AppLink>
            <AppLink
              href="https://www.producthunt.com/products/zush"
              className={styles.Footer__SocialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zush on Product Hunt"
            >
              <ProductHuntIcon size={24} />
            </AppLink>
          </div>
          <div className={styles.Footer__BottomLinks}>
            <Text color="subtle">
              Designed by <AppLink href="https://lirik.pro/en" target="_blank" rel="noopener noreferrer">lirik</AppLink> with 💚
            </Text>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
