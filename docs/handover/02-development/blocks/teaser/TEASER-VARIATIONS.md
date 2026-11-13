---
id: "DEV-V-teaser"
title: "Teaser Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["blocks/teaser/_teaser.json"]
relatedComponents: ["teaser"]
relatedPages: ["/design-block-master/en/block-library/teaser","/design-block-master/en/block-library/teaser/alignment","/design-block-master/en/block-library/teaser/article-meta","/design-block-master/en/block-library/teaser/cta-styles","/design-block-master/en/block-library/teaser/description-eyebrow-spacing","/design-block-master/en/block-library/teaser/image-options-and-colours","/design-block-master/en/block-library/teaser/image-positions","/design-block-master/en/block-library/teaser/layouts","/design-block-master/en/block-library/teaser/links-and-stats","/design-block-master/en/block-library/teaser/mobile-image-position","/design-block-master/en/block-library/teaser/title-sizes-and-weights"]
confidence: "Medium"
primary: false
---

# Teaser Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-teaser |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Teaser block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | blocks/teaser/_teaser.json |
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
| `teaser` | Title Type (`titleType`) | Content | No | H1 (64px) = `h1`; H2 (48px) = `h2`; H3 (40px) = `h3`; H4 (28px) = `h4`; H5 (24px) = `h5`; H6 (20px) = `h6` | `h2` |
| `teaser` | Date Format (`dateFormat`) | Content | No | DD-MM-YYYY = `dd-mm-yyyy`; MM-DD-YYYY = `mm-dd-yyyy`; MMM d, yyyy = `mmm-d-yyyy`; DD/MM/YY = `dd/mm/yy` | `dd-mm-yyyy` |
| `teaser` | Image type (`imageFormat`) | Content | No | Default = `""`; Lottie = `lottie` | `` |
| `teaser` | Image position (`imagePosition`) | Content | No | Left = `left`; Right = `right`; Top = `top`; Bottom = `bottom` | `left` |
| `teaser` | Image position (mobile) (`imagePositionMobile`) | Content | No | Default = `""`; Top = `mobile-image-top`; Bottom = `mobile-image-bottom` | `` |
| `teaser` | Image ratio (`imageRatio`) | Content | No | Default (10:9; 16:9 above or below the text; original in Text split) = `""`; Portrait (8:9) = `ratio-8-9`; Square (1:1) = `ratio-1-1`; Original = `ratio-original` | `` |
| `teaser` | Image corners (`imageCorners`) | Content | No | Rounded = `""`; Square = `square` | `` |
| `teaser` | Links (authored before Link items) › CTA Link Type (`ctaTarget`) | Content | No | Default = `""`; Open in New Window = `new-window` | `` |
| `teaser` | Links (authored before Link items) › CTA Link Style (`ctaStyle`) | Content | No | Text link = `""`; List = `list`; Primary Button = `primary`; Primary Button (no arrow) = `primary-no-arrow`; Secondary Button = `secondary`; Secondary Button (no arrow) = `secondary-no-arrow` | `` |
| `teaser` | Links (authored before Link items) › CTA Background (`ctaBackground`) | Content | No | Style default = `""`; White = `button-bg-white`; Blue = `button-bg-blue`; Translucent white = `button-bg-translucent` | `` |
| `teaser` | Links (authored before Link items) › CTA Shape (`ctaShape`) | Content | No | Style default = `""`; Rectangle = `button-rectangle` | `` |
| `teaser` | List arrow (`linkArrow`) | Content | No | Right = `""`; Down right = `arrow-down-right`; None = `arrow-none` | `` |
| `teaser` | Primary CTA Link Type (`primaryCtaTarget`) | Content | No | Default = `""`; Open in New Window = `new-window` | `` |
| `teaser` | Primary CTA Link Style (`primaryCtaStyle`) | Content | No | Text link = `tertiary`; List = `list`; Primary Button = `primary`; Primary Button (no arrow) = `primary-no-arrow`; Secondary Button = `secondary`; Secondary Button (no arrow) = `secondary-no-arrow` | `primary` |
| `teaser` | Primary CTA Background (`primaryCtaBackground`) | Content | No | Style default = `""`; White = `button-bg-white`; Blue = `button-bg-blue`; Translucent white = `button-bg-translucent` | `` |
| `teaser` | Primary CTA Shape (`primaryCtaShape`) | Content | No | Style default = `""`; Rectangle = `button-rectangle` | `` |
| `teaser` | Secondary CTA Link Type (`secondaryCtaTarget`) | Content | No | Default = `""`; Open in New Window = `new-window` | `` |
| `teaser` | Secondary CTA Link Style (`secondaryCtaStyle`) | Content | No | Text link = `tertiary`; List = `list`; Primary Button = `primary`; Primary Button (no arrow) = `primary-no-arrow`; Secondary Button = `secondary`; Secondary Button (no arrow) = `secondary-no-arrow` | `secondary` |
| `teaser` | Secondary CTA Background (`secondaryCtaBackground`) | Content | No | Style default = `""`; White = `button-bg-white`; Blue = `button-bg-blue`; Translucent white = `button-bg-translucent` | `` |
| `teaser` | Secondary CTA Shape (`secondaryCtaShape`) | Content | No | Style default = `""`; Rectangle = `button-rectangle` | `` |
| `teaser` | Layout (`classes`) | Style | No | Image & Text = `""`; Text split (title left, text right) = `no-image`; Background image = `background`; Card = `card`; Image collage = `image-collage` | `` |
| `teaser` | BG Color (`bgColor`) | Style | No | Default = `""`; Grey = `grey`; Dark = `dark`; Dark green = `dark-green`; Navy = `navy` | `` |
| `teaser` | Text alignment (`textAlignment`) | Style | No | Layout default = `""`; Left = `text-left`; Center = `text-center`; Right = `text-right`; Justify = `text-justify` | `` |
| `teaser` | Vertical alignment (`verticalAlignment`) | Style | No | Layout default = `""`; Top = `valign-top`; Center = `valign-middle`; Bottom = `valign-bottom` | `` |
| `teaser` | Title weight (`titleWeight`) | Style | No | Layout default = `""`; Regular = `title-regular`; Semibold = `title-semibold` | `` |
| `teaser` | Title color (`titleColor`) | Style | No | Style default = `""`; Dark = `title-dark`; White = `title-white`; Light blue = `title-light-blue` | `` |
| `teaser` | Description size (`descriptionSize`) | Style | No | Layout default = `""`; Regular (18px) = `text-regular`; Large (24px) = `text-large` | `` |
| `teaser` | Eyebrow Style (`eyebrowStyle`) | Style | No | Brand = `""`; Label (uppercase, grey) = `eyebrow-label`; Grey = `eyebrow-grey`; White = `eyebrow-white` | `` |
| `teaser` | Top spacing (`topSpacing`) | Style | No | Default = `""`; Page header (extra space above) = `spacing-header` | `` |
| `teaser` | Link CTA Alignment (`linkCtaAlignment`) | Style | No | Default = `right`; Left = `left` | `right` |
| `teaser-link` | CTA Link Type (`linkTarget`) | — | No | Default = `""`; Open in New Window = `new-window` | `` |
| `teaser-link` | CTA Link Style (`linkStyle`) | — | No | Text link = `""`; List = `list`; Primary Button = `primary`; Primary Button (no arrow) = `primary-no-arrow`; Secondary Button = `secondary`; Secondary Button (no arrow) = `secondary-no-arrow` | `` |
| `teaser-link` | Button background (`buttonBackground`) | — | No | Style default = `""`; White = `button-bg-white`; Blue = `button-bg-blue`; Translucent white = `button-bg-translucent` | `` |
| `teaser-link` | Button shape (`buttonShape`) | — | No | Style default = `""`; Rectangle = `button-rectangle` | `` |
| `teaser-collage-image` | Image treatment (`imageTreatment`) | Collage image | No | Black and white = `black-white`; Normal = `normal` | `black-white` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Teaser blocks on the published block library pages (11 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| teaser | Title Type | H1 (64px) | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title Type | H2 (48px) | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title Type | H3 (40px) | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title Type | H4 (28px) | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title Type | H5 (24px) | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title Type | H6 (20px) | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Date Format | DD-MM-YYYY | `dd-mm-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Date Format | MM-DD-YYYY | `mm-dd-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Date Format | MMM d, yyyy | `mmm-d-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Date Format | DD/MM/YY | `dd/mm/yy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | Image type | Lottie | `lottie` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image position | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image position | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image position | Top | `top` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image position | Bottom | `bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image position (mobile) | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | Image position (mobile) | Top | `mobile-image-top` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image position (mobile) | Bottom | `mobile-image-bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image ratio | Default (10:9; 16:9 above or below the text; original in Text split) | `""` | Supported (in the model) | n/a (default) |
| teaser | Image ratio | Portrait (8:9) | `ratio-8-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image ratio | Square (1:1) | `ratio-1-1` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image ratio | Original | `ratio-original` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Image corners | Rounded | `""` | Supported (in the model) | n/a (default) |
| teaser | Image corners | Square | `square` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | Links (authored before Link items) › CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Link Style | Text link | `""` | Supported (in the model) | n/a (default) |
| teaser | Links (authored before Link items) › CTA Link Style | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | Links (authored before Link items) › CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Links (authored before Link items) › CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | Links (authored before Link items) › CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | List arrow | Right | `""` | Supported (in the model) | n/a (default) |
| teaser | List arrow | Down right | `arrow-down-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | List arrow | None | `arrow-none` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | Primary CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Link Style | Text link | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Link Style | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | Primary CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Primary CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | Primary CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | Secondary CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Link Style | Text link | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Link Style | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | Secondary CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Secondary CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | Secondary CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Layout | Image & Text | `""` | Supported (in the model) | n/a (default) |
| teaser | Layout | Text split (title left, text right) | `no-image` | Supported (in the model) | Yes |
| teaser | Layout | Background image | `background` | Supported (in the model) | Yes |
| teaser | Layout | Card | `card` | Supported (in the model) | Yes |
| teaser | Layout | Image collage | `image-collage` | Supported (in the model) | Yes |
| teaser | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | BG Color | Grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | BG Color | Dark | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | BG Color | Dark green | `dark-green` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | BG Color | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Text alignment | Layout default | `""` | Supported (in the model) | n/a (default) |
| teaser | Text alignment | Left | `text-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Text alignment | Center | `text-center` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Text alignment | Right | `text-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Text alignment | Justify | `text-justify` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Vertical alignment | Layout default | `""` | Supported (in the model) | n/a (default) |
| teaser | Vertical alignment | Top | `valign-top` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Vertical alignment | Center | `valign-middle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Vertical alignment | Bottom | `valign-bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title weight | Layout default | `""` | Supported (in the model) | n/a (default) |
| teaser | Title weight | Regular | `title-regular` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title weight | Semibold | `title-semibold` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title color | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | Title color | Dark | `title-dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title color | White | `title-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Title color | Light blue | `title-light-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Description size | Layout default | `""` | Supported (in the model) | n/a (default) |
| teaser | Description size | Regular (18px) | `text-regular` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Description size | Large (24px) | `text-large` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Eyebrow Style | Brand | `""` | Supported (in the model) | n/a (default) |
| teaser | Eyebrow Style | Label (uppercase, grey) | `eyebrow-label` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Eyebrow Style | Grey | `eyebrow-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Eyebrow Style | White | `eyebrow-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Top spacing | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | Top spacing | Page header (extra space above) | `spacing-header` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Link CTA Alignment | Default | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | Link CTA Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser-link | CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | CTA Link Style | Text link | `""` | Supported (in the model) | n/a (default) |
| teaser-link | CTA Link Style | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | Button background | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser-link | Button background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | Button background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | Button background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-link | Button shape | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser-link | Button shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-collage-image | Image treatment | Black and white | `black-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser-collage-image | Image treatment | Normal | `normal` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Image & Text (default layout)

- **Purpose:** an image beside (or above / below) the text. **When to use:** promoting a service, an industry or a capability. **When not to use:** two text columns (Text split).
- **Required / optional:** a Title and an Image are recommended; everything else is optional. **Dialog:** Layout Image & Text; Image position Left / Right / Top / Bottom; Image position (mobile); Image ratio; Image corners.
- **Rendering:** the block is a grid with `teaser-has-media`. Left / Right: two equal columns from 600px; the image is first below 600px, unless Image position (mobile) is Bottom. Top / Bottom: one column at every width, with a 16:9 image by default.
- **Accessibility:** the image alt text, or a decorative `alt=""`. **Data layer:** link clicks. **Personalization and fallback:** none.

```text
[Screenshot Placeholder]

File name:
teaser-image-text-tablet.png

Purpose:
Image & Text, image left, at 768px: two columns (from 600px).

Annotations:
A = Image (10:9)
B = Text column
```

#### Image & Text without image (centred)

- **Purpose:** a text-only message, for example a careers call. **Configuration:** Image & Text with no image (or Hide Image on).
- **Rendering:** without `teaser-has-media` the content is centred in up to 37.5rem, unless Text alignment is Left or Right. Buttons side by side rows are centred too.
- **Accessibility, data layer, personalization:** as above.

```text
[Screenshot Placeholder]

File name:
teaser-image-text-no-image-mobile.png

Purpose:
A centred teaser without an image at 375px.

Annotations:
A = Centred title
B = Centred buttons
```

#### Text split

- **Purpose:** a two-column text section or an article-style header. **Configuration:** Layout Text split (`no-image`).
- **Rendering:** below 900px, one column. From 900px, a grid: the kicker (eyebrow, tags, date, reading time, actions) spans both columns; the title row and the author are on the left; the body (description, image, stats, links, short description) on the right. The title is regular weight and the text larger. An image goes in the body after the description, always without rounded corners, and shown whole unless Image ratio is 8:9 or 1:1. Image position (mobile) Top / Bottom moves it within the body below 900px.
- **Accessibility:** the DOM order is header, then body. **Data layer:** links, listen, download and share clicks.

```text
[Screenshot Placeholder]

File name:
teaser-text-split-mobile.png

Purpose:
Text split at 375px in one column.

Annotations:
A = Kicker
B = Title
C = Body
```

#### Background image

- **Purpose:** a full-width banner. **Configuration:** Layout Background image (`background`), Image.
- **Rendering:** the image covers the block under an overlay (60% near-black; 80% with BG Color Dark, dark green with Dark green). Text is light and centred. Minimum height 35rem, padding 5rem / 1.5rem; from 900px 48.75rem, padding 7.5rem / 5rem. Vertical alignment Top / Bottom moves the content.
- **Accessibility:** light text on the overlay; secondary and text-link buttons turn light (primary buttons keep their style).

```text
[Screenshot Placeholder]

File name:
teaser-background-image-mobile.png

Purpose:
Background image at 375px.

Annotations:
A = Overlay
B = Centred text
```

#### Card

- **Purpose:** a media kit or coverage card. **Configuration:** Layout Card (`card`), Image.
- **Rendering:** a rounded card with the image under a 70% black overlay; the header at the top and the body at the bottom (space-between). Minimum height 25rem, padding 1.5rem; from 900px 35.625rem, padding 2.5rem. Left-aligned by default.
- **Accessibility:** as Background image.

```text
[Screenshot Placeholder]

File name:
teaser-card-tablet.png

Purpose:
Card at 768px.

Annotations:
A = Header
B = Links at the bottom
```

#### Image collage

- **Purpose:** a statement section framed by a collage of images. **Configuration:** Layout Image collage (`image-collage`) and up to nine Collage image items (Image, Image alt text, Image treatment).
- **Rendering:** centred text (title 3rem semibold, description 1.125rem in `#9e9fa3`, a Figma value with no site token: `--teaser-collage-text-color`) on a dark background (`--black-1000` with a soft radial highlight), with pill buttons (white outline and text on `--black-800`). The images are placed absolutely around the text (1.5rem corners), floating 0.5rem up and down (`teaser-collage-zig` / `teaser-collage-zag`, 7s / 8s, endless). From 900px the block is 64rem high (the Figma 1440 × 1024 frame) and each image has its own Figma position, size and opacity (40–100%), partly outside the block. Below 900px the block is 64rem high too, the title 2rem, and the images keep their positions in a fixed 64rem × 64rem composition (Figma 1024 × 1024) centred and cropped at the sides: at 375px images 1, 4, 5 and 8 are in view, at 768px seven of the nine, none over the text. Below 900px the buttons are compact (0.75rem text on one line, 3.125rem high) and the text column is full width; with Buttons side by side they share a row while their labels fit and otherwise wrap, each on a full-width row, so no label is cut off (e.g. "Explore" / "Contact us" side by side down to 320px, longer labels stacked at 375px and side by side at 768px).
- **Accessibility:** the images are decorative (`aria-hidden`). The floating stops with reduced motion (`prefers-reduced-motion`), but there is no pause / play button yet (WCAG 2.2.2, see AGENTS.md "Accessibility").

#### Image type Lotto (Lottie animation)

- **Purpose:** an animated illustration. **Configuration:** Image type Lotto and a Lottie `.json` from AEM Assets (published).
- **Rendering:** `div.teaser-animation` in the media box, with a pause / play button (`.animation-toggle`) in its corner. The player loads when the animation nears the viewport, in idle time; it pauses off screen and stays on its first frame for reduced motion. If the file fails to load, the animation and its button are hidden.
- **Accessibility:** `role="img"` with the label, or `aria-hidden`; the button names come from the placeholders `pauseAnimation` / `playAnimation` (WCAG 2.2.2). **Data layer:** the toggle is a `cmp:click` with `interaction` `animation`.

```text
[Screenshot Placeholder]

File name:
teaser-lotto-mobile.png

Purpose:
A Lotto teaser at 375px with the pause button.

Annotations:
A = Animation
B = Pause / play button
```

#### BG Color (Default, Grey, Dark, Dark green)

- **Purpose:** a coloured panel. **Configuration:** BG Color (`bg-grey`, `bg-dark`, `bg-dark-green`). It sets only the colour; use the Additional tab's Padding for space.
- **Rendering:** Grey uses `--color-bg-secondary`. Dark (`--color-bg-neutral`) and Dark green (`--color-bg-dark-green`) switch the text to light, the eyebrow and stat values to brand 300, and secondary and text-link buttons to light. In a dark Section or Columns Container, a Grey Teaser sets the text tokens back to dark (`styles/styles.css` theme contract).
- **Accessibility:** primary buttons aren't adapted on the Teaser's own Dark / Dark green (see Known Limitations).

```text
[Screenshot Placeholder]

File name:
teaser-bg-dark-mobile.png

Purpose:
BG Color Dark at 375px with padding from the Additional tab.

Annotations:
A = Dark panel
B = Light text
C = Buttons
```

#### Link styles and arrows

- **Purpose:** buttons, text links or a list of links. **Configuration:** CTA Link Style (Text link, List, Primary Button, Primary Button (no arrow), Secondary Button); List arrow (Right, Down right, None); Buttons side by side.
- **Rendering:** Text link is a tertiary button with an arrow. List is a full-width row with a divider (except the last) and an arrow (an up-right arrow when it opens a new window). Primary / Secondary are buttons. Primary Button (no arrow) uses the primary fill `rgba(1, 22, 39, 1)` and hides its arrow without changing button dimensions. Buttons side by side puts them in a wrapping row that follows the text alignment; left, center and right share the same full content-width CTA container; List rows keep the full width.
- **Accessibility:** List links are in a `<ul>`. A new-window link carries a hidden "(opens in a new tab)" (placeholder `opensInNewTab`). **Data layer:** each click is `cmp:click`, `interaction` `link`.

```text
[Screenshot Placeholder]

File name:
teaser-links-mixed-mobile.png

Purpose:
List rows, a primary button and a text link in one teaser at 375px.

Annotations:
A = List rows
B = Primary button
C = Text link
```

#### Article meta (date, reading time, actions, author, tags) and View All

- **Purpose:** an article-style header (Figma "L3 Header"), or a section title with a View All button. **Configuration:** Show Date, Date, Date Format, Date label, Reading time, Listen link, Download, Share, Display Tags, Tags, the author fields, View All Text / Link.
- **Rendering:** the kicker holds the eyebrow, the tags (uppercase, separated by bars) and the info (date, reading time, actions), wrapped and spaced between. The heading row holds the title and View All. The author lockup sits below the title.
- **Accessibility:** icon buttons with names; `role="status"` for "Link copied". **Data layer:** `interaction` `listen`, `download`, `share`, and `link` for View All.

```text
[Screenshot Placeholder]

File name:
teaser-article-meta-mobile.png

Purpose:
A Text split teaser with date, reading time, actions, tags and author at 375px.

Annotations:
A = Tags
B = Date and reading time
C = Action icons
D = Author
```

#### Stats

- **Purpose:** headline numbers. **Configuration:** Stat items (or the Stats multifield authored before them).
- **Rendering:** a `<dl>` with wrapping items of at least 11.25rem; the value is in the brand colour at 2.75rem, and 6rem from 900px.
- **Accessibility:** a description list (`<dt>` title, `<dd>` value).

```text
[Screenshot Placeholder]

File name:
teaser-stats-mobile.png

Purpose:
Stats at 375px.

Annotations:
A = Stat title
B = Stat value
```

#### Style options

- **Text alignment** (`text-left`, `text-center`, `text-right`). Center has no effect in Text split.
- **Vertical alignment** (`valign-top`, `valign-middle`, `valign-bottom`): how the text and image (or the two Text split columns) line up; for Background image it moves the content.
- **Title weight** (`title-regular`, `title-semibold`); **Description size** (`text-regular` 18px, `text-large` 24px on desktop); **Eyebrow style** Label (`eyebrow-label`, small uppercase grey).
- **Top spacing** Page header (`spacing-header`): 4rem above, 12.5rem from 900px. It has no effect on Background image and Card, whose padding wins.

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../SCREENSHOT-REGISTER.md).

## Known limitations

- Combination rules (which options cannot be combined) are described in the README narrative only where they exist; unsupported combinations are not enumerated.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
