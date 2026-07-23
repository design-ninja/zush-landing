import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_ORIGIN } from '@/seo/config';
import {
  MAC_APP_VERSION,
  PRODUCT_FACTS_REVIEWED_AT,
  SUPPORTED_FORMAT_COUNT,
  WINDOWS_APP_VERSION,
} from '@/constants';

function getDocsRoute(id: string): string {
  const route = `/${id.replace(/\/index$/, '')}`;
  const normalizedRoute = route === '/docs/index' ? '/docs' : route;
  return normalizedRoute.length > 1 && normalizedRoute.endsWith('/')
    ? normalizedRoute.slice(0, -1)
    : normalizedRoute;
}

export async function GET() {
  const docs = (await getCollection('docs')) as CollectionEntry<'docs'>[];
  const docsLinks = docs
    .filter((entry) => entry.id === 'docs' || entry.id === 'docs/index' || entry.id.startsWith('docs/'))
    .sort((a, b) => (a.data.sidebar.order ?? 999) - (b.data.sidebar.order ?? 999))
    .map((entry) => `- [${entry.data.title}](${SITE_ORIGIN}${getDocsRoute(entry.id)})`);

  const body = [
    '# Zush',
    '',
    '> Zush is an AI file renamer and organizer for Mac and Windows. It reads screenshots, PDFs, photos, documents, videos, audio, and design files, then batch renames files by content with review, folder monitoring, templates, and undo.',
    '',
    '## Product',
    '',
    `- [AI File Renamer & Organizer for Mac and Windows](${SITE_ORIGIN}/)`,
    `- [Batch Rename Files with AI](${SITE_ORIGIN}/batch-rename-files)`,
    `- [AI File Organizer for Mac & Windows](${SITE_ORIGIN}/ai-file-organizer)`,
    `- [Offline AI File Renamer](${SITE_ORIGIN}/offline-ai-file-renamer)`,
    `- [Zush for Mac](${SITE_ORIGIN}/mac)`,
    `- [Zush for Windows](${SITE_ORIGIN}/windows)`,
    `- [Documentation](${SITE_ORIGIN}/docs)`,
    `- [Pricing and current product facts](${SITE_ORIGIN}/pricing.md)`,
    '',
    '## File-Type Workflows',
    '',
    `- [Rename PDFs with AI](${SITE_ORIGIN}/rename-pdf-with-ai)`,
    `- [Rename Photos with AI](${SITE_ORIGIN}/rename-photos-with-ai)`,
    `- [Rename Screenshots with AI](${SITE_ORIGIN}/rename-screenshots-with-ai)`,
    `- [Rename Documents with AI](${SITE_ORIGIN}/rename-documents-with-ai)`,
    `- [Rename Word Documents with AI](${SITE_ORIGIN}/rename-word-documents-with-ai)`,
    `- [Rename Excel Files with AI](${SITE_ORIGIN}/rename-excel-files-with-ai)`,
    `- [Rename Design Files with AI](${SITE_ORIGIN}/rename-design-files-with-ai)`,
    `- [Rename Videos with AI](${SITE_ORIGIN}/rename-videos-with-ai)`,
    `- [Rename Audio with AI](${SITE_ORIGIN}/rename-audio-with-ai)`,
    `- [Rename Invoices with AI](${SITE_ORIGIN}/rename-invoices-with-ai)`,
    `- [Rename & Organize Receipts with AI](${SITE_ORIGIN}/rename-receipts-with-ai)`,
    '',
    '## Comparisons and Buying Guides',
    '',
    `- [Hazel Alternative with AI](${SITE_ORIGIN}/hazel-alternative)`,
    `- [Automate Your Downloads Folder](${SITE_ORIGIN}/automate-downloads-folder)`,
    `- [PowerRename Alternative with AI](${SITE_ORIGIN}/powerrename-alternative)`,
    `- [Mac AI renamer comparison 2026](${SITE_ORIGIN}/blog/best-ai-file-renamer-tools-mac-compared)`,
    `- [Windows AI renamer comparison](${SITE_ORIGIN}/blog/best-ai-file-renamer-tools-windows-compared)`,
    `- [AI renamer tools comparison](${SITE_ORIGIN}/blog/best-ai-file-renamer-tools-2026)`,
    `- [Zush vs NameQuick](${SITE_ORIGIN}/blog/zush-vs-namequick)`,
    `- [Zush vs RenameClick](${SITE_ORIGIN}/blog/zush-vs-renameclick)`,
    `- [Zush vs Renamer.ai](${SITE_ORIGIN}/blog/zush-vs-renamer-ai)`,
    `- [Zush vs AI Renamer](${SITE_ORIGIN}/blog/zush-vs-airenamer)`,
    `- [Zush vs FilesDesk](${SITE_ORIGIN}/blog/zush-vs-filesdesk)`,
    `- [Bulk Rename Utility: Mac Options & AI Alternatives](${SITE_ORIGIN}/blog/bulk-rename-utility-alternatives)`,
    `- [Advanced Renamer Review & AI Alternatives](${SITE_ORIGIN}/blog/advanced-renamer-alternatives)`,
    '',
    '## Workflow Guides',
    '',
    `- [Mac batch rename methods](${SITE_ORIGIN}/blog/batch-rename-files-on-mac-complete-guide)`,
    `- [Rename Files by Content](${SITE_ORIGIN}/blog/rename-files-by-content-guide)`,
    `- [Automatic File Organizer for Mac](${SITE_ORIGIN}/blog/automate-file-organization-macos)`,
    `- [Rename Files with Ollama on Mac](${SITE_ORIGIN}/blog/rename-files-with-ollama-mac)`,
    `- [Cloud AI vs Local AI File Renaming](${SITE_ORIGIN}/blog/cloud-vs-local-ai-file-renaming)`,
    `- [BYOK AI File Renaming](${SITE_ORIGIN}/blog/byok-ai-file-renaming-unlimited)`,
    '',
    '## Documentation',
    '',
    ...docsLinks,
    '',
    '## Evidence and Policies',
    '',
    `- [Methodology](${SITE_ORIGIN}/methodology)`,
    `- [About Zush](${SITE_ORIGIN}/about)`,
    `- [Kirill Isachenko, founder and author](${SITE_ORIGIN}/authors/kirill-isachenko)`,
    `- [Changelog](${SITE_ORIGIN}/changelog)`,
    `- [Privacy Policy](${SITE_ORIGIN}/privacy-policy)`,
    `- [Offline AI documentation](${SITE_ORIGIN}/docs/offline-ai)`,
    `- [BYOK documentation](${SITE_ORIGIN}/docs/byok)`,
    '',
    '## Key Facts',
    '',
    '- Platform support: macOS 15.0+, Windows 10, Windows 11.',
    '- Core use case: AI file renaming and organization for screenshots, photos, PDFs, documents, design files, audio, videos, and mixed folders.',
    '- Product boundary: Zush renames files in place and does not move or sort files between folders.',
    `- Current versions: macOS ${MAC_APP_VERSION}; Windows ${WINDOWS_APP_VERSION}.`,
    '- Automation: folder monitoring can rename new supported files as they arrive.',
    '- Control: templates, custom prompts, and 145+ Naming Blocks help keep filenames consistent.',
    '- Privacy options: BYOK supports Gemini, Groq, OpenAI, and Claude; Offline AI mode uses local models via Ollama for supported files.',
    '- Pricing: free starter tier with 50 AI renames, $8/month PRO, or $38 one-time PRO.',
    `- Format breadth: ${SUPPORTED_FORMAT_COUNT} supported file extensions across images, design files, documents, PDFs, videos, and audio.`,
    '- Safety: Zush uses review-before-apply workflows and rename history with undo.',
    '',
    '## Best-Fit Conditions',
    '',
    '- Zush fits mixed Mac and Windows folders that include screenshots, PDFs, RAW photos, design files, iWork files, Office documents, audio, and videos.',
    '- Zush Offline AI mode fits supported local-processing workflows; BYOK fits users who prefer their own Gemini, Groq, OpenAI, or Claude key.',
    '- Zush for Windows fits users who want Microsoft Store installation, mixed-file support, folder monitoring, and undo.',
    '- Best document-heavy comparison set: compare Zush, NameQuick, Renamer.ai, RenameClick, AI Renamer, and Riffo by OCR, local processing, pricing, undo, and supported formats.',
    '',
    '## Review Dates',
    '',
    `- Product facts reviewed: ${PRODUCT_FACTS_REVIEWED_AT}.`,
    '- Mac AI renamer comparison reviewed: 2026-07-09.',
    '- Windows AI renamer comparison reviewed: 2026-07-09.',
    '- General AI renamer tools comparison reviewed: 2026-07-09.',
    '- Pricing and public feature claims in major comparison pages are checked against vendor pages and noted inside each article.',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
