# Handover Documentation

Handover documentation for the TCS Corporate website (AEM Edge Delivery Services with Universal
Editor). The documents aren't served on the website (`docs/` is listed in `.hlxignore`).

## Project handover (current)

| File | Description |
|---|---|
| [TCS-CORP-HANDOVER.pdf](TCS-CORP-HANDOVER.pdf) | The official project handover, version 2.17, 18 October 2026 (3,415 pages; one table of contents with 1,231 linked entries, one page numbering, PDF bookmarks down to the variations). It serves as handover document, technical architecture and solution design document, authoring guide, training workbook, AMS handover guide, support runbook, operations guide, new joiner onboarding guide and component specification guide. Every screenshot (596) has callout letters on its fields and is followed by Screenshot Details, a **Field Entry Table** (Callout, Field Name, Example Value, Mandatory, Business Purpose, What Author Should Enter, Validation Rules), Expected Page Output, Business Rules, Common Authoring Mistakes and Troubleshooting; every variation with a screenshot has a step-by-step walkthrough (461); every component (31) has its variations, field specification, specification, input / output models, business rules, troubleshooting, support runbook, common authoring mistakes, author quick reference guide and an execution example |
| [TCS-CORP-HANDOVER.md](TCS-CORP-HANDOVER.md) | The editable source of the PDF (Markdown) |
| [screenshots/](screenshots/README.md) | The 628 figures of the document (596 screenshots, 32 dialog references) |
| [../proposals/](../proposals/README.md) | Design proposals that follow up on the handover (e.g. the Cards and Card refactoring) |

| Part | Contents |
|---|---|
| Document Control | Document information, revision history, approval, about this document, audience guide, conventions, executive summary |
| 1 | Project overview: objectives, goals, stakeholders, benefits, scope, non-functional requirements, assumptions, dependencies, success criteria, contact and ownership matrix |
| 2 | Solution architecture: high-level and context diagrams, component architecture, landscape, deployment, environments, security, integrations, system catalogue, architecture component considerations (2.10: purpose, responsibilities, dependencies, data flow, failure handling, security, scalability, performance of each) and data flow architecture (2.11) |
| 3 | Site structure: hierarchy, 13 locales, page model, folders, navigation, content organisation, error pages, redirects, the temporary language master review (3.9) |
| 4 | Content architecture: templates, content types, metadata and taxonomy models, placeholders (all keys), references, sheets, shared content, localisation |
| 5 | Authoring fundamentals: access, Universal Editor, pages, sections and blocks, images, the Additional tab, preview / publish / validation / rollback |
| 6 | Component library: 6.0 Component Inventory (with the brief's component names mapped), 6.1 Header … 6.31 Interactive Dashboard — each with purpose (business problem, supported taxonomy), visual overview, every variation with its screenshot and authoring block, authoring experience, authoring guide with a walkthrough per variation, field specification, annotation map, specification, input and output models (Target personalisation output), business rules, best practices, troubleshooting, support runbook, common authoring mistakes, author quick reference guide, component execution example |
| 7–9 | Taxonomy, metadata (every field, with the field usage matrix 8.4: search, analytics and personalisation usage), data sheets (every sheet) |
| 10–11 | Error pages; analytics and data layer |
| 12–15 | Publishing, deployment and release; global troubleshooting (each issue with its escalation process); operational runbook and AMS handover; appendix (glossary, cheat sheets, component inventory, screenshot register) |
| 16 | Findings and open items register (F-01 … F-66, F-70 … F-93) |
| 17 | Operations guide: daily, weekly, monthly, release, validation and governance activities; calendar and RACI |
| 18 | New joiner training guide: learning paths per role, overviews, 27 hands-on exercises, 50 knowledge validation questions, training completion record |

### Updating the document

Edit `TCS-CORP-HANDOVER.md`, then regenerate the PDF with pandoc and typst using the Adobe
whitepaper template (the project-management whitepaper tooling). The whole document needs more
memory than typst gets in a 4 GB container, so the PDF is built in 21 volumes of up to about
10,500 Markdown lines each and merged into one document with a single cover, table of contents
and page numbering:

| Volume | Contents |
|---|---|
| 1 | Document control, Parts 1–5, 6.0 Component Inventory, 6.1–6.3 |
| 2 | Components 6.4–6.9 |
| 3 | Component 6.10 Hero |
| 4 | Component 6.11 Teaser, 6.11.1–6.11.4 |
| 5 | Component 6.11 Teaser, 6.11.5–6.11.17 |
| 6 | Components 6.12–6.14 |
| 7 | Component 6.15 Cards and Card, 6.15.1–6.15.4 |
| 8 | Component 6.15 Cards and Card, 6.15.5–6.15.17 |
| 9 | Component 6.16 List, 6.16.1–6.16.4 |
| 10 | Component 6.16 List, 6.16.5–6.16.17 |
| 11 | Component 6.17 Filter List |
| 12 | Components 6.18–6.19 |
| 13 | Components 6.20–6.22 |
| 14 | Components 6.23–6.24 |
| 15 | Component 6.25 Table |
| 16 | Component 6.26 Separator |
| 17 | Components 6.27–6.28 |
| 18 | Component 6.29 Form Variations |
| 19 | Components 6.30–6.31 |
| 20 | Parts 7–12 |
| 21 | Parts 13–18 |

For each volume (a slice of the Markdown starting at the headings above), with the screenshots
scaled to 900 px wide first (`convert -resize '900x>' -quality 70`), the template call is set to
the project's volume template (`handover-volume.typ`, a copy of the whitepaper template with the
options `cover: false`, `toc: false`, `first-page` and `total-pages`, which also lists the
headings with their pages as `<handover-headings>` metadata):

