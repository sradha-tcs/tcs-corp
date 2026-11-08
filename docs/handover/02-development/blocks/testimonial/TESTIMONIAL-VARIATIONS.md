---
id: "DEV-V-testimonial"
title: "Testimonial Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/testimonial/_testimonial.json"]
relatedComponents: ["testimonial"]
relatedPages: ["/design-block-master/en/block-library/testimonial","/design-block-master/en/block-library/testimonial/testimonial-variations"]
confidence: "Medium"
primary: false
---

# Testimonial Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-testimonial |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Testimonial block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/testimonial/_testimonial.json |
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
| `testimonial` | Title Type (`titleType`) | Content | No | H1 = `h1`; H2 = `h2`; H3 = `h3`; H4 = `h4`; H5 = `h5`; H6 = `h6` | `h2` |
| `testimonial` | BG Color (`bgColor`) | Style | No | Default = `""`; Grey = `grey`; Navy = `navy` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Testimonial blocks on the published block library pages (2 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| testimonial | Title Type | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | Title Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | Title Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | Title Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | Title Type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | Title Type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| testimonial | BG Color | Grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | BG Color | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Default

- **Purpose:** a client testimonial. **Fields:** Description (recommended), Author, Designation & Location; Title, Eyebrow and Author Image are optional. **Dialog:** defaults.
- **Rendering:** title, then the centred figure; no stats without Stat items. Desktop and mobile share the layout; the type and gaps are larger from 900px.
- **Accessibility:** `<figure>` / `<blockquote>` / `<figcaption>`. **Data layer:** the block entry only. **Personalization and fallback:** none.

```text
[Screenshot Placeholder]

File name:
testimonial-default-mobile.png

Purpose:
The default Testimonial at 375px.

Annotations:
A = Title
B = Quote
C = Author
```

#### Grey background

- **Purpose:** set the testimonial apart. **Configuration:** BG Color Grey (`bg-grey`).
- **Rendering:** a grey panel (`--color-bg-secondary`), with padding 2.5rem / 1.5rem, and 7.5rem / 5rem from 900px. Background animation becomes available.
- **Accessibility, data layer, personalization:** as Default.

```text
[Screenshot Placeholder]

File name:
testimonial-grey-background-tablet.png

Purpose:
BG Color Grey at 768px.

Annotations:
A = Grey padding
B = Stats
```

#### Author with photo / author text only

- **Purpose:** with or without a photo. **Configuration:** Author Image set or empty.
- **Rendering:** the 3rem round photo beside the name and details, wrapping and centred; without a photo, only the text lines.
- **Accessibility:** the photo is decorative unless Author Image Alt Text is set.

```text
[Screenshot Placeholder]

File name:
testimonial-author-photo-mobile.png

Purpose:
The author row with a photo at 375px.

Annotations:
A = Round photo
B = Name and designation
```

#### With stats

- **Purpose:** quantified results. **Configuration:** Stat items (or the Stats multifield authored before them).
- **Rendering:** a grid of columns at least 10rem wide (wrapping automatically), up to 70rem wide, under a 1px divider; each stat has its title above its value.
- **Accessibility:** a description list (`<dl>`, `<dt>`, `<dd>`).

```text
[Screenshot Placeholder]

File name:
testimonial-with-stats-mobile.png

Purpose:
Four stats at 375px, one per row.

Annotations:
A = Divider
B = Stat title
C = Stat value
```

#### Hide Eyebrow, Hide Title, Show Description off, Hide Author Details

- **Purpose:** hide parts without deleting them (for example a stats-only band, or while an approval is pending). **Configuration:** the Style tab toggles.
- **Rendering:** Hide Eyebrow, Show Description off and Hide Author Details leave their part out. Hide Title keeps the heading visually hidden. Without an eyebrow, description and author, the figure is left out.
- **Accessibility:** a hidden title still names the section for screen readers.

```text
[Screenshot Placeholder]

File name:
testimonial-hide-title-mobile.png

Purpose:
Hide Title on at 375px: no visible title, the heading still in the HTML.

Annotations:
A = Eyebrow (first visible element)
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
