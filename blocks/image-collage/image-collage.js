import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { hideVisually } from '../../decorators/a11y-decorator.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import {
  buildEditorItems,
  editorItemHint,
} from '../../decorators/editor-item-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { pictureOf } from '../../decorators/image-decorator.js';
import { KEY_VALUE_ITEM, itemRows, withoutTabCells } from '../../utils/cells.js';
import { NEW_WINDOW, linkOf } from '../../utils/links.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import {
  isOn,
  isOnByDefault,
  optionOf as option,
  readProperties,
  textOf,
} from '../../utils/properties.js';

const COLLAGE_IMAGE_LIMIT = 9;

/*
 * The Collage image item is delivered as positional cells:
 *
 * 1. Dialog tab
 * 2. Image, with alt text collapsed into the image cell
 * 3. Image treatment
 */
const COLLAGE_LAYOUT = [
  null,
  'image',
  'imageTreatment',
];

const COLLAGE_TREATMENTS = [
  'black-white',
  'normal',
];

const BUTTON_STYLES = [
  'primary',
  'primary-no-arrow',
  'secondary',
  'secondary-no-arrow',
];

const BUTTON_BACKGROUNDS = [
  'button-bg-white',
  'button-bg-blue',
  'button-bg-translucent',
];

const BUTTON_SHAPES = [
  'button-rectangle',
];

const OPTIONS = {
  titleweight: [
    'title-regular',
    'title-semibold',
  ],
  descriptionsize: [
    'text-regular',
    'text-large',
  ],
  eyebrowstyle: [
    'eyebrow-label',
    'eyebrow-grey',
    'eyebrow-white',
  ],
};

/**
 * Returns an authored CSS class when the value is allowed.
 *
 * @param {Element} cell Property cell containing the authored value
 * @param {string[]} allowedValues Allowed class values
 * @returns {string}
 */
function appearanceOf(cell, allowedValues) {
  if (!cell) return '';

  const value = toClassName(textOf(cell));

  return allowedValues.includes(value) ? value : '';
}

/**
 * Resolves the authored CTA style.
 *
 * @param {Element} cell CTA style property
 * @param {string} fallback Default style
 * @returns {string}
 */
function buttonStyleOf(cell, fallback) {
  const value = appearanceOf(cell, BUTTON_STYLES);

  return value || fallback;
}

/**
 * Builds the authored title.
 *
 * @param {Object} props Parent block properties
 * @returns {HTMLElement|null}
 */
function buildTitle(props) {
  return buildHeading(
    props.title,
    props.titletype,
    'image-collage-title',
  );
}

/**
 * Builds one parent-authored CTA.
 *
 * @param {Object} config CTA configuration
 * @returns {HTMLAnchorElement|null}
 */
function buildCta({
  linkCell,
  labelCell,
  targetCell,
  styleCell,
  backgroundCell,
  shapeCell,
  fallbackStyle,
  className,
  newTabHint,
}) {
  const link = linkOf(linkCell);

  if (!link) return null;

  const label = textOf(labelCell);

  if (label) {
    link.textContent = label;
  }

  const authoredStyle = buttonStyleOf(
    styleCell,
    fallbackStyle,
  );

  const noArrow = authoredStyle.endsWith('-no-arrow');

  const buttonStyle = noArrow
    ? authoredStyle.replace('-no-arrow', '')
    : authoredStyle;

  const newWindow = textOf(targetCell) === NEW_WINDOW;

  decorateButton(link, {
    view: 'button',
    type: buttonStyle,
    newWindow,
    newTabHint,
  });

  link.classList.add(
    'image-collage-cta',
    className,
  );

  if (noArrow) {
    link.classList.add('image-collage-cta-no-arrow');
  }

  const supportsAppearance = [
    'primary',
    'secondary',
  ].includes(buttonStyle);

  if (supportsAppearance) {
    const background = appearanceOf(
      backgroundCell,
      BUTTON_BACKGROUNDS,
    );

    const shape = appearanceOf(
      shapeCell,
      BUTTON_SHAPES,
    );

    if (background) {
      link.classList.add(background);
    }

    if (shape) {
      link.classList.add(shape);
    }
  }

  moveInstrumentation(linkCell, link);

  return link;
}

/**
 * Builds the Primary and Secondary CTAs.
 *
 * The Image Collage design places the CTAs in one horizontal row.
 *
 * @param {Object} props Parent block properties
 * @param {string} newTabHint Accessible new-window hint
 * @returns {HTMLElement|null}
 */
function buildLinks(props, newTabHint) {
  const links = document.createElement('div');

  links.className = 'image-collage-links';

  const primary = buildCta({
    linkCell: props.primarycta,
    labelCell: props.primaryctatext,
    targetCell: props.primaryctatarget,
    styleCell: props.primaryctastyle,
    backgroundCell: props.primaryctabackground,
    shapeCell: props.primaryctashape,
    fallbackStyle: 'primary',
    className: 'image-collage-cta-primary',
    newTabHint,
  });

  const secondary = buildCta({
    linkCell: props.secondarycta,
    labelCell: props.secondaryctatext,
    targetCell: props.secondaryctatarget,
    styleCell: props.secondaryctastyle,
    backgroundCell: props.secondaryctabackground,
    shapeCell: props.secondaryctashape,
    fallbackStyle: 'secondary',
    className: 'image-collage-cta-secondary',
    newTabHint,
  });

  links.append(
    ...[
      primary,
      secondary,
    ].filter(Boolean),
  );

  return links.children.length ? links : null;
}

/**
 * Builds the optional View All CTA.
 *
 * @param {Object} props Parent block properties
 * @returns {HTMLAnchorElement|null}
 */
