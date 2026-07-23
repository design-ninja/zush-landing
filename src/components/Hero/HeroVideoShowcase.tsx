import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const activeSource = media.sources[theme];
  const activePoster = media.posters[theme];
  const activeDimensions = media.dimensions?.[theme] ?? media;
  const lightDimensions = media.dimensions?.light ?? media;
  const darkDimensions = media.dimensions?.dark ?? media;
  const frameStyle = {
    '--hero-video-aspect-ratio-light': `${lightDimensions.width} / ${lightDimensions.height}`,
    '--hero-video-aspect-ratio-dark': `${darkDimensions.width} / ${darkDimensions.height}`,
    '--hero-video-poster-light': `url("${media.posters.light}")`,
    '--hero-video-poster-dark': `url("${media.posters.dark}")`,
  } as CSSProperties;

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    setIsPlaying(true);
    void video.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

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

    setIsVideoReady(false);
    video.poster = activePoster;
    video.defaultMuted = true;
    video.muted = true;

    if (video.currentSrc.endsWith(activeSource)) {
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setIsVideoReady(true);
      }
    } else {
      video.src = activeSource;
      video.load();
    }

    if (!prefersReducedMotion) {
      playVideo();
    }
  }, [activePoster, activeSource, playVideo, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    playVideo();
  }, [playVideo, prefersReducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      playVideo();
      return;
    }

    video.pause();
  };

  const replayVideo = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.currentTime = 0;
    playVideo();
  };

  return (
    <figure className={styles.Hero__VideoShowcase} data-frame={media.frame ?? 'mac'} style={frameStyle}>
      <video
        ref={videoRef}
        aria-label={media.title}
        autoPlay
        className={styles.Hero__Video}
        data-ready={isVideoReady && !prefersReducedMotion}
        data-showcase-theme={theme}
        disablePictureInPicture
        height={activeDimensions.height}
        loop
        muted
        onCanPlay={() => setIsVideoReady(true)}
        onClick={togglePlayback}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        poster={activePoster}
        preload="metadata"
        src={activeSource}
        width={activeDimensions.width}
      />
      <div className={styles.Hero__VideoControls} aria-label='Video controls'>
        <button
          type='button'
          className={`${styles.Hero__VideoControl} ${styles.Hero__VideoControl_iconOnly}`}
          aria-label={isPlaying ? 'Pause demo' : 'Play demo'}
          title={isPlaying ? 'Pause' : 'Play'}
          onClick={togglePlayback}
        >
          {isPlaying ? (
            <span className={`${styles.Hero__VideoControlIcon} ${styles.Hero__VideoControlIcon_pause}`} aria-hidden='true' />
          ) : (
            <svg
              className={styles.Hero__VideoControlPlayIcon}
              aria-hidden='true'
              viewBox='0 0 10 12'
            >
              <path d='M1.35 0.82C0.67 0.4 0 0.88 0 1.67v8.66c0 0.79 0.67 1.27 1.35 0.85l7.1-4.33c0.74-0.45 0.74-1.55 0-2L1.35 0.82Z' />
            </svg>
          )}
        </button>
        <button
          type='button'
          className={styles.Hero__VideoControl}
          aria-label='Replay demo'
          title='Replay'
          onClick={replayVideo}
        >
          <span className={styles.Hero__VideoControlReplayIcon} aria-hidden='true'>↻</span>
        </button>
      </div>
      <figcaption className={styles.Hero__VideoCaption}>
        {media.description}
      </figcaption>
    </figure>
  );
};

export default HeroVideoShowcase;
