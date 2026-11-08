---
id: "DEV-V-column-break"
title: "Column Break Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/column-break/_column-break.json"]
relatedComponents: ["column-break"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Column Break Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-column-break |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Column Break block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/column-break/_column-break.json |
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

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Column Break blocks on the published block library pages (0 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

#### Named or unnamed Column Break

With a Column name the editor label is the name; without, "Column {n}". No difference on the page.

#### In a Columns Container

The Columns Container's Layout (Columns per row, Gap, Vertical alignment, Side by side from) applies to the columns. See [Columns Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md#variations).

#### In a tab of a Tabs Container

After a [Tab](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tab/README.md), Column Breaks lay the tab's content out in columns with the Tab's Columns per row; content between the Tab and the first Column Break stays above the columns. Gap medium, top alignment, side by side from 900px.

```text
[Screenshot Placeholder]

File name:
column-break-in-tab-desktop.png

Purpose:
A tab with a heading and two Column Breaks: the heading above, two columns below.

Annotations:
A = Heading before the first Column Break
B = Two columns
```

#### Column options (Additional tab)

Anchor ID, Hide block and spacing apply to the column, not to the hidden Column Break.

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
