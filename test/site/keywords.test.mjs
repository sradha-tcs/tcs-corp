// The page keywords (utils/keywords.js): the page dialog's Keywords and the metadata sheet's
// meta-keywords, combined by the sheet's keyword-action (default, override, merge): node --test
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  KEYWORD_ACTIONS, keywordActionOf, keywordsOf, resolveKeywords,
} from '../../utils/keywords.js';

const DIALOG = 'press release, banking';
const SHEET = 'press release, TCS BaNCS™';

describe('keywordActionOf', () => {
  it('knows the three actions, in any case', () => {
    assert.deepEqual(KEYWORD_ACTIONS, ['default', 'override', 'merge']);
    assert.equal(keywordActionOf('override'), 'override');
    assert.equal(keywordActionOf(' Merge '), 'merge');
    assert.equal(keywordActionOf('DEFAULT'), 'default');
  });
  it('is default for an empty or unknown value', () => {
    assert.equal(keywordActionOf(''), 'default');
    assert.equal(keywordActionOf(undefined), 'default');
    assert.equal(keywordActionOf('replace'), 'default');
  });
});

describe('keywordsOf', () => {
  it('splits, trims and drops empty entries', () => {
    assert.deepEqual(keywordsOf(' a , b,,c ,'), ['a', 'b', 'c']);
    assert.deepEqual(keywordsOf(''), []);
    assert.deepEqual(keywordsOf(undefined), []);
  });
});

describe('resolveKeywords', () => {
  it('default: the dialog overrides the sheet', () => {
    assert.equal(resolveKeywords(DIALOG, SHEET, 'default'), 'press release, banking');
    assert.equal(resolveKeywords(DIALOG, SHEET, ''), 'press release, banking');
    assert.equal(resolveKeywords('', SHEET, 'default'), 'press release, TCS BaNCS™', 'the sheet\'s without dialog keywords');
  });
  it('override: the sheet overrides the dialog', () => {
    assert.equal(resolveKeywords(DIALOG, SHEET, 'override'), 'press release, TCS BaNCS™');
    assert.equal(resolveKeywords(DIALOG, '', 'override'), 'press release, banking', 'the dialog\'s without sheet keywords');
  });
  it('merge: both, the dialog\'s first, each keyword once', () => {
    assert.equal(resolveKeywords(DIALOG, SHEET, 'merge'), 'press release, banking, TCS BaNCS™');
    assert.equal(resolveKeywords('Cloud', 'cloud, AI', 'merge'), 'Cloud, AI', 'duplicates compared without case, the dialog\'s spelling kept');
    assert.equal(resolveKeywords('', SHEET, 'merge'), 'press release, TCS BaNCS™');
    assert.equal(resolveKeywords(DIALOG, '', 'merge'), 'press release, banking');
  });
  it('is empty when neither source has keywords', () => {
    KEYWORD_ACTIONS.forEach((action) => assert.equal(resolveKeywords('', '', action), ''));
  });
});
