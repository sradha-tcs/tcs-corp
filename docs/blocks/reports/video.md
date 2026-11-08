# video
## Existing README changes
- No README existed.

## Discrepancies
- Handover 6.28 intro and the properties-panel screenshot description: 6 tabs (Video, Playback, Captions, Display, Privacy, Additional), 38 entries / 32 fields. Code (`_video.json`): 3 tabs (Video, Playback, Additional), 35 fields (Captions and Privacy fields on the Video tab, Display fields on the Playback tab; handover 2.8 records the regrouping). Code is current; 6.28 text and the `video.js` header comment ("Captions", "Display", "Privacy" groups) need correcting.
- Handover 6.28.12 / 6.28.15: caption colour #999, about 2.8:1, below AA (F-27, open). Code: `--color-text-secondary` is slate-700 (6.9:1, `styles/styles.css` comment). Code is current; handover needs correcting.
- Handover 6.28.13 Issue 8 / Known Limitations: "Vimeo id must be the first path segment", "Vimeo URLs must be `vimeo.com/{id}`". Code (`utils/media.js` `vimeoEmbedUrl`, tested): numeric segment anywhere (player, channel URLs) and unlisted hashes. Code is current.
- Handover dependency table lists `utils/media.js` `videoType` as used by the block; `video.js` imports `isYoutube`, `isVimeo`, `youtubeId` only (`videoType` is used by the media decorator). Minor.
- Handover Known Limitations don't mention that the poster rows of the former Placeholder Image group are never delivered (re-audit R-D-7: content migration needed); the code still tries to read them. Documented as a limitation.
- Handover audit D-D-13 (programmatic play / pause measured as visitor actions) is "Deferred"; code now flags Pause When Out of View with `data-cmp-auto`, but the autoplay start of a file that isn't background-like is still pushed as `cmp:media` play. Documented.

## Variations verified
- Play button on the poster (incl. no poster), Play in a Pop-up, Autoplay when in view (with / without controls + toggle), Background video: `video.js` `PLAYBACKS`, `decorate`, `_video.json` `playback`, `openInModal` condition.
- Sources file / YouTube / Vimeo, Privacy-enhanced Mode: `buildPlayer`, `decorators/media-decorator.js`, `utils/media.js`.
- Display (Aspect Ratio 5 values, Size 4, Alignment 3, Rounded Corners): `ASPECT_RATIOS`, `SIZES`, `ALIGNMENTS`, `video.css`.
- Reduced motion (automatic): `prefersReducedMotion` in `decorate`.
- Earlier models (one row per field, first model with `autoplay` class): `readFields`, `readConfig`.

## Accessibility documented
- Named player and Play button (Title / placeholders), focus moves into the player, pop-up dialog named and focus return, WCAG 2.2.2 pause / stop toggle, background `aria-hidden` + `tabindex=-1`, no autoplay for reduced motion, captions track, transcript link, caption contrast.

## Data layer documented
- Component `tcs-corp/components/video`; `cmp:click` (Play: `button`; toggle: `data-cmp-interaction="playback"`; transcript link), `cmp:media` for files (background-like and `data-cmp-auto` excluded), `cmp:show` / `cmp:hide` of the pop-up's `modal-N`; iframes untracked.

## Personalization
- None verified (standard statement).

## Responsive / performance
- No media queries in `video.css` (fluid, capped by Size); caption text follows `--body-font-size-s` (900px token change in styles.css). Players load on Play or on visibility (`onVisible`), modal JS imported on demand, aspect ratio reserved, poster may be eager LCP in the first section.

## Placeholders
- video-authoring-universal-editor-desktop.png, video-play-button-playing-desktop.png, video-youtube-tablet.png, video-popup-mobile.png, video-toggle-focus-desktop.png, video-captions-desktop.png, video-loading-desktop.png, video-empty-editor-desktop.png, video-authoring-step-1.png … video-authoring-step-4.png, video-play-button-mobile.png, video-popup-closed-focus-desktop.png, video-autoplay-with-controls-desktop.png, video-background-mobile.png, video-vimeo-desktop.png

## Open questions
- Consent requirements for YouTube / Vimeo players (owner privacy / legal per handover).
- Should the automatic start of autoplay files be excluded from `cmp:media` (measurement plan, D-D-13)?
- Production content still using the former Placeholder Image poster fields: migration plan and owner.
- Maximum delivered asset size for video files (handover "To be confirmed").
