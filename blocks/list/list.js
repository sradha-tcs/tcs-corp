import { createHiddenText } from '../../decorators/a11y-decorator.js';
import { buildAuthorLockup } from '../../decorators/article-meta-decorator.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import { setLinkTarget } from '../../decorators/link-decorator.js';
import { buildImage } from '../../decorators/responsive-image-decorator.js';
import { createScroller } from '../../decorators/scroller-decorator.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { pushComponentEvent, pushComponents } from '../../utils/analytics.js';
import { readButtonOptions } from '../../utils/buttons.js';
import { matchCells } from '../../utils/cells.js';
import { getAuthors } from '../../utils/data.js';
import { isEditing } from '../../utils/environment.js';
import { uniqueId } from '../../utils/ids.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { normalizeKey, textOf } from '../../utils/properties.js';
import { getPages } from '../../utils/query-index.js';
import { loadRedirects, resolveRedirect } from '../../utils/redirects.js';
import { toPublishedPath } from '../../utils/site.js';
import { readTagValues } from '../../utils/tags.js';
import { resolveTags } from '../../utils/taxonomy.js';
import {
  BREAKPOINTS, HEADINGS, buildCards, kindOf, normalizeConfig, normalizePath, validateConfig,
} from './list-data.js';

/*
 * List (blocks/list/_list.json): the AEM Core List component for Edge Delivery Services, with
 * the TCS DS Figma List variations as its presentation. Sources: child pages of a page, a fixed
 * list of pages and links (List Item children, with overrides) or pages with tags; pages and
 * their metadata come from the query index, redirects from the redirects sheets (no repository
 * queries in the browser). Cards (image, panel, report, statistic, feature) or a list of links;
 * grid or horizontal scroll independently on desktop (>= 1200px), tablet (600-1199px) and
 * mobile (< 600px), with optional previous / next buttons, scroll indicator, drag and keyboard
 * scrolling. Card clicks and scrolling go to the Adobe Data Layer. The data side is
 * ./list-data.js; lists made before (a title and a CTA only) render as they did.
 */

const ITEM_FIELDS = ['link', 'headline', 'summary', 'image', 'eyebrow', 'tags', 'subtitle', 'ctaLabel',
  'newTab', 'analyticsLabel', 'ariaLabel', 'kind', 'theme'];
const TEXT_CELL = (cell) => !cell.querySelector('a[href], picture, img');
const ITEM_MATCHERS = {
  link: (cell) => !!cell.querySelector('a[href]'),
  image: (cell) => !!cell.querySelector('picture, img'),
  newTab: (cell) => /^(true|false)$/i.test(textOf(cell)),
  kind: (cell) => /^(image|panel|report|stat)$/i.test(textOf(cell)),
  theme: (cell) => /^(dark|navy|brand|brand-light|grey|mid-grey|gradient|image)$/i.test(textOf(cell)),
};
['headline', 'summary', 'eyebrow', 'tags', 'subtitle', 'ctaLabel', 'analyticsLabel', 'ariaLabel']
  .forEach((field) => { ITEM_MATCHERS[field] = TEXT_CELL; });

/** the block's property names (normalized), to tell property rows from item rows */
const PROPERTIES = new Set(['title', 'titletype', 'description', 'link', 'linktext', 'linktype',
  'listlabel', 'componentid', 'source', 'parentpath', 'parentusecurrentpage', 'directchildrenonly',
  'childdepth', 'rootpath', 'tagsusecurrentpage', 'tags', 'tagmatch', 'includedescendants',
  'maxdepth', 'orderby', 'sortorder', 'maxitems', 'displayasteaser', 'cardstyle', 'cardtheme',
  'imageratio', 'panelheight', 'featurefirst', 'linkitems', 'openinnewtab', 'showimage',
  'showeyebrow', 'showtags', 'showdescription', 'showdate', 'dateformat', 'showcta', 'imageloading',
  ...BREAKPOINTS.flatMap((bp) => ['mode', 'columns', 'gap', 'visible', 'cardwidth', 'controls', 'indicator']
    .map((key) => `${bp}${key}`)),
  'equalheight', 'stretchcards', 'scrollsnap', 'snapalign', 'hidescrollbar', 'mousedrag',
  'touchswipe', 'keyboardscrolling', 'scrollstep', 'loop', 'initialindex', 'edgepadding',
  'reducedmotion', 'emptybehavior', 'emptymessage', 'analyticsenabled', 'classes']);
