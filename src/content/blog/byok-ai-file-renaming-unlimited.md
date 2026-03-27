---
title: "BYOK: How to Get Unlimited AI File Renames with Your Own API Key"
description: "Learn how to use your own API key for unlimited AI file renaming in Zush. Compare Gemini, Groq, OpenAI, and Claude providers with cost breakdowns."
date: "2026-03-23"
slug: "byok-ai-file-renaming-unlimited"
tags: "unlimited ai file renaming, bring your own key file renamer, BYOK AI renamer, API key file renaming, Zush BYOK setup"
tldr: "Zush's BYOK feature lets you connect your own API key from Gemini, Groq, OpenAI, or Claude for unlimited AI file renaming. Two of the four providers offer free tiers, and paid usage costs roughly $0.001 per rename or less."
---

Zush includes 50 free AI renames per month on the free plan, and 10,000 renames with the Pro plan at $10 one-time. For most people, that is more than enough. But if you process large photo libraries, manage client assets at scale, or simply want to remove any cap entirely, there is a third option: bring your own API key.

BYOK (Bring Your Own Key) means you connect your personal API key from a supported AI provider directly to [Zush](https://zushapp.com/ai-file-renamer). Zush sends the file content to the provider under your account, the provider returns a descriptive name, and you pay the provider directly at their standard API rates. There is no Zush markup and no rename limit.

## What BYOK means in practice

When you use Zush's built-in credits, the AI processing happens through Zush's infrastructure. That is convenient but capped. BYOK flips the model: Zush acts as the client, your API key provides the access, and the AI provider handles the processing.

The practical result:

- No monthly or lifetime rename limits
- You pay the AI provider directly at their published rates
- You choose which provider and model to use
- You can switch providers at any time
- Your API key stays on your machine and is never sent to Zush's servers

## Why BYOK matters

### Unlimited processing

The most obvious benefit. Whether you need to rename 500 files this week or 50,000 over the next year, there is no cap. The only limit is your API quota with the provider, and most providers offer generous limits or no hard cap at all.

### Cost control

You see exactly what each rename costs because it appears on your provider's dashboard. There is no bundled pricing or opaque credit system. For high-volume users, this is often cheaper per rename than any credit-based plan.

### Provider choice

Different AI providers have different strengths. Some are faster, some are cheaper, some handle certain image types better. BYOK lets you pick the one that fits your workflow and switch if your needs change.

### Privacy preferences

Some users prefer to control which AI provider processes their files. BYOK gives you that choice. You select the provider, you read their privacy policy, and you manage the relationship directly.

## Supported providers

Zush supports four AI providers for BYOK. Each has different pricing, speed, and availability characteristics.

### Gemini (Google)

Gemini is Google's multimodal AI. It handles images and documents well, and it is one of the most cost-effective options for file renaming.

- **Free tier**: Yes. Google offers a free tier for the Gemini API with generous rate limits for personal use.
- **Paid pricing**: Very low per-request cost once you exceed the free tier.
- **Speed**: Fast. Google's infrastructure handles requests quickly.
- **Best for**: Users who want to start with zero cost and scale up only if needed.

### Groq

Groq runs AI inference on custom hardware designed for speed. It is one of the fastest providers available.

- **Free tier**: Yes. Groq offers a free tier with rate limits suitable for moderate usage.
- **Paid pricing**: Competitive per-token pricing at higher volumes.
- **Speed**: Very fast. Groq's hardware is optimized for low-latency inference.
- **Best for**: Users who prioritize speed and process files in large batches.

### OpenAI

OpenAI provides GPT-4o and related models with strong image understanding capabilities.

- **Free tier**: No free tier, but new accounts may receive initial credits.
- **Paid pricing**: Approximately $0.001 per rename or less, depending on the model and image size.
- **Speed**: Good. Response times are consistent and reliable.
- **Best for**: Users who already have an OpenAI account or prefer GPT-based models.

### Claude (Anthropic)

Claude is Anthropic's AI with strong visual understanding and detailed analysis capabilities.

- **Free tier**: No free tier, but new accounts may receive initial credits.
- **Paid pricing**: Approximately $0.001 per rename or less, depending on the model and file type.
- **Speed**: Good. Particularly strong at nuanced image description.
- **Best for**: Users who want detailed, accurate content descriptions, especially for complex images and documents.

## Cost breakdown: what unlimited actually costs

Here is what typical usage looks like in real dollar terms. These estimates assume standard image and document sizes for file renaming operations.

| Provider | 100 renames/month | 500 renames/month | 2,000 renames/month |
|---|---|---|---|
| Gemini | Free (within free tier) | Free to ~$0.10 | ~$0.20-$0.50 |
| Groq | Free (within free tier) | Free to ~$0.10 | ~$0.15-$0.40 |
| OpenAI | ~$0.10 | ~$0.50 | ~$1.50-$2.00 |
| Claude | ~$0.10 | ~$0.50 | ~$1.50-$2.00 |

For context, 500 renames per month covers most active Mac users who take daily screenshots, download files regularly, and import photos weekly. The cost at that volume ranges from free to roughly fifty cents per month.

Even at 2,000 renames per month, which represents heavy professional usage, the total cost is under two dollars with any provider.

## Step-by-step setup for each provider

For the quick-start version of these instructions inside Zush, see the [BYOK setup guide](https://zushapp.com/byok-setup).

### Setting up Gemini

1. Go to [Google AI Studio](https://aistudio.google.com/) and sign in with your Google account
2. Navigate to the API keys section and create a new API key
3. Copy the key
4. Open Zush, go to Settings, and select the BYOK / API Key section
5. Choose Gemini as your provider and paste the key
6. Test the connection with a sample rename

That is the entire setup. Renames will now use your Gemini key with no monthly limit.

### Setting up Groq

1. Go to [Groq Console](https://console.groq.com/) and create an account
2. Navigate to API Keys and generate a new key
3. Copy the key
4. In Zush Settings, select Groq as your provider and paste the key
5. Test with a sample file

Groq's free tier is generous enough that many users never need to add a payment method.

### Setting up OpenAI

1. Go to [OpenAI Platform](https://platform.openai.com/) and sign in or create an account
2. Navigate to API keys and create a new secret key
3. Add a payment method if you do not have initial credits
4. Copy the key
5. In Zush Settings, select OpenAI as your provider and paste the key
6. Test with a sample rename

OpenAI charges per token, so costs scale linearly with usage. For file renaming, each request is small.

### Setting up Claude

1. Go to [Anthropic Console](https://console.anthropic.com/) and create an account
2. Navigate to API Keys and generate a new key
3. Add a payment method to your account
4. Copy the key
5. In Zush Settings, select Claude as your provider and paste the key
6. Test with a sample file

Claude tends to produce detailed, nuanced descriptions, which translates to more descriptive filenames.

## When to use BYOK vs. credits

BYOK is not always the right choice. Here is how to decide.

### Use the free plan (50 renames/month) when:

- You rename files occasionally, not daily
- You mainly use Zush for one-off cleanup projects
- You want zero setup and zero cost

### Use Pro credits (10,000 renames for $10) when:

- You rename files regularly but not at massive scale
- You prefer a one-time payment over managing an API key
- You do not want to think about per-rename costs

### Use BYOK when:

- You process large volumes of files (hundreds or thousands per month)
- You want no cap on renames under any circumstances
- You already have an API key with a supported provider
- You want to choose or switch your AI provider
- You want direct cost visibility through your provider's billing dashboard

## Tips for choosing a provider

### Start with Gemini or Groq if cost matters most

Both offer free tiers that cover light to moderate usage. You can rename hundreds of files per month without paying anything. If you are not sure whether you need BYOK, starting with one of these lets you test the workflow at zero cost.

### Choose OpenAI if you want broad model compatibility

OpenAI's GPT-4o has been widely tested across many image types and document formats. If you process a wide variety of files and want predictable results, OpenAI is a safe default.

### Choose Claude if description quality is your priority

Claude tends to generate more nuanced and context-rich descriptions. If you work with complex images, detailed documents, or files where the filename really needs to capture subtle content, Claude is a strong pick.

### Switch providers any time

You are not locked in. You can change your API key or provider in Zush Settings at any point. Some users start with Gemini's free tier and switch to OpenAI or Claude later when they want different output characteristics. Your rename history and naming patterns are preserved regardless of which provider you use.

## BYOK and folder monitoring

BYOK pairs naturally with folder monitoring. When you combine the two, you get a fully automatic, unlimited rename pipeline: files arrive in monitored folders, Zush detects them, sends them to your chosen AI provider, and renames them with zero manual input and zero rename cap.

This is the most hands-off setup available. For a detailed guide on folder monitoring, see the post on [automatic file renaming with folder monitoring](/blog/folder-monitoring-automatic-file-renaming).

## Security and privacy

Your API key is stored locally on your Mac and is only sent to the AI provider you selected. File content goes directly to the provider's API endpoint for analysis. Review your chosen provider's API data policy if privacy is a deciding factor.

## Conclusion

BYOK removes the last constraint on AI file renaming. If you have already decided that content-aware renaming is worth using, and the only question is volume, connecting your own API key gives you unlimited capacity at a cost that rounds to zero for most users.

For a comparison of Zush against other tools in this category, see [Best AI File Renamer Tools for Mac Compared](/blog/best-ai-file-renamer-tools-mac-compared). To get started with [Zush](https://zushapp.com/ai-file-renamer), the free plan includes 50 renames per month, Pro gives you 10,000 for $10, and BYOK opens the door to unlimited.
