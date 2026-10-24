# Repository Inventory

Every tracked area of the repository with its purpose, consumers, dependencies, status and documentation: root configuration, workflows, scripts, styles, blocks, decorators, utils, templates, models, tools, tests, fonts, icons, docs and drafts. Consumers were found with `git grep` on imports and references (excluding `docs/`); block statuses come from [tools/docs/blocks.json](../../../../tools/docs/blocks.json). Nothing is removed on the basis of this report: an "Unused candidate" is a file with no consumer found, to be confirmed by its owner.

| Attribute | Value |
| --- | --- |
| Audience | Developers, architects, AMS, AI agents |
| Source of truth | The repository (`git ls-files`), [tools/docs/blocks.json](../../../../tools/docs/blocks.json), [decorators/README.md](../../../../decorators/README.md), [utils/README.md](../../../../utils/README.md), [templates/README.md](../../../../templates/README.md), [package.json](../../../../package.json) |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 (`npm test`: 311 tests Passed on that commit) |
| Status | Requires validation (the Unused candidate and Requires validation rows) |

## Status Vocabulary

| Status | Meaning in this inventory |
| --- | --- |
| Active | Used by the site, the authoring experience or the development process |
| Deprecated | Superseded; kept for reference |
| Compatibility-only | Kept so content authored before keeps working; not offered for new content |
| Experimental | Present but not functional or not offered (placeholder) |
| Unused candidate | No consumer found in the repository; confirm before any change |
| Requires validation | Purpose or effect can't be confirmed from the repository alone |

## Summary

| Area | Items | Active | Other |
| --- | --- | --- | --- |
| Blocks | 30 folders | 28 | `columns` Compatibility-only, `interactive-dashboard` Experimental |
| Decorators | 28 modules | 28 | — |
| Utils | 26 modules | 25 | `multifield.js` Compatibility-only |
| Scripts | 8 files / folders | 8 | — |
| Templates | 4 | 4 | — |
| Tests | 16 files | 16 | — |
| Tools | 8 files | 7 | `tools/sidekick/config.json` Requires validation |
| Root configuration and workflows | 32 rows | 23 | Unused candidate: `well-known/`, `cleanup-on-create.yaml`; Requires validation: `.well-known/`, `xwalk.json`, `.migration/project.json`, `.renovaterc.json`, `README.md`, `CONTRIBUTING.md` / `CODE_OF_CONDUCT.md`, the external PR checks |
| Drafts | 14 files | 8 | 6 Unused candidate (TCS Header test pages, their fragments and media) |

