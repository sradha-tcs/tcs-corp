# Migration report: TCS BaNCS for Treasury marks its entry into Sri Lanka with Indian Bank

| | |
|---|---|
| Source | https://www.tcs.com/who-we-are/newsroom/press-release/tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank |
| Destination | `/content/tcs-corp/language-master/en/curated-design-pages/forms/tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank` |
| Published path | `/language-master/en/curated-design-pages/forms/tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank` |
| Template | Press Release (`page-type` = `press-release`, `templates/press-release`) |
| Blocks used | Page Header, default Image / Title / Text, Media Contacts, List (+ 4 List Items), Teaser. Media Contacts is a new block, added on your request (1.0.1; code PR: the Media Contacts block) |
| Package | `tcs-corp-press-release-tcs-bancs-treasury-content-1.0.1.zip` (47 entries, 166,941 bytes; 1.0.0 without the Media Contacts block) |
| Sheet rows | `metadata-language-master-row.csv` (bulk metadata), `data-media-contacts.csv` (optional, see O-2) |
| Date | 22 October 2026 |

Header and footer are excluded as requested. The page inherits Navigation and Footer from its parent pages, like the other language-master pages.

## 1. Page properties

| Property | Value | Source |
|---|---|---|
| Page name (slug) | `tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank` | Same as the source URL |
| Title (`jcr:title`) | TCS BaNCS for Treasury marks its entry into Sri Lanka with Indian Bank | Source `<title>` / H1 |
| Navigation title (`navTitle`) | Same as the title | Source H1 (see D-7) |
| Description | The integrated treasury platform will help Indian Bank’s Colombo branch strengthen real-time risk visibility, improve straight-through processing, and build a scalable foundation for future growth | Source meta description |
| Keywords | tcs bancs for treasury, indian bank, sri lanka, treasury, banking, press release | Derived (the source has no meta keywords) |
| Page Type | press-release | Template |
| Tags | `content-type/press-release`, `industry/banking`, `topic/core-modernisation`, `region/asia-pacific` | Source tag "Press Releases" plus taxonomy tags inferred from the content; all four exist in the tcs-corp namespace |
| Navigation / Footer / 404 Page | Not set (inherited) | Language-master standard |

## 2. Metadata (bulk metadata sheet row)

| Column | Value |
|---|---|
| meta-title | TCS BaNCS for Treasury marks its entry into Sri Lanka with Indian Bank \| TCS |
| meta-description, og-description, twitter-description | The page description |
| meta-keywords | As the Keywords |
| og-title, twitter-title | The title |
| og-type / twitter-card | article / summary_large_image |
| og-image, twitter-image | Empty: a DAM path in a sheet isn't rewritten, so og:image is the page's first image (the migrated hero) |
| publish-date / modified-date | 2026-10-19 (source dateline "October 19, 2026") |
| reading-time | 3 (estimate: about 700 words of copy) |
| content-type / eyebrow | Press Release |
| region / language | Global / en |
| persona | Media, investors and analysts (the press-release value used on the other pages) |
| robots | noindex, nofollow (as on all language-master pages, until the rollout) |
| canonical-url | Empty (see O-5) |

## 3. Section-to-block mapping

