import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * Guard for the "Skip to main content" link (WCAG 2.4.1, KB-D-075): decorators/a11y-decorator.js
 * adds it in the eager phase; styles/styles.css keeps it off screen until it is focused. Without
 * that rule the link shows at the top of every page (the rule was once removed by an unrelated
 * change).
 */

const root = new URL('../../', import.meta.url).pathname;
const read = (path) => readFileSync(`${root}${path}`, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

/** the declarations of a top-level rule with exactly this selector, or null */
function declarationsOf(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\:]/g, '\\$&');
  const match = css.match(new RegExp(`(?:^|})\\s*${escaped}\\s*{([^}]*)}`));
  if (!match) return null;
  return Object.fromEntries(match[1].split(';').map((part) => part.trim()).filter(Boolean)
    .map((part) => {
      const [name, ...value] = part.split(':');
      return [name.trim(), value.join(':').trim()];
    }));
}

describe('skip link', () => {
  const styles = read('styles/styles.css');

  it('is added by the a11y decorator with the class styles.css hides', () => {
    const decorator = read('decorators/a11y-decorator.js');
    assert.match(decorator, /className = 'skip-link'/);
    assert.match(read('scripts/scripts.js'), /addSkipLink\(main\)/);
  });

  it('is kept off screen in the eager styles (styles/styles.css)', () => {
    const rule = declarationsOf(styles, '.skip-link');
    assert.ok(rule, 'styles/styles.css has no .skip-link rule: the link would show on every page');
    assert.equal(rule.position, 'absolute');
    assert.match(rule.transform || '', /^translateY\(-\d+%\)$/);
    assert.ok(Number(rule['z-index']) > 50, 'above the fixed header (z-index 20-50)');
  });

  it('stays reachable by keyboard (not removed from the tab order)', () => {
    const rule = declarationsOf(styles, '.skip-link');
    assert.ok(rule, 'styles/styles.css has no .skip-link rule');
    assert.notEqual(rule.display, 'none');
    assert.notEqual(rule.visibility, 'hidden');
    assert.notEqual(rule.opacity, '0');
  });

  it('shows with a focus outline while focused', () => {
    const focus = declarationsOf(styles, '.skip-link:focus');
    assert.ok(focus, 'styles/styles.css has no .skip-link:focus rule: the link would never show');
    assert.equal(focus.transform, 'none');
    assert.match(focus.outline || '', /solid/);
  });
});
