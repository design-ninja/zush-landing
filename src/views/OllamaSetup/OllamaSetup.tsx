import {
  Bot,
  Download,
  ExternalLink,
  Gauge,
  HelpCircle,
  RefreshCw,
  Shield,
} from 'lucide-react';
import Button from '@/components/Button';
import AppLink from '@/components/AppLink';
import BackToHome from '@/components/BackToHome';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './OllamaSetup.module.scss';

const recommendedModels = [
  {
    name: 'qwen2.5vl:3b',
    label: 'For speed',
    command: 'ollama pull qwen2.5vl:3b',
    description:
      'The fastest first choice for everyday screenshots and images. Use it when you want local processing to feel responsive on most Macs.',
    hardware: 'Most Apple Silicon Macs',
    speed: 'Fastest',
  },
  {
    name: 'gemma3:4b',
    label: 'For balance',
    command: 'ollama pull gemma3:4b',
    description:
      'A good default when you want better descriptions without jumping to a large model. Start here if speed and quality both matter.',
    hardware: '8 GB+ memory recommended',
    speed: 'Balanced',
  },
  {
    name: 'granite3.2-vision:2b',
    label: 'For documents',
    command: 'ollama pull granite3.2-vision:2b',
    description:
      'A compact vision model that is useful for document previews, scans, and structured visual content.',
    hardware: 'Most Apple Silicon Macs',
    speed: 'Fast',
  },
];

