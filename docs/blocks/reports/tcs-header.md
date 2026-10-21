# tcs-header

## Existing README changes

- Kept: the description (key-value block, Figma "Nav Bar-NEW", allowed in sections), the field list and defaults, the nav page role (brand / tools taken by the header, the first other section is the menu, positional nav page otherwise), the standalone layout, the Full Width / Fixed Width gutter note, the output classes `tcs-header-bar`, `tcs-header-brand`, `tcs-header-group` relied on by `blocks/header`.
- Corrected: "A logo without an image shows its alt text": the alt fields collapse into their images (AEM delivery rule), so a linked logo without image shows the placeholder name (`tcsLogo` / `tataLogo`), and a logo without image and link isn't rendered. Added that a bare domain link gets `https://`.
- Removed: the hand-written field table (replaced by the generated fields section).
- Added: all other sections, data layer, QA, limitations, change history.

## Discrepancies

- Handover 6.1.18 says the header is "the project's Header block (no separate `tcs-header` block)"; the repository has `blocks/tcs-header` (model, JS, CSS) used on the nav pages. Code is current; handover needs correcting.
- Old README fallback "shows its alt text" contradicted the code / AEM delivery (D-D-25); corrected in the README.
- No other contradiction found between handover 6.1.18 (fields, Additional tab, logo sizes) and the code.

## Variations verified

- On the Navigation page (blocks/header `applyLogoBar`)
- Standalone logo bar (tcs-header.css, Full Width vs Fixed Width section)

## Accessibility documented

Logo links named by their alt text, placeholder name for an empty alt on a linked logo, text fallback without image.

## Data layer documented

Standalone component `tcs-header-{n}` with central `cmp:click` (dc:title empty for image-only links); on the nav page clicks report the header.

## Personalization

None verified.

## Responsive / performance

Breakpoints 600px and 1200px (tcs-header.css); no requests beyond placeholders; module preloaded (CHROME_BLOCKS).

## Placeholders

tcs-header-in-header-desktop.png, tcs-header-standalone-desktop.png, tcs-header-standalone-mobile.png, tcs-header-no-image-desktop.png, tcs-header-authoring-desktop.png, tcs-header-authoring-step-1.png to tcs-header-authoring-step-4.png

## Open questions

- Should the block be removed from the generic `section` filter in favour of a nav-page-only filter (audit suggestion)?
- Production logos: replace the block library PNGs with the SVGs of F-77 on the locale nav pages.
