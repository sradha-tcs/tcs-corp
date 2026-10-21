# Data Layer and Analytics

This file describes the analytics foundation that is implemented in the repository: the Adobe Client Data Layer (`window.adobeDataLayer`) that every page and block fills, the entries and events it holds, how blocks refine it, what is measured today, and what is not configured (Adobe Tags, the AEP Web SDK, Analytics, CJA). It summarizes the code and links to the detailed sources; the handover Part 11 (Analytics & Data Layer) holds the long-form reference with examples.

| Attribute | Value |
| --- | --- |
| Audience | Developers, analytics engineers, QA, AMS / operations, AI agents |
| Source of truth | [`decorators/data-layer-decorator.js`](../../../decorators/data-layer-decorator.js), [`utils/analytics.js`](../../../utils/analytics.js), [`utils/privacy.js`](../../../utils/privacy.js), [`scripts/scripts.js`](../../../scripts/scripts.js), [`decorators/README.md`](../../../decorators/README.md) (Data layer), [`AGENTS.md`](../../../AGENTS.md) (Data layer), handover Part 11 — Analytics & Data Layer ([`TCS-CORP-HANDOVER.md`](../TCS-CORP-HANDOVER.md)) |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current (data layer); Requires validation (Adobe Tags, Web SDK, Analytics, CJA, consent: blocked, measurement plan) |

## Status at a glance

| Capability | Status | Where |
| --- | --- | --- |
| Data layer array `window.adobeDataLayer` (created on the first push, `window.adobeDataLayer \|\| []`) | Active | `utils/analytics.js` `pushToDataLayer` |
| Page entry (once per page) | Active | `trackPage` |
| Component entry per block (once per block) | Active | `trackBlocks` |
| Events `cmp:click`, `cmp:show`, `cmp:hide`, `cmp:media`, `cmp:search`, `cmp:submit`, `cmp:change` | Active | `trackInteractions` (document listeners) and Tabs, Gen Carousel, Modal |
| Richer state for List, Cards, Separator, Tabs panels | Active | `decorators/card-list-decorator.js` `trackCardList`, `blocks/separator/separator.js`, `blocks/tabs/tabs.js` |
| Search term redaction | Active (unit tested) | `utils/privacy.js` `redactSearchTerm`, `test/privacy/privacy.test.mjs` |
| Adobe Client Data Layer library (`getState()`, `addEventListener()`) | Not loaded: the array stays a plain JavaScript array | — |
| Adobe Tags (Data Collection), AEP Web SDK, Edge Network, datastreams, XDM schema | Blocked: measurement plan (not configured) | `scripts/delayed.js` holds only a comment |
| Adobe Analytics, Customer Journey Analytics | Blocked: measurement plan (not configured) | — |
| Consent management, visitor identity | Not implemented | — |
| Personalized impressions | None (no personalization runtime) | [Personalization](./personalization.md) |
| Real User Monitoring (RUM, including the 404 checkpoint) | Active (platform) | `scripts/aem.js` `sampleRUM`, `404.html` |

Nothing is sent to an analytics server by project code today: the data layer lives only in the visitor's browser until a tag manager processes it. RUM (`sampleRUM`, part of the Edge Delivery library) is the only measurement that leaves the page.

## Architecture

```mermaid
flowchart LR
  subgraph Page["Page code (browser)"]
    S["scripts/scripts.js: loadEager / loadLazy / loadDelayed"]
    D["decorators/data-layer-decorator.js: trackPage, trackBlocks, trackInteractions"]
    B["Blocks and decorators: data-cmp-* attributes, Tabs, Gen Carousel, Modal, List, Cards, Separator"]
    A["utils/analytics.js: pushToDataLayer, pushComponents, pushComponentEvent"]
    P["utils/privacy.js: redactSearchTerm"]
    DL[("window.adobeDataLayer (plain array)")]
    R["scripts/aem.js sampleRUM"]
  end
  S --> D
  B --> A
  D --> A
  D --> P
  A --> DL
  DL -.-> T["Adobe Tags + ACDL extension (not configured)"]
  T -.-> W["AEP Web SDK / Edge Network datastream (not configured)"]
  W -.-> AA["Adobe Analytics / CJA (not configured)"]
  R --> RUM["RUM collector (ot.aem.live)"]
```

