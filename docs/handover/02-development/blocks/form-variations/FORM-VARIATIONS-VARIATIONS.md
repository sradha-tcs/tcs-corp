---
id: "DEV-V-form-variations"
title: "Form Variations Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/form-variations/_form-variations.json"]
relatedComponents: ["form-variations"]
relatedPages: ["/design-block-master/en/block-library/form-variations","/design-block-master/en/block-library/form-variations/field-types","/design-block-master/en/block-library/form-variations/form-variations"]
confidence: "Medium"
primary: false
---

# Form Variations Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-form-variations |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Form Variations block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/form-variations/_form-variations.json |
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
| `form-variations` | Theme (`classes`) | Content | No | Default = `""`; Dark = `dark` | `` |
| `field-text` | Input Type (`inputKind`) | — | No | Text = `text`; Email = `email`; Tel = `tel` | `text` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Form Variations blocks on the published block library pages (3 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| form-variations | Theme | Default | `""` | Supported (in the model) | n/a (default) |
| form-variations | Theme | Dark | `dark` | Supported (in the model) | Yes |
| field-text | Input Type | Text | `text` | Supported (in the model) | Not checkable (data attribute / field value) |
| field-text | Input Type | Email | `email` | Supported (in the model) | Not checkable (data attribute / field value) |
| field-text | Input Type | Tel | `tel` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Default theme

Purpose: a form on a light page. Use it by default; don't use it on a dark section background unless the theme contract of the section (styles/styles.css) gives enough contrast. Required: field items and a Submit Button; optional: title, description. Dialog: Theme = Default. Rendering: centred, at most 45rem wide; one column below 900px, two columns from 900px. Accessibility and data layer as in the sections below. Personalization: none; the authored form renders.

```text
[Screenshot Placeholder]

File name:
form-variations-default-mobile.png

Purpose:
The Default theme at 375 px: single column, full-width fields, Send button left aligned.

Annotations:
A = Title and description
B = Fields in one column
C = Send button
```

#### Dark theme

Purpose: a highlighted panel (e.g. "Talk to our experts"). Dialog: Theme = Dark (block class `dark`). Rendering: a dark (`--color-bg-neutral`) panel with `--radius-l` corners across the container, content centred at 45rem; padding grows at 600px and 900px; light labels, transparent inputs, a light-blue contact name and status, and the primary button inverted to white. Error colour `#ff6b6b` (hard-coded). Background animation, when chosen, reveals this panel.

```text
[Screenshot Placeholder]

File name:
form-variations-dark-tablet.png

Purpose:
The Dark theme at 768 px: the panel with its tablet padding and a contact card shown for a region.

Annotations:
A = Dark panel
B = Contact card
C = White Send button
```

#### Half-width name fields

Not a dialog option: a Text Input Field whose Field Name / ID contains "name" gets `half-width` and sits beside the next half-width field from 900px. Use it for First name / Last name; avoid "name" in other field names.

#### Conditional items

Not a dialog option per se: any field, contact card or Submit Button with a condition value. Rendering: `data-depends-on` on the item's group; hidden and disabled until a dropdown has the value; chains of conditions are resolved; in the editor all are shown with a note and a dashed border.

```text
[Screenshot Placeholder]

File name:
form-variations-conditional-desktop.png

Purpose:
Sector set to Other reveals the mandatory "Please specify your sector" input.

Annotations:
A = Controlling dropdown
B = Revealed conditional field
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
