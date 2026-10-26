/* eslint-disable no-restricted-syntax, no-await-in-loop, no-continue, no-console -- Node tooling */
/*
 * The site configuration of the TCS Corporate site in the AEM Configuration Service, built from
 * this repository: code (Cloud Manager BYOG or GitHub), content (AEM author, xwalk), access,
 * path mapping (paths.json), bulk metadata sources, Sidekick, index and sitemap. See
 * docs/setup/BYOG-ENVIRONMENT-SETUP.md.
 *
 *   node docs/setup/byog/site-config.mjs [step ...]            # dry run: prints every request
 *   node docs/setup/byog/site-config.mjs --apply [step ...]    # sends them (needs ADMIN_TOKEN)
 *
 * Steps (default: all, in this order): site, secret, access, public, metadata, sidekick, query,
 * sitemap; check (GET only: the configuration, config.json and the latest code sync job).
 * Values come from the environment or docs/setup/byog/byog.env (not in git; see
 * byog.env.example). Tokens and secrets are read from the environment only and never printed.
 * The AEM author host is read from fstab.yaml when AEM_AUTHOR_HOST isn't set.
 */
import { existsSync, readFileSync } from 'node:fs';

const ADMIN = 'https://admin.hlx.page';
const root = new URL('../../../', import.meta.url);
const read = (file) => readFileSync(new URL(file, root), 'utf8');

