---
id: "BA-006"
title: "Business Rules"
role: "Business analysis"
topic: ""
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Low"
primary: true
---

# Business Rules

| Attribute | Value |
| --- | --- |
| Document ID | BA-006 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | Business rules found in the implementation |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

**INFERRED REQUIREMENT, REQUIRES BUSINESS VALIDATION**

| Block | Rules (README: Content and Asset Guidelines) |
| --- | --- |
| Accordion | **Summaries:** short, specific and unique; a question for FAQs; don't start every summary with the same words. Long summaries wrap (the handover recommends up to about 100 characters; not enforced). • **Body text:** short paragraphs, lists and descriptive links ("Graduate careers", not "click here"). Headings inside a body should follow the page's heading hierarchy. • **Titles / eyebrows / labels / CTAs:** the block has none of its own; put calls to action outside the Accordion so they are always visible. • **Images and icons:** the block CSS has no image rules; avoid images in items. The chevron is `icons/chevron-down.svg`, drawn by CSS. |
| Anchor List | **Link Titles:** short chapter names, as the section headings read (or a consistent "CH n: Name" pattern); about 25 characters (handover guidance); links never wrap. • **Anchor Names:** stable, meaningful words (`findings`, not `section-2`); don't rename anchors other pages link to. • **Titles, descriptions, eyebrows, CTAs, images, icons:** none in this block. • **Tags and metadata:** none read. |
| Button | **Labels:** start with a verb, describe the outcome; keep them short (labels don't wrap and are • **Title:** optional context only; mention the format of downloads. • **Links:** internal pages with the picker; external URLs open in the same tab (no new-tab option). • **Icons:** Arrow right, Chevron right, Chevron down, Search (files in `/icons`). |
| Cards | **Titles:** block title up to about 60 characters; card titles up to about 60 characters (2 lines on a 4-column desktop grid); statistic numbers up to about 8 characters (use Compact statistic title for phrases). Recommended lengths come from the handover; they aren't enforced. • **Descriptions:** up to about 160 characters; on Portrait / Compact panels up to about 120, or use Panel height Content. • **Eyebrows and labels:** 1–3 words. The eyebrow replaces the tags on image cards. • **CTAs and links:** start with a verb ("Explore services", "Download the report"); link to canonical published pages (Cards uses the link as authored and doesn't resolve redirects); don't put the same destination in the card link and in a description link. |
| Column Break | **Column name:** a short label for authors (e.g. "Contact details"); not translated for visitors (not shown). • **Anchor ID:** `anchor-` followed by lower-case letters, digits and hyphens (validated). • **Content:** whatever the parent allows; start a column with a heading when it is its own topic. • **Images, CTAs, tags:** none on the Column Break. |
| Columns | Only Text, Image and Title in columns; buttons as bold (primary) or italic (secondary) links in a Text. • Images: full column width (`width: 100%`); alt text on every meaningful image. • Min / max: no verified technical limit was identified; many columns become narrow (equal shares, no wrapping). • New content: use the Columns Container. |
| Columns Container | **Columns:** up to four per row (at most 4 in Automatic; 1–4 when chosen); more Column Breaks make more rows. No verified limit on the number of rows was identified. • **Column content:** start a column with a heading when it is a topic of its own; keep the columns' content of similar length if Vertical alignment Stretch isn't used. • **Column names:** short editor labels (not shown on the page). • **Background image:** an image from the DAM; alt text only if it carries meaning, else leave it empty (decorative). The section background is built as a responsive picture (2000px wide from 600px, 750px below). |
| Conversation Canvas | **Titles, eyebrows, text:** one question as the H2; eyebrow a short context label; one or two sentences of text. • **Search bar texts:** an inviting water mark (it is also the label); a meaningful hover text (it is the submit button's name). • **Quick actions:** clear verbs ("Contact us", "Explore services"); one primary action. • **Links:** quick action links and the Search page are authored; menu and dock links come from the query index (concise page titles; text after "\|" is dropped in the dock only). |
| Embed | **Titles and descriptions:** put them in the page (Title / Text before the block); the block has • **Labels:** "Play", "Play video: {title}" and "Content from {source}" come from placeholders • **Links:** full https URLs; the canonical provider URL. • **Images and alt text:** a 16:9 image (cropped with `object-fit: cover` to the 56.25rem maximum |
| Filter List | **Title / description:** the handover recommends up to 60 characters for the title and 1 to 2 sentences for the description (not enforced). • **Card titles and descriptions:** come from the pages (title / description or the mapped columns); descriptions are clamped to 3 lines by CSS; write page titles that make sense out of context (they are the link text of most cards). • **Eyebrows and labels:** the eyebrow is the `content-type` label by default; use consistent Content type values (a value containing "report" makes a report card in the Mixed style). CTA labels (Read more, Download, Explore, Load more, Reset filters) come from placeholders, not from the block. • **Images and alt text:** card images use the mapped image columns, else the page's own image; all card and author images are decorative (empty alt). Site media (`/media_` URLs on the same origin) are optimized responsive pictures; other URLs are plain lazy `img` elements. Card media is 4:3 (`object-fit: cover`); spotlights cover a full-width card (at least 35rem hero, 30rem featured) — keep the subject clear of the text side. |
| Footer | **Copyright.** One line; the copyright column is at least 19.375rem wide (links go below it on narrow screens). • **Links.** Navigational nouns ("Privacy & Terms", "Cookie policy"), short and unique. • **Canvas.** See the Conversation Canvas README; its title shows at 6rem from 600px. • **Icons.** `/icons` names need no upload; image icons display at 1.5rem × 1.5rem (square SVG / PNG). |
| Form Variations | **Titles and descriptions:** one H2 per form; keep the page H1 elsewhere (e.g. the Page Header). The description says what happens after sending. • **Labels:** clear, visible, without relying on the description. Don't put essential information only in conditional contact cards. • **CTAs:** a specific verb on the Submit Button ("Send", "Subscribe"); one visible primary action, extra buttons only when conditional. • **Links:** only in the consent text (rich text) and contact cards (generated `mailto:` / `tel:`). |
| Fragment | **Titles.** Start at H2; keep the fragment's outline valid in every host page. • **CTAs and links.** Generic enough for every host page. • **Images.** Select them with the image picker on the fragment page; `./media_` paths are rebased to the fragment page. • **Tags and metadata.** Not used from the fragment page; give it a clear title for authors. |
| Gen Carousel | **Titles, descriptions, eyebrows, CTAs.** Follow the Hero / Teaser rules; one message and one primary CTA per slide; distinct CTAs across slides. • **Images and alt text.** Per slide block; use the same aspect ratio on all slides so heights stay consistent; the first slide's image is the LCP candidate when the carousel opens the page. • **Icons.** Controls use `icons/chevron-left.svg`, `chevron-right.svg`, `pause.svg`, `play.svg`. • **Tags and metadata.** None. |
| Header | **Labels.** Short (1–3 words); a label is also the title of its level. • **Links.** Section labels may link to the section's landing page; menu links are plain rows with an arrow. • **Logos.** One asset per logo for all breakpoints, transparent SVG (`/content/dam/tcs-corp/header/tcs-logo.svg`, `tata-logo.svg`, F-77). The CSS sets the height and the width follows the aspect ratio, except the TCS logo has a fixed 9.125rem (146px) desktop width: • **Alt text.** "Tata Consultancy Services" and "TATA Group" (or the locale's translation): they name the links. |
| Hero | **Titles.** One message; use H1 only for the page's main Hero. • **Descriptions.** One or two sentences; the description is limited to 53.125rem wide, the title to 72.5rem. • **Eyebrows.** A short topic label; shown only with a title. • **CTAs and links.** Action-oriented labels that make sense out of context; use Down arrows only for in-page anchors (`#anchor-...`). No verified technical limit on the number of CTAs was identified; the row wraps. |
| Image Collage | Use nine images of similar weight; the positions are fixed per slot (`image-collage-item-1` to `-9`). • Keep the title short (one or two lines) and the description to two or three lines. • Use short CTA labels; buttons keep their Figma width as a minimum and grow for longer labels. • The images are decorative; don't put text or information in them. |
| Interactive Dashboard | — |
| List | **Titles:** the page's `card-title` (else its title) or a List Item Title; short enough for the card width. The list Title names the region. • **Descriptions:** plain text (`card-description`, else the page description, or a List Item Description); rich text is not supported (use Cards). • **Eyebrows and labels:** `eyebrow`, else `category`; Label only on statistic cards. • **CTAs and links:** the header CTA, or a List Item's Call to action label (the card's one link). Links may be pages, paths or `https://` URLs; `javascript:` and `data:` links are skipped. Page links go to their redirect target. |
| Media Contacts | **Title:** short ("TCS media contacts", "Press contacts"). • **Sheet:** one row per e-mail address or phone number; write phone numbers as they should read (+65 9270 4560); the link keeps only the digits and a leading +. • **Personal data:** the sheet is published as JSON (`/{locale}/data/media-contacts.json`); list business contact details that may be public only. • **Icons:** `icons/mail.svg` and `icons/phone.svg`, coloured by CSS (brand blue). |
| Modal | **Headings.** Start every modal page with a heading (it names the dialog). • **Button Text.** A verb and an object ("View our awards", "Read the programme terms"); avoid "Open" and "Click here". • **Content length.** Short and single-purpose; long content scrolls but belongs on a page. • **Images.** The content area is at most 56.25rem minus its padding; images as their blocks define. |
| Page Header | **Titles and descriptions.** Edited in the page properties, not in the block; keep them consistent with `meta-title` / `meta-description` (the block reads the page Title and Description as delivered, before the SEO decorator applies those columns). • **Eyebrows.** The content-type (one or two words), else the tags. • **CTAs and links.** Start with a verb; one Primary Button. No verified technical limit on the number of CTAs was identified. • **Images and alt text.** `featured-image` (Landing only) with `image-alt`; no aspect ratio is enforced (full column width, height automatic). Use DAM images delivered as site media so they load eagerly. Author photos are shown as a 2.5rem circle (`object-fit: cover`) and are decorative. |
| Quote | **Eyebrow:** a few words of context (for example "Client voice"). **Title:** a short, descriptive heading. • **Quote:** the approved statement only, without quotation marks. **Quote Author:** the name on the first line, then the designation and organisation. • **Links / CTAs:** the block has no CTA field. A link in the rich text is rendered by the page's content decorators: a standalone link in its own paragraph becomes a button (`decorators/content-buttons-decorator.js`). • **Images and alt text:** use portrait images. They are cropped with `object-fit: cover` to 4:5 below 900px and to 622:869 from 900px. Alt text identifies the person; leave it empty only if the image adds nothing. |
| Separator | **Titles, descriptions, eyebrows, CTAs, links, images, icons.** Not applicable: the separator renders no text, links or images on the published page. • **Labels.** Accessible label and Analytics label are cut to 120 characters (handover recommendation: about 60 and 40); keep the Analytics label and Component ID identical across locales, translate the Accessible label. • **Tags and metadata.** None. • **Min / max items.** No verified technical limit was identified. |
| Tab | **Title:** short and descriptive (the handover recommends 1 to 3 words, about 25 characters); avoid "Tab 1" style labels; translate per locale. • **ID:** lower-case letters, digits and hyphens (validated `^#?[a-z0-9][a-z0-9-]*$`); unique on the page. • **Content:** start the tab's content with a heading that repeats or extends the Title. • **Images, icons, CTAs, tags:** none on the Tab itself (they belong to the components after it). |
| Table | **Headers:** short (units in the header); never leave header cells empty. • **Cells:** short values; descriptive link text inside sentences (a link alone in a cell paragraph • **Images, icons, tags, metadata:** not part of the design; the block reads no tags or metadata. • **Min / max items:** 1 to 9 columns (the Row models); no verified technical limit on the number |
| Table List | **Heading:** up to about 50 characters (recommendation from the handover, not enforced). • **Item titles:** Variation 1 up to about 40 characters, Variation 2 about 25, Variation 3 about 15 (very large type), Variation 4 about 45 (e.g. "Communication, Media & Information Services"); plain text (formatting is dropped). Expect longer titles in other languages. • **Descriptions:** about 120 characters (Variation 3: 160); one sentence that makes sense without the title. • **CTAs and links:** a specific call to action ("View all industries"); short verbs for item buttons ("Explore", "Discover"); link to canonical published pages with the page picker. Only `/`, `#` and `http(s)` links are supported. |
| Tabs | **Tab titles:** short (the handover recommends 1 to 3 words); tabs that don't fit scroll horizontally (`white-space: nowrap` in horizontal lists). Translated labels may be longer: consider Vertical. • **Label:** a few words naming the group. • **IDs:** lower-case letters, digits and hyphens (the model validates `^#?[a-z0-9][a-z0-9-]*$`); keep them identical across locales for links. • **Panel content:** a heading that matches the tab, then the content; keep panels of similar length so the page doesn't jump between tabs. Each component follows its own guidelines (images, alt text, buttons, CTAs). |
| TCS Header | **Logos.** One asset per logo for every breakpoint (Figma uses the same vector at every size); upload SVGs to `/content/dam/tcs-corp/header/` (`tcs-logo.svg`, `tata-logo.svg`, F-77). The width follows the aspect ratio, except the TCS logo has a fixed 9.125rem (146px) desktop width: • **Alt text.** The organisation's name ("Tata Consultancy Services", "TATA Group"), translated per locale. • **Links.** The locale Home for TCS; the full `https://` address for external links. • **Icons, tags, metadata.** None. |
| Teaser | **Titles:** short; Title Type is both the level and the size. **Descriptions:** the main text; Short Description for footnotes and sources after the links. • **Eyebrows:** a few words; Eyebrow style Label for content types. **Labels:** Date label (for example Published) and Reading time (minutes as a number). • **CTAs and links:** descriptive link text; new window only when needed. A CTA or Link item without a link isn't shown. • **Images and alt text:** Default 10:9 (16:9 above / below the text), 8:9, 1:1 or Original, cropped with `object-fit: cover` except Original and the Text split default. Behind the text, the image covers the block. Write alt text for informative images; leave it empty for decorative ones. |
| Testimonial | **Title:** short. **Eyebrow:** a few words. **Description:** the approved quote (the block adds no quotation marks of its own). • **Author:** the name only. **Designation & Location:** role, organisation and city on one or two lines. • **Stats:** Stats Value a single line (for example 40%); Stats Title a short label. No verified technical limit on the number of stats was identified; the columns wrap automatically. • **CTAs / links:** no CTA field. A standalone link in the rich text becomes a button (`decorators/content-buttons-decorator.js`). |
| Video | **Title:** short and specific (it is read before every Play: "Play video: {title}"). • **Caption:** short rich text; key information also belongs in the page text. • **Transcript link:** a page or document; give the link a readable text or let the block name it. • **Poster image and alt text:** in the Aspect Ratio of the video (it is cropped with |

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
