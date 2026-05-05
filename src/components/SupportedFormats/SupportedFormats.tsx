import { APP_CONFIG } from '@/constants';
import type { FeatureCategory } from '@/data/featureContent';
import Heading from '../Heading';
import SectionHeader from '../SectionHeader';
import styles from './SupportedFormats.module.scss';

const imageFormats = [...new Set(APP_CONFIG.image_extensions)].map((f) =>
  f.toLowerCase(),
);
const documentFormats = [...new Set(APP_CONFIG.document_extensions)].map((f) =>
  f.toLowerCase(),
);

const highlightMap: Record<FeatureCategory, string[]> = {
  general: [],
  image: imageFormats,
  photo: ['heic', 'cr2', 'cr3', 'nef', 'arw', 'dng', 'raf', 'rw2', 'orf', 'pef', 'srw', 'sr2', 'raw'],
  screenshot: ['png', 'jpg', 'jpeg', 'webp'],
  document: ['pdf', 'txt', 'md', 'json', 'eml', 'csv', 'doc', 'docx', 'ppt', 'pptx', 'xlsx'],
  pdf: ['pdf'],
};

interface SupportedFormatsProps {
  category?: FeatureCategory;
  title?: string;
  imagesLabel?: string;
  documentsLabel?: string;
}

const SupportedFormats = ({
  category = 'general',
  title = 'Supported File Formats',
  imagesLabel = 'Images',
  documentsLabel = 'Documents',
}: SupportedFormatsProps) => {
  const highlightedFormats = new Set(highlightMap[category] ?? []);

  return (
    <section className={styles.SupportedFormats}>
      <div className={styles.SupportedFormats__Container}>
        <SectionHeader title={title} />

        <div className={styles.SupportedFormats__Group}>
          <Heading as='h3' size='h4' align='center' className={styles.SupportedFormats__GroupTitle}>{imagesLabel}</Heading>
          <div className={styles.SupportedFormats__Tags}>
            {imageFormats.map((format) => (
              <span
                key={format}
                className={`${styles.SupportedFormats__Tag} ${
                  highlightedFormats.has(format) ? styles.SupportedFormats__Tag_highlight : ''
                }`}
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.SupportedFormats__Group}>
          <Heading as='h3' size='h4' align='center' className={styles.SupportedFormats__GroupTitle}>{documentsLabel}</Heading>
          <div className={styles.SupportedFormats__Tags}>
            {documentFormats.map((format) => (
              <span
                key={format}
                className={`${styles.SupportedFormats__Tag} ${
                  highlightedFormats.has(format) ? styles.SupportedFormats__Tag_highlight : ''
                }`}
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedFormats;