| # | Source section | Target block | Migration status | Deviations |
|---|---|---|---|---|
| 1 | Breadcrumb "Newsroom / Press Release" | Not migrated | Excluded | The site has no breadcrumb block. The Page Header shows the content type "Press Release" instead |
| 2 | Banner: H1 title + hero image | **Page Header** (Layout Default, which is Article for press-release pages). H1, content type, tags, published date, reading time, download / share come from metadata | Migrated | Authored in a fixed-width section, like the other curated pages (D-1). The image is a default Image at the top of the body (D-2) |
| 3 | Hero image (Scene7 `indian-focused-articles-banks-web`) | **Image** (default content), DAM `/content/dam/tcs-corp/curated-design-pages/forms/indian-focused-articles-banks.jpg` | Migrated | Cropped to 16:9 (1640 × 923) for the full-width body. New alt text: the source alt describes a different release (D-3) |
| 4 | Italic subtitle | Page Header description (page Description) | Migrated | Shown by the Page Header, not repeated in the body |
| 5 | "PRESS RELEASE" label | Page Header content type | Migrated | Shown by the Page Header, not repeated in the body |
| 6 | Dateline and body: 7 paragraphs, including 2 leadership quotes (bold speaker, italic quote) | **Text** (default content, rich text) | Migrated verbatim | Quotes kept inline as on the source, not as a Quote block (D-4). Source wording kept ("decision-marking"; "marks a new milestone platform-led transformation", O-3) |
| 7 | "ABOUT TATA CONSULTANCY SERVICES (TCS)" boilerplate, www.tcs.com link, Follow TCS on LinkedIn / Instagram / YouTube / X | **Title** (H2) + **Text** | Migrated verbatim | None. All 6 links kept |
| 8 | "TCS media contacts": 9 regions, 12 e-mail addresses, 8 phone numbers | **Media Contacts** block (Title "TCS media contacts", H2), after the About section; contacts from the Media Contacts sheet (`data-media-contacts.csv`) | Migrated | Grouped by designation and region as on the source: Corporate Communications & India with its 3 e-mail addresses one below the other, then one group per region; two columns from 900px. The source's "Opens in new tab" on one mailto: link isn't kept (O-2) |
| 9 | "In the News": carousel of 4 press releases | **List**: Fixed list, 4 List Items to the matching language-master supporting pages; image cards without images (content type, date, title); grid of 4 on desktop, horizontal scroll on tablet and mobile | Migrated | The cards link to the supporting pages, not to tcs.com. Their dates and the Q2 card's content type ("News") come from those pages (D-6) |
| 10 | "With you for the long run" + "Connect with us" | **Teaser** (no image, grey, centred, Primary CTA) to the language master's contact page (`dummy-pages/contact`) | Migrated | The CTA opens the contact page, not a form overlay |
| 11 | Header, footer, cookie banner | Not migrated | Excluded | As requested |

Content order is the source's (sections 2 to 10).

## 4. Assets

| Asset | DAM path | Size | Alt text | Caption |
|---|---|---|---|---|
| Hero image | `/content/dam/tcs-corp/curated-design-pages/forms/indian-focused-articles-banks.jpg` | 1640 × 923 JPEG, 149 KB, progressive, metadata stripped | "Two bank colleagues smiling as they look over their work together" (also `dc:description`); `dc:title` "TCS BaNCS for Treasury with Indian Bank"; tags press-release, banking | None on the source |

The source OG image (`indian-focused-articles-banks-card.jpg` on tcs.com) returned 403 to download. og:image is the page's first image (the hero), as on the other pages. The source has no downloads, PDFs, videos or tables.

## 5. Deviations

- **D-1:** The Page Header is authored (Layout Default) in a fixed-width section. The one the press-release template inserts sits in a section with no side gutter, so its text touches the screen edge. The block-library press-release template page on aem.page shows this too (O-1).
- **D-2:** The source shows the image next to the title. The Article Page Header has no image, and the Landing layout's featured image would need a DAM path in the sheet, which isn't delivered. So the image opens the body.
- **D-3:** The source alt text ("TCS to Modernize Enento Group’s IT Infrastructure, Digital Workplace") belongs to another release. It was replaced with a description of the image.
- **D-4:** The quotes stay in the body text, formatted as on the source. A Quote block would pull them out of the release's flow. Authors can switch to a Quote block if wanted.
- **D-5:** Resolved in 1.0.1: the media contacts are the Media Contacts block, in the source's position (before "In the News"). The press-release template no longer appends them.
- **D-6:** "In the News" links to the language master's supporting pages for the same releases. Their dates are the supporting pages' (15 Oct, 15 Oct, 9 Oct, 15 Oct), not the source's (15, 14, 8, 1 Oct). The Q2 results page is typed "News". Fix the dates and type on those pages, or point the List Items to the real pages once they're migrated.
- **D-7:** The page model has no Navigation title field. `navTitle` is stored on the page (it shows in the AEM Sites page properties) but isn't editable in Universal Editor.
- **D-8:** The Page Header shows "Press Release" twice: as the content-type tag and as the content type. This is how press-release pages already render. Remove the `content-type/press-release` tag only if the page shouldn't appear in press-release tag lists.

## 6. Validation report

Checked on the local preview (language master mapped to /en, the AEM delivery rules reproduced by the project renderer) at 1440, 768 and 375 px. Universal Editor and aem.page aren't checked yet: the package isn't installed.

### Responsive

| Check | Desktop 1440 | Tablet 768 | Mobile 375 |
|---|---|---|---|
| Horizontal scroll | None | None | None |
| Content left edge (Page Header, body, List, Teaser) | 80 px, all aligned | 40 px | 24 px |
| H1 size | 64 px | 40 px | 40 px |
| Hero image | 1280 × 720 | 688 × 387 | 327 × 184 |
| In the News | Grid of 4 (302 px cards) | Horizontal scroll (261 px) | Horizontal scroll (270 px) with indicator |

