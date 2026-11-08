---
id: "DEV-V-conversation-canvas"
title: "Conversation Canvas Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/conversation-canvas/_conversation-canvas.json"]
relatedComponents: ["conversation-canvas"]
relatedPages: ["/design-block-master/en/block-library/conversation-canvas","/design-block-master/en/block-library/conversation-canvas/conversation-canvas","/design-block-master/en/block-library/conversation-canvas/docked","/design-block-master/en/block-library/conversation-canvas/floating","/design-block-master/en/block-library/conversation-canvas/footer-canvas","/design-block-master/en/block-library/conversation-canvas/journey-and-actions"]
confidence: "Medium"
primary: false
---

# Conversation Canvas Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-conversation-canvas |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Conversation Canvas block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/conversation-canvas/_conversation-canvas.json |
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
| `conversation-canvas` | Canvas Style (`classes`) | Content | No | Default = `""`; Primary (sticky) = `primary`; Secondary = `secondary` | `` |
| `conversation-canvas` | Floating journey (`classes_journey`) | Content | No | Floats and docks = `""`; Stays in place = `nofloat` | `` |
| `conversation-canvas` | Quick actions (`classes_actions`) | Content | No | Auto = `""`; Pills = `action-pills`; Buttons = `action-buttons` | `` |
| `conversation-canvas` | BG Style (`bgStyle`) | Content | No | Default = `default`; Dark (Primary) = `dark` | `default` |
| `conversation-canvas` | Title Type (`titleSize`) | Content | No | Default = `""`; Bigger Title = `bigger`; Medium Title = `medium` | `` |
| `conversation-canvas` | Navigation style (`classes_navstyle`) | Content | No | Pills = `""`; Text links = `text-links` | `` |
| `conversation-canvas` | Search bar › Search bar button icon type (`searchButtonStyle`) | Content | No | Primary = `primary`; Secondary = `secondary`; Tertiary = `tertiary` | `primary` |
| `conversation-canvas-button` | Views (`buttonView`) | — | No | Button = `button`; Icon = `icon`; Link = `link` | `button` |
| `conversation-canvas-button` | Type (`buttonVariant`) | — | No | Primary = `primary`; Secondary = `secondary`; Tertiary = `tertiary` | `primary` |
| `conversation-canvas-button` | Icon (`buttonIcon`) | — | No | Arrow right = `arrow-right`; Chevron right = `chevron-right`; Chevron down = `chevron-down`; Search = `search` | — |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Conversation Canvas blocks on the published block library pages (6 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| conversation-canvas | Canvas Style | Default | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | Canvas Style | Primary (sticky) | `primary` | Supported (in the model) | Yes |
| conversation-canvas | Canvas Style | Secondary | `secondary` | Supported (in the model) | Yes |
| conversation-canvas | Floating journey | Floats and docks | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | Floating journey | Stays in place | `nofloat` | Supported (in the model) | Yes |
| conversation-canvas | Quick actions | Auto | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | Quick actions | Pills | `action-pills` | Supported (in the model) | Yes |
| conversation-canvas | Quick actions | Buttons | `action-buttons` | Supported (in the model) | Yes |
| conversation-canvas | BG Style | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | BG Style | Dark (Primary) | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | Title Type | Default | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | Title Type | Bigger Title | `bigger` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | Title Type | Medium Title | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | Navigation style | Pills | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | Navigation style | Text links | `text-links` | Supported (in the model) | Yes |
| conversation-canvas | Search bar › Search bar button icon type | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | Search bar › Search bar button icon type | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | Search bar › Search bar button icon type | Tertiary | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Views | Button | `button` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Views | Icon | `icon` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Views | Link | `link` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Type | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Type | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Type | Tertiary | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Icon | Arrow right | `arrow-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Icon | Chevron right | `chevron-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Icon | Chevron down | `chevron-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas-button | Icon | Search | `search` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

Verified from the repository, the published content and Figma *New Screens from New DS*. Only these are implemented.

| Variation | Figma | Context | Configuration | Floating / docked |
| --------- | ----- | ------- | ------------- | ----------------- |
| Default | Hero (4082:120388), Intelligent Personalisation Block (251:41883), Footer (2496:91965) | Page body, header, footer | Canvas Style Default | Search row docks in place, floats once passed |
| Secondary | — (repository) | Page body | Canvas Style Secondary | As Default; filter tags by script |
| Section Canvas | Intelligent Personalisation Block (251:41883), tablet 2313:52736 | Page body (Default / Secondary) | — | From 600px at least 50rem (800px) high, content centred, 1.5rem gutters; from 1200px 10rem / 5rem (160px / 80px) padding; edge to edge in a Full Width section (no rounded corners); search row 37.9375rem (607px) |
| Quick actions | Filter tag (state-5-pills, 251:41883); Footer CTA buttons (2496:91965) | Page body / footer | Quick actions (`classes_actions`) | Auto: pills in page sections (0.75rem 2rem padding, 1px `--color-border-default`, 1.125rem medium, no arrow, 0.75rem apart, at most 56.25rem wide), buttons in the footer |
| Floating search row | Floating menu (4308:42483): 59px menu button, 2px `#494c4d` outline, 60% white pill; 607×72 desktop, 463×72 tablet | Any Default / Secondary | — | The floating presentation of the owner row: 28.9375rem (463px) wide below 1200px, 37.9375rem (607px) from 1200px, never wider than the window minus 1.5rem gutters; it changes width as it floats and lands on tablet |
| Primary — Pills | Full menu (1124:26210, 1124:26244) | Page body | Canvas Style Primary (sticky), Navigation style Pills | Whole dock floats; docks give way to Canvases in place. From 900px: the 33.125rem (530px) search pill alone (40% white, light outline, light placeholder); first level as pills (0.75rem 2rem, medium), the levels below as text items with the open one filled, their row starting with the menu button (back to the first level; a back arrow deeper down) |
| Primary — Text links | Full menu – No Pill (1734:31279) | As Primary | Navigation style Text links | Text items; current / open item as filled pill |
| Primary — Dark | L1 Media & Investors (1734:38272) | As Primary | BG Style Dark (Primary) + Text links | Black fade, `--black-400` pill with `--grey-300` outline, light items |
| Title Bigger / Medium, background image, icon, eyebrow, buttons | Hero, Intelligent Personalisation Block | Default / Secondary | Title Type, BG Background Image, Icon, Eyebrow, Button items | Title Bigger 6rem (96px) from 1200px |

#### Default

Purpose: the standard ask-us panel. Use for heroes and sections; don't use for data capture. Required: nothing; recommended: Title, Search bar fields. Dialog: Canvas Style Default. Rendering: white panel (`--color-bg-default`), 1.25rem corners, blue glow left / yellow right, centred content, search row, quick actions. Site menu (Default and Secondary, desktop; Figma Full menu 1124:26210 / 1124:26244): the menu button (a blue close button while open) opens the pages below the Menu root path as a row below the search row, the page behind in a grey fade the size of the window (40% black at the top, `--color-bg-secondary` from 55% down; Figma 1124:26244); the menu button is the Figma Circle Menu (4308:42483): a 59px `--color-bg-brand` circle with a white menu icon, in place and floating. Items (Figma 1124:27046 Nav-Items): the first level as Filter tag pills (1px `--color-border-neutral-secondary` #767676, 12px 32px, medium `--color-text-neutral`), the levels below as white pills (1px `--color-border-default`, 8px 24px); in the pills only a page with child pages has an arrow (a chevron); in the panel every row has one (Figma List Container 1124:26250), on a page with child pages it is the button opening them; the open item is a filled blue pill. A page with child pages shows them, while the pointer is on it, in a panel above the row in place of the search row (Figma List Container 1124:26250: 14 / 20px rows 49px apart, an arrow at the right of every row, a Black/300 divider below every row but the last; 25.5938rem, or two columns filled top to bottom, 2.5rem apart and 51.1875rem wide, for more than six pages; 1.25rem padding); its chevron button opens it too (keyboard, touch). A link's text opens its page. In the panel, the arrow of a page with child pages opens its level: the row shows that level's pages as text items, starting with a menu button back to the first level (a back arrow below the second level), the page as a filled blue pill with a chevron and its child pages in the panel; hovering another item shows its child pages. Escape closes the panel, then the menu; a click outside (anywhere but the search row and the menu: page, header, beside the pills) or focus leaving the search row closes it; closing (any way, also scrolling) resets it to the first level with no panel open, so the search row shows again and it reopens at the first level. While open, the search row moves up when the row below wouldn't fit in the window (e.g. the header Canvas or a floating row at its bottom), placed when it opens and on resize; scrolling closes it (it doesn't follow a moving row, no flicker). The menu button and its menu show from 1200px only (on tablet and mobile the site navigation is the header's menu button, `blocks/tcs-header`). The menu's display, size, margin and padding are its own, also inside `<header>` (the header Canvas), where the header's `header nav` rules would otherwise size it. While the header's tablet / mobile menu is open, the header Canvas is hidden (the menu covers the page, whose Canvases are inert; nothing floats) and shows again in its place, with its search text, when the menu closes. Desktop / tablet / mobile: see Responsive Behavior. Accessibility: H2 title, search landmark, labelled controls. Data layer: `cmp:click`, `cmp:search`. Personalization: none; the authored panel renders.

```text
[Screenshot Placeholder]

File name:
conversation-canvas-default-mobile.png

Purpose:
The Default Canvas at 375 px: the 2.5rem title, the menu button beside a narrow search pill, buttons below.

Annotations:
A = Title
B = Search row
C = Quick actions
```

#### Secondary

Purpose: a topic exploration panel. Dialog: Canvas Style Secondary. Rendering: as Default with the glows reversed (yellow left, blue right), a 2.5rem gap in the intro, and an empty, hidden filter list (`ul.conversation-canvas-filters`, `aria-label` "Suggestions") that a script fills with `setConversationCanvasFilters(block, tags)`. Without a script no filters show. Personalization fallback: no filter tags.

```text
[Screenshot Placeholder]

File name:
conversation-canvas-secondary-tablet.png

Purpose:
The Secondary Canvas at 768 px with script-supplied filter tags (one active).

Annotations:
A = Filter tags
B = Active tag
```

#### Primary (sticky)

Purpose: a persistent search and section navigation dock. Use at most one per page, on long pages. Dialog: Canvas Style Primary (sticky); options Navigation style (Pills / Text links), BG Style (Default / Dark), Menu root path and depth. Rendering: only `.conversation-canvas-dock`, fixed at the bottom; hidden (`inert`, transparent) while another Canvas is docked or the header menu is open; below 900px only the 17.5rem search pill; from 900px the menu button, navigation and sub-page panel over a white (or black, Dark) fade. Navigation views: the root's sections on the menu root (or when the page isn't in the tree); a page's sub-pages when it has some (pills with their own sub-pages open a panel; six or more items in two balanced columns); on a page without sub-pages its suggestions (the page's tag labels, or `setConversationCanvasSuggestions(block, suggestions)`), else its parent's sub-pages. Clicking a suggestion fills the field (surrounding quotes removed) and submits. Titles drop the text after "|". Personalization fallback: tag labels or the parent's sub-pages.

