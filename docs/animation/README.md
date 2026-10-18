# Block Animation and Skeleton Loading — Implementation Report

Three independent capabilities, added to the existing blocks without rebuilding them (18 October
2026):

1. **Content animation**: a block's foreground moves in when it comes into view (Additional tab,
   *Content animation*).
2. **Background animation**: a block's authored background (colour, image, overlay, the Canvas
   brand glows) is revealed when it comes into view (Additional tab, *Background animation*).
3. **Skeleton loading**: blocks built from the query index show placeholders shaped like
   themselves while their data loads, instead of holding back their section.

Code: `utils/motion.js`, `decorators/motion-decorator.js`, `styles/motion.css`,
`decorators/skeleton-decorator.js`, skeleton styles in `styles/styles.css`. Tests:
`test/motion/motion.test.mjs`.

## Motion Speed and Animation Trigger (update)

Two more Additional tab fields, after **Animation Type** (the label of the Content animation field,
`classes_animation`; stored values unchanged), on the same 19 blocks:

| Field | Property | Options (value) | Default | Applies to |
|:--|:--|:--|:--|:--|
| Motion Speed | `classes_animationspeed` | Medium (empty), Fast `motion-fast`, Slow `motion-slow` | Medium | Animation Type and Background animation |
| Animation Trigger | `classes_animationtrigger` | On Scroll / Viewport Entry (empty), On Page Load `motion-on-load` | On Scroll | Animation Type and Background animation |

The two fields are shown only once the block has an Animation Type (or, on blocks with a
background, a Background animation); without an animation they have no effect.

- **Speed** (`styles/motion.css`): the block's `--motion-duration` is 300 / 600 / 900ms; the
  background takes 1.5 times as long (450 / 900 / 1350ms) and repeated items start a fifth of the
  duration apart (60 / 120 / 180ms). One keyframe per effect; the speed is only CSS variables, set
  on every `.block` so nested blocks keep their own speed. No timers set the duration (one 4 s
  safety timer only cleans up classes if an `animationend` never comes).
- **On Scroll** (default): the page's one IntersectionObserver (thresholds 0 to 0.25) starts a
  block once a fifth of it, or a quarter of the viewport height for taller blocks, is in view
  (`isSeen`). A block already in view when the page opens starts at once, without scrolling.
- **On Page Load**: the block starts as soon as it is prepared, after its section's blocks are
  decorated and before the section is shown, wherever it is on the page (a block far below has
  finished before it is reached).
- **Skeleton**: a block that shows a skeleton starts its Animation Type when its real content is
  there (`releaseMotion`): at once with On Page Load, when in view with On Scroll; its Background
  animation follows the trigger meanwhile. Each animation runs once.
- **More visible motion**: Fade distance 2.5rem (`--space-1000`, was 1.5rem), Slide distance 5rem
  (`--space-2000`, was 4rem), Scale in and Scale reveal from 90% (was 94%), an even ease
  `cubic-bezier(0.4, 0, 0.2, 1)` (was a fast-out ease that finished most of the move in the first
  frames), stagger 120ms (was 80ms), and On Scroll starts when the block is visibly in view rather
  than at its first pixel.
- **Universal Editor**: blocks are prepared in edit mode too, but nothing plays or is used up there
  (the CSS shows them as is); when the editor switches to Preview (the `adobe-ue-edit` class of
  `<html>` goes), the blocks that haven't played yet play: On Page Load at once, On Scroll when in
  view (also those in view then). Before this fix, a page opened in edit mode had no animations
  in Preview, and On Scroll blocks scrolled past in edit mode were used up.
- **Reduced motion** wins over Motion Speed and Animation Trigger: nothing is prepared, the CSS isn't
  loaded and all content shows at once (no movement, scale, stagger or background effect).

