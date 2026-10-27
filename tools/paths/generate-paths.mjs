/*
 * Generates paths.json from utils/site.js, so the published paths and the code stay in sync:
 * the locales (LOCALES) and the language masters (REVIEW_ROOTS). Run `npm run build:paths` after
 * changing either list; test/site/paths.test.mjs checks paths.json is in step.
 *
 * One generic mapping for every site root, following Adobe's path mapping rules
 * (https://www.aem.live/developer/authoring-path-mapping: prefix matching, the last match wins,
 * so the least specific entries come first):
 * - its folder: every child page and sheet below the root, at the same path below the published
 *   root: /content/tcs-corp/de/de-de/:/de-de/ (…/de-de/insights at /de-de/insights)
 * - its root page, the Home page: /content/tcs-corp/de/de-de:/de-de/ (Adobe's special case: a
 *   page mapped to a folder path is published as /de-de/index, served at /de-de/)
 * - its taxonomy page, published as JSON at another path: …/taxonomy:/de-de/taxonomy.json
 * - includes: the root page and everything below it; excludes: a locale's block library
 * Site roots:
 * - a locale: AEM /content/tcs-corp/{country}/{code}, published at /{code}
 * - a language master (TEMPORARY, while it is reviewed before its rollout to the locales):
 *   AEM /content/tcs-corp/language-master/en, published at /language-master/en (its Home page at
 *   /language-master/en/, its child pages at /language-master/en/<path>). Adding one: add its
 *   published root to REVIEW_ROOTS (the code then reads its own pages, sheets and references
 *   there) and run `npm run build:paths`; remove it after the rollout and run it again.
 * Plus the AEM Assets folder, so assets used on the pages are published with them.
 */
import { readFile, writeFile } from 'node:fs/promises';

const SITE = '/content/tcs-corp';
const ASSETS = '/content/dam/tcs-corp/';

/*
 * Not required: a mapping per spreadsheet (…/de-de/data/authors:/de-de/data/authors). The folder
 * mapping already publishes every sheet below a root at the same path, and Edge Delivery appends
 * .json to spreadsheets itself (/de-de/data/authors.json), so these entries mapped each sheet to
 * the path it gets anyway (8 per root, 112 entries). Kept for reference: a sheet that has to be
 * published at another path than its AEM path (as the taxonomy page below) needs a mapping of its
 * own; uncomment SHEETS and the sheet mappings in `mappings` to map these again.
 */
// const SHEETS = [
//   'placeholders',
//   'metadata',
//   'redirects',
//   'data/authors',
//   'data/locations',
//   'data/partners',
//   'data/social-links',
//   'data/media-contacts',
// ];

const root = new URL('../../', import.meta.url);
// utils/site.js is a browser module; load it as one to read LOCALES and REVIEW_ROOTS
const source = await readFile(new URL('utils/site.js', root), 'utf8');
const { LOCALES, REVIEW_ROOTS } = await import(`data:text/javascript,${encodeURIComponent(source)}`);

// every site root: its AEM path and its published path
const LOCALE_ROOTS = LOCALES.map(({ country, code }) => ({
  aem: `${SITE}/${country}/${code}`, published: `/${code}`,
}));
const MASTER_ROOTS = REVIEW_ROOTS.map((published) => ({ aem: `${SITE}${published}`, published }));
const ROOTS = [...LOCALE_ROOTS, ...MASTER_ROOTS];

const paths = {
  mappings: [
    // the folders (child pages and sheets), then the root pages (the Home pages: the last match
    // wins, so /de-de/index resolves to the root page, not to a de-de/index child page)
    ...ROOTS.map(({ aem, published }) => `${aem}/:${published}/`),
    ...ROOTS.map(({ aem, published }) => `${aem}:${published}/`),
    // the taxonomy pages: a page published as JSON at another path than the folder gives it
    ...ROOTS.map(({ aem, published }) => `${aem}/taxonomy:${published}/taxonomy.json`),
    // not required (see SHEETS above): each sheet at the path the folder mapping gives it
    // ...ROOTS.flatMap(({ aem, published }) => SHEETS
    //   .map((sheet) => `${aem}/${sheet}:${published}/${sheet}`)),
  ],
  // the root pages (Home) and everything below them; AEM Assets used on the pages (videos, PDFs)
  // are published with them at their own path, e.g. /content/dam/tcs-corp/intro.mp4
  includes: [
    ...LOCALE_ROOTS.map(({ aem }) => aem),
    ASSETS,
    ...MASTER_ROOTS.map(({ aem }) => aem),
  ],
  // author-only pages: a locale's block library and the Site Global Templates
  excludes: [
    ...LOCALE_ROOTS.flatMap(({ aem }) => [`${aem}/block-library`, `${aem}/block-library/**`]),
    `${SITE}/site-global-templates`,
    `${SITE}/site-global-templates/**`,
  ],
};

await writeFile(new URL('paths.json', root), `${JSON.stringify(paths, null, 2)}\n`);
// eslint-disable-next-line no-console
console.log(`paths.json: ${paths.mappings.length} mappings, ${paths.includes.length} includes, ${paths.excludes.length} excludes`);
