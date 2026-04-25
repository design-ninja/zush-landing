# Changelog

## [1.0.2.0] - 2026-04-25
### Added
- Automated Windows Store release flow that reads the live Store version, builds `.msixupload` packages, publishes GitHub releases, updates the Windows changelog, and submits the Store update.
- Purchase activation link in the PRO dialog for smoother checkout recovery.

### Improved
- App version display now reads from the packaged app version.
- PRO status refreshes after checkout, and upgrade actions stay hidden until license status finishes loading.

### Fixed
- Test assets now resolve from repo-relative paths for more reliable local and CI runs.


## [1.0.1.0] - 2026-04-24

### Added
- Initial Microsoft Store release of Zush for Windows
- AI-powered file renaming for images, PDFs, and supported documents
- Batch rename, folder monitoring, quick rename shortcut, and undo history
- Custom naming patterns, smart metadata, and BYOK support

## [1.0.0.0] - 2026-04-23

### Added
- First Windows Store build prepared for certification
- Store packaging, signing, and Microsoft Store identity setup

