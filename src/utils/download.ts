import { track } from '@vercel/analytics';
import {
  DOWNLOAD_URL,
  WINDOWS_STORE_URL,
} from '@/constants';

export type DownloadOS = 'mac' | 'windows';

export function getDownloadUrl(os: DownloadOS): string {
  return os === 'windows' ? WINDOWS_STORE_URL : DOWNLOAD_URL;
}

export function getShortRequirements(os: DownloadOS): string {
  return os === 'windows' ? 'Windows 10+' : 'macOS Sonoma+';
}

export function getOSLabel(os: DownloadOS): string {
  return os === 'windows' ? 'Windows' : 'Mac';
}

export function getOtherOS(os: DownloadOS): DownloadOS {
  return os === 'windows' ? 'mac' : 'windows';
}

export type DownloadSource =
  | 'hero'
  | 'hero-demo'
  | 'navbar'
  | 'download-cta'
  | 'blog-cta'
  | 'blog-cta-store'
  | 'footer'
  | 'footer-appstore'
  | 'footer-microsoft-store'
  | 'platform-install'
  | 'thank-you'
  | 'mobile-modal'
  | 'activate'
  | 'download-page-mac'
  | 'download-page-windows';

export type DownloadChannel = 'direct' | 'mac-app-store' | 'microsoft-store';

export type ProClickSource = 'hero' | 'navbar' | 'pricing';

export interface TrackDownloadClickOptions {
  os: DownloadOS;
  source: DownloadSource;
  manual?: boolean;
  channel?: DownloadChannel;
}

export function trackDownloadClick({ os, source, manual, channel }: TrackDownloadClickOptions): void {
  try {
    const resolvedChannel = channel ?? (os === 'windows' ? 'microsoft-store' : 'direct');
    const sourceValue = [
      source,
      os,
      resolvedChannel,
      manual ? 'manual' : 'auto',
    ].join(':');

    track('download_click', { source: sourceValue });
  } catch {
    // Analytics might not be initialized in dev / tests — never block the click.
  }
}

export function trackProClick({ source }: { source: ProClickSource }): void {
  try {
    track('pro_click', { source });
  } catch {
    // Analytics might not be initialized in dev / tests — never block the click.
  }
}

const isDownloadOS = (value: string | undefined): value is DownloadOS =>
  value === 'mac' || value === 'windows';

const isDownloadChannel = (value: string | undefined): value is DownloadChannel =>
  value === 'direct' || value === 'mac-app-store' || value === 'microsoft-store';

const isProClickSource = (value: string | undefined): value is ProClickSource =>
  value === 'hero' || value === 'navbar' || value === 'pricing';

// fallow-ignore-next-line unused-export
export const bindDownloadTracking = (root: ParentNode = document) => {
  root.querySelectorAll<HTMLElement>('[data-download-source]').forEach((element) => {
    if (element.dataset.downloadTrackingBound === 'true') return;

    const source = element.dataset.downloadSource as DownloadSource | undefined;
    if (!source) return;

    element.dataset.downloadTrackingBound = 'true';
    element.addEventListener('click', () => {
      const os = element.dataset.downloadOs;
      if (!isDownloadOS(os)) return;

      const channel = element.dataset.downloadChannel;
      trackDownloadClick({
        os,
        source,
        manual: element.dataset.downloadManual === 'true',
        channel: isDownloadChannel(channel) ? channel : undefined,
      });
    });
  });
};

// fallow-ignore-next-line unused-export
export const bindProClickTracking = (root: ParentNode = document) => {
  root.querySelectorAll<HTMLElement>('[data-pro-click-source]').forEach((element) => {
    if (element.dataset.proClickTrackingBound === 'true') return;

    const source = element.dataset.proClickSource;
    if (!isProClickSource(source)) return;

    element.dataset.proClickTrackingBound = 'true';
    element.addEventListener('click', () => {
      trackProClick({ source });
    });
  });
};
