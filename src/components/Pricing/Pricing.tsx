import { motion } from 'framer-motion';
import { 
  Infinity, 
  FolderPlus, 
  Zap, 
  FileCode,
  LucideIcon
} from 'lucide-react';
import Button from '../Button';
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

const Pricing = () => {
  const plans: Plan[] = [
    {
      name: "FREE",
      price: "$0",
      description: "Basic organization for casual users",
      features: [
        { title: "Limited Renames", desc: "Basic AI-powered renaming", icon: Infinity },
        { title: "Single Folder", desc: "Monitor one folder at a time", icon: FolderPlus },
        { title: "Manual Metadata", desc: "Add Finder tags manually", icon: Zap },
        { title: "Default Naming Pattern", desc: "Use standard naming variables", icon: FileCode },
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

  return (
    <section id="pricing" className={styles.Pricing}>
      <div className={styles.Pricing__Container}>
        <h2 className={styles.Pricing__Title}>
          Choose your <span className={styles.Pricing__TitleAccent}>Plan</span>
        </h2>
        <p className={styles.Pricing__Subtitle}>
          Start organizing for free or unlock the full power of AI with 🌟 PRO
        </p>

        <div className={styles.Pricing__Grid}>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${styles.PricingCard} ${plan.highlight ? styles.PricingCard_highlighted : ''}`}
            >
              
              <div className={styles.PricingCard__Header}>
                <h3 className={styles.PricingCard__Name}>{plan.name}</h3>
                <p className={styles.PricingCard__Description}>{plan.description}</p>
                <div className={styles.PricingCard__Price}>
                  <span className={styles.PricingCard__PriceValue}>{plan.price}</span>
                  <span className={styles.PricingCard__PricePeriod}>{plan.period}</span>
                </div>
              </div>

              <div className={styles.PricingCard__Features}>
                {plan.features.map((feature, i) => (
                  <div key={i} className={styles.PricingCard__Feature}>
                    <div className={styles.PricingCard__FeatureIcon}>
                      <feature.icon size={18} />
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
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <p className={styles.Pricing__Disclaimer}>
          Secure payment via Paddle. All local taxes included.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
