---
layout: default
title: Install
nav_order: 2
description: Install Daybook on Windows — step-by-step instructions, download link, and SHA-256 verification.
---

# Installation

## Windows

### From the Microsoft Store

<a href="https://apps.microsoft.com/detail/9MVLMBFVZBVV?referrer=appbadge&mode=direct"><img src="https://get.microsoft.com/images/en-us%20dark.svg" height="48" alt="Get it from Microsoft"></a>

Choose **Get** on the [Daybook Store page](https://apps.microsoft.com/detail/9MVLMBFVZBVV). The Store installs Daybook and keeps it up to date.

### With the installer

<a href="https://github.com/anubhav9001/Daybook/releases/latest"><img src="https://img.shields.io/github/v/release/anubhav9001/Daybook?style=for-the-badge&logo=github&label=Download&color=181717" height="48" alt="Download the latest release from GitHub"></a>

1. Go to the [latest release](https://github.com/anubhav9001/Daybook/releases/latest).
2. Download `Daybook-Setup-<version>.exe`.
3. Run the installer and follow the prompts.
4. Launch **Daybook** from the Start menu.

## System requirements

- Windows 10 or 11 (64-bit)
- 300 MB free disk space
- Internet connection for mail/calendar sync

## Verifying the download

Each release ships with a `SHA256SUMS.txt`. Compare the hash of your download:

```powershell
Get-FileHash .\Daybook-Setup-<version>.exe -Algorithm SHA256
```

## Trouble installing?

See the [FAQ](faq.html) or [report a bug](https://github.com/anubhav9001/Daybook/issues/new/choose).
