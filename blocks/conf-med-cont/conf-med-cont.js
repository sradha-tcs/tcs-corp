import { buildContactList } from '../../decorators/contact-list-decorator.js';
import { HEADINGS } from '../../decorators/heading-decorator.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { getConfMedCont } from '../../utils/data.js';
import { isAuthor, isEditing } from '../../utils/environment.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { readProperties, textOf, textSource } from '../../utils/properties.js';
import { findConfig, regionGroups, unknownOrderEntries } from './conf-med-cont-data.js';

/** the two title styles of Media contacts title type (an H2 in their style) */
const TITLE_STYLES = ['media-contacts-big-title', 'media-contacts-small-title'];

/**
 * The title: Media contacts title (else the placeholder), at its title type's level, or an H2 in
 * the big or small title style.
 */
function headingOf(props, t) {
  const type = textOf(props.mediacontactstitletype).toLowerCase();
  const level = HEADINGS.includes(type) ? type : 'h2';
  const heading = document.createElement(level);
  heading.className = 'conf-med-cont-title';
  if (TITLE_STYLES.includes(type)) heading.classList.add(type);
  const cell = props.mediacontactstitle;
  if (textOf(cell)) {
    const source = textSource(cell);
    heading.append(...source.childNodes);
    moveInstrumentation(source, heading);
    moveInstrumentation(cell, heading);
  } else heading.textContent = t('mediaContacts', 'Media contacts');
  return heading;
}

/** a hint for authors (Universal Editor and author preview only) */
function hint(text) {
  const p = document.createElement('p');
  p.className = 'conf-med-cont-hint';
  p.textContent = text;
  return p;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const id = textOf(props.mediacontactsid);
  const [t, sheets] = await Promise.all([getPlaceholders(), getConfMedCont()]);
  const heading = headingOf(props, t);
  const config = findConfig(sheets.configs, id);
  const { groups, missing } = regionGroups(config, sheets);
  // the region names one level below the title
  const level = Math.min(Number(heading.tagName.slice(1)) + 1, 6);
  const regions = groups.map((group) => ({ region: group.name, people: group.people }));
  const list = buildContactList(regions, {
    headingLevel: `h${level}`,
    labels: { email: t('email', 'Email'), phone: t('phone', 'Phone') },
  });
  // two columns from 900px filled column by column (the order reads down the first column, then
  // the second): the rows of the first column, half the regions rounded up
  if (list) {
    list.classList.add('contact-list-by-column');
    list.style.setProperty('--conf-med-cont-rows', String(Math.ceil(regions.length / 2)));
  }
  const author = isEditing() || isAuthor();
  const hints = [];
  if (author && !config) {
    hints.push(hint(id
      ? t('confMedContUnknownId', 'No row of the media-contacts-config sheet has this Media contacts ID.')
      : t('confMedContEditorHint', 'Enter the Media contacts ID of a row of the media-contacts-config sheet.')));
  }
  if (author && config && missing.length) {
    hints.push(hint(`${t('confMedContMissing', 'Not in the contacts or regions sheet')}: ${missing.join(', ')}`));
  }
  // order_contacts entries that name no region column of the row (the others are still ordered)
  const unknownOrder = author && config ? unknownOrderEntries(config) : [];
  if (unknownOrder.length) {
    hints.push(hint(`${t('confMedContUnknownOrder', 'order_contacts names no region of this row')}: ${unknownOrder.join(', ')}`));
  }
  if (list || hints.length) {
    block.replaceChildren(heading, ...(list ? [list] : []), ...hints);
    return;
  }
  // nothing to show on the published page
  block.replaceChildren();
  block.hidden = true;
  block.parentElement?.setAttribute('hidden', '');
}
