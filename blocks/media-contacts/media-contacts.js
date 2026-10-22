import { buildContactGroups } from '../../decorators/contact-list-decorator.js';
import { buildHeading, HEADINGS } from '../../decorators/heading-decorator.js';
import { bone, renderWhenLoaded, skeletonElement } from '../../decorators/skeleton-decorator.js';
import { getMediaContacts, inRegion } from '../../utils/data.js';
import { isAuthor, isEditing } from '../../utils/environment.js';
import { getPageMetadata } from '../../utils/metadata.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { readProperties, textOf } from '../../utils/properties.js';
import { groupContacts, telHref } from './media-contacts-data.js';

/*
 * Media Contacts (blocks/media-contacts/_media-contacts.json): a key-value block (Title, Title
 * Type and the Additional tab). The contacts come from the locale's Media Contacts data sheet
 * (utils/data.js getMediaContacts): those of the page's region (metadata `region`), else all of
 * them, grouped by designation and region (./media-contacts-data.js), each group's e-mail
 * addresses and phone numbers one below the other. Without contacts the block is hidden on the
 * page and says where they come from in Universal Editor.
 */

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

/** a skeleton of two groups while the sheet loads */
function skeleton() {
  const list = skeletonElement('contact-list-groups');
  [0, 1].forEach(() => {
    const group = skeletonElement('contact-list-group');
    group.append(bone('title', 'short'), bone('line'), bone('line', 'short'));
    list.append(group);
  });
  return list;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const data = Promise.all([getMediaContacts(), getPlaceholders()]);
  await renderWhenLoaded(block, {
    data,
    skeleton,
    render: ([contacts, t]) => {
      const regional = inRegion(contacts, getPageMetadata().region);
      const groups = groupContacts(regional.length ? regional : contacts).map((group) => ({
        ...group,
        contacts: group.contacts.map((contact) => ({ ...contact, tel: telHref(contact.phone) })),
      }));
      const heading = headingOf(props, t);
      const level = Number(heading.tagName.slice(1));
      const list = buildContactGroups(groups, {
        headingLevel: `h${Math.min(level + 1, 6)}`,
        labels: { email: t('email', 'Email'), phone: t('phone', 'Phone') },
      });
      if (list) {
        block.replaceChildren(heading, list);
        return;
      }
      // no contacts: hidden on the page; in the editor (and on AEM author) a hint
      if (!isEditing() && !isAuthor()) {
        block.replaceChildren();
        block.hidden = true;
        block.parentElement?.setAttribute('hidden', '');
        return;
      }
      const hint = document.createElement('p');
      hint.className = 'media-contacts-empty';
      hint.textContent = t('mediaContactsEditorHint', 'The contacts come from the Media Contacts sheet (data/media-contacts), which has none for this page yet.');
      block.replaceChildren(heading, hint);
    },
  });
}
