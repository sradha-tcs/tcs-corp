# list
## Existing README changes
- Kept (moved into the new sections): source table, Fixed list / item precedence, Card style and Card colour precedence table, List Item Display toggles notes, data flow (now under For Developers, extended with renderWhenLoaded, getPagesAt, fallback), card model (with `display`), page metadata contract, query index contract (condensed), sorting / deduplication, responsive scrolling, Figma variation table (under Variations), accessibility, analytics, empty states / failures (spread over Variations, Troubleshooting, For Developers), placeholders (Site Administrators table), backward compatibility, extension points, known limitations, tests, Animation.
- Corrected: authoring of a Fixed list now via List Items (the model labels `pageItems` "Pages (authored before List Items)"); Component ID, Reduced motion support and Allow touch swipe are no longer dialog fields (still read from content authored before: `componentId`, `touchSwipe`; `reducedMotion` ignored, reduced motion always honoured); component id falls back to the Anchor ID before `list-N` (`cardListId`); Previous / Next use `aria-disabled` (not `disabled`) so focus stays; tags also read from `cq-tags`; the dialog has three tabs per component (List: Content / Display / Additional; List Item: Link / Content / Display).
- Removed: the hand-written field matrix (replaced by the generated fields section), the duplicate Files table (generated files section), the Figma-to-CSS token table, the sample index row JSON, the "Block audit (19 October 2026)" section (its facts are folded into the notes).
- Added: all sections of the template, placeholders, QA table, troubleshooting, mermaid architecture diagram, change history from handover revisions 2.7, 2.8, 2.9, 2.12, 2.13, 2.16, 2.18, 2.34.

## Discrepancies
- Handover 6.16 / properties panel screenshot shows the dialog tabs Content, Source, Cards, Layout, Scroll, Advanced, Additional; the model has Content / Display / Additional (handover 2.8). Code is current; screenshot needs recapturing.
- Old README field matrix listed `componentId`, `reducedMotion`, `touchSwipe` as dialog fields and `pageItems` as the way to author a Fixed list; the model no longer has the first three and labels `pageItems` legacy. Code / model current.
- Old README said Previous / Next get `disabled` at the ends; `decorators/scroller-decorator.js` uses `aria-disabled`. Code current.
- Handover Part 16 lists F-07 (tags published as `cq-tags`, not read) as open; `utils/query-index.js` `tagsOf` reads `cqTags` and `helix-query.yaml` indexes it (test/list/query-index-tags.test.mjs). The finding's status in the handover may need updating.
- Handover 6.16.1 placeholders list omits `listItemEditorHint` and `listItemSourceHint`, which list.js uses.

## Variations verified
- Image, Panel, Report, Statistic, Mixed (`cardStyle`, `_list.json` / `models/_card-list.json`, `kindOf`), Card colours (`cardTheme`, `CARD_THEMES`), First card as feature (`featureFirst`), Rows of links (`displayAsTeaser` off), Grid / horizontal scroll per breakpoint (`{bp}Mode`), Style options (`stat-compact`, `dividers`, `header-center`), fallback items (`emptyBehavior`), Figma variations 1–14 (configurations from the old README), legacy list (`list-legacy`, list.js).

## Accessibility documented
- Labelled region with `<ul>`/`<li>`, `<article>` cards with headings one level below, one link per card, visually hidden title (Hide Title), new-tab text, focusable scroller only while scrolling, arrow / Home / End, aria-disabled buttons, reduced motion.

## Data layer documented
- `trackCardList` state (`tcs-corp/components/list`, `xdm:listSource`, `xdm:variant`, items with `xdm:position`, `xdm:linkURL`, `repo:modifyDate`), `cmp:click` via data-layer decorator from `data-cmp-id` / `data-cmp-position` / `data-cmp-interaction` (`card`, `cta`, `previous`, `next`), `data-analytics="off"` when Analytics off; Tags / Web SDK not configured.

## Personalization
- None verified; standard statement.

## Responsive / performance
- Breakpoints 600 / 900 (type only) / 1200px from styles/card-list.css; CSS-only layout via classes and custom properties; data prefetched at the lazy phase (`prefetchData`), skeleton after 150ms, lazy images by default, index in 500-row pages, one ResizeObserver.

## Placeholders
- list-item-display-desktop.png, list-editor-placeholders-desktop.png, list-skeleton-loading-desktop.png, list-scroller-focus-desktop.png, list-editor-setup-hint-desktop.png, list-authoring-step-1.png to list-authoring-step-5.png, list-image-mobile.png, list-stat-tablet.png, list-feature-mobile.png, list-scroll-tablet.png.

## Open questions
- Confirm with the product owner whether F-07 can be closed (cq-tags now read) and whether F-10 (live index columns) is resolved after the reindexes of packages 1.0.10–1.0.13.
- Recapture the Universal Editor properties panel screenshot with the current three tabs.
- Owner / version of the block are not recorded.
