# separator

## Existing README changes

- Kept (moved into the required sections): the intro; the "use / don't use" guidance (Overview); the Semantic / Decorative / Spacing-only table (Variations); "Choosing the look" (spread over For Content Authors, Variations and the Authorable Fields notes); the Examples table (Overview, realistic use cases); the class / token / runtime columns of the field matrix (Authorable Fields notes, as a Field | Block class | Rendering table); the HTML contract, CSS custom properties, JavaScript notes, `?debug=separator`, analytics state, extension points, "Without JavaScript" (For Developers / Extending / Data Layer); the placeholders `separatorHidden` / `separatorInvisible` (Accessibility, Site Administrators); the four known limitations (Known Limitations table).
- Corrected: "Theme: Auto follows the section (dark and brand sections get their palettes)" — Auto follows only `.section.dark` / `.section.brand`; the current Section Style (Default / Grey / Dark / Dark Green: `bg-grey`, `bg-dark`, `bg-dark-green`) doesn't switch the palette (only the Primary colour follows, through the theme contract's `--color-border-brand`). The example "Edge-to-edge in a dark section | Full width (Theme Auto: the dark palette)" became "Edge-to-edge in a section | Variant Full width".
- Corrected: "Component ID … Empty: separator-1 …" — empty uses the Anchor ID first (`idOf`), else `separator-n`; the field is now shown only for separators that already have a value (legacy), as are Background contrast and Stretch to container width.
- Corrected: "Variant … Custom: only the Appearance settings" and Width "Auto" — both options were removed from the dialog (handover 2.27, audit D-D-15 / D-D-16); their values are still read (Custom = Default preset, Auto = 100 %). Documented as legacy mapping.
- Corrected: "Spacing … (Default: 24px)" kept as "1.5rem (24px)", `--space-600`; tab names "Appearance / Responsive / Spacing / Advanced" no longer exist (General / Style / Additional since 2.8).
- Corrected: "`models/_section.json` allows the Separator in sections" — also offered in the `columns-container` and `tabs` filters.
- Removed: the hand-written field matrix (duplicated the generated fields tables); the claim that "rendering, accessibility tree, RTL, animation, forced colours and print were checked in the browser" (not verifiable in the repository; QA table lists them as scenarios instead).
- Added: all required sections, Additional tab note (no animation fields; `test/motion/motion.test.mjs`), responsive range-query table, data-layer table, QA, troubleshooting (from handover 6.26.13), security, change history.

## Discrepancies

- Handover 6.26 screenshot "Properties panel" and 6.26.13 (Issue 2 "General > Accessibility mode and Appearance > Line style", Issue 5 "Spacing > Use section padding") use the tabs General, Appearance, Responsive, Spacing, Advanced, Additional; the model has General / Style / Additional (2.8, F-84). Model is current.
- Handover 6.26.3 Variation 13 "Variant: Custom" and Issue 6 (Width "Auto"): options removed in 2.27; code still reads them. The chapter needs updating.
- Handover 6.26.1 / F-21: "the section dialog has no dark / brand style": the Section Style now offers Dark / Dark Green (`bg-dark`, `bg-dark-green`, 2.33), but the separator CSS still keys Theme Auto on `.section.dark` / `.section.brand`. Code / handover agree that Auto doesn't follow, but F-21's wording is outdated; either the CSS should also follow `bg-dark` / `bg-dark-green` or the limitation should be restated (needs a product / development decision).
- `separator.css` uses range media queries (`width < 600px`, `600px <= width < 1200px`, `width >= 1200px`) rather than mobile-first `min-width` queries (AGENTS.md CSS guideline). Not a doc discrepancy; noted for development.

## Variations verified

- Accessibility mode Semantic / Decorative and spacing only; variants Default, Subtle, Strong, Inset, Full width, Dotted, Dashed, Gradient, Branded (+ legacy `custom-design`); themes Auto / Light / Dark / Brand; line styles, thickness, colours, opacity, widths, maximum widths, alignment, decorations, contrast, per-breakpoint visibility / width / thickness / alignment / spacing, Use section padding, Stretch, Respect max width, Animate on view (fade, draw from start / center) with reduced-motion fallback, Print, Analytics — all in `_separator.json`, normalized in `separator-config.js`, styled in `separator.css`.

## Accessibility documented

- One native `<hr>` (Semantic exposed with optional `aria-label`, Decorative `aria-hidden`), decorations hidden, editor-only warnings, reduced motion, forced colours, RTL alignment; no keys handled.

## Data layer documented

- Optional state entry `tcs-corp/components/separator` (`xdm:variant`, `xdm:accessibilityMode`, `xdm:theme`, `xdm:lineStyle`, `xdm:visibility`, `dc:title`); `data-analytics` `off` / `custom` excludes it from generic tracking; no events.

## Personalization

- None verified (standard statement).

## Responsive / performance

- Range queries < 600 / 600–1199 / >= 1200px; no network calls on the published page, no resize listeners, IntersectionObserver only with an animation.

## Placeholders

- separator-added-editor-desktop.png, separator-invisible-semantic-editor-desktop.png, separator-rtl-desktop.png, separator-forced-colors-desktop.png, separator-bg-dark-section-desktop.png, separator-authoring-step-1.png … separator-authoring-step-4.png, separator-variants-mobile.png, separator-responsive-overrides-tablet.png (plus the generated dialog placeholders).

## Open questions

- Should Theme Auto follow the Section Style Dark / Dark Green (`bg-dark`, `bg-dark-green`)? Today it uses the light palette there.
- Removal of the legacy-only duplicate controls (audit D-D-17) once content is migrated.
- Owner and version of the block.
