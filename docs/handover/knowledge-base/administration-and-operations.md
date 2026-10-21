# Administration and Operations

How the TCS Corporate Website is administered and operated: what the Site Administrator and the support levels own, how block and template availability and the Universal Editor models are governed, how the site configuration (paths, bulk metadata), sheets, taxonomy, locales, publishing, the query index and monitoring are run, and what is still open. It summarizes verified facts and links to the runbooks of the project handover (Part 14 — Operational Runbook & AMS Handover, Part 17 — Operations Guide, Part 12 — Publishing, Deployment & Release) and to `AGENTS.md`.

| Attribute | Value |
| --- | --- |
| Audience | Site Administrator, AMS (L2), L1 author support, technical lead (L3), product owner |
| Source of truth | [AGENTS.md](../../../AGENTS.md) (site structure and site data, notes on `paths.json`, metadata and redirects), [paths.json](../../../paths.json), [tools/paths/generate-paths.mjs](../../../tools/paths/generate-paths.mjs), [utils/site.js](../../../utils/site.js), [helix-query.yaml](../../../helix-query.yaml), [helix-sitemap.yaml](../../../helix-sitemap.yaml), [component-filters.json](../../../component-filters.json), [.eslintrc.js](../../../.eslintrc.js), handover Parts 12, 14 and 17 ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)) |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Requires validation (team names, contacts, SLAs, permissions, the state of the site configuration, the production domain and CDN are not recorded) |

## Responsibilities

The three delivery streams are released independently (handover Part 12): content (AEM author, published by authors), code (GitHub `sradha-tcs/tcs-corp`, synced by AEM Code Sync) and configuration (the Edge Delivery site configuration of org `sradha-tcs`, site `tcs-corp`, changed through the Admin API). The Site Administrator owns the configuration stream.

