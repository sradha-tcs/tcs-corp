/*
 * paths.json (npm run build:paths, tools/paths/generate-paths.mjs) maps every locale and every
 * language master (REVIEW_ROOTS) of utils/site.js as Adobe's path mapping describes
 * (https://www.aem.live/developer/authoring-path-mapping): the folder (child pages and sheets),
 * then the root page (the Home page, published as {root}/index, served at {root}/), then its
 * taxonomy page; includes: the root page and everything below it.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const root = new URL('../../', import.meta.url);
const source = await readFile(new URL('utils/site.js', root), 'utf8');
const { LOCALES, REVIEW_ROOTS } = await import(`data:text/javascript,${encodeURIComponent(source)}`);
const paths = JSON.parse(await readFile(new URL('paths.json', root), 'utf8'));

const SITE = '/content/tcs-corp';
const roots = [
  ...LOCALES.map(({ country, code }) => ({ aem: `${SITE}/${country}/${code}`, published: `/${code}` })),
  ...REVIEW_ROOTS.map((published) => ({ aem: `${SITE}${published}`, published })),
];

describe('paths.json', () => {
  it('is what npm run build:paths writes', async () => {
    const before = await readFile(new URL('paths.json', root), 'utf8');
    execFileSync('node', ['tools/paths/generate-paths.mjs'], { cwd: root });
    const after = await readFile(new URL('paths.json', root), 'utf8');
    // the test leaves the file as it was
    if (after !== before) await writeFile(new URL('paths.json', root), before);
    assert.equal(after, before, 'run npm run build:paths and commit paths.json');
  });

  roots.forEach(({ aem, published }) => {
    it(`maps ${aem}: child pages and sheets, the Home page, taxonomy; included`, () => {
      const folder = paths.mappings.indexOf(`${aem}/:${published}/`);
      const home = paths.mappings.indexOf(`${aem}:${published}/`);
      assert.ok(folder >= 0, 'folder mapping (child pages and sheets)');
      assert.ok(home >= 0, 'root page mapping (Home page)');
      // the last match wins: the Home page mapping after its folder's
      assert.ok(home > folder, 'Home page mapping after the folder mapping');
      assert.ok(paths.mappings.includes(`${aem}/taxonomy:${published}/taxonomy.json`), 'taxonomy');
      // sheets need no mapping of their own: the folder publishes them at the same path
      assert.ok(!paths.mappings.includes(`${aem}/placeholders:${published}/placeholders`), 'no sheet mapping');
      assert.ok(paths.includes.includes(aem), 'included');
    });
  });

  it('maps the language master Home page to /language-master/en/', () => {
    assert.ok(paths.mappings.includes('/content/tcs-corp/language-master/en:/language-master/en/'));
    assert.ok(paths.mappings.includes('/content/tcs-corp/language-master/en/:/language-master/en/'));
  });
});
