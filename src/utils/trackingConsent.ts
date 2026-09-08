export const TRACKING_CONSENT_COOKIE = 'zush_tracking_consent_v1';
export const TRACKING_CONSENT_EVENT = 'zush:tracking-consent-change';
export const TRACKING_CONSENT_VERSION = 1;
export const TRACKING_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export interface TrackingConsent {
  version: typeof TRACKING_CONSENT_VERSION;
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
}

const defaultConsent = (): TrackingConsent => ({
  version: TRACKING_CONSENT_VERSION,
  analytics: false,
  advertising: false,
  updatedAt: '',
});

export const hasGlobalPrivacyControl = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
};

export const readTrackingConsent = (): TrackingConsent => {
  if (typeof document === 'undefined') return defaultConsent();

  const raw = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${TRACKING_CONSENT_COOKIE}=`))
    ?.slice(TRACKING_CONSENT_COOKIE.length + 1);

  if (!raw) return defaultConsent();

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<TrackingConsent>;
    if (
      parsed.version !== TRACKING_CONSENT_VERSION
      || typeof parsed.analytics !== 'boolean'
      || typeof parsed.advertising !== 'boolean'
    ) {
      return defaultConsent();
    }

    return {
      version: TRACKING_CONSENT_VERSION,
      analytics: parsed.analytics,
      advertising: hasGlobalPrivacyControl() ? false : parsed.advertising,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
    };
  } catch {
    return defaultConsent();
  }
};

export const hasStoredTrackingConsent = (): boolean => {
  if (typeof document === 'undefined') return false;
  return document.cookie
    .split(';')
    .some((part) => part.trim().startsWith(`${TRACKING_CONSENT_COOKIE}=`));
};

export const writeTrackingConsent = (
  choice: Pick<TrackingConsent, 'analytics' | 'advertising'>,
): TrackingConsent => {
  const consent: TrackingConsent = {
    version: TRACKING_CONSENT_VERSION,
    analytics: choice.analytics,
    advertising: hasGlobalPrivacyControl() ? false : choice.advertising,
    updatedAt: new Date().toISOString(),
  };

  if (typeof document !== 'undefined') {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${TRACKING_CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Path=/; Max-Age=${TRACKING_CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
    window.dispatchEvent(new CustomEvent<TrackingConsent>(TRACKING_CONSENT_EVENT, {
      detail: consent,
    }));
  }

  return consent;
};

export const hasAnalyticsConsent = (): boolean => readTrackingConsent().analytics;
export const hasAdvertisingConsent = (): boolean => readTrackingConsent().advertising;

export const onTrackingConsentChange = (
  listener: (consent: TrackingConsent) => void,
): (() => void) => {
  if (typeof window === 'undefined') return () => undefined;

  const handler = (event: Event) => {
    listener((event as CustomEvent<TrackingConsent>).detail ?? readTrackingConsent());
  };
  window.addEventListener(TRACKING_CONSENT_EVENT, handler);
  return () => window.removeEventListener(TRACKING_CONSENT_EVENT, handler);
};
