# Daybook — accessible desktop assistant for Gmail and Microsoft 365

[![Latest release](https://img.shields.io/github/v/release/anubhav9001/Daybook)](https://github.com/anubhav9001/Daybook/releases/latest)
[![Website](https://img.shields.io/badge/docs-anubhav9001.github.io%2FDaybook-blue)](https://anubhav9001.github.io/Daybook/)
[![Issues](https://img.shields.io/github/issues/anubhav9001/Daybook)](https://github.com/anubhav9001/Daybook/issues)
[![Discussions](https://img.shields.io/github/discussions/anubhav9001/Daybook)](https://github.com/anubhav9001/Daybook/discussions)
[![WCAG 2.2 AA](https://img.shields.io/badge/accessibility-WCAG%202.2%20AA-success)](https://anubhav9001.github.io/Daybook/accessibility.html)
[![Privacy](https://img.shields.io/badge/privacy-no%20telemetry-success)](https://anubhav9001.github.io/Daybook/privacy.html)

> **One Windows app** for your Gmail and Microsoft 365 mail and calendars. Screen-reader friendly throughout, with an optional on-device AI that drafts replies without your email ever leaving the PC.

**[Download](https://github.com/anubhav9001/Daybook/releases/latest)** ·
**[Website](https://anubhav9001.github.io/Daybook/)** ·
**[Install guide](https://anubhav9001.github.io/Daybook/install.html)** ·
**[Keyboard shortcuts](https://anubhav9001.github.io/Daybook/accessibility.html#keyboard-shortcuts)** ·
**[Permissions](https://anubhav9001.github.io/Daybook/scopes.html)** ·
**[Privacy](https://anubhav9001.github.io/Daybook/privacy.html)** ·
**[Report a bug](https://github.com/anubhav9001/Daybook/issues/new/choose)**

Daybook is an accessible desktop assistant for managing Google Gmail/Calendar and Microsoft 365 Outlook/Calendar together. It reads your inbox and schedule, highlights messages that may need a response, and can prepare an editable reply draft using the conversation and your recent sent messages as context.

When a conversation may need a meeting, Daybook can suggest a title, participants, duration, and open times on your connected calendars, and checks invitees' busy times when their calendars are shared with you. You review the invitees and time and confirm before the event is created. Daybook tracks responses and time changes for meetings created in the app and notifies you when it refreshes.

Version 0.5.0 adds:

- **Smarter inbox sorting** with the built-in private AI, on your computer only.
- **Waiting on others**: sent mail nobody has answered, with one-click follow-up drafts.
- **Done and Snooze**, which change only Daybook's view.
- **Search** across all connected accounts.
- **A system tray icon**, with notifications for priority senders.
- **Draft controls**: tone, length, and language, plus saved replies.
- **Faster on-device replies** that appear as they are written.
- **A clearer, neutral dark theme.**

**[Download the latest Windows release](https://github.com/anubhav9001/Daybook/releases/latest)** · [Browse the source code](https://github.com/anubhav9001/Daybook/tree/main)

## Get started

1. [Download the latest Windows installer](https://github.com/anubhav9001/Daybook/releases/latest) and run the `Daybook-Setup-<version>.exe` asset.
2. Connect one or more Google and Microsoft 365 accounts.
3. Choose **Set up private AI** on the dashboard. Daybook downloads a free, open-source Qwen3 model sized for your computer (one time, 2.5–5 GB), verifies it, and switches reply suggestions to it automatically. It runs on your computer with the bundled llama.cpp engine: no account, API key, or usage cost, and email never leaves the PC. Alternatively, under **Settings** you can use local Ollama, or open-weight models hosted in the cloud with nothing to download: Cerebras (free trial), SambaNova Cloud (free tier), Mistral (free Experiment plan), Groq (free tier), OpenRouter's free model router, Hugging Face (pay as you go). Commercial options are Google Gemini, OpenAI, Anthropic Claude, or a Microsoft Azure AI Foundry deployment. Each cloud provider requires its own API key and consent; cloud providers receive the context described in the consent notice.
4. Review a suggested reply, edit it, and save it as a draft. Daybook never sends the email for you.

Use the Account selector to switch between connected mail/calendar accounts. Help contains feature guides, About/version details, version history, and an update check. The publisher configures Google and Microsoft OAuth credentials once in the packaged app; end users do not enter OAuth client IDs. See [SETUP.md](SETUP.md) for publisher setup, AI choices, permissions, privacy behavior, build instructions, and current release limitations. Settings is available in the File menu and with Ctrl+,. See [SECURITY_AUDIT.md](SECURITY_AUDIT.md) for the current security audit and remaining risks.

## Download and updates

[Open the latest release](https://github.com/anubhav9001/Daybook/releases/latest) to download the Windows installer. Windows installers and automatic updates are published through GitHub Releases. The release workflow runs when the publisher pushes a version tag such as `v0.3.0`; it builds and publishes the installer and update metadata. See [SETUP.md](SETUP.md#github-release-setup) for one-time publisher setup. Install the NSIS installer for automatic update support; updates are downloaded in the background and require confirmation before installation.

## Contributions and reuse

Please contact the repository owner and receive approval before submitting a contribution for inclusion in Daybook or reusing, modifying, redistributing, or developing a derivative of this project. Contributions are reviewed, and only the owner can approve changes to the upstream repository. No separate software license is provided.

**Public repository limitation:** because this repository is public, GitHub allows visitors to view and fork it under GitHub's Terms of Service. A notice here cannot technically require approval before someone forks or makes a local copy. To restrict access to the source and control who can copy it, the repository would need to be private; that would also restrict public access to the release downloads.

## Accessibility and security features

The latest source includes OS-aware System/Light/Dark themes; labeled, keyboard-operable navigation and account controls; visible focus indicators; dialogs that contain keyboard focus, close with Escape, and return focus to the opener; keyboard-operable inbox tabs with an announced panel; live status/error announcements; scrollable dialogs; and reduced-motion support. Settings exposes theme selection under Accessibility. These are implementation features, not a formal WCAG conformance claim.

Security controls include Electron context isolation, renderer sandboxing, disabled Node integration, restrictive Content Security Policy, main-frame IPC sender checks, denied navigation/popups/permission prompts, HTTPS provider endpoints and redirect rejection, OAuth state plus PKCE and loopback callbacks, OS-backed encrypted local credentials/settings, redaction and bounded retention for the local error log, and explicit review before saving drafts or creating meetings. Daybook does not send email automatically. Cloud AI is opt-in per provider and receives only the context described in the consent notice.

See the [security and accessibility audit](SECURITY_AUDIT.md) for scope, verification limits, and known issues.

## Built-in private AI

The Windows installer bundles the open-source [llama.cpp](https://github.com/ggml-org/llama.cpp) server (MIT license, build b11500, SHA-256 pinned). Models are not bundled, because they are 2.5–18.6 GB, larger than a GitHub release asset allows, and would make every update huge. Instead, Daybook offers a one-click download on first launch:

| Model | Download | Suggested for |
| --- | --- | --- |
| Qwen3 4B (Q4_K_M) | 2.5 GB | 8–15 GB memory |
| Qwen3 8B (Q4_K_M) | 5.0 GB | 16 GB memory or more (default when available) |
| Qwen3 30B-A3B (Q4_K_M) | 18.6 GB | 32 GB memory or more |

All are Apache-2.0 models from Qwen's official Hugging Face repositories. Each file is checked against a fixed SHA-256 fingerprint before use, interrupted downloads resume, and after download the AI works offline. The engine starts when a suggestion is requested, listens only on 127.0.0.1 with a random port and per-session key, and uses a graphics card automatically when Vulkan is available. It runs at below-normal priority so other apps stay responsive. **Settings → Built-in private AI** controls how soon the model is unloaded from memory after a suggestion (right away, 2, 10 or 30 minutes; default 10) and how much of the processor it uses (Light, Balanced or Full speed).

## Known issues

- Windows installers are unsigned. SmartScreen may warn, and users cannot verify the installer’s publisher signature. Signing remains deferred.
- OAuth mail/calendar permissions are broad enough to read or modify account data within the granted scopes. Use only on trusted devices and revoke the app’s access from Google/Microsoft account security settings when needed.
- Cloud AI providers receive the selected conversation and limited recent mail/calendar context when analysis is requested. Each provider’s retention, training, and regional handling policies apply. Ollama is the local-processing option, but its own service/model setup remains part of the trust boundary.
- Inbox sorting uses the built-in private AI when it is installed, and local subject/preview rules otherwise. Both can miss or misclassify messages.
- This source review did not include a Windows installer runtime assessment, third-party penetration test, screen-reader session, or complete contrast/WCAG measurement. Those checks remain before claiming full accessibility or security assurance.
- A moderate npm advisory currently affects the transitive build-tool dependency chain through sprintf-js. No patched sprintf-js release is available as of this audit; the affected package is used through Electron build tooling, not directly by Daybook's renderer features. The GitHub workflow reports high-severity-and-above findings as blocking.
- Provider/API outages and model mistakes can produce an error, missed classification, or inaccurate draft. Users should review all generated content.

## Current limitations

- Invitee availability can be checked only when the invitee's calendar is shared with you (usually the same organization). Daybook says which invitees it could not check. Google accounts connected before 0.5.0 need to reconnect once to allow it.
- Response and reschedule tracking applies to meetings created by Daybook and updates when the app refreshes.
- Inbox categories, Done, and Snooze never move or change mail in Gmail or Outlook. Waiting on others checks the last 30 days, and in Outlook only replies that arrive in the Inbox.
- Cloud AI providers require each user to supply their own API key unless the publisher builds and operates a secure shared AI service. Never embed a provider API key in a desktop installer.



## Security review (2026-10-07)

A static review covered Electron isolation and navigation, CSP, IPC sender validation, encrypted account and AI credentials, local error-log redaction, dependency metadata, and release automation. The app enables context isolation, renderer sandboxing, web security, denies renderer navigation/new windows/permissions, and requires explicit user action to save a reply as a draft.

Windows GitHub releases are currently unsigned, as signing is deferred. Windows may show a SmartScreen warning for downloaded installers. The release workflow runs `npm audit --audit-level=high` and JavaScript syntax checks before packaging. A passing workflow is required for publication; a future signing decision can add Authenticode signing. This static review is not a penetration test or a guarantee of security. Mail/calendar permissions are sensitive and should remain user-consented; never commit user tokens, AI keys, provider client secrets, or signing keys.
