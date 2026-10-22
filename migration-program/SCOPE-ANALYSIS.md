# Migration scope analysis: The As-is page (Lift and Shift), 3,191 URLs

| | |
|---|---|
| Date | 22 October 2026 |
| Input | `The As-is page (Lift and Shift).csv`: 3,191 rows of Source URLs and Target Path. The target path is the parent page; the page keeps its source name below it |
| Also used | The tcs.com sitemap (10,529 URLs, read 22 October 2026); 69 sampled source pages of this list (one to three per target group); the IA workbook (`IA Options for review (3.09.2026)`) and `MIGRATION-ANALYSIS.md` (the sitewide taxonomy and DAM strategy, which this scope follows) |
| Outputs | `scope-inventory.tsv` (each row with content type, section and lift-and-shift / re-homed); `batches.tsv` (each row's wave, batch, normalised destination and flags); `batches-summary.json` |

## 1. Migration inventory and classification

| Wave | Content | Rows | Target parent(s) | Source template (sample) | Last modified |
|---|---|---|---|---|---|
| Press releases | Press releases of the newsroom | 2,307 | `/who-we-are/newsroom/press-release` | TCS NewsRoom Migration Template | 2023: 973 · 2024: 605 · 2025: 421 · 2026: 302 |
| Other press releases | Press releases kept in their section (investor relations, CSR, services, industries, UK) | 20 | `/media-and-investor/press-release`, `/who-we-are/corporate-social-responsibility/press-release`, `/what-we-do/.../press-release`, `/who-we-are/worldwide/uk/newsroom/press-release` | TCS NewsRoom Migration Template, Article Migration Template | 2023–2026 |
| Newsroom | TCS in the news (325), analyst reports (104), news alerts (70), newsroom hubs and media kit | 505 | `/media-and-investor/newsroom/*` | TCS NewsRoom Template, TCS NewsRoom Migration Template, Industries - Services L1 (hubs) | 2024: 252 · 2025: 111 · 2026: 131 |
| Investor | Corporate actions (61), investor events (32), video overlays (10), management commentary, quarterly takeaways, ESG, glossary, dividends, FAQs | 132 | `/media-and-investor`, `/media-and-investor/investor/*`, `/media-and-investor/events` | Industries - Services L1, Case Study Migration Template, Video/Podcast, none (corporate actions) | 2023: 63 · 2024: 38 · 2025–26: 30 |
| Careers | Country career pages (48), testimonials (75), India (27), country articles (about 70) | 221 | `/careers`, `/careers/{country}`, `/careers/{country}/articles`, `/careers/testimonials` | Video/Podcast, Industries - Services L1, TCS What We Do Template, TCS Case Studies Template | 2026: 166 · 2025: 46 |
| Forms and special pages | Careers event registration forms | 6 | `/contact-us/whats-on-your-mind/careers` | Empty Template (embedded form) | 2025–26 |
| **Total** | | **3,191** | | | |

**Mapping:**
- 2,527 rows are **lift and shift**: the target keeps the source path below the language master.
- 664 rows are **re-homed**:
  - `who-we-are/newsroom/{tcs-in-the-news, analyst-reports, news-alert}` and the newsroom hub → `/media-and-investor/newsroom/...`;
  - `investor-relations/*` → `/media-and-investor/...`;
  - `careers/{chile,colombia}/Articles` → `.../articles`.

**Measured on the 69 sampled pages:**
- Press releases, news alerts and analyst reports: one image, 1–6 H2, 400–1,450 words, external links to the partners.
- Investor events: 7–12 PDFs each.
- Testimonials: no image, about 350 words.
- 6 of the sampled pages are listing hubs with no content of their own (about 200 words of page chrome, no H1): the corporate-action index, the careers Articles indexes, the newsroom section pages. They become pages with a **List** block (child pages), not copied text.
- H1 is not one per page on 17 of the 69 sampled pages (up to 8 on `careers/india/entry-level`).
- 28 of the 69 sampled pages have no meta description.

## 2. IA validation of the target paths

| # | Finding | Rows | Recommendation |
|---|---|---|---|
| T-01 | **Press releases stay under `/who-we-are/newsroom/press-release`** while the Newsroom moves to `/media-and-investor/newsroom` (IA Option 1: Media & Investors › Newsroom › Press release). The 2,307 releases end up outside the Newsroom in the hierarchy, and the `who-we-are/newsroom` page has no source (the source newsroom becomes `/media-and-investor/newsroom`) | 2,307 | Either keep them where they are (lift and shift, best for SEO: no redirect) and make `/who-we-are/newsroom` a redirect / hub to the Newsroom, **or** move them to `/media-and-investor/newsroom/press-release` (consistent IA, 2,307 redirects). This report keeps your target path; the decision changes only the target parent |
| T-02 | Press releases have **five homes**: the newsroom, `/media-and-investor/press-release` (investor relations), CSR, `what-we-do/.../press-release` (services, industries) and `who-we-are/worldwide/uk/newsroom` | 20 | Keep them as listed (lift and shift), tag them all `content-type/press-release` so the Newsroom's press release List shows them together |
| T-03 | **30 parent pages aren't in the list** (they're needed for the hierarchy). Examples: `/media-and-investor` (17 children), `/who-we-are/newsroom/press-release` (2,307), `/careers/testimonials` (75), `/media-and-investor/events` (32), `/media-and-investor/overlays` (10) | — | Created as hub pages (Title + List of child pages, Page Type `listing`). `what-we-do` already exists in AEM (What We Do package): its parents are created only when missing, never overwritten |
| T-04 | `https://www.tcs.com/careers/denmark` targets `/careers/colombia/articles` | 1 | Probably `/careers` (as the other countries). Kept out of the batches until confirmed |
| T-05 | **35 page names aren't valid as published names:** 25 with capitals (`Articles`, `Ivan-Zapata-story`, `convergence-private-5G-...`), 2 with `&` (`s&op-reality-check`, `...-r&d-...`), 8 with `_` | 35 | Lower case, `&` → `-and-`, `_` → `-` (column `destination_normalised`); a redirect row for each |
| T-06 | **8 URLs aren't in the tcs.com sitemap** (or have no date): e.g. `who-we-are/newsroom/analyst-reports`, `tcs-in-the-news`, `investor-relations/corporate-action`, `careers/peru/articles` (the listing hubs), and 2 pages with `&` | 8 | The hubs become List pages (T-03). The 2 `&` pages are checked during their wave |
| T-07 | `/media-and-investor/overlays` (10 video overlay pages of analyst day 2016) are modal sources, not navigable pages | 10 | Migrate as Modal source pages (`hide-in-nav`), linked from the events pages |
| T-08 | Two "who we are" trees in the language master: the existing `who-are-we` page (Who Are We package) and the new `who-we-are` tree of this list | — | Keep `who-we-are` (the tcs.com path); retire or redirect `who-are-we` in a later clean-up |

