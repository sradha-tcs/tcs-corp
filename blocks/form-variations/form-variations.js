import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { pictureOf } from '../../decorators/image-decorator.js';
import { matchCells } from '../../utils/cells.js';
import { isInEditor } from '../../utils/environment.js';
import { isSafeUrl, linkOf, telHref } from '../../utils/links.js';
import { textOf } from '../../utils/properties.js';
import { createIdFactory, uniqueId } from '../../utils/ids.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';
import { headingLevelOf, mapProperties } from './form-variations-properties.js';

let t = (key, fallback, values) => fillPlaceholder(fallback, values);

export const FIELD_LAYOUT = {
  'field-text': ['fieldName', 'label', 'inputKind', 'fieldWidth', 'required', 'dependsOn'],
  'field-select': ['fieldName', 'label', 'fieldWidth', 'required', 'options', 'dependsOn'],
  'field-combined': ['fieldName', 'label', 'options', 'fieldWidth', 'required', 'dependsOn'],
  'field-textarea': ['fieldName', 'label', 'maxLength', 'fieldWidth', 'required', 'dependsOn'],
  'field-calendar': ['fieldName', 'label', 'fieldWidth', 'required', 'dependsOn'],
  'field-checkbox': ['fieldName', 'label', 'fieldWidth', 'required', 'dependsOn'],
  'field-richtext': ['fieldName', 'label', 'fieldWidth', 'dependsOn'],
  'field-repeater': ['fieldName', 'label', 'buttonLabel', 'minEntries', 'dependsOn'],
  'contact-card': ['region', 'contactName', 'emails', 'phones', 'emailIcon', 'phoneIcon', 'fieldWidth'],
  'field-cta': ['label', 'link', 'variant', 'fieldWidth', 'dependsOn'],
  'field-submit': ['label', 'fieldWidth', 'dependsOn'],
};

export const PREVIOUS_FIELD_LAYOUT = {
  'field-text': ['fieldName', 'label', 'inputKind', 'required', 'dependsOn'],
  'field-select': ['fieldName', 'label', 'required', 'options', 'dependsOn'],
  'field-combined': ['fieldName', 'required', 'dependsOn'],
  'field-textarea': ['fieldName', 'label', 'maxLength', 'required', 'dependsOn'],
  'field-checkbox': ['fieldName', 'label', 'required', 'dependsOn'],
  'contact-card': ['region', 'contactName', 'emails', 'phones'],
  'field-submit': ['label', 'dependsOn'],
};

const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary'];

const normalize = (value) => String(value || '').trim().toLowerCase();
const isWidthCell = (cell) => /^(full|half)(-width)?$/i.test(textOf(cell));
const isBooleanCell = (cell) => /^(true|false)$/i.test(textOf(cell));
const isNumberCell = (cell) => /^\d+$/.test(textOf(cell));
const isVariantCell = (cell) => BUTTON_VARIANTS.includes(normalize(textOf(cell)));
const isLinkCell = (cell) => !!linkOf(cell) || /^(https?:\/\/|\/|mailto:|tel:)\S*$/i.test(textOf(cell));
const noneOf = (...tests) => (cell) => !tests.some((test) => test(cell));

/*
 * The items added after the first release (calendar, CTA, repeatable section) are read by their
 * values when a row has fewer cells than fields: AEM leaves out fields that were never stored, so
 * an optional field (the CTA's link, the section's save label) doesn't shift the ones after it
 * (utils/cells.js matchCells); a row with a cell per field is read in field order.
 */
const ITEM_MATCHERS = {
  'field-calendar': {
    fieldName: noneOf(isWidthCell, isBooleanCell),
    label: noneOf(isWidthCell, isBooleanCell),
    fieldWidth: isWidthCell,
    required: isBooleanCell,
    dependsOn: noneOf(isWidthCell, isBooleanCell),
  },
  'field-cta': {
    // any text (a label may read like a style, e.g. Secondary): it comes first
    label: noneOf(isLinkCell),
    link: isLinkCell,
    variant: isVariantCell,
    fieldWidth: isWidthCell,
    dependsOn: noneOf(isLinkCell, isVariantCell, isWidthCell),
  },
  'field-repeater': {
    fieldName: noneOf(isNumberCell),
    label: noneOf(isNumberCell),
    buttonLabel: noneOf(isNumberCell),
    minEntries: isNumberCell,
    dependsOn: noneOf(isNumberCell),
  },
};

export const ITEM_TYPES = Object.keys(FIELD_LAYOUT);
export const KEYED_TYPES = ITEM_TYPES.filter((type) => FIELD_LAYOUT[type][0] === 'fieldName');
export const keyedCells = (type) => (PREVIOUS_FIELD_LAYOUT[type] || FIELD_LAYOUT[type]).length;

const aueProp = (cell) => cell?.dataset?.aueProp || cell?.querySelector?.('[data-aue-prop]')?.dataset.aueProp || '';

export function fieldsOf(type, cells) {
  const current = FIELD_LAYOUT[type];
  const matchers = ITEM_MATCHERS[type];
  if (matchers) {
    // Universal Editor: by field name
    const named = Object.fromEntries(cells.map((cell) => [aueProp(cell), cell])
      .filter(([prop]) => current.includes(prop)));
    return Object.keys(named).length ? named : matchCells(cells, current, matchers);
  }
  const layout = cells.length < current.length && PREVIOUS_FIELD_LAYOUT[type]
    ? PREVIOUS_FIELD_LAYOUT[type]
    : current;
  return Object.fromEntries(layout.map((name, i) => [name, cells[i]]));
}

const TEMPLATE_NAMES = [
  'text-input-field', 'dropdown-select-field', 'combined-input-field', 'textarea-field',
  'consent-checkbox-field', 'rich-text-field', 'contact-card-output', 'submit-button',
];
const INPUT_KINDS = ['text', 'email', 'tel'];
const DEFAULT_MAX_LENGTH = 1500;
// the items that end a repeatable section's fields (the section takes the fields before them)
const SECTION_ENDS = ['field-repeater', 'field-checkbox', 'field-cta', 'field-submit'];

const DEFAULT_MAIL_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
const DEFAULT_PHONE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
const CALENDAR_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4.5" width="18" height="16.5" rx="2.5"></rect><line x1="3" y1="9.5" x2="21" y2="9.5"></line><line x1="8" y1="2.5" x2="8" y2="6.5"></line><line x1="16" y1="2.5" x2="16" y2="6.5"></line></svg>';
const TRASH_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>';

/*
 * The behaviour of the fields that aren't a single native control (calendar, unit selector,
 * repeatable section), by their group element (WeakMap: no expando properties on the DOM):
 * check() returns the error message ('' when valid), show(message) shows or clears it, focus()
 * moves focus to it, reset() returns it to its initial state, summary() is its value as text.
 */
const CONTROLLERS = new WeakMap();

const isTrue = (cell) => textOf(cell).toLowerCase() === 'true';
const splitList = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);
const pad = (value, size) => String(value).padStart(size, '0');
const lang = () => document.documentElement.lang || 'en';

function textCell(text) {
  const cell = document.createElement('div');
  cell.textContent = text;
  return cell;
}

