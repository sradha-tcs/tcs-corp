---
id: "DEV-004"
title: "Design Style Guide"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "UX/UI Lead plus Technical Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["styles/styles.css","styles/lazy-styles.css","styles/fonts.css","styles/motion.css","styles/card-list.css","docs/handover/knowledge-base/design-system.md"]
relatedComponents: []
relatedPages: []
confidence: "High"
primary: true
---

# Design Style Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-004 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Typography, colours, spacing, layout, breakpoints, motion and states, with every token cited from the source CSS |
| Scope | — |
| Prerequisites | — |
| Owner | UX/UI Lead plus Technical Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | styles/styles.css, styles/lazy-styles.css, styles/fonts.css, styles/motion.css, styles/card-list.css, docs/handover/knowledge-base/design-system.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Summary](#summary)
- [Figma relationship](#figma-relationship)
- [Design tokens](#design-tokens)
- [Typography](#typography)
- [Colours](#colours)
- [Backgrounds and theme](#backgrounds-and-theme)
- [Spacing](#spacing)
- [Layout and grid](#layout-and-grid)
- [Breakpoints](#breakpoints)
- [Responsive strategy](#responsive-strategy)
- [Icons](#icons)
- [Images](#images)
- [Borders, radius and shadows](#borders-radius-and-shadows)
- [Motion](#motion)
- [Focus states](#focus-states)
- [Component variations](#component-variations)
- [Mapping Figma components and variations to blocks and dialog values](#mapping-figma-components-and-variations-to-blocks-and-dialog-values)
- [Known gaps and open items](#known-gaps-and-open-items)
- [Related](#related)
- [Token inventory (read from the CSS)](#token-inventory-read-from-the-css)
- [Media queries in use](#media-queries-in-use)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

This page summarises how the TCS.com Design System (Figma) is implemented in the TCS Corporate Website: the design tokens in `styles/styles.css`, typography and fonts, colours, the shared backgrounds and their theme contract, spacing, layout, breakpoints, icons, images, borders, radii, shadows, motion, focus states, the shared component variations and how a Figma component or variation becomes a block and a dialog value. It states only what the code implements and links to the block READMEs and the handover for detail.

## Summary

- The tokens in `styles/styles.css` are, by the file's own comment, "extracted from the TCS.com Design System (Figma)". Mobile values are declared first; the type tokens step up at 900px, the section gutter at 600px and 1200px, the section spacing at 900px and 1200px.
- Three token layers: a **primitive palette** (`--brand-*`, `--grey-*`, `--slate-*`, `--black-*`, `--white-*`, `--warning-500`), **semantic tokens** (`--color-bg-*`, `--color-text-*`, `--color-icon-*`, `--color-border-*`, type, spacing, size, effects) and a few **legacy aliases** used by boilerplate code (`--link-color`, `--text-color`, ...).
- Blocks use the semantic tokens, so dark backgrounds can re-theme everything inside them by overriding a handful of tokens (the [theme contract](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/design-system.md#theme-contract-of-the-dark-backgrounds)).
- All sizes are in `rem` (1rem = 16px); only media query breakpoints are in px (600 / 900 / 1200). CSS is mobile first with `min-width` (range syntax `width >= …`) queries.
- One typeface: **Inter** (self-hosted variable font, weights 300–700) with three metric-matched fallback faces to prevent layout shift.
- A Figma component maps to a block, and a Figma variation to a dialog value (usually a block class); one block often covers several Figma frames (the Teaser covers six).

## Figma relationship

The design source is the TCS.com Design System in Figma. The code and the block READMEs cite Figma **frame and component names** in comments; this knowledge base lists only those names (no file keys or node ids; the block READMEs and code comments keep the references they need).

| Figma frame / component (as cited) | Implemented by | Cited in |
| --- | --- | --- |
| "L1 Header" variations | [Hero](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/hero/README.md) | `blocks/hero/hero.js`, `hero.css` |
| "Text & Image", "2 Slot Section", "Text Section - 2 Columns", "Secondary Page Header", "Careers", "Media Coverage", "Media Kit", "L3 Header" | [Teaser](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/teaser/README.md) (one block, several layouts) | `blocks/teaser/teaser.js`, `teaser.css` |
| "Secondary Page Header" / "L3 Header" | [Page Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/page-header/README.md) | `blocks/page-header/page-header.css` |
| "Text & Image Overlap" | [Quote](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/quote/README.md) | `blocks/quote/quote.css`, `quote.js` |
| "Testimonial Block" | [Testimonial](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/testimonial/README.md) | `blocks/testimonial/testimonial.css`, `testimonial.js` |
| "List" variations | [List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/list/README.md), [Cards](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/cards/README.md), [Table List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table-list/README.md) | `blocks/list/list.js`, `cards.js`, `table-list.js`; 14 Figma screenshots `list-figma-01` … `list-figma-14` in [`../screenshots/`](https://github.com/sradha-tcs/tcs-corp/tree/archive/docs-before-role-docs-2026-11-08/docs/handover/screenshots) |
| "Chapter Nav" | [Anchor List](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/anchor-list/README.md) | `blocks/anchor-list/anchor-list.css` |
| "New Screens from New DS": Navigation, "Nav Bar-NEW", "Mobile Nav", home desktop / tablet | [Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/header/README.md), [TCS Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tcs-header/README.md) | `blocks/header/header.css`, `blocks/tcs-header/tcs-header.css` |
| "New Screens from New DS": Hero, Intelligent Personalisation Block, Footer, Floating menu, Full menu, "Full menu - No Pill", "L1 Media & Investors", Mobile Ask TCS | [Conversation Canvas](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/conversation-canvas/README.md) ("Variations" table) | `blocks/conversation-canvas/conversation-canvas.css` |
| 402 / 1024 / 1440 frames (per breakpoint) | [Separator](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/separator/README.md) | `blocks/separator/separator.css` |
| "Dark green" (Section Style, Teaser and Columns Container BG Color) | `--color-bg-dark-green: #003b39` | `styles/styles.css` |

How the relationship is used:

- **Tokens** come from the Figma variables; values that Figma uses but the token set doesn't have are local custom properties in the block, labelled as such (for example `--teaser-divider: #b2b2b2` "Figma value with no site token: list dividers"; `--hero-navy: #01121f` "Figma: Color/01121F"; `--list-dark: #20293c` in `styles/card-list.css`).
- **Deliberate deviations for accessibility** are recorded: the secondary-text and brand-text tokens were changed to darker palette colours that pass WCAG 1.4.3 ([Colours](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/design-system.md#colours)); the header's menu arrows use `--color-icon-default` because the Figma light grey fails 3:1 (handover Part 16, F-75).
- **Prototype behaviour** Figma doesn't show (scrolling, docking, the footer stop of the floating Canvas) was supplemented in code; the Conversation Canvas README records this under "Figma gaps and decisions".
- **Per-variation pixel comparison** against Figma is **Blocked**: it needs the Figma file per component ([block ecosystem audit](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), section 9).

## Design tokens

All tokens are custom properties on `:root` in [`styles/styles.css`](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/styles.css). Values below are copied from the file.

#### Primitive palette

| Group | Tokens and values |
| --- | --- |
| Brand | `--brand-200: #cedff4`, `--brand-300: #a7c8f1`, `--brand-400: #216ac3`, `--brand-500: #4673db`, `--brand-600: #011627` |
| Warning | `--warning-500: #e8b931` |
| Grey | `--grey-100: #f5f5f5`, `--grey-200: #e6e6e6`, `--grey-300: #d9d9d9`, `--grey-400: #999`, `--grey-500: #525252`, `--grey-600: #444`, `--grey-700: #383838`, `--grey-800: #2c2c2c`, `--grey-900: #1e1e1e`, `--grey-1000: #111` |
| Slate | `--slate-100: #f3f3f3`, `--slate-200: #e3e3e3`, `--slate-300: #cdcdcd`, `--slate-400: #b2b2b2`, `--slate-500: #949494`, `--slate-600: #767676`, `--slate-700: #5a5a5a`, `--slate-800: #434343`, `--slate-900: #303030`, `--slate-1000: #242424` |
| Black alpha (base `#0c0c0d`) | `--black-100: #0c0c0d0d` … `--black-500: #0c0c0db2` … `--black-900: #0c0c0df2`, `--black-1000: #0c0c0d` |
| White alpha | `--white-100: #ffffff0d` … `--white-400: #fff6`, `--white-500: #ffffffb2`, `--white-600: #fffc` … `--white-1000: #fff` |

#### Semantic colour tokens (representative)

| Group | Representative tokens (value) |
| --- | --- |
| Background | `--color-bg-default` (`--white-1000`), `--color-bg-secondary` (`--grey-100`), `--color-bg-tertiary` (`--grey-300`), `--color-bg-disabled` (`--grey-200`), `--color-bg-brand` (`--brand-400`), `--color-bg-brand-hover` (`--brand-600`), `--color-bg-brand-secondary` (`--brand-300`), `--color-bg-neutral` (`--black-1000`), `--color-bg-neutral-secondary` (`--black-700`), `--color-bg-dark-green` (`#003b39`), `--color-bg-warning` (`--warning-500`), `--color-bg-opacity` (`--white-400`) |
| Text | `--color-text-default` (`--black-1000`), `--color-text-secondary` (`--slate-700`), `--color-text-tertiary` (`--grey-300`), `--color-text-disabled` (`--slate-400`), `--color-text-brand` (`--brand-400`), `--color-text-brand-secondary` (`--brand-600`), `--color-text-on-brand` / `--color-text-on-neutral` (`--white-1000`), `--color-text-neutral` (`--slate-900`), `--color-text-neutral-tertiary` (`--slate-600`), `--color-text-overlay` (`--black-400`), `--color-text-light-overlay` (`--white-600`) |
| Icon | `--color-icon-default` (`--grey-900`), `--color-icon-secondary` (`--grey-400`), `--color-icon-brand` (`--brand-500`), `--color-icon-brand-secondary` (`--brand-200`), `--color-icon-on-brand` (`--white-1000`), `--color-icon-on-disabled` (`--slate-400`), `--color-icon-neutral` (`--slate-900`) |
| Border | `--color-border-default` (`--grey-200`), `--color-border-secondary` (`--grey-400`), `--color-border-tertiary` (`--grey-500`), `--color-border-disabled` (`--slate-200`), `--color-border-brand` (`--brand-500`, also the focus ring), `--color-border-brand-secondary` (`--brand-400`), `--color-border-neutral` (`--slate-900`), `--color-border-neutral-tertiary` (`--slate-400`) |
| Legacy aliases | `--background-color`, `--light-color`, `--dark-color`, `--text-color`, `--link-color` (`--color-text-brand`), `--link-hover-color` (`--brand-600`) |

Each group also has `-hover`, `-secondary` and `-tertiary` variants; read the file for the full list.

#### Other token groups

| Group | Tokens |
| --- | --- |
| Typography | families, weights, display / heading / body / label sizes, button sizes ([Typography](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/design-system.md#typography)) |
| Spacing | `--space-0` … `--space-6000`, `--spacing-xs` … `--spacing-xl` ([Spacing](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/design-system.md#spacing)) |
| Layout | `--page-max-width: 120rem`, `--content-max-width: 90rem`, `--section-padding-inline`, `--section-spacing` ([Layout and grid](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/design-system.md#layout-and-grid)) |
| Size | `--radius-*`, `--border-width-*`, `--icon-size-*` ([Borders, radius and shadows](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/design-system.md#borders-radius-and-shadows)) |
| Effects | `--shadow-100` … `--shadow-600`, `--shadow-inner-100` … `--shadow-inner-600`, `--blur-100: 0.25rem` |
| Header | `--nav-height` (4rem; 7.75rem from 1200px, "Figma: 124px"), `--header-reserved` (the space kept until the header loads) |
| Motion | `--motion-*` in `styles/motion.css` ([Motion](https://github.com/sradha-tcs/tcs-corp/blob/main/docs/handover/knowledge-base/design-system.md#motion)) |

## Typography

| Token | Mobile (default) | From 900px |
| --- | --- | --- |
| `--body-font-family` | `inter, inter-fallback, inter-fallback-roboto, inter-fallback-dejavu, sans-serif` | — |
| `--heading-font-family` | `var(--body-font-family)` | — |
| `--code-font-family` | `'Roboto Mono', ui-monospace, menlo, consolas, monospace` | — |
| `--font-weight-light` / `-regular` / `-medium` / `-semibold` / `-bold` | 300 / 400 / 500 / 600 / 700 | — |
| `--display-font-size-1` / `-2` / `-3` | 2.75rem / 2.5rem / 2.25rem | 5rem / 4rem / 2.5rem |
| `--display-line-height` | 1.2 | — |
| `--heading-font-size-xxl` / `-xl` / `-l` | 2rem / 1.75rem / 1.5rem | 3rem / 2.5rem / 1.75rem |
| `--heading-font-size-m` / `-s` / `-xs` | 1.125rem / 1rem / 0.875rem | 1.5rem / 1.25rem / 1rem |
| `--body-font-size-l` / `-m` / `-s` / `-xs` (Body 1 / 2 / 3) | 1rem / 1rem / 0.75rem / 0.75rem | 1.5rem / 1.125rem / 1rem / 0.875rem |
| `--body-line-height` | 1.6 | — |
| `--label-font-size` / `--label-line-height` | 0.875rem / 1.4 | — |
| `--button-font-size` / `--button-height` / `--icon-button-size` | 1rem / 3.125rem / 2.75rem | — |

Element defaults (`styles/styles.css`): `h1` … `h6` use `--heading-font-size-xxl` … `-xs` in order, regular weight (`h5` light, `h6` semibold), line height 1.4 (`h1` 1.2), margins derived from the font size (`0.8 ×` above, `0.25 ×` below) and a negative letter-spacing derived from the size (`h1` `-0.03 ×`, `h2` `-0.025 ×`, `h3` `-0.02 ×`, `h4` `-0.015 ×`, `h5` `-0.01 ×`). The body is `--body-font-size-m` at regular weight with `letter-spacing: calc(-0.005 * var(--body-font-size-m))`; `strong` / `b` are semibold. AGENTS.md requires letter-spacing to be derived from the rule's font size and re-set wherever a rule resizes a heading, button or tag.

Blocks with an authored heading level render the element of that level and size it accordingly (for example the Teaser's Title Type H1–H6, labelled 64 / 48 / 40 / 28 / 24 / 20px in the dialog; the Hero's Title heading level H1 / H2).

#### Fonts

| Item | Implementation |
| --- | --- |
| Typeface | Inter, self-hosted variable font [`fonts/inter-variable.woff2`](https://github.com/sradha-tcs/tcs-corp/blob/main/fonts/inter-variable.woff2) (48,256 bytes), weights `300 700`, `font-display: swap` ([`styles/fonts.css`](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/fonts.css), "TCS.com Design System primary typeface") |
| Coverage | `unicode-range` limited to Latin (`U+0000-00FF` and selected punctuation / symbols); Chinese, Japanese and Korean text falls back to the system sans-serif (handover F-38, open, owner Design) |
| Loading | `fonts.css` loads in the eager phase only when `window.innerWidth >= 900` or the session flag `fonts-loaded` is set, otherwise at the end of the lazy phase (`loadFonts` in [`scripts/scripts.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js)); see [performance.md](../../01-architecture/markdown/PERFORMANCE-ARCHITECTURE.md#fonts) |
| Fallback faces | `@font-face` rules in `styles/styles.css`, "a system font scaled to Inter's width and line metrics, so text doesn't reflow … when Inter arrives" |

| Fallback face | `src` | `size-adjust` | `ascent-override` | `descent-override` |
| --- | --- | --- | --- | --- |
| `inter-fallback` | `local('Arial')`, `local('ArialMT')`, `local('Liberation Sans')`, `local('LiberationSans')` | 107.06% | 90.49% | 22.56% |
| `inter-fallback-roboto` | `local('Roboto')`, `local('Roboto-Regular')` | 107.21% | 90.36% | 22.53% |
| `inter-fallback-dejavu` | `local('DejaVu Sans')`, `local('DejaVuSans')` | 93.97% | 103.09% | 25.70% |

All three have `line-gap-override: 0%`. A face whose font isn't installed is skipped for the next. AGENTS.md ("Three-Phase Page Loading", module preloading paragraph): keep the faces when changing the font.

## Colours

- Use the **semantic** tokens in blocks, not primitives, so dark backgrounds can re-theme them (AGENTS.md "Backgrounds and theme").
- Two semantic tokens deviate from the original values for contrast, with the measured ratio in a code comment: `--color-text-secondary: var(--slate-700)` "6.9:1 on white (WCAG 1.4.3; `--grey-400`: 2.84:1)"; `--color-text-brand` and `--color-bg-brand: var(--brand-400)` "5.4:1 … (`--brand-500`: 4.43:1)". The audit records that this change "needs design sign-off" ([audit](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), sections 1 and 13).
- Block-local colours without a token exist (for example `--hero-navy`, `--teaser-divider`, `--list-dark`, `--list-gradient`, the Canvas outline `#494c4d`); they are listed in the block READMEs.

## Backgrounds and theme

#### Shared background options

Teaser BG Color, Columns Container BG Color and Section Style share the classes and tokens and set **only the colour** (no padding; a Section's own spacing moves inside its colour).

| Dialog value | Section Style (`models/_section.json`) | Columns Container BG Color (`containerBgColor`) | Teaser BG Color (`bgColor`) | Token |
| --- | --- | --- | --- | --- |
| Default | `''` | `''` | `''` | none (page background) |
| Grey | `bg-grey` | `bg-grey` | `grey` → class `bg-grey` | `--color-bg-secondary` |
| Dark | `bg-dark` | `bg-dark` | `dark` → `bg-dark` | `--color-bg-neutral` |
| Dark green | `bg-dark-green` (label "Dark Green") | `bg-dark-green` | `dark-green` → `bg-dark-green` | `--color-bg-dark-green` |

Other blocks have their own sets: Quote and Testimonial BG Color offer Default / Grey; the Hero's BG Color offers Default, "Light, no overlay" (`bg-light`), "Dark blue" (`bg-dark`), "Dark blue (subtle)" (`bg-dark-subtle`) and Black (`bg-black`), styled in `blocks/hero/hero.css`. The legacy section classes `light` / `highlight`, `dark` and `brand` are still styled in `styles/styles.css` for content authored before.

#### Theme contract of the dark backgrounds

`main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green)` overrides the tokens for everything inside:

| Token | Inside Dark / Dark green | Reset inside a Grey Teaser or Grey Columns Container |
| --- | --- | --- |
| `--color-text-default` | `var(--color-text-on-neutral)` (white) | `var(--black-1000)` |
| `--color-text-secondary` | `rgb(255 255 255 / 70%)` | `var(--slate-700)` |
| `--color-text-brand` | `var(--brand-300)` | `var(--brand-400)` |
| `--color-border-brand` (the focus ring) | `var(--brand-300)` | `var(--brand-500)` |
| `--link-color` / `--link-hover-color` | `var(--brand-300)` / `var(--color-text-on-neutral)` | `var(--brand-400)` / `var(--brand-600)` |

Also: links in running text (`p a:not(.button)`) are underlined on the dark colours; Secondary and Tertiary buttons turn light; Primary buttons are **inverted** (white fill, `--black-1000` text; hover `--grey-300`); `styles/card-list.css` turns List / Cards image cards light. Blocks with their own dark theme (Teaser Dark, cards with a Card colour) keep their own colours. Measured on the combination page "Sections: colours with blocks" ([dialog options report](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/DIALOG-OPTIONS-2026-10-20.md), section 10): axe 43 violations before the contract, 0 after; focus ring brand 300 11.34:1 on Dark and 7.23:1 on Dark Green (brand 500 was 2.81:1 on Dark Green); Grey islands brand 500 4.07:1; inverted Primary 19.6:1. Decision: handover revision 2.34, F-105.

#### Nested themes

| Nesting | Result |
| --- | --- |
| Block inside a Dark / Dark green Section or Columns Container | Light tokens apply (contract above) |
| Grey Teaser or Grey Columns Container inside a dark one | Tokens reset to the light values for its content |
| Teaser with its own BG Color Dark / Dark green | The Teaser's own CSS switches text, eyebrow and stat values to light / brand 300; its Primary buttons aren't adapted ([Teaser README](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/teaser/README.md), "Known Limitations") |
| Hero dark variants | The Hero's own CSS (not the contract) |
| Skeletons | Shapes take `currentcolor` at 10%, so they suit light and dark blocks |

## Spacing

| Token | Value | Token | Value |
| --- | --- | --- | --- |
| `--space-0` | 0 | `--space-1200` | 3rem |
| `--space-100` | 0.25rem | `--space-1600` | 4rem |
| `--space-200` | 0.5rem | `--space-2000` | 5rem |
| `--space-300` | 0.75rem | `--space-2400` | 6rem |
| `--space-400` | 1rem | `--space-3000` | 7.5rem |
| `--space-500` | 1.25rem | `--space-4000` | 10rem |
| `--space-600` | 1.5rem | `--space-5000` | 12.5rem |
| `--space-800` | 2rem | `--space-6000` | 15rem |
| `--space-1000` | 2.5rem | | |

Aliases: `--spacing-xs` (`--space-300`), `--spacing-s` (`--space-600`), `--spacing-m` (`--space-1000`), `--spacing-l` (`--space-2000`), `--spacing-xl` (`--space-5000`).

The Additional tab's Padding / Margin fields (`classes_padding*` / `classes_margin*`) offer Default and `0`, `100` … `3000` as classes `pl-*`, `pr-*`, `pt-*`, `pb-*`, `ml-*`, `mr-*`, `mt-*`, `mb-*`, each mapped to the `--space-*` token of the same number (for example `pt-400` = `var(--space-400)`). The handover recommends leaving them on Default (handover Part 5, 5.6).

## Layout and grid

| Token / rule | Value |
| --- | --- |
| `--page-max-width` | 120rem (the footer caps at it) |
| `--content-max-width` | 90rem (Fixed Width sections) |
| `--section-padding-inline` (gutter of Fixed Width sections) | `--spacing-s` (1.5rem); `--spacing-m` (2.5rem) from 600px; `--spacing-l` (5rem) from 1200px; `0rem` in Full Width sections |
| `--section-spacing` (between sections) | `--spacing-m` (2.5rem); `--spacing-l` (5rem) from 900px; `--space-3000` (7.5rem) from 1200px |
| Section Width Type | Full Width (default, edge to edge, no gutter) or Fixed Width (`fixed-width`, centred at `--content-max-width`) |
| Rounded edge | `rounded`: `--radius-l` corners |

There is no global column grid token. Grids are per block:

- **Columns Container** ([README](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md)): CSS grid of equal columns (`repeat(var(--columns-container-count, 2), minmax(0, 1fr))`), stacked below the "Side by side from" breakpoint (Tablet 600px, Desktop 900px by default, Large desktop 1200px); Gap None (0), Small (`--space-400`), Medium (default `--space-800`), Large (`--space-1600`); Vertical alignment top / middle / bottom / stretch.
- **Card lists** (List, Cards, Filter List, `styles/card-list.css`): columns, gap, visible cards and card width per breakpoint as custom properties (`--list-columns`, `--list-gap`, `--list-visible`, `--list-card-width`), with container query units (`cqi`) for scrollers.

## Breakpoints

| Breakpoint | Query | Used for |
| --- | --- | --- |
| Mobile | default (< 600px) | Base styles |
| Tablet | `@media (width >= 600px)` | Section gutter, side-by-side layouts (16 queries in block and global CSS) |
| Desktop | `@media (width >= 900px)` | Display / heading / body sizes, section spacing (18 queries) |
| Large desktop | `@media (width >= 1200px)` | Section gutter and spacing, desktop header (logo bar, `--nav-height: 7.75rem`) (18 queries) |

`utils/viewport.js` `currentBreakpoint()` reports mobile (< 600px), tablet (600–1199px) and desktop (>= 1200px); the header switches to its desktop logo bar at 1200px (`matchMedia('(min-width: 1200px)')` in `blocks/header/header.js`). A few block rules use ranges (`width < 600px`, `600px <= width < 1200px`).

## Responsive strategy

- **Mobile first**: base rules are the mobile design; `min-width` range queries (`width >= 600px` / `900px` / `1200px`) add tablet and desktop rules (AGENTS.md "CSS").
- **rem everywhere** (at most four decimals); px only in breakpoints. Pixel values from Figma are kept in comments next to the rem value (for example `--nav-height: 7.75rem` "Figma: 124px").
- **Tokens carry most responsive change**: type sizes step up at 900px, section gutter and spacing at 600 / 900 / 1200px, so blocks using the tokens follow without their own queries.
- **Per-breakpoint dialog values** exist where a design differs by device: Teaser Image position (mobile), Columns Container "Side by side from", List / Cards layout per breakpoint (columns, grid or scroll), Separator widths per breakpoint.
- Each block README has a "Responsive Behavior" section with the verified widths.

## Icons

| Item | Implementation |
| --- | --- |
| Files | 22 SVGs in [`icons/`](https://github.com/sradha-tcs/tcs-corp/blob/main/icons/): `arrow-down`, `arrow-left`, `arrow-right`, `arrow-up-right`, `chevron-down`, `chevron-left`, `chevron-right`, `close`, `download`, `facebook`, `filter`, `headphones`, `instagram`, `linkedin`, `menu`, `mic`, `pause`, `play`, `search`, `share`, `x`, `youtube` |
| Authored icons | `span.icon.icon-<name>` becomes an `<img src="/icons/<name>.svg" loading="lazy" width="16" height="16">` (`decorateIcons` in `scripts/aem.js`); `.icon` is sized `--icon-size-s` |
| Button icons | Drawn as a CSS `mask` tinted with `currentcolor`: the trailing arrow of `.button` (`icons/arrow-right.svg`), the chevron of `.link-button`, and icon buttons through `--icon-url` set by `decorators/button-decorator.js` |
| Button Block Icon values | Arrow right, Chevron right, Chevron down, Search ([Button README](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/button-block/README.md)) |
| Sizes | `--icon-size-s: 1.5rem`, `--icon-size-m: 2rem`, `--icon-size-l: 2.5rem`; icon button `--icon-button-size: 2.75rem` with a `--space-500` glyph |

## Images

- Authored images are delivered as optimised `/media_…` resources; `createOptimizedPicture` (`scripts/aem.js`) builds a `<picture>` with WebP and fallback sources, default widths 2000 (`min-width: 600px`) and 750.
- `buildImage` ([`decorators/responsive-image-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/responsive-image-decorator.js)) optimises same-origin `/media_` URLs and uses other URLs as plain lazy `<img>`; section background images use 2000px (>= 600px) and 750px (`BACKGROUND_BREAKPOINTS` in `scripts/scripts.js`), `object-fit: cover`.
- `main img` is `max-width: 100%; height: auto`. Ratios, corners and positions are block options (for example Teaser Image ratio and Image corners; Hero Contained image; card image ratios in `styles/card-list.css`).
- Avatars (`.avatar`, sizes 2.5rem / 2rem / 1.5rem, circle or square) and avatar groups are global classes in `styles/styles.css`.
- Alt text rules are in [accessibility.md](./ACCESSIBILITY-DEVELOPMENT-GUIDE.md#images-alt-text-and-decorative-images); loading rules in [performance.md](../../01-architecture/markdown/PERFORMANCE-ARCHITECTURE.md#images).

## Borders, radius and shadows

| Group | Tokens |
| --- | --- |
| Radius | `--radius-s: 0.25rem`, `--radius-m: 0.5rem`, `--radius-l: 1rem`, `--radius-xl: 1.5rem`, `--radius-full: 624.9375rem` (pills) |
| Border width | `--border-width-100: 0.0625rem`, `--border-width-200: 0.125rem`, `--border-width-300: 0.1875rem`, `--border-width-500: 0.3125rem` |
| Shadow | `--shadow-100: 0 0.0625rem 0.25rem 0 rgb(12 12 13 / 5%)` … `--shadow-600: 0 1rem 2rem -0.5rem rgb(12 12 13 / 40%)`; inner shadows `--shadow-inner-100` … `--shadow-inner-600` |
| Blur | `--blur-100: 0.25rem` |

## Motion

[`styles/motion.css`](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/motion.css) is loaded only on pages with an animated block (`prepareMotion` in [`decorators/motion-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/motion-decorator.js)).

| Token | Value |
| --- | --- |
| `--motion-duration` / `--motion-duration-background` / `--motion-stagger` | Medium (default) 1000ms / 1500ms / 200ms; Fast (`motion-fast`) 500ms / 750ms / 100ms; Slow (`motion-slow`) 2000ms / 3000ms / 400ms |
| `--motion-ease` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--motion-distance` / `--motion-distance-slide` | `var(--space-1000)` / `var(--space-2000)` |
| `--motion-scale` | 0.9 |

Content effects (Animation Type): Fade in / up / down / left / right, Slide up / down / left / right, Scale in. Background effects (Background animation, on Hero, Teaser, Quote, Testimonial, Form Variations, Conversation Canvas): Fade in, Reveal from the centre, Wipe left to right / right to left / bottom to top, Scale reveal. Only `opacity`, `transform` and `clip-path` animate. Animations apply only with `prefers-reduced-motion: no-preference`, on screen, and never in Universal Editor edit mode. Transitions of interactive states (buttons, tags) are 0.2s. Details: [animation report](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/animation/README.md), AGENTS.md "Animation and skeletons".

## Focus states

- Global: `a:focus-visible, button:focus-visible { outline: var(--border-width-200) solid var(--color-border-brand); outline-offset: 0.125rem; }` (brand 500 on light backgrounds, brand 300 inside the dark theme contract).
- Hover and focus share the same visual state for buttons, link buttons and tags (`:hover, :focus-visible`).
- Where the focused element is visually hidden or covered, the ring moves to a visible shape: the Filter List card link draws it on its `::before` overlay; the Conversation Canvas search input shows it on the form (`:focus-within`).
- Editor-only outlines (`hideblock` blocks, Columns Container columns in edit mode) are dashed `--color-border-secondary` and appear only in Universal Editor edit mode.

## Component variations

| Component | Variations | Where |
| --- | --- | --- |
| Button (`.button`) | Views button / icon / link; types Primary (neutral fill, `--color-bg-neutral`), Secondary (outline, brand on hover / focus), Tertiary (text and arrow, no container); disabled state via `aria-disabled` or `:disabled`; pill radius, `--button-height` 3.125rem | `styles/styles.css`, [`decorators/button-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/button-decorator.js), [Button README](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/button-block/README.md) |
| Icon button | Primary (brand fill), Secondary (brand outline), Tertiary (brand icon), disabled | `styles/styles.css` |
| Link button (`.link-button`) | Semibold underlined text with a chevron; light on dark sections | `styles/styles.css` |
| Button alignment | `button-align-left` / `-center` / `-right` | `setButtonAlignment` |
| Tag (`.tag`) | Default (boxed), `tag-filter` (pill, active / `aria-current` brand fill), `tag-card` (small uppercase, secondary text), `tag-industry` (with a leading bar) | `styles/styles.css`, `decorators/tag-decorator.js` |
| Avatar | Large / medium / small, circle / square, image or initial, groups (spaced or overlap, `+N`) | `styles/styles.css` |
| Card (List, Cards, Filter List) | Card style Image card / Panel / Report / Statistic / Mixed; Card colour Default for the style, Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background | [`models/_card-list.json`](https://github.com/sradha-tcs/tcs-corp/blob/main/models/_card-list.json), `styles/card-list.css` |
| Skeleton | Bones line / title / media / pill, pulsing 1.6s (still for reduced motion) | `styles/styles.css`, [`decorators/skeleton-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/skeleton-decorator.js) |

## Mapping Figma components and variations to blocks and dialog values

The rule the code follows: **one Figma component → one block; a Figma variation → a dialog value on that block** (most select values arrive as block classes, for example Teaser Layout Card → `card`). A new block is created only when no existing block can express the design by options; the Teaser is the documented example of covering many frames with options "rather than separate blocks" ([Teaser README](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/teaser/README.md), "For Architects"; handover 6.11).

| Figma (as cited) | Block | Dialog values (field → value) |
| --- | --- | --- |
| "Text & Image" | Teaser | Layout Image & Text; Image position Left / Right / Top / Bottom; Image ratio; Image corners |
| "Careers" | Teaser | Layout Image & Text with no image (or Hide Image): centred text |
| "Text Section - 2 Columns" (with stats) | Teaser | Layout Text split (`no-image`); Stat items (`teaser-stat`) |
| "L3 Header" | Teaser / Page Header | Teaser: Show Date, Reading time, Listen link, Download, Share, Display Tags, author fields; Page Header: Layout by page type |
| "Media Kit" | Teaser | Layout Card (`card`) |
| "L1 Header" variations | Hero | Hero Image type Default / Lotto (`lottie`); Hero View Contained image (`media-contained`); BG Color (`bg-light`, `bg-dark`, `bg-dark-subtle`, `bg-black`); Vertical / Horizontal / Text Alignment |
| "Text & Image Overlap" | Quote | Image Position (Desktop) Right / Left; Image Position (Mobile) Top / Bottom; BG Color Default / Grey |
| "Testimonial Block" | Testimonial | BG Color, show / hide options, Stat items |
| "List" variations 1–14 (screenshots `list-figma-*`) | List / Cards / Table List | Card style, Card colour, layout per breakpoint (grid or horizontal scroll), feature card ([List README](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/list/README.md), "Visual Reference") |
| "Chapter Nav" | Anchor List | Sticky on / off; Anchor Link items |
| Full menu, "Full menu - No Pill", "L1 Media & Investors" | Conversation Canvas | Canvas Style Primary (sticky) (`primary`); Navigation style Pills (`''`) / Text links (`text-links`); BG Style Dark (Primary) (`dark`) |
| Filter tag (pills) / Footer CTA buttons | Conversation Canvas | Quick actions Auto / Pills (`action-pills`) / Buttons (`action-buttons`) |
| Button views and types | Button (`button-block`) | View Button / Icon / Link (`buttonView`); Type Primary / Secondary / Tertiary (`buttonVariant`); Icon; Alignment |
| "Dark green" band | Section / Columns Container / Teaser | Style / BG Color Dark green (`bg-dark-green`) |

Mapping checklist for a new Figma variation (practice from AGENTS.md "Blocks" and "AEM delivery rules"):

1. Find the block whose README "Variations" already covers the frame; prefer a new option value on it over a new block.
2. Express the variation as a `select` value delivered as a class, within the model's three tabs (the last one Additional), and with a field name that doesn't collapse (no `…Type`, `…Title`, `…Text`, `…Alt` suffix for values the code must read).
3. Use the semantic tokens; add a block-local custom property (commented "Figma value with no site token") only when no token fits.
4. Add the variation to the block library, check contrast inside the dark theme contract, update the block README and run `npm run build:json`, `npm run build:docs`, `npm run lint` and `npm test`.

## Known gaps and open items

| Item | Status | Source |
| --- | --- | --- |
| Per-variation Figma comparison | Blocked: needs the Figma file per component | [audit](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/BLOCK-ECOSYSTEM-AUDIT.md) section 9 |
| Secondary-text and brand token change for contrast | Requires validation: design sign-off | audit sections 1 and 13 |
| CJK typography (Inter covers Latin only) | Open (F-38, owner Design) | handover Part 16 |
| Header menu arrow colour and row gutters differ from Figma for accessibility | Open (F-75, design review) | handover Part 16 |
| Teaser Primary buttons on the Teaser's own Dark / Dark green | Open (F-49) | Teaser README "Known Limitations" |
| Separator presentation uses site tokens "until the Figma designs are applied" | Not recorded | [Separator README](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/separator/README.md) |
| Design token governance (who approves token changes, versioning) | Not recorded | — |

## Related

- [accessibility.md](./ACCESSIBILITY-DEVELOPMENT-GUIDE.md): contrast, focus, motion and the theme contract from the accessibility side
- [performance.md](../../01-architecture/markdown/PERFORMANCE-ARCHITECTURE.md): fonts, images and CSS loading
- Other knowledge base pages: [blocks.md](./BLOCK-DEVELOPMENT-GUIDE.md), [authoring.md](../../03-authoring/markdown/AUTHORING-GUIDE.md), [development-standards.md](./CODING-STANDARDS.md), [architecture.md](../../01-architecture/markdown/TECHNICAL-ARCHITECTURE.md), [testing-and-quality.md](../../05-quality-assurance/markdown/TEST-STRATEGY.md)
- [`styles/styles.css`](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/styles.css), [`styles/fonts.css`](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/fonts.css), [`styles/motion.css`](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/motion.css), [`styles/card-list.css`](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/card-list.css)
- [`blocks/README.md`](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md) and each block's README ("Variations", "Responsive Behavior")
- [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#css) ("CSS"; "Backgrounds and theme" and "Animation and skeletons" in [Blocks](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks))
- [Dialog options report](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/DIALOG-OPTIONS-2026-10-20.md), [animation report](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/animation/README.md)
- [Handover](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/handover/TCS-CORP-HANDOVER.md): Part 1 — 1.7.6 Responsiveness, Part 6 — Component Library, Part 16 — Findings

## Token inventory (read from the CSS)

352 custom properties, each with its file, line and selector.

| Token | Value | Source | Selector |
| --- | --- | --- | --- |
| `--brand-200` | `#cedff4` | styles/styles.css:21 | :root |
| `--brand-300` | `#a7c8f1` | styles/styles.css:22 | :root |
| `--brand-400` | `#216ac3` | styles/styles.css:23 | :root |
| `--brand-500` | `#4673db` | styles/styles.css:24 | :root |
| `--brand-600` | `#011627` | styles/styles.css:25 | :root |
| `--warning-500` | `#e8b931` | styles/styles.css:28 | :root |
| `--grey-100` | `#f5f5f5` | styles/styles.css:31 | :root |
| `--grey-200` | `#e6e6e6` | styles/styles.css:32 | :root |
| `--grey-300` | `#d9d9d9` | styles/styles.css:33 | :root |
| `--grey-400` | `#999` | styles/styles.css:34 | :root |
| `--grey-500` | `#525252` | styles/styles.css:35 | :root |
| `--grey-600` | `#444` | styles/styles.css:36 | :root |
| `--grey-700` | `#383838` | styles/styles.css:37 | :root |
| `--grey-800` | `#2c2c2c` | styles/styles.css:38 | :root |
| `--grey-900` | `#1e1e1e` | styles/styles.css:39 | :root |
| `--grey-1000` | `#111` | styles/styles.css:40 | :root |
| `--slate-100` | `#f3f3f3` | styles/styles.css:43 | :root |
| `--slate-200` | `#e3e3e3` | styles/styles.css:44 | :root |
| `--slate-300` | `#cdcdcd` | styles/styles.css:45 | :root |
| `--slate-400` | `#b2b2b2` | styles/styles.css:46 | :root |
| `--slate-500` | `#949494` | styles/styles.css:47 | :root |
| `--slate-600` | `#767676` | styles/styles.css:48 | :root |
| `--slate-700` | `#5a5a5a` | styles/styles.css:49 | :root |
| `--slate-800` | `#434343` | styles/styles.css:50 | :root |
| `--slate-900` | `#303030` | styles/styles.css:51 | :root |
| `--slate-1000` | `#242424` | styles/styles.css:52 | :root |
| `--black-100` | `#0c0c0d0d` | styles/styles.css:55 | :root |
| `--black-200` | `#0c0c0d1a` | styles/styles.css:56 | :root |
| `--black-300` | `#0c0c0d33` | styles/styles.css:57 | :root |
| `--black-400` | `#0c0c0d66` | styles/styles.css:58 | :root |
| `--black-500` | `#0c0c0db2` | styles/styles.css:59 | :root |
| `--black-600` | `#0c0c0dcc` | styles/styles.css:60 | :root |
| `--black-700` | `#0c0c0dd9` | styles/styles.css:61 | :root |
| `--black-800` | `#0c0c0de5` | styles/styles.css:62 | :root |
| `--black-900` | `#0c0c0df2` | styles/styles.css:63 | :root |
| `--black-1000` | `#0c0c0d` | styles/styles.css:64 | :root |
| `--white-100` | `#ffffff0d` | styles/styles.css:65 | :root |
| `--white-200` | `#ffffff1a` | styles/styles.css:66 | :root |
| `--white-300` | `#fff3` | styles/styles.css:67 | :root |
| `--white-400` | `#fff6` | styles/styles.css:68 | :root |
| `--white-500` | `#ffffffb2` | styles/styles.css:69 | :root |
| `--white-600` | `#fffc` | styles/styles.css:70 | :root |
| `--white-700` | `#ffffffd9` | styles/styles.css:71 | :root |
| `--white-800` | `#ffffffe5` | styles/styles.css:72 | :root |
| `--white-900` | `#fffffff2` | styles/styles.css:73 | :root |
| `--white-1000` | `#fff` | styles/styles.css:74 | :root |
| `--color-bg-default` | `var(--white-1000)` | styles/styles.css:79 | :root |
| `--color-bg-default-hover` | `var(--grey-100)` | styles/styles.css:80 | :root |
| `--color-bg-secondary` | `var(--grey-100)` | styles/styles.css:81 | :root |
| `--color-bg-secondary-hover` | `var(--grey-200)` | styles/styles.css:82 | :root |
| `--color-bg-tertiary` | `var(--grey-300)` | styles/styles.css:83 | :root |
| `--color-bg-tertiary-hover` | `var(--grey-400)` | styles/styles.css:84 | :root |
| `--color-bg-opacity` | `var(--white-400)` | styles/styles.css:85 | :root |
| `--color-bg-disabled` | `var(--grey-200)` | styles/styles.css:86 | :root |
| `--color-bg-brand` | `var(--brand-400); /* white text 5.4:1 (WCAG 1.4.3; --brand-500: 4.43:1) */` | styles/styles.css:87 | :root |
| `--color-bg-brand-hover` | `var(--brand-600)` | styles/styles.css:88 | :root |
| `--color-bg-brand-secondary` | `var(--brand-300)` | styles/styles.css:89 | :root |
| `--color-bg-brand-secondary-hover` | `var(--brand-200)` | styles/styles.css:90 | :root |
| `--color-bg-brand-tertiary` | `var(--brand-400)` | styles/styles.css:91 | :root |
| `--color-bg-brand-tertiary-hover` | `var(--brand-600)` | styles/styles.css:92 | :root |
| `--color-bg-neutral` | `var(--black-1000)` | styles/styles.css:93 | :root |
| `--color-bg-neutral-hover` | `var(--black-800)` | styles/styles.css:94 | :root |
| `--color-bg-neutral-secondary` | `var(--black-700)` | styles/styles.css:95 | :root |
| `--color-bg-neutral-secondary-hover` | `var(--black-600)` | styles/styles.css:96 | :root |
| `--color-bg-neutral-tertiary` | `var(--black-500)` | styles/styles.css:97 | :root |
| `--color-bg-neutral-tertiary-hover` | `var(--black-400)` | styles/styles.css:98 | :root |
| `--color-bg-dark-green` | `#003b39; /* Figma "Dark green" (Section Style, Teaser and Columns Container BG Color) */` | styles/styles.css:99 | :root |
| `--color-bg-warning` | `var(--warning-500)` | styles/styles.css:100 | :root |
| `--color-text-default` | `var(--black-1000)` | styles/styles.css:103 | :root |
| `--color-text-secondary` | `var(--slate-700); /* 6.9:1 on white (WCAG 1.4.3; --grey-400: 2.84:1) */` | styles/styles.css:104 | :root |
| `--color-text-tertiary` | `var(--grey-300)` | styles/styles.css:105 | :root |
| `--color-text-disabled` | `var(--slate-400)` | styles/styles.css:106 | :root |
| `--color-text-brand` | `var(--brand-400); /* 5.4:1 on white (WCAG 1.4.3; --brand-500: 4.43:1) */` | styles/styles.css:107 | :root |
| `--color-text-brand-secondary` | `var(--brand-600)` | styles/styles.css:108 | :root |
| `--color-text-on-brand` | `var(--white-1000)` | styles/styles.css:109 | :root |
| `--color-text-neutral` | `var(--slate-900)` | styles/styles.css:110 | :root |
| `--color-text-neutral-secondary` | `var(--slate-700)` | styles/styles.css:111 | :root |
| `--color-text-neutral-tertiary` | `var(--slate-600)` | styles/styles.css:112 | :root |
| `--color-text-on-neutral` | `var(--white-1000)` | styles/styles.css:113 | :root |
| `--color-text-overlay` | `var(--black-400)` | styles/styles.css:114 | :root |
| `--color-text-light-overlay` | `var(--white-600)` | styles/styles.css:115 | :root |
| `--color-icon-default` | `var(--grey-900)` | styles/styles.css:118 | :root |
| `--color-icon-secondary` | `var(--grey-400)` | styles/styles.css:119 | :root |
| `--color-icon-tertiary` | `var(--grey-300)` | styles/styles.css:120 | :root |
| `--color-icon-disabled` | `var(--slate-500)` | styles/styles.css:121 | :root |
| `--color-icon-brand` | `var(--brand-500)` | styles/styles.css:122 | :root |
| `--color-icon-brand-secondary` | `var(--brand-200)` | styles/styles.css:123 | :root |
| `--color-icon-on-brand` | `var(--white-1000)` | styles/styles.css:124 | :root |
| `--color-icon-on-disabled` | `var(--slate-400)` | styles/styles.css:125 | :root |
| `--color-icon-neutral` | `var(--slate-900)` | styles/styles.css:126 | :root |
| `--color-icon-on-neutral` | `var(--slate-100)` | styles/styles.css:127 | :root |
| `--color-border-default` | `var(--grey-200)` | styles/styles.css:130 | :root |
| `--color-border-secondary` | `var(--grey-400)` | styles/styles.css:131 | :root |
| `--color-border-tertiary` | `var(--grey-500)` | styles/styles.css:132 | :root |
| `--color-border-disabled` | `var(--slate-200)` | styles/styles.css:133 | :root |
| `--color-border-brand` | `var(--brand-500)` | styles/styles.css:134 | :root |
| `--color-border-brand-secondary` | `var(--brand-400)` | styles/styles.css:135 | :root |
| `--color-border-brand-tertiary` | `var(--brand-300)` | styles/styles.css:136 | :root |
| `--color-border-neutral` | `var(--slate-900)` | styles/styles.css:137 | :root |
| `--color-border-neutral-secondary` | `var(--slate-600)` | styles/styles.css:138 | :root |
| `--color-border-neutral-tertiary` | `var(--slate-400)` | styles/styles.css:139 | :root |
| `--background-color` | `var(--color-bg-default)` | styles/styles.css:142 | :root |
| `--light-color` | `var(--color-bg-secondary)` | styles/styles.css:143 | :root |
| `--dark-color` | `var(--color-text-neutral)` | styles/styles.css:144 | :root |
| `--text-color` | `var(--color-text-default)` | styles/styles.css:145 | :root |
| `--link-color` | `var(--color-text-brand)` | styles/styles.css:146 | :root |
| `--link-hover-color` | `var(--brand-600)` | styles/styles.css:147 | :root |
| `--body-font-family` | `inter, inter-fallback, inter-fallback-roboto, inter-fallback-dejavu, sans-serif` | styles/styles.css:152 | :root |
| `--heading-font-family` | `var(--body-font-family)` | styles/styles.css:153 | :root |
| `--code-font-family` | `'Roboto Mono', ui-monospace, menlo, consolas, monospace` | styles/styles.css:154 | :root |
| `--font-weight-light` | `300` | styles/styles.css:157 | :root |
| `--font-weight-regular` | `400` | styles/styles.css:158 | :root |
| `--font-weight-medium` | `500` | styles/styles.css:159 | :root |
| `--font-weight-semibold` | `600` | styles/styles.css:160 | :root |
| `--font-weight-bold` | `700` | styles/styles.css:161 | :root |
| `--display-font-size-1` | `2.75rem` | styles/styles.css:164 | :root |
| `--display-font-size-2` | `2.5rem` | styles/styles.css:165 | :root |
| `--display-font-size-3` | `2.25rem` | styles/styles.css:166 | :root |
| `--display-line-height` | `1.2` | styles/styles.css:167 | :root |
| `--heading-font-size-xxl` | `2rem` | styles/styles.css:170 | :root |
| `--heading-font-size-xl` | `1.75rem` | styles/styles.css:171 | :root |
| `--heading-font-size-l` | `1.5rem` | styles/styles.css:172 | :root |
| `--heading-font-size-m` | `1.125rem` | styles/styles.css:173 | :root |
| `--heading-font-size-s` | `1rem` | styles/styles.css:174 | :root |
| `--heading-font-size-xs` | `0.875rem` | styles/styles.css:175 | :root |
| `--body-font-size-l` | `1rem` | styles/styles.css:178 | :root |
| `--body-font-size-m` | `1rem` | styles/styles.css:179 | :root |
| `--body-font-size-s` | `0.75rem` | styles/styles.css:180 | :root |
| `--body-font-size-xs` | `0.75rem` | styles/styles.css:181 | :root |
| `--body-line-height` | `1.6` | styles/styles.css:182 | :root |
| `--label-font-size` | `0.875rem` | styles/styles.css:185 | :root |
| `--label-line-height` | `1.4` | styles/styles.css:186 | :root |
| `--button-font-size` | `1rem` | styles/styles.css:189 | :root |
| `--button-height` | `3.125rem` | styles/styles.css:190 | :root |
| `--icon-button-size` | `2.75rem` | styles/styles.css:191 | :root |
| `--space-0` | `0` | styles/styles.css:194 | :root |
| `--space-100` | `0.25rem` | styles/styles.css:195 | :root |
| `--space-200` | `0.5rem` | styles/styles.css:196 | :root |
| `--space-300` | `0.75rem` | styles/styles.css:197 | :root |
| `--space-400` | `1rem` | styles/styles.css:198 | :root |
| `--space-500` | `1.25rem` | styles/styles.css:199 | :root |
| `--space-600` | `1.5rem` | styles/styles.css:200 | :root |
| `--space-800` | `2rem` | styles/styles.css:201 | :root |
| `--space-1000` | `2.5rem` | styles/styles.css:202 | :root |
| `--space-1200` | `3rem` | styles/styles.css:203 | :root |
| `--space-1600` | `4rem` | styles/styles.css:204 | :root |
| `--space-2000` | `5rem` | styles/styles.css:205 | :root |
| `--space-2400` | `6rem` | styles/styles.css:206 | :root |
| `--space-3000` | `7.5rem` | styles/styles.css:207 | :root |
| `--space-4000` | `10rem` | styles/styles.css:208 | :root |
| `--space-5000` | `12.5rem` | styles/styles.css:209 | :root |
| `--space-6000` | `15rem` | styles/styles.css:210 | :root |
| `--spacing-xs` | `var(--space-300)` | styles/styles.css:211 | :root |
| `--spacing-s` | `var(--space-600)` | styles/styles.css:212 | :root |
| `--spacing-m` | `var(--space-1000)` | styles/styles.css:213 | :root |
| `--spacing-l` | `var(--space-2000)` | styles/styles.css:214 | :root |
| `--spacing-xl` | `var(--space-5000)` | styles/styles.css:215 | :root |
| `--page-max-width` | `120rem` | styles/styles.css:219 | :root |
| `--content-max-width` | `90rem` | styles/styles.css:220 | :root |
| `--section-padding-inline` | `var(--spacing-s)` | styles/styles.css:221 | :root |
| `--section-spacing` | `var(--spacing-m)` | styles/styles.css:222 | :root |
| `--radius-s` | `0.25rem` | styles/styles.css:227 | :root |
| `--radius-m` | `0.5rem` | styles/styles.css:228 | :root |
| `--radius-l` | `1rem` | styles/styles.css:229 | :root |
| `--radius-xl` | `1.5rem` | styles/styles.css:230 | :root |
| `--radius-full` | `624.9375rem` | styles/styles.css:231 | :root |
| `--border-width-100` | `0.0625rem` | styles/styles.css:234 | :root |
| `--border-width-200` | `0.125rem` | styles/styles.css:235 | :root |
| `--border-width-300` | `0.1875rem` | styles/styles.css:236 | :root |
| `--border-width-500` | `0.3125rem` | styles/styles.css:237 | :root |
| `--icon-size-s` | `1.5rem` | styles/styles.css:240 | :root |
| `--icon-size-m` | `2rem` | styles/styles.css:241 | :root |
| `--icon-size-l` | `2.5rem` | styles/styles.css:242 | :root |
| `--shadow-100` | `0 0.0625rem 0.25rem 0 rgb(12 12 13 / 5%)` | styles/styles.css:245 | :root |
| `--shadow-200` | `0 0.25rem 0.5rem -0.0625rem rgb(12 12 13 / 5%), 0 0.0625rem 0.25rem 0 rgb(12 12 13 / 5%)` | styles/styles.css:246 | :root |
| `--shadow-300` | `0 0.25rem 1rem -0.25rem rgb(12 12 13 / 5%), 0 0 1rem -0.25rem rgb(12 12 13 / 20%)` | styles/styles.css:247 | :root |
| `--shadow-400` | `0 0.25rem 0.25rem -0.25rem rgb(12 12 13 / 5%), 0 1rem 2rem -0.25rem rgb(12 12 13 / 10%)` | styles/styles.css:248 | :root |
| `--shadow-500` | `0 1rem 2rem -0.25rem rgb(12 12 13 / 5%), 0 0 1rem -0.0625rem rgb(12 12 13 / 40%)` | styles/styles.css:249 | :root |
| `--shadow-600` | `0 1rem 2rem -0.5rem rgb(12 12 13 / 40%)` | styles/styles.css:250 | :root |
| `--shadow-inner-100` | `inset 0 0.0625rem 0.25rem rgb(12 12 13 / 5%)` | styles/styles.css:251 | :root |
| `--shadow-inner-200` | `inset 0 0.0625rem 0.25rem rgb(12 12 13 / 5%)` | styles/styles.css:252 | :root |
| `--shadow-inner-300` | `inset 0 0.25rem 0.25rem rgb(12 12 13 / 5%)` | styles/styles.css:253 | :root |
| `--shadow-inner-400` | `inset 0 1rem 2rem rgb(12 12 13 / 10%)` | styles/styles.css:254 | :root |
| `--shadow-inner-500` | `inset 0 1rem 1rem rgb(12 12 13 / 10%)` | styles/styles.css:255 | :root |
| `--shadow-inner-600` | `inset 0 1rem 2rem rgb(12 12 13 / 40%)` | styles/styles.css:256 | :root |
| `--blur-100` | `0.25rem` | styles/styles.css:257 | :root |
| `--nav-height` | `4rem` | styles/styles.css:260 | :root |
| `--header-reserved` | `var(--nav-height)` | styles/styles.css:266 | :root |
| `--section-padding-inline` | `var(--spacing-m)` | styles/styles.css:305 | :root (@media (width >= 600px)) |
| `--display-font-size-1` | `5rem` | styles/styles.css:312 | :root (@media (width >= 900px)) |
| `--display-font-size-2` | `4rem` | styles/styles.css:313 | :root (@media (width >= 900px)) |
| `--display-font-size-3` | `2.5rem` | styles/styles.css:314 | :root (@media (width >= 900px)) |
| `--heading-font-size-xxl` | `3rem` | styles/styles.css:317 | :root (@media (width >= 900px)) |
| `--heading-font-size-xl` | `2.5rem` | styles/styles.css:318 | :root (@media (width >= 900px)) |
| `--heading-font-size-l` | `1.75rem` | styles/styles.css:319 | :root (@media (width >= 900px)) |
| `--heading-font-size-m` | `1.5rem` | styles/styles.css:320 | :root (@media (width >= 900px)) |
| `--heading-font-size-s` | `1.25rem` | styles/styles.css:321 | :root (@media (width >= 900px)) |
| `--heading-font-size-xs` | `1rem` | styles/styles.css:322 | :root (@media (width >= 900px)) |
| `--body-font-size-l` | `1.5rem` | styles/styles.css:325 | :root (@media (width >= 900px)) |
| `--body-font-size-m` | `1.125rem` | styles/styles.css:326 | :root (@media (width >= 900px)) |
| `--body-font-size-s` | `1rem` | styles/styles.css:327 | :root (@media (width >= 900px)) |
| `--body-font-size-xs` | `0.875rem` | styles/styles.css:328 | :root (@media (width >= 900px)) |
| `--section-spacing` | `var(--spacing-l)` | styles/styles.css:331 | :root (@media (width >= 900px)) |
| `--section-padding-inline` | `var(--spacing-l)` | styles/styles.css:337 | :root (@media (width >= 1200px)) |
| `--section-spacing` | `var(--space-3000)` | styles/styles.css:338 | :root (@media (width >= 1200px)) |
| `--nav-height` | `7.75rem` | styles/styles.css:341 | :root (@media (width >= 1200px)) |
| `--header-overlay-space` | `var(--header-height, var(--header-reserved))` | styles/styles.css:387 | html[data-header-overlay='always'] body |
| `--header-overlay-space` | `var(--header-height, var(--header-reserved))` | styles/styles.css:391 | html:not([data-header-overlay='never']) body:has(main > .section:first-child .hero:not(.bg-dark, .bg-dark-subtle, .bg-black, .bg-charcoal-80, .bg-navy-60, .bg-charcoal-40)) |
| `--tag-color` | `var(--color-text-neutral)` | styles/styles.css:831 | .tag |
| `--tag-bg` | `var(--color-bg-default)` | styles/styles.css:832 | .tag |
| `--tag-border` | `var(--color-border-default)` | styles/styles.css:833 | .tag |
| `--tag-hover-color` | `var(--color-text-on-brand)` | styles/styles.css:834 | .tag |
| `--tag-hover-bg` | `var(--color-bg-brand)` | styles/styles.css:835 | .tag |
| `--tag-hover-border` | `var(--color-border-brand)` | styles/styles.css:836 | .tag |
| `--tag-color` | `var(--color-text-default)` | styles/styles.css:868 | .tag-filter |
| `--tag-color` | `var(--color-text-on-brand)` | styles/styles.css:879 | .tag-filter[aria-current] |
| `--tag-bg` | `var(--color-bg-brand)` | styles/styles.css:880 | .tag-filter[aria-current] |
| `--tag-border` | `var(--color-border-brand)` | styles/styles.css:881 | .tag-filter[aria-current] |
| `--tag-bg` | `transparent` | styles/styles.css:886 | .tag-industry |
| `--tag-border` | `transparent` | styles/styles.css:887 | .tag-industry |
| `--tag-hover-color` | `var(--color-text-brand)` | styles/styles.css:888 | .tag-industry |
| `--tag-hover-bg` | `transparent` | styles/styles.css:889 | .tag-industry |
| `--tag-hover-border` | `transparent` | styles/styles.css:890 | .tag-industry |
| `--tag-color` | `var(--color-text-secondary)` | styles/styles.css:899 | .tag-card |
| `--tag-color` | `var(--color-text-default)` | styles/styles.css:907 | .tag-industry |
| `--avatar-size` | `2.5rem` | styles/styles.css:919 | .avatar |
| `--avatar-size` | `2rem` | styles/styles.css:957 | .avatar.medium |
| `--avatar-size` | `1.5rem` | styles/styles.css:965 | .avatar.small |
| `--section-max-width` | `none` | styles/styles.css:1024 | main > .section |
| `--section-padding-inline` | `0rem` | styles/styles.css:1031 | main > .section:not(.fixed-width) |
| `--section-max-width` | `var(--content-max-width)` | styles/styles.css:1035 | main > .section.fixed-width |
| `--color-text-default` | `var(--color-text-on-neutral)` | styles/styles.css:1108 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) |
| `--color-text-secondary` | `rgb(255 255 255 / 70%)` | styles/styles.css:1109 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) |
| `--color-text-brand` | `var(--brand-300)` | styles/styles.css:1110 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) |
| `--color-border-brand` | `var(--brand-300); /* the focus ring */` | styles/styles.css:1111 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) |
| `--link-color` | `var(--brand-300)` | styles/styles.css:1112 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) |
| `--link-hover-color` | `var(--color-text-on-neutral)` | styles/styles.css:1113 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) |
| `--color-text-default` | `var(--black-1000)` | styles/styles.css:1119 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) :is(.teaser, .block.columns-container).bg-grey |
| `--color-text-secondary` | `var(--slate-700)` | styles/styles.css:1120 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) :is(.teaser, .block.columns-container).bg-grey |
| `--color-text-brand` | `var(--brand-400)` | styles/styles.css:1121 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) :is(.teaser, .block.columns-container).bg-grey |
| `--color-border-brand` | `var(--brand-500)` | styles/styles.css:1122 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) :is(.teaser, .block.columns-container).bg-grey |
| `--link-color` | `var(--brand-400)` | styles/styles.css:1123 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) :is(.teaser, .block.columns-container).bg-grey |
| `--link-hover-color` | `var(--brand-600)` | styles/styles.css:1124 | main :is(.section, .block.columns-container):is(.bg-dark, .bg-dark-green) :is(.teaser, .block.columns-container).bg-grey |
| `--motion-duration` | `600ms` | styles/motion.css:12 | :root |
| `--motion-duration-background` | `900ms` | styles/motion.css:13 | :root |
| `--motion-stagger` | `120ms` | styles/motion.css:14 | :root |
| `--motion-ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | styles/motion.css:17 | :root |
| `--motion-distance` | `var(--space-1000)` | styles/motion.css:18 | :root |
| `--motion-distance-slide` | `var(--space-2000)` | styles/motion.css:19 | :root |
| `--motion-scale` | `0.9` | styles/motion.css:20 | :root |
| `--motion-duration` | `1000ms` | styles/motion.css:29 | .block |
| `--motion-duration-background` | `1500ms` | styles/motion.css:30 | .block |
| `--motion-stagger` | `200ms` | styles/motion.css:31 | .block |
| `--motion-duration` | `500ms` | styles/motion.css:35 | .block.motion-fast |
| `--motion-duration-background` | `750ms` | styles/motion.css:36 | .block.motion-fast |
| `--motion-stagger` | `100ms` | styles/motion.css:37 | .block.motion-fast |
| `--motion-duration` | `2000ms` | styles/motion.css:41 | .block.motion-slow |
| `--motion-duration-background` | `3000ms` | styles/motion.css:42 | .block.motion-slow |
| `--motion-stagger` | `400ms` | styles/motion.css:43 | .block.motion-slow |
| `--motion-index` | `0` | styles/motion.css:68 | .motion-target |
| `--list-dark` | `#20293c` | styles/card-list.css:14 | .card-list |
| `--list-gradient` | `linear-gradient(135deg, #cfd9e3 0%, #e2e1dd 100%)` | styles/card-list.css:15 | .card-list |
| `--list-track` | `var(--grey-200)` | styles/card-list.css:16 | .card-list |
| `--list-thumb` | `var(--slate-600)` | styles/card-list.css:17 | .card-list |
| `--list-bleed` | `0rem` | styles/card-list.css:18 | .card-list |
| `--list-columns` | `var(--list-columns-mobile, 1)` | styles/card-list.css:21 | .card-list |
| `--list-gap` | `var(--list-gap-mobile, 1rem)` | styles/card-list.css:22 | .card-list |
| `--list-visible` | `var(--list-visible-mobile, 1.2)` | styles/card-list.css:23 | .card-list |
| `--list-card-width` | `var(--list-card-width-mobile)` | styles/card-list.css:24 | .card-list |
| `--list-item-size` | `var(--list-card-width, calc((100cqi - var(--list-bleed) - (var(--list-visible) - 1) * var(--list-gap)) / var(--list-visible)))` | styles/card-list.css:25 | .card-list |
| `--list-card-title-size` | `1.125rem` | styles/card-list.css:28 | .card-list |
| `--list-card-title-line` | `1.39` | styles/card-list.css:29 | .card-list |
| `--list-panel-title-size` | `1.75rem` | styles/card-list.css:30 | .card-list |
| `--list-panel-text-size` | `0.75rem` | styles/card-list.css:31 | .card-list |
| `--list-stat-number-size` | `5rem` | styles/card-list.css:32 | .card-list |
| `--list-stat-text-size` | `1rem` | styles/card-list.css:33 | .card-list |
| `--list-kicker-size` | `0.75rem` | styles/card-list.css:34 | .card-list |
| `--list-meta-size` | `0.75rem` | styles/card-list.css:35 | .card-list |
| `--list-row-title-size` | `1.75rem` | styles/card-list.css:36 | .card-list |
| `--list-feature-title-size` | `2rem` | styles/card-list.css:37 | .card-list |
| `--list-card-padding` | `var(--space-400)` | styles/card-list.css:38 | .card-list |
| `--list-hover-duration` | `300ms` | styles/card-list.css:41 | .card-list |
| `--list-hover-easing` | `ease-out` | styles/card-list.css:42 | .card-list |
| `--list-bleed` | `var(--section-padding-inline)` | styles/card-list.css:206 | .card-list.edge-bleed.mobile-scroll |
| `--list-card-bg` | `var(--list-dark)` | styles/card-list.css:416 | .card-list :is(.list-card-panel, .list-card-report, .list-card-stat) |
| `--list-card-fg` | `var(--slate-100)` | styles/card-list.css:417 | .card-list :is(.list-card-panel, .list-card-report, .list-card-stat) |
| `--list-card-muted` | `var(--white-500)` | styles/card-list.css:418 | .card-list :is(.list-card-panel, .list-card-report, .list-card-stat) |
| `--list-card-bg` | `var(--list-gradient)` | styles/card-list.css:455 | .card-list .list-card-report |
| `--list-card-fg` | `var(--color-text-neutral)` | styles/card-list.css:456 | .card-list .list-card-report |
| `--list-card-muted` | `var(--black-500)` | styles/card-list.css:457 | .card-list .list-card-report |
| `--list-card-bg` | `var(--color-bg-tertiary)` | styles/card-list.css:461 | .card-list .list-card-stat |
| `--list-card-fg` | `var(--black-1000)` | styles/card-list.css:462 | .card-list .list-card-stat |
| `--list-card-muted` | `var(--black-500)` | styles/card-list.css:463 | .card-list .list-card-stat |
| `--list-stat-size` | `min(var(--list-stat-number-size), 26cqi)` | styles/card-list.css:490 | .card-list .list-card-stat .list-card-title |
| `--list-stat-size` | `calc(var(--list-stat-number-size) * 0.42)` | styles/card-list.css:499 | .card-list.stat-compact .list-card-stat .list-card-title |
| `--list-card-bg` | `var(--list-dark)` | styles/card-list.css:589 | .card-list .list-card.theme-dark |
| `--list-card-fg` | `var(--slate-100)` | styles/card-list.css:590 | .card-list .list-card.theme-dark |
| `--list-card-muted` | `var(--white-500)` | styles/card-list.css:591 | .card-list .list-card.theme-dark |
| `--list-card-strong` | `var(--slate-100)` | styles/card-list.css:592 | .card-list .list-card.theme-dark |
| `--list-card-bg` | `var(--brand-600)` | styles/card-list.css:596 | .card-list .list-card.theme-navy |
| `--list-card-fg` | `var(--slate-100)` | styles/card-list.css:597 | .card-list .list-card.theme-navy |
| `--list-card-muted` | `var(--white-500)` | styles/card-list.css:598 | .card-list .list-card.theme-navy |
| `--list-card-strong` | `var(--slate-100)` | styles/card-list.css:599 | .card-list .list-card.theme-navy |
| `--list-card-bg` | `var(--color-bg-brand)` | styles/card-list.css:603 | .card-list .list-card.theme-brand |
| `--list-card-fg` | `var(--white-1000)` | styles/card-list.css:604 | .card-list .list-card.theme-brand |
| `--list-card-muted` | `var(--white-900); /* 80% white gave 4.0:1 on the brand fill */` | styles/card-list.css:605 | .card-list .list-card.theme-brand |
| `--list-card-strong` | `var(--slate-100)` | styles/card-list.css:606 | .card-list .list-card.theme-brand |
| `--list-card-bg` | `var(--brand-300)` | styles/card-list.css:615 | .card-list .list-card.theme-brand-light |
| `--list-card-fg` | `var(--black-1000)` | styles/card-list.css:616 | .card-list .list-card.theme-brand-light |
| `--list-card-muted` | `var(--black-500)` | styles/card-list.css:617 | .card-list .list-card.theme-brand-light |
| `--list-card-bg` | `var(--color-bg-tertiary)` | styles/card-list.css:621 | .card-list .list-card.theme-grey |
| `--list-card-fg` | `var(--black-1000)` | styles/card-list.css:622 | .card-list .list-card.theme-grey |
| `--list-card-muted` | `var(--black-500)` | styles/card-list.css:623 | .card-list .list-card.theme-grey |
| `--list-card-bg` | `var(--grey-400)` | styles/card-list.css:627 | .card-list .list-card.theme-mid-grey |
| `--list-card-fg` | `var(--black-1000)` | styles/card-list.css:628 | .card-list .list-card.theme-mid-grey |
| `--list-card-muted` | `var(--black-600)` | styles/card-list.css:629 | .card-list .list-card.theme-mid-grey |
| `--list-card-bg` | `var(--list-gradient)` | styles/card-list.css:633 | .card-list .list-card.theme-gradient |
| `--list-card-fg` | `var(--color-text-neutral)` | styles/card-list.css:634 | .card-list .list-card.theme-gradient |
| `--list-card-muted` | `var(--black-500)` | styles/card-list.css:635 | .card-list .list-card.theme-gradient |
| `--list-card-bg` | `var(--color-bg-secondary)` | styles/card-list.css:643 | .card-list .list-card.theme-image |
| `--list-card-fg` | `var(--color-text-neutral)` | styles/card-list.css:644 | .card-list .list-card.theme-image |
| `--list-card-muted` | `var(--color-text-secondary)` | styles/card-list.css:645 | .card-list .list-card.theme-image |
| `--list-columns` | `var(--list-columns-tablet, 4)` | styles/card-list.css:800 | .card-list (@media (width >= 600px)) |
| `--list-gap` | `var(--list-gap-tablet, 1.5rem)` | styles/card-list.css:801 | .card-list (@media (width >= 600px)) |
| `--list-visible` | `var(--list-visible-tablet, 3.3)` | styles/card-list.css:802 | .card-list (@media (width >= 600px)) |
| `--list-card-width` | `var(--list-card-width-tablet)` | styles/card-list.css:803 | .card-list (@media (width >= 600px)) |
| `--list-card-title-size` | `1.25rem` | styles/card-list.css:804 | .card-list (@media (width >= 600px)) |
| `--list-card-title-line` | `1.4` | styles/card-list.css:805 | .card-list (@media (width >= 600px)) |
| `--list-panel-title-size` | `1.5rem` | styles/card-list.css:806 | .card-list (@media (width >= 600px)) |
| `--list-panel-text-size` | `0.875rem` | styles/card-list.css:807 | .card-list (@media (width >= 600px)) |
| `--list-stat-number-size` | `4rem` | styles/card-list.css:808 | .card-list (@media (width >= 600px)) |
| `--list-kicker-size` | `0.875rem` | styles/card-list.css:809 | .card-list (@media (width >= 600px)) |
| `--list-meta-size` | `0.875rem` | styles/card-list.css:810 | .card-list (@media (width >= 600px)) |
| `--list-row-title-size` | `2rem` | styles/card-list.css:811 | .card-list (@media (width >= 600px)) |
| `--list-feature-title-size` | `2.5rem` | styles/card-list.css:812 | .card-list (@media (width >= 600px)) |
| `--list-bleed` | `var(--section-padding-inline)` | styles/card-list.css:869 | .card-list.edge-bleed.tablet-scroll (@media (width >= 600px)) |
| `--list-bleed` | `0rem` | styles/card-list.css:881 | .card-list.edge-bleed.tablet-grid (@media (width >= 600px)) |
| `--list-card-padding` | `var(--space-600)` | styles/card-list.css:913 | .card-list (@media (width >= 900px)) |
| `--list-columns` | `var(--list-columns-desktop, 4)` | styles/card-list.css:920 | .card-list (@media (width >= 1200px)) |
| `--list-gap` | `var(--list-gap-desktop, 1.5rem)` | styles/card-list.css:921 | .card-list (@media (width >= 1200px)) |
| `--list-visible` | `var(--list-visible-desktop, 4.2)` | styles/card-list.css:922 | .card-list (@media (width >= 1200px)) |
| `--list-card-width` | `var(--list-card-width-desktop)` | styles/card-list.css:923 | .card-list (@media (width >= 1200px)) |
| `--list-card-title-size` | `1.5rem` | styles/card-list.css:924 | .card-list (@media (width >= 1200px)) |
| `--list-card-title-line` | `1.42` | styles/card-list.css:925 | .card-list (@media (width >= 1200px)) |
| `--list-panel-title-size` | `1.75rem` | styles/card-list.css:926 | .card-list (@media (width >= 1200px)) |
| `--list-panel-text-size` | `1rem` | styles/card-list.css:927 | .card-list (@media (width >= 1200px)) |
| `--list-stat-number-size` | `6rem` | styles/card-list.css:928 | .card-list (@media (width >= 1200px)) |
| `--list-stat-text-size` | `1.125rem` | styles/card-list.css:929 | .card-list (@media (width >= 1200px)) |
| `--list-meta-size` | `1rem` | styles/card-list.css:930 | .card-list (@media (width >= 1200px)) |
| `--list-row-title-size` | `2.5rem` | styles/card-list.css:931 | .card-list (@media (width >= 1200px)) |
| `--list-bleed` | `var(--section-padding-inline)` | styles/card-list.css:973 | .card-list.edge-bleed.desktop-scroll (@media (width >= 1200px)) |
| `--list-bleed` | `0rem` | styles/card-list.css:985 | .card-list.edge-bleed.desktop-grid (@media (width >= 1200px)) |

## Media queries in use

| Media query | Occurrences |
| --- | --- |
| `(width >= 900px)` | 16 |
| `(width >= 1200px)` | 14 |
| `(prefers-reduced-motion: reduce)` | 12 |
| `(width >= 600px)` | 12 |
| `(width < 600px)` | 7 |
| `(width >= 600px) and (width < 1200px)` | 4 |
| `(600px <= width < 1200px)` | 3 |
| `(forced-colors: active)` | 2 |
| `(width >=1200px)` | 2 |
| `screen and (prefers-reduced-motion: no-preference)` | 1 |
| `(prefers-reduced-motion: no-preference)` | 1 |
| `(width >= 600px) and (width < 900px)` | 1 |
| `only screen and (width <= 1199px)` | 1 |
| `(width >=600px) and (width < 1200px)` | 1 |
| `(width >=768px) and (width < 1024px)` | 1 |
| `(width >=1024px) and (width < 1200px)` | 1 |
| `print` | 1 |
| `(width >=600px)` | 1 |
| `(width >=900px)` | 1 |
| `(width < 900px)` | 1 |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
