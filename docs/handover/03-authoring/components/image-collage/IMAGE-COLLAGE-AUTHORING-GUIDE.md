---
id: "AUT-C-image-collage"
title: "Image Collage — Authoring Guide"
role: "Authoring"
topic: "component authoring"
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/image-collage/README.md","blocks/image-collage/_image-collage.json"]
relatedComponents: ["image-collage"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Image Collage — Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-C-image-collage |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | How to add, fill in and check the Image Collage component |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/image-collage/README.md, blocks/image-collage/_image-collage.json |
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

No block library page.

## For Content Authors

1. Add an Image Collage to a Section, a Columns Container column or a Tab.
2. Fill in the Content tab: Title (with its heading level), Description and the CTAs.
3. Add up to nine Collage image items with Add, each with an image, its alt text and the Image treatment (Black and white by default, or Normal).
4. Adjust the Style tab (title weight, description size, background colour) and the Additional tab (anchor, hide, spacing, animation) if needed.
5. Preview and publish the page; the images in AEM Assets are published with it.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

#### Image Collage (`image-collage`)

Model `image-collage`; template name "Image Collage" (the block class AEM renders); key-value block (one row per property); children: `image-collage-item`.

Stored on a new component (definition template): `titleType` = `"h2"`, `showDescription` = `true`, `primaryCtaStyle` = `"primary"`, `secondaryCtaStyle` = `"secondary"`.

##### Content tab — Image Collage

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Title | `title` | text | No | — | — | — | — |
| Title Type | `titleType` | select | No | `h2` | H1 (`h1`), H2 (`h2`), H3 (`h3`), H4 (`h4`), H5 (`h5`), H6 (`h6`) | Select the semantic heading level. The visual title treatment is controlled by the Image Collage design. The heading level of the title, which also sets its size (desktop sizes; smaller on mobile). Use one H1 per page. Delivered with `title` (field collapse). | — |
| Hide Title | `titleHidden` | boolean | No | `false` | on / off | The title stays available to screen readers. | — |
| Description | `description` | richtext | No | "" | — | — | — |
| Show Description | `showDescription` | boolean | No | `true` | on / off | — | — |
| Primary CTA Title | `primaryCtaText` | text | No | — | — | Delivered with `primaryCta` (field collapse). | — |
| Primary CTA Link | `primaryCta` | aem-content | No | — | — | — | — |
| Primary CTA Link Type | `primaryCtaTarget` | select | No | "" | Default (""), Open in New Window (`new-window`) | — | — |
| Primary CTA Link Style | `primaryCtaStyle` | select | No | `primary` | Primary Button (`primary`), Primary Button (no arrow) (`primary-no-arrow`), Secondary Button (`secondary`), Secondary Button (no arrow) (`secondary-no-arrow`) | — | — |
| Primary CTA Background | `primaryCtaBackground` | select | No | "" | Style default (""), White (`button-bg-white`), Blue (`button-bg-blue`), Translucent white (`button-bg-translucent`) | Sets the Primary CTA button background. Blue uses rgb(33 106 195). | — |
| Primary CTA Shape | `primaryCtaShape` | select | No | "" | Style default (""), Rectangle (`button-rectangle`) | Sets the Primary CTA shape. Rectangle uses the grey-200 border. | — |
| Secondary CTA Title | `secondaryCtaText` | text | No | — | — | Delivered with `secondaryCta` (field collapse). | — |
| Secondary CTA Link | `secondaryCta` | aem-content | No | — | — | — | — |
| Secondary CTA Link Type | `secondaryCtaTarget` | select | No | "" | Default (""), Open in New Window (`new-window`) | — | — |
| Secondary CTA Link Style | `secondaryCtaStyle` | select | No | `secondary` | Primary Button (`primary`), Primary Button (no arrow) (`primary-no-arrow`), Secondary Button (`secondary`), Secondary Button (no arrow) (`secondary-no-arrow`) | — | — |
| Secondary CTA Background | `secondaryCtaBackground` | select | No | "" | Style default (""), White (`button-bg-white`), Blue (`button-bg-blue`), Translucent white (`button-bg-translucent`) | Sets the Secondary CTA button background. Blue uses rgb(33 106 195). | — |
| Secondary CTA Shape | `secondaryCtaShape` | select | No | "" | Style default (""), Rectangle (`button-rectangle`) | Sets the Secondary CTA shape. Rectangle uses the grey-200 border. | — |

##### Style tab — Image Collage

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Title weight | `titleWeight` | select | No | "" | Layout default (""), Regular (`title-regular`), Semibold (`title-semibold`) | — | — |
| Description size | `descriptionSize` | select | No | "" | Layout default (""), Regular (18px) (`text-regular`), Large (24px) (`text-large`) | — | — |
| Background color | `backgroundColor` | select | No | "" | Dark (""), Navy (`bg-navy`) | Sets the Image Collage background. Dark uses rgb(12 12 13). Navy uses rgb(1 22 39). | — |

##### Additional tab — Image Collage

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Animation Type | `classes_animation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | — |
| Motion Speed | `classes_animationspeed` | select | No | "" | Medium (""), Fast (`motion-fast`), Slow (`motion-slow`) | How fast the block's animations run (Animation Type 0.3 / 0.6 / 0.9 s; the Background animation takes 1.5 times as long). Shown when (`classes_animation` is set and `classes_animation` is not empty) or (`classes_bganimation` is set and `classes_bganimation` is not empty). Delivered as a block class. | — |
| Animation Trigger | `classes_animationtrigger` | select | No | "" | On Scroll / Viewport Entry (""), On Page Load (`motion-on-load`) | When the block's animations run. On Scroll: when the block comes into view (at once if it is in view when the page opens). On Page Load: as soon as the block is ready, wherever it is on the page. Shown when (`classes_animation` is set and `classes_animation` is not empty) or (`classes_bganimation` is set and `classes_bganimation` is not empty). Delivered as a block class. | — |
| Background animation | `classes_bganimation` | select | No | "" | None (""), Fade in (`bg-motion-fade-in`), Reveal from the centre (`bg-motion-reveal`), Wipe left to right (`bg-motion-wipe-right`), Wipe right to left (`bg-motion-wipe-left`), Wipe bottom to top (`bg-motion-wipe-up`), Scale reveal (`bg-motion-scale`) | How the Collage image background appears. Motion Speed and Animation Trigger apply to it too. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | — |
| Padding left | `classes_paddingleft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | Delivered as a block class. | — |
| Padding right | `classes_paddingright` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | Delivered as a block class. | — |
| Padding top | `classes_paddingtop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | Delivered as a block class. | — |
| Padding bottom | `classes_paddingbottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | Delivered as a block class. | — |
| Margin left | `classes_marginleft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | Delivered as a block class. | — |
| Margin right | `classes_marginright` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | Delivered as a block class. | — |
| Margin top | `classes_margintop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | Delivered as a block class. | — |
| Margin bottom | `classes_marginbottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | Delivered as a block class. | — |

#### Collage image item (`image-collage-item`)

Model `image-collage-item`; template name "Collage image item" (the block class AEM renders).

##### Collage image tab — Collage image item

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Image | `image` | reference | Yes | — | — | Add up to nine Collage image items. Authoring order determines the CSS-controlled image slot. | — |
| Image alt text | `imageAlt` | text | No | — | — | Leave empty when the collage image is decorative. Delivered with `image` (field collapse). | — |
| Image treatment | `imageTreatment` | select | No | `black-white` | Black and white (`black-white`), Normal (`normal`) | — | — |

<!-- END GENERATED: fields -->

Notes on the significant fields:

- **Title Type and the CTA labels** collapse into their base field (AEM field collapse): the title is delivered as a heading of the chosen level, and the labels as the link text. The block reads them from there, as the Teaser does.
- **Show Description** is on by default (definition template); turn it off to keep the text authored but hidden. The block has no eyebrow (removed in b06b792; an eyebrow authored before isn't shown).
- **Title hidden** keeps the title for screen readers only (`hideVisually`).
- **CTA Link Style** Primary / Secondary (with or without the arrow); **CTA Background** (White, Blue, Translucent white) and **CTA Shape** (Rectangle) apply to Primary and Secondary buttons only.
- **Collage image items:** only the first nine with an image are shown; the others stay in Universal Editor as placeholders below the text, so they can be selected and fixed.

## Screenshot-Based Authoring Steps

#### Authoring Step 1: Add the block

In Universal Editor select a Section (or a Columns Container column, or a Tab) and choose Add > Image Collage. The block appears with an empty dark background.

#### Values to Enter

| Field | Example |
| ----- | ------- |
| Title | Stories of transformation |
| Title Type | H2 |

#### Authoring Step 2: Description and CTAs

Enter the Description and the Primary CTA (link, label, target and style); add a Secondary CTA if needed.

#### Values to Enter

| Field | Example |
| ----- | ------- |
| Description | How enterprises around the world build on belief with TCS. |
| Primary CTA | /en/case-studies, label "Explore case studies" |
| Secondary CTA | /en/contact-us, label "Contact us" |

#### Authoring Step 3: Collage images

Select the block and choose Add > Collage image item, up to nine times. Pick an image in each item, enter its alt text and choose the Image treatment.

#### Values to Enter

| Field | Example |
| ----- | ------- |
| Image | An image from `/content/dam/tcs-corp/...` |
| Image Alt Text | Empty or a short description (the images are decorative on the page) |
| Image treatment | Black and white |

## Variations

#### Default

Dark background, black and white images, regular title, regular description, Primary and Secondary CTAs side by side.

#### Colour images

Image treatment Normal on some or all items shows them in colour.

#### Style options

Title weight (Regular, Semibold), Description size (Regular, Large) and Background color (Dark, Navy) set block classes (`title-*`, `text-*`, `bg-navy`).

#### CTA styles

Primary or Secondary, with or without the arrow (`image-collage-cta-no-arrow`), with a White, Blue or Translucent white background and a Rectangle shape (`button-bg-*`, `button-rectangle`).

## Complete Authoring Example

| Field | Value |
| ----- | ----- |
| Title / Title Type | Stories of transformation / H2 |
| Description | How enterprises around the world build on belief with TCS. |
| Primary CTA | /en/case-studies, "Explore case studies", Primary |
| Secondary CTA | /en/contact-us, "Contact us", Secondary |
| Collage image items | Nine images, Black and white |

Expected result: a dark block with the H2 and the description centred, the two CTAs in one row below them, and nine black and white images floating around the text.

## Content and Asset Guidelines

- Use nine images of similar weight; the positions are fixed per slot (`image-collage-item-1` to `-9`).
- Keep the title short (one or two lines) and the description to two or three lines.
- Use short CTA labels; buttons keep their Figma width as a minimum and grow for longer labels.
- The images are decorative; don't put text or information in them.

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| No images on the page | Items without an image, or images not published | Inspect `.image-collage-media` | Select the images and publish them with the page | The media layer has items |
| An image is missing | More than nine items | Count the items | Remove the extra items | Nine images |

## Screenshots

> **Screenshot required**
>
> - Required screen: Image Collage dialog in Universal Editor (every tab, including Additional)
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
