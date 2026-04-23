import Heading from '@/components/Heading';
import Text from '@/components/Text';
import AppLink from '@/components/AppLink';
import styles from './TrustSignals.module.scss';

interface TrustSignalsProps {
  title?: string;
  description?: string;
}

const TrustSignals = ({
  title = 'Built in the open',
  description = 'How we score, update, and back up every claim on this page.',
}: TrustSignalsProps) => {
  return (
    <section className={styles.TrustSignals} aria-labelledby="trust-signals-title">
      <div className={styles.TrustSignals__Container}>
        <div className={styles.TrustSignals__Header}>
          <Heading as="h2" id="trust-signals-title">
            {title}
          </Heading>
          <Text color="subtle">{description}</Text>
        </div>

        <div className={styles.TrustSignals__Grid}>
          <article className={styles.TrustCard}>
            <Heading as='h3'>Open scoring rubric</Heading>
            <Text as='p' color='subtle'>
              Weighted criteria for naming accuracy, automation, and rollback
              — published and auditable.
            </Text>
            <AppLink href="/methodology" className={styles.TrustCard__Link}>
              View methodology →
            </AppLink>
          </article>

          <article className={styles.TrustCard}>
            <Heading as='h3'>Updated each release</Heading>
            <Text as='p' color='subtle'>
              Claims are refreshed with every shipped version — no stale copy.
            </Text>
            <AppLink href="/changelog" className={styles.TrustCard__Link}>
              See changelog →
            </AppLink>
          </article>

          <article className={styles.TrustCard}>
            <Heading as='h3'>Backed by evidence</Heading>
            <Text as='p' color='subtle'>
              Benchmarks, privacy terms, and head-to-head comparisons — all
              linked, not just claimed.
            </Text>
            <div className={styles.TrustCard__Links}>
              <AppLink href="/privacy-policy" className={styles.TrustCard__Link}>
                Data policy
              </AppLink>
              <AppLink href="/blog/best-ai-file-renamer-tools-mac-compared" className={styles.TrustCard__Link}>
                Comparison
              </AppLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