## Root Configuration

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Agent instructions | `AGENTS.md` | Verified project rules for agents and developers | AI agents (via `CLAUDE.md`), developers | — | Active | [AGENTS.md](../../../../AGENTS.md) |
| Claude pointer | `CLAUDE.md` | Points to AGENTS.md (`see @AGENTS.md`) | Claude Code | `AGENTS.md` | Active | — |
| Agent plugin settings | `.agents/settings.json` | Enabled agent plugins of the delivery workspace | Agent tooling | — | Active | — |
| Migration project | `.migration/project.json` | Project type and site paths for the migration tooling; managed by the workspace tooling, so it keeps the author host (a recorded exception, F-112, KB-D-056) | Migration / block library skills | — | Requires validation | — |
| Content mount | `fstab.yaml` | Mounts the AEM author content source (markup) for Edge Delivery | Edge Delivery content bus | AEM author | Active | Handover Part 2 — Solution Architecture |
| Path mappings | `paths.json` | AEM content paths to published paths (154 mappings), includes and excludes; generated | Site configuration `public.json` (applied by an administrator) | `utils/site.js` `LOCALES`, `tools/paths/generate-paths.mjs` | Active | [AGENTS.md](../../../../AGENTS.md) "Site structure and site data" |
| Query index | `helix-query.yaml` | The `/query-index.json` definition: excluded paths, metadata columns | List, Filter List, Conversation Canvas (`utils/query-index.js`), sitemap | Page metadata | Active | Handover Part 8 — Metadata Documentation |
| Sitemap | `helix-sitemap.yaml` | `/sitemap.xml` from the query index, origin the aem.live host until a production domain exists | Search engines | `helix-query.yaml` | Active | Handover 13.25 |
| Head | `head.html` | CSP, viewport, `aem.js` / `scripts.js`, `styles.css`, generated modulepreload links (22) | Every page | `npm run build:modules` | Active | [AGENTS.md](../../../../AGENTS.md) "Module preloading" |
| 404 page | `404.html` | Error page shell: loads the inherited or locale 404 page (`loadErrorPage`) | Edge Delivery (missing URLs) | `scripts/scripts.js`, `scripts/aem.js`, `styles/lazy-styles.css` | Active | Handover Part 10 — Error Pages |
| Component definitions | `component-definition.json` | Universal Editor component definitions; generated | Universal Editor | `models/_component-definition.json`, `blocks/*/_*.json` (`npm run build:json`) | Active | [AGENTS.md](../../../../AGENTS.md) "Content Modeling" |
| Component models | `component-models.json` | Universal Editor dialog models; generated | Universal Editor | `models/_component-models.json`, `blocks/*/_*.json` | Active | Same |
| Component filters | `component-filters.json` | Which components each container offers; generated | Universal Editor | `models/_component-filters.json`, `blocks/*/_*.json` | Active | Same |
| xwalk configuration | `xwalk.json` | `public.xwalk.multi-field.enabled: true` | No consumer in the repository (presumably a site configuration fragment) | — | Requires validation | — |
| Package | `package.json`, `package-lock.json` | Scripts (`lint`, `test`, `build:json`, `build:docs`, `build:modules`, `build:paths`) and dev dependencies; name and version keep the boilerplate values (F-37) | npm, CI, husky | ESLint 8, Stylelint 17, `eslint-plugin-xwalk`, `merge-json-cli`, `npm-run-all`, husky | Active | [AGENTS.md](../../../../AGENTS.md) "Setup Commands" |
| ESLint | `.eslintrc.js`, `.eslintignore` | Airbnb base, JSON, xwalk model rules with per-model `max-cells`; ignores minified files and `docs/audit/tools` | `npm run lint`, Build workflow | — | Active | Handover 13.15 |
| Stylelint | `.stylelintrc.json` | `stylelint-config-standard` | `npm run lint:css` | — | Active | — |
| Editor config | `.editorconfig` | Indentation (2 for JS, 4 for CSS) | Editors | — | Active | — |
| Git ignore | `.gitignore` | Ignores `.hlx`, coverage, logs, `node_modules`; keeps AGENTS.md / CLAUDE.md | git | — | Active | — |
| Edge Delivery ignore | `.hlxignore` | Files not served: dot files, `*.md`, `test/*`, `_*`, `docs/*`, package files | Edge Delivery code bus | — | Active | — |
| Pre-commit hook | `.husky/pre-commit`, `.husky/pre-commit.mjs` | Runs `npm run build:json` and stages the `component-*.json` files when a model partial is staged | git commit | husky (`npm run prepare`) | Active | — |
| Renovate | `.renovaterc.json` | Dependency updates (dev dependencies automerged, ESLint pinned to v8) | Renovate (if installed on the repository) | — | Requires validation | — |
| Cloud Manager challenge | `.well-known/adobe/cloud-manager-challenge` | Domain verification token file (token not reproduced) | Adobe Cloud Manager (external); `.hlxignore` `.*` excludes dot folders from the code bus | — | Requires validation | — |
| Cloud Manager challenge (copy) | `well-known/adobe/cloudmanager-challenge.txt` | Second challenge file outside the standard `/.well-known/` path | No consumer found | — | Unused candidate | — |
| Favicon | `favicon.ico` | Site icon | Browsers | — | Active | — |
| Repository README | `README.md` | Boilerplate README (placeholders "Your Project's Title...", `{repo}` / `{owner}`) | Readers of the repository | — | Requires validation | [docs/handover/README.md](../../README.md) is the project documentation entry |
| Contributing, code of conduct | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` | Boilerplate Project Helix texts | Contributors | — | Requires validation | — |
| License | `LICENSE` | Apache License 2.0 (boilerplate) | — | — | Active | — |

## Workflows and GitHub

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Build workflow | `.github/workflows/main.yaml` | On every push: `npm ci`, `npm run lint` (tests aren't run, F-37) | GitHub Actions, PR checks | Node 24 | Active | Handover 12.2, 13.15 |
| Template cleanup | `.github/workflows/cleanup-on-create.yaml` | Boilerplate helper that removes template files and fills `{repo}` / `{owner}` on repository creation (it deletes itself when it runs; it is still present) | Runs on `create` of `main` or manually | — | Unused candidate | — |
| PR template | `.github/pull_request_template.md` | Issue and before / after test URLs (boilerplate placeholders, F-37) | Pull requests | — | Active | [AGENTS.md](../../../../AGENTS.md) "Publishing Process" |
| External checks | Not in the repository | AEM Code Sync and the PageSpeed check (aem-psi-check) GitHub apps | Pull requests | Feature preview URL in the PR description | Requires validation | Handover 13.15, 13.22 |

## Scripts

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| AEM library | `scripts/aem.js` | Core Edge Delivery decoration, block loading, `sampleRUM`; never modified | `scripts.js`, blocks, decorators, utils, `404.html`, `head.html` | — | Active | [AGENTS.md](../../../../AGENTS.md) |
| Page entry | `scripts/scripts.js` | `loadPage`: eager / lazy / delayed phases, sections and container sections, templates, header / footer, block options, motion, preloading, 404 | Every page; re-exports for blocks and `editor-support.js` | `aem.js`, decorators, utils, `module-graph.js` | Active | [AGENTS.md](../../../../AGENTS.md) "Three-Phase Page Loading" |
| Delayed phase | `scripts/delayed.js` | Empty (`// add delayed functionality here`); the extension point for Adobe Tags (not configured) | `scripts.js` (delayed import) | — | Active | Handover 11.7 |
| Universal Editor support | `scripts/editor-support.js` | Applies editor updates in place (sanitised with DOMPurify) or reloads | Universal Editor context (not imported by site code) | `aem.js`, `scripts.js`, `editor-support-rte.js`, `dompurify.min.js`, `block-options-decorator.js` | Active | Handover 2.3.6 |
| Rich text instrumentation | `scripts/editor-support-rte.js` | Groups rich-text instrumentation for the editor | `editor-support.js` | — | Active | Handover 2.3.6 |
| DOMPurify | `scripts/dompurify.min.js` | Vendored sanitiser (3.2.4) | `editor-support.js` | — | Active | Handover 2.7 |
| Module graph | `scripts/module-graph.js` | Per block, the modules to preload; generated | `scripts.js` (`preloadBlockModules`), `test/modules` | `npm run build:modules` | Active | [AGENTS.md](../../../../AGENTS.md) "Module preloading" |
| Lottie player | `scripts/lib/lottie/` (`lottie_light.min.js`, `LICENSE.md`) | Vendored lottie-web light player | `utils/lottie.js` (`/scripts/lib/lottie/lottie_light.min.js`) | — | Active | [utils/README.md](../../../../utils/README.md) |

## Styles

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Global styles | `styles/styles.css` | Design tokens, LCP layout, sections and backgrounds (theme contract), buttons, Additional tab classes, Inter fallback faces | `head.html` (every page) | — | Active | [AGENTS.md](../../../../AGENTS.md) "Backgrounds and theme" |
| Lazy styles | `styles/lazy-styles.css` | Below-the-fold and editor styles (item placeholders) | `scripts.js` (lazy phase), `404.html` | — | Active | — |
| Fonts | `styles/fonts.css` | `@font-face` for Inter (`fonts/inter-variable.woff2`) | `scripts.js` (`loadFonts`) | `fonts/` | Active | — |
| Motion | `styles/motion.css` | Animation tokens and keyframes, loaded only when a block animates | `decorators/motion-decorator.js` | — | Active | [docs/animation/README.md](../../../animation/README.md) |
| Card list styles | `styles/card-list.css` | Shared card presentation of List and Cards | `blocks/list/list.css`, `blocks/cards/cards.css` (`@import`) | — | Active | [blocks/list/README.md](../../../../blocks/list/README.md) |

## Blocks

