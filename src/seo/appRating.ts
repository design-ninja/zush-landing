import { APP_RATING, type AppRating } from '@/constants';

export function buildAppAggregateRatingJsonLd(
  rating: AppRating | null = APP_RATING,
) {
  if (!rating) {
    return {};
  }

  if (
    rating.ratingValue < 1
    || rating.ratingValue > 5
    || !Number.isInteger(rating.ratingCount)
    || rating.ratingCount < 1
    || rating.source.trim().length === 0
  ) {
    throw new Error('APP_RATING must contain a 1–5 rating, a positive integer count, and a public source.');
  }

  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      ratingCount: rating.ratingCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
