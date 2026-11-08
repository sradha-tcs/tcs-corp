---
id: "DEV-V-gen-carousel"
title: "Gen Carousel Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/gen-carousel/_gen-carousel.json"]
relatedComponents: ["gen-carousel"]
relatedPages: ["/design-block-master/en/block-library/gen-carousel","/design-block-master/en/block-library/gen-carousel/auto","/design-block-master/en/block-library/gen-carousel/hero-slides","/design-block-master/en/block-library/gen-carousel/manual-and-auto","/design-block-master/en/block-library/gen-carousel/single-slide","/design-block-master/en/block-library/gen-carousel/teaser-slides"]
confidence: "Medium"
primary: false
---

# Gen Carousel Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-gen-carousel |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Gen Carousel block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/gen-carousel/_gen-carousel.json |
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
| `gen-carousel` | Style (`style`) | Content | No | Default = `gen-carousel-section` | `gen-carousel-section` |
| `gen-carousel` | Navigation (`carouselNavigation`) | Content | No | Manual = `manual`; Auto = `auto`; Manual and Auto = `manual-auto` | `manual` |
| `gen-carousel` | Animation Type (`containerAnimation`) | Additional | No | None = `""`; Fade in = `motion-fade-in`; Fade up = `motion-fade-up`; Fade down = `motion-fade-down`; Fade left = `motion-fade-left`; Fade right = `motion-fade-right`; Slide up = `motion-slide-up`; Slide down = `motion-slide-down`; Slide left = `motion-slide-left`; Slide right = `motion-slide-right`; Scale in = `motion-scale-in` | `` |
| `gen-carousel` | Motion Speed (`containerAnimationSpeed`) | Additional | No | Medium = `""`; Fast = `motion-fast`; Slow = `motion-slow` | `` |
| `gen-carousel` | Animation Trigger (`containerAnimationTrigger`) | Additional | No | On Scroll / Viewport Entry = `""`; On Page Load = `motion-on-load` | `` |
| `gen-carousel` | Padding left (`containerPaddingLeft`) | Additional | No | Default = `""`; 0 (none) = `pl-0`; 0.25rem (space-100) = `pl-100`; 0.5rem (space-200) = `pl-200`; 0.75rem (space-300) = `pl-300`; 1rem (space-400) = `pl-400`; 1.25rem (space-500) = `pl-500`; 1.5rem (space-600) = `pl-600`; 2rem (space-800) = `pl-800`; 2.5rem (space-1000) = `pl-1000`; 3rem (space-1200) = `pl-1200`; 4rem (space-1600) = `pl-1600`; 5rem (space-2000) = `pl-2000`; 6rem (space-2400) = `pl-2400`; 7.5rem (space-3000) = `pl-3000` | `` |
| `gen-carousel` | Padding right (`containerPaddingRight`) | Additional | No | Default = `""`; 0 (none) = `pr-0`; 0.25rem (space-100) = `pr-100`; 0.5rem (space-200) = `pr-200`; 0.75rem (space-300) = `pr-300`; 1rem (space-400) = `pr-400`; 1.25rem (space-500) = `pr-500`; 1.5rem (space-600) = `pr-600`; 2rem (space-800) = `pr-800`; 2.5rem (space-1000) = `pr-1000`; 3rem (space-1200) = `pr-1200`; 4rem (space-1600) = `pr-1600`; 5rem (space-2000) = `pr-2000`; 6rem (space-2400) = `pr-2400`; 7.5rem (space-3000) = `pr-3000` | `` |
| `gen-carousel` | Padding top (`containerPaddingTop`) | Additional | No | Default = `""`; 0 (none) = `pt-0`; 0.25rem (space-100) = `pt-100`; 0.5rem (space-200) = `pt-200`; 0.75rem (space-300) = `pt-300`; 1rem (space-400) = `pt-400`; 1.25rem (space-500) = `pt-500`; 1.5rem (space-600) = `pt-600`; 2rem (space-800) = `pt-800`; 2.5rem (space-1000) = `pt-1000`; 3rem (space-1200) = `pt-1200`; 4rem (space-1600) = `pt-1600`; 5rem (space-2000) = `pt-2000`; 6rem (space-2400) = `pt-2400`; 7.5rem (space-3000) = `pt-3000` | `` |
| `gen-carousel` | Padding bottom (`containerPaddingBottom`) | Additional | No | Default = `""`; 0 (none) = `pb-0`; 0.25rem (space-100) = `pb-100`; 0.5rem (space-200) = `pb-200`; 0.75rem (space-300) = `pb-300`; 1rem (space-400) = `pb-400`; 1.25rem (space-500) = `pb-500`; 1.5rem (space-600) = `pb-600`; 2rem (space-800) = `pb-800`; 2.5rem (space-1000) = `pb-1000`; 3rem (space-1200) = `pb-1200`; 4rem (space-1600) = `pb-1600`; 5rem (space-2000) = `pb-2000`; 6rem (space-2400) = `pb-2400`; 7.5rem (space-3000) = `pb-3000` | `` |
| `gen-carousel` | Margin left (`containerMarginLeft`) | Additional | No | Default = `""`; 0 (none) = `ml-0`; 0.25rem (space-100) = `ml-100`; 0.5rem (space-200) = `ml-200`; 0.75rem (space-300) = `ml-300`; 1rem (space-400) = `ml-400`; 1.25rem (space-500) = `ml-500`; 1.5rem (space-600) = `ml-600`; 2rem (space-800) = `ml-800`; 2.5rem (space-1000) = `ml-1000`; 3rem (space-1200) = `ml-1200`; 4rem (space-1600) = `ml-1600`; 5rem (space-2000) = `ml-2000`; 6rem (space-2400) = `ml-2400`; 7.5rem (space-3000) = `ml-3000` | `` |
| `gen-carousel` | Margin right (`containerMarginRight`) | Additional | No | Default = `""`; 0 (none) = `mr-0`; 0.25rem (space-100) = `mr-100`; 0.5rem (space-200) = `mr-200`; 0.75rem (space-300) = `mr-300`; 1rem (space-400) = `mr-400`; 1.25rem (space-500) = `mr-500`; 1.5rem (space-600) = `mr-600`; 2rem (space-800) = `mr-800`; 2.5rem (space-1000) = `mr-1000`; 3rem (space-1200) = `mr-1200`; 4rem (space-1600) = `mr-1600`; 5rem (space-2000) = `mr-2000`; 6rem (space-2400) = `mr-2400`; 7.5rem (space-3000) = `mr-3000` | `` |
| `gen-carousel` | Margin top (`containerMarginTop`) | Additional | No | Default = `""`; 0 (none) = `mt-0`; 0.25rem (space-100) = `mt-100`; 0.5rem (space-200) = `mt-200`; 0.75rem (space-300) = `mt-300`; 1rem (space-400) = `mt-400`; 1.25rem (space-500) = `mt-500`; 1.5rem (space-600) = `mt-600`; 2rem (space-800) = `mt-800`; 2.5rem (space-1000) = `mt-1000`; 3rem (space-1200) = `mt-1200`; 4rem (space-1600) = `mt-1600`; 5rem (space-2000) = `mt-2000`; 6rem (space-2400) = `mt-2400`; 7.5rem (space-3000) = `mt-3000` | `` |
| `gen-carousel` | Margin bottom (`containerMarginBottom`) | Additional | No | Default = `""`; 0 (none) = `mb-0`; 0.25rem (space-100) = `mb-100`; 0.5rem (space-200) = `mb-200`; 0.75rem (space-300) = `mb-300`; 1rem (space-400) = `mb-400`; 1.25rem (space-500) = `mb-500`; 1.5rem (space-600) = `mb-600`; 2rem (space-800) = `mb-800`; 2.5rem (space-1000) = `mb-1000`; 3rem (space-1200) = `mb-1200`; 4rem (space-1600) = `mb-1600`; 5rem (space-2000) = `mb-2000`; 6rem (space-2400) = `mb-2400`; 7.5rem (space-3000) = `mb-3000` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Gen Carousel blocks on the published block library pages (6 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| gen-carousel | Style | Default | `gen-carousel-section` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Navigation | Manual | `manual` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Navigation | Auto | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Navigation | Manual and Auto | `manual-auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | None | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Animation Type | Fade in | `motion-fade-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Fade up | `motion-fade-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Fade down | `motion-fade-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Fade left | `motion-fade-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Fade right | `motion-fade-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Slide up | `motion-slide-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Slide down | `motion-slide-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Slide left | `motion-slide-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Slide right | `motion-slide-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Type | Scale in | `motion-scale-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Motion Speed | Medium | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Motion Speed | Fast | `motion-fast` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Motion Speed | Slow | `motion-slow` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Animation Trigger | On Scroll / Viewport Entry | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Animation Trigger | On Page Load | `motion-on-load` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Padding left | 0 (none) | `pl-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 0.25rem (space-100) | `pl-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 0.5rem (space-200) | `pl-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 0.75rem (space-300) | `pl-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 1rem (space-400) | `pl-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 1.25rem (space-500) | `pl-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 1.5rem (space-600) | `pl-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 2rem (space-800) | `pl-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 2.5rem (space-1000) | `pl-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 3rem (space-1200) | `pl-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 4rem (space-1600) | `pl-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 5rem (space-2000) | `pl-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 6rem (space-2400) | `pl-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding left | 7.5rem (space-3000) | `pl-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Padding right | 0 (none) | `pr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 0.25rem (space-100) | `pr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 0.5rem (space-200) | `pr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 0.75rem (space-300) | `pr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 1rem (space-400) | `pr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 1.25rem (space-500) | `pr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 1.5rem (space-600) | `pr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 2rem (space-800) | `pr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 2.5rem (space-1000) | `pr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 3rem (space-1200) | `pr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 4rem (space-1600) | `pr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 5rem (space-2000) | `pr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 6rem (space-2400) | `pr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding right | 7.5rem (space-3000) | `pr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Padding top | 0 (none) | `pt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 0.25rem (space-100) | `pt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 0.5rem (space-200) | `pt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 0.75rem (space-300) | `pt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 1rem (space-400) | `pt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 1.25rem (space-500) | `pt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 1.5rem (space-600) | `pt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 2rem (space-800) | `pt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 2.5rem (space-1000) | `pt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 3rem (space-1200) | `pt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 4rem (space-1600) | `pt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 5rem (space-2000) | `pt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 6rem (space-2400) | `pt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding top | 7.5rem (space-3000) | `pt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Padding bottom | 0 (none) | `pb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 0.25rem (space-100) | `pb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 0.5rem (space-200) | `pb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 0.75rem (space-300) | `pb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 1rem (space-400) | `pb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 1.25rem (space-500) | `pb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 1.5rem (space-600) | `pb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 2rem (space-800) | `pb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 2.5rem (space-1000) | `pb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 3rem (space-1200) | `pb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 4rem (space-1600) | `pb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 5rem (space-2000) | `pb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 6rem (space-2400) | `pb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Padding bottom | 7.5rem (space-3000) | `pb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Margin left | 0 (none) | `ml-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 0.25rem (space-100) | `ml-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 0.5rem (space-200) | `ml-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 0.75rem (space-300) | `ml-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 1rem (space-400) | `ml-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 1.25rem (space-500) | `ml-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 1.5rem (space-600) | `ml-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 2rem (space-800) | `ml-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 2.5rem (space-1000) | `ml-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 3rem (space-1200) | `ml-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 4rem (space-1600) | `ml-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 5rem (space-2000) | `ml-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 6rem (space-2400) | `ml-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin left | 7.5rem (space-3000) | `ml-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Margin right | 0 (none) | `mr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 0.25rem (space-100) | `mr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 0.5rem (space-200) | `mr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 0.75rem (space-300) | `mr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 1rem (space-400) | `mr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 1.25rem (space-500) | `mr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 1.5rem (space-600) | `mr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 2rem (space-800) | `mr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 2.5rem (space-1000) | `mr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 3rem (space-1200) | `mr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 4rem (space-1600) | `mr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 5rem (space-2000) | `mr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 6rem (space-2400) | `mr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin right | 7.5rem (space-3000) | `mr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Margin top | 0 (none) | `mt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 0.25rem (space-100) | `mt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 0.5rem (space-200) | `mt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 0.75rem (space-300) | `mt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 1rem (space-400) | `mt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 1.25rem (space-500) | `mt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 1.5rem (space-600) | `mt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 2rem (space-800) | `mt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 2.5rem (space-1000) | `mt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 3rem (space-1200) | `mt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 4rem (space-1600) | `mt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 5rem (space-2000) | `mt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 6rem (space-2400) | `mt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin top | 7.5rem (space-3000) | `mt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | Default | `""` | Supported (in the model) | n/a (default) |
| gen-carousel | Margin bottom | 0 (none) | `mb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 0.25rem (space-100) | `mb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 0.5rem (space-200) | `mb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 0.75rem (space-300) | `mb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 1rem (space-400) | `mb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 1.25rem (space-500) | `mb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 1.5rem (space-600) | `mb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 2rem (space-800) | `mb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 2.5rem (space-1000) | `mb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 3rem (space-1200) | `mb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 4rem (space-1600) | `mb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 5rem (space-2000) | `mb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 6rem (space-2400) | `mb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| gen-carousel | Margin bottom | 7.5rem (space-3000) | `mb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

Navigation values are defined in `blocks/gen-carousel/_gen-carousel.json` and read by `readNavigation` in `gen-carousel.js`.

#### Manual (`manual`, default)

Purpose: visitor-controlled slides. Rendering: previous button, dots, next button; swipe / scroll with scroll snap; ArrowLeft / ArrowRight when focus is on the controls (focus then moves to the current dot). Previous / next wrap around. No autoplay. Accessibility: slide changes are announced politely (`aria-live="polite"`). Data layer: `cmp:click` `previous` / `next` / `button` (dots) and `cmp:show` per slide change.

```text
[Screenshot Placeholder]

File name:
gen-carousel-manual-mobile.png

Purpose:
A Manual carousel at 375px: previous, dots and next on one line below the slide.

Annotations:
A = Previous
B = Dots
C = Next
```

#### Auto (`auto`)

Purpose: rotation without arrows. Rendering: pause / play button and dots only; the slides can't be swiped (`overflow-x: hidden`). Autoplay every interval; starts paused for reduced motion. Accessibility: the live region is off while playing. Data layer: `cmp:click` `pause` / `play`, `cmp:show` for every automatic change.

```text
[Screenshot Placeholder]

File name:
gen-carousel-auto-tablet.png

Purpose:
An Auto carousel at 768px: only the pause button and the dots below the slide.

Annotations:
A = Pause button
B = Dots
```

#### Manual and Auto (`manual-auto`)

Purpose: rotation with full manual control. Rendering: pause / play, previous, dots, next; swipe enabled. A click on a control or dot restarts the interval.

#### Single slide

With fewer than two slides there are no controls and no autoplay; the slide is marked active.

#### Hero slides / Teaser slides

Each slide renders with its block's own design; slides fill the full width (`flex: 0 0 100%`) and their content stretches to the slide height so slides of different blocks line up. A Hero in the carousel's first section keeps its eager, high-priority image.

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