function buildViewAll(props) {
  const link = linkOf(props.viewall);

  if (!link) return null;

  const label = textOf(props.viewalltext);

  if (label) {
    link.textContent = label;
  }

  decorateButton(link, {
    view: 'button',
    type: 'primary',
  });

  link.classList.add('image-collage-view-all');

  moveInstrumentation(props.viewall, link);

  return link;
}

/**
 * Builds the content displayed in the center of the collage.
 *
 * @param {Object} props Parent block properties
 * @param {string} newTabHint Accessible new-window hint
 * @returns {HTMLElement|null}
 */
function buildContent(props, newTabHint) {
  const content = document.createElement('div');

  content.className = 'image-collage-content';

  const intro = document.createElement('div');

  intro.className = 'image-collage-intro';

  if (
    isOnByDefault(props.showeyebrow)
        && textOf(props.eyebrow)
  ) {
    intro.append(
      fromCell(
        props.eyebrow,
        'p',
        'image-collage-eyebrow',
      ),
    );
  }

  const headingRow = document.createElement('div');

  headingRow.className = 'image-collage-heading-row';

  const title = buildTitle(props);

  if (title) {
    if (isOn(props.titlehidden)) {
      hideVisually(title);
    }

    headingRow.append(title);
  }

  const viewAll = buildViewAll(props);

  if (viewAll) {
    headingRow.append(viewAll);
  }

  if (headingRow.children.length) {
    intro.append(headingRow);
  }

  /*
       * The description belongs inside the intro for the Image Collage.
       * This produces the Figma structure:
       *
       * Introduction:
       * - Title
       * - Description
       *
       * Then the CTA row after the content gap.
       */
  if (
    isOnByDefault(props.showdescription)
        && textOf(props.description)
  ) {
    intro.append(
      fromCell(
        props.description,
        'div',
        'image-collage-description',
      ),
    );
  }

  if (intro.children.length) {
    content.append(intro);
  }

  const links = buildLinks(props, newTabHint);

  if (links) {
    content.append(links);
  }

  if (textOf(props.shortdescription)) {
    content.append(
      fromCell(
        props.shortdescription,
        'div',
        'image-collage-short-description',
      ),
    );
  }

  return content.children.length ? content : null;
}

/**
 * Builds up to nine decorative collage images.
 *
 * Empty items and items after the ninth are not rendered in the media
 * layer. They are preserved separately as Universal Editor placeholders.
 *
 * @param {Element[]} rows Collage image item rows
 * @returns {{
 *   collage: HTMLElement|null,
 *   rendered: Set<Element>
 * }}
 */
function buildCollageImages(rows) {
  const collage = document.createElement('div');
  collage.className = 'image-collage-media';
  collage.setAttribute('aria-hidden', 'true');

  const rendered = new Set();

  rows.forEach((row) => {
    if (collage.children.length >= COLLAGE_IMAGE_LIMIT) {
      return;
    }

    const cells = withoutTabCells(
      [...row.children],
      COLLAGE_LAYOUT,
    );

    const imageCell = cells.find(
      (cell) => cell.querySelector('picture'),
    );

    if (!imageCell) return;

    const picture = pictureOf(imageCell);

    if (!picture) return;

    const treatmentCell = cells.find(
      (cell) => COLLAGE_TREATMENTS.includes(
        toClassName(textOf(cell)),
      ),
    );

    const treatment = treatmentCell
      ? toClassName(textOf(treatmentCell))
      : 'black-white';

    const slot = collage.children.length + 1;
    const item = document.createElement('div');

    item.className = [
      'image-collage-item',
      `image-collage-item-${slot}`,
      treatment === 'normal'
        ? 'image-normal'
        : 'image-black-white',
    ].join(' ');

    moveInstrumentation(row, item);

    item.append(picture);
    collage.append(item);
    rendered.add(row);
  });

  return {
    collage: collage.children.length ? collage : null,
    rendered,
  };
}

/**
 * Builds placeholders for empty or excess Collage image child items.
 *
 * This keeps newly added items visible and selectable in the
 * Universal Editor after the block DOM is rebuilt.
 *
 * @param {Element[]} rows Child item rows
 * @param {Set<Element>} rendered Rendered rows
 * @param {string} hint Editor placeholder hint
 * @returns {HTMLElement|null}
 */
function buildPendingItems(rows, rendered, hint) {
  const pending = buildEditorItems(
    rows.filter((row) => !rendered.has(row)),
    hint,
  );

  if (!pending.length) return null;

  const list = document.createElement('div');

  list.className = 'image-collage-editor-items';
  list.append(...pending);

  return list;
}

/**
 * Loads and decorates the Image Collage block.
 *
 * @param {Element} block Block element
 */
export default async function decorate(block) {
  const props = readProperties(block);

  // on the page the item rows carry no model: they are the rows that aren't key-value pairs
  const collageRows = itemRows(
    block,
    ['image-collage-item'],
    KEY_VALUE_ITEM,
  );

  const [placeholders, hint] = await Promise.all([
    getPlaceholders(),
    editorItemHint(collageRows),
  ]);

  const newTabHint = placeholders(
    'opensInNewTab',
    '(opens in a new tab)',
  );

  const styles = Object.entries(OPTIONS)
    .map(([name, values]) => (
      option(block, props[name], values)
    ))
    .filter(Boolean);

  const content = buildContent(
    props,
    newTabHint,
  );

  const {
    collage,
    rendered,
  } = buildCollageImages(collageRows);

  const pendingItems = buildPendingItems(
    collageRows,
    rendered,
    hint,
  );

  const optionClasses = Object.values(OPTIONS).flat();

  block.classList.remove(...optionClasses);
  block.classList.add(...styles);

  block.replaceChildren(
    ...[
      collage,
      content,
      pendingItems,
    ].filter(Boolean),
  );
}
