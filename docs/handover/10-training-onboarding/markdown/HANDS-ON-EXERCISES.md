---
id: "TRN-002"
title: "Hands-On Exercises"
role: "Training and onboarding"
topic: ""
audience: "New team members of every role"
owner: "Documentation Owner"
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

# Hands-On Exercises

| Attribute | Value |
| --- | --- |
| Document ID | TRN-002 |
| Audience | New team members of every role |
| Purpose | Exercises on the real site |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Exercises](#exercises)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Exercises

1. **Find a block**: open https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/teaser and identify three variations; look them up in the [Teaser variations](../../02-development/blocks/teaser/TEASER-VARIATIONS.md).
2. **Inspect markup**: run `curl https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/hero.plain.html` and match the rows with the Hero fields.
3. **Data layer**: open a curated page, run `window.adobeDataLayer` in the console and find the page entry.
4. **Root behaviour**: open a page of each root and check in the network panel which placeholders.json it loads.
5. **Local run** (developers): `aem up`, change a token in styles/styles.css, see it on localhost:3000, revert.
6. **Authoring** (authors, needs access): build a test page in /content/tcs-corp/language-master/en with a Hero and a Teaser, preview, publish, unpublish.

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
