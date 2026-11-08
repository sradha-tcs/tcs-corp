---
id: "DEV-V-footer"
title: "Footer Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/footer/_footer.json"]
relatedComponents: ["footer"]
relatedPages: ["/design-block-master/en/block-library/footer","/design-block-master/en/block-library/footer/campaign-page","/design-block-master/en/block-library/footer/default-footer-page","/design-block-master/en/block-library/footer/footer-campaign","/design-block-master/en/block-library/footer/footer-conversation-canvas","/design-block-master/en/block-library/footer/footer-default","/design-block-master/en/block-library/footer/footer-investors","/design-block-master/en/block-library/footer/investors-page"]
confidence: "Medium"
primary: false
---

# Footer Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-footer |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Footer block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/footer/_footer.json |
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
| `footer` | Link List › Link Type (`linkTarget`) | — | No | Default = `""`; Open in new window = `new-window` | `` |
| `footer-link` | Open in (`linkTarget`) | — | No | Same tab = `""`; New tab = `new-window` | `` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Footer blocks on the published block library pages (8 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| footer | Link List › Link Type | Default | `""` | Supported (in the model) | n/a (default) |
| footer | Link List › Link Type | Open in new window | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |
| footer-link | Open in | Same tab | `""` | Supported (in the model) | n/a (default) |
| footer-link | Open in | New tab | `new-window` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Default locale footer

- **Purpose:** the footer of every page without a Footer value: `/{locale}/references/footer`.
- **Fields / configuration:** none on the content page.
- **Rendering:** the footer page's sections in `footer > div.footer > div`, then `ul.footer-social`.
- **Desktop / tablet / mobile:** see [Responsive Behavior](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/footer/README.md#responsive-behavior).
- **Accessibility / data layer:** `<footer>` landmark; clicks on `footer-1` / `footer-2`.
- **Personalization / fallback:** none; a failing footer page leaves the social row.

```text
[Screenshot Placeholder]

File name:
footer-default-desktop.png

Purpose:
A content page ending with the default footer at 1440px.

Annotations:
A = Footer Canvas
B = Footer bar
C = Social icons
```

#### Area-specific footer

- **Purpose:** another footer page for an area or campaign (`references/footer-campaign`).
- **Configuration:** Page Properties › Footer on the area's top page, or the metadata `footer` column.
- **Rendering:** as the default; only the footer page differs; the Social Links are added to every footer page.

```text
[Screenshot Placeholder]

File name:
footer-campaign-desktop.png

Purpose:
A campaign page ending with the campaign footer (no Canvas).

Annotations:
A = Copyright
B = Campaign links
```

#### Footer bar only (no Canvas)

- **Purpose:** a compact footer.
- **Fields:** Copyright Text and Footer Links; Conversation Canvas Page empty.
- **Rendering:** `div.footer-bar` only; no minimum height.

```text
[Screenshot Placeholder]

File name:
footer-bar-only-mobile.png

Purpose:
The bar at 390px: the copyright above the links.

Annotations:
A = Copyright
B = Links
```

#### Footer with Conversation Canvas

- **Purpose:** the design's footer: the Canvas above the bar.
- **Fields:** Conversation Canvas Page.
- **Rendering:** `div.footer-canvas` with the Canvas page's sections; the footer gets a minimum height (50rem, 59.75rem from 600px, 50.125rem from 1200px) and the bar sits at its bottom; title 3.25rem (6rem from 600px), buttons stacked below 600px, the Canvas menu button from 600px.
- **Data layer:** the Canvas is its own component; it is the footer stop of the floating journey.

```text
[Screenshot Placeholder]

File name:
footer-canvas-mobile.png

Purpose:
The footer Canvas at 390px (see Visual Reference).

Annotations:
A = Title
B = Search
```

#### Social links (icons, images, text)

- **Purpose:** the locale's channels from the Social Links sheet.
- **Rendering:** `ul.footer-social[aria-label="Follow us"] > li > a` with `span.icon.icon-{name}` (1.5rem), an image for an icon URL (`alt=""`), or the visible label text; the label "Follow us on {platform}" is visually hidden behind an icon.
- **Accessibility:** external links open a new tab and say so in the label.

```text
[Screenshot Placeholder]

File name:
footer-social-fallbacks-desktop.png

Purpose:
A social row with an /icons icon, an image icon and a text label.

Annotations:
A = Icon
B = Image icon
C = Text label
```

#### Footer Link opening in a new tab

- **Purpose:** an external destination.
- **Fields:** Open in = New tab.
- **Rendering:** `target="_blank"`, `rel="noopener noreferrer"`, hidden " (opens in a new tab)".

```text
[Screenshot Placeholder]

File name:
footer-new-tab-desktop.png

Purpose:
The investors footer with "Investor relations" opening a new tab.

Annotations:
A = Investor relations link
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
