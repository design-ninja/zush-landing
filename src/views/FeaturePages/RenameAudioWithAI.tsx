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
      'Zush takes one of four routes per file: embedded track metadata, an available transcript, music recognition, or speech analysis. Cloud speech analysis uses an excerpt from the first two minutes, so a long recording may cover topics outside it. Audio-specific Naming Blocks such as artist, title, album, BPM, duration, speaker, topic, and recording context fill the filename itself.',
  },
  {
    question: 'Does Zush upload the whole audio file?',
    answer:
      'Your original files stay on your computer. Cloud analysis sends only the payload needed for renaming, such as metadata, transcript context, or a bounded audio excerpt from the first two minutes when transcription is required.',
  },
  {
    question: 'Does music recognition work in every AI mode?',
    answer:
      'No. Music recognition needs a reliable catalog match and is not guaranteed for every remix, live take, or noisy clip. Ollama and LM Studio work from available text, metadata, and image previews, and skip online music catalog recognition; Zush does not send raw audio to a local model or switch to cloud transcription on its own.',
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
      'Use Zush to automatically rename audio files based on track metadata, music recognition, transcripts, and speech analysis.',
    steps: [
      {
        name: 'Add audio files',
        text: 'Drag MP3, M4A, WAV, FLAC, OGG, WebM, or MPGA files into Zush, or select a folder with recordings and music tracks.',
      },
      {
        name: 'AI analyzes audio context',
        text: 'Zush uses embedded track metadata, an available transcript, music recognition, or a speech excerpt from the first two minutes to understand what each file is about.',
      },
      {
        name: 'Review and apply names',
        text: 'Preview the generated names, regenerate any weak suggestions, then apply the batch rename with history for rollback.',
      },
    ],
  },
  faqItems,
  page: {
    pagePath: '/rename-audio-with-ai',
    description:
      'AI audio renamer that turns generic music tracks, voice memos, interviews, podcasts, and meeting recordings into searchable filenames.',
    featureList: [
      'Rename MP3, M4A, WAV, FLAC, OGG, WebM, and MPGA audio files',
      'Use track metadata, transcripts, music recognition, or a bounded speech excerpt',
      'Local modes work from text, metadata, and previews without online music recognition',
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
    definitionText="Rename audio with AI using Zush to replace generic track, memo, interview, podcast, and meeting filenames with searchable names based on metadata, recognition, and transcript context. Zush renames files in place, with optional AI folder sorting."
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
