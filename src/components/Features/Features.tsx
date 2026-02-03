import { useRef } from 'react';
import { motion } from 'framer-motion';
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
  delay?: number;
  children?: React.ReactNode;
}

const BentoCard = ({
  title,
  description,
  icon: Icon,
  className,
  delay = 0,
  children,
}: BentoCardProps) => (
  <motion.div
    className={`${styles.BentoCard} ${className || ''}`}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={styles.BentoCard__Content}>
      <div className={styles.BentoCard__Header}>
        <div className={styles.BentoCard__IconWrapper}>
          <Icon size={24} />
        </div>
        <Heading as='h3' className={styles.BentoCard__Title}>
          {title}
        </Heading>
      </div>
      <Text className={styles.BentoCard__Description} color='subtle'>
        {description}
      </Text>
    </div>
    <div className={styles.BentoCard__Visual}>
      {children || <div className={styles.BentoCard__Placeholder} />}
    </div>
  </motion.div>
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
              What <span className={styles.Features__TitleAccent}>Zush</span>{' '}
              does
            </>
          }
          description='Powerful features packed into a simple, elegant interface'
        />

        <div className={styles.BentoGrid}>
          {/* Row 1: 3 standard blocks */}
          {/* Item 1: AI Analysis */}
          <BentoCard
            title='AI Analysis'
            description='Advanced image recognition assigns meaningful, descriptive names to every file automatically.'
            icon={Sparkles}
            delay={0.1}
          >
              <div className={styles.UI_Analysis}>
                <div className={styles.UI_Analysis__Preview}>
                <picture>
                  <source
                    srcSet='/images/features/sunset_thumb.webp'
                    type='image/webp'
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
            description='Watch one or multiple folders. Zush runs in the background and processes new images instantly.'
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
                      IMG_4829.jpg
                    </span>
                    <span className={styles.UI_Batch__NewName}>
                      → Golden Gate Bridge.jpg
                    </span>
                  </div>
                  <div className={styles.UI_Batch__Check}>
                    <Check size={14} />
                  </div>
                </div>
                <div className={styles.UI_Batch__Item}>
                  <div className={styles.UI_Batch__Names}>
                    <span className={styles.UI_Batch__OldName}>
                      Document_scan.pdf
                    </span>
                    <span
                      className={styles.UI_Batch__NewName}
                    >{`→ Invoice March ${currentYear}.pdf`}</span>
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
                      srcSet='/images/features/glitch_thumb.webp'
                      type='image/webp'
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
                  >{`Screenshot ${currentYear}-01-15.png`}</span>
                  <span className={styles.UI_History__NewName}>
                    → Dashboard UI.png
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
                    IMG_8842.heic
                  </span>
                  <span className={styles.UI_History__NewName}>
                    → Beach Sunset.heic
                  </span>
                </div>
                <div className={styles.UI_History__Meta}>
                  <span className={styles.UI_History__Time}>Today, 08:30</span>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
