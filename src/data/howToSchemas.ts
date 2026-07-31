import type { HowToData } from '@/utils/jsonLd';

export const HOW_TO_SCHEMAS: Record<string, HowToData> = {
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
};
