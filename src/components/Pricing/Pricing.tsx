import { motion } from 'framer-motion';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import {
  FolderPlus,
  Zap,
  FileCode,
  Folder,
  Tag,
  FileText,
  Globe,
  LucideIcon,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import SectionHeader from '../SectionHeader';
import AppleIcon from '../AppleIcon';
import MobileDownloadModal from '../MobileDownloadModal';
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

interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface Plan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: Feature[];
  buttonText: string;
  isPro: boolean;
  highlight?: boolean;
}

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

  // Upgrade mode state
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

  // Current credits from subscription
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

  // Check if this is an upgrade or downgrade
  const isUpgrade = selectedCredits > (currentCredits ?? 0);
  const isDowngrade = selectedCredits < (currentCredits ?? 0);
  const canChange = currentPriceId && selectedCredits !== (currentCredits ?? 0);

  // Auto-sync plan type with subscription
  useEffect(() => {
    if (subscriptionInfo?.subscription_type === 'monthly') {
      setPlanType('monthly');
    } else if (subscriptionInfo?.subscription_type === 'annual') {
      setPlanType('annual');
    }
  }, [subscriptionInfo?.subscription_type]);

  // Auto-select next credits tier ONCE when subscription is loaded
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

  // Check subscription for upgrade mode
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
          headers: {
            'Content-Type': 'application/json',
          },
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

      // Check eligibility
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

  // Auto-check subscription if email and device_id are in URL
  useEffect(() => {
    if (emailFromUrl && deviceId && !autoCheckTriggered.current) {
      autoCheckTriggered.current = true;
      runSubscriptionCheck(emailFromUrl);
    }
  }, [emailFromUrl, deviceId, runSubscriptionCheck]);

  // Handle upgrade/downgrade
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
          headers: {
            'Content-Type': 'application/json',
          },
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

  const plans: Plan[] = [
    {
      name: 'Zush Free',
      price: '$0',
      description: 'Basic organization for casual users',
      features: [
        {
          title: 'Single Folder',
          desc: 'Monitor one folder at a time',
          icon: Folder,
        },
        {
          title: 'Manual Metadata',
          desc: 'Add Finder tags manually',
          icon: Tag,
        },
        {
          title: 'Default Naming Pattern',
          desc: 'Use standard naming variables',
          icon: FileText,
        },
        {
          title: 'English only',
          desc: 'English file names with the default date format',
          icon: Globe,
        },
      ],
      buttonText: 'Download Free',
      isPro: false,
    },
    {
      name: 'Zush 🌟 PRO',
      price: `$${planType === 'monthly' ? monthlyPrice : annualMonthlyEquivalent.toFixed(2)}`,
      period: 'month',
      description: 'Flexible credit packs for power users',
      features: [
        {
          title: 'Multiple Folders',
          desc: 'Monitor multiple folders simultaneously',
          icon: FolderPlus,
        },
        {
          title: 'Smart Metadata',
          desc: 'Automatically add Finder tags and Spotlight metadata',
          icon: Zap,
        },
        {
          title: 'Custom Naming Pattern',
          desc: 'Create your own file naming pattern with variables',
          icon: FileCode,
        },
        {
          title: 'Localization',
          desc: 'File names in 60+ languages and custom date format',
          icon: Globe,
        },
      ],
      buttonText: `Buy PRO Now 🌟`,
      isPro: true,
      highlight: true,
    },
  ];

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

  // Success state
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

        {/* Loading state for upgrade mode */}
        {isUpgradeMode && upgradeState === 'loading' && (
          <div className={styles.Pricing__Loading}>
            <Loader2 className={styles.Pricing__LoadingIcon} size={32} />
            <Text as='p' color='subtle'>Checking your subscription...</Text>
          </div>
        )}

        {/* Error state for upgrade mode */}
        {isUpgradeMode && upgradeState === 'error' && (
          <div className={styles.Pricing__Error}>
            <Text as='p' color='subtle'>{upgradeError}</Text>
            <Button as={Link} to='/' variant='ghost'>
              Back to Home
            </Button>
          </div>
        )}

        {/* Show pricing cards only when not loading/error in upgrade mode */}
        {(!isUpgradeMode || upgradeState === 'ready' || upgradeState === 'upgrading') && (
          <>
            <div className={styles.Pricing__Grid}>
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${styles.PricingCard} ${
                    plan.highlight ? styles.PricingCard_highlighted : ''
                  } ${isUpgradeMode && !plan.isPro ? styles.PricingCard_dimmed : ''}`}
                  id={plan.isPro ? 'pro' : undefined}
                >
                  <div className={styles.PricingCard__Top}>
                    <div className={styles.PricingCard__HeaderRow}>
                      <div className={styles.PricingCard__Header}>
                        <Heading as='h3' className={styles.PricingCard__Name}>
                          {plan.name}
                        </Heading>
                        <Text
                          as='p'
                          size='sm'
                          color='subtle'
                          className={styles.PricingCard__Description}
                        >
                          {plan.description}
                        </Text>
                      </div>
                    </div>

                    {plan.isPro ? (
                      <div className={styles.PricingCard__ToggleWrapper}>
                        <label className={styles.AnnualToggle}>
                          <input
                            type='checkbox'
                            checked={planType === 'annual'}
                            onChange={(e) =>
                              setPlanType(e.target.checked ? 'annual' : 'monthly')
                            }
                            className={styles.AnnualToggle__Input}
                            disabled={upgradeState === 'upgrading'}
                          />
                          <span className={styles.AnnualToggle__Track}>
                            <span className={styles.AnnualToggle__Thumb} />
                          </span>
                          <span className={styles.AnnualToggle__Label}>
                            <span className={styles.AnnualToggle__Title}>Annual billing</span>
                            <span className={styles.AnnualToggle__Discount}>
                              ({discountLabel})
                            </span>
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className={styles.PricingCard__ToggleSpacer} />
                    )}

                    <div className={styles.PricingCard__Price}>
                      <div className={styles.PricingCard__PriceLeft}>
                        <span className={styles.PricingCard__PriceValue}>
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className={styles.PricingCard__PricePeriod}>
                            / {plan.period}
                          </span>
                        )}
                        {plan.isPro && planType === 'annual' && (
                          <span className={styles.PricingCard__PriceAnnual}>
                            <span className={styles.PricingCard__PriceAnnualValue}>${annualPrice}</span> / year
                          </span>
                        )}
                      </div>
                    </div>

                    {plan.isPro ? (
                      <div className={styles.Controls__PricingCard}>
                        <div className={styles.PackLabel__PricingCard}>
                          Choose monthly credits{' '}
                          <span className={styles.PackLabelHint__PricingCard}>
                            · 1 credit = 1 file rename
                          </span>
                        </div>
                        <div className={styles.PackToggle__PricingCard}>
                          {availableCredits.map((credits) => {
                            const isCurrent = isUpgradeMode && credits === currentCredits;
                            return (
                              <button
                                key={credits}
                                className={`${styles.PricingCard__ToggleButton} ${styles.PackToggleButton__PricingCard} ${
                                  selectedCredits === credits
                                    ? styles.PricingCard__ToggleButton_active
                                    : ''
                                }`}
                                onClick={() => setSelectedCredits(credits)}
                                disabled={upgradeState === 'upgrading' || isCurrent}
                              >
                                <span className={styles.PackToggleButton__Credits}>{formatNumber(credits)}</span>
                                {isCurrent && <span className={styles.PackToggleButton__CurrentLabel}>current</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
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
                    )}
                  </div>

                  <div className={styles.PricingCard__Features}>
                    {plan.features.map((feature, i) => (
                      <div key={i} className={styles.PricingCard__Feature}>
                        <div className={styles.PricingCard__FeatureIcon}>
                          <feature.icon size={24} />
                        </div>
                        <div>
                          <div className={styles.PricingCard__FeatureTitle}>
                            {feature.title}
                          </div>
                          <div className={styles.PricingCard__FeatureDesc}>
                            {feature.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.PricingCard__ButtonWrapper}>
                    {plan.isPro && isUpgradeMode && upgradeState === 'ready' && (
                      <div className={styles.PricingCard__ProrationNote}>
                        {isUpgrade ? (
                          <>💳 You'll be charged the prorated difference immediately.</>
                        ) : isDowngrade ? (
                          <>📅 New plan starts from your next billing period.</>
                        ) : (
                          <>Select a different credit pack to change your plan.</>
                        )}
                      </div>
                    )}

                    {upgradeError && plan.isPro && (
                      <div className={styles.PricingCard__Error}>{upgradeError}</div>
                    )}

                    <Button
                      variant={plan.isPro ? 'primary' : 'black'}
                      onClick={() => handleButtonClick(plan.isPro)}
                      disabled={
                        (plan.isPro && isUpgradeMode && upgradeState === 'ready' && !canChange) ||
                        upgradeState === 'upgrading' ||
                        (isUpgradeMode && !plan.isPro)
                      }
                      isLoading={plan.isPro && upgradeState === 'upgrading'}
                    >
                      {!plan.isPro && <AppleIcon />}
                      {plan.isPro ? getProButtonText() : plan.buttonText}
                    </Button>
                    <Text
                      as='p'
                      size='sm'
                      color='subtle'
                      className={styles.PricingCard__ButtonHint}
                    >
                      {plan.isPro
                        ? 'Secure payment via Paddle'
                        : 'No credit card required'}
                    </Text>
                  </div>
                </motion.div>
              ))}
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
