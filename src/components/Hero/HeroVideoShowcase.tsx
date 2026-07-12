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
  const [theme, setTheme] = useState<ShowcaseTheme | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const activeSource = theme ? media.sources[theme] : undefined;
  const activePoster = theme ? media.posters[theme] : undefined;
  const activeDimensions = theme ? (media.dimensions?.[theme] ?? media) : media;
  const lightDimensions = media.dimensions?.light ?? media;
  const darkDimensions = media.dimensions?.dark ?? media;
  const frameStyle = {
    '--hero-video-aspect-ratio-light': `${lightDimensions.width} / ${lightDimensions.height}`,
    '--hero-video-aspect-ratio-dark': `${darkDimensions.width} / ${darkDimensions.height}`,
    '--hero-video-poster-light': `url("${media.posters.light}")`,
    '--hero-video-poster-dark': `url("${media.posters.dark}")`,
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
    if (!video || !activeSource || !activePoster) {
      return;
    }

    setIsVideoReady(false);
    video.poster = activePoster;

    if (video.currentSrc.endsWith(activeSource)) {
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setIsVideoReady(true);
      }
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
        data-ready={isVideoReady && !prefersReducedMotion}
        data-showcase-theme={theme ?? undefined}
        disablePictureInPicture
        height={activeDimensions.height}
        loop
        muted
        onCanPlay={() => setIsVideoReady(true)}
        onEnded={handleVideoEnded}
        playsInline
        poster={activePoster}
        preload="metadata"
        src={activeSource}
        width={activeDimensions.width}
      />
      <figcaption className={styles.Hero__VideoCaption}>
        {media.description}
      </figcaption>
    </figure>
  );
};

export default HeroVideoShowcase;
