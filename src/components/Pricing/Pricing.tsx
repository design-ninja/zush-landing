import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  FolderPlus,
  Zap,
  FileCode,
  Folder,
  Tag,
  FileText,
  Globe,
  LucideIcon,
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import SectionHeader from '../SectionHeader';
import AppleIcon from '../AppleIcon';
import MobileDownloadModal from '../MobileDownloadModal';
import { openPaddleCheckout } from '@/utils/paddle';
import { usePaddlePrice } from '@/hooks/usePaddlePrice';
import { CreditPack, useRemoteConfig } from '@/hooks/useRemoteConfig';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DOWNLOAD_URL } from '@/constants';
import styles from './Pricing.module.scss';

type BillingPeriod = 'monthly' | 'annual';

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

const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toLocaleString('en-US') : String(num);
};

const DEFAULT_CREDITS = [500, 2000, 5000, 10000];

const parsePriceAmount = (value?: string | null): number | null => {
  if (!value) return null;
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
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
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('[Pricing] URL info:', {
    search: location.search,
    hash: location.hash,
    deviceId,
  });
  const [planType, setPlanType] = useState<BillingPeriod>('monthly');
  const [selectedCredits, setSelectedCredits] = useState(2000);

  const { config } = useRemoteConfig();
  const creditPacks = useMemo(() => config?.credit_packs ?? [], [config?.credit_packs]);

  const availableCredits = useMemo(() => {
    const creditsByPeriod = getCreditsByPeriod(creditPacks, planType);
    return creditsByPeriod.length > 0 ? creditsByPeriod : DEFAULT_CREDITS;
  }, [creditPacks, planType]);

  useEffect(() => {
    if (!availableCredits.includes(selectedCredits)) {
      setSelectedCredits(availableCredits[0]);
    }
  }, [availableCredits, selectedCredits]);

  const monthlyPack = getPackByCredits(creditPacks, 'monthly', selectedCredits);
  const annualPack = getPackByCredits(creditPacks, 'annual', selectedCredits);

  const { price: monthlyPrice, loading: monthlyLoading } = usePaddlePrice(
    monthlyPack?.price_id
  );
  const { price: annualPrice, loading: annualLoading } = usePaddlePrice(
    annualPack?.price_id
  );

  const currentPrice = planType === 'monthly' ? monthlyPrice : annualPrice;
  const currentPriceLoading =
    planType === 'monthly' ? monthlyLoading : annualLoading;
  const currentPriceId =
    planType === 'monthly' ? monthlyPack?.price_id : annualPack?.price_id;
  const currentPeriod = planType === 'monthly' ? 'month' : 'year';

  // Calculate discount for annual plan (only when prices are loaded)
  const monthlyPriceNum = parsePriceAmount(monthlyPrice);
  const annualPriceNum = parsePriceAmount(annualPrice);
  const discountPercent =
    monthlyPriceNum && annualPriceNum
      ? Math.round(
          ((monthlyPriceNum * 12 - annualPriceNum) / (monthlyPriceNum * 12)) *
            100
        )
      : null;
  const discountLabel = discountPercent ? `save ${discountPercent}%` : 'save 17%';
  const annualMonthlyEquivalent =
    annualPriceNum ? annualPriceNum / 12 : null;

  const freeLimit = config?.free_tier_limit ?? 30;

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
      price: currentPriceLoading ? '...' : currentPrice || '...',
      period: currentPeriod,
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
      if (!currentPriceId) {
        console.warn('[Pricing] Price ID is missing for checkout');
        return;
      }
      openPaddleCheckout(deviceId, currentPriceId);
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
              Choose your{' '}
              <span className={styles.Pricing__TitleAccent}>Plan</span>
            </>
          }
          description='Start organizing for free or unlock the full power of AI with 🌟 PRO'
        />

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
              }`}
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

                  {plan.isPro && (
                    <label className={styles.AnnualToggle}>
                      <input
                        type='checkbox'
                        checked={planType === 'annual'}
                        onChange={(e) =>
                          setPlanType(e.target.checked ? 'annual' : 'monthly')
                        }
                        className={styles.AnnualToggle__Input}
                      />
                      <span className={styles.AnnualToggle__Track}>
                        <span className={styles.AnnualToggle__Thumb} />
                      </span>
                      <span className={styles.AnnualToggle__Label}>
                        <span className={styles.AnnualToggle__Title}>Annual</span>
                        <span className={styles.AnnualToggle__Discount}>
                          {discountLabel}
                        </span>
                      </span>
                    </label>
                  )}
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
                      {availableCredits.map((credits) => (
                        <button
                          key={credits}
                          className={`${styles.PricingCard__ToggleButton} ${styles.PackToggleButton__PricingCard} ${
                            selectedCredits === credits
                              ? styles.PricingCard__ToggleButton_active
                              : ''
                          }`}
                          onClick={() => setSelectedCredits(credits)}
                        >
                          {String(credits)}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.Controls__PricingCard}>
                    <div className={styles.PackLabel__PricingCard}>
                      Monthly credits
                    </div>
                    <div className={styles.PackToggle__PricingCard}>
                      <button
                        className={`${styles.PricingCard__ToggleButton} ${styles.PackToggleButton__PricingCard} ${styles.PricingCard__ToggleButton_active}`}
                        disabled
                      >
                        {String(freeLimit)}
                      </button>
                    </div>
                  </div>
                )}

                <div className={styles.PricingCard__Price}>
                  <span className={styles.PricingCard__PriceValue}>
                    {plan.isPro && planType === 'annual' && annualMonthlyEquivalent
                      ? `$${annualMonthlyEquivalent.toFixed(2)}`
                      : plan.price}
                  </span>
                  {plan.period && (
                    <span className={styles.PricingCard__PricePeriod}>
                      {plan.isPro ? '/ month' : `/ ${plan.period}`}
                    </span>
                  )}
                  {plan.isPro && planType === 'annual' && (
                    <span className={styles.PricingCard__PriceAnnual}>
                      {annualPrice ?? '...'} / year
                    </span>
                  )}
                </div>
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
                <Button
                  variant={plan.isPro ? 'primary' : 'black'}
                  onClick={() => handleButtonClick(plan.isPro)}
                  disabled={plan.isPro ? !currentPriceId : false}
                >
                  {!plan.isPro && <AppleIcon />}
                  {plan.buttonText}
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

        <Text
          as='p'
          size='sm'
          color='subtle'
          align='center'
          className={styles.Pricing__UpgradeLink}
        >
          Already a subscriber?{' '}
          <Link to='/upgrade' style={{ color: 'var(--primary)', textDecoration: 'none' }}>
            Upgrade your plan
          </Link>
        </Text>
      </div>

      <MobileDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Pricing;
