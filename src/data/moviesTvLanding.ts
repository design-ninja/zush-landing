import { APP_CONFIG } from '@/constants';
import { PRO_PRICING } from '@/constants/pricing';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

// English-only landing for the Movies & TV naming blocks (Zush for Mac 3.15+).
// The page is not in LOCALIZED_ROUTES, so its copy lives here.
//
// House rules for this page:
// 1. Every "after" name is what the Movies & TV template actually writes:
//    `Show (Year) - S01E02 - Episode Title` or `Movie (Year)`, with characters
//    macOS filenames reject (such as ":") dropped, as FileRenameExecutor does.
// 2. Examples come from the app's recognition corpus
//    (zush-app/contracts/media-recognition-corpus.json); episode titles and
//    years are TheTVDB's. Keep the TheTVDB attribution link on the page.
// 3. Folder sorting is single-level: "<Show> - Season <n>" and "Movies" are the
//    Auto defaults from folder_planning_prompt_policy.json. Do not promise
//    nested Show/Season folders or subtitle renaming; neither ships yet.
// 4. Mac only. The Windows app does not have Movies & TV blocks.

export const MOVIES_TV_PAGE_PATH = '/rename-movies-and-tv-shows';
export const MOVIES_TV_PAGE_TITLE = 'Rename Movies and TV Shows on Mac';
export const TVDB_URL = 'https://thetvdb.com';

export const MOVIES_TV_FREE_RENAMES = APP_CONFIG.free_tier_limit;
export const MOVIES_TV_PRICE_LINE = `${MOVIES_TV_FREE_RENAMES} free renames. PRO is ${PRO_PRICING.monthly.label}/month or ${PRO_PRICING.oneTime.label} once.`;

// ---------------------------------------------------------------------------
// Hero: the title machine cycles through these. Segments concatenate to the
// original path; `kind` drives how each piece is highlighted while parsing.

export type SegmentKind = 'show' | 'title' | 'season' | 'episode' | 'year' | 'noise' | 'folder' | 'plain';

export interface MachineSegment {
  text: string;
  kind: SegmentKind;
  /** Label shown above a recognized piece. */
  label?: string;
}

export interface MachineExample {
  id: string;
  /** Short tab label under the machine. */
  tab: string;
  segments: MachineSegment[];
  match: {
    title: string;
    year: string;
    /** Episode code and title, or a movie fact. */
    detail: string;
  };
  /** Title-card lines for the result. */
  card: { title: string; line: string };
  after: string;
}

