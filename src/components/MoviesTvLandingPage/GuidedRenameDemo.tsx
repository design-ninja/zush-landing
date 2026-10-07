import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, Ellipsis, Folder, Pause, Play, Plus, Sparkles } from 'lucide-react';
import breakingBadPoster from '@/assets/landing/movies-tv/breaking-bad-poster.webp';
import bladeRunnerPoster from '@/assets/landing/movies-tv/blade-runner-poster.webp';
import styles from './GuidedRenameDemo.module.scss';

const DURATION = 5200;

const steps = [
  { title: 'Add your files', detail: 'Drop a batch of episodes and films into Zush.' },
  { title: 'Pick Movies & TV', detail: 'Select the ready-made template for your library.' },
  { title: 'Check the names', detail: 'Review every proposed name before applying it.' },
  { title: 'Rename & sort', detail: 'See the season and movie folders before you confirm.' },
] as const;

function FileRow({ file, preview, index }: { file: typeof files[number]; preview: boolean; index: number }) {
  return (
    <div className={styles.FileRow} style={{ animationDelay: `${index * 120}ms` }}>
      <span className={styles.Checkbox}><Check size={10} strokeWidth={3} /></span>
      <img src={file.poster} alt='' />
      <div className={styles.FileRow__Names}>
        <span className={styles.FileRow__Original}>{file.original}</span>
        {preview && <span className={styles.FileRow__Preview}><span aria-hidden='true'>→</span> {file.renamed}</span>}
      </div>
      <Ellipsis className={styles.FileRow__More} size={18} aria-hidden='true' />
    </div>
  );
}

const files = [
  {
    original: 'Breaking.Bad.S02E03.720p.HDTV.x264-CTU.mkv',
    renamed: 'Breaking Bad (2008) - S02E03 - Bit by a Dead Bee.mkv',
    poster: breakingBadPoster.src,
  },
  {
    original: 'Breaking.Bad.S02E04.720p.HDTV.x264-CTU.mkv',
    renamed: 'Breaking Bad (2008) - S02E04 - Down.mkv',
    poster: breakingBadPoster.src,
  },
  {
    original: 'Blade.Runner.2049.2017.2160p.UHD.BluRay.x265.mkv',
    renamed: 'Blade Runner 2049 (2017).mkv',
    poster: bladeRunnerPoster.src,
  },
] as const;

