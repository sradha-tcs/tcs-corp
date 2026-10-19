# Button Block

A call to action with the TCS design system's button views, types, icons and alignment. Shown
as **Button** in Universal Editor; added where sections, Columns Containers and Tabs Containers
take components.

## For authors

| Tab | Field | Values | Default |
|---|---|---|---|
| Content | Link | An AEM page, an asset or a URL | — |
| Content | Text | The label (the accessible name of an icon button) | — |
| Content | Title | Tooltip; empty: the Text | — |
| Style | View | Button, Icon (icon only), Link (text link) | Button |
| Style | Type | Primary, Secondary, Tertiary (Button and Icon views) | Primary |
| Style | Icon | Arrow right, Chevron right, Chevron down, Search (Icon view) | Arrow right |
| Style | Alignment | Left, Center, Right | Left |
| Additional | Anchor ID, Hide block, Animation Type, Motion Speed, Animation Trigger, Padding / Margin | As on blocks | — |

Without a Link nothing is shown on the page; in the editor the block says what to add.

## Why a block

AEM's built-in Button component (`core/franklin/components/button/v1/button`, "Button (basic)")
delivers only its link, Text, Title and Primary / Secondary (as bold / italic): View, Icon,
Alignment and Tertiary never reach the page, so changing them in its dialog changed nothing. A
block delivers every field, so all options work and update as they are changed in the dialog.
Buttons authored before keep working with Primary or Secondary; replace one with a Button to use
the other options. The built-in Button isn't offered in the filters any more (its `button`
model stays: the Conversation Canvas Button items use it).

## How it works

- Key-value rows: `link` (Text and Title collapsed into the link), `buttonView`,
  `buttonVariant` (the Type: a field ending in `Type` would be collapsed into the link),
  `buttonIcon`, `buttonAlignment`; the Additional tab arrives as block classes.
- `button-block.js` `readButtonBlock` reads them (values from `utils/buttons.js`, with the
  model's defaults) and renders one `p.button-wrapper` with the link, decorated by
  `decorateButton` and `setButtonAlignment` (`decorators/button-decorator.js`), as every
  other button.
- Template name "Button Block" (class `button-block`): a `button` block class would match the
  `.button` link selectors.
- Placeholder: `buttonBlockEmpty` (editor only).
