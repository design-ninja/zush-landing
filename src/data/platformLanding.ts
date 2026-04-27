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
      'AI-powered file renamer for macOS. Rename screenshots, PDFs, photos and documents with cloud AI or Offline AI mode via Ollama. Native Apple Silicon and Intel support.',
    operatingSystem: 'macOS 14.0+',
    downloadUrl: DOWNLOAD_URL,
    heroTitle: 'AI File Renamer for Mac',
    heroSubtitle:
      'Rename screenshots, PDFs, photos, and documents on macOS with AI. Use fast cloud models or Offline AI mode with private local models via Ollama.',
    ctaSubtitle:
      'Install the signed macOS app and start renaming screenshots, PDFs, photos, and documents in minutes.',
    features: [
      'AI-powered renaming for screenshots, PDFs, photos, documents',
      'Folder monitoring for new files and recurring cleanup',
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
        question: 'Does Zush work on Apple Silicon?',
        answer:
          'Yes. Zush ships as a universal binary and runs natively on M1, M2, M3 and M4 Macs. Intel Macs running macOS 14+ are supported as well.',
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
      'AI-powered file renamer for Windows. Rename screenshots, PDFs, photos and documents with descriptive names. Distributed through the Microsoft Store with auto-updates.',
    operatingSystem: ['Windows 10', 'Windows 11'],
    downloadUrl: WINDOWS_STORE_URL,
    installUrl: WINDOWS_STORE_URL,
    heroTitle: 'AI File Renamer for Windows',
    heroSubtitle:
      'Rename screenshots, PDFs, photos, and documents on Windows with AI. Installs from the Microsoft Store with automatic updates, free to try with no signup.',
    ctaSubtitle:
      'Open the Microsoft Store and start renaming screenshots, PDFs, photos, and documents with the full Windows build.',
    features: [
      'AI-powered renaming for screenshots, PDFs, photos, documents',
      'Folder monitoring for new files and recurring cleanup',
      'Batch rename with per-file regenerate',
      'Custom prompts for names and metadata tags',
      'One-click revert from the Activity log',
      'Microsoft Store install with auto-updates',
      '60+ languages and flexible date formats',
      'BYOK for unlimited cloud renames (Gemini, Groq, OpenAI, Claude)',
      'Offline AI mode - private local models via Ollama',
    ],
    faqs: [
      {
        question: 'Why is Zush distributed through the Microsoft Store?',
        answer:
          'The Store handles installation, signing, and auto-updates for every user. No separate installer, no SmartScreen prompts, no manual version bumps.',
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
