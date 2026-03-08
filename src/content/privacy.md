This Privacy Policy explains how Zush ("Kirill Isachenko," "we," "us," or "our") collects, uses, and protects your information when you use our macOS application and related services.

Last updated: March 8, 2026

### 1. Information We Collect

**1.1 Image Data**
To provide AI-powered organizing and renaming features, Zush compresses images from your monitored folders to 512×512 pixels (JPEG format). This compressed copy is sent through Zush backend infrastructure to cloud AI services for analysis. Your original full-resolution files never leave your device.

**1.2 Prompt and Instruction Data**
If you use the AI prompt editor or other prompt customization features, the custom rename prompt text and custom tagging prompt text you enter are sent with the analysis request so the AI provider can follow your instructions.

**1.3 Device Identifier**
An anonymous device identifier (machine UUID) is sent with each analysis request for usage tracking, rate limiting, and license enforcement. This identifier does not contain personal information.

**1.4 Licensing and Usage Data**
We collect information necessary to manage your license and enforce usage limits:

- Email Address: Provided during the purchase process.
- License Status: Information about your PRO license (one-time purchase).
- Usage Counts: We track the number of AI-processed images to manage usage limits.

**1.5 Payment Information**
We do not store or process your credit card details. All payments are handled securely by our payment processors: [Paddle.com](https://www.paddle.com) (for direct purchases) and [Apple](https://www.apple.com/legal/privacy/) (for App Store purchases). Please refer to their respective privacy policies for details.

### 2. How We Use Your Information

We use the collected information to:

- Provide and maintain the Service.
- Process and verify your PRO license.
- Analyze images using AI to generate descriptive file names, tags, and metadata.
- Apply any custom rename or tagging instructions you choose to provide.
- Send you technical notices, updates, and support messages.

### 3. Data Processing and AI

Zush sends compressed image data to third-party AI services for analysis:

- **Default flow:** Compressed image data is sent via Zush servers to Groq (primary) and Google Gemini (fallback).
- **Bring Your Own Key (BYOK):** PRO users may configure their own API keys for Groq, Google Gemini, OpenAI, or Anthropic Claude. In BYOK mode, requests are still relayed through Zush backend infrastructure and then sent to the user's chosen provider using that API key.

**What is sent:** Compressed image data (512×512 JPEG), MIME type, language preference, regenerate and BYOK settings, an anonymous device identifier, and any custom rename or tagging prompt text you submit.

**What is NOT sent automatically:** Original full-resolution images and local folder paths are not sent as separate fields. File names are not intentionally sent as a separate field. However, if personal information appears inside the image itself or you type personal or identifying information into a custom prompt, that information may be processed as part of the request.

**Data retention:** Images and custom prompt text are processed for real-time analysis. Zush does not store image content after processing as part of normal operation, and does not intentionally store custom prompt text as an application feature. Submitted data may still be processed or retained by third-party AI providers according to their own terms. Your images and prompt text are not used by Zush to train our own models.

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
