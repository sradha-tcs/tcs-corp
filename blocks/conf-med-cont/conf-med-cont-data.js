/*
 * Configurable Media Contacts data: the regions of a media-contacts-config row, each with its
 * contacts and the details its action shows. Pure (no DOM): unit tested in
 * test/conf-med-cont/conf-med-cont-data.test.mjs.
 *
 * A config row has the column media-contacts-id, then per region a column named by its region ID
 * (reg-001: contact IDs, comma separated) and its action column (<region ID>-action), and
 * optionally order_contacts: the order of the regions as region column names (reg-003, reg-001,
 * reg-002: each brings its action column). Nothing depends on fixed column names: every column
 * other than media-contacts-id, order_contacts and the action columns is a region, and a
 * region's action is the action column named after it, else the action column right after it.
 */
import { telHref } from '../../utils/links.js';

export const ID_COLUMN = 'media-contacts-id';
export const ORDER_COLUMN = 'order_contacts';
// action columns end with "action" (reg-001-action, India Action, india_action)
const ACTION_SUFFIX = 'action';

/** what each region action shows of its contacts, in the order shown */
export const ACTIONS = {
  mail: ['email'],
  'mail-contact': ['email', 'phone'],
  contact: ['phone'],
  'name-mail-contact': ['name', 'email', 'phone'],
  'name-des-mail-contact': ['name', 'description', 'email', 'phone'],
};

/** an empty or unknown action: the e-mail addresses and phone numbers */
export const DEFAULT_ACTION = 'mail-contact';

const text = (value) => String(value ?? '').trim();
const key = (value) => text(value).toLowerCase();
/** a column name without case, spaces, hyphens or underscores (Order Contacts, order-contacts) */
const columnKey = (value) => key(value).replace(/[\s_-]+/g, '');
const isOrderColumn = (column) => columnKey(column) === columnKey(ORDER_COLUMN);
const isActionColumn = (column) => columnKey(column).endsWith(ACTION_SUFFIX);
const isRegionColumn = (column) => columnKey(column) !== columnKey(ID_COLUMN)
  && !isOrderColumn(column) && !isActionColumn(column);

/**
 * The action column of a region column: the one named after it (reg-001-action), else the action
 * column right after it in the sheet, whatever its name.
 * @param {string[]} columns the row's columns in sheet order
 * @param {number} index the region column's index
 * @returns {string | undefined}
 */
function actionColumnOf(columns, index) {
  const named = columns.find((column) => isActionColumn(column)
    && columnKey(column) === `${columnKey(columns[index])}${ACTION_SUFFIX}`);
  if (named) return named;
  const next = columns[index + 1];
  return next && isActionColumn(next) ? next : undefined;
}

/**
 * The config row of a media contacts ID (case-insensitive).
 * @param {Object[]} configs the media-contacts-config rows
 * @param {string} id
 * @returns {Object | null}
 */
export function findConfig(configs, id) {
  const wanted = key(id);
  if (!wanted) return null;
  return (configs || []).find((row) => key(row[ID_COLUMN]) === wanted) || null;
}

/**
 * The action of a region: the -action column's value when it is one of ACTIONS, else the default.
 * @param {string} value
 * @returns {string}
 */
export function actionOf(value) {
  const action = key(value);
  return Object.keys(ACTIONS).includes(action) ? action : DEFAULT_ACTION;
}

/**
 * The order_contacts value of a config row (whatever the column's case or separators).
 * @param {Object} config a media-contacts-config row
 * @returns {string}
 */
export function orderOf(config) {
  const column = Object.keys(config || {}).find(isOrderColumn);
  return column ? text(config[column]) : '';
}

/**
 * Orders regions by an order_contacts value: the regions it lists first, in its order, then the
 * others in the sheet's column order (nothing is left out). An entry is the name of a region
 * column (reg-002, or India after a rename), which brings its action column with it; the name of
 * its action column (reg-002-action) counts as the region too. Names are compared without case,
 * spaces, hyphens or underscores; entries are separated by commas, semicolons or new lines (names
 * may hold spaces: Middle East). A number that is no column name is the region column at that
 * position (2: the second), as order_contacts was first written. Empty: the sheet's column order,
 * as the author added the regions.
 * @template {{ id: string, actionColumn?: string }} R
 * @param {R[]} regions every region column of the row, in the sheet's column order
 * @param {string} order e.g. "reg-003, reg-001, reg-002"
 * @returns {{ regions: R[], unknown: string[] }} unknown: entries that name no region column of
 *   the row (for the author)
 */