export function readItem(row) {
  const cells = [...row.children];
  if (!cells.length) return { type: '', cells: [] };

  const modelAttr = row.dataset.aueModel || row.firstElementChild?.dataset?.aueModel || '';
  const firstCellText = textOf(cells[0]);
  const tokens = firstCellText.split(',').map((v) => v.trim()).filter(Boolean);

  const type = tokens.find((v) => ITEM_TYPES.includes(v)) || (ITEM_TYPES.includes(modelAttr) ? modelAttr : '');

  if (type) {
    const fields = cells.slice(1);

    if (modelAttr === type && !tokens.some((v) => ITEM_TYPES.includes(v))) {
      return { type, cells };
    }

    // the items read by their values (ITEM_MATCHERS) never take their node name as a field
    if (tokens.length === 1 || !KEYED_TYPES.includes(type) || ITEM_MATCHERS[type]) {
      return { type, cells: fields };
    }

    if (fields.length >= keyedCells(type)) {
      return { type, cells: fields };
    }

    const key = tokens.find((v) => v !== type);
    return { type, cells: [textCell(TEMPLATE_NAMES.includes(key) ? '' : key), ...fields] };
  }

  return { type: '', cells };
}

/**
 * The cell of a property row: the one with its field name (Universal Editor), else the first
 * with a value (a row may have more than one cell), else the first
 */
export function propertyCell(row) {
  const cells = [...row.children];
  return cells.find(aueProp)
    || cells.find((cell) => textOf(cell) || cell.querySelector('picture, img, a[href]'))
    || cells[0] || row;
}

/**
 * The block properties from the property cells (one per row, before the field items): by field
 * name in Universal Editor, else by the kind and order of their values
 * (form-variations-properties.js mapProperties)
 */
export function readProperties(cells) {
  const map = mapProperties(cells.map((cell) => ({
    prop: aueProp(cell),
    text: textOf(cell),
    image: !!cell.querySelector('picture, img'),
    href: cell.querySelector('a[href]')?.getAttribute('href') || '',
  })));
  const at = (name) => (map[name] === undefined ? null : cells[map[name]]);
  return {
    eyebrowCell: at('formEyebrow'),
    eyebrowIconCell: at('formEyebrowIcon'),
    titleCell: at('formHeading'),
    headingLevel: headingLevelOf(textOf(at('formHeadingLevel'))),
    descriptionCell: at('formDescription'),
    actionCell: at('formAction'),
    bgImageCell: at('bgImage'),
  };
}

function instrument(cell, el) {
  if (!cell) return;
  if (cell.children.length === 1) moveInstrumentation(cell.firstElementChild, el);
  moveInstrumentation(cell, el);
}

function createGroup(classNames, dependsOn) {
  const group = document.createElement('div');
  group.className = ['form-variations-group', ...classNames].join(' ');
  if (dependsOn) group.dataset.dependsOn = dependsOn;
  return group;
}

// the autocomplete token of a field from its type or name (WCAG 1.3.5 Identify Input Purpose)
const AUTOCOMPLETE = [
  [/first|given/, 'given-name'], [/last|surname|family/, 'family-name'], [/^(full[-_ ]?)?name$/, 'name'],
  [/e-?mail/, 'email'], [/phone|mobile|tel/, 'tel'], [/company|organi[sz]ation/, 'organization'],
  [/job|designation|position/, 'organization-title'], [/country/, 'country-name'],
  [/city|town/, 'address-level2'], [/zip|postal|post[-_ ]?code/, 'postal-code'],
];
function autocompleteOf(name, type) {
  if (type === 'email') return 'email';
  if (type === 'tel') return 'tel';
  const match = AUTOCOMPLETE.find(([pattern]) => pattern.test(name.toLowerCase()));
  return match ? match[1] : '';
}

function createLabel(id, cell, required, fallback) {
  const label = document.createElement('label');
  label.className = 'form-variations-label';
  label.htmlFor = id;
  const text = document.createElement('span');
  text.textContent = textOf(cell) || fallback;
  instrument(cell, text);
  label.append(text);
  if (required) {
    const marker = document.createElement('span');
    marker.className = 'form-variations-required';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = '*';
    label.append(marker);
  }
  return label;
}

function setRequired(control, required) {
  control.required = required;
  if (required) control.dataset.required = 'true';
}

function placeholderOf(labelCell, fallback, required) {
  const label = textOf(labelCell) || fallback;
  return required && !label.endsWith('*') ? `${label}*` : label;
}

function determineWidth(widthCell, fallbackName = '') {
  const authored = normalize(textOf(widthCell));
  if (authored === 'half-width' || authored === 'half') return 'half-width';
  if (authored === 'full-width' || authored === 'full') return 'full-width';
  if (fallbackName && fallbackName.toLowerCase().includes('name')) return 'half-width';
  return 'full-width';
}

/* aria-describedby: add or remove one id, keeping the others */
function describe(control, id, add) {
  const ids = (control.getAttribute('aria-describedby') || '').split(' ')
    .filter((value) => value && value !== id);
  if (add) ids.push(id);
  if (ids.length) control.setAttribute('aria-describedby', ids.join(' '));
  else control.removeAttribute('aria-describedby');
}

/**
 * Shows (message) or clears ('') the error of a group, below its field, linked to its controls
 * with aria-describedby (WCAG 3.3.1)
 */
function setGroupError(group, controls, errorId, message) {
  let error = group.querySelector(`#${CSS.escape(errorId)}`);
  group.classList.toggle('is-invalid', !!message);
  if (!message) {
    error?.remove();
    controls.forEach((control) => describe(control, errorId, false));
    return;
  }
  if (!error) {
    error = document.createElement('p');
    error.className = 'form-variations-error';
    error.id = errorId;
    group.append(error);
  }
  error.textContent = message;
  controls.forEach((control) => describe(control, errorId, true));
}

function buildTextField(fieldMap, nextId) {
  const {
    fieldName, label, inputKind, fieldWidth, required, dependsOn,
  } = fieldMap;
  const name = textOf(fieldName) || 'text';
  const isReq = isTrue(required);
  const kind = normalize(textOf(inputKind));
  const id = nextId(name);
  const widthClass = determineWidth(fieldWidth, name);

  const group = createGroup(['field-text', widthClass], textOf(dependsOn));
  const input = document.createElement('input');
  input.className = 'form-variations-control';
  input.type = INPUT_KINDS.includes(kind) ? kind : 'text';
  input.id = id;
  input.name = name;
  input.placeholder = placeholderOf(label, name, isReq);
  const autocomplete = autocompleteOf(name, input.type);
  if (autocomplete) input.autocomplete = autocomplete;
  setRequired(input, isReq);
  group.append(createLabel(id, label, isReq, name), input);
  return group;
}

function buildSelectField(fieldMap, nextId) {
  const {
    fieldName, label, fieldWidth, required, options, dependsOn,
  } = fieldMap;
  const name = textOf(fieldName) || 'select';
  const isReq = isTrue(required);
  const id = nextId(name);
  const widthClass = determineWidth(fieldWidth);

  const group = createGroup(['field-select', widthClass], textOf(dependsOn));
  const select = document.createElement('select');
  select.className = 'form-variations-control';
  select.id = id;
  select.name = name;
  setRequired(select, isReq);

  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = placeholderOf(label, name, isReq);
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  select.append(placeholderOption);

  const optionsList = splitList(textOf(options));
  optionsList.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
  instrument(options, select);

  group.append(createLabel(id, label, isReq, name), select);
  return group;
}

/**
 * Combined input: a text input (left half) and a unit selector (right half: a button opening a
 * listbox, the chosen unit in a hidden input named {fieldName}Unit)
 */
