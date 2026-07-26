import type { ComparisonTableProps } from '@/components/ComparisonTable/types';
import { APP_CONFIG, SUPPORTED_FORMAT_COUNT } from '@/constants';

/**
 * Source of truth for these competitor claims is the blog comparison at
 * /blog/best-ai-file-renamer-tools-windows-compared, which carries the source
 * links and the verification dates. Re-verify there first and mirror the result
 * here — do not edit these rows from memory.
 */
export const WINDOWS_COMPARISON: ComparisonTableProps = {
  eyebrow: 'Windows AI renamers compared',
  title: 'How Zush compares to other Windows AI renamers',
  intro:
    `Zush reads ${SUPPORTED_FORMAT_COUNT} formats across images, documents, video, audio, and design files, names them in 60+ languages, and gives you ${APP_CONFIG.free_tier_limit} renames free before any payment. The rows below summarise where each alternative is the better pick, verified July 24, 2026 (FilesDesk July 9, 2026).`,
  headers: { tool: 'Tool', bestFor: 'Best for', gap: 'Watch out for' },
  rows: [
    {
      tool: 'Zush',
      bestFor: 'Mixed folders — screenshots, PDFs, videos, documents — with folder monitoring and undo',
      gap: 'A desktop workflow rather than a browser-only tool, so it installs on the machine holding the files.',
    },
    {
      tool: 'FilesDesk',
      bestFor: 'Low-cost BYOK or local AI across Windows and Mac',
      gap: 'Public docs do not publish a detailed RAW, design, audio, or video support matrix.',
    },
    {
      tool: 'RenameClick',
      bestFor: 'Local-first renaming, AI Search, and folder sorting',
      gap: 'No video, RAW, or design formats, and prices are quoted before VAT.',
    },
    {
      tool: 'AI Renamer',
      bestFor: 'The cheapest local-model desktop app, at $19',
      gap: 'No documented folder monitoring or undo, and cloud renames are metered.',
    },
    {
      tool: 'Renamer.ai',
      bestFor: 'Document and vector workflows (EPS, SVG, AI) with Magic Folders',
      gap: 'Metered subscription at every tier.',
    },
    {
      tool: 'PowerShell or Python scripts',
      bestFor: 'Custom pipelines when maintaining the pipeline is part of the job',
      gap: 'Retries, duplicate names, credentials, and rollback all become yours to maintain.',
    },
  ],
};
