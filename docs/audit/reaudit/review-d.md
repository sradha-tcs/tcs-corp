# Re-audit group D (second, fresh audit): forms, media, table, separator, Canvas, chrome, default content, shared decorators

Reviewer: group D (re-audit). Repository read-only (branch `fix/block-reaudit`, HEAD 19ff770). Evidence files: `/tmp/audit2/d/` (published `.plain.html` dumps of aem.page, Playwright scripts `pw.mjs`, `form.mjs`, ...).
Legend: **verified** = reproduced at runtime (aem.page = current code + content package 1.0.6, or local preview = package 1.0.8 model) or proven by reading the code path end to end; **suspected** = plausible from code, not reproduced. Analytics / consent / personalization runtime: **BLOCKED** (no Tags / Web SDK / Target installed).
The standard Additional tab (`classes_anchor`, `classes_hideblock`, `classes_animation*`, `classes_padding*`, `classes_margin*`) is identical to the other groups and only listed when it differs.

---

## 1. Form Variations (`form-variations`, class `form-variations`) + items `field-text`, `field-select`, `field-textarea`, `field-checkbox`, `contact-card`, `field-submit`

### A. Overview
- Purpose: an authored lead / contact form: item children (text input, dropdown, textarea, consent checkbox, region contact card, submit button), conditional fields ("Show only if dropdown value equals"), validation with inline errors, and a Submit action (POST JSON) or an integration event.
- Files: `blocks/form-variations/form-variations.js` (531 lines), `.css` (299), `_form-variations.json`; shared `decorators/button-decorator.js` (`decorateButton`), `content-decorator.js` (`fromCell`), `heading-decorator.js` (`buildHeading`), `utils/links.js`, `utils/properties.js`, `utils/ids.js`, `utils/placeholders.js`, `utils/environment.js`. No README, no unit test.
- Not key-value: rows = Content tab (empty), Form Title, Form Description, Submit action (package 1.0.8 only), Additional tab (empty), then item rows. `readProperties` (l.82-92) skips the first empty tab row; `readItem` (l.61-75) reads the item type from the first cell "<name>, <classes>".
- Delivered item rows on aem.page (verified, `/tmp/audit2/d/form-variations_form-variations.plain.html`): `firstname, field-text | First name | text | true | (dependsOn)`; `contact-card-output, contact-card | India | ...`; `submit-button, field-submit | Send | `. The field key travels in the first cell, **converted to class-name form** (authored `name="firstName"` in the package XML -> delivered `firstname`; see R-D-1).

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-1 (critical) | **Confirmed fixed** (verified on aem.page) | `readItem` l.61-75 reads `"<key>, <type>"`, legacy `"<type>"` and `data-aue-model`; Playwright on aem.page: all 14 forms of `block-library/form-variations/form-variations` render their controls (e.g. form 1: select region, inputs firstname / lastname / email, textarea, checkbox, submit), contact cards present (form 3: 1, form 13: 2). No unit test of `readItem` was added (the fix recommended one) |
| D-D-2 (major, Deferred) | **Still open, re-assessed: now cheap enough and it causes R-D-1** | the key is still the item's `name` (`_form-variations.json` field-text / select / textarea / checkbox `name`); exact fix in R-D-1 |
| D-D-3 (major) | **Confirmed fixed** (verified) | submit handler l.494-521: cancelable `form-variations:submit`, else POST to Submit action, else `formNotConnected`; aem.page: valid submit -> status "This form isn’t connected yet: your details weren’t sent.", values kept, focus on the status, 0 POST requests |
| D-D-4 (minor) | **Confirmed fixed (invalid submits)**, second half not done | `data-layer-decorator.js:170` skips invalid `novalidate` forms (verified: empty submit pushes only `cmp:click`); `dc:title` still `aria-label || id || block name` (l.174) -> `"form-variations"` for every form (verified), see R-D-3 |
| D-D-5 | **Confirmed fixed** | field-checkbox model `required` value `true` and template `"required": true` |
| D-D-6 | **Confirmed fixed** | `change` handler l.468-474 sets the status "More fields are shown below." when a select reveals fields / cards (not in the editor) |
| D-D-7 | **Confirmed fixed** | counter l.269-284: `aria-hidden` "0/1500" + visually hidden "{count} of {max} characters" (`charactersCount`) |

### C. Dialog validation
Block model `form-variations`:

| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Form Title / Heading (`formHeading`) | text | `readProperties` l.82-92 -> `buildHeading(..., 'h2')` l.453; id -> form `aria-labelledby` l.458-461 | fixed h2 | Retain |
| Form Description (`formDescription`) | richtext '' | `fromCell(..., 'form-variations-description')` l.455-457 | not linked to the form (`aria-describedby`) | Retain (minor) |
| Submit action (`formAction`) | aem-content | `linkOf(actionCell)` href, else text, l.449-450; `fetch(action, POST JSON {data})` l.509; editor note `formNoAction` l.522-527 | no double-submit guard (R-D-2) | Retain |
| Theme (`classes`) | '' / `dark` | block class, CSS `.form-variations.dark` | none | Retain |
| Background animation (`classes_bganimation`) | None + 6 | `motion-decorator.js` BACKGROUNDS | visible only with Dark (no own background otherwise) | Retain |
| Additional tab | std | std | none | Retain |

Item models (cells after the "<key>, <type>" cell):

| Item / Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| all: Field type (`classes`) | read-only text = item id (template + model value) | second token of cell 1, `readItem` l.63-64 | none | Retain |
| Text / Select / Textarea / Checkbox: Field Name / ID (`name`) | text, required; description "Submitted as the field key, e.g. firstName" | node `name` property, delivered in cell 1 **lower-cased / hyphenated** (`firstName` -> `firstname`), l.67-70 -> `input.name`, `id`, autocomplete, half width | the key authors type is not the key submitted (R-D-1, verified); UE tree shows the key instead of the item title (D-D-2) | Modify (R-D-1) |
| Text: Field Label (`label`) | text, required | `createLabel` l.109-125 | none | Retain |
| Text: Input Type (`inputKind`) | text / email / tel, `text` | `input.type` l.211; autocomplete l.139-144 | no `pattern` for tel | Retain |
| Text: Mandatory (`required`) | boolean false | `setRequired` l.127-130 | none | Retain |
| all: Show only if dropdown value equals (`dependsOn`) | text | `data-depends-on`, `updateVisibility` l.385-403 (case-insensitive, any dropdown; hidden = disabled, not required) | exact option text needed (described) | Retain |
| Select: Options (`options`) | text, comma separated | `<option>` l.240-245 | comma in a label impossible | Retain |
| Textarea: Max Character Limit (`maxLength`) | number 1500 | `maxLength`, counter l.257-284 | none | Retain |
| Checkbox: Consent Text (`label`) | richtext, required | moved into the `<label>` with its links l.308-316 | none | Retain |
| Checkbox: Mandatory (`required`) | boolean **true** (D-D-5) | l.303 | none | Retain |
| Contact Card: region / contactName / emails / phones | text | `buildContactCard` l.328-357 (`mailto:` / `tel:`) | none | Retain |
| Submit: Button Label (`label`) | text, template/model `Send` | l.364 (fallback placeholder `send`) | the stored template value "Send" bypasses the `send` placeholder for new items (localisation by translation only); AGENTS "no sample content in templates" | Retain (low) |

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Default theme | light form | aem.page: forms 1, 2, 4-14 render | Retain |
| Dark | dark panel | aem.page form 3 `form-variations dark` renders, contact card present | Retain |
| Conditional field / contact card | progressive disclosure | aem.page form 12: `sectorother` hidden + disabled until the option is chosen; form 13: 2 cards | Retain |
| Half / full width | layout | from the key containing "name" (l.206); since keys are lower-cased, `contactPerson` -> `contactperson` stays full width (correct), `companyName` -> `companyname` half width | Retain (documented in the field description) |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Labels | every control labelled | `<label for>` (verified 14 forms: labels "First name*", ...) | none | Pass |
| Form name | form named | `aria-labelledby` = title id l.458-461 | none | Pass |
| Required | attribute + explained marker | `required`, `*` aria-hidden, "* Required fields" note l.476-481 | none | Pass |
| Errors (3.3.1 / 3.3.3) | next to field, linked, specific | verified on aem.page: empty submit -> 5 `aria-invalid` fields each `aria-describedby=<id>-error` "This field is required.", focus on the first invalid (`form-variations-1-region`) | none | Pass |
| Status (4.1.3) | result announced, true | `p[role=status][tabindex=-1]` l.463-466 set then focused l.520 (verified "not connected" message, focus on it) | focusing a live region can double-announce (low) | Pass |
| Conditional content | announced | status "More fields are shown below." l.473 | none | Pass |
| Counter | understandable | visually hidden "{count} of {max} characters" | none | Pass |
| Busy state | submit not repeatable while sending | `aria-disabled` + `aria-busy` only, the button still submits (R-D-2) | guard | Minor |
| Autocomplete (1.3.5) | input purpose | `autocompleteOf` (verified given-name, family-name, email, tel, organization) | none | Pass |
| Keyboard / focus visible | native | native controls; `:focus-visible` ring | none | Pass |
| Ids | unique | `createIdFactory(uniqueId('form-variations'))` (verified `form-variations-1-…` … `-14-…`) | none | Pass |

