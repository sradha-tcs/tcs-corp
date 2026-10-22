/* Unit tests of the Canvas journey (blocks/conversation-canvas/canvas-journey.js): npm test */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ROLES, STATES, TRANSITIONS, assignRoles, isAllowedTransition, resolveJourney,
} from '../../blocks/conversation-canvas/canvas-journey.js';

/*
 * A 1000px viewport, a 24px floating offset and 72px search rows: the dock line (the top of the
 * floating row) is at 1000 - 24 - 72 = 904px. Search rows (document coordinates): hero 500-572
 * (first section), section 3000-3072, footer 6000-6072; the footer starts at 5800, page 6400 high.
 */
const VH = 1000;
const ROW = 72;
const slot = (top, extra = {}) => ({
  primary: false, floats: true, top, bottom: top + ROW, rowHeight: ROW, ...extra,
});
const PRIMARY = {
  primary: true, floats: true, top: null, bottom: null, rowHeight: 0,
};
/** canvases with roles: places are 'hero' (first section), 'header', 'footer' or a section */
const withRoles = (canvases, places = []) => {
  const roles = assignRoles(canvases.map((c, i) => ({
    primary: c.primary,
    inHeader: places[i] === 'header',
    inFirstSection: places[i] === 'hero',
    inFooter: places[i] === 'footer',
  })));
  return canvases.map((c, i) => ({ ...c, role: roles[i] }));
};
const page = (canvases, places, extra = {}) => (scrollY, more = {}) => resolveJourney({
  scrollY,
  viewportHeight: VH,
  documentHeight: 6400,
  offset: 24,
  footerTop: 5800,
  canvases: withRoles(canvases, places),
  ...extra,
  ...more,
});
// the scroll position at which a row at `top` reaches the dock line
const arrival = (top) => top - (VH - 24 - ROW);
const MAX = 6400 - VH;

const home = page([slot(500), slot(3000), slot(6000)], ['hero', 'section', 'footer']);

/** the states of a continuous scroll, down then up, and whether every change is allowed */
function walk(resolve, step = 5) {
  const states = [];
  for (let y = 0; y <= MAX; y += step) states.push(resolve(y).state);
  for (let y = MAX; y >= 0; y -= step) states.push(resolve(y).state);
  const bad = states.slice(1).map((to, i) => [states[i], to])
    .filter(([from, to]) => !isAllowedTransition(from, to));
  return { states, bad };
}

describe('roles from placement', () => {
  it('header, section and footer', () => {
    assert.deepEqual(
      assignRoles([{ inHeader: true }, {}, { inFooter: true }]),
      [ROLES.HEADER, ROLES.SECTION, ROLES.FOOTER],
    );
  });

  it('the hero (first Canvas, in the first section) starts the journey without a header Canvas', () => {
    assert.deepEqual(
      assignRoles([{ inFirstSection: true }, {}, { inFooter: true }]),
      [ROLES.HEADER, ROLES.SECTION, ROLES.FOOTER],
    );
  });

  it('a first Canvas further down the page is a section, not the start', () => {
    assert.deepEqual(assignRoles([{}, { inFooter: true }]), [ROLES.SECTION, ROLES.FOOTER]);
  });

  it('only the last Canvas in the footer is the footer stop; Primary has no role', () => {
    assert.deepEqual(
      assignRoles([{ primary: true }, { inFooter: true }, { inFooter: true }]),
      [null, ROLES.SECTION, ROLES.FOOTER],
    );
  });
});

