import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import SectionHeader from '../SectionHeader';
import MobileDownloadModal from '../MobileDownloadModal';
import { PricingCard } from './PricingCard';
import { CreditSelector } from './CreditSelector';
import { BillingToggle } from './BillingToggle';
import { FREE_PLAN, PRO_PLAN } from './constants';
import { openPaddleCheckout } from '@/utils/paddle';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SUPABASE_URL } from '@/utils/supabase';
import {
  DOWNLOAD_URL,
  APP_CONFIG,
  CREDIT_PACKS,
  CreditPack,
  BillingPeriod,
} from '@/constants';
import styles from './Pricing.module.scss';

interface SubscriptionInfo {
  subscription_type: string;
  subscription_status: string;
  credits_per_month: number | null;
  paddle_price_id: string | null;
}

type UpgradeState = 'idle' | 'loading' | 'ready' | 'upgrading' | 'success' | 'error';

const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toLocaleString('en-US') : String(num);
};

const getCreditsByPeriod = (packs: CreditPack[], period: BillingPeriod): number[] => {
  const credits = packs
    .filter((pack) => pack.period === period)
    .map((pack) => pack.credits)
    .filter((value) => Number.isFinite(value));

  return Array.from(new Set(credits)).sort((a, b) => a - b);
};

const getPackByCredits = (
  packs: CreditPack[],
  period: BillingPeriod,
  credits: number
): CreditPack | undefined => {
  return packs.find((pack) => pack.period === period && pack.credits === credits);
};

