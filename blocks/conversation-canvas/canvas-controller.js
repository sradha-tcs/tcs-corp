import { assignRoles, resolveJourney, STATES } from './canvas-journey.js';

/*
 * Canvas controller: one per page, shared by every Conversation Canvas (header, page, footer).
 * The journey (canvas-journey.js) decides which Canvas floats; this module only measures and
 * applies it:
 * - measures the search rows' places, the footer and the floating offset when Canvases register,
 *   the page resizes or content loads (ResizeObserver), never while scrolling
 * - on scroll (passive, one update per animation frame) reads only scrollY and toggles classes
 *   when the result changes; rows float with position: fixed in their own block, so the DOM
 *   (reading order, focus, listeners, editor instrumentation) never moves and is never cloned
 * - the journey state is <html data-canvas-journey-state> (STATES); the header announces its
 *   menu with a header:menu event ({ open }): the floating Canvas is HIDDEN while it's open
 * - a failure here only stops the floating (nothing floats): page, header and footer still work
 */

const FLOATING = 'conversation-canvas-floating';
const OWNER = 'conversation-canvas-owner';
const APPROACHING = 'conversation-canvas-approaching';
const HANDOFF = 'conversation-canvas-handoff';

const entries = [];
const registered = new WeakSet();
let geometry = null;
let previous = {};
let frame = 0;
let dirty = true;
let listening = false;
let suppressed = false;
let firstSectionBottom = null;

// canvas blocks never contain each other, so b either follows or precedes a
const byDomOrder = (a, b) => (
  a.block.compareDocumentPosition(b.block) === Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

/** a Canvas back in its place: not floating, not landing, a Primary dock hidden */
function release(entry) {
  entry.row.classList.remove(FLOATING, HANDOFF);
  entry.block.classList.remove(OWNER);
  if (entry.primary) entry.row.inert = true;
  if (entry.slot) {
    entry.slot.style.minHeight = '';
    entry.slot.classList.remove(APPROACHING);
  }
}

/** reads the page geometry (layout reads only, the writes follow in apply) */
function measure() {
  // drop Canvases taken off the page (re-decorated in Universal Editor); keep ones not attached
  // yet (a footer or header Canvas is decorated in its fragment before it's added to the page)
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const entry = entries[i];
    if (entry.block.isConnected) entry.seen = true;
    else if (entry.seen) {
      release(entry);
      entries.splice(i, 1);
    }
  }
  const live = entries.filter((e) => e.block.isConnected).sort(byDomOrder);
  const firstSection = document.querySelector('main > .section');
  const roles = assignRoles(live.map((e) => ({
    primary: e.primary,
    inHeader: !!e.block.closest('header'),
    inFirstSection: !!firstSection?.contains(e.block),
    inFooter: !!e.block.closest('footer'),
  })));
  const { scrollY } = window;
  // the header Canvas over an opening hero lines up with the bottom of the first section
  // (blocks/header/header.css); written before the rows are measured, as it moves that row
  const bottom = firstSection
    ? Math.round(firstSection.getBoundingClientRect().bottom + scrollY) : 0;
  if (bottom !== firstSectionBottom) {
    firstSectionBottom = bottom;
    document.documentElement.style.setProperty('--conversation-canvas-first-section-bottom', `${bottom}px`);
  }
  const canvases = live.map((e, i) => {
    if (e.primary) {
      return {
        primary: true, floats: e.floats, role: null, top: null, bottom: null, rowHeight: 0,
      };
    }
    const rect = e.slot.getBoundingClientRect();
    return {
      primary: false,
      floats: e.floats,
      role: roles[i],
      inHeader: !!e.block.closest('header'),
      top: rect.top + scrollY,
      bottom: rect.bottom + scrollY,
      rowHeight: e.row.offsetHeight,
    };
  });
  // the floating offset (space below the floating row, safe area included) as resolved px
  const slot = live.find((e) => e.slot)?.slot;
  const offset = slot ? parseFloat(getComputedStyle(slot).scrollMarginBottom) || 0 : 0;
  const footer = document.querySelector('footer');
  geometry = {
    live,
    canvases,
    offset,
    footerTop: footer ? footer.getBoundingClientRect().top + scrollY : null,
    documentHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  };
  dirty = false;
}

/** applies a journey result: classes, the reserved space of a floating row, the footer lift */
function apply(result) {
  const { live, canvases, offset } = geometry;
  live.forEach((entry, i) => {
    const floats = i === result.owner;
    const { block, row, slot } = entry;
    block.dataset.canvasRole = canvases[i].role || 'dock';
    block.classList.toggle(OWNER, floats);
    if (entry.primary) {
      // a hidden dock can't be reached by keyboard or screen readers
      row.inert = !floats;
    } else {
      // keep the place of the row while it floats, so the page doesn't move
      slot.style.minHeight = floats ? `${canvases[i].rowHeight}px` : '';
      // the floating row lands on the next Canvas: its own row shows once it has arrived
      slot.classList.toggle(APPROACHING, i === result.approaching && result.owner >= 0);
    }
    // lifting off the row of a canvas coming up from below: no entry animation (already there)
    if (!floats) row.classList.remove(HANDOFF);
    else if (!row.classList.contains(FLOATING)) {
      row.classList.toggle(HANDOFF, result.approaching >= 0);
    }
    row.classList.toggle(FLOATING, floats);
    row.style.setProperty('--conversation-canvas-lift', floats ? `${result.lift}px` : '0px');
  });
  // focused elements scroll clear of the floating row (scroll-padding-bottom in the CSS)
  const owner = canvases[result.owner];
  const obscured = owner && !owner.primary ? owner.rowHeight + offset : 0;
  document.documentElement.style.setProperty('--conversation-canvas-obscured', `${obscured}px`);
  document.documentElement.dataset.canvasJourneyState = result.state;
}

function update() {
  frame = 0;
  try {
    if (dirty) measure();
    if (!geometry?.live.length) return;
    const result = resolveJourney({ ...geometry, scrollY: window.scrollY, suppressed });
    const changed = Object.keys(result).some((key) => result[key] !== previous[key]);
    if (changed) apply(result);
    previous = result;
  } catch {
    // isolate the failure: nothing floats, every row stays in its place
    entries.forEach(release);
    document.documentElement.dataset.canvasJourneyState = STATES.HIDDEN;
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

function remeasure() {
  dirty = true;
  previous = {};
  schedule();
}

/**
 * Adds a Canvas to the journey; the shared listeners are attached once.
 * @param {Object} entry
 * @param {Element} entry.block The conversation canvas block
 * @param {Element} entry.row The element that floats (search row, or the Primary dock)
 * @param {Element|null} entry.slot The place of the row on the page (null for Primary)
 * @param {boolean} entry.primary Primary (sticky): the dock, without a place on the page
 * @param {boolean} entry.floats false: the Canvas is a docking point but never floats itself
 */
export default function registerCanvas(entry) {
  if (registered.has(entry.block)) return;
  registered.add(entry.block);
  entries.push({ ...entry, seen: entry.block.isConnected });
  if (!listening) {
    listening = true;
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', remeasure);
    // the header menu covers the page (blocks/header): no floating Canvas while it's open
    suppressed = !!document.querySelector('header .nav-hamburger button[aria-expanded="true"]');
    document.addEventListener('header:menu', (e) => {
      suppressed = !!e.detail?.open;
      schedule();
    });
    // sections, images, fonts, header and footer load later and move the page
    new ResizeObserver(remeasure).observe(document.body);
  }
  remeasure();
}
