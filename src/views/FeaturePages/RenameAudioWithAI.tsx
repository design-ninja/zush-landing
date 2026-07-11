import FeatureLandingPage from '@/components/FeatureLandingPage';
import { buildFeaturePageJsonLd } from '@/utils/jsonLd';

const faqItems = [
  {
    question: 'Which audio formats does Zush support?',
    answer:
      'Zush supports MP3, M4A, WAV, FLAC, OGG, WebM, and MPGA audio files. You can rename music tracks, voice memos, podcast cuts, interviews, field recordings, and meeting audio.',
  },
  {
    question: 'How does Zush understand audio files?',
    answer:
      'Zush can use embedded metadata, recognition context, transcript context, and audio-specific Naming Blocks such as artist, title, album, BPM, duration, speaker, topic, and recording context when available.',
  },
  {
    question: 'Does Zush upload the whole audio file?',
    answer:
      'Your original files stay on your computer. Cloud analysis sends only the payload needed for renaming, such as metadata, transcript context, or a bounded audio payload when transcription is required.',
  },
  {
    question: 'Can I rename music and spoken audio in the same batch?',
    answer:
      'Yes. Zush can process mixed audio batches and can also rename audio alongside screenshots, PDFs, documents, photos, and videos.',
  },
  {
    question: 'Can I create templates for audio filenames?',
    answer:
      'Yes. You can save templates and combine 145+ Naming Blocks for repeatable names like date-client-topic.m4a, artist-title-bpm.mp3, or episode-guest-segment.wav.',
  },
];

const jsonLd = buildFeaturePageJsonLd({
  howTo: {
    name: 'Rename Audio with AI',
    description:
      'Use Zush to automatically rename audio files based on metadata, recognition, and transcript context.',
    steps: [
      {
        name: 'Add audio files',
        text: 'Drag MP3, M4A, WAV, FLAC, OGG, WebM, or MPGA files into Zush, or select a folder with recordings and music tracks.',
      },
      {
        name: 'AI analyzes audio context',
        text: 'Zush uses available metadata, transcript context, recognition, and audio-specific fields to understand what each file is about.',
      },
      {
        name: 'Review and apply names',
        text: 'Preview the generated names, regenerate any weak suggestions, then apply the batch rename with history for rollback.',
      },
    ],
  },
  faqItems,
  software: {
    pagePath: '/rename-audio-with-ai',
    description:
      'AI audio renamer that turns generic music tracks, voice memos, interviews, podcasts, and meeting recordings into searchable filenames.',
    featureList: [
      'Rename MP3, M4A, WAV, FLAC, OGG, WebM, and MPGA audio files',
      'Use metadata, transcript context, recognition, and audio-specific fields',
      'Templates for repeatable audio naming workflows',
      '145+ Naming Blocks for artist, title, topic, client, date, BPM, and more',
      'Batch rename audio alongside images, documents, PDFs, and videos',
      'Full rename history with one-click revert',
    ],
  },
});

const RenameAudioWithAI = () => (
  <FeatureLandingPage
    h1="Rename Audio with AI"
    h1Accent="Rename Audio"
    category="audio"
    definitionTitle="What Is AI Audio Renaming?"
    definitionText="Rename audio with AI using Zush to replace generic track, memo, interview, podcast, and meeting filenames with searchable names based on metadata, recognition, and transcript context."
    showcaseSlides={[
      {
        files: [
          { before: 'track_01_final.mp3', after: 'Lo-Fi Piano Loop 92BPM.mp3', type: 'audio' },
          { before: 'voice_memo_042.m4a', after: 'Client Discovery Call.m4a', type: 'audio' },
          { before: 'podcast_cut_003.wav', after: 'Product Roadmap Interview.wav', type: 'audio' },
          { before: 'field_rec_18.flac', after: 'Rainy Street Ambience.flac', type: 'audio' },
          { before: 'jingle_v2.ogg', after: 'Brand Launch Jingle.ogg', type: 'audio' },
          { before: 'webinar_audio.webm', after: 'Onboarding Webinar Q&A.webm', type: 'audio' },
        ],
      },
      {
        files: [
          { before: 'meeting_audio_2026-04-09.mpga', after: 'Acme Contract Review Call.mpga', type: 'audio' },
          { before: 'demo_bounce_07.mp3', after: 'Synth Bass Demo 124BPM.mp3', type: 'audio' },
          { before: 'interview_take2.m4a', after: 'Founder Interview AI Workflow.m4a', type: 'audio' },
          { before: 'session_export.wav', after: 'Guitar Chorus Stem.wav', type: 'audio' },
          { before: 'lecture_clip.flac', after: 'Design Systems Lecture Clip.flac', type: 'audio' },
          { before: 'support_call.ogg', after: 'Billing Support Escalation.ogg', type: 'audio' },
        ],
      },
    ]}
    faqItems={faqItems}
    relatedPages={[
      { title: 'Rename Videos with AI', href: '/rename-videos-with-ai' },
      { title: 'Rename Documents with AI', href: '/rename-documents-with-ai' },
      { title: 'Rename PDFs with AI', href: '/rename-pdf-with-ai' },
      { title: 'Rename Photos with AI', href: '/rename-photos-with-ai' },
    ]}
    relatedBlogPosts={[
      { title: 'How to Rename Audio Files with AI', href: 'rename-audio-files-with-ai' },
      { title: 'Naming Blocks for Searchable File Names', href: 'naming-blocks-file-naming-guide' },
      { title: 'Templates for File Renaming Workflows', href: 'zush-templates-file-renaming-workflows' },
    ]}
    jsonLd={jsonLd}
  />
);

export default RenameAudioWithAI;
