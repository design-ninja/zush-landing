import type { FAQItem } from '@/data/blog';
import { APP_CONFIG, SUPPORTED_FORMAT_COUNT } from '@/constants';

export const HOME_FAQ_DATA: FAQItem[] = [
  {
    question: 'What is Zush?',
    answer:
      'Zush is an AI file renamer and organizer for Mac and Windows. It reads supported files and creates descriptive filenames based on their content. You can review suggestions, batch apply changes, monitor folders, and undo renames.',
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
      `Yes. Zush includes ${APP_CONFIG.free_tier_limit} free AI renames with no credit card required, so you can test content analysis, batch rename, preview, and undo before upgrading.`,
  },
  {
    question: 'Which operating systems does Zush support?',
    answer:
      `Zush runs on macOS ${APP_CONFIG.min_macos_version}+ and Windows 10 or 11. The Mac app is available as a signed DMG, from the Mac App Store, and through Homebrew. The Windows app is available from the Microsoft Store.`,
  },
  {
    question: 'Which file formats are supported?',
    answer:
      `Zush supports ${SUPPORTED_FORMAT_COUNT} file extensions across images, RAW photos, design files, PDFs, documents, video, and audio. The supported-formats section on this page lists every extension.`,
  },
  {
    question: 'Can Zush rename files offline?',
    answer:
      'Yes. PRO users can use Offline AI mode with compatible local Ollama models for supported files. Cloud mode remains available for broader mixed-file workflows, and BYOK supports Gemini, Groq, OpenAI, and Claude.',
  },
  {
    question: 'How does folder monitoring work?',
    answer:
      'Choose a folder and a rename template, and Zush can process new supported files as they arrive. Monitored renames remain visible in Activity history and can be undone.',
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
      'Zush PRO costs $8 per month or $38 as a one-time purchase. Both plans include unlimited PRO renames, BYOK, Offline AI mode, and all PRO features. Eligible purchases include a 14-day refund period.',
  },
];
