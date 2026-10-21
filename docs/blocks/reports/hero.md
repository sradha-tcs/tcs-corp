# hero

## Existing README changes

- No README existed.

## Discrepancies

- Handover 6.10 (Dependencies, 6.10.6, screenshot "Properties panel") describes five dialog tabs (Image, Content, Links, Style, Additional); the model now has Content / Style / Additional (handover 2.8, F-84). Code / model is current; the chapter body and the `hero-properties-panel.jpg` reference need correcting.
- Handover 6.10.8 says the CTA List is a composite multifield, "not a separate item component"; the code reads CTA items (`hero-cta`, added with Add) and still reads the legacy `ctas` multifield first (handover 2.10). Code is current.
- Handover 6.10.3 / 6.10.11 rules 19–20 and Issue 2 describe Motion Type (None / Fade in / Slide up / Zoom, `motion-ready`, `is-visible`, 800 ms, 10 % visible); the dialog no longer has Motion Type (2.27): `hero.js` `mapLegacyMotion` maps `motion-fade` / `motion-slide` / `motion-zoom` to `motion-fade-in` / `motion-fade-up` / `bg-motion-scale` (Slow unless a speed is set), played by `decorators/motion-decorator.js`. Code is current; the handover variations 19–22 and Issue 2 need correcting.
- Handover 6.10.11 rule 17 and 6.10.8 say no new-tab hint is added; the code appends the placeholder `opensInNewTab` as visually hidden text (re-audit R-B-1, handover 2.29 / F-17 fixed). Code is current.
- Handover 6.10.11 rule 23 says the eyebrow stays brand blue on dark backgrounds; CSS sets `--brand-300` on Dark blue and Black and white on Dark blue (subtle) (R-B-4). Code is current.
- Handover 6.10.11 rule 6 says the Lottie label comes from the link's `title`; `utils/media.js` `animationLabel` uses the title when it differs from the text, else the link text (AEM delivers the alt as the link text, R-B-3). Code is current.
- Handover 6.10.11 rule 26: a Lottie failure "leaves the media box empty"; `createAnimation` now hides the animation and removes its toggle on `animation:failed` (R-B-2). Code is current.
- Handover "Applicable Templates" / 6.10.8: allowed in Section and Gen Carousel; filters now also include `columns-container` and `tabs`. Code is current.
- Handover F-55: CTA Arrow default "right"; the `hero-cta` item model defaults CTA Arrow to "" (Auto). The legacy multifield `ctaArrow` still defaults to `right`. Documented as a limitation of legacy items only.
- Handover 6.10.8 dependency list includes `utils/multifield.js`, `utils/environment.js`, `utils/viewport.js` directly; they are used indirectly (through `utils/links.js` and the animation decorator). Minor.

## Variations verified

- Hero Image type Default / Lotto (`lottie`), Hero View Default / Contained image (`media-contained`), text only (no media), BG Color Default / `bg-light` / `bg-dark` / `bg-dark-subtle` / `bg-black`, Vertical Alignment `align-top|middle|bottom`, Horizontal Alignment `align-left|center|right`, Text Alignment `text-left|center|right`, CTA view / Arrow / Link Type item options, Title heading level H1 / H2: all in `blocks/hero/_hero.json`, rendered by `hero.js` / `hero.css`.

## Accessibility documented

- Heading level, image / icon / Lottie alt (role img or aria-hidden), Lottie pause / play button (WCAG 2.2.2, placeholders), new-tab hint, dark-variant contrast, reduced motion, keyboard table (Tab, Enter, Enter / Space).

## Data layer documented

- Component `tcs-corp/components/hero` (id Anchor ID or `hero-n`, `dc:title` first heading), central `cmp:click` for CTAs, `data-cmp-interaction="animation"` on the Lottie toggle; Tags / Web SDK not configured, no consent.

## Personalization

- None verified (standard statement).

## Responsive / performance

- Breakpoints 600 / 900 / 1200px from `hero.css`; first-section image eager + high priority; Lottie lazily near the viewport in idle time; F-94 Background animation on the first Hero delays LCP.

## Placeholders

- hero-added-editor-desktop.png, hero-authoring-step-1.png … hero-authoring-step-5.png, hero-cta-editor-placeholder-desktop.png, hero-lottie-focus-desktop.png, hero-cta-focus-desktop.png, hero-lottie-failed-desktop.png, hero-empty-editor-desktop.png, hero-align-left-mobile.png, hero-default-image-mobile.png, hero-lottie-tablet.png, hero-contained-image-mobile.png, hero-bg-dark-subtle-mobile.png (plus the generated dialog placeholders).

## Open questions

- Design sign-off on the Default (white overlay) eyebrow contrast (re-audit R-B-4).
- Owner and version of the block (handover: owner to be confirmed).
- Whether production content with Motion Type and CTA List multifields will be migrated (R-B-6).
