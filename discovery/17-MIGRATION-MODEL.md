# Migration model (round 2, version 1.2.0)

| | |
|---|---|
| Date | 7 November 2026 |
| Scope | All 8,447 workbook rows: 8,446 migrated in 60 batches, 1 skipped with reason (the empty row 8448) |
| Supersedes | The batch packages 1.0.0 (pilot and B001–B009) and 1.1.0 (B001–B022 delivered before): every batch is rebuilt as 1.2.0 (section 7); install 1.2.0 only |
| Decisions | EMA-D01 … EMA-D10 (`knowledge-base/decisions.json`, `discovery/14-decision-log.csv`) |

## 1. Decisions of this round

| ID | Decision |
|---|---|
| EMA-D05 | Row 2 (`https://www.tcs.com`) is the language master's Home page: `/content/tcs-corp/language-master/en` |
| EMA-D06 | Every row held back before is migrated: author profiles (601) with the Collection composition (Page Header, the author's text, a List of the author's content, an Authors sheet row); careers landing pages (48) with the Who We Are landing composition (Hero); careers articles, contact / form pages and corporate pages (548) with the Story composition |
| EMA-D07 | Page names with `&` (not allowed in AEM page names) get `-and-`: `…clinical-and-r&d-…` → `…clinical-and-r-and-d-…`, `s&op-reality-check` → `s-and-op-reality-check`; the source URLs redirect to them |
| EMA-D08 | A Hero's background video: the Hero shows the video's poster (the Hero has no video background); the video file goes to the DAM and a Video block after the Hero plays it |
| EMA-D09 | The empty last row (8448) is SKIPPED_WITH_REASON |
| EMA-D10 | Every batch is rebuilt (1.1.0) with the component model v2; the delivered 1.0.0 packages are superseded (install 1.1.0 only) |

## 2. Source analysis: component model v2