Tested (local preview, 1440 × 900, 1440 × 2200, 390 × 844; index slowed to 1.5 s): Hero Fade up +
Slow + On Page Load + Reveal started at 0.38 s at 0.9 s (background 1.35 s); a Quote Fade in + Fast
+ On Page Load far below the fold ran at 0.53 s at 0.3 s; a List (On Page Load) behind its skeleton
started at 1.73 s, after the skeleton was removed; Cards Slow, Teaser Fast + Wipe, Canvas Medium,
Filter List Slow started only when scrolled to, with their durations; Cards On Scroll in view at
load started at 0.38 s without scrolling; a Hero with Fast + On Page Load and no Animation Type
didn't animate; no state left after the animations; reduced motion: nothing prepared, no overflow.
`test/motion/motion.test.mjs`: values, field order and options, conditions, CSS durations equal to
`MOTION_SPEEDS`, one keyframe per effect, `isSeen`.

## A. Repository analysis

What existed before this change (27 block folders):

| Block | Structure and model | Animation before | Background | Loading | Async content |
|:--|:--|:--|:--|:--|:--|
| Accordion | `details` items | None | None | Immediate | No |
| Anchor List | Sticky chapter navigation (Anchor Link items) | Pins on scroll | None | Immediate | No |
| Cards | Card items, card list decorator | None | Per card (Card colour) | Immediate | No |
| Columns | Rows × cells | None | None | Immediate | No |
| Conversation Canvas | Intro, search row, buttons; Floating journey | `conversation-canvas-float-in` (floating row) | `::before` brand glows (blue left / yellow right on Default, swapped on Secondary), BG Style Default / Dark, BG Background Image | Immediate; menus later | Primary navigation pills and the popover menu from the query index (not blocking) |
| Embed | Placeholder until near view / click | None | None | Lazy (third party) | Yes, with its own placeholder |
| Filter List | Header, filters, card grid | None | None | **Whole decorate waits** for index, taxonomy, authors | Yes, blocking |
| Footer | Footer page fragment + Social Links | None | Footer Canvas | Loads with the sections, shown after them | Yes |
| Form Variations | Form | None | Theme Dark (`background-color` on the block) | Immediate | No |
| Fragment | Fetched page fragment | None | None | Waits for the fragment | Yes (content is other blocks) |
| Gen Carousel | Slides | Autoplay (IntersectionObserver) | None | Immediate | No |
| Header / TCS Header | Nav page | Menu transitions | Logo bar | Reserved space (2.15) | Yes (nav page) |
| Hero | Media, overlay, content, CTAs | **Motion Type**: Fade in, Slide up, Zoom (image) | BG Color Light / Dark blue / Dark blue (subtle) / Black on the block; `.hero-media`; overlay `::before` | Immediate (often LCP) | Lottie near view |
| Interactive Dashboard | Panels | None | None | Immediate | No |
| List | Header, cards / rows, scroller | None | Per card | **Whole decorate waits** for index, redirects (and authors) | Yes, blocking |
| Modal | Dialog from a fragment | Dialog transition | None | On open | Yes |
| Page Header | From metadata (+ Authors sheet) | None | Featured image (Landing) | Waits for the author | Short (first section) |
| Quote | Header, card, media | None | BG Color Grey (`--quote-bg`) | Immediate | No |
| Separator | Line | **Animate on view** (its own line drawing) | Theme | Immediate | No |
| Tab / Tabs | Tab list, panels | None | None | Immediate | Panels may be fragments |
| Table | Table | None | None | Immediate | No |
| Table List | Items | **Motion Type**: per item Fade / Slide / Reveal as each scrolls in | None | Immediate | No |
| Teaser | Content, media, links, stats | None | BG Color Grey / Dark / Dark green on the block; Background image and Card: `.teaser-media` + overlay `::before` | Immediate | Lottie near view |
| Testimonial | Quote, author, stats | None | BG Color Grey | Immediate | No |
| Video | Placeholder, player | None | None | Lazy | Yes, with its own placeholder |

Shared code found and reused: `utils/viewport.js` (IntersectionObserver helpers,
`currentBreakpoint`), `utils/environment.js` (`prefersReducedMotion`, `isEditing`, `isAuthor`),
`decorators/card-list-decorator.js` (List / Cards layout), the Additional tab (`classes_*`
fields), `decorators/data-layer-decorator.js`. There were no motion tokens, no shared keyframes
and no skeleton or loading styles. Sections are shown only after all their blocks are decorated
and load one after another (`loadSection`, `scripts/aem.js`): a List or Filter List waiting for
the index held back its section and every section below it.

