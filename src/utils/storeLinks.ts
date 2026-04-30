export type StoreOS = 'mac' | 'windows';

interface StoreLinkTarget {
  os: StoreOS;
  webUrl: string;
  appUrl?: string;
}

interface StoreLinkClickEvent {
  altKey: boolean;
  button: number;
  ctrlKey: boolean;
  currentTarget: HTMLAnchorElement;
  metaKey: boolean;
  preventDefault: () => void;
  shiftKey: boolean;
}

const STORE_FALLBACK_DELAY_MS = 1500;

const detectRuntimeStoreOS = (): StoreOS | null => {
  if (typeof navigator === 'undefined') return null;

  const nav = navigator as Navigator & {
    userAgentData?: {
      platform?: string;
    };
  };

  const platform = nav.userAgentData?.platform ?? navigator.platform ?? navigator.userAgent;
  const value = platform.toLowerCase();

  if (value.includes('win')) return 'windows';
  if (value.includes('mac')) return 'mac';
  return null;
};

const isModifiedClick = (event: StoreLinkClickEvent): boolean =>
  event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

const attemptNativeStoreOpen = ({ appUrl, webUrl }: Required<Pick<StoreLinkTarget, 'appUrl' | 'webUrl'>>) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  let fallbackTimer: number | null = null;

  const cleanup = () => {
    if (fallbackTimer !== null) {
      window.clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }

    window.removeEventListener('blur', cancelFallback);
    window.removeEventListener('pagehide', cancelFallback);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };

  const cancelFallback = () => {
    cleanup();
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      cancelFallback();
    }
  };

  window.addEventListener('blur', cancelFallback);
  window.addEventListener('pagehide', cancelFallback);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  fallbackTimer = window.setTimeout(() => {
    cleanup();

    // The fallback stays in the current tab to avoid popup blockers after the delay.
    window.location.assign(webUrl);
  }, STORE_FALLBACK_DELAY_MS);

  window.location.assign(appUrl);
};

const shouldAttemptNativeStoreOpen = (os: StoreOS): boolean => detectRuntimeStoreOS() === os;

export const getPreferredStoreHref = ({
  appUrl,
  os,
  runtimeOS,
  webUrl,
}: {
  appUrl?: string;
  os: StoreOS;
  runtimeOS?: string | null;
  webUrl: string;
}) => (appUrl && runtimeOS === os ? appUrl : webUrl);

export const handleStoreLinkClick = (
  event: StoreLinkClickEvent,
  { os, webUrl, appUrl }: StoreLinkTarget,
) => {
  if (!appUrl || !shouldAttemptNativeStoreOpen(os) || isModifiedClick(event)) {
    return;
  }

  event.preventDefault();
  attemptNativeStoreOpen({ appUrl, webUrl });
};

// fallow-ignore-next-line unused-export
export const bindStoreLink = (link: HTMLAnchorElement) => {
  const os = link.dataset.storeOs;
  const appUrl = link.dataset.storeAppUrl;
  const webUrl = link.dataset.storeWebUrl || link.href;

  if ((os !== 'mac' && os !== 'windows') || !appUrl || link.dataset.storeLinkBound === 'true') {
    return;
  }

  link.dataset.storeWebUrl = webUrl;
  link.href = getPreferredStoreHref({
    os,
    appUrl,
    runtimeOS: detectRuntimeStoreOS(),
    webUrl,
  });

  link.dataset.storeLinkBound = 'true';
  link.addEventListener('click', (event) => {
    handleStoreLinkClick(event as unknown as StoreLinkClickEvent, {
      os,
      appUrl,
      webUrl,
    });
  });
};

// fallow-ignore-next-line unused-export
export const bindStoreLinks = (root: ParentNode = document) => {
  root.querySelectorAll<HTMLAnchorElement>('a[data-store-os][data-store-app-url]').forEach(bindStoreLink);
};
