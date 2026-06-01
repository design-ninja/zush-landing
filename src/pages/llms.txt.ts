import { SITE_ORIGIN } from '@/seo/config';

export function GET() {
  const body = [
    '# Zush',
    '',
    '> Zush is a file renamer for Mac and Windows. It uses AI to batch rename files by content, monitor folders, apply naming patterns, and keep rename history with undo.',
    '',
    '## Product',
    '',
    `- [Batch Rename Tool for Mac & Windows](${SITE_ORIGIN}/batch-rename-tool)`,
    `- [File Renamer for Mac & Windows](${SITE_ORIGIN}/file-renamer)`,
    `- [Batch Rename Files with AI](${SITE_ORIGIN}/batch-rename-files)`,
    `- [Bulk Rename Files on Mac & Windows](${SITE_ORIGIN}/bulk-rename-files)`,
    `- [Zush for Mac](${SITE_ORIGIN}/mac)`,
    `- [Zush for Windows](${SITE_ORIGIN}/windows)`,
    '',
    '## File-Type Workflows',
    '',
    `- [Rename PDFs with AI](${SITE_ORIGIN}/rename-pdf-with-ai)`,
    `- [Rename Photos with AI](${SITE_ORIGIN}/rename-photos-with-ai)`,
    `- [Rename Screenshots with AI](${SITE_ORIGIN}/rename-screenshots-with-ai)`,
    `- [Rename Documents with AI](${SITE_ORIGIN}/rename-documents-with-ai)`,
    `- [Rename Design Files with AI](${SITE_ORIGIN}/rename-design-files-with-ai)`,
    `- [Rename Videos with AI](${SITE_ORIGIN}/rename-videos-with-ai)`,
    `- [Rename Audio with AI](${SITE_ORIGIN}/rename-audio-with-ai)`,
    '',
    '## Evidence and Policies',
    '',
    `- [Methodology](${SITE_ORIGIN}/methodology)`,
    `- [Changelog](${SITE_ORIGIN}/changelog)`,
    `- [Privacy Policy](${SITE_ORIGIN}/privacy-policy)`,
    `- [Ollama Offline AI Setup](${SITE_ORIGIN}/ollama-setup)`,
    `- [BYOK Setup](${SITE_ORIGIN}/byok-setup)`,
    '',
    '## Key Facts',
    '',
    '- Platform support: macOS 15.0+, Windows 10, Windows 11.',
    '- Core use case: content-aware AI batch renaming for screenshots, photos, PDFs, documents, design files, audio, videos, and mixed folders.',
    '- Automation: folder monitoring can rename new supported files as they arrive.',
    '- Control: templates, custom prompts, and 145+ Naming Blocks help keep filenames consistent.',
    '- Privacy options: BYOK supports Gemini, Groq, OpenAI, and Claude; Offline AI mode uses local models via Ollama for supported files.',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
