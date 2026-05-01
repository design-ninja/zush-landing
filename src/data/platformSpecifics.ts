import {
  APP_STORE_URL,
  DOWNLOAD_URL,
  WINDOWS_STORE_URL,
} from '@/constants';

export type PlatformSpecificsKey = 'mac' | 'windows';
export type SpecKey = 'operatingSystem' | 'processor' | 'memory' | 'diskSpace' | 'network' | 'permissions';

export interface SpecRow {
  key: SpecKey;
  label: string;
  value: string;
  helper?: string;
}

export interface InstallStep {
  step: string;
  detail: string;
}

export interface InstallMethod {
  title: string;
  badge: string;
  href: string;
  description: string;
  steps: InstallStep[];
  recommended?: boolean;
  storeBadge: {
    kind: 'app-store' | 'microsoft-store' | 'direct-dmg';
    kicker: string;
    label: string;
    ariaLabel: string;
  };
}

export interface IntegrationItem {
  title: string;
  description: string;
}

export type QuickstartPreviewKind = 'launch' | 'drop' | 'review' | 'watch';

export interface QuickstartStep {
  title: string;
  detail: string;
  duration: string;
  preview: QuickstartPreviewKind;
}

export type ScenarioFileType = 'image' | 'doc' | 'sheet' | 'slides' | 'pdf';

export interface ScenarioItem {
  title: string;
  before: string;
  after: string;
  description: string;
  fileType: ScenarioFileType;
  image?: string;
}

export interface SecurityItem {
  title: string;
  description: string;
}

export interface PlatformSpecificsContent {
  systemRequirements: {
    rows: SpecRow[];
  };
  installMethods: InstallMethod[];
  quickstart: QuickstartStep[];
  integrations: IntegrationItem[];
  scenarios: ScenarioItem[];
  security: SecurityItem[];
}

