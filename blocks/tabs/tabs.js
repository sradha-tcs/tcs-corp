import { toClassName } from '../../scripts/aem.js';
import { isEditing } from '../../utils/environment.js';
import { uniqueId } from '../../utils/ids.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { readTab } from '../tab/tab.js';

/*
 * Tabs, like the Tabs core component of AEM: built by scripts.js from a Tabs section. The
 * section's Tab items start the tabs; the components after a Tab (Columns, Title, Text, Image,
 * Button), up to the next Tab, are its content. The block turns them into a tab list and one
 * panel per tab; the components keep their own markup, decoration and editor instrumentation.
 *
 * Shown first: the tab shown before Universal Editor re-rendered the section, else the tab
 * the page address names (#ID, a deep link), else the Active tab, else the first.
 */

// the tab shown per Tabs section, so a section re-rendered after an edit shows the same tab
const shownTabs = new Map();
let listeningToHash = false;

/** the panel the page address names (#ID), if it's a tab panel */
function panelOfHash() {
  const id = toClassName(decodeURIComponent(window.location.hash.slice(1)));
  const panel = id ? document.getElementById(id) : null;
  return panel?.matches('.tabs .tabs-panel') ? panel : null;
}

/** deep links: a link to a tab's ID (or back / forward to one) opens the tab and scrolls to it */
function openPanelOfHash() {
  const panel = panelOfHash();
  if (!panel) return;
  document.getElementById(panel.getAttribute('aria-labelledby'))?.click();
  panel.closest('.tabs').scrollIntoView();
}

function listenToHash() {
  if (listeningToHash) return;
  listeningToHash = true;
  window.addEventListener('hashchange', openPanelOfHash);
}

/**
 * Groups the block's content into tabs: each Tab item starts one, content before the first
 * Tab starts an untitled one.
 * @param {Element} block
 * @returns {{ tab: Element|null, content: Element[] }[]}
 */
function groupTabs(block) {
  const groups = [];
  [...block.children].forEach((wrapper) => {
    const tab = wrapper.querySelector(':scope > .tab');
    if (tab || !groups.length) groups.push({ tab, content: [] });
    groups[groups.length - 1].content.push(wrapper);
  });
  return groups;
}

/** an id not used on the page yet */
function freeId(id) {
  let free = id;
  for (let n = 2; document.getElementById(free); n += 1) free = `${id}-${n}`;
  return free;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const t = await getPlaceholders();
  const section = block.closest('.section');
  const baseId = section?.id || uniqueId('tabs');
  const key = section?.dataset.aueResource || baseId;
  const vertical = block.classList.contains('vertical');
  const groups = groupTabs(block);

  if (!groups.length) {
    block.replaceChildren();
    if (isEditing()) {
      const hint = document.createElement('p');
      hint.className = 'tabs-empty';
      hint.textContent = t('tabsEmpty', 'Add a Tab, then the components of the tab after it.');
      block.append(hint);
    }
    return;
  }

  const list = document.createElement('div');
  list.className = 'tabs-list';
  list.setAttribute('role', 'tablist');
  if (vertical) list.setAttribute('aria-orientation', 'vertical');
  if (block.dataset.label) list.setAttribute('aria-label', block.dataset.label);

  const tabs = groups.map(({ tab, content }, i) => {
    const { title, id, active } = tab ? readTab(tab) : {};
    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.id = freeId(id || `${baseId}-item-${i + 1}`);
    panel.setAttribute('role', 'tabpanel');
    panel.tabIndex = 0;
    panel.append(...content);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tabs-tab';
    button.id = `${panel.id}-tab`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', panel.id);
    button.textContent = title || t('tabNumber', 'Tab {n}', { n: i + 1 });
    panel.setAttribute('aria-labelledby', button.id);
    list.append(button);
    return { button, panel, active };
  });
  block.replaceChildren(list, ...tabs.map(({ panel }) => panel));

  const select = (index, { focus = false, notify = true } = {}) => {
    tabs.forEach(({ button, panel }, i) => {
      const selected = i === index;
      button.setAttribute('aria-selected', selected);
      button.tabIndex = selected ? 0 : -1;
      panel.hidden = !selected;
    });
    if (focus) tabs[index].button.focus();
    const changed = shownTabs.get(key) !== index;
    shownTabs.set(key, index);
    if (!notify || !changed) return;
    const { panel, button } = tabs[index];
    const detail = { index, id: panel.id, title: button.textContent };
    block.dispatchEvent(new CustomEvent('tabs:change', { bubbles: true, detail }));
    // Adobe Client Data Layer, when the site loads it (like the core component)
    window.adobeDataLayer?.push({ event: 'cmp:show', eventInfo: { path: `component.${panel.id}` } });
  };

  tabs.forEach(({ button }, i) => button.addEventListener('click', () => select(i)));
  list.addEventListener('keydown', (e) => {
    const current = tabs.findIndex(({ button }) => button === document.activeElement);
    if (current < 0) return;
    const last = tabs.length - 1;
    const previous = current === 0 ? last : current - 1;
    const next = current === last ? 0 : current + 1;
    const index = {
      ArrowLeft: previous,
      ArrowUp: previous,
      ArrowRight: next,
      ArrowDown: next,
      Home: 0,
      End: last,
    }[e.key];
    if (index === undefined) return;
    e.preventDefault();
    select(index, { focus: true });
  });

  // Universal Editor: show the tab of the component selected in the editor
  block.addEventListener('aue:ui-select', (e) => {
    const panel = e.detail?.selected && e.target.closest('.tabs-panel');
    const index = tabs.findIndex((tab) => tab.panel === panel);
    if (index >= 0) select(index);
  });
  // a Tab edited in Universal Editor: update its tab
  block.addEventListener('tabs:tab-update', (e) => {
    const tab = tabs.find(({ panel }) => panel.contains(e.target));
    if (tab && e.detail.title) tab.button.textContent = e.detail.title;
  });

  const linked = panelOfHash();
  const shown = [
    shownTabs.get(key) ?? -1,
    tabs.findIndex(({ panel }) => panel === linked),
    tabs.findIndex(({ active }) => active),
  ].find((index) => index >= 0 && index < tabs.length);
  select(shown ?? 0, { notify: false });

  listenToHash();
  // a page opened at a tab's ID: scroll to it once the page has its layout
  if (linked && tabs.some(({ panel }) => panel === linked)) {
    if (document.readyState === 'complete') requestAnimationFrame(openPanelOfHash);
    else window.addEventListener('load', openPanelOfHash, { once: true });
  }
}
