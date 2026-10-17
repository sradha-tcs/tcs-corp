# TCS.com curated design pages — implementation report

Package `tcs-corp-curated-design-pages-content-1.0.1.zip` · 17 October 2026

**Overall status: COMPLETE WITH LIMITATIONS**

All 11 pages are authored and validated in a local preview at 1440, 1024 and 402px, together with their supporting pages, assets, tags and sheets. Three things are still outstanding:

- **Install:** installing the package in AEM author was not executed (no author access).
- **Dynamic sections:** their results depend on publishing and the query index, which `language-master` does not have (see 0.3).
- **Design gaps:** the gaps listed per page.

---

## 0. Pre-execution validation and approach

### 0.1 Validation

| Check | Result |
|---|---|
| Source templates | 9 of 11 read (temporarily mapped and previewed, then unpreviewed; the site configuration was restored exactly). **NOT FOUND:** `temp-design-pages/insights` and `temp-design-pages/media-investors` (AEM returned 404). Those two pages were built from the closest templates (Home and What We Do patterns) |
| `curated-design-pages` and the 11 targets | Did not exist (404). All 11 are **created**; no duplicates |
| DAM, AEM author, tag management | No author access (401). Assets and tags are delivered in the package, not uploaded directly |
| Figma | All designs accessible. 8 new designs analysed (Insights, Media and Investor and Industry at three breakpoints; Services, Product, Collection, Story and Case Study desktop only). Home, What We Do and Who We Are came from the earlier analyses |
| Taxonomy | `tcs-corp` namespace: 48 existing tags reused, 29 new ones added (merged) |
| Page model | Title, Description, Keywords, Page Type, Navigation, Footer, 404 Page. Other page metadata comes from the bulk metadata sheet (delivered). The model has **no Navigation Title field**, so none was authored |
| Query index | `helix-query.yaml` indexes the needed columns. Lists only read pages of the current locale (see 0.3) |

### 0.2 Package contents

| Item | Filter | Effect on install |
|---|---|---|
| `curated-design-pages` and its 11 pages, plus a root page listing them | replace (new tree) | Created |
| 119 supporting pages under `dummy-pages` | one filter per page's `jcr:content` (replace) | Each page's content is replaced. Other pages and child pages under `dummy-pages` are kept |
| 58 new DAM assets under `/content/dam/tcs-corp/curated-design-pages` | replace (new folder) | Created |
| 47 reused DAM assets (`/content/dam/tcs-corp/home`, `/dummy-pages/images`) | merge | Added only if missing; existing assets are untouched |
| `tcs-corp` tags (77) | merge | New tags added; existing tags keep their titles |

### 0.3 Dynamic retrieval (important)

The List, Filter List and query-index code only lists pages of the **current locale site**, such as `/en/...`. `language-master` is not a published locale. Inside `language-master`, Tagged pages, Child pages and Filter List sections therefore show their editor message or empty state.

They work once the content is **rolled out to a locale** (for example us/en, published at `/en`) and published, so the pages are in that locale's query index. Fixed lists read the pages' own data in the editor (from AEM author).

Validation was done on a local copy that simulates rollout to `/en`, with a matching query index, taxonomy and Authors sheet. Every dynamic section returned the intended pages.

---

## Version history

