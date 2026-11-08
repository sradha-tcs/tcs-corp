# form-variations

## Existing README changes

- No README existed.

## Discrepancies

- Handover 6.29 (intro "Important" note, 6.29.10 Generated JSON, 6.29.11 rules 21 and 23, 6.29.13 Issue 1, 6.29.14 Known Limitations, 6.29.15, 6.29.16 checklist) says there is no submit endpoint and that "Thank you, your details were sent." is shown whether or not anything handled the data. Code (current): the model has a **Submit action** field (`formAction`); a valid submit dispatches a cancelable `form-variations:submit` with `detail: { data, respondWith }`; handled → awaits the promise (success / `formError`); not handled + Submit action → POST JSON `{ data }` (success only on `response.ok`, else `formError`); neither → `formNotConnected`, values kept, nothing claimed as sent; editor note `formNoAction`. Handover 6.29 and finding F-01 need correcting (F-01 is partly addressed: the false success message is gone; a back end is still not in the repository).
- Handover 6.29.10 example event has no `cancelable` / `respondWith`; the code event is cancelable and has `respondWith`. Handover needs correcting.
- Handover 6.29.10 / 6.29.13 Issue 8 / 6.29.14 say `cmp:submit` is pushed on every attempt including invalid ones and `dc:title` is the block name. Code (current): `decorators/data-layer-decorator.js` skips invalid `noValidate` forms (`checkValidity()`), and `dc:title` comes from the form's `aria-labelledby` title (re-audit R-D-3). `fields` still includes the names of hidden (disabled) conditional fields. Handover needs correcting.
- Handover 6.29.9 sample HTML shows the type alone in the first cell and the key in the next cell; AEM delivers `<node name>, <classes>` and the current model has a `fieldName` cell (re-audit R-D-1, AGENTS.md delivery rules). Handover sample is legacy markup (still read by the code).
- Handover 6.29.11 rule 1 says the first two rows are title and description; code skips the leading empty tab row and reads a third property (Submit action), or uses `data-aue-prop` in the editor.
- Handover placeholder key list misses `charactersCount`, `fieldsUpdated`, `formError`, `formNotConnected`, `formNoAction` (all used by the code).
- Handover 6.29.13 Issue 5 / F-32 (required note takes one grid column from 900px; checkbox error beside consent text): still true in the CSS (note has no `full-width`; `.field-checkbox` is a row flex without wrap).
- Code limitation found (not in handover): the `aria-busy` double-submit guard is set only on the Submit action (fetch) path, not while an integration's `respondWith` promise is pending.
- The `fieldName` description says "Letters, digits, - or _", but the dialog has no validation regex for it.

## Variations verified

- Default theme, Dark theme (`classes` select in `_form-variations.json`, CSS `.form-variations.dark`).
- Half-width name fields (code: `name.toLowerCase().includes('name')` in `buildTextField`; CSS `.full-width` from 900px).
- Conditional items (`dependsOn` / contact card `region` in the item models; `updateVisibility`).
- Item types documented in the fields tables: field-text (Text / Email / Tel), field-select, field-textarea, field-checkbox, contact-card, field-submit.

## Accessibility documented

- Native labelled controls, `novalidate` with inline errors linked by `aria-describedby` / `aria-invalid`, focus to first error, `role="status"` focused after the outcome, autocomplete by name, hidden-asterisk note, counter announcement, `aria-busy` / `aria-disabled` while sending.

## Data layer documented

- Component state; `cmp:click` on Send (not while `aria-disabled`) and on contact links (`exit`); `cmp:submit` for valid submits with field names only, before the outcome; no `cmp:change`; no `data-cmp-*` or `pushComponentEvent` in the block.

## Personalization

- None (standard statement); conditional items react only to the visitor's dropdown choice.

## Responsive / performance

- Breakpoints 600px (dark padding), 900px (two columns, dark padding); waits for placeholders, no images, one fetch per valid submission, no observers.

## Placeholders

- form-variations-not-connected-desktop.png
- form-variations-submit-error-desktop.png
- form-variations-required-errors-mobile.png
- form-variations-editor-no-action-desktop.png
- form-variations-dark-mobile.png
- form-variations-authoring-step-1.png to form-variations-authoring-step-5.png
- form-variations-default-mobile.png
- form-variations-dark-tablet.png
- form-variations-conditional-desktop.png

## Open questions

- Which endpoint(s) the Submit action should point to per form and locale, and who owns the back end (O-08, F-01).
- Whether a success signal for analytics will be added once the measurement plan exists (R-D-3).
- Whether the double-submit guard should also cover the integration (`respondWith`) path.
- Whether AEM omits never-set fields in item rows (O-18), given the positional reading.
- Product owner and version of the component (Not recorded).
