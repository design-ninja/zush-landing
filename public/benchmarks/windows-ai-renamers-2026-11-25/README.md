# AI file renamers on Windows: six apps, one 30-file set

Run on 25 November 2026 on Windows 11 Pro (ARM64) in a Parallels virtual machine on an Apple Silicon Mac, with 6 GB of RAM for the VM. Zush ran this test for its own website, so it is not an independent review. Every app got the same 30 files and its default settings, and each one was scored against the published [Zush methodology](https://zushapp.com/methodology).

## Results

| App (version) | Files renamed out of 30 | Accuracy (35%) | Consistency (20%) | Automation (15%) | Safety (15%) | Operational fit (15%) | Total / 100 |
|---|---|---|---|---|---|---|---|
| Zush 3.19.2 | 30 | 8.5 | 10 | 10 | 10 | 10 | **94.8** |
| NameQuick 3.0.59 | 30 | 9.3 | 6 | 5 | 8 | 6 | 73.0 |
| RenameClick 4.1.4 | 27 | 8.2 | 8 | 6 | 6 | 5 | 70.2 |
| Renamer.ai (web app) | 25 | 7.8 | 8 | 1 | 6 | 2 | 56.8 |
| FilesDesk 1.0.38 | 15 | 4.0 | 8 | 6 | 8 | 1 | 52.5 |
| AI Renamer 1.10.0 | 10 | 2.2 | 8 | 3 | 4 | 2 | 37.2 |

Each criterion is scored from 0 to 10. Accuracy is the average blind grade of all 30 files: a file the tool rejected or did not process scores 0. Every other criterion consists of five checks worth 2 points each, listed in `rubric-scores.json`.

## What happened in each app

- **Zush** (Microsoft Store, native ARM64, no account). It renamed all 30 files, including 4 of 4 scanned PDFs without a text layer and all RAW and HEIC photos. Analysis took about 22 seconds and applying the names took 1.7 seconds. You see every name before anything changes. Undo All asked for confirmation and restored all 30 original names in 0.6 seconds, checked by SHA-256. The default template is AI Title only, so most document names carried no date. Adding one Custom AI Block, written in plain English ("find the main date printed in the file"), put the correct printed date into 16 of 20 document names; that run was not graded, because the other tools ran on defaults. On 33 files with 3 exact copies, Sort into folders placed all 33 into 7 folders and marked all 3 copies, and Undo All brought every file back. With folder rules written as one paragraph of text, 32 of 33 files landed in the folder the rules asked for.
- **NameQuick** (x64, free tier of 30 renames, no email). Onboarding named only the first 10 files; the other 20 went through a folder watch, and all 30 names took about 167 seconds. It named all 30 files, scans included, and added dates to 12 of 20 documents without any setup. Casing was mixed. "Undo last run" restored one file, because each watched file counts as a separate run; the other 29 needed one click each on buttons that only appear on hover.
- **RenameClick** (x64). AI does not work until you add your own API key or download a local model of about 4 GB; we used an OpenAI key. It skipped the 3 RAW files without a message and named the other 27 in 119 seconds. Its toolbar Undo reverted the whole batch. On the 33-file set with sorting on, 21 files went into 7 folders, 7 documents stayed in place unrenamed, and the DUPLICATE badge landed on originals instead of copies.
- **Renamer.ai** (web app; the 5.0.8 desktop app for Windows installed but stopped at start with "Saved sign-in is temporarily unavailable" on this machine). An account is required. The web app rejected NEF, ARW and CR3, which dropped the whole selection. The free tier covers 25 files a month. From a 25-file upload it processed 15 and skipped 10 without a message; a second upload processed those. Files go to their server, and you download renamed copies.
- **FilesDesk** (x64). Sign-in in the browser comes before anything else. It dropped the 3 RAW and 3 HEIC files without a message. The free tier has 15 credits: Run refused to start with 24 files selected, so we ran 15 documents. Undo works per file only (15 clicks).
- **AI Renamer** (self-signed x64 installer). Google sign-in comes first, and the free tier has 10 credits. All text documents failed with a red bar and no error text. Rename All stayed disabled until the 20 failed rows were removed by hand. It has no undo; History lists names only. Default names are kebab-case and cut at 25 characters.

## Test set

- 20 fictional documents made for the test (`inputs/`): 5 text PDFs, 4 scanned PDFs with no text layer, 3 DOCX, 2 XLSX, 2 screenshots, 2 phone photos of paper (receipt, delivery card), 1 RTF, 1 TXT. File names and dates look like real downloads (`scan0001.pdf`, `Document (3).docx`, `download (1).pdf`).
- 10 photos: 3 RAW (CR3, NEF, ARW) from [raw.pixls.us](https://raw.pixls.us/) under CC0, linked in `manifest.json`, plus 4 JPG and 3 HEIC (converted from CC0 photos) in `inputs/`.
- `manifest.json` lists every file with its SHA-256, licence, source and ground truth.

## How it was measured

- A fresh copy of the set for every app. File lists were captured with SHA-256 before and after each run and after undo, so renames, moves and restores were checked by content, not by eye.
- Times come from app logs where available, otherwise from polling the folder. Use them to compare apps inside this setup; they are not PC benchmarks. x64 apps ran under emulation on ARM.
- Accuracy: a separate grader that never saw which app produced which name scored each name 0, 1 or 2 against the ground truth (`results.csv`).
- All competitor accounts used free tiers, except RenameClick, which only works with your own API key. Zush ran on Pro; its free tier has the same features and 50 free renames.

## Files

- `results.csv`: every app and file, old name, new name, blind score and the grader's reason.
- `rubric-scores.json`: weights, every check per app, and the totals.
- `manifest.json` and `inputs/`: the test set.
