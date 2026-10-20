import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { hideVisually } from '../../decorators/a11y-decorator.js';
import { createAnimation } from '../../decorators/animation-decorator.js';
import {
  buildAuthorLockup, buildPageActions, buildPublished, buildReadingTime,
} from '../../decorators/article-meta-decorator.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { pictureOf } from '../../decorators/image-decorator.js';
import { announceNewTab, setLinkTarget } from '../../decorators/link-decorator.js';
import { buildStats } from '../../decorators/stats-decorator.js';
import { buildTagList } from '../../decorators/tag-decorator.js';
import { KEY_VALUE_ITEM, itemRows } from '../../utils/cells.js';
import {
  NEW_WINDOW, linkOf, readLinkItems, readLinkRows,
} from '../../utils/links.js';
import { animationLabel, isAnimation } from '../../utils/media.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import {
  isOn, isOnByDefault, optionOf as option, readProperties, textOf,
} from '../../utils/properties.js';
import { readTagValues } from '../../utils/tags.js';
import { resolveTags } from '../../utils/taxonomy.js';

// the new-tab hint of the links (placeholder opensInNewTab), set per decoration
let newTabHint = '';

/*
 * Teaser (blocks/teaser/_teaser.json): a key-value block, one row per property
 * (TCS DS Figma "Text & Image", "2 Slot Section", "Text Section - 2 Columns", "Secondary Page
 * Header", "Careers", "Media Coverage"). Layouts:
 * - Image & Text (default): image and text side by side, image left or right; centered
 *   without an image
 * - Text split (no-image): title (and author) left; description, image (e.g. a chart), stats,
 *   links and short description right; above both the eyebrow and tags, and on the right the
 *   date, reading time and listen / download / share actions (Figma "L3 Header")
 * - Background image: the image behind centered text, under an overlay
 * - Card: a rounded card with the image behind its text, links at the bottom
 * Links are Link items (teaser-link) and stats Stat items (teaser-stat), added with Add; the Links
 * and Stats multifields hold the ones authored before them. The Image type Lotto plays a Lottie
 * animation (.json) instead of a picture. Title Type sets the title's heading level and its size
 * (teaser.css). The Style options (alignment, title weight, description size, eyebrow style, image
 * ratio and corners, link arrow, top spacing, buttons side by side) become block classes.
 */

const LAYOUTS = ['no-image', 'background', 'card'];
const BG_COLORS = ['grey', 'dark', 'dark-green'];
// Image position (Image & Text): beside the text (left, right) or above / below it
const IMAGE_POSITIONS = ['left', 'right', 'top', 'bottom'];
// Text link is stored as tertiary (an empty value isn't delivered: the default style would apply)
const LINK_STYLES = ['list', 'primary', 'secondary', 'tertiary'];
// Style and Image options: property (normalized name) and its values, also block classes
const OPTIONS = {
  textalignment: ['text-left', 'text-center', 'text-right'],
  verticalalignment: ['valign-top', 'valign-middle', 'valign-bottom'],
  imagepositionmobile: ['mobile-image-top', 'mobile-image-bottom'],
  titleweight: ['title-regular', 'title-semibold'],
  descriptionsize: ['text-regular', 'text-large'],
  eyebrowstyle: ['eyebrow-label'],
  topspacing: ['spacing-header'],
  imageratio: ['ratio-8-9', 'ratio-1-1', 'ratio-original'],
  imagecorners: ['square'],
  linkarrow: ['arrow-down-right'],
};

const buildTitle = (props) => buildHeading(props.title, props.titletype, 'teaser-title');

/** a Show toggle that defaults to on: only an authored "false" turns it off */

/** tags (labels from the taxonomy) */
async function buildMeta(props) {
  const meta = document.createElement('div');
  meta.className = 'teaser-meta';
  const tags = isOn(props.displaytags)
    ? buildTagList(await resolveTags(readTagValues(props.tags)), 'teaser-tags') : null;
  if (tags) meta.append(tags);
  return meta.children.length ? meta : null;
}

