# Changelog

## [1.5.1] - 2026-02-03
### Added
- 🖼️ Added tests for Zush functionality

### Improved  
- ⚡ Improved image analysis order in AI Service
- ✏️ Updated documentation with new features and architecture details

## [1.5.0] - 2026-02-01
### Added
- 🎉 Implemented lifetime credit model for Zush
- 🔑 API keys are now securely stored in Keychain
- 🖼️ Added Help menu link to zushapp.com
- 📦 Track app version in devices table

### Improved  
- ⚡ Enhanced AIService with better error handling and BYOK support
- ⚡ Streamlined API key clearing in BYOK section
- ⚡ Optimized device activation and rate limiting logic

### Fixed
- 🐛 Redirect PRO users to BYOK tab when limit is reached
- 🐛 Fixed BYOK banner visibility based on active setting
- 🐛 Hardened edge functions with encryption and rate limiting

## [1.4.0] - 2026-01-30
### Added
- 🎉 Implemented BYOK (Bring Your Own Key) for unlimited processing
- 🔑 Added support for OpenAI and Claude in BYOK
- 💎 Added Zush PRO one-time purchase option
- 🚀 Added force update options to release script

### Improved  
- ⚡ Enhanced DeviceService for better device ID management
- ⚡ Improved BYOK functionality and UI
- ⚡ Updated UI for simplified pricing model

### Fixed
- 🐛 Fixed checkout URL and simplified LicenseService logic
- 🐛 Fixed AI provider defaults for processed files
- 🐛 Hid 'Get More Credits' for PRO users

## [1.3.1] - 2026-01-30
### Added
- 📂 Added directory access for hotkey file processing in sandboxed environments
- 🔑 Implemented directory access for batch renaming in sandboxed environments

### Improved  
- ⚡ Improved asynchronous initialization and device ID retrieval

## [1.3.0] - 2026-01-29
### Added
- 🚀 Distribute Zush on the Mac App Store
- 🔑 Verify App Store subscriptions with Supabase function
- 📦 Upload dSYMs to Sentry during release for better crash reporting

## [1.2.9] - 2026-01-27

### Improved  
- ⚡ Improved folder validation by moving it to a background thread

### Fixed
- 🎨 Updated app icon assets for better consistency

## [1.2.8] - 2026-01-27
### Added
- 📂 Enhanced file monitoring and processing indicators

### Improved  
- ⚡ Improved folder monitoring and file processing
- 🎨 Updated color scheme in HotkeyRecorder and SuggestedShortcuts views
- 🔄 Streamlined activity display and undo functionality

### Fixed
- 🐛 Adjusted window height in build-dmg script for better layout

## [1.2.7] - 2026-01-25
### Added
- 🎉 Added quick rename shortcut for Finder files
- 🖼️ Added monitor options section with file prefix filter
- 🔑 Added symlink for Supabase Postgres best practices

### Improved  
- ⚡ Improved layout and text in Hotkey settings
- 🚀 Enhanced Finder file selection with timeout handling
- 📈 Optimized Supabase database performance and RLS policies
- 💚 Updated App logo

### Fixed
- 🐛 Prevented potential out-of-bounds access in HotkeyService
- 🎨 Updated design credit color in AboutTab view

## [1.2.6] - 2026-01-23
### Added
- 🚀 Added Sentry crash reporting and error analytics
- 🔑 Added missing database indexes for query optimization

### Improved  
- ⚡ Improved ViewModel guidelines with data persistence and accessibility

### Fixed
- 🐛 Addressed code review issues with constants and error handling

## [1.2.5] - 2026-01-22
### Added
- 🖼️ Implemented onboarding permissions view for new users
- 🔑 Allow subscription downgrades for existing users

### Improved  
- ⚡ Updated upgrade modal UI with plan comparison layout
- 🔔 Enhanced notification handling throughout the app
- 📈 Updated credit display and license status on activation

### Fixed
- 🐛 Reordered menu items and removed unnecessary key equivalents

## [1.2.4] - 2026-01-19
### Added
- 🎉 Credit-based pricing model for flexible usage
- 🔑 Support for original name token in file renaming
- 🖼️ Date format support for file renaming

### Improved  
- ⚡ Enhanced license upgrade flow with URL parameters
- ✏️ Clarified ProModal feature description for localization
- 📈 Improved email validation in customer portal

## [1.2.3] - 2026-01-18
### Added
- 🎉 Implemented monthly Pro Upgrade flow for users
- 🖼️ Added color scheme support and enhanced progress view styling

### Improved  
- ⚡ Enhanced SettingsViewModel with monitoring paths

