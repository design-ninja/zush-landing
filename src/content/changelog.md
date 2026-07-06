# Changelog

## [3.6.3] - 2026-07-06

### Improved
- More reliable AI Rename when cloud requests time out
- More dependable folder monitoring during large file changes
- Zush now asks App Store users for a rating after successful Pro rename sessions

### Fixed
- Fixed startup setup after completing onboarding
- Fixed update prompts in the direct-download version
- Reduced unnecessary macOS keychain prompts

## [3.6.2] - 2026-07-04

### Improved
- Faster, more reliable batch renaming for large selections
- Clearer progress and failure summaries during AI Rename

### Fixed
- Fixed hangs and crashes during Finder tag updates
- Improved recovery when cloud AI providers fail or time out

## [3.6.1] - 2026-07-02

### Improved
- AI Rename and Monitor are more reliable during cloud processing

### Fixed
- Fixed a missing template picker icon on some macOS versions

## [3.6.0] - 2026-06-29

### Improved
- AI Rename can now add more files to an analyzed batch without starting over
- Auto language now follows your macOS language and shows which language will be used
- Batch progress and drag-and-drop feedback are clearer during AI Rename
- Settings opens more reliably from the app menu

### Fixed
- Fixed Auto language handling for Norwegian system language settings
- Fixed several batch rename edge cases when adding or removing files

## [3.5.4] - 2026-06-24

### Improved
- Naming Blocks now keep separate custom text parts in saved settings and presets
- Preview thumbnails are easier to see on light backgrounds

### Fixed
- Improved handling when a generated file name already exists

## [3.5.3] - 2026-06-23

### Improved
- Added one App sounds setting for all Zush sounds
- Improved checkout reliability during repeated purchase attempts

## [3.5.2] - 2026-06-18

### Improved
- More reliable AI Rename fallback when cloud AI needs to switch providers
- Better PDF analysis reliability during fallback processing

### Fixed
- Removed unavailable Groq models from Bring Your Own Key model choices

## [3.5.1] - 2026-06-14

### Improved
- More reliable activation and subscription status sync
- Smoother recovery when account access needs to refresh

### Fixed
- Fixed a startup issue that could require restarting Zush
- Fixed welcome window positioning on launch

## [3.5.0] - 2026-06-11

### Improved
- AI Rename now keeps generated names in the source language by default
- Faster batch renaming for large groups of files
- Clearing Activity now keeps your rename statistics intact
- Fewer unnecessary folder access prompts during direct rename

### Fixed
- Batch rename jobs now finish more reliably after large rename runs

## [3.4.6] - 2026-06-09

### Added
- New welcome screen with clearer privacy information

### Improved
- More consistent AI Rename language handling
- Better support for keeping useful details in file names
- Clearer subscription legal links in the purchase flow

### Fixed
- Fixed accented characters in AI-suggested file names

## [3.4.5] - 2026-06-08

### Improved
- More reliable AI Rename activity reporting
- Reduced background work during batch rename

### Fixed
- Fixed a crash when regenerating names during batch rename

## [3.4.4] - 2026-06-07

### Improved
- More reliable AI Rename progress and activity reporting
- Better diagnostics when rename workflows need troubleshooting

### Fixed
- Fixed usage reporting edge cases for batch rename workflows

## [3.4.3] - 2026-06-07

### Improved
- More reliable monitoring for cloud folders on macOS
- Clearer privacy settings and Full Disk Access guidance
- Better translations for settings and template labels

## [3.4.2] - 2026-05-31

### Improved
- More reliable folder access during batch rename
- Smoother first-run data consent flow

### Fixed
- Fixed file access prompts while renaming selected files
- Fixed unwanted Keychain prompts for existing users
- Fixed the welcome sound on first launch

## [3.4.1] - 2026-05-30

### Improved
- Faster first launch with fewer setup prompts
- More reliable AI fallback during busy usage periods
- More reliable audio and iWork document analysis

### Fixed
- Fixed unnecessary Keychain prompts during startup
- Fixed several batch rename edge cases

## [3.4.0] - 2026-05-29

### Added
- Choose a specific model for Bring Your Own Key providers

### Improved
- Smarter file names for documents, media, images, and design files
- Faster batch rename preparation
- More reliable Offline AI and Bring Your Own Key settings
- Free credits are now counted when files are actually renamed

### Fixed
- Fixed rename credit and batch rename edge cases
- Fixed provider settings getting out of sync
- Fixed several thumbnail and preview reliability issues

## [3.3.0] - 2026-05-25

### Improved
- Smarter AI names for documents, audio, video, images, and design files
- More reliable Bring Your Own Key analysis
- Better fallback handling when an AI provider is busy or unavailable
- Clearer usage limits, upgrade messages, and translations

### Fixed
- Fixed several batch rename edge cases
- Fixed audio analysis routing for Bring Your Own Key users

## [3.2.0] - 2026-05-24

### Improved
- Smarter file names for more document and media types
- Templates now focus on renaming first, with Finder tags and Spotlight metadata off by default
- Renaming can skip unused metadata work when tags or Spotlight metadata are disabled
- More reliable free-tier limit handling and quieter recoverable warnings

