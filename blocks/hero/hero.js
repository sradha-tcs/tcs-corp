import { moveInstrumentation } from '../../scripts/scripts.js';
import { createAnimation } from '../../decorators/animation-decorator.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';
import { readButtonOptions } from '../../utils/buttons.js';
import { FIELD_ROW_ITEM, itemRows } from '../../utils/cells.js';
import { NEW_WINDOW, readLinkItems, readLinkRows } from '../../utils/links.js';
import { addLegacyMotion } from '../../utils/motion.js';
import { animationLabel, isAnimation } from '../../utils/media.js';
import { getPlaceholders } from '../../utils/placeholders.js';

// the new-tab hint of the links (placeholder opensInNewTab), set per decoration
let newTabHint = '';

/*
 * Hero (blocks/hero/_hero.json). Authored rows, in any order:
 * - content: icon, eyebrow, title (heading) and description (element group "content_")
 * - media: the hero image, or a link to a Lottie animation (.json) for the Lotto image type
 * - CTAs: CTA items (hero-cta, added with Add, a row each after the hero's own rows): CTA Link
 *   and Title, Link Type (new-window), CTA view (primary | secondary), for a Secondary CTA its
 *   BG Color (secondary-bg-light-grey | secondary-bg-black-40) and Border color
 *   (secondary-border-black | secondary-border-white) as classes of the link, and CTA Arrow
 *   (right | down; without one, links to the page's own sections point down). CTAs authored
 *   before, in the CTA List composite multifield, come first: their CTA view is the link's bold
 *   (primary) / italic (secondary) formatting
 * Block options (TCS DS Figma "L1 Header" variations): lottie (Hero Image type Lotto),
 * media-contained (Hero View), motion-fade | motion-slide | motion-zoom (Motion Type authored
 * before the Additional tab's animations, mapped to them),
 * align-top | align-middle | align-bottom (Vertical Alignment),
 * align-left | align-center | align-right (Horizontal Alignment, the content position),
 * text-left | text-center | text-right (Text Alignment, inside the content),
 * bg-light | bg-dark | bg-dark-subtle | bg-black (BG Color),
 * icon-black | icon-white | icon-blue (Icon color: recolours the SVG icon, see tintIcon).
 */

// Motion Type, authored before the Additional tab's animations: its values as those animations
const LEGACY_MOTIONS = {
  'motion-fade': 'motion-fade-in', 'motion-slide': 'motion-fade-up', 'motion-zoom': 'bg-motion-scale',
};
// CTA Arrow values, and every value a CTA List item holds besides its link
const ARROWS = ['right', 'down'];
const CTA_VALUES = [NEW_WINDOW, ...ARROWS];
const CTA_STYLES = ['primary', 'secondary'];
// Secondary CTA BG Color and Border color of a CTA item (only read for a Secondary CTA)
const SECONDARY_OPTIONS = [
  'secondary-bg-light-grey', 'secondary-bg-black-40', 'secondary-border-black', 'secondary-border-white',
];

const HEADINGS = 'h1, h2, h3, h4, h5, h6';
// Icon color values (the colours are in hero.css)
const ICON_COLORS = ['icon-black', 'icon-white', 'icon-blue'];

/**
 * Motion Type authored before: played as the Additional tab's animations (Fade in -> Fade in,
 * Slide up -> Fade up, Zoom -> Background Scale reveal) by decorators/motion-decorator.js
 */
function mapLegacyMotion(block) {
  Object.entries(LEGACY_MOTIONS).forEach(([legacy, motion]) => {
    if (!block.classList.contains(legacy)) return;
    block.classList.remove(legacy);
    addLegacyMotion(block.classList, motion);
  });
}

/** a cell holding only links (and Link Type values): the CTA List */
function isCtaCell(cell) {
  const links = [...cell.querySelectorAll('a[href]')];
  if (!links.length || cell.querySelector(HEADINGS)) return false;
  const linkText = links.map((a) => a.textContent).join('');
  const rest = cell.cloneNode(true);
  rest.querySelectorAll('p, li, div, span').forEach((el) => {
    if (CTA_VALUES.includes(el.textContent.trim())) el.remove();
  });
  const text = rest.textContent.replace(new RegExp(NEW_WINDOW, 'g'), '');
  return text.replace(/\s/g, '') === linkText.replace(/\s/g, '');
}

/** a cell holding only the hero image or an animation link */
function isMediaCell(cell) {
  if (cell.querySelector(HEADINGS)) return false;
  const pictures = cell.querySelectorAll('picture');
  const links = [...cell.querySelectorAll('a[href]')];
  if (pictures.length === 1 && !cell.textContent.trim()) return true;
  return links.length === 1 && isAnimation(links[0].href)
    && cell.textContent.trim() === links[0].textContent.trim();
}

/** sorts the hero's own rows (one cell each) into content, media and CTA List cells */
function readCells(rows) {
  const cells = { content: null, media: null, ctas: null };
  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell) return;
    // media first: an animation link alone would also pass as a CTA List
    if (!cells.media && isMediaCell(cell)) cells.media = cell;
    else if (!cells.ctas && isCtaCell(cell)) cells.ctas = cell;
    else if (!cells.content) cells.content = cell;
    else cells.content.append(...cell.childNodes);
  });
  return cells;
}