### F. Data layer
- Block entry (`anchor-fv-main` etc., anchor id as id). Submit button: `cmp:click` `dc:title: Send` on every attempt (by design).
- `cmp:submit` (`data-layer-decorator.js:160-177`): **field names only, no values** (verified: `fields: [region, firstname, lastname, email, message, consent]`); invalid attempts are not pushed (verified). Good minimisation.
- Accuracy (R-D-3): `cmp:submit` is pushed in the capture phase before the block knows the outcome, so "not connected" (verified) and failed POSTs are counted as submissions; `dc:title` is always `form-variations` (the form uses `aria-labelledby`).
- `onChange` captures only `[data-cmp-interaction]` controls: no dropdown values of this form are pushed (verified none). Contact `mailto:` / `tel:` links push authored business addresses (`xdm:linkURL`), not visitor data: acceptable.

### G. Personalization
Entire block (fragment / offer swap). Contact cards are rule-based, not personalization. No personalization fields.

### H. Decision
**Retain / Modify (minor)**: the critical D-D-1 and the false success (D-D-3) are fixed and verified on aem.page with older content (backward compatible). Remaining: the submitted keys differ from the authored keys (R-D-1, tied to deferred D-D-2), a double-submit guard (R-D-2), measurement accuracy (R-D-3), a unit test for `readItem`.

### New defects
- **R-D-1 (major, verified)** `blocks/form-variations/form-variations.js:61-71` + `_form-variations.json` (field `name` of field-text / select / textarea / checkbox, description "Submitted as the field key, e.g. firstName"). AEM delivers the item's `name` property in the first cell in class-name form: package XML `name="firstName"` / `name="lastName"` -> aem.page cell `firstname, field-text` / `lastname, field-text`; Playwright: `input name=firstname`, `cmp:submit fields [firstname, lastname]`; a "Full name" field authored `contactPerson` is delivered `contactperson`. Any Submit action or integration mapping the documented keys (`firstName`, `first_name`, `Company Name`) receives `firstname`, `first-name`, `company-name`. This is D-D-2's root cause, now with a functional impact. Fix (backward compatible, resolves D-D-2 too): (1) model: rename the four `name` fields to `fieldName` (same label / description; "letters, digits, - or _"), so the key is a real cell and the node `name` stays the template name; (2) code, in `readItem` for `KEYED_TYPES`: the new rows have one cell more than the legacy ones, so
  ```js
  const FIELD_COUNT = { 'field-text': 5, 'field-select': 5, 'field-textarea': 5, 'field-checkbox': 4 };
  // new model: "<template name>, <type>" then fieldName, label, ...
  if (fields.length >= FIELD_COUNT[type]) return { type, cells: fields };
  // older items: the key is the delivered (class-name) node name
  return { type, cells: [textCell(TEMPLATE_NAMES.includes(key) ? '' : key), ...fields] };
  ```
  (in Universal Editor the same counts apply, `data-aue-model` rows without a type cell already have `fieldName` first). Existing items keep working with their lower-cased keys until re-authored; state this in the field description ("existing fields: the key is submitted in lower case") and add `test/form-variations/read-item.test.mjs` with the three row shapes (legacy type cell, `key, type`, `template, type` + fieldName cell). Needs one aem.page check after the model change (a new item, verify the `fieldName` cell is delivered).
- **R-D-2 (minor, verified by code)** `form-variations.js:494-518`: while the POST is in flight the button only gets `aria-disabled` (not `disabled`), so a second click / Enter sends the data again (duplicate leads). Fix: first line of the submit handler after `e.preventDefault()`: `if (form.getAttribute('aria-busy') === 'true') return;` (keeps the button focusable, no visual change).
- **R-D-3 (minor, verified)** `decorators/data-layer-decorator.js:169-176`: `cmp:submit` is pushed before the outcome is known (verified on aem.page: pushed for a form that showed "not connected" and sent nothing) and `dc:title` is always `form-variations`. Fix: (a) `dc:title`: `form.getAttribute('aria-label') || document.getElementById(form.getAttribute('aria-labelledby'))?.textContent.trim() || form.id || nameOf(blockOf(form))`; (b) outcome: let forms that report their own result opt out with `data-cmp-submit="custom"` (`if (form.dataset.cmpSubmit === 'custom') return;` in `onSubmit`) and in Form Variations push `pushComponentEvent('cmp:submit', componentIdOf(block), { 'dc:title', fields, status: 'sent' | 'failed' | 'not-connected' })` from `succeed` / `fail`. Business decision whether failed / not-connected attempts are measured (no measurement plan: BLOCKED).
- **R-D-4 (minor, verified by code)** `form-variations.js:499-502`: an integration that cancels `form-variations:submit` makes the block reset the form and announce "Thank you, your details were sent." synchronously, before the integration has sent anything and without a way to report a failure (the D-D-3 false-success pattern, for integrations). Fix: pass a settle hook in the event detail: `detail: { data, respondWith(promise) { pending = promise; } }`; after dispatch `if (handled) { try { await (pending || Promise.resolve()); succeed(); } catch { fail('formError', …); } }`; document it in the header comment. Backward compatible (integrations that ignore `respondWith` behave as today).

---

## 2. Embed (`embed`, class `embed`)

### A. Overview
- Purpose: Block Collection Embed: YouTube, Vimeo, X / Twitter posts or any URL as an iframe, optionally behind a placeholder image with a Play button (click to load).
- Files: `blocks/embed/embed.js` (110), `embed.css` (55), `_embed.json`; shared `decorators/media-decorator.js` (`createFrame`, `createYoutubeFrame`, `createVimeoFrame`), `decorators/icon-button-decorator.js`, `utils/media.js`, `utils/viewport.js` (`onVisible`), placeholders. No README.
- Not key-value: rows = Content tab (empty), the `embed_` element group in one cell (picture + URI link), Additional tab (empty) (verified on aem.page, `/tmp/audit2/d/embed_embed.plain.html`). Usage: 6 instances (block library).

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-8 | **Confirmed fixed (Play button)**; iframe title unchanged as recorded | `embed.js:96-99` Play label "Play video: {alt}" when the placeholder alt exists; iframe `title` still "Content from {host}" l.68 |
| D-D-9 | **Confirmed fixed** | `embed.js:86-87` link, else the first `https?://` text |
| D-D-10 | **Confirmed fixed** | YouTube `privacy: true` l.43 (`youtube-nocookie.com`), Vimeo `dnt: '1'` l.52; X `widgets.js` only when the embed loads (after Play with a placeholder, else when visible) l.30, l.102, l.108 |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Placeholder Image (`embed_placeholder`) | reference | `block.querySelector('picture')` l.84 -> wrapper + Play l.92-106 | none | Retain |
| Placeholder Image Alt Text (`embed_placeholderAlt`) | text '' | collapsed into `img alt`; names the Play button l.96-98 | no description; the library alts start with "Video: …" so the button reads "Play video: Video: how enterprises …" (verified markup) and the image alt is read again before the button | Retain; description "Describes the content, e.g. How enterprises scale AI (the Play button adds “Play video”)" |
| URI (`embed_uri`) | text | link / text URL l.86-87; provider by host l.34-62 | `player.vimeo.com/video/ID`, `vimeo.com/channels/x/ID` and unlisted `vimeo.com/ID/HASH` URLs build a broken player (R-D-5, shared with Video) | Modify (R-D-5) |
| Additional tab | std | std | none | Retain |

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| YouTube / Vimeo with placeholder | click to load | Play button, iframe after click, focus into it (l.76) | Retain |
| Without placeholder | lazy load | `onVisible` -> iframe, no autoplay | Retain |
| X / Twitter | social post | blockquote + widgets.js | Retain |
| Generic iframe | any URL | `createFrame` titled "Content from {host}" | Retain |
| Desktop / Tablet / Mobile examples | — | identical markup (no breakpoint option) | Documentation only |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Play button name | names the content | "Play video: {alt}" (also for an X post placeholder, where "Play video" is wrong) | for the twitter provider use `t('showPost', 'Show post: {title}')` | Minor |
| iframe name | descriptive | "Content from youtube.com" | as recorded (D-D-8 remainder) | Partial |
| Focus after Play | into the player | l.76 | none | Pass |
| Keyboard | native button | `createIconButton` | none | Pass |
| Moving content | user-started | autoplay only after the click | none | Pass |