const OllamaSetup = () => {
  return (
    <section className={styles.OllamaSetup}>
      <div className={styles.OllamaSetup__Container}>
        <div className={styles.OllamaSetup__Hero}>
          <div className={styles.OllamaSetup__HeroIcon}>
            <Bot size={32} />
          </div>
          <Heading as='h1' align='center' className={styles.OllamaSetup__Title}>
            Ollama Setup Guide
          </Heading>
          <Text as='p' size='lg' color='subtle' align='center' className={styles.OllamaSetup__Subtitle}>
            Run Zush analysis locally on your Mac with Ollama. Your files are processed by a model on your computer instead of a cloud AI provider.
          </Text>
          <div className={styles.OllamaSetup__Actions}>
            <Button as='a' href='https://ollama.com/download' target='_blank' rel='noopener noreferrer' size='md'>
              Download Ollama <ExternalLink size={16} />
            </Button>
            <Button as='a' href='#recommended-models' variant='ghost' size='md'>
              Recommended models
            </Button>
          </div>
        </div>

        <div className={styles.OllamaSetup__Content}>
          <section className={styles.OllamaSetup__Section}>
            <div className={styles.OllamaSetup__SectionHeader}>
              <Shield size={24} />
              <Heading as='h2'>What Local Mode Means</Heading>
            </div>
            <Text as='p' color='subtle'>
              When Local (Ollama) is enabled in Zush, supported file analysis runs through your local Ollama server. Zush does not send analysis content to Zush cloud or third-party AI providers in this mode. You still control which model is installed, where Ollama stores it, and when Ollama is running.
            </Text>
          </section>

          <section className={styles.OllamaSetup__Section}>
            <div className={styles.OllamaSetup__SectionHeader}>
              <Download size={24} />
              <Heading as='h2'>Setup Steps</Heading>
            </div>

            <div className={styles.OllamaSetup__Steps}>
              <div className={styles.OllamaSetup__Step}>
                <div className={styles.OllamaSetup__StepNumber}>1</div>
                <div className={styles.OllamaSetup__StepContent}>
                  <Heading as='h3'>Install Ollama</Heading>
                  <Text as='p' color='subtle'>
                    Download Ollama for macOS from the official website, install it, and open the app once so the local server can start.
                  </Text>
                  <AppLink href='https://ollama.com/download' target='_blank' rel='noopener noreferrer'>
                    Open Ollama download page <ExternalLink size={14} />
                  </AppLink>
                </div>
              </div>

              <div className={styles.OllamaSetup__Step}>
                <div className={styles.OllamaSetup__StepNumber}>2</div>
                <div className={styles.OllamaSetup__StepContent}>
                  <Heading as='h3'>Download a vision model</Heading>
                  <Text as='p' color='subtle'>
                    Zush works best with a vision-capable model because many files are images, screenshots, PDFs, or visual previews. Start with:
                  </Text>
                  <pre className={styles.OllamaSetup__Code}><code>ollama pull qwen2.5vl:3b</code></pre>
                </div>
              </div>

              <div className={styles.OllamaSetup__Step}>
                <div className={styles.OllamaSetup__StepNumber}>3</div>
                <div className={styles.OllamaSetup__StepContent}>
                  <Heading as='h3'>Check that Ollama is running</Heading>
                  <Text as='p' color='subtle'>
                    Ollama usually runs in the background after you open it. If Zush cannot connect, start it from Terminal:
                  </Text>
                  <pre className={styles.OllamaSetup__Code}><code>ollama serve</code></pre>
                </div>
              </div>

              <div className={styles.OllamaSetup__Step}>
                <div className={styles.OllamaSetup__StepNumber}>4</div>
                <div className={styles.OllamaSetup__StepContent}>
                  <Heading as='h3'>Enable Local mode in Zush</Heading>
                  <Text as='p' color='subtle'>
                    Open Zush, go to AI Setup, turn on Local (Ollama), refresh the model list, select your model, and run Test.
                  </Text>
                </div>
              </div>
            </div>
          </section>

          <section id='recommended-models' className={styles.OllamaSetup__Section}>
            <div className={styles.OllamaSetup__SectionHeader}>
              <Gauge size={24} />
              <Heading as='h2'>Recommended Models</Heading>
            </div>
            <Text as='p' color='subtle' className={styles.OllamaSetup__SectionLead}>
              Pick a model based on the job: <strong>qwen2.5vl:3b</strong> for speed, <strong>gemma3:4b</strong> for balance, or <strong>granite3.2-vision:2b</strong> for documents.
            </Text>

            <div className={styles.OllamaSetup__ModelGrid}>
              {recommendedModels.map((model) => (
                <article className={styles.OllamaSetup__ModelCard} key={model.name}>
                  <div className={styles.OllamaSetup__ModelHeader}>
                    <Heading as='h3'>{model.name}</Heading>
                    <span>{model.label}</span>
                  </div>
                  <Text as='p' color='subtle'>{model.description}</Text>
                  <div className={styles.OllamaSetup__ModelMeta}>
                    <span>{model.hardware}</span>
                    <span>{model.speed}</span>
                  </div>
                  <pre className={styles.OllamaSetup__Command}><code>{model.command}</code></pre>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.OllamaSetup__Section}>
            <div className={styles.OllamaSetup__SectionHeader}>
              <RefreshCw size={24} />
              <Heading as='h2'>Troubleshooting</Heading>
            </div>

            <div className={styles.OllamaSetup__FAQ}>
              <div className={styles.OllamaSetup__FAQItem}>
                <Heading as='h3'>Zush does not see any models</Heading>
                <Text as='p' color='subtle'>
                  Run <code>ollama list</code> in Terminal. If the list is empty, pull a model first, then click refresh in Zush.
                </Text>
              </div>
              <div className={styles.OllamaSetup__FAQItem}>
                <Heading as='h3'>Connection test fails</Heading>
                <Text as='p' color='subtle'>
                  Make sure Ollama is running and the host is set to <code>http://127.0.0.1:11434</code> in Zush connection settings.
                </Text>
              </div>
              <div className={styles.OllamaSetup__FAQItem}>
                <Heading as='h3'>Processing is too slow</Heading>
                <Text as='p' color='subtle'>
                  Use a smaller model like <code>qwen2.5vl:3b</code>, close memory-heavy apps, or switch back to Cloud when you need faster batch processing.
                </Text>
              </div>
            </div>
          </section>

          <div className={styles.OllamaSetup__Note}>
            <HelpCircle size={20} />
            <Text as='p' size='sm' color='subtle'>
              Local mode is separate from Cloud and BYOK. Cloud uses Zush credits by default, BYOK uses your provider key, and Local uses Ollama on your Mac.
            </Text>
          </div>

          <div className={styles.OllamaSetup__Back}>
            <BackToHome />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OllamaSetup;
