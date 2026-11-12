/*
 * Media Contacts data (unit tested in test/media-contacts): authored contact items
 * grouped by designation and region, in authored order. Contacts with the same designation
 * and region (case and spacing ignored) are one group, listed one below the other under the
 * group's heading ("Corporate Communications & India", or the one that is set).
 */

const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const keyOf = (value) => normalize(value).toLowerCase();

export const CONTACT_FIELDS = ['region', 'designation', 'contactName', 'email', 'phone'];

function valuesOf(cell) {
  if (!cell) return [];
  const items = [...(cell.querySelectorAll?.('li') || [])];
  return (items.length ? items.map((item) => item.textContent) : [cell.textContent])
    .map(normalize)
    .filter(Boolean);
}

function cellOf(row, field, index) {
  return row.querySelector(`[data-aue-prop="${field}"]`) || row.children[index];
}

export function telHref(phone) {
  const digits = normalize(phone).replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
  return /\d/.test(digits) ? `tel:${digits}` : '';
}

export function readContactRows(rows) {
  return rows.map((row) => {
    const region = valuesOf(cellOf(row, 'region', 0))[0] || '';
    const designation = valuesOf(cellOf(row, 'designation', 1))[0] || '';
    const name = valuesOf(cellOf(row, 'contactName', 2))[0] || '';
    const emails = valuesOf(cellOf(row, 'email', 3))
      .filter((email) => /^[^\s@,;<>?]+@[^\s@,;<>?]+$/.test(email));
    const phones = valuesOf(cellOf(row, 'phone', 4)).filter((phone) => telHref(phone));
    return {
      region,
      designation,
      name,
      emails,
      phones,
      row,
    };
  });
}

export const isCompleteContact = (contact) => {
  const hasDetails = [
    contact.emails?.length,
    contact.email,
    contact.phones?.length,
    contact.phone,
  ].some(Boolean);
  return Boolean(contact.region && hasDetails);
};

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
    const emails = (Array.isArray(row.emails) ? row.emails : [row.emails || row.email])
      .map(normalize)
      .filter(Boolean);
    const phones = (Array.isArray(row.phones) ? row.phones : [row.phones || row.phone])
      .map(normalize)
      .filter(Boolean);
    const contact = {
      name: normalize(row.name),
      emails,
      phones,
      ...(row.row ? { row: row.row } : {}),
    };
    if (!contact.name && !emails.length && !phones.length) return;
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
