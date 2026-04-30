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
import type { DownloadOS } from '@/utils/download';
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

interface WhyZushCopy {
  title: string;
  titlePlatform: string;
  description: string;
  descriptionPlatform: string;
  nativeEyebrow: string;
  nativeEyebrowPlatform: string;
  nativeTitle: string;
  nativeDescription: string;
  nativeDescriptionPlatform: string;
  pricingTrustItems: string[];
  priceEyebrow: string;
  priceTitle: string;
  priceDescription: string;
  priceLabel: string;
  speedEyebrow: string;
  speedTitle: string;
  speedDescription: string;
  formatsEyebrow: string;
  formatsTitle: string;
  formatsDescription: string;
  controlEyebrow: string;
  controlTitle: string;
  controlDescription: string;
  workflowSteps: string[];
}

const defaultCopy: WhyZushCopy = {
  title: 'Why Zush Fits Real Desktop Work',
  titlePlatform: 'Why Zush Wins on {os}',
  description: 'One-time pricing, desktop-native feel, fast renaming, and fewer annoying decisions',
  descriptionPlatform: 'Native desktop feel, fast renaming, one-time pricing, and fewer annoying decisions on {os}',
  nativeEyebrow: 'Desktop-native feel',
  nativeEyebrowPlatform: '{os}-native feel',
  nativeTitle: 'Native, fast, and modern',
  nativeDescription: 'Zush feels like a real desktop app: quick to open, clean to use, and visually at home on your machine instead of feeling like a clunky utility panel.',
  nativeDescriptionPlatform: 'Zush feels like a real native {os} app: quick to open, clean to use, and visually at home on your machine instead of feeling like a clunky utility panel.',
  pricingTrustItems,
  priceEyebrow: 'One-time fair pricing',
  priceTitle: 'Pay once, keep the workflow',
  priceDescription: 'Most AI file renamers try to become another monthly bill. Zush stays simple: free to try, then one small one-time purchase when it proves useful.',
  priceLabel: 'one-time',
  speedEyebrow: 'Sssupafast!',
  speedTitle: 'Renames happen in seconds',
  speedDescription: 'Speed matters because cleanup only sticks if it does not interrupt the real work. Drop files in, review, apply, move on.',
  formatsEyebrow: 'Pro photo support',
  formatsTitle: 'Native RAW support for photographers',
  formatsDescription: 'Supports professional camera formats like CR2, NEF, ARW, DNG, RAF, and RW2, so photographers can rename imports by actual image content instead of living with `IMG_` chaos.',
  controlEyebrow: 'Low-risk automation',
  controlTitle: 'Batch, monitor, and undo',
  controlDescription: 'Clean up old piles in batch, keep new folders readable with monitoring, and revert from history if you want a different name.',
  workflowSteps,
};

interface WhyZushProps {
  forceOS?: DownloadOS;
  platformSpecificCopy?: boolean;
  copy?: WhyZushCopy;
}

const renderZushTitle = (value: string) => {
  const [before, ...after] = value.split('Zush');
  return (
    <>
      {before}
      <span className={styles.WhyZush__TitleAccent}>Zush</span>
      {after.join('Zush')}
    </>
  );
};

const withOS = (value: string, osLabel: string) => value.replace('{os}', osLabel);

const WhyZush = ({ forceOS, platformSpecificCopy = false, copy = defaultCopy }: WhyZushProps) => {
  const { downloadOS: detectedOS } = useOS();
  const downloadOS = forceOS ?? detectedOS;
  const isWindows = downloadOS === 'windows';
  const osLabel = isWindows ? 'Windows' : 'Mac';
  const sectionTitle = renderZushTitle(withOS(platformSpecificCopy ? copy.titlePlatform : copy.title, osLabel));
  const sectionDescription = platformSpecificCopy
    ? withOS(copy.descriptionPlatform, osLabel)
    : copy.description;
  const nativeEyebrow = platformSpecificCopy
    ? withOS(copy.nativeEyebrowPlatform, osLabel)
    : copy.nativeEyebrow;
  const nativeDescription = platformSpecificCopy
    ? withOS(copy.nativeDescriptionPlatform, osLabel)
    : copy.nativeDescription;

  return (
    <section className={styles.WhyZush}>
      <div className={styles.WhyZush__Container}>
        <SectionHeader
          title={sectionTitle}
          description={sectionDescription}
        />

        <div className={styles.Grid}>
          <article className={`${styles.Card} ${styles.Card_price}`}>
            <div className={styles.Card__Header}>
              <div className={styles.Card__Icon}>
                <DollarSign size={24} />
              </div>
              <span className={styles.Card__Eyebrow}>{copy.priceEyebrow}</span>
            </div>

            <div className={styles.PriceLayout}>
              <div className={styles.PriceCopy}>
                <Heading as='h3' className={styles.Card__Title}>
                  {copy.priceTitle}
                </Heading>
                <Text className={styles.Card__Description} color='subtle'>
                  {copy.priceDescription}
                </Text>

                <div className={styles.PricePanel}>
                  <div className={styles.PricePanel__Header}>
                    <span className={styles.PricePanel__Value}>$10</span>
                    <span className={styles.PricePanel__Label}>{copy.priceLabel}</span>
                  </div>
                  <ul className={styles.PricePanel__Trust} aria-label='Pricing trust signals'>
                    {copy.pricingTrustItems.map((item) => (
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
              <span className={styles.Card__Eyebrow}>{nativeEyebrow}</span>
            </div>

            <Heading as='h3' className={styles.Card__Title}>
              {withOS(copy.nativeTitle, osLabel)}
            </Heading>
            <Text className={styles.Card__Description} color='subtle'>
              {nativeDescription}
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
              <span className={styles.Card__Eyebrow}>{copy.speedEyebrow}</span>
            </div>

            <Heading as='h3' className={styles.Card__Title}>
              {copy.speedTitle}
            </Heading>
            <Text className={styles.Card__Description} color='subtle'>
              {copy.speedDescription}
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
              <span className={styles.Card__Eyebrow}>{copy.formatsEyebrow}</span>
            </div>

            <Heading as='h3' className={styles.Card__Title}>
              {copy.formatsTitle}
            </Heading>
            <Text className={styles.Card__Description} color='subtle'>
              {copy.formatsDescription}
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
              <span className={styles.Card__Eyebrow}>{copy.controlEyebrow}</span>
            </div>

            <Heading as='h3' className={styles.Card__Title}>
              {copy.controlTitle}
            </Heading>
            <Text className={styles.Card__Description} color='subtle'>
              {copy.controlDescription}
            </Text>

            <div className={styles.WorkflowSteps} aria-hidden='true'>
              {copy.workflowSteps.map((step, index) => (
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
