# security-privacy-consent.md

## Sources inspected

- head.html, 404.html (CSP, RUM 404 checkpoint), scripts/editor-support.js (DOMPurify), scripts/editor-support-rte.js, scripts/dompurify.min.js (header: 3.2.4), scripts/lib/lottie (5.13.0, MIT LICENSE.md), utils/lottie.js
- blocks/fragment/fragment.js (loadFragment path rules, innerHTML), scripts/scripts.js (loadPageContent, loadFonts sessionStorage), scripts/aem.js (sampleRUM, buildBlock innerHTML, ?rum= / ?optel= / ?lighthouse=)
- utils/card-list-config.js isSafeUrl (users: blocks/list/list-data.js, blocks/cards/cards-data.js), decorators/link-decorator.js, blocks/tcs-header/tcs-header.js buildLogo, utils/urls.js, utils/links.js
- decorators/media-decorator.js (createFrame: no sandbox), utils/media.js, blocks/embed/embed.js, blocks/video/video.js (privacymode default true), blocks/form-variations/form-variations.js (POST to Submit action), blocks/conversation-canvas/conversation-canvas.js (?q=)
- grep localStorage / sessionStorage / document.cookie / indexedDB; grep console.*; grep URLSearchParams / searchParams / debug; git grep for api key / secret / password / token (none)
- utils/header-space.js, utils/inherited-metadata.js, utils/environment.js, utils/data.js, helix-query.yaml excludes, fstab.yaml (host not copied), .hlxignore, package.json, .renovaterc.json, .github/workflows/main.yaml
- blocks/embed/README.md (Security and Privacy), handover 2.7 (Security Architecture), 11.7.6, 11.9, Part 16 (F-05, F-26, O-07, O-08, O-16), docs/audit/BLOCK-ECOSYSTEM-AUDIT.md section 7, docs/audit/reaudit/review-d.md (R-D-12)

## Discrepancies

- implementation: Form Variations POSTs the data as JSON to the authored Submit action (or hands it to a `form-variations:submit` integration) | documented: "no submission endpoint exists" (handover 2.7.2) and "no data is sent" (handover 1.6.2) | impact: form data can leave the page to any authored URL | correct: code
- implementation: `localStorage` stores header heights (`header-height-v2-{breakpoint}`) | documented: handover 2.7.3 lists only the sessionStorage values | impact: storage inventory incomplete | correct: code (handover 2.15 / 3.5 mention it elsewhere)
- implementation: Embed always uses youtube-nocookie and Vimeo dnt=1 | documented: F-26 (no privacy-enhanced domain) and handover 2.7.2 ("available") | correct: code (D-D-10)
- implementation: no runtime npm dependencies; Renovate automerges devDependencies | documented: handover 2.7.3 "Renovate updates dev dependencies" — consistent.

## Gaps and blocked topics

- Consent model, CMP, consent categories per locale: Blocked (privacy / legal; handover 11.7.6, O-07).
- Approved embed domains and consent for third-party players: Blocked (O-16).
- Form back end and privacy notices: Blocked (O-08); the Submit action URL is not validated by code.
- Preview / live access restriction, Admin API roles: not recorded (handover 2.7.3 To be confirmed).
- How AEM delivers `javascript:` links authored in fields other than List / Cards links: Requires validation (no code check).
- .hlxignore doesn't exclude drafts/, content/, migration-work/, tools/, en/ or query-index.json in the repository root, so the code bus serves them: whether that is intended Requires validation (not stated in the KB file beyond "other repository folders are served").
- No legal classification or retention rules recorded (by instruction).

## Decisions found

- Privacy-enhanced players (youtube-nocookie, Vimeo dnt): audit D-D-10 (handover 2.27).
- Search term redaction (utils/privacy.js): audit D-D-18 (handover 2.27).
- Search page URL raw query: re-audit R-D-12, Blocked until Tags.
- AGENTS.md Security Considerations: no secrets in the repository; everything is public client-side code; use .hlxignore for files not to serve.

## Recommendations

- A security review of the CSP (frame-src / connect-src allow-lists once the embed domains and form endpoints are approved).
- An allow-list (or at least an https-only check) for the Embed generic iframe and the Form Variations Submit action; consider `sandbox` / `referrerpolicy` on generic iframes.
- Mask mailto: / tel: link URLs in the data layer (F-05).
- Review .hlxignore for folders that shouldn't be on the code bus (drafts/, migration-work/, tools/).
- Update handover 2.7.2 / 2.7.3 / 1.6.2 to the current form submit behaviour and the localStorage key.
