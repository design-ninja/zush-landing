import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FolderPlus,
  Zap,
  FileCode,
  Sparkles,
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
import { useRemoteConfig } from '@/hooks/useRemoteConfig';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DOWNLOAD_URL } from '@/constants';
import styles from './Pricing.module.scss';

const PADDLE_MONTHLY_PRICE_ID = import.meta.env.VITE_PADDLE_MONTHLY_PRICE_ID;
const PADDLE_ANNUAL_PRICE_ID = import.meta.env.VITE_PADDLE_ANNUAL_PRICE_ID;
const PADDLE_ONETIME_PRICE_ID = import.meta.env.VITE_PADDLE_ONETIME_PRICE_ID;

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
  const [planType, setPlanType] = useState<'monthly' | 'annual' | 'onetime'>(
    'monthly'
  );

  const { config, loading: configLoading } = useRemoteConfig();
  const { price: monthlyPrice, loading: monthlyLoading } = usePaddlePrice(
    PADDLE_MONTHLY_PRICE_ID
  );
  const { price: annualPrice, loading: annualLoading } = usePaddlePrice(
    PADDLE_ANNUAL_PRICE_ID
  );
  const { price: onetimePrice, loading: onetimeLoading } = usePaddlePrice(
    PADDLE_ONETIME_PRICE_ID
  );

  const currentPrice =
    planType === 'monthly'
      ? monthlyPrice
      : planType === 'annual'
      ? annualPrice
      : onetimePrice;
  const currentPriceLoading =
    planType === 'monthly'
      ? monthlyLoading
      : planType === 'annual'
      ? annualLoading
      : onetimeLoading;
  const currentPriceId =
    planType === 'monthly'
      ? PADDLE_MONTHLY_PRICE_ID
      : planType === 'annual'
      ? PADDLE_ANNUAL_PRICE_ID
      : PADDLE_ONETIME_PRICE_ID;
  const currentPeriod =
    planType === 'monthly'
      ? 'month'
      : planType === 'annual'
      ? 'year'
      : 'one-time';

  const proMonthlyLimit =
    planType === 'monthly'
      ? config?.pro_monthly_limit_monthly ?? 0
      : planType === 'annual'
      ? config?.pro_monthly_limit_annual ?? 0
      : config?.pro_monthly_limit_one_time ?? 0;

  // Calculate discount for annual plan (only when prices are loaded)
  const monthlyPriceNum = monthlyPrice
    ? parseFloat(monthlyPrice.replace(/[^0-9.]/g, ''))
    : null;
  const annualPriceNum = annualPrice
    ? parseFloat(annualPrice.replace(/[^0-9.]/g, ''))
    : null;
  const discountAmount =
    monthlyPriceNum && annualPriceNum
      ? monthlyPriceNum * 12 - annualPriceNum
      : null;

  const plans: Plan[] = [
    {
      name: 'Zush Free',
      price: '$0',
      description: 'Basic organization for casual users',
      features: [
        {
          title: configLoading
            ? '... Renames'
            : `${formatNumber(config?.free_tier_limit ?? 0)} Renames`,
          desc: 'Monthly AI-powered renames',
          icon: Sparkles,
        },
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
      description: 'Powerful AI features for power users',
      features: [
        {
          title: configLoading
            ? '... Renames'
            : `${formatNumber(proMonthlyLimit)} Renames`,
          desc: 'Monthly AI-powered renames',
          icon: Sparkles,
        },
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
              {plan.isPro && planType === 'annual' && discountAmount && (
                <div className={styles.PricingCard__Badge}>
                  Save ${discountAmount.toFixed(2)}
                </div>
              )}

              <div className={styles.PricingCard__Top}>
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

                {plan.isPro ? (
                  <div className={styles.PricingCard__Toggle}>
                    <button
                      className={`${styles.PricingCard__ToggleButton} ${
                        planType === 'monthly'
                          ? styles.PricingCard__ToggleButton_active
                          : ''
                      }`}
                      onClick={() => setPlanType('monthly')}
                    >
                      Monthly
                    </button>
                    <button
                      className={`${styles.PricingCard__ToggleButton} ${
                        planType === 'annual'
                          ? styles.PricingCard__ToggleButton_active
                          : ''
                      }`}
                      onClick={() => setPlanType('annual')}
                    >
                      Annual
                    </button>
                    <button
                      className={`${styles.PricingCard__ToggleButton} ${
                        planType === 'onetime'
                          ? styles.PricingCard__ToggleButton_active
                          : ''
                      }`}
                      onClick={() => setPlanType('onetime')}
                    >
                      One-time
                    </button>
                  </div>
                ) : (
                  <div className={styles.PricingCard__ToggleSpacer}></div>
                )}

                <div className={styles.PricingCard__Price}>
                  <span className={styles.PricingCard__PriceValue}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={styles.PricingCard__PricePeriod}>
                      {plan.period === 'one-time'
                        ? '/ one-time'
                        : `/ ${plan.period}`}
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

              <Button
                variant={plan.isPro ? 'primary' : 'black'}
                onClick={() => handleButtonClick(plan.isPro)}
              >
                {!plan.isPro && <AppleIcon />}
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        <Text
          as='p'
          size='sm'
          color='subtle'
          align='center'
          className={styles.Pricing__Disclaimer}
        >
          Secure payment via Paddle. All local taxes included.
        </Text>

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
