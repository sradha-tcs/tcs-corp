# Re-audit group C: containers, disclosure and fragment blocks (second audit, 20 October 2026)

Scope: Tabs Container section (`tabs`) + Tab (`tab`), Tabs block (`tabs-block`) + `tabs-item`, Gen Carousel section, built-in Columns (`columns`, no longer offered), Columns Container section + Column Break, Accordion + Accordion Item, Anchor List + Anchor Link, Fragment, Modal, the plain Section model.

Method: every line of the JS / CSS / model files of the group was read on branch `fix/block-reaudit` (= main after PR #118 and #119; repository not modified). Playwright scripts and their raw results are in `/tmp/audit2/c/` (`tabs1.mjs` local + aem.page structure, keyboard, data layer; `tabs2.mjs` route-mutated scenarios: nested Tabs, Column Break before the first Tab, hidden Tab, per-row-1, a link in a column, `aue:ui-select`, Anchor List / deep links into hidden tabs, a Canvas in a hidden tab; `tabs3.mjs` same Fragment twice, live Accordion / Modal / Columns / Anchor List). "Verified" = code read and reproduced; "code-verified" = unambiguous code path, not run; "suspected" = not reproduced.

Line references: `scripts/scripts.js` = S, `blocks/tabs/tabs.js` = T, `blocks/gen-carousel/gen-carousel.js` = GC, `styles/styles.css` = CSS, `scripts/editor-support.js` = ES. Usage: `/tmp/audit2/inventory-before.json` (package 1.0.8).

---

### Block: Tabs Container (`tabs`, section; synthetic block class `tabs`, `data-source="section"`) + Tab (`tab`, marker block)

### A. Overview
- A section (style `tabs-section`) whose Tab items start tabs; the components after a Tab, up to the next one, are its panel. `buildTabsSections` (S:190-205) wraps the section content in a synthetic `tabs` block (`wrapSectionContent` S:126-142, `applySectionBlockOptions` S:153-160); `tabs.js` `groupContainerTabs` (T:77-92) groups the wrappers by Tab, **new** `columnsOf` (T:100-116) puts the content from a tab's first Column Break on into a synthetic Columns Container block inside the panel (Columns per row from the Tab's new `classes_perrow`), then the tab list and panels are built (T:215-256).
- Filter `tabs` (after PR #119): `tab`, `column-break` + the 23 components of a Columns Container column, **including `tabs-block` and `conversation-canvas`** (component-filters.json). `columns` removed.
- Tab marker: key-value block (`_tab.json`), Title / ID / Active tab / Columns per row (new) / Hide block; `readTab` caches values in `data-tab-*` (tab.js:19-32); hidden on the page (tabs.css:136-142), a chip in edit mode; `data-analytics="off"` (tab.js:41).
- Usage: Tabs Container 17 instances / 4 pages; Tab 53; Column Break 147 / 12 pages (part of them in tabs after the library migration).

### B. Status of the first audit's defects
| Id | Verification (current code) | Status |
|---|---|---|
| D-C-2 (Additional tab ignored) | `applySectionBlockOptions(section, tabs)` S:202 copies `classes_*` data attributes and `SECTION_BLOCK_OPTIONS` classes (S:145) before `wrapSectionContent`. Anchor ID → `applyBlockOptions` id; Hide block → CSS:1135-1139 (incl. section band, D-C-15); spacing CSS:1147+; animation: `tabs` not in `CONTENT_TARGETS`, so the whole block animates (motion-decorator.js:99-103) | Confirmed fixed |
| D-C-3 (duplicate panel ids, deep links) | Ids reserved before content moves (T:221-230), button id `availableId(panel-tab)` (T:248), `data-tab-id` (T:239) looked up first in `panelOfHash` (T:38-45). Playwright: no duplicate id on local `tabs-section` / `tab-deep-link` and live `tabs-section` / `tab`; `tab-deep-link` panels `consulting|consulting`, `cloud|cloud`, `cybersecurity|cybersecurity` | Confirmed fixed (see R-C-9 for an editor-only drift) |
| D-C-6 (overlapping anchor fields, Deferred) | Still two id fields: "ID" (`anchorName`, section id + panel id prefix) and "Anchor ID" (`classes_anchor`, synthetic block id). Both work now | Still deferred: cheap wording fix in H |
| D-C-7 (Tab Additional tab without effect) | `_tab.json` has only Hide block on Additional; Hide block drops the group when not editing (T:83, T:91) | Confirmed fixed (editor gaps: R-C-7) |
| D-C-8 (shared `shownTabs`) | Key = `section.dataset.aueResource` (T:190), used only when set (T:269, T:312) | Confirmed fixed |
| D-C-12 (markers in data layer) | tab.js:41 `data-analytics="off"`; Playwright component list has no `tab-n` | Confirmed fixed |
| D-C-13 (cmp:show paths unregistered) | Panels carry `data-cmp-id` (T:240), which attributes clicks, but the panels are **still not registered** in `component` (Playwright: only `tabs-N` and `columns-container-N` entries), so `cmp:show component.{panel id}` (T:275) still points to nothing | Not fixed (partially: attribution only). Fix in F |
| D-C-14 (Anchor name) | `availableId(anchor, section)` S:288; `anchorName` regExp in `_tabs.json` | Confirmed fixed (editor drift R-C-9) |
| D-C-15 (hidden container band) | CSS:1137 `.section:has(> div > .block.hideblock:is(... .tabs[data-source='section'] ...))` | Confirmed fixed |
| D-C-1 (Columns Container CSS on sections) | All selectors `.block.columns-container` (columns-container.css:6-87). Live `tabs-section`: sections with class `columns-container` (from built-in Columns) stay `display: block` | Confirmed fixed |

### C. Dialog validation (Tabs Container, model `tabs`)
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Component (`style`) | select, one option `tabs-section` (default) | Section class S:276-277; marker for `buildTabsSections` S:191 | Single-option select labelled "Component" | Retain (label "Style" optional) |
| ID (`anchorName`) | text, regExp `^#?[a-z0-9][a-z0-9-]*$` | Section id S:286-288; `baseId` of the panel ids T:189, T:230 | Overlaps Anchor ID (D-C-6) | Retain; reword (H) |
| Width Type (`sectionWidth`) | full-width (default) / fixed-width | `fixed-width` S:279-281 | OK | Retain |
| Label (`tabsAriaLabel`) | text | `data-label` S:201 → tablist `aria-label` T:219 (fallback placeholder `tabs`) | OK | Retain |
| Style (`tabsStyle`) | underline (default) / boxed / pills | Class S:199-200; tabs.css:55-104 | Leaks into a nested Tabs block (R-C-1) | Retain + Correct CSS |
| Alignment (`tabsAlignment`) | left (default) / center / stretch | Class; tabs.css:64-83 | Leaks into nested Tabs (R-C-1) | Retain + Correct CSS |
| Orientation (`tabsOrientation`) | horizontal (default) / vertical | Class; `aria-orientation` T:218; grid tabs.css:169-221 | Leaks into nested Tabs (R-C-1, verified: inner list `flex-direction: column`) | Retain + Correct CSS |
| Anchor ID (`classes_anchor`) | text, `anchor-` regExp | S:202 → `applyBlockOptions` id on the synthetic block | Works; duplicate concept (D-C-6) | Retain |
| Hide block (`classes_hideblock`) | boolean, false | CSS:1135-1139 (block, wrapper and section band) | OK | Retain |
| Animation Type / Motion Speed / Animation Trigger (`classes_animation`, `classes_animationspeed`, `classes_animationtrigger`) | 10 effects + None; speed / trigger shown once an effect is set | Classes via S:202; `prepareMotion` animates the whole block (no `CONTENT_TARGETS.tabs`) | OK (whole-block effect) | Retain |
| Padding left / right / top / bottom (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | Default + 14 tokens | Classes via S:202; CSS:1147-1370 | OK | Retain |
| Margin left / right / top / bottom (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | Default + 14 tokens | Same | OK | Retain |

Template (`_tabs.json`): style, tabsStyle, tabsAlignment, tabsOrientation = the model defaults and the code bases. No sample content.

### C. Dialog validation (Tab, model `tab`, key-value)
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Title (`title`) | text, required; **template `"title": "Tab"`** | `readTab` tab.js:26 → button text T:251; live update via `tabs:tab-update` T:305-308 | The template stores "Tab" on every new Tab (AGENTS "no sample content in templates"); harmless label but every untouched Tab is named "Tab" instead of the numbered fallback `tabNumber` | Retain; remove the template title (R-C-10) |
| ID (`tabId`) | text | `toClassName` tab.js:27 → panel id + `data-tab-id` T:230, T:239 | No validation regExp (the Tabs Container ID has one) | Retain; add `^#?[a-z0-9][a-z0-9-]*$` (R-C-10) |
| Active tab (`activeTab`) | boolean | `isOn` tab.js:28 → initial tab T:314 | Applies in UE only after a reload (as yesterday) | Retain |
| Columns per row (`classes_perrow`) **new** | Automatic `""` (default) / `per-row-1`…`per-row-4` | Class on the Tab (key-value `classes_*`) → T:84 `perRow` → inner Columns Container class T:104 → `perRow()` columns-container.js:79-82 → `columns-container-N`. Verified: `per-row-1` tab → `repeat(1, minmax(0,1fr))`, 2 columns stacked | Works. Change in UE re-renders only the Tab marker, so the columns keep the old count until reload (R-C-7). Gap / alignment / breakpoint are not offered in tabs (always medium / top / desktop) | Retain |
| Hide block (`classes_hideblock`) | boolean, false | T:83, T:91 drop the group when not editing; marker dimmed in edit mode (CSS:1141) | In edit mode only the chip is dimmed, the tab button and content look normal; switching UE to Preview keeps the tab (built in edit mode) (R-C-7) | Retain |

### D. Variations (Tabs Container)
| Variation | Purpose | Result (code-verified / verified) | Action |
|---|---|---|---|
| Underline / Boxed / Pills | Tab look | Distinct CSS (tabs.css:48-104) | Retain; scope selectors (R-C-1) |
| Left / Center / Stretch | Tablist alignment | Distinct CSS | Retain |
| Horizontal / Vertical | Layout | Vertical grid >= 900px | Retain |
| Fixed / Full width | Section width | S:279-281 | Retain |
| Column Breaks in a tab (new) | Columns inside a tab | Verified local: panel = Tab wrapper, content before the first Column Break, then `columns-container-wrapper > .block.columns-container.columns-container-2` (`loaded`), grid `704px 704px` at 1440 in the shown panel | Retain |
| Content before the first Column Break | Heading above columns | Verified (`default-content-wrapper` stays above, tabs-section 2nd example) | Retain |
| Column Break before the first Tab | Untitled first tab with columns | Verified: "Tab 1" panel = one columns-container | Retain |
| Hidden Tab (Hide block) that was the Active tab | | Verified: group dropped, first remaining tab shown | Retain |
| Built-in Columns in a tab (old content) | Backward compatibility | Verified on aem.page (`tabs/tabs-section`, `tabs/tab`): every panel `columns-wrapper > .columns.block.columns-2-cols` loaded, rows `display:flex`, sections stay `display:block`, no console error, no duplicate id | Retain (definition kept) |
| Nested Tabs block in a tab (now allowed) | Tabs in a tab | Verified broken styling: R-C-1 | Correct |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Roles / relations | tablist / tab / tabpanel, `aria-controls`, `aria-labelledby` | T:217-252; verified controls ↔ labelledby on all tabs of tabs-section | None | Pass |
| Arrows / Home / End, wrap | Move + select | T:279-296 (yesterday's Playwright pass; code unchanged) | None | Pass |
| Roving tabindex | selected 0, others -1 | T:263 | None | Pass |
| Tab / Shift+Tab | tab → panel → panel content → next tablist | Verified: `button[aria-selected]` → `tabpanel#anchor-tabs-overview-item-2` → next Tabs' selected button → its panel → `a.button` inside the columns; nothing in hidden panels receives focus | None | Pass |
| Reading order with Column Breaks | DOM = visual | Columns are in DOM order; markers `display:none` (column-break.css:92-95) | None | Pass |
| Hidden panels | Not focusable / not exposed | `hidden` → `display:none` (tabs.css:111-113) | None | Pass |
| Unique ids | | Verified none duplicated (local + live) | None | Pass |
| Deep link to a tab | Opens the tab | Verified `#one-per-row` opened the tab and scrolled (scrollY 1366) | None | Pass |
| Deep link / Anchor List link to content **inside** a hidden tab | Opens the tab that holds the target | Verified fail: `#anchor-blk` (Accordion in a hidden tab) and `#anchor-col-x` (Column Break anchor) on load: target `display:none`, scrollY 0; Anchor List link to `#anchor-blk`: not visible, not focused | R-C-3 | Fail |
| Media in a panel being hidden | Playing audio / video stops when its tab is hidden (1.4.2) | `select()` only toggles `hidden` (T:259-265). Video files pause through their own Pause off screen observer (video.js:248-256, default on), but a playing Embed (YouTube / Vimeo iframe, now allowed directly in a tab) keeps playing, with sound, in the hidden panel (code-verified) | R-C-8 | Partial |
| Focus visible / reduced motion | | tabs.css:43-46, 115-118, 153-157 | None | Pass |

### F. Data layer
- `tabs-N` registered (synthetic block, id = counter or Anchor ID). Tab markers and Column Breaks off (D-C-12).
- `cmp:show` per tab change (T:275) with path `component.{panel id}`: the panel is not a registered component (D-C-13 still open). Exact fix (T:256, after `block.replaceChildren`): `pushComponents(Object.fromEntries(tabs.map(({ panel, button }) => [panel.id, { '@type': 'tcs-corp/components/tabs/item', parentId: componentIdOf(block), 'dc:title': button.textContent.trim() }])));` (import `pushComponents` from utils/analytics.js and `componentIdOf` from decorators/data-layer-decorator.js; mark the panels `dataset.cmpTracked` is not needed: trackBlocks only registers `.block`). No new events.
- **New (R-C-2, verified):** each tab with Column Breaks adds a synthetic `columns-container-N` component (local tabs-section: `columns-container-1` … `-14`, parent `tabs-N`), consuming the same counter as real Columns Container sections, so adding Column Breaks to a tab renumbers every Columns Container after it; and a click on a default-content link in such a column is attributed to `component.columns-container-2` instead of the panel (without Column Breaks it is the panel id).
- Deep links call `.click()` (T:51), recorded as `cmp:click` (minor, as yesterday).

### G. Personalization
Not personalizable (no field, no Target / Tags runtime: BLOCKED). The panels would be the natural experience slots.

### H. Decision
**Modify.** Keep the Column Breaks design; fix R-C-1 (nested Tabs CSS), R-C-2 (data layer of the synthetic columns), R-C-3 (deep links into hidden tabs), R-C-4 (Canvas in a tab), R-C-6 (`aue:ui-select` in nested tabs), R-C-7 (editor live updates), R-C-8 (embeds in hidden tabs), D-C-13. D-C-6 (cheap, wording only, no stored values change): in `_tabs.json` model `tabs` set `anchorName` label "Anchor name" with description "The section id: #links and Anchor List links jump to it; also the prefix of tab ids without their own ID."; `classes_anchor` description "The id of the tabs block itself (start with anchor-). Use Anchor name for links to the section."; in model `tabs-block` relabel `tabsId` "Tab ID prefix" with "Prefix of the tab ids (e.g. our-offerings-item-1); not an anchor, use Anchor ID for links." Backward compatible: built-in Columns in tabs keep rendering (verified live), all new behaviour only triggers on Column Breaks.

### Universal Editor behaviour (Tabs Container with Column Breaks; code-verified against ES)
| Action | Path | Result | Status |
|---|---|---|---|
| Add a Column Break, a block or default content to a tab; move a component between tabs | `aue:content-add` / `-move` → resource = section (`target.container` / `to.container`, ES:21-23) → section branch ES:75-87: the new section is decorated by `decorateSectionsWithOptions(main)` (only undecorated sections), `buildTabsSections` → `loadSections` → `tabs.js` with `columnsOf` | Whole Tabs Container rebuilt; the tab shown before stays shown (`shownTabs` keyed by the section resource, T:190, T:312) | OK (ids drift while both sections exist: R-C-9) |
| Edit a block inside a column of a tab | ES:53: `element.parentElement.closest('.block[data-aue-resource]')`; the synthetic `columns-container` and `tabs` blocks and the Container panels carry no `data-aue-resource` (T:236 moves instrumentation only for Tabs block items) | The block itself is re-rendered in place, in its column | OK |
| Edit default content inside a column | ES:88-93 replaceWith | In place | OK |
| Edit a Tab (Title) | Only the marker re-renders; tab.js:47 `tabs:tab-update` → T:305-308 | Title updates live | OK |
| Edit a Tab (ID, Active tab, **Columns per row**, Hide block) | Same marker-only re-render | No effect until reload / next section re-render | R-C-7 |
| Edit a Column Break (Hide block, spacing, Anchor ID) | Marker-only re-render; the options were copied to the column once (columns-container.js:85-100) | Column not updated until reload (also in Columns Container sections) | R-C-7 |
| Select a component in a hidden tab (`aue:ui-select`) | T:299-303 `e.target.closest('.tabs-panel')` (works through the column wrappers) | Opens the tab; **fails in a nested Tabs** (verified with a synthetic event: the outer panel stays hidden) | R-C-6 |
| Empty tab / empty column | `tabs-empty` hint T:202-212; `columnEmpty` hint columns-container.js:116-123 | Hints shown in edit mode | OK |

### The Tabs Container filter now accepts blocks (PR #119): risk per newly allowed component
| Component | In a hidden panel / in a tab | Status |
|---|---|---|
| `tabs-block` | Outer Style / Alignment / Orientation CSS leaks into it (verified, R-C-1); `aue:ui-select` in it doesn't open the outer tab (R-C-6) | Correct |
| `conversation-canvas` | A Canvas in a hidden tab becomes the floating owner (`conversation-canvas-owner`, journey `floating-after-section`) while it isn't rendered (verified, R-C-4) | Correct (remove from the filter) |
| `embed` | Loads when shown (`onVisible`, embed.js:108); keeps playing when its tab is hidden (R-C-8) | Correct |
| `video` | Pause off screen pauses it when hidden (video.js:248-256) | OK |
| `list`, `cards`, `filter-list`, `table` | Scroller / table re-measure with ResizeObserver (scroller-decorator.js:166, table.js:69) when the panel is shown | OK (code-verified) |
| `anchor-list` | Not pinned while not rendered (anchor-list.js:77); its links into hidden tabs fail (R-C-3) | See R-C-3 |
| `hero`, `teaser`, `quote`, `testimonial`, `form-variations`, `separator`, `modal`, `fragment`, `accordion`, `title`, `text`, `image`, `button-block` | Motion waits for the panel to intersect; no measuring at decoration | OK |

---

### Block: Tabs (`tabs-block`, block class `tabs`) + item Tab (`tabs-item`)

### A. Overview
- Key-value block whose Tab items each show a Fragment page; same rendering code as the container (T:124-172 `readBlockProperties`, `ITEM_LAYOUT`, `readItem`). Parents: section, columns-container, **tabs** (nesting allowed). Usage: 7 blocks / 3 pages, 20 items.

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-3 | Same shared code (T:221-252); live `tabs-block-with-fragments`: panels `overview`, `industries`, no duplicates | Confirmed fixed |
| D-C-8 | `key = block.dataset.aueResource` (T:195); undefined on published pages, so two Tabs blocks with the same ID no longer share state | Confirmed fixed |
| D-C-17 (recursion guard) | fragment.js:75-117 `loading` Set + current page check | Fixed, but **regressed** for legitimate parallel loads: R-C-5 (verified) |
| D-C-6 | `tabsId` still labelled "ID" | Deferred; wording fix in Tabs Container H |

### C. Dialog validation (block `tabs-block`)
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| ID (`tabsId`) | text | `toClassName` → `baseId` T:139, T:194, panel ids `{id}-item-n` T:230 | No regExp; label suggests an anchor (D-C-6) | Retain; relabel "Tab ID prefix" + `^[a-z0-9][a-z0-9-]*$` |
| Label (`tabsAriaLabel`) | text | `data-label` T:138 → T:219 | OK | Retain |
| Style (`tabsStyle`) | underline (default) / boxed / pills | `pick()` → class T:133-137 | Inherits an outer Tabs Container's style when nested (R-C-1) | Retain |
| Alignment (`tabsAlignment`) | left / center / stretch | Same | Same | Retain |
| Orientation (`tabsOrientation`) | horizontal / vertical | Same; T:200, T:218 | Same | Retain |
| Anchor ID (`classes_anchor`) | text, `anchor-` regExp | `applyBlockOptions` | OK | Retain |
| Hide block (`classes_hideblock`) | boolean | CSS:1135-1136 | OK | Retain |
| Padding ×4 / Margin ×4 (`classes_padding*`, `classes_margin*`) | tokens | CSS:1147+ | OK | Retain |

No animation fields (consistent: `tabs` isn't a `CONTENT_TARGETS` entry).

### C. Dialog validation (item `tabs-item`)
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Title (`title`) | text; **template `"title": "Tab"`** | cell → T:166, T:251 | Template value stored on every new item (R-C-10) | Retain; remove the template title (the `tabNumber` fallback names it) |
| ID (`tabId`) | text | T:167 → panel id / `data-tab-id` | No regExp | Retain; add regExp (R-C-10) |
| Active tab (`activeTab`) | boolean | `isOn` T:168 | OK | Retain |
| Fragment (`fragment`) | aem-content | last cell, link or text T:155-157 → `loadFragment` | **Two items with the same Fragment: the second panel is empty** (R-C-5, verified) | Retain + Correct |

Layout `[tab, title, tabId, activeTab, tab, fragment]` (T:144) matches the model's two dialog tabs; `withoutTabCells` (utils/cells.js) drops them; legacy rows with more cells take the last cell as the Fragment (T:155).

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Styles / alignments / orientations | as the container | Shared CSS, verified distinct | Retain |
| Fragments per tab | Any content per tab | Verified live (old content): panels with fragment text, no errors | Retain |
| Inside a Tabs Container tab | Nested tabs | Broken styling (R-C-1) | Correct |

### E. Accessibility
Same shared code as the Tabs Container (pass, except R-C-3, R-C-8). An empty panel (fragment not found / R-C-5) is a focusable `tabpanel` with no content and no editor hint: Partial (fixed by R-C-5's fix; optionally add the `tabsBlockEmpty` style hint per empty panel in the editor).

### F. Data layer
As the Tabs Container (`cmp:show` per change, panels unregistered: D-C-13). Blocks inside fragments are registered with `parentId` of the nearest block (the Tabs block). OK.

### G. Personalization
Item level in principle (the Fragment per tab). No runtime: BLOCKED.

### H. Decision
**Modify** (R-C-5 is a regression of yesterday's fix; R-C-1; R-C-10). Long term merge into the Tabs Container (Tab + Fragment block), as yesterday; the Tabs Container now accepts `fragment`, so the migration is mechanical. Compatible.

---

### Block: Gen Carousel (`gen-carousel`, section; synthetic block `gen-carousel`)

### A. Overview
Section (`gen-carousel-section`) whose components each become a slide; `buildCarouselSections` S:168-182, `gen-carousel.js`. Filter `gen-carousel` = hero, teaser. Usage 5 / 5 pages. Title still "Gen Carousel" (yesterday's rename suggestion not applied; not a defect).

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-2 | `applySectionBlockOptions(section, carousel)` S:179 | Confirmed fixed |
| D-C-5 (spurious `cmp:show`, inert flicker) | `target` guard GC:107-117, GC:196-204 (+1 s fallback). Live `manual-and-auto`: dot 1 → 4 pushed one `cmp:show component.gen-carousel-1-slide-4` | Confirmed fixed (verified on aem.page) |
| D-C-13 (slides) | Slides have `data-cmp-id` (GC:58) but are not registered components | Not fixed (register says tabs only). Fix: after GC:66 `pushComponents(Object.fromEntries(slides.map((s, i) => [s.dataset.cmpId, { '@type': 'tcs-corp/components/gen-carousel/slide', parentId: componentIdOf(block), 'dc:title': s.querySelector('h1, h2, h3, h4, h5, h6')?.textContent.trim() || `${i + 1}` }])))` |
| D-C-15 | CSS:1137 includes `.gen-carousel` | Confirmed fixed |
| D-C-16 (every carousel "Carousel") | `carouselAriaLabel` field (model) → S:174-178 `aria-label`; GC:43 keeps it | Confirmed fixed (live old content without a label: "Carousel", expected) |
| D-C-19 (Deferred: listeners on editor re-render) | GC:224 `document` `visibilitychange` and the observers GC:196, GC:207 are never released; `schedule` returns early once the block is disconnected (GC:136, GC:138), so no orphan timers | Still deferred, editor only. Cheap fix: `const ac = new AbortController();` pass `{ signal: ac.signal }` to GC:224; in `schedule()` `if (!block.isConnected) { ac.abort(); slideObserver.disconnect(); visibility.disconnect(); return; }` (keep the `watchVisibility` return value as `visibility`) |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Style (`style`) | select, one option `gen-carousel-section` (label "Default") | Section class → S:169 | Single-option select | Retain |
| Navigation (`carouselNavigation`) | manual (default) / auto / manual-auto | S:176 class → `readNavigation` GC:20-23 | OK | Retain |
| Accessible name (`carouselAriaLabel`) | text | S:178 → `aria-label` | OK (new) | Retain |
| Autoplay interval (seconds) (`carouselInterval`) | number, default 5; shown unless Manual | S:177 → `readInterval` GC:26-29 (min 2 s) | No upper clamp in code (model max) | Retain |
| Anchor ID (`classes_anchor`) | text | S:179 → block id | OK | Retain |
| Hide block (`classes_hideblock`) | boolean | CSS:1135-1139 | OK | Retain |
| Animation Type / Motion Speed / Animation Trigger | | S:179; whole block (no `CONTENT_TARGETS` entry) | OK | Retain |
| Padding ×4 / Margin ×4 | tokens | S:179; CSS:1147+ | OK | Retain |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Manual / Auto / Manual and Auto | Navigation | GC:154-193; live manual-auto: 6 slides, inert on 5, toggle + dots | Retain |
| Single slide | No controls | GC:68-71 | Retain |
| Hero / Teaser slides | Content | Any block | Retain |

### E. Accessibility
| Requirement | Expected | Current | Correction | Status |
|---|---|---|---|---|
| Carousel semantics / name | region, roledescription, slides group "n of total", authorable name | GC:41-61; S:178 | None | Pass |
| Pause (2.2.2) / reduced motion | | GC:122, GC:144-165 | None | Pass |
| Inactive slides | inert | Live: `false,true,true,true,true,true` | None | Pass |
| Focusable track | visible focus | `tabIndex 0` (GC:50); live: `:focus-visible` with the UA `outline: auto 1px` (no project style; thin on dark heroes) | Optional: `.gen-carousel .gen-carousel-slides:focus-visible { outline: var(--border-width-200) solid var(--color-border-brand); outline-offset: calc(-1 * var(--border-width-200)); }` | Pass (advisory) |
| Keyboard | arrows on controls | GC:178-184 | None | Pass |

### F. Data layer
`cmp:click` on controls (`previous` / `next` / `pause`), `cmp:show` per slide change (single event, verified). The toggle's `data-cmp-interaction` is always `pause`, also when it resumes (GC:156; R-C-12). Dots: no interaction / position attributes (title "Show slide n of total" identifies them).

### G. Personalization
Slides in principle. No runtime: BLOCKED.

### H. Decision
**Retain** (D-C-13 slides, R-C-12 minor). Compatible: verified on aem.page with old content.

---

### Block: Columns (built-in, `columns`, resource `core/franklin/components/columns/v1/columns`, class `columns`) — no longer offered

### A. Overview
Core rows × columns grid of default content. PR #119 removed it from every filter (section, columns-container, tabs; verified in component-filters.json); the definition and model stay so Columns authored before remain editable. Inner filter `column` = text, image, title (built-in `button` removed; old cell buttons still render). Files `_columns.json`, `columns.js` (Block Collection), `columns.css`. Usage: 0 in package 1.0.8 (library migrated: 10 to Columns Containers, 27 in tabs to Column Breaks); present in the installed 1.0.6 content on aem.page.

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-1 | Sections of Columns get class `columns-container` (aem.js decorateBlock); all Columns Container rules require `.block` (columns-container.css:6-87). Live `columns/columns-variations`: 6 Columns, sections `section columns-container` stay `display:block`, rows `display:flex` | Confirmed fixed (verified on aem.page) |
| D-C-22 | Live: Columns deliver only `columns block columns-N-cols` (no `classes_*`); `_columns.json` has no Additional tab | Confirmed fixed |
| D-C-23 | columns.js:2-3 `block.firstElementChild?.children` guard | Confirmed fixed |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Columns (`columns`) | text; template "2" | AEM builds the cells; columns.js counts them (`columns-N-cols`, js:2-4) | OK | Retain (for existing content) |
| Rows (`rows`) | text; template "1" | AEM builds the rows | OK | Retain |

Removed Additional tab values stored on old Columns: still in the JCR but never delivered (D-C-22, verified), so they had no effect before and have none now. `CONTENT_TARGETS.columns` (motion-decorator.js:37) is now dead code (no motion class can arrive); harmless, can be removed.

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| 2 / 3 columns, several rows | Grid | Verified live: flex, stacked < 900px | Retain (legacy) |
| Image column | Image first on mobile | `columns-img-col` (columns.css:13-19) | Retain |
| Old built-in Buttons in a cell | Legacy | Verified live: `a.button` rendered (bold / italic link) | Retain |

### E. Accessibility
Static content in DOM order (image column moved first visually only on mobile). Pass.

### F. Data layer
Registered as `columns-N`; cell links are its clicks. OK.

### G. Personalization
Not personalizable.

### H. Decision
**Deprecate** (done by PR #119: not offered, still rendered and editable). Backward compatibility verified on aem.page (`columns/columns-variations`, and in tabs: `tabs/tabs-section`, `tabs/tab`). Keep `blocks/columns` until no published page uses it.

---

### Block: Columns Container (`columns-container`, section; synthetic block) + Column Break (`column-break`)

### A. Overview
Section laid out in columns; each Column Break starts a column (`buildColumnsSections` S:214-234, `columns-container.js`, `column-break.js`). Now also built inside tab panels by `columnsOf` (T:100-116). Filter 24 components (column-break + 23, incl. `tabs-block`). Usage 32 / 8 pages; Column Break 147 / 12 pages.

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-1 | `.block.columns-container` everywhere | Confirmed fixed |
| D-C-4 | createColumn columns-container.js:92-98 moves the id from the marker to the column. Verified (tabs2): `columns-container-column#anchor-col-x`, no duplicate id | Confirmed fixed |
| D-C-12 | column-break.js:166 `data-analytics="off"` | Confirmed fixed |
| D-C-14 | Section id via `availableId` S:288; `anchorName` regExp in `_columns-container.json` | Confirmed fixed |
| D-C-15 | CSS:1137 | Confirmed fixed |

### C. Dialog validation (Columns Container)
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Style (`style`) | multiselect Columns Container (default) / Highlight | Section classes S:276-277; marker S:219 (or any Layout data attribute S:217-218) | OK | Retain |
| Width Type (`sectionWidth`) | full-width (default) / fixed-width | S:279-281 | OK | Retain |
| Background Image (`backgroundImage`) | reference | S:289-297 | OK | Retain |
| Image alt text (`backgroundImageAlt`) | text | S:113-115 | OK | Retain |
| Anchor name (`anchorName`) | text, regExp | Section id S:286-288 | Overlaps Anchor ID (D-C-6) | Retain |
| Columns per row (`columnsPerRow`) | auto (default), 1-4 | `per-row-N` S:228-230 → `perRow()` js:79-82 | OK | Retain |
| Gap (`columnsGap`) | small / medium (default) / large | css:22-23 | OK | Retain |
| Vertical alignment (`columnsAlign`) | top (default) / middle / bottom / stretch | css:26-28 | OK | Retain |
| Side by side from (`columnsFrom`) | tablet / desktop (default) / large | css:71-87 | OK | Retain |
| Anchor ID (`classes_anchor`) | text | S:231 → block id | OK | Retain |
| Hide block (`classes_hideblock`) | boolean | CSS:1135-1139 | OK | Retain |
| Animation Type / Speed / Trigger | | S:231; staggered columns (`CONTENT_TARGETS['columns-container']`) | OK | Retain |
| Padding ×4 / Margin ×4 | tokens | S:231; CSS:1147+ | OK | Retain |

### C. Dialog validation (Column Break, key-value)
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Column name (`title`) | text | `readColumn` column-break.js:150-157 → editor label js:168-173 | Editor only (documented) | Retain |
| Anchor ID (`classes_anchor`) | text | column id (js:92-98) | Works on the page; in UE a change applies only after reload (R-C-7); a link to it inside a hidden tab doesn't open the tab (R-C-3) | Retain |
| Hide block (`classes_hideblock`) | boolean | column class (`COLUMN_OPTIONS` js:70, 90-91), css:50-56 | Same editor gap (R-C-7) | Retain |
| Padding ×4 / Margin ×4 | tokens | column classes, CSS `:is(.block, .columns-container-column)` | Same editor gap (R-C-7) | Retain |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Per row auto / 1-4, gap, alignment, breakpoint | Layout | Distinct CSS (unchanged since yesterday's verification) | Retain |
| Content before the first Column Break | Own column | js:109-114 | Retain |
| Legacy `column` items | Compatibility | S:222 | Retain |
| In a tab (new) | Columns inside a Tabs Container tab | Verified local: `columns-container-2` grid `704px 704px` at 1440; only Columns per row is authorable (gap / align / from fixed at the defaults) | Retain (document the limitation) |

### E. Accessibility
| Requirement | Expected | Current | Correction | Status |
|---|---|---|---|---|
| Reading order | DOM = visual | Grid in DOM order | None | Pass |
| Unique ids | | No duplicates (verified, also inside tabs) | None | Pass |
| Hidden markers | Not exposed | column-break.css:92-95 | None | Pass |
| Editor hints | Placeholders | `columnEmpty`, `columnsContainerEmpty`, `columnLabel` | None | Pass |

### F. Data layer
Real Columns Container sections: `columns-container-N` (or Anchor ID). The synthetic Columns Containers built in tabs take the same counter (R-C-2), so real sections after a tab with Column Breaks get shifted ids. Column Breaks off.

### G. Personalization
Columns as experience slots in principle. No runtime: BLOCKED.

### H. Decision
**Retain** (R-C-2, R-C-7). Compatible.

---

### Block: Accordion (`accordion`) + item Accordion Item (`accordion-item`)

### A. Overview
Native `<details>` items (accordion.js:12-37). Filter `accordion` = accordion-item. Parents: section, columns-container, tabs. Usage 5 / 3 pages, 19 items.

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-20 / L-3 (unnamed items, dialog tab row) | Rows whose first cell is empty are removed, or become editor placeholders when instrumented (js:13-22). Live (old content): 3 accordions, items all `DETAILS` with a summary, no empty first item | Confirmed fixed (verified on aem.page) |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Summary (`summary`, item) | text; **template "Lorem Ipsum"** | cell 1 → `<summary>` js:24-27 | Template sample stored on every new item (R-C-11). Label "Summary" technical (yesterday: rename "Title", not done). The cell's own instrumentation is not moved to `<summary>` (only the row's, js:32): inline editing of the summary may be lost (R-C-13, suspected) | Retain; Correct |
| Text (`text`, item) | richtext; **template "<p>Lorem ipsum dolor sit amet…</p>"** | cell 2 → `.accordion-item-body` js:28-29 (cell kept, instrumentation kept) | Template sample (R-C-11) | Retain; Correct |
| Anchor ID (`classes_anchor`) | text | block id | OK (3 uses) | Retain |
| Hide block (`classes_hideblock`) | boolean | CSS | OK | Retain |
| Animation Type / Speed / Trigger | | `CONTENT_TARGETS.accordion` (items staggered) | OK (1 use) | Retain |
| Padding ×4 / Margin ×4 | tokens | CSS | OK | Retain |

### D. Variations
None (single style). Retain.

### E. Accessibility
| Requirement | Expected | Current | Correction | Status |
|---|---|---|---|---|
| Disclosure | native details / summary | js:31-35 | None | Pass |
| Enter / Space | toggle | native | None | Pass |
| Name | non-empty summary | empty rows dropped (js:16-22) | None | Pass |
| Heading navigation | optional | `<summary>` holds text / `<p>` | Advisory (heading level option) | Advisory |
| Reduced motion / focus visible | | accordion.css | None | Pass |

### F. Data layer
Central `toggle` capture → `cmp:show` / `cmp:hide` with `dc:title` = summary (data-layer-decorator.js:135-141); summary clicks excluded from `cmp:click`. OK.

### G. Personalization
Items in principle. No runtime: BLOCKED.

### H. Decision
**Retain** (R-C-11, R-C-13 minor). Compatible.

---

### Block: Anchor List (`anchor-list`) + item Anchor Link (`anchor-list-item`)

### A. Overview
Chapter navigation (anchor-list.js), Sticky pinning, current link. Parents: section, columns-container, tabs. Usage 5 / 5 pages, 19 items.

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-19 (Deferred: listeners on editor re-render) | window `scroll` / `resize` / `scrollend` / `load` / `hashchange` listeners and two observers per decoration (js:84-91, 188-208) never released | Still deferred, editor only. Cheap fix: one `AbortController` per decoration, `{ signal }` on every `addEventListener`, and at the start of both `update()` functions `if (!block.isConnected) { controller.abort(); observers.forEach((o) => o.disconnect()); return; }` (collect the ResizeObserver / MutationObserver in `observers`) |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Links (`anchors`, container multi: `label`, `anchorName`) | legacy, 0 uses | `readAnchors` js:30-36 | Still offered in the dialog although composite multifields don't render from packages; kept so old values stay editable (description says so) | Retain (remove from the model once no environment holds values) |
| Sticky (`sticky`) | boolean, false | js:109, 163, 69-93 | OK (4 uses) | Retain |
| Link Title (`label`, item) | text, required | js:39-44 | OK | Retain |
| Anchor Name (`anchorName`, item) | text | `anchorOf` js:23 (falls back to the title) | A target inside a hidden tab is not revealed (R-C-3, verified) | Retain |
| Anchor ID / Hide block / Padding ×4 / Margin ×4 | | block options, CSS | OK | Retain |

### D. Variations
Default (inline, horizontal scroll) and Sticky (JS pinning, placeholder height). Verified live: 4 links with targets. Retain.

### E. Accessibility
| Requirement | Expected | Current | Correction | Status |
|---|---|---|---|---|
| Landmark | named nav | `onThisPage` js:113 | Optional label field | Pass |
| Current | `aria-current` | js:127 | None | Pass |
| Focus to target | | js:152-153 | Fails for targets in hidden tabs (R-C-3) | Partial |
| Reduced motion | | `scrollBehavior()` | None | Pass |

### F. Data layer
Central `cmp:click` (`link`, `#anchor`). OK.

### G. Personalization
Not personalizable.

### H. Decision
**Retain** (R-C-3 part in anchor-list.js; D-C-19 deferred).

---

### Block: Fragment (`fragment`)

### A. Overview
Includes another page (fragment.js); `loadFragment` also used by the Tabs block, Modal, header and footer. Usage 1.

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-17 (recursion guard) | fragment.js:75-117 global `loading` Set + "is the page" check | Fixed for recursion, **regressed**: any two concurrent loads of the same path return `null` for the second (R-C-5, verified with the Tabs block) |
| D-C-21 (editor hint) | js:129-136 `fragmentEmpty` | Confirmed fixed |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Reference (`reference`) | aem-content | first `a` href, else text (js:122-124); must start with `/` (js:105) | Label "Reference" technical (rename "Fragment page", not done) | Retain |
| Anchor ID / Hide block / Padding ×4 / Margin ×4 | | block options, CSS | OK | Retain |

### D. Variations
None. Live `fragment/fragment-block` (old content): 1 section, text rendered, no error.

### E. Accessibility
Inherits the fragment's semantics; duplicate ids across two inclusions of the same fragment (suspected, minor, as yesterday). Pass.

### F. Data layer
Fragment blocks tracked with `parentId` = the Fragment. OK.

### G. Personalization
Experience container in principle. No runtime: BLOCKED.

### H. Decision
**Modify** (R-C-5). Compatible.

---

### Block: Modal (`modal`)

### A. Overview
Button that opens a fragment page in a native `<dialog>`; links to `/modals/` auto-open (S:516-526). Usage 3.

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-9 (double click) | `opening` Set per path (modal.js:138-160). Live `modal-block` dblclick: 1 `dialog[open]` | Confirmed fixed (verified on aem.page) |
| D-C-10 (transient id) | `createModal(..., { id })` js:68, 95; block passes `${componentIdOf(block)}-dialog` js:191, else `modal-{path}` js:156. Live: `cmp:show / cmp:hide component.anchor-modal-awards-dialog` | Confirmed fixed |
| D-C-11 (focus return) | `opener` passed (js:191, S:522), `opener || document.activeElement` (js:127). Live: focus back on `BUTTON.button.primary` after Escape | Confirmed fixed |
| D-C-21 (editor hint) | js:171-179 `modalEmpty` | Confirmed fixed |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Modal Content (`link`) | aem-content | `a[href]` → `openModal` js:169-191 | OK | Retain |
| Button Text (`linkText`) | text | collapses into the link text (`*Text`) → button text js:182-186 | Works (by the collapse rule) | Retain |
| Anchor ID / Hide block / Padding ×4 / Margin ×4 | | block options, CSS | OK | Retain |

### D. Variations
Modal block, long content, form, auto-linked (yesterday verified; code unchanged except the fixes). Retain.

### E. Accessibility
| Requirement | Expected | Current | Status |
|---|---|---|---|
| Native modal, name, Escape, focus on open, focus return, `aria-haspopup` | | js:77-83, 85-92, 114-119, 188; live verified Escape + focus return | Pass |
| Double activation | one dialog | verified | Pass |

### F. Data layer
Stable ids verified live (opener `anchor-modal-awards`, dialog `anchor-modal-awards-dialog`). Two `cmp:click` for a double click (expected).

### G. Personalization
The fragment in principle. No runtime: BLOCKED.

### H. Decision
**Retain.** Compatible (verified on aem.page).

---

### Block: Section (`section`, models/_section.json; `decorateSectionsWithOptions` S:269-303, `applySectionBlockOptions` S:153-160)

### A. Overview
The plain section: options read before `decorateSections` (S:245-262), applied after (S:275-298); then the three container builders (S:300-302). Usage 1191 / 306 pages.

### B. Status of the first audit's defects
| Id | Verification | Status |
|---|---|---|
| D-C-14 | `availableId(anchor, section)` S:288; regExp on `anchorName` in `_section.json`, `_tabs.json`, `_columns-container.json` | Confirmed fixed (editor-only drift R-C-9) |
| D-C-2 (`applySectionBlockOptions`) | S:153-160 used by all three builders (S:179, S:202, S:231) | Confirmed fixed |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Section Name (`name`) | text | UE Content Tree label only | OK | Retain |
| Style (`style`) | multiselect: Highlight | Classes S:276-277; CSS:994-999 | `light`, `dark`, `brand` CSS (CSS:994-1020) still implemented but not authorable (yesterday's open decision; not in the register) | Decide (add Dark / Brand options or remove the dead CSS; `light` duplicates Highlight) |
| Width Type (`sectionWidth`) | full-width (default) / fixed-width | S:279-281; CSS:967-987, 1032-1035 | OK (399 uses) | Retain |
| Rounded edge (`roundedEdge`) | boolean | `rounded` S:282-284; CSS:1057-1060 | Visible only with a background / Highlight | Retain |
| Background Image (`backgroundImage`) | reference | S:289-297 | OK | Retain |
| Image alt text (`backgroundImageAlt`) | text | S:113-115 | OK | Retain |
| Anchor name (`anchorName`) | text, regExp `^#?[a-z0-9][a-z0-9-]*$` | S:286-288 | OK (149 uses) | Retain |

`applySectionBlockOptions` (S:153-160): copies every `data-classes*` value (split on spaces / commas, `toClassName`) and the section classes matching `SECTION_BLOCK_OPTIONS` (S:145: motion, anchor, hideblock, spacing). Plain sections don't call it (they have no Additional tab). OK.

### D. Variations
Highlight, fixed / full width, rounded, background: unchanged, verified yesterday. Retain.

### E. Accessibility
Background images decorative unless alt (S:113-115). Pass.

### F / G
Sections aren't components of the data layer; not personalizable.

### H. Decision
**Retain** (resolve the dark / brand / light style options; R-C-9 editor-only).

---

## New defects (R-C-n)

**R-C-1 (major, verified): a Tabs block inside a Tabs Container tab inherits the outer Style, Alignment and Orientation.**
- Where: `blocks/tabs/tabs.css` (all `.tabs .tabs-list …`, `.tabs.<style> .tabs-list …`, `.tabs.vertical …`, `.tabs .tabs-panel …` descendant selectors). Reachable since PR #119 added `tabs-block` to the `tabs` filter (also via a Fragment page holding a Tabs Container inside a Tabs block).
- Evidence (`tabs2.mjs`): an `underline left horizontal` Tabs block in a `pills vertical` Tabs Container: inner tab list `flex-direction: column`, tabs `border-radius: 9999px`, `border: 1px solid rgb(33,106,195)`, selected tab background brand blue.
- Fix (CSS only; child combinators don't change specificity, and tabs.js always builds `block > .tabs-list > .tabs-tab` and `block > .tabs-panel`): replace `.tabs .tabs-list` with `.tabs > .tabs-list`, `.tabs .tabs-list .tabs-tab` with `.tabs > .tabs-list > .tabs-tab`, `.tabs.boxed .tabs-list` / `.tabs.pills .tabs-list` / `.tabs.center .tabs-list` / `.tabs.stretch .tabs-list .tabs-tab` / `.tabs.vertical .tabs-list …` likewise (`.tabs.X > .tabs-list > .tabs-tab`), `.tabs .tabs-panel` with `.tabs > .tabs-panel` (incl. `[hidden]`, `:focus-visible`, `> div`, `> div:has(> .tab)` and the edit-mode rule), `.tabs.vertical .tabs-panel` with `.tabs.vertical > .tabs-panel`, `.tabs .tabs-fragment > .section + .section` with `.tabs > .tabs-panel > .tabs-fragment > .section + .section`. Backward compatible (same elements matched for non-nested tabs).

**R-C-2 (minor, verified): the synthetic Columns Containers built in tabs are counter-numbered data-layer components.**
- Where: T:100-116 (no id given), data-layer-decorator.js:40-47 (`{block}-{n}` in page order).
- Evidence (`tabs1.mjs`): local `tabs-section` registers `columns-container-1` … `columns-container-14` (parent `tabs-N`), so every real Columns Container section after them gets a shifted id; a default-content link in such a column is attributed to `component.columns-container-2` (`tabs2.mjs`), not to the panel as in a tab without Column Breaks.
- Fix: T:243, after `panel.append(...content)`: `const columns = panel.querySelector(':scope > .columns-container-wrapper > .columns-container'); if (columns) columns.dataset.cmpId = `${panel.id}-columns`;` (`componentIdOf` keeps an existing `data-cmp-id`). Stable, no counter consumed; with the D-C-13 fix (register the panels) the chain is page → tabs → panel-columns. No tracking added.

**R-C-3 (minor, verified): deep links and Anchor List links to content inside a hidden tab do nothing.**
- Where: T:38-53 (`panelOfHash` accepts only a panel id or a `data-tab-id`), anchor-list.js:140-154 (scrolls to the target without revealing it). More likely since PR #119: blocks with Anchor IDs and Column Break anchors can now sit in tabs.
- Evidence (`tabs2.mjs`): page opened at `#anchor-blk` (Accordion in tab 3) or `#anchor-col-x` (Column Break anchor in tab 2): target `display:none`, `scrollY` 0; Anchor List link to `#anchor-blk`: target not visible, not focused.
- Fix (no module imports another; an event, like `tabs:tab-update`):
  1. tabs.js `decorate`, with the other listeners: `block.addEventListener('tabs:reveal', (e) => { const index = tabs.findIndex(({ panel }) => panel.contains(e.target)); if (index >= 0 && index !== currentIndex) select(index); });` (bubbling reveals nested tabs from the inside out).
  2. `panelOfHash()` becomes `targetOfHash()`: the tagged panel, else `document.getElementById(id)` when it is inside `.tabs .tabs-panel`. `openPanelOfHash()`: `target.dispatchEvent(new CustomEvent('tabs:reveal', { bubbles: true }))`, then `(target.matches('.tabs-panel') ? target.closest('.tabs') : target).scrollIntoView()`. At T:313 use `tabs.findIndex(({ panel }) => linked && panel.contains(linked))`, and at T:320 `tabs.some(({ panel }) => panel.contains(linked))`.
  3. anchor-list.js:147, before `scrollIntoView`: `target.dispatchEvent(new CustomEvent('tabs:reveal', { bubbles: true }));`.
- Compatible: links to tab ids behave as today.

**R-C-4 (major when used, verified): a Conversation Canvas in a hidden tab takes over the floating Canvas.**
- Where: the `tabs` filter (PR #119 added `conversation-canvas`); canvas-controller.js:59-92 measures every connected Canvas, also one whose panel is `display:none` (rect 0, read as "scrolled past").
- Evidence (`tabs2.mjs`): Canvas in tab 1 (tab 2 active): `html[data-canvas-journey-state="floating-after-section"]`, the hidden Canvas has `conversation-canvas-owner` and role `section`: the floating row belongs to an element that isn't rendered (nothing visible floats; a header Canvas would be suppressed).
- Fix: remove `conversation-canvas` from the `tabs` filter in `blocks/tabs/_tabs.json`, `npm run build:json` (0 uses; the Canvas is a page-level journey component). Defensive (group D owner): canvas-controller.js:59 `const live = entries.filter((e) => e.block.isConnected && e.block.getClientRects().length).sort(byDomOrder);` and re-measure on `tabs:change` (document listener).

**R-C-5 (major, verified; regression of D-C-17): two concurrent loads of the same fragment: the second gets nothing.**
- Where: `blocks/fragment/fragment.js:75-117` (module-level `loading` Set: any in-flight path is treated as recursion). The Tabs block loads all its items' fragments in parallel (T:193 `Promise.all(items.map(readItem))`).
- Evidence (`tabs3.mjs`): `tabs/tabs-block` with two items on the same fragment: `consulting-offering` 1 child, `cloud-offering` **0 children (empty panel)**, `cybersecurity-offering` 1 child.
- Fix (recursion by ancestry, not "in flight"):
  ```js
  // the fragment pages the loading element is inside (its ancestors)
  const chainOf = (el) => (el?.closest('main[data-fragment-chain]')?.dataset.fragmentChain || '')
    .split(' ').filter(Boolean);
  async function fetchFragment(path, chain) {
    // … as now, plus:
    main.dataset.fragmentChain = chain.join(' ');
  }
  export async function loadFragment(path, from = null) {
    if (path && path.startsWith('/') && !path.startsWith('//')) {
      path = path.replace(/(\.plain)?\.html/, '');
      const page = window.location.pathname.replace(/\.html$/, '');
      const chain = chainOf(from);
      if (path === page || chain.includes(path)) return null;
      return fetchFragment(path, [...chain, path]);
    }
    return null;
  }
  ```
  Callers pass the element: fragment.js:124 `loadFragment(path, block)`, T:157 `loadFragment(path, row)`. Fragments are decorated inside their own detached `main`, so `closest()` sees the whole chain (A → B → A stops at the second A). Header, footer and Modal call without `from`. Remove the `loading` Set. Compatible.

**R-C-6 (minor, verified; editor only): selecting a component inside a nested Tabs doesn't open the outer tab.**
- Where: T:299-303 (`e.target.closest('.tabs-panel')` is the inner panel, not one of the outer Tabs' panels).
- Evidence (`tabs2.mjs`, synthetic `aue:ui-select`): outer panel stays `hidden`.
- Fix: `const index = tabs.findIndex(({ panel }) => panel.contains(e.target));` (as gen-carousel.js:229).

**R-C-7 (minor, code-verified; editor only): Tab and Column Break options edited in Universal Editor don't apply until reload.**
- Where: ES:53-69 re-renders only the marker block; T:305-308 updates only the title; columns-container.js:85-100 copies Column Break options to the column once.
- Effect: a Tab's Columns per row (27 uses) or Hide block, a Column Break's Hide block / spacing / Anchor ID: no change until reload; a hidden Tab's button and content aren't dimmed in edit mode and stay visible in UE Preview (only the chip is dimmed, CSS:1141).
- Fix: (1) tab.js:47 add `perRow` (the Tab's `per-row-N` class, or '') and `hidden: block.classList.contains('hideblock')` to the event detail; in T:305-308 also update the panel's `.columns-container` (remove its `per-row-*` / `columns-container-*` classes, add the new `per-row-N` and `columns-container-${Number(perRow.slice(8)) || Math.min(count, 4) || 1}`) and toggle a `tabs-tab-hidden` class on the button and panel (also set at build time for hidden groups in edit mode), with CSS `html.adobe-ue-edit .tabs > .tabs-list > .tabs-tab-hidden, html.adobe-ue-edit .tabs > .tabs-panel.tabs-tab-hidden { opacity: 0.45; }`. (2) Move the option copy of columns-container.js:89-98 into `export function applyColumnOptions(marker, column)` in column-break.js (first removing the column's `COLUMN_OPTIONS` classes and id); call it from `createColumn` and, when `block.closest('.columns-container-column')` exists, from column-break.js `decorate`.

**R-C-8 (minor, code-verified): an Embed keeps playing in a tab that is no longer shown (WCAG 1.4.2).**
- Where: T:259-265 (`select` toggles `hidden` only). Video files pause via `pauseOffscreen` (video.js:248-256); YouTube / Vimeo iframes (embed.js) don't, and they can now be put in tabs directly (PR #119), before only through fragments.
- Fix: in `select`, for each panel that becomes hidden: `panel.querySelectorAll('video').forEach((v) => v.pause()); panel.querySelectorAll('iframe').forEach((f) => f.contentWindow?.postMessage(f.src.includes('vimeo') ? '{"method":"pause"}' : '{"event":"command","func":"pauseVideo","args":""}', '*'));` and add `enablejsapi: '1'` to the YouTube parameters in decorators/media-decorator.js (needed for the YouTube command).

**R-C-9 (minor, code-verified; editor only): ids drift to `-2` after each section or block re-render in Universal Editor.**
- Where: ES:57-66 and ES:76-87 insert the new element while the old one (same ids) is still in the page; `availableId` (S:288, T:225-230, block-options-decorator.js:23) then suffixes the new section id, Anchor IDs and tab panel ids.
- Effect: after any edit in a section with an Anchor name the section is `name-2` in the editor; Anchor List links to `#name` find no target until reload (tab deep links survive via `data-tab-id`).
- Fix: before decorating, strip the ids of the element being replaced (it is removed right after): at ES:58 for `block` and at ES:77 for `element`: `[el, ...el.querySelectorAll('[id]')].forEach((node) => node.removeAttribute('id'));`.

**R-C-10 (minor, verified by code): Tab templates store a sample title; Tab IDs aren't validated.**
- Where: `_tab.json` template `"title": "Tab"`, `_tabs.json` `tabs-item` template `"title": "Tab"`; both `tabId` fields have no `validation` (the Tabs Container `anchorName` has one).
- Effect: every new Tab is named "Tab" (AGENTS: no sample content in templates; the numbered fallback `tabNumber` "Tab {n}" exists, T:251); an ID like "Our Offices" is silently normalized.
- Fix: remove `"title": "Tab"` from both templates (Title stays required on the Tab); add `"validation": { "regExp": "^#?[a-z0-9][a-z0-9-]*$", "customErrorMsg": "Lower-case letters, digits and hyphens, e.g. overview." }` to both `tabId` fields; `npm run build:json`. Existing values unchanged.

**R-C-11 (minor, verified by code): Accordion Item template stores "Lorem Ipsum" sample content.**
- Where: `blocks/accordion/_accordion.json`, `accordion-item` template `"summary": "Lorem Ipsum"`, `"text": "<p>Lorem ipsum dolor sit amet…</p>"` (same class as D-A-15).
- Effect: every item an author adds starts with Lorem text, published if not replaced.
- Fix: remove `summary` and `text` from the template; `npm run build:json`. An empty new item is already an editor placeholder (accordion.js:17-21). Existing items unchanged.

**R-C-12 (minor, code-verified): the Gen Carousel play / pause toggle always reports `interaction: pause`.**
- Where: GC:156.
- Fix: in `updateToggle` (GC:144-152) `toggle.dataset.cmpInteraction = playing() ? 'pause' : 'play';` (the central capture-phase listener reads it before the click handler runs, so it names the action taken); remove GC:156.

**R-C-13 (minor, suspected: needs Universal Editor): the Accordion summary loses its cell instrumentation.**
- Where: accordion.js:24-27 moves the label cell's child nodes into `<summary>`, not its `data-aue-*` attributes (only the row's, js:32), so inline editing of the summary may not work.
- Fix: `moveInstrumentation(label, summary);` before `summary.append(...label.childNodes)`. Harmless when the cell has none.

---

## Backward compatibility on aem.page (current code, installed content 1.0.6)
| Page (language-master/en/block-library/…) | Changed by | Result (Playwright, `/tmp/audit2/c/*.json`) |
|---|---|---|
| `tabs/tabs-section`, `tabs/tab` (Tabs Containers whose tabs hold built-in Columns) | PR #119 (`columnsOf`, filter), D-C-2/3/7/8 | Render: every panel `columns-wrapper > .columns.block.columns-2-cols` loaded, rows `display:flex`, sections `display:block` (their `columns-container` class from the Columns is harmless), Active tab honoured (`anchor-tab-active-item-3` shown), no console error, no duplicate id. `columnsOf` is inert without Column Breaks |
| `columns/columns-variations` (built-in Columns; Additional tab removed from the model) | PR #119, D-C-1/22/23 | 6 Columns loaded, flex rows, built-in Buttons as `a.button`, no `classes_*` delivered (as before), no error |
| `tabs/tabs-block-with-fragments` | D-C-3/8/17 | Panels `overview` / `industries` with fragment content, no error (R-C-5 only hits a fragment used twice in one Tabs block) |
| `accordion/accordion` | D-C-20 / L-3 | 3 accordions, no empty first item |
| `modal/modal-block` | D-C-9/10/11 | 1 dialog on double click, stable ids, focus returns |
| `gen-carousel/manual-and-auto` | D-C-5/16 | One `cmp:show` per jump, inert slides, default name "Carousel" (no label authored) |
| `anchor-list/anchor-list`, `fragment/fragment-block` | D-C-17/21 | Render, no error |
| Columns Container pages | D-C-1/4/15 | Not at these paths in the installed package (404); verified locally |

---

## Summary
- Components reviewed: 15 (Tabs Container, Tab, Tabs block, Tabs item, Gen Carousel, Columns, Columns Container, Column Break, Accordion, Accordion Item, Anchor List, Anchor Link, Fragment, Modal, Section).
- Register re-verification (D-C-1 … D-C-23): **19 confirmed fixed** (D-C-1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 20, 21, 22, 23); **1 not fixed** (D-C-13: panels and slides carry `data-cmp-id` but are still not registered; fix given); **1 regressed** (D-C-17: the recursion guard blocks legitimate parallel loads, R-C-5); **2 still deferred** (D-C-6: wording fix given; D-C-19: editor only, AbortController fix given). L-3 confirmed fixed on aem.page. (D-C-18 evidence: `blocks/video/_video.json` has `"filters": []` and component-filters.json has no `video` filter.)
- New defects:
  - R-C-1 major: a nested Tabs block inherits the outer Tabs Container's style / orientation (tabs.css descendant selectors).
  - R-C-2 minor: the synthetic Columns Containers in tabs consume the `columns-container-N` counter; clicks in their columns are attributed to them.
  - R-C-3 minor: deep links / Anchor List links to content in a hidden tab don't open the tab.
  - R-C-4 major (when used): a Conversation Canvas in a hidden tab owns the floating Canvas; remove it from the `tabs` filter.
  - R-C-5 major: regression of D-C-17: the same fragment twice in a Tabs block leaves a panel empty.
  - R-C-6 minor (editor): `aue:ui-select` in a nested Tabs doesn't open the outer tab.
  - R-C-7 minor (editor): Tab Columns per row / Hide block and Column Break options don't apply until reload.
  - R-C-8 minor: Embeds keep playing in hidden tabs (1.4.2).
  - R-C-9 minor (editor): ids drift to `-2` on every UE re-render.
  - R-C-10 minor: Tab templates store "Tab"; Tab IDs not validated.
  - R-C-11 minor: Accordion Item template stores Lorem Ipsum.
  - R-C-12 minor: carousel toggle always `pause` in the data layer.
  - R-C-13 minor (suspected): Accordion summary cell instrumentation not moved.
- Column Breaks in tabs (PR #119): layout, keyboard, focus order, hidden panels, ids and old-content compatibility pass; the issues are around it (R-C-1 to R-C-9).
- Report: `/tmp/audit2/review-C.md`; evidence scripts and results: `/tmp/audit2/c/`.

