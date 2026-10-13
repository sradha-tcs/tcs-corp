import {
  buildAuthorLockup, buildPageActions, buildPublished, buildReadingTime,
} from '../../decorators/article-meta-decorator.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { pictureOf } from '../../decorators/image-decorator.js';
import { setLinkTarget } from '../../decorators/link-decorator.js';
import { buildImage } from '../../decorators/responsive-image-decorator.js';
import { buildTagList } from '../../decorators/tag-decorator.js';
import { getAuthor } from '../../utils/data.js';
import { NEW_WINDOW, linkOf } from '../../utils/links.js';
import { getPageMetadata } from '../../utils/metadata.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import {
  isOn, optionOf, readProperties, textOf,
} from '../../utils/properties.js';
import { resolveTags } from '../../utils/taxonomy.js';

/*
 * Page Header (blocks/page-header/_page-header.json).
 * From the page's metadata (set on the page or by the locale's bulk metadata sheet): Title,
 * Description, Tags (labels from the locale's taxonomy), publish-date, reading-time,
 * page-type (the layout) and author-id (name, image, designation and LinkedIn from the
 * locale's Authors data sheet). The block's own fields override them: reading time, author
 * name, image and designation. From the block only: CTAs, share / download / listen actions,
 * collection label and image collage. UI text comes from the locale's placeholders.
 * Layouts (Figma "Secondary Page Header" / "L3 Header"):
 * - landing: tags as an eyebrow, large title; description and CTAs (or an image collage)
 * - article: meta row (tags, date, reading time, listen / download / share), title and author;
 *   description and CTAs
 */

const LAYOUTS = ['landing', 'article'];
const LANDING_TEMPLATES = ['landing', 'listing'];
const CTA_STYLES = ['primary', 'secondary'];

/** the layout: the block Style, or the Page Type (landing / listing: landing) */
function layoutOf(block, props, pageType) {
  return optionOf(block, props.classes, LAYOUTS)
    || (LANDING_TEMPLATES.includes(pageType.toLowerCase()) ? 'landing' : 'article');
}

function buildDescription(text) {
  if (!text) return null;
  const el = document.createElement('div');
  el.className = 'page-header-description';
  const p = document.createElement('p');
  p.textContent = text;
  el.append(p);
  return el;
}

function buildMetaRow(props, metadata, tags, t) {
  const row = document.createElement('div');
  row.className = 'page-header-meta-row';

  const labels = document.createElement('div');
  labels.className = 'page-header-labels';
  if (tags) labels.append(tags);
  if (textOf(props.collectionlabel)) {
    labels.append(fromCell(props.collectionlabel, 'p', 'page-header-collection'));
  }

  const info = document.createElement('div');
  info.className = 'page-header-info';
  const prefix = 'page-header';
  info.append(...[
    buildPublished(metadata.publishDate, { label: t('published', 'Published'), prefix }),
    buildReadingTime(textOf(props.readingtime) || metadata.readingTime, t, prefix),
    buildPageActions({
      listen: linkOf(props.listenlink),
      download: isOn(props.download),
      share: isOn(props.socialshare),
      title: metadata.title,
      t,
      prefix,
    }),
  ].filter(Boolean));

  row.append(...[labels, info].filter((part) => part.children.length));
  return row.children.length ? row : null;
}

/** the author name: the block's, the Authors sheet entry's (linked to LinkedIn) or Author */
function buildAuthorName(props, metadata, author) {
  if (textOf(props.authorname)) return fromCell(props.authorname, 'p', 'page-header-author-name');
  const text = author?.name || metadata.author;
  if (!text) return null;
  const name = document.createElement('p');
  name.className = 'page-header-author-name';
  if (author?.linkedin) {
    const a = document.createElement('a');
    a.href = author.linkedin;
    a.textContent = text;
    setLinkTarget(a);
    name.append(a);
  } else {
    name.textContent = text;
  }
  return name;
}

