# W3–W5 block mapping (for confirmation)

| | |
|---|---|
| Date | 23 October 2026 |
| Scope | W3 other press releases (20), W4 newsroom (505), W5 investor (132): 657 pages of `The As-is page (Lift and Shift).csv` |
| Method | One sample page of each page type read on tcs.com (36 pages: the components in page order, what each holds) and the crawl of all 657 pages |
| Rules | Existing EDS / Universal Editor blocks only; no header or footer; pages at the CSV's target paths |

Legend: ✅ existing block fits · ⚠️ existing blocks fit with a compromise (recommendation given) · ❌ no block fits (options given)

## 1. W3 — other press releases (20)

| Page type | Pages | Source components (in order) | Target blocks | Fit |
|---|---|---|---|---|
| Press release (NewsRoom template) in investor relations, CSR, UK | 13 | Hero (label, title, date) · rich text · media contacts | Page Header · Image · Text · Table · Title + Text (About TCS) · Media Contacts · List (In the News) · Teaser (Connect with us), as Wave 2 | ✅ |
| Press release (Article / Case Study template) in industries, services, CSR | 5 | Hero · article tags (industry / service) · rich text · quote card · "Related reading" · media contacts | As above, plus **Quote** (quote card), **List** (Related reading, by the page's tags); the article tags become the page's tags (shown by the Page Header) | ✅ |
| Press release hubs (`investor-relations/press-release`, `…/cognitive-business-operations/press-release`) | 2 | Listing (rendered by script, no content in the page) | Page Header (landing) · **List** (child pages, newest first) | ✅ |

## 2. W4 — newsroom (505)

| Page type | Pages | Source components | Target blocks | Fit |
|---|---|---|---|---|
| TCS in the news | 325 | Hero ("TCS in the news", title) · rich text ("As published in …") · "With you for the long run" | Page Header (content type News) · Text · List (More TCS in the news) · Teaser | ✅ |
| News alert | 70 | Hero · rich text · About TCS · media contacts | As press releases (content type News Alert) | ✅ |
| Analyst report | 104 | Hero · rich text · "Download PDF" button | Page Header (content type Analyst Report) · Text · **Button** (the PDF, stored in the DAM) · List · Teaser | ✅ |
| Newsroom home, In the news, Analyst reports, Analyst recognition, News alerts (hubs) | 5 | Hero · listing with filters (Year, Industry, Service) | Page Header (landing) · **Filter List** (its pages, pills by year / industry / service tags) | ✅ |
| Media kit | 1 | Hero · rich text (boilerplate) · logo cards (download PNG) · leadership images · media contacts | Page Header · Text · **Cards** (logos, download links) · **Cards** (leadership images) · Media Contacts | ✅ |

New tags: `content-type/news-alert`, `content-type/analyst-report` (merged); TCS in the news uses `content-type/news` and `topic/media-coverage`.

## 3. W5 — investor (132)

| Page type | Pages | Source components | Target blocks | Fit |
|---|---|---|---|---|
| Corporate action | 61 | Hero only: label, title, date. **No text and no document on the page**; the document (PDF) is only in the "View all corporate actions" listing | Page Header (title, date) · **Button** to the PDF taken from the listing (matched by title) | ⚠️ see D-1 |
| View all corporate actions; Corporate actions hub | 2 | Banner · listing with filters (Year, Month, Category), PDFs | Page Header · **Filter List** (the corporate action pages, by year tags) | ✅ |
| Investor events: AGMs, buybacks, amalgamations | 32 | Hero (date) · Event details (rich text) · related documents (up to 20 PDFs) · download cards · video | Page Header · Text · **Table** or list of document links (PDFs in the DAM) · **Video** (YouTube / Scene7) | ✅ |
| Video overlays (Analyst Day 2016) | 10 | Video with text | Page with **Video** and Text, hidden in navigation (Modal source for the event pages, T-07) | ✅ |
| Quarterly takeaways | 4 | Hero · rich text · video · infographic | Page Header · Text · Video · Image | ✅ |
| Management commentary (strategy, letters, annual report sections, fireside chat) + hub | 6 | Banner · rich text · image · infographic | Page Header · Text · Image; hub: List | ✅ |
| ESG environment / social | 2 | Banner · quote card · rich text · image · stats cards | Page Header · **Quote** · Text · Image · **Teaser** with Stats (teaser-stat items) | ✅ |
| Corporate governance | 1 | Hero · rich text · board member cards · drop-down listing (documents by category) · infographic | Page Header · Text · **Cards** (members) · **Accordion** (a document list per category) · Image | ✅ |
| Investor FAQs (+ reminder letters) | 2 | Banner · questions as headings and answers, answers with tables and PDFs | Page Header · Title + Text per question, **Table** blocks for the tables (an Accordion item can't hold a Table block) | ⚠️ see D-4 |
| Glossary | 1 | Banner · a search / letter filter · terms in rich text | Page Header · **Anchor List** (A–Z) · Text by letter | ⚠️ the source's search box isn't reproduced |
| Stock information | 1 | Banner · in-page links · stock price widget (embed) · cards · table | Page Header · **Anchor List** · **Embed** (the stock widget, if its provider allows it) · Cards · Table | ⚠️ the widget depends on the third-party embed |
| Dividend payment details, subsidiaries, IR contact us, public policy, environmental impact assessments, corporate sustainability | 6 | Banner / hero · rich text (tables) | Page Header · Text · Table | ✅ |
| Financial statements, Erstwhile CMC financials | 2 | Banner · **quarter landing**: a year selector showing that year's quarterly reports (15 PDFs) | Page Header · **Tabs** (one tab a year) with a **Table** of the reports per quarter | ⚠️ see D-2 |
| Investor relations home | 1 | Hero (latest quarter) · key figures · result cards · **quarter overview** (year / quarter selector of the earnings reports) · news and events tabs · ESG cards · quick links · investor contacts | Page Header · **Teaser** with Stats · **Cards** · Tabs + Table (D-2) · **Tabs** (Press releases / Corporate actions / Events / Calendar as Lists) · **Cards** · Button / link list · Text | ⚠️ see D-2 |
| Investor calendar | 1 | Banner · events in tabs (Key dates, Investor conferences) | Page Header · **Tabs** with a **Table** of dates per tab | ⚠️ see D-3 |
| Secondary navigation (on every IR page) | — | The investor relations section menu | Not migrated per page (navigation, like the header) | ⚠️ see D-5 |

## 4. Decisions (confirmed by the user, 23 October 2026: the recommendation of each)

| ID | Topic | Options | Recommendation |
|---|---|---|---|
| D-1 | Corporate action pages have no content on tcs.com | (a) Page Header + date + **Button to the PDF** matched from the listing (crawled for every year); (b) Page Header and date only; (c) don't create the 61 pages, list the corporate actions on the hub only (deviates from the CSV) | **(a)** |
| D-2 | "Quarter overview" / "quarter landing" (pick a year and a quarter, get the reports): no block | (a) **Tabs** (a tab a year) with a **Table** of report links per quarter, no new code; (b) a new "Quarterly reports" block (code, PR, block library); (c) a plain list of PDF links | **(a)**: no new block, authorable in Universal Editor |
| D-3 | Investor calendar: a calendar is updated often | (a) **Tabs + Table** (static, authored); (b) a data sheet (`data/investor-calendar`) read by a List-like block (new code) | **(a)** now; (b) later if IR updates it weekly |
| D-4 | FAQ answers contain tables, which an Accordion item can't hold | (a) **Title + Text + Table per question** (all open); (b) Accordion with the tables flattened to text | **(a)** |
| D-5 | Investor relations section menu | (a) **Not migrated** (navigation, like the header; the site navigation covers it); (b) a Fragment with the section's links at the top of each IR page | **(a)**; (b) if IR wants it |
| D-6 | Investor PDFs (about 400 documents in events, financials, FAQs) | Stored in the DAM `/content/dam/tcs-corp/documents/investor-documents/{yyyy}`, unchanged, with the source URL; **published separately** (DAM files other than images aren't served until published) | As listed |

## 5. What happens after confirmation

1. W3 and W4 (525 pages): the press release builder with a profile per content type (Press Release, News, News Alert, Analyst Report), the analyst report PDFs to the DAM, the hubs as Lists / Filter Lists. Batches of up to 250 pages.
2. W5 (132 pages): a builder per page type above; the PDFs to the DAM; the corporate action listing crawled for every year (D-1).
3. The same checks as Wave 2 (every page without a browser, one in ten in the browser, content fidelity), then the final link pass over all waves, packages, sheet rows and report.