function buildCombinedField(fieldMap, nextId) {
  const {
    fieldName, label, options, fieldWidth, required, dependsOn,
  } = fieldMap;
  const name = textOf(fieldName) || 'score';
  const isReq = isTrue(required);
  const id = nextId(name);
  const widthClass = determineWidth(fieldWidth);
  const labelText = textOf(label) || 'SCORE';

  const group = createGroup(['field-combined', widthClass], textOf(dependsOn));
  const row = document.createElement('div');
  row.className = 'form-variations-combined-row';

  const input = document.createElement('input');
  input.className = 'form-variations-control form-variations-combined-input';
  input.type = 'text';
  input.id = id;
  input.name = name;
  input.placeholder = placeholderOf(label, 'SCORE', isReq);
  setRequired(input, isReq);

  const optionsList = splitList(textOf(options));
  const units = optionsList.length ? optionsList : ['CGPA', 'Percentage'];

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = `${name}Unit`;
  [hidden.value] = units;
  // a choice like a dropdown's: "Show only if dropdown value equals" can depend on it
  hidden.dataset.choice = 'true';

  const unit = document.createElement('div');
  unit.className = 'form-variations-combined-unit';

  // the unit selector's name (WCAG 4.1.2): the field's label and "unit", then the chosen unit
  const unitName = document.createElement('span');
  unitName.className = 'visually-hidden';
  unitName.id = `${id}-unit-name`;
  unitName.textContent = `${labelText} ${t('formUnit', 'unit')}`;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'form-variations-combined-toggle';
  toggle.setAttribute('aria-haspopup', 'listbox');
  toggle.setAttribute('aria-expanded', 'false');
  const value = document.createElement('span');
  value.className = 'form-variations-combined-value';
  value.id = `${id}-unit-value`;
  const chevron = document.createElement('span');
  chevron.className = 'form-variations-combined-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  toggle.append(value, chevron);
  toggle.setAttribute('aria-labelledby', `${unitName.id} ${value.id}`);

  const list = document.createElement('ul');
  list.className = 'form-variations-combined-options';
  list.id = `${id}-units`;
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-labelledby', unitName.id);
  list.tabIndex = -1;
  list.hidden = true;
  toggle.setAttribute('aria-controls', list.id);

  const optionEls = units.map((unitValue, index) => {
    const option = document.createElement('li');
    option.className = 'form-variations-combined-option';
    option.id = `${id}-unit-${index + 1}`;
    option.setAttribute('role', 'option');
    option.dataset.value = unitValue;
    option.textContent = unitValue;
    return option;
  });
  list.append(...optionEls);

  let active = 0;
  const setActive = (index) => {
    active = Math.max(0, Math.min(optionEls.length - 1, index));
    optionEls.forEach((option, i) => option.classList.toggle('is-active', i === active));
    list.setAttribute('aria-activedescendant', optionEls[active].id);
    optionEls[active].scrollIntoView({ block: 'nearest' });
  };

  const choose = (unitValue, notify = true) => {
    hidden.value = unitValue;
    value.textContent = unitValue;
    optionEls.forEach((option) => option.setAttribute('aria-selected', String(option.dataset.value === unitValue)));
    if (notify) {
      hidden.dispatchEvent(new Event('change', { bubbles: true }));
      hidden.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const onOutside = (e) => {
    // eslint-disable-next-line no-use-before-define
    if (!unit.contains(e.target)) close(false);
  };
  function close(returnFocus) {
    if (list.hidden) return;
    list.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', onOutside);
    if (returnFocus) toggle.focus();
  }
  const open = () => {
    list.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    setActive(Math.max(0, units.indexOf(hidden.value)));
    list.focus();
    document.addEventListener('click', onOutside);
  };

  toggle.addEventListener('click', () => (list.hidden ? open() : close(true)));
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      open();
    }
  });
  list.addEventListener('keydown', (e) => {
    const keys = {
      ArrowDown: () => setActive(active + 1),
      ArrowUp: () => setActive(active - 1),
      Home: () => setActive(0),
      End: () => setActive(optionEls.length - 1),
      Enter: () => { choose(optionEls[active].dataset.value); close(true); },
      ' ': () => { choose(optionEls[active].dataset.value); close(true); },
      Escape: () => close(true),
    };
    if (e.key === 'Tab') {
      close(false);
      return;
    }
    if (!keys[e.key]) return;
    e.preventDefault();
    keys[e.key]();
  });
  list.addEventListener('click', (e) => {
    const option = e.target.closest('[role="option"]');
    if (!option) return;
    choose(option.dataset.value);
    close(true);
  });
  list.addEventListener('focusout', (e) => {
    if (!unit.contains(e.relatedTarget)) close(false);
  });

  choose(units[0], false);
  unit.append(unitName, toggle, list);
  row.append(input, unit);
  group.append(createLabel(id, label, isReq, 'SCORE'), row, hidden);

  CONTROLLERS.set(group, {
    reset: () => { close(false); choose(units[0], false); },
    summary: () => {
      const score = input.value.trim();
      if (!score) return '';
      return normalize(hidden.value) === 'percentage' ? `${score}%` : `${score} ${hidden.value}`;
    },
  });
  return group;
}

function buildTextareaField(fieldMap, nextId) {
  const {
    fieldName, label, maxLength, fieldWidth, required, dependsOn,
  } = fieldMap;
  const name = textOf(fieldName) || 'message';
  const isReq = isTrue(required);
  const id = nextId(name);
  const parsed = parseInt(textOf(maxLength), 10);
  const limit = parsed > 0 ? parsed : DEFAULT_MAX_LENGTH;
  const widthClass = determineWidth(fieldWidth);

  const group = createGroup(['field-textarea', widthClass], textOf(dependsOn));
  const textarea = document.createElement('textarea');
  textarea.className = 'form-variations-control';
  textarea.id = id;
  textarea.name = name;
  textarea.placeholder = placeholderOf(label, name, isReq);
  textarea.maxLength = limit;
  textarea.rows = 4;
  setRequired(textarea, isReq);

  const counter = document.createElement('span');
  counter.className = 'form-variations-counter';
  counter.id = `${id}-counter`;
  const update = () => {
    const count = textarea.value.length;
    counter.textContent = `${count}/${limit}`;
  };
  textarea.setAttribute('aria-describedby', counter.id);
  textarea.addEventListener('input', update);
  update();

  group.append(createLabel(id, label, isReq, name), textarea, counter);
  return group;
}

/* the calendar's date parts, in the order typed: mm / dd / yyyy */
const DATE_PARTS = [
  {
    key: 'month', size: 2, min: 1, max: 12, placeholder: 'mm', label: ['dateMonth', 'Month'],
  },
  {
    key: 'day', size: 2, min: 1, max: 31, placeholder: 'dd', label: ['dateDay', 'Day'],
  },
  {
    key: 'year', size: 4, min: 1000, max: 9999, placeholder: 'yyyy', label: ['dateYear', 'Year'],
  },
];

/** a real calendar date, or null (e.g. 02/31) */
function dateOf(year, month, day) {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date : null;
}
const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const sameDay = (a, b) => !!a && !!b && a.getTime() === b.getTime();
/* the same day a month earlier or later, the last day of that month when it is shorter */
const sameDayOfMonth = (date, months) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + months + 1, 0).getDate();
  return new Date(date.getFullYear(), date.getMonth() + months, Math.min(date.getDate(), lastDay));
};
const addDays = (date, days) => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() + days,
);

/**
 * Calendar / date field: the label as placeholder, then (focused or filled) the label above three
 * date segments, mm / dd / yyyy, and a calendar popup (Today, Clear). The date is submitted as
 * yyyy-mm-dd in a hidden input named {fieldName}.
 */
