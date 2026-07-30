import pricingData from './pricingData.json';

const PRO_MONTHLY_PRICE_ID = 'pri_01krxnw9dpvm51d3e59g24ep5z';
const LEGACY_PRO_ONE_TIME_PRICE_ID = 'pri_01ke0rya71hzwhy8y1wdt76v1y';

function createUsdPrice(usd: number) {
  return {
    usd,
    label: `$${usd}`,
    schemaPrice: String(usd),
  } as const;
}

export const PRO_PRICING = {
  monthly: createUsdPrice(pricingData.monthly.usd),
  oneTime: createUsdPrice(pricingData.oneTime.usd),
} as const;

export const PRO_PRICING_SUMMARY =
  `${PRO_PRICING.monthly.label}/month or ${PRO_PRICING.oneTime.label} one-time`;

export function resolvePricingTokens(content: string): string {
  return content
    .split('{{zush_monthly_price}}').join(PRO_PRICING.monthly.label)
    .split('{{zush_one_time_price}}').join(PRO_PRICING.oneTime.label);
}

export const PRO_MONTHLY_PADDLE_PRICE_ID =
  import.meta.env.PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID ||
  PRO_MONTHLY_PRICE_ID;

export const PRO_ONE_TIME_PADDLE_PRICE_ID =
  import.meta.env.PUBLIC_PADDLE_PRO_ONE_TIME_PRICE_ID ||
  LEGACY_PRO_ONE_TIME_PRICE_ID;
