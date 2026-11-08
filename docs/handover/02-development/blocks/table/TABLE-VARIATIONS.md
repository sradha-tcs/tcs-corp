---
id: "DEV-V-table"
title: "Table Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/table/_table.json"]
relatedComponents: ["table"]
relatedPages: ["/design-block-master/en/block-library/table","/design-block-master/en/block-library/table/table"]
confidence: "Medium"
primary: false
---

# Table Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-table |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Table block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/table/_table.json |
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
| `table` | Options (`classes`) | Content | Yes | Border = `undefined`; Header = `undefined` | `` |
| `table` | Columns (`filter`) | Content | No | 1 Column = `table`; 2 Columns = `table-2-columns`; 3 Columns = `table-3-columns`; 4 Columns = `table-4-columns`; 5 Columns = `table-5-columns`; 6 Columns = `table-6-columns`; 7 Columns = `table-7-columns`; 8 Columns = `table-8-columns`; 9 Columns = `table-9-columns` | `table` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Table blocks on the published block library pages (2 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| table | Options | Border | `""` | Supported (in the model) | n/a (default) |
| table | Options | Header | `""` | Supported (in the model) | n/a (default) |
| table | Columns | 1 Column | `table` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | Columns | 2 Columns | `table-2-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | Columns | 3 Columns | `table-3-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | Columns | 4 Columns | `table-4-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | Columns | 5 Columns | `table-5-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | Columns | 6 Columns | `table-6-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | Columns | 7 Columns | `table-7-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | Columns | 8 Columns | `table-8-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | Columns | 9 Columns | `table-9-columns` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Standard (header row)

- **Purpose:** most tables. **Fields:** Rows, the first one the headers; no Options.
- **Rendering:** `thead` with the first row (`th scope="col"`), `tbody` with the others.
- **Accessibility:** column headers announced with each cell.

#### No Header

- **Purpose:** data whose meaning is obvious without column names. **Options:** No Header.
- **Rendering:** no `thead`; a 2px rule above the first body row; all cells `td` (unless First
  Column Header).

#### First Column Header

- **Purpose:** row labels (a matrix, specifications). **Options:** First Column Header.
- **Rendering:** the first cell of every body row is `th scope="row"` (semibold, start-aligned); the
  header row's first cell stays a column header.

#### Row headers only (No Header + First Column Header)

- **Purpose:** label / value tables (Founded 1968, Headquarters Mumbai, India).
- **Rendering:** no `thead`; semibold row headers in the first column.

#### Striped

- **Purpose:** long tables. **Rendering:** odd body rows (1st, 3rd, …) on `--color-bg-secondary`.

#### Bordered

- **Purpose:** dense numeric tables. **Rendering:** a 1px `--color-border-default` border on every
  cell.

#### 1 to 9 Columns

- **Purpose:** the number of fields per Row (Row models `table-row`, `table-col-2` …
  `table-col-5`). **Dialog:** Columns, before adding Rows.

#### Scroll region (automatic)

- **Rendering:** while the table is wider than the block (`scrollWidth > clientWidth + 1`, watched
  with a ResizeObserver), the block gets `tabindex="0"`, `role="region"` and an `aria-label` (the
  heading's text, else the placeholder `table`, "Table"); removed when it fits. The block scrolls
  horizontally (`overflow-x: auto`) and shows a 2px brand focus outline.
- **Responsive:** typical on mobile from 4 columns.

```text
[Screenshot Placeholder]

File name:
table-row-headers-only-mobile.png

Purpose:
A No Header + First Column Header table at 390 px.

Annotations:
A = Row headers
B = Values
```

Personalization and fallback: none for any variation; every visitor sees the authored rows.

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
