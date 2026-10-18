/*
 * Block animations: the Content animation / Background animation values of the Additional tab
 * (utils/motion.js) and their authoring fields in the block models: node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import {
  BACKGROUND_MOTIONS, CONTENT_MOTIONS, STAGGER_MAX, backgroundMotionOf, contentMotionOf,
  isHorizontal, isVisibleColor, staggerIndex,
} from '../../utils/motion.js';

const classes = (...names) => ({ contains: (name) => names.includes(name) });
const blocksDir = new URL('../../blocks/', import.meta.url);
const modelOf = (name) => JSON.parse(readFileSync(new URL(`${name}/_${name}.json`, blocksDir), 'utf8'))
  .models.find((model) => model.id === name);
const fieldOf = (name, field) => modelOf(name)?.fields.find((f) => f.name === field);

describe('content animation', () => {
  it('reads the block class of each value', () => {
    CONTENT_MOTIONS.forEach((motion) => {
      assert.equal(contentMotionOf(classes('block', `motion-${motion}`)), motion);
    });
  });
  it('is none without a value, and ignores unknown values and the earlier Motion Types', () => {
    assert.equal(contentMotionOf(classes('hero', 'block')), '');
    assert.equal(contentMotionOf(classes('motion-spin', 'motion-fade-in-out')), '');
    // Hero / Table List Motion Type classes are not Content animation values
    assert.equal(contentMotionOf(classes('motion-fade', 'motion-slide', 'motion-zoom', 'motion-none')), '');
  });
  it('is independent of the background animation', () => {
    assert.equal(contentMotionOf(classes('bg-motion-fade-in')), '');
    assert.equal(backgroundMotionOf(classes('motion-fade-in')), '');
    const both = classes('motion-fade-up', 'bg-motion-wipe-right');
    assert.equal(contentMotionOf(both), 'fade-up');
    assert.equal(backgroundMotionOf(both), 'wipe-right');
  });
  it('clips sideways motion only', () => {
    assert.deepEqual(
      CONTENT_MOTIONS.filter(isHorizontal),
      ['fade-left', 'fade-right', 'slide-left', 'slide-right'],
    );
  });
});

describe('background animation', () => {
  it('reads the block class of each value and ignores unknown values', () => {
    BACKGROUND_MOTIONS.forEach((motion) => {
      assert.equal(backgroundMotionOf(classes(`bg-motion-${motion}`)), motion);
    });
    assert.equal(backgroundMotionOf(classes('bg-dark', 'bg-motion-spin')), '');
  });
});

describe('stagger', () => {
  it('starts repeated items one after another, up to a limit', () => {
    assert.deepEqual([0, 1, 2, 5, 6, 40].map(staggerIndex), [0, 1, 2, STAGGER_MAX, STAGGER_MAX, STAGGER_MAX]);
    assert.equal(staggerIndex(-3), 0);
    assert.equal(staggerIndex('x'), 0);
  });
});

describe('background colour', () => {
  it('tells a painted colour from a transparent one', () => {
    ['rgb(12, 12, 13)', 'rgb(0, 0, 0)', 'rgb(12 34 0)', 'rgba(0, 59, 57, 0.8)', 'rgb(0 0 0 / 40%)', 'color(srgb 1 0 0)']
      .forEach((color) => assert.equal(isVisibleColor(color), true, color));
    ['', 'transparent', 'rgba(0, 0, 0, 0)', 'rgb(0 0 0 / 0%)', 'color(srgb 0 0 0 / 0)']
      .forEach((color) => assert.equal(isVisibleColor(color), false, color));
  });
});

describe('authoring fields', () => {
  const blocks = readdirSync(blocksDir).filter((name) => existsSync(new URL(`${name}/_${name}.json`, blocksDir)));
  const BACKGROUND_BLOCKS = ['conversation-canvas', 'form-variations', 'hero', 'quote', 'teaser', 'testimonial'];
  const NO_ANIMATION = ['anchor-list', 'footer', 'fragment', 'modal', 'separator', 'tab', 'tcs-header'];

  it('offers Content animation after Hide block, with the values of utils/motion.js', () => {
    blocks.filter((name) => modelOf(name) && !NO_ANIMATION.includes(name)).forEach((name) => {
      const { fields } = modelOf(name);
      const at = fields.findIndex((f) => f.name === 'classes_animation');
      assert.ok(at > 0, `${name} has Content animation`);
      assert.equal(fields[at - 1].name, 'classes_hideblock', `${name}: after Hide block`);
      const field = fields[at];
      assert.equal(field.label, 'Content animation');
      assert.equal(field.value, '', `${name}: None by default`);
      assert.deepEqual(field.options.map((o) => o.value), ['', ...CONTENT_MOTIONS.map((m) => `motion-${m}`)]);
    });
  });
  it('offers Background animation only on blocks with an authored background', () => {
    blocks.filter((name) => modelOf(name)).forEach((name) => {
      const field = fieldOf(name, 'classes_bganimation');
      assert.equal(!!field, BACKGROUND_BLOCKS.includes(name), name);
      if (!field) return;
      assert.equal(field.value, '');
      assert.deepEqual(field.options.map((o) => o.value), ['', ...BACKGROUND_MOTIONS.map((m) => `bg-motion-${m}`)]);
    });
  });
  it('leaves out blocks that animate otherwise or not at all', () => {
    NO_ANIMATION.filter((name) => modelOf(name)).forEach((name) => {
      assert.equal(fieldOf(name, 'classes_animation'), undefined, name);
    });
  });
});
