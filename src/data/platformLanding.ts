import { DOWNLOAD_URL, WINDOWS_STORE_URL } from '@/constants';
import type { DownloadOS } from '@/utils/download';

// Rendered platform copy (hero, features, FAQ, CTA) lives in `src/i18n/copy.ts`
// (`platforms` block) and `src/data/platformLandingSections.ts`. This file only
// carries the per-platform install metadata the component actually reads:
// path, operating system, and download/install URLs.
export interface PlatformLandingContent {
  os: DownloadOS;
  path: '/mac' | '/windows';
  operatingSystem: string | string[];
  downloadUrl: string;
  installUrl?: string;
}

export const PLATFORM_LANDING_CONTENT: Record<DownloadOS, PlatformLandingContent> = {
  mac: {
    os: 'mac',
    path: '/mac',
    operatingSystem: 'macOS 15.0+',
    downloadUrl: DOWNLOAD_URL,
  },
  windows: {
    os: 'windows',
    path: '/windows',
    operatingSystem: ['Windows 10', 'Windows 11'],
    downloadUrl: WINDOWS_STORE_URL,
    installUrl: WINDOWS_STORE_URL,
  },
};
