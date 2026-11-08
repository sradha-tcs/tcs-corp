---
id: "AUT-C-media-contacts"
title: "Media Contacts — Authoring Guide"
role: "Authoring"
topic: "component authoring"
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/media-contacts/README.md","blocks/media-contacts/_media-contacts.json"]
relatedComponents: ["media-contacts"]
relatedPages: []
confidence: "Medium"
primary: true
---

# Media Contacts — Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-C-media-contacts |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | How to add, fill in and check the Media Contacts component |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/media-contacts/README.md, blocks/media-contacts/_media-contacts.json |
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

1. **Add the block.** In Universal Editor, select a Section (or a Columns Container column or a Tabs Container), choose Add (+) and pick **Media Contacts**.
2. **Open its properties.** Select the block in the canvas or the content tree. It has two tabs: Content and Additional.
3. **Enter the title.** Title, e.g. "TCS media contacts", and Title Type (H2 by default; the group headings are one level below).
4. **The contacts.** They aren't typed into the block: they come from the locale's Media Contacts sheet (`/content/tcs-corp/{country}/{language}/data/media-contacts`). Ask whoever maintains the sheet to add or change a contact; every page with the block updates.
5. **Region.** The page's `region` metadata (metadata sheet) selects the contacts of that region; without matching rows (or without a region, e.g. Global) all contacts show.
6. **Child items:** none.
7. **Preview** at desktop and mobile widths, then **publish** the page. Publish the sheet too when it changed.
8. **Validate** on the published page: the groups, the links (mailto: / tel:) and the heading levels.

Minimum content: none (without a Title the heading is "Media contacts"). Recommended: Title. Required elsewhere: at least one row in the Media Contacts sheet.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

#### Media Contacts (`media-contacts`)

Model `media-contacts`; template name "Media Contacts" (the block class AEM renders); key-value block (one row per property).

Stored on a new component (definition template): `titleType` = `"h2"`.

##### Content tab — Media Contacts

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Title | `title` | text | No | — | — | The heading above the contacts, e.g. "TCS media contacts". Empty: "Media contacts" (placeholder mediaContacts). The contacts come from the locale's Media Contacts sheet (data/media-contacts): those of the page's region, else all of them. | Media contacts |
| Title Type | `titleType` | select | No | `h2` | H1 (`h1`), H2 (`h2`), H3 (`h3`), H4 (`h4`), H5 (`h5`), H6 (`h6`) | Heading level of the Title; the contact groups are one level below. Delivered with `title` (field collapse). | h2 |

