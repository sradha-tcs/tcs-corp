# conversation-canvas

## Existing README changes

- Kept (moved into the new sections): naming note (after the description), Files table and host note (For Developers), Floating journey rules, state table, transitions, Ownership and Mechanics (For Developers), Accessibility bullets (Accessibility), Variation inventory table with the Figma node references (Variations), Authoring table (Authorable Fields notes), Bottom of the window values (Responsive Behavior, Placement), Figma gaps and decisions (For Architects, Known Limitations), Animation and loading (Authorable Fields notes, Performance), Validation (For QA and Support Teams, Extending the Block), Block audit notes (Search page, redaction, button model, panel order: Authorable Fields, Data Layer, For Developers).
- Corrected: "touch targets are 48–59px" → the menu button 59px, navigation items and back 48px, the voice button 2rem (32px) (CSS `.conversation-canvas-audio`); "Mobile (< 900px) … Default / Secondary rows float full width minus 24px gutters" → the floating row is 28.9375rem wide below 1200px and never wider than the window minus 1.5rem gutters (CSS); Primary — Pills "Desktop" → from 900px (CSS media query); Measurement now mentions the 100ms settle of the ResizeObserver (`RESIZE_SETTLE`) and write-on-change; Quick actions Auto clarified as pills in `main`, buttons elsewhere (header too); Owner rule now says "a Primary that floats" (a Primary with Docks only never owns).
- Removed: the Figma file key (an identifier), kept the file name and node ids; duplicate statements merged.
- Added: all required sections, placeholders, the search flow (event → Search page → status), exported functions, rendered DOM contract, data-layer table, QA cases, troubleshooting, known limitations, change history.

## Discrepancies

- Handover 6.30 intro note, 6.30.10 and 6.30.11 rule 10 / Issue 1 say a submit only dispatches `conversation-canvas:search` and nothing else happens. Code (current): the event is cancelable; not handled → the **Search page** (`searchPage`) opens with `?q=`; without it a visually hidden `role="status"` says "Search isn’t available yet." (`searchUnavailable`). Handover needs correcting.
- Handover 6.30.10 note and 6.30.14 Known Limitations say `cmp:search` is pushed for empty queries with the raw term (cut to 100 characters). Code (current): `redactSearchTerm` replaces e-mail addresses and phone numbers, and nothing is pushed for an empty term. Handover needs correcting.
- Handover 6.30.1 Dependencies lists the item model as `models/_button.json` `button`; the current item model is `conversation-canvas-button` (Type as `buttonVariant`). Handover needs correcting.
- Handover 6.30.11 rule 21 ("the first registered qualifying canvas wins"; Primary floats while no footer is in view) is superseded by the journey (6.30.18 and code). Handover 6.30.11 needs correcting.
- Handover 6.30.8 / 6.30.11 / 6.30.14: "Default / Secondary: the query index loads only when the menu is first opened"; `scripts.js` `prefetchData` already starts the query index and taxonomy at the lazy phase on pages with a Canvas in `main`. Handover partially outdated.
- Handover 6.30.14 Known Limitations / F-33: "BG Style has one option and no styles", "Button Alignment is ignored": BG Style now has Dark (Primary only, CSS) and the button item model has no Alignment field. Handover / F-33 partly outdated.
- Handover screenshot texts (Bigger title "at 5rem") predate the 6rem Bigger title on desktop (CSS); the generated screenshot captions still say 5rem.
- Block library `journey-and-actions`: "Primary, docks only (no floating)" sets Primary + `nofloat`: by the code the dock then never floats, so nothing shows; "Dark background" and "Navigation as text links" are set on non-Primary Canvases, where those options have no CSS effect. Library samples may need correcting.

## Variations verified

- Default, Secondary, Primary (sticky) (`classes` select; JS `STYLES`; CSS).
- Primary Navigation style Pills / Text links (`classes_navstyle`; CSS `.text-links`), BG Style Dark (Primary) (`bgStyle`; CSS `.primary.conversation-canvas-bg-dark`).
- Floating journey Floats and docks / Docks only / Decorative (`classes_journey`; JS `nofloat`, `decorative`).
- Quick actions Auto / Pills / Buttons (`classes_actions`; CSS).
- Title Type Default / Bigger / Medium (`titleSize`; CSS), background image, search button icon type, voice input, button item views.
- Placement roles header / section / footer / dock (`canvas-journey.js` `assignRoles`, controller `data-canvas-role`).

## Accessibility documented

- Search landmark with hidden label, disclosure buttons with `aria-expanded` / `aria-controls` / `aria-pressed`, Escape and focus return, focus clearance (`scroll-padding-bottom`), visual-only floating, `inert` hidden dock, reduced motion, touch target sizes.

## Data layer documented

- Component state; `cmp:click` (links, buttons, quick actions, filter tags with `data-cmp-interaction="filter"` / `data-cmp-value`); `cmp:search` with redacted term, not for empty queries; search submit button not a click; no `pushComponentEvent` in the block.

## Personalization

- Standard statement plus the two script hooks (`setConversationCanvasSuggestions`, `setConversationCanvasFilters`), not called anywhere in the repository.

## Responsive / performance

- Breakpoints 600px, 900px (Primary dock), 1200px; modules preloaded on every page (`CHROME_BLOCKS`), query index prefetched at lazy phase, skeletons after 150ms, one controller with passive scroll and settled ResizeObserver, writes on change.

## Placeholders

- conversation-canvas-floating-mobile.png
- conversation-canvas-primary-mobile.png
- conversation-canvas-primary-text-links-desktop.png
- conversation-canvas-primary-dark-desktop.png
- conversation-canvas-menu-open-desktop.png
- conversation-canvas-menu-empty-desktop.png
- conversation-canvas-primary-panel-desktop.png
- conversation-canvas-section-tablet.png
- conversation-canvas-header-canvas-desktop.png
- conversation-canvas-authoring-step-1.png to conversation-canvas-authoring-step-5.png
- conversation-canvas-default-mobile.png
- conversation-canvas-secondary-tablet.png
- conversation-canvas-primary-suggestions-desktop.png

## Open questions

- Which Search page (per locale) the Canvases should point to, and which search / conversational service will handle `conversation-canvas:search`.
- Whether the "Search isn’t available yet." status should be visible to sighted visitors.
- Whether the live footer canvas page still has the test hover text (F-33) — content lead.
- Whether the block library samples with Primary + Docks only, and Dark / Text links on non-Primary Canvases, are intended.
- Privacy review of search term tracking (handover: data protection officer).
- Menu order and `hide-in-nav` handling (F-78, F-33) — product owner.
- Product owner and version of the component (Not recorded).