export const MACHINE_EXAMPLES: MachineExample[] = [
  {
    id: 'scene',
    tab: 'Scene release',
    segments: [
      { text: 'Breaking.Bad', kind: 'show', label: 'Show' },
      { text: '.', kind: 'plain' },
      { text: 'S02E03', kind: 'episode', label: 'Season + episode' },
      { text: '.720p.HDTV.x264-CTU', kind: 'noise' },
      { text: '.mkv', kind: 'plain' },
    ],
    match: { title: 'Breaking Bad', year: '2008', detail: 'S02E03 · Bit by a Dead Bee' },
    card: { title: 'Breaking Bad', line: 'Season 2 · Episode 3 · Bit by a Dead Bee' },
    after: 'Breaking Bad (2008) - S02E03 - Bit by a Dead Bee.mkv',
  },
  {
    id: 'anime',
    tab: 'Anime fansub',
    segments: [
      { text: '[SubsPlease] ', kind: 'noise' },
      { text: 'Sousou no Frieren', kind: 'show', label: 'Show' },
      { text: ' - ', kind: 'plain' },
      { text: '05', kind: 'episode', label: 'Episode' },
      { text: ' (1080p) [A1B2C3D4]', kind: 'noise' },
      { text: '.mkv', kind: 'plain' },
    ],
    match: { title: "Frieren: Beyond Journey's End", year: '2023', detail: 'S01E05 · Phantoms of the Dead' },
    card: { title: 'Frieren', line: "Beyond Journey's End · S01E05 · Phantoms of the Dead" },
    after: "Frieren Beyond Journey's End (2023) - S01E05 - Phantoms of the Dead.mkv",
  },
  {
    id: 'movie',
    tab: 'Movie',
    segments: [
      { text: 'Blade.Runner.2049', kind: 'title', label: 'Title' },
      { text: '.', kind: 'plain' },
      { text: '2017', kind: 'year', label: 'Year' },
      { text: '.2160p.UHD.BluRay.x265', kind: 'noise' },
      { text: '.mkv', kind: 'plain' },
    ],
    match: { title: 'Blade Runner 2049', year: '2017', detail: 'Movie · Directed by Denis Villeneuve' },
    card: { title: 'Blade Runner 2049', line: '2017 · Science Fiction · Denis Villeneuve' },
    after: 'Blade Runner 2049 (2017).mkv',
  },
  {
    id: 'folders',
    tab: 'Name in folders',
    segments: [
      { text: 'TV/', kind: 'folder' },
      { text: 'Mad Men', kind: 'show', label: 'Show' },
      { text: '/', kind: 'folder' },
      { text: 'Season 2', kind: 'season', label: 'Season' },
      { text: '/', kind: 'folder' },
      { text: 'E05', kind: 'episode', label: 'Episode' },
      { text: '.mkv', kind: 'plain' },
    ],
    match: { title: 'Mad Men', year: '2007', detail: 'S02E05 · The New Girl' },
    card: { title: 'Mad Men', line: 'Season 2 · Episode 5 · The New Girl' },
    after: 'Mad Men (2007) - S02E05 - The New Girl.mkv',
  },
];

// ---------------------------------------------------------------------------
// Catalog rows. `hue` tints the generated title card.

export interface CatalogTile {
  before: string;
  after: string;
  /** Big title on the card. */
  cardTitle: string;
  /** Small line under the card title. */
  cardLine: string;
  /** Corner badge, such as S02E03 or 1984. */
  badge: string;
  hue: number;
  /** What Zush noticed, revealed on hover. */
  notes: string[];
  /** Home videos: no database match, AI names it from the frames. */
  footage?: boolean;
}

export interface CatalogRow {
  id: string;
  title: string;
  caption: string;
  tiles: CatalogTile[];
}

