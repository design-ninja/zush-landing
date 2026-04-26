import { Key, ExternalLink, Shield, HelpCircle, Infinity } from 'lucide-react';
import Button from '@/components/Button';
import AppLink from '@/components/AppLink';
import BackToHome from '@/components/BackToHome';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './BYOKSetup.module.scss';

const BYOKSetup = () => {
  return (
    <section className={styles.BYOKSetup}>
      <div className={styles.BYOKSetup__Container}>
        <Heading as='h1' className={styles.BYOKSetup__Title}>
          BYOK Setup Guide
        </Heading>

        <Text as='p' className={styles.BYOKSetup__Subtitle} color='subtle'>
          Bring Your Own Key for unlimited AI-powered file processing
        </Text>

        <div className={styles.BYOKSetup__Content}>
          {/* What is BYOK */}
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <Infinity size={24} />
              <Heading as='h2'>What is BYOK?</Heading>
            </div>
            <Text as='p'>
              BYOK (Bring Your Own Key) allows Zush PRO users to use their own AI provider API keys
              for unlimited file processing. Instead of using Zush's AI credits, your files are
              analyzed using your own API key from Gemini, Groq, OpenAI, or Claude.
            </Text>
            <div className={styles.BYOKSetup__Benefits}>
              <div className={styles.BYOKSetup__Benefit}>
                <span className={styles.BYOKSetup__BenefitIcon}>∞</span>
                <span>Unlimited processing (no credit limits)</span>
              </div>
              <div className={styles.BYOKSetup__Benefit}>
                <span className={styles.BYOKSetup__BenefitIcon}>💰</span>
                <span>Pay only for what you use (API costs are very low)</span>
              </div>
              <div className={styles.BYOKSetup__Benefit}>
                <span className={styles.BYOKSetup__BenefitIcon}>🔐</span>
                <span>Your data never leaves your control</span>
              </div>
            </div>
          </div>

          {/* Gemini Setup */}
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <Key size={24} />
              <Heading as='h2'>Option 1: Gemini API (Google)</Heading>
            </div>

            <div className={styles.BYOKSetup__Steps}>
              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>1</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Get your API key</Heading>
                  <Text as='p'>Visit Google AI Studio and create a free API key</Text>
                  <Button
                    as="a"
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                  >
                    Open Google AI Studio
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>

              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>2</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Copy your API key</Heading>
                  <Text as='p'>Click "Create API key" and copy the generated key from the provider dashboard</Text>
                </div>
              </div>

              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>3</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Configure in Zush</Heading>
                  <Text as='p'>Open Zush → Settings → Preferences → BYOK section</Text>
                  <ul>
                    <li>Select "Gemini (Google)" as AI Provider</li>
                    <li>Paste your API key</li>
                    <li>Click "Save" and enable BYOK</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.BYOKSetup__Note}>
              <strong>Free tier:</strong> Gemini offers 15 requests per minute for free.
              Perfect for most users. <AppLink href="https://ai.google.dev/pricing" target="_blank" rel="noopener noreferrer">View pricing →</AppLink>
            </div>
          </div>

          {/* Groq Setup */}
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <Key size={24} />
              <Heading as='h2'>Option 2: Groq API</Heading>
            </div>

            <div className={styles.BYOKSetup__Steps}>
              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>1</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Get your API key</Heading>
                  <Text as='p'>Visit Groq Console and create a free API key</Text>
                  <Button
                    as="a"
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                  >
                    Open Groq Console
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>

              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>2</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Copy your API key</Heading>
                  <Text as='p'>Click "Create API Key" and copy the generated key from the provider dashboard</Text>
                </div>
              </div>

              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>3</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Configure in Zush</Heading>
                  <Text as='p'>Open Zush → Settings → Preferences → BYOK section</Text>
                  <ul>
                    <li>Select "Groq" as AI Provider</li>
                    <li>Paste your API key</li>
                    <li>Click "Save" and enable BYOK</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.BYOKSetup__Note}>
              <strong>Free tier:</strong> Groq offers generous free tier with high-speed inference.
              <AppLink href="https://groq.com/pricing/" target="_blank" rel="noopener noreferrer">View pricing →</AppLink>
            </div>
          </div>

          {/* OpenAI Setup */}
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <Key size={24} />
              <Heading as='h2'>Option 3: OpenAI API</Heading>
            </div>

            <div className={styles.BYOKSetup__Steps}>
              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>1</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Get your API key</Heading>
                  <Text as='p'>Visit OpenAI Platform and create an API key</Text>
                  <Button
                    as="a"
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                  >
                    Open OpenAI Platform
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>

              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>2</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Copy your API key</Heading>
                  <Text as='p'>Click "Create new secret key" and copy the generated key from the provider dashboard</Text>
                </div>
              </div>

              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>3</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Configure in Zush</Heading>
                  <Text as='p'>Open Zush → Settings → Preferences → BYOK section</Text>
                  <ul>
                    <li>Select "OpenAI" as AI Provider</li>
                    <li>Paste your API key</li>
                    <li>Click "Save" and enable BYOK</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.BYOKSetup__Note}>
              <strong>Pricing:</strong> OpenAI uses pay-as-you-go pricing. Zush uses GPT-4o mini for fast and affordable file analysis.
              <AppLink href="https://platform.openai.com/docs/pricing" target="_blank" rel="noopener noreferrer">View pricing →</AppLink>
            </div>
          </div>

          {/* Claude Setup */}
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <Key size={24} />
              <Heading as='h2'>Option 4: Claude API (Anthropic)</Heading>
            </div>

            <div className={styles.BYOKSetup__Steps}>
              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>1</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Get your API key</Heading>
                  <Text as='p'>Visit Anthropic Console and create an API key</Text>
                  <Button
                    as="a"
                    href="https://console.anthropic.com/settings/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                  >
                    Open Anthropic Console
                    <ExternalLink size={16} />
                  </Button>
                </div>
              </div>

              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>2</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Copy your API key</Heading>
                  <Text as='p'>Click "Create Key" and copy the generated key from the provider dashboard</Text>
                </div>
              </div>

              <div className={styles.BYOKSetup__Step}>
                <div className={styles.BYOKSetup__StepNumber}>3</div>
                <div className={styles.BYOKSetup__StepContent}>
                  <Heading as='h3'>Configure in Zush</Heading>
                  <Text as='p'>Open Zush → Settings → Preferences → BYOK section</Text>
                  <ul>
                    <li>Select "Claude" as AI Provider</li>
                    <li>Paste your API key</li>
                    <li>Click "Save" and enable BYOK</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.BYOKSetup__Note}>
              <strong>Pricing:</strong> Claude uses pay-as-you-go pricing. Zush uses Claude Haiku for fast and cost-effective file analysis.
              <AppLink href="https://www.anthropic.com/pricing#702702" target="_blank" rel="noopener noreferrer">View pricing →</AppLink>
            </div>
          </div>

          {/* FAQ */}
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SectionHeader}>
              <HelpCircle size={24} />
              <Heading as='h2'>Frequently Asked Questions</Heading>
            </div>

            <div className={styles.BYOKSetup__FAQ}>
              <div className={styles.BYOKSetup__FAQItem}>
                <Heading as='h3'>Is my API key secure?</Heading>
                <Text as='p'>
                  Yes. In current Mac builds, your API key is stored locally in macOS Keychain.
                  It is sent only when a BYOK request is relayed through Zush backend infrastructure
                  and forwarded to your chosen provider.
                </Text>
              </div>

              <div className={styles.BYOKSetup__FAQItem}>
                <Heading as='h3'>How much does it cost?</Heading>
                <Text as='p'>
                  Gemini and Groq offer generous free tiers. OpenAI and Claude use pay-as-you-go pricing.
                  For typical usage (100-500 files/month), costs are usually less than $1/month.
                  Much cheaper than our credit packs!
                </Text>
              </div>

              <div className={styles.BYOKSetup__FAQItem}>
                <Heading as='h3'>Will I still have the 10,000 credits?</Heading>
                <Text as='p'>
                  Yes! When BYOK is disabled, you can still use your remaining credits.
                  BYOK is optional and can be toggled on/off anytime.
                </Text>
              </div>

              <div className={styles.BYOKSetup__FAQItem}>
                <Heading as='h3'>Which provider should I choose?</Heading>
                <Text as='p'>
                  All four work great. Gemini (Google) has strong multimodal capabilities and a generous free tier.
                  Groq is known for very fast inference speeds. OpenAI (GPT-4o mini) offers reliable, affordable results.
                  Claude (Anthropic) provides high-quality file understanding. Try them and see which you prefer!
                </Text>
              </div>

              <div className={styles.BYOKSetup__FAQItem}>
                <Heading as='h3'>Do I need to be a PRO user?</Heading>
                <Text as='p'>
                  Yes, BYOK is a PRO-exclusive feature. Free users can upgrade to PRO for a one-time
                  payment of $10.
                </Text>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className={styles.BYOKSetup__Section}>
            <div className={styles.BYOKSetup__SecurityNotice}>
              <Shield size={24} />
              <div>
                <Heading as='h3'>Security & Privacy</Heading>
                <Text as='p'>
                  In current Mac builds, your API keys are stored locally in macOS Keychain and used
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
