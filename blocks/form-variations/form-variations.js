import { moveInstrumentation } from '../../scripts/scripts.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { pictureOf } from '../../decorators/image-decorator.js';
import { isInEditor } from '../../utils/environment.js';
import { linkOf } from '../../utils/links.js';
import { textOf } from '../../utils/properties.js';
import { createIdFactory, uniqueId } from '../../utils/ids.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';

let t = (key, fallback, values) => fillPlaceholder(fallback, values);

/* --- Field Layouts (Consolidated from form-layout.js) --- */
export const FIELD_LAYOUT = {
  'field-text': ['fieldName', 'label', 'inputKind', 'fieldWidth', 'required', 'dependsOn'],
  'field-select': ['fieldName', 'label', 'fieldWidth', 'required', 'options', 'dependsOn'],
  'field-combined': ['fieldName', 'label', 'options', 'fieldWidth', 'required', 'dependsOn'],
  'field-textarea': ['fieldName', 'label', 'maxLength', 'fieldWidth', 'required', 'dependsOn'],
  'field-checkbox': ['fieldName', 'label', 'fieldWidth', 'required', 'dependsOn'],
  'field-richtext': ['fieldName', 'label', 'fieldWidth', 'dependsOn'],
  'contact-card': ['region', 'contactName', 'emails', 'phones', 'emailIcon', 'phoneIcon', 'fieldWidth'],
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

export const PROPERTY_LAYOUT = [
  'formEyebrow', 'formEyebrowIcon', 'formHeading', 'formDescription', 'bgImage', 'formAction',
];

export const PREVIOUS_PROPERTY_LAYOUT = ['formHeading', 'formDescription', 'formAction'];

export const ITEM_TYPES = Object.keys(FIELD_LAYOUT);
export const KEYED_TYPES = ITEM_TYPES.filter((type) => FIELD_LAYOUT[type][0] === 'fieldName');
export const keyedCells = (type) => (PREVIOUS_FIELD_LAYOUT[type] || FIELD_LAYOUT[type]).length;

export function fieldsOf(type, cells) {
  const current = FIELD_LAYOUT[type];
  const layout = cells.length < current.length && PREVIOUS_FIELD_LAYOUT[type]
    ? PREVIOUS_FIELD_LAYOUT[type]
    : current;
  return Object.fromEntries(layout.map((name, i) => [name, cells[i]]));
}

export function propertiesOf(cells) {
  const current = cells.length >= PROPERTY_LAYOUT.length;
  const layout = current ? PROPERTY_LAYOUT : PREVIOUS_PROPERTY_LAYOUT;
  return Object.fromEntries(layout.map((name, i) => [name, cells[i]]));
}

const TEMPLATE_NAMES = [
  'text-input-field', 'dropdown-select-field', 'combined-input-field', 'textarea-field',
  'consent-checkbox-field', 'rich-text-field', 'contact-card-output', 'submit-button',
];
const INPUT_KINDS = ['text', 'email', 'tel'];
const DEFAULT_MAX_LENGTH = 1500;

const DEFAULT_MAIL_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
const DEFAULT_PHONE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>';
const DEFAULT_EYEBROW_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';

const isTrue = (cell) => textOf(cell).toLowerCase() === 'true';
const normalize = (value) => String(value || '').trim().toLowerCase();
const splitList = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);

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

    if (tokens.length === 1 || !KEYED_TYPES.includes(type)) {
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

export function readProperties(cells) {
  const byProp = (name) => cells.find((cell) => cell?.dataset.aueProp === name
    || cell?.querySelector(`[data-aue-prop="${name}"]`));

  if (byProp('formHeading') || byProp('formDescription') || byProp('bgImage') || byProp('formEyebrow')) {
    return {
      eyebrowCell: byProp('formEyebrow'),
      eyebrowIconCell: byProp('formEyebrowIcon'),
      titleCell: byProp('formHeading'),
      descriptionCell: byProp('formDescription'),
      actionCell: byProp('formAction'),
      bgImageCell: byProp('bgImage'),
    };
  }

  const empty = (cell) => !cell || (!textOf(cell) && !cell.querySelector('img, a'));
  const list = cells.length > 2 && empty(cells[0]) ? cells.slice(1) : cells;
  const mapped = propertiesOf(list);

  return {
    eyebrowCell: mapped.formEyebrow,
    eyebrowIconCell: mapped.formEyebrowIcon,
    titleCell: mapped.formHeading,
    descriptionCell: mapped.formDescription,
    actionCell: mapped.formAction,
    bgImageCell: mapped.bgImage,
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

function determineWidth(widthCell, fallbackName = '') {
  const authored = normalize(textOf(widthCell));
  if (authored === 'half-width' || authored === 'half') return 'half-width';
  if (authored === 'full-width' || authored === 'full') return 'full-width';
  if (fallbackName && fallbackName.toLowerCase().includes('name')) return 'half-width';
  return 'full-width';
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

  const optionsList = splitList(textOf(options));
  optionsList.forEach((value, index) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    if (index === 0) option.selected = true;
    select.append(option);
  });
  instrument(options, select);

  group.append(createLabel(id, label, isReq, name), select);
  return group;
}

function buildCombinedField(fieldMap, nextId) {
  const {
    fieldName, label, options, fieldWidth, required, dependsOn,
  } = fieldMap;
  const name = textOf(fieldName) || 'score';
  const isReq = isTrue(required);
  const id = nextId(name);
  const widthClass = determineWidth(fieldWidth);

  const group = createGroup(['field-combined', widthClass], textOf(dependsOn));
  const row = document.createElement('div');
  row.className = 'form-variations-combined-row';

  const input = document.createElement('input');
  input.className = 'form-variations-control form-variations-combined-input';
  input.type = 'text';
  input.id = id;
  input.name = name;
  setRequired(input, isReq);

  const select = document.createElement('select');
  select.className = 'form-variations-control form-variations-combined-select';
  select.name = `${name}Unit`;

  const optionsList = splitList(textOf(options));
  const units = optionsList.length ? optionsList : ['CGPA', 'Percentage'];
  units.forEach((val) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = val;
    select.append(opt);
  });

  row.append(input, select);
  group.append(createLabel(id, label, isReq, 'SCORE'), row);
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
  textarea.maxLength = limit;
  textarea.rows = 4;
  setRequired(textarea, isReq);

  const counter = document.createElement('span');
  counter.className = 'form-variations-counter';
  counter.id = `${id}-counter`;
  const update = () => {
    const count = textarea.value.length;
    counter.textContent = `(${count}/${limit})`;
  };
  textarea.setAttribute('aria-describedby', counter.id);
  textarea.addEventListener('input', update);
  update();

  group.append(createLabel(id, label, isReq, name), textarea, counter);
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
    if (emailIconUrl) {
      const img = document.createElement('img');
      img.src = emailIconUrl;
      img.alt = 'Email Icon';
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
    if (phoneIconUrl) {
      const img = document.createElement('img');
      img.src = phoneIconUrl;
      img.alt = 'Phone Icon';
      iconSpan.append(img);
    } else {
      iconSpan.innerHTML = DEFAULT_PHONE_ICON;
    }

    const a = document.createElement('a');
    a.href = `tel:${phone.replace(/[^\d+]/g, '')}`;
    a.textContent = phone;

    li.append(iconSpan, a);
    linksList.append(li);
  });

  if (linksList.children.length) card.append(linksList);
  return card;
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

const BUILDERS = {
  'field-text': buildTextField,
  'field-select': buildSelectField,
  'field-combined': buildCombinedField,
  'field-textarea': buildTextareaField,
  'field-checkbox': buildCheckboxField,
  'field-richtext': buildRichtextField,
  'contact-card': buildContactCard,
  'field-submit': buildSubmit,
};

function updateVisibility(form, editing) {
  const conditional = [...form.querySelectorAll('[data-depends-on]')];
  if (!conditional.length) return;

  for (let pass = 0; pass <= conditional.length; pass += 1) {
    const selected = [...form.querySelectorAll('select')]
      .filter((select) => !select.disabled && select.value)
      .map((select) => normalize(select.value));

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
  return data;
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
  const described = (control.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
  if (!described.includes(id)) control.setAttribute('aria-describedby', [...described, id].join(' '));
}

function clearError(control) {
  control.removeAttribute('aria-invalid');
  const id = `${control.id}-error`;
  control.form?.querySelector(`#${CSS.escape(id)}`)?.remove();
  const described = (control.getAttribute('aria-describedby') || '').split(' ')
    .filter((value) => value && value !== id);
  if (described.length) control.setAttribute('aria-describedby', described.join(' '));
  else control.removeAttribute('aria-describedby');
}

function errorOf(control) {
  const { validity } = control;
  if (validity.valueMissing) return t('fieldRequired', 'This field is required.');
  if (validity.typeMismatch && control.type === 'email') {
    return t('fieldEmail', 'Enter a valid email address.');
  }
  if (validity.typeMismatch || validity.patternMismatch) {
    return t('fieldFormat', 'Enter a valid value.');
  }
  if (validity.tooLong) return t('fieldTooLong', 'This text is too long.');
  return control.validationMessage;
}

function validate(form) {
  const controls = [...form.elements].filter((element) => element.matches('input, select, textarea')
    && !element.disabled && element.type !== 'hidden' && element.type !== 'submit');
  const invalid = controls.filter((control) => {
    if (control.checkValidity()) {
      clearError(control);
      return false;
    }
    showError(control, errorOf(control));
    return true;
  });
  invalid[0]?.focus();
  return invalid.length === 0;
}

export default async function decorate(block) {
  t = await getPlaceholders();
  const nextId = createIdFactory(uniqueId('form-variations'));
  const editing = isInEditor(block);

  // Set theme from authored classes or default to dark
  const isLight = block.classList.contains('default') || block.classList.contains('light');
  if (!isLight) {
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
      if (!itemsStarted) properties.push(row.firstElementChild);
      return;
    }
    itemsStarted = true;
    const fieldMap = fieldsOf(type, cells);
    const el = BUILDERS[type](fieldMap, nextId);
    moveInstrumentation(row, el);
    form.append(el);
  });

  const {
    eyebrowCell, eyebrowIconCell, titleCell, descriptionCell, actionCell, bgImageCell,
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
    if (sectionImg) sectionImg.closest('picture')?.remove();
  }

  const backBtn = document.createElement('button');
  backBtn.className = 'form-variations-back';
  backBtn.setAttribute('type', 'button');
  backBtn.textContent = 'BACK';
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

    const iconSpan = document.createElement('span');
    iconSpan.className = 'form-variations-eyebrow-icon';
    const eyebrowIconPicture = pictureOf(eyebrowIconCell);
    const eyebrowIconImage = eyebrowIconPicture?.querySelector('img');
    const eyebrowIconUrl = eyebrowIconImage?.src
      || linkOf(eyebrowIconCell)?.getAttribute('href')
      || textOf(eyebrowIconCell);
    if (eyebrowIconPicture && eyebrowIconImage) {
      iconSpan.append(eyebrowIconPicture);
    } else if (eyebrowIconUrl) {
      const img = document.createElement('img');
      img.src = eyebrowIconUrl;
      img.alt = '';
      iconSpan.append(img);
    } else {
      iconSpan.innerHTML = DEFAULT_EYEBROW_ICON;
    }

    const labelSpan = document.createElement('span');
    labelSpan.textContent = eyebrowText;
    instrument(eyebrowCell, labelSpan);

    eyebrow.append(iconSpan, labelSpan);
    header.append(eyebrow);
  }

  const title = titleCell ? buildHeading(titleCell, null, 'form-variations-title', 'h2') : null;
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

  form.addEventListener('change', (e) => {
    if (!e.target.matches('select')) return;
    updateVisibility(form, editing);
  });

  const succeed = () => {
    form.reset();
    form.querySelectorAll('textarea').forEach((textarea) => {
      textarea.dispatchEvent(new Event('input'));
    });
    updateVisibility(form, editing);
    status.textContent = t('formSuccess', 'Thank you, your details were sent.');
  };

  const fail = (key, fallback) => {
    status.textContent = t(key, fallback);
  };

  form.addEventListener('input', (e) => {
    status.textContent = '';
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
      clearError(e.target);
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.getAttribute('aria-busy') === 'true') return;
    status.textContent = '';
    if (!validate(form)) return;
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
        button?.removeAttribute('aria-disabled');
        form.removeAttribute('aria-busy');
      }
    }
    status.focus();
  });

  innerWrapper.append(...(header.children.length ? [header] : []), form, status);
  block.replaceChildren(backBtn, innerWrapper);

  updateVisibility(form, editing);
}
