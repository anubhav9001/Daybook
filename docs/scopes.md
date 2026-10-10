---
layout: default
title: Permissions
nav_order: 9
description: Every Google and Microsoft permission Daybook asks for, and why.
---

# Permissions Daybook requests
{: .no_toc }

Each row shows a scope (permission) Daybook asks for during sign-in, what it unlocks, and why Daybook needs it. These are the only scopes requested; nothing broader.

1. TOC
{:toc}

## Google (Gmail + Calendar)

| Scope | Access it grants | Why Daybook needs it |
|---|---|---|
| `https://www.googleapis.com/auth/gmail.modify` | Read, compose, and modify (label, archive) email — but not delete | Show your inbox, open messages, send replies, mark read/unread, archive |
| `https://www.googleapis.com/auth/gmail.send` | Send email on your behalf | Send the replies and new mail you compose in Daybook |
| `https://www.googleapis.com/auth/calendar` | Read and write calendar events on all your calendars | Show your schedule and let you create, update, and respond to events |
| `https://www.googleapis.com/auth/contacts.readonly` | Read your contacts | Autocomplete recipient names and email addresses when drafting mail or inviting attendees |
| `openid`, `email`, `profile` | Your account identity | Know which account is signed in and show your name and email in the app header |

Daybook does **not** request Google Drive, Google Photos, or any other scope beyond the ones listed above.

## Microsoft 365 (Outlook + Calendar)

| Scope | Access it grants | Why Daybook needs it |
|---|---|---|
| `Mail.ReadWrite` | Read and modify your mail | Show your inbox, open messages, mark read/unread, archive |
| `Mail.Send` | Send mail on your behalf | Send the replies and new mail you compose |
| `Calendars.ReadWrite` | Read and write calendar events | Show your schedule and let you create, update, and respond to events |
| `Contacts.Read` | Read your contacts | Autocomplete recipient names and email addresses |
| `User.Read` | Basic profile | Know which account is signed in and show your name and email |
| `offline_access` | Keep you signed in without re-prompting | Refresh the access token in the background so you don't have to sign in on every launch |

Daybook does **not** request Teams, OneDrive, SharePoint, or any directory-wide scope.

## How to revoke access

You can remove Daybook's access at any time without uninstalling the app:

- **Google**: [myaccount.google.com/permissions](https://myaccount.google.com/permissions)
- **Microsoft**: [myaccount.microsoft.com](https://myaccount.microsoft.com) → Privacy → Apps and services

After revoking, Daybook will prompt you to sign in again on next launch.

## Where this data goes

See the [Privacy Policy](privacy.html) for a full description. In short: nothing leaves your computer unless you explicitly turn on a third-party AI provider.
