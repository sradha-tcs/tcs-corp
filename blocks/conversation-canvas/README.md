# Conversation Canvas

The Canvas: an ask-us panel with a search row (Default, Secondary) or a floating search and
navigation dock (Primary (sticky)), authorable in the page body, in the header (nav page) and in
the footer (footer canvas page). All Canvases on a page take part in one **floating journey**.

> Naming: the requirement and Figma say "Canvas" (sometimes "Canva" / "floating Canva"). The
> block keeps its technical name `conversation-canvas` (classes `conversation-canvas-*`,
> component "Conversation Canvas") so authored content and styles don't break.

## Files

| File | Responsibility |
|---|---|
| `conversation-canvas.js` | Decoration: reads the key-value rows, builds the intro, search row, menu, filters, buttons or the Primary dock; registers the block with the controller |
| `canvas-journey.js` | The journey as a pure function (`STATES`, `ROLES`, `TRANSITIONS`, `isAllowedTransition`, `assignRoles`, `resolveJourney`): no DOM, unit tested in `test/conversation-canvas/` |
| `canvas-controller.js` | One controller per page (`registerCanvas`): measures the page, applies the journey (`data-canvas-journey-state`, classes, reserved space, footer lift, focus clearance), HIDDEN on `header:menu` |
| `conversation-canvas.css` | Styles, variations, floating / docked presentation |
| `_conversation-canvas.json` | Universal Editor definition, model and filter |

The header (`blocks/header`) and footer (`blocks/footer`) only *host* Canvases: a nav page
section with a Canvas becomes `header .nav-canvas`; the footer loads its Conversation Canvas Page
as a fragment. Neither contains Canvas logic.

## Floating journey

```
INITIAL → FLOATING → SECTION_DOCKED → FLOATING_AFTER_SECTION → … → FOOTER_DOCKED   (HIDDEN: suppressed)
```

- **Targets**: every Default / Secondary Canvas in the journey (it has a search row in place).
  Roles come from the semantic container, not DOM order: a Canvas in `<header>` (the nav page) is
  **header**, as is the first Canvas when it is in the page's first section (the hero); the last
  Canvas in `<footer>` is **footer** (the final stop; other Canvases in the footer are sections);
  the rest are **section**. `data-canvas-role` on the block shows it.
- **Dock line**: the top of the floating row (viewport height − floating offset − row height).
- **Docked**: a target's search row is on screen at or above the dock line; nothing floats. With
  two rows in place, the one nearest to the dock line is the docked one; the state stays INITIAL
  while the header Canvas is still in place.
- **Owner** (the one floating row): the Primary (sticky) Canvas if there is one, else the last
  target (DOM order) that has crossed the dock line and may float. After each section Canvas the
  floating row is that Canvas's, so it shows the section's variation; scrolling up hands it back.
- **Approaching**: the next target coming up from below. Its own row is hidden (opacity, still
  focusable and read) until it reaches the dock line, where it replaces the floating row at the
  same position (no duplicate row, no jump).
- **Final stop**: once the footer Canvas reaches the dock line (or the page bottom on a short
  page) nothing floats any more.
- **No footer Canvas**: the floating row is lifted to stay above the footer's top edge; it never
  covers footer navigation or legal links.

| State (`<html data-canvas-journey-state>`) | Meaning |
|---|---|
| `initial` | The header Canvas (or the hero) is in place, or no Canvas floats yet |
| `floating` | The owner floats; no section Canvas crossed yet |
| `section-docked` | A section Canvas is in place |
| `floating-after-section` | Floating after at least one section Canvas |
| `footer-docked` | The footer Canvas is in place: the final stop |
| `hidden` | Suppressed: the header menu is open, or only Canvases that don't float were passed |

The state is computed from the scroll position, never from the previous state, so fast scrolling
or a jump (anchor link, End key) can't leave a stale state. Continuous scrolling produces only
the transitions of `TRANSITIONS` (`canvas-journey.js`, tested): the journey in both directions;
INITIAL / SECTION_DOCKED / FOOTER_DOCKED handing over directly when two Canvases are on screen;
FOOTER_DOCKED → FLOATING when no section Canvas was crossed; any state ↔ HIDDEN.

### Ownership

| Part | Owns |
|---|---|
| `blocks/header` (TCS Header) | Logos, navigation, the header Canvas host (`.nav-canvas`: nav page sections with a Canvas, below the nav); announces its menu with `document` event `header:menu` (`detail.open`) |
| `blocks/conversation-canvas` | Canvas content, variations, interaction and authoring; registers itself with the controller when decorated (in the header, page or footer) |
| `canvas-journey.js` | The state model (pure) |
| `canvas-controller.js` | One controller per page: geometry, observers, the state attribute, the classes; listens to `header:menu` (HIDDEN) |

The header and the Canvas don't import each other: the event is the only contract. Each Canvas
block registers itself during its own decoration (EDS block lifecycle), so header decoration never
waits for page Canvases.

### Mechanics

- The row floats with `position: fixed` **inside its own block**: no DOM moves, no clones, no
  re-initialisation; reading order, focus and listeners stay put. Its place keeps `min-height`
  while it floats, so the page doesn't move (no CLS).
- Measurement (slot positions, footer top, page height, the floating offset from the slot's
  `scroll-margin-bottom`) happens on registration, `resize` and a `ResizeObserver` on `<body>`
  (sections, images, fonts, header and footer loading), never while scrolling.