### Accessibility (WCAG 2.1 AA, automated checks plus keyboard)

| Check | Result |
|---|---|
| H1 | 1 (the title) |
| Heading order in main | H1, H2 About, H2 TCS media contacts, H3 × 10 contact groups, H2 In the News, H3 × 4 cards, H2 With you for the long run. No skipped levels (1.0.1) |
| Images without alt | 0 |
| Links / buttons without an accessible name | 0 / 0 (15 links in main) |
| Text contrast (sampled) | 5.36:1 (links in body text) to 19.55:1 |
| Keyboard | Tab order follows the reading order (header, Download, Share, body links, ...). Focus outline visible |
| Console errors | None |
| `<html lang>` | en |
| Not covered | Screen-reader test with NVDA / VoiceOver; external links have no "opens in a new tab" because they open in the same tab, as on the source |

### SEO

| Check | Result |
|---|---|
| `<title>` | "TCS BaNCS for Treasury marks its entry into Sri Lanka with Indian Bank \| TCS" |
| Meta description, keywords, OG, Twitter | Present (from the page properties and the metadata row) |
| og:image | The hero image |
| robots | noindex, nofollow (language master, by design) |
| Canonical | None in the local preview. Check on aem.page after installing (O-5) |
| Internal links | 5: 4 related releases and the contact page, all to existing language-master pages |
| External links | 6: tcs.com × 2, LinkedIn, Instagram, YouTube, X. The dateline link goes to an unrelated AWS release, as on the source (O-4) |

### Analytics and data layer

| Check | Result |
|---|---|
| Page entry | `xdm:template` press-release, `xdm:language` en, the 4 tags, `dc:title` |
| Components | page-header-1, media-contacts-1, list-1 with 4 list items (`xdm:listSource` fixed), teaser-1. Contact clicks: `cmp:click` with `interaction` email / phone and the group as `value`, without the address (1.0.1) |
| Personal data | None in the data layer |
| Not configured | Adobe Tags, Web SDK, Analytics, Target. The data layer is ready for them (project status, unchanged) |

### Authoring (Universal Editor)

| Check | Result |
|---|---|
| Model warnings while rendering | 0 (every field is in the block models) |
| Package XML | 18 files parse; the page's components carry their model ids and `modelFields`. The List's 4 links are List Item children (editable with Add / Remove) |
| Section fields | Width Type fixed width on all 5 sections |
| Not verified | Editing in Universal Editor: Blocked until the package is installed (no author access from here) |

## 7. Open issues

- **O-1:** The press-release (and article / blog) template inserts its Page Header and Media contacts in a full-width section with no side gutter. Recommendation: give the inserted sections the fixed-width class in `decorators/template-decorator.js`. That's a code change and needs its own PR.
- **O-2:** Approved on 22 October 2026: the source's 12 media contacts go into the language master's Media Contacts sheet, which the Media Contacts block reads. `data-media-contacts.csv` has them (designation / region / e-mail / phone, no names; public business contacts). The sheet is empty today, so the file can be imported as the whole sheet. Every page with a Media Contacts block in the language master lists them (this page's region is Global, so all are shown). The addresses are published in `/language-master/en/data/media-contacts.json`; the data layer records clicks on them as email / phone without the address.
- **O-3:** The source copy has errors ("decision-marking"; "marks a new milestone platform-led transformation"). They were kept verbatim. Correct them only with Corporate Communications' approval.
- **O-4:** On the source, the "Tata Consultancy Services" link in the dateline goes to an unrelated 2023 AWS press release. It was kept as on the source. Recommendation: link to the TCS home page or remove the link.
- **O-5:** Canonical, rendering and the metadata row are checked only in the local preview. After installing: check on aem.page, add the metadata row to the language master's metadata sheet, then publish and reindex.

## 8. Installation steps (once approved)

1. Deploy the Media Contacts block code (merge its PR) so the block is offered and renders. Then install `tcs-corp-press-release-tcs-bancs-treasury-content-1.0.1.zip` in AEM (Package Manager). It changes only the new page, its image and (merged) 4 existing tags. It creates the `forms` parent page only if it doesn't exist.
2. Add the row of `metadata-language-master-row.csv` to the language master's metadata sheet.
3. Import `data-media-contacts.csv` into the language master's Media Contacts sheet (`/content/tcs-corp/language-master/en/data/media-contacts`; empty today, O-2).
4. Publish the page (and the sheets) and reindex. Check on aem.page.