describe('the journey down the page', () => {
  it('INITIAL: the hero Canvas in place', () => {
    const r = home(0);
    assert.equal(r.state, STATES.INITIAL);
    assert.equal(r.docked, 0);
    assert.equal(r.owner, -1);
  });

  it('FLOATING once the hero row has scrolled off the top', () => {
    const r = home(600);
    assert.equal(r.state, STATES.FLOATING);
    assert.equal(r.owner, 0);
  });

  it('still FLOATING while the section Canvas comes up (the landing target)', () => {
    const r = home(arrival(3000) - 50);
    assert.equal(r.state, STATES.FLOATING);
    assert.equal(r.approaching, 1);
  });

  it('SECTION_DOCKED when the section row reaches the floating position', () => {
    const r = home(arrival(3000));
    assert.equal(r.state, STATES.SECTION_DOCKED);
    assert.equal(r.docked, 1);
    assert.equal(r.owner, -1);
  });

  it('FLOATING_AFTER_SECTION: the section Canvas floats on (its variation)', () => {
    const r = home(3100);
    assert.equal(r.state, STATES.FLOATING_AFTER_SECTION);
    assert.equal(r.owner, 1);
  });

  it('FOOTER_DOCKED at the footer Canvas, down to the very bottom', () => {
    assert.equal(home(arrival(6000) - 1).approaching, 2);
    assert.equal(home(arrival(6000)).state, STATES.FOOTER_DOCKED);
    assert.equal(home(MAX).state, STATES.FOOTER_DOCKED);
    assert.equal(home(MAX).owner, -1);
  });

  it('at most one Canvas floats, never while one is docked', () => {
    for (let y = 0; y <= MAX; y += 25) {
      const r = home(y);
      assert.ok(r.owner === -1 || r.docked === -1, `owner and docked at ${y}`);
    }
  });
});

describe('transitions', () => {
  it('continuous scrolling down and up only makes allowed transitions', () => {
    const { states, bad } = walk(home);
    assert.deepEqual(bad, []);
    assert.deepEqual([...new Set(states)].sort(), [
      STATES.FLOATING, STATES.FLOATING_AFTER_SECTION, STATES.FOOTER_DOCKED, STATES.INITIAL,
      STATES.SECTION_DOCKED,
    ].sort());
  });

  it('scrolling up: FOOTER_DOCKED -> FLOATING_AFTER_SECTION -> SECTION_DOCKED -> FLOATING -> INITIAL', () => {
    const up = [];
    for (let y = MAX; y >= 0; y -= 5) {
      const { state } = home(y);
      if (up[up.length - 1] !== state) up.push(state);
    }
    assert.deepEqual(up, [STATES.FOOTER_DOCKED, STATES.FLOATING_AFTER_SECTION,
      STATES.SECTION_DOCKED, STATES.FLOATING, STATES.INITIAL]);
  });

  it('the state depends on the position only (a jump gives the same result as scrolling)', () => {
    assert.deepEqual(home(3100), home(3100));
    assert.equal(home(MAX).state, STATES.FOOTER_DOCKED);
    assert.equal(home(0).state, STATES.INITIAL);
  });

  it('every state can become HIDDEN and back', () => {
    Object.values(STATES).filter((s) => s !== STATES.HIDDEN).forEach((s) => {
      assert.ok(TRANSITIONS[s].includes(STATES.HIDDEN), s);
      assert.ok(TRANSITIONS[STATES.HIDDEN].includes(s), s);
    });
  });
});

describe('HIDDEN', () => {
  it('while the header menu is open nothing floats; the state comes back when it closes', () => {
    const r = home(3100, { suppressed: true });
    assert.equal(r.state, STATES.HIDDEN);
    assert.equal(r.owner, -1);
    assert.equal(home(3100).state, STATES.FLOATING_AFTER_SECTION);
  });

  it('when only Canvases that dock but never float were passed', () => {
    const docksOnly = page([slot(500, { floats: false }), slot(6000, { floats: false })], ['hero', 'footer']);
    assert.equal(docksOnly(2000).state, STATES.HIDDEN);
    assert.equal(docksOnly(0).state, STATES.INITIAL);
  });
});

