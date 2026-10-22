/**
 * Contact list decorator: groups of contacts (e.g. the Media Contacts data sheet grouped by
 * blocks/media-contacts/media-contacts-data.js) with a heading per group and mail and phone
 * links listed one below the other.
 */

const textElement = (tagName, className, text) => {
  const el = document.createElement(tagName);
  el.className = className;
  el.textContent = text;
  return el;
};

/**
 * A mail / phone link: its kind for screen readers (visually hidden) and for the data layer,
 * which records the kind and the group, not the address (decorators/data-layer-decorator.js).
 */
function contactLink(kind, href, text, { label, group }) {
  const li = document.createElement('li');
  li.className = `contact-list-${kind}`;
  const a = document.createElement('a');
  a.href = href;
  a.className = 'contact-list-link';
  a.dataset.cmpInteraction = kind;
  if (group) a.dataset.cmpValue = group;
  a.append(textElement('span', 'visually-hidden', `${label}: `), textElement('span', 'contact-list-text', text));
  li.append(a);
  return li;
}

/**
 * Builds the contact groups: a list of groups, each with its heading and its contacts.
 * @param {{ heading: string, contacts: { name: string, email: string, phone: string,
 *   tel: string }[] }[]} groups
 * @param {Object} options
 * @param {string} options.headingLevel h2-h6, the level of the group headings
 * @param {{ email: string, phone: string }} options.labels the kinds' names (placeholders)
 * @returns {HTMLUListElement | null} null without contacts
 */
// eslint-disable-next-line import/prefer-default-export
export function buildContactGroups(groups, { headingLevel, labels }) {
  if (!groups?.length) return null;
  const list = document.createElement('ul');
  list.className = 'contact-list-groups';
  groups.forEach((group, index) => {
    const item = document.createElement('li');
    item.className = 'contact-list-group';
    item.dataset.cmpPosition = String(index + 1);
    if (group.heading) item.append(textElement(headingLevel, 'contact-list-heading', group.heading));
    const entries = document.createElement('ul');
    entries.className = 'contact-list-entries';
    group.contacts.forEach((contact) => {
      if (contact.name) entries.append(textElement('li', 'contact-list-name', contact.name));
      const options = { group: group.heading };
      if (contact.email) {
        entries.append(contactLink('email', `mailto:${contact.email}`, contact.email, { ...options, label: labels.email }));
      }
      if (contact.tel) {
        entries.append(contactLink('phone', contact.tel, contact.phone, { ...options, label: labels.phone }));
      }
    });
    item.append(entries);
    list.append(item);
  });
  return list;
}
