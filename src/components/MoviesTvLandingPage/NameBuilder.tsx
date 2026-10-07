import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import {
  BUILDER_FILES,
  BUILDER_PRESETS,
  MEDIA_BLOCKS,
  type BuilderFile,
  type MediaBlockKey,
} from '@/data/moviesTvLanding';
import styles from './NameBuilder.module.scss';

// A small model of the Template bar: pick Movies & TV blocks and see the names
// they produce for one episode and one film. Blocks a file has no value for
// are skipped; a pattern with nothing that identifies the file says so.

const MAX_BLOCKS = 5;
const SEPARATOR = ' - ';
const IDENTIFYING: Record<BuilderFile['kind'], MediaBlockKey[]> = {
  episode: ['media_title', 'show', 'episode_title', 'episode_code'],
  movie: ['media_title', 'movie_title'],
};
const blockLabel = (key: MediaBlockKey) => MEDIA_BLOCKS.find((block) => block.key === key)?.label ?? key;

const buildName = (file: BuilderFile, blocks: MediaBlockKey[]) => {
  if (!blocks.some((key) => IDENTIFYING[file.kind].includes(key) && file.fields[key])) return null;
  const parts = blocks.map((key) => file.fields[key]).filter((value): value is string => Boolean(value));
  return `${parts.join(SEPARATOR)}.${file.extension}`;
};

const NameBuilder = () => {
  const [blocks, setBlocks] = useState<MediaBlockKey[]>(BUILDER_PRESETS[0].blocks);
  const activePreset = BUILDER_PRESETS.find(
    (preset) => preset.blocks.length === blocks.length && preset.blocks.every((key, index) => blocks[index] === key),
  );

  const addBlock = (key: MediaBlockKey) => {
    setBlocks((current) => (current.includes(key) || current.length >= MAX_BLOCKS ? current : [...current, key]));
  };
  const removeBlock = (key: MediaBlockKey) => {
    setBlocks((current) => current.filter((item) => item !== key));
  };

  return (
    <div className={styles.Builder}>
      <div className={styles.Builder__Presets} role='group' aria-label='Example patterns'>
        {BUILDER_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type='button'
            className={[styles.Builder__Preset, activePreset?.id === preset.id ? styles.Builder__Preset_active : ''].join(' ')}
            aria-pressed={activePreset?.id === preset.id}
            onClick={() => setBlocks(preset.blocks)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className={styles.Builder__Panel}>
        <div className={styles.Builder__Section}>
          <span className={styles.Builder__Label}>Template</span>
          <div className={styles.Builder__Template}>
            {blocks.length === 0 && <span className={styles.Builder__Empty}>Add a block below</span>}
            {blocks.map((key, index) => (
              <span key={key} className={styles.Builder__Slot}>
                {index > 0 && <span className={styles.Builder__Separator} aria-hidden='true'>-</span>}
                <button
                  type='button'
                  className={styles.Builder__Chip}
                  onClick={() => removeBlock(key)}
                  aria-label={`Remove ${blockLabel(key)}`}
                >
                  {blockLabel(key)}
                  <X size={13} strokeWidth={2.5} aria-hidden='true' />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.Builder__Section}>
          <span className={styles.Builder__Label}>Movies &amp; TV blocks</span>
          <ul className={styles.Builder__Palette}>
            {MEDIA_BLOCKS.map((block) => {
              const used = blocks.includes(block.key);
              const full = blocks.length >= MAX_BLOCKS;
              return (
                <li key={block.key}>
                  <button
                    type='button'
                    className={styles.Builder__Block}
                    onClick={() => addBlock(block.key)}
                    disabled={used || full}
                    title={block.hint}
                  >
                    <Plus size={14} strokeWidth={2.75} aria-hidden='true' className={styles.Builder__BlockIcon} />
                    <span className={styles.Builder__BlockName}>{block.label}</span>
                    <span className={styles.Builder__BlockHint}>{block.hint}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={`${styles.Builder__Section} ${styles.Builder__Preview}`} aria-live='polite'>
          <span className={styles.Builder__Label}>Preview</span>
          {BUILDER_FILES.map((file) => {
            const name = buildName(file, blocks);
            return (
              <div key={file.before} className={styles.Builder__Row}>
                <span className={styles.Builder__Before}>{file.before}</span>
                {name ? (
                  <span key={name} className={styles.Builder__After}>{name}</span>
                ) : (
                  <span className={styles.Builder__Missing}>
                    Add {file.kind === 'episode' ? 'Show or Episode Title' : 'Movie Title'} to name this {file.kind === 'episode' ? 'episode' : 'film'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NameBuilder;
