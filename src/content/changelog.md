# Changelog

## [0.6.0] - 2026-01-05
### Added
- 🎉 Implemented free tier folder watch limits and pro status UI
- 🖼️ Added advanced filename pattern options with live preview
- 🔑 Added new views for license activation and pro features

### Improved  
- ⚡ Reorganized settings tabs for better user experience
- 🛠️ Improved filename sanitization for better file handling
- 🔄 Updated watcher logic for more reliable file monitoring

## [0.5.0] - 2024-01-05
### Added
- 🎉 We now ship Zush as a `.dmg` file instead of a `.zip` for easier installation.
- 🖼️ Zush now sends lower quality images for AI analysis to improve performance.
- 🔑 Pro features, the general tab, and the onboarding views now have a new primary button style.
- 🔔 You'll now receive update notifications and dock badge updates thanks to the new update management system.
- 🚀 Automated GitHub release creation and Sparkle feed updates in the release script.

### Improved  
- ⚡ Optimized AI analysis data fetching and included modification date in file hash for more accurate results.
- ⚡ Refined onboarding view layout and styling, including path shortening.
- 📈 Improved backend usage and added server timings to AI analysis responses.
- 🎨 Enhanced onboarding experience by moving state management to SettingsViewModel and updating menu bar/settings access based on its status.

### Fixed
- 🐛 Enabled logging for Gemini API errors to help diagnose issues.

## [0.4.0] - 2026-01-04
### Added
- 🎉 Welcome onboarding screen for first-time users
- 📂 Folder selection during onboarding
- 📍 Menu bar location hint for new users
- 🔔 Notification when monitoring starts
- ✏️ Change watched folder button in settings

### Fixed
- 🐛 Screenshot detection for macOS temp files

## [0.3.0] - 2026-01-02
### Added
- 🔄 Batch image analysis with processing queue
- 🖼️ Image compression service
- ⏱️ Rate limiting for API calls
- 🔑 License activation and management in Settings

### Improved
- 📊 Display AI usage count in General tab
- 🎨 Pro features view layout optimization
- 🔖 Exclude color names from AI tags
- 📁 Auto-detect macOS screenshot folder

## [0.2.0] - 2025-12-31
### Added
- ✨ Added automatic update checking via Sparkle
- 🔄 Check for Updates option in Settings and Menu Bar
- ⚙️ Automatic updates toggle

## [0.1.0] - 2025-12-30
### Initial Release
- 🚀 First public release of Zush
- 🤖 AI-powered image organization with automatic tagging
- 📁 Smart folder monitoring for new images
- 🏷️ Automatic Finder tags based on AI analysis
- 📝 Custom naming patterns for organized files
- 🎨 Beautiful native macOS interface
