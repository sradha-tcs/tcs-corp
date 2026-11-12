# project-overview.md

## Sources inspected

- Handover Document Control (revision history 0.1–2.37, executive summary), Part 1 (1.1–1.11), 2.1, 2.2, 2.6, 3.1, 3.9, 7.3, 12.3, 16.3, 16.4
- AGENTS.md (whole file on disk, including Setup Commands, Module preloading, Publishing Process)
- utils/site.js (LOCALES, REVIEW_*, exports), paths.json (154 mappings, 15 includes, 28 excludes), tools/paths/generate-paths.mjs header
- fstab.yaml, package.json, helix-sitemap.yaml, helix-query.yaml, head.html, .github/workflows/main.yaml, .renovaterc.json, scripts/delayed.js, scripts/dompurify.min.js (version), scripts/lib/lottie (version), styles/fonts.css
- blocks/README.md (inventory, statuses), blocks/tcs-header/tcs-header.js, _tcs-header.json, README.md; blocks/header/header.js (breakpoint)
- models/_section.json, models/_page.json; component-definition.json groups
- git tags and branches (home-content-package_* tags, origin/home-content-package)

## Discrepancies

- implementation: 30 block folders (blocks/README.md) | documented: "26 block folders" (handover 1.1 summary) | impact: low, stale count | correct: code
- implementation: Columns is Compatibility-only, buttons are the Button Block, built-in Button is "Button (basic)" and not offered | documented: Columns "Implemented", Button as default content with Views / Type / Icon / Alignment (handover 1.6.1 inventory) | impact: authors / readers may use deprecated components | correct: code (blocks/README.md, AGENTS.md "Button", "Columns Container")
- implementation: header switches to desktop at 1200px (`matchMedia('(min-width: 1200px)')`, blocks/header/header.js:27) | documented: 900px (handover 1.7.6 Header row; 1.6.1 "dropdowns and mobile menu") | impact: wrong test breakpoints | correct: code
- implementation: no personalization marker in the Teaser (no "personaliz" in blocks/teaser/teaser.js or _teaser.json; removed in 2.27) | documented: "Teaser has a Personalization flag that only adds a personalization class" (handover 1.6.2, 2.4 line ~746, 16.4) | impact: personalization readiness overstated | correct: code
- implementation: 12 test folders in test/ (cards, conversation-canvas, docs, items, list, media, models, modules, motion, privacy, separator, site) | documented: "test/list, test/cards, test/separator" (handover 1.7.8) | impact: low | correct: code
- implementation: Git tags `home-content-package_*` exist (downloads branch snapshots) | documented: "No Git tags exist" (handover 12.3) | impact: low | correct: repository
- implementation: paths.json includes also `/content/dam/tcs-corp/` (15 includes) | documented: AGENTS.md notes say `includes` lists the 13 locale pages (plus the language master include) | impact: low (the generator comment documents the DAM include) | correct: paths.json
- implementation: CI installs Node 24 | documented: the CI step is labelled "Use Node.js 20"; README says Node 20 or newer | impact: cosmetic | correct: workflow `node-version: 24`
- handover internal: the Part 1.1 table says "Document version 1.0, 13 October 2026" while the document is 2.37; Document Control date "20 October 2026", front matter "October 19, 2026", docs/handover/README.md "21 October 2026" | impact: confusing dating | correct: revision history (2.37, 21 October 2026)

## Gaps and blocked topics

- Business KPIs and targets (BO-9, SC-9; O-02): Not recorded — needs the business owner
- Stakeholder names and ownership (1.4, 1.11; O-01): Not recorded
- Production domain and CDN (O-03): Not recorded
- Launch scope and content status per locale (PG-3, SC-1): Not recorded
- Rationale for choosing Edge Delivery Services / xwalk / Universal Editor: not stated anywhere in the handover or repository (only benefits in 1.5)
- Visitor personas / audiences: only proposed (`tcs-corp:audience` in 7.3.2); `persona` metadata column indexed without defined values
- Rollout date of the language master to /en (removal of REVIEW_*): Not recorded
- Handover approval: "Draft for review", all approvals pending

## Decisions found

- Authors use Universal Editor; documents (Google Drive / SharePoint) are not a content source — handover 1.8 assumption 5
- Built-in Columns and Button no longer offered, definitions kept for existing content — handover 2.28 (20 October 2026), AGENTS.md "Columns Container", "Button"
- Item children instead of composite multifields — handover 2.10 (17 October 2026), F-87
- Container sections' Additional tab as `container*` fields — handover 2.30 (20 October 2026), R-L-1
- Temporary language master review at /language-master/en — handover 2.11, 2.14 (17 October 2026), 3.9; removal tracked as F-88
- Section Style as a single choice Default / Grey / Dark / Dark Green; Highlight no longer offered — handover 2.33 (20 October 2026), F-104
- "Link Item" of the request is the List Item, decided with the product owner — handover 2.34 (20 October 2026)
- Module preloading instead of a build step — handover 2.36 (20 October 2026), F-106
- Block documentation in the repository, READMEs follow the code over the handover chapters — handover 2.37 (21 October 2026), F-107

## Recommendations

- Write a project-specific README.md (still the boilerplate text)
- Record the platform selection rationale (or state it is a client mandate) in the handover Part 1
- Align handover 1.1, 1.6.1, 1.6.2, 1.7.6, 1.7.8, 12.3 and 16.4 with the code (counts, Columns / Button, header breakpoint, Teaser personalization marker, tests, tags)
- Tag code releases on main as handover 12.3 recommends
