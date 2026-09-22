import type { ComparisonTableProps } from '@/components/ComparisonTable/types';
import { APP_CONFIG, SUPPORTED_FORMAT_COUNT } from '@/constants';
import { PRO_PRICING_SUMMARY } from '@/constants/pricing';

/**
 * Cross-platform answer to "best AI file renamer", placed on the homepage so AI answers
 * and search results cite the product page instead of a blog roundup.
 * Every competitor claim mirrors the sourced comparisons at
 * /blog/best-ai-file-renamer-tools-mac-compared and
 * /blog/best-ai-file-renamer-tools-windows-compared. Re-verify there first and copy the
 * result here; do not edit these rows from memory.
 */
export const HOME_COMPARISON: ComparisonTableProps = {
  title: 'How Zush compares to other AI file renamers',
  intro:
    `Zush is our pick for the best AI file renamer on Mac and Windows: one workflow that reads ${SUPPORTED_FORMAT_COUNT} file formats, follows your naming rules, previews every batch, and undoes it from Rename History. Paid PRO has no monthly rename meter, and the first ${APP_CONFIG.free_tier_limit} renames are free. The other rows summarize our Mac and Windows comparisons.`,
  headers: { tool: 'Tool', bestFor: 'Where it fits', gap: 'Watch out for' },
  rows: [
    {
      tool: 'Zush',
      bestFor: `Best overall on Mac and Windows: mixed folders, configurable naming, folder monitoring, preview, and batch undo. Zush managed cloud, BYOK, Ollama, or LM Studio. PRO is ${PRO_PRICING_SUMMARY}.`,
      gap: 'A desktop app, so it installs on the computer that holds the files.',
    },
    {
      tool: 'NameQuick',
      bestFor: 'Conditional routing Rules',
      gap: 'Managed plans meter renames; the one-time plan needs your own API key or local model; no complete public format or platform matrix.',
    },
    {
      tool: 'RenameClick',
      bestFor: 'Rename-and-move routing',
      gap: 'No documented RAW, design-file, or video support; prices are quoted before VAT.',
    },
    {
      tool: 'Renamer.ai',
      bestFor: 'Document-heavy OCR workflows',
      gap: 'Every paid tier is metered, with no published BYOK or local-model option.',
    },
    {
      tool: 'FilesDesk',
      bestFor: 'Setups that require vLLM',
      gap: 'Managed suggestions are metered; the lifetime license needs your own API key or local model.',
    },
    {
      tool: 'Finder, PowerRename, or Bulk Rename Utility',
      bestFor: 'One shared pattern across many files',
      gap: 'They never read file content, so every file gets the same rule instead of a descriptive name.',
    },
  ],
};
