# Configurable Media Contacts

The Configurable Media Contacts block (`conf-med-cont`, "configurable media contacts") lists media contacts by region from three data sheets: the **contacts**, the **regions** and the **media-contacts-config** sheet of `data/conf-med-cont/`. The author enters a Media contacts ID; the config row with that ID chooses the regions (one column per region, any number of them, in the sheet's column order), the contacts of each region and what is shown of them (the region's action). It follows the Figma "Media contacts" design (TCS Designs - Prototypes, node 5834:16648): the title, then the regions two per row, each with its brand-blue name and the underlined e-mail addresses and phone numbers one below the other.

| Attribute | Value |
| --------- | ----- |
| Technical name | `conf-med-cont` (model `conf-med-cont`, template name "Conf Med Cont": its block class) |
| Display name | Configurable Media Contacts |
| Block type | Independent block, key-value (one row per property), no items; content from data sheets |
| Status | Active |
| Parent / children | Added to a Section, a Columns Container column or a Tabs Container (filters `section` in `models/_section.json`, `columns-container`, `tabs`); no children |
| Owner / version / date | Owner: Not recorded; version: 1.0; date: 22 November 2026 |

## Overview

- **Business purpose:** one set of contacts and regions, maintained in sheets, shown in different combinations on different pages (press releases, newsroom, regional pages) without editing the pages.
- **User experience:** the title (e.g. "TCS media contacts"); below it the regions, two per row from 900px, one column below; each region's name in brand blue, then its contacts as its action shows them: e-mail addresses and phone numbers as underlined links, with the contact's name (and description) above them for the name actions.
- **Templates / page types:** any; typically press releases and newsroom pages.
- **Data source:** `/{root}/data/conf-med-cont/contacts.json`, `regions.json` and `media-contacts-config.json` (the sheets below `/content/tcs-corp/<root>/data/conf-med-cont/` on the author), read by `utils/data.js` `getConfMedCont`; pages below a review root (`/language-master/en`, `/language-masters/en`, `/design-block-master/en`) read their root's sheets, the locales their own (`REVIEW_SHEETS` in `utils/site.js`).
- **Related blocks:** Media Contacts (`blocks/media-contacts`: contacts authored as items in the block), whose look and markup it shares (`decorators/contact-list-decorator.js`).
- **When to use:** when the same contacts appear on several pages, or the regions and contacts change without page edits.
- **When not to use:** for contacts of one page only (use Media Contacts and author them as items).
- **Realistic use cases:** the "TCS media contacts" section of every press release (one config row); a regional press page showing only Europe and the UK (another config row); a newsroom page with names and descriptions (`name-des-mail-contact`).

## Visual Reference

<!-- BEGIN GENERATED: screenshots (npm run build:docs) -->

No handover screenshot of this block was identified.

Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):

```text
[Screenshot Placeholder]

File name:
conf-med-cont-dialog-content-desktop.png

Purpose:
The Content tab of the Configurable Media Contacts properties in Universal Editor, with the fields of the table "Content tab — Configurable Media Contacts" in Authorable Fields below.

Annotations:
A = Media contacts title
B = Media contacts title type
C = Media contacts ID
```

```text
[Screenshot Placeholder]

File name:
conf-med-cont-dialog-additional-desktop.png

Purpose:
The Additional tab of the Configurable Media Contacts properties in Universal Editor, with the fields of the table "Additional tab — Configurable Media Contacts" in Authorable Fields below.

Annotations:
A = Anchor ID
B = Hide block
C = Animation Type
D = Motion Speed
E = Animation Trigger
F = Padding left
G = Padding right
H = Padding top
I = Padding bottom
J = Margin left
```

<!-- END GENERATED: screenshots -->