const PATH_PROPERTIES = ['parentpath', 'rootpath'];
const LIST_PROPERTIES = ['tags', 'classes'];
const STYLE_OPTIONS = ['stat-compact', 'dividers', 'header-center'];
const MAX_CARD_TAGS = 3;
const IMAGE_BREAKPOINTS = [{ media: '(min-width: 600px)', width: '750' }, { width: '600' }];
const FEATURE_BREAKPOINTS = [{ media: '(min-width: 900px)', width: '1600' }, { width: '750' }];
const debug = (...args) => {
  if (/[?&]debug=list\b/.test(window.location.search)) console.debug('[list]', ...args); // eslint-disable-line no-console
};

const element = (tagName, className, content) => {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  if (content) el.textContent = content;
  return el;
};

/** a published page path from an aem-content value (a link or a path) */
function pathOf(cell) {
  const href = cell?.querySelector('a[href]')?.getAttribute('href') || textOf(cell);
  if (!href) return '';
  const path = /^https?:/i.test(href) ? new URL(href).pathname : href;
  return normalizePath(toPublishedPath(path));
}

/**
 * Reads the block: property rows (key | value), List Item rows and, for lists made before the
 * key-value model, the title and CTA rows.
 * @param {Element} block
 */
export function readBlockConfig(block) {
  const rows = [...block.children];
  const props = {};
  const itemRows = [];
  rows.forEach((row) => {
    const model = row.dataset.aueModel;
    const cells = [...row.children];
    const key = cells.length === 2 ? normalizeKey(cells[0].textContent) : '';
    if (model === 'list-item' || (!model && !PROPERTIES.has(key))) itemRows.push(row);
    else if (key) [, props[key]] = cells;
  });
  const legacy = !Object.keys(props).length && rows.every((row) => row.children.length <= 1);
  const raw = {};
  Object.entries(props).forEach(([key, cell]) => {
    if (PATH_PROPERTIES.includes(key)) raw[key] = pathOf(cell);
    else if (LIST_PROPERTIES.includes(key)) raw[key] = readTagValues(cell).join(',');
    else raw[key] = textOf(cell);
  });
  const items = legacy ? [] : itemRows.map((row) => {
    const cells = matchCells([...row.children], ITEM_FIELDS, ITEM_MATCHERS);
    const a = cells.link?.querySelector('a[href]');
    const href = a?.getAttribute('href') || '';
    const img = cells.image?.querySelector('img');
    const get = (field) => textOf(cells[field]);
    return {
      href,
      linkText: a && a.textContent.trim() !== href ? a.textContent.trim() : '',
      title: get('headline'),
      description: get('summary'),
      image: img?.getAttribute('src') || '',
      imageAlt: img?.getAttribute('alt') || '',
      picture: cells.image?.querySelector('picture') || null,
      eyebrow: get('eyebrow'),
      tags: readTagValues(cells.tags),
      subtitle: get('subtitle'),
      ctaLabel: get('ctaLabel'),
      newTab: get('newTab').toLowerCase(),
      analyticsLabel: get('analyticsLabel'),
      accessibilityLabel: get('ariaLabel'),
      kind: get('kind').toLowerCase(),
      theme: get('theme').toLowerCase(),
      ref: row,
    };
  }).filter((item) => item.href);
  return {
    legacy,
    raw,
    props,
    items,
    heading: legacy ? block.querySelector(HEADINGS.join(',')) : null,
    legacyLink: legacy ? block.querySelector('a[href]') : null,
  };
}

/* rendering */

