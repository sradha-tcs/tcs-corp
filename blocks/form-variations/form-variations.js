import { moveInstrumentation } from '../../scripts/scripts.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { isInEditor } from '../../utils/environment.js';
import { linkOf } from '../../utils/links.js';
import { textOf } from '../../utils/properties.js';
import { createIdFactory, uniqueId } from '../../utils/ids.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';

let t = (key, fallback, values) => fillPlaceholder(fallback, values);

const ITEM_TYPES = [
  'field-text', 'field-select', 'field-combined', 'field-textarea', 'field-checkbox', 'field-richtext', 'contact-card', 'field-submit',
];
const KEYED_TYPES = ['field-text', 'field-select', 'field-combined', 'field-textarea', 'field-checkbox', 'field-richtext'];
const FIELD_COUNT = {
  'field-text': 6, 'field-select': 6, 'field-combined': 7, 'field-textarea': 6, 'field-checkbox': 5, 'field-richtext': 4,
};
const TEMPLATE_NAMES = [
  'text-input-field', 'dropdown-select-field', 'combined-input-field', 'textarea-field', 'consent-checkbox-field', 'rich-text-field',
  'contact-card-output', 'submit-button',
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
  const tokens = textOf(cells[0]).split(',').map((v) => v.trim()).filter(Boolean);
  const type = tokens.find((v) => ITEM_TYPES.includes(v));
  if (type) {
    const fields = cells.slice(1);
    if (tokens.length === 1 || !KEYED_TYPES.includes(type)) return { type, cells: fields };
    if (fields.length >= FIELD_COUNT[type]) return { type, cells: fields };
    const key = tokens.find((v) => v !== type);
    return { type, cells: [textCell(TEMPLATE_NAMES.includes(key) ? '' : key), ...fields] };
  }
  const model = row.dataset.aueModel || '';
  if (ITEM_TYPES.includes(model)) return { type: model, cells };
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
  const [eyebrowCell, eyebrowIconCell, titleCell, descriptionCell, actionCell, bgImageCell] = list;
  return {
    eyebrowCell, eyebrowIconCell, titleCell, descriptionCell, actionCell, bgImageCell,
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

function buildTextField(cells, nextId) {
  const [nameCell, labelCell, kindCell, widthCell, requiredCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'text';
  const required = isTrue(requiredCell);
  const kind = normalize(textOf(kindCell));
  const id = nextId(name);
  const widthClass = determineWidth(widthCell, name);

  const group = createGroup(['field-text', widthClass], textOf(dependsCell));
  const input = document.createElement('input');
  input.className = 'form-variations-control';
  input.type = INPUT_KINDS.includes(kind) ? kind : 'text';
  input.id = id;
  input.name = name;
  setRequired(input, required);
  group.append(createLabel(id, labelCell, required, name), input);
  return group;
}

function buildSelectField(cells, nextId) {
  const [nameCell, labelCell, widthCell, requiredCell, optionsCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'select';
  const required = isTrue(requiredCell);
  const id = nextId(name);
  const widthClass = determineWidth(widthCell);

  const group = createGroup(['field-select', widthClass], textOf(dependsCell));
  const select = document.createElement('select');
  select.className = 'form-variations-control';
  select.id = id;
  select.name = name;
  setRequired(select, required);

  const optionsList = splitList(textOf(optionsCell));
  optionsList.forEach((value, index) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    if (index === 0) option.selected = true;
    select.append(option);
  });
  instrument(optionsCell, select);

  group.append(createLabel(id, labelCell, required, name), select);
  return group;
}

function buildCombinedField(cells, nextId) {
  const [nameCell, labelCell, optionsCell, widthCell, requiredCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'score';
  const required = isTrue(requiredCell);
  const id = nextId(name);
  const widthClass = determineWidth(widthCell);

  const group = createGroup(['field-combined', widthClass], textOf(dependsCell));
  const row = document.createElement('div');
  row.className = 'form-variations-combined-row';

  const input = document.createElement('input');
  input.className = 'form-variations-control combined-input';
  input.type = 'text';
  input.id = id;
  input.name = name;
  setRequired(input, required);

  const select = document.createElement('select');
  select.className = 'form-variations-control combined-select';
  select.name = `${name}Unit`;

  const optionsList = splitList(textOf(optionsCell)) || ['CGPA', 'Percentage'];
  optionsList.forEach((val) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = val;
    select.append(opt);
  });

  row.append(input, select);
  group.append(createLabel(id, labelCell, required, 'SCORE'), row);
  return group;
}

function buildTextareaField(cells, nextId) {
  const [nameCell, labelCell, maxLengthCell, widthCell, requiredCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'message';
  const required = isTrue(requiredCell);
  const id = nextId(name);
  const parsed = parseInt(textOf(maxLengthCell), 10);
  const limit = parsed > 0 ? parsed : DEFAULT_MAX_LENGTH;
  const widthClass = determineWidth(widthCell);

  const group = createGroup(['field-textarea', widthClass], textOf(dependsCell));
  const textarea = document.createElement('textarea');
  textarea.className = 'form-variations-control';
  textarea.id = id;
  textarea.name = name;
  textarea.maxLength = limit;
  textarea.rows = 4;
  setRequired(textarea, required);

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

  group.append(createLabel(id, labelCell, required, name), textarea, counter);
  return group;
}

function buildCheckboxField(cells, nextId) {
  const [nameCell, labelCell, widthCell, requiredCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'consent';
  const required = isTrue(requiredCell);
  const id = nextId(name);
  const widthClass = determineWidth(widthCell);

  const group = createGroup(['field-checkbox', widthClass], textOf(dependsCell));
  const input = document.createElement('input');
  input.className = 'form-variations-checkbox';
  input.type = 'checkbox';
  input.id = id;
  input.name = name;
  input.value = 'true';
  setRequired(input, required);

  const label = document.createElement('label');
  label.className = 'form-variations-checkbox-label';
  label.htmlFor = id;
  const text = document.createElement('span');
  text.className = 'form-variations-consent';
  if (labelCell) {
    text.append(...labelCell.childNodes);
    moveInstrumentation(labelCell, text);
  }
  if (!text.textContent.trim()) text.textContent = name;
  label.append(text);
  if (required) {
    const marker = document.createElement('span');
    marker.className = 'form-variations-required';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = '*';
    label.append(marker);
  }
  group.append(input, label);
  return group;
}

function buildRichtextField(cells) {
  const [nameCell, labelCell, widthCell, dependsCell] = cells;
  const widthClass = determineWidth(widthCell);
  const group = createGroup(['field-richtext', widthClass], textOf(dependsCell));

  const contentDiv = document.createElement('div');
  contentDiv.className = 'form-variations-richtext-content';
  if (labelCell) {
    contentDiv.append(...labelCell.childNodes);
    moveInstrumentation(labelCell, contentDiv);
  } else {
    contentDiv.textContent = textOf(nameCell);
  }

  group.append(contentDiv);
  return group;
}

function buildContactCard(cells) {
  const [
    regionCell, nameCell, emailsCell, phonesCell, emailIconCell, phoneIconCell, widthCell,
  ] = cells;
  const widthClass = determineWidth(widthCell);
  const card = createGroup(['form-variations-contact-card', widthClass], textOf(regionCell));

  const name = document.createElement('h3');
  name.className = 'form-variations-contact-name';
  name.textContent = textOf(nameCell);
  instrument(nameCell, name);
  card.append(name);

  const emailIconUrl = linkOf(emailIconCell)?.getAttribute('href') || textOf(emailIconCell);
  const phoneIconUrl = linkOf(phoneIconCell)?.getAttribute('href') || textOf(phoneIconCell);

  const linksList = document.createElement('ul');
  linksList.className = 'form-variations-contact-links';

  splitList(textOf(emailsCell)).forEach((email) => {
    const li = document.createElement('li');
    li.className = 'form-variations-contact-item';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'contact-icon';
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

  splitList(textOf(phonesCell)).forEach((phone) => {
    const li = document.createElement('li');
    li.className = 'form-variations-contact-item';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'contact-icon';
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

function buildSubmit(cells) {
  const [labelCell, widthCell, dependsCell] = cells;
  const widthClass = determineWidth(widthCell);
  const group = createGroup(['field-submit', widthClass], textOf(dependsCell));
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = textOf(labelCell) || t('send', 'Send');
  instrument(labelCell, button);
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
      el.style.display = visible ? '' : 'none';

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

export default async function decorate(block) {
  t = await getPlaceholders();
  const nextId = createIdFactory(uniqueId('form-variations'));
  const editing = isInEditor(block);

  block.classList.add('dark');

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
    const el = BUILDERS[type](cells, nextId);
    moveInstrumentation(row, el);
    form.append(el);
  });

  const {
    eyebrowCell, eyebrowIconCell, titleCell, descriptionCell, actionCell, bgImageCell,
  } = readProperties(properties);
  const actionLink = linkOf(actionCell);
  const action = actionLink?.getAttribute('href') || textOf(actionCell);

  const authoredBg = linkOf(bgImageCell)?.getAttribute('href') || textOf(bgImageCell);
  const section = block.closest('.section');
  const sectionImg = section?.querySelector('picture img');
  const bgUrl = authoredBg || sectionImg?.src;

  if (section && bgUrl) {
    section.dataset.bgUrl = bgUrl;
    if (sectionImg) sectionImg.closest('picture')?.remove();
  }

  const backBtn = document.createElement('button');
  backBtn.className = 'form-variations-back';
  backBtn.setAttribute('type', 'button');
  backBtn.innerHTML = '&lt; BACK';
  backBtn.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  });

  const header = document.createElement('div');
  header.className = 'form-variations-header';

  // Render Eyebrow with Icon if Authored
  const eyebrowText = textOf(eyebrowCell);
  if (eyebrowText) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'form-variations-eyebrow';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'form-variations-eyebrow-icon';
    const eyebrowIconUrl = linkOf(eyebrowIconCell)?.getAttribute('href') || textOf(eyebrowIconCell);
    if (eyebrowIconUrl) {
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
    updateVisibility(form, editing);
    status.textContent = t('formSuccess', 'Thank you, your details were sent.');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.getAttribute('aria-busy') === 'true') return;
    status.textContent = '';
    const data = collectData(form);

    if (action) {
      try {
        const response = await fetch(action, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data }) });
        if (response.ok) succeed();
      } catch {
        status.textContent = t('formError', 'Your details couldn’t be sent. Please try again.');
      }
    }
  });

  innerWrapper.append(...(header.children.length ? [header] : []), form, status);
  block.replaceChildren(backBtn, innerWrapper);

  updateVisibility(form, editing);
}
