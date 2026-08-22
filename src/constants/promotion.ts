import { PRO_PRICING } from '@/constants/pricing';

const discountPercent = 25;
const discountedUsd = PRO_PRICING.oneTime.usd * (1 - discountPercent / 100);

export const PRO_ONE_TIME_PROMOTION = {
  code: 'ZUSH25',
  discountPercent,
  discountedPrice: {
    usd: discountedUsd,
    label: `$${discountedUsd}`,
  },
} as const;