## B. Block capability matrix

| Block | Content animation | Background animation | Skeleton | Content target | Skeleton | Reason / notes |
|:--|:--|:--|:--|:--|:--|:--|
| Accordion | Yes | — | — | Each item, staggered | — | Static |
| Cards | Yes | — | — | Header, feature, each card, staggered | — | Authored cards render at once; card colours are per card |
| Columns | Yes | — | — | Each column, staggered | — | |
| Conversation Canvas | Yes | Yes | Yes (parts) | `.conversation-canvas-content` | Pills in the Primary navigation; rows in the menu | Background: the colour, the brand glows (`::before`) or the background image |
| Embed | Yes | — | — | The block | — | Has its own placeholder |
| Filter List | Yes | — | Yes | The block | Title, filter pills, card grid | Index, taxonomy and authors |
| Form Variations | Yes | Yes | — | Its children | — | Dark theme colour |
| Gen Carousel | Yes | — | — | The block | — | |
| Hero | Yes | Yes | — | `.hero-content` | — | Background: colour, media, overlay; replaces Motion Type when set |
| Interactive Dashboard | Yes | — | — | The block | — | |
| List | Yes | — | Yes | Header, feature, each card / row, staggered | Title, cards (image / eyebrow / title / description / CTA as configured) or rows, in the list's grid | Index, redirects, authors |
| Page Header | Yes | — | — | The block | — | Author lookup is short and in the first section (LCP): not deferred |
| Quote | Yes | Yes | — | Its children | — | BG Color Grey |
| Table | Yes | — | — | The block | — | |
| Table List | Yes | — | — | The block | — | Its Motion Type (per item as each scrolls in) stays; Content animation replaces it when set |
| Tabs | Yes | — | — | The block | — | |
| Teaser | Yes | Yes | — | Its children (not the background image) | — | BG Color; Background image / Card: media and overlay |
| Testimonial | Yes | Yes | — | Its children | — | BG Color Grey |
| Video | Yes | — | — | The block | — | Has its own placeholder |
| Anchor List | — | — | — | — | — | Category E: sticky in-page navigation |
| Separator | — | — | — | — | — | Category E: has its own Animate on view |
| Fragment, Modal, Tab | — | — | — | — | — | Category E: content belongs to other blocks / dialog / an item of Tabs |
| Header, TCS Header, Footer | — | — | — | — | — | Category E: site chrome, no Additional tab |

Categories: A (content): Accordion, Cards, Columns, Embed, Gen Carousel, Interactive Dashboard,
Page Header, Table, Table List, Tabs, Video. B (content + background): Form Variations, Hero,
Quote, Teaser, Testimonial. C (content + skeleton): Filter List, List. D (all three):
Conversation Canvas. E: the rest.

## C. Common animation framework

- **Utilities.** `utils/motion.js` (pure, unit tested): the allowed values (`CONTENT_MOTIONS`,
  `BACKGROUND_MOTIONS`), `contentMotionOf` / `backgroundMotionOf` (read from the block's
  classes; unknown values give `''`, so no class is ever made from them), `staggerIndex`
  (capped at 5), `isHorizontal`, `isVisibleColor`. `decorators/motion-decorator.js`:
  `prepareMotion(container)`, `releaseMotion(block)`.
- **CSS.** `styles/motion.css`, loaded only on pages with an animated block: tokens
  (`--motion-duration` 600ms, `--motion-duration-background` 900ms, `--motion-stagger` 80ms,
  `--motion-ease`, `--motion-distance` = `--space-600`, `--motion-distance-slide` =
  `--space-1600`), one keyframe per effect, the state classes.
- **When.** `scripts.js` loads each section with `loadSection(section, prepareMotion)` (and the
  first section before its LCP image), fragments call it before they are inserted: the targets
  get their first frame after the blocks are decorated and before the section is shown, so
  nothing flashes.
