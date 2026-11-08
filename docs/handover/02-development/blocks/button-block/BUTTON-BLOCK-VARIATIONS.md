---
id: "DEV-V-button-block"
title: "Button Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/button-block/_button-block.json"]
relatedComponents: ["button-block"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Button Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-button-block |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Button block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/button-block/_button-block.json |
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
| `button-block` | View (`buttonView`) | Style | No | Button = `button`; Icon = `icon`; Link = `link` | `button` |
| `button-block` | Type (`buttonVariant`) | Style | No | Primary = `primary`; Secondary = `secondary`; Tertiary = `tertiary` | `primary` |
| `button-block` | Icon (`buttonIcon`) | Style | No | Arrow right = `arrow-right`; Chevron right = `chevron-right`; Chevron down = `chevron-down`; Search = `search` | `arrow-right` |
| `button-block` | Alignment (`buttonAlignment`) | Style | No | Left = `left`; Center = `center`; Right = `right` | `left` |
| `button-block` | Text Decoration (`textDecoration`) | Style | No | Default = `none`; Overline = `overline`; line-Through = `line-through`; Underline = `underline`; underline overline = `underline overline` | `none` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Button blocks on the published block library pages (0 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| button-block | View | Button | `button` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | View | Icon | `icon` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | View | Link | `link` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Type | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Type | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Type | Tertiary | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Icon | Arrow right | `arrow-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Icon | Chevron right | `chevron-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Icon | Chevron down | `chevron-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Icon | Search | `search` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Alignment | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Text Decoration | Default | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Text Decoration | Overline | `overline` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Text Decoration | line-Through | `line-through` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Text Decoration | Underline | `underline` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | Text Decoration | underline overline | `underline overline` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Primary, Secondary, Tertiary (Button view)

- **Purpose:** the emphasis of a call to action; one primary per section.
- **Fields:** Link, Text; View Button; Type.
- **Rendering:** `a.button.primary|secondary|tertiary` with a trailing arrow (`icons/arrow-right.svg`
  as a CSS mask); min height `--button-height` (3.125rem); labels don't wrap (`white-space: nowrap`)
  and are clipped at the container width.
- **Accessibility / data layer:** a link named by its Text; `cmp:click` on click.
- **Fallback:** an unknown Type renders Primary.

#### Icon view

- **Purpose:** compact actions (search, arrow, chevron). **Fields:** Link, Text, View Icon, Icon,
  Type.
- **Rendering:** a round `--icon-button-size` (2.75rem) button; the Text kept in a hidden `span`, as
  `aria-label` and as tooltip.

```text
[Screenshot Placeholder]

File name:
button-block-icon-types-mobile.png

Purpose:
The three icon button types with each of the four icons at 390 px.

Annotations:
A = Primary icon buttons
B = Secondary icon buttons
C = Tertiary icon buttons
```

#### Link view

- **Purpose:** a text call to action ("View all insights"). **Rendering:** `a.link-button`,
  underlined, semibold, with a trailing chevron (`icons/chevron-right.svg`); Type ignored.

#### Alignment Left, Center, Right

- **Rendering:** `p.button-wrapper.button-align-left|center|right` (`text-align` start / center /
  end, so it follows the reading direction).

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
