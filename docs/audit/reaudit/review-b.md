# Re-audit B: Hero, Teaser, Page Header, Quote, Testimonial, Interactive Dashboard (+ items)

Second, fresh review of group B. Read-only on `/backups/sradha-tcs/tcs-corp/repo`, branch `fix/block-reaudit` at `19ff770` (main after PR #118 and #119), clean.

**Evidence used**
- Code: `blocks/{hero,teaser,page-header,quote,testimonial,interactive-dashboard}/*`, the shared modules they import (`utils/{cells,links,properties,motion,media,metadata}.js`, `decorators/{button,link,a11y,animation,stats,motion,data-layer,editor-item}-decorator.js`), `scripts/aem.js` (`wrapTextNodes`), `styles/styles.css` tokens.
- Models and usage: `_<block>.json`, `/tmp/audit2/inventory-before.json` (content package 1.0.8 usage: "pkg").
- Published preview (content package 1.0.6, current code): 11 pages loaded with Playwright (hero-overview, hero-motion, hero-ctas, hero-styles, teaser layouts / article-meta / links-and-stats / image-options-and-colours, page-header cta-text-link, quote-variations, testimonial-variations); their `.plain.html` saved in `/tmp/audit2/b/pub-*.plain.html`. Scripts and raw output: `/tmp/audit2/b/runtime.mjs` (`pub-hero.json`, `pub-teaser.json`, `pub-rest.json`), local runs `loc-*.json`.
- Contrast over images: `/tmp/audit2/b/sample.mjs` (text made transparent, the pixels behind it screenshotted, ratio of the computed text colour against every 4th pixel; min / median reported).
- Synthetic AEM-shaped content (served by request interception on the local preview, no repository file written): `/tmp/audit2/b/synthetic.mjs`, output `synthetic.json` (new-window CTAs, icon-only hero content, Lottie link carrying its alt as text, Stat with a link, Testimonial without the Show Description row, Interactive Dashboard).
- axe-core 4 (wcag2a / wcag2aa / best-practice) on every page: 0 violations everywhere; note that axe returns "incomplete" (not "violation") for text over background images, so the hero / teaser image cases were measured with `sample.mjs`.
- Not tested: Universal Editor itself (dialog conditions, saving of empty select values); Analytics / Target / consent runtime (BLOCKED: none loaded).

---

### Block: Hero (`hero`, class `hero`)

#### A. Overview
- Purpose: full-width banner (Figma "L1 Header"): image or Lottie background (cover / contained) under a light, dark or no overlay; icon, eyebrow, title, description; CTA items; 3x3 content position and text alignment.
- Files: `blocks/hero/hero.js` (221 lines), `hero.css` (316), `_hero.json`. Not key-value: one row per field, plus one empty row per dialog tab (verified on aem.page: rows = Content tab, content group, image, CTA List, Style tab, Additional tab); CTA items are rows of 4 cells after them (`FIELD_ROW_ITEM`).
- Items: `hero-cta` (filter `hero`). Parents: section, columns-container, gen-carousel, tabs (Tabs Container, new in PR #119).
- Usage (pkg): 182 instances / 141 pages; `bg-dark` 133, eyebrow 174, `hero-cta` 214. Legacy CTA List 0, Lotto 1 (library).

#### B. Status of the first audit's defects
| Id | Defect | Status now | Evidence |
|---|---|---|---|
| D-B-1 | Lottie pause / play never rendered | **Confirmed fixed** | `hero.js:107` keeps `media.animationToggle`, `hero.js:219` appends it last; runtime local and aem.page: one `BUTTON.animation-toggle` (parent `.hero`, visible, "Pause animation", `data-cmp-interaction=animation`) |
| D-B-4 | New-tab CTAs not announced | **Not fixed (fix ineffective)** | `hero.js:205` looks for a cell with no children whose text is `new-window`, but `aem.js:424-429` `wrapTextNodes` has already wrapped that text in a `<p>` before `decorate` runs, so the test is always false and `newTabHint` stays `''`. Runtime aem.page `#anchor-hero-cta-new-window` and synthetic page: `target=_blank`, text "Read the full report", no hidden hint. Teaser / Page Header are fixed (synthetic: "(opens in a new tab)" present). New defect **R-B-1** |
| D-B-8 | CTA Arrow default Right vs Auto | **Confirmed fixed** (items) | `_hero.json:1163` options Auto `""` (default) / right / down; code `hero.js:180-183` unchanged. Legacy CTA List `ctaArrow` still defaults to `right` (`_hero.json`, container `ctas`; pkg 0), left with D-B-14 |
| D-B-13 | Motion Type duplicates the Additional tab | **Confirmed fixed** | Field removed from `_hero.json`; `hero.js:34-36, 48-54, 220` maps `motion-fade` / `motion-slide` / `motion-zoom` via `utils/motion.js` `addLegacyMotion`. aem.page `hero-motion` (old content): classes after decoration `motion-fade-in motion-slow`, `motion-fade-up motion-slow`, `bg-motion-scale motion-slow` (+ `bg-motion-ready`), removed after playing; reduced motion: nothing prepared. See R-B-6 (cannot be turned off) |
| D-B-14 (Hero part) | Legacy CTA List still in the dialog | **Deferred, still present** | `_hero.json:152` `ctas` in the Content tab, description "CTAs authored before CTA items..."; pkg 0. Re-assessment below |
| D-B-16 (Hero part) | Text tokens fail 1.4.3 | **Fixed on white only; regressed on dark** | White: eyebrow 5.36:1, description 6.9:1. Dark heroes: the eyebrow keeps `--color-text-brand` (now `--brand-400` #216ac3, darker than the former #4673db): 3.53:1 on plain navy (was 4.27:1), **2.1:1** measured over the hero image (bg-dark), **1.29:1** (bg-dark-subtle), 3.39:1 (bg-black). New defect **R-B-4** |
| D-B-20 | Cell classification can misread content | **Deferred, still present (now reproduced)** | Synthetic hero whose content holds only the icon: the icon became the background (`.hero-media img` = icon) and the hero image became the icon. Now cheap to fix: see the D-B-20 fix below this table |

D-B-20 fix (cheap, safe): AEM delivers the hero's own rows in model order (Content tab, content group, then Hero Image; verified on aem.page), so when two cells are "picture only" the later one is the hero image. In `readCells` (`hero.js:80-92`) pick the last media candidate:
```js
function readCells(rows) {
  const cells = { content: null, media: null, ctas: null };
  const candidates = rows.map((row) => row.firstElementChild).filter((cell) => cell && isMediaCell(cell));
  cells.media = candidates[candidates.length - 1] || null;
  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell || cell === cells.media) return;
    if (!cells.ctas && isCtaCell(cell)) cells.ctas = cell;
    else if (!cells.content) cells.content = cell;
    else cells.content.append(...cell.childNodes);
  });
  return cells;
}
```
An icon-only content cell then stays content (its picture becomes `.hero-icon`, `hero.js:143-148`); heroes with one picture-only cell (every image hero in pkg) behave exactly as today. Remaining edge (icon-only content and no hero image) and the link-only content cell read as CTA List stay as they are (pkg 0).

Re-assessment of D-B-14 (Hero): still needs the production check (composite multifield nodes `ctas/item*` under `/content/tcs-corp`). Cheap interim step that is safe: move the `ctas` container to the end of the Content tab and prefix its label "Legacy:" (no content impact: the Hero sorts its rows by content, `hero.js:80-92`, and the row stays where AEM renders it).

#### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Icon (`content_icon`) | reference | Content cell: first picture before the heading, without text -> `.hero-icon` (`hero.js:140-148`) | An icon-only content cell is taken for the hero media (D-B-20). pkg 7 | Retain; fix D-B-20 |
| Icon Image Alt Text (`content_iconAlt`) | text | Collapses into the icon `img alt` (no code) | OK; pkg 0 | Retain |
| Hero Image type (`classes_media`) | Default `""` / Lotto `lottie` | Class gates Lottie (`hero.js:101`) | Redundant with `.json` detection (first audit, not registered); with Default + `.json` the media is dropped (`hero.js:116-117`) | Retain (label per project vocabulary); auto-detect later |
| Hero Image Path (`image`) | reference | `isMediaCell` + `buildMedia` (`hero.js:70-77, 94-120`); first section: `loading=eager`, `fetchPriority=high` (aem.page: first hero `eager`, others `lazy`) | Lottie JSON from `/content/dam` 404 on aem.page (R-B-2) | Retain; R-B-2 |
| Hero Image alt text (`imageAlt`) | text | Image: collapses into `img alt` (aem.page OK). Lottie: code reads `link.title` (`hero.js:102`) | **On aem.page the alt is delivered as the link text, not a title** (`<a href="...json">Pulsing circle, ...</a>`): the animation is rendered `aria-hidden`, its name lost (R-B-3) | Retain; fix R-B-3 |
| Hero View (`classes`) | Default / Contained image `media-contained` | `hero.css:181-198` | Style option in Content tab (first audit) | Retain |
| Eyebrow (`content_eyebrow`) | text | Element before the heading -> `.hero-eyebrow` (`hero.js:152-154`) | Dark contrast R-B-4 | Retain |
| Title (`content_title`) | text | Heading -> `.hero-title` | OK | Retain |
| Title heading level (`content_titleType`) | H1 / H2, default h1 | Collapses into the heading tag | OK (pkg h1 175, h2 7) | Retain |
| Description (`content_description`) | richtext | `.hero-description` | bg-dark-subtle 50% white over image: 2.86:1 median (R-B-4) | Retain |
| CTA List (`ctas`) + `ctaText`, `cta`, `ctaTarget`, `ctaType`, `ctaArrow` | legacy container | `readLinkItems` (`hero.js:168`), `ctaType` as bold / italic (`readButtonOptions`, `hero.js:173`) | pkg 0; D-B-14 deferred; a legacy `new-window` would also not be announced (R-B-1) | Deprecate (production check) |
| Vertical Alignment (`classes_alignment`) | top / middle / bottom, default align-middle | `hero.css:48-54` | OK | Retain |
| Horizontal Alignment (`classes_horizontal`) | left / center / right, default align-center | `hero.css:60-70, 292-294` | OK | Retain |
| Text Alignment (`classes_textAlignment`) | left / center / right, default text-center | `hero.css:73-86` | OK | Retain |
| BG Color (`classes_background`) | Default, bg-light, bg-dark, bg-dark-subtle, bg-black | `hero.css:88-117, 251-262` | Eyebrow colour not adapted on dark (R-B-4) | Retain; fix R-B-4 |
| Additional: Anchor / Hide / Padding / Margin | shared | `block-options-decorator.js`, `styles.css` | OK (pkg anchor 42) | Retain |
| Animation Type / Motion Speed / Animation Trigger / Background animation | shared | `motion-decorator.js:31` (targets `.hero-content`), `:53` (layers `.hero-media`, overlay); Speed / Trigger shown when either animation is set | OK; legacy Motion Type mapped (above) | Retain |

#### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Image (cover) | Default banner | OK (aem.page) | Retain |
| Contained image | Illustration whole | OK (`media-contained`, aem.page) | Retain |
| Lotto | Animated background | Local: plays, labelled, toggle. **aem.page: JSON 404, empty media box, working-looking toggle that controls nothing, no label** (R-B-2, R-B-3) | Fix |
| No image | Text only | OK | Retain |
| BG Default / Light / Dark / Dark subtle / Black | Overlays | Distinct; eyebrow on dark 1.29-3.39:1 (R-B-4) | Fix colours |
| 9 positions x 3 text alignments | Layout | Distinct (aem.page hero-styles) | Retain |
| Legacy Motion Type fade / slide / zoom | Old content | Mapped to Fade in / Fade up / Scale reveal, slow | Retain mapping |
| CTA Default / Primary / Secondary, arrow Auto / Right / Down | Buttons | tertiary / primary / secondary; `hero-cta-down` for Down and for unset in-page links (aem.page "Discover our story") | Retain |

#### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Heading | One H1 per page, H2 for others | Authored level delivered | Author guidance (present) | Pass |
| Pause for moving content (2.2.2) | Reachable pause / play | Present (D-B-1 fixed); Tab-reachable `<button>`, label switches Pause / Play from placeholders | - | Pass |
| Failed animation | No control without content | aem.page: toggle shown although the animation failed to load (R-B-2) | Hide toggle and media on `data_failed` | **Fail (minor)** |
| Reduced motion | No motion | Lottie paused on frame 0 (`animation-decorator.js:22-34`); motion not prepared (local reduce run) | - | Pass |
| Animation name | Alt from field; empty = decorative | Local OK (`role=img` + label); aem.page `aria-hidden`, label lost (R-B-3) | R-B-3 | **Fail** |
| New-tab links | Announced | Not announced (R-B-1) | R-B-1 | **Fail** |
| Keyboard / focus | Links focusable, visible focus | Native links, global `:focus-visible` | - | Pass |
| Contrast | 4.5:1 (16px semibold eyebrow), 3:1 large | White hero: eyebrow 5.36, description 6.9. Default overlay over image: eyebrow 4.09 median (4.01 min). Dark: eyebrow 2.1 / 1.29 / 3.39; description dark-subtle 2.86 (24px, needs 3:1) | R-B-4 | **Fail** |
| Duplicate ids | none | none (4 aem.page pages) | - | Pass |

#### F. Data layer
State per block via `trackBlocks` (`data-layer-decorator.js:73-86`): id = anchor id or generated, `dc:title` = first heading (aem.page: 7 / 4 / 6 / 14 entries, titles correct). CTA clicks central (`cmp:click`); Lottie toggle `data-cmp-interaction="animation"`. No block pushes, no duplicates.

#### G. Personalization
Entire block (experience / fragment swap). No field, no runtime: nothing to remove.

#### H. Decision
**Modify** (R-B-1, R-B-2, R-B-3, R-B-4, R-B-6; D-B-20 (fix below); D-B-14 after the production check). Backward compatible: legacy classes `lottie`, `motion-*` and the CTA List reader keep working.

### Item: CTA (`hero-cta`, class `cta`)
- A. Row of 4 cells (`link` + text collapsed, `linkTarget`, `linkStyle`, `linkArrow`) after the hero's rows, read by `readLinkRows` (`utils/links.js:62-73`). pkg 214 / 136.
- B. D-B-8 confirmed fixed (Auto). D-B-4 not fixed (R-B-1).
- C.

| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| CTA Link (`link`, required) | aem-content | row's `a[href]` | OK; an item without a link yet is an editor placeholder (`buildEditorItems`, `hero.js:188-189`) | Retain |
| CTA Title (`linkText`) | text | collapses into link text | OK | Retain |
| CTA Link Type (`linkTarget`) | Default / new-window | `newWindow` -> `decorateButton` (`hero.js:174-179`) | Not announced (R-B-1); pkg 1 | Retain; fix R-B-1 |
| CTA view (`linkStyle`) | Default `""` / primary / secondary | `hero.js:172-176`, fallback tertiary (= Default, consistent) | Label "CTA view" vs "CTA Link Style" elsewhere (first audit, cosmetic) | Retain |
| CTA Arrow (`linkArrow`) | Auto `""` / right / down | `hero.js:180-183` | OK | Retain |
- H. Retain.

---

### Block: Teaser (`teaser`, class `teaser`)

#### A. Overview
- Purpose: the generic content block: Image & Text (default), Text split (`no-image`), Background image, Card; eyebrow, tags, date, reading time, listen / download / share, title + View All, author, description, image or Lottie, stats, CTAs / links, short description; Style options.
- Files: `blocks/teaser/teaser.js` (318), `teaser.css` (726), `_teaser.json` (1861). Key-value (`readProperties`); items `teaser-link` (3 cells, link in the first) and `teaser-stat` (3 cells: tab, label, value), told apart by a link in the first cell (`teaser.js:237-239`).
- Parents: section, columns-container, gen-carousel, tabs. pkg 147 / 27 pages; `teaser-link` 60 / 10; `teaser-stat` 15 / 4; legacy Links / Stats 0.

#### B. Status of the first audit's defects
| Id | Defect | Status now | Evidence |
|---|---|---|---|
| D-B-2 | Primary / Secondary CTA dropped when a Link item exists | **Confirmed fixed** | `teaser.js:166-192`: CTAs (Multiple links off) then Links list (on) then items. aem.page `anchor-teaser-links-mixed`: 2 List rows + "Talk to an expert" primary; synthetic: Primary CTA + 2 items rendered |
| D-B-3 | Personalization option without runtime | **Confirmed fixed** | No `personalization` field in `_teaser.json`, no marker code; aem.page old content `#anchor-teaser-personalization` (property authored before): renders, no class / `data-personalization`. Library page still has a "Personalization" example heading (R-B-8) |
| D-B-4 | New-tab links not announced | **Confirmed fixed** | `teaser.js:147-148` (`announceNewTab` for List), `:154-156` (`decorateButton({ newTabHint })`), hint from placeholders `:243`. Synthetic: "Primary new tab (opens in a new tab)", "List new tab (opens in a new tab)", "Text link new tab (opens in a new tab)", all `target=_blank` |
| D-B-5 (Teaser part) | Show toggles default on | **Fixed, duplicate kept** | Shared `isOnByDefault` (`utils/properties.js:31`) exists, but the Teaser still defines its own `isShown` (`teaser.js:69`): R-B-7 (cleanup) |
| D-B-10 | Image corners / ratio identical in Text split | **Deferred, still present** | Condition `_teaser.json:462` (corners) and `:408` (ratio) still include `no-image`; CSS `teaser.css:450-457` overrides them. Now cheap and safe, exact fix below |
| D-B-11 | Mobile image position Top = Default | **Deferred, partly addressed** | Description now "Default: above, or in the text order for Text split" (`_teaser.json:386`), but "Top" still renders like Default for Image & Text (only `.no-image.mobile-image-top` is ordered, `teaser.css:593-595`) and the field has no effect for Background / Card. Exact fix below |
| D-B-14 (Teaser part) | Legacy composite multifields | **Confirmed corrected** | `links` labelled "Links (authored before Link items)" with condition `multiLinks` (`_teaser.json:515`), `stats` labelled "Stats (authored before Stat items)" (`:752`); pkg 0 |
| D-B-15 (Teaser part) | Background animation where it can't animate | **Deferred, still present** | `classes_bganimation` (`_teaser.json:1177`) has no condition; `motion-decorator.js:54` layers only `.background, .card`. Exact fix below |
| D-B-16 (Teaser part) | Contrast tokens | **Confirmed fixed** | aem.page: eyebrow 5.36:1 (white), 4.92:1 (grey); description 6.9:1; dark / dark green / Background / Card use `--brand-300` eyebrow (`teaser.css:40`): 11.34 / 7.23:1, over images 11.67 / 5.33:1 median; 70% white text over Card image 5.71:1 median (5.2 min) |
| D-B-19 | Dead `teaser-links-*` classes | **Confirmed fixed** | No `teaser-links-` in `teaser.js` |
| D-B-21 | Stat with a link read as a Link item | **Confirmed fixed** | `teaser.js:237` link required in the first cell; synthetic Stat "Label with a link" rendered as `dt` / `dd` |

Exact fixes for the deferred ones (dialog only, no content change, `npm run build:json` after):
- D-B-10: `imageCorners` condition -> Image & Text only: `{"or":[{"!":{"var":"classes"}},{"===":[{"var":"classes"},""]}]}`; `imageRatio` option label `Default (10:9; original in Text split)`.
- D-B-11: `imagePositionMobile` condition `{"or":[{"!":{"var":"classes"}},{"===":[{"var":"classes"},""]},{"===":[{"var":"classes"},"no-image"]}]}` and either drop the "Top" option for Image & Text (keep the value valid in `OPTIONS`, `teaser.js:55`) or add `.teaser.teaser-has-media.mobile-image-top .teaser-media { order: -1; }` so it means "above even when the text comes first"; with the current DOM (media first) the option is simply redundant, so dropping it is the smaller change.
- D-B-15: `classes_bganimation` condition `{"or":[{"===":[{"var":"classes"},"background"]},{"===":[{"var":"classes"},"card"]},{"and":[{"var":"bgColor"},{"!==":[{"var":"bgColor"},""]}]}]}`. Values already stored stay valid (they just keep doing nothing).

#### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Eyebrow (`eyebrow`) | text | `teaser.js:256-258` | OK (pkg 116) | Retain |
| Show Eyebrow (`showEyebrow`) | bool, default true | `isShown` `teaser.js:256` | Redundant with empty Eyebrow; local `isShown` duplicate (R-B-7) | Retain |
| Title (`title`) | text | `buildHeading` `teaser.js:66, 267` | OK | Retain |
| Title Type (`titleType`) | H1-H6, default h2 | Collapses into the heading tag | OK (pkg h1 4, h2 140, h3 3) | Retain |
| Hide Title (`titleHidden`) | bool | `hideVisually` `teaser.js:270` | OK | Retain |
| Description (`description`) | richtext | `teaser.js:291-293` | OK | Retain |
| Show Description (`showDescription`) | bool, default true | `isShown` `teaser.js:291` | OK | Retain |
| Short Description (`shortDescription`) | richtext | `teaser.js:300-302` | OK (pkg 1) | Retain |
| View All Text (`viewAllText`) | text | Collapses into the View All link text | OK | Retain |
| View All Link (`viewAll`) | aem-content | Primary button `teaser.js:273-279` | OK (pkg 1) | Retain |
| Show Date (`showDate`) | bool, default false | `teaser.js:86` | OK | Retain |
| Date (`date`) | date-time, cond Show Date | `buildPublished` `teaser.js:86-92` | OK | Retain |
| Date Format (`dateFormat`) | 4 formats, default dd-mm-yyyy | `teaser.js:90`, `utils/dates.js` | OK | Retain |
| Date label (`dateLabel`) | text, cond Show Date | `teaser.js:88` | Authored content, acceptable | Retain |
| Reading time (`readingTime`) | text | `buildReadingTime` (placeholder `minRead`) `teaser.js:95` | OK | Retain |
| Display Tags (`displayTags`) | bool | `teaser.js:75-76` | OK | Retain |
| Tags (`tags`) | aem-tag, cond Display Tags | `resolveTags(readTagValues)` | OK | Retain |
| Listen link (`listenLink`) | aem-content | `buildPageActions` `teaser.js:96-103` | OK | Retain |
| Download (`download`) | bool | print button | OK | Retain |
| Share (`socialShare`) | bool | share / copy + `role=status` | OK | Retain |
| Author name / designation / image / image alt | text / text / reference / text | `buildAuthorLockup` `teaser.js:109-117`; alt collapses into `img alt` | OK (aem.page: `alt="Anita Rao"`) | Retain |
| Image type (`imageFormat`) | Default / Lotto `lottie` | `teaser.js:211` | Redundant with `.json` detection | Retain |
| Image (`image`) | reference | `buildMedia` `teaser.js:206-227` | Lottie JSON 404 on aem.page (R-B-2) | Retain; R-B-2 |
| Image alt text (`imageAlt`) | text | Image: collapses into `img alt` (OK). Lottie: reads `props.imagealt` (never delivered: collapsed) or `link.title` (`teaser.js:214-216`) | **aem.page delivers the alt as the link text**: label lost (R-B-3) | Fix R-B-3 |
| Hide Image (`hideImage`) | bool | `teaser.js:207` | OK | Retain |
| Image position (`imagePosition`) | left / right, default left, cond Image & Text | `teaser.js:246-247, 314` | OK | Retain |
| Image position (mobile) (`imagePositionMobile`) | Default / Top / Bottom | `OPTIONS` `teaser.js:55`; `teaser.css:589-595, 666-668` | D-B-11 | Correct (above) |
| Image ratio (`imageRatio`) | Default / 8:9 / 1:1 / Original | `teaser.css:180-195, 455-457` | D-B-10 | Correct label |
| Image corners (`imageCorners`) | Rounded / Square | `teaser.css:197-199, 450-452` | D-B-10 | Correct condition |
| Multiple links (`multiLinks`) | bool, default false | `teaser.js:166` | Description now accurate | Retain |
| Links (`links`) + `ctaText`, `cta`, `ctaTarget`, `ctaStyle` | legacy, cond Multiple links | `readLinkItems` `teaser.js:182-184` | pkg 0 (D-B-14 corrected) | Deprecate |
| List arrow (`linkArrow`) | Right / Down right | class `arrow-down-right` (`teaser.css:400-403`) | OK | Retain |
| Primary CTA Title / Link / Link Type | text / aem-content / Default, new-window | `teaser.js:168-179` | OK; new tab announced | Retain |
| Primary CTA Link Style (`primaryCtaStyle`) | Text link `""` / list / primary / secondary; default primary | `linkStyleOf(cell, 'primary')` `teaser.js:123-127, 177` | **"Text link" can't be rendered**: an empty value isn't delivered as a row, the code then falls back to primary (R-B-5) | Fix R-B-5 |
| Secondary CTA ... (`secondaryCta*`) | as Primary, default secondary | same, fallback secondary | Same (R-B-5) | Fix R-B-5 |
| Stats (`stats`) + `statLabel`, `statValue` | legacy | `buildStats(props.stats, ...)` `teaser.js:296` | pkg 0 | Deprecate |
| Layout (`classes`) | Image & Text / Text split `no-image` / Background / Card | `teaser.js:244, 308-316` | OK | Retain |
| BG Color (`bgColor`) | Default / grey / dark / dark-green | `bg-{value}` `teaser.js:245, 310`; `teaser.css:24-55` | OK | Retain |
| Text alignment (`textAlignment`) | Layout default / left / center / right | `OPTIONS` `teaser.js:53` | OK | Retain |
| Vertical alignment (`verticalAlignment`) | Layout default / top / middle / bottom | `teaser.js:54` | OK | Retain |
| Title size (`titleSize`) | Layout default / m / l / xl / display | `teaser.js:56` | px in labels (desktop sizes) | Retain |
| Title weight (`titleWeight`) | Layout default / regular / semibold | `teaser.js:57` | OK | Retain |
| Description size (`descriptionSize`) | Layout default / 18 / 24px | `teaser.js:58` | OK | Retain |
| Eyebrow style (`eyebrowStyle`) | Brand / Label | `teaser.js:59`, `teaser.css:230-232` | Label uses `--teaser-meta-color` (slate-700, 6.9:1) | Retain |
| Top spacing (`topSpacing`) | Default / Page header | `teaser.js:60` | OK | Retain |
| Additional (Anchor, Hide, Padding, Margin, Animation Type, Motion Speed, Trigger) | shared | `motion-decorator.js:40` (`:scope > *`) | OK | Retain |
| Background animation (`classes_bganimation`) | shared | `motion-decorator.js:54` | No-op for Image & Text / Text split on Default BG (D-B-15) | Correct condition |

#### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Image & Text left / right | Side by side | OK (aem.page `image-right`) | Retain |
| Image & Text without image | Centered text | OK | Retain |
| Text split (with / without image) | L3 header pattern | OK; image corners / ratio options ineffective (D-B-10) | Retain |
| Background image / Card | Text over image | OK; contrast passes over the sample images | Retain |
| Lotto | Lottie instead of picture | Local OK; aem.page 404 + no label (R-B-2, R-B-3) | Fix |
| CTA styles Text link / List / Primary / Secondary | Links | Items: 4 distinct; Primary / Secondary CTA: Text link unreachable (R-B-5) | Fix |
| Stats | dl | OK | Retain |
| BG Grey / Dark / Dark green | Panels | OK | Retain |

#### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Heading level | Authorable, H2 default | Delivered tag honoured; Hide Title keeps it for SR | - | Pass |
| Pause for Lottie | Reachable button | In the media corner; `Play animation` under reduced motion (local) | Hide when the file fails (R-B-2) | Pass (local) / Fail (aem.page) |
| Animation name | From Image alt | Lost on aem.page (R-B-3) | R-B-3 | **Fail** |
| Reduced motion | Static | Lottie frame 0; motion not prepared | - | Pass |
| New-tab links | Announced | Buttons and List rows (synthetic) | - | Pass |
| Live announcement | Share copy confirmed | `role=status` (article-meta-decorator) | - | Pass |
| Lists / stats | `ul` / `dl` | `ul.teaser-link-list`, `dl > div > dt + dd` | - | Pass |
| Contrast | 4.5:1 | All measured cases pass (see B, D-B-16) | - | Pass |
| Duplicate ids | none | none (4 aem.page pages) | - | Pass |

#### F. Data layer
State per block (aem.page: 9 / 13 / 11 / 10 entries, titles = first heading, also when visually hidden). Clicks central; listen / download / share and the Lottie toggle carry `data-cmp-interaction`. No pushes from the block, no duplicates.

#### G. Personalization
Entire block. The Personalization toggle is gone (D-B-3); no other option implies a runtime.

#### H. Decision
**Modify**: R-B-2, R-B-3, R-B-5, R-B-7, R-B-8; D-B-10, D-B-11, D-B-15 dialog conditions (now cheap). Merge of the Primary / Secondary CTA fields into Link items stays a later content migration (pkg primaryCta 72, secondaryCta 44).

### Item: Link (`teaser-link`, class `link`)
- A. 3 cells (`link` + text, `linkTarget`, `linkStyle`); `itemRows(..., KEY_VALUE_ITEM && hasLink)` `teaser.js:238`. pkg 60 / 10.
- B. D-B-4 fixed (announced), D-B-21 fixed.
- C.

| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| CTA Link (`link`, required) | aem-content | `readLinkRows` | OK | Retain |
| CTA Title (`linkText`) | text | collapses | OK | Retain |
| CTA Link Type (`linkTarget`) | Default / new-window | `teaser.js:147-148, 154-156` | Announced | Retain |
| CTA Link Style (`linkStyle`) | Text link `""` / list / primary / secondary; no default | `teaser.js:187-190`, fallback `''` = Text link | Consistent here (the item row always has the cell, empty included) | Retain; if R-B-5 introduces `tertiary`, add it here too for one vocabulary |
- H. Retain.

### Item: Stat (`teaser-stat`, class `stat`)
- A. 3 cells (tab, label, value); `readStatRows` takes the last two (`stats-decorator.js:33-41`). pkg 15 / 4.
- C. Stats Title (`statLabel`, richtext) -> `dt`; Stats Value (`statValue`, richtext, "A single line, e.g. 40%.") -> `dd`, item skipped without a value. Labels "Stats Title / Stats Value" for one stat (cosmetic, first audit). Retain.
- H. Retain.

---

### Block: Page Header (`page-header`, class `page-header`)

#### A. Overview
- Purpose: page header from page metadata (title, description, tags, content-type, publish-date, reading-time, author-id via the Authors sheet, featured-image + image-alt, listen-link); only Layout and CTAs are authored. Layouts landing / secondary / article / display; default from Page Type.
- Files: `page-header.js` (218), `page-header.css` (278), `_page-header.json`. Key-value (no own rows when only the Layout class is set: aem.page delivers only the CTA item rows); item `page-header-cta` (3 cells, `KEY_VALUE_ITEM`, `page-header.js:167`). Parent: section only. pkg 18 / 18; items 26 / 15.

#### B. Status of the first audit's defects
| Id | Defect | Status now | Evidence |
|---|---|---|---|
| D-B-4 (Page Header part) | CTA new tab not announced | **Confirmed fixed** | `page-header.js:75-77, 181` (`newTabHint` from placeholders); synthetic "PH new tab (opens in a new tab)", `target=_blank`; LinkedIn link `announceNewTab` (`:96-97`) |
| D-B-7 | CTA style defaults disagree | **Confirmed fixed** | Item template `"linkStyle": "primary"` (`_page-header.json:30`), option Text link = `tertiary` (`:878`), `CTA_STYLES` includes `tertiary`, empty fallback `tertiary` (`page-header.js:38, 74`). **Backward compatibility (aem.page, old content):** the CTA authored with an empty style (`<div></div>` third cell) renders "View all case studies" as `button tertiary`, as before; synthetic empty style: tertiary |
| D-B-12 | Featured image always decorative | **Confirmed fixed** | `utils/metadata.js:90` `imageAlt: getMetadata('image-alt')`, `page-header.js:146`; local landing page without `image-alt`: `alt=""`, `loading=eager` (LCP) |
| D-B-14 (Page Header part) | Legacy CTA List in its own "CTAs" tab | **Deferred, still present** | `_page-header.json:83` `ctas` is the only field of the "CTAs" tab, so the tab invites authors to the legacy multifield (pkg 0); legacy `ctaStyle` keeps Text link `""` (`:119`, consistent with the `tertiary` fallback). Cheap interim step (key-value block: tabs don't change content): drop the "CTAs" tab and put `ctas` last in the Style tab, labelled "CTA List (authored before CTA items)" |
| D-B-16 (Page Header part) | Contrast | **Confirmed fixed** | aem.page eyebrow `--color-text-secondary` 6.9:1 (14px 500) |

#### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Layout (`classes`) | Default (from Page Type) / landing / secondary / article / display | `layoutOf` `page-header.js:42-45`; CSS per layout | OK (pkg: 3 / 4 / 6 / 1, default 4) | Retain |
| CTA List (`ctas`) + `ctaText`, `cta`, `ctaTarget`, `ctaStyle` | legacy, own tab | `readLinkItems(props.ctas)` `page-header.js:71, 181` | pkg 0; D-B-14 | Deprecate |
| Animation Type / Motion Speed / Animation Trigger | shared | Not in `CONTENT_TARGETS`: the whole block animates | OK; no Background animation offered (no authored background) | Retain |
| Anchor / Hide / Padding / Margin | shared | block-options-decorator | OK (anchor 14) | Retain |

#### D. Variations
| Variation | Purpose | Result (code-verified) | Action |
|---|---|---|---|
| Landing | Text + featured image (eager) | OK (local) | Retain |
| Secondary | Eyebrow above title / text | OK (aem.page) | Retain |
| Article | Meta row, author | OK (first audit runtime; code unchanged apart from D-B-12) | Retain |
| Display | Tags eyebrow, display title | Code unchanged | Retain |
| Default | Page Type driven | `page-header.js:42-45` | Retain |
| CTA Text link / Primary / Secondary | Buttons | tertiary / primary / secondary, empty -> tertiary | Retain |

#### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Heading | H1 = page title | `h1.page-header-title` (aem.page) | Author guidance if a Hero H1 follows | Pass |
| Featured image alt | `image-alt` metadata, else decorative | D-B-12 fixed | - | Pass |
| Author image | Decorative next to the name | `alt=""` (`page-header.js:108`) | - | Pass |
| New-tab links | Announced | CTAs and LinkedIn announced | - | Pass |
| Share status | Live region | `role=status` | - | Pass |
| Contrast | 4.5:1 | 6.9:1 | - | Pass |

#### F. Data layer
One state entry (aem.page: `anchor-g01b-ph-cta-text:page-header:Cloud transformation services`). Page actions carry `data-cmp-interaction`. No pushes, no duplicates.

#### G. Personalization
Metadata-driven: personalize the page metadata / page variant, not the block. No field.

#### H. Decision
**Retain** (only D-B-14 open).

### Item: CTA (`page-header-cta`, class `cta`)
- A. 3 cells (`link` + text, `linkTarget`, `linkStyle`). pkg 26 / 15 (primary 16, secondary 10; tertiary 0).
- C. CTA Link (`link`, required) -> `readLinkRows`; CTA Title (`linkText`) collapses; CTA Link Type (`linkTarget`, Default / new-window) -> announced; CTA Link Style (`linkStyle`, Text link `tertiary` / primary / secondary, default primary in model and template) -> `page-header.js:74`. All OK.
- H. Retain.

---

### Block: Quote (`quote`, class `quote`)

#### A. Overview
Eyebrow + title above a quote card with decorative quote marks overlapping a portrait (Figma "Text & Image Overlap"). `quote.js` (59), `quote.css` (195), `_quote.json`. Key-value, no items. Parents: section, columns-container, tabs. pkg 12 / 5.

#### B. Status of the first audit's defects
| Id | Defect | Status now | Evidence |
|---|---|---|---|
| D-B-6 | figcaption outside a figure | **Confirmed fixed** | `quote.js:35-39` `figure.quote-card-text > blockquote + figcaption`; `quote.css:108` `margin: 0`; aem.page (old content): all 7 figcaptions in `FIGURE.quote-card-text` |
| D-B-9 (Quote part) | Style select without effect | **Confirmed fixed** | No `classes` field in `_quote.json`; old content had none set (no class), renders unchanged |
| D-B-16 (Quote part) | Contrast | **Confirmed fixed** | aem.page eyebrow 6.9:1 (white), 6.33:1 (grey) |

#### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Eyebrow (`eyebrow`) | text | `quote.js:29` | OK | Retain |
| Title (`title`) | text | `buildHeading` `quote.js:30` | OK | Retain |
| Title Type (`titleType`) | H1-H6, default h2 | collapses into the heading | OK | Retain |
| Quote (`quote`) | richtext | `blockquote.quote-text` `quote.js:38` | OK | Retain |
| Quote Author (`author`) | richtext ("Name on the first line, then designation and organisation.") | `figcaption.quote-author` `quote.js:39` | OK | Retain |
| Image (`image`) | reference | `pictureOf` `quote.js:45` | OK | Retain |
| Image Alt Text (`imageAlt`) | text | collapses into `img alt` (aem.page "Portrait of Anita Rao") | OK | Retain |
| Image Position (Desktop) (`imagePosition`) | right / left, default right | `image-left` `quote.js:23, 56` | OK | Retain |
| Image Position (Mobile) (`imagePositionMobile`) | top / bottom, default top | `image-bottom` `quote.js:24-25, 57` | OK | Retain |
| BG Color (`bgColor`) | Default / Grey | `bg-grey` `quote.js:53-54`; `quote.css:10-14` | OK | Retain |
| Additional incl. Background animation | shared | `motion-decorator.js:41, 56` (colour only); Default BG is white (`quote.css:3`) | Background animation of a white block on a white page is invisible (first audit: description note) | Retain |

#### D. Variations
Image right / left, image top / bottom, text only, Grey: all render on aem.page (old content) as distinct layouts. Retain.

#### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Quote semantics | figure / blockquote / figcaption | Fixed (D-B-6) | - | Pass |
| Decorative quote marks | Not announced | `content: '...' / ''` | - | Pass |
| Heading | Authorable | H2 | - | Pass |
| Image alt | From field | delivered | - | Pass |
| Contrast | 4.5:1 | 6.33-6.9:1 | - | Pass |

#### F. Data layer
State only (aem.page 7 entries, `dc:title` = block title). OK.

#### G. Personalization
Not personalizable (entire block at most). No field.

#### H. Decision
**Retain.**

---

### Block: Testimonial (`testimonial`, class `testimonial`)

#### A. Overview
Section title, centered eyebrow, quote, author (name, avatar, designation & location), stats. `testimonial.js` (77), `testimonial.css` (150), `_testimonial.json`. Key-value; item `testimonial-stat` (3 cells). Parents: section, columns-container, tabs. pkg 17 / 7; items 32 / 3; legacy Stats 0.

#### B. Status of the first audit's defects
| Id | Defect | Status now | Evidence |
|---|---|---|---|
| D-B-5 | Quote hidden when the Show Description row is missing | **Confirmed fixed** | `testimonial.js:61` `isOnByDefault(props.showdescription)`; synthetic testimonial without the row: quote shown |
| D-B-9 (Testimonial part) | Style select without effect | **Confirmed fixed** | No `classes` field |
| D-B-14 (Testimonial part) | Legacy Stats in the dialog | **Deferred, still present** | `_testimonial.json:131` `stats`, described "Stats authored before Stat items..."; pkg 0 |
| D-B-15 (Testimonial part) | Background animation where it can't animate | **Deferred, still present** | `classes_bganimation` (`_testimonial.json:394`) without condition; Default BG has no background colour (`testimonial.css:2-6`). Exact fix: condition `{"===":[{"var":"bgColor"},"grey"]}`; stored values stay valid |
| D-B-16 (Testimonial part) | Contrast | **Confirmed fixed** | aem.page stat labels 6.9:1 / 6.33:1 (grey); quote `--color-text-brand` 40px 5.36:1 / 4.92:1 |
| D-B-18 | Wrong field descriptions | **Confirmed fixed** | Author "The person's name, e.g. Ranil Boteju."; Designation & Location "e.g. Chief Data & Analytics Officer, Lloyds Banking Group, London." |

#### C. Dialog validation
| Field (name) | Values / default | Functional mapping (file:line) | Issue | Decision |
|---|---|---|---|---|
| Eyebrow (`eyebrow`) | text | `testimonial.js:58-60` | OK | Retain |
| Title (`title`) | text | `buildHeading` `:52` | OK | Retain |
| Title Type (`titleType`) | H1-H6, default h2 | collapses | OK | Retain |
| Description (`description`) | richtext ("The testimonial quote.") | `blockquote` `:61-63` | Label "Description" for the quote (first audit, cosmetic) | Retain |
| Author (`authorName`) | text | `p.testimonial-author-name` `:33-35` | OK | Retain |
| Author Image (`authorImage`) | reference | `pictureOf` `:24` | OK | Retain |
| Author Image Alt Text (`authorImageAlt`) | text | collapses into `img alt` | OK (pkg 0: decorative, name adjacent) | Retain |
| Designation & Location (`designationLocation`) | richtext | `div.testimonial-author-details` `:36-38` | OK | Retain |
| Stats (`stats`) + `statLabel`, `statValue` | legacy | `buildStats(props.stats, ...)` `:72` | pkg 0 (D-B-14) | Deprecate |
| BG Color (`bgColor`) | Default / Grey | `:50, 74-75`; `testimonial.css:8-11` | OK | Retain |
| Hide Eyebrow (`hideEyebrow`) | bool | `:58` | Polarity differs from Teaser "Show Eyebrow" (cosmetic) | Retain |
| Hide Title (`titleHidden`) | bool | `:54` (visually hidden) | OK | Retain |
| Show Description (`showDescription`) | bool, default true | `:61` | OK (D-B-5) | Retain |
| Hide Author Details (`hideAuthor`) | bool | `:65` | Description lacks a final full stop (trivial) | Retain |
| Additional incl. Background animation | shared | `motion-decorator.js:42, 57` | D-B-15 | Correct condition |

#### D. Variations
Default / Grey, author with photo / text only, stats, hide eyebrow / title / description / author: all render on aem.page (old content; 11 blocks, figcaption in `FIGURE.testimonial-quote`). Retain.

#### E. Accessibility
| Requirement | Expected | Current (evidence) | Correction | Status |
|---|---|---|---|---|
| Quote semantics | figure / blockquote / figcaption | aem.page parent FIGURE | - | Pass |
| Avatar alt | Decorative next to the name | `alt=""` | - | Pass |
| Stats | dl | `dl > div > dt + dd` | - | Pass |
| Hidden title | Kept for SR | `visually-hidden` | - | Pass |
| Contrast | 4.5:1 | 4.92-6.9:1 | - | Pass |

#### F. Data layer
State only (aem.page 11 entries). OK.

#### G. Personalization
Not personalizable. No field.

#### H. Decision
**Retain**; D-B-15 condition (cheap), D-B-14 after the production check.

### Item: Stat (`testimonial-stat`, class `stat`)
Same model and reader as `teaser-stat` (tab, label, value; last two cells). pkg 32 / 3. Retain.

---

### Block: Interactive Dashboard (`interactive-dashboard`, class `interactive-dashboard`)

#### A. Overview
Placeholder: `interactive-dashboard.js:10-13` empties the block and sets `data-placeholder`; CSS hides it on the site and shows a dashed box in the editor. Model: Additional tab only. pkg 1 / 1.

#### B. Status of the first audit's defects
| Id | Defect | Status now | Evidence |
|---|---|---|---|
| D-B-17 | Placeholder offered to authors | **Confirmed fixed** | 0 matches of `interactive-dashboard` in `component-filters.json` and in every `_*.json` filter; definition and model kept (2 / 1 matches in the aggregates), so the existing instance stays editable. Local and synthetic: block empty, `display: none` |

#### C. Dialog validation
| Field (name) | Values / default | Functional mapping | Issue | Decision |
|---|---|---|---|---|
| Anchor / Hide / Padding / Margin / Animation Type / Speed / Trigger | shared | nothing visible | No effect (block not offered any more) | Keep until implemented |

#### D. Variations
None.

#### E. Accessibility
Renders nothing. Editor label hard-coded English (`interactive-dashboard.js:12`, CSS `::before`), editor only. Pass.

#### F. Data layer
Still tracked as an untitled component (`anchor-interactive-dashboard:interactive-dashboard:`; local and synthetic). Noise only; no business need for it, but excluding empty blocks in `trackBlocks` could hide blocks that render later (skeletons), so leave as is.

#### G. Personalization
None.

#### H. Decision
**Retain hidden from the palette** (D-B-17) until implemented; then Replace.

---

## Backward compatibility check (aem.page: content package 1.0.6 + current code)

| Change (first audit / PR #119) | Old content on aem.page | Result | Evidence |
|---|---|---|---|
| Hero Motion Type removed, mapped by `addLegacyMotion` | `hero-motion`: `motion-fade`, `motion-slide`, `motion-zoom` heroes | **Renders and animates**: `motion-fade-in motion-slow`, `motion-fade-up motion-slow`, `bg-motion-scale motion-slow` (+ prepared background classes), cleaned up after playing; unauthored hero unchanged | `pub-hero.json` (`early` classes) |
| Teaser Personalization removed | `article-meta` `#anchor-teaser-personalization` | **Renders** like the other teasers, no marker class / attribute | `pub-teaser.json` |
| Page Header CTA with an empty style; Text link now `tertiary` | `cta-text-link` 3rd CTA `<div></div>` | **Renders as text link** (`button tertiary`), Primary / Secondary unchanged | `pub-rest.json` |
| Contrast tokens (`--color-text-secondary` slate-700, `--color-text-brand` / `--color-bg-brand` brand-400) | Light blocks | **Pass**: 4.92-6.9:1 everywhere on white / grey | runtime `contrast` fields |
| same, on dark / brand backgrounds | Hero bg-dark / bg-dark-subtle / bg-black (133 of 182 heroes are bg-dark) | **Regressed**: hero eyebrow keeps the brand text colour, now darker: 3.53:1 on plain navy (4.27:1 before), 2.1 / 1.29 / 3.39:1 over the images (R-B-4). Teaser dark / Background / Card use `--brand-300`: pass. Primary buttons (`--color-bg-brand`) white text 5.4:1 | `sample.mjs` output |
| Quote figure, Quote / Testimonial Style field removed | `quote-variations`, `testimonial-variations` | **Renders**; figcaption inside figure | `pub-rest.json` |
| Hero CTA Arrow Auto | `hero-ctas` (unset in-page link) | Down arrow as before | `pub-hero.json` |
| Hero Lotto (unchanged code, older content) | `hero-overview` `#anchor-hero-lotto`, `layouts` `#anchor-teaser-lottie` | **Broken on aem.page**: JSON 404, alt lost (R-B-2, R-B-3); not a regression of a fix (local renderer differs from AEM) | console 404, `anim.svg=false`, `aria-hidden=true` |
| PR #119 (Tabs Container parent, built-in Columns / Button) | Group B blocks inside Tabs: no library example | Not tested (no content) | - |

---

## New defects

Verified = reproduced at runtime (aem.page, local or synthetic AEM-shaped content) or proven end to end in code. Suspected = plausible from code, not reproduced.

**R-B-1 (major, verified; the D-B-4 fix is ineffective for the Hero) Hero CTAs opening a new tab are still not announced.**
- `blocks/hero/hero.js:205` decides whether to load the placeholder with `[...block.querySelectorAll('div')].some((cell) => !cell.children.length && cell.textContent.trim() === 'new-window')`. `scripts/aem.js:424-429` (`wrapTextNodes`, run by `decorateBlock` before `decorate`) has already wrapped every text-only cell in a `<p>`, so the cell has a child and the test is never true: `newTabHint` stays `''` and `announceNewTab` (`link-decorator.js:28-33`) does nothing. Evidence: aem.page `hero/hero-ctas#anchor-hero-cta-new-window` and the local / synthetic page: `target=_blank`, link text "Read the full report", no `.visually-hidden` hint (Teaser and Page Header on the same synthetic page: "(opens in a new tab)"). pkg: 1 hero CTA with new-window; WCAG G201 / AGENTS.md accessibility rule.
- Fix (use the parsed CTAs instead of the raw cells; also covers legacy CTA List items; no content change), `hero.js:198-212`:
  ```js
  const links = [...readLinkItems(cells.ctas), ...readLinkRows(ctaRows)];
  // placeholders only when a CTA opens a new tab (the hero is often the LCP)
  const newTabHint = links.some(({ newWindow }) => newWindow)
    ? (await getPlaceholders())('opensInNewTab', '(opens in a new tab)') : '';
  ...
  const ctas = buildCtas(cells.ctas, ctaRows, hint, newTabHint);
  ```
  and pass `newTabHint` as a parameter of `buildCtas` (as Page Header does, `page-header.js:67`), deleting the module-level `let newTabHint` (`hero.js:13`); `readLinkItems` / `readLinkRows` only read the DOM, so reading them twice is safe. Add a unit test that runs the detection on `wrapTextNodes`-shaped markup (`<div><p>new-window</p></div>`).

**R-B-2 (major for the Lotto option, verified on aem.page) Lottie animations from the DAM don't load on aem.page and leave an empty box with a pause button that controls nothing.**
- aem.page `hero/hero-overview#anchor-hero-lotto` and `teaser/layouts#anchor-teaser-lottie`: the link is `/content/dam/tcs-corp/block-library/animations/lottie-sample.json`; `curl` of that URL on `main--tcs-corp--sradha-tcs.aem.page` returns **404** (console: "Failed to load resource: 404"); no SVG is rendered, the `.animation-toggle` is shown and clickable. `/content/dam/tcs-corp/` is in `paths.json` includes, so the file is served only once the asset itself has been previewed / published (a JSON file is not copied to the media bus with the page, unlike images). Locally the renderer maps the path to `/drafts/dam/...`, which hides the problem. pkg: Lotto 1 hero + 1 teaser (library), so low reach today, but the option is broken in delivery.
- Fix: (operations) preview and publish the Lottie JSON assets from AEM Assets (Quick Publish / Manage Publication to Edge Delivery) and check `curl -I https://main--tcs-corp--sradha-tcs.aem.page/content/dam/tcs-corp/block-library/animations/lottie-sample.json` returns 200; add this to the authoring guide for the Lotto image type. (code, `decorators/animation-decorator.js`) don't show a control for an animation that failed: in `playAnimation` after `loadAnimation` add
  ```js
  animation.addEventListener('data_failed', () => {
    container.dispatchEvent(new CustomEvent('animation:failed', { bubbles: true }));
  });
  ```
  (`data_failed` exists in the vendored `scripts/lib/lottie/lottie_light.min.js`), and in `createAnimation`
  ```js
  animation.addEventListener('animation:failed', () => {
    animation.hidden = true;
    animation.animationToggle?.remove();
  });
  ```
  The Hero then shows its background colour / overlay as for a missing image. No content change.

**R-B-3 (major, WCAG 1.1.1, verified on aem.page) The alt text of a Lottie animation is lost on delivery: the animation is rendered decorative.**
- AEM delivers a non-image `reference` with its `*Alt` field as the **link text**, not as a `title`: aem.page `<a href="/content/dam/.../lottie-sample.json">Pulsing circle, symbolising a connected enterprise</a>` (no `title`). The Hero reads only `link.title` (`hero.js:102`), the Teaser `props.imagealt` (never delivered: collapsed) or `link.title` (`teaser.js:214-216`). Result on aem.page: `.hero-animation` / `.teaser-animation` `aria-hidden="true"`, no `role` / label (runtime); synthetic AEM-shaped links reproduce it locally. The local renderer writes the alt as `title` and the path as text (`.home-work/render-lib.mjs:66`), so the local preview passes while delivery fails.
- Fix: one shared helper in `utils/media.js`, used by both blocks:
  ```js
  /** the text alternative of an animation link: AEM delivers the alt text as the link text
   * (without one the text is the file path); a title from older markup is kept */
  export function animationLabel(link) {
    const text = link.textContent.trim();
    const title = (link.title || '').trim();
    if (title && title !== text) return title;
    return text && !isAnimation(text) && !/^(\/|https?:)/i.test(text) ? text : '';
  }
  ```
  `hero.js:102` `const label = animationLabel(link);`, `teaser.js:214-216` `label: textOf(props.imagealt) || animationLabel(link)`; and render the link as AEM does in `render-lib.mjs:66` (`<a href="...">${alt || path}</a>`). Backward compatible: markup with a `title` keeps working, empty alt stays decorative.

**R-B-4 (major, WCAG 1.4.3, verified; regression of the D-B-16 token change on dark heroes) Hero eyebrow (and dark-subtle description) fail contrast on the dark and image backgrounds.**
- `hero.css:20` `--hero-eyebrow-color: var(--color-text-brand)` is not overridden for `bg-dark` / `bg-dark-subtle` / `bg-black` (`hero.css:93-99`; the Teaser does it, `teaser.css:40`). The token is now `--brand-400` #216ac3 (`styles.css:106`), darker than the former #4673db, so on dark it got worse: 3.53:1 on plain navy (4.27:1 before). Measured behind the 16px semibold eyebrow over the sample images (`sample.mjs`, median): bg-dark **2.1:1**, bg-dark-subtle **1.29:1**, bg-black 3.39:1; Default (80% white overlay) 4.09:1; bg-dark-subtle description (50% white, 24px, needs 3:1) 2.86:1. pkg: 133 of 182 heroes are bg-dark, 174 have an eyebrow (aem.page `hero-styles`, `hero-motion`: all dark heroes have one). axe can't see it (text over background images is "incomplete").
- Fix (measured with the change applied in the page): in `hero.css`
  ```css
  .hero.bg-dark,
  .hero.bg-dark-subtle,
  .hero.bg-black {
    --hero-eyebrow-color: var(--brand-300); /* as the Teaser on dark: 6.5:1 bg-dark, 10.6:1 bg-black */
  }

  .hero.bg-dark-subtle {
    --hero-eyebrow-color: var(--color-text-on-neutral); /* brand-300 only reaches 4.0:1 over a 60% overlay */
    --hero-description-color: rgb(255 255 255 / 85%); /* 5.0:1 */
  }
  ```
  For the Default (white overlay) hero the eyebrow needs either `--hero-eyebrow-color: var(--color-text-brand-secondary)` (brand-600, 14:1) or a stronger overlay (88% white still gives only 4.4-4.6:1): design sign-off, as for D-B-16. No content change; only colours.

**R-B-5 (minor, verified by code; delivery of an explicitly empty value suspected) Teaser Primary / Secondary CTA "Text link" can't be rendered: it shows as a button.**
- `primaryCtaStyle` / `secondaryCtaStyle` offer Text link = `""` with defaults `primary` / `secondary` in the model and the template (`_teaser.json:649, 723`; definition template). Key-value blocks don't deliver properties without a value (aem.page: the Default `primaryCtaTarget` of 147 teasers is never a row), and `linkStyleOf(cell, fallback)` returns the fallback when the row is missing (`teaser.js:123-127, 177`), so an author choosing Text link gets a Primary (or Secondary) button. pkg: Text link 0 uses (nobody could get it). Same class of defect as D-B-7 (Page Header, fixed with `tertiary`).
- Fix: option Text link = `tertiary` for `primaryCtaStyle`, `secondaryCtaStyle` (and, for one vocabulary, the legacy `ctaStyle` and `teaser-link` `linkStyle`); `teaser.js:50` `const LINK_STYLES = ['list', 'primary', 'secondary', 'tertiary'];` (`renderLinks` already maps any non-list style to `decorateButton({ type: style || 'tertiary' })`). Stored values are unchanged; `""` keeps meaning Text link on items. `npm run build:json`.

**R-B-6 (minor, verified by code; UE behaviour suspected) A Hero authored with the former Motion Type can't have it changed or removed in the dialog.**
- The field `classes_motion` is gone from `_hero.json`, but its stored value (`motion-fade` / `motion-slide` / `motion-zoom`) is still delivered as a class and mapped on every page view (`hero.js:48-54, 220`). An author can override it with another Animation Type, but choosing Animation Type "None" (`""`) doesn't stop it, and nothing in the dialog shows that the hero animates. aem.page (package 1.0.6): 3 heroes; production content unknown. The block library was migrated (`.home-work/bl/bl-migrate.mjs:51-53`), production content wasn't.
- Fix: run the same migration on production content (set `classes_animation` / `classes_bganimation` and `classes_animationspeed=motion-slow` from `classes_motion`, then delete `classes_motion`), keeping the code mapping for unmigrated pages. Alternative without migration: re-add `classes_motion` as "Motion Type (before Animation Type)" with options None / Fade in / Slide up / Zoom and the condition `{"and":[{"var":"classes_motion"},{"!==":[{"var":"classes_motion"},""]}]}` so it only shows where it is set (self-referencing condition: verify in UE first).

**R-B-7 (trivial, verified) The Teaser keeps its own copy of the shared "on by default" toggle.**
- `teaser.js:68-69` `const isShown = (cell) => !cell || isOn(cell);` duplicates `isOnByDefault` (`utils/properties.js:31`, added for D-B-5 and used by the Testimonial); AGENTS.md: blocks don't re-implement shared behaviour.
- Fix: import `isOnByDefault`, use it at `teaser.js:256` and `:291`, delete lines 68-69. Behaviour identical.

**R-B-8 (trivial, verified) The block library still shows a "Personalization" Teaser example.**
- `drafts/en/block-library/teaser/article-meta.plain.html:206-207` and the package page `block-library/teaser/article-meta` (section "Personalization", `anchor-teaser-personalization`): the property was removed by `bl-migrate.mjs:38`, but the example and its heading remain, presenting an option that no longer exists.
- Fix: drop the example from the Teaser article-meta library spec (or retitle it), rebuild the library and the package.

### Observations (not defects)
- Hero and Teaser keep the new-tab hint in a module-level variable (`hero.js:13`, `teaser.js:29`); all teasers set the same value, so concurrent decorations can't mix it up today; the R-B-1 fix removes it from the Hero, the Teaser could pass it to `renderLinks` the same way.
- Interactive Dashboard is still an untitled data layer component (noise; see its section F).
- Group B blocks inside a Tabs Container (parent added by PR #119): no library example, not tested.
- Analytics / Target / consent runtime: BLOCKED (not loaded); only data layer code paths and entries were checked.

---

## Summary

- Components reviewed: 11 (Hero, `hero-cta`, Teaser, `teaser-link`, `teaser-stat`, Page Header, `page-header-cta`, Quote, Testimonial, `testimonial-stat`, Interactive Dashboard).
- First-audit register (D-B-1 ... D-B-21) re-verified:
  - **Confirmed fixed: 14** (D-B-1, 2, 3, 5, 6, 7, 8, 9, 12, 13, 17, 18, 19, 21).
  - **Not fixed: 1** (D-B-4: fixed for Teaser and Page Header, but the Hero fix never triggers, R-B-1).
  - **Regressed: 1** (D-B-16: passes on light backgrounds and for Teaser / Quote / Testimonial / Page Header, but the Hero eyebrow on dark backgrounds is worse than before, R-B-4).
  - **Deferred, re-assessed: 5** (D-B-10, D-B-11, D-B-15: now cheap dialog conditions, exact JSON given; D-B-14: production check still needed, interim dialog step given; D-B-20: now reproduced, exact `readCells` fix given). Minor leftovers: D-B-5 duplicate helper in the Teaser (R-B-7), D-B-8 legacy `ctaArrow` default (with D-B-14).
- New defects:
  - R-B-1 major: Hero new-tab CTAs not announced (`wrapTextNodes` defeats the detection).
  - R-B-2 major: Lottie JSON from the DAM 404 on aem.page; empty box with an inert pause button.
  - R-B-3 major: Lottie alt text lost on delivery (delivered as link text), animation rendered decorative; local renderer differs.
  - R-B-4 major: Hero eyebrow contrast on dark / image backgrounds 1.29-3.39:1 (worse after the token change), dark-subtle description 2.86:1.
  - R-B-5 minor: Teaser Primary / Secondary CTA "Text link" renders as a button.
  - R-B-6 minor: legacy Hero Motion Type can't be changed or removed in the dialog.
  - R-B-7 trivial: Teaser duplicates `isOnByDefault`.
  - R-B-8 trivial: library still shows a "Personalization" Teaser example.
- Backward compatibility on aem.page: legacy Motion Type, removed Personalization, empty Page Header CTA style, Quote / Testimonial changes all render correctly; the contrast tokens pass on light backgrounds but regress the dark heroes (R-B-4).
- Report: `/tmp/audit2/review-B.md`; evidence and scripts: `/tmp/audit2/b/`.
