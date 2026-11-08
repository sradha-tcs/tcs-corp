---
id: "DEV-B-image-collage"
title: "Image Collage Block — Developer Guide"
role: "Development"
topic: "block"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/image-collage/README.md","blocks/image-collage/_image-collage.json","blocks/image-collage/image-collage.css","blocks/image-collage/image-collage.js"]
relatedComponents: ["image-collage","image-collage-item"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Image Collage Block — Developer Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-B-image-collage |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | How the Image Collage block is built: files, model, structure, behaviour, variations, tests and limitations |
| Scope | blocks/image-collage/ and its components image-collage, image-collage-item |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 2026-11-08 (model, files, imports from the code; reference pages from the live site) |
| Source files | blocks/image-collage/README.md, blocks/image-collage/_image-collage.json, blocks/image-collage/image-collage.css, blocks/image-collage/image-collage.js |
| Related documents | [Variations](./IMAGE-COLLAGE-VARIATIONS.md), [Test coverage](./IMAGE-COLLAGE-TEST-COVERAGE.md), [Authoring guide](../../../03-authoring/components/image-collage/IMAGE-COLLAGE-AUTHORING-GUIDE.md) |
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
| Block | Image Collage |
| Folder | `blocks/image-collage` |
| Type | Container |
| Category | content |
| Status | Active (Proposed, KB-D-063) |
| Purpose | Centred eyebrow, title, description and CTAs on a dark background framed by up to nine floating decorative images |
| Variations (summary) | Title weight, description size, eyebrow style, CTA styles, backgrounds and shapes, image treatment |
| Children | image-collage-item (Collage image item) |
| Code size | 1366 lines of JS and CSS |

## Overview

- **Business purpose:** a visual statement section, for example to introduce a portfolio, a story or a brand theme, where many small images set the mood around one message.
- **User experience:** a dark block at least 64rem high (46.875rem on tablets) with a soft overlay over the images. The text column is centred and at most 37.5rem wide. The images float slowly (not with reduced motion) and are decorative (`aria-hidden`), so screen readers read only the text and the CTAs.
- **Templates / page types:** any page. No template adds the block.
- **Data source:** authored fields and the Collage image items only. Placeholders: `opensInNewTab` (CTAs opening a new tab) and `itemEditorHint` (empty items in Universal Editor).
- **Related blocks:** Teaser (`blocks/teaser`), whose Layout Image collage has the same purpose (see KB-D-063); Hero (`blocks/hero`) for the opening banner of a page.
- **When to use:** one message framed by a set of images, with at most two CTAs.
- **When not to use:** when the images carry information (they are decorative and hidden from assistive technology; use Cards or a List); for the page's opening banner (use a Hero).
- **Realistic use cases:** a "Our work" introduction above a case study list; a brand campaign section; an events or culture page section.

## Source files

| File | Link |
| --- | --- |
| `README.md` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/image-collage/README.md) |
| `_image-collage.json` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/image-collage/_image-collage.json) |
| `image-collage.css` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/image-collage/image-collage.css) |
| `image-collage.js` | [GitHub](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/image-collage/image-collage.js) |

## Components, models and filters

| Component | Title | Resource type | Template name | Model | Children allowed |
| --- | --- | --- | --- | --- | --- |
| `image-collage` | Image Collage | `core/franklin/components/block/v1/block` | Image Collage | `image-collage` | image-collage-item |
| `image-collage-item` | Collage image item | `core/franklin/components/block/v1/block/item` | Collage image item | `image-collage-item` | — |

## Fields

The Additional tab fields (anchor, hide, padding, margin, animation) are common to the blocks and described in the [content modeling guide](../../markdown/CONTENT-MODELING-GUIDE.md).

### Image Collage (`image-collage`)

