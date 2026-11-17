/**
 * Single source of truth for competitor citations used in comparison posts.
 *
 * Every comparison article renders its "Sources" block from here, so one edit
 * updates every post that cites the same vendor. Keep `checked` honest: change
 * it only after re-reading the linked vendor pages.
 *
 * Ratings: official stores (Mac App Store, Microsoft Store, Setapp) and
 * independent editorial scores only. No user-voted directories (MacUpdate,
 * Product Hunt, G2, AlternativeTo) and no vendor self-reported ratings.
 */

export interface CompetitorSource {
  label: string;
  url: string;
}

export interface CompetitorRating {
  source: string;
  value: string;
  count?: number;
  url: string;
}

export interface Competitor {
  name: string;
  site: string;
  checked: string;
  sources: CompetitorSource[];
  ratings?: CompetitorRating[];
  /** Short note shown next to the sources, e.g. a site outage. */
  note?: string;
}

const CHECKED = '2026-11-17';

export const ZUSH_RATINGS: CompetitorRating[] = [
  {
    source: 'Microsoft Store (US)',
    value: '5.0/5',
    count: 8,
    url: 'https://apps.microsoft.com/detail/9nd4wvzsdq3x?hl=en-US&gl=US',
  },
  {
    source: 'Softpedia editorial review',
    value: '4.5/5',
    url: 'https://www.softpedia.com/get/Artificial-Intelligence-Generative-AI/Zush.shtml',
  },
];
export const ZUSH_RATINGS_CHECKED = CHECKED;

