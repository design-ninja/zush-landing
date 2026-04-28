import SectionHeader from "../SectionHeader";
import { PricingCard } from "./PricingCard";
import { PRO_PLAN } from "./constants";
import { openPaddleCheckout } from "@/utils/paddle";
import { getCheckoutParam } from "@/utils/checkoutParams";
import styles from "./Pricing.module.scss";

const Pricing = () => {
  const deviceId =
    typeof window === "undefined" ? null : getCheckoutParam("device_id");

  const handleButtonClick = () => {
    const priceId = PRO_PLAN.paddlePriceId;
    if (!priceId) {
      console.warn("[Pricing] Price ID is missing for PRO checkout");
      return;
    }
    openPaddleCheckout(deviceId, priceId);
  };

  return (
    <section id="pricing" className={styles.Pricing}>
      <div className={styles.Pricing__Container}>
        <SectionHeader
          title="Pay once, use forever"
          description="No subscriptions, no hidden fees. Just a simple one-time purchase."
        />

        <div className={styles.Pricing__Single}>
          <PricingCard
            {...PRO_PLAN}
            price={PRO_PLAN.price || "$10"}
            billing={PRO_PLAN.billing}
            index={0}
            onButtonClick={handleButtonClick}
            buttonText={PRO_PLAN.buttonText}
            isButtonDisabled={false}
            isLoading={false}
            buttonHint="14-day money-back guarantee • Secure via Paddle"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
