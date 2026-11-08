---
id: "DEV-V-image-collage"
title: "Image Collage Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/image-collage/_image-collage.json"]
relatedComponents: ["image-collage"]
relatedPages: []
confidence: "Medium"
primary: false
---

# Image Collage Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-image-collage |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Image Collage block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/image-collage/_image-collage.json |
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
| `image-collage` | Title Type (`titleType`) | Content | No | H1 = `h1`; H2 = `h2`; H3 = `h3`; H4 = `h4`; H5 = `h5`; H6 = `h6` | `h2` |
| `image-collage` | Primary CTA Link Type (`primaryCtaTarget`) | Content | No | Default = `""`; Open in New Window = `new-window` | `` |
| `image-collage` | Primary CTA Link Style (`primaryCtaStyle`) | Content | No | Primary Button = `primary`; Primary Button (no arrow) = `primary-no-arrow`; Secondary Button = `secondary`; Secondary Button (no arrow) = `secondary-no-arrow` | `primary` |
| `image-collage` | Primary CTA Background (`primaryCtaBackground`) | Content | No | Style default = `""`; White = `button-bg-white`; Blue = `button-bg-blue`; Translucent white = `button-bg-translucent` | `` |
| `image-collage` | Primary CTA Shape (`primaryCtaShape`) | Content | No | Style default = `""`; Rectangle = `button-rectangle` | `` |
| `image-collage` | Secondary CTA Link Type (`secondaryCtaTarget`) | Content | No | Default = `""`; Open in New Window = `new-window` | `` |
| `image-collage` | Secondary CTA Link Style (`secondaryCtaStyle`) | Content | No | Primary Button = `primary`; Primary Button (no arrow) = `primary-no-arrow`; Secondary Button = `secondary`; Secondary Button (no arrow) = `secondary-no-arrow` | `secondary` |
| `image-collage` | Secondary CTA Background (`secondaryCtaBackground`) | Content | No | Style default = `""`; White = `button-bg-white`; Blue = `button-bg-blue`; Translucent white = `button-bg-translucent` | `` |
| `image-collage` | Secondary CTA Shape (`secondaryCtaShape`) | Content | No | Style default = `""`; Rectangle = `button-rectangle` | `` |
| `image-collage` | Title weight (`titleWeight`) | Style | No | Layout default = `""`; Regular = `title-regular`; Semibold = `title-semibold` | `` |
| `image-collage` | Description size (`descriptionSize`) | Style | No | Layout default = `""`; Regular (18px) = `text-regular`; Large (24px) = `text-large` | `` |
| `image-collage` | Background color (`backgroundColor`) | Style | No | Dark = `""`; Navy = `bg-navy` | `` |
| `image-collage-item` | Image treatment (`imageTreatment`) | Collage image | No | Black and white = `black-white`; Normal = `normal` | `black-white` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Image Collage blocks on the published block library pages (0 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| image-collage | Title Type | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Title Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Title Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Title Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Title Type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Title Type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| image-collage | Primary CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| image-collage | Primary CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Primary CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| image-collage | Primary CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| image-collage | Secondary CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| image-collage | Secondary CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Secondary CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| image-collage | Secondary CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Title weight | Layout default | `""` | Supported (in the model) | n/a (default) |
| image-collage | Title weight | Regular | `title-regular` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Title weight | Semibold | `title-semibold` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Description size | Layout default | `""` | Supported (in the model) | n/a (default) |
| image-collage | Description size | Regular (18px) | `text-regular` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Description size | Large (24px) | `text-large` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | Background color | Dark | `""` | Supported (in the model) | n/a (default) |
| image-collage | Background color | Navy | `bg-navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage-item | Image treatment | Black and white | `black-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage-item | Image treatment | Normal | `normal` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Default

Dark background, black and white images, regular title, regular description, Primary and Secondary CTAs side by side.

#### Colour images

Image treatment Normal on some or all items shows them in colour.

#### Style options

Title weight (Regular, Semibold), Description size (Regular, Large) and Background color (Dark, Navy) set block classes (`title-*`, `text-*`, `bg-navy`).

#### CTA styles

Primary or Secondary, with or without the arrow (`image-collage-cta-no-arrow`), with a White, Blue or Translucent white background and a Rectangle shape (`button-bg-*`, `button-rectangle`).

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
