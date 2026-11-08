---
id: "DEV-V-quote"
title: "Quote Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/quote/_quote.json"]
relatedComponents: ["quote"]
relatedPages: ["/design-block-master/en/block-library/quote","/design-block-master/en/block-library/quote/quote-variations"]
confidence: "Medium"
primary: false
---

# Quote Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-quote |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Quote block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/quote/_quote.json |
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
| `quote` | Title Type (`titleType`) | Content | No | H1 = `h1`; H2 = `h2`; H3 = `h3`; H4 = `h4`; H5 = `h5`; H6 = `h6` | `h2` |
| `quote` | Image Position (Desktop) (`imagePosition`) | Content | No | Right = `right`; Left = `left` | `right` |
| `quote` | Image Position (Mobile) (`imagePositionMobile`) | Content | No | Top = `top`; Bottom = `bottom` | `top` |
| `quote` | BG Color (`bgColor`) | Content | No | Default = `""`; Grey = `grey` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Quote blocks on the published block library pages (2 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| quote | Title Type | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Title Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Title Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Title Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Title Type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Title Type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Image Position (Desktop) | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Image Position (Desktop) | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Image Position (Mobile) | Top | `top` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | Image Position (Mobile) | Bottom | `bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| quote | BG Color | Grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Default (image right, image top on mobile)

- **Purpose:** the standard overlap layout. **When to use:** most quotes with a portrait. **When not to use:** without a portrait (see Text only).
- **Fields:** Quote or Quote Author (required for the card), Image (for the overlap); Eyebrow, Title, Image Alt Text are optional. **Dialog configuration:** none beyond the defaults (Right / Top).
- **Rendering:** desktop (900px and wider): a 498 : 204 : 418 grid, up to 70rem wide; the card spans the first two columns and the image the last two, so they overlap. Tablet and mobile: the image first, at 4:5, and the card overlapping its bottom edge by 3rem, inset 1rem.
- **Accessibility:** reading order header, card, image (the image is placed first visually below 900px by CSS order only). **Data layer:** the block entry only. **Personalization and fallback:** none; the authored content renders.

```text
[Screenshot Placeholder]

File name:
quote-default-tablet.png

Purpose:
The default Quote at 768px: image first, card overlapping its bottom edge.

Annotations:
A = Header
B = Image
C = Card
```

#### Image Left (desktop)

- **Purpose:** a mirrored layout, for example to alternate with a neighbouring block. **Configuration:** Image Position (Desktop) Left (class `image-left`).
- **Rendering:** from 900px the grid is 418 : 204 : 498, with the image on the left and the card overlapping its right edge. Below 900px it is the same as Default.
- **Accessibility, data layer, personalization:** as Default.

```text
[Screenshot Placeholder]

File name:
quote-image-left-mobile.png

Purpose:
Image Position (Desktop) Left at 375px: the same stacked layout as Default.

Annotations:
A = Image
B = Card
```

#### Image Bottom (mobile and tablet)

- **Purpose:** lead with the quote on small screens. **Configuration:** Image Position (Mobile) Bottom (class `image-bottom`).
- **Rendering:** below 900px the image moves below the card, and the card overlaps its top edge by 3rem. From 900px it has no effect.
- **Accessibility, data layer, personalization:** as Default.

```text
[Screenshot Placeholder]

File name:
quote-image-bottom-tablet.png

Purpose:
Image Position (Mobile) Bottom at 768px: the card first, the image below it.

Annotations:
A = Card
B = Image
```

#### Grey background

- **Purpose:** set the quote apart from white content. **Configuration:** BG Color Grey (class `bg-grey`).
- **Rendering:** the block and the card are grey (`--color-bg-secondary`), with the block's padding (2.5rem / 1.5rem, 7.5rem / 5rem from 900px, as on white).
- **Accessibility:** the text keeps the default text tokens. **Data layer, personalization:** as Default.

```text
[Screenshot Placeholder]

File name:
quote-grey-background-tablet.png

Purpose:
BG Color Grey at 768px.

Annotations:
A = Grey padding
B = Card
```

#### Text only (no image)

- **Purpose:** a pull quote without a portrait. **Configuration:** leave Image empty.
- **Rendering:** no `quote-has-media`; the card stands alone, centred in the 70rem body from 900px, with the same quote marks.
- **Accessibility, data layer, personalization:** as Default.

```text
[Screenshot Placeholder]

File name:
quote-text-only-tablet.png

Purpose:
A Quote without an image at 768px.

Annotations:
A = Card without overlap
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
