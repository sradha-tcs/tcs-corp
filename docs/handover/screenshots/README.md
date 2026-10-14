# Handover screenshots

The figures of the project handover (`../TCS-CORP-HANDOVER.md`, version 1.4), referenced as
`screenshots/<file>.jpg`.

| Kind | Files | Made from |
|---|---|---|
| Renderings | 565 (`<component>-desktop-view.jpg`, `-tablet-view.jpg`, `-mobile-view.jpg`, one per variation) | One authoring spec per screenshot (component, dialog values, items, section and page properties), rendered into a test page by the xwalk rules and captured from the local preview at 1440, 1024 / 768 and 402 / 375 px |
| Annotated previews | 31 (`<component>-authoring-view.jpg`) | The same, in editor mode, with letter markers matching each chapter's annotation list — not Universal Editor screenshots |
| Dialog references | 32 (`<component>-properties-panel.jpg`, `ue-page-properties-panel.jpg`) | Drawn from `component-models.json` — not Universal Editor screenshots |

In the document every rendering and annotated preview is followed by **Authoring steps**: the
table of the same spec (Step, Where, Field, Value), so the screenshot can be reproduced exactly
in Universal Editor. Editor steps, AEM consoles and live media (playing videos, third-party
players) are given as **Steps** tables instead of screenshots.

The sample content (neutral images, sample pages, tags, authors) isn't the site's published
content. To use captures of real content, replace a figure's image file with the same name and
regenerate the PDF (`../README.md`).
