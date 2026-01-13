# Changelog

## [1.0.0] - 2026-01-13
### Added
- 🎉 Implemented folder monitoring with a new Monitor tab
- 🚀 Added Groq provider support for AI image analysis
- ✨ Introduced image thumbnail previews in file lists
- 📦 Added DMG build scripts with customizable options
- 🔔 Added dock icon visibility preference in settings
- 🔑 Implemented magic link functionality for user authentication
- 🖼️ Added output language setting for AI-generated file names
- 📂 Added drag & drop and custom scheme URL support for files
- 💎 Added subscription management feature with Paddle integration
- 🆕 Added initial Supabase Edge Functions for image analysis

### Improved  
- ⚡ Enhanced batch renaming with analysis and progress tracking
- ⚡ Improved file handling and processing efficiency
- ⚡ Optimized license status fetching with caching
- ⚡ Enhanced auto-activation logic with purchase checks
- ⚡ Streamlined file processing logic and error handling
- ⚡ Improved usage info logging with pro status handling
- ⚡ Enhanced application initialization logging
- ⚡ Added pause functionality and status bar icon handling
- 🎨 Improved UI components for language selection and Pro features
- 🎨 Streamlined email variable handling in activation emails
- 📈 Force refresh remote config on app launch

### Fixed
- 🐛 Prevented duplicate observer subscriptions
- 🐛 Improved subscription status handling in Paddle webhook
- 🔧 Updated checkout URL to include pricing hash
- 🔧 Fixed magic link RLS performance
- 🛡️ Optimized file processing by skipping hidden files early

## [0.9.0] - 2026-01-13
### Added
- 🎉 Added Groq provider support for enhanced AI processing
- 🖼️ Added image thumbnail previews in file list items
- 📦 Added DMG build scripts with customizable options
- 🔑 Added dock icon visibility preference with settings management
- 🔑 Implemented magic link functionality for account activation
- 🔔 Added subscription management feature with Paddle integration
- 📂 Added folders monitoring toggle in settings
- 🌐 Added offline mode handling with network status monitoring
- 💎 Added comprehensive code quality review checklist

### Improved  
- ⚡ Improved file handling with drag & drop and custom scheme URLs
- ⚡ Improved file handling and processing efficiency
- ⚡ Optimized license status fetching with caching
- ⚡ Improved auto-activation logic and subscription status handling
- ⚡ Streamlined file processing logic and enhanced error handling
- ⚡ Optimized file processing by skipping hidden files early
- ⚡ Enhanced application initialization logging and file watcher management
- ⚡ Improved usage info logging for pro status and limits
- ⚡ Force refresh remote config on app launch

### Fixed
- 🐛 Prevent duplicate observer subscriptions
- 🐛 Enhanced subscription status handling in Paddle webhook
- 🐛 Updated checkout URL to new pricing page

## [0.8.0] - 2024-01-09
### Added
- 🎉 Added SVG, PDF, and TIF file format support
- 🚀 Implemented activity tab with undo functionality
- 📦 Added chunked processing for batch rename
- 🖼️ Added analyzing text to batch rename items
- 🔑 Added dry-run support to release script

### Improved  
- ⚡ Refactored about tab and updated naming pattern variables
- ⚡ Refined activity and batch rename UI
- ⚡ Simplified menu bar usage view with tier name and counter
- ⚡ Show settings window on launch and dock click
- ⚡ Unified file list items with shared FileListItemView component

### Fixed
- 🐛 Added white background for SVG and PDF rendering to JPEG
- 🐛 Prevented file re-processing after undo
- 🐛 Fixed batch rename limit
- 🐛 Fixed open panel permissions on welcome screen

## [0.7.0] - 2026-01-08
### Added
- 🎉 Implemented Paddle integration and custom license management
- 🔑 Added magic link activation flow, removing license key activation
- 🖼️ Show floating settings window after onboarding
- 🔔 Added notification, URL handling, window management services
- 📦 Added in-app checkout view and integrated it into pro modal
- 📂 Added naming pattern and smart metadata sections to processing queue
- ✨ Added email validation and refined success message UI

### Improved  
- ⚡ Refined device activation logic and normalized device IDs
- ⚡ Improved pro modal limit message and menu bar upgrade visibility
- ⚡ Enhanced Supabase functions with shared CORS and response utilities
- ⚡ Use template objects for email sending with updated IDs

### Fixed
- 🐛 Fixed checkout URL to use landing page proxy
- 🐛 Fixed Supabase functions issues

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
