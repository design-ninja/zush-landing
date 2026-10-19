import { WINDOWS_STORE_IRELAND_URL, WINDOWS_STORE_US_URL } from '@/constants';

export const MICROSOFT_STORE_IRELAND_REVIEW = {
  name: 'Kevin',
  title: 'What I exactly needed',
  quote:
    'This is what i needed to get the first original creation date before the modified date back to original',
  rating: 5,
  publishedAt: '2026-09-29',
  source: WINDOWS_STORE_IRELAND_URL,
  sourceLabel: 'Microsoft Store (Ireland)',
} as const;
export const MICROSOFT_STORE_REVIEWS = [
  {
    name: 'Arthur',
    title: 'Wow!',
    quote:
      "So far this product is doing what it should and better than most I've tried. I have the lifetime license so this is going to be fun.",
    rating: 5,
    publishedAt: '2026-10-17',
    source: WINDOWS_STORE_US_URL,
  },
  {
    name: 'Lennox',
    title: 'Awesome App',
    quote:
      'Awesome App, I had over 127 Reels that needed namimng, it did it flawlessly, so well that I ended up buying the App Permanently :)',
    rating: 5,
    publishedAt: '2026-09-06',
    source: WINDOWS_STORE_US_URL,
  },
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
    name: 'Lori Jean',
    title: 'Amazing',
    quote: 'This app does exactly what I needed it to do.',
    rating: 5,
    publishedAt: '2026-07-24',
    source: WINDOWS_STORE_US_URL,
  },
] as const;