function buildHeader(read, ids) {
  const { props, legacy } = read;
  const header = element('div', 'list-header');
  let heading = legacy ? read.heading : buildHeading(props.title, props.titletype, '', 'h2');
  if (heading && !heading.textContent.trim()) heading = null;
  const titleSlot = element('div', 'list-title-slot');
  if (heading) {
    heading.id = heading.id || `${ids.base}-title`;
    heading.classList.add('list-title');
    titleSlot.append(heading);
  }
  const intro = props.description?.textContent.trim() ? element('div', 'list-description') : null;
  if (intro) {
    intro.append(...props.description.childNodes);
    titleSlot.append(intro);
  }
  if (titleSlot.children.length) header.append(titleSlot);

  const link = legacy ? read.legacyLink : props.link?.querySelector('a[href]');
  if (link) {
    const label = textOf(props.linktext);
    if (label) link.textContent = label;
    const type = legacy ? readButtonOptions(link).type : textOf(props.linktype).toLowerCase();
    decorateButton(link, { view: 'button', type: ['primary', 'secondary'].includes(type) ? type : 'tertiary' });
    const ctaSlot = element('div', 'list-cta-slot');
    ctaSlot.append(link);
    header.append(ctaSlot);
  }
  return header.children.length ? { header, heading } : { header: null, heading };
}

/** a card's link: the card's destination, secure in a new tab, named by its label */
function cardLink(card, label, t) {
  const a = element('a', 'list-card-link', label);
  a.href = card.url;
  if (card.openInNewTab) {
    setLinkTarget(a, true);
    a.append(createHiddenText(` ${t('opensInNewTab', '(opens in a new tab)')}`));
  }
  if (card.external) a.dataset.external = 'true';
  if (card.accessibilityLabel) a.setAttribute('aria-label', card.accessibilityLabel);
  a.dataset.cardId = card.id;
  if (card.analyticsLabel) a.dataset.analyticsLabel = card.analyticsLabel;
  return a;
}

const labelRow = (className, values) => {
  const items = values.filter(Boolean);
  if (!items.length) return null;
  const row = element('p', className);
  items.forEach((value) => row.append(typeof value === 'string' ? element('span', '', value) : value));
  return row;
};

const timeOf = (card) => {
  if (!card.date) return null;
  const time = element('time', '', card.date);
  if (card.dateISO) time.dateTime = card.dateISO;
  return time;
};

function mediaOf(card, config, breakpoints) {
  if (!config.showImage || !card.image) return null;
  const picture = card.picture
    ? card.picture.cloneNode(true)
    : buildImage({ src: card.image, alt: card.imageAlt }, breakpoints);
  if (!picture) return null;
  const img = picture.tagName === 'IMG' ? picture : picture.querySelector('img');
  if (img) {
    img.alt = card.imageAlt || '';
    img.loading = config.imageLoading;
    if (config.imageLoading === 'eager') img.fetchPriority = 'high';
  }
  const media = element('div', 'list-card-media');
  media.append(picture);
  return media;
}