- **Visibility.** One IntersectionObserver for the page (`rootMargin: 0px 0px -10% 0px`); each
  block is unobserved once it has started.
- **Run and completion.** A target waits on the first frame of a paused CSS animation
  (`animation-play-state: paused`); the observer adds `motion-running`. When the animations of the
  block's own targets have ended (`animationend`, nested blocks not counted; at most 4 s), every
  class, custom property and inline style the animation added is removed: the block is exactly as
  without animation. Each block animates once per page view.
- **Reduced motion, editor, no IntersectionObserver.** Nothing is prepared and `motion.css` isn't
  even loaded; the CSS first frames also apply only `@media screen and (prefers-reduced-motion:
  no-preference)` and outside `:root.adobe-ue-edit`, so content can't be left hidden (print
  included).
- **Failures.** Every step is in `try`; on an error the block is cleaned up and shown as is; one
  block never affects another.

## D. Authoring model changes

Both fields are in the **Additional** tab after **Hide block**, as `classes_*` fields: they
arrive as block classes and never shift the rows of positional blocks; dialogs keep their three
tabs.

| Field | Property | Blocks (model files) | Options (value) | Default | Controls |
|:--|:--|:--|:--|:--|:--|
| Content animation | `classes_animation` | `blocks/{accordion,cards,columns,conversation-canvas,embed,filter-list,form-variations,gen-carousel,hero,interactive-dashboard,list,page-header,quote,table,table-list,tabs,teaser,testimonial,video}/_*.json` | None (empty), Fade in `motion-fade-in`, Fade up `motion-fade-up`, Fade down `motion-fade-down`, Fade left `motion-fade-left`, Fade right `motion-fade-right`, Slide up `motion-slide-up`, Slide down `motion-slide-down`, Slide left `motion-slide-left`, Slide right `motion-slide-right`, Scale in `motion-scale-in` | None | Content |
| Background animation | `classes_bganimation` | `blocks/{conversation-canvas,form-variations,hero,quote,teaser,testimonial}/_*.json` | None (empty), Fade in `bg-motion-fade-in`, Reveal from the centre `bg-motion-reveal`, Wipe left to right `bg-motion-wipe-right`, Wipe right to left `bg-motion-wipe-left`, Wipe bottom to top `bg-motion-wipe-up`, Scale reveal `bg-motion-scale` | None | Background |

Fade = opacity with a short move (1.5rem); Slide = a longer move (4rem) without fading; Scale
in = opacity with a 94% to 100% scale. Duration, delay and stagger are not authorable: one
standard timing keeps the site consistent; repeated items are staggered automatically (80ms,
at most 5 steps). The Hero's **Motion Type** and the Table List's **Motion Type** stay (existing
pages keep their motion); their descriptions say that Content animation (and, for the Hero's
Zoom, Background animation) replace them when set (`hero.js`, `table-list.js`).

## E. Background animation implementation

- **Source of truth.** The block's own resolved background: its computed `background-color` is
  copied at run time into `--bg-motion-color` and painted by the block's `::after` (free on all six
  blocks) while it animates; the block's own background is transparent meanwhile; the existing
  layers (`.hero-media`, `.teaser-media` for Background image / Card, `.conversation-canvas-background`)
  and the overlay `::before` (Hero and Teaser image overlay, the Canvas brand glows) animate in
  place. No colour is defined in the animation code or CSS.
- **Hero** (homepage Dark blue `--hero-navy`, Black, Light): colour, then media, then overlay
  reveal together; the content (`.hero-content`) animates on its own.
- **Conversation Canvas "yellow" and "blue".** There is no Yellow or Blue option: the yellow
  and blue are the soft brand glows of `::before` (Default: blue left, yellow right; Secondary:
  the reverse); they animate as the background layer, with the white or Dark base colour and the
  background image when set.
- **Teaser, Quote, Testimonial, Form Variations.** Their BG Color / theme colour; Teaser
  Background image and Card also their media and overlay.
- **Stacking and overflow.** While animating the block gets `isolation: isolate` (and
  `position: relative` if static, inline, removed afterwards); the colour layer is at
  `z-index: -3`, under media (-2) and overlay (-1); wipes and reveals are `clip-path` insets of the
  layers, so they never leave the block; Scale reveal grows from 94%, inside the block.
