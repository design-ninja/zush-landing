import { useLocation } from 'react-router-dom';
import SectionHeader from '../SectionHeader';
import { PricingCard } from './PricingCard';
import { PRO_PLAN } from './constants';
import { openPaddleCheckout } from '@/utils/paddle';
import styles from './Pricing.module.scss';

const Pricing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const deviceId = searchParams.get('device_id');

  const handleButtonClick = () => {
    const priceId = PRO_PLAN.paddlePriceId;
    if (!priceId) {
      console.warn('[Pricing] Price ID is missing for PRO checkout');
      return;
    }
    openPaddleCheckout(deviceId, priceId);
  };

  return (
    <section id='pricing' className={styles.Pricing}>
      <div className={styles.Pricing__Container}>
        <SectionHeader
          title={
            <>
              <span className={styles.Pricing__TitleAccent}>Zush PRO</span>
            </>
          }
          description='Buy once - use forever'
        />

        <div className={styles.Pricing__Single}>
          <PricingCard
            {...PRO_PLAN}
            price={PRO_PLAN.price || '$10'}
            billing={PRO_PLAN.billing}
            index={0}
            onButtonClick={handleButtonClick}
            buttonText={PRO_PLAN.buttonText}
            isButtonDisabled={false}
            isLoading={false}
            buttonHint='Secure payment via Paddle'
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