## [3.1.0] - 2026-05-21

### Improved
- Smarter content-aware AI file naming
- More reliable metadata handling for audio, video, and documents
- PRO prices and status now refresh more reliably
- Clearer PRO screen loading state in the App Store build

### Fixed
- Fixed purchase activation edge cases after upgrading to PRO
- Fixed file-backed naming blocks when local metadata is missing

## [3.0.0] - 2026-05-19

Zush 3 is live!

### Added
- Added 11 Templates for common file renaming workflows
- Added a brand-new file name builder with 145 Naming Blocks
- Added separator controls and drag-and-drop support for building file names
- Added processing statistics
- Added support for audio, iWork, and design files
- Added a monthly Zush PRO plan

### Improved
- Improved onboarding and Settings
- Improved file previews for documents, videos, audio, and design files
- Improved folder monitoring and batch rename progress
- Improved localization across the app

### Fixed
- Fixed several purchase, restore, and subscription management edge cases
- Fixed supported-format and preview handling issues

## [2.1.0] - 2026-05-11

### Added
- Added Hindi interface language

### Improved
- Improved quick rename errors when the backend is unavailable
- Improved batch rename analysis for spreadsheets, videos, and unusual file paths
- Improved monitoring behavior when AI provider keys, quotas, or models fail
- Reduced extra notifications while you are already working in Zush

### Fixed
- Fixed rename counts when some files fail
- Fixed version display in About

## [2.0.0] - 2026-05-08

### Added
- Added video analysis with sampled frames and subtitle context
- Added support for many more image, document, spreadsheet, presentation, subtitle, and video formats
- Added Rename with Zush from the file context menu

### Improved
- Improved Offline AI setup with clearer Ollama status and model checks
- Improved Settings navigation, drag-and-drop, and monitoring file type controls

### Fixed
- Fixed several layout, localization, and supported-format edge cases

## [1.9.1] - 2026-05-01

### Added
- Added app interface translations for more languages
- Added a language preference for the app

### Improved
- Improved PDF, document, spreadsheet, and presentation analysis
- Refreshed the app icon

### Fixed
- Fixed a Keychain prompt that could appear on launch
- Fixed localized AI error messages and missing UI translations

## [1.9.0] - 2026-04-27

### Added
- Added Offline AI mode with local Ollama analysis
- Added provider-scoped Bring Your Own Key setup for PRO users
- Added secure customer portal links for subscription management

### Improved
- Improved AI setup with clearer cloud and local mode controls
- Improved PDF and document analysis reliability
- Improved PRO onboarding, feature copy, and welcome screen guidance
- Improved usage limit display and AI error visibility

### Fixed
- Fixed BYOK provider keys persisting across app launches
- Fixed device authentication and activation rollout edge cases
- Fixed customer portal and purchase status syncing reliability
- Fixed missing-file and batch picker handling during rename flows

## [1.8.6] - 2026-04-22

### Added
- Undo now restores original Finder tags and comments
- Better placeholders for document, spreadsheet, and presentation files

### Improved
- Cleaner thumbnails in AI Rename, Activity, and queue views
- Smoother Settings and menu bar updates while Zush is working
- More reliable App Store consent flow during setup

### Fixed
- Removed the old AI category field from rename analysis
- Better recovery when Groq returns invalid structured responses

## [1.8.5] - 2026-04-19

### Added
- 🧹 Added a Clear action for activity history without changing files on disk
- ⚠️ Added missing-file warnings in Activity when renamed files were moved or deleted

### Improved
- ✨ Improved title regeneration with more varied rename suggestions
- 🎨 Refined the PRO upgrade flow, CTA visibility, and upgrade screen contrast
- 🧭 Moved shortcut settings into Preferences and stabilized the Settings window layout
- 📊 Added richer device and purchase metadata for status checks and purchase notifications

### Fixed
- 🛡️ Hardened App Store verification, purchase syncing, and backend status handling
- 🩹 Fixed Settings sidebar update glitches during view refreshes
- 🔄 Removed the extra onboarding prompt before starting AI Rename

## [1.8.4] - 2026-04-13

### Improved
- ⚡ Improved BYOK saving, provider switching, and sync reliability across supported AI providers
- 🧭 Updated Settings to a more native macOS split-view navigation with cleaner toolbar behavior
- 🔄 Improved monitor, hotkey, and AI Rename coordination to reduce duplicate or stuck processing

### Fixed
- 🐛 Fixed BYOK requests using out-of-sync provider state during analysis
- 🩹 Fixed Restore Purchases so local PRO entitlement refreshes more reliably
- 🔧 Fixed Groq timeout and fallback handling for faster recovery from provider stalls
- 🛡️ Fixed migration and network-monitor edge cases that could leave app state inconsistent

## [1.8.3] - 2026-04-04

### Added
- ✨ Added more naming-pattern title variants for filename formatting
- 🔄 Added `Check for Updates...` to the app menu

### Improved
- ⚡ Improved monitor reliability around pause, retry, and watched-folder recovery
- 🛡️ Hardened Supabase edge functions, config loading, and Paddle processing
- 📊 Improved AI Rename progress messaging and drop-zone clarity

