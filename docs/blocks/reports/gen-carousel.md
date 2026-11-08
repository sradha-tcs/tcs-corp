# gen-carousel

## Existing README changes

- No README existed.

## Discrepancies

- Handover 6.24.11 rule 19 "Region label: an existing aria-label, else Carousel (no authorable label field)": the model now has **Accessible name** (`carouselAriaLabel`), applied by `scripts.js` `buildCarouselSections` as the block's `aria-label`. Code is current; the handover (6.24.6, 6.24.11, properties-panel screenshot description "Style, Navigation, Autoplay interval") needs the field added.
- Handover 6.24.11 rule 21 and Issue 7 "Additional tab options of the section are not applied" (and F-22): since handover 2.30 the fields are `container*` and `applySectionBlockOptions` applies them to the synthetic block; Hide block hides the whole section (`styles/styles.css`). Code is current; rule 21 / Issue 7 / F-22 need correcting.
- Handover 6.24.1 "the `main` filter allows `section`, `gen-carousel` and `tabs`": `component-filters.json` `main` also has `columns-container`. Code is current.
- Handover 6.24.10 says the pause / play button reports `interaction` `pause` in both states; the code sets `data-cmp-interaction` to `pause` while playing and `play` while paused (`updateToggle`). Code is current.
- Handover Issue 4 "Enter a value between 2 and 30": matches the model (`min: 2`, `max: 30`); the code enforces only the minimum (2 s) and the default (5 s).

## Variations verified

- Navigation Manual (`manual`, default), Auto (`auto`), Manual and Auto (`manual-auto`) in `_gen-carousel.json`, read by `readNavigation`; single slide (fewer than two children, `gen-carousel.js`); Hero / Teaser slides (filter `gen-carousel`).

## Accessibility documented

- WAI-ARIA carousel: region / group role descriptions and labels from placeholders, Accessible name, pause control, controls-only arrow keys, `inert` hidden slides, polite live region when not playing, reduced motion, 1.5rem dot hit area.

## Data layer documented

- `tcs-corp/components/gen-carousel`; `cmp:show` per slide change with `position` (slide `data-cmp-id`), `data-cmp-interaction` `previous`, `next`, `pause` / `play`; dots as `button`.

## Personalization

- None verified (standard statement).

## Responsive / performance

- Only the 900px breakpoint (controls spacing) and a reduced-motion media query in `gen-carousel.css`; no requests besides placeholders; two IntersectionObservers per carousel, one autoplay timeout.

## Placeholders

- gen-carousel-added-editor-desktop.png, gen-carousel-controls-focus-desktop.png, gen-carousel-paused-desktop.png, gen-carousel-swipe-mobile.png, gen-carousel-editor-selection-desktop.png, gen-carousel-authoring-step-1.png … gen-carousel-authoring-step-4.png, gen-carousel-manual-mobile.png, gen-carousel-auto-tablet.png (plus the generated dialog placeholders).

## Open questions

- Analytics definition of a slide view (automatic changes push `cmp:show`), analytics owner to be confirmed (handover Issue 8).
- Owner and version of the block.
- `tools/docs/blocks.json` lists `variations` "Navigation (dots, arrows), automatic interval" — consistent; no change needed.
