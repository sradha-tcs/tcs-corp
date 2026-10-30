# Image Collage

The Image Collage block centres an eyebrow, a title, a description and up to two calls to action (CTAs) on a dark background, framed by up to nine floating decorative images. Each image is a Collage image item, shown in black and white or in colour. It is a key-value block: Universal Editor stores one row per property, the Collage image items follow as rows of their own, and `blocks/image-collage/image-collage.js` turns them into a media layer and a content column.

| Attribute | Value |
| --------- | ----- |
| Technical name | `image-collage` (model `image-collage`, template name "Image Collage") |
| Display name | Image Collage |
| Block type | Key-value block (`key-value: true`) with item children |
| Status | Active (new block; its overlap with the Teaser's Image collage layout is decision KB-D-058, Proposed) |
| Parent / children | Parents: Section, Columns Container, Tabs Container (filters `section`, `columns-container`, `tabs`). Children: Collage image item (`image-collage-item`, filter `image-collage`) |
| Owner / version / date | Not recorded / Not recorded / Not recorded |

## Overview

- **Business purpose:** a visual statement section, for example to introduce a portfolio, a story or a brand theme, where many small images set the mood around one message.
- **User experience:** a dark block at least 64rem high (46.875rem on tablets) with a soft overlay over the images. The text column is centred and at most 37.5rem wide. The images float slowly (not with reduced motion) and are decorative (`aria-hidden`), so screen readers read only the text and the CTAs.
- **Templates / page types:** any page. No template adds the block.
- **Data source:** authored fields and the Collage image items only. Placeholders: `opensInNewTab` (CTAs opening a new tab) and `itemEditorHint` (empty items in Universal Editor).
- **Related blocks:** Teaser (`blocks/teaser`), whose Layout Image collage has the same purpose (see KB-D-058); Hero (`blocks/hero`) for the opening banner of a page.
- **When to use:** one message framed by a set of images, with at most two CTAs.
- **When not to use:** when the images carry information (they are decorative and hidden from assistive technology; use Cards or a List); for the page's opening banner (use a Hero).
- **Realistic use cases:** a "Our work" introduction above a case study list; a brand campaign section; an events or culture page section.

## Visual Reference

<!-- BEGIN GENERATED: screenshots (npm run build:docs) -->

No handover screenshot of this block was identified.

Universal Editor dialogs (no screenshot exists yet; to be captured on AEM author):

```text
[Screenshot Placeholder]

File name:
image-collage-dialog-content-desktop.png

Purpose:
The Content tab of the Image Collage properties in Universal Editor, with the fields of the table "Content tab — Image Collage" in Authorable Fields below.

Annotations:
A = Eyebrow
B = Show Eyebrow
C = Title
D = Title Type
E = Hide Title
F = Description
G = Show Description
H = Short Description
I = View All Text
J = View All Link
```

```text
[Screenshot Placeholder]

File name:
image-collage-dialog-style-desktop.png

Purpose:
The Style tab of the Image Collage properties in Universal Editor, with the fields of the table "Style tab — Image Collage" in Authorable Fields below.

Annotations:
A = Title weight
B = Description size
C = Eyebrow Style
```

```text
[Screenshot Placeholder]

File name:
image-collage-dialog-additional-desktop.png

Purpose:
The Additional tab of the Image Collage properties in Universal Editor, with the fields of the table "Additional tab — Image Collage" in Authorable Fields below.

Annotations:
A = Anchor ID
B = Hide block
C = Animation Type
D = Motion Speed
E = Animation Trigger
F = Background animation
G = Padding left
H = Padding right
I = Padding top
J = Padding bottom
```

```text
[Screenshot Placeholder]

File name:
image-collage-item-dialog-collage-image-desktop.png

Purpose:
The Collage image tab of the Collage image item properties in Universal Editor, with the fields of the table "Collage image tab — Collage image item" in Authorable Fields below.

Annotations:
A = Image
B = Image alt text
C = Image treatment
```

<!-- END GENERATED: screenshots -->

## For Content Authors

1. Add an Image Collage to a Section, a Columns Container column or a Tab.
2. Fill in the Content tab: Eyebrow, Title (with its heading level), Description and the CTAs.
3. Add up to nine Collage image items with Add, each with an image, its alt text and the Image treatment (Black and white by default, or Normal).
4. Adjust the Style tab (title weight, description size, eyebrow style) and the Additional tab (anchor, hide, spacing, animation) if needed.
5. Preview and publish the page; the images in AEM Assets are published with it.

## Authorable Fields

<!-- BEGIN GENERATED: fields (npm run build:docs) -->

### Image Collage (`image-collage`)

Model `image-collage`; template name "Image Collage" (the block class AEM renders); key-value block (one row per property); children: `image-collage-item`.

Stored on a new component (definition template): `titleType` = `"h2"`, `showEyebrow` = `true`, `showDescription` = `true`, `primaryCtaStyle` = `"primary"`, `secondaryCtaStyle` = `"secondary"`.

#### Content tab — Image Collage

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Eyebrow | `eyebrow` | text | No | — | — | — | — |
| Show Eyebrow | `showEyebrow` | boolean | No | `true` | on / off | — | — |
| Title | `title` | text | No | — | — | — | — |
| Title Type | `titleType` | select | No | `h2` | H1 (`h1`), H2 (`h2`), H3 (`h3`), H4 (`h4`), H5 (`h5`), H6 (`h6`) | Select the semantic heading level. The visual title treatment is controlled by the Image Collage design. The heading level of the title, which also sets its size (desktop sizes; smaller on mobile). Use one H1 per page. Delivered with `title` (field collapse). | — |
| Hide Title | `titleHidden` | boolean | No | `false` | on / off | The title stays available to screen readers. | — |
| Description | `description` | richtext | No | "" | — | — | — |
| Show Description | `showDescription` | boolean | No | `true` | on / off | — | — |
| Short Description | `shortDescription` | richtext | No | "" | — | Shown after the links. | — |
| View All Text | `viewAllText` | text | No | — | — | Delivered with `viewAll` (field collapse). | — |
| View All Link | `viewAll` | aem-content | No | — | — | — | — |
| Primary CTA Title | `primaryCtaText` | text | No | — | — | Delivered with `primaryCta` (field collapse). | — |
| Primary CTA Link | `primaryCta` | aem-content | No | — | — | — | — |
| Primary CTA Link Type | `primaryCtaTarget` | select | No | "" | Default (""), Open in New Window (`new-window`) | — | — |
| Primary CTA Link Style | `primaryCtaStyle` | select | No | `primary` | Primary Button (`primary`), Primary Button (no arrow) (`primary-no-arrow`), Secondary Button (`secondary`), Secondary Button (no arrow) (`secondary-no-arrow`) | — | — |
| Primary CTA Background | `primaryCtaBackground` | select | No | "" | Style default (""), White (`button-bg-white`), Blue (`button-bg-blue`), Translucent white (`button-bg-translucent`) | Sets the Primary CTA button background. Blue uses rgb(33 106 195). | — |
| Primary CTA Shape | `primaryCtaShape` | select | No | "" | Style default (""), Rectangle (`button-rectangle`) | Sets the Primary CTA shape. Rectangle uses the grey-200 border. | — |
| Secondary CTA Title | `secondaryCtaText` | text | No | — | — | Delivered with `secondaryCta` (field collapse). | — |
| Secondary CTA Link | `secondaryCta` | aem-content | No | — | — | — | — |
| Secondary CTA Link Type | `secondaryCtaTarget` | select | No | "" | Default (""), Open in New Window (`new-window`) | — | — |
| Secondary CTA Link Style | `secondaryCtaStyle` | select | No | `secondary` | Primary Button (`primary`), Primary Button (no arrow) (`primary-no-arrow`), Secondary Button (`secondary`), Secondary Button (no arrow) (`secondary-no-arrow`) | — | — |
| Secondary CTA Background | `secondaryCtaBackground` | select | No | "" | Style default (""), White (`button-bg-white`), Blue (`button-bg-blue`), Translucent white (`button-bg-translucent`) | Sets the Secondary CTA button background. Blue uses rgb(33 106 195). | — |
| Secondary CTA Shape | `secondaryCtaShape` | select | No | "" | Style default (""), Rectangle (`button-rectangle`) | Sets the Secondary CTA shape. Rectangle uses the grey-200 border. | — |

#### Style tab — Image Collage

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Title weight | `titleWeight` | select | No | "" | Layout default (""), Regular (`title-regular`), Semibold (`title-semibold`) | — | — |
| Description size | `descriptionSize` | select | No | "" | Layout default (""), Regular (18px) (`text-regular`), Large (24px) (`text-large`) | — | — |
| Eyebrow Style | `eyebrowStyle` | select | No | "" | Brand (""), Label (uppercase, grey) (`eyebrow-label`), Grey (`eyebrow-grey`), White (`eyebrow-white`) | Controls the eyebrow appearance and colour. Grey uses rgb(90 90 90). White is intended for dark or image backgrounds. | — |

#### Additional tab — Image Collage

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Anchor ID | `classes_anchor` | text | No | — | regExp: ^anchor-[a-z0-9][a-z0-9-]*$; customErrorMsg: Start with anchor-, then lower-case letters, digits and hyphens. | A unique ID of the block on the page, starting with anchor-, e.g. anchor-our-services; link to it with #anchor-our-services. Delivered as a block class. | — |
| Hide block | `classes_hideblock` | boolean | No | `false` | on / off | Hides the whole block on the page until it is turned off (shown faded in the editor). Delivered as a block class. | — |
| Animation Type | `classes_animation` | select | No | "" | None (""), Fade in (`motion-fade-in`), Fade up (`motion-fade-up`), Fade down (`motion-fade-down`), Fade left (`motion-fade-left`), Fade right (`motion-fade-right`), Slide up (`motion-slide-up`), Slide down (`motion-slide-down`), Slide left (`motion-slide-left`), Slide right (`motion-slide-right`), Scale in (`motion-scale-in`) | How the block's content appears; repeated items (cards, list items, accordion items, columns) appear one after another. None: shown as is. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | — |
| Motion Speed | `classes_animationspeed` | select | No | "" | Medium (""), Fast (`motion-fast`), Slow (`motion-slow`) | How fast the block's animations run (Animation Type 0.3 / 0.6 / 0.9 s; the Background animation takes 1.5 times as long). Shown when (`classes_animation` is set and `classes_animation` is not empty) or (`classes_bganimation` is set and `classes_bganimation` is not empty). Delivered as a block class. | — |
| Animation Trigger | `classes_animationtrigger` | select | No | "" | On Scroll / Viewport Entry (""), On Page Load (`motion-on-load`) | When the block's animations run. On Scroll: when the block comes into view (at once if it is in view when the page opens). On Page Load: as soon as the block is ready, wherever it is on the page. Shown when (`classes_animation` is set and `classes_animation` is not empty) or (`classes_bganimation` is set and `classes_bganimation` is not empty). Delivered as a block class. | — |
| Background animation | `classes_bganimation` | select | No | "" | None (""), Fade in (`bg-motion-fade-in`), Reveal from the centre (`bg-motion-reveal`), Wipe left to right (`bg-motion-wipe-right`), Wipe right to left (`bg-motion-wipe-left`), Wipe bottom to top (`bg-motion-wipe-up`), Scale reveal (`bg-motion-scale`) | How the Collage image background appears. Motion Speed and Animation Trigger apply to it too. Not played in the editor or when the visitor prefers reduced motion. Delivered as a block class. | — |
| Padding left | `classes_paddingleft` | select | No | "" | Default (""), 0 (none) (`pl-0`), 0.25rem (space-100) (`pl-100`), 0.5rem (space-200) (`pl-200`), 0.75rem (space-300) (`pl-300`), 1rem (space-400) (`pl-400`), 1.25rem (space-500) (`pl-500`), 1.5rem (space-600) (`pl-600`), 2rem (space-800) (`pl-800`), 2.5rem (space-1000) (`pl-1000`), 3rem (space-1200) (`pl-1200`), 4rem (space-1600) (`pl-1600`), 5rem (space-2000) (`pl-2000`), 6rem (space-2400) (`pl-2400`), 7.5rem (space-3000) (`pl-3000`) | Delivered as a block class. | — |
| Padding right | `classes_paddingright` | select | No | "" | Default (""), 0 (none) (`pr-0`), 0.25rem (space-100) (`pr-100`), 0.5rem (space-200) (`pr-200`), 0.75rem (space-300) (`pr-300`), 1rem (space-400) (`pr-400`), 1.25rem (space-500) (`pr-500`), 1.5rem (space-600) (`pr-600`), 2rem (space-800) (`pr-800`), 2.5rem (space-1000) (`pr-1000`), 3rem (space-1200) (`pr-1200`), 4rem (space-1600) (`pr-1600`), 5rem (space-2000) (`pr-2000`), 6rem (space-2400) (`pr-2400`), 7.5rem (space-3000) (`pr-3000`) | Delivered as a block class. | — |
| Padding top | `classes_paddingtop` | select | No | "" | Default (""), 0 (none) (`pt-0`), 0.25rem (space-100) (`pt-100`), 0.5rem (space-200) (`pt-200`), 0.75rem (space-300) (`pt-300`), 1rem (space-400) (`pt-400`), 1.25rem (space-500) (`pt-500`), 1.5rem (space-600) (`pt-600`), 2rem (space-800) (`pt-800`), 2.5rem (space-1000) (`pt-1000`), 3rem (space-1200) (`pt-1200`), 4rem (space-1600) (`pt-1600`), 5rem (space-2000) (`pt-2000`), 6rem (space-2400) (`pt-2400`), 7.5rem (space-3000) (`pt-3000`) | Delivered as a block class. | — |
| Padding bottom | `classes_paddingbottom` | select | No | "" | Default (""), 0 (none) (`pb-0`), 0.25rem (space-100) (`pb-100`), 0.5rem (space-200) (`pb-200`), 0.75rem (space-300) (`pb-300`), 1rem (space-400) (`pb-400`), 1.25rem (space-500) (`pb-500`), 1.5rem (space-600) (`pb-600`), 2rem (space-800) (`pb-800`), 2.5rem (space-1000) (`pb-1000`), 3rem (space-1200) (`pb-1200`), 4rem (space-1600) (`pb-1600`), 5rem (space-2000) (`pb-2000`), 6rem (space-2400) (`pb-2400`), 7.5rem (space-3000) (`pb-3000`) | Delivered as a block class. | — |
| Margin left | `classes_marginleft` | select | No | "" | Default (""), 0 (none) (`ml-0`), 0.25rem (space-100) (`ml-100`), 0.5rem (space-200) (`ml-200`), 0.75rem (space-300) (`ml-300`), 1rem (space-400) (`ml-400`), 1.25rem (space-500) (`ml-500`), 1.5rem (space-600) (`ml-600`), 2rem (space-800) (`ml-800`), 2.5rem (space-1000) (`ml-1000`), 3rem (space-1200) (`ml-1200`), 4rem (space-1600) (`ml-1600`), 5rem (space-2000) (`ml-2000`), 6rem (space-2400) (`ml-2400`), 7.5rem (space-3000) (`ml-3000`) | Delivered as a block class. | — |
| Margin right | `classes_marginright` | select | No | "" | Default (""), 0 (none) (`mr-0`), 0.25rem (space-100) (`mr-100`), 0.5rem (space-200) (`mr-200`), 0.75rem (space-300) (`mr-300`), 1rem (space-400) (`mr-400`), 1.25rem (space-500) (`mr-500`), 1.5rem (space-600) (`mr-600`), 2rem (space-800) (`mr-800`), 2.5rem (space-1000) (`mr-1000`), 3rem (space-1200) (`mr-1200`), 4rem (space-1600) (`mr-1600`), 5rem (space-2000) (`mr-2000`), 6rem (space-2400) (`mr-2400`), 7.5rem (space-3000) (`mr-3000`) | Delivered as a block class. | — |
| Margin top | `classes_margintop` | select | No | "" | Default (""), 0 (none) (`mt-0`), 0.25rem (space-100) (`mt-100`), 0.5rem (space-200) (`mt-200`), 0.75rem (space-300) (`mt-300`), 1rem (space-400) (`mt-400`), 1.25rem (space-500) (`mt-500`), 1.5rem (space-600) (`mt-600`), 2rem (space-800) (`mt-800`), 2.5rem (space-1000) (`mt-1000`), 3rem (space-1200) (`mt-1200`), 4rem (space-1600) (`mt-1600`), 5rem (space-2000) (`mt-2000`), 6rem (space-2400) (`mt-2400`), 7.5rem (space-3000) (`mt-3000`) | Delivered as a block class. | — |
| Margin bottom | `classes_marginbottom` | select | No | "" | Default (""), 0 (none) (`mb-0`), 0.25rem (space-100) (`mb-100`), 0.5rem (space-200) (`mb-200`), 0.75rem (space-300) (`mb-300`), 1rem (space-400) (`mb-400`), 1.25rem (space-500) (`mb-500`), 1.5rem (space-600) (`mb-600`), 2rem (space-800) (`mb-800`), 2.5rem (space-1000) (`mb-1000`), 3rem (space-1200) (`mb-1200`), 4rem (space-1600) (`mb-1600`), 5rem (space-2000) (`mb-2000`), 6rem (space-2400) (`mb-2400`), 7.5rem (space-3000) (`mb-3000`) | Delivered as a block class. | — |

### Collage image item (`image-collage-item`)

Model `image-collage-item`; template name "Collage image item" (the block class AEM renders).

#### Collage image tab — Collage image item

| Field label | Property | Type | Required | Default | Allowed values | Author guidance | Example |
| ----------- | -------- | ---- | -------- | ------- | -------------- | --------------- | ------- |
| Image | `image` | reference | Yes | — | — | Add up to nine Collage image items. Authoring order determines the CSS-controlled image slot. | — |
| Image alt text | `imageAlt` | text | No | — | — | Leave empty when the collage image is decorative. Delivered with `image` (field collapse). | — |
| Image treatment | `imageTreatment` | select | No | `black-white` | Black and white (`black-white`), Normal (`normal`) | — | — |

<!-- END GENERATED: fields -->

Notes on the significant fields:

- **Title Type and the CTA / View All labels** collapse into their base field (AEM field collapse): the title is delivered as a heading of the chosen level, and the labels as the link text. The block reads them from there, as the Teaser does.
- **Show Eyebrow / Show Description** are on by default (definition template); turn them off to keep the text authored but hidden.
- **Title hidden** keeps the title for screen readers only (`hideVisually`).
- **CTA Link Style** Primary / Secondary (with or without the arrow); **CTA Background** (White, Blue, Translucent white) and **CTA Shape** (Rectangle) apply to Primary and Secondary buttons only.
- **Collage image items:** only the first nine with an image are shown; the others stay in Universal Editor as placeholders below the text, so they can be selected and fixed.

## Screenshot-Based Authoring Steps

### Authoring Step 1: Add the block

In Universal Editor select a Section (or a Columns Container column, or a Tab) and choose Add > Image Collage. The block appears with an empty dark background.

### Values to Enter

| Field | Example |
| ----- | ------- |
| Eyebrow | Our work |
| Title | Stories of transformation |
| Title Type | H2 |

### Authoring Step 2: Description and CTAs

Enter the Description and the Primary CTA (link, label, target and style); add a Secondary CTA if needed.

### Values to Enter

| Field | Example |
| ----- | ------- |
| Description | How enterprises around the world build on belief with TCS. |
| Primary CTA | /en/case-studies, label "Explore case studies" |
| Secondary CTA | /en/contact-us, label "Contact us" |

### Authoring Step 3: Collage images

Select the block and choose Add > Collage image item, up to nine times. Pick an image in each item, enter its alt text and choose the Image treatment.

### Values to Enter

| Field | Example |
| ----- | ------- |
| Image | An image from `/content/dam/tcs-corp/...` |
| Image Alt Text | Empty or a short description (the images are decorative on the page) |
| Image treatment | Black and white |

## Variations

### Default

Dark background, black and white images, regular title, regular description, Primary and Secondary CTAs side by side.

### Colour images

Image treatment Normal on some or all items shows them in colour.

### Style options

Title weight (Regular, Semibold), Description size (Regular, Large) and Eyebrow style (Label, Grey, White) set block classes (`title-*`, `text-*`, `eyebrow-*`).

### CTA styles

Primary or Secondary, with or without the arrow (`image-collage-cta-no-arrow`), with a White, Blue or Translucent white background and a Rectangle shape (`button-bg-*`, `button-rectangle`).

## Complete Authoring Example

| Field | Value |
| ----- | ----- |
| Eyebrow | Our work |
| Title / Title Type | Stories of transformation / H2 |
| Description | How enterprises around the world build on belief with TCS. |
| Primary CTA | /en/case-studies, "Explore case studies", Primary |
| Secondary CTA | /en/contact-us, "Contact us", Secondary |
| Collage image items | Nine images, Black and white |

Expected result: a dark block with the eyebrow, the H2 and the description centred, the two CTAs in one row below them, and nine black and white images floating around the text.

## Content and Asset Guidelines

- Use nine images of similar weight; the positions are fixed per slot (`image-collage-item-1` to `-9`).
- Keep the title short (one or two lines) and the description to two or three lines.
- Use short CTA labels; buttons keep their Figma width as a minimum and grow for longer labels.
- The images are decorative; don't put text or information in them.

## Accessibility

- The images are in an `aria-hidden` layer: only the text and the CTAs are announced.
- The title is a real heading of the authored level; Title hidden keeps it for screen readers.
- CTAs opening a new tab announce it (`opensInNewTab` placeholder, `announceNewTab` through `decorateButton`).
- The floating motion stops with `prefers-reduced-motion: reduce`.
- Check the contrast of the description (`#9e9fa3`-like grey on the dark background) and of any colour images behind the text.

## Data Layer and Analytics

The block is a component entry of the Adobe Client Data Layer like every block (`decorators/data-layer-decorator.js`); clicks on its CTAs are captured centrally. The block pushes nothing itself.

## Personalization

None. No Target, AJO or consent integration exists.

## Responsive Behavior

- **Mobile (< 600px):** the images keep their positions in a fixed 64rem square composition, centred and cropped at the sides; title 2rem; CTAs 3.125rem high with 0.75rem text.
- **Tablet (600px to 1199px):** the block is at least 46.875rem high; title 2.5rem; CTAs 3rem high with 0.875rem text.
- **Desktop (1200px and above):** the images are placed in percentages of the block; title 3rem; CTAs 3rem high with 1rem text.

## For Developers

<!-- BEGIN GENERATED: files (npm run build:docs) -->

```text
blocks/image-collage/
├── README.md
├── _image-collage.json
├── image-collage.css
└── image-collage.js
```

| Decorator/Utility | Purpose | Execution or dependency point |
| ----------------- | ------- | ----------------------------- |
| [`scripts/aem.js`](../../scripts/aem.js) | Edge Delivery core library (block loading, CSS, metadata, optimized pictures) | `image-collage.js`: { toClassName } |
| [`scripts/scripts.js`](../../scripts/scripts.js) | Page decoration (moveInstrumentation and shared page helpers) | `image-collage.js`: { moveInstrumentation } |
| [`decorators/a11y-decorator.js`](../../decorators/a11y-decorator.js) | `hideVisually`, `createHiddenText` (with `.visually-hidden` in `styles/styles.css`) | `image-collage.js`: { hideVisually } |
| [`decorators/button-decorator.js`](../../decorators/button-decorator.js) | `decorateButton` (option `newTabHint`: a link opening a new tab says so), `createButton`, `setButtonDisabled`, `setButtonAlignment`, `removeButtonDecoration` | `image-collage.js`: { decorateButton } |
| [`decorators/content-decorator.js`](../../decorators/content-decorator.js) | `fromCell` (property content into an element, keeping editor instrumentation) | `image-collage.js`: { fromCell } |
| [`decorators/editor-item-decorator.js`](../../decorators/editor-item-decorator.js) | `buildEditorItems`, `editorItemHint` (in Universal Editor, an item the block doesn't render yet, e.g. a CTA just added, as a dashed placeholder the author can select; styles in `styles/lazy-styles.css`; the hint loaded o | `image-collage.js`: { buildEditorItems, editorItemHint, } |
| [`decorators/heading-decorator.js`](../../decorators/heading-decorator.js) | `buildHeading` (Title + Title Type), `HEADINGS` | `image-collage.js`: { buildHeading } |
| [`decorators/image-decorator.js`](../../decorators/image-decorator.js) | `pictureOf` (image with its alt text field) | `image-collage.js`: { pictureOf } |
| [`utils/cells.js`](../../utils/cells.js) | `itemRows`, `KEY_VALUE_ITEM`, `FIELD_ROW_ITEM` (the item rows of a block: by model in the editor, by their cells on the page), `withoutTabCells` (drops the empty cell AEM renders for each dialog tab of an item model), `m | `image-collage.js`: { KEY_VALUE_ITEM, itemRows, withoutTabCells } |
| [`utils/links.js`](../../utils/links.js) | `NEW_WINDOW`, `linkOf`, `linkPathsOf` (the paths of a page property, one or many), `readLinkItems` (CTA lists with Link Type and the items' other select values), `readLinkRows` (the same from link item rows, e.g. Hero CT | `image-collage.js`: { NEW_WINDOW, linkOf } |
| [`utils/placeholders.js`](../../utils/placeholders.js) | `getPlaceholders`, `loadPlaceholders`, `fillPlaceholder` (UI text from the locale's placeholders, with English fallbacks) | `image-collage.js`: { getPlaceholders } |
| [`utils/properties.js`](../../utils/properties.js) | `readProperties`, `textOf`, `isOn`, `isOnByDefault` (a toggle that defaults to on), `optionOf`, `normalizeKey`, `textSource` (key-value block properties) | `image-collage.js`: { isOn, isOnByDefault, optionOf as option, readProperties, textOf, } |

<!-- END GENERATED: files -->

- **JavaScript (`image-collage.js`):** an async `decorate(block)`. It reads the rows with `readProperties`, finds the Collage image items with `itemRows(block, ['image-collage-item'], KEY_VALUE_ITEM)` (by model in Universal Editor, by their cells on the page), loads the placeholders, then builds the media layer, the content and the editor placeholders and replaces the block's children.
- **CSS (`image-collage.css`):** the dark block and its overlay (`::before`), the content column, the nine image slots and their float animation, the CTA styles, and the three breakpoints.
- **Input DOM:** key-value rows `<div><div>name</div><div>value</div></div>`, then one row per Collage image item with three cells (the dialog tab, the image with its alt text, the treatment).
- **Rendered DOM:**

```html
<div class="image-collage block title-semibold">
  <div class="image-collage-media" aria-hidden="true">
    <div class="image-collage-item image-collage-item-1 image-black-white"><picture>…</picture></div>
    …
  </div>
  <div class="image-collage-content">
    <div class="image-collage-intro">
      <p class="image-collage-eyebrow">…</p>
      <div class="image-collage-heading-row"><h2 class="image-collage-title">…</h2></div>
      <div class="image-collage-description">…</div>
    </div>
    <div class="image-collage-links">
      <a class="button primary image-collage-cta">…</a>
      <a class="button secondary image-collage-cta">…</a>
    </div>
  </div>
</div>
```

- **Block classes set by the code:** the Style options (`title-regular`, `title-semibold`, `text-regular`, `text-large`, `eyebrow-label`, `eyebrow-grey`, `eyebrow-white`), removed first and re-added on each decoration.
- **Events and async behavior:** one `getPlaceholders()` request (cached per page).
- **Error handling:** no try / catch; missing cells give empty parts, items without an image aren't shown.
- **Editor:** `moveInstrumentation`, `fromCell` and `buildHeading` keep Universal Editor's instrumentation on the rendered elements; items not shown become placeholders (`buildEditorItems`).
- **Motion:** `decorators/motion-decorator.js` animates the content column (`'image-collage': { targets: ':scope > .image-collage-content' }`) and treats the media layer as the background (`BACKGROUNDS['image-collage']`).

## Extending the Block

1. Add a field in `_image-collage.json` (at most three short tabs, Additional last), then run `npm run build:json` and `npm run lint`.
2. Follow the AEM delivery rules (field collapse, no grouped fields, `classes_*` for classes, no sample content in the template).
3. Read it in `image-collage.js` and style it in `image-collage.css`, scoped to `.image-collage`, with rem sizes.
4. Run `npm run build:modules` after changing imports and `npm run build:docs` after changing the model.

## For Site Administrators

- **Availability:** offered in the `section`, `columns-container` and `tabs` filters.
- **Governance:** the model is in `blocks/image-collage/_image-collage.json`, aggregated into `component-*.json` by `npm run build:json`.
- **Allowed children:** Collage image item (`image-collage-item`).
- **Publishing dependencies:** the images in AEM Assets travel with the page; the `opensInNewTab` and `itemEditorHint` placeholders (English fallbacks in the code).

| Dependency | Purpose | Location | Impact if unavailable |
| ---------- | ------- | -------- | --------------------- |
| Collage images | The floating images | AEM Assets (`/content/dam/...`) | The text renders on the dark background alone |
| Placeholders | New-tab and editor hints | `/{locale}/placeholders.json` | The English fallbacks are used |
| Model and filters | Dialog and placement | `_image-collage.json`, `component-*.json` | The block can't be added or edited |

## For Architects

- **Role:** a presentational, authored-content block with item children; no data source.
- **Overlap:** the Teaser's Image collage layout covers the same design; decision KB-D-058 (Proposed) records whether both stay.
- **Dependencies:** `decorators/a11y-decorator.js`, `button-decorator.js`, `content-decorator.js`, `editor-item-decorator.js`, `heading-decorator.js`, `image-decorator.js`; `utils/cells.js`, `links.js`, `placeholders.js`, `properties.js`.
- **Performance:** one cached placeholders request; images are lazy unless the block is in the first section.

## For QA and Support Teams

| Test ID | Scenario | Configuration | Expected result |
| ------- | -------- | ------------- | --------------- |
| IC-QA-01 | Default | Eyebrow, Title, Description, two CTAs, nine images | Text centred, CTAs in one row, nine black and white images |
| IC-QA-02 | Colour image | Image treatment Normal on one item | That image in colour |
| IC-QA-03 | More than nine | Ten items | Nine images on the page; the tenth only as an editor placeholder |
| IC-QA-04 | Empty item | An item without image | Not on the page; an editor placeholder in Universal Editor |
| IC-QA-05 | Hidden title | Title hidden on | Title not visible, still in the accessibility tree |
| IC-QA-06 | New tab | CTA target New window | `target="_blank"` and the hidden "(opens in a new tab)" text |
| IC-QA-07 | Long CTA label | A 30-character label | The button grows; the label isn't cut off |
| IC-QA-08 | Viewports | 375 / 768 / 1024 / 1440px | Layouts as in Responsive Behavior |
| IC-QA-09 | Reduced motion | `prefers-reduced-motion: reduce` | The images don't float |

## Troubleshooting

| Symptom | Likely cause | Diagnostic steps | Resolution | Verification |
| ------- | ------------ | ---------------- | ---------- | ------------ |
| No images on the page | Items without an image, or images not published | Inspect `.image-collage-media` | Select the images and publish them with the page | The media layer has items |
| An image is missing | More than nine items | Count the items | Remove the extra items | Nine images |

## Performance Considerations

- Up to nine images per block: keep them small (they are shown at most a few hundred pixels wide) and use AEM Assets renditions.
- In the first section the block can hold the Largest Contentful Paint; prefer it below the fold.
- The float animation runs on `transform` only and stops with reduced motion.

## Security and Privacy

Authored content only. No external HTML is injected, no personal data is read or pushed to the data layer.

## Known Limitations

- At most nine images; the slot positions are fixed by the design.
- The images are decorative only (`aria-hidden`); their alt text isn't announced.
- The Teaser's Layout Image collage offers the same design (KB-D-058, Proposed).
- The colours are fixed values of the design (`--image-collage-*` custom properties), not the site's semantic tokens, so a dark Section's theme contract doesn't change them.

## Related Documentation

- [Blocks documentation](../README.md)
- [Teaser](../teaser/README.md) (Layout Image collage)
- [Model: `_image-collage.json`](_image-collage.json)
- [Animation and skeletons](../../docs/animation/README.md)

<!-- BEGIN GENERATED: usage (npm run build:docs) -->

No block library or curated design page using this block was recorded in the library snapshot.

Project-wide standards: [knowledge base](../../docs/handover/knowledge-base/README.md) ([block governance](../../docs/handover/knowledge-base/blocks.md)).

<!-- END GENERATED: usage -->

## Change History

| Version | Change | Source | Date |
| ------- | ------ | ------ | ---- |
| Not recorded | New block (model, code and README) | Repository | 29 October 2026 |
