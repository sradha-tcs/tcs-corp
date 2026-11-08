---
id: "GOV-006"
title: "Security, Privacy and Compliance"
role: "Administration and governance"
topic: ""
audience: "Site administrators, product owner, program governance"
owner: "Product Owner / Program Governance"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Security, Privacy and Compliance

| Attribute | Value |
| --- | --- |
| Document ID | GOV-006 |
| Audience | Site administrators, product owner, program governance |
| Purpose | Security and privacy obligations |
| Scope | — |
| Prerequisites | — |
| Owner | Product Owner / Program Governance (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Status at a glance](#status-at-a-glance)
- [Data minimisation and personal information](#data-minimisation-and-personal-information)
- [Identity, consent and analytics / personalization dependencies](#identity-consent-and-analytics--personalization-dependencies)
- [Known limitations and open items](#known-limitations-and-open-items)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Status at a glance

| Area | Status | Where |
| --- | --- | --- |
| Universal Editor update sanitization (DOMPurify) | Active | `scripts/editor-support.js` |
| Same-origin fragment and error page loading | Active | `blocks/fragment/fragment.js`, `scripts/scripts.js` `loadPageContent` |
| Safe URL check for card links | Active | `utils/card-list-config.js` `isSafeUrl` (List, Cards) |
| New-tab links with `noopener noreferrer` and a screen reader hint | Active | `decorators/link-decorator.js` |
| Privacy-enhanced video players | Active | Embed (always), Video (Privacy mode, default on) |
| Content Security Policy (nonce, `strict-dynamic`) | Active | `head.html`, `404.html` |
| Secrets in the repository | None found | — |
| Search term redaction, field names only in form events | Active | `utils/privacy.js`, `decorators/data-layer-decorator.js` |
| Cookies set by project code | None | — |
| Consent management, visitor identity | Not implemented (blocked: consent model) | — |
| Generic iframe embeds: host allow-list, `sandbox` | Not implemented (known limitation) | `decorators/media-decorator.js` `createFrame` |

## Data minimisation and personal information

| Data | Handling | Code |
| --- | --- | --- |
| Search terms | Redacted before the data layer: e-mail addresses → `[email]`, phone-like numbers → `[number]`, trimmed, at most 100 characters; empty searches not pushed (unit tested) | [`utils/privacy.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/privacy.js), [`test/privacy/privacy.test.mjs`](https://github.com/sradha-tcs/tcs-corp/blob/main/test/privacy/privacy.test.mjs) |
| Form values | Never in the data layer (`cmp:submit` carries field names only); sent only to the page integration or the authored Submit action | `decorators/data-layer-decorator.js`, `blocks/form-variations/form-variations.js` |
| Labels | `dc:title` values truncated to 100 characters | `decorators/data-layer-decorator.js` |
| `mailto:` / `tel:` links | Pushed in full as `xdm:linkURL` (exit links): open finding F-05 | `decorators/data-layer-decorator.js` |
| Authored contact data | The Authors and Media Contacts sheets (names, designations, e-mail, phone, LinkedIn) are published as `/{locale}/data/*.json` by design and excluded from the query index (`/*/data/**`) | [`utils/data.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/data.js), [`helix-query.yaml`](https://github.com/sradha-tcs/tcs-corp/blob/main/helix-query.yaml) |
| Authored ids and labels | Anchor IDs, Component IDs and Analytics labels are authored and pushed to the data layer: authors must not put personal data in them (handover 11.9) | — |
| 404 RUM checkpoint | `sampleRUM('404', { source: document.referrer })` sends the referrer of sampled 404 views | [`404.html`](https://github.com/sradha-tcs/tcs-corp/blob/main/404.html) |

## Identity, consent and analytics / personalization dependencies

- **Identity**: no login, no gated content, no visitor id read or set by project code.
- **Consent**: no consent banner, consent management platform or consent check is implemented. The data layer is filled without consent because nothing leaves the page; third-party embeds load without a consent gate. The consent model, categories and per-locale requirements are blocked dependencies (handover 11.7.6 and open item O-07; audit section 7).
- **Analytics**: Adobe Tags and the AEP Web SDK are not configured (blocked: measurement plan); a future embed belongs in `scripts/delayed.js`, never in `head.html` or Universal Editor ([Data layer and analytics](../../02-development/markdown/ANALYTICS-DATA-LAYER-GUIDE.md)).
- **Personalization**: no Adobe Target or AJO integration ([Personalization](../../01-architecture/markdown/INTEGRATION-ARCHITECTURE.md)).

## Known limitations and open items

| Item | Status | Source |
| --- | --- | --- |
| Generic iframes: no host allow-list, no `sandbox` | Known limitation; approved embed domains not recorded | `decorators/media-decorator.js`, Embed README, handover O-16 |
| Third-party players and the X widget load without consent | Blocked: consent model | Audit section 7 |
| Form Submit action accepts any URL; no form back end defined | Requires validation (handover O-08: form back end and privacy notices) | `blocks/form-variations/form-variations.js` |
| `mailto:` / `tel:` links in the data layer | Open (F-05) | Handover Part 16 |
| Raw query in the Search page URL (`?q=`) | Blocked until Tags / Web SDK exists (R-D-12) | [`docs/audit/REAUDIT-2026-10-20.md`](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/REAUDIT-2026-10-20.md) |
| CSP leaves `frame-src`, `connect-src`, `img-src`, `style-src` unrestricted | By design for embeds; Requires validation by a security review | `head.html` |
| Preview / live access restriction, Admin API roles | Not recorded | Handover 2.7.3 |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
