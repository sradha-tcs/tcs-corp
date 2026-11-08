---
id: "DEV-V-accordion"
title: "Accordion Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/accordion/_accordion.json"]
relatedComponents: ["accordion"]
relatedPages: ["/design-block-master/en/block-library/accordion","/design-block-master/en/block-library/accordion/accordion"]
confidence: "Medium"
primary: false
---

# Accordion Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-accordion |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Accordion block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/accordion/_accordion.json |
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

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Accordion blocks on the published block library pages (2 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

#### Default Accordion

The Accordion has no style, layout or variant field (its model has only the Additional tab), so there is one presentation. Additional tab options (Anchor ID, Hide block, animation, spacing) are block options, not variations.

| Aspect | Detail |
| ------ | ------ |
| Purpose | Question / answer or label / detail pairs, compact, all closed on load |
| When to use | Several independent items of which visitors read one or a few |
| When not to use | Content every visitor must see; alternative views to compare (Tabs Container) |
| Required fields | One Accordion Item with a Summary |
| Optional fields | Text (recommended), Additional tab |
| Dialog configuration | None besides the Additional tab |
| Rendering | `details.accordion-item` per item with `summary.accordion-item-label` and `div.accordion-item-body`; native marker hidden, chevron drawn by `summary::after` and rotated 180 degrees when open |
| Desktop / tablet / mobile | Same layout at every width; summary and body sizes come from the typography tokens, which switch at 900px |
| Accessibility | Native disclosure semantics and keyboard support; visible focus outline; decorative chevron |
| Data layer | `cmp:show` / `cmp:hide` per toggle, `dc:title` = summary |
| Personalization and fallback | None; the authored items render |

```text
[Screenshot Placeholder]

File name:
accordion-default-tablet.png

Purpose:
The Default Accordion at 768px with one item open, the summary at 1.125rem and the body at 1rem.

Annotations:
A = Closed item with downward chevron
B = Open item with rotated chevron
C = Body text
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
