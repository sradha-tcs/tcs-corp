import { prefersReducedMotion } from '../../utils/environment.js';
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
 * - a Canvas row in use (focus in it) stays docked while it's on screen (focused in
 *   canvas-journey.js): the floating row doesn't come back over it while the user types
 * - one row in use at a time while a row floats: the other Canvas rows are inert placeholders;
 *   with no row floating (the header Canvas docked on the first screen, a section or the footer
 *   Canvas docked) every Canvas row is in use
 * - only active Canvases take part: one with Hide block or not shown (a hidden tab or section)
 *   never floats and nothing docks on it, wherever it is (header, page, footer, Primary)
 * - a failure here only stops the floating (nothing floats): page, header and footer still work
 * - writes on <html> (custom properties, the journey state) restyle the whole page: they are
 *   made only when the value changes, and resizes while the page loads are measured once they
 *   settle (RESIZE_SETTLE), not on every frame
 */

const FLOATING = 'conversation-canvas-floating';
const OWNER = 'conversation-canvas-owner';
const APPROACHING = 'conversation-canvas-approaching';
const HANDOFF = 'conversation-canvas-handoff';
const GLIDE = 'conversation-canvas-glide';
// a hand-over: the row now shown moves from where the previous one was (handOver)
const GLIDE_OPTIONS = { duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };
const glides = new WeakMap();
// the row the user sees ({ entry, floating }): the floating row, else the docked one
let shown = null;
// px the header Canvas row keeps below the fixed header bar when it rests on the opening section
const REST_GAP = 16;

const entries = [];
const registered = new WeakSet();
let geometry = null;
let previous = {};
let frame = 0;
let dirty = true;
let listening = false;
let suppressed = false;
// the entry whose row in place holds focus (see focusin below)
let focusedEntry = null;
let firstSectionBottom = null;
// the page loads in steps (sections, images, header, footer): measure once a step has settled
const RESIZE_SETTLE = 100;
let settleTimer = 0;
const rootValues = new Map();

/**
 * A custom property (or the journey state) on <html>, or on another element that holds every use
 * of it (a smaller restyle), written only when it changes.
 */
function setRoot(name, value, target = document.documentElement) {
  if (rootValues.get(name) === value) return;
  rootValues.set(name, value);
  if (name === 'state') target.dataset.canvasJourneyState = value;
  else target.style.setProperty(name, value);
}

