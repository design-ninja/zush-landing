import type { FAQItem } from '@/data/blog';
import { APP_CONFIG } from '@/constants';

const imageExtensions = APP_CONFIG.image_extensions.map((e) => e.toUpperCase()).join(', ');
const documentExtensions = APP_CONFIG.document_extensions.map((e) => e.toUpperCase()).join(', ');

export const HOME_FAQ_DATA: FAQItem[] = [
  {
    question: 'What is Zush?',
    answer:
      'Zush is an intelligent desktop application for Mac and Windows that automates the tedious task of renaming files. Using advanced AI, it analyzes images and supported documents, including PDFs, to generate descriptive, meaningful filenames and metadata, helping you keep your library perfectly organized.',
  },
  {
    question: 'What file formats are supported?',
    answer: `Zush supports visual formats: ${imageExtensions}. Supported document formats include ${documentExtensions}. SVG is supported too, so you can organize both visual assets and everyday documents in one workflow.`,
  },
  {
    question: 'How does Zush AI Rename work?',
    answer:
      'AI Rename allows you to rename multiple files at once using artificial intelligence. Simply drag and drop a collection of files onto the Zush window, and they will be analyzed and renamed in seconds. You can review and regenerate individual file names before applying changes. Perfect for organizing screenshots, PDFs, docs, and downloads in one pass.',
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
      'Yes! You can write your own instructions that guide how the AI generates file names and metadata tags. For example, you can set rename rules like "Keep names short, main subject first" or tagging rules like "Only use these tags: portrait, product, packaging." This feature is free and available to all users.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Your original files stay on your computer. In Cloud mode, Zush sends only the analysis payload needed for renaming, such as a compressed preview, extracted text, or compact summary, to the selected AI provider. In Offline AI mode, private local models via Ollama process supported files on your device and file analysis content is not sent to Zush cloud or third-party AI providers.',
  },
  {
    question: 'Can I undo changes made by the program?',
    answer:
      'Yes, you can easily undo any changes in the Activity section of the Monitor tab.',
  },
  {
    question: 'Does Zush support multiple languages and date formats?',
    answer:
      'Yes, Zush supports 60+ languages for AI-generated filenames and lets you choose your preferred date format. Both features are available to all users in app settings.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Zush PRO is a simple one-time purchase for $10. You get 10,000 credits (1 credit = 1 rename) and access to all features, including BYOK and Offline AI mode - private local models via Ollama. Once credits are used up, enable BYOK with your own provider key or use Offline AI mode.',
  },
  {
    question: 'What is BYOK (Bring Your Own Key)?',
    answer:
      'BYOK lets PRO users connect their own API key from Gemini, Groq, OpenAI, or Claude for unlimited cloud renames. Your key is stored locally in secure platform storage and is sent only when Zush needs to call your selected provider through the backend relay. Learn more at https://zushapp.com/byok-setup.',
  },
  {
    question: 'Why one-time purchase instead of subscription?',
    answer:
      "We believe in fair, transparent pricing. Pay once, own it forever — no recurring fees, no surprise price hikes, no worry about canceling. You get lifetime access to all features and updates. It's simple: you pay $10 once, and Zush is yours to keep. No subscription fatigue, no monthly billing stress. Just a straightforward, honest deal that respects your wallet and your time.",
  },
  {
    question: 'Which operating systems are supported?',
    answer: `Zush runs on macOS (${APP_CONFIG.min_macos_version} ${APP_CONFIG.min_macos_name} and newer) and Windows 10 / 11. The Mac build is distributed as a signed .dmg and on the Mac App Store; the Windows build is available on the Microsoft Store.`,
  },
  {
    question: 'Which AI model does the app use?',
    answer:
      'We use state-of-the-art multimodal AI models to ensure high speed and strong accuracy when analyzing both visual files and supported documents. The specific model may change as we continuously optimize for the best results.',
  },
  {
    question: 'Does the app work offline?',
    answer:
      'Cloud processing requires an internet connection. PRO users can enable Offline AI mode - private local models via Ollama after installing Ollama and downloading a compatible model. Learn more at https://zushapp.com/ollama-setup.',
  },
  {
    question: 'Do you support audio or video files?',
    answer:
      'Not yet. Right now Zush focuses on images and supported documents, including PDFs. Audio and video support is on our roadmap and already under active exploration. Stay tuned!',
  },
  {
    question: "Can I get a refund if it doesn't fit my needs?",
    answer: `Absolutely. If Zush isn't right for you, we offer a ${APP_CONFIG.refund_period_days}-day money-back guarantee. You can find more details in our refund policy at https://zushapp.com/refund-policy.`,
  },
];