describe('page variations', () => {
  it('a Docks only section Canvas is a stop; the hero floats on after it', () => {
    const pinned = page([slot(500), slot(3000, { floats: false }), slot(6000)], ['hero', 'section', 'footer']);
    assert.equal(pinned(arrival(3000)).state, STATES.SECTION_DOCKED);
    assert.equal(pinned(3100).owner, 0);
    assert.equal(pinned(3100).state, STATES.FLOATING_AFTER_SECTION);
    assert.deepEqual(walk(pinned).bad, []);
  });

  it('a Primary dock floats from the top and docks at the Canvases in place', () => {
    const withDock = page([PRIMARY, slot(3000), slot(6000)], [null, 'section', 'footer']);
    assert.equal(withDock(0).state, STATES.FLOATING);
    assert.equal(withDock(0).owner, 0);
    assert.equal(withDock(arrival(3000)).state, STATES.SECTION_DOCKED);
    assert.equal(withDock(3100).owner, 0);
    assert.equal(withDock(arrival(6000)).state, STATES.FOOTER_DOCKED);
    assert.deepEqual(walk(withDock).bad, []);
  });

  it('no intermediate Canvas: FLOATING straight to FOOTER_DOCKED and back', () => {
    const noSection = page([slot(500), slot(6000)], ['hero', 'footer']);
    assert.equal(noSection(3000).state, STATES.FLOATING);
    assert.equal(noSection(MAX).state, STATES.FOOTER_DOCKED);
    assert.deepEqual(walk(noSection).bad, []);
  });

  it('no footer Canvas: the floating row is lifted to stay above the footer', () => {
    const noFooter = page([slot(500), slot(3000)], ['hero', 'section']);
    const r = noFooter(5000);
    assert.equal(r.state, STATES.FLOATING_AFTER_SECTION);
    assert.equal(r.lift, 5000 + VH - 5800);
    assert.equal(noFooter(4000).lift, 0);
    assert.deepEqual(walk(noFooter).bad, []);
  });

  it('a Canvas only in the footer floats immediately until it docks', () => {
    const footerOnly = page([slot(6000)], ['footer']);
    assert.equal(footerOnly(0).state, STATES.FLOATING);
    assert.equal(footerOnly(0).owner, 0);
    assert.equal(footerOnly(1000).state, STATES.FLOATING);
    assert.equal(footerOnly(MAX).state, STATES.FOOTER_DOCKED);
    assert.equal(footerOnly(0).owner, 0, 'floats again when scrolling back up');
    assert.deepEqual(walk(footerOnly).bad, []);
  });

  it('a footer-only Canvas respects Docks only and menu suppression', () => {
    const docksOnly = page([slot(6000, { floats: false })], ['footer']);
    assert.equal(docksOnly(0).owner, -1);
    assert.equal(docksOnly(MAX).state, STATES.FOOTER_DOCKED);
    const footerOnly = page([slot(6000)], ['footer']);
    assert.equal(footerOnly(0, { suppressed: true }).state, STATES.HIDDEN);
    assert.equal(footerOnly(0, { suppressed: true }).owner, -1);
  });

  it('a floating footer does not approach its own reserved slot', () => {
    const footerOnly = page([slot(6000)], ['footer']);
    assert.equal(footerOnly(arrival(6000) - 50).owner, 0);
    assert.equal(footerOnly(arrival(6000) - 50).approaching, -1);
  });

  it('two Canvases on screen: the one nearest to the floating position is docked', () => {
    const close = page([slot(500), slot(800), slot(6000)], ['hero', 'section', 'footer']);
    // both rows in place: the section's is nearest to the floating position, still the header context
    assert.equal(close(0).docked, 1);
    assert.equal(close(0).state, STATES.INITIAL);
    // the hero row has left the top, the section row is still on screen
    assert.equal(close(700).docked, 1);
    assert.equal(close(700).state, STATES.SECTION_DOCKED);
    assert.deepEqual(walk(close).bad, []);
  });

  it('a header Canvas and the hero on screen together: INITIAL until the header Canvas leaves', () => {
    const withHeader = page([slot(200), slot(600), slot(6000)], ['header', 'section', 'footer']);
    assert.equal(withHeader(0).state, STATES.INITIAL);
    assert.equal(withHeader(300).state, STATES.SECTION_DOCKED);
    assert.equal(withHeader(800).state, STATES.FLOATING_AFTER_SECTION);
    assert.deepEqual(walk(withHeader).bad, []);
  });

  it('a short page: the footer Canvas docks at the bottom even before the dock line', () => {
    const short = page([slot(500), slot(2350)], ['hero', 'footer'], { documentHeight: 2450, footerTop: 2200 });
    assert.equal(short(2450 - VH).state, STATES.FOOTER_DOCKED);
  });
});

