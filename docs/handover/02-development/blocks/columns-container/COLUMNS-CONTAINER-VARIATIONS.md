---
id: "DEV-V-columns-container"
title: "Columns Container Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/columns-container/_columns-container.json"]
relatedComponents: ["columns-container"]
relatedPages: ["/design-block-master/en/block-library/columns-container","/design-block-master/en/block-library/columns-container/alignment-gap-and-breakpoints","/design-block-master/en/block-library/columns-container/columns-of-blocks","/design-block-master/en/block-library/columns-container/columns-per-row"]
confidence: "Medium"
primary: false
---

# Columns Container Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-columns-container |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Columns Container block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/columns-container/_columns-container.json |
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
| `columns-container` | Style (`style`) | Content | Yes | Columns Container = `columns-container-section`; Highlight = `highlight` | `columns-container-section` |
| `columns-container` | BG Color (`containerBgColor`) | Content | No | Default = `""`; Grey = `bg-grey`; Dark = `bg-dark`; Dark green = `bg-dark-green`; Navy = `bg-navy` | `` |
| `columns-container` | Width Type (`sectionWidth`) | Content | No | Full Width = `full-width`; Fixed Width = `fixed-width` | `full-width` |
| `columns-container` | Columns per row (`columnsPerRow`) | Layout | No | Automatic = `auto`; 1 = `1`; 2 = `2`; 3 = `3`; 4 = `4` | `auto` |
| `columns-container` | Gap (`columnsGap`) | Layout | No | None = `none`; Small = `small`; Medium = `medium`; Large = `large` | `medium` |
| `columns-container` | Vertical alignment (`columnsAlign`) | Layout | No | Top = `top`; Middle = `middle`; Bottom = `bottom`; Stretch (equal heights) = `stretch` | `top` |
| `columns-container` | Side by side from (`columnsFrom`) | Layout | No | Tablet (600px) = `tablet`; Desktop (900px) = `desktop`; Large desktop (1200px) = `large` | `desktop` |
| `columns-container` | Animation Type (`containerAnimation`) | Additional | No | None = `""`; Fade in = `motion-fade-in`; Fade up = `motion-fade-up`; Fade down = `motion-fade-down`; Fade left = `motion-fade-left`; Fade right = `motion-fade-right`; Slide up = `motion-slide-up`; Slide down = `motion-slide-down`; Slide left = `motion-slide-left`; Slide right = `motion-slide-right`; Scale in = `motion-scale-in` | `` |
| `columns-container` | Motion Speed (`containerAnimationSpeed`) | Additional | No | Medium = `""`; Fast = `motion-fast`; Slow = `motion-slow` | `` |
| `columns-container` | Animation Trigger (`containerAnimationTrigger`) | Additional | No | On Scroll / Viewport Entry = `""`; On Page Load = `motion-on-load` | `` |
| `columns-container` | Padding left (`containerPaddingLeft`) | Additional | No | Default = `""`; 0 (none) = `pl-0`; 0.25rem (space-100) = `pl-100`; 0.5rem (space-200) = `pl-200`; 0.75rem (space-300) = `pl-300`; 1rem (space-400) = `pl-400`; 1.25rem (space-500) = `pl-500`; 1.5rem (space-600) = `pl-600`; 2rem (space-800) = `pl-800`; 2.5rem (space-1000) = `pl-1000`; 3rem (space-1200) = `pl-1200`; 4rem (space-1600) = `pl-1600`; 5rem (space-2000) = `pl-2000`; 6rem (space-2400) = `pl-2400`; 7.5rem (space-3000) = `pl-3000` | `` |
| `columns-container` | Padding right (`containerPaddingRight`) | Additional | No | Default = `""`; 0 (none) = `pr-0`; 0.25rem (space-100) = `pr-100`; 0.5rem (space-200) = `pr-200`; 0.75rem (space-300) = `pr-300`; 1rem (space-400) = `pr-400`; 1.25rem (space-500) = `pr-500`; 1.5rem (space-600) = `pr-600`; 2rem (space-800) = `pr-800`; 2.5rem (space-1000) = `pr-1000`; 3rem (space-1200) = `pr-1200`; 4rem (space-1600) = `pr-1600`; 5rem (space-2000) = `pr-2000`; 6rem (space-2400) = `pr-2400`; 7.5rem (space-3000) = `pr-3000` | `` |
| `columns-container` | Padding top (`containerPaddingTop`) | Additional | No | Default = `""`; 0 (none) = `pt-0`; 0.25rem (space-100) = `pt-100`; 0.5rem (space-200) = `pt-200`; 0.75rem (space-300) = `pt-300`; 1rem (space-400) = `pt-400`; 1.25rem (space-500) = `pt-500`; 1.5rem (space-600) = `pt-600`; 2rem (space-800) = `pt-800`; 2.5rem (space-1000) = `pt-1000`; 3rem (space-1200) = `pt-1200`; 4rem (space-1600) = `pt-1600`; 5rem (space-2000) = `pt-2000`; 6rem (space-2400) = `pt-2400`; 7.5rem (space-3000) = `pt-3000` | `` |
| `columns-container` | Padding bottom (`containerPaddingBottom`) | Additional | No | Default = `""`; 0 (none) = `pb-0`; 0.25rem (space-100) = `pb-100`; 0.5rem (space-200) = `pb-200`; 0.75rem (space-300) = `pb-300`; 1rem (space-400) = `pb-400`; 1.25rem (space-500) = `pb-500`; 1.5rem (space-600) = `pb-600`; 2rem (space-800) = `pb-800`; 2.5rem (space-1000) = `pb-1000`; 3rem (space-1200) = `pb-1200`; 4rem (space-1600) = `pb-1600`; 5rem (space-2000) = `pb-2000`; 6rem (space-2400) = `pb-2400`; 7.5rem (space-3000) = `pb-3000` | `` |
| `columns-container` | Margin left (`containerMarginLeft`) | Additional | No | Default = `""`; 0 (none) = `ml-0`; 0.25rem (space-100) = `ml-100`; 0.5rem (space-200) = `ml-200`; 0.75rem (space-300) = `ml-300`; 1rem (space-400) = `ml-400`; 1.25rem (space-500) = `ml-500`; 1.5rem (space-600) = `ml-600`; 2rem (space-800) = `ml-800`; 2.5rem (space-1000) = `ml-1000`; 3rem (space-1200) = `ml-1200`; 4rem (space-1600) = `ml-1600`; 5rem (space-2000) = `ml-2000`; 6rem (space-2400) = `ml-2400`; 7.5rem (space-3000) = `ml-3000` | `` |
| `columns-container` | Margin right (`containerMarginRight`) | Additional | No | Default = `""`; 0 (none) = `mr-0`; 0.25rem (space-100) = `mr-100`; 0.5rem (space-200) = `mr-200`; 0.75rem (space-300) = `mr-300`; 1rem (space-400) = `mr-400`; 1.25rem (space-500) = `mr-500`; 1.5rem (space-600) = `mr-600`; 2rem (space-800) = `mr-800`; 2.5rem (space-1000) = `mr-1000`; 3rem (space-1200) = `mr-1200`; 4rem (space-1600) = `mr-1600`; 5rem (space-2000) = `mr-2000`; 6rem (space-2400) = `mr-2400`; 7.5rem (space-3000) = `mr-3000` | `` |
| `columns-container` | Margin top (`containerMarginTop`) | Additional | No | Default = `""`; 0 (none) = `mt-0`; 0.25rem (space-100) = `mt-100`; 0.5rem (space-200) = `mt-200`; 0.75rem (space-300) = `mt-300`; 1rem (space-400) = `mt-400`; 1.25rem (space-500) = `mt-500`; 1.5rem (space-600) = `mt-600`; 2rem (space-800) = `mt-800`; 2.5rem (space-1000) = `mt-1000`; 3rem (space-1200) = `mt-1200`; 4rem (space-1600) = `mt-1600`; 5rem (space-2000) = `mt-2000`; 6rem (space-2400) = `mt-2400`; 7.5rem (space-3000) = `mt-3000` | `` |
| `columns-container` | Margin bottom (`containerMarginBottom`) | Additional | No | Default = `""`; 0 (none) = `mb-0`; 0.25rem (space-100) = `mb-100`; 0.5rem (space-200) = `mb-200`; 0.75rem (space-300) = `mb-300`; 1rem (space-400) = `mb-400`; 1.25rem (space-500) = `mb-500`; 1.5rem (space-600) = `mb-600`; 2rem (space-800) = `mb-800`; 2.5rem (space-1000) = `mb-1000`; 3rem (space-1200) = `mb-1200`; 4rem (space-1600) = `mb-1600`; 5rem (space-2000) = `mb-2000`; 6rem (space-2400) = `mb-2400`; 7.5rem (space-3000) = `mb-3000` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Columns Container blocks on the published block library pages (4 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| columns-container | Style | Columns Container | `columns-container-section` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Style | Highlight | `highlight` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | BG Color | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | BG Color | Grey | `bg-grey` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | BG Color | Dark | `bg-dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | BG Color | Dark green | `bg-dark-green` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | BG Color | Navy | `bg-navy` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Width Type | Full Width | `full-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Width Type | Fixed Width | `fixed-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Columns per row | Automatic | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Columns per row | 1 | `1` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Columns per row | 2 | `2` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Columns per row | 3 | `3` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Columns per row | 4 | `4` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Gap | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Gap | Small | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Gap | Medium | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Gap | Large | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Vertical alignment | Top | `top` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Vertical alignment | Middle | `middle` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Vertical alignment | Bottom | `bottom` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Vertical alignment | Stretch (equal heights) | `stretch` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Side by side from | Tablet (600px) | `tablet` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Side by side from | Desktop (900px) | `desktop` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Side by side from | Large desktop (1200px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | None | `""` | Supported (in the model) | n/a (default) |
| columns-container | Animation Type | Fade in | `motion-fade-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Fade up | `motion-fade-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Fade down | `motion-fade-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Fade left | `motion-fade-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Fade right | `motion-fade-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Slide up | `motion-slide-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Slide down | `motion-slide-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Slide left | `motion-slide-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Slide right | `motion-slide-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Type | Scale in | `motion-scale-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Motion Speed | Medium | `""` | Supported (in the model) | n/a (default) |
| columns-container | Motion Speed | Fast | `motion-fast` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Motion Speed | Slow | `motion-slow` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Animation Trigger | On Scroll / Viewport Entry | `""` | Supported (in the model) | n/a (default) |
| columns-container | Animation Trigger | On Page Load | `motion-on-load` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | Padding left | 0 (none) | `pl-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 0.25rem (space-100) | `pl-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 0.5rem (space-200) | `pl-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 0.75rem (space-300) | `pl-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 1rem (space-400) | `pl-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 1.25rem (space-500) | `pl-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 1.5rem (space-600) | `pl-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 2rem (space-800) | `pl-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 2.5rem (space-1000) | `pl-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 3rem (space-1200) | `pl-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 4rem (space-1600) | `pl-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 5rem (space-2000) | `pl-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 6rem (space-2400) | `pl-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding left | 7.5rem (space-3000) | `pl-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | Padding right | 0 (none) | `pr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 0.25rem (space-100) | `pr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 0.5rem (space-200) | `pr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 0.75rem (space-300) | `pr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 1rem (space-400) | `pr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 1.25rem (space-500) | `pr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 1.5rem (space-600) | `pr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 2rem (space-800) | `pr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 2.5rem (space-1000) | `pr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 3rem (space-1200) | `pr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 4rem (space-1600) | `pr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 5rem (space-2000) | `pr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 6rem (space-2400) | `pr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding right | 7.5rem (space-3000) | `pr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | Padding top | 0 (none) | `pt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 0.25rem (space-100) | `pt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 0.5rem (space-200) | `pt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 0.75rem (space-300) | `pt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 1rem (space-400) | `pt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 1.25rem (space-500) | `pt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 1.5rem (space-600) | `pt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 2rem (space-800) | `pt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 2.5rem (space-1000) | `pt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 3rem (space-1200) | `pt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 4rem (space-1600) | `pt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 5rem (space-2000) | `pt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 6rem (space-2400) | `pt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding top | 7.5rem (space-3000) | `pt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | Padding bottom | 0 (none) | `pb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 0.25rem (space-100) | `pb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 0.5rem (space-200) | `pb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 0.75rem (space-300) | `pb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 1rem (space-400) | `pb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 1.25rem (space-500) | `pb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 1.5rem (space-600) | `pb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 2rem (space-800) | `pb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 2.5rem (space-1000) | `pb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 3rem (space-1200) | `pb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 4rem (space-1600) | `pb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 5rem (space-2000) | `pb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 6rem (space-2400) | `pb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Padding bottom | 7.5rem (space-3000) | `pb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | Margin left | 0 (none) | `ml-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 0.25rem (space-100) | `ml-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 0.5rem (space-200) | `ml-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 0.75rem (space-300) | `ml-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 1rem (space-400) | `ml-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 1.25rem (space-500) | `ml-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 1.5rem (space-600) | `ml-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 2rem (space-800) | `ml-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 2.5rem (space-1000) | `ml-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 3rem (space-1200) | `ml-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 4rem (space-1600) | `ml-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 5rem (space-2000) | `ml-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 6rem (space-2400) | `ml-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin left | 7.5rem (space-3000) | `ml-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | Margin right | 0 (none) | `mr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 0.25rem (space-100) | `mr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 0.5rem (space-200) | `mr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 0.75rem (space-300) | `mr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 1rem (space-400) | `mr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 1.25rem (space-500) | `mr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 1.5rem (space-600) | `mr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 2rem (space-800) | `mr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 2.5rem (space-1000) | `mr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 3rem (space-1200) | `mr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 4rem (space-1600) | `mr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 5rem (space-2000) | `mr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 6rem (space-2400) | `mr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin right | 7.5rem (space-3000) | `mr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | Margin top | 0 (none) | `mt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 0.25rem (space-100) | `mt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 0.5rem (space-200) | `mt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 0.75rem (space-300) | `mt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 1rem (space-400) | `mt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 1.25rem (space-500) | `mt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 1.5rem (space-600) | `mt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 2rem (space-800) | `mt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 2.5rem (space-1000) | `mt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 3rem (space-1200) | `mt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 4rem (space-1600) | `mt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 5rem (space-2000) | `mt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 6rem (space-2400) | `mt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin top | 7.5rem (space-3000) | `mt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | Default | `""` | Supported (in the model) | n/a (default) |
| columns-container | Margin bottom | 0 (none) | `mb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 0.25rem (space-100) | `mb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 0.5rem (space-200) | `mb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 0.75rem (space-300) | `mb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 1rem (space-400) | `mb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 1.25rem (space-500) | `mb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 1.5rem (space-600) | `mb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 2rem (space-800) | `mb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 2.5rem (space-1000) | `mb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 3rem (space-1200) | `mb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 4rem (space-1600) | `mb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 5rem (space-2000) | `mb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 6rem (space-2400) | `mb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| columns-container | Margin bottom | 7.5rem (space-3000) | `mb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Columns per row

Automatic (as many as Column Breaks, at most 4), or 1 to 4. More Column Breaks than per row start new rows of the same column width. **Rendering:** class `columns-container-{n}` sets `--columns-container-count`; the grid is `repeat(n, minmax(0, 1fr))` from the breakpoint. Below it, one column.

#### Gap

None, Small, Medium (default), Large: the `--columns-container-gap` variable, used between columns and between stacked columns.

#### Vertical alignment

Top (default), Middle, Bottom, Stretch (equal heights): `align-items` of the grid; visible only side by side.

#### Side by side from

Tablet (600px), Desktop (900px, default), Large desktop (1200px). Below the chosen width the columns are stacked in their order.

```text
[Screenshot Placeholder]

File name:
columns-container-from-large-desktop.png

Purpose:
Side by side from Large desktop (1200px) at 1024px: still stacked.

Annotations:
A = Stacked columns at 1024px
```

#### BG Color

Default, Grey, Dark, Dark green: only the colour; on Dark and Dark green the theme contract applies (light text, links, focus, buttons). Use the Additional tab's Padding for space inside the colour.

#### Width Type and Background Image

The Section options: Fixed Width caps the section at the content width; a Background Image sits behind the whole section.

#### Columns in a Tabs Container tab

A section can't hold a section, so inside a [Tabs Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tabs/README.md) a tab's own Column Breaks make the columns: add a Column Break after the [Tab](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tab/README.md), then that column's components, then the next Column Break. The Tab's **Columns per row** (Automatic, 1-4) sets the columns per row; content before the first Column Break (e.g. a heading) stays above the columns. `blocks/tabs/tabs.js` (`columnsOf`) builds a Columns Container block in the tab's panel, so the layout, CSS and editor labels are the same; Gap, Vertical alignment and Side by side from keep their defaults (Medium, Top, Desktop) there.

**Accessibility (all variations):** the reading order is the content order (columns are not reordered). **Data layer:** unchanged by the variation. **Personalization / fallback:** none.

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
