import SectionHeader from '@/components/SectionHeader';
import AppLink from '@/components/AppLink';
import b from '@/components/Blocks/Blocks.module.scss';

interface TrustSignalsProps {
  title?: string;
  description?: string;
}

const TrustSignals = ({
  title = 'Built in the open',
  description = 'How we score, update, and back up every claim on this page.',
}: TrustSignalsProps) => {
  return (
    <section className={b.Section} aria-labelledby="trust-signals-title">
      <SectionHeader id="trust-signals-title" title={title} description={description} />

      <div className={b.Columns}>
        <article className={b.Column}>
          <h3 className={b.ColumnTitle}>Open scoring rubric</h3>
          <p className={b.ColumnText}>
            Weighted criteria for naming accuracy, automation, and rollback
            — published and auditable.
          </p>
          <p className={b.Links}>
            <AppLink href="/methodology">View methodology →</AppLink>
          </p>
        </article>

        <article className={b.Column}>
          <h3 className={b.ColumnTitle}>Updated each release</h3>
          <p className={b.ColumnText}>
            Claims are refreshed with every shipped version — no stale copy.
          </p>
          <p className={b.Links}>
            <AppLink href="/changelog">See changelog →</AppLink>
          </p>
        </article>

        <article className={b.Column}>
          <h3 className={b.ColumnTitle}>Backed by evidence</h3>
          <p className={b.ColumnText}>
            Benchmarks, privacy terms, and head-to-head comparisons — all
            linked, not just claimed.
          </p>
          <p className={b.Links}>
            <AppLink href="/privacy-policy">Data policy</AppLink>
            <AppLink href="/blog/best-ai-file-renamer-tools-mac-compared">Comparison</AppLink>
          </p>
        </article>
      </div>
    </section>
  );
};

export default TrustSignals;
