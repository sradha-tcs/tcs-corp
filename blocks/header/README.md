# Header (TCS Header)

The site header of every page, built by `scripts/aem.js` `loadHeader` inside `<header>` (authors
don't add it). It loads the **Navigation page** as a fragment: the page's Navigation property,
inherited from its parent pages up to Home (`utils/inherited-metadata.js`), else the locale's
`references/nav` (`utils/site.js` `resolvePagePath`).

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
