# TCS.com block library, curated design pages and delivery package — report

Package `tcs-corp-block-library-content-1.0.2.zip` · 17 October 2026

**Overall status: COMPLETE WITH LIMITATIONS.** Everything is built, authored and validated in a local preview at 1440, 1024 and 402px:

- The block library (every block and its supported variations).
- The 11 curated design pages.
- All supporting pages, assets and tags.
- The sheets and CSV exports.

What remains:

- **Not executed:** installing in AEM author (no author access), and a sample video file (no video encoder available).
- **Retrieval dependency:** the dynamic lists only return pages once language-master content is rolled out to a locale and published (as for the curated pages).

---

## Version history

- **1.0.2** (18 October 2026). New block library page **List: card style and colour from pages** (`block-library/list/card-style-from-pages`). It has three examples: child pages on Mixed (by page), the same pages forced to a dark panel, and List Items over the pages. Five example pages sit below it, with their `card-style` / `card-theme` in the metadata sheet (Report in navy, Statistic, Panel in grey, Image card in light blue, none). That makes 165 library pages, 300 pages in all. The metadata sheet CSVs have two new columns at the end, `card-style` and `card-theme`: a page's own Card style and Card colour on List cards (code PR #104), used when neither the List Item nor the List sets one. Install tcs-corp-block-library-content-1.0.2.zip over 1.0.1; each page in the package is replaced. Then import the metadata sheet CSV again. The previous versions are on the downloads branch, tagged `home-content-package_18-Oct-2026_0529`.
- **1.0.1** (17 October 2026). Repeating content is now stored as item children, the way authors add it with Add in Universal Editor (PR #90). These are: Hero and Page Header CTAs, Teaser links and stats, Testimonial stats, Anchor List links, Filter List tags, categories and listed / featured pages, Footer links, and the List pages (as List Items). In 1.0.0 these were composite multifield nodes, which AEM didn't render on the published pages: the lists were empty, and a Page Header with CTAs was missing. Install tcs-corp-block-library-content-1.0.1.zip over 1.0.0; each page is replaced. The placeholders sheet has one new key, `itemEditorHint` (the editor's placeholder for an item that has no content yet). It needs the code of PR #90 (merged).
- **1.0.0** (17 October 2026). First version.

---

## 1. What the package contains

| Content | AEM location | Count | Install behaviour |
|---|---|---|---|
| Block library | `/content/tcs-corp/language-master/en/block-library` | 159 pages: the root, 27 folders, 3 fragment folders, 118 demonstration pages and 10 source pages (fragments, tab contents, modal contents) | New tree (replace) |
| Curated design pages | `/content/tcs-corp/language-master/en/curated-design-pages` | The root and the 11 pages of the curated brief | New tree (replace) |
| Supporting pages | `/content/tcs-corp/language-master/en/dummy-pages` | 123: the 119 of the curated package, plus privacy notice, cookie policy, terms of use and accessibility | Each page's `jcr:content` is replaced; other pages are kept |
| DAM | `/content/dam/tcs-corp/block-library`, `/content/dam/tcs-corp/curated-design-pages` | 118 assets: 71 new (13 of them for the block library), 47 reused from the Home package (merged) | New folders replaced; reused assets merged |
| Tags | `/content/cq:tags/tcs-corp` | 81 tags: 33 new, 48 existing | Merged (existing tags are untouched) |

This package replaces the earlier curated-pages package (it contains it). Install only this one.

## 2. Block library structure

The root page lists every block folder and links to the curated design pages. Each block has:

- **A folder page:** what the block does, its components, and its demonstration pages as a list.
- **Demonstration pages:** each groups related variations. Every example is labelled with its variation (an H2 label above it), so authors can find it and inspect its values in the Universal Editor dialog.
- **Source pages** (where the block needs them): the fragments, tab contents and modal contents that other examples load.

| Folder | Demo pages | Labelled examples | Covers |
|---|---|---|---|
| Foundations | 9 | sections, text, title, image, button | Section views, variations (highlight, background image, rounded edge), widths, anchors. Text, Title (h1–h6), Image, Button (types, views, icons, alignment) |
| Templates | 6 | pages | Home, Article, Blog and Press release templates (Page Type), the 404 page and the careers 404 |
| Header | 4 | pages | Navigation pages with the TCS Header block (default and careers area) and pages that use them (Navigation property) |
| Footer | 7 | pages | Footer pages (default, campaign, investors), the footer Conversation Canvas, and pages using them (Footer property) |
| Hero | 4 | 31 | Overview, styles (backgrounds, alignment, text alignment), motion, CTAs |
| Teaser | 9 | 75 | Layouts, mobile image position, image options and colours, alignment, title sizes and weights, description and eyebrow, links and stats, article meta, CTA styles |
| Cards | 6 | 51 | Card styles (image, panel, report, statistic, mixed), colours, images and panels, grid and horizontal scroll, heights and links, per-card style and colour, empty message |
| List | 7 | 77 | Sources (fixed, child pages, tagged pages), cards, layout and scrolling, lists made before, empty state, Figma variations, card colours and List Item overrides, hidden when empty |
| Filter List | 6 | 27 | Listing, layouts and card styles, rules (sort, featured, hero), filters, content types |
| Table List | 5 | 15 | Industries, solutions and products variations; numbers, motion, item actions |
| Page Header | 16 | 14 | Landing, secondary, article, display, press release, CTAs, guest author, tablet widths, featured image, default by Page Type, tags and content type |
| Quote | 1 | 7 | Image positions, colours, author |
| Testimonial | 1 | 11 | Author, image, stats, colours, show/hide options |
| Columns | 2 | 7 | 2, 3 and 4 columns, images, multiple rows, mobile inset |
| Accordion | 1 | 3 | Items, open state |
| Anchor List | 2 | 2 | Default and sticky |
| Tabs | 7 | 7 + sections | Tabs section (styles, fixed width, deep link, tab item), Tabs block (with fragments; boxed, pills, centred, stretched, vertical) |
| Modal | 4 | 3 | Button modal, long content, auto-linked modal, modal with a form |
| Fragment | 1 | 1 | Fragment block with its source page |
| Gen Carousel | 5 | 13 | Manual and auto, auto, hero slides, teaser slides, single slide |
| Table | 1 | 12 | 1–5 columns, no header, first-column header, striped, bordered |
| Separator | 3 | 69 | Variants, themes, line style, thickness, colour, opacity, width and alignment, maximum width, decorations, contrast, responsive overrides, spacing, visibility per breakpoint, motion, print |
| Embed | 1 | 6 | YouTube, Vimeo, generic iframe, placeholder image |
| Video | 2 | 27 | Playback (click, autoplay, background), ratios, sizes, alignment, rounded corners, captions and transcript, reduced motion, pop-up |
| Form Variations | 2 | 16 | Every field type (text, email, tel, select, textarea, checkbox, contact card, submit), dark style, widths, conditional fields |
| Interactive Dashboard | 1 | 1 | The placeholder (the block renders nothing yet) |
| Conversation Canvas | 5 | 24 | Styles, titles, backgrounds, search buttons, voice icon, quick action views, floating and docked journey, footer canvas, quick actions as pills or buttons, dark background, text-link navigation |

In total: 502 labelled examples on 118 demonstration pages, plus the whole-page demos (templates, header, footer, foundations).

### Variation coverage

The examples come from the handover 2.0 screenshot specs: one authored example per documented variation, 593 sections. I checked them against today's `component-models.json` and brought them up to date:

- **Renamed fields:** List and Filter List `pages` and `featuredPages` became the `pageItems` and `featuredItems` page lists.
- **Table options:** these are now the Table's Options field.
- **Legacy markup:** the legacy Video and Cards demos became regular field values.

I then compared every select option of every model with the examples. Options without one got new coverage pages:

| Coverage page | Options it adds |
|---|---|
| Conversation Canvas: journey, actions and styles | No floating, decorative, pill and button quick actions, dark background, text-link navigation |
| Separator: option reference | Every line style, thickness, colour, opacity, width, maximum width, alignment, decoration, contrast, responsive width/thickness/alignment, spacing, visibility, motion, print |
| Tabs block: styles, alignment and orientation | Boxed, pills, centred, stretched, vertical |
| Table List: item actions | Diagonal arrow, button |
| Teaser: CTA styles | List-style CTAs, two primary buttons |
| Button: icons, views and alignment | Every icon, view and alignment |
| Cards: per-card styles and colours | Every card colour per card, per-card styles, secondary CTA, empty message |
| List: card colours, overrides and empty states | Light blue, mid grey, gradient, image; List Item style and colour overrides; hidden when empty |
| Filter List: content types | Content type filters |
| Form Variations: field types | Email and tel inputs, dark style |
| Header (4 pages) | The TCS Header block (it replaced the handover 2.0 header) |

### Content rules applied

- **Sample media:** the handover's placeholder SVGs ("Sample image N") were replaced by real sample photos (reused from DAM), new square, wide and tall crops, and neutral avatars.
- **Links:** sample links became supporting pages or curated pages. List and Filter List roots point at the supporting hubs that have child pages.
- **Invented figures and claims removed:**
  - Statistic examples keep their numbers (they show number typography) but are labelled "Sample statistic: replace with a verified figure and its source".
  - The revenue table became a sample data table (Metric A/B/C, "Sample value").
  - "More than 600,000" employees and "55 countries" became "To be confirmed".
  - "1 million learners" became "1m" and "50% women leaders" became "50%"; their labels are "Sample statistic".
  - "Clients in more than 50 countries" and the awards list were neutralised.
  - The chart lost its invented title.
- **Sample authors:** Anita Rao, Marcus Khan and Sara Lee are fictional sample authors from the handover specs, marked as such in the Authors sheet.

## 3. Assets

| Asset | DAM path | Status |
|---|---|---|
| 8 sample photos (16:9) | `/content/dam/tcs-corp/dummy-pages/images/*` | Reused (Home package) |
| 3 square, 1 wide, 1 tall crops | `/content/dam/tcs-corp/block-library/images/` | New |
| Avatar, chart | `…/block-library/images/*.svg` | New (neutral illustrations) |
| Lottie animation | `…/block-library/animations/lottie-sample.json` | New |
| Canvas chat and audio icons | `…/block-library/icons/` | New |
| TCS and TATA logos | `…/block-library/header/` | New (header demos) |
| Listen audio | `…/block-library/audio/listen-sample.wav` | New (2-second tone; a sample, not speech) |
| Video | `…/block-library/videos/sample-video.mp4` | **NOT EXECUTED** (see 7) |
| Curated pages assets | `/content/dam/tcs-corp/curated-design-pages/` | As in the curated package |

## 4. Tags, metadata, placeholders and data

| Item | Content |
|---|---|
| `tags.csv` | 81 tags: 33 new (the 29 of the curated package plus `region`, `region/europe`, `region/americas`, `region/asia-pacific`) and 48 existing. Includes the number of pages using each |
| `taxonomy.csv` | Tag and title rows for the taxonomy page |
| `metadata-language-master.csv`, `metadata-en-rollout.csv` | 294 rows (block library, curated and supporting pages) in the format of the AEM Metadata sheet: its 33 columns in its order, then `eyebrow`, `card-title` and `card-description` (the card text of Lists and Filter Lists: 133, 5 and 89 pages); CRLF line ends. Add those three columns to the sheet before pasting. Library pages are `noindex, nofollow`. Listen links are in `audio-file-path`; `featured-priority` repeats `priority` |
| `placeholders.csv` | All 95 UI text keys in the code, with the English text, where each is used and its variables |
| `data-authors.csv` | Priya Sethi and the three sample authors |
| `data-locations.csv`, `data-partners.csv`, `data-social-links.csv`, `data-media-contacts.csv` | The columns the code reads. Empty: the live sheets are empty too, and there's no verified content to add |
| `block-library-pages.csv` | Every library page: path, title, folder, kind, source spec, blocks used, number of examples |
| `block-library-variations.csv` | The 502 labelled examples: folder, block, example label, page, fields set, items |

## 5. Validation

| Check | Result |
|---|---|
| Spec fields against the models | 0 warnings (every field and option exists in today's models) |
| Desktop 1440px, 159 library pages | 724 blocks, all loaded. No JavaScript errors. No failed requests (except the sample video). No broken images |
| Tablet 1024px and mobile 402px, 159 pages each | No horizontal overflow, no broken images, no unloaded blocks, no JavaScript errors |
| Curated pages | As in the curated report (re-rendered with this build) |
| Package | 646 nodes, 2,876 references. Every page, asset and tag reference resolves, except the sample video. Zip integrity OK |

Expected states, as designed:

- List "empty state" and Cards "empty message" show their message.
- "Hidden when empty" hides itself.
- Primary Conversation Canvases move into the floating dock, so their place in the page is empty.
- Tab blocks have no height of their own (the Tabs section turns them into tabs).
- Separators with line style None or hidden on desktop show no line.
- Interactive Dashboard renders nothing.

Accessibility:

- Each demonstration page has an H1, except where the variation itself is an H1. Hero pages have one H1 per hero example, because Heading type H1 is the variation shown. Title h1–h6 and the source pages behave as authored.
- Images have alt text, or empty alt where decorative.

## 6. Retrieval

- **Where they work:** Lists (tagged, child pages), Filter Lists and the query index work once the content is rolled out from language-master to a locale (for example us/en at `/en`) and published, because the code lists the current locale's pages. I validated them on a local copy that simulates that rollout, with a matching index. Examples: the List sources page returns 72 cards; Filter List examples return their pages.
- **Fixed lists:** these also show their pages in the editor.
- **Page types:** the Filter List examples that filtered by Page types now filter by Content types. The supporting pages carry their kind in content-type; their Page Type stays empty, because the Article template would add a second header to them.

## 7. NOT EXECUTED

| Item | Reason | Action |
|---|---|---|
| Install in AEM author | No author access | Package Manager: upload and install the zip |
| Sample video `/content/dam/tcs-corp/block-library/videos/sample-video.mp4` | No video file exists and none can be encoded here | Upload an MP4 at that path. Until then the 27 Video examples show their poster images and can't play |
| Embed sample sources | The YouTube and Vimeo IDs and `partners.example.com` from the specs are placeholders | Replace with approved video and iframe URLs |
| Language-master metadata sheet | Sheets are authored in AEM | Create `/content/tcs-corp/language-master/en/metadata` from `metadata-language-master.csv`. After rollout, use the `metadata-en-rollout.csv` rows |
| Preview, publish, rollout | Not requested | — |
| Figma per-block analysis | The block library reuses the handover's design-system specs (built from the TCS DS Figma). The curated pages carry the page designs | — |

## 8. Recommended follow-ups

1. Install the package, open the block library in Universal Editor, and check a few examples' dialogs.
2. Upload the sample video, and replace the sample Embed URLs.
3. Replace sample statistics, sample authors and "To be confirmed" values only with verified content when pages are built from the library.
4. Smallest component changes still open (from the curated report): navy Teaser colour, dark Table List style, per-breakpoint Filter List pills, hide by breakpoint, a live Interactive Dashboard.

The curated design pages report (`curated-design-pages-REPORT.md`) is included, unchanged in content.