##### Additional tab — Media Contacts

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Animation Type | `classes_animation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | motion-fade-up |
| Motion Speed | `classes_animationspeed` | select | No | "" | Medium (""), Fast (`motion-fast`), Slow (`motion-slow`) | How fast the block's animations run (Animation Type 0.3 / 0.6 / 0.9 s; the Background animation takes 1.5 times as long). Shown when (`classes_animation` is set and `classes_animation` is not empty) or (`classes_bganimation` is set and `classes_bganimation` is not empty). Delivered as a block class. | — |
| Animation Trigger | `classes_animationtrigger` | select | No | "" | On Scroll / Viewport Entry (""), On Page Load (`motion-on-load`) | When the block's animations run. On Scroll: when the block comes into view (at once if it is in view when the page opens). On Page Load: as soon as the block is ready, wherever it is on the page. Shown when (`classes_animation` is set and `classes_animation` is not empty) or (`classes_bganimation` is set and `classes_bganimation` is not empty). Delivered as a block class. | — |
| Padding left | `classes_paddingleft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | Delivered as a block class. | — |
| Padding right | `classes_paddingright` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | Delivered as a block class. | — |
| Padding top | `classes_paddingtop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | Delivered as a block class. | — |
| Padding bottom | `classes_paddingbottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | Delivered as a block class. | — |
| Margin left | `classes_marginleft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | Delivered as a block class. | — |
| Margin right | `classes_marginright` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | Delivered as a block class. | — |
| Margin top | `classes_margintop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | Delivered as a block class. | — |
| Margin bottom | `classes_marginbottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | Delivered as a block class. | — |

<!-- END GENERATED: fields -->

Notes on the significant fields:

- **Title / Title Type:** the heading of the block at the Title Type level (`buildHeading`); empty, it is the placeholder `mediaContacts` ("Media contacts") at that level. The group headings are one level below (H3 under an H2, at most H6).
- **The sheet's columns:** `id`, `name`, `designation`, `email`, `phone`, `region`. A row needs an id, a name, an e-mail address or a phone number. Rows with the same designation and region (case and spacing ignored) are one group, in the sheet's order; the group heading is "designation & region", or the one that is set. A name, when set, is shown above its contact's links.
- **Additional tab:** Anchor ID, Hide block, the animations (the title and the groups animate one after another) and Padding / Margin, as described in AGENTS.md "Additional tab".

## Screenshot-Based Authoring Steps

#### Authoring Step 1: Add the Media Contacts block

Select the Section at the end of the press release, choose Add (+) and pick Media Contacts.

#### Values to Enter

| Field | Value |
| ----- | ----- |
| (none) | The block is added with Title Type H2 |

#### Authoring Step 2: Title

Open the properties panel (Content tab).

#### Values to Enter

| Field | Value |
| ----- | ----- |
| Title | TCS media contacts |
| Title Type | H2 |

#### Authoring Step 3: Check the contacts

Switch to Preview: the groups of the Media Contacts sheet appear. If the hint "The contacts come from the Media Contacts sheet …" shows, the sheet has no rows yet.

#### Values to Enter

| Field | Value |
| ----- | ----- |
| Media Contacts sheet | One row per e-mail address or phone number: `designation` (e.g. Corporate Communications), `region` (e.g. India), `email`, `phone` |

## Variations

#### Default (all contacts)

A page whose `region` is Global (or empty, or without matching rows) lists every contact of the sheet.

#### Regional

A page whose `region` matches rows of the sheet (e.g. `Europe`) lists only those rows.

#### Without a Title

The heading is the placeholder "Media contacts".

## Complete Authoring Example

Scenario: the migrated press release "TCS BaNCS for Treasury marks its entry into Sri Lanka with Indian Bank" (`/content/tcs-corp/language-masters/en/curated-design-pages/forms/…`).

| Field | Example value | Guidance |
| ----- | ------------- | -------- |
| Title | TCS media contacts | As on tcs.com |
| Title Type | H2 | Under the page's H1 |
| Page metadata `region` | Global | All contacts |
| Sheet rows | 12 rows: Corporate Communications / India × 3 e-mail addresses; Asia Pacific, Canada, Latin America, Australia and New Zealand, Europe, Japan, Middle East & Africa, UK, USA with an e-mail address and a phone number each | One row per contact |

- **Expected output:** "TCS media contacts", then 10 groups in two columns (5 + 5) from 900px.
- **Accessibility:** an `<h2>`, ten `<h3>` group headings, lists of links named "Email: …" / "Phone: …".
- **Analytics / data layer:** a `tcs-corp/components/media-contacts` entry; clicks as `cmp:click` with `interaction` email / phone and the group as `value`, without the address.
- **Personalization fallback:** all contacts when the page's region has none.

Pre-publish checklist: the sheet is published; the designations and regions are spelled the same in every row of a group; the title fits the page outline.

## Content and Asset Guidelines

- **Title:** short ("TCS media contacts", "Press contacts").
- **Sheet:** one row per e-mail address or phone number; write phone numbers as they should read (+65 9270 4560); the link keeps only the digits and a leading +.
- **Personal data:** the sheet is published as JSON (`/{locale}/data/media-contacts.json`); list business contact details that may be public only.
- **Icons:** `icons/mail.svg` and `icons/phone.svg`, coloured by CSS (brand blue).
- **Limits:** no verified technical limit; long addresses wrap.

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| The block doesn't show on the page | The sheet has no rows (or isn't published) | Open `/{locale}/data/media-contacts.json` | Add rows and publish the sheet | The groups appear |
| A group appears twice | Different spelling of the designation or region | Compare the rows | Spell them the same | One group |
| Only some contacts show | The page's `region` matches some rows | Check the page's `region` metadata | Change the region, or the rows' regions | The expected rows |
| A phone link dials a wrong number | Letters or extra characters in `phone` | Check the cell | Write the number with digits, spaces and a leading + | `tel:` link correct |

## Screenshots

> **Screenshot required**
>
> - Required screen: Media Contacts dialog in Universal Editor (every tab, including Additional)
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
