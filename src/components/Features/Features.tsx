import { useRef } from 'react';
import {
  FolderSync,
  Sparkles,
  Sliders,
  History,
  Tag,
  Folder,
  Plus,
  Layers,
  Check,
  MessageSquareText,
  KeyRound,
  LucideIcon,
} from 'lucide-react';
import Heading from '../Heading';
import Text from '../Text';
import SectionHeader from '../SectionHeader';
import styles from './Features.module.scss';

interface BentoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  badge?: string;
  delay?: number;
  children?: React.ReactNode;
}

const BentoCard = ({
  title,
  description,
  icon: Icon,
  className,
  badge,
  delay = 0,
  children,
}: BentoCardProps) => (
  <div
    className={`${styles.BentoCard} ${className || ''}`}
    style={{ transitionDelay: `${delay}s` }}
  >
    <div className={styles.BentoCard__Content}>
      <div className={styles.BentoCard__Header}>
        <div className={styles.BentoCard__IconWrapper}>
          <Icon size={24} />
        </div>
        <div className={styles.BentoCard__TitleRow}>
          <Heading as='h3' className={styles.BentoCard__Title}>
            {title}
          </Heading>
          {badge && <span className={styles.BentoCard__Badge}>{badge}</span>}
        </div>
      </div>
      <Text className={styles.BentoCard__Description} color='subtle'>
        {description}
      </Text>
    </div>
    <div className={styles.BentoCard__Visual}>
      {children || <div className={styles.BentoCard__Placeholder} />}
    </div>
  </div>
);

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  return (
    <section id='features' className={styles.Features} ref={containerRef}>
      <div className={styles.Features__Container}>
        <SectionHeader
          title={
            <>
              How <span className={styles.Features__TitleAccent}>Zush</span> AI{' '}
              Renames Your Files
            </>
          }
          description='Powerful features packed into a simple, elegant interface'
        />

        <div className={styles.BentoGrid}>
          {/* Row 1: 3 standard blocks */}
          {/* Item 1: AI Analysis */}
          <BentoCard
            title='AI Analysis'
            description='Advanced AI analyzes images and supported documents, including PDFs, to generate meaningful, descriptive filenames automatically.'
            icon={Sparkles}
            delay={0.1}
          >
              <div className={styles.UI_Analysis}>
                <div className={styles.UI_Analysis__Preview}>
                <picture>
                  <source
                    srcSet='/images/features/sunset_thumb-64.webp 64w, /images/features/sunset_thumb-128.webp 128w'
                    type='image/webp'
                    sizes='64px'
                  />
                  <img
                    src='/images/features/sunset_thumb.png'
                    alt='Sunset'
                    width={64}
                    height={64}
                    loading='lazy'
                    decoding='async'
                  />
                </picture>
                </div>
                <div className={styles.UI_Analysis__Content}>
                <span
                  className={styles.UI_Analysis__OldName}
                >{`Screenshot ${currentYear}-03-15 at 19.45.22.png`}</span>
                <span className={styles.UI_Analysis__NewName}>
                  Bali_Sunset_Beach.png
                </span>
              </div>
            </div>
          </BentoCard>

          {/* Item 2: Monitoring */}
          <BentoCard
            title='Folders Monitoring'
            description='Watch one or multiple folders. Zush runs in the background and processes new files automatically.'
            icon={FolderSync}
            delay={0.2}
          >
            <div className={styles.UI_Monitoring}>
              <div className={styles.UI_Monitoring__List}>
                <div className={styles.UI_Monitoring__Item}>
                  <div className={styles.UI_Monitoring__FolderInfo}>
                    <div className={styles.UI_Monitoring__Icon}>
                      <Folder size={16} />
                    </div>
                    <span>~/Desktop</span>
                  </div>
                </div>
                <div className={styles.UI_Monitoring__Item}>
                  <div className={styles.UI_Monitoring__FolderInfo}>
                    <div className={styles.UI_Monitoring__Icon}>
                      <Folder size={16} />
                    </div>
                    <span>~/Projects/Design/Assets</span>
                  </div>
                </div>
              </div>
              <div className={styles.UI_Monitoring__Add}>
                <Plus size={16} /> Add Folder
              </div>
            </div>
          </BentoCard>

          {/* Item 3: Batch Rename */}
          <BentoCard
            title='Batch Rename'
            description='Drag and drop multiple files at once. Zush will analyze and rename them all in seconds.'
            icon={Layers}
            delay={0.3}
          >
            <div className={styles.UI_Batch}>
              <div className={styles.UI_Batch__List}>
                <div className={styles.UI_Batch__Item}>
                  <div className={styles.UI_Batch__Names}>
                    <span
                      className={styles.UI_Batch__OldName}
                    >{`Screenshot ${currentYear}-02-21.png`}</span>
                    <span className={styles.UI_Batch__NewName}>
                      → Kanban Board UI.png
                    </span>
                  </div>
                  <div className={styles.UI_Batch__Check}>
                    <Check size={14} />
                  </div>
                </div>
                <div className={styles.UI_Batch__Item}>
                  <div className={styles.UI_Batch__Names}>
                    <span className={styles.UI_Batch__OldName}>
                      notes-final-v3.docx
                    </span>
                    <span className={styles.UI_Batch__NewName}>
                      → Hiring Plan Notes.docx
                    </span>
                  </div>
                  <div className={styles.UI_Batch__Check}>
                    <Check size={14} />
                  </div>
                </div>
                <div className={styles.UI_Batch__Item}>
                  <div className={styles.UI_Batch__Names}>
                    <span className={styles.UI_Batch__OldName}>
                      investor-update-final.pptx
                    </span>
                    <span
                      className={styles.UI_Batch__NewName}
                    >{`→ Investor Update Deck.pptx`}</span>
                  </div>
                  <div className={styles.UI_Batch__Check}>
                    <Check size={14} />
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Row 2: 3 standard blocks */}
          {/* Item 4: Custom Patterns */}
          <BentoCard
            title='Custom Patterns'
            description='Set your own file naming pattern with variables like {title}, {original}, {date}, {time}, or {category}.'
            icon={Sliders}
            delay={0.4}
          >
            <div className={styles.UI_Patterns}>
              <div className={styles.UI_Patterns__Input}>
                <span className={styles.UI_Patterns__Var}>{`{Title}`}</span>
                <span className={styles.UI_Patterns__Sep}>_</span>
                <span className={styles.UI_Patterns__Var}>{`{Date}`}</span>
                <span className={styles.UI_Patterns__Sep}>_</span>
                <span className={styles.UI_Patterns__Var}>{`{Category}`}</span>
              </div>
              <div className={styles.UI_Patterns__Preview}>
                {`Project_Zush_${currentYear}-03-20_Design.png`}
              </div>
            </div>
          </BentoCard>

          {/* Item 5: Smart Metadata */}
          <BentoCard
            title='Smart Metadata'
            description='Automatically add Finder tags and Spotlight metadata. Find files instantly with natural search queries.'
            icon={Tag}
            delay={0.5}
          >
              <div className={styles.UI_Metadata}>
              <div className={styles.UI_Metadata__File}>
                  <div className={styles.UI_Metadata__Preview}>
                  <picture>
                    <source
                      srcSet='/images/features/glitch_thumb-64.webp 64w, /images/features/glitch_thumb-128.webp 128w'
                      type='image/webp'
                      sizes='64px'
                    />
                    <img
                      src='/images/features/glitch_thumb.png'
                      alt='Glitch Art'
                      width={64}
                      height={64}
                      loading='lazy'
                      decoding='async'
                    />
                  </picture>
                  </div>
                  <div className={styles.UI_Metadata__FileInfo}>
                  <span className={styles.UI_Metadata__FileName}>
                    Cyberpunk_Art.png
                  </span>
                  <span className={styles.UI_Metadata__FileMeta}>4.2 MB</span>
                </div>
              </div>
              <div className={styles.UI_Metadata__Tags}>
                <span>glitch art</span>
                <span>vaporwave</span>
                <span>statue</span>
                <span>cyberpunk</span>
                <span>digital art</span>
                <span>palm tree</span>
              </div>
            </div>
          </BentoCard>

          {/* Item 6: History */}
          <BentoCard
            title='Rename History'
            description='Keep track of every change. Made a mistake? Rollback to the original filename with one click.'
            icon={History}
            delay={0.6}
          >
            <div className={styles.UI_History}>
              <div className={styles.UI_History__Item}>
                <div className={styles.UI_History__Names}>
                  <span
                    className={styles.UI_History__OldName}
                  >{`notes_FINAL_copy.docx`}</span>
                  <span className={styles.UI_History__NewName}>
                    → Dashboard Review Notes.docx
                  </span>
                </div>
                <div className={styles.UI_History__Meta}>
                  <span className={styles.UI_History__Time}>Today, 09:51</span>
                  <span className={styles.UI_History__Undo}>Undo</span>
                </div>
              </div>
              <div
                className={`${styles.UI_History__Item} ${styles.UI_History__Item_faded}`}
              >
                <div className={styles.UI_History__Names}>
                  <span className={styles.UI_History__OldName}>
                    q1_report_export.xlsx
                  </span>
                  <span className={styles.UI_History__NewName}>
                    → Q1 Revenue Report.xlsx
                  </span>
                </div>
                <div className={styles.UI_History__Meta}>
                  <span className={styles.UI_History__Time}>Today, 08:30</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Item 7: Custom AI Prompts (wide, 2 cols) */}
          <BentoCard
            title='Custom AI Prompts'
            description='Write your own rename and tagging instructions to guide AI output. Tune file names and metadata to match your style and workflow.'
            icon={MessageSquareText}
            className={styles['BentoCard--wide']}
            delay={0.7}
          >
            <div className={styles.UI_Prompts}>
              <div className={styles.UI_Prompts__Panel}>
                <div className={styles.UI_Prompts__Header}>
                  <span className={styles.UI_Prompts__Label}>Rename rules</span>
                  <span className={styles.UI_Prompts__Badge}>Custom</span>
                </div>
                <div className={styles.UI_Prompts__Editor}>
                  <span className={styles.UI_Prompts__Text}>
                    Keep names short, no more than 5 words, with the main subject first
                  </span>
                </div>
              </div>
              <div className={styles.UI_Prompts__Panel}>
                <div className={styles.UI_Prompts__Header}>
                  <span className={styles.UI_Prompts__Label}>Tagging rules</span>
                  <span className={styles.UI_Prompts__Badge_default}>Default</span>
                </div>
                <div className={styles.UI_Prompts__Editor}>
                  <span className={styles.UI_Prompts__Placeholder}>
                    Add your own tagging instructions...
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Item 8: BYOK */}
          <BentoCard
            title='Bring Your Own Key'
            description='Connect your own API key from Gemini, Groq, OpenAI, or Claude for unlimited processing.'
            icon={KeyRound}
            badge='PRO 🌟'
            delay={0.8}
          >
            <div className={styles.UI_BYOK}>
              <div className={styles.UI_BYOK__Input}>
                <span className={styles.UI_BYOK__Key}>API key connected</span>
                <div className={styles.UI_BYOK__Icon}>
                  <Check size={14} />
                </div>
              </div>
              <div className={styles.UI_BYOK__Providers}>
                <span>Gemini</span>
                <span>Groq</span>
                <span>OpenAI</span>
                <span>Claude</span>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
