# Media Contacts

The Media Contacts block lists media relations contacts under an authored title: the groups of the locale's **Media Contacts** data sheet (`/{locale}/data/media-contacts.json`), or of another sheet picked as **Contacts sheet**, all of them or the ones chosen in the **Contact groups** dropdown (its options generated from the published sheets), followed by any **Media Contact** items added to the block for contacts that aren't in the sheet (a partner, an agency). Each group shows its heading ("Corporate Communications & India") and its e-mail addresses and phone numbers one below the other, each with a mail or phone icon; **Show email addresses** and **Show phone numbers** show both kinds, one only, or leave a kind out. It follows the "TCS media contacts" section of the tcs.com press releases. A key-value block with Media Contact item children (KB-D-074); `blocks/media-contacts/media-contacts.js` loads the sheet and renders the groups.

| Attribute | Value |
| --------- | ----- |
| Technical name | `media-contacts` (model `media-contacts`, template name "Media Contacts") |
| Display name | Media Contacts |
| Block type | Key-value block (`key-value: true`) with Media Contact item children; contacts from a data sheet and from the items |
| Status | Active |
| Parent / children | Parents: Section, Columns Container, Tabs Container (filters `section`, `columns-container`, `tabs`). Children: Media Contact (`media-contact`, filter `media-contacts`) |
| Owner / version / date | Not recorded / 2.0 (KB-D-074) / 18 November 2026 (1.0: handover 2.41, chapter 6.33, 22 October 2026) |

## Overview

