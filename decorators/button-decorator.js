/*
 * Button decorator: the single place for the site's button views, types, alignment and states,
 * so any block can render buttons the same way (TCS.com DS Figma "Buttons" page).
 *
 * Views: button | icon | link
 * Types (button and icon views): primary | secondary | tertiary
 * States: default and hover are styled in styles/styles.css; disabled is set in code with
 * setButtonDisabled() or the `disabled` option, and styled for every view and type.
 * Alignment: left | center | right, applied to the element containing the button.
 *
 * Blocks should use createButton() / decorateButton() instead of setting button classes.
 */

export const BUTTON_VIEWS = ['button', 'icon', 'link'];
export const BUTTON_TYPES = ['primary', 'secondary', 'tertiary'];
export const BUTTON_ALIGNMENTS = ['left', 'center', 'right'];

const BUTTON_CLASSES = ['button', 'icon-button', 'link-button', ...BUTTON_TYPES];
const ALIGNMENT_CLASSES = BUTTON_ALIGNMENTS.map((alignment) => `button-align-${alignment}`);

const pick = (value, allowed, fallback = '') => {
  const normalized = String(value || '').trim().toLowerCase();
  return allowed.includes(normalized) ? normalized : fallback;
};

function preventWhenDisabled(e) {
  if (e.currentTarget.getAttribute('aria-disabled') === 'true') {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}

/** value of the "Open in New Window" Link Type option in the block models */
export const NEW_WINDOW = 'new-window';

/**
 * Opens a link in a new tab (or back in the same tab).
 * @param {HTMLAnchorElement} a
 * @param {boolean} [newWindow]
 */
export function setLinkTarget(a, newWindow = true) {
  if (a.tagName !== 'A') return;
  if (newWindow) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  } else {
    a.removeAttribute('target');
    a.removeAttribute('rel');
  }
}

/**
 * Reads a CTA List composite multifield cell: one link per item, each with an optional
 * "new-window" Link Type value. Items are list items, or runs of elements between <hr>s.
 * @param {Element} cell
 * @returns {{ link: HTMLAnchorElement, newWindow: boolean }[]}
 */
export function readLinkItems(cell) {
  if (!cell) return [];
  const list = cell.querySelector(':scope > ul');
  const items = list ? [...list.children].map((li) => [li]) : [[]];
  if (!list) {
    [...cell.children].forEach((el) => {
      if (el.tagName === 'HR') items.push([]);
      else items[items.length - 1].push(el);
    });
  }
  return items.map((item) => {
    const link = item.map((el) => (el.matches('a[href]') ? el : el.querySelector('a[href]')))
      .find(Boolean);
    const newWindow = item.some((el) => {
      const text = el.contains(link) ? el.textContent.replace(link.textContent, '') : el.textContent;
      return text.trim() === NEW_WINDOW;
    });
    return { link, newWindow };
  }).filter(({ link }) => link);
}

/**
 * Sets or clears the disabled state of a button or link button.
 * Anchors keep their href so they stay styled, but can't be clicked or tabbed to.
 * @param {HTMLAnchorElement|HTMLButtonElement} button
 * @param {boolean} [disabled]
 */
export function setButtonDisabled(button, disabled = true) {
  if (button.tagName === 'BUTTON') {
    button.disabled = disabled;
    return;
  }
  if (disabled) {
    button.setAttribute('aria-disabled', 'true');
    button.tabIndex = -1;
    button.addEventListener('click', preventWhenDisabled);
  } else {
    button.removeAttribute('aria-disabled');
    button.removeAttribute('tabindex');
  }
}

/**
 * Aligns the buttons inside a container (e.g. a paragraph or a block cell).
 * @param {Element} container
 * @param {string} alignment left | center | right
 */
export function setButtonAlignment(container, alignment) {
  const value = pick(alignment, BUTTON_ALIGNMENTS);
  if (!container || !value) return;
  container.classList.remove(...ALIGNMENT_CLASSES);
  container.classList.add(`button-align-${value}`);
}

/**
 * Makes a button icon-only: the icon is drawn from /icons/<name>.svg and the text,
 * if any, becomes the accessible name.
 */
