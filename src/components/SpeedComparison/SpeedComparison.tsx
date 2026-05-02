import { useEffect, useRef, useState } from 'react';
import { Trophy, Loader2, RotateCcw, Check, Timer, FastForward } from 'lucide-react';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import type { SpeedComparisonCopy } from '@/i18n/copy';
import styles from './SpeedComparison.module.scss';

interface SpeedComparisonProps {
  copy: SpeedComparisonCopy;
  zushVideoLight?: string;
  zushVideoDark?: string;
  rivalVideoLight?: string;
  rivalVideoDark?: string;
  zushTargetSeconds?: number;
  rivalTargetSeconds?: number;
  zushRealDurationSeconds?: number;
  rivalRealDurationSeconds?: number;
  zushStartOffsetSeconds?: number;
  rivalStartOffsetSeconds?: number;
}

const formatTime = (seconds: number, asSeconds = false): string => {
  if (asSeconds) {
    return `${seconds.toFixed(1)}s`;
  }
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const getDocumentTheme = (): 'light' | 'dark' => {
  if (typeof document === 'undefined') {
    return 'light';
  }
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
};

const SpeedComparison = ({
  copy,
  zushVideoLight = '/videos/zush-speed-test.mp4',
  zushVideoDark = '/videos/zush-speed-test.mp4',
  rivalVideoLight = '/videos/cowork-speed-test.mp4',
  rivalVideoDark = '/videos/cowork-speed-test.mp4',
  zushTargetSeconds = 6,
  rivalTargetSeconds = 107,
  zushRealDurationSeconds = 12,
  rivalRealDurationSeconds = 109,
  zushStartOffsetSeconds = 2,
  rivalStartOffsetSeconds = 2,
}: SpeedComparisonProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const zushVideoRef = useRef<HTMLVideoElement>(null);
  const rivalVideoRef = useRef<HTMLVideoElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(getDocumentTheme);
  const [mounted, setMounted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [runId, setRunId] = useState(0);
  const [zushElapsed, setZushElapsed] = useState(0);
  const [rivalElapsed, setRivalElapsed] = useState(0);
  const [isSkipping, setIsSkipping] = useState(false);
  const [zushVideoLoaded, setZushVideoLoaded] = useState(false);
  const [rivalVideoLoaded, setRivalVideoLoaded] = useState(false);
  const skipRafRef = useRef<number | null>(null);
  const skipActiveRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    const sync = () => setTheme(getDocumentTheme());
    sync();
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === 'data-theme')) {
        sync();
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hasStarted) return;
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    setZushElapsed(0);
    setRivalElapsed(0);

    const zushVideo = zushVideoRef.current;
    const rivalVideo = rivalVideoRef.current;
    if (zushVideo) {
      zushVideo.currentTime = 0;
      void zushVideo.play().catch(() => undefined);
    }
    if (rivalVideo) {
      rivalVideo.currentTime = 0;
      void rivalVideo.play().catch(() => undefined);
    }

    const start = performance.now();
    const totalRealMs =
      Math.max(
        zushStartOffsetSeconds + zushTargetSeconds,
        rivalStartOffsetSeconds + rivalTargetSeconds,
        zushRealDurationSeconds,
        rivalRealDurationSeconds,
      ) * 1000;
    let raf = 0;

    const tick = (now: number) => {
      const real = (now - start) / 1000;
      const zushRaw = Math.min(zushTargetSeconds, Math.max(0, real - zushStartOffsetSeconds));
      const rivalRaw = Math.min(rivalTargetSeconds, Math.max(0, real - rivalStartOffsetSeconds));
      const zush = Math.round(zushRaw * 10) / 10;
      const rival = Math.round(rivalRaw * 10) / 10;
      setZushElapsed(zush);
      setRivalElapsed((prev) => {
        if (skipActiveRef.current) return prev;
        return prev >= rivalTargetSeconds ? prev : rival;
      });
      if (real * 1000 < totalRealMs) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    hasStarted,
    runId,
    zushTargetSeconds,
    rivalTargetSeconds,
    zushRealDurationSeconds,
    rivalRealDurationSeconds,
    zushStartOffsetSeconds,
    rivalStartOffsetSeconds,
  ]);

  const cancelSkipAnimation = () => {
    if (skipRafRef.current !== null) {
      cancelAnimationFrame(skipRafRef.current);
      skipRafRef.current = null;
    }
    skipActiveRef.current = false;
    setIsSkipping(false);
  };

  const handleReplay = () => {
    cancelSkipAnimation();
    const zushVideo = zushVideoRef.current;
    const rivalVideo = rivalVideoRef.current;
    if (zushVideo) {
      zushVideo.currentTime = 0;
      void zushVideo.play().catch(() => undefined);
    }
    if (rivalVideo) {
      rivalVideo.currentTime = 0;
      void rivalVideo.play().catch(() => undefined);
    }
    setRunId((id) => id + 1);
  };

  const handleSkipRival = () => {
    if (skipActiveRef.current) return;
    const rivalVideo = rivalVideoRef.current;
    if (!rivalVideo || Number.isNaN(rivalVideo.duration)) {
      setRivalElapsed(rivalTargetSeconds);
      return;
    }

    const startCT = rivalVideo.currentTime;
    const endCT = Math.max(0, rivalVideo.duration - 0.05);
    const startTimer = rivalElapsed;
    const endTimer = rivalTargetSeconds;
    const animationMs = 1300;
    const startTime = performance.now();

    skipActiveRef.current = true;
    setIsSkipping(true);
    rivalVideo.pause();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / animationMs);
      const eased = 1 - Math.pow(1 - t, 3);

      if (rivalVideoRef.current) {
        rivalVideoRef.current.currentTime = startCT + (endCT - startCT) * eased;
      }
      const value = startTimer + (endTimer - startTimer) * eased;
      setRivalElapsed(Math.round(value * 10) / 10);

      if (t < 1) {
        skipRafRef.current = requestAnimationFrame(animate);
        return;
      }
      skipRafRef.current = null;
      skipActiveRef.current = false;
      setIsSkipping(false);
      setRivalElapsed(rivalTargetSeconds);
    };

    skipRafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      cancelSkipAnimation();
    };
  }, []);

  const zushDone = zushElapsed >= zushTargetSeconds;
  const rivalDone = rivalElapsed >= rivalTargetSeconds;

  const zushSrc = theme === 'dark' ? zushVideoDark : zushVideoLight;
  const rivalSrc = (theme === 'dark' ? rivalVideoDark : rivalVideoLight) ?? rivalVideoLight ?? rivalVideoDark;
  const hasRivalVideo = Boolean(rivalSrc);

  const titleParts = copy.title.split(copy.titleAccent);

  return (
    <section
      ref={sectionRef}
      className={styles.SpeedComparison}
      aria-labelledby='speed-comparison-title'
    >
      <div className={styles.SpeedComparison__Container}>
        <div className={styles.Header}>
          <span className={styles.Header__Eyebrow}>
            <Timer size={13} aria-hidden='true' />
            <span>{copy.eyebrow}</span>
          </span>
          <Heading
            as='h2'
            align='center'
            id='speed-comparison-title'
            className={styles.Header__Title}
          >
            {titleParts[0]}
            <span className={styles.Header__TitleAccent}>{copy.titleAccent}</span>
            {titleParts.slice(1).join(copy.titleAccent)}
          </Heading>
          <Text as='p' size='lg' color='subtle' align='center' className={styles.Header__Description}>
            {copy.description}
          </Text>
        </div>

        <div className={styles.Grid}>
          <article className={`${styles.Card} ${styles.Card_zush}`}>
            <header className={styles.Card__Header}>
              <div className={styles.Card__Brand}>
                <picture className={styles.Card__BrandLogo}>
                  <source srcSet='/logo-80.webp' type='image/webp' />
                  <img src='/logo-80.png' alt='' width={32} height={32} loading='lazy' decoding='async' />
                </picture>
                <span className={styles.Card__BrandName}>{copy.zushLabel}</span>
              </div>
              {zushDone ? (
                <span className={styles.Badge_winner}>
                  <Trophy size={13} aria-hidden='true' />
                  <span>{copy.zushBadge}</span>
                </span>
              ) : (
                <span className={styles.Badge_running}>
                  <span className={styles.LiveDot} aria-hidden='true' />
                  <span>{copy.runningLabel}</span>
                </span>
              )}
            </header>

            <div className={styles.Card__Time} aria-live='polite' aria-atomic='true'>
              <span className={styles.Card__TimeValue}>{formatTime(zushElapsed, true)}</span>
              {zushDone && (
                <span className={styles.Card__TimeCheck} aria-hidden='true'>
                  <Check size={20} />
                </span>
              )}
            </div>

            <div className={styles.Media}>
              {!zushVideoLoaded && <div className={styles.Media__Skeleton} />}
              {mounted && (
                <video
                  ref={zushVideoRef}
                  key={`zush-${theme}`}
                  className={styles.Media__Video}
                  src={zushSrc}
                  muted
                  playsInline
                  preload='auto'
                  onLoadedData={() => setZushVideoLoaded(true)}
                  aria-label={`${copy.zushLabel}: ${copy.zushCaption}`}
                />
              )}
            </div>

            <p className={styles.Card__Caption}>{copy.zushCaption}</p>
          </article>

          <article className={`${styles.Card} ${styles.Card_rival}`}>
            <header className={styles.Card__Header}>
              <div className={styles.Card__Brand}>
                <span className={styles.Card__BrandMark} aria-hidden='true'>
                  C
                </span>
                <span className={styles.Card__BrandName}>{copy.rivalLabel}</span>
              </div>
              {rivalDone ? (
                <span className={styles.Badge_neutral}>
                  <Check size={13} aria-hidden='true' />
                  <span>{copy.rivalDoneLabel}</span>
                </span>
              ) : (
                <span className={styles.Badge_neutral}>
                  <span className={styles.SpinIcon} aria-hidden='true'>
                    <Loader2 size={13} />
                  </span>
                  <span>{copy.rivalStatus}</span>
                </span>
              )}
            </header>

            <div className={`${styles.Card__Time} ${styles.Card__Time_rival}`}>
              <span
                className={`${styles.Card__TimeValue} ${isSkipping ? styles.Card__TimeValue_skipping : ''}`}
                aria-live='polite'
                aria-atomic='true'
              >
                {formatTime(rivalElapsed, true)}
              </span>
              {zushDone && !rivalDone && (
                <button
                  type='button'
                  className={styles.SkipButton}
                  onClick={handleSkipRival}
                  aria-label={copy.skipToEndLabel}
                >
                  <FastForward size={14} aria-hidden='true' />
                  <span>{copy.skipToEndLabel}</span>
                </button>
              )}
            </div>

            <div className={`${styles.Media} ${styles.Media_rival} ${isSkipping ? styles.Media_skipping : ''}`}>
              {hasRivalVideo && !rivalVideoLoaded && <div className={styles.Media__Skeleton} />}
              {hasRivalVideo && mounted ? (
                <video
                  ref={rivalVideoRef}
                  key={`rival-${theme}`}
                  className={`${styles.Media__Video} ${isSkipping ? styles.Media__Video_skipping : ''}`}
                  src={rivalSrc}
                  muted
                  playsInline
                  preload='auto'
                  onLoadedData={() => setRivalVideoLoaded(true)}
                  aria-label={`${copy.rivalLabel}: ${copy.rivalCaption}`}
                />
              ) : !hasRivalVideo ? (
                <div className={styles.Placeholder} aria-hidden='true'>
                  <div className={styles.Placeholder__Window}>
                    <div className={styles.Placeholder__TitleBar}>
                      <span className={styles.Placeholder__Dot} />
                      <span className={styles.Placeholder__Dot} />
                      <span className={styles.Placeholder__Dot} />
                      <span className={styles.Placeholder__TitleText}>{copy.rivalLabel}</span>
                    </div>
                    <div className={styles.Placeholder__Body}>
                      <div
                        className={`${styles.Placeholder__Spinner} ${rivalDone ? styles.Placeholder__Spinner_paused : ''}`}
                      />
                      <div className={styles.Placeholder__Bar}>
                        <div
                          className={`${styles.Placeholder__BarFill} ${rivalDone ? styles.Placeholder__BarFill_paused : ''}`}
                        />
                      </div>
                      <div className={styles.Placeholder__Lines}>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                  <span className={styles.Placeholder__Hint}>{copy.rivalPlaceholderHint}</span>
                </div>
              ) : null}
            </div>

            <p className={styles.Card__Caption}>{copy.rivalCaption}</p>
          </article>
        </div>

        <p className={styles.Disclaimer}>{copy.disclaimer}</p>

        <div className={styles.Controls}>
          <button
            type='button'
            className={styles.ReplayButton}
            onClick={handleReplay}
            aria-label={copy.replayLabel}
          >
            <RotateCcw size={16} aria-hidden='true' />
            <span>{copy.replayLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpeedComparison;
