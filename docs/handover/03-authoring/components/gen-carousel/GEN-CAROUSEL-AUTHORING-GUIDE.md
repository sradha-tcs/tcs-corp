---
id: "AUT-C-gen-carousel"
title: "Gen Carousel — Authoring Guide"
role: "Authoring"
topic: "component authoring"
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/gen-carousel/README.md","blocks/gen-carousel/_gen-carousel.json"]
relatedComponents: ["gen-carousel"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Gen Carousel — Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-C-gen-carousel |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | How to add, fill in and check the Gen Carousel component |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/gen-carousel/README.md, blocks/gen-carousel/_gen-carousel.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Where to see it](#where-to-see-it)
- [For Content Authors](#for-content-authors)
- [Authorable Fields](#authorable-fields)
- [Screenshot-Based Authoring Steps](#screenshot-based-authoring-steps)
- [Variations](#variations)
- [Complete Authoring Example](#complete-authoring-example)
- [Content and Asset Guidelines](#content-and-asset-guidelines)
- [Troubleshooting](#troubleshooting)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Where to see it

- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/gen-carousel
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/gen-carousel/auto
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/gen-carousel/hero-slides
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/gen-carousel/manual-and-auto
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/gen-carousel/single-slide
- https://main--tcs-corp--sradha-tcs.aem.live/design-block-master/en/block-library/gen-carousel/teaser-slides

## For Content Authors

1. **Add the section.** In Universal Editor select the page (main) in the content tree, choose **Add (+)** and pick **Gen Carousel**. It is offered only at the page level, like a Section. A new carousel stores Style Default, Navigation Manual and Autoplay interval 5.
2. **Open its properties.** Select the Gen Carousel; the panel shows **Content** and **Additional**.
3. **Choose the navigation (Content tab).** **Navigation**: Manual (arrows, dots, swipe), Auto (autoplay with a pause button and dots) or Manual and Auto (both). With Auto or Manual and Auto, set **Autoplay interval (seconds)** (2 to 30). Enter an **Accessible name** that describes the slides, e.g. "Customer stories" (default "Carousel").
4. **Add slides.** Select the Gen Carousel, choose **Add (+)** and pick **Hero** or **Teaser**; author each one as usual (see their documentation). Every block becomes one slide, in content tree order; drag to reorder.
5. **Additional tab.** Anchor ID, Hide block (hides the whole section), Animation Type, Motion Speed, Animation Trigger and spacing of the carousel.
6. **Preview.** In edit mode autoplay doesn't run and selecting a component shows its slide; switch to Preview (or open aem.page) to check autoplay, swipe and the controls at desktop and mobile widths.
7. **Publish** the page with its assets.
8. **Validate the published output.** The controls appear from two slides, every dot shows content, autoplay pauses and plays, and only one H1 is on the page (Hero slides after the first should use Title heading level H2).

**Minimum required content:** two slides (one slide renders without controls). **Recommended:** two to five slides with one primary CTA each, an Accessible name, Manual or Manual and Auto. **Optional:** autoplay, Additional tab options.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

#### Gen Carousel (`gen-carousel`)

Model `gen-carousel`; template name "Gen Carousel" (the block class AEM renders); children: `hero`, `teaser`.

Stored on a new component (definition template): `style` = `"gen-carousel-section"`, `carouselNavigation` = `"manual"`, `carouselInterval` = `5`.

##### Content tab — Gen Carousel

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Style | `style` | select | No | `gen-carousel-section` | Default (`gen-carousel-section`) | — | gen-carousel-section |
| Navigation | `carouselNavigation` | select | No | `manual` | Manual (`manual`), Auto (`auto`), Manual and Auto (`manual-auto`) | Manual: previous / next buttons, dots and swipe. Auto: slides advance on their own, with a pause button. Manual and Auto: both. | manual-auto |
| Accessible name | `carouselAriaLabel` | text | No | — | — | Names the carousel for screen reader users, e.g. Customer stories (default: Carousel). | — |
| Autoplay interval (seconds) | `carouselInterval` | number | No | `5` | — | Time each slide is shown before the next one appears. Shown when `carouselNavigation` is not `manual`. | 7 |

##### Additional tab — Gen Carousel

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `containerAnchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. | — |
| Hide block | `containerHide` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). | — |
| Animation Type | `containerAnimation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. | — |
| Motion Speed | `containerAnimationSpeed` | select | No | "" | Medium (""), Fast (`motion-fast`), Slow (`motion-slow`) | How fast the animation runs: 0.3, 0.6 or 0.9 seconds. Shown when `containerAnimation` is set and `containerAnimation` is not empty. | — |
| Animation Trigger | `containerAnimationTrigger` | select | No | "" | On Scroll / Viewport Entry (""), On Page Load (`motion-on-load`) | When the block's animations run. On Scroll: when the block comes into view (at once if it is in view when the page opens). On Page Load: as soon as the block is ready, wherever it is on the page. Shown when `containerAnimation` is set and `containerAnimation` is not empty. | — |
| Padding left | `containerPaddingLeft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | — | — |
| Padding right | `containerPaddingRight` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | — | — |
| Padding top | `containerPaddingTop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | — | — |
| Padding bottom | `containerPaddingBottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | — | — |
| Margin left | `containerMarginLeft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | — | — |
| Margin right | `containerMarginRight` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | — | — |
| Margin top | `containerMarginTop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | — | — |
| Margin bottom | `containerMarginBottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | — | — |

<!-- END GENERATED: fields -->

Notes on the significant fields:

- **Style.** Must stay Default (`gen-carousel-section`): `buildCarouselSections` turns only sections with this class into a carousel.
- **Navigation.** Delivered as the section's `data-carouselnavigation` and put on the carousel block as a class (`manual`, `auto`, `manual-auto`); anything else is read as Manual. Accessibility: Manual modes add the arrows and the ArrowLeft / ArrowRight keys; Auto modes add the pause / play button (WCAG 2.2.2). Data layer: the controls carry `data-cmp-interaction`.
- **Accessible name.** Delivered as `data-carouselarialabel`; becomes the region's `aria-label` (else the placeholder `carousel`, "Carousel").
- **Autoplay interval (seconds).** The model limits it to 2–30; the code reads `data-interval`, uses 5 when missing or invalid and at least 2 seconds.
- **Legacy mapping.** None for the carousel fields.
- **Additional tab.** AEM doesn't deliver a section's `classes_*` fields, so the carousel's Additional tab fields are `container*` (`containerAnchor`, `containerHide`, `containerAnimation`, `containerAnimationSpeed`, `containerAnimationTrigger`, `containerPadding*`, `containerMargin*`); `scripts.js` `applySectionBlockOptions` turns them into the synthetic block's classes (AGENTS.md "Additional tab" and "AEM delivery rules"). Hide block hides the whole section on the page (`styles/styles.css`). The content animation moves the carousel block as a whole. Slides keep their own Additional tabs.

## Screenshot-Based Authoring Steps

#### Authoring Step 1: Add the Gen Carousel

```text
[Screenshot Placeholder]

File name:
gen-carousel-authoring-step-1.png

Purpose:
The page's Add (+) menu at the main level with Gen Carousel, and the new carousel in the content tree.

Annotations:
A = Page (main) selected
B = Add (+) › Gen Carousel
C = New Gen Carousel
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | (content tree) | The page (main) | Gen Carousel is a page-level section | Page selected |
| B | Add (+) | Gen Carousel | Adds the section | A Gen Carousel section |
| C | (properties) | — | Template values | Style Default, Navigation Manual, interval 5 |

Author action: select the page, Add (+) › Gen Carousel; move it to the top if it is the opening banner. Expected preview: an empty section. Business rule: only the `main` filter offers it. Validation: it appears at the top level of the content tree. Common mistake: looking for it inside a Section (it isn't offered there).

#### Authoring Step 2: Navigation and name

```text
[Screenshot Placeholder]

File name:
gen-carousel-authoring-step-2.png

Purpose:
The Content tab with Navigation Manual and Auto, an Accessible name and an interval of 7 seconds.

Annotations:
A = Navigation
B = Accessible name
C = Autoplay interval (seconds)
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Navigation | Manual and Auto | Rotation with manual control | Pause button, arrows and dots |
| B | Accessible name | Customer stories | Names the region for screen readers | `aria-label="Customer stories"` |
| C | Autoplay interval (seconds) | 7 | Time to read each slide | A slide change every 7 seconds |

Author action: open the Content tab, enter the values. Expected preview: the interval field appears only when Navigation isn't Manual. Business rule: 2 to 30 seconds. Validation: `data-interval="7"` on the carousel block. Common mistake: a very short interval; resolution: at least 5 seconds.

#### Authoring Step 3: Add the slides

```text
[Screenshot Placeholder]

File name:
gen-carousel-authoring-step-3.png

Purpose:
Three Heroes added to the Gen Carousel, the second one selected and shown as slide 2.

Annotations:
A = Hero slides in the content tree
B = Slide shown for the selected Hero
C = Dots
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Add (+) | Hero (three times) | One message per slide | Three slides, three dots |
| B | Hero › Title / Title heading level | Building on belief, H1 (slide 1); H2 on the others | One H1 per page | Headings in order |
| C | Hero › CTA | Explore AI services, Primary | One action per slide | One button per slide |

Author action: select the carousel, Add (+) › Hero; author each Hero. Expected preview: selecting a Hero shows its slide. Business rule: every block is one slide. Validation: the number of dots equals the number of blocks. Common mistake: hiding a slide with Hide block (it still counts as a slide and shows empty); resolution: delete or move it.

#### Authoring Step 4: Preview, publish and verify

```text
[Screenshot Placeholder]

File name:
gen-carousel-authoring-step-4.png

Purpose:
The carousel in Preview with autoplay running and the published page at mobile width.

Annotations:
A = Pause / play button
B = Current dot
C = Next button
```

#### Values to Enter

| Callout | Field | Value | Reason | Expected result |
| ------- | ----- | ----- | ------ | --------------- |
| A | Preview | On | Autoplay doesn't run in edit mode | Slides advance every 7 seconds |
| B | Publish | Page with assets | Live page | The carousel on aem.live |

Author action: switch to Preview, check autoplay and the controls, publish. Validation: pause stops the rotation; keyboard arrows on the controls change slides. Common mistake: judging autoplay in edit mode; resolution: test in Preview.

## Variations

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

## Complete Authoring Example

Scenario: the home page opening rotation with three Heroes.

| Field | Example value | Guidance |
| ----- | ------------- | -------- |
| Navigation | Manual and Auto | Rotation with control |
| Accessible name | Highlights | Describes the slides |
| Autoplay interval (seconds) | 7 | At least 5 for reading |
| Slide 1 | Hero "Building on belief", H1, BG Color Dark blue, CTA "Explore AI services" | The most important message first (LCP) |
| Slide 2 | Hero, H2, CTA | One message |
| Slide 3 | Hero, H2, CTA | One message |
| Additional | — | Defaults |

Steps: add the Gen Carousel at the top of the page (Authoring Step 1), set the navigation (Step 2), add the three Heroes (Step 3), preview and publish (Step 4).

Expected output: slide 1 visible with pause, previous, three dots and next below it; slides advance every 7 seconds until the visitor hovers, focuses or pauses.

Responsive: slides are always one at a time and full width; the controls sit `--space-600` below the slides (`--space-800` from 900px).

Accessibility: region named "Highlights", slides "1 of 3", pause control, keyboard on the controls, hidden slides inert.

Analytics / data layer: `gen-carousel-1` in the data layer with the Heroes as children; `cmp:show` for each slide change; `cmp:click` for the controls.

Personalization fallback: none; the slides render in authored order.

Pre-publish checklist:

- [ ] At least two slides; no slide hidden with Hide block.
- [ ] Only slide 1 has an H1 (the others H2), or the page has another single H1.
- [ ] Accessible name entered.
- [ ] Interval at least 5 seconds for Auto modes.
- [ ] Each slide has alt text and one clear CTA.
- [ ] Checked in Preview at desktop and mobile widths.

## Content and Asset Guidelines

- **Titles, descriptions, eyebrows, CTAs.** Follow the Hero / Teaser rules; one message and one primary CTA per slide; distinct CTAs across slides.
- **Images and alt text.** Per slide block; use the same aspect ratio on all slides so heights stay consistent; the first slide's image is the LCP candidate when the carousel opens the page.
- **Icons.** Controls use `icons/chevron-left.svg`, `chevron-right.svg`, `pause.svg`, `play.svg`.
- **Tags and metadata.** None.
- **Min / max items.** Controls need at least two slides; no verified technical maximum was identified.
- **Asset source.** The slides' own DAM assets.
- **Loading.** All slides are decorated with the section; their images follow the slide blocks' loading rules.
- **Missing-asset fallback.** A slide without content still counts as a slide (an empty slide and dot).

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| Slides stacked, no carousel | Section isn't a Gen Carousel (no `gen-carousel-section`) or a script error | Look for `div.gen-carousel-wrapper`; console | Use the Gen Carousel component and move the blocks into it | One slide with controls |
| No controls | Only one slide | Count the blocks | Add slides or use the Hero alone | Controls from two slides |
| Autoplay doesn't run | Navigation Manual; paused; reduced motion; hovered; focus inside; off screen; edit mode | Block class and pause / play label; OS setting; test in Preview | Set Auto or Manual and Auto; select Play | Slides advance |
| Interval differs | Missing / invalid value (5 s) or below 2 (2 s); interaction restarts it | `data-interval` on the block | Enter 2–30 and publish | Interval matches |
| Swipe doesn't work | Navigation Auto (by design) | `auto` class | Use Manual and Auto | Swipe changes slide |
| Empty slide / dot | A slide with Hide block or no content | Check each slide's Additional tab | Delete or move the block | Every dot shows content |
| Many `cmp:show` events | Autoplay changes count as slide views | Inspect `window.adobeDataLayer` | Define the slide view in the measurement plan | Reports match the definition |

Evidence to collect (no secrets): URL, viewport, the section's data attributes, the block's classes and `data-interval`, console errors, the data-layer events.

## Screenshots

![Gen Carousel as published (block library) at desktop 1440 × 900, published page /design-block-master/en/block-library/gen-carousel/auto](./screenshots/block-library-gen-carousel-auto-1440.jpg)

*Figure: Gen Carousel as published (block library) — desktop 1440 × 900 (/design-block-master/en/block-library/gen-carousel/auto, captured 2026-11-08).*

![Gen Carousel as published (block library) at mobile 375 × 812, published page /design-block-master/en/block-library/gen-carousel/auto](./screenshots/block-library-gen-carousel-auto-375.jpg)

*Figure: Gen Carousel as published (block library) — mobile 375 × 812 (/design-block-master/en/block-library/gen-carousel/auto, captured 2026-11-08).*

> **Screenshot required**
>
> - Required screen: Gen Carousel dialog in Universal Editor (every tab, including Additional)
> - Required role/access: AEM Sites author with Universal Editor (content author)
> - Required navigation steps: AEM Sites console > /content/tcs-corp/language-masters/en > open a page in Universal Editor
> - Reason unavailable: No AEM author access in the documentation program (access blocker AB-01)
> - Owner: Content Lead / AEM Authoring Lead (proposed)
> - Target completion date: To be confirmed

## Known limitations

- Universal Editor screenshots are placeholders: no author access in this program.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
