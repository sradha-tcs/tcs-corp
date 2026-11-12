import { buildContactGroups } from '../../decorators/contact-list-decorator.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';
import { buildHeading, HEADINGS } from '../../decorators/heading-decorator.js';
import { itemRows, KEY_VALUE_ITEM } from '../../utils/cells.js';
import { isAuthor, isEditing } from '../../utils/environment.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { readProperties, textOf } from '../../utils/properties.js';
import {
  groupContacts, isCompleteContact, readContactRows, telHref,
} from './media-contacts-data.js';

/** the heading: the authored Title, else the placeholder, at the Title Type's level */
function headingOf(props, t) {
  const authored = buildHeading(props.title, props.titletype, 'media-contacts-title');
  if (authored) return authored;
  const level = textOf(props.titletype).toLowerCase();
  const heading = document.createElement(HEADINGS.includes(level) ? level : 'h2');
  heading.className = 'media-contacts-title';
  heading.textContent = t('mediaContacts', 'Media contacts');
  return heading;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const rows = itemRows(block, ['media-contact'], KEY_VALUE_ITEM);
  const contacts = readContactRows(rows);
  const [t, itemHint] = await Promise.all([getPlaceholders(), editorItemHint(rows)]);
  const pending = buildEditorItems(contacts.filter((contact) => !isCompleteContact(contact))
    .map(({ row }) => row), itemHint, 'li');
  const groups = groupContacts(contacts.filter(isCompleteContact)).map((group) => ({
    ...group,
    contacts: group.contacts.map((contact) => ({
      ...contact,
      phones: contact.phones.map((phone) => ({ phone, tel: telHref(phone) })),
    })),
  }));
  const heading = headingOf(props, t);
  const level = Number(heading.tagName.slice(1));
  const list = buildContactGroups(groups, {
    headingLevel: `h${Math.min(level + 1, 6)}`,
    labels: { email: t('email', 'Email'), phone: t('phone', 'Phone') },
  });
  block.hidden = false;
  block.parentElement?.removeAttribute('hidden');
  if (list || pending.length) {
    const content = list || document.createElement('ul');
    content.className = 'contact-list-groups';
    content.append(...pending);
    block.replaceChildren(heading, content);
    return;
  }
  if (!isEditing() && !isAuthor()) {
    block.replaceChildren();
    block.hidden = true;
    block.parentElement?.setAttribute('hidden', '');
    return;
  }
  const hint = document.createElement('p');
  hint.className = 'media-contacts-empty';
  hint.textContent = t('mediaContactsAuthorHint', 'Add Media Contact items, then enter a country or territory and an email address or phone number.');
  block.replaceChildren(heading, hint);
}