- **1.0.1** (17 October 2026). Repeating content is now stored as item children, the way authors add it with Add in Universal Editor (PR #90). These are: Hero and Page Header CTAs, Teaser links and stats, Testimonial stats, Anchor List links, Filter List tags, categories and listed / featured pages, Footer links, and the List pages (as List Items). In 1.0.0 these were composite multifield nodes, which AEM didn't render on the published pages: the lists were empty, and a Page Header with CTAs was missing. Install tcs-corp-curated-design-pages-content-1.0.1.zip over 1.0.0; each page is replaced. The placeholders sheet has one new key, `itemEditorHint` (the editor's placeholder for an item that has no content yet). It needs the code of PR #90 (merged).
- **1.0.0** (17 October 2026). First version.

---

## 1. Home — `/content/tcs-corp/language-master/en/curated-design-pages/home`

**A. Page**
- Created from `temp-design-pages/home`.
- Title: Home. Page Type: home.
- Status: COMPLETE.

**B. Figma mapping** (desktop 229:15426, tablet 671:52732, mobile 671:53791)

| Section | Block | Variation / settings | Content |
|---|---|---|---|
| Hero | Hero | light, centred, icon, 1 CTA | "We help brands turn AI ambition into competitive advantage"; CTA goes to curated What We Do |
| Transformation themes | List | fixed, panel cards (dark, image, brand) | 4 supporting pages with overrides |
| Ideas shaping impact | List | fixed, mixed, feature first | 5 insights; "Explore insights" goes to curated Insights |
| Let's make it happen | Conversation Canvas | quick actions | Menu lists the curated pages; "Learn about TCS" goes to Who We Are, "Invest in TCS" to Media and Investor |
| Deep expertise, across industries | Table List | industries | 4 industries; Banking goes to the curated Industry Landing Page |
| Related to Agentic AI | List | tagged pages | `topic/agentic-ai` |
| Intelligence in Action | List | child pages | `case-studies` |
| Newsroom | List | child pages, 3 items | `newsroom` |
| Careers at TCS | Teaser | background | 2 CTAs |

- **C. Components:** as in the mapping.
- **D. Assets:** reused from DAM (`/content/dam/tcs-corp/home/...`).
- **E. Supporting content:** 42 pages from the Home package, moved to `language-master/en/dummy-pages`.
- **F. Dynamic retrieval:** the tagged and child-page lists. Validated in the rollout copy; see 0.3.
- **G. Responsive:** desktop 4 columns; tablet about 2.4 cards per row (horizontal scroll); mobile 1.2. No overflow.
- **H. QA:** one H1. The cards' title links are under 24px tall; they are inline links, which the WCAG 2.5.8 target-size rule exempts.

## 2. What We Do — `/curated-design-pages/what-we-do`

**A. Page**
- Created from `temp-design-pages/what-we-do`.
- Status: COMPLETE WITH LIMITATIONS.

**B. Figma mapping** (3857:47575, 2649:17959, 2649:18406)

| Section | Block and settings |
|---|---|
| Hero | Hero, dark |
| Text block | Teaser, no image, dark |
| 3 AI pillars | Teaser, dark, image alternating sides, capability pills |
| Autonomy model | Teaser plus Table List (industries variation, numbers on) |
| What's your ambition | Conversation Canvas |
| 3 feature cards | Teaser, background image |
| Start with the challenge | Teaser, no image, centred |
| 3 Text & Image sections | Teaser, 8:9 image |

- **D. Assets:** 11 new under `curated-design-pages/what-we-do`.
- **E. Supporting content:** 7 supporting pages. "industries" now uses the Home industries hub page.
- **Gaps:**
  - No two-column section layout.
  - Table List has no dark style.
  - Teaser has no navy colour.
  - No gradient overlay on the feature cards.
  - The pills are rendered as links.
  - The hero title line break isn't authorable.

## 3. Who We Are — `/curated-design-pages/who-we-are` (not "who-are-we")

**A. Page**
- Created from `temp-design-pages/who-are-we`.
- Title: Who We Are.
- Status: COMPLETE WITH LIMITATIONS.

**B. Figma mapping** (270:58264, 2649:19332, 2649:19713)

| Section | Block and settings |
|---|---|
| Hero | Hero, dark, 2 CTAs |
| Heritage statement | Title |
| Stats | Cards, statistic style |
| People and Culture | Teaser, 8:9 image |
| Purpose quote | Quote |
| Values | List, fixed, panels, "Our values" |
| Leading with responsibility | Quote with portrait |
| Formula E and Marathon | Teaser, background |

- **E. Supporting content:** 7 supporting pages. "careers" now uses the Home careers hub page.
- **Figma values to verify:** the statistics (584k, 149, 155, 66m) and both quotes are Figma content that TCS needs to verify.
- **Gaps:** the "TCS at a glance" eyebrow; a second CTA on the Curiosity card; hiding "Leading" on tablet and mobile.

## 4. Insights — `/curated-design-pages/insights`

**A. Page**
- **NOT FOUND:** template `temp-design-pages/insights`. Built with the Home and What We Do patterns.
- Status: COMPLETE WITH LIMITATIONS.

**B. Figma mapping** (277:59134, 2567:279256, 2567:279881)

| Section | Block | Settings |
|---|---|---|
| Hero ("Informed by perspective Inspired by possibility", eyebrow Insights) | Hero | dark, centred; "Explore our thinking" link with down arrow to `#explore-insights` |
| Text block | Teaser | no image, large regular title |
| Explore insights & opinions | Filter List | details below |
| Quote (Thought leadership institute) | Quote | Serge Perignon attribution (Figma, to verify) |

Filter List settings:
- Query index below `dummy-pages`, content types article, blog, report, case-study, news and whitepaper; sorted latest.
- Pills: AI & Data, Cloud, Customer Experience, Banking, Manufacturing.
- Advanced filter: Industry, Service, Technology, Topic, Content type (OR logic).
- Masonry layout, mixed cards, featured manual (the banking core modernisation insight and the aerospace insight); 9 cards, Load more 6.

**D. Assets**
- New: hero image (the text baked into the Figma export was blurred out).
- Reused: the dummy-page images.

**E. Supporting content (new)**
- Skies of the future (aerospace)
- AI agents need guardrails
- Supply chains resilience reset
- A retailer's journey to smarter fulfilment
- Connected factories
- Personalising the streaming experience
- Inside the technology powering marathon race day

**F. Dynamic retrieval**
- Query index: 10 cards plus 2 featured in the rollout copy.
- The pills filter by the tags.

**Gaps**
- Mobile shows 8 pills in Figma (adds Supply Chain, Sustainability, Future of Work). The Filter List has one pill set for all breakpoints, so the 5 desktop pills were used.
- The hero has no embedded AI search box (the Conversation Canvas comes from the header and footer pages).
- The two-tone text block isn't supported.

## 5. Media and Investor — `/curated-design-pages/media-and-investor` (not "media-investors")

**A. Page**
- **NOT FOUND:** template `temp-design-pages/media-investors`.
- Status: COMPLETE WITH LIMITATIONS.

**B. Figma mapping** (453:37453, 4132:133571, 3817:36933)

| Section | Block | Settings |
|---|---|---|
| Hero ("Progress in motion Stories that matter") | Hero | dark, centred; "Explore what we do" goes to curated What We Do |
| Text block | Teaser | no image |
| Media coverage | List | tagged `topic/media-coverage` |
| Press releases | List | tagged `content-type/press-release` |
| Investor relations | List | fixed; Wisdom AI report as a navy report card |
| Letter from the chairman | Teaser | 8:9 portrait, "Read more" |
| Annual report | List | fixed; brand report card plus 3 chapters |
| Letters from the CEO | List | fixed; Chairman letter as a navy card |
| Blogs | List | tagged `content-type/blog` |
| Media Kit | Teaser | background, Download |

- **Responsive:** all rows scroll horizontally, about 4.2, 2.6 and 1.2 cards visible on desktop, tablet and mobile.
- **D. Assets:** new hero (blurred), Chairman portrait, media kit photo (text cropped off).
- **E. Supporting content (new):**
  - 4 media coverage news pages and 3 press releases (headlines from Figma).
  - Chairman letter.
  - Annual report and its 3 chapters.
  - CEO letters hub and 4 letters.
  - Premiumisation blog.
  - Media kit page.
- **F. Dynamic retrieval:** tagged lists returned 6, 4 and 6 cards in the rollout copy.

**Gaps and verification**
- No financial figures are authored. The "Financial review" chapter says figures are published in the approved report only.
- The Figma headlines naming companies (Zoho ManageEngine, IEM Kolkata, Google Cloud, MyState, Best Buy) are Figma content and need verification.
- Downloads link to supporting pages: no PDF exists in DAM.
- The large TCS logo on the media kit card isn't supported.

## 6. Industry Landing Page — `/curated-design-pages/industry-landing-page` (Banking)

**A. Page**
- Created from `temp-design-pages/industry-landing-page`.
- Status: COMPLETE WITH LIMITATIONS.

**B. Figma mapping** (229:30981, 3289:198057, 3289:198702)

| Section | Block | Settings |
|---|---|---|
| Header ("Banking, built for what's next") | Teaser | H1, image right; the 3-photo mosaic composed into one image |
| The forces reshaping banking | Teaser plus Table List | no image; "Market signals" rows, each linked |
| Banking today | Cards | statistic style, brand colour, compact |
| Banking priorities | Teaser plus Table List | "Where we help", 5 rows |
| What's your ambition | Conversation Canvas | 5 quick actions |
| Insight & Opinion | List | tagged `industry/banking` under insights, 4 cards; "Explore insights" goes to Insights |
| Feature card | List | fixed, feature |
| Intelligence in Action | List | tagged banking + case study (all) |
| Careers in Banking | Teaser | background, 2 CTAs |

**Figma content replaced**
- Statistics: the Figma values (89%, $34 bn, 65, 5.6 m) had placeholder labels and couldn't be verified. They were replaced with qualitative statements: Agent-assisted, Real-time, Intelligent, Trusted.
- Case studies: the Figma cards (Lloyds, Deutsche Bank, Huntington with percentages) were replaced by 3 neutral banking case studies.
- Copy fixes: the duplicated paragraph was removed and the missing apostrophes added.

**Other**
- **E. Supporting content (new):** Payments and real-time finance, and 3 banking case studies.
- **Gaps:**
  - The mosaic is one composed image (no multi-image layout).
  - The 9-photo careers collage was replaced by the existing collage asset.
  - Mobile Canvas pills differ in Figma; one set is used.

## 7. Services — `/curated-design-pages/services` (TCS HyperVault™)

**A. Page**
- Created from `temp-design-pages/l2-services`.
- Status: COMPLETE WITH LIMITATIONS.
- **Responsive:** tablet and mobile are a design-system responsive interpretation, not a Figma match.

**B. Figma mapping** (229:33317)

| Section | Block | Settings |
|---|---|---|
| Secondary header (eyebrow Enterprise product, H1, 3 paragraphs) | Teaser | no image; CTAs "Talk to our infrastructure team" and "Estimate your footprint" (replacing the Figma "Button" placeholders) |
| Built for the physics of AI compute | Cards | statistic, 4 colours, compact |
| Estimate your footprint | Teaser plus image | static estimator image |
| Capabilities | Cards | panel, gradient, 6 |
| Infrastructure, plus the full strength of TCS | Teaser | no image, 4 pill links |
| Intelligence in action | List | fixed, 3 case studies, 1:1 |
| Testimonial | Testimonial | Lloyds quote |
| Related to data centres | List | tagged `topic/data-centres`, horizontal scroll |

**Responsive interpretation**
- Statistic cards: tablet 2 columns, mobile 1.2 cards scrolling.
- Capability panels: tablet 2 columns.
- Lists: horizontal scroll.

**Figma content replaced**
- "1GW" became "Gigawatt scale" (unverified figure).
- The Figma capability titles were TwinX leftovers; data-centre capabilities derived from the page copy were written instead.
- "Five capabilities" heading fixed (there are 6 cards).

**Other**
- **E. Supporting content (new):**
  - 4 data-centre insights (perspective, blog, report, sustainability).
  - Services hub and 8 service pages.
- **Gaps:**
  - Interactive Dashboard is a placeholder that renders nothing, so the estimator is a static, illustrative image (alt text says so).
  - The Lloyds testimonial is borrowed Figma content.

## 8. Product — `/curated-design-pages/product` (TwinX™)

**A. Page**
- Created from `temp-design-pages/l2-product`.
- Status: COMPLETE WITH LIMITATIONS.
- **Responsive:** tablet and mobile are a responsive interpretation.

**B. Figma mapping** (229:32847)

| Section | Block | Settings |
|---|---|---|
| Header ("TwinX™") | Teaser | no image; "Schedule a demo" and "See it simulate" (`#simulate`) |
| Proven impact and outcomes | Cards | statistic, compact |
| Enterprise digital twin platform | Teaser | no image |
| Simulation | Title plus image | static |
| Capabilities | Cards | panel, 6 |
| Two ways | Teaser | links to 2 TwinX pages |
| Intelligence in action | List | fixed, 2 columns |
| Testimonial | Testimonial | |
| Our transformation solutions | Table List | products variation, ™ |
| Because you explored digital twins | List | tagged `topic/digital-twins`; "Explore the collection" goes to Collection |

**Figma content replaced**
- The Figma statistics were TCS corporate leftovers; Envision, Experiment, Execute and Explain were used instead.
- "absolute precision" was softened.

**Other**
- **E. Supporting content (new):**
  - Cognix, TCS BaNCS, TCS ADD.
  - 2 TwinX pillar pages.
  - Decision twins, supply chain simulation, decision intelligence report.
- **Gaps:**
  - The simulation is a static image (Interactive Dashboard is a placeholder).
  - The Figma "Featured" cards were data-centre leftovers; digital-twin pages were used.

## 9. Collection — `/curated-design-pages/collection`

**A. Page**
- Created from `temp-design-pages/l2-collection`.
- Title: "The Agentic bank" (as agreed).
- Status: COMPLETE WITH LIMITATIONS.
- **Responsive:** tablet and mobile are a responsive interpretation.

**B. Figma mapping** (229:31507)

| Section | Block | Settings |
|---|---|---|
| Header | Page Header | article layout; tags agentic AI and banking, "Collection", listen, share and download from code |
| Key question | Teaser | no image, centred; "Ask Canvas" goes to the contact page |
| Explore the Agentic bank | Filter List | details below |
| Related capabilities | Table List | 4 rows, "Services" button goes to curated Services |
| Related collection: Banking beyond transactions | List | fixed, dark panel first, horizontal scroll; "Explore" goes to Industry Landing |

Filter List settings:
- Manual list of 10 pages, masonry.
- Pills: AI & Data, Cloud, Customer Experience, Cybersecurity. The Figma placeholders "Filter 5" to "Filter 7" were dropped.
- Advanced filter; 2 featured pages.

**Other**
- **E. Supporting content (new):** AI agents in everyday banking, KYC, lending, fraud, customer service.
- **Gaps:**
  - The Filter List manual source also reads page data from the query index, so in `language-master` it stays empty until rollout.
  - The two-colour "Related collection" heading isn't supported.
  - Canvas has no "open" link.

## 10. Story — `/curated-design-pages/story`

**A. Page**
- Created from `temp-design-pages/l3-story`.
- Title: "Beyond the Ledger: Activating Intelligence in core banking". Page Type: article (adds About the author).
- Status: COMPLETE WITH LIMITATIONS.
- **Responsive:** tablet and mobile are a responsive interpretation.

**B. Figma mapping** (229:32652)

| Section | Block | Settings |
|---|---|---|
| Header | Page Header | article layout; tags, Story, date, 14 min read, author Priya Sethi (Authors sheet), "Book advisory call" |
| Chapter nav | Anchor List | sticky, 4 chapters, linked to section anchors |
| Summary, Bottleneck, Catalyst, Engine (with "Discover TCS BaNCS™"), Yield (bullets) | Teaser | no image, 2 columns |
| TwinX simulation | Title plus image | |
| Testimonial | Testimonial | |
| Related reading | List | fixed, horizontal scroll; "View all" goes to Insights |
| Life at TCS | Teaser | dark, image right, 2 list-style links |
| What could intelligence unlock | Teaser | no image, dark, 2 CTAs |

**Template and Figma deviations**
- The template's Tabs block was replaced by Anchor List, because the Figma chapter nav is in-page navigation.
- Removed as unverifiable claims: "40% latency", "10,000+ tps" and the stats row (40%, 3x, 8x, 27%), plus the footnote markers [1] and [2].
- Date: Figma "01/12/26" was read as 12 January 2026; please confirm.
- Author: the Figma "Creator Name" placeholder was replaced by the existing author.

**Other**
- **E. Supporting content (new):** The self-defending bank; liquidity modelling case study; contact page.
- **Gaps:**
  - The lead video wasn't authored (no video in Figma).
  - The charts are placeholders in Figma and weren't authored.

## 11. Case Study — `/curated-design-pages/case-study`

**A. Page**
- Created from `temp-design-pages/l3-case-study`.
- Title: "Huntington Bank". Page Type: article.
- Status: COMPLETE WITH LIMITATIONS.
- **Responsive:** tablet and mobile are a responsive interpretation.

**B. Figma mapping** (404:15448)

| Section | Block | Settings |
|---|---|---|
| Header | Page Header | article layout, "Book advisory call" |
| Chapter nav | Anchor List | sticky, 4 chapters |
| Video poster | Teaser | background, "Ready for what's next" |
| Background | Teaser | no image, dark green |
| Approach | Table List | solutions variation; Define, Design, Deliver |
| 5 chapters | Teaser | dark green, image alternating sides, UI screenshots |
| Testimonial | Testimonial | |
| Connected capabilities | List | fixed, 3 case studies, 1:1 |

**Figma content changed**
- Removed claims: "17% uptick", "150 pages, 20 components, 6 templates", "industry-leading".
- The three identical Approach statements were rewritten as distinct ones.
- The client name and UI screenshots are Figma content and need client approval.
- The Lloyds quote on a Huntington page is Figma placeholder content; please confirm or replace it.

**Other**
- **D. Assets:** 6 new (poster plus 5 screenshots placed on the dark green).
- **E. Supporting content (new):** 3 related case studies.
- **Gaps:**
  - No video (only the poster).
  - The second video slot wasn't authored (its image has text baked in).
  - Table List has no dark-green style.

---

## Consolidated summary

| # | Item | Result |
|---|---|---|
| 1 | Target pages requested | 11 |
| 2 | Created | 11, plus the `curated-design-pages` root page (lists the 11) |
| 3 | Updated | 0 (none existed) |
| 4 | Not executed | 0 pages. Not executed actions are listed below |
| 5 | Templates used | 9. The insights and media-investors templates were not found |
| 6 | Components used | Hero, Teaser (no image, background, image left/right; grey, dark, dark green), Cards (statistic, panel), List (fixed, tagged, child pages; image, panel, report, mixed, feature), Filter List (query index, manual), Table List (industries, solutions, products), Testimonial, Quote, Page Header (article), Anchor List, Conversation Canvas, Title, Image, Text |
| 7 | New DAM folders | `/content/dam/tcs-corp/curated-design-pages/` with `dummy-pages`, `what-we-do`, `who-we-are`, `insights`, `media-and-investor`, `industry-landing-page`, `services`, `product`, `story`, `case-study` |
| 8 | New assets | 58 |
| 9 | Reused assets | 47 (Home and dummy-page images already in DAM) |
| 10 | Supporting pages | 119 under `dummy-pages`: 42 from Home, 7 from What We Do, 7 from Who We Are, 63 new |
| 11 | Existing tags reused | 48 |
| 12 | New tags | 29: `capability/*` (13), `topic/people-culture`, `learning`, `inclusion`, `research-innovation`, `heritage`, `industry/aerospace`, `topic/supply-chain`, `sustainability`, `future-of-work`, `media-coverage`, `investor-relations`, `leadership-letters`, `data-centres`, `digital-twins`, `payments`, `content-type/press-release` |
| 13 | Dynamic sections (on the 11 pages) | 8 tagged-page Lists, 2 child-page Lists, 2 Filter Lists (1 query index, 1 manual) and 12 fixed Lists that read the pages' metadata. The supporting pages add related-content and hub Lists |
| 14 | Query index dependencies | See 0.3: rollout to a locale and publish required |
| 15 | Responsive interpretations | Services, Product, Collection, Story, Case Study (tablet and mobile) |
| 16 | Cross-page links | Home to What We Do, Who We Are, Insights, Media and Investor, Industry Landing. Who We Are to What We Do. Media to What We Do. Industry to Insights. Product to Collection. Collection to Services and Industry Landing. Story to Insights and What We Do. Canvas menus list the curated pages |
| 17 | Open gaps | Listed per page |
| 18 | Follow-ups | Below |

### NOT EXECUTED

| Item | Target | Reason | Action |
|---|---|---|---|
| Install the package | AEM author, Package Manager | No author access | Upload and install the zip |
| Create and upload DAM assets directly | `/content/dam/tcs-corp/curated-design-pages` | No author access | Included in the package |
| Create tags in Tagging | `/content/cq:tags/tcs-corp` | No author access | Included in the package (merge) |
| Language-master metadata sheet | `/content/tcs-corp/language-master/en/metadata` | Not in the package; sheets are authored in AEM | Create the sheet and paste `metadata-language-master.csv`. It applies only once language-master is published and listed in the site configuration's `metadata.source`. After rollout to us/en, use `metadata-en-rollout.csv` rows in `/en/metadata` |
| Dynamic results in language-master | Lists and Filter Lists | Not a published locale (0.3) | Roll out to a locale and publish |
| Preview, publish, rollout | — | Not requested | — |
| Templates | `temp-design-pages/insights`, `temp-design-pages/media-investors` | Not found (404) | Check the template names |

### Recommended follow-ups (smallest changes)

1. Install the package, then check the pages in Universal Editor.
2. Approve or replace the Figma claims, names and quotes flagged above, and source clean photos for the heroes whose Figma exports had text baked in.
3. Optional component changes:
   - A navy Teaser colour.
   - A dark style for Table List.
   - Per-breakpoint Filter List pills.
   - Hide a block by breakpoint.
   - A live Interactive Dashboard (estimator and simulation).
   - A video asset for the Story and Case Study.

### Deliverables

| File | Contents |
|---|---|
| `tcs-corp-curated-design-pages-content-1.0.0.zip` | The content package |
| `metadata-language-master.csv`, `metadata-en-rollout.csv` | Bulk metadata (131 rows, 39 columns) |
| `taxonomy.csv`, `tags.csv` | Taxonomy page rows; tag register (existing or new, pages using each) |
| `placeholders.csv` | Every UI text key in the code (95) with its English text, where it's used and its variables |
| `data-authors.csv` | Authors sheet |
| `data-locations.csv`, `data-partners.csv`, `data-social-links.csv`, `data-media-contacts.csv` | Columns of these sheets (empty in the live sheets; no verified content to add) |
