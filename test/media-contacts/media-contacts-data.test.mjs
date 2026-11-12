/* Unit tests of Media Contact item parsing: node --test */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CONTACT_FIELDS, isCompleteContact, readContactRows, telHref,
} from '../../blocks/media-contacts/media-contacts-data.js';

const item = (values, props = {}) => {
  const cell = (value) => ({
    textContent: Array.isArray(value) ? value.join(', ') : value,
    querySelectorAll: (selector) => (selector === 'li' && Array.isArray(value)
      ? value.map((textContent) => ({ textContent })) : []),
  });
  return {
    children: values.map(cell),
    querySelector: (selector) => {
      const field = CONTACT_FIELDS.find((name) => selector === `[data-aue-prop="${name}"]`);
      return props[field] === undefined ? null : cell(props[field]);
    },
  };
};

describe('Media Contact entries', () => {
  it('reads one label and multiple emails and phones from the current three-cell model', () => {
    const source = item([
      'Europe',
      ['press@example.com', 'media@example.com'],
      ['+46 70 3178024', '+46 8 555 0100'],
    ]);
    const [contact] = readContactRows([source]);
    assert.deepEqual(contact, {
      region: 'Europe',
      emails: ['press@example.com', 'media@example.com'],
      phones: ['+46 70 3178024', '+46 8 555 0100'],
      row: source,
    });
    assert.equal(isCompleteContact(contact), true);
  });

  it('reads instrumented properties in Universal Editor', () => {
    const source = item([], {
      region: 'SMG',
      email: ['press@example.com', 'media@example.com'],
      phone: ['+1 212 555 0100'],
    });
    const [contact] = readContactRows([source]);
    assert.equal(contact.region, 'SMG');
    assert.deepEqual(contact.emails, ['press@example.com', 'media@example.com']);
    assert.deepEqual(contact.phones, ['+1 212 555 0100']);
  });

  it('keeps entries separate even when their labels match', () => {
    const contacts = readContactRows([
      item(['India', ['first@example.com'], []]),
      item(['India', ['second@example.com'], []]),
    ]);
    assert.equal(contacts.length, 2);
    assert.deepEqual(contacts.map(({ emails }) => emails), [
      ['first@example.com'], ['second@example.com'],
    ]);
  });

  it('continues reading legacy five-cell rows', () => {
    const source = item([
      'India', 'Corporate Communications', 'Alex',
      ['press@example.com', 'media@example.com'],
      ['+91 11 1234 5678'],
    ]);
    const [contact] = readContactRows([source]);
    assert.equal(contact.region, 'India');
    assert.deepEqual(contact.emails, ['press@example.com', 'media@example.com']);
    assert.deepEqual(contact.phones, ['+91 11 1234 5678']);
    assert.equal(contact.row, source);
  });

  it('reads shortened legacy rows with omitted optional cells', () => {
    const source = item(['Europe', ['press@example.com'], ['+46 70 3178024']]);
    const [contact] = readContactRows([source]);
    assert.equal(contact.region, 'Europe');
    assert.deepEqual(contact.emails, ['press@example.com']);
    assert.deepEqual(contact.phones, ['+46 70 3178024']);
  });

  it('omits empty or invalid entries from publication', () => {
    const contacts = readContactRows([
      item(['Europe', [], []]),
      item(['Europe', ['not an email'], ['n/a']]),
      item(['', ['press@example.com'], []]),
    ]);
    assert.deepEqual(contacts.filter(isCompleteContact), []);
  });
});

describe('telHref', () => {
  it('keeps the digits and a leading plus', () => {
    assert.equal(telHref('+65 9270 4560'), 'tel:+6592704560');
    assert.equal(telHref('+1 (416) 456-7650'), 'tel:+14164567650');
    assert.equal(telHref('020 7946 0000'), 'tel:02079460000');
  });

  it('drops non-leading plus signs and rejects values without digits', () => {
    assert.equal(telHref('+44 +7921'), 'tel:+447921');
    assert.equal(telHref('n/a'), '');
    assert.equal(telHref(''), '');
  });
});
