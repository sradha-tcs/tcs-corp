import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { buildImage } from '../../decorators/responsive-image-decorator.js';
import { getPageTags } from '../../utils/metadata.js';
import { getPages } from '../../utils/query-index.js';
import { getLocale } from '../../utils/site.js';
import { resolveTags } from '../../utils/taxonomy.js';
import { hideVisually } from '../../decorators/a11y-decorator.js';
import { createButton } from '../../decorators/button-decorator.js';
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import {
  BUTTON_ALIGNMENTS, BUTTON_TYPES, BUTTON_VIEWS, readButtonOptions,
} from '../../utils/buttons.js';
import { normalizeKey as normalize, textOf } from '../../utils/properties.js';
import { toSitePath } from '../../utils/urls.js';
import { uniqueId } from '../../utils/ids.js';
import { fillPlaceholder, getPlaceholders } from '../../utils/placeholders.js';
import registerCanvas from './canvas-controller.js';
import { bone, skeletonElement, skeletonWhile } from '../../decorators/skeleton-decorator.js';
import { buildEditorItems, editorItemHint } from '../../decorators/editor-item-decorator.js';

let t = (key, fallback, values) => fillPlaceholder(fallback, values);

const FIELDS = [
  'classes', 'bgstyle', 'backgroundimage', 'icon', 'iconalt', 'eyebrow', 'title', 'titlesize',
  'text', 'menurootpath', 'menudepth', 'searchplaceholder', 'searchaudioicon',
  'searchaudioiconalt', 'searchbuttonstyle', 'searchbuttonlabel', 'searchpage',
];
const COLLAPSED = ['classes', 'iconalt', 'searchaudioiconalt'];
const STYLES = ['primary', 'secondary'];
const TITLE_SIZES = ['bigger', 'medium'];
const MENU_COLUMNS_FROM = 6;
const MENU_WINDOW_MARGIN = 24;

function readBlock(block) {
  const config = {};
  const buttonRows = [];
  const unkeyed = [];
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const key = cells.length === 2 ? normalize(cells[0].textContent) : '';
    if (row.dataset.aueModel === 'conversation-canvas-button') buttonRows.push(row);
    else if (FIELDS.includes(key)) [, config[key]] = cells;
    else if (row.querySelector('a[href]')) buttonRows.push(row);
    else if (cells.length === 1) unkeyed.push(cells[0]);
  });
  if (!Object.keys(config).length) {
    FIELDS.filter((field) => !COLLAPSED.includes(field))
      .forEach((field, i) => { if (unkeyed[i]) config[field] = unkeyed[i]; });
  }
  return { config, buttonRows };
}

function imageOf(cell, alt) {
  if (!cell) return null;
  let image = cell.querySelector('picture') || cell.querySelector('img');
  if (!image) {
    const src = cell.querySelector('a')?.href || textOf(cell);
    image = buildImage(src ? { src, alt: '' } : null);
  }
  if (!image) return null;
  const img = image.tagName === 'IMG' ? image : image.querySelector('img');
  if (alt !== undefined && alt !== '') img.alt = alt;
  else if (!img.hasAttribute('alt')) img.alt = '';
  return image;
}

function buildListButton(row) {
  const a = row.querySelector('a[href]');
  if (!a) return null;
  const values = [...row.children].filter((cell) => !cell.contains(a)).map(textOf).filter(Boolean)
    .map((value) => value.toLowerCase());
  const options = readButtonOptions(a);
  const view = values.find((v) => BUTTON_VIEWS.includes(v)) || options.view || 'button';
  const type = values.find((v) => BUTTON_TYPES.includes(v)) || options.type || 'primary';
  const known = [...BUTTON_VIEWS, ...BUTTON_TYPES, ...BUTTON_ALIGNMENTS];
  const icon = values.find((v) => !known.includes(v)) || options.icon;

  const li = document.createElement('li');
  moveInstrumentation(row, li);
  li.append(createButton({
    href: a.href,
    text: a.textContent.trim(),
    title: a.title && a.title !== a.textContent.trim() ? a.title : '',
    view,
    type,
    icon,
  }));
  return li;
}

function menuSettings(config) {
  const root = toSitePath(config.menurootpath?.querySelector('a')?.getAttribute('href')
    || textOf(config.menurootpath)) || getLocale().root;
  const depth = Math.max(1, parseInt(textOf(config.menudepth), 10) || 3);
  return { root, depth };
}

