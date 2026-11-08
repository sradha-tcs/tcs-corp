---
id: "DEV-V-tabs"
title: "Tabs Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/tabs/_tabs.json"]
relatedComponents: ["tabs"]
relatedPages: ["/design-block-master/en/block-library/tabs","/design-block-master/en/block-library/tabs/fragments","/design-block-master/en/block-library/tabs/fragments/cloud-overview","/design-block-master/en/block-library/tabs/fragments/consulting-overview","/design-block-master/en/block-library/tabs/fragments/security-overview","/design-block-master/en/block-library/tabs/fragments/tab-industries","/design-block-master/en/block-library/tabs/fragments/tab-overview","/design-block-master/en/block-library/tabs/tab","/design-block-master/en/block-library/tabs/tab-deep-link","/design-block-master/en/block-library/tabs/tabs-block","/design-block-master/en/block-library/tabs/tabs-block-styles","/design-block-master/en/block-library/tabs/tabs-block-with-fragments","/design-block-master/en/block-library/tabs/tabs-fixed-width","/design-block-master/en/block-library/tabs/tabs-section"]
confidence: "Medium"
primary: false
---

# Tabs Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-tabs |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Tabs block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/tabs/_tabs.json |
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
| `tabs` | Component (`style`) | Content | No | Tabs = `tabs-section` | `tabs-section` |
| `tabs` | Width Type (`sectionWidth`) | Content | No | Full Width = `full-width`; Fixed Width = `fixed-width` | `full-width` |
| `tabs` | Style (`tabsStyle`) | Styles | No | Underline = `underline`; Boxed = `boxed`; Pills = `pills` | `underline` |
| `tabs` | Alignment (`tabsAlignment`) | Styles | No | Left = `left`; Center = `center`; Full width (stretch) = `stretch` | `left` |
| `tabs` | Orientation (`tabsOrientation`) | Styles | No | Horizontal = `horizontal`; Vertical = `vertical` | `horizontal` |
| `tabs` | Animation Type (`containerAnimation`) | Additional | No | None = `""`; Fade in = `motion-fade-in`; Fade up = `motion-fade-up`; Fade down = `motion-fade-down`; Fade left = `motion-fade-left`; Fade right = `motion-fade-right`; Slide up = `motion-slide-up`; Slide down = `motion-slide-down`; Slide left = `motion-slide-left`; Slide right = `motion-slide-right`; Scale in = `motion-scale-in` | `` |
| `tabs` | Motion Speed (`containerAnimationSpeed`) | Additional | No | Medium = `""`; Fast = `motion-fast`; Slow = `motion-slow` | `` |
| `tabs` | Animation Trigger (`containerAnimationTrigger`) | Additional | No | On Scroll / Viewport Entry = `""`; On Page Load = `motion-on-load` | `` |
| `tabs` | Padding left (`containerPaddingLeft`) | Additional | No | Default = `""`; 0 (none) = `pl-0`; 0.25rem (space-100) = `pl-100`; 0.5rem (space-200) = `pl-200`; 0.75rem (space-300) = `pl-300`; 1rem (space-400) = `pl-400`; 1.25rem (space-500) = `pl-500`; 1.5rem (space-600) = `pl-600`; 2rem (space-800) = `pl-800`; 2.5rem (space-1000) = `pl-1000`; 3rem (space-1200) = `pl-1200`; 4rem (space-1600) = `pl-1600`; 5rem (space-2000) = `pl-2000`; 6rem (space-2400) = `pl-2400`; 7.5rem (space-3000) = `pl-3000` | `` |
| `tabs` | Padding right (`containerPaddingRight`) | Additional | No | Default = `""`; 0 (none) = `pr-0`; 0.25rem (space-100) = `pr-100`; 0.5rem (space-200) = `pr-200`; 0.75rem (space-300) = `pr-300`; 1rem (space-400) = `pr-400`; 1.25rem (space-500) = `pr-500`; 1.5rem (space-600) = `pr-600`; 2rem (space-800) = `pr-800`; 2.5rem (space-1000) = `pr-1000`; 3rem (space-1200) = `pr-1200`; 4rem (space-1600) = `pr-1600`; 5rem (space-2000) = `pr-2000`; 6rem (space-2400) = `pr-2400`; 7.5rem (space-3000) = `pr-3000` | `` |
| `tabs` | Padding top (`containerPaddingTop`) | Additional | No | Default = `""`; 0 (none) = `pt-0`; 0.25rem (space-100) = `pt-100`; 0.5rem (space-200) = `pt-200`; 0.75rem (space-300) = `pt-300`; 1rem (space-400) = `pt-400`; 1.25rem (space-500) = `pt-500`; 1.5rem (space-600) = `pt-600`; 2rem (space-800) = `pt-800`; 2.5rem (space-1000) = `pt-1000`; 3rem (space-1200) = `pt-1200`; 4rem (space-1600) = `pt-1600`; 5rem (space-2000) = `pt-2000`; 6rem (space-2400) = `pt-2400`; 7.5rem (space-3000) = `pt-3000` | `` |
| `tabs` | Padding bottom (`containerPaddingBottom`) | Additional | No | Default = `""`; 0 (none) = `pb-0`; 0.25rem (space-100) = `pb-100`; 0.5rem (space-200) = `pb-200`; 0.75rem (space-300) = `pb-300`; 1rem (space-400) = `pb-400`; 1.25rem (space-500) = `pb-500`; 1.5rem (space-600) = `pb-600`; 2rem (space-800) = `pb-800`; 2.5rem (space-1000) = `pb-1000`; 3rem (space-1200) = `pb-1200`; 4rem (space-1600) = `pb-1600`; 5rem (space-2000) = `pb-2000`; 6rem (space-2400) = `pb-2400`; 7.5rem (space-3000) = `pb-3000` | `` |
| `tabs` | Margin left (`containerMarginLeft`) | Additional | No | Default = `""`; 0 (none) = `ml-0`; 0.25rem (space-100) = `ml-100`; 0.5rem (space-200) = `ml-200`; 0.75rem (space-300) = `ml-300`; 1rem (space-400) = `ml-400`; 1.25rem (space-500) = `ml-500`; 1.5rem (space-600) = `ml-600`; 2rem (space-800) = `ml-800`; 2.5rem (space-1000) = `ml-1000`; 3rem (space-1200) = `ml-1200`; 4rem (space-1600) = `ml-1600`; 5rem (space-2000) = `ml-2000`; 6rem (space-2400) = `ml-2400`; 7.5rem (space-3000) = `ml-3000` | `` |
| `tabs` | Margin right (`containerMarginRight`) | Additional | No | Default = `""`; 0 (none) = `mr-0`; 0.25rem (space-100) = `mr-100`; 0.5rem (space-200) = `mr-200`; 0.75rem (space-300) = `mr-300`; 1rem (space-400) = `mr-400`; 1.25rem (space-500) = `mr-500`; 1.5rem (space-600) = `mr-600`; 2rem (space-800) = `mr-800`; 2.5rem (space-1000) = `mr-1000`; 3rem (space-1200) = `mr-1200`; 4rem (space-1600) = `mr-1600`; 5rem (space-2000) = `mr-2000`; 6rem (space-2400) = `mr-2400`; 7.5rem (space-3000) = `mr-3000` | `` |
| `tabs` | Margin top (`containerMarginTop`) | Additional | No | Default = `""`; 0 (none) = `mt-0`; 0.25rem (space-100) = `mt-100`; 0.5rem (space-200) = `mt-200`; 0.75rem (space-300) = `mt-300`; 1rem (space-400) = `mt-400`; 1.25rem (space-500) = `mt-500`; 1.5rem (space-600) = `mt-600`; 2rem (space-800) = `mt-800`; 2.5rem (space-1000) = `mt-1000`; 3rem (space-1200) = `mt-1200`; 4rem (space-1600) = `mt-1600`; 5rem (space-2000) = `mt-2000`; 6rem (space-2400) = `mt-2400`; 7.5rem (space-3000) = `mt-3000` | `` |
| `tabs` | Margin bottom (`containerMarginBottom`) | Additional | No | Default = `""`; 0 (none) = `mb-0`; 0.25rem (space-100) = `mb-100`; 0.5rem (space-200) = `mb-200`; 0.75rem (space-300) = `mb-300`; 1rem (space-400) = `mb-400`; 1.25rem (space-500) = `mb-500`; 1.5rem (space-600) = `mb-600`; 2rem (space-800) = `mb-800`; 2.5rem (space-1000) = `mb-1000`; 3rem (space-1200) = `mb-1200`; 4rem (space-1600) = `mb-1600`; 5rem (space-2000) = `mb-2000`; 6rem (space-2400) = `mb-2400`; 7.5rem (space-3000) = `mb-3000` | `` |
| `tabs-block` | Style (`tabsStyle`) | Styles | No | Underline = `underline`; Boxed = `boxed`; Pills = `pills` | `underline` |
| `tabs-block` | Alignment (`tabsAlignment`) | Styles | No | Left = `left`; Center = `center`; Full width (stretch) = `stretch` | `left` |
| `tabs-block` | Orientation (`tabsOrientation`) | Styles | No | Horizontal = `horizontal`; Vertical = `vertical` | `horizontal` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Tabs blocks on the published block library pages (14 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| tabs | Component | Tabs | `tabs-section` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Width Type | Full Width | `full-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Width Type | Fixed Width | `fixed-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Style | Underline | `underline` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Style | Boxed | `boxed` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Style | Pills | `pills` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Alignment | Full width (stretch) | `stretch` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Orientation | Horizontal | `horizontal` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Orientation | Vertical | `vertical` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | None | `""` | Supported (in the model) | n/a (default) |
| tabs | Animation Type | Fade in | `motion-fade-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Fade up | `motion-fade-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Fade down | `motion-fade-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Fade left | `motion-fade-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Fade right | `motion-fade-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Slide up | `motion-slide-up` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Slide down | `motion-slide-down` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Slide left | `motion-slide-left` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Slide right | `motion-slide-right` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Type | Scale in | `motion-scale-in` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Motion Speed | Medium | `""` | Supported (in the model) | n/a (default) |
| tabs | Motion Speed | Fast | `motion-fast` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Motion Speed | Slow | `motion-slow` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Animation Trigger | On Scroll / Viewport Entry | `""` | Supported (in the model) | n/a (default) |
| tabs | Animation Trigger | On Page Load | `motion-on-load` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | Padding left | 0 (none) | `pl-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 0.25rem (space-100) | `pl-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 0.5rem (space-200) | `pl-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 0.75rem (space-300) | `pl-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 1rem (space-400) | `pl-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 1.25rem (space-500) | `pl-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 1.5rem (space-600) | `pl-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 2rem (space-800) | `pl-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 2.5rem (space-1000) | `pl-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 3rem (space-1200) | `pl-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 4rem (space-1600) | `pl-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 5rem (space-2000) | `pl-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 6rem (space-2400) | `pl-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding left | 7.5rem (space-3000) | `pl-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | Padding right | 0 (none) | `pr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 0.25rem (space-100) | `pr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 0.5rem (space-200) | `pr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 0.75rem (space-300) | `pr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 1rem (space-400) | `pr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 1.25rem (space-500) | `pr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 1.5rem (space-600) | `pr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 2rem (space-800) | `pr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 2.5rem (space-1000) | `pr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 3rem (space-1200) | `pr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 4rem (space-1600) | `pr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 5rem (space-2000) | `pr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 6rem (space-2400) | `pr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding right | 7.5rem (space-3000) | `pr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | Padding top | 0 (none) | `pt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 0.25rem (space-100) | `pt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 0.5rem (space-200) | `pt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 0.75rem (space-300) | `pt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 1rem (space-400) | `pt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 1.25rem (space-500) | `pt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 1.5rem (space-600) | `pt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 2rem (space-800) | `pt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 2.5rem (space-1000) | `pt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 3rem (space-1200) | `pt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 4rem (space-1600) | `pt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 5rem (space-2000) | `pt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 6rem (space-2400) | `pt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding top | 7.5rem (space-3000) | `pt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | Padding bottom | 0 (none) | `pb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 0.25rem (space-100) | `pb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 0.5rem (space-200) | `pb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 0.75rem (space-300) | `pb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 1rem (space-400) | `pb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 1.25rem (space-500) | `pb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 1.5rem (space-600) | `pb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 2rem (space-800) | `pb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 2.5rem (space-1000) | `pb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 3rem (space-1200) | `pb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 4rem (space-1600) | `pb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 5rem (space-2000) | `pb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 6rem (space-2400) | `pb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Padding bottom | 7.5rem (space-3000) | `pb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | Margin left | 0 (none) | `ml-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 0.25rem (space-100) | `ml-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 0.5rem (space-200) | `ml-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 0.75rem (space-300) | `ml-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 1rem (space-400) | `ml-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 1.25rem (space-500) | `ml-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 1.5rem (space-600) | `ml-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 2rem (space-800) | `ml-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 2.5rem (space-1000) | `ml-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 3rem (space-1200) | `ml-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 4rem (space-1600) | `ml-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 5rem (space-2000) | `ml-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 6rem (space-2400) | `ml-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin left | 7.5rem (space-3000) | `ml-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | Margin right | 0 (none) | `mr-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 0.25rem (space-100) | `mr-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 0.5rem (space-200) | `mr-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 0.75rem (space-300) | `mr-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 1rem (space-400) | `mr-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 1.25rem (space-500) | `mr-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 1.5rem (space-600) | `mr-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 2rem (space-800) | `mr-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 2.5rem (space-1000) | `mr-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 3rem (space-1200) | `mr-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 4rem (space-1600) | `mr-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 5rem (space-2000) | `mr-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 6rem (space-2400) | `mr-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin right | 7.5rem (space-3000) | `mr-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | Margin top | 0 (none) | `mt-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 0.25rem (space-100) | `mt-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 0.5rem (space-200) | `mt-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 0.75rem (space-300) | `mt-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 1rem (space-400) | `mt-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 1.25rem (space-500) | `mt-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 1.5rem (space-600) | `mt-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 2rem (space-800) | `mt-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 2.5rem (space-1000) | `mt-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 3rem (space-1200) | `mt-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 4rem (space-1600) | `mt-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 5rem (space-2000) | `mt-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 6rem (space-2400) | `mt-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin top | 7.5rem (space-3000) | `mt-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | Default | `""` | Supported (in the model) | n/a (default) |
| tabs | Margin bottom | 0 (none) | `mb-0` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 0.25rem (space-100) | `mb-100` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 0.5rem (space-200) | `mb-200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 0.75rem (space-300) | `mb-300` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 1rem (space-400) | `mb-400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 1.25rem (space-500) | `mb-500` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 1.5rem (space-600) | `mb-600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 2rem (space-800) | `mb-800` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 2.5rem (space-1000) | `mb-1000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 3rem (space-1200) | `mb-1200` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 4rem (space-1600) | `mb-1600` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 5rem (space-2000) | `mb-2000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 6rem (space-2400) | `mb-2400` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs | Margin bottom | 7.5rem (space-3000) | `mb-3000` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs-block | Style | Underline | `underline` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs-block | Style | Boxed | `boxed` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs-block | Style | Pills | `pills` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs-block | Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs-block | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs-block | Alignment | Full width (stretch) | `stretch` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs-block | Orientation | Horizontal | `horizontal` | Supported (in the model) | Not checkable (data attribute / field value) |
| tabs-block | Orientation | Vertical | `vertical` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Tabs Container (section mode)

**Purpose:** tabs whose content is authored on the page. **When to use:** content unique to this page. **When not to use:** content shared by several pages (use the Tabs block). **Required:** Component `tabs-section` (default), at least one Tab with a Title and content after it. **Optional:** Label, Anchor name, Width Type, Styles, Additional tab, Column Breaks. **Dialog:** model `tabs`. **Rendering:** `buildTabsSections` wraps the section content in a synthetic `tabs` block with `data-source="section"`; each Tab starts a group; the Tab wrappers stay in the panels (hidden on the page, shown in edit mode). **Desktop / tablet / mobile:** see [Responsive Behavior](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tabs/README.md#responsive-behavior). **Accessibility:** as below. **Data layer:** panels as components, `cmp:show` on change. **Personalization / fallback:** none; the authored content renders.

```text
[Screenshot Placeholder]

File name:
tabs-container-desktop.png

Purpose:
A Tabs Container at desktop width with three tabs and the first panel's own content.

Annotations:
A = Tab list
B = Selected tab
C = Panel content authored after the Tab
```

#### Tabs block (fragment mode)

**Purpose:** tabs of reusable fragment pages. **When to use:** the same tabs on several pages. **When not to use:** content that exists only on this page. **Required:** at least one Tab item with a Title and a Fragment. **Optional:** Label, Tab ID prefix, Styles, Additional tab. **Dialog:** model `tabs-block`, items `tabs-item` (Tab / Fragment tabs). **Rendering:** each item's fragment is loaded (all in parallel) into a `.tabs-fragment` wrapper in its panel; each item's editor instrumentation moves to its panel. **Data layer / personalization:** as the container. A fragment that can't be loaded leaves its panel empty (no message on the page).

```text
[Screenshot Placeholder]

File name:
tabs-block-fragments-desktop.png

Purpose:
A Tabs block whose panel shows the content of its fragment page.

Annotations:
A = Tab list
B = Panel with the fragment's sections
```

#### Style: Underline, Boxed, Pills

Underline (default): plain labels on a divider, the selected tab semibold with a brand bottom border. Boxed: grey boxes with rounded top corners; the selected one white with a border and brand text. Pills: outlined pills, no divider; the selected one filled with the brand colour. Available on both forms. **Accessibility:** state is shown by colour and border and by `aria-selected`. Choose the style that fits the surrounding design.

```text
[Screenshot Placeholder]

File name:
tabs-styles-desktop.png

Purpose:
The three Styles side by side: Underline, Boxed, Pills.

Annotations:
A = Underline
B = Boxed
C = Pills
```

#### Alignment: Left, Center, Full width (stretch)

Left (default): tabs start at the left. Center: the tabs are centred (`justify-content: safe center`, so a list that overflows still scrolls from its start). Full width (stretch): the tabs share the width (`flex: 1 0 auto`). Use Full width for two to four short labels.

```text
[Screenshot Placeholder]

File name:
tabs-alignment-desktop.png

Purpose:
Left, Center and Full width (stretch) alignment of the same tab list.

Annotations:
A = Left
B = Center
C = Full width (stretch)
```

#### Orientation: Horizontal, Vertical

Horizontal (default): the tab list above the panel. Vertical: from 900px a grid with the tab list on the left (`minmax(12.5rem, 1fr)`) and the panel on the right (`3fr`), labels wrapping; below 900px the list stays above the panel. Use Vertical for many or long labels (for example translated labels). `aria-orientation="vertical"` is set at every width, so Arrow Up / Down and Left / Right all work.

```text
[Screenshot Placeholder]

File name:
tabs-vertical-tablet.png

Purpose:
Orientation Vertical below 900px: the tab list stays above the panel.

Annotations:
A = Tab list above the panel
B = Panel
```

#### Width Type: Full Width, Fixed Width (Tabs Container only)

The section option: Full Width (default) or Fixed Width (the `fixed-width` section, capped at the content width by `styles/styles.css`).

```text
[Screenshot Placeholder]

File name:
tabs-width-fixed-desktop.png

Purpose:
A Fixed Width Tabs Container on a wide screen, centred at the content width.

Annotations:
A = Tabs and panel at the content width
```

#### Columns in a tab (Column Breaks)

**Purpose:** columns of components inside a tab (a section can't hold a Columns Container section). **Required:** a Column Break after the Tab, then that column's components; more Column Breaks for more columns. **Optional:** the Tab's Columns per row (Automatic: as many as there are Column Breaks, at most 4). **Rendering:** `columnsOf` builds a `columns-container` block in the panel (decorated while empty, then loaded with `loadBlock`); content before the first Column Break stays above it; the columns get the data-layer id `{panel id}-columns`. Gap, alignment and breakpoint are the Columns Container defaults (medium, top, side by side from 900px). See [Columns Container](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/columns-container/README.md) and [Column Break](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/column-break/README.md).

#### Nested Tabs

A Tabs block can be added inside a tab of a Tabs Container (the `tabs` filter allows `tabs-block`). The CSS uses child selectors, so the inner Tabs keep their own Style and Orientation. Selecting a component in the editor or following a deep link opens the outer and the inner tab.

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
