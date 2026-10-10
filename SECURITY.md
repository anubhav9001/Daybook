# Security Policy

## Reporting a vulnerability

If you believe you have found a security issue in Daybook — the desktop app, its installer, the OAuth flow, or anything in this repository — please report it privately.

**Preferred:** use GitHub's [private vulnerability reporting](https://github.com/anubhav9001/Daybook/security/advisories/new) on this repository. That channel is encrypted and keeps the details between you and the maintainer until a fix is ready.

**Alternative:** email **[FILL IN A PUBLIC CONTACT EMAIL]** with the subject `Daybook security`.

Please do **not** open a public GitHub issue for a security vulnerability.

## What to include

- The affected version(s) of Daybook.
- A clear description of the issue and its impact.
- Steps to reproduce (minimal example preferred).
- Any proof-of-concept, logs, or screenshots that help us confirm the issue.
- Your name and contact for follow-up (we will credit you by the name you choose, or keep you anonymous if you prefer).

## What to expect

- Acknowledgement within **5 business days**.
- A triage assessment within **10 business days**.
- A fix or clear remediation plan on a schedule that matches the severity.
- Public disclosure coordinated with you, through a GitHub Security Advisory, once a release containing the fix is available.

## Scope

In scope:
- The Daybook desktop application and installer
- OAuth and token handling
- Local credential and cache storage
- Dependency vulnerabilities that affect the shipped app
- This repository's build and release pipeline

Out of scope:
- Issues in Google or Microsoft 365 services themselves
- Social-engineering of maintainers or users
- Denial-of-service against GitHub-hosted infrastructure
- Automated scanner output without a working proof of concept

## Keyboard shortcuts and security

Daybook deliberately exposes only non-privileged shortcuts (see the [Accessibility Statement](https://anubhav9001.github.io/Daybook/accessibility.html) for the full list). The following guarantees apply to every shipped shortcut:

| Guarantee | What it means |
|---|---|
| **No shortcut sends mail** | Daybook never sends email on your behalf from a key press. Replies always open as editable drafts you choose to send. |
| **No shortcut bypasses OAuth consent** | Sign-in happens on Google's or Microsoft's own page; no key combination in Daybook can skip that consent screen or re-authorise an account silently. |
| **No shortcut writes to disk outside the app's cache** | File dialogs are OS-native; Daybook does not grant itself file-system access through a hotkey. |
| **No shortcut invokes the AI without consent** | The on-device AI only runs on content you select, and the cloud-AI providers only receive requests you explicitly send (consent captured per provider in Settings). |
| **No global shortcuts** | Daybook does not register system-wide `globalShortcut`s. Shortcuts only fire while the Daybook window is focused, so they cannot be used to spy on or control other applications. |

If you find a shortcut combination that violates any of the above, treat it as a security issue and report it through the private channels above.

Thank you for helping keep Daybook users safe.
