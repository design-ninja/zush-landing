This Privacy Policy explains how Zush ("Kirill Isachenko," "we," "us," or "our") collects, uses, and protects your information when you use our macOS application and related services.

### 1. Information We Collect

**1.1 Image Data**
To provide AI-powered organizing and renaming features, Zush compresses images from your monitored folders to 512×512 pixels (JPEG format). By default, this compressed copy is sent via Zush servers to cloud AI services (Groq and Google Gemini) for analysis. If you enable BYOK, image data is sent to your selected provider using your API key. Your original files never leave your device.

**1.2 Device Identifier**
An anonymous device identifier (machine UUID) is sent with each analysis request for usage tracking, rate limiting, and license enforcement. This identifier does not contain personal information.

**1.3 Licensing and Usage Data**
We collect information necessary to manage your license and enforce usage limits:

- Email Address: Provided during the purchase process.
- License Status: Information about your PRO license (one-time purchase).
- Usage Counts: We track the number of AI-processed images to manage usage limits.

**1.4 Payment Information**
We do not store or process your credit card details. All payments are handled securely by our payment processors: [Paddle.com](https://www.paddle.com) (for direct purchases) and [Apple](https://www.apple.com/legal/privacy/) (for App Store purchases). Please refer to their respective privacy policies for details.

### 2. How We Use Your Information

We use the collected information to:

- Provide and maintain the Service.
- Process and verify your PRO license.
- Analyze images using AI to generate descriptive file names, tags, and metadata.
- Send you technical notices, updates, and support messages.

### 3. Data Processing and AI

Zush sends compressed image data to third-party AI services for analysis:

- **Default flow:** Compressed image data is sent via Zush servers to Groq (primary) and Google Gemini (fallback).
- **Bring Your Own Key (BYOK):** PRO users may configure their own API keys for Groq, Google Gemini, OpenAI, or Anthropic Claude, in which case image data is sent directly to the user's chosen provider.

**What is sent:** Compressed image data (512×512 JPEG), MIME type, language preference, and an anonymous device identifier.

**What is NOT sent:** Original images, file names, file paths, or any other personal information.

**Data retention:** Images are processed in real-time and are not stored on Zush servers. Your images are not used to train AI models.

### 4. Third-Party Services

We share data with the following service providers:

- **AI Providers:** Groq (primary), Google Gemini (fallback). With BYOK: optionally OpenAI or Anthropic Claude.
- **Cloud Infrastructure:** Supabase (backend database, licensing, and API relay).
- **Payment Processors:** [Paddle.com](https://www.paddle.com) (direct purchases), [Apple](https://www.apple.com/legal/privacy/) (App Store purchases).
- **Error Tracking:** Sentry (anonymous crash and error reports).

Each third-party provider processes data according to their own privacy policies. We encourage you to review their policies.

### 5. Data Security

We implement reasonable security measures to protect your information from unauthorized access, disclosure, or destruction. API keys provided via BYOK are encrypted before storage. However, no method of transmission over the Internet or electronic storage is 100% secure.

### 6. Your Rights

Depending on your location, you may have rights under data protection laws (like GDPR or CCPA), including the right to access, correct, or delete your personal data. To exercise these rights, please contact us.

### 7. Changes to This Policy

We may update this Privacy Policy from time to time. The "Last updated" date will reflect the most recent changes.

### 8. Contact Us

If you have any questions about this Privacy Policy, please contact us at: [support@zushapp.com](mailto:support@zushapp.com)
