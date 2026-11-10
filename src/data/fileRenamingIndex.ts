/**
 * Zush File Renaming Index — aggregated, anonymized usage figures.
 *
 * Single source for the statistics page, its CSV download, and its Dataset
 * JSON-LD. Figures come from anonymous app telemetry (TelemetryDeck) and
 * aggregate usage counters (Supabase). No filenames or file contents are
 * collected. The working notes behind every figure live in
 * reports/stats-page-data-2026-11-10.md.
 *
 * Deliberately not published: user or device counts, per-user averages, and
 * anything a reader could divide back into an audience size.
 */

export const INDEX_NAME = 'Zush File Renaming Index 2026';
export const INDEX_PATH = '/ai-file-renaming-statistics';
export const INDEX_CSV_PATH = '/ai-file-renaming-statistics.csv';
export const INDEX_PUBLISHED = '2026-11-10';
export const INDEX_UPDATED = '2026-11-10';
export const INDEX_PERIOD = { start: '2026-08-10', end: '2026-11-10', label: 'August 10 – November 10, 2026' };

export interface IndexStat {
  id: string;
  /** Short figure for tiles, e.g. "1.2M". */
  value: string;
  /** One citable sentence, written to stand on its own when quoted. */
  sentence: string;
  /** What the figure covers: platform and period. */
  scope: string;
  /** Machine-readable value and unit for the CSV. */
  raw: number;
  unit: string;
}

export const HEADLINE_STATS: IndexStat[] = [
  {
    id: 'files-renamed-3-months',
    value: '1.2M+',
    sentence: 'Zush users renamed more than 1.2 million files with AI in three months.',
    scope: 'Mac and Windows, Aug 10 – Nov 10, 2026',
    raw: 1240663,
    unit: 'files',
  },
  {
    id: 'cloud-seconds-per-file',
    value: '~2 s',
    sentence: 'Cloud AI analysis takes about 2 seconds per file (median), and about 1.3 seconds per file in batches of 11 to 200 files.',
    scope: 'Mac and Windows, Zush Cloud AI, Oct 5 – Nov 10, 2026',
    raw: 1.96,
    unit: 'seconds per file (median)',
  },
  {
    id: 'never-edit-share',
    value: '4 in 5',
    sentence: 'More than 4 in 5 active Mac users never edited a single AI-suggested filename before applying it.',
    scope: 'Mac users who renamed 10+ files, Sept 18 – Nov 10, 2026',
    raw: 83,
    unit: '% of users',
  },
  {
    id: 'rename-success-rate',
    value: '98.9%',
    sentence: '98.9% of files sent to batch renaming were renamed without an error.',
    scope: 'Mac and Windows, Aug 10 – Nov 10, 2026',
    raw: 98.9,
    unit: '% of files',
  },
];

export const KEY_FINDINGS: string[] = [
  'Zush users renamed more than 1.2 million files with AI between August 10 and November 10, 2026.',
  'Documents are the most renamed file type on Mac (49% of files), followed closely by images (45%).',
  'Video makes up 4% of AI-renamed files on Mac, audio 2%, and design files under 1%.',
  'The median AI renaming batch contains 11 files; 62% of batches contain 20 files or fewer.',
  'Only 8% of batches contain more than 500 files, yet those batches account for two-thirds (67%) of all files renamed.',
  'Cloud AI analysis takes a median of about 2 seconds per file; a batch of around 90 files typically finishes in about 2 minutes.',
  'Images are the fastest files to analyze (1.3 s median per file), documents take 1.5 s and videos 2.6 s.',
  'More than 4 in 5 active Mac users never corrected an AI-suggested filename by hand before applying it.',
  '98.9% of files sent to batch renaming were renamed without an error; applying a new name takes about 40 milliseconds per file.',
  'About 1 in 11 renaming batches with a known AI mode is processed by a local model (Ollama or LM Studio) instead of a cloud provider.',
  'Free and paid users see the same analysis speed: 2.1 vs 1.9 seconds per file at the median.',
];