| Responsibility | Owner (handover Part 14, 14.1) | Verified basis |
| --- | --- | --- |
| Site configuration: `public.json` paths, `metadata.source`, robots, CDN, access | Site Administrator / AMS (L2) | [AGENTS.md](../../../AGENTS.md#site-structure-and-site-data) notes |
| Cache purge, re-index, sitemap regeneration, Admin API status and log review | L2 | Handover 12.1.9; per-page `preview`, `live`, `index` used for packages 1.0.10–1.0.13 (revisions 2.31, 2.35) |
| Sheets (placeholders, metadata, taxonomy, redirects, data) | Content team, with L1 | [AGENTS.md](../../../AGENTS.md#site-structure-and-site-data) |
| Author onboarding and access requests | L1 with the AEM administrator | Handover 14.8.5 (groups and permission model not recorded) |
| Code, models, filters, index and sitemap definitions | Development team (L3) | Repository |
| Platform incidents (Edge Delivery, Universal Editor, AEM as a Cloud Service) | Adobe Support, raised by L2 / L3 | Handover 14.1.1 |

The support levels L1 (author support), L2 (AMS / site administration) and L3 (development) and their RACI are defined in handover Part 14, 14.1. The team names, the named owners (product owner, technical lead, AMS lead, site administrator, analytics owner) and the severity SLAs are not recorded (open items O-01, O-13).

## Block and template availability

- **Component filters** decide what authors can add where: [component-filters.json](../../../component-filters.json), aggregated from [models/_component-filters.json](../../../models/_component-filters.json) (page: Section, Gen Carousel, Tabs Container, Columns Container), [models/_section.json](../../../models/_section.json) (the section filter) and each block's `_<block>.json` (item and container filters). The current filters are listed in [authoring.md](./authoring.md#where-components-can-be-added) and [blocks/README.md](../../../blocks/README.md#container-and-child-relationships).
- **To offer a block**: add its id to the `section` filter in `models/_section.json` (and to the Columns Container / Tabs Container filters where it may appear), run `npm run build:json`, lint, merge; authors reload the Universal Editor.
- **To withdraw a block** without breaking content: remove it from every filter but keep its definition and model, so content authored before still renders and stays editable. This is how the built-in Columns, the built-in Button ("Button (basic)") and Interactive Dashboard were withdrawn ([blocks/README.md](../../../blocks/README.md#deprecated-blocks); handover revisions 2.27, 2.28; audit D-B-17).
- **Templates** (Page Type): `TEMPLATES` in [scripts/scripts.js](../../../scripts/scripts.js) = `home`, `article`, `blog`, `press-release`, code in [templates/](../../../templates/README.md). The Page Type options are in [models/_page.json](../../../models/_page.json). The template pages authors copy are under `/content/tcs-corp/site-global-templates/` (author only, excluded from publishing).
- **Block libraries**: each locale's `block-library/` shows every variation (author only, excluded in [paths.json](../../../paths.json)); keep them and the site global templates in step with new components (handover Part 17, G-12).

| Item | Status |
| --- | --- |
| 27 block folders whose components are in the filters, and the Header (structural, built from the nav page) (see [blocks/README.md](../../../blocks/README.md#block-inventory)) | Active |
| Columns (built-in), Button (basic) | Compatibility-only |
| Interactive Dashboard | Experimental (placeholder, in no filter) |
| Templates `home`, `article`, `blog`, `press-release` | Active |

## Model and definition governance

| Rule | Where | Enforced by |
| --- | --- | --- |
| Edit only the partials (`blocks/*/_*.json`, `models/_*.json`); never the aggregated `component-definition.json`, `component-models.json`, `component-filters.json` | [AGENTS.md](../../../AGENTS.md#content-modeling) | `npm run build:json` (`merge-json-cli`) |
| Staged partials rebuild the aggregated files on commit | [.husky/pre-commit.mjs](../../../.husky/pre-commit.mjs) | Husky pre-commit hook (installed by `npm install`, `prepare`) |
| Models follow the xwalk rules (`plugin:xwalk/recommended`) with project limits of `xwalk/max-cells` (default 4; higher for section, containers and item models) | [.eslintrc.js](../../../.eslintrc.js) | `npm run lint`, and the Build workflow on every push |
| AEM delivery rules: empty rows for dialog tabs, item first cell, no grouped fields in key-value blocks, collapsing suffixes (Text, Title, Type, Alt, MimeType), no `classes_*` on sections, no sample content in templates | [AGENTS.md](../../../AGENTS.md#blocks) "AEM delivery rules" | Review; compare `aem.page` with the local preview after model changes |
| At most three dialog tabs, the last one Additional | [AGENTS.md](../../../AGENTS.md#blocks) "Dialog tabs" | Review |
| Item children instead of composite multifields | [AGENTS.md](../../../AGENTS.md#blocks) "Item children" | Review; `test/items/item-rows.test.mjs` |
| Block README generated sections current | [blocks/README.md](../../../blocks/README.md#maintaining-this-documentation) | `npm test` (`test/docs`) after `npm run build:docs` |

Verified at commit 2d06316: the aggregated component files match a fresh merge of the partials (Passed), and `npm run lint` reports no errors (Passed). A field removed from a model keeps its stored values in AEM but they are no longer shown (handover 12.6.1).

## Permissions and access

No verified permission model was identified. AEM user groups, permissions per locale, the publish approval workflow, the Universal Editor publish destinations, GitHub branch protection, Admin API roles and RUM dashboard access are recorded as "To be confirmed" in the handover (Part 5, 5.1.2; Part 14, 14.10.1; open items O-05, O-06). Blocked: the AEM administrator's and repository administrator's configuration. The handover's access checklist (14.10.1) and monthly access review (Part 17, M-10, G-07) describe what to review once owners exist.

## Assets

- Assets live under `/content/dam/tcs-corp/`; the path is in the `includes` of [paths.json](../../../paths.json).
- Images are copied to the media bus when the page using them is published. **Other DAM files** (Lottie JSON, videos, captions) are served only once they are published themselves; the re-audit lists publishing them as an open operations action (R-B-2, R-D-6 in [REAUDIT-2026-10-20.md](../../../docs/audit/REAUDIT-2026-10-20.md); handover revision 2.31 "Open").
- The DAM folder convention, image licensing rules, maximum video size and approved embed domains are not recorded (open item O-16).

## Metadata

- Each locale has a bulk metadata sheet (`{locale}/metadata`, published as `/en/metadata.json`, `/de-de/metadata.json`, ...). The platform applies them only when all 13 are listed in the site configuration: `POST https://admin.hlx.page/config/{org}/sites/{site}/metadata.json` with `{"source": ["/en/metadata.json", "/de-de/metadata.json", ...]}`. Until then no bulk metadata applies; each sheet's URL patterns must start with its locale ([AGENTS.md](../../../AGENTS.md#site-structure-and-site-data)).
- Whether `metadata.source` is configured is not recorded (open item O-04). Check: `GET https://admin.hlx.page/config/sradha-tcs/sites/tcs-corp/metadata.json` (authenticated; handover Part 17, M-07).
- The columns are listed in [AGENTS.md](../../../AGENTS.md#site-structure-and-site-data); the indexed ones are the properties of [helix-query.yaml](../../../helix-query.yaml). [decorators/seo-decorator.js](../../../decorators/seo-decorator.js) maps the SEO and social columns in the browser.
- Governance of value lists (page types, content types, regions, persona, campaign codes): handover Part 17, G-04 (frequency not recorded).

## Taxonomy

- Tags are AEM tags (`tcs-corp:` namespace); each locale publishes its taxonomy page as `/{locale}/taxonomy.json` (mapped explicitly in [paths.json](../../../paths.json)); a translated taxonomy is a multi-sheet JSON read by language ([utils/taxonomy.js](../../../utils/taxonomy.js), `sheetRows` in [utils/site.js](../../../utils/site.js)).
- Changing a tag ID changes the IDs stored on pages and in the index: re-tag and republish pages before retiring a tag (handover 14.8.4). Tag governance rules and ownership: handover Part 7, 7.4–7.6 (business taxonomy owners not recorded, open item O-10).

## Localization

| Task | Procedure | Source |
| --- | --- | --- |
| Add or change a locale | Developer: edit `LOCALES` in [utils/site.js](../../../utils/site.js), run `npm run build:paths`, commit both; Site Administrator: apply the generated [paths.json](../../../paths.json) to the site configuration's `public.json` → `paths` and add `/{code}/metadata.json` to `metadata.source`; content team: create the locale page, `references/nav`, `references/footer`, `error-pages/404`, `block-library/`, the sheets and data sheets, then publish | [AGENTS.md](../../../AGENTS.md#site-structure-and-site-data), handover 14.8.1 |
| Keep `paths.json` and `public.json` identical | AEM uses the configuration, not the repository file; a difference publishes pages at wrong paths or not at all | handover 12.5, 13.4 |
| Remove the temporary language master review | After the rollout to `/en`: remove `REVIEW` in [tools/paths/generate-paths.mjs](../../../tools/paths/generate-paths.mjs) and `REVIEW_ROOTS`, `REVIEW_SHEETS`, `REVIEW_PAGES` in [utils/site.js](../../../utils/site.js), run `npm run build:paths`, apply the paths | [AGENTS.md](../../../AGENTS.md#site-structure-and-site-data) |

At commit 2d06316, [paths.json](../../../paths.json) has 154 mappings, 15 includes (the 13 locale pages, `/content/dam/tcs-corp/` and the language master root) and 28 excludes (the 13 block libraries and `site-global-templates`, each with `/**`). Translation process, MSM and hreflang are not implemented or recorded (handover 4.9.6).

## Publishing and the Admin API

- Authors publish from the Universal Editor or the Sites console ([authoring.md](./authoring.md#publishing)); sheets, references and non-image assets are published on their own.
- The Edge Delivery Admin API (`https://admin.hlx.page`, authenticated; no credentials are recorded) performs the operations behind publishing. Path segments: org `sradha-tcs`, site `tcs-corp`, ref `main`.

| Operation | Endpoint pattern | Use |
| --- | --- | --- |
| Status | `GET /status/{org}/{site}/{ref}/{path}` | First check for "page not updating" |
| Preview | `POST /preview/{org}/{site}/{ref}/{path}` | Re-preview a path |
| Live | `POST /live/{org}/{site}/{ref}/{path}` | Re-publish a path |
| Unpublish | `DELETE /live/{org}/{site}/{ref}/{path}` | Emergency takedown when AEM can't unpublish |
| Cache | `POST /cache/{org}/{site}/{ref}/{path}` | Purge after a confirmed publish |
| Index | `POST /index/{org}/{site}/{ref}/{path}` | Re-index a path |
| Sitemap | `POST /sitemap/{org}/{site}/{ref}/{path}` | Regenerate a sitemap |
| Code | `POST /code/{org}/{site}/{ref}/{path}` | Re-sync code when Code Sync didn't run |
| Log | `GET /log/{org}/{site}/{ref}` | Who previewed, published, unpublished or synced what |
| Configuration | `/config/{org}/sites/{site}.json` and sub-resources (`public.json`, `metadata.json`) | Site configuration |

Source: handover Part 12, 12.1.9. Admin API operations act immediately on the public site; bulk operations (`/*`) are agreed with the site owner and logged with the before / after JSON (handover Part 17, G-01). Per-page `preview`, `live` and `index` calls were used to publish and reindex the block library packages (handover revisions 2.31, 2.35).

## Indexing and sitemap

- [helix-query.yaml](../../../helix-query.yaml) defines one index over `/**` with target `/query-index.json`, excluding `/**.json`, each locale's `references/**`, `error-pages/**`, `data/**`, `nav`, `footer`, block libraries, `site-global-templates/**`, and any `fragments/` or `modals/` folder. One index serves all locales; [utils/query-index.js](../../../utils/query-index.js) loads it once per page and filters it to the locale (or review) root.
- Publishing adds or updates a row and unpublishing removes it. After a change to `helix-query.yaml`, existing rows are rewritten only when pages are republished or re-indexed (Admin API `index`).
- [helix-sitemap.yaml](../../../helix-sitemap.yaml): one sitemap built from `/query-index.json` into `/sitemap.xml`, `origin` `https://main--tcs-corp--sradha-tcs.aem.live` until a production domain is configured (then replace or remove it). No `hreflang` alternates.
- Consumers: List (child pages, tagged pages), Filter List, Conversation Canvas menus. Block library pages stay out of the index by design (handover revision 2.35).

## Environment checks

| Check | How | Expected |
| --- | --- | --- |
| Locale Home pages | `/en/`, `/de-de/`, ... on the live host (handover Part 17, script 17.2-A) | HTTP 200, header and footer, no `failed to load …` console errors |
| Fragments and 404 pages | `/{locale}/references/nav.plain.html`, `/references/footer.plain.html`, `/error-pages/404.plain.html` (script 17.2-B) | HTTP 200 |
| Build and Code Sync on `main` | Commit checks of the head of `main` (script 17.2-C) | Green |
| Query index rows per locale | `/query-index.json` in pages of 500 rows (script 17.2-D) | Count consistent with publications |
| Sheets per locale | 9 sheets × 13 locales (script 17.3-B) | HTTP 200 and valid JSON |
| Sitemap | `/sitemap.xml` hosts and count (script 17.3-A) | Expected host; new pages present |
| 404 per locale | `/{locale}/health-check-404` (script 17.4-A) | HTTP 404 with the locale's authored 404 page |
| Placeholder completeness | Keys of `/en/placeholders.json` vs each locale (script 17.4-B) | Same key set |
| Data layer | `window.adobeDataLayer` on sample pages | A page entry, component entries, `cmp:click` on clicks |
| Configuration | `GET /config/sradha-tcs/sites/tcs-corp/metadata.json`; `public.json` paths vs [paths.json](../../../paths.json) | 13 sources; identical paths |

The scripts and the full daily, weekly and monthly activity tables (D-01 … D-09, W-01 … W-10, M-01 … M-14) are in handover Part 17 — Operations Guide; where Part 17 and 14.7 differ, Part 17 is the checklist of record. Health check results were not recorded in the repository.

## Monitoring

| Area | State | Source |
| --- | --- | --- |
| Real Use Monitoring (RUM) | Implemented: `sampleRUM` in [scripts/aem.js](../../../scripts/aem.js) (sampling weight 100 by default, collector `ot.aem.live`); [404.html](../../../404.html) sends a `404` checkpoint with the referrer; errors are sent as `error` checkpoints | Code |
| RUM dashboard and domain key | Not recorded | Handover 14.2 |
| PageSpeed Insights | Manual; the `aem-psi-check` on pull requests ([AGENTS.md](../../../AGENTS.md#publishing-process)) | [deployment-and-release.md](./deployment-and-release.md#automated-checks) |
| Uptime monitoring | Not implemented; tool not recorded | Handover 14.2 |
| Analytics | Data layer populated centrally ([decorators/data-layer-decorator.js](../../../decorators/data-layer-decorator.js)); Adobe Tags and the Web SDK not configured (blocked: measurement plan); no consent mechanism | Code |
| AEM author health, publication queues, logs | Cloud Manager and the AEM author (Workflow instances); access not recorded | Handover 14.2, 14.3.2 |
| Dependency updates | Renovate ([.renovaterc.json](../../../.renovaterc.json)) | Repository |

The handover (14.2) proposes thresholds of LCP ≤ 2.5 s, CLS ≤ 0.1 and INP ≤ 200 ms at p75; no alerting on them is configured. Console messages emitted by the code and their meaning: handover Part 14, 14.3.1.

## Support handoff

- The AMS handover checklist (access, knowledge transfer sessions, documentation, open items) is handover Part 14, 14.10; no item of it is recorded as completed in the repository.
- Documentation to hand over: [AGENTS.md](../../../AGENTS.md), [blocks/README.md](../../../blocks/README.md) and the block READMEs, [decorators/README.md](../../../decorators/README.md), [utils/README.md](../../../utils/README.md), [templates/README.md](../../../templates/README.md), the handover ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md), PDF built as described in [docs/handover/README.md](../README.md)), the audits in [docs/audit/](../../../docs/audit/README.md).
- Blocked: support hours, ticketing tool and queue, contacts and SLAs (open item O-13), a site configuration export (14.10.3 #7).

## Routine operations

| Procedure | Summary | Handover |
| --- | --- | --- |
| Update placeholders | Edit Text in `{locale}/placeholders`, keep variables, publish, check `/{locale}/placeholders.json` | 14.8.3 |
| Change the taxonomy | Tags in AEM Tagging, titles on every locale's taxonomy page, publish, re-tag and republish pages | 14.8.4 |
| Onboard an author | Admin Console profile, locale permissions (model not recorded), Sidekick, training | 14.8.5 |
| Add a locale | See [Localization](#localization) | 14.8.1 |
| Add a block | Block folder with JS, CSS and `_<block>.json` (Additional tab), add to the filters, `build:json`, lint, test, library page, PR | 14.8.2 |
| Release activities | R-01 … R-15 | Part 17, 17.5; [deployment-and-release.md](./deployment-and-release.md) |
| Governance | Change records, tag, placeholder key, metadata value, locale, third-party script, access, findings, documentation, configuration backup, block libraries (G-01 … G-12) | Part 17, 17.7 |

The operations calendar of Part 17, 17.8 is a proposed default (time zone and calendar not recorded).

## Escalation

The handover proposes an escalation path (Part 14, 14.5): Author → L1 → L2 → L3 → Adobe Support, with the product owner informed for P1 / P2 and a security contact for suspected security incidents, and the information each step needs (AEM and published path, locale, Admin API status output, console messages, reproduction on `aem.page`). The severity scale P1–P4 is a proposal "to be confirmed in the AMS contract"; the escalation times for P2, the contacts and the security contact are not recorded. Status: Requires validation.

## Deprecation and migration governance

| Item | Rule / state | Source |
| --- | --- | --- |
| Withdrawn components | Remove from the filters, keep the definition and model; content authored before stays editable (Columns, Button (basic), Interactive Dashboard) | [blocks/README.md](../../../blocks/README.md#deprecated-blocks) |
| Legacy composite multifields (labelled as authored before in Hero, Teaser, Page Header, Testimonial, List, Filter List; Anchor List and Footer multifields also still read) | Still read; remove only after confirming no production content uses them (blocked: a production content check) | [BLOCK-ECOSYSTEM-AUDIT.md](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), handover F-87 |
| Renamed or replaced fields | Video `placeholder_image` → `poster` (code reads both); Canvas Button `linkType` → `buttonVariant`; Hero `classes_motion` and Table List `motion` → Animation Type (mapped in code); form item `name` → `fieldName` when key case matters | [REAUDIT-2026-10-20.md](../../../docs/audit/REAUDIT-2026-10-20.md) "Operations and content actions" |
| Production content migration | Built-in Columns → Columns Container / Column Breaks, built-in Buttons → Button blocks, and the field moves above: listed as content actions; done for the block library packages, not recorded for production content | Re-audit, section 5 |
| Removed options | Teaser Personalization, Quote / Testimonial Style, Separator Auto / Custom, Columns Additional tab, Teaser Title size | Audit section 11; handover revision 2.32 |
| Temporary language master review | Remove the `REVIEW*` code and paths after the rollout to `/en` | [AGENTS.md](../../../AGENTS.md#site-structure-and-site-data) |
| Documentation | Every significant change updates the block README, the decorators / utils READMEs, `AGENTS.md` and the handover | [AGENTS.md](../../../AGENTS.md#contributing) |

## Known limitations relevant to operations

| Limitation | Impact | Status |
| --- | --- | --- |
| Per-locale `redirects` sheets aren't applied (the platform applies only a root `/redirects.json`); `/` has no redirect to `/en/` | Old URLs and `/` return 404 | Blocked: a redirect mechanism (for example CDN rules) and the production domain (open item O-03) |
| Bulk metadata applies only once `metadata.source` lists the 13 sheets | Sheet columns ignored until configured | Requires validation (O-04) |
| Production domain, CDN, robots.txt | Site only on `*.aem.live`; sitemap origin is the `.aem.live` host | Not recorded (O-03) |
| Adobe Tags / Web SDK, consent | Data layer populated, nothing collected | Blocked: measurement plan, consent model (O-07) |
| Form back end, search service | Form Variations and Canvas search dispatch events only | Blocked (O-08, O-09) |
| Non-image DAM assets unpublished | Lottie, video and captions 404 | Operations action open (re-audit) |
| 403 / 500 error pages | Authored for a CDN, not used by code | Requires a CDN |
| Unit tests not in CI | Regressions caught only if `npm test` is run | See [deployment-and-release.md](./deployment-and-release.md#automated-checks) |

The full list is handover Part 14, 14.9 and Part 16 — Handover Findings and Open Items Register.

## Related

- [authoring.md](./authoring.md), [deployment-and-release.md](./deployment-and-release.md)
- [architecture.md](./architecture.md), [content-architecture.md](./content-architecture.md), [indexing-and-search.md](./indexing-and-search.md), [security-privacy-consent.md](./security-privacy-consent.md), [decision-log.md](./decision-log.md)
- [AGENTS.md](../../../AGENTS.md): site structure and site data, notes on `paths.json`, bulk metadata and redirects
- [blocks/README.md](../../../blocks/README.md), [docs/audit/README.md](../../../docs/audit/README.md)
- Handover ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)): Part 12 — Publishing, Deployment & Release, Part 13 — Global Troubleshooting Guide, Part 14 — Operational Runbook & AMS Handover, Part 16 — Handover Findings and Open Items Register, Part 17 — Operations Guide
