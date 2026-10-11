---
layout: default
title: Privacy Policy
nav_exclude: true
description: How Daybook handles your mail, calendar and account data.
---

# Privacy Policy
{: .no_toc }

Last updated: 2026-10-10
{: .fs-3 .text-grey-dk-000 }

Daybook ("the app", "we") is a desktop application that helps you manage your Google and Microsoft 365 mail and calendars. This policy explains what data Daybook touches, why, where it goes, and how long it stays.

1. TOC
{:toc}

## 1. Who runs Daybook

Daybook is developed and maintained by **anubhav9001** on GitHub. For questions about this policy or any privacy concern, contact:

- Contact form: <https://anubhav9001.github.io/Daybook/contact.html>
- Issues: <https://github.com/anubhav9001/Daybook/issues>

## 2. What data Daybook accesses

Daybook accesses the following data **only** after you sign in and grant the explicit OAuth permissions listed below. Each scope is listed in the same wording the Google / Microsoft consent screen shows you.

### Google scopes requested by Daybook

| OAuth scope | What it grants | Why Daybook needs it |
|---|---|---|
| `openid` | A pseudonymous identifier for your Google account | Lets Daybook tell your accounts apart when you connect more than one |
| `.../auth/userinfo.email` | Your primary Google account email address | Shown in the Daybook header so you know which account is active |
| `.../auth/gmail.readonly` | Read-only access to your Gmail messages and settings | Shows your inbox, lets you open a message to read it, powers the on-device "needs a reply" classification |
| `.../auth/gmail.compose` | Create, edit, and delete **drafts**, and send email on your behalf **only when you initiate it** | Saves the reply Daybook drafts into your Gmail drafts folder. **Daybook never sends mail from a background task** — you review and send each draft explicitly |
| `.../auth/calendar.events` | Read and write **events** on calendars you own | Shows today's calendar on the dashboard and lets you create or respond to meetings prompted by email conversations |
| `.../auth/calendar.freebusy` | Read **free/busy availability** of calendars shared with you | Suggests meeting times that don't overlap invitees' busy blocks. Only busy/free time blocks are read — never event titles, descriptions, or attendees |

### Microsoft 365 scopes requested by Daybook

| OAuth scope | What it grants | Why Daybook needs it |
|---|---|---|
| `openid`, `profile`, `email` | Basic sign-in identity | Shows which Microsoft account is active |
| `offline_access` | Keeps you signed in between app launches | Refreshes access tokens in the background without re-prompting |
| `User.Read` | Your basic profile (name, email) | Shown in the Daybook header |
| `Mail.ReadWrite` | Read and modify your mail and draft folders | Shows your inbox, lets you open messages, saves drafts (no auto-send) |
| `Calendars.ReadWrite` | Read and modify your calendar events | Shows today's calendar, lets you create or respond to meetings you confirm |

### What Daybook does NOT request

- **No access to Google Drive, Google Photos, Google Contacts, Google Workspace Admin APIs**
- **No access to Microsoft OneDrive, SharePoint, Teams, or any directory-wide scope**
- **No `gmail.send` scope** — Daybook uses `gmail.compose` which creates drafts; sending happens through the standard draft-send flow when you confirm
- **No access to any product or data category beyond mail and calendars**

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

## 5. Google API Services — Limited Use compliance

Daybook's use and transfer of information received from Google APIs to any other app will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), **including the Limited Use requirements**.

Specifically:

- **Allowed use.** Daybook accesses your Gmail and Google Calendar data only to provide user-facing features you directly interact with: showing your inbox and schedule, letting you reply to and classify mail, suggesting meeting times, and preparing editable reply drafts.
- **No transfer to third parties.** Daybook does not transfer Google user data to any third party, except as needed to provide or improve user-facing features that are prominent in Daybook's user interface, and only with the user's explicit consent on a per-provider basis (see "Where your data goes" above). Transfers to cloud AI providers happen only when the user explicitly requests a suggestion that uses that provider, after that provider has been enabled in Settings.
- **No ads.** Daybook does not use or transfer Google user data for serving advertisements, including personalised, re-targeted, or interest-based advertising.
- **No human reading.** Daybook does not allow humans to read Google user data unless (a) the user has given affirmative agreement for specific messages, (b) it is necessary for security purposes (e.g. investigating abuse), (c) it is required by law, or (d) the data has been aggregated and anonymised for internal operations. The maintainer never receives your Gmail or Calendar data.
- **No training of generalised ML models.** Daybook does not use Google user data to develop, improve, or train generalised AI or machine-learning models. The optional on-device AI model (Qwen3) is pre-trained by its authors; Daybook does not fine-tune or train it on your mail or calendar.

## 6. Telemetry and analytics

Daybook ships with **no analytics, no telemetry, and no crash reporting** sent to the developer or any third party. The app does not phone home.

## 7. How long data is kept

- Local cache: until you sign out of the account in Daybook or uninstall the app, whichever is sooner. Signing out purges the cache.
- Tokens: cleared on sign-out or when revoked at the provider.

## 8. Children

Daybook is not directed at children under 13. We do not knowingly collect data from children.

## 9. Changes to this policy

If this policy changes, the new version will appear at this URL with an updated "Last updated" date. Material changes will also be announced in the release notes.

## 10. Contact

Use the [contact form](contact.html) or open an issue at <https://github.com/anubhav9001/Daybook/issues>.
