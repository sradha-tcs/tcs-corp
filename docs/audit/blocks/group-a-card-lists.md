# Block audit, group A: Cards / Card, List / List Item, Filter List / Filter Tag / Filter Category / Filter Page, Table List / Table List Item

Reviewer: group A. Repository read-only; evidence scripts and outputs in `/tmp/audit/a-checks*.mjs`, `/tmp/audit/a-checks.json`, screenshots `/tmp/audit/a-focus-*.png`.
Runtime checks were run on the local preview (`http://localhost:3000/drafts/en/block-library/...`) at 1440 / 1024 / 390 with Playwright.

Shared code reviewed: `models/_card-list.json`, `utils/card-list-config.js`, `decorators/card-list-decorator.js`, `styles/card-list.css`, `decorators/scroller-decorator.js`, `utils/query-index.js`, `decorators/skeleton-decorator.js`, `decorators/data-layer-decorator.js` (click capture), `decorators/motion-decorator.js` (CONTENT_TARGETS).

Legend: **verified** = reproduced at runtime or proven by reading the code path end to end; **suspected** = plausible from code, not reproduced.

---

## 0. Shared tables (referenced by the blocks below)

### 0.1 Additional tab (`classes_*`), identical in Cards, List, Filter List, Table List

All are `classes_*` fields, delivered as block classes (never rows), so they never shift rows.

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Anchor ID (`classes_anchor`) | text, regExp `^anchor-…` | `decorators/block-options-decorator.js:19-26` makes it the block id (de-duplicated). Cards/List: overridden by Component ID when set (`card-list-decorator.js:477`, `cards.js:145`, `list.js:178`) | Two id fields on Cards/List (see D-A-12) | Retain |
| Hide block (`classes_hideblock`) | boolean false | `styles/styles.css` hides `.hideblock` (dimmed in UE) | none | Retain |
| Animation Type (`classes_animation`) | None + 10 effects | `utils/motion.js:69` + `decorators/motion-decorator.js:30-41`: Cards/List animate header, feature, empty and each `.list-item` staggered; Filter List and Table List are not in `CONTENT_TARGETS`, so the whole block animates (released after the skeleton, `skeleton-decorator.js:77`) | Table List also has its own Motion Type (see Table List C) | Retain |
| Motion Speed (`classes_animationspeed`) | Medium / Fast / Slow; condition animation set | `utils/motion.js:34` | none | Retain |
| Animation Trigger (`classes_animationtrigger`) | On scroll / On page load; condition animation set | `utils/motion.js:46` | none | Retain |
| Padding / Margin L R T B (`classes_padding*`, `classes_margin*`) | Default + 14 `--space-*` tokens each | `styles/styles.css` spacing classes | none; only `pt-2000` used (2 Lists) | Retain |

### 0.2 Shared card-list fields (`models/_card-list.json`), used by Cards and List

