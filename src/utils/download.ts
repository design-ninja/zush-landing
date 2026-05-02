import { track } from '@vercel/analytics';
import {
  APP_STORE_PROTOCOL_URL,
  APP_STORE_URL,
  DOWNLOAD_URL,
  WINDOWS_STORE_PROTOCOL_URL,
  WINDOWS_STORE_URL,
} from '@/constants';
import { trackAdDownloadConversion } from '@/utils/adTracking';

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
  | 'download-page-windows'
  | 'download-link';

export type DownloadChannel = 'direct' | 'mac-app-store' | 'microsoft-store';

export interface TrackDownloadClickOptions {
  os: DownloadOS;
  source: DownloadSource;
  manual?: boolean;
  channel?: DownloadChannel;
}

export function trackDownloadClick({ os, source, manual, channel }: TrackDownloadClickOptions): void {
  const resolvedChannel = channel ?? (os === 'windows' ? 'microsoft-store' : 'direct');

  try {
    track('download_click', {
      os,
      source,
      detection: manual ? 'manual' : 'auto',
      channel: resolvedChannel,
    });
  } catch {
    // Analytics might not be initialized in dev / tests — never block the click.
  }

  trackAdDownloadConversion({
    os,
    source,
    channel: resolvedChannel,
  });
}

const isDownloadOS = (value: string | undefined): value is DownloadOS =>
  value === 'mac' || value === 'windows';

const isDownloadChannel = (value: string | undefined): value is DownloadChannel =>
  value === 'direct' || value === 'mac-app-store' || value === 'microsoft-store';

const trackedRoots = new WeakSet<EventTarget>();

const normalizeUrl = (value: string | undefined): string => {
  if (!value || typeof window === 'undefined') return '';

  try {
    return new URL(value, window.location.href).href;
  } catch {
    return value;
  }
};

const isMacDownloadUrl = (value: string): boolean => {
  if (value === DOWNLOAD_URL) return true;

  try {
    return new URL(value).pathname === '/releases/Zush.dmg';
  } catch {
    return value.endsWith('/releases/Zush.dmg');
  }
};

const getClickedLink = (target: EventTarget | null): HTMLAnchorElement | null => {
  if (!(target instanceof Element)) return null;
  return target.closest('a');
};

const getTrackedDownload = (link: HTMLAnchorElement): TrackDownloadClickOptions | null => {
  const {
    downloadChannel,
    downloadOs,
    downloadSource,
    storeOs,
    storeWebUrl,
  } = link.dataset;

  if (isDownloadOS(downloadOs) && downloadSource) {
    return {
      os: downloadOs,
      source: downloadSource as DownloadSource,
      manual: true,
      channel: isDownloadChannel(downloadChannel) ? downloadChannel : undefined,
    };
  }

  const href = normalizeUrl(link.href);
  const webHref = normalizeUrl(storeWebUrl);

  if (isMacDownloadUrl(href) || isMacDownloadUrl(webHref)) {
    return {
      os: 'mac',
      source: 'download-link',
      manual: true,
      channel: 'direct',
    };
  }

  if (
    storeOs === 'mac'
    || href === APP_STORE_URL
    || webHref === APP_STORE_URL
    || href === normalizeUrl(APP_STORE_PROTOCOL_URL)
  ) {
    return {
      os: 'mac',
      source: 'download-link',
      manual: true,
      channel: 'mac-app-store',
    };
  }

  if (
    storeOs === 'windows'
    || href === WINDOWS_STORE_URL
    || webHref === WINDOWS_STORE_URL
    || href === normalizeUrl(WINDOWS_STORE_PROTOCOL_URL)
  ) {
    return {
      os: 'windows',
      source: 'download-link',
      manual: true,
      channel: 'microsoft-store',
    };
  }

  return null;
};

export function bindDownloadTracking(root: ParentNode = document): void {
  const eventRoot = root as ParentNode & EventTarget;
  if (trackedRoots.has(eventRoot)) return;

  trackedRoots.add(eventRoot);
  const handleDownloadActivation = (event: Event) => {
    if (event instanceof MouseEvent && event.type === 'auxclick' && event.button !== 1) return;

    const link = getClickedLink(event.target);
    if (!link) return;

    const trackedDownload = getTrackedDownload(link);
    if (!trackedDownload) return;

    if (event.defaultPrevented && trackedDownload.channel === 'direct') return;

    trackDownloadClick(trackedDownload);
  };

  eventRoot.addEventListener('click', handleDownloadActivation);
  eventRoot.addEventListener('auxclick', handleDownloadActivation);
}