Every page is crawled again in a browser, scrolled to the end so lazy content loads (`extract-components2.js`). Per page: title, description, og:image, schema.org `datePublished`, keywords, the source tags. Per component: clean HTML, images (lazy and picture sources), links, card items (link, title, type / date line, summary, thumbnail from the image or the CSS background), background images, audio files, Scene7 video names (from the player's poster), tabs.

## 3. Mapping changes (partially migrated pages made complete)

| Source | Before (1.0.0) | Now (1.1.0) |
|---|---|---|
| Video streamed by the source player (Scene7) | Not migrated (blob URL), logged | The MP4 (best quality below 85 MB) in the DAM `videos/<section>/`, a **Video** block with its poster |
| Hero background video | Not migrated | Hero with the poster; Video block after it (EMA-D08) |
| Podcast (audio) | Text only, audio logged | Text and a **Listen** button to the MP3 in the DAM `audio/<section>/` |
| Related content (related reading, recommended, featured, latest, author's articles) | List of the linked pages that exist (title only) | **List** of every card with its title, type (eyebrow), summary and **thumbnail**; links to the migrated page, else to tcs.com |
| Horizontal accordion (events) | Text | **Cards** (title, date / place, text, image, link); Accordion when the source has panels |
| Timeline | Text | **Cards** of the milestones (year, title, text, image) |
| Image component | Text (image not captured) | **Image** with its caption |
| Cards (solution, story, feature, insight …) | Cards (images when inline) | Cards with the thumbnails of the card items too |
| Page image | None | The page's og:image as its AEM page image (Lists, Filter Lists and related cards show it) |
| Contact modules, sign-up, survey | Text (gap) | The form's text and a button to the tcs.com form (no form back end, W7-D6) |
| Authors | Not migrated | Authors sheet row (name, designation, bio, image) and the pages' `author-id` |

## 4. Assets and folders (DAM)

| Asset | DAM folder | Package |
|---|---|---|
| Images (inline, cards, heroes, page images) | `/content/dam/tcs-corp/images/<L1>/<L2>/` | the batch's asset package(s) |
| Videos (Scene7 MP4) | `/content/dam/tcs-corp/videos/<L1>/<L2>/` | asset package(s) |
| Audio (podcasts) | `/content/dam/tcs-corp/audio/<L1>/<L2>/` | asset package(s) |
| Documents (PDF, Office) | `/content/dam/tcs-corp/documents/<L1>/<L2>/` | asset package(s) |

Asset packages are at most 85 MB each (GitHub accepts files up to 100 MB); a video is at most 85 MB (the best Scene7 quality below it).

`<L1>/<L2>` are the page's first two workbook levels (e.g. `who-we-are/newsroom`, `what-we-do/industries`). An asset already migrated (same content hash) is reused, not copied again. Each asset has its own package filter. Videos, audio and documents are served only once published in AEM (images travel with the pages).

## 5. Taxonomy

The pages are tagged with the language master's existing taxonomy (`tcs-corp:` roots topic, industry, service, product, region, content-type, career, investor, capability, technology, esg): a source tag (the page's `tags` meta and its Tags component) is applied when its title matches a taxonomy tag (normalised: case, ™ / ®, `&` / and, plurals; a few aliases, e.g. White Paper → Whitepaper, Cyber Security → Cybersecurity, CSR → Corporate Social Responsibility); the page's content type (Press Release, Blog, News, Case Study, Event, Whitepaper, Research …) gives its `content-type` tag. No tag is created: source tags without a match are listed per batch (`taxonomy-unmapped-<batch>.csv`) for review. Assets carry the tags of their page.

## 6. Packages and installation

Per batch: `tcs-corp-ema-<batch>-assets-NN-1.2.0.zip` (images, videos, audio, documents) and `tcs-corp-ema-<batch>-1.2.0.zip` (the pages). Install the asset packages first, then the page package. Each page's filter covers the page node and its content only, so installing never removes child pages; each asset has its own filter. The consolidated folder holds every package in installation order (`packages/INSTALL-ORDER.md`) with the consolidated sheets.

## 7. Version 1.2.0: no live content left behind

| Source | 1.1.0 | 1.2.0 |
|---|---|---|
| Press releases | No Media Contacts block (2,300 pages partially migrated) | A **Media Contacts** block at the end of every press release (title "TCS media contacts"; the contacts come from the Media Contacts sheet) |
| Page-specific menus, in-page links, sub navigation, link banners, "follow us" / social links | Left out | A menu: its links as a list (headings kept). A component with its own text (e.g. "Segments we serve" with its panels): all its text, headings and links. The global header and footer stay out (prompt section 33) |
| Image-only link cards (recognitions, logos, social posts) | Empty links in the text (accessibility problem) | **Cards** with the image and the link, titled with the linked page's title (from the crawl), else the image's alt, else "View on <site>" |
| Slider controls (previous / next arrows, "01 / 04" counters, "close") | Kept as empty links and text | Dropped (controls, not content) |
| Reading time ("10 MINS READ") of articles | Left in the text | Metadata `reading-time` (the Page Header shows it) |
| Share links and the author lines of an article's hero | Left in the text | Dropped (the Page Header has share; the author comes from `author-id` and the Authors sheet) |
| Article quote | Text | **Quote** block (quote, person, role) |
| Illustration cards (features) | Text | **Cards**, one per feature heading |
| Image gallery ("binge" gallery without cards or videos) | Its heading only (images left out) | Its heading and every image (**Image** components, in order); slides that load their image only when shown are stepped through in a browser (`gallery-images.mjs`) |
| Interrupted image downloads (empty files) | Build error | Downloaded again |
| GIF images (study figures, charts) | Not downloaded | Migrated as GIFs to the DAM `images/<section>/` |
| Live page without a publish date | Partially migrated ("no publish date") | Migrated; Remarks: "no publish date on the live page (content team: add the publish date)" |

| Expert quote (name, role, quote) | Text | **Quote** block (the quote; the person and role as its author) |
| "What's next" story card | Text | **List** with the card (title, image, link) |
| Icon text, page version info (legal pages) | Text, flagged for review | Text (the icons are decorative) |
| Newsletter sign-up (perspective sign-up) | Text, flagged for review | As the other forms: its text and a button to the tcs.com form |
| Social share bar | Text | Dropped (the Page Header's share action) |
| Table wider than 9 columns with at most 9 rows (e.g. dividend per share, a column per year) | Kept in the text (needs authoring) | **Table** block, transposed (a row per column of the source) |
| SVG images behind extensionless image URLs | Build error | Migrated as SVG assets |
| Workbook rows whose live page doesn't exist (tcs.com answers 404 "Page Not Found") | FAILED, "not crawled" | FAILED, with the note "source page not found: tcs.com answers 404 … (content team: confirm the page is retired, or supply its content)" |

Images the live site itself no longer serves (404 on tcs.com) can't be migrated; they're listed per batch as "image not downloaded" (issues CSV). Each asset package is built in a fresh working folder and refused above 95 MB, so no package can reach GitHub's 100 MB limit.
| Anonymous poll | Left out | Its question and options as text (no live results: there is no form back end) |
| Author bio container | Authors sheet row only | Authors sheet row and the bio on the page |
| Quarterly reports landing / overview (investors) | Logged | The quarters as tabs (text and tables), else as text |
| Article tags with related insights | Tags only | Tags, and the related insights as a **List** ("Related insights") |
| A component with images only | Left out | Its images as Image components |

**Remarks (content team).** The curated design page of each archetype has sections the live page may not have (e.g. a testimonial or teaser that the design shows but tcs.com has no content for). These are not invented: `batch-results.csv` has a **Remarks** column per row, `design sections without source content (content team): <blocks> (archetype <Axx>)`, and `BATCH-REPORT.md` a "Remarks for the content team" table. Layout helpers (column breaks, tabs, the page header / hero, buttons, anchor lists, the canvas and the Filter List added by code) aren't listed.

**Throughput.** The pipeline runs four build loops in parallel (each takes the next batch no other loop is building, one lock per batch) beside the crawl loop; packages are pushed two at a time (at most 180 MB per push); the image and video downloads are prefetched in parallel threads; the first build pass is light (no image dimensions) so each step stays short and resumes after a restart.

## 8. Results (version 1.2.0, 7 November 2026)

| | Rows |
|---|---|
| Workbook rows | 8,447 |
| VALIDATED (migrated, every-page check without problems) | 8,432 |
| FAILED: the live page doesn't exist (tcs.com answers 404 "Page Not Found") | 14 |
| SKIPPED_WITH_REASON: the empty row 8448 (EMA-D09) | 1 |
| PARTIALLY_MIGRATED | 0 |

Remarks for the content team (`consolidated/reports/CONTENT-TEAM-REMARKS.csv`, per row; nothing is invented): the design sections of the page's archetype the live page has no content for (testimonial 7,758 rows, teaser 7,254, video 7,094, list 3,504, table list 1,412, cards 352, quote 12) and the live pages without a publish date (1,469).

Consolidated folder (`consolidated/`): 398 packages in installation order (`packages/INSTALL-ORDER.md`, 22 GB, each at most 95 MB); sheets: metadata (9,440 rows: the language master's published sheet with the migrated pages' rows), redirects (1,300; 652 added for the pages moved to their workbook path, EMA-D01), authors (1,437; 1,416 added), placeholders (as published: the migration adds no UI text), media contacts (as published), locations, partners and social links (published empty: the workbook pages carry no rows for them), source tags without a taxonomy match (758, for review; no tag is created); reports: `FINAL-RECONCILIATION.csv` (every workbook row with its final status, details and remarks), `CONTENT-TEAM-REMARKS.csv`, `FINAL-MIGRATION-SUMMARY.md`.

## 9. Version 1.3.0: language master below /content/tcs-corp/language-masters (8 November 2026)

| Item | 1.2.0 | 1.3.0 |
|---|---|---|
| Page packages (60) | Below `/content/tcs-corp/language-master` | Below `/content/tcs-corp/language-masters`: zip paths, filters (25,296 references) and every link in the content (22,722: links, rich text links, list roots, CTAs, table cells, list parent paths); the root gets a page definition ("Language Masters") outside the filters, created only where it doesn't exist. Every entry checked against 1.2.0: identical except the root |
| Asset packages (338) | DAM paths | Unchanged (1.2.0) |
| Assets of earlier runs | Only on authors with the October packages | `packages-earlier-run-assets/`: 13 packages, 1,342 assets (1,029 MB), merge filters, for fresh environments |
| EDAM content packages | Not built | Built from 1.3.0 as `1.3.0-edam` |

The reports (`batch-results.csv`, `FINAL-RECONCILIATION.csv`) keep the workbook's paths (below the old root): the new path is the
same with `language-masters`. The site's path mapping (site configuration and `paths.json`, `utils/site.js` `REVIEW_ROOTS`,
`helix-query.yaml`) refers to the old root and is changed in the site repository, outside these packages.