## Modules

| Module | Exports | Role |
| --- | --- | --- |
| [`utils/analytics.js`](../../../utils/analytics.js) | `pushToDataLayer(entry)`, `pushComponents(components)`, `pushComponentEvent(event, id, info)` | Low-level pushes; every push is wrapped in `try / catch` so analytics never breaks rendering or links |
| [`decorators/data-layer-decorator.js`](../../../decorators/data-layer-decorator.js) | `trackPage()`, `trackBlocks(container)`, `trackInteractions()`, `componentIdOf(block)` | Page and component state, document-wide listeners (capture phase), component ids |
| [`decorators/card-list-decorator.js`](../../../decorators/card-list-decorator.js) | `trackCardList(block, options)` | List and Cards state with one entry per card |
| [`blocks/separator/separator.js`](../../../blocks/separator/separator.js), `separator-config.js` | `analyticsEntry(config, id)` | Separator state (opt-in Analytics field) |
| [`blocks/tabs/tabs.js`](../../../blocks/tabs/tabs.js), [`blocks/gen-carousel/gen-carousel.js`](../../../blocks/gen-carousel/gen-carousel.js), [`blocks/modal/modal.js`](../../../blocks/modal/modal.js) | — | `cmp:show` for tab panels, slides and dialogs; Tabs also pushes its panels as components |
| [`decorators/skeleton-decorator.js`](../../../decorators/skeleton-decorator.js) | `showSkeleton` | Marks a block `data-analytics="pending"` while its skeleton shows and tracks it once rendered |
| [`utils/privacy.js`](../../../utils/privacy.js) | `redactSearchTerm(value)` | Data minimisation of search terms |
| [`utils/viewport.js`](../../../utils/viewport.js) | `currentBreakpoint()` | `breakpoint` of clicks: `mobile` (< 600px), `tablet` (600–1199px), `desktop` (>= 1200px) |
| [`utils/metadata.js`](../../../utils/metadata.js) | `getPageMetadata()`, `getPageLanguage()`, `getPageTags()` | Page entry values |

## When entries are pushed

| Phase (`scripts/scripts.js`) | Call | What is pushed |
| --- | --- | --- |
| Eager, start of `loadEager` | `trackInteractions()` | The page entry (first entry); the document listeners start |
| Eager and lazy, while blocks decorate | `trackCardList`, Separator, Tabs | List / Cards (and their cards), Separator (when its Analytics is on), tab panels |
| Lazy, after `loadMainSections(main)` | `trackBlocks(main)` | One entry for every block in `main` not yet tracked |
| Skeleton removed (List, Filter List) | `trackBlocks(block.parentElement)` | The block once it has rendered, not its skeleton |
| Delayed, 3 seconds after load (`loadDelayed`) | `trackBlocks(document)`, then `import('./delayed.js')` | Header, footer and blocks added later (for example modals); `delayed.js` adds nothing today |
| Any time | document listeners, Tabs, Gen Carousel, Modal | `cmp:*` events |

The same code runs in Universal Editor, so entries are also pushed while authors edit (nothing leaves the browser).

## Page entry

`trackPage()` pushes one entry: `{ page: { 'page-{hash}': { ... } } }`. The id is `page-` plus a djb2-style hash of `window.location.pathname` in base 36, so the same path always gets the same id.

