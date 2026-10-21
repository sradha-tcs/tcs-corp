# decision-log.md

## Sources inspected
- Handover Document Control: Revision History (0.1 … 2.37), Source of truth line
- Handover Part 16: 16.2 Findings (F-01 … F-107; F-67 to F-69 don't exist), 16.3 Open Items (O-01 … O-20), 16.4 Not Implemented
- AGENTS.md rules: Additional tab, Dialog tabs, Columns Container, Button, AEM delivery rules, Item children, Animation and skeletons, Floating Canvas, Backgrounds and theme, Site structure (redirects per locale "by the user's choice"), Module preloading (fallback fonts)
- git log --merges (PR numbers and merge dates #19 … #129); git log -S"by the user's choice" -- AGENTS.md (commit ad6d7d6, 2026-10-11, PR #27)
- docs/proposals/README.md, docs/proposals/cards-card-refactoring.md section 21 (D-1 … D-6)
- Code checks: titleHidden in blocks/list|teaser|testimonial/_*.json; display-teaser in decorators/card-list-decorator.js; buttonVariant in button-block and conversation-canvas models; container* fields in tabs, gen-carousel, columns-container models; containerBgColor; fieldName; Video poster; models/_section.json Style options (Default, Grey bg-grey, Dark bg-dark, Dark Green bg-dark-green); applySectionBlockOptions in scripts.js; pageItems / featuredItems still in list / filter-list models; blocks/hero/hero.js LEGACY_MOTIONS (Motion Type authored before plays as the new animations); utils/lottie.js vendored player; paths.json excludes; helix-query.yaml excludes

## Discrepancies
- implementation: helix-query.yaml excludes '/*/block-library' and '/*/block-library/**' (one level) | documented: rev 2.20 / 2.35 "block library pages stay out of the query index (by design)", the language master's library "noindex, not in the query index" | impact: /language-master/en/block-library/** isn't matched by the exclude pattern; it stays out only if noindex pages aren't indexed | correct: requires validation on aem.live (/query-index.json)
- implementation: Part 16 contains F-01 … F-107 | documented: docs/handover/README.md says "F-01 … F-66, F-70 … F-98" | impact: README out of date | correct: the handover body
- implementation: Hero / Table List Motion Type values authored before are mapped to the new animations (hero.js LEGACY_MOTIONS) | documented: rev 2.27 says the options were removed | impact: none (removed from dialogs, still played) | correct: both
- implementation: List / Filter List pageItems / featuredItems multifields remain in the models | documented: rev 2.10 "the multifields stay in the dialogs and are still read" | consistent

## Gaps and blocked topics
- Dates for decisions recorded only in AGENTS.md without a revision row: KB-D-005 dated by the commit that added the sentence (PR #27); KB-D-009 (Content Fragment lists) and KB-D-045 (publish flow): Not recorded.
- Alternatives are "Not recorded" wherever the sources don't name one.
- Design sign-off of the contrast tokens (O-14), Universal Editor dialog checks (no author access), Analytics (measurement plan): blocked.

## Decisions found
- KB-D-001 PR #23 (11 Oct): decorators / utils split
- KB-D-002 PR #24 (11 Oct): standard site data sources
- KB-D-003 PR #25, #26 (11 Oct): 13 locale sites, Site Global Templates
- KB-D-004 PR #22, #27 (11 Oct): paths.json generated from LOCALES
- KB-D-005 AGENTS.md (commit of PR #27, 11 Oct): redirects per locale by the user's choice
- KB-D-006 PR #29 (11 Oct): inherited Navigation / Footer / 404 Page
- KB-D-007 PR #32 (12 Oct): locale page as Home
- KB-D-008 PR #33 (12 Oct): aem.live sitemap origin
- KB-D-009 handover 16.4: Content Fragment lists not supported by decision (date not recorded)
- KB-D-010 rev 2.11 / 2.14, F-88 (17 Oct): temporary language master review
- KB-D-011 rev 2.20 / 2.35: block library out of the query index
- KB-D-012 PR #61 (13 Oct): Additional tab
- KB-D-013 rev 2.8, F-84: three dialog tabs
- KB-D-014 rev 2.9, F-86: Pages as composite multifields (Superseded by KB-D-015)
- KB-D-015 rev 2.10, F-87, PR #90: item children
- KB-D-016 rev 2.8 / 2.10 / 2.12: editor placeholders and author messages
- KB-D-017 rev 2.27, F-101, PR #118: AEM delivery rules
- KB-D-018 rev 2.29, F-102, PR #120: fieldName, no sample content, publish non-image DAM
- KB-D-019 rev 2.30, PR #121: container* fields
- KB-D-020 rev 2.34: titleHidden naming
- KB-D-021 PR #52 (13 Oct): vendored Lottie player
- KB-D-022 PR #62, rev 1.1: Cards as manual alternative to List
- KB-D-023 rev 2.2, F-72: desktop logo bar (product decision 16 Oct)
- KB-D-024 rev 2.3, PR #71: floating Canvas journey, header:menu
- KB-D-025 rev 2.6, F-80: header fallback to references/nav
- KB-D-026 rev 2.7, F-83: display-teaser
- KB-D-027 rev 2.16, PR #104: card style precedence
- KB-D-028 rev 2.22 / 2.23: Columns Container
- KB-D-029 rev 2.24, F-99: Column Break template name
- KB-D-030 rev 2.26: equal-width columns
- KB-D-031 rev 2.26, F-100, PR #117: Button Block
- KB-D-032 rev 2.28, PR #119: built-in Columns and Button no longer offered
- KB-D-033 rev 2.32, F-103: Teaser options (Title Type merges Title size)
- KB-D-034 rev 2.32 / 2.33, F-104: Section Style colours, shared backgrounds
- KB-D-035 rev 2.34, F-105: dark theme contract
- KB-D-036 rev 2.34: List Item display options ("Link Item" decided with the product owner)
- KB-D-037 rev 2.27: contrast tokens (design sign-off open, O-14)
- KB-D-038 rev 2.13, F-90: footer and nav loading in parallel
- KB-D-039 rev 2.15 / 2.21, F-93, F-98: header reserved space, two zones
- KB-D-040 rev 2.18–2.20: block animation, Motion Speed / Trigger, UE Preview
- KB-D-041 rev 2.18, F-95: skeletons
- KB-D-042 rev 2.36, F-106, PR #127: module preloading
- KB-D-043 rev 2.36, PR #128: fallback fonts
- KB-D-044 rev 2.37, F-107, PR #129: block READMEs
- KB-D-045 AGENTS.md: publish flow
- KB-D-046 … 051 proposal D-1 … D-6: Proposed

## Recommendations
- Listed in the log's "Recommendations (not approved)" table: Tags / Web SDK (11.7, F-06), npm test in CI and release tags (F-37, 12.3), root redirect (F-36), hreflang (F-39), form back end (F-01), Part 6 alignment (F-107), KB pointers in AGENTS.md and .github (derived), removal of the language master review (F-88).
- Validate the query index exclusion of /language-master/en/block-library (derived).
