---
title: "macOS Automator: How to Rename Files Automatically"
description: "Step-by-step guide to renaming files with macOS Automator. Build workflows, Folder Actions, and Quick Actions, plus smarter AI alternatives."
date: 2026-02-12
slug: macos-automator-rename-files-guide
tags: Automator rename files, macOS Automator guide, automatic file renaming mac, Automator workflow, Shortcuts
tldr: Automator can build useful file renaming workflows on macOS — but it cannot understand image content, which is where AI-powered renaming tools fill the gap
---

Automator has been a part of macOS since 2005, offering a visual way to build automated workflows without writing code. One of its most popular uses is batch file renaming — taking a folder full of generically named files and applying consistent names, dates, or sequential numbers. If you have ever needed to rename hundreds of files at once, Automator can save hours of manual clicking and typing.

This guide walks through building file renaming workflows in Automator step by step, from simple batch renames to Folder Actions that process files automatically. We will also look at where Automator falls short and what modern alternatives offer.

## What Is Automator and Where to Find It

Automator is a built-in macOS application that lets you chain together "actions" into reusable workflows. Each action performs a specific task — getting files from a folder, renaming them, moving them, converting image formats, and so on. You connect these actions in sequence, and Automator runs them top to bottom.

To open it, search for "Automator" in Spotlight (Command + Space) or find it in `/Applications/Automator.app`. When you launch it, you are presented with a choice of document types, each suited to different use cases.

### Automator Document Types

- **Workflow**: A standalone automation you run manually from within Automator. Good for testing and one-off tasks.
- **Application**: A self-contained app that runs the workflow when you double-click it or drop files onto it. Useful for drag-and-drop batch processing.
- **Quick Action (Service)**: Integrates into the right-click context menu in Finder. Select files, right-click, and run the action directly.
- **Folder Action**: Attaches to a specific folder and runs automatically whenever new files are added. This is the closest Automator gets to fully automatic file processing.
- **Print Plugin / Calendar Alarm / Image Capture Plugin**: Specialized types for specific triggers. Less commonly used for file renaming.

For file renaming, the most useful types are **Application** (for drag-and-drop batch processing), **Quick Action** (for context-menu access), and **Folder Action** (for automatic processing).

## Building a Basic Rename Workflow

Let us start with a simple workflow that renames files by adding a date prefix and replacing text.

### Step 1: Create a New Workflow

Open Automator and choose **Application** as the document type. This creates a workflow that you can drag files onto.

### Step 2: Add the "Get Specified Finder Items" Action

In the left panel, search for "Get Specified Finder Items" and drag it into the workflow area. This action serves as the input — when you drop files onto the finished application, they populate this action. For testing purposes, you can click "Add" and select specific files.

### Step 3: Add the "Rename Finder Items" Action

Search for "Rename Finder Items" in the action library and drag it below the first action. Automator will ask if you want to add a "Copy Finder Items" action first to preserve originals. This is a safety net — click "Add" to create copies in a specified location, or "Don't Add" if you want to rename in place.

The Rename Finder Items action offers several modes:

- **Add Date or Time**: Prepend or append a date/time string to the filename. You can choose the date format (YYYY-MM-DD, MM-DD-YYYY, etc.) and whether to use the file's creation date, modification date, or the current date.
- **Replace Text**: Find a specific text string in filenames and replace it with another. Useful for removing camera prefixes like "IMG_" or "DSC_".
- **Make Sequential**: Add incrementing numbers to filenames, with options for zero-padding, start number, and placement.
- **Change Case**: Convert filenames to uppercase, lowercase, or title case.

### Step 4: Chain Multiple Rename Actions

You are not limited to a single rename step. You can stack multiple Rename Finder Items actions in sequence. For example:

1. **Replace Text**: Replace "IMG_" with nothing (effectively removing the prefix)
2. **Add Date or Time**: Prepend the file's creation date in YYYY-MM-DD format
3. **Make Sequential**: Append a three-digit sequential number

This chain would transform `IMG_4382.HEIC` into something like `2026-02-12_001.HEIC`.

### Step 5: Save and Test

Save the application (File > Save, or Command + S). Give it a descriptive name like "Rename with Date Prefix." You now have a `.app` file that you can drop files onto from Finder. The files will be renamed according to your workflow.

## Creating a Quick Action for the Right-Click Menu

