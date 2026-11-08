---
id: "DEV-V-interactive-dashboard"
title: "Interactive Dashboard Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/interactive-dashboard/_interactive-dashboard.json"]
relatedComponents: ["interactive-dashboard"]
relatedPages: ["/design-block-master/en/block-library/interactive-dashboard","/design-block-master/en/block-library/interactive-dashboard/interactive-dashboard"]
confidence: "Medium"
primary: false
---

# Interactive Dashboard Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-interactive-dashboard |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Interactive Dashboard block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/interactive-dashboard/_interactive-dashboard.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Variation fields](#variation-fields)
- [Matrix](#matrix)
- [Narrative (block README)](#narrative-block-readme)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Variation fields

No variation field.

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Interactive Dashboard blocks on the published block library pages (2 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

#### Editor placeholder (Universal Editor edit mode)

- **Rendering:** the emptied block with `data-placeholder="Interactive Dashboard"`; under
  `html.adobe-ue-edit` it is a grid at least 10rem tall with a 2px dashed
  `--color-border-secondary` border, `--radius-l` corners and the centred text "Interactive
  Dashboard (placeholder)" (CSS `::before`, fixed English).
- **Accessibility / data layer / personalization:** editor only; not applicable.

#### Published and preview rendering (empty)

- **Rendering:** `.interactive-dashboard:empty { display: none }`: nothing at any viewport.

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../SCREENSHOT-REGISTER.md).

## Known limitations

- Combination rules (which options cannot be combined) are described in the README narrative only where they exist; unsupported combinations are not enumerated.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
