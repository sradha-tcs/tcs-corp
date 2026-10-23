# Wave 1 (W1-B1 pilot) report: 150 press releases

| | |
|---|---|
| Date | 22 October 2026 |
| Batch | W1-B1 pilot: the 150 most recently modified press releases of `The As-is page (Lift and Shift).csv` (target parent `/content/tcs-corp/language-master/en/who-we-are/newsroom/press-release`). Sitemap `lastmod` is the last edit, so the batch spans releases from 2009 to 2026 |
| Package | `tcs-corp-migration-w1-press-releases-1.0.0.zip` (1,042 entries, 17.8 MB, 254 filter roots) |
| Status | Built and validated in the local preview. **Not installed, not published** |

## 1. Dashboard

| Measure | Result |
|---|---|
| Pages in the batch | 150 |
| Completed (migrated) | **150** |
| Failed | 0 |
| Skipped | 0 |
| Hub pages created | 1: `who-we-are/newsroom/press-release` (Press releases, a List of its child pages) |
| Parent pages (created only if missing) | 2: `who-we-are`, `who-we-are/newsroom` |
| Images | 95 in DAM (149 hero references, de-duplicated by content hash), 1,640 px, `/content/dam/tcs-corp/images/newsroom/{year}` |
| Tags | 8 (merged): `content-type/press-release`, `product/tcs-bancs`, `industry/manufacturing`, `esg/csr`, `region/europe`, `topic/research-innovation`, `service/ai`, `topic/alliances-partnerships` |
| Redirects | 0 (every page keeps its source path) |
| Model warnings | 0 |
| Issues logged | 588 (546 of them informational: links to tcs.com pages outside the scope); see section 6 |

## 2. Source → block mapping (every release)

| Source section | Target | Status | Notes |
|---|---|---|---|
| Title (H1) | Page Header (Article layout, from metadata) | Migrated | One H1 per page. The source had none on 30 pages and two on 2 |
| Subtitle and "PRESS RELEASE" label | Page Header description and content type | Migrated | Not repeated in the body (48 subtitles = description; 55 labels) |
| Hero image (Scene7) | Image (default content), top of the body | 106 migrated | 42 generic "default newsroom banner" images left out; 1 page without a hero; 1 image on TCS's UAT Scene7 account couldn't be downloaded |
| Release text (rich text) | Text (default content) | Migrated | Bold, italic, superscript (™), lists, links kept. Headings renumbered from H2, no skipped levels. 26 headings repeating the title dropped |
| Tables (≤ 5 columns) | Table block | 12 tables on 6 pages | Scroll inside the block on mobile |
| Tables (> 5 columns) | Kept in the text | 20 tables | Wide financial tables: see W1-I-08 |
| About Tata Consultancy Services | Title (H2) + Text | 139 pages | Bold-paragraph form of older releases converted to a heading; 11 releases have no TCS boilerplate |
| Media contacts (inline or section) | Media Contacts block (current contacts from the sheet) | 150 pages | The old contacts of 141 releases (59 inline, 82 section) aren't copied; the block lists the current 12 contacts |
| "In the News" carousel | List block (tag `content-type/press-release`, latest 4) | 150 pages | Filled from the query index |
| "With you for the long run" CTA | Teaser (Connect with us) | 150 pages | Links to the language master's contact page for now (W1-I-06) |

## 3. Metadata and SEO

| Check | Result |
|---|---|
| Title / navigation title | 150 / 150, from the source H1 / og:title |
| Meta description | 150 / 150 (7 generated from the first paragraph because the source had none: review) |
| OG and Twitter title / description, og-type article | 150 / 150 (metadata rows) |
| Publish date (from the dateline) | 150 / 150 |
| Reading time | 150 / 150 (words / 230) |
| Robots | `noindex, nofollow` (language master, as all its pages; the source is `index, follow`: set at the rollout to /en) |
| Canonical | Not set in the sheet: Edge Delivery gives each page its own URL. The source canonicals are the same paths |
| Internal links | 29 links to pages in the migration scope rewritten to their AEM paths; 541 links to tcs.com pages outside the scope kept (175 to the homepage, the rest mostly legacy service-line URLs such as `/technology-operations`, `/consulting-systems-integration`, `/about-us`) |
| Metadata rows | `deliverables/metadata-w1-rows.csv` / `.tsv`: 151 rows (150 releases and the hub) for the language master's Metadata sheet |

## 4. Validation (local preview, all 151 pages)

Widths: 51 pages at 375 px, 50 at 768 px, 50 at 1,440 px.

| Check | Result |
|---|---|
| Page loads (HTTP 200) | 151 / 151 |
| Exactly one H1 | 151 / 151 |
| Skipped heading levels | 0 pages |
| Images without alt | 0 (generic or wrong source alts set to decorative and logged) |
| Links without text | 0 (source defects repaired: nested links, a link wrapping only a line break) |
| Horizontal scroll | 2 pages (the wide tables of `tcs-financial-results-q1-fy-2027` and `-q4-fy-2025`), W1-I-08 |
| Minimum text contrast (sampled per page) | 5.36 : 1 |
| Console errors | 0 |
| Data layer | Page entry on 151 / 151 (`xdm:template` press-release); components page-header, media-contacts, list (and items), teaser, table |
| Media Contacts | 10 groups on every release |
| **Content fidelity** (15 pages, all 3 source templates, source text vs migrated page) | **100 %**: 619 / 619 sentences found (the removed contacts, label and duplicate subtitle excluded) |
| Universal Editor | Not checked (no author access): every component has its model; to check on install (W1-I-09) |

## 5. Assets