function applyIcon(button, iconName) {
  const span = button.querySelector(':scope > span.icon');
  const name = iconName
    || [...(span?.classList || [])].find((c) => c.startsWith('icon-'))?.substring(5);
  if (!name) return;
  const label = button.getAttribute('aria-label') || button.textContent.trim()
    || button.title || name.replace(/-/g, ' ');
  // keep text for assistive technology only; spans are hidden in icon buttons
  [...button.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
    .forEach((node) => {
      const hidden = document.createElement('span');
      hidden.textContent = node.textContent;
      node.replaceWith(hidden);
    });
  button.classList.add('icon-button');
  button.setAttribute('aria-label', label);
  if (!button.title) button.title = label;
  button.style.setProperty('--icon-url', `url('${window.hlx.codeBasePath}/icons/${name}.svg')`);
}

/**
 * Applies a view, type and state to an existing link or button element.
 * @param {HTMLAnchorElement|HTMLButtonElement} button
 * @param {Object} [options]
 * @param {string} [options.view] button (default) | icon | link
 * @param {string} [options.type] primary (default) | secondary | tertiary; ignored for link
 * @param {string} [options.icon] icon name for the icon view, e.g. "search"
 * @param {string} [options.title] tooltip / title
 * @param {boolean} [options.newWindow] open the link in a new tab
 * @param {boolean} [options.disabled] render the disabled state
 * @returns {HTMLAnchorElement|HTMLButtonElement} the same element
 */
export function decorateButton(button, options = {}) {
  const view = pick(options.view, BUTTON_VIEWS, 'button');
  const type = pick(options.type, BUTTON_TYPES, 'primary');

  button.classList.remove(...BUTTON_CLASSES);
  button.style.removeProperty('--icon-url');
  if (view === 'link') {
    button.classList.add('link-button');
  } else {
    button.classList.add('button', type);
    if (view === 'icon') applyIcon(button, options.icon);
  }

  if (options.title) button.title = options.title;
  if (options.newWindow) setLinkTarget(button);
  if (options.disabled !== undefined) setButtonDisabled(button, options.disabled);
  return button;
}

/**
 * Creates a link styled as a button, icon button or link button.
 * @param {Object} options decorateButton() options, plus:
 * @param {string} options.href link target
 * @param {string} [options.text] visible text (the accessible name for the icon view)
 * @returns {HTMLAnchorElement}
 */
export function createButton({ href, text = '', ...options }) {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = text || href;
  return decorateButton(a, options);
}

/**
 * Reads the view, type, icon and alignment of an authored link from its markup:
 * - bold / italic / bold + italic formatting: primary / secondary / tertiary
 * - a link containing only an icon: icon view
 * - values from the Button component properties, as data attributes or classes of the link
 *   or its paragraph: a type class (primary), view-<view> and align-<alignment> classes, or
 *   view / type / alignment data values. A bare "button" class is not read as a view.
 * @param {HTMLAnchorElement} a
 * @returns {{ view: string, type: string, icon: string, alignment: string }}
 */
export function readButtonOptions(a) {
  const wrapper = a.closest('p');
  const classes = [...a.classList, ...(wrapper?.classList || [])].map((c) => c.toLowerCase());
  // skip Universal Editor instrumentation (data-aue-*, data-richtext-*), e.g. data-aue-label
  const data = [...Object.entries(a.dataset), ...Object.entries(wrapper?.dataset || {})]
    .filter(([key]) => !/^(aue|richtext)/.test(key))
    .map(([, value]) => String(value).trim().toLowerCase());
  const find = (allowed, prefix) => allowed.find((value) => data.includes(value)
    || classes.includes(prefix ? `${prefix}-${value}` : value)) || '';

  const strong = a.closest('strong');
  const em = a.closest('em');
  let formatted = '';
  if (strong && em) formatted = 'tertiary';
  else if (strong) formatted = 'primary';
  else if (em) formatted = 'secondary';

  const iconSpan = !a.textContent.trim() && a.children.length === 1
    && a.querySelector(':scope > span.icon');
  const icon = [...(iconSpan?.classList || [])].find((c) => c.startsWith('icon-'))?.substring(5)
    || a.dataset.buttonIcon || wrapper?.dataset.buttonIcon || '';

  return {
    view: find(BUTTON_VIEWS, 'view'),
    type: find(BUTTON_TYPES) || formatted,
    icon,
    alignment: find(BUTTON_ALIGNMENTS, 'align'),
  };
}

/**
 * Turns standalone authored links into buttons:
 * - formatted links (bold / italic / bold + italic) or links with a Type: buttons
 * - icon-only formatted links: icon buttons (unformatted icon links stay plain)
 * - other standalone links: link buttons
 * Inline links, links showing their own URL and image links are left alone.
 * @param {Element} container
 */
export function decorateButtons(container) {
  container.querySelectorAll('p a[href]').forEach((a) => {
    a.title = a.title || a.textContent;
    const p = a.closest('p');
    const text = a.textContent.trim();
    const options = readButtonOptions(a);

    // quick structural checks
    if ((a.querySelector('img') && !options.icon) || p.textContent.trim() !== text) return;

    // skip URL display links
    try {
      if (!options.icon && new URL(a.href).href === new URL(text, window.location).href) return;
    } catch { /* continue */ }

    // unformatted icon-only links stay plain
    if (options.icon && !options.type && !options.view) return;

    const view = options.view || (options.icon && 'icon') || (options.type ? 'button' : 'link');

    // drop the bold / italic formatting that encoded the type
    const formatting = [a.closest('strong'), a.closest('em')]
      .filter((el) => el && p.contains(el))
      .sort((x, y) => (x.contains(y) ? -1 : 1))[0];
    if (formatting) formatting.replaceWith(a);

    p.className = 'button-wrapper';
    setButtonAlignment(p, options.alignment);
    decorateButton(a, { view, type: options.type, icon: options.icon });
  });
}
