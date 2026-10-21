# filter-list

## Existing README changes

- No README existed; `blocks/filter-list/README.md` written from `filter-list.js`, `filter-list.css`, `_filter-list.json`, `utils/query-index.js`, `utils/taxonomy.js`, `decorators/masonry-decorator.js`, `decorators/skeleton-decorator.js`, `decorators/responsive-image-decorator.js`, `decorators/data-layer-decorator.js`, `utils/card-list-config.js` (`contentTypeLabel`), `utils/site.js` (`pageLink`), `utils/environment.js`, `scripts/scripts.js` (`prefetchData`), `helix-query.yaml`, the block library drafts (`drafts/en/block-library/filter-list/*.plain.html`), `test/items/item-rows.test.mjs`, the audits and handover 6.17.

## Discrepancies

- Handover 6.17 intro and the properties-panel screenshot description: 7 tabs (Content, Source, Filters, Advanced, Cards, Mapping, Additional), JS 595 lines. Model: 3 tabs (Content, Cards, Additional) since handover 2.8; JS 708 lines. Troubleshooting still refers to "Filters and Advanced tabs" and the "Mapping tab". Handover body and that screenshot need updating.
- Handover 6.17.1 Supported Content Types: Page types Article, Blog, Report, Case Study, News, Event; Content types incl. Podcast, Video. Model: Page types Article, Blog, Press release; Content types Article, Blog, Insights, Case study, Whitepaper, Report, News, Event, Press release (audit D-A-6 corrected). Handover needs correcting.
- Handover 6.17.8: "Component Type: Block (no child items; two composite multifields)"; dependencies without `skeleton-decorator`, `editor-item-decorator`, `utils/cells.js`, `utils/viewport.js`, `utils/card-list-config.js`. Code: three item models; all imported. Handover needs correcting.
- Handover 6.17.11 rule 28 / Issue 6: no image column means no media. Code: falls back to the page's own index `image` (R-L-2, handover 2.30). The rule needs correcting.
- Handover 6.17.11 rule 27: editor hint only in Universal Editor edit mode. Code: `(isEditing() || isAuthor()) && !pages.length`, i.e. also AEM author page view (handover 2.12). The rule needs correcting.
- Handover featured rule names "featured=true" / "priority<=3" (variation headings 13, 14). Model labels "Marked as featured (featured metadata)" / "Priority 1 to 3 (priority metadata)" (D-A-18). README uses the model labels.
- Handover 6.17.8 Performance: "decoration waits for four fetches … the block appears after them"; "avoid the first section". Code: `renderWhenLoaded` shows a skeleton after 150ms so the section isn't held back (2.18) and `prefetchData` starts the index / taxonomy in the lazy phase (2.13). Handover text needs updating.
- Handover 6.17.11 rule 30: eyebrow shown as the column value. Code: a `content-type` eyebrow is shown with its taxonomy label (`contentTypeLabel`, D-A-7). Rule needs updating.

## Variations verified

- Layout: Masonry, Grid, List (`layout` select, `LAYOUTS`); Card style: Default, Compact, Featured, Mixed with report and dark kinds (`cardStyle`, `STYLES`, `standardCard`); Hero spotlight rules Latest / Featured / Manual (`HERO_RULES`, `arrange`); Featured spotlights rules Marked as featured / Priority 1 to 3 / Manual (`FEATURED_RULES`); Datasource Query Index / Manual List (`source`, `candidatesOf`); Filter pills single / multi select (`multiSelect`); Advanced filter AND / OR (`filterLogic`); Sort order Latest First / Featured First / Priority / Alphabetical (`SORTS`, `sorter`).

## Accessibility documented

- Toggle-button pills (`aria-pressed`, labelled group, `aria-controls`), filter button (`aria-expanded`, selected-count name), labelled panel region with fieldsets, Escape / focus management, live result count set after the first count (D-A-25), focus to the first new card after Load more, `aria-hidden` skeleton with `aria-busy`, decorative images, key table.

## Data layer documented

- Component `tcs-corp/components/filter-list` (tracked after the skeleton, `data-analytics="pending"`); `cmp:click` `filter` (value tag ID / `all`), `cmp:change` `filter-option` (value, checked), `cmp:click` `button` (toggle, Clear all, Reset), `cmp:click` `load-more`, `cmp:click` `link` for cards; no positions or card ids; Tags / Web SDK not configured, no consent.

## Personalization

- None verified (standard statement).

## Responsive / performance

- Breakpoints 600 / 900 / 1200px (columns 1 / 2 / 3 / 4, Featured 1 / 2 / 2 / 3, List 1); whole index fetched in 500-row pages and filtered in the browser, prefetched in the lazy phase; skeleton after 150ms (min 250ms); hero image eager, others lazy (600 / 750px, spotlights 1600 / 750px); masonry ResizeObserver / MutationObserver.

## Placeholders

- filter-list-loading-desktop.png
- filter-list-empty-desktop.png
- filter-list-editor-items-desktop.png
- filter-list-advanced-mobile.png
- filter-list-load-more-focus-desktop.png
- filter-list-authoring-step-1.png
- filter-list-authoring-step-2.png
- filter-list-authoring-step-3.png
- filter-list-authoring-step-4.png
- filter-list-layout-masonry-tablet.png
- filter-list-layout-grid-mobile.png
- filter-list-layout-list-mobile.png
- filter-list-card-default-mobile.png
- filter-list-card-compact-tablet.png
- filter-list-card-featured-mobile.png
- filter-list-card-mixed-mobile.png
- filter-list-hero-mobile.png
- filter-list-featured-tablet.png
- filter-list-source-query-index-mobile.png
- filter-list-source-manual-mobile.png
- filter-list-pills-mobile.png
- filter-list-advanced-tablet.png
- filter-list-sort-alphabetical-mobile.png

## Open questions

- Product decision on `hide-in-nav` and redirects (audit D-A-29, deferred): should the Filter List follow the List block?
- Keep the eight free-text card mapping fields authorable (audit D-A-18 kept them) or move them out of the dialog?
- Removal of the legacy multifields (`pageItems`, `featuredItems`, `primaryTags`, `advancedCategories`) after a production content check (D-A-17).
- Card URLs and images come from index columns without scheme validation; confirm the mapping should stay limited to trusted columns.
- Contrast of report and dark Mixed cards with real content (handover guidance; not measured here).
- Owner, version and date: not recorded.
