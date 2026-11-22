/*
 * Configurable Media Contacts data: the regions of a media-contacts-config row, each with its
 * contacts and the details its action shows. Pure (no DOM): unit tested in
 * test/conf-med-cont/conf-med-cont-data.test.mjs.
 *
 * A config row has the column media-contacts-id, then per region a column named by its region ID
 * (reg-001: contact IDs, comma separated) and one named <region ID>-action. The region columns
 * vary: every column other than media-contacts-id and the -action columns is a region.
 */
import { telHref } from '../../utils/links.js';

export const ID_COLUMN = 'media-contacts-id';
const ACTION_SUFFIX = '-action';

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
 * The region columns of a config row, in the sheet's column order, with their contact IDs.
 * @param {Object} config a media-contacts-config row
 * @returns {{ id: string, contactIds: string[], action: string }[]} regions without
 *   contacts left out
 */
export function regionColumns(config) {
  if (!config) return [];
  return Object.keys(config)
    .filter((column) => key(column) !== ID_COLUMN && !key(column).endsWith(ACTION_SUFFIX))
    .map((column) => ({
      id: text(column),
      contactIds: text(config[column]).split(/[,;]/).map(text).filter(Boolean),
      action: actionOf(config[`${column}${ACTION_SUFFIX}`]),
    }))
    .filter((region) => region.contactIds.length);
}

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
