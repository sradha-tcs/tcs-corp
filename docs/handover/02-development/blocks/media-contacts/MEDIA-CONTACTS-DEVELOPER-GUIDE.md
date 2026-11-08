---
id: "DEV-B-media-contacts"
title: "Media Contacts Block — Developer Guide"
role: "Development"
topic: "block"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/media-contacts/README.md","blocks/media-contacts/_media-contacts.json","blocks/media-contacts/media-contacts-data.js","blocks/media-contacts/media-contacts.css","blocks/media-contacts/media-contacts.js"]
relatedComponents: ["media-contacts"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Media Contacts Block — Developer Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-B-media-contacts |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | How the Media Contacts block is built: files, model, structure, behaviour, variations, tests and limitations |
| Scope | blocks/media-contacts/ and its components media-contacts |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 2026-11-08 (model, files, imports from the code; reference pages from the live site) |
| Source files | blocks/media-contacts/README.md, blocks/media-contacts/_media-contacts.json, blocks/media-contacts/media-contacts-data.js, blocks/media-contacts/media-contacts.css, blocks/media-contacts/media-contacts.js |
| Related documents | [Variations](./MEDIA-CONTACTS-VARIATIONS.md), [Test coverage](./MEDIA-CONTACTS-TEST-COVERAGE.md), [Authoring guide](../../../03-authoring/components/media-contacts/MEDIA-CONTACTS-AUTHORING-GUIDE.md) |
| Related AEM paths | — |

## Contents

- [Summary](#summary)
- [Overview](#overview)
- [Source files](#source-files)
- [Components, models and filters](#components-models-and-filters)
- [Fields](#fields)
- [Dependencies](#dependencies)
- [For Developers](#for-developers)
- [Extending the Block](#extending-the-block)
- [Responsive Behavior](#responsive-behavior)
- [Accessibility](#accessibility)
- [Data Layer and Analytics](#data-layer-and-analytics)
- [Performance Considerations](#performance-considerations)
- [Security and Privacy](#security-and-privacy)
- [For Architects](#for-architects)
- [Troubleshooting](#troubleshooting)
- [Known limitations of the block](#known-limitations-of-the-block)
- [Change history of the block](#change-history-of-the-block)
- [Reference pages](#reference-pages)
- [Coverage of the required topics](#coverage-of-the-required-topics)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Summary

| Attribute | Value |
| --- | --- |
| Block | Media Contacts |
| Folder | `blocks/media-contacts` |
| Type | Independent |
| Category | listing |
| Status | Active |
| Purpose | The media contacts of the locale's Media Contacts sheet, grouped by designation and region |
| Variations (summary) | Title and Title Type; contacts of the page's region, else all |
| Children | — |
| Code size | 251 lines of JS and CSS |

## Overview

- **Business purpose:** journalists find the right press contact for their region at the end of every press release, from one list maintained in one place (the sheet).
- **User experience:** the title (e.g. "TCS media contacts"), then the groups: the brand-blue group heading and, below it, each e-mail address and phone number as an underlined link with its icon. Two columns from 900px (filled top to bottom), one column below.
- **Templates / page types:** press releases (Page Type `press-release`). The Press Release template no longer adds the contacts by itself: authors add this block (KB-D-054 in the knowledge base decision log).
- **Data source:** the Media Contacts sheet of the page's locale (`utils/data.js` `getMediaContacts`): the rows whose `region` is the page's `region` metadata, else all rows. Placeholders `mediaContacts`, `email`, `phone`, `mediaContactsEditorHint`.
- **Related blocks:** Page Header (the press release's header), Teaser and List (the other press release sections).
- **When to use:** on press releases and media pages that should show the press contacts.
- **When not to use:** for one-off contacts of a single page (author a Text with links, or a Teaser); for contacts that aren't in the Media Contacts sheet.
- **Realistic use cases:** the "TCS media contacts" section at the end of a press release; a newsroom contact page; a regional press page whose `region` metadata shows only that region's contacts.

## Source files

| File | Link |
| --- | --- |
| `README.md` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/media-contacts/README.md) |
| `_media-contacts.json` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/media-contacts/_media-contacts.json) |
| `media-contacts-data.js` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/media-contacts/media-contacts-data.js) |
| `media-contacts.css` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/media-contacts/media-contacts.css) |
| `media-contacts.js` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/media-contacts/media-contacts.js) |

## Components, models and filters

| Component | Title | Resource type | Template name | Model | Children allowed |
| --- | --- | --- | --- | --- | --- |
| `media-contacts` | Media Contacts | `core/franklin/components/block/v1/block` | Media Contacts | `media-contacts` | — |

## Fields

The Additional tab fields (anchor, hide, padding, margin, animation) are common to the blocks and described in the [content modeling guide](../../markdown/CONTENT-MODELING-GUIDE.md).

### Media Contacts (`media-contacts`)

| Tab | Label | Property | Type | Required in model | Default | Options | Visibility |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Content | Title | `title` | text | No | — | — | — |
| Content | Title Type | `titleType` | select | No | `h2` | 6 options | — |

"Required in model" is the model's `required` flag; whether a field is required in practice is stated in the authoring guide where it is known.

## Dependencies

| Import |
| --- |
| `../../decorators/contact-list-decorator.js` |
| `../../decorators/heading-decorator.js` |
| `../../decorators/skeleton-decorator.js` |
| `../../utils/data.js` |
| `../../utils/environment.js` |
| `../../utils/metadata.js` |
| `../../utils/placeholders.js` |
| `../../utils/properties.js` |
| `./media-contacts-data.js` |

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/media-contacts/
├── README.md
├── _media-contacts.json
├── media-contacts-data.js
├── media-contacts.css
└── media-contacts.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`decorators/contact-list-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/contact-list-decorator.js) | `buildContactGroups` (groups of contacts, each with its heading and its mail / phone links one below the other; the links carry `data-cmp-interaction` email / phone) | `media-contacts.js`: { buildContactGroups } |
| [`decorators/heading-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/heading-decorator.js) | `buildHeading` (Title + Title Type), `HEADINGS` | `media-contacts.js`: { buildHeading, HEADINGS } |
| [`decorators/skeleton-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/skeleton-decorator.js) | `renderWhenLoaded` (a block from data that may take time: directly within 150ms, else after a skeleton so its section is shown; removed on success and failure), `skeletonWhile` (a skeleton in a part that fills in by itse | `media-contacts.js`: { bone, renderWhenLoaded, skeletonElement } |
| [`utils/data.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/data.js) | `loadDataSheet`, `getAuthor`, `getAuthors`, `getLocations`, `getPartners`, `getSocialLinks`, `getMediaContacts`, `inRegion` (the locale's data sheets) | `media-contacts.js`: { getMediaContacts, inRegion } |
| [`utils/environment.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/environment.js) | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | `media-contacts.js`: { isAuthor, isEditing } |
| [`utils/metadata.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/metadata.js) | `getPageMetadata`, `getPageTags` (article:tag and the AEM page Tags published as `cq-tags`), `getPageLanguage` (page properties and bulk metadata columns: page-type, author-id, publish-date, reading-time, ...) | `media-contacts.js`: { getPageMetadata } |
| [`utils/placeholders.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `media-contacts.js`: { getPlaceholders } |
| [`utils/properties.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `media-contacts.js`: { readProperties, textOf } |

<!-- END GENERATED: files -->

- **JavaScript (`media-contacts.js`):** an async `decorate(block)`. It reads Title and Title Type (`readProperties`), requests the sheet and the placeholders, and renders through `renderWhenLoaded` (a skeleton when the sheet takes longer than 150ms). It selects the page region's rows (`inRegion`, else all), groups them (`media-contacts-data.js` `groupContacts`, `telHref`) and builds the list with `decorators/contact-list-decorator.js` `buildContactGroups`.
- **Pure logic (`media-contacts-data.js`):** `groupHeading`, `groupContacts`, `telHref`; unit tested in `test/media-contacts/media-contacts-data.test.mjs`.
- **CSS (`media-contacts.css`):** headings, links with `::before` icons (CSS masks of `icons/mail.svg` / `icons/phone.svg`), underlined text, two columns from 900px.
- **Input DOM:** key-value rows for `title` (with Title Type collapsed into it as the heading level) and `titleType`; the `classes_*` fields arrive as block classes.
- **Rendered DOM:**

```html
<div class="media-contacts block">
  <h2 class="media-contacts-title">TCS media contacts</h2>
  <ul class="contact-list-groups">
    <li class="contact-list-group" data-cmp-position="1">
      <h3 class="contact-list-heading">Corporate Communications &amp; India</h3>
      <ul class="contact-list-entries">
        <li class="contact-list-email">
          <a class="contact-list-link" href="mailto:…" data-cmp-interaction="email" data-cmp-value="Corporate Communications &amp; India">
            <span class="visually-hidden">Email: </span><span class="contact-list-text">…</span>
          </a>
        </li>
        <li class="contact-list-phone">…</li>
      </ul>
    </li>
  </ul>
</div>
```

- **Empty state:** no contacts: the block and its wrapper are hidden on the page; in Universal Editor and on AEM author the title and the hint `mediaContactsEditorHint` show.
- **Errors:** a failing sheet request counts as no contacts (`loadDataSheet`); a failing render is logged by `renderWhenLoaded`.
- **Motion:** `CONTENT_TARGETS['media-contacts']` animates the title and the groups one after another.

## Extending the Block

1. Add fields in `_media-contacts.json` (at most three short tabs, Additional last), run `npm run build:json`, `npm run lint`, `npm run build:docs`.
2. Respect the delivery rules (no Text / Title / Type / Alt / MimeType suffixes for values that must be read; no sample content in the template).
3. Keep the grouping in `media-contacts-data.js` pure and extend its tests.
4. A new sheet column: read it in `utils/data.js` `getMediaContacts` and document it in the knowledge base (content architecture, data sheets).
5. Keep link names and the data layer's address-free click events.

## Responsive Behavior

| Viewport | Layout | Image behavior | Interaction behavior |
| -------- | ------ | -------------- | -------------------- |
| Below 900px (mobile, tablet) | One column; group headings at `--heading-font-size-l`, links at `--heading-font-size-m` | Icons 1.5rem | Tap a link to write or call |
| 900px and wider (desktop) | Two columns (`columns: 2`, gap 4rem), filled top to bottom, a group never split | Icons 1.5rem | As above |

## Accessibility

- **Semantic HTML:** the title is a heading; the groups are a list, each with its heading (one level below the title) and a list of links.
- **Link names:** each link starts with a visually hidden "Email:" / "Phone:" (placeholders `email`, `phone`), so its purpose is clear out of context; the icons are CSS backgrounds without text.
- **Keyboard and focus:** links are reachable with Tab and have a visible focus outline.
- **Contrast:** text in `--color-text-default`, headings and icons in `--color-text-brand` (5.4:1 on white).
- **Reflow:** one column below 900px; long addresses wrap (`overflow-wrap: anywhere`).
- **Reduced motion:** the Additional tab's animations don't play for visitors who prefer reduced motion or in the editor.
- **Loading:** while the sheet loads for longer than 150ms, a skeleton marked `aria-busy` (hidden from assistive technology) holds the place.

Author responsibilities: choose the heading level. Sheet owners: consistent designations and regions.

## Data Layer and Analytics

- **Component:** `decorators/data-layer-decorator.js` adds the block once rendered: `@type` `tcs-corp/components/media-contacts`, id = the Anchor ID else `media-contacts-{n}`, `dc:title` = the title.
- **Item positions:** each group has `data-cmp-position` (1, 2, …).
- **Interactions:** the links carry `data-cmp-interaction` (`email` / `phone`) and `data-cmp-value` (the group heading).

| Trigger | Data-layer event | Required properties | Analytics behavior |
| ------- | ---------------- | ------------------- | ------------------ |
| Block rendered | component state (`component.{id}`) | `@type`, `parentId`, `dc:title` | Component inventory of the page |
| Click on an e-mail address | `cmp:click` | `interaction` `email`, `dc:title` `email`, `xdm:linkURL` `mailto:`, `xdm:linkType` `other`, `value` (group), `position` | Contact interest per group, without the address |
| Click on a phone number | `cmp:click` | `interaction` `phone`, `dc:title` `phone`, `xdm:linkURL` `tel:`, `xdm:linkType` `other`, `value`, `position` | As above |

The data layer never records the address or number: `decorators/data-layer-decorator.js` reports every `mailto:` / `tel:` link of the site by its kind (`utils/privacy.js` `contactLinkKind`). Tags and the Web SDK aren't configured yet.

## Performance Considerations

- **Request:** one sheet request per page view (shared with other users of `utils/data.js`), plus the placeholders (already loaded by the page).
- **Skeleton:** only when the sheet takes longer than 150ms, so the section isn't held back.
- **DOM size:** a few elements per contact; no listeners.
- **Layout shift:** the block sits below the fold on press releases; above the fold, the skeleton reserves part of its height.

## Security and Privacy

- **Content:** text nodes only (`textContent`); no HTML from the sheet is injected.
- **Personal data:** the sheet's names, e-mail addresses and phone numbers are public by design; the data layer records none of them.
- **Links:** `mailto:` and `tel:` only.

## For Architects

- **Role:** a data-driven listing block; the sheet is the single source of the contacts.
- **Rendering:** client side from the sheet JSON (cached per page view by `utils/data.js`); the title is in the delivered HTML, the contacts are not (not indexed by search engines from the HTML).
- **Dependencies:** `decorators/contact-list-decorator.js`, `heading-decorator.js`, `skeleton-decorator.js`; `utils/data.js`, `environment.js`, `metadata.js`, `placeholders.js`, `properties.js`.
- **Privacy:** the data layer records the kind of contact link and the group, never the address (`utils/privacy.js`).
- **Replaces:** the Media contacts section the Press Release template appended at the end of the page (not in the content tree, not authorable).

```mermaid
graph LR
  AEM[AEM author: Media Contacts block] --> EDS[Edge Delivery HTML]
  SHEET[Media Contacts sheet] --> JSON[/locale/data/media-contacts.json]
  EDS --> JS[blocks/media-contacts/media-contacts.js]
  JSON --> JS
  JS --> CL[decorators/contact-list-decorator.js]
  EDS --> DL[decorators/data-layer-decorator.js]
  DL --> ACDL[Adobe Client Data Layer]
```

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| The block doesn't show on the page | The sheet has no rows (or isn't published) | Open `/{locale}/data/media-contacts.json` | Add rows and publish the sheet | The groups appear |
| A group appears twice | Different spelling of the designation or region | Compare the rows | Spell them the same | One group |
| Only some contacts show | The page's `region` matches some rows | Check the page's `region` metadata | Change the region, or the rows' regions | The expected rows |
| A phone link dials a wrong number | Letters or extra characters in `phone` | Check the cell | Write the number with digits, spaces and a leading + | `tel:` link correct |

## Known limitations of the block

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Contacts aren't in the delivered HTML | Search engines see them only after rendering | None needed for press contacts | Not planned |
| No per-block region | All blocks on a page use the page's `region` | Set the page's region | Not planned |
| Pages that relied on the template's Media contacts | They show no contacts until the block is added | Add the block (end of the page) | Not planned |

## Change history of the block

| Version | Change | Source | Date |
| ------- | ------ | ------ | ---- |
| 1.0 | New block: the media contacts of the Media Contacts sheet as an authorable block, grouped by designation and region; the Press Release template no longer appends them | Feature branch feature/media-contacts-block | 22 October 2026 |

## Reference pages

| Kind | Page | Live URL |
| --- | --- | --- |

## Coverage of the required topics

| Topic | Where |
| --- | --- |
| Purpose | Overview |
| Source files | generated: Files |
| Model, definition, filters, children | generated: Components |
| Dependencies | generated: Dependencies |
| Authored input / rendered output / DOM transformation | For Developers |
| Configuration fields, defaults, required fields | generated: Fields |
| Variations | MEDIA-CONTACTS-VARIATIONS.md |
| Responsive behaviour | Responsive Behavior |
| Accessibility and keyboard | Accessibility |
| Analytics / data layer | Data Layer and Analytics |
| Performance | Performance Considerations |
| Security | Security and Privacy |
| Extending | Extending the Block |
| Known limitations | Known Limitations |
| Troubleshooting | Troubleshooting |
| Tests | MEDIA-CONTACTS-TEST-COVERAGE.md |
| SEO behaviour | Not recorded |
| Caching considerations | Not recorded (Edge Delivery default caching; no block-specific rule) |
| Ownership | Technical Lead / Block Owner (proposed) |

## Screenshots

> **Screenshot required**
>
> - Required screen: Media Contacts on its block library page
> - Required role/access: none (published page)
> - Required navigation steps: Open https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/media-contacts
> - Reason unavailable: No block library page of this block was found under /design-block-master/en/block-library
> - Owner: Content Lead / AEM Authoring Lead (proposed)
> - Target completion date: To be confirmed

![Desktop rendering — The Media Contacts block at 1440 px on the block library page Media Contacts variations: the H2 TCS media contacts, then two columns filled top to bottom: Corporate Communications & India with three e-mail addresses one below the other, Asia Pacific, Canada, Latin America and Australia and New Zealand on the left; Europe, Japan, Middle East & Africa, UK and USA on the right, each with an e-mail address and a phone number, a blue mail or phone icon before each underlined link. (Sample content on the preview: the tcs.com media contacts; callout letters as in the Field Entry Table; file screenshots/media-contacts-desktop-view.jpg)](./screenshots/handover/media-contacts-desktop-view.jpg)

*Figure: Desktop rendering — The Media Contacts block at 1440 px on the block library page Media Contacts variations: the H2 TCS media contacts, then two columns filled top to bottom: Corporate Communications & India with three e-mail addresses one below the other, Asia Pacific, Canada, Latin America and Australia and New Zealand on the left; Europe, Japan, Middle East & Africa, UK and USA on the right, each with an e-mail address and a phone number, a blue mail or phone icon before each underlined link. (Sample content on the preview: the tcs.com media contacts; callout letters as in the Field Entry Table; file screenshots/media-contacts-desktop-view.jpg) (handover screenshot; rendering at the time it was taken).*

![Mobile rendering — The same block at 375 px: the H2 TCS media contacts and the groups in one column, Corporate Communications & India with its three e-mail addresses, then Asia Pacific, Canada and the other regions, each address and number on its own line with its icon. (Sample content on the preview; callout letters as in the Field Entry Table; file screenshots/media-contacts-mobile-view.jpg)](./screenshots/handover/media-contacts-mobile-view.jpg)

*Figure: Mobile rendering — The same block at 375 px: the H2 TCS media contacts and the groups in one column, Corporate Communications & India with its three e-mail addresses, then Asia Pacific, Canada and the other regions, each address and number on its own line with its icon. (Sample content on the preview; callout letters as in the Field Entry Table; file screenshots/media-contacts-mobile-view.jpg) (handover screenshot; rendering at the time it was taken).*

![Regional variation — The block library page Media Contacts: one region at 1440 px, whose region metadata is Europe: the H2 Media contacts in Europe and the single group Europe with roland.bagen@tcs.com and +46 70 3178024. (Sample content on the preview; callout letters as in the Field Entry Table; file screenshots/media-contacts-region.jpg)](./screenshots/handover/media-contacts-region.jpg)

*Figure: Regional variation — The block library page Media Contacts: one region at 1440 px, whose region metadata is Europe: the H2 Media contacts in Europe and the single group Europe with roland.bagen@tcs.com and +46 70 3178024. (Sample content on the preview; callout letters as in the Field Entry Table; file screenshots/media-contacts-region.jpg) (handover screenshot; rendering at the time it was taken).*

![Default title — The second example of the variations page at 1440 px: the block without a Title shows the heading Media contacts (placeholder) above the same groups. (Sample content on the preview; callout letters as in the Field Entry Table; file screenshots/media-contacts-default-title.jpg)](./screenshots/handover/media-contacts-default-title.jpg)

*Figure: Default title — The second example of the variations page at 1440 px: the block without a Title shows the heading Media contacts (placeholder) above the same groups. (Sample content on the preview; callout letters as in the Field Entry Table; file screenshots/media-contacts-default-title.jpg) (handover screenshot; rendering at the time it was taken).*

![Press release template — The end of the block library page Press release template at 1440 px: the release text with About TCS, then the Media Contacts block with the H2 Media contacts and the groups in two columns; the Press Release template no longer appends a section of its own. (Sample content on the preview; callout letters as in the Field Entry Table; file screenshots/template-press-release-media-contacts.jpg)](./screenshots/handover/template-press-release-media-contacts.jpg)

*Figure: Press release template — The end of the block library page Press release template at 1440 px: the release text with About TCS, then the Media Contacts block with the H2 Media contacts and the groups in two columns; the Press Release template no longer appends a section of its own. (Sample content on the preview; callout letters as in the Field Entry Table; file screenshots/template-press-release-media-contacts.jpg) (handover screenshot; rendering at the time it was taken).*

## Known limitations

- Universal Editor dialogs were not captured: no author access in this program (see the access blockers).

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
