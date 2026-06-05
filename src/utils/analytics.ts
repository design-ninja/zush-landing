type AnalyticsProperties = Record<string, boolean | number | string | null | undefined>;

declare global {
  interface Window {
    posthog?: {
      capture: (eventName: string, properties?: AnalyticsProperties) => void;
    };
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

