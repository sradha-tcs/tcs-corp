/* Media Contacts data: one independently rendered entry per authored contact item. */

const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();

export const CONTACT_FIELDS = ['region', 'email', 'phone'];

function valuesOf(cell) {
  if (!cell) return [];
  const items = [...(cell.querySelectorAll?.('li') || [])];
  return (items.length ? items.map((item) => item.textContent) : [cell.textContent])
    .map(normalize)
    .filter(Boolean);
}

const isEmail = (value) => /^[^\s@,;<>?]+@[^\s@,;<>?]+$/.test(value);

export function telHref(phone) {
  const digits = normalize(phone).replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
  return /\d/.test(digits) ? `tel:${digits}` : '';
}

const isPhone = (value) => /^[+\d\s().-]+$/.test(value) && !!telHref(value);

export function readContactRows(rows) {
  return rows.map((row) => {
    const cells = [...row.children];
    const regionCell = row.querySelector('[data-aue-prop="region"]');
    const emailCell = row.querySelector('[data-aue-prop="email"]');
    const phoneCell = row.querySelector('[data-aue-prop="phone"]');
    const values = cells.flatMap(valuesOf);
    const emails = values.filter(isEmail);
    const phones = values.filter(isPhone);
    const legacyRow = cells.length === 5;
    const region = (regionCell ? valuesOf(regionCell) : valuesOf(cells[0]))[0] || '';
    let contactEmails = emails;
    let contactPhones = phones;
    if (emailCell) contactEmails = valuesOf(emailCell).filter(isEmail);
    else if (legacyRow) contactEmails = valuesOf(cells[3]).filter(isEmail);
    if (phoneCell) contactPhones = valuesOf(phoneCell).filter(isPhone);
    else if (legacyRow) contactPhones = valuesOf(cells[4]).filter(isPhone);
    return {
      region,
      emails: contactEmails,
      phones: contactPhones,
      row,
    };
  });
}

export const isCompleteContact = (contact) => (
  Boolean(contact.region && (contact.emails?.length || contact.phones?.length))
);

/*
 * The contact directory: the Media Contacts sheet of the locale (data/media-contacts, read by
 * utils/data.js getMediaContacts), one row per person or mailbox, grouped into the entries the
 * block shows (KB-D-074).
 */

/**
 * A group's name in tag form, e.g. "Corporate Communications & India" ->
 * corporate-communications-india
 */
export const groupSlug = (value) => normalize(value).toLowerCase()
  .replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

/** the values of a sheet cell with one or more emails or phones (separated by , ; | or newline) */
const listOf = (value) => String(value || '').split(/[,;|\n]/).map(normalize).filter(Boolean);

/**
 * The heading of a row's group: the sheet's heading column, else "designation & region" (e.g.
 * Corporate Communications & India), else the region.
 * @param {{ heading?: string, designation?: string, region?: string }} row
 * @returns {string}
 */
export function groupHeading(row) {
  const heading = normalize(row.heading);
  if (heading) return heading;
  const designation = normalize(row.designation);
  const region = normalize(row.region);
  if (designation && region) return `${designation} & ${region}`;
  return designation || region;
}

/** whether a group (its sheet group column and heading) is one of the selected tags */
function isSelected(group, selected) {
  if (!selected.length) return true;
  return selected.some((tag) => {
    const id = normalize(tag).toLowerCase();
    if (group.tag && id === group.tag.toLowerCase()) return true;
    // a tag whose name is the group's heading in tag form, e.g. tcs-corp:media-contacts/europe
    return groupSlug(id.split(/[/:]/).pop()) === group.slug;
  });
}

/**
 * The directory's contact groups, in the order of the sheet: rows with the same group (the
 * group column, else the heading) form one entry with all their emails and phones.
 * @param {{ group?: string, heading?: string, designation?: string, region?: string,
 *   email?: string, phone?: string }[]} rows the Media Contacts sheet rows
 * @param {{ groups?: string[] }} [options] the selected groups (tag IDs); none: every group
 * @returns {{ region: string, emails: string[], phones: string[] }[]}
 */
export function directoryGroups(rows, { groups = [] } = {}) {
  const byKey = new Map();
  (rows || []).forEach((row) => {
    const heading = groupHeading(row);
    const tag = normalize(row.group);
    const key = tag ? tag.toLowerCase() : groupSlug(heading);
    if (!key) return;
    if (!byKey.has(key)) {
      byKey.set(key, {
        region: heading, tag, slug: tag ? groupSlug(tag.split(/[/:]/).pop()) : key, emails: [], phones: [],
      });
    }
    const group = byKey.get(key);
    // rows of a tagged group may leave the heading to another row of the group
    if (!group.region && heading) group.region = heading;
    listOf(row.email).filter(isEmail).forEach((email) => {
      if (!group.emails.includes(email)) group.emails.push(email);
    });
    listOf(row.phone).filter(isPhone).forEach((phone) => {
      if (!group.phones.includes(phone)) group.phones.push(phone);
    });
  });
  // a tagged group without any heading is headed by its tag's name (emea -> Emea)
  const tagLabel = (tag) => {
    const name = tag.split(/[/:]/).pop().replace(/[-_]+/g, ' ').trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  return [...byKey.values()]
    .filter((group) => isSelected(group, groups))
    .map(({
      region, tag, emails, phones,
    }) => ({ region: region || (tag ? tagLabel(tag) : ''), emails, phones }))
    .filter(isCompleteContact);
}

/**
 * The contacts as the block shows them: without emails (Show email addresses off) or phones
 * (Show phone numbers off), an entry left with neither is left out.
 * @template {{ emails: string[], phones: string[] }} T
 * @param {T[]} contacts
 * @param {{ emails?: boolean, phones?: boolean }} show
 * @returns {T[]}
 */
export function showContacts(contacts, { emails = true, phones = true } = {}) {
  return contacts
    .map((contact) => ({
      ...contact,
      emails: emails ? contact.emails : [],
      phones: phones ? contact.phones : [],
    }))
    .filter(isCompleteContact);
}
