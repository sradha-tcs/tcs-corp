---
id: "DEV-V-table-list"
title: "Table List Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/table-list/_table-list.json"]
relatedComponents: ["table-list"]
relatedPages: ["/design-block-master/en/block-library/table-list","/design-block-master/en/block-library/table-list/item-actions","/design-block-master/en/block-library/table-list/motion","/design-block-master/en/block-library/table-list/numbers","/design-block-master/en/block-library/table-list/numbers-on-mobile","/design-block-master/en/block-library/table-list/table-list"]
confidence: "Medium"
primary: false
---

# Table List Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-table-list |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Table List block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/table-list/_table-list.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Variation fields](#variation-fields)
- [Matrix](#matrix)
- [Narrative (block README)](#narrative-block-readme)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Variation fields

| Component | Field | Tab | Multiple | Options (label = value) | Default |
| --- | --- | --- | --- | --- | --- |
| `table-list` | Variation (`variations`) | Content | No | Variation 1 - Title, description, arrow = `industries`; Variation 2 - Description, large title, button = `solutions`; Variation 3 - Description, number, large title, arrow = `products`; Variation 4 - Wide title, grey description, arrow (row hover) = `segments`; Variation 5 - Label, large description (steps) = `approach`; Variation 6 - Description, right-aligned title, small arrow = `platforms` | `industries` |
| `table-list` | Background color (`backgroundColor`) | Content | No | White (default) = `white`; Black = `black`; Dark Green = `dark-green`; Navy = `navy` | `white` |
| `table-list` | Heading Type (`listHeadingType`) | Content | No | H2 = `h2`; H3 = `h3`; H4 = `h4` | `h2` |
| `table-list` | Heading position (`headerPosition`) | Content | No | Above the list = `""`; Beside the list = `beside` | `` |
| `table-list` | Style (`ctaStyle`) | Content | No | Variation default = `""`; Filled button = `primary`; Outline button = `secondary`; Text link = `tertiary` | `` |
| `table-list` | Numbers (`numbers`) | Items | No | Variation default = `""`; Show = `show`; Show on mobile only = `mobile`; Hide = `hide` | `` |
| `table-list` | Item link (`itemAction`) | Items | No | Variation default = `""`; Arrow = `arrow`; Diagonal arrow = `arrow-up-right`; Circled arrow = `arrow-circle`; Button = `button` | `` |
| `table-list-card` | Trademark (`trademark`) | — | No | None = `""`; ™ Trademark = `tm`; ® Registered = `r` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Table List blocks on the published block library pages (6 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| table-list | Variation | Variation 1 - Title, description, arrow | `industries` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Variation | Variation 2 - Description, large title, button | `solutions` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Variation | Variation 3 - Description, number, large title, arrow | `products` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Variation | Variation 4 - Wide title, grey description, arrow (row hover) | `segments` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Variation | Variation 5 - Label, large description (steps) | `approach` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Variation | Variation 6 - Description, right-aligned title, small arrow | `platforms` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Background color | White (default) | `white` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Background color | Black | `black` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Background color | Dark Green | `dark-green` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Background color | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Heading Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Heading Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Heading Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Heading position | Above the list | `""` | Supported (in the model) | n/a (default) |
| table-list | Heading position | Beside the list | `beside` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Style | Variation default | `""` | Supported (in the model) | n/a (default) |
| table-list | Style | Filled button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Style | Outline button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Style | Text link | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Numbers | Variation default | `""` | Supported (in the model) | n/a (default) |
| table-list | Numbers | Show | `show` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Numbers | Show on mobile only | `mobile` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Numbers | Hide | `hide` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Item link | Variation default | `""` | Supported (in the model) | n/a (default) |
| table-list | Item link | Arrow | `arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Item link | Diagonal arrow | `arrow-up-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Item link | Circled arrow | `arrow-circle` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | Item link | Button | `button` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list-card | Trademark | None | `""` | Supported (in the model) | n/a (default) |
| table-list-card | Trademark | ™ Trademark | `tm` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list-card | Trademark | ® Registered | `r` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

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

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../SCREENSHOT-REGISTER.md).

## Known limitations

- Combination rules (which options cannot be combined) are described in the README narrative only where they exist; unsupported combinations are not enumerated.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
