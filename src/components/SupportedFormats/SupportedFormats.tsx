import { APP_CONFIG } from '@/constants';
import Heading from '../Heading';
import SectionHeader from '../SectionHeader';
import styles from './SupportedFormats.module.scss';

const imageFormats = [...new Set(APP_CONFIG.image_extensions)].map((f) =>
  f.toLowerCase(),
);
const documentFormats = [...new Set(APP_CONFIG.document_extensions)].map((f) =>
  f.toLowerCase(),
);

const SupportedFormats = () => (
  <section className={styles.SupportedFormats}>
    <div className={styles.SupportedFormats__Container}>
      <SectionHeader title='Supported File Formats' />

      <div className={styles.SupportedFormats__Group}>
        <Heading as='h4' align='center' className={styles.SupportedFormats__GroupTitle}>Images</Heading>
        <div className={styles.SupportedFormats__Tags}>
          {imageFormats.map((format) => (
            <span key={format} className={styles.SupportedFormats__Tag}>
              {format}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.SupportedFormats__Group}>
        <Heading as='h4' align='center' className={styles.SupportedFormats__GroupTitle}>Documents</Heading>
        <div className={styles.SupportedFormats__Tags}>
          {documentFormats.map((format) => (
            <span key={format} className={styles.SupportedFormats__Tag}>
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SupportedFormats;
