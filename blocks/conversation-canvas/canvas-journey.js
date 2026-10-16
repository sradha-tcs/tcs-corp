/*
 * Canvas journey: the state of the floating Canvas as a pure function of the scroll position and
 * the cached page geometry (no DOM access, so it is unit tested in Node, see
 * test/conversation-canvas). canvas-controller.js measures the page and applies the result.
 *
 * INITIAL -> FLOATING -> SECTION_DOCKED -> FLOATING_AFTER_SECTION -> ... -> FOOTER_DOCKED
 *
 * - Every Canvas with a search row in place (Default, Secondary) is a docking target. It is docked
 *   while its row is on screen at or above the floating position (the dock line); nothing floats.
 * - Otherwise one Canvas floats (the owner): the Primary (sticky) Canvas if there is one, else the
 *   last target (DOM order) scrolled past the dock line that may float. After each section Canvas
 *   the floating row is that Canvas's, so it shows the section's variation; scrolling up hands it
 *   back.
 * - The footer Canvas is the last stop: once it reaches the dock line nothing floats below it.
 *   Without one the floating row is lifted to stay above the footer.
 * - HIDDEN: the floating Canvas is suppressed (the header menu is open, or no Canvas passed may
 *   float); the state is recalculated as soon as the suppression ends.
 * The state is derived from the position, never from the previous state, so fast scrolling or a
 * jump (anchor link, End key) can't leave a stale state; continuous scrolling only produces the
 * transitions of TRANSITIONS.
 */

export const STATES = Object.freeze({
  INITIAL: 'initial',
  FLOATING: 'floating',
  SECTION_DOCKED: 'section-docked',
  FLOATING_AFTER_SECTION: 'floating-after-section',
  FOOTER_DOCKED: 'footer-docked',
  HIDDEN: 'hidden',
});

/** the role of a Canvas in the journey, from where it is placed */
export const ROLES = Object.freeze({
  HEADER: 'header',
  SECTION: 'section',
  FOOTER: 'footer',
});

const {
  INITIAL, FLOATING, SECTION_DOCKED, FLOATING_AFTER_SECTION, FOOTER_DOCKED, HIDDEN,
} = STATES;

/**
 * The transitions continuous scrolling can produce (both directions). Besides the journey itself:
 * a docked Canvas hands over directly to another one when both are on screen (e.g. INITIAL ->
 * SECTION_DOCKED), FOOTER_DOCKED goes back to FLOATING when no section Canvas was crossed, and
 * any state can become HIDDEN and back.
 */
export const TRANSITIONS = Object.freeze({
  [INITIAL]: [FLOATING, SECTION_DOCKED, FOOTER_DOCKED, HIDDEN],
  [FLOATING]: [INITIAL, SECTION_DOCKED, FOOTER_DOCKED, HIDDEN],
  [SECTION_DOCKED]: [FLOATING, FLOATING_AFTER_SECTION, INITIAL, FOOTER_DOCKED, HIDDEN],
  [FLOATING_AFTER_SECTION]: [SECTION_DOCKED, FOOTER_DOCKED, HIDDEN],
  [FOOTER_DOCKED]: [FLOATING_AFTER_SECTION, FLOATING, SECTION_DOCKED, INITIAL, HIDDEN],
  [HIDDEN]: [INITIAL, FLOATING, SECTION_DOCKED, FLOATING_AFTER_SECTION, FOOTER_DOCKED],
});

/** whether continuous scrolling may go from one state to another */
export const isAllowedTransition = (from, to) => from === to || TRANSITIONS[from].includes(to);

/**
 * Roles of the Canvases in DOM order, from their place: in the header, or the first Canvas when
 * it is in the page's first section (the hero), the header role (the journey starts there); the
 * last Canvas in the footer the footer role (the final stop); every other target a section.
 * Primary (sticky) Canvases have no place on the page, so no role.
 * @param {Array<{ primary?: boolean, inHeader?: boolean, inFirstSection?: boolean,
 *   inFooter?: boolean }>} canvases
 * @returns {Array<string|null>}
 */
