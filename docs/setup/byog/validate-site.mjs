/* eslint-disable no-restricted-syntax, no-await-in-loop, no-console -- Node tooling */
/*
 * Read-only validation of the Edge Delivery site set up by docs/setup/BYOG-ENVIRONMENT-SETUP.md:
 * the public URLs (no token) and, with ADMIN_TOKEN, the Admin API (configuration, code sync job,
 * page status). Every check prints PASS / FAIL / SKIP and its curl command; nothing is changed.
 *
 *   node docs/setup/byog/validate-site.mjs            # public checks only
 *   ADMIN_TOKEN=… node docs/setup/byog/validate-site.mjs   # + Admin API checks
 *
 * Values: docs/setup/byog/byog.env (AEM_ORG, AEM_SITE, CODE_MODE, CM_PROGRAM_ID,
 * CM_REPOSITORY_ID, GITHUB_OWNER, GITHUB_REPO) or the environment. Exit code 1 if a check fails.
 */
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../../../', import.meta.url);
const read = (file) => readFileSync(new URL(file, root), 'utf8');
const envFile = new URL('docs/setup/byog/byog.env', root);
if (existsSync(envFile)) {
  readFileSync(envFile, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
}
const env = (name, fallback = '') => process.env[name] || fallback;
const ORG = env('AEM_ORG', 'ultimatix').toLowerCase();
const SITE = env('AEM_SITE', 'tcs-corp').toLowerCase();
const MODE = env('CODE_MODE', 'byog');
const TOKEN = env('ADMIN_TOKEN');
const ADMIN = 'https://admin.hlx.page';
const PREVIEW = `https://main--${SITE}--${ORG}.aem.page`;
const LIVE = `https://main--${SITE}--${ORG}.aem.live`;
const paths = JSON.parse(read('paths.json'));

const results = [];
async function check(name, url, test, { admin = false } = {}) {
  const curl = admin ? `curl -s -H "x-auth-token: $ADMIN_TOKEN" "${url}"` : `curl -s "${url}"`;
  if (admin && !TOKEN) {
    results.push({
      status: 'SKIP', name, curl, note: 'needs ADMIN_TOKEN',
    });
    return;
  }
  try {
    const resp = await fetch(url, { headers: admin ? { 'x-auth-token': TOKEN } : {} });
    const text = await resp.text();
    let body = text;
    try { body = JSON.parse(text); } catch (e) { /* not JSON */ }
    const note = await test(resp, body);
    results.push({
      status: note === true ? 'PASS' : 'FAIL', name, curl, note: note === true ? `${resp.status}` : note,
    });
  } catch (e) {
    results.push({
      status: 'FAIL', name, curl, note: e.message,
    });
  }
}
const ok = (resp) => (resp.ok ? true : `HTTP ${resp.status}`);

// public: the site answers, its configuration and data are published
await check('preview: Home /en/', `${PREVIEW}/en/`, ok);
await check('live: Home /en/', `${LIVE}/en/`, ok);
await check('preview: language master Home', `${PREVIEW}/language-master/en/`, ok);
await check('live: config.json has the paths mapping', `${LIVE}/config.json`, (resp, body) => {
  if (!resp.ok) return `HTTP ${resp.status}`;
  const n = body?.public?.paths?.mappings?.length ?? body?.paths?.mappings?.length;
  return n >= paths.mappings.length ? true : `mappings: ${n ?? 'none'} (paths.json: ${paths.mappings.length})`;
});
await check('preview: placeholders', `${PREVIEW}/en/placeholders.json`, ok);
await check('preview: taxonomy', `${PREVIEW}/en/taxonomy.json`, ok);
await check('preview: query index has rows', `${PREVIEW}/query-index.json?limit=1`, (resp, body) => (
  resp.ok && body?.total > 0 ? true : `HTTP ${resp.status}, total ${body?.total ?? '-'}`));
await check('live: sitemap.xml', `${LIVE}/sitemap.xml`, (resp, body) => (
  resp.ok && String(body).includes(LIVE) ? true : `HTTP ${resp.status} (origin ${LIVE} expected)`));
await check('preview: code is synced (scripts/scripts.js)', `${PREVIEW}/scripts/scripts.js`, ok);

// Admin API (read-only)
const base = `${ADMIN}/config/${ORG}/sites/${SITE}`;
await check('config: site exists, code and content sources', `${base}.json`, (resp, body) => {
  if (!resp.ok) return `HTTP ${resp.status}`;
  const src = body.code?.source || {};
  const codeOk = MODE === 'byog'
    ? src.type === 'byogit' && src.owner === env('CM_PROGRAM_ID') && src.repo === env('CM_REPOSITORY_ID')
    : body.code?.owner?.toLowerCase() === env('GITHUB_OWNER', 'Ultimatix').toLowerCase()
      && body.code?.repo === env('GITHUB_REPO', 'tcs-corp');
  const contentOk = /\/bin\/franklin\.delivery\//.test(body.content?.source?.url || '')
    && body.content?.source?.suffix === '.html';
  if (codeOk && contentOk) return true;
  return `code ${codeOk ? 'ok' : `unexpected (${JSON.stringify(src.type || body.code?.owner)})`}, content ${contentOk ? 'ok' : 'unexpected'}`;
}, { admin: true });
await check('config: public.json paths = paths.json', `${base}/public.json`, (resp, body) => {
  if (!resp.ok) return `HTTP ${resp.status}`;
  const missing = paths.mappings.filter((m) => !(body.paths?.mappings || []).includes(m));
  return missing.length ? `${missing.length} mappings missing, e.g. ${missing[0]}` : true;
}, { admin: true });
await check('config: metadata sources (13 locales + language master)', `${base}/metadata.json`, (resp, body) => (
  resp.ok && (body.source || []).length >= 14 ? true : `HTTP ${resp.status}, ${(body.source || []).length} sources`), { admin: true });
await check('config: access (admin, config_admin)', `${base}/access.json`, (resp, body) => {
  const role = body?.admin?.role || {};
  return resp.ok && role.admin?.length && role.config_admin?.length ? true : `HTTP ${resp.status}, roles ${Object.keys(role).join(', ') || 'none'}`;
}, { admin: true });
await check('config: sidekick (AEM Editor)', `${base}/sidekick.json`, (resp, body) => (
  resp.ok && body.editUrlLabel ? true : `HTTP ${resp.status}`), { admin: true });
await check('config: index (query.yaml)', `${base}/content/query.yaml`, ok, { admin: true });
await check('config: sitemap (sitemap.yaml)', `${base}/content/sitemap.yaml`, ok, { admin: true });
await check('code sync: latest job', `${ADMIN}/job/${ORG}/${SITE}/main/code`, (resp, body) => {
  if (!resp.ok) return `HTTP ${resp.status}`;
  const jobs = body.jobs || body.data || [];
  const last = jobs[0] || jobs[jobs.length - 1];
  if (!last) return 'no code job yet (run Sync Code / push to main)';
  const state = last.state || last.status;
  return /stopped|completed|success/i.test(state) && !last.error ? true : `last job ${state}${last.error ? `: ${last.error}` : ''}`;
}, { admin: true });
await check('status: /en/ preview and live', `${ADMIN}/status/${ORG}/${SITE}/main/en/?editUrl=auto`, (resp, body) => (
  resp.ok && body.preview?.status === 200 && body.live?.status === 200 ? true
    : `HTTP ${resp.status}, preview ${body.preview?.status ?? '-'}, live ${body.live?.status ?? '-'}`), { admin: true });

console.log(`Validation of ${ORG}/${SITE} (code ${MODE})${TOKEN ? '' : ' — public checks only (no ADMIN_TOKEN)'}\n`);
results.forEach((r) => console.log(`${r.status.padEnd(4)}  ${r.name}${r.note && r.status !== 'PASS' ? `: ${r.note}` : ''}\n      ${r.curl}`));
const count = (s) => results.filter((r) => r.status === s).length;
console.log(`\n${count('PASS')} passed, ${count('FAIL')} failed, ${count('SKIP')} skipped`);
process.exitCode = count('FAIL') ? 1 : 0;
