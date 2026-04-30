import { Key, ExternalLink, Shield, HelpCircle, Infinity } from 'lucide-react';
import Button from '@/components/Button';
import AppLink from '@/components/AppLink';
import BackToHome from '@/components/BackToHome';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './BYOKSetup.module.scss';

interface ProviderSetup {
  title: string;
  providerName: string;
  dashboardName: string;
  dashboardInstruction: string;
  dashboardUrl: string;
  buttonLabel: string;
  copyInstruction: string;
  noteLabel: string;
  noteText: string;
  pricingUrl: string;
}

const benefits = [
  ['∞', 'Unlimited cloud renames (no credit limits)'],
  ['💰', 'Pay only for what you use (API costs are very low)'],
  ['🔐', 'Your data never leaves your control'],
] as const;

const providers: ProviderSetup[] = [
  {
    title: 'Option 1: Gemini API (Google)',
    providerName: 'Gemini (Google)',
    dashboardName: 'Google AI Studio',
    dashboardInstruction: 'create a free API key',
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
    dashboardInstruction: 'create a free API key',
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
    dashboardInstruction: 'create an API key',
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
    dashboardInstruction: 'create an API key',
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

const faqs = [
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

const ProviderSetupSection = ({ provider }: { provider: ProviderSetup }) => (
  <div className={styles.BYOKSetup__Section}>
    <div className={styles.BYOKSetup__SectionHeader}>
      <Key size={24} />
      <Heading as='h2'>{provider.title}</Heading>
    </div>

    <div className={styles.BYOKSetup__Steps}>
      <div className={styles.BYOKSetup__Step}>
        <div className={styles.BYOKSetup__StepNumber}>1</div>
        <div className={styles.BYOKSetup__StepContent}>
          <Heading as='h3'>Get your API key</Heading>
          <Text as='p'>
            Visit {provider.dashboardName} and {provider.dashboardInstruction}
          </Text>
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
          <Heading as='h3'>Copy your API key</Heading>
          <Text as='p'>{provider.copyInstruction}</Text>
        </div>
      </div>

      <div className={styles.BYOKSetup__Step}>
        <div className={styles.BYOKSetup__StepNumber}>3</div>
        <div className={styles.BYOKSetup__StepContent}>
          <Heading as='h3'>Configure in Zush</Heading>
          <Text as='p'>Open Zush → Settings → Preferences → BYOK section</Text>
          <ul>
            <li>Select "{provider.providerName}" as AI Provider</li>
            <li>Paste your API key</li>
            <li>Click "Save" and enable BYOK</li>
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
        View pricing →
      </AppLink>
    </div>
  </div>
);

const BYOKSetup = () => {
  return (
    <section className={styles.BYOKSetup}>
      <div className={styles.BYOKSetup__Container}>
        <Heading as='h1' className={styles.BYOKSetup__Title}>
          BYOK Setup Guide
        </Heading>

        <Text as='p' className={styles.BYOKSetup__Subtitle} color='subtle'>
          Bring Your Own Key for unlimited cloud renames
        </Text>

        <div className={styles.BYOKSetup__Content}>
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <Infinity size={24} />
              <Heading as='h2'>What is BYOK?</Heading>
            </div>
            <Text as='p'>
              BYOK (Bring Your Own Key) allows Zush PRO users to use their own AI provider API keys
              for unlimited cloud renames. Instead of using Zush's AI credits, your files are
              analyzed using your own API key from Gemini, Groq, OpenAI, or Claude.
            </Text>
            <div className={styles.BYOKSetup__Benefits}>
              {benefits.map(([icon, label]) => (
                <div className={styles.BYOKSetup__Benefit} key={label}>
                  <span className={styles.BYOKSetup__BenefitIcon}>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {providers.map((provider) => (
            <ProviderSetupSection key={provider.providerName} provider={provider} />
          ))}

          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <HelpCircle size={24} />
              <Heading as='h2'>Frequently Asked Questions</Heading>
            </div>

            <div className={styles.BYOKSetup__FAQ}>
              {faqs.map((faq) => (
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
                <Heading as='h3'>Security & Privacy</Heading>
                <Text as='p'>
                  Your API keys are stored locally in secure platform storage and used
                  only for BYOK processing. In BYOK mode, analysis requests are still relayed through
                  Zush backend infrastructure and then sent to your chosen AI provider using your API
                  key. Zush does not store file content after processing as part of normal operation.
                </Text>
              </div>
            </div>
          </div>
        </div>

        <BackToHome className={styles.BYOKSetup__BackLink} />
      </div>
    </section>
  );
};

export default BYOKSetup;
