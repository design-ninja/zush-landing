import type { HowToData } from '@/utils/jsonLd';

export const HOW_TO_SCHEMAS: Record<string, HowToData> = {
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
