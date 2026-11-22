import type { FAQItem } from '@/data/blog';
import {
  APP_STORE_URL,
  GITHUB_RELEASES_URL,
  HOMEBREW_CASK_URL,
  MAC_APP_VERSION,
  MAC_DOWNLOAD_TRACKING_URL,
  SUPPORT_EMAIL,
  WINDOWS_APP_VERSION,
  WINDOWS_STORE_URL,
} from '@/constants';

export const SECURITY_PAGE_PATH = '/security';
export const SECURITY_PAGE_REVIEWED_AT = '2026-11-22';

// Every claim here mirrors src/content/privacy.md and /docs/privacy-security. Change them together.
export const SECURITY_SHORT_ANSWER =
  'Yes. Zush renames files on your own computer: the Mac app is code-signed and notarized by Apple, and the Windows app is distributed through the Microsoft Store. Original files are not uploaded. In Zush Cloud AI and BYOK modes only the content needed to suggest a name, such as a compressed preview or extracted text, is sent for analysis and is not stored by Zush afterwards; with LM Studio or Ollama, supported analysis stays on your device. Every batch is previewed before it is applied, and Rename History can undo it.';

export interface SecurityModeRow {
  mode: string;
  sent: string;
  destination: string;
  retention: string;
}

export const SECURITY_MODE_ROWS: SecurityModeRow[] = [
  {
    mode: 'Zush Cloud AI',
    sent: 'A compressed preview, extracted text, sampled video frames, transcript context, or a compact summary, plus the file type, your custom prompt, and an anonymous device ID.',
    destination: 'Zush servers relay the request to a managed provider: Google Gemini, OpenRouter (including DeepSeek models), Alibaba Cloud Model Studio (Qwen), or Groq for speech transcription.',
    retention: 'Processed in real time and not stored by Zush. Not used to train Zush models. AI providers apply their own terms.',
  },
  {
    mode: 'BYOK (your own key)',
    sent: 'The same analysis payload as Zush Cloud AI.',
    destination: 'The provider you pick: Google Gemini, OpenRouter, OpenAI, or Anthropic Claude, through the Zush relay.',
    retention: 'Your key stays in the Keychain or secure platform storage and is not stored on Zush servers. Your provider’s terms apply.',
  },
  {
    mode: 'LM Studio or Ollama',
    sent: 'Nothing leaves your computer for analysis.',
    destination: 'A local model running on your Mac or PC.',
    retention: 'Stays on your device. Zush still checks your license and updates online.',
  },
];

export const SECURITY_NOT_SENT = [
  'Original full-resolution files, except a bounded audio clip when transcription is needed and a temporary preview for iWork files',
  'Local folder paths',
  'Access to your cloud accounts: Zush renames files inside the folder iCloud Drive, Google Drive, Dropbox, or OneDrive already syncs, with no sign-in or OAuth',
];

export const SECURITY_FILE_SAFETY_STEPS = [
  'Zush suggests names first. Nothing on disk changes until you review the batch and apply it.',
  'Rename History records every applied batch, including folder-monitoring runs, and restores the original names and folders.',
  'Duplicate detection is off until you turn it on in a template. Exact copies can stay, get a Duplicate mark, or move to the Trash (the Recycle Bin on Windows), and undo brings them back. Zush never deletes files permanently.',
  'Folder monitoring only watches the folders you add, and its renames land in the same history.',
];

export interface SecurityDownloadSource {
  label: string;
  href: string;
  note: string;
}

