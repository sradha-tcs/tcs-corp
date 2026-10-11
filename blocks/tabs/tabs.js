/*
 * Tabs Block (Block Collection): one panel per item, its first cell is the tab title.
 * https://www.aem.live/developer/block-collection/tabs
 * Adapted: ARIA tabs keyboard support (arrow keys, Home, End) with a roving tabindex.
 */
import { moveInstrumentation } from '../../scripts/scripts.js';

// number of tab blocks on the page, for unique ids
let tabBlockCount = 0;

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  tabBlockCount += 1;
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');
  tablist.id = `tablist-${tabBlockCount}`;

  // the first cell of each row is the title of the tab
  const tabHeadings = [...block.children]
    .filter((child) => child.firstElementChild && child.firstElementChild.children.length > 0)
    .map((child) => child.firstElementChild);

  const buttons = [];
  const panels = [];

  const select = (index, focus = false) => {
    buttons.forEach((button, i) => {
      const selected = i === index;
      button.setAttribute('aria-selected', selected);
      button.tabIndex = selected ? 0 : -1;
      panels[i].setAttribute('aria-hidden', !selected);
      panels[i].hidden = !selected;
    });
    if (focus) buttons[index].focus();
  };

  tabHeadings.forEach((tab, i) => {
    const id = `tabpanel-${tabBlockCount}-tab-${i + 1}`;
    const tabpanel = tab.parentElement;
    tabpanel.className = 'tabs-panel';
    tabpanel.id = id;
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');
    tabpanel.tabIndex = 0;

    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.type = 'button';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', id);
    button.append(...tab.childNodes);
    button.addEventListener('click', () => select(i));

    tablist.append(button);
    buttons.push(button);
    panels.push(tabpanel);

    // remove the tab heading from the dom, which also removes it from the UE tree
    tab.remove();
    // remove the instrumentation from the button's heading (removes it from the tree)
    if (button.firstElementChild) moveInstrumentation(button.firstElementChild, null);
  });

  tablist.addEventListener('keydown', (e) => {
    const current = buttons.indexOf(document.activeElement);
    if (current < 0) return;
    const last = buttons.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  });

  block.prepend(tablist);
  if (buttons.length) select(0);
}
