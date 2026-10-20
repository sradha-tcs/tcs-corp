# Block audit, group D: Form Variations (+6 items), Embed, Video, Table (+Row, table-N-columns), Separator, Conversation Canvas (+Button), Footer (+Footer Link), TCS Header / header, default content (Text, Title, Image, Button (basic)), Button Block

Reviewer: group D. Repository read-only. Evidence scripts: `/tmp/audit/d/*.mjs|py` (models dump, Playwright dumps on `http://localhost:3000/drafts/en/block-library/...`).
Legend: **verified** = reproduced at runtime on the local preview or proven by reading the code path end to end (incl. the content package XML in `.home-work/bl/package`); **suspected** = plausible from code, not reproduced (needs AEM publish).

The Additional tab (`classes_anchor`, `classes_hideblock`, `classes_animation*`, `classes_padding*`, `classes_margin*`) is identical to the other groups (see review-A 0.1); it is listed per block only when it differs (e.g. `classes_bganimation`) or is missing.

---

## 1. Form Variations (`form-variations`, class `form-variations`) + items

### A. Overview
- Purpose: an authored contact / lead form built from item children: Text Input Field (`field-text`, class `text-input-field`), Dropdown / Select Field (`field-select`), Textarea Field (`field-textarea`), Consent Checkbox Field (`field-checkbox`), Contact Card Output (`contact-card`, a region-dependent contact shown when a dropdown value matches) and Submit Button (`field-submit`).
- Files: `blocks/form-variations/form-variations.js` (442 lines), `.css`, `_form-variations.json`; shared `decorators/button-decorator.js`, `content-decorator.js` (`fromCell`), `heading-decorator.js` (`buildHeading`), `utils/ids.js`, `utils/placeholders.js`.
- Not key-value: block rows = Form Title, Form Description (positional), then item rows; each item row is expected to start with a "type cell" (the read-only `classes` text field) — `readItem` l.39-46.
- Usage (content package): 19 blocks on 5 pages; items: field-submit 12, contact-card 4, field-text / select / textarea / checkbox **0 counted** — the inventory matches items by their JCR `name`, which the item field `name` overwrites (see D-D-2), so they are in fact present but miscounted.
- **No submission endpoint**: a valid submit only dispatches `form-variations:submit` (l.431); no listener exists anywhere in the repository (`grep form-variations:submit` = only the dispatch). See D-D-3.

### C. Dialog validation