function renderCard(card, config, { t, level, kind }) {
  const article = element('article', `list-card list-card-${kind}`);
  const theme = card.theme || config.cardTheme;
  if (theme) article.classList.add(`theme-${theme}`);
  const readingTime = /^\d+$/.test(card.readingTime)
    ? t('minutesShort', '{n}m', { n: card.readingTime }) : card.readingTime;
  const tags = config.showTags ? card.tags.slice(0, MAX_CARD_TAGS) : [];
  const eyebrow = config.showEyebrow ? card.eyebrow : '';

  // the call to action, when shown, is the card's one link; else the title is
  const defaultCta = { report: t('download', 'Download'), panel: t('explore', 'Explore') }[kind] || '';
  const ctaLabel = config.showCta ? card.ctaLabel || defaultCta : '';
  const ctaType = { report: 'secondary', stat: 'secondary' }[kind] || 'tertiary';
  const cta = config.linkItems && ctaLabel ? cardLink(card, ctaLabel, t) : null;
  if (cta) {
    if (!card.accessibilityLabel) cta.setAttribute('aria-label', `${ctaLabel}: ${card.title}`);
    decorateButton(cta, { view: 'button', type: ctaType });
  }
  const title = element(level, 'list-card-title');
  if (config.linkItems && !cta) title.append(cardLink(card, card.title, t));
  else title.textContent = card.title;
  const description = config.showDescription && card.description
    ? element('p', 'list-card-description', card.description) : null;
  const date = config.showDate ? timeOf(card) : null;

  let parts;
  if (kind === 'image') {
    parts = [
      mediaOf(card, config, IMAGE_BREAKPOINTS),
      labelRow('list-card-kicker', [eyebrow, ...tags, config.showTags ? readingTime : '']),
      title,
      description,
      labelRow('list-card-meta', [card.contentType, date]),
    ];
  } else if (kind === 'report') {
    parts = [
      labelRow('list-card-kicker', [card.contentType || eyebrow, date]),
      title,
      description,
    ];
  } else if (kind === 'stat') {
    const top = element('div', 'list-card-top');
    top.append(...[labelRow('list-card-kicker', [eyebrow]), title].filter(Boolean));
    const bottom = element('div', 'list-card-bottom');
    bottom.append(...[card.subtitle ? element('p', 'list-card-subtitle', card.subtitle) : null,
      description].filter(Boolean));
    parts = [top, bottom.children.length ? bottom : null];
  } else {
    parts = [
      theme === 'image' ? mediaOf(card, config, FEATURE_BREAKPOINTS) : null,
      labelRow('list-card-kicker', [eyebrow || tags[0]]),
      title,
      description,
    ];
  }
  if (cta) {
    const action = element('p', 'list-card-action');
    action.append(cta);
    parts.push(action);
  }
  article.append(...parts.filter(Boolean));
  if (card.analyticsLabel) article.dataset.analyticsLabel = card.analyticsLabel;
  return article;
}

/** a row of the list of links (Display as teaser off) */
function renderRow(card, config, { t, level }) {
  const article = element('article', 'list-row');
  const title = element(level, 'list-row-title');
  if (config.linkItems) title.append(cardLink(card, card.title, t));
  else title.textContent = card.title;
  article.append(...[
    labelRow('list-card-kicker', [config.showEyebrow ? card.eyebrow || card.contentType : '',
      config.showTags ? card.tags[0] : '']),
    title,
    config.showDescription && card.description ? element('p', 'list-row-description', card.description) : null,
    config.showDate ? labelRow('list-card-meta', [timeOf(card)]) : null,
  ].filter(Boolean));
  if (config.linkItems) {
    const arrow = element('span', 'list-row-arrow');
    arrow.setAttribute('aria-hidden', 'true');
    article.append(arrow);
  }
  return article;
}

/** the feature card (First card as feature): the image behind tags, title and author */
function renderFeature(card, config, { t, level, authors }) {
  const article = element('article', 'list-feature');
  const content = element('div', 'list-feature-content');
  const author = authors.get(card.authorId);
  const readingTime = /^\d+$/.test(card.readingTime)
    ? t('minutesShort', '{n}m', { n: card.readingTime }) : card.readingTime;
  const title = element(level, 'list-feature-title');
  if (config.linkItems) title.append(cardLink(card, card.title, t));
  else title.textContent = card.title;
  content.append(...[
    labelRow('list-card-kicker', [...(config.showTags ? card.tags.slice(0, MAX_CARD_TAGS) : []),
      config.showTags ? readingTime : '']),
    title,
    author ? buildAuthorLockup({
      picture: buildImage(author.image ? { src: author.image, alt: '' } : null),
      name: element('p', 'list-author-name', author.name),
      designation: author.designation ? element('p', 'list-author-designation', author.designation) : null,
      prefix: 'list',
    }) : null,
  ].filter(Boolean));
  article.append(...[mediaOf(card, { ...config, showImage: true }, FEATURE_BREAKPOINTS), content]
    .filter(Boolean));
  return article;
}

