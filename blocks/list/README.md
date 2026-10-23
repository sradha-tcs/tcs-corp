# List

The List is the AEM Core Components **List** for Edge Delivery Services (xwalk / Universal Editor): a list of pages or links taken from the **child pages** of a page, a **fixed list** of List Items, or **tagged pages**, shown as cards (image, panel, report, statistic, an optional feature card) or as rows of links, in a grid or a horizontal scroller chosen separately for desktop, tablet and mobile. Its cards are built from the listed pages' metadata, read from the published query index; a List Item can override each value of its page. The presentation follows the TCS DS Figma List variations 1–14 and is shared with the [Cards](../cards/README.md) block, the manual authoring alternative (cards typed in the block instead of pages): the same settings, markup and styles.

| Attribute | Value |
| --------- | ----- |
| Technical name | `list` (model `list`, template name "List"); item `list-item` (model `list-item`, template name "List Item") |
| Display name | List; item List Item |
| Block type | Key-value block (one row per property) with item children |
| Status | Active |
| Parent / children | Parents: Section, Columns Container, Tabs Container (filters `section`, `columns-container`, `tabs`). Children: List Item (`list-item`), filter `list` |
| Owner / version / date | Not recorded / Not recorded / Not recorded |

## Overview

- **Business purpose:** keeps listings of site content up to date without manual work. When an author publishes a new child page or tags a page, every List that selects it shows the new card, with the title, text and image the page defines in its metadata. Authors decide what is listed (source, tags, order, maximum) and how it looks; page owners maintain the card content once, on the page.
- **User experience:** an optional header (title, description, a CTA on the right), then the cards or rows. Each breakpoint is a grid or a horizontal scroller with optional previous / next buttons and a scroll indicator. While the query index loads (more than 150ms), a skeleton in the list's layout keeps the section visible.
- **Templates / page types:** any page; no template adds or removes it. Typical: home and landing pages (child pages, curated selections), article and blog pages (related tagged pages), press-release and news overview pages (rows of links ordered by date).
- **Data source:** the locale's published query index (`/query-index.json`, `helix-query.yaml`), the redirects sheet (`/{locale}/redirects.json`), the Authors sheet (feature card only), the taxonomy (tag labels) and the placeholders (UI text). List Items add authored values on top.
- **Related blocks:** [Cards](../cards/README.md) (the same presentation, content typed in the block), [Filter List](../filter-list/README.md) (query index lists with filter pills and sorting), [Table List](../table-list/README.md) (tabular listings), [Page Header](../page-header/README.md) (uses the same page metadata).

| Source | What it lists |
|---|---|
| Child pages (`parent`) | The pages below the **Parent page** (or the current page): its children, or down to the **Child depth** |
| Fixed list (`fixed`) | The List Items in their order: pages (their metadata, with the item's overrides), paths or external URLs. Pages authored before List Items (`pageItems`, `pages`) come first, a List Item for one of them takes its place |
| Tagged pages (`tags`) | The pages below the **Search root** (or the current page) with **any** or **all** of the **Tags**; never the current page |

- **When to use:** the cards represent published, indexed pages of the same locale; the list should update itself (Child pages, Tagged pages); the cards should reuse the pages' own metadata; ordering by title or last modified, or a maximum number of items, is needed.
- **When not to use:** content that isn't a page (statistics without detail pages, capabilities with their own wording, rich text descriptions): use [Cards](../cards/README.md); visitors must filter or search: use [Filter List](../filter-list/README.md); Content Fragment lists (not supported, by decision); full-text search (the Core List search source isn't available); pages of another locale.
- **Realistic use cases:** a services hub listing its child pages; "Related to Agentic AI" rails of tagged insights; news rows ordered by last modified; media coverage and investor relations rails of report pages (Mixed); editor's picks with per-item title overrides; statistic rows (a Fixed list with the number as Title); a featured spotlight with the author's photo and designation (First card as feature); external partner links mixed with site pages.

## Visual Reference

<!-- BEGIN GENERATED: screenshots (npm run build:docs) -->

