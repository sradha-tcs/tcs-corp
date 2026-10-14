# Handover Documentation

Handover documentation for the TCS Corporate website (AEM Edge Delivery Services with Universal
Editor). The documents aren't served on the website (`docs/` is listed in `.hlxignore`).

## Project handover (current)

| File | Description |
|---|---|
| [TCS-CORP-HANDOVER.pdf](TCS-CORP-HANDOVER.pdf) | The official project handover, version 1.1, 14 October 2026 (version 1.0 of 13 October 2026 plus the Cards and Card analysis): project overview, solution architecture, site structure, content architecture, authoring fundamentals, every component (31) with each variation, field specifications, business rules, troubleshooting and support runbooks, taxonomy, metadata, data sheets, error pages, analytics data layer, publishing and release, global troubleshooting, AMS runbook, appendix, and a register of findings and open items (Part 16) |
| [TCS-CORP-HANDOVER.md](TCS-CORP-HANDOVER.md) | The editable source of the PDF (Markdown) |
| [screenshots/](screenshots/README.md) | Where the screenshots named in the document's placeholders go |
| [../proposals/](../proposals/README.md) | Design proposals that follow up on the handover (e.g. the Cards and Card refactoring) |

| Part | Contents |
|---|---|
| Document Control | Document information, revision history, approval, audience guide, conventions, executive summary |
| 1 | Project overview: objectives, scope, non-functional requirements, assumptions, dependencies, success criteria, ownership |
| 2 | Solution architecture: high-level and context diagrams, component architecture, landscape, deployment, environments, security, integrations, system catalogue |
| 3 | Site structure: hierarchy, 13 locales, page model, folders, navigation, error pages, redirects |
| 4 | Content architecture: templates, content types, metadata and taxonomy models, placeholders (all keys), references, sheets, shared content, localisation |
| 5 | Authoring fundamentals: access, Universal Editor, pages, sections and blocks, images, the Additional tab, preview / publish / validation / rollback |
| 6 | Component library: 6.1 Header … 6.31 Interactive Dashboard, each with purpose, visual overview, variations, authoring experience and guide, field specification, annotation map, specification, input and output models, business rules, best practices, troubleshooting and support runbook |
| 7–9 | Taxonomy, metadata (every field), data sheets (every sheet) |
| 10–11 | Error pages; analytics and data layer |
| 12–15 | Publishing, deployment and release; global troubleshooting; operational runbook and AMS handover; appendix (glossary, cheat sheets, component inventory, screenshot register) |
| 16 | Findings and open items register |

### Updating the document

Edit `TCS-CORP-HANDOVER.md`, then regenerate the PDF with pandoc and typst using the Adobe
whitepaper template (the project-management whitepaper tooling):

```bash
pandoc TCS-CORP-HANDOVER.md -o TCS-CORP-HANDOVER.pdf --pdf-engine=typst \
  -V template="adobe-whitepaper.typ" -V mainfont="Adobe Clean" -V fontsize=10pt -V papersize=a4
```

Update the revision history (Document Control) and Part 16 when the code, the content model or
an open item changes.

## Earlier guides (superseded)

The guides of 11 October 2026 describe the site before the List, Filter List (v2), Separator,
Cards, Additional tab and data layer work; the project handover above supersedes them.

| Guide | Audience |
|---|---|
| [AUTHOR-GUIDE.pdf](AUTHOR-GUIDE.pdf) | Content authors and managers |
| [DEVELOPER-GUIDE.pdf](DEVELOPER-GUIDE.pdf) | Developers |
| [ADMIN-GUIDE.pdf](ADMIN-GUIDE.pdf) | Site administrators |
