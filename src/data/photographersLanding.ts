import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

export const PHOTOGRAPHERS_PAGE_PATH = '/for-photographers';
export const PHOTOGRAPHERS_PAGE_TITLE = 'AI File Renamer for Photographers & Videographers';

export const PHOTOGRAPHERS_HERO = {
  eyebrow: 'For photographers and videographers',
  titleLead: 'AI file renaming for photographers: ',
  titleAccent: 'organize shoots by project, scene, and take',
  subtitle:
    'Zush is a desktop AI file renamer for photographers and videographers. It combines available metadata with visual content to name RAW photos, JPEGs, and supported video clips, while your catalog, editor, or NLE remains the creative system.',
  trustLine: [
    'RAW, photo, and video formats',
    'Custom naming Templates',
    'Preview and undo every batch',
  ],
  photo: {
    alt: 'A photographer and videographer reviewing a shoot together in a daylight studio',
  },
} as const;

export interface PhotographerField {
  label: string;
  before: string;
  after: string;
  emphasis?: string;
}

export const PHOTOGRAPHERS_FIELDS: PhotographerField[] = [
  { label: 'Capture date', before: 'DSC_4831.NEF', after: '2026-06-14 – Ortega Wedding – Ceremony', emphasis: '2026-06-14' },
  { label: 'Client / Project', before: 'IMG_7294.CR3', after: 'Ortega Wedding – Portraits – Courtyard', emphasis: 'Ortega Wedding' },
  { label: 'Subject', before: 'DSCF1042.RAF', after: 'Maya Chen – Studio Portrait – Look 02', emphasis: 'Maya Chen' },
  { label: 'Scene / Location', before: 'A001_C003.mov', after: 'River House – Golden Hour Exterior – Take 03', emphasis: 'Golden Hour Exterior' },
  { label: 'Shot type', before: 'MVI_8842.MP4', after: 'Northwind Campaign – Product Close-Up – Take 02', emphasis: 'Product Close-Up' },
  { label: 'Take', before: 'C0048.MOV', after: 'Founder Interview – Camera A – Take 04', emphasis: 'Take 04' },
  { label: 'Camera', before: 'A003_0614AB.MOV', after: 'Founder Interview – Camera A – Take 03', emphasis: 'Camera A' },
  { label: 'Orientation', before: 'IMG_9107.ARW', after: 'Coastal Editorial – Portrait – Vertical', emphasis: 'Vertical' },
  { label: 'Deliverable type', before: 'final_final_03.mp4', after: 'Northwind Launch – Social Cut – 9x16', emphasis: 'Social Cut' },
  { label: 'Custom field — describe it in plain language', before: 'DSC_4908.NEF', after: 'Ortega Wedding – First Dance – Select', emphasis: 'First Dance' },
];

export interface PhotographerPrivacyMode {
  id: 'cloud' | 'byok' | 'offline';
  kind: 'cloud-ai' | 'byok' | 'offline-ai';
  title: string;
  badge?: string;
  badgeTone?: 'success';
  description: string;
}

export const PHOTOGRAPHERS_PRIVACY_MODES: PhotographerPrivacyMode[] = [
  {
    id: 'cloud',
    kind: 'cloud-ai',
    title: 'Start quickly with Cloud AI',
    badge: 'Fastest setup',
    badgeTone: 'success',
    description:
      'Use Zush-managed AI to analyze visual previews and sampled video frames, then review the proposed names before applying them to the shoot.',
  },
  {
    id: 'byok',
    kind: 'byok',
    title: 'Use your own AI account',
    badge: 'BYOK',
    description:
      'Connect the provider and model your studio already uses. Your API key stays in secure local storage while you control the provider account.',
  },
  {
    id: 'offline',
    kind: 'offline-ai',
    title: 'Keep client work on the machine',
    badge: 'Local AI',
    description:
      'Run supported visual analysis with local Ollama models on Mac or Windows when unreleased campaigns, private events, or client footage should stay local.',
  },
];

export const PHOTOGRAPHERS_PRIVACY_NOTE =
  'Zush renames media in place and does not become a new asset library. Choose the processing mode for each workflow, keep your existing folder structure, and use rename history when a batch needs to be reverted.';

export const PHOTOGRAPHERS_WORKFLOW = [
  {
    title: 'Build the studio naming rule',
    description:
      'Combine date, client, project, subject, location, scene, shot type, take, camera, and any custom field your team needs in one reusable Template.',
  },
  {
    title: 'Run it on an ingest or archive folder',
    description:
      'Add a copied shoot, a card ingest, an export folder, or a mixed archive of RAW photos, JPEGs, and video clips without moving the source media.',
  },
  {
    title: 'Review, apply, and reuse',
    description:
      'Read the proposed names as one batch, correct exceptions, apply with undo available, then reuse the same Template on the next job.',
  },
];

