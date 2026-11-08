---
id: "DEV-V-fragment"
title: "Fragment Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/fragment/_fragment.json"]
relatedComponents: ["fragment"]
relatedPages: ["/design-block-master/en/block-library/fragment","/design-block-master/en/block-library/fragment/fragment-block","/design-block-master/en/block-library/fragment/fragments","/design-block-master/en/block-library/fragment/fragments/cta-banner"]
confidence: "Medium"
primary: false
---

# Fragment Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-fragment |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Fragment block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/fragment/_fragment.json |
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

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Fragment blocks on the published block library pages (4 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

#### Fragment block (default)

- **Purpose:** include one page's sections.
- **When to use / not:** shared content; not for page-specific or SEO-critical content.
- **Required fields:** Reference. **Optional:** Additional tab.
- **Rendering:** `div.fragment.block` containing the fragment's `div.section`s; no styles of its own (`fragment.css` is empty).
- **Desktop / tablet / mobile:** as the included sections and blocks.
- **Accessibility:** the included content's semantics.
- **Data layer:** `fragment-{n}` (or its Anchor ID) with the inner blocks as children.
- **Personalization / fallback:** none; an unpublished fragment leaves the reference link.

```text
[Screenshot Placeholder]

File name:
fragment-block-desktop.png

Purpose:
A host page with the included CTA banner at 1440px.

Annotations:
A = Fragment block boundary
B = Included Columns Container
```

#### Nested fragments

- **Purpose:** a fragment page that itself contains a Fragment (or a Tabs block with tab fragments).
- **Rendering:** the inner fragment loads while the outer one is decorated; the chain of including fragments (`main[data-fragment-chain]`) stops a fragment from including itself or the host page.
- **Performance:** each level adds a sequential request.

```text
[Screenshot Placeholder]

File name:
fragment-nested-desktop.png

Purpose:
A fragment containing another fragment, both rendered once.

Annotations:
A = Outer fragment
B = Inner fragment
```

#### Shared loader (header, footer, tabs, modal)

- **Purpose:** the same `loadFragment` loads the Navigation page (`blocks/header`), the footer page and its Canvas page (`blocks/footer`), a tab's Fragment (`blocks/tabs`, passing the tab row as `from`) and modal content (`blocks/modal`).
- **Rendering:** the caller places the decorated sections; see each block's README.

```text
[Screenshot Placeholder]

File name:
fragment-in-tab-desktop.png

Purpose:
A Tabs block panel showing a tab fragment.

Annotations:
A = Tab
B = Panel with the fragment's content
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
