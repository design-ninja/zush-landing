import type { HowToData } from '@/utils/jsonLd';

export const HOW_TO_SCHEMAS: Record<string, HowToData> = {
  'rename-pdf-files-automatically': {
    name: 'How to Automatically Rename PDF Files with AI',
    description:
      'Test a content-aware PDF naming pattern on a representative batch, review the proposed names, then use folder monitoring for recurring documents.',
    totalTime: 'PT10M',
    steps: [
      {
        name: 'Choose a narrow PDF intake folder',
        text: 'Start with Downloads, scanner output, or a dedicated PDF Inbox where similar documents arrive under weak filenames.',
      },
      {
        name: 'Test 10 to 20 representative PDFs',
        text: 'Include text PDFs, scans, recurring documents, and edge cases so the naming pattern is tested before monitoring begins.',
      },
      {
        name: 'Build a stable naming pattern',
        text: 'Use reliable fields such as date, vendor, document type, invoice number, or subject, and keep the pattern short enough to scan.',
      },
      {
        name: 'Review the proposed filenames',
        text: 'Check extracted names, dates, document types, duplicate handling, and low-confidence scans before applying the batch.',
      },
      {
        name: 'Apply the batch with rollback available',
        text: 'Rename the reviewed files and keep rename history available until the documents have been verified.',
      },
      {
        name: 'Enable folder monitoring',
        text: 'Assign the tested pattern to the intake folder so new PDFs follow the same convention as they arrive.',
      },
    ],
  },
  'rename-pdf-files-with-ai-mac': {
    name: 'How to Rename PDF Files with AI on Mac',
    description:
      'Stage the badly named PDFs, test one content-aware naming pattern on a small batch, review the results, and keep rollback available.',
    totalTime: 'PT10M',
    steps: [
      {
        name: 'Create a staging folder',
        text: 'Move only the poorly named PDFs into a separate folder so clean files and unrelated documents stay outside the batch.',
      },
      {
        name: 'Choose one naming pattern',
        text: 'Combine the document type, date, party, or subject in the order you would use when searching in Finder or Spotlight.',
      },
      {
        name: 'Test and review a representative batch',
        text: 'Start with 10 to 20 scans, invoices, forms, and reports, then verify every proposed filename and collision.',
      },
      {
        name: 'Apply the names and retain history',
        text: 'Apply the reviewed batch and keep the rename history until the documents and naming pattern have been verified.',
      },
    ],
  },
  'how-to-organize-downloads-folder-mac': {
    name: 'How to Organize the Downloads Folder on Mac',
    description:
      'Treat Downloads as an inbox: delete obvious junk, move active files, fix weak filenames, review old leftovers, and repeat weekly.',
    totalTime: 'PT5M',
    steps: [
      {
        name: 'Sort by Date Added',
        text: 'Open Downloads in Finder and sort by Date Added so the newest inflow is easy to review first.',
      },
      {
        name: 'Delete obvious junk',
        text: 'Remove duplicate installers, abandoned exports, and files you can safely download again.',
      },
      {
        name: 'Move active files',
        text: 'Move important items into Action, Reference, or the permanent project, client, or finance folder where they belong.',
      },
      {
        name: 'Rename weak files',
        text: 'Give valuable screenshots, PDFs, images, and documents names that will make sense in Finder and Spotlight later.',
      },
      {
        name: 'Review old leftovers',
        text: 'Archive or delete files that no longer have a purpose, then repeat the same five-minute review each week.',
      },
    ],
  },
  'digital-asset-management-designers-mac': {
    name: 'How to Set Up Digital Asset Management for a Mac Design Project',
    description:
      'Create a repeatable project structure, naming pattern, status tags, version archive, handoff folder, and a narrow automation rule.',
    totalTime: 'PT30M',
    steps: [
      {
        name: 'Create the project folders',
        text: 'Create source, exports, references, handoff, and archive folders so each asset type has one clear home.',
      },
      {
        name: 'Write one naming pattern',
        text: 'Combine the project, asset type, description, and version or state in one documented filename pattern.',
      },
      {
        name: 'Choose status tags',
        text: 'Use named Finder tags such as In review, Approved, and Reference for workflow states that should not change file location.',
      },
      {
        name: 'Move replaced versions to the archive',
        text: 'Keep one current asset in the source folder and move older versions into archive so the active file is unambiguous.',
      },
      {
        name: 'Prepare the handoff folder',
        text: 'Export a representative asset and confirm that another person can identify its component, size, state, and format without opening it.',
      },
      {
        name: 'Automate one repeated inflow',
        text: 'Monitor only the export or screenshot folder where weak filenames repeat, and keep the rest of the project manual until needed.',
      },
    ],
  },
  'digital-photo-organization-mistakes-to-avoid': {
    name: 'How to Recover a Disorganized Digital Photo Library',
    description:
      'Protect the library, choose one small batch, separate originals and exports, merge duplicates, apply one naming rule, and repeat.',
    totalTime: 'PT20M',
    steps: [
      {
        name: 'Confirm an independent backup',
        text: 'Protect the original library before moving, merging, deleting, or renaming a large number of photos.',
      },
      {
        name: 'Choose one small batch',
        text: 'Limit the session to the latest import, one event, one client project, or one month of photos.',
      },
      {
        name: 'Separate originals and exports',
        text: 'Keep master photos apart from edits, screenshots, and resolution variants so intentional copies are not removed.',
      },
      {
        name: 'Merge exact duplicates',
        text: 'Remove exact duplicates before making subjective decisions about burst shots, edits, or different resolutions.',
      },
      {
        name: 'Apply one naming rule',
        text: 'Test a predictable date, event, subject, and sequence pattern on a representative set and keep rollback available.',
      },
      {
        name: 'Schedule the next short session',
        text: 'Stop after the bounded batch and repeat the same process next week instead of expanding into a full-library cleanup.',
      },
    ],
  },
  'automatically-rename-invoices-ai': {
    name: 'How to Automatically Rename Invoices with AI',
    description:
      'Use Zush on Mac or Windows to extract invoice fields, apply a reusable naming template, review the batch, and monitor the incoming folder.',
    totalTime: 'PT10M',
    steps: [
      {
        name: 'Copy a small invoice test batch',
        text: 'Start with 10 to 20 representative invoice PDFs and scans, and keep the originals in a backup folder while you test the workflow.',
      },
      {
        name: 'Add the invoices to Zush',
        text: 'Open the Zush invoice renamer and add the files or folder so text PDFs and scanned documents can be analyzed.',
      },
      {
        name: 'Build an invoice naming template',
        text: 'Combine the invoice date, vendor, invoice number, amount, and currency with Naming Blocks and optional Custom AI Blocks.',
      },
      {
        name: 'Review every proposed filename',
        text: 'Check vendor spelling, invoice date, invoice number, amount, currency, and duplicate-name handling before applying changes.',
      },
      {
        name: 'Apply the batch with undo available',
        text: 'Apply the reviewed names and keep rename history available so the complete batch can be reverted if the template needs another pass.',
      },
      {
        name: 'Monitor the incoming folder',
        text: 'Assign the tested template to folder monitoring so new invoices use the same naming convention as they arrive.',
      },
    ],
  },
  'rename-scanned-documents-automatically': {
    name: 'How to Rename Scanned Documents Automatically',
    description:
      'Use Zush on Mac or Windows to read scans with AI vision, apply a document-type naming convention, review the batch, and monitor the scanner folder.',
    totalTime: 'PT10M',
    steps: [
      {
        name: 'Copy a small test batch of scans',
        text: 'Start with 10 to 20 representative scanned PDFs and keep the originals in a backup folder while you tune the workflow.',
      },
      {
        name: 'Add the scans to Zush',
        text: 'Drop the files or folder into Zush so image-only scans are read with AI vision and text PDFs are read directly.',
      },
      {
        name: 'Build a scan naming template',
        text: 'Combine the document date, document type, and vendor or party with Naming Blocks, plus a Custom AI Block for any custom field.',
      },
      {
        name: 'Review every proposed filename',
        text: 'Check document types, party spellings, and dates in the preview, and hand-name any illegible scans the AI flagged with generic titles.',
      },
      {
        name: 'Apply the batch with undo available',
        text: 'Apply the reviewed names and keep rename history available so the batch can be reverted if the template needs another pass.',
      },
      {
        name: 'Monitor the scanner folder',
        text: 'Assign the tested template to folder monitoring so every new scan is renamed to the same convention as it arrives.',
      },
    ],
  },
  'rename-files-with-ollama-mac': {
    name: 'How to Rename Files with Ollama on Mac',
    description:
      'Set up Zush Offline AI mode on Mac with Ollama, a vision-capable local model, and a small test batch before using it on important folders.',
    totalTime: 'PT10M',
    steps: [
      {
        name: 'Install Ollama',
        text: 'Download Ollama for macOS, install it, and open the app once so the local Ollama service can run on your Mac.',
      },
      {
        name: 'Pull a vision model',
        text: 'Open Terminal and pull a vision-capable model such as qwen2.5vl:3b, gemma3:4b, or granite3.2-vision:2b.',
      },
      {
        name: 'Confirm Ollama is running',
        text: 'Run ollama list to confirm the model is installed. If Zush cannot connect, start Ollama or run ollama serve.',
      },
      {
        name: 'Enable Offline AI mode in Zush',
        text: 'Open Zush BYOK/Offline, refresh the model list, select and test the installed model, then turn on Offline AI mode.',
      },
      {
        name: 'Test with a small batch',
        text: 'Rename a small folder of sample files first, review every proposed filename, and only then use Offline AI mode on larger folders.',
      },
    ],
  },
  'batch-rename-files-on-mac-complete-guide': {
    name: 'How to Use Finder Rename Items on Mac',
    description:
      "Use Finder's built-in Rename Items dialog to rename multiple files at once on macOS. Works on any Mac with macOS Yosemite (10.10) or later, no installation required.",
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Select the files',
        text: 'Open the folder containing the files you want to rename. Press Cmd+A to select all, Shift+click to pick a range, or Cmd+click to choose individual files.',
      },
      {
        name: 'Open the rename dialog',
        text: 'Right-click any selected file and choose "Rename..." from the context menu. You can also use the Finder menu: File > Rename.',
      },
      {
        name: 'Choose your rename mode',
        text: 'Pick one of three modes from the dropdown: Replace Text (find and replace), Add Text (prepend or append text), or Format (replace the name with a base plus a sequential number or date).',
      },
      {
        name: 'Configure and preview',
        text: 'Fill in the fields. Finder shows a live preview of the new filenames so you can verify the rule before applying it.',
      },
      {
        name: 'Click Rename',
        text: 'Apply the rename to all selected files at once. If something looks wrong, press Cmd+Z immediately to undo the entire batch.',
      },
    ],
  },
  'best-ways-to-organize-photos-on-mac': {
    name: 'How to Organize Photos on Mac in 7 Steps',
    description:
      'Choose Apple Photos, Finder, or a hybrid library, then use a durable folder structure, descriptive filenames, portable dates, focused tags, retrieval tests, and a 3-2-1 backup.',
    steps: [
      {
        name: 'Choose the library',
        text: 'Use Apple Photos for timeline browsing and albums, Finder for direct file access, or a hybrid setup when personal and work images need different systems.',
      },
      {
        name: 'Create one durable structure',
        text: 'Use a Year/Month/Event or Year/Project folder structure instead of adding new folders whenever the library feels messy.',
      },
      {
        name: 'Rename generic files',
        text: 'Replace IMG, DSC, and Screenshot filenames with names that describe the subject, event, client, or location.',
      },
      {
        name: 'Keep dates portable',
        text: 'Include the capture or project date in important filenames so the context survives exports, sharing, and folder moves.',
      },
      {
        name: 'Use a small tag vocabulary',
        text: 'Reserve Finder tags for status, client, or project labels that need to work across folders.',
      },
      {
        name: 'Test retrieval',
        text: 'Search for a real photo in Spotlight without browsing folders. If you cannot find it, improve the filename or metadata.',
      },
      {
        name: 'Back up with the 3-2-1 rule',
        text: 'Keep three copies of the photo library on two storage types, with one copy stored off-device or off-site.',
      },
    ],
  },
};