Quick Actions (called Services in older macOS versions) integrate directly into Finder's context menu. This is convenient when you want to rename files without leaving Finder.

### Step 1: Create a New Quick Action

Open Automator and choose **Quick Action**. At the top of the workflow area, set "Workflow receives current" to **files or folders** in **Finder**.

### Step 2: Add Rename Actions

Add the same Rename Finder Items actions as before. Configure them for your desired naming pattern — date prefix, text replacement, sequential numbering, or any combination.

### Step 3: Save the Quick Action

Save it with a descriptive name like "Add Date Prefix." The Quick Action is automatically installed and appears when you select files in Finder, right-click, and look under the **Quick Actions** submenu.

You can also assign a keyboard shortcut to the Quick Action through System Settings > Keyboard > Keyboard Shortcuts > Services.

## Setting Up a Folder Action for Automatic Renaming

Folder Actions are the most powerful Automator feature for file renaming because they run automatically. Attach a Folder Action to a folder, and any file added to that folder gets processed without you lifting a finger.

### Step 1: Create a New Folder Action

Open Automator and choose **Folder Action**. At the top of the workflow, use the dropdown to select the folder you want to monitor. This could be your Downloads folder, Desktop, or a project-specific directory.

### Step 2: Configure Rename Actions

Add Rename Finder Items actions as described earlier. A practical Folder Action might:

1. Replace "Screenshot" with "screen" (shorter prefix)
2. Add the creation date in a compact format
3. Convert the filename to lowercase

### Step 3: Save and Activate

Save the Folder Action. It activates immediately for the chosen folder. To verify it is running, drop a test file into the folder and check that it gets renamed.

### Managing Folder Actions

You can manage active Folder Actions by right-clicking a folder in Finder, choosing **Services > Folder Actions Setup**. This opens a panel where you can enable, disable, or edit Folder Actions for any directory.

## Practical Automator Recipes for Common Scenarios

Here are a few ready-to-use configurations for common renaming tasks:

### Recipe: Clean Up Screenshot Names

- **Replace Text**: Find "Screenshot " → Replace with "" (removes the word "Screenshot")
- **Replace Text**: Find " at " → Replace with "_" (replaces the "at" between date and time)
- **Change Case**: Lowercase

Result: `Screenshot 2026-02-12 at 3.42.17 PM.png` becomes `2026-02-12_3.42.17_pm.png`

### Recipe: Add Project Prefix to Camera Files

- **Replace Text**: Find "IMG_" → Replace with ""
- **Add Date or Time**: Prepend creation date as YYYY-MM-DD
- **Replace Text**: Find "" → Prepend "project-name_" (use actual project name)

Result: `IMG_4382.HEIC` becomes `project-name_2026-02-12_4382.HEIC`

### Recipe: Sequential Numbering for Exports

- **Make Sequential**: Start at 1, zero-padded to 3 digits, prepend
- **Add Date or Time**: Prepend current date

Result: Files become `2026-02-12_001.png`, `2026-02-12_002.png`, etc.

## The Limitations of Automator

Automator is a capable tool for structured, rule-based renaming. However, it has significant limitations that become apparent as your needs grow.

### No Content Awareness

Automator's rename actions work exclusively with text manipulation and file metadata. They can add dates, replace strings, and apply sequential numbers. What they cannot do is look at an image and understand what it contains. A photo of a mountain and a photo of a birthday cake both get the same mechanical treatment — a date prefix and a number. The result is organized by time, but not by meaning.

This is the core limitation. If you want filenames that actually describe what an image shows, Automator cannot help. It has no image recognition capability, no integration with AI models, and no way to generate descriptive text from visual content.

### Fragile Workflows

Automator workflows can break when macOS updates change underlying frameworks or when folder paths change. Debugging a broken workflow is not straightforward — Automator's error messages are often vague, and there is no logging to help you trace what went wrong.

### No Undo

Automator renames are destructive. Unless you added a Copy Finder Items action at the beginning of your workflow, the original filenames are gone. There is no built-in history or rollback mechanism. If a workflow misbehaves and renames 500 files incorrectly, recovering the original names requires restoring from a Time Machine backup.

### Automator's Uncertain Future

