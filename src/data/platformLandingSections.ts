import type { FeatureCardsCopy, LocaleCopy, UseCasesCopy } from '@/i18n/copy';
import type { Locale } from '@/i18n/config';
import type { PlatformSpecificsKey } from '@/data/platformSpecifics';

interface PlatformLandingSections {
  featuresTitle: string;
  featuresDescription: string;
  featureCards: FeatureCardsCopy;
  useCasesTitle: string;
  useCasesDescription: string;
  useCases: UseCasesCopy;
}

type PlatformOverrides = Record<
  PlatformSpecificsKey,
  Pick<PlatformLandingSections, 'featuresTitle' | 'featuresDescription' | 'useCasesTitle' | 'useCasesDescription'> & {
    featureCards: Partial<FeatureCardsCopy>;
    useCases: UseCasesCopy;
  }
>;

const EN_PLATFORM_OVERRIDES: PlatformOverrides = {
  mac: {
    featuresTitle: 'How Zush works on macOS',
    featuresDescription:
      'Mac-first renaming workflows for Finder, Spotlight, Downloads, screenshots, and local AI.',
    featureCards: {
      aiAnalysis: {
        title: 'AI analysis for Mac files',
        description:
          'Analyze screenshots, PDFs, HEIC and RAW photos, Office docs, and exports without leaving a native macOS workflow.',
      },
      foldersMonitoring: {
        title: 'Watch Downloads and Screenshots',
        description:
          'Monitor ~/Downloads, Desktop, or a screenshot folder so new files get readable names as they arrive.',
      },
      batchRename: {
        title: 'Batch rename from Finder',
        description:
          'Drag files or folders from Finder into Zush, review every suggested name, then apply the rename in place.',
      },
      customPatterns: {
        title: 'macOS naming patterns',
        description:
          'Use patterns with dates, categories, and original names so Finder folders stay consistent across projects.',
      },
      smartMetadata: {
        title: 'Finder tags and Spotlight search',
        description:
          'Generate readable names and metadata so files are easier to find later with Finder and Spotlight.',
      },
      renameHistory: {
        title: 'Undo without risk',
        description:
          'Every Mac rename is logged, so you can revert files back to their original names if a batch needs another pass.',
      },
      customPrompts: {
        title: 'Rules for Finder workflows',
        description:
          'Tell Zush how to name design exports, invoices, screenshots, and client folders before you apply changes.',
      },
      byok: {
        title: 'BYOK on Mac',
        description:
          'Connect Gemini, Groq, OpenAI, or Claude with your own key when you want unlimited cloud renames from macOS.',
      },
      offlineAi: {
        title: 'Offline AI with Ollama',
        description:
          'Run supported Mac file analysis with local models when privacy or offline work matters more than cloud speed.',
      },
      addFolder: 'Add Mac folder',
      analysisNewName: 'Client Contract Signed.pdf',
      batchNewNames: ['App Settings Screenshot.png', 'Q2 Budget Notes.docx', 'Investor Update Deck.pptx'],
      metadataFileName: 'Product Mockup Export.png',
      metadataTags: ['finder', 'mockup', 'client', 'design', 'macos'],
      historyNewNames: ['Scanner Receipt.pdf', 'Website Proposal.docx'],
      promptExample: 'Use short Finder-friendly names, keep client names first, and add matching tags.',
    },
    useCasesTitle: 'Mac workflows Zush cleans up',
    useCasesDescription:
      'The same app, tuned for the messy folders Mac users touch every day.',
    useCases: {
      items: [
        {
          title: 'Designers on Mac',
          description:
            'Rename screenshots, Figma exports, Sketch assets, and reference images so Finder folders stay scannable.',
        },
        {
          title: 'Photographers',
          description:
            'Give HEIC, RAW, and JPG imports useful names before they disappear into large photo libraries or iCloud folders.',
        },
        {
          title: 'Freelancers',
          description:
            'Clean up invoices, signed PDFs, proposals, and client downloads before archiving them by project.',
        },
        {
          title: 'Developers',
          description:
            'Turn PR screenshots, bug captures, and documentation images into filenames that explain what changed.',
        },
        {
          title: 'Creators',
          description:
            'Rename thumbnails, b-roll references, and image exports before they pile up in Desktop or Downloads.',
        },
        {
          title: 'Managers',
          description:
            'Make meeting notes, spreadsheets, decks, and stakeholder PDFs searchable from Finder and Spotlight.',
        },
      ],
    },
  },
  windows: {
    featuresTitle: 'How Zush works on Windows',
    featuresDescription:
      'Windows-first cleanup for File Explorer, Downloads, screenshots, Microsoft Store installs, and local AI.',
    featureCards: {
      aiAnalysis: {
        title: 'AI analysis for Windows files',
        description:
          'Analyze screenshots, PDFs, photos, Office docs, and exports from ordinary Windows folders.',
      },
      foldersMonitoring: {
        title: 'Watch Downloads and Screenshots',
        description:
          'Monitor Downloads, Pictures\\Screenshots, or work folders so new files get useful names automatically.',
      },
      batchRename: {
        title: 'Batch rename from File Explorer',
        description:
          'Drag mixed files from File Explorer into Zush, review the suggestions, then apply every rename in one pass.',
      },
      customPatterns: {
        title: 'Windows naming patterns',
        description:
          'Use date, category, and original-name variables to keep project folders and shared drives consistent.',
      },
      smartMetadata: {
        title: 'Searchable Windows folders',
        description:
          'Create descriptive filenames that are easier to find later through File Explorer and Windows Search.',
      },
      renameHistory: {
        title: 'Undo after a batch',
        description:
          'Every rename is tracked, so you can roll back a batch without scripts or manual filename recovery.',
      },
      customPrompts: {
        title: 'Rules for Windows folders',
        description:
          'Set naming rules for screenshots, invoices, client PDFs, reports, and shared team folders.',
      },
      byok: {
        title: 'BYOK on Windows',
        description:
          'Use your own Gemini, Groq, OpenAI, or Claude key for unlimited cloud renames from the Windows app.',
      },
      offlineAi: {
        title: 'Offline AI with Ollama',
        description:
          'Run supported file analysis locally when you want private renaming without sending content to cloud models.',
      },
      addFolder: 'Add Windows folder',
      analysisNewName: 'Vendor NDA Final.pdf',
      batchNewNames: ['Dashboard Error Screenshot.png', 'Quarterly Report Notes.docx', 'Sales Pipeline Deck.pptx'],
      metadataFileName: 'Campaign Asset Export.png',
      metadataTags: ['windows', 'campaign', 'report', 'client', 'shared'],
      historyNewNames: ['Medical Lab Results.pdf', 'Apartment Lease 2026.pdf'],
      promptExample: 'Use clear Windows-safe names, keep dates readable, and avoid characters that break sync.',
    },
    useCasesTitle: 'Windows folders Zush cleans up',
    useCasesDescription:
      'Practical cleanup for the file piles that build up in File Explorer.',
    useCases: {
      items: [
        {
          title: 'Design teams',
          description:
            'Rename screenshots, mockups, exported assets, and review images before they move to shared folders.',
        },
        {
          title: 'Photo libraries',
          description:
            'Turn camera imports and phone sync folders into searchable names instead of endless IMG and DSC files.',
        },
        {
          title: 'Operations',
          description:
            'Clean up invoices, contracts, statements, and vendor PDFs as they land in Downloads.',
        },
        {
          title: 'Developers',
          description:
            'Name bug screenshots, repro captures, and documentation images by what each file actually shows.',
        },
        {
          title: 'Creators',
          description:
            'Organize thumbnails, social exports, and reference images before project folders get hard to scan.',
        },
        {
          title: 'Managers',
          description:
            'Keep reports, spreadsheets, decks, and meeting files readable across local and synced Windows folders.',
        },
      ],
    },
  },
};

export function getPlatformLandingSections(
  platform: PlatformSpecificsKey,
  locale: Locale,
  copy: LocaleCopy,
): PlatformLandingSections {
  const overrides = locale === 'en' ? EN_PLATFORM_OVERRIDES[platform] : null;

  if (!overrides) {
    return {
      featuresTitle: copy.home.featuresTitle,
      featuresDescription: copy.home.featuresDescription,
      featureCards: copy.home.featureCards,
      useCasesTitle: copy.home.useCasesTitle,
      useCasesDescription: copy.home.useCasesDescription,
      useCases: copy.home.useCases,
    };
  }

  return {
    featuresTitle: overrides.featuresTitle,
    featuresDescription: overrides.featuresDescription,
    featureCards: {
      ...copy.home.featureCards,
      ...overrides.featureCards,
    },
    useCasesTitle: overrides.useCasesTitle,
    useCasesDescription: overrides.useCasesDescription,
    useCases: overrides.useCases,
  };
}
