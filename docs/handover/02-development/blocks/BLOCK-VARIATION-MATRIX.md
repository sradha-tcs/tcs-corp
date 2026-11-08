---
id: "DEV-B-VAR"
title: "Block Variation Matrix"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["component-models.json"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: false
---

# Block Variation Matrix

| Attribute | Value |
| --- | --- |
| Document ID | DEV-B-VAR |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every presentation option of every block, supported by the model, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | component-models.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Summary](#summary)
- [Matrix](#matrix)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Summary

| Measure | Value |
| --- | --- |
| Options (excluding the common Additional tab) | 1202 |
| Class options shown in the block library | 43 |
| Class options not shown in the block library | 6 |
| Options not checkable from classes | 1035 |

Categories of the master prompt: every option listed is **Supported** (in the model and read by the code). Duplicate, deprecated, legacy and invalid options: none identified from the models (legacy *properties* are listed in the Universal Editor model guide). "Represented in the block library but not supported by code": not determinable from classes alone (Not recorded).

## Matrix

| Block | Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- | --- |
| button-block | button-block | View | Button | `button` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | View | Icon | `icon` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | View | Link | `link` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Type | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Type | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Type | Tertiary | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Icon | Arrow right | `arrow-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Icon | Chevron right | `chevron-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Icon | Chevron down | `chevron-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Icon | Search | `search` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Alignment | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Text Decoration | Default | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Text Decoration | Overline | `overline` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Text Decoration | line-Through | `line-through` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Text Decoration | Underline | `underline` | Supported (in the model) | Not checkable (data attribute / field value) |
| button-block | button-block | Text Decoration | underline overline | `underline overline` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Heading type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Heading type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Heading type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Heading type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Heading type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | CTA style | Text link | `""` | Supported (in the model) | n/a (default) |
| cards | cards | CTA style | Primary button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | CTA style | Secondary button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card style | Image card | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card style | Panel | `panel` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card style | Report | `report` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card style | Statistic | `stat` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card style | Mixed | `mixed` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card colour | Default for the style | `""` | Supported (in the model) | n/a (default) |
| cards | cards | Card colour | Dark | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card colour | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card colour | Brand blue | `brand` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card colour | Light blue | `brand-light` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card colour | Light grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card colour | Mid grey | `mid-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card colour | Grey gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Card colour | Image background | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Image ratio | 16:9 | `16-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Image ratio | 1:1 | `1-1` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Image ratio | 4:3 | `4-3` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Image ratio | 3:2 | `3-2` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Panel height | Portrait (2:3) | `portrait` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Panel height | Compact | `compact` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Panel height | Content | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Date format | 04 Sep 26 | `dd-mmm-yy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Date format | 04-09-2026 | `dd-mm-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Date format | 09-04-2026 | `mm-dd-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Date format | Sep 4, 2026 | `mmm-d-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Date format | 04/09/26 | `dd/mm/yy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Date format | 4th September 2026 | `do-mmmm-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Image loading | Lazy | `lazy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Image loading | Eager (first screen) | `eager` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Desktop display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Desktop display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Tablet display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Tablet display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Mobile display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Mobile display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Snap alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Snap alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Scroll step | One card | `one-card` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Scroll step | Viewport | `viewport` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Edge | Cards run to the edge | `bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Edge | Inside the content width | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | When there are no cards | Hide the block | `hide` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | When there are no cards | Show a message | `message` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | cards | Style options | Compact statistic title | `stat-compact` | Supported (in the model) | Yes |
| cards | cards | Style options | Dividers between rows | `dividers` | Supported (in the model) | Yes |
| cards | cards | Style options | Header centred | `header-center` | Supported (in the model) | Yes |
| cards | card | Open in a new tab | As the block | `""` | Supported (in the model) | n/a (default) |
| cards | card | Open in a new tab | Yes | `true` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Open in a new tab | No | `false` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card style | As the block | `""` | Supported (in the model) | n/a (default) |
| cards | card | Card style | Image card | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card style | Panel | `panel` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card style | Report | `report` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card style | Statistic | `stat` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card colour | As the block | `""` | Supported (in the model) | n/a (default) |
| cards | card | Card colour | Dark | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card colour | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card colour | Brand blue | `brand` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card colour | Light blue | `brand-light` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card colour | Light grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card colour | Mid grey | `mid-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card colour | Grey gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| cards | card | Card colour | Image background | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Style | Columns Container | `columns-container-section` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Style | Highlight | `highlight` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | BG Color | Grey | `bg-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | BG Color | Dark | `bg-dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | BG Color | Dark green | `bg-dark-green` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | BG Color | Navy | `bg-navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Width Type | Full Width | `full-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Width Type | Fixed Width | `fixed-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Columns per row | Automatic | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Columns per row | 1 | `1` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Columns per row | 2 | `2` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Columns per row | 3 | `3` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Columns per row | 4 | `4` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Gap | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Gap | Small | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Gap | Medium | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Gap | Large | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Vertical alignment | Top | `top` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Vertical alignment | Middle | `middle` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Vertical alignment | Bottom | `bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Vertical alignment | Stretch (equal heights) | `stretch` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Side by side from | Tablet (600px) | `tablet` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Side by side from | Desktop (900px) | `desktop` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Side by side from | Large desktop (1200px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | None | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Animation Type | Fade in | `motion-fade-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Fade up | `motion-fade-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Fade down | `motion-fade-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Fade left | `motion-fade-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Fade right | `motion-fade-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Slide up | `motion-slide-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Slide down | `motion-slide-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Slide left | `motion-slide-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Slide right | `motion-slide-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Type | Scale in | `motion-scale-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Motion Speed | Medium | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Motion Speed | Fast | `motion-fast` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Motion Speed | Slow | `motion-slow` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Animation Trigger | On Scroll / Viewport Entry | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Animation Trigger | On Page Load | `motion-on-load` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Padding left | 0 (none) | `pl-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 0.25rem (space-100) | `pl-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 0.5rem (space-200) | `pl-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 0.75rem (space-300) | `pl-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 1rem (space-400) | `pl-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 1.25rem (space-500) | `pl-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 1.5rem (space-600) | `pl-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 2rem (space-800) | `pl-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 2.5rem (space-1000) | `pl-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 3rem (space-1200) | `pl-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 4rem (space-1600) | `pl-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 5rem (space-2000) | `pl-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 6rem (space-2400) | `pl-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding left | 7.5rem (space-3000) | `pl-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Padding right | 0 (none) | `pr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 0.25rem (space-100) | `pr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 0.5rem (space-200) | `pr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 0.75rem (space-300) | `pr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 1rem (space-400) | `pr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 1.25rem (space-500) | `pr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 1.5rem (space-600) | `pr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 2rem (space-800) | `pr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 2.5rem (space-1000) | `pr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 3rem (space-1200) | `pr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 4rem (space-1600) | `pr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 5rem (space-2000) | `pr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 6rem (space-2400) | `pr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding right | 7.5rem (space-3000) | `pr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Padding top | 0 (none) | `pt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 0.25rem (space-100) | `pt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 0.5rem (space-200) | `pt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 0.75rem (space-300) | `pt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 1rem (space-400) | `pt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 1.25rem (space-500) | `pt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 1.5rem (space-600) | `pt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 2rem (space-800) | `pt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 2.5rem (space-1000) | `pt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 3rem (space-1200) | `pt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 4rem (space-1600) | `pt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 5rem (space-2000) | `pt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 6rem (space-2400) | `pt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding top | 7.5rem (space-3000) | `pt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Padding bottom | 0 (none) | `pb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 0.25rem (space-100) | `pb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 0.5rem (space-200) | `pb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 0.75rem (space-300) | `pb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 1rem (space-400) | `pb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 1.25rem (space-500) | `pb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 1.5rem (space-600) | `pb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 2rem (space-800) | `pb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 2.5rem (space-1000) | `pb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 3rem (space-1200) | `pb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 4rem (space-1600) | `pb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 5rem (space-2000) | `pb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 6rem (space-2400) | `pb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Padding bottom | 7.5rem (space-3000) | `pb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Margin left | 0 (none) | `ml-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 0.25rem (space-100) | `ml-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 0.5rem (space-200) | `ml-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 0.75rem (space-300) | `ml-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 1rem (space-400) | `ml-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 1.25rem (space-500) | `ml-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 1.5rem (space-600) | `ml-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 2rem (space-800) | `ml-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 2.5rem (space-1000) | `ml-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 3rem (space-1200) | `ml-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 4rem (space-1600) | `ml-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 5rem (space-2000) | `ml-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 6rem (space-2400) | `ml-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin left | 7.5rem (space-3000) | `ml-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Margin right | 0 (none) | `mr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 0.25rem (space-100) | `mr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 0.5rem (space-200) | `mr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 0.75rem (space-300) | `mr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 1rem (space-400) | `mr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 1.25rem (space-500) | `mr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 1.5rem (space-600) | `mr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 2rem (space-800) | `mr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 2.5rem (space-1000) | `mr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 3rem (space-1200) | `mr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 4rem (space-1600) | `mr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 5rem (space-2000) | `mr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 6rem (space-2400) | `mr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin right | 7.5rem (space-3000) | `mr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Margin top | 0 (none) | `mt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 0.25rem (space-100) | `mt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 0.5rem (space-200) | `mt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 0.75rem (space-300) | `mt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 1rem (space-400) | `mt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 1.25rem (space-500) | `mt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 1.5rem (space-600) | `mt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 2rem (space-800) | `mt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 2.5rem (space-1000) | `mt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 3rem (space-1200) | `mt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 4rem (space-1600) | `mt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 5rem (space-2000) | `mt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 6rem (space-2400) | `mt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin top | 7.5rem (space-3000) | `mt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | columns-container | Margin bottom | 0 (none) | `mb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 0.25rem (space-100) | `mb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 0.5rem (space-200) | `mb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 0.75rem (space-300) | `mb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 1rem (space-400) | `mb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 1.25rem (space-500) | `mb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 1.5rem (space-600) | `mb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 2rem (space-800) | `mb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 2.5rem (space-1000) | `mb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 3rem (space-1200) | `mb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 4rem (space-1600) | `mb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 5rem (space-2000) | `mb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 6rem (space-2400) | `mb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | columns-container | Margin bottom | 7.5rem (space-3000) | `mb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas | Canvas Style | Default | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | conversation-canvas | Canvas Style | Primary (sticky) | `primary` | Supported (in the model) | Yes |
| conversation-canvas | conversation-canvas | Canvas Style | Secondary | `secondary` | Supported (in the model) | Yes |
| conversation-canvas | conversation-canvas | Floating journey | Floats and docks | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | conversation-canvas | Floating journey | Stays in place | `nofloat` | Supported (in the model) | Yes |
| conversation-canvas | conversation-canvas | Quick actions | Auto | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | conversation-canvas | Quick actions | Pills | `action-pills` | Supported (in the model) | Yes |
| conversation-canvas | conversation-canvas | Quick actions | Buttons | `action-buttons` | Supported (in the model) | Yes |
| conversation-canvas | conversation-canvas | BG Style | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas | BG Style | Dark (Primary) | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas | Title Type | Default | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | conversation-canvas | Title Type | Bigger Title | `bigger` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas | Title Type | Medium Title | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas | Navigation style | Pills | `""` | Supported (in the model) | n/a (default) |
| conversation-canvas | conversation-canvas | Navigation style | Text links | `text-links` | Supported (in the model) | Yes |
| conversation-canvas | conversation-canvas | Search bar › Search bar button icon type | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas | Search bar › Search bar button icon type | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas | Search bar › Search bar button icon type | Tertiary | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Views | Button | `button` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Views | Icon | `icon` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Views | Link | `link` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Type | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Type | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Type | Tertiary | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Icon | Arrow right | `arrow-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Icon | Chevron right | `chevron-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Icon | Chevron down | `chevron-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| conversation-canvas | conversation-canvas-button | Icon | Search | `search` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Default layout | Masonry | `masonry` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Default layout | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Default layout | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Datasource | Query Index | `query-index` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Datasource | Manual List | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Page types | Article | `article` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Page types | Blog | `blog` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Page types | Press release | `press-release` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | Article | `article` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | Blog | `blog` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | Insights | `insights` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | Case study | `case-study` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | Whitepaper | `whitepaper` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | Report | `report` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | News | `news` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | Event | `event` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Content types | Press release | `press-release` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Sort by | Latest First | `latest` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Sort by | Featured First | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Sort by | Priority | `priority` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Sort by | Alphabetical | `alphabetical` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Filter logic | AND | `and` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Filter logic | OR | `or` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Card style | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Card style | Compact | `compact` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Card style | Featured | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Card style | Mixed | `mixed` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Featured rule | Marked as featured (featured metadata) | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Featured rule | Priority 1 to 3 (priority metadata) | `priority` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Featured rule | Manual | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Hero rule | Latest | `latest` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Hero rule | Featured | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list | Hero rule | Manual | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list-page | Use | Listed (Manual List) | `listed` | Supported (in the model) | Not checkable (data attribute / field value) |
| filter-list | filter-list-page | Use | Featured | `featured` | Supported (in the model) | Not checkable (data attribute / field value) |
| footer | footer | Link List › Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| footer | footer | Link List › Link Type | Open in new window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| footer | footer-link | Open in | Same tab | `""` | Supported (in the model) | n/a (default) |
| footer | footer-link | Open in | New tab | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| form-variations | form-variations | Theme | Default | `""` | Supported (in the model) | n/a (default) |
| form-variations | form-variations | Theme | Dark | `dark` | Supported (in the model) | Yes |
| form-variations | field-text | Input Type | Text | `text` | Supported (in the model) | Not checkable (data attribute / field value) |
| form-variations | field-text | Input Type | Email | `email` | Supported (in the model) | Not checkable (data attribute / field value) |
| form-variations | field-text | Input Type | Tel | `tel` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Style | Default | `gen-carousel-section` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Navigation | Manual | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Navigation | Auto | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Navigation | Manual and Auto | `manual-auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | None | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Animation Type | Fade in | `motion-fade-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Fade up | `motion-fade-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Fade down | `motion-fade-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Fade left | `motion-fade-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Fade right | `motion-fade-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Slide up | `motion-slide-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Slide down | `motion-slide-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Slide left | `motion-slide-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Slide right | `motion-slide-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Type | Scale in | `motion-scale-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Motion Speed | Medium | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Motion Speed | Fast | `motion-fast` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Motion Speed | Slow | `motion-slow` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Animation Trigger | On Scroll / Viewport Entry | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Animation Trigger | On Page Load | `motion-on-load` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Padding left | 0 (none) | `pl-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 0.25rem (space-100) | `pl-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 0.5rem (space-200) | `pl-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 0.75rem (space-300) | `pl-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 1rem (space-400) | `pl-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 1.25rem (space-500) | `pl-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 1.5rem (space-600) | `pl-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 2rem (space-800) | `pl-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 2.5rem (space-1000) | `pl-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 3rem (space-1200) | `pl-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 4rem (space-1600) | `pl-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 5rem (space-2000) | `pl-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 6rem (space-2400) | `pl-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding left | 7.5rem (space-3000) | `pl-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Padding right | 0 (none) | `pr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 0.25rem (space-100) | `pr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 0.5rem (space-200) | `pr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 0.75rem (space-300) | `pr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 1rem (space-400) | `pr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 1.25rem (space-500) | `pr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 1.5rem (space-600) | `pr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 2rem (space-800) | `pr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 2.5rem (space-1000) | `pr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 3rem (space-1200) | `pr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 4rem (space-1600) | `pr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 5rem (space-2000) | `pr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 6rem (space-2400) | `pr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding right | 7.5rem (space-3000) | `pr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Padding top | 0 (none) | `pt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 0.25rem (space-100) | `pt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 0.5rem (space-200) | `pt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 0.75rem (space-300) | `pt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 1rem (space-400) | `pt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 1.25rem (space-500) | `pt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 1.5rem (space-600) | `pt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 2rem (space-800) | `pt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 2.5rem (space-1000) | `pt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 3rem (space-1200) | `pt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 4rem (space-1600) | `pt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 5rem (space-2000) | `pt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 6rem (space-2400) | `pt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding top | 7.5rem (space-3000) | `pt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Padding bottom | 0 (none) | `pb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 0.25rem (space-100) | `pb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 0.5rem (space-200) | `pb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 0.75rem (space-300) | `pb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 1rem (space-400) | `pb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 1.25rem (space-500) | `pb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 1.5rem (space-600) | `pb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 2rem (space-800) | `pb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 2.5rem (space-1000) | `pb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 3rem (space-1200) | `pb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 4rem (space-1600) | `pb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 5rem (space-2000) | `pb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 6rem (space-2400) | `pb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Padding bottom | 7.5rem (space-3000) | `pb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Margin left | 0 (none) | `ml-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 0.25rem (space-100) | `ml-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 0.5rem (space-200) | `ml-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 0.75rem (space-300) | `ml-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 1rem (space-400) | `ml-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 1.25rem (space-500) | `ml-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 1.5rem (space-600) | `ml-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 2rem (space-800) | `ml-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 2.5rem (space-1000) | `ml-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 3rem (space-1200) | `ml-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 4rem (space-1600) | `ml-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 5rem (space-2000) | `ml-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 6rem (space-2400) | `ml-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin left | 7.5rem (space-3000) | `ml-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Margin right | 0 (none) | `mr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 0.25rem (space-100) | `mr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 0.5rem (space-200) | `mr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 0.75rem (space-300) | `mr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 1rem (space-400) | `mr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 1.25rem (space-500) | `mr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 1.5rem (space-600) | `mr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 2rem (space-800) | `mr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 2.5rem (space-1000) | `mr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 3rem (space-1200) | `mr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 4rem (space-1600) | `mr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 5rem (space-2000) | `mr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 6rem (space-2400) | `mr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin right | 7.5rem (space-3000) | `mr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Margin top | 0 (none) | `mt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 0.25rem (space-100) | `mt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 0.5rem (space-200) | `mt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 0.75rem (space-300) | `mt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 1rem (space-400) | `mt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 1.25rem (space-500) | `mt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 1.5rem (space-600) | `mt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 2rem (space-800) | `mt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 2.5rem (space-1000) | `mt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 3rem (space-1200) | `mt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 4rem (space-1600) | `mt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 5rem (space-2000) | `mt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 6rem (space-2400) | `mt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin top | 7.5rem (space-3000) | `mt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | gen-carousel | Margin bottom | 0 (none) | `mb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 0.25rem (space-100) | `mb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 0.5rem (space-200) | `mb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 0.75rem (space-300) | `mb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 1rem (space-400) | `mb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 1.25rem (space-500) | `mb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 1.5rem (space-600) | `mb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 2rem (space-800) | `mb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 2.5rem (space-1000) | `mb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 3rem (space-1200) | `mb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 4rem (space-1600) | `mb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 5rem (space-2000) | `mb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 6rem (space-2400) | `mb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | gen-carousel | Margin bottom | 7.5rem (space-3000) | `mb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | Hero Image type | Default | `""` | Supported (in the model) | n/a (default) |
| hero | hero | Hero Image type | Lotto | `lottie` | Supported (in the model) | Yes |
| hero | hero | Hero View | Default | `""` | Supported (in the model) | n/a (default) |
| hero | hero | Hero View | Contained image | `media-contained` | Supported (in the model) | Yes |
| hero | hero | Title heading level | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | Title heading level | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA Text color | Default (Black) | `cta-text-black` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA Text color | White | `cta-text-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA Link Type | Default | `same-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA view | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA view | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA view | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › Primary CTA BG Color (Primary only) | Default | `primary-bg-default` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › Primary CTA BG Color (Primary only) | Blue-cyan (azure) | `primary-bg-azure` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › Secondary CTA BG Color (Secondary only) | Default (transparent) | `secondary-bg-default` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › Secondary CTA BG Color (Secondary only) | Light grey | `secondary-bg-light-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › Secondary CTA BG Color (Secondary only) | Black 40% | `secondary-bg-black-40` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › Secondary CTA Border color (Secondary only) | Default (as the BG Color) | `secondary-border-default` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › Secondary CTA Border color (Secondary only) | Black | `secondary-border-black` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › Secondary CTA Border color (Secondary only) | White | `secondary-border-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA Arrow | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | CTA List › CTA Arrow | Down | `down` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero | Vertical Alignment | Top | `align-top` | Supported (in the model) | Yes |
| hero | hero | Vertical Alignment | Middle | `align-middle` | Supported (in the model) | Yes |
| hero | hero | Vertical Alignment | Bottom | `align-bottom` | Supported (in the model) | Yes |
| hero | hero | Horizontal Alignment | Left | `align-left` | Supported (in the model) | Yes |
| hero | hero | Horizontal Alignment | Center | `align-center` | Supported (in the model) | Yes |
| hero | hero | Horizontal Alignment | Right | `align-right` | Supported (in the model) | Yes |
| hero | hero | Text Alignment | Left align | `text-left` | Supported (in the model) | Yes |
| hero | hero | Text Alignment | Center align | `text-center` | Supported (in the model) | Yes |
| hero | hero | Text Alignment | Right align | `text-right` | Supported (in the model) | Yes |
| hero | hero | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| hero | hero | BG Color | Light, no overlay | `bg-light` | Supported (in the model) | Yes |
| hero | hero | BG Color | Dark blue | `bg-dark` | Supported (in the model) | Yes |
| hero | hero | BG Color | Dark blue (subtle) | `bg-dark-subtle` | Supported (in the model) | Yes |
| hero | hero | BG Color | Black | `bg-black` | Supported (in the model) | Yes |
| hero | hero | BG Color | Charcoal Black 80 (cool charcoal) | `bg-charcoal-80` | Supported (in the model) | Yes |
| hero | hero | BG Color | Midnight Navy 60 | `bg-navy-60` | Supported (in the model) | Yes |
| hero | hero | BG Color | Charcoal Black 40 (deep charcoal) | `bg-charcoal-40` | Supported (in the model) | Yes |
| hero | hero | Icon color | Default (as authored) | `""` | Supported (in the model) | n/a (default) |
| hero | hero | Icon color | Black | `icon-black` | Supported (in the model) | No |
| hero | hero | Icon color | White | `icon-white` | Supported (in the model) | No |
| hero | hero | Icon color | Blue | `icon-blue` | Supported (in the model) | Yes |
| hero | hero | Icon color | Pale blue | `icon-pale-blue` | Supported (in the model) | Yes |
| hero | hero | Eyebrow color | Default (royal blue) | `""` | Supported (in the model) | n/a (default) |
| hero | hero | Eyebrow color | Royal blue | `eyebrow-royal-blue` | Supported (in the model) | No |
| hero | hero | Eyebrow color | Soft sky blue | `eyebrow-sky-blue` | Supported (in the model) | Yes |
| hero | hero-cta | CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| hero | hero-cta | CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero-cta | CTA view | Default | `""` | Supported (in the model) | n/a (default) |
| hero | hero-cta | CTA view | Primary | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero-cta | CTA view | Secondary | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero-cta | CTA Arrow | Auto (down for links to sections of this page) | `""` | Supported (in the model) | n/a (default) |
| hero | hero-cta | CTA Arrow | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| hero | hero-cta | CTA Arrow | Down | `down` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Title Type | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Title Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Title Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Title Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Title Type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Title Type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Primary CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Primary CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Primary CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Primary CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Secondary CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Secondary CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Secondary CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Secondary CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Title weight | Layout default | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Title weight | Regular | `title-regular` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Title weight | Semibold | `title-semibold` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Description size | Layout default | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Description size | Regular (18px) | `text-regular` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Description size | Large (24px) | `text-large` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage | Background color | Dark | `""` | Supported (in the model) | n/a (default) |
| image-collage | image-collage | Background color | Navy | `bg-navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage-item | Image treatment | Black and white | `black-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| image-collage | image-collage-item | Image treatment | Normal | `normal` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Heading type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Heading type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Heading type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Heading type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Heading type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | CTA style | Text link | `""` | Supported (in the model) | n/a (default) |
| list | list | CTA style | Primary button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | CTA style | Secondary button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | List source | Child pages | `parent` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | List source | Fixed list | `fixed` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | List source | Tagged pages | `tags` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Match | Any of the tags | `any` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Match | All of the tags | `all` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Order by | Manual (as authored; path order for pages) | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Order by | Title | `title` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Order by | Last modified | `lastModified` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Sort order | Ascending | `ascending` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Sort order | Descending | `descending` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card style | Image card | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card style | Panel | `panel` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card style | Report | `report` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card style | Statistic | `stat` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card style | Mixed | `mixed` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card colour | Default for the style | `""` | Supported (in the model) | n/a (default) |
| list | list | Card colour | Dark | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card colour | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card colour | Brand blue | `brand` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card colour | Light blue | `brand-light` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card colour | Light grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card colour | Mid grey | `mid-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card colour | Grey gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Card colour | Image background | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Image ratio | 16:9 | `16-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Image ratio | 1:1 | `1-1` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Image ratio | 4:3 | `4-3` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Image ratio | 3:2 | `3-2` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Panel height | Portrait (2:3) | `portrait` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Panel height | Compact | `compact` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Panel height | Content | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Date format | 04 Sep 26 | `dd-mmm-yy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Date format | 04-09-2026 | `dd-mm-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Date format | 09-04-2026 | `mm-dd-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Date format | Sep 4, 2026 | `mmm-d-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Date format | 04/09/26 | `dd/mm/yy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Date format | 4th September 2026 | `do-mmmm-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Image loading | Lazy | `lazy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Image loading | Eager (first screen) | `eager` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Desktop display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Desktop display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Tablet display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Tablet display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Mobile display | Grid | `grid` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Mobile display | Horizontal scroll | `horizontal-scroll` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Snap alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Snap alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Scroll step | One card | `one-card` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Scroll step | Viewport | `viewport` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Edge | Cards run to the edge | `bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Edge | Inside the content width | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | When there are no items | Hide the list | `hide` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | When there are no items | Show a message | `message` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | When there are no items | Show the fallback items | `fallback` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list | Style options | Compact statistic title | `stat-compact` | Supported (in the model) | Yes |
| list | list | Style options | Dividers between rows | `dividers` | Supported (in the model) | Yes |
| list | list | Style options | Header centred | `header-center` | Supported (in the model) | Yes |
| list | list-item | Open in a new tab | As the list | `""` | Supported (in the model) | n/a (default) |
| list | list-item | Open in a new tab | Yes | `true` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Open in a new tab | No | `false` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card style | As the list | `""` | Supported (in the model) | n/a (default) |
| list | list-item | Card style | Image card | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card style | Panel | `panel` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card style | Report | `report` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card style | Statistic | `stat` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card colour | As the list | `""` | Supported (in the model) | n/a (default) |
| list | list-item | Card colour | Dark | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card colour | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card colour | Brand blue | `brand` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card colour | Light blue | `brand-light` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card colour | Light grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card colour | Mid grey | `mid-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card colour | Grey gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| list | list-item | Card colour | Image background | `image` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | media-contacts | Title Type | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | media-contacts | Title Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | media-contacts | Title Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | media-contacts | Title Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | media-contacts | Title Type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| media-contacts | media-contacts | Title Type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header | Layout | Default (from the Page Type) | `""` | Supported (in the model) | n/a (default) |
| page-header | page-header | Layout | Landing (with the featured image) | `landing` | Supported (in the model) | Yes |
| page-header | page-header | Layout | Secondary (title left, text right) | `secondary` | Supported (in the model) | Yes |
| page-header | page-header | Layout | Article (meta row, author) | `article` | Supported (in the model) | Yes |
| page-header | page-header | Layout | Display (large title) | `display` | Supported (in the model) | Yes |
| page-header | page-header | CTA List › CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| page-header | page-header | CTA List › CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header | CTA List › CTA Link Style | Text link | `""` | Supported (in the model) | n/a (default) |
| page-header | page-header | CTA List › CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header | CTA List › CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header-cta | CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| page-header | page-header-cta | CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header-cta | CTA Link Style | Text link | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header-cta | CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header-cta | CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header-cta | Button background | Style default | `""` | Supported (in the model) | n/a (default) |
| page-header | page-header-cta | Button background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| page-header | page-header-cta | Button shape | Style default | `""` | Supported (in the model) | n/a (default) |
| page-header | page-header-cta | Button shape | Round | `button-round` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Title Type | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Title Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Title Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Title Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Title Type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Title Type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Image Position (Desktop) | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Image Position (Desktop) | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Image Position (Mobile) | Top | `top` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | Image Position (Mobile) | Bottom | `bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| quote | quote | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| quote | quote | BG Color | Grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Accessibility mode | Decorative (visual only) | `decorative` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Accessibility mode | Semantic (a thematic break) | `semantic` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Subtle | `subtle` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Strong | `strong` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Inset | `inset` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Full width | `full-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Dotted | `dotted` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Dashed | `dashed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator variant | Branded | `branded` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Theme | Auto (as the section) | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Theme | Light background | `light` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Theme | Dark background | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Theme | Brand background | `brand` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line style | As the variant | `""` | Supported (in the model) | n/a (default) |
| separator | separator | Line style | Solid | `solid` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line style | Dashed | `dashed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line style | Dotted | `dotted` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line style | Gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line style | None (spacing only) | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line thickness | As the variant | `""` | Supported (in the model) | n/a (default) |
| separator | separator | Line thickness | Thin (1px) | `thin` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line thickness | Medium (2px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line thickness | Thick (3px) | `thick` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line colour | As the variant | `""` | Supported (in the model) | n/a (default) |
| separator | separator | Line colour | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line colour | Subtle | `subtle` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line colour | Neutral | `neutral` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line colour | Strong | `strong` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line colour | Primary (brand) | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line colour | Secondary (light brand) | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line colour | Accent | `accent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line colour | Inverse (on dark) | `inverse` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line opacity | 25% | `25` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line opacity | 50% | `50` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line opacity | 75% | `75` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Line opacity | 100% | `100` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator width | As the variant | `""` | Supported (in the model) | n/a (default) |
| separator | separator | Separator width | 25% | `25-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator width | 50% | `50-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator width | 75% | `75-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator width | 100% | `100-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator width | Content width | `content-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Separator width | Full bleed (section edge to edge) | `full-bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Maximum width | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Maximum width | Small (320px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Maximum width | Medium (640px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Maximum width | Large (960px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Maximum width | Extra large (1280px) | `extra-large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Maximum width | Content container | `content-container` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Alignment | End | `end` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Start decoration | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Start decoration | Dot | `dot` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Start decoration | Square | `square` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Start decoration | Diamond | `diamond` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Center decoration | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Center decoration | Dot | `dot` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Center decoration | Square | `square` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Center decoration | Diamond | `diamond` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | End decoration | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | End decoration | Dot | `dot` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | End decoration | Square | `square` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | End decoration | Diamond | `diamond` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Background contrast | Standard | `standard` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Background contrast | High (stronger line) | `high` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop width | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop width | 25% | `25-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop width | 50% | `50-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop width | 75% | `75-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop width | 100% | `100-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop width | Content width | `content-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop width | Full bleed (section edge to edge) | `full-bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop thickness | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop thickness | Thin (1px) | `thin` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop thickness | Medium (2px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop thickness | Thick (3px) | `thick` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop alignment | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop alignment | End | `end` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet width | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet width | 25% | `25-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet width | 50% | `50-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet width | 75% | `75-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet width | 100% | `100-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet width | Content width | `content-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet width | Full bleed (section edge to edge) | `full-bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet thickness | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet thickness | Thin (1px) | `thin` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet thickness | Medium (2px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet thickness | Thick (3px) | `thick` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet alignment | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet alignment | End | `end` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile width | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile width | 25% | `25-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile width | 50% | `50-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile width | 75% | `75-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile width | 100% | `100-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile width | Content width | `content-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile width | Full bleed (section edge to edge) | `full-bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile thickness | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile thickness | Thin (1px) | `thin` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile thickness | Medium (2px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile thickness | Thick (3px) | `thick` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile alignment | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile alignment | End | `end` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop top spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Desktop bottom spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet top spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Tablet bottom spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile top spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Mobile bottom spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Animate on view | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Animate on view | Fade | `fade` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Animate on view | Draw from start | `draw-from-start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Animate on view | Draw from center | `draw-from-center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Reduced motion fallback | Show immediately | `static` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Reduced motion fallback | Short fade | `fade` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Print | Show when printed | `show` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | separator | Print | Hide when printed | `hide` | Supported (in the model) | Not checkable (data attribute / field value) |
| tab | tab | Columns per row | Automatic | `""` | Supported (in the model) | n/a (default) |
| tab | tab | Columns per row | 1 | `per-row-1` | Supported (in the model) | No |
| tab | tab | Columns per row | 2 | `per-row-2` | Supported (in the model) | Yes |
| tab | tab | Columns per row | 3 | `per-row-3` | Supported (in the model) | No |
| tab | tab | Columns per row | 4 | `per-row-4` | Supported (in the model) | No |
| table | table | Options | Border | `""` | Supported (in the model) | n/a (default) |
| table | table | Options | Header | `""` | Supported (in the model) | n/a (default) |
| table | table | Columns | 1 Column | `table` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | table | Columns | 2 Columns | `table-2-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | table | Columns | 3 Columns | `table-3-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | table | Columns | 4 Columns | `table-4-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | table | Columns | 5 Columns | `table-5-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | table | Columns | 6 Columns | `table-6-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | table | Columns | 7 Columns | `table-7-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | table | Columns | 8 Columns | `table-8-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table | table | Columns | 9 Columns | `table-9-columns` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Variation | Variation 1 - Title, description, arrow | `industries` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Variation | Variation 2 - Description, large title, button | `solutions` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Variation | Variation 3 - Description, number, large title, arrow | `products` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Variation | Variation 4 - Wide title, grey description, arrow (row hover) | `segments` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Variation | Variation 5 - Label, large description (steps) | `approach` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Variation | Variation 6 - Description, right-aligned title, small arrow | `platforms` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Background color | White (default) | `white` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Background color | Black | `black` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Background color | Dark Green | `dark-green` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Background color | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Heading Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Heading Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Heading Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Heading position | Above the list | `""` | Supported (in the model) | n/a (default) |
| table-list | table-list | Heading position | Beside the list | `beside` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Style | Variation default | `""` | Supported (in the model) | n/a (default) |
| table-list | table-list | Style | Filled button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Style | Outline button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Style | Text link | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Numbers | Variation default | `""` | Supported (in the model) | n/a (default) |
| table-list | table-list | Numbers | Show | `show` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Numbers | Show on mobile only | `mobile` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Numbers | Hide | `hide` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Item link | Variation default | `""` | Supported (in the model) | n/a (default) |
| table-list | table-list | Item link | Arrow | `arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Item link | Diagonal arrow | `arrow-up-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Item link | Circled arrow | `arrow-circle` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list | Item link | Button | `button` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list-card | Trademark | None | `""` | Supported (in the model) | n/a (default) |
| table-list | table-list-card | Trademark | ™ Trademark | `tm` | Supported (in the model) | Not checkable (data attribute / field value) |
| table-list | table-list-card | Trademark | ® Registered | `r` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Component | Tabs | `tabs-section` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Width Type | Full Width | `full-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Width Type | Fixed Width | `fixed-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Style | Underline | `underline` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Style | Boxed | `boxed` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Style | Pills | `pills` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Alignment | Full width (stretch) | `stretch` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Orientation | Horizontal | `horizontal` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Orientation | Vertical | `vertical` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | None | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Animation Type | Fade in | `motion-fade-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Fade up | `motion-fade-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Fade down | `motion-fade-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Fade left | `motion-fade-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Fade right | `motion-fade-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Slide up | `motion-slide-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Slide down | `motion-slide-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Slide left | `motion-slide-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Slide right | `motion-slide-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Type | Scale in | `motion-scale-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Motion Speed | Medium | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Motion Speed | Fast | `motion-fast` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Motion Speed | Slow | `motion-slow` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Animation Trigger | On Scroll / Viewport Entry | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Animation Trigger | On Page Load | `motion-on-load` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Padding left | 0 (none) | `pl-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 0.25rem (space-100) | `pl-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 0.5rem (space-200) | `pl-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 0.75rem (space-300) | `pl-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 1rem (space-400) | `pl-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 1.25rem (space-500) | `pl-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 1.5rem (space-600) | `pl-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 2rem (space-800) | `pl-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 2.5rem (space-1000) | `pl-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 3rem (space-1200) | `pl-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 4rem (space-1600) | `pl-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 5rem (space-2000) | `pl-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 6rem (space-2400) | `pl-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding left | 7.5rem (space-3000) | `pl-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Padding right | 0 (none) | `pr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 0.25rem (space-100) | `pr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 0.5rem (space-200) | `pr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 0.75rem (space-300) | `pr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 1rem (space-400) | `pr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 1.25rem (space-500) | `pr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 1.5rem (space-600) | `pr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 2rem (space-800) | `pr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 2.5rem (space-1000) | `pr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 3rem (space-1200) | `pr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 4rem (space-1600) | `pr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 5rem (space-2000) | `pr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 6rem (space-2400) | `pr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding right | 7.5rem (space-3000) | `pr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Padding top | 0 (none) | `pt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 0.25rem (space-100) | `pt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 0.5rem (space-200) | `pt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 0.75rem (space-300) | `pt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 1rem (space-400) | `pt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 1.25rem (space-500) | `pt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 1.5rem (space-600) | `pt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 2rem (space-800) | `pt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 2.5rem (space-1000) | `pt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 3rem (space-1200) | `pt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 4rem (space-1600) | `pt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 5rem (space-2000) | `pt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 6rem (space-2400) | `pt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding top | 7.5rem (space-3000) | `pt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Padding bottom | 0 (none) | `pb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 0.25rem (space-100) | `pb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 0.5rem (space-200) | `pb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 0.75rem (space-300) | `pb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 1rem (space-400) | `pb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 1.25rem (space-500) | `pb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 1.5rem (space-600) | `pb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 2rem (space-800) | `pb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 2.5rem (space-1000) | `pb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 3rem (space-1200) | `pb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 4rem (space-1600) | `pb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 5rem (space-2000) | `pb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 6rem (space-2400) | `pb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Padding bottom | 7.5rem (space-3000) | `pb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Margin left | 0 (none) | `ml-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 0.25rem (space-100) | `ml-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 0.5rem (space-200) | `ml-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 0.75rem (space-300) | `ml-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 1rem (space-400) | `ml-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 1.25rem (space-500) | `ml-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 1.5rem (space-600) | `ml-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 2rem (space-800) | `ml-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 2.5rem (space-1000) | `ml-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 3rem (space-1200) | `ml-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 4rem (space-1600) | `ml-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 5rem (space-2000) | `ml-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 6rem (space-2400) | `ml-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin left | 7.5rem (space-3000) | `ml-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Margin right | 0 (none) | `mr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 0.25rem (space-100) | `mr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 0.5rem (space-200) | `mr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 0.75rem (space-300) | `mr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 1rem (space-400) | `mr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 1.25rem (space-500) | `mr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 1.5rem (space-600) | `mr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 2rem (space-800) | `mr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 2.5rem (space-1000) | `mr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 3rem (space-1200) | `mr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 4rem (space-1600) | `mr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 5rem (space-2000) | `mr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 6rem (space-2400) | `mr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin right | 7.5rem (space-3000) | `mr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Margin top | 0 (none) | `mt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 0.25rem (space-100) | `mt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 0.5rem (space-200) | `mt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 0.75rem (space-300) | `mt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 1rem (space-400) | `mt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 1.25rem (space-500) | `mt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 1.5rem (space-600) | `mt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 2rem (space-800) | `mt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 2.5rem (space-1000) | `mt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 3rem (space-1200) | `mt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 4rem (space-1600) | `mt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 5rem (space-2000) | `mt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 6rem (space-2400) | `mt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin top | 7.5rem (space-3000) | `mt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | tabs | Margin bottom | 0 (none) | `mb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 0.25rem (space-100) | `mb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 0.5rem (space-200) | `mb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 0.75rem (space-300) | `mb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 1rem (space-400) | `mb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 1.25rem (space-500) | `mb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 1.5rem (space-600) | `mb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 2rem (space-800) | `mb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 2.5rem (space-1000) | `mb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 3rem (space-1200) | `mb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 4rem (space-1600) | `mb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 5rem (space-2000) | `mb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 6rem (space-2400) | `mb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs | Margin bottom | 7.5rem (space-3000) | `mb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs-block | Style | Underline | `underline` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs-block | Style | Boxed | `boxed` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs-block | Style | Pills | `pills` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs-block | Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs-block | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs-block | Alignment | Full width (stretch) | `stretch` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs-block | Orientation | Horizontal | `horizontal` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | tabs-block | Orientation | Vertical | `vertical` | Supported (in the model) | Not checkable (data attribute / field value) |
| tcs-header | tcs-header | Header over the first block | Auto (over a light Hero) | `""` | Supported (in the model) | n/a (default) |
| tcs-header | tcs-header | Header over the first block | Always (over the first block) | `always` | Supported (in the model) | Not checkable (data attribute / field value) |
| tcs-header | tcs-header | Header over the first block | Never (the page starts below the header) | `never` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title Type | H1 (64px) | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title Type | H2 (48px) | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title Type | H3 (40px) | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title Type | H4 (28px) | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title Type | H5 (24px) | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title Type | H6 (20px) | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Date Format | DD-MM-YYYY | `dd-mm-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Date Format | MM-DD-YYYY | `mm-dd-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Date Format | MMM d, yyyy | `mmm-d-yyyy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Date Format | DD/MM/YY | `dd/mm/yy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Image type | Lottie | `lottie` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image position | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image position | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image position | Top | `top` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image position | Bottom | `bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image position (mobile) | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Image position (mobile) | Top | `mobile-image-top` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image position (mobile) | Bottom | `mobile-image-bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image ratio | Default (10:9; 16:9 above or below the text; original in Text split) | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Image ratio | Portrait (8:9) | `ratio-8-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image ratio | Square (1:1) | `ratio-1-1` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image ratio | Original | `ratio-original` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Image corners | Rounded | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Image corners | Square | `square` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Links (authored before Link items) › CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Link Style | Text link | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Links (authored before Link items) › CTA Link Style | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Links (authored before Link items) › CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Links (authored before Link items) › CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Links (authored before Link items) › CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | List arrow | Right | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | List arrow | Down right | `arrow-down-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | List arrow | None | `arrow-none` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Primary CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Link Style | Text link | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Link Style | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Primary CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Primary CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Primary CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Secondary CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Link Style | Text link | `tertiary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Link Style | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Background | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Secondary CTA Background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Secondary CTA Shape | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Secondary CTA Shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Layout | Image & Text | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Layout | Text split (title left, text right) | `no-image` | Supported (in the model) | Yes |
| teaser | teaser | Layout | Background image | `background` | Supported (in the model) | Yes |
| teaser | teaser | Layout | Card | `card` | Supported (in the model) | Yes |
| teaser | teaser | Layout | Image collage | `image-collage` | Supported (in the model) | Yes |
| teaser | teaser | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | BG Color | Grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | BG Color | Dark | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | BG Color | Dark green | `dark-green` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | BG Color | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Text alignment | Layout default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Text alignment | Left | `text-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Text alignment | Center | `text-center` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Text alignment | Right | `text-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Text alignment | Justify | `text-justify` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Vertical alignment | Layout default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Vertical alignment | Top | `valign-top` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Vertical alignment | Center | `valign-middle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Vertical alignment | Bottom | `valign-bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title weight | Layout default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Title weight | Regular | `title-regular` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title weight | Semibold | `title-semibold` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title color | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Title color | Dark | `title-dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title color | White | `title-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Title color | Light blue | `title-light-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Description size | Layout default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Description size | Regular (18px) | `text-regular` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Description size | Large (24px) | `text-large` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Eyebrow Style | Brand | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Eyebrow Style | Label (uppercase, grey) | `eyebrow-label` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Eyebrow Style | Grey | `eyebrow-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Eyebrow Style | White | `eyebrow-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser | Top spacing | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser | Top spacing | Page header (extra space above) | `spacing-header` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | CTA Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser-link | CTA Link Type | Open in New Window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | CTA Link Style | Text link | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser-link | CTA Link Style | List | `list` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | CTA Link Style | Primary Button | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | CTA Link Style | Primary Button (no arrow) | `primary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | CTA Link Style | Secondary Button | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | CTA Link Style | Secondary Button (no arrow) | `secondary-no-arrow` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | Button background | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser-link | Button background | White | `button-bg-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | Button background | Blue | `button-bg-blue` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | Button background | Translucent white | `button-bg-translucent` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-link | Button shape | Style default | `""` | Supported (in the model) | n/a (default) |
| teaser | teaser-link | Button shape | Rectangle | `button-rectangle` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-collage-image | Image treatment | Black and white | `black-white` | Supported (in the model) | Not checkable (data attribute / field value) |
| teaser | teaser-collage-image | Image treatment | Normal | `normal` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | testimonial | Title Type | H1 | `h1` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | testimonial | Title Type | H2 | `h2` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | testimonial | Title Type | H3 | `h3` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | testimonial | Title Type | H4 | `h4` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | testimonial | Title Type | H5 | `h5` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | testimonial | Title Type | H6 | `h6` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | testimonial | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| testimonial | testimonial | BG Color | Grey | `grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| testimonial | testimonial | BG Color | Navy | `navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Playback | Play button (on the poster image) | `click` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Playback | Autoplay when in view (muted) | `autoplay` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Playback | Background video (autoplay, muted, loop, no controls) | `background` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Aspect Ratio | 16:9 (widescreen) | `16-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Aspect Ratio | 4:3 | `4-3` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Aspect Ratio | 1:1 (square) | `1-1` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Aspect Ratio | 21:9 (cinema) | `21-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Aspect Ratio | 9:16 (vertical) | `9-16` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Size | Full width | `full` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Size | Large (900px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Size | Medium (640px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Size | Small (420px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | video | Alignment | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |

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