### F. Data layer
Block entry; Play `data-cmp-interaction="play"` -> one `cmp:click` (`dc:title` = the button label from the authored alt). No player events (cross-origin). Minimal, no personal data.

### G. Personalization
Entire block (URL swap). No fields.

### H. Decision
**Retain** (non-video embeds; Video stays the target for videos). Fix the shared Vimeo URL parsing (R-D-5).

### New defects
- **R-D-5 (minor, verified with node on `utils/media.js`)** `utils/media.js:42-48` `vimeoEmbedUrl` takes the first path segment as the id: `https://player.vimeo.com/video/76979871` -> `https://player.vimeo.com/video/video`, `https://vimeo.com/channels/staffpicks/76979871` -> `.../video/channels`, and an unlisted `https://vimeo.com/76979871/abc123def` loses its privacy hash (the player refuses unlisted videos without `h=`). Used by Embed and Video. Fix:
  ```js
  export function vimeoEmbedUrl(url, params = {}, { start = 0 } = {}) {
    const parts = url.pathname.split('/').filter(Boolean);
    const at = parts.findIndex((p) => /^\d+$/.test(p));
    const video = at >= 0 ? parts[at] : parts[0] || '';
    const src = new URL(`https://player.vimeo.com/video/${encodeURIComponent(video)}`);
    const hash = url.searchParams.get('h')
      || (at >= 0 && /^[\da-f]+$/i.test(parts[at + 1] || '') ? parts[at + 1] : '');
    if (hash) src.searchParams.set('h', hash);
    Object.entries(params).forEach(([key, value]) => src.searchParams.set(key, value));
    if (start > 0) src.hash = `t=${Math.floor(start)}s`;
    return src.href;
  }
  ```
  Backward compatible (`vimeo.com/ID` unchanged); add the cases to a `test/media/media.test.mjs`. (Low, same file: the `t=` start of a shared YouTube URL is dropped by `youtubeEmbedUrl`; map it to `start` when no Start At is set.)

---

## 3. Video (`video`, class `video`)

### A. Overview
- Purpose: an AEM Assets video file, YouTube or Vimeo, with poster + Play, autoplay in view, background video (pause toggle), pop-up, WebVTT captions, caption, transcript link, privacy mode.
- Files: `blocks/video/video.js` (375), `video.css` (140), `_video.json` (3 tabs Video / Playback / Additional); shared `media-decorator.js`, `icon-button-decorator.js`, `button-decorator.js`, `content-decorator.js`, `image-decorator.js` (`pictureOf`), `utils/media.js`, `utils/viewport.js`, `utils/links.js`, `utils/properties.js`, `blocks/modal/modal.js`. No README.
- Key-value (`readFields` l.67-80), with a one-row-per-field fallback and the legacy link + picture model (l.86-126).

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-11 | **Confirmed fixed** | `openInModal` condition `playback === click` (`_video.json`) |
| D-D-12 | **Confirmed fixed** (verified) | `video.js:341-352` no-poster click playback keeps the controls (`{ ...config, controls: true }`); aem.page: every click video without poster has `controls: true` |
| D-D-13 (Deferred) | **Still open; cheap and safe now** | `pauseOffscreen` l.248-259 calls `pause()` / `play()`, and `onMedia` (`data-layer-decorator.js:148-158`) reports them as visitor `cmp:media`; an autoplay file without Loop also reports its automatic `play`. Exact fix: in `pauseOffscreen` set `video.dataset.cmpAuto = 'true'` before `video.pause()` / `video.play()`; for autoplay file players set it once in `buildPlayer` (`if (autoplay && !started) video.dataset.cmpAuto = 'true'`); in `onMedia`: `if (media.dataset.cmpAuto) { delete media.dataset.cmpAuto; return; }`. Not counting non-visitor actions needs no measurement plan |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (video.js) | Issue | Decision |
|---|---|---|---|---|
| Video (`uri`) | aem-content, required | `urlOf` l.49, l.96; provider by host l.144-168, else `<video>` | **AEM Assets file links stay `/content/dam/...` on Edge Delivery and 404** (R-D-6, verified: all 24 videos of the aem.page library page, `networkState 3`, console 404s) | Modify (R-D-6) |
| Title (`label`) | text | iframe `title` / video `aria-label`, Play label l.322-323; fallback `video` l.304 | none | Retain |
| Caption (`caption`) | richtext | `fromCell` l.296 | none | Retain |
| Transcript (`transcript`) | aem-content | link l.310-320 ("Read the transcript" for URL texts) | none (same tab) | Retain |
| Poster Image (`poster`) + alt (`posterAlt`) | reference + text '' | `pictureOf(props.poster \|\| props.placeholder \|\| props.placeholderimage, …)` l.92-95; Play button, file `poster` | description duplicated: "Shown before the video plays, with a play button Shown before the video plays (Click playback)." (`_video.json:71`); **the fallback to the former `placeholder_image` rows is dead: AEM never delivered that group** (R-D-7, verified) | Modify (R-D-7) |
| Captions File (`captions`), Language, Name | aem-content / text / text | `<track>` l.116-118 | same DAM 404 as R-D-6 for `.vtt` | Retain |
| Privacy-enhanced Mode (`privacyMode`) | boolean true | l.124, nocookie / dnt | none | Retain |
| Playback (`playback`) | click / autoplay / background, `click` | l.106-108; reduced motion -> click l.325 | none | Retain |
| Muted / Loop / Show Player Controls | booleans | l.109-111, l.140-142 | none | Retain |
| Start At / End At | numbers | l.112-113, l.153-154, Vimeo `#t=` | End ignored for Vimeo (not described) | Retain (description) |
| Play in a Pop-up (`openInModal`) | boolean false, cond. click | l.114, `playInModal` l.262-270 | dialog named "Dialog", opener not passed, double click opens two dialogs (R-D-8) | Modify (R-D-8) |
| Pause When Out of View (`pauseOffscreen`) | boolean true | l.372 (files only) | D-D-13 | Retain |
| Aspect Ratio / Size / Alignment / Rounded | selects / boolean | classes + `--video-aspect-ratio` l.301-303 (verified on aem.page) | none | Retain |
| Additional tab | std | std | none | Retain |

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Click with poster | default | Play "Play video: {title}" (1.0.8 content) | Retain |
| Click without poster | native player | controls forced (aem.page verified) | Retain |
| Autoplay without controls / background | muted loop | `controls:false muted:true`, toggle "Pause video" (aem.page verified, 6 blocks) | Retain |
| Pop-up | dialog | `createModal` | R-D-8 |
| Sizes / ratios / alignment / rounded | layout | classes verified on 24 blocks | Retain |
| Legacy link + picture | backward compatibility | `anchor-video-legacy` renders (aem.page) | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Player name | title | iframe title / video `aria-label` | none | Pass |
| Pause (2.2.2) | moving content can be paused | toggle for autoplay without controls and background (verified "Pause video") | none | Pass |
| Reduced motion | no autoplay | l.325 | none | Pass |
| Background decorative | hidden | `aria-hidden`, iframe `tabindex=-1` l.367-370 | none | Pass |
| Focus after Play | into the player | `focusWhenLoaded` l.185-192 | none | Pass |
| Pop-up dialog | named, focus returns | `aria-label="Dialog"`; `showModal()` without opener (Safari: focus not returned) | R-D-8 | Minor |
| Captions (1.2.2) | available | optional field | authoring | Partial |

### F. Data layer
`cmp:media` (play / pause / ended, `xdm:mediaURL`, position) for files except background loops; toggle `cmp:click` (`playback`); pop-up `cmp:show` / `cmp:hide` (modal). No personal data. D-D-13 (automatic play / pause counted) still open (fix above).

### G. Personalization
Entire block / `uri` + poster swap. No fields.

### H. Decision
**Retain / Modify**: R-D-6 (DAM files not playable on Edge Delivery) is the main functional gap; R-D-7 restores the posters of older videos.

### Backward compatibility (aem.page, package 1.0.6)
Verified with Playwright on `block-library/video/video`: all 24 blocks render (classes, ratios, sizes, toggles, transcript); the older videos with the former `placeholder_image` poster render **without poster** (0 of 24 have a `.video-placeholder img`; the delivered rows contain no poster / placeholder key at all), i.e. they fall back to "click without poster" (native player with controls): no breakage, but the authored posters are lost until migrated (R-D-7).

