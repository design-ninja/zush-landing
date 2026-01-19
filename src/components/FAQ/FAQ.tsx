import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, CREDIT_PACKS } from '@/constants';
import SectionHeader from '../SectionHeader';
import styles from './FAQ.module.scss';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className={`${styles.FAQItem} ${isOpen ? styles.FAQItem_active : ''}`}>
      <button className={styles.FAQItem__Header} onClick={onClick}>
        <h3 className={styles.FAQItem__Question}>{question}</h3>
        <ChevronDown size={24} className={styles.FAQItem__Icon} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.FAQItem__Content}
          >
            <div className={styles.FAQItem__Answer}>{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US').format(value);

  const normalizeExtensions = (extensions: string[]) =>
    extensions.map((extension) => extension.toLowerCase());

  const formatExtension = (extension: string) => extension.toUpperCase();

  const imageExtensions = normalizeExtensions(APP_CONFIG.image_extensions);
  const baseExtensions = imageExtensions.filter(
    (extension) => extension !== 'svg' && extension !== 'pdf'
  );
  const supportsSvg = imageExtensions.includes('svg');
  const supportsPdf = imageExtensions.includes('pdf');
  const formattedExtensions = baseExtensions.map(formatExtension).join(', ');
  const freeTierLimit = formatNumber(APP_CONFIG.free_tier_limit);
  const creditValues = CREDIT_PACKS.map((pack) => pack.credits);
  const minCredits = formatNumber(Math.min(...creditValues));
  const maxCredits = formatNumber(Math.max(...creditValues));
  const aiProvider = APP_CONFIG.ai_provider;
  const aiModel = APP_CONFIG.ai_model;
  const refundPeriodDays = APP_CONFIG.refund_period_days;
  const minMacosVersion = APP_CONFIG.min_macos_version;
  const minMacosName = APP_CONFIG.min_macos_name;

  const faqs = [
    {
      question: 'What is Zush?',
      answer:
        'Zush is an intelligent macOS application that automates the tedious task of renaming media files. Using advanced AI, it analyzes the content of your images (including RAW), SVGs, and PDFs to generate descriptive, meaningful filenames, helping you keep your library perfectly organized.',
    },
    {
      question: 'What file formats are supported?',
      answer:
        `Zush supports popular image formats: ${formattedExtensions}.` +
        `${supportsSvg ? ' We also support SVG vector graphics.' : ''}` +
        `${
          supportsPdf
            ? ' PDF documents are supported too (the first page is analyzed for AI renaming).'
            : ''
        }`,
    },
    {
      question: 'How does Zush AI Rename work?',
      answer:
        'AI Rename allows you to rename multiple files at once using artificial intelligence. Simply drag and drop a collection of images onto the Zush window, and all files will be analyzed and renamed in seconds. You can review and regenerate individual file names before applying changes. Perfect for organizing large collections of screenshots or photos.',
    },
    {
      question: 'How does folder monitoring work?',
      answer:
        'Zush monitors your selected folders in the background. When you add new images or PDFs to a monitored folder, Zush automatically analyzes the content and renames files in real-time while you are online — no manual action required.',
    },
    {
      question: 'Can I regenerate an AI-generated filename?',
      answer:
        'Yes, you can regenerate the AI-generated name for any file. In the AI Rename section, simply select the file and click the regenerate button to get a new AI-generated name.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Your original files stay on your computer. For AI analysis, Zush sends a resized, compressed JPEG copy to our servers, which is forwarded to our AI providers for processing. We do not store the image in our database.',
    },
    {
      question: 'Can I undo changes made by the program?',
      answer:
        'Yes, you can easily undo any changes in the Activity section of the Monitor tab.',
    },
    {
      question: 'Does Zush support multiple languages and date formats?',
      answer:
        'Yes, Zush supports 60+ languages for AI-generated filenames and lets you choose a date format. Both are available in app settings; non-English languages and date format changes require PRO.',
    },
    {
      question: 'How many renames are included in the free tier?',
      answer: `The free tier includes ${freeTierLimit} AI-powered renames. This is enough to experience the magic of Zush first-hand. PRO plans include ${minCredits}-${maxCredits} credits per month depending on the pack (1 credit = 1 rename).`,
    },
    {
      question: 'Which operating systems are supported?',
      answer: `Currently, Zush is exclusively available for macOS (version ${minMacosVersion} ${minMacosName} and newer).`,
    },
    {
      question: 'Which AI model does the app use?',
      answer: `We use state-of-the-art models from ${aiProvider} (specifically ${aiModel}) to ensure high speed and incredible accuracy in recognizing objects in your photos.`,
    },
    {
      question: 'Does the app work offline?',
      answer:
        'Zush requires an internet connection for the AI features (image analysis and name generation) to function. While it is a native macOS application that processes your files locally, we use advanced cloud models to ensure the best possible quality and accuracy.',
    },
    {
      question: "Can I get a refund if it doesn't fit my needs?",
      answer: (
        <>
          Absolutely. If Zush isn't right for you, we offer a {refundPeriodDays}
          -day money-back guarantee. You can find more details in our{' '}
          <Link to='/refund-policy'>Refund Policy</Link>.
        </>
      ),
    },
  ];

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