/** macOS only: the Windows app does not report file type groups. */
export const FILE_TYPE_MIX = [
  { label: 'Documents', share: 49.1, note: 'PDFs, scans, office files, text' },
  { label: 'Images', share: 45.2, note: 'photos, screenshots, camera RAW' },
  { label: 'Video', share: 3.7, note: 'MP4, MOV, MKV and more' },
  { label: 'Audio', share: 1.8, note: 'recordings, voice memos, music' },
  { label: 'Design files', share: 0.2, note: 'Sketch, Figma, Photoshop' },
];

export const BATCH_SIZE_DISTRIBUTION = [
  { label: '1 file', batches: 18.9, files: 0.2 },
  { label: '2–5 files', batches: 18.4, files: 0.6 },
  { label: '6–20 files', batches: 24.6, files: 2.7 },
  { label: '21–100 files', batches: 21.2, files: 9.1 },
  { label: '101–500 files', batches: 8.7, files: 20.5 },
  { label: 'More than 500 files', batches: 8.1, files: 67.0 },
];

/** Zush Cloud AI, wall-clock time a user waits, medians. */
export const SPEED_BY_BATCH = [
  { label: '1 file', perFile: '4.3 s', raw: 4.26, typicalBatch: '4 s' },
  { label: '2–10 files', perFile: '2.0 s', raw: 1.96, typicalBatch: '8 s (4 files)' },
  { label: '11–50 files', perFile: '1.3 s', raw: 1.33, typicalBatch: '32 s (24 files)' },
  { label: '51–200 files', perFile: '1.3 s', raw: 1.33, typicalBatch: '2 min (92 files)' },
  { label: 'More than 200 files', perFile: '0.9 s', raw: 0.94, typicalBatch: '12 min (868 files)' },
];

export const SPEED_BY_TYPE = [
  { label: 'Images', perFile: '1.3 s', raw: 1.26 },
  { label: 'Documents', perFile: '1.5 s', raw: 1.53 },
  { label: 'Video', perFile: '2.6 s', raw: 2.6 },
];

export interface CsvRow {
  metric: string;
  value: number | string;
  unit: string;
  scope: string;
}

export const CSV_ROWS: CsvRow[] = [
  ...HEADLINE_STATS.map((stat) => ({ metric: stat.id, value: stat.raw, unit: stat.unit, scope: stat.scope })),
  ...FILE_TYPE_MIX.map((row) => ({ metric: `file-type-share-${row.label.toLowerCase().replace(/\s+/g, '-')}`, value: row.share, unit: '% of AI-renamed files', scope: 'Mac, Aug 10 – Nov 10, 2026' })),
  { metric: 'mixed-type-batches', value: 7.9, unit: '% of batches', scope: 'Mac, Aug 10 – Nov 10, 2026' },
  { metric: 'median-batch-size', value: 11, unit: 'files', scope: 'Mac and Windows, Aug 10 – Nov 10, 2026' },
  ...BATCH_SIZE_DISTRIBUTION.flatMap((row) => [
    { metric: `batches-${row.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, value: row.batches, unit: '% of batches', scope: 'Mac and Windows, Aug 10 – Nov 10, 2026' },
    { metric: `files-in-batches-${row.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, value: row.files, unit: '% of files', scope: 'Mac and Windows, Aug 10 – Nov 10, 2026' },
  ]),
  ...SPEED_BY_BATCH.map((row) => ({ metric: `cloud-seconds-per-file-batch-${row.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, value: row.raw, unit: 'seconds per file (median, wall clock)', scope: 'Zush Cloud AI, Oct 5 – Nov 10, 2026' })),
  ...SPEED_BY_TYPE.map((row) => ({ metric: `cloud-seconds-per-file-${row.label.toLowerCase()}`, value: row.raw, unit: 'seconds per file (median, wall clock)', scope: 'Mac, Zush Cloud AI, Oct 5 – Nov 10, 2026' })),
  { metric: 'apply-rename-ms-per-file', value: 40, unit: 'milliseconds (median)', scope: 'Mac and Windows, Aug 10 – Nov 10, 2026' },
  { metric: 'local-model-batch-share', value: 8.8, unit: '% of batches with a known AI mode', scope: 'Mac and Windows, Aug 10 – Nov 10, 2026' },
];

export function toCsv(rows: CsvRow[]): string {
  const escape = (value: string | number) => {
    const text = String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return ['metric,value,unit,scope', ...rows.map((row) => [row.metric, row.value, row.unit, row.scope].map(escape).join(','))].join('\n') + '\n';
}