/** the block classes and custom properties of the layout (grid or scroll per breakpoint) */
function applyLayout(block, config) {
  const rem = (px) => `${px / 16}rem`;
  BREAKPOINTS.forEach((bp) => {
    const r = config.responsive[bp];
    const scroll = r.mode === 'horizontal-scroll';
    block.classList.add(`${bp}-${scroll ? 'scroll' : 'grid'}`);
    if (scroll && r.controls) block.classList.add(`${bp}-controls`);
    if (scroll && r.indicator) block.classList.add(`${bp}-indicator`);
    block.style.setProperty(`--list-columns-${bp}`, r.columns);
    block.style.setProperty(`--list-gap-${bp}`, rem(r.gap));
    block.style.setProperty(`--list-visible-${bp}`, r.visible);
    // no card width: the CSS sizes the cards by Items visible
    if (r.cardWidth) block.style.setProperty(`--list-card-width-${bp}`, rem(r.cardWidth));
  });
  const flags = {
    snap: config.snap,
    'hide-scrollbar': config.hideScrollbar,
    'no-swipe': !config.swipe,
    'edge-bleed': config.edge === 'bleed',
    'equal-height': config.equalHeight,
    stretch: config.stretch,
    'feature-first': config.featureFirst,
  };
  Object.entries(flags).forEach(([name, on]) => block.classList.toggle(name, !!on));
  block.classList.add(
    `snap-${config.snapAlign}`,
    config.displayAsTeaser ? 'teaser' : 'links',
    `style-${config.cardStyle}`,
    `ratio-${config.imageRatio}`,
    `panel-${config.panelHeight}`,
    `source-${config.source}`,
  );
}

const responsiveMode = () => {
  if (window.matchMedia('(min-width: 1200px)').matches) return 'desktop';
  return window.matchMedia('(min-width: 600px)').matches ? 'tablet' : 'mobile';
};

/** the data layer entries of the list and its cards; card clicks as events */
function trackList(block, config, cards, { id, title }) {
  const variant = config.displayAsTeaser ? config.cardStyle : 'links';
  const components = {
    [id]: {
      '@type': 'tcs-corp/components/list',
      'dc:title': title,
      'xdm:listSource': config.source,
      'xdm:variant': variant,
    },
  };
  cards.forEach((card, i) => {
    components[card.id] = {
      '@type': 'tcs-corp/components/list/item',
      parentId: id,
      'dc:title': card.analyticsLabel || card.title,
      'xdm:linkURL': card.url,
      'xdm:position': i + 1,
      'repo:modifyDate': card.dateISO || undefined,
    };
  });
  pushComponents(components);
  block.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-card-id]');
    if (!link) return;
    pushComponentEvent('cmp:click', link.dataset.cardId, {
      parentId: id,
      position: cards.findIndex((card) => card.id === link.dataset.cardId) + 1,
      interaction: 'card',
      listSource: config.source,
      responsiveMode: responsiveMode(),
      variant,
    });
  });
}

