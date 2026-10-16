---
layout: default
title: Changelog
nav_order: 5
description: Release history and what's new in each version of Daybook.
---

# Changelog

See the full history on the [Releases page](https://github.com/anubhav9001/Daybook/releases).

## 0.6.6 — latest
- **Recovers gracefully from Windows credential-store issues.** If Daybook can't decrypt its saved files after a Windows profile change, it now shows one plain-language dialog listing what will be reset and asks before doing anything, instead of a stream of cryptic error toasts.
- **Finds up to 100 recent messages per account** instead of 20. Mailing-list traffic no longer pushes personal mail out of the fetch window.
- **Lets the AI classify mailing-list messages from colleagues.** Mail with a List-Id header from a human sender (e.g. a Google Group where a colleague is waiting) now goes to the AI for a content-based decision instead of being auto-filed to Info or Other. Automated newsletters, no-reply@ and security@ senders still skip the AI call.
- **Content reflows at narrow widths and 400% zoom (WCAG 1.4.10).** The window now resizes down to 320 × 480, the inbox tabs wrap, and the dashboard collapses to a single column on narrow viewports.
- **Larger baseline text everywhere (WCAG 1.4.4).** Body copy moves from 10 px to 13 px, metadata and timestamps from 9 px to 12 px. Inbox cards grow a little taller — zoom out with Ctrl + − for more density.

## 0.6.5
- Restores the built-in private AI engine. 0.6.1 to 0.6.4 shipped without the on-device engine by accident, so users who picked "Built-in private AI" saw "This Daybook build does not include the built-in AI engine." Select Built-in private AI in Settings → AI provider again and it works.

## 0.6.4
- Fixes Google sign-in refresh for connected Google accounts. If you had a Google account connected in an older version, you may need to Disconnect and Reconnect that account once after upgrading — the app will tell you if so. Microsoft accounts are not affected. Also includes the reliability improvements from 0.6.3.

## 0.6.3
- Minor bug fixes and reliability improvements. Fixes a case where Daybook could appear to not open after an update, and continues improvements to Google Gemini key handling from 0.6.1 and 0.6.2.

## 0.6.2
- Minor bug fixes and performance improvements. If you use Google Gemini and had trouble with your key in 0.6.1, this release should fix it.

## 0.6.1
- **Google Gemini: new-format keys accepted.** AI Studio keys that start with `AQ.` now work alongside the legacy `AIza` keys. 0.6.0 rejected the new format before even calling Google. Vertex AI tokens (`ya29.`) still get their own clear rejection.
- **Truthful Gemini error messages.** Daybook now switches on the real HTTP status and Google's own status code (`PERMISSION_DENIED`, `NOT_FOUND`, `RESOURCE_EXHAUSTED`) instead of substring-matching the response text. Every error now quotes what Google actually said.
- **Default Gemini model corrected to `gemini-3.1-flash-lite`.** The 0.6.0 default (`gemini-3.5-flash-lite`) is not on Google's current lineup. Users who already picked a specific model are unaffected.

## 0.6.0
- **New Info tab.** Mail is sorted into Needs a reply, Waiting on others, Info, and Other. Receipts, bills, and security alerts go to Info so Needs a reply stays about replies.
- **Move to… per-sender override.** Choose Move to… on any message to permanently route every message from that sender to Reply, Info, or Other. Review and change your choices in Settings → Your per-sender choices.
- **Cloud background drafts (opt-in).** If you use a cloud AI provider, Daybook can prepare replies with it in the background. Off by default; a daily cap keeps token use predictable.
- **Meeting notes feed the reply.** When drafting a reply that mentions an upcoming meeting, the AI sees that meeting's agenda and location from your calendar.
- **Keyboard-friendly Move to… and Snooze menus.** Both open with Enter or Arrow keys, cycle with Up/Down, jump with Home/End, and close with Escape. Each mail card's sender is now a heading so screen-reader users can jump between messages.
- **Quit Daybook completely.** File → Quit Daybook completely (Ctrl+Q) fully exits, including the system-tray background process.
- **Default Gemini model** is now `gemini-3.5-flash-lite` after Google retired older endpoints. Choose any model from Settings → AI provider → Show available models.
- Stability and classification fixes for marketing, bulk, and transactional mail.

## 0.5.2
- Choose any model your cloud AI provider offers, from its own list, including lighter models that use fewer tokens and reply faster.

## 0.5.0
- Unified inbox across Google and Microsoft 365.
- Built-in private AI option.
- Accessibility improvements.

Earlier releases are listed on [GitHub Releases](https://github.com/anubhav9001/Daybook/releases).
