import {
  Bot,
  Download,
  ExternalLink,
  Gauge,
  HelpCircle,
  RefreshCw,
  Shield,
} from 'lucide-react';
import type { ReactNode } from 'react';
import Button from '@/components/Button';
import AppLink from '@/components/AppLink';
import BackToHome from '@/components/BackToHome';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import styles from './OllamaSetup.module.scss';

interface RecommendedModel {
  name: string;
  label: string;
  command: string;
  description: string;
  hardware: string;
  speed: string;
}

export interface OllamaSetupCopy {
  title: string;
  subtitle: string;
  downloadOllama: string;
  recommendedModelsButton: string;
  offlineTitle: string;
  offlineBody: string;
  setupTitle: string;
  openDownloadPage: string;
  steps: readonly {
    title: string;
    body: string;
    command?: string;
  }[];
  recommendedTitle: string;
  recommendedLead: string;
  recommendedModels: RecommendedModel[];
  catalogPrefix: string;
  catalogLink: string;
  catalogSuffix: string;
  troubleshootingTitle: string;
  troubleshooting: readonly {
    title: string;
    body: ReactNode;
  }[];
  note: string;
  backToHomeLabel?: string;
  homeHref?: string;
}

const defaultRecommendedModels = [
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

const defaultOllamaSetupCopy: OllamaSetupCopy = {
  title: 'Ollama Setup Guide',
  subtitle:
    'Use Offline AI mode with private local models via Ollama. Your files are processed by a model on your device instead of a cloud AI provider.',
  downloadOllama: 'Download Ollama',
  recommendedModelsButton: 'Recommended models',
  offlineTitle: 'What Offline AI Mode Means',
  offlineBody:
    'When Offline AI mode is enabled in Zush, supported file analysis runs through your local Ollama server. Zush does not send analysis content to Zush cloud or third-party AI providers in this mode. You still control which model is installed, where Ollama stores it, and when Ollama is running.',
  setupTitle: 'Setup Steps',
  openDownloadPage: 'Open Ollama download page',
  steps: [
    {
      title: 'Install Ollama',
      body: 'Download Ollama for macOS from the official website, install it, and open the app once so the local server can start.',
    },
    {
      title: 'Download a vision model',
      body: 'Zush works best with a vision-capable model because many files are images, screenshots, PDFs, or visual previews. Start with:',
      command: 'ollama pull qwen2.5vl:3b',
    },
    {
      title: 'Check that Ollama is running',
      body: 'Ollama usually runs in the background after you open it. If Zush cannot connect, start it from Terminal:',
      command: 'ollama serve',
    },
    {
      title: 'Enable Offline AI mode in Zush',
      body: 'Open Zush, go to AI Setup, turn on Offline AI mode, refresh the model list, select your model, and run Test.',
    },
  ],
  recommendedTitle: 'Recommended Models',
  recommendedLead:
    'Pick a model based on the job: qwen2.5vl:3b for speed, gemma3:4b for balance, or granite3.2-vision:2b for documents.',
  recommendedModels: defaultRecommendedModels,
  catalogPrefix: 'Or choose another vision-capable model from the ',
  catalogLink: 'Ollama model catalog',
  catalogSuffix: '.',
  troubleshootingTitle: 'Troubleshooting',
  troubleshooting: [
    {
      title: 'Zush does not see any models',
      body: (
        <>
          Run <code>ollama list</code> in Terminal. If the list is empty, pull a model first, then click refresh in Zush.
        </>
      ),
    },
    {
      title: 'Connection test fails',
      body: (
        <>
          Make sure Ollama is running and the host is set to <code>http://127.0.0.1:11434</code> in Zush connection settings.
        </>
      ),
    },
    {
      title: 'Processing is too slow',
      body: (
        <>
          Use a smaller model like <code>qwen2.5vl:3b</code>, close memory-heavy apps, or switch back to Cloud when you need faster batch processing.
        </>
      ),
    },
  ],
  note:
    'Offline AI mode is separate from Cloud and BYOK. Cloud uses Zush credits by default, BYOK uses your provider key for cloud renames, and Offline AI mode uses Ollama on your device.',
};

interface OllamaSetupProps {
  copy?: OllamaSetupCopy;
}

const OllamaSetup = ({ copy = defaultOllamaSetupCopy }: OllamaSetupProps) => {
  return (
    <section className={styles.OllamaSetup}>
      <div className={styles.OllamaSetup__Container}>
        <div className={styles.OllamaSetup__Hero}>
          <div className={styles.OllamaSetup__HeroIcon}>
            <Bot size={32} />
          </div>
          <Heading as='h1' align='center' className={styles.OllamaSetup__Title}>
            {copy.title}
          </Heading>
          <Text as='p' size='lg' color='subtle' align='center' className={styles.OllamaSetup__Subtitle}>
            {copy.subtitle}
          </Text>
          <div className={styles.OllamaSetup__Actions}>
            <Button as='a' href='https://ollama.com/download' target='_blank' rel='noopener noreferrer' size='md'>
              {copy.downloadOllama} <ExternalLink size={16} />
            </Button>
            <Button as='a' href='#recommended-models' variant='ghost' size='md'>
              {copy.recommendedModelsButton}
            </Button>
          </div>
        </div>

        <div className={styles.OllamaSetup__Content}>
          <section className={styles.OllamaSetup__Section}>
            <div className={styles.OllamaSetup__SectionHeader}>
              <Shield size={24} />
              <Heading as='h2'>{copy.offlineTitle}</Heading>
            </div>
            <Text as='p' color='subtle'>
              {copy.offlineBody}
            </Text>
          </section>

          <section className={styles.OllamaSetup__Section}>
            <div className={styles.OllamaSetup__SectionHeader}>
              <Download size={24} />
              <Heading as='h2'>{copy.setupTitle}</Heading>
            </div>

            <div className={styles.OllamaSetup__Steps}>
              {copy.steps.map((step, index) => (
                <div className={styles.OllamaSetup__Step} key={step.title}>
                  <div className={styles.OllamaSetup__StepNumber}>{index + 1}</div>
                  <div className={styles.OllamaSetup__StepContent}>
                    <Heading as='h3'>{step.title}</Heading>
                    <Text as='p' color='subtle'>{step.body}</Text>
                    {index === 0 && (
                      <AppLink href='https://ollama.com/download' target='_blank' rel='noopener noreferrer'>
                        {copy.openDownloadPage} <ExternalLink size={14} />
                      </AppLink>
                    )}
                    {step.command && <pre className={styles.OllamaSetup__Code}><code>{step.command}</code></pre>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id='recommended-models' className={styles.OllamaSetup__Section}>
            <div className={styles.OllamaSetup__SectionHeader}>
              <Gauge size={24} />
              <Heading as='h2'>{copy.recommendedTitle}</Heading>
            </div>
            <Text as='p' color='subtle' className={styles.OllamaSetup__SectionLead}>
              {copy.recommendedLead}
            </Text>

            <div className={styles.OllamaSetup__ModelGrid}>
              {copy.recommendedModels.map((model) => (
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

            <Text as='p' color='subtle' className={styles.OllamaSetup__CatalogNote}>
              {copy.catalogPrefix}
              <AppLink
                href='https://ollama.com/search?c=vision'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.OllamaSetup__CatalogLink}
              >
                {copy.catalogLink} <ExternalLink size={14} />
              </AppLink>
              {copy.catalogSuffix}
            </Text>
          </section>

          <section className={styles.OllamaSetup__Section}>
            <div className={styles.OllamaSetup__SectionHeader}>
              <RefreshCw size={24} />
              <Heading as='h2'>{copy.troubleshootingTitle}</Heading>
            </div>

            <div className={styles.OllamaSetup__FAQ}>
              {copy.troubleshooting.map((item) => (
                <div className={styles.OllamaSetup__FAQItem} key={item.title}>
                  <Heading as='h3'>{item.title}</Heading>
                  <Text as='p' color='subtle'>{item.body}</Text>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.OllamaSetup__Note}>
            <HelpCircle size={20} />
            <Text as='p' size='sm' color='subtle'>
              {copy.note}
            </Text>
          </div>

          <div className={styles.OllamaSetup__Back}>
            <BackToHome href={copy.homeHref} label={copy.backToHomeLabel} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OllamaSetup;