/** the author designation: the block's, or the Authors sheet entry's designation and region */
function buildAuthorDesignation(props, author) {
  if (textOf(props.designationlocation)) {
    return fromCell(props.designationlocation, 'div', 'page-header-author-designation');
  }
  const text = [author?.designation, author?.region].filter(Boolean).join(', ');
  if (!text) return null;
  const el = document.createElement('div');
  el.className = 'page-header-author-designation';
  const p = document.createElement('p');
  p.textContent = text;
  el.append(p);
  return el;
}

function buildAuthor(props, metadata, author) {
  return buildAuthorLockup({
    picture: pictureOf(props.authorimage, props.authorimagealt)
      || buildImage(author?.image ? { src: author.image, alt: '' } : null),
    name: buildAuthorName(props, metadata, author),
    designation: buildAuthorDesignation(props, author),
    prefix: 'page-header',
  });
}

/** a CTA from its link, Link Type and Link Style properties */
function buildCta(cell, targetCell, styleCell, fallbackStyle) {
  const link = linkOf(cell);
  if (!link) return null;
  const style = styleCell ? textOf(styleCell).toLowerCase() : fallbackStyle;
  const type = CTA_STYLES.includes(style) ? style : '';
  return decorateButton(link, {
    view: type ? 'button' : 'link',
    type,
    newWindow: textOf(targetCell) === NEW_WINDOW,
  });
}

function buildCtas(props) {
  const ctas = document.createElement('div');
  ctas.className = 'page-header-ctas';
  ctas.append(...[
    buildCta(props.primarycta, props.primaryctatarget, props.primaryctastyle, 'primary'),
    buildCta(props.secondarycta, props.secondaryctatarget, props.secondaryctastyle, ''),
  ].filter(Boolean));
  return ctas.children.length ? ctas : null;
}

function buildCollage(props) {
  const pictures = [1, 2, 3]
    .map((n) => pictureOf(props[`collageimage${n}`], props[`collageimage${n}alt`]));
  if (!pictures.some(Boolean)) return null;
  const collage = document.createElement('div');
  collage.className = 'page-header-collage';
  pictures.forEach((picture, i) => {
    if (!picture) return;
    const item = document.createElement('div');
    item.className = `page-header-collage-item page-header-collage-item-${i + 1}`;
    item.append(picture);
    collage.append(item);
  });
  return collage;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const props = readProperties(block);
  const metadata = getPageMetadata();
  const [t, pageTags, author] = await Promise.all([
    getPlaceholders(), resolveTags(metadata.tags), getAuthor(metadata.authorId),
  ]);
  const layout = layoutOf(block, props, metadata.pageType);

  const title = document.createElement('h1');
  title.className = 'page-header-title';
  title.textContent = metadata.title;

  const tags = buildTagList(pageTags, 'page-header-tags');
  const description = buildDescription(metadata.description);
  const ctas = buildCtas(props);
  const collage = layout === 'landing' ? buildCollage(props) : null;

  // intro: title side; summary: description side
  const intro = document.createElement('div');
  intro.className = 'page-header-intro';
  const summary = document.createElement('div');
  summary.className = 'page-header-summary';
  summary.append(...[description, ctas].filter(Boolean));

  const parts = [];
  if (layout === 'landing') {
    if (tags) intro.append(tags);
    intro.append(title);
    if (collage) {
      // Figma 637-43570: all text on the left, the collage on the right
      intro.append(...summary.children);
      parts.push(intro, collage);
    } else {
      parts.push(intro, summary);
    }
  } else {
    const metaRow = buildMetaRow(props, metadata, tags, t);
    intro.append(title);
    const authorEl = buildAuthor(props, metadata, author);
    if (authorEl) intro.append(authorEl);
    const columns = document.createElement('div');
    columns.className = 'page-header-columns';
    columns.append(...[intro, summary].filter((part) => part.children.length));
    parts.push(metaRow, columns);
  }

  block.classList.remove(...LAYOUTS);
  block.classList.add(layout);
  block.classList.toggle('page-header-has-collage', !!collage);
  block.replaceChildren(...parts.filter((part) => part && part.children.length));
}
