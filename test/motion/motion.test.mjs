/*
 * Block animations: the Animation Type (content animation), Background animation, Motion Speed and
 * Animation Trigger values of the Additional tab (utils/motion.js), their authoring fields in the
 * block models and the speed durations of styles/motion.css: node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import {
  BACKGROUND_MOTIONS, CONTENT_MOTIONS, MOTION_SPEEDS, STAGGER_MAX, backgroundMotionOf,
  contentMotionOf, isHorizontal, isSeen, isVisibleColor, speedOf, staggerIndex, triggerOf,
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

describe('motion speed and trigger', () => {
  it('reads Motion Speed (Medium without a class) and Animation Trigger (On Scroll without one)', () => {
    assert.equal(speedOf(classes('block')), 'medium');
    assert.equal(speedOf(classes('motion-fast')), 'fast');
    assert.equal(speedOf(classes('motion-slow')), 'slow');
    assert.equal(triggerOf(classes('block')), 'scroll');
    assert.equal(triggerOf(classes('motion-on-load')), 'load');
  });
  it('are not animation types (no effect of their own)', () => {
    assert.equal(contentMotionOf(classes('motion-fast', 'motion-slow', 'motion-on-load')), '');
  });
  it('uses one keyframe per effect, the speed only as durations', () => {
    const css = readFileSync(new URL('../../styles/motion.css', import.meta.url), 'utf8');
    const duration = (selector) => Number(css.match(new RegExp(`${selector} \\{[^}]*--motion-duration: (\\d+)ms`))?.[1]);
    assert.equal(duration('\\.block'), MOTION_SPEEDS.medium);
    assert.equal(duration('\\.block\\.motion-fast'), MOTION_SPEEDS.fast);
    assert.equal(duration('\\.block\\.motion-slow'), MOTION_SPEEDS.slow);
    assert.equal((css.match(/@keyframes /g) || []).length, CONTENT_MOTIONS.length + BACKGROUND_MOTIONS.length);
  });
  it('starts on scroll once enough of the block is in view', () => {
    assert.equal(isSeen({ intersectionRatio: 0.05, intersectionRect: { height: 40 } }, 800), false);
    assert.equal(isSeen({ intersectionRatio: 0.2, intersectionRect: { height: 100 } }, 800), true);
    // a block taller than the viewport: a quarter of the viewport is enough
    assert.equal(isSeen({ intersectionRatio: 0.1, intersectionRect: { height: 200 } }, 800), true);
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
  // columns: AEM doesn't deliver classes_* on the built-in Columns component (no Additional tab)
  const NO_ANIMATION = ['anchor-list', 'column-break', 'columns', 'footer', 'fragment', 'modal', 'separator', 'tab', 'tcs-header'];

  it('offers Content animation after Hide block, with the values of utils/motion.js', () => {
    blocks.filter((name) => modelOf(name) && !NO_ANIMATION.includes(name)).forEach((name) => {
      const { fields } = modelOf(name);
      const at = fields.findIndex((f) => f.name === 'classes_animation');
      assert.ok(at > 0, `${name} has Content animation`);
      assert.equal(fields[at - 1].name, 'classes_hideblock', `${name}: after Hide block`);
      const field = fields[at];
      assert.equal(field.label, 'Animation Type');
      const [speed, trigger] = [fields[at + 1], fields[at + 2]];
      assert.equal(speed.name, 'classes_animationspeed', `${name}: Motion Speed after Animation Type`);
      assert.equal(speed.label, 'Motion Speed');
      assert.deepEqual(speed.options.map((o) => [o.name, o.value]), [['Medium', ''], ['Fast', 'motion-fast'], ['Slow', 'motion-slow']]);
      assert.equal(speed.value, '');
      assert.equal(trigger.name, 'classes_animationtrigger', `${name}: Animation Trigger after Motion Speed`);
      assert.equal(trigger.label, 'Animation Trigger');
      assert.deepEqual(trigger.options.map((o) => o.value), ['', 'motion-on-load']);
      assert.equal(trigger.value, '');
      // shown only once the block has an animation
      assert.deepEqual(speed.condition, trigger.condition);
      assert.ok(JSON.stringify(speed.condition).includes('classes_animation'), name);
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
