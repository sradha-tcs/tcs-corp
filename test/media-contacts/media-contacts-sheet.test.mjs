// The Media Contacts block's Contacts sheet (utils/data.js getMediaContacts / loadSheetAt): the
// locale's data/media-contacts by default, else the sheet at the authored path: node --test
/* global globalThis */
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

let requests;
const ROWS = [{
  id: 'c1', designation: '', email: 'press@example.com', phone: '', region: 'Europe', group: '', heading: '',
}];

beforeEach(() => {
  requests = [];
  globalThis.window = { location: { pathname: '/language-master/en/news/release', href: 'https://example.test/language-master/en/news/release' } };
  globalThis.fetch = async (url) => {
    requests.push(String(url));
    return { ok: true, json: async () => ({ data: ROWS }) };
  };
});

// a fresh copy of the module (its sheet cache empty) for each case
const freshData = (tag) => import(`../../utils/data.js?${tag}`);

describe('getMediaContacts', () => {
  it('reads the locale\'s data/media-contacts without an authored sheet', async () => {
    const { getMediaContacts } = await freshData('default');
    const rows = await getMediaContacts();
    assert.equal(rows.length, 1);
    assert.equal(rows[0].email, 'press@example.com');
    assert.deepEqual(requests, ['/language-master/en/data/media-contacts.json']);
  });
  it('reads the sheet at a published path, with or without .json, once', async () => {
    const { getMediaContacts } = await freshData('published');
    await getMediaContacts('/language-master/en/data/press-contacts');
    await getMediaContacts('/language-master/en/data/press-contacts.json');
    assert.deepEqual(requests, ['/language-master/en/data/press-contacts.json']);
  });
  it('reads a path relative to the locale root and an AEM path', async () => {
    const { getMediaContacts } = await freshData('relative');
    await getMediaContacts('data/press-contacts');
    await getMediaContacts('/content/tcs-corp/language-master/en/data/agency-contacts.html');
    assert.deepEqual(requests, ['/language-master/en/data/press-contacts.json', '/language-master/en/data/agency-contacts.json']);
  });
  it('gives no rows when the sheet can\'t be read', async () => {
    globalThis.fetch = async () => ({ ok: false, status: 404 });
    const { getMediaContacts } = await freshData('missing');
    assert.deepEqual(await getMediaContacts('/language-master/en/data/missing'), []);
  });
});
