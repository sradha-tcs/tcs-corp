/*
 * Canvas journey: which Canvas floats, which one is docked, as a pure function of the scroll
 * position and the cached page geometry (no DOM access, so it is unit tested in Node, see
 * test/conversation-canvas). canvas-controller.js measures the page and applies the result.
 *
 * Header Canvas -> floating -> section Canvas (docked) -> floating -> ... -> footer Canvas (docked)
 *
 * - A Canvas with a search row (Default, Secondary) is a target. It is docked while its search
 *   row is on screen at or above the floating position (the dock line); nothing floats then.
 * - Otherwise the owner floats: the Primary (sticky) Canvas if there is one, else the last target
 *   (DOM order) scrolled past the dock line. So after each section Canvas the floating row takes
 *   that Canvas's variation, and scrolling up hands it back to the previous one.
 * - The footer Canvas (the last Canvas in the footer) is the final stop: once it reaches the dock
 *   line nothing floats any more. Without one, the floating row stops above the footer (fallback).
 */

export const STATES = Object.freeze({
  INITIAL: 'initial',
  DOCKED_HEADER: 'docked-header',
  FLOATING: 'floating',
  APPROACHING_TARGET: 'approaching-target',
  DOCKED_SECTION: 'docked-section',
  FLOATING_BETWEEN_TARGETS: 'floating-between-targets',
  APPROACHING_FOOTER: 'approaching-footer',
  DOCKED_FOOTER: 'docked-footer',
  DISABLED: 'disabled',
  FALLBACK: 'fallback',
});

export const ROLES = Object.freeze({
  START: 'start',
  INTERMEDIATE: 'intermediate',
  FINAL: 'final',
});

/**
 * Roles of the Canvases in DOM order: the last one in the footer is the final stop, the first
 * other target (in the header or the first on the page) the start, the rest intermediate.
 * Primary (sticky) Canvases have no place on the page, so no role.
 * @param {Array<{ primary?: boolean, inFooter?: boolean }>} canvases
 * @returns {Array<string|null>}
 */
export function assignRoles(canvases) {
  const final = canvases.findLastIndex((c) => !c.primary && c.inFooter);
  const start = canvases.findIndex((c, i) => !c.primary && i !== final);
  return canvases.map((c, i) => {
    if (c.primary) return null;
    if (i === final) return ROLES.FINAL;
    return i === start ? ROLES.START : ROLES.INTERMEDIATE;
  });
}

/**
 * Resolves the journey state for a scroll position.
 * @param {Object} input
 * @param {number} input.scrollY
 * @param {number} input.viewportHeight
 * @param {number} input.documentHeight
 * @param {number} input.offset Space below the floating row (px)
 * @param {number|null} input.footerTop Document top of the footer, null without one
 * @param {Array<{ primary: boolean, floats: boolean, role: string|null, top: number|null,
 *   bottom: number|null, rowHeight: number }>} input.canvases In DOM order; top / bottom are the
 *   document coordinates of the search row's place (null for Primary)
 * @returns {{ state: string, owner: number, docked: number, approaching: number, lift: number }}
 *   indexes into canvases (-1 for none); lift: px the floating row moves up to clear the footer
 */
export function resolveJourney({
  scrollY, viewportHeight: vh, documentHeight, offset = 0, footerTop = null, canvases,
}) {
  const result = {
    state: STATES.INITIAL, owner: -1, docked: -1, approaching: -1, lift: 0,
  };
  if (!canvases.some((c) => c.floats)) result.state = STATES.DISABLED;

  const atBottom = scrollY + vh >= documentHeight - 1;
  // targets in viewport coordinates
  const targets = canvases
    .map((c, index) => ({ ...c, index }))
    .filter((c) => !c.primary && Number.isFinite(c.top) && Number.isFinite(c.bottom))
    .map((c) => ({ ...c, top: c.top - scrollY, bottom: c.bottom - scrollY }));
  const dockLine = (c) => vh - offset - c.rowHeight;
  // the search row has reached the floating position (a short page may not scroll that far:
  // at the very bottom the footer Canvas counts as arrived once it's on screen)
  const arrived = (c) => c.top <= dockLine(c) || (atBottom && c.role === ROLES.FINAL && c.top < vh);

  // the journey ends at the footer Canvas: nothing floats below it
  const final = targets.find((c) => c.role === ROLES.FINAL);
  if (final && arrived(final)) {
    return { ...result, state: STATES.DOCKED_FOOTER, docked: final.index };
  }

  // docked: a search row on screen at or above the dock line (the one nearest to it wins)
  const docked = targets.findLast((c) => arrived(c) && c.bottom > 0);
  if (docked) {
    const state = docked.role === ROLES.START ? STATES.DOCKED_HEADER : STATES.DOCKED_SECTION;
    return { ...result, state, docked: docked.index };
  }

  const passed = targets.filter((c) => arrived(c));
  const primary = canvases.findIndex((c) => c.primary && c.floats);
  const lastPassed = passed.findLast((c) => c.floats && c.role !== ROLES.FINAL);
  const owner = primary >= 0 ? primary : (lastPassed?.index ?? -1);
  if (owner < 0) return result;
  result.owner = owner;

  // the next target coming up from below: the floating row lands on it
  const approaching = targets.find((c) => !arrived(c) && c.top < vh && c.bottom > 0);
  if (approaching) {
    result.approaching = approaching.index;
    result.state = approaching.role === ROLES.FINAL
      ? STATES.APPROACHING_FOOTER : STATES.APPROACHING_TARGET;
    return result;
  }

  // no footer Canvas: keep the floating row above the footer
  if (!final && footerTop !== null) {
    const lift = Math.max(0, vh - (footerTop - scrollY));
    if (lift > 0) return { ...result, state: STATES.FALLBACK, lift };
  }

  const crossed = passed.some((c) => c.index !== owner);
  result.state = crossed ? STATES.FLOATING_BETWEEN_TARGETS : STATES.FLOATING;
  return result;
}