export default function GuidedRenameDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    return () => media.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !playing || reducedMotion) return;
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % steps.length), DURATION);
    return () => window.clearTimeout(timer);
  }, [step, run, visible, playing, reducedMotion]);

  const goTo = (nextStep: number) => {
    setStep((nextStep + steps.length) % steps.length);
    setRun((current) => current + 1);
  };

  const isPlaying = playing && !reducedMotion;
  const showPreview = step >= 2;
  const showFolders = step === 3;

  return (
    <div ref={rootRef} className={styles.Demo} aria-label='Guided Movies and TV renaming demo'>
      <h2 id='how-title' className={styles.Demo__Title}>Drop. Preview. <span>Rename.</span></h2>
      <div className={styles.Window}>
        <div className={styles.Window__Bar}>
          <span className={styles.Window__Lights} aria-hidden='true'><i /><i /><i /></span>
          <img className={styles.Window__Logo} src='/logo-96.webp' width='28' height='28' alt='' />
          <span>Zush AI</span>
        </div>
        <div className={styles.App}>
          <div className={`${styles.Template} ${step === 1 ? styles.Template_highlight : ''}`}>
            <div className={styles.Template__Header}>
              <span><ChevronDown size={15} aria-hidden='true' /> Template</span>
              <span className={styles.Template__Choice}><Sparkles size={14} aria-hidden='true' /> {step >= 1 ? 'Movies & TV' : 'Smart Rename'} <ChevronsUpDown size={14} aria-hidden='true' /></span>
            </div>
            <div className={styles.Template__Blocks}>
              <span><Sparkles size={11} aria-hidden='true' /> {step >= 1 ? 'Media Title' : 'AI Title'}</span>
              <span className={styles.Template__Plus}><Plus size={15} aria-hidden='true' /></span>
            </div>
            <div className={styles.Template__Path}>
              <span className={styles.Template__Destination}><Folder size={14} aria-hidden='true' /> <ChevronDown size={11} aria-hidden='true' /></span>
              <span className={styles.Template__Slash}>/</span>
              <span className={`${styles.Template__Sort} ${showFolders ? styles.Template__Sort_on : ''}`}>{showFolders ? '↕ Auto' : '+ Sort'}</span>
              <span className={styles.Template__Name}>{step >= 1 ? 'Media Title' : 'Smart Title Name'}</span>
            </div>
          </div>

          <div className={styles.FileList}>
            <div className={styles.FileList__Header}><span className={styles.Checkbox}><Check size={10} strokeWidth={3} /></span><span>3 of 3 selected</span><Ellipsis size={18} aria-hidden='true' /></div>
            {showFolders ? (
              <div key={`folders-${run}`} className={styles.Groups}>
                <div className={styles.GroupTitle}><ChevronDown size={14} aria-hidden='true' /><Folder size={15} fill='currentColor' aria-hidden='true' /><strong>Breaking Bad - Season 2</strong><span>2</span></div>
                <FileRow file={files[0]} preview index={0} />
                <FileRow file={files[1]} preview index={1} />
                <div className={styles.GroupTitle}><ChevronDown size={14} aria-hidden='true' /><Folder size={15} fill='currentColor' aria-hidden='true' /><strong>Movies</strong><span>1</span></div>
                <FileRow file={files[2]} preview index={2} />
              </div>
            ) : (
              files.map((file, index) => <FileRow key={file.original} file={file} preview={showPreview} index={index} />)
            )}
          </div>

          <div className={styles.App__Footer}>
            <span className={styles.App__Utility}>Clear List</span>
            <span className={styles.App__Utility}><Plus size={15} aria-hidden='true' /></span>
            <span className={`${styles.App__Rename} ${showPreview ? styles.App__Rename_ready : ''}`}>{showFolders ? 'Rename & sort' : 'Rename 3'}</span>
          </div>
        </div>
      </div>
      <div className={styles.Copy}>
        <div className={styles.Story}>
          <div className={styles.Story__Copy}>
            <span className={styles.Story__Count}>0{step + 1} <span>/ 0{steps.length}</span></span>
            <div key={`copy-${step}`} className={styles.Story__Text}>
              <h3>{steps[step].title}</h3>
              <p>{steps[step].detail}</p>
            </div>
          </div>
          <div className={styles.Story__Controls}>
            <button type='button' onClick={() => goTo(step - 1)} aria-label='Previous step'><ChevronLeft size={19} /></button>
            <button type='button' className={styles.Story__PlayButton} onClick={() => setPlaying((current) => !current)} aria-label={reducedMotion ? 'Autoplay disabled by reduced motion setting' : isPlaying ? 'Pause demo' : 'Play demo'} aria-pressed={!isPlaying} disabled={reducedMotion}>
              <svg className={styles.Story__Progress} viewBox='0 0 44 44' aria-hidden='true'>
                <circle className={styles.Story__ProgressTrack} cx='22' cy='22' r='19' pathLength='100' />
                <circle
                  key={`${step}-${run}-${visible}-${playing}`}
                  className={isPlaying && visible ? styles.Story__ProgressFill : ''}
                  cx='22'
                  cy='22'
                  r='19'
                  pathLength='100'
                  style={{ animationDuration: `${DURATION}ms` }}
                />
              </svg>
              {isPlaying ? <Pause size={17} fill='currentColor' /> : <Play size={17} fill='currentColor' />}
            </button>
            <button type='button' onClick={() => goTo(step + 1)} aria-label='Next step'><ChevronRight size={19} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
