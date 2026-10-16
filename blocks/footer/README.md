# Footer

The footer of every page, loaded like the header: the page footer loads the page's **footer
page** as a fragment, and the **Footer** block authored on that page renders it: a heading, a
floating navigation (hamburger, search bar, page pills and a sub-menu of the locale's pages),
CTA buttons, the copyright and legal links, on a white background with soft brand and warning
glows.

| File | Purpose |
|---|---|
| `blocks/footer/_footer.json` | Universal Editor definitions and models: Footer (block) and its five item types |
| `blocks/footer/footer.js` | The page footer (the inherited footer page as a fragment); the Footer block: decoration, floating navigation, search bar |
| `blocks/footer/footer.css` | All styling and responsive behaviour (mobile first; tablet 600px, desktop 1200px) |
| `models/_page.json` | The Footer page property (`footer`) |
| `utils/inherited-metadata.js`, `utils/site.js` | Inherited page properties; locales, parent pages, `resolvePagePath` |
| `test/inherited-metadata/footer-inheritance.test.mjs`, `test/site/site.test.mjs` | Tests of the footer inheritance and the locale paths, incl. EMEA (`npm test`) |

## Which footer a page shows

Like the header with its Navigation page, the page footer loads the footer page of the
**Footer** page property (page properties, or the `footer` column of the locale's bulk metadata
sheet):

1. the page's own Footer;
2. else the Footer of its nearest parent page, up to the locale's Home page;
3. else the locale's `references/footer`.

The value may be an AEM path (`/content/tcs-corp/emea/en/references/footer-emea`), a published
path (`/en-emea/references/footer-emea`) or a path relative to the locale root. The footer page
is loaded as `{footerPath}.plain.html`; without a published footer page the footer stays empty
(as the header does without a nav page). Parent pages are looked up in parallel, once per page
load (shared with the Navigation lookup), and cached for the browser session (a changed parent
property shows in a new session).

### Example: the EMEA site

The EMEA site is the locale `/content/tcs-corp/emea/en`, published at `/en-emea` (`en-GB`). The
author sets Footer **once**, on the EMEA Home page:

| Page | Footer page property | Footer shown |
|---|---|---|
| `/content/tcs-corp/emea/en` (Home) | `/content/tcs-corp/emea/en/references/footer-emea` | footer-emea |
| `/content/tcs-corp/emea/en/about` | (empty) | footer-emea (inherited) |
| `/content/tcs-corp/emea/en/careers` | `/content/tcs-corp/emea/en/references/footer-careers` | footer-careers (override) |
| `/content/tcs-corp/emea/en/careers/jobs` | (empty) | footer-careers (nearest parent) |

Without a Footer in the chain, EMEA pages show `/en-emea/references/footer`.

Setting up EMEA (administrators, once): create the locale's pages and sheets in AEM (Home,
`references/nav`, `references/footer`, `references/footer-emea`, `error-pages/404`,
placeholders, metadata, redirects, taxonomy, `data/*`); apply `paths.json` to the site
configuration's `public.json` paths; add `/en-emea/metadata.json` to `metadata.source`.

## Authoring (the Footer block on the footer page)

Add one Footer block to the footer page (e.g. `references/footer`, `references/footer-emea`).
Footer pages authored with the previous Footer fields (Conversation Canvas Page, Copyright Text,
Link List) must be re-authored: their first row is now read as the Heading Title.

| Item (component) | Fields | Notes |
|---|---|---|
| Footer (block) | Heading Title | Default "Let's build the future together", shown on two lines |
| Footer Hamburger | Hamburger Icon (image / SVG), Aria Label | Opens the floating navigation; default icon and label (`openNavigation`) when empty |
| Footer Search Bar | Search Variation (Text & Voice / Text Only / Voice Only), Placeholder Text | Voice uses the browser's speech recognition where available |
| Footer CTA Button | CTA Label, CTA Link, Target Type (Same Tab / New Tab) | Any number, in a row (stacked on mobile) |
| Footer Copyright | Copyright Rich Text | |
| Footer Legal Link | Legal Link Label, Legal Link, Target Type | Any number, after the copyright |

Add the items in this order: Hamburger, Search Bar, CTA Buttons, Copyright, Legal Links. On the
published page the rows carry no model name, so the block recognises them by their content (the
search variation, the copyright text, an icon, a link before or after the copyright), then by
position.

Links are AEM paths (`/content/tcs-corp/us/en/privacy`) and are published at the locale's path
(`/en/privacy`). New Tab links open with `target="_blank" rel="noopener noreferrer"` and say so
to screen readers.

## Floating navigation

The hamburger opens pills of the locale's pages from the query index (`utils/query-index.js`;
pages with `hide-in-nav` and the names in `EXCLUDED_PAGES` are left out), by the current page's
level below the locale's Home page:

- **L1** (Home): a pill per top-level page.
- **L2** (1 or 2 levels below Home): the second-level pages of the current section; a pill with
  child pages has a chevron that opens a sub-menu panel of them (also on hover).
- **L3** (3+ levels): a back button to the parent page and suggestion pills that fill in the
  search field.

On pages below Home the navigation opens on load. Escape closes it and returns focus to the
hamburger. Until the footer scrolls into view, the navigation floats at the bottom of the window
(`is-fixed`); it docks in a `.hero-banner-sticky` or `.canvas-block-search-slot` element when one
is on screen (none of the current blocks provides these slots). A footer without a hamburger and
search bar has no floating navigation.

The search form doesn't search yet: it logs the query to the console.

## Placeholders

| Key | English fallback | Used for |
|---|---|---|
| `footerHeading` | Let's build the future together | Heading when the Heading Title is empty |
| `footerNavigation` | Footer navigation | Name of the floating navigation |
| `footerLinks` | Footer links | Name of the legal links navigation |
| `openNavigation` | Open navigation menu | Hamburger name when Aria Label is empty |
| `searchPlaceholder` | Ask us a question | Search placeholder when Placeholder Text is empty |
| `searchByVoice` | Search by voice | Microphone button |
| `submitSearch` | Submit search | Submit button |
| `expandSubpages` | Expand subpages for {title} | Chevron of an L2 pill |
| `returnToParentPage` | Return to parent page | L3 back button |
| `clickHere` | Click here | CTA without a label |
| `copyright` | ©TATA Consultancy Services | Copyright row without text |
| `privacyAndTerms` | Privacy & Terms | Legal link without a label |
| `opensInNewTab` | (opens in a new tab) | Added to New Tab links |

## Accessibility

The heading is an `<h2>`; the floating navigation and the legal links are labelled `<nav>`
landmarks; the hamburger has `aria-expanded` / `aria-controls`, the chevrons `aria-expanded`;
the search field's box shows the keyboard focus; the microphone animation stops with
`prefers-reduced-motion`.