## 3. Taxonomy for this scope

The sitewide model in `MIGRATION-ANALYSIS.md` section 2 applies. For these waves:

| Content | Tags applied by rule | Metadata |
|---|---|---|
| Press releases | `content-type/press-release`; subject tags mapped from the source `tags` meta and the path (industry, service, product); `region/*` from the dateline / UK path | page-type `press-release`, content-type "Press Release", publish-date (dateline), persona "Media, investors and analysts", region |
| TCS in the news | `content-type/news`, `topic/media-coverage` | page-type `article` |
| Analyst reports | `content-type/analyst-report` (new), subject tags | page-type `article` |
| News alerts | `content-type/news-alert` (new) | page-type `article` |
| Investor | `investor/*` (new root: financial-results, corporate-action, investor-event, shareholder-services), `esg/*` | page-type `article` or `listing` |
| Careers | `career/*` (new root), `country/{region}/{country}` (new root) | page-type `article`; region by country |
| Forms | `content-type/event` | — |

Source tags that are author names (seen on blogs) aren't expected on these types; any found are reported, not tagged.

## 4. DAM for this scope

The sitewide DAM structure in `MIGRATION-ANALYSIS.md` section 3 applies:

| Assets | Folder |
|---|---|
| Press release and newsroom images | `/content/dam/tcs-corp/images/newsroom/{yyyy}` (the release year) |
| Investor PDFs (event presentations, results) | `/content/dam/tcs-corp/documents/investor-documents/{yyyy}` |
| Investor videos (overlays) | External players where the source uses YouTube; Scene7 videos to `/content/dam/tcs-corp/videos/events` |
| Careers images | `/content/dam/tcs-corp/images/careers/{country}` |
| Shared (logos, backgrounds) | `/content/dam/tcs-corp/images/shared` |

