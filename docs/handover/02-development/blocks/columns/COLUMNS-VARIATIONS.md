---
id: "DEV-V-columns"
title: "Columns Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/columns/_columns.json"]
relatedComponents: ["columns"]
relatedPages: ["/design-block-master/en/block-library/columns","/design-block-master/en/block-library/columns/columns-mobile-inset","/design-block-master/en/block-library/columns/columns-variations"]
confidence: "Medium"
primary: false
---

# Columns Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-columns |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Columns block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/columns/_columns.json |
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

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Columns blocks on the published block library pages (3 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

The variations below exist only in content authored before; the code renders them as follows.

#### Two columns

Two cells per row: equal columns side by side from 900px, stacked below.

#### Three or more columns

Any number of cells per row; each takes an equal share (`flex: 1`). The class `columns-{n}-cols` is added (n = cells of the first row) but no CSS uses it.

#### Image column

A cell whose only content is a picture gets `columns-img-col`: shown first when stacked (`order: 0`), image full width.

#### Multiple rows

Each row is its own flex row; rows don't share column widths beyond their equal shares.

```text
[Screenshot Placeholder]

File name:
columns-image-column-mobile.png

Purpose:
An existing Columns block with an image-only column on the right at mobile width: the image shown above the text.

Annotations:
A = Image column moved first
B = Text column
```

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
