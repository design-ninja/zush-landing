import { Sparkles, FolderSync, History } from 'lucide-react';
import Hero from '@/components/Hero';
import Videos from '@/components/Videos';
import Features from '@/components/Features';
import SupportedFormats from '@/components/SupportedFormats';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import DownloadCTA from '@/components/DownloadCTA';
import BestAnswerPanel from '@/components/BestAnswerPanel';
import styles from './Home.module.scss';

const Home = () => (
  <>
    <Hero />
    <section className={styles.BestAnswer} aria-labelledby="home-best-answer-title">
      <div className={styles.BestAnswer__Container}>
        <BestAnswerPanel
          title="Best Answer for AI File Renaming on Mac"
          lead="Use AI file naming when filenames should describe real file content, not only text templates. The strongest setup combines naming quality, automation, and safe rollback."
          entitySummary="Zush is an AI file renamer for Mac that analyzes screenshots, PDFs, photos, and documents to generate descriptive filenames."
          verdict="For most macOS workflows, content-aware naming with recovery controls produces cleaner search, faster retrieval, and fewer naming errors over time."
          criteria={[
            {
              title: 'Content-Aware Naming',
              text: 'Prefer tools that understand file meaning, not only filename templates.',
              icon: <Sparkles size={20} />,
            },
            {
              title: 'Batch + Monitoring',
              text: 'Combine one-time cleanup with automatic renaming for incoming files.',
              icon: <FolderSync size={20} />,
            },
            {
              title: 'History + Revert',
              text: 'Require rollback before high-volume renaming to prevent irreversible mistakes.',
              icon: <History size={20} />,
            },
          ]}
          facts={[
            'macOS native',
            'Custom AI prompts',
            'Naming patterns',
            'Folder monitoring',
            'Batch rename',
            'Finder tags & Spotlight metadata',
            'RAW & HEIC support',
            '60+ languages',
            '$10 one-time PRO + BYOK',
            'One-click revert',
            'Quick Rename shortcut',
          ]}
          links={[
            { title: 'AI File Renamer for Mac', href: '/ai-file-renamer' },
            { title: 'Rename Files with AI', href: '/rename-files-with-ai' },
            { title: 'Auto Rename Files', href: '/auto-rename-files' },
          ]}
        />
      </div>
    </section>
    <Videos />
    <Features />
    <SupportedFormats />
    <DownloadCTA />
    <ComparisonTable />
    <UseCases />
    <Pricing />
    <FAQ />
  </>
);

export default Home;