/** date (with its label), reading time and listen / download / share actions */
function buildInfo(props, t) {
  const info = document.createElement('div');
  info.className = 'teaser-info';
  const prefix = 'teaser';
  const date = isOn(props.showdate) && textOf(props.date)
    ? buildPublished(textOf(props.date), {
      label: textOf(props.datelabel),
      // dd-mm-yyyy | mm-dd-yyyy | mmm-d-yyyy | dd/mm/yy
      format: textOf(props.dateformat).toLowerCase() || 'dd-mm-yyyy',
      prefix,
    }) : null;
  info.append(...[
    date,
    buildReadingTime(textOf(props.readingtime), t, prefix),
    buildPageActions({
      listen: linkOf(props.listenlink),
      download: isOn(props.download),
      share: isOn(props.socialshare),
      title: textOf(props.title) || document.title,
      t,
      prefix,
    }),
  ].filter(Boolean));
  return info.children.length ? info : null;
}

/** the author: image, name and designation */
function buildAuthor(props) {
  return buildAuthorLockup({
    picture: pictureOf(props.authorimage, props.authorimagealt),
    name: textOf(props.authorname) ? fromCell(props.authorname, 'p', 'teaser-author-name') : null,
    designation: textOf(props.authordesignation)
      ? fromCell(props.authordesignation, 'p', 'teaser-author-designation') : null,
    prefix: 'teaser',
  });
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
      if (newWindow) announceNewTab(link, newTabHint);
      li.append(link);
      list.append(li);
      return;
    }
    list = null;
    decorateButton(link, {
      view: 'button', type: style || 'tertiary', newWindow, newTabHint,
    });
    container.append(link);
  });
}

