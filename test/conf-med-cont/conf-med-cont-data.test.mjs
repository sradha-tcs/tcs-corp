/* Unit tests of the Configurable Media Contacts data: node --test */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ACTIONS, DEFAULT_ACTION, actionOf, findConfig, orderOf, orderRegions, regionColumns,
  regionGroups, unknownOrderEntries,
} from '../../blocks/conf-med-cont/conf-med-cont-data.js';

const contacts = [
  {
    id: 'C0001', name: 'Roland', description: 'Roland is Media spokes person', emails: ['roland.bagen@tcs.com'], phones: ['+46 70 3178024'],
  },
  {
    id: 'C0002', name: 'Asha', description: 'Asha leads press relations', emails: ['asha@tcs.com'], phones: ['+91 22 6778 9999'],
  },
  {
    id: 'C0013', name: 'Kim', description: '', emails: ['kim@tcs.com'], phones: [],
  },
];
const regions = [
  { id: 'reg-001', name: 'Corporate Communications & India', description: 'Corporate communications and India' },
  { id: 'reg-002', name: 'Europe', description: '' },
  { id: 'reg-003', name: 'Asia Pacific', description: '' },
];
// the sheet's columns: media-contacts-id, then per region its contacts and its action
const config = {
  'media-contacts-id': 'media-contact-01',
  'reg-001': 'C0013,C0001,C0002',
  'reg-001-action': 'mail',
  'reg-002': 'C0001',
  'reg-002-action': 'name-des-mail-contact',
  'reg-003': '',
  'reg-003-action': 'contact',
};

describe('findConfig', () => {
  it('finds the row of a media contacts ID, ignoring case and spaces', () => {
    assert.equal(findConfig([{ 'media-contacts-id': 'other' }, config], ' Media-Contact-01 '), config);
  });
  it('returns null for an unknown or empty ID', () => {
    assert.equal(findConfig([config], 'media-contact-02'), null);
    assert.equal(findConfig([config], ''), null);
    assert.equal(findConfig(undefined, 'media-contact-01'), null);
  });
});

describe('actionOf', () => {
  it('keeps the five actions', () => {
    Object.keys(ACTIONS).forEach((action) => assert.equal(actionOf(` ${action.toUpperCase()} `), action));
  });
  it('uses the default for an empty or unknown action', () => {
    assert.equal(actionOf(''), DEFAULT_ACTION);
    assert.equal(actionOf('phone-only'), DEFAULT_ACTION);
    assert.equal(actionOf('constructor'), DEFAULT_ACTION);
  });
});

describe('regionColumns', () => {
  it('reads the region columns in sheet order, any number of them, without empty regions', () => {
    assert.deepEqual(regionColumns({ ...config, 'reg-010': 'C0002', 'reg-010-action': '' }), [
      { id: 'reg-001', contactIds: ['C0013', 'C0001', 'C0002'], action: 'mail' },
      { id: 'reg-002', contactIds: ['C0001'], action: 'name-des-mail-contact' },
      { id: 'reg-010', contactIds: ['C0002'], action: DEFAULT_ACTION },
    ]);
  });
  it('trims the contact IDs and skips empty ones', () => {
    assert.deepEqual(regionColumns({ 'media-contacts-id': 'x', 'reg-001': ' C0001 , ,C0002,' })[0].contactIds, ['C0001', 'C0002']);
  });
  it('has no regions without a config row', () => {
    assert.deepEqual(regionColumns(null), []);
  });
  it('never reads order_contacts as a region', () => {
    const ids = regionColumns({ ...config, order_contacts: 'reg-002, reg-001' }).map((r) => r.id);
    assert.deepEqual(ids, ['reg-002', 'reg-001']);
  });
});