export const SECURITY_DOWNLOAD_SOURCES: SecurityDownloadSource[] = [
  {
    label: 'zushapp.com',
    href: MAC_DOWNLOAD_TRACKING_URL,
    note: `Code-signed and Apple-notarized .dmg for macOS, version ${MAC_APP_VERSION}. Gatekeeper opens it normally.`,
  },
  {
    label: 'Mac App Store',
    href: APP_STORE_URL,
    note: 'Reviewed by Apple and runs in the App Store sandbox.',
  },
  {
    label: 'Homebrew',
    href: HOMEBREW_CASK_URL,
    note: 'brew install --cask zush installs the same signed build.',
  },
  {
    label: 'GitHub releases',
    href: GITHUB_RELEASES_URL,
    note: 'Release archive for the signed Mac builds.',
  },
  {
    label: 'Microsoft Store',
    href: WINDOWS_STORE_URL,
    note: `The only official source for Windows, version ${WINDOWS_APP_VERSION}. Updates arrive through the Store.`,
  },
];

export const SECURITY_ACCOUNT_DATA = [
  'An anonymous device identifier, used for rate limits and license checks. It contains no personal information.',
  'Your email address and license status, only if you buy PRO.',
  'A count of AI-processed files, to apply the free limit.',
  'Anonymous crash reports (Sentry) and privacy-focused product analytics (TelemetryDeck).',
  'No card details: payments are handled by Paddle, Apple, or Microsoft.',
];

export const SECURITY_FAQ: FAQItem[] = [
  {
    question: 'Is Zush safe to use on Mac and Windows?',
    answer:
      'Yes. Zush is a code-signed, Apple-notarized Mac app and a Microsoft Store app for Windows. It never uploads your original files, shows every new name before applying it, and keeps Rename History so any batch can be undone. For files that must not leave your computer, use LM Studio or Ollama.',
  },
  {
    question: 'Does Zush upload my files?',
    answer:
      'No. Original files stay on your device. In Zush Cloud AI and BYOK modes Zush sends only what the model needs to suggest a name, such as a compressed preview image or extracted text. The exceptions are a bounded audio clip when transcription is required and a temporary preview for iWork files.',
  },
  {
    question: 'Does Zush store my files or use them to train AI?',
    answer:
      'No. Zush processes analysis requests in real time and does not keep file content afterwards, and it does not use your files or prompts to train its own models. The AI provider that answers a request applies its own data terms; with your own key you choose that provider.',
  },
  {
    question: 'Which AI providers see my data?',
    answer:
      'Zush Cloud AI routes requests to Google Gemini, OpenRouter and its upstream providers (including DeepSeek), Alibaba Cloud Model Studio (Qwen), or Groq for speech transcription, depending on the file type, load, and fallback. With BYOK the request goes to the provider you connect: Gemini, OpenRouter, OpenAI, or Anthropic Claude. With LM Studio or Ollama no AI provider receives file content.',
  },
  {
    question: 'Can I use Zush completely offline?',
    answer:
      'Yes, for supported files. Install LM Studio or Ollama with a vision-capable model and switch Zush to that mode; analysis then runs on your computer. Zush still goes online for license checks and updates, but those requests contain no file content.',
  },
  {
    question: 'Is Zush safe for confidential client, medical, or legal files?',
    answer:
      'Use a local model for them. With LM Studio or Ollama no file content leaves your device, which is the setup we recommend for patient records, contracts, and client documents. If you have data-residency requirements, use local AI or a BYOK provider whose terms meet them.',
  },
  {
    question: 'Which download sites are official for Zush?',
    answer:
      'Download Zush for Mac from zushapp.com, the Mac App Store, Homebrew, or the official GitHub releases page, and Zush for Windows from the Microsoft Store. Zush is free to try, so a site that offers a "cracked" or repackaged installer is not distributing the original app.',
  },
  {
    question: 'Can Zush delete or lose my files?',
    answer:
      'Zush renames and, if you turn on folder sorting, moves files. It does not delete them permanently: duplicate detection moves exact copies to the Trash or Recycle Bin only when you choose that option, and undo brings them back. Every batch is previewed first and can be undone from Rename History.',
  },
  {
    question: 'How do I report a security issue?',
    answer: `Email ${SUPPORT_EMAIL} with the details and the steps to reproduce. The developer reads every report personally.`,
  },
];
