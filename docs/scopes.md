---
layout: default
title: Permissions
nav_exclude: true
description: Every Google and Microsoft permission Daybook asks for, and why.
---

# Permissions Daybook requests
{: .no_toc }

Each row shows a scope (permission) Daybook asks for during sign-in, what it unlocks, and why Daybook needs it. These are the only scopes requested; nothing broader.

1. TOC
{:toc}

## Google (Gmail + Calendar)

| Scope | What it grants | Why Daybook needs it |
|---|---|---|
| `openid` | A pseudonymous identifier for your account | Distinguish between multiple connected Google accounts |
| `https://www.googleapis.com/auth/userinfo.email` | Your primary Google account email address | Show your email in the app header; label which account each message belongs to |
| `https://www.googleapis.com/auth/gmail.readonly` | Read your mail and settings | Show your inbox, open individual messages, and run the on-device "needs a reply" classification |
| `https://www.googleapis.com/auth/gmail.compose` | Create, edit, and manage **drafts** on your behalf | Save Daybook-prepared replies into your Gmail drafts folder. **Daybook never sends mail from a background task** — you review and send each draft explicitly from the reply window or your Gmail client |
| `https://www.googleapis.com/auth/calendar.events` | Read and write **events** on your calendars | Show today's calendar and let you create, update, or respond to meetings you confirm |
| `https://www.googleapis.com/auth/calendar.freebusy` | Read **free/busy availability** of calendars shared with you | Avoid scheduling conflicts by suggesting meeting times that don't overlap invitees' busy blocks. Only busy/free blocks are read — never event titles, attendees, or descriptions |

Daybook does **not** request Google Drive, Google Photos, Google Contacts, `gmail.send`, `gmail.modify`, or any other broader scope.

## Microsoft 365 (Outlook + Calendar)

| Scope | What it grants | Why Daybook needs it |
|---|---|---|
| `openid`, `profile`, `email` | Basic sign-in identity | Know which account is active and show your name and email in the header |
| `offline_access` | Keep you signed in between launches | Refresh access tokens in the background so you don't have to re-sign-in on every open |
| `User.Read` | Basic profile (name, email) | Show your account in the app header |
| `Mail.ReadWrite` | Read your mail and manage drafts/folders | Show your inbox, open messages, save drafts (no auto-send) |
| `Calendars.ReadWrite` | Read and modify your calendar events | Show your schedule and let you create or respond to meetings you confirm |

Daybook does **not** request Teams, OneDrive, SharePoint, or any directory-wide scope.

## How to revoke access

You can remove Daybook's access at any time without uninstalling the app:

- **Google**: [myaccount.google.com/permissions](https://myaccount.google.com/permissions)
- **Microsoft**: [myaccount.microsoft.com](https://myaccount.microsoft.com) → Privacy → Apps and services

After revoking, Daybook will prompt you to sign in again on next launch.

## Where this data goes

See the [Privacy Policy](privacy.html) for the full data-flow description. In short: nothing leaves your computer unless you explicitly turn on a third-party AI provider.
