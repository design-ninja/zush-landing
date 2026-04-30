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
  title?: string;
  updated?: string;
  content?: string;
  backToHomeLabel?: string;
  homeHref?: string;
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

const Legal = ({
  type,
  title,
  updated = 'Last updated: March 19, 2026',
  content,
  backToHomeLabel,
  homeHref,
}: LegalProps) => {
  const markdown = content ?? contentMap[type];

  return (
    <section className={styles.Legal}>
      <div className={styles.Legal__Container}>
        <Heading as='h1' className={styles.Legal__Title}>{title ?? titles[type]}</Heading>
        <Text as='p' color='subtle' className={styles.Legal__Updated}>{updated}</Text>
        <div className={`${styles.Legal__Content} markdown-content`}>
          <ReactMarkdown
            components={{
              a: ({ node: _node, ...props }) => <LegalMarkdownLink {...props} />,
              h1: ({ node: _node, children }) => <Heading as='h2'>{children}</Heading>,
              h2: ({ node: _node, children }) => <Heading as='h2'>{children}</Heading>,
              h3: ({ node: _node, children }) => <Heading as='h3'>{children}</Heading>,
              h4: ({ node: _node, children }) => <Heading as='h4'>{children}</Heading>,
              p: ({ node: _node, color: _color, children }) => <Text as='p'>{children}</Text>,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
        <BackToHome className={styles.Legal__BackLink} href={homeHref} label={backToHomeLabel} />
      </div>
    </section>
  );
};

export default Legal;