async function loadMenuTree(root, depth) {
  const base = root === '/' ? '' : root.replace(/\/$/, '');
  const tree = {
    path: base || '/', title: 'Home', parent: null, children: [], level: 0,
  };
  try {
    const data = await getPages();
    const levelOf = (path) => path.slice(base.length).split('/').filter(Boolean).length;
    const nodes = new Map([[tree.path, tree]]);
    data
      .filter(({ path }) => path.startsWith(`${base}/`) && levelOf(path) >= 1 && levelOf(path) <= depth)
      .sort((x, y) => levelOf(x.path) - levelOf(y.path) || y.path.localeCompare(x.path))
      .forEach(({ path, title }) => {
        const parentPath = path.slice(0, path.lastIndexOf('/')) || '/';
        const parent = nodes.get(parentPath);
        if (!parent) return;
        const node = {
          path,
          title: title || path.split('/').pop().replace(/-/g, ' '),
          parent,
          children: [],
          level: levelOf(path),
        };
        parent.children.push(node);
        nodes.set(path, node);
      });
  } catch { /* empty fallback */ }
  return tree;
}

const normalizePath = (path) => path.replace(/\.html$/, '').replace(/\/$/, '') || '/';

function findNode(tree, path) {
  if (tree.path === path) return tree;
  for (let i = 0; i < tree.children.length; i += 1) {
    const found = findNode(tree.children[i], path);
    if (found) return found;
  }
  return null;
}

const isWithin = (node, ancestor) => {
  for (let n = node; n; n = n.parent) if (n === ancestor) return true;
  return false;
};

const HOVER_CLOSE_DELAY = 300;