describe('the header Canvas at the bottom of the window', () => {
  /*
  * The header Canvas row floats immediately (52px offset: the line is
  * at 1000 - 52 - 72 = 876px); a section Canvas
   * at 3000 and the footer Canvas at 6000 as on the home page.
   */
  const OFFSET = 52;
  const LINE = VH - OFFSET - ROW;
  const header = (top) => slot(top, { inHeader: true });
  const bottomOf = (canvases, extra = {}) => page(canvases, ['header', 'section', 'footer'], { offset: OFFSET, ...extra });
  const site = bottomOf([header(LINE), slot(3000), slot(6000)]);

  it('FLOATING immediately at the top of the page', () => {
    const r = site(0);
    assert.equal(r.state, STATES.FLOATING);
    assert.equal(r.docked, -1);
    assert.equal(r.owner, 0);
  });

  it('stays FLOATING on the first scroll: the same row at the same bottom offset', () => {
    assert.equal(site(1).state, STATES.FLOATING);
    const r = site(10);
    assert.equal(r.state, STATES.FLOATING);
    assert.equal(r.owner, 0);
    assert.equal(r.docked, -1);
    assert.equal(site(400).state, STATES.FLOATING, 'still floating while its place is on screen');
  });

  it('still FLOATING when scrolled back to the top', () => {
    assert.equal(site(500).state, STATES.FLOATING);
    assert.equal(site(0).state, STATES.FLOATING);
  });

  it('a header-only Canvas floats immediately even below the viewport', () => {
    const headerOnly = page([header(1500)], ['header']);
    assert.equal(headerOnly(0).state, STATES.FLOATING);
    assert.equal(headerOnly(0).owner, 0);
    assert.equal(headerOnly(3000).owner, 0);
    assert.equal(headerOnly(5000).lift, 200);
    assert.deepEqual(walk(headerOnly).bad, []);
  });

  it('header and footer together float the header immediately and dock at the footer', () => {
    const chromeOnly = page([header(1500), slot(6000)], ['header', 'footer']);
    assert.equal(chromeOnly(0).owner, 0);
    assert.equal(chromeOnly(MAX).state, STATES.FOOTER_DOCKED);
    assert.equal(chromeOnly(0).owner, 0);
    assert.deepEqual(walk(chromeOnly).bad, []);
  });

  it('a hero shorter than the window: the row is above the dock line and floats from the start', () => {
    const short = bottomOf([header(LINE - 26), slot(3000), slot(6000)]);
    assert.equal(short(0).state, STATES.FLOATING);
    assert.equal(short(0).owner, 0);
  });

  it('then section docking, floating after it and the footer stop as before, both directions', () => {
    const at = (top) => top - LINE;
    assert.equal(site(at(3000)).state, STATES.SECTION_DOCKED);
    assert.equal(site(3100).state, STATES.FLOATING_AFTER_SECTION);
    assert.equal(site(at(6000)).state, STATES.FOOTER_DOCKED);
    const { states, bad } = walk(site);
    assert.deepEqual(bad, []);
    assert.equal(states[0], STATES.FLOATING);
    assert.equal(states.at(-1), STATES.FLOATING);
  });

  it('at most one Canvas floats, never while one is docked', () => {
    for (let y = 0; y <= MAX; y += 25) {
      const r = site(y);
      assert.ok(r.owner === -1 || r.docked === -1, `owner and docked at ${y}`);
    }
  });

  it('a Canvas in the hero section (not the header) keeps its place until it leaves the screen', () => {
    const hero = page([slot(LINE - 26), slot(3000), slot(6000)], ['hero', 'section', 'footer'], { offset: OFFSET });
    assert.equal(hero(0).state, STATES.INITIAL);
    assert.equal(hero(400).state, STATES.INITIAL);
  });
});
