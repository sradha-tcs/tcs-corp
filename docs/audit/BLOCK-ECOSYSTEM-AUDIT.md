# TCS Corporate Website: block ecosystem audit

| | |
|---|---|
| Date | 19 October 2026 |
| Scope | Every block, item, section container and default component of the AEM Edge Delivery Services / XWalk project (63 components before, 62 after; 959 dialog fields before, 925 after), the block library (177 pages) and the 11 curated design pages |
| Method | Generated inventories of definitions, models, filters, fields, options and usage; code review of every block (four reviews, file:line evidence); a browser run of every library and curated page at 5 widths (940 loads before, 940 after: console errors, block status, overflow, duplicate ids, broken images, axe, data layer, click events); a comparison of the published site (aem.page, real AEM delivery) with the local preview |
| Result | 107 defects (23 major, 81 minor, 1 suspected, 1 critical, 1 n/a): 88 corrected, 15 deferred, 1 blocked, 1 not reproduced, 1 content action, 1 not a defect |

## 1. Summary

The most serious findings came from comparing what AEM really delivers (the published preview) with what the code and the local preview assumed:

- **Forms were empty on the published site** (D-D-1, critical): AEM writes an item's node name and its classes in the item's first cell ("email, field-text") and an empty row for each dialog tab; the form code expected a type cell and the title in the first row. Every one of the 14 library forms rendered without fields. Corrected; verified with the live markup.
- **Tables, accordions and videos** differed on the live site too: an empty header row and an empty, unnamed accordion item (the tab rows, L-1, L-3), and no video poster: a grouped field (placeholder_image) isn't delivered in key-value blocks (L-2). Corrected.
- **Dialog options AEM never delivers**: the built-in Button's View, Icon, Alignment and Tertiary (fixed before the audit with the Button block, PR #117; the Button model is now split, D-D-27), the built-in Columns component's whole Additional tab (D-C-22, verified live), the Teaser's personalization marker (no runtime, D-B-3). Removed from the dialogs; the library content is migrated.
- **Colour contrast**: two tokens failed WCAG 1.4.3 on almost every page (secondary text #999 2.84:1, brand text #4673db 4.43:1), 3737 axe nodes. Changed to palette colours that pass (5.4:1 and 6.9:1); this needs design sign-off.
- **A regression of the previous change**: the Columns Container CSS also matched the sections AEM marks "columns-container" (every section with a Columns block), turning them into two-column grids (D-C-1). Corrected.
- **Privacy**: the Canvas search pushed the raw query (including e-mail addresses or phone numbers) to the data layer (D-D-18). Redacted (utils/privacy.js, unit tested).
- **Local preview fidelity**: the renderer used for the library preview didn't reproduce four AEM delivery rules, which hid these defects (L-4). It now does, so the local preview matches the live site.

Analytics (Adobe Tags / Web SDK / CJA), consent and personalization (Target) are not implemented in the project: those validations are **blocked** and recorded with the access needed (section 9). Nothing is reported as passed that was not executed.

## 2. Runtime validation: before and after

| Check (188 pages × 5 widths: 1440, 1024, 768, 600, 390 px) | Before | After |
|---|---|---|
| Page loads | 940 | 940 |
| Fatal load errors | 0 | 0 |
| Loads with console errors | 138 | 0 |
| Loads with failed requests (4xx / 5xx) | 138 | 0 |
| Loads with a block not loaded | 0 | 0 |
| Loads with horizontal page overflow | 0 | 0 |
| Loads with duplicate element ids | 0 | 0 |
| Loads with broken images | 0 | 0 |
| axe violation nodes (WCAG 2.0 / 2.1 / 2.2 A and AA, at 1440 and 390 px) | 3745 | 0 |
| Pages with duplicate data-layer component ids | 0 | 0 |
| Click events (1440 px, up to 8 links per page) | 758 of 758 test clicks pushed exactly one cmp:click | 758 of 758 test clicks pushed exactly one cmp:click |

axe before: color-contrast (serious): 3737; scrollable-region-focusable (serious): 8. After: none.

The 138 loads with failed requests before were a test artefact (L-6: axe fetches style sheets and resolves their @import against the page URL); the harness now records requests before axe runs. Per block: [data/runtime-before-after.csv](data/runtime-before-after.csv).

**Published site vs local preview** (before the fixes, 188 pages at 1440 px, block by block): 62 pages differed. The differences that were defects are L-1 to L-3 and D-D-1; the others were content (pages not yet published, folder pages listing different children, the query index) or rendering-neutral (text of hidden tab panels).

## 3. Inventories (deliverables 1-5)

- [data/block-inventory.csv](data/block-inventory.csv): every component: display name, kind, block class, implementation, model, filter, delivery (key-value or rows), parents and children, field counts before / after, usage, status.
- [data/dialog-fields.csv](data/dialog-fields.csv): every dialog field (965): label, property, type, default, allowed values, required, conditional, functional mapping, uses, final action (873 retain, 40 remove, 46 correct, 6 add).
- [BLOCK-SECTIONS.md](BLOCK-SECTIONS.md): one section per component in the format of the brief (overview, problems, dialog, variations, accessibility, data layer, personalization, decision, implementation, tests, evidence).
- [blocks/](blocks/): the four code reviews (every field checked against the code, with file:line).

Container and item relationships (filters): Accordion > accordion-item; Anchor List > anchor-list-item; Cards > card; Columns Container > column-break, text, image, button-block, title, hero, teaser, quote, testimonial, anchor-list, accordion, tabs-block, table, table-list, list, separator, embed, video, modal, form-variations, filter-list, conversation-canvas, cards, columns, fragment; Conversation Canvas > conversation-canvas-button; Filter List > filter-list-tag, filter-list-category, filter-list-page; Footer > footer-link; Form Variations > field-text, field-select, field-textarea, field-checkbox, contact-card, field-submit; Gen Carousel > hero, teaser; Hero > hero-cta; List > list-item; Page Header > page-header-cta; Table List > table-list-card; Table > table-row; Tabs Container > tab, columns, title, text, image, button-block; Tabs > tabs-item; Teaser > teaser-link, teaser-stat; Testimonial > testimonial-stat. Implicit filters of core components (Columns > column, Table rows) are valid; the empty `video` filter was removed.

## 4. Duplicate options and redundant blocks (deliverables 8-10, 32)

| Block | Field | Duplicate | Canonical | Legacy values | Action |
|---|---|---|---|---|---|
| Hero | Motion Type | Fade in / Slide up / Zoom = Animation Type Fade in / Fade up, Background Scale reveal | Additional tab animations | mapped in code (utils/motion.js addLegacyMotion), Slow speed | field removed, library migrated |
| Table List | Motion Type | = Animation Type on the items | Animation Type (items staggered, motion-decorator CONTENT_TARGETS) | mapped in code | field removed, library migrated |
| List, Cards | Component ID | = Anchor ID | Anchor ID | still read | field removed (0 uses) |
| List, Cards | Reduced motion support | contradicts the accessibility rule | always honoured | ignored | field removed (0 uses) |
| Separator | Width "Auto" | = 100% | the widths | still read | option removed |
| Separator | Variant "Custom" | = Default | Default | still read | option removed |
| Quote, Testimonial | Style | one option, no effect | none | none | field removed |
| Page Header CTA | Text link ('') | = unset | tertiary | '' still a text link | value made explicit |
| Hero CTA | Arrow Right default | runtime Auto | Auto ('') | unchanged | default corrected |
| Tab | Anchor ID, spacing | style a hidden marker | none | none | fields removed (0 uses) |
| Button (basic) | View, Icon, Alignment, Tertiary | not delivered | Button block | library buttons migrated | button-basic model |
| Canvas Button | Type (linkType), Alignment | not deliverable / not applied | buttonVariant | library migrated | own model |

Redundant-block assessments (each review): Cards vs List vs Table List: retain (shared card-list code; List lists pages, Cards holds authored cards, Table List is rows); Hero vs Teaser vs Page Header: retain; Quote vs Testimonial: retain (separate Figma components); Tabs Container vs Tabs block: retain both (the block shows fragments); Columns vs Columns Container: retain (Columns is the only columns inside a Tabs Container cell); Gen Carousel: retain; Embed vs Video: retain; Table vs Table List: not redundant; TCS Header vs header: not redundant; Button (basic) vs Button block: Button block for new content, basic kept for content authored before; Interactive Dashboard: deprecated (not offered, renders nothing); Table List Header: removed (orphan).

## 5. Accessibility (deliverables 13-16)

Automated: axe on every page at 1440 and 390 px (section 2). Code review per block: semantics, headings, keyboard (Tab, Shift+Tab, Enter, Space, Escape, arrows, Home / End), focus, names, alt, reduced motion, pause controls, live regions, duplicate ids (each review, section E). Corrected: D-A-2, D-A-4, D-A-25, D-B-1, D-B-4, D-B-6, D-B-12, D-B-16, D-C-3, D-C-11, D-C-16, D-C-20, D-D-6, D-D-7, D-D-12, D-D-20, D-D-23, D-D-24, D-D-25, D-D-26, D-D-28, L-1, L-3. Screen-reader testing with assistive technology was not executed (blocked: no screen reader in the environment); the semantic review substitutes for it and is labelled as such.

## 6. Data layer (deliverables 17, 18)

Contract (decorators/data-layer-decorator.js, utils/analytics.js; Adobe Client Data Layer, Core Components schema): page entry once; one component entry per block (`@type` tcs-corp/components/{block}, parentId, dc:title), ids from the block id (Anchor ID) else {block}-{n}; events cmp:click (interaction, dc:title, xdm:linkURL, xdm:linkType other / exit / download, value, position, breakpoint), cmp:show / cmp:hide (accordion, dialogs, tabs, slides), cmp:media, cmp:submit (form id and field names, never values), cmp:search (redacted term), cmp:change. Validated: 758 of 758 test clicks pushed exactly one cmp:click; no duplicate component ids on any page; hidden markers (Tab, Column Break) no longer registered (D-C-12); card positions and the feature card (D-A-5, D-A-24); drags (D-A-21); invalid form submits (D-D-4); search (D-D-18). Proposed, not implemented: an approved measurement plan (section 9).

## 7. Consent, privacy and data minimisation (deliverables 22, 23)

No consent manager is loaded and no Analytics or Target library consumes the data layer, so nothing is sent to a third party; the data layer itself is filled without a consent check (it stays in the page). Data minimisation applied: search terms redacted (e-mail addresses, phone numbers) and cut at 100 characters; forms push field names only; no storage is written by the data layer code. Privacy-enhanced embeds (youtube-nocookie, Vimeo dnt, D-D-10). Consent categories were not invented: the consent model is a blocked dependency.

| Capability | Consent category | Before consent | After consent | Denied | Status |
|---|---|---|---|---|---|
| Data layer (in page) | to be defined | filled | filled | filled (no transfer) | Blocked (no consent model) |
| Analytics / CJA | to be defined | none loaded | none loaded | none | Blocked |
| Personalization (Target) | to be defined | none | none | default content | Blocked |
| YouTube / Vimeo embeds | to be defined | placeholder until click (when authored) | privacy-enhanced player | placeholder | Partially validated |

## 8. Personalization (deliverables 24-29)

No personalization runtime exists (no Target, Web SDK, audience source or edge personalization). Every block is classified **Not personalizable**; every block renders its default content, which is cached by Edge Delivery. The only personalization option (Teaser "Personalization", a class and data attribute nothing read) was removed (D-B-3). Personalized rendering, fallback, flicker, cache-key and analytics tests are blocked until an approved personalization design exists.

## 9. Blocked dependencies and what is needed

| Dependency | Blocks | Needed to complete |
|---|---|---|
| Adobe Tags / Web SDK and the approved measurement plan | Analytics and CJA event validation, duplicate-event checks in the debugger | the Tags property / datastream and the measurement plan |
| Consent model | consent dependency tests | the approved consent categories and CMP |
| Adobe Target / audiences | all personalization tests | activities, audiences, the personalization design |
| AEM author access | Universal Editor dialog tests on real dialogs, D-A-26 (date storage), D-D-2 (item name), legacy multifield usage in production | an author session or a content export |
| Figma pixel comparison of every variation | Figma compliance matrix | the curated pages were compared in earlier work (handover Part 7); per-variation comparison needs the Figma file per component |
| Screen reader | screen-reader test runs | NVDA / VoiceOver testing on the published pages |
| Publish environment | published (aem.live) validation | publishing the reconstructed library after the package is installed |

## 10. Defect and resolution register (deliverable 31)

| Id | Severity | Component | Defect | Status | Resolution |
| --- | --- | --- | --- | --- | --- |
| D-A-1 | major | List, Cards | Header CTA style (Primary, Secondary) ignored, always tertiary | Corrected | card-list-decorator reads the collapsed bold / italic type |
| D-A-2 | major | List, Cards | No visible focus ring on Panel, Report, Statistic cards (clipped) | Corrected | ring drawn inside the card edge |
| D-A-3 | major | List, Cards | Card colour on Image cards: no effect, near-white CTA on white, collapsed card | Corrected | Card colour applies to panel / report / statistic cards only |
| D-A-4 | major | List, Cards (scroller) | Previous / Next disabled while focused: focus falls to the page | Corrected | aria-disabled, focus kept |
| D-A-5 | minor | Data layer | Card clicks without position | Corrected | position from the card item (data-cmp-position) |
| D-A-6 | major | Filter List | Page type / Content type options do not match the site | Corrected | options from models/_page.json and the content-type taxonomy |
| D-A-7 | minor | Filter List | Raw content-type slugs shown | Corrected | taxonomy labels (contentTypeLabel) |
| D-A-8 | minor | List, Cards | Scroll settings shown when no breakpoint scrolls | Corrected | conditions on the scroll fields |
| D-A-9 | minor | List, Cards | Edge bleed identical to none in full-width sections | Deferred | needs a design decision (bleed in full-width sections); documented |
| D-A-10 | minor | List, Cards | Touch swipe off and no controls: cards unreachable on touch | Deferred | touch swipe field not in the current models (0 uses); covered by keyboard and controls |
| D-A-11 | minor | List, Cards | Reduced-motion support could be switched off | Corrected | always honoured; field removed (0 uses) |
| D-A-12 | minor | List, Cards | Component ID overrides the Anchor ID | Corrected | field removed (0 uses); stored values still read |
| D-A-13 | minor | Table List | Motion Type duplicates Animation Type | Corrected | mapped to Animation Type on the items (staggered); field removed; library migrated |
| D-A-14 | minor | Table List | Items above the maximum vanish in Universal Editor | Deferred | editor-only; planned with the Table List refactoring |
| D-A-15 | minor | Table List | New items prefilled with sample content (TwinX), visible on the live page | Corrected | template and model defaults removed |
| D-A-16 | minor | Table List | Orphan Table List Header definition | Corrected | definition and model removed (0 uses; reader kept) |
| D-A-17 | minor | List, Filter List | Legacy composite multifields in the dialogs | Corrected | labelled as authored before items (removal needs a production content check) |
| D-A-18 | minor | Filter List | Technical option labels | Corrected | readable Featured rule labels; mapping fields kept (documented) |
| D-A-19 | minor | Cards | Descriptions refer to page metadata | Corrected | neutral wording |
| D-A-20 | minor | List, Cards | fetchpriority high on every eager card image | Corrected | first image only |
| D-A-21 | minor | Data layer | A mouse drag ending on a card pushes cmp:click | Corrected | the scroller marks drags; the click is not measured |
| D-A-22 | minor | List | Child depth default 2 (model) vs 1 (code) | Corrected | code default 2 |
| D-A-23 | minor | Cards | Card ids change when cards are reordered | Deferred | changing ids would break existing Analytics reports; needs the measurement owner |
| D-A-24 | minor | Data layer | Feature card untracked; positions disagree | Corrected | feature is position 1 with its own id |
| D-A-25 | minor | Filter List | Result count announced on page load | Corrected | live region set after the first count |
| D-A-26 | minor (suspected) | List, Cards | Card date may shift a day | Blocked | needs Universal Editor date storage check (author access) |
| D-A-27 | minor (suspected) | Data layer | Possible duplicate list ids from two counters | Not reproduced | no duplicate component ids in 940 page loads |
| D-A-28 | minor | Table List | Empty heading for an item without title | Corrected | no heading outside the editor |
| D-A-29 | minor (suspected) | Filter List | Ignores hide-in-nav and redirects, unlike List | Deferred | product decision |
| D-B-1 | major | Hero | Lottie pause / play button never rendered (WCAG 2.2.2) | Corrected | toggle appended after the content |
| D-B-2 | major | Teaser | Primary / Secondary CTA dropped when a Link item exists | Corrected | CTAs then Link items |
| D-B-3 | major | Teaser | Personalization option without runtime | Corrected | field and marker removed; library migrated |
| D-B-4 | major | Hero, Teaser, Page Header | Links opening a new tab not announced | Corrected | decorateButton newTabHint (placeholder opensInNewTab) |
| D-B-5 | minor | Testimonial | Quote hidden when the Show Description row is missing | Corrected | isOnByDefault |
| D-B-6 | minor | Quote | figcaption outside a figure | Corrected | figure.quote-card-text |
| D-B-7 | minor | Page Header | CTA style defaults disagree; Text link equals unset | Corrected | Text link stored as tertiary; Primary for new CTAs |
| D-B-8 | minor | Hero | CTA Arrow default Right vs Auto at runtime | Corrected | Auto option as default |
| D-B-9 | minor | Quote, Testimonial | Style select with one option, no effect | Corrected | field removed |
| D-B-10 | minor | Teaser | Image corners / ratio identical in Text split | Deferred | dialog conditions; low impact |
| D-B-11 | minor | Teaser | Mobile image position Top = Default | Deferred | dialog wording; low impact |
| D-B-12 | minor | Page Header | Featured image always decorative | Corrected | image-alt metadata |
| D-B-13 | minor | Hero | Motion Type duplicates the Additional tab animations | Corrected | mapped (Fade in, Fade up, Scale reveal, Slow); field removed; library migrated |
| D-B-14 | minor | Hero, Teaser, Page Header, Testimonial | Legacy composite multifields in dialogs | Corrected (Teaser), Deferred (others) | Teaser labelled; removal needs a production content check |
| D-B-15 | minor | Testimonial, Teaser | Background animation offered where it cannot animate | Deferred | dialog conditions; documented |
| D-B-16 | major | All blocks | Text colour tokens fail WCAG 1.4.3 (2.84:1, 4.43:1) | Corrected (design sign-off) | secondary text slate-700, brand text and fill brand-400 |
| D-B-17 | minor | Interactive Dashboard | Placeholder block offered to authors | Corrected | removed from the section and Columns Container filters |
| D-B-18 | minor | Testimonial | Wrong field descriptions | Corrected |  |
| D-B-19 | minor | Teaser | Dead teaser-links-* classes | Corrected |  |
| D-B-20 | minor (suspected) | Hero | Cell classification can misread unusual content | Deferred | not present in content |
| D-B-21 | minor (suspected) | Teaser | A Stat item with a link read as a Link item | Corrected | link required in the first cell |
| D-C-1 | major | Columns Container | Its CSS turned every section with a Columns block into a grid | Corrected | selectors scoped to .block.columns-container |
| D-C-2 | major | Tabs Container, Gen Carousel | Additional tab ignored | Corrected | applySectionBlockOptions for all container sections |
| D-C-3 | major | Tabs | Duplicate panel ids, wrong aria-controls, wrong deep links | Corrected | ids reserved first; data-tab-id for deep links |
| D-C-4 | minor | Columns Container | Duplicate id with a Column Break Anchor ID | Corrected |  |
| D-C-5 | minor | Gen Carousel | Spurious slide events and inert flicker on jumps | Corrected | only the target slide |
| D-C-6 | minor | Containers | Overlapping anchor fields | Deferred | both work now (D-C-2); wording only |
| D-C-7 | minor | Tab | Additional tab without effect | Corrected | Hide block hides the tab; anchor and spacing fields removed (0 uses) |
| D-C-8 | minor | Tabs | Two Tabs with the same ID share state | Corrected | state per editor resource only |
| D-C-9 | minor | Modal | Double click opens two dialogs | Corrected |  |
| D-C-10 | minor | Modal | Transient data-layer id | Corrected | stable id from the opener / path |
| D-C-11 | minor (suspected) | Modal | Focus return in Safari | Corrected | opener passed explicitly |
| D-C-12 | minor | Data layer | Hidden Tab / Column Break markers registered as components | Corrected | data-analytics off |
| D-C-13 | minor | Data layer | cmp:show of tabs points to unregistered components | Corrected (tabs) | panels carry data-cmp-id |
| D-C-14 | minor | Sections | Anchor name unvalidated, dropped when taken | Corrected | validation and de-duplication |
| D-C-15 | minor | Containers | Hidden container leaves its section band | Corrected |  |
| D-C-16 | minor | Gen Carousel | Every carousel named Carousel | Corrected | Accessible name field |
| D-C-17 | minor | Fragment | No recursion guard | Corrected |  |
| D-C-18 | minor | Video | Empty unreferenced filter | Corrected |  |
| D-C-19 | minor | Gen Carousel, Anchor List | Listeners leak on editor re-renders | Deferred | editor only; no published impact |
| D-C-20 | minor | Accordion | Item without summary has no name (and the tab row became one live) | Corrected | empty rows removed, editor placeholder |
| D-C-21 | minor | Fragment, Modal | Nothing shown in the editor without a reference | Corrected | editor hints |
| D-C-22 | suspected | Columns | classes_* on the built-in Columns component | Corrected (verified live: not delivered) | Additional tab removed from Columns |
| D-C-23 | minor | Columns | columns.js throws without rows | Corrected |  |
| D-D-1 | critical | Form Variations | Forms empty on the published site | Corrected (verified on live markup) | item cells read as AEM delivers them ("key, type") |
| D-D-2 | major | Form Variations items | Field key stored in the item node name | Deferred | renaming needs an AEM check of the delivered cells; the key is read from the node name |
| D-D-3 | major | Form Variations | Success announced although nothing is sent | Corrected | Submit action (POST) or integration; else "not connected" |
| D-D-4 | minor | Data layer | cmp:submit for invalid submissions | Corrected |  |
| D-D-5 | minor | Form Variations | Consent checkbox not mandatory by default | Corrected | new items |
| D-D-6 | minor | Form Variations | Conditional fields appear unannounced | Corrected |  |
| D-D-7 | minor | Form Variations | Counter read literally | Corrected |  |
| D-D-8 | minor | Embed | Generic Play button name | Corrected (Play) | named after the placeholder alt; iframe title unchanged |
| D-D-9 | minor (suspected) | Embed | Bare URL empties the block | Corrected |  |
| D-D-10 | minor | Embed | No privacy-enhanced players | Corrected | youtube-nocookie, Vimeo dnt |
| D-D-11 | minor | Video | Play in a Pop-up without condition | Corrected |  |
| D-D-12 | minor | Video | Click playback without poster or controls cannot start / pause | Corrected | controls kept |
| D-D-13 | minor (suspected) | Data layer | Programmatic play / pause measured as visitor actions | Deferred | needs the measurement plan |
| D-D-14 | minor | Table | Ragged rows after a Columns change | Corrected | rows padded |
| D-D-15 | minor | Separator | Width Auto = 100% | Corrected | option removed (values still read); library migrated |
| D-D-16 | minor | Separator | Variant Custom = Default | Corrected | option removed (values still read); library migrated |
| D-D-17 | minor | Separator | Duplicate controls | Deferred | removal changes stored content; documented mapping |
| D-D-18 | major | Data layer | Search pushes the raw query (personal data), empty searches, a duplicate click | Corrected | redacted term, no empty searches, one event |
| D-D-19 | major | Conversation Canvas | Search does nothing | Corrected | integration event, else the Search page, else a status |
| D-D-20 | major | Conversation Canvas | Dock panel unreachable with Tab | Corrected | DOM order with CSS order |
| D-D-21 | minor | Conversation Canvas | Style-dependent fields without conditions | Deferred | dialog only |
| D-D-22 | minor | Canvas Button | Alignment never applied, Tertiary not deliverable | Corrected | own model with buttonVariant; library migrated |
| D-D-23 | minor | Conversation Canvas | Empty Suggestions list | Corrected |  |
| D-D-24 | minor | Footer | New-tab links not announced | Corrected |  |
| D-D-25 | minor | TCS Header | No-image fallback dead; TATA logo link without name (live) | Corrected | placeholder names |
| D-D-26 | minor | Header | Page behind the full-screen menu reachable | Corrected | inert |
| D-D-27 | major | Button (basic) | Undeliverable View / Icon / Alignment / Tertiary | Corrected | button-basic model; library buttons migrated to Button blocks |
| D-D-28 | minor | Buttons | Redundant title on every standalone link | Corrected |  |
| L-1 | major | Table | Live tables have two empty rows (dialog tabs); the first is the header | Corrected | tab rows skipped |
| L-2 | major | Video | Poster image never delivered (grouped field in a key-value block) | Corrected | poster / posterAlt; library migrated |
| L-3 | major | Accordion | Every live accordion starts with an empty, unnamed item (dialog tab row) | Corrected | see D-C-20 |
| L-4 | major | Preview renderer | The local preview hid AEM delivery rules (tab rows, grouped fields, item first cell, template values) | Corrected | .home-work/render-lib.mjs mirrors AEM |
| L-5 | minor | Content (nav page) | TATA logo link authored as "www.tata.com" (relative, broken) | Content action | set https://www.tata.com in the nav page |
| L-6 | n/a | Test tooling | 404 of styles/card-list.css during axe runs | Not a defect | axe resolves @import against the page |

## 11. Migration and backward compatibility (deliverables 32-34)

Authored values keep working where a field stays (options removed, values still read). Where a field is removed or renamed, the code still reads values authored before when AEM still delivers them, and the content is migrated:

| Item | Existing usage | Reason | Replacement | Migration | Compatibility |
|---|---|---|---|---|---|
| Video placeholder_image / placeholder_imageAlt | 26 library videos | not delivered (grouped field in key-value block) | poster / posterAlt | library migrated; AEM content: copy the property | code reads both |
| Canvas Button linkType | 36 library items | not deliverable as tertiary; new model | buttonVariant | library migrated; AEM: copy linkType to buttonVariant | old items keep model "button" and render as before |
| Built-in Button View / Icon / Alignment / Tertiary | 12 library buttons | not delivered | Button block | library migrated; AEM: replace by a Button block | Primary / Secondary unchanged |
| Hero classes_motion, Table List motion | 5 + library | duplicate | Animation Type / Speed | library migrated; AEM: set the Additional tab | values still delivered are mapped in code |
| Teaser personalization | 1 | no runtime | none | removed | no visual change |
| Columns Additional tab | 1 | not delivered | none | removed | none (never worked) |
| Separator Auto / Custom | 2 | duplicates | widths / Default | library migrated | still read |
| Table List Item sample text | every new item | sample in template | none | authors delete it in existing items | none |

The library migration is code (.home-work/bl/bl-migrate.mjs) applied when the pages and the content package are built; the same mapping applies to authored AEM content.

## 12. Reconstructed Block Library and Curated Design pages (deliverables 37, 38)

Rebuilt from the corrected models with the migration: 177 library pages and the 11 curated design pages, 311 pages in the content package `tcs-corp-block-library-content-1.0.7.zip`, 0 model warnings (every example uses only current fields and options). The Button page shows the Button block's views, types, icons and alignments; the Columns Container pages have no Column widths.

## 13. Known limitations and recommendations (deliverables 42, 44)

- The colour token change (secondary text, brand text and brand fill) needs design sign-off; it is the smallest change that passes WCAG 1.4.3.
- Deferred minors (register): dialog conditions and wording (D-A-9, D-B-10, D-B-11, D-B-15, D-C-6, D-D-21), Separator duplicate controls (D-D-17), editor-only listener leaks (D-C-19), Table List editor items (D-A-14), stable card ids (D-A-23, needs the measurement owner), Filter List vs List index rules (D-A-29).
- Legacy composite multifields (Hero, Teaser, Page Header, Testimonial, List, Filter List) are labelled; remove them after confirming no production content uses them.
- Add an automated comparison of aem.page and the local preview to the release checklist: it found the critical defects of this audit.

## 14. Tools (re-runnable)

[tools/](tools/): inventory.mjs (inventory from the repository and content package), harness.mjs (all pages × widths, axe, data layer), compare.mjs (published vs local), register.mjs (the register above). Paths are those of the delivery workspace.
