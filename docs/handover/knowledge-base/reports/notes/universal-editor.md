# universal-editor.md

## Sources inspected

- `component-models.json` (counted with Node: 63 models, 991 top-level field entries incl. 82 tabs, 1027 incl. container sub-fields; components, `description`, `condition`, `validation`, `required`, `min` / `max`, `readOnly`, `placeholder`, `multi`, `options`, empty-value options; JsonLogic operators)
- `component-definition.json` (groups, resource types, template names and values, key-value), `component-filters.json`
- `models/_component-models.json`, `models/_component-filters.json`, `models/_section.json`, `models/_card-list.json` includes in `blocks/list/_list.json` and `blocks/cards/_cards.json`, `blocks/button-block/_button-block.json`
- `.eslintrc.js`, `node_modules/eslint-plugin-xwalk` 0.1.1 (`lib/index.js`, `lib/base-rule.js` `getFieldNames`, `lib/rules/max-cells.js`, `invalid-field-name.js`, other rule descriptions), `.husky/pre-commit.mjs`, `xwalk.json`, `package.json` scripts
- `utils/cells.js`, `utils/properties.js`, `blocks/video/video.js` (poster legacy), `blocks/form-variations/form-variations.js` (`fieldName`), `utils/motion.js` `addLegacyMotion` users, `test/model-layout.mjs`, `test/models/block-names.test.mjs`
- `AGENTS.md` ("Additional tab", "Dialog tabs", "AEM delivery rules", "Item children", "Button"), `docs/audit/BLOCK-ECOSYSTEM-AUDIT.md` (sections 1, 4, 9, 11), `docs/audit/REAUDIT-2026-10-20.md`, `docs/audit/reaudit/review-d.md` (Submit "Send"), `docs/audit/DIALOG-OPTIONS-2026-10-20.md` (headings)
- Handover 15.4 (Content Modeling Standards), 13.5 (title)
- git history of `.eslintrc.js` (commit bce016d: `tabs` limit 7 to 8)
- Commands run: `npm run lint` (passed), `npm test` (311 passed) at commit 2d06316

## Discrepancies

- implementation: `xwalk/max-cells` default `*` is 4; the `classes_*` Additional tab fields group into one `classes` cell (`groupNames` in the rule) and key-value models are exempt | documented: "`max-cells` allows 8 for the tab fields" (AGENTS.md "Additional tab"); 8 was the `tabs` limit set in commit bce016d | impact: misleading guidance for new blocks | correct: .eslintrc.js / eslint-plugin-xwalk
- implementation: limits `tabs` 21, `gen-carousel` 18, `columns-container` 22, `list-item` 19 | documented: `tabs` 8, `list-item` 13, no `gen-carousel` / `columns-container` limits (handover 15.4.3) | impact: outdated handover | correct: .eslintrc.js
- implementation: Video poster fields are `poster` / `posterAlt` (grouped `placeholder_image` isn't delivered in key-value blocks) and composite multifields are compatibility-only | documented: element grouping example "Video `placeholder_image`" and composite multifields listed as a modeling rule (handover 15.4.2) | impact: could lead to new grouped fields in key-value blocks or new multifields | correct: AGENTS.md / code
- implementation: Submit Button template stores `label: "Send"`; TCS Header model defaults the logo alts | documented: "no sample content in templates or model defaults" (AGENTS.md) | impact: low; retained in the re-audit (review D: localisation by translation only) | correct: both recorded (exception)
- implementation: my count 991 top-level field entries (909 without tabs) | documented: 926 / 924 dialog fields (audit, re-audit, `docs/audit/data/dialog-fields.csv` method) | impact: none (different counting methods) | correct: n/a, both stated with their method

## Gaps and blocked topics

- Persistence in Universal Editor (what is stored, whether hidden conditional fields keep and deliver values, date storage D-A-26): blocked, AEM author access needed.
- How `scripts/editor-support.js` is loaded in Universal Editor is not visible in the repository.
- Whether Universal Editor offers Card in the + of a new key-value Cards block (handover O-20): open.
- Dialog label / help text localisation: no mechanism in the repository (labels are English).

## Decisions found

- Item children replace composite multifields; multifields kept read-only for content authored before (AGENTS.md "Item children").
- At most three tabs, Additional last (AGENTS.md "Dialog tabs").
- `container*` section fields instead of `classes_*` (re-audit R-L-1, package 1.0.10, PR #121).
- `buttonVariant` instead of a `*Type` field; Canvas Button own model (audit D-D-27, AGENTS.md "Button").
- `fieldName` for case-sensitive form keys (re-audit R-D-1).
- No sample content in templates (re-audit R-A-6, R-C-10, R-C-11, R-D-9).
- Video `placeholder_image` renamed to `poster` (audit L-2), legacy rows still read.

## Recommendations

- Correct the AGENTS.md "max-cells allows 8 for the tab fields" sentence (classes fields count as one cell; key-value models are exempt).
- Update handover 15.4.2 / 15.4.3 (limits, grouped-field example, multifields as compatibility-only).
- Consider moving the Submit Button "Send" label to a placeholder fallback only (the re-audit retained it as low).
- Run the Universal Editor persistence checks once author access is available.