Screenshots of the handover (6.16 List Block), taken on the preview with sample content; they show the rendering at the time of the handover revision that added them (later changes are in the sections below and the handover's revision history):

**Desktop rendering** — The List at 1440 px: the title Insights and its description on the left, the View all text link on the right, and four image cards in one row (The agentic bank, Cloud at scale, The energy transition, The future of work) with thumbnail images, kickers, titles, descriptions, content types and dates, the first four child pages in path order.

![Desktop rendering: The List at 1440 px: the title Insights and its description on the left, the View all text link on the right, and four image cards in one row The agentic bank, Cloud at scale, The energy transition, The future of work with thumbnai](../../docs/handover/screenshots/list-desktop-view.jpg)

**Tablet rendering** — The same Insights List at 1024 px: a 2rem title with the description and View all on the right, and the four image cards (The agentic bank, Cloud at scale, The energy transition, The future of work) in one row of four narrower columns with 1.25rem titles.

![Tablet rendering: The same Insights List at 1024 px: a 2rem title with the description and View all on the right, and the four image cards The agentic bank, Cloud at scale, The energy transition, The future of work in one row of four narrower columns](../../docs/handover/screenshots/list-tablet-view.jpg)

**Mobile rendering** — The Insights List at 402 px: the title, the description and the View all link stacked, then the four image cards (The agentic bank, Cloud at scale, The energy transition, The future of work) in one column with a 1rem gap.

![Mobile rendering: The Insights List at 402 px: the title, the description and the View all link stacked, then the four image cards The agentic bank, Cloud at scale, The energy transition, The future of work in one column with a 1rem gap.](../../docs/handover/screenshots/list-mobile-view.jpg)

**Child pages source** — At 1440 px the title Our industries with the description Deep domain knowledge for the industries we serve, above three image cards in one row (Banking, Manufacturing, Retail), the child pages of /en/industries in path order, each with its image, industry tag, title, description and date.

![Child pages source: At 1440 px the title Our industries with the description Deep domain knowledge for the industries we serve, above three image cards in one row Banking, Manufacturing, Retail, the child pages of /en/industries in path order, each w](../../docs/handover/screenshots/list-source-child-pages.jpg)

**Child pages with depth** — At 1440 px the title Services and offerings above five image cards of the child and grandchild pages of /en/services, sorted by title: AI and data, Cloud, Cloud migration (no image area, eyebrow Offering), Consulting and Cybersecurity, four in the first row and one in the second.

![Child pages with depth: At 1440 px the title Services and offerings above five image cards of the child and grandchild pages of /en/services, sorted by title: AI and data, Cloud, Cloud migration no image area, eyebrow Offering, Consulting and Cyberse](../../docs/handover/screenshots/list-source-child-depth.jpg)

**Fixed list source** — At 1440 px the title Editor's picks above four image cards in authored order: The agentic bank, Cloud services for the enterprise (title override on the Cloud page), Supply chain resilience, and the external Joint solutions with our partners with photo-6, the eyebrow Partner and its description.

![Fixed list source: At 1440 px the title Editor's picks above four image cards in authored order: The agentic bank, Cloud services for the enterprise title override on the Cloud page, Supply chain resilience, and the external Joint solutions with our ](../../docs/handover/screenshots/list-source-fixed.jpg)

**Tagged pages source (any)** — At 1440 px the title Related to Agentic AI above a rail of Mixed cards bleeding to the right edge, the AI-tagged pages below /en in path order: image cards The future of work, Touchless insurance claims, Personalisation in retail, the gradient report card State of AI 2026 with Download, and AI and data.

![Tagged pages source any: At 1440 px the title Related to Agentic AI above a rail of Mixed cards bleeding to the right edge, the AI-tagged pages below /en in path order: image cards The future of work, Touchless insurance claims, Personalisation in re](../../docs/handover/screenshots/list-source-tagged-any.jpg)

**Tagged pages source (all)** — At 1440 px the title AI in industry with its description above two image cards, Touchless insurance claims and Personalisation in retail, the only insights tagged with AI and an industry; the other two columns of the 4-column grid stay empty.

![Tagged pages source all: At 1440 px the title AI in industry with its description above two image cards, Touchless insurance claims and Personalisation in retail, the only insights tagged with AI and an industry; the other two columns of the 4-column](../../docs/handover/screenshots/list-source-tagged-all.jpg)

**Order by title** — At 1440 px the title Insights A to Z above four image cards, the Insights child pages sorted by title: Cloud at scale, Personalisation in retail, Quantum readiness (no image area) and State of AI 2026.

![Order by title: At 1440 px the title Insights A to Z above four image cards, the Insights child pages sorted by title: Cloud at scale, Personalisation in retail, Quantum readiness no image area and State of AI 2026.](../../docs/handover/screenshots/list-order-title.jpg)

**Order by last modified** — At 1440 px the title Latest news above five rows of links, newest first: The agentic bank, Cloud at scale, State of AI 2026, Supply chain resilience and Personalisation in retail, each with eyebrow or content type and a tag, a large title, the description, the date and an arrow.

![Order by last modified: At 1440 px the title Latest news above five rows of links, newest first: The agentic bank, Cloud at scale, State of AI 2026, Supply chain resilience and Personalisation in retail, each with eyebrow or content type and a tag, a](../../docs/handover/screenshots/list-order-last-modified.jpg)

**Maximum items** — At 1440 px the title Latest insights above four image cards, the four most recently modified of the nine insights with a content type tag: The agentic bank, Cloud at scale, State of AI 2026 and Supply chain resilience.

![Maximum items: At 1440 px the title Latest insights above four image cards, the four most recently modified of the nine insights with a content type tag: The agentic bank, Cloud at scale, State of AI 2026 and Supply chain resilience.](../../docs/handover/screenshots/list-max-items.jpg)

**Fallback items** — At 1440 px the title Insights for Europe above two image cards, The agentic bank and State of AI 2026: no page has the Europe tag, so the two fallback List Items show, built from the pages' metadata, in the first two columns.

![Fallback items: At 1440 px the title Insights for Europe above two image cards, The agentic bank and State of AI 2026: no page has the Europe tag, so the two fallback List Items show, built from the pages' metadata, in the first two columns.](../../docs/handover/screenshots/list-fallback-items.jpg)

**Image card style** — At 1440 px the title Latest insights above four image cards, newest first: The agentic bank, Cloud at scale, State of AI 2026 and Supply chain resilience, each with a 16:9 image, an uppercase kicker of eyebrow, tags and reading time, the title, the description and content type with date.

![Image card style: At 1440 px the title Latest insights above four image cards, newest first: The agentic bank, Cloud at scale, State of AI 2026 and Supply chain resilience, each with a 16:9 image, an uppercase kicker of eyebrow, tags and reading time](../../docs/handover/screenshots/list-image-card.jpg)

**Panel card style** — At 1440 px the title What we do above four tall dark #20293c panels, the Services child pages in path order: AI and data, Cloud, Consulting and Cybersecurity, each with the eyebrow Service, a large light title, the description and Explore.

![Panel card style: At 1440 px the title What we do above four tall dark #20293c panels, the Services child pages in path order: AI and data, Cloud, Consulting and Cybersecurity, each with the eyebrow Service, a large light title, the description and E](../../docs/handover/screenshots/list-panel-card.jpg)

**Report card style** — At 1440 px the title Research and case studies above four gradient report cards in path order: The energy transition, Touchless insurance claims, Quantum readiness and State of AI 2026, each with content type and date, a large title, the description and an outlined Download button.

![Report card style: At 1440 px the title Research and case studies above four gradient report cards in path order: The energy transition, Touchless insurance claims, Quantum readiness and State of AI 2026, each with content type and date, a large titl](../../docs/handover/screenshots/list-report-card.jpg)

**Statistic card style** — At 1440 px the title At a glance above four light grey statistic cards: 150,000+ Colleagues, 46 Countries, 1,200+ Clients and 100% Renewable power, each with the large number at the top and the label and description at the bottom.

![Statistic card style: At 1440 px the title At a glance above four light grey statistic cards: 150,000+ Colleagues, 46 Countries, 1,200+ Clients and 100% Renewable power, each with the large number at the top and the label and description at the botto](../../docs/handover/screenshots/list-statistic-card.jpg)

**Mixed card style** — At 1440 px the title Explore our thinking above a rail of six Mixed cards in authored order: image card The agentic bank, report card State of AI 2026, dark panel Cloud migration with Explore, image card Cloud at scale, report card Quantum readiness and image card The future of work.

![Mixed card style: At 1440 px the title Explore our thinking above a rail of six Mixed cards in authored order: image card The agentic bank, report card State of AI 2026, dark panel Cloud migration with Explore, image card Cloud at scale, report card ](../../docs/handover/screenshots/list-mixed.jpg)

**Feature card** — At 1440 px the title Insight and opinion, a full-width feature for The agentic bank with its image, the tags Banking and Article, reading time 8m, the title and Anita Rao, Head of Banking Research, then three image cards: Cloud at scale, State of AI 2026 and Supply chain resilience.

![Feature card: At 1440 px the title Insight and opinion, a full-width feature for The agentic bank with its image, the tags Banking and Article, reading time 8m, the title and Anita Rao, Head of Banking Research, then three image cards: Cloud at scale](../../docs/handover/screenshots/list-feature-card.jpg)

**Rows of links** — At 1440 px the title AI in the news above four rows of links, newest first: State of AI 2026, Personalisation in retail, The future of work and Touchless insurance claims, each with eyebrow or content type and a tag, a large title, description, date and an arrow, without lines.

![Rows of links: At 1440 px the title AI in the news above four rows of links, newest first: State of AI 2026, Personalisation in retail, The future of work and Touchless insurance claims, each with eyebrow or content type and a tag, a large title, des](../../docs/handover/screenshots/list-rows-of-links.jpg)

**Dark card colour** — At 1440 px the title Industries and facts above four #20293c cards with light text: the Banking and Retail panels with their tag, description and Explore, then the statistic cards 150,000+ Colleagues and 46 Countries.

![Dark card colour: At 1440 px the title Industries and facts above four #20293c cards with light text: the Banking and Retail panels with their tag, description and Explore, then the statistic cards 150,000+ Colleagues and 46 Countries.](../../docs/handover/screenshots/list-colour-dark.jpg)

**Navy card colour** — At 1440 px the title Research and case studies above four #011627 navy report cards (The energy transition, Touchless insurance claims, Quantum readiness, State of AI 2026) with light text, content type and date, and light outlined Download buttons.

![Navy card colour: At 1440 px the title Research and case studies above four #011627 navy report cards The energy transition, Touchless insurance claims, Quantum readiness, State of AI 2026 with light text, content type and date, and light outlined Do](../../docs/handover/screenshots/list-colour-navy.jpg)

**Brand blue card colour** — At 1440 px the title At a glance above four statistic cards: 150,000+, 1,200+ and 100% on light grey, and 46 Countries on brand blue #4673db with white text.

![Brand blue card colour: At 1440 px the title At a glance above four statistic cards: 150,000+, 1,200+ and 100% on light grey, and 46 Countries on brand blue #4673db with white text.](../../docs/handover/screenshots/list-colour-brand.jpg)

**Light blue card colour** — At 1440 px the title At a glance above four statistic cards: 150,000+, 46 and 100% on light grey, and 1,200+ Clients on light blue #a7c8f1 with black text.

![Light blue card colour: At 1440 px the title At a glance above four statistic cards: 150,000+, 46 and 100% on light grey, and 1,200+ Clients on light blue #a7c8f1 with black text.](../../docs/handover/screenshots/list-colour-brand-light.jpg)

**Light grey card colour** — At 1440 px the title Industries above three tall light grey #d9d9d9 panels in one row (Banking, Manufacturing, Retail) with black titles, the industry tag as kicker, the description and Explore.

![Light grey card colour: At 1440 px the title Industries above three tall light grey #d9d9d9 panels in one row Banking, Manufacturing, Retail with black titles, the industry tag as kicker, the description and Explore.](../../docs/handover/screenshots/list-colour-grey.jpg)

**Mid grey card colour** — At 1440 px the title At a glance above four statistic cards: 150,000+ Colleagues on mid grey #999 with black text, then 46, 1,200+ and 100% on light grey.

![Mid grey card colour: At 1440 px the title At a glance above four statistic cards: 150,000+ Colleagues on mid grey #999 with black text, then 46, 1,200+ and 100% on light grey.](../../docs/handover/screenshots/list-colour-mid-grey.jpg)

**Grey gradient card colour** — At 1440 px the title At a glance above four statistic cards: 150,000+, 46 and 1,200+ on light grey, and 100% Renewable power on the diagonal grey gradient.

![Grey gradient card colour: At 1440 px the title At a glance above four statistic cards: 150,000+, 46 and 1,200+ on light grey, and 100% Renewable power on the diagonal grey gradient.](../../docs/handover/screenshots/list-colour-gradient.jpg)

**Image background card colour** — At 1440 px the title Industries above three tall panels in one row: Banking filled with its photograph behind the tag, title, description and Explore, then Retail and Manufacturing as dark #20293c panels.

![Image background card colour: At 1440 px the title Industries above three tall panels in one row: Banking filled with its photograph behind the tag, title, description and Explore, then Retail and Manufacturing as dark #20293c panels.](../../docs/handover/screenshots/list-colour-image.jpg)

**Square image ratio** — At 1440 px the title Latest insights above four image cards with square images: The agentic bank, Cloud at scale, The energy transition and The future of work.

![Square image ratio: At 1440 px the title Latest insights above four image cards with square images: The agentic bank, Cloud at scale, The energy transition and The future of work.](../../docs/handover/screenshots/list-ratio-1-1.jpg)

**4:3 image ratio** — At 1440 px the title Latest insights above four image cards with 4:3 images: The agentic bank, Cloud at scale, The energy transition and The future of work.

![4:3 image ratio: At 1440 px the title Latest insights above four image cards with 4:3 images: The agentic bank, Cloud at scale, The energy transition and The future of work.](../../docs/handover/screenshots/list-ratio-4-3.jpg)

**3:2 image ratio** — At 1440 px the title Latest insights above four image cards with 3:2 images: The agentic bank, Cloud at scale, The energy transition and The future of work.

![3:2 image ratio: At 1440 px the title Latest insights above four image cards with 3:2 images: The agentic bank, Cloud at scale, The energy transition and The future of work.](../../docs/handover/screenshots/list-ratio-3-2.jpg)

**Compact panel height** — At 1440 px the title At a glance above four nearly square (9:10) light grey statistic cards: 150,000+ Colleagues, 46 Countries, 1,200+ Clients and 100% Renewable power.

![Compact panel height: At 1440 px the title At a glance above four nearly square 9:10 light grey statistic cards: 150,000+ Colleagues, 46 Countries, 1,200+ Clients and 100% Renewable power.](../../docs/handover/screenshots/list-panel-compact.jpg)

**Content panel height** — At 1440 px the title What we do above four dark panels (AI and data, Cloud, Consulting, Cybersecurity) only as tall as their eyebrow, title, description and Explore, equal within the row.

![Content panel height: At 1440 px the title What we do above four dark panels AI and data, Cloud, Consulting, Cybersecurity only as tall as their eyebrow, title, description and Explore, equal within the row.](../../docs/handover/screenshots/list-panel-content.jpg)

**Compact statistic title** — At 1440 px the title What we stand for above three grey statistic cards with medium statement titles (AI that works for the whole enterprise, Cloud that scales with the business, Security built into every layer), the kicker Service, labels, descriptions and outlined Learn more buttons.

![Compact statistic title: At 1440 px the title What we stand for above three grey statistic cards with medium statement titles AI that works for the whole enterprise, Cloud that scales with the business, Security built into every layer, the kicker Ser](../../docs/handover/screenshots/list-stat-compact.jpg)

**Dividers between rows** — At 1440 px the title Latest news above four rows (The agentic bank, Cloud at scale, State of AI 2026, Supply chain resilience) separated by thin grey lines, each with eyebrow and tag, a large title, description, date and an arrow.

![Dividers between rows: At 1440 px the title Latest news above four rows The agentic bank, Cloud at scale, State of AI 2026, Supply chain resilience separated by thin grey lines, each with eyebrow and tag, a large title, description, date and an arrow](../../docs/handover/screenshots/list-dividers.jpg)

**Centred header** — At 1440 px the centred title What we do and the description Services that help enterprises grow, transform and compete, above four image cards: AI and data, Cloud, Consulting and Cybersecurity.

![Centred header: At 1440 px the centred title What we do and the description Services that help enterprises grow, transform and compete, above four image cards: AI and data, Cloud, Consulting and Cybersecurity.](../../docs/handover/screenshots/list-header-centred.jpg)

**Header call to action** — At 1440 px the title News with the primary button View all news on the right, above four image cards of the newest insights: The agentic bank, Cloud at scale, State of AI 2026 and Supply chain resilience.

![Header call to action: At 1440 px the title News with the primary button View all news on the right, above four image cards of the newest insights: The agentic bank, Cloud at scale, State of AI 2026 and Supply chain resilience.](../../docs/handover/screenshots/list-header-cta.jpg)

**Grid on every breakpoint** — At 1440 px only: the title Latest insights above the eight newest insights in a 4-column grid of two rows, from The agentic bank to The future of work. The mobile one-column layout isn't part of this screenshot.

![Grid on every breakpoint: At 1440 px only: the title Latest insights above the eight newest insights in a 4-column grid of two rows, from The agentic bank to The future of work. The mobile one-column layout isn't part of this screenshot.](../../docs/handover/screenshots/list-grid-all.jpg)

**Horizontal scroll on every breakpoint** — At 1440 px only: the title Latest insights above a rail of about 4.2 image cards of the eight newest insights, cut at the right screen edge, with the scroll indicator and the Previous (disabled) and Next buttons below.

![Horizontal scroll on every breakpoint: At 1440 px only: the title Latest insights above a rail of about 4.2 image cards of the eight newest insights, cut at the right screen edge, with the scroll indicator and the Previous disabled and Next buttons b](../../docs/handover/screenshots/list-scroll-all.jpg)

**Desktop-only scroll** — At 1440 px only: the title Latest insights above a rail of about 4.2 image cards cut at the right screen edge, without buttons or indicator. The tablet and mobile grids aren't part of this screenshot.

![Desktop-only scroll: At 1440 px only: the title Latest insights above a rail of about 4.2 image cards cut at the right screen edge, without buttons or indicator. The tablet and mobile grids aren't part of this screenshot.](../../docs/handover/screenshots/list-scroll-desktop-only.jpg)

**Tablet-only scroll** — At 1024 px only: the title Latest insights above a tablet rail of about 3.3 image cards cut at the right edge, without buttons or indicator. The desktop and mobile grids aren't part of this screenshot.

![Tablet-only scroll: At 1024 px only: the title Latest insights above a tablet rail of about 3.3 image cards cut at the right edge, without buttons or indicator. The desktop and mobile grids aren't part of this screenshot.](../../docs/handover/screenshots/list-scroll-tablet-only.jpg)

**Mobile-only scroll** — At 402 px only: the title Latest insights above a mobile rail with one full card and part of the next, and the scroll indicator below. The desktop and tablet grids aren't part of this screenshot.

![Mobile-only scroll: At 402 px only: the title Latest insights above a mobile rail with one full card and part of the next, and the scroll indicator below. The desktop and tablet grids aren't part of this screenshot.](../../docs/handover/screenshots/list-scroll-mobile-only.jpg)

**Desktop and tablet scroll** — At 1024 px only: the title Latest insights above a tablet rail of about 3.3 image cards cut at the right edge. The desktop rail and the mobile column aren't part of this screenshot.

![Desktop and tablet scroll: At 1024 px only: the title Latest insights above a tablet rail of about 3.3 image cards cut at the right edge. The desktop rail and the mobile column aren't part of this screenshot.](../../docs/handover/screenshots/list-scroll-desktop-tablet.jpg)

**Desktop and mobile scroll** — At 1024 px only: the title Latest insights above the eight newest insights in a 2-column grid of four rows (Tablet columns 2). The desktop and mobile rails aren't part of this screenshot.

![Desktop and mobile scroll: At 1024 px only: the title Latest insights above the eight newest insights in a 2-column grid of four rows Tablet columns 2. The desktop and mobile rails aren't part of this screenshot.](../../docs/handover/screenshots/list-scroll-desktop-mobile.jpg)

**Tablet and mobile scroll** — At 402 px only: the title Latest insights above a mobile rail of 1.2 image cards with the scroll indicator below. The tablet rail and the 4-column desktop grid aren't part of this screenshot.

![Tablet and mobile scroll: At 402 px only: the title Latest insights above a mobile rail of 1.2 image cards with the scroll indicator below. The tablet rail and the 4-column desktop grid aren't part of this screenshot.](../../docs/handover/screenshots/list-scroll-tablet-mobile.jpg)

**Previous and next buttons** — At 1440 px the title Latest insights above a desktop rail of about 4.2 cards at its start, with two round chevron buttons below on the right: Previous disabled, Next enabled.

![Previous and next buttons: At 1440 px the title Latest insights above a desktop rail of about 4.2 cards at its start, with two round chevron buttons below on the right: Previous disabled, Next enabled.](../../docs/handover/screenshots/list-previous-next.jpg)

**Scroll indicator** — At 402 px the title Latest insights above a mobile rail with one full card and part of the next, and below it the thin grey indicator track with a darker thumb at the left.

![Scroll indicator: At 402 px the title Latest insights above a mobile rail with one full card and part of the next, and below it the thin grey indicator track with a darker thumb at the left.](../../docs/handover/screenshots/list-scroll-indicator.jpg)

**Fixed card width** — At 1440 px the title Latest insights above a desktop rail of 20rem (320 px) wide image cards running to the right screen edge, more cards visible than with the default 4.2.

![Fixed card width: At 1440 px the title Latest insights above a desktop rail of 20rem 320 px wide image cards running to the right screen edge, more cards visible than with the default 4.2.](../../docs/handover/screenshots/list-fixed-card-width.jpg)

**Scroller inside the content width** — At 1440 px the title Latest insights above a desktop rail of about 4.2 image cards whose last visible card is cut at the section padding, not at the screen edge.

![Scroller inside the content width: At 1440 px the title Latest insights above a desktop rail of about 4.2 image cards whose last visible card is cut at the section padding, not at the screen edge.](../../docs/handover/screenshots/list-edge-none.jpg)

**Centre snap alignment** — At 402 px the mobile rail after a short swipe: the second card, Cloud at scale, snapped to the centre with slivers of The agentic bank and State of AI 2026 on both sides, and the indicator below.

![Centre snap alignment: At 402 px the mobile rail after a short swipe: the second card, Cloud at scale, snapped to the centre with slivers of The agentic bank and State of AI 2026 on both sides, and the indicator below.](../../docs/handover/screenshots/list-snap-center.jpg)

**Viewport scroll step** — At 1440 px the desktop rail after one click on Next: scrolled by a screenful to its end, showing the last cards up to The future of work, with Previous now enabled.

![Viewport scroll step: At 1440 px the desktop rail after one click on Next: scrolled by a screenful to its end, showing the last cards up to The future of work, with Previous now enabled.](../../docs/handover/screenshots/list-step-viewport.jpg)

**Loop** — At 1440 px the desktop rail after four clicks on Next: scrolled to its end with The future of work as the last card, and Next still enabled because Loop is on (the next click would return to the first card).

![Loop: At 1440 px the desktop rail after four clicks on Next: scrolled to its end with The future of work as the last card, and Next still enabled because Loop is on the next click would return to the first card.](../../docs/handover/screenshots/list-loop.jpg)

**Initial item** — At 1440 px the title Latest insights above a desktop rail opened at its third card, State of AI 2026, as the first visible card, with Previous and Next enabled below.

![Initial item: At 1440 px the title Latest insights above a desktop rail opened at its third card, State of AI 2026, as the first visible card, with Previous and Next enabled below.](../../docs/handover/screenshots/list-initial-item.jpg)

**Equal card height** — At 1440 px the title Latest insights above the eight newest insights in a 4-column grid of two rows of exactly the same height.

![Equal card height: At 1440 px the title Latest insights above the eight newest insights in a 4-column grid of two rows of exactly the same height.](../../docs/handover/screenshots/list-equal-height.jpg)

**Cards not stretched** — At 1440 px the title Explore above four image cards of different heights aligned to the top: Consulting with its image, Cloud migration and About us without image areas, and The agentic bank with image and meta.

![Cards not stretched: At 1440 px the title Explore above four image cards of different heights aligned to the top: Consulting with its image, Cloud migration and About us without image areas, and The agentic bank with image and meta.](../../docs/handover/screenshots/list-no-stretch.jpg)

**Unlinked cards** — At 1440 px the title At a glance above four light grey statistic cards (150,000+ Colleagues, 46 Countries, 1,200+ Clients, 100% Renewable power) without links or buttons.

![Unlinked cards: At 1440 px the title At a glance above four light grey statistic cards 150,000+ Colleagues, 46 Countries, 1,200+ Clients, 100% Renewable power without links or buttons.](../../docs/handover/screenshots/list-unlinked.jpg)

**New-tab links** — At 1440 px the title Partners and insights above three image cards: The agentic bank, Cloud at scale and Joint solutions with our partners with photo-6 and eyebrow Partner, whose title is underlined under the mouse pointer.

![New-tab links: At 1440 px the title Partners and insights above three image cards: The agentic bank, Cloud at scale and Joint solutions with our partners with photo-6 and eyebrow Partner, whose title is underlined under the mouse pointer.](../../docs/handover/screenshots/list-new-tab.jpg)

**Legacy list** — At 1440 px a List made before this version: the large heading Our latest thinking and below it the primary button Explore all insights, without any cards.

![Legacy list: At 1440 px a List made before this version: the large heading Our latest thinking and below it the primary button Explore all insights, without any cards.](../../docs/handover/screenshots/list-legacy.jpg)

**Empty state** — The page at 1440 px with two Lists: below Insights for Europe a grey rounded box with There are no items to show., and below Related insights, rendered as in Universal Editor, the hint The pages show on the published page (from the query index).

![Empty state: The page at 1440 px with two Lists: below Insights for Europe a grey rounded box with There are no items to show., and below Related insights, rendered as in Universal Editor, the hint The pages show on the published page from the query ](../../docs/handover/screenshots/list-empty-state.jpg)

**Figma variation 1** — At 1440 px the title Themes above three tall panels in one row: Agentic AI on dark #20293c, The future of work on brand blue and Sustainability with the energy transition image behind it, each with the eyebrow Theme, the page description and Explore.

![Figma variation 1: At 1440 px the title Themes above three tall panels in one row: Agentic AI on dark #20293c, The future of work on brand blue and Sustainability with the energy transition image behind it, each with the eyebrow Theme, the page descr](../../docs/handover/screenshots/list-figma-01-themes.jpg)

**Figma variation 2** — At 1440 px the title Insight and opinion with View all on the right, a feature for The agentic bank with Anita Rao, then Supply chain resilience, a dark Cloud migration panel, The future of work and Personalisation in retail with square images.

![Figma variation 2: At 1440 px the title Insight and opinion with View all on the right, a feature for The agentic bank with Anita Rao, then Supply chain resilience, a dark Cloud migration panel, The future of work and Personalisation in retail with s](../../docs/handover/screenshots/list-figma-02-insight-opinion.jpg)

**Figma variation 3** — At 1440 px the title Related above a rail of Mixed cards bleeding to the right edge: image cards Cloud at scale, The future of work, Touchless insurance claims and Personalisation in retail, and the gradient report card State of AI 2026.

![Figma variation 3: At 1440 px the title Related above a rail of Mixed cards bleeding to the right edge: image cards Cloud at scale, The future of work, Touchless insurance claims and Personalisation in retail, and the gradient report card State of AI](../../docs/handover/screenshots/list-figma-03-related.jpg)

**Figma variation 4** — At 1440 px the title Intelligence in action above three service pages as image cards in one row (Consulting, AI and data, Cloud) with square images, the eyebrow Service and tag, titles and descriptions.

![Figma variation 4: At 1440 px the title Intelligence in action above three service pages as image cards in one row Consulting, AI and data, Cloud with square images, the eyebrow Service and tag, titles and descriptions.](../../docs/handover/screenshots/list-figma-04-intelligence-in-action.jpg)

**Figma variation 5** — At 1440 px the title News with the primary button All news on the right, above five rows separated by grey lines: The agentic bank, Cloud at scale, State of AI 2026, Supply chain resilience and Personalisation in retail.

![Figma variation 5: At 1440 px the title News with the primary button All news on the right, above five rows separated by grey lines: The agentic bank, Cloud at scale, State of AI 2026, Supply chain resilience and Personalisation in retail.](../../docs/handover/screenshots/list-figma-05-news.jpg)

**Figma variation 6** — At 1440 px the title At a glance above four light grey statistic cards in one row: 150,000+ Colleagues, 46 Countries, 1,200+ Clients and 100% Renewable power. The mobile rail isn't part of this screenshot.

![Figma variation 6: At 1440 px the title At a glance above four light grey statistic cards in one row: 150,000+ Colleagues, 46 Countries, 1,200+ Clients and 100% Renewable power. The mobile rail isn't part of this screenshot.](../../docs/handover/screenshots/list-figma-06-at-a-glance.jpg)

**Figma variation 7** — At 1440 px the title What we stand for above three grey statistic cards with medium statement titles, the kicker Service, the labels AI and data, Cloud and Cybersecurity, descriptions and outlined Learn more buttons.

![Figma variation 7: At 1440 px the title What we stand for above three grey statistic cards with medium statement titles, the kicker Service, the labels AI and data, Cloud and Cybersecurity, descriptions and outlined Learn more buttons.](../../docs/handover/screenshots/list-figma-07-statements.jpg)

**Figma variation 8** — At 1440 px the title Media coverage above a rail: image cards The agentic bank, Cloud at scale and The future of work, navy report cards Quantum readiness and State of AI 2026, and Supply chain resilience at the right edge.

![Figma variation 8: At 1440 px the title Media coverage above a rail: image cards The agentic bank, Cloud at scale and The future of work, navy report cards Quantum readiness and State of AI 2026, and Supply chain resilience at the right edge.](../../docs/handover/screenshots/list-figma-08-media-coverage.jpg)

**Figma variation 9** — At 1440 px the title Investor relations above a rail of the six newest Insights child pages: image cards The agentic bank and Cloud at scale, the navy report card State of AI 2026, then image cards Supply chain resilience, Personalisation in retail and The energy transition.

![Figma variation 9: At 1440 px the title Investor relations above a rail of the six newest Insights child pages: image cards The agentic bank and Cloud at scale, the navy report card State of AI 2026, then image cards Supply chain resilience, Personal](../../docs/handover/screenshots/list-figma-09-investor-relations.jpg)

**Figma variation 10** — At 1440 px the title Banking today above four brand blue statistic cards with white text: 8 of 10 Core banking, 2bn Payments, 40% Risk and compliance and 24/7 Customer experience. The mobile rail isn't part of this screenshot.

![Figma variation 10: At 1440 px the title Banking today above four brand blue statistic cards with white text: 8 of 10 Core banking, 2bn Payments, 40% Risk and compliance and 24/7 Customer experience. The mobile rail isn't part of this screenshot.](../../docs/handover/screenshots/list-figma-10-banking-today.jpg)

**Figma variation 11** — At 1440 px the title Featured services above two large image cards side by side, Consulting and AI and data, with square images, kicker, title and description.

![Figma variation 11: At 1440 px the title Featured services above two large image cards side by side, Consulting and AI and data, with square images, kicker, title and description.](../../docs/handover/screenshots/list-figma-11-2-up.jpg)

**Figma variation 12** — At 1440 px the title Industries we transform above three grey statistic cards with the statements Banking that runs on intelligence, Retail that knows every customer and Factories that learn and adapt, their labels, descriptions and Learn more buttons.

![Figma variation 12: At 1440 px the title Industries we transform above three grey statistic cards with the statements Banking that runs on intelligence, Retail that knows every customer and Factories that learn and adapt, their labels, descriptions a](../../docs/handover/screenshots/list-figma-12-statements.jpg)

**Figma variation 13** — At 1440 px the title At a glance above four statistic cards: 150,000+ on brand blue, 46 on the grey gradient, 1,200+ on mid grey and 100% on light blue, each with label and description.

![Figma variation 13: At 1440 px the title At a glance above four statistic cards: 150,000+ on brand blue, 46 on the grey gradient, 1,200+ on mid grey and 100% on light blue, each with label and description.](../../docs/handover/screenshots/list-figma-13-4-up-colours.jpg)

**Figma variation 14** — At 1440 px the title Our impact in numbers above four light grey statistic cards within the content width: 150,000+ Colleagues, 46 Countries, 1,200+ Clients and 100% Renewable power.

![Figma variation 14: At 1440 px the title Our impact in numbers above four light grey statistic cards within the content width: 150,000+ Colleagues, 46 Countries, 1,200+ Clients and 100% Renewable power.](../../docs/handover/screenshots/list-figma-14-statistics.jpg)

**Universal Editor canvas** — At 1440 px the List Latest insights with description and View all, a desktop rail of 3.3 cards (The agentic bank, Running the multi-cloud enterprise, Supply chain resilience with Read the story, The future of work) and indicator and buttons, lettered A to K. The content tree (L) isn't in this capture. (Annotated preview in editor mode with sample content; letters as in the annotations list, not a Universal Editor screenshot; file screenshots/list-authoring-view.jpg)

![Universal Editor canvas: At 1440 px the List Latest insights with description and View all, a desktop rail of 3.3 cards The agentic bank, Running the multi-cloud enterprise, Supply chain resilience with Read the story, The future of work and indicato](../../docs/handover/screenshots/list-authoring-view.jpg)

**Properties panel** — The properties panel of a selected List with the tabs Content, Source, Cards, Layout, Scroll, Advanced and Additional; the Source tab open with List source = Tagged pages and the Search root, Use the current page when empty, Tags, Match, Include descendant pages and Maximum search depth fields, followed by Order by, Sort order and Maximum items. (Dialog reference generated from the component model, not a Universal Editor screenshot; file screenshots/list-properties-panel.jpg)

![Properties panel: The properties panel of a selected List with the tabs Content, Source, Cards, Layout, Scroll, Advanced and Additional; the Source tab open with List source = Tagged pages and the Search root, Use the current page when empty, Tags, M](../../docs/handover/screenshots/list-properties-panel.jpg)

Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):

```text
[Screenshot Placeholder]

File name:
list-dialog-content-desktop.png

Purpose:
The Content tab of the List properties in Universal Editor, with the fields of the table "Content tab — List" in Authorable Fields below.

Annotations:
A = Title
B = Heading type
C = Description
D = CTA link
E = CTA text
F = CTA style
G = Accessible list label
H = List source
I = Pages (authored before List Items)
J = Pages (authored before List Items) › Page
```

```text
[Screenshot Placeholder]

File name:
list-dialog-display-desktop.png

Purpose:
The Display tab of the List properties in Universal Editor, with the fields of the table "Display tab — List" in Authorable Fields below.

Annotations:
A = Display as teaser
B = Card style
C = Card colour
D = Image ratio
E = Panel height
F = First card as feature
G = Link items
H = Open links in a new tab
I = Show image
J = Show eyebrow
```

```text
[Screenshot Placeholder]

File name:
list-dialog-additional-desktop.png

Purpose:
The Additional tab of the List properties in Universal Editor, with the fields of the table "Additional tab — List" in Authorable Fields below.

Annotations:
A = Anchor ID
B = Hide block
C = Animation Type
D = Motion Speed
E = Animation Trigger
F = Padding left
G = Padding right
H = Padding top
I = Padding bottom
J = Margin left
```

```text
[Screenshot Placeholder]

File name:
list-item-dialog-link-desktop.png

Purpose:
The Link tab of the List Item properties in Universal Editor, with the fields of the table "Link tab — List Item" in Authorable Fields below.

Annotations:
A = Page or link
B = Link text
C = Open in a new tab
```

```text
[Screenshot Placeholder]

File name:
list-item-dialog-content-desktop.png

Purpose:
The Content tab of the List Item properties in Universal Editor, with the fields of the table "Content tab — List Item" in Authorable Fields below.

Annotations:
A = Title
B = Description
C = Image
D = Image alt text
E = Eyebrow
F = Tags
G = Label
H = Call to action label
```

```text
[Screenshot Placeholder]

File name:
list-item-dialog-display-desktop.png

Purpose:
The Display tab of the List Item properties in Universal Editor, with the fields of the table "Display tab — List Item" in Authorable Fields below.

Annotations:
A = Card style
B = Card colour
C = Analytics label
D = Accessibility label
E = Hide Title
F = Show Description
G = Show Image
H = Show Eyebrow
I = Show Label
J = Show Action Label
```

<!-- END GENERATED: screenshots -->

The handover screenshots and the properties panel reference show the dialog tabs used before handover 2.8 (Content, Source, Cards, Layout, Scroll, Advanced, Additional). The dialog now has **Content**, **Display** and **Additional** (List) and **Link**, **Content**, **Display** (List Item); field names and stored values are unchanged. The states below have no screenshot yet.

```text
[Screenshot Placeholder]

File name:
list-item-display-desktop.png

Purpose:
The List Item Display toggles (block-library/list/list-item-display): cards of one Fixed list with Hide Title on, Show Description, Show Image, Show Eyebrow and Show Label turned off one at a time, and Show Action Label (off by default) turned on.

Annotations:
A = Card with Hide Title on and Show Action Label on (the action label stays visible)
B = Card with Show Image off (no image area)
C = Card with Show Eyebrow off (tags in its place)
D = Statistic card with Show Label off
E = Card with Show Action Label off, the default (no call to action; the title is the link)
```

```text
[Screenshot Placeholder]

File name:
list-editor-placeholders-desktop.png

Purpose:
A List in Universal Editor edit mode: a List Item just added with Add (no link yet) shown as a dashed placeholder after the cards with the hint listItemEditorHint, and a Child pages List showing listEditorPages (no query index on AEM author).

Annotations:
A = Rendered cards
B = Dashed List Item placeholder
C = Editor hint text
D = Content tree with the List and its List Items
```

```text
[Screenshot Placeholder]

File name:
list-skeleton-loading-desktop.png

Purpose:
The skeleton shown while the query index, redirects or authors take longer than 150ms: title bar and card shapes in the list's configured grid or scroll layout.

Annotations:
A = Title skeleton
B = Card skeletons in the configured columns
```

```text
[Screenshot Placeholder]

File name:
list-scroller-focus-desktop.png

Purpose:
Keyboard focus on a horizontal scroller: the focus ring on the scroll region (tabindex 0 only while it scrolls), then on the Next button, with Previous marked aria-disabled at the start.

Annotations:
A = Focused scroll region
B = Previous button (aria-disabled)
C = Next button with focus ring
D = Scroll indicator
```

```text
[Screenshot Placeholder]

File name:
list-editor-setup-hint-desktop.png

Purpose:
The editor message of a List that can't list anything yet (listEditorHint), e.g. Tagged pages without Tags or a Fixed list without List Items.

Annotations:
A = List header
B = Message naming the problem (tags-missing, items-missing, parent-missing, root-missing)
```

## For Content Authors

1. **Add the block:** in Universal Editor select a Section, a Columns Container column or a Tabs Container tab, choose **Add** and pick **List**.
2. **Open its properties:** select the List on the page or in the content tree; the properties panel shows the tabs **Content**, **Display** and **Additional**.
3. **Write the header (Content):** Title and Heading type (card titles are one level below), Description, CTA link with CTA text and CTA style. Without a Title, fill **Accessible list label** so screen readers can name the list.
4. **Choose the List source (Content):**
   - **Child pages:** pick the **Parent page** (or leave it empty with **Use the current page when empty** on); turn **Direct children only** off to set a **Child depth**.
   - **Fixed list:** add **List Items** with **Add** on the selected List (or in the content tree) and drag them to reorder. In each List Item's **Link** tab pick a page, a path or an external `https://` URL.
   - **Tagged pages:** pick the **Search root** (or use the current page), the **Tags** and **Match** (Any / All); optionally limit **Include descendant pages** and **Maximum search depth**.
   Fields that don't apply to the chosen source or option are hidden.
5. **Order and limit (Content):** **Order by** (Manual, Title, Last modified), **Sort order**, **Maximum items** (0: all).
6. **Choose the presentation (Display):** Display as teaser (cards) or rows of links, Card style, Card colour, Image ratio, Panel height, First card as feature, the Show options, Date format, Image loading (Eager only for a list on the first screen).
7. **Set the layout per breakpoint (Display):** Desktop, Tablet and Mobile display (Grid or Horizontal scroll), columns or items visible, gap, previous / next buttons and scroll indicator; then the scroll options and **When there are no items**.
8. **Change one card (List Item):** fill only the fields to override (Title, Description, Image, Eyebrow, Tags, Label, Call to action label) and, in its Display tab, Card style, Card colour and the Display toggles.
9. **Preview:** switch Universal Editor to Preview, or open the page preview. Child pages and Tagged pages lists show their pages only on the published page (AEM author has no query index).
10. **Publish:** publish the page. Listed pages must be published (and indexed) themselves to appear.
11. **Validate:** on the published page check the cards, their order, their links (redirect targets) and each breakpoint.

- **Minimum required:** List source; for Fixed list at least one List Item with a link, for Tagged pages at least one tag.
- **Recommended:** Title (or Accessible list label), Maximum items for sources that grow, card metadata on the listed pages (`card-title`, `card-description`, `card-image`, `card-image-alt`).
- **Optional:** Description, CTA, feature card, item overrides and Display toggles, scroller options, empty behaviour, Style options, Additional tab.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

### List (`list`)

Model `list`; template name "List" (the block class AEM renders); key-value block (one row per property); children: `list-item`.

Stored on a new component (definition template): `titleType` = `"h2"`, `source` = `"fixed"`, `orderBy` = `"manual"`, `sortOrder` = `"ascending"`, `maxItems` = `0`, `displayAsTeaser` = `true`, `cardStyle` = `"image"`, `imageRatio` = `"16-9"`, `panelHeight` = `"portrait"`, `linkItems` = `true`, `showImage` = `true`, `showEyebrow` = `true`, `showTags` = `true`, `showDescription` = `true`, `showDate` = `true`, `dateFormat` = `"dd-mmm-yy"`, `imageLoading` = `"lazy"`, `desktopMode` = `"grid"`, `desktopColumns` = `4`, `tabletMode` = `"grid"`, `tabletColumns` = `4`, `mobileMode` = `"grid"`, `mobileColumns` = `1`, `scrollSnap` = `true`, `emptyBehavior` = `"message"`, `analyticsEnabled` = `true`.

#### Content tab — List

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Title | `title` | text | No | — | — | The heading of the cards, e.g. Related to Agentic AI. | Related insights |
| Heading type | `titleType` | select | No | `h2` | H2 (`h2`), H3 (`h3`), H4 (`h4`), H5 (`h5`), H6 (`h6`) | Delivered with `title` (field collapse). | h2 |
| Description | `description` | richtext | No | — | — | — | — |
| CTA link | `link` | aem-content | No | — | — | — | /language-master/en/curated-design-pages/insights |
| CTA text | `linkText` | text | No | — | — | Delivered with `link` (field collapse). | View all |
| CTA style | `linkType` | select | No | "" | Text link (""), Primary button (`primary`), Secondary button (`secondary`) | Delivered with `link` (field collapse). | primary |
| Accessible list label | `listLabel` | text | No | — | — | Names the cards for screen readers when there is no title. | Pages |
| List source | `source` | select | Yes | `fixed` | Child pages (`parent`), Fixed list (`fixed`), Tagged pages (`tags`) | Child pages of a page, a fixed list of pages (Pages; add List Items to change a card or to link outside the site), or pages with tags. | fixed |
| Pages (authored before List Items) | `pageItems` | container (multiple) | No | — | — | Lists made before List Items. Add List Items instead (Add on the List). Shown when `source` is `fixed`. | — |
| Pages (authored before List Items) › Page | `page` | aem-content | No | — | — | — | — |
| Parent page | `parentPath` | aem-content | No | — | — | Shown when `source` is `parent`. | /language-master/en/dummy-pages/insights |
| Use the current page when empty | `parentUseCurrentPage` | boolean | No | `true` | on / off | Shown when `source` is `parent`. | true |
| Direct children only | `directChildrenOnly` | boolean | No | `true` | on / off | Off: pages down to the Child depth. Shown when `source` is `parent`. | false |
| Child depth | `childDepth` | number | No | `2` | — | Levels below the parent page (1: its children). Shown when `source` is `parent` and `directChildrenOnly` is `false`. | 2 |
| Search root | `rootPath` | aem-content | No | — | — | Shown when `source` is `tags`. | /language-master/en/dummy-pages/insights |
| Use the current page when empty | `tagsUseCurrentPage` | boolean | No | `true` | on / off | Shown when `source` is `tags`. | false |
| Tags | `tags` | aem-tag (multiple) | No | — | — | Shown when `source` is `tags`. | — |
| Match | `tagMatch` | select | No | `any` | Any of the tags (`any`), All of the tags (`all`) | Shown when `source` is `tags`. | all |
| Include descendant pages | `includeDescendants` | boolean | No | `true` | on / off | Off: only the children of the search root. Shown when `source` is `tags`. | true |
| Maximum search depth | `maxDepth` | number | No | `0` | — | 0: no limit. Shown when `source` is `tags` and `includeDescendants` is `true`. | — |
| Order by | `orderBy` | select | No | `manual` | Manual (as authored; path order for pages) (`manual`), Title (`title`), Last modified (`lastModified`) | — | title |
| Sort order | `sortOrder` | select | No | `ascending` | Ascending (`ascending`), Descending (`descending`) | Shown when `orderBy` is not `manual`. | descending |
| Maximum items | `maxItems` | number | No | `0` | — | 0: all of them. | 3 |

#### Display tab — List

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Display as teaser | `displayAsTeaser` | boolean | No | `true` | on / off | Cards; off: a list of links (title rows). | false |
| Card style | `cardStyle` | select | No | `image` | Image card (`image`), Panel (`panel`), Report (`report`), Statistic (`stat`), Mixed (`mixed`) | A style here applies to every card (an item's own Card style still wins). Mixed: each card's own style, else (List) the page's card-style metadata, else Report content as report cards, cards without an image as panels, the others as image cards. Shown when `displayAsTeaser` is `true`. | mixed |
| Card colour | `cardTheme` | select | No | "" | Default for the style (""), Dark (`dark`), Navy (`navy`), Brand blue (`brand`), Light blue (`brand-light`), Light grey (`grey`), Mid grey (`mid-grey`), Grey gradient (`gradient`), Image background (`image`) | Panel, report and statistic cards (image cards keep their image). A colour here applies to every card (an item's own Card colour still wins). Default for the style: the card's own colour, else (List) the page's card-theme metadata, else the style's colour. Shown when `displayAsTeaser` is `true`. | dark |
| Image ratio | `imageRatio` | select | No | `16-9` | 16:9 (`16-9`), 1:1 (`1-1`), 4:3 (`4-3`), 3:2 (`3-2`) | Shown when `displayAsTeaser` is `true`. | 1-1 |
| Panel height | `panelHeight` | select | No | `portrait` | Portrait (2:3) (`portrait`), Compact (`compact`), Content (`auto`) | Panel, report and statistic cards. Shown when `displayAsTeaser` is `true`. | compact |
| First card as feature | `featureFirst` | boolean | No | `false` | on / off | The first card as a large spotlight above the others. Shown when `displayAsTeaser` is `true`. | true |
| Link items | `linkItems` | boolean | No | `true` | on / off | — | false |
| Open links in a new tab | `openInNewTab` | boolean | No | `false` | on / off | The default for the items. | — |
| Show image | `showImage` | boolean | No | `true` | on / off | — | false |
| Show eyebrow | `showEyebrow` | boolean | No | `true` | on / off | — | false |
| Show tags | `showTags` | boolean | No | `true` | on / off | — | false |
| Show description | `showDescription` | boolean | No | `true` | on / off | On image cards and link rows; panel, report and statistic cards always show theirs. | false |
| Show date | `showDate` | boolean | No | `true` | on / off | — | false |
| Date format | `dateFormat` | select | No | `dd-mmm-yy` | 04 Sep 26 (`dd-mmm-yy`), 04-09-2026 (`dd-mm-yyyy`), 09-04-2026 (`mm-dd-yyyy`), Sep 4, 2026 (`mmm-d-yyyy`), 04/09/26 (`dd/mm/yy`), 4th September 2026 (`do-mmmm-yyyy`) | Shown when `showDate` is `true`. | do-mmmm-yyyy |
| Image loading | `imageLoading` | select | No | `lazy` | Lazy (`lazy`), Eager (first screen) (`eager`) | — | — |
| Desktop display | `desktopMode` | select | No | `grid` | Grid (`grid`), Horizontal scroll (`horizontal-scroll`) | Grid or horizontal scroll on desktop (1200px and wider), independently of the other breakpoints. | horizontal-scroll |
| Desktop columns | `desktopColumns` | number | No | `4` | — | Shown when `desktopMode` is `grid`. | 3 |
| Desktop gap (px) | `desktopGap` | number | No | `24` | — | Space between the cards. | — |
| Desktop items visible | `desktopVisible` | number | No | `4.2` | — | Cards in view, e.g. 4.2 shows 4 and a part of the next one. Shown when `desktopMode` is `horizontal-scroll`. | 4.2 |
| Desktop card width (px) | `desktopCardWidth` | number | No | `0` | — | A fixed card width (120 or more); 0 uses Items visible. Shown when `desktopMode` is `horizontal-scroll`. | 320 |
| Previous / next buttons on desktop | `desktopControls` | boolean | No | `false` | on / off | Shown when `desktopMode` is `horizontal-scroll`. | true |
| Scroll indicator on desktop | `desktopIndicator` | boolean | No | `false` | on / off | Shown when `desktopMode` is `horizontal-scroll`. | true |
| Tablet display | `tabletMode` | select | No | `grid` | Grid (`grid`), Horizontal scroll (`horizontal-scroll`) | Grid or horizontal scroll on tablet (600 to 1199px), independently of the other breakpoints. | horizontal-scroll |
| Tablet columns | `tabletColumns` | number | No | `4` | — | Shown when `tabletMode` is `grid`. | 3 |
| Tablet gap (px) | `tabletGap` | number | No | `24` | — | Space between the cards. | — |
| Tablet items visible | `tabletVisible` | number | No | `3.3` | — | Cards in view, e.g. 4.2 shows 4 and a part of the next one. Shown when `tabletMode` is `horizontal-scroll`. | 2.3 |
| Tablet card width (px) | `tabletCardWidth` | number | No | `0` | — | A fixed card width (120 or more); 0 uses Items visible. Shown when `tabletMode` is `horizontal-scroll`. | — |
| Previous / next buttons on tablet | `tabletControls` | boolean | No | `false` | on / off | Shown when `tabletMode` is `horizontal-scroll`. | — |
| Scroll indicator on tablet | `tabletIndicator` | boolean | No | `false` | on / off | Shown when `tabletMode` is `horizontal-scroll`. | — |
| Mobile display | `mobileMode` | select | No | `grid` | Grid (`grid`), Horizontal scroll (`horizontal-scroll`) | Grid or horizontal scroll on mobile (up to 599px), independently of the other breakpoints. | horizontal-scroll |
| Mobile columns | `mobileColumns` | number | No | `1` | — | Shown when `mobileMode` is `grid`. | 1 |
| Mobile gap (px) | `mobileGap` | number | No | `16` | — | Space between the cards. | — |
| Mobile items visible | `mobileVisible` | number | No | `1.2` | — | Cards in view, e.g. 4.2 shows 4 and a part of the next one. Shown when `mobileMode` is `horizontal-scroll`. | 1.2 |
| Mobile card width (px) | `mobileCardWidth` | number | No | `0` | — | A fixed card width (120 or more); 0 uses Items visible. Shown when `mobileMode` is `horizontal-scroll`. | — |
| Previous / next buttons on mobile | `mobileControls` | boolean | No | `false` | on / off | Shown when `mobileMode` is `horizontal-scroll`. | — |
| Scroll indicator on mobile | `mobileIndicator` | boolean | No | `true` | on / off | Shown when `mobileMode` is `horizontal-scroll`. | true |
| Equal card height | `equalHeight` | boolean | No | `false` | on / off | All rows as tall as the tallest card. | true |
| Stretch cards to row height | `stretchCards` | boolean | No | `true` | on / off | — | false |
| Scroll snap | `scrollSnap` | boolean | No | `true` | on / off | Shown when `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | — |
| Snap alignment | `snapAlign` | select | No | `start` | Start (`start`), Center (`center`) | Shown when `scrollSnap` is `true` and `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | center |
| Hide native scrollbar | `hideScrollbar` | boolean | No | `true` | on / off | Shown when `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | — |
| Allow mouse drag | `mouseDrag` | boolean | No | `true` | on / off | Shown when `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | — |
| Keyboard scrolling | `keyboardScrolling` | boolean | No | `true` | on / off | Arrow keys, Home and End when the list has focus. Shown when `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | — |
| Scroll step | `scrollStep` | select | No | `one-card` | One card (`one-card`), Viewport (`viewport`) | Shown when `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | viewport |
| Loop | `loop` | boolean | No | `false` | on / off | Next at the end goes back to the start. Shown when `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | true |
| Initial item index | `initialIndex` | number | No | `0` | — | The card shown first (0: the first). Shown when `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | 2 |
| Edge | `edgePadding` | select | No | `bleed` | Cards run to the edge (`bleed`), Inside the content width (`none`) | Fixed-width sections only: the cards run into the section gutter. In full-width sections both look the same. Shown when `desktopMode` is `horizontal-scroll` or `tabletMode` is `horizontal-scroll` or `mobileMode` is `horizontal-scroll`. | none |
| When there are no items | `emptyBehavior` | select | No | `message` | Hide the list (`hide`), Show a message (`message`), Show the fallback items (`fallback`) | Fallback: the List Items of the block (for Child pages and Tagged pages). | fallback |
| Empty message | `emptyMessage` | text | No | — | — | Shown when `emptyBehavior` is `message`. | — |
| Analytics | `analyticsEnabled` | boolean | No | `true` | on / off | Card clicks and scrolling in the Adobe Data Layer. | — |
| Style options | `classes` | multiselect | No | — | Compact statistic title (`stat-compact`), Dividers between rows (`dividers`), Header centred (`header-center`) | — | — |

#### Additional tab — List

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Animation Type | `classes_animation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | motion-scale-in |
| Motion Speed | `classes_animationspeed` | select | No | "" | Medium (""), Fast (`motion-fast`), Slow (`motion-slow`) | How fast the animation runs: 0.3, 0.6 or 0.9 seconds. Shown when `classes_animation` is set and `classes_animation` is not empty. Delivered as a block class. | — |
| Animation Trigger | `classes_animationtrigger` | select | No | "" | On Scroll / Viewport Entry (""), On Page Load (`motion-on-load`) | When the block's animations run. On Scroll: when the block comes into view (at once if it is in view when the page opens). On Page Load: as soon as the block is ready, wherever it is on the page. Shown when `classes_animation` is set and `classes_animation` is not empty. Delivered as a block class. | motion-on-load |
| Padding left | `classes_paddingleft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | Delivered as a block class. | — |
| Padding right | `classes_paddingright` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | Delivered as a block class. | — |
| Padding top | `classes_paddingtop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | Delivered as a block class. | pt-2000 |
| Padding bottom | `classes_paddingbottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | Delivered as a block class. | — |
| Margin left | `classes_marginleft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | Delivered as a block class. | — |
| Margin right | `classes_marginright` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | Delivered as a block class. | — |
| Margin top | `classes_margintop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | Delivered as a block class. | — |
| Margin bottom | `classes_marginbottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | Delivered as a block class. | — |

### List Item (`list-item`)

Model `list-item`; template name "List Item" (the block class AEM renders).

#### Link tab — List Item

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Page or link | `link` | aem-content | Yes | — | — | A page of the site, a path or an external URL (https://...). | /language-master/en/dummy-pages/services/cloud |
| Link text | `linkText` | text | No | — | — | The link text when the page has no title. Delivered with `link` (field collapse). | — |
| Open in a new tab | `newTab` | select | No | "" | As the list (""), Yes (`true`), No (`false`) | — | true |

#### Content tab — List Item

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Title | `headline` | text | No | — | — | Overrides the page title. | Cloud services for the enterprise |
| Description | `summary` | text | No | — | — | Overrides the page description. | Co-developed platforms from our partner ecosystem. |
| Image | `image` | reference | No | — | — | Overrides the page image. | /content/dam/tcs-corp/dummy-pages/images/ai-transformation.jpg |
| Image alt text | `imageAlt` | text | No | — | — | Empty: the image is decorative. Delivered with `image` (field collapse). | Partner team in a workshop |
| Eyebrow | `eyebrow` | text | No | — | — | — | Partner |
| Tags | `tags` | aem-tag (multiple) | No | — | — | Overrides the page tags. | — |
| Label | `subtitle` | text | No | — | — | Statistic cards: the label above the description. | Sample statistic |
| Call to action label | `ctaLabel` | text | No | — | — | — | Learn more |

#### Display tab — List Item

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Card style | `kind` | select | No | "" | As the list (""), Image card (`image`), Panel (`panel`), Report (`report`), Statistic (`stat`) | As the list: the list's Card style; with Mixed (by page), the linked page's card-style metadata, else automatic. A style here wins over both. | stat |
| Card colour | `theme` | select | No | "" | As the list (""), Dark (`dark`), Navy (`navy`), Brand blue (`brand`), Light blue (`brand-light`), Light grey (`grey`), Mid grey (`mid-grey`), Grey gradient (`gradient`), Image background (`image`) | Panel, report and statistic cards (image cards keep their image); overrides the List's Card colour and the page's card-theme metadata. | brand |
| Analytics label | `analyticsLabel` | text | No | — | — | — | — |
| Accessibility label | `ariaLabel` | text | No | — | — | The link name for screen readers, e.g. Read the TwinX case study. | — |
| Hide Title | `titleHidden` | boolean | No | `false` | on / off | Hides the title on the card; it stays for screen readers and in the heading outline, and names the card's link. A linked card keeps one visible link: with Show Action Label off, the title stays visible as the link. | true |
| Show Description | `showDescription` | boolean | No | `true` | on / off | Off: no description on this card (neither this item's nor its page's). | false |
| Show Image | `showImage` | boolean | No | `true` | on / off | Off: no image on this card (neither this item's nor its page's). | false |
| Show Eyebrow | `showEyebrow` | boolean | No | `true` | on / off | Off: no eyebrow on this card (the tags or content type take its place, as without an eyebrow). | false |
| Show Label | `showLabel` | boolean | No | `true` | on / off | Off: no Label on this card (statistic cards show the Label above the description). | false |
| Show Action Label | `showActionLabel` | boolean | No | `false` | on / off | On: the card shows its call to action (the Call to action label, else the card style's default, e.g. Explore). Off (default): no call to action; the title is the card's link. | false |

<!-- END GENERATED: fields -->

Notes on what the tables above don't show:

- **List source and Pages.** "Pages (authored before List Items)" (`pageItems`: a composite multifield with a `page` per item, `pageItems/item0/page`, handover 2.9 / F-86) and the multi-value `pages` property of lists made before are still read, in that order, before the List Items (`mergeFixedItems`). Add List Items for new content.
- **Fixed list precedence:** List Item override, then the linked page's metadata, then defaults. Child pages and Tagged pages: the page's metadata, then defaults. Each List Item field the author filled replaces the page's value (`applyOverrides`); an empty field keeps the page's value, so an item mixes authored and page values. An authored image keeps its own alt (empty alt: decorative). A link that can't be resolved keeps the authored values, titled from its path without a Title.
- **Card style and Card colour precedence** (`kindOf`, `themeOf` in `utils/card-list-config.js`; unsupported values are skipped, so no class is made from them):

| | List Item (Fixed list) | Child pages, Tagged pages |
|---|---|---|
| 1 | the List Item's Card style / Card colour | the List's Card style (unless Mixed) / Card colour |
| 2 | the List's Card style (unless Mixed) / Card colour | the page's `card-style` / `card-theme` metadata |
| 3 | the linked page's `card-style` / `card-theme` | automatic: report for Report content, panel without an image, else image / the style's colour |
| 4 | automatic / the style's colour | |

  A Card style other than Mixed, or a Card colour, forces every card that doesn't set its own. With Mixed and Default for the style each page decides. Lists made before keep their Card style (Image card by default). Card colour paints panel, report and statistic cards; image cards keep their image.
- **List Item Display toggles** (added 20 October 2026, handover 2.34): they apply to that item's card only, on top of the List's Show options (a List with Show image off shows no images, whatever its items say). Hide Title keeps the title for screen readers and the heading outline and names the card's link; a linked card keeps one visible link (without a call to action the title stays visible). Show Description off hides the description on every card style, also panel, report and statistic cards. Show Eyebrow off: image cards show the tags in its place. Items authored before (without the toggles) show everything but the call to action. Examples: block-library/list/list-item-display.
- **Call to action** (KB-D-058, Proposed): the List has no Show call to action; each List Item's **Show Action Label** (off by default) decides its own card's call to action, independently of the other items. On, the card shows `p.list-card-action` with the item's Call to action label, else the card style's default (Explore on panels, Download on reports), as the card's one link; off, the action element isn't rendered and the title is the link. A Show call to action saved on Lists authored before is ignored, and cards from the query index (Child pages, Tagged pages) have no List Item, so they show no call to action. The Cards block keeps its own Show call to action (`showsCta`, `utils/card-list-config.js`). List Item rows AEM delivers without their tab cells (19 cells; 13 for rows from before the toggles) are read field by field.
- **List heading:** its size, line height and letter spacing are those of its Title Type (H1–H6, `styles/styles.css`); the List keeps only its colour and semibold weight.
- **Show options of the List:** Show description applies to image cards and link rows (panel, report and statistic cards always show theirs); Show tags also shows the reading time; on image cards an eyebrow takes the place of the tags; at most three tags are shown. Image cards show the date after the content type label (the taxonomy label of the content-type tag, e.g. Blog).
- **Validation in code:** every value is validated again and invalid values fall back to the default: Child depth 1–10, Maximum search depth 0–10, Maximum items 0 or more (0, empty or invalid: all), columns 1–6, gap 0–120 (px, rendered in rem), items visible 1–8, card width 0 or 120–1200, Initial item index 0–200.
- **Display as teaser** adds the block class `display-teaser` (not `teaser`, which the Teaser styles select: F-83), off adds `links`.
- **Open in a new tab** links get `target="_blank" rel="noopener noreferrer"` and the "(opens in a new tab)" text (placeholder `opensInNewTab`). A List Item's Open in a new tab (As the list / Yes / No) overrides the List's.
- **Analytics label / Accessibility label** (List Item): `data-analytics-label` and the data layer `dc:title`; the link's `aria-label`.
- **Legacy fields still read** (no longer in the dialog): `componentId` (Component ID: block id, analytics id and card ids; a duplicate gets a suffix), `touchSwipe` (off: `no-swipe`, `touch-action: pan-y`) and `reducedMotion` (ignored: reduced motion is always honoured). Lists made before the key-value model (a title and a CTA, positional rows) render as `list-legacy`.
- **Component id:** the authored Component ID, else the block's id (its Anchor ID), else a generated `list-1`, `list-2`, ... in page order.
- **Additional tab:** Anchor ID, Hide block, Animation Type / Motion Speed / Animation Trigger, Padding and Margin, as described in AGENTS.md "Additional tab". The List has no Background animation (card colours are per card); its Content animation moves the header, the feature card and each card or row in one after another.

## Screenshot-Based Authoring Steps

### Authoring Step 1: Add the List and write the header

```text
[Screenshot Placeholder]

File name:
list-authoring-step-1.png

Purpose:
The List Content tab with the header fields filled in.

Annotations:
A = Title
B = Heading type
C = CTA link, CTA text, CTA style
D = Accessible list label
```

### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Title | Related insights | Names the list and its region | H2 heading above the cards |
| B | Heading type | h2 | Page outline; card titles become h3 | `<h2>` title |
| C | CTA link / CTA text / CTA style | /language-master/en/curated-design-pages/insights / View all / Text link | A way to the full listing | Text link with arrow on the right of the header |

Action: select the section, **Add** > **List**, open the properties and fill the Content tab header fields. Expected preview: the header appears; the list shows the empty message or the editor hint until a source is set. Business rule: one H1 per page, so use h2–h6. Common mistake: no Title and no Accessible list label, so the region is announced as "List"; resolution: fill one of them.

### Authoring Step 2: Choose the List source

```text
[Screenshot Placeholder]

File name:
list-authoring-step-2.png

Purpose:
The Content tab with List source Tagged pages and its fields.

Annotations:
A = List source
B = Search root
C = Tags and Match
D = Order by, Sort order, Maximum items
```

### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | List source | Tagged pages | The list follows the tagging | Tag fields shown |
| B | Search root | /language-master/en/dummy-pages/insights | Limits the pages | Pages below the root only |
| C | Tags / Match | an AI topic tag / All of the tags | Related content | Pages with every tag (child tags match too) |
| D | Order by / Sort order / Maximum items | Title / Descending / 3 | Stable, short rail | At most 3 cards |

Action: set the source and its fields. Expected preview: in Universal Editor "The pages show on the published page (from the query index)."; on the published page the matching pages. Validation: publish and check the cards. Common mistake: Tagged pages without Tags shows the editor hint (tags-missing); resolution: pick at least one tag.

### Authoring Step 3: Add and fill List Items (Fixed list)

```text
[Screenshot Placeholder]

File name:
list-authoring-step-3.png

Purpose:
A List Item's Link and Content tabs with overrides.

Annotations:
A = Page or link
B = Title override
C = Image and Image alt text
D = Eyebrow and Call to action label
```

### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Page or link | /language-master/en/dummy-pages/services/cloud | The card's page | Card from the page's metadata |
| B | Title | Cloud services for the enterprise | Placement-specific wording | Overrides the page title |
| C | Image / Image alt text | /content/dam/tcs-corp/dummy-pages/images/ai-transformation.jpg / Partner team in a workshop | A different visual | Overrides the page image |
| D | Eyebrow / Call to action label | Partner / Learn more | Kicker and explicit action | Eyebrow and a visible call to action |

Action: with List source Fixed list, **Add** a List Item on the List, pick the link, fill only the fields to override; drag items to reorder. Expected preview: the card in its place; a List Item without a link is a dashed placeholder. Common mistake: List Items on a Child pages list aren't shown (hint `listItemSourceHint`) unless the empty behaviour is fallback.

### Authoring Step 4: Set the card display and per-item toggles

```text
[Screenshot Placeholder]

File name:
list-authoring-step-4.png

Purpose:
The List Display tab (Card style, Card colour) and a List Item Display tab with its toggles.

Annotations:
A = Card style (List)
B = Card colour (List)
C = List Item Card style
D = List Item Show Image / Hide Title
```

### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Card style | Mixed | Each page or item decides | Different card styles in one list |
| B | Card colour | Default for the style | Not forced | Each card's own or the style's colour |
| C | Card style (List Item) | Statistic | A key figure | Statistic card |
| D | Show Image / Hide Title (List Item) | off / on | A text-only card with a hidden title | No image; the title is read but not shown |

Action: set the List's style, then the item's Display tab. Business rule: a linked card keeps one visible link. Common mistake: expecting an item's Show Image on to show images while the List's Show image is off; resolution: the List's options win.

### Authoring Step 5: Layout per breakpoint, preview and publish

```text
[Screenshot Placeholder]

File name:
list-authoring-step-5.png

Purpose:
The responsive fields of the Display tab and the published result.

Annotations:
A = Desktop display and columns
B = Mobile display, items visible, indicator
C = Published list at 402px with the indicator
```

### Values to Enter

| Callout | Field | Value | Reason | Expected result |
|---|---|---|---|---|
| A | Desktop display / Desktop columns | Grid / 3 | Three cards per row | 3-column grid at 1200px and wider |
| B | Mobile display / Mobile items visible / Scroll indicator on mobile | Horizontal scroll / 1.2 / on | Swipeable rail | One card and part of the next, progress bar below |

Action: set the layout, switch to Preview, publish the page. Validation: check 402, 1024 and 1440px widths, keyboard scrolling and the links. Common mistake: a page missing from a source list was not published or not reindexed; resolution: publish it and reindex.

## Variations

Every variation is a combination of the List's fields (no separate block class to pick); they are shared with [Cards](../cards/README.md) (`utils/card-list-config.js`, `decorators/card-list-decorator.js`, `styles/card-list.css`). Personalization and fallback: none (see [Personalization](#personalization)); the data layer state is the same for all, with `xdm:variant` = the Card style (or `links`). Handover screenshots of each are in the generated table above.

### Image cards (Card style Image card, default)

- **Purpose / when to use:** page teasers with a picture (insights, services). Not for key figures (Statistic) or downloads (Report).
- **Fields:** Display as teaser on, Card style Image card; optional Image ratio (16:9, 1:1, 4:3, 3:2), Show options, Date format.
- **Rendering:** `article.list-card.list-card-image`: image (ratio class `ratio-*`, no layout shift), kicker (eyebrow, else up to three tags with reading time), title, description, content type label and `<time datetime>`.

```text
[Screenshot Placeholder]

File name:
list-image-mobile.png

Purpose:
Image cards at 402px in one column (Mobile columns 1).

Annotations:
A = Image at the chosen ratio
B = Kicker (eyebrow or tags)
C = Title, description, content type and date
```

### Panel, Report and Statistic cards

- **Panel:** tall coloured panel (Panel height Portrait 2:3, Compact 9:10, Content) with eyebrow, title, description and the default action "Explore" (placeholder `explore`); automatic for pages without an image under Mixed.
- **Report:** content type and date, title, description and an outlined "Download" action (placeholder `download`); automatic for Report content under Mixed.
- **Statistic:** the Title as a large number, the Label (`subtitle`) above the description, a secondary-button action when a Call to action label is set; Style option `stat-compact` for statement titles (Figma variations 7 and 12).
- **Card colour** paints these three (Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background): `theme-*` class on the card.

```text
[Screenshot Placeholder]

File name:
list-stat-tablet.png

Purpose:
Statistic cards at 1024px with item colours (brand, gradient, mid-grey, brand-light) as in Figma variation 13.

Annotations:
A = Large number (Title)
B = Label
C = Card colour per item
```

### Mixed (Card style Mixed)

Each card's style follows the precedence in [Authorable Fields](#authorable-fields): the List Item's style, else the page's `card-style`, else automatic (report, panel without image, image). Used for related-content and media rails (Figma 2, 3, 8, 9).

### First card as feature

The first card becomes a full-width spotlight above the others (`feature-first` class) with its image, tags, reading time and, when the page has an `author-id`, the author lockup (photo, name, designation) from the Authors sheet (`getAuthors`, loaded only for this option). Use once per page, near the top.

```text
[Screenshot Placeholder]

File name:
list-feature-mobile.png

Purpose:
The feature card at 402px stacked above the remaining cards.

Annotations:
A = Feature image
B = Author lockup
C = Remaining cards
```

### Rows of links (Display as teaser off)

Rows with eyebrow or content type and a tag, a large title, the description, the date and an arrow (`aria-hidden`), class `links`; Style option `dividers` adds lines between rows (Figma 5 News). Use for news and press lists; not for visual teasers.

### Grid and horizontal scroll per breakpoint

Each breakpoint is independently a grid (`{bp}Columns`) or a scroller (`{bp}Visible` or `{bp}CardWidth`), so all eight combinations exist (e.g. grid / grid / scroll: Figma 1, 4, 6, 10; scroll everywhere: Figma 3, 8, 9). Optional previous / next buttons and a scroll indicator per breakpoint; scroll snap (start / center), hidden scrollbar, mouse drag, keyboard scrolling, scroll step (one card / viewport), loop, initial item and edge (bleed / none) are shared.

```text
[Screenshot Placeholder]

File name:
list-scroll-tablet.png

Purpose:
A tablet rail with previous / next buttons and the indicator (tabletControls and tabletIndicator on).

Annotations:
A = Partly visible next card
B = Previous / Next buttons
C = Scroll indicator
```

### Style options and fallback items

- **Style options** (`classes`): `stat-compact`, `dividers`, `header-center` (centred header).
- **Fallback items:** with "When there are no items" = Show the fallback items, a Child pages or Tagged pages list without matches shows its List Items instead (built as a Fixed list).

### Figma variations

| Figma variation | Configuration |
|---|---|
| 1 Themes | Panel, item colours (dark, brand, image), grid / grid / scroll + mobile indicator |
| 2 Insight & Opinion | Mixed, First card as feature, 1:1 images, CTA text link, grid 4 / 4 / 1 |
| 3 Related | Mixed, scroll everywhere, edge bleed |
| 4 Intelligence in Action | Image 1:1, description, 3 / 3 columns, mobile scroll |
| 5 News | Display as teaser off (rows of links), primary CTA, `dividers` |
| 6 At a glance / 10 Banking today | Statistic, grey / brand, mobile scroll |
| 7, 12 Statements | Statistic + `stat-compact`, 3 columns, items' CTA |
| 8 Media coverage / 9 Investor relations | Mixed, scroll everywhere (report cards: navy colour) |
| 11 2-up | Image 1:1, 2 / 2 / 1 columns |
| 13 4-up colours | Statistic, item colours (brand, gradient, mid-grey, brand-light) |
| 14 | Statistic (the old design's edge-to-edge row isn't reproduced: content width) |

### Legacy list (compatibility)

Lists made before the key-value model (a title and a CTA in positional rows) render as before with the class `list-legacy`: the header only, no items.

## Complete Authoring Example

Scenario: an insights hub shows its three newest AI insights as a rail on mobile and a grid on larger screens.

| Field | Example value | Guidance |
|---|---|---|
| Title / Heading type | Related insights / h2 | One heading per list |
| CTA link / CTA text / CTA style | /language-master/en/curated-design-pages/insights / View all / Text link | Leads to the full listing |
| List source | Tagged pages | Updates itself |
| Search root | /language-master/en/dummy-pages/insights | Keeps the list in the section |
| Tags / Match | the AI topic tag / Any of the tags | Child tags match too |
| Order by / Sort order / Maximum items | Last modified / Descending / 3 | Newest first, short |
| Card style / Image ratio | Image card / 1:1 | Figma variation 4 look |
| Desktop / Tablet / Mobile display | Grid 3 / Grid 3 / Horizontal scroll 1.2 with indicator | Rail only on phones |
| When there are no items | Show the fallback items, with two List Items | Never an empty section |

Steps: add the List to the section, fill the Content tab, set the Display tab, add two fallback List Items, publish. Expected output: three image cards newest first, linked to their redirect targets; with no match the two fallback cards. Responsive: 3 columns at 600px and wider, a rail with indicator below 600px. Accessibility: the region is labelled by the title, card titles are h3. Data layer: `list-1` (or the Anchor ID) with `xdm:listSource` `tags` and `xdm:variant` `image`, three item entries, `cmp:click` on card clicks. Personalization: none; the same list for every visitor.

Pre-publish checklist:

- The listed pages are published and indexed, with card metadata and image alt text.
- Tags exist in the locale's taxonomy (labels).
- Image loading Lazy unless the list is on the first screen.
- Checked at 402, 1024 and 1440px and with the keyboard.

## Content and Asset Guidelines

- **Titles:** the page's `card-title` (else its title) or a List Item Title; short enough for the card width. The list Title names the region.
- **Descriptions:** plain text (`card-description`, else the page description, or a List Item Description); rich text is not supported (use Cards).
- **Eyebrows and labels:** `eyebrow`, else `category`; Label only on statistic cards.
- **CTAs and links:** the header CTA, or a List Item's Call to action label (the card's one link). Links may be pages, paths or `https://` URLs; `javascript:` and `data:` links are skipped. Page links go to their redirect target.
- **Images and alt text:** `card-image`, else `og:image` (not the site default social image), `thumbnail-image`, `featured-image`; alt from `card-image-alt`, else `image-alt`, else decorative (`alt=""`, the title is next to it). List Item images come from AEM Assets with their own alt.
- **Tags and metadata:** page tags (`article:tag`, also AEM's `cq-tags`), labels from `/{locale}/taxonomy.json`; at most three tags per card. `hide-in-nav` = yes leaves a page out.
- **Min / max items:** Maximum items 0 (all) or more; no verified technical limit on the number of List Items was identified. The query index is read in pages of 500 rows.
- **Aspect ratio and cropping:** Image ratio 16:9, 1:1, 4:3 or 3:2 for image cards (the image covers the ratio box: `object-fit: cover`, so it is cropped); panels Portrait (2:3), Compact (9:10) or Content.
- **Loading:** images lazy by default; Eager for a list on the first screen (the first image gets `fetchpriority="high"`).
- **Missing assets:** a missing image, description, date or tags isn't rendered; a card without a title is skipped.

## Accessibility

- **Semantics:** the cards are a `<ul>` / `<li>` in a region (`role="region"`) labelled by the title (`aria-labelledby`) or the Accessible list label, else "List" (placeholder `list`); cards are `<article>`s with headings one level below the list heading; dates are `<time datetime>`.
- **Links:** one link per card covering the card (the title, or the call to action when shown; its name "label: title" unless an Accessibility label is set); no empty links; new-tab links say "(opens in a new tab)".
- **Hidden title:** Hide Title hides it visually only (`hideVisually`): it stays in the heading outline.
- **Scroller:** focusable (`tabindex="0"`) only while it actually scrolls; arrow keys, Home and End scroll it; links inside stay reachable with Tab; nothing traps focus and updates never move it. Previous / Next are `<button>`s named by placeholders (`listPrevious`, `listNext`) with `aria-controls`, marked `aria-disabled` at the start / end (unless Loop) so focus isn't dropped. The indicator is `aria-hidden`.
- **Reduced motion:** smooth scrolling and the row arrow transition are off for `prefers-reduced-motion`; animations don't play.
- **Images:** `alt=""` unless an alt is set.
- **States:** the empty message is text in the list; the skeleton replaces itself with the list.
- **Contrast:** card colours and the dark-section theme contract (light text, inverted image cards: `styles/card-list.css`) were checked with axe (handover 2.34).

Author responsibilities: a Title or Accessible list label; meaningful image alt text on pages and List Items; Accessibility labels where the visible text isn't descriptive; heading type that fits the page outline.

Developer responsibilities: keep one link per card, the region label, `aria-disabled` on the scroller buttons and the visually hidden (not removed) hidden title.

| Key | Expected behavior |
|---|---|
| Tab | Moves to the scroll region (only while it scrolls), the card links, then Previous / Next |
| Arrow Left / Arrow Right | On the focused scroll region: previous / next step (one card or a viewport) |
| Home / End | On the focused scroll region: first / last card |
| Enter | Follows the focused card link; activates Previous / Next |
| Space | Activates the focused Previous / Next button |

## Data Layer and Analytics

With **Analytics** on, the List pushes its component state to `window.adobeDataLayer` (`trackCardList`, block `data-analytics="custom"`): the list `{ '@type': 'tcs-corp/components/list', parentId: <page>, 'dc:title', 'xdm:listSource': parent | fixed | tags, 'xdm:variant': <Card style> | links }` and one entry per card `{ '@type': 'tcs-corp/components/list/item', parentId: <list id>, 'dc:title' (Analytics label, else title, else the description's first 100 characters), 'xdm:linkURL', 'xdm:position', 'repo:modifyDate' }`. Card ids are `<list id>-item-<hash>`, stable per destination. Clicks are captured centrally by `decorators/data-layer-decorator.js` from `data-cmp-id`, `data-cmp-position` and `data-cmp-interaction` (`card`, `cta`, `previous`, `next`); a drag of the scroller and an `aria-disabled` button push no click. With Analytics off the block is `data-analytics="off"`: no state and no events. Pushes are wrapped so an analytics error never breaks rendering.

| Trigger | Data-layer event | Required properties | Analytics behavior |
|---|---|---|---|
| List rendered with cards | component state (`component.<id>` and items) | `@type`, `dc:title`, `xdm:listSource`, `xdm:variant`; items `xdm:position`, `xdm:linkURL` | Impression context for the list and its cards |
| Card link clicked | `cmp:click` | `path`, `interaction: card`, `position`, `dc:title`, `xdm:linkURL`, `xdm:linkType`, `breakpoint` | Card click with its position |
| Header CTA clicked | `cmp:click` | `interaction: cta`, `xdm:linkURL` | CTA click |
| Previous / Next clicked | `cmp:click` | `interaction: previous` / `next`, `breakpoint` | Scroller use |

The intended path is Adobe Client Data Layer → Adobe Data Collection (Tags) → AEP Web SDK → Edge Network → Analytics / CJA, but Tags and the Web SDK aren't configured yet (blocked: measurement plan). No consent mechanism is implemented.

## Personalization

This block does not currently expose verified personalization behavior. There is no Adobe Target or AJO integration in the repository: every visitor sees the same list, built from the query index and the authored settings. The fallback items (empty behaviour) are a content fallback, not personalization.

## Responsive Behavior

Breakpoints from `styles/card-list.css`: mobile below 600px, tablet 600–1199px, desktop 1200px and wider (Figma frames 402 / 1024 / 1440); 900px only steps the type sizes.

| Viewport | Layout | Image behavior | Interaction behavior |
|---|---|---|---|
| Mobile (< 600px) | Mobile display: grid (default 1 column, gap 16) or scroller (default 1.2 visible, indicator on) | Image ratio kept; responsive image sources | Swipe (unless swipe off), indicator, optional buttons |
| Tablet (600–1199px) | Tablet display: grid (default 4 columns, gap 24) or scroller (default 3.3 visible) | Same | Swipe, drag, keyboard, optional buttons and indicator |
| Desktop (>= 1200px) | Desktop display: grid (default 4 columns, gap 24) or scroller (default 4.2 visible); the header CTA sits on the right of the title (a wrapping flex row: it moves below when there is no room) | Same | Drag, keyboard, optional buttons and indicator |

The layout is CSS only (`{bp}-grid` / `{bp}-scroll` classes, `--list-columns-*`, `--list-gap-*`, `--list-visible-*`, `--list-card-width-*` custom properties, scroll snap), so lists scroll without JavaScript; the scroller decorator adds buttons, indicator, drag and keyboard only where a breakpoint scrolls and the cards don't fit, and recalculates on resize (ResizeObserver).

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/list/
├── README.md
├── _list.json
├── list-data.js
├── list.css
└── list.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`utils/card-list-config.js`](../../utils/card-list-config.js) | `normalizePresentation` (the card list settings of List and Cards, with defaults and validation), `PRESENTATION_PROPERTIES`, `kindOf` and `themeOf` (the card's Card style and Card colour: item, list, page metadata, autom | `list-data.js`: { CARD_KINDS, CARD_THEMES, flag, hash, integer, isExternal, isSafeUrl, isYes, normalizePath, normalizePresentation, pickValue as pick, text, toISODate, } |
| [`utils/dates.js`](../../utils/dates.js) | `formatDate` (DD-MM-YYYY, MM-DD-YYYY, MMM d, yyyy, DD/MM/YY, DD MMM YY, 4th September 2026; no time zone shift) | `list-data.js`: { formatDate } |
| [`utils/query-index.js`](../../utils/query-index.js) | `getPages` (the current locale's pages from `/query-index.json`, or the language master's own pages while it is under review (`indexRoot`) with their metadata columns: tags, page and content type, dates, images, author,  | `list-data.js`: { columnOf, listOf } |
| [`decorators/card-list-decorator.js`](../../decorators/card-list-decorator.js) | `buildCardListHeader`, `renderCardList`, `renderCard`, `renderRow`, `renderFeature`, `applyCardListLayout`, `buildCardListSkeleton` (the List's skeleton in its own layout), `renderCardListEmpty`, `cardListId`, `cardHeadi | `list.js`: { applyCardListLayout, buildCardListHeader, buildCardListSkeleton, cardListId, renderCardList, renderCardListEmpty, renderEditorItems, trackCardList, } |
| [`decorators/skeleton-decorator.js`](../../decorators/skeleton-decorator.js) | `renderWhenLoaded` (a block from data that may take time: directly within 150ms, else after a skeleton so its section is shown; removed on success and failure), `skeletonWhile` (a skeleton in a part that fills in by itse | `list.js`: { renderWhenLoaded } |
| [`utils/card-list-config.js`](../../utils/card-list-config.js) | `normalizePresentation` (the card list settings of List and Cards, with defaults and validation), `PRESENTATION_PROPERTIES`, `kindOf` and `themeOf` (the card's Card style and Card colour: item, list, page metadata, autom | `list.js`: { PRESENTATION_PROPERTIES, contentTypeLabel } |
| [`utils/cells.js`](../../utils/cells.js) | `itemRows`, `KEY_VALUE_ITEM`, `FIELD_ROW_ITEM` (the item rows of a block: by model in the editor, by their cells on the page), `withoutTabCells` (drops the empty cell AEM renders for each dialog tab of an item model), `m | `list.js`: { matchCells, withoutTabCells } |
| [`utils/data.js`](../../utils/data.js) | `loadDataSheet`, `getAuthor`, `getAuthors`, `getLocations`, `getPartners`, `getSocialLinks`, `getMediaContacts`, `inRegion` (the locale's data sheets) | `list.js`: { getAuthors } |
| [`utils/environment.js`](../../utils/environment.js) | `prefersReducedMotion`, `scrollBehavior`, `isEditing`, `isInEditor`, `isAuthor` (the page is rendered by AEM author, which has no query index) | `list.js`: { isAuthor, isEditing } |
| [`utils/placeholders.js`](../../utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `list.js`: { getPlaceholders } |
| [`utils/links.js`](../../utils/links.js) | `NEW_WINDOW`, `linkOf`, `linkPathsOf` (the paths of a page property, one or many), `readLinkItems` (CTA lists with Link Type and the items' other select values), `readLinkRows` (the same from link item rows, e.g. Hero CT | `list.js`: { linkPathsOf } |
| [`utils/properties.js`](../../utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `list.js`: { normalizeKey, textOf } |
| [`utils/query-index.js`](../../utils/query-index.js) | `getPages` (the current locale's pages from `/query-index.json`, or the language master's own pages while it is under review (`indexRoot`) with their metadata columns: tags, page and content type, dates, images, author,  | `list.js`: { getPages, getPagesAt } |
| [`utils/redirects.js`](../../utils/redirects.js) | `loadRedirects`, `resolveRedirect`, `normalizeRedirectPath` (redirect targets from the locale's redirects sheet, loaded once) | `list.js`: { loadRedirects, resolveRedirect } |
| [`utils/site.js`](../../utils/site.js) | `LOCALES`, `DEFAULT_LOCALE`, `getLocale`, `indexRoot`, `REVIEW_ROOTS` and `REVIEW_SHEETS` (temporary: the language master under review, /language-master/en, lists its own pages and reads its own placeholders, redirects,  | `list.js`: { getLocale, pageLink, toPublishedPath } |
| [`utils/tags.js`](../../utils/tags.js) | `readTagValues`, `parseTag`, `readTags` (tag IDs; ID-derived labels as the taxonomy fallback) | `list.js`: { readTagValues } |
| [`utils/taxonomy.js`](../../utils/taxonomy.js) | `loadTaxonomy`, `resolveTags` (tag labels from the locale's taxonomy) | `list.js`: { resolveTags } |

<!-- END GENERATED: files -->

**Responsibilities.** `list.js` reads the block (`readBlockConfig`), loads the data and renders through the shared card list decorator. `list-data.js` is the DOM-free data side (unit tested): the List Item cell layout (`ITEM_LAYOUT`, `ITEM_FIELDS`, `ITEM_DISPLAY`, `itemLayoutFor`, `itemDisplay`), `normalizeConfig`, `validateConfig` (warning codes `tags-missing`, `parent-missing`, `root-missing`, `items-missing`), discovery (`resolveParentPages`, `resolveTagPages`, `applyTagMatching`, `hasTag`, `isListable`), `PAGE_MAPPING` and `normalizePageToCard`, `applyOverrides`, `resolveFixedItems`, `mergeFixedItems`, `deduplicateCards`, `sortCards`, `limitCards`, `withIds`, `buildCards`. `utils/card-list-config.js` normalizes the presentation (`normalizePresentation`, `RESPONSIVE_DEFAULTS`, `kindOf`, `themeOf`, `isSafeUrl`); `decorators/card-list-decorator.js` builds the header, cards, feature card, rows, layout classes, skeleton, empty state, editor placeholders and the data layer state; `decorators/scroller-decorator.js` the previous / next, indicator, drag and keyboard. `list.css` only imports `styles/card-list.css` (shared with Cards).

**Input DOM (what AEM delivers).** A key-value block: one row of two cells (key | value) per List property; then one row per List Item, recognised by `data-aue-model="list-item"` in the editor, else as a row whose first cell isn't a List property key. A List Item row has a cell per field and an empty cell per dialog tab (`ITEM_LAYOUT`: `null` for the Link, Content and Display tab cells; link text and image alt fold into the link and image cells). Rows rendered before the Display toggles have six cells fewer (`itemLayoutFor`); `withoutTabCells` and `matchCells` (`utils/cells.js`) drop tab cells and match cells by content (link, picture, true / false, card kind or theme values). A list made before the key-value model (rows of at most one cell) is `legacy`.

**Rendered DOM contract.** Block classes: `card-list`, `source-{parent|fixed|tags}`, `{desktop|tablet|mobile}-{grid|scroll}`, `{bp}-controls`, `{bp}-indicator`, `snap`, `snap-{start|center}`, `hide-scrollbar`, `no-swipe`, `edge-bleed`, `equal-height`, `stretch`, `feature-first`, `display-teaser` or `links`, `style-*`, `ratio-*`, `panel-*`, the Style options, `list-legacy`; custom properties `--list-{columns,gap,visible,card-width}-{bp}`; `id` = the component id; `data-list-decorated`, `data-analytics` (`custom` / `off`). Inside: `.list-header` (`.list-title-slot`, CTA with `data-cmp-interaction="cta"`), the feature card, a `role="region"` viewport with a `<ul>` of `<li data-card-id data-cmp-id data-cmp-position>` holding `article.list-card.list-card-{image|panel|report|stat}` (`theme-*`) or rows, card links with `data-card-id`, `data-cmp-interaction="card"`, `data-external`, `data-analytics-label`; Previous / Next with `data-cmp-interaction`.

**Decoration flow.**

```text
decorate(block)
  readBlockConfig()      property rows, List Item rows (or a list made before)
  normalizeConfig()      defaults and clamped values; cardListId(): Component ID, Anchor ID or list-N
  Promise.all(getPages() if needed, loadRedirects(), getAuthors() for the feature card)
  applyCardListLayout()  classes and custom properties before the data (the skeleton takes the layout)
  renderWhenLoaded()     skeleton after 150ms, then render:
    getPagesAt()         List Item pages the index doesn't have (AEM author), read from their HTML
    buildCards():
      parent  resolveParentPages() -> normalizePageToCard()
      tags    resolveTagPages() -> applyTagMatching() -> normalizePageToCard()   (never the current page)
      fixed   mergeFixedItems() -> resolveFixedItems() -> normalizePageToCard() / link card -> applyOverrides()
      -> deduplicateCards() -> sortCards() -> limitCards() -> withIds()
    fallback             no cards and emptyBehavior fallback: buildCards() as a Fixed list
    resolveTags()        tag labels (taxonomy), contentTypeLabel()
    renderCardList() or renderCardListEmpty(); renderEditorItems() in the editor
    trackCardList()      data layer state (Analytics on)
```

**Card model** (the only input of rendering; all text is set with `textContent`):

```js
{
  id,                  // `${componentId}-item-${hash(dedupe key)}`, stable
  sourceType,          // parent | fixed | tags
  sourcePath, url,     // published path ('' for external links); destination (redirect target)
  title, description, image, imageAlt, // imageAlt '' = decorative
  eyebrow, tagIds, tags, date, dateISO,
  lastModified,        // seconds: modified-date, else when last published (sorting)
  contentType, readingTime, authorId, subtitle,
  kind, theme,         // the List Item's Card style and Card colour ('' = as the list)
  pageKind, pageTheme, // the page's card-style and card-theme metadata
  ctaLabel, openInNewTab, external, analyticsLabel, accessibilityLabel,
  display,             // List Item Display toggles (itemDisplay), applied by displayOf()
}
```

**Page metadata contract** (`PAGE_MAPPING`, in order of preference): Title `card-title`, else `og:title`; Description `card-description`, else `description`; Image `card-image`, else `og:image` (not the default social image), `thumbnail-image`, `featured-image`; Image alt `card-image-alt`, else `image-alt`, else decorative; Eyebrow `eyebrow`, else `category`; Tags `article:tag` (and `cq-tags`); Date `modified-date`, else `publish-date`, else when last published; `content-type`, `reading-time`, `author-id`; `hide-in-nav` = yes: not listed; `card-style`, `card-theme`. The query index (`helix-query.yaml`) indexes these columns (`cardTitle`, `cardDescription`, `cardImage`, `cardImageAlt`, `imageAlt`, `eyebrow`, `category`, `hideInNav`, `cardStyle`, `cardTheme`, `contentType`, `publishDate`, `modifiedDate`, `readingTime`, `thumbnailImage`, `featuredImage`, `authorId`, `cqTags`), so source lists request no page.

**Sorting and deduplication.** Manual: authored order (Fixed) or path order (pages; the repository order isn't in the index); Title: `Intl.Collator`, locale-aware and numeric; Last modified: `modified-date`, else when last published (external links 0). Ties are broken by path. Deduplication key: the destination path (without `.html`, query, hash and trailing slash) or the full external URL, lower case; the first card wins. Maximum items applies after discovery, filtering, deduplication and sorting.

**Events and async.** Data loads in parallel and is cached (`getPages` once per page, 500 rows per request; `prefetchData` in `scripts.js` starts the index, taxonomy and redirects at the lazy phase on pages with a List). The block is decorated once (`data-list-decorated`). It listens to no custom events; the scroller listens to scroll, pointer, keyboard and resize.

**Error handling.** Invalid items are skipped, one item never breaks the others; a missing or failing index lists no pages and the empty behaviour applies; analytics pushes are wrapped. `?debug=list` logs the configuration, warnings and cards (`console.debug`).

**Exports.** `list.js`: `default decorate`, `readBlockConfig`. `list-data.js`: the functions above and the re-exported config constants.

## Extending the Block

- **New dialog field or value:** add it to `blocks/list/_list.json` (or to the shared groups in `models/_card-list.json` for List and Cards), run `npm run build:json` and `npm run lint`. Avoid names ending in Text, Title, Type, Alt or MimeType (they collapse into their base field), don't use grouped `prefix_name` fields in this key-value block, and add no sample content to templates.
- **New List Item field:** append it to the model and to `ITEM_LAYOUT` (at the end, so rows rendered before still read via `itemLayoutFor`), add a matcher in `ITEM_MATCHERS` (`list.js`) and update `test/list` (the layout is checked against `_list.json`).
- **Map it to rendering:** presentation options in `normalizePresentation` (`utils/card-list-config.js`) and the card list decorator, for both blocks; data options in `normalizeConfig`.
- **New card kind:** `kindOf()` and `renderCard()`, styles in `styles/card-list.css` (mobile first, rem, 600 / 900 / 1200px).
- **New data source:** a `resolve…()` returning index pages or cards, added to `buildCards()`; new metadata: `PAGE_MAPPING` and a column in `helix-query.yaml`.
- **Accessibility and data layer:** keep one link per card and the region label; describe new interactions with `data-cmp-interaction`, don't push clicks from the block.
- **Tests and docs:** `npm test`; add a block library example; update this README (`npm run build:docs` for the generated sections); `npm run build:modules` after changing imports.
- **Backward compatibility:** keep `pageItems` / `pages`, `componentId`, `touchSwipe` and the legacy layout readable.

## For Site Administrators

- **Availability:** offered in Section, Columns Container and Tabs Container (filters `section`, `columns-container`, `tabs`); allows List Item children (filter `list`).
- **Governance:** the model lives in `blocks/list/_list.json` and `models/_card-list.json`; aggregated files are regenerated with `npm run build:json`.
- **Publishing dependencies:** listed pages must be published and indexed; reindex after changing `helix-query.yaml` (finding F-10: a live index missing the card columns makes overrides and hide-in-nav ineffective).
- **Localization:** each locale lists its own pages; UI text from its placeholders, labels from its taxonomy.

| Dependency | Purpose | Location | Impact if unavailable |
|---|---|---|---|
| Query index | Pages and card metadata | `/query-index.json` (`helix-query.yaml`) | Child / tagged lists empty (empty behaviour); Fixed list pages titled from their path |
| Redirects sheet | Card links to moved pages | `/{locale}/redirects.json` | Links go to the old paths |
| Authors sheet | Feature card author lockup | `/{locale}/data/authors.json` | No author lockup |
| Taxonomy | Tag and content type labels | `/{locale}/taxonomy.json` | Labels derived from tag IDs |
| Placeholders | UI text: `listPrevious`, `listNext`, `opensInNewTab`, `explore`, `download`, `listEmpty`, `listEditorHint`, `listEditorPages`, `listItemEditorHint`, `listItemSourceHint`, `minutesShort`, `list` | `/{locale}/placeholders.json` | English fallbacks |
| Page metadata | Card content | Page properties, `/{locale}/metadata.json` | Page title, description and image used |
| DAM images | List Item images | AEM Assets | No image on the card |

Deprecation / migration: "Pages (authored before List Items)" is kept for lists made before; new fixed lists use List Items.

## For Architects

The List is a client-side rendered listing: the page delivers only the block's settings and items; cards are assembled in the browser from the CDN-cached query index and sheets (no repository queries, no server API). Content model: a key-value block with List Item children; presentation shared with Cards. Data layer: Adobe Client Data Layer state and central click capture; Web SDK and Target aren't configured; no consent or identity handling. Caching: the index, redirects and authors are cached in memory per page load. Performance: data starts loading at the lazy phase, skeleton after 150ms. Security: text only (`textContent`), unsafe link schemes skipped. Scalability: the whole locale index is loaded (500 rows per request) and filtered in the browser, so cost grows with the number of indexed pages.

```mermaid
graph LR
  AEM[AEM author / Universal Editor] --> Block[List block markup]
  Block --> ListJS[blocks/list/list.js]
  ListJS --> Data[blocks/list/list-data.js]
  ListJS --> Config[utils/card-list-config.js]
  ListJS --> QI[utils/query-index.js]
  QI --> Index["/query-index.json"]
  ListJS --> Redirects[utils/redirects.js]
  Redirects --> RSheet["/{locale}/redirects.json"]
  ListJS --> Taxonomy[utils/taxonomy.js]
  ListJS --> Authors[utils/data.js Authors sheet]
  ListJS --> Decorator[decorators/card-list-decorator.js]
  Decorator --> Scroller[decorators/scroller-decorator.js]
  Decorator --> CSS[styles/card-list.css]
  ListJS --> Skeleton[decorators/skeleton-decorator.js]
  Decorator --> ACDL[window.adobeDataLayer]
  DLD[decorators/data-layer-decorator.js] --> ACDL
```

## For QA and Support Teams

| Test ID | Scenario | Configuration | Expected result |
|---|---|---|---|
| LIST-QA-01 | Default | New List, Fixed list, two List Items | Two image cards in a 4 / 4 / 1 grid |
| LIST-QA-02 | Child pages | Parent page set, Direct children only off, Child depth 2 | Children and grandchildren, path order |
| LIST-QA-03 | Tagged pages Any / All | Two tags, Match Any then All | All: only pages with both tags; never the current page |
| LIST-QA-04 | Order and limit | Order by Title, Descending, Maximum items 3 | Three cards, Z to A |
| LIST-QA-05 | Item overrides | List Item Title and Image set | Authored values win, the rest from the page |
| LIST-QA-06 | Display toggles | Hide Title, Show Image off, Show Action Label off | As described; one visible link per linked card |
| LIST-QA-06b | Call to action per item | Two List Items: Show Action Label on and off (default) | Only the first card has `p.list-card-action` (Explore / its label); the second's title is its link |
| LIST-QA-07 | Card styles and colours | Image, Panel, Report, Statistic, Mixed; each Card colour | Precedence table respected |
| LIST-QA-08 | Feature and rows | First card as feature; Display as teaser off with dividers | Spotlight with author; rows with lines |
| LIST-QA-09 | Responsive | Each combination of grid / scroll | Layout per breakpoint at 402, 1024, 1440px |
| LIST-QA-10 | Keyboard | Scroller with buttons | Arrow keys, Home, End; buttons aria-disabled at the ends |
| LIST-QA-11 | Empty behaviour | No matches with hide / message / fallback | Hidden, message, or List Items |
| LIST-QA-12 | Editor | Universal Editor, Child pages source; new List Item | `listEditorPages` hint; dashed placeholder |
| LIST-QA-13 | Missing / invalid content | `javascript:` link, item without title, invalid numbers | Skipped; defaults |
| LIST-QA-14 | Multiple instances | Two Lists, same Anchor ID or Component ID | Unique ids (suffix), separate data layer entries |
| LIST-QA-15 | Data layer | Analytics on / off | State and `cmp:click` on / nothing |
| LIST-QA-16 | Regression | Legacy list, pageItems list, items without Display toggles | Render as before |

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
|---|---|---|---|---|
| "The pages show on the published page" | AEM author has no query index | Open the published page | None needed | Cards on aem.page / aem.live |
| A page is missing | Not published, not indexed, `hide-in-nav` = yes, outside the root or depth | Check `/query-index.json` for its path | Publish, reindex, fix metadata or settings | Page in the index and the list |
| Card overrides from metadata ignored | Live index lacks the columns (F-10) | Inspect the index row columns | Reindex after the configuration update | Columns present |
| Tags don't match | Tags not in `article:tag` / `cq-tags`, wrong tag | Check the page head metas | Fix the page Tags | Card listed |
| Wrong link target | Redirects sheet entry | Check `/{locale}/redirects.json` | Correct the sheet | Card URL |
| Editor hint "Set up the list" | Missing tags, parent, root or items | Read the hint | Fill the named field | Cards render |
| Cards not styled as expected | Precedence (item > List > page) | `?debug=list` card `kind` / `theme` | Change the right level | Classes on the card |

Evidence to collect: the page URL, the block's settings (screenshots of the dialog), `?debug=list` console output, the index row of a missing page. No credentials or author host names.

## Performance Considerations

- Decorated in its section's normal flow; data (`getPages`, `loadRedirects`, `getAuthors` only with the feature card) loads in parallel and is prefetched at the lazy phase; a Fixed list of external links only doesn't load the index.
- Skeleton after 150ms in the configured layout, so the section isn't held back and layout shift stays low.
- Images lazy by default; Eager gives the first image `fetchpriority="high"`; image ratios reserve space.
- The full locale index is fetched in pages of 500 rows (cost grows with the site); `getPagesAt` fetches the HTML of List Item pages missing from the index (editor only, in practice).
- The scroller uses one ResizeObserver and adds listeners only where a breakpoint scrolls; no carousel library, no auto-rotation.
- High cost: very large Maximum items or child depth with many pages (DOM size), many Lists on one page (one shared index load).

## Security and Privacy

- Links are checked with `isSafeUrl` (`utils/card-list-config.js`): `http(s):`, `mailto:`, `tel:` and relative paths are allowed, any other scheme (`javascript:`, `data:`, ...) is skipped; external links get `rel="noopener noreferrer"` when opened in a new tab.
- All text is set with `textContent`; no `innerHTML` from index or sheet data.
- Only public, published data is read (query index, sheets); no repository details are exposed in the data layer.
- `?debug=list` only logs to the console. No personal data beyond the public Authors sheet (feature card).

## Known Limitations

| Limitation | Impact | Workaround | Planned correction |
|---|---|---|---|
| Content Fragment lists aren't supported | No CF-driven lists | Pages or Cards | Not planned (by decision) |
| Sources come from the query index | Unpublished or not indexed pages aren't listed; manual order is path order | Fixed list for a curated order | Not planned |
| No full-text search source | Core List search unavailable | Filter List | Not planned |
| No query index in Universal Editor | Child / tagged lists show a hint in the editor | Check the published page | Not planned |
| Live index missing card columns (F-10) | Overrides and hide-in-nav may have no effect | Reindex | Not recorded |
| Statistic "bn" smaller units in one title (Figma) aren't styled | One size for the number | None | Not recorded |
| Figma two-tone title (variation 6) isn't an option | One colour title | None | Not recorded |
| Only the current locale's pages | No cross-locale lists | Fixed list with URLs | Not recorded |

## Related Documentation

- [Blocks documentation](../README.md)
- [Cards](../cards/README.md) (manual alternative, same presentation), [Filter List](../filter-list/README.md), [Table List](../table-list/README.md), [Page Header](../page-header/README.md)
- Parents: [Columns Container](../columns-container/README.md), [Tabs](../tabs/README.md)
- Model: [_list.json](./_list.json), shared [_card-list.json](../../models/_card-list.json)
- Code: [list-data.js](./list-data.js), [card-list-decorator.js](../../decorators/card-list-decorator.js), [card-list-config.js](../../utils/card-list-config.js), [card-list.css](../../styles/card-list.css), [query-index.js](../../utils/query-index.js), [redirects.js](../../utils/redirects.js)
- Tests: [list-data.test.mjs](../../test/list/list-data.test.mjs), [display-precedence.test.mjs](../../test/list/display-precedence.test.mjs), [query-index-tags.test.mjs](../../test/list/query-index-tags.test.mjs)
- [Handover 6.16 List Block](../../docs/handover/TCS-CORP-HANDOVER.md), [Animation and skeletons](../../docs/animation/README.md)

<!-- BEGIN GENERATED: usage (npm run build:docs) -->

Pages of the block library package 1.0.14 (language master, `/content/tcs-corp/language-master/en`) that contain the block, 243 instance(s) in total:
- Block library: `block-library/accordion`, `block-library/anchor-list`, `block-library/animation`, `block-library/animation/repeated-items`, `block-library/animation/skeleton-loading`, `block-library/animation/speed-and-trigger`, `block-library/cards`, `block-library/columns`, `block-library/columns-container`, `block-library/columns-container/columns-of-blocks`, `block-library/conversation-canvas`, `block-library/embed`, `block-library/filter-list`, `block-library/footer`, `block-library/form-variations`, `block-library/foundations`, `block-library/foundations/section-colours-with-blocks`, `block-library/fragment`, `block-library/fragment/fragments`, `block-library/gen-carousel`, `block-library/header`, `block-library/hero`, `block-library/interactive-dashboard`, `block-library/list`, `block-library/list/card-colours-and-overrides`, `block-library/list/card-style-from-pages`, `block-library/list/cards`, `block-library/list/empty-state`, `block-library/list/figma-variations`, `block-library/list/layout-and-scrolling`, `block-library/list/list-item-display`, `block-library/list/lists-made-before`, `block-library/list/sources`, `block-library/media-contacts`, `block-library/modal`, `block-library/modal/fragments`, `block-library/page-header`, `block-library/page-header/tags-and-content-type`, `block-library/quote`, `block-library/separator`, `block-library/table`, `block-library/table-list`, `block-library/tabs`, `block-library/tabs/fragments`, `block-library/teaser`, `block-library/templates`, `block-library/testimonial`, `block-library/video`
- Curated design pages: `curated-design-pages/case-study`, `curated-design-pages/collection`, `curated-design-pages/forms`, `curated-design-pages/forms/tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank`, `curated-design-pages/home`, `curated-design-pages/industry-landing-page`, `curated-design-pages/media-and-investor`, `curated-design-pages/product`, `curated-design-pages/services`, `curated-design-pages/story`, `curated-design-pages/who-we-are`
- Other pages: `block-library`, `curated-design-pages`, `dummy-pages/careers`, `dummy-pages/case-studies`, `dummy-pages/case-studies/better-operational-decisions-connected-intelligence`, `dummy-pages/case-studies/increasing-streaming-hours-uk-platform`, `dummy-pages/case-studies/intelligence-in-everyday-employee-services`, `dummy-pages/case-studies/modernising-core-banking-for-a-regional-bank`, `dummy-pages/case-studies/orchestrating-vehicle-app-charging-service-experience`, `dummy-pages/case-studies/personalised-banking-at-scale`, `dummy-pages/case-studies/real-time-network-resilience-for-a-bank`, `dummy-pages/case-studies/reimagine-customer-service-with-people-and-agents`, `dummy-pages/case-studies/reimagining-in-home-entertainment-experience`, `dummy-pages/case-studies/transforming-overnight-liquidity-modelling`, `dummy-pages/industries`, `dummy-pages/industries/banking`, `dummy-pages/industries/communications-media-information`, `dummy-pages/industries/cpg-distribution`, `dummy-pages/industries/education`, `dummy-pages/insights`, `dummy-pages/insights/adobe-experience-platform-insights`, `dummy-pages/insights/agentic-ai-banking-operations`, `dummy-pages/insights/agentic-ai-in-hr-chros-future-ready-enterprises`, `dummy-pages/insights/ai-agents-for-customer-service`, `dummy-pages/insights/ai-agents-in-everyday-banking`, `dummy-pages/insights/ai-agents-need-guardrails-not-just-goals`, `dummy-pages/insights/ai-driven-transformation`, `dummy-pages/insights/ai-ready-data-centre-infrastructure-report`, `dummy-pages/insights/audience-growth-stagnant-streaming-market`, `dummy-pages/insights/banking-industry-innovation`, `dummy-pages/insights/beyond-transactions-towards-the-agentic-bank`, `dummy-pages/insights/cloud-modernization-strategy`, `dummy-pages/insights/confidence-in-a-connected-world`, `dummy-pages/insights/connected-factories-industrial-ai`, `dummy-pages/insights/customer-data-platforms`, `dummy-pages/insights/data-centre-becomes-intelligence-factory`, `dummy-pages/insights/decision-intelligence-report`, `dummy-pages/insights/decision-twins-testing-strategy`, `dummy-pages/insights/digital-commerce-trends`, `dummy-pages/insights/enabling-banking-innovation-resilience-core-modernisation`, `dummy-pages/insights/enterprise-data-modernization`, `dummy-pages/insights/fighting-fraud-with-agentic-ai`, `dummy-pages/insights/five-decisions-data-centre-strategy`, `dummy-pages/insights/foresight-factory-floor-digital-twin-logistics`, `dummy-pages/insights/future-of-customer-experience`, `dummy-pages/insights/generative-ai-in-enterprises`, `dummy-pages/insights/hyper-personalization-at-scale`, `dummy-pages/insights/multimodal-ai-evidence-based-engineering-assurance`, `dummy-pages/insights/payments-and-real-time-finance`, `dummy-pages/insights/real-world-impact-tcs-wisdom-ai`, `dummy-pages/insights/reimagining-how-your-business-works`, `dummy-pages/insights/retailers-journey-to-smarter-fulfilment`, `dummy-pages/insights/rethinking-kyc-with-ai-agents`, `dummy-pages/insights/simulating-supply-chain-disruption-digital-twin`, `dummy-pages/insights/skies-of-the-future-aerospace-strategies`, `dummy-pages/insights/smarter-lending-with-ai-agents`, `dummy-pages/insights/sustainable-scale-economics-of-compute`, `dummy-pages/insights/tcs-launches-next-gen-soc-services`, `dummy-pages/insights/the-self-defending-bank`, `dummy-pages/insights/why-premiumisation-is-reshaping-indias-cpg-industry`, `dummy-pages/insights/why-supply-chains-need-a-resilience-reset`, `dummy-pages/investors/annual-report`, `dummy-pages/investors/annual-report/financial-review`, `dummy-pages/investors/annual-report/governance-and-sustainability`, `dummy-pages/investors/annual-report/strategy-and-business-review`, `dummy-pages/investors/ceo-letters`, `dummy-pages/investors/ceo-letters/client-priorities-shared-progress`, `dummy-pages/investors/ceo-letters/innovation-with-purpose`, `dummy-pages/investors/ceo-letters/investing-in-people-and-skills`, `dummy-pages/investors/ceo-letters/responsible-growth-priorities`, `dummy-pages/newsroom`, `dummy-pages/newsroom/best-buy-gcc-transition-to-tcs`, `dummy-pages/newsroom/industrial-intelligence-foundry`, `dummy-pages/newsroom/inside-the-technology-powering-marathon-race-day`, `dummy-pages/newsroom/mystate-selects-tcs-bancs`, `dummy-pages/newsroom/next-gen-system-on-chip-design-services`, `dummy-pages/newsroom/personalising-the-streaming-experience`, `dummy-pages/newsroom/tcs-google-cloud-ai-native-autonomous-enterprises`, `dummy-pages/newsroom/tcs-iem-kolkata-ai-centre-of-excellence`, `dummy-pages/newsroom/tcs-jaguar-renew-formula-e-sponsorship`, `dummy-pages/newsroom/tcs-partners-manageengine-sovereign-cloud`, `dummy-pages/newsroom/tcs-q2-fy27-results-announced`, `dummy-pages/newsroom/tcs-technology-innovation-partner-jfk-terminal-one`, `dummy-pages/products`, `dummy-pages/services`

Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).

<!-- END GENERATED: usage -->

## Change History

| Version | Change | Source | Date |
|---|---|---|---|
| Not recorded | README generated from verified implementation and approved handover documentation | Repository review | Not recorded |
| Handover 2.7 | Display as teaser block class `display-teaser` (was `teaser`), finding F-83 | docs/handover revision history | 17 October 2026 |
| Handover 2.8 | Dialog reduced to Content / Display / Additional | docs/handover revision history | 17 October 2026 |
| Handover 2.9 | Pages as a composite multifield (`pageItems`), F-86 | docs/handover revision history | 17 October 2026 |
| Handover 2.12 | On AEM author, child / tag lists say their pages show on the published page (`listEditorPages`) | docs/handover revision history | 17 October 2026 |
| Handover 2.13 | Query index, taxonomy and redirects start loading at the lazy phase on pages with Lists | docs/handover revision history | 17 October 2026 |
| Handover 2.16 | Page `card-style` / `card-theme` metadata and the Card style / colour precedence | docs/handover revision history | 18 October 2026 |
| Handover 2.18 | Content animation and skeleton loading | docs/handover revision history | 18 October 2026 |
| Handover 2.34 | List Item Display toggles (Hide Title, Show Description / Image / Eyebrow / Label / Action Label) | docs/handover revision history | 20 October 2026 |