describe('order_contacts', () => {
  // a row with four regions with contacts, as on media-contact-01
  const four = {
    'media-contacts-id': 'media-contact-01',
    'reg-001': 'C0013',
    'reg-001-action': 'mail',
    'reg-002': 'C0001',
    'reg-002-action': 'mail-contact',
    'reg-003': 'C0002',
    'reg-003-action': 'contact',
    'reg-004': 'C0001',
    'reg-004-action': 'name-mail-contact',
  };
  const ids = (row) => regionColumns(row).map((region) => region.id);
  const withActions = (row) => regionColumns(row).map((r) => [r.id, r.action]);

  it('blank or missing: the regions in the order the author added them (sheet column order)', () => {
    assert.deepEqual(ids(four), ['reg-001', 'reg-002', 'reg-003', 'reg-004']);
    assert.deepEqual(ids({ ...four, order_contacts: '' }), ['reg-001', 'reg-002', 'reg-003', 'reg-004']);
    assert.deepEqual(ids({ ...four, order_contacts: '  ' }), ['reg-001', 'reg-002', 'reg-003', 'reg-004']);
  });

  it('column names: each region in the given order with its own -action column', () => {
    assert.deepEqual(withActions({ ...four, order_contacts: 'reg-003, reg-001, reg-004, reg-002' }), [
      ['reg-003', 'contact'], ['reg-001', 'mail'], ['reg-004', 'name-mail-contact'], ['reg-002', 'mail-contact'],
    ]);
  });

  it('a partial order: the listed regions first, then the others in sheet order', () => {
    assert.deepEqual(ids({ ...four, order_contacts: 'reg-004, reg-002' }), ['reg-004', 'reg-002', 'reg-001', 'reg-003']);
  });

  it('names without case, spaces, hyphens or underscores; commas, semicolons or new lines between them', () => {
    assert.deepEqual(ids({ ...four, order_contacts: 'REG-003; reg_001\n Reg 004 ' }), ['reg-003', 'reg-001', 'reg-004', 'reg-002']);
  });

  it('the name of an action column counts as its region', () => {
    assert.deepEqual(ids({ ...four, order_contacts: 'reg-002-action, reg-001' }), ['reg-002', 'reg-001', 'reg-003', 'reg-004']);
  });

  it('a repeated entry counts once (also a region and its action column)', () => {
    assert.deepEqual(ids({ ...four, order_contacts: 'reg-002, reg-002-action, reg-002, reg-001' }), ['reg-002', 'reg-001', 'reg-003', 'reg-004']);
  });

  it('renamed columns: the names in the order bring their action columns, whatever they are called', () => {
    const renamed = {
      'media-contacts-id': 'x',
      India: 'C0013',
      'India Action': 'mail',
      'Middle East': 'C0001',
      'middle-east-action': 'name-mail-contact',
      APAC: 'C0002',
      'APAC-action': 'contact',
    };
    assert.deepEqual(withActions({ ...renamed, order_contacts: 'APAC, Middle East, India' }), [
      ['APAC', 'contact'], ['Middle East', 'name-mail-contact'], ['India', 'mail'],
    ]);
    // a name with spaces is one entry (spaces don't separate names)
    assert.deepEqual(ids({ ...renamed, order_contacts: 'middle east' }), ['Middle East', 'India', 'APAC']);
  });

  it('an action column with another name is the one right after its region', () => {
    const row = {
      'media-contacts-id': 'x', 'reg-001': 'C0013', 'mode-action': 'mail', 'reg-002': 'C0001', 'reg-002-action': 'contact', order_contacts: 'reg-002, reg-001',
    };
    assert.deepEqual(withActions(row), [['reg-002', 'contact'], ['reg-001', 'mail']]);
    // no action column for a region: the default action
    assert.equal(regionColumns({ 'media-contacts-id': 'x', 'reg-001': 'C0013', 'reg-002': 'C0001' })[0].action, DEFAULT_ACTION);
  });

  it('an entry naming no region of the row is ignored and reported; an empty region is not', () => {
    // reg-003 has no contacts here: listing it is not an error, it just shows nothing
    const row = { ...four, 'reg-003': '', order_contacts: 'reg-404, reg-003, reg-002, Europe' };
    assert.deepEqual(ids(row), ['reg-002', 'reg-001', 'reg-004']);
    assert.deepEqual(unknownOrderEntries(row), ['reg-404', 'Europe']);
    assert.deepEqual(unknownOrderEntries(four), []);
    assert.deepEqual(unknownOrderEntries(null), []);
  });

  it('never returns the action column it read the order with', () => {
    assert.deepEqual(Object.keys(regionColumns({ ...four, order_contacts: 'reg-002' })[0]), ['id', 'contactIds', 'action']);
  });

  describe('numbers (as order_contacts was first written: 2, 1, 5)', () => {
    it('a number is the region column at that position, with its action', () => {
      assert.deepEqual(withActions({ ...four, order_contacts: '3, 1, 4, 2' }), [
        ['reg-003', 'contact'], ['reg-001', 'mail'], ['reg-004', 'name-mail-contact'], ['reg-002', 'mail-contact'],
      ]);
    });

    it('positions, not the numbers in the names; names and numbers can be mixed', () => {
      const shuffled = {
        'media-contacts-id': 'x', 'reg-003': 'C0002', 'reg-003-action': 'contact', 'reg-001': 'C0013', 'reg-001-action': 'mail',
      };
      assert.deepEqual(withActions({ ...shuffled, order_contacts: '2, 1' }), [['reg-001', 'mail'], ['reg-003', 'contact']]);
      assert.deepEqual(ids({ ...four, order_contacts: 'reg-004, 1' }), ['reg-004', 'reg-001', 'reg-002', 'reg-003']);
    });

    it('a column named by a number wins over the position', () => {
      const numbered = {
        'media-contacts-id': 'x', 'reg-001': 'C0013', 2: 'C0001', order_contacts: '2',
      };
      // Object keys: integer-like keys come first, so the sheet order can't be relied on here;
      // the name match decides
      assert.deepEqual(ids(numbered)[0], '2');
    });

    it('a number outside the region columns is ignored and reported', () => {
      assert.deepEqual(ids({ ...four, order_contacts: '0, 5' }), ['reg-001', 'reg-002', 'reg-003', 'reg-004']);
      assert.deepEqual(unknownOrderEntries({ ...four, order_contacts: '0, 5' }), ['0', '5']);
    });
  });

  it('reads the column whatever its case or separator (Order Contacts, order-contacts)', () => {
    assert.equal(orderOf({ 'Order Contacts': 'reg-002' }), 'reg-002');
    assert.equal(orderOf({ 'order-contacts': 'reg-003' }), 'reg-003');
    assert.equal(orderOf({ ORDER_CONTACTS: ' reg-001 ' }), 'reg-001');
    assert.equal(orderOf({}), '');
    assert.equal(orderOf(null), '');
  });

  it('orderRegions keeps every region and returns a new array', () => {
    const list = [{ id: 'reg-001' }, { id: 'reg-002' }];
    const { regions: result } = orderRegions(list, '');
    assert.notEqual(result, list);
    assert.deepEqual(result, list);
  });

  it('the groups follow the order, each with its own action', () => {
    const { groups } = regionGroups({ ...config, order_contacts: 'reg-002, reg-001' }, { contacts, regions });
    assert.deepEqual(groups.map((group) => [group.name, group.action]), [
      ['Europe', 'name-des-mail-contact'],
      ['Corporate Communications & India', 'mail'],
    ]);
  });
});