| Field | Value |
| --- | --- |
| `@type` | `tcs-corp/components/page` |
| `dc:title` | `og:title` metadata, else `document.title` (read before the SEO decorator applies `meta-title`) |
| `xdm:language` | The `language` metadata when it is a language code, else the locale's language tag (`utils/site.js`) |
| `xdm:template` | The Page Type (`page-type` metadata, else `template`); omitted when empty |
| `xdm:tags` | `article:tag` meta values and the `cq-tags` meta, else the comma-separated `tags` meta; de-duplicated |
| `repo:path` | `window.location.pathname` (the published path) |

Region, country, persona, content type, author and campaign id are page metadata (`utils/metadata.js`) but are not in the page entry. There is no separate page-view event: the page entry is the page-view signal a future Tags rule would use.

## Component entries, naming and ids

### Generic entries

`trackBlocks(container)` adds every decorated `.block` once: `{ component: { '{id}': { ... } } }`.

| Field | Value |
| --- | --- |
| (key) | The component id (`componentIdOf`, below) |
| `@type` | `tcs-corp/components/{block}`: the block's `data-block-name`, else its first class (for example `teaser`, `hero`, `header`, `footer`, `columns-container`) |
| `parentId` | The id of the nearest enclosing block (a Hero in a Gen Carousel, a block in a Fragment), else the page id |
| `dc:title` | The first heading (`h1`–`h6`) of the block: its `aria-label` or text, whitespace collapsed, at most 100 characters; omitted without a heading |

A block is skipped when it already has `data-cmp-tracked`, or when it or an ancestor carries `data-analytics` (`off`, `custom` or `pending`). Blocks hidden with the Additional tab's Hide block are still added. The Tab and Column Break markers set `data-analytics="off"` so they aren't registered as components.

### Component ids

`componentIdOf(block)` stores the id as `data-cmp-id`:

1. An existing `data-cmp-id`.
2. Else the block's `id`: the Anchor ID of the Additional tab (`decorators/block-options-decorator.js`), the Component ID of List, Cards and Separator, or an id the block sets itself.
3. Else `{block}-{n}`: a counter per block name in the order ids are first requested (normally page order), for example `teaser-1`, `teaser-2`.

`{block}-{n}` ids shift when blocks are added, removed or reordered; give blocks that matter for reporting a stable Anchor ID (or Component ID).

### Item ids and positions

| Block | Child component ids | Position |
| --- | --- | --- |
| List | `{list id}-item-{hash}` per card (`@type` `tcs-corp/components/list/item`) | `xdm:position` in the card entry; `data-cmp-position` on the card `li` (the feature card is position 1) |
| Cards | `{cards id}-item-{n}` per card (`tcs-corp/components/cards/item`) | As List |
| Tabs (block and Tabs Container) | Each panel id (`tcs-corp/components/tabs/item`, `parentId` the Tabs block); columns built in a panel get `{panel id}-columns` | — |
| Gen Carousel | `data-cmp-id` per slide (`{carousel}-slide-{n}`); slides aren't component entries | `position` in `cmp:show` |

