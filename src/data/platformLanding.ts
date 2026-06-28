import { DOWNLOAD_URL, WINDOWS_STORE_URL } from '@/constants';
import type { DownloadOS } from '@/utils/download';

export interface PlatformFAQ {
  question: string;
  answer: string;
}

export interface PlatformLandingContent {
  os: DownloadOS;
  path: '/mac' | '/windows';
  breadcrumbLabel: string;
  softwareName: string;
  softwareDescription: string;
  operatingSystem: string | string[];
  downloadUrl: string;
  installUrl?: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaSubtitle: string;
  features: string[];
  faqs: PlatformFAQ[];
}

export const PLATFORM_LANDING_CONTENT: Record<DownloadOS, PlatformLandingContent> = {
  mac: {
    os: 'mac',
    path: '/mac',
    breadcrumbLabel: 'Zush for Mac',
    softwareName: 'Zush for Mac',
    softwareDescription:
      'AI file renamer for Mac and batch rename tool for macOS. Download Zush to rename files with AI from Finder, batch rename mixed folders, and clean up screenshots, design files, audio, videos, PDFs, photos, iWork, and Office documents by content.',
    operatingSystem: 'macOS 15.0+',
    downloadUrl: DOWNLOAD_URL,
    heroTitle: 'AI File Renamer for Mac',
    heroSubtitle:
      'Use Zush as an AI file renamer for Mac: batch rename screenshots, design files, videos, PDFs, photos, iWork, Office documents, and mixed Finder folders by content. Review every name, undo any batch, or use Offline AI mode with private local Ollama models.',
    ctaSubtitle:
      'Install the signed macOS AI file renamer and start renaming Finder folders, screenshots, design files, videos, PDFs, photos, iWork, and Office documents in minutes.',
    features: [
      'AI file renamer for Mac with content-aware naming for screenshots, design files, videos, PDFs, photos, iWork, and Office documents',
      'Folder monitoring with file-type exclusions',
      'Batch rename with per-file regenerate',
      'Custom prompts for names and metadata tags',
      'One-click revert from the Activity log',
      'Native Apple Silicon and Intel build',
      '60+ languages and flexible date formats',
      'BYOK for unlimited cloud renames (Gemini, Groq, OpenAI, Claude)',
      'Offline AI mode - private local models via Ollama',
    ],
    faqs: [
      {
        question: 'What is the best AI file renamer for Mac?',
        answer:
          'Zush is the best fit when you need one Mac app for mixed folders: screenshots, PDFs, RAW and HEIC photos, design files, iWork and Office documents, audio, videos, folder monitoring, preview, rollback, BYOK, and Offline AI mode.',
      },
      {
        question: 'Can Zush batch rename files from Finder?',
        answer:
          'Yes. Drag files or folders from Finder into Zush, review the AI-generated names, regenerate individual suggestions when needed, then apply the batch rename in place.',
      },
      {
        question: 'Does Zush work on Apple Silicon?',
        answer:
          'Yes. Zush ships as a universal binary and runs natively on M1, M2, M3 and M4 Macs. Intel Macs running macOS 15+ are supported as well.',
      },
      {
        question: 'Is the app notarized by Apple?',
        answer:
          'Yes. The .dmg is code-signed and notarized, so Gatekeeper will open it without manual overrides on a supported macOS version.',
      },
      {
        question: 'Do you offer a Mac App Store version?',
        answer:
          'Yes, a Mac App Store build is available as well. The direct .dmg download above is the recommended way to get the latest release quickly.',
      },
      {
        question: 'Where are my files sent?',
        answer:
          'Originals stay on your computer. Cloud mode sends the analysis payload needed for renaming, such as a compressed preview or extracted document text, to the selected AI provider. Offline AI mode uses private local models via Ollama and does not send analysis content to Zush cloud or third-party AI providers.',
      },
      {
        question: 'Can I switch to my own API key?',
        answer:
          'Yes. PRO users can enable BYOK (Bring Your Own Key) with Gemini, Groq, OpenAI or Claude for unlimited cloud renames. Your key is stored locally in secure platform storage.',
      },
      {
        question: 'Can I use Zush offline?',
        answer:
          'Yes. PRO users can enable Offline AI mode with private local models via Ollama. Install Ollama, download a compatible vision model, then enable Local mode in AI Setup. Cloud and BYOK processing still require internet.',
      },
    ],
  },
  windows: {
    os: 'windows',
    path: '/windows',
    breadcrumbLabel: 'Zush for Windows',
    softwareName: 'Zush for Windows',
    softwareDescription:
      'AI file renamer and file organizer workflow for Windows 11 and 10 with bulk rename, batch rename, folder monitoring, searchable filenames, metadata, BYOK, and Offline AI. Rename files with AI from File Explorer folders, including screenshots, design files, audio, videos, PDFs, photos, iWork and Office documents.',
    operatingSystem: ['Windows 10', 'Windows 11'],
    downloadUrl: WINDOWS_STORE_URL,
    installUrl: WINDOWS_STORE_URL,
    heroTitle: 'AI File Renamer for Windows',
    heroSubtitle:
      'Batch rename files on Windows 11 and 10 with AI: screenshots, design files, videos, PDFs, photos, iWork, Office documents, audio, and messy Downloads folders. Zush turns content into searchable filenames, installs from the Microsoft Store, and includes preview, undo, BYOK, and Offline AI.',
    ctaSubtitle:
      'Open the Microsoft Store and start using an AI file renamer for File Explorer folders, screenshots, design files, videos, PDFs, photos, audio, iWork, and Office documents.',
    features: [
      'AI file renamer for Windows 11 and 10 with content-aware bulk rename for screenshots, design files, videos, PDFs, photos, audio, iWork, and Office documents',
      'AI file organizer workflow for Downloads, screenshots, OneDrive folders, shared drives, and project exports',
      'Folder monitoring with file-type exclusions',
      'Batch rename with per-file regenerate',
      'Custom prompts for names and metadata tags',
      'Searchable filenames and metadata for File Explorer and Windows Search',
      'One-click revert from the Activity log',
      'Microsoft Store install with auto-updates',
      '60+ languages and flexible date formats',
      'BYOK for unlimited cloud renames (Gemini, Groq, OpenAI, Claude)',
      'Offline AI mode - private local models via Ollama',
    ],
    faqs: [
      {
        question: 'Can Zush batch rename files on Windows?',
        answer:
          'Yes. Zush works as an AI batch rename tool for Windows 11 and 10. Drag files from File Explorer, review AI-generated names for every item, then apply the whole batch with rename history available for undo.',
      },
      {
        question: 'Is Zush a RenameClick alternative for Windows?',
        answer:
          'Yes. Zush is a strong RenameClick alternative for Windows when you want a Microsoft Store install, batch review before applying names, undo history, BYOK, Offline AI mode, and content-aware filenames for screenshots, PDFs, photos, videos, audio, design files, and documents.',
      },
      {
        question: 'Can Zush organize files on Windows?',
        answer:
          'Zush helps organize Windows folders by turning vague filenames into readable, searchable names and by monitoring folders such as Downloads or Pictures\\Screenshots for new supported files. It focuses on naming, metadata, review, and undo rather than moving files into folders automatically.',
      },
      {
        question: 'Does Zush help search files by content on Windows?',
        answer:
          'Zush does not replace Windows Search with a separate semantic search index. It analyzes file content during renaming and writes that context into filenames and metadata, so files become easier to find later in File Explorer and Windows Search.',
      },
      {
        question: 'What file types can Zush rename on Windows?',
        answer:
          'Zush supports mixed Windows folders with screenshots, JPG/PNG/HEIC/RAW photos, PDFs, Office documents, iWork files, design files such as Figma, Sketch, Illustrator, and PSD, videos, audio, subtitles, text files, CSV, XML, YAML, and more.',
      },
      {
        question: 'Why is Zush distributed through the Microsoft Store?',
        answer:
          'The Store handles installation, package trust, and auto-updates for every user. No separate installer or manual version maintenance is needed.',
      },
      {
        question: 'Does Zush for Windows have the same features as Mac?',
        answer:
          'Zush for Windows ships with the same core cloud AI rename flow, folder monitoring, custom prompts, one-click revert, BYOK support, and Offline AI mode with private local models via Ollama.',
      },
      {
        question: 'Does it run on Windows on ARM?',
        answer:
          'Yes. The Microsoft Store release pipeline builds native packages for both x64 and ARM64, so Zush runs natively on Windows on ARM devices.',
      },
      {
        question: 'Can I bring my own AI API key?',
        answer:
          'Yes. PRO users can enable BYOK (Bring Your Own Key) with Gemini, Groq, OpenAI or Claude for unlimited cloud renames — you pay the provider directly.',
      },
      {
        question: 'Where are my files sent?',
        answer:
          'Originals stay on your PC. For cloud AI analysis, Zush sends the analysis payload needed for renaming, such as a compressed preview or extracted document text, to the selected AI provider. Offline AI mode uses private local models via Ollama and does not send analysis content to Zush cloud or third-party AI providers.',
      },
    ],
  },
};
