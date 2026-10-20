# Dialog options: List Item, Teaser, Columns Container, Section (20 October 2026)

The implementation and validation report for the List Item, Teaser, Columns Container and Section dialog changes, delivered in PR #123 (Teaser, Columns Container), PR #124 (Section) and this change (List Item, List arrow None, the theme contract of the dark backgrounds). "Link Item" in the request is the List block's **List Item** (decided with the product owner on 20 October 2026: the project has no component of that name; the List Item is the item that links a page or URL with its eyebrow, title, description, image, label and call to action).

## 1. Current state (before the changes)

| Block | Finding | Cause (code / delivery) |
|---|---|---|
| Teaser | Title Type (H1–H6) "did nothing" | The level was delivered and rendered (`<h1>` on aem.live), but the size came from the layout and the separate Title size (Style tab): changing the level never changed the look |
| Teaser | Image position Right "not working" | It applied only from 900px; Universal Editor's canvas is often narrower, so the image stayed on top; no Top / Bottom |
| Teaser | BG Color added padding | `.teaser:is(.bg-grey, .bg-dark, .bg-dark-green) { padding: 2.5rem 1.5rem }` (7.5rem / 5rem from 900px) |
| Teaser | No button layout option | Links always stacked (`flex-direction: column`) |
| Teaser | List arrow "not working" | Down right changed only List-style links; buttons and Text links (the default CTA styles) kept their arrow; no way to switch the arrow off |
| Columns Container | No background colour; no zero gap | Not in the model |
| Section | Style offered only Highlight | Multiselect with one option (`highlight`: grey, spacing inside) |
| List Item | No per-item display control | Only the List's own Show options (for all cards) |
| Dark backgrounds | Blocks with their own light colour inside a dark Section / Columns Container | Not yet possible before these changes; found by the combination tests (section 10) |

## 2. Dialog field matrix (after)

| Block | Tab | Field (label) | Property | Type | Values | Default |
|---|---|---|---|---|---|---|
| List Item | Display | Hide Title | `titleHidden` | boolean | on / off | off |
| List Item | Display | Show Description | `showDescription` | boolean | on / off | on |
| List Item | Display | Show Image | `showImage` | boolean | on / off | on |
| List Item | Display | Show Eyebrow | `showEyebrow` | boolean | on / off | on |
| List Item | Display | Show Label | `showLabel` | boolean | on / off | on |
| List Item | Display | Show Action Label | `showActionLabel` | boolean | on / off | on |
| Teaser | Content | Title Type | `titleType` | select | H1 (64px), H2 (48px), H3 (40px), H4 (28px), H5 (24px), H6 (20px) | H2 |
| Teaser | Content | Image position | `imagePosition` | select | Left, Right, Top, Bottom (shown for Layout Image & Text) | Left |
| Teaser | Content | List arrow | `linkArrow` | select | Right (""), Down right (`arrow-down-right`), None (`arrow-none`) | Right |
| Teaser | Content | Buttons side by side | `buttonsSideBySide` | boolean | on (row, wrapping) / off (one below the other) | off |
| Teaser | Style | BG Color | `bgColor` | select | Default, Grey, Dark, Dark green (only the colour) | Default |
| Teaser | Style | Title size | `titleSize` | — | removed (merged into Title Type) | — |
| Columns Container | Content | BG Color | `containerBgColor` | select | Default, Grey (`bg-grey`), Dark (`bg-dark`), Dark green (`bg-dark-green`) | Default |
| Columns Container | Layout | Gap | `columnsGap` | select | None (new), Small, Medium, Large | Medium |
| Section | — | Style | `style` | select (was multiselect) | Default, Grey (`bg-grey`), Dark (`bg-dark`), Dark Green (`bg-dark-green`) | Default |

