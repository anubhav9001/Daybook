---
layout: default
title: Accessibility
nav_order: 10
description: Daybook's accessibility commitment, conformance level, and how to report an issue.
---

# Accessibility Statement
{: .no_toc }

Last updated: 2026-10-09
{: .fs-3 .text-grey-dk-000 }

Daybook is built as an accessible desktop assistant. This statement describes what the app and this documentation site aim to meet, and how to tell us when something falls short.

1. TOC
{:toc}

## Conformance target

The desktop app and this documentation site aim to meet **WCAG 2.2 level AA** (Web Content Accessibility Guidelines).

## What this means in practice

- **Keyboard only.** Every interactive control can be reached and operated with the keyboard. Focus is always visible and never trapped.
- **Screen readers.** Semantic landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`), proper heading order, and ARIA labels are in place. The app has been tested with NVDA, JAWS, and VoiceOver.
- **Contrast.** Text meets at least AA (4.5:1 normal, 3:1 large) in both light and dark themes. Most text and syntax highlighting on the documentation site exceed AAA.
- **Themes.** Light, dark, and "match system" are available on the documentation site. The app offers OS-light / OS-dark / high-contrast themes.
- **Resizing.** Content remains usable at 200% zoom and reflows at 400%.
- **Motion.** No automatic motion or parallax. Animations respect `prefers-reduced-motion`.
- **Dialogs and announcements.** Status changes (e.g. "code copied to clipboard") are announced through an `aria-live` region.

## Known gaps

- The installer dialog is Windows-shell native; its accessibility depends on the Windows version. On Windows 11, SmartScreen may prompt before the installer runs.
- A small number of third-party embeds (e.g. GitHub Discussions widgets) are governed by GitHub's own accessibility.

## Report an accessibility issue

If you hit a barrier anywhere in the app or on this site, please tell us.

- **Preferred:** [Report an accessibility bug](https://github.com/anubhav9001/Daybook/issues/new?template=bug_report.yml&labels=bug,a11y&title=%5BA11y%5D%3A%20) — pick the bug template and add the "a11y" label.
- **Email:** **[FILL IN A PUBLIC CONTACT EMAIL]**

We treat accessibility bugs as critical and respond on a best-effort basis within a few business days.
