import type { APIRoute } from 'astro';
import { geolocation } from '@vercel/functions';

export const prerender = false;

export const GET: APIRoute = ({ request }) => {
  const enabled = geolocation(request).country === 'US'
    && request.headers.get('sec-gpc') !== '1'
    && request.headers.get('dnt') !== '1';

  return Response.json(enabled ? { enabled: true, tagId: '343281815' } : { enabled: false }, {
    headers: {
      'Cache-Control': 'private, no-store',
      Vary: 'x-vercel-ip-country, sec-gpc, dnt',
    },
  });
};
