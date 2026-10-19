/*
 * Component definitions: AEM renders a block with the class of its template name (class-name
 * form), not of its component id, so each block component's template name must name a block
 * folder (a Column item named "Column" rendered as "column" and loaded no code): node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const repo = new URL('../../', import.meta.url);
const definitions = JSON.parse(readFileSync(new URL('component-definition.json', repo), 'utf8'));
const folders = new Set(readdirSync(new URL('blocks/', repo)));
// the class-name form of aem.js toClassName
const toClassName = (name) => String(name).toLowerCase().replace(/[^0-9a-z]/gi, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

describe('block component names', () => {
  it('render as the class of an existing block folder', () => {
    const blocks = definitions.groups.flatMap((group) => group.components)
      .filter((c) => c.plugins?.xwalk?.page?.resourceType === 'core/franklin/components/block/v1/block');
    assert.ok(blocks.length > 20);
    blocks.forEach((c) => {
      const cls = toClassName(c.plugins.xwalk.page.template?.name);
      assert.ok(folders.has(cls), `${c.id}: template name renders as "${cls}", no blocks/${cls}`);
    });
  });
});
