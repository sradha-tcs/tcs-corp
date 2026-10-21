# footer

## Existing README changes

- No README existed.

## Discrepancies

- `footer.js` header comment and handover 6.2.6 ("Update 2.10") call the Footer Link fields Link Title / Link Type (Default, Open in new window); the model (`_footer.json`, renamed in the re-audit R-D-13) has Link Path, Link text, Open in (Same tab / New tab). Model is current; the code comment and the handover need correcting (the legacy Link List multifield keeps Link Title / Link Type).
- Handover 6.2.8, the variations 5 and 7 notes and register F-16 say new-tab footer and social links aren't announced; code announces them (`announceNewTab`, `opensInNewTab`, D-D-24). Code is current; handover and F-16 need updating (F-16's other parts, empty bar and broken icon names, are still true).
- Handover 6.2.8 performance: "Lazy phase, after main sections"; since 2.13 the footer loads alongside the sections and is shown after them. Handover needs correcting.
- Handover 6.2.1 placeholders list `footerLinks`, `followUsOn`; code also uses `followUs` (social list name), `opensInNewTab`, `itemEditorHint`. Handover output model shows `ul.footer-social` without `aria-label`; code sets "Follow us".

## Variations verified

- Default locale footer, Area-specific footer (footer.js `decoratePageFooter`, inherited `footer`)
- Footer bar only, Footer with Conversation Canvas (footer.js `decorateFooterBar`, `buildCanvas`, footer.css)
- Social links: icons, images, text (decorators/social-links-decorator.js)
- Footer Link opening in a new tab (`_footer.json` `linkTarget`, footer.js `buildLinkList`)

## Accessibility documented

Contentinfo landmark, named `nav.footer-links` and social list, hidden social names, new-tab hints, wrapping layout.

## Data layer documented

Components `footer-1` (page footer) and `footer-2` (authored block, parentId footer-1), central `cmp:click` (bar links on footer-2, social on footer-1); no data-cmp-* or own pushes.

## Personalization

None verified; area footers are content choices.

## Responsive / performance

Breakpoints 600px and 1200px (footer.css); lazy phase alongside the sections, hidden until they load; footer page, Social Links and placeholders in parallel, the Canvas page a sequential fragment.

## Placeholders

footer-link-item-placeholder-desktop.png, footer-social-only-desktop.png, footer-canvas-mobile.png, footer-default-desktop.png, footer-campaign-desktop.png, footer-bar-only-mobile.png, footer-social-fallbacks-desktop.png, footer-new-tab-desktop.png, footer-authoring-step-1.png to footer-authoring-step-5.png

## Open questions

- Should a configured footer page that can't load fall back to `references/footer`, as the header does?
- Should the empty footer bar be skipped and unknown icon names validated (F-16 remainder)?
- Remove the legacy Link List multifield from the dialog after a production content check (audit "deprecate")?
- Drop an authored link `title` equal to its text (audit minor)?
