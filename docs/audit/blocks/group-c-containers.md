# Review group C: containers, disclosure and fragment blocks

Scope: Accordion (+ Accordion Item), Tabs Container section (`tabs`) + `tab`, Tabs block (`tabs-block`) + `tabs-item`, Gen Carousel section, core Columns (+ implicit `columns` / `column` filters), Columns Container section + Column Break, Anchor List (+ Anchor Link), Fragment, Modal, the plain Section model, the `video` filter.

How this was checked: every line of the JS / CSS / model files listed below was read. Targeted Playwright checks ran on the local preview (`/tmp/audit/c/check.mjs`, `deep.mjs`, `deep2.mjs`, `cols.mjs`, `acc.mjs`), some with route-mutated HTML. The repository was not modified. "Verified" means the code was read and the result reproduced, or the code path is unambiguous. "Suspected" means it was not reproduced, or it depends on AEM delivery that can't be checked locally.

Usage counts come from `/tmp/audit/inventory.json` (installed content package). One exception: the inventory gives **Columns 0 instances**, which is a counting artefact. The block library package `tcs-corp-block-library-content-1.0.6.zip` contains 37 `core/franklin/components/columns/v1/columns` nodes in 9 files.

Line references: `scripts/scripts.js` = S, `blocks/tabs/tabs.js` = T, `blocks/gen-carousel/gen-carousel.js` = GC.

---

## Block: Tabs Container (`tabs`, section; synthetic block class `tabs`, section style `tabs-section`)

