import { APP_CONFIG } from '@/constants';
import type { FeatureCategory } from '@/data/featureContent';
import Heading from '../Heading';
import SectionHeader from '../SectionHeader';
import styles from './SupportedFormats.module.scss';

const imageFormats = [...new Set(APP_CONFIG.image_extensions)].map((f) =>
  f.toLowerCase(),
);
const designFormats = [...new Set(APP_CONFIG.design_extensions)].map((f) =>
  f.toLowerCase(),
);
const documentFormats = [...new Set(APP_CONFIG.document_extensions)].map((f) =>
  f.toLowerCase(),
);
const videoFormats = [...new Set(APP_CONFIG.video_extensions)].map((f) =>
  f.toLowerCase(),
);
const audioFormats = [...new Set(APP_CONFIG.audio_extensions)].map((f) =>
  f.toLowerCase(),
);

const highlightMap: Record<FeatureCategory, string[]> = {
  general: [],
  image: imageFormats,
  photo: ['heic', 'heif', 'avif', 'cr2', 'cr3', 'nef', 'arw', 'dng', 'raf', 'rw2', 'orf', 'pef', 'srw', 'sr2', 'raw'],
  screenshot: ['png', 'jpg', 'jpeg', 'webp'],
  design: designFormats,
  document: documentFormats,
  pdf: ['pdf'],
  video: videoFormats,
  audio: audioFormats,
};

interface SupportedFormatsProps {
  category?: FeatureCategory;
  title?: string;
  imagesLabel?: string;
  designLabel?: string;
  documentsLabel?: string;
  videosLabel?: string;
  audioLabel?: string;
}

const SupportedFormats = ({
  category = 'general',
  title = 'Supported File Formats',
  imagesLabel = 'Images',
  designLabel = 'Design',
  documentsLabel = 'Documents',
  videosLabel = 'Videos',
  audioLabel = 'Audio',
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

        <div className={styles.SupportedFormats__Group}>
          <Heading as='h3' size='h4' align='center' className={styles.SupportedFormats__GroupTitle}>{videosLabel}</Heading>
          <div className={styles.SupportedFormats__Tags}>
            {videoFormats.map((format) => (
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
          <Heading as='h3' size='h4' align='center' className={styles.SupportedFormats__GroupTitle}>{audioLabel}</Heading>
          <div className={styles.SupportedFormats__Tags}>
            {audioFormats.map((format) => (
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
          <Heading as='h3' size='h4' align='center' className={styles.SupportedFormats__GroupTitle}>{designLabel}</Heading>
          <div className={styles.SupportedFormats__Tags}>
            {designFormats.map((format) => (
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