Statuses from [tools/docs/blocks.json](../../../../tools/docs/blocks.json) (`interactive-dashboard`: "Experimental (placeholder)"). "Offered in" lists the Universal Editor filters of [component-filters.json](../../../../component-filters.json) that contain the block (`main` is the page, `section` a section). Dependencies name the shared modules imported directly; the full list is in each README's generated "files" section and in [scripts/module-graph.js](../../../../scripts/module-graph.js).

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Block inventory | `blocks/README.md` | Inventory, categories, container / child relationships, shared conventions, deprecated blocks (partly generated) | Developers, authors, `test/docs` | `npm run build:docs` | Active | [blocks/README.md](../../../../blocks/README.md) |
| Accordion | `blocks/accordion/` | Expandable panels (native details / summary), Accordion Item children | Offered in section, columns-container, tabs | `scripts.js`, `editor-item-decorator.js` | Active | [README](../../../../blocks/accordion/README.md) |
| Anchor List | `blocks/anchor-list/` | In-page navigation to section anchors, optionally sticky; Anchor Link items | Offered in section, columns-container, tabs | `cells.js`, `multifield.js`, `properties.js`, `placeholders.js`, `editor-item-decorator.js` | Active | [README](../../../../blocks/anchor-list/README.md) |
| Button (Button Block) | `blocks/button-block/` | A link styled as a button, icon button or link button; replaces the built-in Button | Offered in section, columns-container, tabs | `button-decorator.js`, `buttons.js`, `links.js`, `properties.js` | Active | [README](../../../../blocks/button-block/README.md) |
| Cards | `blocks/cards/` | Manually authored cards with the List's presentation; Card items | Offered in section, columns-container, tabs | `card-list-decorator.js`, `card-list-config.js`, `cells.js`, `tags.js`, `taxonomy.js`, `cards-data.js` | Active | [README](../../../../blocks/cards/README.md) |
| Column Break | `blocks/column-break/` | Starts a column in a Columns Container or a Tab | Offered in columns-container, tabs; `columns-container.js` | `placeholders.js`, `properties.js` | Active | [README](../../../../blocks/column-break/README.md) |
| Columns (built-in) | `blocks/columns/` | Columns of default content; no longer offered (definition kept) | Content authored before; no filter | — | Compatibility-only | [README](../../../../blocks/columns/README.md) |
| Columns Container | `blocks/columns-container/` | A section laid out in columns of default content and blocks | Offered in main; `scripts.js` (`buildColumnsSections`) | `column-break.js`, `placeholders.js` | Active | [README](../../../../blocks/columns-container/README.md) |
| Conversation Canvas | `blocks/conversation-canvas/` | Search prompt with quick actions; one floating journey (`canvas-journey.js`, `canvas-controller.js`) | Offered in section, columns-container; header nav page, footer page | `query-index.js`, `site.js`, `taxonomy.js`, `button-decorator.js`, `skeleton-decorator.js`, `responsive-image-decorator.js` | Active | [README](../../../../blocks/conversation-canvas/README.md) |
| Embed | `blocks/embed/` | YouTube, Vimeo, X and other embeds behind a facade | Offered in section, columns-container, tabs | `media-decorator.js`, `icon-button-decorator.js`, `media.js`, `viewport.js` | Active | [README](../../../../blocks/embed/README.md) |
| Filter List | `blocks/filter-list/` | Filterable listing of the locale's pages from the query index; Filter Tag / Category / Page items | Offered in section, columns-container, tabs | `query-index.js`, `card-list-config.js`, `masonry-decorator.js`, `skeleton-decorator.js`, `article-meta-decorator.js`, `data.js` | Active | [README](../../../../blocks/filter-list/README.md) |
| Footer | `blocks/footer/` | Site footer from the footer reference page; Footer Link items | `scripts.js` (lazy phase); offered in section (footer page) | `fragment.js`, `inherited-metadata.js`, `social-links-decorator.js`, `motion-decorator.js`, `data.js` | Active | [README](../../../../blocks/footer/README.md) |
| Form Variations | `blocks/form-variations/` | Forms built from field items; submit is a `form-variations:submit` event only (no back end, F-01) | Offered in section, columns-container, tabs | `button-decorator.js`, `content-decorator.js`, `heading-decorator.js`, `properties.js`, `ids.js` | Active | [README](../../../../blocks/form-variations/README.md) |
| Fragment | `blocks/fragment/` | Includes another page's sections (`loadFragment`, recursion guard) | Offered in section, columns-container, tabs; header, footer, modal, tabs | `aem.js`, `scripts.js`, `motion-decorator.js` | Active | [README](../../../../blocks/fragment/README.md) |
| Gen Carousel | `blocks/gen-carousel/` | A section whose Heroes or Teasers rotate as slides | Offered in main; `scripts.js` (synthetic block of the section) | `button-decorator.js`, `icon-button-decorator.js`, `analytics.js`, `viewport.js` | Active | [README](../../../../blocks/gen-carousel/README.md) |
| Header | `blocks/header/` | TCS Header from the nav page: logo bar on desktop, full-screen menu below 1200px | `scripts.js` (lazy phase); not in a filter (authored through the nav page) | `fragment.js`, `inherited-metadata.js`, `header-space.js`, `site.js`, `motion-decorator.js` | Active | [README](../../../../blocks/header/README.md) |
| Hero | `blocks/hero/` | Full-width banner with image or Lottie, title, text, CTA items | Offered in section, columns-container, gen-carousel, tabs | `animation-decorator.js`, `button-decorator.js`, `cells.js`, `links.js`, `motion.js`, `media.js` | Active | [README](../../../../blocks/hero/README.md) |
| Interactive Dashboard | `blocks/interactive-dashboard/` | Reserved for a future dashboard; renders nothing on the site | Definition only (not in any filter) | — | Experimental | [README](../../../../blocks/interactive-dashboard/README.md) |
| List | `blocks/list/` | Child pages, a fixed list or tagged pages as cards or links; List Items (`list-data.js` pure, tested) | Offered in section, columns-container, tabs | `card-list-decorator.js`, `skeleton-decorator.js`, `query-index.js`, `redirects.js`, `card-list-config.js`, `taxonomy.js` | Active | [README](../../../../blocks/list/README.md) |
| Modal | `blocks/modal/` | Opens a page's content in a dialog (button or `/modals/` links) | Offered in section, columns-container, tabs; `scripts.js` auto-links | `fragment.js`, `data-layer-decorator.js`, `icon-button-decorator.js`, `analytics.js` | Active | [README](../../../../blocks/modal/README.md) |
| Page Header | `blocks/page-header/` | The page title area from its metadata; CTA items | Offered in section; templates (`ensurePageHeader`) | `article-meta-decorator.js`, `tag-decorator.js`, `metadata.js`, `data.js`, `taxonomy.js` | Active | [README](../../../../blocks/page-header/README.md) |
| Quote | `blocks/quote/` | A quotation with author, optional image and title | Offered in section, columns-container, tabs | `content-decorator.js`, `heading-decorator.js`, `image-decorator.js`, `properties.js` | Active | [README](../../../../blocks/quote/README.md) |
| Separator | `blocks/separator/` | A divider line (`separator-config.js` pure, tested) | Offered in section, columns-container, tabs | `analytics.js`, `properties.js`, `ids.js` | Active | [README](../../../../blocks/separator/README.md) |
| Tab | `blocks/tab/` | Starts a tab panel in a Tabs Container | Offered in tabs; `tabs.js` | `aem.js`, `properties.js` | Active | [README](../../../../blocks/tab/README.md) |
| Table | `blocks/table/` | A data table of 1–5 column rows | Offered in section, columns-container, tabs | `scripts.js`, `ids.js`, `placeholders.js` | Active | [README](../../../../blocks/table/README.md) |
| Table List | `blocks/table-list/` | A numbered list of linked items | Offered in section, columns-container, tabs | `button-decorator.js`, `buttons.js`, `cells.js`, `urls.js`, `motion.js` | Active | [README](../../../../blocks/table-list/README.md) |
| Tabs | `blocks/tabs/` | Tabs Container section and the Tabs block (tabs of fragments); `tabs:reveal` | Offered in main (container); `scripts.js` | `tab.js`, `fragment.js`, `data-layer-decorator.js`, `analytics.js`, `cells.js` | Active | [README](../../../../blocks/tabs/README.md) |
| TCS Header | `blocks/tcs-header/` | The TCS and TATA logos of the header, on the nav page | Offered in section (nav page); `header.js` | `image-decorator.js`, `links.js`, `properties.js` | Active | [README](../../../../blocks/tcs-header/README.md) |
| Teaser | `blocks/teaser/` | Title, text, image or Lottie and links in four layouts; Link and Stat items | Offered in section, columns-container, gen-carousel, tabs | `button-decorator.js`, `heading-decorator.js`, `stats-decorator.js`, `animation-decorator.js`, `article-meta-decorator.js`, `tags.js` | Active | [README](../../../../blocks/teaser/README.md) |
| Testimonial | `blocks/testimonial/` | A client testimonial with author, image and Stat items | Offered in section, columns-container, tabs | `content-decorator.js`, `heading-decorator.js`, `stats-decorator.js`, `cells.js` | Active | [README](../../../../blocks/testimonial/README.md) |
| Video | `blocks/video/` | DAM, YouTube or Vimeo video inline or in a pop-up, with poster and captions | Offered in section, columns-container, tabs | `media-decorator.js`, `media.js`, `image-decorator.js`, `viewport.js`, `site.js` | Active | [README](../../../../blocks/video/README.md) |

