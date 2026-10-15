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
| `canvas-journey.js` | The journey as a pure function (`STATES`, `ROLES`, `assignRoles`, `resolveJourney`): no DOM, unit tested in `test/conversation-canvas/` |
| `canvas-controller.js` | One controller per page (`registerCanvas`): measures the page, applies the journey (classes, reserved space, footer lift, focus clearance) |
| `conversation-canvas.css` | Styles, variations, floating / docked presentation |
| `_conversation-canvas.json` | Universal Editor definition, model and filter |

The header (`blocks/header`) and footer (`blocks/footer`) only *host* Canvases: a nav page
section with a Canvas becomes `header .nav-canvas`; the footer loads its Conversation Canvas Page
as a fragment. Neither contains Canvas logic.

## Floating journey

```
Header Canvas → floating → section Canvas (docked) → floating → … → footer Canvas (docked, final)
```

- **Targets**: every Default / Secondary Canvas (it has a search row in place). Roles come from
  DOM order and context: the last Canvas in `<footer>` is **final**, the first other one
  **start** (in the header, or the first on the page), the rest **intermediate**.
- **Dock line**: the top of the floating row (viewport height − floating offset − row height).
- **Docked**: a target's search row is on screen at or above the dock line. Nothing floats.
- **Owner** (the one floating row): the Primary (sticky) Canvas if there is one, else the last
  target (DOM order) that has crossed the dock line and may float. So after each section Canvas
  the floating row takes *that* Canvas's variation; scrolling up hands it back.
- **Approaching**: the next target coming up from below. Its own row is hidden (opacity, still
  focusable and read) until it reaches the dock line, where it replaces the floating row at the
  same position (no duplicate row, no jump).
- **Final stop**: once the footer Canvas reaches the dock line (or the page bottom on a short
  page) nothing floats any more, in either direction below it.
- **Fallback** (no footer Canvas): the floating row is lifted to stay above the footer's top
  edge; it never covers footer navigation or legal links.

| State (`<html data-canvas-journey>`) | Meaning |
|---|---|
| `initial` | No Canvas floats yet (e.g. the first Canvas is further down) |
| `docked-header` | The start Canvas is in place |
| `floating` | The owner floats; no other target crossed yet |
| `approaching-target` | Floating; an intermediate target is coming up |
| `docked-section` | An intermediate target is in place |
| `floating-between-targets` | Floating after crossing at least one other target |
| `approaching-footer` | Floating; the footer Canvas is coming up |
| `docked-footer` | Final stop |
| `fallback` | Floating, lifted above a footer without a Canvas |
| `disabled` | No Canvas on the page may float (all Don't float) |

`LEAVING_TARGET` from the requirement is the instant between `docked-*` and `floating*`, not a
resting state.

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
  attached and join the journey once on the page.

### Accessibility

- Floating is visual only: DOM and reading order never change; no live region, so nothing is
  announced while scrolling; the hidden Primary dock is `inert`.
- Focused elements scroll clear of the floating row (`scroll-padding-bottom`, WCAG 2.4.11).
- The approaching row is shown again as soon as it holds focus (`:focus-within`).
- The floating row is hidden while the mobile menu is open (`header nav[data-expanded='true']`
  below 900px), so it never covers the menu.
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
| Don't float (`classes_nofloat`) | on / off | The Canvas stays a stop of the journey but its own row never floats; the previous row floats on after it |
| BG Style | Default / Dark (Primary) | Dark applies to the Primary dock |
| Navigation style (`classes_navstyle`) | Pills / Text links | Primary dock navigation |

Authors never set offsets, coordinates, z-index or thresholds; roles (start / intermediate /
final) come from where the Canvas is placed. For the footer final stop, the Footer block's
Conversation Canvas Page must reference a page with a Canvas (`references/footer-conversation-canvas`).
For a header Canvas, add a section with a Canvas to the nav page (it is placed below the nav).

## Figma gaps and decisions

- Figma doesn't prototype scrolling, docking or the footer stop; the journey above supplements
  it (Figma is used for the visuals and positions).
- The two `figma.com/site/…` files (www.tcs.com) are Figma Sites, which the Figma API can't read;
  they were not used.
- Figma's desktop header is a logo bar (TCS logo left, TATA logo right, 124px, 80px gutters);
  tablet / mobile: logo and menu icon. The header code is unchanged (navigation preserved): the
  bar is reached by authoring the nav page (brand, empty sections, TATA logo in tools); its height
  and gutters are a follow-up (global `--nav-height`).
- Hover states of the Text links and Dark navigation aren't in Figma; they reuse the pill's blue
  outline.

## Validation

- Unit tests: `npm test` (`test/conversation-canvas/canvas-journey.test.mjs`: roles, downward /
  upward journey, single owner, footer stop, short page, fallback, Don't float, Primary, missing
  intermediate / footer Canvas).
- Local pages (`drafts/`, run `aem up --html-folder drafts`): `canvas-journey` (all variations
  and the full journey), `canvas-journey-primary`, `-primary-text`, `-primary-dark`,
  `canvas-journey-fallback` (footer without a Canvas), `canvas-journey-header` (Canvas in the nav
  page).
