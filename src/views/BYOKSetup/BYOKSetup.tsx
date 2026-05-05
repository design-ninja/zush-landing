import { Key, ExternalLink, Shield, HelpCircle, Infinity } from 'lucide-react';
import Button from '@/components/Button';
import AppLink from '@/components/AppLink';
import BackToHome from '@/components/BackToHome';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './BYOKSetup.module.scss';

export interface ProviderSetup {
  title: string;
  providerName: string;
  dashboardName: string;
  getKeyText: string;
  dashboardUrl: string;
  buttonLabel: string;
  copyInstruction: string;
  noteLabel: string;
  noteText: string;
  pricingUrl: string;
}

export interface BYOKSetupCopy {
  title: string;
  subtitle: string;
  whatTitle: string;
  whatBody: string;
  benefits: readonly (readonly [string, string])[];
  providers: ProviderSetup[];
  steps: {
    getKey: string;
    copyKey: string;
    configure: string;
    settingsPath: string;
    selectProvider: (providerName: string) => string;
    pasteKey: string;
    saveEnable: string;
    viewPricing: string;
  };
  faqTitle: string;
  faqs: readonly {
    question: string;
    answer: string;
  }[];
  securityTitle: string;
  securityBody: string;
  backToHomeLabel?: string;
  homeHref?: string;
}

const defaultBenefits = [
  ['∞', 'Unlimited cloud renames (no credit limits)'],
  ['💰', 'Pay only for what you use (API costs are very low)'],
  ['🔐', 'Your data never leaves your control'],
] as const;

const defaultProviders: ProviderSetup[] = [
  {
    title: 'Option 1: Gemini API (Google)',
    providerName: 'Gemini (Google)',
    dashboardName: 'Google AI Studio',
    getKeyText: 'Visit Google AI Studio and create a free API key',
    dashboardUrl: 'https://aistudio.google.com/app/apikey',
    buttonLabel: 'Open Google AI Studio',
    copyInstruction:
      'Click "Create API key" and copy the generated key from the provider dashboard',
    noteLabel: 'Free tier:',
    noteText: 'Gemini offers 15 requests per minute for free. Perfect for most users.',
    pricingUrl: 'https://ai.google.dev/pricing',
  },
  {
    title: 'Option 2: Groq API',
    providerName: 'Groq',
    dashboardName: 'Groq Console',
    getKeyText: 'Visit Groq Console and create a free API key',
    dashboardUrl: 'https://console.groq.com/keys',
    buttonLabel: 'Open Groq Console',
    copyInstruction:
      'Click "Create API Key" and copy the generated key from the provider dashboard',
    noteLabel: 'Free tier:',
    noteText: 'Groq offers generous free tier with high-speed inference.',
    pricingUrl: 'https://groq.com/pricing/',
  },
  {
    title: 'Option 3: OpenAI API',
    providerName: 'OpenAI',
    dashboardName: 'OpenAI Platform',
    getKeyText: 'Visit OpenAI Platform and create an API key',
    dashboardUrl: 'https://platform.openai.com/api-keys',
    buttonLabel: 'Open OpenAI Platform',
    copyInstruction:
      'Click "Create new secret key" and copy the generated key from the provider dashboard',
    noteLabel: 'Pricing:',
    noteText:
      'OpenAI uses pay-as-you-go pricing. Zush uses GPT-4o mini for fast and affordable file analysis.',
    pricingUrl: 'https://platform.openai.com/docs/pricing',
  },
  {
    title: 'Option 4: Claude API (Anthropic)',
    providerName: 'Claude',
    dashboardName: 'Anthropic Console',
    getKeyText: 'Visit Anthropic Console and create an API key',
    dashboardUrl: 'https://console.anthropic.com/settings/keys',
    buttonLabel: 'Open Anthropic Console',
    copyInstruction:
      'Click "Create Key" and copy the generated key from the provider dashboard',
    noteLabel: 'Pricing:',
    noteText:
      'Claude uses pay-as-you-go pricing. Zush uses Claude Haiku for fast and cost-effective file analysis.',
    pricingUrl: 'https://www.anthropic.com/pricing#702702',
  },
];

const defaultFaqs = [
  {
    question: 'Is my API key secure?',
    answer:
      'Yes. Your API key is stored locally in secure platform storage. It is sent only when a BYOK request is relayed through Zush backend infrastructure and forwarded to your chosen provider.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Gemini and Groq offer generous free tiers. OpenAI and Claude use pay-as-you-go pricing. For typical usage (100-500 files/month), costs are usually less than $1/month. Much cheaper than our credit packs!',
  },
  {
    question: 'Will I still have the 10,000 credits?',
    answer:
      'Yes! When BYOK is disabled, you can still use your remaining credits. BYOK is optional and can be toggled on/off anytime.',
  },
  {
    question: 'Which provider should I choose?',
    answer:
      'All four work great. Gemini (Google) has strong multimodal capabilities and a generous free tier. Groq is known for very fast inference speeds. OpenAI (GPT-4o mini) offers reliable, affordable results. Claude (Anthropic) provides high-quality file understanding. Try them and see which you prefer!',
  },
  {
    question: 'Do I need to be a PRO user?',
    answer:
      'Yes, BYOK is a PRO-exclusive feature. Free users can upgrade to PRO for a one-time payment of $10.',
  },
] as const;