export const PHOTOGRAPHERS_ZUSH_ADVANTAGES = [
  {
    need: 'Describe what each file shows',
    zushWorkflow: 'Zush can propose subject, scene, location, shot type, take, and custom visual fields.',
    benefit: 'A folder becomes searchable before anyone opens every photo or clip.',
  },
  {
    need: 'Combine AI with stable metadata',
    zushWorkflow: 'Build a Zush Template from capture date, EXIF, camera, sequence, project, and AI-detected context.',
    benefit: 'Filenames stay predictable while still describing the individual shot.',
  },
  {
    need: 'Keep one convention across cameras',
    zushWorkflow: 'Apply the same field order, separator, date format, and studio rules to a mixed batch.',
    benefit: 'Files from different bodies, cards, and operators follow one naming system.',
  },
  {
    need: 'Review before import or handoff',
    zushWorkflow: 'See every original and proposed filename side by side before applying the batch.',
    benefit: 'Ambiguous subjects, scenes, and takes can be corrected before they enter production.',
  },
  {
    need: 'Recover an applied rename',
    zushWorkflow: 'Zush keeps the original-to-new mapping in Rename History.',
    benefit: 'The complete batch can be inspected and reverted when the Template needs another pass.',
  },
] as const;

export const PHOTOGRAPHERS_NAMING_RECIPES = [
  {
    title: 'Client shoot with camera sequence',
    description:
      'Use a deterministic date and project prefix, then retain a camera or sequence field so files from multiple bodies stay unique.',
    example: '{YYYYMMDD}_{Client}_{Shoot}_{Camera}_{Sequence}',
  },
  {
    title: 'Video production and multi-camera takes',
    description:
      'Combine project context with visible scene details, shot type, take, and camera before the clips enter an editing timeline.',
    example: '{Project}_{Scene}_{ShotType}_{Take}_{Camera}',
  },
  {
    title: 'Searchable portrait or event archive',
    description:
      'Put stable client and date fields first, then add the subject, location, or moment that distinguishes each image.',
    example: '{Client}_{CaptureDate}_{Subject}_{Location}',
  },
] as const;

export const PHOTOGRAPHERS_RENAME_BOUNDARY = [
  'Zush changes the filename and path, not the image pixels, video content, or embedded metadata.',
  'Supported RAW files keep their original extension, and every proposed old-to-new name is visible before the batch is applied.',
  'Rename History records the original filename, new filename, folder, and timestamp so an applied batch can be reverted.',
  'Catalogs, timelines, RAW+JPEG pairs, and XMP sidecars can create linked workflows. Test a copied folder and rename before import unless you have verified relinking in the destination application.',
] as const;

export const PHOTOGRAPHERS_MEDIA_TYPES = [
  {
    title: 'RAW photo shoots',
    description:
      'Turn camera counters into names that carry the project, date, subject, scene, or location while preserving the original RAW extension.',
    example: '2026-06-14 – Ortega Wedding – Ceremony – First Kiss.nef',
  },
  {
    title: 'Portraits and event galleries',
    description:
      'Apply one readable convention across JPEG, HEIC, TIFF, and RAW selects before culling, delivery, or long-term archiving.',
    example: 'Maya Chen – Studio Portrait – Look 02.cr3',
  },
  {
    title: 'B-roll and location footage',
    description:
      'Name short clips by visible subject, setting, shot type, and project so editors can find useful footage before opening every file.',
    example: 'River House – Exterior – Golden Hour – Wide.mov',
  },
  {
    title: 'Interviews and multi-camera takes',
    description:
      'Use speaker, interview topic, camera, and take fields to make a day of similarly numbered clips easier to scan in Finder or File Explorer.',
    example: 'Founder Interview – Camera A – Take 04.mp4',
  },
  {
    title: 'Social and client exports',
    description:
      'Replace final-final filenames with the project, deliverable, aspect ratio, language, or version fields your handoff requires.',
    example: 'Northwind Launch – Social Cut – 9x16 – v03.mp4',
  },
  {
    title: 'Mixed studio archives',
    description:
      'Run one batch across photos, footage, audio, subtitles, and production documents, with a filename proposed from each file’s available context.',
    example: 'Coastal Editorial – Behind the Scenes – Studio Setup.jpg',
  },
];

export interface PhotographerAudience {
  title: string;
  description: string;
  icon: 'photographer' | 'videographer' | 'studio';
}

export const PHOTOGRAPHERS_AUDIENCES: PhotographerAudience[] = [
  {
    title: 'Portrait, wedding, and event photographers',
    description:
      'Replace repeated camera counters with project, date, subject, moment, and location — useful before culling and still understandable years later.',
    icon: 'photographer',
  },
  {
    title: 'Videographers and editors',
    description:
      'Turn generic camera clips into searchable b-roll, interview, location, scene, and take names before the edit begins.',
    icon: 'videographer',
  },
  {
    title: 'Studios and production teams',
    description:
      'Give assistants, producers, and editors one shared convention for ingest folders, active projects, deliverables, and archives.',
    icon: 'studio',
  },
];

