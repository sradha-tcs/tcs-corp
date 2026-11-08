---
id: "DEV-V-hero"
title: "Hero Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/hero/_hero.json"]
relatedComponents: ["hero"]
relatedPages: ["/design-block-master/en/block-library/hero","/design-block-master/en/block-library/hero/hero-ctas","/design-block-master/en/block-library/hero/hero-motion","/design-block-master/en/block-library/hero/hero-overview","/design-block-master/en/block-library/hero/hero-styles"]
confidence: "Medium"
primary: false
---

# Hero Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-hero |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Hero block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/hero/_hero.json |
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
| `hero` | Hero Image type (`classes_media`) | Content | No | Default = `""`; Lotto = `lottie` | `` |
| `hero` | Hero View (`classes`) | Content | No | Default = `""`; Contained image = `media-contained` | `` |
| `hero` | Title heading level (`content_titleType`) | Content | No | H1 = `h1`; H2 = `h2` | `h1` |
| `hero` | CTA List › CTA Text color (`ctaTextColor`) | Content | No | Default (Black) = `cta-text-black`; White = `cta-text-white` | `cta-text-black` |
| `hero` | CTA List › CTA Link Type (`ctaTarget`) | Content | No | Default = `same-window`; Open in New Window = `new-window` | `same-window` |
| `hero` | CTA List › CTA view (`ctaType`) | Content | No | Default = `default`; Primary = `primary`; Secondary = `secondary` | `default` |
| `hero` | CTA List › Primary CTA BG Color (Primary only) (`ctaPrimaryBackground`) | Content | No | Default = `primary-bg-default`; Blue-cyan (azure) = `primary-bg-azure` | `primary-bg-default` |
| `hero` | CTA List › Secondary CTA BG Color (Secondary only) (`ctaBackground`) | Content | No | Default (transparent) = `secondary-bg-default`; Light grey = `secondary-bg-light-grey`; Black 40% = `secondary-bg-black-40` | `secondary-bg-default` |
| `hero` | CTA List › Secondary CTA Border color (Secondary only) (`ctaBorder`) | Content | No | Default (as the BG Color) = `secondary-border-default`; Black = `secondary-border-black`; White = `secondary-border-white` | `secondary-border-default` |
| `hero` | CTA List › CTA Arrow (`ctaArrow`) | Content | No | Right = `right`; Down = `down` | `right` |
| `hero` | Vertical Alignment (`classes_alignment`) | Style | No | Top = `align-top`; Middle = `align-middle`; Bottom = `align-bottom` | `align-middle` |
| `hero` | Horizontal Alignment (`classes_horizontal`) | Style | No | Left = `align-left`; Center = `align-center`; Right = `align-right` | `align-center` |
| `hero` | Text Alignment (`classes_textAlignment`) | Style | No | Left align = `text-left`; Center align = `text-center`; Right align = `text-right` | `text-center` |
| `hero` | BG Color (`classes_background`) | Style | No | Default = `""`; Light, no overlay = `bg-light`; Dark blue = `bg-dark`; Dark blue (subtle) = `bg-dark-subtle`; Black = `bg-black`; Charcoal Black 80 (cool charcoal) = `bg-charcoal-80`; Midnight Navy 60 = `bg-navy-60`; Charcoal Black 40 (deep charcoal) = `bg-charcoal-40` | `` |
| `hero` | Icon color (`classes_iconcolor`) | Style | No | Default (as authored) = `""`; Black = `icon-black`; White = `icon-white`; Blue = `icon-blue`; Pale blue = `icon-pale-blue` | `` |
| `hero` | Eyebrow color (`classes_eyebrowcolor`) | Style | No | Default (royal blue) = `""`; Royal blue = `eyebrow-royal-blue`; Soft sky blue = `eyebrow-sky-blue` | `` |
| `hero-cta` | CTA Link Type (`linkTarget`) | — | No | Default = `""`; Open in New Window = `new-window` | `` |
| `hero-cta` | CTA view (`linkStyle`) | — | No | Default = `""`; Primary = `primary`; Secondary = `secondary` | `` |
| `hero-cta` | CTA Arrow (`linkArrow`) | — | No | Auto (down for links to sections of this page) = `""`; Right = `right`; Down = `down` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Hero blocks on the published block library pages (5 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| hero | Hero Image type | Default | `""` | Supported (in the model) | n/a (default) |
| hero | Hero Image type | Lotto | `lottie` | Supported (in the model) | Yes |
| hero | Hero View | Default | `""` | Supported (in the model) | n/a (default) |
| hero | Hero View | Contained image | `media-contained` | Supported (in the model) | Yes |
| hero | Title heading level | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | Title heading level | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA Text color | Default (Black) | `cta-text-black` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA Text color | White | `cta-text-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA Link Type | Default | `same-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA view | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA view | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA view | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › Primary CTA BG Color (Primary only) | Default | `primary-bg-default` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › Primary CTA BG Color (Primary only) | Blue-cyan (azure) | `primary-bg-azure` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › Secondary CTA BG Color (Secondary only) | Default (transparent) | `secondary-bg-default` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › Secondary CTA BG Color (Secondary only) | Light grey | `secondary-bg-light-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › Secondary CTA BG Color (Secondary only) | Black 40% | `secondary-bg-black-40` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › Secondary CTA Border color (Secondary only) | Default (as the BG Color) | `secondary-border-default` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › Secondary CTA Border color (Secondary only) | Black | `secondary-border-black` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › Secondary CTA Border color (Secondary only) | White | `secondary-border-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA Arrow | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | CTA List › CTA Arrow | Down | `down` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | Vertical Alignment | Top | `align-top` | Supported (in the model) | Yes |
| hero | Vertical Alignment | Middle | `align-middle` | Supported (in the model) | Yes |
| hero | Vertical Alignment | Bottom | `align-bottom` | Supported (in the model) | Yes |
| hero | Horizontal Alignment | Left | `align-left` | Supported (in the model) | Yes |
| hero | Horizontal Alignment | Center | `align-center` | Supported (in the model) | Yes |
| hero | Horizontal Alignment | Right | `align-right` | Supported (in the model) | Yes |
| hero | Text Alignment | Left align | `text-left` | Supported (in the model) | Yes |
| hero | Text Alignment | Center align | `text-center` | Supported (in the model) | Yes |
| hero | Text Alignment | Right align | `text-right` | Supported (in the model) | Yes |
| hero | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| hero | BG Color | Light, no overlay | `bg-light` | Supported (in the model) | Yes |
| hero | BG Color | Dark blue | `bg-dark` | Supported (in the model) | Yes |
| hero | BG Color | Dark blue (subtle) | `bg-dark-subtle` | Supported (in the model) | Yes |
| hero | BG Color | Black | `bg-black` | Supported (in the model) | Yes |
| hero | BG Color | Charcoal Black 80 (cool charcoal) | `bg-charcoal-80` | Supported (in the model) | Yes |
| hero | BG Color | Midnight Navy 60 | `bg-navy-60` | Supported (in the model) | Yes |
| hero | BG Color | Charcoal Black 40 (deep charcoal) | `bg-charcoal-40` | Supported (in the model) | Yes |
| hero | Icon color | Default (as authored) | `""` | Supported (in the model) | n/a (default) |
| hero | Icon color | Black | `icon-black` | Supported (in the model) | No |
| hero | Icon color | White | `icon-white` | Supported (in the model) | No |
| hero | Icon color | Blue | `icon-blue` | Supported (in the model) | Yes |
| hero | Icon color | Pale blue | `icon-pale-blue` | Supported (in the model) | Yes |
| hero | Eyebrow color | Default (royal blue) | `""` | Supported (in the model) | n/a (default) |
| hero | Eyebrow color | Royal blue | `eyebrow-royal-blue` | Supported (in the model) | No |
| hero | Eyebrow color | Soft sky blue | `eyebrow-sky-blue` | Supported (in the model) | Yes |
| hero-cta | CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| hero-cta | CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero-cta | CTA view | Default | `""` | Supported (in the model) | n/a (default) |
| hero-cta | CTA view | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero-cta | CTA view | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero-cta | CTA Arrow | Auto (down for links to sections of this page) | `""` | Supported (in the model) | n/a (default) |
| hero-cta | CTA Arrow | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero-cta | CTA Arrow | Down | `down` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

The variations are the select values of the model (`blocks/hero/_hero.json`), delivered as block classes. They combine freely.

#### Default image (Hero Image type Default, Hero View Default)

Purpose: a photograph covering the whole banner. Use for most heroes; not for illustrations that must not be cropped. Required: Hero Image Path, alt text (or decorative). Rendering: `div.hero-media > picture` absolutely positioned behind the content, `object-fit: cover`, under the BG Color overlay; the block gets `hero-has-media`. Desktop / tablet / mobile: the image is cropped around its centre into the banner's height. Accessibility: the `alt` names the image. Data layer: no change. Personalization and fallback: no personalization; without an image the hero renders without media.

```text
[Screenshot Placeholder]

File name:
hero-default-image-mobile.png

Purpose:
The Default image Hero at 375px: the image cropped to the centre of the 35rem banner.

Annotations:
A = Cropped cover image
B = Content block
```

#### Lotto (`lottie`)

Purpose: a looping Lottie animation as the background. Use for campaign pages with an approved Lottie JSON; not when the animation carries information the text doesn't. Required: Hero Image type Lotto, Hero Image Path a `.json` file; optional alt text. Rendering: `div.hero-media > div.hero-animation` (SVG renderer, `xMidYMid meet`, looping) and a pause / play `button.animation-toggle` appended to the block, 1rem (`--space-400`) from the bottom-right corner. The player loads when the hero is within 200px of the viewport, in idle time; the animation pauses off screen and starts paused on its first frame for reduced motion. If the file fails, the animation and its button are hidden. Accessibility: WCAG 2.2.2 pause control with localised labels (`pauseAnimation`, `playAnimation`). Data layer: a click on the button is a `cmp:click` with `interaction: animation`. Fallback: with Lotto and an image, the image is shown.

```text
[Screenshot Placeholder]

File name:
hero-lottie-tablet.png

Purpose:
The Lotto Hero at 768px with the pause / play button in the bottom-right corner.

Annotations:
A = Lottie animation
B = Pause / play button
```

#### Contained image (`media-contained`)

Purpose: show an illustration or chart whole, centred behind the content. Use for artwork that must not be cropped; not for photographs meant to fill the banner. Rendering: the media becomes a centred flex box with `--space-600` padding and the image `object-fit: contain`. Usually paired with BG Color Light, no overlay. Accessibility and data layer as Default.

```text
[Screenshot Placeholder]

File name:
hero-contained-image-mobile.png

Purpose:
The Contained image Hero at 375px: the whole illustration visible inside the banner.

Annotations:
A = Contained illustration
B = Content block
```

#### Text only (no media)

Purpose: a plain banner without image. Rendering: no `hero-media`, no `hero-has-media`, no overlay; the block background is `--color-bg-default` (navy or black with the dark BG Colors). Use for simple statement pages.

#### BG Color: Default, Light no overlay (`bg-light`), Dark blue (`bg-dark`), Dark blue subtle (`bg-dark-subtle`), Black (`bg-black`), Charcoal Black 80 (`bg-charcoal-80`), Midnight Navy 60 (`bg-navy-60`), Charcoal Black 40 (`bg-charcoal-40`)

Purpose: readability of the text over the media. Rendering and colours as in [Authorable Fields](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/hero/README.md#authorable-fields); Charcoal Black 80 is a `rgba(34, 35, 41, 0.8)` overlay, Midnight Navy 60 `rgba(1, 18, 31, 0.6)` (the Dark blue subtle overlay with the 50 % white description of the other dark options), Charcoal Black 40 `rgba(12, 12, 13, 0.4)`; all three are dark options (white text, the header keeps its band). Use a dark option for white text on photographs; Light, no overlay only with light, calm images. Accessibility: the dark colours were adjusted for WCAG 1.4.3 (re-audit R-B-4); the Default overlay's eyebrow contrast awaits design sign-off.

```text
[Screenshot Placeholder]

File name:
hero-bg-dark-subtle-mobile.png

Purpose:
BG Color Dark blue (subtle) at 375px: white eyebrow, white title and 85 % white description over the 60 % navy overlay.

Annotations:
A = White eyebrow
B = Description at 85 % white
C = White Secondary CTA
```

#### Vertical Alignment: Top, Middle, Bottom (`align-top`, `align-middle`, `align-bottom`)

Positions the content block in the banner's height (`justify-content`). Middle is the template default.

#### Horizontal Alignment: Left, Center, Right (`align-left`, `align-center`, `align-right`)

Positions the content block across the banner. From 900px Left and Right limit the content block to 47.5rem; below 900px it is full width.

#### Text Alignment: Left, Center, Right align (`text-left`, `text-center`, `text-right`)

Aligns the icon, text and CTAs inside the content block. Center align is the template default.

#### CTA view, CTA Arrow and CTA Link Type (item options)

Default (text with arrow, `tertiary`), Primary, Secondary; Arrow Auto / Right / Down; Link Type Default / Open in New Window. See [Authorable Fields](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/hero/README.md#authorable-fields).

#### Title heading level H2

For any Hero other than the page's main one: the title renders as `h2.hero-title` with the same styles as an H1.

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
