# cards

## Existing README changes

- Kept: the purpose and Cards vs List comparison table, the Card field behaviour (moved into Authorable Fields notes), the Figma variation mapping (now the Variations section), rendering flow (now For Developers), accessibility summary, analytics example (now a Trigger / event table), empty states, animation note, placeholder keys (now the Site Administrators dependency table), backward compatibility (now "Legacy cards (compatibility)"), known issues C-1 to C-3 and planned extensions (now Known Limitations), known limitations, block audit notes (now Change History 2.27).
- Corrected: the old "For authors" tab table listed Component ID and Reduced motion; both were removed from the dialog (audit D-A-11 / D-A-12). The README now says stored Component ID and Touch swipe values are still read and Reduced motion is ignored. The Analytics example now says card clicks carry `position` and the feature card has its own `data-cmp-id`.
- Removed: the hand-written file table and field tables (replaced by the generated `files` / `fields` markers); the anchor links into the List README (`#field-matrix`, `#figma-to-css`), because the List README is being restructured. It is linked without anchors.
- Removed: C-4 (confirm Card is offered in Universal Editor) from the limitations table. It is an open question now (below).
- Added: every required section, 18 screenshot placeholders, the QA table, troubleshooting, performance, security, the mermaid diagram and the change history.

## Discrepancies

- **Dialog tabs:** handover 6.15 (Authoring, Field Specification, 6.15.17 execution example, Quick Reference "Cards tab", "Layout tab", "Scroll tab") and the generated properties panel screenshot use Content / Cards / Layout / Scroll / Advanced / Additional. The model has Content / Display / Additional (handover 2.8). The code is current; the chapter body needs correcting.
- **Report call to action type:** handover Business rule 19 says report and statistic cards get secondary buttons, and the screenshots show an outlined Download. `renderCard` uses `{ stat: 'secondary' }[kind] || 'tertiary'`, so report cards get a text link (`tertiary`). The code is current. Either the handover or the code needs correcting, and the design needs confirming.
- **Click position / feature card:** handover 6.15.10 and the 6.15.14 Known Limitations say card clicks carry no `position` and feature card clicks use the block's path. `positionOf` in the data layer decorator now reads the item's `data-cmp-position`, and `renderCardList` sets `data-cmp-id` / `data-cmp-position` on the feature card. The code is current; the handover is outdated.
- **Previous / next buttons:** handover 6.15.8 says "named buttons with `disabled` states". The scroller uses `aria-disabled` (so the focus stays, D-A-4). The code is current.
- **Reduced motion:** handover rule 32 says "with Reduced motion support on". That field was removed, and the scroller always honours reduced motion. The code is current.
- **Component ID:** handover rule 9, Quick Reference and Issue 9 still list it as a field. It was removed from the dialog, though stored values are still read. The code is current.
- **Block class:** handover 6.15.10 lists `teaser`. The code uses `display-teaser` (2.7). The chapter's output model still says `teaser`.
- **Audit register:** BLOCK-SECTIONS.md lists D-A-5 / D-A-24 (no position, feature without cmp id) among the group defects. The code has corrected both; the register status should be checked.

## Variations verified

- Card styles Image card, Panel, Report, Statistic, Mixed (`CARD_STYLES` / `kindOf` in `utils/card-list-config.js`; `renderCard`).
- First card as feature (`renderFeature`) and rows of links, i.e. Display as teaser off (`renderRow`).
- Card colours, 8 values (`CARD_THEMES`, `themeOf`, `theme-*` CSS).
- Grid / horizontal scroll per breakpoint (`applyCardListLayout`, `RESPONSIVE_DEFAULTS`).
- Style options `stat-compact`, `dividers`, `header-center` (`STYLE_OPTIONS`).
- Legacy two-cell cards (`readCard` / `readLegacyText` in `cards.js`).

## Accessibility documented

- `ul`/`li` in a named region, heading levels, one link per card, accessible names ("{label}: {title}", previous / next), new-tab hint, focus rings, an `aria-disabled` scroller and keys (Tab, Enter, Space, arrows, Home, End), reduced motion, dark theme contract.

## Data layer documented

- `trackCardList` state (`tcs-corp/components/cards` and `/item`, `xdm:variant`, `xdm:position`), and `cmp:click` with `data-cmp-interaction` `card` / `cta` / `previous` / `next` (inline links `link`) with position. Analytics off means `data-analytics="off"`. Tags / Web SDK are not configured; no consent.

## Personalization

- None. This is the standard statement.

## Responsive / performance

- Breakpoints are 600 / 900 / 1200px (`styles/card-list.css`). Images are lazy by default; Eager gives `fetchpriority` high to the first image only. Placeholders and taxonomy fetches only; scroller listeners; no skeleton.

## Placeholders

- cards-universal-editor-desktop.png
- cards-editor-placeholder-item-desktop.png
- cards-focus-states-desktop.png
- cards-empty-message-published-desktop.png
- cards-dark-section-desktop.png
- cards-rows-of-links-mobile.png
- cards-authoring-step-1.png to cards-authoring-step-5.png
- cards-image-tablet.png
- cards-panel-mobile.png
- cards-report-mobile.png
- cards-statistic-tablet.png
- cards-mixed-mobile.png
- cards-feature-mobile.png
- cards-rows-of-links-tablet.png
- cards-colours-tablet.png
- cards-scroll-mobile-buttons-mobile.png

## Open questions

- Report card call to action: text link (code) or outlined secondary button (handover, screenshots)? This needs a design / product owner decision.
- Handover Issue 11 / decision D-1: does **+** on a Cards block offer Card in this program's Universal Editor? This should be confirmed on AEM author.
- Migration of the Cards blocks created before the redesign (Phase 0 of the refactoring proposal) is still pending a product owner decision.
- D-A-26 (card date may shift a day) is suspected and blocked; it should be verified with a date-time authored east of UTC.
- Product owner / version are not recorded.
