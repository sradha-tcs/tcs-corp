import { moveInstrumentation } from '../../scripts/scripts.js';
import { hideVisually } from '../../decorators/a11y-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { pictureOf } from '../../decorators/image-decorator.js';
import { readMultifieldItems } from '../../utils/multifield.js';
import {
  isOn, optionOf, readProperties, textOf,
} from '../../utils/properties.js';

/*
 * Testimonial (blocks/testimonial/_testimonial.json): a key-value block. A section title,
 * then a centered eyebrow, the testimonial quote (Description), the author and stats
 * (Figma "Testimonial Block").
 */

const BG_COLORS = ['grey'];

/**
 * Reads the Stats composite multifield: items are runs of elements between <hr>s (or list
 * items). The last element of an item is the Stats Value, the ones before it the Stats Title.
 * @returns {{ label: Element[], value: Element }[]}
 */
function readStats(cell) {
  return readMultifieldItems(cell)
    // a list item holds the stat's elements
    .map((item) => (item.length === 1 && item[0].tagName === 'LI' ? [...item[0].children] : item))
    .filter((item) => item.length)
    .map((item) => ({
      label: item.slice(0, -1),
      value: item[item.length - 1],
    }));
}

function buildStats(cell) {
  const stats = readStats(cell);
  if (!stats.length) return null;
  const list = document.createElement('dl');
  list.className = 'testimonial-stats';
  stats.forEach(({ label, value }) => {
    const item = document.createElement('div');
    item.className = 'testimonial-stat';
    const dt = document.createElement('dt');
    dt.className = 'testimonial-stat-label';
    dt.append(...label);
    const dd = document.createElement('dd');
    dd.className = 'testimonial-stat-value';
    dd.append(value);
    // values first visually (larger), labels underneath, keeping dt / dd order for a11y
    item.append(dt, dd);
    list.append(item);
  });
  moveInstrumentation(cell, list);
  return list;
}

function buildAuthor(props) {
  const author = document.createElement('div');
  author.className = 'testimonial-author';
  const picture = pictureOf(props.authorimage, props.authorimagealt);
  if (picture) {
    const image = document.createElement('div');
    image.className = 'testimonial-author-image';
    image.append(picture);
    author.append(image);
  }
  if (textOf(props.designationlocation)) {
    author.append(fromCell(props.designationlocation, 'div', 'testimonial-author-details'));
  }
  return author.children.length ? author : null;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const props = readProperties(block);
  const bgColor = optionOf(block, props.bgcolor, BG_COLORS);

  const title = buildHeading(props.title, props.titletype, 'testimonial-title');
  // Hide Title: kept for screen readers
  if (title && isOn(props.titlehidden)) hideVisually(title);

  const figure = document.createElement('figure');
  figure.className = 'testimonial-quote';
  if (!isOn(props.hideeyebrow) && textOf(props.eyebrow)) {
    figure.append(fromCell(props.eyebrow, 'p', 'testimonial-eyebrow'));
  }
  if (isOn(props.showdescription) && textOf(props.description)) {
    figure.append(fromCell(props.description, 'blockquote', 'testimonial-description'));
  }
  const author = buildAuthor(props);
  if (author) {
    const caption = document.createElement('figcaption');
    caption.append(author);
    figure.append(caption);
  }

  const stats = buildStats(props.stats);

  block.classList.remove(...BG_COLORS.map((color) => `bg-${color}`));
  if (bgColor) block.classList.add(`bg-${bgColor}`);
  block.replaceChildren(...[title, figure.children.length ? figure : null, stats].filter(Boolean));
}