function buildCalendarField(fieldMap, nextId) {
  const {
    fieldName, label, fieldWidth, required, dependsOn,
  } = fieldMap;
  const name = textOf(fieldName) || 'date';
  const isReq = isTrue(required);
  const id = nextId(name);
  const labelText = textOf(label) || name;

  const group = createGroup(['field-calendar', determineWidth(fieldWidth)], textOf(dependsOn));
  // validated and reset as a whole (CONTROLLERS), not by its segment inputs
  group.dataset.controlled = 'true';

  const caption = document.createElement('span');
  caption.className = 'form-variations-calendar-label';
  caption.id = `${id}-label`;
  caption.textContent = labelText;
  instrument(label, caption);

  const row = document.createElement('div');
  row.className = 'form-variations-calendar-row';

  const placeholder = document.createElement('span');
  placeholder.className = 'form-variations-calendar-placeholder';
  placeholder.setAttribute('aria-hidden', 'true');
  placeholder.textContent = placeholderOf(label, name, isReq);

  const segmentGroup = document.createElement('div');
  segmentGroup.className = 'form-variations-calendar-segments';
  segmentGroup.setAttribute('role', 'group');
  segmentGroup.setAttribute('aria-labelledby', caption.id);

  const segments = DATE_PARTS.map((part) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.autocomplete = 'off';
    input.className = 'form-variations-calendar-segment';
    input.dataset.part = part.key;
    input.placeholder = part.placeholder;
    input.maxLength = part.size;
    input.size = part.size;
    input.setAttribute('aria-label', t(...part.label));
    if (isReq) input.setAttribute('aria-required', 'true');
    return input;
  });
  segments.forEach((input, index) => {
    if (index) {
      const separator = document.createElement('span');
      separator.className = 'form-variations-calendar-separator';
      separator.setAttribute('aria-hidden', 'true');
      separator.textContent = '/';
      segmentGroup.append(separator);
    }
    segmentGroup.append(input);
  });

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = name;
  hidden.id = id;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'form-variations-calendar-toggle';
  toggle.setAttribute('aria-label', `${t('chooseDate', 'Choose date')}: ${labelText}`);
  toggle.setAttribute('aria-haspopup', 'dialog');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = CALENDAR_ICON;

  const popup = document.createElement('div');
  popup.className = 'form-variations-calendar-popup';
  popup.id = `${id}-calendar`;
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-label', labelText);
  popup.hidden = true;
  toggle.setAttribute('aria-controls', popup.id);

  const head = document.createElement('div');
  head.className = 'form-variations-calendar-head';
  const title = document.createElement('p');
  title.className = 'form-variations-calendar-title';
  title.id = `${id}-month`;
  title.setAttribute('aria-live', 'polite');
  const navButton = (className, key, fallback) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `form-variations-calendar-nav ${className}`;
    button.setAttribute('aria-label', t(key, fallback));
    return button;
  };
  const previous = navButton('form-variations-calendar-previous', 'previousMonth', 'Previous month');
  const next = navButton('form-variations-calendar-next', 'nextMonth', 'Next month');
  const nav = document.createElement('div');
  nav.className = 'form-variations-calendar-navs';
  nav.append(previous, next);
  head.append(title, nav);

  const grid = document.createElement('table');
  grid.className = 'form-variations-calendar-grid';
  grid.setAttribute('aria-labelledby', title.id);
  const weekdays = document.createElement('thead');
  const weekdayRow = document.createElement('tr');
  // Su to Sa: the weekday names of the page's language (1 November 2026 is a Sunday)
  const shortDay = new Intl.DateTimeFormat(lang(), { weekday: 'short' });
  const longDay = new Intl.DateTimeFormat(lang(), { weekday: 'long' });
  for (let i = 0; i < 7; i += 1) {
    const day = new Date(2026, 10, 1 + i);
    const th = document.createElement('th');
    th.scope = 'col';
    th.abbr = longDay.format(day);
    const short = shortDay.format(day);
    th.textContent = lang().startsWith('en') ? short.slice(0, 2) : short;
    weekdayRow.append(th);
  }
  weekdays.append(weekdayRow);
  const days = document.createElement('tbody');
  grid.append(weekdays, days);

  const foot = document.createElement('div');
  foot.className = 'form-variations-calendar-foot';
  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'form-variations-calendar-action';
  clear.textContent = t('clear', 'Clear');
  const today = document.createElement('button');
  today.type = 'button';
  today.className = 'form-variations-calendar-action';
  today.textContent = t('today', 'Today');
  foot.append(clear, today);
  popup.append(head, grid, foot);

  const monthTitle = new Intl.DateTimeFormat(lang(), { month: 'long', year: 'numeric' });
  const fullDate = new Intl.DateTimeFormat(lang(), {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  let view = startOfDay(new Date());
  let focusDate = null;

  const values = () => Object.fromEntries(segments.map((s) => [s.dataset.part, s.value]));
  const selected = () => {
    const { month, day, year } = values();
    if (month.length !== 2 || day.length !== 2 || year.length !== 4) return null;
    return dateOf(Number(year), Number(month), Number(day));
  };

  const check = () => {
    const { month, day, year } = values();
    if (!month && !day && !year) return isReq ? t('fieldMandatory', 'This Field Is Mandatory') : '';
    return selected() ? '' : t('fieldDate', 'Enter a valid date.');
  };

  const show = (message) => {
    setGroupError(group, segments, `${id}-error`, message);
    const date = selected();
    segments.forEach((segment) => {
      if (message && (!segment.value || !date)) segment.setAttribute('aria-invalid', 'true');
      else segment.removeAttribute('aria-invalid');
    });
  };

  const sync = () => {
    const date = selected();
    hidden.value = date
      ? `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}` : '';
    group.classList.toggle('has-value', segments.some((segment) => segment.value));
    if (group.classList.contains('is-invalid') && !check()) show('');
    // the form's submit state and a repeatable section's Save Details follow it
    hidden.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const setDate = (date) => {
    segments[0].value = pad(date.getMonth() + 1, 2);
    segments[1].value = pad(date.getDate(), 2);
    segments[2].value = pad(date.getFullYear(), 4);
    sync();
  };

  const clearDate = () => {
    segments.forEach((segment) => { segment.value = ''; });
    group.classList.remove('is-active');
    show('');
    sync();
  };

  function render() {
    const now = startOfDay(new Date());
    const chosen = selected();
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const start = addDays(first, -first.getDay());
    if (!focusDate || focusDate.getMonth() !== view.getMonth()
      || focusDate.getFullYear() !== view.getFullYear()) {
      const inView = (date) => date && date.getMonth() === view.getMonth()
        && date.getFullYear() === view.getFullYear();
      if (inView(chosen)) focusDate = chosen;
      else if (inView(now)) focusDate = now;
      else focusDate = first;
    }
    title.textContent = monthTitle.format(first);
    const rows = [];
    for (let week = 0; week < 6; week += 1) {
      const tr = document.createElement('tr');
      for (let weekday = 0; weekday < 7; weekday += 1) {
        const date = addDays(start, week * 7 + weekday);
        const td = document.createElement('td');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'form-variations-calendar-day';
        button.textContent = String(date.getDate());
        button.dataset.date = String(date.getTime());
        button.setAttribute('aria-label', fullDate.format(date));
        button.tabIndex = sameDay(date, focusDate) ? 0 : -1;
        if (date.getMonth() !== view.getMonth()) button.classList.add('is-outside');
        if (date < now) button.classList.add('is-past');
        if (sameDay(date, now)) {
          button.classList.add('is-today');
          button.setAttribute('aria-current', 'date');
        }
        if (sameDay(date, chosen)) {
          button.classList.add('is-selected');
          button.setAttribute('aria-pressed', 'true');
        }
        td.append(button);
        tr.append(td);
      }
      rows.push(tr);
    }
    days.replaceChildren(...rows);
  }

  const focusDay = () => days.querySelector('[tabindex="0"]')?.focus();

  const onOutside = (e) => {
    // eslint-disable-next-line no-use-before-define
    if (!group.contains(e.target)) closePopup(false);
  };
  function closePopup(returnFocus) {
    if (popup.hidden) return;
    popup.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', onOutside);
    if (returnFocus) toggle.focus();
  }
  const openPopup = () => {
    const chosen = selected();
    view = chosen || startOfDay(new Date());
    focusDate = null;
    render();
    popup.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    group.classList.add('is-active');
    document.addEventListener('click', onOutside);
    focusDay();
  };

  const moveFocus = (date) => {
    focusDate = date;
    if (date.getMonth() !== view.getMonth() || date.getFullYear() !== view.getFullYear()) {
      view = new Date(date.getFullYear(), date.getMonth(), 1);
    }
    render();
    focusDay();
  };

  const shiftMonth = (months) => {
    view = new Date(view.getFullYear(), view.getMonth() + months, 1);
    const lastDay = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const day = Math.min(focusDate?.getDate() || 1, lastDay);
    focusDate = new Date(view.getFullYear(), view.getMonth(), day);
    render();
  };

  toggle.addEventListener('click', () => (popup.hidden ? openPopup() : closePopup(true)));
  previous.addEventListener('click', () => shiftMonth(-1));
  next.addEventListener('click', () => shiftMonth(1));
  days.addEventListener('click', (e) => {
    const button = e.target.closest('.form-variations-calendar-day');
    if (!button) return;
    setDate(new Date(Number(button.dataset.date)));
    closePopup(true);
  });
  days.addEventListener('keydown', (e) => {
    const button = e.target.closest('.form-variations-calendar-day');
    if (!button) return;
    const date = new Date(Number(button.dataset.date));
    const moves = {
      ArrowLeft: () => addDays(date, -1),
      ArrowRight: () => addDays(date, 1),
      ArrowUp: () => addDays(date, -7),
      ArrowDown: () => addDays(date, 7),
      Home: () => addDays(date, -date.getDay()),
      End: () => addDays(date, 6 - date.getDay()),
      PageUp: () => sameDayOfMonth(date, -1),
      PageDown: () => sameDayOfMonth(date, 1),
    };
    if (!moves[e.key]) return;
    e.preventDefault();
    moveFocus(moves[e.key]());
  });
  today.addEventListener('click', () => {
    setDate(startOfDay(new Date()));
    closePopup(true);
  });
  clear.addEventListener('click', () => {
    closePopup(true);
    clearDate();
  });
  popup.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    e.preventDefault();
    e.stopPropagation();
    closePopup(true);
  });

  /* the segments: digits move on to the next part, arrows move between parts or step a value */
  segments.forEach((input, index) => {
    const part = DATE_PARTS[index];
    const go = (offset) => {
      const target = segments[index + offset];
      if (!target) return;
      target.focus();
      target.select();
    };
    input.addEventListener('focus', () => {
      group.classList.add('is-active');
      input.select();
    });
    input.addEventListener('input', () => {
      let digits = input.value.replace(/\D/g, '').slice(0, part.size);
      // a first digit no two-digit value can start (month 2-9, day 4-9) completes the part
      if (part.size === 2 && digits.length === 1 && Number(digits) * 10 > part.max) digits = `0${digits}`;
      if (part.size === 2 && digits.length === 2) {
        digits = pad(Math.max(part.min, Math.min(part.max, Number(digits))), 2);
      }
      input.value = digits;
      sync();
      if (digits.length === part.size) go(1);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight' || e.key === '/' || e.key === '-') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        if (input.value) {
          input.value = '';
          sync();
        } else if (e.key === 'Backspace') {
          go(-1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const step = e.key === 'ArrowUp' ? 1 : -1;
        const base = Number(input.value) || (part.key === 'year' ? new Date().getFullYear() - step : part.min - step);
        let stepped = base + step;
        if (stepped > part.max) stepped = part.min;
        if (stepped < part.min) stepped = part.max;
        input.value = pad(stepped, part.size);
        sync();
        input.select();
      }
    });
  });

  // a click on the field (not on a segment or the calendar button) starts the date at its first
  // empty part
  row.addEventListener('click', (e) => {
    if (e.target.closest('input, button, .form-variations-calendar-popup')) return;
    (segments.find((segment) => !segment.value) || segments[0]).focus();
  });
  // checked a frame later: moving through the days re-renders them, and the focused day leaving
  // the page would otherwise read as focus leaving the field
  group.addEventListener('focusout', () => requestAnimationFrame(() => {
    if (group.contains(document.activeElement)) return;
    closePopup(false);
    if (!segments.some((segment) => segment.value) && !group.classList.contains('is-invalid')) {
      group.classList.remove('is-active');
    }
  }));

  row.append(placeholder, segmentGroup, toggle, popup);
  group.append(caption, row, hidden);

  CONTROLLERS.set(group, {
    check,
    show: (message) => {
      if (message) group.classList.add('is-active');
      show(message);
    },
    focus: () => (segments.find((segment) => !segment.value) || segments[0]).focus(),
    reset: () => {
      closePopup(false);
      segments.forEach((segment) => { segment.value = ''; });
      hidden.value = '';
      group.classList.remove('is-active', 'has-value');
      show('');
    },
    summary: () => {
      const date = selected();
      return date ? `${pad(date.getMonth() + 1, 2)}/${pad(date.getDate(), 2)}/${date.getFullYear()}` : '';
    },
  });
  return group;
}

