---
id: "REL-003"
title: "CI Validation"
role: "Release and DevOps"
topic: ""
audience: "Release lead, DevOps, technical lead"
owner: "Release Lead / DevOps Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: [".github/workflows/main.yaml"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# CI Validation

| Attribute | Value |
| --- | --- |
| Document ID | REL-003 |
| Audience | Release lead, DevOps, technical lead |
| Purpose | What CI checks |
| Scope | — |
| Prerequisites | — |
| Owner | Release Lead / DevOps Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | .github/workflows/main.yaml |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Workflow .github/workflows/main.yaml](#workflow-githubworkflowsmainyaml)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Workflow .github/workflows/main.yaml

```yaml
name: Build
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v6
    - name: Use Node.js 20
      uses: actions/setup-node@v6
      with:
        node-version: 24
    - run: npm ci
    - run: npm run lint
```

CI runs lint only; `npm test` runs locally before every commit (AGENTS.md).

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
