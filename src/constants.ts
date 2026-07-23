// App URLs
export const MAC_INSTALLER_URL = "https://zushapp.com/releases/Zush.dmg";
export const MAC_DOWNLOAD_TRACKING_URL = "https://zushapp.com/download/mac";
export const DOWNLOAD_URL = MAC_DOWNLOAD_TRACKING_URL;
export const APP_STORE_URL = "https://apps.apple.com/app/zush/id6758432449";
export const APP_STORE_PROTOCOL_URL = "macappstore://apps.apple.com/app/zush/id6758432449";
export const WINDOWS_STORE_URL = "https://apps.microsoft.com/detail/9ND4WVZSDQ3X";
export const WINDOWS_STORE_PROTOCOL_URL = "ms-windows-store://pdp/?ProductId=9ND4WVZSDQ3X";
export const HOMEBREW_CASK_URL = "https://formulae.brew.sh/cask/zush";
export const GITHUB_RELEASES_URL = "https://github.com/design-ninja/zush-releases";
export const SUPPORT_EMAIL = "support@zushapp.com";
export const FREE_DOWNLOAD_BADGE_LABEL = "FREE";
export const MAC_APP_VERSION = "3.8.1";
export const WINDOWS_APP_VERSION = "3.6.0.0";
export const PRODUCT_FACTS_REVIEWED_AT = "2026-07-22";

// System requirements
export const MIN_MACOS_VERSION = "Sequoia and newer";
export const MIN_WINDOWS_VERSION = "Windows 10 and newer";

// Config
export const APP_CONFIG = {
  free_tier_limit: 50,
  image_extensions: [
    "png",
    "jpg",
    "jpeg",
    "jpe",
    "webp",
    "avif",
    "gif",
    "bmp",
    "dib",
    "tiff",
    "tif",
    "heic",
    "heics",
    "heif",
    "svg",
    "pdf",
    "jp2",
    "jpf",
    "jpx",
    "j2k",
    "j2c",
    "exr",
    "tga",
    "ico",
    "icns",
    "pbm",
    "pgm",
    "ppm",
    "pfm",
    "cr2",
    "cr3",
    "nef",
    "arw",
    "dng",
    "orf",
    "raf",
    "rw2",
    "pef",
    "srw",
    "sr2",
    "raw",
  ],
  design_extensions: [
    "sketch",
    "fig",
    "ai",
    "psd",
  ],
  document_extensions: [
    "pdf",
    "txt",
    "md",
    "json",
    "eml",
    "csv",
    "tsv",
    "log",
    "xml",
    "yaml",
    "yml",
    "srt",
    "vtt",
    "rtf",
    "odt",
    "ods",
    "odp",
    "pages",
    "numbers",
    "key",
    "doc",
    "docx",
    "docm",
    "dotx",
    "dotm",
    "ppt",
    "pptx",
    "pptm",
    "potx",
    "potm",
    "ppsx",
    "ppsm",
    "xls",
    "xlsx",
    "xlsm",
    "xltx",
    "xltm",
  ],
  video_extensions: [
    "mp4",
    "mov",
    "qt",
    "m4v",
    "mpeg",
    "mpg",
    "m2v",
    "3gp",
    "3gpp",
    "3g2",
    "3gp2",
    "dv",
    "ts",
    "mts",
    "m2ts",
    "vob",
  ],
  audio_extensions: [
    "mp3",
    "m4a",
    "wav",
    "flac",
    "ogg",
    "webm",
    "mpga",
  ],
  ai_provider: "Groq",
  refund_period_days: 14,
  min_macos_version: "15.0",
  min_macos_name: "Sequoia",
};

export const SUPPORTED_FORMAT_EXTENSIONS = Array.from(new Set([
  ...APP_CONFIG.image_extensions,
  ...APP_CONFIG.design_extensions,
  ...APP_CONFIG.document_extensions,
  ...APP_CONFIG.video_extensions,
  ...APP_CONFIG.audio_extensions,
])).sort();

export const SUPPORTED_FORMAT_COUNT = SUPPORTED_FORMAT_EXTENSIONS.length;