## Decorators

Modules that create or decorate elements ([decorators/README.md](../../../../decorators/README.md) lists every export). `head.html` appears as a consumer where the module is preloaded.

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Module inventory | `decorators/README.md` | Exports and users of every decorator; data layer reference | Developers | — | Active | [decorators/README.md](../../../../decorators/README.md) |
| a11y | `decorators/a11y-decorator.js` | `hideVisually`, `createHiddenText` | teaser, testimonial, conversation-canvas; link, card list, social links decorators | — | Active | Same |
| Animation | `decorators/animation-decorator.js` | Lottie animations of the Lotto image type with pause / play | hero, teaser | `lottie.js`, `viewport.js`, `environment.js`, button and icon button decorators | Active | Same |
| Article meta | `decorators/article-meta-decorator.js` | Published date, reading time, page actions, author lockup | page-header, teaser, filter-list, card list decorator | date, button and icon button decorators, `ids.js` | Active | Same |
| Author bio | `decorators/author-bio-decorator.js` | "About the author" from the Authors sheet | `templates/article/article.js` (and blog through it) | link, responsive image decorators | Active | Same |
| Block options | `decorators/block-options-decorator.js` | Additional tab: anchor id, hide, spacing classes | `scripts.js`, `editor-support.js` | `ids.js` | Active | Same |
| Button | `decorators/button-decorator.js` | `decorateButton`, `createButton`, alignment, new-tab hint | 13 blocks, `scripts.js`, other decorators | `buttons.js`, link decorator | Active | Same |
| Card list | `decorators/card-list-decorator.js` | Shared rendering of List and Cards (cards, rows, features, skeleton, layout) | list, cards | scroller, skeleton, data layer, heading, link, button decorators; `card-list-config.js`, `analytics.js` | Active | Same |
| Contact list | `decorators/contact-list-decorator.js` | Media contacts with mail / phone links | `templates/press-release/press-release.js` | — | Active | Same |
| Content buttons | `decorators/content-buttons-decorator.js` | Authored links in content become buttons | `scripts.js`, `editor-support.js` (through `scripts.js`) | button decorator, `buttons.js` | Active | Same |
| Content | `decorators/content-decorator.js` | `fromCell`: property content keeping editor instrumentation | footer, form-variations, quote, teaser, testimonial, video | `properties.js`, `scripts.js` | Active | Same |
| Data layer | `decorators/data-layer-decorator.js` | Adobe Client Data Layer: page, blocks, central `cmp:*` events | `scripts.js`, modal, tabs, card list and skeleton decorators | `analytics.js`, `privacy.js`, `metadata.js`, `viewport.js` | Active | Same; handover Part 11 |
| Date | `decorators/date-decorator.js` | `<time>` for a date | filter-list, article meta decorator | `dates.js` | Active | Same |
| Editor item | `decorators/editor-item-decorator.js` | Placeholders for items without content in Universal Editor | accordion, anchor-list, filter-list, footer, hero, page-header, teaser, testimonial, stats decorator | `placeholders.js` | Active | Same |
| Heading | `decorators/heading-decorator.js` | `buildHeading` (Title + Title Type) | form-variations, quote, teaser, testimonial, card list decorator | `properties.js`, `aem.js` | Active | Same |
| Icon button | `decorators/icon-button-decorator.js` | `createIconButton` | conversation-canvas, embed, filter-list, gen-carousel, modal, video, other decorators | button decorator | Active | Same |
| Image | `decorators/image-decorator.js` | `pictureOf` (image with its alt field) | quote, tcs-header, teaser, testimonial, video | `properties.js` | Active | Same |
| Link | `decorators/link-decorator.js` | `setLinkTarget`, `announceNewTab` | footer, page-header, teaser, button, author bio, card list, social links decorators | a11y decorator | Active | Same |
| Masonry | `decorators/masonry-decorator.js` | Packs grid items of different heights in columns | filter-list | — | Active | Same |
| Media | `decorators/media-decorator.js` | YouTube / Vimeo frames and video elements | embed, video | `media.js` | Active | Same |
| Motion | `decorators/motion-decorator.js` | Prepares and runs Content / Background animation per section; `CONTENT_TARGETS`, `BACKGROUNDS` | `scripts.js`, footer, fragment, header, skeleton decorator | `motion.js`, `environment.js`, `styles/motion.css` | Active | Same; [docs/animation/README.md](../../../animation/README.md) |
| Responsive image | `decorators/responsive-image-decorator.js` | `buildImage` from a URL (site media optimized) | `scripts.js`, conversation-canvas, filter-list, page-header, author bio, card list, social links decorators | `aem.js` | Active | Same |
| Scroller | `decorators/scroller-decorator.js` | Horizontal scroller controls, batched measurements | card list decorator | `environment.js` | Active | Same |
| SEO | `decorators/seo-decorator.js` | Bulk metadata SEO / social columns to head tags, `<html lang>` | `scripts.js` | `metadata.js`, `aem.js` | Active | Same |
| Skeleton | `decorators/skeleton-decorator.js` | `renderWhenLoaded`, `skeletonWhile` (150ms threshold) | conversation-canvas, filter-list, list, card list decorator | data layer, motion decorators | Active | Same |
| Social links | `decorators/social-links-decorator.js` | Social Links sheet as an icon list | footer | link, responsive image, a11y decorators | Active | Same |
| Stats | `decorators/stats-decorator.js` | Stat items (and the Stats multifield authored before) as a description list | teaser, testimonial | `multifield.js`, editor item decorator | Active | Same |
| Tag | `decorators/tag-decorator.js` | `buildTagList` | page-header, teaser | — | Active | Same |
| Template | `decorators/template-decorator.js` | `ensurePageHeader`, `appendLoadedSection` for templates | `templates/article/article.js`, `templates/press-release/press-release.js` | — | Active | Same; [templates/README.md](../../../../templates/README.md) |

