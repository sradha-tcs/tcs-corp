---
id: "AUD-006"
title: "Content Model Audit"
role: "Audit and remediation"
topic: ""
audience: "Technical lead, QA lead, documentation owner, product owner"
owner: "Documentation Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Content Model Audit

| Attribute | Value |
| --- | --- |
| Document ID | AUD-006 |
| Audience | Technical lead, QA lead, documentation owner, product owner |
| Purpose | Model statistics and fields without help text |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Statistics](#statistics)
- [Fields without a description (377)](#fields-without-a-description-377)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Statistics

| Measure | Value |
| --- | --- |
| blocks | 32 |
| components | 71 |
| fields | 1020 |
| variationFields | 512 |
| variationOptions | 4540 |
| testFiles | 20 |
| testCases | 264 |
| tokens | 352 |

Lint (eslint-plugin-xwalk rules): Passed (exit 0) on feature/keyword-action (PR #218).

## Fields without a description (377)

| Block | Component | Field |
| --- | --- | --- |
| accordion | accordion-item | Summary |
| accordion | accordion-item | Text |
| cards | cards | Heading type |
| cards | cards | Description |
| cards | cards | CTA link |
| cards | cards | CTA text |
| cards | cards | CTA style |
| cards | cards | Image ratio |
| cards | cards | Link items |
| cards | cards | Show image |
| cards | cards | Show eyebrow |
| cards | cards | Show tags |
| cards | cards | Show date |
| cards | cards | Date format |
| cards | cards | Show call to action |
| cards | cards | Image loading |
| cards | cards | Desktop columns |
| cards | cards | Previous / next buttons on desktop |
| cards | cards | Scroll indicator on desktop |
| cards | cards | Tablet columns |
| cards | cards | Previous / next buttons on tablet |
| cards | cards | Scroll indicator on tablet |
| cards | cards | Mobile columns |
| cards | cards | Previous / next buttons on mobile |
| cards | cards | Scroll indicator on mobile |
| cards | cards | Stretch cards to row height |
| cards | cards | Scroll snap |
| cards | cards | Snap alignment |
| cards | cards | Hide native scrollbar |
| cards | cards | Allow mouse drag |
| cards | cards | Scroll step |
| cards | cards | Empty message |
| cards | cards | Style options |
| cards | card | Image |
| cards | card | Description |
| cards | card | Tags |
| cards | card | Open in a new tab |
| cards | card | Card style |
| cards | card | Analytics label |
| columns | columns | Columns |
| columns | columns | Rows |
| columns-container | columns-container | Width Type |
| columns-container | columns-container | Background Image |
| columns-container | columns-container | Padding left |
| columns-container | columns-container | Padding right |
| columns-container | columns-container | Padding top |
| columns-container | columns-container | Padding bottom |
| columns-container | columns-container | Margin left |
| columns-container | columns-container | Margin right |
| columns-container | columns-container | Margin top |
| columns-container | columns-container | Margin bottom |
| conversation-canvas | conversation-canvas | BG Style |
| conversation-canvas | conversation-canvas | BG Background Image |
| conversation-canvas | conversation-canvas | Icon |
| conversation-canvas | conversation-canvas | Icon Alt Text |
| conversation-canvas | conversation-canvas | Eyebrow |
| conversation-canvas | conversation-canvas | Title |
| conversation-canvas | conversation-canvas | Title Type |
| conversation-canvas | conversation-canvas | Text |
| conversation-canvas | conversation-canvas | Menu |
| conversation-canvas | conversation-canvas | Menu › Menu root path |
| conversation-canvas | conversation-canvas | Menu › Menu depth |
| conversation-canvas | conversation-canvas | Search bar |
| conversation-canvas | conversation-canvas | Search bar › Search bar water mark |
| conversation-canvas | conversation-canvas | Search bar › Search bar audio icon |
| conversation-canvas | conversation-canvas | Search bar › Search bar audio icon alt text |
| conversation-canvas | conversation-canvas | Search bar › Search bar button icon type |
| conversation-canvas | conversation-canvas | Search bar › Search bar button icon type hover text |
| conversation-canvas | conversation-canvas-button | Link |
| conversation-canvas | conversation-canvas-button | Text |
| conversation-canvas | conversation-canvas-button | Title |
| conversation-canvas | conversation-canvas-button | Views |
| conversation-canvas | conversation-canvas-button | Type |
| conversation-canvas | conversation-canvas-button | Icon |
| embed | embed | Placeholder Image |
| embed | embed | Placeholder Image Alt Text |
| embed | embed | URI |
| filter-list | filter-list | Description |
| filter-list | filter-list | Show result count |
| filter-list | filter-list | Default layout |
| filter-list | filter-list | Datasource |
| filter-list | filter-list | Pages (authored before Page items) › Page |
| filter-list | filter-list | Sort by |
| filter-list | filter-list | Primary filter tags (authored before Tag items) › Tag Id |
| filter-list | filter-list | Show All filter |
| filter-list | filter-list | Card style |
| filter-list | filter-list | Featured rule |
| filter-list | filter-list | Featured pages (authored before Page items) › Featured page |
| filter-list | filter-list | Featured card count |
| filter-list | filter-list | Hero rule |
| filter-list | filter-list | Hero page |
| filter-list | filter-list | Title source |
| filter-list | filter-list | Description source |
| filter-list | filter-list | Tag source |
| filter-list | filter-list | Url source |
| filter-list | filter-list-page | Page |
| footer | footer | Link List › Link Title |
| footer | footer | Link List › Link Path |
| footer | footer | Link List › Link Type |
| footer | footer-link | Link Path |
| footer | footer-link | Link text |
| footer | footer-link | Open in |
| form-variations | form-variations | Form Title / Heading |
| form-variations | form-variations | Form Description |
| form-variations | form-variations | Theme |
| form-variations | field-text | Field type |
| form-variations | field-text | Input Type |
| form-variations | field-text | Mandatory Field (*) |
| form-variations | field-text | Show only if dropdown value equals |
| form-variations | field-select | Field type |
| form-variations | field-select | Dropdown Name / ID |
| form-variations | field-select | Dropdown Label |
| form-variations | field-select | Mandatory Field (*) |
| form-variations | field-select | Options |
| form-variations | field-select | Show only if dropdown value equals |
| form-variations | field-combined | Field type |
| form-variations | field-combined | Mandatory Field (*) |
| form-variations | field-combined | Show only if dropdown value equals |
| form-variations | field-textarea | Field type |
| form-variations | field-textarea | Field Name / ID |
| form-variations | field-textarea | Field Label |
| form-variations | field-textarea | Max Character Limit |
| form-variations | field-textarea | Mandatory Field (*) |
| form-variations | field-textarea | Show only if dropdown value equals |
| form-variations | field-checkbox | Field type |
| form-variations | field-checkbox | Checkbox Name / ID |
| form-variations | field-checkbox | Consent Text / Disclaimer |
| form-variations | field-checkbox | Mandatory Field (*) |
| form-variations | field-checkbox | Show only if dropdown value equals |
| form-variations | contact-card | Field type |
| form-variations | contact-card | Show when dropdown value equals |
| form-variations | contact-card | Contact Name |
| form-variations | contact-card | Emails |
| form-variations | contact-card | Phones |
| form-variations | field-submit | Field type |
| form-variations | field-submit | Button Label |
| form-variations | field-submit | Show only if dropdown value equals |
| fragment | fragment | Reference |
| gen-carousel | gen-carousel | Style |
| gen-carousel | gen-carousel | Padding left |
| gen-carousel | gen-carousel | Padding right |
| gen-carousel | gen-carousel | Padding top |
| gen-carousel | gen-carousel | Padding bottom |
| gen-carousel | gen-carousel | Margin left |
| gen-carousel | gen-carousel | Margin right |
| gen-carousel | gen-carousel | Margin top |
| gen-carousel | gen-carousel | Margin bottom |
| hero | hero | Icon |
| hero | hero | Eyebrow |
| hero | hero | Title |
| hero | hero | Description |
| hero | hero | CTA List › CTA Title |
| hero | hero | CTA List › CTA Link |
| hero | hero | CTA List › CTA Link Type |
| hero | hero | CTA List › CTA view |
| hero | hero-cta | CTA Link |
| hero | hero-cta | CTA Title |
| hero | hero-cta | CTA Link Type |
| hero | hero-cta | CTA view |
| image-collage | image-collage | Title |
| image-collage | image-collage | Description |
| image-collage | image-collage | Show Description |
| image-collage | image-collage | Primary CTA Title |
| image-collage | image-collage | Primary CTA Link |
| image-collage | image-collage | Primary CTA Link Type |
| image-collage | image-collage | Primary CTA Link Style |
| image-collage | image-collage | Secondary CTA Title |
| image-collage | image-collage | Secondary CTA Link |
| image-collage | image-collage | Secondary CTA Link Type |
| image-collage | image-collage | Secondary CTA Link Style |
| image-collage | image-collage | Title weight |
| image-collage | image-collage | Description size |
| image-collage | image-collage-item | Image treatment |
| list | list | Heading type |
| list | list | Description |
| list | list | CTA link |
| list | list | CTA text |
| list | list | CTA style |
| list | list | Pages (authored before List Items) › Page |
| list | list | Parent page |
| list | list | Use the current page when empty |
| list | list | Search root |
| list | list | Use the current page when empty |
| list | list | Tags |
| list | list | Match |
| list | list | Order by |
| list | list | Sort order |
| list | list | Image ratio |
| list | list | Link items |
| list | list | Show image |
| list | list | Show eyebrow |
| list | list | Show tags |
| list | list | Show date |
| list | list | Date format |
| list | list | Image loading |
| list | list | Desktop columns |
| list | list | Previous / next buttons on desktop |
| list | list | Scroll indicator on desktop |
| list | list | Tablet columns |
| list | list | Previous / next buttons on tablet |
| list | list | Scroll indicator on tablet |
| list | list | Mobile columns |
| list | list | Previous / next buttons on mobile |
| list | list | Scroll indicator on mobile |
| list | list | Stretch cards to row height |
| list | list | Scroll snap |
| list | list | Snap alignment |
| list | list | Hide native scrollbar |
| list | list | Allow mouse drag |
| list | list | Scroll step |
| list | list | Empty message |
| list | list | Style options |
| list | list-item | Open in a new tab |
| list | list-item | Eyebrow |
| list | list-item | Call to action label |
| list | list-item | Analytics label |
| modal | modal | Button Text |
| page-header | page-header | CTA List › CTA Title |
| page-header | page-header | CTA List › CTA Link |
| page-header | page-header | CTA List › CTA Link Type |
| page-header | page-header | CTA List › CTA Link Style |
| page-header | page-header-cta | CTA Link |
| page-header | page-header-cta | CTA Title |
| page-header | page-header-cta | CTA Link Type |
| page-header | page-header-cta | CTA Link Style |
| quote | quote | Eyebrow |
| quote | quote | Title |
| quote | quote | Title Type |
| quote | quote | Quote |
| quote | quote | Image |
| quote | quote | BG Color |
| separator | separator | Theme |
| separator | separator | Line thickness |
| separator | separator | Line colour |
| separator | separator | Line opacity |
| separator | separator | Separator width |
| separator | separator | Maximum width |
| separator | separator | Start decoration |
| separator | separator | Center decoration |
| separator | separator | End decoration |
| separator | separator | Show on desktop |
| separator | separator | Show on tablet |
| separator | separator | Show on mobile |
| separator | separator | Desktop thickness |
| separator | separator | Desktop alignment |
| separator | separator | Tablet thickness |
| separator | separator | Tablet alignment |
| separator | separator | Mobile thickness |
| separator | separator | Mobile alignment |
| separator | separator | Desktop top spacing |
| separator | separator | Desktop bottom spacing |
| separator | separator | Tablet top spacing |
| separator | separator | Tablet bottom spacing |
| separator | separator | Mobile top spacing |
| separator | separator | Mobile bottom spacing |
| separator | separator | Print |
| separator | separator | Analytics label |
| table | table | Options |
| table | table | Columns |
| table | table-row | Column 1 |
| table | table-col-2 | Column 1 |
| table | table-col-2 | Column 2 |
| table | table-col-3 | Column 1 |
| table | table-col-3 | Column 2 |
| table | table-col-3 | Column 3 |
| table | table-col-4 | Column 1 |
| table | table-col-4 | Column 2 |
| table | table-col-4 | Column 3 |
| table | table-col-4 | Column 4 |
| table | table-col-5 | Column 1 |
| table | table-col-5 | Column 2 |
| table | table-col-5 | Column 3 |
| table | table-col-5 | Column 4 |
| table | table-col-5 | Column 5 |
| table | table-col-6 | Column 1 |
| table | table-col-6 | Column 2 |
| table | table-col-6 | Column 3 |
| table | table-col-6 | Column 4 |
| table | table-col-6 | Column 5 |
| table | table-col-6 | Column 6 |
| table | table-col-7 | Column 1 |
| table | table-col-7 | Column 2 |
| table | table-col-7 | Column 3 |
| table | table-col-7 | Column 4 |
| table | table-col-7 | Column 5 |
| table | table-col-7 | Column 6 |
| table | table-col-7 | Column 7 |
| table | table-col-8 | Column 1 |
| table | table-col-8 | Column 2 |
| table | table-col-8 | Column 3 |
| table | table-col-8 | Column 4 |
| table | table-col-8 | Column 5 |
| table | table-col-8 | Column 6 |
| table | table-col-8 | Column 7 |
| table | table-col-8 | Column 8 |
| table | table-col-9 | Column 1 |
| table | table-col-9 | Column 2 |
| table | table-col-9 | Column 3 |
| table | table-col-9 | Column 4 |
| table | table-col-9 | Column 5 |
| table | table-col-9 | Column 6 |
| table | table-col-9 | Column 7 |
| table | table-col-9 | Column 8 |
| table | table-col-9 | Column 9 |
| table-list | table-list | Heading |
| table-list | table-list | Heading Type |
| table-list | table-list-card | Title |
| table-list | table-list-card | Description |
| tabs | tabs | Component |
| tabs | tabs | Width Type |
| tabs | tabs | Style |
| tabs | tabs | Alignment |
| tabs | tabs | Padding left |
| tabs | tabs | Padding right |
| tabs | tabs | Padding top |
| tabs | tabs | Padding bottom |
| tabs | tabs | Margin left |
| tabs | tabs | Margin right |
| tabs | tabs | Margin top |
| tabs | tabs | Margin bottom |
| tabs | tabs-block | Style |
| tabs | tabs-block | Alignment |
| tcs-header | tcs-header | TCS Logo |
| tcs-header | tcs-header | TATA Logo |
| teaser | teaser | Eyebrow |
| teaser | teaser | Show Eyebrow |
| teaser | teaser | Title |
| teaser | teaser | Description |
| teaser | teaser | Show Description |
| teaser | teaser | View All Text |
| teaser | teaser | View All Link |
| teaser | teaser | Show Date |
| teaser | teaser | Date |
| teaser | teaser | Date Format |
| teaser | teaser | Display Tags |
| teaser | teaser | Author name |
| teaser | teaser | Author image |
| teaser | teaser | Hide Image |
| teaser | teaser | Image ratio |
| teaser | teaser | Image corners |
| teaser | teaser | Links (authored before Link items) › CTA Title |
| teaser | teaser | Links (authored before Link items) › CTA Link |
| teaser | teaser | Links (authored before Link items) › CTA Link Type |
| teaser | teaser | Links (authored before Link items) › CTA Link Style |
| teaser | teaser | Primary CTA Title |
| teaser | teaser | Primary CTA Link |
| teaser | teaser | Primary CTA Link Type |
| teaser | teaser | Primary CTA Link Style |
| teaser | teaser | Secondary CTA Title |
| teaser | teaser | Secondary CTA Link |
| teaser | teaser | Secondary CTA Link Type |
| teaser | teaser | Secondary CTA Link Style |
| teaser | teaser | Stats (authored before Stat items) › Stats Title |
| teaser | teaser | Title weight |
| teaser | teaser | Description size |
| teaser | teaser-link | CTA Link |
| teaser | teaser-link | CTA Title |
| teaser | teaser-link | CTA Link Type |
| teaser | teaser-link | CTA Link Style |
| teaser | teaser-stat | Stats Title |
| teaser | teaser-collage-image | Image |
| teaser | teaser-collage-image | Image treatment |
| testimonial | testimonial | Eyebrow |
| testimonial | testimonial | Title |
| testimonial | testimonial | Title Type |
| testimonial | testimonial | Author Image |
| testimonial | testimonial | Stats › Stats Title |
| testimonial | testimonial | BG Color |
| testimonial | testimonial | Hide Eyebrow |
| testimonial | testimonial | Show Description |
| testimonial | testimonial-stat | Stats Title |
| video | video | Poster Image Alt Text |
| video | video | Playback |
| video | video | Loop |
| video | video | Aspect Ratio |
| video | video | Size |
| video | video | Rounded Corners |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
