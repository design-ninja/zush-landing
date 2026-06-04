import HoverPlayer from './HoverPlayer';
import {
  FoldersMonitoringAnimation,
  FOLDERS_MONITORING_DURATION,
  FOLDERS_MONITORING_FPS,
  FOLDERS_MONITORING_WIDTH,
  FOLDERS_MONITORING_HEIGHT,
} from './FoldersMonitoringAnimation';
import {
  SmartMetadataAnimation,
  SMART_METADATA_DURATION,
  SMART_METADATA_FPS,
  SMART_METADATA_WIDTH,
  SMART_METADATA_HEIGHT,
} from './SmartMetadataAnimation';
import {
  RenameHistoryAnimation,
  RENAME_HISTORY_DURATION,
  RENAME_HISTORY_FPS,
  RENAME_HISTORY_WIDTH,
  RENAME_HISTORY_HEIGHT,
} from './RenameHistoryAnimation';
import {
  TemplatesAnimation,
  TEMPLATES_DURATION,
  TEMPLATES_FPS,
  TEMPLATES_WIDTH,
  TEMPLATES_HEIGHT,
} from './TemplatesAnimation';
import {
  NamingBlocksAnimation,
  NAMING_BLOCKS_DURATION,
  NAMING_BLOCKS_FPS,
  NAMING_BLOCKS_WIDTH,
  NAMING_BLOCKS_HEIGHT,
  NAMING_BLOCKS_PREVIEW_FRAME,
} from './NamingBlocksAnimation';
import {
  CustomPromptsAnimation,
  CUSTOM_PROMPTS_DURATION,
  CUSTOM_PROMPTS_FPS,
  CUSTOM_PROMPTS_WIDTH,
  CUSTOM_PROMPTS_HEIGHT,
} from './CustomPromptsAnimation';
import {
  ByokAnimation,
  BYOK_DURATION,
  BYOK_FPS,
  BYOK_WIDTH,
  BYOK_HEIGHT,
} from './ByokAnimation';
import {
  OfflineAiAnimation,
  OFFLINE_AI_DURATION,
  OFFLINE_AI_FPS,
  OFFLINE_AI_WIDTH,
  OFFLINE_AI_HEIGHT,
} from './OfflineAiAnimation';

type FeatureAnimationKind =
  | 'folders'
  | 'metadata'
  | 'history'
  | 'templates'
  | 'naming-blocks'
  | 'prompts'
  | 'byok'
  | 'offline-ai';

interface FeatureAnimationProps {
  kind: FeatureAnimationKind;
}

const CONFIG = {
  folders: {
    component: FoldersMonitoringAnimation,
    duration: FOLDERS_MONITORING_DURATION,
    fps: FOLDERS_MONITORING_FPS,
    width: FOLDERS_MONITORING_WIDTH,
    height: FOLDERS_MONITORING_HEIGHT,
  },
  metadata: {
    component: SmartMetadataAnimation,
    duration: SMART_METADATA_DURATION,
    fps: SMART_METADATA_FPS,
    width: SMART_METADATA_WIDTH,
    height: SMART_METADATA_HEIGHT,
  },
  history: {
    component: RenameHistoryAnimation,
    duration: RENAME_HISTORY_DURATION,
    fps: RENAME_HISTORY_FPS,
    width: RENAME_HISTORY_WIDTH,
    height: RENAME_HISTORY_HEIGHT,
  },
  templates: {
    component: TemplatesAnimation,
    duration: TEMPLATES_DURATION,
    fps: TEMPLATES_FPS,
    width: TEMPLATES_WIDTH,
    height: TEMPLATES_HEIGHT,
  },
  'naming-blocks': {
    component: NamingBlocksAnimation,
    duration: NAMING_BLOCKS_DURATION,
    fps: NAMING_BLOCKS_FPS,
    width: NAMING_BLOCKS_WIDTH,
    height: NAMING_BLOCKS_HEIGHT,
    previewFrame: NAMING_BLOCKS_PREVIEW_FRAME,
  },
  prompts: {
    component: CustomPromptsAnimation,
    duration: CUSTOM_PROMPTS_DURATION,
    fps: CUSTOM_PROMPTS_FPS,
    width: CUSTOM_PROMPTS_WIDTH,
    height: CUSTOM_PROMPTS_HEIGHT,
  },
  byok: {
    component: ByokAnimation,
    duration: BYOK_DURATION,
    fps: BYOK_FPS,
    width: BYOK_WIDTH,
    height: BYOK_HEIGHT,
  },
  'offline-ai': {
    component: OfflineAiAnimation,
    duration: OFFLINE_AI_DURATION,
    fps: OFFLINE_AI_FPS,
    width: OFFLINE_AI_WIDTH,
    height: OFFLINE_AI_HEIGHT,
  },
} as const;

const FeatureAnimation = ({ kind }: FeatureAnimationProps) => {
  const config = CONFIG[kind];
  return (
    <HoverPlayer
      component={config.component}
      durationInFrames={config.duration}
      fps={config.fps}
      width={config.width}
      height={config.height}
      previewFrame={'previewFrame' in config ? config.previewFrame : undefined}
    />
  );
};

export default FeatureAnimation;