function buildCheckboxField(fieldMap, nextId) {
  const {
    fieldName, label, fieldWidth, required, dependsOn,
  } = fieldMap;
  const name = textOf(fieldName) || 'consent';
  const isReq = isTrue(required);
  const id = nextId(name);
  const widthClass = determineWidth(fieldWidth);

  const group = createGroup(['field-checkbox', widthClass], textOf(dependsOn));
  const input = document.createElement('input');
  input.className = 'form-variations-checkbox';
  input.type = 'checkbox';
  input.id = id;
  input.name = name;
  input.value = 'true';
  setRequired(input, isReq);

  const lbl = document.createElement('label');
  lbl.className = 'form-variations-checkbox-label';
  lbl.htmlFor = id;
  const text = document.createElement('span');
  text.className = 'form-variations-consent';
  if (label) {
    text.append(...label.childNodes);
    moveInstrumentation(label, text);
  }
  if (!text.textContent.trim()) text.textContent = name;
  lbl.append(text);
  if (isReq) {
    const marker = document.createElement('span');
    marker.className = 'form-variations-required';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = '*';
    lbl.append(marker);
  }
  group.append(input, lbl);
  return group;
}

function buildRichtextField(fieldMap) {
  const {
    fieldName, label, fieldWidth, dependsOn,
  } = fieldMap;
  const widthClass = determineWidth(fieldWidth);
  const group = createGroup(['field-richtext', widthClass], textOf(dependsOn));

  const contentDiv = document.createElement('div');
  contentDiv.className = 'form-variations-richtext-content';
  if (label) {
    contentDiv.append(...label.childNodes);
    moveInstrumentation(label, contentDiv);
  } else {
    contentDiv.textContent = textOf(fieldName);
  }

  group.append(contentDiv);
  return group;
}

