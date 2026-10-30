type UETQueue = { push: (...args: unknown[]) => unknown };

declare global {
  interface Window {
    uetq?: UETQueue;
    UET?: new (options: { ti: string; q: UETQueue; enableAutoSpaTracking: boolean; ts: number }) => UETQueue;
  }
}

let initialization: Promise<boolean> | undefined;

function hasPrivacyOptOut(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
    || navigator.doNotTrack === '1';
}

export function initializeMicrosoftAds(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (initialization) return initialization;
  if (!['zushapp.com', 'www.zushapp.com'].includes(window.location.hostname) || hasPrivacyOptOut()) {
    return Promise.resolve(false);
  }

  initialization = (async () => {
    const response = await fetch('/api/microsoft-ads', { cache: 'no-store' });
    if (!response.ok) return false;
    const config = await response.json();
    if (config.enabled !== true || typeof config.tagId !== 'string' || hasPrivacyOptOut()) return false;

    window.uetq = window.uetq || ([] as unknown[]);
    const script = document.createElement('script');
    script.src = `https://bat.bing.net/bat.js?ti=${encodeURIComponent(config.tagId)}`;
    script.async = true;
    script.onload = () => {
      if (!window.UET || !window.uetq || hasPrivacyOptOut()) return;
      window.uetq = new window.UET({ ti: config.tagId, q: window.uetq, enableAutoSpaTracking: true, ts: Date.now() });
      window.uetq.push('pageLoad');
    };
    document.head.appendChild(script);
    return true;
  })().catch(() => false); // Blocked analytics must never interfere with the site.

  return initialization;
}

export function trackMicrosoftAdsDownload(os: string, channel: string, source: string): void {
  if (os !== 'windows' || channel !== 'microsoft-store') return;
  void initializeMicrosoftAds().then((enabled) => {
    if (!enabled || hasPrivacyOptOut()) return;
    window.uetq?.push('event', 'download_windows', {
      event_category: 'download',
      event_label: source,
    });
  });
}
