# Handover Documentation

Handover documentation for the TCS Corporate website (AEM Edge Delivery Services with Universal
Editor). The documents aren't served on the website (`docs/` is listed in `.hlxignore`).

## Project handover (current)

| File | Description |
|---|---|
| [TCS-CORP-HANDOVER.pdf](TCS-CORP-HANDOVER.pdf) | The official project handover, version 1.4, 14 October 2026 (1,598 pages in six volumes, one file; findings F-43 to F-48 fixed): 596 screenshots of every component and variation, each followed by an **Authoring steps** table (which component to add and which field gets which value) to reproduce it in Universal Editor, steps tables for the editor and console steps, 32 dialog references; also project overview, solution architecture, site structure, content architecture, authoring fundamentals, every component (31) with each variation, field specifications, business rules, troubleshooting and support runbooks, taxonomy, metadata, data sheets, error pages, analytics data layer, publishing and release, global troubleshooting, AMS runbook, appendix, and a register of findings and open items (Part 16) |
| [TCS-CORP-HANDOVER.md](TCS-CORP-HANDOVER.md) | The editable source of the PDF (Markdown) |
| [screenshots/](screenshots/README.md) | The 628 figures of the document (596 screenshots, 32 dialog references) |
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
whitepaper template (the project-management whitepaper tooling). With its 628 figures the whole
document needs more memory than typst gets in a 4 GB container, so the PDF (1,598 pages) is
built in six volumes, merged into one file; each volume keeps its own cover and contents:

| Volume | Contents |
|---|---|
| 1 | Document control, Parts 1–5, components 6.1–6.9 |
| 2 | Components 6.10–6.14 |
| 3 | Components 6.15–6.19 |
| 4 | Components 6.20–6.25 |
| 5 | Components 6.26–6.31 |
| 6 | Parts 7–16 |

For each volume (a slice of the Markdown starting at the headings above, with its own front
matter), with the screenshots scaled to 900 px wide first (`convert -resize '900x>' -quality 70`):

```bash
pandoc TCS-CORP-HANDOVER-Vol-1.md -f markdown-citations -t typst --standalone \
  -V template="adobe-whitepaper.typ" -V mainfont="Adobe Clean" -V fontsize=10pt -V papersize=a4 \
  -o TCS-CORP-HANDOVER-Vol-1.typ
typst compile -j 1 TCS-CORP-HANDOVER-Vol-1.typ TCS-CORP-HANDOVER-Vol-1.pdf
```

Then merge the six PDFs in order (e.g. with `pdf-lib`, `qpdf --empty --pages … --` or
`pdfunite`). `-f markdown-citations` keeps addresses such as `name@example.com` from being read
as citations. A smaller document can still be built in one step with
`pandoc TCS-CORP-HANDOVER.md -o TCS-CORP-HANDOVER.pdf --pdf-engine=typst` and the same `-V`
options.

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
