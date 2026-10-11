---
layout: default
title: Changelog
nav_order: 5
description: Release history and what's new in each version of Daybook.
---

# Changelog

See the full history on the [Releases page](https://github.com/anubhav9001/Daybook/releases).

## 0.6.2 — latest
- **Google Gemini: key goes in the URL, not the header.** Daybook now sends your Gemini key as `?key=…`, matching Google's own GenAI SDK and tools like Fido. Some AIza keys are accepted via the query string but rejected on the `x-goog-api-key` header — this fixes legacy AIza keys that stopped working for some users in 0.6.1. Both AIza and AQ. keys continue to work.
- **Local key check loosened.** Daybook no longer tries to validate the key shape beyond rejecting Vertex OAuth tokens (`ya29.`). Google is the only source of truth for whether a key is valid.

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
