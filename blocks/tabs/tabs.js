import { moveInstrumentation } from '../../scripts/scripts.js';

const MORE_LABEL = 'More';

let blockCount = 0;

/**
 * Builds the overflow dropdown that holds tabs which don't fit on one line.
 * @param {string} id Unique id prefix
 * @returns {{ more: Element, toggle: Element, label: Element, menu: Element }}
 */
function buildMore(id) {
  const more = document.createElement('div');
  more.className = 'tabs-more';
  more.hidden = true;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'tabs-tab tabs-more-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', `${id}-more`);

  const label = document.createElement('span');
  label.textContent = MORE_LABEL;
  const icon = document.createElement('span');
  icon.className = 'tabs-more-icon';
  icon.setAttribute('aria-hidden', 'true');
  toggle.append(label, icon);

  const menu = document.createElement('ul');
  menu.className = 'tabs-more-list';
  menu.id = `${id}-more`;
  menu.hidden = true;

  more.append(toggle, menu);
  return {
    more, toggle, label, menu,
  };
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  blockCount += 1;
  const id = `tabs-${blockCount}`;

  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  const tabs = [];
  const panels = [];
  [...block.children].forEach((row, i) => {
    const [labelCell, ...contentCells] = [...row.children];

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'tabs-tab';
    tab.id = `${id}-tab-${i}`;
    tab.setAttribute('role', 'tab');
    tab.textContent = labelCell?.textContent.trim() || `Tab ${i + 1}`;
    if (labelCell) moveInstrumentation(labelCell, tab);

    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.id = `${id}-panel-${i}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    moveInstrumentation(row, panel);
    panel.append(...contentCells);

    tab.setAttribute('aria-controls', panel.id);
    tabs.push(tab);
    panels.push(panel);
  });

  const {
    more, toggle, label, menu,
  } = buildMore(id);

  const nav = document.createElement('div');
  nav.className = 'tabs-nav';
  tablist.append(...tabs);
  nav.append(tablist, more);
  block.replaceChildren(nav, ...panels);

  let active = 0;
  let frame;
  let layout = () => {};
  const scheduleLayout = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => layout());
  };

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  // the toggle shows the active tab's label when that tab has overflowed;
  // returns true when the label changed, since that can change what fits
  const updateToggle = () => {
    const overflowed = tabs[active]?.hidden;
    const text = overflowed ? tabs[active].textContent : MORE_LABEL;
    const changed = label.textContent !== text;
    label.textContent = text;
    toggle.classList.toggle('active', !!overflowed);
    return changed;
  };

  const activate = (index, focus = false) => {
    active = index;
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', selected);
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    menu.querySelectorAll('.tabs-more-item').forEach((item) => {
      if (Number(item.dataset.index) === index) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
    if (focus) tabs[index].focus();
    if (updateToggle()) scheduleLayout();
  };

  const buildMenu = (hiddenIndexes) => {
    menu.replaceChildren(...hiddenIndexes.map((i) => {
      const li = document.createElement('li');
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'tabs-more-item';
      item.dataset.index = i;
      item.textContent = tabs[i].textContent;
      if (i === active) item.setAttribute('aria-current', 'true');
      item.addEventListener('click', () => {
        activate(i);
        closeMenu();
        toggle.focus();
      });
      li.append(item);
      return li;
    }));
  };

  // move tabs that don't fit into the dropdown, from the end, keeping at least one visible
  layout = () => {
    tabs.forEach((tab) => { tab.hidden = false; });
    more.hidden = true;
    const hidden = [];
    if (tablist.scrollWidth > tablist.clientWidth) {
      more.hidden = false;
      for (let i = tabs.length - 1; i > 0 && tablist.scrollWidth > tablist.clientWidth; i -= 1) {
        tabs[i].hidden = true;
        hidden.unshift(i);
      }
    }
    if (!hidden.length) closeMenu();
    buildMenu(hidden);
    updateToggle();
  };

  tabs.forEach((tab, i) => tab.addEventListener('click', () => activate(i)));

  tablist.addEventListener('keydown', (e) => {
    const visible = tabs.filter((tab) => !tab.hidden);
    const current = visible.indexOf(document.activeElement);
    if (current < 0) return;
    const next = {
      ArrowRight: (current + 1) % visible.length,
      ArrowLeft: (current - 1 + visible.length) % visible.length,
      Home: 0,
      End: visible.length - 1,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    activate(tabs.indexOf(visible[next]), true);
  });

  toggle.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', open);
    if (open) menu.querySelector('button')?.focus();
  });

  more.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      closeMenu();
      toggle.focus();
    }
  });

  more.addEventListener('focusout', (e) => {
    if (!more.contains(e.relatedTarget)) closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!more.contains(e.target)) closeMenu();
  });

  // in Universal Editor, selecting a tab item in the content tree opens its panel
  block.addEventListener('aue:ui-select', (e) => {
    if (!e.detail?.selected) return;
    const index = panels.indexOf(e.target.closest?.('.tabs-panel'));
    if (index >= 0) activate(index);
  });

  activate(0);

  new ResizeObserver(scheduleLayout).observe(nav);
  document.fonts?.ready.then(scheduleLayout);
}
