// The rich text editor (RTE) configuration of the Text component: node --test
// Universal Editor reads the toolbar from the component filter the Text definition names
// ("filter": "richtext"); every option offered must produce markup Edge Delivery delivers
// (https://www.aem.live/developer/markup-reference).
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => JSON.parse(readFileSync(new URL(`../../${file}`, import.meta.url)));
const filters = read('component-filters.json');
const definitions = read('component-definition.json');
const richtext = filters.find((f) => f.id === 'richtext');

// the toolbar values Universal Editor documents for each group
const UE_TOOLBAR = {
  format: ['bold', 'italic', 'underline', 'strike', 'code_inline', 'text_color'],
  alignment: ['left', 'center', 'right', 'justify'],
  direction: ['rtl', 'ltr'],
  indentation: ['indent', 'outdent'],
  blocks: ['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code_block', 'blockquote'],
  list: ['bullet_list', 'ordered_list'],
  insert: ['link', 'unlink', 'image', 'table', 'special_characters'],
  sr_script: ['superscript', 'subscript'],
  editor: ['removeformat', 'clean_unsupported_tags', 'paste_text', 'fullscreen', 'find_and_replace'],
  advanced: ['classes'],
};
// options whose output Edge Delivery doesn't deliver in a Text: inline styles (colour,
// alignment, indentation) and dir aren't delivered; blockquote isn't in the delivered markup; a
// table in default content isn't delivered as a table (the Table block); custom classes aren't
// delivered (KB-D-080)
const NOT_IN_TEXT = ['text_color', 'left', 'center', 'right', 'justify', 'rtl', 'ltr', 'indent',
  'outdent', 'blockquote', 'table', 'classes'];

function textDefinition() {
  const all = [];
  const walk = (x) => {
    if (Array.isArray(x)) x.forEach(walk);
    else if (x && typeof x === 'object') {
      if (x.id === 'text' && x.plugins) all.push(x);
      Object.values(x).forEach(walk);
    }
  };
  walk(definitions);
  return all[0];
}

describe('RTE configuration (filter "richtext")', () => {
  it('exists with a toolbar', () => {
    assert.ok(richtext, 'component-filters.json has a filter "richtext"');
    assert.ok(richtext.rte?.toolbar, 'the filter has rte.toolbar');
  });

  it('is the Text component\'s filter', () => {
    assert.equal(textDefinition()?.plugins.xwalk.page.template.filter, 'richtext');
  });

  it('uses only documented toolbar groups and values', () => {
    const { sections, ...groups } = richtext.rte.toolbar;
    Object.entries(groups).forEach(([group, values]) => {
      assert.ok(UE_TOOLBAR[group], `known toolbar group "${group}"`);
      values.forEach((v) => assert.ok(UE_TOOLBAR[group].includes(v), `"${v}" is a ${group} option`));
    });
    assert.deepEqual([...sections].sort(), Object.keys(groups).sort(), 'every group is in sections, once');
  });

  it('offers no option Edge Delivery doesn\'t deliver in a Text', () => {
    const { sections, ...groups } = richtext.rte.toolbar;
    const offered = Object.values(groups).flat();
    NOT_IN_TEXT.forEach((v) => assert.ok(!offered.includes(v), `"${v}" is not offered`));
  });

  it('writes the delivered tags and hides the link target', () => {
    assert.equal(richtext.rte.actions?.bold?.tag, 'strong');
    assert.equal(richtext.rte.actions?.italic?.tag, 'em');
    // a link target isn't delivered: new tabs come from block fields with the new-tab hint
    assert.equal(richtext.rte.actions?.link?.hideTarget, true);
  });

  it('offers H1 and images (delivered), with the special characters picker', () => {
    const { blocks, insert } = richtext.rte.toolbar;
    assert.ok(blocks.includes('h1'));
    assert.ok(insert.includes('image'));
    assert.ok(insert.includes('special_characters'));
  });

  it('defines one special characters list: each character once, each with a title', () => {
    const sc = richtext.rte.actions?.special_characters;
    assert.ok(Array.isArray(sc?.characters) && sc.characters.length > 0, 'a characters list');
    assert.ok(!sc.appendCharacters, 'one complete list, not appended to the defaults (no duplicates)');
    const chars = sc.characters.map((c) => c.character);
    assert.equal(new Set(chars).size, chars.length, 'no character twice');
    sc.characters.forEach((c) => {
      assert.equal([...c.character].length, 1, `"${c.character}" is one character`);
      assert.ok(c.title?.trim(), `"${c.character}" has a title (its tooltip and accessible name)`);
    });
    const titles = sc.characters.map((c) => c.title.toLowerCase());
    assert.equal(new Set(titles).size, titles.length, 'no title twice');
  });

  it('adds no child components (a configuration-only filter)', () => {
    assert.ok(!richtext.components || richtext.components.length === 0);
  });
});
