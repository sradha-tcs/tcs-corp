# Security, Privacy and Consent

This file summarizes the security and privacy measures implemented in the front-end code of the TCS Corporate Website (content sanitization, link safety, external resources, the Content Security Policy, storage, cookies, query strings, logging and data minimisation) and records what is not implemented (consent, identity). It describes the code's behaviour only: no legal classifications, retention rules or approvals are recorded here, and decisions that need privacy or legal input are listed as blocked.

| Attribute | Value |
| --- | --- |
| Audience | Developers, solution architects, security and privacy reviewers, AMS / operations, AI agents |
| Source of truth | [`head.html`](../../../head.html), [`404.html`](../../../404.html), [`scripts/editor-support.js`](../../../scripts/editor-support.js), [`blocks/fragment/fragment.js`](../../../blocks/fragment/fragment.js), [`utils/card-list-config.js`](../../../utils/card-list-config.js), [`decorators/link-decorator.js`](../../../decorators/link-decorator.js), [`decorators/media-decorator.js`](../../../decorators/media-decorator.js), [`utils/media.js`](../../../utils/media.js), [`blocks/embed/embed.js`](../../../blocks/embed/embed.js), [`utils/privacy.js`](../../../utils/privacy.js), [`package.json`](../../../package.json), [`.hlxignore`](../../../.hlxignore); handover Part 2 — Solution Architecture (2.7 Security Architecture) and Part 11 — Analytics & Data Layer (11.9 Privacy) in [`TCS-CORP-HANDOVER.md`](../TCS-CORP-HANDOVER.md) |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current (front-end measures); Requires validation (consent, identity, embed allow-list, form endpoints, preview access: blocked on privacy / legal and product decisions) |

## Status at a glance

| Area | Status | Where |
| --- | --- | --- |
| Universal Editor update sanitization (DOMPurify) | Active | `scripts/editor-support.js` |
| Same-origin fragment and error page loading | Active | `blocks/fragment/fragment.js`, `scripts/scripts.js` `loadPageContent` |
| Safe URL check for card links | Active | `utils/card-list-config.js` `isSafeUrl` (List, Cards) |
| New-tab links with `noopener noreferrer` and a screen reader hint | Active | `decorators/link-decorator.js` |
| Privacy-enhanced video players | Active | Embed (always), Video (Privacy mode, default on) |
| Content Security Policy (nonce, `strict-dynamic`) | Active | `head.html`, `404.html` |
| Secrets in the repository | None found | — |
| Search term redaction, field names only in form events | Active | `utils/privacy.js`, `decorators/data-layer-decorator.js` |
| Cookies set by project code | None | — |
| Consent management, visitor identity | Not implemented (blocked: consent model) | — |
| Generic iframe embeds: host allow-list, `sandbox` | Not implemented (known limitation) | `decorators/media-decorator.js` `createFrame` |

## Content sanitization

