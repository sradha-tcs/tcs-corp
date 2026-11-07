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
| Anonymous poll | Left out | Its question and options as text (no live results: there is no form back end) |
| Author bio container | Authors sheet row only | Authors sheet row and the bio on the page |
| Quarterly reports landing / overview (investors) | Logged | The quarters as tabs (text and tables), else as text |
| Article tags with related insights | Tags only | Tags, and the related insights as a **List** ("Related insights") |
| A component with images only | Left out | Its images as Image components |

**Remarks (content team).** The curated design page of each archetype has sections the live page may not have (e.g. a testimonial or teaser that the design shows but tcs.com has no content for). These are not invented: `batch-results.csv` has a **Remarks** column per row, `design sections without source content (content team): <blocks> (archetype <Axx>)`, and `BATCH-REPORT.md` a "Remarks for the content team" table. Layout helpers (column breaks, tabs, the page header / hero, buttons, anchor lists, the canvas and the Filter List added by code) aren't listed.

**Throughput.** The pipeline runs four build loops in parallel (each takes every fourth batch) beside the crawl loop; the image and video downloads are prefetched in parallel threads; the first build pass is light (no image dimensions) so each step stays short and resumes after a restart.
