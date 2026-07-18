import SectionHeader from '../SectionHeader';
import styles from './CloudFolders.module.scss';

interface CloudFoldersProps {
  title: string;
  description: string;
}

interface CloudServiceItem {
  id: string;
  label: string;
}

const CLOUD_SERVICES: CloudServiceItem[] = [
  { id: 'icloud', label: 'iCloud Drive' },
  { id: 'google-drive', label: 'Google Drive' },
  { id: 'dropbox', label: 'Dropbox' },
  { id: 'onedrive', label: 'OneDrive' },
  { id: 'box', label: 'Box' },
];

// Official brand marks in full color, inlined. Shown nominatively to indicate that
// Zush renames files in each provider's already-synced local folder (no account is
// connected). Logos are trademarks of their respective owners.
const CloudServiceIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'icloud':
      return (
        <svg viewBox='0 0 24 24' aria-hidden='true'>
          <defs>
            <linearGradient id='cf-icloud' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0' stopColor='#3FC8F5' />
              <stop offset='1' stopColor='#1E7FE5' />
            </linearGradient>
          </defs>
          <path
            fill='url(#cf-icloud)'
            d='M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z'
          />
        </svg>
      );
    case 'google-drive':
      return (
        <svg viewBox='0 0 256 229' aria-hidden='true'>
          <path fill='#0066da' d='m19.354 196.034l11.29 19.5c2.346 4.106 5.718 7.332 9.677 9.678q17.009-21.591 23.68-33.137q6.77-11.717 16.641-36.655q-26.604-3.502-40.32-3.502q-13.165 0-40.322 3.502c0 4.545 1.173 9.09 3.519 13.196z' />
          <path fill='#ea4335' d='M215.681 225.212c3.96-2.346 7.332-5.572 9.677-9.677l4.692-8.064l22.434-38.855a26.57 26.57 0 0 0 3.518-13.196q-27.315-3.502-40.247-3.502q-13.899 0-40.248 3.502q9.754 25.075 16.422 36.655q6.724 11.683 23.752 33.137' />
          <path fill='#00832d' d='M128.001 73.311q19.68-23.768 27.125-36.655q5.996-10.377 13.196-33.137C164.363 1.173 159.818 0 155.126 0h-54.25C96.184 0 91.64 1.32 87.68 3.519q9.16 26.103 15.544 37.154q7.056 12.213 24.777 32.638' />
          <path fill='#2684fc' d='M175.36 155.42H80.642l-40.32 69.792c3.958 2.346 8.503 3.519 13.195 3.519h148.968c4.692 0 9.238-1.32 13.196-3.52z' />
          <path fill='#00ac47' d='M128.001 73.311L87.681 3.52c-3.96 2.346-7.332 5.571-9.678 9.677L3.519 142.224A26.57 26.57 0 0 0 0 155.42h80.642z' />
          <path fill='#ffba00' d='m215.242 77.71l-37.243-64.514c-2.345-4.106-5.718-7.331-9.677-9.677l-40.32 69.792l47.358 82.109h80.496c0-4.546-1.173-9.09-3.519-13.196z' />
        </svg>
      );
    case 'dropbox':
      return (
        <svg viewBox='0 0 256 218' aria-hidden='true'>
          <path fill='#0061ff' d='M63.995 0L0 40.771l63.995 40.772L128 40.771zM192 0l-64 40.775l64 40.775l64.001-40.775zM0 122.321l63.995 40.772L128 122.321L63.995 81.55zM192 81.55l-64 40.775l64 40.774l64-40.774zM64 176.771l64.005 40.772L192 176.771L128.005 136z' />
        </svg>
      );
    case 'onedrive':
      return (
        <svg viewBox='0 0 256 165' aria-hidden='true'>
          <path fill='#0364b8' d='m154.66 110.682l52.842-50.534c-10.976-42.8-54.57-68.597-97.37-57.62a80 80 0 0 0-46.952 33.51c.817-.02 91.48 74.644 91.48 74.644' />
          <path fill='#0078d4' d='m97.618 45.552l-.002.009a63.7 63.7 0 0 0-33.619-9.543c-.274 0-.544.017-.818.02C27.852 36.476-.432 65.47.005 100.798a63.97 63.97 0 0 0 11.493 35.798l79.165-9.915l60.694-48.94z' />
          <path fill='#1490df' d='M207.502 60.148a53 53 0 0 0-3.51-.131a51.8 51.8 0 0 0-20.61 4.254l-.002-.005l-32.022 13.475l35.302 43.607l63.11 15.341c13.62-25.283 4.164-56.82-21.12-70.44a52 52 0 0 0-21.148-6.1' />
          <path fill='#28a8ea' d='M11.498 136.596a63.91 63.91 0 0 0 52.5 27.417h139.994a51.99 51.99 0 0 0 45.778-27.323l-98.413-58.95z' />
        </svg>
      );
    case 'box':
      return (
        <svg viewBox='0 0 512 277' aria-hidden='true'>
          <path fill='#0061d5' d='M507.486 245.434c6.391 8.948 5.113 20.453-2.557 26.844c-8.948 6.392-21.73 5.113-28.122-2.556l-44.741-57.524l-43.462 56.245c-6.392 8.948-19.175 8.948-28.123 2.557c-8.948-6.392-10.226-17.896-3.835-26.844l51.132-66.472l-51.132-66.472c-6.391-8.948-3.835-21.73 3.835-28.122c8.948-6.392 21.731-3.835 28.123 3.835l43.462 57.523l44.74-54.967c6.392-8.948 17.897-10.226 28.123-3.835c8.948 6.392 8.948 19.175 2.557 28.123l-49.854 65.193zm-232.651-7.67c-33.236 0-60.08-25.566-60.08-58.802c0-31.957 26.844-58.802 60.08-58.802s60.08 26.845 60.08 58.802c-1.278 33.236-28.123 58.802-60.08 58.802m-176.406 0c-33.236 0-60.08-25.566-60.08-58.802c0-31.957 26.844-58.802 60.08-58.802s60.08 26.845 60.08 58.802c0 33.236-26.844 58.802-60.08 58.802M274.835 81.811c-37.07 0-70.307 20.453-86.925 51.132c-16.618-30.679-49.853-51.132-88.202-51.132c-23.01 0-43.463 7.67-60.08 19.175V19.175C39.627 8.948 30.678 0 20.452 0C8.948 0 0 8.948 0 19.175V180.24c1.278 53.688 44.74 95.872 98.43 95.872c38.348 0 71.584-21.73 88.202-52.41c16.618 30.68 49.854 52.41 86.925 52.41c54.967 0 99.707-43.462 99.707-98.43c1.278-52.41-43.462-95.872-98.43-95.872' />
        </svg>
      );
    default:
      return null;
  }
};

const CloudFolders = ({ title, description }: CloudFoldersProps) => {
  return (
    <section className={styles.CloudFolders}>
      <div className={styles.CloudFolders__Container}>
        <SectionHeader title={title} description={description} />

        <ul className={styles.CloudFolders__List}>
          {CLOUD_SERVICES.map((service) => (
            <li key={service.id} className={styles.CloudFolders__Item}>
              <span className={styles.CloudFolders__Icon} data-service={service.id}>
                <CloudServiceIcon id={service.id} />
              </span>
              <span className={styles.CloudFolders__Label}>{service.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CloudFolders;
