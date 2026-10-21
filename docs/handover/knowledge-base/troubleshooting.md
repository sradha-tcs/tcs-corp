# Troubleshooting

This runbook lists the problems most often met when developing, authoring, publishing and measuring the TCS Corporate website. For each it gives the likely cause, the diagnostic steps, the resolution and how to verify the fix, all checked against the code at the commit below. It summarizes the handover's Global Troubleshooting Guide (Part 13) and the block READMEs' Troubleshooting sections and links to them; the escalation levels and response targets stay in the handover.

| Attribute | Value |
| --- | --- |
| Audience | Developers, support (L1–L3), site administrators, QA, AI coding agents |
| Source of truth | [scripts/aem.js](../../../scripts/aem.js), [scripts/scripts.js](../../../scripts/scripts.js), [scripts/editor-support.js](../../../scripts/editor-support.js), [decorators/data-layer-decorator.js](../../../decorators/data-layer-decorator.js), [utils/](../../../utils/README.md), [helix-query.yaml](../../../helix-query.yaml), [AGENTS.md](../../../AGENTS.md), block READMEs (Troubleshooting), handover Part 13 — Global Troubleshooting Guide and 14.3 Logs |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current (Data Collection, Target / AJO and consent rows describe integrations that aren't implemented) |

## Triage First

1. **Where does it happen?** Universal Editor (author content, `main` code), preview (`*.aem.page`), live (`*.aem.live`) or local (`localhost:3000`, local code on previewed content). This separates authoring state, publication state, caching and code.
2. **Which locale?** Most site data is per locale (nav, footer, placeholders, taxonomy, sheets, 404).
3. **How wide?** One page points to content; one block type to block code or its content; every page to code, configuration or the platform.
4. **What changed just before?** A merge, a publication, a package install or a configuration change.
5. **Which breakpoint?** Mobile < 600px, tablet 600–1199px, desktop ≥ 1200px (the header's desktop layout also starts at 1200px).

### Diagnostic toolkit

| Tool | Use |
| --- | --- |
| Console | `failed to load module for <block>`, `failed to load block <block>`, `failed to load template <name>`, `Auto Blocking failed`, `failed to play the Lottie animation`, `motion` / `skeleton` errors, CSP violations |
| Network | Block JS / CSS, `*.plain.html` (fragments, nav, footer, error pages), `/{locale}/placeholders.json`, `/{locale}/taxonomy.json`, `/{locale}/data/*.json`, `/query-index.json?offset=0&limit=500` |
| Delivered markup | `curl https://main--tcs-corp--sradha-tcs.aem.page/{path}.plain.html` shows the rows and cells a block receives; `curl -I` shows status and cache headers |
| Debug switches | `?debug=list`, `?debug=separator` (`console.debug`, enable Verbose); `?rum=on` forces RUM sampling |
| Data layer | `window.adobeDataLayer`, `adobeDataLayer.filter((e) => e.event)` |
| Journey state | `document.documentElement.dataset.canvasJourneyState` (Conversation Canvas) |
| Admin API | `GET https://admin.hlx.page/status/sradha-tcs/tcs-corp/main/{path}` (preview, live, source times; authenticated) |
| Local server | `aem up` to tell code from content |

## Runbook

### Development and code

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| --- | --- | --- | --- | --- |
| Local dev server doesn't start or pages 404 on `localhost:3000` | AEM CLI not installed or the port is taken. The page isn't previewed: the local server serves previewed content. Node older than 20 (README: Node 20+; CI uses 24) | `node -v`; read the CLI output; open the page on `main--tcs-corp--sradha-tcs.aem.page`. For test pages, check the file is in `drafts/` | `npx -y @adobe/aem-cli up --no-open --forward-browser-logs`; free the port; preview the page in AEM, or serve static pages with `--html-folder drafts` | The page loads on `localhost:3000` with the local code |
| Pre-commit doesn't rebuild `component-*.json` | `npm install` never ran (Husky is installed by `prepare`), or the commit used `--no-verify` | Check `.husky/pre-commit` runs; `npm run build:json` then `git diff` | `npm install`; `npm run build:json` and commit the three aggregated files | No diff after `npm run build:json` |
| `npm test` fails in `module-graph` or `block-docs` | An import or model changed without regenerating | Read the failing assertion | `npm run build:modules` and / or `npm run build:docs`; commit the output | `npm test` passes |
| Build check red on a PR | ESLint (Airbnb, `.js` extensions, line endings), xwalk model rules or Stylelint | Actions log; `npm run lint` locally | `npm run lint:fix`; for `xwalk/max-cells` use field collapsing / element grouping before raising the limit in `.eslintrc.js` | Build green on the latest commit |
| Block shows raw rows or nothing; `failed to load module for <block>` | JS / CSS 404, syntax error, `decorate()` threw on unexpected content, block not on `main` yet, or a renamed import | Console stack; Network status of `/blocks/{name}/{name}.js`; `.plain.html` of the block vs its `_{name}.json`; reproduce with `aem up` | Fix the code (or revert the merge), or fix the content; merge the branch that adds the block | No load error in the console. Note: `data-block-status="loaded"` is set **even when loading failed**, so it doesn't prove success |
| Decoration error only on the published page, not in the editor or local preview | The code assumes a structure AEM doesn't deliver: an empty row for each dialog tab, item first cell `<node name>, <classes>`, collapsed `*Text` / `*Title` / `*Type` / `*Alt` fields, lower-cased item names | Compare `.plain.html` on aem.page with the local markup; count the item's cells | Read rows by `data-aue-prop` in the editor and skip tab rows on the page (`itemRows`, `utils/cells.js`); never assume "the first row" | The block renders on aem.page; unit tests for the cell layout pass |
| Block CSS not applied although the CSS file exists | `loadCSS` (`scripts/aem.js`) skips a stylesheet when a `head > link` with the same href exists, **whatever its rel**: a `preload` link added to the head suppresses the stylesheet. Other causes: CSS 404; selector not scoped or overridden; style only in `lazy-styles.css` | Elements panel: is there a `rel="stylesheet"` link for `/blocks/{name}/{name}.css`? Is there a head link with the same href? Network status | Put stylesheet preloads in the body (as `preload` in `scripts.js` does); fix the path or the selector | Computed styles show the block rules; no 404 |
| Universal Editor reloads the page on every edit, or shows stale rendering | `editor-support.js` couldn't match the update to an element and called `window.location.reload()`. Container sections re-render as a whole. Blocks that read the index or sheets can't show published data | Console during the update; which block | Reload the editor; make the block re-decoratable from fresh markup; report with the block and page path | Edits of simple blocks apply in place |
| Code change not visible after merge | Code Sync didn't process the push; browser cache; the file is ignored by `.hlxignore` (`_*`, `docs/*`, `test/*`, `*.md`) | Code Sync check on the merge commit; request the file on `main--tcs-corp--sradha-tcs.aem.page` | Re-trigger the sync (Admin API code operation or an empty commit); hard reload | The served file matches the commit |
| Third-party script blocked (CSP) | `head.html` / `404.html` CSP `'nonce-aem' 'strict-dynamic'`: tags without the nonce are blocked | Console CSP message (blocked URI, directive) | Load the script with `loadScript()` from `scripts/delayed.js`; change the policy only in both files with a security review | No CSP violation; the script runs |

### Authoring and delivery

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| --- | --- | --- | --- | --- |
| Dialog field, tab or block missing in Universal Editor | Aggregated `component-*.json` not rebuilt; change only on a branch (the editor uses `main`); block not in the section or container filter; editor not reloaded; field hidden by its visibility condition | Search `component-models.json` on `main`; `npm run build:json` and diff; check `component-filters.json`; read the block README's field table (conditions) | Rebuild, merge, reload the editor; add the block to the filter; set the controlling field | The field or block appears after a full reload |
| A dialog value doesn't persist or changes nothing on the page | Delivery rules: the field name ends in Text / Title / Type / Alt / MimeType and collapses; grouped `prefix_name` field in a key-value block; `classes_*` on a section (not delivered; use `container*`); `multi: true` on `aem-content` (not saved); built-in Button / Columns options (not delivered) | `.plain.html` on aem.page: is the value there? For sections, look for `data-container*` attributes | Rename the field (`buttonVariant`, `titleHidden`, `poster`), use item children or `container*` fields; migrate content; use the Button Block / Columns Container | The value appears in the delivered markup and the block reflects it |
| Hidden block, or a faded block with a dashed outline | Additional tab Hide block (`hideblock`): hidden outside edit mode, dimmed in edit mode, still in the HTML | Select the block; check Hide block | Clear Hide block and republish (never use it for confidential content) | Visible in Preview and on the site |
| `#anchor` link doesn't jump | Anchor ID includes its `anchor-` prefix in the id; duplicates get `-2`; sections use Anchor name | Inspect the element `id` | Link `#anchor-…`; use unique ids | `page#anchor-…` scrolls to the block |
| Fragment, Modal or Tab content empty | Fragment page not published; path not starting with `/` (full URL) or `//`; the fragment references the page itself or its including chain (recursion guard) | Network: `{path}.plain.html` status; the Reference value | Publish the fragment; pick it with the content picker | Content renders on reload |

### Layout, media and links

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| --- | --- | --- | --- | --- |
| Layout wrong at one width, or horizontal scrolling | Rule outside the mobile-first breakpoints (600 / 900 / 1200px); fixed px sizes; an element wider than the viewport; the editor canvas is narrower than the window (e.g. Teaser image Right applies from 600px) | Reproduce at 1440, 1024, 768, 600 and 390px; in the console compare `document.documentElement.scrollWidth` with `clientWidth`; find the element extending past the right edge | Fix the block CSS (rem, `min-width` queries, scoped selectors); test the editor at its canvas width | No overflow at the five widths; the harness overflow check is 0 |
| Header layout unexpected between 900 and 1199px | The desktop header (logo bar) starts at 1200px (`header.js` `matchMedia('(min-width: 1200px)')`); some handover pages still say 900px | Check the viewport width | Expected behaviour; test at ≥ 1200px for desktop | Logo bar at ≥ 1200px, menu below |
| Lottie, video or captions 404 on aem.page / aem.live while images work | Non-image DAM files (Lottie JSON, MP4, WebVTT) are served only once previewed / published; images travel with the page | Network: the asset URL status | Publish the assets from AEM Assets (publish with references) | The file returns 200; the animation or video plays |
| Lottie shows a still frame, or video waits for a click | Reduced motion (by design: paused animations, click-to-play videos); `failed to play the Lottie animation`; Image type not Lotto | OS reduced-motion setting; console; asset status | Accept reduced motion; publish the JSON; set the Image type | Plays with reduced motion off |
| Image not optimised or large | Typed / external URLs (only same-origin `/media_` images are optimised by `createOptimizedPicture` / `decorators/responsive-image-decorator.js`); large committed SVGs or Lottie files | Network (Img): `/media_…?width=…&format=webply` or external | Use AEM Assets references; compress committed files | `<picture>` with width variants; PageSpeed no longer flags it |
| Broken image in a fragment or card | Asset unpublished, not a `/media_` path, or a typed URL | Inspect `img src` | Re-select the image with the picker and republish | Image loads |
| Link opens wrong target or isn't announced | List cards link to the redirect target of `/{locale}/redirects.json` (`utils/redirects.js`, up to 5 hops); a new-tab link without `announceNewTab`; unsafe schemes are rejected (`isSafeUrl`) | Check the sheet; inspect the link's text / `aria-label` | Correct the redirects sheet; use the link decorators | Card URL as expected; new-tab hint present |
| Old URL returns 404 instead of redirecting; `/` returns 404 | The platform applies only a root `/redirects.json`; per-locale sheets aren't applied; `/content/tcs-corp` isn't published | `curl -I` the old URL / the root | Configure the redirect mechanism (e.g. CDN rules); decision owned by the site administrator | 301 / 302 with the expected `location` |

### Index, lists and search

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| --- | --- | --- | --- | --- |
| Page missing from `/query-index.json` | Not published to live; under an excluded path (`/*/references/**`, `/*/error-pages/**`, `/*/data/**`, `/*/nav`, `/*/footer`, block libraries, `site-global-templates`, `/**/fragments/**`, `/**/modals/**`); not reindexed after a `helix-query.yaml` change | Search the path in `/query-index.json?limit=500` (and further `offset` pages); check the excludes | Publish; move the page out of excluded folders; reindex | The row exists with the expected columns |
| Index row lacks columns (card, eyebrow, hide-in-nav, featured) | The index was built before the `helix-query.yaml` change (finding F-10) | Inspect the row's keys | Reindex the affected paths | Columns present |
| List / Filter List empty in Universal Editor | Expected: no query index on AEM author; the hint says the pages show on the published page, or names missing settings | Read the hint | Complete the named settings; review on aem.page | Cards on the preview |
| List / Filter List incomplete on the site | Pages not published or indexed; Parent page / depth, Search root, tags (any / all), Root path, Page types / Content types don't match; `hide-in-nav = yes`; Maximum items; rows filtered to the locale root (`indexRoot`) | `?debug=list` (configuration, warnings, cards); compare index rows with the settings | Fix settings or metadata; publish the pages | Expected cards and result count |
| Filter List "No resources found." or pills with derived labels | Filters too narrow; tags missing from `/{locale}/taxonomy.json`; values that aren't tag IDs | Index rows below the Root path; the taxonomy JSON | Fix Root path / types; publish the taxonomy; pick tags with the picker | Cards and taxonomy titles |
| Canvas search does nothing visible | No Search page and no integration listening to `conversation-canvas:search` | Check the Search page field; listen for the event in the console | Set the Search page or connect an integration | A query opens results |
| Search term missing or altered in the data layer | By design `cmp:search` carries the redacted term (e-mail addresses and phone numbers replaced, cut at 100 characters; `utils/privacy.js`); an empty search pushes nothing | `adobeDataLayer.filter((e) => e.event === 'cmp:search')` | None (privacy rule) | Redacted term present |

### Data layer, analytics and Adobe integrations

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| --- | --- | --- | --- | --- |
| `adobeDataLayer.getState` / `addEventListener` undefined | Expected: the ACDL library isn't loaded (normally by the Tags ACDL extension), so `adobeDataLayer` is a plain array | `Array.isArray(window.adobeDataLayer)` | None until Adobe Tags is configured; read the array | Entries present in the array |
| Block or component entries missing | Blocks are added once decorated (main content in the lazy phase; header, footer and late blocks after 3 seconds in `loadDelayed`); `data-analytics="off"` on the block; blocks inside `[data-analytics]` push their own state | Wait 3 s; check `data-cmp-id`, `data-analytics` on the element | Turn the block's Analytics option on (List, Cards, Separator); report missing entries for tracked blocks | Component entry with `@type` `tcs-corp/components/{block}` |
| Clicks missing | Clicks on `<summary>` push `cmp:show` / `cmp:hide`, not clicks; the element is inside `data-analytics="off"`; a handler stopped the event before the capture listener | `adobeDataLayer.filter((e) => e.event === 'cmp:click')` with Preserve log on | Describe the interaction with `data-cmp-*`; don't stop propagation in capture | One `cmp:click` per click |
| Clicks duplicated, or duplicate component ids | A block pushes its own `cmp:click` in addition to the central capture; ids reused (`data-cmp-id` from duplicate block ids) | Count events per click; list component ids | Remove block-level click pushes (blocks only push state via `pushComponentEvent`); keep ids unique (Anchor IDs are de-duplicated with `-2`) | Harness click test: exactly one `cmp:click`; no duplicate ids |
| No data in Adobe Analytics / CJA | Adobe Tags (Data Collection) and the Web SDK are **not configured**; `scripts/delayed.js` is empty | Check `delayed.js`; no Tags / `alloy` requests in Network | Blocked: Tags property, datastream and the measurement plan (handover 11.7) | After integration: AEP Debugger shows `sendEvent` calls |
| Target / AJO activity not shown | Not implemented: no Target, AJO or audience integration exists | — | Not applicable until a personalization design is approved | — |
| Consent banner missing, data before consent, identity questions | Not implemented: no consent mechanism or identity service; nothing is sent to third parties; the data layer stays in the page | — | Blocked: the consent model and CMP | — |

### Accessibility and performance

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| --- | --- | --- | --- | --- |
| axe contrast violations on a dark Section / Columns Container | Block uses colour primitives instead of the theme tokens; a block with a fixed light colour inside a dark background | axe at 1440 and 390px; the "Sections: colours with blocks" library page | Use the tokens (`--color-text-default`, `--link-color`, `--color-border-brand`, …); reset tokens inside Grey islands | 0 axe violations on the combination page |
| Keyboard trap, focus lost, Escape doesn't close | Disclosure without `<button>` / `aria-expanded` / `aria-controls`; focus not returned on close | Keyboard pass (Tab, Shift+Tab, Enter, Space, Escape, arrows) | Follow AGENTS.md "Accessibility"; return focus to the opener | Keyboard-only pass succeeds |
| English UI labels on another locale | Placeholder key missing or the sheet unpublished; built-in `404.html` texts aren't placeholders | `/{locale}/placeholders.json`; find `t('key', 'fallback')` | Add the key to the locale sheet and publish | Translated label on reload |
| LCP, TBT or CLS regression | Stale preload lists; forced layout during decoration; heavy or lazy-image first section; scripts outside `delayed.js`; fallback font faces removed; content arriving without reserved space | PageSpeed / Lighthouse diagnostics; Performance panel; `npm test` (module graph) | `npm run build:modules`; batch reads / writes in one animation frame; keep the LCP image eager in the first block; keep `inter-fallback*` faces | PageSpeed back to target; RUM CLS ≤ 0.1, LCP < 2.5 s |

### Packages, publishing and reindexing

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| --- | --- | --- | --- | --- |
| After installing a content package, pages don't appear on aem.page / aem.live | Installing in AEM doesn't preview or publish; sheets (placeholders, metadata) are separate | Admin API status per path; Sites console publication status | Publish sheets first, then fragments, then pages (handover 12.4); or Admin API `preview` then `live` per path; retry paths that time out (one did in 1.0.12) | Every page previewed and published (e.g. 315 / 315 for 1.0.13) |
| Packaged pages render without CTAs, stats, filters or footer links | Content written as composite multifields (`ctas/item0`) doesn't render (finding F-87) | `.plain.html`: empty item rows | Use item children (`hero-cta`, `teaser-link`, `footer-link`, …) | Items render on the published page |
| Package procedure itself (build, install) unclear | Not recorded in the repository: the packages are built in the delivery workspace | — | Blocked: package build and install procedure from the delivery team | — |
| New pages missing from lists after publishing | Not yet indexed, or the index predates a `helix-query.yaml` change | Search `/query-index.json` | Reindex: `POST https://admin.hlx.page/index/sradha-tcs/tcs-corp/main/{path}` per path (authenticated); publish sheets before pages so rows carry their metadata | Row present (e.g. 312 / 312 reindexed for 1.0.10); block library pages stay out by design |
| Live page still old after publish | Published to preview only; a reference (fragment, nav, footer, asset, sheet) not published; caching; inherited Navigation / Footer / 404 values cached per session (`sessionStorage` `tcs-inherited-metadata`) | Compare aem.page / aem.live in a private window; Admin API status | Republish with references; purge the cache; new browser session | Fresh `last-modified`; change visible |

## Further Site-Wide Issues

Each of these has symptoms, root cause, diagnosis, resolution, validation and escalation in the handover's Part 13 — Global Troubleshooting Guide ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)):

| Issue | Handover section |
| --- | --- |
| Pages published at the wrong path, locale missing | 13.4 (`paths.json` and `public.json` paths must match) |
| Wrong header or footer | 13.6 (inherited Navigation / Footer, `<meta name="nav">`) |
| 404 in the wrong locale or the built-in English 404 | 13.7 (`loadErrorPage` fallback chain) |
| Tags showing IDs | 13.14 (`/{locale}/taxonomy.json`) |
| Bulk metadata not applied | 13.17 (site configuration `metadata.source`) |
| Form submit sends nothing | 13.21 (`form-variations:submit`; see also the Form Variations README) |
| Embeds not loading | 13.24 |
| Sitemap host | 13.25 (`helix-sitemap.yaml` `origin`) |
| Template (Page Type) not applied | 13.26 (`TEMPLATES` in `scripts.js`: home, article, blog, press-release) |
| Page Header author details missing | 13.27 (Authors sheet) |

Block-specific runbooks: the "Troubleshooting" section of each block README, for example [List](../../../blocks/list/README.md#troubleshooting), [Filter List](../../../blocks/filter-list/README.md#troubleshooting), [Header](../../../blocks/header/README.md#troubleshooting), [Fragment](../../../blocks/fragment/README.md#troubleshooting), [Video](../../../blocks/video/README.md#troubleshooting), [Hero](../../../blocks/hero/README.md#troubleshooting), [Teaser](../../../blocks/teaser/README.md#troubleshooting), [Form Variations](../../../blocks/form-variations/README.md#troubleshooting), [Conversation Canvas](../../../blocks/conversation-canvas/README.md#troubleshooting).

## Evidence to Collect

Collect:

- the page path (AEM and published) and the environment (UE / aem.page / aem.live / local);
- the locale, viewport width, browser and OS (including the reduced-motion setting);
- the time in UTC and the related merge, publication or package;
- console messages with stacks;
- Network status codes of the block, sheet, fragment and index requests;
- the block's `.plain.html` excerpt and outer HTML;
- the block's dialog settings (screenshot), the `?debug=list` / `?debug=separator` output, the relevant `/query-index.json` rows;
- `copy(JSON.stringify(adobeDataLayer, null, 2))` with `mailto:` / `tel:` link URLs removed.

Don't collect:

- cookies, tokens or Authorization headers;
- author host names;
- AEM program or environment ids;
- form values;
- visitors' personal data;
- unredacted search terms;
- screenshots showing personal details.

## Related

- [development-standards.md](./development-standards.md), [testing-and-quality.md](./testing-and-quality.md), [universal-editor.md](./universal-editor.md), [decorators-and-utilities.md](./decorators-and-utilities.md), [architecture.md](./architecture.md), [indexing-and-search.md](./indexing-and-search.md), [data-layer-and-analytics.md](./data-layer-and-analytics.md), [security-privacy-consent.md](./security-privacy-consent.md), [personalization.md](./personalization.md), [administration-and-operations.md](./administration-and-operations.md), [deployment-and-release.md](./deployment-and-release.md)
- Handover ([TCS-CORP-HANDOVER.md](../TCS-CORP-HANDOVER.md)): Part 13 — Global Troubleshooting Guide, 14.3 Logs, 14.4 Common Errors, 14.5 Escalation Matrix, 12.6 Rollback
- [AGENTS.md](../../../AGENTS.md) "AEM delivery rules", "Module preloading"; [blocks/README.md](../../../blocks/README.md); [docs/audit/REAUDIT-2026-10-20.md](../../../docs/audit/REAUDIT-2026-10-20.md) (operations and content actions)