async function buildMenuList(root, depth, onSuggestionSelect) {
  const tree = await loadMenuTree(root, depth);
  const container = document.createElement('div');
  container.className = 'conversation-canvas-nav conversation-canvas-menu-levels';
  container.dataset.view = 'root';
  const list = document.createElement('ul');
  list.className = 'conversation-canvas-nav-list';
  container.append(list);

  if (!tree.children.length) {
    const li = document.createElement('li');
    li.className = 'conversation-canvas-menu-empty';
    li.textContent = t('noPagesFound', 'No pages found');
    list.append(li);
    container.reset = () => {};
    return container;
  }

  const current = findNode(tree, normalizePath(window.location.pathname));
  const panel = document.createElement('div');
  panel.className = 'conversation-canvas-menu-panel';
  panel.id = uniqueId('conversation-canvas-menu-panel');
  panel.hidden = true;

  let open = null;
  let pinned = false;
  let closeTimer = 0;

  const closePanel = () => {
    clearTimeout(closeTimer);
    panel.hidden = true;
    panel.replaceChildren();
    open?.classList.remove('conversation-canvas-nav-open');
    open?.querySelector('.conversation-canvas-nav-chevron')?.setAttribute('aria-expanded', 'false');
    open = null;
    pinned = false;
  };

  let render;
  const openPanel = (li, node, pin) => {
    clearTimeout(closeTimer);
    if (open === li) {
      pinned = pinned || pin;
      return;
    }
    closePanel();
    const rows = document.createElement('ul');
    rows.setAttribute('aria-label', node.title);
    rows.append(...node.children.map((child) => {
      const row = document.createElement('li');
      const a = document.createElement('a');
      a.href = child.path;
      a.textContent = child.title;
      if (current === child) a.setAttribute('aria-current', 'page');
      row.append(a);

      if (child.children.length) {
        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'conversation-canvas-menu-next';
        next.setAttribute('aria-label', t('showSubmenu', 'Show {label} menu', { label: child.title }));
        next.addEventListener('click', (e) => {
          e.stopPropagation();
          render(child);
        });
        row.append(next);
      }
      return row;
    }));

    if (node.children.length > MENU_COLUMNS_FROM) {
      rows.className = 'conversation-canvas-menu-columns';
      rows.style.setProperty('--conversation-canvas-menu-rows', Math.ceil(node.children.length / 2));
    }
    panel.append(rows);
    panel.hidden = false;
    li.append(panel);
    li.classList.add('conversation-canvas-nav-open');
    li.querySelector('.conversation-canvas-nav-chevron')?.setAttribute('aria-expanded', 'true');
    open = li;
    pinned = pin;
  };

  const item = (child, parentNode) => {
    const li = document.createElement('li');
    li.dataset.path = child.path;

    const a = document.createElement('a');
    a.className = 'conversation-canvas-nav-item';
    a.href = child.path;
    a.textContent = child.title;

    if (current && isWithin(current, child)) {
      a.classList.add('conversation-canvas-nav-current');
      a.setAttribute('aria-current', current === child ? 'page' : 'true');
    }
    li.append(a);

    const hasSubpages = Boolean(child.children && child.children.length);
    const isL2OrDeeper = parentNode && parentNode !== tree;

    if (!hasSubpages || !isL2OrDeeper) {
      return li;
    }

    li.classList.add('conversation-canvas-nav-group');
    const chevron = document.createElement('button');
    chevron.type = 'button';
    chevron.className = 'conversation-canvas-nav-chevron';
    chevron.setAttribute('aria-label', t('showSubmenu', 'Show {label} menu', { label: child.title }));
    chevron.setAttribute('aria-expanded', 'false');
    chevron.setAttribute('aria-controls', panel.id);

    chevron.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (open === li && pinned) {
        closePanel();
      } else {
        openPanel(li, child, true);
      }
    });

    li.append(chevron);

    li.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') openPanel(li, child, false);
    });
    li.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse' || open !== li || pinned) return;
      closeTimer = setTimeout(() => {
        if (open === li && !pinned) closePanel();
      }, HOVER_CLOSE_DELAY);
    });

    return li;
  };

  render = (node) => {
    closePanel();
    const items = [];

    if (node === tree) {
      const homeLi = document.createElement('li');
      const homeBtn = document.createElement('button');
      homeBtn.type = 'button';
      homeBtn.className = 'conversation-canvas-nav-home';
      homeBtn.setAttribute('aria-label', t('home', 'Home'));
      homeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.assign(tree.path || '/');
      });
      homeLi.append(homeBtn);
      items.push(homeLi);
    } else {
      const backLi = document.createElement('li');
      const back = document.createElement('button');
      back.type = 'button';
      back.className = 'conversation-canvas-nav-back';
      back.setAttribute('aria-label', t('back', 'Back'));
      back.addEventListener('click', (e) => {
        e.stopPropagation();

        let target = node.parent || tree;
        // Skip intermediate L3 pages and ascend directly to Level 1 / L2 parent container
        while (target && target.level > 1 && target !== tree) {
          target = target.parent;
        }

        render(target || tree);
      });
      backLi.append(back);
      items.push(backLi);
    }

    if (node.level >= 2 && !node.children.length) {
      const suggestions = ['Key Capabilities', 'Case Studies', 'Pricing & Contact'];
      suggestions.forEach((text) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'conversation-canvas-nav-item conversation-canvas-nav-suggestion';
        btn.textContent = text;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          onSuggestionSelect?.(text);
        });
        li.append(btn);
        items.push(li);
      });
    } else {
      items.push(...node.children.map((child) => item(child, node)));
    }

    list.replaceChildren(...items);
    container.dataset.view = node === tree ? 'root' : `level-${node.level}`;
  };

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !open) return;
    e.stopPropagation();
    const opener = open.querySelector('.conversation-canvas-nav-chevron');
    closePanel();
    opener?.focus();
  });

  const targetInitialNode = (current && current !== tree) ? current : tree;
  container.reset = () => render(targetInitialNode);
  render(targetInitialNode);
  return container;
}

function navSkeleton() {
  const pills = skeletonElement('skeleton-row');
  for (let i = 0; i < 4; i += 1) pills.append(bone('pill'));
  return pills;
}

function buildMenuToggle(controls, label = t('menu', 'Menu')) {
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'conversation-canvas-menu-toggle';
  toggle.setAttribute('aria-label', label);
  toggle.setAttribute('aria-controls', controls);
  return toggle;
}

