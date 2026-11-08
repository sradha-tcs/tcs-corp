# button-block
## Existing README changes
- Kept: the description (Button in Universal Editor; added where sections, Columns Containers and Tabs Containers take components), "Without a Link nothing is shown; in the editor the block says what to add", the whole "Why a block" rationale (moved to Overview), the "How it works" facts (key-value rows, `buttonVariant` instead of a `*Type` field, `readButtonBlock`, `decorateButton` / `setButtonAlignment`, template name "Button Block" vs the `.button` selectors, placeholder `buttonBlockEmpty`) moved to Authorable Fields and For Developers.
- Removed: the hand-written field table (now the generated fields section).
- Corrected: "Title: Tooltip; empty: the Text" — the Button and Link views have a `title` only when Title is authored; only the Icon view sets the tooltip to its accessible name (`applyIcon`).
- Corrected: "its `button` model stays: the Conversation Canvas Button items use it" — the built-in Button's definition now uses model `button-basic`; Canvas Button items have their own `conversation-canvas-button` model; the former `button` model stays for components authored before (`models/_button.json`, AGENTS.md "Button").
- Added: the fact that the content buttons decorator decorates the link first (`decorateMain`), which is why `decorate` removes its classes; every other required section.
- H1 changed from "Button Block" to the display name "Button" (technical name kept in the attribute table).

## Discrepancies
- Handover 6.9 documents the built-in Button component (model `button`, resource `core/franklin/components/button/v1/button`, "Default content", label "Views", Type stored as `linkType`, "Additional tab: Not applicable", clicks attributed to the page). The authorable Button is the Button Block: label "View", Type stored as `buttonVariant`, Additional tab present, clicks attributed to the block (`button-block-N`). Only the 2.26 note and its table in 6.9.6 describe the block. Code is current; 6.9 (Component Specification, Input / Output Model, Analytics, Rules, Known Limitations "no Additional tab", Operational Procedures "add an option to models/_button.json") needs rewriting for the Button Block.
- Handover 6.9.11 Rule 9: "Every decorated link gets title = its text when it has none". Code: no automatic title (audit D-D-28 "redundant title" corrected); only icon buttons get one.
- Handover 6.9.6 Icon default "(empty)"; model default and code fallback `arrow-right`.

## Variations verified
- Primary, Secondary, Tertiary (Button view), Icon view (3 types × 4 icons), Link view, Alignment Left / Center / Right: `_button-block.json`, `utils/buttons.js`, `decorators/button-decorator.js`, `styles/styles.css`.

## Accessibility documented
- Real link, Text as accessible name (icon fallback chain), global focus outline, dark-section inversion, clipped long labels, editor-only empty hint.

## Data layer documented
- Component `tcs-corp/components/button-block`; `cmp:click` with `interaction` `link`, `xdm:linkType` other / exit / download; no block attributes.

## Personalization
- None verified (standard statement).

## Responsive / performance
- No media queries (block or global button styles); no requests except the editor placeholder; icons as cached CSS masks.

## Placeholders
- button-block-authoring-universal-editor-desktop.png, button-block-empty-editor-desktop.png, button-block-focus-desktop.png, button-block-dark-section-desktop.png, button-block-authoring-step-1.png … button-block-authoring-step-4.png, button-block-icon-types-mobile.png

## Open questions
- External-link policy / new-tab option (owner product owner per handover).
- Migration of production content still using built-in Buttons (outside the library).
