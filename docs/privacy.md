---
layout: default
title: Privacy Policy
nav_exclude: true
description: How Daybook handles your mail, calendar and account data.
---

# Privacy Policy
{: .no_toc }

Last updated: 2026-10-26
{: .fs-3 .text-grey-dk-000 }

Daybook ("the app", "we") is a desktop application that helps you manage your Google and Microsoft 365 mail and calendars. This policy explains what data Daybook touches, why, where it goes, and how long it stays.

1. TOC
{:toc}

## 1. Who runs Daybook

Daybook is developed and maintained by **anubhav9001** on GitHub. For questions about this policy or any privacy concern, contact:

- Contact form: <https://daybook.saksham.org/contact.html>
- Issues: <https://github.com/anubhav9001/Daybook/issues>

## 2. What data Daybook accesses

Daybook accesses the following data **only** after you sign in and grant the explicit OAuth permissions listed below. Each scope is listed by its exact name, with a plain description of what it allows.

### Google scopes requested by Daybook

| OAuth scope | What it grants | Why Daybook needs it |
|---|---|---|
| `openid` | A pseudonymous identifier for your Google account | Lets Daybook tell your accounts apart when you connect more than one |
| `.../auth/userinfo.email` | Your primary Google account email address | Shown in the Daybook header so you know which account is active |
| `.../auth/gmail.readonly` | Read-only access to your Gmail messages and settings | Shows your inbox, lets you open a message to read it, powers the on-device "needs a reply" classification |
| `.../auth/gmail.compose` | Create, edit, and delete **drafts** (Google's description of this permission also covers sending) | Saves a reply you have reviewed into your Gmail **Drafts** folder. **Daybook never sends email** — it has no code that sends mail. You open the draft in Gmail, edit it if you like, and send it yourself |
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
- **No `gmail.send` scope** — Daybook uses `gmail.compose` only to create drafts. Daybook never sends mail, and no AI can send mail through Daybook; sending is always done by you, in Gmail or Outlook, after you review the draft
- **No access to any product or data category beyond mail and calendars**

## 3. Where your data goes

- **It stays on your device.** Daybook is a desktop app. Mail and calendar data retrieved from Google or Microsoft is held in memory on the computer you are using while Daybook shows it; message content is not saved to disk. Daybook saves only small encrypted records on your computer (see section 7).
- **Daybook has no server.** We do not operate any backend that receives, stores, or processes your mail, calendar, contacts, or account credentials.
- **Nothing is sent to the developer.** The developer never sees your emails, calendar, or any token issued to the app.
- **Built-in private AI runs locally.** Daybook's built-in private AI (the default) processes message text on your computer only. No message content leaves your machine.
- **Third-party AI providers are optional and your choice.** Daybook works fully with its built-in private AI, which needs no third party. If you choose a cloud AI provider (for example OpenAI, Anthropic, Google Gemini, Groq or OpenRouter) in Settings, you enter **your own API key** for that provider and must confirm that provider's data notice before Daybook uses it. Then:
  - When you choose **Suggest reply**, Daybook sends that provider the conversation you are replying to, up to five of your recent sent messages (so the draft matches how you write), and your calendar events for the next seven days (titles, times, locations and notes), so the suggestion can take your schedule into account.
  - If you also turn on **cloud background drafts** (off by default, limited to a daily number you set), Daybook does the same for new messages that may need a reply, so a draft is ready when you open them.
  - The request goes **directly from your computer to the provider you chose**, using your key. It never passes through a Daybook server, and the developer never sees it. The provider's own privacy policy applies to what it receives.
  - You can switch back to the built-in private AI, or remove your key, at any time in Settings.
- **Inbox sorting.** Daybook's built-in private AI sorts your inbox on your computer by default. If you choose a different provider for sorting in Settings (with its own model and notice), Daybook sends that provider the sender, subject and a short preview of each new message so it can sort them.
- **Daybook add-ins for Outlook.** When you choose Suggest reply, Summarize or Daybook in Outlook, the add-in sends only the email you have open (or the draft you're writing) to **Daybook on your own computer** (127.0.0.1); it never goes over the network to us. Daybook then handles it exactly like Suggest reply above: on your computer with the built-in private AI, or with the cloud provider you chose. The new Outlook add-in's pages load from daybook.saksham.org, but no email content is sent there. The add-in changes your mailbox only when you choose **Add this label**, which adds a Daybook category to that email.
- **Daybook anywhere** (off by default) reads your clipboard only when you press its shortcut. The text stays in its small window and goes only to the AI you chose; nothing is saved.
- **AI never sends email.** Every suggestion is shown to you for review. Daybook can only save it as a draft; you send it yourself, from Gmail or Outlook.

## 4. Credentials and tokens

- Daybook uses the official OAuth 2.0 flow for both Google and Microsoft. You enter your credentials on Google's or Microsoft's own sign-in page; the app never sees your password.
- Access and refresh tokens issued to the app are stored on your computer in Daybook's data folder, encrypted with Windows' per-user data protection (DPAPI), so only your Windows account can read them. They are never sent anywhere except to Google or Microsoft to keep you signed in.
- You can revoke Daybook's access at any time from your Google Account ([myaccount.google.com/permissions](https://myaccount.google.com/permissions)) or Microsoft account ([myaccount.microsoft.com](https://myaccount.microsoft.com)) settings.

## 5. Google API Services — Limited Use compliance

Daybook's use and transfer of information received from Google APIs to any other app will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), **including the Limited Use requirements**.

Specifically:

- **Allowed use.** Daybook accesses your Gmail and Google Calendar data only to provide user-facing features you directly interact with: showing your inbox and schedule, letting you reply to and classify mail, suggesting meeting times, and preparing editable reply drafts.
- **No transfer to third parties, except to the AI provider you choose.** Daybook does not transfer Google user data to any third party, except to provide the user-facing reply-suggestion feature, and only to a cloud AI provider that the user has chosen, configured with their own API key, and explicitly consented to in Settings (see "Where your data goes" above). The transfer goes directly from the user's computer to that provider; Daybook operates no server. It happens when the user asks for a suggestion, or for new messages if the user has turned on cloud background drafts. The built-in private AI involves no transfer at all.
- **No ads.** Daybook does not use or transfer Google user data for serving advertisements, including personalised, re-targeted, or interest-based advertising.
- **No selling.** Daybook never sells Google user data, and never transfers it to advertising platforms, data brokers, or information resellers.
- **No human reading.** Daybook does not allow humans to read Google user data unless (a) the user has given affirmative agreement for specific messages, (b) it is necessary for security purposes (e.g. investigating abuse), (c) it is required by law, or (d) the data has been aggregated and anonymised for internal operations. The maintainer never receives your Gmail or Calendar data.
- **No training of generalised ML models.** Daybook does not use Google user data to develop, improve, or train generalised AI or machine-learning models. The optional on-device AI model (Qwen3) is pre-trained by its authors; Daybook does not fine-tune or train it on your mail or calendar.

## 6. Telemetry and analytics

Daybook ships with **no analytics, no telemetry, and no crash reporting** sent to the developer or any third party. The app does not phone home.

## 7. How long data is kept

- **Mail and calendar content:** held in memory only while Daybook is open; not saved to disk.
- **Small encrypted records on your computer:** inbox-sorting labels with a short reason for each message, your Done and Snooze choices, and meetings you created in Daybook (so it can tell you about replies). They stay in Daybook's data folder until you delete it; uninstalling the installer version leaves the folder in place (see the [install guide](install.html) for how to remove it).
- **Disconnecting an account** deletes its sign-in tokens and its saved records (sorting labels, Done and Snooze choices, and meeting records) from your computer.
- **Sign-in tokens:** deleted when you choose **Disconnect** for that account in Daybook. For Google accounts, Disconnect also revokes Daybook's access at Google. You can also revoke access yourself at any time (section 4).

## 8. Children

Daybook is not directed at children under 13. We do not knowingly collect data from children.

## 9. Changes to this policy

If this policy changes, the new version will appear at this URL with an updated "Last updated" date. Material changes will also be announced in the release notes.

## 10. Contact

Use the [contact form](contact.html) or open an issue at <https://github.com/anubhav9001/Daybook/issues>.
