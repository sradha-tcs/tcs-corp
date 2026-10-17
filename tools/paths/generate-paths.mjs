/*
 * Generates paths.json from the locale list in utils/site.js (LOCALES), so the published locale
 * paths and the code stay in sync. Run with `npm run build:paths` after changing LOCALES.
 *
 * Per locale (AEM /content/tcs-corp/{country}/{code}, published at /{code}):
 * - the locale page itself is the Home page: /content/tcs-corp/de/de-de:/de-de/ (published as
 *   /de-de/index, served at /de-de/)
 * - the locale folder: /content/tcs-corp/de/de-de/:/de-de/
 * - its spreadsheets (the system appends .json): …/data/authors:/de-de/data/authors
 * - its taxonomy page (not a spreadsheet): …/taxonomy:/de-de/taxonomy.json
 * - includes: the locale page and folder; excludes: its block library (author only)
 * Plus the AEM Assets folder, so assets used on the pages are published with them.
 *
 * TEMPORARY: the language master (/content/tcs-corp/language-master/en, published at
 * /language-master/en) while it is reviewed before its rollout to /en (REVIEW_ROOTS in
 * utils/site.js): its folder, its sheets and taxonomy page, and the trees under review. Remove
 * REVIEW (and REVIEW_ROOTS) after the rollout and run `npm run build:paths` again.
 */
import { readFile, writeFile } from 'node:fs/promises';

const SITE = '/content/tcs-corp';
const ASSETS = '/content/dam/tcs-corp/';
const SHEETS = [
  'placeholders',
  'metadata',
  'redirects',
  'data/authors',
  'data/locations',
  'data/partners',
  'data/social-links',
  'data/media-contacts',
];

const REVIEW = {
  aem: `${SITE}/language-master/en`,
  published: '/language-master/en',
  trees: ['curated-design-pages', 'dummy-pages', 'block-library', 'references'],
};

const root = new URL('../../', import.meta.url);
// utils/site.js is a browser module; load it as one to read LOCALES
const source = await readFile(new URL('utils/site.js', root), 'utf8');
const { LOCALES } = await import(`data:text/javascript,${encodeURIComponent(source)}`);

const aemRoot = ({ country, code }) => `${SITE}/${country}/${code}`;

const paths = {
  mappings: [
    // locale folders, then the locale Home pages, then the more specific sheet mappings (the
    // last match wins: /de-de/index resolves to the locale page, not to a de-de/index child)
    ...LOCALES.map((locale) => `${aemRoot(locale)}/:/${locale.code}/`),
    ...LOCALES.map((locale) => `${aemRoot(locale)}:/${locale.code}/`),
    ...LOCALES.flatMap((locale) => [
      ...SHEETS.map((sheet) => `${aemRoot(locale)}/${sheet}:/${locale.code}/${sheet}`),
      `${aemRoot(locale)}/taxonomy:/${locale.code}/taxonomy.json`,
    ]),
    // the language master under review: its folder, then its sheets and taxonomy page
    `${REVIEW.aem}/:${REVIEW.published}/`,
    ...SHEETS.map((sheet) => `${REVIEW.aem}/${sheet}:${REVIEW.published}/${sheet}`),
    `${REVIEW.aem}/taxonomy:${REVIEW.published}/taxonomy.json`,
  ],
  // the locale page (Home) and everything below it; AEM Assets used on the pages (videos,
  // PDFs) are published with them at their own path, e.g. /content/dam/tcs-corp/intro.mp4
  includes: [
    ...LOCALES.map((locale) => aemRoot(locale)),
    ASSETS,
    // the language master under review: its trees, sheets and taxonomy page (not its root page)
    ...[...REVIEW.trees, ...SHEETS, 'taxonomy'].map((path) => `${REVIEW.aem}/${path}`),
  ],
  excludes: [
    ...LOCALES.flatMap((locale) => [
      `${aemRoot(locale)}/block-library`,
      `${aemRoot(locale)}/block-library/**`,
    ]),
    `${SITE}/site-global-templates`,
    `${SITE}/site-global-templates/**`,
  ],
};

await writeFile(new URL('paths.json', root), `${JSON.stringify(paths, null, 2)}\n`);
// eslint-disable-next-line no-console
console.log(`paths.json: ${paths.mappings.length} mappings, ${paths.includes.length} includes, ${paths.excludes.length} excludes`);
