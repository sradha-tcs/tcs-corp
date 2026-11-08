---
id: "DEV-V-modal"
title: "Modal Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/modal/_modal.json"]
relatedComponents: ["modal"]
relatedPages: ["/design-block-master/en/block-library/modal","/design-block-master/en/block-library/modal/auto-linked-modal","/design-block-master/en/block-library/modal/fragments","/design-block-master/en/block-library/modal/fragments/contact-form","/design-block-master/en/block-library/modal/fragments/privacy-notice","/design-block-master/en/block-library/modal/fragments/recognition","/design-block-master/en/block-library/modal/fragments/terms","/design-block-master/en/block-library/modal/modal-block","/design-block-master/en/block-library/modal/modal-long-content","/design-block-master/en/block-library/modal/modal-with-a-form"]
confidence: "Medium"
primary: false
---

# Modal Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-modal |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Modal block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/modal/_modal.json |
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

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Modal blocks on the published block library pages (10 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

#### Modal block (button opener)

- **Purpose:** an explicit button opening the dialog.
- **Required:** Modal Content. **Optional:** Button Text, Additional tab.
- **Rendering:** `div.modal.block > button.button.primary[aria-haspopup=dialog]`; on click a new `div.modal.block` is appended to `main` with the `dialog`. A double click opens one dialog.
- **Desktop / tablet / mobile:** see [Responsive Behavior](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/modal/README.md#responsive-behavior).
- **Accessibility:** native modal dialog; focus returns to the button.
- **Data layer:** opener click, then `cmp:show` / `cmp:hide` on `{opener id}-dialog`.
- **Personalization / fallback:** none; a modal page that can't load opens nothing.

```text
[Screenshot Placeholder]

File name:
modal-block-open-desktop.png

Purpose:
The awards dialog open from its button at 1440px.

Annotations:
A = Dialog
B = Close button
```

#### Auto-linked `/modal/` link

- **Purpose:** open a modal from any link (text, button, header or footer) without a Modal block.
- **Configuration:** a link whose URL path contains `/modal/`.
- **Rendering:** a document click listener (`autolinkModals`, started in the lazy phase) prevents the navigation and calls `openModal(href, { opener })`; links already handled (`defaultPrevented`) are skipped.
- **Data layer:** dialog id `modal-{path as class name}`.
- **Note:** in Universal Editor the editor navigates to clicked links; use a Modal block to open dialogs there.

```text
[Screenshot Placeholder]

File name:
modal-auto-link-desktop.png

Purpose:
A dialog opened by an inline link to a /modal/ page.

Annotations:
A = Inline link
B = Dialog
```

#### Component dialog (`createModal`)

- **Purpose:** the same dialog for block features: the Video block's Play in a Pop-up passes its player to `createModal([wrapper])`.
- **Rendering:** no fragment request; the content is the caller's nodes; naming, closing and data layer as above (id `modal-{n}`, no stable id passed).

```text
[Screenshot Placeholder]

File name:
modal-video-popup-desktop.png

Purpose:
A Video block playing in the dialog.

Annotations:
A = Video player in the dialog
B = Close button
```

#### Long content

- **Purpose:** terms or details longer than the screen (library `modal-long-content`).
- **Rendering:** the dialog is never taller than the visible area minus twice its gap; the content scrolls inside (`overflow-y: auto`, `overscroll-behavior: contain`); the close button stays at the top (sticky); the page is locked (`body.modal-open`).

```text
[Screenshot Placeholder]

File name:
modal-long-content-mobile.png

Purpose:
The programme terms scrolled inside the dialog at 390px.

Annotations:
A = Sticky close button
B = Scrolled content
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
