---
layout: default
title: Privacy Policy
nav_order: 7
description: How Daybook handles your mail, calendar and account data.
---

# Privacy Policy
{: .no_toc }

Last updated: 2026-10-09
{: .fs-3 .text-grey-dk-000 }

Daybook ("the app", "we") is a desktop application that helps you manage your Google and Microsoft 365 mail and calendars. This policy explains what data Daybook touches, why, where it goes, and how long it stays.

1. TOC
{:toc}

## 1. Who runs Daybook

Daybook is developed and maintained by **anubhav9001** on GitHub. For questions about this policy or any privacy concern, contact:

- Email: **[FILL IN A PUBLIC CONTACT EMAIL]**
- Issues: <https://github.com/anubhav9001/Daybook/issues>

## 2. What data Daybook accesses

Daybook accesses the following categories of data **only** when you sign in and grant permission:

| Data | Source | Why Daybook needs it |
|---|---|---|
| Email metadata (subject, sender, date) | Gmail / Microsoft Graph | Show your inbox |
| Email bodies | Gmail / Microsoft Graph | Display the message you open |
| Calendar events (title, time, attendees) | Google Calendar / Microsoft Graph | Show your schedule and let you edit it |
| Contact names and email addresses | Gmail / Microsoft Graph | Autocomplete recipients when drafting a reply |
| Your account display name and email | Google / Microsoft identity | Show which account is active |

Daybook does **not** request access to Google Drive, Google Photos, Microsoft OneDrive files, or any other product beyond mail and calendars.

## 3. Where your data goes

- **It stays on your device.** Daybook is a desktop app. All mail and calendar data retrieved from Google or Microsoft is held in the app's local cache on the computer you are using.
- **Daybook has no server.** We do not operate any backend that receives, stores, or processes your mail, calendar, contacts, or account credentials.
- **Nothing is sent to the developer.** The developer never sees your emails, calendar, or any token issued to the app.
- **Built-in private AI runs locally.** When you enable the optional on-device AI, it processes message text on your computer only. No message content leaves your machine.
- **Third-party AI providers are opt-in.** If you choose to connect a third-party AI (e.g. OpenAI, Anthropic, Google Gemini), Daybook sends the message text you select to that provider for that single request. You can turn this off at any time, and you can review the provider's own policy before connecting.

## 4. Credentials and tokens

- Daybook uses the official OAuth 2.0 flow for both Google and Microsoft. You enter your credentials on Google's or Microsoft's own sign-in page; the app never sees your password.
- Access and refresh tokens issued to the app are stored in the operating system's secure credential store (Windows Credential Manager).
- You can revoke Daybook's access at any time from your Google Account ([myaccount.google.com/permissions](https://myaccount.google.com/permissions)) or Microsoft account ([myaccount.microsoft.com](https://myaccount.microsoft.com)) settings.

## 5. Telemetry and analytics

Daybook ships with **no analytics, no telemetry, and no crash reporting** sent to the developer or any third party. The app does not phone home.

## 6. How long data is kept

- Local cache: until you sign out of the account in Daybook or uninstall the app, whichever is sooner. Signing out purges the cache.
- Tokens: cleared on sign-out or when revoked at the provider.

## 7. Children

Daybook is not directed at children under 13. We do not knowingly collect data from children.

## 8. Changes to this policy

If this policy changes, the new version will appear at this URL with an updated "Last updated" date. Material changes will also be announced in the release notes.

## 9. Contact

Email **[FILL IN A PUBLIC CONTACT EMAIL]** or open an issue at <https://github.com/anubhav9001/Daybook/issues>.
