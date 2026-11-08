---
id: "AUT-C-button-block"
title: "Button — Authoring Guide"
role: "Authoring"
topic: "component authoring"
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/button-block/README.md","blocks/button-block/_button-block.json"]
relatedComponents: ["button-block"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Button — Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-C-button-block |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | How to add, fill in and check the Button component |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/button-block/README.md, blocks/button-block/_button-block.json |
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

1. **Add the block.** Select a Section, a Columns Container column or a Tabs Container tab, choose
   Add (+) and pick **Button**.
2. **Open its properties.** Select the block; the panel has the **Content**, **Style** and
   **Additional** tabs.
3. **Enter the content (Content tab).** Pick the page or asset, or enter a URL, in **Link**; write
   the label in **Text** (the accessible name of an icon button); add a **Title** only for extra
   context (a tooltip).
4. **Choose the look (Style tab).** **View**: Button, Icon or Link. **Type** (Button and Icon
   views): Primary, Secondary or Tertiary. **Icon** (Icon view): Arrow right, Chevron right, Chevron
   down or Search. **Alignment**: Left, Center or Right.
5. **Optional: Additional tab** (Anchor ID, Hide block, animation, spacing).
6. **Preview** at desktop, tablet and mobile widths; check the label isn't clipped.
7. **Publish** the page; publish the target page too.
8. **Validate the published output:** the button has the chosen look and opens the target.

**Minimum required:** Link (without it nothing is shown on the page; in the editor the block says
what to add). **Recommended:** Text. **Optional:** Title, Style tab values, Additional tab.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

#### Button (`button-block`)

Model `button-block`; template name "Button Block" (the block class AEM renders); key-value block (one row per property).

Stored on a new component (definition template): `buttonView` = `"button"`, `buttonVariant` = `"primary"`, `buttonAlignment` = `"left"`.

##### Content tab — Button

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Link | `link` | aem-content | No | — | — | An AEM page, an asset or a URL. | /design-block-master/en/curated-design-pages |
| Text | `linkText` | text | No | — | — | The label of the button (the accessible name of an icon button). Delivered with `link` (field collapse). | Curated design pages |
| Title | `linkTitle` | text | No | — | — | Optional tooltip (most buttons need none). Delivered with `link` (field collapse). | Contact the TCS team |

##### Style tab — Button

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| View | `buttonView` | select | No | `button` | Button (`button`), Icon (`icon`), Link (`link`) | Button, an icon-only button (choose its Icon) or a text link. | button |
| Type | `buttonVariant` | select | No | `primary` | Primary (`primary`), Secondary (`secondary`), Tertiary (`tertiary`) | The emphasis of the Button and Icon views. Shown when `buttonView` is off or empty or `buttonView` is `button` or `buttonView` is `icon`. | secondary |
| Icon | `buttonIcon` | select | No | `arrow-right` | Arrow right (`arrow-right`), Chevron right (`chevron-right`), Chevron down (`chevron-down`), Search (`search`) | The icon of the Icon view; the Text becomes its accessible name. Shown when `buttonView` is `icon`. | search |
| Alignment | `buttonAlignment` | select | No | `left` | Left (`left`), Center (`center`), Right (`right`) | Where the button sits in its section or column. | left |
| Text Decoration | `textDecoration` | select | No | `none` | Default (`none`), Overline (`overline`), line-Through (`line-through`), Underline (`underline`), underline overline (`underline overline`) | The text decoration of the button. | — |

##### Additional tab — Button

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Animation Type | `classes_animation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | — |
| Motion Speed | `classes_animationspeed` | select | No | "" | Medium (""), Fast (`motion-fast`), Slow (`motion-slow`) | How fast the animation runs: 0.3, 0.6 or 0.9 seconds. Shown when `classes_animation` is set and `classes_animation` is not empty. Delivered as a block class. | — |
| Animation Trigger | `classes_animationtrigger` | select | No | "" | On Scroll / Viewport Entry (""), On Page Load (`motion-on-load`) | When the block's animations run. On Scroll: when the block comes into view (at once if it is in view when the page opens). On Page Load: as soon as the block is ready, wherever it is on the page. Shown when `classes_animation` is set and `classes_animation` is not empty. Delivered as a block class. | — |
| Padding left | `classes_paddingleft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | Delivered as a block class. | — |
| Padding right | `classes_paddingright` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | Delivered as a block class. | — |
| Padding top | `classes_paddingtop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | Delivered as a block class. | — |
| Padding bottom | `classes_paddingbottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | Delivered as a block class. | — |
| Margin left | `classes_marginleft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | Delivered as a block class. | — |
| Margin right | `classes_marginright` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | Delivered as a block class. | — |
| Margin top | `classes_margintop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | Delivered as a block class. | — |
| Margin bottom | `classes_marginbottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | Delivered as a block class. | — |

<!-- END GENERATED: fields -->

What the tables don't show:

- **Link / Text / Title** arrive as one link (Text and Title collapse into it): Text is the link's
  label, Title its `title` attribute. The Button and Link views have a tooltip only when Title is
  authored; the Icon view sets the tooltip to its accessible name when Title is empty.
- **View** renders `a.button.{type}` (Button), `a.button.{type}.icon-button` with the icon as a CSS
  mask and the Text hidden in a `span` and used as `aria-label` (Icon), or `a.link-button` (Link;
  Type is ignored and hidden in the dialog).
- **Type** is stored as `buttonVariant`: a field ending in `Type` would collapse into the link.
- **Icon** is read only for the Icon view (default Arrow right); the icon is
  `/icons/{name}.svg`.
- **Alignment** adds `button-align-{value}` to the paragraph around the link (`text-align` start,
  center or end).
- **Accessibility impact:** Text is the accessible name in every view; never leave it empty for the
  Icon view.
- **Data-layer impact:** none of the fields adds tracking attributes; the click is tracked centrally
  on the block.
- **Legacy mapping:** unknown or empty values fall back to the defaults (Button, Primary, Left).
  Buttons authored before with the built-in Button keep working with Primary or Secondary (bold /
  italic); replace one with a Button block to use the other options.
- **Additional tab:** as on every block (AGENTS.md "Additional tab"; Animation Type moves the
  block).

## Screenshot-Based Authoring Steps

#### Authoring Step 1: Add the Button and set the link

```text
[Screenshot Placeholder]

File name:
button-block-authoring-step-1.png

Purpose:
The Button added from the section's Add (+), the Content tab with Link and Text filled.

Annotations:
A = Add (+)
B = Link
C = Text
D = Title
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| B | Link | /language-masters/en/curated-design-pages | The target page | The button links to the page |
| C | Text | Curated design pages | Visible label | The pill shows the label with an arrow |
| D | Title | (empty) | Most buttons need no tooltip | No `title` attribute |

**Author action:** add the Button, pick the page and write the label. **Expected preview:** a black
primary pill, left aligned. **Expected published result:** the same, linking to the published path.
**Business rules:** without a Link nothing is shown. **Validation:** click and keyboard (Tab, Enter)
open the page. **Common mistakes:** the label equals the URL; an unpublished target page.

#### Authoring Step 2: Choose the view and type

```text
[Screenshot Placeholder]

File name:
button-block-authoring-step-2.png

Purpose:
The Style tab with View Button and Type Secondary, and the outlined pill on the canvas.

Annotations:
A = View
B = Type
C = The secondary button
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | View | Button | A pill button | `a.button` |
| B | Type | Secondary | Next to a primary action | Outlined pill |

**Author action:** set View and Type. **Expected result:** the outlined secondary pill.
**Business rules:** one primary per section; Type is hidden for the Link view. **Validation:**
hover shows the brand-blue state. **Common mistakes:** Type missing in the dialog because View is
Link.

#### Authoring Step 3: An icon button

```text
[Screenshot Placeholder]

File name:
button-block-authoring-step-3.png

Purpose:
View Icon with Icon Search, and the round search icon button on the canvas.

Annotations:
A = View
B = Icon
C = Text (the accessible name)
D = The icon button
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | View | Icon | Icon-only button | Round 2.75rem button |
| B | Icon | Search | The action's icon | The search icon |
| C | Text | Search | Accessible name and tooltip | Announced "Search" |

**Author action:** set View Icon, choose the Icon and keep a Text. **Expected result:** a round icon
button with the label hidden on screen. **Business rules:** the Icon field shows only for the Icon
view. **Validation:** a screen reader announces the Text. **Common mistakes:** empty Text (the name
falls back to the Title or the icon name).

#### Authoring Step 4: Align the button

```text
[Screenshot Placeholder]

File name:
button-block-authoring-step-4.png

Purpose:
Alignment Center and the button centred in the section.

Annotations:
A = Alignment
B = The centred button
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Alignment | Center | Centred layout | The button centred in its section or column |

**Author action:** choose the alignment. **Expected result:** `button-align-center` on the paragraph.
**Validation:** check at 390 px too. **Common mistakes:** right-aligning an important action.

## Variations

#### Primary, Secondary, Tertiary (Button view)

- **Purpose:** the emphasis of a call to action; one primary per section.
- **Fields:** Link, Text; View Button; Type.
- **Rendering:** `a.button.primary|secondary|tertiary` with a trailing arrow (`icons/arrow-right.svg`
  as a CSS mask); min height `--button-height` (3.125rem); labels don't wrap (`white-space: nowrap`)
  and are clipped at the container width.
- **Accessibility / data layer:** a link named by its Text; `cmp:click` on click.
- **Fallback:** an unknown Type renders Primary.

#### Icon view

- **Purpose:** compact actions (search, arrow, chevron). **Fields:** Link, Text, View Icon, Icon,
  Type.
- **Rendering:** a round `--icon-button-size` (2.75rem) button; the Text kept in a hidden `span`, as
  `aria-label` and as tooltip.

```text
[Screenshot Placeholder]

File name:
button-block-icon-types-mobile.png

Purpose:
The three icon button types with each of the four icons at 390 px.

Annotations:
A = Primary icon buttons
B = Secondary icon buttons
C = Tertiary icon buttons
```

#### Link view

- **Purpose:** a text call to action ("View all insights"). **Rendering:** `a.link-button`,
  underlined, semibold, with a trailing chevron (`icons/chevron-right.svg`); Type ignored.

#### Alignment Left, Center, Right

- **Rendering:** `p.button-wrapper.button-align-left|center|right` (`text-align` start / center /
  end, so it follows the reading direction).

## Complete Authoring Example

Scenario: the primary call to action of a services section.

| Field | Example value | Guidance |
| ----- | ------------- | -------- |
| Link | /language-masters/en/curated-design-pages | Pick with the picker |
| Text | Contact us | Verb first, short |
| Title | Contact the TCS team | Only extra context |
| View | Button | Default |
| Type | Primary | One per section |
| Alignment | Left | Default |

**Steps:** add the Button after the section's text, fill the Content and Style tabs, preview,
publish.

**Expected output:** a black primary pill "Contact us" with an arrow, left aligned, tooltip
"Contact the TCS team".

**Responsive:** same size at every viewport; check the label fits at 390 px.

**Accessibility:** a link named "Contact us"; visible focus outline.

**Analytics / data layer:** `tcs-corp/components/button-block` (`button-block-1`); a click pushes
`cmp:click` with `interaction` `link`.

**Personalization fallback:** none.

**Pre-publish checklist:**

1. Link set and the target published.
2. Text describes the outcome (not "Click here").
3. One primary per section.
4. Label fits at 390 px.
5. Icon buttons have a Text.

## Content and Asset Guidelines

- **Labels:** start with a verb, describe the outcome; keep them short (labels don't wrap and are
  clipped).
- **Title:** optional context only; mention the format of downloads.
- **Links:** internal pages with the picker; external URLs open in the same tab (no new-tab option).
- **Icons:** Arrow right, Chevron right, Chevron down, Search (files in `/icons`).
- **Tags and metadata:** none.
- **Min / max items:** one link per block. No verified technical limit was identified.
- **Missing content:** no Link: nothing on the page; the editor hint (placeholder
  `buttonBlockEmpty`, "Button: add a Link and a Text.").

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| Nothing on the page | No Link | Editor shows the hint | Set the Link | Button renders |
| Options have no effect | It's a built-in Button ("Button (basic)") authored before | Content tree component name | Replace it with a Button block | Options apply |
| Icon view shows no icon | Icon value unknown | Inspect `--icon-url` | Choose an Icon | Icon visible |
| Label clipped on mobile | Labels never wrap | 390 px preview | Shorten the label | Fits |
| External link opens in the same tab | No new-tab option | Inspect `target` | Accept, or use a block with a new-tab option | — |
| No click in the data layer | Tested in edit mode, or `data-analytics="off"` ancestor | `adobeDataLayer` on preview | Test on preview / live | `cmp:click` appears |

Evidence to collect (no secrets): page URL, `.plain.html` of the block, the rendered link's classes
and attributes, the data-layer entry.

## Screenshots

> **Screenshot required**
>
> - Required screen: Button dialog in Universal Editor (every tab, including Additional)
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
