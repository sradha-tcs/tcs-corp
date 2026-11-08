# table-list

## Existing README changes

- No README existed. Created `blocks/table-list/README.md`.

## Discrepancies

- **Dialog tabs:** handover 6.18 (header paragraph: "4 tabs", the 6.18.17 example "Table List › Call to action") and the generated properties panel screenshot use Content / Call to action / Items / Additional. The model has Content / Items / Additional (handover 2.8). The code is current; the chapter body needs correcting.
- **Motion Type:** handover 6.18.8 / 6.18.10 / Business rule 16 / Issue 7 / Quick Reference / the motion screenshots describe a Motion Type field (none / fade / slide / reveal). They also describe an IntersectionObserver per item, 15 % visibility, 500ms, and the classes `motion-{value}`, `motion-ready` and `is-visible`. The field was removed in 2.27. Stored values are mapped by `addLegacyMotion` (`utils/motion.js`) to `motion-fade-in` / `motion-slide-up` / `motion-fade-up` with `motion-slow`, and played by `decorators/motion-decorator.js` on `.table-list-item` (staggered). The code is current; the chapter is outdated.
- **Dependencies:** handover lists `utils/viewport.js` (`onVisible`) and `prefersReducedMotion`. `table-list.js` no longer imports them; it imports `utils/motion.js` `addLegacyMotion`. The code is current.
- **Legacy header model:** handover 6.18 / 6.18.8 say the `table-list-header` ("Table List Header") model exists but can no longer be added. `_table-list.json` has no such definition or model (removed, audit D-A-16). The reader in `table-list.js` is kept. The code is current.
- **Maximum items in the editor:** handover rule 3 and audit D-A-14 (listed as Deferred) say extra items are removed. The code keeps them in Universal Editor, dimmed (`table-list-item-hidden`, opacity 0.45). The code is current; the register status should be updated.
- **Default title TwinX:** handover 6.18.15 / 6.18.16 / 6.18.17 say new items start with the title TwinX. The model has no default (D-A-15, 2.31 "Table List items without sample text"). The code is current.
- **Empty heading:** an item without a title now renders no heading outside the editor (D-A-28). The handover doesn't say this.
- **File size:** handover says `table-list.css` has 453 lines and the block model has "10 fields". The CSS now has 417 lines and the model has 9 block fields (Motion Type removed).
- **Rendered output:** handover 6.18.10 shows the classes `motion-fade motion-ready is-visible`. These are no longer produced.

## Variations verified

- Variation 1 industries, Variation 2 solutions, Variation 3 products (`VARIATIONS`, `VARIATION_DEFAULTS` in `table-list.js`; `_table-list.json`; `table-list.css`).
- Options: CTA style, Numbers, Item link, Trademark.
- Legacy Motion Type (`LEGACY_MOTIONS`) and legacy header row (`readBlock` / `buildHeader`).

## Accessibility documented

- `role="list"` / `listitem`, heading levels, the accessible names "Explore {title}" and "{text}: {title}", `aria-hidden` unlinked arrows and editor previews, the focus outline, description links above the overlay, reduced motion, and keys (Tab, Enter).

## Data layer documented

- Central tracking only: `tcs-corp/components/table-list` (Anchor ID or `table-list-{n}`), and `cmp:click` with `interaction: link`, no position and no `data-cmp-*` attributes. Tags / Web SDK are not configured; no consent.

## Personalization

- None. This is the standard statement.

## Responsive / performance

- Breakpoints are 600px and 1200px (`table-list.css`). There are no images. The only fetch is the placeholders sheet; there are no observers of its own (only the motion decorator's, when an animation is set).

## Placeholders

- table-list-universal-editor-desktop.png
- table-list-editor-extra-items-desktop.png
- table-list-focus-desktop.png
- table-list-solutions-mobile.png
- table-list-products-mobile.png
- table-list-authoring-step-1.png to table-list-authoring-step-5.png
- table-list-industries-tablet.png
- table-list-solutions-tablet.png
- table-list-products-tablet.png

## Open questions

- Handover Issue 6: does AEM ever deliver an item row with only two cells? The legacy-header rule would then swallow it. This needs a development team check against published content.
- The trademark approval process (brand / legal) is still "to be confirmed" in the handover.
- Item clicks carry no item id or position. Should items get `data-cmp-id` / `data-cmp-position` for reporting? This is a measurement-plan decision.
- No unit tests exist for this block.
- Product owner / version are not recorded.
