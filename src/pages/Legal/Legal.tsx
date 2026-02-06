import ReactMarkdown from 'react-markdown';
import BackToHome from '@/components/BackToHome';
import styles from './Legal.module.scss';
import '@/styles/markdown-content.scss';

import tosContent from '@/content/tos.md?raw';
import privacyContent from '@/content/privacy.md?raw';
import refundContent from '@/content/refund.md?raw';

interface LegalProps {
  type: 'tos' | 'privacy' | 'refund';
}

const contentMap: Record<string, string> = {
  tos: tosContent,
  privacy: privacyContent,
  refund: refundContent
};

const titles: Record<string, string> = {
  tos: 'Terms of Service',
  privacy: 'Privacy Policy',
  refund: 'Refund Policy'
};

const Legal = ({ type }: LegalProps) => {
  const content = contentMap[type];

  return (
    <section className={styles.Legal}>
      <div className={styles.Legal__Container}>
        <h1 className={styles.Legal__Title}>{titles[type]}</h1>
        <p className={styles.Legal__Updated}>Last updated: January 1, 2026</p>
        <div className={`${styles.Legal__Content} markdown-content`}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <BackToHome className={styles.Legal__BackLink} />
      </div>
    </section>
  );
};

export default Legal;
