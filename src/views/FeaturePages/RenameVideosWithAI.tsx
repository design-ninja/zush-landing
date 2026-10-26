import FeatureLandingPage from '@/components/FeatureLandingPage';
import { VIDEO_PREVIEW_IMAGES } from '@/data/videoPreviewImages';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Which video formats does Zush support?',
    answer:
      'Zush supports video on Mac and Windows, including MP4, MOV, QT, M4V, MPEG, MPG, M2V, 3GP, 3GPP, 3G2, 3GP2, DV, TS, MTS, M2TS, VOB, MKV, AVI, and WMV. It analyzes sampled frames and can read subtitles, including supported subtitle tracks inside MKV files.',
  },
  {
    question: 'What does Zush read inside a video?',
    answer:
      'Four kinds of evidence: sampled frames, readable subtitles including supported subtitle tracks inside MKV files, a speech excerpt from the first five minutes when the cloud route supports it and speech is detected, and video metadata. Long videos are named from that excerpt, so review the suggestion before applying it.',
  },
  {
    question: 'Does Zush upload the whole video file?',
    answer:
      'No. Zush prepares compact analysis context such as sampled frames, subtitles, a bounded speech excerpt, and file metadata instead of sending the original full video file as part of normal cloud processing.',
  },
  {
    question: 'Can Zush rename screen recordings?',
    answer:
      'Yes. Screen recordings are a strong fit because the visible UI, charts, documents, or subtitles often reveal what the clip is about.',
  },
  {
    question: 'Can I batch rename videos with photos and documents?',
    answer:
      'Yes. Zush can process mixed batches across supported images, audio, videos, PDFs, Office documents, text files, spreadsheets, subtitles, and more.',
  },
  {
    question: 'Can Zush rename audio-only files too?',
    answer:
      'Yes. Zush supports MP3, M4A, WAV, FLAC, OGG, WebM, and MPGA audio files, using embedded metadata, music recognition, and a speech excerpt from the first two minutes when transcription is needed.',
  },
];

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename Videos with AI',
    description:
      'Use Zush to automatically rename video files based on sampled frames, subtitle context, and visible content.',
    steps: [
      {
        name: 'Import your videos',
        text: 'Drag video files into Zush or select a folder. Zush supports video on Mac and Windows, including MP4, MOV, M4V, MPEG, MPG, 3GP, TS, MTS, M2TS, DV, VOB, MKV, AVI, and WMV.',
      },
      {
        name: 'AI analyzes sampled context',
        text: 'Zush samples video frames and can read subtitles, including supported subtitle tracks inside MKV files, plus a speech excerpt and video metadata, to generate a concise, descriptive filename.',
      },
      {
        name: 'Review and apply',
        text: 'Preview each suggested name, regenerate if needed, then apply the rename with full history for rollback.',
      },
    ],
  },
  faqItems,
  page: {
    pagePath: '/rename-videos-with-ai',
    description:
      'AI video renamer that turns generic screen recordings, clips, and camera files into searchable filenames using sampled frames, subtitles, speech, and metadata.',
    featureList: [
      'Rename MP4, MOV, M4V, MPEG, 3GP, TS, MTS, M2TS, DV, VOB, MKV, AVI, and WMV files',
      'Analyze sampled frames instead of relying only on filenames',
      'Read subtitles, including supported subtitle tracks inside MKV files',
      'Use a bounded speech excerpt and video metadata as naming evidence',
      'Batch rename videos alongside audio, images, and documents',
      'Custom naming patterns with dates and AI descriptions',
      'Full rename history with one-click revert',
    ],
  },
});

const RenameVideosWithAI = () => (
  <FeatureLandingPage
    h1="Rename Videos with AI"
    h1Accent="Rename Videos"
    category="video"
    definitionTitle="What Is AI Video Renaming?"
    definitionText="Rename videos with AI using Zush to replace generic screen recording, camera, and export filenames with searchable names based on sampled frames, visible context, subtitles including tracks inside MKV files, a speech excerpt, and video metadata. Zush renames files in place, with optional AI folder sorting."
    showcaseSlides={[
      {
        files: [
          { before: 'VID_20260507_184233.mp4', after: 'Dog Training Park Session.mp4', img: VIDEO_PREVIEW_IMAGES.dogTrainingParkSession, type: 'video' },
          { before: 'gallery_walk_042.mov', after: 'Museum Exhibit Walkthrough.mov', img: VIDEO_PREVIEW_IMAGES.museumExhibitWalkthrough, type: 'video' },
          { before: 'warmup_final_export.mp4', after: 'Fitness Class Warmup Clip.mp4', img: VIDEO_PREVIEW_IMAGES.fitnessClassWarmupClip, type: 'video' },
          { before: 'ceremony_cam_b.m4v', after: 'Wedding Ceremony Entrance.m4v', img: VIDEO_PREVIEW_IMAGES.weddingCeremonyEntrance, type: 'video' },
          { before: 'podcast_cut_001.ts', after: 'Podcast Studio Multicam Cut.ts', img: VIDEO_PREVIEW_IMAGES.podcastStudioMulticamCut, type: 'video' },
          { before: 'cafe_bts_07.mp4', after: 'Cafe Product Shoot Behind Scenes.mp4', img: VIDEO_PREVIEW_IMAGES.cafeProductShootBehindScenes, type: 'video' },
        ],
      },
      {
        files: [
          { before: 'unbox_take_03.mp4', after: 'Product Unboxing Tabletop Shot.mp4', img: VIDEO_PREVIEW_IMAGES.productUnboxingTabletopShot, type: 'video' },
          { before: 'lecture_recording_12.mov', after: 'Classroom Whiteboard Lecture.mov', img: VIDEO_PREVIEW_IMAGES.classroomWhiteboardLecture, type: 'video' },
          { before: 'beach_timelapse_v2.mpg', after: 'Travel Beach Sunset Timelapse.mpg', img: VIDEO_PREVIEW_IMAGES.travelBeachSunsetTimelapse, type: 'video' },
          { before: 'stream_highlight_009.mp4', after: 'Gaming Stream Boss Fight Clip.mp4', img: VIDEO_PREVIEW_IMAGES.gamingStreamBossFightClip, type: 'video' },
          { before: 'lighting_test_final.mov', after: 'Music Video Lighting Test.mov', img: VIDEO_PREVIEW_IMAGES.musicVideoLightingTest, type: 'video' },
          { before: 'factory_import_091.m2ts', after: 'Factory Assembly Line Tour.m2ts', img: VIDEO_PREVIEW_IMAGES.factoryTourAssembly, type: 'video' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename Audio with AI', href: '/rename-audio-with-ai' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Rename Video Files with AI', href: 'rename-video-files-with-ai' },
      { title: 'How to Rename Files with AI', href: 'rename-files-with-ai-guide' },
      { title: 'Folder Monitoring for Auto File Renaming', href: 'folder-monitoring-automatic-file-renaming' },
      { title: 'Best AI File Renamers 2026', href: 'best-ai-file-renamer-tools-2026' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameVideosWithAI;
