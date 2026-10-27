---
layout: default
title: Install
nav_order: 2
description: Install Daybook on Windows from the Microsoft Store or with the installer from GitHub — steps, updates, sign-in and uninstalling.
---

# Install Daybook
{: .no_toc }

Daybook runs on Windows 10 and Windows 11 (64-bit). You can install it in two ways. Both give you the same app with the same features, and both are free.

<a href="https://apps.microsoft.com/detail/9MVLMBFVZBVV?referrer=appbadge&mode=direct"><img src="https://get.microsoft.com/images/en-us%20dark.svg" width="161" height="44" alt="Get it from Microsoft"></a>
<a href="https://github.com/anubhav9001/Daybook/releases/latest"><img src="{{ '/assets/github-download-badge.svg' | relative_url }}" width="161" height="44" alt="Download from GitHub"></a>

1. TOC
{:toc}

---

## Which one should I choose?

| | Microsoft Store | Installer from GitHub |
|---|---|---|
| **Best for** | Most people | People who can't use the Store, or want a new version on release day |
| **Install** | One click in the Store | Download and run `Daybook-Setup-<version>.exe` |
| **Windows security prompt** | None | SmartScreen warning the first time (see [below](#2-run-the-installer)) |
| **Updates** | Automatic, through the Store | Daybook checks GitHub and asks before installing |
| **New versions** | A few days after release, once Microsoft has checked them | On release day |
| **Start Daybook when Windows starts** | Not available (Store apps can't use this setting yet) | Available in Settings |
| **Name in the Start menu** | Daybook AI | Daybook |

Install **only one** of them. Both can be installed at the same time, but you would then get two tray icons and every notification twice.

---

## Option 1 — Microsoft Store (recommended)

### 1. Get Daybook

1. Open the [Daybook page in the Microsoft Store](https://apps.microsoft.com/detail/9MVLMBFVZBVV), or open the **Microsoft Store** app and search for **Daybook AI**.
2. Choose **Get** (or **Install**). Sign in to the Store with a Microsoft account if it asks.
3. When it finishes, choose **Open**, or find **Daybook AI** in the Start menu.

### 2. Updates

The Store updates Daybook automatically. To update now, open the Microsoft Store → **Library** → **Get updates**.

In Daybook, **Help → Check for updates** tells you that updates come through the Store; that's expected.

### 3. Uninstall

**Settings → Apps → Installed apps → Daybook AI → ⋯ → Uninstall.**

---

## Option 2 — Installer from GitHub

### 1. Download

1. Go to the [latest release on GitHub](https://github.com/anubhav9001/Daybook/releases/latest).
2. Under **Assets**, choose **`Daybook-Setup-<version>.exe`** (about 130 MB). You don't need the other files; Daybook's updater uses them.

### 2. Run the installer

1. Open the downloaded file.
2. **If Windows shows "Windows protected your PC":** the installer isn't code-signed yet, so Microsoft Defender SmartScreen doesn't recognise it. Choose **More info**, check that the app name is `Daybook-Setup-<version>.exe`, then choose **Run anyway**. You see this only when installing, not each time you open Daybook.
   - If your organization manages your PC and there is no **Run anyway** button, use the Microsoft Store version instead, or ask your IT team.
3. Follow the installer's steps, then open **Daybook** from the Start menu.

### 3. Updates

Daybook checks GitHub for a new version when it starts. You can also check any time with **Help → Check for updates**. An update downloads in the background, and Daybook asks you before installing it.

### 4. Uninstall

**Settings → Apps → Installed apps → Daybook → ⋯ → Uninstall.**

Your saved settings and sign-ins stay in `%APPDATA%\daybook-assistant` in case you reinstall. To remove them too, delete that folder after uninstalling. It also holds the built-in AI model, if you downloaded one, which can be several gigabytes.

---

## After installing (both versions)

1. **Connect your accounts.** Choose **Connect an account**, then Google or Microsoft 365. Sign-in opens in your web browser; return to Daybook when it says you're signed in.
2. **Optional: set up the built-in private AI.** Choose **Set up private AI** on the dashboard. Daybook downloads a free model sized for your computer (one time, 2.5–5 GB) and drafts replies without your email leaving the PC.

### Gmail support (experimental)

> **Gmail support is experimental.** While Google reviews Daybook's access, Google may show a "Google hasn't verified this app" screen, and only a limited number of Gmail accounts can connect for now. If you'd like to test Daybook with Gmail, please [get in touch](contact.html). Microsoft 365 and Outlook.com accounts are fully supported.

## Daybook in Outlook

Daybook must be running on the same PC, with **Settings → Outlook add-in → Allow the Outlook add-in** turned on.

### Classic Outlook (every account, including Gmail)

- **GitHub installer version:** in Daybook, open **Settings → Outlook add-in** and choose **Add Daybook to classic Outlook**. Restart Outlook.
- **Microsoft Store version:** download and run [Daybook for classic Outlook](https://github.com/anubhav9001/Daybook/releases/latest/download/Daybook-for-classic-Outlook-Setup-1.0.0.exe) (small, no administrator rights needed), then restart Outlook. Like the main installer, it isn't code-signed yet, so Windows may show "Windows protected your PC": choose **More info**, then **Run anyway**.

Classic Outlook then has a **Daybook** tab: press **Alt, D**, then **R** to suggest a reply, **S** to summarize, or **P** for the Daybook panel. **F6** moves between Outlook and the panel. To remove it, choose **Remove from classic Outlook** in Daybook's Settings, or uninstall "Daybook for classic Outlook" from Windows Settings → Apps.

### New Outlook and Outlook on the web (Microsoft 365 or Outlook.com accounts)

1. In Outlook, open **Apps → Get add-ins** (or go to [aka.ms/olksideload](https://aka.ms/olksideload)), choose **My add-ins → Add a custom add-in → Add from URL**, and enter `https://daybook.saksham.org/addin/manifest.xml`. Daybook will also be listed in Microsoft's add-in store once it has been reviewed.
2. Open an email, choose **Apps → Daybook**, and in Daybook choose **Settings → Outlook add-in → Pair Outlook**. Type the 6-digit code in the panel.
3. To keep Daybook on the ribbon, choose **Apps**, right-click **Daybook**, and choose **Pin**.

Microsoft doesn't run add-ins on Gmail accounts in new Outlook. For those, use **Daybook anywhere**: turn it on in Daybook's Settings, copy an email, and press **Ctrl+Shift+Alt+A**.

### If Google says "Google hasn't verified this app"

Daybook's Google verification is still in progress, so Google may show this screen when you connect a Google account. To continue, choose **Advanced**, then **Go to Daybook**. Daybook only ever reads your mail and calendar, saves drafts, and adds events you confirm; see [Permissions](scopes.html) for what each permission is used for. The screen goes away once Google finishes its review.

### If a work Microsoft 365 account can't sign in

Some organizations allow only apps their IT team has approved. If you see "Need admin approval", ask your IT team to approve **Daybook** for your organization, or use a personal Outlook.com account.

---

## Switching between the Store and the installer

The two versions are separate apps, and each keeps its own settings.

1. Uninstall the one you're leaving (see above).
2. Install the other one.
3. Connect your accounts again. If you use the built-in private AI, the new version may download the model again.

---

## System requirements

- Windows 10 or Windows 11, 64-bit
- About 300 MB of free disk space for Daybook
- Another 2.5–5 GB if you use the built-in private AI (up to 19 GB for the largest model), and 8 GB of memory or more for it to run well
- An internet connection to sync mail and calendars

## Trouble installing?

See the [FAQ](faq.html), or [report a bug](https://github.com/anubhav9001/Daybook/issues/new/choose) with what you tried and the message you saw.