// canvas blocks never contain each other, so b either follows or precedes a
const byDomOrder = (a, b) => (
  a.block.compareDocumentPosition(b.block) === Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

/** a Canvas back in its place: not floating, not landing, a Primary dock hidden */
function release(entry) {
  glides.get(entry.row)?.cancel();
  entry.row.classList.remove(FLOATING, HANDOFF, GLIDE);
  entry.block.classList.remove(OWNER);
  // a Primary dock in place is hidden; a Canvas row in place is usable
  entry.row.inert = !!entry.primary;
  if (entry.slot) {
    entry.slot.style.minHeight = '';
    entry.slot.classList.remove(APPROACHING);
  }
}

/** whether a Canvas takes part in the journey: not hidden (Hide block) and shown */
const isActive = (entry) => !entry.block.classList.contains('hideblock')
  && (entry.primary ? entry.block : entry.slot).getClientRects().length > 0;

/**
 * Whether a section shows nothing: every item in it is a hidden block (Hide block, e.g. a hidden
 * Page Header opening the page) or empty. Read from the markup, so a section still loading
 * (display: none) counts by its content. In edit mode hidden blocks show (faded), so they count.
 */
function showsNothing(section, editing) {
  return ![...section.children].some((wrapper) => wrapper.matches('.section-background')
    || [...wrapper.children].some((item) => {
      if (item.matches('.section-metadata')) return false;
      if (item.classList.contains('block')) return editing || !item.classList.contains('hideblock');
      return !!(item.textContent.trim() || item.querySelector('img, picture, video, iframe'));
    }));
}

/**
 * The section that opens the page: the first one that shows something, whatever its blocks are
 * (Hero, Teaser, Image Collage, text ...); hidden or empty sections before it are skipped.
 * @returns {Element | null}
 */
function openingSection() {
  const editing = document.documentElement.classList.contains('adobe-ue-edit');
  return [...document.querySelectorAll('main > .section')]
    .find((section) => !section.hidden && !showsNothing(section, editing)) || null;
}

/**
 * Where the header Canvas row rests at the top of the page: the bottom of the opening section
 * (document px), or '' for the bottom of the window (blocks/header/header.css falls back to it)
 * when the opening section is too short for the row to sit below the fixed header bar.
 * @param {Element | null} opener the opening section (loaded)
 * @param {Object | undefined} row the header Canvas entry
 * @returns {string}
 */
function restOf(opener, row) {
  if (!opener || !row) return '';
  const bottom = Math.round(opener.getBoundingClientRect().bottom + window.scrollY);
  // the row and the space below it, then the fixed header bar (its bottom at the top of the page)
  const below = parseFloat(getComputedStyle(row.slot).scrollMarginBottom) || 0;
  const room = row.row.offsetHeight + below;
  const bar = document.querySelector('header .nav-wrapper')?.getBoundingClientRect().bottom || 0;
  return bottom - room >= bar + REST_GAP ? `${bottom}px` : '';
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
  // only active Canvases take part: not one with Hide block (in the header and footer too, and
  // in the editor, where it shows faded) or one not shown (a hidden tab or section: no boxes);
  // one that was active lets go of the journey (no floating row, role or reserved space left)
  const live = entries.filter((e) => e.block.isConnected && isActive(e)).sort(byDomOrder);
  entries.filter((e) => e.block.isConnected && !live.includes(e)).forEach((e) => {
    release(e);
    delete e.block.dataset.canvasRole;
  });
  // the page's opening section, whatever its blocks (a hidden Page Header before it is skipped)
  const opener = openingSection();
  const roles = assignRoles(live.map((e) => ({
    primary: e.primary,
    inHeader: !!e.block.closest('header'),
    inFirstSection: !!opener?.contains(e.block),
    inFooter: !!e.block.closest('footer'),
  })));
  const { scrollY } = window;
  // the header Canvas row rests on the bottom of the opening section (blocks/header/header.css);
  // written before the rows are measured, as it moves that row. Until the opening section has
  // loaded its place isn't known: the header Canvas stays hidden, so it doesn't jump into place
  const header = document.querySelector('header');
  const pending = !!opener && opener.dataset.sectionStatus !== 'loaded';
  header?.toggleAttribute('data-canvas-opener-pending', pending);
  const rest = pending ? firstSectionBottom
    : restOf(opener, live.find((e) => !e.primary && e.block.closest('header')));
  if (rest !== firstSectionBottom) {
    firstSectionBottom = rest;
    // used only by the header Canvas (blocks/header/header.css): set on the header
    setRoot('--conversation-canvas-first-section-bottom', rest, header || document.documentElement);
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
  // a footer that isn't rendered (Hide Footer, or while the sections load) counts as none: its
  // top would read 0 and lift the floating row off the screen
  const footer = document.querySelector('footer');
  const footerShown = !!footer?.getClientRects().length;
  geometry = {
    live,
    canvases,
    offset,
    footerTop: footerShown ? footer.getBoundingClientRect().top + scrollY : null,
    documentHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  };
  dirty = false;
}

/** the box of a row when it is entirely in the window (null otherwise): a hand-over starts there */
function inWindow(row) {
  const box = row.getBoundingClientRect();
  return box.width > 0 && box.top >= 0 && box.bottom <= window.innerHeight ? box : null;
}

/**
 * Hands the Canvas row over to the row now shown: the floating row landing on a Canvas (the footer,
 * a section), lifting off it, or the header row starting / stopping to float on a short hero. The
 * row now shown starts where the previous one was, at its width, and glides to its own place and
 * width (FLIP), fully visible all along: one row that moves, never one disappearing while another
 * fades in. Reduced motion and the editor: the rows swap at once (no movement, no fade).
 * @param {Element} row the row now shown
 * @param {DOMRect} from where the previous row was (read before this frame's writes)
 */
function handOver(row, from) {
  glides.get(row)?.cancel();
  if (typeof row.animate !== 'function') return;
  // the floating row's fade-in would start over it; kept while it floats (taking it off would
  // start the fade-in then)
  if (row.classList.contains(FLOATING)) row.classList.add(GLIDE);
  // one layout read per hand-over (FLIP: the row's place after the class changes)
  const to = row.getBoundingClientRect();
  const still = prefersReducedMotion() || document.documentElement.classList.contains('adobe-ue-edit');
  // the floating row is centred with transform (conversation-canvas.css); the row in place isn't
  const at = (y) => (row.classList.contains(FLOATING) ? `translate(-50%, ${y}px)` : `translateY(${y}px)`);
  const keyframes = still
    ? [{ opacity: 1 }, { opacity: 1 }]
    : [
      { transform: at(Math.round(from.top - to.top)), width: `${from.width}px`, opacity: 1 },
      { transform: at(0), width: `${to.width}px`, opacity: 1 },
    ];
  const animation = row.animate(keyframes, still ? { duration: 200 } : GLIDE_OPTIONS);
  glides.set(row, animation);
  const done = () => {
    if (glides.get(row) !== animation) return;
    glides.delete(row);
    if (!row.classList.contains(FLOATING)) row.classList.remove(GLIDE);
  };
  animation.addEventListener('finish', done);
  animation.addEventListener('cancel', done);
}

/** applies a journey result: classes, the reserved space of a floating row, the footer lift */
function apply(result) {
  const { live, canvases, offset } = geometry;
  // the row the user sees before this result (read before the writes below): the floating row,
  // else the docked one; Primary docks hand over nothing (they float on their own)
  const was = shown && !shown.entry.primary && shown.entry.block.isConnected ? shown : null;
  const from = was ? inWindow(was.entry.row) : null;
  // while a row floats it is the only one in use: the other Canvas rows are placeholders (inert:
  // not clicked, focused or read out, e.g. a row hidden while the floating row comes up to it);
  // with none floating (a row docked) every row is in use. Not in the editor, where authors
  // select them
  const floating = result.owner >= 0;
  const editing = document.documentElement.classList.contains('adobe-ue-edit');
  live.forEach((entry, i) => {
    const floats = i === result.owner;
    const { block, row, slot } = entry;
    block.dataset.canvasRole = canvases[i].role || 'dock';
    block.classList.toggle(OWNER, floats);
    if (entry.primary) {
      // a hidden dock can't be reached by keyboard or screen readers
      row.inert = !floats;
    } else {
      row.inert = floating && !floats && !editing;
      // keep the place of the row while it floats, so the page doesn't move
      slot.style.minHeight = floats ? `${canvases[i].rowHeight}px` : '';
      // the floating row lands on the next Canvas: its own row shows once it has arrived
      slot.classList.toggle(APPROACHING, i === result.approaching && result.owner >= 0);
    }
    // lifting off the row of a canvas coming up from below: no entry animation (already there)
    const wasFloating = row.classList.contains(FLOATING);
    if (!floats) row.classList.remove(HANDOFF, GLIDE);
    else if (!wasFloating) {
      row.classList.toggle(HANDOFF, result.approaching >= 0);
    }
    row.classList.toggle(FLOATING, floats);
    row.style.setProperty('--conversation-canvas-lift', floats ? `${result.lift}px` : '0px');
  });
  // the row now shown takes over from the previous one where it was on screen (a previous row
  // that wasn't entirely in the window, e.g. a section row that has left the top: the floating
  // row comes in with its own fade-in instead of moving across the page)
  const index = result.owner >= 0 ? result.owner : result.docked;
  const now = index >= 0 ? { entry: live[index], floating: result.owner >= 0 } : null;
  if (from && now && !now.entry.primary
    && (now.entry !== was.entry || now.floating !== was.floating)) {
    handOver(now.entry.row, from);
  }
  shown = now;
  // focused elements scroll clear of the floating row (scroll-padding-bottom in the CSS)
  const owner = canvases[result.owner];
  const obscured = owner && !owner.primary ? owner.rowHeight + offset : 0;
  setRoot('--conversation-canvas-obscured', `${obscured}px`);
  setRoot('state', result.state);
}

function update() {
  frame = 0;
  try {
    if (dirty) measure();
    if (!geometry?.live.length) return;
    const focused = focusedEntry ? geometry.live.indexOf(focusedEntry) : -1;
    const result = resolveJourney({
      ...geometry, scrollY: window.scrollY, suppressed, focused,
    });
    const changed = Object.keys(result).some((key) => result[key] !== previous[key]);
    if (changed) apply(result);
    previous = result;
  } catch {
    // isolate the failure: nothing floats, every row stays in its place
    entries.forEach(release);
    setRoot('state', STATES.HIDDEN);
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

/** a resize of the page: measured once it has settled */
function remeasureSettled() {
  clearTimeout(settleTimer);
  settleTimer = setTimeout(remeasure, RESIZE_SETTLE);
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
    // a row in use (focus in it, e.g. typing in a docked row) stays docked while it's on screen,
    // so it doesn't turn into a placeholder under the user's hands (focused in canvas-journey.js)
    document.addEventListener('focusin', (e) => {
      const held = entries.find((x) => !x.primary && x.row.contains(e.target));
      const next = held && !held.row.classList.contains(FLOATING) ? held : null;
      if (next === focusedEntry) return;
      focusedEntry = next;
      // at once, in this frame
      cancelAnimationFrame(frame);
      update();
    });
    document.addEventListener('focusout', (e) => {
      if (focusedEntry && !focusedEntry.row.contains(e.relatedTarget)) {
        focusedEntry = null;
        schedule();
      }
    });
    // sections, images, fonts, header and footer load later and move the page
    new ResizeObserver(remeasureSettled).observe(document.body);
  }
  remeasure();
}
