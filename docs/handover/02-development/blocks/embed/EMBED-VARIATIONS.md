---
id: "DEV-V-embed"
title: "Embed Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/embed/_embed.json"]
relatedComponents: ["embed"]
relatedPages: ["/design-block-master/en/block-library/embed","/design-block-master/en/block-library/embed/embed"]
confidence: "Medium"
primary: false
---

# Embed Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-embed |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Embed block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/embed/_embed.json |
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

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Embed blocks on the published block library pages (2 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |

## Narrative (block README)

#### YouTube

- **Purpose:** public, embeddable YouTube videos. **Fields:** URI; optional placeholder.
- **Rendering:** `div.embed-frame > iframe` (16:9, rounded `--radius-l`), block classes
  `embed-youtube embed-is-loaded`; privacy-enhanced host always (no option).
- **Accessibility:** iframe title "Content from youtube-nocookie.com"; captions are the video's own.
- **Data layer:** player interactions aren't tracked; Play is a `cmp:click` (`play`).

```text
[Screenshot Placeholder]

File name:
embed-youtube-mobile.png

Purpose:
A YouTube embed without placeholder at 390 px, filling the content width.

Annotations:
A = Player frame
```

#### Vimeo

- **Rendering:** `player.vimeo.com/video/{id}` with `dnt=1` (and `h` for unlisted videos);
  `embed-vimeo`. Otherwise as YouTube.

```text
[Screenshot Placeholder]

File name:
embed-vimeo-desktop.png

Purpose:
A Vimeo embed at 1440 px.

Annotations:
A = Vimeo player frame
```

#### X (Twitter) post

- **Rendering:** `blockquote.twitter-tweet` with a link to the post (its address as text) until
  the X widget script replaces it; `embed-twitter`; the rendered post is centred. The post takes the
  widget's height (no 16:9 frame).
- **Accessibility / data layer:** a click on the fallback link is a `cmp:click` (`link`, `exit`);
  clicks inside the rendered widget aren't tracked.
- **Fallback:** if the widget never loads, the link stays.

#### Generic iframe

- **Purpose:** an approved page that allows framing. **Rendering:** a 16:9 `div.embed-frame`
  iframe of the URL (`allow="encrypted-media"`, fullscreen, lazy). No height or ratio option; no
  host allow-list. A site that forbids framing shows the browser's refusal in the frame.

#### Placeholder image with Play (click-to-load)

- **Purpose:** branded first view and no provider request until Play; recommended for videos.
- **Rendering:** `div.embed-placeholder` (picture + `button.embed-placeholder-play`); Play replaces it
  with the embed (with autoplay for YouTube / Vimeo) and focuses the iframe (or the X link).
- **Accessibility:** native `button`, named from the alt text; focus moves into the player.
- **Data layer:** `cmp:click` with `interaction` `play`.

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
