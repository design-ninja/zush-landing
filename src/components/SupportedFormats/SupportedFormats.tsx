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

const highlightMap: Record<FeatureCategory, { images: boolean; documents: boolean; highlight?: string[] }> = {
  general: { images: true, documents: true },
  image: { images: true, documents: false },
  photo: { images: true, documents: false, highlight: ['heic', 'cr2', 'nef', 'arw', 'dng', 'raf', 'rw2'] },
  screenshot: { images: true, documents: false, highlight: ['png', 'jpg', 'webp'] },
  document: { images: false, documents: true },
  pdf: { images: false, documents: true, highlight: ['pdf'] },
};

interface SupportedFormatsProps {
  category?: FeatureCategory;
}

const SupportedFormats = ({ category = 'general' }: SupportedFormatsProps) => {
  const config = highlightMap[category];

  return (
    <section className={styles.SupportedFormats}>
      <div className={styles.SupportedFormats__Container}>
        <SectionHeader title='Supported File Formats' />

        {config.images && (
          <div className={styles.SupportedFormats__Group}>
            <Heading as='h4' align='center' className={styles.SupportedFormats__GroupTitle}>Images</Heading>
            <div className={styles.SupportedFormats__Tags}>
              {imageFormats.map((format) => (
                <span
                  key={format}
                  className={`${styles.SupportedFormats__Tag} ${
                    config.highlight?.includes(format) ? styles.SupportedFormats__Tag_highlight : ''
                  }`}
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        )}

        {config.documents && (
          <div className={styles.SupportedFormats__Group}>
            <Heading as='h4' align='center' className={styles.SupportedFormats__GroupTitle}>Documents</Heading>
            <div className={styles.SupportedFormats__Tags}>
              {documentFormats.map((format) => (
                <span
                  key={format}
                  className={`${styles.SupportedFormats__Tag} ${
                    config.highlight?.includes(format) ? styles.SupportedFormats__Tag_highlight : ''
                  }`}
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SupportedFormats;
