---
id: "BA-001"
title: "Business Context"
role: "Business analysis"
topic: ""
audience: "Business analysts, product owner, QA lead"
owner: "Business Analyst / Product Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["docs/handover/knowledge-base/project-overview.md"]
relatedComponents: []
relatedPages: []
confidence: "Low"
primary: true
---

# Business Context

| Attribute | Value |
| --- | --- |
| Document ID | BA-001 |
| Audience | Business analysts, product owner, QA lead |
| Purpose | Business context of the site |
| Scope | — |
| Prerequisites | — |
| Owner | Business Analyst / Product Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | docs/handover/knowledge-base/project-overview.md |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Business and Program Objectives](#business-and-program-objectives)
- [Business Value](#business-value)
- [Target Users](#target-users)
- [Brands](#brands)
- [Scope](#scope)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

**INFERRED REQUIREMENT, REQUIRES BUSINESS VALIDATION** for anything beyond the project overview.

## Business and Program Objectives

The handover states that its objectives are derived from the delivered implementation; business KPIs and target values are not recorded in the repository (handover 1.2, BO-9 and SC-9 "To be confirmed").

| Id | Objective | How the implementation supports it |
| --- | --- | --- |
| BO-1 | One corporate web platform for all markets | 13 locale sites served by one code base; locale-aware navigation, footer, error pages, UI text, taxonomy and data ([utils/site.js](https://github.com/sradha-tcs/tcs-corp/blob/main/utils/site.js)) |
| BO-2 | Fast, search-friendly pages | Three-phase loading, image optimisation, self-hosted Inter variable font, module preloading, PageSpeed target of 100 |
| BO-3 | Autonomous, efficient authoring | Universal Editor component models for every block, the Additional tab, Site Global Templates, a block library per locale |
| BO-4 | Consistent brand experience | TCS.com Design System (Figma) patterns implemented as blocks; design tokens in [styles/styles.css](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/styles.css) |
| BO-5 | Content discovery | List, Filter List, Cards and Conversation Canvas over the query index and taxonomy |
| BO-6 | Measurable digital experience | Adobe Client Data Layer for every page and block ([decorators/data-layer-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/data-layer-decorator.js)) |
| BO-7 | Inclusive experience | WCAG 2.1 AA target in blocks and shared decorators |
| BO-8 | Low operational overhead | Serverless delivery, Git-based deployment through AEM Code Sync, no build pipeline |
| BO-9 | Business KPIs | Not recorded |

Program goals (handover 1.3), with their state on `main` at commit 2d06316:

| Id | Goal | State |
| --- | --- | --- |
| PG-1 | Launch on Edge Delivery Services with Universal Editor authoring | Running on the `aem.page` / `aem.live` hosts; production domain not recorded |
| PG-2 | Block library covering the TCS.com Design System patterns | 30 block folders documented in [blocks/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md); Interactive Dashboard is a placeholder (Experimental) |
| PG-3 | 13 locale sites with their own references, error pages, sheets and data | Implemented in code and `paths.json`; content status per locale not recorded |
| PG-4 | Templates for recurring page types | Home, Article, Blog, Press Release ([templates/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/templates/README.md)) |
| PG-5 | Analytics readiness | Data layer implemented; Adobe Tags, Web SDK, Analytics, CJA, Target and AJO not configured |
| PG-6 | Accessibility (WCAG 2.1 AA) | Implemented in blocks and decorators; a formal third-party audit is not recorded |
| PG-7 | Performance (Lighthouse / PageSpeed 100) | Handover revision 2.36 records Lighthouse 99–100 mobile and 100 desktop on the measured pages; no PageSpeed check runs in CI |
| PG-8 | Handover to the run organisation (AMS) | The handover document; AMS acceptance not recorded |

## Business Value

Summarized from handover 1.5 (Business Benefits); each benefit is traceable to code:

- **Performance and SEO**: pages are rendered by Edge Delivery Services from authored HTML and served from its CDN; only the code of the blocks on the page loads; the first section is rendered first for LCP (`scripts/scripts.js`, `scripts/aem.js`).
- **Faster time to market**: authors build and publish pages from ready blocks; code ships by merging to `main` (AEM Code Sync), without a build or deployment window.
- **Lower cost of ownership**: no delivery application servers, no front-end framework or build chain, one code base for 13 locales.
- **Global consistency with local autonomy**: shared design and blocks; each locale owns its navigation, footer, 404 page, UI text, taxonomy, metadata, redirects and data sheets.
- **Data-driven optimisation, once tags are deployed**: every block and interaction is described in the Adobe Client Data Layer, so Adobe Tags rules could be configured without block changes.
- **Inclusive reach and reuse**: accessibility built into shared decorators; templates add structure (Page Header, About the author, Media contacts) from metadata and sheets.

**Why Edge Delivery Services, xwalk and Universal Editor.** No verified selection rationale was identified: the handover records the platform as given (Document Control, 1.1) and lists its benefits (1.5), but does not state why it was chosen over alternatives. The handover does state that authors use the Universal Editor and that documents (Google Drive / SharePoint) are not a content source (assumption 5 in 1.8).

## Target Users

| Group | What they do with the solution | Source |
| --- | --- | --- |
| Site visitors | Browse the 13 locale sites | Handover 2.2 (Solution Context) |
| Search engines | Crawl the pages and `/sitemap.xml` | Handover 2.2, [helix-sitemap.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/helix-sitemap.yaml) |
| Content authors (13 locale teams) | Create, edit, preview and publish pages and sheets in Universal Editor | Handover 2.2, Part 5 |
| Developers | Change code through pull requests, preview on feature-branch hosts | Handover 2.2, [AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md) |
| Site and AEM platform administrators | Edge Delivery site configuration, Admin API, AEM users and groups | Handover 2.2, Part 14 |
| AMS / support | Run support, troubleshooting, monitoring | Handover Parts 13, 14, 17 |

Visitor segments or personas are not defined: a `persona` metadata column is indexed ([helix-query.yaml](https://github.com/sradha-tcs/tcs-corp/blob/main/helix-query.yaml)) and an optional `tcs-corp:audience` tag tree (`cxo`, `it-leaders`, `investors`, `analysts`, `job-seekers`, `media`) is only **proposed** in handover 7.3.2; the published namespace has only `content-type`, `industry` (empty) and `region` (handover 7.3.1).

## Brands

| Brand element | Where it appears | Source |
| --- | --- | --- |
| TCS (Tata Consultancy Services) | The site's brand: the TCS logo in the header brand area, linked to its authored TCS Logo Link (usually the locale Home); accessible name from its alt text, else the `tcsLogo` placeholder ("Tata Consultancy Services") | [blocks/tcs-header/tcs-header.js](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tcs-header/tcs-header.js), [blocks/tcs-header/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/tcs-header/README.md) |
| TATA Group | The TATA logo in the header tools area (TATA Logo Link, usually `https://www.tata.com/`); accessible name from its alt text, else the `tataLogo` placeholder ("TATA Group") | Same |
| TCS.com Design System | The Figma design the blocks implement ("New Screens from New DS" in the handover revisions) | Handover 1.2 (BO-4), revision history 2.2–2.6; the Figma files are not in the repository |

No multi-brand or sub-brand mechanism exists in the code: one brand, one design token set ([styles/styles.css](https://github.com/sradha-tcs/tcs-corp/blob/main/styles/styles.css)) and one header for all locales.

## Scope

**In scope (implemented on `main`).** 13 locale sites and the language master review; 30 block folders ([blocks/README.md](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/README.md): 28 Active, Columns Compatibility-only, Interactive Dashboard Experimental); default content through AEM's built-in Text, Title and Image (the built-in Button is "Button (basic)", no longer offered); three section containers (Columns Container, Tabs Container, Gen Carousel); four templates; the Additional tab, animations and skeletons; the data layer; placeholders, metadata, taxonomy, redirects and data sheets per locale; SEO head mapping ([decorators/seo-decorator.js](https://github.com/sradha-tcs/tcs-corp/blob/main/decorators/seo-decorator.js)); the 404 page with inherited error pages ([404.html](https://github.com/sradha-tcs/tcs-corp/blob/main/404.html)); WCAG 2.1 AA practices.

**Out of scope or not implemented** (handover 1.6.2 and 16.4, checked against the code):

| Item | State |
| --- | --- |
| Adobe Tags, AEP Web SDK, Adobe Analytics, CJA | Not configured; [scripts/delayed.js](https://github.com/sradha-tcs/tcs-corp/blob/main/scripts/delayed.js) holds only a comment (blocked: measurement plan) |
| Adobe Target, Adobe Journey Optimizer | No integration in the repository |
| Consent management | Not implemented |
| Form submission back end | Not implemented: Form Variations dispatches `form-variations:submit` (finding F-01) |
| Search service | Not implemented: Conversation Canvas dispatches `conversation-canvas:search` |
| Production CDN and domain | Not configured; the sitemap origin is the `aem.live` host |
| Per-locale redirects at the edge, `/` → `/en/` | Not implemented (the platform applies only a root `/redirects.json`) |
| 403 / 500 / maintenance pages served by the platform | Not implemented (only `404.html`) |
| hreflang, language switcher, breadcrumb, authentication | Not implemented |
| Interactive Dashboard | Placeholder that renders nothing |

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