Apple introduced Shortcuts for Mac in macOS Monterey (2021) as a modern replacement for Automator. While Automator still ships with macOS, Apple has not added new features to it in years, and the direction is clear: Shortcuts is the future of user-facing automation on Apple platforms.

Shortcuts offers some file renaming capabilities, but its action library for file manipulation is still less mature than Automator's. The transition is awkward — Automator is more capable for file tasks but is effectively in maintenance mode, while Shortcuts is actively developed but has not yet reached feature parity for all workflows.

For file renaming specifically, neither Automator nor Shortcuts addresses the fundamental limitation: neither can understand image content.

## Beyond Automator: AI-Powered File Renaming

The gap that Automator cannot fill — understanding what an image actually shows — is exactly what AI-powered tools are designed for. Instead of applying mechanical text transformations, an AI renaming tool analyzes the visual content of each image and generates a descriptive filename.

[Zush](https://zushapp.com) takes this approach on macOS. Rather than building a fragile chain of text replacement actions, you drag images onto Zush (or let its folder monitoring feature pick them up automatically), and each image gets a name based on what the AI sees in it. A screenshot of a Figma mockup gets named something like `figma-dashboard-layout-sidebar-navigation.png`. A vacation photo becomes `sunset-over-harbor-boats-docked.jpg`.

Where Automator gives you `2026-02-12_001.png`, AI-powered renaming gives you `golden-gate-bridge-foggy-morning.png`. Both are improvements over `IMG_4382.HEIC`, but the descriptive approach makes files findable by content, not just by date.

### How Zush Compares to Automator

| Feature | Automator | Zush |
|---|---|---|
| Date-based renaming | Yes | Yes (via `{date}` pattern) |
| Text replacement | Yes | Yes (via `{title}` pattern) |
| Sequential numbering | Yes | Yes (via `{original}` pattern) |
| Content-aware naming | No | Yes (AI image analysis) |
| Custom naming patterns | Limited | Flexible (`{title}`, `{date}`, `{time}`, `{category}`, `{original}`) |
| Folder monitoring | Yes (Folder Actions) | Yes (background monitoring) |
| Undo/rollback | No | Yes (rename history) |
| Finder tags and metadata | No | Yes (Spotlight-searchable) |
| Setup complexity | Medium (visual workflow builder) | Low (drag and drop) |

Zush supports a broad range of image formats — PNG, JPG, JPEG, WebP, GIF, BMP, TIFF, HEIC, HEIF, SVG, and PDF — and uses Groq AI by default, with the option to bring your own API key for Gemini, OpenAI, or Claude if you prefer a specific provider.

### When to Use Automator vs. AI

Automator still has its place. If your renaming needs are purely structural — adding dates, removing prefixes, applying sequential numbers — and you do not need content-aware names, Automator (or Shortcuts) works fine. It is free, built-in, and requires no third-party software.

But if you want your filenames to reflect what your images actually show, if you want to search for "beach sunset" in Spotlight and find the right photo, or if you are tired of files named `Screenshot 2026-02-12 at 3.42.17 PM.png`, then an AI-powered tool fills a gap that Automator was never designed to address.

## Migrating from Automator to Shortcuts

If you want to future-proof your automation, consider rebuilding critical Automator workflows in Shortcuts. Here is a brief overview of how file renaming works in Shortcuts:

1. Open the **Shortcuts** app (in Applications or search Spotlight).
2. Create a new shortcut and add the **Receive File** input action.
3. Add a **Rename File** action, configuring the new name using variables like Current Date.
4. Optionally add a **Move File** action to relocate renamed files to a specific folder.
5. Save the shortcut and optionally add it as a Quick Action in Finder.

The Shortcuts approach is cleaner and more portable (shortcuts sync across your Apple devices via iCloud), but the renaming capabilities are similarly limited to text manipulation and metadata. For content-aware renaming, you still need a dedicated tool.

## Conclusion

macOS Automator remains a useful tool for structured file renaming tasks — adding date prefixes, removing camera naming conventions, and applying sequential numbers. For anyone who needs rule-based batch renaming, the workflows described in this guide can save significant time. However, Automator operates in a world of text patterns and metadata. It cannot understand what an image contains, and its future is uncertain as Apple shifts toward Shortcuts. For workflows where descriptive, content-aware filenames matter, AI-powered tools like Zush offer a fundamentally different approach that makes images searchable by what they show, not just when they were created.
