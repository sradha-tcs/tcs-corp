/* Unit tests of the Canvas journey (blocks/conversation-canvas/canvas-journey.js): npm test */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ROLES, STATES, assignRoles, resolveJourney,
} from '../../blocks/conversation-canvas/canvas-journey.js';

/*
 * A 1000px viewport, a 24px floating offset and 72px search rows: the dock line (the top of the
 * floating row) is at 1000 - 24 - 72 = 904px. Search rows (document coordinates):
 * hero 500-572, section 3000-3072, footer 6000-6072; the footer starts at 5800, page 6400 high.
 */
const VH = 1000;
const ROW = 72;
const slot = (top, extra = {}) => ({
  primary: false, floats: true, top, bottom: top + ROW, rowHeight: ROW, ...extra,
});
const withRoles = (canvases, inFooter = []) => {
  const roles = assignRoles(canvases.map((c, i) => ({ primary: c.primary, inFooter: inFooter.includes(i) })));
  return canvases.map((c, i) => ({ ...c, role: roles[i] }));
};
const page = (canvases, inFooter, extra = {}) => (scrollY) => resolveJourney({
  scrollY,
  viewportHeight: VH,
  documentHeight: 6400,
  offset: 24,
  footerTop: 5800,
  canvases: withRoles(canvases, inFooter),
  ...extra,
});
// the scroll position at which a row at `top` reaches the dock line
const arrival = (top) => top - (VH - 24 - ROW);

const home = page([slot(500), slot(3000), slot(6000)], [2]);

describe('roles', () => {
  it('start, intermediate and final from DOM order and the footer', () => {
    assert.deepEqual(
      assignRoles([{}, {}, { inFooter: true }]),
      [ROLES.START, ROLES.INTERMEDIATE, ROLES.FINAL],
    );
  });

  it('the last canvas in the footer is the only final stop', () => {
    assert.deepEqual(
      assignRoles([{}, { inFooter: true }, { inFooter: true }]),
      [ROLES.START, ROLES.INTERMEDIATE, ROLES.FINAL],
    );
  });

  it('Primary has no role; a page with only a footer canvas has no start', () => {
    assert.deepEqual(assignRoles([{ primary: true }, { inFooter: true }]), [null, ROLES.FINAL]);
  });
});

describe('downward journey', () => {
  it('page load: the header canvas is docked in place', () => {
    const r = home(0);
    assert.equal(r.state, STATES.DOCKED_HEADER);
    assert.equal(r.docked, 0);
    assert.equal(r.owner, -1);
  });

  it('the header canvas floats once its row has scrolled off the top', () => {
    const r = home(600);
    assert.equal(r.state, STATES.FLOATING);
    assert.equal(r.owner, 0);
  });

  it('approaching the section canvas: still floating, the section row is the landing target', () => {
    const r = home(arrival(3000) - 50);
    assert.equal(r.state, STATES.APPROACHING_TARGET);
    assert.equal(r.owner, 0);
    assert.equal(r.approaching, 1);
  });

  it('docks in the section canvas when its row reaches the floating position', () => {
    const r = home(arrival(3000));
    assert.equal(r.state, STATES.DOCKED_SECTION);
    assert.equal(r.docked, 1);
    assert.equal(r.owner, -1);
  });

  it('after the section, its own row floats (variation handoff)', () => {
    const r = home(3100);
    assert.equal(r.state, STATES.FLOATING_BETWEEN_TARGETS);
    assert.equal(r.owner, 1);
  });

  it('approaching the footer canvas, then docked there: the final stop', () => {
    assert.equal(home(arrival(6000) - 1).state, STATES.APPROACHING_FOOTER);
    const docked = home(arrival(6000));
    assert.equal(docked.state, STATES.DOCKED_FOOTER);
    assert.equal(docked.docked, 2);
    assert.equal(docked.owner, -1);
  });

  it('nothing floats at the very bottom of the page', () => {
    const r = home(6400 - VH);
    assert.equal(r.state, STATES.DOCKED_FOOTER);
    assert.equal(r.owner, -1);
  });

  it('only one owner at every scroll position', () => {
    for (let y = 0; y <= 5400; y += 25) {
      const r = home(y);
      assert.ok(r.owner === -1 || r.docked === -1, `owner and docked at ${y}`);
    }
  });
});

describe('upward journey', () => {
  it('scrolling back up mirrors the way down', () => {
    const down = [];
    const up = [];
    for (let y = 0; y <= 5400; y += 10) down.push(home(y));
    for (let y = 5400; y >= 0; y -= 10) up.unshift(home(y));
    assert.deepEqual(up, down);
  });

  it('leaving the section canvas upwards hands the floating row back to the header canvas', () => {
    const r = home(arrival(3000) - 1);
    assert.equal(r.owner, 0);
  });
});

describe('short pages and the footer', () => {
  it('a footer canvas too close to the page end to reach the dock line docks at the bottom', () => {
    const short = page([slot(500), slot(2350)], [1], { documentHeight: 2450, footerTop: 2200 });
    const r = short(2450 - VH);
    assert.equal(r.state, STATES.DOCKED_FOOTER);
  });

  it('without a footer canvas the floating row is lifted above the footer (fallback)', () => {
    const noFooterCanvas = page([slot(500), slot(3000)], []);
    const r = noFooterCanvas(5000);
    assert.equal(r.state, STATES.FALLBACK);
    assert.equal(r.owner, 1);
    assert.equal(r.lift, 5000 + VH - 5800);
    assert.equal(noFooterCanvas(4000).lift, 0);
  });

  it('a page with a canvas only in the footer: nothing floats before it', () => {
    const footerOnly = page([slot(6000)], [0]);
    assert.equal(footerOnly(1000).owner, -1);
    assert.equal(footerOnly(1000).state, STATES.INITIAL);
  });

  it('no canvas floats: disabled, docking still reported', () => {
    const none = page([slot(500, { floats: false }), slot(6000, { floats: false })], [1]);
    assert.equal(none(2000).state, STATES.DISABLED);
    assert.equal(none(0).docked, 0);
  });
});

describe('options', () => {
  it("a Don't float section canvas is a stop, then the header canvas floats on", () => {
    const pinned = page([slot(500), slot(3000, { floats: false }), slot(6000)], [2]);
    assert.equal(pinned(arrival(3000)).state, STATES.DOCKED_SECTION);
    assert.equal(pinned(3100).owner, 0);
  });

  it('Primary (sticky) owns the floating presentation, docking at the canvases in place', () => {
    const primary = { primary: true, floats: true, top: null, bottom: null, rowHeight: 0 };
    const withDock = page([primary, slot(3000), slot(6000)], [2]);
    assert.equal(withDock(0).state, STATES.FLOATING);
    assert.equal(withDock(0).owner, 0);
    assert.equal(withDock(arrival(3000)).owner, -1);
    assert.equal(withDock(3100).owner, 0);
    assert.equal(withDock(arrival(6000)).state, STATES.DOCKED_FOOTER);
  });

  it('a missing intermediate canvas: the header canvas floats straight to the footer', () => {
    const noSection = page([slot(500), slot(6000)], [1]);
    assert.equal(noSection(3000).state, STATES.FLOATING);
    assert.equal(noSection(3000).owner, 0);
    assert.equal(noSection(arrival(6000)).state, STATES.DOCKED_FOOTER);
  });
});