| Path | What happens | Code |
| --- | --- | --- |
| Universal Editor updates | The HTML returned by the editor after an edit is sanitized with DOMPurify (`USE_PROFILES: { html: true }`) before it is parsed and re-decorated; DOMPurify is loaded on demand with `loadScript` | [`scripts/editor-support.js`](../../../scripts/editor-support.js) `applyChanges` |
| Rich text in the editor | `decorateRichtext` groups rich text instrumentation into editable wrappers; it moves attributes and does not sanitize | [`scripts/editor-support-rte.js`](../../../scripts/editor-support-rte.js) |
| Fragments (header, footer, Modal, Tabs, Fragment block) | `loadFragment` fetches only paths that start with `/` and not `//` (`{path}.plain.html`, same origin) and sets the response as `innerHTML`; a fragment that includes itself or the current page isn't loaded again | [`blocks/fragment/fragment.js`](../../../blocks/fragment/fragment.js) |
| Error pages | `loadPageContent` fetches same-origin `.plain.html` paths (the inherited 404 Page, else the locale's `error-pages/404`) into `main` | [`scripts/scripts.js`](../../../scripts/scripts.js) |
| Block rendering | Blocks build elements with DOM APIs; players are built without writing authored URLs into HTML strings | [`decorators/media-decorator.js`](../../../decorators/media-decorator.js) |

DOMPurify is the only user of `scripts/dompurify.min.js`; it is not loaded on the public site. The `innerHTML` uses in `fragment.js` and `scripts.js` rely on Edge Delivery `.plain.html` responses from the same origin (authored content). `scripts/aem.js` (never modified) also uses `innerHTML` in `buildBlock` when a block is built from strings (auto-blocking).

## Link safety

| Measure | Behaviour | Code |
| --- | --- | --- |
| `isSafeUrl(href)` | Allows `http:`, `https:`, `mailto:`, `tel:` and relative paths (`/`, `./`, `../`, `#`, `?`, a word); any other scheme (`javascript:`, `data:`, ...) is rejected and the card is not rendered | [`utils/card-list-config.js`](../../../utils/card-list-config.js), used by [`blocks/list/list-data.js`](../../../blocks/list/list-data.js) and [`blocks/cards/cards-data.js`](../../../blocks/cards/cards-data.js) |
| New tab | `setLinkTarget` sets `target="_blank"` with `rel="noopener noreferrer"`; `announceNewTab` adds the "opens in a new tab" hint from the placeholders | [`decorators/link-decorator.js`](../../../decorators/link-decorator.js) |
| Logo links | A TCS Header logo link typed as a bare domain (`www.example.com`) gets `https://` so it isn't a relative link | [`blocks/tcs-header/tcs-header.js`](../../../blocks/tcs-header/tcs-header.js) `buildLogo` |
| Fragment paths | Only same-origin absolute paths (`/…`, not `//…`) | `loadFragment` |
| AEM paths | `toSitePath` maps same-origin AEM paths to published paths; other origins pass through unchanged | [`utils/urls.js`](../../../utils/urls.js) |

Links outside List and Cards are rendered as AEM delivers them; no other block runs a scheme check (Requires validation: how AEM delivers a `javascript:` link authored in other fields).

## External resources

| Resource | Behaviour | Code |
| --- | --- | --- |
| YouTube (Embed) | Always the privacy-enhanced host `www.youtube-nocookie.com`; only the video id is passed on (`rel=0`, `enablejsapi=1`) | [`blocks/embed/embed.js`](../../../blocks/embed/embed.js), [`utils/media.js`](../../../utils/media.js) |
| YouTube (Video) | `youtube-nocookie.com` when the Privacy mode field is on (default on), else `www.youtube.com` | [`blocks/video/video.js`](../../../blocks/video/video.js) |
| Vimeo | `player.vimeo.com` with `dnt=1` (Embed always; Video with Privacy mode); the video id is URL-encoded | `utils/media.js`, `blocks/embed/embed.js`, `blocks/video/video.js` |
| X (Twitter) posts | `https://platform.twitter.com/widgets.js` is loaded only when an X embed renders; `x.com` links are rewritten to `twitter.com` | `blocks/embed/embed.js` `embedTwitter` |
| Any other Embed URL | A generic lazy iframe (`allow="encrypted-media"`, fullscreen allowed) with no host allow-list and no `sandbox` attribute: a known limitation; only approved, framable URLs should be authored | `decorators/media-decorator.js` `createFrame`, [`blocks/embed/README.md`](../../../blocks/embed/README.md) |
| Embed loading | With a placeholder image the player loads only after the visitor presses Play; without one, when the block scrolls into view | `blocks/embed/embed.js` |
| Form submissions | A valid Form Variations submission goes to a page integration (`form-variations:submit`), else is POSTed as JSON to the authored Submit action URL (no allow-list), else the visitor is told the form isn't connected | [`blocks/form-variations/form-variations.js`](../../../blocks/form-variations/form-variations.js) |
| RUM | `sampleRUM` sends sampled checkpoints with `navigator.sendBeacon` to the RUM collector (`ot.aem.live`) and loads the RUM enhancer | [`scripts/aem.js`](../../../scripts/aem.js) |
| Fonts, Lottie player, DOMPurify | Served from the repository (no font or script CDN) | `fonts/`, `scripts/lib/lottie/`, `scripts/dompurify.min.js` |

Third-party players and widgets set cookies and collect data as their providers do; no consent gate exists before they load (handover open item O-16: approved embed domains and consent for third-party players).

## Content Security Policy

`head.html` (all pages) and `404.html` declare:

```text
script-src 'nonce-aem' 'strict-dynamic' 'unsafe-inline' http: https:; base-uri 'self'; object-src 'none';
```

| Directive | Effect |
| --- | --- |
| `'nonce-aem'` with `'strict-dynamic'` | Only the `<script nonce="aem">` tags (and `modulepreload` links with the nonce) and the scripts they load run; `'unsafe-inline' http: https:` are fallbacks ignored by browsers that support `strict-dynamic` |
| `base-uri 'self'` | Prevents `<base>` injection |
| `object-src 'none'` | Blocks plugins |
| `move-to-http-header="true"` | Edge Delivery sends the policy as a response header |
| Not set | `style-src`, `img-src`, `frame-src`, `connect-src` (embeds, form POSTs and RUM aren't restricted by the policy) |

A future tag manager must be loaded by project code (`scripts/delayed.js`) so `strict-dynamic` trusts it (handover 2.7.1, 13.23 Content Security Policy Blocking Scripts).

## Secrets and environment configuration

- No secrets were found in the repository (no API keys, tokens or passwords in the code or configuration); everything in it is public client-side code. Keep it that way: an integration that needs credentials needs a server-side or Adobe-managed component.
- Configuration is code and site configuration, not environment variables: [`fstab.yaml`](../../../fstab.yaml) (the content source), [`paths.json`](../../../paths.json) (generated from `utils/site.js`), [`helix-query.yaml`](../../../helix-query.yaml), [`helix-sitemap.yaml`](../../../helix-sitemap.yaml), and the site configuration in the Edge Delivery admin service.
- Runtime context checks: `isAuthor()` (path starts with `/content/`: AEM author, no query index), `isEditing()` (Universal Editor edit mode, `adobe-ue-edit`), `isInEditor(el)` ([`utils/environment.js`](../../../utils/environment.js)); `localhost` skips the `fonts-loaded` flag.
- [`.hlxignore`](../../../.hlxignore) keeps dot-folders, `*.md`, `package.json`, `package-lock.json`, `test/*`, `_*` (model partials), `docs/*`, `LICENSE` and `karma.config.js` off the code bus; other repository folders are served. Block libraries and Site Global Templates are excluded from publishing in `paths.json`.
- Author access, Admin API roles and whether preview / live hosts are access-restricted are not recorded in the repository (handover 2.7.3: To be confirmed).

## Storage and cookies

| Key | Storage | Written by | Content |
| --- | --- | --- | --- |
| `header-height-v2-{mobile\|tablet\|desktop}` | `localStorage` | [`utils/header-space.js`](../../../utils/header-space.js) | The loaded header height in rem, so the next page reserves it (no layout shift) |
| `header-overlay-v1` | `localStorage` | [`utils/header-space.js`](../../../utils/header-space.js) `setHeaderOverlay` (from the TCS Header) | The nav page's Header over the first block mode (`always` / `never`), so the next page lays out for it; no personal data |
| `fonts-loaded` | `sessionStorage` | [`scripts/scripts.js`](../../../scripts/scripts.js) `loadFonts` (not on `localhost`) | `true` once `fonts.css` has loaded |
| `tcs-inherited-metadata` | `sessionStorage` | [`utils/inherited-metadata.js`](../../../utils/inherited-metadata.js) | The Navigation, Footer and 404 Page values of parent pages, by URL |

All storage access is wrapped in `try / catch` (private mode works). None of these values identify a visitor. Project code sets no cookies (`document.cookie` is not used), and `scripts/aem.js` (RUM) sets none. Third-party players (X widget, generic iframes, YouTube and Vimeo once played) may set their own cookies. The data layer code writes no storage.

## Query strings and debug flags

| Parameter | Read or written by | Effect |
| --- | --- | --- |
| `?q=` | Written by the Conversation Canvas when a Search page is set | The raw (unredacted) query in the Search page URL; no code in the repository reads it (re-audit R-D-12: blocked until Tags exists) |
| `?debug=list`, `?debug=separator` | [`blocks/list/list.js`](../../../blocks/list/list.js), [`blocks/separator/separator.js`](../../../blocks/separator/separator.js) | `console.debug` of the block's configuration and data |
| `?rum=`, `?optel=` | `scripts/aem.js` | RUM sampling rate (`on`, `off`, `high`, `low`) |
| `?lighthouse=on` | `scripts/aem.js` | Sets `window.hlx.lighthouse` |

Other query strings pass through links unchanged (`toSitePath` keeps `search` and `hash`), and link URLs with their query strings are pushed to the data layer as `xdm:linkURL`.

## Logging and debugging safeguards

- `console.error` only for failures (template, auto-blocking, skeleton render, motion, Lottie, Canvas navigation); `console.warn` in the editor rich text support; `console.debug` only behind the `?debug=` flags above. No visitor input is logged. No remote logging exists besides RUM.
- Editor-only hints (empty Fragment, Form without Submit action, list placeholders) render only in Universal Editor (`isEditing()` / `isAuthor()`).
- Analytics never breaks the page: data layer pushes are wrapped in `try / catch` ([`utils/analytics.js`](../../../utils/analytics.js)).

## Data minimisation and personal information

| Data | Handling | Code |
| --- | --- | --- |
| Search terms | Redacted before the data layer: e-mail addresses → `[email]`, phone-like numbers → `[number]`, trimmed, at most 100 characters; empty searches not pushed (unit tested) | [`utils/privacy.js`](../../../utils/privacy.js), [`test/privacy/privacy.test.mjs`](../../../test/privacy/privacy.test.mjs) |
| Form values | Never in the data layer (`cmp:submit` carries field names only); sent only to the page integration or the authored Submit action | `decorators/data-layer-decorator.js`, `blocks/form-variations/form-variations.js` |
| Labels | `dc:title` values truncated to 100 characters | `decorators/data-layer-decorator.js` |
| `mailto:` / `tel:` links | Pushed in full as `xdm:linkURL` (exit links): open finding F-05 | `decorators/data-layer-decorator.js` |
| Authored contact data | The Authors and Media Contacts sheets (names, designations, e-mail, phone, LinkedIn) are published as `/{locale}/data/*.json` by design and excluded from the query index (`/*/data/**`) | [`utils/data.js`](../../../utils/data.js), [`helix-query.yaml`](../../../helix-query.yaml) |
| Authored ids and labels | Anchor IDs, Component IDs and Analytics labels are authored and pushed to the data layer: authors must not put personal data in them (handover 11.9) | — |
| 404 RUM checkpoint | `sampleRUM('404', { source: document.referrer })` sends the referrer of sampled 404 views | [`404.html`](../../../404.html) |

## Identity, consent and analytics / personalization dependencies

- **Identity**: no login, no gated content, no visitor id read or set by project code.
- **Consent**: no consent banner, consent management platform or consent check is implemented. The data layer is filled without consent because nothing leaves the page; third-party embeds load without a consent gate. The consent model, categories and per-locale requirements are blocked dependencies (handover 11.7.6 and open item O-07; audit section 7).
- **Analytics**: Adobe Tags and the AEP Web SDK are not configured (blocked: measurement plan); a future embed belongs in `scripts/delayed.js`, never in `head.html` or Universal Editor ([Data layer and analytics](./data-layer-and-analytics.md)).
- **Personalization**: no Adobe Target or AJO integration ([Personalization](./personalization.md)).

## Third-party dependencies

| Dependency | Kind | Version | Notes |
| --- | --- | --- | --- |
| DOMPurify | Vendored runtime script | 3.2.4 (Apache 2.0 / MPL 2.0, header in the file) | [`scripts/dompurify.min.js`](../../../scripts/dompurify.min.js); Universal Editor only |
| Lottie (lottie_light) | Vendored runtime script | 5.13.0 (MIT, [`LICENSE.md`](../../../scripts/lib/lottie/LICENSE.md)) | [`scripts/lib/lottie/`](../../../scripts/lib/lottie/LICENSE.md); loaded by `utils/lottie.js` when an animation renders |
| npm packages | Development only | See [`package.json`](../../../package.json) `devDependencies` (ESLint, Stylelint, husky, merge-json-cli, npm-run-all, eslint-plugin-xwalk) | No runtime npm dependencies |
| Renovate | Dependency updates | [`.renovaterc.json`](../../../.renovaterc.json) | `config:recommended`; dev dependencies automerge; ESLint pinned to v8 |
| CI | GitHub Actions | [`.github/workflows/main.yaml`](../../../.github/workflows/main.yaml) | `npm ci` and `npm run lint` on push (no `npm test`, no dependency audit step) |

Third-party services loaded at runtime: the X widget script, the YouTube / Vimeo players and generic iframe hosts (only when authored), and the RUM collector.

## Known limitations and open items

| Item | Status | Source |
| --- | --- | --- |
| Generic iframes: no host allow-list, no `sandbox` | Known limitation; approved embed domains not recorded | `decorators/media-decorator.js`, Embed README, handover O-16 |
| Third-party players and the X widget load without consent | Blocked: consent model | Audit section 7 |
| Form Submit action accepts any URL; no form back end defined | Requires validation (handover O-08: form back end and privacy notices) | `blocks/form-variations/form-variations.js` |
| `mailto:` / `tel:` links in the data layer | Open (F-05) | Handover Part 16 |
| Raw query in the Search page URL (`?q=`) | Blocked until Tags / Web SDK exists (R-D-12) | [`docs/audit/REAUDIT-2026-10-20.md`](../../../docs/audit/REAUDIT-2026-10-20.md) |
| CSP leaves `frame-src`, `connect-src`, `img-src`, `style-src` unrestricted | By design for embeds; Requires validation by a security review | `head.html` |
| Preview / live access restriction, Admin API roles | Not recorded | Handover 2.7.3 |

## Related

- [Architecture](./architecture.md), [Blocks](./blocks.md), [Indexing and search](./indexing-and-search.md), [Decision log](./decision-log.md)
- [Data layer and analytics](./data-layer-and-analytics.md)
- [Personalization](./personalization.md)
- [`AGENTS.md`](../../../AGENTS.md) (Security Considerations, Accessibility)
- [`utils/README.md`](../../../utils/README.md), [`decorators/README.md`](../../../decorators/README.md)
- [`blocks/embed/README.md`](../../../blocks/embed/README.md), [`blocks/video/README.md`](../../../blocks/video/README.md), [`blocks/form-variations/README.md`](../../../blocks/form-variations/README.md)
- [`docs/audit/BLOCK-ECOSYSTEM-AUDIT.md`](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md) (section 7), [`docs/audit/REAUDIT-2026-10-20.md`](../../../docs/audit/REAUDIT-2026-10-20.md)
- Handover Part 2 — Solution Architecture (2.7), Part 11 — Analytics & Data Layer (11.7.6, 11.9), Part 13 — Global Troubleshooting Guide (13.23, 13.24), Part 16 — Handover Findings and Open Items Register ([`TCS-CORP-HANDOVER.md`](../TCS-CORP-HANDOVER.md))
