---
id: "DEV-V-media-contacts"
title: "Media Contacts Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/media-contacts/_media-contacts.json"]
relatedComponents: ["media-contacts"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Media Contacts Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-media-contacts |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Media Contacts block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/media-contacts/_media-contacts.json |
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

| Component | Field | Tab | Multiple | Options (label = value) | Default |
| --- | --- | --- | --- | --- | --- |
| `media-contacts` | Title Type (`titleType`) | Content | No | H1 = `h1`; H2 = `h2`; H3 = `h3`; H4 = `h4`; H5 = `h5`; H6 = `h6` | `h2` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Media Contacts blocks on the published block library pages (0 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| media-contacts | Title Type | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | Title Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | Title Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | Title Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | Title Type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | Title Type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Default (all contacts)

A page whose `region` is Global (or empty, or without matching rows) lists every contact of the sheet.

#### Regional

A page whose `region` matches rows of the sheet (e.g. `Europe`) lists only those rows.

#### Without a Title

The heading is the placeholder "Media contacts".

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
