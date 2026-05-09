import FeatureLandingPage from '@/components/FeatureLandingPage';
import { VIDEO_PREVIEW_IMAGES } from '@/data/videoPreviewImages';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Which video formats does Zush support?',
    answer:
      'Zush supports common desktop video formats including MP4, MOV, M4V, MPEG, MPG, 3GP, DV, TS, MTS, M2TS, and VOB. It analyzes sampled frames and can use nearby SRT or VTT subtitle context when available.',
  },
  {
    question: 'Does Zush upload the whole video file?',
    answer:
      'No. Zush prepares compact analysis context such as sampled frames, subtitles, and file metadata instead of sending the original full video file as part of normal cloud processing.',
  },
  {
    question: 'Can Zush rename screen recordings?',
    answer:
      'Yes. Screen recordings are a strong fit because the visible UI, charts, documents, or subtitles often reveal what the clip is about.',
  },
  {
    question: 'Can I batch rename videos with photos and documents?',
    answer:
      'Yes. Zush can process mixed batches across supported images, videos, PDFs, Office documents, text files, spreadsheets, subtitles, and more. The batch limit is 50 files.',
  },
  {
    question: 'Does Zush support audio-only files?',
    answer:
      'Not yet. Zush 2.0 adds video analysis, but audio-only formats are still outside the supported file list.',
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
        text: 'Drag video files into Zush or select a folder. Zush supports common video formats including MP4, MOV, M4V, MPEG, 3GP, TS, MTS, M2TS, DV, and VOB.',
      },
      {
        name: 'AI analyzes sampled context',
        text: 'Zush samples video frames and can use subtitle context from SRT or VTT files to generate a concise, descriptive filename.',
      },
      {
        name: 'Review and apply',
        text: 'Preview each suggested name, regenerate if needed, then apply the rename with full history for rollback.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-videos-with-ai',
    description:
      'AI video renamer that turns generic screen recordings, clips, and camera files into searchable filenames using sampled frames and subtitles.',
    featureList: [
      'Rename MP4, MOV, M4V, MPEG, 3GP, TS, MTS, M2TS, DV, and VOB files',
      'Analyze sampled frames instead of relying only on filenames',
      'Use SRT and VTT subtitle context when available',
      'Batch rename videos alongside images and documents',
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
    definitionText="Rename videos with AI using Zush to replace generic screen recording, camera, and export filenames with searchable names based on sampled frames, visible context, and subtitles."
    showcaseSlides={[
      {
        files: [
          { before: 'Screen Recording 2026-05-08.mov', after: 'Checkout Flow Bug Recording.mov', img: VIDEO_PREVIEW_IMAGES.checkoutFlowBugRecording, type: 'video' },
          { before: 'GX010114.MP4', after: 'Product Demo Hero Animation.mp4', img: VIDEO_PREVIEW_IMAGES.productDemoHeroAnimation, type: 'video' },
          { before: 'clip_final_v3.m4v', after: 'Launch Trailer Cutdown.m4v', img: VIDEO_PREVIEW_IMAGES.launchTrailerCutdown, type: 'video' },
          { before: 'meeting_export_001.mp4', after: 'Roadmap Review Highlights.mp4', img: VIDEO_PREVIEW_IMAGES.roadmapReviewHighlights, type: 'video' },
          { before: 'tutorial_capture_04.mov', after: 'Tutorial Voiceover Walkthrough.mov', img: VIDEO_PREVIEW_IMAGES.tutorialVoiceoverWalkthrough, type: 'video' },
          { before: 'tutorial_cover_take_03.mpg', after: 'Tutorial Cover Frame.mpg', img: VIDEO_PREVIEW_IMAGES.tutorialCoverFrame, type: 'video' },
        ],
      },
      {
        files: [
          { before: 'VID_20260507_184233.mp4', after: 'Cafe Product Shoot Behind Scenes.mp4', img: VIDEO_PREVIEW_IMAGES.cafeProductShootBehindScenes, type: 'video' },
          { before: 'demo_take_02.mov', after: 'Settings Sidebar Walkthrough.mov', img: VIDEO_PREVIEW_IMAGES.settingsSidebarWalkthrough, type: 'video' },
          { before: 'recording-12.ts', after: 'Conference Talk Intro.ts', img: VIDEO_PREVIEW_IMAGES.conferenceTalkIntro, type: 'video' },
          { before: 'camera-roll-0091.m2ts', after: 'Factory Tour Assembly Line.m2ts', img: VIDEO_PREVIEW_IMAGES.factoryTourAssembly, type: 'video' },
          { before: 'archive_clip_17.3gp', after: 'Mobile Vertical Product Teaser.3gp', img: VIDEO_PREVIEW_IMAGES.mobileVerticalProductTeaser, type: 'video' },
          { before: 'camcorder_import.dv', after: 'Workshop Camera Angle.dv', img: VIDEO_PREVIEW_IMAGES.workshopCameraAngle, type: 'video' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
      { title: 'Rename Screenshots with AI', href: '/rename-screenshots-with-ai' },
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Rename Files with AI', href: 'rename-files-with-ai-guide' },
      { title: 'Folder Monitoring for Auto File Renaming', href: 'folder-monitoring-automatic-file-renaming' },
      { title: 'Best AI File Renamers 2026', href: 'best-ai-file-renamer-tools-2026' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameVideosWithAI;