- Scroll: one passive listener for all Canvases; one update per animation frame that reads only
  `scrollY`, resolves the journey and writes classes only when the result changes.
- Stacking: the owner block gets `z-index: var(--conversation-canvas-z-floating)` (100, above
  page content; blocks use 10 at most). The block's `isolation: isolate` would otherwise keep
  the floating row below later positioned content.
- Lift (fallback) uses the `translate` property, so it never conflicts with the centring
  `transform` or the entry animation.
- Universal Editor: re-decorated blocks register as new entries; removed ones are released on
  the next measurement. Fragment Canvases (header, footer) are decorated before they are
  attached and join the journey once on the page. The shared listeners and the ResizeObserver
  are attached once per page (no MutationObserver).
- Failures are isolated: an error in the controller releases every row (nothing floats, state
  `hidden`); header, navigation, page and footer keep working.

### Accessibility

- Floating is visual only: DOM and reading order never change; no live region, so nothing is
  announced while scrolling; the hidden Primary dock is `inert`.
- Focused elements scroll clear of the floating row (`scroll-padding-bottom`, WCAG 2.4.11).
- The approaching row is shown again as soon as it holds focus (`:focus-within`).
- The floating row is hidden while the header menu is open (state `hidden`, from the
  `header:menu` event; the menu exists below 1200px), so it never covers the menu.
- The floating offset includes `env(safe-area-inset-bottom)`; touch targets are 48–59px.
- Entry animation and dock transitions are off with `prefers-reduced-motion: reduce`; a lift-off
  from a row in place has no entry animation.

## Variation inventory

Verified from the repository, the published content and Figma *New Screens from New DS*
(`yElx5Tf9wr8G2vCXopi49W`). Only these are implemented.

| Variation | Figma | Context | Configuration | Floating / docked |
|---|---|---|---|---|
| Default | Hero (4082:120388), Intelligent Personalisation Block (251:41883), Footer (2496:91965) | Page body, header, footer | Canvas Style Default | Search row docks in place, floats once passed |
| Secondary | — (repository) | Page body | Canvas Style Secondary | As Default; filter tags by script |
| Floating search row | Floating menu (4308:42483): 59px menu button, 2px `#494c4d` outline, 60% white pill; 607×72 desktop, 463×72 tablet | Any Default / Secondary | — | The floating presentation of the owner row |
| Primary — Pills | Full menu (1124:26209) | Page body (first section) | Canvas Style Primary (sticky), Navigation style Pills | Whole dock floats; docks give way to Canvases in place |
| Primary — Text links | Full menu – No Pill (1734:31279) | As Primary | Navigation style Text links | Text items; current / open item as filled pill |
| Primary — Dark | L1 Media & Investors (1734:38272) | As Primary | BG Style Dark (Primary) + Text links | Black fade, `--black-400` pill with `--grey-300` outline, light items |
| Title Bigger / Medium, background image, icon, eyebrow, buttons | Hero, Intelligent Personalisation Block | Default / Secondary | Title Type, BG Background Image, Icon, Eyebrow, Button items | Unchanged |

Mobile (< 900px): the Primary dock shows only the search pill (navigation is in the site
header); Default / Secondary rows float full width minus 24px gutters.

## Authoring (Universal Editor)

| Field | Values | Effect |
|---|---|---|
| Canvas Style | Default / Primary (sticky) / Secondary | Variation |
| Floating journey (`classes_journey`) | Floats and docks (default) / Docks only (`nofloat`) / Decorative (`decorative`) | Docks only: a stop of the journey whose own row never floats (the previous row floats on after it). Decorative: a Canvas in place that isn't part of the journey (Primary docks always are) |
| BG Style | Default / Dark (Primary) | Dark applies to the Primary dock |
| Navigation style (`classes_navstyle`) | Pills / Text links | Primary dock navigation |

Authors never set offsets, coordinates, z-index or thresholds; roles (header / section / footer)
come from where the Canvas is placed. For the footer final stop, the Footer block's
Conversation Canvas Page must reference a page with a Canvas (`references/footer-conversation-canvas`).
For a header Canvas, add a section with a Canvas to the nav page (it is placed below the nav).

## Figma gaps and decisions

- Figma doesn't prototype scrolling, docking or the footer stop; the journey above supplements
  it (Figma is used for the visuals and positions).
- The two `figma.com/site/…` files (www.tcs.com) are Figma Sites, which the Figma API can't read;
  they were not used.
- The header is the TCS Header (`blocks/header`, PR #81): the Figma logo bar on desktop, the
  menu below 1200px.
- Hover states of the Text links and Dark navigation aren't in Figma; they reuse the pill's blue
  outline.

## Validation

- Unit tests: `npm test` (`test/conversation-canvas/canvas-journey.test.mjs`: roles from
  placement, the journey down and up, every transition of continuous scrolls against
  `TRANSITIONS`, single owner, HIDDEN, Docks only, Primary, missing intermediate / footer Canvas,
  two Canvases on screen, header Canvas with a hero, short page).
- Local pages (`drafts/`, run `aem up --html-folder drafts`): `canvas-journey` (all variations
  and the full journey), `canvas-journey-primary`, `-primary-text`, `-primary-dark`,
  `canvas-journey-fallback` (footer without a Canvas), `canvas-journey-header` (Canvas in the nav
  page).
