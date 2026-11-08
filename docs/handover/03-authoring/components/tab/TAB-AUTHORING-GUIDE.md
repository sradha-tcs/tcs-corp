---
id: "AUT-C-tab"
title: "Tab — Authoring Guide"
role: "Authoring"
topic: "component authoring"
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/tab/README.md","blocks/tab/_tab.json"]
relatedComponents: ["tab"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Tab — Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-C-tab |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | How to add, fill in and check the Tab component |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/tab/README.md, blocks/tab/_tab.json |
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

1. Select a [Tabs Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tabs/README.md) in the content tree, choose Add (+) and pick **Tab** (the Tab is offered only there).
2. Open the Tab's properties. In **Content**, enter the **Title** (required: the tab label).
3. Optionally enter an **ID** (lower-case letters, digits and hyphens, e.g. `cloud`): links to `#cloud` open the tab. Leave it empty for an id made from the Tabs Container's Anchor name (`{anchor}-item-{n}`).
4. Turn on **Active tab** on the one tab that should be shown when the page loads (none: the first tab).
5. If the tab's content has [Column Breaks](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md), choose **Columns per row** (Automatic, 1, 2, 3, 4).
6. After the Tab, add the tab's components. Add the next Tab after them.
7. To move a tab, move the Tab and its components together; to remove a tab from the page temporarily, turn on **Hide block** in the **Additional** tab.
8. Preview: click the tab in the tab list; publish the page; on the published page check the label, the content and links to the ID.

**Minimum required:** Title. **Recommended:** an ID on tabs that are linked to. **Optional:** Active tab, Columns per row, Hide block.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

#### Tab (`tab`)

Model `tab`; template name "Tab" (the block class AEM renders); key-value block (one row per property).

##### Content tab — Tab

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Title | `title` | text | Yes | — | — | The label of the tab. The components after this Tab, up to the next Tab, are its content. | Consulting |
| ID | `tabId` | text | No | — | regExp: ^#?[a-z0-9][a-z0-9-]*$; customErrorMsg: Lower-case letters, digits and hyphens, e.g. overview. | Links to #ID open this tab (deep link), e.g. overview (lowercase, no spaces). Leave empty for an id from the Tabs ID. | consulting |
| Active tab | `activeTab` | boolean | No | — | on / off | Shows this tab when the page loads (the first tab if no tab is active). | true |
| Columns per row | `classes_perrow` | select | No | "" | Automatic (""), 1 (`per-row-1`), 2 (`per-row-2`), 3 (`per-row-3`), 4 (`per-row-4`) | When the tab's content has Column Breaks: how many columns sit side by side (Automatic: as many as there are Column Breaks, at most 4). Delivered as a block class. | per-row-2 |

##### Additional tab — Tab

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the tab and its content on the page (shown dimmed in the editor). Delivered as a block class. | — |

<!-- END GENERATED: fields -->

Notes on the fields:

- **Title** (`title`): the tab button's text and the `dc:title` of the panel in the data layer; empty: "Tab {n}" (placeholder `tabNumber`, applied by the Tabs). Changing it in the editor updates the tab button at once (`tabs:tab-update`).
- **ID** (`tabId`): normalized with `toClassName` and used as the panel's `id` and `data-tab-id`; an id already on the page gets `-2`, `-3`. A link to `#id` (or the Anchor List) opens the tab and scrolls to it.
- **Active tab** (`activeTab`): only the value `true` counts; with several active Tabs the first wins; a `#hash` naming another tab wins over it.
- **Columns per row** (`classes_perrow`, block class `per-row-1` to `per-row-4`): applied to the columns the Tabs build from the tab's Column Breaks; Automatic: as many as there are Column Breaks, at most 4. No effect without Column Breaks.
- **Hide block** (`classes_hideblock`): the Additional tab has only this field (see AGENTS.md "Additional tab" for its general behavior). On a Tab it hides the tab button and its whole content on the page; in edit mode the tab stays and its chip is dimmed.
- **Legacy mapping:** `readTab` reads key-value rows (`title`, `tabid`, `activetab`) and, if none, one row per field in dialog order (the last cell of each row).
- **Template:** a new Tab stores no Title (the definition template has none), so an untouched Tab is labelled "Tab {n}".

## Screenshot-Based Authoring Steps

#### Authoring Step 1: Add a Tab

```text
[Screenshot Placeholder]

File name:
tab-authoring-step-1.png

Purpose:
The Add (+) menu of a selected Tabs Container with Tab highlighted, and the new Tab's dashed chip in the panel.

Annotations:
A = Tabs Container selected in the content tree
B = Tab in the component list
C = New Tab chip
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Content tree | Tabs Container | The Tab is offered only in a Tabs Container | Add (+) lists Tab |
| B | Add (+) | Tab | Starts a new tab | A new tab button "Tab {n}" until a Title is entered |

Author action: select the Tabs Container, add a Tab. Expected preview: a new tab button and, in edit mode, the chip. Published: the tab button. Business rule: the Tab is the first item of its tab. Validation: the new tab appears in the tab list. Common mistake: adding the components before the Tab; resolution: move them after it.

#### Authoring Step 2: Enter Title and ID

```text
[Screenshot Placeholder]

File name:
tab-authoring-step-2.png

Purpose:
The Tab's Content tab with Title Consulting and ID consulting entered.

Annotations:
A = Title
B = ID
C = Tab button updated with the Title
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Title | Consulting | The tab label | Tab button "Consulting" |
| B | ID | consulting | Deep links (`#consulting`) | Panel id `consulting` |

Author action: enter the Title and ID. Expected preview: the label updates at once; the ID applies after the container is rendered again (reload the editor). Published: `page#consulting` opens the tab. Business rule: IDs are lower case with hyphens (validated). Validation: inspect the panel id or follow the link. Common mistake: `#My Tab` in links; resolution: use the exact ID.

#### Authoring Step 3: Choose the tab shown first

```text
[Screenshot Placeholder]

File name:
tab-authoring-step-3.png

Purpose:
Active tab turned on for the Cloud Tab, and the page loaded with Cloud selected.

Annotations:
A = Active tab toggle
B = Cloud selected on load
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Active tab | On | Show Cloud first | Cloud selected on load |

Author action: turn on Active tab on one Tab only. Expected preview: after a reload, the tab is selected. Published: selected on a fresh load (without a `#hash`). Business rule: the first active Tab wins; the editor keeps the tab shown before a re-render. Validation: load the page without a hash. Common mistake: several Tabs active; resolution: leave one.

#### Authoring Step 4: Lay out the tab in columns

```text
[Screenshot Placeholder]

File name:
tab-authoring-step-4.png

Purpose:
Columns per row 2 on the Tab, with two Column Breaks after it, and the resulting two columns.

Annotations:
A = Columns per row
B = First Column Break
C = Second Column Break
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Columns per row | 2 | Two columns side by side | `per-row-2` on the columns in the panel |
| B / C | Column name (Column Break) | Image / Text | Editor labels | Labels in edit mode only |

Author action: set Columns per row, add Column Breaks and their components after the Tab. Expected preview: two columns from 900px (after a reload for a changed Columns per row). Published: the same. Business rule: content between the Tab and the first Column Break stays above the columns. Validation: check at desktop and mobile widths. Common mistake: expecting Columns per row without Column Breaks to do anything; resolution: add Column Breaks.

## Variations

#### Standard Tab

Title only (ID empty, Active tab off). Renders a tab button with the Title; the panel id is `{base}-item-{n}`. Use it for tabs nobody links to.

```text
[Screenshot Placeholder]

File name:
tab-standard-mobile.png

Purpose:
A standard Tab at mobile width: its tab button in the scrolling tab list and its panel content stacked.

Annotations:
A = Tab button
B = Panel content
```

#### Active Tab

Active tab on: the tab shown when the page loads (unless a `#hash` or an editor re-render chooses another). Use it on one Tab at most.

#### Tab with ID (deep link)

ID set: the panel's id is the ID, so `#id` links and Anchor List links open the tab and scroll to it below the fixed header. Keep IDs identical across locales.

#### Tab with columns (Columns per row)

With Column Breaks in its content, the tab's content from the first Column Break is laid out by a Columns Container block in the panel with the chosen Columns per row; gap medium, top alignment, side by side from 900px. See [Column Break](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md).

#### Hidden Tab (Hide block)

Hide block on: the tab and its content are left out of the page (the group is dropped when not in edit mode); in edit mode the tab stays and its chip is dimmed, so the author can turn it off again.

## Complete Authoring Example

Scenario: the Cloud tab of a services Tabs Container, linked from an email and shown first, with an image and a text side by side.

| Field | Example value | Guidance |
|---|---|---|
| Title | Cloud | 1 to 3 words, unique in the Tabs |
| ID | cloud | Lower case; the same in every locale |
| Active tab | On | Only this Tab |
| Columns per row | 2 | With two Column Breaks after the Tab |
| Hide block | Off | — |

Steps: add the Tab after the Consulting tab's content (Step 1), enter Title and ID (Step 2), turn on Active tab (Step 3), add a Title "Cloud migration and operations", then Column Break, Image (with alt text), Column Break, Text (Step 4).

Expected output: the tab button "Cloud" selected on load; `#cloud` opens it. Responsive: the two columns stack below 900px. Accessibility: the button is a `role="tab"` named "Cloud", its panel labelled by it. Analytics: the panel is a `tcs-corp/components/tabs/item` named "Cloud"; showing it later pushes `cmp:show`. Personalization fallback: none.

Pre-publish checklist: Title entered; ID unique and used exactly in links; one Active tab in the container; the components sit after the Tab and before the next one.

## Content and Asset Guidelines

- **Title:** short and descriptive (the handover recommends 1 to 3 words, about 25 characters); avoid "Tab 1" style labels; translate per locale.
- **ID:** lower-case letters, digits and hyphens (validated `^#?[a-z0-9][a-z0-9-]*$`); unique on the page.
- **Content:** start the tab's content with a heading that repeats or extends the Title.
- **Images, icons, CTAs, tags:** none on the Tab itself (they belong to the components after it).
- **Min / max:** no verified technical limit was identified.

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
|---|---|---|---|---|
| Label "Tab 2" instead of the Title | Empty Title, or content before the first Tab | Select the Tab; check the tree order | Enter the Title; move stray components | Labels are the Titles |
| Chip visible on the page | The Tab isn't in a Tabs Container | Check the section for `tabs-section` | Move or delete the Tab | No chip |
| ID doesn't work in links | Normalized or de-duplicated id | Inspect the panel id | Use the exact ID | Link opens the tab |
| Active tab ignored | Another active Tab, a `#hash`, or the editor keeps the shown tab | Load without hash; check all Tabs | One Active tab; reload | Correct tab on load |
| ID, Active, Columns per row or Hide block change has no effect in the editor | Applied when the container is rendered again (R-C-7) | Reload the editor | Reload | Applied |
| Component in the wrong tab | Its position in the tree | Check the tree order | Move it after its Tab | Correct panel |

Evidence to collect: page URL, the Tab's data attributes (`data-tab-*`) and classes, the panel ids.

## Screenshots

> **Screenshot required**
>
> - Required screen: Tab dialog in Universal Editor (every tab, including Additional)
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
