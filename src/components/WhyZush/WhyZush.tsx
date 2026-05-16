import {
  Check,
  DollarSign,
  Files,
  History,
  Monitor,
  Zap,
} from 'lucide-react';
import Heading from '@/components/Heading';
import SectionHeader from '@/components/SectionHeader';
import Text from '@/components/Text';
import { APP_CONFIG } from '@/constants';
import { useOS } from '@/hooks/useOS';
import type { WhyZushCopy } from '@/i18n/copy';
import type { DownloadOS } from '@/utils/download';
import styles from './WhyZush.module.scss';

const pricingTrustItems = [
  '✨ Free to try',
  '∞ Unlimited PRO',
  '↩️ 14-day refund',
];
const formatPills = [
  'avif',
  'raw',
  'heic',
  'psd',
  'pdf',
  'docx',
  'xlsx',
  'pptx',
  'srt',
  'vtt',
  'mp4',
  'mov',
  'm2ts',
];
const supportedFormatCount = new Set([
  ...APP_CONFIG.image_extensions,
  ...APP_CONFIG.document_extensions,
  ...APP_CONFIG.video_extensions,
]).size;
const hiddenFormatCount = supportedFormatCount - formatPills.length;

const renameExamples = [
  {
    oldName: 'Screenshot 2026-04-10 at 14.32.png',
    newName: 'stripe-revenue-dashboard.png',
  },
  {
    oldName: 'scan_0034.pdf',
    newName: 'acme-invoice-april-2026.pdf',
  },
  {
    oldName: 'Screen Recording 2026-05-08.mov',
    newName: 'checkout-flow-bug-recording.mov',
  },
];

const workflowSteps = [
  'Batch rename old piles',
  'Watch new folders',
  'Revert from history',
];

const defaultCopy: WhyZushCopy = {
  title: 'Why Zush Wins Against Generic File Renamers',
  titlePlatform: 'Why Zush Wins on {os}',
  description: 'AI batch renaming, automatic folder monitoring, rollback, BYOK, Offline AI, and mixed-format support in one desktop app',
  descriptionPlatform: 'Native desktop feel, fast renaming, flexible PRO pricing, and fewer annoying decisions on {os}',
  nativeEyebrow: 'Desktop-native feel',
  nativeEyebrowPlatform: '{os}-native feel',
  nativeTitle: 'Native, fast, and modern',
  nativeDescription: 'Zush feels like a real desktop app: quick to open, clean to use, and visually at home on your machine instead of feeling like a clunky utility panel.',
  nativeDescriptionPlatform: 'Zush feels like a real native {os} app: quick to open, clean to use, and visually at home on your machine instead of feeling like a clunky utility panel.',
  pricingTrustItems,
  priceEyebrow: 'Fair PRO pricing',
  priceTitle: 'Monthly or one-time',
  priceDescription: 'Start with 50 free renames, then choose $8/month or a $38 one-time plan when Zush becomes part of your workflow.',
  priceLabel: 'from $8/mo',
  speedEyebrow: 'Sssupafast!',
  speedTitle: 'Renames happen in seconds',
  speedDescription: 'Speed matters because cleanup only sticks if it does not interrupt the real work. Drop files in, review, apply, move on.',
  formatsEyebrow: '91 supported formats',
  formatsTitle: 'Screenshots, PDFs, photos, documents, and videos',
  formatsDescription: 'Supports AVIF, RAW, Office files, PDFs, subtitles, and common video formats, so mixed folders can be renamed by actual content instead of file-type silos.',
  controlEyebrow: 'Low-risk automation',
  controlTitle: 'Batch rename, watch folders, undo safely',
  controlDescription: 'Use Zush as a batch file renamer for old piles, an automatic file renamer for new folders, and a low-risk workflow with full rename history.',
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
              <div className={styles.RenameExamples__Summary}>
                <span className={styles.RenameExamples__SummaryIcon}>
                  <Check size={14} />
                </span>
                <span>3 files renamed in 3 seconds</span>
              </div>
            </div>
          </article>

          <article className={`${styles.Card} ${styles.Card_formats}`}>
            <div className={styles.Card__Header}>
              <div className={styles.Card__Icon}>
                <Files size={24} />
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
              <span className={styles.FormatPills__Item}>
                +{hiddenFormatCount} more
              </span>
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