- **Pointer events.** The colour layer has `pointer-events: none`; media and overlays keep their
  own (behind the content); links and buttons stay usable during the animation.

## F. Skeleton loading implementation

| Block | Why it can be delayed | Trigger | Skeleton | Success / error cleanup |
|:--|:--|:--|:--|:--|
| List | Child pages / tagged pages / page items need the query index (and redirects, authors) | Data not there 150ms after decoration (`renderWhenLoaded`) | The title, then as many cards as the breakpoint shows (columns, or Items visible when scrolling; 2 on a 1-column grid), shaped by Card style, Show image (ratio), Show eyebrow, description and CTA; rows for link lists; in the list's own grid classes | Rendered by the existing List logic, then removed; on an error the skeleton is removed and the error logged, as a failing decorate is |
| Filter List | Query index, taxonomy, authors | As above | Title, filter pills, a card grid (2 / 4 / 6 cards per breakpoint) with 4:3 media, in its own grid classes | As above; index failures already give the empty state |
| Conversation Canvas | Primary navigation and the popover menu are filled from the query index (they never held the block back) | The tree not there after 150ms (`skeletonWhile`) | Four pills in the navigation; four rows in the menu | Removed when the tree is rendered or the request settles; a failure leaves the navigation empty (as before) and is logged |

Lifecycle: decorate → data requested → within 150ms: render as before (no skeleton) → else
skeleton (`aria-busy="true"` on the block, the authored rows hidden), decorate returns so the
section is shown → data → render → skeleton removed (at least 250ms after it appeared, so it
doesn't flash) → `releaseMotion(block)`: the Content animation runs on the real content (never on
the skeleton) → stable. The data layer doesn't track a block on its skeleton
(`data-analytics="pending"`); it is tracked when rendered. Reduced motion: the skeleton doesn't
pulse.

## G. Files modified

| File | Reason | Shared / block |
|:--|:--|:--|
| `utils/motion.js` (new) | Values, validation, stagger, colour check | Shared |
| `decorators/motion-decorator.js` (new) | Prepare, observe, run, clean up | Shared |
| `styles/motion.css` (new) | Tokens, keyframes, state classes | Shared |
| `decorators/skeleton-decorator.js` (new) | `renderWhenLoaded`, `skeletonWhile`, `showSkeleton`, `bone` | Shared |
| `styles/styles.css` | Skeleton shapes and pulse | Shared |
| `scripts/scripts.js` | `loadMainSections`, `prepareMotion` before each section is shown | Shared |
| `blocks/fragment/fragment.js`, `blocks/footer/footer.js`, `blocks/header/header.js` | `prepareMotion` once the fragment, footer page or header Canvas is in the page (computed styles need it connected) | Shared call (no Canvas logic) |
| `decorators/card-list-decorator.js` | `buildCardListSkeleton` | Shared (List) |
| `blocks/list/list.js` | Render through `renderWhenLoaded` (logic unchanged) | Block |
| `blocks/filter-list/filter-list.js` | Render through `renderWhenLoaded` (logic unchanged), its skeleton | Block |
| `blocks/conversation-canvas/conversation-canvas.js` | Navigation and menu skeletons, logged failure | Block |
| `blocks/hero/hero.js`, `blocks/table-list/table-list.js` | The new fields replace Motion Type when set | Block |
| `blocks/*/_*.json` (19 models), `component-models.json` | The two fields | Models |
| `test/motion/motion.test.mjs` (new) | Values, fields, colour check | Tests |
| READMEs, `AGENTS.md`, handover | Documentation | Docs |

## H. Accessibility

- `prefers-reduced-motion: reduce`: no animation is prepared (content shows at once), no
  stagger, the skeleton doesn't pulse.
- Keyboard and focus: nothing is made non-interactive or `inert`; focus order and outlines are
  unchanged; content entering is never `display: none`. The skeleton has no focusable element
  and doesn't move focus when replaced.
