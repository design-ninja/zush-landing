import {
  hasAdvertisingConsent,
  onTrackingConsentChange,
} from '@/utils/trackingConsent';

type MetaEventName = 'PageView' | 'ViewContent' | 'Download' | 'InitiateCheckout' | 'Purchase';
type MetaEventProperties = Record<string, boolean | number | string | string[] | undefined>;

interface MetaFbq {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
  push?: MetaFbq;
}

declare global {
  interface Window {
    fbq?: MetaFbq;
    _fbq?: MetaFbq;
    __zushMetaConfigured?: boolean;
  }
}

let pixelId = '';
let initialized = false;
let loading = false;
let lastPageKey = '';

const createEventId = (): string =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const isProductLanding = (pathname: string): boolean => {
  const route = pathname.replace(/^\/(de|fr|pt-br|es|nl|it|ja|ko|zh-cn|tr|ar)(?=\/)/, '');
  return route === '/'
    || route === '/mac'
    || route === '/windows'
    || route.startsWith('/rename-')
    || route.startsWith('/for-')
    || route === '/batch-rename-files'
    || route === '/ai-file-organizer'
    || route === '/offline-ai-file-renamer';
};

const loadMetaPixel = (): void => {
  if (initialized || loading || !pixelId || !hasAdvertisingConsent()) return;
  loading = true;

  const fbq: MetaFbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.onload = () => { loading = false; };
  script.onerror = () => { loading = false; };
  document.head.append(script);

  fbq('consent', 'grant');
  fbq('init', pixelId);
  initialized = true;
};

const sendBrowserEvent = (
  eventName: MetaEventName,
  properties: MetaEventProperties,
  eventId: string,
): void => {
  if (!hasAdvertisingConsent()) return;
  loadMetaPixel();
  if (!window.fbq) return;

  const method = eventName === 'Download' ? 'trackCustom' : 'track';
  window.fbq(method, eventName, properties, { eventID: eventId });
};

const sendServerEvent = (
  eventName: Extract<MetaEventName, 'ViewContent' | 'Download' | 'InitiateCheckout'>,
  properties: MetaEventProperties,
  eventId: string,
): void => {
  if (!hasAdvertisingConsent()) return;
  void fetch('/api/meta-event', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      properties,
    }),
    credentials: 'same-origin',
    keepalive: true,
  }).catch(() => undefined);
};

const capturePage = (): void => {
  if (!hasAdvertisingConsent()) return;
  const pageKey = `${window.location.pathname}${window.location.search}`;
  if (lastPageKey === pageKey) return;
  lastPageKey = pageKey;

  sendBrowserEvent('PageView', {}, createEventId());
  if (isProductLanding(window.location.pathname)) {
    const eventId = createEventId();
    const properties = {
      content_name: document.title,
      content_category: 'product_landing',
      content_type: 'product',
    };
    sendBrowserEvent('ViewContent', properties, eventId);
    sendServerEvent('ViewContent', properties, eventId);
  }
};

export const configureMetaTracking = (configuredPixelId: string): void => {
  pixelId = configuredPixelId.trim();
  if (!pixelId || typeof window === 'undefined' || window.__zushMetaConfigured) return;
  window.__zushMetaConfigured = true;

  if (hasAdvertisingConsent()) {
    loadMetaPixel();
    capturePage();
  }

  onTrackingConsentChange((consent) => {
    if (!consent.advertising) {
      window.fbq?.('consent', 'revoke');
      lastPageKey = '';
      return;
    }
    loadMetaPixel();
    capturePage();
  });

  document.addEventListener('astro:after-swap', () => {
    window.requestAnimationFrame(capturePage);
  });
};

export const trackMetaEvent = (
  eventName: Extract<MetaEventName, 'Download' | 'InitiateCheckout'>,
  properties: MetaEventProperties = {},
): string | null => {
  if (typeof window === 'undefined' || !hasAdvertisingConsent()) return null;
  const eventId = createEventId();
  sendBrowserEvent(eventName, properties, eventId);
  sendServerEvent(eventName, properties, eventId);
  return eventId;
};

export const trackMetaPurchase = ({
  eventId,
  value,
  currency = 'USD',
}: {
  eventId: string;
  value?: number;
  currency?: string;
}): void => {
  if (typeof window === 'undefined' || !hasAdvertisingConsent()) return;
  sendBrowserEvent('Purchase', {
    value,
    currency,
    content_type: 'product',
  }, eventId);
};