## Utils

Helpers that build no UI ([utils/README.md](../../../../utils/README.md) lists every export).

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Module inventory | `utils/README.md` | Exports and users of every util | Developers | — | Active | [utils/README.md](../../../../utils/README.md) |
| Analytics | `utils/analytics.js` | `pushToDataLayer`, `pushComponents`, `pushComponentEvent` | gen-carousel, modal, separator, tabs, data layer and card list decorators | — | Active | Same |
| Buttons | `utils/buttons.js` | Button views, types, alignments, `readButtonOptions` | button-block, conversation-canvas, hero, table-list, tabs, button decorators | — | Active | Same |
| Card list config | `utils/card-list-config.js` | Card list settings, `kindOf` / `themeOf` precedence | list, cards, filter-list, `list-data.js`, `cards-data.js`, card list decorator, tests | — | Active | Same |
| Cells | `utils/cells.js` | `itemRows`, `withoutTabCells`, item layouts | 11 blocks, `test/items`, `test/list` | — | Active | Same |
| Data | `utils/data.js` | The locale's data sheets (authors, locations, partners, social links, media contacts) | filter-list, footer, list, page-header, `scripts.js`, templates | `site.js` | Active (the Locations and Partners loaders have no component reader, F-40) | Same |
| Dates | `utils/dates.js` | `formatDate` | date decorator, `list-data.js`, `cards-data.js` | — | Active | Same |
| Environment | `utils/environment.js` | `prefersReducedMotion`, `isEditing`, `isInEditor`, `isAuthor` | 13 blocks, animation, motion, scroller decorators | — | Active | Same |
| Header space | `utils/header-space.js` | Reserves the header's height before it loads | header, `scripts.js` | `viewport.js` | Active | Same |
| Ids | `utils/ids.js` | Unique ids per block instance, `availableId` | 9 blocks, `scripts.js`, article meta, block options, card list decorators | `aem.js` | Active | Same |
| Inherited metadata | `utils/inherited-metadata.js` | Navigation, Footer and 404 Page from the nearest parent page (cached per session) | header, footer, `scripts.js` | `site.js`, `aem.js` | Active | Same |
| Links | `utils/links.js` | `linkOf`, `readLinkItems`, `readLinkRows`, `NEW_WINDOW` | 10 blocks | `multifield.js` | Active | Same |
| Lottie | `utils/lottie.js` | Loads the vendored Lottie player once | animation decorator | `scripts/lib/lottie/`, `aem.js` | Active | Same |
| Media | `utils/media.js` | YouTube / Vimeo / animation detection and embed URLs, `animationLabel` | embed, hero, teaser, video, media decorator, `test/media` | — | Active | Same |
| Metadata | `utils/metadata.js` | `getPageMetadata`, `getPageTags`, `getPageLanguage` | conversation-canvas, page-header, `scripts.js`, data layer and SEO decorators, templates | `site.js`, `aem.js` | Active | Same |
| Motion | `utils/motion.js` | Validates Content / Background animation values; legacy Motion Type mapping | hero, table-list, motion decorator, `test/motion` | — | Active | Same |
| Multifield | `utils/multifield.js` | Reads composite multifield items authored before item children | anchor-list, filter-list, `links.js`, stats decorator | — | Compatibility-only | Same; [decision-log.md](../decision-log.md) KB-D-015 |
| Placeholders | `utils/placeholders.js` | UI text from the locale's placeholders with English fallbacks | 24 blocks, `scripts.js`, templates, animation and editor item decorators | `site.js` | Active | Same |
| Privacy | `utils/privacy.js` | `redactSearchTerm` (e-mail addresses and phone numbers removed) | data layer decorator, `test/privacy` | — | Active | Same |
| Properties | `utils/properties.js` | Key-value block properties (`readProperties`, `isOn`, `optionOf`) | 18 blocks, content, heading, image, card list decorators, `tags.js` | `aem.js` | Active | Same |
| Query index | `utils/query-index.js` | The locale's pages from `/query-index.json` (loaded once) | conversation-canvas, filter-list, list, `list-data.js`, `scripts.js`, `test/list` | `site.js` | Active | Same |
| Redirects | `utils/redirects.js` | Redirect targets from the locale's redirects sheet | list, `scripts.js`, `test/list` | `site.js` | Active | Same |
| Site | `utils/site.js` | Locales, locale resolution, sheet and page paths, temporary `REVIEW_*` | blocks, `scripts.js`, other utils, `tools/paths/generate-paths.mjs`, `test/site` | — | Active (the `REVIEW_*` part is temporary, KB-D-010) | Same |
| Tags | `utils/tags.js` | Tag IDs and ID-derived labels | cards, filter-list, list, teaser, `taxonomy.js` | `properties.js` | Active | Same |
| Taxonomy | `utils/taxonomy.js` | Tag labels from the locale's taxonomy | cards, conversation-canvas, filter-list, list, page-header, teaser, `scripts.js` | `site.js`, `tags.js` | Active | Same |
| URLs | `utils/urls.js` | `toSitePath` (AEM paths to published paths) | conversation-canvas, table-list | `site.js` | Active | Same |
| Viewport | `utils/viewport.js` | `onVisible`, `watchVisibility`, `currentBreakpoint` | embed, filter-list, gen-carousel, video, animation, card list, data layer decorators, `header-space.js` | — | Active | Same |

