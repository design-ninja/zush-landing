export interface CheckoutAnalyticsEvent {
  name: string;
  code?: string;
  type?: string;
  data?: {
    id?: string;
    transaction_id?: string;
    discount?: { id?: string } | null;
  };
}

const eventNames: Record<string, string> = {
  'checkout.loaded': 'checkout_loaded',
  'checkout.closed': 'checkout_closed',
  'checkout.error': 'checkout_error',
  'checkout.payment.error': 'checkout_payment_error',
  'checkout.payment.failed': 'checkout_payment_failed',
  'checkout.discount.applied': 'checkout_discount_applied',
  'checkout.discount.removed': 'checkout_discount_removed',
};

export function getCheckoutAnalyticsEvent(event: CheckoutAnalyticsEvent) {
  const name = Object.prototype.hasOwnProperty.call(eventNames, event.name) ? eventNames[event.name] : undefined;
  if (!name) return null;

  // Only selected technical fields: never forward customer or payment payloads.
  return {
    name,
    properties: {
      provider: 'paddle',
      paddle_event: event.name,
      checkout_id: event.data?.id,
      transaction_id: event.data?.transaction_id,
      discount_id: event.data?.discount?.id,
      error_code: event.code,
      error_type: event.type,
    },
  };
}
