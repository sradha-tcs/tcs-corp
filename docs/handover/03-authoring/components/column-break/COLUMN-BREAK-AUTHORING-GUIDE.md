---
id: "AUT-C-column-break"
title: "Column Break — Authoring Guide"
role: "Authoring"
topic: "component authoring"
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/column-break/README.md","blocks/column-break/_column-break.json"]
relatedComponents: ["column-break"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Column Break — Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-C-column-break |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | How to add, fill in and check the Column Break component |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/column-break/README.md, blocks/column-break/_column-break.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Where to see it](#where-to-see-it)
- [For Content Authors](#for-content-authors)
- [Authorable Fields](#authorable-fields)
- [Screenshot-Based Authoring Steps](#screenshot-based-authoring-steps)
- [Variations](#variations)
- [Complete Authoring Example](#complete-authoring-example)
- [Content and Asset Guidelines](#content-and-asset-guidelines)
- [Troubleshooting](#troubleshooting)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Where to see it

No block library page.

## For Content Authors

1. Select a **Columns Container** (or a **Tabs Container**, after a Tab) in the content tree, choose Add (+) and pick **Column Break**.
2. Add the components of the column after it.
3. Add the next Column Break, then that column's components, and so on.
4. Optionally open the Column Break's properties: in **Content** enter a **Column name** (shown in the editor only); in **Additional** set the column's **Anchor ID**, **Hide block** and **Padding / Margin**.
5. To move a column, move its Column Break together with its components.
6. Preview the page at desktop and mobile widths; publish; on the published page check that no label is visible and the columns are as expected.

**Minimum required:** none of its fields; the Column Break itself, followed by the column's components. **Recommended:** a Column name per column on pages with several columns. **Optional:** the Additional tab.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

#### Column Break (`column-break`)

Model `column-break`; template name "Column Break" (the block class AEM renders); key-value block (one row per property).

##### Content tab — Column Break

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Column name | `title` | text | No | — | — | Shown in the editor only, to tell the columns apart (e.g. Contact details). Not shown on the page. | Grey Teaser |

##### Additional tab — Column Break

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Padding left | `classes_paddingleft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | Delivered as a block class. | — |
| Padding right | `classes_paddingright` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | Delivered as a block class. | — |
| Padding top | `classes_paddingtop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | Delivered as a block class. | — |
| Padding bottom | `classes_paddingbottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | Delivered as a block class. | — |
| Margin left | `classes_marginleft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | Delivered as a block class. | — |
| Margin right | `classes_marginright` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | Delivered as a block class. | — |
| Margin top | `classes_margintop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | Delivered as a block class. | — |
| Margin bottom | `classes_marginbottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | Delivered as a block class. | — |

<!-- END GENERATED: fields -->

Notes on the fields:

- **Column name** (`title`): the label in edit mode; empty: "Column {n}" (placeholder `columnLabel`, n = the column's position). Not on the page, not in the data layer.
- **Anchor ID** (`classes_anchor`): the id moves from the Column Break to its column, so `#anchor-…` links jump to the column.
- **Hide block** (`classes_hideblock`): copied to the column: the column is hidden on the page and dimmed in edit mode.
- **Padding / Margin** (`classes_padding*`, `classes_margin*`): copied to the column (`pl-400`, `mt-800`, …; `styles/styles.css` applies them to `.columns-container-column`).
- **Additional tab:** see AGENTS.md "Additional tab"; the Column Break has no animation fields (the container's Animation Type moves the columns).
- **Legacy mapping:** items authored when this item was named "Column" are rendered with the class `column`; in a Columns Container section they are read as Column Breaks. `readColumn` reads a key-value `title` row, else the last cell of the first row.

## Screenshot-Based Authoring Steps

#### Authoring Step 1: Add the first Column Break

```text
[Screenshot Placeholder]

File name:
column-break-authoring-step-1.png

Purpose:
A Columns Container selected in the content tree, Add (+) open with Column Break highlighted.

Annotations:
A = Columns Container in the tree
B = Column Break in the list
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| B | Add (+) | Column Break | Starts the first column | An outlined column with the hint "Add the components of this column after it." |

Author action: add the Column Break. Expected preview: an empty outlined column (edit mode). Published: nothing until it has content. Business rule: it is the first item of its column. Common mistake: adding the column's components before it; resolution: move them after it.

#### Authoring Step 2: Name the column and add its content

```text
[Screenshot Placeholder]

File name:
column-break-authoring-step-2.png

Purpose:
The Column Break's Content tab with Column name entered, and a Teaser added after it.

Annotations:
A = Column name
B = Label in the canvas
C = Component after the Column Break
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Column name | Grey Teaser | Tells the columns apart in the editor | Label "Grey Teaser" (edit mode only) |
| C | Component after it | Teaser | The column's content | Teaser in the column |

Author action: enter the name; add the components after the Column Break. Expected preview: the label and the content in the column. Published: the content only. Common mistake: expecting the name on the page; it is an editor label only.

#### Authoring Step 3: Add the next column

```text
[Screenshot Placeholder]

File name:
column-break-authoring-step-3.png

Purpose:
The content tree with two Column Breaks, each followed by its components, and the two columns side by side.

Annotations:
A = Second Column Break
B = Its components
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Column name | Contact details | Second column | Label "Contact details" |
| B | Components | Title, Text | Its content | Shown in column 2 |

Author action: add a Column Break after the first column's content, then its components. Expected preview and published result: two columns (side by side from the container's breakpoint, 900px by default). Common mistake: a component dragged above the second Column Break ends in the first column; resolution: check the tree order.

#### Authoring Step 4: Column options

```text
[Screenshot Placeholder]

File name:
column-break-authoring-step-4.png

Purpose:
The Column Break's Additional tab with Anchor ID anchor-contact and Padding top 1rem (space-400).

Annotations:
A = Anchor ID
B = Hide block
C = Padding top
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Anchor ID | anchor-contact | Links to the column | The column has `id="anchor-contact"` |
| C | Padding top | 1rem (space-400) | Space above the column's content | Class `pt-400` on the column |

Author action: set the options. Expected preview: applied after the section is rendered again (reload the editor; re-audit R-C-7). Published: applied. Common mistake: an Anchor ID without the `anchor-` prefix (rejected by the validation).

## Variations

#### Named or unnamed Column Break

With a Column name the editor label is the name; without, "Column {n}". No difference on the page.

#### In a Columns Container

The Columns Container's Layout (Columns per row, Gap, Vertical alignment, Side by side from) applies to the columns. See [Columns Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md#variations).

#### In a tab of a Tabs Container

After a [Tab](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tab/README.md), Column Breaks lay the tab's content out in columns with the Tab's Columns per row; content between the Tab and the first Column Break stays above the columns. Gap medium, top alignment, side by side from 900px.

```text
[Screenshot Placeholder]

File name:
column-break-in-tab-desktop.png

Purpose:
A tab with a heading and two Column Breaks: the heading above, two columns below.

Annotations:
A = Heading before the first Column Break
B = Two columns
```

#### Column options (Additional tab)

Anchor ID, Hide block and spacing apply to the column, not to the hidden Column Break.

## Complete Authoring Example

Scenario: the second column of an "Our offices" Columns Container holds the contact details and is linked from the page's Anchor List.

| Field | Example value | Guidance |
|---|---|---|
| Column name | Contact details | Editor label only |
| Anchor ID | anchor-contact | Starts with `anchor-`; unique on the page |
| Hide block | Off | — |
| Padding top | 1rem (space-400) | Optional |
| Components after it | Title "Contact us", Text with the address | Start with a heading |

Steps: Authoring Steps 1 to 4. Expected output: a column with the heading and address, `id="anchor-contact"`; an Anchor List link to `#anchor-contact` jumps to it (and opens its tab if the columns are in a tab). Responsive: stacked below the container's breakpoint. Accessibility: the column's heading follows the page's heading order. Analytics: the Column Break isn't tracked; the components are. Personalization fallback: none.

Pre-publish checklist: every column starts with a Column Break; the Anchor ID is unique; nothing sits between a Column Break and the wrong components.

## Content and Asset Guidelines

- **Column name:** a short label for authors (e.g. "Contact details"); not translated for visitors (not shown).
- **Anchor ID:** `anchor-` followed by lower-case letters, digits and hyphens (validated).
- **Content:** whatever the parent allows; start a column with a heading when it is its own topic.
- **Images, CTAs, tags:** none on the Column Break.
- **Min / max:** no verified technical limit was identified; the container shows at most 4 columns per row.

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
|---|---|---|---|---|
| No columns | The Column Break is in a normal Section | Check the section class | Use a Columns Container | Columns appear |
| Label visible on the page | Edit mode (`html.adobe-ue-edit`) or CSS not loaded | Check the published page | — | Hidden on the page |
| Option changes not shown in the editor | Applied when the section is rendered again (R-C-7) | Reload | Reload | Applied |
| Content in the wrong column | Its position in the tree | Check the tree order | Move it after its Column Break | Correct column |
| Anchor link doesn't jump | Anchor ID taken (suffix `-2`) or mistyped | Inspect the column id | Use a unique ID | Link jumps |

Evidence to collect: page URL, the column's classes and id, the Column Break's `data-column-title`.

## Screenshots

> **Screenshot required**
>
> - Required screen: Column Break dialog in Universal Editor (every tab, including Additional)
> - Required role/access: AEM Sites author with Universal Editor (content author)
> - Required navigation steps: AEM Sites console > /content/tcs-corp/language-masters/en > open a page in Universal Editor
> - Reason unavailable: No AEM author access in the documentation program (access blocker AB-01)
> - Owner: Content Lead / AEM Authoring Lead (proposed)
> - Target completion date: To be confirmed

## Known limitations

- Universal Editor screenshots are placeholders: no author access in this program.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