## Templates

Loaded eagerly by `scripts.js` `loadTemplate` when the page's Page Type (page property, else the metadata sheet's `page-type`) is in `TEMPLATES`; Page Type options are in [models/_page.json](../../../../models/_page.json).

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Template guide | `templates/README.md` | Templates, Page Types and how to add one | Developers | — | Active | [templates/README.md](../../../../templates/README.md) |
| Home | `templates/home/` | Layout styles of the Home page (first section, hero with the header Canvas row) | Pages with Page Type `home` | — | Active | Same |
| Article | `templates/article/` | Page Header from metadata (unless authored), "About the author" | Pages with Page Type `article`; `blog.js` | template and author bio decorators, `data.js`, `metadata.js`, `placeholders.js` | Active | Same |
| Blog | `templates/blog/` | The article structure and styles | Pages with Page Type `blog` | `article.js` | Active | Same |
| Press release | `templates/press-release/` | Page Header (unless authored), "Media contacts" by region | Pages with Page Type `press-release` | template and contact list decorators, `data.js`, `metadata.js`, `placeholders.js` | Active | Same |

## Models

Default content, page and section models aggregated with the block partials by `npm run build:json`.

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Aggregators | `models/_component-definition.json`, `models/_component-models.json`, `models/_component-filters.json` | Merge the `models/` and `blocks/*/_*.json` partials; the `main` filter (section, gen-carousel, tabs, columns-container) | `npm run build:json` | Block partials | Active | [AGENTS.md](../../../../AGENTS.md) "Content Modeling" |
| Page | `models/_page.json` | Page properties model (`page-metadata`: Page Type, Navigation, Footer, 404 Page, …) | Universal Editor page properties | — | Active | Handover Part 8 |
| Section | `models/_section.json` | Section model and filter (Style Default / Grey / Dark / Dark Green, background image, anchor) | Universal Editor | — | Active | [AGENTS.md](../../../../AGENTS.md) "Backgrounds and theme" |
| Text, Title, Image | `models/_text.json`, `models/_title.json`, `models/_image.json` | Built-in default content components | Universal Editor | — | Active | Handover 6.6–6.8 |
| Button (built-in) | `models/_button.json` | Built-in Button ("Button (basic)", `button-basic`) and the former shared `button` model, no longer offered | Content authored before | — | Compatibility-only | [blocks/button-block/README.md](../../../../blocks/button-block/README.md) |
| Card list fields | `models/_card-list.json` | Shared presentation fields of List and Cards | `blocks/list/_list.json`, `blocks/cards/_cards.json` | — | Active | [blocks/cards/README.md](../../../../blocks/cards/README.md) |

## Tools

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Block docs generator | `tools/docs/generate-block-docs.mjs` | Rewrites the generated sections of the block READMEs | `npm run build:docs`, `test/docs` | `component-*.json`, `blocks.json`, `library-snapshot.json`, handover screenshots | Active | [AGENTS.md](../../../../AGENTS.md) "Setup Commands" |
| Block docs validator | `tools/docs/validate-block-docs.mjs` | Required sections, generated sections current, links, no sensitive identifiers | `test/docs`, manual run | `generate-block-docs.mjs` | Active | [docs/blocks/BLOCK-DOCUMENTATION-REPORT.md](../../../blocks/BLOCK-DOCUMENTATION-REPORT.md) |
| Block docs report | `tools/docs/report-block-docs.mjs` | Builds the block documentation report | Manual run | generator, validator, `docs/blocks/reports/` | Active | Same |
| Block metadata | `tools/docs/blocks.json` | Status, type, category, purpose, relationships of each block (hand-maintained) | Docs generator | — | Active | [blocks/README.md](../../../../blocks/README.md) |
| Library snapshot | `tools/docs/library-snapshot.json` | Block library examples and usage (package 1.0.13) for the READMEs | Docs generator | — | Active | — |
| Module graph generator | `tools/modules/generate-module-graph.mjs` | Writes `head.html` modulepreload links and `scripts/module-graph.js` | `npm run build:modules`, `test/modules` | Site JavaScript | Active | [AGENTS.md](../../../../AGENTS.md) "Module preloading" |
| Paths generator | `tools/paths/generate-paths.mjs` | Writes `paths.json` from `LOCALES` (and the temporary `REVIEW` block) | `npm run build:paths` | `utils/site.js` | Active | [AGENTS.md](../../../../AGENTS.md) |
| Sidekick configuration | `tools/sidekick/config.json` | Sidekick project settings; the project name keeps the boilerplate value "AEM XWalk Boilerplate" (F-37) | AEM Sidekick | — | Requires validation | Handover 12.3 |

