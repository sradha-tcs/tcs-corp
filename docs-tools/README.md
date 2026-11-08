# docs-tools: the documentation program

Generates `docs/handover/` of this branch (the role-specific documentation set, KB-D-069) from the code
repository and the published reference pages. Run it after every code change (AGENTS.md, documentation rule),
review the changes, and push them with the delivery-branch tooling.

## Requirements

- Node.js 20 or later; a checkout of the code repository (`main`).
- `npm install marked@12 mermaid@10 playwright-core` in this folder, and a Chromium for Playwright
  (`npx playwright install chromium`, or `PLAYWRIGHT_BROWSERS_PATH` pointing to an installed one).

## Steps

```bash
# 1. inventory of the code (blocks, models, fields, variations, tests, tokens)
node inventory.mjs <repo> data
# 2. evidence of the published reference pages (block library and curated design pages of /design-block-master/en):
#    screenshots at 375 / 768 / 1024 / 1440, console, failed requests, data layer, DOM accessibility checks
node capture.mjs reference-pages.txt evidence
# 3. links of the published pages of a root (one path a line) -> data/links-<root>.json
node analyze-links.mjs <paths file> <published paths file...>
# 4. the documents (data/commands.json and data/publishing.json hold the command and publishing results)
node generate.mjs <repo> data evidence <handover screenshots dir> <out>
# 5. the PDFs (never edit them)
node pdf.mjs <out>
# 6. validation -> DOCUMENTATION-VALIDATION-REPORT.md (exit 1 on a blocking failure)
node validate.mjs <out> <repo>
```

`<handover screenshots dir>`: the screenshots of the former handover (tag archive/docs-before-role-docs-2026-11-08,
`docs/handover/screenshots/`), carried into each block's folder.

## Files

| File | Role |
|---|---|
| `lib.mjs` | Document writer (metadata, contents, closing sections), link normalisation, helpers |
| `gen-*.mjs` | One module per role folder; `gen-audit.mjs` also writes the root registers |
| `testcases.mjs` | EPICs and the test cases derived from the models (shared by QA and BA) |
| `diagrams.mjs` | Mermaid sources of the architecture diagrams |
| `assets/asset-selector/` | Templates of the Dynamic Media asset picker configuration |
