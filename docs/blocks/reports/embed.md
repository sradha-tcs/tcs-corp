# embed
## Existing README changes
- No README existed.

## Discrepancies
- Handover 6.27 (When Not To Use, Business Rule 8, Output example, Known Limitations): the Embed "always uses `www.youtube.com`", "no privacy host", Vimeo without `dnt`. Code: `createYoutubeFrame(..., { privacy: true })` (youtube-nocookie.com) and Vimeo `dnt: '1'` (audit D-D-10 corrected). Code is current; handover needs correcting.
- Handover Business Rule 9 / Known Limitations / Issue 3: Vimeo only `vimeo.com/{first path segment}`. Code: numeric segment anywhere plus unlisted hashes (`vimeoEmbedUrl`, R-D-5, unit tested). Code is current.
- Handover 6.27.7 / 6.27.12: the Play label is the placeholder `play` ("Play"), generic. Code: "Play video: {alt}" (placeholder `playVideoTitle`) when the placeholder image has alt text, else "Play" (D-D-8). Handover dependency/sheet rows list only `play` and `contentFrom`; `playVideoTitle` is also used.
- Handover Business Rules 1–2 / Issue 1: the URI must be delivered as a link (`<a>`). Code also accepts a bare `http(s)://` URL in the block text (D-D-9). Code is current.
- Handover output example iframe `src` lacks `enablejsapi=1`, which `youtubeEmbedUrl` now always adds (Tabs pause commands, R-C-8).
- Handover Rule 2 "No link → nothing renders": true for content, but `embed.css` still reserves a 16:9 empty area on an Embed with neither placeholder nor loaded embed. Documented as a limitation.

## Variations verified
- YouTube, Vimeo, X (Twitter) post, generic iframe: `EMBEDS` and `createFrame` fallback in `embed.js`.
- Placeholder image with Play (click-to-load): `decorate` placeholder branch, `embed.css`.

## Accessibility documented
- Iframe title "Content from {host}", Play `button` named from the alt text, focus into the player after Play, click-to-load (no autoplay without Play), embeds paused in hidden tabs, heading before the block recommended.

## Data layer documented
- Component `tcs-corp/components/embed`; Play `cmp:click` with `data-cmp-interaction="play"`; X fallback link `cmp:click` (`exit`); frame interactions untracked.

## Personalization
- None verified (standard statement).

## Responsive / performance
- No media queries (max 56.25rem, fluid). No provider request before visibility / Play; lazy iframes; `widgets.js` only for X posts; 16:9 reservation.

## Placeholders
- embed-authoring-universal-editor-desktop.png, embed-youtube-playing-desktop.png, embed-x-post-desktop.png, embed-x-post-fallback-mobile.png, embed-play-focus-desktop.png, embed-loading-tablet.png, embed-authoring-step-1.png … embed-authoring-step-3.png, embed-youtube-mobile.png, embed-vimeo-desktop.png

## Open questions
- Consent management for providers and the X widget (owner privacy / legal).
- Should generic iframes get a host allow-list or a `sandbox` attribute (governance)?
- `muted=1` is passed to YouTube too (the Video block uses `mute` for YouTube): confirm intended behaviour after Play.
- The library sample alt text "Video: how enterprises scale AI with confidence" yields "Play video: Video: …"; consider a descriptive alt text without the prefix.