| | |
|---|---|
| Downloaded | 95 unique Scene7 masters at 1,640 px (JPEG, quality 85), 17 MB; 1 failed (W1-I-05) |
| In DAM | 95 (1 failed: `TCSCOMuat/if03`, a UAT asset referenced by the live page) |
| Metadata | `dc:title`, `dc:description` (the alt text), `dc:source` (the Scene7 URL), `cq:tags` |
| De-duplication | 149 references → 95 assets (same images reused by several releases) |

## 6. Issue register (`deliverables/issues-w1.csv`)

| ID | Issue | Count | Action |
|---|---|---|---|
| W1-I-01 | Links to tcs.com pages outside the migration scope (homepage, legacy URLs) | 541 | Kept to tcs.com. At go-live, rewrite to the new site's pages or check the legacy URLs' redirects |
| W1-I-02 | Hero alt texts generic ("Image") or reused from another release | 7 | Set decorative; content review |
| W1-I-03 | No meta description in the source | 7 | Generated from the first paragraph; review |
| W1-I-04 | No "About TCS" boilerplate | 11 | As on the source; no action unless required |
| W1-I-05 | Image on TCS's UAT Scene7 (`TCSCOMuat/if03`) | 1 | Source defect: replace the image on the source or supply it |
| W1-I-06 | "Connect with us" links to the language master's sample contact page | 150 | Point to the migrated contact page when it exists (change one constant, rebuild) |
| W1-I-07 | Old releases' media contacts replaced by today's contacts | 141 | Deliberate (outdated contacts); confirm with Corporate Communications |
| W1-I-08 | Wide tables (> 5 columns) in default content scroll the page on mobile | 20 tables / 2 pages | Code: make default-content tables scroll inside themselves (`styles/styles.css`), a small PR |
| W1-I-09 | Universal Editor authoring not verified | — | Author check of 5 pilot pages after install |
| W1-I-10 | `who-we-are/newsroom` has no content (parent only); the Newsroom is `/media-and-investor/newsroom` (T-01) | — | Decide before W2: redirect / hub, or move the releases |

## 7. Readiness

- **Ready to install** on AEM as a pilot. Installing changes only these 150 pages, the hub's content, the 95 images and the 8 tags (merged). `who-we-are` and `who-we-are/newsroom` are created only if missing.
- **Exit criteria for W1:**
  - automated checks 100 %: met, apart from W1-I-08;
  - content fidelity on 15 pages 100 %: met;
  - Universal Editor check: pending (W1-I-09);
  - parser defects closed: met (spaces around empty inline tags, nested links, About in bold paragraphs, abbreviated dates, contacts outside the rich text).
- **Before W2 (2,157 releases):** W1-I-08 (CSS), W1-I-10 (the newsroom hierarchy), the installed pilot reviewed in Universal Editor.

## 8. How to install

1. Package Manager → upload `tcs-corp-migration-w1-press-releases-1.0.0.zip` → Install.
2. Add the rows of `deliverables/metadata-w1-rows.tsv` to the language master's Metadata sheet (`/content/tcs-corp/language-master/en/metadata`; paste, don't import as the whole sheet), and publish the sheet.
3. Publish the hub, the 150 pages and their images; reindex.

## 9. Files

| File | Content |
|---|---|
| `crawl.json` | The 150 source page models |
| `specs.json` | The page specs, hub, parents, assets, tags |
| `deliverables/pages-w1.csv` | Per page: source, destination, result, notes |
| `deliverables/issues-w1.csv` | The issue log |
| `deliverables/metadata-w1-rows.csv` / `.tsv` | Metadata sheet rows |
| `deliverables/redirects-w1.csv` | Redirect rows (none in W1) |
| `validation.json`, `validation-summary.json` | The automated checks of the 151 preview pages |

## 10. Release 1.0.1 (23 October 2026): Wave 1 fixes

Built in the final link pass of Wave 2 (`tcs-corp-migration-w1-press-releases-1.0.1.zip`), so its links also go to the Wave 2 releases.

| Issue | Fix in 1.0.1 |
|---|---|
| W1-I-08 wide tables; tables in rich text | AEM doesn't deliver a table in a Text as a table (its cells arrive as paragraphs, seen on aem.page): **every table is now a Table block** (up to 9 columns, PR #153), merged cells flattened (one header row, a value spanning rows repeated, spacer columns left out). The importer had also dropped merged-cell spans and empty cells, which shifted the columns of the financial tables: fixed and the 6 pages re-crawled |
| W1-I-06 "Connect with us" | Links to the source's target, `https://www.tcs.com/contact-us/whats-on-your-mind/global-contact-us` (outside the migration scope, kept to tcs.com as W1-I-01), instead of the sample contact page |
| W1-I-05 image on TCS's UAT Scene7 | Taken from TCS's production Scene7 account (same name, the image exists there); its alt (another release's title) set decorative |
| W1-I-09 Universal Editor | Checked by the user on the installed pilot: closed |
| W1-I-10 / T-01 newsroom hierarchy | Decided: pages stay at the CSV's target paths. `who-we-are/newsroom` becomes a **Newsroom** page (Page Header, the latest 12 press releases, a link to all press releases); one new metadata row (`deliverables/metadata-w1-1.0.1-newsroom-row-no-header.tsv`) |
| Links between releases | A link to a page of the list goes to its AEM path only once that page is migrated; links to pages of later waves stay on tcs.com until then (no link to a missing page) |

**Install:** upload and install 1.0.1 over 1.0.0 (same filters: the 150 pages, the two hub pages' content, the new images); paste the Newsroom row into the Metadata sheet; publish the changed pages, the Newsroom page and the sheet (at its `.json` path); reindex.