export const PHOTOGRAPHERS_OUTCOMES = [
  {
    title: 'Find the shot before opening it',
    description:
      'A descriptive subject, scene, location, or take turns the folder listing into a useful first-pass index of the shoot.',
  },
  {
    title: 'Keep the convention across every camera',
    description:
      'A reusable Template makes files from different bodies, cards, and operators follow the same studio naming order.',
  },
  {
    title: 'Hand off media that explains itself',
    description:
      'Editors and clients receive filenames that retain project context outside your catalog, NLE, shared drive, or delivery platform.',
  },
];

export const PHOTOGRAPHERS_FAQ = [
  {
    question: 'What is a good file naming convention for photographers?',
    answer:
      'A practical starting point is capture date, client or project, subject or scene, and a short differentiator such as location, shot type, or select status. Keep the order consistent and use the fields your team will actually search later.',
  },
  {
    question: 'Can Zush rename RAW photos?',
    answer:
      'Yes. Zush supports common RAW formats including CR2, CR3, NEF, ARW, DNG, ORF, RAF, RW2, PEF, SRW, SR2, and RAW. It analyzes available previews and metadata, proposes a new filename, and preserves the file extension.',
  },
  {
    question: 'Can AI rename video clips by what is in them?',
    answer:
      'Yes. Zush samples frames and uses available subtitle or transcript context when present, then proposes a descriptive name for supported formats such as MP4, MOV, M4V, MTS, M2TS, and others. Review the batch before applying it.',
  },
  {
    question: 'Can it name clips by scene, location, or take?',
    answer:
      'Yes. Add those fields to a Template or describe a studio-specific field with a Custom AI Block. Results depend on the visual and metadata context available in each file, so the preview step is important for ambiguous clips.',
  },
  {
    question: 'Does Zush replace a photo catalog, editor, or NLE?',
    answer:
      'No. Zush handles the filename layer around your existing workflow. It renames media in ordinary folders before import, during handoff, or in an archive; it does not replace culling, color, editing, catalogs, timelines, or digital asset management.',
  },
  {
    question: 'Does renaming change photo metadata or video content?',
    answer:
      'No. Zush changes the filename and path, not image pixels, video content, or embedded metadata, and supported RAW files keep their extension. Catalogs, timelines, RAW+JPEG pairs, and XMP sidecars can maintain their own links, so test a copied folder and rename before import unless you have verified relinking in the destination application.',
  },
  {
    question: 'Can I keep unreleased or private client work offline?',
    answer:
      'Yes. Local AI uses Ollama models for supported analysis on Mac or Windows, so file content is not sent to Zush or a third-party AI provider. It works offline after setup. You can also use BYOK when your studio routes analysis through its own provider account.',
  },
  {
    question: 'Can I undo a renamed shoot?',
    answer:
      'Yes. Review all proposed filenames before applying them, and use rename history to revert a batch if the naming rule needs another pass.',
  },
  {
    question: 'Does Zush move or upload my photo and video files?',
    answer:
      'Zush renames files in place and does not move them into a new library or store them. Cloud processing can send a compact analysis payload; BYOK uses your provider account; Local AI keeps supported analysis on the machine.',
  },
];

export const PHOTOGRAPHERS_JSON_LD = buildFeaturePageJsonLd({
  pageName: PHOTOGRAPHERS_PAGE_TITLE,
  howTo: {
    name: 'How to batch rename a photo or video shoot with AI',
    description:
      'Use Zush to rename RAW photos, JPEGs, and video clips by project, date, subject, scene, camera, and take on Mac or Windows.',
    steps: [
      {
        name: 'Create a naming Template',
        text: 'Choose the project, date, subject, scene, location, camera, take, and custom fields that make each file searchable.',
      },
      {
        name: 'Add the shoot folder',
        text: 'Run the Template on a copied ingest, an active project folder, a delivery folder, or an archive of supported photo and video formats.',
      },
      {
        name: 'Review and apply the batch',
        text: 'Check the proposed names, correct ambiguous media, and apply the batch with rename history available for undo.',
      },
    ],
  },
  faqItems: PHOTOGRAPHERS_FAQ,
  page: {
    pagePath: PHOTOGRAPHERS_PAGE_PATH,
    description:
      'AI file renamer for photographers and videographers on Mac and Windows. Zush names RAW photos, JPEGs, and video clips by project, date, subject, scene, camera, and take.',
    featureList: [
      'Batch rename RAW photos, JPEGs, and video clips by content',
      'Build reusable naming Templates for shoots and deliverables',
      'Extract project-specific fields with Custom AI Blocks',
      'Sample video frames and available subtitle context',
      'Preview every proposed filename before applying',
      'Undo renamed batches with rename history',
      'Choose Cloud AI, BYOK, or Local AI processing',
    ],
  },
});