### Fixed
- 🐛 Updated ProModal description for accurate language support count

## [1.2.2] - 2026-01-18
### Added
- 🎉 Implemented batch renaming functionality for improved file management
- 🔔 Added success notification for batch renaming operations
- 📂 Implemented folder monitoring during onboarding
- ✨ Introduced confetti animation for visual feedback
- 🔊 Added batch rename completion notification sound

### Improved  
- ⚡ Enhanced URL handling and ProModal display logic
- ⚡ Improved settings modal behavior with ProModal integration
- ⚡ Enhanced onboarding process with notifications

### Fixed
- 🐛 Fixed display issues in ActivationSuccessModal

## [1.2.1] - 2026-01-17
### Added
- 🎉 Implemented limit exceeded alert with dynamic messaging
- 🖼️ Added `onChange` handlers to save naming pattern settings

### Improved  
- ⚡ Optimized WindowManager settings window handling
- ⚡ Improved memory management for SwiftUI views

## [1.2.0] - 2026-01-16
### Added
- 🖼️ Added support for RAW image formats
- 💬 Added Canny feedback link in About Tab and update tab's design

### Improved  
- ⚡ Improved batch image analysis with individual processing
- ⚡ Enhanced batch analysis with timestamps and progress tracking
- ⚡ Improved AI service error handling with localized descriptions

### Fixed
- 🐛 Fixed deployment on build failure in release script

## [1.1.0] - 2026-01-16
### Added
- 🎉 Implemented batch file processing limits with alerts

### Improved  
- ⚡ Optimized image loading and thumbnail generation for better quality
- 🎨 Updated rename text field with hover and focus styling
- ✏️ Updated Spotlight feature descriptions to use 'metadata'

## [1.0.0] - 2026-01-13
### Added
- 🎉 Implemented folder monitoring with a new Monitor tab
- 🚀 Added Groq provider support for AI image analysis
- ✨ Introduced image thumbnail previews in file lists
- 🔔 Added dock icon visibility preference in settings
- 🖼️ Added output language setting for AI-generated file names
- 📂 Added drag & drop and custom scheme URL support for files

### Improved  
- ⚡ Enhanced batch renaming with analysis and progress tracking
- ⚡ Added pause functionality and status bar icon handling
- 🎨 Improved UI components for language selection and Pro features

## [0.9.0] - 2026-01-13
### Added
- 🎉 Added Groq provider support for enhanced AI processing
- 🖼️ Added image thumbnail previews in file list items
- 🔑 Added dock icon visibility preference with settings management
- 📂 Added folders monitoring toggle in settings
- 🌐 Added offline mode handling with network status monitoring

### Improved  
- ⚡ Improved file handling with drag & drop and custom scheme URLs

## [0.8.0] - 2024-01-09
### Added
- 🎉 Added SVG, PDF, and TIF file format support
- 🚀 Implemented activity tab with undo functionality
- 📦 Added chunked processing for batch rename
- 🖼️ Added analyzing text to batch rename items

### Improved  
- ⚡ Refactored about tab and updated naming pattern variables
- ⚡ Refined activity and batch rename UI
- ⚡ Simplified menu bar usage view with tier name and counter
- ⚡ Show settings window on launch and dock click
- ⚡ Unified file list items with shared FileListItemView component

### Fixed
- 🐛 Added white background for SVG and PDF rendering to JPEG
- 🐛 Prevented file re-processing after undo
- 🐛 Fixed open panel permissions on welcome screen

## [0.7.0] - 2026-01-08
### Added
- 🖼️ Show floating settings window after onboarding
- 🔔 Added notification, URL handling, window management services
- 📂 Added naming pattern and smart metadata sections to processing queue
- ✨ Added email validation and refined success message UI

### Improved  
- ⚡ Improved pro modal limit message and menu bar upgrade visibility

## [0.6.0] - 2026-01-05
### Added
- 🎉 Implemented free tier folder watch limits and pro status UI
- 🖼️ Added advanced filename pattern options with live preview

### Improved  
- ⚡ Reorganized settings tabs for better user experience
- 🛠️ Improved filename sanitization for better file handling

## [0.5.0] - 2024-01-05
### Added
- 🎉 We now ship Zush as a `.dmg` file instead of a `.zip` for easier installation.
- 🖼️ Zush now sends lower quality images for AI analysis to improve performance.
- 🔑 Pro features, the general tab, and the onboarding views now have a new primary button style.
- 🔔 You'll now receive update notifications and dock badge updates thanks to the new update management system.

### Improved  
- ⚡ Refined onboarding view layout and styling, including path shortening.

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
