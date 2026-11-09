// Previews, publishes and reindexes the pages of the fix package (fix-publish-paths.txt): one bulk job per
// step, then reports the paths that failed. Restart-safe: job names in publish-fix-state.json.
// Usage: node publish-fix.mjs <paths file> [preview|live|index ...]
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const ADMIN = 'https://admin.hlx.page';
const S = 'sradha-tcs/tcs-corp/main';
const STATE = new URL(process.env.STATE || './publish-fix-state.json', import.meta.url).pathname;
const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : { jobs: {} };
const save = () => writeFileSync(STATE, JSON.stringify(state, null, 1));
const [file, ...steps] = process.argv.slice(2);
const paths = readFileSync(file, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
for (const step of steps.length ? steps : ['preview', 'live', 'index']) {
  if (!state.jobs[step]?.done) {
    if (!state.jobs[step]) {
      const r = await fetch(`${ADMIN}/${step}/${S}/*`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paths }) });
      const b = await r.json().catch(() => ({}));
      if (!r.ok || !b.job?.name) { console.log(step, 'start failed', r.status, r.headers.get('x-error')); process.exit(1); }
      state.jobs[step] = { name: b.job.name }; save();
    }
    for (;;) {
      const topic = step === 'live' ? 'publish' : step; // live jobs are filed under publish
      const r = await fetch(`${ADMIN}/job/${S}/${topic}/${state.jobs[step].name}/details`);
      const b = await r.json().catch(() => ({}));
      if (b.state === 'stopped') {
        const failed = (b.data?.resources || []).filter((x) => x.status >= 300).map((x) => ({ path: x.path, status: x.status, error: x.error }));
        Object.assign(state.jobs[step], { done: true, progress: b.progress, failed }); save();
        break;
      }
      await new Promise((res) => { setTimeout(res, 5000); });
    }
  }
  const j = state.jobs[step];
  console.log(step, JSON.stringify(j.progress), 'failed', j.failed.length, JSON.stringify(j.failed.slice(0, 5)));
}
