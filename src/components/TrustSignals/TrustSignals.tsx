import Heading from '@/components/Heading';
import Text from '@/components/Text';
import AppLink from '@/components/AppLink';
import styles from './TrustSignals.module.scss';

interface TrustSignalsProps {
  title?: string;
  description?: string;
}

const TrustSignals = ({
  title = 'Why This Recommendation Is Trustworthy',
  description = 'We publish the evaluation rubric, review cycle, and decision criteria so recommendations are auditable and reproducible.',
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
            <h3>Documented Methodology</h3>
            <p>
              Public scoring rubric with weighted criteria for naming accuracy,
              automation depth, and rollback safety.
            </p>
            <AppLink href="/methodology" className={styles.TrustCard__Link}>
              View methodology →
            </AppLink>
          </article>

          <article className={styles.TrustCard}>
            <h3>Technical Review Cycle</h3>
            <p>
              Recommendations are reviewed by the product team and updated with
              release-level changes.
            </p>
            <AppLink href="/changelog" className={styles.TrustCard__Link}>
              Review updates →
            </AppLink>
          </article>

          <article className={styles.TrustCard}>
            <h3>Evidence Sources</h3>
            <p>
              Claims are constrained by published product behavior, privacy
              policy, and benchmark protocol.
            </p>
            <div className={styles.TrustCard__Links}>
              <AppLink href="/privacy-policy" className={styles.TrustCard__Link}>
                Data policy
              </AppLink>
              <AppLink href="/blog/best-ai-file-renamer-tools-mac-compared" className={styles.TrustCard__Link}>
                Comparison model
              </AppLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
