import type { APIRoute } from 'astro';
import { MAC_INSTALLER_URL } from '@/constants';

export const prerender = false;

const GOOGLE_ADS_API_VERSION = 'v24';
const GOOGLE_ADS_DEFAULT_CUSTOMER_ID = '4714692966';
const GOOGLE_ADS_DEFAULT_LOGIN_CUSTOMER_ID = '2807588601';
const REDIRECT_TIMEOUT_MS = 1200;

const attributionParams = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_device',
  'utm_matchtype',
  'utm_id',
] as const;

type AttributionParam = (typeof attributionParams)[number];
type DownloadAttribution = Partial<Record<AttributionParam, string>> & {
  event_id: string;
  referrer?: string;
  request_path: string;
  request_url: string;
  user_agent?: string;
};

const getEnv = (name: string): string | undefined => {
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  return value && value.trim() ? value.trim() : undefined;
};

const getRequestHeaders = (request: Request) => ({
  referrer: request.headers.get('referer') || undefined,
  userAgent: request.headers.get('user-agent') || undefined,
});

const copyAttributionParams = (
  target: Partial<Record<AttributionParam, string>>,
  source: URLSearchParams,
) => {
  attributionParams.forEach((param) => {
    const value = source.get(param);
    if (value) target[param] = value;
  });
};

const collectAttribution = (request: Request, eventId: string): DownloadAttribution => {
  const requestUrl = new URL(request.url);
  const { referrer, userAgent } = getRequestHeaders(request);
  const attribution: Partial<Record<AttributionParam, string>> = {};

  if (referrer) {
    try {
      copyAttributionParams(attribution, new URL(referrer).searchParams);
    } catch {
      // Referrer can be origin-only or malformed; request params remain the source of truth.
    }
  }

  copyAttributionParams(attribution, requestUrl.searchParams);

  return {
    ...attribution,
    event_id: eventId,
    referrer,
    request_path: `${requestUrl.pathname}${requestUrl.search}`,
    request_url: requestUrl.href,
    user_agent: userAgent,
  };
};

const getClickId = (attribution: DownloadAttribution) => {
  if (attribution.gclid) return { field: 'gclid', value: attribution.gclid };
  if (attribution.gbraid) return { field: 'gbraid', value: attribution.gbraid };
  if (attribution.wbraid) return { field: 'wbraid', value: attribution.wbraid };
  return null;
};

const formatGoogleAdsDateTime = (date: Date): string => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}:${values.second}+07:00`;
};

const fetchWithTimeout = async (
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
};

const capturePostHogDownload = async (attribution: DownloadAttribution): Promise<void> => {
  const apiKey = getEnv('PUBLIC_POSTHOG_KEY');
  if (!apiKey) return;

  const host = getEnv('PUBLIC_POSTHOG_HOST') || 'https://us.i.posthog.com';
  const clickId = getClickId(attribution);

  const response = await fetchWithTimeout(`${host.replace(/\/$/, '')}/capture/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      event: 'server_download_click',
      distinct_id: clickId ? `ads:${clickId.value}` : `download:${attribution.event_id}`,
      properties: {
        ...attribution,
        os: 'mac',
        channel: 'direct',
        installer_url: MAC_INSTALLER_URL,
      },
    }),
  }, REDIRECT_TIMEOUT_MS);

  if (!response.ok) {
    console.warn('PostHog download capture failed', response.status);
  }
};

const getGoogleAdsAccessToken = async (): Promise<string | null> => {
  const clientId = getEnv('GOOGLE_ADS_CLIENT_ID');
  const clientSecret = getEnv('GOOGLE_ADS_CLIENT_SECRET');
  const refreshToken = getEnv('GOOGLE_ADS_REFRESH_TOKEN');

  if (!clientId || !clientSecret || !refreshToken) return null;

  const response = await fetchWithTimeout('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  }, REDIRECT_TIMEOUT_MS);

  if (!response.ok) {
    console.warn('Google Ads OAuth refresh failed', response.status);
    return null;
  }

  const data = await response.json() as { access_token?: string };
  return data.access_token ?? null;
};

const uploadGoogleAdsDownloadConversion = async (
  attribution: DownloadAttribution,
  conversionTime: Date,
): Promise<void> => {
  const clickId = getClickId(attribution);
  if (!clickId) return;

  const developerToken = getEnv('GOOGLE_ADS_DEVELOPER_TOKEN');
  const conversionActionId = getEnv('GOOGLE_ADS_DOWNLOAD_UPLOAD_CONVERSION_ACTION_ID');
  const customerId = getEnv('GOOGLE_ADS_CUSTOMER_ID') || GOOGLE_ADS_DEFAULT_CUSTOMER_ID;
  const loginCustomerId =
    getEnv('GOOGLE_ADS_LOGIN_CUSTOMER_ID') || GOOGLE_ADS_DEFAULT_LOGIN_CUSTOMER_ID;

  if (!developerToken || !conversionActionId) return;

  const accessToken = await getGoogleAdsAccessToken();
  if (!accessToken) return;

  const conversion: Record<string, string | number> = {
    conversionAction: `customers/${customerId}/conversionActions/${conversionActionId}`,
    conversionDateTime: formatGoogleAdsDateTime(conversionTime),
    conversionValue: 0,
    currencyCode: 'THB',
    orderId: attribution.event_id,
    [clickId.field]: clickId.value,
  };

  const response = await fetchWithTimeout(
    `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${customerId}:uploadClickConversions`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
        'developer-token': developerToken,
        'login-customer-id': loginCustomerId,
      },
      body: JSON.stringify({
        conversions: [conversion],
        partialFailure: true,
      }),
    },
    REDIRECT_TIMEOUT_MS,
  );

  if (!response.ok) {
    console.warn('Google Ads download conversion upload failed', response.status);
    return;
  }

  const data = await response.json() as { partialFailureError?: unknown };
  if (data.partialFailureError) {
    console.warn('Google Ads download conversion upload partial failure');
  }
};

const runBestEffortTracking = async (
  request: Request,
  eventId: string,
  conversionTime: Date,
): Promise<void> => {
  const url = new URL(request.url);
  if (url.searchParams.get('dry_run') === '1') return;

  const attribution = collectAttribution(request, eventId);

  await Promise.race([
    Promise.allSettled([
      capturePostHogDownload(attribution),
      uploadGoogleAdsDownloadConversion(attribution, conversionTime),
    ]),
    new Promise((resolve) => setTimeout(resolve, REDIRECT_TIMEOUT_MS)),
  ]);
};

export const GET: APIRoute = async ({ request }) => {
  const eventId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  const conversionTime = new Date();

  try {
    await runBestEffortTracking(request, eventId, conversionTime);
  } catch (error) {
    console.warn('Download tracking failed', error instanceof Error ? error.message : 'unknown');
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: MAC_INSTALLER_URL,
      'cache-control': 'no-store',
    },
  });
};
