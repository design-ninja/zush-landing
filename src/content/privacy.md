This Privacy Policy explains how Zush ("Kirill Isachenko," "we," "us," or "our") collects, uses, and protects your information when you use our macOS application and related services.

Last updated: April 27, 2026

### 1. Information We Collect

**1.1 File Content Data**
To provide AI-powered organizing and renaming features, Zush processes the files you select or monitor:

- **Visual files** such as images, RAW previews, SVGs, and some PDFs may be converted into a compressed preview image before analysis.
- **Supported documents** such as text files, emails, spreadsheets, presentations, and some PDFs may be analyzed using extracted text or a compact content summary generated on your device before the request is sent.

Your original full-resolution files do not leave your device as part of normal cloud operation. If you enable Offline AI mode, supported file analysis runs through private local models via Ollama instead of Zush cloud or third-party AI providers.

**1.2 Prompt and Instruction Data**
If you use the AI prompt editor or other prompt customization features, the custom rename prompt text and custom tagging prompt text you enter are sent with the analysis request so the AI provider can follow your instructions.

**1.3 Device Identifier**
An anonymous device identifier (machine UUID) is sent with each analysis request for usage tracking, rate limiting, and license enforcement. This identifier does not contain personal information.

**1.4 Licensing and Usage Data**
We collect information necessary to manage your license and enforce usage limits:

- Email Address: Provided during the purchase process.
- License Status: Information about your PRO license (one-time purchase).
- Usage Counts: We track the number of AI-processed files to manage usage limits.

**1.5 Payment Information**
We do not store or process your credit card details. All payments are handled securely by our payment processors: [Paddle.com](https://www.paddle.com) (for direct purchases) and [Apple](https://www.apple.com/legal/privacy/) (for App Store purchases). Please refer to their respective privacy policies for details.

For App Store purchases, Zush sends StoreKit product and transaction identifiers to Zush backend to verify PRO entitlement, restore purchases, prevent abuse, and maintain account status.

### 2. How We Use Your Information

We use the collected information to:

- Provide and maintain the Service.
- Process and verify your PRO license.
- Analyze files using AI to generate descriptive file names, tags, and metadata.
- Apply any custom rename or tagging instructions you choose to provide.
- Send you technical notices, updates, and support messages.

### 3. Data Processing and AI

Zush sends file analysis payloads to third-party AI services for analysis:

- **Default flow:** File analysis requests are sent via Zush servers to Groq (primary) and Google Gemini (fallback).
- **Bring Your Own Key (BYOK):** PRO users may configure their own API keys for Groq, Google Gemini, OpenAI, or Anthropic Claude. BYOK keys are stored locally in macOS Keychain. In BYOK mode, the key is sent to Zush backend and the selected AI provider only to validate the key and process AI requests. Zush backend does not permanently store BYOK API keys.
- **Offline AI mode:** PRO users may process supported files with private local models via Ollama. In Offline AI mode, file analysis content is processed on the user's device and is not sent to Zush servers or third-party AI providers for analysis. Zush may still contact backend services for licensing, updates, support, or non-content operational checks.

**What is sent in Cloud and BYOK modes:** Depending on file type, this may include a compressed preview image, extracted document text, or a compact content summary, along with MIME type, file extension, language preference, regenerate and BYOK settings, an anonymous device identifier, and any custom rename or tagging prompt text you submit. Some requests may also include basic file metadata such as the file name needed to generate better rename suggestions.

**What is NOT sent automatically:** Original full-resolution file contents and local folder paths are not sent as separate fields. However, if personal information appears inside a file preview, extracted text, or you type personal or identifying information into a custom prompt, that information may be processed as part of the request.

**Data retention:** File previews, extracted text, summaries, and custom prompt text are processed for real-time analysis. Zush does not store file content after processing as part of normal operation, and does not intentionally store custom prompt text as an application feature. Submitted data may still be processed or retained by third-party AI providers according to their own terms. Your file content and prompt text are not used by Zush to train our own models.

### 4. Third-Party Services

We share data with the following service providers:

- **AI Providers:** Groq (primary), Google Gemini (fallback). With BYOK: optionally OpenAI or Anthropic Claude.
- **Local AI Runtime:** Ollama, if you install and enable Offline AI mode. Ollama runs on your device and is managed by your local Ollama installation.
- **Cloud Infrastructure:** Supabase (backend database, licensing, and API relay).
- **Payment Processors:** [Paddle.com](https://www.paddle.com) (direct purchases), [Apple](https://www.apple.com/legal/privacy/) (App Store purchases).
- **Error Tracking:** Sentry (anonymous crash and error reports).
- **Usage Analytics:** TelemetryDeck (privacy-focused product analytics).

Each third-party provider processes data according to their own privacy policies. We encourage you to review their policies.

### 5. Data Security

We implement reasonable security measures to protect your information from unauthorized access, disclosure, or destruction. BYOK API keys are stored locally in macOS Keychain and are not permanently stored in the Zush backend. When BYOK is used, the key is transmitted only as needed to validate the key and complete the selected provider request. However, no method of transmission over the Internet or electronic storage is 100% secure.

### 6. Your Rights

Depending on your location, you may have rights under data protection laws (like GDPR or CCPA), including the right to access, correct, or delete your personal data. To exercise these rights, please contact us.

### 7. Changes to This Policy

We may update this Privacy Policy from time to time. The "Last updated" date will reflect the most recent changes.

### 8. Contact Us

If you have any questions about this Privacy Policy, please contact us at: [support@zushapp.com](mailto:support@zushapp.com)