function buildSearchForm(config, id) {
  const form = document.createElement('form');
  form.className = 'conversation-canvas-search-form';
  form.setAttribute('role', 'search');
  const placeholders = [
    'Ask us about transformational AI',
    'Ask us about our services',
    'Ask for a session with our experts',
    'Ask us how we can help your business',
    'Ask us a question',
  ];

  const [firstPlaceholder] = placeholders;
  let placeholderIndex = 0;

  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.id = `${id}-q`;
  input.autocomplete = 'off';
  input.placeholder = firstPlaceholder;

  const label = hideVisually(document.createElement('label'));
  label.htmlFor = input.id;
  label.textContent = firstPlaceholder;

  setInterval(() => {
    if (input.value.trim()) return;
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    input.placeholder = placeholders[placeholderIndex];
    label.textContent = placeholders[placeholderIndex];
  }, 3000);

  const audio = document.createElement('button');
  audio.type = 'button';
  audio.className = 'conversation-canvas-audio';
  const audioAlt = textOf(config.searchaudioiconalt)
    || config.searchaudioicon?.querySelector('img')?.getAttribute('alt')?.trim();
  audio.setAttribute('aria-label', audioAlt || t('searchByVoice', 'Search by voice'));
  const audioImage = imageOf(config.searchaudioicon, '');
  const audioImg = audioImage?.tagName === 'IMG' ? audioImage : audioImage?.querySelector('img');
  audioImg?.setAttribute('alt', '');
  if (audioImage) audio.append(audioImage);
  else audio.classList.add('conversation-canvas-audio-default');

  const submitLabel = textOf(config.searchbuttonlabel) || t('submit', 'Submit');
  const submit = createIconButton({
    label: submitLabel,
    icon: 'arrow-right',
    type: 'primary',
    buttonType: 'submit',
  });
  submit.classList.add('conversation-canvas-search-submit');
  submit.disabled = true;

  const updateSearchState = () => {
    const hasValue = input.value.trim().length > 0;
    form.classList.toggle('has-value', hasValue);
    submit.disabled = !hasValue;
  };

  input.addEventListener('input', updateSearchState);
  updateSearchState();

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    let recognition = null;
    audio.setAttribute('aria-pressed', 'false');

    const stopListening = () => {
      if (recognition) {
        try { recognition.abort(); } catch (_) { /* ignore */ }
        recognition = null;
      }
      audio.setAttribute('aria-pressed', 'false');
    };

    audio.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (recognition) {
        stopListening();
        return;
      }

      recognition = new Recognition();
      recognition.lang = document.documentElement.lang || navigator.language || 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.addEventListener('result', (ev) => {
        let transcript = '';
        for (let i = ev.resultIndex; i < ev.results.length; i += 1) {
          transcript += ev.results[i][0].transcript;
        }

        if (transcript.trim()) {
          input.value = transcript.trim();
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.focus();
        }
      });

      recognition.addEventListener('end', stopListening);

      recognition.addEventListener('error', (err) => {
        console.warn('Voice recognition error code:', err.error, err);
        stopListening();
      });

      try {
        recognition.start();
        audio.setAttribute('aria-pressed', 'true');
      } catch (err) {
        console.warn('Voice recognition failed to start:', err);
        stopListening();
      }
    });
  } else {
    audio.hidden = true;
  }

  const status = document.createElement('p');
  status.className = 'conversation-canvas-search-status visually-hidden';
  status.setAttribute('role', 'status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    window.location.href = '#';
  });

  form.append(label, input, audio, submit, status);

  form.setSearchValue = (val) => {
    input.value = val;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    form.requestSubmit();
  };

  return form;
}

