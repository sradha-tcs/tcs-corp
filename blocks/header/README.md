# Header (TCS Header)

The site header of every page, built by `scripts/aem.js` `loadHeader` inside `<header>` (authors
don't add it). It loads the **Navigation page** as a fragment: the page's Navigation property,
inherited from its parent pages up to Home (`utils/inherited-metadata.js`), else the locale's
`references/nav` (`utils/site.js` `resolvePagePath`). A configured Navigation page that can't be
loaded (not published, moved) falls back to `references/nav`, so the page keeps a header.

Figma: *New Screens from New DS* (`yElx5Tf9wr8G2vCXopi49W`): Navigation (1124:25825; mobile
menu frames 1124:27418, 1124:27432, 1124:27453), Home desktop / tablet / mobile (229:15426,
671:52732, 4082:120430).

## Navigation page (authoring contract, unchanged)

| Section | Role | TCS Header content |
|---|---|---|
| 1 | Brand (`nav-brand`) | TCS logo: an image linked to the locale Home (alt "Tata Consultancy Services") |
| 2 | Sections (`nav-sections`) | The menu: a list; an item with a nested list is a section with sub-levels (any depth) |
| 3 | Tools (`nav-tools`) | TATA logo: an image linked to tata.com (alt "TATA Group") |

A section label may be text (the row opens the level) or a link (the link stays; an arrow button
next to it opens the level).

Instead of the brand and tools sections, the nav page may start with a **TCS Header** block
(`blocks/tcs-header`: TCS / TATA logo fields with alt texts and links); the header then takes the
brand and tools from it and the first other section is the menu.

## Logo assets

The logos are authored, not in the code: the TCS Header block's TCS Logo and TATA Logo fields
(asset references, with alt text and link) on the Navigation page, so every page inherits them
through the Navigation property and a page can override them with its own Navigation page.

| Asset | DAM path (one file per logo, all breakpoints) | Height mobile / tablet / desktop |
|---|---|---|
| TCS logo | `/content/dam/tcs-corp/header/tcs-logo.svg` | 19.4 / 30.7 / 34.8px (Figma TCS Logo, 4.195:1) |
| TATA logo | `/content/dam/tcs-corp/header/tata-logo.svg` | 24 / 38 / 44px (Figma Tata Logo) |

Figma uses the same artwork at every breakpoint (the same vector nodes), so there is one asset per
logo; the CSS sets the height and the width follows the aspect ratio. The header has no search
control (Figma); the project's search icon is the shared `icons/search.svg`.

## Behaviour

| Breakpoint | Layout |
|---|---|
| Desktop (>= 1200px) | Logo bar: TCS logo left, TATA logo right, 124px (`--nav-height` 7.75rem), 80px gutters. No navigation in the header (strict Figma, product decision 16 Oct 2026): the site navigation is in the Conversation Canvas |
| Tablet (600–1199px) | 64px bar, 24px gutters: TCS and TATA logos, 32px menu button; the header is fixed |
| Mobile (< 600px) | As tablet with 16px gutters |

The menu (tablet and mobile) opens full screen over the page (page scrolling locked) and shows
one level at a time: the title ("Menu", then the open section's label), a Back button from the
second level, and the rows (text and arrow). Opening a section shows its sub-list in place of the
level; Back returns one level and focuses the section's button again.

Over a light hero (desktop): when the page's first section has a hero that isn't `bg-dark`,
`bg-dark-subtle` or `bg-black`, the header has no band and lies over the hero (Figma Logos
667:52520, Hero 4082:120388): its header Canvas loses its background and rounded corners. The
header is out of the flow, so the hero never moves when it loads; the hero grows by the header's
height (`--header-height`, set by the header once loaded; before that the reserved
`--header-reserved`, the bar's height, see below). Below 1200px the header keeps its bar above
the hero.

**Header Canvas** (a nav page section with a Conversation Canvas): it belongs to the bottom of
the first screen, on the hero (Figma home-desktop 229:15426, home-tablet 671:52732, mobile Ask TCS
1124:27368). Its host (`.nav-canvas`) is out of the flow at every width, so the header keeps the
bar's height and the page isn't pushed down; it is as high as the first section, at most the
window (`--conversation-canvas-first-section-bottom` from the Canvas controller, `100dvh`). The
row sits the floating offset above the host's bottom (52px desktop, 62px tablet, 20px + safe area
mobile), which is exactly where it floats once the page scrolls, so it stays at the bottom of the
window without moving (canvas-journey.js). Search row 463px on tablet, 607px on desktop. A TCS
Header block in the same nav page section stays the logo bar (only the Canvas goes to the host).
On Home the opening hero fills the first screen and keeps its content clear of the row
(`templates/home`; on screens under 640px high with a smaller title and tighter gaps), so the row
lies on the hero's bottom, which is the bottom of the window.

Two zones: the **logo bar** (TCS and TATA logos) is the header's only box in the flow, at the
top of the page (over a light hero on desktop, a fixed bar above the hero below 1200px); the
**interaction row** (the Canvas menu button and search, Figma Floating menu 4308:42483: 59px
button, 17px gap, input) is the header Canvas, out of the flow at the bottom of the first screen.
The bar never takes the Canvas's height and never moves with it.

### Accessibility

- Menu button: `aria-controls="nav-sections"`, `aria-expanded`, name Open / Close navigation.
- Section buttons: `aria-controls` (the sub-list) and `aria-expanded`; a linked section's arrow
  button is named "Show {label} menu".
- Opening a level focuses Back; Back focuses the section's button; Escape closes the menu and
  focuses the menu button; focus moving to an element outside the nav closes the menu (a tap on
  the menu's background doesn't).
- Hidden levels are `display: none` (not focusable, not read). DOM order follows the screen:
  logos, menu button, menu.
- Arrows use `--color-icon-default` (Figma shows a light grey that fails 3:1 non-text contrast).
- UI text from placeholders: `mainNavigation`, `openNavigation`, `closeNavigation`,
  `showSubmenu`, `menu`, `back`.

## Contracts kept for other code

| Contract | Used by |
|---|---|
| `header .nav-wrapper`, fixed below the logo bar breakpoint | `blocks/anchor-list` (offset below a fixed header) |
| `--nav-height` (header height; 4rem, 7.75rem from 1200px) | `styles/styles.css` (header height reserved before load), `blocks/tabs` (scroll margin), `404.html` |
| `--header-height` (the header's height with its Canvas, on `<html>`) | `styles/styles.css`, `blocks/hero` (desktop header over a light hero) |
| `--header-reserved` (the space the header keeps until it loads: the logo bar, `--nav-height`, or the height remembered from the last page by `utils/header-space.js`) | `styles/styles.css`, `blocks/hero` |
| `#nav`, `#nav-sections`, `.nav-hamburger button`, `nav[data-expanded]` | Conversation Canvas (PR #71: floating row hidden while the menu is open) |
| `nav-brand`, `nav-sections`, `nav-tools` | The nav page authoring contract |

## Decisions (destination first)

| Capability | Destination | Decision |
|---|---|---|
| Header loading | `aem.js` `loadHeader` → `blocks/header` | Reused; no `tcs-header` block (the source's changed `aem.js`, which this project never modifies) |
| Navigation source | Nav page fragment (`blocks/fragment` `loadFragment`), inherited Navigation | Reused; the source's query-index menu tree and hard-coded AEM path rejected |
| Mobile menu | The header's menu (`nav[data-expanded]`, scroll lock, Escape, focus-out) | Extended with levels (Figma drill-down) on the authored list; the source's body overlay (cloned logos, `innerHTML`, `.hidden !important`, `z-index: 9999`) rejected |
| Ids, placeholders, button decoration | `utils/ids.js`, `utils/placeholders.js`, `decorators/button-decorator.js` | Reused |
| Tokens | `styles/styles.css` | Reused (spacing, icon sizes, colors, weights, border width, content max width); one token value added: `--nav-height` at 1200px |
| Icons | `icons/arrow-left.svg`, `icons/arrow-right.svg` (CSS masks) | Reused; menu / close icon stays the CSS-drawn one |
| Header variants (source: Standard, Compact, Dark, Centered) | — | Not implemented: not in Figma |
