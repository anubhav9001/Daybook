---
layout: default
title: Install
nav_order: 2
---

# Installation

## Windows

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
