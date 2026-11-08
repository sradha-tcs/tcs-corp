# fragment

## Existing README changes

- No README existed.

## Discrepancies

- Handover 6.3 ("When not to use", rule 11, Issue 3) and register F-15 say there is no loop protection; code has a recursion guard by the chain of including fragments and the page itself (`loadFragment(path, from)`, D-C-17, R-C-5). Code is current; handover and F-15 need updating (F-15's "full URLs ignored" part is still true).
- Handover 6.3 dependencies: "Placeholders: None"; code uses `fragmentEmpty` for the editor hint (D-C-21). Handover needs correcting.
- Handover 6.3 describes `loadFragment(path)`; the signature is `loadFragment(path, from = null)` (callers pass the including element). Handover needs correcting.

## Variations verified

- Fragment block (fragment.js `decorate`)
- Nested fragments (fragment.js chain guard)
- Shared loader contexts: header, footer, Tabs block, Modal (their `loadFragment` calls)

## Accessibility documented

No markup of its own; content keeps its semantics; H2 start, one H1; possible duplicate ids for repeated fragments.

## Data layer documented

Component `fragment-{n}` (or Anchor ID) with inner blocks as children (parentId); central `cmp:click` for default-content links.

## Personalization

None verified.

## Responsive / performance

No CSS or breakpoints (fragment.css empty); one request per use, sequential for nesting, loaded with its section; prepareMotion for inner animations.

## Placeholders

fragment-empty-editor-desktop.png, fragment-unpublished-desktop.png, fragment-block-desktop.png, fragment-nested-desktop.png, fragment-in-tab-desktop.png, fragment-authoring-step-1.png to fragment-authoring-step-4.png

## Open questions

- Rename the field label "Reference" to "Fragment page" (audit suggestion)?
- Confirm whether the same fragment included twice produces duplicate ids (audit: suspected).
