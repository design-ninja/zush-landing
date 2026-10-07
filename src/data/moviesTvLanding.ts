import { APP_CONFIG } from '@/constants';
import { PRO_PRICING } from '@/constants/pricing';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

// English-only, Mac-only page. The examples use names from the app's media
// recognition corpus; TheTVDB supplies the show, film, year, and episode data.
// Sorting creates one folder level inside the chosen destination.
export const MOVIES_TV_PAGE_PATH = '/rename-movies-and-tv-shows';
export const MOVIES_TV_PAGE_TITLE = 'Rename Movies and TV Shows on Mac';
export const TVDB_URL = 'https://thetvdb.com';
export const MOVIES_TV_FREE_RENAMES = APP_CONFIG.free_tier_limit;
export const MOVIES_TV_PRICE_LINE = `${MOVIES_TV_FREE_RENAMES} free renames. PRO is ${PRO_PRICING.monthly.label}/month or ${PRO_PRICING.oneTime.label} once.`;
export const MOVIES_TV_FINAL_LINE = 'Start for free. No credit card required to sign up.';

export const MOVIES_TV_EXAMPLES = [
  {
    kind: 'TV episode',
    title: 'Breaking Bad',
    detail: 'Season 2 · Episode 3',
    before: 'Breaking.Bad.S02E03.720p.HDTV.x264-CTU.mkv',
    after: 'Breaking Bad (2008) - S02E03 - Bit by a Dead Bee.mkv',
  },
  {
    kind: 'Movie',
    title: 'Blade Runner 2049',
    detail: '2017',
    before: 'Blade.Runner.2049.2017.2160p.UHD.BluRay.x265.mkv',
    after: 'Blade Runner 2049 (2017).mkv',
  },
  {
    kind: 'Anime',
    title: 'Frieren',
    detail: 'Season 1 · Episode 5',
    before: '[SubsPlease] Sousou no Frieren - 05 (1080p) [A1B2C3D4].mkv',
    after: "Frieren Beyond Journey's End (2023) - S01E05 - Phantoms of the Dead.mkv",
  },
] as const;

export const MOVIES_TV_FAQ = [
  {
    question: 'How do I name TV shows and movies for Plex?',
    answer:
      'The Movies & TV template writes Show (Year) - S01E02 - Episode Title for episodes and Movie (Year) for films. Plex recommends separate movie and TV library roots, with episodes inside show and season folders. Zush can add one folder level inside your chosen destination; review the layout before renaming. The filenames also carry the title and episode details used by Jellyfin and Infuse.',
  },
  {
    question: 'Where do the titles come from?',
    answer:
      'Zush reads the file name, surrounding folders, and embedded tags, then checks the match against reference data. If those clues are not enough, it can inspect video frames as a last resort.',
  },
  {
    question: 'Can I choose a different naming pattern?',
    answer:
      'Yes. The default Movies & TV template is ready to use, and you can build your own from blocks such as Show, Episode Code, Episode Title, Movie Title, Year, Director, Genre, and Runtime.',
  },
  {
    question: 'Will it move my files or rename them immediately?',
    answer:
      'You preview the changes before you rename. Sorting is optional: turn it on to place episodes in a show-and-season folder and films in Movies, one folder level inside the destination you choose. You can undo changes in Activity.',
  },
  {
    question: 'How much does it cost?',
    answer: `${MOVIES_TV_PRICE_LINE} Movies & TV is available in Zush 3.15 and later for Mac.`,
  },
] as const;

export const MOVIES_TV_DESCRIPTION =
  'Rename movies and TV episodes on Mac. Match real titles, preview Plex-style filenames, and optionally sort by show and season.';

export const MOVIES_TV_JSON_LD = buildFeaturePageJsonLd({
  pageName: MOVIES_TV_PAGE_TITLE,
  keywords:
    'tv show renamer mac, movie renamer mac, rename tv episodes, rename movies for plex, plex naming convention, jellyfin naming, rename anime episodes, sort tv episodes into season folders, thetvdb renamer',
  howTo: {
    name: 'Rename movies and TV episodes on a Mac with Zush',
    description: MOVIES_TV_DESCRIPTION,
    steps: [
      {
        name: 'Add movies and episodes',
        text: 'Drop your video files into Zush and choose the Movies & TV template.',
      },
      {
        name: 'Preview library-ready names',
        text: 'Zush reads file names, folders, and embedded tags, then checks recognized titles and episodes against TheTVDB.',
      },
      {
        name: 'Rename and optionally sort',
        text: 'Review the preview, turn on Sort if you want season folders, and click Rename. Changes can be undone in Activity.',
      },
    ],
  },
  faqItems: [...MOVIES_TV_FAQ],
  page: {
    pagePath: MOVIES_TV_PAGE_PATH,
    description: MOVIES_TV_DESCRIPTION,
    featureList: [
      'Matches movies and TV episodes against TheTVDB, with Wikidata as a backup',
      'Names episodes Show (Year) - S01E02 - Episode Title and films Movie (Year)',
      'Previews names before renaming, with undo in Activity',
      'Optionally sorts episodes into one show-and-season folder per season',
      'Custom naming patterns with Movies & TV blocks',
    ],
  },
});
