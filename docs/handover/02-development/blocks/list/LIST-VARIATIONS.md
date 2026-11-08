---
id: "DEV-V-list"
title: "List Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/list/_list.json"]
relatedComponents: ["list"]
relatedPages: ["/design-block-master/en/block-library/list","/design-block-master/en/block-library/list/card-colours-and-overrides","/design-block-master/en/block-library/list/card-style-from-pages","/design-block-master/en/block-library/list/card-style-from-pages/automatic","/design-block-master/en/block-library/list/card-style-from-pages/image-light-blue","/design-block-master/en/block-library/list/card-style-from-pages/panel-grey","/design-block-master/en/block-library/list/card-style-from-pages/report-navy","/design-block-master/en/block-library/list/card-style-from-pages/statistic","/design-block-master/en/block-library/list/cards","/design-block-master/en/block-library/list/empty-state","/design-block-master/en/block-library/list/figma-variations","/design-block-master/en/block-library/list/layout-and-scrolling","/design-block-master/en/block-library/list/list-item-display","/design-block-master/en/block-library/list/lists-made-before","/design-block-master/en/block-library/list/sources"]
confidence: "Medium"
primary: false
---

# List Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-list |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the List block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/list/_list.json |
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
| `list` | Heading type (`titleType`) | Content | No | H2 = `h2`; H3 = `h3`; H4 = `h4`; H5 = `h5`; H6 = `h6` | `h2` |
| `list` | CTA style (`linkType`) | Content | No | Text link = `""`; Primary button = `primary`; Secondary button = `secondary` | `` |
| `list` | List source (`source`) | Content | No | Child pages = `parent`; Fixed list = `fixed`; Tagged pages = `tags` | `fixed` |
| `list` | Match (`tagMatch`) | Content | No | Any of the tags = `any`; All of the tags = `all` | `any` |
| `list` | Order by (`orderBy`) | Content | No | Manual (as authored; path order for pages) = `manual`; Title = `title`; Last modified = `lastModified` | `manual` |
| `list` | Sort order (`sortOrder`) | Content | No | Ascending = `ascending`; Descending = `descending` | `ascending` |
| `list` | Card style (`cardStyle`) | Display | No | Image card = `image`; Panel = `panel`; Report = `report`; Statistic = `stat`; Mixed = `mixed` | `image` |
| `list` | Card colour (`cardTheme`) | Display | No | Default for the style = `""`; Dark = `dark`; Navy = `navy`; Brand blue = `brand`; Light blue = `brand-light`; Light grey = `grey`; Mid grey = `mid-grey`; Grey gradient = `gradient`; Image background = `image` | `` |
| `list` | Image ratio (`imageRatio`) | Display | No | 16:9 = `16-9`; 1:1 = `1-1`; 4:3 = `4-3`; 3:2 = `3-2` | `16-9` |
| `list` | Panel height (`panelHeight`) | Display | No | Portrait (2:3) = `portrait`; Compact = `compact`; Content = `auto` | `portrait` |
| `list` | Date format (`dateFormat`) | Display | No | 04 Sep 26 = `dd-mmm-yy`; 04-09-2026 = `dd-mm-yyyy`; 09-04-2026 = `mm-dd-yyyy`; Sep 4, 2026 = `mmm-d-yyyy`; 04/09/26 = `dd/mm/yy`; 4th September 2026 = `do-mmmm-yyyy` | `dd-mmm-yy` |
| `list` | Image loading (`imageLoading`) | Display | No | Lazy = `lazy`; Eager (first screen) = `eager` | `lazy` |
| `list` | Desktop display (`desktopMode`) | Display | No | Grid = `grid`; Horizontal scroll = `horizontal-scroll` | `grid` |
| `list` | Tablet display (`tabletMode`) | Display | No | Grid = `grid`; Horizontal scroll = `horizontal-scroll` | `grid` |
| `list` | Mobile display (`mobileMode`) | Display | No | Grid = `grid`; Horizontal scroll = `horizontal-scroll` | `grid` |
| `list` | Snap alignment (`snapAlign`) | Display | No | Start = `start`; Center = `center` | `start` |
| `list` | Scroll step (`scrollStep`) | Display | No | One card = `one-card`; Viewport = `viewport` | `one-card` |
| `list` | Edge (`edgePadding`) | Display | No | Cards run to the edge = `bleed`; Inside the content width = `none` | `bleed` |
| `list` | When there are no items (`emptyBehavior`) | Display | No | Hide the list = `hide`; Show a message = `message`; Show the fallback items = `fallback` | `message` |
| `list` | Style options (`classes`) | Display | Yes | Compact statistic title = `stat-compact`; Dividers between rows = `dividers`; Header centred = `header-center` | — |
| `list-item` | Open in a new tab (`newTab`) | Link | No | As the list = `""`; Yes = `true`; No = `false` | `` |
| `list-item` | Card style (`kind`) | Display | No | As the list = `""`; Image card = `image`; Panel = `panel`; Report = `report`; Statistic = `stat` | `` |
| `list-item` | Card colour (`theme`) | Display | No | As the list = `""`; Dark = `dark`; Navy = `navy`; Brand blue = `brand`; Light blue = `brand-light`; Light grey = `grey`; Mid grey = `mid-grey`; Grey gradient = `gradient`; Image background = `image` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the List blocks on the published block library pages (15 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| list | Heading type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Heading type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Heading type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Heading type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Heading type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | CTA style | Text link | `""` | Supported (in the model) | n/a (default) |
| list | CTA style | Primary button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | CTA style | Secondary button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | List source | Child pages | `parent` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | List source | Fixed list | `fixed` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | List source | Tagged pages | `tags` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Match | Any of the tags | `any` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Match | All of the tags | `all` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Order by | Manual (as authored; path order for pages) | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Order by | Title | `title` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Order by | Last modified | `lastModified` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Sort order | Ascending | `ascending` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Sort order | Descending | `descending` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card style | Image card | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card style | Panel | `panel` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card style | Report | `report` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card style | Statistic | `stat` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card style | Mixed | `mixed` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card colour | Default for the style | `""` | Supported (in the model) | n/a (default) |
| list | Card colour | Dark | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card colour | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card colour | Brand blue | `brand` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card colour | Light blue | `brand-light` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card colour | Light grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card colour | Mid grey | `mid-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card colour | Grey gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Card colour | Image background | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Image ratio | 16:9 | `16-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Image ratio | 1:1 | `1-1` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Image ratio | 4:3 | `4-3` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Image ratio | 3:2 | `3-2` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Panel height | Portrait (2:3) | `portrait` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Panel height | Compact | `compact` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Panel height | Content | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Date format | 04 Sep 26 | `dd-mmm-yy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Date format | 04-09-2026 | `dd-mm-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Date format | 09-04-2026 | `mm-dd-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Date format | Sep 4, 2026 | `mmm-d-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Date format | 04/09/26 | `dd/mm/yy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Date format | 4th September 2026 | `do-mmmm-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Image loading | Lazy | `lazy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Image loading | Eager (first screen) | `eager` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Desktop display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Desktop display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Tablet display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Tablet display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Mobile display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Mobile display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Snap alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Snap alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Scroll step | One card | `one-card` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Scroll step | Viewport | `viewport` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Edge | Cards run to the edge | `bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Edge | Inside the content width | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | When there are no items | Hide the list | `hide` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | When there are no items | Show a message | `message` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | When there are no items | Show the fallback items | `fallback` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | Style options | Compact statistic title | `stat-compact` | Supported (in the model) | Yes |
| list | Style options | Dividers between rows | `dividers` | Supported (in the model) | Yes |
| list | Style options | Header centred | `header-center` | Supported (in the model) | Yes |
| list-item | Open in a new tab | As the list | `""` | Supported (in the model) | n/a (default) |
| list-item | Open in a new tab | Yes | `true` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Open in a new tab | No | `false` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card style | As the list | `""` | Supported (in the model) | n/a (default) |
| list-item | Card style | Image card | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card style | Panel | `panel` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card style | Report | `report` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card style | Statistic | `stat` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card colour | As the list | `""` | Supported (in the model) | n/a (default) |
| list-item | Card colour | Dark | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card colour | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card colour | Brand blue | `brand` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card colour | Light blue | `brand-light` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card colour | Light grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card colour | Mid grey | `mid-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card colour | Grey gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| list-item | Card colour | Image background | `image` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

Every variation is a combination of the List's fields (no separate block class to pick); they are shared with [Cards](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/cards/README.md) (`utils/card-list-config.js`, `decorators/card-list-decorator.js`, `styles/card-list.css`). Personalization and fallback: none (see [Personalization](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/list/README.md#personalization)); the data layer state is the same for all, with `xdm:variant` = the Card style (or `links`). Handover screenshots of each are in the generated table above.

#### Image cards (Card style Image card, default)

- **Purpose / when to use:** page teasers with a picture (insights, services). Not for key figures (Statistic) or downloads (Report).
- **Fields:** Display as teaser on, Card style Image card; optional Image ratio (16:9, 1:1, 4:3, 3:2), Show options, Date format.
- **Rendering:** `article.list-card.list-card-image`: image (ratio class `ratio-*`, no layout shift), kicker (eyebrow, else up to three tags with reading time), title, description, content type label and `<time datetime>` (Show content type off: neither the label nor the content type tag in the kicker). **Hover (Figma):** hovering or focusing anywhere on a linked image card fades its title from `--color-text-neutral` (#303030) to `--color-text-brand` (#216AC3) with an underline, 300ms ease-out (`--list-hover-duration`, `--list-hover-easing`), and back on leave; the underline is always drawn transparent and only changes colour, so the card, its padding and image don't move or resize. On dark backgrounds the theme contract's light brand colour is used. Cards without a link have no hover; panel, report and statistic cards keep their own hover (`styles/card-list.css`). **Header call to action:** in an Image card List, a Secondary header CTA (e.g. View All) has no hover: under the pointer it keeps its resting colours, also on dark backgrounds; keyboard focus keeps the global focus-visible style (`blocks/list/list.css`, overriding `a.button.secondary:hover` of `styles/styles.css` for this button only).

```text
[Screenshot Placeholder]

File name:
list-image-mobile.png

Purpose:
Image cards at 402px in one column (Mobile columns 1).

Annotations:
A = Image at the chosen ratio
B = Kicker (eyebrow or tags)
C = Title, description, content type and date
```

#### Panel, Report and Statistic cards

- **Panel:** tall coloured panel (Panel height Portrait 2:3, Compact 9:10, Content) with eyebrow, title, description and the default action "Explore" (placeholder `explore`); automatic for pages without an image under Mixed.
- **Report:** content type and date, title, description and an outlined "Download" action (placeholder `download`); automatic for Report content under Mixed.
- **Statistic:** the Title as a large number, the Label (`subtitle`) above the description, a secondary-button action when a Call to action label is set; Style option `stat-compact` for statement titles (Figma variations 7 and 12).
- **Card colour** paints these three (Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background): `theme-*` class on the card.

```text
[Screenshot Placeholder]

File name:
list-stat-tablet.png

Purpose:
Statistic cards at 1024px with item colours (brand, gradient, mid-grey, brand-light) as in Figma variation 13.

Annotations:
A = Large number (Title)
B = Label
C = Card colour per item
```

#### Mixed (Card style Mixed)

Each card's style follows the precedence in [Authorable Fields](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/list/README.md#authorable-fields): the List Item's style, else the page's `card-style`, else automatic (report, panel without image, image). Used for related-content and media rails (Figma 2, 3, 8, 9).

#### First card as feature

The first card becomes a full-width spotlight above the others (`feature-first` class) with its image, tags, reading time and, when the page has an `author-id`, the author lockup (photo, name, designation) from the Authors sheet (`getAuthors`, loaded only for this option). Use once per page, near the top.

**Show author on feature card** (`featureShowAuthor`, on by default; shown in the dialog only while Display as teaser and First card as feature are on) decides whether the feature card shows that lockup. Off: the feature card has no author (a clean hero layout) and the Authors sheet isn't loaded; the page's `author-id` and the other cards don't change (they never show an author), nor does the author elsewhere (Page Header, other Lists). Lists authored before have no value and show the author, as before. The Cards block has no authors, so it has no such option.

```text
[Screenshot Placeholder]

File name:
list-feature-mobile.png

Purpose:
The feature card at 402px stacked above the remaining cards.

Annotations:
A = Feature image
B = Author lockup
C = Remaining cards
```

#### Rows of links (Display as teaser off)

Rows with eyebrow or content type and a tag, a large title, the description, the date and a circle arrow (`aria-hidden`, `icons/circle-arrow.svg`: a 40px circle with a 2px stroke in a 48px box at the right, #D9D9D9), class `links`; hover or focus anywhere on a row only turns the circle and arrow #1E1E1E (300ms ease-out, no movement; the light text colour on Dark backgrounds), the title stays #0C0C0D without an underline; Style option `dividers` adds lines between rows (Figma 5 News). Use for news and press lists; not for visual teasers.

#### Grid and horizontal scroll per breakpoint

Each breakpoint is independently a grid (`{bp}Columns`) or a scroller (`{bp}Visible` or `{bp}CardWidth`), so all eight combinations exist (e.g. grid / grid / scroll: Figma 1, 4, 6, 10; scroll everywhere: Figma 3, 8, 9). Optional previous / next buttons and a scroll indicator per breakpoint; scroll snap (start / center), hidden scrollbar, mouse drag, keyboard scrolling, scroll step (one card / viewport), loop, initial item and edge (bleed / none) are shared.

```text
[Screenshot Placeholder]

File name:
list-scroll-tablet.png

Purpose:
A tablet rail with previous / next buttons and the indicator (tabletControls and tabletIndicator on).

Annotations:
A = Partly visible next card
B = Previous / Next buttons
C = Scroll indicator
```

#### Style options and fallback items

- **Style options** (`classes`): `stat-compact`, `dividers`, `header-center` (centred header).
- **Fallback items:** with "When there are no items" = Show the fallback items, a Child pages or Tagged pages list without matches shows its List Items instead (built as a Fixed list).

#### Figma variations

| Figma variation | Configuration |
|---|---|
| 1 Themes | Panel, item colours (dark, brand, image), grid / grid / scroll + mobile indicator |
| 2 Insight & Opinion | Mixed, First card as feature, 1:1 images, CTA text link, grid 4 / 4 / 1 |
| 3 Related | Mixed, scroll everywhere, edge bleed |
| 4 Intelligence in Action | Image 1:1, description, 3 / 3 columns, mobile scroll |
| 5 News | Display as teaser off (rows of links), primary CTA, `dividers` |
| 6 At a glance / 10 Banking today | Statistic, grey / brand, mobile scroll |
| 7, 12 Statements | Statistic + `stat-compact`, 3 columns, items' CTA |
| 8 Media coverage / 9 Investor relations | Mixed, scroll everywhere (report cards: navy colour) |
| 11 2-up | Image 1:1, 2 / 2 / 1 columns |
| 13 4-up colours | Statistic, item colours (brand, gradient, mid-grey, brand-light) |
| 14 | Statistic (the old design's edge-to-edge row isn't reproduced: content width) |

#### Legacy list (compatibility)

Lists made before the key-value model (a title and a CTA in positional rows) render as before with the class `list-legacy`: the header only, no items.

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
