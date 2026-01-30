import { Key, ExternalLink, Shield, HelpCircle, Infinity } from 'lucide-react';
import Button from '@/components/Button';
import BackToHome from '@/components/BackToHome';
import PageLayout from '@/components/PageLayout';
import PageIcon from '@/components/PageIcon';
import styles from './BYOKSetup.module.scss';

const BYOKSetup = () => {
  return (
    <PageLayout maxWidth="lg">
      <PageIcon>
        <Key size={64} />
      </PageIcon>

      <h1 className={styles.BYOKSetup__Title}>
        BYOK Setup Guide
      </h1>

      <p className={styles.BYOKSetup__Subtitle}>
        Bring Your Own Key for unlimited AI-powered image processing
      </p>

      {/* What is BYOK */}
      <section className={styles.BYOKSetup__Section}>
        <div className={styles.BYOKSetup__SectionHeader}>
          <Infinity size={24} />
          <h2>What is BYOK?</h2>
        </div>
        <p>
          BYOK (Bring Your Own Key) allows Zush PRO users to use their own AI provider API keys
          for unlimited image processing. Instead of using Zush's AI credits, your images are
          analyzed directly using your Gemini or Groq API key.
        </p>
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
      </section>

      {/* Gemini Setup */}
      <section className={styles.BYOKSetup__Section}>
        <div className={styles.BYOKSetup__SectionHeader}>
          <img src="/gemini-icon.svg" alt="Gemini" className={styles.BYOKSetup__ProviderIcon} />
          <h2>Option 1: Gemini API (Google)</h2>
        </div>

        <div className={styles.BYOKSetup__Steps}>
          <div className={styles.BYOKSetup__Step}>
            <div className={styles.BYOKSetup__StepNumber}>1</div>
            <div className={styles.BYOKSetup__StepContent}>
              <h3>Get your API key</h3>
              <p>Visit Google AI Studio and create a free API key</p>
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
              <h3>Copy your API key</h3>
              <p>Click "Create API key" and copy the generated key (starts with "AIza...")</p>
            </div>
          </div>

          <div className={styles.BYOKSetup__Step}>
            <div className={styles.BYOKSetup__StepNumber}>3</div>
            <div className={styles.BYOKSetup__StepContent}>
              <h3>Configure in Zush</h3>
              <p>Open Zush → Settings → Preferences → BYOK section</p>
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
          Perfect for most users. <a href="https://ai.google.dev/pricing" target="_blank" rel="noopener noreferrer">View pricing →</a>
        </div>
      </section>

      {/* Groq Setup */}
      <section className={styles.BYOKSetup__Section}>
        <div className={styles.BYOKSetup__SectionHeader}>
          <img src="/groq-icon.svg" alt="Groq" className={styles.BYOKSetup__ProviderIcon} />
          <h2>Option 2: Groq API</h2>
        </div>

        <div className={styles.BYOKSetup__Steps}>
          <div className={styles.BYOKSetup__Step}>
            <div className={styles.BYOKSetup__StepNumber}>1</div>
            <div className={styles.BYOKSetup__StepContent}>
              <h3>Get your API key</h3>
              <p>Visit Groq Console and create a free API key</p>
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
              <h3>Copy your API key</h3>
              <p>Click "Create API Key" and copy the generated key (starts with "gsk_...")</p>
            </div>
          </div>

          <div className={styles.BYOKSetup__Step}>
            <div className={styles.BYOKSetup__StepNumber}>3</div>
            <div className={styles.BYOKSetup__StepContent}>
              <h3>Configure in Zush</h3>
              <p>Open Zush → Settings → Preferences → BYOK section</p>
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
          <a href="https://groq.com/pricing/" target="_blank" rel="noopener noreferrer">View pricing →</a>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.BYOKSetup__Section}>
        <div className={styles.BYOKSetup__SectionHeader}>
          <HelpCircle size={24} />
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className={styles.BYOKSetup__FAQ}>
          <div className={styles.BYOKSetup__FAQItem}>
            <h3>Is my API key secure?</h3>
            <p>
              Yes. Your API key is stored locally on your Mac and never sent to Zush servers.
              All AI requests go directly from your computer to your chosen provider (Google or Groq).
            </p>
          </div>

          <div className={styles.BYOKSetup__FAQItem}>
            <h3>How much does it cost?</h3>
            <p>
              Both Gemini and Groq offer generous free tiers. For typical usage (100-500 images/month),
              costs are usually less than $1/month. Heavy users might pay $2-5/month. Much cheaper than
              our credit packs!
            </p>
          </div>

          <div className={styles.BYOKSetup__FAQItem}>
            <h3>Will I still have the 10,000 credits?</h3>
            <p>
              Yes! When BYOK is disabled, you can still use your 10,000 monthly credits.
              BYOK is optional and can be toggled on/off anytime.
            </p>
          </div>

          <div className={styles.BYOKSetup__FAQItem}>
            <h3>Which provider should I choose?</h3>
            <p>
              Both work great. Gemini is from Google and has excellent vision capabilities.
              Groq is known for very fast inference speeds. Try both and see which you prefer!
            </p>
          </div>

          <div className={styles.BYOKSetup__FAQItem}>
            <h3>Do I need to be a PRO user?</h3>
            <p>
              Yes, BYOK is a PRO-exclusive feature. Free users can upgrade to PRO for a one-time
              payment of $10.
            </p>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className={styles.BYOKSetup__Section}>
        <div className={styles.BYOKSetup__SecurityNotice}>
          <Shield size={24} />
          <div>
            <h3>Security & Privacy</h3>
            <p>
              Your API keys are stored securely in your Mac's Keychain. Zush never has access to
              your keys or your image data when using BYOK. All processing happens directly between
              your Mac and your chosen AI provider.
            </p>
          </div>
        </div>
      </section>

      <BackToHome />
    </PageLayout>
  );
};

export default BYOKSetup;
