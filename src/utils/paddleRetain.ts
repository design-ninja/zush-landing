// Paddle Retain sends payment recovery customers to the homepage (Paddle > Retain >
// Configure Paddle.js), where Paddle.js must already be initialized to open the
// update-payment form. Other pages keep loading Paddle.js only for checkout.
export function bindPaddleRetain(): void {
  if (
    typeof document === 'undefined'
    || document.body.dataset.paddleRetain !== 'true'
    || (window as Window & { __zushLocaleRedirecting?: boolean }).__zushLocaleRedirecting
  ) {
    return;
  }

  void import('@/utils/paddle')
    .then(({ preloadPaddleCheckout }) => preloadPaddleCheckout())
    .catch((error) => {
      console.warn('[PaddleRetain] Failed to initialize Paddle.js:', error);
    });
}
