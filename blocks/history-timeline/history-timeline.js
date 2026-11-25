import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import { pictureOf } from '../../decorators/image-decorator.js';
import { createScroller } from '../../decorators/scroller-decorator.js';
import {
  KEY_VALUE_ITEM, itemRows, matchCells, withoutTabCells,
} from '../../utils/cells.js';
import { uniqueId } from '../../utils/ids.js';
import { linkOf } from '../../utils/links.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { isOn, readProperties, textOf } from '../../utils/properties.js';

/*
 * History Timeline (blocks/history-timeline/_history-timeline.json; TCS Figma "Match · History
 * timeline"): a key-value block whose Milestone items (history-timeline-item) are laid out as a
 * horizontal strip of cards (year, title, description, image, optional CTA), closed by a
 * "The story continues" panel (Closing panel). A line between the Start and End labels (by default
 * the first and the last milestone's year) shows how far the strip has scrolled; previous / next
 * buttons, the keyboard and mouse dragging move it
 * (decorators/scroller-decorator.js).
 */

/*
 * The Milestone item is delivered as positional cells: the dialog tab, then a cell per field
 * (the image alt text and the CTA text collapse into the image and link cells)
 */
const MILESTONE_LAYOUT = [null, 'year', 'title', 'description', 'image', 'link'];
const MILESTONE_FIELDS = MILESTONE_LAYOUT.filter(Boolean);

const hasMedia = (cell) => !!cell.querySelector('picture, img');
const linkOnly = (cell) => {
  const a = cell.querySelector('a[href]');
  return !!a && a.textContent.trim() === cell.textContent.trim();
};
const LINE = (cell) => !hasMedia(cell) && !cell.querySelector('a[href]')
  && cell.querySelectorAll('p').length <= 1;
const MATCHERS = {
  year: LINE,
  title: LINE,
  description: (cell) => !hasMedia(cell) && !linkOnly(cell),
  image: hasMedia,
  link: linkOnly,
};

/** a Milestone's year: a <time> for a calendar year, else (e.g. Today) the text */
function buildYear(cell) {
  const year = fromCell(cell, 'p', 'history-timeline-year');
  const value = year.textContent.trim();
  if (/^\d{4}$/.test(value)) {
    const time = document.createElement('time');
    time.dateTime = value;
    time.append(...year.childNodes);
    year.append(time);
  }
  return year;
}

/**
 * The card of a Milestone row, or null while it has no content (just added in the editor).
 * @param {Element} row
 * @param {Element} levelCell the block's Milestone heading level
 * @returns {{ item: HTMLLIElement, year: string } | null}
 */
function buildMilestone(row, levelCell) {
  const cells = withoutTabCells([...row.children], MILESTONE_LAYOUT);
  const matched = matchCells(cells, MILESTONE_FIELDS, MATCHERS);
  const picture = pictureOf(matched.image);
  if (!['year', 'title', 'description'].some((field) => textOf(matched[field])) && !picture) {
    return null;
  }

  const item = document.createElement('li');
  item.className = 'history-timeline-item';
  moveInstrumentation(row, item);

  const text = document.createElement('div');
  text.className = 'history-timeline-text';
  const year = textOf(matched.year);
  if (year) text.append(buildYear(matched.year));
  const content = document.createElement('div');
  content.className = 'history-timeline-content';
  const title = buildHeading(matched.title, levelCell, 'history-timeline-title', 'h3');
  if (title) content.append(title);
  if (textOf(matched.description)) {
    content.append(fromCell(matched.description, 'div', 'history-timeline-description'));
  }
  const link = linkOf(matched.link);
  if (link) {
    const cta = document.createElement('p');
    cta.className = 'history-timeline-cta';
    decorateButton(link, { view: 'link' });
    link.dataset.cmpInteraction = 'cta';
    moveInstrumentation(matched.link, link);
    cta.append(link);
    content.append(cta);
  }
  if (content.children.length) text.append(content);
  if (text.children.length) item.append(text);

  if (picture) {
    const media = document.createElement('div');
    media.className = 'history-timeline-media';
    media.append(picture);
    item.append(media);
  }
  return { item, year };
}

/** a year row label: the authored Start / End label, else the milestone's year */
function buildLabel(cell, fallback) {
  if (textOf(cell)) return fromCell(cell, 'span', 'history-timeline-label');
  const label = document.createElement('span');
  label.className = 'history-timeline-label';
  label.textContent = fallback;
  return label;
}

/**
 * The year row: the start and end labels (by default the first and the last milestone's year),
 * joined by the progress line; none without both labels.
 */
function buildHeader(props, years) {
  const first = years[0] || '';
  const last = years.length > 1 ? years[years.length - 1] : '';
  if (!(textOf(props.startlabel) || first) || !(textOf(props.endlabel) || last)) return {};
  const header = document.createElement('div');
  header.className = 'history-timeline-header';
  // visual only: the list and the buttons give the same information
  header.setAttribute('aria-hidden', 'true');
  const line = document.createElement('span');
  line.className = 'history-timeline-line';
  const progress = document.createElement('span');
  progress.className = 'history-timeline-progress';
  line.append(progress);
  header.append(buildLabel(props.startlabel, first), line, buildLabel(props.endlabel, last));
  return { header, line };
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const rows = itemRows(block, ['history-timeline-item'], KEY_VALUE_ITEM);
  const [t, hint] = await Promise.all([getPlaceholders(), editorItemHint(rows)]);

  const milestones = [];
  const pending = [];
  rows.forEach((row) => {
    const milestone = buildMilestone(row, props.headinglevel);
    if (milestone) milestones.push(milestone);
    else pending.push(row);
  });

  const viewport = document.createElement('div');
  viewport.className = 'history-timeline-viewport';
  viewport.id = uniqueId('history-timeline-viewport');
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', t('historyTimeline', 'History timeline'));
  const track = document.createElement('div');
  track.className = 'history-timeline-track';
  const list = document.createElement('ol');
  list.className = 'history-timeline-list';
  list.append(...milestones.map(({ item }) => item), ...buildEditorItems(pending, hint, 'li'));
  track.append(list);
  if (!isOn(props.hideclosing)) {
    let closing;
    if (textOf(props.closinglabel)) {
      closing = fromCell(props.closinglabel, 'p', 'history-timeline-closing');
    } else {
      closing = document.createElement('p');
      closing.className = 'history-timeline-closing';
      closing.textContent = t('historyTimelineEnd', 'The story continues');
    }
    track.append(closing);
  }
  viewport.append(track);

  const years = milestones.map(({ year }) => year).filter(Boolean);
  const { header, line } = buildHeader(props, years);

  const controls = document.createElement('div');
  controls.className = 'history-timeline-controls';
  const previous = createIconButton({
    label: t('historyTimelinePrevious', 'Previous milestones'), icon: 'chevron-left', className: 'history-timeline-previous',
  });
  const next = createIconButton({
    label: t('historyTimelineNext', 'Next milestones'), icon: 'chevron-right', className: 'history-timeline-next',
  });
  [previous, next].forEach((button) => button.setAttribute('aria-controls', viewport.id));
  previous.dataset.cmpInteraction = 'previous';
  next.dataset.cmpInteraction = 'next';
  controls.append(previous, next);

  // the progress line fills one milestone's share at the start and all of it at the end
  block.style.setProperty('--history-timeline-count', String(Math.max(milestones.length, 1)));
  block.replaceChildren(...[header, viewport, controls].filter(Boolean));
  createScroller(viewport, {
    list, previous, next, indicator: line,
  });
}