Block model `form-variations`:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Form Title / Heading (`formHeading`) | text | row 1 -> `buildHeading(titleCell, null, 'form-variations-title', 'h2')` l.396; id -> form `aria-labelledby` l.401-404 | heading level fixed h2 (no `formHeadingType`); acceptable | Retain |
| Form Description (`formDescription`) | richtext, '' | row 2 -> `fromCell(..., 'div', 'form-variations-description')` l.398-400 | not linked to the form (`aria-describedby`); minor | Retain |
| Theme (`classes`) | Default '' / Dark `dark` | block class; CSS `.form-variations.dark` l.16-35, 101, 210, 239-258, 282-296 | none | Retain |
| Background animation (`classes_bganimation`) | None + 6 | `decorators/motion-decorator.js:57` (`BACKGROUNDS['form-variations'] = {}`, the block's own background) | Default theme has a transparent/white background: background animation only visible with Dark (not stated) | Retain (describe "visible with the Dark theme") |
| Additional tab (13 std fields) | std | std | none | Retain |

Item models (positional cells after the type cell, l.155, 176, 207, 236, 274, 305):

| Item / Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| all items: Field type (`classes`) | text, readOnly, template value `field-text`…`field-submit` | type cell read by `readItem` l.41-42 (published) or `data-aue-model` l.43-44 (editor) | **A `classes` field is never a cell (it is a class field): on the published page the item rows have no type cell, every row is taken as a property row and the form renders EMPTY** (D-D-1, verified on the AEM-faithful render) | Replace (type from shape / a non-class field) |
| Text: Field Name / ID (`name`) | text, required | cell 1 -> input `name`, `id` (`nextId(name)`), `autocomplete` (l.156-169), half width when it contains "name" (l.160) | **`name` is the JCR property AEM uses for the component's template name; the authored value overwrites it** (package: `name="email" model="field-text"`; D-D-2). "contains name -> half width" is a hidden rule (e.g. `companyName`, `username` go half width) | Rename `fieldName` (read `name` as fallback) |
| Text: Field Label (`label`) | text, required | cell 2 -> `<label for>` text l.171 | none | Retain |
| Text: Input Type (`inputKind`) | Text / Email / Tel, `text` (template = model = code l.165) | cell 3 -> `input.type`; email/tel -> autocomplete l.94-95 | no Number / URL / Date; no pattern for Tel (any value valid) | Retain |
| Text: Mandatory Field (`required`) | boolean false | cell 4 -> `required` + `data-required` l.157, 170 | none | Retain |
| Text: Show only if dropdown value equals (`dependsOn`) | text | cell 5 -> `data-depends-on` l.162; `updateVisibility` l.330-348 (case-insensitive, any dropdown) | free text must equal an option text exactly (typo = field never shows); no link to a specific dropdown | Retain (describe "type the option text exactly") |
| Select: Dropdown Name / ID (`name`) | text, required | cell 1 l.177-185 | D-D-2 | Rename `fieldName` |
| Select: Dropdown Label (`label`) | text, required | cell 2 l.202 | none | Retain |
| Select: Mandatory (`required`) | boolean false | cell 3 l.178, 186 | none | Retain |
| Select: Options (`options`) | text, comma separated | cell 4 -> `<option>` value = text l.194-199 | an option containing a comma cannot be authored; no value/label split | Retain |
| Select: depends (`dependsOn`) | text | cell 5 l.181 | as above | Retain |
| Textarea: Field Name / ID (`name`) | text, required | cell 1 l.208 | D-D-2 | Rename |
| Textarea: Field Label (`label`) | text, required | cell 2 l.231 | none | Retain |
| Textarea: Max Character Limit (`maxLength`) | number 1500 (template 1500 = model = `DEFAULT_MAX_LENGTH` l.28) | cell 3 -> `maxLength`, counter l.211-229 | counter text "0/1500" has no words for screen readers (D-D-7) | Retain |
| Textarea: Mandatory (`required`) | boolean false | cell 4 | none | Retain |
| Textarea: depends (`dependsOn`) | text | cell 5 | as above | Retain |
| Checkbox: Checkbox Name / ID (`name`) | text, required | cell 1 l.237; submitted value `true` l.247 | D-D-2 | Rename |
| Checkbox: Consent Text / Disclaimer (`label`) | richtext, required | cell 2 moved into the `<label>` (links kept) l.254-260 | rich text paragraphs inside a `<label>` (inline only via CSS l.186) | Retain |
| Checkbox: Mandatory (`required`) | boolean **false** | cell 3 | a consent checkbox defaults to optional; for a GDPR consent the safer default is required | Correct default to true for new items |
| Checkbox: depends (`dependsOn`) | text | cell 4 | none | Retain |
| Contact Card: Show when dropdown value equals (`region`) | text, required | cell 1 -> `data-depends-on` l.275 | label OK; field name `region` is technical but harmless | Retain |
| Contact Card: Contact Name (`contactName`) | text, required | cell 2 -> `<p class=form-variations-contact-name>` l.277-281 | rendered as `<p>` (no heading) – fine | Retain |
| Contact Card: Emails (`emails`) | text, comma separated | cell 3 -> `mailto:` links l.284 | no validation | Retain |
| Contact Card: Phones (`phones`) | text, comma separated | cell 4 -> `tel:` links (digits and + kept) l.285 | none | Retain |
| Submit: Button Label (`label`) | text, `Send` (template = model; code fallback placeholder `send`) | cell 1 l.309 | none | Retain |
| Submit: depends (`dependsOn`) | text | cell 2 l.306 | a conditional submit means a form without a submit button until a value is chosen (Enter still submits) | Retain |

### D. Variations

| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Default theme | light form | renders on the hand-written block library page (`form-variations.plain.html` has explicit type cells); **empty on `field-types.plain.html`** (rendered from the model like AEM: no type cells) — Playwright: `<form ...></form>` with 0 controls | Correct (D-D-1) |
| Dark (`dark`) | dark panel | CSS `.form-variations.dark` (inverted primary button l.239-249) | Retain |
| Conditional fields / contact cards | region-specific contacts | verified: select "India" shows the India card; hidden groups disabled and not required (l.341-344) | Retain; announce (D-D-6) |
| Half / full width | layout | from the field name containing "name" (l.160), not authorable | Document or add a Width option |

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Labels | every control has a programmatic label | `<label for=id>` for text/select/textarea l.63-79; checkbox label wraps the consent text l.250-269 (verified ids `form-variations-1-firstname` etc.) | none | Pass |
| Form name | form named by its title | `aria-labelledby` = title id l.401-404 | none | Pass |
| Required fields | `required` + visible marker + explanation | `required` attribute; `*` `aria-hidden` l.71-77; note "* Required fields" l.415-420 | none | Pass |
| Instructions | format hints | none for email/phone formats | optional: description field per item | Minor |
| Error identification (3.3.1) | text error next to field, linked | verified: empty submit -> `p#…-error` in the field group, `aria-invalid=true`, `aria-describedby=…-error` on all 5 required fields; focus to first invalid (`form-variations-1-region`) | none | Pass |
| Error suggestion (3.3.3) | specific messages | required / email / format / too long l.126-133 (placeholders) | none | Pass |
| Status message (4.1.3) | success announced | `p[role=status]` filled then focused l.435-437 (verified "Thank you, your details were sent.") | message is false (nothing is sent, D-D-3) | Fail (content) |
| Conditional content | change of context announced | contact card / fields appear silently on select change (`hidden` toggled l.340) | add `aria-live="polite"` on the contact card container or announce via the status region | Minor (D-D-6) |
| Character counter | understandable | `aria-describedby` -> "0/1500" | placeholder "{count} of {max} characters" | Minor (D-D-7) |
| Autocomplete (1.3.5) | input purpose | `autocompleteOf` l.86-98 (given-name, family-name, email, tel, organization…) verified | none | Pass |
| Focus visible | visible ring | `.form-variations-control:focus-visible` l.111-115; checkbox UA ring; button global | none | Pass |
| Keyboard | Tab / Space / Enter | native controls | none | Pass |
| Duplicate ids | unique | `createIdFactory(uniqueId('form-variations'))` l.366 | none | Pass |
| Contact links | distinguishable | `text-decoration: none` in a list (CSS l.222-226) | acceptable in a list | Pass |
| Reduced motion | honoured | motion decorator | none | Pass |

### F. Data layer
- Block entry via `trackBlocks` (`data-cmp-id` = anchor id or `form-variations-n`); `dc:title` = form title.
- Submit: `onSubmit` (`data-layer-decorator.js:145-160`, capture phase) pushes `cmp:submit` with the **field names only** (`fields: [region, firstName, …]`), no values — verified at runtime; personal data is not sent to the data layer. `onChange` (l.162-170) only reports controls with `data-cmp-interaction` (none in this block), so dropdown values are not captured either. Good data minimisation.
- **Defect: `cmp:submit` is pushed for every submit attempt, including invalid ones** (the decorator runs in capture before the block's `validate`; `form.noValidate = true` l.371 so the submit event always fires). Verified: an empty submit pushed `cmp:click` + `cmp:submit`. (D-D-4)
- `dc:title` of `cmp:submit` = `form.getAttribute('aria-label') || form.id || 'form-variations'`: the form has `aria-labelledby`, so the title is always the block name (minor; part of D-D-4 fix).
- `cmp:click` on the Send button (`dc:title: Send`) in addition to `cmp:submit`: two events per submit, expected by design.
- Contact card `mailto:` / `tel:` clicks push `xdm:linkURL: mailto:media.india@…` (authored business contacts, not visitor data): acceptable.

### G. Personalization
Entire block (an experience fragment / Target offer could swap the whole form). No personalization fields. Contact cards are rule-based (dropdown), not personalization.

### H. Decision
**Modify**: the block is not usable on published pages until D-D-1 is fixed, and it must not claim success without an endpoint (D-D-3). Retain the item architecture.

### Defects
- **D-D-1 (critical, verified on the AEM-faithful render; AEM publish to confirm)** `blocks/form-variations/form-variations.js:39-46, 375-391`. Items are identified by a first "type cell" coming from the read-only `classes` text field of each item model. `classes` is a class field, never delivered as a cell (project fact; the local renderer `.home-work/render-lib.mjs:44,111` drops it like AEM). Evidence: `drafts/en/block-library/form-variations/field-types.plain.html` (model-rendered) has rows `<div><div>name</div><div>Full name</div><div>text</div>…` without a type cell; Playwright: both blocks render `<form class="form-variations-form" …></form>` with no controls. The other block library page (`form-variations.plain.html`) hides the bug because its markup was hand-written with type cells. In Universal Editor it works (type from `data-aue-model`), which matches the handover's own troubleshooting row "Form empty on the site but fine in the editor" (`docs/handover/TCS-CORP-HANDOVER.md:110861`). Fix: keep reading an explicit type cell when present (backward compatible), else infer the type from the row shape:
  ```js
  // cells after optional tabs; t = textOf(cell) lower-case
  function inferType(cells) {
    const v = cells.map((c) => textOf(c).trim().toLowerCase());
    const bool = (s) => s === 'true' || s === 'false';
    if (cells.length === 2) return 'field-submit';                         // label, dependsOn
    if (cells.length === 4) return bool(v[2]) ? 'field-checkbox' : 'contact-card';
    if (cells.length === 5) {
      if (INPUT_KINDS.includes(v[2])) return 'field-text';                 // name, label, kind, required, depends
      if (/^\d*$/.test(v[2]) && bool(v[3])) return 'field-textarea';       // name, label, maxLength, required
      if (bool(v[2])) return 'field-select';                               // name, label, required, options
    }
    return '';
  }
  ```
  and in `readItem`: `const inferred = inferType(cells); if (inferred) return { type: inferred, cells };` after the model check; only treat leading rows as properties while `!itemsStarted && index < 2`. Durable alternative: add a non-class read-only select `fieldType` as the first field of every item model (delivered as a cell) and read it first; existing items (without the property) use the inference. Add a unit test of the inference (`test/form-variations/*.test.mjs`) and render the block library page from the model (remove the hand-written raw markup) so the bug cannot be masked again.
- **D-D-2 (major, verified in the content package; delivery impact suspected)** `blocks/form-variations/_form-variations.json` items `field-text`, `field-select`, `field-textarea`, `field-checkbox`: the field `name` is stored in the item node's `name` property, which AEM uses for the component's template name (package XML: `<item_1 … name="email" model="field-text" classes="field-text" …>`, while the submit item keeps `name="Submit Button"`). The Universal Editor content tree then shows "email" instead of "Text Input Field", and any AEM logic keyed on `name` (block/item class from the template name) gets the field key. The audit inventory counts 0 such items for this reason. Fix: rename the fields to `fieldName` in the four models (label unchanged), read `fieldName` cell (same position) — no code change in positional reading; for existing content, AEM still renders the old `name` value in that position until re-saved (suspected; if AEM drops `name` as a cell, re-save the items). Document in the README / handover.
- **D-D-3 (major, verified)** `form-variations.js:426-438`: on a valid submit the block resets the form and announces "Thank you, your details were sent." although nothing is sent (no endpoint, no listener of `form-variations:submit` in the repo). Visitor data (name, email, message, consent) is discarded while the visitor is told it was received. Fix: add a block field `action` (aem-content / URL, e.g. an AEM Forms submit service or `/forms/...` sheet endpoint) and POST JSON `collectData(form)` with `fetch`; on `!response.ok` or network error show a `formError` placeholder in the status region and keep the values; only reset and show `formSuccess` on success. Until an endpoint exists, in the editor show a warning "No submit action set" and on the page disable the success message (keep the event for integrations).
- **D-D-4 (minor, verified)** `decorators/data-layer-decorator.js:145-160`: `cmp:submit` is pushed before validation, so invalid attempts are counted as submissions (verified: empty submit -> `cmp:submit`). Fix: skip forms that handle validation themselves: `if (form.noValidate && form.dataset.cmpSubmit !== 'valid') return;` and in `form-variations.js` after `validate` succeeds push via `pushComponentEvent('cmp:submit', …)` or set `form.dataset.cmpSubmit='valid'` and re-dispatch; simplest: in `onSubmit` `if (form.noValidate && !form.checkValidity()) return;` (works because the block's controls carry native constraints). Also use `form.getAttribute('aria-label') || document.getElementById(form.getAttribute('aria-labelledby'))?.textContent` for `dc:title`.
- **D-D-5 (minor, verified)** Consent checkbox `required` defaults to `false` (`_form-variations.json` field-checkbox model). Fix: `"value": true` for the model field and the template (`"required": true`) for new items; existing items unchanged.
- **D-D-6 (minor, verified)** Conditional fields / contact cards appear without announcement (`updateVisibility` l.330-348). Fix: after a change that reveals elements, set the status region text to `t('fieldsUpdated', 'More fields are shown below.')` or put `aria-live="polite"` on contact cards (`buildContactCard` l.275).
- **D-D-7 (minor, verified)** textarea counter "0/1500" (l.226) is read literally. Fix: `counter.textContent = t('charactersCount', '{count} of {max} characters', { count, max: limit })`, keep the visual "0/1500" with an `aria-hidden` span plus a visually hidden text.

---

## 2. Embed (`embed`, class `embed`)

### A. Overview
- Purpose: Block Collection Embed: YouTube, Vimeo, X/Twitter posts or any URL as an iframe, optionally behind a placeholder image with a Play button.
- Files: `blocks/embed/embed.js` (104 lines), `embed.css`, `_embed.json`; shared `decorators/media-decorator.js` (`createFrame`, `createYoutubeFrame`, `createVimeoFrame`), `decorators/icon-button-decorator.js`, `utils/media.js`, `utils/viewport.js` (`onVisible`), placeholders. No README.
- Not key-value: one row, one cell (element group `embed_`: picture + URI).
- Usage: 6 instances, 1 page (block library only).

### C. Dialog validation

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Placeholder Image (`embed_placeholder`) | reference | `block.querySelector('picture')` `embed.js:82`; with it a Play button is shown and the embed loads on click (l.88-100) | inventory `readByCode=false` is a false negative (read via the picture) | Retain |
| Placeholder Image Alt Text (`embed_placeholderAlt`) | text | collapsed into the `<img alt>` | no hint that the alt should describe the video | Retain (description "Describes the video, e.g. Video: …") |
| URI (`embed_uri`) | text | `block.querySelector('a')?.href` l.83; type by host (YouTube, Vimeo, X/Twitter, else generic iframe) l.34-70 | a URI without an `<a>` is ignored and the block is emptied (`block.textContent = ''` l.84). On AEM the pipeline auto-links bare URLs, so this is suspected only for non-linkified values (the local render of the "Generic iframe" example, `<p>https://partners.example.com/market-explorer</p>`, gives an empty block) | Correct (D-D-9, read the text as fallback) |
| Additional tab | std (13) | std | no Background animation (fine) | Retain |
| — missing: frame title | — | iframe title = "Content from {host}" (`contentFrom` placeholder) l.66 | generic, not descriptive for several embeds of one host | Add optional "Title (for screen readers)" field (D-D-8) |
| — missing: privacy | — | `createYoutubeFrame` without `privacy` -> `www.youtube.com` (cookies) `media-decorator.js:38-43`, `utils/media.js:28-30`; Vimeo without `dnt`; X widget script loaded from `platform.twitter.com` | inconsistent with Video (privacy-enhanced on by default) | Correct (D-D-10) |

### D. Variations

| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| YouTube / Vimeo with placeholder | click to load | verified: picture + `button.embed-placeholder-play[aria-label=Play]`; on click the iframe replaces it, autoplay muted (l.18), focus to the iframe (l.74) | Retain |
| Without placeholder | lazy | `onVisible` then iframe (l.102), no autoplay | Retain |
| X / Twitter | social post | blockquote + link, widgets.js (l.22-32) | Retain (privacy, D-D-10) |
| Generic iframe | any URL | `createFrame` with title "Content from {host}" | Retain; D-D-9 |
| Desktop / Tablet / Mobile examples on the block library page | — | identical markup and code (no breakpoint option exists; only page sections differ) | Documentation only |

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| iframe name (4.1.2) | descriptive `title` | "Content from youtube.com" for every YouTube embed | authored title (D-D-8) | Partial |
| Play button name (2.4.6 / 2.4.4) | names the content | verified `aria-label="Play"` on all 5 placeholders of the page (identical names) | `t('playVideoTitle','Play video: {title}', {title: img.alt})` when the alt exists | Minor (D-D-8) |
| Placeholder image | alt | authored alt kept | none | Pass |
| Focus after Play | moves into the player | `block.querySelector('iframe, a')?.focus()` l.74 | none | Pass |
| Keyboard | button operable | native `<button>` | none | Pass |
| Moving content | pause | autoplay only after the user's click; YouTube/Vimeo own controls | none | Pass |
| Reduced motion | no autoplay | autoplay after click only | none | Pass |

### F. Data layer
Block entry; Play button `data-cmp-interaction="play"` (l.98) -> one `cmp:click` (`interaction: play`). Player interactions inside cross-origin iframes are not observable (no YouTube/Vimeo API) — acceptable without business need. Ids stable (anchor id or `embed-n`).

### G. Personalization
Entire block (URL swap). Not personalizable at field level; no personalization fields.

### H. Decision
**Retain / Modify** (D-D-8, D-D-10); see Embed vs Video below: keep Embed for non-video embeds (X posts, generic iframes) and move video use cases to Video.

### Defects
- **D-D-8 (minor, verified)** `blocks/embed/embed.js:66, 91-92`: iframe title and Play button are generic ("Content from youtube.com", "Play"). Fix: add a text field `embed_title` (grouped -> same cell; delivered as text after the link) is risky for positional parsing; instead use the collapsed link title: make `embed_uri` an `aem-content` field and add `embed_uriTitle` (collapses into the `<a title>`); read `const name = a.title || placeholder?.querySelector('img')?.alt`; iframe `title = name || contentFrom`; Play label `name ? t('playVideoTitle', 'Play video: {title}', { title: name }) : t('play', 'Play')`. Backward compatible (old blocks have no title).
- **D-D-9 (minor, suspected on AEM, verified on the local render)** `embed.js:83-85`: the URL is only taken from an `<a>`; a bare URL text empties the block. Fix: `const cell = block.querySelector(':scope > div > div'); const link = block.querySelector('a')?.href || (cell?.textContent.match(/https?:\/\/\S+/) || [])[0];`.
- **D-D-10 (minor, verified)** `embed.js:38-53`: YouTube embeds use `www.youtube.com` (cookies) and Vimeo without `dnt=1`, whereas Video defaults to privacy-enhanced mode. Fix: pass `{ title, privacy: true }` to `createYoutubeFrame` and `{ dnt: '1' }` in Vimeo params (or a `classes_privacy` boolean defaulting on), and load X `widgets.js` only after a click when a placeholder exists.

---

## 3. Video (`video`, class `video`)

### A. Overview
- Purpose: a video file from AEM Assets, YouTube or Vimeo, with poster + Play, autoplay-in-view, background video, pop-up playback, captions file, caption text and transcript link.
- Files: `blocks/video/video.js` (367 lines), `video.css`, `_video.json`; shared `decorators/media-decorator.js`, `icon-button-decorator.js`, `button-decorator.js`, `content-decorator.js`, `image-decorator.js` (`pictureOf`), `utils/media.js`, `utils/viewport.js` (`onVisible`, `watchVisibility`), `utils/links.js`, `utils/properties.js`, `blocks/modal/modal.js` (pop-up). No README.
- Key-value (`readProperties`), with fallbacks for one-row-per-field and the legacy link + picture model (l.60-122).
- Usage: 27 instances on 2 pages (block library). Playback click 21 / autoplay 1 / background 5.

### C. Dialog validation

| Field (name) | Current values / default | Functional mapping (video.js) | Issue | Decision |
|---|---|---|---|---|
| Video (`uri`) | aem-content, required | `urlOf(props.uri)` l.92; type by host (l.140-177) | DAM video links: the published URL of an AEM Assets MP4 must be reachable from Edge Delivery (local render keeps `/content/dam/...`) — environment, not code | Retain |
| Title (`label`) | text | `config.title` l.98 -> iframe `title` / video `aria-label` (media-decorator l.22, 91), Play label "Play video: {title}" l.318-319; fallback placeholder `video` l.300 | none (verified labels) | Retain |
| Caption (`caption`) | richtext | `fromCell(..., 'video-caption')` l.292, 305 | none | Retain |
| Transcript (`transcript`) | aem-content | link below the video, text "Read the transcript" when the authored text is a URL l.306-316 | a transcript opening in a new tab is not announced (no `announceNewTab`) | Retain (minor) |
| Poster Image (`placeholder_image`) | reference | grouped cell `placeholder` -> `pictureOf` l.88-91; shows the Play button; `poster` attribute of files l.165-172 | none | Retain |
| Poster Image Alt Text (`placeholder_imageAlt`) | text | collapsed into the img alt | none | Retain |
| Captions File (WebVTT) (`captions`) | aem-content | `<track kind=captions default>` l.112-114, media-decorator l.98-106 (files only) | no block library example with a captions file (coverage gap); one track only | Retain |
| Captions Language (`captionsLanguage`) | text, default page language | `srclang` l.94 | none | Retain |
| Captions Name (`captionsLabel`) | text | `track.label` (default = language) l.113 | none | Retain |
| Privacy-enhanced Mode (`privacyMode`) | boolean true (template = model = code l.120) | youtube-nocookie (`utils/media.js:30`), Vimeo `dnt=1` l.162 | none | Retain |
| Playback (`playback`) | click / autoplay / background, `click` | `optionOf` l.104; reduced motion forces `click` l.321 | none | Retain |
| Muted (`muted`) | boolean false | l.105, l.136 (autoplay/background always muted) | none | Retain |
| Loop (`loop`) | boolean false | l.106, l.138, YouTube playlist trick l.147 | none | Retain |
| Show Player Controls (`controls`) | boolean true | l.107, l.137; off -> pause/stop toggle l.365 | for `click` playback with controls off and no poster, nothing pauses the player once started (only autoplay/background get the toggle; l.339-345 builds the player without the toggle) | Correct (D-D-12) |
| Start At (`startTime`) | number | YouTube `start` l.149, Vimeo `#t=` (`vimeoEmbedUrl` start), file media fragment | none | Retain |
| End At (`endTime`) | number | YouTube `end` l.150, file fragment; **Vimeo ignored** (no param) | not stated | Retain (description "not for Vimeo") |
| Play in a Pop-up (`openInModal`) | boolean false | l.110, l.324-330 (`playInModal`) | ignored for autoplay/background (no condition) | Add condition `playback == click` |
| Pause When Out of View (`pauseOffscreen`) | boolean true | l.111, l.364 (files only) | YouTube/Vimeo never paused (described "video files") | Retain |
| Aspect Ratio (`aspectRatio`) | 5 options, `16-9` | `--video-aspect-ratio` l.115, 299 | none (verified classes) | Retain |
| Size (`size`) | full / large / medium / small, `large` | class `video-size-*` l.297; CSS l.16-27 (large = base 56.25rem) | labels in px ("Large (900px)") although CSS is rem; fine for authors | Retain |
| Alignment (`alignment`) | center / left / right | class `video-align-*` l.297, CSS l.29-35 | no effect with size full (described) | Retain |
| Rounded Corners (`rounded`) | boolean true | `video-rounded` l.298 | none | Retain |
| Additional tab | std (13) | std | Video has no Background animation (fine) | Retain |

### D. Variations

| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Play button (poster) | default | verified: poster + `Play video: {title}`; click -> player, focus into it (l.181-188) | Retain |
| Autoplay when in view | muted autoplay | verified on "autoplay-no-controls": VIDEO without controls + "Pause video" toggle | Retain |
| Background | decorative loop | verified: `aria-hidden=true`, no controls, "Pause video" toggle (WCAG 2.2.2) | Retain |
| Pop-up | modal | `createModal` from `blocks/modal/modal.js` (video-pop-up page) | Retain |
| Sizes / ratios / alignment | layout | verified classes on 27 blocks | Retain |

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Name of the player | title | iframe `title` / video `aria-label` = Title (verified "Building on belief: …") | none | Pass |
| Captions (1.2.2) | captions for prerecorded video | WebVTT track for files; YouTube/Vimeo captions from the platform; field is optional, nothing warns when missing | editor hint when Playback = click and no captions on a file | Partial (authoring) |
| Transcript / audio description (1.2.3/1.2.5) | alternative | Transcript link field | none | Pass |
| Pause (2.2.2) | moving content > 5 s can be paused | toggle for autoplay without controls and background (l.198-231, verified); native controls otherwise | click playback without controls (D-D-12) | Partial |
| Reduced motion | no autoplay | `prefersReducedMotion()` -> click (l.321) | none | Pass |
| Background video hidden | decorative | `aria-hidden`, iframe `tabindex=-1` l.359-362 | none | Pass |
| Focus after Play | into the player | l.181-188 | none | Pass |
| Toggle button | name + state | label switches Pause/Play/Stop (l.204-211) | uses label change instead of `aria-pressed` – acceptable | Pass |
| Pop-up | dialog with Escape and focus return | modal block (`<dialog>`) | see Modal review | n/a |

### F. Data layer
`onMedia` (`data-layer-decorator.js:133-143`) pushes `cmp:media` for play / pause / ended of `<video>` files, skipping background videos (muted + loop + no controls). Toggle button `data-cmp-interaction="playback"` -> `cmp:click`. Suspected noise (not reproduced: headless Chromium did not play the sample MP4, 0 media events): an autoplay file with controls and Pause When Out of View pushes a `pause`/`play` pair every time it scrolls out of / into view (l.244-255), and autoplay itself is reported as a `play` interaction (D-D-13). YouTube / Vimeo plays are not tracked.

### G. Personalization
Entire block / selected field (`uri`, poster) swap; no personalization fields.

### H. Decision
**Retain** (Modify: D-D-12, D-D-13 minor). Video is the target for all video use cases (see Embed vs Video).

### Defects
- **D-D-11 (minor, verified)** `_video.json` `openInModal` has no condition; for autoplay / background it does nothing (`video.js:323-346`). Fix: `"condition": { "===": [{ "var": "playback" }, "click"] }`.
- **D-D-12 (minor, verified by code)** `video.js:337-344`: click playback without poster and with Show Player Controls off builds a YouTube/Vimeo/file player without controls and without the pause toggle; a file never starts (no autoplay, no controls), a frame cannot be paused. Fix: in that branch `if (!config.controls) addPlaybackToggle(media, player, () => buildPlayer(config, { autoplay: false, background: false }), t);` and start the toggle in the "paused" state for files (`playing = !player.paused`).
- **D-D-13 (minor, suspected)** `data-layer-decorator.js:133-143` with `video.js:244-255`: programmatic pause/play (out-of-view) and autoplay are reported as user `cmp:media` interactions. Fix: mark programmatic changes (`video.dataset.cmpAuto = 'true'` before `video.pause()/play()` in `pauseOffscreen` and for autoplay, removed on the next user `play`/`pause`), and skip them in `onMedia` (`if (media.dataset.cmpAuto) { delete media.dataset.cmpAuto; return; }`).

### Redundant block assessment: Embed vs Video

| Existing blocks | Overlap | Unique capabilities | Existing usage | Decision | Target | Migration |
|---|---|---|---|---|---|---|
| Embed, Video | YouTube / Vimeo with poster + Play (both build players through `media-decorator.js`) | Embed: X/Twitter posts, any iframe URL. Video: AEM Assets files, captions (WebVTT), transcript, caption, privacy mode, autoplay/background with pause, pop-up, ratio/size/alignment, accessible title | Embed 6 (block library), Video 27 (block library) | Keep both, narrow Embed to non-video embeds | Video for all videos; Embed = "Social post / iframe" | Rename Embed in the palette to "Embed (social / iframe)"; in `embed.js`, keep YouTube/Vimeo support for existing content (backward compatible) but add privacy (D-D-10); authoring guide: new videos use Video |

---

## 4. Table (`table`, class `table`) + Row (`table-row`) and the `table-N-columns` filters

### A. Overview
- Purpose: Block Collection data table authored as item rows; the dialog's Columns select switches the block's filter (`table`, `table-2-columns` … `table-5-columns`) and therefore which Row model (1–5 rich text cells: `table-row`, `table-col-2` … `table-col-5`, all titled "Row") new rows get.
- Files: `blocks/table/table.js` (71 lines), `table.css`, `_table.json`; `utils/ids.js`, placeholders. No README.
- Usage: 12 tables on 1 page; rows: table-row 5, col-2 12, col-3 22, col-4 9, col-5 10.

### C. Dialog validation

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Options (`classes`) | multiselect: group "Border": Striped `striped`, Bordered `bordered`; group "Header": No Header `no-header`, First Column Header `row-header` | `no-header` / `row-header` read `table.js:29-30`; `striped` CSS l.53-56, `bordered` l.58-61; `no-header` top border l.48-51 | "Striped" is not a border (group label); otherwise fine | Retain (rename group "Style") |
| Columns (`filter`) | select 1–5, `table` | not read by code: it is the block's reserved `filter` property (Universal Editor allowed children) — same pattern as the xwalk boilerplate | switching it after rows exist leaves the old rows with their old cell count -> ragged rows (`<tr>` of different lengths, no `colspan`) | Retain; describe "applies to new rows; existing rows keep their columns" |
| Row: Column1…Column5 (`column1text`…`column5text`) | richtext; template value `Column1`…`Column5` | each cell -> `th`/`td` (l.36-43) | label "Column1" without space; template text "Column1" is published if not replaced; the `…text` suffix is harmless here (no base field to collapse into) | Rename labels "Column 1"…; Remove template placeholder text (empty) |
| Additional tab | std (13) | std | none | Retain |

### D. Variations

| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| default | header row | first row in `<thead>`, `th scope=col` (l.35-39) | Retain |
| No Header | data only | all rows `td` (l.29) | Retain |
| First Column Header | matrix | `th scope=row` in column 1 (l.37-39) | Retain |
| Striped / Bordered | style | CSS only | Retain |
| 1–5 columns | row model | filters `table-N-columns` (component-filters.json) | Retain |

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Table semantics | `table/thead/th[scope]` | l.26-47 | none | Pass |
| Name | caption or label | `aria-labelledby` = heading just before the block (l.13-18, 50-54); no caption field | optional Caption field would help tables without a preceding heading | Pass (minor) |
| Scrolling region (2.1.1) | focusable when it overflows | `ResizeObserver` adds `tabindex=0`, `role=region`, `aria-label` (l.58-70); focus ring CSS l.8-11 | none | Pass |
| Empty header cells | avoid empty `th` | not handled | minor | Minor |
| Ragged rows | consistent columns | not handled (see Columns) | pad short rows with empty `td` to the widest row | Minor (D-D-14) |

### F. Data layer
Block entry only; no interactions; links in cells tracked as `cmp:click` by the central handler. Ids stable.

### G. Personalization
Not personalizable (content table); entire block swap at most.

### H. Decision
**Retain** (minor D-D-14).

### Defects
- **D-D-14 (minor, verified by code)** `table.js:32-46` + Columns select: rows of different models produce rows of different lengths. Fix: after building, `const max = Math.max(...[...table.rows].map((r) => r.cells.length)); [...table.rows].forEach((r) => { while (r.cells.length < max) r.append(document.createElement(r.parentElement.tagName === 'THEAD' ? 'th' : 'td')); });`; change the field description; rename item labels "Column N" and remove the "ColumnN" template values in `_table.json` (new rows only).

### Redundant block assessment: Table vs Table List

| Existing blocks | Overlap | Unique capabilities | Existing usage | Decision | Target | Migration |
|---|---|---|---|---|---|---|
| Table, Table List | name only; both render rows | Table: tabular data (`<table>`, header row / column, scroll region). Table List: a navigational list of linked items (number, title, trademark, description, link/button) in 3 visual variations, max items, view-all link, motion; not a data table (see review A) | Table 12, Table List 23 (12 pages) | Not redundant: keep both | — | Rename Table List in the palette to make the difference obvious (e.g. "Numbered Link List"); no content migration |

---

## 5. Separator (`separator`, class `separator`)

### A. Overview
- Purpose: an `<hr>` (AEM Core Components Separator port) with variants, theme, line style / thickness / colour / opacity, widths, decorations, per-breakpoint overrides, spacing, animation on view, print, data layer.
- Files: `blocks/separator/separator.js` (140 lines), `separator-config.js` (203, pure, unit tested in `test/separator`), `separator.css` (631), `_separator.json` (1745), README. Key-value.
- Model size: **52 fields** (42 own + 10 Additional); the Additional tab lacks the 3 standard animation fields (Separator has its own Animate on view).
- Usage: 119 instances on 3 pages.

### C. Dialog validation
All keys are read through `normalizeConfig` (`separator-config.js:84-133`) from lower-cased property names; the 18 per-breakpoint fields are read with dynamic names `` `show${bp}` ``, `` `${bp}width` ``, `` `${bp}thickness` ``, `` `${bp}alignment` ``, `` `${bp}topspacing` ``, `` `${bp}bottomspacing` `` (l.93-102): **every field is read** (inventory hints that say otherwise are false negatives). Classes from `classesOf` (l.159-190), styled by `separator.css`.

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Component ID (`componentId`) | text, regExp | `sanitizeComponentId` l.73-77, `idOf` `separator.js:33-39` replaces the block id | duplicates Anchor ID (Additional): when both are set, Component ID wins and `#anchor-…` links break | Deprecate (keep reading; hide in dialog) |
| Accessibility mode (`accessibilityMode`) | decorative / semantic, `decorative` | `decorative` -> `aria-hidden` on the line; `semantic` native `<hr>` (`separator.js:50-56`) | none | Retain |
| Accessible label (`accessibleLabel`) | text, cond. semantic | `aria-label` on the `<hr>` (≤120) l.52 | none | Retain |
| Separator variant (`variant`) | 10, `default` | preset (`VARIANT_PRESETS` l.36-47) + class `variant-*`; only `variant-inset` has CSS (l.139) | **`custom-design` preset = `default` preset and has no CSS: renders identically to Default**; dotted / dashed / branded / strong / subtle / gradient / full-width only duplicate the Appearance options | Remove `custom-design` (map to default); Retain the rest as presets |
| Theme (`theme`) | auto / light / dark / brand, `auto` | CSS l.58-75 (`theme-auto` follows `.section.dark/.brand`) | `light` has no rule: identical to Auto in light sections (intended: forces light colours in dark sections) | Retain |
| Line style (`lineStyle`) | '' + solid/dashed/dotted/gradient/none | `line-*` CSS l.~90-110 | none | Retain |
| Line thickness (`lineThickness`) | '' + thin/medium/thick | `thickness-*` l.95-97 | none | Retain |
| Line colour (`lineColor`) | '' + 8 | `color-*` | none | Retain |
| Line opacity (`lineOpacity`) | 25/50/75/100, `100` | `opacity-*` | none | Retain |
| Separator width (`width`) | '' As the variant / `auto` "Auto (as the variant)" / 25/50/75/100 % / content-width / full-bleed | `width-*` CSS l.112-127 | **`auto` is styled exactly like `100-percent` (l.112-113), not "as the variant" (the full-width variant's preset is full-bleed)**; with Respect content maximum width on (default) `content-width` = `100-percent` too: 3 options render identically | Remove `auto` (read as ''), merge `content-width` into 100% (keep reading) |
| Maximum width (`maxWidth`) | none/small/medium/large/extra-large/content-container, `none` | `max-*` l.128-132 | `content-container` = Respect content maximum width (default on) — duplicate | Remove `content-container` (keep reading) |
| Alignment (`alignment`) | start/center/end, `center` | `align-*` l.134-136 | none | Retain |
| Start / Center / End decoration (`startDecoration`, `centerDecoration`, `endDecoration`) | none/dot/square/diamond | `renderDecorations` l.59-66, CSS l.146-171 | `decorated` class has no CSS (harmless) | Retain |
| Background contrast (`contrastMode`) | standard / high | `contrast-high` -> colour strong (l.89) | identical to Line colour = Strong | Merge into Line colour (keep reading) |
| Show on desktop / tablet / mobile (`showDesktop`, `showTablet`, `showMobile`) | boolean true | `hide-*` media queries; `hidden-all` + editor note (l.125-135, 142) | overlaps Hide block (Additional) for "all"; per breakpoint is unique | Retain |
| Desktop / Tablet / Mobile width (`desktopWidth`, `tabletWidth`, `mobileWidth`) | inherit + 7 (same list as width, incl. `auto`) | `${bp}-width-*` CSS (7 rules each) | same `auto` duplicate as above | Retain; remove `auto` |
| Desktop / Tablet / Mobile thickness (`desktopThickness`…) | inherit + 3 | `${bp}-thickness-*` | none | Retain |
| Desktop / Tablet / Mobile alignment (`desktopAlignment`…) | inherit + 3 | `${bp}-align-*` | none | Retain |
| Desktop / Tablet / Mobile top / bottom spacing (6 fields) | default + 8 (px labels) | `${bp}-top-*`, `${bp}-bottom-*` (`--separator-space-*`) | overlaps Additional Padding top / bottom (which use the `--space-*` tokens and apply on all breakpoints) | Retain (document precedence) |
| Use section padding (`useSectionPadding`) | boolean false | `section-padding` -> `padding-block: 0` (l.142-144) | it overrides every spacing select silently | Retain (description) |
| Stretch to container width (`stretchToContainer`) | boolean false | `stretch` -> width 100%, no bleed (l.173-176) | duplicates width 100% except it beats per-breakpoint widths | Merge (deprecate; keep reading) |
| Respect content maximum width (`respectMaxWidth`) | boolean true | `respect-max` -> `--separator-limit` (l.133) | see width / maxWidth duplicates | Retain |
| Animate on view (`animateOnView`) | none/fade/draw-from-start/draw-from-center | `initializeAnimation` l.69-85 + CSS l.196-216 | own mechanism instead of the shared Animation Type (inconsistent dialog across blocks) | Retain (or migrate to `classes_animation` later) |
| Reduced motion fallback (`reducedMotionFallback`) | static / fade, cond. animate | l.72-75; class `motion-static` / `motion-fade` (no CSS; no clash with `utils/motion.js` effect names) | lets authors animate (a 0.6s fade) for reduced-motion visitors; there is no need for a choice | Remove (always static) |
| Print (`printVisibility`) | show / hide | `print-hide` (l.~620) | none | Retain |
| Analytics (`analyticsEnabled`) | boolean false | `data-analytics="off"/"custom"`, `pushComponents(analyticsEntry)` `separator.js:88-96` | a separator has no interactions; a state entry has no business use | Deprecate (keep reading) |
| Analytics label (`analyticsLabel`) | text, cond. analytics | `dc:title` of the entry | as above | Deprecate |
| Additional tab | 10 std (no Animation Type / Speed / Trigger) | std | — | Retain |

### D. Variations

| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Default / Subtle / Strong / Branded / Dotted / Dashed / Gradient | presets | preset values -> line classes | Retain |
| Inset | inset line | `--separator-inset` | Retain |
| Full width | full bleed | preset width `full-bleed`; with Respect max width on (default) it is capped at the content width (`--separator-limit`, l.44), and `--section-padding-inline` is 0 in full-width sections (see review A D-A-9): suspected identical to Default in most sections | Verify / document |
| Custom (only the Appearance settings) | — | identical to Default | Remove |
| Spacing only (line none) | spacer | decorative: no `<hr>` at all (`hasRule`) | Retain |

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Semantics | `<hr>` or hidden | `separator.js:41-56` | none | Pass |
| Invisible semantic break | warned | editor note `invisible-semantic` | none | Pass |
| Reduced motion | no motion | static by default; `fade` fallback still fades | remove the option | Minor |
| Forced colours | visible line | CSS `forced-colors` block | none | Pass |
| Duplicate ids | unique | Component ID suffixed when taken (l.36-38) | none | Pass |

### F. Data layer
Off by default (`data-analytics="off"` excludes the block from `trackBlocks`); on: a custom state entry (`analyticsEntry`). No events. See deprecation.

### G. Personalization
Not personalizable.

### H. Decision
**Modify (simplify)**: retain the block, remove the duplicate options (`custom-design`, width `auto`, `content-width`, maxWidth `content-container`, contrast, stretch, reduced-motion fallback, analytics, Component ID: 9 fields / options) while keeping their values readable in `separator-config.js` (map to the equivalent). Backward compatible: `pick()` already falls back to defaults; add explicit maps (`auto`->'' i.e. preset, `content-width`->`100-percent`, `content-container`->`none`, `contrast high`->`color strong`, `stretch`->`100-percent` on all breakpoints).

### Defects
- **D-D-15 (minor, verified)** `separator.css:112-113` / `_separator.json` width options: "Auto (as the variant)" (`auto`) is styled as 100% and is not the variant's width; "As the variant" ('') is the real "as the variant". Fix: remove the `auto` option from `width` and the 3 per-breakpoint width selects; in `normalizeConfig` map `auto` to the preset width (`if (key(get('width')) === 'auto') width = defaults.width`) and per-breakpoint `auto` to `inherit`.
- **D-D-16 (minor, verified)** Variant "Custom (only the Appearance settings)" (`VARIANT_PRESETS['custom-design']` l.46 equals `default`; no CSS): no different result. Fix: remove the option; keep `custom-design` in `VARIANTS` for existing content.
- **D-D-17 (minor, verified)** Duplicate controls for the same result: `contrastMode=high` = `lineColor=strong` (l.89); `maxWidth=content-container` = `respectMaxWidth` (l.132-133); `stretchToContainer` = width 100% (l.173-176); `componentId` vs `classes_anchor` (`separator.js:33-39`, Component ID silently replaces the anchor id). Fix: hide (remove from the model) and map in `normalizeConfig` as listed in H.

---

## 6. Conversation Canvas (`conversation-canvas`, class `conversation-canvas`) + Conversation Canvas Button (`conversation-canvas-button`, model `button`)

### A. Overview
- Purpose: the "ask us" search panel (Default / Secondary in page sections and the footer; Primary = the sticky dock with the site navigation) with intro (icon, eyebrow, title, text), site menu popover, search form (voice input), quick action buttons (items), and the floating journey shared by every Canvas of the page (`canvas-journey.js` pure + unit tested, `canvas-controller.js`).
- Files: `conversation-canvas.js` (724), `canvas-controller.js` (193), `canvas-journey.js` (160), `.css` (967), README; shared `button-decorator.js` (`createButton`), `icon-button-decorator.js`, `a11y-decorator.js` (`hideVisually`), `responsive-image-decorator.js`, `skeleton-decorator.js`, `utils/query-index.js`, `taxonomy.js`, `metadata.js`, `buttons.js`, `urls.js`.
- Key-value; item rows (Canvas buttons, model `button` shared with Button (basic)) are recognised as rows containing a link (l.41-57).
- Usage: 33 instances on 11 pages; Canvas Button items 51 (package count by resource type; the inventory's 103 mixes them with Button (basic)).
- **The search does nothing**: submit dispatches `conversation-canvas:search` (l.279-285); there is no listener anywhere in the repository (verified by grep and at runtime: URL unchanged, no results). See D-D-19.

### C. Dialog validation

| Field (name) | Current values / default | Functional mapping (conversation-canvas.js) | Issue | Decision |
|---|---|---|---|---|
| Canvas Style (`classes`) | Default '' / Primary `primary` / Secondary `secondary` | block class; `primary` -> `buildDock` only (l.640-648); `secondary` -> filter list (l.702-707), CSS l.58-61, 453, 549 | `config.classes` read at l.628 is dead (classes are never rows), harmless | Retain |
| Floating journey (`classes_journey`) | '' / `nofloat` / `decorative` | l.636-637 -> `registerCanvas` | none | Retain |
| Quick actions (`classes_actions`) | '' / `action-pills` / `action-buttons` | CSS l.423-448 | none | Retain |
| BG Style (`bgStyle`) | default / dark, `default` | class `conversation-canvas-bg-*` l.631; **CSS only for `.primary.conversation-canvas-bg-dark` (l.898-929)** | no effect on Default / Secondary (verified: no other rule) | Add condition `classes == primary`; label "Dock colour" |
| BG Background Image (`backgroundImage`) | reference | `.conversation-canvas-background` (decorative, alt '') l.655-662; bg animation layer | ignored by Primary (no condition); label redundant ("BG Background") | Rename "Background image"; condition not primary |
| Icon (`icon`) + Icon Alt Text (`iconAlt`) | reference + text (collapsed into the img alt) | l.667-673 | ignored by Primary | condition not primary |
| Eyebrow (`eyebrow`) | text, UE placeholder "Infrastructure to Intelligence" | `<p class=…eyebrow>` l.674-679 | ignored by Primary | Retain + condition |
| Title (`title`) | text, UE placeholder **"Statistic"** | always `<h2>` l.680-685 | placeholder text wrong; no heading level (footer / sidebar canvases may need h3) | Retain; fix placeholder; optional `titleType` |
| Title Type (`titleSize`) | '' / bigger / medium | class `conversation-canvas-title-*` l.632-633, CSS l.131-136, 491-543 | label "Title Type" suggests a heading level | Rename "Title size" |
| Text (`text`) | richtext | l.686-691 | ignored by Primary | Retain + condition |
| Menu root path (`menuRootPath`) | aem-content, default = locale root | `menuSettings` l.111-116 (`toSitePath`) | none | Retain |
| Menu depth (`menuDepth`) | number 1 (1–3) | l.114, `loadMenuTree` l.125-148 | verified: depth 3 on the library page = a 116-link popover | Retain |
| Navigation style (`classes_navstyle`) | '' Pills / `text-links` | CSS l.871-929 (Primary only) | no condition on Primary | Add condition |
| Search bar water mark (`searchPlaceholder`) | text (fallback placeholder `searchPlaceholder`) | input placeholder **and** the visually hidden label (l.213-222) | label "water mark" is jargon; it is also the field's accessible name | Rename "Search placeholder and label" |
| Search bar audio icon (`searchAudioIcon`) + alt (`searchAudioIconAlt`) | reference + text | icon of the voice button; alt = the button's aria-label (l.229-236); hidden where SpeechRecognition is missing (l.266-268) | none | Retain |
| Search bar button icon type (`searchButtonStyle`) | primary / secondary / tertiary | `createIconButton({ type })` l.272-277 | label unclear | Rename "Search button style" |
| Search bar button icon type hover text (`searchButtonLabel`) | text (fallback `submit`) | the submit button's **aria-label** and title (l.271-277) | it is the accessible name, not only a hover text | Rename "Search button label" |
| Background animation (`classes_bganimation`) | None + 6 | `motion-decorator.js:54` layers `.conversation-canvas-background` + overlay | nothing to animate on Primary / without image except the block colour | Retain |
| Additional tab (13 std) | std | content animation target `.conversation-canvas-content` (`motion-decorator.js:32`) | none | Retain |

Canvas Button item (model `button`, shared):

| Field (name) | Current values / default | Functional mapping (`buildListButton` l.83-105) | Issue | Decision |
|---|---|---|---|---|
| Link (`link`) + Text (`linkText`) + Title (`linkTitle`) | aem-content + collapsed text / title | `a.href`, text, title (title dropped when equal to the text) | none | Retain |
| Views (`buttonView`) | button / icon / link, `button` | value cell matched against `BUTTON_VIEWS` (l.89) | none | Retain |
| Type (`linkType`) | primary / secondary / **tertiary** | collapsed into the link as `<strong>`/`<em>` (Type suffix), read by `readButtonOptions` (`utils/buttons.js:42-47`); tertiary needs `<strong><em>` which the collapse does not produce -> falls back to `primary` (l.90) | **Tertiary cannot be delivered** (suspected on AEM; 0 Canvas items use it) | Correct (rename the field `buttonVariant`, delivered as a cell, as Button Block does) |
| Icon (`buttonIcon`) | 4 icons, cond. view icon | first value not in the known lists (l.91-92) | positional guess; works | Retain |
| Alignment (`buttonAlignment`) | left / center / right, `left` | **only excluded from the icon guess (l.91), never applied** | no effect on Canvas buttons (verified by code) | Remove from the Canvas item model |

### D. Variations

| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Default | intro + menu + search + actions | verified 16 blocks on the library page | Retain |
| Secondary | gradient + filter tags | the filter list `<ul aria-label="Suggestions">` is always empty (only `setConversationCanvasFilters`, never called) | hide the list until it has items (D-D-23) |
| Primary (sticky) | floating dock + site navigation | dock only, authored intro / buttons ignored | conditions in the dialog |
| Journey: Floats and docks / Docks only / Decorative | floating | `canvas-journey.js` (unit tested) | Retain |
| Quick actions Auto / Pills / Buttons | button look | CSS | Retain |
| Title sizes, BG Style | look | BG Dark only on Primary | condition |

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Search label | programmatic label | visually hidden `<label for>` = placeholder text (l.220-222), verified "Ask us a question" | none | Pass |
| Search landmark | `role=search` / `<search>` | plain `<form>` | add `role="search"` (also makes the data-layer detection explicit) | Minor |
| Submit / voice buttons | names, state | submit aria-label (verified "Submit"); voice `aria-pressed` (l.241-264) | none | Pass |
| Search result / feedback (4.1.3) | something happens / status | nothing happens on submit (no handler) | D-D-19 | Fail |
| Menu disclosure (Default / Secondary) | button `aria-expanded` + `aria-controls`, Escape closes and returns focus | verified: Enter opens (116 links), Tab moves into the menu, Escape closes and focus returns to the toggle (l.323-328); focus leaving closes (l.332-334) | none | Pass |
| Primary dock panel | disclosure, Escape, focus order | toggles `aria-expanded`/`aria-controls` (l.497-504), Escape closes + focus to opener (l.547-552); **the panel is before the search row and the nav in the DOM (`dock.append(panel, row, nav)` l.396) while its toggles are in the nav: Tab from a toggle never reaches the opened panel (it is behind)** | move focus to the first panel link on open, or append the panel after the nav and order it visually with CSS | Fail 2.4.3 (D-D-20) |
| Dock menu button | one state attribute | switches between `aria-expanded` and `aria-pressed` depending on the page (l.527-533) | keep one pattern (`aria-expanded` + `aria-controls`) | Minor |
| Combobox / listbox | n/a | no autocomplete list: not a combobox (suggestions are separate buttons) — correct not to use `role=combobox` | none | Pass |
| Floating row obscuring focus (2.4.11) | focused items not hidden | `--conversation-canvas-obscured` + scroll-padding (controller l.133-136); hidden dock `inert` (l.118) | none | Pass |
| Empty list | no empty landmarks | empty "Suggestions" list on Secondary | D-D-23 | Minor |
| Headings | hierarchy | title always `h2` | optional level | Minor |
| Images | alt | background decorative, icon alt authored, voice icon decorative | none | Pass |
| Reduced motion | honoured | shared motion decorator; floating transitions in CSS | none | Pass |

### F. Data layer
- Block entries (`conversation-canvas-n` or anchor id); action buttons and menu links -> `cmp:click`; Secondary filter tags carry `data-cmp-interaction="filter"` / `data-cmp-value`.
- **Search**: the form contains `input[type=search]`, so `onSubmit` (`data-layer-decorator.js:148-152`) pushes `cmp:search` with `xdm:searchTerm` = the raw input (first 100 characters). Verified at runtime: the query "my email is jane.doe@example.com and phone 0123456789" was pushed verbatim. A conversational prompt ("Ask us a question") invites personal data (names, emails, phone numbers, client details); pushing it unfiltered is not data minimisation, and it will flow to Analytics as soon as Tags / Web SDK is added (D-D-18, privacy).
- Duplicate / empty events (verified): pressing Enter pushes `cmp:click` ("Submit", the implicit submit click) **and** `cmp:search`; an empty query still pushes `cmp:search` with `""` although the block ignores it (l.281-282) (D-D-18).
- Suggestion pills (`requestSubmit`, l.486-489) push `cmp:click` + `cmp:search` — expected.
- Ids: stable per page order; the footer Canvas id depends on the order of decoration (fragment) — acceptable.

### G. Personalization
Data source: `setConversationCanvasSuggestions` (Primary suggestions, l.586-588) and `setConversationCanvasFilters` (Secondary filters, l.596-616) are exported for a personalisation service, but **no runtime caller exists** (no Target / service loaded): Primary falls back to the page's tags, Secondary filters stay empty. Flag: personalization hooks without runtime behavior (documented in the README; keep, but hide the empty list).

### H. Decision
**Modify**: a search box that silently does nothing is the biggest issue (D-D-19); privacy of the search term (D-D-18); dock focus order (D-D-20); dialog conditions and labels (D-D-21); Canvas Button model split (D-D-22). Keep the journey architecture (well isolated and tested).

### Defects
- **D-D-18 (major, verified)** `decorators/data-layer-decorator.js:148-152`: `cmp:search` pushes the raw search text (PII verified at runtime), also for empty queries, plus a `cmp:click` for the implicit submit. Fix: (1) minimise: `const term = redact(input.value)` with `const redact = (s) => s.trim().replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[email]').replace(/\+?\d[\d\s().-]{5,}\d/g, '[number]').slice(0, 100);` and push only when `term` is non-empty; optionally (business decision) push `{ 'xdm:searchTermLength': n }` instead of the text for the conversational Canvas (`form.dataset.cmpSearch = 'length'`); (2) in `onClick`, skip `button[type=submit]` clicks whose form is a search form (`if (el.type === 'submit' && el.form?.querySelector('input[type="search"]')) return;`) so one search = one event. Document it in decorators/README.md (data layer section).
- **D-D-19 (major, verified)** `conversation-canvas.js:279-285`: no handler for `conversation-canvas:search`; submitting does nothing and gives no feedback. Fix: dispatch the event as cancelable (`new CustomEvent(…, { bubbles: true, cancelable: true, detail: { query } })`); if no integration called `preventDefault()`, navigate to a search page: a new block field `searchAction` (aem-content, default placeholder `searchPage` e.g. `/{locale}/search`) -> `window.location.assign(`${toSitePath(action)}?q=${encodeURIComponent(query)}`)`; until a search page exists, show a polite status ("Search is not available yet") next to the form instead of doing nothing.
- **D-D-20 (major, verified by code)** `conversation-canvas.js:396, 410-435`: Primary dock panel is rendered before its toggle in DOM order; keyboard users cannot reach the opened panel with Tab. Fix: `dock.append(row, nav, panel)` and CSS `order` (or `grid-row`) to keep it visually above, or in `openPanel` `list.querySelector('a')?.focus()` after showing it; keep Escape returning focus (already done).
- **D-D-21 (minor, verified)** `_conversation-canvas.json`: fields with no effect for the chosen style (BG Style on Default / Secondary; intro, background, icon, buttons on Primary; Navigation style on Default / Secondary) have no conditions; labels "water mark", "button icon type hover text", "Title Type", "BG Background Image"; UE placeholder "Statistic" for Title. Fix: conditions `{"===":[{"var":"classes"},"primary"]}` (BG Style, Navigation style) and `{"!==":[{"var":"classes"},"primary"]}` (intro fields, Background image); relabel as in C; placeholder "e.g. How can we help?". Names unchanged (content compatible).
- **D-D-22 (minor; Tertiary suspected, Alignment verified)** Canvas Button items reuse the built-in Button model (`model: button`): `linkType` collapses into the link and cannot carry Tertiary; `buttonAlignment` is never applied (`buildListButton` l.91). Fix: a dedicated model `conversation-canvas-button` (Link, Text, Title, Views, Variant `buttonVariant` primary/secondary/tertiary, Icon; no Alignment), the definition's `model` changed to it; `buildListButton` already finds the type among the value cells (l.90), so `buttonVariant` works without code change; old items keep `linkType` (bold/italic) as today.
- **D-D-23 (minor, verified)** `conversation-canvas.js:702-707`: Secondary renders an empty `<ul aria-label="Suggestions">` when no script fills it. Fix: create it `hidden` and unhide in `setConversationCanvasFilters` when `tags.length`.

---

## 7. Footer (`footer`, class `footer`) + Footer Link (`footer-link`)

### A. Overview
- Two roles, one block name (`footer.js:16-27`): the page footer (auto-built in `<footer>`; loads the inherited footer page, default `references/footer`, as a fragment, and appends the locale's Social Links sheet) and the authored Footer block on that footer page (Conversation Canvas page fragment + copyright + links).
- Files: `blocks/footer/footer.js` (140), `footer.css`, `_footer.json`; shared `blocks/fragment/fragment.js`, `motion-decorator.js` (`prepareMotion`), `button-decorator.js` (`removeButtonDecoration`), `content-decorator.js`, `editor-item-decorator.js`, `link-decorator.js` (`setLinkTarget`), `social-links-decorator.js`, `utils/cells.js` (`itemRows`), `utils/data.js`, `utils/inherited-metadata.js`, `utils/links.js`. No README.
- Not key-value: rows Conversation Canvas Page, Copyright Text, Link List (legacy multifield), then Footer Link items (2 cells: link with collapsed text, target).
- Usage: 3 footer blocks (3 pages), 9 Footer Links. No Additional tab (by convention, header and footer).

### C. Dialog validation

| Field (name) | Current values / default | Functional mapping (footer.js) | Issue | Decision |
|---|---|---|---|---|
| Conversation Canvas Page (`conversationCanvas`) | aem-content | `buildCanvas` l.64-74 (`loadFragment(resolvePagePath(value))`) | none | Retain |
| Copyright Text (`copyright`) | richtext, `{year}` token | `fromCell` + `fillYear` l.29-36, 91-96 | none | Retain |
| Link List (`links`) | container multi (linkText, link, linkTarget) | `readLinkItems(cell)` l.40 (legacy) | composite multifield (not reliable from packages, AGENTS "Item children"); description already says "use Footer Link" | Deprecate (hide; keep reading) |
| Footer Link: Link Path (`link`) | aem-content, required | `readLinkRows` l.39 | none | Retain |
| Footer Link: Link Title (`linkText`) | text | collapsed into the link text | label "Link Title" suggests the title attribute | Rename label "Link text" |
| Footer Link: Link Type (`linkTarget`) | '' / `new-window` | `setLinkTarget(link, newWindow)` l.52 | label "Link Type" is a target, not a type; **new-window links are not announced** | Rename "Open in"; announce (D-D-24) |

### D. Variations

| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Default footer page | locale footer | verified render: canvas fragment + copyright (2027 filled) + `nav[aria-label="Footer links"]` + social list | Retain |
| Campaign / Investors footer pages | inherited Footer property | `getInheritedMetadata('footer')` l.110 | Retain |
| Without Canvas | bar only | canvas row empty -> skipped | Retain |

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Landmark | `<footer>` contentinfo | aem.js `<footer>`; links in `nav[aria-label]` | none | Pass |
| New tab links (project rule, WCAG 3.2.5 advisory) | announced | verified: social links `target=_blank` with no hint; Footer Links `new-window` likewise (`setLinkTarget` only) | `announceNewTab(link, t('opensInNewTab', '(opens in a new tab)'))` | Fail (D-D-24) |
| Social icons | names | visually hidden "Follow us on X", icon `alt=""` | none | Pass |
| Social list | grouped / labelled | `<ul class="footer-social">` without label | `aria-label` from placeholder `followUs` | Minor |
| Redundant title | none | runtime: `<a href="#" title="Privacy &amp; Terms">Privacy &amp; Terms</a>` (title = text, from the authored link) | drop `title` equal to the text (as Canvas does, l.99) | Minor |
| Headings | — | none in the bar | none | Pass |

### F. Data layer
Two `footer` component entries (verified at runtime: `footer-1` page footer, `footer-2` authored block with `parentId: footer-1`) plus the footer Canvas; clicks via the central handler. Ids are order-based (`footer-n`), stable per template. Acceptable.

### G. Personalization
Experience container (the footer page chosen per page via the inherited Footer property). No personalization fields.

### H. Decision
**Retain** (minor: D-D-24, labels, deprecate the Link List multifield). Note: Footer and TCS Header are in the generic `section` filter, so authors can add them to any content page (no runtime harm; consider a separate filter for reference pages if the platform allows).

### Defects
- **D-D-24 (minor, verified)** `footer.js:49-57` and `decorators/social-links-decorator.js:44`: links opening a new tab are not announced (project accessibility rule). Fix: in `buildLinkList` after `setLinkTarget`: `if (newWindow) announceNewTab(link, t('opensInNewTab', '(opens in a new tab)'));` (pass `t` in); in `buildSocialLinks` add an optional `hint` parameter and call `announceNewTab(a, hint)` for external links (footer passes `t('opensInNewTab', …)`).

---

## 8. TCS Header (`tcs-header`, class `tcs-header`) and the auto-loaded header (`blocks/header`)

### A. Overview
- `blocks/header` (header.js 319, header.css 457, README): built by `aem.js` in `<header>`; loads the inherited Navigation page (`getInheritedMetadata('nav')`, fallback `references/nav`, l.222-228) as a fragment; sections = brand, menu, tools, or brand + tools from a TCS Header block on the nav page (`applyLogoBar` l.174-192); nav sections with a Conversation Canvas become `.nav-canvas` (l.243-306). Desktop (>= 1200px): logo bar only (the navigation is in the Canvas, product decision); tablet / mobile: full-screen menu, one level at a time. No model (not authorable as a block).
- `blocks/tcs-header` (tcs-header.js 42, css 70, README, `_tcs-header.json`): key-value logo bar (TCS logo + link, TATA logo + link). Used on the nav page (consumed by the header) or anywhere as a logo bar. Usage: 2 instances on 2 pages.

### C. Dialog validation (TCS Header)

| Field (name) | Current values / default | Functional mapping (tcs-header.js) | Issue | Decision |
|---|---|---|---|---|
| TCS Logo (`tcsLogo`) | reference | `pictureOf(props.tcslogo, …)` l.38, `a.tcs-header-brand` | none | Retain |
| TCS Logo Alt Text (`tcsLogoAlt`) | text, model value "Tata Consultancy Services" | **collapsed into the img alt (`…Alt` suffix): no `tcslogoalt` row exists** (verified in the rendered markup); `textOf(props.tcslogoalt)` l.19 is always empty | the README / code fallback "a logo without an image shows its alt text" cannot work (the alt is only delivered on an image) | Retain; remove the dead fallback (D-D-25) |
| TCS Logo Link (`tcsLogoLink`) | aem-content | `linkOf(...)` l.21 -> `<a href>` | none | Retain |
| TATA Logo / Alt / Link (`tataLogo`, `tataLogoAlt`, `tataLogoLink`) | reference / text "TATA Group" / aem-content | same (l.39) | same collapse note | Retain |
| Additional tab | 10 std (no animation fields) | std | fine for a logo bar | Retain |

### D. Variations

| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| On the nav page | header brand / tools | `applyLogoBar` moves `.tcs-header-brand` / `.tcs-header-group` into `nav-brand` / `nav-tools` sections | Retain |
| Positional nav page (no TCS Header) | legacy contract | sections 1-3 -> brand / sections / tools (header.js l.258-264); verified on the header block library page | Retain |
| Elsewhere | logo bar | CSS l.1-70 | Retain |
| Header Canvas | nav page section with a Canvas | `.nav-canvas`, out of flow | Retain |

### E. Accessibility (header + TCS Header)

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Menu button | `aria-expanded`, `aria-controls`, name | verified at 390: `aria-expanded=true`, label "Close navigation" when open; `aria-controls="nav-sections"` | none | Pass |
| Sub-levels | disclosure buttons | `nav-drop-toggle` with `aria-expanded` / `aria-controls` (l.114-127); linked labels keep the link + "Show {label} menu" button | none | Pass |
| Focus management | focus to the new level, back returns | verified: opening "What we do" focuses Back, title "What we do"; Back returns focus to the section button (l.154-161) | none | Pass |
| Escape | closes, focus to the menu button | verified (l.84-90) | none | Pass |
| Focus leaving closes | — | `closeOnFocusLost` l.96-100 | none | Pass |
| Overlay | page behind not reachable while the full-screen menu is open | body scroll locked only; `main` / `footer` stay in the accessibility tree (virtual cursor can leave the menu) | set `inert` on `main` and `footer` while open | Minor (D-D-26) |
| Landmark name | accurate | `nav[aria-label="Main navigation"]` holds only the 2 logo links on desktop (no navigation by product decision) | on desktop label it from a placeholder "Site header" or drop the label | Minor |
| Logos | link names | alt text names the link (TCS logo alt "Tata Consultancy Services") | none | Pass |
| Arrow keys / Home / End | optional for disclosure navigation | not implemented | none required | n/a |
| Journey interplay | floating Canvas hidden while menu open | verified `data-canvas-journey-state="hidden"` after opening (`header:menu` event l.80) | none | Pass |

### F. Data layer
`header-1` component entry (`dc:title` = "Menu", from the menu level `h2` — meaningless but harmless); clicks of logos and menu links via the central handler (menu buttons are `button` interactions). The TCS Header block on the nav page is moved into the header (its own block entry may be created before the move; not reproduced as duplicate: harness `dupComponents` 0).

### G. Personalization
Experience container (per-page Navigation page via inherited metadata). Not personalizable at field level.

### H. Decision
- `blocks/header`: **Retain** (minor D-D-26).
- TCS Header: **Retain** as the nav page's logo source (not a duplicate of the header; see below); minor D-D-25.

### Defects
- **D-D-25 (minor, verified)** `tcs-header.js:17-27` reads `props.tcslogoalt` / `props.tataLogoAlt`, which never exist (the `…Alt` fields collapse into the image), so the documented "alt text alone when there's no image" fallback is dead. Fix: drop `altCell` reads (`pictureOf(imageCell)`), and when there is no picture, fall back to placeholders `t('tcsLogo','Tata Consultancy Services')` / `t('tataLogo','TATA Group')` as link text; update the README.
- **D-D-26 (minor, verified by code)** `header.js:69-81`: while the full-screen menu is open (tablet / mobile) the page behind stays in the accessibility tree. Fix: in `toggleMenu`, `document.querySelectorAll('main, footer').forEach((el) => { el.inert = open; });` (reset on close and on the desktop change).

### Redundant block assessment: TCS Header vs header

| Existing blocks | Overlap | Unique capabilities | Existing usage | Decision | Target | Migration |
|---|---|---|---|---|---|---|
| TCS Header (block), header (auto-built) | both show the TCS / TATA logos | header: the site header (nav page fragment, menu, Canvas host, `--nav-height`, journey hand-off); TCS Header: authorable logo fields (image, alt, link) that the header consumes on the nav page; can also be a stand-alone logo bar | header on every page; TCS Header 2 (nav pages) | Not redundant: keep both (TCS Header is the header's authoring model) | — | Rename in the palette "Header logos (nav page)"; remove it from the generic `section` filter if a nav-page-only filter becomes available |

---

## 9. Default content: Text (`text`), Title (`title`), Image (`image`), Button (basic) (`button`)

### A. Overview
AEM built-in components (resource types `core/franklin/components/{text,title,image,button}/v1/...`), decorated by `scripts.js` / `decorators/content-buttons-decorator.js` (buttons), `decorators/responsive-image-decorator.js` (images). Filters: `section`, `columns-container` and `tabs` allow text / image / title / **button-block**; the Columns block's `column` filter (`blocks/columns/_columns.json:758`) still allows **`button`** (basic), because a Columns cell can hold default content only (no blocks).
Usage (content package, by resource type): text 634, image 47, title 928, Button (basic) 51 (the inventory's 103 for `button` mixes in the 51 Canvas Button items sharing the model, and its 0 for text / image is because these nodes carry no `model` property — same as the xwalk boilerplate, where the definitions' templates are `{}`).

### C. Dialog validation

| Component / Field (name) | Current values / default | Delivered by AEM? / mapping | Issue | Decision |
|---|---|---|---|---|
| Text (no model) | inline rich text | yes, the rich text | none | Retain |
| Title: Title (`title`) | text | yes, heading text | none | Retain |
| Title: Title Type (`titleType`) | h1–h6, no default | yes, the heading level | no default (AEM's default applies); h1 allowed anywhere (several h1 per page possible); option labels lower-case | Retain; add `"value": "h2"`, description "One H1 per page (usually the Page Header)" |
| Image: Image (`image`) + Alt Text (`imageAlt`) | reference + text | yes (`<picture>` + alt) | no "decorative" option: an empty alt is the only way, not explained | Retain; description "Leave empty only for decorative images" |
| Button (basic): Link / Text / Title (`link`, `linkText`, `linkTitle`) | aem-content + text + text | yes (link, text, title) | none | Retain |
| Button (basic): Type (`linkType`) | primary / secondary / **tertiary** | primary -> `<strong>`, secondary -> `<em>`; **tertiary not delivered** (rendered as a plain link -> `link-button` view by `content-buttons-decorator.js:34`) | verified: 10 package buttons with `linkType="tertiary"` (fragments cta-banner, tab-industries, foundations/button) render as text links | Correct (D-D-27) |
| Button (basic): Views (`buttonView`) | button / icon / link | **not delivered** | 7 package uses (icon 4, link 3) have no effect | Remove from the basic model (D-D-27) |
| Button (basic): Icon (`buttonIcon`) | 4 icons | **not delivered** | 4 uses (search) lost | Remove (D-D-27) |
| Button (basic): Alignment (`buttonAlignment`) | left / center / right | **not delivered** | 2 uses (center, right) lost | Remove (D-D-27) |

Title / Image / Text models have **no extra fields** beyond what AEM delivers (checked `models/_title.json`, `_image.json`, `_text.json`). The only undeliverable fields left are on the shared `button` model (PR #117 renamed the component but kept the model for the Canvas items, and it is still offered in Columns cells).

### D. Variations
Button (basic) types: Primary / Secondary work (bold / italic); Tertiary, Icon and Link views and Alignment do not (verified on the local render and by the delivery rule).

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Headings | one h1, ordered levels | free choice of h1–h6 | guidance in the field description | Authoring |
| Image alt | meaningful or empty for decorative | free text | description | Authoring |
| Buttons | links styled as buttons keep link semantics | `decorateButtons` keeps `<a>` | **every standalone content link gets `title` = its text (`content-buttons-decorator.js:19`)**: redundant tooltip / double announcement in some screen readers (seen in the footer links too) | Minor (D-D-28) |

### F. Data layer
Default content is not a component entry; links / buttons in `main` are captured as page clicks (`data-layer-decorator.js:106-107`).

### G. Personalization
Not personalizable individually (section / fragment level).

### H. Decision
Text, Title, Image: **Retain**. Button (basic): **Deprecate** for authoring (keep the resource type rendering for existing content); give the Columns cells a reduced basic model; migrate existing basic buttons that use undeliverable values to Button Block where blocks are allowed.

### Defects
- **D-D-27 (major, verified)** `models/_button.json` + `blocks/columns/_columns.json:758`: Button (basic) is still offered in Columns cells with Views, Icon, Alignment and Tertiary, none of which AEM delivers for the built-in Button; 51 basic buttons in the content package, 23 of them with undeliverable values (tertiary 10, view icon/link 7, alignment 2, icon 4). Fix: (1) split the model: `button` (basic, used by the core component) = Link, Text, Title, Type (Primary / Secondary only, `linkType`); new `conversation-canvas-button` model for the Canvas items (D-D-22); (2) content migration (script over the JCR / package): basic buttons outside Columns with `buttonView`, `buttonIcon`, `buttonAlignment` or `linkType=tertiary` -> Button Block (`buttonVariant = linkType`); inside Columns cells, map Tertiary to Secondary (closest deliverable) and drop icon/alignment, or move the CTA out of the Columns block into a Columns Container column with a Button Block. Backward compatible: unchanged rendering for Primary / Secondary.
- **D-D-28 (minor, verified)** `decorators/content-buttons-decorator.js:19`: `a.title = a.title || a.textContent` adds a title identical to the text to every standalone link. Fix: remove the line (keep authored titles); Button Block's description "when empty the Text is used" becomes "optional".

---

## 10. Button Block (`button-block`, class `button-block`, title "Button")

### A. Overview
Key-value block (PR #117) replacing the built-in Button for authors: link (+ collapsed Text, Title), View, Type (`buttonVariant`, a cell, so Tertiary is delivered), Icon, Alignment, Additional tab. Files: `blocks/button-block/button-block.js` (60), `.css` (16), README, `_button-block.json`; shared `button-decorator.js` (`decorateButton`, `setButtonAlignment`), `utils/buttons.js`, `utils/links.js`, `utils/properties.js`. Usage: 13 instances on 1 page (foundations/button-icons-and-alignment).

### C. Dialog validation

| Field (name) | Current values / default | Functional mapping (button-block.js) | Issue | Decision |
|---|---|---|---|---|
| Link (`link`) | aem-content | `linkOf(props.link)` l.24; empty -> nothing (editor hint `buttonBlockEmpty`) l.41-50 | none | Retain |
| Text (`linkText`) | text | collapsed link text; icon view -> `aria-label` (verified "View: Icon") | none | Retain |
| Title (`linkTitle`) | text | collapsed `title` | description "when empty the Text is used" relies on D-D-28 behaviour | Retain (reword) |
| View (`buttonView`) | button / icon / link, `button` (template = model = code l.22) | `decorateButton` view (verified `button primary`, `icon-button`, `link-button`) | none | Retain |
| Type (`buttonVariant`) | primary / secondary / tertiary, `primary`; cond. view button/icon | l.26 (verified `button tertiary`) | none | Retain |
| Icon (`buttonIcon`) | 4 icons, `arrow-right`; cond. view icon | l.27 (verified `--icon-url`) | none | Retain |
| Alignment (`buttonAlignment`) | left / center / right, `left` | `setButtonAlignment` l.55 | none | Retain |
| Additional tab (13 std) | std | std; not in `CONTENT_TARGETS` (whole block animates) | none | Retain |

### D. Variations
Views x Types x Icons x Alignment: verified rendering for all 13 examples (classes above).

### E. Accessibility

| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Name | text / aria-label for icon view | verified | none | Pass |
| Semantics | link | `<a>` kept | none | Pass |
| Focus visible | global button styles | `styles.css:482-486, 559-615` | none | Pass |
| New tab | announced | no target field (opens in the same tab) | none | Pass |

### F. Data layer
One component entry per Button Block (`button-block-n`) and its `cmp:click`. Many tiny components inflate the page's component list slightly (acceptable).

### G. Personalization
Selected fields (link / text) via fragment or Target offer; no personalization fields.

### H. Decision
**Retain** (target for all new buttons outside the Columns block).

### Redundant block assessment: Button (basic) vs Button Block

| Existing blocks | Overlap | Unique capabilities | Existing usage | Decision | Target | Migration |
|---|---|---|---|---|---|---|
| Button (basic), Button Block | a call to action link | Basic: allowed inside the Columns block cells (default content); Button Block: every option delivered (View, Tertiary, Icon, Alignment, Additional tab) | Basic 51 (23 with undeliverable values), Button Block 13 | Merge for authoring: Button Block everywhere blocks are allowed; Basic only in Columns cells with a reduced model | Button Block | D-D-27 migration script; keep the basic renderer for existing content |

---

## Summary of group D defects

| Id | Severity | Status | Component | One line |
|---|---|---|---|---|
| D-D-1 | critical | verified (AEM-faithful render) | Form Variations | Items need a "type cell" from the `classes` field, which is never delivered: the published form is empty |
| D-D-2 | major | verified (package) | Form Variations items | Item field `name` overwrites the item's JCR `name` (template name); rename to `fieldName` |
| D-D-3 | major | verified | Form Variations | No submit endpoint/listener, yet "Thank you, your details were sent." is announced and the data discarded |
| D-D-4 | minor | verified | Data layer / Form | `cmp:submit` pushed for invalid submits; `dc:title` always the block name |
| D-D-5 | minor | verified | Consent checkbox | Mandatory defaults to false |
| D-D-6 | minor | verified | Form Variations | Conditional fields / contact cards appear unannounced |
| D-D-7 | minor | verified | Form Variations | Counter "0/1500" not understandable to screen readers |
| D-D-8 | minor | verified | Embed | Generic iframe title "Content from {host}" and Play button "Play" |
| D-D-9 | minor | suspected (AEM) | Embed | Bare URL without `<a>` empties the block |
| D-D-10 | minor | verified | Embed | YouTube without privacy-enhanced mode, Vimeo without dnt, X widget loaded eagerly |
| D-D-11 | minor | verified | Video | Play in a Pop-up has no condition (ignored for autoplay/background) |
| D-D-12 | minor | verified (code) | Video | Click playback without poster and with controls off: no way to start/pause |
| D-D-13 | minor | suspected | Video / Data layer | Autoplay and out-of-view pause/play reported as user `cmp:media` events |
| D-D-14 | minor | verified (code) | Table | Changing Columns leaves ragged rows; "Column1" labels / template text |
| D-D-15 | minor | verified | Separator | Width "Auto (as the variant)" = 100%, not the variant |
| D-D-16 | minor | verified | Separator | Variant "Custom" renders identically to Default |
| D-D-17 | minor | verified | Separator | Duplicate controls (contrast vs colour, max content vs respect max, stretch vs 100%, Component ID vs Anchor ID) |
| D-D-18 | major | verified | Data layer / Canvas | `cmp:search` pushes the raw query (PII verified), empty queries, and a duplicate `cmp:click` |
| D-D-19 | major | verified | Conversation Canvas | Search submit does nothing (no listener, no fallback, no feedback) |
| D-D-20 | major | verified (code) | Conversation Canvas | Primary dock panel precedes its toggles in DOM: not reachable with Tab |
| D-D-21 | minor | verified | Conversation Canvas | Style-dependent fields without conditions; jargon labels; "Statistic" placeholder |
| D-D-22 | minor | verified / suspected | Canvas Button | Shared `button` model: Alignment never applied, Tertiary not deliverable |
| D-D-23 | minor | verified | Conversation Canvas | Empty "Suggestions" list on Secondary |
| D-D-24 | minor | verified | Footer | New-tab footer and social links not announced |
| D-D-25 | minor | verified | TCS Header | Alt fields collapse into images; documented no-image fallback is dead code |
| D-D-26 | minor | verified (code) | Header | Page behind the full-screen menu not inert |
| D-D-27 | major | verified | Button (basic) | Still offered in Columns cells with undeliverable View / Icon / Alignment / Tertiary; 23 of 51 package buttons affected |
| D-D-28 | minor | verified (code) | Content buttons decorator | Every standalone link gets a redundant `title` = text |

Redundant block assessments: Embed vs Video (keep both; Video for videos), Table vs Table List (not redundant), TCS Header vs header (not redundant), Button (basic) vs Button Block (merge for authoring into Button Block).
