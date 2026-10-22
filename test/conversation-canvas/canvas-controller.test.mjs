import { it } from 'node:test';
import assert from 'node:assert/strict';

it('hidden Canvases cannot own or stop the header-to-footer journey', async (context) => {
  const frames = [];
  const listeners = {};
  const root = { dataset: {}, style: { setProperty() {} }, scrollHeight: 6400 };
  const viewport = {
    scrollY: 2000,
    innerHeight: 1000,
    addEventListener(name, callback) { listeners[name] = callback; },
  };
  const classes = () => {
    const values = new Set();
    return {
      contains: (name) => values.has(name),
      remove: (...names) => names.forEach((name) => values.delete(name)),
      toggle(name, on) { if (on) values.add(name); else values.delete(name); },
    };
  };
  const element = () => ({ classList: classes(), style: { minHeight: '', setProperty() {} } });
  const canvas = (order, top, location, primary = false) => {
    const row = { ...element(), offsetHeight: 72 };
    const block = {
      ...element(),
      isConnected: true,
      dataset: {},
      hiddenByAuthor: false,
      rendered: true,
      closest(selector) {
        if (selector === location) return this;
        if (selector.includes('.hideblock') && this.hiddenByAuthor) return this;
        return null;
      },
      compareDocumentPosition: (other) => (order < other.order ? 4 : 2),
      getClientRects() { return this.rendered ? [{}] : []; },
      order,
    };
    const slot = {
      ...element(),
      getBoundingClientRect() {
        return block.hiddenByAuthor || !block.rendered
          ? { top: 0, bottom: 0 }
          : { top: top - viewport.scrollY, bottom: top + 72 - viewport.scrollY };
      },
    };
    return { block, row, slot: primary ? null : slot, primary, floats: true };
  };
  const footer = { getBoundingClientRect: () => ({ top: 5800 - viewport.scrollY }) };
  const globals = {
    window: viewport,
    document: {
      documentElement: root,
      body: {},
      querySelector: (selector) => (selector === 'footer' ? footer : null),
      addEventListener() {},
    },
    Node: { DOCUMENT_POSITION_FOLLOWING: 4 },
    requestAnimationFrame: (callback) => { frames.push(callback); return frames.length; },
    getComputedStyle: () => ({ scrollMarginBottom: '24' }),
    ResizeObserver: class {
      observe(target) { this.target = target; }
    },
  };
  Object.entries(globals).forEach(([name, value]) => {
    const descriptor = Object.getOwnPropertyDescriptor(global, name);
    Object.defineProperty(global, name, { configurable: true, value });
    context.after(() => {
      if (descriptor) Object.defineProperty(global, name, descriptor);
      else delete global[name];
    });
  });
  const { default: registerCanvas } = await import('../../blocks/conversation-canvas/canvas-controller.js');
  const header = canvas(0, 904, 'header');
  const middle = canvas(1, 3000, 'main');
  const end = canvas(2, 6000, 'footer');
  middle.block.hiddenByAuthor = true;
  [header, middle, end].forEach(registerCanvas);
  const flush = () => { while (frames.length) frames.shift()(); };
  const resize = () => { listeners.resize(); flush(); };
  const owns = (entry) => entry.row.classList.contains('conversation-canvas-floating');
  flush();
  assert.equal(owns(header), true, 'header floats past a hidden middle Canvas');
  assert.equal(owns(middle), false, 'hidden middle Canvas cannot take ownership');

  middle.block.hiddenByAuthor = false;
  viewport.scrollY = 3100;
  resize();
  assert.equal(owns(middle), true, 'visible middle Canvas takes over after scrolling past');
  middle.block.hiddenByAuthor = true;
  resize();
  assert.equal(owns(middle), false, 'hiding the owner releases its floating row');
  assert.equal(middle.slot.style.minHeight, '');
  assert.equal(owns(header), true, 'header resumes floating');

  middle.block.hiddenByAuthor = false;
  middle.block.rendered = false;
  resize();
  assert.equal(owns(header), true, 'a display-none ancestor also excludes the middle Canvas');

  const primary = canvas(3, 0, 'main', true);
  primary.block.hiddenByAuthor = true;
  registerCanvas(primary);
  flush();
  assert.equal(owns(header), true, 'hidden Primary dock cannot take ownership');
  assert.equal(primary.row.inert, true);

  viewport.scrollY = 5200;
  listeners.scroll();
  flush();
  assert.equal(root.dataset.canvasJourneyState, 'footer-docked');
  assert.equal(owns(header), false);

  header.block.hiddenByAuthor = true;
  end.block.hiddenByAuthor = true;
  resize();
  assert.equal(root.dataset.canvasJourneyState, 'hidden', 'no eligible Canvas clears the journey');
});