## Tests

`npm test` runs `node --test 'test/**/*.test.mjs'`; on commit 2d06316: 311 tests, 53 suites, Passed (run for this inventory on 21 October 2026). CI doesn't run them (F-37).

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Cards data | `test/cards/cards-data.test.mjs` | Card items read in model order with tab cells | `npm test` | `blocks/cards/cards-data.js` | Active | [blocks/cards/README.md](../../../../blocks/cards/README.md) |
| Canvas journey | `test/conversation-canvas/canvas-journey.test.mjs` | Journey roles, states and transitions | `npm test` | `canvas-journey.js` | Active | [blocks/conversation-canvas/README.md](../../../../blocks/conversation-canvas/README.md) |
| Block docs | `test/docs/block-docs.test.mjs` | Every block has a current, valid README | `npm test` | `tools/docs/` | Active | [blocks/README.md](../../../../blocks/README.md) |
| Item rows | `test/items/item-rows.test.mjs` | Item models render the cells their block reads; item rows told from block rows | `npm test` | `utils/cells.js`, `test/model-layout.mjs` (block model partials) | Active | [AGENTS.md](../../../../AGENTS.md) "Item children" |
| List display precedence | `test/list/display-precedence.test.mjs` | Card style and colour precedence | `npm test` | `blocks/list/list-data.js` | Active | [blocks/list/README.md](../../../../blocks/list/README.md) |
| List fixtures | `test/list/fixtures.mjs` | Shared fixtures of the List tests | List tests | — | Active | — |
| List data | `test/list/list-data.test.mjs` | Configuration, items in model order, redirects | `npm test` | `list-data.js`, `redirects.js`, `cells.js`, `test/model-layout.mjs` | Active | Same |
| Query index tags | `test/list/query-index-tags.test.mjs` | `article:tag` and `cq-tags` columns | `npm test` | `query-index.js` | Active | Same |
| Vimeo URLs | `test/media/vimeo-url.test.mjs` | `vimeoEmbedUrl` | `npm test` | `media.js` | Active | [blocks/video/README.md](../../../../blocks/video/README.md) |
| Model layout helper | `test/model-layout.mjs` | Reads an item model's field layout (tab cells) from a block model partial | Item, List and Cards tests | Block model partials | Active | — |
| Block names | `test/models/block-names.test.mjs` | Component template names render as existing block folder classes | `npm test` | `component-definition.json` | Active | [decision-log.md](../decision-log.md) KB-D-029 |
| Module graph | `test/modules/module-graph.test.mjs` | `module-graph.js` and `head.html` preloads current | `npm test` | `tools/modules/` | Active | [AGENTS.md](../../../../AGENTS.md) "Module preloading" |
| Motion | `test/motion/motion.test.mjs` | Animation values from block classes | `npm test` | `motion.js` | Active | [docs/animation/README.md](../../../animation/README.md) |
| Privacy | `test/privacy/privacy.test.mjs` | `redactSearchTerm` | `npm test` | `privacy.js` | Active | [decorators/README.md](../../../../decorators/README.md) |
| Separator config | `test/separator/separator-config.test.mjs` | Separator defaults and markup | `npm test` | `separator-config.js` | Active | [blocks/separator/README.md](../../../../blocks/separator/README.md) |
| Site | `test/site/index-root.test.mjs` | `indexRoot`, `getParentPages`, the language master review | `npm test` | `site.js` | Active | [utils/README.md](../../../../utils/README.md) |

## Fonts and Icons

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Inter | `fonts/inter-variable.woff2` | The site font (Latin scripts; CJK locales use system fonts, F-38) | `styles/fonts.css` | — | Active | [AGENTS.md](../../../../AGENTS.md) "Module preloading" (fallback faces) |
| Arrows | `icons/arrow-down.svg`, `arrow-left.svg`, `arrow-right.svg`, `arrow-up-right.svg` | Link, CTA and menu arrows | hero, conversation-canvas, header, button-block, table-list, teaser CSS / JS, `styles/styles.css`, `styles/card-list.css` | — | Active | Block READMEs |
| Chevrons | `icons/chevron-down.svg`, `chevron-left.svg`, `chevron-right.svg` | Disclosure and previous / next controls | accordion, button-block, conversation-canvas, gen-carousel, card list decorator, `styles/styles.css` | — | Active | Same |
| Controls | `icons/close.svg`, `menu.svg`, `pause.svg`, `play.svg`, `search.svg`, `filter.svg`, `mic.svg` | Dialog close, menu, media, search, filter and voice buttons | modal, header, conversation-canvas, gen-carousel, tabs, video, embed, filter-list, animation and icon button decorators | — | Active | Same |
| Page actions | `icons/download.svg`, `share.svg`, `headphones.svg` | Download, share and listen actions | article meta and card list decorators, filter-list, teaser model | — | Active | Same |
| Social | `icons/facebook.svg`, `instagram.svg`, `linkedin.svg`, `x.svg`, `youtube.svg` | Social Links sheet icons, YouTube embeds | social links decorator, embed | — | Active | [blocks/footer/README.md](../../../../blocks/footer/README.md) |

## Docs