// byog.env: KEY=value lines; the environment wins
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
const CODE_MODE = env('CODE_MODE', 'byog'); // byog | github
const AUTHOR = env('AEM_AUTHOR_HOST')
  || read('fstab.yaml').match(/https:\/\/([^/"]+)\/bin\/franklin\.delivery/)?.[1] || '';
const list = (name) => env(name).split(',').map((s) => s.trim()).filter(Boolean);

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const ALL = ['site', 'secret', 'access', 'public', 'metadata', 'sidekick', 'query', 'sitemap'];
const steps = args.filter((a) => !a.startsWith('--'));
const run = steps.length ? steps : ALL;

function required(names) {
  const missing = names.filter((n) => !env(n) && !(n === 'AEM_AUTHOR_HOST' && AUTHOR));
  if (missing.length) throw new Error(`missing ${missing.join(', ')} (byog.env or environment)`);
}

/** the code source: Cloud Manager (BYOG) or github.com (AEM Code Sync) */
function code() {
  if (CODE_MODE === 'github') {
    const owner = env('GITHUB_OWNER', 'Ultimatix');
    const repo = env('GITHUB_REPO', 'tcs-corp');
    return { owner, repo, source: { type: 'github', url: `https://github.com/${owner}/${repo}` } };
  }
  required(['CM_PROGRAM_ID', 'CM_REPOSITORY_ID']);
  return {
    source: {
      url: 'https://cm-repo.adobe.io/api',
      raw_url: 'https://cm-repo.adobe.io/api/raw',
      owner: env('CM_PROGRAM_ID'),
      repo: env('CM_REPOSITORY_ID'),
      type: 'byogit',
      // the site Cloud Manager is connected to holds the secret; repoless sites: BYOG_SECRET=none
      ...(env('BYOG_SECRET') === 'none' ? {} : { secretId: 'cm-byog' }),
    },
  };
}

/** the content source: the AEM author's delivery servlet for this org / site / branch */
function content() {
  required(['AEM_AUTHOR_HOST']);
  return {
    source: {
      url: `https://${AUTHOR}/bin/franklin.delivery/${ORG}/${SITE}/main`,
      type: 'markup',
      suffix: '.html',
    },
  };
}

/** every locale's and language master's bulk metadata sheet (AGENTS.md, utils/site.js) */
async function metadataSources() {
  const source = read('utils/site.js');
  const { LOCALES, REVIEW_ROOTS } = await import(`data:text/javascript,${encodeURIComponent(source)}`);
  return [...LOCALES.map(({ code: c }) => `/${c}/metadata.json`),
    ...REVIEW_ROOTS.map((r) => `${r}/metadata.json`)];
}

/**
 * the path mapping: paths.json (npm run build:paths) plus the site configuration page AEM's
 * repoless setup maps to /.helix/config.json (CONFIG_PAGE; "none" leaves it out)
 */
function paths() {
  const mapping = JSON.parse(read('paths.json'));
  const page = env('CONFIG_PAGE', '/content/tcs-corp/configuration');
  if (page === 'none') return mapping;
  return {
    ...mapping,
    mappings: [...mapping.mappings, `${page}:/.helix/config.json`],
    includes: [...mapping.includes, page],
  };
}

/** the sitemap with this site's origin (or the production host once it exists) */
function sitemapYaml() {
  const origin = env('PROD_HOST') ? `https://${env('PROD_HOST')}` : `https://main--${SITE}--${ORG}.aem.live`;
  return read('helix-sitemap.yaml').replace(/origin: \S+/, `origin: ${origin}`);
}

async function requests() {
  const base = `${ADMIN}/config/${ORG}/sites/${SITE}`;
  const sidekick = JSON.parse(read('tools/sidekick/config.json'));
  const all = {
    // a new site: the whole document (PUT); later changes go to the sub-resources (POST)
    site: () => ({ method: 'PUT', url: `${base}.json`, json: { code: code(), content: content() } }),
    secret: () => {
      if (CODE_MODE !== 'byog' || env('BYOG_SECRET') === 'none') return null;
      return {
        method: 'POST', url: `${base}/secrets/cm-byog.json`, json: { value: env('CM_BYOG_SECRET') }, secret: true,
      };
    },
    access: () => {
      required(['ADMIN_EMAILS', 'TECH_ACCOUNT']);
      return {
        method: 'POST',
        url: `${base}/access.json`,
        json: {
          admin: {
            role: {
              admin: list('ADMIN_EMAILS'),
              config_admin: [env('TECH_ACCOUNT')],
              ...(list('AUTHOR_EMAILS').length ? { author: list('AUTHOR_EMAILS') } : {}),
              ...(list('PUBLISH_EMAILS').length ? { publish: list('PUBLISH_EMAILS') } : {}),
            },
            requireAuth: 'auto',
          },
        },
      };
    },
    public: () => ({ method: 'POST', url: `${base}/public.json`, json: { paths: paths() } }),
    metadata: async () => ({ method: 'POST', url: `${base}/metadata.json`, json: { source: await metadataSources() } }),
    sidekick: () => ({
      method: 'POST',
      url: `${base}/sidekick.json`,
      json: {
        ...sidekick,
        project: env('SIDEKICK_PROJECT', 'TCS Corporate'),
        plugins: [{ id: 'publish', confirm: true }],
      },
    }),
    query: () => ({
      method: 'POST', url: `${base}/content/query.yaml`, type: 'text/yaml', body: read('helix-query.yaml'),
    }),
    sitemap: () => ({
      method: 'POST', url: `${base}/content/sitemap.yaml`, type: 'text/yaml', body: sitemapYaml(),
    }),
    check: () => [
      { method: 'GET', url: `${base}.json` },
      { method: 'GET', url: `https://main--${SITE}--${ORG}.aem.live/config.json`, public: true },
      { method: 'GET', url: `${ADMIN}/job/${ORG}/${SITE}/main/code` },
    ],
  };
  const out = [];
  for (const step of run) {
    if (!all[step]) throw new Error(`unknown step ${step}; steps: ${[...ALL, 'check'].join(', ')}`);
    const r = await all[step]();
    [].concat(r || []).forEach((x) => out.push({ step, ...x }));
  }
  return out;
}

const shown = (r) => {
  if (r.secret) return JSON.stringify({ value: '<CM_BYOG_SECRET>' });
  return r.body ?? (r.json ? JSON.stringify(r.json, null, 2) : '');
};

console.log(`site ${ORG}/${SITE}, code ${CODE_MODE}, ${apply ? 'APPLY' : 'dry run (add --apply to send)'}`);
const token = env('ADMIN_TOKEN');
if (apply && !token) throw new Error('ADMIN_TOKEN (x-auth-token of an admin) is needed for --apply');
for (const r of await requests()) {
  console.log(`\n# ${r.step}\n${r.method} ${r.url}`);
  const payload = shown(r);
  if (payload) console.log(payload);
  if (!apply) continue;
  if (r.secret && !env('CM_BYOG_SECRET')) throw new Error('CM_BYOG_SECRET (from Cloud Manager) is missing');
  const headers = r.public ? {} : { 'x-auth-token': token };
  if (r.json || r.body) headers['content-type'] = r.type || 'application/json';
  const resp = await fetch(r.url, {
    method: r.method, headers, body: r.body ?? (r.json ? JSON.stringify(r.json) : undefined),
  });
  const text = await resp.text();
  console.log(`-> ${resp.status} ${r.method === 'GET' ? text.slice(0, 2000) : ''}`);
  if (!resp.ok && r.method !== 'GET') throw new Error(`${r.step} failed: ${resp.status} ${text.slice(0, 300)}`);
}