function buildSearch(config, id) {
  const row = document.createElement('div');
  row.className = 'conversation-canvas-search';

  const menuToggle = buildMenuToggle(`${id}-menu`);
  menuToggle.setAttribute('aria-expanded', 'false');
  const menu = document.createElement('nav');
  menu.className = 'conversation-canvas-menu';
  menu.id = `${id}-menu`;
  menu.setAttribute('aria-label', t('menu', 'Menu'));
  menu.hidden = true;
  const { root, depth } = menuSettings(config);
  let menuLoaded = false;

  let placeFrame = 0;
  let floatedAtOpen = false;
  let closeMenu;

  const placeMenu = () => {
    placeFrame = 0;
    if (!menu.hidden && row.classList.contains('conversation-canvas-floating') !== floatedAtOpen) {
      closeMenu();
      return;
    }
    const lift = parseFloat(row.style.getPropertyValue('--conversation-canvas-menu-lift')) || 0;
    const rect = menu.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    const room = window.innerHeight - MENU_WINDOW_MARGIN;
    const next = !menu.hidden && rect.height
      ? Math.max(0, Math.round(rect.bottom + lift - room)) : 0;
    if (next !== lift) row.style.setProperty('--conversation-canvas-menu-lift', `${next}px`);
    row.style.setProperty('--conversation-canvas-menu-x', `${-Math.round(rowRect.left)}px`);
    row.style.setProperty('--conversation-canvas-menu-y', `${-Math.round(rowRect.top - (next - lift))}px`);
  };

  const schedulePlace = () => {
    if (!placeFrame) placeFrame = requestAnimationFrame(placeMenu);
  };

  const onScroll = () => {
    if (!menu.hidden) closeMenu();
    row.classList.add('conversation-canvas-minimized');
    clearTimeout(row.scrollEndTimer);
    row.scrollEndTimer = setTimeout(() => {
      row.classList.remove('conversation-canvas-minimized');
    }, 400);
  };

  const onOutsideClick = (e) => {
    if (!menu.hidden && !row.contains(e.target)) {
      closeMenu();
    }
  };

  closeMenu = () => {
    menu.querySelector('.conversation-canvas-menu-levels')?.reset();
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', schedulePlace);
    document.removeEventListener('pointerdown', onOutsideClick);
    ['lift', 'x', 'y'].forEach((v) => row.style.removeProperty(`--conversation-canvas-menu-${v}`));
  };

  const form = buildSearchForm(config, id);

  menuToggle.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (!menu.hidden) {
      closeMenu();
      return;
    }
    menu.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    floatedAtOpen = row.classList.contains('conversation-canvas-floating');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedulePlace);
    document.addEventListener('pointerdown', onOutsideClick);
    schedulePlace();

    if (!menuLoaded) {
      menuLoaded = true;
      const list = buildMenuList(root, depth, (suggestion) => {
        form.setSearchValue(suggestion);
        closeMenu();
      });
      skeletonWhile(menu, list, navSkeleton);
      menu.append(await list);
      schedulePlace();
    } else {
      menu.querySelector('.conversation-canvas-menu-levels')?.reset();
    }
  });

  row.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });

  row.append(menuToggle, menu, form);
  return row;
}

const docks = new WeakMap();
const PANEL_COLUMNS_FROM = 6;

