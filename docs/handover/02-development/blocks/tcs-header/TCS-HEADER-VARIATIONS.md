---
id: "DEV-V-tcs-header"
title: "TCS Header Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/tcs-header/_tcs-header.json"]
relatedComponents: ["tcs-header"]
relatedPages: []
confidence: "Medium"
primary: false
---

# TCS Header Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-tcs-header |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the TCS Header block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/tcs-header/_tcs-header.json |
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
| `tcs-header` | Header over the first block (`headerOverlay`) | Content | No | Auto (over a light Hero) = `""`; Always (over the first block) = `always`; Never (the page starts below the header) = `never` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the TCS Header blocks on the published block library pages (0 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| tcs-header | Header over the first block | Auto (over a light Hero) | `""` | Supported (in the model) | n/a (default) |
| tcs-header | Header over the first block | Always (over the first block) | `always` | Supported (in the model) | Not checkable (data attribute / field value) |
| tcs-header | Header over the first block | Never (the page starts below the header) | `never` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### On the Navigation page (header logos)

- **Purpose:** the site header's brand and tools.
- **When to use / not:** always on nav pages; not needed on positional nav pages authored before (brand, sections, tools), which still work.
- **Fields:** the six logo fields, and **Menu root path** / **Menu depth** for the tablet and mobile menu.
- **Rendering:** `blocks/header` `applyLogoBar` replaces the block's section with `div.section.nav-brand > p > a.tcs-header-brand` and `div.section.nav-tools > p > a.tcs-header-group`; the first other section becomes the menu. A TCS Header in the same section as a Conversation Canvas is kept as the logo bar (only the Canvas goes to the header Canvas). Sizes and layout come from `header.css`.
- **Tablet and mobile menu (below 1200px):** a nav page without a menu list of its own gets one from this block: decorated in the nav fragment (before the header reads it), it adds `div.section.tcs-header-menu` after its section, the list of the pages below its **Menu root path** (else the Menu root path of the Conversation Canvas in its section) up to its **Menu depth** (else the Canvas's, else 1), from the query index (`utils/query-index.js` `getPageTree`; `scripts.js` `prefetchData` starts the index on every page at the start of the lazy phase, so the header doesn't wait for it). `blocks/header` (unchanged) makes it the menu: menu button, levels, Escape, focus, `header:menu`. No pages (or AEM author, which has no query index): no menu, no menu button. `tcs-header.css` styles the header below 1200px as Figma Mobile Nav 2325:55704 / 1124:25497 (24px gutters, TCS logo 30.7px, TATA logo 38px, the menu icon's 2px lines 26px wide and 8px apart in `--color-icon-default`). The open menu's title row ("Menu", or a level's Back arrow and title) starts at the gutter, left-aligned with the rows below, and a linked section's arrow (on its button) is at the right edge, in line with the other rows' arrows. While the menu is open the header Canvas is hidden (`blocks/conversation-canvas`); it shows again in its place when the menu closes. Below 1200px the Conversation Canvases don't show their own site menu button (`blocks/conversation-canvas`): the header's menu button is the site navigation there; on desktop the Canvas menu lists the same pages, one level at a time like this menu.
- **Menu root path fallback:** the menu takes the first of the block's own Menu root path and the Conversation Canvas's (in the same section) with pages in the site's query index. A Menu root path of another site (e.g. the language master, `/content/tcs-corp/language-masters/en/...`, on an `/en` page) has none there, so the Canvas's is used; without pages in either, there's no menu and no menu button.
- **The logo bar stays at the top** while the page scrolls, at every width (fixed, `z-index: 20`), in every Header over the first block mode; over the first block it is transparent at the top of the page and turns solid once the page has scrolled by the bar's height (a scroll-driven animation; browsers without one keep it transparent); the open tablet / mobile menu keeps it solid, and the menu button has no box of its own. In-page targets (a `#` link to a heading or an Anchor ID, `anchor-*`) scroll clear of the bar (`scroll-margin-top: calc(var(--nav-height) + 1.5rem)` on pages with a TCS Header); the Anchor List keeps its own offset.
- **Header over the first block (every width):** **Auto** (default) keeps the behaviour before: the logo bar lies transparent over an opening light Hero (Home), else it's a bar above the page. **Always**: the bar is transparent over the page's first block, whatever it is, which starts at the top of the page; a Hero keeps its content below the logos, other blocks need their own top space (their Padding top, Additional tab, or `var(--header-overlay-space, 0rem)` in a block's CSS); the logos should be transparent images (a JPG keeps its white box over a coloured block) and dark logos aren't visible over a dark block. **Never**: the bar is above the page also over a light Hero (the page starts below the 64px / 124px bar). The block sets `<html data-header-overlay>` (`utils/header-space.js` `setHeaderOverlay`) when decorated in the nav fragment, not on the nav page itself; the layout is in `styles/styles.css` (it applies before the header loads), the transparent bar in `tcs-header.css`. The mode is remembered per browser and applied before the header loads on the next pages, so only a visitor's first page with Always or Never can move once when the header arrives (decision log KB-D-052, Proposed).
- **Desktop / tablet / mobile:** as the [Header](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/header/README.md).
- **Accessibility:** logo links named by their alt texts, inside the header's `nav`.
- **Data layer:** clicks report the header component (`header-1`).
- **Personalization / fallback:** none; an area nav page can use other logos.

```text
[Screenshot Placeholder]

File name:
tcs-header-in-header-desktop.png

Purpose:
The logos in the site header (see Visual Reference).

Annotations:
A = TCS logo
B = TATA logo
```

#### Standalone logo bar

- **Purpose:** the logo bar inside a page section.
- **Rendering:** `div.tcs-header-bar` (flex, 1.7391rem gap between the logos; `justify-content: space-between` from 1200px). In a Full Width section (any section without `fixed-width`) the bar keeps the header's gutters (1rem / 1.5rem / 5rem); in a Fixed Width section the section gutter applies.
- **Accessibility / data layer:** the block is its own component (`tcs-header-1`); logo clicks `cmp:click`.

```text
[Screenshot Placeholder]

File name:
tcs-header-standalone-desktop.png

Purpose:
The standalone logo bar (see Visual Reference).

Annotations:
A = TCS logo
B = TATA logo
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
