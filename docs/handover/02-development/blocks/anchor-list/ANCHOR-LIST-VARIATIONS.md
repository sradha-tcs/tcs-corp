---
id: "DEV-V-anchor-list"
title: "Anchor List Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/anchor-list/_anchor-list.json"]
relatedComponents: ["anchor-list"]
relatedPages: ["/design-block-master/en/block-library/anchor-list","/design-block-master/en/block-library/anchor-list/anchor-list","/design-block-master/en/block-library/anchor-list/anchor-list-sticky"]
confidence: "Medium"
primary: false
---

# Anchor List Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-anchor-list |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Anchor List block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/anchor-list/_anchor-list.json |
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

No variation field.

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Anchor List blocks on the published block library pages (3 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

#### Default (in place)

| Aspect | Detail |
| ------ | ------ |
| Purpose | A chapter index at its place in the page, typically below the page header |
| When to use | Medium-length pages; a table of contents at the top |
| When not to use | When readers need the chapters while deep in the page (use Sticky) |
| Required fields | Anchor Links with Link Titles; matching ids on the page |
| Optional fields | Anchor Names (else the normalized title), Additional tab |
| Dialog configuration | Sticky off (the default) |
| Rendering | `nav.anchor-list-nav` > `ul.anchor-list-items` > `li` > `a.anchor-list-link`; scrolls away with the page |
| Desktop / tablet / mobile | Centred row; 2.5rem link padding from 900px, 1.5rem below; sideways scrolling when the links don't fit |
| Accessibility | Labelled `nav` landmark, `aria-current="location"`, focus moved to the target after a click |
| Data layer | `cmp:click` per link |
| Personalization and fallback | None; links to missing targets only mark themselves current |

```text
[Screenshot Placeholder]

File name:
anchor-list-default-tablet.png

Purpose:
The in-place Anchor List at 768px below the page title, CH 1: Overview current.

Annotations:
A = Anchor List row
B = Current link
```

#### Sticky

| Aspect | Detail |
| ------ | ------ |
| Purpose | Keeps the chapters and the reading position visible throughout a long page |
| When to use | Reports, long solution pages, case studies |
| When not to use | Pages with other fixed elements at the top (they aren't part of the scroll offset) |
| Required fields | As Default, plus Sticky on |
| Dialog configuration | Content tab › Sticky = on |
| Rendering | Class `sticky` (background `--color-bg-default`); once its place scrolls up to the top (or to the bottom of a fixed header), the block gets `anchor-list-pinned` (`position: fixed`, full width, `z-index: 10`, the section's inline padding) and an inline `top`; the wrapper keeps the block's height (`min-height`) so the page doesn't jump. Released when scrolling back above its place. Not pinned in Universal Editor edit mode or while its section is still hidden |
| Desktop / tablet / mobile | From 1200px the site header scrolls away, so the row pins at the very top; below 1200px the header is fixed (`blocks/header/header.css`) and the row pins directly below it |
| Accessibility | As Default; clicked targets get a scroll margin so they aren't hidden under the row |
| Data layer | As Default |
| Personalization and fallback | None |

```text
[Screenshot Placeholder]

File name:
anchor-list-sticky-desktop.png

Purpose:
The pinned Anchor List at 1440px while scrolled into chapter 3, without a jump in the content below.

Annotations:
A = Pinned row at the top of the screen
B = Current link CH 3: Outlook
C = Chapter content below
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
