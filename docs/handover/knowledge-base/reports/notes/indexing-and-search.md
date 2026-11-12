# indexing-and-search.md

## Sources inspected

- helix-query.yaml (whole; 37 properties counted), helix-sitemap.yaml, paths.json (excludes), utils/query-index.js (whole), utils/site.js (indexRoot, REVIEW_*), utils/environment.js (isAuthor), utils/privacy.js, utils/redirects.js
- scripts/scripts.js (prefetchData), decorators/skeleton-decorator.js (delays), decorators/data-layer-decorator.js (cmp:search)
- blocks/list/list.js and list-data.js (empty behaviours, isListable, hasTag, sortCards, limitCards), blocks/filter-list/filter-list.js (SORTS, sorter, byLatest, byPriority, candidatesOf, arrange, perPage / moreCount defaults, empty strings), blocks/conversation-canvas/conversation-canvas.js (loadMenuTree, buildSearchForm, noPagesFound), blocks/cards/cards.js (imports)
- READMEs: list (overview, For Developers to Known Limitations), filter-list (For Developers to Known Limitations), conversation-canvas (data source, search), cards (overview)
- test/list/query-index-tags.test.mjs; test/site/index-root.test.mjs (referenced)
- Handover 2.10.7, 2.10.13, 12.1.7, 12.1.9, revision history 2.31 and 2.35, Part 16.2 (F-07, F-10, F-30, F-33, F-78)

## Discrepancies

- implementation: helix-query.yaml excludes `/*/block-library` and `/*/block-library/**` (one segment before the folder) | documented: handover 3.9 / revision 2.35 say the language master's block library (`/language-master/en/block-library/…`, two segments) is noindex and not in the query index | impact: the exclusion mechanism for the deeper path isn't visible in configuration; it may rely on platform glob semantics or `robots` | correct: Requires validation on the live `/query-index.json`
- implementation: utils/query-index.js merges `tags` and `cqTags` | documented: F-07 open (code reads `article:tag` only) | impact: finding outdated in code terms | correct: code
- implementation: 37 index properties incl. `cardStyle`, `cardTheme` | documented: handover 12.1.7 column list omits `cardStyle`, `cardTheme` and `cqTags` | impact: incomplete list in 12.1.7 | correct: helix-query.yaml (handover 2.10.7 has 37)
- implementation: Conversation Canvas Menu depth is clamped only to a minimum of 1 in code (`Math.max(1, …)`) | documented: README "Menu depth (1 to 3)" | impact: values above 3 authored outside the dialog aren't capped | correct: code (dialog limits in the model)

## Gaps and blocked topics

- Live index state for the 13 locale trees after the F-10 column update: Not recorded (only language master reindexing recorded in revisions 2.31 / 2.35) — needs an Admin API status check or a `/query-index.json` inspection on aem.live.
- Sitemap exclusion of `robots: noindex` pages is stated by the handover (platform behaviour), not verifiable in the repository.
- No search service, search index or search results page exists; the `conversation-canvas:search` event and the Search page URL are the only hand-offs — blocked: search integration decision.
- No per-locale sitemaps or hreflang: Not recorded as a decision.

## Decisions found

- Block library pages stay out of the query index by design (handover revision 2.35, 20 October 2026).
- Data fetching for lists starts at the lazy phase, not eagerly (code comment, `prefetchData`).
- Skeleton after 150ms, at least 250ms (AGENTS.md "Animation and skeletons"; skeleton-decorator.js constants).
- Filter List not applying hide-in-nav and redirects: deferred as a product decision (Filter List README Known Limitations, audit D-A-29).
- Content Fragment lists not supported, by decision (List README Known Limitations).
- Language master pages reindexed per page with the Admin API `preview`, `live`, `index` operations (revisions 2.31, 2.35).

## Recommendations

- Reindex the 13 locale trees (Admin API `index`) and close F-10 after the post-reindex checklist passes.
- Consider per-locale indexes or a smaller index for Filter List (handover 2.10.7 recommendation; F-30).
- Add a nav-order metadata column for the Canvas menu order (F-78).
- Make the block-library exclusion explicit for the review root (e.g. a `/language-master/*/block-library/**` exclude) if the live index shows its pages.