- Screen readers: the skeleton is `aria-hidden`, the block `aria-busy` while loading; the real
  content keeps its headings, links and landmarks (no duplicates in the skeleton).
- Background readability: the final state is the authored one; during the animation the text
  colour is unchanged (light text over a dark background that reveals within 0.9 s).

## I. Performance

- One IntersectionObserver; no scroll listeners, no layout measurement during scroll; one
  `getComputedStyle` per animated background block, once.
- Only `opacity`, `transform` and `clip-path` animate (compositor friendly); `motion.css` loads
  only when a page has animated blocks.
- DOM: no wrapper elements; classes and one custom property per staggered item, removed at the
  end. Skeletons: about 20–40 small spans per block, removed with the skeleton.
- Lazy loading unchanged; repeated items staggered at most 5 steps (0.4 s); no dependency added.
- Skeletons make pages faster to show: with a slow index (1.5 s) the sections below a List were
  shown at 0.5 s instead of after the index.

## J. Backward compatibility

Pages, models and content need no migration: the fields are new, empty by default, and only
add classes when set. Blocks without them render exactly as before (no class, no CSS file, no
observer). Backgrounds keep their authored values (read, never redefined). Hero and Table List
Motion Type work as before unless the new fields are set. List and Filter List keep all their
logic, display types, sources and variations: the render code moved unchanged into a function
called with the same data; with data already loaded it is awaited as before. Query index use is
unchanged (the same cached requests). Analytics: the same components and events are pushed;
deferred blocks are tracked when rendered. Universal Editor: no animation in edit mode, nothing
hidden, decoration on edits unchanged.

## K. Test results

Unit tests: `npm test` (244 passing; `test/motion/motion.test.mjs`: every value, unknown values,
independence of the two fields, stagger cap, colour check, the fields in the 19 / 6 models and
their absence elsewhere). Lint: `npm run lint` clean.

Browser (local preview, a test page built from the block library drafts; desktop 1440, mobile
390):

| Scenario | Result |
|:--|:--|
| 1 No animation | Hero 2 (control) and blocks without the fields: no class, no CSS loaded on pages without animation |
| 2–3 Fade in, Fade up | Run when in view, end visible; no horizontal scroll |
| 4 Different animations on a page | Hero, Canvas, Cards, Teaser, List, Quote, Filter List ran independently |
| 5 Hero background (Dark blue) | Wipe left to right of the colour, media and overlay; content Fade up separately |
| 6–7 Canvas Default / Secondary (blue and yellow glows) | Reveal / Wipe bottom to top of the glows and base colour; content separately |
| 8 List skeleton | With the index delayed 1.5 s: skeleton at 0.5 s, sections below shown, then the real list |
| 9 Cards / Filter List skeleton | Filter List skeleton in its 3-column grid with 4:3 media; real cards replaced it |
| 10 Fast data | No skeleton when the index is cached / fast (rendered directly) |
| 11 Data failure | Index failing: no skeleton left, not busy, the Filter List empty state shown |
| 12 Reduced motion | Nothing prepared, `motion.css` not loaded, content immediate |
| 13 Multiple instances | Two Heroes (one animated, one not), two Canvases: independent |
| 14 Responsive | Mobile: sideways Slide left clipped from its first frame (overflow 0 px) |
| 15 Universal Editor | Not run in Universal Editor here (no AEM author access); the code prepares nothing in edit mode and the CSS doesn't apply there — to verify on author |
| 16 Unsupported value | `motion-spin`, `bg-motion-spin`: rendered as is, no class used |
| Cleanup | After the animations: no state class, no inline style left, nothing at opacity 0 |

Not verified here: Universal Editor authoring on AEM author; the Primary navigation skeleton (no
Primary Canvas on the test page; same helper as the menu); screen reader output (structure
checked: `aria-hidden`, `aria-busy`, no focusable placeholders).

Known limitations: Background animation on a hero in the first section delays the paint of its
image (the LCP) by the animation; use it below the fold. A skeleton approximates its block, so
the page may grow when the real content is taller (Filter List desktop: 851 → 1893 px, below the
fold). A block hidden when empty keeps its unused first-frame class (invisible, harmless).
