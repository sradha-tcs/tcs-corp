# Block re-audit, group A: Cards / Card, List / List Item, Filter List / Filter Tag / Filter Category / Filter Page, Table List / Table List Item

Reviewer: group A (second, fresh audit, 20 October 2026). Branch `fix/block-reaudit` (main after PR #118 and #119). Repository read-only; evidence scripts in `/tmp/audit2/a/*.mjs`, screenshots `/tmp/audit2/a/*.png`.
Shared code reviewed: `models/_card-list.json` (via the aggregated `component-models.json`), `utils/card-list-config.js`, `decorators/card-list-decorator.js`, `styles/card-list.css`, `decorators/scroller-decorator.js`, `utils/query-index.js`, `decorators/skeleton-decorator.js`, plus the parts of `decorators/data-layer-decorator.js` (clicks, positions) and `decorators/motion-decorator.js` (CONTENT_TARGETS, aria-busy release) these blocks rely on.
Legend: **verified** = reproduced at runtime (local preview `http://localhost:3000/drafts/en/block-library/...`, Chromium 1440x900 unless stated) or proven end to end in code; **suspected** = plausible from code, not reproduced. Usage numbers: `/tmp/audit2/inventory-before.json` (content package 1.0.8).

---

## 0. Shared code (Cards and List; Filter List and Table List where stated)

### 0.1 Additional tab (`classes_*`), identical in the four containers

| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Anchor ID (`classes_anchor`) | text, `anchor-…` | `block-options-decorator.js` makes it the block id; Cards / List: `cardListId` (`card-list-decorator.js:486-492`) uses it unless a stored Component ID exists | Component ID field removed (D-A-12); stored values still win (0 uses) | Retain |
| Hide block (`classes_hideblock`) | boolean false | `styles/styles.css` | none | Retain |
| Animation Type (`classes_animation`) | None + 10 | `motion-decorator.js:30-35`: List / Cards header, feature, empty and each `.list-item` staggered; Table List `.table-list-item` staggered (new, D-A-13); Filter List: whole block, released after the skeleton (`motion-decorator.js:269, 319-332`, `skeleton-decorator.js:77`) | none | Retain |
| Motion Speed / Animation Trigger | conditions on animation | `utils/motion.js` | none | Retain |
| Padding / Margin L R T B | Default + 14 tokens | `styles/styles.css` | none (only `pt-2000` on 2 Lists) | Retain |

### 0.2 Shared card-list fields (`models/_card-list.json`), Cards and List

Normalised by `normalizePresentation` (`utils/card-list-config.js:165-219`); the 21 per-breakpoint fields are read with dynamic keys (`${bp}mode` …, l.168-180), so the inventory's `readByCode=false` for them is a false negative (re-verified).

| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Title (`title`) + Heading type (`titleType`, collapsed) | text; h2-h6, h2 | `buildHeading(props.title, props.titletype…)` `card-list-decorator.js:54`; card titles one level below (l.85-88) | none | Retain |
| Description (`description`) | richtext | l.62-66 | none | Retain |
| CTA link / text / style (`link`, `linkText`, `linkType`, collapsed) | aem-content; text; '' / primary / secondary | l.69-80: style read from the collapsed `<strong>`/`<em>` (`readButtonOptions`, `utils/buttons.js:41-46`) or a `linktype` row (older markup) | D-A-1 fixed (verified at runtime, see List) | Retain |
| Accessible list label (`listLabel`) | text | l.344-347: `aria-label` of the region; set even when the title labels it (`aria-labelledby` wins) | 39 Lists set it with a title (ignored by AT) | Retain |
| Display as teaser (`displayAsTeaser`) | boolean true | l.309, 355-357 (card vs row) | label "teaser" vs the Teaser block (yesterday's advisory, not a defect) | Retain |
| Card style (`cardStyle`) | image / panel / report / stat / mixed, image | `kindOf` `card-list-config.js:135-141` | description now neutral (D-A-19) but, being shared, **the List dialog no longer says that Mixed uses the page's `card-style` metadata** (step 3 of `kindOf`), and the option is still called "Mixed (by page)" in Cards | Retain; correct the description (R-A-4) |
| Card colour (`cardTheme`) | '' + 8 | `themeOf` l.154-156; ignored on image cards since D-A-3 (`card-list-decorator.js:163`) | description doesn't say it applies to panel, report and statistic cards only, nor (List) the page's `card-theme`; "Image background" breaks the whole-card link (R-A-1) | Retain; correct (R-A-1, R-A-4) |
| Image ratio / Panel height | 4 ratios; portrait / compact / auto | classes `ratio-*`, `panel-*` (`card-list.css:280-290, 416-422`) | none | Retain |
| First card as feature (`featureFirst`) | boolean false | `renderCardList` l.331-340, feature gets `data-cmp-id` and position 1 (D-A-24 fixed) | none | Retain |
| Link items, Open links in a new tab, Show image / eyebrow / tags / description / date / CTA, Date format | as yesterday | `renderCard` l.160-230, `renderRow` l.233-253 | none new | Retain |
| Image loading (`imageLoading`) | lazy / eager | l.147-149 lazy/eager on every image; `fetchPriority=high` only on the first image (l.363-367, D-A-20 fixed) | none | Retain |
| Desktop / Tablet / Mobile display, columns, gap, items visible, card width, previous / next, indicator (21 fields) | as yesterday | `applyCardListLayout` l.281-295, CSS `card-list.css:150-260, 808-983` | none new | Retain |
| Equal card height / Stretch cards | false / true | CSS l.127-133 | near-duplicates (advisory) | Retain |
| Scroll snap, Snap alignment, Hide scrollbar, Mouse drag, Keyboard scrolling, Scroll step, Loop, Initial item index, Edge | now conditioned on "any breakpoint scrolls" (D-A-8 fixed, `component-models.json` cards/list) | `scroller-decorator.js`, CSS | Mouse drag: R-A-2 (click swallowed after an outside release); Edge: D-A-9 still open (no description; README `blocks/list/README.md:118` still says "runs to the section edge") | Retain |
| Allow touch swipe (`touchSwipe`) | boolean true, **still in the model** (cards and list, Display tab) | `no-swipe` → `touch-action: pan-y` (`card-list-decorator.js:299`, `card-list.css:186-188`) | **D-A-10 not fixed**: the register's deferral says the field "is not in the current models", but it is | see D-A-10 below |
| Reduced motion support (`reducedMotion`) | removed from the model | `scroller-decorator.js:37-38` always honours `prefers-reduced-motion`; stored values still parsed (`card-list-config.js:215`) and ignored; `reducedmotion` stays in `PRESENTATION_PROPERTIES` (l.46) so a stored row is not mistaken for an item | D-A-11 fixed; Cards README still lists "reduced motion" (`blocks/cards/README.md:50`) | Retain (doc) |
| Component ID (`componentId`) | removed from the model | stored values still read (`card-list-config.js:182`) and still win over the Anchor ID (`card-list-decorator.js:487`); `componentid` stays a property key (l.36) | D-A-12 fixed as decided (0 uses) | Retain |
| When there are no items / cards, Empty message, Analytics, Style options | as yesterday | `cards.js:160-174`, `list.js:239-258`, `data-analytics="off"` | none | Retain |

### 0.3 Status of the shared defects (first audit)

| Id | Status | Evidence (current code / runtime) |
|---|---|---|
| D-A-1 CTA style ignored | **Confirmed fixed** | `card-list-decorator.js:74`; runtime: see List D |
| D-A-2 Focus ring clipped on panel / report / stat | **Confirmed fixed** | `card-list.css:396-399` ring inside the card edge (`outline-offset: calc(-2 * var(--border-width-200))`) |
| D-A-3 Card colour on image cards | **Confirmed fixed** | `card-list-decorator.js:162-164` no theme on image cards; CSS button rules only hit themed (non-image) cards. New side issue on Image background panels: R-A-1 |
| D-A-4 Previous / Next drop focus | **Confirmed fixed (verified)** | `scroller-decorator.js:54-62` `aria-disabled`; runtime: 12 Enter presses on Next of `anchor-cards-scroll-all`, focus stays on `.list-next`, `aria-disabled="true"` at the end (`check3.mjs`). Styled by `styles/styles.css:682` |
| D-A-5 No click position | **Confirmed fixed (verified)** | `data-layer-decorator.js:107-112`; runtime: `cmp:click … "position":2` for the second card |
| D-A-8 Scroll settings always shown | **Confirmed fixed** | conditions on 10 scroll fields (`component-models.json`, cards / list) |
| D-A-9 Edge bleed = none in full-width sections | **Deferred, still reproducible by code** | `card-list.css:205-215, 838-860, 943-965` use `--section-padding-inline`, `0rem` in full-width sections (`styles/styles.css:973-976`). The register says "documented", but the field has no description and the README says "Scroller runs to the section edge (Figma)". Cheap, safe fix now: add the description `"Fixed-width sections only: the cards run into the section gutter. In full-width sections both values look the same."` to `edgePadding` in `models/_card-list.json` and the README row; no code or content change |
| D-A-10 Touch swipe off makes cards unreachable | **Not fixed (deferral premise wrong)** | `touchSwipe` is in both models (Display tab, condition "any breakpoint scrolls"), 0 uses. Cheap, safe fix now: remove the `touchSwipe` field from `models/_card-list.json` and run `npm run build:json`; keep `touchswipe` in `PRESENTATION_PROPERTIES` and, for stored values, ignore it unless the breakpoint has previous / next: in `applyCardListLayout` replace `'no-swipe': !config.swipe` by `'no-swipe': !config.swipe && BREAKPOINTS.every((bp) => config.responsive[bp].mode !== 'horizontal-scroll' \|\| config.responsive[bp].controls)`. Compatible (0 stored values; default behaviour unchanged) |
| D-A-11 Reduced motion switchable | **Confirmed fixed** | field removed; `scroller-decorator.js:37-38` |
| D-A-12 Component ID overrides Anchor ID | **Confirmed fixed (as decided)** | field removed; reader kept |
| D-A-19 Descriptions mention page metadata (Cards) | **Fixed for Cards, regressed for List** | the shared description now omits the page metadata that List does use: R-A-4 |
| D-A-20 fetchpriority on every eager image | **Confirmed fixed** | `card-list-decorator.js:363-367` |
| D-A-21 Drag click tracked | **Confirmed fixed** | `scroller-decorator.js:142, 151` sets / clears `data-dragged`; `data-layer-decorator.js:119` skips it. Related new defect: R-A-2 |
| D-A-24 Feature card untracked | **Confirmed fixed** | `card-list-decorator.js:335-339, 354` (feature position 1, list items offset) |
| D-A-26 Card date shift | **Blocked (unchanged)** | `card-list-config.js:115` keeps `YYYY-MM-DD` of the stored value; needs a UE-stored `date-time` sample (author access) |
| D-A-27 Duplicate list ids | **Not reproduced (unchanged)** | two counters remain (`data-layer-decorator.js:40-46` vs `utils/ids.js` in `cardListId`); legacy Lists get no id from `cardListId` (`list.js:173-177` returns before `block.id = id`), so the collision needs a legacy List and an unanchored List on one page: still theoretical |

---

## Block: Cards (`cards`, class `cards`)

### A. Overview
- Manually authored cards (TCS DS Figma List variations): image, panel, report, statistic, feature, rows of links; grid or horizontal scroll per breakpoint.
- Files: `blocks/cards/cards.js` (191 lines), `cards-data.js` (83), `cards.css` (`@import` of `styles/card-list.css`), `_cards.json`, README; shared card-list modules (section 0).
- Container / item: Cards (key-value, filter `cards` = `card`) holds Card items. Header and presentation on the container; content on the items (overrides: Card style, Card colour, Open in a new tab).
- Usage: 67 instances / 17 pages; 269 Cards.
- Flow: `readBlock` (`cards.js:115-127`) splits property rows (`PRESENTATION_PROPERTIES`) from Card rows; `readCard` (l.71-112) matches cells with `CARD_LAYOUT` (`cards-data.js:17-19`, 19 cells); legacy 1-2-cell cards via `readLegacyText` (l.51-68); `buildManualCards` → `renderCardList` → `trackCardList`.

### B. Status of the first audit's defects (Cards)
D-A-1, 2, 3, 4, 5, 8, 11, 12, 20, 21, 24: confirmed fixed (section 0.3). D-A-19: fixed for Cards (neutral wording `component-models.json` cards `cardStyle` / `cardTheme`), but the option label "Mixed (by page)" is unchanged (R-A-4). D-A-9, D-A-10: open (0.3, exact fixes given). D-A-23 (Deferred): `cards-data.js:82` still `${id}-item-${i + 1}`; re-assessed: the fix (`hash(href || title)`, suffix for duplicates, as List's `withIds` `list-data.js:372-375`) is cheap, but it changes every existing card id in Analytics reports, so the deferral (needs the measurement owner) stands; recommended fix when approved: `.map((card, i, all) => { const key = hash(card.url || card.title || card.description); const dup = all.slice(0, i).filter((c) => hash(c.url || c.title || c.description) === key).length; return { ...card, id: `${id}-item-${key}${dup ? `-${dup + 1}` : ''}` }; })`.

### C. Dialog validation
Content / Display / Additional tabs: section 0.1 and 0.2. Block-specific:

| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| When there are no cards (`emptyBehavior`) | hide / message, hide (template, model, `cards.js:140` agree) | `cards.js:160-174`: hide → block and wrapper `hidden` (not in the editor) | none | Retain |
| Empty message (`emptyMessage`) | text, cond. message | `cards.js:170` | none | Retain |

Defaults: the definition template (`_cards.json`) stores the presentation defaults; they match `normalizePresentation`. No sample content in the template.

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Image / Panel / Report / Statistic | card kinds | `renderCard` l.190-221; whole-card link (title or CTA `::before`) verified on `cards/card-styles` (`check2.mjs`: top-of-card hit is the link for image, panel, report) | Retain |
| Statistic | number, label, description | no default CTA for stat (`card-list-decorator.js:171-174`): a linked stat card links its number (title, l.181), with a CTA label a secondary button; the library's stat cards have no link (not linked, by content) | none | Retain |
| Mixed | per item / automatic | `kindOf` | label (R-A-4) | Retain |
| Card colours (8) on panel / report / stat | colours | verified `cards/card-colours`; **Image background panel: whole-card link lost (R-A-1)** | Correct (R-A-1) |
| Feature first, Rows of links, stat-compact / dividers / header-center | as yesterday | unchanged code paths | Retain |
| Grid / horizontal scroll per breakpoint | layout | classes verified on `cards/grid-and-horizontal-scroll` (16 blocks) | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Semantics | list of cards in a named region | `ul.list-items > li > article`, `role=region` + `aria-labelledby` title / `aria-label` (l.342-347) | none | Pass |
| Headings | logical | titles one level below the list heading (l.85-88) | none | Pass |
| One link per card, accessible name | one tab stop | CTA `aria-label "{label}: {title}"` (l.176) | none | Pass |
| Focus visible | ring on every kind | ring inside the edge for panel / report / stat (`card-list.css:396-399`); Image background panel: ring around the action paragraph only (R-A-1) | R-A-1 | Pass (minor) |
| Contrast with Card colour | 4.5:1 | colours only on panel / report / stat since D-A-3 | none | Pass |
| Scroll region keyboard | Tab to region when it overflows; Arrow Left / Right, Home, End | `tabindex=0` only when overflowing (`scroller-decorator.js:50-51`), keys l.111-124 | none | Pass |
| Previous / Next | `<button>`, names, `aria-controls`, focus kept | verified (D-A-4 fixed) | the disabled Next still pushes `cmp:click` (R-A-3) | Pass |
| Mouse drag | doesn't break activation | **after a drag released outside the scroller the next Enter / tap on a card is swallowed** (verified, R-A-2) | R-A-2 | **Fail (2.1.1, minor)** |
| Touch reachability | every card reachable | `touchSwipe` off + no controls blocks touch scrolling (D-A-10, 0 uses) | D-A-10 | Fail when configured |
| Reduced motion | no smooth scroll / animation | always honoured (D-A-11 fixed) | none | Pass |
| Images / New tab / Indicator / Ids / Editor | as yesterday | `img.alt` from the Card (l.148), `announceNewTab` (l.95-98), indicator `aria-hidden` (l.373), ids suffixed, editor placeholders (`renderEditorItems` l.466-480) | none | Pass |

### F. Data layer
- State: `trackCardList` (`card-list-decorator.js:501-521`): `{cards id}` `tcs-corp/components/cards` + one `…/cards/item` per card (`dc:title`, `xdm:linkURL`, `xdm:position`, `repo:modifyDate`); `data-analytics="custom"` prevents the generic entry. Analytics off → `data-analytics="off"`, no clicks.
- Clicks (central): verified `cmp:click path component.anchor-cards-scroll-all-item-2, interaction card, position 2`. Feature card tracked (D-A-24 fixed).
- Issues: ids position based (D-A-23, deferred, above); a press on an `aria-disabled` Previous / Next is pushed as a click (R-A-3, verified).

### G. Personalization
Item-level candidate (a Card is a self-contained offer); no fields, no runtime (Target not loaded: BLOCKED). Nothing to flag.

### H. Decision
**Retain (Modify minor)**: R-A-1, R-A-2, R-A-3, R-A-4; close D-A-9 / D-A-10 with the fixes above. All changes compatible (no field renamed; removed fields keep their readers).

---

## Block: Card (`card`, class `card`, item of Cards)

### A. Overview
Item of Cards (`core/franklin/components/block/v1/block/item`, template "Card"); 269 instances. 19 cells = 3 tab cells + 16 fields (`imageAlt` and `linkText` collapse into image and link); `CARD_LAYOUT` (`cards-data.js:17-19`) matches the model order field by field (re-checked against `component-models.json` `card`).

### B. Status of the first audit's defects
D-A-3 (Card colour on image cards): fixed (`card-list-decorator.js:163`). D-A-23 (ids by position): deferred (see Cards B). D-A-26: blocked.

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Image (`image`) + alt (`imageAlt`, collapsed) | reference; text | `cards.js:84-92`; `img.alt` (decorator l.148) | none | Retain |
| Eyebrow (`eyebrow`) | text | kicker (l.194, 209, 217) | none | Retain |
| Title (`title`) | text | title / stat number | none | Retain |
| Description (`text`) | richtext | `descriptionOf` keeps rich text and instrumentation (l.129-138); legacy heading / CTA extraction l.51-68 | none | Retain |
| Label (`subtitle`) | text | stat label only (l.211) | none | Retain |
| Tags (`tags`) | aem-tag | `resolveTags` (`cards.js:151-156`), max 3 | none | Retain |
| Date (`date`) | date-time | `toISODate` + `formatDate` (`cards-data.js:36, 54`) | D-A-26 blocked | Retain |
| Content type (`contentLabel`), Reading time (`readingTime`) | text | meta row / report kicker; `{n}m` (l.122-126) | none | Retain |
| Link (`link`) + Link text (`linkText`, collapsed) | aem-content; text | `cards.js:85, 109-110`; unsafe URLs drop the card (`cards-data.js:31-32`) | link text overlaps Title (0 uses; advisory) | Retain |
| Call to action label (`ctaLabel`) | text | CTA (l.172) | none | Retain |
| Open in a new tab (`newTab`) | As the block '' / true / false | `cards-data.js:37, 63`; matcher `^(true\|false)$` (`cards.js:37`) | none | Retain |
| Card style (`kind`) | '' + 4 | `kindOf` step 1 | none | Retain |
| Card colour (`theme`) | '' + 8 | `themeOf` step 1; ignored when the card renders as an image card | not stated in the description (R-A-4); Image background → R-A-1 | Correct (description) |
| Analytics label (`analyticsLabel`) | text | state `dc:title` (l.514) | 0 uses | Retain |
| Accessibility label (`ariaLabel`) | text | link `aria-label` (l.94) | should include the visible text (2.5.3), advisory | Retain |

### D-H
- **D**: per-item style / colour overrides verified on `cards/per-card-styles-and-colours` (classes) and `cards/card-colours`.
- **E**: covered by Cards E (renders inside the Cards list).
- **F**: `{cards id}-item-{n}` (`…/cards/item`), D-A-23 deferred.
- **G**: item-level candidate, no runtime.
- **H**: **Retain**. Container / item split correct (only style, colour and new-tab overrides).

### New defects (shared card-list code; Cards and List)

**R-A-1 (minor, verified) Card colour "Image background": the card isn't clickable, the focus ring only surrounds the button.**
`styles/card-list.css:635-637` gives every child of a `theme-image` card `position: relative`, so the link's `::before` overlay (`card-list.css:379-384`, `inset: 0`) is contained by `p.list-card-action` (or the title) instead of the article. Evidence (`/tmp/audit2/a/check1.mjs`, `cards/card-colours`, block `anchor-cards-colour-image`): card 513px high, overlay 74px (the action paragraph); `elementFromPoint` at the card's top is not the link, while the same point on every other panel / report card is (`check2.mjs`). Reachable with Card colour Image background on Cards (1 use + 1 item), List (1 + 4 List Items).
Fix (layers without positioning the content; compatible, CSS only):
```css
.card-list .list-card.theme-image { isolation: isolate; }
.card-list .list-card.theme-image > .list-card-media { z-index: -1; } /* was 0 */
/* remove: .card-list .list-card.theme-image > :not(.list-card-media) { position: relative; } */
```
The article is already `position: relative` (l.264), so the overlay covers the card again and the ring (`::before` outline) follows the card edge.

**R-A-2 (minor, verified) After a mouse drag released outside the scroller, the next activation of a card is swallowed.**
`decorators/scroller-decorator.js:129-158`: `dragged` is reset only on the next mouse `pointerdown` (l.131-133) or by the capturing `click` on the viewport (l.153-158). When the button is released outside the viewport, no click reaches the viewport, `dragged` stays `true`, and the next click inside it that isn't preceded by a mouse pointerdown (keyboard Enter on a focused card, a touch tap on a hybrid device) is `preventDefault`ed and stopped. Meanwhile `data-dragged` was cleared (l.151), so the data layer still pushes a `cmp:click`. Evidence (`check4.mjs`, `anchor-cards-scroll-all`): Enter on a card link navigates without a drag and after a drag released inside; after a drag released 150px above the scroller, Enter doesn't navigate (URL unchanged) and a `cmp:click` is pushed. WCAG 2.1.1 (minor, needs a mouse drag first).
Fix (one line, compatible):
```js
// pointerup (l.146-152)
setTimeout(() => { dragged = false; delete viewport.dataset.dragged; }, 0);
```
(the click that ends a drag inside the viewport is dispatched before this timeout, so it is still cancelled).

**R-A-3 (minor, verified) A press on a disabled Previous / Next is pushed as a click.**
Since D-A-4 the buttons stay focusable with `aria-disabled="true"`; `go()` ignores them (`scroller-decorator.js:83`), but `data-layer-decorator.js:114-131` doesn't, so every press at the start / end pushes `cmp:click interaction next|previous` (evidence `check3.mjs`: Enter on the `aria-disabled` Next → `cmp:click {"interaction":"next", …}`). Inflates navigation metrics. Fix (central, applies to every `aria-disabled` button or link button, e.g. `styles/styles.css:543-718`): in `onClick`, after the `tracked` check, `if (el.closest('[aria-disabled="true"]')) return;`.

**R-A-4 (minor, verified by reading the models) Card style / Card colour descriptions after D-A-19.**
The shared descriptions (`models/_card-list.json`, cards and list `cardStyle`, `cardTheme`) were made neutral for Cards, but they are shared, so the List dialog no longer says that Mixed / Default use the page's `card-style` / `card-theme` metadata (`kindOf` step 3, `themeOf` step 3, `card-list-config.js:135-156`; documented in AGENTS.md and `list-item` `kind` / `theme` descriptions). Neither says that Card colour only applies to panel, report and statistic cards (D-A-3 fix), and Cards still offers "Mixed (by page)". Fix (dialog only): `cardStyle` description `"A style here applies to every card (an item's own Card style still wins). Mixed: each card's own style, else (List) the page's card-style metadata, else Report content as report cards, cards without an image as panels, others as image cards."`, option label `Mixed` (value `mixed` unchanged); `cardTheme` description `"Panel, report and statistic cards (image cards keep their image). A colour here applies to every card (an item's own Card colour still wins); Default for the style: the card's own colour, else (List) the page's card-theme metadata, else the style's colour."`; same sentence on the `card` / `list-item` `theme` fields. No stored value changes.

---

## Block: List (`list`, class `list`)

### A. Overview
- AEM Core List equivalent: child pages, a fixed list (List Items, plus the legacy Pages multifield) or tagged pages from the query index, rendered with the shared card list (section 0).
- Files: `blocks/list/list.js` (281 lines), `list-data.js` (432, pure, unit tested), `list.css` (`@import` card-list.css), `_list.json`, README; `utils/query-index.js`, `utils/redirects.js`, `decorators/skeleton-decorator.js`.
- Container / item: List (key-value, filter `list` = `list-item`) + List Items (overrides by link).
- Usage: 229 instances / 139 pages (sources: parent 50, fixed 82, tags 97); 364 List Items.
- Flow: `readBlockConfig` (`list.js:90-155`) → `normalizeConfig` (`list-data.js:69-93`) → `renderWhenLoaded` (skeleton after 150 ms, `list.js:194-280`) → `buildCards` (discover, dedupe, sort, limit, ids `list-data.js:406-432`) → tag labels → `renderCardList` → `trackCardList`. Lists made before (one-cell title / CTA rows) render the header only (`list.js:173-177`).

### B. Status of the first audit's defects (List)
- Shared: section 0.3 (D-A-1, 2, 3, 4, 5, 8, 11, 12, 20, 21, 24 confirmed fixed; D-A-9, D-A-10 open; D-A-19 regressed for List → R-A-4; D-A-26 blocked; D-A-27 not reproduced).
- D-A-1 at runtime: `list/figma-variations` block 05 (`<strong><a>All news`) → `button primary`; block 02 (plain link) → `button tertiary`, identical on aem.page and the local preview (`bc.mjs`).
- D-A-17 (Corrected: "labelled as authored before items"): **not fixed for List**: `pageItems` is still labelled "Pages" and its description still invites authors to "Add a page per item (Add); drag the items to change the order" (`component-models.json` list `pageItems`), i.e. a composite multifield, which AGENTS.md says doesn't render from content packages (0 uses). Exact fix (dialog only): label `"Pages (authored before List Items)"`, description `"Lists made before List Items. Add List Items instead (Add on the List)."`; reader kept (`list.js:143-144`). The Filter List counterpart says "Pages (authored before Pages items)": should read "(authored before Page items)".
- D-A-22: **Confirmed fixed** (`list-data.js:78` fallback 2).

### C. Dialog validation
Content (header), Display and Additional tabs: section 0. Block-specific fields:

| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| List source (`source`) | parent / fixed / tags, fixed (template, model, code agree) | `list-data.js:74, 411-429` | none | Retain |
| Pages (`pageItems` container, `page`) | cond. fixed | `linkPathsOf(props.pageitems)` `list.js:143`, merged with List Items (`mergeFixedItems` `list-data.js:385-398`) | D-A-17 not fixed for List (above) | Deprecate (relabel; keep reader) |
| Parent page (`parentPath`) | aem-content, cond. parent | `pathOf` `list.js:77-82` → `resolveParentPages` (`list-data.js:132-138`) | none | Retain |
| Use the current page when empty (`parentUseCurrentPage`, `tagsUseCurrentPage`) | boolean true | `list-data.js:412, 416` | none | Retain |
| Direct children only (`directChildrenOnly`) / Child depth (`childDepth`) | true; 2 (1-10) | `list-data.js:71, 78` | none (D-A-22 fixed) | Retain |
| Search root (`rootPath`), Tags (`tags`), Match (`tagMatch`), Include descendant pages (`includeDescendants`), Maximum search depth (`maxDepth`) | cond. tags | `resolveTagPages` / `applyTagMatching` incl. child tags (`list-data.js:141-174`); current page excluded (l.424) | none | Retain |
| Order by (`orderBy`) / Sort order (`sortOrder`) | manual / title / lastModified; asc / desc (cond. not manual) | `sortCards` l.356-366 (value normalised `lastmodified`) | none | Retain |
| Maximum items (`maxItems`) | 0 = all | `limitCards` l.368; caps the skeleton (`card-list-decorator.js:417`) | none | Retain |
| When there are no items (`emptyBehavior`) | hide / message / fallback, message | `list.js:218-258` (fallback re-runs as fixed; hide not applied on author) | index failure = "no items" (advisory) | Retain |

Stored values of removed fields (Component ID, Reduced motion, verified with a synthetic List, `synthetic.mjs`): the rows are still recognised as properties (no stray item; `card-list-config.js:36, 46`), `reducedMotion=false` is ignored (motion always honoured), and a stored Component ID still becomes the block id (`my-list` instead of the Anchor ID `anchor-synthetic-list`) and the card id prefix (`my-list-item-3e6e85`): data layer ids stay stable for such Lists (compatible), at the cost of `#anchor-…` links when both are set (0 uses, accepted in D-A-12).

### D. Variations
| Variation | Purpose | Result (verified live and local, `bc.mjs`) | Action |
|---|---|---|---|
| Child pages, child depth | section listings | `list/sources`: 4 / 8 cards, same on aem.page and locally | Retain |
| Fixed list (List Items), fallback | curated pages / links | `list/sources` fixed 4, fallback 2 | Retain |
| Tagged pages (any / all) | related content | 28 / 9 cards | Retain |
| Order by title / last modified, max items | ordering | 4 / 5 / 4 cards | Retain |
| Figma variations 01-14 | card styles, feature, rows, stats | 14 blocks, identical card counts live and local, CTA styles correct | Retain |
| Card style / colour from pages (`card-style`, `card-theme` metadata) | page-driven style | `kindOf` / `themeOf` step 3 | Retain (dialog description R-A-4) |
| Lists made before | title + CTA only | local (one-cell rows): header only, `list-legacy`. **aem.page: "There are no items to show." under the header**: the library page there is not a legacy List (the package writes it as a key-value List with the template defaults, `p108/…/lists-made-before/.content.xml`: `key-value="true"`, `source="fixed"` …), so the legacy path isn't exercised on AEM (R-A-8). Real Lists of the first model (012cb7b, template without `key-value`) are delivered as one-cell rows and still render as legacy (code path `list.js:101`) | Correct the library sample (R-A-8) |
| Skeleton | data later than 150 ms | verified with the index delayed 1.2 s (`skeleton.mjs`, `animation/repeated-items`): skeleton + `aria-busy=true` + `data-analytics=pending`, then cards, `aria-busy` removed, state pushed once (no duplicate component ids), content animation released and cleaned (`motion-target` 0) | Retain |

### E. Accessibility
As Cards E (shared rendering; R-A-1, R-A-2, D-A-10 apply). List-specific:

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Loading state | not announced as content | skeleton `aria-hidden`, block `aria-busy` (`skeleton-decorator.js:57-62`), verified at runtime | none | Pass |
| Empty state | text | `p.list-empty` (`card-list-decorator.js:454-456`) | none | Pass |
| Region name | title or label | `aria-labelledby` the title, else List label / "List" (l.344-347); several untitled Lists are all "List" regions | advisory: use the region role only when the list scrolls | Pass (advisory) |
| Headings | logical | card titles below the list heading | none | Pass |

### F. Data layer
State `tcs-corp/components/list` (+ `xdm:listSource`, `xdm:variant`) and `…/list/item` per card; ids `{list id}-item-{hash(url)}` (`list-data.js:372-375`), stable across reorder. Clicks central with `position` (D-A-5 fixed). Skeleton keeps the block out of the generic tracking until rendered (`data-analytics="pending"` → `custom`, verified no duplicate). R-A-3 applies to Previous / Next.

### G. Personalization
Data source (index); no fields, no runtime (BLOCKED).

### H. Decision
**Retain (Modify minor)**: relabel `pageItems` (D-A-17), R-A-4 descriptions, R-A-8 library sample; shared fixes R-A-1 to R-A-3, D-A-9 / D-A-10. Compatible: no field renamed, readers kept.

---

## Block: List Item (`list-item`, class `list-item`, item of List)

### A. Overview
Item of List; 364 instances. Cells per `ITEM_LAYOUT` (`list-data.js:28-29`: 3 tab cells + 13 fields; `linkText`, `imageAlt` collapsed), re-checked against `component-models.json` `list-item` (Link / Content / Display tabs, field order identical). Matched with `withoutTabCells` + `matchCells` (`list.js:110-111`); items without a link are skipped (l.135) and shown as editor placeholders.

### B. Status of the first audit's defects
D-A-3 (Card colour on image cards): fixed. Nothing else registered for the item.

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Page or link (`link`) + Link text (`linkText`, collapsed) | aem-content; text | `list.js:112-118`; `linkTextOf` l.69-74 (title only when the card has none) | link text overlaps Title (0 uses, advisory) | Retain |
| Open in a new tab (`newTab`) | As the list '' / true / false | `applyOverrides` `list-data.js:293` | none | Retain |
| Title (`headline`), Description (`summary`), Image (+ alt), Eyebrow, Tags, Label (`subtitle`), Call to action label | text / reference / aem-tag | `applyOverrides` l.271-298 (field by field over the page's card) | none | Retain |
| Card style (`kind`) / Card colour (`theme`) | '' + 4 / '' + 8 | `kindOf` / `themeOf` step 1; descriptions mention the page metadata correctly | Card colour on an image card has no effect (not stated, R-A-4) | Retain |
| Analytics label, Accessibility label | text | state `dc:title`; link `aria-label` | 0 uses | Retain |

### D-H
- **D**: overrides verified on `list/card-colours-and-overrides` (yesterday, code unchanged); items of non-fixed lists only as fallback (verified `anchor-list-fallback`, 2 cards) and as editor hints (`list.js:233-236`).
- **E**: as List. Two List Items for the same page: the second is deduplicated (`deduplicateCards`) and, in the editor, shown as a placeholder with the hint "choose a page or a link" (`renderEditorItems`), which is misleading but editor-only (advisory).
- **F**: card id from the URL hash, `data-cmp-id` on the `li`.
- **G**: item-level candidate, no runtime.
- **H**: **Retain**.

### New defects (List)

**R-A-8 (minor, verified on aem.page) The "Lists made before" library sample isn't a legacy List on AEM.**
aem.page `language-master/en/block-library/list/lists-made-before` (current code, package 1.0.6; 1.0.8 identical): the block is delivered as key-value rows with the template defaults (`source fixed`, `emptyBehavior message`, …), so it renders as a new, empty fixed List: header plus "There are no items to show." (`bc.mjs`: live `legacy:false, empty:"There are no items to show."`, local `legacy:true`). The package (`.home-work/bl`, `p108/…/lists-made-before/.content.xml`) writes `key-value="true"` and every template default on the node, which a List of the first model (012cb7b, template `{name, model, titleType}`, no `key-value`) never had; so the page doesn't demonstrate what it documents, and the legacy path (`list.js:101, 173-177`) is only exercised by the local hand-written draft. Fix (library spec only): write the legacy example with only `name="List" model="list" titleType="h2" title=… link=… linkText=… linkType=…` (no `key-value`, `filter`, defaults or `modelFields`) so AEM renders one-cell rows; recheck on aem.page. No code change.

---

## Block: Filter List (`filter-list`, class `filter-list`)

### A. Overview
- Content discovery listing of the locale's pages (query index) or a manual list: filter pills, advanced filter panel, hero / featured spotlights, masonry / grid / list layouts, Load more.
- Files: `blocks/filter-list/filter-list.js` (706 lines, own card markup), `filter-list.css`, `_filter-list.json`; `decorators/masonry-decorator.js`, `skeleton-decorator.js`, `editor-item-decorator.js`, `utils/query-index.js`, `utils/taxonomy.js`, `utils/data.js`, `contentTypeLabel` from `utils/card-list-config.js`. No README.
- Items: Filter Tag (1 cell), Filter Category and Filter Page (tab cell + 2), read by `readItems` (`filter-list.js:105-133`) with `itemRows(…, KEY_VALUE_ITEM)`; the multifields authored before are still read (l.79-99, 148, 153, 157, 162-164).
- Usage: 32 instances / 11 pages; items: 37 tags, 23 categories, 50 pages.

### B. Status of the first audit's defects
| Id | Status | Evidence |
|---|---|---|
| D-A-6 Page / Content type options | **Confirmed fixed** | `pageTypes` article / blog / press-release (= `models/_page.json:39-51` minus home); `contentTypes` the 9 taxonomy values (local index / dummy pages use exactly these tags: article, blog, case-study, event, insights, news, press-release, report, whitepaper) |
| D-A-7 Raw content-type slugs | **Confirmed fixed (verified)** | `eyebrowOf` l.382-384 (meta and report kicker); runtime meta "Blog", "Case Study", "Article" (`filterlist.mjs`); `isReport` still on the raw value (l.395) |
| D-A-17 Legacy multifields in the dialog | **Partly fixed** | Filter List labels say "(authored before … items)"; `primaryTags` and `advancedCategories` remain always visible (no condition) and "Pages (authored before Pages items)" should read "Page items"; List not relabelled (see List B). Whether a UE condition can test a container's stored children is unverified, so keep them visible, fix the label text and remove them after the production content check named in the register (0 uses in the packages) |
| D-A-18 Technical labels | **Confirmed fixed (as decided)** | Featured rule options "Marked as featured (featured metadata)", "Priority 1 to 3 (priority metadata)", "Manual"; the 8 mapping fields kept, with descriptions |
| D-A-25 Count announced on load | **Confirmed fixed (verified)** | `role=status` added one frame after the first count (l.461-463, 520-524); MutationObserver log: text "34 results" first, `role=status` after |
| D-A-29 hide-in-nav / redirects (Deferred) | **Still open, product decision** | `candidatesOf` (l.200-213) neither excludes `hide-in-nav` nor follows `/{locale}/redirects.json`; List does (`list-data.js:123-124`, `list.js:213`). Not reproducible locally (no `hide-in-nav` page in the local index). Exact fix once decided: move `isListable` to `utils/query-index.js` (`export const isListable = (page) => !!page?.path && !isYes(columnOf(page, 'hide-in-nav'))`, re-exported by `list-data.js`), use it in `candidatesOf` for the index source (not for the manual list, which the author chose), and add `loadRedirects()` to the `Promise.all` (l.288-290) with `urlOf = (page) => pageLink(resolveRedirect(redirects, text(page, map.url) \|\| page.path))`. Compatible (hidden pages disappear from discovery lists, which is the decision to take) |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Title (`title`) | text | l.453-454, always `h2` | no heading type (advisory) | Retain |
| Description (`description`) | richtext | l.455-459 | none | Retain |
| Show result count (`showResultCount`) | false | l.461 visible vs visually hidden; status always present | none | Retain |
| Default layout (`layout`) | masonry / grid / list | l.142, 466-467, 690 | "Default" implies a visitor switch (advisory) | Retain |
| Cards per page / Load more count | 9 / 6 | `count` l.60 (min 1, no max in code vs 48 in the model) | none | Retain |
| Datasource (`source`), Root path (`rootPath`) | query-index / manual | l.145-146, `candidatesOf` l.200-213 | none | Retain |
| Pages (`pageItems`) | legacy container, cond. manual | l.148 | label text (D-A-17) | Retain (relabel) |
| Page types (`pageTypes`), Content types (`contentTypes`) | fixed options | l.149-150, 210-211 (`toClassName`, so "Case study" / "Press Release" index values match) | none (D-A-6 fixed) | Retain |
| Sort by (`sortBy`) | latest / featured / priority / alphabetical | `sorter` l.189-197 | none | Retain |
| Primary filter category (`primaryCategory`) | aem-tag | l.152, 308-311 | none | Retain |
| Primary filter tags (`primaryTags`, legacy container) | always visible | `readPrimaryTags` l.79-91 | D-A-17 | Retain (relabelled) |
| Show All filter / Allow multi select | true / false | l.550, 571; pills always AND (l.484-486) | Filter logic only for the advanced options (advisory) | Retain |
| Enable advanced filter / Advanced filter categories (legacy) / Filter logic | true / container / and | l.315-319, 94-99, 489 | none new | Retain |
| Card style (`cardStyle`) | default / compact / featured / mixed | `standardCard` l.397-428 | "Featured" overloaded (advisory, yesterday) | Retain |
| Enable featured cards / Featured rule / Featured pages (legacy) / Featured card count | true / featured / — / 2 | `arrange` l.236-246 | none | Retain |
| Enable hero card / Hero rule / Hero page | false / featured / — | l.225-234 | none | Retain |
| Image source … Author source (8 mapping fields) | text defaults | `readConfig` l.169-178 | kept by decision (D-A-18) | Retain |
| Additional tab | section 0.1 | whole block animates after the skeleton (verified `skeleton.mjs`) | none | Retain |

Definition template, model and code defaults agree (checked field by field).

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Masonry / Grid / List; Default / Compact / Featured / Mixed | layouts, card kinds | code unchanged since yesterday's runtime check; `filter-list/filters` identical live and local (9 cards, "34 results", 5 / 1 pills) | Retain |
| Pills single / multi, advanced AND / OR | filtering | verified: pill `aria-pressed` toggles single select; advanced option narrows to "1 result" | Retain |
| Hero / featured rules, manual list | spotlights | code paths l.216-248 | Retain |
| Content / page types | restrict | options fixed (D-A-6) | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Filter pills | toggle buttons | `<button aria-pressed>` in `role=group` named "Filters", `aria-controls` results (l.546-578), verified | none | Pass |
| Advanced filter | disclosure, Escape returns focus | Enter on the toggle → `aria-expanded=true`, focus on the first checkbox; Space checks it; Escape → panel hidden, focus on the toggle, `aria-expanded=false` (verified) | none | Pass |
| Selected count | announced | toggle `aria-label "Advanced filters, 1 selected"` (verified), badge `aria-hidden` | none | Pass |
| Results | polite status, not on load | verified (D-A-25 fixed) | none | Pass |
| Load more | focus to the first new card, count announced | verified: focus on `a.filter-list-card-link`, status "Showing 15 of 34" | none | Pass |
| Empty / reset | message, reset, focus back | l.525-538, 669-675 | after an index failure "Try selecting another filter" is misleading (advisory) | Pass |
| Card focus, masonry order, headings, images, loading | as yesterday | code unchanged | none | Pass |

### F. Data layer
Generic entry `tcs-corp/components/filter-list` after the skeleton (`data-analytics` pending → removed → `trackBlocks`). Verified events: toggle `cmp:click interaction button`, option `cmp:change filter-option value tcs-corp:industry/aerospace checked true`, Load more `cmp:click load-more`, pill `cmp:click filter value tcs-corp:industry/banking`. No duplicates. Card links are plain `link` clicks of the block (no ids; no business need stated).

### G. Personalization
Data source (index + rules); no fields, no runtime.

### H. Decision
**Retain**. Fix the D-A-17 label texts; decide D-A-29. Longer term: one card implementation with the card-list decorator (yesterday's proposal). Compatible.

---

## Block: Filter Tag (`filter-list-tag`, class `filter-tag`)
- **A**: item of Filter List, 1 field = 1 cell; 37 instances; `filter-list.js:119-123`.
- **B**: no register defect.
- **C**: | Tag (`tagId`) | aem-tag, required | pill in item order, label from the taxonomy (l.312-314) | none | Retain |
- **D** none. **E** pill (Filter List E, Pass). **F** `data-cmp-value` = tag id (verified). **G** not personalizable. **H** **Retain**.

## Block: Filter Category (`filter-list-category`, class `filter-category`)
- **A**: item, tab + 2 fields (3 cells, `CATEGORY_LAYOUT` l.49); 23 instances; l.124-130.
- **B**: no register defect.
- **C**:

| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Category label (`categoryLabel`) | text | fieldset legend (l.601); empty → taxonomy label of the root (l.317) | none | Retain |
| Taxonomy root (`taxonomyRoot`) | aem-tag, required | options = tags below the root used by the pages (l.318) | a category with no used tag is dropped silently (advisory) | Retain |

- **D** none. **E** fieldset / legend, labelled checkboxes (verified). **F** `cmp:change filter-option` (verified). **G** not personalizable. **H** **Retain**.

## Block: Filter Page (`filter-list-page`, class `filter-page`)
- **A**: item, tab + 2 fields (`PAGE_LAYOUT` l.50); 50 instances; l.112-118.
- **B**: no register defect.
- **C**:

| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Page (`page`) | aem-content, required | `pathsOf` l.64-71 | none | Retain |
| Use (`pageRole`) | listed / featured, listed | listed → manual list (Datasource Manual only), featured → featured pages (Featured rule Manual only) (l.117, 148, 162-164) | ignored in the other modes without a hint (advisory) | Retain |

- **D** listed / featured. **E** n/a. **F** none. **G** item-level candidate (manual pins), no runtime. **H** **Retain**.

---

## Block: Table List (`table-list`, class `table-list`)

### A. Overview
- Heading + view-all CTA + up to 10 rows (Figma List variations): industries (title, description, arrow), solutions (description, large title, outline button), products (description, number, large title, diagonal arrow).
- Files: `blocks/table-list/table-list.js` (326 lines), `table-list.css`, `_table-list.json`; no README; no card-list code.
- Container / item: Table List (key-value, filter `table-list` = `table-list-card`) + Table List Item. Table List Header definition removed (D-A-16); its reader stays (`table-list.js:134-135, 188-200`).
- Usage: 23 instances / 12 pages; 84 items.

### B. Status of the first audit's defects
| Id | Status | Evidence |
|---|---|---|
| D-A-13 Motion Type duplicates Animation Type | **Confirmed fixed (verified, also on old content)** | `motion` removed from the model; `readBlock` still reads it (`FIELDS` l.28-31, `motion` l.160) and `addLegacyMotion` maps fade → `motion-fade-in`, slide → `motion-slide-up`, reveal → `motion-fade-up` (+ `motion-slow`) only when no Animation Type is set (`table-list.js:300, 311`, `utils/motion.js:91-98`); items animate staggered (`motion-decorator.js:35`). aem.page `table-list/motion` (old content with `motion="none|fade|slide|reveal"`): classes `motion-fade-in motion-slow`, `motion-slide-up motion-slow`, `motion-fade-up motion-slow`, none for `none`; after scrolling every `motion-target` was removed (animations played and cleaned), identical to the local preview. Synthetic Table List with `motion=fade` and the class `motion-scale-in` (`synthetic.mjs`): only `motion-scale-in`, Animation Type wins. Related: R-A-7 |
| D-A-14 Items above the maximum vanish in UE (Deferred) | **Still open; cheap and safe now** | `table-list.js:319-323` slices the rows. Exact fix (editor only, no change on the page): `config.items.forEach((row, i) => { const over = i >= config.maxItems; if (over && !isEditing()) return; const item = decorateItem(row, i, config); item.setAttribute('role', 'listitem'); if (over) item.classList.add('table-list-item-over'); list.append(item); });` with `.table-list .table-list-item-over { opacity: 0.5; }` (and an optional placeholder hint `tableListOverMax`, "Not shown: above Maximum items"). The row keeps its instrumentation (`decorateItem` keeps the row element, l.292-295), so it stays selectable |
| D-A-15 Sample content in new items | **Confirmed fixed** | `table-list-card` template `{name, model}` only; model `title` / `description` without values. Old items keep their authored values (content), e.g. TwinX "Risk free business experimentation and decision intelligence" renders on aem.page `table-list/table-list` as authored (correct: it's content now) |
| D-A-16 Orphan Table List Header | **Confirmed fixed** | definition and model gone (`component-definition.json`), legacy reader kept |
| D-A-28 Empty heading | **Confirmed fixed (verified)** | l.284-285; synthetic item without title: 0 `.table-list-title`. Related: R-A-5 (its link name) |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Variation (`variations`) | industries / solutions / products, industries | class + `VARIATION_DEFAULTS` (l.43-47, 145-146, 310) | option names are design-file names (advisory) | Retain |
| Heading (`listHeading`) + Heading Type (`listHeadingType`, collapsed) | text; h2-h4, h2 | l.151-152, 191-197; items one level below (l.313-314). Inventory `readByCode=false` for the type is a false negative (read from the delivered tag) | none | Retain |
| Maximum items (`maxCards`) | 4 (1-10) | l.147, 153, 319 | D-A-14 | Retain (fix editor) |
| Text / Link / Style (`viewAllLabel`, `viewAllLink`, `ctaStyle`) | text; aem-content; '' (variation default) / primary / secondary / tertiary | l.154-156, 199-208; CTA only with a link on the page | generic labels (yesterday's rename advice not applied; advisory) | Retain (rename "View all text / link / style") |
| Numbers (`numbers`) | '' / show / mobile / hide | l.157, 271-275 | none | Retain |
| Item link (`itemAction`) | '' / arrow / arrow-up-right / button | `buildAction` l.225-247 | none | Retain |
| Button text (`itemButtonLabel`) | **"Explore" in the definition template and the model** | l.159, 230 (fallback `t('explore', 'Explore')`) | the English default is stored on every new Table List, so other locales show "Explore" instead of the placeholder translation (R-A-6) | Correct (no default) |
| Additional tab | section 0.1 | items staggered (`motion-decorator.js:35`) | legacy Motion Type can't be turned off (R-A-7) | Retain |

### D. Variations
| Variation | Purpose | Result (aem.page = local, `bc.mjs`) | Action |
|---|---|---|---|
| Industries | rows with arrow, numbers on mobile | `industries numbers-mobile`, H2 + H3 items, 4 / 2 / 3 items per example | Retain |
| Solutions | large title + button | `solutions numbers-hide` | Retain |
| Products | numbers + diagonal arrow, trademarks | `products numbers-show`, "TwinX™", "ignio®" | Retain |
| Numbers / item link / CTA style overrides | per block | identical classes live and local | Retain |
| Motion Type (old content) | item reveal | mapped to Animation Type (D-A-13), verified on aem.page | Retain reader |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| List semantics | list | `div role=list`, rows `role=listitem` (l.316-323) | native `ul/li` preferable (advisory) | Pass |
| Headings | hierarchy | H2 heading, H3 items (verified); no empty heading (D-A-28 fixed) | none | Pass |
| Item link name | descriptive | "Explore {title}" / "{text}: {title}"; **an item without a title gets "Explore " / "Explore: "** (verified, R-A-5) | R-A-5 | **Fail (2.4.4, minor)** |
| Whole-row link, focus | one tab stop, visible ring | arrow `::after` covers the row (CSS l.129-133), ring l.141-144 | none | Pass |
| Unlinked items | no fake controls | `span aria-hidden`; editor-only button `tabindex=-1`, `aria-hidden` (l.172-183) | none | Pass |
| Reduced motion | no animation | motion decorator skips (`canAnimate`), CSS l.248-252 | none | Pass |

### F. Data layer
Generic `trackBlocks` entry; no `data-cmp-*`; clicks `interaction: link` on the block (no item position). No business need for more.

### G. Personalization
Entire block (editorial); no fields, no runtime.

### H. Decision
**Retain (Modify minor)**: D-A-14 (editor), R-A-5, R-A-6, R-A-7; rename the CTA labels (advisory). Later candidate for a "rows" presentation of the card list (yesterday's redundancy assessment stands). Compatible.

### New defects (Table List)

**R-A-5 (minor, verified) An item without a title gets an incomplete link name.**
`table-list.js:289` passes `textOf(titleCell)` to `buildAction`, which builds `t('exploreItem', 'Explore {title}')` (l.241) or `'{text}: {title}'` (l.233). Synthetic item with only a description and a link (`synthetic.mjs`): arrow `aria-label="Explore "`; the destination isn't named (WCAG 2.4.4). Fix (compatible): `const name = textOf(titleCell) || textOf(descriptionCell) || linkTextOf(linkCell); const action = buildAction(linkCell, name, config);` and, when `name` is empty, drop the `aria-label` so the link keeps its own text (or use the placeholder `t('explore', 'Explore')` alone).

**R-A-6 (minor, verified by reading the model) "Explore" stored on every new Table List.**
`_table-list.json` definition template `itemButtonLabel: "Explore"` (also the model `value`), contrary to the AGENTS.md rule "no sample content in templates or model defaults"; inventory: `itemButtonLabel` set on 23 / 23 Table Lists. The code already falls back to the placeholder `t('explore', 'Explore')` (l.230), so the stored English value only blocks the translation in de-de, fr-fr, ja-jp… Fix: remove `itemButtonLabel` from the template and its `value` from the model (description: "Default: Explore (placeholder explore)"); `npm run build:json`. Stored values stay (authors can clear them; a content migration may clear values equal to "Explore").

**R-A-7 (minor, verified by code) A legacy Motion Type can't be switched off by authors.**
The `motion` field is gone from the dialog, and Animation Type "None" stores `''`, which `addLegacyMotion` (`utils/motion.js:91-98`) can't tell from "never set", so a Table List authored with Motion Type Fade / Slide / Reveal always animates unless another Animation Type is chosen. Fix (compatible, dialog only): keep a deprecated select in `_table-list.json` that appears only where a value is stored: `{ "component": "select", "name": "motion", "label": "Motion Type (authored before Animation Type)", "options": [{"name": "None", "value": "none"}, {"name": "Fade", "value": "fade"}, {"name": "Slide", "value": "slide"}, {"name": "Reveal", "value": "reveal"}], "condition": {"and": [{"var": "motion"}, {"!==": [{"var": "motion"}, "none"]}]} }`, or migrate production content as `.home-work/bl/bl-migrate.mjs:55-57` does for the library (`motion` → `classes_animation` + `motion-slow`, then delete `motion`). The same applies to the Hero's `classes_motion` (other group).

---

## Block: Table List Item (`table-list-card`, class `table-list-item`)
- **A**: item of Table List (title "Table List Item", class from the template name); 84 instances; cells matched by content (`ITEM_MATCHERS` l.101-107), `linkText` collapsed into `link`. 5 fields, no tabs (re-checked).
- **B**: D-A-15 fixed (no sample values in template / model), D-A-28 fixed.
- **C**:

| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Number (`number`) | text | l.271-275; blank → 01, 02 …; matcher `^\d{1,3}[.)]?$` (l.78) | positional when all 5 cells are delivered (`matchCells`), so "A1" is read correctly; only rows with left-out cells fall back to content matching (advisory) | Retain |
| Title (`title`) | text, no default (D-A-15) | l.276 | none | Retain |
| Trademark (`trademark`) | '' / tm / r | `<sup>` ™ / ® (l.277-283) | none | Retain |
| Description (`description`) | richtext | `buildDescription` l.250-261 (instrumentation kept) | none | Retain |
| Link (`link`) + Button text (`linkText`, collapsed) | aem-content; text | `linkOf` l.63-64, `linkTextOf` l.70-75 (button item link only) | none | Retain |

- **D**: per variation (Table List D). **E**: Table List E (R-A-5). **F**: none. **G**: item-level candidate, no runtime. **H**: **Retain**.

---

## Backward compatibility check (aem.page: current code on the older installed content, package 1.0.6)

PR #119 changed no file of this group (`git diff --stat c3ed398 19ff770` on the group's files: empty); the checks cover the first audit's changes. 8 pages loaded on `https://main--tcs-corp--sradha-tcs.aem.page/language-master/en/block-library/…` and compared with the local preview (`/tmp/audit2/a/bc.mjs`, `bc-live.json`, `bc-local.json`, `check2-live.mjs`).

| Change (first audit) | Old content on aem.page | Result | Evidence |
|---|---|---|---|
| Table List Motion Type removed, mapped to Animation Type (D-A-13) | `table-list/motion`: 4 Table Lists with `motion` none / fade / slide / reveal | **Renders correctly**: `motion-fade-in motion-slow`, `motion-slide-up motion-slow`, `motion-fade-up motion-slow`, nothing for none; items animate and every `motion-target` is cleaned; no console error; same as local | `bc-live.json` |
| Table List sample defaults removed (D-A-15), Header definition removed (D-A-16) | `table-list/table-list`: 7 Table Lists incl. TwinX items with the old sample description | **Renders correctly**: item counts, H2 / H3 levels, "TwinX™", "ignio®", 0 empty headings, identical to local | `bc-live.json` |
| CTA style from the collapsed link (D-A-1), Card colour scope (D-A-3) | `list/figma-variations` (14 Lists), `cards/card-styles` (8 Cards), `cards/card-colours` | **Correct**: identical card counts; 05 `button primary`, 02 `button tertiary`; colours only on panel / report / stat. R-A-1 reproduced on aem.page too (Image background panel: top of the card isn't the link) | `bc-live.json`, `check2-live.mjs` |
| Lists: Component ID / Reduced motion removed (D-A-11, D-A-12) | no List in packages 1.0.6 / 1.0.8 stores them (`grep componentId=\|reducedMotion=`: only a Separator) | **Compatible by code and synthetic test**: stored rows stay properties, `reducedMotion` ignored, Component ID still the id (stable data layer ids) | `synthetic.mjs` |
| List sources, fixed / fallback, order, max | `list/sources` (10 Lists) | **Identical** live and local | `bc-live.json` |
| Filter List options / labels (D-A-6, D-A-18), live region (D-A-25) | `filter-list/filters` (4 Filter Lists) | **Identical** (9 cards, "34 results", pills) | `bc-live.json` |
| Lists made before | `list/lists-made-before` | **Differs**: aem.page shows "There are no items to show." (library sample stored as a key-value List with defaults, not a legacy List): R-A-8 (library content, not a code regression) | `bc-live.json` |

No console errors on any of the 8 aem.page loads.

---

## Summary

- **Components reviewed (10)**: Cards, Card, List, List Item, Filter List, Filter Tag, Filter Category, Filter Page, Table List, Table List Item; shared modules `models/_card-list.json`, `utils/card-list-config.js`, `decorators/card-list-decorator.js`, `styles/card-list.css`, `decorators/scroller-decorator.js`, `utils/query-index.js`, `decorators/skeleton-decorator.js` (+ data-layer and motion decorator parts).
- **Register re-verification (D-A-1 … D-A-29)**:
  - Confirmed fixed: 20 (D-A-1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 15, 16, 18, 20, 21, 22, 24, 25, 28), plus D-A-19 for Cards (regressed for List, below); runtime-verified among them: D-A-1, 4, 5, 7, 13, 25, 28.
  - Not fixed: 2: **D-A-10** (the deferral says the Touch swipe field isn't in the models; it is, in Cards and List; exact fix given) and **D-A-17 partly** (List `pageItems` not relabelled; Filter List label typo).
  - Regressed: 1: **D-A-19** for List (the shared, now neutral description drops the page `card-style` / `card-theme` metadata List uses) → R-A-4.
  - Still deferred / open: D-A-9 (fix now: one description; the register's "documented" isn't true), D-A-14 (cheap editor-only fix given), D-A-23 (needs the measurement owner; fix given), D-A-29 (product decision; fix given). D-A-26 blocked, D-A-27 not reproduced (unchanged).
- **New defects**:

| Id | Severity | One line |
|---|---|---|
| R-A-1 | minor (verified, local and aem.page) | Card colour "Image background": card not clickable outside the CTA, ring only around the button (`card-list.css:635-637`) |
| R-A-2 | minor (verified) | After a mouse drag released outside the scroller, the next keyboard / touch activation of a card is swallowed (and still tracked) (`scroller-decorator.js:146-158`) |
| R-A-3 | minor (verified) | A press on an `aria-disabled` Previous / Next is pushed as `cmp:click` (`data-layer-decorator.js:114-131`) |
| R-A-4 | minor | Card style / Card colour descriptions: List lost the page-metadata rule; colour scope (panel / report / stat) not stated; "Mixed (by page)" on Cards (`models/_card-list.json`) |
| R-A-5 | minor (verified) | Table List item without title: link named "Explore " / "Explore: " (`table-list.js:289`) |
| R-A-6 | minor | Table List template stores the English "Explore" Button text on every new block, bypassing the placeholder translation (`_table-list.json`) |
| R-A-7 | minor | Legacy Table List Motion Type can't be switched off in the dialog (`table-list.js:311`, `utils/motion.js:91-98`) |
| R-A-8 | minor (verified on aem.page) | "Lists made before" library sample is stored as a key-value List, so aem.page shows the empty message (library spec) |

- Report: `/tmp/audit2/review-A.md`; evidence scripts and outputs `/tmp/audit2/a/` (`check1-4.mjs`, `check2-live.mjs`, `bc.mjs` + `bc-live.json` / `bc-local.json`, `synthetic.mjs`, `filterlist.mjs`, `skeleton.mjs`).
