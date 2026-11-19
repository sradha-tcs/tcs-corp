import { buildContactList } from '../../decorators/contact-list-decorator.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';
import { buildHeading, HEADINGS } from '../../decorators/heading-decorator.js';
import { itemRows, KEY_VALUE_ITEM } from '../../utils/cells.js';
import { getMediaContacts } from '../../utils/data.js';
import { isAuthor, isEditing } from '../../utils/environment.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { isOnByDefault, readProperties, textOf } from '../../utils/properties.js';
import { readTagValues } from '../../utils/tags.js';
import {
  directoryGroups, isCompleteContact, readContactRows, showContacts, telHref,
} from './media-contacts-data.js';

const TITLE_COLORS = ['title-black', 'title-dark', 'title-white', 'title-light-blue'];
const COLOR_VARIANTS = ['black', 'dark', 'brand', 'light-blue'];
const COLUMN_VARIANTS = ['1', '2', '3'];

function iconUrl(cell) {
  const image = cell?.querySelector('img');
  return image?.currentSrc || image?.src || '';
}

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

/** the authored Contacts sheet (a page picker: a link, or its path as text), else '' */
const sheetPathOf = (cell) => cell?.querySelector('a[href]')?.getAttribute('href') || textOf(cell);

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const rows = itemRows(block, ['media-contact'], KEY_VALUE_ITEM);
  const contacts = readContactRows(rows);
  // the sheet's contacts unless turned off (on for blocks authored before the option); both
  // kinds shown unless turned off
  const fromSheet = isOnByDefault(props.showdirectory);
  const show = { emails: isOnByDefault(props.showemails), phones: isOnByDefault(props.showphones) };
  const sheet = fromSheet ? getMediaContacts(sheetPathOf(props.contactssheet)) : [];
  const [t, itemHint, sheetRows] = await Promise.all([
    getPlaceholders(), editorItemHint(rows), sheet,
  ]);
  const pending = buildEditorItems(contacts.filter((contact) => !isCompleteContact(contact))
    .map(({ row }) => row), itemHint, 'li');
  const directory = directoryGroups(sheetRows, { groups: readTagValues(props.contactgroups) });
  const entries = showContacts([...directory, ...contacts.filter(isCompleteContact)], show)
    .map((contact) => ({
      ...contact,
      phones: contact.phones.map((phone) => ({ phone, tel: telHref(phone) })),
    }));
  const titleColor = textOf(props.titlecolor);
  if (TITLE_COLORS.includes(titleColor)) block.classList.add(titleColor);
  const columns = textOf(props.columns);
  block.classList.add(`contact-columns-${COLUMN_VARIANTS.includes(columns) ? columns : '2'}`);
  [
    ['regioncolor', 'region-color'],
    ['emailcolor', 'email-color'],
    ['phonecolor', 'phone-color'],
  ].forEach(([property, classPrefix]) => {
    const color = textOf(props[property]);
    if (COLOR_VARIANTS.includes(color)) block.classList.add(`${classPrefix}-${color}`);
  });
  const heading = headingOf(props, t);
  const level = Number(heading.tagName.slice(1));
  const list = buildContactList(entries, {
    headingLevel: `h${Math.min(level + 1, 6)}`,
    labels: { email: t('email', 'Email'), phone: t('phone', 'Phone') },
    icons: block.classList.contains('hideicons') ? {} : {
      email: iconUrl(props.emailicon),
      phone: iconUrl(props.phoneicon),
    },
  });
  block.hidden = false;
  block.parentElement?.removeAttribute('hidden');
  if (list || pending.length) {
    const content = list || document.createElement('ul');
    content.className = 'contact-list';
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
  hint.textContent = t('mediaContactsAuthorHint', 'No contacts to show: check Contact groups against the Media Contacts sheet, turn on Show email addresses or Show phone numbers, or add Media Contact entries with a heading and at least one email or phone.');
  block.replaceChildren(heading, hint);
}
