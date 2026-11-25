/** Contact list decorator: independent Media Contact entries with mail and phone links (and, for
 * Configurable Media Contacts, the people of a region with their name and description). */

import { moveInstrumentation } from '../scripts/scripts.js';

const textElement = (tagName, className, text) => {
  const el = document.createElement(tagName);
  el.className = className;
  el.textContent = text;
  return el;
};

/**
 * A mail / phone link: its kind for screen readers (visually hidden) and for the data layer,
 * which records the kind and representative label, not the address.
 */
function contactLink(kind, href, text, { label, value, icon }) {
  const li = document.createElement('li');
  li.className = `contact-list-${kind}`;
  const a = document.createElement('a');
  a.href = href;
  a.className = 'contact-list-link';
  a.dataset.cmpInteraction = kind;
  if (value) a.dataset.cmpValue = value;
  if (icon) {
    a.classList.add('contact-list-link-custom-icon');
    const image = document.createElement('img');
    image.className = 'contact-list-icon';
    image.src = icon;
    image.alt = '';
    a.append(image);
  }
  a.append(
    textElement('span', 'visually-hidden', `${label}: `),
    textElement('span', 'contact-list-text', text),
  );
  li.append(a);
  return li;
}

/** the mail and phone links of a contact: email, phone, email, phone, ...; the surplus follows */
function appendLinks(entries, { emails = [], phones = [] }, { value, icons, labels }) {
  const total = Math.max(emails.length, phones.length);
  for (let i = 0; i < total; i += 1) {
    const email = emails[i];
    if (email) {
      entries.append(contactLink('email', `mailto:${email}`, email, {
        value, icon: icons.email, label: labels.email,
      }));
    }
    const phone = phones[i];
    if (phone) {
      entries.append(contactLink('phone', phone.tel, phone.phone, {
        value, icon: icons.phone, label: labels.phone,
      }));
    }
  }
}

/**
 * Builds a list of independent contact entries.
 * @param {{ region: string, emails?: string[], phones?: { phone: string, tel: string }[],
 *   people?: { name?: string, description?: string, emails: string[],
 *   phones: { phone: string, tel: string }[] }[], row?: Element }[]} contacts with people, each
 *   person with a name or description is an entry of its own (its links below them)
 * @param {Object} options
 * @param {string} options.headingLevel h2-h6, the level of contact labels
 * @param {{ email: string, phone: string }} options.labels the kinds' names (placeholders)
 * @param {{ email: string, phone: string }} options.icons optional authored icons
 * @returns {HTMLUListElement | null} null without contacts
 */
// eslint-disable-next-line import/prefer-default-export
export function buildContactList(contacts, { headingLevel, labels, icons = {} }) {
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
    const options = { value: contact.region, icons, labels };
    if (contact.people) {
      contact.people.forEach((person) => {
        // a person with a name or description: their own entry with the details above the links
        if (!person.name && !person.description) {
          appendLinks(entries, person, options);
          return;
        }
        const entry = document.createElement('li');
        entry.className = 'contact-list-person';
        if (person.name) entry.append(textElement('p', 'contact-list-name', person.name));
        if (person.description) {
          entry.append(textElement('p', 'contact-list-description', person.description));
        }
        const links = document.createElement('ul');
        links.className = 'contact-list-entries';
        appendLinks(links, person, options);
        if (links.children.length) entry.append(links);
        entries.append(entry);
      });
    } else appendLinks(entries, contact, options);
    item.append(entries);
    list.append(item);
  });
  return list;
}
