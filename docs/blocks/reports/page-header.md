# page-header

## Existing README changes

- No README existed.

## Discrepancies

- Handover 6.4.8 "Component Type: Block (key-value) with a CTA List composite multifield" and the 6.4.9 input example: CTAs are now CTA items (`page-header-cta`, Add), the multifield is still read first (handover 2.10, F-87). Code is current; the chapter body needs correcting.
- Handover 6.4.8 Accessibility "CTA new windows not announced": `page-header.js` passes the `opensInNewTab` placeholder as `newTabHint` to `decorateButton` for every CTA. Code is current.
- Handover 6.4.11 rule 6 and 6.4.12 "the featured image (decorative) … has no alt text": the code uses the `image-alt` metadata as the alt (`metadata.imageAlt`). Code is current.
- Handover 6.4.1 / F-07: page tags read from `article:tag` only; `utils/metadata.js` `getPageTags` also reads `cq-tags` (and a `tags` meta as fallback). Code is current; F-07 may be closable (verify on a published tagged page).
- Handover 6.4.11 rule 16 says "anything else tertiary": matches the code; new CTA items store Primary Button by default (definition template `linkStyle: primary`), the model's Text link value is `tertiary`.
- Handover F-14 (non-site-media featured image lazy, eager skipped) is still true in the code (`buildImage` returns a plain lazy `img`, and `picture.querySelector('img')` is null for it). Listed as a known limitation.

## Variations verified

- Layout Default (from Page Type: `landing` / `listing` → Landing, else Article), Landing (with / without featured image), Secondary, Article, Display (`_page-header.json` Layout select, `LAYOUTS` in `page-header.js`); automatic header of the Article / Blog / Press Release templates (`decorators/template-decorator.js`); author from Authors sheet / from `author` metadata; CTA Link Style Primary / Secondary / Text link and Link Type.

## Accessibility documented

- Single H1 from the page Title, `<time datetime>`, named icon buttons, `role="status"` share message, new-tab hints (CTAs and LinkedIn), image-alt / decorative author image; key table.

## Data layer documented

- Component `tcs-corp/components/page-header`; central `cmp:click` for CTAs and LinkedIn; `data-cmp-interaction` `listen`, `download`, `share` on the actions (article-meta decorator).

## Personalization

- None verified (standard statement).

## Responsive / performance

- Only the 900px breakpoint in `page-header.css`; rendering waits for placeholders, taxonomy (with tags) and Authors sheet (with author-id) in parallel; Landing site-media image eager / high priority, other URLs lazy (F-14).

## Placeholders

- page-header-added-editor-desktop.png, page-header-authoring-step-1.png … page-header-authoring-step-4.png, page-header-cta-editor-placeholder-desktop.png, page-header-share-copied-desktop.png, page-header-actions-focus-desktop.png, page-header-empty-metadata-desktop.png, page-header-secondary-mobile.png, page-header-display-mobile.png, page-header-landing-tablet.png, page-header-article-no-author-desktop.png (plus the generated dialog placeholders).

## Open questions

- Whether F-07 (cq-tags) can be closed now that `getPageTags` reads `cq-tags`.
- Agreed list of page types (F-12 / O-11) so Default can resolve to Landing from page properties.
- Owner and version of the block.
