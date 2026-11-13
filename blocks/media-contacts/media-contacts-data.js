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
