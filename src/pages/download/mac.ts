import type { APIRoute } from 'astro';
import { MAC_INSTALLER_URL } from '@/constants';
import { SUPABASE_URL } from '@/utils/supabase';

export const prerender = false;

const REDIRECT_TIMEOUT_MS = 1200;
const POSTHOG_PROXY_PATH = '/e';
const LEGACY_POSTHOG_PROXY_HOST = 'https://e.zushapp.com';

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

const getPostHogHost = (requestUrl: URL): string => {
  const configuredHost = getEnv('PUBLIC_POSTHOG_HOST');
  const host = !configuredHost || configuredHost === LEGACY_POSTHOG_PROXY_HOST
    ? POSTHOG_PROXY_PATH
    : configuredHost;

  return host.startsWith('/')
    ? new URL(host, requestUrl.origin).href
    : host;
};

const getRequestHeaders = (request: Request) => ({
  referrer: request.headers.get('referer') || undefined,
  userAgent: request.headers.get('user-agent') || undefined,
});

/**
 * This route is same-origin, so the browser sends PostHog's own cookie along
 * with it. Reusing that distinct_id keeps the download in the visitor's
 * existing session instead of stranding it under a freshly minted id.
 */
const getPostHogDistinctIdFromCookie = (request: Request): string | undefined => {
  const apiKey = getEnv('PUBLIC_POSTHOG_KEY');
  const cookieHeader = request.headers.get('cookie');
  if (!apiKey || !cookieHeader) return undefined;

  const cookiePrefix = `ph_${apiKey}_posthog=`;
  const rawValue = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);

  if (!rawValue) return undefined;

  try {
    const parsed = JSON.parse(decodeURIComponent(rawValue)) as {
      distinct_id?: unknown;
    };
    return typeof parsed.distinct_id === 'string' && parsed.distinct_id.trim()
      ? parsed.distinct_id.trim()
      : undefined;
  } catch {
    // Cookie shape is PostHog's to change; a miss just costs us the session join.
    return undefined;
  }
};

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

const capturePostHogDownload = async (
  attribution: DownloadAttribution,
  requestUrl: URL,
  sessionDistinctId: string | undefined,
): Promise<void> => {
  const apiKey = getEnv('PUBLIC_POSTHOG_KEY');
  if (!apiKey) return;

  const host = getPostHogHost(requestUrl);
  const clickId = getClickId(attribution);
  const distinctId = sessionDistinctId
    ?? (clickId ? `ads:${clickId.value}` : `download:${attribution.event_id}`);
  const distinctIdOrigin = sessionDistinctId
    ? 'posthog_cookie'
    : clickId
      ? 'ad_click_id'
      : 'download_event_id';

  const response = await fetchWithTimeout(`${host.replace(/\/$/, '')}/capture/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      event: 'server_download_click',
      distinct_id: distinctId,
      properties: {
        ...attribution,
        os: 'mac',
        channel: 'direct',
        installer_url: MAC_INSTALLER_URL,
        distinct_id_origin: distinctIdOrigin,
        // Matches the landing's `person_profiles: 'identified_only'` so server
        // events do not create profiles the browser deliberately skips.
        $process_person_profile: false,
      },
    }),
  }, REDIRECT_TIMEOUT_MS);

  if (!response.ok) {
    console.warn('PostHog download capture failed', response.status);
  }
};

const getClientIp = (request: Request): string | undefined => {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = request.headers.get('cf-connecting-ip')?.trim()
    || request.headers.get('x-real-ip')?.trim()
    || forwardedFor;

  return ip && ip.length > 0 ? ip.slice(0, 128) : undefined;
};

/**
 * Records the click server-side so an in-app purchase made days later can be
 * traced back to this visit. Nothing can be embedded in the signed installer,
 * so the hashed client IP is the only link between the two — the IP is sent
 * once and hashed on arrival, never stored raw.
 */
const recordDownloadClick = async (
  request: Request,
  attribution: DownloadAttribution,
  sessionDistinctId: string | undefined,
): Promise<void> => {
  const sharedSecret = getEnv('DOWNLOAD_ATTRIBUTION_SECRET');
  const clientIp = getClientIp(request);
  if (!sharedSecret || !clientIp) return;

  // Only marketing params travel onward — no user agent, no full request URL.
  const marketingAttribution: Record<string, string> = {};
  attributionParams.forEach((param) => {
    const value = attribution[param];
    if (value) marketingAttribution[param] = value;
  });
  if (attribution.referrer) {
    marketingAttribution.referrer = attribution.referrer.slice(0, 512);
  }

  const response = await fetchWithTimeout(
    `${SUPABASE_URL}/functions/v1/record-download-click`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-zush-download-secret': sharedSecret,
      },
      body: JSON.stringify({
        client_ip: clientIp,
        posthog_distinct_id: sessionDistinctId,
        os: 'mac',
        attribution: marketingAttribution,
      }),
    },
    REDIRECT_TIMEOUT_MS,
  );

  if (!response.ok) {
    console.warn('Download attribution record failed', response.status);
  }
};

const runBestEffortTracking = async (
  request: Request,
  eventId: string,
): Promise<void> => {
  const url = new URL(request.url);
  if (url.searchParams.get('dry_run') === '1') return;

  const attribution = collectAttribution(request, eventId);
  const sessionDistinctId = getPostHogDistinctIdFromCookie(request);

  // Both calls share one timeout budget so tracking never delays the redirect.
  await Promise.race([
    Promise.allSettled([
      capturePostHogDownload(attribution, url, sessionDistinctId),
      recordDownloadClick(request, attribution, sessionDistinctId),
    ]),
    new Promise((resolve) => setTimeout(resolve, REDIRECT_TIMEOUT_MS)),
  ]);
};

export const GET: APIRoute = async ({ request }) => {
  const eventId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

  try {
    await runBestEffortTracking(request, eventId);
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
