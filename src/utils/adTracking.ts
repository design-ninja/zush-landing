const GOOGLE_ADS_ID = import.meta.env.PUBLIC_GOOGLE_ADS_ID;
const GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL =
  import.meta.env.PUBLIC_GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL;

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event' | 'config', target: string, params?: GtagParams) => void;
  }
}

interface TrackAdDownloadConversionOptions {
  os: 'mac' | 'windows';
  source: string;
  channel: string;
}

export function trackAdDownloadConversion({
  os,
  source,
  channel,
}: TrackAdDownloadConversionOptions): void {
  if (os !== 'mac') return;
  if (!GOOGLE_ADS_ID || !GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_DOWNLOAD_CONVERSION_LABEL}`,
    transport_type: 'beacon',
    event_category: 'download',
    event_label: `${source}:${channel}`,
  });
}
