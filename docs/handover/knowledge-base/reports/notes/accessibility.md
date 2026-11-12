# accessibility.md

## Sources inspected

- AGENTS.md ("Accessibility" in Blocks; "Testing & Quality Assurance" > Accessibility)
- Code: decorators/a11y-decorator.js, decorators/link-decorator.js, decorators/button-decorator.js, decorators/social-links-decorator.js, decorators/author-bio-decorator.js (+ templates/article/article.js), decorators/skeleton-decorator.js, decorators/heading-decorator.js, decorators/scroller-decorator.js, decorators/seo-decorator.js, utils/environment.js, utils/media.js; blocks/header/header.js, accordion.js, tabs.js, gen-carousel.js, modal.js, video.js, embed.js, table.js, form-variations.js, filter-list.js, list.js, conversation-canvas.js / .css, page-header.js; scripts/scripts.js (backgrounds, 404); scripts/aem.js (decorateIcons); styles/styles.css (focus ring, visually-hidden, theme contract); head.html (viewport)
- grep across blocks for aria-live / role status, inert, forced-colors, print, prefers-reduced-motion, outline: none, skip link (none found)
- docs/audit/BLOCK-ECOSYSTEM-AUDIT.md (sections 1, 2, 5, 7, 8, 9, 13), REAUDIT-2026-10-20.md (sections 1, 2, 7), DIALOG-OPTIONS-2026-10-20.md (section 10), docs/audit/tools/harness.mjs (axe tags, widths, paths)
- docs/animation/README.md (F, H), docs/blocks/BLOCK-DOCUMENTATION-REPORT.md and reports/anchor-list.md (Focus Not Obscured), block READMEs' Accessibility headings
- Handover 1.7.2, revisions 2.34 / 2.35 / 2.36, Part 16 (F-01, F-17, F-27, F-28, F-49, F-52, F-56, F-71, F-94, F-105)

## Discrepancies

- implementation: axe runs use tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa | documented: AGENTS.md and handover 1.7.2 state WCAG 2.1 AA as the standard | impact: the target in the rules lags the testing; this KB states 2.2 AA as target | correct: rule decision Not recorded (product owner)
- implementation: video caption colour is `var(--color-text-secondary)` (slate-700) and secondary text / brand tokens were darkened | documented: handover Part 16 F-27 and F-28 still read as open (P2) | impact: register out of date | correct: code
- implementation: forced-colors / print queries only in separator.css | documented: handover 1.7.2 "present in the CSS" | impact: overstated coverage | correct: code
- implementation: author bio LinkedIn link uses setLinkTarget without announceNewTab | documented: AGENTS.md rule "links opening a new tab say so" | impact: rule not met (F-52 open) | correct: code is the current behaviour; F-52 accurate
- implementation: header Escape closes the menu only below 1200px (desktop has no menu) | documented: handover 1.7.2 "Header dropdowns and mobile menu close on Escape" | impact: none (desktop logo bar has no dropdowns) | correct: code

## Gaps and blocked topics

- Screen-reader testing (NVDA / VoiceOver): Blocked: no screen reader in the environment (audit section 5, 9; re-audit 7).
- Universal Editor dialog accessibility: Blocked: AEM author access.
- Reflow at 320 CSS px, zoom 200 % / 400 %, text spacing (1.4.12): Not recorded (harness narrowest width 390px).
- Target size measurement (2.5.8): Not recorded systematically; values from CSS / READMEs only.
- Focus Not Obscured with Sticky Anchor List: Requires validation ("[To be confirmed]" in the handover).
- Video pause outline contrast on dark posters (F-56): "[To be confirmed: contrast measurement]".
- Harness depends on delivery-workspace paths (npx cache path for Playwright, /tmp/audit axe-core): needs adapting before re-use.
- Consistent Help (3.2.6): no help mechanism defined: Not recorded.

## Decisions found

- WCAG 2.1 AA as the project rule (AGENTS.md "Accessibility"; handover 1.7.2).
- Contrast token change to pass WCAG 1.4.3 (block ecosystem audit, 19 October 2026; design sign-off pending).
- Theme contract for dark backgrounds with underlined running-text links and brand-300 focus ring (handover 2.34, F-105, 20 October 2026).
- Filter List live region role set after the first count (audit D-A-25).
- Hero Lottie pause / play button (audit D-B-1, WCAG 2.2.2).
- Header: only focus moving outside the nav closes the menu (F-71, closed in 2.2).
- Semantic review substitutes for screen-reader runs and is labelled as such (audit section 5).

## Recommendations

- Decide whether to raise the project rule to WCAG 2.2 AA and update AGENTS.md, handover 1.7.2 and blocks/README.md together.
- Add a skip link ("Skip to content") before the header.
- Run NVDA and VoiceOver on the curated pages and interactive blocks; add 320px and 200 % zoom runs to the harness.
- Fix F-52 (announceNewTab in author-bio-decorator.js), F-56, F-49.
- Update the Part 16 register for F-27 / F-28.
- Commit a runnable version of the harness under tools/.