export function assignRoles(canvases) {
  const footer = canvases.findLastIndex((c) => !c.primary && c.inFooter);
  const first = canvases.findIndex((c, i) => !c.primary && i !== footer);
  return canvases.map((c, i) => {
    if (c.primary) return null;
    if (i === footer) return ROLES.FOOTER;
    if (c.inHeader || (i === first && c.inFirstSection)) return ROLES.HEADER;
    return ROLES.SECTION;
  });
}

/**
 * Resolves the journey for a scroll position.
 * @param {Object} input
 * @param {number} input.scrollY
 * @param {number} input.viewportHeight
 * @param {number} input.documentHeight
 * @param {number} input.offset Space below the floating row (px)
 * @param {number|null} input.footerTop Document top of the footer, null without one
 * @param {boolean} [input.suppressed] The floating Canvas is suppressed (e.g. the menu is open)
 * @param {Array<{ primary: boolean, floats: boolean, role: string|null, top: number|null,
 *   bottom: number|null, rowHeight: number }>} input.canvases In DOM order; top / bottom are the
 *   document coordinates of the search row's place (null for Primary)
 * @returns {{ state: string, owner: number, docked: number, approaching: number, lift: number }}
 *   owner: the floating Canvas, docked: the Canvas in place, approaching: the next target coming
 *   up below the floating row (indexes into canvases, -1 for none); lift: px the floating row
 *   moves up to stay above a footer without a Canvas
 */
export function resolveJourney({
  scrollY, viewportHeight: vh, documentHeight, offset = 0, footerTop = null, suppressed = false,
  canvases,
}) {
  const result = {
    state: INITIAL, owner: -1, docked: -1, approaching: -1, lift: 0,
  };
  const atBottom = scrollY + vh >= documentHeight - 1;
  // targets in viewport coordinates
  const targets = canvases
    .map((c, index) => ({ ...c, index }))
    .filter((c) => !c.primary && Number.isFinite(c.top) && Number.isFinite(c.bottom))
    .map((c) => ({ ...c, top: c.top - scrollY, bottom: c.bottom - scrollY }));
  const dockLine = (c) => vh - offset - c.rowHeight;
  // the search row has reached the floating position (a short page may not scroll that far:
  // at the very bottom the footer Canvas counts as arrived once it's on screen)
  const arrived = (c) => c.top <= dockLine(c)
    || (atBottom && c.role === ROLES.FOOTER && c.top < vh);

  // the journey ends at the footer Canvas: nothing floats below it
  const footer = targets.find((c) => c.role === ROLES.FOOTER);
  // docked: a search row on screen at or above the dock line (the one nearest to it wins)
  const docked = footer && arrived(footer)
    ? footer : targets.findLast((c) => arrived(c) && c.bottom > 0);
  if (docked) {
    result.docked = docked.index;
    if (suppressed) return { ...result, state: HIDDEN };
    if (docked === footer) return { ...result, state: FOOTER_DOCKED };
    // still in the header context while the header Canvas is in place on screen
    const atHeader = targets.some((c) => c.role === ROLES.HEADER && arrived(c) && c.bottom > 0);
    return { ...result, state: atHeader ? INITIAL : SECTION_DOCKED };
  }

  const passed = targets.filter((c) => arrived(c));
  const primary = canvases.findIndex((c) => c.primary && c.floats);
  const lastPassed = passed.findLast((c) => c.floats && c.role !== ROLES.FOOTER);
  const owner = primary >= 0 ? primary : (lastPassed?.index ?? -1);
  if (owner < 0) {
    // before the first target, or only Canvases that don't float passed
    return { ...result, state: passed.length || suppressed ? HIDDEN : INITIAL };
  }
  if (suppressed) return { ...result, state: HIDDEN };
  result.owner = owner;
  result.state = passed.some((c) => c.role === ROLES.SECTION) ? FLOATING_AFTER_SECTION : FLOATING;

  // the next target coming up from below: the floating row lands on it
  const approaching = targets.find((c) => !arrived(c) && c.top < vh && c.bottom > 0);
  if (approaching) result.approaching = approaching.index;
  // no footer Canvas: keep the floating row above the footer
  else if (!footer && footerTop !== null) result.lift = Math.max(0, vh - (footerTop - scrollY));
  return result;
}
