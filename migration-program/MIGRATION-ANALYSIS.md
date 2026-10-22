# tcs.com to Edge Delivery Services: pre-migration analysis

| | |
|---|---|
| Date | 22 October 2026 |
| Inputs | `IA Options for review (3.09.2026).xlsx` (the IA workbook); the live tcs.com sitemap (`https://www.tcs.com/sitemap.xml`, read on 22 October 2026); 36 sampled source pages; the project's blocks, taxonomy and locale sites (main at `1785b3e`) |
| Outputs | This report (the six analysis reports); `url-inventory.tsv` (10,529 URLs with section, content type, wave, complexity and proposed destination); `inventory-summary.json`; `sample-pages.tsv` (the 36 measured pages) |
| Status | Analysis only. No page migrated, nothing written to AEM |

## 0. Summary and key findings

1. **The workbook isn't a URL inventory.** It is a tab-separated text file with an `.xlsx` name (140 lines). It holds the **existing IA** (L1–L3 navigation labels) and **two IA options**. It has no source URLs, destination paths, page types or metadata. A per-row inventory (Phase 1) can't be built from it alone.
2. **The source scope is larger than the brief.** The tcs.com sitemap lists **10,529 URLs**, not 3,200+:
   - 8,599 on the global English site;
   - 1,930 on six language sites (`/jp-ja` 919, `/cn-zh` 393, `/de-de` 373, `/fr-fr` 160, `/se-sv` 61, `/kr-ko` 24).

   This report classifies all of them (`url-inventory.tsv`). Which 3,200 pages are in scope needs your list or your selection (section 4.3).
3. **Press releases are the largest single type:** 2,337 global plus 366 localised. The press-release template, the Page Header and the Media Contacts block are already built and proven on a migrated release, so press releases are the lowest-risk first wave.
4. **tcs.com uses about 10 source templates.** Examples: "TCS NewsRoom Migration Template", "TCS Case Studies Template" (case studies, white papers, blogs), "Article Migration Template", "Video/Podcast", "Industries - Services L1", "TCS What We Do Template". The import is therefore built per template (one parser set each) and run in bulk, not page by page.
5. **Blockers before production waves:**
   - tcs.com refuses non-browser requests (Akamai 403 on `robots.txt` and to scripts), so the crawl needs a real browser, throttled, about 2 s a page.
   - Adobe Tags, the Web SDK, Analytics, CJA, Target and AJO aren't configured in this project (the data layer is ready). Phase 13 can only validate the data layer until they're approved and set up.
   - Universal Editor can't be validated from here (no author access).

## 1. IA Validation Report

The workbook's three structures were compared with each other and with the sitemap.

### 1.1 Structure

| | Existing IA | Option 1 | Option 2 |
|---|---|---|---|
| L1 | What we do · Who we are · Insights · Careers · Newsroom · Investors | **What we think (AI Narrative)** · What we do · Who we are · Insights · Careers · **Media & Investors** | Same L1 as Option 1 |
| What we think | — | L2 "Infrastructure to Intelligence" only | L2 + 5 L3 (Infrastructure & hardware, Models & data, Frameworks & tools, Applications & agents, Intelligence in action) |
| What we do | Industries (15), Services (13), Products & Platforms (19), Research & Innovation, Alliances | Industries (15), Services (12), Products & Platforms (19), Our Customers, Alliances, Research & Innovation | Industries (15), Our Customers, Alliances, Research & Innovation (**no Services, no Products & Platforms**) |
| Who we are | Brand, Leadership, Community, Sustainability, Inclusion, Values | History, Our Brand, Leadership, Our community, Values, Aspirations, Awards & Recognition, Inclusion & Diversity, Sustainability | Same as Option 1 |
| Insights | Customer Stories, Events, Analyst Recognition, Global Studies | "Insights" (one L2, same label as L1) | No L2 |
| Careers | India + 45 country / language entries in 4 regions | Find a job · Life at TCS | Same as Option 1 |
| Newsroom / Media & Investors | Press Releases, News Alerts, Media Kit (Newsroom); Investors with about 20 L3 | Newsroom (Press release, Media kit, News Alert), Investor (Management, Financials, News & Events, ESG, Resources), Events | Same as Option 1 |

### 1.2 Issues found