```text
[Screenshot Placeholder]

File name:
conversation-canvas-primary-suggestions-desktop.png

Purpose:
The Primary dock on a page without sub-pages: the back button and suggestion pills from the page's tags.

Annotations:
A = Back / menu button
B = Suggestion pills
```

#### Floating journey: the three behaviours

The Canvas options give three behaviours, each with its own use: **Primary (sticky)** (Canvas Style): the dock floats at the bottom of the window from the top of the page to the footer (site search and navigation on long pages). **Floats and docks** (Floating journey, the default for Default and Secondary): the row stays in place, floats once scrolled past and lands on the next Canvas, until the footer Canvas. **Stays in place** (`nofloat`): the row never floats; a floating row lands on it while it's on screen, so there's never a second row over it. The former Docks only is Stays in place; the former Decorative (a Canvas outside the journey, which the floating row passed over, showing two rows) is read as Stays in place too; Floating journey isn't offered for Primary, which always floats (Docks only on a Primary used to hide the dock for good). **Hidden Canvases aren't active.** A Canvas with Hide block, or one that isn't shown (a hidden tab or section), never floats and nothing docks on it, wherever it is: in the page, in the header (nav page) or the footer (the footer's Canvas page), and a Primary dock; one that was active lets go (no floating row, `data-canvas-role` or reserved space left) and the journey runs on the active Canvases only. Hide block hides the Canvas in the header and footer too (`styles/styles.css` hides blocks in `main` only); in Universal Editor edit mode it stays visible, faded, and isn't active either. Examples: a hidden section Canvas: the header row floats on past it; a hidden header Canvas: nothing floats until the next Canvas, which floats from there; a hidden footer Canvas: the floating row floats to the end of the page, lifted above the footer.

