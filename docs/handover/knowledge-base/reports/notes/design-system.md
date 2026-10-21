# design-system.md

## Sources inspected

- styles/styles.css (all tokens, fallback faces, theme contract, buttons, tags, avatars, skeletons, Additional tab classes), styles/fonts.css, styles/motion.css, styles/card-list.css (custom properties, media queries), styles/lazy-styles.css
- fonts/ (inter-variable.woff2, 48,256 bytes), icons/ (22 SVGs)
- scripts/aem.js (createOptimizedPicture, decorateIcons), scripts/scripts.js (BACKGROUND_BREAKPOINTS, sections, loadFonts), decorators/button-decorator.js, decorators/responsive-image-decorator.js, utils/viewport.js, utils/header-space.js
- Models: models/_section.json, models/_card-list.json, blocks/{button-block,hero,teaser,columns-container,quote,testimonial,anchor-list,conversation-canvas}/_*.json (option values)
- Block CSS / JS Figma comments: header, tcs-header, teaser, hero, quote, testimonial, list, cards, table-list, anchor-list, page-header, separator, conversation-canvas, columns-container.css
- blocks/README.md; READMEs of teaser (Variations, Known Limitations, For Architects), conversation-canvas (Variations table, Figma gaps), list (Visual Reference, Figma screenshots), separator (limitations), hero (Variations)
- AGENTS.md (CSS, Blocks: Backgrounds and theme, Animation and skeletons, module preloading paragraph)
- docs/audit/BLOCK-ECOSYSTEM-AUDIT.md (sections 1, 9, 13), docs/audit/DIALOG-OPTIONS-2026-10-20.md (section 10), docs/animation/README.md
- Handover: 1.2 (BO-4), 1.7.6, 5.6 (spacing recommendation, line ~4238), revision 2.34 / 2.35 / 2.36, Part 16 (F-38, F-49, F-75, F-105)

## Discrepancies

- implementation: Section Style label "Dark Green"; Teaser and Columns Container label "Dark green" | documented: AGENTS.md "share labels" | impact: cosmetic label difference in dialogs | correct: code (labels differ only in case)
- implementation: Teaser BG Color values are `grey` / `dark` / `dark-green` (class built as `bg-${value}` in teaser.js); Section and Columns Container values are `bg-grey` / ... | documented: AGENTS.md "share ... classes" | impact: none on the page (same classes), matters for anyone reading stored values | correct: code
- implementation: Hero BG Color has its own set (bg-light, bg-dark "Dark blue", bg-dark-subtle, bg-black); Quote / Testimonial only Default / Grey | documented: AGENTS.md lists only Teaser / Columns Container / Section as shared (consistent) | impact: authors may expect Dark green on Hero | correct: code
- implementation: header switches to the desktop logo bar at 1200px (`matchMedia('(min-width: 1200px)')`) | documented: handover 1.7.6 "Header switches to the desktop navigation at 900px" | impact: wrong breakpoint in handover | correct: code (AGENTS.md "Header" also says >= 1200px)
- implementation: `--header-reserved: var(--nav-height)` (4rem / 7.75rem) | documented: handover 1.7.1 "17.5rem mobile, 20.875rem tablet, 27.5rem desktop" | impact: outdated values in handover (changed when the header Canvas left the flow, F-98) | correct: code
- implementation: forced-colors and print media queries exist only in blocks/separator/separator.css | documented: handover 1.7.2 "forced-colors: active and print media queries present in the CSS" | impact: overstates coverage | correct: code
- implementation: audit section 9 says Figma comparison was done "in earlier work (handover Part 7)"; Part 7 of the current handover is Taxonomy | impact: stale cross-reference | correct: Not recorded which chapter holds the comparison

## Gaps and blocked topics

- Per-variation Figma pixel comparison: Blocked (needs the Figma file per component; audit section 9).
- Design sign-off of the contrast token change (secondary text, brand text / fill): Requires validation (audit 13).
- Token governance (owner, approval, versioning of token changes): Not recorded.
- Figma file keys / node ids deliberately not reproduced (instructions); code comments still contain node ids.
- CJK typography strategy (F-38): open, owner Design.

## Decisions found

- Tokens extracted from the TCS.com Design System (Figma), mobile first (styles/styles.css header comment).
- Contrast token change: `--color-text-secondary` → slate-700, `--color-text-brand` / `--color-bg-brand` → brand-400 (block ecosystem audit, 19 October 2026; needs design sign-off).
- Theme contract of the dark Section / Columns Container backgrounds (handover revision 2.34, F-105, 20 October 2026; verified live 2.35).
- Section Style colours Grey / Dark / Dark Green shared with Teaser and Columns Container, colour only (handover 2.35, package 1.0.12; AGENTS.md "Backgrounds and theme").
- Fallback faces per system font (Roboto, DejaVu Sans, Liberation Sans in the Arial face) (handover 2.36, F-106, 20 October 2026).
- Teaser covers several Figma frames with options rather than separate blocks (Teaser README "For Architects"; handover 6.11).
- Header arrow colour deviates from Figma for 3:1 contrast (F-75, design review open).

## Recommendations

- Align the Section Style label "Dark Green" with "Dark green" (or vice versa) for consistent dialogs.
- Record a token governance process (who approves a token change, how Figma variables are synchronised).
- Move recurring block-local Figma colours (`--hero-navy`, `--list-dark`, `--teaser-divider`, Canvas outline) into named tokens if design confirms them.
- Update handover 1.7.1 (`--header-reserved` values), 1.7.2 (forced colours), 1.7.6 (header breakpoint).
