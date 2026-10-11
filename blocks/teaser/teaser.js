import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { hideVisually } from '../../decorators/a11y-decorator.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildTime } from '../../decorators/date-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { pictureOf } from '../../decorators/image-decorator.js';
import { setLinkTarget } from '../../decorators/link-decorator.js';
import { buildTagList } from '../../decorators/tag-decorator.js';
import { NEW_WINDOW, linkOf, readLinkItems } from '../../utils/links.js';
import {
  isOn, optionOf as option, readProperties, textOf,
} from '../../utils/properties.js';
import { readTags } from '../../utils/tags.js';

/*
 * Teaser (blocks/teaser/_teaser.json): a key-value block, one row per property.
 * Styles: Default (image and content side by side, image left or right; centered without an
 * image) and "No Image, Right Desc & Links" (title left; description, links and short
 * description right). Figma: "2 Slot Section" / "Text & Image" and "Text Section".
 */

const STYLES = ['no-image'];
const BG_COLORS = ['grey', 'dark', 'dark-green'];
const LINK_STYLES = ['list', 'primary', 'secondary'];

const buildTitle = (props) => buildHeading(props.title, props.titletype, 'teaser-title');

function buildMeta(props) {
  const meta = document.createElement('div');
  meta.className = 'teaser-meta';
  const date = textOf(props.date);
  if (isOn(props.showdate) && date) {
    meta.append(buildTime(date, toClassName(textOf(props.dateformat)), 'teaser-date'));
  }
  const tags = isOn(props.displaytags) ? buildTagList(readTags(props.tags), 'teaser-tags') : null;
  if (tags) meta.append(tags);
  return meta.children.length ? meta : null;
}

/**
 * A Link Style value: Default ("") | list | primary | secondary. A missing row falls back to
 * the model default; an empty row is Default.
 */
function linkStyleOf(cell, fallback = '') {
  if (!cell) return fallback;
  const value = toClassName(textOf(cell));
  return LINK_STYLES.includes(value) ? value : '';
}

/**
 * Renders links in their Link Style: Default text links with an arrow, Primary / Secondary
 * Button buttons, or List rows with dividers (consecutive List links share one list; links
 * opening a new window point up and right).
 * @param {Element} container
 * @param {{ link: HTMLAnchorElement, newWindow: boolean, style: string }[]} entries
 */
function renderLinks(container, entries) {
  let list = null;
  entries.forEach(({ link, newWindow, style }) => {
    if (style === 'list') {
      if (!list) {
        list = document.createElement('ul');
        list.className = 'teaser-link-list';
        container.append(list);
      }
      const li = document.createElement('li');
      link.className = 'teaser-link-list-item';
      setLinkTarget(link, newWindow);
      li.append(link);
      list.append(li);
      return;
    }
    list = null;
    decorateButton(link, { view: 'button', type: style || 'tertiary', newWindow });
    container.append(link);
  });
  const styles = [...new Set(entries.map(({ style }) => style || 'default'))];
  container.classList.add(styles.length === 1 ? `teaser-links-${styles[0]}` : 'teaser-links-mixed');
}

function buildLinks(props) {
  const links = document.createElement('div');
  links.className = 'teaser-links';
  let entries;

  if (isOn(props.multilinks)) {
    // MultiLinks: the Links multifield, all in the Multi Link Style
    const style = linkStyleOf(props.multilinkstyle);
    entries = readLinkItems(props.links).map((item) => ({ ...item, style }));
    if (props.links) moveInstrumentation(props.links, links);
  } else {
    // Primary and Secondary CTA, each in its own Link Style
    entries = [
      [props.primarycta, props.primaryctatarget, props.primaryctastyle, 'primary'],
      [props.secondarycta, props.secondaryctatarget, props.secondaryctastyle, 'secondary'],
    ].map(([cell, target, style, fallback]) => {
      const link = linkOf(cell);
      if (link) moveInstrumentation(cell, link);
      return link && {
        link,
        newWindow: textOf(target) === NEW_WINDOW,
        style: linkStyleOf(style, fallback),
      };
    }).filter(Boolean);
  }

  if (!entries.length) return null;
  renderLinks(links, entries);
  return links;
}

function buildImage(block, props) {
  if (option(block, props.classes, STYLES) === 'no-image' || isOn(props.hideimage)) return null;
  const picture = pictureOf(props.image, props.imagealt);
  if (!picture) return null;
  const media = document.createElement('div');
  media.className = 'teaser-media';
  media.append(picture);
  return media;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const props = readProperties(block);
  const style = option(block, props.classes, STYLES);
  const bgColor = option(block, props.bgcolor, BG_COLORS);
  const imageRight = toClassName(textOf(props.imageposition)) === 'right'
    || block.classList.contains('image-right');

  // header: eyebrow, date and tags, title and View All
  const header = document.createElement('div');
  header.className = 'teaser-header';
  if (isOn(props.showeyebrow) && textOf(props.eyebrow)) {
    header.append(fromCell(props.eyebrow, 'p', 'teaser-eyebrow'));
  }
  const meta = buildMeta(props);
  if (meta) header.append(meta);

  const headingRow = document.createElement('div');
  headingRow.className = 'teaser-heading-row';
  const title = buildTitle(props);
  if (title) {
    // Hide Title: kept for screen readers
    if (isOn(props.titlehidden)) hideVisually(title);
    headingRow.append(title);
  }
  const viewAll = linkOf(props.viewall);
  if (viewAll) {
    decorateButton(viewAll, { view: 'button', type: 'primary' });
    viewAll.classList.add('teaser-view-all');
    moveInstrumentation(props.viewall, viewAll);
    headingRow.append(viewAll);
  }
  if (headingRow.children.length) header.append(headingRow);

  // body: description, links, short description
  const body = document.createElement('div');
  body.className = 'teaser-body';
  if (isOn(props.showdescription) && textOf(props.description)) {
    body.append(fromCell(props.description, 'div', 'teaser-description'));
  }
  const links = buildLinks(props);
  if (links) body.append(links);
  if (textOf(props.shortdescription)) {
    body.append(fromCell(props.shortdescription, 'div', 'teaser-short-description'));
  }

  const content = document.createElement('div');
  content.className = 'teaser-content';
  content.append(...[header, body].filter((part) => part.children.length));

  const media = style === 'no-image' ? null : buildImage(block, props);

  block.classList.remove(...STYLES, ...BG_COLORS.map((color) => `bg-${color}`));
  if (style) block.classList.add(style);
  if (bgColor) block.classList.add(`bg-${bgColor}`);
  block.classList.toggle('image-right', !!media && imageRight);
  block.classList.toggle('teaser-has-media', !!media);
  if (isOn(props.personalization)) {
    // marker for a personalization script (e.g. Adobe Target); no visible change
    block.classList.add('personalization');
    block.dataset.personalization = 'true';
  }

  block.replaceChildren(...[media, content].filter(Boolean));
}