export const COMPETITORS = {
  renameclick: {
    name: 'RenameClick',
    site: 'https://rename.click/',
    checked: CHECKED,
    sources: [
      { label: 'pricing', url: 'https://rename.click/#pricing' },
      { label: 'changelog', url: 'https://rename.click/changelogs' },
      { label: 'supported files', url: 'https://rename.click/docs/getting-started/supported-files' },
      { label: 'how it works', url: 'https://rename.click/docs/getting-started/how-it-works' },
    ],
    ratings: [
      { source: 'Microsoft Store (US)', value: '3.0/5', count: 6, url: 'https://apps.microsoft.com/detail/9nwf30k6gfqg?hl=en-us&gl=US' },
      { source: 'Softpedia editorial review', value: '3.5/5', url: 'https://www.softpedia.com/get/File-managers/RenameClick.shtml' },
    ],
  },
  airenamer: {
    name: 'AI Renamer',
    site: 'https://airenamer.app/',
    checked: CHECKED,
    sources: [
      { label: 'pricing', url: 'https://airenamer.app/pricing' },
      { label: 'changelog', url: 'https://airenamer.app/changelog' },
      { label: 'Watch Folder', url: 'https://airenamer.app/watch-folder' },
      { label: 'FAQ', url: 'https://airenamer.app/faq' },
    ],
  },
  'ai-renamer-cli': {
    name: 'AI Renamer CLI (ozgrozer/ai-renamer)',
    site: 'https://github.com/ozgrozer/ai-renamer',
    checked: CHECKED,
    sources: [{ label: 'GitHub README', url: 'https://github.com/ozgrozer/ai-renamer' }],
  },
  'renamer-ai': {
    name: 'Renamer.ai',
    site: 'https://renamer.ai/',
    checked: CHECKED,
    sources: [
      { label: 'pricing', url: 'https://renamer.ai/pricing' },
      { label: 'changelog', url: 'https://renamer.ai/changelog' },
      { label: 'processing options', url: 'https://renamer.ai/guides/processing-options' },
    ],
    ratings: [
      { source: 'Softpedia editorial review', value: '4.5/5', url: 'https://www.softpedia.com/get/Programming/File-Editors/Renamer-ai.shtml' },
    ],
  },
  namequick: {
    name: 'NameQuick',
    site: 'https://www.namequick.app/',
    checked: CHECKED,
    sources: [
      { label: 'pricing', url: 'https://www.namequick.app/pricing' },
      { label: 'changelog', url: 'https://www.namequick.app/changelog' },
      { label: 'licenses and credits', url: 'https://www.namequick.app/docs/license-credits' },
    ],
  },
  filesdesk: {
    name: 'FilesDesk',
    site: 'https://filesdesk.app/',
    checked: CHECKED,
    sources: [
      { label: 'pricing', url: 'https://filesdesk.app/pricing' },
      { label: 'FAQ', url: 'https://filesdesk.app/docs/help/faq.html' },
      { label: 'refunds', url: 'https://filesdesk.app/refunds' },
    ],
  },
  'files-magic-ai': {
    name: 'Files Magic AI',
    site: 'https://1dot.ai/files-magic-ai',
    checked: CHECKED,
    sources: [
      { label: 'product and pricing', url: 'https://1dot.ai/files-magic-ai' },
      { label: 'Magic Rename', url: 'https://1dot.ai/files-magic-ai/magic-rename' },
      { label: 'releases', url: 'https://github.com/1dotaidev/filesmagicaidev/releases' },
    ],
  },
  sortio: {
    name: 'Sortio',
    site: 'https://www.getsortio.com/',
    checked: CHECKED,
    sources: [
      { label: 'pricing', url: 'https://www.getsortio.com/pricing' },
      { label: 'changelog', url: 'https://www.getsortio.com/changelog' },
      { label: 'local models', url: 'https://getsortio.com/docs/local-models' },
    ],
  },
  wisfile: {
    name: 'Wisfile',
    site: 'https://www.wisfile.ai/',
    checked: CHECKED,
    sources: [
      { label: 'home', url: 'https://www.wisfile.ai/' },
      { label: 'FAQ', url: 'https://www.wisfile.ai/faq' },
    ],
  },
  sparkle: {
    name: 'Sparkle',
    site: 'https://makeitsparkle.co/',
    checked: CHECKED,
    sources: [
      { label: 'plans', url: 'https://app.makeitsparkle.co/plans' },
      { label: 'how Sparkle works', url: 'https://help.makeitsparkle.co/en/articles/13225419-how-sparkle-works' },
    ],
  },
  floxtop: {
    name: 'Floxtop',
    site: 'https://floxtop.com/',
    checked: CHECKED,
    sources: [
      { label: 'pricing and FAQ', url: 'https://floxtop.com/' },
      { label: 'changelog', url: 'https://floxtop.com/changelog.html' },
    ],
  },
  'renamed-to': {
    name: 'Renamed.to',
    site: 'https://www.renamed.to/',
    checked: CHECKED,
    sources: [{ label: 'pricing', url: 'https://www.renamed.to/pricing' }],
  },
  'file-renamer-ai': {
    name: 'File Renamer AI',
    site: 'https://filerenamerai.com/',
    checked: CHECKED,
    sources: [{ label: 'home and pricing', url: 'https://filerenamerai.com/' }],
  },
  namethispic: {
    name: 'NameThisPic',
    site: 'https://namethispic.com/',
    checked: CHECKED,
    sources: [{ label: 'home and pricing', url: 'https://namethispic.com/' }],
  },
  riffo: {
    name: 'Riffo',
    site: 'https://riffo.ai/',
    checked: CHECKED,
    sources: [],
    note: 'riffo.ai refused connections when we checked',
  },
  hazel: {
    name: 'Hazel',
    site: 'https://www.noodlesoft.com/',
    checked: CHECKED,
    sources: [
      { label: 'store', url: 'https://store.noodlesoft.com/store/' },
      { label: 'release notes', url: 'https://www.noodlesoft.com/?p=2018' },
    ],
    ratings: [
      { source: 'Softpedia editorial review', value: '5.0/5', url: 'https://mac.softpedia.com/get/System-Utilities/Hazel.shtml' },
    ],
  },
  'file-juggler': {
    name: 'File Juggler',
    site: 'https://www.filejuggler.com/',
    checked: CHECKED,
    sources: [
      { label: 'home and pricing', url: 'https://www.filejuggler.com/' },
      { label: 'news', url: 'https://www.filejuggler.com/news/' },
    ],
    ratings: [
      { source: 'Softpedia editorial review', value: '4.5/5', url: 'https://www.softpedia.com/get/System/File-Management/FileJuggler.shtml' },
    ],
  },
  dropit: {
    name: 'DropIt',
    site: 'http://www.dropitproject.com/',
    checked: CHECKED,
    sources: [{ label: 'releases', url: 'https://sourceforge.net/projects/dropit/files/DropIt/' }],
  },
  'advanced-renamer': {
    name: 'Advanced Renamer',
    site: 'https://www.advancedrenamer.com/',
    checked: CHECKED,
    sources: [
      { label: 'purchase', url: 'https://www.advancedrenamer.com/purchase' },
      { label: 'version log', url: 'https://www.advancedrenamer.com/versionlog' },
    ],
    ratings: [
      { source: 'Microsoft Store (US)', value: '4.2/5', count: 23, url: 'https://apps.microsoft.com/detail/xp9md3s1kfcph1?hl=en-us&gl=US' },
      { source: 'Softpedia editorial review', value: '3.5/5', url: 'https://www.softpedia.com/get/System/File-Management/Advanced-Renamer.shtml' },
    ],
  },
  'bulk-rename-utility': {
    name: 'Bulk Rename Utility',
    site: 'https://www.bulkrenameutility.co.uk/',
    checked: CHECKED,
    sources: [
      { label: 'licensing', url: 'https://www.bulkrenameutility.co.uk/Buy.php' },
      { label: 'download', url: 'https://www.bulkrenameutility.co.uk/Download.php' },
    ],
    ratings: [
      { source: 'Softpedia editorial review', value: '4.0/5', url: 'https://www.softpedia.com/get/System/File-Management/Bulk-Rename-Utility.shtml' },
    ],
  },
  'a-better-finder-rename': {
    name: 'A Better Finder Rename',
    site: 'https://www.publicspace.net/ABetterFinderRename/',
    checked: CHECKED,
    sources: [{ label: 'product page', url: 'https://www.publicspace.net/ABetterFinderRename/' }],
  },
  namechanger: {
    name: 'NameChanger',
    site: 'https://mrrsoftware.com/namechanger/',
    checked: CHECKED,
    sources: [{ label: 'product page', url: 'https://mrrsoftware.com/namechanger/' }],
  },
  powerrename: {
    name: 'PowerRename (PowerToys)',
    site: 'https://learn.microsoft.com/en-us/windows/powertoys/powerrename',
    checked: CHECKED,
    sources: [
      { label: 'documentation', url: 'https://learn.microsoft.com/en-us/windows/powertoys/powerrename' },
      { label: 'releases', url: 'https://github.com/microsoft/PowerToys/releases' },
    ],
  },
  renamer: {
    name: 'ReNamer',
    site: 'https://www.den4b.com/products/renamer',
    checked: CHECKED,
    sources: [{ label: 'editions', url: 'https://www.den4b.com/compare/renamer' }],
  },
  devonthink: {
    name: 'DEVONthink',
    site: 'https://www.devontechnologies.com/apps/devonthink',
    checked: CHECKED,
    sources: [
      { label: 'pricing', url: 'https://www.devontechnologies.com/apps/devonthink/pricing' },
      { label: 'editions', url: 'https://www.devontechnologies.com/apps/devonthink/editions' },
    ],
  },
  'paperless-ngx': {
    name: 'Paperless-ngx',
    site: 'https://docs.paperless-ngx.com/',
    checked: CHECKED,
    sources: [{ label: 'releases', url: 'https://github.com/paperless-ngx/paperless-ngx/releases' }],
  },
  lightroom: {
    name: 'Adobe Lightroom',
    site: 'https://www.adobe.com/products/photoshop-lightroom.html',
    checked: CHECKED,
    sources: [{ label: 'plans', url: 'https://www.adobe.com/products/photoshop-lightroom/plans.html' }],
  },
  excire: {
    name: 'Excire Foto',
    site: 'https://excire.com/en/',
    checked: CHECKED,
    sources: [{ label: 'trial', url: 'https://excire.com/en/trial' }],
  },
  mylio: {
    name: 'Mylio Photos',
    site: 'https://mylio.com/',
    checked: CHECKED,
    sources: [{ label: 'plans', url: 'https://mylio.com/plans/' }],
  },
  digikam: {
    name: 'digiKam',
    site: 'https://www.digikam.org/',
    checked: CHECKED,
    sources: [{ label: 'home', url: 'https://www.digikam.org/' }],
  },
  'microsoft-photos': {
    name: 'Microsoft Photos',
    site: 'https://support.microsoft.com/en-us/windows/ai/ai-apps/group-photos-by-faces',
    checked: CHECKED,
    sources: [{ label: 'People and faces', url: 'https://support.microsoft.com/en-us/Windows/ai/ai-apps/group-photos-by-faces' }],
  },
  'photo-mechanic': {
    name: 'Photo Mechanic',
    site: 'https://home.camerabits.com/',
    checked: CHECKED,
    sources: [{ label: 'home', url: 'https://home.camerabits.com/' }],
  },
  'gemini-2': {
    name: 'Gemini 2',
    site: 'https://macpaw.com/gemini',
    checked: CHECKED,
    sources: [{ label: 'product page', url: 'https://macpaw.com/gemini' }],
  },
  dupeguru: {
    name: 'dupeGuru',
    site: 'https://dupeguru.voltaicideas.net/',
    checked: CHECKED,
    sources: [{ label: 'home', url: 'https://dupeguru.voltaicideas.net/' }],
  },
  renamerx: {
    name: 'RenamerX',
    site: 'https://renamerx.com/',
    checked: CHECKED,
    sources: [
      { label: 'home, pricing and formats', url: 'https://renamerx.com/' },
      { label: 'pricing', url: 'https://renamerx.com/pricing' },
      { label: 'docs', url: 'https://renamerx.com/docs' },
    ],
  },
  nudgefile: {
    name: 'NudgeFile',
    site: 'https://nudgefile.com/',
    checked: CHECKED,
    sources: [
      { label: 'home', url: 'https://nudgefile.com/' },
      { label: 'Microsoft Store', url: 'https://apps.microsoft.com/detail/9N3HMKTWZZGJ' },
    ],
  },
  foldora: {
    name: 'Foldora',
    site: 'https://foldoraai.com/',
    checked: CHECKED,
    sources: [{ label: 'home and pricing', url: 'https://foldoraai.com/' }],
  },
  'ai-file-sorter': {
    name: 'AI File Sorter',
    site: 'https://filesorter.app/',
    checked: CHECKED,
    sources: [
      { label: 'GitHub', url: 'https://github.com/hyperfield/ai-file-sorter' },
      { label: 'releases', url: 'https://github.com/hyperfield/ai-file-sorter/releases' },
    ],
  },
  'apple-photos': {
    name: 'Apple Photos',
    site: 'https://support.apple.com/guide/photos/welcome/mac',
    checked: CHECKED,
    sources: [{ label: 'Photos User Guide', url: 'https://support.apple.com/guide/photos/welcome/mac' }],
  },
  'capture-one': {
    name: 'Capture One Pro',
    site: 'https://www.captureone.com/',
    checked: CHECKED,
    sources: [{ label: 'pricing', url: 'https://www.captureone.com/en/pricing' }],
  },
  tonfotos: {
    name: 'Tonfotos',
    site: 'https://tonfotos.com/',
    checked: CHECKED,
    sources: [{ label: 'home and pricing', url: 'https://tonfotos.com/' }],
  },
  acdsee: {
    name: 'ACDSee Photo Studio Home',
    site: 'https://www.acdsee.com/en/products/photo-studio-home/',
    checked: CHECKED,
    sources: [
      { label: 'product page', url: 'https://www.acdsee.com/en/products/photo-studio-home/' },
      { label: 'store', url: 'https://www.acdsee.com/en/store/' },
    ],
  },
  zoner: {
    name: 'Zoner Studio',
    site: 'https://www.zoner.com/',
    checked: CHECKED,
    sources: [{ label: 'buy', url: 'https://www.zoner.com/en/buy' }],
  },
  xnview: {
    name: 'XnView MP',
    site: 'https://www.xnview.com/en/xnviewmp/',
    checked: CHECKED,
    sources: [{ label: 'product page', url: 'https://www.xnview.com/en/xnviewmp/' }],
  },
  faststone: {
    name: 'FastStone Image Viewer',
    site: 'https://www.faststone.org/FSViewerDetail.htm',
    checked: CHECKED,
    sources: [{ label: 'product page', url: 'https://www.faststone.org/FSViewerDetail.htm' }],
  },
  irfanview: {
    name: 'IrfanView',
    site: 'https://www.irfanview.com/',
    checked: CHECKED,
    sources: [
      { label: 'home', url: 'https://www.irfanview.com/' },
      { label: 'about and license', url: 'https://www.irfanview.com/main_what_is_engl.htm' },
    ],
  },
  'nektony-duplicate-file-finder': {
    name: 'Duplicate File Finder (Nektony)',
    site: 'https://nektony.com/duplicate-finder-free',
    checked: CHECKED,
    sources: [{ label: 'product page', url: 'https://nektony.com/duplicate-finder-free' }],
  },
  cleanmymac: {
    name: 'CleanMyMac',
    site: 'https://macpaw.com/cleanmymac',
    checked: CHECKED,
    sources: [{ label: 'product page', url: 'https://macpaw.com/cleanmymac' }],
  },
} satisfies Record<string, Competitor>;

export type CompetitorId = keyof typeof COMPETITORS;
