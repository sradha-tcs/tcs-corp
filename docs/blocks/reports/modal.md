# modal

## Existing README changes

- No README existed.

## Discrepancies

- Handover 6.23.11 rule 1: "Modal block without a link: nothing is changed"; code empties the block and shows an editor hint in edit mode (`modalEmpty`, D-C-21). Code is current; handover needs correcting.
- Handover 6.23.10 analytics and Issue 7: the dialog id is a new `modal-{n}` at every opening; code uses a stable id (`{opener id}-dialog`, or `modal-{path}` for auto-links, D-C-10); only Video pop-ups still get `modal-{n}`. Handover needs correcting.
- Handover doesn't mention the double-click guard (D-C-9) or the `modalEmpty` placeholder.
- Block library: `block-library/modal/auto-linked-modal` links to `/content/tcs-corp/language-master/en/block-library/modal/fragments/privacy-notice`, whose path contains `/modal/fragments/`, not `/modals/`; `scripts.js` `autolinkModals` only intercepts paths containing `/modals/`, so by the code this sample would navigate, while handover screenshot `modal-auto-link.jpg` shows a dialog. Needs a check on aem.page (sample or documentation to correct).

## Variations verified

- Modal block (button opener) (modal.js `decorate`)
- Auto-linked `/modals/` link (scripts.js `autolinkModals`)
- Component dialog via `createModal` (blocks/video)
- Long content (modal.css scroll, sticky close)

## Accessibility documented

Native modal dialog, name from the first heading or "Dialog", aria-haspopup opener button, close button / Escape / backdrop, explicit focus return, page scroll lock, visible-area tracking in frames.

## Data layer documented

Opener `cmp:click`; `cmp:show` pushed by modal.js and `cmp:hide` by the central close listener with `interaction: dialog` and a stable dialog id; close button and inner link clicks central.

## Personalization

None verified.

## Responsive / performance

Breakpoint 900px (modal.css); nothing loaded until opened, fragment fetched at each opening, IntersectionObserver and wheel listener only in frames while open.

## Placeholders

modal-empty-editor-desktop.png, modal-focus-desktop.png, modal-editor-preview-desktop.png, modal-block-open-desktop.png, modal-auto-link-desktop.png, modal-video-popup-desktop.png, modal-long-content-mobile.png, modal-authoring-step-1.png to modal-authoring-step-5.png

## Open questions

- The auto-linked-modal library sample path (see Discrepancies): should the sample page move to a `modals` folder?
- Should the opener get a style option (always primary today, audit)?
- F-51: limit the Video pop-up player to the dialog width (open, P2).
- Should auto-links check the link's origin (an external URL with `/modals/` in its path opens a same-site dialog)?