- **Business purpose:** journalists find the right press contact for their region at the end of every press release; the contacts are maintained once, in the sheet, for every page (about 2,200 migrated press releases), with one-off contacts on the page itself.
- **User experience:** the title (e.g. "TCS media contacts"), then the groups: the brand-blue group heading and, below it, each e-mail address and phone number as an underlined link with its icon. Two columns from 900px (filled top to bottom), one column below.
- **Templates / page types:** press releases (Page Type `press-release`). The Press Release template no longer adds the contacts by itself: authors add this block (KB-D-054 in the knowledge base decision log).
- **Data source:** the Media Contacts sheet of the page's locale (`utils/data.js` `getMediaContacts`), grouped by `media-contacts-data.js` `directoryGroups`; the Media Contact items of the block (`readContactRows`). Every press release shows the current contacts of the sheet (the user's choice, 18 November 2026: tcs.com showed the contacts of the time of publication). Placeholders `mediaContacts`, `email`, `phone`, `mediaContactsAuthorHint`.
- **Related blocks:** Page Header (the press release's header), Teaser and List (the other press release sections).
- **When to use:** on press releases and media pages that should show the press contacts.
- **When not to use:** for contact details that aren't press contacts (use a Teaser or Text); for a person who appears on many pages, add a sheet row instead of Media Contact items.
- **Realistic use cases:** the "TCS media contacts" section at the end of a press release (all groups); a regional press release with only its regions' groups (Contact groups); a release with a partner's press contact (a Media Contact item after the groups); a list of press phone lines (Show email addresses off).

## Visual Reference

<!-- BEGIN GENERATED: screenshots (npm run build:docs) -->

Screenshots of the handover (6.33 Media Contacts Block), taken on the preview with sample content; they show the rendering at the time of the handover revision that added them (later changes are in the sections below and the handover's revision history):

**Desktop rendering** — The Media Contacts block at 1440 px on the block library page Media Contacts variations: the H2 TCS media contacts, then two columns filled top to bottom: Corporate Communications & India with three e-mail addresses one below the other, Asia Pacific, Canada, Latin America and Australia and New Zealand on the left; Europe, Japan, Middle East & Africa, UK and USA on the right, each with an e-mail address and a phone number, a blue mail or phone icon before each underlined link.

![Desktop rendering: The Media Contacts block at 1440 px on the block library page Media Contacts variations: the H2 TCS media contacts, then two columns filled top to bottom: Corporate Communications & India with three e-mail addresses one below the o](https://raw.githubusercontent.com/sradha-tcs/tcs-corp-delivery/main/docs/handover/02-development/blocks/media-contacts/screenshots/handover/media-contacts-desktop-view.jpg)

**Mobile rendering** — The same block at 375 px: the H2 TCS media contacts and the groups in one column, Corporate Communications & India with its three e-mail addresses, then Asia Pacific, Canada and the other regions, each address and number on its own line with its icon.

![Mobile rendering: The same block at 375 px: the H2 TCS media contacts and the groups in one column, Corporate Communications & India with its three e-mail addresses, then Asia Pacific, Canada and the other regions, each address and number on its own ](https://raw.githubusercontent.com/sradha-tcs/tcs-corp-delivery/main/docs/handover/02-development/blocks/media-contacts/screenshots/handover/media-contacts-mobile-view.jpg)

**Regional variation** — The block library page Media Contacts: one region at 1440 px, whose region metadata is Europe: the H2 Media contacts in Europe and the single group Europe with roland.bagen@tcs.com and +46 70 3178024.

![Regional variation: The block library page Media Contacts: one region at 1440 px, whose region metadata is Europe: the H2 Media contacts in Europe and the single group Europe with roland.bagen@tcs.com and +46 70 3178024.](https://raw.githubusercontent.com/sradha-tcs/tcs-corp-delivery/main/docs/handover/02-development/blocks/media-contacts/screenshots/handover/media-contacts-region.jpg)

**Default title** — The second example of the variations page at 1440 px: the block without a Title shows the heading Media contacts (placeholder) above the same groups.

![Default title: The second example of the variations page at 1440 px: the block without a Title shows the heading Media contacts placeholder above the same groups.](https://raw.githubusercontent.com/sradha-tcs/tcs-corp-delivery/main/docs/handover/02-development/blocks/media-contacts/screenshots/handover/media-contacts-default-title.jpg)

**Press release template** — The end of the block library page Press release template at 1440 px: the release text with About TCS, then the Media Contacts block with the H2 Media contacts and the groups in two columns; the Press Release template no longer appends a section of its own.

![Press release template: The end of the block library page Press release template at 1440 px: the release text with About TCS, then the Media Contacts block with the H2 Media contacts and the groups in two columns; the Press Release template no longer](https://raw.githubusercontent.com/sradha-tcs/tcs-corp-delivery/main/docs/handover/02-development/blocks/media-contacts/screenshots/handover/template-press-release-media-contacts.jpg)

Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):

```text
[Screenshot Placeholder]

File name:
media-contacts-dialog-content-desktop.png

Purpose:
The Content tab of the Media Contacts properties in Universal Editor, with the fields of the table "Content tab — Media Contacts" in Authorable Fields below.

Annotations:
A = Title
B = Title Type
C = Contacts from the Media Contacts sheet
D = Contacts sheet
E = Contact groups
```

```text
[Screenshot Placeholder]

File name:
media-contacts-dialog-display-desktop.png

Purpose:
The Display tab of the Media Contacts properties in Universal Editor, with the fields of the table "Display tab — Media Contacts" in Authorable Fields below.

Annotations:
A = Show email addresses
B = Show phone numbers
C = Title color
D = Columns on desktop
E = Territory title color
F = Email color
G = Phone color
H = Hide email and phone icons
I = Email icon
J = Phone icon
```

```text
[Screenshot Placeholder]

File name:
media-contacts-dialog-additional-desktop.png

Purpose:
The Additional tab of the Media Contacts properties in Universal Editor, with the fields of the table "Additional tab — Media Contacts" in Authorable Fields below.

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

```text
[Screenshot Placeholder]

File name:
media-contact-dialog-fields-desktop.png

Purpose:
The dialog of the Media Contact properties in Universal Editor, with the fields of the table "Fields — Media Contact" in Authorable Fields below.

Annotations:
A = Country, territory, organization or group
B = Email
C = Phone
```

<!-- END GENERATED: screenshots -->

The state below has no screenshot yet (Universal Editor isn't reachable from the preview).

```text
[Screenshot Placeholder]

File name:
media-contacts-empty-editor.png

Purpose:
The block in Universal Editor when there is nothing to show: the title and the hint "No contacts to show: check Contact groups against the Media Contacts sheet, …".

Annotations:
A = Title
B = Editor hint (not shown on the published page, where the block is hidden)
```

## For Content Authors

1. **Add the block.** In Universal Editor, select a Section (or a Columns Container column or a Tabs Container), choose Add (+) and pick **Media Contacts**.
2. **Open its properties.** Select the block in the canvas or the content tree. It has three tabs: Content, Display and Additional.
3. **Enter the title.** Title, e.g. "TCS media contacts", and Title Type (H2 by default; the group headings are one level below).
4. **The contacts from the sheet.** **Contacts from the Media Contacts sheet** is on by default: the block shows the groups of a sheet; a change in the sheet updates every page with the block. **Contacts sheet:** empty, the locale's `data/media-contacts` (`/content/tcs-corp/{country}/{language}/data/media-contacts`); or pick another contacts sheet of the site (a path relative to the site, e.g. `data/press-contacts`, is read from the page's own site). **Contact groups:** pick groups in the dropdown (it lists the groups of the published Media Contacts sheets) to show only those, in the sheet's order; leave it empty for all groups.
5. **Display tab.** **Show email addresses** and **Show phone numbers** (both on): turn one off for phone numbers only or e-mail addresses only (a group without that kind is left out); then the colours, columns and icons.
6. **Contacts only for this page:** select the block, Add (+) › **Media Contact**: a heading (e.g. a partner's name) and its e-mail addresses and phone numbers, one per value. They follow the sheet's groups; with Contacts from the Media Contacts sheet off, they are the only contacts.
7. **Preview** at desktop and mobile widths, then **publish** the page. Publish the sheet too when it changed.
8. **Validate** on the published page: the groups, the links (mailto: / tel:) and the heading levels.

Minimum content: none (without a Title the heading is "Media contacts", and all the sheet's groups show). Recommended: Title. Required elsewhere: the locale's Media Contacts sheet, published, and for Contact groups the tags in AEM.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

### Media Contacts (`media-contacts`)

Model `media-contacts`; template name "Media Contacts" (the block class AEM renders); key-value block (one row per property); children: `media-contact`.

Stored on a new component (definition template): `titleType` = `"h2"`.

#### Content tab — Media Contacts

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Title | `title` | text | No | — | — | The heading above the contacts, e.g. "TCS media contacts". Empty: "Media contacts" (placeholder mediaContacts). | Media contacts |
| Title Type | `titleType` | select | No | `h2` | H1 (`h1`), H2 (`h2`), H3 (`h3`), H4 (`h4`), H5 (`h5`), H6 (`h6`) | Heading level of the Title; each Media Contact label is one level below. Delivered with `title` (field collapse). | h2 |
| Contacts from the Media Contacts sheet | `showDirectory` | boolean | No | `true` | on / off | Shows the contacts of the locale's Media Contacts sheet (data/media-contacts), maintained in one place for every page. Off: only the Media Contact items added to this block. | — |
| Contacts sheet | `contactsSheet` | aem-content | No | — | — | The spreadsheet of the contacts, e.g. data/media-contacts or another contacts sheet of the site. Empty: the locale's data/media-contacts. Shown when `showDirectory` is not `false`. | — |
| Contact groups | `contactGroups` | multiselect | No | — | Corporate Communications & India (`corporate-communications-india`), Asia Pacific (`asia-pacific`), Canada (`canada`), Latin America (`latin-america`), Australia and New Zealand (`australia-and-new-zealand`), Europe (`europe`), Japan (`japan`), Middle East & Africa (`middle-east-africa`), UK (`uk`), USA (`usa`) | The groups of the Media Contacts sheet to show, in the sheet's order. Empty: every group. The list comes from the published sheets (npm run build:contacts); a group added to a sheet appears here once its update is merged. Shown when `showDirectory` is not `false`. | — |

#### Display tab — Media Contacts

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Show email addresses | `showEmails` | boolean | No | `true` | on / off | Off: phone numbers only (a group without one is left out). | — |
| Show phone numbers | `showPhones` | boolean | No | `true` | on / off | Off: email addresses only (a group without one is left out). | — |
| Title color | `titleColor` | select | No | "" | Style default (""), Black (`title-black`), Dark (`title-dark`), White (`title-white`), Light blue (`title-light-blue`) | Overrides the title color using the Teaser title-color variants. | — |
| Columns on desktop | `columns` | select | No | `2` | 1 (`1`), 2 (`2`), 3 (`3`) | Choose the number of columns from desktop width. The entries stack into one column below 900px. | — |
| Territory title color | `regionColor` | select | No | "" | Style default (""), Black (`black`), Dark (`dark`), Brand blue (`brand`), Light blue (`light-blue`) | — | — |
| Email color | `emailColor` | select | No | "" | Style default (""), Black (`black`), Dark (`dark`), Brand blue (`brand`), Light blue (`light-blue`) | — | — |
| Phone color | `phoneColor` | select | No | "" | Style default (""), Black (`black`), Dark (`dark`), Brand blue (`brand`), Light blue (`light-blue`) | — | — |
| Hide email and phone icons | `classes_hideicons` | boolean | No | `false` | on / off | Turn on to remove the email and phone icons (also custom ones). Off: the icons show. Delivered as a block class. | — |
| Email icon | `emailIcon` | reference | No | — | — | Optional custom icon. Leave empty to use the default mail icon. | — |
| Phone icon | `phoneIcon` | reference | No | — | — | Optional custom icon. Leave empty to use the default phone icon. | — |

#### Additional tab — Media Contacts

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

### Media Contact (`media-contact`)

Model `media-contact`; template name "Media Contact" (the block class AEM renders).

#### Fields — Media Contact

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Country, territory, organization or group | `region` | text | Yes | — | — | The heading of this contact, e.g. a partner's name or a group that isn't in the Media Contacts sheet. Each Media Contact is shown after the sheet's groups, as its own entry. | — |
| Email | `email` | text (multiple) | No | — | — | Add as many email addresses as needed, without mailto:. Enter one address per value. | — |
| Phone | `phone` | text (multiple) | No | — | — | Add as many phone numbers as needed, including country code and spacing. Enter one number per value. | — |

<!-- END GENERATED: fields -->

Notes on the significant fields:

- **Title / Title Type:** the heading of the block at the Title Type level (`buildHeading`); empty, it is the placeholder `mediaContacts` ("Media contacts") at that level. The group headings are one level below (H3 under an H2, at most H6).
- **The sheet's columns:** `id`, `name`, `designation`, `email`, `phone`, `region`, and the optional `group` and `heading`. One row per person or mailbox; `email` and `phone` may hold several values separated by `,` `;` `|` or a line break. Rows with the same group form one entry, in the sheet's order: the `group` column (a key such as `emea`), else the heading. The heading is the `heading` column, else "designation & region" ("Corporate Communications & India"), else the region. A Contact groups value is the group in tag form: the `group` column, else the heading (`Middle East & Africa` = `middle-east-africa`); `npm run build:contacts` (`tools/media-contacts/generate-contact-groups.mjs`) writes them, with the headings as names, into the dialog from the published sheets of every locale and review root (`groupOptions`), and the Media contact groups workflow (`.github/workflows/media-contact-groups.yaml`) opens a pull request when they change.
- **Additional tab:** Anchor ID, Hide block, the animations (the title and the groups animate one after another) and Padding / Margin, as described in AGENTS.md "Additional tab".

## Screenshot-Based Authoring Steps

### Authoring Step 1: Add the Media Contacts block

Select the Section at the end of the press release, choose Add (+) and pick Media Contacts.

### Values to Enter

| Field | Value |
| ----- | ----- |
| (none) | The block is added with Title Type H2 |

### Authoring Step 2: Title

Open the properties panel (Content tab).

### Values to Enter

| Field | Value |
| ----- | ----- |
| Title | TCS media contacts |
| Title Type | H2 |

### Authoring Step 3: Check the contacts

Switch to Preview: the groups of the Media Contacts sheet appear (all of them, or those of Contact groups). If the hint "No contacts to show …" shows, the sheet has no rows for the chosen groups or both kinds are turned off.

### Values to Enter

| Field | Value |
| ----- | ----- |
| Media Contacts sheet | One row per e-mail address or phone number: `designation` (e.g. Corporate Communications), `region` (e.g. India), `email`, `phone`; optional `group` (tag ID) and `heading` |

## Variations

### Default (all contacts)

Title only, Contacts from the Media Contacts sheet on, no Contact groups: every group of the sheet, in its order (as the migrated press releases show them).

### Chosen groups

Contact groups Corporate Communications & India, Europe and Japan: those three groups only.

### E-mail addresses only / phone numbers only

Show phone numbers off: every group with its e-mail addresses. Show email addresses off: the groups with a phone number, without the addresses (Corporate Communications & India, which has none, is left out).

### With contacts of this page

A Media Contact item (e.g. a partner's press office) after the sheet's groups; with Contacts from the Media Contacts sheet off, the items alone.

### Without a Title

The heading is the placeholder "Media contacts".

## Complete Authoring Example

Scenario: the migrated press release "TCS BaNCS for Treasury marks its entry into Sri Lanka with Indian Bank" (`/content/tcs-corp/language-masters/en/curated-design-pages/forms/…`).

| Field | Example value | Guidance |
| ----- | ------------- | -------- |
| Title | TCS media contacts | As on tcs.com |
| Title Type | H2 | Under the page's H1 |
| Contacts from the Media Contacts sheet | On (default) | The sheet's groups |
| Contact groups | (empty) | All groups |
| Show email addresses / Show phone numbers | On / On | Both kinds |
| Sheet rows | 12 rows: Corporate Communications / India × 3 e-mail addresses; Asia Pacific, Canada, Latin America, Australia and New Zealand, Europe, Japan, Middle East & Africa, UK, USA with an e-mail address and a phone number each | One row per contact |

- **Expected output:** "TCS media contacts", then 10 groups in two columns (5 + 5) from 900px.
- **Accessibility:** an `<h2>`, ten `<h3>` group headings, lists of links named "Email: …" / "Phone: …".
- **Analytics / data layer:** a `tcs-corp/components/media-contacts` entry; clicks as `cmp:click` with `interaction` email / phone and the group as `value`, without the address.
- **Fallback:** without Contact groups, all groups; without a sheet (a locale that has none), only the Media Contact items, else the block is hidden.

Pre-publish checklist: the sheet is published; the designations and regions (or groups) are spelled the same in every row of a group; the Contact groups tags exist in AEM; the title fits the page outline.

## Content and Asset Guidelines

- **Title:** short ("TCS media contacts", "Press contacts").
- **Sheet:** one row per person or mailbox (several values per cell allowed); write phone numbers as they should read (+65 9270 4560); the link keeps only the digits and a leading +. Keep groups in the order they should show.
- **Personal data:** the sheet is published as JSON (`/{locale}/data/media-contacts.json`); list business contact details that may be public only.
- **Icons:** `icons/mail.svg` and `icons/phone.svg`, coloured by CSS (brand blue).
- **Limits:** no verified technical limit; long addresses wrap.

## Accessibility

- **Semantic HTML:** the title is a heading; the groups are a list, each with its heading (one level below the title) and a list of links.
- **Link names:** each link starts with a visually hidden "Email:" / "Phone:" (placeholders `email`, `phone`), so its purpose is clear out of context; the icons are CSS backgrounds without text.
- **Keyboard and focus:** links are reachable with Tab and have a visible focus outline.
- **Contrast:** text in `--color-text-default`, headings and icons in `--color-text-brand` (5.4:1 on white).
- **Reflow:** one column below 900px; long addresses wrap (`overflow-wrap: anywhere`).
- **Reduced motion:** the Additional tab's animations don't play for visitors who prefer reduced motion or in the editor.
- **Loading:** the block waits for the sheet (one small request) before it renders; it usually sits at the end of the page.

Author responsibilities: choose the heading level and the groups. Sheet owners: consistent designations and regions (or groups), and tags in `tcs-corp:media-contacts` named after the groups.

## Data Layer and Analytics

- **Component:** `decorators/data-layer-decorator.js` adds the block once rendered: `@type` `tcs-corp/components/media-contacts`, id = the Anchor ID else `media-contacts-{n}`, `dc:title` = the title.
- **Item positions:** each group has `data-cmp-position` (1, 2, …).
- **Interactions:** the links carry `data-cmp-interaction` (`email` / `phone`) and `data-cmp-value` (the group heading).

| Trigger | Data-layer event | Required properties | Analytics behavior |
| ------- | ---------------- | ------------------- | ------------------ |
| Block rendered | component state (`component.{id}`) | `@type`, `parentId`, `dc:title` | Component inventory of the page |
| Click on an e-mail address | `cmp:click` | `interaction` `email`, `dc:title` `email`, `xdm:linkURL` `mailto:`, `xdm:linkType` `other`, `value` (group), `position` | Contact interest per group, without the address |
| Click on a phone number | `cmp:click` | `interaction` `phone`, `dc:title` `phone`, `xdm:linkURL` `tel:`, `xdm:linkType` `other`, `value`, `position` | As above |

The data layer never records the address or number: `decorators/data-layer-decorator.js` reports every `mailto:` / `tel:` link of the site by its kind (`utils/privacy.js` `contactLinkKind`). Tags and the Web SDK aren't configured yet.

## Personalization

No personalization: the groups are chosen by the author (Contact groups), not by page metadata or the visitor's location (the page `region` filter of the first design, KB-D-054, is gone since PR #232). No Adobe Target or AJO integration.

## Responsive Behavior

| Viewport | Layout | Image behavior | Interaction behavior |
| -------- | ------ | -------------- | -------------------- |
| Below 900px (mobile, tablet) | One column; group headings at `--heading-font-size-l`, links at `--heading-font-size-m` | Icons 1.5rem | Tap a link to write or call |
| 900px and wider (desktop) | Two columns (`columns: 2`, gap 4rem), filled top to bottom, a group never split | Icons 1.5rem | As above |

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/media-contacts/
├── README.md
├── _media-contacts.json
├── media-contacts-data.js
├── media-contacts.css
└── media-contacts.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`decorators/contact-list-decorator.js`](../../decorators/contact-list-decorator.js) | `buildContactList` (this README named it `buildContactGroups` before; the code exports `buildContactList`: groups of contacts, each with its heading and its mail / phone links one below the other; the links carry `data-c | `media-contacts.js`: { buildContactList } |
| [`decorators/editor-item-decorator.js`](../../decorators/editor-item-decorator.js) | `buildEditorItems`, `editorItemHint` (in Universal Editor, an item the block doesn't render yet, e.g. a CTA just added, as a dashed placeholder the author can select; styles in `styles/lazy-styles.css`; the hint loaded o | `media-contacts.js`: { buildEditorItems, editorItemHint } |
| [`decorators/heading-decorator.js`](../../decorators/heading-decorator.js) | `buildHeading` (Title + Title Type), `HEADINGS` | `media-contacts.js`: { buildHeading, HEADINGS } |
| [`utils/cells.js`](../../utils/cells.js) | `itemRows`, `KEY_VALUE_ITEM`, `FIELD_ROW_ITEM` (the item rows of a block: by model in the editor, by their cells on the page), `withoutTabCells` (drops the empty cell AEM renders for each dialog tab of an item model), `m | `media-contacts.js`: { itemRows, KEY_VALUE_ITEM } |
| [`utils/data.js`](../../utils/data.js) | `loadDataSheet`, `getAuthor`, `getAuthors`, `getLocations`, `getPartners`, `getSocialLinks`, `loadSheetAt` (a sheet at an authored path: AEM, published, or relative to the page's site root), `getMediaContacts` (the local | `media-contacts.js`: { getMediaContacts } |
| [`utils/environment.js`](../../utils/environment.js) | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | `media-contacts.js`: { isAuthor, isEditing } |
| [`utils/placeholders.js`](../../utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `media-contacts.js`: { getPlaceholders } |
| [`utils/properties.js`](../../utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `media-contacts.js`: { isOnByDefault, readProperties, textOf } |
| [`utils/tags.js`](../../utils/tags.js) | `readTagValues`, `parseTag`, `readTags` (tag IDs; ID-derived labels as the taxonomy fallback) | `media-contacts.js`: { readTagValues } |

<!-- END GENERATED: files -->

- **JavaScript (`media-contacts.js`):** an async `decorate(block)`. It reads the properties (`readProperties`; Contacts from the Media Contacts sheet, Show email addresses and Show phone numbers are on unless set off, `isOnByDefault`, so blocks authored before keep showing the sheet), the Media Contact items (`itemRows`, `readContactRows`), the Contact groups values (`readTagValues`: a list or comma-separated), loads the Contacts sheet (`getMediaContacts`: the authored path through `loadSheetAt`, else the locale's `data/media-contacts`) and the placeholders, and renders the sheet's groups then the items (`directoryGroups`, `showContacts`) with `buildContactList`.
- **Pure logic (`media-contacts-data.js`):** `readContactRows`, `isCompleteContact`, `telHref`, `groupHeading`, `groupSlug`, `directoryGroups`, `showContacts`; unit tested in `test/media-contacts/media-contacts-data.test.mjs` and `media-contacts-directory.test.mjs` (with the language master's sheet of 18 November 2026).
- **CSS (`media-contacts.css`):** headings, links with `::before` icons (CSS masks of `icons/mail.svg` / `icons/phone.svg`), underlined text, two columns from 900px.
- **Input DOM:** key-value rows for `title`, `titleType`, `showDirectory`, `contactGroups` (tag IDs as a list), `showEmails`, `showPhones` and the style fields; the Media Contact items as rows of three cells (heading, emails, phones); the `classes_*` fields arrive as block classes.
- **Rendered DOM:**

```html
<div class="media-contacts block">
  <h2 class="media-contacts-title">TCS media contacts</h2>
  <ul class="contact-list-groups">
    <li class="contact-list-group" data-cmp-position="1">
      <h3 class="contact-list-heading">Corporate Communications &amp; India</h3>
      <ul class="contact-list-entries">
        <li class="contact-list-email">
          <a class="contact-list-link" href="mailto:…" data-cmp-interaction="email" data-cmp-value="Corporate Communications &amp; India">
            <span class="visually-hidden">Email: </span><span class="contact-list-text">…</span>
          </a>
        </li>
        <li class="contact-list-phone">…</li>
      </ul>
    </li>
  </ul>
</div>
```

- **Empty state:** no contacts: the block and its wrapper are hidden on the page; in Universal Editor and on AEM author the title and the hint `mediaContactsEditorHint` show.
- **Errors:** a failing sheet request counts as no sheet contacts (`loadDataSheet`); the items still show.
- **Motion:** `CONTENT_TARGETS['media-contacts']` animates the title and the groups one after another.

## Extending the Block

1. Add fields in `_media-contacts.json` (at most three short tabs, Additional last), run `npm run build:json`, `npm run lint`, `npm run build:docs`.
2. Respect the delivery rules (no Text / Title / Type / Alt / MimeType suffixes for values that must be read; no sample content in the template).
3. Keep the grouping and selection in `media-contacts-data.js` pure and extend its tests (`media-contacts-directory.test.mjs`).
4. A new sheet column: read it in `utils/data.js` `getMediaContacts` and document it in the knowledge base (content architecture, data sheets).
5. Keep link names and the data layer's address-free click events.

## For Site Administrators

- **Availability:** the `section`, `columns-container` and `tabs` filters.
- **Sheet:** `/content/tcs-corp/{country}/{language}/data/media-contacts` per locale and review root (published at `/{locale}/data/media-contacts.json`), excluded from the query index. On 18 November 2026 the three review roots have it (12 rows), the locales don't yet: their press releases show only Media Contact items until it is added.
- **Publishing dependencies:** publish the sheet after changing it; the pages update without republishing. **Contact groups dropdown:** generated from the published sheets (`npm run build:contacts`); the Media contact groups workflow checks them every six hours (or on demand) and opens a pull request when a group was added, renamed or removed; merge it to update the dialog. The repository setting "Allow GitHub Actions to create and approve pull requests" must be on.

| Dependency | Purpose | Location | Impact if unavailable |
| ---------- | ------- | -------- | --------------------- |
| Media Contacts sheet | The contacts maintained once | `/{locale}/data/media-contacts.json` | Only the Media Contact items show (hint in the editor) |
| Contact groups options | The dropdown of the dialog | `blocks/media-contacts/_media-contacts.json`, generated by `npm run build:contacts` and the Media contact groups workflow | The dropdown lists the groups of its last update; all groups still show when it is left empty |
| Placeholders | Default title, link names, editor hint | `/{locale}/placeholders.json` | English fallbacks |
| Icons | Mail and phone icons | `icons/mail.svg`, `icons/phone.svg` | Links without icons |

## For Architects

- **Role:** a data-driven listing block; the sheet is the single source of the shared contacts, Media Contact items hold one-off contacts (KB-D-074, superseding KB-D-054).
- **Rendering:** client side from the sheet JSON (cached per page view by `utils/data.js`); the title is in the delivered HTML, the contacts are not (not indexed by search engines from the HTML).
- **Dependencies:** `decorators/contact-list-decorator.js`, `editor-item-decorator.js`, `heading-decorator.js`; `utils/data.js`, `cells.js`, `environment.js`, `placeholders.js`, `properties.js`, `tags.js`.
- **Privacy:** the data layer records the kind of contact link and the group, never the address (`utils/privacy.js`).
- **Replaces:** the Media contacts section the Press Release template appended at the end of the page (not in the content tree, not authorable).

```mermaid
graph LR
  AEM[AEM author: Media Contacts block] --> EDS[Edge Delivery HTML]
  SHEET[Media Contacts sheet] --> JSON[/locale/data/media-contacts.json]
  EDS --> JS[blocks/media-contacts/media-contacts.js]
  JSON --> JS
  JS --> CL[decorators/contact-list-decorator.js]
  EDS --> DL[decorators/data-layer-decorator.js]
  DL --> ACDL[Adobe Client Data Layer]
```

## For QA and Support Teams

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| MC-QA-01 | Grouping | Three rows with the same designation and region | One heading, three links one below the other |
| MC-QA-02 | Heading | Designation empty, region "Asia Pacific" | Heading "Asia Pacific" |
| MC-QA-03 | Default title | Title empty | "Media contacts" at the Title Type level |
| MC-QA-04 | Heading levels | Title Type H2 | Group headings H3 |
| MC-QA-05 | Contact groups | Corporate Communications & India, Europe, Japan in the dropdown | Those three groups, in sheet order |
| MC-QA-05b | Contacts sheet | Another sheet (e.g. `/design-block-master/en/data/media-contacts`), a relative path (`data/media-contacts`), a missing sheet | That sheet's groups; the page's own site sheet; the block hidden (only items shown) |
| MC-QA-06 | Kinds | Show phone numbers off; then Show email addresses off | E-mail addresses only; then phone numbers only, Corporate Communications & India left out |
| MC-QA-06b | Page contacts | A Media Contact item; then Contacts from the Media Contacts sheet off | The item after the sheet's groups; then the item alone |
| MC-QA-06c | Migrated block | Title only (blocks authored before the options) | All the sheet's groups (10 on the language master) |
| MC-QA-07 | Nothing to show | No rows for the chosen groups, or both kinds off | Block hidden on the page; hint in Universal Editor |
| MC-QA-08 | Links | E-mail and phone | `mailto:` with the address; `tel:` with digits and a leading + |
| MC-QA-09 | Layout | 375 / 768 / 1440px | One column below 900px; two columns filled top to bottom from 900px |
| MC-QA-10 | Data layer | Click an e-mail address | `cmp:click` with `interaction` email, `xdm:linkURL` `mailto:`, no address |
| MC-QA-11 | Screen reader | Read a link | "Email: address" / "Phone: number" |

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| The block doesn't show on the page | The sheet has no rows for the chosen groups (or isn't published), or both kinds are off | Open `/{locale}/data/media-contacts.json`; check Contact groups and the Display tab | Add rows and publish the sheet; fix the groups or the toggles | The groups appear |
| A group appears twice | Different spelling of the designation or region | Compare the rows | Spell them the same | One group |
| A chosen group doesn't show | The tag's name isn't the group's heading in tag form, and no row has the tag in `group` | Compare the tag (e.g. `middle-east-africa`) with the heading (Middle East & Africa) | Rename the tag, or put the tag ID in the rows' `group` column | The group appears |
| A phone link dials a wrong number | Letters or extra characters in `phone` | Check the cell | Write the number with digits, spaces and a leading + | `tel:` link correct |

## Performance Considerations

- **Request:** one sheet request per page view (shared with other users of `utils/data.js`), plus the placeholders (already loaded by the page).
- **Rendering:** the block waits for the sheet (a few kilobytes, cached per page view) before it renders.
- **DOM size:** a few elements per contact; no listeners.
- **Layout shift:** the block sits below the fold on press releases; above the fold it appears once the sheet has loaded.

## Security and Privacy

- **Content:** text nodes only (`textContent`); no HTML from the sheet is injected.
- **Personal data:** the sheet's names, e-mail addresses and phone numbers are public by design; the data layer records none of them.
- **Links:** `mailto:` and `tel:` only.

## Known Limitations

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Contacts aren't in the delivered HTML | Search engines see them only after rendering | None needed for press contacts | Not planned |
| The Contact groups list follows the published sheets, not the authored Contacts sheet | A group of another sheet (Contacts sheet) that isn't in the default sheets has no option | Leave Contact groups empty (all the sheet's groups), or add the group to a default sheet | Not planned |
| A group added to a sheet appears in the dropdown after a merge | The Media contact groups workflow opens a pull request (every six hours, or on demand); the dialog updates once it is merged and synced | Run the workflow (Actions > Media contact groups > Run workflow) and merge its pull request | Not planned (Universal Editor options are fixed in the model) |
| Old press releases show today's contacts | tcs.com kept the contacts of the time of publication | Media Contact items on a page that must keep its original contacts | Not planned (the user's choice, 18 November 2026) |
| Pages that relied on the template's Media contacts | They show no contacts until the block is added | Add the block (end of the page) | Not planned |

## Related Documentation

- [Blocks documentation](../README.md)
- [Page Header](../page-header/README.md)
- [Model: `_media-contacts.json`](_media-contacts.json)
- [Grouping tests](../../test/media-contacts/media-contacts-data.test.mjs)
- [Templates](../../templates/README.md)
- [Handover 6.33 Media Contacts Block](https://github.com/sradha-tcs/tcs-corp-delivery/blob/main/archive/docs-before-role-docs-2026-11-08/docs/handover/TCS-CORP-HANDOVER.md)

<!-- BEGIN GENERATED: usage (npm run build:docs) -->

Pages of the block library package 1.0.14 (design and block master, `/content/tcs-corp/design-block-master/en`, KB-D-068) that contain the block, 6 instance(s) in total:
- Block library: `block-library/media-contacts/media-contacts-region`, `block-library/media-contacts/media-contacts-variations`, `block-library/templates/press-release-template`
- Curated design pages: `curated-design-pages/forms/tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank`

Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).

<!-- END GENERATED: usage -->

## Change History

| Version | Change | Source | Date |
| ------- | ------ | ------ | ---- |
| 1.0 | New block: the media contacts of the Media Contacts sheet as an authorable block, grouped by designation and region; the Press Release template no longer appends them | Feature branch feature/media-contacts-block | 22 October 2026 |
| 2.0 | KB-D-074: the sheet's groups again (they had stopped showing since PR #232, which rendered only Media Contact items: about 2,200 migrated press releases showed none), Contact groups (AEM tags), Show email addresses / Show phone numbers, Media Contact items after the groups; `group` / `heading` sheet columns; the page `region` filter described before is gone (not in the code since PR #232) | Feature branch feature/media-contacts-directory | 18 November 2026 |
