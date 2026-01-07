import { motion } from 'framer-motion';
import { 
  Infinity, 
  FolderPlus, 
  Zap, 
  FileCode,
  Sparkles,
  Folder,
  Tag,
  FileText,
  LucideIcon
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';
import SectionHeader from '../SectionHeader';
import styles from './Pricing.module.scss';

// Paddle Sandbox Price ID
const PADDLE_PRICE_ID = import.meta.env.VITE_PADDLE_PRICE_ID;
const DOWNLOAD_URL = 'https://github.com/design-ninja/zush/releases/latest/download/Zush.dmg';

// Declare Paddle type for TypeScript
declare global {
  interface Window {
    Paddle?: {
      Checkout: {
        open: (options: { items: { priceId: string; quantity: number }[] }) => void;
      };
    };
  }
}

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

const Pricing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const deviceId = searchParams.get('device_id');

  const plans: Plan[] = [
    {
      name: "FREE",
      price: "$0",
      description: "Basic organization for casual users",
      features: [
        { title: "Limited Renames", desc: "Basic AI-powered renaming", icon: Sparkles },
        { title: "Single Folder", desc: "Monitor one folder at a time", icon: Folder },
        { title: "Manual Metadata", desc: "Add Finder tags manually", icon: Tag },
        { title: "Default Naming Pattern", desc: "Use standard naming variables", icon: FileText },
      ],
      buttonText: "Download Free",
      isPro: false
    },
    {
      name: "🌟 PRO",
      price: "$9.99",
      period: "lifetime",
      description: "Powerful AI features for power users",
      features: [
        { title: "Unlimited Renames", desc: "No monthly limit on AI-powered renames", icon: Infinity },
        { title: "Multiple Folders", desc: "Monitor unlimited folders simultaneously", icon: FolderPlus },
        { title: "Smart Metadata", desc: "Automatically add Finder tags and Spotlight comments", icon: Zap },
        { title: "Custom Naming Pattern", desc: "Create your own file naming pattern with variables", icon: FileCode }
      ],
      buttonText: "Buy PRO Now 🌟",
      isPro: true,
      highlight: true
    }
  ];

  const handleButtonClick = (isPro: boolean) => {
    if (isPro) {
      // Open Paddle checkout overlay
      if (window.Paddle) {
        const checkoutOptions: any = {
          items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
        };

        if (deviceId) {
          checkoutOptions.customData = {
            device_id: deviceId
          };
        }

        window.Paddle.Checkout.open(checkoutOptions);
      } else {
        console.error('Paddle.js not loaded');
      }
    } else {
      window.open(DOWNLOAD_URL, '_blank');
    }
  };

  return (
    <section id="pricing" className={styles.Pricing}>
      <div className={styles.Pricing__Container}>
        <SectionHeader
          title={<>Choose your <span className={styles.Pricing__TitleAccent}>Plan</span></>}
          description="Start organizing for free or unlock the full power of AI with 🌟 PRO"
        />

        <div className={styles.Pricing__Grid}>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${styles.PricingCard} ${plan.highlight ? styles.PricingCard_highlighted : ''}`}
              id={plan.isPro ? 'pro' : undefined}
            >
              
              <div className={styles.PricingCard__Header}>
                <Heading as="h3" className={styles.PricingCard__Name}>{plan.name}</Heading>
                <Text as="p" size="sm" color="subtle" className={styles.PricingCard__Description}>{plan.description}</Text>
                <div className={styles.PricingCard__Price}>
                  <span className={styles.PricingCard__PriceValue}>{plan.price}</span>
                  <span className={styles.PricingCard__PricePeriod}>{plan.period}</span>
                </div>
              </div>

              <div className={styles.PricingCard__Features}>
                {plan.features.map((feature, i) => (
                  <div key={i} className={styles.PricingCard__Feature}>
                    <div className={styles.PricingCard__FeatureIcon}>
                      <feature.icon size={22} />
                    </div>
                    <div>
                      <div className={styles.PricingCard__FeatureTitle}>{feature.title}</div>
                      <div className={styles.PricingCard__FeatureDesc}>{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.isPro ? 'primary' : 'black'}
                onClick={() => handleButtonClick(plan.isPro)}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <Text as="p" size="sm" color="subtle" align="center" className={styles.Pricing__Disclaimer}>
          Secure payment via Paddle. All local taxes included.
        </Text>
      </div>
    </section>
  );
};

export default Pricing;
