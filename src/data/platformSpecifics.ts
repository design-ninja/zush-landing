import { VIDEO_PREVIEW_IMAGES } from '@/data/videoPreviewImages';

export type PlatformSpecificsKey = 'mac' | 'windows';
export type SpecKey = 'operatingSystem' | 'processor' | 'memory' | 'diskSpace' | 'network' | 'permissions';

export interface SpecRow {
  key: SpecKey;
  label: string;
  value: string;
  helper?: string;
}

export interface QuickstartStep {
  title: string;
  detail: string;
}

export type ScenarioFileType = 'image' | 'design' | 'doc' | 'sheet' | 'slides' | 'pdf' | 'video';

export interface ScenarioItem {
  title: string;
  before: string;
  after: string;
  description: string;
  fileType: ScenarioFileType;
  image?: string;
  badgeLabel?: string;
}

export interface PlatformSpecificsContent {
  systemRequirements: {
    rows: SpecRow[];
  };
  quickstart: QuickstartStep[];
  scenarios: ScenarioItem[];
}

export const PLATFORM_SPECIFICS_CONTENT: Record<PlatformSpecificsKey, PlatformSpecificsContent> = {
  mac: {
    systemRequirements: {
      rows: [
        { key: 'operatingSystem', label: 'Operating system', value: 'macOS 15 Sequoia, 26 Tahoe' },
        { key: 'processor', label: 'Processor', value: 'Apple Silicon (M1, M2, M3, M4) and Intel x86_64' },
        { key: 'memory', label: 'Memory', value: '4 GB minimum, 8 GB recommended for Local AI' },
        { key: 'diskSpace', label: 'Disk space', value: '~200 MB for the app, additional space for Ollama models' },
        { key: 'network', label: 'Network', value: 'Required for cloud renaming; Local AI works offline after setup' },
        { key: 'permissions', label: 'Permissions', value: 'Folder access is requested when you add folders to rename or monitor' },
      ],
    },
    quickstart: [
      {
        title: 'Open Zush from Launchpad',
        detail: 'Or hit ⌘ Space and type “Zush”. The window opens to the AI Rename dropzone.',
      },
      {
        title: 'Drag a folder or files onto the dropzone',
        detail: 'Try ~/Downloads or your Screenshots folder. Zush analyzes images, design files, audio, videos, and documents in parallel.',
      },
      {
        title: 'Review the suggested names, then apply',
        detail: 'Click any name to edit, or hit Regenerate. When you’re happy, apply and the originals are renamed in place.',
      },
      {
        title: 'Add a watched folder for everyday cleanup',
        detail: 'Open the Monitor tab → Add folder → pick ~/Downloads or your Screenshots folder. New supported files get descriptive names automatically, and you can exclude file types you do not want processed.',
      },
    ],
    scenarios: [
      {
        title: 'Screenshots folder cleanup',
        before: 'Screenshot 2024-08-08 at 09.14.25.png',
        after: 'Technical Dashboard.png',
        description:
          'Point Zush at your Screenshots folder. Every new capture gets a descriptive name within seconds — no more scrolling through hundreds of timestamped files.',
        fileType: 'image',
        image: '/images/examples/dashboard.webp',
      },
      {
        title: 'Downloads folder cleanup',
        before: 'proposal_draft_approved.pdf',
        after: 'Website Proposal.pdf',
        description:
          'Watch ~/Downloads. Bank statements, e-receipts, signed contracts, and exports all get readable names as they land — searchable in Spotlight on day one.',
        fileType: 'pdf',
      },
      {
        title: 'iPhone photo library via iCloud',
        before: 'IMG_0842.JPG',
        after: 'Pug In Yellow Beanie.jpg',
        description:
          'Sync photos from iPhone into a Zush-watched iCloud folder. RAW, HEIC, and JPG are analyzed by AI vision and renamed to describe what’s actually in the photo.',
        fileType: 'image',
        image: '/images/examples/pug.webp',
      },
      {
        title: 'Design source files',
        before: 'checkout-wireframes.fig',
        after: 'Mobile Checkout Flow.fig',
        description:
          'Rename Figma, Sketch, Illustrator, and PSD source files by visible flow, screen, component, and project context before handoff.',
        fileType: 'design',
        badgeLabel: 'FIG',
      },
      {
        title: 'Screen recordings and clips',
        before: 'Screen Recording 2026-05-08.mov',
        after: 'Checkout Flow Bug Recording.mov',
        description:
          'Zush samples video frames and optional subtitles so screen recordings, product demos, and b-roll clips become searchable without opening each file.',
        fileType: 'video',
        image: VIDEO_PREVIEW_IMAGES.checkoutFlowBugRecording,
      },
      {
        title: 'PDF invoices and contracts',
        before: 'scan_2026_03_19.pdf',
        after: 'Signed Service Agreement.pdf',
        description:
          'Zush reads PDF text content — vendor, amount, date, contract type — and writes a name that survives a folder full of look-alike documents.',
        fileType: 'pdf',
      },
      {
        title: 'Bulk renames before archiving',
        before: 'PXL_20240720_091234.jpg',
        after: 'Vibrant Yellow Flowers.jpg',
        description:
          'Pick a card or USB drive, drop the whole folder onto Zush, hit Apply. Hundreds of files get unique descriptive names in one batch — no patterns to write.',
        fileType: 'image',
        image: '/images/examples/flowers.webp',
      },
    ],
  },
  windows: {
    systemRequirements: {
      rows: [
        { key: 'operatingSystem', label: 'Operating system', value: 'Windows 10 (build 19041+) and Windows 11' },
        { key: 'processor', label: 'Processor', value: 'x64 and ARM64 package support' },
        { key: 'memory', label: 'Memory', value: '4 GB minimum, 8 GB recommended for Local AI' },
        { key: 'diskSpace', label: 'Disk space', value: '~250 MB for the app, additional space for Ollama models' },
        { key: 'network', label: 'Network', value: 'Required for cloud renaming; Local AI works offline after setup' },
        { key: 'permissions', label: 'Permissions', value: 'Folder access is requested when you add folders to rename or monitor' },
      ],
    },
    quickstart: [
      {
        title: 'Pin Zush to Start',
        detail: 'After install, Zush appears in the Start menu. Right-click → Pin to Start so it’s one click away.',
      },
      {
        title: 'Drag files from File Explorer',
        detail: 'Open the dropzone, then drag selected files from Explorer, OneDrive, or Desktop. Mixed types are handled in one batch.',
      },
      {
        title: 'Review the suggested names, then apply',
        detail: 'Edit any name inline or hit Regenerate. When you’re happy, apply — Zush renames the originals in place without changing modified dates.',
      },
      {
        title: 'Watch a folder for ongoing cleanup',
        detail: 'Open the Monitor tab → Add folder → pick Downloads or a OneDrive folder. New supported files get descriptive names automatically, and you can exclude file types you do not want processed.',
      },
    ],
    scenarios: [
      {
        title: 'Snipping Tool captures',
        before: 'Screenshot 2024-08-08 at 09.14.25.png',
        after: 'Technical Dashboard.png',
        description:
          'Point your Snipping Tool save folder at a Zush watched directory. Every new capture is renamed to describe what’s on screen within seconds.',
        fileType: 'image',
        image: '/images/examples/dashboard.webp',
      },
      {
        title: 'Downloads folder cleanup',
        before: 'proposal_draft_approved.pdf',
        after: 'Website Proposal.pdf',
        description:
          'Watch the Downloads folder. PDFs, signed contracts, screenshots, docs, images, and exports from web tools all get readable names as they land - no manual renaming.',
        fileType: 'pdf',
      },
      {
        title: 'OneDrive camera roll',
        before: 'IMG_20240812_143052.jpg',
        after: 'HappyDogOnBeach.jpg',
        description:
          'Sync photos from your phone into OneDrive’s Camera Roll. Zush AI vision renames them by what’s in the photo so they’re searchable later.',
        fileType: 'image',
        image: '/images/examples/dog.webp',
      },
      {
        title: 'Outlook email attachments',
        before: 'product-roadmap-draft.docx',
        after: 'Product Roadmap Notes.docx',
        description:
          'Save attachments into a Zush-watched folder. Word, Excel, PowerPoint, Pages, Numbers, and Keynote files get names from their actual content.',
        fileType: 'doc',
      },
      {
        title: 'Screen recordings and clips',
        before: 'recording-2026-05-08.mp4',
        after: 'Product Demo Checkout Flow.mp4',
        description:
          'Zush samples video frames and optional subtitle context so recordings, demos, and clips get names that describe what is visible.',
        fileType: 'video',
        image: VIDEO_PREVIEW_IMAGES.checkoutFlowBugRecording,
      },
      {
        title: 'Receipts from PDF & scanner',
        before: 'client-brief-scan.pdf',
        after: 'Client Creative Brief.pdf',
        description:
          'Drop a folder of scanned receipts and PDFs. Zush reads vendor, date, and content from PDF text and writes filenames you can search a year later.',
        fileType: 'pdf',
      },
      {
        title: 'Bulk rename before sharing',
        before: 'CAM00847.jpg',
        after: 'Black Ford Mustang.jpg',
        description:
          'Pick a USB drive, SD card, or any folder. Drop the whole batch onto Zush — hundreds of files get unique descriptive names in one pass.',
        fileType: 'image',
        image: '/images/examples/car.webp',
      },
    ],
  },
};
