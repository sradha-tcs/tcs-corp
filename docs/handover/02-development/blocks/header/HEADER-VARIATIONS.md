---
id: "DEV-V-header"
title: "Header Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: ["header"]
relatedPages: ["/design-block-master/en/block-library/header","/design-block-master/en/block-library/header/header-careers","/design-block-master/en/block-library/header/header-default","/design-block-master/en/block-library/header/nav-careers","/design-block-master/en/block-library/header/nav-default"]
confidence: "Medium"
primary: false
---

# Header Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-header |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Header block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
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

No variation field.

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Header blocks on the published block library pages (5 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

#### Desktop logo bar (>= 1200px)

- **Purpose:** the Figma desktop header: TCS logo left, TATA logo right, no navigation.
- **When to use / not:** always on desktop; the menu isn't shown at this width (F-72), so pages need a Conversation Canvas for navigation.
- **Fields:** the logos (TCS Header block, or the brand / tools sections).
- **Rendering:** `nav` is a flex row (`justify-content: space-between`), 7.75rem high (`--nav-height`), 5rem gutters, max width `--content-max-width`; the menu button and the menu are `display: none`; the wrapper is `position: relative` (not fixed).
- **Accessibility:** two logo links named by their alt texts inside `nav[aria-label="Main navigation"]`.
- **Data layer:** logo clicks `cmp:click` (`interaction` "link").
- **Personalization / fallback:** none; without logos the bar is empty.

```text
[Screenshot Placeholder]

File name:
header-logo-bar-desktop.png

Purpose:
The desktop logo bar (see Visual Reference).

Annotations:
A = TCS logo
B = TATA logo
```

#### Tablet and mobile menu (< 1200px)

- **Purpose:** the site navigation below 1200px: a full-screen menu, one level at a time.
- **Fields:** the menu list on the nav page.
- **Rendering:** a fixed bar (`header .nav-wrapper`, `position: fixed`) with a grid of brand, tools and menu button; opening the menu sets `nav[data-expanded="true"]` (`min-height: 100dvh`, scrolling inside), locks page scrolling (`body` `overflow-y: hidden`), makes `main` and `footer` inert and dispatches `header:menu` (`detail.open`). Gutters 1rem (mobile), 1.5rem (from 600px).
- **Accessibility:** menu button with `aria-controls="nav-sections"`, `aria-expanded`, name Open / Close navigation; Back and level title; Escape closes.
- **Data layer:** menu, section, Back and link clicks are `cmp:click` on the header component.
- **Personalization / fallback:** without a menu section no menu button is built (a nav page with only logos or a Canvas).

```text
[Screenshot Placeholder]

File name:
header-menu-level-1-mobile.png

Purpose:
The open menu at its first level (see Visual Reference).

Annotations:
A = Close navigation
B = Menu title
C = Section row
```

#### Section label: plain text or link

- **Purpose:** a section either only opens its level (plain label) or is also a page (linked label).
- **Rendering:** plain: the label is replaced by `button.nav-drop-toggle` with the label as its text. Linked (the label is a link or holds one): the link stays and an arrow-only `button.nav-drop-toggle[aria-label]` ("Show {label} menu") follows it, 2.5rem square.
- **When to use:** a link when the section has its own landing page.

```text
[Screenshot Placeholder]

File name:
header-linked-section-tablet.png

Purpose:
A linked section label with its separate arrow button (see Visual Reference).

Annotations:
A = Section link
B = Arrow button
```

#### Logos from a TCS Header block, or positional sections

- **Purpose:** the TCS Header block gives authors logo, alt and link fields; the positional nav page (brand, sections, tools) is the contract authored before.
- **Rendering:** with a TCS Header block (`applyLogoBar`), its section is replaced by `nav-brand` (`a.tcs-header-brand`) and `nav-tools` (`a.tcs-header-group`), the first other section becomes `nav-sections`, tools are placed after it. Without, sections 1–3 get `nav-brand`, `nav-sections`, `nav-tools`.
- **Fallback:** a nav page without a TCS Header block keeps working.

```text
[Screenshot Placeholder]

File name:
header-nav-page-authoring-desktop.png

Purpose:
The nav page with the TCS Header block section and the menu section (see Visual Reference).

Annotations:
A = TCS Header block
B = Menu list
```

#### Header Canvas

- **Purpose:** the Conversation Canvas of the header (Figma home-desktop 229:15426, home-tablet 671:52732, mobile Ask TCS 1124:27368) at the bottom of the first screen.
- **Rendering:** nav page sections with a `.conversation-canvas` are moved into `header .nav-canvas`, out of the flow (`position: absolute`) at every width, as high as the first section and at most the window (`--conversation-canvas-first-section-bottom`, written by the Canvas controller, else `100dvh`); on Home (`body.home`) as high as the hero. The row sits the floating offset above the host's bottom (3.25rem desktop, 3.875rem tablet, 1.25rem mobile, plus the safe area), where it floats once the page scrolls (`canvas-journey.js`); search row 28.9375rem (463px) from 600px, 37.9375rem (607px) from 1200px. Hidden until the journey state is set (`html[data-canvas-journey-state]`); only the search row takes pointer events.
- **Data layer:** the Canvas is its own component with its own events.

```text
[Screenshot Placeholder]

File name:
header-canvas-home-desktop.png

Purpose:
The header Canvas on the Home hero (see Visual Reference).

Annotations:
A = Logo bar
B = Canvas row
```

#### Desktop header over a light hero

- **Purpose:** Figma Logos 667:52520 / Hero 4082:120388: the logos over the hero image.
- **Rendering:** `styles/styles.css` takes `<header>` out of the flow (`position: absolute`) from 1200px when `main > .section:first-child .hero` isn't one of the dark BG Colors (`bg-dark`, `bg-dark-subtle`, `bg-black`, `bg-charcoal-80`, `bg-navy-60`, `bg-charcoal-40`); `header.css` makes `.nav-wrapper` transparent; `blocks/hero` adds `--header-height` (else `--header-reserved`) to its top padding and height, so the hero never moves when the header loads.
- **Header over the first block (TCS Header):** with `<html data-header-overlay="always">` the header lies over any first block (transparent from `tcs-header.css`), with `never` it stays in the flow; this block's code is unchanged (see [TCS Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tcs-header/README.md)).

```text
[Screenshot Placeholder]

File name:
header-light-hero-desktop.png

Purpose:
The header over a light hero (see Visual Reference).

Annotations:
A = Logos over the hero
```

#### Area-specific Navigation page

- **Purpose:** a different header for an area (Careers) or campaign.
- **Fields:** Page Properties › Navigation, or the metadata sheet's `nav` column.
- **Rendering:** identical; only the nav page differs. A configured page that can't load falls back to the locale's `references/nav`.

```text
[Screenshot Placeholder]

File name:
header-area-navigation-tablet.png

Purpose:
A page of the careers area with the menu of references/nav-careers open.

Annotations:
A = Careers menu rows
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