| Tab | Label | Property | Type | Required in model | Default | Options | Visibility |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Content | Title | `title` | text | No | — | — | — |
| Content | Title Type | `titleType` | select | No | `h2` | 6 options | — |
| Content | Hide Title | `titleHidden` | boolean | No | `false` | — | — |
| Content | Description | `description` | richtext | No | `""` | — | — |
| Content | Show Description | `showDescription` | boolean | No | `true` | — | — |
| Content | Primary CTA Title | `primaryCtaText` | text | No | — | — | — |
| Content | Primary CTA Link | `primaryCta` | aem-content | No | — | — | — |
| Content | Primary CTA Link Type | `primaryCtaTarget` | select | No | `""` | 2 options | — |
| Content | Primary CTA Link Style | `primaryCtaStyle` | select | No | `primary` | 4 options | — |
| Content | Primary CTA Background | `primaryCtaBackground` | select | No | `""` | 4 options | — |
| Content | Primary CTA Shape | `primaryCtaShape` | select | No | `""` | 2 options | — |
| Content | Secondary CTA Title | `secondaryCtaText` | text | No | — | — | — |
| Content | Secondary CTA Link | `secondaryCta` | aem-content | No | — | — | — |
| Content | Secondary CTA Link Type | `secondaryCtaTarget` | select | No | `""` | 2 options | — |
| Content | Secondary CTA Link Style | `secondaryCtaStyle` | select | No | `secondary` | 4 options | — |
| Content | Secondary CTA Background | `secondaryCtaBackground` | select | No | `""` | 4 options | — |
| Content | Secondary CTA Shape | `secondaryCtaShape` | select | No | `""` | 2 options | — |
| Style | Title weight | `titleWeight` | select | No | `""` | 3 options | — |
| Style | Description size | `descriptionSize` | select | No | `""` | 3 options | — |
| Style | Background color | `backgroundColor` | select | No | `""` | 2 options | — |

### Collage image item (`image-collage-item`)

| Tab | Label | Property | Type | Required in model | Default | Options | Visibility |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Collage image | Image | `image` | reference | Yes | — | — | — |
| Collage image | Image alt text | `imageAlt` | text | No | — | — | — |
| Collage image | Image treatment | `imageTreatment` | select | No | `black-white` | 2 options | — |

"Required in model" is the model's `required` flag; whether a field is required in practice is stated in the authoring guide where it is known.

## Dependencies

