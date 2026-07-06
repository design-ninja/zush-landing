import {
  APP_STORE_PROTOCOL_URL,
  APP_STORE_URL,
  DOWNLOAD_URL,
  MAC_DOWNLOAD_TRACKING_URL,
  MAC_INSTALLER_URL,
  WINDOWS_STORE_PROTOCOL_URL,
  WINDOWS_STORE_URL,
} from '@/constants';
import { trackAdDownloadConversion } from '@/utils/adTracking';
import { trackAnalyticsEvent } from '@/utils/analytics';

export type DownloadOS = 'mac' | 'windows';

export function getDownloadUrl(os: DownloadOS): string {
  return os === 'windows' ? WINDOWS_STORE_URL : DOWNLOAD_URL;
}

export function getShortRequirements(os: DownloadOS): string {
  return os === 'windows' ? 'Windows 10+' : 'macOS Sequoia+';
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
  | 'floating-cta'
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
  | 'download-page-windows'
  | 'download-link';

export type DownloadChannel = 'direct' | 'mac-app-store' | 'microsoft-store' | 'homebrew';

export type ProClickSource = 'hero' | 'navbar';
export type ProPlanId = 'monthly' | 'one-time';

export interface TrackDownloadClickOptions {
  os: DownloadOS;
  source: DownloadSource;
  manual?: boolean;
  channel?: DownloadChannel;
}

const downloadAttributionStorageKey = 'zush_download_attribution';
const downloadAttributionParams = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_device',
  'utm_matchtype',
  'utm_id',
] as const;

type DownloadAttributionParam = typeof downloadAttributionParams[number];
type DownloadAttributionProperties = Partial<Record<DownloadAttributionParam, string>> & {
  attribution_landing_path?: string;
  attribution_landing_url?: string;
  attribution_referrer?: string;
};

const hasDownloadAttribution = (properties: DownloadAttributionProperties): boolean =>
  downloadAttributionParams.some((param) => Boolean(properties[param]));

const getCurrentDownloadAttribution = (): DownloadAttributionProperties => {
  if (typeof window === 'undefined') return {};

  const url = new URL(window.location.href);
  const properties: DownloadAttributionProperties = {};

  downloadAttributionParams.forEach((param) => {
    const value = url.searchParams.get(param);
    if (value) properties[param] = value;
  });

  if (!hasDownloadAttribution(properties)) return {};

  properties.attribution_landing_path = `${url.pathname}${url.search}`;
  properties.attribution_landing_url = url.href;
  properties.attribution_referrer = document.referrer || undefined;

  return properties;
};

const getStoredDownloadAttribution = (): DownloadAttributionProperties => {
  if (typeof window === 'undefined') return {};

  try {
    const stored = window.sessionStorage.getItem(downloadAttributionStorageKey);
    if (!stored) return {};

    const properties = JSON.parse(stored) as DownloadAttributionProperties;
    return hasDownloadAttribution(properties) ? properties : {};
  } catch {
    return {};
  }
};

const persistCurrentDownloadAttribution = (): DownloadAttributionProperties => {
  const current = getCurrentDownloadAttribution();

  if (hasDownloadAttribution(current) && typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(downloadAttributionStorageKey, JSON.stringify(current));
    } catch {
      // Storage access can fail in private browsing modes.
    }

    return current;
  }

  return getStoredDownloadAttribution();
};

const getDownloadClickPageProperties = (): Record<string, string | undefined> => {
  if (typeof window === 'undefined') return {};

  return {
    page_path: `${window.location.pathname}${window.location.search}`,
    page_url: window.location.href,
    referrer: document.referrer || undefined,
  };
};