### Fixed
- 🐛 Fixed monitor batches continuing after pause or connection loss
- 🩹 Fixed retry and undo flows so reverted files can be processed again
- 📂 Fixed watched-folder handling when monitored folders are deleted or unavailable
- 🔧 Fixed same-name renames failing in monitor and activity flows

## [1.8.2] - 2026-03-26

### Added
- 📄 Added `.xls` support in document analysis and extraction flows
- 📬 Added automated Telegram metrics digests for release monitoring

### Improved
- ⚡ Improved failed-processing retry flow and error visibility
- 📊 Improved metrics digest calculations and reporting consistency

### Fixed
- 🛡️ Hardened Paddle webhook signature validation and retry handling
- 🩹 Reduced noisy monitoring/Sentry events in backend processing

## [1.8.1] - 2026-03-22

### Added
- 📊 Added TelemetryDeck funnel tracking for first rename flow
- 🌍 Added country to new install Telegram notifications

### Improved
- ⚡ Kept AI Rename prompt visible until valid files are actually added
- 🔔 Added explicit consent and unsupported-file feedback in AI Rename
- 🧭 Added deferred dropped-file recovery through onboarding and consent setup

### Fixed
- 🐛 Fixed duplicate new install notifications from concurrent status checks
- 🩹 Reduced duplicate status refreshes during app launch
- 🔧 Captured processing failures in Sentry for analysis and rename flows

## [1.8.0] - 2026-03-19

### Added
- 🎉 Added AI-powered document renaming for supported files
- 📄 Added native PDF text extraction with visual fallback
- 🗂️ Expanded Zush from image rename to file rename

### Improved
- ⚡ Improved supported file handling across batch rename, monitor, and hotkey flows
- 🖼️ Restored PDF previews in the batch rename list
- ✏️ Updated app copy and onboarding text for file-based workflows

### Fixed
- 🐛 Fixed legacy `.doc` and `.ppt` fallback analysis
- 🐛 Fixed document placeholders and thumbnail handling in batch rename
- 🔧 Updated CI to match the local Xcode 26.3 toolchain

## [1.7.1] - 2026-03-18

### Fixed
- 🐛 Fix batch hangs and use PDF thumbnails
- 🐛 Stabilize app store IAP verification and clean legacy purchase objects
- 🐛 Retry analyze provider timeouts
- 🐛 Harden file hashing and analyze timeouts
- 🐛 Refine welcome copy
- 🐛 Restore data consent view wiring
- 🐛 Replace `any` types, extract subscription status helper
- 🐛 Keychain access refactoring

## [1.7.0] - 2026-03-08
### Added
- 🎉 Implemented custom AI prompts for image analysis
- 🔑 Implemented comprehensive data consent management
- 📦 Integrated StoreKit for promoted purchases in App Store version

### Improved  
- ⚡ Enhanced AI prompt customization and error handling
- ⚡ Enhanced data consent handling in welcome flow
- ⚡ Improved StoreKit product loading with retry logic
- ⚡ Improved SVG rendering for AI analysis and recognition

### Fixed
- 🐛 Restored AI prompt base for image analysis
- 🐛 Fixed custom output language not being applied correctly with custom AI prompts
- 🐛 Prevented onboarding window from freezing
- 🐛 Stabilized App Store IAP verification and cleaned up legacy objects
- 🐛 Show data agreement only for App Store builds
- 🔧 Adopted Liquid Glass toolbar on macOS 26

## [1.6.1] - 2026-02-09
### Added
- 🎉 Added appearance preference settings with UI integration

### Improved  
- ⚡ Refactored LicenseService for better tier management

### Fixed
- 🐛 Fixed settings window title visibility issue
- 🔧 Refactored SettingsTabView layout for better organization

## [1.6.0] - 2026-02-09
### Added
- 🎉 Introduced activity and processing tabs with UI enhancements
- 🖼️ Added brand color support and updated UI components
- 🔑 Added license upgrade option to settings
- 🔔 Updated app menu to reflect onboarding status

### Improved  
- ⚡ Enhanced onboarding flow and window management
- ⚡ Improved UsageScale layout in settings
- 🔄 Updated drop area behavior in BatchRenameSection

## [1.5.3] - 2026-02-05
### Added
- 🎉 Enhanced debug and settings management features added
- 🔑 App Store version now sandboxed with updated entitlements

### Improved  
- ⚡ Updated hotkey instructions for App Store version
- ⚡ Improved license and store kit services

### Fixed
- 🐛 Fixed project file references for Zush.storekit

## [1.5.2] - 2026-02-04
### Added
- 🎉 Unlocked all PRO features for FREE account (except BYOK)
- 🎉 Enhanced onboarding experience and debug features
- 🖼️ Added unit tests for AI analysis and bookmark persistence
- 🔑 Added debug section in preferences

### Improved  
- ⚡ Improved settings management in AppDelegate and SettingsViewModel

### Fixed
- 🐛 Adjusted Finder layout script for DMG creation

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