function buildContactCard(fieldMap) {
  const {
    region, contactName, emails, phones, emailIcon, phoneIcon, fieldWidth,
  } = fieldMap;
  const widthClass = determineWidth(fieldWidth);
  const card = createGroup(['form-variations-contact-card', widthClass], textOf(region));

  const name = document.createElement('h3');
  name.className = 'form-variations-contact-name';
  name.textContent = textOf(contactName);
  instrument(contactName, name);
  card.append(name);

  const emailIconUrl = linkOf(emailIcon)?.getAttribute('href') || textOf(emailIcon);
  const phoneIconUrl = linkOf(phoneIcon)?.getAttribute('href') || textOf(phoneIcon);

  const linksList = document.createElement('ul');
  linksList.className = 'form-variations-contact-links';

  splitList(textOf(emails)).forEach((email) => {
    const li = document.createElement('li');
    li.className = 'form-variations-contact-item';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'form-variations-contact-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    if (emailIconUrl) {
      const img = document.createElement('img');
      img.src = emailIconUrl;
      // decorative: the address next to it says what it is
      img.alt = '';
      iconSpan.append(img);
    } else {
      iconSpan.innerHTML = DEFAULT_MAIL_ICON;
    }

    const a = document.createElement('a');
    a.href = `mailto:${email}`;
    a.textContent = email;

    li.append(iconSpan, a);
    linksList.append(li);
  });

  splitList(textOf(phones)).forEach((phone) => {
    const li = document.createElement('li');
    li.className = 'form-variations-contact-item';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'form-variations-contact-icon';
    iconSpan.setAttribute('aria-hidden', 'true');
    if (phoneIconUrl) {
      const img = document.createElement('img');
      img.src = phoneIconUrl;
      img.alt = '';
      iconSpan.append(img);
    } else {
      iconSpan.innerHTML = DEFAULT_PHONE_ICON;
    }

    const a = document.createElement('a');
    a.href = telHref(phone) || `tel:${phone.replace(/[^\d+]/g, '')}`;
    a.textContent = phone;

    li.append(iconSpan, a);
    linksList.append(li);
  });

  if (linksList.children.length) card.append(linksList);
  return card;
}

/**
 * CTA button: a link styled as a button when a link is authored, else a button (type button: it
 * doesn't submit the form); Primary, Secondary or Tertiary (decorators/button-decorator.js)
 */
function buildCta(fieldMap) {
  const {
    label, link, variant, fieldWidth, dependsOn,
  } = fieldMap;
  const group = createGroup(['field-cta', determineWidth(fieldWidth)], textOf(dependsOn));
  const style = normalize(textOf(variant));
  const href = linkOf(link)?.getAttribute('href') || textOf(link);
  let cta;
  if (href && isSafeUrl(href)) {
    cta = document.createElement('a');
    cta.href = href;
  } else {
    cta = document.createElement('button');
    cta.type = 'button';
  }
  cta.textContent = textOf(label) || t('learnMore', 'Learn more');
  instrument(label, cta);
  decorateButton(cta, { view: 'button', type: BUTTON_VARIANTS.includes(style) ? style : 'primary' });
  cta.classList.add('form-variations-cta');
  group.append(cta);
  return group;
}

function buildSubmit(fieldMap) {
  const { label, fieldWidth, dependsOn } = fieldMap;
  const widthClass = determineWidth(fieldWidth);
  const group = createGroup(['field-submit', widthClass], textOf(dependsOn));
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'button';
  button.textContent = textOf(label) || t('send', 'Send');
  instrument(label, button);
  group.append(button);
  return group;
}

/* the value of a field as shown in a saved entry of a repeatable section */
function summaryOf(group) {
  const controller = CONTROLLERS.get(group);
  if (controller?.summary) return controller.summary();
  const control = group.querySelector('input:not([type="hidden"]), select, textarea');
  if (!control) return '';
  if (control.tagName === 'SELECT') return control.value ? control.selectedOptions[0]?.textContent.trim() || '' : '';
  if (control.type === 'checkbox') return control.checked ? t('yes', 'Yes') : '';
  return control.value.trim();
}

/* a field group back to its initial state (form reset, a saved entry) */
function resetGroup(group) {
  group.querySelectorAll('input, select, textarea').forEach((control) => {
    if (control.closest('[data-controlled]') || control.type === 'hidden') return;
    if (control.tagName === 'SELECT') control.selectedIndex = 0;
    else if (control.type === 'checkbox') control.checked = false;
    else control.value = '';
    control.removeAttribute('aria-invalid');
    if (control.id) describe(control, `${control.id}-error`, false);
    if (control.tagName === 'TEXTAREA') control.dispatchEvent(new Event('input'));
  });
  group.querySelectorAll(':scope > .form-variations-error').forEach((error) => error.remove());
  CONTROLLERS.get(group)?.reset?.();
}

function errorOf(control) {
  const { validity } = control;
  if (validity.valueMissing) {
    return t('fieldMandatory', 'This Field Is Mandatory');
  }
  if (validity.typeMismatch && control.type === 'email') {
    return t('fieldEmail', 'Enter a valid email address.');
  }
  if (validity.typeMismatch || validity.patternMismatch) {
    return t('fieldFormat', 'Enter a valid value.');
  }
  if (validity.tooLong) {
    return t('fieldTooLong', 'This text is too long.');
  }
  return control.validationMessage;
}

function showError(control, message) {
  const id = `${control.id}-error`;
  let error = control.form?.querySelector(`#${CSS.escape(id)}`);
  if (!error) {
    error = document.createElement('p');
    error.className = 'form-variations-error';
    error.id = id;
    control.closest('.form-variations-group')?.append(error);
  }
  error.textContent = message;
  control.setAttribute('aria-invalid', 'true');
  describe(control, id, true);
}

function clearError(control) {
  control.removeAttribute('aria-invalid');
  const id = `${control.id}-error`;
  control.form?.querySelector(`#${CSS.escape(id)}`)?.remove();
  describe(control, id, false);
}

/**
 * The checks of the fields in root, in page order: native controls by their constraints, the
 * other fields by their controller (CONTROLLERS); disabled and hidden fields (Show only if) are
 * left out, and so is what skip() returns true for
 */
function checksOf(root, skip = () => false) {
  const checks = [];
  root.querySelectorAll('input, select, textarea, .form-variations-group').forEach((el) => {
    if (skip(el)) return;
    if (el.classList.contains('form-variations-group')) {
      const controller = CONTROLLERS.get(el);
      if (controller?.check && !el.closest('[hidden]')) checks.push(controller);
      return;
    }
    if (el.disabled || ['hidden', 'submit', 'button'].includes(el.type)
      || el.closest('[data-controlled]')) return;
    checks.push({
      check: () => (el.checkValidity() ? '' : errorOf(el)),
      show: (message) => (message ? showError(el, message) : clearError(el)),
      focus: () => el.focus(),
    });
  });
  return checks;
}

/** whether all the checks pass; with show, their errors are shown and the first gets focus */
function passes(checks, show) {
  const invalid = checks.filter((item) => {
    const message = item.check();
    if (show) item.show(message);
    return !!message;
  });
  if (show) invalid[0]?.focus();
  return !invalid.length;
}

const inSection = (el) => !!el.closest('.form-variations-repeater-fields');

