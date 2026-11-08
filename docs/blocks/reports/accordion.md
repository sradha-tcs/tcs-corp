# accordion

## Existing README changes

- No README existed; `blocks/accordion/README.md` written from `accordion.js`, `accordion.css`, `_accordion.json`, `decorators/editor-item-decorator.js`, `decorators/data-layer-decorator.js`, `decorators/motion-decorator.js`, `styles/styles.css` tokens, the block library draft (`drafts/en/block-library/accordion/accordion.plain.html`), the audits and handover 6.20.

## Discrepancies

- Handover 6.20.6 / 6.20.15 / 6.20.16: new items get "Lorem Ipsum" template values (Summary and Text). Code / model: the definition template has no values (re-audit R-C-11 corrected). Current: the code; the handover needs correcting (field table defaults, the "'Lorem Ipsum' appears on the live page" mistake, checklist step 2).
- Handover 6.20.3 business rules, 6.20.11 rule 3, 6.20.13 Issue 2: an item row without a summary is "left as it is" / shown as plain text. Code: rows whose first cell is empty (the Additional tab row and items without Summary) are removed on the page and replaced by an editor placeholder in Universal Editor (audit D-C-20 corrected). Handover needs correcting.
- Handover 6.20.11 rule 1: "every direct child row is one item". AEM delivers an empty row for the block's dialog tab first, which the code skips. Handover needs correcting.
- Handover 6.20.6 Additional tab table: no Animation Type / Motion Speed / Animation Trigger. Model has them (since 2.18; items staggered via `CONTENT_TARGETS`). Handover field table needs the three fields.
- Handover 6.20.1 / 6.20.8: allowed in "every standard section (section filter)"; dependencies omit `decorators/editor-item-decorator.js`; "about 30 lines of JS". Code: filters `section`, `columns-container`, `tabs`; the editor-item decorator is imported; 38 lines. Handover needs correcting.
- docs/audit/blocks/group-c-containers.md lists parents section and columns-container only; `component-filters.json` also has `tabs`. Audit note is out of date (informational).

## Variations verified

- Default Accordion (the only presentation; `_accordion.json` has no style / layout field, only the Additional tab).

## Accessibility documented

- Native `details` / `summary` semantics and keyboard (Tab, Enter, Space), 2px focus outline (`--border-width-200`), decorative CSS chevron, empty-summary items removed, reduced-motion rules, author / developer responsibilities.

## Data layer documented

- Component state `tcs-corp/components/accordion` (id = Anchor ID else `accordion-{n}`); `cmp:show` / `cmp:hide` from the captured `toggle` event with `dc:title` = summary; summary clicks excluded from `cmp:click`; `cmp:click` for links in answers; Tags / Web SDK not configured, no consent.

## Personalization

- None verified (standard statement).

## Responsive / performance

- No block media queries; sizes from tokens switching at 900px (`--heading-font-size-m` 1.125rem → 1.5rem, `--body-font-size-m` 1rem → 1.125rem); no requests outside the editor, no listeners of its own.

## Placeholders

- accordion-editor-empty-item-desktop.png
- accordion-focus-desktop.png
- accordion-dark-section-desktop.png
- accordion-authoring-step-1.png
- accordion-authoring-step-2.png
- accordion-authoring-step-3.png
- accordion-authoring-step-4.png
- accordion-default-tablet.png

## Open questions

- Dark sections: the body text (`--color-text-neutral-secondary`) and divider (`--color-border-default`) tokens aren't redefined by the dark-background theme contract in `styles/styles.css`; needs a contrast check on `block-library/foundations/section-colours-with-blocks` and a design decision.
- Owner, version and date of the block: not recorded (handover: "[To be confirmed: product owner]").
- Product decision on "open by default", "one open at a time" and FAQ structured data (listed as known limitations, no plan recorded).
