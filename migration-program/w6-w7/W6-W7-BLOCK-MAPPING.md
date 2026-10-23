# W6–W7 block mapping (for confirmation)

| | |
|---|---|
| Date | 23 October 2026 |
| Scope | W6 careers (221), W7 forms (6) of `The As-is page (Lift and Shift).csv` |
| Method | Component crawl of the pages (every component in page order, with its text, images, links, videos and tabs) |
| Rules | Existing EDS / Universal Editor blocks only; no header or footer; pages at the CSV's target paths |

Legend: ✅ existing block fits · ⚠️ fits with a compromise · ❌ no block fits (options below)

## 1. W6 — careers (221)

| Page type | Pages | Source components (in order) | Target blocks | Fit |
|---|---|---|---|---|
| Careers home | 1 | Hero carousel · text with video · rich text · recognitions (icons) · feature cards · "What's hot" insight cards · "Your path" interactive panel · stories · social links · **world map** of country sites | Hero (first slide; or Gen Carousel for every slide) · Embed (video) · Text · Cards (recognitions) · Cards · List (insights by tag) · Tabs (path panel) · Cards (stories) · **Cards of the country sites** (W6-D3) | ⚠️ |
| Country career page (Argentina … Hungary …) | ~35 | Hero or hero carousel · section menu · text with video · solution cards · tabs · quote · **text over image** banner · icon list · feature list · stories · social links · closing CTA | Page Header (landing) or Hero · Embed · Cards · Tabs · Quote · **Teaser with image** (text over image) · Cards (icons) · Text (feature list) · Cards (stories) · **Teaser** (closing CTA); section menu and social links not migrated (W6-D4) | ✅ |
| Country articles listings (`…/articles`) | 6 | Script-rendered listing (no content of its own) | Page Header (landing) · **List** of its child pages | ✅ |
| Country article (life at TCS, culture, …) | ~60 | Hero · rich text · cards · stats · text over image · **poll** · **author bio** · closing CTA | Page Header (article) · Text · Table · Cards · Teaser stats · Teaser · author (W6-D2) · poll (W6-D1) · Teaser | ⚠️ |
| India pages (entry level, lateral hiring, …) | 28 | Hero · rich text · text with video · solution / feature cards · insight cards · stats · quote · tags · poll · author bio | As country pages and articles; insight cards → **List** (by tag) or Cards | ⚠️ |
| Testimonials | 75 | Hero · rich text (the story, about 350 words) · quote | Page Header (article) · Text · Quote; listing: **List** of the testimonials | ✅ (to confirm once their crawl is complete) |
| Job links, "Apply" / "Explore opportunities" | — | Links to the job site (ATS) | Kept as links to the job site (outside the migration scope) | ✅ |

## 2. W7 — forms (6)

| Page type | Pages | Source | Target | Fit |
|---|---|---|---|---|
| Careers event registration forms (e.g. Agentic AI NextGen careers event) | 6 | Lead-generation form: name, e-mail, phone, primary skill, industry, experience, location (drop-downs), consent; submitted to a TCS back end | **Form Variations** block with the same fields, labels, options and consent text | ❌ submission: see W7-D6 |

## 3. Decisions needed

| ID | Topic | Options | Recommendation |
|---|---|---|---|
| W6-D1 | **Polls** ("Your opinion matters", ~11 pages): an interactive poll with live results; no block shows results | (a) **Leave the poll out** (logged per page); (b) a Form Variations question without results (needs an endpoint) | **(a)** |
| W6-D2 | **Author bios** on articles (~12 pages) | (a) **Authors sheet rows + `author-id` metadata**: the article template already shows "About the author" (existing feature, author images to the DAM); (b) the bio as a Text section on the page | **(a)** |
| W6-D3 | **World map** of the country career sites (careers home) | (a) **Cards** of the country sites by region (links), no map; (b) a new map block (code, PR) | **(a)** |
| W6-D4 | Section menus ("About us · The TCS way · Fake job alert") and social links on country pages | (a) **Not migrated** (navigation, as the IR menu in W5; social links are in the footer); (b) a link row at the top | **(a)** |
| W6-D5 | `careers/denmark` targets `/careers/colombia/articles` in the CSV (looks wrong; every other country is under `/careers`) | (a) **Migrate to `/careers/denmark`** (as the other countries; redirect row); (b) keep the CSV's target | **(a)** |
| W7-D6 | **Form submissions** (6 registration forms): the site has no form back end; Form Variations needs an endpoint (`form-variations:submit` integration) | (a) **Form Variations with every field + an endpoint TCS provides** (submissions go there; until then the form shows its error message); (b) a page with the event text and a **Button to the tcs.com form**; (c) Embed of the tcs.com form (tcs.com may refuse framing) | **(a)** if an endpoint can be provided, else **(b)** |

## 4. After confirmation

Same pipeline as W3–W5: build in batches of up to 250, images and documents to the DAM, checks (every page without a browser, one in ten in the browser), final link pass over every wave (W1–W7), report, packages and sheet rows (Metadata, Redirects, Authors).
