/*
 * Generates the options of the Media Contacts dialog's Contact groups (KB-D-074) from the
 * published Media Contacts sheets: Universal Editor dropdowns take only options written into the
 * model, so the sheets' groups are written into blocks/media-contacts/_media-contacts.json.
 *
 *   npm run build:contacts            read the sheets, update the model, build:json
 *                                     (then npm run build:docs)
 *   node tools/media-contacts/generate-contact-groups.mjs --check
 *                                     exit 1 when the model's options differ from the sheets
 *   ... --origin https://main--tcs-corp--sradha-tcs.aem.page   another origin (default: aem.live)
 *
 * The sheets: data/media-contacts of every locale (LOCALES) and review root (REVIEW_ROOTS) in
 * utils/site.js; a sheet that doesn't exist is skipped. Each group with contacts is one option,
 * once, in the order of the first sheet that has it (value: the group in tag form, e.g.
 * corporate-communications-india; name: its heading). When no sheet can be read, the model is
 * left as it is (exit 1), so a network failure never empties the dropdown.
 * The .github/workflows/media-contact-groups.yaml workflow runs it and opens a pull request when
 * the groups changed.
 */
/* eslint-disable no-console -- a command-line tool: it reports on the console */
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../../', import.meta.url);
const MODEL = new URL('blocks/media-contacts/_media-contacts.json', root);
const FIELD = 'contactGroups';
const args = process.argv.slice(2);
const check = args.includes('--check');
const at = args.indexOf('--origin');
const origin = (at >= 0 && args[at + 1] ? args[at + 1] : 'https://main--tcs-corp--sradha-tcs.aem.live')
  .replace(/\/$/, '');

// utils/site.js is a browser module without imports; load it as one to read the sites
const site = await readFile(new URL('utils/site.js', root), 'utf8');
const { LOCALES, REVIEW_ROOTS } = await import(`data:text/javascript,${encodeURIComponent(site)}`);
const contactsData = await readFile(new URL('blocks/media-contacts/media-contacts-data.js', root), 'utf8');
const { groupOptions } = await import(`data:text/javascript,${encodeURIComponent(contactsData)}`);

const roots = [...REVIEW_ROOTS, ...LOCALES.map(({ code }) => `/${code}`)];

/** a sheet's rows as utils/data.js getMediaContacts reads them, or null when it can't be read */
async function rowsOf(sheetRoot) {
  try {
    const response = await fetch(`${origin}${sheetRoot}/data/media-contacts.json`);
    if (!response.ok) return null;
    const json = await response.json();
    const data = json[':type'] === 'multi-sheet' ? (json.default || json[json[':names']?.[0]])?.data : json.data;
    const cell = (row, column) => String(row[column] ?? '').trim();
    return (data || []).map((row) => ({
      designation: cell(row, 'designation'),
      email: cell(row, 'email'),
      phone: cell(row, 'phone'),
      region: cell(row, 'region'),
      group: cell(row, 'group'),
      heading: cell(row, 'heading'),
    }));
  } catch {
    return null;
  }
}

// in the order of roots (the first sheet that has a group decides its place)
const sheets = (await Promise.all(roots.map(async (sheetRoot) => ({
  sheetRoot, rows: await rowsOf(sheetRoot),
})))).filter(({ rows }) => rows);
if (!sheets.length) {
  console.error(`No Media Contacts sheet could be read from ${origin}: the model is left as it is.`);
  process.exit(1);
}
const options = groupOptions(sheets.map(({ rows }) => rows));
if (!options.length) {
  console.error('The sheets have no group with contacts: the model is left as it is.');
  process.exit(1);
}

const raw = await readFile(MODEL, 'utf8');
const model = JSON.parse(raw);
const field = model.models.find(({ id }) => id === 'media-contacts')?.fields.find(({ name }) => name === FIELD);
if (!field) {
  console.error(`No ${FIELD} field in the media-contacts model.`);
  process.exit(1);
}
const same = JSON.stringify(field.options || []) === JSON.stringify(options);
console.log(`${sheets.length} sheets (${sheets.map(({ sheetRoot }) => sheetRoot).join(', ')}): ${options.length} groups${same ? ', unchanged' : ''}`);
if (check) process.exit(same ? 0 : 1);
if (same) process.exit(0);

field.options = options;
// the file's own formatting: two spaces, the filter's component list on one line
const out = `${JSON.stringify(model, null, 2)}\n`
  .replace(/"components": \[\n\s+"media-contact"\n\s+\]/, '"components": ["media-contact"]');
await writeFile(MODEL, out);
console.log(`Updated ${FIELD}: ${options.map(({ name }) => name).join(', ')}`);
