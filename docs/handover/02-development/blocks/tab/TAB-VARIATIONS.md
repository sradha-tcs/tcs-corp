---
id: "DEV-V-tab"
title: "Tab Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/tab/_tab.json"]
relatedComponents: ["tab"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Tab Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-tab |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Tab block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/tab/_tab.json |
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
| `tab` | Columns per row (`classes_perrow`) | Content | No | Automatic = `""`; 1 = `per-row-1`; 2 = `per-row-2`; 3 = `per-row-3`; 4 = `per-row-4` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Tab blocks on the published block library pages (0 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| tab | Columns per row | Automatic | `""` | Supported (in the model) | n/a (default) |
| tab | Columns per row | 1 | `per-row-1` | Supported (in the model) | No |
| tab | Columns per row | 2 | `per-row-2` | Supported (in the model) | Yes |
| tab | Columns per row | 3 | `per-row-3` | Supported (in the model) | No |
| tab | Columns per row | 4 | `per-row-4` | Supported (in the model) | No |

## Narrative (block README)

#### Standard Tab

Title only (ID empty, Active tab off). Renders a tab button with the Title; the panel id is `{base}-item-{n}`. Use it for tabs nobody links to.

```text
[Screenshot Placeholder]

File name:
tab-standard-mobile.png

Purpose:
A standard Tab at mobile width: its tab button in the scrolling tab list and its panel content stacked.

Annotations:
A = Tab button
B = Panel content
```

#### Active Tab

Active tab on: the tab shown when the page loads (unless a `#hash` or an editor re-render chooses another). Use it on one Tab at most.

#### Tab with ID (deep link)

ID set: the panel's id is the ID, so `#id` links and Anchor List links open the tab and scroll to it below the fixed header. Keep IDs identical across locales.

#### Tab with columns (Columns per row)

With Column Breaks in its content, the tab's content from the first Column Break is laid out by a Columns Container block in the panel with the chosen Columns per row; gap medium, top alignment, side by side from 900px. See [Column Break](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md).

#### Hidden Tab (Hide block)

Hide block on: the tab and its content are left out of the page (the group is dropped when not in edit mode); in edit mode the tab stays and its chip is dimmed, so the author can turn it off again.

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
