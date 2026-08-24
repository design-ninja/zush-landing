import { WINDOWS_STORE_US_URL } from '@/constants';

export const MICROSOFT_STORE_RATING = {
  ratingValue: 5,
  ratingCount: 5,
  reviewCount: 4,
  source: WINDOWS_STORE_US_URL,
  market: 'US',
  locale: 'en-US',
  verifiedAt: '2026-08-24',
} as const;

export const MICROSOFT_STORE_REVIEWS = [
  {
    name: 'Robert',
    title: 'Well Spent Money',
    quote:
      'Zush is a fast AI file renamer that really works and I can give tons of praise to them for creating this fantastic program. There are lots of things you can with Zush and templates to choose from or create your own templates. You can add all kinds of presets that can add more detail for your renaming but I bought the $10.00 monthly charge but soon will purchase the lifetime plan with this Great program so Thanks for creating this !!',
    rating: 5,
    publishedAt: '2026-08-09',
    source: WINDOWS_STORE_US_URL,
  },
  {
    name: 'Kirill',
    title: 'Cleaned up my Screenshots',
    quote:
      'Nothing fancy to say here: I had a bunch of files with generic “Screenshot” names, and Zush renamed them so I could actually search for later. The folder monitoring is pretty neat too - it just watches my screenshots and handles the new ones automatically. That’s exactly what I needed. Thanks for the app!',
    rating: 5,
    publishedAt: '2026-05-10',
    source: WINDOWS_STORE_US_URL,
  },
  {
    name: 'Lori Jean',
    title: 'Amazing',
    quote: 'This app does exactly what I needed it to do.',
    rating: 5,
    publishedAt: '2026-07-24',
    source: WINDOWS_STORE_US_URL,
  },
] as const;
