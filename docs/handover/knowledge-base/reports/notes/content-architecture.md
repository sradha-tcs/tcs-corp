# content-architecture.md

## Sources inspected

- utils/site.js, utils/metadata.js, utils/inherited-metadata.js, utils/placeholders.js, utils/taxonomy.js, utils/tags.js (parseTag reference), utils/data.js, utils/redirects.js, decorators/seo-decorator.js
- scripts/scripts.js (section options, container sections, loadTemplate, loadErrorPage, loadPageContent, addErrorBackButton), 404.html
- models/_page.json, models/_section.json (fields and options), component-filters.json, paths.json, tools/paths/generate-paths.mjs (referenced), templates/README.md, templates/blog/blog.js
- blocks/header/header.js (nav fallback), blocks/footer/footer.js (imports), blocks/fragment/fragment.js, blocks/list/list-data.js (hasTag, isListable), decorators/card-list-decorator.js and blocks/filter-list/filter-list.js (author lookups)
- READMEs: header, footer, fragment, modal, cards, list, filter-list, conversation-canvas, utils
- AGENTS.md "Site structure and site data", "AEM delivery rules", "Header", "Floating Canvas", "Backgrounds and theme"
- Handover Part 3.5–3.9, 4.6–4.9, 7.1.1–7.1.3, 8.1.1–8.1.4, 12.1.6, Part 16.2 (F-07, F-08, F-09, F-10, F-11, F-12, F-30, F-33, F-36, F-40, F-78, F-88)

## Discrepancies

- implementation: header is the TCS Header (desktop >= 1200px logo bar without navigation; tablet / mobile full-screen menu one level at a time) | documented: handover 3.5.1 describes dropdowns, a mobile menu below 900px and `nav-drop-toggle` | impact: authors / support follow outdated header behaviour | correct: code and blocks/header/README.md (handover F-107 covers Part 6; Part 3.5 is outdated too)
- implementation: the bulk metadata column list in AGENTS.md has 41 columns (adds `card-style`, `card-theme`) | documented: handover 8.1.1 "39 columns in AGENTS.md" | impact: column count | correct: AGENTS.md / helix-query.yaml
- implementation: `utils/metadata.js` header comment lists the columns up to `listen-link` only (no `author`, `card-*`, `image-alt`, `eyebrow`, `category`, `hide-in-nav`, `card-style`, `card-theme`) | documented: AGENTS.md full list | impact: code comment incomplete | correct: AGENTS.md
- implementation: `getPageTags()` and `utils/query-index.js` `tagsOf` read both `article:tag` and `cq-tags` (unit tested) | documented: handover F-07 says code reads `article:tag` while AEM may publish `cq-tags` (open) | impact: F-07 appears resolved in code; published tag format still to verify | correct: code
- implementation: Fragment that can't load keeps its authored content on the page | documented: handover 4.8 "renders nothing; the block stays empty" | impact: diagnosis | correct: code
- implementation: `REVIEW_SHEETS` doesn't include `metadata` (applied by the platform through `metadata.source`), while paths.json maps the language master metadata sheet | documented: handover 3.9 consistent | impact: none (noted for clarity)

## Gaps and blocked topics

- Published state of the 12 non-English taxonomy pages, metadata sheets and data sheets (handover F-09, F-11: only /en checked on 13 October 2026) — needs a fresh check on aem.live.
- `metadata.source` configuration for the 13 sheets (open item O-04) — Site Administrator.
- Redirect mechanism (CDN rules) and `/` → `/en/` (F-36, O-03) — Site Administrator / CDN owner.
- Translation process, MSM / language copies, language selector, hreflang strategy — Not recorded (handover 4.9.6 marks them to be confirmed).
- Content ownership, review cadence and approval flows — Not recorded.
- Page Type and content-type value alignment between Page Type, Filter List and Page Header (F-12) — product decision needed.

## Decisions found

- Redirects are per locale by the user's choice; the platform applies only a root `/redirects.json` (AGENTS.md "Notes").
- 13 locale sites published at language-only paths; `paths.json` generated from `LOCALES` (AGENTS.md "Site structure and site data").
- Navigation, Footer and 404 Page inherited like AEM page properties (AGENTS.md; handover 8.1.4).
- Language master published temporarily at `/language-master/en` for review; to be removed after rollout (handover 3.9, F-88).
- Section Style offers Default / Grey / Dark / Dark Green; Highlight no longer offered (handover revision 2.33, F-104, closed).
- No sample content in templates or model defaults (AGENTS.md "AEM delivery rules").

## Recommendations

- Update handover 3.5.1 to point to blocks/header/README.md.
- Close or re-word F-07 after checking a tagged page's published head.
- Complete the `utils/metadata.js` column comment.
- Decide whether Filter List and the Canvas menu should honour `hide-in-nav` and redirects like the List (F-30, F-33; audit D-A-29 deferred).
