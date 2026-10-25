/* eslint-disable */
/* global WebImporter */

/**
 * Teaser (blocks/teaser, key-value, template name "Teaser"), Layout "no-image" (Text split),
 * for the "With you for the long run / Connect with us" call to action.
 *
 * Source: div.cmp-experiencefragment--email-sign-up > ... div.footer-flyout-div:
 * div.footer-flyout-heading h2, p.footer-flyout-description, a.btn-footer-flyout-primary.
 * Target (migration-work/pilot/reference.plain.html, block "teaser no-image"): title,
 * description and primaryCta from the source, the other values constant, in the reference's
 * order. The Layout travels in the block name, "Teaser (no-image)" (classes field).
 *
 * md2jcr maps the rows of a key-value block by POSITION (row n = the n-th field group of the
 * model, tabs and classes_* left out), not by the key text. So the block has one row per field
 * group of the "teaser" model, in model order, with an empty value where the reference sets
 * nothing; AEM leaves empty properties out of the delivered block, so the published block has
 * exactly the reference's rows in its order. Each row is a single cell (key, then value), see
 * row(). Keep FIELDS in step with blocks/teaser/_teaser.json (npm run build:json).
 */

/** the field groups of the "teaser" model, in model order (as md2jcr groups them) */
const FIELDS = [
  'eyebrow', 'showEyebrow', 'title', 'titleHidden', 'description', 'showDescription',
  'shortDescription', 'viewAll', 'showDate', 'date', 'dateFormat', 'dateLabel', 'readingTime',
  'displayTags', 'tags', 'listenLink', 'download', 'socialShare', 'authorName',
  'authorDesignation', 'authorImage', 'imageFormat', 'image', 'hideImage', 'imagePosition',
  'imagePositionMobile', 'imageRatio', 'imageCorners', 'multiLinks', 'links', 'linkArrow',
  'primaryCta', 'primaryCtaTarget', 'primaryCtaStyle', 'secondaryCta', 'secondaryCtaTarget',
  'secondaryCtaStyle', 'buttonsSideBySide', 'stats', 'bgColor', 'textAlignment',
  'verticalAlignment', 'titleWeight', 'descriptionSize', 'eyebrowStyle', 'topSpacing',
];

const DEFAULTS = {
  title: 'With you for the long run',
  ctaText: 'Connect with us',
  ctaHref: 'https://www.tcs.com/contact-us/whats-on-your-mind/global-contact-us',
};

const norm = (s) => (s || '').replace(/[\s ]+/g, ' ').trim();

/**
 * One single-cell row: the key as a paragraph, then the value (nodes or text).
 * The Teaser takes child items (Links, Stats), so md2jcr (1.5.10, docs/container-blocks.md)
 * reads one-cell rows as the parent's property rows (in model order) and any row of two or
 * more cells as a child item; in key-value mode it skips the first node of the row (the key).
 * Two-cell key / value rows would turn every row into a bogus Link item.
 */
function row(document, key, value) {
  const keyEl = document.createElement('p');
  keyEl.textContent = key;
  const nodes = [].concat(value === undefined || value === '' ? [] : value)
    .map((v) => (typeof v === 'string' ? document.createTextNode(v) : v));
  return [[keyEl, ...nodes]];
}

export default function parse(element, { document }) {
  const root = element.querySelector('.footer-flyout-div') || element;

  // title: always an h2, as in the reference
  const heading = root.querySelector('.footer-flyout-heading h1, .footer-flyout-heading h2, .footer-flyout-heading h3')
    || root.querySelector('h1, h2, h3');
  const title = document.createElement('h2');
  title.textContent = norm(heading?.textContent) || DEFAULTS.title;

  // description: the source paragraph
  const source = root.querySelector('p.footer-flyout-description') || root.querySelector('p');
  let description;
  if (source && norm(source.textContent)) {
    description = document.createElement('p');
    [...source.childNodes].forEach((n) => description.append(n.cloneNode(true)));
    description.querySelectorAll('[class], [style]').forEach((el) => {
      el.removeAttribute('class');
      el.removeAttribute('style');
    });
  }

  // primary CTA: the source button
  const button = root.querySelector('a.btn-footer-flyout-primary[href]')
    || root.querySelector('a.tcs-primary-btn[href], a.btn[href]');
  const cta = document.createElement('a');
  cta.href = button?.getAttribute('href') || DEFAULTS.ctaHref;
  cta.textContent = norm(button?.textContent) || DEFAULTS.ctaText;
  const ctaParagraph = document.createElement('p');
  ctaParagraph.append(cta);

  const values = {
    showEyebrow: 'false',
    title,
    description,
    showDescription: 'true',
    dateFormat: 'dd-mm-yyyy',
    imagePosition: 'left',
    primaryCta: ctaParagraph,
    primaryCtaStyle: 'primary',
    secondaryCtaStyle: 'secondary',
    bgColor: 'grey',
    textAlignment: 'text-center',
    verticalAlignment: 'valign-middle',
    titleWeight: 'title-semibold',
  };
  const cells = FIELDS.map((key) => row(document, key, values[key]));

  const block = WebImporter.Blocks.createBlock(document, { name: 'teaser', variants: ['no-image'], cells });
  element.replaceWith(block);
}