**One row in use.** While a row floats it is the only Canvas row in use: its menu button, search field, voice and submit work, and every other Canvas row is a placeholder (`inert`: it can't be clicked, focused or read out), e.g. the next Canvas's row, hidden while the floating row comes up to it (`.conversation-canvas-approaching`), which a click used to show again next to the floating row. With no row floating (the header Canvas docked on the first screen, a section or the footer Canvas docked) every Canvas row is in use on its own. A row in use (focus in it, e.g. while typing in a docked row) stays docked while it's on screen (`focused` in `canvas-journey.js`), so it doesn't turn into a placeholder under the user's hands. An open site menu closes when its row starts or stops floating. In Universal Editor edit mode no row is made inert (authors select them). The Canvas content around a row (title, text, Quick actions) is page content and always stays in use.

#### Placement: header, section and footer Canvas

Roles come from placement (`data-canvas-role` on the block): a Canvas in `<header>` (a nav page section, hosted in `header .nav-canvas`), or the first Canvas when it is in the page's first section (the hero), is **header**; the last Canvas in `<footer>` is **footer** (the final stop; other Canvases in the footer are sections); the rest are **section**; Primary has no role (`dock`). The header Canvas sits on the bottom of the first screen and floats as soon as scrolling would carry it up; a hero shorter than the window makes it float from the start.

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
