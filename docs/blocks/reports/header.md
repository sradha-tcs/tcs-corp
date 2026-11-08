# header

## Existing README changes

- Kept: the Navigation page loading and fallback, the Figma references, the nav page authoring contract (brand / sections / tools, TCS Header alternative, linked / unlinked labels), the logo assets table (DAM paths, heights), the breakpoint behaviour, the light-hero and header Canvas description, the two-zone note, the accessibility list, the contracts table and the "Decisions (destination first)" table. Moved them into Overview, For Content Authors, Authorable Fields, Variations, Content and Asset Guidelines, Accessibility and For Developers.
- Corrected: the contracts table (the Conversation Canvas no longer relies on `#nav-sections`; it listens to `header:menu` and reads `header .nav-hamburger button[aria-expanded="true"]` at start; `--header-height` is used by `blocks/hero` and `templates/home`, not by `styles/styles.css` rules; `--nav-height` is also used by `blocks/hero` and `templates/home`); the Decisions row "no `tcs-header` block" (the TCS Header block exists and supplies the logos); the Canvas offset (safe area added at every width, not only mobile).
- Added: `inert` on `main` / `footer` while the menu is open, the `header:menu` event, `--header-reserved` / `utils/header-space.js` flow, desktop `nav[data-expanded="true"]` note, data layer, QA, troubleshooting, known limitations, change history, placeholders for the current states.
- Removed: nothing substantive; duplicate statements merged.

## Discrepancies

- Handover 6.1 body (6.1.1–6.1.17, variations 1–8, 6.1.12 best practices, and the 12 handover screenshots shown by the generated section) still describes the pre-2.2 header: desktop dropdowns, a text "TCS" brand, a Contact us tools button, a 4rem desktop row, an 8rem-wide logo, "only the first level gets dropdown behaviour". Code: desktop logo bar without navigation, menu levels of any depth below 1200px. Code is current; the handover chapter body and screenshots need correcting (6.1.18 is current).
- Handover 6.1.18 says "no separate `tcs-header` block"; `blocks/tcs-header` exists and is the nav page's logo source. Handover needs correcting.
- Handover 6.1.11 has two rules numbered 17; the second says the header height is reserved with `--nav-height` (4rem / 7.75rem). Code (2.15, 2.21): `--header-reserved` (the logo bar) or the height remembered per breakpoint (`utils/header-space.js`). Handover needs correcting.
- Handover 6.1.1 dependencies list 4 placeholders; the code uses 6 (`mainNavigation`, `openNavigation`, `closeNavigation`, `showSubmenu`, `menu`, `back`), as rule 16 says.

## Variations verified

- Desktop logo bar (header.css >= 1200px, header.js `isDesktop`)
- Tablet and mobile menu, one level at a time (header.js `toggleMenu`, `decorateDrop`, `buildLevel`)
- Section label plain text or link (header.js `decorateDrop`)
- Logos from a TCS Header block or positional sections (header.js `applyLogoBar`)
- Header Canvas (header.js canvas sections, header.css `.nav-canvas`)
- Desktop header over a light hero (styles/styles.css, header.css)
- Area-specific Navigation page (utils/inherited-metadata.js, models/_page.json `nav`)

## Accessibility documented

Banner landmark with named nav, buttons with aria-expanded / aria-controls, focus moves (Back, section button, menu button), Escape, focus-out closing, inert page behind the menu, hidden levels display none, placeholder names.

## Data layer documented

Component `header-1` (delayed trackBlocks), central `cmp:click` for logos / menu links (link) and menu / section / Back buttons (button); no data-cmp-* or own pushes; `header:menu` is a DOM event only.

## Personalization

None verified; area Navigation pages are content choices.

## Responsive / performance

Breakpoints 600px and 1200px (header.css); lazy phase, reserved space from the eager phase, default nav fetched at once in parallel with inheritance and placeholders, modules preloaded (CHROME_BLOCKS), ResizeObserver / matchMedia / keydown / focusout listeners.

## Placeholders

header-logo-bar-desktop.png, header-light-hero-desktop.png, header-menu-closed-tablet.png, header-menu-level-1-mobile.png, header-menu-level-2-mobile.png, header-linked-section-tablet.png, header-canvas-home-desktop.png, header-nav-page-authoring-desktop.png, header-area-navigation-tablet.png, header-authoring-step-1.png to header-authoring-step-5.png

## Open questions

- F-72: is the desktop header without navigation final, or should the menu be offered from 1200px (product owner / design)?
- F-77 / F-74 / F-81: are the SVG logos uploaded to `/content/dam/tcs-corp/header` and the nav pages authored with real content?
- Should the desktop nav landmark ("Main navigation" with only two logo links) be renamed or unlabelled (audit minor)?
- Should the outdated handover 6.1 screenshots be recaptured (they appear in the generated Visual Reference)?