export function orderRegions(regions, order) {
  const entries = text(order).split(/[,;\n]+/).map(text).filter(Boolean);
  if (!entries.length) return { regions: [...regions], unknown: [] };
  const listed = [];
  const unknown = [];
  entries.forEach((entry) => {
    const name = columnKey(entry);
    const region = regions.find((r) => columnKey(r.id) === name)
      || regions.find((r) => r.actionColumn && columnKey(r.actionColumn) === name)
      || (/^\d+$/.test(entry) ? regions[Number(entry) - 1] : undefined);
    if (!region) unknown.push(entry);
    else if (!listed.includes(region)) listed.push(region);
  });
  return {
    regions: [...listed, ...regions.filter((region) => !listed.includes(region))],
    unknown,
  };
}

/**
 * Every region column of a config row (empty ones too), ordered by its order_contacts: ordered
 * before empty regions are left out, so an empty region listed in the order isn't unknown.
 * @param {Object} config a media-contacts-config row
 * @returns {{ regions: { id: string, contactIds: string[], action: string }[], unknown: string[] }}
 */
function orderedRegions(config) {
  if (!config) return { regions: [], unknown: [] };
  // the sheet's columns in order (every row of a sheet has every column, empty ones too, so the
  // positions are the same in every row)
  const columns = Object.keys(config);
  const regions = columns
    .map((column, index) => ({ column, index }))
    .filter(({ column }) => isRegionColumn(column))
    .map(({ column, index }) => {
      const actionColumn = actionColumnOf(columns, index);
      return {
        id: text(column),
        contactIds: text(config[column]).split(/[,;]/).map(text).filter(Boolean),
        action: actionOf(config[actionColumn]),
        actionColumn,
      };
    });
  const { regions: ordered, unknown } = orderRegions(regions, orderOf(config));
  // the action column was only needed to read the order
  return { regions: ordered.map(({ actionColumn, ...region }) => region), unknown };
}

/**
 * The region columns of a config row with their contact IDs, in the row's order_contacts order,
 * else in the sheet's column order.
 * @param {Object} config a media-contacts-config row
 * @returns {{ id: string, contactIds: string[], action: string }[]} regions without
 *   contacts left out
 */
export function regionColumns(config) {
  return orderedRegions(config).regions.filter((region) => region.contactIds.length);
}

/**
 * The order_contacts entries of a config row that name no region column of the row.
 * @param {Object} config a media-contacts-config row
 * @returns {string[]}
 */
export const unknownOrderEntries = (config) => orderedRegions(config).unknown;

/**
 * The regions of a config row with their contacts, as its actions show them.
 * @param {Object} config a media-contacts-config row
 * @param {{ contacts: Object[], regions: Object[] }} sheets the contacts ({ id, name,
 *   description, emails, phones }) and regions ({ id, name }) of utils/data.js getConfMedCont
 * @returns {{ groups: Object[], missing: string[] }} groups: { id, name, action, people:
 *   { id, name, description, emails, phones: { phone, tel }[] }[] }; missing: the contact IDs and
 *   region IDs the sheets don't have (for the author)
 */
export function regionGroups(config, { contacts = [], regions = [] } = {}) {
  const contactById = new Map(contacts.map((contact) => [key(contact.id), contact]));
  const regionById = new Map(regions.map((region) => [key(region.id), region]));
  const missing = new Set();
  const groups = regionColumns(config).map(({ id, contactIds, action }) => {
    const shows = new Set(ACTIONS[action]);
    const region = regionById.get(key(id));
    if (!region?.name) missing.add(id);
    const people = contactIds.map((contactId) => {
      const contact = contactById.get(key(contactId));
      if (!contact) { missing.add(contactId); return null; }
      return {
        id: contact.id,
        name: shows.has('name') ? text(contact.name) : '',
        description: shows.has('description') ? text(contact.description) : '',
        emails: shows.has('email') ? (contact.emails || []).map(text).filter(Boolean) : [],
        phones: shows.has('phone') ? (contact.phones || []).map(text)
          .map((phone) => ({ phone, tel: telHref(phone) })).filter(({ tel }) => tel) : [],
      };
    }).filter((person) => person
      && (person.name || person.description || person.emails.length || person.phones.length));
    return {
      id, name: text(region?.name), action, people,
    };
  }).filter((group) => group.people.length);
  return { groups, missing: [...missing] };
}
