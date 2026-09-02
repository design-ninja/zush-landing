import type { FAQItem } from '@/data/blog';
import {
  AI_MODES_SUMMARY,
  APP_CONFIG,
  LOCAL_AI_MODES_SUMMARY,
  SUPPORTED_FORMAT_COUNT,
} from '@/constants';
import { PRO_PRICING } from '@/constants/pricing';

export const HOME_FAQ_DATA: FAQItem[] = [
  {
    question: 'How does an AI file renamer work?',
    answer:
      'An AI file renamer reads file content, metadata, text, and visual previews to create descriptive filenames. Zush lets you apply custom naming rules, review a batch, and undo it later.',
  },
  {
    question: 'Can Zush rename files based on their content?',
    answer:
      'Yes. Depending on the file type, Zush can use visual previews, extracted text, PDF context, design previews, metadata, transcripts, and sampled video frames to suggest a descriptive filename.',
  },
  {
    question: 'How is Zush different from Finder, File Explorer, or Bulk Rename Utility?',
    answer:
      'Pattern-based tools work best when every file needs the same prefix, suffix, or sequence. Zush analyzes each file separately, so mixed files can receive different content-aware names in one reviewed batch.',
  },
  {
    question: 'Does Zush move or sort files into folders?',
    answer:
      'No. Zush focuses on the naming layer: it renames files in place so Finder, Spotlight, File Explorer, and Windows Search can find them more easily. It does not move files between folders.',
  },
  {
    question: 'Is Zush free to try?',
    answer:
      `Yes. Zush includes ${APP_CONFIG.free_tier_limit} free AI renames with no credit card required, shared across ${AI_MODES_SUMMARY}, so you can test the full workflow before upgrading.`,
  },
  {
    question: 'Is my data private?',
    answer:
      `Your original files stay on your device. Zush Cloud AI sends only the content needed for analysis, BYOK sends it to the provider you choose, and ${LOCAL_AI_MODES_SUMMARY} keep supported analysis on your computer without cloud processing.`,
  },
  {
    question: 'Which operating systems does Zush support?',
    answer:
      `Zush runs on macOS ${APP_CONFIG.min_macos_version}+ and Windows 10 or 11. The Mac app is available as a signed DMG, from the Mac App Store, and through Homebrew. The Windows app is available from the Microsoft Store.`,
  },
  {
    question: 'Which file formats are supported?',
    answer:
      `Zush supports ${SUPPORTED_FORMAT_COUNT} file extensions across images, RAW photos, design files, PDFs, ebooks, documents, video, and audio — including HEIC, PNG, PDF, EPUB, FB2, DOCX, XLSX, KEY, FIG, PSD, MP4, MOV, MP3, and FLAC.`,
  },
  {
    question: 'Can Zush rename files offline?',
    answer:
      `Yes. LM Studio and Ollama work offline after you configure a compatible local model. Both local modes are available on the free plan for supported files and share the ${APP_CONFIG.free_tier_limit}-rename limit with Zush Cloud AI and BYOK; PRO removes that limit.`,
  },
  {
    question: 'How does folder monitoring work?',
    answer:
      'Choose a folder and a rename template, and Zush can process new supported files as they arrive. Monitored renames remain visible in Activity history and can be undone.',
  },
  {
    question: 'Does Zush work with Google Drive, Dropbox, and iCloud?',
    answer:
      "Yes. Zush doesn't connect to your cloud accounts — it renames files directly in the local folder your cloud app already keeps in sync, so there's nothing to authorize. This works with iCloud Drive, Google Drive, Dropbox, OneDrive, and Box on Mac, and with OneDrive, Google Drive, and Dropbox folders on Windows. Once renamed, the new name syncs to your other devices automatically.",
  },
  {
    question: 'Can I control the filename format?',
    answer:
      'Yes. You can write custom instructions, save reusable templates, and combine 145+ Naming Blocks for dates, categories, client names, document fields, counters, and other metadata. You can also create Custom AI Blocks: describe what Zush should extract from a file and reuse it as your own naming block in any template. All of these are included in the free version.',
  },
  {
    question: 'Can I undo a rename?',
    answer:
      'Yes. Review suggestions before applying them, then use Activity history to restore original filenames if a batch needs to be reverted.',
  },
  {
    question: 'How much does Zush PRO cost?',
    answer:
      `Zush PRO costs ${PRO_PRICING.monthly.label} per month or ${PRO_PRICING.oneTime.label} as a one-time purchase. Every mode — ${AI_MODES_SUMMARY} — is available within the ${APP_CONFIG.free_tier_limit}-rename free limit; both PRO plans remove that limit. Eligible purchases include a 14-day refund period.`,
  },
];
