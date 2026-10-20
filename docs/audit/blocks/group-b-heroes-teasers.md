# Review B: Hero, Teaser, Page Header, Quote, Testimonial, Interactive Dashboard (+ items)

Reviewer group B. Read-only review of `/backups/sradha-tcs/tcs-corp/repo` at `14e9abe` (main, clean).

**Evidence used**
- Code: `blocks/{hero,teaser,page-header,quote,testimonial,interactive-dashboard}/*.{js,css,json}` and the shared modules they import (`utils/{links,cells,properties,buttons,multifield,media,motion,metadata,lottie}.js`, `decorators/{button,heading,image,content,stats,editor-item,animation,article-meta,link,a11y,motion,data-layer,responsive-image}-decorator.js`).
- Inventory `/tmp/audit/inventory.json` (usage counts quoted as "pkg" = AEM content package: block library and curated pages).
- Static scan of all 175 `drafts/en/**/*.plain.html` (script `/tmp/audit/b/scan.mjs`, DOM-parsed in Chromium, no server).
- Targeted runtime checks (script `/tmp/audit/b/runtime.mjs`, `runtime2.mjs`; output `/tmp/audit/b/runtime.json`): 9 block-library pages at 1440px on `localhost:3000`, axe-core (wcag2a/aa + best-practice), data layer entries, duplicate ids, Lottie controls, `target=_blank` links, figcaption parents. One run with `reducedMotion: 'reduce'`.
- Not tested: Universal Editor itself (dialog behaviour, condition evaluation, display of model defaults for unset properties), Analytics / Target runtime (none loaded: BLOCKED per brief).

**Delivery facts applied** (brief): `<x>Text / <x>Title / <x>Type / <x>Alt` collapse into `<x>`; so `titleType` arrives as the heading tag inside the title cell, `imageAlt` / `authorImageAlt` / `content_iconAlt` as the `img alt` (or the `title` of a non-image reference link), `viewAllText` / `primaryCtaText` / `linkText` / `ctaText` as the link text, legacy `ctaType` (Hero CTA List) as bold / italic on the link. Code reading `props.titletype`, `props.imagealt`, `props.authorimagealt` is therefore dead but harmless (the code falls back to the delivered markup). `classes` / `classes_*` arrive as classes; the Additional tab (anchor, hide, padding / margin, animation fields) is shared and audited centrally; only its block-specific effect is noted here.

---

## Block: Hero (`hero`, class `hero`)

### A. Overview
- Purpose: full-width banner (Figma "L1 Header"): image or Lottie background (cover or contained) under a light / dark / no overlay; icon, eyebrow, title, description; CTAs; 3x3 content position + text alignment; own "Motion Type".
- Files: `blocks/hero/hero.js` (208 lines), `hero.css` (355), `_hero.json`. Not key-value: one row per field; the `content_*` element group is one cell; CTA items follow as rows of 4 cells (`link`+text, `linkTarget`, `linkStyle`, `linkArrow`).
- Children: `hero-cta` (filter `hero`). Parents: section, columns-container, gen-carousel.
- Usage (pkg): 182 instances / 141 pages; `hero-cta` 214 / 136. Legacy CTA List: 0.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Icon (`content_icon`) | reference | Group cell; first `picture` before the heading with no text becomes `.hero-icon` (hero.js:136-143) | Content cell holding only an icon (no eyebrow / title / description) is classified as the hero media by `isMediaCell` (hero.js:66-70, 82): suspected edge case, see D-B-20 | Retain |
| Icon Image Alt Text (`content_iconAlt`) | text | Collapses into the icon `img alt` (no code) | OK; pkg 0 uses | Retain |
| Hero Image type (`classes_media`) | Default `""` / Lotto `lottie` | Class `lottie` gates Lottie playback (hero.js:97) | Redundant: `isAnimation(href)` (`.json`) already identifies the file; with Default + a `.json` the media silently disappears (hero.js:97-113 returns null). Label "Lotto" kept per project vocabulary | Deprecate (auto-detect `.json`, keep reading the class) |
| Hero Image Path (`image`) | reference | `isMediaCell` + `buildMedia` (hero.js:65-115); LCP `eager` + `fetchPriority=high` in the first section (hero.js:106-109) | OK | Retain |
| Hero Image alt text (`imageAlt`) | text | Collapses into `img alt`; for Lottie into the link `title`, used as `aria-label` (hero.js:98) | OK; empty = decorative (`aria-hidden`) verified at runtime | Retain |
| Hero View (`classes`) | Default / Contained image `media-contained` | CSS hero.css:181-198 | Is a style option placed in the Content tab | Reorder (Style tab; class field, no row impact) |
| Eyebrow (`content_eyebrow`) | text | Element before the heading -> `.hero-eyebrow` (hero.js:147-149) | Rendered only when a heading exists (`headingIndex >= 0`); without a title the eyebrow becomes description | Retain |
| Title (`content_title`) | text | Heading -> `.hero-title` (hero.js:144-146) | OK | Retain |
| Title heading level (`content_titleType`) | H1 / H2; default h1 (template + model) | Collapses into the heading tag | OK (gen-carousel content sets H2 on later slides) | Retain |
| Description (`content_description`) | richtext | `.hero-description` (hero.js:150-154) | OK | Retain |
| CTA List (`ctas`, container multi) + `ctaText`, `cta`, `ctaTarget`, `ctaType`, `ctaArrow` | legacy; description "CTAs authored before CTA items" | `readLinkItems` (hero.js:163); `ctaType` read as bold / italic via `readButtonOptions` (hero.js:168); `ctaTarget` / `ctaArrow` as item values | Still exposed in the Content tab; pkg usage 0; composite multifields don't render from packages (AGENTS). `ctaArrow` default `right` (hero.json:212) has the same Auto issue as D-B-8 | Deprecate -> Remove from dialog after production check (D-B-14); keep reader |
| Motion Type (`classes_motion`) | None / Fade in / Slide up / Zoom (image) | hero.js:43-50 + hero.css:264-301; removed when Additional animations set | Duplicates Additional tab Animation Type (Fade in, Fade up) and Background animation (Scale reveal); ignores Motion Speed / Trigger; in the Content tab; description names "Content animation" while the field is labelled "Animation Type". pkg: 5 uses | Deprecate (D-B-13) |
| Vertical Alignment (`classes_alignment`) | top / middle / bottom; default align-middle (template + model) | hero.css:48-54 (middle = base) | OK | Retain |
| Horizontal Alignment (`classes_horizontal`) | left / center / right; default align-center | hero.css:60-70, 331-333 (center = base) | OK | Retain |
| Text Alignment (`classes_textAlignment`) | left / center / right; default text-center | hero.css:73-86 | OK | Retain |
| BG Color (`classes_background`) | Default, bg-light, bg-dark, bg-dark-subtle, bg-black | hero.css:88-117, 250-262 | Default and Light render the same without an image (both white); acceptable | Retain |
| Additional: Animation Type / Speed / Trigger / Background animation | shared | `motion-decorator.js:31` (targets `.hero-content`), `:52` (layers `.hero-media`, overlay) | Works; Background animation meaningful (image + overlay + colour) | Retain |

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Image (cover) | Default banner | `.hero-media` absolute, `object-fit: cover`, overlay `::before` | Retain |
| Contained image | Illustration shown whole | hero.css:181-198 | Retain (move field to Style) |
| Lotto (Lottie) | Animated background | Plays, `role=img` + label from alt (runtime OK); **pause / play button removed** (D-B-1) | Fix |
| No image | Text-only hero | `hero-has-media` false, no overlay | Retain |
| BG Light / Dark / Dark subtle / Black | Overlay variants | Distinct CSS | Retain |
| 9 positions x 3 text alignments | Layout | Distinct CSS | Retain |
| Motion Type fade / slide / zoom | Entrance motion | Own observer; superseded by Additional tab | Deprecate |
| CTA Default / Primary / Secondary | Button types | tertiary / primary / secondary, all distinct; all have the arrow `::after` (styles.css:533-540) | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Heading | One H1 per page, H2 for other heroes | Authored level delivered; default H1 | Author guidance in description (present) | Pass |
| Pause for moving content (WCAG 2.2.2) | Looping Lottie has a reachable pause / play button | `block.append(animation.animationToggle)` (hero.js:102) is wiped by `block.replaceChildren(media, content)` (hero.js:206). Runtime: `hero/hero-overview` `#anchor-hero-lotto` Lottie SVG rendered, 0 `.animation-toggle` in the document (Teaser control present) | D-B-1 | **Fail** |
| Reduced motion | No motion | Lottie paused on first frame (animation-decorator.js:22, 34); Motion Type skipped (hero.js:47, hero.css:266) | - | Pass |
| Alt / decorative | Alt from field; empty = decorative | `img alt=""` delivered; Lottie `aria-hidden` without label, `role=img` + `aria-label` with label (runtime) | - | Pass |
| New window links | Announced (AGENTS) | `target=_blank` set by `decorateButton` (button-decorator.js:130) without announcement; runtime `#anchor-hero-cta-new-window` "Read the full report": no hidden text, no aria-label | D-B-4 | **Fail** |
| Keyboard / focus | CTAs focusable, visible focus | Native links; global `a:focus-visible` outline (styles.css:482-485) | - | Pass |
| Colour contrast | 4.5:1 | axe: eyebrow `#4673db` on white 4.43:1, description `#999` 2.84:1 (light heroes) | D-B-16 (global tokens) | **Fail** |
| Duplicate ids | none | none (runtime) | - | Pass |

