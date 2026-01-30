import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SectionHeader from '../SectionHeader';
import MobileDownloadModal from '../MobileDownloadModal';
import { PricingCard } from './PricingCard';
import { FREE_PLAN, PRO_PLAN } from './constants';
import { openPaddleCheckout } from '@/utils/paddle';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DOWNLOAD_URL, APP_CONFIG } from '@/constants';
import styles from './Pricing.module.scss';

const Pricing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const deviceId = searchParams.get('device_id');
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const freeLimit = APP_CONFIG.free_tier_limit;

  const handleButtonClick = (isPro: boolean) => {
    if (isPro) {
      const priceId = PRO_PLAN.paddlePriceId;
      if (!priceId) {
        console.warn('[Pricing] Price ID is missing for PRO checkout');
        return;
      }
      openPaddleCheckout(deviceId, priceId);
    } else if (isMobile) {
      setIsModalOpen(true);
    } else {
      window.open(DOWNLOAD_URL, '_blank');
    }
  };

  return (
    <section id='pricing' className={styles.Pricing}>
      <div className={styles.Pricing__Container}>
        <SectionHeader
          title={
            <>
              Choose your <span className={styles.Pricing__TitleAccent}>Plan</span>
            </>
          }
          description='Start free with all features, upgrade for unlimited processing'
        />

        <div className={styles.Pricing__Grid}>
          {/* Free Plan */}
          <PricingCard
            {...FREE_PLAN}
            price={FREE_PLAN.price || '$0'}
            index={0}
            onButtonClick={() => handleButtonClick(false)}
            buttonText={FREE_PLAN.buttonText}
            isButtonDisabled={false}
            isLoading={false}
            buttonHint='No credit card required'
            creditsSlot={
              <div className={styles.Controls__PricingCard}>
                <div className={styles.PackLabel__PricingCard}>
                  Monthly credits
                </div>
                <div className={`${styles.PackToggle__PricingCard} ${styles.PackToggle__PricingCard_single}`}>
                  <button
                    className={`${styles.PricingCard__ToggleButton} ${styles.PackToggleButton__PricingCard} ${styles.PricingCard__ToggleButton_muted}`}
                    disabled
                  >
                    {String(freeLimit)}
                  </button>
                </div>
              </div>
            }
          />

          {/* Pro Plan */}
          <PricingCard
            {...PRO_PLAN}
            price={PRO_PLAN.price || '$10'}
            billing={PRO_PLAN.billing}
            index={1}
            onButtonClick={() => handleButtonClick(true)}
            buttonText={PRO_PLAN.buttonText}
            isButtonDisabled={false}
            isLoading={false}
            buttonHint='Secure payment via Paddle'
            creditsSlot={
              <div className={styles.Controls__PricingCard}>
                <div className={styles.PackLabel__PricingCard}>
                  Monthly credits
                </div>
                <div className={`${styles.PackToggle__PricingCard} ${styles.PackToggle__PricingCard_single}`}>
                  <button
                    className={`${styles.PricingCard__ToggleButton} ${styles.PackToggleButton__PricingCard}`}
                    disabled
                  >
                    10,000
                  </button>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <MobileDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Pricing;