describe('regionGroups', () => {
  it('shows only what each region action shows, contacts in the column order', () => {
    const { groups, missing } = regionGroups(config, { contacts, regions });
    assert.deepEqual(missing, []);
    assert.deepEqual(groups.map((group) => [group.name, group.action]), [
      ['Corporate Communications & India', 'mail'],
      ['Europe', 'name-des-mail-contact'],
    ]);
    // mail: the e-mail addresses only
    assert.deepEqual(groups[0].people.map((person) => [person.id, person.name, person.emails, person.phones]), [
      ['C0013', '', ['kim@tcs.com'], []],
      ['C0001', '', ['roland.bagen@tcs.com'], []],
      ['C0002', '', ['asha@tcs.com'], []],
    ]);
    // name-des-mail-contact: everything
    assert.deepEqual(groups[1].people, [{
      id: 'C0001',
      name: 'Roland',
      description: 'Roland is Media spokes person',
      emails: ['roland.bagen@tcs.com'],
      phones: [{ phone: '+46 70 3178024', tel: 'tel:+46703178024' }],
    }]);
  });

  it('applies each action', () => {
    const shown = (action) => regionGroups({ 'media-contacts-id': 'x', 'reg-001': 'C0001', 'reg-001-action': action }, { contacts, regions })
      .groups[0].people[0];
    assert.deepEqual(Object.entries(shown('contact')).filter(([, v]) => v.length).map(([k]) => k), ['id', 'phones']);
    assert.deepEqual(Object.entries(shown('mail-contact')).filter(([, v]) => v.length).map(([k]) => k), ['id', 'emails', 'phones']);
    assert.deepEqual(Object.entries(shown('name-mail-contact')).filter(([, v]) => v.length).map(([k]) => k), ['id', 'name', 'emails', 'phones']);
  });

  it('leaves out contacts with nothing to show and regions without contacts', () => {
    // Kim has no phone: a contact region shows nobody, so the region is left out
    const { groups } = regionGroups({ 'media-contacts-id': 'x', 'reg-003': 'C0013', 'reg-003-action': 'contact' }, { contacts, regions });
    assert.deepEqual(groups, []);
  });

  it('reports contact and region IDs the sheets do not have', () => {
    const { groups, missing } = regionGroups({ 'media-contacts-id': 'x', 'reg-009': 'C0001,C0404' }, { contacts, regions });
    assert.deepEqual(missing, ['reg-009', 'C0404']);
    // the region is still shown, without a name
    assert.equal(groups[0].name, '');
    assert.equal(groups[0].people.length, 1);
  });
});