const Pricing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const deviceId = searchParams.get('device_id');
  const emailFromUrl = searchParams.get('email');
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [planType, setPlanType] = useState<BillingPeriod>('monthly');
  const [selectedCredits, setSelectedCredits] = useState(2000);

  const [upgradeState, setUpgradeState] = useState<UpgradeState>('idle');
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [upgradeError, setUpgradeError] = useState('');
  const autoCheckTriggered = useRef(false);

  const isUpgradeMode = Boolean(emailFromUrl && deviceId);

  const availableCredits = useMemo(() => {
    return getCreditsByPeriod(CREDIT_PACKS, planType);
  }, [planType]);

  useEffect(() => {
    if (!availableCredits.includes(selectedCredits)) {
      setSelectedCredits(availableCredits[0]);
    }
  }, [availableCredits, selectedCredits]);

  const monthlyPack = getPackByCredits(CREDIT_PACKS, 'monthly', selectedCredits);
  const annualPack = getPackByCredits(CREDIT_PACKS, 'annual', selectedCredits);

  const currentPack = planType === 'monthly' ? monthlyPack : annualPack;
  const currentPriceId = currentPack?.price_id;

  const monthlyPrice = monthlyPack?.price ?? 0;
  const annualPrice = annualPack?.price ?? 0;

  const discountPercent = useMemo(() => {
    if (!monthlyPrice || !annualPrice) return 17;
    return Math.round(((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100);
  }, [monthlyPrice, annualPrice]);

  const discountLabel = useMemo(() => `save ${discountPercent}%`, [discountPercent]);

  const annualMonthlyEquivalent = annualPrice / 12;

  const freeLimit = APP_CONFIG.free_tier_limit;

  const currentCredits = useMemo(() => {
    if (!subscriptionInfo) return null;
    if (typeof subscriptionInfo.credits_per_month === 'number') {
      return subscriptionInfo.credits_per_month;
    }
    if (subscriptionInfo.paddle_price_id) {
      const match = CREDIT_PACKS.find(
        (pack) => pack.price_id === subscriptionInfo.paddle_price_id
      );
      return match?.credits ?? null;
    }
    return null;
  }, [subscriptionInfo]);

  const isUpgrade = selectedCredits > (currentCredits ?? 0);
  const isDowngrade = selectedCredits < (currentCredits ?? 0);
  const canChange = currentPriceId && selectedCredits !== (currentCredits ?? 0);

  useEffect(() => {
    if (subscriptionInfo?.subscription_type === 'monthly') {
      setPlanType('monthly');
    } else if (subscriptionInfo?.subscription_type === 'annual') {
      setPlanType('annual');
    }
  }, [subscriptionInfo?.subscription_type]);

  const hasAutoSelected = useRef(false);
  useEffect(() => {
    if (currentCredits === null || !isUpgradeMode || hasAutoSelected.current) {
      return;
    }
    const nextCredits = availableCredits.find((value) => value > currentCredits);
    if (nextCredits) {
      setSelectedCredits(nextCredits);
      hasAutoSelected.current = true;
    }
  }, [availableCredits, currentCredits, isUpgradeMode]);

  const runSubscriptionCheck = useCallback(async (email: string) => {
    if (!deviceId) {
      setUpgradeError('Please open this page from the app to upgrade your subscription.');
      setUpgradeState('error');
      return;
    }

    setUpgradeState('loading');
    setUpgradeError('');

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/get-customer-portal-url`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), device_id: deviceId }),
        }
      );

      if (response.status === 404) {
        setUpgradeError('No active subscription found for this email.');
        setUpgradeState('error');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setUpgradeError(data.error || 'Something went wrong. Please try again.');
        setUpgradeState('error');
        return;
      }

      const info: SubscriptionInfo = {
        subscription_type: data.subscription_type,
        subscription_status: data.subscription_status,
        credits_per_month: data.credits_per_month ?? null,
        paddle_price_id: data.paddle_price_id ?? null,
      };

      if (!info.subscription_type || !info.subscription_status) {
        setUpgradeError('Subscription details are missing. Please try again.');
        setUpgradeState('error');
        return;
      }
      if (info.subscription_type !== 'monthly' && info.subscription_type !== 'annual') {
        setUpgradeError('Upgrade is available only for active subscriptions.');
        setUpgradeState('error');
        return;
      }
      if (info.subscription_status !== 'active' && info.subscription_status !== 'trialing') {
        setUpgradeError('Your subscription is not active.');
        setUpgradeState('error');
        return;
      }

      setSubscriptionInfo(info);
      setUpgradeState('ready');
    } catch {
      setUpgradeError('Connection error. Please check your internet and try again.');
      setUpgradeState('error');
    }
  }, [deviceId]);

  useEffect(() => {
    if (emailFromUrl && deviceId && !autoCheckTriggered.current) {
      autoCheckTriggered.current = true;
      runSubscriptionCheck(emailFromUrl);
    }
  }, [emailFromUrl, deviceId, runSubscriptionCheck]);

  const handleUpgrade = async () => {
    if (!deviceId || !emailFromUrl) {
      setUpgradeError('Please open this page from the app to upgrade your subscription.');
      return;
    }

    if (!currentPriceId) {
      setUpgradeError('Please select a valid plan.');
      return;
    }

    setUpgradeState('upgrading');
    setUpgradeError('');

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/upgrade-subscription`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailFromUrl.trim(),
            device_id: deviceId,
            target_price_id: currentPriceId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setUpgradeState('success');
      } else {
        setUpgradeError(data.error || 'Failed to process request. Please try again.');
        setUpgradeState('ready');
      }
    } catch {
      setUpgradeError('Connection error. Please check your internet and try again.');
      setUpgradeState('ready');
    }
  };

  const handleButtonClick = (isPro: boolean) => {
    if (isPro) {
      if (isUpgradeMode && upgradeState === 'ready') {
        handleUpgrade();
      } else {
        if (!currentPriceId) {
          console.warn('[Pricing] Price ID is missing for checkout');
          return;
        }
        openPaddleCheckout(deviceId, currentPriceId);
      }
    } else if (isMobile) {
      setIsModalOpen(true);
    } else {
      window.open(DOWNLOAD_URL, '_blank');
    }
  };

  const getProButtonText = () => {
    if (upgradeState === 'upgrading') {
      return isDowngrade ? 'Processing...' : 'Upgrading...';
    }
    if (isUpgradeMode && upgradeState === 'ready') {
      if (!canChange) return 'Select a different plan';
      return isDowngrade ? 'Confirm Downgrade' : 'Confirm Upgrade 🚀';
    }
    return 'Buy PRO Now 🌟';
  };

  const getProrationNote = () => {
    if (isUpgrade) {
      return <>💳 You'll be charged the prorated difference immediately.</>;
    }
    if (isDowngrade) {
      return <>📅 New plan starts from your next billing period.</>;
    }
    return <>Select a different credit pack to change your plan.</>;
  };

  if (upgradeState === 'success') {
    return (
      <section id='pricing' className={styles.Pricing}>
        <div className={styles.Pricing__Container}>
          <div className={styles.Pricing__SuccessMessage}>
            <div className={styles.Pricing__SuccessIcon}>
              <CheckCircle size={64} />
            </div>
            <Heading as='h2' className={styles.Pricing__SuccessTitle}>
              {isDowngrade ? 'Plan Changed!' : 'Upgrade Complete!'} 🎉
            </Heading>
            <Text as='p' size='lg' color='subtle' align='center'>
              {isDowngrade ? (
                <>Your new plan will start from your next billing period.<br />You'll keep your current credits until then.</>
              ) : (
                <>Your subscription has been upgraded successfully.<br />You now have access to {formatNumber(selectedCredits)} credits per month.</>
              )}
            </Text>
            <Button as={Link} to='/' variant='primary'>
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='pricing' className={styles.Pricing}>
      <div className={styles.Pricing__Container}>
        <SectionHeader
          title={
            <>
              {isUpgradeMode && upgradeState === 'ready' ? (
                <>Upgrade your <span className={styles.Pricing__TitleAccent}>Plan</span></>
              ) : (
                <>Choose your <span className={styles.Pricing__TitleAccent}>Plan</span></>
              )}
            </>
          }
          description={
            isUpgradeMode && upgradeState === 'ready'
              ? 'Select a new credit pack to upgrade your subscription'
              : 'Start organizing for free or unlock the full power of AI with 🌟 PRO'
          }
        />

        {isUpgradeMode && upgradeState === 'loading' && (
          <div className={styles.Pricing__Loading}>
            <Loader2 className={styles.Pricing__LoadingIcon} size={32} />
            <Text as='p' color='subtle'>Checking your subscription...</Text>
          </div>
        )}

        {isUpgradeMode && upgradeState === 'error' && (
          <div className={styles.Pricing__Error}>
            <Text as='p' color='subtle'>{upgradeError}</Text>
            <Button as={Link} to='/' variant='ghost'>
              Back to Home
            </Button>
          </div>
        )}

        {(!isUpgradeMode || upgradeState === 'ready' || upgradeState === 'upgrading') && (
          <>
            <div className={styles.Pricing__Grid}>
              {/* Free Plan */}
              <PricingCard
                {...FREE_PLAN}
                price="$0"
                index={0}
                isUpgradeMode={isUpgradeMode}
                upgradeState={upgradeState}
                onButtonClick={() => handleButtonClick(false)}
                buttonText={FREE_PLAN.buttonText}
                isButtonDisabled={isUpgradeMode}
                isLoading={false}
                buttonHint="No credit card required"
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
                price={`$${planType === 'monthly' ? monthlyPrice : annualMonthlyEquivalent.toFixed(2)}`}
                period="month"
                annualPrice={annualPrice}
                showAnnualPrice={planType === 'annual'}
                index={1}
                isUpgradeMode={isUpgradeMode}
                upgradeState={upgradeState}
                onButtonClick={() => handleButtonClick(true)}
                buttonText={getProButtonText()}
                isButtonDisabled={
                  (isUpgradeMode && upgradeState === 'ready' && !canChange) ||
                  upgradeState === 'upgrading'
                }
                isLoading={upgradeState === 'upgrading'}
                buttonHint="Secure payment via Paddle"
                prorationNote={getProrationNote()}
                upgradeError={upgradeError}
                toggleSlot={
                  <BillingToggle
                    planType={planType}
                    discountLabel={discountLabel}
                    isDisabled={upgradeState === 'upgrading'}
                    onChange={setPlanType}
                  />
                }
                creditsSlot={
                  <CreditSelector
                    availableCredits={availableCredits}
                    selectedCredits={selectedCredits}
                    currentCredits={currentCredits}
                    isUpgradeMode={isUpgradeMode}
                    isDisabled={upgradeState === 'upgrading'}
                    onSelect={setSelectedCredits}
                  />
                }
              />
            </div>
          </>
        )}
      </div>

      <MobileDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Pricing;
