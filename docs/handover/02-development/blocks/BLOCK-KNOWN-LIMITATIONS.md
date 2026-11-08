---
id: "DEV-B-LIM"
title: "Block Known Limitations"
role: "Development"
topic: "limitations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/*/README.md"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: false
---

# Block Known Limitations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-B-LIM |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | The known limitations of every block (from the block READMEs) |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/*/README.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Accordion](#accordion)
- [Anchor List](#anchor-list)
- [Button](#button)
- [Cards](#cards)
- [Column Break](#column-break)
- [Columns](#columns)
- [Columns Container](#columns-container)
- [Conversation Canvas](#conversation-canvas)
- [Embed](#embed)
- [Filter List](#filter-list)
- [Footer](#footer)
- [Form Variations](#form-variations)
- [Fragment](#fragment)
- [Gen Carousel](#gen-carousel)
- [Header](#header)
- [Hero](#hero)
- [Image Collage](#image-collage)
- [Interactive Dashboard](#interactive-dashboard)
- [List](#list)
- [Media Contacts](#media-contacts)
- [Modal](#modal)
- [Page Header](#page-header)
- [Quote](#quote)
- [Separator](#separator)
- [Tab](#tab)
- [Table](#table)
- [Table List](#table-list)
- [Tabs](#tabs)
- [TCS Header](#tcs-header)
- [Teaser](#teaser)
- [Testimonial](#testimonial)
- [Video](#video)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Accordion

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No "open by default", "one open at a time" or expand / collapse all option | All items start closed and open independently | Put essential content outside the Accordion | Not recorded |
| No FAQ structured data (JSON-LD) | No FAQ rich results | None | Not recorded |
| Summaries are not headings; no heading level option | Not in the heading outline | Add a Title above the block | Not recorded |
| Bodies are rich text only; no nested blocks or image styling | No media in items | Use other blocks outside the Accordion | Not recorded |
| The body text token (`--color-text-neutral-secondary`) and the divider token are not redefined by the dark-background theme contract in `styles/styles.css` | Body text contrast on Dark / Dark green sections may be insufficient | Check on `block-library/foundations/section-colours-with-blocks` before using it on dark sections | Not recorded |

## Anchor List

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Same-page links only | Can't link to other pages | Use other link blocks | Not planned |
| No visible scrollbar or scroll buttons when links overflow | Off-screen links may be missed | Few, short Link Titles | Not recorded |
| The scroll offset counts only the site header and the list | Other fixed elements can cover the target | Avoid extra fixed elements | Not recorded |
| At the end of the page the highlight jumps to the last link | Short final chapters are highlighted only at the end | Accept, or lengthen the last chapter | Not recorded |
| Scroll-driven highlight changes aren't in the data layer | No reading-progress analytics | None | Not recorded |
| An empty Anchor List renders an empty, labelled `nav` | Empty landmark | Add links or remove the block | Not recorded |
| Listeners aren't removed when Universal Editor re-renders the block (audit D-C-19) | Editor only, no published impact | Reload the editor | Deferred |
| A sticky list keeps `--color-bg-default` while a dark section's theme contract turns the link tokens light (`styles/styles.css`) | Links may lack contrast on a sticky list in a Dark / Dark green section | Check on the page; avoid Sticky in dark sections | Not recorded |
| Several Anchor Lists on a page share the label "On this page" | Landmarks not told apart | One Anchor List per page | Not recorded |

## Button

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No open-in-new-tab option | External links open in the same tab | Accept, or another block's CTA | Not recorded (external link policy: owner product owner) |
| No disabled state for authors | — | — | Not recorded |
| Four icons | Limited icon set | Request an icon | Not recorded |
| Labels never wrap | Long labels clipped on mobile | Short labels | Not recorded |
| Alignment not per breakpoint | Same alignment everywhere | — | Not recorded |
| Built-in Buttons authored before keep only Primary / Secondary | Other options need a Button block | Content migration | Content action |

## Cards

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Cards blocks created before the redesign have no block model | Their settings can't be edited | Replace with a new Cards block | Migration (Phase 0, `docs/proposals/cards-card-refactoring.md`) |
| Those blocks render in the new design, not the original bordered grid | Visual change on existing pages | Replace or accept | Classic presentation (Phase 0) |
| In legacy cards the title stays inside Description in the Card dialog | Authors edit the title in the rich text | Format the title as a heading | Move titles into Title when editing (proposal) |
| No author lockup on the feature card | Feature without author | Use the List for page-based features | Not recorded |
| Internal links aren't resolved through the redirects sheets | Moved pages go through a redirect | Update links after page moves | Not recorded |
| Card text fields are edited in the properties panel; only the description in place | Slower editing | — | Not recorded |
| The new-tab hint isn't announced on calls to action without an Accessibility label (the generated `aria-label` replaces it) | Screen reader users aren't told | Mention the new tab in the Accessibility label | Not recorded |
| Month abbreviations are English in every locale | Non-English dates in English | Use a numeric Date format | Not recorded |
| Card ids follow the shown order | Reordering changes the data-layer ids (D-A-23) | — | Deferred (audit) |
| Edge "Cards run to the edge" looks like "Inside the content width" in full-width sections (D-A-9) | No visible difference | — | Deferred (audit) |
| A stored Touch swipe off with no controls blocks touch scrolling (D-A-10) | Cards unreachable on touch | Turn on previous / next buttons | Deferred (audit) |
| No carousel autoplay or dots, masonry, filtering, sorting or search | — | Filter List for filterable listings | Planned (proposal phases 1–6) |
| Card date may show the previous day for some stored date-times (D-A-26, suspected) | Wrong date | Check the published date | Blocked (to be verified) |

## Column Break

| Limitation | Impact | Workaround | Planned correction |
|---|---|---|---|
| Option changes (Anchor ID, Hide block, spacing) apply after the section is rendered again (re-audit R-C-7, deferred) | No immediate feedback in the editor | Reload the editor | Not recorded |
| Columns have no own width | All columns of a row are equal | Use the container's Columns per row | Not planned |
| The `column` legacy rename is done only in Columns Container sections | Items named "Column" in tabs aren't Column Breaks | Replace them with Column Breaks | Not recorded |

## Columns

| Limitation | Impact | Workaround | Planned correction |
|---|---|---|---|
| Columns hold default content only | No blocks in columns | Columns Container | Not planned (deprecated) |
| No Additional tab (AEM doesn't deliver `classes_*` for the built-in Columns) | No anchor, spacing, hide or animation | Columns Container | Not planned (deprecated) |
| Equal widths only, no wrapping into rows | Narrow columns with many cells | Columns Container with Columns per row | Not planned (deprecated) |
| Production content authored before isn't migrated | Two column implementations coexist | Migrate page by page | Not recorded |

## Columns Container

| Limitation | Impact | Workaround | Planned correction |
|---|---|---|---|
| Columns are always of equal width (Column widths removed in handover 2.26) | No 1/3 + 2/3 layouts | Use blocks with their own layouts (Teaser image position) | Not planned |
| Column Break option changes apply after the section is rendered again (re-audit R-C-7, deferred) | No immediate feedback in the editor | Reload the editor | Not recorded |
| At most 4 columns per row | Wider rows not possible | More rows | Not planned |
| Inside a tab only Columns per row is authorable | Gap, alignment and breakpoint fixed (Medium, Top, Desktop) | Use a Columns Container section | Not planned |
| A section can't be placed in a column | No Tabs Container, Gen Carousel or Columns Container in a column | Use the Tabs block in a column | Not planned |

## Conversation Canvas

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No search or conversational service in the repository | A query only opens the Search page or reaches an integration | Set the Search page | Not recorded |
| Without Search page and integration the "Search isn’t available yet." status is visually hidden | Sighted visitors get no feedback | Set the Search page | Not recorded |
| Filters and suggestions need a script; filter buttons have no behaviour | Secondary shows no filters | Implement the supplying script | Not recorded |
| The menu ignores `hide-in-nav` and `robots` (F-33) and lists pages in path order, not the Figma order (F-78) | Unexpected or misordered entries | Exclude pages from the index | Not recorded |
| The query index isn't available in Universal Editor | "No pages found" while authoring | Check on aem.page | Not planned |
| BG Style Dark and Navigation style apply only to Primary (CSS) | No visible change on Default / Secondary | Use a background image or a Section style | Not recorded |
| Hide block and spacing apply only in `main` | No effect on header / footer Canvases | Edit the nav or footer canvas page | Not recorded |
| The site menu keeps the title suffix after a vertical bar (only the dock removes it) | Long menu labels | Shorter page titles | Not recorded |
| The dock panel has an `aria-label` without a landmark role | The label may not be announced | — | Not recorded |
| Unkeyed (single-cell) rows: a row with a link is read as a button item | Only hand-made markup affected | Use keyed rows | Not planned |
| Footer canvas sample with a test hover text (F-33) | Odd button name and tooltip | Correct the field | Not recorded |
| The prototype's threshold, offsets and motion (Figma Sites) can't be verified | Values come from the design file | — | Not planned |

## Embed

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No start time, playlist or other YouTube parameters | Plays from the start | Use the Video block (Start At) | Not recorded |
| Generic iframes always 16:9 | Tall pages are cut off | Link to the page instead | Not recorded |
| No host allow-list for generic iframes | Any framable URL can be embedded | Governance of who authors Embeds | Not recorded |
| No handlers for Instagram, LinkedIn, Facebook, TikTok | Usually refused as iframes | Link to the post | Not recorded |
| Iframe interactions not tracked | No provider play data | None | Not recorded |
| Frame name is generic ("Content from {host}") | Screen readers don't hear the video's name from the frame | Heading before the block; placeholder alt text | Not recorded |
| `muted=1` passed to YouTube after Play | The video may start with sound | Use the Video block | Not recorded |
| An Embed without a URL still reserves an empty 16:9 area | Blank space on the page | Delete the block or add a URI | Not recorded |
| No consent management | Provider cookies once loaded | Click-to-load placeholder | Not recorded (owner: privacy / legal) |

## Filter List

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No results in Universal Editor or on AEM author (no query index) | Authors can't see the cards while editing | Check the preview URL | Not planned |
| Filters aren't in the URL | No deep links or back-button state for filters | None | Not recorded |
| The whole index (all locales) is downloaded and filtered in the browser | Load time grows with the site | Keep the index lean | Not recorded |
| `hide-in-nav` pages and redirects aren't applied (unlike List) | Hidden or redirected pages can be listed | Restrict by Root path or types; Manual List | Deferred (audit D-A-29, product decision) |
| Authors lookup is case-sensitive | Lockup with name only | Use consistent lower-case ids | Not recorded |
| Card CTA labels are global placeholders; the report "Download" opens the page, not a file | Generic button labels | Make the report page offer the download | Not recorded |
| Numeric maximums are only in the model; the code enforces the minimum of 1 | Values authored outside the dialog aren't capped | None | Not recorded |
| The card mapping fields are free text | A typo empties that part of every card | Keep the defaults | Not recorded (audit D-A-18: mapping fields kept) |
| Cards aren't server-rendered | Not in the delivered HTML for crawlers without JavaScript | Listed pages are in the sitemap | Not recorded |

## Footer

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| The bar is rendered even when copyright and links are empty (F-16) | An empty strip on a footer page | Fill in the copyright or links | Not recorded (F-16 open, P3) |
| An icon name without a file in `/icons` gives a broken icon (F-16) | Broken social icon | Use a supported name or an image URL | Not recorded (F-16 open, P3) |
| No fallback to `references/footer` when the configured footer page can't load (the header has one) | Only the social row | Publish the footer page / correct the path | Not recorded |
| Inherited Footer values cached per browser session (F-35) | Changes show in a new session | Private window | Not recorded |
| Offered in every section; styles only inside `<footer>` | Unstyled on content pages | Use it only on footer pages | Not recorded |
| A link title equal to its text is kept (audit, docs/audit/blocks/group-d-forms-media-chrome.md) | Redundant tooltip | — | Not recorded |
| Link List multifield still in the dialog | Two ways to add links | Use Footer Link items | Not recorded (audit: deprecate) |

## Form Variations

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No back end in the repository (F-01, O-08) | Data is delivered only with a Submit action or an integration | Set the Submit action; agree the back end | Not recorded |
| `cmp:submit` is pushed before the outcome (R-D-3) | Analytics can't tell delivered submissions | Use a success signal from the integration | Blocked: measurement plan |
| The double-submit guard (`aria-busy`) covers only the Submit action request | While an integration's promise is pending, another Send dispatches the event again | Let the integration ignore repeated calls | Not recorded |
| One value per condition; conditions match any dropdown of the form | Complex routing needs several items | Add one item per value | Not planned |
| Width derived from the field name; the required note takes one grid column from 900px; the checkbox error sits beside the consent text (F-32) | Layout surprises | Start with a full-width item, pair half-width fields | Not recorded |
| Item cells read by position (O-18) | A missing cell shifts later values | Set every item field once | Not recorded |
| Error colours hard-coded (`#c8102e`, `#ff6b6b`) | Not themable by tokens | — | Not recorded |
| No radio groups, multi-select, file upload, date, number or multi-step forms | Unsupported form types | Other solutions | Not recorded |

## Fragment

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Full URLs in Reference are ignored (F-15) | A pasted URL shows nothing | Use the content picker | Not recorded (F-15 open, P3) |
| Content isn't in the delivered page HTML | Not part of the page for SEO | Keep unique content on the page | Not planned |
| No caching in code; each use fetches | Extra requests for repeated fragments | — | Not planned |
| The same fragment twice may produce duplicate ids (suspected, audit docs/audit/blocks/group-c-containers.md) | Duplicate anchors | Avoid two instances with anchors | Not recorded |
| The Reference isn't localized | Copied pages may show another locale | Re-point after copying | Not planned |
| Field label "Reference" is technical (audit suggestion "Fragment page") | Author clarity | — | Not recorded |

## Gen Carousel

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Autoplay pushes `cmp:show` at every automatic change | Slide views inflated in analytics | Filter in the measurement plan | Not recorded (analytics owner to be confirmed) |
| A hidden or empty slide still counts as a slide | Empty slide and dot | Delete or move the block | Not planned |
| Auto-only carousels can't be swiped | No touch navigation besides the dots | Use Manual and Auto | Not planned (by design) |

## Header

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No navigation in the desktop header (product decision, F-72) | A page without a Conversation Canvas has no desktop navigation | Author a Canvas on the page or the nav page | Not recorded (F-72 open, Product Owner / Design) |
| Inherited Navigation cached per browser session (F-35) | A changed parent value shows in a new session | Test in a private window | Not recorded |
| Nav pages hold boilerplate content (F-74) and the logos aren't in DAM yet (F-77) | Placeholder header content | Author the nav pages; upload the SVG logos | Not recorded (content tasks) |
| Figma deviations for accessibility (F-75): darker arrows, inset rows | Visual difference from Figma | — | Design review |
| On desktop the nav landmark "Main navigation" holds only the two logo links (audit, docs/audit/blocks/group-d-forms-media-chrome.md) | Landmark name slightly inaccurate | — | Not planned |
| No hover-to-open and no outside-click handler; closing relies on focus leaving the nav | A tap on the menu background keeps it open (by design, F-71) | Escape or the close button | Not planned |

## Hero

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No background video | Video banners can't be built with the Hero | Use the Video or Embed block | Not recorded |
| Lottie JSON served only once published (R-B-2) | Empty background on preview / live if not published | Publish the asset | Operations |
| Motion Type authored before can't be changed in the dialog (R-B-6) | Legacy animation stays | Migrate to Animation Type | Content migration |
| Default overlay eyebrow contrast (R-B-4) | Brand eyebrow over the white overlay | — | Design sign-off pending |
| Background animation delays LCP on the first Hero (F-94) | Slower LCP | Use it below the fold | Not planned |
| Legacy CTA List items keep their stored CTA Arrow "right" (F-55) | No automatic down arrow for `#` links in those items | Choose Down, or re-create as CTA items (Auto) | Not planned |

## Image Collage

- At most nine images; the slot positions are fixed by the design.
- The images are decorative only (`aria-hidden`); their alt text isn't announced.
- The Teaser's Layout Image collage offers the same design (KB-D-063, Proposed).
- The colours are fixed values of the design (`--image-collage-*` custom properties), not the site's semantic tokens, so a dark Section's theme contract doesn't change them.

## Interactive Dashboard

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Placeholder only: no content model, rendering, data or interactivity | No dashboard | Table, Cards, Embed | Not recorded (requirements: owner product owner) |
| Not offered in any filter | Can't be added | — | When implemented |
| Editor label is fixed English | Not translated | — | Not recorded |
| Still tracked in the data layer; its section may leave empty space | Reporting noise; gaps | Remove from pages | Not planned |

## List

| Limitation | Impact | Workaround | Planned correction |
|---|---|---|---|
| Content Fragment lists aren't supported | No CF-driven lists | Pages or Cards | Not planned (by decision) |
| Sources come from the query index | Unpublished or not indexed pages aren't listed; manual order is path order | Fixed list for a curated order | Not planned |
| No full-text search source | Core List search unavailable | Filter List | Not planned |
| No query index in Universal Editor | Child / tagged lists show a hint in the editor | Check the published page | Not planned |
| Live index missing card columns (F-10) | Overrides and hide-in-nav may have no effect | Reindex | Not recorded |
| Statistic "bn" smaller units in one title (Figma) aren't styled | One size for the number | None | Not recorded |
| Figma two-tone title (variation 6) isn't an option | One colour title | None | Not recorded |
| Only the current locale's pages | No cross-locale lists | Fixed list with URLs | Not recorded |

## Media Contacts

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Contacts aren't in the delivered HTML | Search engines see them only after rendering | None needed for press contacts | Not planned |
| No per-block region | All blocks on a page use the page's `region` | Set the page's region | Not planned |
| Pages that relied on the template's Media contacts | They show no contacts until the block is added | Add the block (end of the page) | Not planned |

## Modal

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| The Video pop-up player (`.modal .video-modal-player`, up to 75rem) is wider than the dialog (56.25rem) (F-51) | Player runs past the dialog edge at 1440px | — | Not recorded (F-51 open, P2) |
| The modal page is fetched at every opening | Repeated requests | — | Not planned |
| The opener is always a primary button (no style option, audit) | No secondary / tertiary opener | Use a Button Block linking to a `/modal/` page | Not recorded |
| Auto-link ignores the link's origin | External `/modal/` links don't navigate | Avoid such links | Not recorded |
| Auto-link starts in the lazy phase and not in Universal Editor (the editor navigates) | Early clicks navigate | Use a Modal block for editor previews | Not planned |
| A failed fetch shows no message | Silent failure | Publish the modal page | Not recorded |

## Page Header

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| A featured image that isn't same-origin site media is lazy-loaded (F-14) | Slower LCP on landing pages | Use DAM images delivered as site media | Not recorded |
| Page Type offers home, article, blog, press-release; landing / listing only via the metadata sheet (F-12) | Default can't resolve to Landing from page properties | Set page-type in the sheet or choose Landing | Not recorded (open: one list of page types, O-11) |
| Only the English taxonomy is published (F-09) | ID-derived tag labels in other locales | Publish each locale's taxonomy | Not recorded |
| Date format dd/mm/yy in every locale | Not localised | — | Not recorded |
| Metadata changes are read when the page loads | Editor shows old values until reloaded | Reload the editor | Not planned |

## Quote

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| No CTA field | A quote can't carry a styled call to action | Put a link in its own paragraph in the Quote or Quote Author (it becomes a button), or add a Teaser or Button below | Not planned |
| Image Position (Desktop) applies only from 900px and Image Position (Mobile) only below 900px | Authors checking the wrong width see no change | Validate both widths in preview | Not planned |
| Fixed cover crops (4:5, 622:869) | Landscape or tight images lose their edges | Use portrait images with space around the face | Not planned |

## Separator

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| The visual presentation uses the site's tokens until the Figma designs are applied | Colours / sizes may differ from the final design | — | Not recorded |
| A brand-icon decoration needs an approved icon asset | Only dot, square and diamond | — | Not recorded |
| No free-form CSS class or colour fields (controlled options only, by the design system) | Custom looks need a new option | Add a variant / option | Not planned |
| An Accessible label is read as the separator's name by most screen readers, not all | Name not announced everywhere | Use headings for important structure | Not planned |
| Theme Auto follows only `.section.dark` / `.section.brand`; Section Style Dark / Dark Green don't switch its palette (F-21) | Light-palette line on dark sections | Choose Theme Dark or Brand | Not recorded |
| Duplicate controls kept for content authored before (Component ID, Background contrast, Stretch; audit D-D-17) | Two ways to set id, colour and width | Use the main fields | Not recorded |

## Tab

| Limitation | Impact | Workaround | Planned correction |
|---|---|---|---|
| ID, Active tab, Columns per row and Hide block changes apply only when the Tabs Container is rendered again (re-audit R-C-7, deferred) | No immediate feedback in the editor | Reload the editor | Not recorded |
| A Tab outside a Tabs Container shows its chip on the page | Visible stray label | Keep Tabs in Tabs Containers (the filter offers it only there) | Not planned |
| Gap, alignment and breakpoint of the columns in a tab aren't authorable | Fixed medium gap, top, from 900px | Use a Columns Container section | Not planned |

## Table

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Maximum 9 columns | Wider data doesn't fit | Split the table | Not recorded |
| No merged cells, sorting, filtering, `caption`, column alignment or sticky headers | Limited table features | Simplify the data | Not recorded |
| No stacked mobile layout | Wide tables scroll | Fewer columns | Not recorded |
| Changing Columns doesn't convert existing Rows | Padded empty cells | Recreate the Rows | Not planned |
| Only the heading immediately before names the table | Unnamed table otherwise | Place the heading right before | Not recorded |
| An empty first Row with at most one cell is skipped as a tab row | The next Row becomes the header | Don't leave the first Row empty | Not recorded |

## Table List

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| At most 10 items | Longer lists need another block | List or Filter List | Not planned |
| Titles and headings are plain text | Formatting is dropped | — | Not recorded |
| Only `/`, `#` and `http(s)` links | No `mailto:` / `tel:` | — | Not recorded |
| No images | Text-led only | Cards or List | Not planned |
| A two-cell row without editor instrumentation is read as the legacy header | An item may disappear on the published page | Fill the item's other fields | To be confirmed (handover 6.18.13 Issue 6) |
| The legacy header item can't be added any more but is still read | Old lists keep their header | Move it into the block fields | Not recorded |
| Item clicks carry no position or item id | Item-level reporting only by `dc:title` / URL | — | Not recorded |
| No unit tests | Regressions found only by manual checks | QA table above | Not recorded |

## Tabs

| Limitation | Impact | Workaround | Planned correction |
|---|---|---|---|
| Changing a Tab's ID, Active tab, Columns per row or Hide block in Universal Editor applies only after the container is rendered again (re-audit R-C-7, deferred) | Authors don't see the change at once | Reload the editor | Not recorded |
| Gap, Vertical alignment and Side by side from aren't offered for columns in a tab | Columns in tabs always use the medium gap, top alignment and 900px breakpoint | Use a Columns Container section outside the tabs | Not planned |
| A Conversation Canvas isn't offered inside a Tabs Container | No Canvas in a tab | Place the Canvas outside the Tabs | Not planned |
| The tab shown on load pushes no `cmp:show` | The first view isn't counted as a tab view | Use the component state | Not recorded |
| `decodeURIComponent` of the address hash has no error handling | A malformed percent-encoded hash may stop the Tabs from being built | Avoid malformed links | Not recorded |
| A Tabs block panel whose fragment fails shows no message | An empty panel on the page | Publish the fragment | Not recorded |

## TCS Header

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| The alt fields collapse into their images: without an image, the authored alt text isn't available | A linked logo without image shows the placeholder name, not the authored alt | Always select the image | Not planned (AEM delivery rule) |
| Offered in every section (`section` filter) | Authors may add it to content pages | Add it only to nav pages | Not recorded (audit suggestion: nav-page-only filter) |
| Logo assets not yet in DAM (F-77) | No logos until authored | Block library sample PNGs | Not recorded (content task) |
| Additional tab has no effect in the site header | Spacing / hide only on the nav page itself | — | Not planned |
| Header over the first block: first page shift | A visitor's first page with Always or Never moves once when the header loads | Keep Auto where the first block is a light Hero | To be discussed (KB-D-052, Proposed) |
| Header over the first block: one mode per browser | A nav page without a TCS Header keeps the mode remembered from another nav page | Add the TCS Header to every nav page | Not recorded |
| Header over the first block: dark first blocks | Dark logos aren't visible over a dark first block (Always) | Keep Auto / Never for dark first blocks | Not recorded (a light-logo option) |

## Teaser

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| Some options have no effect in some layouts: Text alignment Center in Text split, Top spacing in Background image and Card, Image ratio Original on animations (handover F-18) | Author confusion | Choose options that apply to the layout | Not recorded |
| A Primary Button keeps its dark fill on the Teaser's own BG Color Dark / Dark green; `teaser.css` adapts only secondary buttons and text links (handover F-49) | The main call to action is hard to see | Use a Secondary Button or a Text link on dark teasers | Not recorded |
| The "Link copied to clipboard" status is anchored to the right edge of the actions (`.teaser-status`, `right: 0`) (handover F-50) | With the actions on the left, the message can run off the left edge | None | Not recorded |
| Background animation clips or fades the image while it runs (handover F-94) | Delays the image paint above the fold | Use Background animation below the fold | Not planned |
| No video media type | Video can't be the teaser's media | Use the Video or Embed block | Not planned |
| View All has no Link Type | It always opens in the same window | Use a CTA or Link item for a new-window link | Not recorded |

## Testimonial

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| In legacy Stats multifield items, the last element is always the value (handover F-25) | A one-element or multi-paragraph item renders unexpectedly | Use Stat items | Not recorded |
| No CTA field | No styled call to action in the block | Add a Teaser or Button below, or a standalone link in the rich text | Not planned |
| Background animation needs BG Color Grey | No background animation on the default white block | Use Animation Type for the content | Not planned |

## Video

| Limitation | Impact | Workaround | Planned correction |
| ---------- | ------ | ---------- | ------------------ |
| One captions track; no audio description track | Single captions language per block | One block per locale | Not recorded |
| Captions file ignored for YouTube / Vimeo | No CC from the VTT | Add captions on the platform | Not planned |
| End At not applied to Vimeo | Video plays on | Edit on Vimeo or use a file | Not recorded |
| Stop / play restarts YouTube and Vimeo | Visitors lose their position | Keep controls on | Not recorded |
| Files cropped to the Aspect Ratio | Edges cut off | Match the ratio | Not planned |
| Interactions inside YouTube / Vimeo not tracked | No provider play data | None | Not recorded |
| Autoplay start of a file (not muted + looping + without controls) pushed as `cmp:media` | Inflated play counts | Filter in reporting | Deferred (D-D-13, needs the measurement plan) |
| Posters of the former Placeholder Image group not delivered | Older blocks show no poster | Re-select in Poster Image | Content migration (R-D-7) |
| Non-image DAM files served only once published | 404 on preview / live | Publish with references | Operations (R-D-6) |
| No consent management for provider players | Provider cookies once loaded | Privacy-enhanced Mode | Not recorded (owner: privacy / legal) |
| No VideoObject structured data, chapters or playlists | No rich results | Describe the video in page text | Not recorded |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