| # | Type | Where | Issue | Recommendation |
|---|---|---|---|---|
| IA-01 | Naming | All three | "Research & **Innvoation**" | "Research & Innovation" |
| IA-02 | Naming | Options 1, 2 | "**Resoures**" | "Resources" |
| IA-03 | Naming | Existing, Careers | "**Mainlaind** China" | "Mainland China" |
| IA-04 | Invalid placement / duplicate | Existing, Careers | Mainland China listed under **Americas** and again under Asia Pacific | Asia Pacific only |
| IA-05 | Duplicate | Existing, Careers | "India" at L2 and L3 | One "India" entry |
| IA-06 | Duplicate | Option 1, What we do | "Sustainability Services" and "TCS Interactive" under Services **and** again under Products & Platforms | Services only (they are services) |
| IA-07 | Naming | Existing, Products | "TCS ERP on Cloud ignio™" joins two products | "TCS ERP on Cloud" and "ignio™" as two entries |
| IA-08 | Naming inconsistency | Option 2 vs others | "Communication, Media & Information Services" vs "Communications, Media, and Information Services" | One label: "Communications, Media, and Information Services" (the existing URL `communications-media-information-services`) |
| IA-09 | Naming inconsistency | All | Trailing spaces and inconsistent ™ (e.g. "TCS ADD™ ", "Belgium ") | Trim; keep ™ as the product names are registered |
| IA-10 | Naming inconsistency | Existing, Careers | "Colombia (EN)" / "Colombia (ES)", "Mexico(EN)" / "Mexico(ES)" | Language versions aren't IA nodes: one country entry, language through the locale switch |
| IA-11 | Redundant level | Option 1 | Insights › "Insights" (L2 = L1) | Use the topic or format groups (Customer Stories, Perspectives, Global Studies, Podcasts) as L2 |
| IA-12 | Orphan risk | Option 2 | No Services and no Products & Platforms at L2: **737 service and 401 product URLs** have no navigation parent | Keep Services and Products & Platforms under What we do (as Option 1) |
| IA-13 | Orphan risk | Options 1, 2 | The country and region career pages (45 entries; `careers/india` 28 URLs and other countries) and the **worldwide country pages** (`/who-we-are/worldwide`, 150 URLs) aren't in the options | Careers › "Careers by country" (one hub listing the countries); a "TCS worldwide" hub under Who we are |
| IA-14 | Orphan risk | Options 1, 2 | Global Studies (55 URLs), Analyst Recognition, Customer Stories, Sports sponsorships (90 URLs) and the Investors L3 (Corporate Actions 61 URLs, Stock Information, Investor FAQs, eTDS, Subsidiaries, Unclaimed Dividend) aren't named | Map each to a parent: Insights › Global Studies; Who we are › Awards & Recognition (analyst recognition); What we do › Our Customers; Who we are › Sponsorships; Investor › Resources (listing the Investors L3) |
| IA-15 | Overlap | Existing | Press releases under Newsroom and again under Investors › News and Events; Events under Insights and under Investors | One home per content (Newsroom › Press releases, an "Events" hub); the Investors entries link to filtered lists |
| IA-16 | Overlap | All | Sustainability in three places (Who we are › Sustainability, Services › Sustainability Services, Investors › ESG) | Keep all three, but with distinct intents: corporate sustainability, the service offering, investor ESG disclosures. Cross-link them; tag them `esg/*` |
| IA-17 | Ambiguous level | Options 1, 2 | Under What we do the L3 column mixes industries, services, products, customers and alliances; the only L2 is "Industries we Serve" | Make Industries, Services, Products & Platforms, Our Customers, Alliances & Partnerships and Research & Innovation explicit L2s |
| IA-18 | Content gap | Options 1, 2 | "What we think (AI Narrative)" has no source content in the sitemap (new section) | Content to be authored (curated design pages); not a migration source |

### 1.3 Recommendation

**Option 1 as the base**, with the corrections IA-01–IA-17. Option 1 keeps Services and Products & Platforms, which Option 2 drops (IA-12), and adds the AI narrative L1 that both options introduce.

Also add these hubs, so no migrated content is orphaned: Careers by country, TCS worldwide, Insights topic hubs, Investor › Resources and Events. The site already has the Header with any depth of menu (`blocks/tcs-header`) and Lists for hub pages, so no new blocks are needed.

## 2. Taxonomy Strategy

### 2.1 Principles

