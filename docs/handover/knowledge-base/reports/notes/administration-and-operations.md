# administration-and-operations.md

## Sources inspected

- Handover: Part 12 (12.1.1–12.1.9, 12.4, 12.5, 12.6), Part 14 (14.1–14.10, lines 121832–122255), Part 16 (16.3, 16.4), Part 17 (17.1–17.8, lines 123512–123838), 4.9, revision history
- `AGENTS.md`: site structure and site data, notes on `paths.json`, bulk metadata, redirects, query index; Content Modeling; Blocks (AEM delivery rules, Dialog tabs, Item children); Contributing
- `paths.json` (counted: 154 mappings, 15 includes, 28 excludes), `tools/paths/generate-paths.mjs` (`REVIEW`), `utils/site.js` (`LOCALES`, `REVIEW_*`, `localeSheetPath`, `sheetRows`), `helix-query.yaml` (excludes, 37 properties incl. cardStyle / cardTheme), `helix-sitemap.yaml`, `fstab.yaml`, `.hlxignore`, `tools/sidekick/config.json`
- `component-filters.json`, `models/_component-filters.json`, `models/_section.json`, `.eslintrc.js` (xwalk/max-cells), `.stylelintrc.json`, `.husky/pre-commit.mjs`, `package.json`
- `scripts/aem.js` (sampleRUM weight 100, `ot.aem.live`), `404.html` (404 checkpoint), `scripts/scripts.js` (TEMPLATES), `utils/placeholders.js`, `utils/taxonomy.js`, `.renovaterc.json`
- `blocks/README.md` (deprecated blocks, maintaining), `docs/audit/BLOCK-ECOSYSTEM-AUDIT.md` (sections 9–14), `docs/audit/REAUDIT-2026-10-20.md` (sections 4–7), `docs/handover/README.md`
- Checks run: fresh `merge-json-cli` of the three partials into `/tmp` compared with the committed aggregated files (in sync); `npm run lint` (no errors)

## Discrepancies

- implementation: `paths.json` has 154 mappings, 15 includes, 28 excludes | documented: "143 mappings, 14 includes, 28 excludes" (handover 12.1.1) | impact: wrong expectation when comparing with `public.json` | correct: `paths.json` (AGENTS.md "154 mappings, 143 of them for the locales")
- implementation: `helix-query.yaml` has 37 properties (incl. `cardStyle`, `cardTheme`) | documented: "the 34 properties of helix-query.yaml" (handover Part 17 W-01) and a column list without cardStyle / cardTheme (12.1.7) | impact: W-01 check compares against the wrong count | correct: `helix-query.yaml`
- implementation: the Teaser personalization marker was removed (D-B-3) | documented: "Teaser's Personalization flag only adds a marker class" (handover 14.9 #17, 16.4) | impact: stale limitation | correct: models / audit register
- implementation: Interactive Dashboard is in no filter | documented: listed in the Section filter (handover 5.4.3) | impact: admins may think it's offered | correct: `component-filters.json`
- implementation: 14.10.3 lists "This handover document (version 2.0)" and block READMEs for three blocks only | documented: handover 14.10.3 | impact: stale documentation list (30 block READMEs exist) | correct: repository

## Gaps and blocked topics

- Team names, named owners, support hours, ticketing tool, severity SLAs, escalation times for P2, security contact: Not recorded (O-01, O-13). Escalation section marked Requires validation.
- Permission model (AEM groups, locale permissions, publish approval), Admin API roles, GitHub branch protection, RUM dashboard / domain key access: Not recorded (O-05, O-06).
- Current state of the site configuration (`public.json` paths, `metadata.source`, CDN, robots, access): not readable from the repository; Blocked: authenticated Admin API access.
- Uptime tool: not implemented, tool not recorded.
- Results of daily / weekly / monthly health checks: none recorded in the repository.
- Production content migration status (Columns → Columns Container, buttons, Video poster, Hero motion, form `fieldName`): not recorded; only the block library packages are migrated.

## Decisions found

- `paths.json` is generated from `LOCALES` (`npm run build:paths`) and applied to the site configuration's `public.json` (AGENTS.md "Site structure and site data").
- Bulk metadata sheets per locale, applied once all 13 are listed in `metadata.source` (AGENTS.md notes).
- Redirects per locale by the user's choice; the platform applies only a root `/redirects.json` (AGENTS.md notes).
- Temporary language master review (`REVIEW` / `REVIEW_*`) to be removed after the rollout to `/en` (AGENTS.md; handover revisions 2.11, 2.14).
- Withdraw components by removing them from filters while keeping definitions (handover revision 2.28; audit D-B-17).
- Block library pages stay out of the query index by design (handover revision 2.35).
- Part 17 is the checklist of record where it differs from 14.7 (handover 17.1).

## Recommendations

- Assign the owners and SLAs of handover 14.1.3 and record the permission model before the AMS sign-off (handover 17.7 notes).
- Keep a dated export of the site configuration before every change (handover G-11) and store it with the change record.
- Configure `metadata.source` for the 13 sheets and a redirect mechanism; then update the known limitations.
- Update handover 12.1.1, 12.1.7 and W-01 to the current `paths.json` and `helix-query.yaml` counts.
- Publish the non-image DAM assets listed by the re-audit and add the step to the release checklist.