export function trackDownloadClick(
  { os, source, manual, channel }: TrackDownloadClickOptions,
  attributionOverride?: DownloadAttributionProperties,
): void {
  const resolvedChannel = channel ?? (os === 'windows' ? 'microsoft-store' : 'direct');

  try {
    const attribution = attributionOverride ?? persistCurrentDownloadAttribution();
    const sourceValue = [
      source,
      os,
      resolvedChannel,
      manual ? 'manual' : 'auto',
    ].join(':');

    trackAnalyticsEvent('download_click', {
      source: sourceValue,
      os,
      download_source: source,
      detection: manual ? 'manual' : 'auto',
      channel: resolvedChannel,
      ...getDownloadClickPageProperties(),
      ...attribution,
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
  value === 'direct' || value === 'mac-app-store' || value === 'microsoft-store' || value === 'homebrew';

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
  if (value === MAC_DOWNLOAD_TRACKING_URL) return true;
  if (value === MAC_INSTALLER_URL) return true;

  try {
    const url = new URL(value);
    return url.pathname === '/download/mac' || url.pathname === '/releases/Zush.dmg';
  } catch {
    return value.endsWith('/download/mac') || value.endsWith('/releases/Zush.dmg');
  }
};

const appendAttributionToDownloadLink = (
  link: HTMLAnchorElement,
  attribution: DownloadAttributionProperties,
): void => {
  if (typeof window === 'undefined' || !hasDownloadAttribution(attribution)) return;

  const href = normalizeUrl(link.href);
  if (!isMacDownloadUrl(href)) return;

  try {
    const url = new URL(href);
    if (url.pathname !== '/download/mac') return;

    downloadAttributionParams.forEach((param) => {
      const value = attribution[param];
      if (value && !url.searchParams.has(param)) {
        url.searchParams.set(param, value);
      }
    });

    link.href = url.href;
  } catch {
    // Leave the original download URL untouched if URL parsing fails.
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

// Imported from BaseLayout.astro inline script; static import graph tools can miss it.
// fallow-ignore-next-line unused-export
export function bindDownloadTracking(root: ParentNode = document): void {
  persistCurrentDownloadAttribution();

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

    const attribution = persistCurrentDownloadAttribution();
    if (trackedDownload.os === 'mac' && trackedDownload.channel === 'direct') {
      appendAttributionToDownloadLink(link, attribution);
    }

    trackDownloadClick(trackedDownload, attribution);
  };

  eventRoot.addEventListener('click', handleDownloadActivation);
  eventRoot.addEventListener('auxclick', handleDownloadActivation);
}

export function trackProClick({ source }: { source: ProClickSource }): void {
  trackAnalyticsEvent('pro_click', { source });
}

const isProClickSource = (value: string | undefined): value is ProClickSource =>
  value === 'hero' || value === 'navbar';

const isProPlanId = (value: string | undefined): value is ProPlanId =>
  value === 'monthly' || value === 'one-time';

const getPriceUsd = (priceLabel: string | undefined): number | undefined => {
  if (!priceLabel) return undefined;

  const price = Number(priceLabel.replace(/[^\d.]/g, ''));
  return Number.isFinite(price) ? price : undefined;
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

export const bindProPlanClickTracking = (root: ParentNode = document) => {
  root.querySelectorAll<HTMLElement>('[data-pro-plan-id]').forEach((element) => {
    if (element.dataset.proPlanClickTrackingBound === 'true') return;

    const plan = element.dataset.proPlanId;
    if (!isProPlanId(plan)) return;

    element.dataset.proPlanClickTrackingBound = 'true';
    element.addEventListener('click', () => {
      const priceLabel = element.dataset.proPlanPrice;

      trackAnalyticsEvent('pro_plan_click', {
        source: 'pricing',
        plan,
        price_label: priceLabel,
        price_usd: getPriceUsd(priceLabel),
        billing: plan === 'monthly' ? 'monthly' : 'one-time',
        billing_label: element.dataset.proPlanBilling,
        paddle_price_id: element.dataset.paddlePriceId,
        button_text: element.textContent?.trim().replace(/\s+/g, ' '),
      });
    });
  });
};