Figma: [TCS Designs - Prototypes, Media contacts](https://www.figma.com/design/ymzA1VSmMIyb1wkF2DFbJj/TCS-Designs---Prototypes?node-id=5834-16648&m=dev). Measured on the local preview at 1440px: title 40px / 56px, letter-spacing -1px; region names 20px / 28px light, brand blue, -0.2px; contact lines 16px / 26px, underlined, -0.08px; 24px between a region name and its contacts and between the two columns; 40px between the title and the regions and between rows of regions (the values of the design).

## For Content Authors

1. Make sure the three sheets below `data/conf-med-cont/` of your site root hold the contacts, regions and a config row, and are published.
2. Add **Configurable Media Contacts** to a section, a Columns Container column or a tab.
3. Enter the **Media contacts title**, choose its **Media contacts title type** and enter the **Media contacts ID** of a config row.

In Universal Editor and on the author, the block says when the ID isn't in the config sheet, and which contact or region IDs of the row the sheets don't have. On the published page a block without contacts is hidden.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

### Configurable Media Contacts (`conf-med-cont`)

Model `conf-med-cont`; template name "Conf Med Cont" (the block class AEM renders); key-value block (one row per property).

#### Content tab — Configurable Media Contacts

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Media contacts title | `media-contacts-title` | text | No | — | — | The block's title, e.g. TCS media contacts; without one the heading is Media contacts (placeholder mediaContacts). | — |
| Media contacts title type | `media-contacts-title-type` | select | No | — | H1 (`h1`), H2 (`h2`), H3 (`h3`), H4 (`h4`), H5 (`h5`), H6 (`h6`), Media contacts big title (`media-contacts-big-title`), Media contacts small title (`media-contacts-small-title`) | H1 to H6: the title's heading level. Big title / small title: an H2 in the big or small title style. The region names are one level below the title. | — |
| Media contacts ID | `media-contacts-id` | text | No | — | — | The media-contacts-id of a row of the media-contacts-config sheet (data/conf-med-cont), e.g. media-contact-01: its region columns choose the regions, their contacts and what is shown of them. | — |

#### Additional tab — Configurable Media Contacts

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Animation Type | `classes_animation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | — |
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

| Field | Name | Values | Notes |
|---|---|---|---|
| Media contacts title | `media-contacts-title` | Text | Empty: the placeholder `mediaContacts` ("Media contacts") |
| Media contacts title type | `media-contacts-title-type` | H1, H2, H3, H4, H5, H6, `media-contacts-big-title`, `media-contacts-small-title` (8 options) | Empty: H2. Big / small title: an H2 in the big (48px desktop) or small (28px desktop) title style. Region names are one level below the title |
| Media contacts ID | `media-contacts-id` | Text, e.g. `media-contact-01` | The `media-contacts-id` of a media-contacts-config row (case-insensitive) |

The field names are the ones requested (hyphenated, lowercase). AEM collapses fields whose names end in `Title`, `Type`, `Alt`, `Text` or `MimeType` (camelCase, case-sensitive), so `media-contacts-title` and `media-contacts-title-type` are delivered as two rows of their own; check this on aem.page after the first publish (AEM delivery rules in AGENTS.md).

## The sheets

`data/conf-med-cont/` of the site root (e.g. `/content/tcs-corp/language-master/en/data/conf-med-cont/`), published as `/language-master/en/data/conf-med-cont/<sheet>.json`:

| Sheet | Columns | Example |
|---|---|---|
| contacts | `contact-id`, `contact-name`, `contact-desc`, `email-id`, `contact-number` | C0001, Roland, Roland is Media spokes person, roland.bagen@tcs.com, +46 70 3178024 |
| regions | `region-id`, `region-name`, `region-desc` | reg-001, Corporate Communications & India, This region belongs to corporate communications and India |
| media-contacts-config | `media-contacts-id`, then per region `<region-id>` and `<region-id>-action` | media-contact-01, reg-001: C0013,C0001,C0002, reg-001-action: mail, reg-002: …, reg-002-action: … |

- **Region columns are dynamic:** every column of the config sheet other than `media-contacts-id` and the `-action` columns is a region, in the sheet's column order; a new region is two new columns (and a row of the regions sheet). An empty region column leaves the region out of that row.
- **Contact IDs** are comma separated, shown in that order; IDs are matched without case.
- `email-id` and `contact-number` may hold more than one value, comma separated.
- `region-desc` is for the sheet's maintainers; it isn't shown.

### Region actions

| Action | Shows |
|---|---|
| `mail` | `email-id` |
| `mail-contact` | `email-id` and `contact-number` (also when the action is empty or unknown) |
| `contact` | `contact-number` |
| `name-mail-contact` | `contact-name`, `email-id`, `contact-number` |
| `name-des-mail-contact` | `contact-name`, `contact-desc`, `email-id`, `contact-number` |

A contact with nothing to show for its region's action (e.g. no phone number for `contact`) is left out, and so is a region without contacts to show.

## Screenshot-Based Authoring Steps

### Authoring Step 1: Add the block

Universal Editor: select the section, Add (+), **Configurable Media Contacts**. Screenshot: Not recorded (no author access when the block was built).

### Values to Enter

None yet: the block shows its hint ("Enter the Media contacts ID of a row of the media-contacts-config sheet.").

### Authoring Step 2: Title and ID

Open the block's properties (Content tab).

### Values to Enter

Media contacts title: `TCS media contacts`; Media contacts title type: `H2`; Media contacts ID: `media-contact-01`.

## Variations

### Title types

H1 to H6 set the heading level (the region names one level below); Media contacts big title and small title are H2s in a bigger or smaller style.

### Region actions

Each region of a config row has its own action (table above), so one block can show e-mail only for one region and names, descriptions, e-mail and phone for another.

## Complete Authoring Example

Config row `media-contact-01`: `reg-001` = `C0013,C0002,C0003`, `reg-001-action` = `mail`; `reg-002` = `C0001`, `reg-002-action` = `mail-contact`. The block with Media contacts ID `media-contact-01` shows "Corporate Communications & India" with three e-mail addresses and "Europe" with roland.bagen@tcs.com and +46 70 3178024, side by side from 900px.

## Content and Asset Guidelines

- Keep one row per contact in the contacts sheet and reference it from as many regions and config rows as needed.
- Phone numbers as written for people (`+46 70 3178024`); the link dials the digits (`tel:+46703178024`).
- No assets: the block has no icons or images (as in the design).

## Accessibility

- The title is a heading at the authored level, the region names one level below (H3 under an H2), so the outline stays in order.
- Each link has a visually hidden label (placeholders `email` "Email", `phone` "Phone") before the address or number.
- Underlined links in the text colour with a brand-colour hover and a 2px focus outline (WCAG 2.1 AA contrast: `--color-text-default` and `--color-text-brand` on white).
- Contacts are lists (`ul` / `li`), people with a name are list items of their own.

## Data Layer and Analytics

Links carry `data-cmp-interaction` `email` / `phone` and `data-cmp-value` the region name; the data layer decorator records the kind of link, never the address or number (`utils/privacy.js` `contactLinkKind`). The block is in the data layer as `conf-med-cont` with its position like any block.

## Personalization

None. Different pages show different contacts through different config rows.

## Responsive Behavior

- Below 900px: one column; title 28px (`--heading-font-size-xl`), region names 16px (`--heading-font-size-s`).
- From 900px: two columns filled row by row (as in the design); title 40px, region names 20px.
- Contact lines are 16px at every width; long addresses wrap anywhere.

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/conf-med-cont/
├── README.md
├── _conf-med-cont.json
├── conf-med-cont-data.js
├── conf-med-cont.css
└── conf-med-cont.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`utils/links.js`](../../utils/links.js) | `NEW_WINDOW`, `linkOf`, `linkPathsOf` (the paths of a page property, one or many), `readLinkItems` (CTA lists with Link Type and the items' other select values), `readLinkRows` (the same from link item rows, e.g. Hero CT | `conf-med-cont-data.js`: { telHref } |
| [`decorators/contact-list-decorator.js`](../../decorators/contact-list-decorator.js) | `buildContactList` (contacts, each with its heading and its mail / phone links one below the other, or its `people`: name and description above each person's links; the links carry `data-cmp-interaction` email / phone) | `conf-med-cont.js`: { buildContactList } |
| [`decorators/heading-decorator.js`](../../decorators/heading-decorator.js) | `buildHeading` (Title + Title Type), `HEADINGS` | `conf-med-cont.js`: { HEADINGS } |
| [`scripts/scripts.js`](../../scripts/scripts.js) | Page decoration (moveInstrumentation and shared page helpers) | `conf-med-cont.js`: { moveInstrumentation } |
| [`utils/data.js`](../../utils/data.js) | `loadDataSheet`, `getAuthor`, `getAuthors`, `getLocations`, `getPartners`, `getSocialLinks`, `getMediaContacts`, `getConfMedCont` (the three `data/conf-med-cont/` sheets: contacts, regions, media-contacts-config), `inReg | `conf-med-cont.js`: { getConfMedCont } |
| [`utils/environment.js`](../../utils/environment.js) | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | `conf-med-cont.js`: { isAuthor, isEditing } |
| [`utils/placeholders.js`](../../utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `conf-med-cont.js`: { getPlaceholders } |
| [`utils/properties.js`](../../utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `conf-med-cont.js`: { readProperties, textOf, textSource } |

<!-- END GENERATED: files -->

- `conf-med-cont.js` reads the three properties (`readProperties`: `mediacontactstitle`, `mediacontactstitletype`, `mediacontactsid`), loads the sheets (`getConfMedCont`) and the placeholders in parallel, builds the title and renders the regions with `buildContactList` (each region a contact with `people`).
- `conf-med-cont-data.js` (pure, unit tested in `test/conf-med-cont/conf-med-cont-data.test.mjs`): `findConfig`, `regionColumns` (the dynamic region columns), `actionOf`, `regionGroups` (the regions with the details their actions show, and the IDs the sheets don't have).
- `decorators/contact-list-decorator.js` renders `people` (name, description, then their links) besides the Media Contacts block's plain links; `telHref` is in `utils/links.js` (shared with Media Contacts).
- Animation: `CONTENT_TARGETS` in `decorators/motion-decorator.js` (the title and each region).

```html
<div class="conf-med-cont block">
  <h2 class="conf-med-cont-title">TCS media contacts</h2>
  <ul class="contact-list">
    <li class="contact-list-contact" data-cmp-position="1">
      <h3 class="contact-list-heading">Europe</h3>
      <ul class="contact-list-entries">
        <li class="contact-list-person">
          <p class="contact-list-name">Roland</p>
          <p class="contact-list-description">Roland is Media spokes person</p>
          <ul class="contact-list-entries">
            <li class="contact-list-email"><a class="contact-list-link" href="mailto:roland.bagen@tcs.com" data-cmp-interaction="email" data-cmp-value="Europe"><span class="visually-hidden">Email: </span><span class="contact-list-text">roland.bagen@tcs.com</span></a></li>
            <li class="contact-list-phone"><a class="contact-list-link" href="tel:+46703178024" data-cmp-interaction="phone" data-cmp-value="Europe"><span class="visually-hidden">Phone: </span><span class="contact-list-text">+46 70 3178024</span></a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
```

## Extending the Block

- A new action: add it to `ACTIONS` in `conf-med-cont-data.js` (the details it shows, in order), with a test, and to the table above.
- A new detail of a contact (e.g. a LinkedIn link): a column of the contacts sheet, read in `getConfMedCont`, shown by `regionGroups` and rendered in the contact list decorator.

## For Site Administrators

- Publish the three sheets of each site root that uses the block (they are spreadsheets below `data/`, covered by the root's folder mapping in `paths.json`: `/language-master/en/data/conf-med-cont/contacts.json`, ...). No query index or site configuration change is needed.
- Placeholders (optional, English fallbacks in the code): `mediaContacts`, `email`, `phone`, `confMedContEditorHint`, `confMedContUnknownId`, `confMedContMissing`.

## For Architects

- A sheet-driven companion of the Media Contacts block (decision log KB-D-073, Proposed): the contacts are data, the page only references a configuration. It reuses the Media Contacts markup and decorator, and the data utils' sheet loading (one request per sheet, cached per page).
- The config sheet's region columns are read by name pattern, so the sheet can grow without code changes.

## For QA and Support Teams

| # | Check | Expected |
|---|---|---|
| 1 | ID `media-contact-01` with five regions and the five actions | Each region shows exactly the details of its action, contacts in the column order |
| 2 | A region column left empty | The region isn't shown |
| 3 | An unknown contact ID in a region | Shown in the author hint ("Not in the contacts or regions sheet: C0404"); the other contacts render |
| 4 | An unknown Media contacts ID | Author: the hint; published page: the block is hidden |
| 5 | Title type big / small title | An H2 at 48px / 28px (desktop) |
| 6 | 375px and 1440px | One column / two columns, no horizontal scroll |

## Troubleshooting

| Symptom | Cause |
|---|---|
| The block is missing on the published page | No config row with the ID, or none of its contacts has a detail to show; check on the author for the hint |
| A region has no name | The region ID isn't in the regions sheet (listed in the author hint) |
| Old contacts are shown | The sheets weren't republished after the change |

## Performance Considerations

Three small JSON requests (cached for the page, in parallel with the placeholders) when the block is decorated; no layout reads, no dependencies.

## Security and Privacy

Contact details are public press contacts from the sheets; the text is set with `textContent`. The data layer gets the region name and the kind of link, not addresses or numbers.

## Known Limitations

- The region names come only from the regions sheet; `region-desc` isn't shown.
- Universal Editor offers the Media contacts ID as a free text field (no list of the config rows).
- Screenshots of the block on AEM and of its dialog: Not recorded (no author access when it was built).

## Related Documentation

- [Media Contacts](../media-contacts/README.md)
- [decorators/README.md](../../decorators/README.md) (contact list decorator), [utils/README.md](../../utils/README.md) (`getConfMedCont`, `telHref`)

<!-- BEGIN GENERATED: usage (npm run build:docs) -->

No block library or curated design page using this block was recorded in the library snapshot.

Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).

<!-- END GENERATED: usage -->

## Change History

| Date | Change |
|---|---|
| 22 November 2026 | Created (KB-D-073, Proposed) |
