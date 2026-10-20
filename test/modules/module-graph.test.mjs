import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import {
  buildModuleGraph, renderGraphModule, renderHead,
} from '../../tools/modules/generate-module-graph.mjs';
import blockModules, { blockStylesheet } from '../../scripts/module-graph.js';

const root = new URL('../../', import.meta.url).pathname;
const graph = buildModuleGraph(root);

describe('module graph (npm run build:modules)', () => {
  it('scripts/module-graph.js is current', () => {
    assert.equal(readFileSync(`${root}scripts/module-graph.js`, 'utf8'), renderGraphModule(graph));
  });
  it('head.html preloads every module scripts.js imports', () => {
    const html = readFileSync(`${root}head.html`, 'utf8');
    assert.equal(html, renderHead(html, graph));
    assert.ok(graph.head.includes('scripts/module-graph.js'));
    assert.ok(graph.head.includes('decorators/button-decorator.js'));
  });
  it('lists existing modules only, each block with its own JavaScript', () => {
    [...graph.head, ...Object.values(graph.blocks).flat()]
      .forEach((path) => assert.ok(existsSync(`${root}${path}`), path));
    assert.ok(blockModules('teaser').includes('blocks/teaser/teaser.js'));
    assert.ok(blockModules('list').includes('decorators/card-list-decorator.js'));
    assert.deepEqual(blockModules('no-such-block'), []);
  });
  it('names the stylesheet of the blocks that have one', () => {
    assert.equal(blockStylesheet('teaser'), 'blocks/teaser/teaser.css');
    graph.styled.forEach((name) => assert.ok(existsSync(`${root}blocks/${name}/${name}.css`), name));
    assert.equal(blockStylesheet('no-such-block'), '');
  });
  it("doesn't repeat what head.html preloads in the blocks' lists", () => {
    const head = new Set(graph.head);
    Object.values(graph.blocks).flat().forEach((path) => assert.ok(!head.has(path), path));
  });
});
