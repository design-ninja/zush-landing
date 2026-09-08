import type { APIRoute } from 'astro';
import { waitUntil } from '@vercel/functions';
import { TRACKING_CONSENT_COOKIE } from '@/utils/trackingConsent';

export const prerender = false;

const ALLOWED_EVENTS = new Set(['ViewContent', 'Download', 'InitiateCheckout']);
const EVENT_ID_PATTERN = /^[A-Za-z0-9_-]{12,128}$/;
const META_TIMEOUT_MS = 1500;

const getEnv = (name: string): string | undefined => {
  const value = (import.meta.env as Record<string, string | undefined>)[name]
    ?? (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[name];
  return value?.trim() || undefined;
};

const getCookie = (request: Request, name: string): string | undefined => request.headers
  .get('cookie')
  ?.split(';')
  .map((part) => part.trim())
  .find((part) => part.startsWith(`${name}=`))
  ?.slice(name.length + 1);

const hasAdvertisingConsent = (request: Request): boolean => {
  if (request.headers.get('sec-gpc') === '1') return false;
  const raw = getCookie(request, TRACKING_CONSENT_COOKIE);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as { version?: unknown; advertising?: unknown };
    return parsed.version === 1 && parsed.advertising === true;
  } catch {
    return false;
  }
};

const sanitizeSourceUrl = (value: unknown, request: Request): string => {
  try {
    const url = new URL(typeof value === 'string' ? value : request.url);
    const requestUrl = new URL(request.url);
    if (url.origin !== requestUrl.origin) return requestUrl.origin;
    url.search = '';
    url.hash = '';
    return url.href.slice(0, 500);
  } catch {
    return new URL(request.url).origin;
  }
};

const cleanProperties = (value: unknown): Record<string, string | number | boolean | string[]> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const allowed = new Set(['content_name', 'content_category', 'content_type', 'content_ids', 'os', 'channel', 'source']);
  const result: Record<string, string | number | boolean | string[]> = {};
  Object.entries(value as Record<string, unknown>).forEach(([key, item]) => {
    if (!allowed.has(key)) return;
    if (typeof item === 'string') result[key] = item.slice(0, 200);
    else if (typeof item === 'number' && Number.isFinite(item)) result[key] = item;
    else if (typeof item === 'boolean') result[key] = item;
    else if (Array.isArray(item) && item.every((entry) => typeof entry === 'string')) {
      result[key] = item.slice(0, 10).map((entry) => entry.slice(0, 100));
    }
  });
  return result;
};

const sendToMeta = async (
  request: Request,
  event: { eventName: string; eventId: string; eventSourceUrl: string; properties: Record<string, string | number | boolean | string[]> },
): Promise<void> => {
  const pixelId = getEnv('PUBLIC_META_PIXEL_ID');
  const token = getEnv('META_CONVERSIONS_API_TOKEN');
  if (!pixelId || !token) return;

  const userData: Record<string, string> = {};
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const userAgent = request.headers.get('user-agent')?.slice(0, 500);
  const fbp = getCookie(request, '_fbp');
  const fbc = getCookie(request, '_fbc');
  if (forwarded && forwarded.length <= 64) userData.client_ip_address = forwarded;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp && fbp.length <= 200) userData.fbp = decodeURIComponent(fbp);
  if (fbc && fbc.length <= 200) userData.fbc = decodeURIComponent(fbc);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), META_TIMEOUT_MS);
  try {
    const version = getEnv('META_API_VERSION') || 'v24.0';
    const testEventCode = getEnv('META_TEST_EVENT_CODE');
    const body: Record<string, unknown> = {
      data: [{
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: 'website',
        event_source_url: event.eventSourceUrl,
        user_data: userData,
        custom_data: event.properties,
      }],
    };
    if (testEventCode) body.test_event_code = testEventCode;

    const response = await fetch(`https://graph.facebook.com/${version}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) console.warn('Meta CAPI event rejected', response.status);
  } finally {
    clearTimeout(timer);
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!hasAdvertisingConsent(request)) return new Response(null, { status: 204 });

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 400 });
  }

  const eventName = typeof body.eventName === 'string' ? body.eventName : '';
  const eventId = typeof body.eventId === 'string' ? body.eventId : '';
  if (!ALLOWED_EVENTS.has(eventName) || !EVENT_ID_PATTERN.test(eventId)) {
    return new Response(null, { status: 400 });
  }

  const event = {
    eventName,
    eventId,
    eventSourceUrl: sanitizeSourceUrl(body.eventSourceUrl, request),
    properties: cleanProperties(body.properties),
  };

  waitUntil(sendToMeta(request, event).catch((error) => {
    console.warn('Meta CAPI request failed', error instanceof Error ? error.message : 'unknown');
  }));
  return new Response(null, { status: 202 });
};