/** a unique component id: the authored one (suffixed when taken), else a generated one */
function componentIdOf(config) {
  let id = config.componentId || uniqueId('list');
  if (config.componentId && document.getElementById(id)) {
    debug(`component id "${id}" is used twice`);
    id = `${id}-${uniqueId('dup').split('-').pop()}`;
  }
  return id;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  if (block.dataset.listDecorated) return;
  block.dataset.listDecorated = 'true';

  const read = readBlockConfig(block);
  const config = normalizeConfig(read.raw);
  const t = await getPlaceholders();
  const id = componentIdOf(config);
  const { header, heading } = buildHeader(read, { base: id });

  // lists made before: a title and a CTA only
  if (read.legacy) {
    block.classList.add('list-legacy');
    block.replaceChildren(...[header].filter(Boolean));
    return;
  }
  block.id = id;
  config.componentId = id;
  const options = (read.raw.classes || '').split(',').map((value) => value.trim());
  block.classList.add(...STYLE_OPTIONS.filter((name) => options.includes(name)));

  const warnings = validateConfig(config, { fixedCount: read.items.length });
  debug('config', config, warnings);
  const needsIndex = config.source !== 'fixed' || read.items.some((item) => item.href.startsWith('/'));
  const [pages, redirects, authorRows] = await Promise.all([
    needsIndex ? getPages() : [],
    loadRedirects(),
    config.featureFirst ? getAuthors().catch(() => []) : [],
  ]);
  const data = {
    pages,
    items: read.items,
    currentPath: normalizePath(toPublishedPath(window.location.pathname)),
    resolveUrl: (path) => resolveRedirect(redirects, path),
    origin: window.location.origin,
    lang: document.documentElement.lang,
  };
  let cards = buildCards(config, data);
  if (!cards.length && config.emptyBehavior === 'fallback' && config.source !== 'fixed') {
    cards = buildCards({ ...config, source: 'fixed' }, data);
  }
  const tagIds = [...new Set(cards.flatMap((card) => card.tagIds))];
  const labels = new Map((await resolveTags(tagIds)).map((tag) => [tag.id, tag.label]));
  cards.forEach((card) => {
    card.tags = card.tagIds.map((tag) => labels.get(tag) || tag);
  });
  debug('cards', cards);

  applyLayout(block, config);
  const level = HEADINGS[Math.min(5, HEADINGS.indexOf(heading?.tagName.toLowerCase() || 'h2') + 1)];
  const parts = [header];

  if (!cards.length) {
    const editing = isEditing();
    if (config.emptyBehavior === 'hide' && !editing) {
      block.replaceChildren();
      block.hidden = true;
      block.closest('.list-wrapper')?.setAttribute('hidden', '');
      return;
    }
    let message = config.emptyMessage || t('listEmpty', 'There are no items to show.');
    if (editing && warnings.length) {
      message = t('listEditorHint', 'Set up the list in its properties: {problems}.', { problems: warnings.join(', ') });
    } else if (editing && config.source !== 'fixed' && !pages.length) {
      message = t('listEditorPages', 'The pages show on the published page (from the query index).');
    }
    parts.push(element('p', 'list-empty', message));
    block.replaceChildren(...parts.filter(Boolean));
    return;
  }

  const authors = new Map(authorRows.map((author) => [author.id, author]));
  let listed = cards;
  if (config.displayAsTeaser && config.featureFirst) {
    parts.push(renderFeature(cards[0], config, { t, level, authors }));
    listed = cards.slice(1);
  }

  const viewport = element('div', 'list-scroller');
  viewport.id = `${id}-items`;
  viewport.setAttribute('role', 'region');
  if (heading) viewport.setAttribute('aria-labelledby', heading.id);
  else viewport.setAttribute('aria-label', config.listLabel || t('list', 'List'));
  if (config.listLabel) viewport.setAttribute('aria-label', config.listLabel);
  const list = element('ul', 'list-items');
  const fragment = document.createDocumentFragment();
  listed.forEach((card) => {
    const li = element('li', 'list-item');
    li.dataset.cardId = card.id;
    li.append(config.displayAsTeaser
      ? renderCard(card, config, { t, level, kind: kindOf(card, config.cardStyle) })
      : renderRow(card, config, { t, level }));
    if (card.ref) moveInstrumentation(card.ref, li);
    fragment.append(li);
  });
  list.append(fragment);
  viewport.append(list);
  if (listed.length) parts.push(viewport);

  // previous / next and the scroll indicator, shown where the breakpoint scrolls
  const nav = element('div', 'list-nav');
  const indicator = element('div', 'list-indicator');
  indicator.setAttribute('aria-hidden', 'true');
  indicator.append(element('span', 'list-indicator-thumb'));
  const controls = element('div', 'list-controls');
  const previous = createIconButton({ label: t('listPrevious', 'Previous items'), icon: 'chevron-left', className: 'list-previous' });
  const next = createIconButton({ label: t('listNext', 'Next items'), icon: 'chevron-right', className: 'list-next' });
  [previous, next].forEach((button) => button.setAttribute('aria-controls', viewport.id));
  controls.append(previous, next);
  nav.append(indicator, controls);
  if (listed.length) parts.push(nav);

  block.replaceChildren(...parts.filter(Boolean));
  createScroller(viewport, {
    list,
    previous,
    next,
    indicator,
    step: config.step,
    loop: config.loop,
    drag: config.drag,
    keyboard: config.keyboard,
    reducedMotion: config.reducedMotion,
    initialIndex: config.initialIndex,
    onNavigate: (direction) => {
      if (!config.analytics) return;
      pushComponentEvent('cmp:click', id, {
        interaction: direction, listSource: config.source, responsiveMode: responsiveMode(),
      });
    },
  });
  if (config.analytics) {
    trackList(block, config, cards, { id, title: heading?.textContent.trim() || config.listLabel });
  }
}
