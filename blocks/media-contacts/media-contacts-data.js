/*
 * Media Contacts data (unit tested in test/media-contacts): authored contact items
 * grouped by designation and region, in authored order. Contacts with the same designation
 * and region (case and spacing ignored) are one group, listed one below the other under the
 * group's heading ("Corporate Communications & India", or the one that is set).
 */

const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const keyOf = (value) => normalize(value).toLowerCase();

export const CONTACT_FIELDS = ['region', 'designation', 'contactName', 'email', 'phone'];

export function telHref(phone) {
  const digits = normalize(phone).replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
  return /\d/.test(digits) ? `tel:${digits}` : '';
}

export function readContactRows(rows) {
  return rows.map((row) => {
    const values = Object.fromEntries(CONTACT_FIELDS.map((field, index) => [
      field,
      normalize((row.querySelector(`[data-aue-prop="${field}"]`)
        || row.children[index])?.textContent),
    ]));
    const email = /^[^\s@,;<>?]+@[^\s@,;<>?]+$/.test(values.email) ? values.email : '';
    return {
      region: values.region,
      designation: values.designation,
      name: values.contactName,
      email,
      phone: telHref(values.phone) ? values.phone : '',
      row,
    };
  });
}

export const isCompleteContact = (contact) => (
  !!(contact.region && (contact.email || contact.phone))
);

/**
 * The heading of a group: designation and region joined with " & ", or the one that is set.
 * @param {string} designation
 * @param {string} region
 * @returns {string}
 */
export const groupHeading = (designation, region) => [normalize(designation), normalize(region)]
  .filter(Boolean).join(' & ');

/**
 * Groups contacts by designation and region, keeping the sheet order of the groups and of the
 * contacts in them. Rows without a name, e-mail or phone are left out.
 * @param {{ name?: string, designation?: string, email?: string, phone?: string,
 *   region?: string }[]} contacts
 * @returns {{ heading: string, designation: string, region: string,
 *   contacts: { name: string, email: string, phone: string }[] }[]}
 */
export function groupContacts(contacts) {
  const groups = new Map();
  (contacts || []).forEach((row) => {
    const contact = {
      name: normalize(row.name),
      email: normalize(row.email),
      phone: normalize(row.phone),
      ...(row.row ? { row: row.row } : {}),
    };
    if (!contact.name && !contact.email && !contact.phone) return;
    const key = `${keyOf(row.designation)}|${keyOf(row.region)}`;
    if (!groups.has(key)) {
      groups.set(key, {
        heading: groupHeading(row.designation, row.region),
        designation: normalize(row.designation),
        region: normalize(row.region),
        contacts: [],
      });
    }
    groups.get(key).contacts.push(contact);
  });
  return [...groups.values()];
}
