import type { APIRoute } from 'astro';
import { SUPPORT_EMAIL } from '@/constants';

export const prerender = false;

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_FIELD_LENGTH = 1200;

type ReviewPayload = {
  email?: unknown;
  name?: unknown;
  rating?: unknown;
  review?: unknown;
  useCase?: unknown;
  website?: unknown;
};

const getEnv = (name: string): string | undefined => {
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  return value && value.trim() ? value.trim() : undefined;
};

const json = (body: Record<string, unknown>, status = 200) => (
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  })
);

const readString = (value: unknown, maxLength = MAX_FIELD_LENGTH) => (
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
);

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const formatText = ({
  email,
  name,
  rating,
  review,
  useCase,
  userAgent,
}: {
  email: string;
  name: string;
  rating: string;
  review: string;
  useCase: string;
  userAgent: string;
}) => [
  'New Zush review',
  '',
  `Name: ${name}`,
  `Email: ${email}`,
  `Use case: ${useCase}`,
  `Rating: ${rating}/5`,
  '',
  'Review:',
  review,
  '',
  `User agent: ${userAgent || 'unknown'}`,
].join('\n');

const formatHtml = (text: string) => (
  `<pre style="font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;white-space:pre-wrap;color:#111827">${escapeHtml(text)}</pre>`
);

export const POST: APIRoute = async ({ request }) => {
  let payload: ReviewPayload;

  try {
    payload = await request.json();
  } catch {
    return json({ message: 'Invalid review payload.' }, 400);
  }

  if (readString(payload.website, 200)) {
    return json({ ok: true });
  }

  const name = readString(payload.name, 80);
  const email = readString(payload.email, 120);
  const useCase = readString(payload.useCase, 120);
  const review = readString(payload.review);
  const rating = readString(payload.rating, 2);

  if (!name || !email || !useCase || !review || !rating) {
    return json({ message: 'Please fill in every field.' }, 400);
  }

  if (!isEmail(email)) {
    return json({ message: 'Please enter a valid email.' }, 400);
  }

  if (!['1', '2', '3', '4', '5'].includes(rating)) {
    return json({ message: 'Please choose a rating from 1 to 5.' }, 400);
  }

  const apiKey = getEnv('RESEND_API_KEY');
  if (!apiKey) {
    return json({ message: 'Review email is not configured yet.' }, 503);
  }

  const from = getEnv('REVIEW_FROM_EMAIL') ?? `Zush Reviews <${SUPPORT_EMAIL}>`;
  const subject = `New Zush review: ${rating}/5 from ${name}`;
  const text = formatText({
    email,
    name,
    rating,
    review,
    useCase,
    userAgent: request.headers.get('user-agent') || '',
  });

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [SUPPORT_EMAIL],
      reply_to: email,
      subject,
      text,
      html: formatHtml(text),
      tags: [
        { name: 'category', value: 'review' },
      ],
    }),
  });

  if (!response.ok) {
    console.warn('Review email failed', response.status, await response.text());
    return json({ message: 'Could not send the review right now.' }, 502);
  }

  return json({ ok: true });
};
