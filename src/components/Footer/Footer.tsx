import Heading from '../Heading';
import Text from '../Text';
import AppLink from '@/components/AppLink';
import AppStoreIcon from '@/components/AppStoreIcon';
import MicrosoftStoreIcon from '@/components/MicrosoftStoreIcon';
import {
  APP_STORE_PROTOCOL_URL,
  APP_STORE_URL,
  SUPPORT_EMAIL,
  WINDOWS_STORE_PROTOCOL_URL,
  WINDOWS_STORE_URL,
} from '@/constants';
import { useOS } from '@/hooks/useOS';
import { getPreferredStoreHref, handleStoreLinkClick } from '@/utils/storeLinks';
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
  const { os } = useOS();
  const appStoreHref = getPreferredStoreHref({
    os: 'mac',
    runtimeOS: os,
    appUrl: APP_STORE_PROTOCOL_URL,
    webUrl: APP_STORE_URL,
  });
  const windowsStoreHref = getPreferredStoreHref({
    os: 'windows',
    runtimeOS: os,
    appUrl: WINDOWS_STORE_PROTOCOL_URL,
    webUrl: WINDOWS_STORE_URL,
  });

  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__Container}>
        <div className={styles.Footer__Grid}>
          <div>
            <AppLink href="/" className={styles.Footer__Brand}>Zush</AppLink>
            <Text color="subtle" className={styles.Footer__Description}>
              AI file renamer for Mac and Windows — rename files with AI, automatically
            </Text>
            <div className={styles.Footer__StoreBadges}>
              <AppLink
                href={appStoreHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.Footer__AppStore}
                aria-label="Download Zush on the Mac App Store"
                data-store-os='mac'
                data-store-app-url={APP_STORE_PROTOCOL_URL}
                data-store-web-url={APP_STORE_URL}
                onClick={(event) =>
                  handleStoreLinkClick(event, {
                    os: 'mac',
                    appUrl: APP_STORE_PROTOCOL_URL,
                    webUrl: APP_STORE_URL,
                  })}
              >
                <span className={styles.Footer__StoreBadge}>
                  <span className={styles.Footer__StoreBadgeIcon}>
                    <AppStoreIcon />
                  </span>
                  <span className={styles.Footer__StoreBadgeText}>
                    <span className={styles.Footer__StoreBadgeKicker}>Download on the</span>
                    <span className={styles.Footer__StoreBadgeLabel}>Mac App Store</span>
                  </span>
                </span>
              </AppLink>
              <AppLink
                href={windowsStoreHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.Footer__MicrosoftStore}
                aria-label="Get Zush from the Microsoft Store"
                data-store-os='windows'
                data-store-app-url={WINDOWS_STORE_PROTOCOL_URL}
                data-store-web-url={WINDOWS_STORE_URL}
                onClick={(event) =>
                  handleStoreLinkClick(event, {
                    os: 'windows',
                    appUrl: WINDOWS_STORE_PROTOCOL_URL,
                    webUrl: WINDOWS_STORE_URL,
                  })}
              >
                <span className={styles.Footer__StoreBadge}>
                  <span className={styles.Footer__StoreBadgeIcon}>
                    <MicrosoftStoreIcon />
                  </span>
                  <span className={styles.Footer__StoreBadgeText}>
                    <span className={styles.Footer__StoreBadgeKicker}>Download from the</span>
                    <span className={styles.Footer__StoreBadgeLabel}>Microsoft Store</span>
                  </span>
                </span>
              </AppLink>
            </div>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>Product</Heading>
            <ul className={styles.Footer__Links}>
              <li><AppLink href="/ai-file-renamer" className={styles.Footer__Link}>AI File Renamer</AppLink></li>
              <li><AppLink href="/ai-image-renamer" className={styles.Footer__Link}>AI Image Renamer</AppLink></li>
              <li><AppLink href="/batch-rename-files" className={styles.Footer__Link}>Batch Rename Files</AppLink></li>
              <li><AppLink href="/auto-rename-files" className={styles.Footer__Link}>Auto Rename Files</AppLink></li>
            </ul>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>By File Type</Heading>
            <ul className={styles.Footer__Links}>
              <li><AppLink href="/rename-pdf-with-ai" className={styles.Footer__Link}>Rename PDFs</AppLink></li>
              <li><AppLink href="/rename-photos-with-ai" className={styles.Footer__Link}>Rename Photos</AppLink></li>
              <li><AppLink href="/rename-screenshots-with-ai" className={styles.Footer__Link}>Rename Screenshots</AppLink></li>
              <li><AppLink href="/rename-documents-with-ai" className={styles.Footer__Link}>Rename Documents</AppLink></li>
            </ul>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>Resources</Heading>
            <ul className={styles.Footer__Links}>
              <li><AppLink href="/mac" className={styles.Footer__Link}>Zush for Mac</AppLink></li>
              <li><AppLink href="/windows" className={styles.Footer__Link}>Zush for Windows</AppLink></li>
              <li><AppLink href="/#pricing" className={styles.Footer__Link}>Pricing</AppLink></li>
              <li><AppLink href="/blog" className={styles.Footer__Link}>Blog</AppLink></li>
              <li><AppLink href="/changelog" className={styles.Footer__Link}>Changelog</AppLink></li>
              <li><AppLink href="/methodology" className={styles.Footer__Link}>Methodology</AppLink></li>
              <li><AppLink href="/byok-setup" className={styles.Footer__Link}>BYOK Setup Guide</AppLink></li>
            </ul>
          </div>
          <div>
            <Heading as="h4" className={styles.Footer__SectionTitle}>Support</Heading>
            <ul className={styles.Footer__Links}>
              <li><AppLink href={`mailto:${SUPPORT_EMAIL}`} className={styles.Footer__Link}>Contact Support</AppLink></li>
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
              <li><AppLink href="/terms-of-service" className={styles.Footer__Link}>Terms of Service</AppLink></li>
              <li><AppLink href="/privacy-policy" className={styles.Footer__Link}>Privacy Policy</AppLink></li>
              <li><AppLink href="/refund-policy" className={styles.Footer__Link}>Refund Policy</AppLink></li>
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
              <span className={styles.Footer__VisuallyHidden}>Follow us on X</span>
            </AppLink>
            <AppLink
              href="https://www.youtube.com/@zushapp"
              className={styles.Footer__SocialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on YouTube"
            >
              <YouTubeIcon size={24} />
              <span className={styles.Footer__VisuallyHidden}>Follow us on YouTube</span>
            </AppLink>
            <AppLink
              href="https://www.producthunt.com/products/zush"
              className={styles.Footer__SocialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zush on Product Hunt"
            >
              <ProductHuntIcon size={24} />
              <span className={styles.Footer__VisuallyHidden}>Zush on Product Hunt</span>
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
