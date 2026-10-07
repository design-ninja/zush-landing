import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { Check, LoaderCircle } from 'lucide-react';
import { MACHINE_EXAMPLES, TVDB_URL, type MachineExample } from '@/data/moviesTvLanding';
import cardStyles from './TitleCard.module.scss';
import styles from './TitleMachine.module.scss';

// Hero demo: one release name at a time goes from raw path, to recognized
// pieces, to a TheTVDB match, to the new name. The server renders the first
// example fully resolved, so the page reads correctly before (or without) JS.

type Phase = 'raw' | 'parse' | 'lookup' | 'match' | 'result';

const PHASE_ORDER: Phase[] = ['raw', 'parse', 'lookup', 'match', 'result'];
const PHASE_MS: Record<Phase, number> = {
  raw: 900,
  parse: 1500,
  lookup: 750,
  match: 1000,
  result: 2900,
};
const EXAMPLE_MS = PHASE_ORDER.reduce((total, phase) => total + PHASE_MS[phase], 0);
const CARD_HUES: Record<string, number> = { scene: 262, anime: 300, movie: 236, folders: 284 };

const reached = (phase: Phase, target: Phase) => PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(target);

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
};

const Filename = ({ example, phase }: { example: MachineExample; phase: Phase }) => {
  const parsed = reached(phase, 'parse');
  return (
    <p className={styles.Machine__Path}>
      {example.segments.map((segment, index) => (
        <span
          key={`${example.id}-${index}`}
          className={[
            styles.Token,
            parsed ? styles[`Token_${segment.kind}`] : '',
          ].filter(Boolean).join(' ')}
          style={{
            transitionDelay: parsed ? `${index * 90}ms` : '0ms',
            animationDelay: parsed ? `${index * 90}ms` : '0ms',
          }}
        >
          {segment.label && parsed && <span className={styles.Token__Label} aria-hidden='true'>{segment.label}</span>}
          {segment.text}
        </span>
      ))}
    </p>
  );
};

const TitleMachine = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('result');
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const example = MACHINE_EXAMPLES[index];

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || !visible) return;
    const timer = window.setTimeout(() => {
      const next = PHASE_ORDER.indexOf(phase) + 1;
      if (next < PHASE_ORDER.length) {
        setPhase(PHASE_ORDER[next]);
        return;
      }
      setIndex((current) => (current + 1) % MACHINE_EXAMPLES.length);
      setPhase('raw');
    }, PHASE_MS[phase]);
    return () => window.clearTimeout(timer);
  }, [phase, paused, visible, reducedMotion]);

  const selectExample = (nextIndex: number) => {
    setIndex(nextIndex);
    setPhase(reducedMotion ? 'result' : 'raw');
  };

  const showLookup = reached(phase, 'lookup');
  const matched = reached(phase, 'match');
  const resolved = phase === 'result';
  const elapsed = PHASE_ORDER.slice(0, PHASE_ORDER.indexOf(phase)).reduce((total, item) => total + PHASE_MS[item], 0);

  return (
    <div
      ref={rootRef}
      className={styles.Machine}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.Machine__Chrome} aria-hidden='true'>
        <span className={styles.Machine__Lights}><i /><i /><i /></span>
        <span className={styles.Machine__Window}>Zush · Movies &amp; TV</span>
      </div>

      <div className={styles.Machine__Body}>
        <div className={styles.Machine__Step}>
          <span className={styles.Machine__Label}>Original</span>
          <Filename example={example} phase={phase} />
        </div>

        <div className={[styles.Machine__Step, styles.Machine__Lookup, showLookup ? styles.Machine__Lookup_on : ''].join(' ')}>
          <span className={styles.Machine__Label}>TheTVDB</span>
          <p className={styles.Machine__LookupLine} aria-live='polite'>
            {!showLookup ? (
              <span className={styles.Machine__Idle}>Waiting for a title</span>
            ) : !matched ? (
              <>
                <LoaderCircle size={16} className={styles.Machine__Spinner} aria-hidden='true' />
                <span>Looking up “{example.match.title.split(':')[0]}”</span>
              </>
            ) : (
              <>
                <span className={styles.Machine__Match}><Check size={14} strokeWidth={3} aria-hidden='true' />Match</span>
                <span className={styles.Machine__MatchTitle}>{example.match.title}</span>
                <span className={styles.Machine__MatchMeta}>{example.match.year} · {example.match.detail}</span>
              </>
            )}
          </p>
        </div>

        <div className={[styles.Machine__Step, styles.Machine__Result, resolved ? styles.Machine__Result_on : ''].join(' ')}>
          <span className={styles.Machine__Label}>New name</span>
          <div className={styles.Machine__ResultBody}>
            <div
              className={`${cardStyles.Card} ${styles.Machine__Card}`}
              style={{ '--card-hue': CARD_HUES[example.id] ?? 0 } as CSSProperties}
              aria-hidden='true'
            >
              <span className={cardStyles.Card__Text}>
                <span className={cardStyles.Card__Title}>{example.card.title}</span>
              </span>
            </div>
            <div className={styles.Machine__NewName}>
              <p className={styles.Machine__After}>{resolved ? example.after : ' '}</p>
              <p className={styles.Machine__CardLine}>{resolved ? example.card.line : ' '}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Machine__Tabs} role='group' aria-label='Examples'>
        {MACHINE_EXAMPLES.map((item, itemIndex) => (
          <button
            key={item.id}
            type='button'
            className={[styles.Machine__Tab, itemIndex === index ? styles.Machine__Tab_active : ''].join(' ')}
            aria-pressed={itemIndex === index}
            onClick={() => selectExample(itemIndex)}
          >
            <span className={styles.Machine__TabText}>{item.tab}</span>
            <span className={styles.Machine__Progress} aria-hidden='true'>
              {itemIndex === index && (
                <span
                  key={`${index}-${phase}-${paused || !visible ? 'p' : 'r'}`}
                  className={styles.Machine__ProgressFill}
                  style={{
                    '--from': reducedMotion ? 1 : elapsed / EXAMPLE_MS,
                    '--to': reducedMotion ? 1 : (elapsed + PHASE_MS[phase]) / EXAMPLE_MS,
                    '--duration': `${PHASE_MS[phase]}ms`,
                    animationPlayState: paused || !visible ? 'paused' : 'running',
                  } as CSSProperties}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <p className={styles.Machine__Credit}>
        Movie and TV data from <a href={TVDB_URL} target='_blank' rel='noopener'>TheTVDB</a>
      </p>
    </div>
  );
};

export default TitleMachine;
