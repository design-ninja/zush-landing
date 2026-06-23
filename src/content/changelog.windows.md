# Changelog

## [3.3.1.0] - 2026-06-23

### Fixed
- Fixed folder monitoring so files inside newly moved folders are detected reliably.
- Reduced duplicate monitoring work when existing watched folders change.
- Fixed a dialog crash that could happen when editing templates.
- Preserved custom text blocks in naming patterns when changing case style.

### Improved
- Added a global Zush sounds preference across all supported interface languages.
- Matched naming case style menu labels with the macOS app.


## [3.3.0.0] - 2026-06-21
### Added
- Added automatic output language matching so AI rename suggestions can follow the primary language of file contents.
- Added a Preferences toggle for the rename-complete success sound.

### Improved
- Updated Cloud AI and BYOK model defaults for current provider compatibility.
- Improved activation link recovery with clearer messages for used or expired links.
- Made folder monitoring catch-up more resilient around inaccessible folders and unsupported files.


## [3.2.3.0] - 2026-06-08

### Improved
- Improved AI Rename activity reporting.
- Reduced background work during batch rename.
- Improved batch rename reliability for larger rename sessions.


## [3.2.2.0] - 2026-06-07
### Improved
- AI Rename now records richer workflow events for file selection, analysis, and rename completion so issues can be diagnosed more accurately.
- Cloud, local metadata, and PRO rename paths now report workflow progress consistently without double-counting completed renames.
- Usage metrics keep file names and file paths out of event metadata.


## [3.2.1.0] - 2026-06-03
### Fixed
- Long BYOK provider keys no longer push action buttons outside the AI Setup card


## [3.2.0.0] - 2026-06-02
### Improved
- BYOK and Offline AI setup now show clearer model status, defaults, and provider diagnostics.
- Batch rename application is faster, with fixed elapsed timing and smoother progress updates.
- Free rename usage and PRO state now stay accurate after rename credit consumption.
- Fixed first-run folder monitoring defaults, preview fill mode, and Naming Blocks reset badge layout.

## [3.1.0.0] - 2026-05-26
### Improved
- Added broader design-file support, including PSD and Adobe Illustrator files.
- Improved previews and AI Rename handling for SVG, images, audio, video, documents, and batch workflows.
- Made provider errors clearer when cloud or local AI setup needs attention.
- Refined bundled templates and Store listing text across supported languages.


## [3.0.0.0] - 2026-05-24
### Added
- Added Smart Rename templates for common workflows like invoices, screenshots, documents, and media
- Added a naming blocks editor with detected fields, custom formatting, separators, and reusable presets
- Added a Statistics tab with rename activity totals and recent processing insights
- Added local Offline AI setup and BYOK cloud provider controls inside the Windows app
- Added broader analysis coverage for 98 supported file extensions, including audio, video, documents, spreadsheets, presentations, images, RAW files, subtitles, and text formats

### Improved
- Redesigned the Windows interface for closer parity with the latest Zush experience
- Improved Batch Rename progress, skipped-file summaries, retry behavior, and editable suggested names
- Improved document, PDF, video, audio, and image analysis inputs for more useful file names
- Improved PRO checkout, activation recovery, and subscription management
- Improved localized UI coverage across supported Store languages

### Fixed
- Fixed template restore, locked-template indicators, and naming block menu state
- Fixed batch rename elapsed timers and progress updates during long analysis runs
- Fixed Paddle checkout error handling before and after the checkout view loads


## [2.0.0] - 2026-05-11
### Added
- Expanded AI analysis support to 90+ image, document, spreadsheet, subtitle, RAW, and video formats
- Added video preview frames and subtitle context for smarter video file names
- Added per-format monitoring controls so watched folders can focus on the file types you actually want renamed
- Added Windows notifications for monitoring, hotkey rename completion, paused states, and setup issues

### Improved
- Refined Cloud/BYOK and Offline AI setup with clearer Ollama status, model refresh, and configuration prompts
- Improved image, PDF, document, spreadsheet, and RAW preview payloads for more accurate AI naming
- Completed localized Windows UI coverage across supported Store languages
- Polished drag and drop, quick rename, queue status, and metadata handling for closer macOS parity

### Fixed
- Pauses monitoring on provider quota, billing, model, or API key failures instead of repeatedly retrying doomed batches
- Fixed hotkey completion notifications when selected files are skipped or already processed
- Fixed Microsoft Store resource metadata for localized app names and Chinese Simplified package language
- Improved fallback behavior for unsupported previews and failed file analysis batches

## [1.2.1] - 2026-05-06
### Fixed
- Blocked Regenerate name and Retry analysis when a free account has reached its AI batch rename limit
- Kept existing analyzed names intact when a regenerate action is blocked by the usage limit
- Widened the checkout recovery dialog so the Still waiting message fits cleanly
- Fine-tuned rename result arrow alignment in AI Rename and Activity


## [1.2.0] - 2026-05-04
### Added
- German, French, Portuguese, Spanish, Dutch, Italian, Japanese, Korean, Chinese, and Hindi app localization
- Refreshed app icon assets

### Improved
- AI document analysis inputs
- Localized Windows UI parity

### Fixed
- Interface language now persists on shutdown
- Localization placeholders are now honored


## [1.1.0] - 2026-04-29
### Added
- Offline AI mode with local Ollama analysis
- Cloud and Local AI settings with model selection, refresh, and connection tests
- AI content reporting for generated file names

### Improved
- BYOK provider keys are validated by the backend and stored only on this Windows device
- Cloud AI privacy copy clarifies when selected previews and text are sent to the chosen AI provider
- PDF and document analysis now uses sampled preview pages for better payloads
- Monitoring can continue without internet when Offline AI mode is enabled

### Fixed
- Activation, analysis, BYOK, and billing portal flows now use device-authenticated backend calls
- Billing portal links can be opened or sent by email for authenticated devices


## [1.0.2] - 2026-04-25
### Added
- Automated Windows Store release flow that reads the live Store version, builds `.msixupload` packages, publishes GitHub releases, updates the Windows changelog, and submits the Store update.
- Purchase activation link in the PRO dialog for smoother checkout recovery.

### Improved
- App version display now reads from the packaged app version.
- PRO status refreshes after checkout, and upgrade actions stay hidden until license status finishes loading.

### Fixed
- Test assets now resolve from repo-relative paths for more reliable local and CI runs.


## [1.0.1] - 2026-04-24

### Added
- Initial Microsoft Store release of Zush for Windows
- AI-powered file renaming for images, PDFs, and supported documents
- Batch rename, folder monitoring, quick rename shortcut, and undo history
- Custom naming patterns, smart metadata, and BYOK support

## [1.0.0] - 2026-04-23

### Added
- First Windows Store build prepared for certification
- Store packaging, signing, and Microsoft Store identity setup
