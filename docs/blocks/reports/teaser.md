# teaser

## Existing README changes

- No README existed; `blocks/teaser/README.md` created.

## Discrepancies

- **Personalization marker:** handover 6.11 (Variation 66, 6.11.6 Style tab, 6.11.8, 6.11.10, Business rule 24) describes a Personalization field adding class `personalization` and `data-personalization="true"`. The code and model have neither; the field was removed in handover 2.27 (revision table: "Teaser personalization" removed). The code is current, and the chapter body needs correcting.
- **Dialog tabs:** handover 6.11.6 and the properties panel screenshot use six tabs (Content, Image, Style, Links, Stats, Additional). The model has Content / Style / Additional (handover 2.8, F-84). The code is current; the chapter's tab names are outdated.
- **Allowed parents:** handover 6.11.1 / 6.11.8 say Section and Gen Carousel. `component-filters.json` also offers the Teaser in `columns-container` and `tabs`. The code is current.
- **Links container classes:** handover 6.11.10 / Business rule 21 say the links get `teaser-links-{default|list|primary|secondary|mixed}`. `teaser.js` adds only `teaser-links`. The code is current.
- **Image position Right breakpoint:** handover Business rule 17 says "from 900 px". The CSS applies Left / Right side by side from 600px (as the 2.32 note says). Rule 17 needs correcting.
- **Image position Top / Bottom:** the classes `image-top` / `image-bottom` exist in code; handover 6.11.10 lists only `image-right`.
- **List arrow None:** handover 6.11.6 lists Options Right, Down right. The model also has None (`arrow-none`, handover 2.34).
- **New-tab announcement:** handover 6.11.8 says "no automatic new-window hint", and F-17 (Teaser part) is listed as open. The code announces new-window links (`announceNewTab` for List links, `decorateButton` `newTabHint` for buttons, placeholder `opensInNewTab`). F-17's Teaser part looks resolved in code; the register needs updating.
- **Title size:** Variations 30–34 and the 2.31 screenshots describe Title size. It was removed in 2.32, as the chapter's top note says. Variations 18–21 describe the former BG Color padding (also covered by the note).
- **Dependencies:** handover 6.11.1 lists `decorators/link-decorator.js` `setLinkTarget` only; the code also imports `announceNewTab`, and `decorators/editor-item-decorator.js`, `utils/cells.js` and `readLinkRows`, which the chapter's dependency table omits (item children, 2.10).

## Variations verified

- Layouts: Image & Text (default), Image & Text without image (centred), Text split (`no-image`), Background image (`background`), Card (`card`). Defined in `teaser.js` `LAYOUTS`, `_teaser.json` `classes`, and `teaser.css`.
- Image type Lotto (`imageFormat` `lottie`; `buildMedia`, `decorators/animation-decorator.js`).
- BG Color Default / Grey / Dark / Dark green (`BG_COLORS`, `teaser.css`).
- Link styles Text link / List / Primary / Secondary, List arrow Right / Down right / None, Buttons side by side (`renderLinks`, `buildLinks`, `teaser.css`).
- Article meta (date, reading time, listen / download / share, author, tags) and View All (`buildInfo`, `buildMeta`, `buildAuthor`, `decorators/article-meta-decorator.js`).
- Stats (`decorators/stats-decorator.js`).
- Style options (`OPTIONS` in `teaser.js`): text alignment, vertical alignment, title weight, description size, eyebrow style, top spacing, image ratio, image corners, image position (mobile).

## Accessibility documented

- Semantic heading (Title Type), visually hidden title, `<time>`, `<dl>` stats, `<ul>` tags and List links, named icon buttons, `role="status"` for "Link copied", Lottie pause / play and reduced motion, new-tab announcement, dark-theme contrast, the F-49 primary-button limitation, and a key table (Tab, Enter, Space).

## Data layer documented

- The component entry (`tcs-corp/components/teaser`, Anchor ID or `teaser-{n}`, `dc:title`), and `cmp:click` with `interaction` `link`, `listen`, `download`, `share` and `animation` (from `data-cmp-interaction` in the article meta and animation decorators). No positions. Tags / Web SDK not configured; no consent.

## Personalization

- No verified personalization behavior; the former marker field was removed in 2.27.

## Responsive / performance

- Breakpoints 600px (Image & Text side by side) and 900px (Text split grid, sizes, Background / Card heights, title tokens). Placeholders are always awaited, and the taxonomy only with tags; Lottie loads on visibility in idle time; F-94 (Background animation and LCP).

## Placeholders

- teaser-image-top-desktop.png
- teaser-image-bottom-mobile.png
- teaser-buttons-side-by-side-desktop.png
- teaser-list-arrow-none-desktop.png
- teaser-text-split-tablet.png
- teaser-card-mobile.png
- teaser-focus-desktop.png
- teaser-share-copied-desktop.png
- teaser-item-placeholder-editor-desktop.png
- teaser-lottie-failed-desktop.png
- teaser-authoring-step-1.png to teaser-authoring-step-6.png
- teaser-image-text-tablet.png
- teaser-image-text-no-image-mobile.png
- teaser-text-split-mobile.png
- teaser-background-image-mobile.png
- teaser-card-tablet.png
- teaser-lotto-mobile.png
- teaser-bg-dark-mobile.png
- teaser-links-mixed-mobile.png
- teaser-article-meta-mobile.png
- teaser-stats-mobile.png

## Open questions

- F-49 (primary button on the Teaser's own Dark / Dark green) and F-50 (the status anchored right) are still present in `teaser.css`. Confirm with design / development whether they are planned.
- F-17's Teaser part looks resolved in code (new-tab hint): the register should be updated.
- F-18 (options without effect per layout) still applies (Text alignment Center in Text split, Top spacing on Background image / Card, Original on animations). Should conditions hide them?
- View All has no Link Type (always the same window). Product owner to confirm this is intended.
- The owner, version and date are not recorded (the handover says "To be confirmed: product owner").