/**
 * Repeatable section (e.g. ACADEMIC BACKGROUND): the fields after it (moved in by
 * groupSections) are filled and saved as entries, shown above them, one card per entry with its
 * values and a delete button; the entries are submitted as a list (JSON) in a hidden input named
 * {fieldName}; Minimum entries must be saved before the form can be sent
 */
function buildRepeater(fieldMap, nextId) {
  const {
    fieldName, label, buttonLabel, minEntries, dependsOn,
  } = fieldMap;
  const name = textOf(fieldName) || 'entries';
  const id = nextId(name);
  const parsed = parseInt(textOf(minEntries), 10);
  const min = Number.isNaN(parsed) ? 1 : Math.max(0, parsed);

  const group = createGroup(['field-repeater', 'full-width'], textOf(dependsOn));
  group.setAttribute('role', 'group');

  const heading = document.createElement('p');
  heading.className = 'form-variations-repeater-heading';
  heading.id = `${id}-heading`;
  heading.textContent = textOf(label) || name;
  instrument(label, heading);
  group.setAttribute('aria-labelledby', heading.id);

  const list = document.createElement('ul');
  list.className = 'form-variations-repeater-entries';
  list.setAttribute('aria-label', t('savedEntries', 'Saved entries'));
  list.hidden = true;

  const fields = document.createElement('div');
  fields.className = 'form-variations-repeater-fields';

  const actions = document.createElement('div');
  actions.className = 'form-variations-repeater-actions';
  const save = document.createElement('button');
  save.type = 'button';
  save.textContent = textOf(buttonLabel) || t('saveDetails', 'Save Details');
  instrument(buttonLabel, save);
  decorateButton(save, { view: 'button', type: 'secondary' });
  save.classList.add('form-variations-repeater-save');
  save.setAttribute('aria-disabled', 'true');
  actions.append(save);

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = name;
  hidden.value = '[]';
  hidden.dataset.json = 'true';

  const status = document.createElement('p');
  status.className = 'visually-hidden';
  status.setAttribute('role', 'status');

  let entries = [];
  const fieldGroups = () => [...fields.querySelectorAll(':scope > .form-variations-group')]
    .filter((child) => !child.hidden);

  const store = () => {
    hidden.value = JSON.stringify(entries.map((entry) => entry.values));
    hidden.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const check = () => (entries.length < min
    ? t('repeaterMinimum', 'Save at least {count} entries.', { count: min }) : '');
  const show = (message) => setGroupError(group, [save], `${id}-error`, message);

  const refresh = () => {
    const ready = passes(checksOf(fields), false);
    save.classList.toggle('is-ready', ready);
    save.setAttribute('aria-disabled', String(!ready));
    if (group.classList.contains('is-invalid') && !check()) show('');
  };

  // eslint-disable-next-line no-use-before-define
  const removeAt = (index) => { entries.splice(index, 1); store(); render(); };

  function render() {
    list.replaceChildren(...entries.map((entry, index) => {
      const item = document.createElement('li');
      item.className = 'form-variations-repeater-entry';
      entry.summary.filter(Boolean).forEach((text) => {
        const value = document.createElement('span');
        value.className = 'form-variations-repeater-value';
        value.textContent = text;
        item.append(value);
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'form-variations-repeater-delete';
      remove.setAttribute('aria-label', t('deleteEntry', 'Delete entry {number}', { number: index + 1 }));
      remove.innerHTML = TRASH_ICON;
      remove.addEventListener('click', () => {
        removeAt(index);
        status.textContent = t('entryDeleted', 'Entry deleted.');
        const buttons = list.querySelectorAll('.form-variations-repeater-delete');
        (buttons[Math.min(index, buttons.length - 1)] || fieldGroups()[0]?.querySelector('input, select, textarea, button') || save).focus();
        refresh();
      });
      item.append(remove);
      return item;
    }));
    list.hidden = !entries.length;
  }

  save.addEventListener('click', () => {
    if (!passes(checksOf(fields), true)) {
      refresh();
      return;
    }
    const values = {};
    fields.querySelectorAll('[data-field-name]').forEach((control) => {
      if (control.disabled) return;
      values[control.dataset.fieldName] = control.type === 'checkbox' ? control.checked : control.value;
    });
    entries.push({ values, summary: fieldGroups().map(summaryOf) });
    store();
    render();
    fieldGroups().forEach(resetGroup);
    status.textContent = t('entrySaved', 'Entry saved.');
    refresh();
  });

  group.append(heading, list, fields, actions, hidden, status);
  CONTROLLERS.set(group, {
    check,
    show,
    focus: () => (fieldGroups()[0]?.querySelector('input, select, textarea') || save).focus(),
    reset: () => {
      entries = [];
      store();
      render();
      fieldGroups().forEach(resetGroup);
      show('');
      refresh();
    },
    refresh,
  });
  return group;
}

const BUILDERS = {
  'field-text': buildTextField,
  'field-select': buildSelectField,
  'field-combined': buildCombinedField,
  'field-textarea': buildTextareaField,
  'field-calendar': buildCalendarField,
  'field-checkbox': buildCheckboxField,
  'field-richtext': buildRichtextField,
  'field-repeater': buildRepeater,
  'contact-card': buildContactCard,
  'field-cta': buildCta,
  'field-submit': buildSubmit,
};

/**
 * Moves the fields after each repeatable section into it, up to the next section, consent
 * checkbox, CTA or submit button; their controls keep their names as data-field-name, so they are
 * saved with the section's entries, not submitted or validated on their own
 */
function groupSections(form) {
  let fields = null;
  [...form.children].forEach((el) => {
    if (el.classList.contains('field-repeater')) {
      fields = el.querySelector('.form-variations-repeater-fields');
      return;
    }
    if (SECTION_ENDS.some((type) => el.classList.contains(type))) {
      fields = null;
      return;
    }
    if (!fields) return;
    el.querySelectorAll('[name]').forEach((control) => {
      control.dataset.fieldName = control.getAttribute('name');
      control.removeAttribute('name');
    });
    fields.append(el);
  });
}

function updateVisibility(form, editing) {
  const conditional = [...form.querySelectorAll('[data-depends-on]')];
  if (!conditional.length) return;

  for (let pass = 0; pass <= conditional.length; pass += 1) {
    const selected = [...form.querySelectorAll('select, input[data-choice]')]
      .filter((control) => !control.disabled && control.value)
      .map((control) => normalize(control.value));

    const before = conditional.map((el) => el.hidden).join();

    conditional.forEach((el) => {
      const targetValue = normalize(el.dataset.dependsOn);
      const visible = editing || selected.includes(targetValue);

      el.hidden = !visible;

      el.querySelectorAll('input, select, textarea, button').forEach((control) => {
        control.disabled = !visible;
        if (control.dataset.required) control.required = visible;
      });
    });

    if (conditional.map((el) => el.hidden).join() === before) break;
  }
}

function collectData(form) {
  const data = {};
  new FormData(form).forEach((value, key) => {
    if (!(key in data)) data[key] = value;
    else data[key] = [].concat(data[key], value);
  });
  // repeatable sections: their saved entries as a list
  form.querySelectorAll('input[data-json][name]').forEach((input) => {
    if (!(input.name in data)) return;
    try {
      data[input.name] = JSON.parse(input.value || '[]');
    } catch {
      data[input.name] = [];
    }
  });
  return data;
}

/** the form's fields, the repeatable sections' own fields left out (they are saved as entries) */
const formChecks = (form) => checksOf(form, inSection);

function validate(form) {
  return passes(formChecks(form), true);
}

export default async function decorate(block) {
  t = await getPlaceholders();
  const nextId = createIdFactory(uniqueId('form-variations'));
  const editing = isInEditor(block);

  const isDark = block.classList.contains('dark');
  if (isDark) {
    block.classList.add('dark');
  }

  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'form-variations-inner';

  const form = document.createElement('form');
  form.className = 'form-variations-form';
  form.noValidate = true;

  const properties = [];
  let itemsStarted = false;
  [...block.children].forEach((row) => {
    const { type, cells } = readItem(row);
    if (!type) {
      if (!itemsStarted) properties.push(propertyCell(row));
      return;
    }
    itemsStarted = true;
    const fieldMap = fieldsOf(type, cells);
    const el = BUILDERS[type](fieldMap, nextId);
    moveInstrumentation(row, el);
    form.append(el);
  });
  groupSections(form);

  const {
    eyebrowCell, eyebrowIconCell, titleCell, headingLevel, descriptionCell, actionCell, bgImageCell,
  } = readProperties(properties);
  const actionLink = linkOf(actionCell);
  const action = actionLink?.getAttribute('href') || textOf(actionCell);

  const authoredBg = pictureOf(bgImageCell)?.querySelector('img')?.src
    || linkOf(bgImageCell)?.getAttribute('href')
    || textOf(bgImageCell);
  const section = block.closest('.section');
  const sectionImg = [...(section?.querySelectorAll('picture img') || [])]
    .find((img) => !block.contains(img));
  const bgUrl = authoredBg || sectionImg?.src;

  if (section && bgUrl) {
    section.classList.add('form-variations-backdrop');
    section.style.setProperty('--form-variations-backdrop-image', `url('${bgUrl}')`);
    const backdrop = new Image();
    backdrop.addEventListener('load', () => {
      const portrait = backdrop.naturalWidth < backdrop.naturalHeight;
      section.classList.toggle('form-variations-portrait', portrait);
      if (portrait) {
        section.style.setProperty('--form-variations-backdrop-width', `${(backdrop.naturalWidth / backdrop.naturalHeight) * 100}vh`);
      }
    });
    backdrop.src = bgUrl;
    if (sectionImg) sectionImg.closest('picture')?.remove();
  }

  const backBtn = document.createElement('button');
  backBtn.className = 'form-variations-back';
  backBtn.setAttribute('type', 'button');
  backBtn.textContent = t('back', 'Back');
  backBtn.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  });

  const header = document.createElement('div');
  header.className = 'form-variations-header';

  const eyebrowText = textOf(eyebrowCell);
  if (eyebrowText) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'form-variations-eyebrow';

    const eyebrowIconPicture = pictureOf(eyebrowIconCell);
    const eyebrowIconImage = eyebrowIconPicture?.querySelector('img');
    const eyebrowIconUrl = eyebrowIconImage?.src
      || linkOf(eyebrowIconCell)?.getAttribute('href')
      || textOf(eyebrowIconCell);

    // Only render the icon element if an asset is authored
    if (eyebrowIconPicture && eyebrowIconImage) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'form-variations-eyebrow-icon';
      iconSpan.append(eyebrowIconPicture);
      eyebrow.append(iconSpan);
    } else if (eyebrowIconUrl) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'form-variations-eyebrow-icon';
      const img = document.createElement('img');
      img.src = eyebrowIconUrl;
      img.alt = '';
      iconSpan.append(img);
      eyebrow.append(iconSpan);
    }

    const labelSpan = document.createElement('span');
    labelSpan.textContent = eyebrowText;
    instrument(eyebrowCell, labelSpan);

    eyebrow.append(labelSpan);
    header.append(eyebrow);
  }

  // Heading level (h1 to h6): the title's tag and the site's size of that level; not chosen: h2
  // at the form's own size
  const title = titleCell ? buildHeading(titleCell, null, 'form-variations-title', headingLevel || 'h2') : null;
  if (title && headingLevel) title.classList.add(`form-variations-title-${headingLevel}`);
  if (title) header.append(title);
  if (descriptionCell && textOf(descriptionCell)) {
    header.append(fromCell(descriptionCell, 'div', 'form-variations-description'));
  }
  if (title) {
    title.id = nextId('title');
    form.setAttribute('aria-labelledby', title.id);
  }

  const status = document.createElement('p');
  status.className = 'form-variations-status';
  status.setAttribute('role', 'status');
  status.tabIndex = -1;

  /*
   * Submit and Save Details look inactive (aria-disabled) until their fields are complete; they
   * stay operable, so pressing them shows what is missing
   */
  const refresh = () => {
    const ready = passes(formChecks(form), false);
    form.querySelectorAll('.field-submit button[type="submit"]').forEach((button) => {
      button.classList.toggle('is-ready', ready);
      if (form.getAttribute('aria-busy') !== 'true') button.setAttribute('aria-disabled', String(!ready));
    });
    form.querySelectorAll('.field-repeater').forEach((group) => CONTROLLERS.get(group)?.refresh?.());
  };

  form.addEventListener('change', (e) => {
    if (e.target.matches('select, input[data-choice]')) updateVisibility(form, editing);
    refresh();
  });

  // the outcome for the data layer (decorators/data-layer-decorator.js): cmp:formSuccess /
  // cmp:formError
  const announce = (ok, reason = '') => form.dispatchEvent(new CustomEvent('form:result', {
    bubbles: true, detail: { ok, reason },
  }));

  const succeed = () => {
    announce(true);
    form.reset();
    form.querySelectorAll('.form-variations-group').forEach((group) => CONTROLLERS.get(group)?.reset?.());
    form.querySelectorAll('textarea').forEach((textarea) => {
      textarea.dispatchEvent(new Event('input'));
    });
    updateVisibility(form, editing);
    refresh();
    status.textContent = t('formSuccess', 'Thank you, your details were sent.');
  };

  const fail = (key, fallback) => {
    announce(false, key);
    status.textContent = t(key, fallback);
  };

  form.addEventListener('input', (e) => {
    status.textContent = '';
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
      clearError(e.target);
    }
    refresh();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.getAttribute('aria-busy') === 'true') return;
    status.textContent = '';
    if (!validate(form)) {
      announce(false, 'validation');
      return;
    }
    const data = collectData(form);

    let pending = null;
    const detail = {
      data,
      respondWith: (promise) => { pending = promise; },
    };
    const handled = !block.dispatchEvent(new CustomEvent('form-variations:submit', {
      bubbles: true,
      cancelable: true,
      detail,
    }));
    const button = form.querySelector('button[type="submit"]');

    if (handled) {
      try {
        await pending;
        succeed();
      } catch {
        fail('formError', 'Your details couldn’t be sent. Please try again.');
      }
    } else if (!action) {
      fail('formNotConnected', 'This form isn’t connected yet: your details weren’t sent.');
    } else {
      button?.setAttribute('aria-disabled', 'true');
      form.setAttribute('aria-busy', 'true');
      try {
        const response = await fetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });
        if (response.ok) succeed();
        else fail('formError', 'Your details couldn’t be sent. Please try again.');
      } catch {
        fail('formError', 'Your details couldn’t be sent. Please try again.');
      } finally {
        form.removeAttribute('aria-busy');
        refresh();
      }
    }
    status.focus();
  });

  innerWrapper.append(...(header.children.length ? [header] : []), form, status);
  block.replaceChildren(backBtn, innerWrapper);

  updateVisibility(form, editing);
  refresh();
}
