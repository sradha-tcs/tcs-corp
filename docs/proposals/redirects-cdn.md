# Redirects at the CDN: specification

| | |
|---|---|
| Date | 24 October 2026 |
| Status | For review: decisions R-D1 to R-D4 open; decision log KB-D-055 (Proposed) |
| Closes | F-36 (`/` returns 404), the redirect part of O-03 (production domain and CDN), the recommendation "Configure a CDN or root redirect" of the decision log |
| Keeps | KB-D-005: authors keep one Redirects sheet per locale (`/{locale}/redirects.json`) |
| Owner | CDN Owner / Site Administrator (implementation), authors (sheet rows), delivery team (this specification, test list) |

Edge Delivery Services applies only a root `/redirects.json`, and this site keeps its redirects in
a sheet per locale (KB-D-005), so nothing redirects today. This document specifies the redirect
rules the production CDN applies in front of the site, vendor-neutral (Akamai, Fastly, Cloudflare
or another CDN in front of `*.aem.live`). It changes no code.

## 1. Current state (measured on aem.live, 24 October 2026)

| Item | State |
|---|---|
| `/` | 404 (the site root `/content/tcs-corp` isn't published) |
| `/en/` | 200 |
| `/language-master/en/redirects.json` | 648 rows (columns `source`, `destination`, `description`): the tcs.com pages the migration put at another path |
| `/en/redirects.json` | 0 rows |
| `/{locale}/redirects.json` of the other 12 locales | Not published |
| Root `/redirects.json` | 404 |
| Production domain and CDN | Not recorded (O-03) |

## 2. What has to redirect

1. **The root:** `/` → `/en/`.
2. **The old tcs.com URLs** of the 3,191 migrated pages (`The As-is page (Lift and Shift).csv`). On
   tcs.com they have no locale prefix; on the new site they are below the locale (`/en/…` after the
   rollout, `/language-master/en/…` during the review, handover 3.9):

   | Old path → new path | Pages | Covered by |
   |---|---|---|
   | Same path, with the locale prefix (`/careers/denmark` → `/en/careers/denmark`) | 2,499 | Rule R4 (pattern) |
   | Same path except letter case (`…pan-European-custody…` → `…pan-european-custody…`) | 37 | Rule R4 (lower case) |
   | Another path (a normalised name or a re-homed section) | 655 | Rule R3 (the Redirects sheet, 648 rows after duplicates) |

3. **Authored redirects** of each locale: the rows authors add to `/{locale}/redirects.json`
   (renamed or removed pages).

## 3. Rules

The CDN evaluates the rules in this order on `GET` and `HEAD` requests, before it forwards the
request to Edge Delivery. The first rule that matches answers; no match forwards the request
unchanged.

| Rule | Request | Answer |
|---|---|---|
| R1 | `/` | 301 to `/en/` (R-D2: language negotiation instead) |
| R2 | A path that isn't a page: code and files (`/blocks/`, `/scripts/`, `/styles/`, `/fonts/`, `/icons/`, `/tools/`, `/media_*`, `/.well-known/`), root files (`/robots.txt`, `/sitemap*.xml`, `/favicon.ico`, `/*.json` at the root) and any path ending in `.json`, `.js`, `.css`, `.svg`, `.png`, `.jpg`, `.webp`, `.pdf` | No redirect: forwarded |
| R3 | A path found in a Redirects sheet: the sheet of the path's locale (first segment `en`, `de-de`, … , or `language-master/en`); a path without a locale is looked up as the default locale's path (`/en` + path; `/language-master/en` + path during the review) | 301 to the row's `destination` (relative to the site, or absolute when it starts with `https://`) |
| R4 | A path without a locale prefix (an old tcs.com URL) | 301 to the default locale + the path in lower case (`/careers/India` → `/en/careers/india`); R-D3: only for the migrated pages |
| R5 | Anything else | No redirect: forwarded (Edge Delivery answers, 404 page included) |

**Matching.** Paths are compared like `utils/redirects.js` (`normalizeRedirectPath`, used by the
List block): without query string, hash, `.html` and trailing slash (except `/`), and without
regard to letter case. The query string of the request is appended to the destination (campaign
parameters are kept); a destination with a query of its own keeps it and gets the request's
parameters after it.

**Chains and loops.** A destination that is itself a source is followed at the CDN, at most 5 hops
(as the List block), and answered with one 301 to the final destination; a loop answers no redirect
(the request is forwarded and logged).

**Locale prefixes.** `en`, `de-de`, `fr-fr`, `fr-ca`, `es-es`, `pt-pt`, `nl-nl`, `sv-se`, `da-dk`,
`no-no`, `zh-cn`, `ja-jp`, `ko-kr` (`LOCALES` in `utils/site.js`, the published paths of
`paths.json`) and, during the review, `language-master/en`.

## 4. Data

| Item | Specification |
|---|---|
| Source | The published sheets `https://{host}/{locale}/redirects.json?limit=10000` (Edge Delivery JSON: `data[]` of `{source, destination}`; `Source` / `Destination` accepted as well, as in `utils/redirects.js`) |
| Refresh | The CDN keeps each sheet for 5 minutes (time to live) and refreshes it in the background; an author's published row applies within 5 minutes, without a CDN change |
| Failure | When a sheet can't be read, the CDN keeps the last copy; without any copy it redirects nothing for that locale (fail open: pages are still served) |
| Size | 648 rows today; a sheet answer must stay below 6 MB (the platform's limit for one answer), about 25,000 rows of this length |
| Ownership | Authors maintain the rows in AEM and publish the sheet; nobody edits rules at the CDN for a single redirect |

At the rollout of the language master to `/en` (handover 3.9) its 648 rows move to the `/en`
Redirects sheet with `/en` instead of `/language-master/en` in both columns (generated by the
migration's `consolidate-sheets.py`), and `language-master/en` is removed from the locale prefixes.

## 5. Implementation sketch (vendor-neutral)

```js
// Runs at the CDN edge for GET / HEAD before the request goes to Edge Delivery.
const LOCALES = ['en', 'de-de', 'fr-fr', 'fr-ca', 'es-es', 'pt-pt', 'nl-nl', 'sv-se', 'da-dk',
  'no-no', 'zh-cn', 'ja-jp', 'ko-kr'];
const DEFAULT = '/en'; // '/language-master/en' during the review
const norm = (p) => (p.replace(/\.html$/, '').replace(/(.)\/+$/, '$1') || '/').toLowerCase();
function localeOf(path) {
  const seg = path.split('/')[1] || '';
  if (seg === 'language-master') return '/language-master/en'; // during the review only
  return LOCALES.includes(seg) ? `/${seg}` : null;
}
async function redirect(url) {
  const path = norm(url.pathname);
  if (path === '/') return [301, '/en/']; // R1 (also during the review: /en/ is published)
  if (isNotAPage(path)) return null; // R2
  const locale = localeOf(path);
  const key = locale ? path : norm(`${DEFAULT}${path}`);
  const map = await sheet(locale || DEFAULT); // cached 5 minutes: Map(norm(source) -> destination)
  const seen = new Set([key]);
  let dest = null;
  for (let hop = 0, k = key; hop < 5; hop += 1) { // R3, chains followed
    const next = map.get(k);
    if (!next) break;
    if (/^https?:/.test(next)) { dest = next; break; } // an external destination ends the chain
    const n = norm(next);
    if (seen.has(n)) { log('redirect loop', key); return null; } // a loop: no redirect
    seen.add(n); dest = next; k = n;
  }
  if (dest) return [301, withQuery(dest, url.search)];
  if (!locale) return [301, withQuery(key, url.search)]; // R4 (R-D3: only migrated paths)
  return null; // R5
}
```

## 6. Test cases

From the live sheet and the migration list (review state: default locale `/language-master/en`;
after the rollout read `/en`).

| # | Request | Expected |
|---|---|---|
| 1 | `/` | 301 `/en/` |
| 2 | `/en/` | 200, no redirect |
| 3 | `/who-we-are/newsroom/press-release/abb-uk-selects-tcs-erp-implementation-support` (same path) | 301 `/language-master/en/who-we-are/newsroom/press-release/abb-uk-selects-tcs-erp-implementation-support` |
| 4 | `/who-we-are/newsroom/press-release/tcs-bancs-powers-societe-generale-securities-services-transformation-of-pan-European-custody-platform` (case) | 301 to the same path in lower case below the default locale |
| 5 | `/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america-` (sheet row) | 301 `/language-master/en/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america` |
| 6 | `/language-master/en/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america-` | 301, the same destination as 5 |
| 7 | Test 5 with `?utm_source=x` | 301 to the destination of 5 with `?utm_source=x` |
| 8 | `/scripts/scripts.js`, `/styles/styles.css`, `/robots.txt`, `/en/query-index.json` | No redirect |
| 9 | `/de-de/a-page-that-does-not-exist` (no row) | No redirect: Edge Delivery's 404 page |
| 10 | A row `a → b` and a row `b → c` | One 301 from `a` to `c` |
| 11 | A row `a → b` and a row `b → a` | No redirect (loop, logged) |
| 12 | A row published by an author | Applied within 5 minutes, no CDN change |

## 7. Acceptance criteria

- Tests 1–12 pass on the production host and on a CDN test host in front of `main--tcs-corp--sradha-tcs.aem.live`.
- Every row of the published Redirects sheets answers 301 to its destination, and every one of the
  3,191 old paths ends on a page that answers 200 (a script over the migration list and the sheets;
  the delivery team provides it with the test list).
- No redirect for code, files and root files (R2); page speed unchanged (the sheet lookup is in
  memory at the edge, no request to the origin per page view).

## 8. Alternatives considered

| Alternative | Why not (now) |
|---|---|
| A root `/redirects.json` (one sheet, applied by Edge Delivery) | Works without a CDN, but holds exact paths only (no rule R4: 2,536 rows for the old paths alone) and replaces the per-locale sheets authors maintain (KB-D-005, approved); needs a new decision |
| Redirects in the browser (the 404 page reads the locale's sheet and moves on) | The old URL first answers 404: search engines don't pass the old URL's ranking on; only as a stopgap |
| No redirects | Old tcs.com links and bookmarks end on the 404 page after the switch (F-36: P1 for go-live) |

## 9. Decisions to take

| ID | Decision | Options | Recommendation |
|---|---|---|---|
| R-D1 | Status code while the site is tested | (a) 302 until go-live, then 301; (b) 301 from the start | **(a)**: browsers cache a 301, so a wrong rule is hard to take back during testing |
| R-D2 | The root `/` | (a) always `/en/`; (b) by the browser's language (`Accept-Language`) to one of the 13 locales, else `/en/` | **(a)** first; (b) once all 13 locales have content |
| R-D3 | Old tcs.com paths of pages that weren't migrated (rule R4) | (a) R4 only for the migrated paths (a list the CDN keeps, 2,536 paths, from the migration list); (b) R4 for every path without a locale (pages not migrated end on the 404 page); (c) R4 only when the target exists (a request to the origin first) | **(a)** while tcs.com still serves the pages that weren't migrated; (b) once the new site replaces tcs.com completely |
| R-D4 | Where the rules run | (a) the production CDN (edge rule or worker); (b) a root `/redirects.json` (section 8) | **(a)** |

## 10. Steps

| Step | Who | Approval |
|---|---|---|
| 1. Review this specification, take decisions R-D1 to R-D4 | Product owner, Site Administrator, CDN Owner | Yes: KB-D-055 becomes Approved |
| 2. Name the production domain and CDN (O-03) | Site Administrator | — |
| 3. Implement the rules at the CDN (section 3), with the data of section 4 | CDN Owner | — |
| 4. Provide the full test list (every sheet row and old path) and a check script | Delivery team | — |
| 5. Run tests 1–12 and the full list on the CDN test host | CDN Owner with the delivery team | — |
| 6. Switch to 301 (R-D1) at go-live; check again | CDN Owner | Go-live approval |
| 7. At the language master rollout: move its rows to `/en`, remove `language-master/en` from the prefixes | Authors, CDN Owner | Rollout approval |