Normalised by `utils/card-list-config.js normalizePresentation()` (lines 165-218; keys lower-cased, dynamic `${bp}mode` etc., so the inventory's `readByCode=false` for the 21 per-breakpoint fields is a false negative). Rendered by `decorators/card-list-decorator.js` and `styles/card-list.css`.

| Field (name) | Current values / default | Functional mapping (file:line, effect) | Issue | Decision |
|---|---|---|---|---|
| Title (`title`) | text | `card-list-decorator.js:54` `buildHeading` (collapsed with `titleType`) | none | Retain |
| Heading type (`titleType`) | h2-h6, h2 | collapsed into the title cell as `<hN>`; `heading-decorator.js:18-29` reads the authored tag; card titles one level below (`card-list-decorator.js:84-87`) | none | Retain |
| Description (`description`) | richtext | `card-list-decorator.js:62-66` | none | Retain |
| CTA link (`link`) | aem-content | `card-list-decorator.js:69-79` | none | Retain |
| CTA text (`linkText`) | text | collapsed into the link text; `textOf(props.linktext)` (l.71) is always empty on delivered content, the link text is used | harmless dead read | Retain |
| CTA style (`linkType`) | Text link / Primary / Secondary, '' | **collapsed into `<strong>`/`<em>` around the link; code reads the non-existent row `props.linktype` (l.73) and always renders `button tertiary`** | **D-A-1** (verified) | Correct |
| Accessible list label (`listLabel`) | text | `card-list-decorator.js:340-341` aria-label of the region; ignored by AT when there is a title (aria-labelledby wins) | description is accurate ("when there is no title") | Retain |
| Component ID (`componentId`) | text, regExp | `card-list-config.js:182`, `cardListId` l.476-482 sets block id and card id prefix; overrides Anchor ID | duplicate of Anchor ID, 0 uses (D-A-12) | Deprecate (keep reading) |
| Display as teaser (`displayAsTeaser`) | boolean true | l.308 `display-teaser` / `links`; l.349-351 card vs row | label "teaser" clashes with the Teaser block | Rename "Show as cards (off: list of links)" |
| Card style (`cardStyle`) | image / panel / report / stat / mixed, image; cond. teaser | `kindOf` `card-list-config.js:135-141`; class `style-*` | Cards: description says "Mixed (by page) ... page's card-style" though Cards has no pages (D-A-19) | Retain (Cards: reword) |
| Card colour (`cardTheme`) | '' + 8 themes; cond. teaser | `themeOf` l.154-156; `theme-*` class `card-list-decorator.js:162-163`; CSS `card-list.css:570-649` | **no effect on Image cards; Dark/Navy/Brand make the CTA near-white on white; Image background collapses image cards** (D-A-3). Dark = Panel default, Grey = Statistic default, Grey gradient = Report default (identical render for those styles) | Correct (scope to panel/report/stat) |
| Image ratio (`imageRatio`) | 16-9 / 1-1 / 4-3 / 3-2 | class `ratio-*`, `card-list.css:280-290` (image cards and skeleton) | none | Retain |
| Panel height (`panelHeight`) | portrait / compact / auto | class `panel-*`, `card-list.css:411-417`; `auto` has no rule = content height (intended) | none | Retain |
| First card as feature (`featureFirst`) | boolean false; cond. teaser | `card-list-decorator.js:329-334`, `renderFeature` l.255-277 | feature card has no data-cmp-id (D-A-24) | Retain |
| Link items (`linkItems`) | boolean true | l.167, 234, 261 | none | Retain |
| Open links in a new tab (`openInNewTab`) | boolean false | default of the items; `cards-data.js:63`, `list-data.js:224`; `announceNewTab` l.94-97 | 0 uses | Retain |
| Show image (`showImage`) | boolean true | `mediaOf` l.140; ignored by the feature card (intended) | none | Retain |
| Show eyebrow (`showEyebrow`) | boolean true | l.166, 239 | report cards still show content type (l.202) | Retain (clarify description) |
| Show tags (`showTags`) | boolean true | l.165; image cards show tags only when there is no eyebrow (l.193) | not stated in the dialog | Retain (clarify) |
| Show description (`showDescription`) | boolean true | l.183-184 (image cards and rows only) | described correctly | Retain |
| Show date (`showDate`) | boolean true | l.185, 244 | none | Retain |
| Date format (`dateFormat`) | 6 formats; cond. showDate | `formatDate` in `cards-data.js:54`, `list-data.js:211` | none | Retain |
| Show call to action (`showCta`) | boolean true | l.170-171 (default labels panel Explore, report Download; image/stat only with an item CTA label) | none | Retain |
| Image loading (`imageLoading`) | lazy / eager | l.147-149; eager sets `fetchPriority=high` on **every** card image | D-A-20 | Correct |
| Desktop / Tablet / Mobile display (`desktopMode`, `tabletMode`, `mobileMode`) | grid / horizontal-scroll, grid | `normalizePresentation` l.172 -> classes `${bp}-grid|scroll` (`card-list-decorator.js:286`), CSS l.150-164, 803-831, 908-936. **Verified** at 1440/1024/390: each breakpoint switches independently (a-checks.json `layout-*`) | none | Retain |
| … Columns (`desktopColumns` 4, `tabletColumns` 4, `mobileColumns` 1) | number 1-6; cond. mode grid | `--list-columns-${bp}` l.289, CSS l.21/761/885 | ignored for link rows (always 1 column, CSS l.146-148), not expressed by the condition | Retain |
| … Gap (`desktopGap` 24, `tabletGap` 24, `mobileGap` 16) | number px 0-120 | `--list-gap-${bp}` in rem l.290; grid and scroll | 0 non-default uses | Retain |
| … Items visible (`desktopVisible` 4.2, `tabletVisible` 3.3, `mobileVisible` 1.2) | number 1-8; cond. scroll | `--list-visible-${bp}` l.291 -> `--list-item-size` CSS l.25. **Verified**: 1440 -> 325px cards ((1440-3.2x24)/4.2), 1024 tabletVisible 2.5 -> 395px, 390 -> 322px | none | Retain |
| … Card width (`desktopCardWidth` 0, …) | number 0-1200 (>=120); cond. scroll | `--list-card-width-${bp}` l.293. **Verified**: 320 -> 320px | none | Retain |
| … Previous / next buttons (`desktopControls` false, …) | boolean; cond. scroll | class `${bp}-controls` l.287, CSS l.258/871/976; hidden when nothing overflows (l.982) | **focus lost when a button disables** (D-A-4) | Retain (Correct scroller) |
| … Scroll indicator (`desktopIndicator` false, `tabletIndicator` false, `mobileIndicator` true) | boolean; cond. scroll | class `${bp}-indicator` l.288, thumb from `scroller-decorator.js:55-60` | none | Retain |
| Equal card height (`equalHeight`) | boolean false | `equal-height` -> `grid-auto-rows: 1fr` (CSS l.131); no effect in scroll mode | near-duplicate of Stretch | Retain (or merge with Stretch into "Card height: natural / row / all rows") |
| Stretch cards to row height (`stretchCards`) | boolean true | `stretch` -> `align-items: stretch` (CSS l.127); scroll mode always stretches (flex) | see above | Retain |
| Scroll snap (`scrollSnap`) | boolean true | `snap` class CSS l.166-176 | shown when every breakpoint is grid (D-A-8) | Retain (add condition) |
| Snap alignment (`snapAlign`) | start / center; cond. snap | `snap-center` CSS l.174. Verified (initial index centred, scrollLeft 304 at 390) | D-A-8 | Retain |
| Hide native scrollbar (`hideScrollbar`) | boolean true | CSS l.178-184 | D-A-8; with controls/indicator off (desktop default) a hidden scrollbar leaves no affordance for mouse users | Retain |
| Allow mouse drag (`mouseDrag`) | boolean true | `scroller-decorator.js:118-150`; drag-release click still tracked (D-A-21) | D-A-8 | Retain |
| Allow touch swipe (`touchSwipe`) | boolean true | `no-swipe` -> `touch-action: pan-y` (CSS l.186-188) | off + no controls = unreachable cards on touch (D-A-10); 0 uses | Remove (keep reading as on) |
| Keyboard scrolling (`keyboardScrolling`) | boolean true | `scroller-decorator.js:102-115` (Arrow, Home, End on the focused region); off only removes card stepping, native arrow scroll remains | 0 uses; no reason to switch off | Remove (always on) |
| Scroll step (`scrollStep`) | one-card / viewport | `scroller-decorator.js:81-88` | D-A-8 | Retain |
| Loop (`loop`) | boolean false | `scroller-decorator.js:77-80`, buttons never disabled | D-A-8 | Retain |
| Initial item index (`initialIndex`) | number 0-200 | `scroller-decorator.js:153-160`. Verified (scrollLeft 627 for index 2) | D-A-8 | Retain |
| Edge (`edgePadding`) | bleed / none, bleed | `edge-bleed` CSS l.205-215, 833-855, 938-960 using `--section-padding-inline`, which is `0rem` in full-width sections (`styles.css:972-975`) | **renders identically to "none" in default (full-width) sections** (verified, D-A-9) | Retain (relabel / document) |
| Reduced motion support (`reducedMotion`) | boolean true | `scroller-decorator.js:37` | lets authors turn off reduced-motion support (D-A-11); 0 uses | Remove (always honour) |
| Empty message (`emptyMessage`) | text; cond. emptyBehavior = message | `cards.js:170`, `list.js:249` | none | Retain |
| Analytics (`analyticsEnabled`) | boolean true | `cards.js:180-190`, `list.js:265-278`: off sets `data-analytics="off"`, which suppresses all clicks of the block (`data-layer-decorator.js:32`) | none | Retain |
| Style options (`classes`) | stat-compact / dividers / header-center | delivered as block classes; CSS `card-list.css:89-98, 480-482, 784-786` (`styleOptions` in config l.202 is always empty, harmless) | `dividers` only affects link rows at >=600px | Retain |

---

## Block: Cards (`cards`, class `cards`)

### A. Overview
- Purpose: manually authored card collection (TCS DS Figma List variations): image, panel, report, statistic cards, a feature card or rows of links, grid or horizontal scroll per breakpoint.
- Files: `blocks/cards/cards.js`, `blocks/cards/cards-data.js`, `blocks/cards/cards.css` (only `@import` of `styles/card-list.css`), `blocks/cards/_cards.json`, README; shared card-list modules.
- Container / item: Cards (key-value container, filter `cards`) holds Card items (`card`). Header + presentation in the container, content in the items; items may override Card style, Card colour and new tab.
- Usage: 67 instances on 17 pages; Card items 269.
- Flow: `readBlock` (`cards.js:115-127`) splits property rows (keys in `PRESENTATION_PROPERTIES`) from item rows; `readCard` matches the 19 cells with `CARD_LAYOUT` (`cards-data.js:17-19`), legacy 1-2 cell cards (image + rich text) still read (`cards.js:74-79`, `readLegacyText`).

### C. Dialog validation
Content tab: header fields, see 0.2. Display tab: 0.2 (cards, layout, scroll groups, advanced). Additional tab: 0.1. Block-specific:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| When there are no cards (`emptyBehavior`) | hide / message, hide (definition, model, code `cards.js:140` agree) | `cards.js:160-174`: hide -> block and wrapper `hidden` (not in editor); message -> header + message | none | Retain |
| Card style "Mixed (by page)" description | — | for Cards `kindOf` falls back to content type Report / no image -> panel | wording about pages is wrong for Cards (D-A-19) | Rename option text for Cards ("Mixed (automatic)") |
| Card colour "Default for the style: each page's card-theme metadata" | — | Cards have no page metadata | same | Reword |

Defaults: definition template (`_cards.json`) and model agree with `normalizePresentation`; no mismatch found.

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Image card (`style-image`) | image, kicker, title, description, meta | `renderCard` l.189-198; verified card-styles page | Retain |
| Panel | dark panel, kicker, title, description, Explore | l.213-220 | Retain; fix focus ring (D-A-2) |
| Report | gradient panel, type, title, Download | l.199-205 | Retain; D-A-2 |
| Statistic | number, label, description | l.206-212 | Retain; D-A-2 |
| Mixed | per item / automatic | `kindOf` | Retain; reword |
| Feature first | large spotlight first | `renderFeature` | Retain; D-A-24 |
| Rows of links (teaser off) | title rows with arrow | `renderRow` l.232-252 | Retain |
| stat-compact / dividers / header-center | style options | CSS classes on the block | Retain |
| Grid / horizontal scroll per breakpoint | layout | verified at 3 widths | Retain |
| Card colours (8) | panel / report / stat colours | verified on panels; broken on image cards | Correct (D-A-3) |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Semantics | list of cards | `ul.list-items > li > article`, region `role=region` named by the title (`card-list-decorator.js:336-341`) | region landmark even in grid mode (landmark noise); consider role only when it scrolls | Pass (advisory) |
| Headings | logical | card titles one level below the list heading, h3 without one (l.84-87) | none | Pass |
| One link per card | single tab stop, accessible name | CTA or title link with `::before` overlay; CTA name `"{label}: {title}"` (l.175) starts with the visible label | none | Pass |
| Focus visible (image cards) | ring | ring on the `::before` overlay, visible (screenshot `a-focus-anchor-cards-image-card.png`) | none | Pass |
| Focus visible (panel / report / stat) | ring | **clipped**: article `overflow:hidden` + outline-offset +0.25rem (`card-list.css:390-394, 402-403`); screenshot `a-focus-anchor-cards-panel-card.png` shows no ring | D-A-2 | **Fail (2.4.7)** |
| Colour contrast with Card colour on image cards | >= 4.5:1 | CTA text rgb(243,243,243) on transparent/white (a-checks2) | D-A-3 | **Fail (1.4.3)** when an image card has Dark/Navy/Brand and a CTA label |
| Scroll region keyboard | focusable when it scrolls; arrows, Home, End | `tabindex=0` only when overflowing (verified), keys in `scroller-decorator.js:102-115`; `:focus-visible` outline CSS l.200 | none | Pass |
| Previous / next | buttons, names, aria-controls | `createIconButton` labels from placeholders, `aria-controls` (l.365-367) | **focus moves to `<body>` when Next becomes disabled** (a-checks focus: `active: BODY`) | **Fail (2.4.3)** D-A-4 |
| Touch reachability | all cards reachable | `touchSwipe` off + controls off blocks horizontal touch scroll | D-A-10 | Fail when configured (0 uses) |
| Reduced motion | no smooth scroll / no animation | honoured unless the author switches `reducedMotion` off; animations skipped by motion decorator | D-A-11 | Partial |
| Images | alt or decorative | Card Image alt text; empty = decorative (`img.alt = card.imageAlt || ''`, l.147) | none | Pass |
| New tab | announced | `announceNewTab` (l.94-97) | none | Pass |
| Indicator | decorative | `aria-hidden` (l.362) | none | Pass |
| Duplicate ids | unique | `${id}-title`, `${id}-items`, Component ID suffixed when taken (l.478-480) | none found (a-checks4) | Pass |
| Editor | empty items selectable | placeholders `renderEditorItems` l.456-470 | none | Pass |

### F. Data layer
- State: `trackCardList` (`card-list-decorator.js:491-511`) pushes `{id: {@type tcs-corp/components/cards, parentId page, dc:title, xdm:variant}}` and one `…/cards/item` per card (`dc:title`, `xdm:linkURL`, `xdm:position`, `repo:modifyDate`); `data-analytics="custom"` stops the generic `trackBlocks` entry (no duplicate).
- Clicks: central `data-layer-decorator.js:102-117`; card link `data-cmp-interaction="card"`, header CTA `cta`, buttons `previous` / `next`; `li[data-cmp-id][data-cmp-position]`. Verified one `cmp:click` per click with `path component.<card id>`.
- Defects: `position` is never pushed (attribute on `li`, read from the clicked element) D-A-5; card ids are position based (`cards-data.js:82`), so reordering cards changes ids D-A-23; feature card has no `data-cmp-id` D-A-24; a click ending a mouse drag is still pushed D-A-21.
- Ids unique on the page: yes (anchor / component id / `cards-N`).

### G. Personalization
Item-level candidate (each Card is a self-contained offer); no personalization fields or runtime (Target not loaded). Nothing to flag.

### H. Decision
**Modify** (retain block). Fix D-A-1/2/3/4/5, remove Touch swipe / Keyboard scrolling / Reduced motion fields, deprecate Component ID. Backward compatible: field names unchanged; removed fields default to today's default behaviour.

---

## Block: Card (`card`, class `card`, item of Cards)

### A. Overview
Item of Cards (`core/franklin/components/block/v1/block/item`); 269 instances. Read by `cards.js readCard` (l.71-112) with `CARD_LAYOUT` (19 cells: 3 tabs + 16 fields; `imageAlt` and `linkText` collapse into image and link). Model order matches the layout (checked field by field).

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Image (`image`) | reference | `cards.js:84-92` picture reused (`mediaOf` clones it) | none | Retain |
| Image alt text (`imageAlt`) | text | collapsed into `img alt`; `cards.js:91` | none | Retain |
| Eyebrow (`eyebrow`) | text | kicker (`card-list-decorator.js:193, 208, 216`) | none | Retain |
| Title (`title`) | text | card title / stat number | none | Retain |
| Description (`text`) | richtext, "" | `descriptionOf` keeps rich text and its instrumentation (l.128-137); legacy heading/CTA extraction `readLegacyText` | none | Retain |
| Label (`subtitle`) | text | stat label (l.210) only | only used by Statistic cards, not stated in label | Retain (description already says so) |
| Tags (`tags`) | aem-tag multi | labels via `resolveTags` (`cards.js:151-156`), max 3 | none | Retain |
| Date (`date`) | date-time | `toISODate` (`card-list-config.js:113-122`) + `formatDate` | UTC slice may show the previous day for dates authored east of UTC (suspected, D-A-26) | Retain (verify) |
| Content type (`contentLabel`) | text | meta row / report kicker | none | Retain |
| Reading time (`readingTime`) | text | `readingTimeOf` l.121-125 (`{n}m`) | none | Retain |
| Link (`link`) | aem-content | `cards.js:85-87`; unsafe URLs drop the card (`cards-data.js:31-32`) | none | Retain |
| Link text (`linkText`) | text | collapsed into the link; used only as title when Title is empty (`cards.js:109-110`) | redundant with Title, 0 uses | Deprecate (keep reading) |
| Call to action label (`ctaLabel`) | text | CTA button (l.171) | none | Retain |
| Open in a new tab (`newTab`) | As the block / Yes / No | `cards-data.js:37-63` | item override of a collection default: acceptable | Retain |
| Card style (`kind`) | As the block / 4 kinds | `kindOf` step 1 | none | Retain |
| Card colour (`theme`) | As the block / 8 colours | `themeOf` step 1 | no effect / broken on Image cards (D-A-3) | Correct |
| Analytics label (`analyticsLabel`) | text max 120 | `dc:title` of the card state (`card-list-decorator.js:504`), `data-analytics-label` | 0 uses; clicks still use the visible text as `dc:title` | Retain |
| Accessibility label (`ariaLabel`) | text | `aria-label` of the card link (l.93) | must contain the visible text (2.5.3) - add to description | Retain |

### D. Variations
Card style / colour overrides per item (see Cards D). Legacy 1-2 cell cards: verified rendering on `cards/heights-links-legacy`.

### E. Accessibility
Covered by Cards E (the item renders inside the Cards list). Item-specific: Accessibility label replaces the accessible name; no check that it includes the visible label (advisory).

### F. Data layer
`{cards id}-item-{n}` component, `@type tcs-corp/components/cards/item`; id changes when items are reordered (D-A-23).

### G. Personalization
Item-level (the natural unit for offers); no fields, no runtime.

### H. Decision
**Retain**; deprecate Link text, scope Card colour (D-A-3). Container / item split is correct: no collection settings in the item except the documented overrides (style, colour, new tab).

---

## Block: List (`list`, class `list`)

### A. Overview
- Purpose: AEM Core List equivalent: child pages, a fixed list (Pages + List Items with overrides) or tagged pages from the query index, rendered with the shared card list (same presentation as Cards).
- Files: `blocks/list/list.js`, `blocks/list/list-data.js` (pure, unit tested), `blocks/list/list.css` (`@import` card-list.css), `_list.json`, README; `utils/query-index.js`, `utils/redirects.js`, `decorators/skeleton-decorator.js`.
- Container / item: List container + List Item children (`list-item`, overrides by link).
- Usage: 229 instances on 139 pages; List Items 364 on 51 pages. Sources: parent 50, fixed 82, tags 97.
- Flow: `readBlockConfig` (`list.js:90-155`) -> `normalizeConfig` (`list-data.js:69-93`) -> `renderWhenLoaded` (skeleton after 150 ms) -> `buildCards` (discover / dedupe / sort / limit, `list-data.js:406-432`) -> tags -> `renderCardList` -> `trackCardList`. Legacy lists (title + CTA only) render header only (`list.js:173-177`).

### C. Dialog validation
Header and Display fields: 0.2. Additional: 0.1. Block-specific:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| List source (`source`) | parent / fixed / tags, fixed (def, model, code agree) | `list-data.js:74, 411-429` | none | Retain |
| Pages (`pageItems` container, `page`) | container multi; cond. fixed | `list.js:143-145` `linkPathsOf(props.pageitems)`; merged with List Items (`mergeFixedItems` l.385-398) | **item content stored on the container as a composite multifield, contrary to the project rule (AGENTS.md "Item children"); 0 uses**; two ways to add the same page | Deprecate (hide from dialog, keep reading) |
| Parent page (`parentPath`) | aem-content; cond. parent | `pathOf` `list.js:77-82`; `resolveParentPages` l.132-138 | none | Retain |
| Use the current page when empty (`parentUseCurrentPage`) | boolean true | `list-data.js:412` | none | Retain |
| Direct children only (`directChildrenOnly`) | boolean true | `list-data.js:71, 78` | none | Retain |
| Child depth (`childDepth`) | number 1-10, model 2; cond. not direct | `list-data.js:78`: code fallback **1** when the row is absent vs model default **2** | default mismatch (D-A-22) | Correct (fallback 2) |
| Search root (`rootPath`) | aem-content; cond. tags | `list-data.js:416` | none | Retain |
| Use the current page when empty (`tagsUseCurrentPage`) | boolean true | l.416 | same label as the parent one, fine in context | Retain |
| Tags (`tags`) | aem-tag multi; cond. tags | `readTagValues` (`list.js:106`), `applyTagMatching` incl. child tags (l.141-156) | none | Retain |
| Match (`tagMatch`) | any / all | l.153-154 | none | Retain |
| Include descendant pages (`includeDescendants`) | boolean true | l.166 | none | Retain |
| Maximum search depth (`maxDepth`) | number 0-10, 0 = no limit | l.166 | none | Retain |
| Order by (`orderBy`) | manual / title / lastModified | `sortCards` l.356-366 (value normalised `lastmodified`) | none | Retain |
| Sort order (`sortOrder`) | asc / desc; cond. not manual | l.359 | none | Retain |
| Maximum items (`maxItems`) | number 0-200, 0 = all | `limitCards` l.368; also caps the skeleton | none | Retain |
| When there are no items (`emptyBehavior`) | hide / message / fallback, message | `list.js:218-258`: fallback re-runs as fixed (List Items); hide not applied on AEM author (message instead) | index failure and "no matching pages" show the same message (no error state) | Retain |

Notes: `hide-in-nav` pages excluded (`isListable` l.123-124); links go to redirect targets (`list.js:213`); pages missing from the index are read from their HTML (`getPagesAt`, editor support).

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Child pages | section listings | verified `list/layout-and-scrolling` (8 cards, lastModified desc) | Retain |
| Fixed list (List Items) | curated pages / links with overrides | verified `list/card-colours-and-overrides` | Retain; deprecate Pages container |
| Tagged pages | related content | verified `list/figma-variations` 03 / 08 | Retain |
| Figma variations 1-14 | card styles, feature, rows, stats | rendered; CTA style of 02 / 05 wrong (D-A-1) | Correct |
| Empty state | message / hide / fallback | verified `list/empty-state` ("There are no items to show.") | Retain |
| Lists made before | title + CTA only | verified `list/lists-made-before` (`list-legacy`) | Retain |
| Card style from pages (`card-style` / `card-theme` metadata) | page-driven style | `kindOf` / `themeOf` step 3 | Retain; D-A-3 applies |

### E. Accessibility
Same rendering as Cards (see Cards E: D-A-2 focus ring clipped on panel/report/stat, D-A-3 contrast on image cards, D-A-4 focus loss on previous/next, D-A-10, D-A-11). List-specific:

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Loading state | not announced as content, busy | skeleton `aria-hidden`, block `aria-busy=true` (`skeleton-decorator.js:57-62`), authored rows hidden by CSS | none | Pass |
| Empty state | text message | `p.list-empty` (`card-list-decorator.js:444-446`) | not a live region; acceptable (static at load) | Pass |
| Error state | distinguishable | index failure resolves to `[]` (`query-index.js:177`) -> "no items" | advisory | Pass (advisory) |
| Region name | title or label | `aria-labelledby` title, else List label / "List" | 39 lists set a List label that is ignored when a title exists (labelledby wins) | Pass |

### F. Data layer
State as Cards with `@type tcs-corp/components/list`, `xdm:listSource`, `xdm:variant`; card ids `{list id}-item-{hash(url)}` (`list-data.js:372-375`): stable across reorder, unique (deduplicated by URL). Clicks verified: `cmp:click` `path component.anchor-list-grid-all-item-1lq767`, `interaction card`, **no `position`** although `li[data-cmp-position="2"]` and the README (`blocks/list/README.md:359`) documents `position: 1` (D-A-5). Skeleton keeps the block out of `trackBlocks` until rendered (`data-analytics="pending"`), so no duplicate state.

### G. Personalization
Data source (lists pages from the index; personalization would be by query / audience metadata). No fields, no runtime.

### H. Decision
**Modify** (retain). Fix shared defects; deprecate `pageItems` in the dialog (List Items already cover fixed lists; keep `linkPathsOf(props.pageitems/pages)` for authored content); align `childDepth` fallback. Compatible: no field renamed.

---

## Block: List Item (`list-item`, class `list-item`, item of List)

### A. Overview
Item of List; 364 instances. Cells per `ITEM_LAYOUT` (`list-data.js:28-29`: 3 tabs + 13 fields, `linkText` and `imageAlt` collapsed); matched with `matchCells` (`list.js:110-111`). An item whose link is one of the Pages replaces that page's card; others follow (`mergeFixedItems`). Overrides field by field (`applyOverrides` l.271-298).

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Page or link (`link`) | aem-content, required | `list.js:112-113`; page card from the index, else link card (`resolveFixedItems` l.308-331); unsafe URLs skipped | none | Retain |
| Link text (`linkText`) | text | collapsed; `linkTextOf` (`list.js:69-74`) -> title only when the card has none (external links; internal pages always get a title from the path) | overlaps Title, 0 uses | Deprecate (keep reading) |
| Open in a new tab (`newTab`) | As the list / Yes / No | `applyOverrides` l.293 | none | Retain |
| Title (`headline`) | text | override l.276 | none | Retain |
| Description (`summary`) | text | override l.278 | plain text while Card's is rich text (inconsistency, acceptable) | Retain |
| Image (`image`) | reference | override + picture reuse l.279-295 | none | Retain |
| Image alt text (`imageAlt`) | text | collapsed into img alt | none | Retain |
| Eyebrow (`eyebrow`) | text | l.285 | none | Retain |
| Tags (`tags`) | aem-tag multi | replaces page tags l.292 | none | Retain |
| Label (`subtitle`) | text | stat label | none | Retain |
| Call to action label (`ctaLabel`) | text | l.287 | none | Retain |
| Card style (`kind`) | As the list / 4 | `kindOf` step 1 | none | Retain |
| Card colour (`theme`) | As the list / 8 | `themeOf` step 1 | D-A-3 on image cards | Correct |
| Analytics label (`analyticsLabel`) | text | card state `dc:title` | 0 uses | Retain |
| Accessibility label (`ariaLabel`) | text | link `aria-label` | as Card | Retain |

### D. Variations
Overrides verified on `list/card-colours-and-overrides` (per-item colours). Items of non-fixed lists are shown only as fallback (`emptyBehavior=fallback`) and in the editor as hints (`list.js:233-236`).

### E. Accessibility
As List. Editor placeholders for unlinked items (`renderEditorItems`).

### F. Data layer
Card component id from the URL hash: stable; `data-cmp-id` on `li`.

### G. Personalization
Item-level candidate; no runtime.

### H. Decision
**Retain**; deprecate Link text. Split is correct (only style / colour / new tab overrides).

---

## Block: Filter List (`filter-list`, class `filter-list`)

### A. Overview
- Purpose: content discovery listing of the locale's pages (query index) or a manual list, with filter pills, an advanced filter panel, hero / featured spotlight cards, masonry / grid / list layouts and Load more.
- Files: `blocks/filter-list/filter-list.js` (696 lines, own card markup, not the card-list decorator), `filter-list.css`, `_filter-list.json`; `decorators/masonry-decorator.js` (keeps DOM order), `skeleton-decorator.js`, `utils/query-index.js`, `utils/taxonomy.js`, `utils/data.js`. No README.
- Container / items: Filter Tag (primary pills), Filter Category (advanced filter groups), Filter Page (manual / featured pages). Items read by `readItems` (`filter-list.js:104-132`; on the page Tag = 1 cell, Category / Page = 3 cells with a tab cell).
- Usage: 32 instances on 11 pages; items: tags 37, categories 23, pages 50.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Title (`title`) | text | `filter-list.js:448-449` always `h2` | no heading type (cards always h3) | Retain (optional: add Heading type) |
| Description (`description`) | richtext | l.450-454 | none | Retain |
| Show result count (`showResultCount`) | boolean false | l.456: visible vs visually hidden; the `role=status` is always there | good; but first count is written after insertion -> announced on load (D-A-25) | Retain |
| Default layout (`layout`) | masonry / grid / list | l.460-461, class `layout-*` | "Default" implies a user switch that doesn't exist | Rename "Layout" |
| Cards per page (`cardsPerPage`) | 9 (1-48) | `count` l.59, `appendCards` l.487-499 | none | Retain |
| Load more count (`loadMoreCount`) | 6 (1-48) | l.671-678 | none | Retain |
| Datasource (`source`) | query-index / manual | l.144, `candidatesOf` l.199-212 | none | Retain |
| Root path (`rootPath`) | aem-content; cond. not manual | l.145, 208 | none | Retain |
| Pages (`pageItems` container, `page`) | cond. manual; description "authored before Filter Page items" | l.147 | legacy multifield still in the dialog, 0 uses (D-A-17) | Remove from model (keep reading) |
| Page types (`pageTypes`) | Article, Blog, Report, Case Study, News, Event | l.148, 210 vs `page.pageType` | **options don't match the site's page types** (Page Type: home, article, blog, press-release, `models/_page.json`; index values '', home, article, blog, press-release): Report / Case Study / News / Event always give 0 results, Press Release missing (D-A-6); 0 uses | Correct options |
| Content types (`contentTypes`) | 9 options | l.149, 210 (`toClassName` compare) | taxonomy `tcs-corp:content-type/*` = article, blog, insights, case-study, whitepaper, report, news, event, press-release; options miss **insights, press-release** (used by 10 indexed pages) and add **podcast, video** (not in taxonomy, 0 pages) (D-A-6) | Correct options |
| Sort by (`sortBy`) | latest / featured / priority / alphabetical | `sorter` l.188-196 | none (authored only, no visitor sort control) | Retain |
| Primary filter category (`primaryCategory`) | aem-tag | l.151, 309-310: pills = tags under it used by the pages | none | Retain |
| Primary filter tags (`primaryTags` container, `tagId`) | container, no condition | `readPrimaryTags` l.78-90 | legacy multifield always visible, 0 uses (D-A-17); label "Tag Id" technical | Remove from model (keep reading) |
| Show All filter (`showAll`) | boolean true | l.540 | none | Retain |
| Allow multi select (`multiSelect`) | boolean false | l.561; pills always AND (l.479-480) while Filter logic only applies to the advanced options | two logics; description of Filter logic should say "advanced filter" | Retain (clarify) |
| Enable advanced filter (`advancedFilter`) | boolean true | l.314-318: needs categories with used tags, else no toggle | none | Retain |
| Advanced filter categories (`advancedCategories` container: `categoryLabel`, `taxonomyRoot`) | container, no condition | `readCategories` l.93-98 | legacy, always visible, 0 uses (D-A-17) | Remove from model (keep reading) |
| Filter logic (`filterLogic`) | and / or | l.483 | see multi select | Retain (relabel "Advanced filter logic") |
| Card style (`cardStyle`) | default / compact / featured / mixed, mixed | `standardCard` l.392-423 (default: description; compact; featured = large card with Read more; mixed: report and image-less dark cards, no description) | same label as List's Card style with a different vocabulary; "Featured" overloaded (Featured cards, Featured rule, Sort featured) | Rename option "Featured" -> "Large" (value kept) |
| Enable featured cards (`enableFeatured`) | boolean true | `arrange` l.235-245 | none | Retain |
| Featured rule (`featuredRule`) | featured / priority / manual; options named "featured=true", "priority<=3" | l.239-243 (featured falls back to priority) | technical option labels (D-A-18) | Rename ("Marked as featured", "Priority 1-3", "Manual") |
| Featured pages (`featuredItems` container, `featuredPage`) | cond. manual | l.162 | legacy (D-A-17) | Remove from model (keep reading) |
| Featured card count (`featuredCount`) | 2 (1-12) | l.244 | none | Retain |
| Enable hero card (`enableHero`) | boolean false | l.225-233 | none | Retain |
| Hero rule (`heroRule`) | latest / featured / manual | l.227-231 | none | Retain |
| Hero page (`heroPage`) | aem-content; cond. manual | l.167, 227 | none | Retain |
| Image source (`imageSource`) | text "featured-image" | `map.image` l.169, 333 | free-text metadata column names editable by authors; a typo silently empties every card (D-A-18) | Deprecate from dialog (keep reading) |
| Fallback image (`fallbackImage`) | "thumbnail-image" | l.170 | same | Deprecate |
| Eyebrow source (`eyebrowSource`) | "content-type" | l.171, 381, 390, 396: also decides "report" cards (`isReport`) | shows the raw slug ("case-study", verified) (D-A-7) | Deprecate field; Correct label |
| Title source (`titleSource`) | "title" | l.332 | technical | Deprecate |
| Description source (`descriptionSource`) | "description" | l.377 | technical | Deprecate |
| Tag source (`tagSource`) | "tags" | l.300, 334 | technical | Deprecate |
| Url source (`urlSource`) | "path" | l.331 | technical, "Url" | Deprecate |
| Author source (`authorSource`) | "author" | l.338-343 (author name or Authors sheet id) | technical | Deprecate |

Defaults: definition template, model and code agree for every field (checked). Filter List has no Analytics switch (fine).

### D. Variations
| Variation | Purpose | Result (code-verified / runtime) | Action |
|---|---|---|---|
| Masonry / Grid / List | layouts | verified `filter-list/layouts-and-card-styles` (34 / 34 / 30 results) | Retain |
| Default / Compact / Featured / Mixed card style | card kinds | verified kinds `standard`, `compact`, `large`, `report` | Retain (rename Featured) |
| Hero (featured / latest / manual) | spotlight first | verified `filter-list/rules` | Retain |
| Featured (flag / priority / manual) | spotlight after each page | verified | Retain |
| Manual list | curated | verified 5 results | Retain |
| Content types filter | restricts | verified (report / whitepaper; event / news) | Correct options (D-A-6) |
| Page types filter | restricts | 4 of 6 options can never match (index data) | Correct (D-A-6) |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Filter pills | toggle buttons with state | `<button aria-pressed>` (l.543-555), group `role=group aria-label="Filters"`, `aria-controls` results; verified `All:true, Banking:false…` | none | Pass |
| Advanced filter disclosure | button, aria-expanded / controls, Escape returns focus | icon button `aria-expanded` / `aria-controls` (l.610-621); opening focuses the first checkbox; Escape closes and focuses the toggle (verified a-checks `filterOpen`, `filterEsc`) | none | Pass |
| Options | labelled checkboxes in fieldsets | `fieldset/legend`, `label for` (l.590-607); Space toggles (verified) | none | Pass |
| Selected count | announced | toggle `aria-label` "Advanced filters, n selected", badge `aria-hidden` | none | Pass |
| Results announcement | polite status | `role=status` updated on every filter (l.514); also on page load (D-A-25) | set the first text before insertion | Pass (minor) |
| Load more / pagination | focus to first new card, count announced | l.671-678 | none | Pass |
| Empty / reset | message and reset; focus returned | l.515-528, 659-665 | after an index failure "Try selecting another filter" is misleading | Pass (advisory) |
| Card focus | visible | `::before` ring (l.339-343); spotlight uses negative offset (l.453) | none observed | Pass |
| Reading order (masonry) | DOM order | `masonry-decorator.js` keeps DOM order across columns | none | Pass |
| Headings | logical | title h2, cards h3 (fixed) | heading type not configurable | Pass |
| Images | decorative | `alt=''` (l.353), title present | none | Pass |
| Loading | busy, hidden skeleton | as List | none | Pass |
| Sort | n/a | no visitor sort control | — | n/a |

### F. Data layer
No custom state: generic `trackBlocks` entry `tcs-corp/components/filter-list` after the skeleton. Interactions (verified): pills `cmp:click` `interaction filter`, `value` tag id / `all`; checkboxes `cmp:change` `filter-option` with `value` and `checked` (no duplicate `cmp:click`, inputs aren't matched by the click handler); toggle `cmp:click interaction button`; Load more `load-more`. Card links: plain `link` clicks attributed to the block (no `data-cmp-id` / position), unlike List and Cards - consistent tracking would need card ids; not proposed without a business need. Internal ids `filter-list-N-*` unique.

### G. Personalization
Data source (index + rules). No fields, no runtime.

### H. Decision
**Modify** (retain). Correct Page / Content type options, show content-type labels, remove legacy containers and mapping fields from the dialog (readers kept), rename technical labels. Longer term: render cards with `card-list-decorator.js` (one card implementation; proposal phase 5). Compatible: values unchanged.

---

## Block: Filter Tag (`filter-list-tag`, class `filter-tag`)
- **A**: Item of Filter List, one field, 1 cell; 37 instances. Read `filter-list.js:118-122`.
- **C**:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Tag (`tagId`) | aem-tag, required | pill in item order, label from taxonomy (l.311-313) | none | Retain |

- **D**: none. **E**: renders as a pill (see Filter List E). **F**: `data-cmp-value` = tag id. **G**: not personalizable. **H**: **Retain**.

## Block: Filter Category (`filter-list-category`, class `filter-category`)
- **A**: Item of Filter List, tab + 2 fields (3 cells, `CATEGORY_LAYOUT` l.48); 23 instances. Read l.123-129.
- **C**:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Category label (`categoryLabel`) | text | fieldset legend (l.591); empty -> taxonomy label of the root (l.316) | none | Retain |
| Taxonomy root (`taxonomyRoot`) | aem-tag, required | options = tags below the root used by the candidate pages (l.317) | a category whose tags no page uses is dropped silently (no editor hint) | Retain |

- **D**: none. **E**: fieldset/legend (Pass). **F**: options `filter-option`. **G**: not personalizable. **H**: **Retain**. A single tab "Category" in a two-field item only adds an empty cell; harmless (layout handled).

## Block: Filter Page (`filter-list-page`, class `filter-page`)
- **A**: Item of Filter List, tab + 2 fields (`PAGE_LAYOUT` l.49); 50 instances. Read l.111-117.
- **C**:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Page (`page`) | aem-content, required | `pathsOf` l.63-70 | none | Retain |
| Use (`pageRole`) | listed / featured, listed | listed -> manual list (only with Datasource Manual); featured -> featured pages (only with Featured rule Manual) | silently ignored in the other modes (no editor hint) | Retain (add hint) |

- **D**: listed / featured. **E**: n/a (card). **F**: none. **G**: item-level candidate (manual pins), no runtime. **H**: **Retain**. Split correct: `pageRole` states membership, not a collection setting.

---

## Block: Table List (`table-list`, class `table-list`)

### A. Overview
- Purpose: heading + "view all" CTA + up to 10 rows (Figma List variations): Variation 1 industries (title, description, arrow), 2 solutions (description, large title, outline button), 3 products (description, number, large title, diagonal arrow).
- Files: `blocks/table-list/table-list.js`, `table-list.css`, `_table-list.json`; no README, no shared card-list code.
- Container / item: Table List + Table List Item (`table-list-card`); a third definition **Table List Header** (`table-list-header`) exists but is in no filter and has 0 uses (legacy reader `table-list.js:135-136, 189-192`).
- Usage: 23 instances on 12 pages; 84 items.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Variation (`variations`) | industries / solutions / products, industries | class + `VARIATION_DEFAULTS` (`table-list.js:44-48, 146-147, 320`) | option names "Variation 1 - …" are design-file names | Retain (optionally rename to describe the look) |
| Heading (`listHeading`) | text "" | l.152, 192-198 | none | Retain |
| Heading Type (`listHeadingType`) | h2-h4, h2 | collapsed into the heading cell; read from the authored tag (l.153); items one level below (l.322-323) (inventory `readByCode=false` is a false negative) | none | Retain |
| Maximum items (`maxCards`) | 4, 1-10 | l.148, 154, 328 | items above the max are removed from the DOM, also in Universal Editor (not selectable) (D-A-14) | Retain (Correct editor) |
| Text (`viewAllLabel`) | text | l.155, 201-203 (fallback placeholder "View all") | generic label | Rename "View all text" |
| Link (`viewAllLink`) | aem-content | l.156, 200; CTA only shown with a link (UE preview without) | generic label | Rename "View all link" |
| Style (`ctaStyle`) | Variation default / primary / secondary / tertiary | l.157; verified primary / secondary / tertiary per variation | generic label | Rename "View all style" |
| Numbers (`numbers`) | default / show / mobile / hide | l.158, 272-276, CSS `numbers-mobile` hides >=600px | none | Retain |
| Item link (`itemAction`) | default / arrow / arrow-up-right / button | `buildAction` l.226-248 | none | Retain |
| Button text (`itemButtonLabel`) | "Explore"; cond. button | l.160, 231 | none | Retain |
| Motion Type (`motion`) | none / fade / slide / reveal, none | `observeMotion` l.303-310, CSS l.248-286; skipped when Animation Type is set | **duplicates the Additional tab Animation Type** (two animation settings on one block; 4 uses) | Deprecate (map fade -> `motion-fade-up`, slide -> `motion-slide-up`, reveal -> `motion-fade-in`; keep reading old values) |
| Additional tab | see 0.1 | whole block animates (not in `CONTENT_TARGETS`) | add `table-list: { targets: '.table-list-item', stagger: true }` when Motion Type is deprecated, to keep per-item motion | Retain |

Definition / model defaults agree with code (variation, heading h2, max 4, Explore, none).

### D. Variations
| Variation | Purpose | Result (runtime) | Action |
|---|---|---|---|
| Industries | rows with arrow, numbers on mobile | `industries numbers-mobile`, CTA `button primary`, arrow "Explore Banking" | Retain |
| Solutions | large title + button | `numbers-hide`, CTA secondary, item buttons "{text}: {title}" | Retain |
| Products | numbers + diagonal arrow | `numbers-show`, CTA tertiary | Retain |
| Numbers / item link / CTA style overrides | per block | code paths l.157-160 | Retain |
| Motion fade / slide / reveal | item reveal | reduced motion and UE skipped | Deprecate (see C) |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| List semantics | list | `div role=list` / rows `role=listitem` (l.326-331) | native `ul/li` preferable, not required | Pass |
| Headings | hierarchy | heading h2-h4, item titles one level below (verified H2 / H3) | an item with an empty Title renders an empty heading (l.277) (D-A-28) | Pass (minor) |
| Item link name | descriptive | arrow `aria-label "Explore {title}"`, button `"{text}: {title}"` (placeholders) | none | Pass |
| Whole-row link | one tab stop | arrow `::after` covers the row (CSS l.130-134); description links stay above (z-index) | none | Pass |
| Focus visible | ring | `a.table-list-arrow:focus-visible` outline (CSS l.142-145) | none | Pass |
| Unlinked items | no fake controls | arrow `span aria-hidden`, button only in editor (`tabindex=-1`, `aria-hidden`) | none | Pass |
| Reduced motion | no reveal | JS l.307 and CSS `prefers-reduced-motion: no-preference` | none | Pass |

### F. Data layer
Generic `trackBlocks` entry; no `data-cmp-*` attributes (verified 0), so clicks are `interaction: link` on the block, no item position. Acceptable; no new tracking proposed.

### G. Personalization
Entire block (fixed editorial content). No fields, no runtime.

### H. Decision
**Retain** (Modify minor): deprecate Motion Type, rename the CTA labels, remove the orphan Table List Header definition (keep its reader), fix editor overflow items. Candidate to become a "rows" presentation of Cards later (see redundancy).

## Block: Table List Item (`table-list-card`, class `table-list-item`)
- **A**: Item of Table List (title "Table List Item", id says "card", class from the template name `table-list-item`); 84 instances; cells matched by content (`ITEM_MATCHERS` l.102-108), `linkText` collapsed into `link`.
- **C**:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Number (`number`) | text "" | l.272-276; blank -> 01, 02 | matcher `^\d{1,3}[.)]?$`: a non-numeric number (e.g. "A1") is read as the title | Retain |
| Title (`title`) | text, default **"TwinX"** (definition template and model) | l.277 | sample content prefilled in every new item (D-A-15) | Correct (no default) |
| Trademark (`trademark`) | none / tm / r | `<sup>` ™ / ® (l.278-284) | `sup` announced as plain sign; fine | Retain |
| Description (`description`) | richtext, default sample text | `buildDescription` l.251-262 | sample default (D-A-15) | Correct |
| Link (`link`) | aem-content | `linkOf` l.64-65, `toSitePath` | none | Retain |
| Button text (`linkText`) | text | collapsed link text -> item button text (l.231), only for button item links | none | Retain |

- **D**: per variation (above). **E**: see Table List E. **F**: none. **G**: item-level candidate, no runtime. **H**: **Retain**; remove sample defaults.

---

## Redundant block assessment

| Existing blocks | Overlap | Unique capabilities | Existing usage | Decision | Target | Migration |
|---|---|---|---|---|---|---|
| Cards vs List (Fixed list) | Same renderer, presentation fields and CSS (`card-list-decorator.js`, `_card-list.json`); both render image / panel / report / stat cards, feature, rows | Cards: content authored in the item (rich text description, date, reading time, content type, no link required, own images); List Fixed: cards from page metadata with per-field overrides, redirects, dedupe, page card-style metadata | Cards 67 / 17 pages; List fixed 82 (List total 229 / 139 pages) | Retain both (already merged at code level); position them clearly: List = pages, Cards = authored content. Do not add dynamic sources to Cards unless proposal D-3 is decided | — | none; deprecate List `pageItems` container in favour of List Items |
| List (rows of links, Display as teaser off) vs Table List (Variation 1) | Rows with title, description and an arrow, dividers | Table List: numbers, trademark, three Figma variations, per-item button text, view-all CTA styles; List rows: page-driven, eyebrow/tag/date | List rows: few (figma 05); Table List 23 / 12 pages | Retain Table List now; later Merge as a "rows" presentation of the card list (one implementation) | Cards/List "rows" presentation with numbers + action options | Map variations -> presentation options; keep Table List reader until content is migrated |
| Filter List vs List (Tagged / Child pages) | Both list index pages as cards | Filter List: visitor filters, advanced filter, hero / featured spotlights, masonry, Load more; List: grid / scroll, overrides, redirects, hide-in-nav | Filter List 32 / 11 pages | Retain both; Replace Filter List's own card markup with the shared card renderer (proposal phase 5) | `card-list-decorator.js` cards inside Filter List | Visual regression only; no content change |

**Container vs item responsibility split**
- Item content in the container (violations): List `pageItems` (Pages), Filter List `pageItems`, `featuredItems`, `primaryTags`, `advancedCategories` (composite multifields; 0 uses each). Decision: remove from the dialogs, keep the readers (D-A-17).
- Collection settings in items: none beyond the documented overrides (Card style, Card colour, Open in a new tab on Card / List Item; Number and Button text on Table List Item; Use on Filter Page). Card colour on items has the D-A-3 problem on image cards.
- Collection defaults in the container are correct (Open links in a new tab, Button text, Numbers).

**Duplicated options between card style / card theme / section styles**
- Card colour Dark = Panel default, Light grey = Statistic default, Grey gradient = Report default (identical render for that style); kept because they force a colour in Mixed lists.
- "Image" in both Card style (Image card) and Card colour (Image background, panel only) - confusing; describe Image background as "Panel with background image".
- Filter List "Card style" uses a different vocabulary (default / compact / featured / mixed); "mixed" means something else than in List / Cards.
- Section style (Highlight) does not duplicate any card option.

---

## Defects

Verified unless marked **suspected**.

**D-A-1 (major, verified) CTA style (Primary / Secondary) of the List and Cards header is never applied.**
`decorators/card-list-decorator.js:73`. `linkType` collapses into the link cell as `<strong>` / `<em>` (no `linktype` row), but the code reads `textOf(props.linktype)` and falls back to tertiary. Evidence: `list/figma-variations` block 05 authored `<strong><a>All news` -> `button tertiary`; `list/card-colours-and-overrides` `<em><a>View all` -> `button tertiary` (a-checks.json `cta`, `cta2`). Content: linkType set on 5 Lists and 2 Cards.
Fix (compatible with both delivery shapes and with a link already decorated by `decorateButtons`):
```js
const type = legacy
  ? readButtonOptions(link).type
  : (textOf(props.linktype).toLowerCase() || readButtonOptions(link).type);
```
(evaluate before `ctaSlot.append(link)` moves the link out of its `<strong>` / `<em>`; `readButtonOptions` also reads a `primary` / `secondary` class.)

**D-A-2 (major, verified) No visible keyboard focus on Panel, Report and Statistic cards.**
`styles/card-list.css:390-394` draws the ring on the link's `::before` with `outline-offset: var(--space-100)` outside the card, and `card-list.css:402-403` sets `overflow: hidden` on those cards, which clips it (WCAG 2.4.7). Evidence: `/tmp/audit/a-focus-anchor-cards-panel-card.png` (focused, `:focus-visible` true, no ring) vs `a-focus-anchor-cards-image-card.png` (ring visible).
Fix (same approach as the Filter List spotlight, `filter-list.css:453`):
```css
.card-list :is(.list-card-panel, .list-card-report, .list-card-stat) .list-card-link:focus-visible::before {
  outline-offset: calc(-2 * var(--border-width-200));
}
```

**D-A-3 (major, verified) Card colour on Image cards: no effect, invisible CTA, broken layout.**
`card-list-decorator.js:162-163` adds `theme-*` to every kind; `card-list.css` paints backgrounds only for panel / report / stat (l.397-409), but `card-list.css:635-637` sets the tertiary CTA to `--list-card-fg` for `.theme-dark`, `.theme-navy`, `.theme-brand`, and l.621-628 makes the media absolute for `.theme-image`. Evidence (a-checks2, an image card rendered with each theme): background transparent, CTA colour rgb(243,243,243) / rgb(255,255,255) on white (about 1.1:1, WCAG 1.4.3); the `theme-image` card collapses from 382px to 178px with the text over the image. Reachable with Card style Image or Mixed plus a Card colour, or an item Card colour on an image card, plus a CTA label.
Fix: `if (theme && kind !== 'image') article.classList.add(...)`; scope the button rules to `.list-card:is(.list-card-panel, .list-card-report, .list-card-stat):is(.theme-dark, .theme-navy, .theme-brand)`; model descriptions "Panel, report and statistic cards". No content change.

**D-A-4 (major, verified) Previous / Next lose keyboard focus at the start / end.**
`decorators/scroller-decorator.js:53-54` sets `disabled` on the focused button; Chrome moves focus to `<body>` (a-checks.json `focus`: after the last Next, `active: BODY`). WCAG 2.4.3.
Fix: use `aria-disabled="true"` instead of `disabled` (set in `update()`), return early in `go()` when the clicked button is `aria-disabled`, and style `.list-controls [aria-disabled='true']` like the disabled icon button. Alternative: move focus to the other button when the focused one disables.

**D-A-5 (minor, verified) Card clicks never carry `position`.**
`decorators/data-layer-decorator.js:114` reads `el.dataset.cmpPosition` of the clicked link, while cards set it on the `li` (`card-list-decorator.js:348`). Evidence: `cmp:click` for the 2nd card has no `position` (a-checks.json `click`); `blocks/list/README.md:359` documents `position: 1`.
Fix: `const pos = el.closest('[data-cmp-position]')?.dataset.cmpPosition;` (only within `blockOf(el)`), `position: pos ? Number(pos) : undefined`.

**D-A-6 (major, verified) Filter List Page types / Content types options don't match the site.**
`blocks/filter-list/_filter-list.json:218` (pageTypes): Report, Case Study, News, Event are not page types (Page Type options home, article, blog, press-release in `models/_page.json`; index `pageType` values '', home, article, blog, press-release), so they always return 0 results; Press Release missing. `_filter-list.json:251` (contentTypes): missing `insights` and `press-release` (taxonomy `tcs-corp:content-type/*`, 10 indexed pages), extra `podcast`, `video` (not in the taxonomy, 0 pages).
Fix: pageTypes options Article `article`, Blog `blog`, Press release `press-release` (Home `home` optional); contentTypes options article, blog, insights, case-study, whitepaper, report, news, event, press-release with taxonomy labels. Stored values stay readable (comparison by `toClassName`); pageTypes has 0 uses.

**D-A-7 (minor, verified) Filter List shows raw content-type slugs.**
`filter-list.js:381` and `:396` print `text(page, map.eyebrow)`; runtime shows "case-study", "blog", "insights" in the card meta (not upper-cased; a-checks3). List uses `contentTypeLabel` (`utils/card-list-config.js:72-78`).
Fix: `const eyebrowOf = (page) => (map.eyebrow === 'content-type' ? contentTypeLabel(page.contentType, page.tags, labels) : text(page, map.eyebrow));` in `meta` and the report kicker; keep `isReport` on the raw value.

**D-A-8 (minor, verified) Scroll settings are shown when no breakpoint scrolls.**
`models/_card-list.json:749-875` (scrollSnap to reducedMotion) have no condition. Fix: condition `{"or": [{"===": [{"var": "desktopMode"}, "horizontal-scroll"]}, {"===": [{"var": "tabletMode"}, "horizontal-scroll"]}, {"===": [{"var": "mobileMode"}, "horizontal-scroll"]}]}` on each (combined with the scrollSnap condition for snapAlign). Dialog only.

**D-A-9 (minor, verified) Edge "Cards run to the edge" renders like "Inside the content width" in full-width sections.**
`card-list.css:205-215, 833-855, 938-960` use `--section-padding-inline`, which is `0rem` outside fixed-width sections (`styles/styles.css:972-975`). Evidence: `anchor-cards-edge-bleed` and `anchor-cards-edge-none` identical (325px cards, 1440px viewport). Fix: description "Fixed-width sections only: the cards run into the section gutter", or remove the field (1 use) and always bleed in fixed-width sections.

**D-A-10 (minor, verified by code) Touch swipe off makes cards unreachable on touch devices.**
`card-list.css:186-188` `touch-action: pan-y`, with previous / next off by default on every breakpoint. Fix: remove the field (0 uses; read as on), or add `${bp}-controls` in `applyCardListLayout` when `!config.swipe`.

**D-A-11 (minor, verified by code) Authors can disable reduced-motion support.**
`scroller-decorator.js:37` honours `prefers-reduced-motion` only when `reducedMotion` is on; contradicts the project rule. Fix: remove `reducedMotion` from `_card-list.json` (0 uses) and always honour it.

**D-A-12 (minor, verified by code) Component ID overrides the Anchor ID.**
`card-list-decorator.js:477`, `cards.js:145`, `list.js:178`: `componentId` wins over the anchor id from `block-options-decorator.js`, so `#anchor-...` links break when both are set; 0 uses. Fix: remove `componentId` from the header group; keep reading it.

**D-A-13 (minor, verified) Table List has two animation settings.**
`_table-list.json:271` Motion Type duplicates the Additional tab Animation Type (`table-list.js:303-310` turns it off when the latter is set). Fix: remove Motion Type from the model; keep reading old values and map them to block classes when no `classes_animation` is set (fade to `motion-fade-in`, slide to `motion-slide-up`, reveal to `motion-fade-up`); add `'table-list': { targets: '.table-list-item', stagger: true }` to `CONTENT_TARGETS` in `decorators/motion-decorator.js`.

**D-A-14 (minor, verified by code) Table List items above Maximum items vanish in Universal Editor.**
`table-list.js:328-334` drops rows after `maxItems`, so they can't be selected on the page. Fix: when `isEditing()`, append the extra rows decorated with a dimmed `table-list-item-hidden` class.

**D-A-15 (minor, verified) Table List Item is prefilled with sample content.**
`_table-list.json:53` (definition template) and `:1032` (model) set Title "TwinX" and a sample Description. Fix: remove those values (hints in descriptions).

**D-A-16 (minor, verified) Orphan component Table List Header.**
`_table-list.json:30-37, 997` define `table-list-header`, in no filter, 0 uses. Fix: remove definition and model; keep the legacy reader (`table-list.js:135-136, 189-192`).

**D-A-17 (minor, verified) Legacy composite multifields still in dialogs.**
List `pageItems` (`_list.json:100`); Filter List `pageItems` (:194), `primaryTags` (:327, always visible), `advancedCategories` (:365, always visible), `featuredItems` (:473): item content in the container, superseded by items (AGENTS.md), 0 uses each. Fix: remove from the models; keep the readers (`list.js:143`, `filter-list.js:79, 94, 147, 162`).

**D-A-18 (minor, verified) Technical Filter List labels and mapping fields.**
Featured rule options "featured=true", "priority<=3"; 8 free-text metadata-column "... source" fields (`_filter-list.json:589` onward) editable by authors, where a typo empties every card. Fix: rename the options ("Marked as featured", "Priority 1 to 3", "Manual"); remove the 8 mapping fields from the model (defaults stay in `readConfig` l.168-177).

**D-A-19 (minor, verified) Cards dialog describes page metadata it doesn't use.**
Shared `cardStyle` / `cardTheme` descriptions (`_card-list.json:110, 148`) mention each page's card-style / card-theme metadata; Cards has no pages. Fix: neutral wording ("Mixed: each card's own style, else automatic").

**D-A-20 (minor, verified by code) Eager image loading prioritises every card image.**
`card-list-decorator.js:148-149` sets `fetchPriority=high` on all cards. Fix: only the first card (or first row).

**D-A-21 (minor, verified by code and DOM event order) A mouse drag ending on a card pushes a cmp:click.**
`data-layer-decorator.js:179` listens on `document` in the capture phase, before the scroller's capture listener on the viewport cancels the click (`scroller-decorator.js:141-146`). Fix: the scroller marks `viewport.dataset.dragged = 'true'` during a drag; `onClick` returns when `el.closest('[data-dragged="true"]')`; the flag is cleared after the suppressed click.

**D-A-22 (minor, verified mismatch, impact suspected) Child depth default differs.**
Model default 2 (`_list.json:169`), code fallback 1 when the row is absent (`list-data.js:78`). Fix: `integer(get('childdepth'), 2, ...)`.

**D-A-23 (minor, verified) Cards card ids depend on position.**
`cards-data.js:82` builds `${id}-item-${i + 1}`; inserting or reordering cards changes the following ids (List hashes the URL, `list-data.js:372-375`). Fix: `hash(href || title)`, position suffix only for duplicates.

**D-A-24 (minor, verified by code) Feature card is untracked; positions disagree.**
The feature card has no `data-cmp-id` (clicks attributed to the block), and `li` positions start at 1 for the second card while the state's `xdm:position` counts the feature as 1 (`card-list-decorator.js:329-348` vs 500-508). Fix: set `data-cmp-id` and `data-cmp-position="1"` on the feature and offset the `li` positions by one when there is a feature.

**D-A-25 (minor, verified by code) Filter List announces the result count on page load.**
`role=status` inserted empty (`filter-list.js:456-457, 668`) and filled by `render()` (l.514) afterwards. Fix: set the initial count text before `block.replaceChildren`; update it only on interaction.

**D-A-26 (minor, suspected) Card date may show the previous day.**
`card-list-config.js:115` keeps the first 10 characters of the ISO value; a date-time stored as a UTC instant for local midnight east of UTC gives the previous day. Verify what Universal Editor stores for `date-time` / `valueType: date`.

**D-A-27 (minor, suspected) Duplicate data-layer ids between legacy and new Lists.**
Legacy lists get `list-N` from the data-layer counter (`data-layer-decorator.js:39-45`), new lists without anchor `list-N` from `utils/ids.js uniqueId`; separate counters can collide. Not reproduced (block-library lists have anchors). Fix: `availableId(uniqueId(prefix))` in `cardListId` and an id-in-use check in `componentIdOf`.

**D-A-28 (minor, verified by code) Empty heading for a Table List item without title.**
`table-list.js:277` always creates the heading. Fix: no heading element when the title is empty (outside the editor).

**D-A-29 (minor, suspected product decision) Filter List and List treat the index differently.**
Filter List doesn't exclude `hide-in-nav` pages or follow redirects (`filter-list.js:199-212, 331`); List does (`list-data.js:123-124`, `list.js:213`). Decide and align via a shared helper in `utils/query-index.js`.

---

## Summary

Components reviewed: 10 (Cards, Card, List, List Item, Filter List, Filter Tag, Filter Category, Filter Page, Table List, Table List Item), plus the orphan Table List Header definition. The per-breakpoint display fields (Mode, Columns, Gap, Visible, Card width, Controls, Indicator for desktop, tablet and mobile) are all read (dynamic keys) and effective, verified at 1440, 1024 and 390.

| Id | Severity | One line |
|---|---|---|
| D-A-1 | major | List / Cards header CTA style (Primary, Secondary) ignored: always tertiary |
| D-A-2 | major | No visible focus ring on Panel, Report and Statistic cards (clipped) |
| D-A-3 | major | Card colour on Image cards: no effect, near-white CTA on white, Image background collapses the card |
| D-A-4 | major | Previous / Next disable while focused; focus falls to body |
| D-A-5 | minor | Card click events never include position |
| D-A-6 | major | Filter List Page types and Content types options don't match the site's page types and taxonomy |
| D-A-7 | minor | Filter List shows raw content-type slugs |
| D-A-8 | minor | Scroll settings shown when no breakpoint scrolls |
| D-A-9 | minor | Edge bleed identical to none in full-width sections |
| D-A-10 | minor | Touch swipe off plus no controls: cards unreachable on touch |
| D-A-11 | minor | Reduced motion support can be switched off |
| D-A-12 | minor | Component ID overrides Anchor ID |
| D-A-13 | minor | Table List Motion Type duplicates Animation Type |
| D-A-14 | minor | Table List items above the maximum vanish in Universal Editor |
| D-A-15 | minor | Table List Item prefilled with sample content |
| D-A-16 | minor | Orphan Table List Header definition |
| D-A-17 | minor | Legacy composite multifields still in List and Filter List dialogs |
| D-A-18 | minor | Technical Filter List option labels and 8 mapping fields |
| D-A-19 | minor | Cards dialog descriptions refer to page metadata |
| D-A-20 | minor | Eager loading sets fetchpriority high on every card |
| D-A-21 | minor | Mouse drag ending on a card still pushes cmp:click |
| D-A-22 | minor | Child depth default 2 (model) vs 1 (code) |
| D-A-23 | minor | Cards card ids change when cards are reordered |
| D-A-24 | minor | Feature card untracked; positions disagree |
| D-A-25 | minor | Filter List announces the result count on page load |
| D-A-26 | minor (suspected) | Card date may shift a day |
| D-A-27 | minor (suspected) | Possible duplicate list ids from two counters |
| D-A-28 | minor | Empty heading for a Table List item without title |
| D-A-29 | minor (suspected) | Filter List ignores hide-in-nav and redirects, unlike List |

