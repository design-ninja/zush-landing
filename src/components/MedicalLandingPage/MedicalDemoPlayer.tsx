import HoverPlayer from '@/components/Features/HoverPlayer';
import {
  MedicalRecordsAnimation,
  MEDICAL_RECORDS_DURATION,
  MEDICAL_RECORDS_FPS,
  MEDICAL_RECORDS_HEIGHT,
  MEDICAL_RECORDS_WIDTH,
} from './MedicalRecordsAnimation';

// Exactly the homepage feature-demo mechanism: HoverPlayer rests on the final
// frame (all records renamed) and replays once on hover / focus / click of its
// `[data-bento-card]` ancestor — no loop, no replay button. The card wrapper
// carrying `data-bento-card` is the page's Showcase stage.
const MedicalDemoPlayer = () => (
  <HoverPlayer
    component={MedicalRecordsAnimation}
    durationInFrames={MEDICAL_RECORDS_DURATION}
    fps={MEDICAL_RECORDS_FPS}
    width={MEDICAL_RECORDS_WIDTH}
    height={MEDICAL_RECORDS_HEIGHT}
  />
);

export default MedicalDemoPlayer;
