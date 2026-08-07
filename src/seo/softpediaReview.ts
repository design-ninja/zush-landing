import { SOFTPEDIA_REVIEW_URL } from '@/constants';

export function buildSoftpediaReviewJsonLd() {
  return {
    review: {
      '@type': 'Review',
      '@id': `${SOFTPEDIA_REVIEW_URL}#review`,
      url: SOFTPEDIA_REVIEW_URL,
      name: 'Softpedia review of Zush',
      datePublished: '2026-08-06',
      author: {
        '@type': 'Organization',
        name: 'Softpedia',
        url: 'https://www.softpedia.com/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Softpedia',
        url: 'https://www.softpedia.com/',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 4.5,
        bestRating: 5,
        worstRating: 1,
      },
    },
  };
}
