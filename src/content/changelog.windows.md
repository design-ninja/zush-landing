# Changelog

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
