# Daybook security audit

**Reviewed:** 2026-10-05  
**Scope:** Electron desktop source, IPC/preload boundary, OAuth and provider requests, local storage, external links, calendar/draft actions, cloud AI routing, and locked npm dependencies.  
**Outcome:** Several material issues were fixed in 0.2.7. This is a source-level review, not a penetration test or a guarantee that the product is free of vulnerabilities.

## Fixed in 0.2.7

| Severity | Finding | Change |
| --- | --- | --- |
| High | Renderer IPC handlers did not verify which frame invoked privileged operations. A renderer compromise could request account, mail, calendar, settings, and AI actions. | Every IPC handler now accepts calls only from Daybook's top-level local app document. Inputs to AI settings, mail drafts, calendar creation, provider setup, and preferences are validated and bounded. |
| High | The external-link bridge accepted any HTTPS URL, and window navigation accepted arbitrary `file://` URLs. A malicious message or renderer bug could open attacker-controlled sites or local files. | `shell.openExternal` now allows only Google Mail, Google Calendar, and Outlook web hosts. The app blocks all window navigation and popups. |
| High | The Microsoft AI endpoint accepted arbitrary HTTPS hosts, which could send the user's API key and private mail/calendar context to an attacker-controlled server. | The endpoint is constrained to Azure AI host suffixes, HTTPS, standard ports, and expected endpoint paths. AI and OAuth requests reject redirects so credentials are not forwarded to a redirect destination. |
| High | Calendar event creation trusted renderer data; invitation creation had only a renderer-side confirmation. | Main-process validation enforces title/duration/date/description/invitee limits, then a native confirmation dialog shows the calendar, time, and full invitee list before invitations are sent. |
| Medium | Meeting tracking and routine preferences were stored as readable JSON, exposing event titles, attendee addresses, work hours, and brief settings to anyone who could read the app data folder. | New preference and meeting-watch files use Electron `safeStorage`. Existing plaintext files are migrated and removed after successful migration. |
| Medium | A malicious email subject could inject newline headers into a Gmail draft. Reply-To could include extra recipients. | Subject and headers are line-break sanitized, and the draft targets a single parsed reply address. Draft text has a size limit. |
| Medium | Meeting updates could display attendee addresses and meeting titles in OS notification history or on a lock screen. | System notifications now use generic text; details remain inside Daybook. |
| Medium | One cloud consent checkbox was shared by all AI providers. A user who approved one provider could switch to another without seeing a fresh consent. | Cloud consent is stored per selected provider and required in the main process before analysis. Switching providers clears the checkbox. The notice describes the context sent. |
| Medium | Repeated calls to the AI or meeting-creation IPC paths could cause cost or invitation abuse after renderer compromise. | Added main-process limits of 30 AI analyses per minute and 10 meeting creations per 10 minutes, plus native confirmation for each meeting. |
| Low | Google account disconnect only deleted the local token, leaving the provider-side authorization active. | Daybook now attempts Google's token revocation after removing the local token. If revocation fails, the UI says to revoke Daybook in account security settings. Microsoft disconnect removes local credentials; the user must revoke the app through Microsoft account or organization controls. |
| Low | A local process or web page able to reach the temporary OAuth loopback port could submit an incorrect state and cancel the user's sign-in attempt. | Invalid-state callbacks now receive an error without terminating the active sign-in flow; the callback still requires the original random state and PKCE verifier. |
| Low | The app had no explicit renderer permission denial and allowed developer tools in the packaged window. | Browser permissions are denied, Developer Tools are disabled, `webSecurity`, context isolation, Node isolation, and renderer sandboxing are explicitly enabled, and CSP no longer permits inline styles. |

## Remaining risks and actions before public distribution

