# quote

## Existing README changes

- No README existed; `blocks/quote/README.md` created.

## Discrepancies

- **Card / figure structure:** handover 6.12.10 (Output Model) says `figure.quote-card` contains `div.quote-card-text` with the blockquote and figcaption. The code renders `div.quote-card` > `figure.quote-card-text` > `blockquote.quote-text` + `figcaption.quote-author`, so the figcaption is now a direct child of the figure. F-24 ("caption inside a div within the figure", listed as open, and line "F-24, open" in 6.12) looks resolved in code; the register and chapter need updating.
- **Allowed parents:** handover 6.12.1 / 6.12.8 say "allowed in every section (section filter)". `component-filters.json` also offers the Quote in `columns-container` and `tabs`. The code is current.
- **Style field:** handover 6.12.8 lists "Style: Default only". The field was removed in 2.27 and isn't in the model.

## Variations verified

- Default (image right, image top on mobile), Image Left (desktop), Image Bottom (mobile and tablet), Grey background, Text only. Defined in `quote.js` (`IMAGE_POSITIONS`, `IMAGE_POSITIONS_MOBILE`, `BG_COLORS`, `quote-has-media`), `_quote.json` and `quote.css`.

## Accessibility documented

- figure / blockquote / figcaption, quote marks as CSS content with empty alternative text, Title Type heading level, alt text or decorative image, DOM order (card before image), and reduced motion for the Additional tab animations.

## Data layer documented

- The component entry (`tcs-corp/components/quote`, Anchor ID or `quote-{n}`, `dc:title`), and `cmp:click` (`link`) for links in the rich text, captured centrally. The block sets no `data-cmp-*` attributes.

## Personalization

- No verified personalization behavior.

## Responsive / performance

- One breakpoint, 900px (overlap grid, crops 4:5 / 622:869, Grey padding, quote mark size). Synchronous decoration with no requests; first image eager only in the first section.

## Placeholders

- quote-image-left-tablet.png
- quote-grey-background-mobile.png
- quote-text-only-mobile.png
- quote-empty-editor-desktop.png
- quote-authoring-step-1.png to quote-authoring-step-5.png
- quote-default-tablet.png
- quote-image-left-mobile.png
- quote-image-bottom-tablet.png
- quote-grey-background-tablet.png
- quote-text-only-tablet.png

## Open questions

- Contrast inside dark Sections: the Quote paints its own white background (`--color-bg-default`) and card, but the dark theme contract in `styles/styles.css` turns `--color-text-default` and `--color-text-brand` light for everything inside, and its Grey reset lists only `.teaser` and `.block.columns-container`. A Quote in a Dark / Dark green Section (or Columns Container) may get light text on white or grey. Not verified in a browser; added as QUOTE-QA-13. Design / development should check it.
- Quote / Testimonial Grey add their own padding (2.5rem / 1.5rem, 7.5rem / 5rem), unlike the Teaser's BG Color since 2.32. Is that intended?
- The owner, version and date are not recorded.
