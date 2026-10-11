import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { scrollBehavior } from '../../utils/environment.js';
import { readMultifieldItems } from '../../utils/multifield.js';
import { isOn, readProperties } from '../../utils/properties.js';

/*
 * Anchor List (blocks/anchor-list/_anchor-list.json): chapter navigation. Each link jumps to
 * the section whose Anchor name (Section properties) matches, or to an element with that id.
 * The link of the section in view is marked current (Figma "Chapter Nav").
 */

/**
 * Reads the Links composite multifield: items are runs of elements between <hr>s (or list
 * items), each with a Link Title and an Anchor Name.
 * @returns {{ label: string, anchor: string }[]}
 */
function readAnchors(cell) {
  return readMultifieldItems(cell).map((item) => {
    const texts = item.map((el) => el.textContent.trim()).filter(Boolean);
    const [label, anchor] = texts;
    // an anchor name may be typed with or without "#"; fall back to the title
    return { label, anchor: toClassName((anchor || label || '').replace(/^#/, '')) };
  }).filter(({ label, anchor }) => label && anchor);
}

const targetOf = (anchor) => document.getElementById(anchor);

/**
 * Space to leave above a target: below this list when it is sticky, otherwise below the site
 * header when that is fixed (mobile).
 */
function scrollOffset(block) {
  const sticky = block.classList.contains('sticky') ? block.closest('.section') || block : null;
  if (sticky) {
    const top = parseFloat(getComputedStyle(sticky).top) || 0;
    return Math.ceil(top + sticky.getBoundingClientRect().height + 16);
  }
  const header = document.querySelector('header .nav-wrapper');
  const fixed = header && ['fixed', 'sticky'].includes(getComputedStyle(header).position);
  return Math.ceil((fixed ? header.getBoundingClientRect().height : 0) + 16);
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const props = readProperties(block);
  const anchors = readAnchors(props.anchors);
  block.classList.toggle('sticky', isOn(props.sticky));

  const nav = document.createElement('nav');
  nav.className = 'anchor-list-nav';
  nav.setAttribute('aria-label', 'On this page');
  const list = document.createElement('ul');
  list.className = 'anchor-list-items';
  if (props.anchors) moveInstrumentation(props.anchors, list);

  const links = anchors.map(({ label, anchor }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'anchor-list-link';
    a.href = `#${anchor}`;
    a.textContent = label;
    a.addEventListener('click', (e) => {
      const target = targetOf(anchor);
      if (!target) return;
      e.preventDefault();
      target.style.scrollMarginTop = `${scrollOffset(block)}px`;
      target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
      window.history.replaceState(null, '', `#${anchor}`);
      // move keyboard focus to the chapter without scrolling again
      if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    });
    li.append(a);
    list.append(li);
    return a;
  });
  nav.append(list);
  block.replaceChildren(nav);
  if (!links.length) return;

  // current chapter: the last target whose top has scrolled past the offset
  let current = null;
  const setCurrent = (link) => {
    if (link === current) return;
    current?.removeAttribute('aria-current');
    current = link;
    if (!link) return;
    link.setAttribute('aria-current', 'true');
    // keep the current link visible when the list scrolls sideways
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: scrollBehavior() });
  };
  let frame = 0;
  const update = () => {
    frame = 0;
    const offset = scrollOffset(block) + 1;
    const visible = anchors.map(({ anchor }, i) => ({ target: targetOf(anchor), link: links[i] }))
      // skip missing targets and sections that are still hidden while the page loads
      .filter(({ target }) => target?.getClientRects().length);
    let active = null;
    visible.forEach(({ target, link }) => {
      if (target.getBoundingClientRect().top <= offset) active = link;
    });
    // at the end of the page the last chapter may never reach the top
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atEnd && visible.length && window.scrollY > 0) active = visible[visible.length - 1].link;
    setCurrent(active || links[0]);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  // sections are shown as they load: check again once they are visible
  new ResizeObserver(schedule).observe(document.body);
  update();
}
