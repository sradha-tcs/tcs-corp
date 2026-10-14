# Handover screenshots

The figures of the project handover (`../TCS-CORP-HANDOVER.md`, version 1.2). The document
references them as `screenshots/<file>`.

## Generated on 14 October 2026 (630 files, `.jpg`)

| Kind | Files | Made from |
|---|---|---|
| Renderings | 567 (`<component>-desktop-view.jpg`, `-tablet-view.jpg`, `-mobile-view.jpg`, one per variation) | Test pages with sample content on the local preview of the code on `main`, captured per element at 1440, 1024 / 768 and 402 / 375 px with a scripted browser |
| Annotated previews | 31 (`<component>-authoring-view.jpg`) | The same pages in editor mode with letter markers matching each chapter's annotation list — not Universal Editor screenshots |
| Dialog references | 32 (`<component>-properties-panel.jpg`, `ue-page-properties-panel.jpg`) | Drawn from `component-models.json`: every tab and field in dialog order with defaults, options, descriptions and conditions — not Universal Editor screenshots |

The sample content (images, pages, tags, authors) is neutral test content, not the site's
published content.

## Still to capture (403 placeholders, `.png` names in the document)

| Kind | Count | Where |
|---|---|---|
| Universal Editor authoring steps (`*-step-NN-*`) | 324 | Universal Editor, 1440px window |
| AEM consoles and tools (Sites, Tagging, sheets, Sidekick, Admin API, debugger) | 56 | AEM author, browser tools |
| Renderings needing live media or AEM screens (playing video, YouTube / Vimeo / X players, print preview) | 23 | The published site |

Capture rules (15.9 Screenshot Register in the document): PNG, cropped to the component plus some
context, no personal data or credentials. To show a capture in the PDF, replace its placeholder
with a Markdown image (`![Caption](screenshots/<file>){width=100%}`) and regenerate the PDF
(`../README.md`). Replace generated figures with captures of real content when available.
