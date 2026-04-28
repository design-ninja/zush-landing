import type { HowToData } from '@/utils/jsonLd';

export const HOW_TO_SCHEMAS: Record<string, HowToData> = {
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
        text: 'Open Zush AI Setup, turn on Offline AI mode, refresh the model list, select the model, and run the connection test.',
      },
      {
        name: 'Test with a small batch',
        text: 'Rename a small folder of sample files first, review every proposed filename, and only then use Offline AI mode on larger folders.',
      },
    ],
  },
  'batch-rename-files-on-mac-complete-guide': {
    name: 'How to Batch Rename Files on Mac with Finder',
    description:
      "Use Finder's built-in batch rename tool to rename multiple files at once on macOS. Works on any Mac with macOS Yosemite (10.10) or later, no installation required.",
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
