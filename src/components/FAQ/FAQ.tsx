import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
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

  const faqs = [
    {
      question: 'What is Zush?',
      answer:
        'Zush is an intelligent macOS application that automates the tedious task of renaming media files. Using advanced AI, it analyzes the content of your images and documents to generate descriptive, meaningful filenames, helping you keep your library perfectly organized.',
    },
    {
      question: 'What file formats are supported?',
      answer:
        'Zush supports all popular image formats: PNG, JPG, JPEG, WebP, GIF, BMP, TIFF, TIF, HEIC, and HEIF. We also support SVG vector graphics and PDF documents (the first page is analyzed for AI renaming).',
    },
    {
      question: 'How does Zush AI Rename work?',
      answer:
        'AI Rename allows you to rename multiple files at once using artificial intelligence. Simply drag and drop a collection of images onto the Zush window, and all files will be analyzed and renamed in seconds. You can review and regenerate individual file names before applying changes. Perfect for organizing large collections of screenshots or photos.',
    },
    {
      question: 'How does folder monitoring work?',
      answer:
        'Zush monitors your selected folders in the background. When you add new images or documents to a monitored folder, Zush automatically analyzes the content and renames files in real-time — no manual action required.',
    },
    {
      question: 'Can I regenerate an AI-generated filename?',
      answer:
        'Yes, you can regenerate the AI-generated name for any file. In the AI Rename section, simply select the file and click the regenerate button to get a new AI-generated name.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Completely. Your files never leave your computer. For AI analysis, only a temporary compressed copy of the image without metadata is sent, which is never stored on our servers.',
    },
    {
      question: 'Can I undo changes made by the program?',
      answer:
        'Yes, you can easily undo any changes in the Activity section of the Monitor tab.',
    },
    {
      question: 'Does Zush support multiple languages?',
      answer:
        'Yes, Zush supports multiple languages for AI-generated filenames. You can select your preferred language in the app settings, and the AI will generate file names in that language.',
    },
    {
      question: 'How many renames are included in the free tier?',
      answer:
        'The free tier includes 50 AI-powered renames. This is enough to experience the magic of Zush first-hand. The PRO version removes all limits on the number of renames.',
    },
    {
      question: 'Which operating systems are supported?',
      answer:
        'Currently, Zush is exclusively available for macOS (version 13.0 Ventura and newer).',
    },
    {
      question: 'Which AI model does the app use?',
      answer:
        'We use state-of-the-art models from Groq (specifically Llama 4 Scout 17B) to ensure high speed and incredible accuracy in recognizing objects in your photos.',
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
          Absolutely. If Zush isn't right for you, we offer a 14-day money-back
          guarantee. You can find more details in our{' '}
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
