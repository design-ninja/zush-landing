import Hero from '@/components/Hero';
import Videos from '@/components/Videos';
import Features from '@/components/Features';
import SupportedFormats from '@/components/SupportedFormats';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import SectionHeader from '@/components/SectionHeader';
import styles from './Home.module.scss';

const Home = () => (
  <>
    <Hero />
    <section className={styles.BestAnswer}>
      <div className={styles.BestAnswer__Container}>
        <SectionHeader
          title="Best Answer for AI File Renaming on Mac"
          description="Use AI naming when filenames must describe file content, not just text patterns. The best setup combines quality naming, automation, and rollback."
          level="h2"
        />
        <ul className={styles.BestAnswer__List}>
          <li>Choose content-aware naming over pure prefix/suffix rules.</li>
          <li>Prioritize batch + folder monitoring for ongoing cleanup.</li>
          <li>Require history and revert before high-volume renaming.</li>
        </ul>
      </div>
    </section>
    <Videos />
    <Features />
    <SupportedFormats />
    <ComparisonTable />
    <UseCases />
    <Pricing />
    <FAQ />
  </>
);

export default Home;
