import AppLink from '@/components/AppLink';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <AppLink href="/" className={styles.Logo}>
      <picture>
        <source
          type="image/webp"
          srcSet="/logo-80.webp 80w, /logo-96.webp 96w"
          sizes="(max-width: 768px) 40px, 48px"
        />
        <img
          src="/logo-96.png"
          srcSet="/logo-80.png 80w, /logo-96.png 96w"
          sizes="(max-width: 768px) 40px, 48px"
          width={48}
          height={48}
          alt="Zush Logo"
          className={styles.Logo__Icon}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <span className={styles.Logo__Text}>Zush</span>
    </AppLink>
  );
};

export default Logo;
