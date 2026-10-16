# Footer

The page footer of every page, and the **Footer** block authored on a footer page. The footer
page is chosen by the inherited **Footer** page property, so a site section (e.g. EMEA) gets its
own footer by setting it once on its root page.

| File | Purpose |
|---|---|
| `blocks/footer/_footer.json` | Universal Editor definitions and models: Footer (block) and Footer Column (item) |
| `blocks/footer/footer-rows.js` | The roles of the block's rows (no DOM; unit tested) |
| `blocks/footer/footer.js` | The page footer (inherited footer page as a fragment, Social Links) and the Footer block |
| `blocks/footer/footer.css` | All styling and responsive behaviour |
| `models/_page.json` | The Footer page property (`footer`) |
| `utils/inherited-metadata.js` | Inherited page properties (Navigation, Footer, 404 Page) |
| `utils/site.js` | Locales, parent pages, `resolvePagePath` |
| `test/footer/footer-rows.test.mjs` | Unit tests of the row roles (`npm test`) |
| `test/inherited-metadata/footer-inheritance.test.mjs` | Integration tests of the footer inheritance (`npm test`) |
| `test/site/site.test.mjs` | Unit tests of the locales and paths, incl. EMEA (`npm test`) |

Figma "Footer - Desktop / Tablet / Mobile": 2496-91965 (1440 × 910), 4347-44552 (1024 × 956),
4347-44593 (399 × 800).

## Which footer a page shows

The page footer loads the footer page of the **Footer** page property (page properties, or the
`footer` column of the locale's bulk metadata sheet), in this order:

1. the page's own Footer;
2. else the Footer of its nearest parent page, up to the locale's Home page (the locale page
   itself);
3. else the locale's `references/footer`.

The value may be an AEM path (`/content/tcs-corp/emea/en/references/footer-emea`), a published
path (`/en-emea/references/footer-emea`) or a path relative to the locale root
(`references/footer-emea`). The footer page is loaded as `{footerPath}.plain.html` (the Fragment
block's `loadFragment`); when editing in Universal Editor, the AEM path is loaded.

Parent pages are looked up in parallel, once per page load and URL (the Navigation and Footer
lookups share them), and their values are cached for the browser session (`sessionStorage`
`tcs-inherited-metadata`); a changed parent property shows in a new session.

### Example: the EMEA site

The EMEA site is the locale `/content/tcs-corp/emea/en`, published at `/en-emea` (`lang`
`en-GB`). The author sets the Footer **once**, on the EMEA Home page:

| Page | Footer page property | Footer shown |
|---|---|---|
| `/content/tcs-corp/emea/en` (Home) | `/content/tcs-corp/emea/en/references/footer-emea` | footer-emea |
| `/content/tcs-corp/emea/en/about` | (empty) | footer-emea (inherited from Home) |
| `/content/tcs-corp/emea/en/about/leadership` | (empty) | footer-emea (inherited from Home) |
| `/content/tcs-corp/emea/en/careers` | `/content/tcs-corp/emea/en/references/footer-careers` | footer-careers (overrides) |
| `/content/tcs-corp/emea/en/careers/jobs` | (empty) | footer-careers (nearest parent) |

Without a Footer anywhere in the chain, EMEA pages show `/en-emea/references/footer`. The other
locales are unchanged: `/en/...` pages show `/en/references/footer` unless a page or parent sets
another footer.

## The Footer block (on the footer page)

| Field | Row | Notes |
|---|---|---|
| Conversation Canvas Page | 1 | Optional: a page with the conversation-canvas block, shown at the top ("Let's build the future together") |
| Copyright Text | 2 | Rich text; `{year}` becomes the current year |
| Link List | 3 | The legal links of the bottom bar: Link Title, Link Path, Link Type (Default / Open in new window) |
| Logo, Logo Alt Text | 4 | Optional: linked to the locale's Home page; the alt text names the link (else the `footerLogoHome` placeholder). The locale's Social Links go next to it |
| **Footer Column** items | 5… | Optional: Column Title, Link List, Show As (Link column / Regional links) |

A footer with only the first three fields renders as before: the Figma layout (canvas, then the
copyright and the links). Logo and columns are shown only when authored, between the canvas and
the bottom bar:

- **Link columns**: one `<nav aria-label="Footer navigation">` with a column per item, its title
  an `<h2>` that labels its list. 4 columns from 900px, 2 below.
- **Regional links** (Show As: Regional links, e.g. "TCS in Europe": United Kingdom, Germany,
  ...): a row of links below a divider, its own `<nav>` named by its title.
- **Logo and social links**: on desktop (1200px+) to the left of the columns; on tablet a row
  above them (logo left, icons right); stacked on mobile.

## Social links

From the locale's Social Links sheet (`/{locale}/data/social-links.json`: Platform, URL, Icon,
Sort Order, e.g. `/en-emea/data/social-links.json`), in Sort Order. LinkedIn, YouTube, Instagram,
Facebook and X (Twitter) have icons in `/icons`. External links open in a new tab with
`target="_blank" rel="noopener noreferrer"` and say so to screen readers. The list sits next to the
Logo when the footer has one, else after the footer page's content (as before).

## Placeholders

| Key | English fallback | Used for |
|---|---|---|
| `footerLinks` | Footer links | Name of the bottom bar's link navigation |
| `footerNavigation` | Footer navigation | Name of the link columns' navigation |
| `footerRegionalLinks` | Regional links | Name of a regional links row without a title |
| `footerSocialLinks` | Social media | Name of the social links list |
| `footerLogoHome` | TCS home | Name of the Logo link when the Logo has no alt text |
| `followUsOn` | Follow us on {platform} | Name of each social link |
| `opensInNewTab` | (opens in a new tab) | Added to links that open in a new tab |

## Accessibility

Semantic `<footer>` (aem.js) with labelled `<nav>` landmarks; column titles are `<h2>` headings;
the tab order follows the visual order (canvas, logo, social links, columns, regional links,
bottom bar); links keep the global focus outline (`a:focus-visible`); new-tab links are
announced; the logo link is named by its alt text.

## Setting up the EMEA site (one-off, administrators)

1. In AEM, create the EMEA locale below `/content/tcs-corp/emea/en` like the other locales: the
   Home page (the locale page itself), `references/nav`, `references/footer` (the default),
   `references/footer-emea`, `error-pages/404`, the sheets `placeholders`, `metadata`,
   `redirects`, `taxonomy` and `data/` (`authors`, `locations`, `partners`, `social-links`,
   `media-contacts`) and a `block-library`.
2. Apply `paths.json` (generated from `LOCALES` in `utils/site.js` by `npm run build:paths`) to
   the site configuration's `public.json` → `paths`; AEM uses that instead of the repository
   file, so the EMEA pages aren't published at `/en-emea` until then.
3. Add `/en-emea/metadata.json` to the site configuration's `metadata.source` (with the other
   locales' sheets).
4. On the EMEA Home page, set **Footer** to `/content/tcs-corp/emea/en/references/footer-emea`.
   No other page needs a change.