- **One namespace, `tcs-corp:`,** as today (85 tags in 7 roots). Every locale reads its translated labels from `/{locale}/taxonomy.json` (`utils/taxonomy.js`).
- **Tags describe the content; metadata describes the page.** `page-type`, `content-type`, `region`, `persona` and `publish-date` stay metadata columns: they drive templates, the Page Header, the query index and Lists. Tags drive Lists, Filter List filters and the data layer (`xdm:tags`).
- **Source tags are cleaned on import.** The sample shows source "tags" that mix taxonomy with author names ("Digital:Nirmal Kumar J", "Ashok Pai:Cognitive Business…"). Author names go to `author` / `author-id` (Authors sheet), never into tags.

### 2.2 Model

Additions (**new**) to the existing roots; the existing tags stay.

| Root | Purpose | Values (existing; **new**) |
|---|---|---|
| `industry/` | Industries we serve (the IA's 15) | banking, cpg-distribution, communications-media-information, education, energy (**rename label** "Energy, Resources, and Utilities"), healthcare, insurance, life-sciences, manufacturing, retail; **capital-markets, high-tech, public-services, travel-logistics**; automotive, aerospace, telecommunications kept as sub-industries |
| `service/` | Service lines | ai, cloud, consulting, cybersecurity, data, analytics, application-services, infrastructure-services; **ai-data-centres, cognitive-business-operations, enterprise-solutions, industrial-autonomy-engineering, network-solutions, sustainability-services, tcs-interactive** |
| `product/` (**new**) | Products & platforms (the 19) | **tcs-add, tcs-bancs, tcs-bfsi-platforms, tcs-chroma, tcs-customer-intelligence-insights, tcs-erp-on-cloud, ignio, tcs-ion, tcs-hobs, tcs-intelligent-urban-exchange, tcs-omnistore, tcs-optumera, tcs-tap, quartz, tcs-twinx, tcs-mastercraft, jile, tcs-digibolt, tcs-ai-wisdomnext** |
| `technology/` | Partner technologies | adobe, salesforce, aws, azure, google-cloud, sap, oracle; **servicenow, microsoft, nvidia, ibm, pega** (added only where sources use them) |
| `capability/`, `topic/` | Capabilities and themes | Existing 13 and 23; **research, innovation, ai-narrative** |
| `content-type/` | Format (mirrors the `content-type` metadata for filters) | case-study, article, blog, press-release, whitepaper, research, webinar, event, report, news, insights; **video, podcast, analyst-report, news-alert, brochure, investor-document** |
| `esg/` (**new**) | Sustainability and ESG | **environment, social, governance, csr, diversity-inclusion** |
| `investor/` (**new**) | Investor content | **financial-results, annual-report, corporate-action, shareholder-services, investor-event** |
| `career/` (**new**) | Careers content | **experienced-professionals, graduates, life-at-tcs, hiring-programme** |
| `region/` | Geography (existing root) | europe, americas, asia-pacific; **global, united-kingdom, middle-east-africa, india** |
| `country/` (**new**) | Country hierarchy, `country/{region}/{country}` | The 45 countries of the existing Careers IA, e.g. `country/europe/germany`, `country/asia-pacific/japan`, `country/americas/brazil` |
| `persona/` (**new**) | Audience | **business-leader, cio, cto, cdo, cmo, developer, architect, investor, analyst, partner, customer, candidate, media** |
| `journey/` (**new**) | Content journey stage | **awareness, consideration, evaluation, decision, retention** |

### 2.3 Rules and governance

- **Required tags:**
  - Every migrated page: one `content-type/*`, at least one subject tag (`industry/`, `service/`, `product/`, `esg/`, `investor/`, `career/` or `topic/`), and `region/*` where the content is regional.
  - Press releases: `content-type/press-release` plus the subjects. `persona/media` and `persona/investor` are applied by rule.
- **Automatic tagging** in the importer, by path. For example `/what-we-do/industries/banking/**` gives `industry/banking`, `/careers/brazil/**` gives `country/americas/brazil` and `career/*`, and `/who-we-are/newsroom/press-release/**` gives `content-type/press-release`. Mapped source tags (a mapping table built from the source tag values) are added on top.
- **Persona and journey:** applied by content type (e.g. press release → media, investor; awareness) until editors refine them. They are recommendations, used by Lists and later by Target and AJO audiences.
- **Metadata alignment:** the `region` metadata uses the `region/*` titles (Global, Europe, Americas, Asia Pacific, Middle East and Africa, India, United Kingdom). The same vocabulary is used in the Media Contacts and Authors sheets.
- **Ownership:** Content Lead (taxonomy changes through a request), Product Owner (new roots). Quarterly review (handover governance G-04).
- **Delivery:** the tags travel in the content packages (merged, never overwritten), and `/{locale}/taxonomy.json` is regenerated per locale.

## 3. DAM Structure Strategy

### 3.1 Structure

```text
/content/dam/tcs-corp
├── images
│   ├── industries/{industry}          e.g. images/industries/banking
│   ├── services/{service}
│   ├── products/{product}
│   ├── newsroom/{yyyy}                press release and news images, by year
│   ├── insights/{format}              blogs, white-papers, case-studies, global-studies
│   ├── careers/{country}
│   ├── investors
│   ├── sustainability
│   ├── who-we-are                     leadership, brand, community
│   ├── worldwide/{country}
│   └── shared                         logos, icons, partner logos, reused backgrounds
├── videos
│   ├── campaigns · thought-leadership · webinars · customer-stories · events
├── documents
│   ├── reports · whitepapers · brochures · analyst-reports · case-studies
│   └── investor-documents/{yyyy}      annual reports, results, corporate actions
└── {locale}                           locale-only assets (e.g. jp-ja, de-de) mirroring the same tree
```

The project's existing folders (`block-library`, `curated-design-pages`, `home`, `dummy-pages`) stay as they are. They hold sample and curated content, not migrated assets.

### 3.2 Rules

- **Naming:** lower-case, hyphens, the source file name kept where it's meaningful (`indian-focused-articles-banks.jpg`). Uniqueness comes from the folder, not from a suffix.
- **De-duplication:**
  - The importer stores each binary once, keyed by a hash of its content (SHA-256), and points later pages to the asset that already exists.
  - Many tcs.com images are Scene7 renditions of one master, so the importer fetches the largest rendition once.
  - Logos and shared backgrounds go to `images/shared`.
- **Metadata on every asset:**
  - `dc:title`;
  - `dc:description` (the alt text when the image isn't decorative);
  - `cq:tags` (the page's subject tags);
  - the source URL (`tcs:sourceUrl`) and migration wave (`tcs:wave`), for traceability;
  - usage rights where known: `[To be confirmed: rights metadata — owner: Brand]`.
- **Alt text:** taken from the source `alt`, then reviewed. The sample showed alt texts that belong to another page (e.g. the BaNCS release's hero image). Generic or wrong alts are flagged in the asset issue log, not copied blindly.
- **Videos:** YouTube and Vimeo sources stay external (Embed / Video blocks with the privacy-friendly players). Self-hosted MP4 files are migrated to `videos/*`. Edge Delivery serves non-image DAM files only once they're published (AGENTS.md delivery rule), so each page's videos and PDFs are published with it.
- **Documents:** PDFs go to `documents/*` and are linked from the page. The Video and Embed blocks read a non-image reference's link text from its Alt (`animationLabel` rule), so link texts are set explicitly.
- **Renditions:** AEM Assets creates the web renditions. Edge Delivery serves responsive images from the page (the `picture` element). No manual rendition sets are needed.

## 4. Migration Waves Plan

### 4.1 Execution model (per wave)

1. **Template parsers:** the source templates of the wave, mapped to existing blocks (Phase 7). Mapping rules come from a pilot page per template.
2. **Crawl:** throttled browser crawl of the wave's URLs: content, metadata, assets.
3. **Transform:** generate the page specs and the asset and tag lists. Tags come from the path rules, the mapped source tags and the metadata columns.
4. **Build:** a content package per wave (pages, DAM folder, tags merged), the metadata sheet rows, and the redirect rows for changed paths.
5. **Validate:** automated checks on 100 % of pages (H1, alt, links, metadata, model warnings, data layer) and a visual comparison on a stratified 5 % sample (source vs preview at 3 widths).
6. **Sign-off:** install, publish and reindex, then a post-publish check on aem.page and the wave report.

Each wave starts only when the previous wave's exit criteria are met. The pilot (Wave 1) fixes the parsers and the checks before volume.

### 4.2 Waves

Page counts come from the sitemap. Image estimates use the sample's average per content type (two pages per type, so ±50 %; 3.6 per page where a type wasn't sampled), before de-duplication. PDFs: about 0.23 links per page.

| Wave | Content | Pages | Complexity (L / M / H) | Est. images (raw) | Dependencies | Risk | Exit criteria |
|---|---|---|---|---|---|---|---|
| 1 | **Pilot:** the 150 most recent global press releases (2026) | 150 | 150 / 0 / 0 | ~150 | IA approved (section 1); taxonomy roots (2); DAM tree (3); Media Contacts block (done); metadata sheet rows | Low | 100 % automated checks pass; 15-page visual sample matches the source; parser defects closed |
| 2 | **Press releases**, rest of global (2022–2026) | 2,187 | 2,187 / 0 / 0 | ~2,200 | Wave 1 | Low | As Wave 1; redirects for changed paths; In-the-News Lists filled from the index |
| 3 | **Newsroom:** news alerts, analyst reports, media kit, events | 861 | 545 / 315 / 1 | ~1,200 | Wave 2 (cross-links) | Low–Medium | Event pages with dates in metadata; analyst report PDFs migrated |
| 4 | **Services:** service hubs and their case studies, white papers, blogs, videos | 737 | 0 / 464 / 273 | ~1,300 + video | Service tags; Teaser, Cards, List, Tabs, Accordion mappings per hub | Medium–High | Hubs reviewed by service owners; Lists (related content) filled |
| 5 | **Industries:** hubs and their white papers (802), case studies, videos | 1,458 | 0 / 1,256 / 202 | ~6,300 + video (industry hubs ~19 images each) | Industry tags; Wave 4 patterns | Medium–High | As Wave 4 |
| 6 | **Products & platforms** | 401 | 0 / 160 / 241 | ~850 | Product tags (new root); product hub layouts | High | Product hubs reviewed by product owners |
| 7 | **Investor content** | 100 (+32 investor events in Wave 3) | 100 / 0 / 0 | ~50 + PDFs | Investor documents (PDF) migration; Investor › Resources hub | Medium (regulatory accuracy) | Financial PDFs byte-identical to the source; investor relations sign-off |
| 8 | **Country pages and language sites** (`/who-we-are/worldwide` and `/jp-ja`, `/cn-zh`, `/de-de`, `/fr-fr`, `/se-sv`, `/kr-ko`) | 2,080 | 366 / 1,563 / 151 | ~5,300 | The global waves (patterns, assets); locale sites (13 in the project); translated taxonomy and placeholders | High (language, local review) | Native-speaker review on a sample per language; `lang` and the locale's references correct |
| 9 | **Sustainability and ESG** | 239 | 1 / 199 / 39 | ~650 | `esg/*` tags; Waves 4–5 (shared assets) | Medium | ESG owner sign-off |
| 10 | **Careers** | 222 | 0 / 173 / 49 | ~3,700 (career hubs ~16 images each) | Careers by country hub (IA-13); job pages link to the ATS | Medium | No job listing content migrated as static pages without an owner decision |
| 11 | **Research, innovation and insights:** blogs (681), author pages (605), global studies, perspectives, podcasts, Pace, Research | 1,559 | 0 / 1,540 / 19 | ~1,900 | Authors sheet (605 author pages → Authors sheet rows plus author pages decision); insights topic hubs | Medium | Authors migrated as data; podcasts' audio links working |
| 12 | **Remaining special content:** contact-us form overlays (324), campaign and test pages | 310 | 92 / 217 / 1 | ~800 | Form Variations (no submit endpoint yet); decision per overlay (form vs link) | High (forms) | Each overlay mapped to a Form Variations form or a Modal, or retired |
| | **Total** | **10,529** | 3,512 / 6,027 / 990 | ~25,000 raw references | | | |

### 4.3 Scope to agree

The brief names "approximately 3,200+" URLs; the sitemap has 10,529. Options:

- **A. Provide the URL list** (source URL and destination path per row). It replaces the sitemap classification as the inventory.
- **B. Select from the sitemap.** For example: global English only, last modified 2024 or later, excluding author pages and form overlays. That selection gives **6,361** pages (computed from `url-inventory.tsv`); adding "press releases from 2025 on only" or similar rules brings it near 3,200.
- **C. Everything** (10,529), in the 12 waves above.

## 5. Content Type Classification Report

### 5.1 Distribution (all 10,529 URLs)

| Content type | URLs | Main sections | Source template (sample) | Target in the project |
|---|---|---|---|---|
| Press release | 2,703 (2,337 global, 366 localised) | `who-we-are/newsroom/press-release`, service and industry `press-release` folders, `de-de/.../pressemitteilungen` | TCS NewsRoom Migration Template | Page Type press-release; Page Header; Text; Media Contacts; List (related) |
| White paper | 1,433 (+32 "whitepaper") | Under industries (802), services (258), products, contact-us overlays (138) | TCS Case Studies Template | Page Type article; Page Header; Text; Teaser (download CTA); List |
| Insight (blogs, authors, studies, topics) | 1,392 | `insights/blogs` 681, `insights/authors` 605, global-studies, topics, perspectives | Article Migration Template | Page Type blog / article; author pages → Authors sheet and List by author |
| Language-site pages (not otherwise typed) | 1,243 (jp-ja 571, de-de 339, cn-zh 158, fr-fr 151, se-sv 59, kr-ko 24) | The locale's who we are / what we do / careers | Same templates as global | The locale sites (`/content/tcs-corp/{country}/{lang}`) |
| Newsroom pages | 513 | News alerts, analyst reports, media kit | TCS NewsRoom Template | Page Type press-release / article |
| Case study | 461 | Industries, services, products, locales | TCS Case Studies Template, Success Story Migration Template | Page Type article; Page Header; Teaser; Text; Quote; List |
| Article | 357 | Industries, services, CSR, locales | Video/Podcast, Article Migration Template | Page Type article |
| Event | 316 + 25 | `who-we-are/events` | Video/Podcast | Page Type article with event date metadata; Teaser (registration CTA) |
| Service page | 293 | `what-we-do/services/*` hubs | Industries - Services L1, TCS What We Do Template | Hero / Page Header (landing), Teaser, Cards, List, Tabs, Accordion, Table List |
| Video | 260 | Industries, services, products | TCS Media Migration Template | Video or Embed block; Page Header; Text |
| Product page | 248 | `what-we-do/products-platforms/*` | TCS What We Do Template | As service pages (Table List products variation) |
| Career page | 222 | `careers/*` (country and testimonial pages) | Video/Podcast | Teaser, Cards, Testimonial, List |
| Industry page | 212 | `what-we-do/industries/*` hubs | Industries - Services L1 | As service pages |
| Investor page | 132 | `investor-relations/*` | (no template name) | Text, Table, Teaser (PDF links), List |
| Country page | 116 | `who-we-are/worldwide/*` | TCS What We Do Template | Landing layout; Teaser, Cards, List |
| Contact overlays | 324 (in `contact-us/*-overlay`) | Industry, service, product, who we are overlays | Empty Template (form) | Form Variations in a Modal, or retired |
| Blog, podcast, report, analyst report, interview | 111 / 41 / 30 / 8 / 4 | Services, Pace, newsroom | Article / Video/Podcast | Page Type blog / article |
| Other (sponsorships, legal, leadership, DEI, brand, governance, Inquizitive) | ~280 | Who we are, legal | Various | Default pages with existing blocks |

### 5.2 Freshness (sitemap `lastmod`)

| Year | URLs | Note |
|---|---|---|
| 2022 | 59 | Review for retirement |
| 2023 | 1,947 | Includes 975 press releases (archive) |
| 2024 | 1,964 | |
| 2025 | 3,889 | |
| 2026 | 2,638 | |
| None | 32 | |

### 5.3 Block mapping coverage

Every content type maps to existing blocks:

- Page Header, Hero, Teaser, Text, Title, Image;
- Cards, List, Filter List, Table List, Table;
- Tabs, Accordion, Quote, Testimonial;
- Video, Embed, Modal, Form Variations, Media Contacts, Columns Container.

No page-specific block is needed so far. Statistics map to Teaser and Testimonial Stats; "Related content" maps to a List with tags. A new block may be needed only where a pilot shows a source component without an equivalent: candidates are the source "Global Studies" interactive charts and the investor stock widget. These go through the decision log first.

## 6. Risk Assessment Report

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R-01 | **Scope mismatch:** no URL list in the workbook; the sitemap has 10,529 URLs vs "3,200+" | Certain | High | Agree the scope (4.3) before Wave 1 | Product Owner |
| R-02 | **Source access:** tcs.com (Akamai) refuses non-browser requests; a throttled browser crawl of 10,529 pages takes about 6 hours per pass and may be rate-limited | High | High | Allowlist the crawler's IP, or (better) provide an **AEM content export** of the source (`/content/tcs/global/en`, a package or the JCR), which is faster and exact | TCS web operations |
| R-03 | **Analytics not configured:** Adobe Tags, Web SDK, Analytics, CJA, Target, AJO aren't set up; adding them needs an approved decision (project rule) | Certain | High (Phase 13) | Migrated pages are data-layer ready (Adobe Client Data Layer, `data-cmp-*`); a separate workstream: measurement plan, Tags property, consent (CMP), then the decision log entry | Analytics lead |
| R-04 | **SEO equity:** path changes (148 URLs with upper-case letters, the language-site prefixes `/jp-ja` → `/ja-jp`) break inbound links | High | High | Redirect map per wave: per-locale `redirects.json` exists but the platform applies only a root one, so a CDN redirect mechanism is needed (handover 3.8); canonical and hreflang checks | SEO lead, Operations |
| R-05 | **Source data quality:** missing descriptions (7 / 35 sampled), H1 not one per page (4 / 35), author names in tags, wrong alt texts, empty sitemap pages (1 / 36) | High | Medium | Importer fixes the structure (one H1 from the title, descriptions flagged), tag mapping table, alt review queue, empty pages reported not migrated | Content Lead |
| R-06 | **Forms:** 324 contact overlays; Form Variations has no submit endpoint | Certain | High | Decide per overlay: form (endpoint needed), link to the contact page, or retire | Product Owner |
| R-07 | **Localisation:** 1,930 language-site pages; the project's locale paths differ (`/jp-ja` vs `/ja-jp`); translation quality can't be checked automatically | High | High | Wave 8 after the global waves; native review sample per language; translated taxonomy | Locale owners |
| R-08 | **Asset volume and duplicates:** about 25,000 raw image references (estimate), many Scene7 renditions of the same masters; videos and PDFs serve only once published | High | Medium | De-duplication by content hash, shared folder, publish assets with pages, asset issue log | DAM owner |
| R-09 | **Universal Editor authorability** can't be checked from here (no author access); content packages bypass the editor's own validation | Medium | High | Author check of each template's pilot pages in Universal Editor before volume; model-warning check (0 tolerated) in every build | Authors |
| R-10 | **Package size and install time:** waves of 1,500–2,300 pages and their assets in one package | Medium | Medium | Packages per wave and per section (≤ 500 pages, assets separate); filters scoped to the wave's paths, never to a whole tree (the block library package lesson) | Development |
| R-11 | **Content freeze:** source changes during the migration (2,638 URLs changed in 2026) | High | Medium | Delta crawl by `lastmod` before each wave's publish; freeze window per section | Content Lead |
| R-12 | **Personal data:** author pages (605), media contacts, career testimonials publish names, photos and contact details | Medium | Medium | Authors and contacts as sheets (public by design); legal review of consent; data layer records no addresses (done) | Privacy / Legal |
| R-13 | **IA changes during migration:** Option 1 vs Option 2 undecided | Medium | High | Decide before Wave 1 (the destination paths follow the IA); the proposed paths keep the source paths, so a later IA change only touches navigation | Product Owner |
| R-14 | **Template gap:** generated Page Headers lack the side gutter (F-110); old releases need the Media Contacts block (F-109) | Certain | Low | Importer authors the Page Header and the Media Contacts block on every release (as on the migrated release) | Development |

## 7. Decisions needed before Wave 1

1. **Scope:** a URL list (4.3 A), a sitemap selection (B) or all 10,529 (C).
2. **IA:** Option 1 with the corrections (section 1.3), or another option.
3. **Source access:** an AEM content export of tcs.com, or crawler allowlisting.
4. **Destination path rule:** keep the source paths below the language master (the proposal in `url-inventory.tsv`), or re-home them to the new IA.
5. **Taxonomy:** approval of the new roots (`product`, `esg`, `investor`, `career`, `country`, `persona`, `journey`).
6. **Analytics workstream:** whether Tags, Web SDK and the others are in scope now (a decision log entry is required).
