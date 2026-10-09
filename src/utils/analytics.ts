type AnalyticsProperties = Record<string, boolean | number | string | null | undefined>;

const ANALYTICS_URL_BASE = 'https://zushapp.com';

declare global {
  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: AnalyticsProperties) => void;
      get_distinct_id?: () => string | undefined;
    };
  }
}

/**
 * Current PostHog session id, passed through checkout so the server-side
 * purchase event lands on the same person as the visit that produced it.
 * Null when PostHog is absent — excluded, blocked, or not yet loaded.
 */
export function getAnalyticsDistinctId(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const distinctId = window.posthog?.get_distinct_id?.();
    return typeof distinctId === 'string' && distinctId.trim()
      ? distinctId.trim()
      : null;
  } catch {
    return null;
  }
}

/**
 * Analytics only needs the page identity. Query parameters and fragments can
 * contain email addresses, checkout tokens, or other values that must not be
 * copied into event properties.
 */
export function sanitizeAnalyticsUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value, ANALYTICS_URL_BASE);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;
    return `${url.origin}${url.pathname}`;
  } catch {
    return undefined;
  }
}

export function sanitizeAnalyticsPath(value: string | null | undefined): string | undefined {
  if (!value) return undefined;

  try {
    return new URL(value, ANALYTICS_URL_BASE).pathname;
  } catch {
    return undefined;
  }
}

export function getAnalyticsPageProperties(): Record<string, string | undefined> {
  if (typeof window === 'undefined') return {};

  return {
    page_path: window.location.pathname,
    page_url: sanitizeAnalyticsUrl(window.location.href),
    referrer: typeof document === 'undefined'
      ? undefined
      : sanitizeAnalyticsUrl(document.referrer),
  };
}

export function trackAnalyticsEvent(eventName: string, properties?: AnalyticsProperties): void {
  if (typeof window === 'undefined') return;

  try {
    window.posthog?.capture(eventName, properties);
  } catch {
    // Analytics should never block navigation, downloads, or checkout.
  }
}
