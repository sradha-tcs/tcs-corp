---
id: "DEV-V-filter-list"
title: "Filter List Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/filter-list/_filter-list.json"]
relatedComponents: ["filter-list"]
relatedPages: ["/design-block-master/en/block-library/filter-list","/design-block-master/en/block-library/filter-list/content-types","/design-block-master/en/block-library/filter-list/filter-list","/design-block-master/en/block-library/filter-list/filters","/design-block-master/en/block-library/filter-list/insights-listing","/design-block-master/en/block-library/filter-list/layouts-and-card-styles","/design-block-master/en/block-library/filter-list/rules"]
confidence: "Medium"
primary: false
---

# Filter List Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-filter-list |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Filter List block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/filter-list/_filter-list.json |
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
| `filter-list` | Default layout (`layout`) | Content | No | Masonry = `masonry`; Grid = `grid`; List = `list` | `masonry` |
| `filter-list` | Datasource (`source`) | Content | No | Query Index = `query-index`; Manual List = `manual` | `query-index` |
| `filter-list` | Page types (`pageTypes`) | Content | Yes | Article = `article`; Blog = `blog`; Press release = `press-release` | — |
| `filter-list` | Content types (`contentTypes`) | Content | Yes | Article = `article`; Blog = `blog`; Insights = `insights`; Case study = `case-study`; Whitepaper = `whitepaper`; Report = `report`; News = `news`; Event = `event`; Press release = `press-release` | — |
| `filter-list` | Sort by (`sortBy`) | Content | No | Latest First = `latest`; Featured First = `featured`; Priority = `priority`; Alphabetical = `alphabetical` | `latest` |
| `filter-list` | Filter logic (`filterLogic`) | Content | No | AND = `and`; OR = `or` | `and` |
| `filter-list` | Card style (`cardStyle`) | Cards | No | Default = `default`; Compact = `compact`; Featured = `featured`; Mixed = `mixed` | `mixed` |
| `filter-list` | Featured rule (`featuredRule`) | Cards | No | Marked as featured (featured metadata) = `featured`; Priority 1 to 3 (priority metadata) = `priority`; Manual = `manual` | `featured` |
| `filter-list` | Hero rule (`heroRule`) | Cards | No | Latest = `latest`; Featured = `featured`; Manual = `manual` | `featured` |
| `filter-list-page` | Use (`pageRole`) | Page | No | Listed (Manual List) = `listed`; Featured = `featured` | `listed` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Filter List blocks on the published block library pages (7 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| filter-list | Default layout | Masonry | `masonry` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Default layout | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Default layout | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Datasource | Query Index | `query-index` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Datasource | Manual List | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Page types | Article | `article` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Page types | Blog | `blog` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Page types | Press release | `press-release` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | Article | `article` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | Blog | `blog` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | Insights | `insights` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | Case study | `case-study` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | Whitepaper | `whitepaper` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | Report | `report` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | News | `news` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | Event | `event` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Content types | Press release | `press-release` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Sort by | Latest First | `latest` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Sort by | Featured First | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Sort by | Priority | `priority` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Sort by | Alphabetical | `alphabetical` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Filter logic | AND | `and` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Filter logic | OR | `or` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Card style | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Card style | Compact | `compact` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Card style | Featured | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Card style | Mixed | `mixed` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Featured rule | Marked as featured (featured metadata) | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Featured rule | Priority 1 to 3 (priority metadata) | `priority` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Featured rule | Manual | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Hero rule | Latest | `latest` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Hero rule | Featured | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | Hero rule | Manual | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list-page | Use | Listed (Manual List) | `listed` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list-page | Use | Featured | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Layout: Masonry

| Aspect | Detail |
| ------ | ------ |
| Purpose | Cards of different heights packed in columns without row gaps, in reading order |
| When to use / not | Mixed content with varying card heights; not when rows must align (Grid) |
| Fields / dialog | Default layout = Masonry (the default) |
| Rendering | `div.filter-list-grid.layout-masonry` with `masonry-native` (CSS `grid-template-rows: masonry` where supported) or `masonry-spans` (`decorators/masonry-decorator.js` sets each card's row span; spotlights start below every column) |
| Desktop / tablet / mobile | 4 columns from 1200px (3 for Featured style), 3 from 900px (2 for Featured), 2 from 600px, 1 below |
| Accessibility / data layer | DOM order is the reading order across columns; as the block |
| Personalization / fallback | None; without masonry support and `ResizeObserver` the grid stays a plain grid |

```text
[Screenshot Placeholder]

File name:
filter-list-layout-masonry-tablet.png

Purpose:
The masonry layout at 768px: two columns of cards packed by height.

Annotations:
A = Column 1
B = Column 2
```

#### Layout: Grid

| Aspect | Detail |
| ------ | ------ |
| Purpose | Aligned rows of cards |
| When to use / not | Uniform cards (Default, Compact); not for very uneven heights |
| Fields / dialog | Default layout = Grid |
| Rendering | `div.filter-list-grid.layout-grid`; block class `layout-grid` |
| Desktop / tablet / mobile | Same column counts as Masonry |
| Accessibility / data layer | As the block |
| Personalization / fallback | None |

```text
[Screenshot Placeholder]

File name:
filter-list-layout-grid-mobile.png

Purpose:
The grid layout at 375px: one column of cards.

Annotations:
A = Card
```

#### Layout: List

| Aspect | Detail |
| ------ | ------ |
| Purpose | One card per row with a divider, for scanning titles |
| When to use / not | Text-led lists; not for image-led walls |
| Fields / dialog | Default layout = List |
| Rendering | Block class `layout-list`; cards (not spotlights) get a bottom border; from 600px a card with an image shows it in the left third and the text in the right two thirds |
| Desktop / tablet / mobile | One column at every width; image beside the text from 600px, above it below |
| Accessibility / data layer | As the block |
| Personalization / fallback | Cards without an image take the full row |

```text
[Screenshot Placeholder]

File name:
filter-list-layout-list-mobile.png

Purpose:
The list layout at 375px: image above the text, divider below each card.

Annotations:
A = Card image
B = Card text
C = Divider
```

#### Card style: Default

| Aspect | Detail |
| ------ | ------ |
| Purpose | Image, tag line, title link, description (3 lines) and meta line on every card |
| Fields / dialog | Card style = Default |
| Rendering | `article.filter-list-card-standard`; 4:3 image (`object-fit: cover`); the title link covers the card |
| Desktop / tablet / mobile | 4 / 3 / 2 / 1 columns (1200 / 900 / 600 / below) |
| Accessibility | One link per card (the title); images decorative (empty alt) |
| Data layer | Card link `cmp:click` |
| Personalization / fallback | No image: no media area |

```text
[Screenshot Placeholder]

File name:
filter-list-card-default-mobile.png

Purpose:
A Default card at 375px: image, tag line, title, description and meta line.

Annotations:
A = Image
B = Tag line
C = Title link
D = Description
E = Meta line
```

#### Card style: Compact

| Aspect | Detail |
| ------ | ------ |
| Purpose | Text-only outlined cards: tag line, title link, meta line |
| Fields / dialog | Card style = Compact |
| Rendering | `article.filter-list-card-compact`; no image or description |
| Desktop / tablet / mobile | 4 / 3 / 2 / 1 columns |
| Accessibility / data layer | As Default |
| Personalization / fallback | None |

```text
[Screenshot Placeholder]

File name:
filter-list-card-compact-tablet.png

Purpose:
Compact cards at 768px in two columns.

Annotations:
A = Compact card outline
B = Title link
```

#### Card style: Featured

| Aspect | Detail |
| ------ | ------ |
| Purpose | Large cards with image, tag line, title, description, meta line and a Read more button |
| Fields / dialog | Card style = Featured |
| Rendering | `article.filter-list-card-large`; the Read more link (placeholder `readMore`, `aria-label` "Read more: {title}") covers the card |
| Desktop / tablet / mobile | 3 columns from 1200px, 2 from 900px, 2 from 600px, 1 below |
| Accessibility | The button's accessible name includes the page title |
| Data layer | `cmp:click` with `dc:title` = the `aria-label` |
| Personalization / fallback | No image: no media area |

```text
[Screenshot Placeholder]

File name:
filter-list-card-featured-mobile.png

Purpose:
A Featured style card at 375px with its Read more button.

Annotations:
A = Image
B = Read more button
```

#### Card style: Mixed

| Aspect | Detail |
| ------ | ------ |
| Purpose | A varied wall (the default style): image cards without description, report panels and dark panels |
| Fields / dialog | Card style = Mixed |
| Rendering | Report card (`filter-list-card-report`, light brand gradient, Download secondary button, placeholder `download`) when the eyebrow value contains "report"; dark card (`filter-list-card-dark`, brand dark panel, first tag only, Explore tertiary button, placeholder `explore`) when the page has no image; else a standard image card without description |
| Desktop / tablet / mobile | 4 / 3 / 2 / 1 columns |
| Accessibility | Button names "Download: {title}" / "Explore: {title}"; check contrast of the panels with real content |
| Data layer | `cmp:click` on the button |
| Personalization / fallback | Pages without images become dark cards |

```text
[Screenshot Placeholder]

File name:
filter-list-card-mixed-mobile.png

Purpose:
The Mixed style at 375px: an image card, a report panel and a dark panel in one column.

Annotations:
A = Image card
B = Report panel with Download
C = Dark panel with Explore
```

#### Hero spotlight

| Aspect | Detail |
| ------ | ------ |
| Purpose | One large spotlight card above the cards |
| Fields / dialog | Enable hero card on; Hero rule Latest / Featured / Manual (Hero page) |
| Rules | Latest: the newest matching page. Featured: the featured matching page with the lowest priority, else the newest. Manual: the Hero page if it matches the source and current filters, else no hero |
| Rendering | `article.filter-list-card-spotlight.filter-list-card-hero` before the grid: image behind (1600px from 900px, 750px below, loaded eagerly), tag line, title link, description, author lockup (Authors sheet) |
| Desktop / tablet / mobile | Full width, at least 35rem high; title 3rem and larger padding from 900px |
| Accessibility | Title link; decorative image |
| Data layer | Card link `cmp:click` |
| Personalization / fallback | The hero follows the filters (it is chosen from the matching pages) |

```text
[Screenshot Placeholder]

File name:
filter-list-hero-mobile.png

Purpose:
The hero spotlight at 375px with its tag line, title, description and author lockup.

Annotations:
A = Hero image
B = Title link
C = Author lockup
```

#### Featured spotlights

| Aspect | Detail |
| ------ | ------ |
| Purpose | Large spotlight cards placed between pages of cards |
| Fields / dialog | Enable featured cards on (default); Featured rule: Marked as featured / Priority 1 to 3 / Manual (Filter Page, Use = Featured); Featured card count (default 2) |
| Rules | Marked as featured: featured pages by priority, else (none) pages with priority 1 to 3. Priority 1 to 3: those pages by priority. Manual: the featured pages that match, in authored order. At most the count |
| Placement | One spotlight after the first page of cards and after each Load more; once every standard card is shown, the rest follow |
| Rendering | `article.filter-list-card-spotlight.filter-list-card-featured` (full width, at least 30rem); like the hero without description, image lazy |
| Accessibility / data layer | As the hero |
| Personalization / fallback | No matching page: no spotlight |

```text
[Screenshot Placeholder]

File name:
filter-list-featured-tablet.png

Purpose:
A featured spotlight at 768px after the first page of cards.

Annotations:
A = Cards of the first page
B = Featured spotlight
C = Load more
```

#### Datasource: Query Index

| Aspect | Detail |
| ------ | ------ |
| Purpose | Automatic list from published pages |
| Fields / dialog | Datasource = Query Index; Root path, Page types, Content types, Sort by |
| Rendering | Candidates below the Root path, current page excluded, filtered by type, sorted |
| Desktop / tablet / mobile | Per layout |
| Accessibility / data layer | As the block |
| Personalization / fallback | No index (AEM author, editor): the editor hint; no matching page: "No resources found." |

```text
[Screenshot Placeholder]

File name:
filter-list-source-query-index-mobile.png

Purpose:
A Query Index Filter List at 375px sorted Latest First.

Annotations:
A = Newest card
```

#### Datasource: Manual List

| Aspect | Detail |
| ------ | ------ |
| Purpose | A hand-picked, ordered list with the same cards and filters |
| Fields / dialog | Datasource = Manual List; Filter Page items with Use = Listed |
| Rendering | The pages in item order, only those in the locale's index; Sort by, Root path and types not applied |
| Desktop / tablet / mobile | Per layout |
| Accessibility / data layer | As the block |
| Personalization / fallback | A page not in the index is left out |

```text
[Screenshot Placeholder]

File name:
filter-list-source-manual-mobile.png

Purpose:
A Manual List at 375px in the authored order.

Annotations:
A = First authored page
```

#### Filter pills (single or multi select)

| Aspect | Detail |
| ------ | ------ |
| Purpose | Quick filtering by a few tags |
| Fields / dialog | Filter Tag items or Primary filter category; Show All filter; Allow multi select |
| Rendering | `div.filter-list-filters[role="group"]` (name from `filters`) with `button.filter-list-filter[aria-pressed]`, `aria-controls` on the results; a "Filters" label before them |
| Desktop / tablet / mobile | From 900px the pills sit on the toolbar row; below, on their own row below the label and the filter button |
| Accessibility | Toggle buttons with `aria-pressed`; result count in a live region |
| Data layer | `cmp:click`, `interaction` `filter`, `value` tag ID or `all` |
| Personalization / fallback | No pills when there are no tags and Show All is off |

```text
[Screenshot Placeholder]

File name:
filter-list-pills-mobile.png

Purpose:
The pills at 375px wrapping below the Filters label and the filter button, one pill pressed.

Annotations:
A = Filters label
B = Pressed pill
C = Filter button
```

#### Advanced filter (AND or OR)

| Aspect | Detail |
| ------ | ------ |
| Purpose | Filtering by several taxonomy groups |
| Fields / dialog | Enable advanced filter (default on); Filter Category items; Filter logic AND (default) / OR |
| Rendering | Round filter button (`icons/filter.svg`, name from `advancedFilters`, `aria-expanded`, `aria-controls`, a count badge) and `div.filter-list-panel[role="region"]` with a `fieldset` and `legend` per category, checkboxes and Clear all |
| Desktop / tablet / mobile | From 600px the fieldsets sit side by side (auto-fit, at least 12rem); below, stacked |
| Accessibility | Opening focuses the first checkbox; Escape closes and returns focus to the button; Clear all returns focus to the first checkbox |
| Data layer | `cmp:change`, `interaction` `filter-option`, `value` tag ID, `checked` |
| Personalization / fallback | No used tags below a root: the category is left out |

```text
[Screenshot Placeholder]

File name:
filter-list-advanced-tablet.png

Purpose:
The open panel at 768px with two categories side by side and Clear all.

Annotations:
A = Industry fieldset
B = Topic fieldset
C = Clear all
```

#### Sort order

| Aspect | Detail |
| ------ | ------ |
| Purpose | Order of the Query Index list |
| Fields / dialog | Sort by: Latest First (default), Featured First, Priority, Alphabetical |
| Rendering | See the field notes above; no effect on a Manual List |
| Desktop / tablet / mobile | Per layout (masonry keeps the order across columns) |
| Accessibility / data layer | As the block |
| Personalization / fallback | Pages without date or priority sort last within their rule |

```text
[Screenshot Placeholder]

File name:
filter-list-sort-alphabetical-mobile.png

Purpose:
The Alphabetical order at 375px.

Annotations:
A = First card A to Z
```

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
