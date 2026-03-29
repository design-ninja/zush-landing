import ReactMarkdown from 'react-markdown';
import AppLink from '@/components/AppLink';
import BackToHome from '@/components/BackToHome';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './Legal.module.scss';
import '@/styles/markdown-content.scss';

import tosContent from '@/content/tos.md?raw';
import privacyContent from '@/content/privacy.md?raw';
import refundContent from '@/content/refund.md?raw';

interface LegalProps {
  type: 'tos' | 'privacy' | 'refund';
}

interface LegalMarkdownLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  href?: string;
}

const LegalMarkdownLink = ({ href = '', className, ...props }: LegalMarkdownLinkProps) => {
  return (
    <AppLink
      {...props}
      className={className}
      href={href}
      variant="legal"
    />
  );
};

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
        <Heading as='h1' className={styles.Legal__Title}>{titles[type]}</Heading>
        <Text as='p' color='subtle' className={styles.Legal__Updated}>Last updated: March 19, 2026</Text>
        <div className={`${styles.Legal__Content} markdown-content`}>
          <ReactMarkdown
            components={{
              a: ({ node: _node, ...props }) => <LegalMarkdownLink {...props} />,
              h1: ({ node: _node, ...props }) => <Heading as='h2' {...props} />,
              h2: ({ node: _node, ...props }) => <Heading as='h2' {...props} />,
              h3: ({ node: _node, ...props }) => <Heading as='h3' {...props} />,
              h4: ({ node: _node, ...props }) => <Heading as='h4' {...props} />,
              p: ({ node: _node, ...props }) => <Text as='p' {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
        <BackToHome className={styles.Legal__BackLink} />
      </div>
    </section>
  );
};

export default Legal;
