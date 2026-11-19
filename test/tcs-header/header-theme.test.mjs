// TCS Header logo theme: node --test (npm test)
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  headerTheme, luminance, parseColor, themeOfElement,
} from '../../blocks/tcs-header/header-theme.js';

describe('header theme colours', () => {
  it('parses rgb() and rgba() colours', () => {
    assert.deepEqual(parseColor('rgb(1, 22, 39)'), {
      r: 1, g: 22, b: 39, a: 1,
    });
    assert.deepEqual(parseColor('rgba(255, 255, 255, 0.5)'), {
      r: 255, g: 255, b: 255, a: 0.5,
    });
    assert.deepEqual(parseColor('rgb(0 0 0 / 40%)'), {
      r: 0, g: 0, b: 0, a: 0.4,
    });
    assert.equal(parseColor(''), null);
    assert.equal(parseColor('transparent'), null);
  });

  it('computes the relative luminance', () => {
    assert.equal(luminance({ r: 0, g: 0, b: 0 }), 0);
    assert.equal(luminance({ r: 255, g: 255, b: 255 }), 1);
  });
});

describe('header theme of an element', () => {
  it('reads the dark and light theme classes first', () => {
    assert.equal(themeOfElement({ classes: ['section', 'bg-dark'], color: 'rgb(255, 255, 255)' }), 'dark');
    assert.equal(themeOfElement({ classes: ['hero', 'bg-charcoal-80'] }), 'dark');
    assert.equal(themeOfElement({ classes: ['section', 'bg-grey'], color: 'rgb(0, 0, 0)' }), 'light');
    assert.equal(themeOfElement({ classes: ['section', 'highlight'] }), 'light');
  });

  it('falls back to the background colour luminance', () => {
    assert.equal(themeOfElement({ classes: [], color: 'rgb(1, 22, 39)' }), 'dark');
    assert.equal(themeOfElement({ classes: [], color: 'rgb(245, 245, 245)' }), 'light');
  });

  it('ignores a (nearly) transparent background', () => {
    assert.equal(themeOfElement({ classes: [], color: 'rgba(0, 0, 0, 0)' }), '');
    assert.equal(themeOfElement({ classes: [], color: 'rgba(0, 0, 0, 0.1)' }), '');
    assert.equal(themeOfElement({}), '');
  });
});

describe('header theme', () => {
  const darkHero = { classes: ['hero', 'block'], color: 'rgba(0, 0, 0, 0)' };

  it('is light while the menu is open, with overlay Never and once the bar is white', () => {
    const base = { block: { classes: ['bg-dark'] }, hasHero: true };
    assert.equal(headerTheme({ ...base, menuOpen: true }), 'light');
    assert.equal(headerTheme({ ...base, overlay: 'never' }), 'light');
    assert.equal(headerTheme({ ...base, progress: 0.6 }), 'light');
    assert.equal(headerTheme({ ...base, barColor: 'rgba(255, 255, 255, 0.8)' }), 'light');
    assert.equal(headerTheme({ ...base, progress: 0.4, barColor: 'rgba(255, 255, 255, 0.4)' }), 'dark');
  });

  it('takes the opening block before the section', () => {
    assert.equal(headerTheme({
      block: { classes: ['hero', 'bg-light'] }, section: { classes: ['section', 'bg-dark'] }, hasHero: true,
    }), 'light');
    assert.equal(headerTheme({
      block: { classes: ['teaser'], color: 'rgba(0, 0, 0, 0)' }, section: { classes: ['section', 'dark'] },
    }), 'dark');
  });

  it('is dark over a Hero without a theme, else light', () => {
    assert.equal(headerTheme({ block: darkHero, section: { classes: ['section'] }, hasHero: true }), 'dark');
    assert.equal(headerTheme({ block: { classes: ['cards'] }, section: { classes: ['section'] } }), 'light');
    assert.equal(headerTheme(), 'light');
  });
});
