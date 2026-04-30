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
  | 'navbar'
  | 'download-cta'
  | 'blog-cta'
  | 'blog-cta-store'
  | 'footer'
  | 'footer-appstore'
  | 'footer-microsoft-store'
  | 'thank-you'
  | 'mobile-modal'
  | 'download-page-mac'
  | 'download-page-windows';

export type DownloadChannel = 'direct' | 'mac-app-store' | 'microsoft-store';

export interface TrackDownloadClickOptions {
  os: DownloadOS;
  source: DownloadSource;
  manual?: boolean;
  channel?: DownloadChannel;
}

export function trackDownloadClick({ os, source, manual, channel }: TrackDownloadClickOptions): void {
  try {
    track('download_click', {
      os,
      source,
      detection: manual ? 'manual' : 'auto',
      channel: channel ?? (os === 'windows' ? 'microsoft-store' : 'direct'),
    });
  } catch {
    // Analytics might not be initialized in dev / tests — never block the click.
  }
}