### New defects
- **R-D-6 (major, verified on aem.page)** `video.js:49, 96, 170` + `media-decorator.js` `createVideoElement`: an AEM Assets video picked in the Video field is delivered as `/content/dam/tcs-corp/.../sample-video.mp4`; Edge Delivery doesn't serve DAM binaries (paths.json maps only the `/content/tcs-corp/...` pages), so every file video and every WebVTT captions file 404s (24 / 24 on the library page). YouTube / Vimeo are unaffected. Fix: resolve DAM paths to the publish (or Assets delivery) host: add `utils/media.js` `assetUrl(href)` returning `new URL(pathname + search, assetsHost).href` when the path starts with `/content/dam/` and the page isn't in the editor (`assetsHost` from `getMetadata('assets-host')`), use it in `readConfig` for `link` and `captions`; set `assets-host` (e.g. `https://publish-pXXXX-eYYYY.adobeaemcloud.com`) in `head.html` or the bulk metadata, and say it in the field description. Until configured, show an editor hint instead of a dead player. Backward compatible (absolute URLs unchanged).
- **R-D-7 (minor, verified on aem.page)** `video.js:91-95`: `props.placeholder || props.placeholderimage` / `props.placeholderimagealt` can never exist (the `placeholder_` element group isn't delivered in key-value blocks, AGENTS delivery rule 3): videos authored before the `poster` rename have lost their poster on the published page. Fix: idempotent JCR content migration: for every `model="video"` node with `placeholder_image` and no `poster`, set `poster = placeholder_image`, `posterAlt = placeholder_imageAlt`, remove the old properties; then drop the dead fallback in `readConfig` and fix the duplicated description at `_video.json:71` ("Shown before the video plays, with a play button (Click playback).").
- **R-D-8 (minor, verified by code)** `video.js:262-270`: the pop-up dialog is named "Dialog" (`modal.js` falls back to `aria-label` `dialog` because the wrapper has no heading), focus returns via `document.activeElement` only (Safari doesn't focus clicked buttons, so focus is lost on close), and a double click opens two dialogs. Fix: `playInModal(config, opener)`: return when `opener.dataset.opening` is set, else set it; prepend a visually hidden heading (`hideVisually(document.createElement('h2'))` with `config.title`) to the wrapper so the dialog gets `aria-labelledby`; call `showModal(opener)` and delete `opener.dataset.opening`; `buildPoster` passes `e.currentTarget` to `onPlay`.

---

## 4. Table (`table`, class `table`) + Row (`table-row`, `table-col-2` … `table-col-5`) and the `table-N-columns` filters

### A. Overview
- Purpose: a data table authored as Row items; the dialog's Columns select is the block's `filter` (`table`, `table-2-columns` … `table-5-columns`), which decides the Row model (1-5 rich text cells) new rows get.
- Files: `blocks/table/table.js` (81), `table.css` (74), `_table.json`; `utils/ids.js`, placeholders. No README.
- Not key-value: AEM delivers **two empty tab rows** (Content, Additional) before the rows (verified on aem.page, `/tmp/audit2/d/table_table.plain.html`); `isTabRow` / `firstRow` l.32-36 skip them.

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-14 | **Confirmed fixed (ragged rows)**; the label / template part not done | `table.js:53-57` pads every row to the widest (verified on aem.page: one width per table, 12 tables); Row labels still "Column1" … and the definitions still store `column1text: "Column1"` … (`_table.json:29, 45`, …): see R-D-9 |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Options (`classes`) | multiselect: Border group Striped / Bordered, Header group No Header / First Column Header | `no-header` l.29, `row-header` l.30; CSS striped / bordered | group "Border" contains "Striped" | Retain (rename group "Style") |
| Columns (`filter`) | `table` … `table-5-columns` | the Row model of new rows (component-filters) | existing rows keep their columns (padded since D-D-14) | Retain |
| Row: Column1 … Column5 (`column1text` …) | richtext; **template values "Column1" … "Column5"** | cells -> `th` / `td` l.41-48 | sample text stored on every new Row and published when not replaced (AGENTS delivery rule 6); labels without space | Modify (R-D-9) |
| Additional tab | std | std | none | Retain |

### D. Variations
| Variation | Purpose | Result (verified on aem.page, 1.0.6 content) | Action |
|---|---|---|---|
| Header row (default) | column headers | `thead`, `th scope=col` (e.g. "Results": 4 `th`) | Retain |
| No Header | data only | no `thead`, 0 `th` | Retain |
| First Column Header | matrix | `th scope=row` (Matrix: 7 `th`) | Retain |
| No Header + First Column Header | row headers only | 4 `th` | Retain |
| Striped / Bordered | style | classes | Retain |
| 1-5 columns | row models | widths 1 … 5 | Retain |
| Wide table | scroll region | "Compare" at 390px: `role=region`, `tabindex=0`, labelled | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Semantics | `table` / `thead` / `th[scope]` | verified | none | Pass |
| Name | caption or labelled | `aria-labelledby` = heading before the block (verified 12 / 12) | none | Pass |
| Scroll region (2.1.1) | focusable when overflowing | verified on "Compare" at 390px | none | Pass |
| Padded header cells | no empty `th` | a padded `thead` row adds empty `th` (none on the library page) | pad the header row with `td` instead | Minor (low) |

### F. Data layer
Block entry only; links in cells via the central `cmp:click`. Nothing else.

### G. Personalization
Not personalizable (content table).

### H. Decision
**Retain**. Backward compatibility (Table tab rows, older content): verified, all 12 tables render.

### New defects
- **R-D-9 (minor, verified in the definitions)** `blocks/table/_table.json` Row definitions (`table-row`, `table-col-2` … `table-col-5`): the templates store `column1text: "Column1"` … `column5text: "Column5"`, so every new Row is created with sample text that is published when the author doesn't replace it (AGENTS delivery rule "no sample content in templates"); labels "Column1" have no space. Fix: remove the `columnNtext` values from the five templates (keep `name` / `model`), relabel the fields "Column 1" … "Column 5"; existing rows unchanged (names unchanged). In Universal Editor an empty new Row is still selectable (the row element exists; add an `itemEditorHint` placeholder via `decorators/editor-item-decorator.js` if an empty row collapses).

---

## 5. Separator (`separator`, class `separator`)

### A. Overview
- Purpose: an `<hr>` (Core Components Separator port): variant presets, theme, line style / thickness / colour / opacity, widths, decorations, per-breakpoint overrides and spacing, animate on view, print, optional data-layer entry.
- Files: `separator.js` (140), `separator-config.js` (203, pure, unit tested `test/separator`), `separator.css` (631), `_separator.json` (tabs General / Style / Additional), README. Key-value; all keys read by `normalizeConfig` (dynamic per-breakpoint names l.93-102).

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-15 | **Confirmed fixed** | `auto` removed from `width` and the three per-breakpoint width selects; still in `WIDTHS` (`separator-config.js:18`) and styled as before (`separator.css:112, 224, 352, 480`) so stored values render unchanged |
| D-D-16 | **Confirmed fixed** | `custom-design` removed from the Variant options; kept in `VARIANTS` / `VARIANT_PRESETS` l.10-11, 46 |
| D-D-17 (Deferred) | **Still open; a cheap and safe fix exists** | `contrastMode`, `maxWidth: content-container`, `stretchToContainer`, `componentId` (and `width: content-width`) still offered. Removing a field from a key-value model stops AEM delivering the stored value (hence the deferral), but a **condition** only hides it in the dialog and keeps it delivered: `contrastMode` `{"===":[{"var":"contrastMode"},"high"]}`, `stretchToContainer` `{"===":[{"var":"stretchToContainer"},true]}`, `componentId` `{"!!":{"var":"componentId"}}` (shown only where already used), and remove the `content-container` / `content-width` options (values stay readable: `MAX_WIDTHS` / `WIDTHS` keep them). Also make the Anchor ID win in `idOf` (`separator.js:33-39`): `if (block.id) return block.id;` before the Component ID branch, so `#anchor-…` links keep working when both are set |

### C. Dialog validation
Unchanged from the first audit except D-D-15 / D-D-16 (every field read; 52 fields in 3 tabs).

| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Component ID (`componentId`) | text, regExp | `sanitizeComponentId` l.73-77, `idOf` `separator.js:33-39` | overrides the Anchor ID | D-D-17 (condition + anchor wins) |
| Accessibility mode / Accessible label | decorative / semantic | `separator.js:50-56` | none | Retain |
| Separator variant (`variant`) | 9 options | presets l.36-47 | none | Retain |
| Theme | auto / light / dark / brand | CSS | none | Retain |
| Line style / thickness / colour / opacity | selects | `classesOf` l.159-190 | none | Retain |
| Separator width (`width`) | '' + 25/50/75/100 %, content-width, full-bleed | `width-*` | `content-width` = 100 % with Respect max width (default) | D-D-17 |
| Maximum width (`maxWidth`) | none … content-container | `max-*` | `content-container` = Respect max width | D-D-17 |
| Alignment, decorations | selects | l.91, l.117-121 | none | Retain |
| Background contrast (`contrastMode`) | standard / high | `contrast-high` | = Line colour Strong | D-D-17 |
| Show on / per-breakpoint width, thickness, alignment, spacing (18) | booleans / selects | l.93-102, classes l.178-186 | none | Retain |
| Use section padding / Stretch / Respect max width | booleans | l.124-126 | Stretch duplicates 100 % | D-D-17 |
| Animate on view / Reduced motion fallback | selects | `initializeAnimation` l.69-85 | own mechanism, not the shared Animation Type | Retain |
| Print | show / hide | `print-hide` | none | Retain |
| Analytics / Analytics label | boolean / text | `initializeAnalytics` l.88-96 | no business use (first audit: deprecate) | Retain (documented) |

### D. Variations
As in the first audit (presets, Inset, Full width, spacer with Line style None); D-D-15 / D-D-16 options removed and still rendering for stored values.

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Semantics | `<hr>` or hidden | l.41-56 | none | Pass |
| Invisible semantic break | warned in the editor | `invisible-semantic` note l.125-135 | none | Pass |
| Reduced motion | no motion | static default; `fade` fallback opt-in | none | Pass |
| Forced colours | visible line | CSS | none | Pass |
| Ids | unique | Component ID suffixed when taken l.36-38 | anchor id wins (D-D-17) | Minor |

### F. Data layer
`data-analytics="off"` by default (excluded from `trackBlocks`); with Analytics on, a state entry `analyticsEntry` l.193-203 (no `parentId`, unlike the other entries: low). No events, no personal data.

### G. Personalization
Not personalizable.

### H. Decision
**Retain (simplify)** with the D-D-17 conditions above (dialog-only, content compatible).

---

## 6. Conversation Canvas (`conversation-canvas`, class `conversation-canvas`) + Conversation Canvas Button (`conversation-canvas-button`, own model)

### A. Overview
- Purpose: the "Ask TCS" panel (Default / Secondary in sections and the footer; Primary = the floating dock with the site navigation): intro, site menu popover, search form (voice input), quick-action button items, the floating journey shared by every Canvas of the page (`canvas-journey.js` pure + tested, `canvas-controller.js`).
- Files: `conversation-canvas.js` (747), `canvas-controller.js` (193), `canvas-journey.js` (160), `.css` (972), README; shared button / icon-button / a11y / responsive-image / skeleton decorators, `utils/query-index.js`, `taxonomy.js`, `metadata.js`, `buttons.js`, `links.js`, `urls.js`.
- Key-value (`readBlock` l.42-58): container fields (Menu, Search bar) are delivered as plain rows (verified on aem.page: `menuRootPath`, `menuDepth`, `searchPlaceholder`, `searchButtonStyle`, `searchButtonLabel` rows); button items are the rows with a link (4 cells: link, view, variant / icon, icon / alignment).
- The Canvas Button now has its own model (`conversation-canvas-button`: Link, Text, Title, Views, Type `buttonVariant`, Icon; no Alignment); items authored before keep `model="button"` (linkType as bold / italic).

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-18 (data layer) | **Confirmed fixed** (verified on aem.page) | `data-layer-decorator.js:117, 163-167` + `utils/privacy.js`: query "my email is jane.doe@example.com, call +44 20 7946 0958 about 2024-2025 results" -> one `cmp:search` `"my email is [email] call [number] about [number] results"`, no `cmp:click`; empty search -> no event. Over-redaction: "2024-2025" becomes `[number]` (safe side, see F) |
| D-D-19 | **Confirmed fixed** (verified) | `conversation-canvas.js:280-304`: cancelable `conversation-canvas:search`, else Search page `?q=`, else polite status; aem.page (no Search page in 1.0.6): Enter -> status "Search isn’t available yet.", focus stays in the input, URL unchanged |
| D-D-20 | **Confirmed fixed** (code + DOM order verified) | `dock.append(row, nav, panel)` l.416, CSS `order: -1` (`conversation-canvas.css:763-765`); aem.page docked page: dock children order search, nav, panel. (Section-view toggles not reachable on the library page: the page isn't in the menu tree, root view only) |
| D-D-21 (Deferred) | **Still open; cheap and safe** (dialog-only) | labels still "BG Background Image" (`_conversation-canvas.json:137`), "Title Type" (l.171), "Search bar water mark" (l.246), "… button icon type hover text" (l.287), placeholder "Statistic" (l.165); no conditions. Exact fix: `bgStyle` and `classes_navstyle` `"condition": {"===":[{"var":"classes"},"primary"]}`; `backgroundImage`, `icon`, `iconAlt`, `eyebrow`, `title`, `titleSize`, `text`, `classes_actions` `"condition": {"!==":[{"var":"classes"},"primary"]}`; labels "Background image", "Title size", "Search placeholder and label", "Search button style", "Search button label (screen readers)"; placeholder "e.g. How can we help you today?". Names unchanged, so content is unaffected (conditions only hide fields in the dialog) |
| D-D-22 | **Confirmed fixed** | own model `conversation-canvas-button` with `buttonVariant` (delivered as a cell), no Alignment; `buildListButton` l.84-106 reads the values or the bold / italic of older items |
| D-D-23 | **Confirmed fixed** (verified) | filters list `hidden` until `setConversationCanvasFilters` adds tags l.616-637, l.723-730; aem.page Secondary: `hidden=true` |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (conversation-canvas.js) | Issue | Decision |
|---|---|---|---|---|
| Search page (`searchPage`) | aem-content | l.284, l.297-301 | **placed before the Content tab** (first field of the model, `_conversation-canvas.json:42` vs `contentTab` l.48): outside every tab (R-D-10) | Move into the Search bar container |
| Canvas Style (`classes`) | '' / primary / secondary | block class; `primary` -> dock l.651, 661-670 | `config.classes` read l.649 is dead (classes are never rows) | Retain |
| Floating journey (`classes_journey`) | '' / nofloat / decorative | l.657-658 | none | Retain |
| Quick actions (`classes_actions`) | '' / action-pills / action-buttons | CSS | ignored by Primary | D-D-21 |
| BG Style (`bgStyle`) | default / dark | class l.652; CSS only for Primary | D-D-21 | Condition |
| BG Background Image (`backgroundImage`) | reference | l.676-683 | label; ignored by Primary | D-D-21 |
| Icon / Icon Alt Text (`icon`, `iconAlt`) | reference / text (collapses into the img) | l.688-694 | none | Retain + condition |
| Eyebrow / Title / Title Type / Text | text / text / '' bigger medium / richtext | l.695-712; title always `h2` | placeholder "Statistic"; fixed h2 | D-D-21 |
| Menu root path / Menu depth (container Menu) | aem-content / number 1-3 | `menuSettings` l.112-117, `loadMenuTree` l.126-149 (verified 116 links at depth 2) | none | Retain |
| Navigation style (`classes_navstyle`) | '' / text-links | CSS (Primary) | D-D-21 | Condition |
| Search bar container: placeholder, audio icon + alt, button style, button label | text / reference / text / select / text | l.211-308 | labels (D-D-21) | Relabel |
| Background animation / Additional tab | std | motion decorator | none | Retain |

Canvas Button item (`conversation-canvas-button`):

| Field (name) | Values / default | Functional mapping (`buildListButton` l.84-106) | Issue | Decision |
|---|---|---|---|---|
| Link / Text / Title (`link`, `linkText`, `linkTitle`) | aem-content + collapsed text / title | `a.href`, text, title (dropped when = text) | none | Retain |
| Views (`buttonView`) | button / icon / link, `button` | value cell l.90 | none | Retain |
| Type (`buttonVariant`) | primary / secondary / tertiary, `primary`; cond. button / icon | value cell l.91 | none | Retain |
| Icon (`buttonIcon`) | 4 icons, cond. icon | first other value l.92-93 | positional guess (works) | Retain |

### D. Variations
| Variation | Purpose | Result (aem.page, 1.0.6 content) | Action |
|---|---|---|---|
| Default / title sizes / background image | intro + search | 16 blocks render, classes `conversation-canvas-title-bigger / -medium`, `-has-background` | Retain |
| Secondary | filters | filters list hidden until filled | Retain |
| Primary (docked page) | floating dock | dock floating, DOM order row / nav / panel, root view 30 pills, menu toggle `aria-expanded=true` | Retain |
| Button items: Button / Icon / Link views (older `model="button"` items) | quick actions | `button primary`, `button secondary` (bold / italic), `button primary icon-button` (chevron-right), `link-button` | Retain (backward compatible) |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Search label | programmatic | visually hidden `<label for>` (placeholder text) | none | Pass |
| Search landmark | `role="search"` | plain `<form>` (verified `role=null` on 16 forms) | R-D-11 | Minor |
| Search result status (4.1.3) | feedback | `p[role=status].visually-hidden` "Search isn’t available yet." (verified); empty query: nothing happens, no message | optional `t('searchEmpty', 'Type a question first.')` | Pass (low) |
| Focus after search | stays / moves to results | stays in the input (verified); Search page navigates | none | Pass |
| Menu disclosure | aria-expanded / controls, Escape returns focus | verified: Enter opens (116 links), Tab enters the menu ("About TCS"), Escape -> focus on the toggle | none | Pass |
| Primary dock panel order | panel after its toggles | `dock.append(row, nav, panel)` (verified order) | none | Pass |
| Dock menu button | one state attribute | still switches between `aria-expanded` and `aria-pressed` (l.547-553) | as first audit (minor, not registered) | Minor |
| Voice input | name + state | `aria-label`, `aria-pressed` | none | Pass |
| Hidden dock | not reachable | `row.inert = !floats` (`canvas-controller.js:115-118`) | none | Pass |

### F. Data layer
- Block entries (anchor id or `conversation-canvas-n`; the header Canvas `parentId: header-1`); quick actions and menu links `cmp:click`; Secondary filter tags `filter` interaction.
- Search: one redacted `cmp:search` per search (verified), none for empty queries, the implicit submit click skipped (`isSearchForm`). Names and free-text personal details can't be redacted (inherent; the conversational prompt invites them): business / DPO decision whether to push the term at all (`xdm:searchTermLength` only).
- **Gap (R-D-12)**: with a Search page set, the raw query goes into the page URL (`?q=` l.298-300), which the Web SDK / Analytics collect by default as the page URL, so the redaction is bypassed there (BLOCKED: no Tags installed; by code).
- Voice input (Chrome's `webkitSpeechRecognition`) sends the recording to the browser vendor's speech service: a third-party transfer started by the site (user-initiated, browser asks for the microphone). Note for the DPO; where supported, `recognition.processLocally = true` (on-device) avoids it (low).

### G. Personalization
`setConversationCanvasSuggestions` / `setConversationCanvasFilters` are hooks without runtime caller (no Target / service): Primary uses the page tags, Secondary filters stay hidden (no empty list any more). Flag kept (documented in the README).

### H. Decision
**Retain** (D-D-18 … D-D-23 fixes verified; older Canvas buttons render). Remaining: D-D-21 (dialog-only), R-D-10 … R-D-12.

### New defects
- **R-D-10 (minor, verified in the model)** `blocks/conversation-canvas/_conversation-canvas.json:42`: the new `searchPage` field is the model's first field, before the `contentTab` tab, so it sits outside the dialog's tabs (above / outside Content, Additional). Fix: move the field object into the `searchBar` container (after `searchButtonLabel`, l.~287). The name is unchanged and key-value rows are by name, so stored values keep working.
- **R-D-11 (minor, verified)** `conversation-canvas.js:211-213`: the search form has no search landmark (16 / 16 forms `role=null`). Fix: `form.setAttribute('role', 'search');` (also makes `isSearchForm` explicit) and `aria-label` = the placeholder text when several Canvases are on a page (`form.setAttribute('aria-label', placeholder)`).
- **R-D-12 (minor, suspected; runtime BLOCKED)** `conversation-canvas.js:297-301`: the Search page URL carries the raw query (`?q=my email is …`), so the data-layer redaction (`utils/privacy.js`) is bypassed by the page URL / referrer the Web SDK collects on the Search page. Fix (when Tags is set up): an `onBeforeEventSend` rule that replaces `xdm.web.webPageDetails.URL` / `web.webReferrer.URL` `q` values with `redactSearchTerm(q)`; document it in `decorators/README.md` (data layer) and the Canvas README; optionally pass the query in the fragment (`#q=`, not sent to servers) if the Search page is built in-house.

---

## 7. Footer (`footer`, class `footer`) + Footer Link (`footer-link`)

### A. Overview
- Two roles (`footer.js:16-27`, l.138-142): the page footer in `<footer>` (inherited Footer page, default `references/footer`, as a fragment, plus the locale's Social Links sheet) and the authored Footer block on that page (Canvas page fragment, copyright with `{year}`, links).
- Files: `footer.js` (142), `footer.css` (281), `_footer.json`; shared fragment, motion, button (`removeButtonDecoration`), content (`fromCell`), editor-item, link (`setLinkTarget`, `announceNewTab`), social-links decorators, `utils/cells.js` (`itemRows`), `utils/data.js`, `utils/inherited-metadata.js`, `utils/links.js`. No README.
- Not key-value, no tabs: rows Conversation Canvas Page, Copyright Text, Link List (legacy container), then Footer Link items (2 cells: link with collapsed text, target; `FIELD_ROW_ITEM`).

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-24 | **Confirmed fixed** (verified on aem.page) | `footer.js:53` `announceNewTab`; `social-links-decorator.js` `newTabHint` (l.~60); aem.page: "Privacy & Terms (opens in a new tab)" `target=_blank`, no redundant `title` (D-D-28 also verified) |

### C. Dialog validation
| Field (name) | Values / default | Functional mapping (footer.js) | Issue | Decision |
|---|---|---|---|---|
| Conversation Canvas Page (`conversationCanvas`) | aem-content | `buildCanvas` l.65-75 | none | Retain |
| Copyright Text (`copyright`) | richtext, `{year}` | `fromCell` + `fillYear` l.29-36, 92-97 | none | Retain |
| Link List (`links`, container: linkText, link, linkTarget) | legacy | `readLinkItems` l.40 | description already says "use Footer Link" | Retain (read only) |
| Footer Link: Link Path (`link`) | aem-content, required | `readLinkRows` l.39 | none | Retain |
| Footer Link: Link Title (`linkText`) | text | collapsed link text | label suggests the `title` attribute (`_footer.json:107`, also l.63) | Relabel "Link text" (R-D-13) |
| Footer Link: Link Type (`linkTarget`) | '' / new-window | `setLinkTarget` + `announceNewTab` l.52-53 | label "Link Type" for a target (`_footer.json:113`, l.75) | Relabel "Open in" (R-D-13) |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Default / Campaign / Investors footer pages | inherited Footer property | `getInheritedMetadata('footer')` l.111 | Retain |
| With / without Canvas | — | canvas row optional | Retain |
| Social links | data sheet | language-master has no rows (aem.page: 0 social links) | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Landmark | contentinfo + named nav | `<footer>`, `nav[aria-label="Footer links"]` | none | Pass |
| New tab | announced | verified | none | Pass |
| Social icons | names | visually hidden "Follow us on {platform}" + hint | none | Pass |
| Social list name | grouped | `<ul class="footer-social">` without label | `aria-label` `t('followUs', 'Follow us')` (low, R-D-13) | Minor |
| Redundant title | none | verified none | none | Pass |

### F. Data layer
`footer-1` (page footer) + `footer-2` (authored block, `parentId footer-1`) + the footer Canvas; clicks via the central handler. No personal data.

### G. Personalization
Experience container (per-page Footer page). No fields.

### H. Decision
**Retain** (low R-D-13).

### New defects
- **R-D-13 (low, verified in the model)** `blocks/footer/_footer.json:63, 75, 107, 113`: Footer Link labels "Link Title" (the link text) and "Link Type" (the target) mislead authors; the social list has no accessible name. Fix: labels "Link text" and "Open in" (options "Same tab" / "New tab"), names unchanged; `buildSocialLinks(…)` result `social.setAttribute('aria-label', t('followUs', 'Follow us'))` in `decoratePageFooter`.

---

## 8. TCS Header (`tcs-header`, class `tcs-header`) and the auto-loaded header (`blocks/header`)

### A. Overview
- `blocks/header` (header.js 321, header.css 457, README): built in `<header>`; loads the inherited Navigation page (`getInheritedMetadata('nav')`, fallback `references/nav`, l.224-231); nav page sections = brand / sections / tools, or brand + tools from a TCS Header block (`applyLogoBar` l.176-194); sections with a Conversation Canvas become `.nav-canvas` (l.245-257, 301-308). Desktop (>= 1200px) logo bar; tablet / mobile full-screen menu, one level at a time. No model.
- `blocks/tcs-header` (tcs-header.js 45, css 70, README, `_tcs-header.json`): key-value logo bar (TCS logo + link, TATA logo + link). The language master's Navigation page on aem.page is `references/tcs-header` (`<meta name="nav">` of `/language-master/en`): one section with a TCS Header **and** the header Conversation Canvas, no menu section (verified, `/tmp/audit2/d/` dump).

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-25 | **Not fixed for the live case** (verified on aem.page) | `tcs-header.js:18-29`: the placeholder fallback only applies when there is **no image**; the live nav page `references/tcs-header` has a TATA logo image with `alt=""` (authored), so `a.tcs-header-group` still has no accessible name (Playwright at 390px: `name=` empty). Exact fix: after `const picture = pictureOf(imageCell, altCell);` add `const img = picture?.querySelector('img'); if (img && href && !img.getAttribute('alt')?.trim()) img.alt = fallback;` (compute `href` first). Backward compatible |
| D-D-26 | **Confirmed fixed** (verified) | `header.js:78`; aem.page 390px: open -> `main.inert` and `footer.inert` true, `aria-expanded=true`, label "Close navigation", journey `hidden`; Escape -> closed, focus on "Open navigation", inert removed |

### C. Dialog validation (TCS Header)
| Field (name) | Values / default | Functional mapping (tcs-header.js) | Issue | Decision |
|---|---|---|---|---|
| TCS Logo (`tcsLogo`) + Alt (`tcsLogoAlt`, value "Tata Consultancy Services", collapses into the img) | reference + text | `pictureOf` l.19, link l.24-28 | an emptied alt leaves the link nameless (D-D-25 live) | Fix D-D-25 |
| TCS Logo Link (`tcsLogoLink`) | aem-content | `linkOf(...)` else text l.24 | a typed URL without scheme becomes a relative link (R-D-15) | Modify |
| TATA Logo / Alt (value "TATA Group") / Link | same | same | live: `alt=""` and link text `www.tata.com` -> `href="www.tata.com"` -> `/language-master/en/block-library/footer/www.tata.com` (verified) | D-D-25, R-D-15 |
| Additional tab | std (no animation fields) | std | none | Retain |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Nav page with TCS Header + menu section (`header/nav-default`) | logos + menu | `applyLogoBar` | Retain |
| Nav page with TCS Header + Canvas, no menu (live `references/tcs-header`) | logos + header Canvas | brand + tools, `.nav-canvas`; **the menu button is still built and opens an empty full-screen layer** (R-D-14, screenshot `/tmp/audit2/d/empty-menu.png`) | Modify |
| Positional nav page | legacy | sections 1-3 | Retain |

### E. Accessibility (header + TCS Header)
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Menu button | `aria-expanded`, `aria-controls`, name | verified; but `aria-controls="nav-sections"` points to no element when the nav page has no menu (verified `getElementById('nav-sections') === null`) | R-D-14 | Fail (that configuration) |
| Page behind the menu | inert | verified (D-D-26) | none | Pass |
| Escape / focus return | closes, focus to the button | verified | none | Pass |
| Sub-levels / Back / focus | as first audit | code unchanged (l.108-169) | none | Pass |
| Logo link names (2.4.4 / 4.1.2) | every link named | TATA logo link nameless on aem.page | D-D-25 fix | Fail |
| Journey interplay | floating Canvas hidden while open | `data-canvas-journey-state="hidden"` (verified) | none | Pass |

### F. Data layer
`header-1` entry (no `dc:title` without a menu level heading), the header Canvas `conversation-canvas-n` with `parentId: header-1`; logo / menu clicks via the central handler.

### G. Personalization
Experience container (per-page Navigation page). No fields.

### H. Decision
`blocks/header`: **Retain** (R-D-14). TCS Header: **Retain** (D-D-25 live fix, R-D-15).

### New defects
- **R-D-14 (minor, verified on aem.page)** `blocks/header/header.js:283-291` (+ `buildHamburger` l.197-212, `toggleMenu` l.69-83): when the Navigation page has no menu section (the live language-master nav `references/tcs-header`: logos + Canvas), the menu button is still shown on tablet / mobile with `aria-controls="nav-sections"` (no such element); opening it blanks the page into an empty full-screen layer (only the header Canvas row, which is visible anyway), makes `main` / `footer` inert and locks the scroll, so the button only hides the page. Fix: build the hamburger only with a menu: `const hamburger = navSections ? buildHamburger(nav, navSections) : null; if (hamburger) navSections.before(hamburger);` and keep the tools placement `if (navTools && hamburger) hamburger.before(navTools);`; in `toggleMenu` guard `button?.setAttribute(…)` and skip `inert` / overflow when there's no `navSections` (`const open = !!navSections && !expanded && !isDesktop.matches;`). Backward compatible (nav pages with a menu unchanged).
- **R-D-15 (minor, verified on aem.page)** `blocks/tcs-header/tcs-header.js:24`: a logo link typed without a scheme (`www.tata.com`, delivered as text because `tataLogoLink` isn't a link) becomes a relative `href` (resolved to `/language-master/en/…/www.tata.com`, a 404). Fix: `const raw = linkOf(linkCell)?.getAttribute('href') || textOf(linkCell); const href = /^(www\.|[a-z0-9-]+\.[a-z]{2,}(\/|$))/i.test(raw) ? `https://${raw}` : raw;` and correct the live nav page content (`https://www.tata.com`).

---

## 9. Default content: Text (`text`), Title (`title`), Image (`image`), Button (built-in, `button-basic` model, no longer offered) and Button Block (`button-block`)

### A. Overview
- Built-in components (`core/franklin/components/{text,title,image,button}/v1/...`) decorated by `scripts.js` / `decorators/content-buttons-decorator.js` (`decorateButtons`) and `decorators/responsive-image-decorator.js`. Filters (verified in `component-filters.json`): `section`, `columns-container`, `tabs` offer text / image / title / **button-block**; the built-in Columns' `column` filter offers text / image / title; **the built-in Button is in no filter** (PR #119). Its definition (title "Button (basic)", template model `button-basic`: Link, Text, Title, Type Primary / Secondary / text link) stays for Buttons authored before; the former shared `button` model stays for components that carry `model="button"`.
- Button Block (`blocks/button-block`, title "Button", template name "Button Block"): key-value Link (+ collapsed Text / Title), View, Type (`buttonVariant`), Icon, Alignment, Additional tab; `button-block.js` (60) with `decorateButton` / `setButtonAlignment`.

### B. Status of the first audit's defects
| Id | Verdict | Evidence |
|---|---|---|
| D-D-27 | **Confirmed fixed** | built-in Button removed from every filter; `button-basic` model offers only deliverable values (`models/_button.json`); package 1.0.8 has 0 built-in Buttons (migrated to Button Blocks), 52 Canvas items on `conversation-canvas-button` |
| D-D-28 | **Confirmed fixed** (verified) | no `a.title = a.textContent` in `content-buttons-decorator.js`; aem.page `foundations/button`: only the authored title "Contact the TCS team" remains, other buttons `title=""`; the Button Block's Title description still says "when empty the Text is used" (`_button-block.json:50`, R-D-16) |

### C. Dialog validation
| Component / Field (name) | Values / default | Delivered / mapping | Issue | Decision |
|---|---|---|---|---|
| Text (no model) | rich text | yes | none | Retain |
| Title: Title / Title Type (`title`, `titleType`) | text / h1-h6, no default | yes (heading level) | no default and no guidance "one H1 per page" (first audit, not registered) | Retain; R-D-16 |
| Image: Image / Alt Text (`image`, `imageAlt`) | reference / text | yes | no "empty only if decorative" guidance | Retain; R-D-16 |
| Button (basic): Link / Text / Title / Type (`linkType` primary / secondary / '') | built-in | link + bold / italic | none (only for Buttons authored before) | Retain (not offered) |
| Button Block: Link / Text / Title | aem-content + collapsed | `linkOf(props.link)` l.23-25 | Title description outdated after D-D-28 | R-D-16 |
| Button Block: View / Type / Icon / Alignment | button icon link / primary secondary tertiary / 4 icons / left center right | `readButtonBlock` l.21-30, `decorateButton` l.58, `setButtonAlignment` l.56 | none | Retain |
| Button Block: Additional tab | std | std | none | Retain |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Built-in Button Primary / Secondary | CTA | `button primary` / `button secondary` (aem.page verified) | Retain |
| Built-in Button with View Icon / Link, Tertiary, Alignment center / right (authored before) | — | delivered only as bold / italic / plain: render as primary / secondary / `link-button`, no icon, left aligned (aem.page `foundations/button` verified: anchor-button-icon -> primary, secondary, link-button; anchor-button-center / -right -> not aligned; anchor-button-tertiary -> link-button) | no breakage; values lost (expected, migration done in the library) |
| Button Block Views x Types x Icons x Alignment | CTA | local preview (1.0.8) as first audit | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Buttons keep link semantics | `<a>` | verified | none | Pass |
| No redundant title | — | verified (D-D-28) | none | Pass |
| Icon buttons named | text / aria-label | `applyIcon` (`button-decorator.js`) | none | Pass |
| Headings / alt | author guidance | none in the dialog | R-D-16 | Authoring |

### F. Data layer
Default content isn't a component; standalone links push `cmp:click` on the page. **Defect R-D-17**: page-level clicks use `eventInfo.path: "component.page-…"` (verified on aem.page: `{"event":"cmp:click","eventInfo":{"path":"component.page-12fuegn",…}}`), while the page entry is stored under `page.page-…`, so `adobeDataLayer.getState(event.eventInfo.path)` returns nothing for every content link. Button Blocks are components (`button-block-n`).

### G. Personalization
Not individually personalizable (section / fragment level).

### H. Decision
Text, Title, Image: **Retain**. Built-in Button: **Deprecated** (kept for content authored before, verified rendering). Button Block: **Retain** (the authoring target).

### New defects
- **R-D-16 (low, verified in the models)** dialog guidance: `blocks/button-block/_button-block.json:50` Title description "Tooltip; when empty the Text is used." is false since D-D-28 (no title is added); `models/_title.json` Title Type has no default nor heading guidance; `models/_image.json` Alt Text has no decorative guidance. Fix: "Optional tooltip (most buttons need none)."; Title Type `"value": "h2"`, description "One H1 per page (usually the Page Header); keep levels in order"; Alt Text description "Describe the image; leave empty only for decorative images". Dialog-only.
- **R-D-17 (minor, verified on aem.page)** `utils/analytics.js` `pushComponentEvent` (l.~36-39) with `data-layer-decorator.js:94, 122-131`: clicks outside blocks are pushed with `path: component.page-{hash}`, but the page state is `page.page-{hash}` (`trackPage` l.50-67): the event's path resolves to nothing in the Adobe Client Data Layer (Core Components page events use `page.{id}`). Fix: `export const pushComponentEvent = (event, id, info = {}) => pushToDataLayer({ event, eventInfo: { path: id.startsWith('page-') ? `page.${id}` : `component.${id}`, ...info } });` (page ids are always `page-{hash}`; component ids never start with `page-` unless an author names an anchor so: anchors start with `anchor-`). Document in `decorators/README.md`.

---

## 10. Shared code: `decorators/data-layer-decorator.js`, `utils/privacy.js`, `decorators/button-decorator.js`, `decorators/content-buttons-decorator.js`, `decorators/link-decorator.js`

### Data-layer events: data minimisation (every event)
| Event / entry | Pushed fields | Personal data? (evidence) | Verdict |
|---|---|---|---|
| page state (`trackPage` l.50-67) | `@type`, `dc:title`, `xdm:language`, `xdm:template`, `xdm:tags`, `repo:path` (pathname only, no query) | none | OK |
| component state (`trackBlocks` l.73-87) | `@type`, `parentId`, `dc:title` (first heading, <= 100 chars) | authored text only | OK |
| `cmp:click` (l.114-132) | interaction, `dc:title` (aria-label / text <= 100), `xdm:linkURL` (full href incl. query / hash), linkType, value, position, breakpoint | authored; `xdm:linkURL` keeps query strings (e.g. tracking or e-mail parameters of authored links) | OK (low: optionally strip `?…#…` for `mailto:` / external links) |
| `cmp:show` / `cmp:hide` (l.135-146, tabs, modal, carousel) | `dc:title` / interaction / position | none | OK |
| `cmp:media` (l.148-158) | interaction, `xdm:mediaURL`, position | none; automatic play / pause counted (D-D-13) | OK (D-D-13) |
| `cmp:submit` (l.160-177) | `dc:title`, field **names** | none (verified) | OK; accuracy R-D-3 |
| `cmp:search` (l.163-167) | `xdm:searchTerm` redacted by `redactSearchTerm` (e-mail, phone-like numbers, 100 chars) | names / free text remain (inherent); verified redaction | OK with DPO decision; R-D-12 for the Search page URL |
| `cmp:change` (l.179-187) | interaction, `data-cmp-value` **or the control's raw `value`**, checked | today only Filter List checkboxes / Canvas tags carry `data-cmp-interaction` (authored values); a text input or select given `data-cmp-interaction` later would push what the visitor typed | Low: limit the raw value to checkbox / radio: `value: el.dataset.cmpValue \|\| (['checkbox', 'radio'].includes(el.type) ? el.value : undefined)` |
| Separator custom entry | variant, mode, theme, line style, visibility | none | OK |

Other shared modules:
- `utils/privacy.js`: pure, unit tested (`test/privacy`); e-mail regex consumes trailing punctuation ("…example.com," -> "[email]"), phone regex also redacts year ranges ("2024-2025") and long numbers: errs on the safe side (OK).
- `button-decorator.js`: single source for views / types / alignment / disabled; `applyIcon` sets `title` = label on icon-only buttons (a tooltip for an icon, acceptable). No defects.
- `content-buttons-decorator.js`: D-D-28 fixed; bold / italic -> type, plain standalone link -> `link-button`. No defects.
- `link-decorator.js`: `setLinkTarget` adds `rel="noopener noreferrer"`; `announceNewTab` appends visually hidden text or extends `aria-label` (verified in the footer). No defects.

---

## Backward compatibility on aem.page (current code, package 1.0.6 content)
| Component (changed by the first audit / PR #119) | Older content | Result (evidence) |
|---|---|---|
| Form Variations (D-D-1) | items "name, field-text" (+ empty tab rows) | **renders**: 14 / 14 forms with controls, validation, conditional fields, contact cards; submit -> "not connected" (Playwright, `form.mjs`). Keys arrive lower-cased (R-D-1) |
| Video (poster rename) | former `placeholder_image` poster group | **renders without poster** (the group was never delivered): 24 / 24 blocks render, 0 posters; file videos 404 on Edge Delivery (R-D-6, R-D-7) |
| Conversation Canvas buttons | `model="button"` items with linkType (bold / italic), view / icon cells | **renders**: primary / secondary buttons, icon button (chevron-right), link button (`canvas.mjs`) |
| Built-in Button (PR #119) | View Icon / Link, Tertiary, Alignment values | **renders, values lost gracefully**: primary / secondary / link-button, no icon, no alignment (`btn.mjs`) |
| Table | two empty tab rows before the rows | **renders**: 12 / 12 tables, tab rows skipped, one width per table, labelled (`misc.mjs`) |
| Footer / header | inherited `references/tcs-footer` / `references/tcs-header` | render; new-tab link announced; TATA logo link nameless (D-D-25 live) and empty menu button (R-D-14) |

---

## Summary

Components reviewed (group D): Form Variations + 6 items, Embed, Video, Table + Row models / filters, Separator, Conversation Canvas + Canvas Button, Footer + Footer Link, TCS Header + header, Text, Title, Image, Button (basic), Button Block, and the shared data-layer / privacy / button / content-buttons / link modules.

Register re-verification (D-D-1 … D-D-28): **23 confirmed fixed** (D-D-1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28; D-D-4 and D-D-14 with a remaining part, reported as R-D-3 and R-D-9), **1 not fixed** (D-D-25: the live TATA logo with an empty alt is still a nameless link), **0 regressed**; deferred D-D-2, D-D-13, D-D-17, D-D-21 still open, each now with a cheap and safe fix (D-D-2 via R-D-1; D-D-13 `data-cmp-auto`; D-D-17 dialog conditions + anchor id wins; D-D-21 conditions and labels).

New defects:
| Id | Severity | Component | One line |
|---|---|---|---|
| R-D-1 | major | Form Variations | Field keys are submitted lower-cased / hyphenated (`firstName` -> `firstname`), not as authored (D-D-2 root cause) |
| R-D-6 | major | Video | AEM Assets video / captions files (`/content/dam/…`) 404 on Edge Delivery (24 / 24 on aem.page) |
| R-D-2 | minor | Form Variations | No double-submit guard while the POST is in flight |
| R-D-3 | minor | Data layer / Form | `cmp:submit` pushed before the outcome (also for "not connected"), `dc:title` always `form-variations` |
| R-D-4 | minor | Form Variations | An integration cancelling the submit event gets an immediate "sent" message, no way to report failure |
| R-D-5 | minor | Embed / Video (`utils/media.js`) | Vimeo player / channel / unlisted URLs build a broken player |
| R-D-7 | minor | Video | Older posters (`placeholder_image`) are never delivered; dead fallback; duplicated description |
| R-D-8 | minor | Video | Pop-up dialog named "Dialog", focus not returned on Safari, double click opens two dialogs |
| R-D-9 | minor | Table | Row templates store sample text "Column1" … on every new row |
| R-D-10 | minor | Conversation Canvas | `searchPage` field sits before the Content tab (outside the tabs) |
| R-D-11 | minor | Conversation Canvas | Search form without a search landmark |
| R-D-12 | minor (suspected) | Conversation Canvas / data layer | Search page `?q=` carries the raw query past the redaction (Analytics page URL) |
| R-D-14 | minor | Header | Nav page without menu: menu button opens an empty layer, `aria-controls` to a missing id, page inert |
| R-D-15 | minor | TCS Header | Scheme-less logo link (`www.tata.com`) becomes a relative 404 link |
| R-D-17 | minor | Data layer | Page-level clicks use `path: component.page-…` instead of `page.page-…` |
| R-D-13 | low | Footer | Footer Link labels "Link Title" / "Link Type"; social list unnamed |
| R-D-16 | low | Button Block, Title, Image | Outdated / missing dialog guidance (Title tooltip, heading level, alt) |

Report: `/tmp/audit2/review-D.md`; evidence `/tmp/audit2/d/` (published dumps, Playwright scripts, `empty-menu.png`).