1. **OAuth scope impact (High):** Google `gmail.compose` can create drafts and also has the capability to send mail. Daybook currently only creates drafts, but a stolen Google token could be abused within the granted scope. Google does not offer a general Gmail API scope limited to creating drafts. Keep the app's OAuth access tightly controlled, complete Google's required verification, and promptly revoke access if a device is compromised. Microsoft mail write and calendar write permissions also allow changes within the signed-in account.
2. **Cloud AI disclosure (High):** When cloud analysis is requested, selected conversation text, up to five sent-message examples, and up to 100 upcoming event titles/times go to the chosen AI provider. The provider's own retention, training, billing, and regional-processing terms apply. The app cannot enforce those external policies. Users needing local-only processing should choose Ollama and confirm that their Ollama installation does not forward prompts elsewhere.
3. **Local AI trust boundary (Medium):** Ollama's loopback HTTP service does not authenticate Daybook. Other software running as the same user or on the device may be able to interact with the local service or inspect prompt traffic. Keep Ollama bound to loopback, use trusted models, and do not configure forwarding for sensitive mail.
4. **Same-user malware and unlocked sessions (High):** `safeStorage` encrypts tokens, keys, preferences, and meeting tracking at rest using operating-system facilities. It cannot protect data while Daybook is running from malware operating as the signed-in user, nor from a compromised OS account or unlocked device. Use full-disk encryption, OS updates, a screen lock, and endpoint protection.
5. **Provider-side revocation (Medium):** Google revocation is attempted but can fail offline. Microsoft disconnection removes Daybook's local token but cannot revoke only Daybook's delegated refresh token through this app; users must remove/revoke the app in Microsoft account or Entra controls. Verify revocation before handing a device to someone else.
6. **Release integrity and update delivery (High):** Public installers need publisher code signing and a secure, signed update channel. Neither a signing certificate nor automatic update service is included. Users should download installers only from the publisher's verified site and check signatures once signing is configured.
7. **OAuth publisher setup and privacy obligations (High):** Broad distribution requires publisher-owned Google/Microsoft app registrations, consent-screen verification as applicable, a privacy policy, clear data-retention disclosures, and a support/contact process. Desktop OAuth client secrets are not confidential in a distributed application.
8. **File deletion limits (Low):** Migration removes the old plaintext JSON files, but normal deletion cannot promise forensic erasure from SSD wear-leveling, backups, restore points, or copied profiles. Users should secure backups and device storage.
9. **Availability and AI accuracy (Medium):** Provider outages, rate limits, malicious email prompt-injection content, or model mistakes can cause missed replies or misleading drafts/meeting suggestions. Mail bodies are treated as untrusted instructions and no email is automatically sent; the user must review drafts and confirm meetings. This does not prevent persuasive or incorrect content.

## Verification performed

- `node --check main.cjs`, `node --check app.js`, and `node --check ai-service.cjs` passed after the changes.
- `npm audit` queried the npm advisory database: **0 known vulnerabilities** across 327 locked dependencies at the time of review (2026-10-05). This result can change as advisories are published.
- Windows NSIS and portable installers were built for version 0.2.7. Authenticode inspection reported the installer **NotSigned**; a publisher certificate and signed distribution process remain outstanding.
- Live OAuth, provider-key requests, and account revocation were not tested because this audit had no user credentials. No third-party penetration test, malware analysis, or signed-installer verification was performed.

## User data and permissions summary

- Mail and calendar content is fetched on demand and held in memory for the active app session; AI analysis is explicit and provider-specific consent is required.
- OAuth access/refresh tokens, Google OAuth secret, cloud AI keys, preferences, and meeting response tracking are encrypted with OS secure storage. Provider client IDs are configuration identifiers, not secrets.
- Google authorization includes `gmail.readonly`, `gmail.compose`, and calendar-event access. Microsoft authorization includes mail read/write and calendar read/write. This is necessary for the current read, draft, and meeting workflow and is broad enough that a compromised token can affect the mailbox/calendar.
- Daybook does not send email automatically. Meeting invitations are sent only after a native confirmation that lists all recipients.
- The app currently has no team backend, telemetry service, or automatic updater. Cloud AI providers still receive the explicitly described context when chosen.