Not served (`docs/*` in `.hlxignore`).

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Project handover | `docs/handover/TCS-CORP-HANDOVER.md`, `.pdf` | The official handover (version 2.37) | All roles | Screenshots, whitepaper tooling | Active | [docs/handover/README.md](../../README.md) |
| Handover screenshots | `docs/handover/screenshots/` | 628 figures of the handover, also linked from block READMEs | Handover, block READMEs, docs generator | — | Active | [screenshots/README.md](../../screenshots/README.md) |
| Earlier guides | `docs/handover/AUTHOR-GUIDE.pdf`, `DEVELOPER-GUIDE.pdf`, `ADMIN-GUIDE.pdf` | Guides of 11 October 2026, superseded by the handover | Reference | — | Deprecated | [docs/handover/README.md](../../README.md) |
| Knowledge base | `docs/handover/knowledge-base/` | Single source of truth index for humans and agents | All roles, AI agents | The sources it links | Active | [README](../README.md) |
| Block documentation report | `docs/blocks/BLOCK-DOCUMENTATION-REPORT.md`, `docs/blocks/reports/` | README inventory, 170 handover-vs-code discrepancies, matrices; per-block review notes | Documentation, developers | `tools/docs/report-block-docs.mjs` | Active | [report](../../../blocks/BLOCK-DOCUMENTATION-REPORT.md) |
| Block ecosystem audit | `docs/audit/` (reports, `blocks/`, `reaudit/`, `data/`, `tools/`) | Audit of 19 October 2026, re-audit and dialog options of 20 October 2026; the tools are delivery-workspace scripts kept as evidence (absolute paths, not runnable here) | Developers, QA | — | Active (`docs/audit/tools/`: kept as evidence) | [docs/audit/README.md](../../../audit/README.md) |
| Animation report | `docs/animation/README.md` | Block animation and skeleton loading | Developers, authors | — | Active | [docs/animation/README.md](../../../animation/README.md) |
| Proposals | `docs/proposals/` | Design proposals (Cards and Card refactoring, decisions D-1 to D-6 open) | Product owner, architects | — | Active | [docs/proposals/README.md](../../../proposals/README.md) |

## Drafts

Static test pages for the local preview (`aem up --html-folder drafts`). `drafts/` isn't in `.hlxignore`, so the files are also served by the code bus (requires validation whether that is intended).

| Item | Path | Purpose | Consumers | Dependencies | Status | Documentation |
| --- | --- | --- | --- | --- | --- | --- |
| Canvas journey pages | `drafts/canvas-journey.html`, `canvas-journey-primary.html`, `canvas-journey-primary-text.html`, `canvas-journey-primary-dark.html`, `canvas-journey-fallback.html`, `canvas-journey-header.html` | Local checks of the floating journey (all variations, primary docks, footer without a Canvas, Canvas in the nav page) | Developers (listed in the Conversation Canvas README "Local checks") | `scripts.js`, `aem.js`, `footer-no-canvas.plain.html`, `nav-canvas.plain.html` | Active | [blocks/conversation-canvas/README.md](../../../../blocks/conversation-canvas/README.md) |
| Canvas fragments | `drafts/footer-no-canvas.plain.html`, `drafts/nav-canvas.plain.html` | Footer and nav fragments of the journey pages | `canvas-journey-fallback.html`, `canvas-journey-header.html` | — | Active | Same |
| TCS Header pages | `drafts/tcs-header.html`, `drafts/tcs-header-block.html` | Early local pages of the TCS Header | No reference outside `drafts/` | `nav-tcs.plain.html`, `nav-tcs-block.plain.html` | Unused candidate | [blocks/header/README.md](../../../../blocks/header/README.md) |
| TCS Header fragments | `drafts/nav-tcs.plain.html`, `drafts/nav-tcs-block.plain.html` | Nav fragments of the TCS Header pages | The TCS Header draft pages only | `drafts/media/` | Unused candidate | Same |
| Draft media | `drafts/media/tcs-logo.png`, `drafts/media/tata-logo.png` | Logo images of the TCS Header drafts | The TCS Header drafts only | — | Unused candidate | Same |

## Unused Candidates and Items to Validate

| Path | Finding | What confirms it |
| --- | --- | --- |
| `well-known/adobe/cloudmanager-challenge.txt` | No consumer; not at the standard `/.well-known/` path | The Cloud Manager domain verification owner |
| `.well-known/adobe/cloud-manager-challenge` | `.hlxignore` (`.*`) keeps dot folders off the code bus, so Edge Delivery may not serve it | A request for the file on the production domain once configured |
| `.github/workflows/cleanup-on-create.yaml` | Boilerplate helper that should have removed itself on repository creation | Repository administrator |
| `xwalk.json` | No consumer in the repository | Whether it was applied to the site configuration |
| `drafts/tcs-header*.html`, `drafts/nav-tcs*.plain.html`, `drafts/media/` | Referenced only by each other | The header owner |
| `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `tools/sidekick/config.json`, `.github/pull_request_template.md`, `package.json` name | Boilerplate texts and values (F-37) | Technical lead |

Checked and **not** unused: `decorators/author-bio-decorator.js`, `decorators/contact-list-decorator.js` and `decorators/template-decorator.js` are imported by the article and press-release templates, which `scripts.js` loads by Page Type; `scripts/lib/lottie/` is loaded by `utils/lottie.js`; every icon in `icons/` has a consumer.

Folders present in the working copy but not tracked by git (local delivery workspace, not part of the repository): `.handover-work/`, `.home-work/`, `content/`, `en/`, `migration-work/`, `drafts/dam/`, `drafts/en/`, `drafts/language-master/`, `query-index.json`, `node_modules/`.

## Related

- [Knowledge base index](../README.md)
- [Agent guidelines](../agent-guidelines.md)
- [Agent instructions (for AGENTS.md)](../agent-instructions.md)
- [Copilot instructions](../copilot-instructions.md)
- [Decision log](../decision-log.md)
- Topic files: [repository structure](../repository-structure.md), [architecture](../architecture.md), [blocks](../blocks.md), [development standards](../development-standards.md), [testing and quality](../testing-and-quality.md)
- [blocks/README.md](../../../../blocks/README.md), [decorators/README.md](../../../../decorators/README.md), [utils/README.md](../../../../utils/README.md), [templates/README.md](../../../../templates/README.md), [AGENTS.md](../../../../AGENTS.md)
- [Project handover](../../TCS-CORP-HANDOVER.md) (Part 16 — Handover Findings and Open Items Register), [docs/blocks/BLOCK-DOCUMENTATION-REPORT.md](../../../blocks/BLOCK-DOCUMENTATION-REPORT.md)