Each binary is stored once, with duplicates detected by a content hash. The source URL is recorded on every asset.

## 5. Batches

| Batch | Rows | Content | Risk | Exit criteria |
|---|---|---|---|---|
| **W1-B1 pilot** | **150** | The 150 most recent press releases (2026) | Low | 100 % automated checks pass; visual comparison of 15 pages; parser defects closed; package installs without touching other pages |
| W2 2026 | 152 | The rest of the 2026 press releases | Low | As W1 |
| W2 2025 | 421 | 2025 press releases | Low | As W1 |
| W2 2024 parts 1–2 | 303 + 302 | 2024 press releases | Low | As W1 |
| W2 2022–2023 parts 1–2 | 490 + 489 | 2022–2023 press releases | Low | As W1; archive releases checked for dead links |
| W3 | 20 | Other press releases (T-02) | Low | As W1 |
| W4 | 505 | Newsroom: in the news, analyst reports, news alerts, hubs, media kit | Low–Medium | Hubs as Lists; analyst report PDFs |
| W5 | 132 | Investor | Medium | PDFs identical to the source; overlays as Modals; investor relations sign-off |
| W6 | 221 | Careers | Medium | Country hubs reviewed; job links to the ATS work |
| W7 | 6 | Forms | High | Each form mapped to Form Variations with an endpoint, or an Embed of the source form |
| **Total** | **3,191** | | | |

**Per batch:**
1. Crawl the batch (throttled browser, about 2 s a page).
2. Extract the page model (title, metadata, sections, assets, links, tags).
3. Map it to blocks and build the page specs.
4. Download the assets (de-duplicated).
5. Build the package (only the batch's pages, assets and tags in its filter), the metadata sheet rows and the redirect rows.
6. Run the automated checks on 100 % of pages, and a visual comparison on 10 %.
7. Write the batch report: completed, failed and skipped pages, and issues.

## 6. Risks for this scope

| ID | Risk | Mitigation |
|---|---|---|
| S-01 | T-01: press releases outside the Newsroom hierarchy | Decide before W2 (W1 uses the target path as given) |
| S-02 | Source crawling through a browser only (Akamai); about 2 s a page, about 1.8 hours for 3,191 pages | Throttled, resumable crawl; an AEM content export would be faster |
| S-03 | Dynamic source content (related "In the News" carousels, listing hubs) isn't in the HTML as content | Rebuilt with Lists from the query index (tags) |
| S-04 | Redirects: 664 re-homed rows and 35 normalised names | Redirect rows per batch (per-locale `redirects.json`; a CDN mechanism is needed to apply them, handover 3.8) |
| S-05 | Investor content accuracy (PDF links, dates) | PDFs downloaded and stored unchanged; investor relations review |
| S-06 | Analytics (Tags, Web SDK, CJA, Target, AJO) not configured | Pages are data-layer ready; the integration is a separate, approved workstream |
| S-07 | Universal Editor not checked from here | Author check of the pilot pages before W2 |
