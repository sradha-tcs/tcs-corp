---
id: "AUT-C-table-list"
title: "Table List — Authoring Guide"
role: "Authoring"
topic: "component authoring"
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/table-list/README.md","blocks/table-list/_table-list.json"]
relatedComponents: ["table-list"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Table List — Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-C-table-list |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | How to add, fill in and check the Table List component |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/table-list/README.md, blocks/table-list/_table-list.json |
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

- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/table-list
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/table-list/item-actions
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/table-list/motion
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/table-list/numbers
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/table-list/numbers-on-mobile
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/table-list/table-list

## For Content Authors

1. **Add the block.** In Universal Editor select a Section, a Columns Container column or a Tabs Container, use **Add (+)** and choose **Table List**.
2. **Open its properties.** Select the Table List (not an item); the properties panel has the tabs **Content**, **Items** and **Additional**.
3. **Choose the Variation first (Content tab).** It sets the defaults of the call to action Style, Numbers and Item link.
4. **Enter the heading and call to action (Content tab).** Heading and Heading Type (H2, H3, H4); Maximum items (1–10, default 4); the call to action Text, Link and Style.
5. **Set the item options (Items tab).** Numbers, Item link and, for buttons, the Button text (default "Explore" in the page language).
6. **Add items.** Select the Table List and use **Add (+)** → **Table List Item**. Fill Title, Description and Link; Number (blank for automatic 01, 02, …), Trademark and Button text are optional. Drag items in the content tree to reorder them.
7. **Raise Maximum items** when you add more than 4 items; items above it aren't shown on the page (dimmed in the editor).
8. **Preview** in Universal Editor Preview or on aem.page, at mobile (below 600px), tablet (600–1199px) and desktop (1200px and wider).
9. **Publish** the page from AEM; make sure the linked pages are published.
10. **Validate the published output:** every arrow or button opens its page, the call to action renders, numbers and trademark signs are right.

- **Minimum required:** no field is required in the model; for a useful list: a Heading and items with a Title and a Link.
- **Recommended:** Variation; Heading; call to action Text and Link; a Description per item; Maximum items matching the item count.
- **Optional:** Heading Type, call to action Style, Numbers, Item link, Button text (block and item), item Number and Trademark, the Additional tab.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

#### Table List (`table-list`)

Model `table-list`; template name "Table List" (the block class AEM renders); key-value block (one row per property); children: `table-list-card`.

Stored on a new component (definition template): `variations` = `"industries"`, `backgroundColor` = `"white"`, `listHeadingType` = `"h2"`, `maxCards` = `4`, `ctaStyle` = `""`, `hideButton` = `false`, `numbers` = `""`, `itemAction` = `""`, `grayDescriptions` = `false`.

##### Content tab — Table List

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Variation | `variations` | select | No | `industries` | Variation 1 - Title, description, arrow (`industries`), Variation 2 - Description, large title, button (`solutions`), Variation 3 - Description, number, large title, arrow (`products`), Variation 4 - Wide title, grey description, arrow (row hover) (`segments`), Variation 5 - Label, large description (steps) (`approach`), Variation 6 - Description, right-aligned title, small arrow (`platforms`) | Variation 1: title, description and arrow. Variation 2: description, large title and button. Variation 3: description, number, large title and arrow. Variation 4: wide title, narrow grey description and arrow; the row is highlighted on hover. Variation 5: small label and large description (steps, without links). Variation 6: description, large right-aligned title and a small arrow. | solutions |
| Background color | `backgroundColor` | select | No | `white` | White (default) (`white`), Black (`black`), Dark Green (`dark-green`), Navy (`navy`) | Choose the background color for the Table List. | — |
| Heading | `listHeading` | text | No | "" | — | — | Industries we serve |
| Heading Type | `listHeadingType` | select | No | `h2` | H2 (`h2`), H3 (`h3`), H4 (`h4`) | Delivered with `listHeading` (field collapse). | h2 |
| Eyebrow | `listEyebrow` | text | No | "" | — | Optional. A short label above the heading, e.g. Models & Data. | — |
| Heading position | `headerPosition` | select | No | "" | Above the list (""), Beside the list (`beside`) | Beside the list: the eyebrow, heading and call to action in a column on the left of the list from 900px wide (above it on smaller screens), with a larger statement-style heading. | — |
| Maximum items | `maxCards` | number | No | `4` | numberMin: 1; numberMax: 20; customErrorMsg: Maximum items must be between 1 and 20. | Display between 1 and 20 items. | 3 |
| Text | `viewAllLabel` | text | No | "" | — | Text of the link next to the heading, e.g. Industries or All Products & Platforms. | View all |
| Link | `viewAllLink` | aem-content | No | — | — | Destination of the link next to the heading. The link is shown only when set. | /design-block-master/en/dummy-pages/industries |
| Style | `ctaStyle` | select | No | "" | Variation default (""), Filled button (`primary`), Outline button (`secondary`), Text link (`tertiary`) | Variation default: filled button (Variation 1), outline button (Variations 2, 4, 5 and 6), text link (Variation 3). | primary |
| Hide button | `hideButton` | boolean | No | `false` | on / off | Hides the heading call to action and all item buttons and arrows. The heading and item content remain visible. | — |

##### Items tab — Table List

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Numbers | `numbers` | select | No | "" | Variation default (""), Show (`show`), Show on mobile only (`mobile`), Hide (`hide`) | Variation default: on mobile only (Variation 1), hidden (Variations 2, 4, 5 and 6), shown (Variation 3). Items are numbered 01, 02, ... unless an item has its own Number. | show |
| Item link | `itemAction` | select | No | "" | Variation default (""), Arrow (`arrow`), Diagonal arrow (`arrow-up-right`), Circled arrow (`arrow-circle`), Button (`button`) | Variation default: arrow (Variations 1, 4, 5 and 6; Variation 5 shows it only on items with a Link), button (Variation 2), diagonal arrow (Variation 3). | arrow |
| Button text | `itemButtonLabel` | text | No | — | — | Default: Explore (in the page language). Shown when `itemAction` is `button` or (`itemAction` is off or empty and `variations` is `solutions`). | Explore |
| Gray descriptions | `grayDescriptions` | boolean | No | `false` | on / off | Use secondary gray text for item descriptions instead of the default text color. Shown when `backgroundColor` is `white`. | — |

##### Additional tab — Table List

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Animation Type | `classes_animation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | motion-fade-in |
| Motion Speed | `classes_animationspeed` | select | No | "" | Medium (""), Fast (`motion-fast`), Slow (`motion-slow`) | How fast the animation runs: 0.3, 0.6 or 0.9 seconds. Shown when `classes_animation` is set and `classes_animation` is not empty. Delivered as a block class. | motion-slow |
| Animation Trigger | `classes_animationtrigger` | select | No | "" | On Scroll / Viewport Entry (""), On Page Load (`motion-on-load`) | When the block's animations run. On Scroll: when the block comes into view (at once if it is in view when the page opens). On Page Load: as soon as the block is ready, wherever it is on the page. Shown when `classes_animation` is set and `classes_animation` is not empty. Delivered as a block class. | — |
| Padding left | `classes_paddingleft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | Delivered as a block class. | — |
| Padding right | `classes_paddingright` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | Delivered as a block class. | — |
| Padding top | `classes_paddingtop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | Delivered as a block class. | — |
| Padding bottom | `classes_paddingbottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | Delivered as a block class. | — |
| Margin left | `classes_marginleft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | Delivered as a block class. | — |
| Margin right | `classes_marginright` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | Delivered as a block class. | — |
| Margin top | `classes_margintop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | Delivered as a block class. | — |
| Margin bottom | `classes_marginbottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | Delivered as a block class. | — |

#### Table List Item (`table-list-card`)

Model `table-list-card`; template name "Table List Item" (the block class AEM renders).

##### Fields — Table List Item

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Number | `number` | text | No | "" | — | Optional. Leave blank to number items automatically (01, 02, ...). | — |
| Title | `title` | text | No | — | — | — | — |
| Trademark | `trademark` | select | No | "" | None (""), ™ Trademark (`tm`), ® Registered (`r`) | A trademark sign after the title, e.g. TwinX™. | — |
| Description | `description` | richtext | No | — | — | — | — |
| Link | `link` | aem-content | No | "" | — | Destination page of the item. | — |
| Button text | `linkText` | text | No | "" | — | Optional. Overrides the block Button text for this item (button item links only). Delivered with `link` (field collapse). | — |

<!-- END GENERATED: fields -->

Notes the tables can't show:

- **Variation:** becomes the block class (`industries`, `solutions`, `products`, `segments`, `approach`, `platforms`; Variation 6 adds `solutions` too); any other value gives `industries`. Defaults per variation: industries = filled button, numbers on mobile only, arrow; solutions = outline button, numbers hidden, button; products = text link, numbers shown, diagonal arrow; segments = outline button (on the light grey background), numbers hidden, arrow; approach and platforms = outline button, numbers hidden, arrow (approach: only on items with a Link). An explicit Style, Numbers or Item link overrides them.
- **Heading / Heading Type:** Heading Type collapses into the Heading (field collapse): the level is read from the delivered heading element (`h2`, `h3` or `h4`, else `h2`); only the text is kept. Item titles are one level below the heading (`h3` under `h2`); without a heading they are `h2`.
- **Maximum items:** clamped to 1–10, 4 when empty or not a number. Items above it are left out on the page; in Universal Editor they stay selectable, dimmed (`table-list-item-hidden`).
- **Text / Link / Style (call to action):** rendered when a Link or Text is set; on the page only with a Link (the editor shows a non-focusable preview without one). Text defaults to "View all" (placeholder `viewAll`). Link values: a page, `/path`, `#anchor` or `http(s)://…`; AEM content paths become published paths (`toSitePath`); other values (e.g. `mailto:`) are ignored.
- **Numbers:** Show renders the item's Number or the zero-padded position (01, 02, …); Show on mobile only hides the numbers from 600px (`numbers-mobile`); Hide renders none.
- **Item link:** Arrow and Diagonal arrow are links covering the whole row (accessible name "Explore {title}", placeholder `exploreItem`); Button is an outline button (accessible name "{text}: {title}", placeholder `itemLinkLabel`). Without a Link an arrow is a decorative `span` and a button is shown only in the editor.
- **Button text:** the item's Button text (the Link's text, collapsed into the Link), else the block's Button text, else "Explore" (placeholder `explore`); a text equal to the URL or looking like a path is ignored.
- **Trademark:** `tm` appends ™, `r` appends ® to the title in a `sup`; don't type the signs into the Title.
- **Description:** rich text (paragraphs and lists) is kept, plain text becomes one paragraph; links inside it stay clickable above the row's arrow link.
- **Item without a title:** no empty heading on the page (kept in the editor so it can be filled in).
- **Legacy values still read:** the stored Motion Type (`motion`: none, fade, slide, reveal), removed from the dialog, and the legacy header item (heading | link) of lists created before the heading and link were block fields; see [Variations](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/table-list/README.md#variations).
- **Data layer:** no field changes the data layer; the block is tracked centrally (see Data Layer and Analytics).
- **Additional tab:** Anchor ID, Hide block, Animation Type / Motion Speed / Animation Trigger, padding and margin, as described in AGENTS.md "Additional tab" and "Animation and skeletons"; the animation plays on the items (`.table-list-item`), one after another.

## Screenshot-Based Authoring Steps

#### Authoring Step 1: Add the Table List and choose the variation

```text
[Screenshot Placeholder]

File name:
table-list-authoring-step-1.png

Purpose:
The Table List added to a section, with the Content tab open and the Variation selected.

Annotations:
A = Variation
B = Heading
C = Heading Type
D = Maximum items
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Variation | Variation 1 - Title, description, arrow | Industries list | Class `industries`; filled button, numbers on mobile, arrows by default |
| B | Heading | Industries we serve | The list heading | H2 heading |
| C | Heading Type | H2 | Under the page H1 | Item titles H3 |
| D | Maximum items | 4 | Four industries | Four rows shown |

- **Author action:** Add (+) → Table List; select it and fill the Content tab.
- **Expected preview:** the heading; no rows until items are added.
- **Business rules:** Maximum items accepts 1–10 (the dialog validates it).
- **Validation:** heading level fits the page outline.
- **Common mistakes:** choosing the variation last and then overriding its defaults by hand.

#### Authoring Step 2: Call to action

```text
[Screenshot Placeholder]

File name:
table-list-authoring-step-2.png

Purpose:
The call to action fields on the Content tab and the rendered link next to the heading.

Annotations:
A = Text
B = Link
C = Style
D = Rendered call to action
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Text | View all industries | Specific label | Button text |
| B | Link | /en/industries (page picker) | Overview page | The call to action renders on the page |
| C | Style | Variation default | Filled button for Variation 1 | `button primary` |

- **Author action:** fill Text, pick the Link, keep Style on Variation default.
- **Expected preview / published result:** the button on the right of the heading (below it on narrow screens).
- **Business rules:** without a Link the call to action shows only in the editor.
- **Common mistakes:** a `mailto:` link or text without `/` or `http` (ignored, no call to action).

#### Authoring Step 3: Item options

```text
[Screenshot Placeholder]

File name:
table-list-authoring-step-3.png

Purpose:
The Items tab with Numbers, Item link and Button text.

Annotations:
A = Numbers
B = Item link
C = Button text
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Numbers | Show | Numbered rows at every width | 01, 02, … before the titles |
| B | Item link | Arrow | Whole row clickable | Right arrow per row |
| C | Button text | Explore | Only for Button item links | Not shown with Arrow |

- **Author action:** open the Items tab and set the options; Button text appears when Item link is Button (or Variation default on Variation 2).
- **Business rules:** item Numbers override the automatic numbering.
- **Common mistakes:** expecting numbers on desktop with Show on mobile only.

#### Authoring Step 4: Add the items

```text
[Screenshot Placeholder]

File name:
table-list-authoring-step-4.png

Purpose:
A Table List Item selected in the content tree with its fields.

Annotations:
A = Number
B = Title
C = Trademark
D = Description
E = Link
F = Button text
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Number | (empty) | Automatic numbering | 01 |
| B | Title | Banking | Item heading | H3 "Banking" |
| C | Trademark | None | Not a product name | No sign |
| D | Description | One sentence about the industry | Short and meaningful | Description column |
| E | Link | /en/industries/banking | Detail page | Arrow covers the row, named "Explore Banking" |
| F | Button text | (empty) | Arrow items don't use it | — |

- **Author action:** select the Table List, Add (+) → Table List Item; repeat; drag to reorder.
- **Expected preview:** rows in content tree order; extra items above Maximum items dimmed.
- **Business rules:** an item without a Link has a decorative arrow (not clickable) or, with Button, no button on the page.
- **Common mistakes:** typing ™ / ® into the Title (use Trademark); forgetting the Link.

#### Authoring Step 5: Preview, publish and validate

```text
[Screenshot Placeholder]

File name:
table-list-authoring-step-5.png

Purpose:
The published Table List on aem.live at desktop width.

Annotations:
A = Heading and call to action
B = Rows
C = Arrows
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Hide block (Additional) | Off | Show the block | Block visible |
| B | Animation Type (Additional) | None | Optional entrance animation | Rows shown as is |
| C | Anchor ID (Additional) | anchor-industries | Optional deep link | Block id `anchor-industries` |

- **Author action:** preview at 375, 768 and 1440px; publish the page.
- **Expected published result:** the same rows as the preview, without dimmed extra items.
- **Validation:** click every arrow and button; check translated "View all" / "Explore" on other locales.
- **Common mistakes:** linked pages not published (404).

## Variations

Personalization and fallback are the same for all: no personalization; the authored content renders.

#### Variation 1 - Industries (`industries`, default)

- **Purpose / when to use:** a list of industries or capabilities with a title, a short description and an arrow.
- **Fields:** Title, Description, Link per item; Heading and call to action.
- **Dialog:** Variation 1; defaults: Style filled button, Numbers on mobile only, Item link Arrow.
- **Rendering:** rows `main | description | action`; no divider below the last row.
- **Responsive:** below 600px number and title above the description (the description in larger type); from 600px three columns; from 1200px the block is inset (`padding-inline: var(--space-2000)`) and the title emphasised (1.75rem semibold).
- **Accessibility:** arrow link "Explore {title}" covers the row.
- **Data layer:** clicks `interaction: link`.

```text
[Screenshot Placeholder]

File name:
table-list-industries-tablet.png

Purpose:
Variation 1 at 768px: title, description and arrow in three columns, no numbers (mobile only).

Annotations:
A = Title
B = Description
C = Arrow
```

#### Variation 2 - Solutions (`solutions`)

- **Purpose / when to use:** transformation solutions with a large name and an explicit "Explore" button.
- **Fields:** Title (up to about 25 characters recommended), Description, Link; Button text optional.
- **Dialog:** Variation 2; defaults: Style outline button, Numbers hidden, Item link Button.
- **Rendering:** `description | main | action`; title right-aligned from 600px; outline button `secondary`.
- **Responsive:** stacked below 600px; title 2.5rem below 1200px, 4rem from 1200px.
- **Accessibility:** button named "{text}: {title}".
- **Data layer:** button clicks `interaction: link`, `dc:title` the accessible name.

```text
[Screenshot Placeholder]

File name:
table-list-solutions-tablet.png

Purpose:
Variation 2 at 768px: description, right-aligned title and the Explore button.

Annotations:
A = Description
B = Title
C = Explore button
```

#### Variation 3 - Products (`products`)

- **Purpose / when to use:** products and platforms with numbers and trademark signs.
- **Fields:** Title (up to about 15 characters recommended), Trademark, Description, Link; Number optional.
- **Dialog:** Variation 3; defaults: Style text link, Numbers shown, Item link Diagonal arrow.
- **Rendering:** `description | main | action` with 2px light grey dividers; the number in `--slate-500` (3:1 for large text).
- **Responsive:** title 3rem below 600px, 3.5rem from 600px, 5.625rem from 1200px; desktop columns 476 : 695 : auto.
- **Accessibility:** diagonal arrow link "Explore {title}" (the trademark sign isn't part of the name).
- **Data layer:** clicks `interaction: link`.

```text
[Screenshot Placeholder]

File name:
table-list-products-tablet.png

Purpose:
Variation 3 at 768px: description, number and large title with trademark, diagonal arrow.

Annotations:
A = Description
B = Number
C = Title with trademark
D = Diagonal arrow
```

#### Variation 4 - Segments (`segments`)

Source: TCS Designs - Prototypes Figma, component "List Item - Industry" in the "Industries" sections of L1 What we do ("Deep expertise, across industries", desktop / tablet / mobile frames, with the "Industries" call to action) and L2 Industry ("Segments we serve", no call to action, with the hover state).

- **Purpose / when to use:** a directory of industries, segments or offerings where the name leads and a short grey sentence supports it; up to 10 rows, each linking to a page.
- **Fields:** Title, Description, Link per item; Heading and call to action. No new fields: the variation uses the existing ones.
- **Dialog:** Variation 4; defaults: Style outline button (`secondary`, drawn on the light grey `--color-bg-secondary` background on a white Table List), Numbers hidden, Item link Arrow. Style, Numbers, Item link, Button text, Background color and Hide button work as for the other variations.
- **Rendering:** rows `main | description | action`; title 1.75rem medium at every width; description `--color-text-secondary`, 1.25rem medium from 600px (1rem below); 3rem arrow in `--slate-500`; a 1px `--slate-400` divider below every row, the last one too; row padding 2.5rem / 1.25rem / 3.75rem. The block keeps the Figma gutter itself: 1rem / 2.5rem / 5rem from the edge (below 600px / from 600px / from 900px) in a full-width section (the default Section width; a fixed-width section adds its own gutter), and the Figma section padding (2.5rem / 5rem / 7.5rem) inside a background colour of its own.
- **Dark backgrounds** (Black, Dark Green, Navy; Figma "Models & Data"): white titles, descriptions in 80% `--slate-300` (7.7:1 on navy, 8.1:1 on black), arrows in 40% white (3.8:1; white on hover and focus).
- **States:** a row with an arrow link gets the `--color-bg-secondary` background and a `--color-text-default` arrow on hover and when its arrow has keyboard focus (5% white on the dark backgrounds); the arrow doesn't move. Rows with a Button item link or without a Link aren't highlighted (the row isn't the link).
- **Responsive:** the rows follow the width of the list (a container query on `.table-list-items`), not of the screen, so they fit in the Figma columns too: below 25.5rem title, description and the arrow stacked (arrow below the description, Figma mobile); from 25.5rem title above description (12px apart) with the arrow beside them (Figma 476 and 628px columns); from 44.5rem title | description (at most 21.15rem, the Figma's 338px) | arrow. The header: below 600px the call to action below the heading (heading 1.75rem), from 600px beside it when it fits (heading 2.5rem).
- **Accessibility:** arrow link "Explore {title}" covers the row; the description keeps 6.9:1 on white (the Figma's 80% opacity grey would give 4.3:1, below WCAG 1.4.3), the arrow 3:1 (the Figma's `--slate-400` gives 2:1, below WCAG 1.4.11); hover and focus give the same highlight.
- **Data layer:** clicks `interaction: link`.

```text
[Screenshot Placeholder]

File name:
table-list-segments-desktop.png

Purpose:
Variation 4 at 1440px: the heading "Segments we serve", four rows with the wide title, the narrow grey description and the arrow, the second row hovered (light grey background, dark arrow).

Annotations:
A = Heading
B = Title
C = Description
D = Arrow
E = Hovered row
```

```text
[Screenshot Placeholder]

File name:
table-list-segments-mobile.png

Purpose:
Variation 4 at 375px: the heading with the Industries call to action below it, rows with the title, description and the arrow stacked.

Annotations:
A = Heading
B = Call to action
C = Title
D = Description
E = Arrow
```

#### Variation 5 - Approach (`approach`)

Source: TCS Designs - Prototypes Figma, L3 Case Study / Customer Story, "Rail - 3 col" (node 57:36224), the "Approach" section: DEFINE, DESIGN, DELIVER on `#003b39`.

- **Purpose / when to use:** steps, phases or principles: a short label and a sentence or two each, usually without links.
- **Fields:** the item Title is the label, Description the text; Link optional. Heading; call to action optional.
- **Dialog:** Variation 5 and Background color Dark Green (the Figma); defaults: Style outline button, Numbers hidden, Item link Arrow, shown only on items with a Link (no decorative arrow).
- **Rendering:** the label 1.25rem medium uppercase (`text-transform`: type it in normal case) in `--slate-300` on dark (7.8:1 on Dark Green), `--color-text-secondary` on white; the description 1.75rem medium (1.5rem below 600px), white on dark; a 1px divider below every row (`--slate-600` on dark); rows 2.5rem / 3.75rem padding, 1.5rem apart; the Figma 80px heading-to-list gap and 120px section padding (7.5rem from 1200px).
- **Responsive:** rows follow the list width: below 44rem the label above the description; from 44rem label | description (23.55rem, the Figma's 376.8px). The Figma has no tablet or mobile frame for this section: the narrow layout is the block's.
- **Not reproduced:** the Figma truncates the description after four lines (its text box is named "5 lines max"); the block shows the whole description, so authored text is never hidden. Keep descriptions to about five lines (about 120 characters).
- **Accessibility:** labels are headings (h3 under the h2 heading); without Links the rows have no focusable element.

#### Variation 6 - Platforms (`platforms`)

Source: TCS Designs - Prototypes Figma, L2 Products, "Rail - 3 col" (node 57:35705), "Our transformation solutions" (TwinX™, Cognix™, BaNCS™, ADD™).

- **Purpose / when to use:** products or platforms with a large name, a one-line promise and a link.
- **Fields:** Title, Trademark, Description, Link per item; Heading.
- **Dialog:** Variation 6; defaults: Style outline button, Numbers hidden, Item link Arrow.
- **Rendering:** built on Variation 2 (the block gets the `solutions` class too and keeps its type: description 1.125rem regular `--grey-900`, title 2.5rem / 4rem semibold right-aligned); differences: a 24px arrow (`--icon-size-s`) centred on the first line of the title, the description at the top of the row, the Figma row spacing (2.5rem above, 3.75rem below, 1.5rem apart) and gutter (as Variation 4).
- **Responsive:** as Variation 2: stacked below 600px (description, title, arrow); from 600px description | right-aligned title | arrow. The Figma has a desktop frame only.
- **Accessibility:** arrow link "Explore {title}" (the trademark sign isn't part of the name).

#### Eyebrow, Heading position, Navy and Circled arrow

Added for the TCS Designs - Prototypes Figma, L1 What we do, "Human + AI autonomy model" (node 57:16935): the "Models & Data" list (Variation 4 with Eyebrow "Models & Data", a statement Heading, Heading position Beside, Background color Navy, Numbers Show, Item link Circled arrow, Maximum items 5). Each works with every variation.

- **Eyebrow** (`listEyebrow`): a short label on its own line above the heading, 1rem semibold (0.875rem from 600 to 1199px when beside).
- **Heading position** (`headerPosition`): Above the list (default) or Beside the list: from 900px the header (eyebrow, heading, call to action) is the left of two equal columns, 24px apart (Figma 628 + 24 + 628px; 24px from the edge between 900 and 1199px, Figma tablet), above the list before; the heading becomes a statement: medium weight, line height 1.2, 1.75 / 2 / 2.5rem; dividers 24px below the rows, none below the last (Figma).
- **Background color Navy** (`navy`): `--brand-600` (#011627) with the light theme of Black and Dark Green.
- **Item link Circled arrow** (`arrow-circle`): `icons/arrow-right-circle.svg` (a 42px circle with an 18px arrow in the 48px box, the Figma "Arrow right-circle").
- **Delivery:** both fields are key-value properties; the reader matches them after the fields authored before them (`FIELDS`), so unkeyed rows of older lists aren't shifted.

#### Call to action style, Numbers and Item link options

Style (Filled button `primary`, Outline button `secondary`, Text link `tertiary`), Numbers (Show, Show on mobile only, Hide: class `numbers-{show,mobile,hide}`) and Item link (Arrow, Diagonal arrow, Button) can be combined with any variation; "Variation default" keeps the variation's value.

#### Legacy Motion Type

Lists authored before the Additional tab's Animation Type have a stored Motion Type (`motion`): Fade, Slide and Reveal are applied as Animation Type Fade in, Slide up and Fade up, at Motion Speed Slow unless a speed is set (`addLegacyMotion`), and only when no Animation Type is set. Not for new authoring: use the Additional tab.

#### Legacy header item

Lists created before the heading and call to action were block fields have a header row (heading | link; the former "Table List Header" component, no longer offered). It is still read: its heading when the block Heading is empty, its link when the block Link and Text are empty. Not for new authoring.

## Complete Authoring Example

Scenario: Products & Platforms showcase (Variation 3, handover 6.18.17).

| Field | Example value | Guidance |
| ----- | ------------- | -------- |
| Variation | Variation 3 - Description, number, large title, arrow | Sets text link, numbers, diagonal arrows |
| Heading | Products & Platforms | H2 by default |
| Text / Link / Style | All Products & Platforms / /en/products / Text link | Specific call to action |
| Item 1: Title, Trademark | TwinX, ™ Trademark | Select the sign, don't type it |
| Item 1: Description | Risk free business experimentation and decision intelligence | About 160 characters at most |
| Item 1: Link | /en/products/twinx | Published product page |
| Item 2 | ignio, ® Registered, Cognitive automation for enterprise IT operations, /en/products/ignio | Same structure |
| Item 3 | TCS BaNCS, ® Registered, A universal platform for banking, insurance and capital markets, /en/products/bancs | Same structure |
| Item 4 | Quartz, ™ Trademark, Blockchain solutions for connected enterprise ecosystems, /en/products/quartz | Four items fit Maximum items 4 |

Steps: add the Table List; choose Variation 3; fill the heading and call to action; add four items; preview at 375, 768 and 1440px; publish.

- **Expected output:** the heading with the text link; rows 01 TwinX™, 02 ignio®, 03 TCS BaNCS®, 04 Quartz™ with descriptions and diagonal arrows; item titles H3; AEM paths in links become published paths.
- **Responsive:** stacked description above number and title below 600px; side by side from 600px.
- **Accessibility:** arrows named "Explore TwinX", …; the list is `role="list"`.
- **Analytics / data layer:** `table-list-1` (or the Anchor ID) in the data layer; arrow clicks `cmp:click` with `interaction: link`.
- **Personalization fallback:** none; the authored rows render.
- **Pre-publish checklist:** call to action renders; every arrow navigates; numbers as intended at 375 and 1024px; no more than Maximum items intended; trademark signs not doubled; linked pages published.

## Content and Asset Guidelines

- **Heading:** up to about 50 characters (recommendation from the handover, not enforced).
- **Item titles:** Variation 1 up to about 40 characters, Variation 2 about 25, Variation 3 about 15 (very large type), Variation 4 about 45 (e.g. "Communication, Media & Information Services"); plain text (formatting is dropped). Expect longer titles in other languages.
- **Descriptions:** about 120 characters (Variation 3: 160); one sentence that makes sense without the title.
- **CTAs and links:** a specific call to action ("View all industries"); short verbs for item buttons ("Explore", "Discover"); link to canonical published pages with the page picker. Only `/`, `#` and `http(s)` links are supported.
- **Images and icons:** none authored; the arrows are `icons/arrow-right.svg`, `icons/arrow-up-right.svg` and `icons/arrow-right-circle.svg` masks.
- **Tags and metadata:** not used.
- **Min / max items:** at most 10 shown (Maximum items 1–10, default 4); recommended 3–8 (Variation 1) or 3–6 (Variations 2 and 3).
- **Missing content:** an item without a Link has a decorative arrow or no button; without a Description no description column; without a title no heading.

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| Some items are missing | Maximum items (default 4) lower than the item count | Check Content › Maximum items; dimmed items in the editor | Raise it (up to 10) or remove items | All items appear |
| Call to action missing | Link empty or unsupported | Check the Link value | Pick a page or a full URL | Call to action renders |
| Arrow not clickable / no button | Item Link empty or unsupported | Select the item, check Link | Set the Link | Arrow or button navigates |
| Wrong button text | Item Button text empty or equal to the URL; Item link not Button | Check item and block Button text | Set the texts; Item link Button | Expected text |
| Heading Type has no effect | Heading delivered without a heading element | Inspect the page's `.plain.html` listHeading cell | Re-select Heading Type and re-enter the Heading; escalate if it persists | Heading at the chosen level |
| Item visible in the editor, missing on the page | A two-cell row read as the legacy header | Count the row's cells in `.plain.html` | Fill the item's other fields; escalate to development | Item renders on preview |
| Unexpected numbers | Show on mobile only or Hide default; Number not 1–3 digits | Check Items › Numbers and item Numbers | Set Numbers Show; use values like 01 | Numbers as intended |
| Rows appear late | An Animation Type (or a stored Motion Type) is set | Check the Additional tab | Animation Type None | Rows visible at once |

Evidence to collect: page URL (preview / live), viewport width, the block's `.plain.html` rows, the block classes, console messages, the relevant `window.adobeDataLayer` entries. No credentials or tokens.

## Screenshots

![Table List as published (block library) at desktop 1440 × 900, published page /design-block-master/en/block-library/table-list/item-actions](./screenshots/block-library-table-list-item-actions-1440.jpg)

*Figure: Table List as published (block library) — desktop 1440 × 900 (/design-block-master/en/block-library/table-list/item-actions, captured 2026-11-08).*

![Table List as published (block library) at mobile 375 × 812, published page /design-block-master/en/block-library/table-list/item-actions](./screenshots/block-library-table-list-item-actions-375.jpg)

*Figure: Table List as published (block library) — mobile 375 × 812 (/design-block-master/en/block-library/table-list/item-actions, captured 2026-11-08).*

> **Screenshot required**
>
> - Required screen: Table List dialog in Universal Editor (every tab, including Additional)
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
