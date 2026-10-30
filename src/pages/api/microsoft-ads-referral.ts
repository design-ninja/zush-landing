import type { APIRoute } from 'astro';
import { geolocation } from '@vercel/functions';
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const headers = { 'Cache-Control': 'private, no-store' };
  if (geolocation(request).country !== 'US' || request.headers.get('sec-gpc') === '1' || request.headers.get('dnt') === '1') {
    return Response.json({ cid: null }, { headers });
  }
  const key = import.meta.env.SUPABASE_ANON_KEY;
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  if (!key || !url) return Response.json({ cid: null }, { status: 503, headers });
  let body;
  try {
    const text = await request.text();
    if (text.length > 2048) return new Response(null, { status: 413, headers });
    body = JSON.parse(text);
  } catch { return new Response(null, { status: 400, headers }); }
  if (body?.campaign_id !== '525101967' || typeof body.microsoft_click_id !== 'string'
      || !/^[a-f0-9]{32}$/i.test(body.microsoft_click_id)) return new Response(null, { status: 400, headers });
  try {
    const response = await fetch(`${url}/functions/v1/ad-acquisition-referral`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', apikey: key, Authorization: `Bearer ${key}` },
      body: JSON.stringify({ campaign_id: '525101967', microsoft_click_id: body.microsoft_click_id }), signal: AbortSignal.timeout(1200),
    });
    if (!response.ok) return Response.json({ cid: null }, { status: 503, headers });
    const result = await response.json();
    if (typeof result.cid !== 'string' || !/^msads_525101967_[a-f0-9]{32}$/.test(result.cid)) return Response.json({ cid: null }, { status: 503, headers });
    return Response.json({ cid: result.cid }, { headers });
  } catch { return Response.json({ cid: null }, { status: 503, headers }); }
};
