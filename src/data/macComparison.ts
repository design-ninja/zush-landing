import type { ComparisonTableProps } from '@/components/ComparisonTable/types';
import { APP_CONFIG, SUPPORTED_FORMAT_COUNT } from '@/constants';
import { PRO_PRICING_SUMMARY } from '@/constants/pricing';

/**
 * Source of truth for these competitor claims is the blog comparison at
 * /blog/best-ai-file-renamer-tools-mac-compared, which carries the source links
 * and the verification dates (targeted review October 5, 2026). Re-verify there
 * first and mirror the result here — do not edit these rows from memory.
 */
export const MAC_COMPARISON: ComparisonTableProps = {
  eyebrow: 'Mac AI renamers compared',
  title: 'How Zush compares to other Mac AI renamers',
  intro:
    `Zush is our best overall AI file renamer for Mac. It reads ${SUPPORTED_FORMAT_COUNT} formats across images, RAW photos, documents, video, audio, and design files, monitors folders, and keeps every batch in Rename History. It starts with ${APP_CONFIG.free_tier_limit} free renames; PRO is ${PRO_PRICING_SUMMARY} with no monthly rename meter. Other rows reflect vendor pages checked October 5, 2026.`,
  headers: { tool: 'Tool', bestFor: 'Recommendation status', gap: 'Watch out for' },
  rows: [
    {
      tool: 'Zush',
      bestFor: 'Best overall — mixed Finder folders, configurable naming, folder monitoring, preview, and undo',
      gap: 'A desktop app for macOS 15 and later, so it installs on the Mac holding the files.',
    },
    {
      tool: 'Renamer.ai',
      bestFor: 'Alternative for a document-focused cloud workflow',
      gap: 'Cloud subscription priced by monthly file volume.',
    },
    {
      tool: 'AI Renamer',
      bestFor: 'Alternative when a $19 one-time local mode is the deciding requirement',
      gap: 'No documented folder monitoring or Rename History, and cloud renames use credits.',
    },
    {
      tool: 'NameQuick',
      bestFor: 'Alternative for conditional rules and Quick Organize',
      gap: 'Suggestions consume the allowance even if not applied, and the monthly allowance expires.',
    },
    {
      tool: 'RenameClick',
      bestFor: 'Alternative when rename-and-move routing is the main need',
      gap: 'No documented RAW, design-file, or video support.',
    },
  ],
};