Card entries carry `dc:title` (the item's Analytics label, else its title, else the start of its description), `xdm:linkURL`, `xdm:position` and `repo:modifyDate`. The List entry adds `xdm:listSource` (`parent`, `fixed`, `tags`) and `xdm:variant`; the Separator entry adds its configured options (see [`blocks/separator/README.md`](../../../blocks/separator/README.md)).

Variations are not recorded as a generic field: only List / Cards (`xdm:variant`, the card style or `links`) and Separator push a variant. Block classes (Additional tab, Style) are not in the entries.

## Events

All events use the envelope pushed by `pushComponentEvent`:

```json
{ "event": "cmp:click", "eventInfo": { "path": "component.{id}", "...": "..." } }
```

`eventInfo.path` is `component.{id}`, or `page.page-{hash}` for clicks outside any block (links in default content). The component of an event (`componentOf`) is the nearest `data-cmp-id` inside the same block (a card, a slide), else the block, else the page. The document listeners run once, in the capture phase.

| Event | Fires when | Extra `eventInfo` fields | Not pushed for |
| --- | --- | --- | --- |
| `cmp:click` | Click on `a[href]`, `button`, `[role="tab"]`, `[role="button"]` in a block, or a link in `main` default content | `interaction` (`data-cmp-interaction`, else `link` / `button`), `dc:title` (label, 100 characters), `xdm:linkURL`, `xdm:linkType` (`download`, `exit`, `other`), `value` (`data-cmp-value`), `position` (`data-cmp-position` of the element or its item), `breakpoint` | `summary` elements; elements in `data-analytics="off"`; the submit button of a search form; the click ending a scroller drag (`data-dragged`); `aria-disabled="true"` controls; elements outside blocks and outside `main` links |
| `cmp:show` | An accordion `<details>` opens (`toggle`); the user selects another tab; the active Gen Carousel slide changes (not the first slide on load; autoplay changes included); a Modal opens | `dc:title` (item or tab label), `position` (slide), `interaction: 'dialog'` (Modal) | The initial tab and the first slide |
| `cmp:hide` | An accordion item closes; any `<dialog>` closes (close button, Escape, backdrop) | `dc:title` (item), `interaction: 'dialog'` | — |
| `cmp:media` | `play`, `pause`, `ended` of a `<video>` / `<audio>` in a block | `interaction` (the event type), `xdm:mediaURL` (`currentSrc`), `position` (seconds) | Background videos (no controls, loop, muted); play / pause made by the page (`data-cmp-auto`, set by the Video block's off-screen pause / resume); YouTube and Vimeo iframes |
| `cmp:search` | Submit of a form in a block with `role="search"` or an `input[type="search"]` (today the Conversation Canvas search) | `xdm:searchTerm`: the redacted term | Empty terms (after redaction) |
| `cmp:submit` | Submit of any other form in a block (today Form Variations) that passes the browser's constraint validation (`novalidate` forms are checked with `checkValidity()`) | `dc:title` (the form's `aria-label`, else its `aria-labelledby` heading text, else its id, else the block name), `fields` (unique field names, never values) | Invalid submissions |
| `cmp:change` | `change` of an `input` / `select` with `data-cmp-interaction` (today Filter List options) | `interaction`, `value` (`data-cmp-value`, else the control value: the tag id), `checked` (checkboxes) | Controls without `data-cmp-interaction` (all Form Variations fields) |

`xdm:linkType` is `download` when the link has a `download` attribute or its URL ends in `.pdf`, `.doc(x)`, `.xls(x)`, `.ppt(x)`, `.zip`, `.csv`, `.txt`, `.mp3` or `.mp4`; `exit` when it goes to another origin (also `mailto:` and `tel:` links); else `other`.

Pushes outside the listeners: Tabs `cmp:show` (`blocks/tabs/tabs.js`, also the DOM event `tabs:change`), Gen Carousel `cmp:show`, Modal `cmp:show` (`blocks/modal/modal.js`). Tab buttons also push a `cmp:click` (`interaction` `button`). Other DOM events (`form-variations:submit`, `conversation-canvas:search`, `header:menu`, `tabs:reveal`) are not in the data layer.

## data-cmp-* attributes

| Attribute | Set by | Effect |
| --- | --- | --- |
| `data-cmp-id` | `componentIdOf` on blocks; blocks on child components (cards, slides) | The component of events inside it |
| `data-cmp-interaction` | Blocks and decorators on links, buttons, inputs | `interaction` of `cmp:click`; makes an input / select push `cmp:change` |
| `data-cmp-value` | Blocks on links, buttons, inputs | `value` of `cmp:click` / `cmp:change` (for example a filter tag id or `all`) |
| `data-cmp-position` | `decorators/card-list-decorator.js` on card items | `position` of `cmp:click` (1-based) |
| `data-cmp-tracked` | `trackBlocks` | Prevents a second state entry |
| `data-cmp-auto` | `blocks/video/video.js` before an automatic pause / play | The next media event is not pushed |
| `data-analytics="off"` | List / Cards / Separator with Analytics off, Tab, Column Break | No state and no events inside the block |
| `data-analytics="custom"` | `trackCardList`, Separator with Analytics on | The block pushes its own state; its events are still tracked |
| `data-analytics="pending"` | `decorators/skeleton-decorator.js` | Not tracked until rendered |
| `data-analytics-label` | Card links (List, Cards) | Informational; the Analytics label becomes the card entry's `dc:title` |

`data-cmp-interaction` values in the code:

| Value | Where |
| --- | --- |
| `card`, `cta`, `previous`, `next` | `decorators/card-list-decorator.js` (List, Cards) |
| `filter`, `filter-option`, `load-more` | `blocks/filter-list/filter-list.js` |
| `filter` (tag filters) | `blocks/conversation-canvas/conversation-canvas.js` |
| `previous`, `next`, `pause` / `play` (the toggle's current action) | `blocks/gen-carousel/gen-carousel.js` |
| `play` | `blocks/embed/embed.js` (placeholder play button) |
| `playback` | `blocks/video/video.js` (playback toggle) |
| `listen`, `download`, `share` | `decorators/article-meta-decorator.js` (Page Header) |
| `animation` | `decorators/animation-decorator.js` (Lottie pause / play) |

Author fields that affect analytics: the Anchor ID (Additional tab) becomes the component id; List / Cards Component ID, Analytics (`analyticsEnabled`, default on) and the items' Analytics label; Separator Component ID, Analytics (default off) and Analytics label. See the block READMEs ([List](../../../blocks/list/README.md), [Cards](../../../blocks/cards/README.md), [Separator](../../../blocks/separator/README.md)).

## What is measured today

| Measurement | Status | How (in the data layer) |
| --- | --- | --- |
| Page views | Active (data layer only) | The page entry, once per page load; no page-view event |
| Component impressions | Active (state only) | One component entry per block and per List / Cards card when the block is decorated; no visibility-based impression events |
| Shown content | Active | `cmp:show` for accordion items, tabs, carousel slides, modals |
| Clicks (links, buttons, CTAs, cards, navigation) | Active | `cmp:click` with `interaction`, `xdm:linkType`, `position`, `breakpoint`; header and footer links are attributed to the header / footer blocks |
| Downloads | Active | `cmp:click` with `xdm:linkType` `download`; the Page Header download (print) action is `interaction` `download` |
| Exit links | Active | `cmp:click` with `xdm:linkType` `exit` |
| Internal search | Active | `cmp:search` with the redacted term (Conversation Canvas); no search results page code in the repository |
| Filters | Active | Filter List pills (`cmp:click` `filter`), advanced options (`cmp:change` `filter-option`), Load more; Conversation Canvas tag filters (`cmp:click` `filter`) |
| Forms | Active (attempts) | `cmp:submit` for valid submissions, field names only; the outcome (sent / failed) is not pushed (blocked: measurement plan) |
| Video | Active (file videos) | `cmp:media` play / pause / ended for `<video>` files; YouTube / Vimeo iframes are not tracked beyond the Embed play button and the Video playback toggle (`cmp:click`) |
| Errors (404) | Active (RUM only) | `404.html` calls `sampleRUM('404', { source: document.referrer })`; the data layer pushes the regular page entry of the 404 document, with no error event |
| Personalized impressions | None | No personalization runtime ([Personalization](./personalization.md)) |

RUM (`sampleRUM` in [`scripts/aem.js`](../../../scripts/aem.js), never modified) samples page views (by default one in 100, overridable with `?rum=` / `?optel=`), sends checkpoints of sampled page views with `navigator.sendBeacon` to the RUM collector and loads the RUM enhancer for them (`sampleRUM.enhance()` after the first section in `loadMainSections`). It is independent of the data layer.

## Duplicate-event prevention

| Rule | Code |
| --- | --- |
| One page entry per page | `trackPage` keeps the page id |
| Listeners registered once | `trackInteractions` (`listening` flag) |
| One state entry per block | `data-cmp-tracked`; blocks with `data-analytics` (custom state, off, pending) are skipped |
| A search is one `cmp:search`, not also a click | `onClick` ignores the submit button of a search form |
| A drag isn't a click | `decorators/scroller-decorator.js` marks `data-dragged="true"` during a drag |
| A disabled control isn't a click | `aria-disabled="true"` ignored |
| Accordion summaries push show / hide, not a click | `summary` ignored by `onClick` |
| Automatic media actions aren't the visitor's | `data-cmp-auto` (Video block off-screen pause / resume); background loops ignored |
| No empty searches, no invalid submits | `redactSearchTerm` returns `''`; `checkValidity()` for `novalidate` forms |

The audit harness confirms it: in the re-audit, 758 of 758 test clicks pushed exactly one `cmp:click`, and no page had duplicate component ids ([`docs/audit/REAUDIT-2026-10-20.md`](../../../docs/audit/REAUDIT-2026-10-20.md)).

## Privacy and data minimisation

| Rule | Code |
| --- | --- |
| No form values | `cmp:submit` carries field names only; Form Variations fields have no `data-cmp-interaction`, so typing pushes nothing |
| Search terms redacted | `redactSearchTerm`: e-mail addresses become `[email]`, phone-like numbers (7+ digits) `[number]`, trimmed, at most 100 characters; unit tested |
| Labels truncated | `dc:title` of clicks and generic entries at most 100 characters |
| Opt-out per block | `data-analytics="off"` (List, Cards, Separator Analytics fields) |
| No storage | The data layer code writes no cookies or web storage |

Known residual risks (not corrected in code): `mailto:` and `tel:` links are pushed in full as `xdm:linkURL` (handover finding F-05); query strings of link URLs are pushed as they are; the Conversation Canvas Search page URL carries the raw query (`?q=`), which a future Web SDK would collect as the page URL (re-audit R-D-12, blocked until Tags exists). See [Security, privacy and consent](./security-privacy-consent.md).

## Adobe Data Collection, Web SDK, Analytics and CJA: not configured

Blocked: measurement plan. No Adobe Tags property, Web SDK (`alloy`), Edge Network datastream, XDM schema, Analytics report suite or CJA data view exists in the repository, and no ids are recorded here. The handover Part 11 (section 11.7, "Integrating Adobe Tags and the Web SDK") describes the planned flow as a recommendation only:

```mermaid
flowchart LR
  DL[("window.adobeDataLayer")] -.-> ACDL["Adobe Tags: ACDL extension (not configured)"]
  ACDL -.-> RULES["Tags rules on cmp:* events (not configured)"]
  RULES -.-> SDK["Web SDK sendEvent, XDM (not configured)"]
  SDK -.-> EDGE["Edge Network datastream (not configured)"]
  EDGE -.-> AN["Adobe Analytics / CJA (not configured)"]
```

Planned points from the handover (not implemented): the Tags embed loads from `scripts/delayed.js` (delayed phase, so `strict-dynamic` in the CSP trusts it), never from `head.html` and never in Universal Editor or on AEM author; staging library on `.aem.page`, production on `.aem.live` and the production domain; the ACDL extension processes the entries already in the array; `xdm:linkType` values already match the XDM `web.webInteraction.type` enumeration; a page-view rule, link / exit / download rules and rules per `cmp:*` event. The measurement plan, the Tags property, the datastreams, the XDM mapping and the consent platform are open items (handover Part 16, O-07).

## Consent and identity

No consent banner, consent management platform or consent check exists, and no visitor identity (ECID, login, CRM id) is read or set. The data layer is filled without a consent check because it stays in the page; consent must govern any future sending (handover 11.7.6; [Security, privacy and consent](./security-privacy-consent.md)). The consent categories and the identity strategy are blocked dependencies (re-audit / audit section 9).

## Debugging and validation

Console checks on preview or live (not in Universal Editor edit mode, where clicks select components):

```js
window.adobeDataLayer;                                   // all entries
adobeDataLayer.find((e) => e.page);                      // the page entry
adobeDataLayer.filter((e) => e.component)
  .flatMap((e) => Object.entries(e.component))
  .map(([id, c]) => [id, c['@type'], c.parentId]);       // component ids and types
adobeDataLayer.filter((e) => e.event);                   // events only
adobeDataLayer.filter((e) => e.event).at(-1);            // the last event
```

`adobeDataLayer.getState()` and `addEventListener()` exist only once an ACDL library is loaded. Enable "Preserve log" (or Ctrl / Cmd + click) when testing links that navigate. `?debug=list` and `?debug=separator` log the List / Separator configuration to the console (not data layer entries).

| Validation | Status | Source |
| --- | --- | --- |
| Audit harness: data layer present, page entry, component count, duplicate component ids, one `cmp:click` per test click (local preview, 188 pages × 5 widths) | Passed (re-audit, 20 October 2026) | [`docs/audit/tools/harness.mjs`](../../../docs/audit/tools/harness.mjs), [`docs/audit/REAUDIT-2026-10-20.md`](../../../docs/audit/REAUDIT-2026-10-20.md) |
| Search redaction unit tests (`npm test`) | Passed (5 of 5, run locally on 21 October 2026; CI runs lint only, not `npm test`) | [`test/privacy/privacy.test.mjs`](../../../test/privacy/privacy.test.mjs) |
| Unit tests of the data layer decorator | Not applicable (none exist) | — |
| Adobe Tags, Web SDK, Analytics / CJA, duplicate-event checks in the AEP Debugger | Blocked: Tags property, datastream and measurement plan | Audit section 9 |

Manual test cases (page entry, 3-second component entries, link / download / exit clicks, cards, accordion, tabs, carousel, modal, video, search, form, filter, Analytics off, breakpoint) are listed in the handover 11.8; troubleshooting is handover Part 13 (13.20 Data Layer Events Missing).

## Rules for developers

- Reuse the data layer code: new blocks get state, clicks, accordion toggles, dialogs, media and forms automatically. Describe interactions with `data-cmp-interaction`, `data-cmp-value`, `data-cmp-position` and `data-cmp-id`; don't push clicks from blocks ([`AGENTS.md`](../../../AGENTS.md), Data layer).
- Push only state the central code can't know, with `pushComponentEvent` / `pushComponents` from `utils/analytics.js` (for example a tab or slide shown); for richer state set `data-analytics="custom"` (see `trackCardList`).
- Don't add parallel tracking libraries, a second data layer or a tag script in `head.html`; a future Tags embed belongs in `scripts/delayed.js`.
- Never push form values or other personal data; run free text through `utils/privacy.js`.
- Document new interactions in [`decorators/README.md`](../../../decorators/README.md) and the block README.

## Related

- [Architecture](./architecture.md), [Blocks](./blocks.md), [Indexing and search](./indexing-and-search.md), [Decision log](./decision-log.md)
- [Personalization](./personalization.md)
- [Security, privacy and consent](./security-privacy-consent.md)
- [`decorators/README.md`](../../../decorators/README.md), [`utils/README.md`](../../../utils/README.md)
- [`AGENTS.md`](../../../AGENTS.md) (Data layer, Three-Phase Page Loading)
- Handover Part 11 — Analytics & Data Layer, Part 13 — Global Troubleshooting Guide, Part 16 — Handover Findings and Open Items Register ([`TCS-CORP-HANDOVER.md`](../TCS-CORP-HANDOVER.md))
- [`docs/audit/BLOCK-ECOSYSTEM-AUDIT.md`](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md) (sections 6, 7 and 9), [`docs/audit/REAUDIT-2026-10-20.md`](../../../docs/audit/REAUDIT-2026-10-20.md)
- Block READMEs with data layer sections: [`blocks/README.md`](../../../blocks/README.md)
