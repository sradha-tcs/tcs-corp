/*
 * Generates paths.json from the locale list in utils/site.js (LOCALES), so the published locale
 * paths and the code stay in sync. Run with `npm run build:paths` after changing LOCALES.
 *
 * Per locale (AEM /content/tcs-corp/{country}/{code}, published at /{code}):
 * - the locale folder: /content/tcs-corp/de/de-de/:/de-de/
 * - its spreadsheets (the system appends .json): …/data/authors:/de-de/data/authors
 * - its taxonomy page (not a spreadsheet): …/taxonomy:/de-de/taxonomy.json
 * - includes: the locale folder; excludes: its block library (author only)
 */
import { readFile, writeFile } from 'node:fs/promises';

const SITE = '/content/tcs-corp';
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

const root = new URL('../../', import.meta.url);
// utils/site.js is a browser module; load it as one to read LOCALES
const source = await readFile(new URL('utils/site.js', root), 'utf8');
const { LOCALES } = await import(`data:text/javascript,${encodeURIComponent(source)}`);

const aemRoot = ({ country, code }) => `${SITE}/${country}/${code}`;

const paths = {
  mappings: [
    // locale folders first; the more specific sheet mappings follow (the last match wins)
    ...LOCALES.map((locale) => `${aemRoot(locale)}/:/${locale.code}/`),
    ...LOCALES.flatMap((locale) => [
      ...SHEETS.map((sheet) => `${aemRoot(locale)}/${sheet}:/${locale.code}/${sheet}`),
      `${aemRoot(locale)}/taxonomy:/${locale.code}/taxonomy.json`,
    ]),
  ],
  includes: LOCALES.map((locale) => `${aemRoot(locale)}/`),
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
