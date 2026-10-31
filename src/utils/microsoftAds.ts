type UETQueue = { push: (...args: unknown[]) => unknown };

declare global {
  interface Window {
    uetq?: UETQueue;
    UET?: new (options: { ti: string; q: UETQueue; enableAutoSpaTracking: boolean; ts: number }) => UETQueue;
  }
}

let initialization: Promise<boolean> | undefined;
let tagIdRequest: Promise<string | null> | undefined;

function hasPrivacyOptOut(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
    || navigator.doNotTrack === '1';
}

// One cached server decision gates every Microsoft Ads feature: the public tag
// is returned only for US visitors on the production host without GPC or DNT.
export function getMicrosoftAdsTagId(): Promise<string | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (!['zushapp.com', 'www.zushapp.com'].includes(window.location.hostname) || hasPrivacyOptOut()) {
    return Promise.resolve(null);
  }

  tagIdRequest ??= (async () => {
    const response = await fetch('/api/microsoft-ads', { cache: 'no-store' });
    if (!response.ok) return null;
    const config = await response.json();
    return config.enabled === true && typeof config.tagId === 'string' ? config.tagId : null;
  })().catch(() => null); // Blocked analytics must never interfere with the site.

  return tagIdRequest;
}

export function initializeMicrosoftAds(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (initialization) return initialization;

  initialization = getMicrosoftAdsTagId().then((tagId) => {
    if (!tagId || hasPrivacyOptOut()) return false;

    window.uetq = window.uetq || ([] as unknown[]);
    const script = document.createElement('script');
    script.src = `https://bat.bing.net/bat.js?ti=${encodeURIComponent(tagId)}`;
    script.async = true;
    script.onload = () => {
      if (!window.UET || !window.uetq || hasPrivacyOptOut()) return;
      window.uetq = new window.UET({ ti: tagId, q: window.uetq, enableAutoSpaTracking: true, ts: Date.now() });
      window.uetq.push('pageLoad');
    };
    document.head.appendChild(script);
    return true;
  }).catch(() => false);

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
