// Form Variations block properties: node --test (npm test)
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { headingLevelOf, mapProperties } from '../../blocks/form-variations/form-variations-properties.js';

// a property row's value: text, or { image }, { href }, { prop }
const row = (value = '') => (typeof value === 'string' ? { text: value } : { text: '', ...value });
const rows = (...values) => values.map(row);
const DESCRIPTION = 'We’re passionate about our partnerships. If you’re looking to know more, do get in touch.';

describe('form variations properties (Universal Editor)', () => {
  it('maps the values by their field names, empty ones included', () => {
    const map = mapProperties([
      row({ prop: 'formEyebrow' }),
      row({ prop: 'formEyebrowIcon' }),
      row({ prop: 'formHeading', text: 'Partnerships' }),
      row({ prop: 'formHeadingLevel', text: 'h3' }),
      row({ prop: 'formDescription', text: DESCRIPTION }),
      row({ prop: 'bgImage' }),
      row({ prop: 'formAction' }),
    ]);
    assert.deepEqual(map, {
      formEyebrow: 0,
      formEyebrowIcon: 1,
      formHeading: 2,
      formHeadingLevel: 3,
      formDescription: 4,
      bgImage: 5,
      formAction: 6,
    });
  });
});

describe('form variations properties (published pages)', () => {
  it('skips the empty tab row before the heading (5 rows)', () => {
    // block library, form-variations: ∅ | heading | description | ∅ | ∅
    const map = mapProperties(rows('', 'Contact us', 'Tell us about your business challenge.', '', ''));
    assert.deepEqual(map, { formHeading: 1, formDescription: 2 });
  });

  it('reads pages saved without tab rows (3 rows)', () => {
    const map = mapProperties(rows('Request a call back', 'Leave your details.', ''));
    assert.deepEqual(map, { formHeading: 0, formDescription: 1 });
  });

  it('reads the heading and description when empty rows stand between them (6 rows)', () => {
    // curated-design-pages/forms/partnership-form: heading | ∅ | ∅ | description | ∅ | ∅
    const map = mapProperties(rows('Partnership', '', '', DESCRIPTION, '', ''));
    assert.deepEqual(map, { formHeading: 0, formDescription: 3 });
  });

  it('reads a heading without a description', () => {
    assert.deepEqual(mapProperties(rows('', 'Subscribe to our insights', '', '', '')), { formHeading: 1 });
  });

  it('reads every property of the current model', () => {
    const map = mapProperties([
      row(''), // Content tab
      row('CORPORATE SOCIAL RESPONSIBILITY'),
      row({ image: true }),
      row('Partnerships'),
      row('h1'),
      row(DESCRIPTION),
      row({ image: true }),
      row({ href: '/content/forms/partnerships' }),
      row(''), // Additional tab
    ]);
    assert.deepEqual(map, {
      formEyebrow: 1,
      formEyebrowIcon: 2,
      formHeading: 3,
      formHeadingLevel: 4,
      formDescription: 5,
      bgImage: 6,
      formAction: 7,
    });
  });

  it('keeps the fields apart when the optional fields before them are empty', () => {
    // no eyebrow, no icon: ∅ | ∅ | ∅ | heading | level | description | ∅ | action
    const map = mapProperties(rows('', '', '', 'Partnerships', 'h4', DESCRIPTION, '', { href: 'https://example.com/submit' }));
    assert.deepEqual(map, {
      formHeading: 3, formHeadingLevel: 4, formDescription: 5, formAction: 7,
    });
  });

  it('reads three texts as eyebrow, heading and description', () => {
    const map = mapProperties(rows('', 'TCS EMPOWERS', '', 'Partnerships', DESCRIPTION, ''));
    assert.deepEqual(map, { formEyebrow: 1, formHeading: 3, formDescription: 4 });
  });

  it('takes the text before the eyebrow icon as the eyebrow', () => {
    // eyebrow | icon | heading, no description
    const map = mapProperties(rows('TCS EMPOWERS', { image: true }, 'Partnerships'));
    assert.deepEqual(map, { formEyebrow: 0, formEyebrowIcon: 1, formHeading: 2 });
  });

  it('takes the text before the heading level as the heading', () => {
    // eyebrow | heading | level, no description
    const map = mapProperties(rows('TCS EMPOWERS', 'Partnerships', 'h2'));
    assert.deepEqual(map, { formEyebrow: 0, formHeading: 1, formHeadingLevel: 2 });
  });

  it('reads an image after the texts as the background image', () => {
    const map = mapProperties(rows('Partnerships', DESCRIPTION, { image: true }));
    assert.deepEqual(map, { formHeading: 0, formDescription: 1, bgImage: 2 });
  });

  it('reads an image file link or path as an image, other links and paths as the action', () => {
    const map = mapProperties(rows('Partnerships', DESCRIPTION, { href: '/content/dam/tcs/bg.jpg' }, '/content/forms/send'));
    assert.deepEqual(map, {
      formHeading: 0, formDescription: 1, bgImage: 2, formAction: 3,
    });
  });

  it('reads a block without properties', () => {
    assert.deepEqual(mapProperties(rows('', '', '')), {});
    assert.deepEqual(mapProperties([]), {});
  });
});

describe('form variations heading level', () => {
  it('accepts h1 to h6 only', () => {
    assert.equal(headingLevelOf('H3'), 'h3');
    assert.equal(headingLevelOf(' h6 '), 'h6');
    assert.equal(headingLevelOf(''), '');
    assert.equal(headingLevelOf('h7'), '');
    assert.equal(headingLevelOf('large'), '');
  });
});
