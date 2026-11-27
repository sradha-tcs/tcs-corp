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
// options whose output Edge Delivery doesn't deliver in a Text, or that the project keeps in
// other components: inline styles (colour, alignment, indentation) and dir aren't delivered;
// blockquote isn't in the delivered markup; a table in default content isn't delivered as a table
// (the Table block); the H1 is the Page Header's / Hero's / Title's (one per page); images go in
// the Image component (alt text); custom classes aren't delivered
const NOT_IN_TEXT = ['text_color', 'left', 'center', 'right', 'justify', 'rtl', 'ltr', 'indent',
  'outdent', 'blockquote', 'table', 'h1', 'image', 'classes'];

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

  it('adds no child components (a configuration-only filter)', () => {
    assert.ok(!richtext.components || richtext.components.length === 0);
  });
});