| Import |
| --- |
| `../../scripts/aem.js` |
| `../../scripts/scripts.js` |
| `../../decorators/a11y-decorator.js` |
| `../../decorators/button-decorator.js` |
| `../../decorators/content-decorator.js` |
| `../../decorators/editor-item-decorator.js` |
| `../../decorators/heading-decorator.js` |
| `../../decorators/image-decorator.js` |
| `../../utils/cells.js` |
| `../../utils/links.js` |
| `../../utils/placeholders.js` |
| `../../utils/properties.js` |

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/image-collage/
├── README.md
├── _image-collage.json
├── image-collage.css
└── image-collage.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`scripts/aem.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/aem.js) | Edge Delivery core library (block loading, CSS, metadata, optimized pictures) | `image-collage.js`: { toClassName } |
| [`scripts/scripts.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/scripts.js) | Page decoration (moveInstrumentation and shared page helpers) | `image-collage.js`: { moveInstrumentation } |
| [`decorators/a11y-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/a11y-decorator.js) | `hideVisually`, `createHiddenText` (with `.visually-hidden` in `styles/styles.css`) | `image-collage.js`: { hideVisually } |
| [`decorators/button-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/button-decorator.js) | `decorateButton` (option `newTabHint`: a link opening a new tab says so), `createButton`, `setButtonDisabled`, `setButtonAlignment`, `removeButtonDecoration` | `image-collage.js`: { decorateButton } |
| [`decorators/content-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/content-decorator.js) | `fromCell` (property content into an element, keeping editor instrumentation) | `image-collage.js`: { fromCell } |
| [`decorators/editor-item-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/editor-item-decorator.js) | `buildEditorItems`, `editorItemHint` (in Universal Editor, an item the block doesn't render yet, e.g. a CTA just added, as a dashed placeholder the author can select; styles in `styles/lazy-styles.css`; the hint loaded o | `image-collage.js`: { buildEditorItems, editorItemHint, } |
| [`decorators/heading-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/heading-decorator.js) | `buildHeading` (Title + Title Type), `HEADINGS` | `image-collage.js`: { buildHeading } |
| [`decorators/image-decorator.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/image-decorator.js) | `pictureOf` (image with its alt text field) | `image-collage.js`: { pictureOf } |
| [`utils/cells.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/cells.js) | `itemRows`, `KEY_VALUE_ITEM`, `FIELD_ROW_ITEM` (the item rows of a block: by model in the editor, by their cells on the page), `withoutTabCells` (drops the empty cell AEM renders for each dialog tab of an item model), `m | `image-collage.js`: { KEY_VALUE_ITEM, itemRows } |
| [`utils/links.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/links.js) | `NEW_WINDOW`, `linkOf`, `linkPathsOf` (the paths of a page property, one or many), `readLinkItems` (CTA lists with Link Type and the items' other select values), `readLinkRows` (the same from link item rows, e.g. Hero CT | `image-collage.js`: { NEW_WINDOW, linkOf } |
| [`utils/placeholders.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `image-collage.js`: { getPlaceholders } |
| [`utils/properties.js`](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `image-collage.js`: { isOn, isOnByDefault, optionOf as option, readProperties, textOf, } |

<!-- END GENERATED: files -->

- **JavaScript (`image-collage.js`):** an async `decorate(block)`. It reads the rows with `readProperties`, finds the Collage image items with `itemRows(block, ['image-collage-item'], KEY_VALUE_ITEM)` (by model in Universal Editor, by their cells on the page), loads the placeholders, then builds the media layer, the content and the editor placeholders and replaces the block's children.
- **CSS (`image-collage.css`):** the dark block and its overlay (`::before`), the content column, the nine image slots and their float animation, the CTA styles, and the three breakpoints.
- **Input DOM:** key-value rows `<div><div>name</div><div>value</div></div>`, then one row per Collage image item with three cells (the dialog tab, the image with its alt text, the treatment).
- **Rendered DOM:**

```html
<div class="image-collage block title-semibold">
  <div class="image-collage-media" aria-hidden="true">
    <div class="image-collage-item image-collage-item-1 image-black-white"><picture>…</picture></div>
    …
  </div>
  <div class="image-collage-content">
    <div class="image-collage-intro">
      <div class="image-collage-heading-row"><h2 class="image-collage-title">…</h2></div>
      <div class="image-collage-description">…</div>
    </div>
    <div class="image-collage-links">
      <a class="button primary image-collage-cta">…</a>
      <a class="button secondary image-collage-cta">…</a>
    </div>
  </div>
</div>
```

- **Block classes set by the code:** the Style options (`title-regular`, `title-semibold`, `text-regular`, `text-large`, `bg-navy`), removed first and re-added on each decoration.
- **Events and async behavior:** one `getPlaceholders()` request (cached per page).
- **Error handling:** no try / catch; missing cells give empty parts, items without an image aren't shown.
- **Editor:** `moveInstrumentation`, `fromCell` and `buildHeading` keep Universal Editor's instrumentation on the rendered elements; items not shown become placeholders (`buildEditorItems`).
- **Motion:** `decorators/motion-decorator.js` animates the content column (`'image-collage': { targets: ':scope > .image-collage-content' }`) and treats the media layer as the background (`BACKGROUNDS['image-collage']`).

## Extending the Block

1. Add a field in `_image-collage.json` (at most three short tabs, Additional last), then run `npm run build:json` and `npm run lint`.
2. Follow the AEM delivery rules (field collapse, no grouped fields, `classes_*` for classes, no sample content in the template).
3. Read it in `image-collage.js` and style it in `image-collage.css`, scoped to `.image-collage`, with rem sizes.
4. Run `npm run build:modules` after changing imports and `npm run build:docs` after changing the model.

## Responsive Behavior

- **Mobile (< 600px):** the images keep their positions in a fixed 64rem square composition, centred and cropped at the sides; title 2rem; CTAs 3.125rem high with 0.75rem text.
- **Tablet (600px to 1199px):** the block is at least 46.875rem high; title 2.5rem; CTAs 3rem high with 0.875rem text.
- **Desktop (1200px and above):** the images are placed in percentages of the block; title 3rem; CTAs 3rem high with 1rem text.

## Accessibility

- The images are in an `aria-hidden` layer: only the text and the CTAs are announced.
- The title is a real heading of the authored level; Title hidden keeps it for screen readers.
- CTAs opening a new tab announce it (`opensInNewTab` placeholder, `announceNewTab` through `decorateButton`).
- The floating motion stops with `prefers-reduced-motion: reduce`.
- Check the contrast of the description (`#9e9fa3`-like grey on the dark background) and of any colour images behind the text.

## Data Layer and Analytics

The block is a component entry of the Adobe Client Data Layer like every block (`decorators/data-layer-decorator.js`); clicks on its CTAs are captured centrally. The block pushes nothing itself.

## Performance Considerations

- Up to nine images per block: keep them small (they are shown at most a few hundred pixels wide) and use AEM Assets renditions.
- In the first section the block can hold the Largest Contentful Paint; prefer it below the fold.
- The float animation runs on `transform` only and stops with reduced motion.

## Security and Privacy

Authored content only. No external HTML is injected, no personal data is read or pushed to the data layer.

## For Architects

- **Role:** a presentational, authored-content block with item children; no data source.
- **Overlap:** the Teaser's Image collage layout covers the same design; decision KB-D-063 (Proposed) records whether both stay.
- **Dependencies:** `decorators/a11y-decorator.js`, `button-decorator.js`, `content-decorator.js`, `editor-item-decorator.js`, `heading-decorator.js`, `image-decorator.js`; `utils/cells.js`, `links.js`, `placeholders.js`, `properties.js`.
- **Performance:** one cached placeholders request; images are lazy unless the block is in the first section.

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| No images on the page | Items without an image, or images not published | Inspect `.image-collage-media` | Select the images and publish them with the page | The media layer has items |
| An image is missing | More than nine items | Count the items | Remove the extra items | Nine images |

## Known limitations of the block

- At most nine images; the slot positions are fixed by the design.
- The images are decorative only (`aria-hidden`); their alt text isn't announced.
- The Teaser's Layout Image collage offers the same design (KB-D-063, Proposed).
- The colours are fixed values of the design (`--image-collage-*` custom properties), not the site's semantic tokens, so a dark Section's theme contract doesn't change them.

## Change history of the block

| Version | Change | Source | Date |
| ------- | ------ | ------ | ---- |
| Not recorded | New block (model, code and README) | Repository | 29 October 2026 |

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
| Variations | IMAGE-COLLAGE-VARIATIONS.md |
| Responsive behaviour | Responsive Behavior |
| Accessibility and keyboard | Accessibility |
| Analytics / data layer | Data Layer and Analytics |
| Performance | Performance Considerations |
| Security | Security and Privacy |
| Extending | Extending the Block |
| Known limitations | Known Limitations |
| Troubleshooting | Troubleshooting |
| Tests | IMAGE-COLLAGE-TEST-COVERAGE.md |
| SEO behaviour | Not recorded |
| Caching considerations | Not recorded (Edge Delivery default caching; no block-specific rule) |
| Ownership | Technical Lead / Block Owner (proposed) |

## Screenshots

> **Screenshot required**
>
> - Required screen: Image Collage on its block library page
> - Required role/access: none (published page)
> - Required navigation steps: Open https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/image-collage
> - Reason unavailable: No block library page of this block was found under /design-block-master/en/block-library
> - Owner: Content Lead / AEM Authoring Lead (proposed)
> - Target completion date: To be confirmed

## Known limitations

- Universal Editor dialogs were not captured: no author access in this program (see the access blockers).

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
