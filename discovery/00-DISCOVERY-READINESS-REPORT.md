# Discovery and Migration Readiness Report

| | |
|---|---|
| Date | 7 November 2026 |
| Mode | DISCOVERY (prompt section 3: no bulk migration) |
| Workbook | `URLMapping_Final_All_Levels.csv` (one sheet; CSV export of the workbook) |
| Code baseline | `main` at c06195e (PR #188, 6 November 2026) |
| Design evidence | 12 curated design pages and 179 block library pages as published (aem.page, previewed 3 November 2026) |
| AEM package | `Block Library pages and Curated design pages-07-Nov_1330.zip`: **not analysed** (Package Manager on AEM author is not reachable from here); see I. Risks |

Every number below comes from the scripts and files in this folder (`d1_workbook.py` … `d5_mapping.py`, `kb/`, `reports/`).

## A. Input summary

| Item | Value |
|---|---|
| Rows | 8,447 (rows 2 to 8448; the header is row 1) |
| Columns | Live URL, Target URL, L1 … L7 (no L8 or later) |
| Valid | 7,732; with warnings 61 (mixed-case source paths) |
| Invalid | 3: row 8448 (empty), rows 6872 and 8039 (`&` in the page name: `…clinical-and-r&d-by-everest-group`, `s&op-reality-check`) |
| Requires review (path) | 651: row 2 (Home: Target `/content/tcs-corp/language-master/` has no `en`, resolves outside the locale root) and 650 rows already migrated at another path (below) |
| Duplicate Live URLs / destinations | 0 / 0 |
| Target / hierarchy conflicts (rule E) | 0 |
| Hierarchy depth | 0 (2 rows), 1 (6), 2 (95), 3 (1,987), 4 (3,415), 5 (2,750), 6 (184), 7 (8) |
| Resolution | Rule B + C (parent path + levels, leading overlap removed) for 8,439 rows; B for 6; A for 1 |
| Source URL issues | 63 mixed-case paths (`careers/chile/Articles`, …); 65 upper-case page names |
| Already on the site | 2,536 rows at the same path (migrated in October, W1 to W7) |
| **Conflict with the current content structure** | **652 rows** migrated in October whose current AEM path differs from the workbook's: 503 newsroom (`news-and-events/newsroom` in AEM, `who-we-are/newsroom` in the workbook), 61 corporate actions (`investor/…` vs `investor-relations/…`), 32 events (`news-and-events/events` vs `investor-relations/events`), 56 other |

Reports: `01-workbook-validation.csv`, `02-target-path-resolution.csv`, `03-existing-pages.csv`.

## B. Codebase summary

| Item | Value |
|---|---|
| Blocks | 32 (`blocks/`), every one with a README, 23 with unit tests |
| Variations | 449 select values of variation fields (classes, style, container options) |
| READY | 20: accordion, anchor-list, button-block, cards, conversation-canvas, embed, filter-list, fragment, hero, list, media-contacts, modal, page-header, quote, separator, table, table-list, teaser, testimonial, video |
| READY_WITH_CONDITIONS | 9: columns-container, gen-carousel, tabs (section containers); column-break, tab (items); footer, tcs-header (page shell: never in migrated pages); form-variations (no Additional tab, KB-D-061; no form back end, O-08); image-collage (KB-D-063 Proposed) |
| DEPRECATED | 1: columns (compatibility only) |
| RUNTIME_ONLY | 1: header (page shell, from the nav page) |
| INCOMPLETE | 1: interactive-dashboard (placeholder, renders nothing) |
| Templates | home, article, blog, press-release |
| Section filter | 28 components; default content: Text, Title, Image |
| Model / filter findings | form-variations lacks its Additional tab (KB-D-061, 2 failing tests); columns and interactive-dashboard are in no filter |

Reports: `04-block-inventory.csv`, `05-block-variations.csv`, `06-codebase-summary.json`.

## C. AEM package summary (published equivalent)

| Item | Value |
|---|---|
| Pages analysed | 195 of 254 published paths (179 block library, 16 curated pages); 59 curated pages below `curated-design-pages/home/` aren't published (404) |
| Blocks represented | every block of the codebase except interactive-dashboard on a design page; no example uses a block that doesn't exist |
| Variation classes used | 106 (anchor ids, spacing and hide flags excluded) |
| Code-package mismatches | form-variations examples use animation classes removed in 9aae6f7 (outdated examples); hero `icon-sky-blue` (the model offers `eyebrow-sky-blue`) |
| Reusable examples | all block library sections of READY blocks (`08-package-examples.csv`) |

## D. Design model summary (12 archetypes)

| ID | Archetype | Design page | Sections | Blocks |
|---|---|---|---|---|
| A01 | L0 Home | curated-design-pages/home | 8 | hero, list, conversation-canvas, table-list, teaser |
| A02 | L1 What We Do | …/what-we-do | 8 | hero, teaser, column-break (columns), table-list, conversation-canvas, button-block |
| A03 | L1 Who We Are | …/who-we-are | 11 | hero, cards, teaser (incl. image collage), testimonial, list, quote |
| A04 | L1 Insights | …/insights | 4 | hero, filter-list, teaser, testimonial |
| A05 | L1 News & Events | …/media-and-investor | 10 | hero, filter-list, list, teaser |
| A06 | L1 Investors | …/media-and-investor (the same page as A05) | 10 | hero, filter-list, list, teaser |
| A07 | L2 Industry | …/industry-landing-page | 8 | teaser, cards, list, table-list, testimonial, video, columns |
| A08 | L2 Services | …/services | 8 | teaser, cards, list, testimonial, columns |
| A09 | L2 Products | …/product | 7 | teaser, cards, list, table-list, testimonial |
| A10 | L2 Collection | …/collection | 5 | page-header, filter-list, list, table-list, teaser |
| A11 | L3 Story | …/story | 12 | page-header, anchor-list, tabs, list, teaser, testimonial, video, columns |
| A12 | L3 Case Study | …/case-study | 11 | page-header, anchor-list, list, table-list, teaser, testimonial, video |

Section sequences with variations: `07-design-archetypes.csv`. L0–L2 archetypes open with a **Hero**; L3 and Collection with a **Page Header**.

## E. Source content summary (443 sample pages, 438 crawled)

| Item | Value |
|---|---|
| URL patterns | 209 (largest: press releases 2,307; blogs 654; author pages 603; news 326; events 291; industry sub-pages 1,300+) |
| Source components | 71 (most frequent: heroBanner, richText, textWithAsset, quoteCard, horizontalTab, textOverImage, solutionCard, footerCTA, leadGenFormType1, relatedContent) |
| Classification | A11 Story 6,689; A12 Case Study 384; A09 Products 357; A10 Collection 51; A06 16; A07 14; A08 14; A03 12; A02 4; A05 2; A01 1; **Unclassified 903** (author profiles 601, careers 145, contact / form overlays 109, other 48) |
| Confidence | HIGH 4,484; MEDIUM 2,763; LOW 1,200 |
| Assets | images (Scene7 and tcs.com DAM), PDFs, videos (YouTube / Vimeo), audio (podcasts) |
| Metadata | title, description, og / twitter; dates in text or schema.org; tags (articleTags) |

The workbook has no row for the L1 Insights and What We Do landing pages themselves (A04 is represented only by its collections and stories).

## F. Mapping summary

| Status | Source components |
|---|---|
| VALIDATED (October waves, every page checked, one in ten in the browser) | 45: heroBanner→page-header, richText→text/table, quoteCard→quote, horizontalTab→tabs, textOverImage/footerCTA→teaser, solutionCard/feature cards→cards, statsCard→teaser stats, videos→embed, downloadReport/ctaButton→button-block, listFilter/dropdownListing→filter-list, quarter pages→tabs+table, authorBio→Authors sheet, forms→button to the tcs.com form, navigation components left out |
| PILOT (design model asks for it, not run yet) | 17: heroBanner→**hero** on L0–L2, heroCarousel→gen-carousel, relatedContent / staticRelatedContent→list (95 / 90 sample pages), textWithAsset→teaser, storyCard / contentCards / featureGrid→cards, latest / featured / recommended→list, horizontalAccordion→accordion, anchorLinks→anchor-list, dynamicFilter→filter-list, topHighlights / storyCardCarousel→gen-carousel |
| GAP | 9: podcast (audio player), anonymousPoll, bingeGallery (video gallery), timelineContainer, authorListing, itwizContactUs, contactWelcomeScreen, shortFeedbackSurvey, emailSignUp |

Registry: `09-source-patterns.csv`, `kb/canonical-mapping.json`, `kb/gaps.json`.

## G. Batch plan

60 batches of at most 250 rows (`11-batch-plan.csv`), each with one disposition and archetype:

| Wave | Content | Rows |
|---|---|---|
| 1 | Pilot (H) | 11 |
| 2 | L0 / L1 landing pages (new) | 18 |
| 3 | L2 Industry, Services, Products, Collection (new / existing) | 111 |
| 4 | L3 Story and Case Study (existing at the same path 2,369; new 1,291) | 3,660 |
| 5 | Deep hierarchy (depth ≥ 5) | 2,809 |
| Final | Exceptions: path conflicts 650, review 1,196 (author profiles, careers, contact, corporate content), invalid 3, Home 1 | 1,850 |

## H. Pilot plan

| Row | Live URL | Archetype | Reason |
|---|---|---|---|
| 4951 | /what-we-do/tcs-research-and-innovation | A02 | 11 components |
| 4952 | /who-we-are | A03 | the L1 landing page |
| 5009 | /who-we-are/events | A05 | events landing |
| 2112 | /investor-relations/shareholder-satisfaction-survey | A06 | the only investor page not in the path conflict |
| 2120 | /what-we-do/industries/banking | A07 | 11 components |
| 4182 | /what-we-do/services/ai-data-and-analytics | A08 | |
| 3974 | /what-we-do/products-platforms/tcs-hobs | A09 | |
| 1922 | /insights/topics/blockchain-topic | A10 | listing |
| 1855 | /insights/global-studies/intelligent-choice-architectures-… | A11 | |
| 3969 | /what-we-do/products-platforms/tcs-erp-on-cloud-sap-… (case study) | A12 | |
| 1879 | /insights/perspectives | A10 | featureGrid mapping |

`12-pilot-plan.csv` lists their components and target paths. A01 (Home) waits for its target path.

## I. Risks and gaps

| Area | Risk | Disposition |
|---|---|---|
| Input | 652 rows conflict with the content structure set up in AEM on 26 October (workbook: `who-we-are/newsroom`, `investor-relations/…`; AEM: `news-and-events/…`, `investor/…`) | **Decision needed** (authority order: the workbook; but moving 652 live pages back undoes the AEM move) |
| Input | 2,536 rows are already migrated at the same path | **Decision needed**: keep, or re-migrate with the design-model mapping (overwrites edits made in AEM since) |
| Input | Home row targets `language-master/` (no `en`); 2 page names with `&` | Decision needed (target path / page names) |
| Package | The 7 November package wasn't analysed; 59 curated sub-pages aren't published | Provide the package (or confirm the published pages are current) |
| Design | A05 and A06 share one design page; no curated archetype for careers, author profiles, contact overlays (903 rows) | Decision: archetype for these, or keep their October / basic mapping |
| Blocks | 9 gaps (podcast player, poll, video gallery, timeline, author listing, interactive contact modules, sign-up form) | Left out or nearest block, logged per page; no block is created (prompt section 33) |
| Forms | No form back end (O-08): 109 contact overlays and lead-gen forms | Button to the tcs.com form (decision W7-D6) unless an endpoint is approved |
| Links | Internal links only to pages of the workbook (verified mapping); others stay on tcs.com | As October |
| Metadata | The Metadata / Redirects sheets in AEM still hold the pre-26 October rows | Replace them (open since 26 October) |
| Delivery | Git branch names can't contain spaces: "Migrated page Content" | Proposed: `migrated-page-content` |

No critical code blocker: every design archetype uses READY blocks. The blockers before the pilot are the decisions above.
