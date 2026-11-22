/* Unit tests of the Configurable Media Contacts data: node --test */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ACTIONS, DEFAULT_ACTION, actionOf, findConfig, regionColumns, regionGroups,
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