Property names follow the AEM delivery rules (AGENTS.md): `hideTitle` (the request's suggestion) ends in "Title" and would collapse into a field `hide` (lint `xwalk/no-orphan-collapsible-fields`), so the List Item uses `titleHidden`, the name the Teaser's Hide Title already has. The Button render type is the boolean `buttonsSideBySide` ("Buttons side by side", as the request asked for a toggle) rather than a two-value select: one property, no duplicate.

## 3. Property mapping (model → markup → code → CSS)

| Property | Delivered as | Read by | Result |
|---|---|---|---|
| List Item `titleHidden` … `showActionLabel` | the item row's last 6 cells (`true` / `false` / empty) | `blocks/list/list.js` (`itemLayoutFor`, `ITEM_DISPLAY`), `list-data.js` `itemDisplay`, `applyOverrides` → `card.display` | `decorators/card-list-decorator.js` `displayOf` per card |
| Teaser `titleType` | collapsed into the title: `<h1>`…`<h6>` | `buildHeading` | `teaser.css` `.teaser h1.teaser-title` … (size by level) |
| Teaser `imagePosition` | key-value row | `teaser.js` (`IMAGE_POSITIONS`) | classes `image-right`, `image-top`, `image-bottom` |
| Teaser `linkArrow` | key-value row | `teaser.js` OPTIONS | `arrow-down-right`, `arrow-none` |
| Teaser `buttonsSideBySide` | key-value row | `teaser.js` | `buttons-inline` |
| Teaser `bgColor` | key-value row | `teaser.js` | `bg-grey`, `bg-dark`, `bg-dark-green` (colour only) |
| Columns Container `containerBgColor`, `columnsGap` | section data attributes | `scripts.js` `applySectionBlockOptions`, `buildColumnsSections` | block classes `bg-*`, `gap-none` |
| Section `style` | section class | `decorateSectionsWithOptions` | `bg-grey`, `bg-dark`, `bg-dark-green` |

## 4. Duplicate property assessment

| Properties | Assessment | Decision |
|---|---|---|
| Teaser Title Type (level) and Title size (size) | Same authoring purpose (how big and important the title is); the request asked for one property | One property, Title Type: the level sets the size. Semantics and size can't diverge any more (a large title is a higher level); one H1 per page stays an authoring rule |
| Section Highlight and Grey | Highlight = `--color-bg-secondary` (#f5f5f5), spacing inside the colour: identical to Grey | Highlight removed from the options; mapped to Grey |
| Columns Container BG Color and Section Style | Same colours, same tokens, different element (the columns block vs the whole band) | Both kept, same labels, values (`bg-*`) and theme contract |

## 5. Legacy property migration mapping

| Legacy value | Handling on existing pages (no content change) | Block library / curated pages (migrated) |
|---|---|---|
| Teaser `titleSize` | No longer delivered (field removed); the title takes the size of its level | Removed (52 teasers); the title size examples became Title Type H1–H6 examples |
| Teaser BG Color padding | Gone; set Padding in the Additional tab where wanted | Padding top / bottom 4rem, left / right 2.5rem added to BG Color teasers without their own padding (51) |
| Section `highlight` | Still rendered grey (`main .section.highlight` kept) | Mapped to `bg-grey` (11 sections) |
| List Item rows of 16 cells (rendered before the toggles) | `itemLayoutFor`: read with the layout up to `ariaLabel`; every part shown | Re-rendered with 22 cells |
| Teaser `imagePosition` left / right | Unchanged values | — |

## 6–9. Models, definitions, JavaScript, CSS

- Models and definitions: `blocks/list/_list.json` (list-item Display toggles; `xwalk/max-cells` 19 for list-item), `blocks/teaser/_teaser.json`, `blocks/columns-container/_columns-container.json`, `models/_section.json`; `npm run build:json`.
- JavaScript:
  - `blocks/list/list-data.js`: `ITEM_LAYOUT`, `ITEM_DISPLAY`, `itemLayoutFor`, `itemDisplay`, `card.display`.
  - `blocks/list/list.js`: reads the toggles.
  - `decorators/card-list-decorator.js`: `displayOf` and a hidden title kept for screen readers.
  - `blocks/teaser/teaser.js`: image positions, `buttons-inline`, `arrow-none`; Title size removed.
- CSS:
  - `blocks/teaser/teaser.css`: size by level, no BG padding, positions (side by side from 600px), `buttons-inline`, arrows.
  - `blocks/columns-container/columns-container.css`: BG colours, `gap-none`.
  - `styles/styles.css`:
    - token `--color-bg-dark-green`;
    - the Section colours;
    - the **theme contract** of the dark backgrounds. On a dark Section or Columns Container, text, link and focus tokens turn light, inline links are underlined, and buttons are inverted. A Grey Teaser or Columns Container inside resets the tokens.
  - `styles/card-list.css`: image cards turn light on the dark backgrounds.

## 10. Accessibility validation

| Check | Result |
|---|---|
| Heading semantics (Title Type) | The level renders the element (`h1`…`h6`); the size follows it, so the outline matches the look |
| Hidden title (List Item) | The heading stays in the DOM, visually hidden (kept for the outline and screen readers); the call to action's name carries it (`Read more: The agentic bank`) |
| Hidden action label | The title becomes the card's link (its text names it); with the title hidden too, the action label stays: no invisible focusable link (checked: no card with an invisible link) |
| Image and text order | Top / Bottom / Left / Right are visual (`order`), the DOM order is image then text as before; no reading-order change by layout |
| Button layouts | Row wraps (`flex-wrap`); focus order is the DOM order; buttons keep their 2.75rem height |
| List arrow | Decorative (`::after` mask, no extra stop); None removes it; links keep their text |
| Contrast on the dark colours | Combination page "Sections: colours with blocks", axe WCAG 2.0–2.2 A/AA at 1440 / 390px:<br>• before the theme contract: 43 violations (a Grey Teaser in a dark Section: 1.09:1; inline links not underlined: 1.72:1 to the text; List image cards: 1.05–1.48:1);<br>• after: 0 |
| Focus ring on the dark colours | Brand 500 ring: 2.81:1 on Dark Green (below 3:1). The contract uses brand 300 (11.34:1 on Dark, 7.23:1 on Dark Green); Grey islands use brand 500 again (4.07:1) |
| Primary button on the dark colours | Inverted (white, #0c0c0d text, 19.6:1); the black fill would have been invisible |

## 11. Data layer and Analytics

- Card ids come from the card's destination (`withIds`, hash of the URL) and don't change with the Display toggles, positions or colours.
- Click capture stays central (`data-cmp-interaction="card"` on the one link); the full run shows no duplicate clicks and one cmp:click per test click (section 15).
- Background colours, image positions and button layouts add classes only: no events, no new components.
- No block-level tracking was added. Analytics / Web SDK verification itself remains blocked (Adobe Tags property and measurement plan, as in the audit).

## 12–13. Responsive and performance

- Widths checked: 1440, 1024, 768, 700, 390 and 375px (the harness runs 5 widths).
  - Left / Right are side by side from 600px and stacked below.
  - Top / Bottom stack at every width.
  - No overflow and no overlaps (harness).
- Performance:
  - CSS only for the colours, positions and layouts; no new requests, listeners or blocking resources.
  - The List toggles are applied while the cards are built, so hidden parts aren't rendered (no empty wrappers); the hidden title is one element.
  - PageSpeed checks on the PRs passed.

## 14. Dialog combination test matrix

| Test ID | Block | Dialog configuration | Scenario | Expected result | Actual result | Status | Evidence |
|---|---|---|---|---|---|---|---|
| LI-01 | List Item | all toggles default | existing items | every part shown | img, kicker, title, description, CTA | Passed | list/list-item-display, "All display options on" |
| LI-02 | List Item | all Show off | minimal | title (the link) and tags only | kicker (tags), title link | Passed | "Minimal" |
| LI-03 | List Item | Hide Title | hidden title, CTA visible | title visually hidden, link named with it | `Read more: The agentic bank` | Passed | "Hide Title" |
| LI-04 | List Item | Hide Title + Show Action Label off | fallback | the action label stays | CTA shown, title hidden | Passed | "…the action label stays" |
| LI-05 | List Item | Show Action Label off | title is the link | no CTA, title link | as expected | Passed | "Show Action Label off" |
| LI-06 | List Item | Show Image on / off / on | per card | middle card without image, no empty wrapper | as expected | Passed | "Show Image" |
| LI-07 | List Item | Show Eyebrow off | eyebrow hidden | tags in its place | `Article \| CPG…` | Passed | "Show Eyebrow" |
| LI-08 | List Item | Show Label off (statistic) | label hidden | no `.list-card-subtitle` | as expected | Passed | "Statistic cards" |
| LI-09 | List Item | Show options on, field empty | no content | nothing rendered, no wrapper | as expected (page values used where the page has them) | Passed | unit tests, preview |
| LI-10 | List Item | 16-cell row | rendered before the toggles | read correctly, all shown | ariaLabel, headline read | Passed | test/list "row rendered before the Display toggles" |
| LI-11 | List Item | several Lists on a page | multiple instances | independent cards | 8 lists, independent | Passed | list-item-display page |
| TE-01 | Teaser | Title Type H1–H6 | size by level | 64 / 48 / 40 / 28 / 24 / 20px desktop | as expected (local, aem.live) | Corrected and passed | teaser/title-sizes-and-weights |
| TE-02 | Teaser | Image position Left / Right / Top / Bottom | Image & Text | beside (≥600px), above, below | as expected at 1440 / 700 / 390 | Corrected and passed | teaser/image-positions |
| TE-03 | Teaser | positions × BG Color × button layout | Left+Grey+row, Right+Dark+stacked, Top+Dark green+row, Bottom+Grey+stacked | colour only, layout as set | as expected, 0 axe | Passed | image-positions (combinations) |
| TE-04 | Teaser | BG Color Grey / Dark / Dark green | no padding | padding 0 unless the Additional tab sets it | 0 (64px / 40px with Padding fields) | Corrected and passed | image-options-and-colours |
| TE-05 | Teaser | Buttons side by side on / off | 2 CTAs | row (wrapping) / column | row; wraps at 390px | Passed | cta-styles |
| TE-06 | Teaser | List arrow Down right | buttons, text links, list | rotated arrows | as expected | Corrected and passed | cta-styles |
| TE-07 | Teaser | List arrow None | list links | no arrow | as expected | Passed | cta-styles "List arrow None" |
| TE-08 | Teaser | legacy Title size | existing content | size of its level | as expected (aem.live with 1.0.10 content) | Passed | branch preview |
| CC-01 | Columns Container | BG Color × Gap | Grey / Dark / Dark green; None / Small / Medium / Large | colour only; gap as set | as expected (aem.live) | Passed | alignment-gap-and-breakpoints |
| CC-02 | Columns Container | Dark green + Grey Teaser + default Teaser | nested backgrounds | readable, 0 axe | 0 violations | Corrected and passed | section-colours-with-blocks |
| SE-01 | Section | Default / Grey / Dark / Dark Green | colours | colour only, spacing inside | as expected (aem.live) | Passed | foundations/section-variations |
| SE-02 | Section | each colour × text, links, buttons, Teasers, Cards, List, Accordion | combinations | readable, 0 axe | 43 → 0 violations | Corrected and passed | section-colours-with-blocks |
| SE-03 | Section | legacy Highlight | existing content | grey | grey band kept | Passed | `main .section.highlight` |
| ALL-01 | All | full run (every page × 5 widths) | regression | 0 errors, 0 axe, 0 overflow | 955 loads: 0 errors, 0 failed requests, 0 axe, 0 overflow, 0 duplicate ids | Passed | docs/audit runtime |
| ALL-02 | All | Analytics (Web SDK) | event delivery | — | — | Blocked | Adobe Tags property and measurement plan |
| ALL-03 | All | Universal Editor dialog | persisted values, live update | — | — | Blocked | AEM author access for the agent (to be checked by an author) |

## 15. Regression

Full run of the block library, curated design pages and supporting pages (191 pages × 5 widths, axe WCAG 2.0–2.2 A / AA at 1440 and 390px, data layer, test clicks), after the changes:

| Check | Result |
|---|---|
| Page loads | 955 |
| Fatal loads, loads with console errors, failed requests, blocks not loaded | 0, 0, 0, 0 |
| Horizontal overflow, duplicate ids, broken images | 0, 0, 0 |
| axe violation nodes | 0 |
| Test clicks pushing exactly one cmp:click | 791 of 791 |
| Pages with duplicate data-layer component ids | 0 |

Unit tests: 271 passed (List Item layout, rows rendered before the toggles, `itemDisplay`, `card.display`). Lint (ESLint, Stylelint, xwalk model rules): clean.

## 16–17. Block library and curated design pages

| Page | What it shows |
|---|---|
| list/list-item-display (new) | All on, minimal, hidden title, fallback, no action label, image on / off, eyebrow on / off, statistic labels on / off |
| foundations/section-colours-with-blocks (new) | Each Section colour with text, links, Button blocks, Teasers (default, Grey, Dark), Cards, a List, an Accordion; a Dark green Columns Container with Grey and default Teasers |
| teaser/image-positions | Left, Right, Top, Bottom; with BG Colors and both button layouts |
| teaser/cta-styles | Buttons side by side, centred, stacked, Down right arrows, List arrow None |
| teaser/title-sizes-and-weights | Title Type H1–H6 |
| columns-container/alignment-gap-and-breakpoints | Gap None / Small / Medium / Large; BG Color Grey / Dark / Dark green |
| foundations/section-variations | Grey, Dark, Dark Green (Highlight migrated) |

The 12 curated design pages:
- The migration applies to them as to the library: 16 BG Color teasers have Padding fields and Title size is gone.
- None of them uses Highlight or a fixed List with Display toggles, so they show no other change.
- Their Figma alignment is unchanged.

## 18. Before and after

| | Before | After |
|---|---|---|
| Teaser title | Level and size in two fields; level had no visible effect | One Title Type; level = size |
| Teaser image | Left / Right from 900px | Left / Right from 600px, Top, Bottom |
| Teaser BG Color | Colour + 2.5–7.5rem padding | Colour only |
| Teaser buttons | Always stacked | Stacked or side by side |
| Teaser List arrow | List links only, no off | Every link (Down right), None |
| Columns Container | No colour, gap ≥ Small | BG Color, Gap None |
| Section Style | Highlight only | Default / Grey / Dark / Dark Green |
| List Item | The List's Show options only | Six Display toggles per item |
| Dark backgrounds | — | Theme contract: light tokens, underlined inline links, inverted buttons, light focus ring, Grey islands reset |

## 19. Known limitations

- **Title Type and size:** the visual size follows the level. A visually small H2 or a large H3 can't be authored. That is deliberate (one property), and a separate appearance field can be added if the design needs one.
- **Hidden List Item title:**
  - On a linked card without an action label (none authored and no default for the card style), the title stays visible: a linked card always keeps one visible link.
  - Rows (Display as teaser off) keep their linked title.
- **Teaser List arrow None** applies to List links only; buttons and Text links keep their arrow.
- **Dark backgrounds:** blocks with their own fixed light colours, other than Teaser and Columns Container Grey and the List / Cards cards, aren't covered by the reset. The combination page covers the blocks used on the site's pages.
- **Universal Editor checks:** dialog persistence and live updates weren't checked by the agent (no author access). The models follow the delivery rules, and the published output was verified on aem.live.
- **Analytics:** verification is blocked (see ALL-02).

## 20. Final validation summary

Every option in the request is implemented and tested on the local preview, and the options already delivered (PR #123, #124) are verified on aem.live after their packages were published.

- **Defects found and corrected:**
  - three dark-background contrast issues: Grey Teaser inside a dark band, underlines on inline links, List image cards;
  - the focus ring on Dark Green;
  - the `hideTitle` delivery conflict (renamed `titleHidden`).
- **Open critical or high-severity defects:** none.
- **Blocked:** Analytics delivery and author-side dialog checks.
