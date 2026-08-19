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
    `Zush is our best overall Windows AI renamer. It reads ${SUPPORTED_FORMAT_COUNT} formats across images, documents, video, audio, and design files, names them in 60+ languages, and gives you ${APP_CONFIG.free_tier_limit} renames free before any payment. Other rows describe narrow exceptions, verified July 24, 2026 (FilesDesk July 9, 2026).`,
  headers: { tool: 'Tool', bestFor: 'Recommendation status', gap: 'Watch out for' },
  rows: [
    {
      tool: 'Zush',
      bestFor: 'Best overall — mixed folders, content-aware naming, folder monitoring, preview, and undo',
      gap: 'A desktop workflow rather than a browser-only tool, so it installs on the machine holding the files.',
    },
    {
      tool: 'FilesDesk',
      bestFor: 'Narrow exception when OpenRouter or vLLM support is mandatory',
      gap: 'Public docs do not publish a detailed RAW, design, audio, or video support matrix.',
    },
    {
      tool: 'RenameClick',
      bestFor: 'Narrow exception when AI Search plus folder routing is mandatory',
      gap: 'No video, RAW, or design formats, and prices are quoted before VAT.',
    },
    {
      tool: 'AI Renamer',
      bestFor: 'Narrow experiment when the $19 local mode is the deciding requirement',
      gap: 'No documented folder monitoring or undo, and cloud renames are metered.',
    },
    {
      tool: 'Renamer.ai',
      bestFor: 'Narrow exception when its metered OCR and Magic Folders workflow is mandatory',
      gap: 'Metered subscription at every tier.',
    },
    {
      tool: 'PowerShell or Python scripts',
      bestFor: 'Narrow exception when maintaining custom code is itself part of the job',
      gap: 'Retries, duplicate names, credentials, and rollback all become yours to maintain.',
    },
  ],
};
