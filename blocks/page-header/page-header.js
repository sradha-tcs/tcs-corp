import { getMetadata } from '../../scripts/aem.js';
import {
  buildPropertyImage, buildStoryLink, getPageProperties, renderRichText,
} from '../../scripts/page-properties.js';
import { NEW_WINDOW, decorateButton } from '../../decorators/button-decorator.js';
import {
  buildTagList, buildTime, fromCell, optionOf, pictureOf, readProperties, textOf,
} from '../../decorators/block-properties.js';

/*
 * Page Header (blocks/page-header/_page-header.json): built from the page properties
 * (TCS Custom Properties); the block itself only holds what the page has no property for
 * (image collage, second CTA, author name, collection label, listen link).
 * Layouts (Figma "Secondary Page Header" / "L3 Header"):
 * - landing: tags as an eyebrow, large title; description and CTAs (or an image collage)
 * - article: meta row (tags, date, reading time, listen / download / share), title and author;
 *   description and CTAs
 */

const LAYOUTS = ['landing', 'article'];
const LANDING_PAGE_TYPES = ['landing', 'listing'];
const CTA_STYLES = ['primary', 'secondary'];

let statusCount = 0;

/** the layout: the block Style, or the Page Type (Landing / Listing pages: landing) */
function layoutOf(block, props, pageType) {
  return optionOf(block, props.classes, LAYOUTS)
    || (LANDING_PAGE_TYPES.includes(pageType) ? 'landing' : 'article');
}

/** rich text from a page property: HTML is sanitized, plain text is used as is */
async function richText(html, className) {
  const el = document.createElement('div');
  el.className = className;
  if (/<[a-z][\s\S]*>/i.test(html)) el.append(await renderRichText(html));
  else if (html) {
    const p = document.createElement('p');
    p.textContent = html;
    el.append(p);
  }
  return el.children.length ? el : null;
}

function iconButton(label, icon, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.addEventListener('click', onClick);
  return decorateButton(button, {
    view: 'icon', type: 'tertiary', icon, title: label,
  });
}

/** listen (authored link), download (prints / saves as PDF) and share actions */
function buildActions(props, story, title) {
  const actions = document.createElement('div');
  actions.className = 'page-header-actions';
  const status = document.createElement('p');
  status.className = 'page-header-status';
  status.setAttribute('role', 'status');
  statusCount += 1;
  status.id = `page-header-status-${statusCount}`;

  const listen = props.listenlink?.querySelector('a[href]');
  if (listen) {
    listen.textContent = 'Listen to this page';
    decorateButton(listen, { view: 'icon', type: 'tertiary', icon: 'headphones' });
    actions.append(listen);
  }
  if (story.download) {
    actions.append(iconButton('Download this page', 'download', () => window.print()));
  }
  if (story.socialShare) {
    actions.append(iconButton('Share this page', 'share', async () => {
      const url = window.location.href;
      try {
        if (navigator.share) {
          await navigator.share({ title, url });
          return;
        }
        await navigator.clipboard.writeText(url);
        status.textContent = 'Link copied to clipboard';
        setTimeout(() => { status.textContent = ''; }, 3000);
      } catch {
        // share dialog dismissed, or the clipboard is unavailable
      }
    }));
  }
  if (!actions.children.length) return null;
  actions.append(status);
  return actions;
}

function buildMetaRow(props, story, tags, title) {
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
  if (story.publishDate) {
    const date = document.createElement('p');
    date.className = 'page-header-date';
    const time = buildTime(story.publishDate.toISOString(), 'dd/mm/yy', '');
    date.append('Published ', time);
    info.append(date);
  }
  if (story.readingTime) {
    const reading = document.createElement('p');
    reading.className = 'page-header-reading-time';
    reading.textContent = /^\d+$/.test(story.readingTime)
      ? `${story.readingTime} min read` : story.readingTime;
    info.append(reading);
  }
  const actions = buildActions(props, story, title);
  if (actions) info.append(actions);

  row.append(...[labels, info].filter((part) => part.children.length));
  return row.children.length ? row : null;
}

async function buildAuthor(props, author) {
  const el = document.createElement('div');
  el.className = 'page-header-author';
  const image = buildPropertyImage(author.image);
  if (image) {
    const wrapper = document.createElement('div');
    wrapper.className = 'page-header-author-image';
    wrapper.append(image);
    el.append(wrapper);
  }
  const details = document.createElement('div');
  details.className = 'page-header-author-details';
  if (textOf(props.authorname)) details.append(fromCell(props.authorname, 'p', 'page-header-author-name'));
  const designation = await richText(author.designationLocation, 'page-header-author-designation');
  if (designation) details.append(designation);
  if (details.children.length) el.append(details);
  return details.children.length ? el : null;
}

function buildCtas(props) {
  const ctas = document.createElement('div');
  ctas.className = 'page-header-ctas';
  const story = buildStoryLink();
  if (story) ctas.append(story);
  const second = props.secondarycta?.querySelector('a[href]');
  if (second) {
    const style = textOf(props.secondaryctastyle).toLowerCase();
    const type = CTA_STYLES.includes(style) ? style : '';
    decorateButton(second, {
      view: type ? 'button' : 'link',
      type,
      newWindow: textOf(props.secondaryctatarget) === NEW_WINDOW,
    });
    ctas.append(second);
  }
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
  const { pageType, story } = getPageProperties();
  const layout = layoutOf(block, props, pageType);

  const titleText = story.title || getMetadata('og:title') || document.title;
  const title = document.createElement('h1');
  title.className = 'page-header-title';
  title.textContent = titleText;

  const tags = buildTagList(story.tags, 'page-header-tags');
  const description = await richText(
    story.description || getMetadata('description'),
    'page-header-description',
  );
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
    const metaRow = buildMetaRow(props, story, tags, titleText);
    intro.append(title);
    const author = await buildAuthor(props, story.author);
    if (author) intro.append(author);
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
