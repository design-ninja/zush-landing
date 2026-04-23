import { track } from '@vercel/analytics';
import {
  DOWNLOAD_URL,
  WINDOWS_STORE_URL,
  MIN_MACOS_VERSION,
  MIN_WINDOWS_VERSION,
} from '@/constants';

export type DownloadOS = 'mac' | 'windows';

export function getDownloadUrl(os: DownloadOS): string {
  return os === 'windows' ? WINDOWS_STORE_URL : DOWNLOAD_URL;
}

export function getDownloadLabel(os: DownloadOS): string {
  return os === 'windows' ? 'Get from Microsoft Store' : 'Download for Mac';
}

export function getShortDownloadLabel(os: DownloadOS): string {
  return os === 'windows' ? 'Microsoft Store' : 'Download';
}

export function getSystemRequirements(os: DownloadOS): string {
  return os === 'windows'
    ? `Windows · ${MIN_WINDOWS_VERSION}`
    : `macOS ${MIN_MACOS_VERSION}`;
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

export function getDownloadPagePath(os: DownloadOS): string {
  return os === 'windows' ? '/windows' : '/mac';
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
