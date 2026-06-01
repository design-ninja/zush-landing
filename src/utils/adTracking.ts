const GOOGLE_ADS_ID = import.meta.env.PUBLIC_GOOGLE_ADS_ID;
const GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL =
  import.meta.env.PUBLIC_GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL;

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'event' | 'config' | 'js', target: string | Date, params?: GtagParams) => void;
    __zushGoogleAdsLoading?: boolean;
  }
}

interface TrackAdDownloadConversionOptions {
  os: 'mac' | 'windows';
  source: string;
  channel: string;
}

function ensureGoogleAds(): boolean {
  if (!GOOGLE_ADS_ID || typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args) {
    window.dataLayer?.push(args);
  };

  if (!window.__zushGoogleAdsLoading) {
    window.__zushGoogleAdsLoading = true;
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID, { send_page_view: false });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ADS_ID)}`;
    document.head.append(script);
  }

  return true;
}

export function trackAdDownloadConversion({
  os,
  source,
  channel,
}: TrackAdDownloadConversionOptions): void {
  if (os !== 'mac') return;
  if (!GOOGLE_ADS_ID || !GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL) return;
  if (!ensureGoogleAds() || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL}`,
    transport_type: 'beacon',
    event_category: 'download',
    event_label: `${source}:${channel}`,
  });
}
