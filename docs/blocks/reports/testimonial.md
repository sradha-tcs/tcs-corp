# testimonial

## Existing README changes

- No README existed; `blocks/testimonial/README.md` created.

## Discrepancies

- **Show Description default:** handover 6.13.11 rule 5 ("a missing Show Description value hides the description") and F-25 (open) contradict the code. `testimonial.js` uses `isOnByDefault(props.showdescription)`, so a missing row shows the description. The code is current; the rule, the troubleshooting causes (6.13.13) and the F-25 status need correcting (the stats part of F-25 still applies).
- **Dialog tabs and fields:** handover 6.13.6 uses the tabs Content, Author, Style, Show / Hide and Stats, and a Style (`classes`) field. The model has Content / Style / Additional (2.8), and the Style field was removed (2.27).
- **Item children:** handover 6.13.8 says "no child components". The block has Stat items (`testimonial-stat`, 2.10; the chapter's Update 2.10 note covers it).
- **Allowed parents:** handover says every section only. The filters also include `columns-container` and `tabs`.
- **F-58 (help texts):** listed as open. `_testimonial.json` now has Author "The person's name, e.g. Ranil Boteju." and Designation & Location "e.g. Chief Data & Analytics Officer, Lloyds Banking Group, London.", which looks resolved; the register needs updating.
- **Dependencies:** handover 6.13.1 doesn't list `decorators/editor-item-decorator.js` or `utils/cells.js`, which the code imports.

## Variations verified

- Default, Grey background, Author with photo / text only, With stats (Stat items and the legacy Stats multifield), and Hide Eyebrow / Hide Title / Show Description off / Hide Author Details. Defined in `testimonial.js`, `_testimonial.json`, `testimonial.css` and `decorators/stats-decorator.js`.

## Accessibility documented

- figure / blockquote / figcaption, `<dl>` stats, a visually hidden title kept in the outline and in `dc:title`, author alt text or decorative, empty states, and reduced motion.

## Data layer documented

- The component entry (`tcs-corp/components/testimonial`, Anchor ID or `testimonial-{n}`, `dc:title`), and `cmp:click` (`link`) for rich-text links. No `data-cmp-*` attributes and no positions.

## Personalization

- No verified personalization behavior.

## Responsive / performance

- One breakpoint, 900px (gaps, Grey padding, global type tokens); the stats grid auto-fits 10rem columns. No requests on the page (the placeholders are loaded only in the editor for the item hint).

## Placeholders

- testimonial-grey-background-mobile.png
- testimonial-stat-placeholder-editor-desktop.png
- testimonial-stats-only-desktop.png
- testimonial-authoring-step-1.png to testimonial-authoring-step-5.png
- testimonial-default-mobile.png
- testimonial-grey-background-tablet.png
- testimonial-author-photo-mobile.png
- testimonial-with-stats-mobile.png
- testimonial-hide-title-mobile.png

## Open questions

- A Testimonial with BG Color Grey inside a dark Section or Columns Container: the theme contract's Grey reset lists only `.teaser` and `.block.columns-container`, so its text may stay light on grey. Not verified in a browser; added as TESTIMONIAL-QA-15.
- Background animation is offered only with BG Color Grey (model condition). Product owner to confirm.
- The owner, version and date are not recorded.
