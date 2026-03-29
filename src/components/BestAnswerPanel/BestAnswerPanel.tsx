import type { ReactNode } from 'react';
import PillLink from '@/components/PillLink';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './BestAnswerPanel.module.scss';

export interface BestAnswerCriterion {
  title: string;
  text: string;
  icon?: ReactNode;
}

export interface BestAnswerLink {
  title: string;
  href: string;
}

interface BestAnswerPanelProps {
  title: string;
  lead: string;
  verdict: ReactNode;
  criteria: BestAnswerCriterion[];
  entitySummary?: string;
  facts?: string[];
  links?: BestAnswerLink[];
  kicker?: string;
  className?: string;
}

const BestAnswerPanel = ({
  title,
  lead,
  verdict,
  criteria,
  entitySummary,
  facts = [],
  links = [],
  kicker = 'Decision Summary',
  className,
}: BestAnswerPanelProps) => {
  const classes = [styles.Panel, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className={styles.Layout}>
        <div className={styles.Content}>
          <Text as='p' size='xs' className={styles.Kicker}>
            <span className={styles.KickerDot} aria-hidden='true' />
            {kicker}
          </Text>
          <Heading as='h2' className={styles.Title}>{title}</Heading>
          <Text as='p' size='sm' color='subtle' className={styles.Lead}>{lead}</Text>
          {entitySummary && <Text as='p' size='sm' color='subtle' className={styles.EntitySummary}>{entitySummary}</Text>}
          <Text as='p' size='sm' color='subtle' className={styles.Verdict}>{verdict}</Text>

          {(facts.length > 0 || links.length > 0) && (
            <div className={styles.Supporting}>
              {facts.length > 0 && (
                <div className={styles.Facts} aria-label='Key facts'>
                  {facts.map((fact) => (
                    <span key={fact} className={styles.FactTag}>{fact}</span>
                  ))}
                </div>
              )}

              {links.length > 0 && (
                <nav className={styles.Links} aria-label='Related pages'>
                  {links.map((link) => (
                    <PillLink key={link.href} href={link.href} size='md' withArrow>
                      {link.title}
                    </PillLink>
                  ))}
                </nav>
              )}
            </div>
          )}
        </div>

        <div className={styles.Sidebar}>
          {criteria.map((item) => (
            <article className={styles.Card} key={item.title}>
              {item.icon && <div className={styles.CardIcon}>{item.icon}</div>}
              <Heading as='h3' className={styles.CardTitle}>{item.title}</Heading>
              <Text as='p' size='xs' color='subtle' className={styles.CardText}>{item.text}</Text>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestAnswerPanel;