function buildMedia(block, cell) {
  if (!cell) return null;
  const media = document.createElement('div');
  media.className = 'hero-media';
  const picture = cell.querySelector('picture');
  const link = cell.querySelector('a[href]');

  if (block.classList.contains('lottie') && link && isAnimation(link.href)) {
    const animation = createAnimation(link.href, { label: animationLabel(link), className: 'hero-animation' });
    media.append(animation);
    // the pause / play button above the overlay and the content, in the block's corner (appended
    // to the block after its content)
    media.animationToggle = animation.animationToggle;
  } else if (picture) {
    // the hero image is the LCP candidate when the hero opens the page
    const img = picture.querySelector('img');
    if (img && block.closest('main > .section:first-of-type')) {
      img.loading = 'eager';
      img.fetchPriority = 'high';
    }
    media.append(picture);
  } else {
    return null;
  }
  return media;
}

/** icon, eyebrow and title come before the heading, the description after it */
function buildContent(cell) {
  const content = document.createElement('div');
  content.className = 'hero-content';
  if (!cell) return content;

  let elements = [...cell.children];
  // a cell that starts with the icon's picture is wrapped in one paragraph by aem.js
  // (wrapTextNodes): read the paragraph's children instead
  if (elements.length === 1 && elements[0].matches('p') && elements[0].children.length > 1
    && elements[0].querySelector(`:scope > :is(${HEADINGS}, p, picture)`)) {
    elements = [...elements[0].children];
  }
  const heading = elements.find((el) => el.matches(HEADINGS));
  const headingIndex = elements.indexOf(heading);
  const description = document.createElement('div');
  description.className = 'hero-description';

  elements.forEach((el, i) => {
    const picture = el.matches('picture') ? el : el.querySelector(':scope > picture');
    const before = headingIndex < 0 || i < headingIndex;
    if (picture && before && !content.querySelector('.hero-icon')
      && !el.textContent.trim()) {
      const icon = document.createElement('div');
      icon.className = 'hero-icon';
      icon.append(picture);
      content.append(icon);
    } else if (el === heading) {
      el.classList.add('hero-title');
      content.append(el);
    } else if (before && headingIndex >= 0 && !content.querySelector('.hero-eyebrow')) {
      el.classList.add('hero-eyebrow');
      content.append(el);
    } else {
      description.append(el);
    }
  });
  if (description.children.length) content.append(description);
  return content;
}

/**
 * Icon color: an SVG shown as an img can't take a CSS colour, so the icon is drawn as a mask
 * over a coloured box (the img stays, invisible, for its size and alternative text). Without
 * an Icon color, or an icon, nothing changes.
 */
function tintIcon(block, content) {
  const icon = content.querySelector('.hero-icon');
  const img = icon?.querySelector('img');
  const src = img?.getAttribute('src');
  if (!src || !ICON_COLORS.some((color) => block.classList.contains(color))) return;
  icon.style.setProperty('--hero-icon-src', `url("${img.src.replace(/["\\]/g, '\\$&')}")`);
  icon.classList.add('hero-icon-tinted');
}

/** the CTAs: the CTA List multifield's, then the CTA items (with their instrumentation) */
function buildCtas(cell, rows, hint) {
  const ctas = document.createElement('div');
  ctas.className = 'hero-ctas';
  const items = readLinkRows(rows);
  [...readLinkItems(cell), ...items].forEach(({
    link: a, newWindow, values, row,
  }) => {
    // CTA view: Primary / Secondary buttons; Default is a text link with an arrow
    const type = row ? values.find((value) => CTA_STYLES.includes(value))
      : readButtonOptions(a).type;
    decorateButton(a, {
      view: 'button',
      type: CTA_STYLES.includes(type) ? type : 'tertiary',
      newWindow,
      newTabHint,
    });
    // a Secondary CTA's background and border colour (kept when the view changes: ignored then)
    if (type === 'secondary') {
      a.classList.add(...values.filter((value) => SECONDARY_OPTIONS.includes(value)));
    }
    const arrow = values.find((value) => ARROWS.includes(value));
    if (arrow === 'down' || (!arrow && a.getAttribute('href').startsWith('#'))) {
      a.classList.add('hero-cta-down');
    }
    if (row) moveInstrumentation(row, a);
    ctas.append(a);
  });
  // in the editor, CTA items without a link yet
  const rendered = new Set(items.map(({ row }) => row));
  ctas.append(...buildEditorItems(rows.filter((row) => !rendered.has(row)), hint));
  return ctas.children.length ? ctas : null;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */

export default async function decorate(block) {
  const ctaRows = itemRows(block, ['hero-cta'], FIELD_ROW_ITEM);
  const cells = readCells([...block.children].filter((row) => !ctaRows.includes(row)));
  // the editor's placeholder text; on the page the hero doesn't wait for anything
  const hint = await editorItemHint(ctaRows);
  // placeholders only when a CTA opens a new tab (the hero is often the LCP); read from the
  // parsed CTAs (decorateBlock has wrapped the cell text in paragraphs)
  const opensNewTab = [...readLinkItems(cells.ctas), ...readLinkRows(ctaRows)]
    .some(({ newWindow }) => newWindow);
  newTabHint = opensNewTab ? (await getPlaceholders())('opensInNewTab', '(opens in a new tab)') : '';
  const media = buildMedia(block, cells.media);
  const content = buildContent(cells.content);
  const ctas = buildCtas(cells.ctas, ctaRows, hint);
  if (ctas) content.append(ctas);
  tintIcon(block, content);
  // keep Universal Editor instrumentation of the authored cells
  if (media) moveInstrumentation(cells.media, media);
  if (cells.content) moveInstrumentation(cells.content, content);
  if (ctas && cells.ctas) moveInstrumentation(cells.ctas, ctas);

  block.classList.toggle('hero-has-media', !!media);
  block.replaceChildren(...[media, content, media?.animationToggle].filter(Boolean));
  mapLegacyMotion(block);
}