### F. Data layer
- Block state via `trackBlocks`: id = anchor id or `hero-{n}` (`data-cmp-id`), `dc:title` = first heading (runtime: 7 entries on hero-overview, titles correct). Stable as long as page order is stable.
- CTA clicks: central `cmp:click`, `interaction: link`, no `data-cmp-*` on CTAs (none needed). Lottie toggle carries `data-cmp-interaction="animation"` (animation-decorator.js:56) but is currently not in the DOM (D-B-1).
- No block-level pushes, no duplicate-event risk.

### G. Personalization
Entire block (a Target / experience-fragment swap of the whole hero would be the natural unit). No personalization field, no runtime: nothing to remove.

### H. Decision
**Modify**: fix D-B-1, D-B-4; deprecate Motion Type and Hero Image type (auto-detect); remove legacy CTA List from the dialog after production check; move Hero View to Style. Backward compatible: classes `lottie`, `motion-*` and the CTA List reader keep working.

---

## Item: CTA (`hero-cta`, class `cta`)

### A. Overview
Row of 4 cells after the hero's rows (`FIELD_ROW_ITEM`, utils/cells.js:13; hero.js:192). Read by `readLinkRows` (utils/links.js:62-71). pkg 214 / 136 pages.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| CTA Link (`link`, required) | aem-content | The row's `a[href]` (links.js:64) | OK | Retain |
| CTA Title (`linkText`) | text | Collapses into link text | OK | Retain |
| CTA Link Type (`linkTarget`) | Default / new-window | `newWindow` -> `decorateButton({newWindow})` (hero.js:172) | Not announced (D-B-4) | Retain + Correct code |
| CTA view (`linkStyle`) | Default `""` (tertiary) / primary / secondary | hero.js:167-172 | 3 distinct renders; label "CTA view" vs Teaser / Page Header "CTA Link Style" with option "Text link": inconsistent vocabulary | Rename to "CTA Link Style", options "Text link / Primary Button / Secondary Button" (values unchanged) |
| CTA Arrow (`linkArrow`) | Right / Down; model default `right` (hero.json:1192), no template default | hero.js:174-177: Down, or **no value** + `href^="#"` -> down | The dialog presents Right as default while unset items render Down for in-page anchors (pkg: 88 of 214 items unset); no explicit "Auto" | Correct (D-B-8) |

### H. Decision
Retain; rename labels; add "Auto" arrow option.

---

## Block: Teaser (`teaser`, class `teaser`)

