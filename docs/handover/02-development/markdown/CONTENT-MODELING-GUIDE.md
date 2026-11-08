---
id: "DEV-006"
title: "Content Modeling Guide"
role: "Development"
topic: ""
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["AGENTS.md","docs/handover/knowledge-base/universal-editor.md","docs/handover/knowledge-base/blocks.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Content Modeling Guide

| Attribute | Value |
| --- | --- |
| Document ID | DEV-006 |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | How blocks are modelled for authors and what AEM really delivers |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | AGENTS.md, docs/handover/knowledge-base/universal-editor.md, docs/handover/knowledge-base/blocks.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [AEM delivery rules](#aem-delivery-rules)
- [Field and Property Naming](#field-and-property-naming)
- [Defaults and the Template-Value Rule](#defaults-and-the-template-value-rule)
- [Multifields and Item Children](#multifields-and-item-children)
- [Container-Child Models](#container-child-models)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## AEM delivery rules

The rules below are verified on aem.page (block audit of 19 October 2026) and in AGENTS.md; code and the local preview must assume what AEM really delivers.

**AEM delivery rules (verified on aem.page, block audit of 19 October 2026, docs/audit/ on the branch migrated-page-content-edam).** Code and the local preview must assume what AEM really delivers:
- A block that isn't key-value gets an **empty row for each dialog tab** of its model (Form Variations, Table, Accordion, Hero, Embed, Fragment, Modal): read rows by `data-aue-prop` in the editor, else skip empty tab rows, never "the first row".
- An item row whose model has a `classes` field starts with a cell **"&lt;node name&gt;, &lt;classes&gt;"** (e.g. `email, field-text`); a `name` field is the item node's name, not a cell.
- In key-value blocks, **grouped fields** (`prefix_name`) aren't delivered: use plain names (Video `poster` / `posterAlt`).
- Fields ending in Text, Title, Type, Alt or MimeType **collapse** into their base field (`linkType` becomes bold / italic around the link): use another name (`buttonVariant`) for a value that must be read.
- The built-in Columns component delivers no `classes_*` (no Additional tab); the built-in Button, Title, Image and Text deliver only their fixed fields.
- **Sections don't get their `classes_*` fields delivered** (only `style`, as classes, and the other fields as data attributes): the container sections' Additional tab fields are `container*` (`containerAnchor`, `containerHide`, `containerAnimation`, `containerAnimationSpeed`, `containerAnimationTrigger`, `containerPadding*`, `containerMargin*`), which `scripts.js` `applySectionBlockOptions` turns into the synthetic block's classes.
- New components get their **definition template values** stored (a sample text in a template appears on every new item): no sample content in templates or model defaults.
- A non-image reference (a Lottie `.json`, a PDF) is delivered as a link whose **text is its Alt** (no title): read it with `animationLabel` (`utils/media.js`).
- An item's `name` property is delivered in **class-name form** (`firstName` -> `firstname`): a value whose case matters needs its own field (Form Variations `fieldName`).
- **DAM files other than images** (Lottie JSON, videos, captions) are served only once published: images travel with the page, other assets don't.
- `decorateBlock` wraps the text of a block's cells (`wrapTextNodes`): decorate a synthetic block while it is empty, and don't test cells for bare text after decoration.
The library preview (`.home-work/render-lib.mjs`) reproduces these rules; compare aem.page with the local preview after model changes.



## Field and Property Naming

The naming rules follow what AEM delivers, verified on aem.page in the block audit of 19 October 2026 ([AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks), "AEM delivery rules"):

| Rule | Effect | Convention | Example |
| --- | --- | --- | --- |
| Field collapse | Fields ending in `Text`, `Title`, `Type`, `Alt` or `MimeType` fold into their base field (`linkText` is the link's text, `imageAlt` the image's alt, `linkType` becomes bold / italic around the link) | Use the suffix only to fold; for a value that must be read, use another name | `buttonVariant` (not `buttonType`); `posterAlt` folds into `poster` |
| Element grouping | `<group>_<field>` fields render in one cell in row-per-field blocks; **in key-value blocks grouped fields aren't delivered** | Plain names in key-value blocks | Video `poster` / `posterAlt` (was `placeholder_image`, lost: audit L-2); Hero `content_*` (row-per-field block) |
| Block options | A field named `classes` or `classes_<name>` arrives as block classes, never as a content row | Presentation options and the Additional tab | `classes_anchor`, `classes_paddingtop`, Teaser `classes` |
| Section fields | **Sections don't get their `classes_*` fields delivered**: only `style` (as classes) and other fields as data attributes | Section containers use `container*` names, turned into classes by `applySectionBlockOptions` (`scripts/scripts.js`) | `containerAnchor`, `containerHide`, `containerAnimation`, `containerPaddingTop` (re-audit R-L-1) |
| Item node name | An item's `name` property is delivered in class-name form, and an item model with `classes` starts with a cell `<node name>, <classes>` | A value whose case matters gets its own field | Form Variations `fieldName` (re-audit R-D-1); first cell `email, field-text` |
| Non-image references | A Lottie `.json` or PDF reference is delivered as a link whose text is its Alt | Read it with `animationLabel` (`utils/media.js`) | Hero / Teaser Lottie alt (re-audit R-B-3) |
| Built-in components | Built-in Button, Title, Image and Text deliver only their fixed fields; built-in Columns no `classes_*` | Don't add fields to built-in models | Button (basic), Columns Additional tab removed |
| Field name syntax | Letters, digits, `_`, `-`, `:`; starts with a letter; at most one `_` and one `:` | `xwalk/invalid-field-name` | `classes_animationspeed`, `jcr:title` |

Property naming habits in the models: camelCase names (`showEyebrow`, `desktopColumns`); `show*` booleans for optional parts; `*Alt` next to each image; `titleType` next to `title`; Additional tab names are lower case after the prefix (`classes_paddingleft`), container names camelCase (`containerPaddingLeft`).

## Defaults and the Template-Value Rule

- **Template values are stored.** New components get their definition template values written to the content, so a sample text in a template appears on every new item: no sample content in templates or model defaults. Use them only for settings (`buttonView: button`, `titleType: h2`, `desktopMode: grid`).
- Corrected cases (re-audit): Table List "Explore" (R-A-6), Tab title "Tab" (R-C-10), Accordion Item Lorem Ipsum (R-C-11), Table rows "Column1" (R-D-9). Retained exceptions: the Submit Button `label` "Send" (template value; localised by translation only, re-audit review D, low) and the TCS Header logo alt defaults ("Tata Consultancy Services", "TATA Group").
- **Model `value`** (672 fields) is the dialog default; keep it equal to the code's default so an empty value and the default render the same (Hero CTA Arrow default corrected to Auto in the audit).
- UI text that isn't authored content comes from placeholders (`utils/placeholders.js`), never from defaults.

## Multifields and Item Children

| Approach | Status | Rule |
| --- | --- | --- |
| Item children (components added with Add, own model, in the container's filter) | Standard | All repeating content: List Items, Cards, CTAs, Teaser Links and Stats, Testimonial Stats, Anchor Links, Filter List tags / categories / pages, Footer Links, form fields, Table rows, Tabs items, Canvas buttons |
| Composite multifields (`container` with `multi: true`) | Compatibility-only | They didn't render from content packages; the 12 remaining ones are labelled "authored before" and still read (`readMultifieldItems` in `utils/multifield.js`, `readLinkItems` in `utils/links.js`, `buildStats` in `decorators/stats-decorator.js`) |
| `multi: true` on simple fields | Used | `aem-tag` (tags) and Page Keywords; Universal Editor doesn't save `multi: true` on `aem-content` fields |
| Non-multi `container` | Used | Collapsible groups in the Conversation Canvas dialog (`menu`, `searchBar`) |

The audit recommends removing the legacy multifields after confirming that no production content uses them (deferral D-B-14, blocked: production content check).

## Container-Child Models

- An item model is a `core/franklin/components/block/v1/block/item` definition with its own model, listed in the container's filter; it has no folder and is documented in its container's README.
- AEM renders each item as a row after the block's own rows, one cell per field (empty and tab cells included); an item model with a `classes` field starts with a `<node name>, <classes>` cell (form items: `classes` is a read-only Field type).
- `itemRows(block, models, isItem)` in `utils/cells.js` finds the item rows: by `data-aue-model` in Universal Editor, else by the cell count (`KEY_VALUE_ITEM` for key-value blocks: 1 or 3+ cells, so a two-field item starts with a tab; `FIELD_ROW_ITEM` for row-per-field blocks: 2+ cells), tested in `test/items/item-rows.test.mjs`.
- An item without content yet (just added) is a placeholder in the editor (`decorators/editor-item-decorator.js`, placeholder key `itemEditorHint`) and is left out on the page.
- `xwalk/max-cells` limits the cells of non key-value models; the item models that need more cells have their own limits in `.eslintrc.js`.

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
