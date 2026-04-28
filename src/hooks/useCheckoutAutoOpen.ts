import { useEffect, useRef } from "react";
import { PRO_PADDLE_PRICE_ID } from "@/constants/pricing";
import { getCheckoutParam } from "@/utils/checkoutParams";

export const useCheckoutAutoOpen = () => {
  const hasOpened = useRef(false);

  useEffect(() => {
    const checkout = getCheckoutParam("checkout");
    const deviceId = getCheckoutParam("device_id");

    if (checkout !== "pro" || hasOpened.current) {
      return;
    }

    hasOpened.current = true;
    let isCancelled = false;

    // Open Paddle checkout modal directly instead of scrolling to pricing.
    const timeoutId = window.setTimeout(async () => {
      if (isCancelled) {
        return;
      }

      try {
        const { openPaddleCheckout } = await import("@/utils/paddle");
        await openPaddleCheckout(deviceId, PRO_PADDLE_PRICE_ID);
      } catch (error) {
        console.error("[CheckoutAutoOpen] Failed to open checkout:", error);
      }
    }, 300);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);
};
