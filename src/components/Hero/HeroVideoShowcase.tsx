import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { HeroVideoShowcaseAsset, ShowcaseTheme } from '@/data/showcaseMedia';
import styles from './Hero.module.scss';

interface HeroVideoShowcaseProps {
  media: HeroVideoShowcaseAsset;
}

const getDocumentTheme = (): ShowcaseTheme => {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
};

const HeroVideoShowcase = ({ media }: HeroVideoShowcaseProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [theme, setTheme] = useState<ShowcaseTheme>('light');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activeSource = media.sources[theme];
  const activePoster = media.posters[theme];
  const frameStyle = {
    '--hero-video-aspect-ratio': `${media.width} / ${media.height}`,
  } as CSSProperties;

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setTheme(getDocumentTheme());

    syncTheme();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'data-theme')) {
        syncTheme();
      }
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setPrefersReducedMotion(motionQuery.matches);

    syncMotion();
    motionQuery.addEventListener('change', syncMotion);

    return () => motionQuery.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.poster = activePoster;

    if (video.currentSrc.endsWith(activeSource)) {
      return;
    }

    video.src = activeSource;
    video.load();

    if (!prefersReducedMotion) {
      void video.play().catch(() => {
        // Browsers can still deny autoplay in constrained environments.
      });
    }
  }, [activePoster, activeSource, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // Muted, inline video should autoplay; keeping the poster is the fallback.
    });
  }, [prefersReducedMotion]);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) {
      return;
    }

    video.currentTime = 0;
    void video.play().catch(() => {
      // Keep the poster if playback is blocked after a source/theme switch.
    });
  };

  return (
    <figure className={styles.Hero__VideoShowcase} data-frame={media.frame ?? 'mac'} style={frameStyle}>
      <video
        ref={videoRef}
        aria-label={media.title}
        autoPlay
        className={styles.Hero__Video}
        disablePictureInPicture
        height={media.height}
        loop
        muted
        onEnded={handleVideoEnded}
        playsInline
        poster={activePoster}
        preload="metadata"
        src={activeSource}
        width={media.width}
      />
      <figcaption className={styles.Hero__VideoCaption}>
        {media.description}
      </figcaption>
    </figure>
  );
};

export default HeroVideoShowcase;
