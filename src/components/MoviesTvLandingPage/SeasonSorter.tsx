import { useEffect, useRef, useState } from 'react';
import { Folder, Play, RotateCcw } from 'lucide-react';
import { SORT_FILES, SORT_RULES, type SortFile, type SortRuleId } from '@/data/moviesTvLanding';
import styles from './SeasonSorter.module.scss';

// Downloads before and after Sort. Auto groups episodes as "<Show> - Season <n>"
// and films as "Movies"; the other rules are the Folder rules examples the app
// offers for Movies & TV templates. Files a rule does not cover stay put, the
// way the folder planner leaves unfit files ungrouped.

interface FolderGroup {
  name: string;
  files: SortFile[];
}

const folderFor = (file: SortFile, rule: SortRuleId): string | null => {
  const isEpisode = Boolean(file.show);
  switch (rule) {
    case 'auto':
      return isEpisode ? `${file.show} - Season ${file.season}` : 'Movies';
    case 'per-show':
      return isEpisode ? file.show! : null;
    case 'genre':
      return isEpisode ? null : file.genre ?? null;
    case 'decade':
      return isEpisode ? null : file.decade ?? null;
  }
};

const sortFiles = (rule: SortRuleId) => {
  const groups: FolderGroup[] = [];
  const left: SortFile[] = [];
  for (const file of SORT_FILES) {
    const name = folderFor(file, rule);
    if (!name) {
      left.push(file);
      continue;
    }
    const group = groups.find((item) => item.name === name);
    if (group) group.files.push(file);
    else groups.push({ name, files: [file] });
  }
  return { groups, left };
};

const SeasonSorter = () => {
  const [rule, setRule] = useState<SortRuleId>('auto');
  const [sorted, setSorted] = useState(false);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const autoPlayed = useRef(false);
  const { groups, left } = sortFiles(rule);
  const activeRule = SORT_RULES.find((item) => item.id === rule)!;

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || autoPlayed.current) return;
        autoPlayed.current = true;
        window.setTimeout(() => setSorted(true), 900);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const chooseRule = (next: SortRuleId) => {
    autoPlayed.current = true;
    setRule(next);
    setSorted(true);
    setRun((value) => value + 1);
  };

  const replay = () => {
    autoPlayed.current = true;
    setSorted(false);
    window.setTimeout(() => {
      setSorted(true);
      setRun((value) => value + 1);
    }, 650);
  };

  return (
    <div ref={rootRef} className={styles.Sorter}>
      <div className={styles.Sorter__Rules} role='group' aria-label='Folder rules'>
        {SORT_RULES.map((item) => (
          <button
            key={item.id}
            type='button'
            className={[styles.Sorter__Rule, rule === item.id ? styles.Sorter__Rule_active : ''].join(' ')}
            aria-pressed={rule === item.id}
            onClick={() => chooseRule(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.Sorter__Prompt}>
        <span className={styles.Sorter__PromptLabel}>Folder rules</span>
        <span className={[styles.Sorter__PromptText, rule === 'auto' ? styles.Sorter__PromptText_empty : ''].join(' ')}>
          {rule === 'auto' ? 'Empty: Zush groups episodes by show and season, films into Movies' : activeRule.prompt}
        </span>
      </div>

      <div className={styles.Sorter__Stage}>
        <div className={styles.Sorter__Source}>
          <div className={styles.Sorter__Head}>
            <Folder size={18} aria-hidden='true' className={styles.Sorter__FolderIcon} />
            <span className={styles.Sorter__HeadName}>Downloads</span>
            <span className={styles.Sorter__Tag}>Before</span>
          </div>
          <ul className={styles.Sorter__List}>
            {SORT_FILES.map((file) => (
              <li key={file.id} className={`${styles.Sorter__File} ${styles.Sorter__File_raw}`}>
                {file.before}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.Sorter__Result} aria-live='polite'>
          {!sorted ? (
            <button type='button' className={styles.Sorter__Play} onClick={() => chooseRule(rule)}>
              <Play size={20} fill='currentColor' aria-hidden='true' />
              Sort {SORT_FILES.length} files
            </button>
          ) : (
            <>
              <div className={styles.Sorter__ResultHead}>
                <Folder size={18} aria-hidden='true' className={styles.Sorter__FolderIcon} />
                <span className={styles.Sorter__HeadName}>Downloads</span>
                <span className={`${styles.Sorter__Tag} ${styles.Sorter__Tag_after}`}>After Sort</span>
                <button type='button' className={styles.Sorter__Replay} onClick={replay}>
                  <RotateCcw size={14} aria-hidden='true' />
                  Replay
                </button>
              </div>
              <ul className={styles.Sorter__Grid} key={`folders-${rule}-${run}`}>
                {groups.map((group, index) => (
                  <li key={group.name} className={styles.Sorter__Folder} style={{ animationDelay: `${120 + index * 110}ms` }}>
                    <div className={styles.Sorter__Head}>
                      <Folder size={18} aria-hidden='true' className={styles.Sorter__FolderIcon} />
                      <span className={styles.Sorter__HeadName}>{group.name}</span>
                      <span className={styles.Sorter__Count}>{group.files.length}</span>
                    </div>
                    <ul className={styles.Sorter__FolderFiles}>
                      {group.files.map((file) => (
                        <li key={file.id}>{file.after}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              {left.length > 0 && (
                <div className={styles.Sorter__Loose} key={`loose-${rule}-${run}`}>
                  <p className={styles.Sorter__Note}>
                    Renamed and left in place: this rule only covers {rule === 'per-show' ? 'TV episodes' : 'films'}.
                  </p>
                  <ul className={styles.Sorter__List}>
                    {left.map((file, index) => (
                      <li key={file.id} className={styles.Sorter__File} style={{ animationDelay: `${300 + index * 40}ms` }}>
                        {file.after}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonSorter;
