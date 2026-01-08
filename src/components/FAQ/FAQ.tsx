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
      question: "Does the app work offline?",
      answer: "Yes, Zush is a native macOS application that processes your files locally. However, an internet connection is required for AI features (image analysis and name generation) as we use advanced cloud models to ensure the best possible quality."
    },
    {
      question: "Can I get a refund if it doesn't fit my needs?",
      answer: (
        <>
          Absolutely. If Zush isn't right for you, we offer a 14-day money-back guarantee. You can find more details in our <Link to="/refund-policy">Refund Policy</Link>.
        </>
      )
    },
    {
      question: "Can I rename existing image files?",
      answer: "Yes, that's the core feature of Zush. Simply select a folder with images, and the app will automatically suggest meaningful names based on their content."
    },
    {
      question: "How many renames are included in the free tier?",
      answer: "The free tier includes 50 AI-powered renames. This is enough to experience the magic of Zush first-hand. The PRO version removes all limits on the number of renames."
    },
    {
      question: "Which operating systems are supported?",
      answer: "Currently, Zush is exclusively available for macOS (version 13.0 Ventura and newer)."
    },
    {
      question: "Can I undo changes made by the program?",
      answer: "Yes, you can easily undo any changes in the dedicated History tab. This feature is currently in development and will be available starting tomorrow!"
    },
    {
      question: "Which AI model does the app use?",
      answer: "We use state-of-the-art models from Google's Gemini family (specifically Gemini 3 Flash) to ensure high speed and incredible accuracy in recognizing objects in your photos."
    },
    {
      question: "Is my data secure?",
      answer: "Completely. Your files never leave your computer. For AI analysis, only a temporary compressed copy of the image without metadata is sent, which is never stored on our servers."
    },
    {
      question: "What file formats are supported?",
      answer: "Zush supports all popular image formats: PNG, JPG, JPEG, WebP, GIF, BMP, TIFF, TIF, HEIC, and HEIF. We also support SVG vector graphics and PDF documents (the first page is analyzed for AI renaming)."
    }
  ];

  return (
    <section id="faq" className={styles.FAQ}>
      <div className={styles.FAQ__Container}>
        <SectionHeader
          title={<>Frequently Asked <span className={styles.FAQ__TitleAccent}>Questions</span></>}
          description="Everything you need to know about Zush in one place"
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
