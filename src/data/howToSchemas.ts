import type { HowToData } from '@/utils/jsonLd';

export const HOW_TO_SCHEMAS: Record<string, HowToData> = {
  'automate-file-organization-windows': {
    name: 'How to Automate File Organization on Windows',
    description:
      'Build a layered Windows file organization workflow with File Explorer searches, tested routing rules, content-aware naming, folder monitoring, and a weekly review.',
    totalTime: 'PT45M',
    steps: [
      {
        name: 'Audit the busiest folders',
        text: 'Inspect Downloads, Desktop, Screenshots, and Scans, then choose one or two folders whose recent files have the least useful names.',
      },
      {
        name: 'Create saved searches for visibility',
        text: 'Create File Explorer searches for recent screenshots, large files, and recent PDFs before moving or renaming anything.',
      },
      {
        name: 'Add and test a routing rule',
        text: 'Use a PowerShell script, Task Scheduler, File Juggler, or DropIt to route predictable files, and test the rule on a disposable folder first.',
      },
      {
        name: 'Add content-aware naming',
        text: 'Run a reviewed Zush batch on the worst folder and choose a template that produces concise, searchable filenames.',
      },
      {
        name: 'Enable monitoring and review',
        text: 'Monitor one stable intake folder, ensure naming happens before routing, and review edge cases weekly before expanding the system.',
      },
    ],
  },
  'batch-rename-google-drive-files': {
    name: 'How to Batch Rename Google Drive Files by Content',
    description:
      'Make a Google Drive folder available offline, review content-aware filename suggestions locally, apply the batch, and let Drive for desktop sync the metadata changes.',
    totalTime: 'PT10M',
    steps: [
      {
        name: 'Install Google Drive for desktop',
        text: 'Sign in and locate My Drive in Finder on macOS or File Explorer on Windows.',
      },
      {
        name: 'Make the target folder available offline',
        text: 'Download streamed files or use mirror mode, then wait until the sync status confirms that file content is available locally.',
      },
      {
        name: 'Open the local folder in Zush',
        text: 'Select the real PDF, image, document, video, or audio files and generate a separate content-aware suggestion for each one.',
      },
      {
        name: 'Choose a naming pattern',
        text: 'Use a template such as date, vendor, and document type for a consistent shared-folder convention.',
      },
      {
        name: 'Review and apply',
        text: 'Confirm every proposed name, apply the batch, and wait for Drive for desktop to finish syncing the rename metadata.',
      },
      {
        name: 'Optionally monitor the intake folder',
        text: 'Monitor a stable synced folder only when incoming files are made available locally before analysis.',
      },
    ],
  },
  'batch-rename-dropbox-files': {
    name: 'How to Batch Rename Dropbox Files by Content',
    description:
      'Make Dropbox files available offline, run a reviewed content-aware batch in the desktop folder, and let Dropbox sync the new names across devices.',
    totalTime: 'PT10M',
    steps: [
      {
        name: 'Locate the Dropbox desktop folder',
        text: 'Open the synced Dropbox folder through Finder or File Explorer rather than relying on a hard-coded path.',
      },
      {
        name: 'Make files available offline',
        text: 'Choose Make available offline and wait for the solid green checkmark before analyzing content.',
      },
      {
        name: 'Generate and review names',
        text: 'Open the folder in Zush, generate a content-derived name for each file, and review every suggestion.',
      },
      {
        name: 'Apply and wait for sync',
        text: 'Apply the reviewed batch and wait until Dropbox reports that syncing is complete.',
      },
      {
        name: 'Automate a stable intake folder',
        text: 'Optionally monitor a locally available Camera Uploads, scanner, or file-request staging folder for future arrivals.',
      },
    ],
  },
  'rename-organize-icloud-drive-files': {
    name: 'How to Batch Rename iCloud Drive Files on Mac',
    description:
      'Download optimized iCloud Drive files, review content-aware names on a Mac, apply the batch, and let iCloud sync the changes to iPhone and iPad.',
    totalTime: 'PT10M',
    steps: [
      {
        name: 'Open iCloud Drive in Finder',
        text: 'Select iCloud Drive in the Finder sidebar and open the target folder, including Desktop or Documents when those folders are synced.',
      },
      {
        name: 'Download cloud-only items',
        text: 'Choose Download Now for optimized placeholders, or Keep Downloaded for a folder that will be monitored regularly.',
      },
      {
        name: 'Generate and review names',
        text: 'Open the folder in Zush, generate content-aware suggestions, and review every filename before applying it.',
      },
      {
        name: 'Choose a compact mobile-friendly template',
        text: 'Use a concise pattern such as document type, vendor, and date so names remain readable in the Files app.',
      },
      {
        name: 'Apply and let iCloud sync',
        text: 'Apply the batch, wait for iCloud Drive sync to complete, and then confirm the new names on iPhone or iPad.',
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