function buildLinks(props, rows, hint) {
  const links = document.createElement('div');
  links.className = 'teaser-links';
  const pending = [];

  const multi = isOn(props.multilinks);
  // Multiple links off: the Primary and Secondary CTA, each in its own Link Style
  const ctas = multi ? [] : [
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
  // Multiple links on: the Links multifield (authored before Link items), in its CTA Link Style
  // (links authored before the style was per link use the former Multi Link Style)
  const fallback = linkStyleOf(props.multilinkstyle);
  const listed = multi ? readLinkItems(props.links).map((item) => ({ ...item, fallback })) : [];
  if (multi && props.links) moveInstrumentation(props.links, links);
  // the Link items, always, after the CTAs or the Links list
  const items = readLinkRows(rows);
  const more = [...listed, ...items.map((item) => ({ ...item, fallback: '' }))].map((item) => ({
    ...item,
    style: item.values.find((value) => LINK_STYLES.includes(value)) || item.fallback,
  }));
  more.forEach(({ link, row }) => { if (row) moveInstrumentation(row, link); });
  const entries = [...ctas, ...more];
  const rendered = new Set(items.map(({ row }) => row));
  pending.push(...buildEditorItems(rows.filter((row) => !rendered.has(row)), hint));

  if (!entries.length && !pending.length) return null;
  if (entries.length) renderLinks(links, entries);
  links.append(...pending);
  return links;
}

/**
 * The image, or for the Image type Lotto a Lottie animation (.json), unless hidden. Behind the
 * text (Background image, Card) an animation fills its box like a cover image.
 */
function buildMedia(block, props, layout) {
  if (isOn(props.hideimage) || !props.image) return null;
  const media = document.createElement('div');
  media.className = 'teaser-media';
  const link = props.image.querySelector('a[href]');
  if (option(block, props.imageformat, ['lottie']) && link && isAnimation(link.href)) {
    const behind = layout === 'background' || layout === 'card';
    // the Image alt text: delivered as the animation link's text (utils/media.js)
    const animation = createAnimation(link.href, {
      label: textOf(props.imagealt) || animationLabel(link),
      className: 'teaser-animation',
      fit: behind ? 'xMidYMid slice' : 'xMidYMid meet',
    });
    media.append(animation, animation.animationToggle);
    return media;
  }
  const picture = pictureOf(props.image, props.imagealt);
  if (!picture) return null;
  media.append(picture);
  return media;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  // Link and Stat items: a Link item has a link
  // (in its first cell: a Stat item starts with an empty tab cell, its label may hold a link)
  const hasLink = (row) => !!row.firstElementChild?.querySelector('a[href]');
  const linkRows = itemRows(block, ['teaser-link'], (row) => KEY_VALUE_ITEM(row) && hasLink(row));
  const statRows = itemRows(block, ['teaser-stat'], (row) => KEY_VALUE_ITEM(row) && !hasLink(row));
  const [t, hint] = await Promise.all([
    getPlaceholders(), editorItemHint([...linkRows, ...statRows]),
  ]);
  newTabHint = t('opensInNewTab', '(opens in a new tab)');
  const layout = option(block, props.classes, LAYOUTS);
  const bgColor = option(block, props.bgcolor, BG_COLORS);
  const authored = toClassName(textOf(props.imageposition));
  const position = IMAGE_POSITIONS.includes(authored) ? authored
    : (IMAGE_POSITIONS.find((name) => block.classList.contains(`image-${name}`)) || 'left');
  const styles = Object.entries(OPTIONS).map(([name, values]) => option(block, props[name], values))
    .filter(Boolean);

  // header: eyebrow, date and tags (the kicker), then the title and View All
  const header = document.createElement('div');
  header.className = 'teaser-header';
  const kicker = document.createElement('div');
  kicker.className = 'teaser-kicker';
  if (isOnByDefault(props.showeyebrow) && textOf(props.eyebrow)) {
    kicker.append(fromCell(props.eyebrow, 'p', 'teaser-eyebrow'));
  }
  const meta = await buildMeta(props);
  if (meta) kicker.append(meta);
  const info = buildInfo(props, t);
  if (info) kicker.append(info);
  if (kicker.children.length) header.append(kicker);

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
  // intro: the title row and the author
  const intro = document.createElement('div');
  intro.className = 'teaser-intro';
  if (headingRow.children.length) intro.append(headingRow);
  const author = buildAuthor(props);
  if (author) intro.append(author);
  if (intro.children.length) header.append(intro);

  // body: description, image (Text split), stats, links, short description
  const body = document.createElement('div');
  body.className = 'teaser-body';
  if (isOnByDefault(props.showdescription) && textOf(props.description)) {
    body.append(fromCell(props.description, 'div', 'teaser-description'));
  }
  const media = buildMedia(block, props, layout);
  if (media && layout === 'no-image') body.append(media);
  const stats = buildStats(props.stats, 'teaser', statRows, hint);
  if (stats) body.append(stats);
  const links = buildLinks(props, linkRows, hint);
  if (links) body.append(links);
  if (textOf(props.shortdescription)) {
    body.append(fromCell(props.shortdescription, 'div', 'teaser-short-description'));
  }

  const content = document.createElement('div');
  content.className = 'teaser-content';
  content.append(...[header, body].filter((part) => part.children.length));

  block.classList.remove(...LAYOUTS, ...BG_COLORS.map((color) => `bg-${color}`));
  if (layout) block.classList.add(layout);
  if (bgColor) block.classList.add(`bg-${bgColor}`);
  block.classList.add(...styles);
  block.classList.toggle('buttons-inline', isOn(props.buttonssidebyside));
  // the image beside, above or below the text (Image & Text) or behind it (Background image, Card)
  const beside = media && layout !== 'no-image';
  const imageText = !!beside && !layout;
  IMAGE_POSITIONS.forEach((name) => block.classList.toggle(`image-${name}`, imageText && position === name && name !== 'left'));
  block.classList.toggle('teaser-has-media', imageText);

  block.replaceChildren(...[beside ? media : null, content].filter(Boolean));
}
