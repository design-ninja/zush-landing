type AnalyticsProperties = Record<string, boolean | number | string | null | undefined>;

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
 * Null when PostHog is absent — opted out, blocked, or not yet loaded.
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

export function trackAnalyticsEvent(eventName: string, properties?: AnalyticsProperties): void {
  if (typeof window === 'undefined') return;

  try {
    window.posthog?.capture(eventName, properties);
  } catch {
    // Analytics should never block navigation, downloads, or checkout.
  }
}

