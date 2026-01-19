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
import { useIsMobile } from '@/hooks/useIsMobile';
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

  const [planType, setPlanType] = useState<BillingPeriod>('monthly');
  const [selectedCredits, setSelectedCredits] = useState(2000);

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

  const discountPercent =
    monthlyPrice && annualPrice
      ? Math.round(((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100)
      : 17;
  const discountLabel = `save ${discountPercent}%`;

  const annualMonthlyEquivalent = annualPrice / 12;

  const freeLimit = APP_CONFIG.free_tier_limit;

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
                      <span className={styles.AnnualToggle__Label}>
                        <span className={styles.AnnualToggle__Title}>Annual</span>
                        <span className={styles.AnnualToggle__Discount}>
                          {discountLabel}
                        </span>
                      </span>
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
                    </label>
                  )}
                </div>

                <div className={styles.PricingCard__Price}>
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
