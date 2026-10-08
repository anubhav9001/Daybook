# Daybook

Daybook is an accessible desktop assistant for managing Google Gmail/Calendar and Microsoft 365 Outlook/Calendar together. It reads your inbox and schedule, highlights messages that may need a response, and can prepare an editable reply draft using the conversation and your recent sent messages as context.

When a conversation may need a meeting, Daybook can suggest a title, participants, duration, and open times on your connected calendars. You review the invitees and time and confirm before the event is created. Daybook tracks responses and time changes for meetings created in the app and notifies you when it refreshes.

**[Download the latest Windows release](https://github.com/anubhav9001/Daybook/releases/latest)** · [Browse the source code](https://github.com/anubhav9001/Daybook/tree/main)

## Get started

1. [Download the latest Windows installer](https://github.com/anubhav9001/Daybook/releases/latest) and run the `Daybook-Setup-<version>.exe` asset.
2. Connect one or more Google and Microsoft 365 accounts.
3. Set up the analysis engine under **Settings**: use local Ollama, free-tier Groq, OpenRouter's free model router, Google Gemini, OpenAI, Anthropic Claude, or a Microsoft Azure AI Foundry deployment. Each cloud provider requires its own API key and consent; cloud providers receive the context described in the consent notice.
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

## Known issues

- Windows installers are unsigned. SmartScreen may warn, and users cannot verify the installer’s publisher signature. Signing remains deferred.
- OAuth mail/calendar permissions are broad enough to read or modify account data within the granted scopes. Use only on trusted devices and revoke the app’s access from Google/Microsoft account security settings when needed.
- Cloud AI providers receive the selected conversation and limited recent mail/calendar context when analysis is requested. Each provider’s retention, training, and regional handling policies apply. Ollama is the local-processing option, but its own service/model setup remains part of the trust boundary.
- Inbox classification uses local subject/preview rules and can miss or misclassify messages, including automated SharePoint notices.
- This source review did not include a Windows installer runtime assessment, third-party penetration test, screen-reader session, or complete contrast/WCAG measurement. Those checks remain before claiming full accessibility or security assurance.
- Provider/API outages and model mistakes can produce an error, missed classification, or inaccurate draft. Users should review all generated content.

## Current limitations

- Meeting availability checks use calendars connected to your own accounts. The app does not query guests' free/busy schedules.
- Response and reschedule tracking applies to meetings created by Daybook and updates when the app refreshes.
- Inbox categories are local heuristics based on the visible subject and message preview. They do not move mail in Gmail or Outlook and can miss replies that lack a clear question or request.
- Cloud AI providers require each user to supply their own API key unless the publisher builds and operates a secure shared AI service. Never embed a provider API key in a desktop installer.



## Security review (2026-10-07)

A static review covered Electron isolation and navigation, CSP, IPC sender validation, encrypted account and AI credentials, local error-log redaction, dependency metadata, and release automation. The app enables context isolation, renderer sandboxing, web security, denies renderer navigation/new windows/permissions, and requires explicit user action to save a reply as a draft.

Windows GitHub releases are currently unsigned, as signing is deferred. Windows may show a SmartScreen warning for downloaded installers. The release workflow runs `npm audit --audit-level=high` and JavaScript syntax checks before packaging. A passing workflow is required for publication; a future signing decision can add Authenticode signing. This static review is not a penetration test or a guarantee of security. Mail/calendar permissions are sensitive and should remain user-consented; never commit user tokens, AI keys, provider client secrets, or signing keys.