function buildDock(config, id, block) {
  const dock = document.createElement('div');
  dock.className = 'conversation-canvas-dock';

  const panel = document.createElement('div');
  panel.className = 'conversation-canvas-nav-panel';
  panel.id = `${id}-panel`;
  panel.hidden = true;

  const row = document.createElement('div');
  row.className = 'conversation-canvas-search';
  const menuToggle = buildMenuToggle(`${id}-nav`);
  const form = buildSearchForm(config, id);
  row.append(menuToggle, form);

  const nav = document.createElement('nav');
  nav.className = 'conversation-canvas-nav';
  nav.id = `${id}-nav`;
  nav.setAttribute('aria-label', t('siteNavigation', 'Site'));

  dock.append(row, nav, panel);

  const state = {
    tree: null, current: null, view: null, suggestions: [], collapsed: false,
  };
  const textOfNode = (node) => node.title.replace(/\s*\|.*$/, '');

  const closePanel = () => {
    panel.hidden = true;
    panel.replaceChildren();
    dock.classList.remove('conversation-canvas-panel-open');
    nav.querySelectorAll('[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  };

  const openPanel = (button, node) => {
    closePanel();
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-nav-panel-list';
    const wide = node.children.length >= PANEL_COLUMNS_FROM;
    const columnEnd = wide ? Math.ceil(node.children.length / 2) - 1 : -1;
    node.children.forEach((child, i) => {
      const li = document.createElement('li');
      li.className = 'conversation-canvas-nav-panel-item';
      if (i === columnEnd) li.classList.add('conversation-canvas-nav-panel-column-end');
      const a = document.createElement('a');
      a.href = child.path;
      a.className = 'conversation-canvas-nav-panel-link';
      a.textContent = textOfNode(child);
      if (state.current === child) a.setAttribute('aria-current', 'page');
      li.append(a);
      list.append(li);
    });
    panel.classList.toggle('conversation-canvas-nav-panel-wide', wide);
    panel.setAttribute('aria-label', textOfNode(node));
    panel.append(list);
    panel.hidden = false;
    dock.classList.add('conversation-canvas-panel-open');
    button.setAttribute('aria-expanded', 'true');
  };

  const defaultView = () => {
    const { tree, current } = state;
    if (!current || current === tree) return { type: 'root' };
    if (current.children.length) return { type: 'section', node: current };
    if (state.suggestions.length) return { type: 'suggestions' };
    return current.parent === tree ? { type: 'root' } : { type: 'section', node: current.parent };
  };

  const pill = (tag, text) => {
    const el = document.createElement(tag);
    el.className = 'conversation-canvas-nav-item';
    el.textContent = text;
    if (tag === 'button') el.type = 'button';
    return el;
  };

  // eslint-disable-next-line no-use-before-define
  const setView = (view) => { state.view = view; render(); };

  function render() {
    closePanel();
    const { tree, view } = state;
    const items = [];

    if (view.type === 'root') {
      const home = document.createElement('button');
      home.type = 'button';
      home.className = 'conversation-canvas-nav-home';
      home.setAttribute('aria-label', t('home', 'Home'));
      home.addEventListener('click', () => {
        window.location.assign(tree.path || '/');
      });
      items.push(home);
    } else {
      const back = document.createElement('button');
      back.type = 'button';
      back.className = 'conversation-canvas-nav-back';
      back.setAttribute('aria-label', t('back', 'Back'));
      back.addEventListener('click', () => {
        if (view.type === 'suggestions') {
          let target = state.current?.parent;
          while (target && target.level > 1 && target !== state.tree) {
            target = target.parent;
          }
          setView(target && target !== state.tree ? { type: 'section', node: target } : { type: 'root' });
        } else if (view.type === 'section' && view.node.parent && view.node.parent !== tree) {
          let target = view.node.parent;
          while (target && target.level > 1 && target !== tree) {
            target = target.parent;
          }
          setView(target && target !== tree ? { type: 'section', node: target } : { type: 'root' });
        } else {
          setView({ type: 'root' });
        }
      });
      items.push(back);
    }

    if (view.type === 'suggestions') {
      state.suggestions.forEach((text) => {
        const item = pill('button', text);
        item.classList.add('conversation-canvas-nav-suggestion');
        item.addEventListener('click', () => {
          form.setSearchValue(text.replace(/^["“]|["”]$/g, ''));
        });
        items.push(item);
      });
    } else {
      const node = view.type === 'root' ? tree : view.node;
      node.children.forEach((child) => {
        let item;
        if (child.children.length && view.type !== 'root') {
          item = pill('button', textOfNode(child));
          item.classList.add('conversation-canvas-nav-toggle');
          item.setAttribute('aria-expanded', 'false');
          item.setAttribute('aria-controls', panel.id);
          item.addEventListener('click', () => {
            if (item.getAttribute('aria-expanded') === 'true') closePanel();
            else openPanel(item, child);
          });
        } else {
          item = pill('a', textOfNode(child));
          item.href = child.path;
        }

        if (state.current && isWithin(state.current, child)) {
          item.classList.add('conversation-canvas-nav-current');
          item.setAttribute('aria-current', state.current === child ? 'page' : 'true');
        }
        items.push(item);
      });
    }

    const list = document.createElement('ul');
    list.className = 'conversation-canvas-nav-list';
    list.append(...items.map((item) => {
      const li = document.createElement('li');
      li.append(item);
      return li;
    }));
    nav.replaceChildren(list);
    nav.dataset.view = view.type;
    nav.hidden = state.collapsed || !items.length;
  }

  menuToggle.addEventListener('click', () => {
    if (!state.tree) return;
    if (defaultView().type === 'root') {
      state.collapsed = !state.collapsed;
      render();
    } else {
      setView(state.view.type === 'root' ? defaultView() : { type: 'root' });
    }
  });

  dock.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || panel.hidden) return;
    const opener = nav.querySelector('[aria-expanded="true"]');
    closePanel();
    opener?.focus();
  });

  document.addEventListener('pointerdown', (e) => {
    if (!panel.hidden && !dock.contains(e.target)) closePanel();
  });

  const { root, depth } = menuSettings(config);
  const tagLabels = resolveTags(getPageTags()).then((tags) => tags.map((tag) => tag.label));
  const loaded = Promise.all([loadMenuTree(root, depth), tagLabels]).then(([tree, labels]) => {
    if (!state.suggestions.length) state.suggestions = labels;
    state.tree = tree;
    state.current = findNode(tree, normalizePath(window.location.pathname));
    setView(defaultView());
  });

  skeletonWhile(nav, loaded, navSkeleton);
  loaded.catch((e) => console.error('conversation canvas navigation', e));

  docks.set(block, {
    setSuggestions(suggestions) {
      state.suggestions = suggestions;
      if (state.tree) setView(defaultView());
    },
  });
  return dock;
}

