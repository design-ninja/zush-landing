import {
  Camera,
  DollarSign,
  History,
  Monitor,
  Zap,
} from 'lucide-react';
import Heading from '@/components/Heading';
import SectionHeader from '@/components/SectionHeader';
import Text from '@/components/Text';
import { useOS } from '@/hooks/useOS';
import styles from './WhyZush.module.scss';

const pricingTrustItems = [
  '✨ Free to try',
  '🚫 No subscription',
  '↩️ 14-day refund',
];
const formatPills = [
  'cr2',
  'nef',
  'arw',
  'dng',
  'raf',
  'rw2',
  'orf',
  'pef',
];

const renameExamples = [
  {
    oldName: 'Screenshot 2026-04-10 at 14.32.png',
    newName: 'stripe-revenue-dashboard.png',
  },
  {
    oldName: 'scan_0034.pdf',
    newName: 'acme-invoice-april-2026.pdf',
  },
];

const workflowSteps = [
  'Batch old piles',
  'Watch new folders',
  'Revert from history',
];

const WhyZush = () => {
  const { downloadOS } = useOS();
  const isWindows = downloadOS === 'windows';

  return (
    <section className={styles.WhyZush}>
      <div className={styles.WhyZush__Container}>
        <SectionHeader
          title={
            <>
              Why <span className={styles.WhyZush__TitleAccent}>Zush</span>{' '}
              Fits Real Desktop Work
            </>
          }
          description='One-time pricing, desktop-native feel, fast renaming, and fewer annoying decisions'
        />

        <div className={styles.Grid}>
          <article className={`${styles.Card} ${styles.Card_price}`}>
            <div className={styles.Card__Header}>
              <div className={styles.Card__Icon}>
                <DollarSign size={24} />
              </div>
              <span className={styles.Card__Eyebrow}>One-time fair pricing</span>
            </div>

            <div className={styles.PriceLayout}>
              <div className={styles.PriceCopy}>
                <Heading as='h3' className={styles.Card__Title}>
                  Pay once, keep the workflow
                </Heading>
                <Text className={styles.Card__Description} color='subtle'>
                  Most AI file renamers try to become another monthly bill.
                  Zush stays simple: free to try, then one small one-time
                  purchase when it proves useful.
                </Text>

                <div className={styles.PricePanel}>
                  <div className={styles.PricePanel__Header}>
                    <span className={styles.PricePanel__Value}>$10</span>
                    <span className={styles.PricePanel__Label}>one-time</span>
                  </div>
                  <ul className={styles.PricePanel__Trust} aria-label='Pricing trust signals'>
                    {pricingTrustItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className={`${styles.Card} ${styles.Card_native}`}>
            <div className={styles.Card__Header}>
              <div className={styles.Card__Icon}>
                <Monitor size={24} />
              </div>
              <span className={styles.Card__Eyebrow}>Desktop-native feel</span>
            </div>

            <Heading as='h3' className={styles.Card__Title}>
              Native, fast, and modern
            </Heading>
            <Text className={styles.Card__Description} color='subtle'>
              Zush feels like a real desktop app: quick to open, clean to use,
              and visually at home on your machine instead of feeling like a
              clunky utility panel.
            </Text>

            <div
              className={`${styles.WindowMockup} ${
                isWindows ? styles.WindowMockup_windows : ''
              }`}
              aria-hidden='true'
            >
              <div className={styles.WindowMockup__TopBar}>
                {isWindows ? (
                  <>
                    <div className={styles.WindowMockup__TitleBar} />
                    <div className={styles.WindowMockup__WindowControls}>
                      <span className={`${styles.WindowMockup__Control} ${styles.WindowMockup__Control_minimize}`} />
                      <span className={`${styles.WindowMockup__Control} ${styles.WindowMockup__Control_maximize}`} />
                      <span className={`${styles.WindowMockup__Control} ${styles.WindowMockup__Control_close}`} />
                    </div>
                  </>
                ) : (
                  <>
                    <span />
                    <span />
                    <span />
                  </>
                )}
              </div>
              <div className={styles.WindowMockup__Body}>
                <div className={styles.WindowMockup__Sidebar}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.WindowMockup__Content}>
                  <span className={styles.WindowMockup__Panel} />
                  <span className={styles.WindowMockup__PanelAccent} />
                  <span className={styles.WindowMockup__PanelWide} />
                </div>
              </div>
            </div>
          </article>

          <article className={`${styles.Card} ${styles.Card_speed}`}>
            <div className={styles.Card__Header}>
              <div className={styles.Card__Icon}>
                <Zap size={24} />
              </div>
              <span className={styles.Card__Eyebrow}>Sssupafast!</span>
            </div>

            <Heading as='h3' className={styles.Card__Title}>
              Renames happen in seconds
            </Heading>
            <Text className={styles.Card__Description} color='subtle'>
              Speed matters because cleanup only sticks if it does not interrupt
              the real work. Drop files in, review, apply, move on.
            </Text>

            <div className={styles.RenameExamples} aria-hidden='true'>
              {renameExamples.map((example) => (
                <div key={example.oldName} className={styles.RenameExamples__Row}>
                  <span className={styles.RenameExamples__Old}>
                    {example.oldName}
                  </span>
                  <span className={styles.RenameExamples__New}>
                    {example.newName}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className={`${styles.Card} ${styles.Card_formats}`}>
            <div className={styles.Card__Header}>
              <div className={styles.Card__Icon}>
                <Camera size={24} />
              </div>
              <span className={styles.Card__Eyebrow}>Pro photo support</span>
            </div>

            <Heading as='h3' className={styles.Card__Title}>
              Native RAW support for photographers
            </Heading>
            <Text className={styles.Card__Description} color='subtle'>
              Supports professional camera formats like CR2, NEF, ARW, DNG,
              RAF, and RW2, so photographers can rename imports by actual image
              content instead of living with `IMG_` chaos.
            </Text>

            <div className={styles.FormatPills} aria-hidden='true'>
              {formatPills.map((pill) => (
                <span key={pill} className={styles.FormatPills__Item}>
                  {pill}
                </span>
              ))}
            </div>
          </article>

          <article className={`${styles.Card} ${styles.Card_control}`}>
            <div className={styles.Card__Header}>
              <div className={styles.Card__Icon}>
                <History size={24} />
              </div>
              <span className={styles.Card__Eyebrow}>Low-risk automation</span>
            </div>

            <Heading as='h3' className={styles.Card__Title}>
              Batch, monitor, and undo
            </Heading>
            <Text className={styles.Card__Description} color='subtle'>
              Clean up old piles in batch, keep new folders readable with
              monitoring, and revert from history if you want a different name.
            </Text>

            <div className={styles.WorkflowSteps} aria-hidden='true'>
              {workflowSteps.map((step, index) => (
                <div key={step} className={styles.WorkflowSteps__Item}>
                  <span className={styles.WorkflowSteps__Number}>
                    {index + 1}
                  </span>
                  <span className={styles.WorkflowSteps__Label}>{step}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default WhyZush;