export const PLATFORM_SPECIFICS_CONTENT: Record<PlatformSpecificsKey, PlatformSpecificsContent> = {
  mac: {
    systemRequirements: {
      rows: [
        { key: 'operatingSystem', label: 'Operating system', value: 'macOS 14 Sonoma, 15 Sequoia, 26 Tahoe' },
        { key: 'processor', label: 'Processor', value: 'Apple Silicon (M1, M2, M3, M4) and Intel x86_64' },
        { key: 'memory', label: 'Memory', value: '4 GB minimum, 8 GB recommended for Offline AI' },
        { key: 'diskSpace', label: 'Disk space', value: '~200 MB for the app, additional space for Ollama models' },
        { key: 'network', label: 'Network', value: 'Required for cloud renaming, optional for Offline AI mode' },
        { key: 'permissions', label: 'Permissions', value: 'Folder access is requested when you add folders to rename or monitor' },
      ],
    },
    installMethods: [
      {
        title: 'Direct .dmg download',
        badge: 'Fastest',
        href: DOWNLOAD_URL,
        description:
          'Signed and notarized universal .dmg, ~70 MB. Recommended when you want the latest release the day it ships.',
        recommended: true,
        steps: [
          { step: 'Download Zush.dmg', detail: 'The file is code-signed and notarized by Apple, so Gatekeeper opens it without overrides.' },
          { step: 'Open the .dmg', detail: 'Drag Zush.app into your /Applications folder.' },
          { step: 'Launch Zush', detail: 'Grant folder access when you add files or a watched folder. Zush does not need broad disk access for ordinary drag-and-drop renaming.' },
        ],
        storeBadge: {
          kind: 'direct-dmg',
          kicker: 'Download the',
          label: 'Universal .dmg',
          ariaLabel: 'Download Zush as a signed and notarized .dmg installer',
        },
      },
      {
        title: 'Mac App Store',
        badge: 'Auto updates',
        href: APP_STORE_URL,
        description:
          'Sandboxed Mac App Store build. Updates and receipts are managed by your Apple ID. Best for managed devices and enterprise rollouts.',
        steps: [
          { step: 'Open the Mac App Store listing', detail: 'Click Get and authenticate with Touch ID or your Apple ID password.' },
          { step: 'Wait for the install', detail: 'macOS keeps Zush updated automatically alongside other App Store apps.' },
          { step: 'Launch Zush from Launchpad', detail: 'Sandboxed build behaves identically — folder monitoring uses macOS-granted bookmarks.' },
        ],
        storeBadge: {
          kind: 'app-store',
          kicker: 'Download on the',
          label: 'Mac App Store',
          ariaLabel: 'Open Zush on the Mac App Store',
        },
      },
    ],
    quickstart: [
      {
        title: 'Open Zush from Launchpad',
        detail: 'Or hit ⌘ Space and type “Zush”. The window opens to the AI Rename dropzone.',
        duration: '~10s',
        preview: 'launch',
      },
      {
        title: 'Drag a folder or files onto the dropzone',
        detail: 'Try ~/Downloads or your Screenshots folder. Zush analyzes images and documents in parallel.',
        duration: '~20s',
        preview: 'drop',
      },
      {
        title: 'Review the suggested names, then apply',
        detail: 'Click any name to edit, or hit Regenerate. When you’re happy, apply and the originals are renamed in place.',
        duration: '~20s',
        preview: 'review',
      },
      {
        title: 'Add a watched folder for everyday cleanup',
        detail: 'Open the Monitor tab → Add folder → pick ~/Downloads or your Screenshots folder. New files get descriptive names automatically.',
        duration: '~10s',
        preview: 'watch',
      },
    ],
    integrations: [
      {
        title: 'Finder workflow',
        description:
          'Drag files or folders from Finder into Zush, review the generated names, then apply the rename in place.',
      },
      {
        title: 'Automation-ready folders',
        description:
          'Use watched folders with Shortcuts, Automator, browser downloads, or export folders by saving new files into a monitored directory.',
      },
      {
        title: 'Spotlight metadata',
        description:
          'After Zush renames a file, the new name and tags are immediately searchable in Spotlight, Finder Tags, and Siri suggestions.',
      },
      {
        title: 'Screenshot capture',
        description:
          'Point the screenshot save folder at a Zush-monitored directory. New screenshots get descriptive names within seconds, no extra step.',
      },
      {
        title: 'iCloud Drive friendly',
        description:
          'Zush works with ordinary iCloud Drive folders, including folders synced from iPhone. Let large sync jobs settle before applying very large batches.',
      },
      {
        title: 'Light & Dark mode',
        description:
          'Native macOS appearance toggle. Zush follows your system theme automatically and respects your accent color.',
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
        title: 'Design exports from Figma & Sketch',
        before: 'IMG_20240812_143052.jpg',
        after: 'HappyDogOnBeach.jpg',
        description:
          'Stop hunting through generic export names. Drop your exports folder onto Zush and ship to engineering with names that match the component.',
        fileType: 'image',
        image: '/images/examples/dog.webp',
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
    security: [
      {
        title: 'Apple-notarized .dmg',
        description:
          'The direct .dmg is signed with a Developer ID and notarized before release so supported macOS versions can verify the app normally.',
      },
      {
        title: 'Sandboxed App Store build',
        description:
          'The Mac App Store build runs inside the App Sandbox. Folder access is granted via security-scoped bookmarks chosen by you.',
      },
      {
        title: 'Originals stay on-device',
        description:
          'Cloud mode only sends the analysis payload (compressed preview or extracted text). Offline AI mode sends nothing — Ollama runs locally.',
      },
      {
        title: 'Secure key storage',
        description:
          'BYOK keys are stored in macOS Keychain. They never leave the device unencrypted and are only used to call your chosen provider.',
      },
    ],
  },
  windows: {
    systemRequirements: {
      rows: [
        { key: 'operatingSystem', label: 'Operating system', value: 'Windows 10 (build 19041+) and Windows 11' },
        { key: 'processor', label: 'Processor', value: 'x64 and ARM64 package support' },
        { key: 'memory', label: 'Memory', value: '4 GB minimum, 8 GB recommended for Offline AI' },
        { key: 'diskSpace', label: 'Disk space', value: '~250 MB for the app, additional space for Ollama models' },
        { key: 'network', label: 'Network', value: 'Required for cloud renaming, optional for Offline AI mode' },
        { key: 'permissions', label: 'Permissions', value: 'Folder access is requested when you add folders to rename or monitor' },
      ],
    },
    installMethods: [
      {
        title: 'Microsoft Store',
        badge: 'Recommended',
        href: WINDOWS_STORE_URL,
        description:
          'Distributed through the Microsoft Store so installation, package trust, and updates follow the standard Windows Store flow.',
        recommended: true,
        steps: [
          { step: 'Open the Microsoft Store listing', detail: 'Click Install and let the Store handle the package download and publisher trust flow.' },
          { step: 'Wait for the package to download', detail: 'Windows installs the package through the same Store update channel used by other desktop apps.' },
          { step: 'Launch Zush from Start', detail: 'Future updates arrive through the Store, so you do not need to download a separate installer.' },
        ],
        storeBadge: {
          kind: 'microsoft-store',
          kicker: 'Download from the',
          label: 'Microsoft Store',
          ariaLabel: 'Open Zush on the Microsoft Store',
        },
      },
    ],
    quickstart: [
      {
        title: 'Pin Zush to Start',
        detail: 'After install, Zush appears in the Start menu. Right-click → Pin to Start so it’s one click away.',
        duration: '~10s',
        preview: 'launch',
      },
      {
        title: 'Drag files from File Explorer',
        detail: 'Open the dropzone, then drag selected files from Explorer, OneDrive, or Desktop. Mixed types are handled in one batch.',
        duration: '~20s',
        preview: 'drop',
      },
      {
        title: 'Review the suggested names, then apply',
        detail: 'Edit any name inline or hit Regenerate. When you’re happy, apply — Zush renames the originals in place without changing modified dates.',
        duration: '~20s',
        preview: 'review',
      },
      {
        title: 'Watch a folder for ongoing cleanup',
        detail: 'Open the Monitor tab → Add folder → pick Downloads or a OneDrive folder. New files get descriptive names automatically.',
        duration: '~10s',
        preview: 'watch',
      },
    ],
    integrations: [
      {
        title: 'File Explorer drag-and-drop',
        description:
          'Drag selected files from File Explorer into Zush, including files from Desktop, Downloads, and ordinary OneDrive folders.',
      },
      {
        title: 'Snipping Tool capture',
        description:
          'Save Snipping Tool screenshots into a Zush-monitored folder. Each new capture gets a descriptive name automatically — no PowerShell, no scripts.',
      },
      {
        title: 'PowerToys-friendly',
        description:
          'Zush handles the AI side, PowerToys handles bulk renaming patterns. They live happily next to each other on the same machine.',
      },
      {
        title: 'OneDrive sync aware',
        description:
          'Use Zush with normal OneDrive folders and let active sync finish before applying very large rename batches.',
      },
      {
        title: 'Windows search index',
        description:
          'After Zush renames a file, the new filename becomes available to Windows Search when that folder is indexed.',
      },
      {
        title: 'Light & dark theme',
        description:
          'Follows your Windows personalization settings so the app stays comfortable in light and dark mode.',
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
          'Watch the Downloads folder. PDFs, ZIPs, signed contracts, and exports from web tools all get readable names as they land — no manual renaming.',
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
        before: 'meeting_notes_v7_final.docx',
        after: 'Q1 Planning Notes.docx',
        description:
          'Save attachments into a Zush-watched folder. Word, Excel, and PowerPoint files get names from their actual content, not generic message IDs.',
        fileType: 'doc',
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
    security: [
      {
        title: 'Microsoft Store distribution',
        description:
          'Windows users install Zush from the Microsoft Store, using the Store package identity and update channel instead of a side-loaded installer.',
      },
      {
        title: 'Store-managed package',
        description:
          'The Store manages package trust and updates, which keeps installation predictable for personal and managed Windows devices.',
      },
      {
        title: 'Originals stay on-device',
        description:
          'Cloud mode only sends the analysis payload (compressed preview or extracted text). Offline AI mode sends nothing — Ollama runs locally.',
      },
      {
        title: 'Secure key storage',
        description:
          'BYOK keys are stored in the Windows Credential Manager (DPAPI). They never leave the device unencrypted.',
      },
    ],
  },
};
