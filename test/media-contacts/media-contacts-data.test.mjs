/* Unit tests of the Media Contacts grouping (blocks/media-contacts/media-contacts-data.js): npm test */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { groupContacts, groupHeading, telHref } from '../../blocks/media-contacts/media-contacts-data.js';

const row = (designation, region, email, phone = '', name = '') => ({
  id: email, name, designation, email, phone, region,
});

describe('groupHeading', () => {
  it('joins designation and region with &', () => {
    assert.equal(groupHeading('Corporate Communications', 'India'), 'Corporate Communications & India');
  });
  it('uses the one that is set', () => {
    assert.equal(groupHeading('', 'Asia Pacific'), 'Asia Pacific');
    assert.equal(groupHeading('Investor Relations', ' '), 'Investor Relations');
    assert.equal(groupHeading('', ''), '');
  });
});

describe('groupContacts', () => {
  const sheet = [
    row('Corporate Communications', 'India', 'corporate.communications@tcs.com'),
    row('', 'Asia Pacific', 'y.tham@tcs.com', '+65 9270 4560'),
    row('Corporate Communications', 'India', 'santosh.castelino@tcs.com'),
    row('corporate  communications', 'INDIA', 'rhea.mistry@tcs.com'),
    row('', 'Canada', 'tiffany.fisher@tcs.com', '+1 416 456 7650'),
  ];

  it('puts contacts with the same designation and region in one group, one below the other', () => {
    const groups = groupContacts(sheet);
    assert.deepEqual(groups.map((g) => g.heading), ['Corporate Communications & India', 'Asia Pacific', 'Canada']);
    assert.deepEqual(groups[0].contacts.map((c) => c.email), [
      'corporate.communications@tcs.com', 'santosh.castelino@tcs.com', 'rhea.mistry@tcs.com',
    ]);
  });

  it('ignores case and spacing when grouping, and keeps the first row\'s spelling', () => {
    const [first] = groupContacts(sheet);
    assert.equal(first.designation, 'Corporate Communications');
    assert.equal(first.region, 'India');
  });

  it('keeps the phone numbers and names', () => {
    const groups = groupContacts([...sheet, row('Media Relations', 'Europe', 'a@tcs.com', '+46 70', 'Ann')]);
    assert.deepEqual(groups[1].contacts, [{ name: '', email: 'y.tham@tcs.com', phone: '+65 9270 4560' }]);
    assert.deepEqual(groups[3].contacts, [{ name: 'Ann', email: 'a@tcs.com', phone: '+46 70' }]);
  });

  it('leaves out rows without a name, e-mail or phone, and copes with no rows', () => {
    assert.deepEqual(groupContacts([row('Press', 'UK', '')]), []);
    assert.deepEqual(groupContacts([]), []);
    assert.deepEqual(groupContacts(undefined), []);
  });
});

describe('telHref', () => {
  it('keeps the digits and a leading +', () => {
    assert.equal(telHref('+65 9270 4560'), 'tel:+6592704560');
    assert.equal(telHref('+1 (416) 456-7650'), 'tel:+14164567650');
    assert.equal(telHref('020 7946 0000'), 'tel:02079460000');
  });
  it('drops a + that isn\'t leading, and returns nothing without digits', () => {
    assert.equal(telHref('+44 +7921'), 'tel:+447921');
    assert.equal(telHref('n/a'), '');
    assert.equal(telHref(''), '');
  });
});
