# anchor-list

## Existing README changes

- No README existed; `blocks/anchor-list/README.md` written from `anchor-list.js`, `anchor-list.css`, `_anchor-list.json`, `utils/cells.js`, `utils/properties.js`, `decorators/editor-item-decorator.js`, `decorators/data-layer-decorator.js`, `scripts/scripts.js` (section Anchor name ids), `blocks/header/header.css`, `blocks/tabs/tabs.js` (`tabs:reveal`), the block library drafts, `test/items/item-rows.test.mjs`, `test/motion/motion.test.mjs`, the audits and handover 6.19.

## Discrepancies

- Handover 6.19 (intro, 6.19.2 to 6.19.5 field entry tables, 6.19.8 "no child items", 6.19.9 input HTML, 6.19.16, 6.19.17): links authored in the Content tab Links multifield. Code / model: Anchor Link items (`anchor-list-item`, added with Add) are the current way; the multifield is labelled "authored before" and still read first. Only the 2.10 update note at 6.19.6 says so. Handover body needs updating to the items.
- Handover 6.19.2, 6.19.3, 6.19.10 rule 6 / 13, 6.19.13 Issue 2, common mistakes ("On a 1024 px tablet the list pins at the very top"): the site header is fixed below 900px. Code: `blocks/header/header.css` keeps `header .nav-wrapper` `position: fixed` up to 1199px (relative from 1200px); the block reads the computed position, so the list pins below the header up to 1199px and at the top from 1200px. Handover needs correcting.
- Handover 6.19.3 troubleshooting, 6.19.11 rule 4, 6.19.15: a duplicate section Anchor name gives the second section no id. Code: `scripts/scripts.js` uses `availableId`, so the second gets `name-2`. Handover needs correcting.
- Handover 6.19.6 field details / Issue 6: an empty Link Title shows the Anchor Name as text. True only for the legacy multifield; an Anchor Link item's Link Title is required and an item without it isn't rendered (editor placeholder). Handover needs the distinction.
- Handover 6.19 intro / 6.19.1 dependencies / 6.19.8: 181 lines; dependencies without `utils/cells.js` and `decorators/editor-item-decorator.js`; "allowed in every section". Code: 212 lines; both imported; filters `section`, `columns-container`, `tabs`. Handover needs correcting.
- Handover doesn't mention that a target inside a hidden tab gets its tab opened (`tabs:reveal`, re-audit R-C-3). README documents the code; handover could add it.
- Model description of Anchor Name doesn't mention the fallback to the normalized Link Title (audit group C: "undocumented"); README documents the code behaviour.

## Variations verified

- Default (in place) and Sticky (`sticky` boolean in `_anchor-list.json`, class `sticky`, `pinWhenScrolled` in `anchor-list.js`).

## Accessibility documented

- `nav` with `aria-label` from `onThisPage`, `aria-current="location"`, focus moved to the target (`tabindex="-1"`), visible focus outline, instant scrolling with reduced motion, empty-nav state, keys Tab / Enter.

## Data layer documented

- Component state `tcs-corp/components/anchor-list` (no `dc:title`); `cmp:click` per link (`interaction` `link`, `dc:title`, `xdm:linkURL`, `xdm:linkType` `other`, `breakpoint`) from the central decorator; scroll-driven highlight not tracked; Tags / Web SDK not configured, no consent.

## Personalization

- None verified (standard statement).

## Responsive / performance

- Block breakpoint 900px (link padding 1.5rem → 2.5rem); header fixed below 1200px (`blocks/header/header.css`) decides where the sticky list pins; rAF-throttled passive listeners and ResizeObserver / MutationObserver; no layout shift when pinning (handover 2.13: 0.35 → 0.006).

## Placeholders

- anchor-list-editor-item-desktop.png
- anchor-list-focus-desktop.png
- anchor-list-sticky-mobile.png
- anchor-list-authoring-step-1.png
- anchor-list-authoring-step-2.png
- anchor-list-authoring-step-3.png
- anchor-list-authoring-step-4.png
- anchor-list-default-tablet.png
- anchor-list-sticky-desktop.png

## Open questions

- A sticky list keeps `--color-bg-default` while a Dark / Dark green section's theme contract turns the link tokens light: confirm contrast (or disallow Sticky in dark sections) with design.
- WCAG 2.2 "Focus Not Obscured" when tabbing through content under the pinned list (handover: "[To be confirmed … owner: development team]").
- Should the Anchor Name description mention the title fallback and block Anchor IDs (audit group C recommendation)?
- Removal of the legacy Links multifield once no production content uses it (audit: "Deprecate").
- Owner, version and date: not recorded.