```bash
pandoc TCS-CORP-HANDOVER-Vol-1.md -f markdown-citations -t typst --standalone \
  -V template="adobe-whitepaper.typ" -V mainfont="Adobe Clean" -V fontsize=10pt -V papersize=a4 \
  -o TCS-CORP-HANDOVER-Vol-1.typ
typst compile -j 1 TCS-CORP-HANDOVER-Vol-1.typ TCS-CORP-HANDOVER-Vol-1.pdf
```

Then, in this order:

1. Compile every volume with `first-page: 1` and read its page count and its headings
   (`typst query <volume>.typ "<handover-headings>" --field value --one`).
2. Generate the front matter (cover and the table of contents of levels 1–3) with each heading's
   page in the whole document (front matter pages + the pages of the volumes before + the
   heading's page in its volume) and compile it.
3. Compile every volume again with its `first-page` (the page after the front matter and the
   volumes before it) and `total-pages`, so the footers read "Page n of total".
4. Merge the front matter and the volumes (e.g. with `pdf-lib`), add a link on each contents
   entry to its page and the PDF bookmarks (levels 1–4) from the headings.
`-f markdown-citations` keeps addresses such as `name@example.com` from being read as citations.
In 2.17 each volume needed at most 2.5 GB with `-j 1`. The memory watchdog (`compile-pdf.sh`,
`typst-watch.sh`) stops typst when the container's anonymous memory (`anon` in
`/sys/fs/cgroup/memory.stat`) passes 3.4 GB; it doesn't count the file cache, which the system
frees on demand. If a volume grows past the limit, split it at a chapter heading (`VOLUMES` in
`build-volumes.mjs`). The scripts are in the git-ignored `.handover-work/` folder
(`build-volumes.mjs`, `build-index.mjs`, `compile-pdf.sh`, `typst-watch.sh`).

Update the revision history (Document Control) and Part 16 when the code, the content model or
an open item changes. When a screenshot's example changes, update its Field Entry Table, its
walkthrough and the callout letters together (they describe the same values).

## Earlier guides (superseded)

The guides of 11 October 2026 describe the site before the List, Filter List (v2), Separator,
Cards, Additional tab and data layer work; the project handover above supersedes them.

| Guide | Audience |
|---|---|
| [AUTHOR-GUIDE.pdf](AUTHOR-GUIDE.pdf) | Content authors and managers |
| [DEVELOPER-GUIDE.pdf](DEVELOPER-GUIDE.pdf) | Developers |
| [ADMIN-GUIDE.pdf](ADMIN-GUIDE.pdf) | Site administrators |
