/*
 * The Media Contacts directory (blocks/media-contacts/media-contacts-data.js, KB-D-074): the
 * Media Contacts sheet grouped into entries, the groups chosen with tags, and the Show email
 * addresses / Show phone numbers options: node --test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  directoryGroups, groupHeading, groupOptions, groupSlug, showContacts,
} from '../../blocks/media-contacts/media-contacts-data.js';

// the language master's data/media-contacts sheet (18 November 2026), as getMediaContacts reads it
const SHEET = [
  ['Corporate Communications', 'corporate.communications@tcs.com', '', 'India'],
  ['Corporate Communications', 'santosh.castelino@tcs.com', '', 'India'],
  ['Corporate Communications', 'rhea.mistry@tcs.com', '', 'India'],
  ['', 'y.tham@tcs.com', '+65 9270 4560', 'Asia Pacific'],
  ['', 'tiffany.fisher@tcs.com', '+1 416 456 7650', 'Canada'],
  ['', 'alma.leal@tcs.com', '+525 5798 08714', 'Latin America'],
  ['', 'francesca.newby@tcs.com', '+61 414 902 440', 'Australia and New Zealand'],
  ['', 'roland.bagen@tcs.com', '+46 70 3178024', 'Europe'],
  ['', 'douglas.foote@tcs.com', '+81 80 2115 0989', 'Japan'],
  ['', 'pragya.priyadarshini@tcs.com', '+971 528656700', 'Middle East & Africa'],
  ['', 'priyanka.mehta@tcs.com', '+44 7921493382', 'UK'],
  ['', 'andrew.corcione@tcs.com', '+1 646 617 8221', 'USA'],
].map(([designation, email, phone, region], i) => ({
  id: `media-contact-${String(i + 1).padStart(2, '0')}`, name: '', designation, email, phone, region, group: '', heading: '',
}));

describe('groupHeading and groupSlug', () => {
  it('heads a group with the heading column, else "designation & region", else the region', () => {
    assert.equal(groupHeading({ heading: 'Press office', designation: 'X', region: 'Y' }), 'Press office');
    assert.equal(groupHeading({ designation: 'Corporate Communications', region: 'India' }), 'Corporate Communications & India');
    assert.equal(groupHeading({ region: 'Europe' }), 'Europe');
  });
  it('names a group in tag form', () => {
    assert.equal(groupSlug('Corporate Communications & India'), 'corporate-communications-india');
    assert.equal(groupSlug('Middle East & Africa'), 'middle-east-africa');
    assert.equal(groupSlug(' Australia and New Zealand '), 'australia-and-new-zealand');
  });
});

describe('directoryGroups', () => {
  it('groups today\'s sheet as tcs.com shows it: 10 groups in sheet order', () => {
    const groups = directoryGroups(SHEET);
    assert.deepEqual(groups.map((g) => g.region), [
      'Corporate Communications & India', 'Asia Pacific', 'Canada', 'Latin America',
      'Australia and New Zealand', 'Europe', 'Japan', 'Middle East & Africa', 'UK', 'USA',
    ]);
    assert.deepEqual(groups[0], {
      region: 'Corporate Communications & India',
      emails: ['corporate.communications@tcs.com', 'santosh.castelino@tcs.com', 'rhea.mistry@tcs.com'],
      phones: [],
    }, 'email only: three mailboxes, no phone');
    assert.deepEqual(groups[5], { region: 'Europe', emails: ['roland.bagen@tcs.com'], phones: ['+46 70 3178024'] });
  });

  it('shows only the groups whose tags are chosen, whatever the tag namespace or case', () => {
    const groups = directoryGroups(SHEET, {
      groups: ['tcs-corp:media-contacts/europe', 'tcs-corp:media-contacts/Japan', 'tcs-corp:media-contacts/corporate-communications-india'],
    });
    assert.deepEqual(groups.map((g) => g.region), ['Corporate Communications & India', 'Europe', 'Japan'], 'in sheet order');
  });

  it('matches a group column holding the full tag ID', () => {
    const rows = [
      { group: 'tcs-corp:media-contacts/emea', heading: 'Europe, Middle East and Africa', email: 'emea@example.com' },
      { group: 'tcs-corp:media-contacts/emea', email: 'emea.press@example.com', phone: '+44 20 7946 0000' },
      { region: 'Japan', email: 'japan@example.com' },
    ];
    assert.deepEqual(directoryGroups(rows, { groups: ['tcs-corp:media-contacts/emea'] }), [{
      region: 'Europe, Middle East and Africa',
      emails: ['emea@example.com', 'emea.press@example.com'],
      phones: ['+44 20 7946 0000'],
    }]);
  });

  it('heads a tagged group without any heading by its tag name', () => {
    assert.deepEqual(directoryGroups([{ group: 'tcs-corp:media-contacts/benelux', email: 'benelux@example.com' }]), [
      { region: 'Benelux', emails: ['benelux@example.com'], phones: [] },
    ]);
  });

  it('reads several emails and phones in one cell (older tcs.com sets: India, UK)', () => {
    const [india] = directoryGroups([{
      region: 'India', email: 'h.ramachandra@tcs.com | shamala.p@tcs.com', phone: '+91 22 6778 9078; +91 22 6778 9081',
    }]);
    assert.deepEqual(india, {
      region: 'India', emails: ['h.ramachandra@tcs.com', 'shamala.p@tcs.com'], phones: ['+91 22 6778 9078', '+91 22 6778 9081'],
    });
  });

  it('phone-only groups, duplicates and incomplete rows', () => {
    const groups = directoryGroups([
      { region: 'Nordics', phone: '+358 40 756 6655' },
      { region: 'Nordics', phone: '+358 40 756 6655' },
      { region: 'Empty' },
      { email: 'no-heading@example.com' },
      { region: 'Bad values', email: 'not an email', phone: 'call us' },
    ]);
    assert.deepEqual(groups, [{ region: 'Nordics', emails: [], phones: ['+358 40 756 6655'] }]);
  });

  it('is empty without a sheet (a locale without data/media-contacts)', () => {
    assert.deepEqual(directoryGroups([]), []);
    assert.deepEqual(directoryGroups(undefined), []);
  });
});

describe('showContacts', () => {
  const contacts = directoryGroups(SHEET);
  it('shows both kinds by default', () => {
    assert.equal(showContacts(contacts).length, 10);
  });
  it('email addresses only', () => {
    const shown = showContacts(contacts, { phones: false });
    assert.equal(shown.length, 10);
    assert.ok(shown.every((c) => c.phones.length === 0 && c.emails.length > 0));
  });
  it('phone numbers only: a group without a phone (Corporate Communications) is left out', () => {
    const shown = showContacts(contacts, { emails: false });
    assert.equal(shown.length, 9);
    assert.equal(shown[0].region, 'Asia Pacific');
    assert.ok(shown.every((c) => c.emails.length === 0 && c.phones.length > 0));
  });
  it('nothing when both are off', () => {
    assert.deepEqual(showContacts(contacts, { emails: false, phones: false }), []);
  });
  it('keeps the other properties of an entry (an authored item\'s row)', () => {
    const row = {};
    const [shown] = showContacts([{
      region: 'Partner', emails: ['a@example.com'], phones: [], row,
    }]);
    assert.equal(shown.row, row);
  });
});

describe('groupOptions (the Contact groups dropdown, tools/media-contacts/generate-contact-groups.mjs)', () => {
  it('lists each group with contacts once, in the order of the first sheet that has it', () => {
    const other = [
      { region: 'Europe', email: 'other.europe@example.com' },
      { region: 'Nordics', phone: '+358 40 756 6655' },
      { region: 'No contacts' },
    ];
    const options = groupOptions([SHEET, other]);
    assert.deepEqual(options.slice(0, 2), [
      { name: 'Corporate Communications & India', value: 'corporate-communications-india' },
      { name: 'Asia Pacific', value: 'asia-pacific' },
    ]);
    assert.equal(options.length, 11, 'the 10 groups of the first sheet, then Nordics');
    assert.deepEqual(options.at(-1), { name: 'Nordics', value: 'nordics' });
    assert.ok(!options.some(({ name }) => name === 'No contacts'));
  });
  it('gives values that select their group', () => {
    groupOptions([SHEET]).forEach(({ name, value }) => {
      assert.deepEqual(directoryGroups(SHEET, { groups: [value] }).map((g) => g.region), [name]);
    });
  });
  it('uses the group column when a sheet has one', () => {
    assert.deepEqual(groupOptions([[{ group: 'emea', heading: 'Europe, Middle East and Africa', email: 'emea@example.com' }]]), [
      { name: 'Europe, Middle East and Africa', value: 'emea' },
    ]);
  });
  it('is empty without sheets', () => {
    assert.deepEqual(groupOptions([]), []);
    assert.deepEqual(groupOptions(undefined), []);
  });
});

describe('the dialog model', () => {
  it('offers Contacts sheet and Contact groups (a dropdown generated from the sheets)', async () => {
    const { readFile } = await import('node:fs/promises');
    const model = JSON.parse(await readFile(new URL('../../blocks/media-contacts/_media-contacts.json', import.meta.url)));
    const { fields } = model.models.find(({ id }) => id === 'media-contacts');
    const byName = Object.fromEntries(fields.map((f) => [f.name, f]));
    assert.equal(byName.contactsSheet.component, 'aem-content');
    assert.equal(byName.contactGroups.component, 'multiselect');
    const { options } = byName.contactGroups;
    assert.ok(options.length > 0, 'generated options (npm run build:contacts)');
    assert.equal(new Set(options.map((o) => o.value)).size, options.length, 'unique values');
    options.forEach(({ name, value }) => {
      assert.ok(name, 'a name');
      assert.match(value, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${value} in tag form`);
    });
    ['showDirectory', 'showEmails', 'showPhones'].forEach((name) => {
      assert.equal(byName[name].component, 'boolean');
      assert.equal(byName[name].value, true, `${name} on by default`);
    });
  });
});