### A. Overview
- Purpose: the generic content block: Image & Text, Text split (`no-image`), Background image, Card; eyebrow, tags, date, reading time, listen / download / share, title + View All, author, description, image or Lottie, stats, links / CTAs, short description; many Style options.
- Files: `blocks/teaser/teaser.js` (320), `teaser.css` (725), `_teaser.json` (1868 lines). Key-value block (`readProperties`); items `teaser-link` (3 cells, has a link) and `teaser-stat` (3 cells: tab, label, value) told apart by `hasLink` (teaser.js:235-237).
- Parents: section, columns-container, gen-carousel. pkg 147 instances / 27 pages; `teaser-link` 60 / 10; `teaser-stat` 15 / 4; legacy Links / Stats: 0.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Eyebrow (`eyebrow`) | text | teaser.js:253-255 | OK | Retain |
| Show Eyebrow (`showEyebrow`) | bool, default true (template + model) | `isShown` (missing row = on) teaser.js:66, 253 | Redundant with leaving Eyebrow empty; polarity differs from Testimonial "Hide Eyebrow" | Retain (low value); align naming across blocks |
| Title (`title`) | text | `buildHeading` teaser.js:63 | OK | Retain |
| Title Type (`titleType`) | H1-H6, default h2 | Collapses into heading tag; `props.titletype` dead read | OK | Retain |
| Hide Title (`titleHidden`) | bool | `hideVisually` teaser.js:267 | OK (kept for SR) | Retain |
| Description (`description`) | richtext | teaser.js:288-290 | OK | Retain |
| Show Description (`showDescription`) | bool, default true | `isShown` teaser.js:288 | Same as Show Eyebrow | Retain |
| Short Description (`shortDescription`) | richtext | teaser.js:297-299 | OK (pkg 1) | Retain |
| View All Text (`viewAllText`) | text | Collapses into View All link text | OK | Retain |
| View All Link (`viewAll`) | aem-content | Primary button teaser.js:270-276 | OK (pkg 1) | Retain |
| Show Date (`showDate`) | bool, default false | teaser.js:83 | Article-meta overlap with Page Header (see Redundancy) pkg 2 | Retain / review |
| Date (`date`) | date-time, cond showDate | `buildPublished` teaser.js:84-89 | OK | Retain |
| Date Format (`dateFormat`) | 4 formats, default dd-mm-yyyy (template, model, code teaser.js:87) | utils/dates.js:23-32 supports all 4 | OK | Retain |
| Date label (`dateLabel`) | text, cond showDate | teaser.js:85 | OK (authored, not a placeholder: acceptable, it's content) | Retain |
| Reading time (`readingTime`) | text | `buildReadingTime` (placeholder `minRead`) | pkg 1; overlap with Page Header | Retain / review |
| Display Tags (`displayTags`) | bool | teaser.js:72-73 | OK | Retain |
| Tags (`tags`) | aem-tag multi, cond displayTags | `resolveTags(readTagValues)` teaser.js:73 | OK | Retain |
| Listen link (`listenLink`) | aem-content | `buildPageActions` teaser.js:93-100 | pkg 1 | Retain / review |
| Download (`download`) | bool | print button | pkg 1 | Retain / review |
| Share (`socialShare`) | bool | share / copy + `role=status` | pkg 1 | Retain / review |
| Author name / designation / image / image alt (`authorName`, `authorDesignation`, `authorImage`, `authorImageAlt`) | text / text / reference / text | `buildAuthorLockup` teaser.js:106-114; alt collapses into `img alt` | pkg 1 each; duplicates Page Header's Authors-sheet author | Retain / review |
| Image type (`imageFormat`) | Default / Lotto `lottie` | teaser.js:210 | Redundant with `.json` detection (as Hero) | Deprecate (auto-detect) |
| Image (`image`) | reference | `buildMedia` teaser.js:205-226 | OK | Retain |
| Image alt text (`imageAlt`) | text | Collapses into `img alt` / link `title` (Lottie label teaser.js:213-215) | `textOf(props.imagealt)` dead read | Retain |
| Hide Image (`hideImage`) | bool | teaser.js:206 | OK | Retain |
| Image position (`imagePosition`) | Left / Right, default left (template, model, code) | teaser.js:243-244, 311; cond Layout = Image & Text | OK | Retain |
| Image position (mobile) (`imagePositionMobile`) | Default / Top / Bottom | Classes; CSS teaser.css:588-593, 665-667 | **Top renders identically to Default for Image & Text** (media is first in DOM; no rule); no effect for Background / Card (media absolute); no condition | Correct (D-B-11) |
| Image ratio (`imageRatio`) | Default (10:9) / 8:9 / 1:1 / Original; cond Image & Text or Text split | teaser.css:184-193 | In Text split the default is already `aspect-ratio: auto` (teaser.css:454-456): "Default (10:9)" = "Original" there; label wrong | Correct (D-B-10) |
| Image corners (`imageCorners`) | Rounded / Square; cond Image & Text or Text split | teaser.css:196-199 | **Rounded = Square in Text split** (`.teaser.no-image .teaser-media img {border-radius:0}` teaser.css:449-451) | Correct (D-B-10) |
| Multiple links (`multiLinks`) | bool, default false | teaser.js:163 | Description "Off: a primary and a secondary button" is inaccurate (each CTA has its own style incl. List / Text link). With Link items present and the toggle off, Primary / Secondary CTA are silently dropped (D-B-2) | Correct; long-term Merge into Link items |
| Links (`links`, container) + `ctaText`, `cta`, `ctaTarget`, `ctaStyle` | legacy, cond multiLinks | `readLinkItems(props.links)` teaser.js:169 | Exposed; pkg 0 | Deprecate -> Remove from dialog (D-B-14) |
| List arrow (`linkArrow`) | Right / Down right | class `arrow-down-right` (teaser.css:400) | Only affects List-style links; no condition possible per link; OK | Retain |
| Primary CTA Title / Link / Link Type / Link Style (`primaryCta*`) | style default primary (template, model, code fallback teaser.js:182) | teaser.js:181-192 | Overlaps Link items (per-link style): 8 fields + toggle for what Link items do. pkg primaryCta 72, secondaryCta 44 | Retain now; Merge into Link items by content migration later |
| Secondary CTA ... (`secondaryCta*`) | style default secondary | same | same | same |
| Stats (`stats`, container) + `statLabel`, `statValue` | legacy | `buildStats(props.stats, ...)` teaser.js:293 | Exposed; pkg 0 | Deprecate -> Remove from dialog (D-B-14) |
| Layout (`classes`) | Image & Text / Text split `no-image` / Background `background` / Card `card` | teaser.js:241, 305-312; CSS | Value `no-image` for a layout that may hold an image (legacy naming, label clear) | Retain |
| BG Color (`bgColor`) | Default / Grey / Dark / Dark green | `bg-{value}` class teaser.js:242, 307; teaser.css:25-55 | OK (inventory `css:false` for grey / dark-green is a static-match false negative) | Retain |
| Text alignment (`textAlignment`) | Layout default / left / center / right | OPTIONS teaser.js:50; CSS 526-565 | OK | Retain |
| Vertical alignment (`verticalAlignment`) | Layout default / top / middle / bottom | CSS 567-586, 703-709 | OK | Retain |
| Title size (`titleSize`) | Layout default / m / l / xl / display | CSS 597-619, 721 | Labels carry px values ("Medium (40px)") - technical but helpful; "Display (96px)" is 2.75rem (44px) on mobile (styles.css:163) | Retain; drop px from labels or say "desktop" |
| Title weight (`titleWeight`) | Layout default / regular / semibold | CSS 621-627 | OK | Retain |
| Description size (`descriptionSize`) | Layout default / 18px / 24px | CSS 629-637 | As Title size | Retain |
| Eyebrow style (`eyebrowStyle`) | Brand / Label | CSS 229 | OK | Retain |
| Top spacing (`topSpacing`) | Default / Page header | CSS 57-60, 649-651 | OK (pkg 1) | Retain |
| Personalization (`personalization`) | bool | Adds class / `data-personalization` only (teaser.js:313-317); nothing in the repo reads either (grep of blocks, styles, scripts, decorators, utils) and no Target / Tags is loaded | **Option without implemented behavior** (brief: must not be exposed) | Remove (D-B-3) |
| Additional: Animation / Speed / Trigger / Background animation | shared | motion-decorator.js:39 (`:scope > *`), :53 (layers only `.background, .card`) | Background animation is a no-op for Image & Text / Text split with Default BG (no colour, no layer; `prepareBackground` count 0, motion-decorator.js:148-149) | Correct condition (D-B-15) |

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Image & Text (left / right) | Side by side | 2-col grid >= 900px; `image-right` order | Retain |
| Image & Text without image | Centered text (Figma Careers) | `:not(.teaser-has-media)` centering | Retain |
| Text split | L3 / secondary header pattern | 2-col grid with kicker row | Retain (overlap with Page Header: see Redundancy) |
| Background image | Image behind centered text | Absolute media + overlay `::before` | Retain (overlap with Hero) |
| Card | Rounded card with image behind | Distinct CSS | Retain |
| Lotto | Lottie instead of picture | Plays; toggle inside `.teaser-media` (runtime: `#anchor-teaser-lottie` "Play animation" under reduced motion) | Retain; auto-detect |
| Links: Text link / List / Primary / Secondary | CTA styles | 4 distinct renders; `teaser-links-{style}` container class set but unused in CSS (teaser.js:153-154) | Retain; drop dead class (D-B-19) |
| Stats | dl of stats | stats-decorator.js | Retain |
| BG Grey / Dark / Dark green | Panels | Distinct | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Heading level | Authorable, H2 default | Delivered tag honoured; Hide Title keeps it for SR | - | Pass |
| Pause for Lottie | Button reachable | Present in media corner (runtime) | - | Pass |
| Reduced motion | Static | Lottie paused on frame 0; motion not prepared (motion-decorator.js:73) | - | Pass |
| Alt / decorative | From field | `pictureOf` sets `alt=""` when missing (image-decorator.js:19-21); author alt "Anita Rao" next to the visible name is redundant but authored | Author guidance | Pass |
| New window links | Announced | List links (`setLinkTarget`, teaser.js:144) and buttons (teaser.js:150) not announced; List shows an up-right arrow visually only (teaser.css:386) | D-B-4 | **Fail** |
| Live announcement | Share copy confirmed | `role=status` with unique id (article-meta-decorator.js:55-58, 89) | - | Pass |
| Page action buttons | Named buttons | `createIconButton` labels from placeholders | - | Pass |
| Lists / stats semantics | ul / dl | `ul.teaser-link-list`, `dl > div > dt + dd` | - | Pass |
| Colour contrast | 4.5:1 | axe: eyebrow 4.43:1, description `#999` 2.84:1 on every light teaser | D-B-16 | **Fail** |
| Duplicate ids | none | none (runtime, 3 pages) | - | Pass |

### F. Data layer
- State: `teaser-{n}` / anchor id, `dc:title` = first heading (also when visually hidden: correct). Runtime: 11-13 entries per page, titles correct.
- Clicks central; listen / download / share carry `data-cmp-interaction` (article-meta-decorator.js:63, 73, 96); Lottie toggle `animation`. No pushes from the block. No duplicate risk found.

### G. Personalization
Entire block. The **Personalization** toggle is a marker with no runtime (no Target / Tags, no reader of `.personalization` / `data-personalization`): remove it (D-B-3). If Target is introduced later, use an experience-container approach at section / fragment level rather than a per-block boolean.

### H. Decision
**Modify**: D-B-2, D-B-3, D-B-4, D-B-10, D-B-11, D-B-15, D-B-19; deprecate Image type (auto-detect), legacy Links / Stats containers; plan migration of Primary / Secondary CTA fields to Link items (removes 9 fields + toggle); review article-meta fields against Page Header.

---

## Item: Link (`teaser-link`, class `link`)
- A: Row of 3 cells (`link`+text, `linkTarget`, `linkStyle`); `itemRows(..., KEY_VALUE_ITEM && hasLink)` teaser.js:236. pkg 60 / 10 pages.
- C:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| CTA Link (`link`, required) | aem-content | links.js:64 | OK | Retain |
| CTA Title (`linkText`) | text | collapses | OK | Retain |
| CTA Link Type (`linkTarget`) | Default / new-window | teaser.js:144 / 150 | Not announced (D-B-4) | Retain + Correct |
| CTA Link Style (`linkStyle`) | Text link `""` / list / primary / secondary; default `""` (model = code) | teaser.js:170-174 | OK; item fallback `''` intentionally ignores Multi Link Style | Retain |

- H: Retain. Note (suspected, D-B-21): on the published page a Stat item whose richtext contains a link would be read as a Link item (teaser.js:235-237).

## Item: Stat (`teaser-stat`, class `stat`)
- A: Row of 3 cells (tab, label, value); `readStatRows` takes the last two cells (stats-decorator.js:33-40). pkg 15 / 4 pages.
- C:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Stats Title (`statLabel`) | richtext | `dt` (stats-decorator.js:64-66) | Label "Stats Title" for one stat's label | Rename "Stat label" |
| Stats Value (`statValue`) | richtext | `dd`; item skipped when empty | Label "Stats Value" | Rename "Stat value" |

- H: Retain (rename labels; same for `testimonial-stat`).

---

## Block: Page Header (`page-header`, class `page-header`)

### A. Overview
- Purpose: page header built from page metadata (title, description, tags, content-type, publish-date, reading-time, author-id via Authors sheet, featured-image, listen-link); only Layout and CTAs authored. Layouts landing / secondary / article / display; default from Page Type.
- Files: `page-header.js` (215), `page-header.css` (278), `_page-header.json`. Key-value; item `page-header-cta` (3 cells). Parent: section only. pkg 18 / 18; items 26 / 15; legacy CTA List 0.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Layout (`classes`) | Default (from Page Type) / landing / secondary / article / display | `layoutOf` page-header.js:41-44; CSS per layout | OK; tab named "Style" although it holds the only content choice | Retain (rename tab "Layout" optional) |
| CTA List (`ctas`) + `ctaText`, `cta`, `ctaTarget`, `ctaStyle` | legacy; `ctaStyle` default primary (json:120) | `readLinkItems(props.ctas)` page-header.js:178, style page-header.js:73 | Exposed in its own "CTAs" tab; pkg 0. Same default mismatch as D-B-7 | Deprecate -> Remove from dialog (D-B-14) |
| Additional: Animation Type / Speed / Trigger | shared | Not in CONTENT_TARGETS: the whole block animates (motion-decorator.js:99) | OK; no Background animation (no authored background) | Retain |

### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Landing | Text + featured image (LCP eager) | page-header.js:191-195, 141-156 | Retain; featured image alt (D-B-12) |
| Secondary | Eyebrow above title / text | :196-199 | Retain |
| Article | Meta row (tags, content type, date, reading time, listen / download / share), author | :204-208 | Retain |
| Display | Tags eyebrow, display title | :200-203 | Retain |
| Default | landing for landing / listing page types, else article | :41-44 | Retain |
| CTA Text link / Primary / Secondary | Button types | distinct | Retain (D-B-7) |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Heading | H1 = page title | `h1.page-header-title` from metadata (runtime `article`: H1) | If a Hero with default H1 follows, the page has two H1s: author guidance | Pass |
| Featured image alt | From `image-alt` metadata when meaningful | Always `alt=""` (page-header.js:143); `image-alt` column exists and List uses it (list-data.js:45) | D-B-12 | **Partial** |
| Author image | Decorative next to name | `alt=""` (page-header.js:105) | - | Pass |
| LinkedIn link new tab | Announced | `announceNewTab` (page-header.js:94) | - | Pass |
| CTA new window | Announced | Not announced (page-header.js:74) | D-B-4 | **Fail** |
| Share status | Live region | `role=status` | - | Pass |
| Colour contrast | 4.5:1 | axe: tags `#999` 2.84:1 | D-B-16 | **Fail** |

### F. Data layer
State entry (runtime: `anchor-...:page-header:` + page title). Page actions with `data-cmp-interaction` listen / download / share. No pushes, no duplicates.

### G. Personalization
Data source (metadata-driven): not personalizable at block level; personalize the page metadata / page variant instead.

### H. Decision
**Retain / Modify**: D-B-4, D-B-7, D-B-12; remove legacy CTA List from the dialog after production check.

## Item: CTA (`page-header-cta`, class `cta`)
- A: 3 cells (`link`+text, `linkTarget`, `linkStyle`), `KEY_VALUE_ITEM` (page-header.js:164). pkg 26 / 15.
- C:

| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| CTA Link (`link`, required) | aem-content | links.js:64 | OK | Retain |
| CTA Title (`linkText`) | text | collapses | OK | Retain |
| CTA Link Type (`linkTarget`) | Default / new-window | page-header.js:74 | Not announced (D-B-4) | Retain + Correct |
| CTA Link Style (`linkStyle`) | Text link `""` / primary / secondary; **model default primary** (json:879), no template default (json:29), **code fallback tertiary** (page-header.js:73) | | "Text link" `""` cannot be told from unset; unset items render as text link while the dialog shows Primary Button (pkg: 1 item unset) | Correct (D-B-7) |

---

## Block: Quote (`quote`, class `quote`)

### A. Overview
Eyebrow + title above a quote card with decorative quote marks overlapping a portrait image (Figma "Text & Image Overlap"). `quote.js` (58), `quote.css` (194), `_quote.json`. Key-value, no items. Parents: section, columns-container. pkg 12 / 5.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Eyebrow (`eyebrow`) | text | quote.js:29 | OK | Retain |
| Title (`title`) | text | `buildHeading` quote.js:30 | OK | Retain |
| Title Type (`titleType`) | H1-H6, default h2 | collapses into heading | OK | Retain |
| Quote (`quote`) | richtext | `blockquote.quote-text` quote.js:37 | OK | Retain |
| Quote Author (`author`) | richtext | `figcaption.quote-author` quote.js:38 | figcaption not a child of figure (D-B-6) | Retain + Correct code |
| Image (`image`) | reference | `pictureOf` quote.js:44 | OK | Retain |
| Image Alt Text (`imageAlt`) | text | collapses into `img alt` | OK | Retain |
| Image Position (Desktop) (`imagePosition`) | right / left, default right (template, model, code quote.js:23) | `image-left` class; CSS 183-193 | No condition on Image set (minor) | Retain |
| Image Position (Mobile) (`imagePositionMobile`) | top / bottom, default top (all three) | `image-bottom`; CSS 79-85 | OK | Retain |
| Style (`classes`) | single option Default `""` (json:145) | none | **Select with one option, no effect** | Remove (D-B-9) |
| BG Color (`bgColor`) | Default / Grey | `bg-grey` quote.js:52-53; CSS 10-14 | OK | Retain |
| Additional incl. Background animation | shared | motion-decorator.js:40, :55 (colour only) | Default BG is white (`--quote-bg`), so Background animation animates white; visible only on a non-white section or with Grey | Retain; description note |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Image right / left (desktop) | Mirror | Grid areas swap | Retain |
| Image top / bottom (mobile) | Order | `order` swap | Retain |
| Text only | No image | `:not(.quote-has-media)` | Retain |
| Grey | Panel | padding + bg | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Quote semantics | `figure > blockquote + figcaption` | `figure.quote-card > div.quote-card-text > blockquote + figcaption`; runtime: every figcaption's parent is `DIV.quote-card-text` (invalid: figcaption must be a child of figure) | D-B-6 | **Fail** |
| Decorative quote marks | Not announced | `content: '\201C' / ''` (quote.css:97-104) | - | Pass |
| Heading | Authorable | OK | - | Pass |
| Image alt | From field | `alt` delivered (runtime "Portrait of ...") | - | Pass |
| Colour contrast | 4.5:1 | axe: eyebrow `#999` 2.84:1 / 2.61:1 on grey | D-B-16 | **Fail** |

### F. Data layer
State only (runtime: 7 entries, titles = block title). No interactive elements. OK.

### G. Personalization
Not personalizable / entire block at most. No field.

### H. Decision
**Retain / Modify** (D-B-6, D-B-9). See Quote vs Testimonial below.

---

## Block: Testimonial (`testimonial`, class `testimonial`)

### A. Overview
Section title, centered eyebrow, quote, author (name, avatar, designation & location), stats. `testimonial.js` (77), `testimonial.css` (150), `_testimonial.json`. Key-value; item `testimonial-stat` (3 cells). Parents: section, columns-container. pkg 17 / 7; items 32 / 3; legacy Stats 0.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Eyebrow (`eyebrow`) | text | testimonial.js:58-60 | OK | Retain |
| Title (`title`) | text | `buildHeading` :52 | OK | Retain |
| Title Type (`titleType`) | H1-H6, default h2 | collapses | OK | Retain |
| Description (`description`) | richtext ("The testimonial quote.") | `blockquote` :61-63 | Label "Description" for the quote; Quote block calls it "Quote" | Rename label "Quote" (name unchanged) |
| Author (`authorName`) | text; description "e.g. Ranil Boteju, Chief Data & Analytics Officer, Lloyds Banking Group" (json:105) | `p.testimonial-author-name` :33-35 | Example mixes designation into the name | Correct description (D-B-18) |
| Author Image (`authorImage`) | reference | `pictureOf` :24 | OK | Retain |
| Author Image Alt Text (`authorImageAlt`) | text ("Leave empty if the name is next to the image") | collapses | OK, good guidance | Retain |
| Designation & Location (`designationLocation`) | richtext; description "e.g. name, designation, organisation." (json:126) | `div.testimonial-author-details` :36-38 | Description says "name" (wrong field) | Correct (D-B-18) |
| Stats (`stats`) + `statLabel`, `statValue` | legacy | `buildStats(props.stats, ...)` :72 | Exposed; pkg 0 | Deprecate -> Remove from dialog (D-B-14) |
| Style (`classes`) | single option Default (json:161) | none | **No effect** | Remove (D-B-9) |
| BG Color (`bgColor`) | Default / Grey | :50, 74-75; CSS 8-11 | OK | Retain |
| Hide Eyebrow (`hideEyebrow`) | bool false | :58 | Opposite polarity to Teaser "Show Eyebrow" | Retain; align vocabulary later |
| Hide Title (`titleHidden`) | bool false | :54 | OK | Retain |
| Show Description (`showDescription`) | bool, default true (template + model) | **`isOn`** :61: a missing row hides the quote | Default mismatch model (true) vs code (missing = false) (D-B-5) | Correct |
| Hide Author Details (`hideAuthor`) | bool false | :65 | OK | Retain |
| Additional incl. Background animation | shared | motion-decorator.js:41, :56 (colour only) | Default BG has no background colour: Background animation does nothing unless BG Color = Grey (`prepareBackground` count 0) | Correct condition (D-B-15) |

### D. Variations
| Variation | Purpose | Result | Action |
|---|---|---|---|
| Default / Grey | Panel | distinct | Retain |
| Author with photo / text only | Attribution | distinct | Retain |
| Stats | dl | distinct | Retain |
| Hide eyebrow / title / description / author | Reduce content | distinct (title visually hidden only) | Retain |

### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Quote semantics | figure / blockquote / figcaption | `figure > p.eyebrow + blockquote + figcaption` (runtime parent FIGURE) | - | Pass |
| Avatar alt | Decorative next to the name | `alt=""` (runtime) | - | Pass |
| Stats | dl | `dl > div > dt + dd` | - | Pass |
| Colour contrast | 4.5:1 | axe: stat labels `#999` 2.84:1 / 2.61:1 | D-B-16 | **Fail** |

### F. Data layer
State only (11 entries on the variations page). OK.

### G. Personalization
Not personalizable / entire block. No field.

### H. Decision
**Retain / Modify** (D-B-5, D-B-9, D-B-15, D-B-18).

## Item: Stat (`testimonial-stat`, class `stat`)
Same model and reader as `teaser-stat` (3 cells, last two read). pkg 32 / 3. Fields Stats Title / Stats Value: Retain, rename "Stat label" / "Stat value".

---

## Block: Interactive Dashboard (`interactive-dashboard`, class `interactive-dashboard`)

### A. Overview
Placeholder: `interactive-dashboard.js` empties the block and sets `data-placeholder="Interactive Dashboard"`; CSS hides it on the site, shows a dashed box "Interactive Dashboard (placeholder)" in UE. Model = Additional tab only. Allowed in sections (`models/_section.json:111`) and Columns Container (`_columns-container.json:924`). pkg 1 / 1. Handover lists it as not implemented.

### C. Dialog validation
| Field (name) | Current values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Anchor ID / Hide block / Padding / Margin | shared | block-options-decorator | Nothing visible to space or anchor | Remove with the block from the palette |
| Animation Type / Speed / Trigger | shared | animates an empty, `display:none` block | Options without effect | Remove with the block from the palette |

### D. Variations
None.

### E. Accessibility
Renders nothing on the site (runtime: empty, no axe findings). Editor label is hard-coded English in JS / CSS (`interactive-dashboard.js:12`, CSS `::before`), editor-only: minor.

### F. Data layer
Still tracked as a component with no title (runtime `anchor-interactive-dashboard:interactive-dashboard:`): noise entry.

### G. Personalization
Not personalizable.

### H. Decision
**Remove from the authoring palette until implemented** (D-B-17): drop it from the section and Columns Container filters; keep the folder so the 1 existing instance keeps rendering nothing.

---

## Redundant block assessment

| Existing blocks | Overlap | Unique capabilities | Existing usage (pkg) | Decision | Target | Migration |
|---|---|---|---|---|---|---|
| Hero vs Teaser (Background image layout) | Image behind text under an overlay, eyebrow / title / description / CTAs, Lottie, background animation | Hero: icon, 9 content positions, contained image, 4 overlay colours, LCP eager image, H1 default, 53rem first-screen sizing. Teaser Background: smaller banner inside the content flow with the Teaser's meta / stats / link list | Hero 182; Teaser `background` 15 | Retain both | - | None now; if the design system treats mid-page banners as heroes, migrate Teaser `background` to Hero (H2) later |
| Teaser (Text split + Top spacing + article fields) vs Page Header (secondary / article) | Eyebrow + title left / description + CTAs right; date, reading time, listen / download / share, author, tags | Page Header: metadata-driven single source (Authors sheet, taxonomy, bulk metadata), always H1, featured image. Teaser: authored, any heading level, stats, link lists | Page Header 18; Teaser article fields 1-3 uses each (block library only) | Retain both; **Deprecate the Teaser's article-meta fields** (showDate / date / dateFormat / dateLabel, readingTime, listenLink, download, socialShare, author*) for page headers | Page Header | Confirm production usage; pages using a Teaser as page header move the values to page metadata and use Page Header (secondary / article); then remove the 13 fields from the Teaser dialog (readers can stay one release) |
| Hero vs Page Header | Top-of-page header with H1 | Hero: visual banner; Page Header: metadata-driven text header | 182 / 18 | Retain both | - | Author guidance: one H1 per page (both default to H1) |
| Quote vs Testimonial | Quotation with attribution, eyebrow, title, Grey BG, figure / blockquote / figcaption | Quote: large portrait overlapped by the card, desktop / mobile image positions, quote marks. Testimonial: centered, avatar, designation, stats, hide toggles | Quote 12 / 5 pages; Testimonial 17 / 7 pages | Retain both (two distinct Figma components); harmonise field names and labels (Quote / Author / Image) and markup | - | Merge only if design merges them: Testimonial + Layout "Portrait overlap" taking Quote's image fields; low usage makes a later migration cheap |

---

## Defects

Verified = reproduced at runtime or proven by reading the code path end to end. Suspected = plausible from code, not reproduced.

**D-B-1 (major, verified) Hero Lottie pause / play button is never rendered.**
- `blocks/hero/hero.js:102` appends `animation.animationToggle` to the block, `hero.js:206` then calls `block.replaceChildren(...[media, content])`, removing it. Runtime `hero/hero-overview`: Lottie SVG present in `#anchor-hero-lotto`, `document.querySelectorAll('.animation-toggle').length === 0`. A looping animation without pause fails WCAG 2.2.2.
- Fix: keep the toggle on the media and re-append it last:
  ```js
  // buildMedia
  media.append(animation);
  media.animationToggle = animation.animationToggle; // instead of block.append(...)
  // decorate
  block.replaceChildren(...[media, content, media?.animationToggle].filter(Boolean));
  ```
  CSS `.hero .animation-toggle` (hero.css:143-148) already positions it; motion targets only `.hero-content` (motion-decorator.js:31), so the button isn't animated. No content change.

**D-B-2 (major, verified by code) Teaser drops the Primary / Secondary CTA when any Link item exists.**
- `blocks/teaser/teaser.js:163` `if (isOn(props.multilinks) || rows.length)` switches to the multiple-links branch as soon as one Link item is present; `primaryCta` / `secondaryCta` (still shown in the dialog because the condition is `!multiLinks`) are then ignored. No pkg instance has both (scan: 0), so the fix is compatible.
- Fix: render the two CTAs first when Multiple links is off, then the items:
  ```js
  const multi = isOn(props.multilinks);
  const ctas = multi ? [] : [/* existing primary / secondary mapping, teaser.js:181-192 */];
  const legacy = multi ? readLinkItems(props.links).map(... fallback multilinkstyle ...) : [];
  const items = readLinkRows(rows).map((item) => ({ ...item, style: item.values.find((v) => LINK_STYLES.includes(v)) || '' }));
  entries = [...ctas, ...legacy, ...items];
  ```
  Keep `moveInstrumentation` and editor placeholders as today. Update the Multiple links description: "On: the Links list (authored before Link items). Off: Primary and Secondary CTA. Link items are always shown after them."

**D-B-3 (major, verified) Teaser "Personalization" option has no runtime behavior.**
- `blocks/teaser/_teaser.json:991` (Style tab); `teaser.js:313-317` only adds class `personalization` and `data-personalization`. Nothing reads them (grep of blocks, styles, scripts, decorators, utils) and no Target / Tags is loaded (brief). pkg: 1 instance (block library `teaser/article-meta`).
- Fix: remove the field from `_teaser.json`, run `npm run build:json`, delete teaser.js:313-317 (the markers have no visual effect, so existing content renders identically); remove the block-library example.

**D-B-4 (major per AGENTS.md accessibility rule, verified) CTAs / links opening a new window are not announced.**
- Hero `hero.js:169-173`, Teaser `teaser.js:144` (List) and `:150` (buttons), Page Header `page-header.js:74`: `target=_blank` is set by `decorateButton` / `setLinkTarget` without `announceNewTab`. Runtime: `#anchor-hero-cta-new-window` "Read the full report" has `target=_blank`, no hidden text, no aria-label. AGENTS.md: "links opening a new tab say so (announceNewTab)" (WCAG technique G201).
- Fix (shared, one place): in `decorators/button-decorator.js` add an option `newTabHint` and call `announceNewTab(button, options.newTabHint)` when `options.newWindow`; Teaser and Page Header already have `t` (pass `newTabHint: t('opensInNewTab', '(opens in a new tab)')`, also call `announceNewTab` after `setLinkTarget` in teaser.js:144). Hero: load placeholders only when a CTA opens a new window:
  ```js
  const all = [...readLinkItems(cell), ...readLinkRows(rows)];
  const t = all.some(({ newWindow }) => newWindow) ? await getPlaceholders() : null;
  ```
  No content change.

**D-B-5 (minor, verified by code) Testimonial hides the quote when the Show Description row is missing.**
- `blocks/testimonial/testimonial.js:61` uses `isOn(props.showdescription)` (missing row = off) while template and model default to true (`_testimonial.json:206`); the Teaser handles the same toggle with `isShown` (missing = on, teaser.js:66). Content created without the property (imports, older content, API) loses its quote. pkg: all 17 have the row, so no visible change today.
- Fix: move `isShown` to `utils/properties.js` (`export const isOnByDefault = (cell) => !cell || isOn(cell);`), use it in teaser.js:66 and testimonial.js:61.

**D-B-6 (minor, verified) Quote: `figcaption` is not a child of `figure`.**
- `blocks/quote/quote.js:33-39`: `figure.quote-card > div.quote-card-text > blockquote + figcaption`; runtime: every `figcaption` parent is `DIV.quote-card-text`. Invalid HTML; the caption isn't associated with the figure.
- Fix (no CSS selector change, classes kept): `const card = document.createElement('div'); card.className = 'quote-card'; const text = document.createElement('figure'); text.className = 'quote-card-text';` and add `margin: 0;` to `.quote .quote-card-text` (quote.css:107).

**D-B-7 (minor, verified by code) Page Header CTA style: model default, template and code disagree; "Text link" equals unset.**
- `page-header-cta` `linkStyle` model default `primary` (`_page-header.json:879`), definition template without `linkStyle` (`_page-header.json:29`), code fallback `tertiary` (`page-header.js:73`); option "Text link" has value `""`, indistinguishable from unset. Legacy `ctaStyle` same (`_page-header.json:120`). pkg: 1 item unset (renders text link while the dialog shows Primary Button).
- Fix: give Text link the explicit value `tertiary` (model options of `linkStyle` and `ctaStyle`), add `"linkStyle": "primary"` to the `page-header-cta` template, accept `tertiary` in `CTA_STYLES` (`['primary', 'secondary', 'tertiary']`), keep the empty fallback `tertiary` so existing unset items render as today; set the 1 unset pkg item explicitly. Apply the same pattern to Hero / Teaser "Default / Text link" `""` options for consistency (optional).

**D-B-8 (minor, verified by code) Hero CTA Arrow: dialog default "Right" vs runtime "auto".**
- `hero-cta` `linkArrow` model default `right` (`_hero.json:1192`), no template default (`_hero.json:32`); code: no value + `href^="#"` -> down (`hero.js:174-177`). pkg: 88 of 214 items unset. Authors can't select the automatic behavior and see "Right" for items that render Down.
- Fix: options `Auto (down for links to this page's sections)` = `""` (new default), `Right` = `right`, `Down` = `down`; model `value: ""` for `linkArrow` and legacy `ctaArrow` (`_hero.json:212`). Code unchanged; existing values unchanged.

**D-B-9 (minor, verified) Quote and Testimonial "Style" selects have one option and no effect.**
- `_quote.json:145`, `_testimonial.json:161` (`classes`, only `Default = ""`).
- Fix: remove both fields; `npm run build:json`. No class was ever produced, so content is unaffected.

**D-B-10 (minor, verified by CSS) Teaser Image corners / Image ratio options render identically in Text split.**
- Corners: `.teaser.no-image .teaser-media img { border-radius: 0 }` (teaser.css:449-451) makes Rounded = Square in Text split while the condition (`_teaser.json:462`) shows the field there. Ratio: `.teaser.no-image:not(.ratio-8-9, .ratio-1-1) .teaser-media img { aspect-ratio: auto }` (teaser.css:454-456) makes "Default (10:9)" = "Original" in Text split (`_teaser.json:408`).
- Fix: Image corners condition = Image & Text only (`{"or":[{"!":{"var":"classes"}},{"===":[{"var":"classes"},""]}]}`); Image ratio option label "Layout default (10:9, original in Text split)". No content change.

**D-B-11 (minor, verified by CSS) Teaser Image position (mobile): "Top" = "Default" for Image & Text; no effect for Background / Card.**
- `_teaser.json:386`; CSS only orders `.no-image.mobile-image-top` (teaser.css:592) and `.mobile-image-bottom` (588); media is absolute in Background / Card (477-481).
- Fix: condition `classes` in `""` / `no-image`; description "Default: above the text (Image & Text), in the text order (Text split)". No content change.

**D-B-12 (minor, verified by code) Page Header featured image always decorative.**
- `page-header.js:143` builds the featured image with `alt: ''`; the bulk metadata column `image-alt` exists (AGENTS.md columns) and List reads it (`blocks/list/list-data.js:45`), but `getPageMetadata` (`utils/metadata.js:68-95`) doesn't expose it.
- Fix: add `imageAlt: getMetadata('image-alt')` to `getPageMetadata` and use `{ src: metadata.featuredImage, alt: metadata.imageAlt || '' }`. Empty stays decorative (current behavior).

**D-B-13 (minor, verified) Hero Motion Type duplicates the Additional tab animations.**
- `_hero.json:230`, `hero.js:43-50`, `hero.css:264-301`: Fade in = Animation Type Fade in; Slide up (opacity + translateY) = Fade up; Zoom = Background animation Scale reveal; it ignores Motion Speed / Trigger; pkg 5 uses.
- Fix: map legacy classes in `hero.js` before motion is prepared (`decorate` runs before `prepareMotion`): `motion-fade` -> add `motion-fade-in`, `motion-slide` -> `motion-fade-up`, `motion-zoom` -> `bg-motion-scale` (only when no Additional value is set; add `motion-slow` to approximate 800 ms); delete `observeMotion`, the CSS block 264-301; remove the field from the model after migrating the 5 pkg instances (or keep the mapping permanently so unmigrated content still animates).

**D-B-14 (minor, verified) Legacy composite multifields still exposed in dialogs.**
- Hero `ctas` (`_hero.json:152`), Teaser `links` (`:515`) and `stats` (`:752`), Page Header `ctas` (`:82`, own "CTAs" tab), Testimonial `stats` (`_testimonial.json:131`). pkg usage 0 for all; AGENTS.md: composite multifields didn't render from content packages; new content uses items.
- Fix: (1) query production author for nodes with these properties under `/content/tcs-corp` (composite multifields store child nodes, e.g. `ctas/item0`); (2) if none: remove the five containers from the models and `npm run build:json`; keep the readers (`readLinkItems`, `readStats`) one release; (3) if some exist: migrate them to items with a script, then remove. Removing is safe for row layout: Hero classifies cells by content (hero.js:76-88), the others are key-value. A self-referencing hide condition (`{"!!":{"var":"ctas"}}`) is an untested alternative (no precedent in the repo; verify in UE first).

**D-B-15 (minor, verified by code) Background animation offered where it can't animate.**
- `prepareBackground` returns false when the block has no visible colour, overlay or layer (motion-decorator.js:142-149): Testimonial with Default BG (no background, testimonial.css:2-11) and Teaser Image & Text / Text split with Default BG (layers only for `.background, .card`, motion-decorator.js:53).
- Fix: model conditions: Testimonial `classes_bganimation` shown when `bgColor === "grey"`; Teaser when `bgColor !== ""` or `classes` in `background` / `card` (also include `classes_bganimation` in the Speed / Trigger conditions as today). No content change (values stay valid, they just do nothing).

**D-B-16 (major, verified, cross-cutting) Text colour tokens fail WCAG 1.4.3 in all group-B blocks.**
- axe at 1440px: `--color-text-secondary` = `--grey-400` `#999` (styles/styles.css:34, 103): 2.84:1 on white, 2.61:1 on `#f5f5f5` (Hero / Teaser descriptions, Quote eyebrow, Testimonial stat labels, Page Header tags); `--color-text-brand` = `--brand-500` `#4673db` (:24, 106): 4.43:1 for 16px eyebrows (Hero, Teaser).
- Fix (design decision, global): `--color-text-secondary: var(--grey-500)` (`#525252`, approx. 7.8:1) and a brand text shade of at least 4.5:1 (e.g. darken `--brand-500` for text use only, keep it for fills). Coordinate with the other review groups; one token change fixes every block.

**D-B-17 (minor, verified) Interactive Dashboard placeholder is in the authoring palette.**
- `models/_section.json:111`, `blocks/columns-container/_columns-container.json:924`; the block renders nothing (`interactive-dashboard.js:10-13`, CSS `:empty {display:none}`), its Additional tab options have no effect, and it adds an untitled data layer component.
- Fix: remove `interactive-dashboard` from both filters (`npm run build:json`); keep the block folder so the 1 pkg instance renders nothing; re-add when implemented.

**D-B-18 (minor, verified) Testimonial author field descriptions are wrong.**
- `_testimonial.json:105` Author "e.g. Ranil Boteju, Chief Data & Analytics Officer, Lloyds Banking Group" (puts designation into the name); `:126` Designation & Location "e.g. name, designation, organisation." (says name).
- Fix: Author "The person's name, e.g. Ranil Boteju."; Designation & Location "e.g. Chief Data & Analytics Officer, Lloyds Banking Group, London."

**D-B-19 (minor, verified) Dead classes `teaser-links-{style}` / `teaser-links-mixed`.**
- `teaser.js:153-154`; no CSS or JS reads them.
- Fix: delete the two lines.

**D-B-20 (minor, suspected) Hero cell classification can misread unusual content.**
- `hero.js:66-87`: a content cell holding only the icon (no eyebrow / title / description) passes `isMediaCell` and becomes the hero media; a content cell with only a link paragraph and no heading passes `isCtaCell` and is rendered as a CTA. Not present in pkg.
- Fix: in Universal Editor use the instrumentation (`data-aue-prop`) when present; on the page, prefer the row order of the model (content group row first, image row second) before content sniffing, e.g. treat the first row as content when it has no `a[href$=".json"]` and the second row has a picture.

**D-B-21 (minor, suspected) Teaser Stat item with a link is read as a Link item on the page.**
- `teaser.js:235-237` separates items by `hasLink`; a Stat item whose richtext label contains a link matches the Link predicate (both have 3 cells). Not present in pkg.
- Fix: also require the link in the first cell for Link items (`row.children[0].querySelector('a[href]')`); Stat items start with an empty tab cell.

### Not defects (observations)
- `props.titletype`, `props.imagealt`, `props.authorimagealt` reads are dead because of field collapse; harmless (fallback to delivered markup).
- Hero and Page Header both default to H1; gen-carousel library content already sets H2 on later slides.
- Hero has no video background option (only image / Lottie), so no video pause control is needed.
- Analytics / Target / consent runtime: BLOCKED (not loaded); only the data layer code paths above were checked.
