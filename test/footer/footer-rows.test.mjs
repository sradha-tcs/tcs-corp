/* Unit tests of the Footer block rows (blocks/footer/footer-rows.js): npm test */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { COLUMN_MODEL, REGIONAL, placementOf, rowRoles } from '../../blocks/footer/footer-rows.js';

const field = (text = true) => ({ cells: 1, image: false, text });
const logo = { cells: 1, image: true, text: false };
const column = (cells = 3) => ({ cells, image: false, text: true });

describe('row roles', () => {
  it('a footer authored before the Logo and columns: canvas, copyright, links', () => {
    assert.deepEqual(rowRoles([field(), field(), field()]), ['canvas', 'copyright', 'links']);
  });
  it('fewer rows (empty fields left out at the end) still read in order', () => {
    assert.deepEqual(rowRoles([field(false), field()]), ['canvas', 'copyright']);
  });
  it('with a Logo and columns', () => {
    assert.deepEqual(
      rowRoles([field(false), field(), field(), logo, column(), column(2)]),
      ['canvas', 'copyright', 'links', 'logo', 'column', 'column'],
    );
  });
  it('an empty Logo row is the Logo, not a column', () => {
    assert.deepEqual(
      rowRoles([field(), field(), field(), field(false), column()]),
      ['canvas', 'copyright', 'links', 'logo', 'column'],
    );
  });
  it('without a Logo row: a column with only a title is still a column', () => {
    assert.deepEqual(
      rowRoles([field(), field(), field(), column(1)]),
      ['canvas', 'copyright', 'links', 'column'],
    );
  });
  it('in Universal Editor, items are columns by their model', () => {
    const item = { ...logo, model: COLUMN_MODEL };
    assert.deepEqual(
      rowRoles([field(), field(), field(), item]),
      ['canvas', 'copyright', 'links', 'column'],
    );
  });
});

describe('column placement (Show As)', () => {
  it('regional or a link column', () => {
    assert.equal(placementOf('regional'), REGIONAL);
    assert.equal(placementOf(' Regional '), REGIONAL);
    assert.equal(placementOf(''), 'default');
    assert.equal(placementOf(undefined), 'default');
    assert.equal(placementOf('What we do'), 'default');
  });
});