### A. Overview
- Purpose: a section whose Tab items start tabs. The components after a Tab, up to the next Tab, are its panel.
- Files: `blocks/tabs/_tabs.json` (definition, model and filter `tabs`), S:167-181 `buildTabsSections`, S:125-141 `wrapSectionContent`, `blocks/tabs/tabs.js` (shared with the Tabs block), `blocks/tabs/tabs.css`, `blocks/tab/tab.js|css`.
- Container / items: filter `tabs` = `tab`, `columns`, `title`, `text`, `image`, `button-block`. Parent: `main`.
- Usage: 17 instances on 4 pages (tabsStyle underline 15 / boxed 1 / pills 1; orientation vertical 1).

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Component (`style`) | select, single option Tabs = `tabs-section` | Section class, S:262. It marks the section for `buildTabsSections` (S:168) | Single-option select labelled "Component". Required as the marker | Retain (rename the label to "Style" to match the other containers) |
| ID (`anchorName`) | text | Becomes the section id (S:33, S:272-273). It is also `baseId` for the panel ids `{id}-item-n` (T:153) | Not validated. Silently dropped when the id is taken (S:273). Overlaps with Anchor ID on the Additional tab | Retain + Correct (validation regExp, de-duplication; see D-C-14) |
| Width Type (`sectionWidth`) | full-width / fixed-width, default full-width | `fixed-width` class, S:265-267 | OK | Retain |
| Label (`tabsAriaLabel`) | text | `data-label`, S:178. Becomes the tablist `aria-label`, T:182 | OK (fallback placeholder `tabs`) | Retain |
| Style (`tabsStyle`) | underline / boxed / pills, default underline | Class, S:176-177. CSS tabs.css:54-104 | `underline` has no class rule; it is the base style. OK | Retain |
| Alignment (`tabsAlignment`) | left / center / stretch, default left | Class. CSS tabs.css:64-83 | `left` is the base | Retain |
| Orientation (`tabsOrientation`) | horizontal / vertical, default horizontal | Class. `aria-orientation` T:181. Grid tabs.css:169-221 (>= 900px) | OK | Retain |
| Anchor ID (`classes_anchor`) | text, `anchor-` regExp | **Not applied.** `buildTabsSections` never copies section `classes_*` (S:167-181). `applyBlockOptions` only handles `.block` | Non-functional, and a duplicate of "ID" | Remove (keep "ID"), or Correct via D-C-2 |
| Hide block (`classes_hideblock`) | boolean | **Not applied** (styles.css:1134 targets `.block.hideblock`) | Non-functional | Correct (D-C-2) |
| Animation Type (`classes_animation`) | 10 effects + None | **Not applied** (`prepareMotion` only looks at `.block`; `tabs` is not in `CONTENT_TARGETS`) | Non-functional | Correct (D-C-2) or Remove |
| Motion Speed (`classes_animationspeed`) | Medium / Fast / Slow; shown when an animation is set | Not applied | Non-functional | Same as Animation Type |
| Animation Trigger (`classes_animationtrigger`) | On Scroll / On Page Load; shown when an animation is set | Not applied | Non-functional | Same as Animation Type |
| Padding left / right / top / bottom (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | Default + 14 tokens | Not applied (styles.css:1145+ targets `.block` / `.columns-container-column`) | Non-functional | Correct (D-C-2) |
| Margin left / right / top / bottom (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | Default + 14 tokens | Not applied | Non-functional | Correct (D-C-2) |

Defaults: the template (`tabsStyle` underline, `tabsAlignment` left, `tabsOrientation` horizontal), the model and the code all agree. `sectionWidth` has no template default; the code treats a missing value as full width.

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Underline / Boxed / Pills | Tab look | Distinct CSS for each | Retain |
| Left / Center / Stretch | Tablist alignment | Distinct CSS (`safe center`; stretch = `flex: 1 0 auto`) | Retain |
| Horizontal / Vertical | Layout | Vertical is a grid from 900px; stacked below 900px | Retain |
| Fixed / Full width | Section width | Section classes | Retain |
| Content before the first Tab | Fallback | Becomes an untitled "Tab 1" (T:74-82) | Retain (documented) |

### E. Accessibility (shared tabs.js; applies to the Tabs block too)
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Roles | tablist / tab / tabpanel, `aria-controls`, `aria-labelledby` | T:180-202. Playwright: `controlsOk` true on tabs-section | None | Pass |
| Arrow keys, Home, End | Move and select, wrap around | T:227-244. Playwright: Right, End, Home, Left (wrap) all correct | None | Pass |
| Roving tabindex | Selected tab 0, others -1 | T:211-212. Verified (`true/0 false/-1 ...`) | None | Pass |
| Tab key into the panel | Panel focusable | `panel.tabIndex = 0` (T:192). Tab moves to `tabpanel#…-item-4` | None | Pass |
| Unique ids | No duplicates | **Fails** when two tabs share an ID, or a tab ID equals a heading id in an earlier panel: ids are assigned while earlier panels are detached (T:187-193). Playwright: `['consulting','consulting','cybersecurity']`, and an injected `h3#cloud` gave duplicate `cloud` | D-C-3 | Fail |
| Deep link | `#id` opens the tab | Works (T:38-50, T:258-271). Breaks when a heading has the same id (`#cloud` opened tab 1) | D-C-3 | Partial |
| Focus visible | Outline | tabs.css:43-46, 115-118 | None | Pass |
| Reduced motion | No transitions | tabs.css:153-157 | None | Pass |
| Accessible name of the list | Authorable | `tabsAriaLabel`, else "Tabs" | None | Pass |

### F. Data layer
- Each change of tab pushes `cmp:show` with path `component.{panel.id}` (T:223). The panel ids are **not registered components**, so the path points to nothing (D-C-13).
- A click also pushes `cmp:click` centrally (the tab is a `button`). That is two events of different types per click, which is acceptable.
- Deep links call `.click()` (T:48), so a programmatic `cmp:click` is recorded as a user click (minor).
- The hidden Tab marker blocks are registered as components. Playwright on tabs-section: `tab-1` … `tab-36` (D-C-12).
- Component id: the synthetic block has no id, so it is `tabs-N` in page order. That is stable as long as the page doesn't change.

### G. Personalization
Not personalizable. There is no personalization field, and no Target / Tags runtime exists (Experience container in principle: the panels).

### H. Decision
**Modify.** Apply or remove the Additional tab (D-C-2), fix the panel ids (D-C-3), validate the ID field (D-C-14). All changes are backward compatible: no content sets any Additional value (inventory: only defaults are used).

---

## Block: Tab (`tab`, marker block inside a Tabs Container; class `tab`)

### A. Overview
- Purpose: a key-value block marking where a tab starts, with Title, ID and Active tab. It is hidden on the page (tabs.css:136-142) and shown as a chip in edit mode (tab.css).
- Files: `blocks/tab/_tab.json`, `tab.js` (`readTab` caches its values in `data-tab-*`, tab.js:19-32), `tab.css`.
- Usage: 53 instances on 4 pages.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Title (`title`) | text, required | `readTab` (tab.js:26) → tab button text (T:201). Live update in UE via `tabs:tab-update` (T:253-256) | OK | Retain |
| ID (`tabId`) | text | Panel id (T:190), the deep link | Duplicates are not de-duplicated within one Tabs (D-C-3). No validation | Retain + Correct |
| Active tab (`activeTab`) | boolean | `isOn` → initial tab (T:262) | In UE, a change of ID or Active tab only applies after a reload (only the title is live) | Retain |
| Anchor ID (`classes_anchor`) | text | `applyBlockOptions` puts the id on the **hidden** marker, so `#anchor-x` scrolls to a `display:none` element and does nothing | Non-functional, and confusing next to ID | Remove |
| Hide block (`classes_hideblock`) | boolean | Hides only the already hidden marker. The tab and its panel stay | Option has no effect | Correct (skip the tab group when `hideblock` is set and not editing; tabs.js `groupContainerTabs`) |
| Padding left / right / top / bottom (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | tokens | Applied to the hidden marker | No effect | Remove |
| Margin left / right / top / bottom (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | tokens | Applied to the hidden marker | No effect | Remove |

### D. Variations
None.

### E. Accessibility
The marker is hidden on the page, so there is nothing to test. In edit mode it is a `<p>` chip. Pass.

### F. Data layer
Every marker is registered as a component (`tab-n`). This is noise (D-C-12).

### G. Personalization
Not personalizable.

### H. Decision
**Modify.** Remove Anchor ID and the spacing fields, implement Hide block (D-C-7). The fields being removed have no stored values, so there is nothing to migrate.

---

## Block: Tabs (`tabs-block`, block class `tabs`) + item Tab (`tabs-item`)

### A. Overview
- Purpose: a key-value block whose Tab items each show a **Fragment** page. Same rendering as the Tabs Container (tabs.js).
- Files: `blocks/tabs/_tabs.json` (definitions `tabs-block`, `tabs-item`; filter `tabs-block` = `tabs-item`), tabs.js `readBlockProperties` (T:90-106), `readItem` (T:118-138), `blocks/fragment/fragment.js`.
- Template name "Tabs" gives class `tabs`. It shares the name "Tabs" with the section, and the item title "Tab" with the `tab` marker (filters keep them apart).
- Usage: block 7 instances on 3 pages; items 20.

### C. Dialog validation (block)
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| ID (`tabsId`) | text | `baseId` (T:105, T:158). Also the `shownTabs` key on published pages (T:162) | Two Tabs blocks with the same ID collide in `shownTabs`: the second opens the first's tab index and ignores its own Active tab and deep link (D-C-8). Not validated | Retain + Correct |
| Label (`tabsAriaLabel`) | text | `data-label` → tablist `aria-label` (T:104, T:182) | OK | Retain |
| Style (`tabsStyle`) | underline / boxed / pills | `pick()` → class (T:100) | OK | Retain |
| Alignment (`tabsAlignment`) | left / center / stretch | Class (T:101) | OK | Retain |
| Orientation (`tabsOrientation`) | horizontal / vertical | Class (T:102) | OK | Retain |
| Anchor ID (`classes_anchor`) | text | Block id (block-options-decorator.js:24-25) | Works, but there are now two "ID"-like fields (ID = panel id prefix; Anchor ID = block id) | Retain; reword ID's label to "Tab ID prefix" |
| Hide block (`classes_hideblock`) | boolean | styles.css:1134-1135 | OK | Retain |
| Padding left / right / top / bottom (`classes_padding*`) | tokens | styles.css:1145+ | OK | Retain |
| Margin left / right / top / bottom (`classes_margin*`) | tokens | styles.css | OK | Retain |

No animation fields (`tabs` is not in `CONTENT_TARGETS`). That is consistent.

### C. Dialog validation (item `tabs-item`)
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Title (`title`) | text, required; template "Tab" | Cell 1 of `ITEM_LAYOUT` (T:110, T:132) | OK | Retain |
| ID (`tabId`) | text | Panel id (T:133, T:190) | Same de-duplication issue as above (D-C-3) | Retain + Correct |
| Active tab (`activeTab`) | boolean | `isOn` (T:134) | OK | Retain |
| Fragment (`fragment`) | aem-content | Last cell: link href or text → `loadFragment` (T:121-123) | All fragments load in parallel (`Promise.all`, T:157) into detached `main` elements, so ids inside different fragments aren't de-duplicated against each other (suspected, minor). No recursion guard (D-C-17). An empty panel has no editor hint | Retain |

### D. Variations
Same as the Tabs Container (style, alignment, orientation), all verified distinct. "Tabs block with fragments" pages render.

### E. Accessibility
Same as the Tabs Container (shared code; keyboard verified). D-C-3 applies.

### F. Data layer
Same as the Tabs Container. Clicks inside fragments are attributed to the fragment's own blocks.

### G. Personalization
Item level in principle (the fragment per tab is the natural swap point). No runtime.

### H. Decision
**Modify** (D-C-3, D-C-8). See the redundant block assessment (Tabs Container vs Tabs block).

---

## Block: Gen Carousel (`gen-carousel`, section; synthetic block class `gen-carousel`, section style `gen-carousel-section`)

### A. Overview
- Purpose: a section whose components each become one slide. Manual and / or autoplay.
- Files: `blocks/gen-carousel/_gen-carousel.json`, S:149-159 `buildCarouselSections`, `gen-carousel.js`, `gen-carousel.css`.
- Filter `gen-carousel` = `hero`, `teaser`.
- Usage: 5 instances on 5 pages (manual 3, auto 1, manual-auto 1).

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Style (`style`) | select, single option Default = `gen-carousel-section` | Section class → S:150 | A single option labelled "Default" | Retain (rename the label to "Component: Carousel" or similar) |
| Navigation (`carouselNavigation`) | manual / auto / manual-auto, default manual | `data-carouselnavigation` → class (S:155) → `readNavigation` (GC:20-23) | OK. Auto only: no swiping (css:22-25); the dots still show | Retain |
| Autoplay interval (seconds) (`carouselInterval`) | number 2-30, default 5; shown unless Manual | `data-interval` (S:156) → `readInterval`, clamped to at least 2 s (GC:26-29) | No upper clamp in the code (the model enforces max 30) | Retain |
| Anchor ID (`classes_anchor`) | text | **Not applied** (S:149-159 copies only navigation and interval) | Gen Carousel has **no working anchor at all** (no `anchorName` either) | Correct (D-C-2) |
| Hide block (`classes_hideblock`) | boolean | Not applied | Non-functional | Correct (D-C-2) |
| Animation Type / Motion Speed / Animation Trigger (`classes_animation`, `classes_animationspeed`, `classes_animationtrigger`) | as on other blocks | Not applied (`gen-carousel` isn't a target and gets no classes) | Non-functional | Remove (slides already have their own block animations), or Correct |
| Padding (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | tokens | Not applied | Non-functional | Correct (D-C-2) |
| Margin (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | tokens | Not applied | Non-functional | Correct (D-C-2) |

There is no Width Type (other containers have it) and no accessible label field (D-C-16).

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Manual | Previous / next, dots, swipe, arrow keys on the controls | GC:159-176 | Retain |
| Auto | Autoplay with pause / play; no swiping | GC:146-157; css:22-25 | Retain |
| Manual and Auto | Both | Both code paths | Retain |
| Single slide | No controls | GC:66-69 | Retain |
| Hero slides / Teaser slides | Content | The slide wraps any block | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Carousel semantics | `role=region`, `aria-roledescription=carousel`, slides `role=group`, "n of total" | GC:41-43, 57-59. Verified | None | Pass |
| Accessible name | Unique per carousel | Always "Carousel" (GC:43) | Add a label field (D-C-16) | Partial |
| Previous / next | Buttons with names | "Previous slide" / "Next slide", `aria-controls` | None | Pass |
| Pause for autoplay (2.2.2) | Pause / play button | GC:146-157. Also pauses on hover, keyboard focus, off screen, hidden tab | None | Pass |
| Reduced motion | No autoplay, no smooth scroll | `userPaused` starts true; Playwright with `reducedMotion`: toggle "Play slides"; `scrollBehavior` is `auto` | None | Pass |
| Slide announcements | Polite while the user navigates, off while autoplay runs | GC:143. Verified `aria-live=polite` in manual mode | None | Pass |
| Inactive slides | Not focusable | `inert` (GC:100). Verified `[false,true,…]` | D-C-5: intermediate toggling during smooth scroll | Pass (minor) |
| Keyboard | Arrows on the controls only | GC:170-176 | None | Pass |
| Duplicate ids | None | `uniqueId('gen-carousel')`. Verified none | None | Pass |

### F. Data layer
- `cmp:show` with path `component.gen-carousel-N-slide-M` (GC:92). The slide ids are `data-cmp-id`, but they aren't registered components (D-C-13).
- **Spurious events (verified):** one dot click from slide 1 to slide 6 pushed `cmp:show` for slides 6, 2, 3, 4, 5, 6. The wrap from 6 to 1 pushed 1, 5, 4, 3, 2, 1. Cause: the IntersectionObserver calls `setCurrent` for each slide passed during the smooth scroll (GC:188-193; D-C-5).
- Controls: `data-cmp-interaction` previous / next / pause. The toggle is always "pause", even when it resumes. The dots have no interaction or position attributes.

### G. Personalization
Item level in principle (slides). No runtime.

### H. Decision
**Modify** (D-C-2, D-C-5, D-C-16, D-C-19). Rename the title to "Carousel"; keep the id and style value for compatibility.

---

## Block: Columns (`columns`, core resource type `core/franklin/components/columns/v1/columns`, class `columns`)

### A. Overview
- Purpose: a core grid of rows × columns. Each cell holds default content (the `column` filter: text, image, button, title).
- Files: `blocks/columns/_columns.json`, `columns.js` (Block Collection: `columns-N-cols`, `columns-img-col`), `columns.css`.
- Parents: section, columns-container, tabs.
- Usage: inventory 0 (artefact). The package has 37 nodes. No curated page uses it.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Columns (`columns`) | text, valueType number; template "2" | Used by the AEM core component to build the cells; the code counts the cells (columns.js:2-3) | A text component holding a number (boilerplate convention) | Retain |
| Rows (`rows`) | text, valueType number; template "1" | AEM core component | Same | Retain |
| Anchor ID / Hide block / Animation (`classes_anchor`, `classes_hideblock`, `classes_animation`, `classes_animationspeed`, `classes_animationtrigger`) | as on blocks | `applyBlockOptions`, styles.css, `CONTENT_TARGETS.columns` (stagger per cell) | **Suspected:** it is unverified whether the core Columns resource type delivers `classes_*` as block classes. The local renderer and the package assume it does. Check on AEM preview | Retain pending verification (D-C-22) |
| Padding / Margin (`classes_padding*`, `classes_margin*`) | tokens | styles.css | Same as above | Retain pending verification |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| 2 / 3 columns, several rows | Grid | Flex: stacked below 900px, side by side from 900px (columns.css) | Retain |
| Image column | Image first on mobile | `columns-img-col` gets `order: 0` | Retain |

`columns.css` hard-codes `gap: 1.5rem` and `align-items: center` (no token, no option). Minor.

### E. Accessibility
Static content. Reading order follows the DOM; on mobile the image column is moved visually first with CSS `order`, while the DOM order stays (acceptable for images). Alt text comes from the Image component. Pass.

### F. Data layer
Registered as `columns-N`. Links and buttons inside are clicks of the Columns component. OK.

### G. Personalization
Not personalizable.

### H. Decision
**Retain.** It is the only multi-column option allowed inside a Tabs Container. Fix the collision with Columns Container CSS (D-C-1). `columns.js:2` throws on a block without rows (D-C-23, minor).

**Filters `columns` / `column`:** the inventory lists them as unused. They are implicit: the core Columns resource type uses the filter ids `columns` (cells) and `column` (cell content), as in the xwalk boilerplate. **Retain.** Note that `column` allows only `button` (Button basic) and not `button-block`; this is correct, because blocks can't nest in core cells.

---

## Block: Columns Container (`columns-container`, section; synthetic block class `columns-container`) + Column Break (`column-break`)

### A. Overview
- Purpose: a section laid out in columns of default content and blocks. Each Column Break starts a column.
- Files: `_columns-container.json`, S:191-220 `buildColumnsSections`, `columns-container.js|css`, README; `blocks/column-break/*`.
- Filter: 26 components (every block except Page Header, Footer, TCS Header).
- Usage: 22 instances on 3 pages; Column Break 65.

### C. Dialog validation (Columns Container)
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Style (`style`) | multiselect Columns Container (`columns-container-section`) + Highlight | Section classes S:262; marker S:198 (or any Layout data attribute, S:196-197) | OK | Retain |
| Width Type (`sectionWidth`) | full / fixed | S:265 | OK | Retain |
| Background Image (`backgroundImage`) | reference | S:274-282 | OK | Retain |
| Image alt text (`backgroundImageAlt`) | text | S:113-114 | OK | Retain |
| Anchor name (`anchorName`) | text | Section id S:272-273 | Overlaps with Anchor ID (both work: section id and block id). Not validated; dropped when the id is taken | Retain + Correct (D-C-14); document which one to use |
| Columns per row (`columnsPerRow`) | auto, 1-4; default auto | `per-row-N` → `perRow()` (columns-container.js:31-34) → `columns-container-N` | OK (auto = number of columns, at most 4) | Retain |
| Gap (`columnsGap`) | small / medium / large; default medium | `gap-*` (css:22-23; medium is the base) | OK | Retain |
| Vertical alignment (`columnsAlign`) | top / middle / bottom / stretch | `align-*` (css:26-28; top is the base) | OK | Retain |
| Side by side from (`columnsFrom`) | tablet / desktop / large; default desktop | `from-*` (css:71-87) | OK | Retain |
| Anchor ID (`classes_anchor`) | text | Copied to the block (S:212-217) → `applyBlockOptions` id | OK | Retain |
| Hide block (`classes_hideblock`) | boolean | Block hidden (styles.css:1134-1135) | With Highlight or a background, the **empty coloured section band remains** (D-C-15) | Correct |
| Animation Type / Speed / Trigger (`classes_animation`, `classes_animationspeed`, `classes_animationtrigger`) | | `CONTENT_TARGETS['columns-container']`, staggered columns | OK | Retain |
| Padding (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | tokens | On the synthetic block | OK | Retain |
| Margin (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | tokens | On the synthetic block | OK | Retain |

The template defaults (gap medium, align top, from desktop, per row auto) match the model and the code. Rounded edge (a Section field) is missing; that is fine.

### C. Dialog validation (Column Break)
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Column name (`title`) | text | `readColumn` → editor label (column-break.js:17-24, 30-39) | Editor only (documented) | Retain |
| Anchor ID (`classes_anchor`) | text | `column.id = anchor` (columns-container.js:44-45). `applyBlockOptions` **also** gives the hidden marker the same id | **Duplicate id (verified):** `[id=anchor-col-test]` on the column and on the marker | Correct (D-C-4) |
| Hide block (`classes_hideblock`) | boolean | Copied to the column (`COLUMN_OPTIONS`, js:22, 42-43; css:50-57) | OK | Retain |
| Padding (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | tokens | Copied to the column (styles.css `.columns-container-column.p*`) | OK | Retain |
| Margin (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | tokens | Copied to the column | OK | Retain |

### D. Variations
Columns per row, gap, alignment and breakpoint values all have distinct CSS. Content before the first Column Break becomes its own column. Legacy items with class `column` are converted (S:201). Verified on the block library pages.

### E. Accessibility
| Requirement | Expected | Current | Correction | Status |
|---|---|---|---|---|
| Reading order | DOM order = visual order | Grid in DOM order | None | Pass |
| Unique ids | | Column Break anchor duplicated (verified) | D-C-4 | Fail |
| Hidden markers | Not exposed | `display:none` (column-break.css) | None | Pass |
| Editor hints | Placeholders | `columnEmpty`, `columnsContainerEmpty` | None | Pass |

### F. Data layer
The synthetic block is registered as `columns-container-N` (or its Anchor ID). **Every Column Break marker is registered as a component** (code: trackBlocks registers every `.block`; D-C-12).

### G. Personalization
Experience container in principle (columns). No runtime.

### H. Decision
**Modify** (D-C-1 is major: the unscoped CSS breaks other sections; D-C-4, D-C-15).

---

## Block: Accordion (`accordion`, class `accordion`) + item Accordion Item (`accordion-item`)

### A. Overview
- Purpose: collapsible items built on native `<details>` / `<summary>` (Block Collection).
- Files: `_accordion.json`, `accordion.js` (11-27), `accordion.css`.
- Filter `accordion` = `accordion-item`. Parents: section, columns-container.
- Usage: 5 instances on 3 pages; 19 items.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Summary (`summary`, item) | text; template "Lorem Ipsum" | Cell 1 → `<summary>` (accordion.js:13-17) | The label "Summary" is technical (it is the question / title). An empty summary gives a nameless control; there is no editor placeholder (D-C-20). Suspected: inline editing of the summary may be lost, because only the cell's child nodes are moved (moveInstrumentation only on the row) | Rename the label to "Title"; Correct |
| Text (`text`, item) | richtext | Cell 2 → `.accordion-item-body` (accordion.js:18-19) | OK | Retain |
| Anchor ID (`classes_anchor`) | | Block id | OK | Retain |
| Hide block (`classes_hideblock`) | | styles.css | OK | Retain |
| Animation Type / Speed / Trigger (`classes_animation`, `classes_animationspeed`, `classes_animationtrigger`) | | `CONTENT_TARGETS.accordion` (items staggered) | OK (1 instance uses fade-left) | Retain |
| Padding (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | tokens | styles.css | OK | Retain |
| Margin (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | tokens | styles.css | OK | Retain |

There are no "open by default" or "one open at a time" (`details[name]`) options. Not a defect.

### D. Variations
None (a single style).

### E. Accessibility
| Requirement | Expected | Current | Correction | Status |
|---|---|---|---|---|
| Disclosure semantics | Native details / summary or button + `aria-expanded` | Native `<details>` | None | Pass |
| Keyboard | Enter / Space toggle | Playwright: Enter opened, Space closed | None | Pass |
| Focus visible | Outline | css:52-55 | None | Pass |
| Heading structure | Optional heading in the summary (APG) | The summary holds a `<p>`, so there is no heading navigation | Optional: a heading level option | Advisory |
| Reduced motion | | css:76-81 | None | Pass |
| Name | Non-empty summary | Empty when the author leaves it blank | D-C-20 | Partial |

### F. Data layer
The central `toggle` capture (data-layer-decorator.js:120-126) pushes `cmp:show` / `cmp:hide` with path `component.{accordion id}` and `dc:title` = the summary. Verified on click: `cmp:show component.anchor-accordion-overview`. Summary clicks are excluded from `cmp:click`, so there are no duplicates. The item has no id of its own (`dc:title` identifies it).

### G. Personalization
Item level in principle. No runtime.

### H. Decision
**Retain** (minor D-C-20; rename the Summary label).

---

## Block: Anchor List (`anchor-list`, class `anchor-list`) + item Anchor Link (`anchor-list-item`)

### A. Overview
- Purpose: chapter navigation to section Anchor names, ids or Anchor IDs, with the current chapter marked and optional sticky pinning.
- Files: `_anchor-list.json`, `anchor-list.js`, `anchor-list.css`.
- Usage: 5 instances on 5 pages; 19 items; 2 on curated pages.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Links (`anchors`, container multi: `label`, `anchorName`) | legacy | `readAnchors` (js:30-36) via `readMultifieldItems` | Legacy composite multifield (described as such). It doesn't render from packages | Deprecate (keep reading it; remove from the model once no content uses it) |
| Sticky (`sticky`) | boolean, false | `isOn` → class `sticky` (js:109) → `pinWhenScrolled` (js:69-93) | OK; not pinned in edit mode | Retain |
| Link Title (`label`, item) | text, required | Item cell (js:39-44) | OK | Retain |
| Anchor Name (`anchorName`, item) | text | `anchorOf` → `toClassName`, with or without `#`. **Falls back to the title** when empty (js:23), which is undocumented | The description should mention that Anchor IDs (`anchor-…`) work too, and the title fallback | Retain; update the description |
| Anchor ID (`classes_anchor`) | | Block id | OK | Retain |
| Hide block (`classes_hideblock`) | | styles.css | OK | Retain |
| Padding (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | tokens | styles.css | OK | Retain |
| Margin (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | tokens | styles.css | OK | Retain |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Default | Inline chapter list | Horizontal scroll; the current link is centred | Retain |
| Sticky | Pinned below the header | JS pinning with a height placeholder (no layout shift) | Retain |

### E. Accessibility
| Requirement | Expected | Current | Correction | Status |
|---|---|---|---|---|
| Landmark | `nav` with a name | `aria-label` "On this page" (js:113); identical for several lists on a page | Optional label field | Pass (advisory) |
| Current item | `aria-current` | `location` (js:127) | None | Pass |
| Focus moves to the target | | `tabIndex = -1` + focus with `preventScroll` (js:152-153) | None | Pass |
| Focus visible | | css:53-58 | None | Pass |
| Reduced motion | | `scrollBehavior()`; css:70 | None | Pass |
| Editor placeholder | | `buildEditorItems` for incomplete items | None | Pass |

### F. Data layer
Link clicks become central `cmp:click` events (`interaction: link`, the `#` URL). No custom pushes. OK.

### G. Personalization
Not personalizable.

### H. Decision
**Retain.** Deprecate the `anchors` multifield. The window listeners and observers are never released on editor re-render (js:84-91, 189-208; minor, part of D-C-19).

---

## Block: Fragment (`fragment`, class `fragment`)

### A. Overview
- Purpose: includes another page's content (Block Collection).
- Files: `_fragment.json`, `fragment.js` (`loadFragment` is also used by the Tabs block and the Modal), `fragment.css` (empty).
- Usage: 1 instance on 1 page.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Reference (`reference`) | aem-content | First `a[href]`, else text (fragment.js:49-51); the path must start with `/` (js:23) | The label "Reference" is technical. An empty reference shows nothing and gives no editor hint (D-C-21). No recursion guard (D-C-17) | Rename the label to "Fragment page"; Correct |
| Anchor ID (`classes_anchor`) | | Block id | OK | Retain |
| Hide block (`classes_hideblock`) | | styles.css | OK | Retain |
| Padding (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | tokens | styles.css | OK | Retain |
| Margin (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | tokens | styles.css | OK | Retain |

### D. Variations
None.

### E. Accessibility
It inherits the fragment's semantics. Ids in the fragment are de-duplicated only against the page at decoration time; the fragment is decorated detached (js:28-41), so the same fragment included twice can produce duplicate anchor ids (suspected, minor).

### F. Data layer
The fragment's blocks are tracked with `parentId` = the fragment. OK.

### G. Personalization
**Experience container** (the reference is the natural swap point). No runtime.

### H. Decision
**Retain** (D-C-17, D-C-21).

---

## Block: Modal (`modal`, class `modal`)

### A. Overview
- Purpose: a button that opens a fragment page in a native `<dialog>`. Links to `/modals/` are opened automatically (S:501-511).
- Files: `_modal.json`, `modal.js`, `modal.css`.
- Usage: 3 instances on 3 pages.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Modal Content (`link`) | aem-content | The `a[href]` → `openModal(href)` (js:147-160) | No editor hint when empty (js:148; D-C-21) | Retain |
| Button Text (`linkText`) | text | Collapsed into the link text (`<x>Text` rule) → button text (js:151-155) | The static hint says "not read"; that is wrong, it is delivered as the link text. There is no button style option (always primary) | Retain |
| Anchor ID (`classes_anchor`) | | Block id | OK | Retain |
| Hide block (`classes_hideblock`) | | styles.css | OK | Retain |
| Padding (`classes_paddingleft`, `classes_paddingright`, `classes_paddingtop`, `classes_paddingbottom`) | tokens | styles.css | OK | Retain |
| Margin (`classes_marginleft`, `classes_marginright`, `classes_margintop`, `classes_marginbottom`) | tokens | styles.css | OK | Retain |

### D. Variations
The modal-block, long content, form and auto-linked pages all open (Playwright on modal-block).

### E. Accessibility
| Requirement | Expected | Current | Correction | Status |
|---|---|---|---|---|
| Modal semantics | `aria-modal` / native dialog | `showModal()`; `:modal` true (verified) | None | Pass |
| Name | `aria-labelledby` the heading | `modal-title-1` (verified), else "Dialog" | None | Pass |
| Focus on open | Inside the dialog | Close button focused (verified) | None | Pass |
| Focus trap | Outside is inert | Native top layer | None | Pass |
| Escape | Closes | Verified | None | Pass |
| Focus return | To the opener | Verified in Chromium. Relies on `document.activeElement` after an async fetch (js:119), so in Safari (buttons aren't focused on click) it would return to `body` (suspected; D-C-11) | Pass the opener | Partial |
| Opener semantics | `aria-haspopup=dialog` | js:157 | None | Pass |
| Double activation | One dialog | **2 dialogs** after a double click (verified; D-C-9) | Guard | Fail (minor) |

### F. Data layer
Verified events: `cmp:click component.anchor-modal-awards` (opener), then `cmp:show component.modal-2` / `cmp:hide component.modal-2`. The dialog's id is a transient `modal-N` taken from the same counter as the authored Modal blocks. It is unrelated to the opener and changes on every opening (D-C-10).

### G. Personalization
Entire block (the fragment). No runtime.

### H. Decision
**Modify** (D-C-9, D-C-10, D-C-11).

---

## Block: Section (`section`, models/_section.json; `decorateSectionsWithOptions` S:255-288)

### A. Overview
- Purpose: the plain section.
- Section fields arrive as `data-*` attributes; `style` arrives as classes.
- `SECTION_OPTIONS` (S:32-34) are read before `decorateSections`.
- Usage: 1191 instances on 307 pages.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Section Name (`name`) | text | Not read by code; the label in the UE Content Tree | OK (the static hint "read" is a false positive) | Retain |
| Style (`style`) | multiselect: Highlight | Classes S:262; styles.css:993-998 | styles.css also implements `light` (same as highlight), `dark` and `brand` (styles.css:993-1011), and Separator `theme-auto` relies on `.section.dark` / `.section.brand`. **These are implemented but not authorable** | Decide: add Dark and Brand options, or remove the dead CSS. Remove `light` (duplicate) |
| Width Type (`sectionWidth`) | full-width (default) / fixed-width | S:265-267; styles.css:972-985, 1031 | OK (fixed-width used 261, full-width 138) | Retain |
| Rounded edge (`roundedEdge`) | boolean | `rounded` S:268-270; css:1056 | Visible only with a background or Highlight; not documented | Retain; add a description |
| Background Image (`backgroundImage`) | reference | S:274-282 | OK | Retain |
| Image alt text (`backgroundImageAlt`) | text | S:113-114 | OK | Retain |
| Anchor name (`anchorName`) | text | `toClassName` → section id unless the id is taken (S:272-273) | **Inconsistent with the block Anchor ID:** no `anchor-` prefix, no validation, and a duplicate is **silently dropped** (no `-2` like `availableId`). The block library itself mixes the two (`anchorName="anchor-tabs-overview"`) | Correct (D-C-14); keep both mechanisms, but document "sections: Anchor name; blocks: Anchor ID" |

The section has no Additional tab. Hide and spacing for sections are not offered. That is consistent: sections are not blocks.

### H. Decision
**Modify** (D-C-14; resolve the dark / brand / light options).

---

## Orphan / implicit filters
| Filter | Components | Referenced by | Finding | Decision |
|---|---|---|---|---|
| `video` | `[]` | Nothing (the Video definition has no `filter`) | Empty and unreferenced (blocks/video/_video.json:975-980) | **Remove** the `filters` array from `_video.json`; run `npm run build:json`. No content impact |
| `columns` | `column` | Implicit for the core Columns resource type | False positive in the inventory | Retain |
| `column` | text, image, button, title | Implicit (core Columns cells) | False positive in the inventory | Retain |
| `main` | section, gen-carousel, tabs, columns-container | Page root | OK | Retain |

---

## Redundant block assessment
| Existing blocks | Overlap | Unique capabilities | Existing usage | Decision | Target | Migration |
|---|---|---|---|---|---|---|
| Tabs Container (section) vs Tabs block | Same JS (tabs.js), markup, styles, keyboard and data layer | Container: in-place editing of the tab content (tab, columns, title, text, image, button-block). Block: any content via fragment pages; usable inside a Columns Container | Container 17 / 4 pages; block 7 / 3 pages | **Retain both short term; Merge long term into the Tabs Container** | Tabs Container, with `fragment` (and blocks such as accordion, cards, list, teaser, already decorated by `wrapSectionContent`) added to the `tabs` filter | Each Tabs block item becomes a Tab marker + a Fragment block with the same reference (mechanical, lossless); then Deprecate (keep the `readItem` code path for existing content). Meanwhile rename the titles "Tabs (in place)" / "Tabs (fragments)" |
| Columns (core) vs Columns Container | Both lay out content in columns | Columns: core WYSIWYG cells; image-first order on mobile; **the only columns allowed inside a Tabs Container**. Container: blocks in columns, per-row, gap, alignment, breakpoint, background | Columns 37 nodes (block library only); Container 22 / 3 pages | **Retain both** | n/a | None; document when to use each. Fix the CSS collision D-C-1 |
| Gen Carousel vs Cards / List horizontal scroll | Horizontal movement | Carousel: one full-width Hero / Teaser slide at a time, autoplay with pause, dots. Cards / List: several cards per view, per-breakpoint grid or scroll, data-driven | Carousel 5 / 5 pages | **Retain** | Rename the title to "Carousel" | None |
| Accordion | No other disclosure block in the group (Tabs is a different pattern) | Native details | 5 / 3 pages | **Retain** | n/a | None |

---

## Defects

**D-C-1 (major, verified): the Columns Container CSS breaks every section that contains a core Columns block.**
- Where: `blocks/columns-container/columns-container.css:6-14, 16-28, 71-87`.
- Cause: the rules are scoped to `.columns-container`. `aem.js decorateBlock` adds `{block}-container`, here `columns-container`, to the *section* of every core Columns block. This is the AGENTS.md "avoid -container" collision.
- Evidence: Playwright on `columns/columns-variations` with the Columns Container CSS loaded (it loads on any page that has a Columns Container). The sections went from `display:block` to `display:grid; grid-template-columns: 704px 704px`: the default content sits in the left half, the Columns block in the right half. The Tabs Container section on `tabs/tab-deep-link` also has the class (`tabs-section … columns-container`).
- Fix (CSS only, compatible): prefix every selector with `.block`, e.g. `.block.columns-container { … }`, `.block.columns-container.columns-container-2 { … }`, `.block.columns-container > .columns-container-column`, `html.adobe-ue-edit .block.columns-container …`. The synthetic block gets `.block` from `decorateBlock` in `wrapSectionContent`; sections never do.

**D-C-2 (major, verified by code): the Tabs Container and Gen Carousel ignore their Additional tab.**
- Where: S:149-159 and S:167-181.
- Affected fields (13 each): Anchor ID, Hide block, Animation Type / Speed / Trigger, Padding ×4, Margin ×4. The section's `classes_*` data attributes and `SECTION_BLOCK_OPTIONS` classes are copied to the synthetic block only in `buildColumnsSections` (S:210-217). `applyBlockOptions`, styles.css (1134+, 1145+) and `prepareMotion` (motion-decorator.js:300) only act on `.block`. The Gen Carousel therefore cannot be anchored at all.
- Fix: extract `applySectionBlockOptions(section, block)` from S:212-217 and call it in all three builders before `wrapSectionContent`:
  ```js
  function applySectionBlockOptions(section, block) {
    Object.entries(section.dataset).filter(([key]) => key.startsWith('classes'))
      .flatMap(([, v]) => v.split(/[\s,]+/)).map(toClassName).filter(Boolean)
      .forEach((name) => block.classList.add(name));
    [...section.classList].filter((name) => SECTION_BLOCK_OPTIONS.test(name))
      .forEach((name) => block.classList.add(name));
  }
  ```
- Also: either remove `classes_anchor` from the `tabs` model (it duplicates "ID") or keep both, and either remove the animation fields from both models (no `CONTENT_TARGETS` entry) or accept a whole-block animation.
- Compatibility: no instance sets a non-default value (inventory), so nothing changes visually.

**D-C-3 (major, verified with Playwright): duplicate tab panel ids, wrong `aria-controls`, broken deep links.**
- Where: T:184-193.
- Cause: `availableId()` runs while the earlier panels (and their moved content) are detached, so it can't see them.
- Evidence: with two tabs given the same ID, the panels were `['consulting','consulting','cybersecurity']`, and the second tab's `aria-controls` resolves to the first panel. With an `h3#cloud` in tab 1's content, panel `cloud` was duplicated and `#cloud` opened tab 1 (`panelOfHash` T:38-42 finds the heading). AEM-delivered headings with auto ids make the heading case realistic (suspected for AEM delivery).
- Fix:
  1. Assign the ids before moving any content: `const used = new Set(); const idFor = (want) => { let id = availableId(want); for (let n = 2; used.has(id); n += 1) id = availableId(`${want}-${n}`); used.add(id); return id; };`, computed in a first pass over `groups`. Make the button id `availableId(`${panel.id}-tab`)`.
  2. Keep the authored id in `panel.dataset.tabId = id`, and in `panelOfHash` look up `.tabs .tabs-panel[data-tab-id="${id}"]` first, then fall back to the element id.
- Compatibility: unique authored ids are unchanged.

**D-C-4 (minor, verified with Playwright): duplicate id when a Column Break has an Anchor ID.**
- Where: `blocks/columns-container/columns-container.js:44-45`.
- Evidence: `applyBlockOptions` already gave the hidden marker block the id, so `[id=anchor-col-test]` matched 2 elements (the column and the `column-break` block).
- Fix: in `createColumn`, `if (anchor) { if (marker.id === anchor) marker.removeAttribute('id'); column.id = availableId(anchor, column); }`.

**D-C-5 (minor, verified with Playwright): the Gen Carousel pushes spurious `cmp:show` events and toggles `inert` on intermediate slides during a smooth scroll.**
- Where: GC:105-109, 188-193.
- Evidence: a dot click from 1 to 6 pushed 6 events (6, 2, 3, 4, 5, 6); the wrap from 6 to 1 pushed 6 events.
- Fix: `let target = null;` In `goTo`, set `target = i`. In the observer: `const i = slides.indexOf(entry.target); if (target !== null && i !== target) return; target = null; setCurrent(i);`. Add `track.addEventListener('scrollend', () => { target = null; })` (with a timeout fallback).

**D-C-6 (minor, verified by code): duplicate or overlapping anchor fields in the containers.**
- Tabs Container: "ID" (`anchorName`, works) plus "Anchor ID" (`classes_anchor`, ignored).
- Tabs block: "ID" (`tabsId`, the panel id prefix) plus "Anchor ID" (the block id).
- Columns Container: "Anchor name" (section id) plus "Anchor ID" (block id).
- Fix: Tabs Container: remove `classes_anchor` from the model, or apply it via D-C-2. Tabs block: relabel `tabsId` "Tab ID prefix" and say in its description that it is not an anchor. Columns Container: say in the description that Anchor name is the one Anchor List links use.

**D-C-7 (minor, verified by code): the Additional tab of the Tab marker has no visible effect.**
- Where: `blocks/tab/_tab.json` Additional tab; tabs.css:136-142.
- Anchor ID puts an id on a `display:none` element; Hide block does not hide the tab; padding and margin style a hidden element.
- Fix: remove `classes_anchor` and `classes_padding*` / `classes_margin*` from the `tab` model. Implement Hide block in `groupContainerTabs` (T:74-82): when `tab.classList.contains('hideblock') && !isEditing()`, drop that group (its wrapper and content).
- Compatibility: none of these fields has a stored value.

**D-C-8 (minor, verified by code): two Tabs blocks with the same Tabs ID share `shownTabs` state.**
- Where: T:159-162, 216-217, 259-263.
- Effect: the second block opens the first block's tab index, and that state takes precedence over its own Active tab and deep link.
- Fix: use `shownTabs` only when an editor resource exists (`key = container ? section?.dataset.aueResource : block.dataset.aueResource`; skip get / set when it is undefined), and track a local `currentIndex` for the `changed` check.

**D-C-9 (minor, verified with Playwright): a double click on a Modal opener opens 2 dialogs.**
- Where: `blocks/modal/modal.js:160`; also S:501-511.
- Fix: in `openModal`, keep `const opening = new Set()`. `if (opening.has(path)) return; opening.add(path); try { … } finally { opening.delete(path); }`.

**D-C-10 (minor, verified with Playwright): the Modal dialog's data-layer id is transient and unrelated to the opener.**
- Where: `modal.js:88-91, 122`; data-layer-decorator.js:39-46.
- Evidence: `cmp:show component.modal-2`, while the opener is `anchor-modal-awards`. The number comes from the counter shared with the authored Modal blocks and changes on every opening.
- Fix: `createModal(contentNodes, { id } = {})` sets `block.dataset.cmpId = id || `modal-${toClassName(path)}``. The Modal block passes `${componentIdOf(block)}-dialog`; `openModal(url, options)` forwards it.

**D-C-11 (minor, suspected: not tested in Safari): Modal focus return depends on `document.activeElement` after an async fetch.**
- Where: `modal.js:119`.
- Safari doesn't focus a button on click, so focus would return to `body`.
- Fix: `openModal(url, { opener })`. The block passes its button; `autolinkModals` passes `origin`. Use `opener ?? document.activeElement`.

**D-C-12 (minor, verified with Playwright): hidden marker blocks are registered as data-layer components.**
- Where: `tab.js:38-46`, `column-break.js:30-39`; data-layer-decorator.js:72-86.
- Evidence: `tab-1` … `tab-36` on `tabs/tabs-section`; Column Break markers the same way (code).
- Fix: `block.dataset.analytics = 'off'` in both decorate functions (`trackBlocks` skips `closest('[data-analytics]')`; the markers contain no interactive content).

**D-C-13 (minor, verified): `cmp:show` paths of tabs and slides point to unregistered components.**
- Where: T:223 (`component.{panel.id}`), GC:92 (`component.gen-carousel-N-slide-M`).
- Fix: register them as child components when decorating: `pushComponents({ [id]: { '@type': 'tcs-corp/components/tabs/item' (or …/gen-carousel/slide), parentId: componentIdOf(block), 'dc:title': title } })`, and set `data-cmp-id` on the panels. No new events.

**D-C-14 (minor, verified by code): the section Anchor name is unvalidated and silently dropped when its id is taken.**
- Where: S:272-273; `models/_section.json`, `_tabs.json`, `_columns-container.json` (`anchorName`).
- Fix: `section.id = availableId(anchor, section)` (import from `utils/ids.js`). Add `"validation": { "regExp": "^#?[a-z0-9][a-z0-9-]*$", "customErrorMsg": "Lower-case letters, digits and hyphens." }` to the three `anchorName` fields. Existing values stay valid: `toClassName` already normalizes them.

**D-C-15 (minor, verified by code): Hide block on a Columns Container leaves its section band visible.**
- Where: styles.css:1134-1135.
- Effect: with Highlight or a background image, the empty coloured section and its padding remain.
- Fix: add `html:not(.adobe-ue-edit) main .section:has(> div > .block.columns-container.hideblock) { display: none; }`, and the same for the Tabs Container and Gen Carousel once D-C-2 is in.

**D-C-16 (minor, verified): every Gen Carousel is named "Carousel".**
- Where: GC:43.
- Effect: several carousels on a page are identical region landmarks.
- Fix: add a `carouselAriaLabel` text field to the model (as on Tabs). In S:154-156, `if (section.dataset.carouselarialabel?.trim()) carousel.setAttribute('aria-label', …)`. GC:43 already keeps an existing `aria-label`.

**D-C-17 (minor, verified by code; not run): no recursion guard in `loadFragment`.**
- Where: `blocks/fragment/fragment.js:22-46`.
- Effect: a fragment (or a Tab or Modal fragment) that references itself or the current page loops forever.
- Fix: module-level `const loading = new Set();`. `if (loading.has(path) || path === window.location.pathname) return null; loading.add(path); try { … } finally { loading.delete(path); }`.

**D-C-18 (minor, verified): empty, unreferenced `video` filter.**
- Where: `blocks/video/_video.json:975-980`.
- Fix: delete the `filters` array; run `npm run build:json`.

**D-C-19 (minor, verified by code): listeners and observers are never released when Universal Editor re-renders the block.**
- Gen Carousel: the `visibilitychange` listener on `document` (GC:212), the IntersectionObserver (GC:188) and `watchVisibility` (GC:195) are never released.
- Anchor List: window `scroll` / `resize` / `hashchange` / `scrollend` / `load` listeners and the observers (anchor-list.js:84-91, 189-208).
- Effect: each editor re-render leaks them (the published page is unaffected).
- Fix: an `AbortController` per decoration (`{ signal }` on the listeners), plus a `MutationObserver` or `isConnected` check that aborts and disconnects once the block is removed.

**D-C-20 (minor, verified by code): an Accordion item with an empty summary has no accessible name and no editor placeholder.**
- Where: `accordion.js:12-25`.
- Fix: in editing, use `buildEditorItems` / `editorItemHint` (decorators/editor-item-decorator.js) for rows with an empty summary. On the page, skip rows whose summary and body are both empty.

**D-C-21 (minor, verified by code): Fragment and Modal show nothing in the editor without a reference.**
- Where: `fragment.js:48-51`, `modal.js:147-148`.
- Fix: when `isEditing()` and there is no path / link, append a hint `<p>` from placeholders (`fragmentEmpty`, `modalEmpty`), as Tabs does.

**D-C-22 (suspected, needs an AEM check): `classes_*` on the core Columns resource type.**
- It is not verified that `core/franklin/components/columns/v1/columns` delivers `classes_*` as block classes. The local renderer and the package assume it does.
- Action: check one Columns block with Anchor ID on aem.page. If the classes are not delivered, remove the Additional tab from `_columns.json`.

**D-C-23 (minor, verified by code): `columns.js` throws on a block without rows.**
- Where: `columns.js:2`.
- Fix: `const cols = [...(block.firstElementChild?.children || [])]; if (!cols.length) return;`.

Not defects (checked): the Accordion data layer works (click → `cmp:show component.anchor-accordion-overview`; the empty result for Enter + Space pressed back to back was a test artefact, the toggle events coalesce). Tabs keyboard, roving tabindex and ARIA pass. Modal focus, Escape and `:modal` pass. Carousel reduced motion and pause pass.
