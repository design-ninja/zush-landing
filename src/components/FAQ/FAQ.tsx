import { memo, useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '@/constants';
import AppLink from '@/components/AppLink';
import Heading from '@/components/Heading';
import SectionHeader from '../SectionHeader';
import styles from './FAQ.module.scss';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = memo(({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className={`${styles.FAQItem} ${isOpen ? styles.FAQItem_active : ''}`}>
      <button className={styles.FAQItem__Header} onClick={onClick} aria-expanded={isOpen}>
        <Heading as='h3' className={styles.FAQItem__Question}>{question}</Heading>
        <ChevronDown size={24} className={styles.FAQItem__Icon} />
      </button>
      <div
        className={`${styles.FAQItem__Content} ${isOpen ? styles.FAQItem__Content_open : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.FAQItem__Answer}>{answer}</div>
      </div>
    </div>
  );
});

FAQItem.displayName = 'FAQItem';

const normalizeExtensions = (extensions: string[]) =>
  extensions.map((extension) => extension.toLowerCase());

const formatExtension = (extension: string) => extension.toUpperCase();

const imageExtensions = normalizeExtensions(APP_CONFIG.image_extensions);
const documentExtensions = normalizeExtensions(APP_CONFIG.document_extensions);
const visualExtensions = imageExtensions.map(formatExtension).join(', ');
const formattedDocumentExtensions = documentExtensions.map(formatExtension).join(', ');
const refundPeriodDays = APP_CONFIG.refund_period_days;
const minMacosVersion = APP_CONFIG.min_macos_version;
const minMacosName = APP_CONFIG.min_macos_name;

interface FAQData {
  question: string;
  answer: React.ReactNode;
}

const createFAQData = (): FAQData[] => [
  {
    question: 'What is Zush?',
    answer:
      'Zush is an intelligent macOS application that automates the tedious task of renaming files. Using advanced AI, it analyzes images, PDFs, and supported documents to generate descriptive, meaningful filenames and metadata, helping you keep your library perfectly organized.',
  },
  {
    question: 'What file formats are supported?',
    answer:
      `Zush supports visual formats: ${visualExtensions}. Supported document formats include ${formattedDocumentExtensions}. PDFs and SVGs are supported too, so you can organize both visual assets and everyday documents in one workflow.`,
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
      'Your original files stay on your computer. For AI analysis, Zush sends either a compressed preview image, extracted document text, or a compact content summary, along with selected processing options and any custom rename or tagging prompts you choose to provide, then forwards the request to our AI providers. We do not store file content after processing as part of normal operation.',
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
    answer: `Zush PRO is a simple one-time purchase for $10. You get 10,000 credits (1 credit = 1 rename) and access to all features. Once your credits are used up, enable BYOK (Bring Your Own Key) with your own API key from Gemini, Groq, OpenAI, or Claude for unlimited processing.`,
  },
  {
    question: 'What is BYOK (Bring Your Own Key)?',
    answer: (
      <>
        BYOK lets PRO users connect their own API key from Gemini, Groq, OpenAI, or Claude for unlimited file processing. When BYOK is enabled, Zush uses your API key through its backend relay to call your chosen AI provider, so you pay the provider directly and have no credit limits. Perfect for power users with large libraries.{' '}
        <AppLink href="/byok-setup">Learn how to set it up →</AppLink>
      </>
    ),
  },
  {
    question: 'Why one-time purchase instead of subscription?',
    answer:
      'We believe in fair, transparent pricing. Pay once, own it forever — no recurring fees, no surprise price hikes, no worry about canceling. You get lifetime access to all features and updates. It\'s simple: you pay $10 once, and Zush is yours to keep. No subscription fatigue, no monthly billing stress. Just a straightforward, honest deal that respects your wallet and your time.',
  },
  {
    question: 'Which operating systems are supported?',
    answer: `Currently, Zush is exclusively available for macOS (version ${minMacosVersion} ${minMacosName} and newer).`,
  },
  {
    question: 'Which AI model does the app use?',
    answer: 'We use state-of-the-art multimodal AI models to ensure high speed and strong accuracy when analyzing both visual files and supported documents. The specific model may change as we continuously optimize for the best results.',
  },
  {
    question: 'Does the app work offline?',
    answer:
      'Zush requires an internet connection for the AI features (file analysis and name generation) to function. While it is a native macOS application that prepares files locally, we use advanced cloud models to ensure the best possible quality and accuracy.',
  },
  {
    question: 'Do you support audio or video files?',
    answer:
      'Not yet. Right now Zush focuses on images, PDFs, and supported documents. Audio and video support is on our roadmap and already under active exploration. Stay tuned!',
  },
  {
    question: "Can I get a refund if it doesn't fit my needs?",
    answer: (
      <>
        Absolutely. If Zush isn't right for you, we offer a {refundPeriodDays}
        -day money-back guarantee. You can find more details in our{' '}
        <AppLink href="/refund-policy">Refund Policy</AppLink>.
      </>
    ),
  },
];

const FAQ_DATA = createFAQData();

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = useMemo(() => FAQ_DATA, []);

  return (
    <section id='faq' className={styles.FAQ}>
      <div className={styles.FAQ__Container}>
        <SectionHeader
          title={
            <>
              Frequently Asked{' '}
              <span className={styles.FAQ__TitleAccent}>Questions</span>
            </>
          }
          description='Everything you need to know about Zush in one place'
        />

        <div className={styles.FAQ__Grid}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