export function setConversationCanvasSuggestions(block, suggestions = []) {
  docks.get(block)?.setSuggestions(suggestions);
}

export function setConversationCanvasFilters(block, tags = []) {
  const list = block.querySelector('.conversation-canvas-filters');
  if (!list) return;
  list.hidden = !tags.length;
  list.replaceChildren(...tags.map(({ label, href, active }) => {
    const li = document.createElement('li');
    const tag = document.createElement(href ? 'a' : 'button');
    tag.className = `tag tag-filter${active ? ' active' : ''}`;
    tag.textContent = label;
    if (href) {
      tag.href = href;
      if (active) tag.setAttribute('aria-current', 'true');
    } else {
      tag.type = 'button';
      tag.setAttribute('aria-pressed', String(!!active));
    }
    tag.dataset.cmpInteraction = 'filter';
    tag.dataset.cmpValue = label;
    li.append(tag);
    return li;
  }));
}

export default async function decorate(block) {
  t = await getPlaceholders();
  const id = uniqueId('conversation-canvas');
  const { config, buttonRows } = readBlock(block);

  const style = normalize(textOf(config.classes));
  if (STYLES.includes(style)) block.classList.add(style);
  const primary = block.classList.contains('primary');
  block.classList.add(`conversation-canvas-bg-${toClassName(textOf(config.bgstyle)) || 'default'}`);
  const titleSize = normalize(textOf(config.titlesize));
  if (TITLE_SIZES.includes(titleSize)) block.classList.add(`conversation-canvas-title-${titleSize}`);

  const floats = !block.classList.contains('nofloat') && !block.classList.contains('decorative');

  if (primary) {
    const dock = buildDock(config, id, block);
    block.replaceChildren(dock);
    registerCanvas({
      block, row: dock, slot: null, primary, floats: true,
    });
    return;
  }

  const content = document.createElement('div');
  content.className = 'conversation-canvas-content';

  const background = imageOf(config.backgroundimage, '');
  if (background) {
    const bg = document.createElement('div');
    bg.className = 'conversation-canvas-background';
    bg.append(background);
    block.classList.add('conversation-canvas-has-background');
    block.append(bg);
  }

  const intro = document.createElement('div');
  intro.className = 'conversation-canvas-intro';
  const icon = imageOf(config.icon, textOf(config.iconalt));
  if (icon) {
    const iconWrap = document.createElement('div');
    iconWrap.className = 'conversation-canvas-icon';
    iconWrap.append(icon);
    intro.append(iconWrap);
  }
  if (textOf(config.eyebrow)) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'conversation-canvas-eyebrow';
    eyebrow.textContent = textOf(config.eyebrow);
    intro.append(eyebrow);
  }
  if (textOf(config.title)) {
    const title = document.createElement('h2');
    title.className = 'conversation-canvas-title';
    title.textContent = textOf(config.title);
    intro.append(title);
  }
  if (config.text && textOf(config.text)) {
    const text = document.createElement('div');
    text.className = 'conversation-canvas-text';
    text.append(...config.text.childNodes);
    intro.append(text);
  }
  if (intro.children.length) content.append(intro);

  const slot = document.createElement('div');
  slot.className = 'conversation-canvas-search-slot';
  const row = buildSearch(config, id);
  slot.append(row);
  content.append(slot);

  if (block.classList.contains('secondary')) {
    const filters = document.createElement('ul');
    filters.className = 'conversation-canvas-filters';
    filters.setAttribute('aria-label', t('suggestions', 'Suggestions'));
    filters.hidden = true;
    content.append(filters);
  }

  const built = buttonRows.map((buttonRow) => [buttonRow, buildListButton(buttonRow)]);
  const buttons = built.map(([, li]) => li).filter(Boolean);
  const pending = built.filter(([, li]) => !li).map(([buttonRow]) => buttonRow);
  if (pending.length) buttons.push(...buildEditorItems(pending, await editorItemHint(pending), 'li'));
  if (buttons.length) {
    const list = document.createElement('ul');
    list.className = 'conversation-canvas-buttons';
    list.append(...buttons);
    content.append(list);
  }

  block.replaceChildren(...block.querySelectorAll(':scope > .conversation-canvas-background'), content);
  registerCanvas({
    block, row, slot, primary, floats,
  });
}
