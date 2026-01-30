import { memo } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import AppleIcon from '../AppleIcon';
import styles from './Pricing.module.scss';

interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  billing?: string;
  annualPrice?: number;
  showAnnualPrice?: boolean;
  description: string;
  features: Feature[];
  buttonText: string;
  isPro: boolean;
  highlight?: boolean;
  index: number;
  isUpgradeMode?: boolean;
  upgradeState?: string;
  onButtonClick: () => void;
  isButtonDisabled: boolean;
  isLoading: boolean;
  buttonHint: string;
  prorationNote?: React.ReactNode;
  upgradeError?: string;
  toggleSlot?: React.ReactNode;
  creditsSlot?: React.ReactNode;
}

export const PricingCard = memo(({
  name,
  price,
  period,
  billing,
  annualPrice,
  showAnnualPrice,
  description,
  features,
  isPro,
  highlight,
  index,
  isUpgradeMode = false,
  upgradeState = 'idle',
  onButtonClick,
  buttonText,
  isButtonDisabled,
  isLoading,
  buttonHint,
  prorationNote,
  upgradeError,
  toggleSlot,
  creditsSlot,
}: PricingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`${styles.PricingCard} ${
      highlight ? styles.PricingCard_highlighted : ''
    } ${isUpgradeMode && !isPro ? styles.PricingCard_dimmed : ''}`}
    id={isPro ? 'pro' : undefined}
  >
    <div className={styles.PricingCard__Top}>
      <div className={styles.PricingCard__HeaderRow}>
        <div className={styles.PricingCard__Header}>
          <Heading as='h3' className={styles.PricingCard__Name}>
            {name}
          </Heading>
          <Text
            as='p'
            size='sm'
            color='subtle'
            className={styles.PricingCard__Description}
          >
            {description}
          </Text>
        </div>
      </div>

      {toggleSlot || <div className={styles.PricingCard__ToggleSpacer} />}

      <div className={styles.PricingCard__Price}>
        <div className={styles.PricingCard__PriceLeft}>
          <span className={styles.PricingCard__PriceValue}>
            {price}
          </span>
          {billing && (
            <span className={styles.PricingCard__PricePeriod}>
              {billing}
            </span>
          )}
          {period && !billing && (
            <span className={styles.PricingCard__PricePeriod}>
              / {period}
            </span>
          )}
          {showAnnualPrice && annualPrice && (
            <span className={styles.PricingCard__PriceAnnual}>
              <span className={styles.PricingCard__PriceAnnualValue}>${annualPrice}</span> / year
            </span>
          )}
        </div>
      </div>

      {creditsSlot}
    </div>

    <div className={styles.PricingCard__Features}>
      {features.map((feature, i) => (
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
      {prorationNote && isPro && isUpgradeMode && upgradeState === 'ready' && (
        <div className={styles.PricingCard__ProrationNote}>
          {prorationNote}
        </div>
      )}

      {upgradeError && isPro && (
        <div className={styles.PricingCard__Error}>{upgradeError}</div>
      )}

      <Button
        variant={isPro ? 'primary' : 'black'}
        onClick={onButtonClick}
        disabled={isButtonDisabled}
        isLoading={isLoading}
      >
        {!isPro && <AppleIcon />}
        {buttonText}
      </Button>
      <Text
        as='p'
        size='sm'
        color='subtle'
        className={styles.PricingCard__ButtonHint}
      >
        {buttonHint}
      </Text>
    </div>
  </motion.div>
));

PricingCard.displayName = 'PricingCard';
