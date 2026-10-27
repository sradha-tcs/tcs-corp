import { moveInstrumentation } from '../../scripts/scripts.js';
// import { decorateButton } from '../../decorators/button-decorator.js';
import { fromCell } from '../../decorators/content-decorator.js';
import { buildHeading } from '../../decorators/heading-decorator.js';
import { isInEditor } from '../../utils/environment.js';
import { linkOf } from '../../utils/links.js';
import { textOf } from '../../utils/properties.js';
import { createIdFactory, uniqueId } from '../../utils/ids.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';

let t = (key, fallback, values) => fillPlaceholder(fallback, values);

const ITEM_TYPES = [
  'field-text', 'field-select', 'field-combined', 'field-textarea', 'field-checkbox', 'contact-card', 'field-submit',
];
const KEYED_TYPES = ['field-text', 'field-select', 'field-combined', 'field-textarea', 'field-checkbox'];
const FIELD_COUNT = {
  'field-text': 5, 'field-select': 5, 'field-combined': 5, 'field-textarea': 5, 'field-checkbox': 4,
};
const TEMPLATE_NAMES = [
  'text-input-field', 'dropdown-select-field', 'combined-input-field', 'textarea-field', 'consent-checkbox-field',
  'contact-card-output', 'submit-button',
];
const INPUT_KINDS = ['text', 'email', 'tel'];
const DEFAULT_MAX_LENGTH = 1500;

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
  if (byProp('formHeading') || byProp('formDescription')) {
    return { titleCell: byProp('formHeading'), descriptionCell: byProp('formDescription'), actionCell: byProp('formAction') };
  }
  const empty = (cell) => !cell || (!textOf(cell) && !cell.querySelector('img, a'));
  const list = cells.length > 2 && empty(cells[0]) ? cells.slice(1) : cells;
  const [titleCell, descriptionCell, actionCell] = list;
  return { titleCell, descriptionCell, actionCell };
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

function buildTextField(cells, nextId) {
  const [nameCell, labelCell, kindCell, requiredCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'text';
  const required = isTrue(requiredCell);
  const kind = normalize(textOf(kindCell));
  const id = nextId(name);
  const half = name.toLowerCase().includes('name');

  const group = createGroup(['field-text', half ? 'half-width' : 'full-width'], textOf(dependsCell));
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
  const [nameCell, labelCell, requiredCell, optionsCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'select';
  const required = isTrue(requiredCell);
  const id = nextId(name);

  const group = createGroup(['field-select', 'full-width'], textOf(dependsCell));
  const select = document.createElement('select');
  select.className = 'form-variations-control';
  select.id = id;
  select.name = name;
  setRequired(select, required);

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = t('selectAnOption', 'Select an option');
  placeholder.disabled = true;
  placeholder.defaultSelected = true;
  select.append(placeholder);
  splitList(textOf(optionsCell)).forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
  instrument(optionsCell, select);

  group.append(createLabel(id, labelCell, required, name), select);
  return group;
}

function buildCombinedField(cells, nextId) {
  const [nameCell, labelCell, optionsCell, requiredCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'score';
  const required = isTrue(requiredCell);
  const id = nextId(name);

  const group = createGroup(['field-combined', 'full-width'], textOf(dependsCell));
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

  splitList(textOf(optionsCell)).forEach((val) => {
    const opt = document.createElement('option');
    opt.value = val;
    opt.textContent = val;
    select.append(opt);
  });

  row.append(input, select);
  group.append(createLabel(id, labelCell, required, name), row);
  return group;
}

function buildTextareaField(cells, nextId) {
  const [nameCell, labelCell, maxLengthCell, requiredCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'message';
  const required = isTrue(requiredCell);
  const id = nextId(name);
  const parsed = parseInt(textOf(maxLengthCell), 10);
  const limit = parsed > 0 ? parsed : DEFAULT_MAX_LENGTH;

  const group = createGroup(['field-textarea', 'full-width'], textOf(dependsCell));
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
    const visible = document.createElement('span');
    visible.setAttribute('aria-hidden', 'true');
    visible.textContent = `${count}/${limit}`;
    const spoken = document.createElement('span');
    spoken.className = 'visually-hidden';
    spoken.textContent = t('charactersCount', '{count} of {max} characters', { count, max: limit });
    counter.replaceChildren(visible, spoken);
  };
  textarea.setAttribute('aria-describedby', counter.id);
  textarea.addEventListener('input', update);
  update();

  group.append(createLabel(id, labelCell, required, name), textarea, counter);
  return group;
}

function buildCheckboxField(cells, nextId) {
  const [nameCell, labelCell, requiredCell, dependsCell] = cells;
  const name = textOf(nameCell) || 'consent';
  const required = isTrue(requiredCell);
  const id = nextId(name);

  const group = createGroup(['field-checkbox', 'full-width'], textOf(dependsCell));
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

function buildContactCard(cells) {
  const [regionCell, nameCell, emailsCell, phonesCell] = cells;
  const card = createGroup(['form-variations-contact-card', 'full-width'], textOf(regionCell));

  const name = document.createElement('p');
  name.className = 'form-variations-contact-name';
  name.textContent = textOf(nameCell);
  instrument(nameCell, name);
  card.append(name);

  const links = [
    ...splitList(textOf(emailsCell)).map((email) => ({ kind: 'email', text: email, href: `mailto:${email}` })),
    ...splitList(textOf(phonesCell)).map((phone) => ({ kind: 'phone', text: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}` })),
  ];
  if (links.length) {
    const list = document.createElement('ul');
    list.className = 'form-variations-contact-links';
    links.forEach(({ kind, text, href }) => {
      const li = document.createElement('li');
      li.className = `form-variations-contact-${kind}`;
      const a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      li.append(a);
      list.append(li);
    });
    card.append(list);
  }
  return card;
}

function buildSubmit(cells) {
  const [labelCell, dependsCell] = cells;
  const group = createGroup(['field-submit', 'full-width'], textOf(dependsCell));
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
  'contact-card': buildContactCard,
  'field-submit': buildSubmit,
};

function updateVisibility(form, editing) {
  const conditional = [...form.querySelectorAll('[data-depends-on]')];
  for (let pass = 0; pass <= conditional.length; pass += 1) {
    const selected = [...form.querySelectorAll('select')]
      .filter((select) => !select.disabled && select.value)
      .map((select) => normalize(select.value));
    const before = conditional.map((el) => el.hidden).join();
    conditional.forEach((el) => {
      const visible = editing || selected.includes(normalize(el.dataset.dependsOn));
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

export default async function decorate(block) {
  t = await getPlaceholders();
  const nextId = createIdFactory(uniqueId('form-variations'));
  const editing = isInEditor(block);

  // Background Image Handling
  const section = block.closest('.section');
  const img = section?.querySelector('picture img');
  if (section && img) {
    const bgUrl = img.src;
    section.style.backgroundImage = `linear-gradient(to right, #050811 40%, rgba(5, 8, 17, 0.3) 70%, transparent 100%), url('${bgUrl}')`;
    section.style.backgroundSize = 'cover';
    section.style.backgroundPosition = 'right center';
    img.closest('picture')?.remove();
  }

  // Create Back Button (< BACK)
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

  const { titleCell, descriptionCell, actionCell } = readProperties(properties);
  const actionLink = linkOf(actionCell);
  const action = actionLink?.getAttribute('href') || textOf(actionCell);
  const header = document.createElement('div');
  header.className = 'form-variations-header';

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
