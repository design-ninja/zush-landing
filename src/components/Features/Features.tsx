import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FolderSync, Sparkles, Sliders, History, Search, Tag, Folder, Plus, LucideIcon } from 'lucide-react';
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

const BentoCard = ({ title, description, icon: Icon, className, delay = 0, children }: BentoCardProps) => (
  <motion.div 
    className={`${styles.BentoCard} ${className || ''}`}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={styles.BentoCard__Content}>
      <div className={styles.BentoCard__Header}>
        <div className={styles.BentoCard__IconWrapper}>
          <Icon size={24} />
        </div>
        <Heading as="h3" className={styles.BentoCard__Title}>{title}</Heading>
      </div>
      <Text className={styles.BentoCard__Description} color="subtle">{description}</Text>
    </div>
    <div className={styles.BentoCard__Visual}>
      {children || <div className={styles.BentoCard__Placeholder} />}
    </div>
  </motion.div>
);

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="features" className={styles.Features} ref={containerRef}>
      <div className={styles.Features__Container}>
        <SectionHeader
            title={<>Everything you need to <span className={styles.Features__TitleAccent}>organize</span></>}
            description="Powerful features packed into a simple, elegant interface"
          />

        <div className={styles.BentoGrid}>
          {/* Row 1: 3 standard blocks */}
          {/* Item 1: AI Analysis */}
          <BentoCard 
            title="AI Analysis" 
            description="Advanced image recognition assigns meaningful, descriptive names to every file automatically."
            icon={Sparkles}
            delay={0.1}
          >
              <div className={styles.UI_Analysis}>
                <div className={styles.UI_Analysis__Preview}>
                   <img src="/images/features/sunset_thumb.png" alt="Sunset" />
                </div>
                <div className={styles.UI_Analysis__Content}>
                   <span className={styles.UI_Analysis__OldName}>Screenshot 2024-03-15 at 19.45.22.png</span>
                   <span className={styles.UI_Analysis__NewName}>Bali_Sunset_Beach.png</span>
                </div>
              </div>
          </BentoCard>

          {/* Item 2: Monitoring */}
          <BentoCard 
            title="Folders Monitoring" 
            description="Watch one or multiple folders. Zush runs in the background and processes new images instantly."
            icon={FolderSync}
            delay={0.2}
          >
             <div className={styles.UI_Monitoring}>
                <div className={styles.UI_Monitoring__List}>
                  <div className={styles.UI_Monitoring__Item}>
                    <div className={styles.UI_Monitoring__FolderInfo}>
                      <div className={styles.UI_Monitoring__Icon}><Folder size={16} /></div>
                      <span>~/Desktop</span>
                    </div>
                  </div>
                  <div className={styles.UI_Monitoring__Item}>
                    <div className={styles.UI_Monitoring__FolderInfo}>
                      <div className={styles.UI_Monitoring__Icon}><Folder size={16} /></div>
                      <span>~/Downloads</span>
                    </div>
                  </div>
                  <div className={styles.UI_Monitoring__Item}>
                    <div className={styles.UI_Monitoring__FolderInfo}>
                      <div className={styles.UI_Monitoring__Icon}><Folder size={16} /></div>
                      <span>~/Projects/Design/Assets</span>
                    </div>
                  </div>
                </div>
                <div className={styles.UI_Monitoring__Add}>
                  <Plus size={16} /> Add Folder
                </div>
             </div>
          </BentoCard>

          {/* Item 3: Smart Metadata */}
          <BentoCard 
            title="Smart Metadata" 
            description="Automatically add Finder tags and Spotlight comments."
            icon={Tag}
            delay={0.3}
          >
             <div className={styles.UI_Metadata}>
                <div className={styles.UI_Metadata__File}>
                  <div className={styles.UI_Metadata__Preview}>
                    <img src="/images/features/glitch_thumb.png" alt="Glitch Art" />
                  </div>
                  <div className={styles.UI_Metadata__FileInfo}>
                    <span className={styles.UI_Metadata__FileName}>Cyberpunk_Art.png</span>
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

          {/* Row 2: 3 standard blocks */}
          {/* Item 4: Custom Patterns */}
          <BentoCard 
            title="Custom Patterns" 
            description="Set your own file naming pattern with variables like {date}, {app}, or {content}."
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
                   Project_Zush_2024-03-20_Design.png
                </div>
             </div>
          </BentoCard>
          
           {/* Item 5: Spotlight Search */}
           <BentoCard 
            title="Spotlight Friendly" 
            description="Zush adds tags to every file. Just type 'cat' or 'receipt' in Spotlight to find your files instantly."
            icon={Search}
            delay={0.5}
          >
             <div className={styles.UI_Spotlight}>
                <div className={styles.UI_Spotlight__Bar}>
                   <Search size={16} style={{ opacity: 0.5 }} />
                   <span>red sports car|</span>
                </div>
                <div className={styles.UI_Spotlight__Result}>
                   <div className={styles.UI_Spotlight__ResultIcon}>
                      <img src="/images/features/car_thumb.png" alt="Car" />
                   </div>
                   <div className={styles.UI_Spotlight__ResultText}>
                      <span className={styles.UI_Spotlight__ResultName}>Ferrari_F40_Red.png</span>
                      <span className={styles.UI_Spotlight__ResultPath}>Reference Images</span>
                   </div>
                </div>
             </div>
          </BentoCard>

          {/* Item 6: History */}
          <BentoCard 
            title="Rename History" 
            description="Keep track of every change. Made a mistake? Rollback to the original filename with one click."
            icon={History}
            delay={0.6}
          >
             <div className={styles.UI_History}>
                <div className={styles.UI_History__Item}>
                   <div className={styles.UI_History__Icon}><History size={14} /></div>
                   <div className={styles.UI_History__Info}>
                      <span className={styles.UI_History__Action}>Renamed 2 files</span>
                      <span className={styles.UI_History__Time}>Just now</span>
                   </div>
                   <span className={styles.UI_History__Undo}>Undo</span>
                </div>
                <div className={`${styles.UI_History__Item} ${styles.UI_History__Item_faded}`}>
                   <div className={styles.UI_History__Icon}><History size={14} /></div>
                   <div className={styles.UI_History__Info}>
                      <span className={styles.UI_History__Action}>Renamed "Screenshot..."</span>
                      <span className={styles.UI_History__Time}>2m ago</span>
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