const defaultBYOKSetupCopy: BYOKSetupCopy = {
  title: 'BYOK Setup Guide',
  subtitle: 'Bring Your Own Key for unlimited cloud renames',
  whatTitle: 'What is BYOK?',
  whatBody:
    "BYOK (Bring Your Own Key) allows Zush PRO users to use their own AI provider API keys for unlimited cloud renames. Instead of using Zush's AI credits, your files are analyzed using your own API key from Gemini, Groq, OpenAI, or Claude.",
  benefits: defaultBenefits,
  providers: defaultProviders,
  steps: {
    getKey: 'Get your API key',
    copyKey: 'Copy your API key',
    configure: 'Configure in Zush',
    settingsPath: 'Open Zush -> Settings -> Preferences -> BYOK section',
    selectProvider: (providerName) => `Select "${providerName}" as AI Provider`,
    pasteKey: 'Paste your API key',
    saveEnable: 'Click "Save" and enable BYOK',
    viewPricing: 'View pricing ->',
  },
  faqTitle: 'Frequently Asked Questions',
  faqs: defaultFaqs,
  securityTitle: 'Security & Privacy',
  securityBody:
    'Your API keys are stored locally in secure platform storage and used only for BYOK processing. In BYOK mode, analysis requests are still relayed through Zush backend infrastructure and then sent to your chosen AI provider using your API key. Zush does not store file content after processing as part of normal operation.',
};

const ProviderSetupSection = ({
  provider,
  steps,
}: {
  provider: ProviderSetup;
  steps: BYOKSetupCopy['steps'];
}) => (
  <div className={styles.BYOKSetup__Section}>
    <div className={styles.BYOKSetup__SectionHeader}>
      <Key size={24} />
      <Heading as='h2'>{provider.title}</Heading>
    </div>

    <div className={styles.BYOKSetup__Steps}>
      <div className={styles.BYOKSetup__Step}>
        <div className={styles.BYOKSetup__StepNumber}>1</div>
        <div className={styles.BYOKSetup__StepContent}>
          <Heading as='h3'>{steps.getKey}</Heading>
          <Text as='p'>{provider.getKeyText}</Text>
          <Button
            as="a"
            href={provider.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            {provider.buttonLabel}
            <ExternalLink size={16} />
          </Button>
        </div>
      </div>

      <div className={styles.BYOKSetup__Step}>
        <div className={styles.BYOKSetup__StepNumber}>2</div>
        <div className={styles.BYOKSetup__StepContent}>
          <Heading as='h3'>{steps.copyKey}</Heading>
          <Text as='p'>{provider.copyInstruction}</Text>
        </div>
      </div>

      <div className={styles.BYOKSetup__Step}>
        <div className={styles.BYOKSetup__StepNumber}>3</div>
        <div className={styles.BYOKSetup__StepContent}>
          <Heading as='h3'>{steps.configure}</Heading>
          <Text as='p'>{steps.settingsPath}</Text>
          <ul>
            <li>{steps.selectProvider(provider.providerName)}</li>
            <li>{steps.pasteKey}</li>
            <li>{steps.saveEnable}</li>
          </ul>
        </div>
      </div>
    </div>

    <div className={styles.BYOKSetup__Note}>
      <strong>{provider.noteLabel}</strong> {provider.noteText}{' '}
      <AppLink
        href={provider.pricingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {steps.viewPricing}
      </AppLink>
    </div>
  </div>
);

interface BYOKSetupProps {
  copy?: BYOKSetupCopy;
}

const BYOKSetup = ({ copy = defaultBYOKSetupCopy }: BYOKSetupProps) => {
  return (
    <section className={styles.BYOKSetup}>
      <div className={styles.BYOKSetup__Container}>
        <Heading as='h1' className={styles.BYOKSetup__Title}>
          {copy.title}
        </Heading>

        <Text as='p' className={styles.BYOKSetup__Subtitle} color='subtle'>
          {copy.subtitle}
        </Text>

        <div className={styles.BYOKSetup__Content}>
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <Infinity size={24} />
              <Heading as='h2'>{copy.whatTitle}</Heading>
            </div>
            <Text as='p'>
              {copy.whatBody}
            </Text>
            <div className={styles.BYOKSetup__Benefits}>
              {copy.benefits.map(([icon, label]) => (
                <div className={styles.BYOKSetup__Benefit} key={label}>
                  <span className={styles.BYOKSetup__BenefitIcon}>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {copy.providers.map((provider) => (
            <ProviderSetupSection key={provider.providerName} provider={provider} steps={copy.steps} />
          ))}

          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <HelpCircle size={24} />
              <Heading as='h2'>{copy.faqTitle}</Heading>
            </div>

            <div className={styles.BYOKSetup__FAQ}>
              {copy.faqs.map((faq) => (
                <div className={styles.BYOKSetup__FAQItem} key={faq.question}>
                  <Heading as='h3'>{faq.question}</Heading>
                  <Text as='p'>{faq.answer}</Text>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SecurityNotice}>
              <Shield size={24} />
              <div>
                <Heading as='h3'>{copy.securityTitle}</Heading>
                <Text as='p'>
                  {copy.securityBody}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <BackToHome
          className={styles.BYOKSetup__BackLink}
          href={copy.homeHref}
          label={copy.backToHomeLabel}
        />
      </div>
    </section>
  );
};

export default BYOKSetup;