export const CATALOG_ROWS: CatalogRow[] = [
  {
    id: 'scene',
    title: 'Scene releases',
    caption: 'Resolution, source, codec, and group tags are dropped. The episode title comes from TheTVDB.',
    tiles: [
      {
        before: 'Game.of.Thrones.S08E06.The.Iron.Throne.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoT.mkv',
        after: 'Game of Thrones (2011) - S08E06 - The Iron Throne.mkv',
        cardTitle: 'Game of Thrones',
        cardLine: 'The Iron Throne',
        badge: 'S08E06',
        hue: 258,
        notes: ['S08E06', '6 release tags removed'],
      },
      {
        before: 'Severance.S02E10.Cold.Harbor.2160p.ATVP.WEB-DL.mkv',
        after: 'Severance (2022) - S02E10 - Cold Harbor.mkv',
        cardTitle: 'Severance',
        cardLine: 'Cold Harbor',
        badge: 'S02E10',
        hue: 286,
        notes: ['S02E10', '2160p ATVP WEB-DL removed'],
      },
      {
        before: 'Stranger.Things.S04E09.Chapter.Nine.The.Piggyback.2160p.NF.WEB-DL.mkv',
        after: 'Stranger Things (2016) - S04E09 - Chapter Nine The Piggyback.mkv',
        cardTitle: 'Stranger Things',
        cardLine: 'Chapter Nine: The Piggyback',
        badge: 'S04E09',
        hue: 236,
        notes: ['Colon dropped, as macOS file names need'],
      },
      {
        before: 'Sherlock.3x02.The.Sign.of.Three.mkv',
        after: 'Sherlock (2010) - S03E02 - The Sign of Three.mkv',
        cardTitle: 'Sherlock',
        cardLine: 'The Sign of Three',
        badge: 'S03E02',
        hue: 312,
        notes: ['3x02 read as S03E02', 'Year added'],
      },
      {
        before: 'Doctor.Who.2005.S01E01.Rose.mkv',
        after: 'Doctor Who (2005) - S01E01 - Rose.mkv',
        cardTitle: 'Doctor Who',
        cardLine: 'Rose',
        badge: 'S01E01',
        hue: 270,
        notes: ['2005 picks the revival, not the 1963 series'],
      },
    ],
  },
  {
    id: 'anime',
    title: 'Anime and fansubs',
    caption: 'Group tags and hashes go. Romaji titles become the English series name.',
    tiles: [
      {
        before: '[SubsPlease] Sousou no Frieren - 05 (1080p) [A1B2C3D4].mkv',
        after: "Frieren Beyond Journey's End (2023) - S01E05 - Phantoms of the Dead.mkv",
        cardTitle: 'Frieren',
        cardLine: 'Phantoms of the Dead',
        badge: 'S01E05',
        hue: 248,
        notes: ['Romaji title matched', 'Season added'],
      },
      {
        before: '[SubsPlease] Dandadan - 01 (1080p) [ABCD1234].mkv',
        after: "DAN DA DAN (2024) - S01E01 - That's How Love Starts, Ya Know!.mkv",
        cardTitle: 'Dan Da Dan',
        cardLine: "That's How Love Starts, Ya Know!",
        badge: 'S01E01',
        hue: 298,
        notes: ['Official spelling from TheTVDB'],
      },
      {
        before: 'Cowboy.Bebop.S01E01.Asteroid.Blues.1080p.BluRay.mkv',
        after: 'Cowboy Bebop (1998) - S01E01 - Asteroid Blues.mkv',
        cardTitle: 'Cowboy Bebop',
        cardLine: 'Asteroid Blues',
        badge: 'S01E01',
        hue: 224,
        notes: ['Episode title picks the 1998 anime over the 2021 remake'],
      },
    ],
  },
  {
    id: 'folders',
    title: 'Names that only make sense in their folder',
    caption: 'When the file says almost nothing, the folders around it fill in the show and season.',
    tiles: [
      {
        before: 'TV/Mad Men/Season 2/E05.mkv',
        after: 'Mad Men (2007) - S02E05 - The New Girl.mkv',
        cardTitle: 'Mad Men',
        cardLine: 'The New Girl',
        badge: 'S02E05',
        hue: 280,
        notes: ['Show and season read from folders'],
      },
      {
        before: 'Media/Shows/Seinfeld/Season 4/Seinfeld 403 The Pitch.mkv',
        after: 'Seinfeld (1989) - S04E03 - The Pitch.mkv',
        cardTitle: 'Seinfeld',
        cardLine: 'The Pitch',
        badge: 'S04E03',
        hue: 322,
        notes: ['403 read as S04E03'],
      },
      {
        before: 'Downloads/True.Detective.S02.1080p.BluRay/E03.mkv',
        after: 'True Detective (2014) - S02E03 - Maybe Tomorrow.mkv',
        cardTitle: 'True Detective',
        cardLine: 'Maybe Tomorrow',
        badge: 'S02E03',
        hue: 244,
        notes: ['Season pack folder supplies S02'],
      },
      {
        before: 'Movies/The Dark Knight (2008)/movie.mkv',
        after: 'The Dark Knight (2008).mkv',
        cardTitle: 'The Dark Knight',
        cardLine: 'Movie',
        badge: '2008',
        hue: 266,
        notes: ['movie.mkv takes its folder title'],
      },
    ],
  },
  {
    id: 'remakes',
    title: 'Same title, different film',
    caption: 'The year decides which film it is, and TheTVDB supplies the official title.',
    tiles: [
      {
        before: 'Dune.1984.Extended.mkv',
        after: 'Dune (1984).mkv',
        cardTitle: 'Dune',
        cardLine: 'David Lynch',
        badge: '1984',
        hue: 292,
        notes: ['Extended tag removed'],
      },
      {
        before: 'Dune 2021.mkv',
        after: 'Dune Part One (2021).mkv',
        cardTitle: 'Dune',
        cardLine: 'Part One',
        badge: '2021',
        hue: 230,
        notes: ['Retitled name from TheTVDB'],
      },
      {
        before: 'The.Thing.1982.mkv',
        after: 'The Thing (1982).mkv',
        cardTitle: 'The Thing',
        cardLine: 'John Carpenter',
        badge: '1982',
        hue: 306,
        notes: ['Not the 2011 prequel'],
      },
      {
        before: 'Amelie.2001.mkv',
        after: 'Amélie (2001).mkv',
        cardTitle: 'Amélie',
        cardLine: 'Movie',
        badge: '2001',
        hue: 254,
        notes: ['Accent restored'],
      },
      {
        before: 'WALL-E.2008.1080p.mkv',
        after: 'WALL·E (2008).mkv',
        cardTitle: 'WALL·E',
        cardLine: 'Movie',
        badge: '2008',
        hue: 276,
        notes: ['Official spelling'],
      },
    ],
  },
  {
    id: 'footage',
    title: 'Your own footage',
    caption: 'Camera clips, screen recordings, and family videos are never matched to a film. AI names them from what is in the frames.',
    tiles: [
      {
        before: 'IMG_4821.MOV',
        after: 'Backyard Birthday Party with Candles.mov',
        cardTitle: 'Home video',
        cardLine: 'Named from the frames',
        badge: 'AI',
        hue: 0,
        notes: ['Camera file, no lookup'],
        footage: true,
      },
      {
        before: 'wedding 2015 highlights.mp4',
        after: 'Wedding Ceremony Highlights by the Lake.mp4',
        cardTitle: 'Home video',
        cardLine: 'Named from the frames',
        badge: 'AI',
        hue: 0,
        notes: ['Not mistaken for a 2015 film'],
        footage: true,
      },
      {
        before: 'Kids soccer game 2023.mp4',
        after: 'Kids Soccer Match Goal Celebration.mp4',
        cardTitle: 'Home video',
        cardLine: 'Named from the frames',
        badge: 'AI',
        hue: 0,
        notes: ['Looks like a title, rejected on purpose'],
        footage: true,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Recognition order. This is a real fallback sequence, so it is numbered.

export const RECOGNITION_STEPS = [
  {
    title: 'The file name and its folders',
    meta: 'No AI',
    description:
      'Reads S02E03, 1x02, 403, E01-E03, air dates, and absolute anime numbers. Folders like Mad Men/Season 2 fill in what the file leaves out.',
  },
  {
    title: 'Tags inside the file',
    meta: 'No AI',
    description:
      'When the name is just 123.mp4, Zush reads the show, season, and episode tags stored inside MP4, MOV, and MKV files.',
  },
  {
    title: 'The frames',
    meta: 'AI, then checked',
    description:
      'Last resort: AI looks for a title card or credits. A guess becomes a name only after TheTVDB confirms it.',
  },
] as const;

// ---------------------------------------------------------------------------
// Naming blocks. Keys match the app's `{placeholders}`.

export type MediaBlockKey =
  | 'media_title'
  | 'show'
  | 'season'
  | 'episode'
  | 'episode_code'
  | 'episode_title'
  | 'movie_title'
  | 'director'
  | 'media_genre'
  | 'runtime'
  | 'media_year';

export const MEDIA_BLOCKS: { key: MediaBlockKey; label: string; hint: string }[] = [
  { key: 'media_title', label: 'Media Title', hint: 'Show (Year) - S01E02 - Episode Title, or Movie (Year)' },
  { key: 'show', label: 'Show', hint: 'TV show name' },
  { key: 'season', label: 'Season', hint: 'Season number such as 02' },
  { key: 'episode', label: 'Episode', hint: 'Episode number such as 05' },
  { key: 'episode_code', label: 'Episode Code', hint: 'Season and episode such as S02E05' },
  { key: 'episode_title', label: 'Episode Title', hint: 'Title of the episode' },
  { key: 'movie_title', label: 'Movie Title', hint: 'Title of the movie' },
  { key: 'director', label: 'Director', hint: 'Movie director' },
  { key: 'media_genre', label: 'Genre', hint: 'Main genre of the movie or show' },
  { key: 'runtime', label: 'Runtime', hint: 'Running time in minutes' },
  { key: 'media_year', label: 'Year', hint: 'First air year of the show or release year of the movie' },
];

export interface BuilderFile {
  kind: 'episode' | 'movie';
  before: string;
  extension: string;
  fields: Partial<Record<MediaBlockKey, string>>;
}

export const BUILDER_FILES: BuilderFile[] = [
  {
    kind: 'episode',
    before: 'Breaking.Bad.S02E03.720p.HDTV.x264-CTU.mkv',
    extension: 'mkv',
    fields: {
      media_title: 'Breaking Bad (2008) - S02E03 - Bit by a Dead Bee',
      show: 'Breaking Bad',
      season: '02',
      episode: '03',
      episode_code: 'S02E03',
      episode_title: 'Bit by a Dead Bee',
      media_genre: 'Crime',
      runtime: '47',
      media_year: '2008',
    },
  },
  {
    kind: 'movie',
    before: 'Heat.1995.1080p.mp4',
    extension: 'mp4',
    fields: {
      media_title: 'Heat (1995)',
      movie_title: 'Heat',
      director: 'Michael Mann',
      media_genre: 'Crime',
      runtime: '170',
      media_year: '1995',
    },
  },
];

export const BUILDER_PRESETS: { id: string; label: string; blocks: MediaBlockKey[] }[] = [
  { id: 'library', label: 'Library', blocks: ['media_title'] },
  { id: 'episode-first', label: 'Episode first', blocks: ['episode_code', 'show', 'episode_title'] },
  { id: 'directors', label: "Director's shelf", blocks: ['director', 'media_year', 'movie_title'] },
  { id: 'collector', label: 'Collector', blocks: ['movie_title', 'media_year', 'media_genre', 'runtime'] },
];

// ---------------------------------------------------------------------------
// Season sorting demo. Folder names follow the Auto defaults in
// folder_planning_prompt_policy.json; the custom rules are the examples the
// app's Folder rules editor offers for Movies & TV templates.

export interface SortFile {
  id: string;
  before: string;
  after: string;
  show?: string;
  season?: number;
  genre?: string;
  decade?: string;
}

export const SORT_FILES: SortFile[] = [
  { id: 'bb201', before: 'Breaking.Bad.S01E01.720p.BluRay.mkv', after: 'Breaking Bad (2008) - S01E01 - Pilot.mkv', show: 'Breaking Bad', season: 1 },
  { id: 'bb203', before: 'Breaking.Bad.S02E03.720p.HDTV.x264-CTU.mkv', after: 'Breaking Bad (2008) - S02E03 - Bit by a Dead Bee.mkv', show: 'Breaking Bad', season: 2 },
  { id: 'bb204', before: 'breaking.bad.s02e04.mkv', after: 'Breaking Bad (2008) - S02E04 - Down.mkv', show: 'Breaking Bad', season: 2 },
  { id: 'sv107', before: 'Severance.S01E07.1080p.ATVP.WEB-DL.mkv', after: 'Severance (2022) - S01E07 - Defiant Jazz.mkv', show: 'Severance', season: 1 },
  { id: 'sv210', before: 'Severance.S02E10.Cold.Harbor.2160p.ATVP.WEB-DL.mkv', after: 'Severance (2022) - S02E10 - Cold Harbor.mkv', show: 'Severance', season: 2 },
  { id: 'heat', before: 'Heat.1995.1080p.mp4', after: 'Heat (1995).mp4', genre: 'Crime', decade: '1990s' },
  { id: 'pulp', before: 'Pulp Fiction (1994) [1080p].mkv', after: 'Pulp Fiction (1994).mkv', genre: 'Crime', decade: '1990s' },
  { id: 'matrix', before: 'The.Matrix.1999.1080p.BluRay.x264-SPARKS.mkv', after: 'The Matrix (1999).mkv', genre: 'Science Fiction', decade: '1990s' },
  { id: 'spirited', before: 'Spirited.Away.2001.1080p.BluRay.mkv', after: 'Spirited Away (2001).mkv', genre: 'Animation', decade: '2000s' },
  { id: 'br2049', before: 'Blade.Runner.2049.2017.2160p.UHD.BluRay.x265.mkv', after: 'Blade Runner 2049 (2017).mkv', genre: 'Science Fiction', decade: '2010s' },
];

export type SortRuleId = 'auto' | 'per-show' | 'genre' | 'decade';

export const SORT_RULES: { id: SortRuleId; label: string; prompt: string }[] = [
  { id: 'auto', label: 'Auto', prompt: 'Leave Folder rules empty' },
  { id: 'per-show', label: 'One folder per TV show', prompt: 'One folder per TV show' },
  { id: 'genre', label: 'Movies by genre', prompt: 'Movies by genre' },
  { id: 'decade', label: 'Movies by decade', prompt: 'Movies by decade' },
];

// ---------------------------------------------------------------------------
// "About" details, styled after a streaming title's details panel.

export const ABOUT_ROWS: { label: string; value: string }[] = [
  {
    label: 'Recognizes',
    value: 'Episodes (S01E02, 1x02, 102, multi-episode files, specials), absolute anime numbering, date-based shows, and movies by title and year.',
  },
  { label: 'Data', value: 'TheTVDB, with Wikidata as a backup.' },
  { label: 'Writes', value: 'Show (Year) - S01E02 - Episode Title, or Movie (Year). Or any pattern from 11 blocks.' },
  { label: 'Plays well with', value: 'Plex, Jellyfin, Emby, Kodi, and Infuse.' },
  { label: 'Formats', value: 'MKV, MP4, MOV, M4V, AVI, WMV, TS, and more.' },
  { label: 'Sorting', value: 'One folder per show and season, a Movies folder, or your own rule in plain language.' },
  { label: 'Automation', value: 'Monitor names and sorts new downloads as they land.' },
  {
    label: 'Privacy',
    value: 'Lookups send only the parsed title, year, and episode numbers. Never file paths or the video itself.',
  },
  { label: 'Offline', value: 'In Local AI mode, lookups are skipped and names come from the file name alone.' },
  { label: 'Requires', value: `Zush 3.15 for Mac, macOS ${APP_CONFIG.min_macos_version} ${APP_CONFIG.min_macos_name} or later.` },
  { label: 'Price', value: MOVIES_TV_PRICE_LINE },
];

export const ABOUT_THIS_FEATURE_IS = ['Precise', 'Private', 'Undoable'];

// ---------------------------------------------------------------------------

export const MOVIES_TV_FAQ = [
  {
    question: 'How do I rename TV episodes for Plex on a Mac?',
    answer:
      'Drop the episodes into Zush, choose the Movies & TV template, review the names, and click Rename. Zush writes Show (Year) - S01E02 - Episode Title, the episode format Plex documents, and Movie (Year) for films.',
  },
  {
    question: 'Where do the show and episode titles come from?',
    answer:
      'From TheTVDB, with Wikidata as a backup. Zush reads the show, season, and episode from the file name, its folders, or tags inside the file, then confirms them against the database before naming anything.',
  },
  {
    question: 'Does it work with Jellyfin, Emby, Kodi, and Infuse?',
    answer:
      'Yes. These players match episodes by the S01E02 code and films by title and year, which is exactly what the Movies & TV template writes.',
  },
  {
    question: 'Can Zush sort episodes into season folders?',
    answer:
      'Yes. Turn on Sort and Zush files each episode into a folder such as Breaking Bad - Season 2 and puts films in Movies. You can also write your own rule, such as "Movies by genre". Folders are created one level deep inside the destination you choose.',
  },
  {
    question: 'Which file name patterns does it understand?',
    answer:
      'S01E02, 1x02, three-digit codes like 403, multi-episode files (E01-E03, E01E02), Season 2 Episode 3, air dates for talk shows, absolute anime numbering such as One Piece - 1050, season-pack folders, and movie names with a year. Release tags like 1080p, WEB-DL, x265, and group names are removed.',
  },
  {
    question: 'Will it rename my home videos as movies?',
    answer:
      'No. Camera files, screen recordings, and personal clips such as "wedding 2015 highlights" are never matched to a film. Zush names them from what is in the frames instead.',
  },
  {
    question: 'What leaves my Mac during a lookup?',
    answer:
      'A lookup sends only the parsed title, year, and season and episode numbers. File paths and the video itself are never part of it. In Local AI mode, lookups are skipped and names come from the file name alone.',
  },
  {
    question: 'Is Zush a FileBot alternative for Mac?',
    answer:
      'For renaming a Mac movie and TV library, yes: Zush matches episodes and films against TheTVDB, writes Plex-style names, sorts episodes into season folders, and previews every change with undo. It also renames the rest of your files, such as photos, PDFs, and documents, by their content.',
  },
  {
    question: 'How much does it cost?',
    answer: `${MOVIES_TV_PRICE_LINE} Movies & TV works in Zush for Mac 3.15 and later.`,
  },
] as const;

export const MOVIES_TV_DESCRIPTION =
  'Rename movies and TV episodes on Mac with titles checked against TheTVDB: Show (Year) - S01E02 - Episode Title or Movie (Year). Sort episodes into season folders.';

export const MOVIES_TV_JSON_LD = buildFeaturePageJsonLd({
  pageName: MOVIES_TV_PAGE_TITLE,
  keywords:
    'tv show renamer mac, movie renamer mac, rename tv episodes, rename movies for plex, plex naming, jellyfin naming, rename anime episodes, sort tv episodes into season folders, thetvdb renamer, filebot alternative mac',
  howTo: {
    name: 'Rename movies and TV episodes on a Mac with Zush',
    description:
      'Use the Movies & TV template in Zush for Mac to give video files library-ready names checked against TheTVDB, then sort episodes into season folders.',
    steps: [
      {
        name: 'Choose the Movies & TV template',
        text: 'In AI Rename, pick the Movies & TV template. It uses the Media Title block: Show (Year) - S01E02 - Episode Title, or Movie (Year).',
      },
      {
        name: 'Drop in your video files',
        text: 'Add episodes and films, including MKV, MP4, MOV, and AVI. Zush reads the file names, folders, and embedded tags, then confirms each title on TheTVDB.',
      },
      {
        name: 'Turn on Sort and rename',
        text: 'Optionally turn on Sort to file episodes into show and season folders. Review the preview, then click Rename. Every change can be undone in Activity.',
      },
    ],
  },
  faqItems: [...MOVIES_TV_FAQ],
  page: {
    pagePath: MOVIES_TV_PAGE_PATH,
    description: MOVIES_TV_DESCRIPTION,
    featureList: [
      'Recognizes TV episodes and movies from file names, folders, and embedded tags',
      'Titles, years, and episode titles confirmed against TheTVDB, with Wikidata as a backup',
      'Plex-style names: Show (Year) - S01E02 - Episode Title, or Movie (Year)',
      '11 Movies & TV naming blocks, including Director, Genre, and Runtime',
      'Sorts episodes into show and season folders',
      'Absolute anime numbering, date-based shows, and multi-episode files',
      'MKV, MP4, MOV, AVI, and WMV support',
    ],
  },
});
