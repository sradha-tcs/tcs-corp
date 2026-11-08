---
id: "DEV-V-video"
title: "Video Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/video/_video.json"]
relatedComponents: ["video"]
relatedPages: ["/design-block-master/en/block-library/video","/design-block-master/en/block-library/video/video","/design-block-master/en/block-library/video/video-pop-up"]
confidence: "Medium"
primary: false
---

# Video Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-video |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Video block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/video/_video.json |
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
| `video` | Playback (`playback`) | Playback | No | Play button (on the poster image) = `click`; Autoplay when in view (muted) = `autoplay`; Background video (autoplay, muted, loop, no controls) = `background` | `click` |
| `video` | Aspect Ratio (`aspectRatio`) | Playback | No | 16:9 (widescreen) = `16-9`; 4:3 = `4-3`; 1:1 (square) = `1-1`; 21:9 (cinema) = `21-9`; 9:16 (vertical) = `9-16` | `16-9` |
| `video` | Size (`size`) | Playback | No | Full width = `full`; Large (900px) = `large`; Medium (640px) = `medium`; Small (420px) = `small` | `large` |
| `video` | Alignment (`alignment`) | Playback | No | Center = `center`; Left = `left`; Right = `right` | `center` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Video blocks on the published block library pages (3 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| video | Playback | Play button (on the poster image) | `click` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Playback | Autoplay when in view (muted) | `autoplay` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Playback | Background video (autoplay, muted, loop, no controls) | `background` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Aspect Ratio | 16:9 (widescreen) | `16-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Aspect Ratio | 4:3 | `4-3` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Aspect Ratio | 1:1 (square) | `1-1` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Aspect Ratio | 21:9 (cinema) | `21-9` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Aspect Ratio | 9:16 (vertical) | `9-16` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Size | Full width | `full` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Size | Large (900px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Size | Medium (640px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Size | Small (420px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Alignment | Left | `left` | Supported (in the model) | Not checkable (data attribute / field value) |
| video | Alignment | Right | `right` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

#### Play button on the poster (default)

- **Purpose / when to use:** most videos; nothing loads from the provider or the file until Play.
- **Fields:** Video; recommended Title, Poster Image and alt text. Playback = Play button.
- **Rendering:** `div.video-placeholder` with the poster and the Play button (`button.video-placeholder-play`);
  after Play the player is built with autoplay (sound on unless Muted) and focus moves into it once
  it has loaded. Without a poster (and no pop-up) the player itself loads when the block comes into
  view, with its controls, and isn't autoplayed.
- **Responsive:** the media area scales with the content width at every viewport; the Size caps it.
- **Accessibility:** a native `button` named "Play video: {title}"; focus continues in the player.
- **Data layer:** the Play click is a `cmp:click` (interaction `button`); file playback pushes
  `cmp:media`.
- **Personalization / fallback:** none; without a poster the native player's first frame shows.

```text
[Screenshot Placeholder]

File name:
video-play-button-mobile.png

Purpose:
The poster with the Play button at 390 px, filling the content width.

Annotations:
A = Poster
B = Play button
```

#### Play in a Pop-up

- **Purpose / when to use:** a keynote or film watched in focus, over the page. Not with autoplay
  or background playback (the field is hidden there).
- **Fields:** Video, Play in a Pop-up on; recommended Title and Poster Image.
- **Rendering:** the poster (or, without one, the dark media area) with the Play button; Play opens
  a native `dialog` (Modal block's `createModal`) holding a hidden `h2` with the Title and the
  player, which starts at once. The dialog width is `min(90vw, 75rem, 80vh × ratio)`. Closing
  removes the dialog and the video; focus returns to the Play button. A double click opens one
  dialog.
- **Accessibility:** the dialog is named by the Title; Escape and the Close button close it.
- **Data layer:** `cmp:click` on the Play button, `cmp:show` / `cmp:hide` (interaction `dialog`) for
  the dialog, `cmp:media` of a file in it (on the dialog's `modal-N` component).

```text
[Screenshot Placeholder]

File name:
video-popup-closed-focus-desktop.png

Purpose:
After closing the pop-up with Escape: the poster again, keyboard focus back on the Play button.

Annotations:
A = Play button with the focus outline
```

#### Autoplay when in view

- **Purpose / when to use:** a short, muted teaser that starts as it scrolls into view. Not for
  essential information or speech without captions.
- **Fields:** Video, Playback = Autoplay when in view; recommended Poster Image (shown while it
  loads and to reduced-motion visitors), Show Player Controls.
- **Rendering:** the player is built when the block comes into view, muted and autoplaying; a poster
  shows until it can play. With Show Player Controls off a pause / stop button (`button.video-toggle`)
  is added: pause / play for files, stop / play for YouTube and Vimeo (the frame is removed and
  rebuilt, so it restarts). Files pause off screen and resume when back (Pause When Out of View).
- **Accessibility:** the toggle meets WCAG 2.2.2; reduced motion turns this into Play button playback.
- **Data layer:** toggle clicks are `cmp:click` with interaction `playback`; file play / pause are
  `cmp:media`, except the pauses and resumes of Pause When Out of View.

```text
[Screenshot Placeholder]

File name:
video-autoplay-with-controls-desktop.png

Purpose:
An autoplay video file with Show Player Controls on: the native controls visible, no separate toggle.

Annotations:
A = Native controls
```

#### Background video

- **Purpose / when to use:** a decorative, silent loop (ambience). Not for content visitors must see.
- **Fields:** Video, Playback = Background video; recommended Poster Image.
- **Rendering:** muted, looping, no controls (YouTube `disablekb`, Vimeo `background=1`); the player
  is `aria-hidden` and its iframe out of the tab order; the pause / stop button is always added.
- **Accessibility:** decorative for screen readers; the toggle is the only control.
- **Data layer:** native media events of a background file aren't pushed (muted, looping, no
  controls); the toggle click is a `cmp:click` (`playback`).

```text
[Screenshot Placeholder]

File name:
video-background-mobile.png

Purpose:
A Full width background video at 390 px with the pause button in the bottom-right corner.

Annotations:
A = Background video
B = Pause button
```

#### Sources: AEM Assets file, YouTube, Vimeo

- **File:** native `video` with `controlslist="nodownload"`, no context menu, `playsinline`,
  `preload` `auto` when autoplaying else `metadata`, WebVTT captions, start / end media fragment.
- **YouTube:** watch, `youtu.be`, `/embed/`, `/shorts/` and `/live/` URLs; `rel=0`, `enablejsapi=1`
  (Tabs can pause it), `playsinline`; loop through `playlist`.
- **Vimeo:** `vimeo.com/{id}`, `player.vimeo.com/video/{id}`, channel URLs and unlisted hashes
  (`h`), unit tested in [vimeo-url.test.mjs](https://github.com/sradha-tcs/tcs-corp/blob/main/test/media/vimeo-url.test.mjs).
- **Privacy:** see Privacy-enhanced Mode above.

```text
[Screenshot Placeholder]

File name:
video-vimeo-desktop.png

Purpose:
A Vimeo video playing in place after Play at 1440 px.

Annotations:
A = Vimeo player frame
```

#### Display: aspect ratio, size, alignment, corners

| Option | Values | Rendering |
| ------ | ------ | --------- |
| Aspect Ratio | 16:9 (default), 4:3, 1:1, 21:9, 9:16 | `aspect-ratio` of `.video-media`; files and posters cropped (`object-fit: cover`) |
| Size | Full width, Large (default), Medium, Small | `max-width` none, 56.25rem, 40rem, 26.25rem |
| Alignment | Center (default), Left, Right | `margin-inline` auto on one or both sides |
| Rounded Corners | On (default), Off | `border-radius: var(--radius-l)` (1rem) or 0 |

Screenshots of every value exist (see the generated table above).

#### Reduced motion (automatic)

Visitors whose system asks for reduced motion get Play button playback for every Autoplay and
Background video: the poster with the Play button, or the player with controls when there is no
poster. No author setting.

#### Blocks authored with an earlier model (compatibility)

One-row-per-field blocks and first-model blocks (a link and a picture, `autoplay` option) still
render (see the legacy mapping above). Screenshot: `video-legacy.jpg` in the generated table.

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
