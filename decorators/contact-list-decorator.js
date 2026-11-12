/** Contact list decorator: independent Media Contact entries with mail and phone links. */

import { moveInstrumentation } from '../scripts/scripts.js';

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
function contactLink(kind, href, text, { label, value }) {
  const li = document.createElement('li');
  li.className = `contact-list-${kind}`;
  const a = document.createElement('a');
  a.href = href;
  a.className = 'contact-list-link';
  a.dataset.cmpInteraction = kind;
  if (value) a.dataset.cmpValue = value;
  a.append(textElement('span', 'visually-hidden', `${label}: `), textElement('span', 'contact-list-text', text));
  li.append(a);
  return li;
}

/**
 * Builds a list of independent contact entries.
 * @param {{ region: string, emails: string[], phones: { phone: string, tel: string }[],
 *   row?: Element }[]} contacts
 * @param {Object} options
 * @param {string} options.headingLevel h2-h6, the level of the group headings
 * @param {{ email: string, phone: string }} options.labels the kinds' names (placeholders)
 * @returns {HTMLUListElement | null} null without contacts
 */
// eslint-disable-next-line import/prefer-default-export
export function buildContactList(contacts, { headingLevel, labels }) {
  if (!contacts?.length) return null;
  const list = document.createElement('ul');
  list.className = 'contact-list';
  contacts.forEach((contact, index) => {
    const item = document.createElement('li');
    item.className = 'contact-list-contact';
    item.dataset.cmpPosition = String(index + 1);
    if (contact.row) moveInstrumentation(contact.row, item);
    if (contact.region) item.append(textElement(headingLevel, 'contact-list-heading', contact.region));
    const entries = document.createElement('ul');
    entries.className = 'contact-list-entries';
    const options = { value: contact.region };
    contact.emails.forEach((email) => {
      entries.append(contactLink('email', `mailto:${email}`, email, { ...options, label: labels.email }));
    });
    contact.phones.forEach(({ phone, tel }) => {
      entries.append(contactLink('phone', tel, phone, { ...options, label: labels.phone }));
    });
    item.append(entries);
    list.append(item);
  });
  return list;
}
