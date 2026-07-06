import type { FAQItem } from '@/data/blog';
import { APP_CONFIG, SUPPORTED_FORMAT_COUNT } from '@/constants';

const imageExtensions = APP_CONFIG.image_extensions.map((e) => e.toUpperCase()).join(', ');
const designExtensions = APP_CONFIG.design_extensions.map((e) => e.toUpperCase()).join(', ');
const documentExtensions = APP_CONFIG.document_extensions.map((e) => e.toUpperCase()).join(', ');
const videoExtensions = APP_CONFIG.video_extensions.map((e) => e.toUpperCase()).join(', ');
const audioExtensions = APP_CONFIG.audio_extensions.map((e) => e.toUpperCase()).join(', ');

export const HOME_FAQ_DATA: FAQItem[] = [
  {
    question: 'What is Zush?',
    answer:
      'Zush is an AI file renamer and organizer for Mac and Windows. It reads screenshots, PDFs, photos, documents, videos, audio, and design files, then generates descriptive filenames you can review, batch apply, monitor, and undo.',
  },
  {
    question: 'Is Zush an AI file renamer and organizer?',
    answer:
      'Yes. Zush combines AI file renaming, AI file organization, batch rename, bulk rename, folder monitoring, templates, 145+ Naming Blocks, BYOK, Offline AI mode, and Activity history in one desktop workflow for Mac and Windows.',
  },
  {
    question: 'Can I rename files with AI by content?',
    answer:
      'Yes. Zush is built for content-aware AI file renaming. It can rename files by content from visual previews, extracted text, PDF context, design previews, metadata, transcripts, sampled video frames, and supported audio context, depending on the file type.',
  },
  {
    question: 'Is Zush a file renamer, batch rename tool, or bulk rename tool?',
    answer:
      'Zush is all three. It works as a file renamer AI workflow for individual files, an AI batch rename tool for selected folders, and a bulk rename workflow for larger libraries where every file needs a different content-aware name.',
  },
  {
    question: 'How is AI file renaming different from Bulk Rename Utility or Finder?',
    answer:
      'Bulk Rename Utility, Finder, and File Explorer are best when the same pattern should be applied to every file. Zush is built for content-aware renaming: it analyzes each screenshot, photo, PDF, document, design file, audio file, or video and suggests a unique descriptive name before you apply the batch.',
  },
  {
    question: 'Can Zush rename files based on content?',
    answer:
      'Yes. Zush can rename files based on content from screenshots, photos, PDFs, documents, design previews, audio metadata or transcript context, sampled video frames, and file metadata, depending on the format.',
  },
  {
    question: 'Is there a free AI file renamer for Mac and Windows?',
    answer:
      `Yes. Zush includes ${APP_CONFIG.free_tier_limit} free AI renames before purchase, with no credit card required. The free tier lets you test AI-powered content analysis, batch rename, folder monitoring, review, and undo before upgrading to PRO.`,
  },
  {
    question: 'Does Zush work as an AI file renamer for Windows and Mac?',
    answer:
      `Yes. Zush runs on macOS ${APP_CONFIG.min_macos_version}+ and Windows 10 / 11. The Mac build is available as a signed .dmg, on the Mac App Store, and through Homebrew, and the Windows build is available on the Microsoft Store.`,
  },
  {
    question: 'Is Zush an online AI file renamer or an offline AI file renamer?',
    answer:
      'Zush supports both cloud and local workflows. Cloud mode gives the broadest AI quality for mixed folders. PRO users can also enable BYOK for their own provider key or Offline AI mode with local Ollama models for supported private workflows.',
  },
  {
    question: 'What file formats are supported?',
    answer: `Zush supports ${SUPPORTED_FORMAT_COUNT} unique file extensions across images, design files, documents, videos, and audio. Visual formats include ${imageExtensions}. Supported design formats include ${designExtensions}. Supported document formats include ${documentExtensions}. Supported video formats include ${videoExtensions}. Supported audio formats include ${audioExtensions}. SVG is supported too, so you can organize visual assets, design files, audio, videos, and everyday documents in one workflow.`,
  },
  {
    question: 'How does Zush AI Rename work?',
    answer:
      'AI Rename uses artificial intelligence to rename files by content. Simply drag and drop a collection of files onto the Zush window, and they will be analyzed and renamed in seconds. You can review and regenerate individual file names before applying changes. Perfect for organizing screenshots, design files, audio, videos, PDFs, iWork docs, and downloads in one pass.',
  },
  {
    question: 'How does folder monitoring work?',
    answer:
      'Zush monitors your selected folders in the background. When you add new supported files to a monitored folder, Zush automatically analyzes the content and renames them in real time while you are online — no manual action required.',
  },
  {
    question: 'Can I regenerate an AI-generated filename?',
    answer:
      'Yes, you can regenerate the AI-generated name for any file. In the AI Rename section, simply select the file and click the regenerate button to get a new AI-generated name.',
  },
  {
    question: 'Can I customize the AI prompt used for renaming and tagging?',
    answer:
      'Yes. PRO users can write custom instructions, save reusable templates, and combine 145+ Naming Blocks so AI-generated filenames follow a consistent structure.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Your original files stay on your computer. In Cloud mode, Zush sends only the analysis payload needed for renaming, such as a compressed preview, design preview, sampled video frames, subtitle context, extracted text, temporary iWork PDF preview, compact summary, audio metadata, transcript context, or a bounded audio payload when transcription is required. In Offline AI mode, private local models via Ollama process supported files on your device where supported.',
  },
  {
    question: 'Can I undo changes made by the program?',
    answer:
      'Yes, you can easily undo any changes from the Activity history.',
  },
  {
    question: 'Does Zush support multiple languages and date formats?',
    answer:
      'Yes, Zush supports 60+ languages for AI-generated filenames and lets you choose your preferred date format. Both features are available to all users in app settings.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Zush PRO has two paid plans: Monthly for $8/month, or One-Time for $38. Both unlock unlimited PRO renames, BYOK, Offline AI mode, and all PRO features.',
  },
  {
    question: 'What is BYOK (Bring Your Own Key)?',
    answer:
      'BYOK lets PRO users connect their own API key from Gemini, Groq, OpenAI, or Claude for unlimited cloud renames. Your key is stored locally in secure platform storage and is sent only when Zush needs to call your selected provider through the backend relay. Learn more at https://zushapp.com/byok-setup.',
  },
  {
    question: 'Which PRO plan should I choose?',
    answer:
      'Choose Monthly if you want a lower upfront price and flexibility. Choose One-Time if you prefer to pay once for lifetime access. The feature set is the same.',
  },
  {
    question: 'Which operating systems are supported?',
    answer: `Zush runs on macOS (${APP_CONFIG.min_macos_version} ${APP_CONFIG.min_macos_name} and newer) and Windows 10 / 11. The Mac build is distributed as a signed .dmg, on the Mac App Store, and through Homebrew; the Windows build is available on the Microsoft Store.`,
  },
  {
    question: 'Which AI model does the app use?',
    answer:
      'We use state-of-the-art multimodal and speech-capable AI models to ensure high speed and strong accuracy when analyzing visual files, design files, audio, video, and supported documents. The specific model may change as we continuously optimize for the best results.',
  },
  {
    question: 'Does the app work offline?',
    answer:
      'Cloud processing requires an internet connection. PRO users can enable Offline AI mode - private local models via Ollama after installing Ollama and downloading a compatible model. Learn more at https://zushapp.com/ollama-setup.',
  },
  {
    question: 'Do you support audio or video files?',
    answer:
      `Zush 3.0 supports video analysis for common formats such as MP4, MOV, M4V, MPEG, 3GP, TS, MTS, M2TS, DV, and VOB, plus audio files such as ${audioExtensions}. Video uses sampled frames and subtitle context when available; audio can use metadata, recognition, and transcript context.`,
  },
  {
    question: "Can I get a refund if it doesn't fit my needs?",
    answer: `Absolutely. If Zush isn't right for you, we offer a ${APP_CONFIG.refund_period_days}-day money-back guarantee. You can find more details in our refund policy.`,
  },
];
