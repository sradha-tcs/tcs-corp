# Accessibility

This page states the accessibility target of the TCS Corporate Website, what the code implements for each area (semantics, keyboard, focus, names, images, links, forms, interactive components, media, announcements, contrast, motion), what has been tested and with which evidence, what is not verified, and who is responsible for what. It doesn't claim formal WCAG conformance: no conformance audit or assistive-technology test is recorded.

| Attribute | Value |
| --- | --- |
| Audience | Content authors, developers, designers, QA, site administrators, AI agents |
| Source of truth | Code (`blocks/`, `decorators/a11y-decorator.js`, `decorators/link-decorator.js`, `styles/styles.css`), [AGENTS.md](../../../AGENTS.md) "Accessibility", the block READMEs ("Accessibility" sections), [block ecosystem audit](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), [re-audit](../../../docs/audit/REAUDIT-2026-10-20.md), [dialog options report](../../../docs/audit/DIALOG-OPTIONS-2026-10-20.md), [handover](../TCS-CORP-HANDOVER.md) 1.7.2 |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Requires validation: screen-reader testing is blocked; reflow at 320px, zoom and touch-target sizes are not systematically tested |

## Target and verified standard

| Item | Value |
| --- | --- |
| Knowledge-base target | **WCAG 2.2 Level AA** |
| Project rule (verified) | WCAG **2.1** AA: AGENTS.md "Accessibility" ("Blocks meet WCAG 2.1 AA") and "Testing & Quality Assurance" ("Follow WCAG 2.1 AA guidelines"); handover 1.7.2 "WCAG 2.1 AA conformance (target)"; `blocks/README.md` "Shared Conventions" |
| Difference | WCAG 2.2 adds, at A / AA, 2.4.11 Focus Not Obscured (Minimum), 2.5.7 Dragging Movements, 2.5.8 Target Size (Minimum), 3.2.6 Consistent Help, 3.3.7 Redundant Entry and 3.3.8 Accessible Authentication (Minimum), and removes 4.1.1 Parsing. The automated audits already ran axe with the WCAG 2.2 AA rules (`wcag22aa` tag in `docs/audit/tools/harness.mjs`); the project rule text still says 2.1. Raising the rule to 2.2 AA is a decision for the product owner: **Not recorded** |
| Compliance claim | None. Evidence is automated axe runs and code review; see [Evidence](#definition-of-done-and-evidence) |

How the WCAG 2.2 additions stand in the code:

| WCAG 2.2 criterion | Implementation | Status |
| --- | --- | --- |
| 2.4.11 Focus Not Obscured | Conversation Canvas: `scroll-padding-bottom` keeps focused content clear of the floating dock; Anchor List Sticky: open ("[To be confirmed …]" in the handover, listed in `docs/blocks/reports/anchor-list.md`) | Requires validation |
| 2.5.7 Dragging Movements | Scrollers that can be dragged also have previous / next buttons and keyboard steps (`decorators/scroller-decorator.js`) | Implemented; not separately tested |
| 2.5.8 Target Size (Minimum, 24px) | Buttons `--button-height` 3.125rem (50px), icon buttons `--icon-button-size` 2.75rem (44px), Canvas voice button 2rem (32px) | Requires validation (no systematic measurement) |
| 3.2.6 Consistent Help | Header and footer come from shared reference pages per locale | Not recorded (no help mechanism defined) |
| 3.3.7 Redundant Entry | Forms are single-step (Form Variations) | Not applicable as far as identified |
| 3.3.8 Accessible Authentication | No visitor login exists | Not applicable |

## Semantic HTML, headings and landmarks

- **Landmarks**: `header` (with `nav#nav`), `main` and `footer` come from the boilerplate page; the Conversation Canvas search form has `role="search"`; tables with a scrollable width become labelled `role="region"` elements. No skip link was identified (bypass relies on the landmarks): see [Recommendations](#gaps-and-recommendations).
- **Native elements**: Accordion is built on `details` / `summary`; Modal and the video pop-up use `dialog` with `showModal()`; the Separator renders `hr`; tables keep header cells.
- **Headings**: blocks with a title have an authored level (Title Type / Title heading level, `decorators/heading-decorator.js` `HEADINGS` h1–h6); the level renders the element and its size follows it, so "the outline matches the look" (dialog options report, section 10). The Page Header renders the page H1 from metadata. A hidden List Item title stays in the DOM, visually hidden. Authors are responsible for a logical order.
- **Language**: `decorators/seo-decorator.js` sets `<html lang>` from the locale (or `language` metadata); content loaded from another locale (the `/en` 404 fallback) is marked with its `lang` (`loadErrorPage` in `scripts/scripts.js`).

## Keyboard, focus order and focus visibility

| Area | Behaviour (code) |
| --- | --- |
| Global focus ring | `a:focus-visible, button:focus-visible`: 2px (`--border-width-200`) solid `--color-border-brand`, offset 0.125rem; brand 300 inside dark backgrounds (theme contract) |
| Focus order | DOM order; visual reordering (Teaser image Top / Bottom / Left / Right) uses CSS `order` and doesn't change the DOM (dialog options report, section 10) |
| Header menu (tablet / mobile) | Buttons with `aria-expanded` / `aria-controls`; while the menu is open `main` and `footer` are `inert`; Escape closes it and returns focus to the menu button; focus moving to an element outside the nav closes it (F-71) |
| Tabs | `role="tablist"` / `tab` / `tabpanel`, `aria-selected`, Arrow keys, Home and End; `tabs:reveal` opens the tab holding a deep-link target |
| Gen Carousel | Inactive slides are `inert`; Manual modes: arrow buttons and ArrowLeft / ArrowRight; Auto modes: pause / play button |
| Scrollers (List, Cards, Filter List) | Keyboard-focusable region while it scrolls, previous / next buttons, keyboard steps |
| Modal, video pop-up | Native `dialog` (Escape closes); focus returns to the opener |
| Conversation Canvas | Disclosure buttons with `aria-expanded` / `aria-controls` / `aria-pressed`, Escape and focus return; a hidden dock row is `inert` |
| Hidden blocks | Hide block (`hideblock`) is `display: none` on the page; nothing focusable is left in it |
| Skeletons | No focusable element; focus doesn't move when the skeleton is replaced |

## Accessible names and UI text

- All UI text (button names, status messages, hints) comes from the locale's placeholders with an English fallback: `t('nextSlide', 'Next slide')` (`utils/placeholders.js`); AGENTS.md forbids hard-coded user-facing strings.
- Icon-only buttons get their name from a visually hidden label (`hideVisually`, `createHiddenText` in [`decorators/a11y-decorator.js`](../../../decorators/a11y-decorator.js); `.visually-hidden` in `styles/styles.css`).
- Examples: Gen Carousel `aria-label` "Carousel", slides "{n} of {total}", dots "Show slide {n} of {total}", toggle "Pause slides" / "Play slides"; Embed Play button "Play video: {title}" when the placeholder image has alt text; a hidden List Item title names the card's call to action ("Read more: The agentic bank").

## Images, alt text and decorative images

- Image fields have alt text fields; an empty alt marks the image as decorative (`alt=""`). Section backgrounds have their own alt field (`backgroundimagealt`) and default to decorative (`buildSectionBackground` in `scripts/scripts.js`).
- Authored icons are `img` with an empty alt (`decorateIcons` in `scripts/aem.js`); button arrows and list arrows are CSS masks, not content.
- Lottie animations: `role="img"` with the label, or `aria-hidden` without one; a non-image reference's link text is its Alt (`animationLabel`, `utils/media.js`; AGENTS.md "AEM delivery rules").
- Background videos are `aria-hidden` and their iframe has `tabindex="-1"`.
- Text over images (Hero, Teaser Background image / Card) relies on overlays; axe can't judge text over images, so the re-audit tested them in targeted browser checks ([re-audit](../../../docs/audit/REAUDIT-2026-10-20.md), section 2).

## Links and buttons

- Actions are `<button>` elements; navigation is `<a href>`. Every button and link button goes through the button decorators (`decorators/button-decorator.js`, `icon-button-decorator.js`, `content-buttons-decorator.js`).
- **New tab**: `setLinkTarget` sets `target="_blank"` and `rel="noopener noreferrer"`; `announceNewTab(a, hint)` adds visually hidden text, or extends an existing `aria-label`, with the `opensInNewTab` placeholder (WCAG 3.2.5 practice). Used by the button decorator, card lists, Teaser, Page Header and Footer; social links add the hint to their hidden label. **Open**: the article author bio's "View LinkedIn profile" link opens a new tab without the hint (`decorators/author-bio-decorator.js`; handover F-52).
- Links in running text are underlined on dark backgrounds so they are not told apart by colour alone (theme contract).
- Disabled buttons use `aria-disabled="true"` or `:disabled`.

## Forms

[Form Variations](../../../blocks/form-variations/README.md) (`blocks/form-variations/form-variations.js`):

- Each field has a visible label; required fields are validated on submit; the first invalid field receives focus.
- Errors are shown next to their field and linked with `aria-invalid="true"` and `aria-describedby` (removed again once the field is valid).
- `autocomplete` is set from the field's name or type (WCAG 1.3.5 Identify Input Purpose).
- A textarea's character counter is linked with `aria-describedby`.
- The submit outcome is a `role="status"` message that receives focus. Integrations report their outcome through `form-variations:submit` and `detail.respondWith(promise)` (AGENTS.md "Shared events and helpers"); no submit endpoint is configured in the repository (handover F-01).

## Interactive components

| Component | Pattern | README |
| --- | --- | --- |
| Accordion | Native `details` / `summary` | [accordion](../../../blocks/accordion/README.md#accessibility) |
| Tabs Container / Tabs | ARIA tabs (tablist, tab, tabpanel, `aria-selected`), arrows, Home / End | [tabs](../../../blocks/tabs/README.md#accessibility) |
| Gen Carousel | Named region, slide labels, `inert` inactive slides, `aria-live="polite"` track (off while playing), pause / play for Auto, arrows for Manual; autoplay starts paused for reduced motion | [gen-carousel](../../../blocks/gen-carousel/README.md#accessibility) |
| Modal | Native `dialog`, named, focus return | [modal](../../../blocks/modal/README.md#accessibility) |
| Header navigation | Disclosure buttons, `inert` page while the menu is open, Escape, focus loss closes; `header:menu` event | [header](../../../blocks/header/README.md#accessibility) |
| Anchor List | Links to section anchors; the current link is marked; Sticky pins the row | [anchor-list](../../../blocks/anchor-list/README.md#accessibility) |
| Table | Header cells; a scrollable table is a focusable, labelled region | [table](../../../blocks/table/README.md#accessibility) |

## Search and filters

- **Conversation Canvas** search: `role="search"` form with an `input type="search"`, a hidden label, and a `role="status"` region; the Canvas search pushes a redacted term to the data layer (privacy, `utils/privacy.js`). See the [Canvas README](../../../blocks/conversation-canvas/README.md#accessibility).
- **Filter List**: filter pills are buttons (`tag-filter`, active state with `aria-current` styling); the result count is a live region whose `role="status"` is set after the first count, so the initial render isn't announced (audit D-A-25); the count can be visually hidden but stays announced; the empty state shows "No resources found." and "Try selecting another filter." from placeholders.

## Video and media

| Media | Control | Reference |
| --- | --- | --- |
| Lottie (Hero, Teaser) | Pause / play button (`pauseAnimation` / `playAnimation` placeholders, WCAG 2.2.2); paused off screen; first frame only for reduced motion | `decorators/animation-decorator.js` |
| Video (DAM, YouTube, Vimeo) | Named player and Play button; pause / stop toggle for background and autoplay (WCAG 2.2.2); captions `track` (Captions, language, label fields); transcript link; never autoplays for reduced motion | [video](../../../blocks/video/README.md#accessibility) |
| Embed | A placeholder with a named Play button when a placeholder image is authored; privacy-enhanced players (youtube-nocookie, Vimeo dnt) | [embed](../../../blocks/embed/README.md#accessibility) |
| Gen Carousel Auto | Pause / play button | above |

Open: the video pause button's brand outline may have low contrast on dark posters ("[To be confirmed: contrast measurement]", handover F-56).

## Dynamic announcements, loading, error and empty states

| State | Implementation |
| --- | --- |
| Live regions | `role="status"`: Form Variations outcome, Filter List count, Conversation Canvas search, article meta "Link copied" (`decorators/article-meta-decorator.js`); `aria-live="polite"` on the Gen Carousel track |
| Loading (skeletons) | Data later than 150ms shows a skeleton: the skeleton is `aria-hidden="true"`, the block `aria-busy="true"` until the content is rendered ([`decorators/skeleton-decorator.js`](../../../decorators/skeleton-decorator.js)); no focus move; the pulse stops for reduced motion |
| Empty | List: the Empty message (default "There are no items to show.") or hidden, per the List's empty behaviour; Filter List: "No resources found." with a hint; Canvas menu: "No pages found" |
| Error page | The authored 404 page per locale, else `/en`, else built-in content; "Go back" is added for referrers from the site (`scripts/scripts.js`) |
| Editor-only | Items without content show a hint in Universal Editor only (`itemEditorHint`) |

## Contrast

- **Tokens**: `--color-text-secondary` (`--slate-700`) 6.9:1 on white and `--color-text-brand` / `--color-bg-brand` (`--brand-400`) 5.4:1, replacing `--grey-400` (2.84:1) and `--brand-500` (4.43:1) after the first audit found 3,737 axe colour-contrast nodes; this change still needs design sign-off ([audit](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), sections 1, 2 and 13).
- **Dark backgrounds**: the theme contract (see [design-system.md](./design-system.md#theme-contract-of-the-dark-backgrounds)) was measured on "Sections: colours with blocks": 43 axe violations before (Grey Teaser in a dark Section 1.09:1, inline links 1.72:1 to the text, List image cards 1.05–1.48:1), 0 after; focus ring brand 300 11.34:1 on Dark and 7.23:1 on Dark Green; Grey islands brand 500 4.07:1; inverted Primary button 19.6:1 ([dialog options report](../../../docs/audit/DIALOG-OPTIONS-2026-10-20.md), section 10; handover 2.34, F-105).
- **Register entries not yet updated**: handover F-27 (video caption `#999`) and F-28 (secondary text `#999`, white on `#4673db`) still read as open, but the code now uses `--color-text-secondary` for video captions and the darker tokens; non-text contrast of the video pause outline (F-56) and the Teaser's own Dark Primary buttons (F-49) remain open.
- **Forced colours**: a `forced-colors: active` query exists only in `blocks/separator/separator.css` (the handover's "present in the CSS" covers only that block).

## Reflow, zoom and touch targets

| Topic | What is implemented | Evidence |
| --- | --- | --- |
| Reflow (1.4.10) | Mobile-first layouts, rem sizes, `overflow-wrap: break-word` on links, sideways motion clipped (`motion-clip`) | Audit harness: 0 loads with horizontal overflow at 1440 / 1024 / 768 / 600 / 390px; **320px not tested** |
| Zoom / resize text (1.4.4) | `<meta name="viewport" content="width=device-width, initial-scale=1">` (zoom not disabled); rem-based type | No zoom test recorded |
| Text spacing (1.4.12) | No fixed heights on text known to clip | Not recorded |
| Touch targets | Button 3.125rem, icon button 2.75rem, Page Header actions 2.75rem, Canvas menu button 59px, nav items 48px, voice button 32px | Values from CSS and READMEs; no systematic measurement |
| Print | `@media print` exists only in `blocks/separator/separator.css` | — |

## Reduced motion

`utils/environment.js` `prefersReducedMotion()` and `scrollBehavior()` (`auto` instead of `smooth`) are shared. With `prefers-reduced-motion: reduce`: the Additional tab animations aren't prepared (content shows at once), skeletons don't pulse, Lottie stays on its first frame, videos don't autoplay, the Gen Carousel starts paused, smooth scrolling is off. Nothing animates in Universal Editor edit mode. Background animation on the first hero delays the LCP image (F-94; author guidance). See [animation report](../../../docs/animation/README.md) section H.

## Personalized content

No personalization runtime exists (no Adobe Target, AJO or edge personalization): every visitor gets the same authored content, so there is no personalized-content accessibility case to test. Blocked until a personalization design exists ([audit](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), section 8).

## Responsibilities

| Role | Responsibilities |
| --- | --- |
| Content authors | Write meaningful alt text, or leave it empty only for decorative images; choose heading levels in a logical order (one H1 per page, from the Page Header or the first Title); write link and button text that makes sense out of context; add captions / transcripts to videos; don't put information only in an animation, image or colour; check pages in the block library's language; keep placeholders translated |
| Developers | Use semantic elements and the shared decorators (buttons, links, headings, `announceNewTab`, `hideVisually`); keep all UI text in placeholders with an English fallback; keyboard support (Tab, Shift+Tab, Enter, Space, Escape, arrows, Home / End where the pattern needs it); visible focus; pause controls for moving content; reduced motion; semantic tokens for text colours so the theme contract applies; update the block README's Accessibility section |
| Designers | Provide colours that pass 4.5:1 (text) and 3:1 (non-text, focus) on every background, including the dark bands; sign off the contrast token change (audit); define focus, hover, disabled and error states; keep targets at least 1.5rem (24px, WCAG 2.5.8); design dark and Grey island combinations |
| QA | Run the axe harness at 1440 and 390px on the block library and curated pages; keyboard-test each changed block; check reduced motion, 200% zoom and 320px reflow; screen-reader runs when available; record results with the test vocabulary (Passed, Failed, Corrected and passed, Blocked, Not applicable) |
| Site administrators | Keep the placeholders (`/{locale}/placeholders.json`) complete per locale, including the accessibility strings (`opensInNewTab`, `pauseAnimation`, `playAnimation`, slide labels); publish error pages per locale; keep `<html lang>`-relevant metadata (language) correct |
| AI agents | Follow AGENTS.md "Accessibility" and this page; never claim a test that wasn't run; use `announceNewTab`, placeholders and the button decorators instead of re-implementing them; check new blocks inside the dark theme contract; record gaps as "Not recorded" or "Blocked" |

## Definition of done and evidence

A block or page change is accessibility-done when:

1. Semantics: native elements or the ARIA pattern of the component; headings at the authored level; landmarks unchanged.
2. Keyboard: every action reachable and operable; Escape closes popups and returns focus; no keyboard trap; focus visible on light and dark backgrounds.
3. Names: every control has a name from visible text or placeholders; new-tab links announce it.
4. Media and motion: pause / play for anything that moves for more than 5 seconds; nothing animates for reduced motion or in edit mode.
5. Contrast: axe colour-contrast clean on the block library page, including a dark Section variant; text over images checked manually.
6. Automated run: the audit harness (axe WCAG 2.0 / 2.1 / 2.2 A and AA at 1440 and 390px) reports 0 violations for the affected pages.
7. Documentation: the block README's Accessibility section is updated.

Recorded evidence:

| Evidence | Scope | Result | Status |
| --- | --- | --- | --- |
| First audit (19 October 2026), axe at 1440 and 390px | 188 pages (block library and curated design pages), 940 loads | 3,745 violation nodes before (colour-contrast 3,737, scrollable-region-focusable 8), 0 after | Corrected and passed |
| Re-audit (20 October 2026) | Same 188 pages × 5 widths | 0 violation nodes before and after the re-audit fixes; new defects found by code review and targeted browser tests | Passed |
| Theme contract (2.34) | "Sections: colours with blocks" at 1440 / 390px | 43 → 0 violations; live check after package 1.0.13: 0 violations | Corrected and passed |
| Performance regression run (2.36) | 955 loads | 0 axe violations | Passed |
| Code review per block | Semantics, headings, keyboard, focus, names, alt, reduced motion, pause controls, live regions, duplicate ids | 23 accessibility defects corrected in the first audit (D-A-2, D-A-4, D-A-25, D-B-1, …) | Corrected and passed |
| Screen reader (NVDA, VoiceOver) | Published pages | Not executed: no screen reader in the environment | **Blocked** |
| Universal Editor dialogs (authoring accessibility) | Real dialogs | Needs AEM author access | **Blocked** |
| Reflow at 320px, 200% / 400% zoom, text spacing | — | Not recorded | Not recorded |

Tools: [`docs/audit/tools/harness.mjs`](../../../docs/audit/tools/harness.mjs) (all pages × widths with axe and data-layer checks) and [`compare.mjs`](../../../docs/audit/tools/compare.mjs) (published vs local). The scripts use paths of the delivery workspace (the drafts folder, a local `axe-core` and Playwright install), so they need adapting before re-use: Requires validation.

## Gaps and recommendations

| Gap | Status | Proposed next step (not an approved decision) |
| --- | --- | --- |
| Project rule says WCAG 2.1 AA; this knowledge base targets 2.2 AA | Requires validation | Product owner decides; update AGENTS.md and handover 1.7.2 together |
| Screen-reader testing | Blocked: NVDA / VoiceOver on the published pages | Run on the curated pages and each interactive block |
| No skip link | Not recorded as a decision | Consider a "Skip to content" link before the header |
| Anchor List Sticky and Focus Not Obscured (2.4.11) | Requires validation | Test tabbing under the pinned list |
| Author bio LinkedIn link has no new-tab hint (F-52) | Open | Use `announceNewTab` |
| Video pause outline contrast (F-56), Teaser Dark Primary buttons (F-49) | Open | Design and development fix |
| Contrast token change needs design sign-off | Requires validation | Design sign-off |
| `forced-colors` and print styles only in the Separator | Not recorded | Review in Windows High Contrast |
| Register F-27 / F-28 read as open though the code changed | Documentation | Update the handover register |

## Related

- [design-system.md](./design-system.md): tokens, theme contract, focus states, motion
- [performance.md](./performance.md): skeletons and loading behaviour
- Other knowledge base pages: [testing-and-quality.md](./testing-and-quality.md), [blocks.md](./blocks.md), [authoring.md](./authoring.md), [development-standards.md](./development-standards.md), [personalization.md](./personalization.md)
- [AGENTS.md](../../../AGENTS.md#accessibility) "Accessibility" (Testing) and "Accessibility" in [Blocks](../../../AGENTS.md#blocks)
- [`blocks/README.md`](../../../blocks/README.md) and each block README's "Accessibility" section
- [`decorators/README.md`](../../../decorators/README.md) (a11y, link, button, skeleton, animation decorators)
- [Block ecosystem audit](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md), [re-audit](../../../docs/audit/REAUDIT-2026-10-20.md), [dialog options report](../../../docs/audit/DIALOG-OPTIONS-2026-10-20.md), [animation report](../../../docs/animation/README.md)
- [Handover](../TCS-CORP-HANDOVER.md): Part 1 — 1.7.2 Accessibility, Part 16 — Findings
